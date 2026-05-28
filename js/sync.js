/* ====================================================
   NIHONCORE — sync.js (V17 — Firestore profil + statisztika sync)
   ----------------------------------------------------
   A tanulási adatokat (profilok, settings, session-log, SRS,
   flashcard-state) szinkronizálja Firestore-ba, ha a user be van
   jelentkezve. A NihonCoreAuth-ra épül (V16).

   Firestore-struktúra:
     users/{uid}  →  { data: { <kulcs>: <json-string> }, updatedAt }
     (egyetlen dokumentum per felhasználó; bőven a 1 MB limit alatt)

   Sync-stratégia:
     • Login után: PULL (felhő → lokál, merge)
     • Periodikusan (30s) + tab-elhagyáskor: PUSH (ha változott)
     • Manuális: NihonCoreSync.syncNow()
     • Merge:
         - nihoncore_sessions_v1: APPEND-merge (id-unió — kör soha nem vész)
         - nihoncore_srs_v1: per-item a frissebb (magasabb box / újabb ts)
         - minden más (profilok/settings/flashcard): last-write-wins
           a snapshot updatedAt-ja szerint

   Eszköz-specifikus kulcsok NINCSENEK szinkronizálva:
     theme, helpers, audio_on, focus_hint, last_readiness_tier, pwa_dismiss
   ==================================================== */

window.NihonCoreSync = (function () {
  // Pontos kulcs-lista (csak tanulási adat)
  const EXACT_KEYS = [
    'nihoncore_sessions_v1',
    'nihoncore_srs_v1',
    'nihoncore_conj_profile_v1',    'nihoncore_conj_settings_v1',
    'nihoncore_adj_profile_v1',     'nihoncore_adj_settings_v1',
    'nihoncore_dt_profile_v1',      'nihoncore_dt_settings_v1',
    'nihoncore_listening_profile_v1','nihoncore_listening_settings_v1',
    'nihoncore_grm_profile_v1',     'nihoncore_grm_settings_v1',
    'nihoncore_prod_profile_v1',    'nihoncore_prod_settings_v1'
  ];
  const PREFIX_KEYS = ['nc_fc_state_'];   // flashcard "tudom/nem tudom" minden modul

  let _db = null;
  let _enabled = false;
  let _user = null;
  let _lastPushHash = '';
  let _pushTimer = null;
  const _statusCallbacks = [];

  function onStatus(cb) { if (typeof cb === 'function') _statusCallbacks.push(cb); }
  function _emitStatus(state, detail) {
    // state: 'idle' | 'syncing' | 'synced' | 'error' | 'offline'
    _statusCallbacks.forEach(cb => { try { cb(state, detail); } catch (e) {} });
  }

  // ── Lokális snapshot gyűjtés / visszaírás ─────────────
  function collectLocalKeys() {
    const keys = [];
    for (const k of EXACT_KEYS) {
      if (localStorage.getItem(k) !== null) keys.push(k);
    }
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (PREFIX_KEYS.some(p => k && k.startsWith(p))) keys.push(k);
    }
    return Array.from(new Set(keys));
  }
  function collectLocal() {
    const data = {};
    collectLocalKeys().forEach(k => { data[k] = localStorage.getItem(k); });
    return data;
  }
  function snapshotHash(data) {
    // egyszerű, gyors hash a "változott-e" detektáláshoz
    let s = '';
    Object.keys(data).sort().forEach(k => { s += k + '=' + (data[k] || '') + ';'; });
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
    return String(h);
  }

  // ── Merge-segédek ─────────────────────────────────────
  function mergeSessions(localStr, cloudStr) {
    let local = [], cloud = [];
    try { local = JSON.parse(localStr) || []; } catch (e) {}
    try { cloud = JSON.parse(cloudStr) || []; } catch (e) {}
    const byId = {};
    [...cloud, ...local].forEach(s => { if (s && s.id) byId[s.id] = s; });
    const merged = Object.values(byId).sort((a, b) => (a.ts || 0) - (b.ts || 0));
    return JSON.stringify(merged);
  }
  function mergeSrs(localStr, cloudStr) {
    let local = {}, cloud = {};
    try { local = JSON.parse(localStr) || {}; } catch (e) {}
    try { cloud = JSON.parse(cloudStr) || {}; } catch (e) {}
    const out = Object.assign({}, cloud);
    Object.keys(local).forEach(itemId => {
      const l = local[itemId], c = cloud[itemId];
      if (!c) { out[itemId] = l; return; }
      // a frissebb (újabb lastReview ts), tie-break: magasabb box
      const lts = (l && l.lastReview) || 0, cts = (c && c.lastReview) || 0;
      if (lts > cts) out[itemId] = l;
      else if (lts === cts && (l.box || 0) > (c.box || 0)) out[itemId] = l;
    });
    return JSON.stringify(out);
  }

  // Firestore hibakód → magyar üzenet
  function fsError(e) {
    const code = (e && e.code) || '';
    if (code === 'permission-denied')
      return 'Firestore: nincs jogosultság — publikáld a security rules-t a Console-on!';
    if (code === 'unavailable')
      return 'Firestore: nem elérhető (offline vagy nincs internet).';
    if (code === 'not-found' || code === 'failed-precondition')
      return 'Firestore: az adatbázis nincs létrehozva a Console-on (Create database).';
    return 'Firestore hiba: ' + (code || (e && e.message) || 'ismeretlen');
  }

  // ── PULL (felhő → lokál) ──────────────────────────────
  async function pull() {
    if (!_enabled || !_user) { console.log('[Sync] pull skip (enabled=' + _enabled + ', user=' + (!!_user) + ')'); return; }
    _emitStatus('syncing');
    try {
      const docRef = _db.collection('users').doc(_user.uid);
      const snap = await docRef.get();
      if (!snap.exists) { console.log('[Sync] pull: nincs felhő-dokumentum még (első push hozza létre)'); _emitStatus('synced', 'no-cloud'); return; }
      const remote = snap.data() || {};
      const cloudData = remote.data || {};
      const cloudUpdatedAt = (remote.updatedAt && remote.updatedAt.toMillis) ? remote.updatedAt.toMillis() : 0;
      const localUpdatedAt = parseInt(localStorage.getItem('nihoncore_sync_updatedAt') || '0', 10);

      Object.keys(cloudData).forEach(k => {
        const cloudVal = cloudData[k];
        const localVal = localStorage.getItem(k);
        if (k === 'nihoncore_sessions_v1') {
          localStorage.setItem(k, mergeSessions(localVal, cloudVal));  // mindig merge
        } else if (k === 'nihoncore_srs_v1') {
          localStorage.setItem(k, mergeSrs(localVal, cloudVal));        // mindig merge
        } else {
          // last-write-wins: ha a felhő frissebb VAGY lokálban nincs → felhő nyer
          if (localVal === null || cloudUpdatedAt >= localUpdatedAt) {
            localStorage.setItem(k, cloudVal);
          }
        }
      });
      console.log('[Sync] pull OK — felhő-adat letöltve + merge-elve');
      _emitStatus('synced', 'pulled');
    } catch (e) {
      console.warn('[Sync] PULL HIBA:', fsError(e), e);
      _emitStatus('error', fsError(e));
    }
  }

  // ── PUSH (lokál → felhő) ──────────────────────────────
  async function push(force) {
    if (!_enabled || !_user) return;
    const data = collectLocal();
    const hash = snapshotHash(data);
    if (!force && hash === _lastPushHash) return;   // nincs változás
    _emitStatus('syncing');
    try {
      const docRef = _db.collection('users').doc(_user.uid);
      await docRef.set({
        data: data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        email: _user.email || null
      }, { merge: true });
      _lastPushHash = hash;
      localStorage.setItem('nihoncore_sync_updatedAt', String(Date.now()));
      console.log('[Sync] push OK — ' + Object.keys(data).length + ' kulcs felvíve a felhőbe');
      _emitStatus('synced', 'pushed');
    } catch (e) {
      console.warn('[Sync] PUSH HIBA:', fsError(e), e);
      _emitStatus('error', fsError(e));
    }
  }

  function schedulePush() {
    if (!_enabled || !_user) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(() => push(false), 3000);  // 3s debounce
  }

  async function syncNow() {
    await pull();
    await push(true);
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    if (window.location.protocol === 'file:') { _emitStatus('offline', 'file'); return; }
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      console.warn('[Sync] Firestore SDK nem elérhető.');
      _emitStatus('offline', 'no-sdk');
      return;
    }
    try {
      _db = firebase.firestore();
      _enabled = true;
      console.log('[Sync] Firestore inicializálva — várakozás a bejelentkezésre...');
    } catch (e) {
      console.warn('[Sync] Firestore init hiba:', e);
      _emitStatus('error', e.message);
      return;
    }

    // Auth-állapot követése
    if (window.NihonCoreAuth) {
      window.NihonCoreAuth.onChange(async user => {
        _user = user;
        if (user) {
          await pull();        // belépés után letöltés + merge
          await push(true);    // majd a merge-elt állapot vissza
          startAutoPush();
        } else {
          stopAutoPush();
          _emitStatus('idle', 'logged-out');
        }
      });
    }
  }

  // ── Auto-push (periodikus + tab-elhagyás) ─────────────
  let _intervalId = null;
  function startAutoPush() {
    stopAutoPush();
    _intervalId = setInterval(() => push(false), 30000);  // 30s
    document.addEventListener('visibilitychange', _onHide);
    window.addEventListener('beforeunload', _onUnload);
  }
  function stopAutoPush() {
    if (_intervalId) clearInterval(_intervalId);
    _intervalId = null;
    document.removeEventListener('visibilitychange', _onHide);
    window.removeEventListener('beforeunload', _onUnload);
  }
  function _onHide() { if (document.visibilityState === 'hidden') push(false); }
  function _onUnload() { push(false); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    isEnabled: () => _enabled,
    pull, push, syncNow, schedulePush, onStatus,
    getUser: () => _user
  };
})();
