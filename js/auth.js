/* ====================================================
   NIHONCORE — auth.js (V16 — Firebase Auth)
   ----------------------------------------------------
   Egyetlen indokolt különálló JS-fájl: az auth modul-független
   felelősség (a CLAUDE.md kivétel-szabálya szerint).

   Firebase compat SDK-t használ (globális `firebase` névtér),
   mert a projekt vanilla / no-build-step. A compat build a
   gstatic.com-ról jön, a HTML-ekben az app.js ELŐTT töltődik.

   API a `window.NihonCoreAuth`-on:
     ready()                       → Promise, ami akkor resolve-ol, ha kész
     register(email, pw, name)     → Promise<user>
     login(email, pw)              → Promise<user>
     loginGoogle()                 → Promise<user>
     logout()                      → Promise
     onChange(cb)                  → auth-state observer (cb(user|null))
     getUser()                     → jelenlegi user vagy null
     isEnabled()                   → boolean (Firebase elérhető-e)

   FONTOS — single-user mód:
     A regisztráció működik (az első fiók létrehozásához kell),
     de a tényleges adatvédelmet a Firestore security-rules adja
     majd (V17), ami az adatokat a tulaj uid-jéhez köti.

   FONTOS — file:// vs http:
     A Firebase Auth CSAK http/https origin alatt működik (a file://
     "null origin"-t ad, amit a Firebase elutasít). file:// alatt
     az auth csendesen kikapcsol — az app működik nélküle is.
   ==================================================== */

window.NihonCoreAuth = (function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAM1usqhUkp9fEdj1V6M9zuXpY0BHUTsFg",
    authDomain: "japangyakorlo.firebaseapp.com",
    projectId: "japangyakorlo",
    storageBucket: "japangyakorlo.firebasestorage.app",
    messagingSenderId: "685384774742",
    appId: "1:685384774742:web:a129c0ea6cbba4ee5177f7",
    measurementId: "G-THRVH9ZHJL"
  };

  let _auth = null;
  let _enabled = false;
  let _readyResolve;
  const _readyPromise = new Promise(res => { _readyResolve = res; });
  const _changeCallbacks = [];

  function isEnabled() { return _enabled; }
  function ready() { return _readyPromise; }
  function getUser() { return _enabled && _auth ? _auth.currentUser : null; }

  function onChange(cb) {
    if (typeof cb !== 'function') return;
    _changeCallbacks.push(cb);
    // Ha már kész, azonnal egy kezdő hívás
    if (_enabled && _auth) cb(_auth.currentUser);
    else cb(null);
  }
  function _notify(user) {
    _changeCallbacks.forEach(cb => { try { cb(user); } catch (e) {} });
  }

  // ── Hibakód → magyar üzenet ───────────────────────────
  function humanError(err) {
    const code = (err && err.code) || '';
    const map = {
      'auth/invalid-email':          'Érvénytelen e-mail cím.',
      'auth/user-disabled':          'Ez a fiók le van tiltva.',
      'auth/user-not-found':         'Nincs ilyen e-mailű fiók.',
      'auth/wrong-password':         'Hibás jelszó.',
      'auth/invalid-credential':     'Hibás e-mail vagy jelszó.',
      'auth/email-already-in-use':   'Ez az e-mail már regisztrálva van.',
      'auth/weak-password':          'A jelszó túl gyenge (min. 6 karakter).',
      'auth/popup-closed-by-user':   'A Google-ablak bezárult belépés előtt.',
      'auth/popup-blocked':          'A böngésző blokkolta a Google-ablakot.',
      'auth/network-request-failed': 'Hálózati hiba — ellenőrizd a kapcsolatot.',
      'auth/too-many-requests':      'Túl sok próbálkozás — várj egy kicsit.'
    };
    return map[code] || (err && err.message) || 'Ismeretlen hiba történt.';
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    // file:// alatt nem indul (Firebase Auth http/https-t kíván)
    if (window.location.protocol === 'file:') {
      console.warn('[NihonCoreAuth] file:// protokoll — auth kikapcsolva (http/https kell).');
      _readyResolve(false);
      return;
    }
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.warn('[NihonCoreAuth] Firebase SDK nem töltődött be.');
      _readyResolve(false);
      return;
    }
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      _auth = firebase.auth();
      _enabled = true;
      // Session-perzisztencia: LOCAL (page-reload után is bejelentkezve marad)
      try { _auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) {}
      _auth.onAuthStateChanged(user => _notify(user));
      _readyResolve(true);
    } catch (e) {
      console.warn('[NihonCoreAuth] init hiba:', e);
      _enabled = false;
      _readyResolve(false);
    }
  }

  // ── Publikus műveletek ────────────────────────────────
  async function register(email, password, displayName) {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const cred = await _auth.createUserWithEmailAndPassword(email, password);
    if (displayName && cred.user) {
      try { await cred.user.updateProfile({ displayName }); } catch (e) {}
    }
    return cred.user;
  }
  async function login(email, password) {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const cred = await _auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  }
  async function loginGoogle() {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await _auth.signInWithPopup(provider);
    return cred.user;
  }
  async function logout() {
    if (!_enabled) return;
    await _auth.signOut();
  }

  // DOM ready után init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    ready, isEnabled, getUser, onChange,
    register, login, loginGoogle, logout, humanError
  };
})();
