/* ====================================================
   NIHONCORE — Unified app logic (consolidated v1.5+)
   ----------------------------------------------------
   Egy fájl minden oldalhoz. Az aktuális oldalt egy DOM-
   alapú detektor ismeri fel és csak a megfelelő init-et
   futtatja le. Univerzális rész (helpers toggle, header
   scroll) minden oldalon fut.

   ── Szerkezet ───────────────────────────────────────
     1. Univerzális részek      (IIFE)
     2. Landing oldal           (initLanding)
     3. Module oldal            (initModulePage)        [verb engine]
     4. Practice oldal          (initPracticePage)      [Mondat-Mester]
     5. Auth oldalak            (initAuthPages)         [login + register]
     6. Page detector           (legalsó blokk)
   ==================================================== */


/* ====================================================
   1. UNIVERZÁLIS (minden oldalon fut) ──────────────
   ==================================================== */

// ── NihonCoreMotion ── Zen-polish animation motor ──
//   Vékony anime.js wrapper, ami minden modulban újrahasznosítható.
//   Opcionális: ha az anime.js CDN nem töltődik be (offline első
//   indítás), a függvények csendben no-op-ot adnak vissza, és az
//   app működik animáció nélkül is.
//
//   API a `window.NihonCoreMotion`-on:
//     flashCorrect(el, opts)  — lágy matcha-zöld felvillanás
//     shakeWrong(el, opts)    — finom horizontális rázkódás
//     staggerIn(els, opts)    — listák lépcsős megjelenése
//     cardSlideIn(el, opts)   — új kártya alulról-fel (220ms)
//     tokenPop(el, opts)      — chip "pop" érzet (0.8→1.04→1)
//
//   Mind ease-out (Emil-szabály), gyors (120-220ms), opcionális.
window.NihonCoreMotion = (function () {
  const hasAnime = () => typeof window.anime === 'function';
  const reducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function flashCorrect(el, opts) {
    if (!el || reducedMotion()) return;
    opts = opts || {};
    // matcha-soft → transparent → matcha-soft pulzus (0.22s + 0.22s)
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        backgroundColor: [
          { value: 'rgba(122, 139, 79, 0.22)', duration: 180, easing: 'easeOutQuad' },
          { value: 'rgba(122, 139, 79, 0.00)', duration: 320, easing: 'easeOutQuad' }
        ],
        complete: () => { el.style.backgroundColor = ''; }
      });
    } else {
      // CSS fallback — egyszeri class-toggle, 500ms
      el.classList.add('ncm-flash-correct');
      setTimeout(() => el.classList.remove('ncm-flash-correct'), 500);
    }
  }

  function shakeWrong(el, opts) {
    if (!el || reducedMotion()) return;
    opts = opts || {};
    const amp = opts.amplitude || 6;     // ±6px
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        translateX: [
          { value: -amp,    duration: 70 },
          { value:  amp,    duration: 70 },
          { value: -amp*0.7,duration: 65 },
          { value:  amp*0.7,duration: 65 },
          { value: 0,       duration: 70 }
        ],
        easing: 'easeOutQuad',
        complete: () => { el.style.transform = ''; }
      });
    } else {
      el.classList.add('ncm-shake-wrong');
      setTimeout(() => el.classList.remove('ncm-shake-wrong'), 360);
    }
  }

  function staggerIn(els, opts) {
    if (!els || !els.length || reducedMotion()) return;
    opts = opts || {};
    const delay = opts.delay || 40;
    if (hasAnime()) {
      anime.remove(els);
      // kezdeti állapot
      Array.from(els).forEach(e => {
        e.style.opacity = '0';
        e.style.transform = 'translateY(8px)';
      });
      anime({
        targets: Array.from(els),
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 220,
        easing: 'easeOutCubic',
        delay: anime.stagger(delay),
        complete: () => {
          Array.from(els).forEach(e => {
            e.style.opacity = '';
            e.style.transform = '';
          });
        }
      });
    }
  }

  function cardSlideIn(el, opts) {
    if (!el || reducedMotion()) return;
    if (hasAnime()) {
      anime.remove(el);
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 220,
        easing: 'easeOutCubic',
        complete: () => {
          el.style.opacity = '';
          el.style.transform = '';
        }
      });
    }
  }

  function tokenPop(el, opts) {
    if (!el || reducedMotion()) return;
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        scale: [
          { value: 0.85, duration: 80, easing: 'easeOutQuad' },
          { value: 1.04, duration: 90, easing: 'easeOutQuad' },
          { value: 1.0,  duration: 70, easing: 'easeOutQuad' }
        ],
        complete: () => { el.style.transform = ''; }
      });
    }
  }

  // Sakura-bloom celebration — milestone/szintlépés-érzet
  //   options: { message?: string, emojis?: string[], duration?: ms }
  //
  //   Egy fixed overlay-t hoz létre, ami a viewport tetején lebeg.
  //   5-7 sakura/celebráció-emoji szétfut radiális mintázatban + szétpattan
  //   + elhalvány. Plusz egy "üdvözlő kártya" jelenik meg a közepén
  //   (szülőjével megadható: pl. "Új szint elérve!").
  //   ~1500ms total. NEM blokkoló, ÚJ overlay (nem nyúl a DOM-hoz).
  function celebrate(opts) {
    if (reducedMotion()) return;
    opts = opts || {};
    const emojis    = opts.emojis  || ['🌸', '✨', '🎉', '🌸', '✨', '🌸'];
    const message   = opts.message || '🎴 Új szint elérve!';
    const subtitle  = opts.subtitle || '';

    // Overlay + emoji-konténer + üdvözlő kártya
    const overlay = document.createElement('div');
    overlay.className = 'ncm-celebrate-overlay';
    overlay.innerHTML = `
      <div class="ncm-celebrate-card">
        <div class="ncm-celebrate-title">${message}</div>
        ${subtitle ? `<div class="ncm-celebrate-sub">${subtitle}</div>` : ''}
      </div>
      <div class="ncm-celebrate-particles"></div>`;
    document.body.appendChild(overlay);

    const card      = overlay.querySelector('.ncm-celebrate-card');
    const particles = overlay.querySelector('.ncm-celebrate-particles');

    // Részecskék generálása
    const N = 8;
    for (let i = 0; i < N; i++) {
      const span = document.createElement('span');
      span.className = 'ncm-celebrate-particle';
      span.textContent = emojis[i % emojis.length];
      particles.appendChild(span);
    }
    const particleEls = particles.querySelectorAll('.ncm-celebrate-particle');

    if (hasAnime()) {
      // Card: scale-pop + opacity fade-in/out
      anime({
        targets: card,
        scale: [
          { value: [0.6, 1.06], duration: 240, easing: 'easeOutCubic' },
          { value: 1.0,          duration: 120, easing: 'easeOutQuad' }
        ],
        opacity: [
          { value: [0, 1], duration: 200, easing: 'easeOutQuad' },
          { value: 1,      duration: 700, easing: 'linear' },
          { value: 0,      duration: 360, easing: 'easeOutQuad' }
        ]
      });
      // Particles: radiálisan szétfutnak
      particleEls.forEach((p, i) => {
        const angle = (Math.PI * 2 * i) / particleEls.length + (Math.random() - 0.5) * 0.4;
        const dist  = 140 + Math.random() * 80;
        const tx    = Math.cos(angle) * dist;
        const ty    = Math.sin(angle) * dist;
        const rot   = (Math.random() - 0.5) * 90;
        anime({
          targets: p,
          translateX: [0, tx],
          translateY: [0, ty],
          rotate:     [0, rot],
          scale:      [0.4, 1.2, 0.8],
          opacity:    [0, 1, 0],
          duration:   1300 + Math.random() * 300,
          delay:      i * 35,
          easing:     'easeOutCubic'
        });
      });
    }

    // Auto-cleanup
    const dur = opts.duration || 1500;
    setTimeout(() => { overlay.remove(); }, dur);
  }

  return { flashCorrect, shakeWrong, staggerIn, cardSlideIn, tokenPop, celebrate };
})();

// CSS fallback osztályok (ha anime.js nincs)
(function injectMotionFallbackCSS() {
  if (document.getElementById('ncm-fallback-styles')) return;
  const css = `
    @keyframes ncm-flash-correct-kf {
      0%   { background-color: rgba(122, 139, 79, 0.22); }
      100% { background-color: transparent; }
    }
    @keyframes ncm-shake-wrong-kf {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
    .ncm-flash-correct { animation: ncm-flash-correct-kf 500ms ease-out; }
    .ncm-shake-wrong   { animation: ncm-shake-wrong-kf 320ms ease-out; }
  `;
  const style = document.createElement('style');
  style.id = 'ncm-fallback-styles';
  style.textContent = css;
  document.head.appendChild(style);
})();

// Oldalváltás: sima többoldalas navigáció. Az áttűnést a böngésző natív
// cross-document view-transition-je adja (style.css: @view-transition) —
// nincs SPA-réteg, így minden oldal a saját fejlécével és adataival tölt be.


// ── NihonCoreRound ── Univerzális kör-őr + modul-név (V18) ────────────
//   Req 1: aktív kör közben BÁRMILYEN kilépés (logo / 🏠 / böngésző-vissza /
//          user-menü link) megerősítést kér — nem csak a „Kilépés" gomb.
//   Req 2: a modul neve MINDIG látszik a fejlécben (lobby ÉS kör közben),
//          a .module-page-title-ből a .module-page-nav-ba tükrözve.
//   Req 3: ha kör közben kilépsz (bárhogy), az eddigi válaszaid (helyes/
//          hibás) elmentődnek a statisztikába — nem csak a befejezett körök.
//
//   Egy kör életciklusa:
//     begin(snapshotFn)  — a modul a kör indításakor regisztrál egy
//        pillanatkép-fn-t, ami { module, mode, results, score, startTs }-t ad.
//     recordSession (kör vége) → markComplete() → a kör inaktív lesz.
//     Kilépés kör közben → flush() → ha van eredmény, recordSession(pillanatkép).
//   A flush-t a hero újra-megjelenése (kör → lobby), a navigációs-őr és a
//   pagehide is meghívja; a markComplete + _recorded gátolja a dupla mentést.
window.NihonCoreRound = (function () {
  var _active = false;
  var _recorded = false;
  var _snapshot = null;
  var _heroObserver = null;
  var EXIT_MSG = 'Biztosan kilépsz a körből?\n\n' +
    'A megkezdett kört nem fejezed be, de az eddigi válaszaid (helyes/hibás) ' +
    'elmentődnek a statisztikába.';

  function begin(snapshotFn) {
    _active = true; _recorded = false;
    _snapshot = (typeof snapshotFn === 'function') ? snapshotFn : null;
    markBody();
    scrollToRound();
  }
  function isActive() { return _active; }

  // A futó kör tetejére görget: a Pont/Sorozat sor a fix fejléc alá kerül.
  // A lobby alján lévő „Indítás" gomb és a feedback alján lévő „Következő"
  // után a kártya teteje különben a képernyő fölött marad.
  // rAF: a hívó a begin() UTÁN váltja láthatóra a runtime-ot. A module.html
  // fázisainak nincs .pr-stats sora → ott no-op (saját scrollIntoView-juk van).
  function scrollToRound() {
    requestAnimationFrame(function () {
      var rows = document.querySelectorAll('.pr-stats');
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].offsetParent === null) continue;
        var header = document.getElementById('header');
        var top = rows[i].getBoundingClientRect().top + window.pageYOffset
                - (header ? header.offsetHeight : 0) - 16;
        var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: Math.max(0, top), behavior: calm ? 'auto' : 'smooth' });
        return;
      }
    });
  }
  function markComplete() { _recorded = true; _active = false; markBody(); }

  // body.round-active: kör közben a fül-sáv és a lábléc helyet ad a kártyának
  function markBody() {
    if (document.body) document.body.classList.toggle('round-active', _active);
  }

  function flush() {
    if (!_active || _recorded || !_snapshot) { _active = false; markBody(); return; }
    try {
      var info = _snapshot();
      if (info && info.results && info.results.length > 0 &&
          window.NihonCoreStats && NihonCoreStats.recordSession) {
        _recorded = true;
        info.partial = true;                  // félbehagyott kör jelölése a statisztikában
        NihonCoreStats.recordSession(info);   // markComplete a recordSession-ben fut le
      }
    } catch (e) {}
    _active = false;
    markBody();
  }

  // ── Req 2 — modul-név a fejlécben ───────────────────
  function refreshBadge() {
    try {
      var nav = document.querySelector('.nav.module-page-nav');
      if (!nav) return;
      var titleEl = document.querySelector('.module-page-title');
      var name = titleEl ? (titleEl.textContent || '').trim() : '';
      if (!name) {   // pl. practice.html — nincs .module-page-title → a <title>-ből
        name = (document.title || '').replace(/\s*[—–-]\s*NihonCore.*$/, '').trim();
      }
      nav.innerHTML = name ? '<span class="module-name-badge">' + name + '</span>' : '';
    } catch (e) {}
  }

  // ── Req 3 — hero újra-megjelenés (kör → lobby) → részeredmény mentés ──
  function attachHeroObserver() {
    if (!window.MutationObserver) return;
    if (_heroObserver) { _heroObserver.disconnect(); _heroObserver = null; }
    var hero = document.querySelector('.module-hero');
    if (!hero) return;
    _heroObserver = new MutationObserver(function () {
      if (_active && !hero.classList.contains('hidden')) flush();
    });
    _heroObserver.observe(hero, { attributes: true, attributeFilter: ['class'] });
  }

  // initCurrentPage hívja
  function refresh() { refreshBadge(); attachHeroObserver(); }

  // ── Kilépés-megerősítő lap (a natív confirm() helyett) ──
  var _sheet = null;
  function closeSheet() {
    if (!_sheet) return;
    document.removeEventListener('keydown', _sheet._onKey, true);
    _sheet.remove(); _sheet = null;
  }
  // Általános megerősítő lap. opts: { title, text, yes, no } — minden mező egyszerű szöveg.
  // A biztonságos gomb (no) kapja a fókuszt; Esc és a háttérre kattintás = mégsem.
  function confirmSheet(opts, onYes) {
    closeSheet();
    var el = document.createElement('div');
    el.className = 'nc-exit-backdrop';
    el.innerHTML =
      '<div class="nc-exit-sheet" role="alertdialog" aria-modal="true" aria-labelledby="ncExitTitle" aria-describedby="ncExitText">' +
        '<h2 class="nc-exit-title" id="ncExitTitle"></h2>' +
        '<p class="nc-exit-text" id="ncExitText"></p>' +
        '<div class="nc-exit-actions">' +
          '<button class="btn btn-outline nc-exit-yes" type="button"></button>' +
          '<button class="btn btn-primary nc-exit-no" type="button"></button>' +
        '</div>' +
      '</div>';
    el.querySelector('.nc-exit-title').textContent = opts.title;
    el.querySelector('.nc-exit-text').textContent = opts.text;
    el.querySelector('.nc-exit-yes').textContent = opts.yes;
    el.querySelector('.nc-exit-no').textContent = opts.no || 'Mégsem';
    document.body.appendChild(el);
    _sheet = el;
    el._onKey = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeSheet(); }
    };
    document.addEventListener('keydown', el._onKey, true);
    el.addEventListener('click', function (e) { if (e.target === el) closeSheet(); });
    el.querySelector('.nc-exit-no').addEventListener('click', closeSheet);
    el.querySelector('.nc-exit-yes').addEventListener('click', function () { closeSheet(); onYes(); });
    try { el.querySelector('.nc-exit-no').focus(); } catch (err) {}
  }
  function confirmExit(onYes) {
    confirmSheet({
      title: 'Kilépsz a körből?',
      text: 'A kört nem fejezed be, de az eddigi válaszaid elmentődnek a statisztikába.',
      yes: 'Kilépés', no: 'Folytatom'
    }, onYes);
  }
  // Törlés megerősítése (profil, ismétlés-ütemezés, előzmények)
  function confirmDelete(title, text, onYes) {
    confirmSheet({ title: title, text: text, yes: 'Törlés', no: 'Mégsem' }, onYes);
  }

  // ✕ gomb: a modul saját kezelője confirm()-ot hív — az újra-kattintás idejére igent adunk
  function onExitClick(e) {
    var btn = (e.target && e.target.closest) ? e.target.closest('.round-exit') : null;
    if (!btn || !_active) return;
    if (btn._ncConfirmed) { btn._ncConfirmed = false; return; }     // megerősítve: mehet a modul kezelője
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    confirmExit(function () {
      var orig = window.confirm;
      window.confirm = function () { return true; };
      btn._ncConfirmed = true;
      try { btn.click(); } finally { window.confirm = orig; btn._ncConfirmed = false; }
    });
  }

  // ── Req 1 — navigációs őr (capture fázisban) ──
  function onClick(e) {
    if (!_active) return;
    var a = (e.target && e.target.closest) ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.closest('.round-exit')) return;            // a ✕ gombot az onExitClick kezeli
    if (a.hasAttribute('data-no-guard')) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
    // Kör közben elnavigálna: megerősítés a saját lappal, igen esetén mentés + navigáció
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    confirmExit(function () {
      flush();
      window.location.href = a.href;
    });
  }

  function init() {
    document.addEventListener('click', onExitClick, true);
    document.addEventListener('click', onClick, true);
    window.addEventListener('beforeunload', function (e) {
      if (_active) { e.preventDefault(); e.returnValue = ''; return ''; }
    });
    window.addEventListener('pagehide', function () { if (_active) flush(); });
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { begin: begin, isActive: isActive, markComplete: markComplete, flush: flush, refresh: refresh, scrollToRound: scrollToRound, confirmDelete: confirmDelete };
})();


// ── NihonCorePath ── tanulási út (kezdőlap) ──
//   A lépések a NIHONCORE_PATH-ban vannak (js/data/core.js). Itt:
//     · a haladás tárolása (localStorage 'nihoncore_path_v1', szinkronizálva):
//         { level: 'zero' | 'kana' | null, steps: { id: { best, done, ts } } }
//     · az aktív lépés: a modul-oldal ?step=<id> paramétere (nem tárolódik —
//       szabad gyakorlásnál nincs aktív lépés, így a kör nem számít az útba)
//     · apply(module, settings): a lépés előre beállított köre a modulra
//     · onSession(rec): befejezett kör → a lépés eredménye
window.NihonCorePath = (function () {
  const KEY = 'nihoncore_path_v1';
  const PASS = 0.6;                        // ennyitől „kész" a lépés
  const STEPS = (typeof NIHONCORE_PATH !== 'undefined') ? NIHONCORE_PATH : [];

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && typeof s === 'object') { s.steps = s.steps || {}; return s; }
    } catch (e) {}
    return { level: null, steps: {} };
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    if (window.NihonCoreSync && NihonCoreSync.schedulePush) NihonCoreSync.schedulePush();
  }

  function getStep(id) { return STEPS.find(s => s.id === id) || null; }
  const activeId = (function () {
    try { return new URLSearchParams(window.location.search).get('step'); } catch (e) { return null; }
  })();
  function activeStep() { return activeId ? getStep(activeId) : null; }

  function setLevel(level) { const st = load(); st.level = level; save(st); }

  // A lépések a tanuló szintje szerint: aki olvas kanát, annál a kana-lépések „átugorva"
  function view() {
    const st = load();
    const rows = STEPS.map((s, i) => {
      const r = st.steps[s.id] || {};
      const skipped = s.level === 'zero' && st.level === 'kana' && !r.done;
      return { step: s, index: i, done: !!r.done, best: typeof r.best === 'number' ? r.best : null, skipped: skipped, optional: !!s.optional };
    });
    // a nem kötelező lépés (dolgozat) nem állítja meg az utat, és nem számít bele a haladásba
    const next = rows.find(r => !r.done && !r.skipped && !r.optional) || null;
    const total = rows.filter(r => !r.skipped && !r.optional).length;
    const doneCount = rows.filter(r => r.done && !r.skipped && !r.optional).length;
    return { level: st.level, rows: rows, next: next, total: total, doneCount: doneCount };
  }

  // A lépés előre beállított köre a modul beállításaira
  function apply(moduleKey, settings) {
    const step = activeStep();
    if (!step || step.module !== moduleKey || !step.preset || !settings) return false;
    const p = step.preset;
    if (p.only) {
      Object.keys(p.only).forEach(k => {
        const map = settings[k];
        if (!map || typeof map !== 'object') return;
        Object.keys(map).forEach(x => { map[x] = false; });
        p.only[k].forEach(x => { map[x] = true; });
      });
    }
    if (p.set) Object.keys(p.set).forEach(k => { settings[k] = p.set[k]; });
    return true;
  }

  // A lecke-oldalon kétféle kör fut (ellenőrző és hallás utáni): a kör azt a lépést teljesíti,
  // amelyik ehhez a leckéhez és ehhez a körfajtához tartozik, bármelyik lépésről nyílt az oldal.
  function lessonStep(rec) {
    let id = null;
    try { id = new URLSearchParams(window.location.search).get('id'); } catch (e) {}
    if (!id || !/^\w+$/.test(id)) return null;
    const re = new RegExp('[?&]id=' + id + '(&|$)');
    return STEPS.find(s => s.module === 'lesson' && (s.mode || 'check') === rec.mode && re.test(s.href)) || null;
  }

  // Befejezett kör → a lépés eredménye (NihonCoreStats.recordSession hívja)
  function onSession(rec) {
    const step = (rec && rec.module === 'lesson') ? lessonStep(rec) : activeStep();
    if (!step || !rec || rec.partial || rec.module !== step.module || !rec.questionCount) return;
    const pct = rec.correctCount / rec.questionCount;
    const st = load();
    const prev = st.steps[step.id] || {};
    const wasDone = !!prev.done;
    st.steps[step.id] = {
      best: Math.max(typeof prev.best === 'number' ? prev.best : 0, pct),
      done: wasDone || pct >= PASS,
      ts: Date.now()
    };
    save(st);
    // A lecke-oldal összesítője maga vezet tovább a gyakorlásra: ott nem kell a lebegő jelzés.
    if (step.module !== 'lesson') showResult(step, pct, pct >= PASS, wasDone);
  }

  const homeHref = () => (window.location.pathname.includes('/pages/') ? '../' : '') + 'index.html#path';

  function showResult(step, pct, passed, wasDone) {
    const old = document.querySelector('.path-result');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'path-result ' + (passed ? 'path-result-ok' : 'path-result-retry');
    el.setAttribute('role', 'status');
    const p = Math.round(pct * 100);
    el.innerHTML =
      '<div class="path-result-text">' +
        '<strong>' + (passed ? (wasDone ? 'Újra megvan: ' : 'Lépés kész: ') + step.title
                             : step.title + ': most ' + p + '%') + '</strong>' +
        '<span>' + (passed ? p + '%-os kör. Mehet a következő lépés.'
                           : 'A lépéshez ' + Math.round(PASS * 100) + '% kell. Egy újabb körrel meglesz.') + '</span>' +
      '</div>' +
      '<a class="btn btn-primary" href="' + homeHref() + '">' + (passed ? 'Tovább az úton' : 'Vissza az útra') + '</a>' +
      '<button class="path-result-x" type="button" aria-label="Bezárás">✕</button>';
    document.body.appendChild(el);
    el.querySelector('.path-result-x').addEventListener('click', () => el.remove());
  }

  // Modul-oldalon: jelzés, hogy a kör a tanulási út lépéséhez van beállítva
  function banner() {
    const step = activeStep();
    const main = document.querySelector('.module-main');
    if (!step || !main || main.querySelector('.path-banner')) return;
    const b = document.createElement('a');
    b.className = 'path-banner';
    b.href = homeHref();
    b.innerHTML = '<span class="path-banner-glyph">' + step.glyph + '</span>' +
      '<span class="path-banner-text"><span class="path-banner-kicker">Tanulási út</span>' +
      '<strong>' + step.title + '</strong></span>';
    main.insertBefore(b, main.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();

  return {
    steps: STEPS, view: view, setLevel: setLevel, apply: apply,
    activeStep: activeStep, onSession: onSession, PASS: PASS,
    stepHref: function (step, fromRoot) {
      const sep = step.href.indexOf('?') >= 0 ? '&' : '?';
      return (fromRoot === false ? '../' : '') + step.href + sep + 'step=' + step.id;
    }
  };
})();


// ── Mini-leckék ── „Tanuld meg" a lobbi fölött ──
//   A NIHONCORE_LESSONS (js/data/core.js) modulhoz tartozó leckéjét a lobbi
//   elé illeszti, összecsukható panelként. Első alkalommal nyitva van; ha a
//   tanuló becsukja vagy kört indít, legközelebb összecsukva jelenik meg.
//   Kör közben nem látszik (style.css: body.round-active .lesson).
(function initLessons() {
  const SEEN_KEY = 'nihoncore_lessons_seen';
  const PAGE_MODULE = {
    conjugationMain: 'conjugation', adjMain: 'adjectives', dtMain: 'datetime',
    listeningMain: 'listening', practiceMain: 'practice', grmMain: 'grammar',
    prodMain: 'production'
  };
  function seenMap() { try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function markSeen(key) {
    const m = seenMap(); if (m[key]) return;
    m[key] = 1;
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(m)); } catch (e) {}
  }

  function setup() {
    if (typeof NIHONCORE_LESSONS === 'undefined') return;
    let key = null;
    Object.keys(PAGE_MODULE).forEach(id => { if (document.getElementById(id)) key = PAGE_MODULE[id]; });
    const lesson = key && NIHONCORE_LESSONS[key];
    const lobby = document.querySelector('.conj-lobby, .practice-lobby');
    if (!lesson || !lobby || document.querySelector('.lesson')) return;

    const el = document.createElement('details');
    el.className = 'lesson glass-panel';
    el.open = !seenMap()[key];
    el.innerHTML =
      '<summary class="lesson-summary">' +
        '<span class="lesson-head"><span class="lesson-kicker">Tanuld meg</span>' +
        '<span class="lesson-title">' + lesson.title + '</span></span>' +
        '<svg class="lcs-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
      '</summary>' +
      '<div class="lesson-body">' +
        '<ol class="lesson-points">' + lesson.points.map(p =>
          '<li><strong class="lesson-point-h">' + p.h + '</strong><p>' + p.t + '</p></li>').join('') + '</ol>' +
        ((lesson.examples && lesson.examples.length)
          ? '<div class="lesson-examples">' + lesson.examples.map(x =>
              '<div class="lesson-ex"><span class="lesson-ex-jp" lang="ja">' + x.jp + '</span>' +
              '<span class="lesson-ex-ro">' + x.ro + '</span><span class="lesson-ex-hu">' + x.hu + '</span></div>').join('') + '</div>'
          : '') +
      '</div>';
    lobby.parentNode.insertBefore(el, lobby);
    el.addEventListener('toggle', () => { if (!el.open) markSeen(key); });
    // kör indítása = a leckét látta
    document.addEventListener('click', e => {
      if (e.target && e.target.closest && e.target.closest('.ml-start')) markSeen(key);
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();


// ── NihonCorePrefs ── eszköz-szintű gyakorlási beállítások ──
//   timerOn(): kell-e időlimit a beírós (Mester / Kiegészítés) módokban.
//   Alapból KI: a kezdő nyugodtan gondolkodhat; aki reflexet edz, bekapcsolja
//   a lobbi „Testreszabás" részében.
window.NihonCorePrefs = (function () {
  const TIMER_KEY = 'nihoncore_timer';
  function timerOn() {
    try { return localStorage.getItem(TIMER_KEY) === 'on'; } catch (e) { return false; }
  }
  function setTimer(on) {
    try { localStorage.setItem(TIMER_KEY, on ? 'on' : 'off'); } catch (e) {}
  }
  return { timerOn: timerOn, setTimer: setTimer };
})();


// ── Lobbi-átrendező ── „Gyors indítás" minden modulban ──
//   A modulok lobbija eredetileg beállítópanel volt: 4–5 szekció után jött
//   az Indítás. Itt egységesen átrendezzük:
//     fejléc → Mód (ha van) → Indítás → <details> Testreszabás (minden más)
//   A csomópontokat MOZGATJUK (nem újraírjuk), így a modulok eseménykezelői
//   élnek tovább. A lobbi teljes újra-renderelésekor a MutationObserver
//   újra lefut; a Testreszabás nyitott/zárt állapota megmarad.
(function initLobbyQuickStart() {
  const LOBBY_SEL = '.conj-lobby, .practice-lobby, .ms-lobby, .cnt-lobby';
  const OPEN_KEY = 'nihoncore_lobby_custom_open';
  const TIMED_LOBBIES = { conjLobby: 8, adjLobby: 10, dtLobby: 10, grmLobby: 18 };   // mp / kártya
  const CHEVRON = '<svg class="lcs-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function isOpen() { try { return localStorage.getItem(OPEN_KEY) === '1'; } catch (e) { return false; } }

  function timerRow(seconds) {
    const row = document.createElement('div');
    row.className = 'lobby-section cj-adaptive-section';
    row.innerHTML =
      '<label class="cj-adapt-switch">' +
        '<input type="checkbox" class="lobby-timer-toggle"' + (NihonCorePrefs.timerOn() ? ' checked' : '') + ' />' +
        '<span class="cj-adapt-text"><strong>Időlimit a beírós módokban</strong>' +
        '<em>Bekapcsolva ' + seconds + ' másodperc jut egy kártyára. Kikapcsolva nyugodtan gondolkodhatsz.</em></span>' +
      '</label>';
    row.querySelector('input').addEventListener('change', e => NihonCorePrefs.setTimer(e.target.checked));
    return row;
  }

  function enhance(lobby) {
    const sections = Array.prototype.filter.call(lobby.children, c => c.classList.contains('lobby-section'));
    if (!sections.length || lobby.querySelector(':scope > .lobby-custom')) return;

    const isMode = s => s.hasAttribute('data-lobby-keep') || !!s.querySelector('[class*="mode-row"]');
    const modeSections = sections.filter(isMode);
    const rest = sections.filter(s => !isMode(s));
    const start = Array.prototype.find.call(lobby.children, c => c.classList.contains('ml-start'));
    const stats = Array.prototype.find.call(lobby.children, c => c.classList.contains('lobby-stats'));
    if (!start || !rest.length) return;

    // a szekció-címkék sorszámai az új sorrendben már nem igazak
    lobby.querySelectorAll('.lobby-section-label').forEach(l => {
      const first = l.firstChild;
      if (first && first.nodeType === 3) first.nodeValue = first.nodeValue.replace(/^\s*\d+\s*·\s*/, '');
    });

    const details = document.createElement('details');
    details.className = 'lobby-custom';
    details.open = isOpen();
    details.innerHTML =
      '<summary class="lobby-custom-summary">' +
        '<span class="lcs-text"><span class="lcs-title">Testreszabás</span>' +
        '<span class="lcs-sub">szűrők, kártyaszám, haladó beállítások</span></span>' + CHEVRON +
      '</summary><div class="lobby-custom-body"></div>';
    details.addEventListener('toggle', () => {
      try { localStorage.setItem(OPEN_KEY, details.open ? '1' : '0'); } catch (e) {}
    });
    const body = details.querySelector('.lobby-custom-body');

    lobby.insertBefore(details, rest[0]);
    rest.forEach(s => body.appendChild(s));
    if (TIMED_LOBBIES[lobby.id]) body.appendChild(timerRow(TIMED_LOBBIES[lobby.id]));
    if (stats) body.appendChild(stats);

    // Indítás: a mód-szekció(k) után, a Testreszabás elé
    modeSections.forEach(s => lobby.insertBefore(s, details));
    const quick = document.createElement('div');
    quick.className = 'lobby-quick';
    lobby.insertBefore(quick, details);
    quick.appendChild(start);
    lobby.classList.add('lobby-enhanced');

    const title = lobby.querySelector('.lobby-title');
    if (title) title.textContent = modeSections.length ? 'Mit gyakorolnál?' : 'Indulhat a kör';
  }

  function scan(root) {
    (root || document).querySelectorAll(LOBBY_SEL).forEach(enhance);
  }
  function start() {
    scan(document);
    if (!window.MutationObserver) return;
    new MutationObserver(() => scan(document))
      .observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


// ── Kör-billentyűk + fókusz ──
//   Egységes billentyűzet-kezelés minden gyakorló körben:
//     1–9     a megfelelő válaszlehetőség
//     Enter   tovább (a visszajelzés fő gombja) — a gomb fókuszt is kap,
//             így a szóköz és az Enter natívan is működik
//     Esc     kilépés a körből (a megszokott megerősítéssel)
//   A visszajelzés megjelenésekor a fő gombja fókuszt kap; ha a visszajelzés
//   nem rögzített lap (module.html fázisai), a képernyőre is görgetjük.
(function initRoundKeys() {
  const OPTION_SEL = '.cj-option, .cnt-option, .sd-option, .mc-choice';
  const FEEDBACK_SEL = '.conj-feedback, .pr-feedback, .ms-feedback, .cnt-feedback, .sd-advance';
  const visible = el => !!el && el.offsetParent !== null;

  function primaryButton(fb) {
    return fb.querySelector('.btn-primary:not(:disabled)') || fb.querySelector('button:not(:disabled)');
  }
  function openFeedback() {
    const all = document.querySelectorAll(FEEDBACK_SEL);
    for (let i = 0; i < all.length; i++) {
      if (!all[i].classList.contains('hidden') && all[i].childElementCount > 0 &&
          (visible(all[i]) || getComputedStyle(all[i]).position === 'fixed')) return all[i];
    }
    return null;
  }

  document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!window.NihonCoreRound || !NihonCoreRound.isActive()) return;
    const t = e.target;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);

    if (e.key === 'Escape') {
      const exit = Array.prototype.find.call(document.querySelectorAll('.round-exit'), visible);
      if (exit) { e.preventDefault(); exit.click(); }
      return;
    }
    if (typing) return;

    if (e.key === 'Enter') {
      // gombon/linken állva a böngésző maga kattint
      if (t && (t.tagName === 'BUTTON' || t.tagName === 'A')) return;
      const fb = openFeedback();
      const btn = fb && primaryButton(fb);
      if (btn) { e.preventDefault(); btn.click(); }
      return;
    }
    if (/^[1-9]$/.test(e.key)) {
      const opts = Array.prototype.filter.call(document.querySelectorAll(OPTION_SEL), o => visible(o) && !o.disabled);
      const pick = opts[parseInt(e.key, 10) - 1];
      if (pick) { e.preventDefault(); pick.click(); }
    }
  });

  // Visszajelzés megjelent → fókusz a fő gombra (+ görgetés, ha nem rögzített lap)
  function onFeedbackShown(fb) {
    if (fb.classList.contains('hidden') || fb.childElementCount === 0) return;
    requestAnimationFrame(() => {
      const btn = primaryButton(fb);
      if (getComputedStyle(fb).position !== 'fixed') {
        try { fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) {}
      }
      if (btn) { try { btn.focus({ preventScroll: true }); } catch (err) {} }
    });
  }
  function start() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(muts => {
      const seen = new Set();
      muts.forEach(m => {
        const el = m.target && m.target.closest ? m.target.closest(FEEDBACK_SEL) : null;
        if (el && !seen.has(el)) { seen.add(el); onFeedbackShown(el); }
      });
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


// ── NihonCoreFlashcard ── Univerzális 3D flashcard motor (V8) ──
//   Egy újrahasznosítható komponens minden modulhoz:
//   Számláló · Ragozó · Melléknév · Datetime.
//
//   API:
//     NihonCoreFlashcard.mount(containerEl, config)
//   Config:
//     cards:       [{ id, front:{jp,sub,romaji}, back:{meaning,exampleJp,exampleRomaji,exampleHu,meta[]}, category }]
//     categories:  [{ id, label }] — null/üres = nincs szűrő
//     storageKey:  string — a "tudom/nem tudom" perzisztálva ide a localStorage-ba
//     onSwipe:     (card, dir) => void  ('right'=tudom, 'left'=nem tudom)
//     onEnd:       (stats) => void
//
//   UI:
//     - szűrő-bar a kategória chip-ekkel
//     - 3D kártya (rotateY flip) — kattintásra megfordul
//     - swipe balra/jobbra (touch + mouse)
//     - vissza-gomb (◀ Előző)
//     - alsó 2 gomb (Nem tudom · Tudom) ami pontosan ugyanaz mint a swipe
//
//   Lokális storage: kártyánként {known: bool, ts: timestamp}
//     scope = storageKey, mező = nc_fc_state_<scope>
window.NihonCoreFlashcard = (function () {
  function loadState(storageKey) {
    if (!storageKey) return {};
    try { return JSON.parse(localStorage.getItem('nc_fc_state_' + storageKey)) || {}; }
    catch (e) { return {}; }
  }
  function saveState(storageKey, state) {
    if (!storageKey) return;
    try { localStorage.setItem('nc_fc_state_' + storageKey, JSON.stringify(state)); }
    catch (e) {}
  }

  function renderFilter(categories, activeCatId) {
    if (!categories || categories.length === 0) return '';
    let html = '<div class="nc-fc-filter"><span class="nc-fc-filter-label">Szűrő</span>';
    html += `<button class="nc-fc-chip ${!activeCatId ? 'active' : ''}" data-cat="">Mind</button>`;
    for (const c of categories) {
      const cls = (activeCatId === c.id) ? 'active' : '';
      html += `<button class="nc-fc-chip ${cls}" data-cat="${c.id}">${c.label}</button>`;
    }
    html += '</div>';
    return html;
  }

  function renderCardFace(card) {
    const f = card.front || {};
    // Ha van `emoji` mező, akkor "emoji nagy középen → jp kicsiben → romaji még kisebb"
    // hierarchia. Egyébként visszafele kompatibilis: jp nagy + sub + romaji.
    let frontInner;
    if (f.emoji) {
      frontInner = `
        <div class="nc-fc-emoji">${f.emoji}</div>
        ${f.jp ? `<div class="nc-fc-jp-small">${f.jp}</div>` : ''}
        ${f.romaji ? `<div class="nc-fc-romaji-small">${f.romaji}</div>` : ''}`;
    } else {
      frontInner = `
        <div class="nc-fc-jp">${f.jp || ''}</div>
        ${f.sub ? `<div class="nc-fc-sub">${f.sub}</div>` : ''}
        ${f.romaji ? `<div class="nc-fc-romaji">${f.romaji}</div>` : ''}`;
    }
    const frontHtml = `
      <div class="nc-fc-face nc-fc-front">
        <div class="nc-fc-eyebrow">Kattints a megfordításhoz</div>
        ${frontInner}
        <div class="nc-fc-hint">← húzd balra: nem tudom · jobbra: tudom →</div>
      </div>`;
    const b = card.back || {};
    const metaHtml = (b.meta && b.meta.length)
      ? `<div class="nc-fc-meta">${b.meta.map(m => `<span class="nc-fc-meta-chip">${m}</span>`).join('')}</div>`
      : '';
    const backHtml = `
      <div class="nc-fc-face nc-fc-back">
        <div class="nc-fc-back-eyebrow">Jelentés</div>
        <div class="nc-fc-meaning">${b.meaning || ''}</div>
        ${b.exampleJp ? `<div class="nc-fc-example-jp">${b.exampleJp}</div>` : ''}
        ${b.exampleRomaji ? `<div class="nc-fc-example-romaji">${b.exampleRomaji}</div>` : ''}
        ${b.exampleHu ? `<div class="nc-fc-example-hu">${b.exampleHu}</div>` : ''}
        ${metaHtml}
      </div>`;
    return frontHtml + backHtml;
  }

  function mount(rootEl, config) {
    if (!rootEl) return null;
    const cards      = (config.cards || []).slice();
    const categories = config.categories || [];
    const storageKey = config.storageKey || null;
    const onSwipe    = config.onSwipe || (() => {});
    const onEnd      = config.onEnd   || (() => {});

    // Belső állapot
    const state = {
      activeCatId: null,
      deck: [],        // szűrés után aktuális kártyák
      idx: 0,
      flipped: false,
      sessionStats: { yes: 0, no: 0, seen: 0 }
    };
    const persist = loadState(storageKey);

    // Initial render-keret
    rootEl.classList.add('nc-fc-container');
    rootEl.innerHTML = `
      <div class="nc-fc-filter-zone"></div>
      <div class="nc-fc-info"></div>
      <div class="nc-fc-deck"></div>
      <div class="nc-fc-actions">
        <button class="nc-fc-btn nc-fc-btn-prev" type="button" disabled>◀ Előző</button>
        <button class="nc-fc-btn nc-fc-btn-no" type="button">✕ Nem tudom</button>
        <button class="nc-fc-btn nc-fc-btn-yes" type="button">✓ Tudom</button>
      </div>`;

    const filterZone = rootEl.querySelector('.nc-fc-filter-zone');
    const infoEl     = rootEl.querySelector('.nc-fc-info');
    const deckEl     = rootEl.querySelector('.nc-fc-deck');
    const btnPrev    = rootEl.querySelector('.nc-fc-btn-prev');
    const btnNo      = rootEl.querySelector('.nc-fc-btn-no');
    const btnYes     = rootEl.querySelector('.nc-fc-btn-yes');

    function rebuildDeck() {
      state.deck = state.activeCatId
        ? cards.filter(c => c.category === state.activeCatId)
        : cards.slice();
      state.idx = 0;
      state.flipped = false;
    }

    function renderInfo() {
      if (state.deck.length === 0) {
        infoEl.textContent = 'Nincs kártya ebben a kategóriában.';
        return;
      }
      infoEl.innerHTML = `Kártya <strong>${state.idx + 1}</strong> / <strong>${state.deck.length}</strong>`;
    }

    function renderFilterBar() {
      filterZone.innerHTML = renderFilter(categories, state.activeCatId);
      filterZone.querySelectorAll('.nc-fc-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const cid = chip.dataset.cat || null;
          if (cid === state.activeCatId) return;
          state.activeCatId = cid;
          rebuildDeck();
          renderFilterBar();
          renderCard();
          renderInfo();
          updateButtons();
        });
      });
    }

    function renderCard() {
      if (state.deck.length === 0 || state.idx >= state.deck.length) {
        renderSummary();
        return;
      }
      const card = state.deck[state.idx];
      deckEl.innerHTML = `<div class="nc-fc-card" data-card-id="${card.id || ''}">${renderCardFace(card)}</div>`;
      const cardEl = deckEl.querySelector('.nc-fc-card');
      attachCardHandlers(cardEl);
      // Anime.js — kártya bejövetele
      if (window.NihonCoreMotion) window.NihonCoreMotion.cardSlideIn(cardEl);
    }

    function renderSummary() {
      deckEl.innerHTML = `
        <div class="nc-fc-summary">
          <div class="nc-fc-summary-title">🎴 Deck befejezve!</div>
          <div class="nc-fc-summary-stats">
            <div class="nc-fc-summary-stat">
              <span class="nc-fc-summary-stat-num">${state.sessionStats.yes}</span>
              <span class="nc-fc-summary-stat-label">Tudom</span>
            </div>
            <div class="nc-fc-summary-stat">
              <span class="nc-fc-summary-stat-num danger">${state.sessionStats.no}</span>
              <span class="nc-fc-summary-stat-label">Még nem</span>
            </div>
            <div class="nc-fc-summary-stat">
              <span class="nc-fc-summary-stat-num">${state.sessionStats.seen}</span>
              <span class="nc-fc-summary-stat-label">Összes</span>
            </div>
          </div>
          <p style="color: var(--sumi-soft); font-size: 0.95rem; margin-bottom: 18px;">
            ${state.sessionStats.no > 0 ? 'A "Még nem"-mel jelzett kártyákat a szűrő segítségével később újra átnézheted.' : 'Mind ismerős! Próbáld ki a Felismerés vagy az Építkezés módot.'}
          </p>
          <button class="btn btn-primary" id="ncFcRestart" type="button">Újra</button>
        </div>`;
      const restart = document.getElementById('ncFcRestart');
      if (restart) restart.addEventListener('click', () => {
        state.sessionStats = { yes: 0, no: 0, seen: 0 };
        rebuildDeck();
        renderCard();
        renderInfo();
        updateButtons();
      });
      onEnd(Object.assign({}, state.sessionStats));
    }

    function updateButtons() {
      const hasCard  = state.deck.length > 0 && state.idx < state.deck.length;
      btnPrev.disabled = state.idx <= 0 || !hasCard;
      btnNo.disabled   = !hasCard;
      btnYes.disabled  = !hasCard;
    }

    function flipCard() {
      const cardEl = deckEl.querySelector('.nc-fc-card');
      if (!cardEl) return;
      state.flipped = !state.flipped;
      cardEl.classList.toggle('flipped', state.flipped);
    }

    function swipe(direction) {
      const card = state.deck[state.idx];
      if (!card) return;
      const cardEl = deckEl.querySelector('.nc-fc-card');
      const known = (direction === 'right');
      // Lokális state
      if (storageKey && card.id) {
        persist[card.id] = { known, ts: Date.now() };
        saveState(storageKey, persist);
      }
      // Session stats
      state.sessionStats.seen++;
      if (known) state.sessionStats.yes++;
      else       state.sessionStats.no++;
      // Animáció: kicsúsztatás
      if (cardEl && window.anime) {
        anime({
          targets: cardEl,
          translateX: direction === 'right' ? 480 : -480,
          rotate: direction === 'right' ? 14 : -14,
          opacity: [1, 0],
          duration: 280,
          easing: 'easeOutQuad',
          complete: () => {
            state.idx++;
            state.flipped = false;
            renderCard();
            renderInfo();
            updateButtons();
          }
        });
      } else {
        // Fallback animáció nélkül
        state.idx++;
        state.flipped = false;
        renderCard();
        renderInfo();
        updateButtons();
      }
      onSwipe(card, direction);
    }

    function goPrev() {
      if (state.idx <= 0) return;
      state.idx--;
      state.flipped = false;
      // visszafordítjuk a session-stats-ot
      // (egyszerűségi okból nem nyilvántartjuk a megelőző kártya outcome-ját)
      renderCard();
      renderInfo();
      updateButtons();
    }

    function attachCardHandlers(cardEl) {
      // Egységes pointer-logika: mouseup/touchend-ben dönt — vagy flip
      // (kis mozgás), vagy swipe (nagy mozgás), vagy snap-back (közepes).
      // NEM használunk külön 'click' eventet — az nem ad megbízható
      // drag-távolságot, mert a coords túl későn érkeznek.
      let dragStartX = null, dragStartY = null, dragging = false;
      const THRESHOLD = 90;     // pixel — swipe küszöb
      const TAP_MAX   = 10;     // pixel — ennél kisebb mozgás "kattintás" = flip

      function start(x, y) {
        dragStartX = x; dragStartY = y; dragging = true;
      }
      function move(x, y) {
        if (!dragging || dragStartX === null) return;
        const dx = x - dragStartX;
        const dy = y - dragStartY;
        // Csak akkor mozgatjuk a kártyát, ha tényleg drag-elnek
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
          cardEl.style.transition = 'none';
          const rot = dx / 30;
          cardEl.style.transform = `translateX(${dx}px) rotate(${rot}deg)${state.flipped ? ' rotateY(180deg)' : ''}`;
          cardEl.classList.toggle('swipe-right', dx > 0);
          cardEl.classList.toggle('swipe-left',  dx < 0);
        }
      }
      function end(x, y) {
        if (!dragging) return;
        dragging = false;
        const dx = x - dragStartX;
        const dy = y - dragStartY;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        cardEl.style.transition = '';
        cardEl.classList.remove('swipe-right', 'swipe-left');

        if (dist <= TAP_MAX) {
          // Kis mozgás → kattintás-szerű → FLIP
          flipCard();
        } else if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          // Nagy horizontális mozgás → SWIPE
          swipe(dx > 0 ? 'right' : 'left');
        } else {
          // Közepes mozgás → snap-back az eredeti pozícióra
          cardEl.style.transform = state.flipped ? 'rotateY(180deg)' : '';
        }
        dragStartX = dragStartY = null;
      }

      cardEl.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientX, e.clientY); });
      cardEl.addEventListener('mousemove', e => move(e.clientX, e.clientY));
      cardEl.addEventListener('mouseup',   e => end(e.clientX, e.clientY));
      cardEl.addEventListener('mouseleave', e => { if (dragging) end(e.clientX, e.clientY); });

      cardEl.addEventListener('touchstart', e => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
      cardEl.addEventListener('touchmove',  e => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
      cardEl.addEventListener('touchend',   e => {
        const t = (e.changedTouches && e.changedTouches[0]) || { clientX: dragStartX || 0, clientY: dragStartY || 0 };
        end(t.clientX, t.clientY);
      });
    }

    // Gomb-eventek
    btnPrev.addEventListener('click', goPrev);
    btnNo.addEventListener('click',  () => swipe('left'));
    btnYes.addEventListener('click', () => swipe('right'));

    // Inicializálás
    rebuildDeck();
    renderFilterBar();
    renderCard();
    renderInfo();
    updateButtons();

    return {
      // publikus API a hívóknak
      destroy() {
        rootEl.innerHTML = '';
        rootEl.classList.remove('nc-fc-container');
      },
      getStats: () => Object.assign({}, state.sessionStats),
      getPersist: () => Object.assign({}, persist)
    };
  }

  return { mount };
})();


// ── Flashcard launcherek — modul-specifikus adapterek + modal overlay ──
// A 3 mód-alapú modul (Ragozó/Melléknév/Datetime) egy "📖 Szótár" gombbal
// indít flashcard-böngészést egy overlay-ben. A gomb mark-up:
//   <button data-flashcard-launcher="verbs|adjectives|datetime">📖 Szótár</button>
(function initFlashcardLaunchers() {
  function adapterVerbs() {
    const verbs = (typeof NIHONCORE_VERBS !== 'undefined') ? NIHONCORE_VERBS : [];
    // V8: a theme mezőt használjuk kategória-szűrésre (a user által definiált
    // 6 tematikus csoport). A `group` (godan/ichidan/irregular) a hátoldali
    // meta-chip-ekben jelenik meg.
    const THEME_LABELS = {
      clothing:     '👕 Ruházkodás',
      transitivity: '⇄ Tranzitív/Intranz.',
      giving:       '🎁 Adás-Kapás',
      movement:     '🚶 Mozgás',
      weather:      '☀️ Időjárás',
      state:        '✨ Állapot/Érzék',
      daily:        '🏠 Mindennapok'
    };
    const cards = verbs.map(v => {
      const theme    = v.theme || 'daily';
      const groupTag = v.group + (v.pseudoIchidan ? ' (ál-ichidan)' : '');
      const themeChip = THEME_LABELS[theme] || theme;
      return {
        id: 'fcv_' + v.id,
        category: theme,   // szűrőhöz a tematikus kategória
        front: { jp: v.kanji, sub: v.kana, romaji: v.romaji },
        back: {
          meaning: v.meaningHu,
          exampleJp: v.example && v.example.jp,
          exampleRomaji: v.example && v.example.romaji,
          exampleHu: v.example && v.example.hu,
          meta: [v.level, groupTag, themeChip]
        }
      };
    });
    // Csak azokat a kategóriákat mutatjuk, amelyekre van valódi ige
    const used = {};
    verbs.forEach(v => { used[v.theme || 'daily'] = true; });
    const order = ['daily', 'movement', 'transitivity', 'clothing', 'giving', 'state', 'weather'];
    const categories = order.filter(id => used[id]).map(id => ({ id, label: THEME_LABELS[id] || id }));
    return { cards, categories, storageKey: 'verbs' };
  }

  function adapterAdjectives() {
    const iAdj  = (typeof NIHONCORE_I_ADJECTIVES  !== 'undefined') ? NIHONCORE_I_ADJECTIVES  : [];
    const naAdj = (typeof NIHONCORE_NA_ADJECTIVES !== 'undefined') ? NIHONCORE_NA_ADJECTIVES : [];
    const cards = [];
    for (const a of iAdj) {
      cards.push({
        id: 'fca_' + a.id, category: 'i-adj',
        front: { jp: a.kanji, sub: a.kana, romaji: a.romaji },
        back: {
          meaning: a.meaningHu,
          exampleJp: a.example && a.example.jp,
          exampleRomaji: a.example && a.example.romaji,
          exampleHu: a.example && a.example.hu,
          meta: [a.level || 'N5', 'i-adj', a.exception ? '⚠ kivétel' : ''].filter(Boolean)
        }
      });
    }
    for (const a of naAdj) {
      cards.push({
        id: 'fca_' + a.id, category: 'na-adj',
        front: { jp: a.kanji, sub: a.kana, romaji: a.romaji },
        back: {
          meaning: a.meaningHu,
          exampleJp: a.example && a.example.jp,
          exampleRomaji: a.example && a.example.romaji,
          exampleHu: a.example && a.example.hu,
          meta: [a.level || 'N5', 'na-adj', a.note ? 'ⓘ' : ''].filter(Boolean)
        }
      });
    }
    const categories = [
      { id: 'i-adj',  label: 'i-melléknév' },
      { id: 'na-adj', label: 'na-melléknév' }
    ];
    return { cards, categories, storageKey: 'adjectives' };
  }

  function adapterDatetime() {
    const cards = [];
    const cats = [];
    const datasets = [
      { id: 'months',   label: '📅 Hónapok',   arr: (typeof NIHONCORE_DT_MONTHS   !== 'undefined') ? NIHONCORE_DT_MONTHS   : [] },
      { id: 'days',     label: '🗓️ Napok',     arr: (typeof NIHONCORE_DT_DAYS     !== 'undefined') ? NIHONCORE_DT_DAYS     : [] },
      { id: 'weekdays', label: '📆 Hét napjai', arr: (typeof NIHONCORE_DT_WEEKDAYS !== 'undefined') ? NIHONCORE_DT_WEEKDAYS : [] },
      { id: 'times',    label: '🕘 Időpontok', arr: (typeof NIHONCORE_DT_TIMES    !== 'undefined') ? NIHONCORE_DT_TIMES    : [] },
      { id: 'hours24',  label: '🕓 24 óra',    arr: (typeof NIHONCORE_DT_HOURS24  !== 'undefined') ? NIHONCORE_DT_HOURS24  : [] },
      { id: 'minutes',  label: '⏱️ Percek',    arr: (typeof NIHONCORE_DT_MINUTES  !== 'undefined') ? NIHONCORE_DT_MINUTES  : [] },
      { id: 'years',    label: '📰 Évek',      arr: (typeof NIHONCORE_DT_YEARS    !== 'undefined') ? NIHONCORE_DT_YEARS    : [] },
      { id: 'relative', label: '⏳ Relatív',   arr: (typeof NIHONCORE_DT_RELATIVE !== 'undefined') ? NIHONCORE_DT_RELATIVE : [] }
    ];
    for (const ds of datasets) {
      if (ds.arr.length === 0) continue;
      cats.push({ id: ds.id, label: ds.label });
      for (const item of ds.arr) {
        cards.push({
          id: 'fcd_' + item.id,
          category: ds.id,
          front: { jp: item.kanji || item.kana, sub: item.kana, romaji: item.romaji },
          back: { meaning: item.meaningHu, meta: [ds.label] }
        });
      }
    }
    return { cards, categories: cats, storageKey: 'datetime' };
  }

  const ADAPTERS = {
    verbs:      adapterVerbs,
    adjectives: adapterAdjectives,
    datetime:   adapterDatetime
  };

  function openOverlay(type) {
    const adapter = ADAPTERS[type];
    if (!adapter) return;
    const data = adapter();
    // Overlay létrehozása
    const overlay = document.createElement('div');
    overlay.className = 'nc-fc-overlay';
    overlay.innerHTML = `
      <div class="nc-fc-overlay-card">
        <button class="nc-fc-overlay-close" type="button" aria-label="Bezárás">✕</button>
        <div class="nc-fc-overlay-title">Szókártyák</div>
        <div class="nc-fc-overlay-root"></div>
      </div>`;
    document.body.appendChild(overlay);
    document.body.classList.add('nc-fc-overlay-open');

    const root = overlay.querySelector('.nc-fc-overlay-root');
    let instance = null;
    if (window.NihonCoreFlashcard) {
      instance = window.NihonCoreFlashcard.mount(root, data);
    }

    function close() {
      if (instance && instance.destroy) instance.destroy();
      document.body.classList.remove('nc-fc-overlay-open');
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    overlay.querySelector('.nc-fc-overlay-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-flashcard-launcher]');
    if (!btn) return;
    e.preventDefault();
    const type = btn.getAttribute('data-flashcard-launcher');
    openOverlay(type);
  });

  /* ── Párosító ──────────────────────────────────────────
     Szó ↔ jelentés párosítás a modul szókészletéből (ugyanazok az adapterek,
     mint a szókártyáknál). Egy tábla 5 pár; egy kör 4 tábla (20 szó).
     Kezdőbarát bemelegítés: nincs időlimit, a hibás pár csak megrázkódik,
     a végén megmutatja, mit érdemes átnézni. */
  const MATCH_MODULE = { verbs: 'conjugation', adjectives: 'adjectives', datetime: 'datetime' };
  const MATCH_BOARD = 5, MATCH_BOARDS = 4;

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const escHtml = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function openMatch(type) {
    const adapter = ADAPTERS[type];
    if (!adapter) return;
    const data = adapter();
    const state = { cat: 'all', boards: [], boardIdx: 0, results: [], startTs: 0, pick: null, missed: null, done: null };

    const overlay = document.createElement('div');
    overlay.className = 'nc-fc-overlay';
    overlay.innerHTML =
      '<div class="nc-fc-overlay-card nc-match" role="dialog" aria-modal="true" aria-label="Párosító">' +
        '<button class="nc-fc-overlay-close" type="button" aria-label="Bezárás">✕</button>' +
        '<div class="nc-fc-overlay-title">Párosító</div>' +
        '<div class="nc-match-root"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.classList.add('nc-fc-overlay-open');
    const root = overlay.querySelector('.nc-match-root');

    function pool() {
      return data.cards.filter(c => c.back && c.back.meaning && (state.cat === 'all' || c.category === state.cat));
    }
    // Egy táblán belül ne legyen két azonos jelentés vagy azonos szó
    function buildBoards() {
      const boards = [];
      // Könnyebb szavak előre: szintenként keverünk (N5 → N1), így a kezdő
      // előbb az alapszókincset kapja. Ahol nincs szint (pl. dátumok), sima keverés.
      const rank = c => { const m = /^N([1-5])$/.exec(String((c.back.meta || [])[0] || '')); return m ? 5 - parseInt(m[1], 10) : 0; };
      let rest = [];
      [0, 1, 2, 3, 4].forEach(r => { rest = rest.concat(shuffled(pool().filter(c => rank(c) === r))); });
      while (boards.length < MATCH_BOARDS && rest.length >= 2) {
        const board = [], usedMeaning = new Set(), usedJp = new Set(), skipped = [];
        rest.forEach(c => {
          if (board.length < MATCH_BOARD && !usedMeaning.has(c.back.meaning) && !usedJp.has(c.front.jp)) {
            board.push(c); usedMeaning.add(c.back.meaning); usedJp.add(c.front.jp);
          } else skipped.push(c);
        });
        if (board.length < 2) break;
        boards.push(board);
        rest = skipped;
      }
      return boards;
    }

    function renderStart() {
      const chips = [{ id: 'all', label: 'Mind' }].concat(data.categories || []).map(c =>
        '<button class="nc-fc-chip' + (state.cat === c.id ? ' active' : '') + '" type="button" data-cat="' + c.id + '">' + escHtml(c.label) + '</button>').join('');
      root.innerHTML =
        '<p class="nc-match-intro">Párosítsd a japán szót a magyar jelentésével. Koppints egy szóra, aztán a párjára.</p>' +
        '<div class="nc-fc-filter">' + chips + '</div>' +
        '<p class="nc-match-count">' + pool().length + ' szó ebben a csoportban</p>' +
        '<button class="btn btn-primary ml-start nc-match-start" type="button"' + (pool().length < 2 ? ' disabled' : '') + '>Indítás</button>';
      root.querySelectorAll('.nc-fc-chip').forEach(ch => ch.addEventListener('click', () => { state.cat = ch.dataset.cat; renderStart(); }));
      root.querySelector('.nc-match-start').addEventListener('click', () => {
        state.boards = buildBoards(); state.boardIdx = 0; state.results = []; state.startTs = Date.now();
        if (state.boards.length) renderBoard();
      });
    }

    function renderBoard() {
      const board = state.boards[state.boardIdx];
      state.pick = null; state.missed = new Set(); state.done = new Set();
      const left = shuffled(board), right = shuffled(board);
      root.innerHTML =
        '<div class="nc-match-progress"><span>Tábla ' + (state.boardIdx + 1) + ' / ' + state.boards.length + '</span>' +
          '<div class="round-progress-bar"><div class="round-progress-fill" style="width:' + (state.boardIdx / state.boards.length) * 100 + '%"></div></div></div>' +
        '<div class="kana-match nc-match-board">' +
          '<div class="kana-match-col">' + left.map(c =>
            '<button class="kana-match-btn nc-match-jp" type="button" data-side="k" data-id="' + c.id + '">' +
              '<span class="nc-match-word" lang="ja">' + escHtml(c.front.jp) + '</span>' +
              (c.front.sub && c.front.sub !== c.front.jp ? '<span class="nc-match-sub" lang="ja">' + escHtml(c.front.sub) + '</span>' : '') +
            '</button>').join('') + '</div>' +
          '<div class="kana-match-col">' + right.map(c =>
            '<button class="kana-match-btn nc-match-hu" type="button" data-side="r" data-id="' + c.id + '">' + escHtml(c.back.meaning) + '</button>').join('') + '</div>' +
        '</div>';

      root.querySelectorAll('.kana-match-btn').forEach(btn => btn.addEventListener('click', () => {
        if (btn.disabled) return;
        if (!state.pick || state.pick.dataset.side === btn.dataset.side) {
          if (state.pick) state.pick.classList.remove('selected');
          state.pick = (state.pick === btn) ? null : btn;
          if (state.pick) btn.classList.add('selected');
          return;
        }
        const a = state.pick, b = btn;
        a.classList.remove('selected'); state.pick = null;
        if (a.dataset.id === b.dataset.id) {
          [a, b].forEach(x => { x.classList.add('matched'); x.disabled = true; });
          state.done.add(a.dataset.id);
          if (state.done.size === board.length) setTimeout(finishBoard, 500);
        } else {
          state.missed.add((a.dataset.side === 'k' ? a : b).dataset.id);
          [a, b].forEach(x => { x.classList.add('mismatch'); setTimeout(() => x.classList.remove('mismatch'), 420); });
        }
      }));
    }

    function finishBoard() {
      state.boards[state.boardIdx].forEach(c => state.results.push({ cardId: c.id, correct: !state.missed.has(c.id), card: c }));
      state.boardIdx++;
      if (state.boardIdx < state.boards.length) renderBoard(); else renderSummary();
    }

    function renderSummary() {
      const total = state.results.length;
      const ok = state.results.filter(r => r.correct).length;
      if (window.NihonCoreStats && MATCH_MODULE[type]) {
        NihonCoreStats.recordSession({
          module: MATCH_MODULE[type], mode: 'match', skipPath: true,
          results: state.results.map(r => ({ correct: r.correct, errorCode: r.correct ? null : 'wrong_pair' })),
          score: ok * 10, startTs: state.startTs
        });
      }
      const missed = state.results.filter(r => !r.correct);
      root.innerHTML =
        '<div class="nc-match-summary">' +
          '<div class="summary-score">' + ok + ' / ' + total + '</div>' +
          '<p class="nc-match-intro">' + (missed.length ? 'elsőre eltalálva. Ezeket érdemes átnézni:' : 'Mind elsőre megvolt.') + '</p>' +
          (missed.length ? '<div class="kana-missed-list">' + missed.map(r =>
            '<span class="kana-missed-chip"><span lang="ja">' + escHtml(r.card.front.jp) + '</span> ' + escHtml(r.card.back.meaning) + '</span>').join('') + '</div>' : '') +
          '<div class="kana-summary-actions">' +
            '<button class="btn btn-primary nc-match-again" type="button">Még egy kör</button>' +
            '<button class="btn btn-outline nc-match-close" type="button">Bezárás</button>' +
          '</div>' +
        '</div>';
      root.querySelector('.nc-match-again').addEventListener('click', renderStart);
      root.querySelector('.nc-match-close').addEventListener('click', close);
    }

    function close() {
      document.body.classList.remove('nc-fc-overlay-open');
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    overlay.querySelector('.nc-fc-overlay-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);
    renderStart();
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-match-launcher]');
    if (!btn) return;
    e.preventDefault();
    openMatch(btn.getAttribute('data-match-launcher'));
  });
})();


// ── PWA install prompt + SW update banner (V8) ──
//   1) "Telepítsd a telefonra" toast a beforeinstallprompt eventen
//   2) "Új verzió elérhető — frissítés" toast amikor a SW új verziót talál
//   Mindkettő opt-in: a user "Mégsem"-mel elutasíthatja, és nem zaklatjuk újra
//   egy ideig (localStorage-szel tárolva).
(function initPWAToasts() {
  if (typeof document === 'undefined') return;
  const LS = {
    installDismissed: 'nihoncore_pwa_install_dismissed_ts'
  };
  const DISMISS_COOLDOWN_DAYS = 14;

  function showToast(opts) {
    // opts: { id, icon, title, sub, ctaLabel, onCta, onClose? }
    if (document.querySelector('#' + opts.id)) return; // ne dupla
    const el = document.createElement('div');
    el.className = 'nc-toast';
    el.id = opts.id;
    el.innerHTML = `
      <span class="nc-toast-icon">${opts.icon || '✨'}</span>
      <div class="nc-toast-body">
        <div class="nc-toast-title">${opts.title}</div>
        ${opts.sub ? `<div class="nc-toast-sub">${opts.sub}</div>` : ''}
      </div>
      <div class="nc-toast-actions">
        ${opts.ctaLabel ? `<button class="nc-toast-btn" type="button" data-act="cta">${opts.ctaLabel}</button>` : ''}
        <button class="nc-toast-close" type="button" data-act="close" aria-label="Bezárás">✕</button>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));

    function close() {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 280);
      if (typeof opts.onClose === 'function') opts.onClose();
    }
    el.querySelector('[data-act="cta"]')?.addEventListener('click', () => {
      if (typeof opts.onCta === 'function') opts.onCta();
      close();
    });
    el.querySelector('[data-act="close"]')?.addEventListener('click', close);
  }

  /* ── 1) PWA install prompt ────────────────────────── */
  let deferredInstallPrompt = null;
  function isRecentDismissal() {
    try {
      const ts = parseInt(localStorage.getItem(LS.installDismissed) || '0', 10);
      if (!ts) return false;
      const days = (Date.now() - ts) / (24 * 60 * 60 * 1000);
      return days < DISMISS_COOLDOWN_DAYS;
    } catch (e) { return false; }
  }
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    // Ne villantsd ki azonnal — 4 másodperc late, hogy a user először az app-ot lássa
    if (isRecentDismissal()) return;
    setTimeout(() => {
      if (!deferredInstallPrompt) return;
      showToast({
        id: 'nc-toast-pwa-install',
        icon: '📲',
        title: 'Telepítsd a telefonra',
        sub: 'Offline elérhető, gyorsabb betöltés, főképernyő-ikon.',
        ctaLabel: 'Telepítés',
        onCta: async () => {
          try {
            deferredInstallPrompt.prompt();
            const choice = await deferredInstallPrompt.userChoice;
            // 'accepted' vagy 'dismissed'
            if (choice && choice.outcome === 'dismissed') {
              try { localStorage.setItem(LS.installDismissed, String(Date.now())); } catch (e) {}
            }
          } catch (err) { /* csendes */ }
          deferredInstallPrompt = null;
        },
        onClose: () => {
          try { localStorage.setItem(LS.installDismissed, String(Date.now())); } catch (e) {}
        }
      });
    }, 4000);
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    document.querySelector('#nc-toast-pwa-install')?.remove();
  });

  /* ── 2) SW új verzió banner ────────────────────────── */
  function watchSWUpdates() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistration().then(reg => {
      if (!reg) return;

      function offerReload(worker) {
        showToast({
          id: 'nc-toast-sw-update',
          icon: '✨',
          title: 'Új verzió elérhető',
          sub: 'Frissítsd az alkalmazást a legújabb tartalomért.',
          ctaLabel: 'Frissítés',
          onCta: () => {
            // A SW activate után controllerchange — automatikus reload
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            }, { once: true });
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      }

      // Ha már létezik egy "waiting" SW (előző látogatás után)
      if (reg.waiting && navigator.serviceWorker.controller) {
        offerReload(reg.waiting);
      }

      // Új SW települ → várjuk az installed állapotot
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        if (!newSW) return;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            offerReload(newSW);
          }
        });
      });
    }).catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchSWUpdates);
  } else {
    watchSWUpdates();
  }
})();


// ── NihonCoreTheme ── Sumi (sötét) téma toggle ──
//   A washi (világos) az alapértelmezett. A user toggle-eli a fejléc
//   közelében elhelyezett gombbal — localStorage perzisztálja.
//   Az inicializálás flicker-mentes: a HTML <head>-ben egy mini-IIFE
//   olvassa a localStorage-t és felteszi a class-t a CSS load előtt.
//   Ez az IIFE csak a toggle-eseményt és a dinamikus gomb-beillesztést kezeli.
(function initNihonCoreTheme() {
  const STORAGE_KEY = 'nihoncore_theme';
  const root = document.documentElement;

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'sumi' ? 'sumi' : 'washi';
    } catch (e) { return 'washi'; }
  }
  function setTheme(t) {
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
    // Smooth-transition class — 220ms alatt átolvad
    root.classList.add('theme-transition');
    if (t === 'sumi') root.classList.add('theme-sumi');
    else              root.classList.remove('theme-sumi');
    // Frissítsd a meta theme-color-t is (PWA telefonon)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'sumi' ? '#141829' : '#E9EDF6');
    // Frissítsd minden injektált toggle-gomb ikonját
    document.querySelectorAll('.ht-theme-btn').forEach(btn => paintButton(btn, t));
    // Eltávolítjuk a transition class-t a tranzíció után — különben minden mozgás 220ms lenne
    setTimeout(() => root.classList.remove('theme-transition'), 260);
  }
  function toggle() {
    setTheme(getTheme() === 'sumi' ? 'washi' : 'sumi');
  }

  const ICON_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_SUN  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  function paintButton(btn, t) {
    btn.innerHTML = t === 'sumi' ? ICON_SUN : ICON_MOON;
    const label = t === 'sumi' ? 'Világos téma' : 'Sötét téma';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  // Egy téma-gomb a fejléc jobb oldalán, minden oldalon ugyanott.
  function injectThemeButton() {
    const authBtns = document.querySelector('.header .auth-buttons');
    if (!authBtns || authBtns.querySelector('.ht-theme-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'nc-icon-btn ht-theme-btn';
    btn.type = 'button';
    paintButton(btn, getTheme());
    btn.addEventListener('click', toggle);
    const home = authBtns.querySelector('.btn-home');
    if (home) authBtns.insertBefore(btn, home);
    else      authBtns.appendChild(btn);
  }

  function setup() {
    injectThemeButton();
    // a mentett téma szerint a böngésző-keret színe is (PWA telefonon)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getTheme() === 'sumi' ? '#141829' : '#E9EDF6');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  window.NihonCoreTheme = { get: getTheme, set: setTheme, toggle: toggle, inject: setup };
})();


// ── Alsó fül-sáv (telefon) ──
//   768px alatt ez a fő navigáció: Kezdőlap · Modulok · Statisztika · Fiók.
//   Minden oldalon ugyanaz, a body végére injektálva. Kör közben a
//   body.round-active rejti (style.css), hogy a kártyáé legyen a hely.
(function initAppTabbar() {
  const svg = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const ICONS = {
    home:    svg('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'),
    modules: svg('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
    stats:   svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    account: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>')
  };

  function inPages() { return window.location.pathname.includes('/pages/'); }
  function onIndex() { return !inPages(); }

  function onModules() { return /\/modules\.html$/.test(window.location.pathname); }

  // A Modulok oldal és minden modul-oldal a „Modulok" fülhöz tartozik.
  function currentTab() {
    const p = window.location.pathname;
    if (/\/stats\.html$/.test(p)) return 'stats';
    if (/\/(login|register)\.html$/.test(p)) return 'account';
    return inPages() ? 'modules' : 'home';
  }

  function setup() {
    if (document.querySelector('.nc-tabbar') || !document.body) return;
    const root = inPages() ? '../' : '';
    const tabs = [
      { id: 'home',    label: 'Kezdőlap',    href: root + 'index.html' },
      { id: 'modules', label: 'Modulok',     href: root + 'pages/modules.html' },
      { id: 'stats',   label: 'Statisztika', href: root + 'pages/stats.html' },
      { id: 'account', label: 'Fiók',        href: root + 'pages/login.html' }
    ];
    const cur = currentTab();
    const nav = document.createElement('nav');
    nav.className = 'nc-tabbar';
    nav.setAttribute('aria-label', 'Fő navigáció');
    nav.innerHTML = tabs.map(t =>
      '<a class="nc-tab' + (t.id === cur ? ' active' : '') + '" data-tab="' + t.id + '" href="' + t.href + '"' +
      (t.id === cur ? ' aria-current="page"' : '') + '>' + ICONS[t.id] + '<span>' + t.label + '</span></a>'
    ).join('');
    document.body.appendChild(nav);

    // Azon az oldalon, ahová a fül vinne, nem tölt újra: a lap tetejére görget.
    const toTop = (tab, here) => nav.querySelector('[data-tab="' + tab + '"]').addEventListener('click', e => {
      if (!here()) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { history.replaceState(null, '', window.location.pathname); } catch (err) {}
    });
    toTop('home', onIndex);
    toTop('modules', onModules);
    // Fiók: bejelentkezve a fejléc fiók-menüjét nyitja (nincs külön profil-oldal);
    // kijelentkezve a link a belépésre visz.
    nav.querySelector('[data-tab="account"]').addEventListener('click', e => {
      const userBtn = document.querySelector('.nc-user-btn');
      if (!userBtn) return;
      e.preventDefault(); e.stopPropagation();
      userBtn.click();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();


// ── Header login-state (V16) ──
//   A NihonCoreAuth.onChange-re figyel, és a fejléc "Bejelentkezés"
//   linkjét lecseréli a user nevére + kijelentkezés gombra.
//   Minden oldalon fut (univerzális). file:// alatt no-op (auth off).
(function initAuthHeaderState() {
  if (!window.NihonCoreAuth) return;

  function displayName(user) {
    if (!user) return '';
    return user.displayName || (user.email ? user.email.split('@')[0] : 'Felhasználó');
  }
  // Path-detektálás: a stats.html / index.html a pages/ vagy a root felől
  function inPages() { return window.location.pathname.includes('/pages/'); }
  function statsHref() { return inPages() ? 'stats.html' : 'pages/stats.html'; }
  function homeHref()  { return inPages() ? '../index.html' : 'index.html'; }

  function render(user) {
    const authBtns = document.querySelector('.auth-buttons');
    if (!authBtns) return;

    // A "Bejelentkezés" + "Regisztráció" linkek
    const loginLink = authBtns.querySelector('a[href*="login"]');
    const regLink   = authBtns.querySelector('a[href*="register"]');

    // Régi user-chip eltávolítása (újra-render)
    authBtns.querySelector('.nc-user-chip')?.remove();

    if (user) {
      // Bejelentkezve — login/register linkek elrejtése + user-chip
      if (loginLink) loginLink.style.display = 'none';
      if (regLink)   regLink.style.display = 'none';

      const chip = document.createElement('div');
      chip.className = 'nc-user-chip';
      chip.innerHTML = `
        <button class="nc-user-btn" type="button" title="Fiók">
          <span class="nc-user-avatar">${displayName(user).charAt(0).toUpperCase()}</span>
          <span class="nc-user-name">${displayName(user)}</span>
        </button>
        <div class="nc-user-menu" hidden>
          <div class="nc-user-menu-name">${displayName(user)}</div>
          <div class="nc-user-menu-email">${user.email || ''}</div>
          <a class="nc-user-menu-link" href="${statsHref()}">Statisztika</a>
          <a class="nc-user-menu-link" href="${homeHref()}">Kezdőlap</a>
          <div class="nc-sync-status" id="ncSyncStatus">☁️ Felhő-szinkron aktív</div>
          <button class="nc-sync-now" type="button">☁️ Szinkronizálás most</button>
          <button class="nc-user-logout" type="button">Kijelentkezés</button>
        </div>`;
      // A home-gomb ELÉ szúrjuk (ha van), egyébként a végére
      const home = authBtns.querySelector('.btn-home');
      if (home) authBtns.insertBefore(chip, home);
      else      authBtns.appendChild(chip);

      const btn  = chip.querySelector('.nc-user-btn');
      const menu = chip.querySelector('.nc-user-menu');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.hidden = !menu.hidden;
      });
      document.addEventListener('click', () => { menu.hidden = true; });

      // A menü-linkek explicit JS-navigációval mennek, hogy a document
      // click-listener (menü bezárása) ne zavarjon be.
      chip.querySelectorAll('.nc-user-menu-link').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          const href = link.getAttribute('href');
          if (href) window.location.href = href;
        });
      });

      chip.querySelector('.nc-user-logout').addEventListener('click', async () => {
        try { await window.NihonCoreAuth.logout(); } catch (e) {}
        // A render az onChange-ben automatikusan visszaáll
      });

      // V17: manuális szinkronizálás + státusz
      const syncBtn = chip.querySelector('.nc-sync-now');
      const syncStatusEl = chip.querySelector('#ncSyncStatus');
      if (syncBtn && window.NihonCoreSync) {
        syncBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          syncBtn.disabled = true;
          const orig = syncBtn.textContent;
          syncBtn.textContent = '⏳ Szinkronizálás...';
          try { await window.NihonCoreSync.syncNow(); } catch (err) {}
          syncBtn.textContent = '✓ Kész';
          setTimeout(() => { syncBtn.textContent = orig; syncBtn.disabled = false; }, 1500);
        });
      }
      if (syncStatusEl && window.NihonCoreSync) {
        window.NihonCoreSync.onStatus((state, detail) => {
          const el = document.getElementById('ncSyncStatus');
          if (!el) return;
          const map = {
            syncing: '⏳ Szinkronizálás...',
            synced:  '☁️ Szinkronizálva',
            error:   '⚠️ Sync hiba',
            offline: 'ℹ️ Felhő-sync csak online',
            idle:    '☁️ Felhő-szinkron aktív'
          };
          el.textContent = map[state] || el.textContent;
        });
      }
    } else {
      // Nincs bejelentkezve — linkek vissza
      if (loginLink) loginLink.style.display = '';
      if (regLink)   regLink.style.display = '';
    }
  }

  // V20: optimista render a cache-ből — AZONNAL mutatja a bejelentkezett
  // állapotot (nincs 1mp "Bejelentkezés" villanás a lazy Firebase SDK miatt).
  const cached = window.NihonCoreAuth.getCachedUser && window.NihonCoreAuth.getCachedUser();
  if (cached) render(cached);

  // A valós auth-state (a Firebase SDK betöltése után) felülírja a cache-eltet.
  window.NihonCoreAuth.onChange(render);
  // Barba afterEnter után újra-render (a header NEM cserélődik, de biztos ami biztos)
  window.NihonCoreAuthHeaderRender = () => render(window.NihonCoreAuth.getUser());
})();


// ── Univerzális Segítők kapcsoló (Romaji + Magyar) ─
// localStorage-ban perzisztált. body class-okat kapcsol.
(function initHelpersToggle() {
  // romaji / hu: "off"-kulcs (alapból AKTÍV) → body hide-class kapcsol.
  // audio: "on"-kulcs (alapból INAKTÍV, opt-in) → viselkedés-flag,
  //        a NihonCoreAudio.speakAnswer olvassa ki (V3 P2 F).
  const HIDE = {
    romaji: { key: 'nihoncore_helpers_romaji_off', cls: 'helpers-no-romaji' },
    hu:     { key: 'nihoncore_helpers_hu_off',     cls: 'helpers-no-hu' }
  };
  const AUDIO_KEY = 'nihoncore_audio_on';

  // Body classok azonnali alkalmazása (flicker nélkül)
  Object.keys(HIDE).forEach(h => {
    if (localStorage.getItem(HIDE[h].key) === '1') {
      document.body.classList.add(HIDE[h].cls);
    }
  });

  // Gombok beállítása + kattintáskezelő (no-op ha nincs gomb az oldalon)
  document.querySelectorAll('.ht-btn').forEach(btn => {
    const helper = btn.dataset.helper;

    // 🔊 Hang — opt-in viselkedés-kapcsoló (nincs body hide-class)
    if (helper === 'audio') {
      btn.classList.toggle('active', localStorage.getItem(AUDIO_KEY) === '1');
      btn.addEventListener('click', () => {
        const willBeOn = !btn.classList.contains('active');
        btn.classList.toggle('active', willBeOn);
        if (willBeOn) localStorage.setItem(AUDIO_KEY, '1');
        else          localStorage.removeItem(AUDIO_KEY);
      });
      return;
    }

    const cfg = HIDE[helper];
    if (!cfg) return;
    const isOff = localStorage.getItem(cfg.key) === '1';
    btn.classList.toggle('active', !isOff);

    btn.addEventListener('click', () => {
      const willBeActive = !btn.classList.contains('active');
      btn.classList.toggle('active', willBeActive);
      document.body.classList.toggle(cfg.cls, !willBeActive);
      if (willBeActive) localStorage.removeItem(cfg.key);
      else              localStorage.setItem(cfg.key, '1');
    });
  });
})();

// ── Header scroll hatás (sötétebb lesz görgetéskor) ─
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return; // auth oldalak nem rendelkeznek header-rel
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else                     header.classList.remove('scrolled');
  }, { passive: true });
})();

// ── PWA Service Worker registráció (V7-Nap3) ────
// 1 helyen regisztrálva minden HTML-re, mert mindegyik HTML
// behúzza az app.js-t. `file://` protokollon NEM regisztrál
// (csak HTTPS / localhost engedélyezi a SW-t).
//
// FONTOS — az app.js most a /js/ mappában van, sw.js pedig a ROOT-ban.
// A root-URL-t a script-src-ből számoljuk: az app.js src-jének SZÜLŐ
// mappája a /js/, annak szülője pedig a ROOT. Mind az index.html (root)
// mind a /pages/*.html abszolút URL-en hivatkozik az app.js-re, ezért
// `new URL(...)` mindkét esetben helyes ROOT-ot ad.
(function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1') return;

  // A jelenleg futó script-src → /js/-en belül van → parent = ROOT
  const thisScript = document.currentScript ||
                     document.querySelector('script[src$="/js/app.js"]') ||
                     document.querySelector('script[src$="app.js"]');
  if (!thisScript || !thisScript.src) return;
  const scriptUrl = new URL(thisScript.src);          // /.../js/app.js
  const jsDirUrl  = new URL('./', scriptUrl);          // /.../js/
  const rootUrl   = new URL('../', jsDirUrl);          // /.../  (ROOT)
  const swUrl     = new URL('sw.js', rootUrl);         // /.../sw.js

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swUrl, { scope: rootUrl })
      .then(reg => {
        // Frissítés-figyelés: ha van új SW, a felhasználó következő
        // page-load-jakor aktívvá válik (skipWaiting + claim).
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              // console.log('SW frissítés letöltve — frissítsd az oldalt');
            }
          });
        });
      })
      .catch(err => {
        // Csendben — a SW opcionális, az app működik nélküle is.
        // console.warn('SW register fail:', err);
      });
  });
})();


/* ====================================================
   NIHONCORE AUDIO ENGINE — V3 (globális, minden oldal)
   ----------------------------------------------------
   Japán TTS a Google Translate (nem hivatalos) endpoint-
   járól. NEM window.speechSynthesis (iOS-inkompatibilis,
   robotikus, instabil).

   Lejátszás: <audio> elem (media-playback NEM CORS-köteles).
   Cache: Map<text, HTMLAudioElement> — első lejátszás után
   instant replay. Védekező: ha az audio hibázik, az
   onErrorCb meghívódik (a hívó modul szöveg-fallbackre vált).

   API:  NihonCoreAudio.play(text, { speed, onError })
         NihonCoreAudio.preload(text)
         NihonCoreAudio.stop()
   ==================================================== */
const NihonCoreAudio = (function () {
  const cache = new Map();         // text → HTMLAudioElement
  let current = null;              // épp játszó elem

  function buildUrl(text) {
    const q = encodeURIComponent(text);
    return 'https://translate.google.com/translate_tts'
         + '?ie=UTF-8&tl=ja&client=tw-ob&q=' + q;
  }

  function getAudio(text) {
    if (cache.has(text)) return cache.get(text);
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = buildUrl(text);
    cache.set(text, audio);
    return audio;
  }

  let speechOnly = false;          // a TTS-végpont hibázott → innentől a böngésző felolvasója
  function canSpeak() {
    return typeof window.speechSynthesis !== 'undefined' &&
           typeof window.SpeechSynthesisUtterance !== 'undefined';
  }
  // Felolvasás a böngésző japán hangjával. false, ha nincs rá mód.
  function speak(text, options) {
    if (!canSpeak()) return false;
    try {
      const voices = window.speechSynthesis.getVoices() || [];
      const ja = voices.find(v => /^ja/i.test(v.lang));
      if (voices.length && !ja) return false;          // van hanglista, de nincs benne japán
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      if (ja) u.voice = ja;
      u.rate = Math.max(0.5, Math.min(1.2, options.speed || 1.0));
      u.onerror = function () { if (typeof options.onError === 'function') options.onError(); };
      if (typeof options.onEnd === 'function') u.onend = function () { options.onEnd(); };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stop() {
    if (current) {
      try { current.pause(); current.currentTime = 0; } catch (e) {}
      current = null;
    }
    if (canSpeak()) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  // Lejátszás. Promise-t ad vissza; hiba esetén onError() hívódik
  // (de a Promise nem dob — a hívó UI-ja nem törik el).
  // options.onEnd: a hang végén hívódik — így több szöveg egymás után játszható le (pl. párbeszéd).
  function play(text, options) {
    options = options || {};
    stop();
    if (speechOnly) {
      if (!speak(text, options) && typeof options.onError === 'function') options.onError();
      return Promise.resolve();
    }
    const audio = getAudio(text);
    audio.playbackRate = options.speed || 1.0;
    try { audio.currentTime = 0; } catch (e) {}
    current = audio;

    let errored = false;
    const onErr = () => {
      if (errored) return;
      errored = true;
      // tartalék: a böngésző felolvasója; csak ha az sincs, szólunk a hívónak
      if (speak(text, options)) { speechOnly = true; return; }
      if (typeof options.onError === 'function') options.onError();
    };
    audio.addEventListener('error', onErr, { once: true });
    // az elem gyorsítótárazott: egy korábbi, félbeszakított lejátszás „vége" figyelője ne maradjon rajta
    if (audio._ncEnd) audio.removeEventListener('ended', audio._ncEnd);
    audio._ncEnd = typeof options.onEnd === 'function' ? function () { options.onEnd(); } : null;
    if (audio._ncEnd) audio.addEventListener('ended', audio._ncEnd, { once: true });

    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      return p.catch(() => { onErr(); });
    }
    return Promise.resolve();
  }

  // Előtöltés (Audio elem létrehozása — a böngésző bufferelhet)
  function preload(text) {
    if (!text) return;
    getAudio(text);
  }

  // V3 P2 F — globális "helyes válasz felolvasása". Opt-in (helpers-bár
  // 🔊 Hang toggle, localStorage 'nihoncore_audio_on'). Debounce: ugyanaz
  // a szöveg 1.5 mp-en belül nem szólal meg újra (dupla-render védelem).
  //
  // 2026-06-03 fix: kibővített CJK-tartomány (`一-鿿` = U+4E00..U+9FFF a
  // korábbi U+4E00..U+9FAF helyett — a modern ritka kanjik nem esnek ki).
  // A kanji+furigana duplázás (pl. ruby-tartalmú strong → "水みず...") elleni
  // védelem a `findAnswer`-ben van (initGlobalAnswerAudio), itt csak a már
  // tiszta szöveg jön.
  let lastSpoke = { text: '', at: 0 };
  function speakAnswer(text) {
    if (!text) return;
    if (localStorage.getItem('nihoncore_audio_on') !== '1') return;
    // Csak a japán karakterek maradnak — a romaji / zárójel / ✓ / szóköz
    // kiesik (a feedback .pfe-jp-ok néha romaji-t is tartalmaz mellette).
    const jp = String(text).replace(/[^぀-ヿ一-鿿]/g, '');
    if (!jp) return;
    const now = Date.now();
    if (jp === lastSpoke.text && now - lastSpoke.at < 1500) return;
    lastSpoke = { text: jp, at: now };
    play(jp, { speed: 0.95, onError: function () {} });
  }

  return { play, preload, stop, speakAnswer, buildUrl, _cache: cache };
})();


/* ====================================================
   ROMAJIBÓL ÁTÍRT VÁLASZ IGAZÍTÁSA ─────────────────
   ----------------------------------------------------
   Aki romajival ír, a partikulákat kiejtés szerint írja
   (wa, o, e), a romaji-átíró pedig ebből わ / お / え jelet
   ad a は / を / へ helyén; a katakana hosszújele (ー) helyén
   megkettőzött magánhangzó áll; a づ romajija „zu", és az
   „n" + magánhangzó kétféleképp olvasható (kinyoubi: きにょうび
   vagy きんようび). Ez nem hiba: a repairSpoken a helyes kanához
   igazítja a beírt szöveget, és ezeken a helyeken a helyes
   jelet adja vissza. Csak ebben az irányban enged (a は helyén
   わ jó, a わ helyén は nem), minden más eltérés érintetlen marad.
   A Pro hallás és a Szabad fordítás használja.
   ==================================================== */
window.NihonCoreKana = (function () {
  // helyes írás → amit a romajiból kapunk (csak ebben az irányban fogadjuk el)
  const SPOKEN = { 'は': 'わ', 'を': 'お', 'へ': 'え', 'づ': 'ず', 'ぢ': 'じ' };
  const ROWS = {
    'あ': 'あかがさざただなはばぱまやらわゃぁ',
    'い': 'いきぎしじちぢにひびぴみりぃ',
    'う': 'うくぐすずつづぬふぶぷむゆるゅぅ',
    'え': 'えけげせぜてでねへべぺめれぇ',
    'お': 'おこごそぞとどのほぼぽもよろをょぉ'
  };
  // a romaji „n" kétértelmű: kinen = きねん vagy きんえん, kinyoubi = きにょうび vagy きんようび
  const NA = { 'あ': 'な', 'い': 'に', 'う': 'ぬ', 'え': 'ね', 'お': 'の' };
  const YA = { 'や': 'ゃ', 'ゆ': 'ゅ', 'よ': 'ょ' };
  function vowelOf(ch) {
    for (const v in ROWS) { if (ROWS[v].indexOf(ch) >= 0) return v; }
    return '';
  }
  // elfogadható-e a beírt u jel a helyes t helyén? (prev: a helyes szöveg előző jele)
  function tolerated(u, t, prev) {
    if (SPOKEN[t] === u) return true;
    if (t === 'ー' && prev) {
      const v = vowelOf(prev);
      return !!v && (u === v || (v === 'お' && u === 'う') || (v === 'え' && u === 'い'));
    }
    return false;
  }
  function repairSpoken(user, target) {
    user = String(user || ''); target = String(target || '');
    if (!user || !target || user === target) return user;
    const n = user.length, m = target.length;
    const one = (x, y) => user[x - 1] === target[y - 1] || tolerated(user[x - 1], target[y - 1], target[y - 2]);
    // a helyes szövegben ん + magánhangzó, a beírtban egyetlen な-sori jel
    const nasal1 = (x, y) => y >= 2 && target[y - 2] === 'ん' && NA[target[y - 1]] === user[x - 1];
    // a helyes szövegben ん + や / ゆ / よ, a beírtban に + kis ゃ / ゅ / ょ
    const nasal2 = (x, y) => x >= 2 && y >= 2 && target[y - 2] === 'ん' && user[x - 2] === 'に' && YA[target[y - 1]] === user[x - 1];
    const dp = [];
    for (let x = 0; x <= n; x++) { dp.push(new Array(m + 1).fill(0)); dp[x][0] = x; }
    for (let y = 0; y <= m; y++) dp[0][y] = y;
    for (let x = 1; x <= n; x++) for (let y = 1; y <= m; y++) {
      let best = one(x, y) ? dp[x - 1][y - 1] : 1 + Math.min(dp[x - 1][y - 1], dp[x - 1][y], dp[x][y - 1]);
      if (nasal1(x, y)) best = Math.min(best, dp[x - 1][y - 2]);
      if (nasal2(x, y)) best = Math.min(best, dp[x - 2][y - 2]);
      dp[x][y] = best;
    }
    let out = '', x = n, y = m;
    while (x > 0) {
      if (y > 0 && nasal2(x, y) && dp[x][y] === dp[x - 2][y - 2]) { out = target[y - 2] + target[y - 1] + out; x -= 2; y -= 2; }
      else if (y > 0 && nasal1(x, y) && dp[x][y] === dp[x - 1][y - 2]) { out = target[y - 2] + target[y - 1] + out; x--; y -= 2; }
      else if (y > 0 && one(x, y) && dp[x][y] === dp[x - 1][y - 1]) { out = target[y - 1] + out; x--; y--; }
      else if (y > 0 && dp[x][y] === dp[x - 1][y - 1] + 1) { out = user[x - 1] + out; x--; y--; }
      else if (dp[x][y] === dp[x - 1][y] + 1) { out = user[x - 1] + out; x--; }
      else y--;
    }
    return out;
  }

  // Romaji → hiragana: Hepburn, a gépelős (wāpuro) változatokkal és az idegen szavak
  // szótagjaival. A szóköz és az aposztróf szóhatár (hon ya, kin'youbi).
  const ROMAJI = {
    kya:'きゃ',kyu:'きゅ',kyo:'きょ', gya:'ぎゃ',gyu:'ぎゅ',gyo:'ぎょ',
    sha:'しゃ',shu:'しゅ',sho:'しょ', ja:'じゃ',ju:'じゅ',jo:'じょ',
    cha:'ちゃ',chu:'ちゅ',cho:'ちょ', nya:'にゃ',nyu:'にゅ',nyo:'にょ',
    hya:'ひゃ',hyu:'ひゅ',hyo:'ひょ', bya:'びゃ',byu:'びゅ',byo:'びょ',
    pya:'ぴゃ',pyu:'ぴゅ',pyo:'ぴょ', mya:'みゃ',myu:'みゅ',myo:'みょ',
    rya:'りゃ',ryu:'りゅ',ryo:'りょ',
    // gépelős (wāpuro) változatok
    sya:'しゃ',syu:'しゅ',syo:'しょ', tya:'ちゃ',tyu:'ちゅ',tyo:'ちょ',
    zya:'じゃ',zyu:'じゅ',zyo:'じょ', jya:'じゃ',jyu:'じゅ',jyo:'じょ',
    si:'し',tu:'つ',hu:'ふ',zi:'じ',
    // idegen szavak szótagjai (ボティ, カフェ, ファイル, ディスコード, ヴァロラント…)
    she:'しぇ',che:'ちぇ',je:'じぇ',
    fa:'ふぁ',fi:'ふぃ',fe:'ふぇ',fo:'ふぉ', ti:'てぃ',di:'でぃ',
    wi:'うぃ',we:'うぇ', va:'ゔぁ',vi:'ゔぃ',vu:'ゔ',ve:'ゔぇ',vo:'ゔぉ',
    ka:'か',ki:'き',ku:'く',ke:'け',ko:'こ',
    ga:'が',gi:'ぎ',gu:'ぐ',ge:'げ',go:'ご',
    sa:'さ',shi:'し',su:'す',se:'せ',so:'そ',
    za:'ざ',ji:'じ',zu:'ず',ze:'ぜ',zo:'ぞ',
    ta:'た',chi:'ち',tsu:'つ',te:'て',to:'と',
    da:'だ',du:'づ',de:'で',do:'ど',
    na:'な',ni:'に',nu:'ぬ',ne:'ね',no:'の',
    ha:'は',hi:'ひ',fu:'ふ',he:'へ',ho:'ほ',
    ba:'ば',bi:'び',bu:'ぶ',be:'べ',bo:'ぼ',
    pa:'ぱ',pi:'ぴ',pu:'ぷ',pe:'ぺ',po:'ぽ',
    ma:'ま',mi:'み',mu:'む',me:'め',mo:'も',
    ya:'や',yu:'ゆ',yo:'よ',
    ra:'ら',ri:'り',ru:'る',re:'れ',ro:'ろ',
    wa:'わ',wo:'を',n:'ん',
    a:'あ',i:'い',u:'う',e:'え',o:'お'
  };
  function fromRomaji(text) {
    const s = String(text || '').toLowerCase().replace(/[^a-z\s、。']/g, '');
    if (!s) return '';
    let out = '';
    let i = 0;
    while (i < s.length) {
      if (s[i] === ' ' || s[i] === "'") { i++; continue; }      // az aposztróf szóhatár: kin'youbi → きんようび
      if (s[i] === 't' && s[i + 1] === 'c' && s[i + 2] === 'h') { out += 'っ'; i++; continue; }   // sawatcha → さわっちゃ
      // sokuon — kettős mássalhangzó (kk, tt, pp, ss stb.) → kis っ
      if (i + 1 < s.length && /[bcdfghjkmpqrstvwxyz]/.test(s[i]) && s[i] === s[i+1] && s[i] !== 'n') {
        out += 'っ'; i++; continue;
      }
      // 3 char
      if (i + 3 <= s.length && ROMAJI[s.slice(i, i+3)]) {
        out += ROMAJI[s.slice(i, i+3)]; i += 3; continue;
      }
      // 2 char
      if (i + 2 <= s.length && ROMAJI[s.slice(i, i+2)]) {
        out += ROMAJI[s.slice(i, i+2)]; i += 2; continue;
      }
      // 1 char (vowel + n)
      if (ROMAJI[s[i]]) { out += ROMAJI[s[i]]; i++; continue; }
      // unknown — skip
      i++;
    }
    return out;
  }
  // Kana → romaji: egy kana-darab (szóközök és írásjelek nélküli kana-sor) átírása a kiejtés szerint.
  // A darab végi は partikula „wa", a へ „e", a を mindig „o"; a ー megkettőzi az előző magánhangzót.
  const KANA_RO = {
    あ:'a',い:'i',う:'u',え:'e',お:'o', か:'ka',き:'ki',く:'ku',け:'ke',こ:'ko', が:'ga',ぎ:'gi',ぐ:'gu',げ:'ge',ご:'go',
    さ:'sa',し:'shi',す:'su',せ:'se',そ:'so', ざ:'za',じ:'ji',ず:'zu',ぜ:'ze',ぞ:'zo',
    た:'ta',ち:'chi',つ:'tsu',て:'te',と:'to', だ:'da',ぢ:'ji',づ:'zu',で:'de',ど:'do',
    な:'na',に:'ni',ぬ:'nu',ね:'ne',の:'no', は:'ha',ひ:'hi',ふ:'fu',へ:'he',ほ:'ho',
    ば:'ba',び:'bi',ぶ:'bu',べ:'be',ぼ:'bo', ぱ:'pa',ぴ:'pi',ぷ:'pu',ぺ:'pe',ぽ:'po',
    ま:'ma',み:'mi',む:'mu',め:'me',も:'mo', や:'ya',ゆ:'yu',よ:'yo',
    ら:'ra',り:'ri',る:'ru',れ:'re',ろ:'ro', わ:'wa',を:'o',ん:'n', ゔ:'vu',
    ぁ:'a',ぃ:'i',ぅ:'u',ぇ:'e',ぉ:'o'
  };
  const KANA_YOON = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
  const KANA_FOREIGN = { ふぁ:'fa',ふぃ:'fi',ふぇ:'fe',ふぉ:'fo', てぃ:'ti',でぃ:'di', うぃ:'wi',うぇ:'we', しぇ:'she',じぇ:'je',ちぇ:'che', ゔぁ:'va',ゔぃ:'vi',ゔぇ:'ve',ゔぉ:'vo' };
  // egy kana-sor szótagonkénti átírása (szabályok nélkül)
  function kanaSyllables(s) {
    let out = '', dbl = false;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i], nx = s[i + 1];
      if (ch === 'っ') { dbl = true; continue; }
      if (ch === 'ー') { const v = out.slice(-1); if (/[aiueo]/.test(v)) out += v; continue; }
      let r;
      if (nx && KANA_FOREIGN[ch + nx]) { r = KANA_FOREIGN[ch + nx]; i++; }
      else if (KANA_RO[ch] && KANA_YOON[nx]) {
        const b = KANA_RO[ch];
        r = /^(shi|chi|ji)$/.test(b) ? b.slice(0, -1) + KANA_YOON[nx].slice(1) : b.slice(0, -1) + KANA_YOON[nx];
        i++;
      } else r = KANA_RO[ch] || KANA_YOON[ch] || '';
      if (ch === 'ん' && nx && /[あいうえおやゆよ]/.test(nx)) r = "n'";
      if (dbl && r) { r = (r[0] === 'c' ? 't' : r[0]) + r; dbl = false; }
      out += r;
    }
    return out;
  }
  const RO_WHOLE = { 'はは': 'haha', 'こんにちは': 'konnichiwa', 'こんばんは': 'konbanwa' };
  const RO_COPULA = { 'です': 'desu', 'でした': 'deshita', 'ではありません': 'dewa arimasen', 'じゃありません': 'ja arimasen',
    'ではありませんでした': 'dewa arimasen deshita', 'じゃありませんでした': 'ja arimasen deshita' };
  const RO_COPULA_RE = /^(.*?)(ではありませんでした|じゃありませんでした|ではありません|じゃありません|でした|です)$/;
  function toRomaji(chunk) {
    const raw = String(chunk || '');
    if (RO_WHOLE[raw]) return RO_WHOLE[raw];
    if (/[ァ-ヶ]/.test(raw) && !/[ぁ-ゖ]/.test(raw)) return kanaSyllables(raw.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60)));
    let s = raw.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
    let tail = '';
    // kérdő か a です / ます alakok után
    if (/(です|でした|ます|ません|ました|ませんでした)か$/.test(s)) { s = s.slice(0, -1); tail = ' ka'; }
    // állítmány-végződés (a főnévhez tapadó です, でした, じゃありません…)
    const cop = RO_COPULA_RE.exec(s);
    if (cop) { s = cop[1]; tail = (s ? ' ' : '') + RO_COPULA[cop[2]] + tail; }
    // a darab végi partikula kiejtés szerint
    let part = '';
    if (/はも$/.test(s)) { s = s.slice(0, -2); part = 'wa mo'; }
    else if (/は$/.test(s)) { s = s.slice(0, -1); part = 'wa'; }
    else if (/へ$/.test(s)) { s = s.slice(0, -1); part = 'e'; }
    else if (/を$/.test(s)) { s = s.slice(0, -1); part = 'o'; }
    const stem = kanaSyllables(s);
    return stem + (stem && part ? ' ' : '') + part + tail;
  }

  // Élő kana-beírás: gépelés közben a latin betűk kanává alakulnak (hajimemashite → はじめまして).
  // A még befejezetlen szótag (k, sh, ny, a szóvégi n) betűként marad, amíg ki nem derül, mi lesz belőle;
  // final = true: beküldéskor a lezáratlan n is ん lesz.
  function liveKana(value, final) {
    return String(value == null ? '' : value).replace(/[A-Za-z']+/g, (runText, off, whole) => {
      let s = runText.toLowerCase(), hold = '';
      const atEnd = off + runText.length === whole.length;
      if (atEnd && !final) {
        hold = (/[^aiueo]+$/.exec(s) || [''])[0];
        // „n" + másik mássalhangzó: az n már biztosan ん (konb → こんb); nn, ny és n' még nyitott
        if (hold.length > 1 && hold[0] === 'n' && 'ny\''.indexOf(hold[1]) < 0) hold = hold.slice(1);
        s = s.slice(0, s.length - hold.length);
      } else if (final) {
        s = s.replace(/nn$/, 'n');
      }
      return fromRomaji(s) + hold;
    });
  }
  function bindInput(input) {
    if (!input) return;
    input.addEventListener('input', e => {
      if (e.isComposing) return;                       // japán billentyűzet: a rendszer intézi
      const v = liveKana(input.value, false);
      if (v !== input.value) input.value = v;
    });
  }

  return { repairSpoken, fromRomaji, toRomaji, liveKana, bindInput };
})();


/* ====================================================
   RAGOZÓ MOTOR — közös (a Ragozó oldal és a dolgozatok használják)
   ----------------------------------------------------
   conjugate(ige, alak) → { kana, romaji, irregular, morphemes } · composeAdj(melléknév, alak)
   → { kana, romaji, variants?, morphemes }. Csak a core.js szabálytábláira
   (NIHONCORE_FORM_RULES, _GODAN_MAP, _TE_RULES, _ADJ_FORM_RULES, …) és a szavak
   adataira támaszkodik; állapota nincs.
   ==================================================== */
window.NihonCoreConj = (function () {

  // ── VerbDetector ──────────────────────────────────
  // P1-ben minden ige a DB-ből jön → group lookup garantált.
  // Az auto-detektálás (DB-n kívüli igéhez) P2 feladat.
  const VerbDetector = {
    classify(verb) {
      // verb objektum vagy id-string is megengedett
      const v = typeof verb === 'string'
        ? NIHONCORE_VERBS.find(x => x.id === verb)
        : verb;
      if (!v) return { group: 'unknown', confidence: 0 };
      return {
        group: v.group,
        confidence: 1.0,
        pseudoIchidan: !!v.pseudoIchidan,
        irregularTe: !!v.irregularTe
      };
    }
  };

  // ── StemEngine ────────────────────────────────────
  // Visszaad: { a:{kana,romaji}, i:..., u:..., e:..., o:... }
  // Godan: stem + GodanMap[family][col]
  // Ichidan: minden oszlopra ugyanaz (a stem) — Ichidan-nál nincs oszlopváltás
  // Irregular: nem használjuk (külön tábla)
  const StemEngine = {
    getStems(verb) {
      if (verb.group === 'godan') {
        const fam = NIHONCORE_GODAN_MAP[verb.godanFamily];
        if (!fam) return null;
        const out = {};
        for (const col of ['a','i','u','e','o']) {
          out[col] = {
            kana:   verb.stemKana   + fam[col].kana,
            romaji: verb.stemRomaji + fam[col].romaji
          };
        }
        return out;
      }
      if (verb.group === 'ichidan') {
        const ichi = { kana: verb.stemKana, romaji: verb.stemRomaji };
        return { a: ichi, i: ichi, u: ichi, e: ichi, o: ichi };
      }
      return null;
    }
  };

  // ── Masu / Nai motor (és minden olyan, ami sima stem+suffix) ──
  function composeStemSuffix(verb, formCode) {
    const rule = NIHONCORE_FORM_RULES[formCode];
    if (!rule || !rule.stemColumn) return null;

    if (verb.group === 'irregular') {
      const irr = NIHONCORE_IRREGULAR_FORMS[verb.id];
      return irr && irr[formCode] ? { ...irr[formCode], irregular: true } : null;
    }

    const stems = StemEngine.getStems(verb);
    if (!stems) return null;
    let stem = stems[rule.stemColumn];
    // -aru honorific igék: a masu-stem ('i' oszlop) override (pl. kudasaru → ください,
    // a sima くださり helyett) — NIHONCORE_VERB_EXCEPTIONS.irregularMasuStem.
    let irregularStem = false;
    if (rule.stemColumn === 'i'
        && NIHONCORE_VERB_EXCEPTIONS.irregularMasuStem
        && NIHONCORE_VERB_EXCEPTIONS.irregularMasuStem[verb.id]) {
      stem = NIHONCORE_VERB_EXCEPTIONS.irregularMasuStem[verb.id];
      irregularStem = true;
    }
    const suf  = (verb.group === 'ichidan' && rule.ichidanSuffix) ? rule.ichidanSuffix : rule.suffix;

    return {
      kana:   stem.kana   + suf.kana,
      romaji: stem.romaji + suf.romaji,
      irregular: irregularStem,
      morphemes: {
        stem: stem,
        suffix: suf,
        column: rule.stemColumn,
        ...(irregularStem ? { irregularStem: true } : {})
      }
    };
  }

  // ── Te / Ta motor (külön logika — családi minta) ──
  function composeTeTa(verb, which /* 'te' | 'ta' */) {
    // Irregular
    if (verb.group === 'irregular') {
      const irr = NIHONCORE_IRREGULAR_FORMS[verb.id];
      return irr && irr[which] ? { ...irr[which], irregular: true } : null;
    }

    // Rendhagyó te/ta (csak 行く a P1-ben)
    if (verb.irregularTe) {
      const ex = NIHONCORE_VERB_EXCEPTIONS.irregularTe[verb.id];
      if (ex && ex[which]) return { ...ex[which], irregular: true };
    }

    // Ichidan: stem + て / た
    if (verb.group === 'ichidan') {
      const suf = which === 'te'
        ? { kana: 'て', romaji: 'te' }
        : { kana: 'た', romaji: 'ta' };
      return {
        kana:   verb.stemKana   + suf.kana,
        romaji: verb.stemRomaji + suf.romaji,
        irregular: false,
        morphemes: {
          stem:   { kana: verb.stemKana, romaji: verb.stemRomaji },
          suffix: suf,
          column: 'ichidan'
        }
      };
    }

    // Godan: family-rule alapján
    if (verb.group === 'godan') {
      const rule = NIHONCORE_TE_RULES[verb.godanFamily];
      if (!rule) return null;
      const suf = rule[which];
      return {
        kana:   verb.stemKana   + suf.kana,
        romaji: verb.stemRomaji + suf.romaji,
        irregular: false,
        morphemes: {
          stem:    { kana: verb.stemKana, romaji: verb.stemRomaji },
          suffix:  suf,
          column:  'te-rule:' + verb.godanFamily,
          pattern: rule.pattern
        }
      };
    }
    return null;
  }

  // ── Causative-Passive (kompozíció: passive ∘ causative) ──
  // Pl. nomu → nomaseru (causative) → nomaserareru (passive applied)
  //     taberu → tabesaseru → tabesaserareru
  function composeCausativePassive(verb) {
    if (verb.group === 'irregular') {
      const irr = NIHONCORE_IRREGULAR_FORMS[verb.id];
      return irr && irr.causative_passive ? { ...irr.causative_passive, irregular: true } : null;
    }
    const caus = composeStemSuffix(verb, 'causative');
    if (!caus) return null;
    // A causative kimenete -る/ru végű (-seru/saseru). Erre rakjuk a passive -rareru/られる-t.
    const newKana   = caus.kana.replace(/る$/,   'られる');
    const newRomaji = caus.romaji.replace(/ru$/, 'rareru');
    return {
      kana: newKana,
      romaji: newRomaji,
      irregular: false,
      morphemes: caus.morphemes ? {
        stem: caus.morphemes.stem,
        suffix: {
          kana:   caus.morphemes.suffix.kana   + 'られる',
          romaji: caus.morphemes.suffix.romaji + 'rareru'
        },
        column: caus.morphemes.column,
        composedFrom: 'causative+passive'
      } : null
    };
  }

  // ── Egységes belépő — verb + formCode → forma ────
  function conjugate(verb, formCode) {
    if (formCode === 'te') return composeTeTa(verb, 'te');
    if (formCode === 'ta') return composeTeTa(verb, 'ta');
    if (formCode === 'causative_passive') return composeCausativePassive(verb);
    return composeStemSuffix(verb, formCode);
  }

  // ── Melléknevek (い és な): alap + alak → forma ──
  // Egyetlen forma kompozíciója.
  // Visszaad: { kana, romaji, variants?, morphemes }
  function composeAdj(adj, formCode) {
    const rule = NIHONCORE_ADJ_FORM_RULES[formCode];
    if (!rule) return null;
    if (rule.type !== adj.type) return null;

    if (adj.type === 'i-adj') {
      // present_affirmative-nál ii is OK (nem szabad yoi-ra cserélni)
      const useCanonical = adj.exception && formCode !== 'i_present_affirmative';
      const stemKana   = useCanonical ? adj.canonicalStemKana   : adj.stemKana;
      const stemRomaji = useCanonical ? adj.canonicalStemRomaji : adj.stemRomaji;
      return {
        kana:   stemKana   + rule.suffix.kana,
        romaji: stemRomaji + rule.suffix.romaji,   // suffix.romaji-ban már benne van a szóköz ahol kell
        variants: rule.variants || null,
        morphemes: {
          stem:   { kana: stemKana, romaji: stemRomaji },
          suffix: rule.suffix,
          column: 'i-adj',
          canonical: useCanonical
        }
      };
    }

    if (adj.type === 'na-adj') {
      // na-adj-nál a stem = teljes lemma; a romaji-suffix elé kell egy space
      // (kivéve a 'na' noun-modifier-nél, ahol akár szóközzel akár anélkül elterjedt)
      return {
        kana:   adj.stemKana   + rule.suffix.kana,
        romaji: adj.stemRomaji + ' ' + rule.suffix.romaji,
        variants: rule.variants ? rule.variants.map(v => ({
          kana:   adj.stemKana   + v.kana,
          romaji: adj.stemRomaji + ' ' + v.romaji
        })) : null,
        morphemes: {
          stem:   { kana: adj.stemKana, romaji: adj.stemRomaji },
          suffix: rule.suffix,
          column: 'na-adj',
          canonical: false
        }
      };
    }
    return null;
  }

  return { VerbDetector, StemEngine, composeStemSuffix, composeTeTa, composeCausativePassive, conjugate, composeAdj };
})();


/* ====================================================
   MONDAT-ELLENŐRZŐ — közös (a Mondat-Mester puzzle-módja és a dolgozatok használják)
   ----------------------------------------------------
   validate(sorrend, mondat) → { valid, errorType?, message?, hint? }. A mondat eredeti
   sorrendje mindig jó; összetett állítmánynál az első igétől kötött a sorrend, előtte a
   „szó + partikula" egységek felcserélhetők.
   ==================================================== */
window.NihonCorePuzzle = (function () {
  function extractPhrases(tokens) {
    const phrases = [];
    let current = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type === 'verb') {
        if (current.length) phrases.push(current);
        phrases.push([t]);
        current = [];
      } else if (t.type === 'particle') {
        current.push(t);
        if (t.romaji !== 'no') {
          phrases.push(current);
          current = [];
        }
      } else {
        current.push(t);
      }
    }
    if (current.length) phrases.push(current);
    return phrases;
  }

  function phraseKey(phrase) {
    return phrase.map(t => `${t.type}:${t.romaji}|${t.jp}`).join(',');
  }

  function validatePuzzle(answerIndices, sentence) {
    const tokens = answerIndices.map(i => sentence.tokens[i]);

    if (tokens.length !== sentence.tokens.length) {
      return { valid: false, errorType: 'incomplete', message: 'Még nincs minden token a válasz-területen.', hint: 'Húzd / kattintsd a maradék tokeneket a tálcáról.' };
    }

    // A mondat eredeti sorrendje mindig helyes (az azonos szövegű tokenek felcserélhetők).
    const sameTok = (a, b) => a.type === b.type && a.jp === b.jp;
    const orig = sentence.tokens;
    if (tokens.every((t, i) => sameTok(t, orig[i]))) return { valid: true };

    // Összetett állítmány (行く つもりです · 撮って も いいですか · 行った こと が あります):
    // több ige, ige utáni partikula vagy segédszó. Itt az első igétől a mondat végéig
    // kötött a sorrend; előtte a „szó + partikula" egységek szabadon cserélhetők.
    const firstVerb = orig.findIndex(t => t.type === 'verb');
    if (firstVerb !== orig.length - 1) {
      const cut = firstVerb < 0 ? orig.length - 1 : firstVerb;
      const tailOk = tokens.slice(cut).every((t, i) => sameTok(t, orig[cut + i]));
      if (!tailOk) {
        return { valid: false, errorType: 'predicate_order',
          message: `Ennek a mondatnak a vége több szóból álló állítmány: <strong class="pp-fb-jp">${orig.slice(cut).map(t => t.jp).join(' ')}</strong>. Ezek a mondat végén, ebben a sorrendben állnak.`,
          hint: 'Az előtte álló „szó + partikula" párok sorrendje szabad, de a pár tagjai együtt maradnak.' };
      }
      const headKeys = arr => extractPhrases(arr.slice(0, cut)).map(phraseKey).sort().join('||');
      if (headKeys(tokens) !== headKeys(orig)) {
        return { valid: false, errorType: 'pair_broken', message: 'Egy főnév-partikula pár fel van bontva — ezek mindig együtt kell maradjanak.', hint: 'A „szó + partikula" mindig egymás mellett áll a japánban (pl. <strong class="pp-fb-jp">寿司を</strong>, <strong class="pp-fb-jp">公園に</strong>).' };
      }
      return { valid: true };
    }

    const last = tokens[tokens.length - 1];
    if (last.type !== 'verb') {
      return { valid: false, errorType: 'verb_not_at_end', message: 'A japán mondatban az ige <strong>mindig a mondat végén</strong> áll.', hint: `Az ige itt: <strong class="pp-fb-jp">${sentence.tokens.find(t => t.type === 'verb').jp}</strong> — tedd a legvégére.` };
    }
    for (let i = 0; i < tokens.length - 1; i++) {
      if (tokens[i].type === 'verb') {
        return { valid: false, errorType: 'verb_in_middle', message: `Egyetlen ige van a mondatban, és annak a <strong>legvégén</strong> kell lennie.`, hint: `A "${tokens[i].jp}" ige most a ${i + 1}. helyen van — tedd a végére.` };
      }
    }
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type !== 'particle') continue;
      const prev = tokens[i - 1];
      if (!prev) {
        return { valid: false, errorType: 'particle_first', message: `A "<strong class="pp-fb-jp">${t.jp}</strong>" partikula nem állhat a mondat elején.`, hint: 'Partikula előtt mindig főnévnek vagy a hozzá tartozó szónak kell állnia.' };
      }
      if (prev.type === 'verb') {
        return { valid: false, errorType: 'particle_after_verb', message: `A "<strong class="pp-fb-jp">${t.jp}</strong>" partikula nem állhat ige után — az ige a mondat végén áll.`, hint: '' };
      }
      if (prev.type === 'particle' && prev.romaji !== 'no') {
        return { valid: false, errorType: 'particle_after_particle', message: `Két nem-の partikula nem állhat egymás után. A "<strong class="pp-fb-jp">${t.jp}</strong>" előtti "${prev.jp}" más főnévhez tartozik.`, hint: '' };
      }
    }

    const userKeys = extractPhrases(tokens).map(phraseKey).sort();
    const origKeys = extractPhrases(sentence.tokens).map(phraseKey).sort();
    if (userKeys.join('||') !== origKeys.join('||')) {
      return { valid: false, errorType: 'pair_broken', message: 'Egy főnév-partikula pár fel van bontva — ezek mindig együtt kell maradjanak.', hint: 'A "tárgy + partikula" mindig egymás mellett áll a japánban (pl. <strong class="pp-fb-jp">寿司を</strong>, <strong class="pp-fb-jp">公園に</strong>).' };
    }
    return { valid: true };
  }

  return { validate: validatePuzzle, extractPhrases: extractPhrases };
})();


/* ====================================================
   GLOBÁLIS VÁLASZ-FELOLVASÁS (V3 P2 F) ─────────────
   ----------------------------------------------------
   MutationObserver figyeli a modul-feedback konténereket
   (.conj-feedback · .pr-feedback · #phaseContent). Amikor
   egy feedback renderelődik, a helyes japán választ
   (első japán karaktert tartalmazó .pfe-jp-ok) felolvassa.
   Opt-in + debounce a NihonCoreAudio.speakAnswer-ben.
   ==================================================== */
(function initGlobalAnswerAudio() {
  const JP = /[぀-ヿ一-鿿]/;   // van-e japán karakter (bővített CJK-tartomány)

  // 2026-06-03 KRITIKUS FIX: a Grammar Patterns / Production / egyéb feedback
  // pfe-jp-ok strong belsejében `<ruby>kanji<rt>furigana</rt></ruby>` kerülhet.
  // A naív `textContent` az ÖSSZES leaf-szöveget összefűzi → "水" + "みず" =
  // "水みず" → a TTS kétszer ejti a kanjit. A fix: a kanji-t cseréljük a
  // furigana (pure kana) olvasatra, mert AZ a tananyaggal egyező kiejtés.
  function extractKanaPreferringText(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('ruby.lp-rj rt').forEach(rt => rt.remove());   // romaji-átírás: itt a kana a kiejtés
    clone.querySelectorAll('ruby:not(.lp-rj)').forEach(r => {
      const rt = r.querySelector('rt');
      const kana = rt ? rt.textContent : '';
      const span = document.createElement('span');
      span.textContent = kana;       // csak a kana olvasat marad
      r.replaceWith(span);
    });
    return (clone.textContent || '').trim();
  }

  function findAnswer(node) {
    const hits = [];
    if (node.matches && node.matches('.pfe-jp-ok')) hits.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll('.pfe-jp-ok').forEach(e => hits.push(e));
    }
    for (const el of hits) {
      const t = extractKanaPreferringText(el);
      if (t && JP.test(t)) return t;
    }
    return null;
  }

  const targets = [];
  document.querySelectorAll('.conj-feedback, .pr-feedback').forEach(el => targets.push(el));
  const phaseContent = document.getElementById('phaseContent');
  if (phaseContent) targets.push(phaseContent);
  if (targets.length === 0) return;   // index / auth oldalak

  const obs = new MutationObserver(muts => {
    let answer = null;
    for (const m of muts) {
      for (let i = 0; i < m.addedNodes.length && !answer; i++) {
        const node = m.addedNodes[i];
        if (node.nodeType === 1) answer = findAnswer(node);
      }
      if (answer) break;
    }
    if (answer) NihonCoreAudio.speakAnswer(answer);
  });
  targets.forEach(t => obs.observe(t, { childList: true, subtree: true }));
})();


/* ====================================================
   ZEN POLISH — Globális feedback animáció (Blokk 3)
   ----------------------------------------------------
   MutationObserver figyeli a modul-feedback konténereket
   és a body-t. Amikor egy feedback panel megkapja a
   pr-fb-correct / pr-fb-wrong / pr-fb-perfect / pr-fb-close /
   pr-fb-near class-t, automatikusan meghívja a NihonCoreMotion
   megfelelő animációját. Modul-specifikus kód-injekció NEM kell.
   ==================================================== */
(function initGlobalFeedbackMotion() {
  if (!window.NihonCoreMotion) return;

  const POSITIVE = new Set(['pr-fb-correct', 'pr-fb-perfect', 'pr-fb-close', 'pr-fb-near']);
  const NEGATIVE = new Set(['pr-fb-wrong']);
  // pr-fb-far és pr-fb-dontknow szándékosan KIMARAD — ezek "részben"
  // ill. "semleges" állapotok, ahol az animáció zavaró lenne.

  // Hogy ne triggereljen kétszer ugyanarra a class-add-ra
  const lastTrigger = new WeakMap();
  const DEBOUNCE_MS = 250;

  function maybeAnimate(el) {
    if (!el || el.nodeType !== 1) return;
    const cls = el.classList;
    let kind = null;
    if (cls.contains('pr-fb-wrong')) kind = 'wrong';
    else {
      for (const p of POSITIVE) { if (cls.contains(p)) { kind = 'correct'; break; } }
    }
    if (!kind) return;
    // A rögzített visszajelzés-lap saját becsúszó animációt kap; a háttér
    // villantása ott átlátszóvá tenné a lapot a tartalom fölött.
    if (getComputedStyle(el).position === 'fixed') return;
    const now = Date.now();
    const last = lastTrigger.get(el);
    if (last && (now - last.ts) < DEBOUNCE_MS && last.kind === kind) return;
    lastTrigger.set(el, { ts: now, kind });
    if (kind === 'correct') window.NihonCoreMotion.flashCorrect(el);
    else                    window.NihonCoreMotion.shakeWrong(el);
  }

  const obs = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        maybeAnimate(m.target);
      } else if (m.type === 'childList') {
        // Új gyermek-feedback elemek
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          maybeAnimate(node);
          if (node.querySelectorAll) {
            node.querySelectorAll('[class*="pr-fb-"]').forEach(maybeAnimate);
          }
        }
      }
    }
  });

  // Egy MutationObserver az egész body-n — a feedback panelek bármikor
  // megjelenhetnek (lobby → kör → új kör), kötött selector lassú lenne.
  obs.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
})();


/* ====================================================
   „NEM TUDOM" FEEDBACK-FEJLÉC (V3 P2) ──────────────
   ----------------------------------------------------
   Univerzális: minden modul feedback-panelje .pr-fb-mark
   + .pr-fb-title osztályt használ. A „Nem tudom" gomb
   után a feedback hibajelzés helyett semleges magyarázó.
   ==================================================== */
function markDontKnowFeedback(fbEl) {
  if (!fbEl) return;
  fbEl.classList.remove('pr-fb-wrong');
  fbEl.classList.add('pr-fb-dontknow');
  const mark  = fbEl.querySelector('.pr-fb-mark');
  const title = fbEl.querySelector('.pr-fb-title');
  if (mark)  mark.textContent  = '💡';
  if (title) title.textContent = 'Nem baj — nézd meg a megoldást';
}


/* ====================================================
   CÉLZOTT GYAKORLÁS BANNER (V4 P4) ─────────────────
   ----------------------------------------------------
   A Statisztika „Célzott gyakorlás" gombja focus-hintet
   ír (localStorage 'nihoncore_focus_hint'); a cél-modul
   oldalán ez EGYSZER megjelenít egy bannert (megjelenés
   után törli a hintet — egyszer használatos).
   ==================================================== */
(function initFocusBanner() {
  const PAGE_MODULE = {
    conjugationMain: 'conjugation', adjMain: 'adjectives', dtMain: 'datetime',
    listeningMain: 'listening', practiceMain: 'practice', grmMain: 'grammar',
    prodMain: 'production'
  };
  let currentModule = null;
  Object.keys(PAGE_MODULE).forEach(id => {
    if (document.getElementById(id)) currentModule = PAGE_MODULE[id];
  });
  if (!currentModule && document.getElementById('moduleMain') &&
      /[?&]id=szamlalok/.test(location.search)) {
    currentModule = 'counter';
  }
  if (!currentModule) return;

  let hint = null;
  try { hint = JSON.parse(localStorage.getItem('nihoncore_focus_hint') || 'null'); } catch (e) {}
  if (!hint || hint.module !== currentModule) return;
  try { localStorage.removeItem('nihoncore_focus_hint'); } catch (e) {}   // egyszer használatos
  if (Date.now() - (hint.ts || 0) > 600000) return;                       // max 10 perc

  const main = document.querySelector('.module-main');
  if (!main) return;
  const banner = document.createElement('div');
  banner.className = 'focus-banner';
  banner.innerHTML =
    '<span class="focus-banner-icon">🎯</span>' +
    '<span class="focus-banner-text">Célzott gyakorlás — a Statisztika ide irányított' +
    (hint.note ? ': <strong>' + hint.note + '</strong>' : '') + '</span>' +
    '<button class="focus-banner-x" type="button" aria-label="Bezárás">✕</button>';
  main.insertBefore(banner, main.firstChild);
  banner.querySelector('.focus-banner-x').addEventListener('click', () => banner.remove());
})();


/* ====================================================
   NIHONCORE STATS — V4 statisztika adat-réteg ──────
   ----------------------------------------------------
   Layer 1: raw session-logok (localStorage).
   Layer 2: napi aggregát — a logokból SZÁMOLVA (nem tárolt).
   Layer 3: modul-profilok — a modulok saját profiljai (külön).
   Minden BEFEJEZETT kör egy session-rekordot ír (a félbehagyott
   kör — exit — nem mentődik, ahogy eddig is).
   ==================================================== */
const NihonCoreStats = (function () {
  const SESSIONS_KEY = 'nihoncore_sessions_v1';
  const MAX_SESSIONS = 1000;          // védő felső korlát

  function load() {
    try {
      const arr = JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function save(arr) {
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  // Egy befejezett kör mentése. info: { module, mode, results, score, startTs }
  function recordSession(info) {
    if (!info || !Array.isArray(info.results) || info.results.length === 0) return null;
    const results = info.results;
    const isOk = r => !!(r && (r.correct || r.allCorrect));
    const correct = results.filter(isOk).length;
    const errorCodes = results
      .map(r => r && (r.errorCode || r.errorType))
      .filter(Boolean);
    const now = Date.now();
    const rec = {
      id: 's' + now + Math.random().toString(36).slice(2, 7),
      ts: now,
      module: info.module || 'unknown',
      mode: info.mode || '',
      questionCount: results.length,
      correctCount: correct,
      wrongCount: results.length - correct,
      durationMs: info.startTs ? Math.max(0, now - info.startTs) : 0,
      score: info.score || 0,
      errorCodes: errorCodes,
      partial: !!info.partial          // V18: félbehagyott (kör közben kilépett) kör?
    };
    const arr = load();
    arr.push(rec);
    if (arr.length > MAX_SESSIONS) arr.splice(0, arr.length - MAX_SESSIONS);
    save(arr);
    // V17: kör vége → felhő-sync ütemezése (ha be van jelentkezve)
    if (window.NihonCoreSync && window.NihonCoreSync.schedulePush) {
      window.NihonCoreSync.schedulePush();
    }
    // V18: a kör-őrnek jelezzük, hogy ez a kör elmentődött (nincs dupla részmentés)
    if (window.NihonCoreRound && NihonCoreRound.markComplete) NihonCoreRound.markComplete();
    // Tanulási út: ha a kör egy út-lépésből indult, itt dől el a lépés eredménye
    if (window.NihonCorePath && !info.skipPath) NihonCorePath.onSession(rec);
    return rec;
  }

  function getSessions() { return load(); }
  function clearSessions() { try { localStorage.removeItem(SESSIONS_KEY); } catch (e) {} }

  // Layer 2 — napi aggregát a session-logokból számolva (nem tárolt).
  function getDailyAggregates() {
    const days = {};
    load().forEach(s => {
      const d = new Date(s.ts);
      const key = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      const day = days[key] || (days[key] = {
        date: key, sessions: 0, questions: 0, correct: 0, durationMs: 0, modules: {}
      });
      day.sessions++;
      day.questions  += s.questionCount || 0;
      day.correct    += s.correctCount  || 0;
      day.durationMs += s.durationMs    || 0;
      if (s.module) day.modules[s.module] = true;
    });
    return Object.keys(days).sort().map(k => {
      const d = days[k];
      d.accuracy = d.questions > 0 ? Math.round((d.correct / d.questions) * 100) : 0;
      d.moduleCount = Object.keys(d.modules).length;
      return d;
    });
  }

  // A mai nap összesítője és a sorozat — a kezdőlap napi célja és a statisztika is ebből számol.
  const dayKeyOf = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function getToday() {
    const key = dayKeyOf(new Date());
    const today = load().filter(s => dayKeyOf(new Date(s.ts)) === key);
    const Q = today.reduce((a, s) => a + (s.questionCount || 0), 0);
    const C = today.reduce((a, s) => a + (s.correctCount || 0), 0);
    return {
      rounds: today.length, questions: Q, correct: C,
      accuracy: Q > 0 ? Math.round(C / Q * 100) : 0,
      durationMs: today.reduce((a, s) => a + (s.durationMs || 0), 0)
    };
  }
  // Egymást követő naptári napok. A sorozat él, ha tegnap volt gyakorlás (today: ma volt-e már).
  // A napok léptetése naptár szerint megy (nem 24 órával), így az óraátállítás nem szakítja meg.
  function getStreak() {
    const set = {};
    load().forEach(s => { set[dayKeyOf(new Date(s.ts))] = true; });
    const keys = Object.keys(set).sort();
    if (!keys.length) return { current: 0, longest: 0, today: false };
    const prevDay = d => { const p = new Date(d); p.setDate(p.getDate() - 1); return p; };
    let longest = 0, run = 0;
    keys.forEach(k => {
      const d = new Date(k + 'T12:00:00');
      run = set[dayKeyOf(prevDay(d))] ? run + 1 : 1;
      if (run > longest) longest = run;
    });
    let cursor = new Date(); cursor.setHours(12, 0, 0, 0);
    const today = !!set[dayKeyOf(cursor)];
    if (!today) cursor = prevDay(cursor);
    let current = 0;
    while (set[dayKeyOf(cursor)]) { current++; cursor = prevDay(cursor); }
    return { current: current, longest: longest, today: today };
  }

  return { recordSession, getSessions, getDailyAggregates, clearSessions, getToday, getStreak };
})();


/* ====================================================
   NIHONCORE SRS — V5 P1 ítéletes ismétlési motor ───
   ----------------------------------------------------
   Univerzális item-szintű ütemező — Leitner-stílus.
   Box-ok (nap): 0 → 1 → 3 → 7 → 14 → 30. Sikertelen
   válasz visszaejt 0-ra; "easy" 2 boxot ugrik.

   itemId konvenció: '<scope>:<contentId>[:<subKey>]'
     pl. 'grammar:tara', 'grammar:tara:ex0'
   Scope-prefixre szűrhető; egyelőre csak a Grammar
   Patterns modul használja, de a forma univerzális,
   bármely modul ráköthető a saját item-térképére.

   API:
     recordReview(itemId, quality)    quality: 0=fail · 1=ok · 2=easy
     getItemState(itemId)             → null vagy { box, reps, lapses, lastTs, nextDueTs }
     getStateBatch(itemIds)           → { id: state|null }
     getDueItems(prefix, knownItemIds) → { due, seen, unseen }  (timestamp-szűrt)
     aggregateBoxes(prefix)           → [n0, n1, n2, n3, n4, n5]
     resetItem(itemId) / clearScope(prefix) / clearAll()

   localStorage: 'nihoncore_srs_v1'  (egyetlen objektum, id → state)
   ==================================================== */
const NihonCoreSRS = (function () {
  const STORE_KEY = 'nihoncore_srs_v1';
  const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];  // box index → days until next due
  const MAX_BOX = INTERVALS_DAYS.length - 1;
  const DAY_MS = 86400000;

  function loadAll() {
    try {
      const obj = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return (obj && typeof obj === 'object') ? obj : {};
    } catch (e) { return {}; }
  }
  function saveAll(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function getItemState(itemId) {
    if (!itemId) return null;
    const all = loadAll();
    return all[itemId] || null;
  }
  function getStateBatch(itemIds) {
    const all = loadAll();
    const out = {};
    (itemIds || []).forEach(id => { out[id] = all[id] || null; });
    return out;
  }

  function recordReview(itemId, quality) {
    if (!itemId) return null;
    const all = loadAll();
    const now = Date.now();
    const cur = all[itemId] || { box: 0, reps: 0, lapses: 0, lastTs: 0, nextDueTs: 0 };
    cur.reps++;
    if (quality === 0) {
      cur.lapses++;
      cur.box = 0;
      cur.nextDueTs = now;          // azonnal újra
    } else if (quality === 2) {
      cur.box = Math.min(MAX_BOX, cur.box + 2);
      cur.nextDueTs = now + INTERVALS_DAYS[cur.box] * DAY_MS;
    } else {
      cur.box = Math.min(MAX_BOX, cur.box + 1);
      cur.nextDueTs = now + INTERVALS_DAYS[cur.box] * DAY_MS;
    }
    cur.lastTs = now;
    all[itemId] = cur;
    saveAll(all);
    return cur;
  }

  function getDueItems(prefix, knownItemIds) {
    const all = loadAll();
    const now = Date.now();
    const due = [], seen = [], unseen = [];
    (knownItemIds || []).forEach(id => {
      if (prefix && !id.startsWith(prefix)) return;
      const s = all[id];
      if (!s) { unseen.push(id); return; }
      seen.push(id);
      if ((s.nextDueTs || 0) <= now) due.push(id);
    });
    return { due, seen, unseen };
  }

  // Egy scope összesítője a tárolt állapotból: hány elem van, hány esedékes, mikor jön a következő.
  function dueInfo(prefix) {
    const all = loadAll();
    const now = Date.now();
    let total = 0, due = 0, nextTs = 0;
    Object.keys(all).forEach(k => {
      if (prefix && !k.startsWith(prefix)) return;
      total++;
      const t = all[k].nextDueTs || 0;
      if (t <= now) due++;
      else if (!nextTs || t < nextTs) nextTs = t;
    });
    return { total: total, due: due, nextTs: nextTs };
  }

  function aggregateBoxes(prefix) {
    const all = loadAll();
    const boxes = INTERVALS_DAYS.map(() => 0);
    Object.keys(all).forEach(k => {
      if (prefix && !k.startsWith(prefix)) return;
      const b = (all[k].box || 0);
      if (b >= 0 && b < boxes.length) boxes[b]++;
    });
    return boxes;
  }

  function resetItem(itemId) {
    if (!itemId) return;
    const all = loadAll(); delete all[itemId]; saveAll(all);
  }
  function clearScope(prefix) {
    if (!prefix) return;
    const all = loadAll();
    Object.keys(all).forEach(k => { if (k.startsWith(prefix)) delete all[k]; });
    saveAll(all);
  }
  function clearAll() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }

  return {
    recordReview, getItemState, getStateBatch, getDueItems, dueInfo,
    aggregateBoxes, resetItem, clearScope, clearAll,
    INTERVALS_DAYS, MAX_BOX
  };
})();

// A három adat-/hang-modul a window-n is elérhető. Top-level `const`-ként
// nem kerülnének oda, pedig a fájl elején álló univerzális IIFE-k (kör-őr,
// párosító, kana-tábla) `window.NihonCoreStats` / `window.NihonCoreAudio`
// formában hivatkoznak rájuk — e nélkül a félbehagyott körök részmentése
// (NihonCoreRound.flush) soha nem futott le.
window.NihonCoreAudio = NihonCoreAudio;
window.NihonCoreStats = NihonCoreStats;
window.NihonCoreSRS   = NihonCoreSRS;


/* ====================================================
   2. LANDING (index.html) ─────────────────────────
   ==================================================== */

function initLanding() {
  // Régi horgony (könyvjelző, gyorsítótárazott link): a modulok külön oldalra költöztek
  if (window.location.hash === '#modules') { window.location.replace('pages/modules.html'); return; }

  const Path = window.NihonCorePath;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pctText = v => Math.round(v * 100) + '%';
  const CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
  const ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

  // ── Felső blokk: szintválasztó (első alkalom) vagy „Folytatás" ──
  // „Mai ismétlés": a leckék kérdései az ismétlés-ütemezőből (NihonCoreSRS, 'lesson:' scope).
  //   Esedékes kérdésnél kiemelt kártya; ha nincs, csendes sor a következő időponttal.
  function reviewCardHtml(v) {
    if (!window.NihonCoreSRS || !NihonCoreSRS.dueInfo) return '';
    const info = NihonCoreSRS.dueInfo('lesson:');
    const anyLesson = v.rows.some(r => r.done && r.step.module === 'lesson' && r.step.mode !== 'listen');
    if (!info.total && !anyLesson) return '';
    const days = info.nextTs ? Math.max(1, Math.ceil((info.nextTs - Date.now()) / 86400000)) : 0;
    const title = info.due ? 'Mai ismétlés' : 'Ismétlés';
    const desc = info.due ? info.due + ' kérdés vár a korábbi leckékből'
      : info.total ? 'Ma nincs esedékes kérdés. A következő ' + (days <= 1 ? 'holnap' : days + ' nap múlva') + ' jön.'
      : 'Kérdések az eddig elvégzett leckékből';
    return `
      <a class="path-step-link review-card${info.due ? ' is-due' : ''}" href="pages/lesson.html?review=1">
        <span class="path-glyph" lang="ja">復</span>
        <span class="path-step-body">
          <span class="path-step-title">${title}</span>
          <span class="path-step-desc">${desc}</span>
        </span>
        <span class="path-step-end"><span class="path-state${info.due ? ' path-state-next' : ''}">${info.due ? 'Indítás' : 'Megnézem'}</span></span>
      </a>`;
  }

  // ── Napi cél és sorozat: a „Folytatás" kártya alsó sora ──
  //   A cél a naponta megválaszolt kérdések száma (a körök és a leckék gyors kérdései, a
  //   statisztika mai napjából); a sorozat az egymást követő gyakorló napok száma.
  //   A célra koppintva három fokozat közül lehet választani.
  const GOAL_KEY = 'nihoncore_goal_v1';                    // { daily } — a fiókkal szinkronizálódik (sync.js)
  const GOALS = [{ n: 10, label: 'Könnyed' }, { n: 20, label: 'Rendes' }, { n: 40, label: 'Komoly' }];
  let goalOpen = false;
  function dailyGoal() {
    try {
      const g = JSON.parse(localStorage.getItem(GOAL_KEY) || '{}');
      if (GOALS.some(x => x.n === g.daily)) return g.daily;
    } catch (e) {}
    return 20;
  }
  function dayStripHtml() {
    if (!window.NihonCoreStats || !NihonCoreStats.getToday) return '';
    const goal = dailyGoal();
    const t = NihonCoreStats.getToday(), s = NihonCoreStats.getStreak();
    const met = t.questions >= goal;
    const R = 15, C = 2 * Math.PI * R;
    const off = C * (1 - Math.min(1, t.questions / goal));
    const streakLabel = s.current + ' napos sorozat' + (s.current && !s.today ? ', ma még nem gyakoroltál' : '');
    return `
        <div class="continue-day${met ? ' is-met' : ''}">
          <button class="day-goal" id="dayGoalBtn" type="button" aria-expanded="${goalOpen ? 'true' : 'false'}" aria-controls="dayGoalPick"
                  aria-label="${met ? 'Megvan a mai cél' : 'Mai cél'}: ${t.questions} / ${goal} kérdés. A cél módosítása">
            <svg class="day-ring" viewBox="0 0 36 36" width="40" height="40" aria-hidden="true" focusable="false">
              <circle class="day-ring-bg" cx="18" cy="18" r="${R}"/>
              <circle class="day-ring-fg" cx="18" cy="18" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
              ${met ? '<path class="day-ring-check" d="m12.5 18.4 3.7 3.7 7.3-7.6"/>' : ''}
            </svg>
            <span class="day-goal-text">
              <span class="day-goal-title">${met ? 'Megvan a mai cél' : 'Mai cél'}</span>
              <span class="day-goal-num">${t.questions} / ${goal} kérdés</span>
            </span>
          </button>
          ${s.current ? `<span class="day-streak${s.today ? '' : ' is-wait'}" role="img" aria-label="${streakLabel}"><span aria-hidden="true">🔥</span>${s.current} nap</span>` : ''}
          <div class="day-pick" id="dayGoalPick"${goalOpen ? '' : ' hidden'}>
            <span class="day-pick-label">Napi cél: hány kérdésre válaszolsz egy nap?</span>
            ${GOALS.map(g => `<button class="day-pick-btn${g.n === goal ? ' is-on' : ''}" type="button" data-goal="${g.n}" aria-pressed="${g.n === goal ? 'true' : 'false'}">${g.label}<span>${g.n} kérdés</span></button>`).join('')}
          </div>
        </div>`;
  }
  function bindDayStrip(top) {
    const btn = top.querySelector('#dayGoalBtn'), pick = top.querySelector('#dayGoalPick');
    if (!btn || !pick) return;
    btn.addEventListener('click', () => {
      goalOpen = !goalOpen;
      pick.hidden = !goalOpen;
      btn.setAttribute('aria-expanded', goalOpen ? 'true' : 'false');
    });
    pick.querySelectorAll('.day-pick-btn').forEach(b => b.addEventListener('click', () => {
      try { localStorage.setItem(GOAL_KEY, JSON.stringify({ daily: parseInt(b.dataset.goal, 10) })); } catch (e) {}
      if (window.NihonCoreSync && NihonCoreSync.schedulePush) NihonCoreSync.schedulePush();   // a cél a fiókkal együtt jár
      goalOpen = false;
      renderHomeTop();
      const again = document.getElementById('dayGoalBtn');
      if (again) try { again.focus(); } catch (e) {}
    }));
  }

  function renderHomeTop() {
    const top = document.getElementById('homeTop');
    if (!top || !Path) return;
    const v = Path.view();

    if (!v.level) {
      top.innerHTML = `
        <div class="home-hero">
          <h1 class="hero-title">
            <span class="hero-jp" lang="ja">日本語を</span>
            <span class="hero-sub">vidd reflexszintre.</span>
          </h1>
          <p class="hero-desc">Japán nyelvtan magyarul, lépésről lépésre: előbb megérted a szabályt,
            aztán gyakorlod, végül ismétléssel rögzíted.</p>
        </div>
        <div class="onboard glass-panel-heavy">
          <h2 class="onboard-title">Honnan indulsz?</h2>
          <p class="onboard-sub">Ehhez igazítjuk az első lépéseket. Később bármikor átállíthatod.</p>
          <div class="onboard-options">
            <button class="onboard-opt" type="button" data-level="zero">
              <span class="path-glyph" lang="ja">あ</span>
              <span class="onboard-opt-text"><strong>Nulláról kezdem</strong>
                <span>Még nem olvasom a hiraganát és a katakanát.</span></span>
            </button>
            <button class="onboard-opt" type="button" data-level="kana">
              <span class="path-glyph" lang="ja">文</span>
              <span class="onboard-opt-text"><strong>A kanát már olvasom</strong>
                <span>Jöhet a nyelvtan: mondatok, igék, partikulák.</span></span>
            </button>
          </div>
        </div>`;
      top.querySelectorAll('.onboard-opt').forEach(btn => btn.addEventListener('click', () => {
        Path.setLevel(btn.dataset.level);
        renderAll();
        const card = document.querySelector('.continue');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }));
      return;
    }

    if (!v.next) {
      top.innerHTML = `
        <div class="continue glass-panel-heavy" data-glyph="祝">
          <div class="continue-kicker">Tanulási út · ${v.doneCount} / ${v.total} lépés kész</div>
          <div class="continue-main">
            <span class="path-glyph path-glyph-lg" lang="ja">祝</span>
            <div class="continue-text">
              <h1 class="continue-title">Végigértél az úton</h1>
              <p class="continue-desc">Innen a szabad gyakorlás és a statisztika vakfoltjai visznek tovább.</p>
            </div>
          </div>
          <a class="btn btn-primary btn-lg" href="pages/modules.html">Szabad gyakorlás</a>
          ${dayStripHtml()}
        </div>${reviewCardHtml(v)}`;
      bindDayStrip(top);
      return;
    }

    const s = v.next.step;
    const stepNo = v.rows.filter(r => !r.skipped && !r.optional).findIndex(r => r.step.id === s.id) + 1;
    const started = v.doneCount > 0 || v.next.best !== null;
    top.innerHTML = `
      <div class="continue glass-panel-heavy" data-glyph="${esc(s.glyph)}">
        <div class="continue-kicker">${started ? 'Következő lépés' : 'Első lépés'} · ${stepNo} / ${v.total}</div>
        <div class="continue-main">
          <span class="path-glyph path-glyph-lg" lang="ja">${esc(s.glyph)}</span>
          <div class="continue-text">
            <h1 class="continue-title">${esc(s.title)}</h1>
            <p class="continue-desc">${esc(s.desc)}</p>
          </div>
        </div>
        <a class="btn btn-primary btn-lg continue-btn" href="${Path.stepHref(s)}">${started ? 'Folytatás' : 'Kezdés'}</a>
        <div class="continue-progress" role="img" aria-label="${v.doneCount} / ${v.total} lépés kész">
          <div class="continue-bar"><div class="continue-fill" style="width: ${v.total ? (v.doneCount / v.total) * 100 : 0}%"></div></div>
          <span class="continue-count">${v.doneCount} / ${v.total} lépés kész</span>
        </div>
        <button class="continue-jump" type="button">Mutasd a térképen</button>
        ${dayStripHtml()}
      </div>${reviewCardHtml(v)}`;
    bindDayStrip(top);
    // A térkép hosszú: a gomb a következő lépés csomópontjához görget (ha a fejezete csukva van, kinyitja).
    top.querySelector('.continue-jump').addEventListener('click', () => {
      const node = document.querySelector('.path-node.is-next');
      if (!node) return;
      const unit = node.closest('.path-unit');
      if (unit && unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);
      node.scrollIntoView({ behavior: scrollMode(), block: 'center' });
    });
  }

  // ── A tanulási út térképe ──
  //   Fejezetek (NIHONCORE_PATH_UNITS), bennük kanyargó ösvény. A geometria rögzített
  //   (a style.css „TANULÁSI ÚT — térkép" blokkjával egyezik), így az összekötő vonal
  //   mérés nélkül számolható.
  const UNITS = (typeof NIHONCORE_PATH_UNITS !== 'undefined') ? NIHONCORE_PATH_UNITS : null;
  const WAVE = [0, 52, 78, 52, 0, -52, -78, -52];          // vízszintes eltolás csomópontonként (px)
  const wide = window.matchMedia('(min-width: 600px)');
  const mapGeom = () => wide.matches ? { row: 150, disc: 80, top: 22 } : { row: 140, disc: 72, top: 22 };
  const SEEN_KEY = 'nihoncore_path_seen_v1';               // a „most lett kész" effekthez: mit láttunk már késznek
  let openPop = null;

  // Összecsukható fejezetek: a térkép hosszú, ezért alapból csak az a fejezet nyitott, ahol
  // tartasz, és az utána következő kettő; a többi egy sor. A fejezet fejléce a kapcsoló.
  const MAP_KEY = 'nihoncore_map_open';                    // munkamenet: amit kézzel kinyitottál / becsuktál
  const MAP_AHEAD = 2;
  let mapFold = {};
  try { mapFold = JSON.parse(sessionStorage.getItem(MAP_KEY) || '{}') || {}; } catch (e) {}
  const saveMapFold = () => { try { sessionStorage.setItem(MAP_KEY, JSON.stringify(mapFold)); } catch (e) {} };
  function updateFoldAll() {
    const b = document.getElementById('pathFoldAll');
    if (!b) return;
    const anyFolded = !!document.querySelector('#pathList .path-unit.is-folded');
    b.textContent = anyFolded ? 'Minden fejezet kinyitása' : 'Vissza a rövid nézethez';
    b.dataset.mode = anyFolded ? 'open' : 'auto';
  }
  function foldMapUnit(unit, open, remember) {
    if (!unit) return;
    if (!open && openPop && unit.contains(openPop.btn)) closePop();
    unit.classList.toggle('is-folded', !open);
    const map = unit.querySelector('.path-map'), b = unit.querySelector('.path-unit-fold');
    if (map) map.hidden = !open;
    if (b) {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', b.dataset.title + ': a lépések ' + (open ? 'elrejtése' : 'megjelenítése'));
    }
    if (remember) { mapFold[unit.dataset.unit] = open; saveMapFold(); updateFoldAll(); }
  }

  function closePop() {
    if (!openPop) return;
    const { pop, btn, section } = openPop;
    openPop = null;
    pop.remove();
    btn.setAttribute('aria-expanded', 'false');
    if (section) section.classList.remove('has-pop');
    document.documentElement.classList.remove('has-path-pop');
  }

  function openNode(btn, row, v) {
    const same = openPop && openPop.btn === btn;
    closePop();
    if (same) return;
    const s = row.step;
    const isNext = v.next && v.next.step.id === s.id && !!v.level;
    const chips = [];
    if (row.done) chips.push('<span class="path-pop-chip is-ok">Kész</span>');
    else if (row.skipped) chips.push('<span class="path-pop-chip">Átugorva: már olvasod a kanát</span>');
    else if (isNext) chips.push('<span class="path-pop-chip">Ez a következő lépés</span>');
    else if (row.optional) chips.push('<span class="path-pop-chip">Nem kötelező: nélküle is mehetsz tovább</span>');
    if (row.best !== null) chips.push('<span class="path-pop-chip' + (row.done ? ' is-ok' : '') + '">Legjobb köröd: ' + pctText(row.best) + '</span>');
    else if (!row.skipped) chips.push('<span class="path-pop-chip">A lépéshez ' + Math.round(Path.PASS * 100) + '% kell</span>');
    const cta = row.optional ? (row.best !== null ? 'Megírom újra' : 'Megnézem') : row.done ? 'Gyakorlás újra' : row.skipped ? 'Mégis megnézem' : (row.best !== null ? 'Folytatás' : 'Kezdés');

    const pop = document.createElement('div');
    pop.className = 'path-pop';
    pop.id = 'pathPop';
    pop.innerHTML =
      '<h4 class="path-pop-title">' + esc(s.title) + '</h4>' +
      '<p class="path-pop-desc">' + esc(s.desc) + '</p>' +
      (chips.length ? '<div class="path-pop-meta">' + chips.join('') + '</div>' : '') +
      '<a class="btn btn-primary" href="' + Path.stepHref(s) + '">' + cta + '</a>';
    const li = btn.closest('.path-node');
    li.appendChild(pop);
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', 'pathPop');
    const section = li.closest('.path-section');
    if (section) section.classList.add('has-pop');
    document.documentElement.classList.add('has-path-pop');   // a tartalomjegyzék lebegő gombja ne takarja a buborékot
    openPop = { pop: pop, btn: btn, section: section };
    // a buborék a lebegő fejléc és az alsó fül-sáv között legyen
    const r = pop.getBoundingClientRect();
    const header = document.getElementById('header');
    const tabbar = document.querySelector('.nc-tabbar');
    const topLimit = (header ? header.getBoundingClientRect().bottom : 0) + 12;
    const tb = tabbar ? tabbar.getBoundingClientRect() : null;
    const bottomLimit = (tb && tb.width > 0 ? tb.top : window.innerHeight) - 16;
    let dy = 0;
    if (r.bottom > bottomLimit) dy = r.bottom - bottomLimit;
    if (r.top - dy < topLimit) dy = r.top - topLimit;
    if (Math.abs(dy) > 2) window.scrollBy({ top: dy, behavior: 'smooth' });
  }

  function renderPath() {
    const list = document.getElementById('pathList');
    const levelEl = document.getElementById('pathLevel');
    if (!list || !Path) return;
    closePop();
    const v = Path.view();
    const byId = {};
    v.rows.forEach(r => { byId[r.step.id] = r; });

    // fejezetek; ami egyik fejezetben sincs, a végére kerül
    let units = UNITS
      ? UNITS.map(u => ({ unit: u, rows: u.steps.map(id => byId[id]).filter(Boolean) })).filter(u => u.rows.length)
      : [];
    const placed = {};
    units.forEach(u => u.rows.forEach(r => { placed[r.step.id] = true; }));
    const rest = v.rows.filter(r => !placed[r.step.id]);
    if (rest.length) units.push({ unit: { id: 'u-rest', title: UNITS ? 'További lépések' : 'Lépések', sub: '' }, rows: rest });

    // mit láttunk már késznek (az első alkalommal minden kész lépés „látott")
    let seen = null;
    try { seen = JSON.parse(localStorage.getItem(SEEN_KEY) || 'null'); } catch (e) {}
    const doneIds = v.rows.filter(r => r.done).map(r => r.step.id);
    const fresh = Array.isArray(seen) ? doneIds.filter(id => seen.indexOf(id) < 0) : [];
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(doneIds)); } catch (e) {}

    // melyik fejezet nyitott: ahol tartasz + a következő MAP_AHEAD; ha az út kész, mind csukva
    const nextId = v.next && v.level ? v.next.step.id : null;
    const nextUnit = nextId ? units.findIndex(u => u.rows.some(r => r.step.id === nextId)) : -1;
    const cur = nextUnit >= 0 ? nextUnit : (v.next ? 0 : -99);

    const g = mapGeom();
    const cy = i => i * g.row + g.top + g.disc / 2;
    let gi = 0;                                           // csomópont-sorszám az egész úton (a kanyar folytonos)
    list.innerHTML = units.map((u, ui) => {
      const uid = u.unit.id || ('u' + ui);
      const live = u.rows.filter(r => !r.skipped && !r.optional);
      const done = live.filter(r => r.done).length;
      const complete = live.length > 0 && done === live.length;
      // a frissen kész lépés fejezete ezen a megnyitáson még nyitva marad (hogy látsszon az animáció)
      const hasFresh = u.rows.some(r => fresh.indexOf(r.step.id) >= 0);
      const open = (uid in mapFold) ? !!mapFold[uid] : (hasFresh || (ui >= cur && ui <= cur + MAP_AHEAD));
      const xs = u.rows.map((r, i) => WAVE[(gi + i) % WAVE.length]);
      const segs = u.rows.slice(0, -1).map((r, i) => {
        const bothDone = r.done && u.rows[i + 1].done;
        const isFresh = bothDone && (fresh.indexOf(r.step.id) >= 0 || fresh.indexOf(u.rows[i + 1].step.id) >= 0);
        const y0 = cy(i), y1 = cy(i + 1), k = g.row * 0.5;
        return '<path class="path-seg' + (bothDone ? ' is-done' : '') + (isFresh ? ' just-done' : '') + '"' +
          (isFresh ? ' pathLength="1"' : '') +
          ' d="M ' + xs[i] + ' ' + y0 + ' C ' + xs[i] + ' ' + (y0 + k) + ', ' + xs[i + 1] + ' ' + (y1 - k) + ', ' + xs[i + 1] + ' ' + y1 + '"/>';
      }).join('');
      const h = u.rows.length * g.row;
      const nodes = u.rows.map((r, i) => {
        const s = r.step;
        const isNext = v.next && v.next.step.id === s.id && !!v.level;
        const cls = (r.done ? ' is-done' : r.skipped ? ' is-skipped' : isNext ? ' is-next' : '') +
                    (r.optional ? ' is-exam' : '') + (fresh.indexOf(s.id) >= 0 ? ' just-done' : '');
        const state = r.done ? 'kész' : r.skipped ? 'átugorva' : isNext ? 'következő lépés' : r.optional ? 'nem kötelező dolgozat' : 'még nem kezdted el';
        const n = gi + i;
        return `
          <li class="path-node${cls}" style="--x: ${xs[i]}px">
            <button class="path-node-btn" type="button" data-step="${esc(s.id)}" style="--i: ${Math.min(n, 9)}"
                    aria-expanded="false" aria-label="${esc(s.title)}, ${state}">
              <span class="path-node-disc">
                <span lang="ja" aria-hidden="true">${esc(s.glyph)}</span>
                ${r.done ? '<span class="path-node-check">' + CHECK + '</span>' : ''}
                ${isNext ? '<span class="path-node-tag">' + (r.best !== null || v.doneCount > 0 ? 'Folytatás' : 'Kezdés') + '</span>' : ''}
              </span>
              <span class="path-node-label">${esc(s.title)}</span>
            </button>
          </li>`;
      }).join('');
      gi += u.rows.length;
      return `
        <li class="path-unit${complete ? ' is-complete' : ''}${open ? '' : ' is-folded'}" data-unit="${esc(uid)}">
          <div class="path-unit-head">
            <span class="path-unit-no">${esc(u.unit.kicker || ((ui + 1) + '. fejezet'))}</span>
            <h3 class="path-unit-title">${esc(u.unit.title)}</h3>
            ${u.unit.sub ? '<span class="path-unit-sub">' + esc(u.unit.sub) + '</span>' : ''}
            <span class="path-unit-count" aria-label="${done} / ${live.length} lépés kész">${live.length ? done + ' / ' + live.length : '–'}</span>
            <button class="path-unit-fold" type="button" aria-expanded="${open ? 'true' : 'false'}" aria-controls="pathMap${ui}"
                    data-title="${esc(u.unit.title)}" aria-label="${esc(u.unit.title)}: a lépések ${open ? 'elrejtése' : 'megjelenítése'}">${FOLD}</button>
          </div>
          <ol class="path-map" id="pathMap${ui}"${open ? '' : ' hidden'}>
            <svg class="path-map-line" viewBox="-180 0 360 ${h}" width="360" height="${h}" aria-hidden="true" focusable="false">${segs}</svg>
            ${nodes}
          </ol>
        </li>`;
    }).join('');

    // a fejezet fejléce az egész szélességében kapcsoló (a nyíl a billentyűzetes vezérlő)
    list.querySelectorAll('.path-unit-head').forEach(head => head.addEventListener('click', e => {
      e.stopPropagation();
      const unit = head.closest('.path-unit');
      closePop();
      foldMapUnit(unit, unit.classList.contains('is-folded'), true);
    }));
    updateFoldAll();

    list.querySelectorAll('.path-node-btn').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      const row = byId[btn.dataset.step];
      if (row) openNode(btn, row, Path.view());
    }));

    if (levelEl) {
      levelEl.innerHTML = !v.level ? '' :
        (v.level === 'zero' ? 'Nulláról indulsz: az út a kanával kezdődik.' : 'A kanát már olvasod: az út a nyelvtannal kezdődik.') +
        ' <button class="path-level-btn" type="button">Módosítás</button>';
      const b = levelEl.querySelector('.path-level-btn');
      if (b) b.addEventListener('click', () => { Path.setLevel(v.level === 'zero' ? 'kana' : 'zero'); renderAll(); });
    }

    renderToc(units, v);
  }
  // a buborék bezárása: kattintás máshová, Esc
  document.addEventListener('click', e => { if (openPop && !openPop.pop.contains(e.target)) closePop(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openPop) { const b = openPop.btn; closePop(); try { b.focus(); } catch (err) {} }
  });
  // a töréspont átlépésekor a térkép geometriája változik
  if (wide.addEventListener) wide.addEventListener('change', () => renderPath());
  // „Minden fejezet kinyitása" ↔ „Vissza a rövid nézethez" (az utóbbi törli a kézi állapotot)
  const foldAllBtn = document.getElementById('pathFoldAll');
  if (foldAllBtn) foldAllBtn.addEventListener('click', () => {
    if (foldAllBtn.dataset.mode === 'open') {
      document.querySelectorAll('#pathList .path-unit').forEach(u => { mapFold[u.dataset.unit] = true; });
    } else mapFold = {};
    saveMapFold();
    renderPath();
  });

  // ── A tanulási út tartalomjegyzéke ──
  //   Ugyanazokból a fejezetekből épül, mint a térkép (renderPath hívja). Asztali gépen
  //   (≥ 1100 px) rögzített oldalsáv, a tartalom mellé tolva; keskenyebb kijelzőn balról
  //   kihúzható fiók. Egy fejezetre vagy lépésre kattintva a térkép odagördül.
  //   A stílusa: style.css „TANULÁSI ÚT — térkép" blokk, „Tartalomjegyzék" rész.
  const TOC_KEY = 'nihoncore_toc_v1';                      // eszköz-helyi: nyitva van-e a sáv, minden fejezet nyitva van-e
  const tocEl = document.getElementById('pathToc');
  const tocBody = document.getElementById('ptocBody');
  const tocToggle = document.getElementById('ptocToggle');
  const tocScrim = document.getElementById('ptocScrim');
  const tocClose = document.getElementById('ptocClose');
  const tocAll = document.getElementById('ptocAll');
  const tocDock = window.matchMedia('(min-width: 1100px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const FOLD = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const tocState = { open: null, all: false };
  try { Object.assign(tocState, JSON.parse(localStorage.getItem(TOC_KEY) || '{}')); } catch (e) {}
  const tocFolded = {};                                    // fejezet → nyitva van-e (erre a munkamenetre)
  let tocOpen = false, tocActive = null, tocSpy = null, locateTimer = 0;
  const saveToc = () => { try { localStorage.setItem(TOC_KEY, JSON.stringify(tocState)); } catch (e) {} };
  const scrollMode = () => calm.matches ? 'auto' : 'smooth';

  function renderToc(units, v) {
    if (!tocEl || !tocBody) return;
    const nextId = v.next && v.level ? v.next.step.id : null;
    const prog = document.getElementById('ptocProgress');
    if (prog) prog.textContent = v.doneCount + ' / ' + v.total + ' lépés kész';

    tocBody.innerHTML = units.map((u, ui) => {
      const uid = u.unit.id || ('u' + ui);
      const live = u.rows.filter(r => !r.skipped && !r.optional);
      const done = live.filter(r => r.done).length;
      const complete = live.length > 0 && done === live.length;
      const hasNext = !!nextId && u.rows.some(r => r.step.id === nextId);
      if (!(uid in tocFolded)) tocFolded[uid] = hasNext || (!nextId && ui === 0);
      const isOpen = tocState.all || tocFolded[uid];
      const steps = u.rows.map(r => {
        const s = r.step;
        const isNext = s.id === nextId;
        const cls = (r.done ? ' is-done' : r.skipped ? ' is-skipped' : isNext ? ' is-next' : '') + (r.optional ? ' is-exam' : '');
        const state = r.done ? 'kész' : r.skipped ? 'átugorva' : isNext ? 'következő lépés' : r.optional ? 'nem kötelező dolgozat' : 'még nem kezdted el';
        return `
          <li class="ptoc-step${cls}">
            <button class="ptoc-step-btn" type="button" data-step="${esc(s.id)}" aria-label="${esc(s.title)}, ${state}">
              <span class="ptoc-glyph" lang="ja" aria-hidden="true">${esc(s.glyph)}</span>
              <span class="ptoc-step-title">${esc(s.title)}</span>
              ${r.done ? '<span class="ptoc-step-mark">' + CHECK + '</span>' : isNext ? '<span class="ptoc-step-mark ptoc-step-here">Itt tartasz</span>' : ''}
            </button>
          </li>`;
      }).join('');
      return `
        <section class="ptoc-unit${complete ? ' is-complete' : ''}${isOpen ? ' is-unfolded' : ''}" data-unit="${esc(uid)}">
          <div class="ptoc-unit-row">
            <button class="ptoc-unit-btn" type="button">
              <span class="ptoc-kicker">${esc(u.unit.kicker || ((ui + 1) + '. fejezet'))}</span>
              <span class="ptoc-unit-title">${esc(u.unit.title)}</span>
              ${u.unit.sub ? '<span class="ptoc-unit-sub">' + esc(u.unit.sub) + '</span>' : ''}
            </button>
            <span class="ptoc-count" aria-label="${done} / ${live.length} lépés kész">${live.length ? done + ' / ' + live.length : '–'}</span>
            <button class="ptoc-fold" type="button" aria-expanded="${isOpen ? 'true' : 'false'}" aria-controls="ptocSteps${ui}"
                    aria-label="${esc(u.unit.title)}: a lépések ${isOpen ? 'elrejtése' : 'megjelenítése'}">${FOLD}</button>
          </div>
          <ol class="ptoc-steps" id="ptocSteps${ui}"${isOpen ? '' : ' hidden'}>${steps}</ol>
        </section>`;
    }).join('');

    if (tocAll) {
      tocAll.textContent = tocState.all ? 'Mindet becsuk' : 'Mindet kinyit';
      tocAll.setAttribute('aria-pressed', tocState.all ? 'true' : 'false');
    }
    const keep = tocActive; tocActive = null;
    watchUnits();
    if (keep) markTocActive(keep);
    else if (tocOpen) {                                    // induláskor a sáv ott álljon, ahol tartasz
      const here = tocBody.querySelector('.ptoc-step.is-next');
      if (here) revealInToc(here.closest('.ptoc-unit'));
    }
  }

  // Egy fejezet lépéseinek kinyitása / becsukása a sávban
  function foldTocUnit(sec, open) {
    if (!sec) return;
    tocFolded[sec.dataset.unit] = open;
    sec.classList.toggle('is-unfolded', open);
    const list = sec.querySelector('.ptoc-steps');
    const fold = sec.querySelector('.ptoc-fold');
    if (list) list.hidden = !open;
    if (fold) {
      fold.setAttribute('aria-expanded', open ? 'true' : 'false');
      fold.setAttribute('aria-label', fold.getAttribute('aria-label').replace(open ? 'megjelenítése' : 'elrejtése', open ? 'elrejtése' : 'megjelenítése'));
    }
  }

  // Az a fejezet, amelyik éppen a képernyő felső sávjában van (görgetés-követés)
  function watchUnits() {
    if (tocSpy) { tocSpy.disconnect(); tocSpy = null; }
    if (!tocBody || !('IntersectionObserver' in window)) return;
    const els = Array.prototype.slice.call(document.querySelectorAll('#pathList .path-unit'));
    const header = document.getElementById('header');
    const cut = Math.round((header ? header.getBoundingClientRect().bottom : 0) + 16);
    const inView = new Set();
    tocSpy = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) inView.add(en.target); else inView.delete(en.target); });
      const first = els.find(el => inView.has(el));
      markTocActive(first ? first.dataset.unit : null);
    }, { rootMargin: '-' + cut + 'px 0px -55% 0px', threshold: 0 });
    els.forEach(el => tocSpy.observe(el));
  }

  function markTocActive(uid) {
    if (uid === tocActive || !tocBody) return;
    tocActive = uid;
    tocBody.querySelectorAll('.ptoc-unit.is-active').forEach(s => {
      s.classList.remove('is-active');
      const b = s.querySelector('.ptoc-unit-btn'); if (b) b.removeAttribute('aria-current');
    });
    if (!uid) return;
    const sec = tocBody.querySelector('.ptoc-unit[data-unit="' + uid + '"]');
    if (!sec) return;
    sec.classList.add('is-active');
    const b = sec.querySelector('.ptoc-unit-btn'); if (b) b.setAttribute('aria-current', 'true');
    if (tocOpen) revealInToc(sec);
  }

  // a sáv saját görgetése: az aktív fejezet maradjon látható (az oldal nem mozdul)
  function revealInToc(sec) {
    const b = tocBody.getBoundingClientRect();
    // ha a fejezet a lépéseivel együtt kifér, az egész látsszon; különben legalább a címsora
    const whole = sec.getBoundingClientRect();
    const r = whole.height <= b.height - 12 ? whole : (sec.querySelector('.ptoc-unit-row') || sec).getBoundingClientRect();
    if (r.top < b.top + 6) tocBody.scrollTop += r.top - b.top - 6;
    else if (r.bottom > b.bottom - 6) tocBody.scrollTop += r.bottom - b.bottom + 6;
  }

  function setTocOpen(open, focus) {
    if (!tocEl) return;
    tocOpen = open;
    const dock = tocDock.matches;
    tocEl.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('toc-docked', open && dock);
    if (tocScrim) tocScrim.classList.toggle('is-open', open && !dock);
    if (tocToggle) {
      tocToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      tocToggle.classList.toggle('is-away', open);
    }
    if (dock) { tocState.open = open; saveToc(); }       // a fiók (telefon) mindig csukva indul
    if (open) {
      const sec = tocActive && tocBody.querySelector('.ptoc-unit[data-unit="' + tocActive + '"]');
      const here = sec || tocBody.querySelector('.ptoc-step.is-next');
      if (here) revealInToc(here.closest('.ptoc-unit') || here);
      if (focus && tocClose) tocClose.focus();
    } else if (focus && tocToggle) tocToggle.focus();
  }

  // A térkép odagördül: a fejezet címe a lebegő fejléc alá, a lépés a képernyő közepére
  function locate(el) {
    if (!el) return;
    document.querySelectorAll('.is-located').forEach(x => x.classList.remove('is-located'));
    el.classList.add('is-located');
    clearTimeout(locateTimer);
    locateTimer = setTimeout(() => el.classList.remove('is-located'), 2400);
  }
  function goToUnit(uid) {
    const unit = document.querySelector('#pathList .path-unit[data-unit="' + uid + '"]');
    if (!unit) return;
    closePop();
    if (!tocDock.matches) setTocOpen(false);
    if (unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);   // a csukott fejezet kinyílik
    const header = document.getElementById('header');
    const y = unit.getBoundingClientRect().top + window.scrollY - (header ? header.getBoundingClientRect().bottom : 0) - 4;
    window.scrollTo({ top: Math.max(0, y), behavior: scrollMode() });
    locate(unit);
  }
  function goToStep(id) {
    const btn = document.querySelector('#pathList .path-node-btn[data-step="' + id + '"]');
    if (!btn) return;
    closePop();
    if (!tocDock.matches) setTocOpen(false);
    const node = btn.closest('.path-node');
    const unit = node.closest('.path-unit');
    if (unit && unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);
    node.scrollIntoView({ behavior: scrollMode(), block: 'center' });
    locate(node);
    try { btn.focus({ preventScroll: true }); } catch (e) {}
  }

  if (tocEl && tocBody) {
    tocBody.addEventListener('click', e => {
      const fold = e.target.closest('.ptoc-fold');
      if (fold) {
        const sec = fold.closest('.ptoc-unit'), open = !sec.classList.contains('is-unfolded');
        foldTocUnit(sec, open);
        if (open) revealInToc(sec);
        return;
      }
      const unitBtn = e.target.closest('.ptoc-unit-btn');
      if (unitBtn) {
        const sec = unitBtn.closest('.ptoc-unit');
        foldTocUnit(sec, true);
        if (tocDock.matches) revealInToc(sec);
        goToUnit(sec.dataset.unit);
        return;
      }
      const stepBtn = e.target.closest('.ptoc-step-btn');
      if (stepBtn) goToStep(stepBtn.dataset.step);
    });
    if (tocToggle) tocToggle.addEventListener('click', () => setTocOpen(true, true));
    if (tocClose) tocClose.addEventListener('click', () => setTocOpen(false, true));
    if (tocScrim) tocScrim.addEventListener('click', () => setTocOpen(false));
    if (tocAll) tocAll.addEventListener('click', () => {
      tocState.all = !tocState.all; saveToc();
      if (!tocState.all) Object.keys(tocFolded).forEach(k => { tocFolded[k] = false; });   // becsukáskor csak az marad nyitva, ahol tartasz
      const next = tocBody.querySelector('.ptoc-step.is-next');
      tocBody.querySelectorAll('.ptoc-unit').forEach(sec => foldTocUnit(sec, tocState.all || (!!next && sec.contains(next))));
      tocAll.textContent = tocState.all ? 'Mindet becsuk' : 'Mindet kinyit';
      tocAll.setAttribute('aria-pressed', tocState.all ? 'true' : 'false');
      const sec = tocActive && tocBody.querySelector('.ptoc-unit[data-unit="' + tocActive + '"]');
      if (sec) revealInToc(sec);
    });
    // fiók-módban: Esc bezár, a Tab a fiókon belül marad
    document.addEventListener('keydown', e => {
      if (!tocOpen || tocDock.matches) return;
      if (e.key === 'Escape') { setTocOpen(false, true); return; }
      if (e.key !== 'Tab') return;
      const items = Array.prototype.filter.call(tocEl.querySelectorAll('button'), b => b.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // a töréspont átlépésekor: asztali gépen a mentett állapot, fiók-módban csukva
    const syncTocMode = () => setTocOpen(tocDock.matches ? tocState.open !== false : false);
    if (tocDock.addEventListener) tocDock.addEventListener('change', syncTocMode);
    syncTocMode();
  }

  function renderAll() { renderHomeTop(); renderPath(); }
  renderAll();

  // Fiók-blokk: bejelentkezve nincs rá szükség
  const account = document.getElementById('homeAccount');
  const hideAccount = user => { if (account) account.classList.toggle('hidden', !!user); };
  if (window.NihonCoreAuth) {
    try { hideAccount(NihonCoreAuth.getCachedUser && NihonCoreAuth.getCachedUser()); } catch (e) {}
    try { NihonCoreAuth.onChange && NihonCoreAuth.onChange(hideAccount); } catch (e) {}
  }

  // Oldalon belüli horgonyok: finom görgetés a lebegő fejléc alá
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const header = document.getElementById('header');
      const top = target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 24;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      try { history.replaceState(null, '', anchor.getAttribute('href')); } catch (err) {}
    });
  });
  // érkezés #path horgonnyal (pl. a modul-oldal „Tovább az úton" gombjáról)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) requestAnimationFrame(() => {
      const header = document.getElementById('header');
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 24) });
    });
  }

  // Aktív fejléc-link a görgetéssel
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));
}


/* ====================================================
   3. MODULE PAGE — verb engine (module.html) ──────
   ==================================================== */

function initModulePage() {

  // ── State (modul-szintű) ─────────────────────────
  const demoState = {
    baseId:   'arimasu',
    tense:    'Non-past',
    polarity: 'Affirmative',
    question: false
  };

  const matrixState = {
    inLobby: true,
    selectedTaskCount: 5,
    filters: {
      base:     { arimasu: true, imasu: true },
      tense:    { 'Non-past': true, 'Past': true },
      polarity: { 'Affirmative': true, 'Negative': true },
      question: { 'false': true, 'true': true }
    },
    taskQueue: [],
    taskIdx:    0,
    baseId:     null,
    tense:      null,
    polarity:   null,
    question:   false,
    submitted:  false,
    results:    []
  };

  // V8: kategória-tudatos subject-poolok mind a 8 bázishoz
  const SUBJECT_POOLS_MATRIX = {
    // existence (létezés)
    arimasu:  ['könyv', 'asztal', 'kávé', 'autó', 'mobil', 'óra', 'kalap', 'táska'],
    imasu:    ['kutya', 'macska', 'gyerek', 'tanár', 'barát', 'madár', 'vendég'],
    // consumption (fogyasztás)
    tabemasu: ['sushi', 'rizs', 'leves', 'kenyér', 'reggeli', 'ebéd', 'alma', 'sajt'],
    nomimasu: ['víz', 'tea', 'kávé', 'sör', 'lé', 'matcha', 'tej', 'narancslé'],
    kaimasu:  ['könyv', 'jegy', 'póló', 'táska', 'cipő', 'szuvenír', 'kávé', 'újság'],
    // movement (mozgás)
    ikimasu:  ['iskola', 'park', 'bolt', 'Tokió', 'Kiotó', 'mozi', 'munkahely', 'edzőterem'],
    kimasu:   ['barát', 'tanár', 'gyerek', 'vendég', 'család', 'kollégám', 'szomszéd'],
    kaerimasu:['otthon', 'hotel', 'falu', 'lakás', 'haza', 'iroda']
  };

  // V8: ige-kategória szerinti magyar fordítási sablonok a prompt + context-hez
  function getCategoryVerbForms(baseId) {
    // [non-past_aff, non-past_neg, past_aff, past_neg]
    switch (baseId) {
      case 'arimasu':   return ['Van ott egy',  'Nincs ott egy', 'Volt ott egy', 'Nem volt ott egy'];
      case 'imasu':     return ['Van ott egy',  'Nincs ott egy', 'Volt ott egy', 'Nem volt ott egy'];
      case 'tabemasu':  return ['eszek',        'nem eszek',     'ettem',        'nem ettem'];
      case 'nomimasu':  return ['iszok',        'nem iszok',     'ittam',        'nem ittam'];
      case 'kaimasu':   return ['veszek',       'nem veszek',    'vettem',       'nem vettem'];
      case 'ikimasu':   return ['megyek',       'nem megyek',    'mentem',       'nem mentem'];
      case 'kimasu':    return ['jön',          'nem jön',       'jött',         'nem jött'];
      case 'kaerimasu': return ['hazatérek',    'nem térek haza','hazatértem',   'nem tértem haza'];
      default:          return ['','','',''];
    }
  }

  const drillState = {
    cardIdx: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    startTime: 0,
    timerHandle: null,
    results: [],
    isAnswering: false
  };

  // ── Counter modul state (v1.6) — modul-scope, megosztott a 3 fázis közt ──
  const counterSettings = {
    inLobby: true,
    selectedCategoryIds: ['living', 'objects', 'general'],   // mind alap-on
    selectedCounterIds:  null,   // null = "minden a kategóriában"; tömbként konkrét lista
    minNum: 1,
    maxNum: 10,
    cardCount: 10
  };

  const counterRunState = {
    cardIdx: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    cards: [],          // generált feladat-objektumok
    submitted: false,
    chosenIdx: null,    // melyik option-t választotta
    results: []
  };

  // ── Hero feltöltés ───────────────────────────────
  function populateHero(m) {
    const iconWrap = document.getElementById('moduleHeroIcon');
    iconWrap.classList.add(m.iconClass);

    document.getElementById('moduleIconChar').textContent = m.icon;
    document.getElementById('moduleJlpt').textContent     = `JLPT ${m.jlptLevel}`;
    document.getElementById('moduleGroup').textContent    = m.group;
    document.getElementById('moduleTitle').textContent    = m.title;
    document.getElementById('moduleDesc').textContent     = m.description;

    if (m.status === 'locked' && m.lockedNote) {
      const banner = document.getElementById('moduleLockedBanner');
      document.getElementById('moduleLockedNote').textContent = m.lockedNote;
      banner.classList.remove('hidden');
    }
  }

  // ── Phase tabs setup ─────────────────────────────
  function setupPhaseTabs(m) {
    const tabs = document.querySelectorAll('.phase-tab');
    tabs.forEach(tab => {
      // A fül felirata a modul saját fázis-adataiból jön (a HTML-ben csak alapérték van)
      const def = m.phases && m.phases[tab.dataset.phase];
      if (def) {
        if (def.name)     tab.querySelector('.phase-name').textContent = def.name;
        if (def.subtitle) tab.querySelector('.phase-sub').textContent  = def.subtitle;
      }
      tab.addEventListener('click', () => {
        const phase = parseInt(tab.dataset.phase, 10);
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Speed drill timer leállítás váltáskor
        if (window._sdActiveTimer) {
          clearTimeout(window._sdActiveTimer);
          window._sdActiveTimer = null;
        }
        // Counter / Matrix lobby visszahozatala phase-váltáskor (state reset)
        counterSettings.inLobby = true;
        matrixState.inLobby = true;
        drillState.started = false;
        // Hero default-show fázis-váltáskor (a renderPhase / kör-indítás rejtheti újra)
        document.querySelector('.module-hero')?.classList.remove('hidden');
        renderPhase(m, phase);
      });
    });
  }

  // ── Phase dispatcher ─────────────────────────────
  function renderPhase(m, phaseNum) {
    const container = document.getElementById('phaseContent');
    const phase = m.phases[phaseNum];

    if (!phase.unlocked) {
      container.innerHTML = `
        <div class="phase-placeholder glass-panel">
          <div class="placeholder-glow-icon">🚧</div>
          <h3>${phase.name} — Hamarosan</h3>
          <p>${phase.comingSoon || 'Ez a fázis még nincs feltöltve tartalommal.'}</p>
        </div>
      `;
      return;
    }

    const type = phase.type || (phase.questions ? 'multiple-choice' : 'unknown');

    switch (type) {
      case 'interactive-demo':
        container.innerHTML = renderInteractiveDemo(m, phase);
        attachInteractiveDemoHandlers(m, phase);
        break;
      case 'matrix-selector':
        container.innerHTML = renderMatrixSelector(m, phase);
        attachMatrixSelectorHandlers(m, phase);
        break;
      case 'speed-drill':
        container.innerHTML = renderSpeedDrill(m, phase);
        attachSpeedDrillHandlers(m, phase);
        break;
      case 'multiple-choice':
        container.innerHTML = renderLegacyMC(m);
        attachMultipleChoiceHandlers();
        break;
      case 'counter-recognition':
      case 'counter-hybrid':
      case 'counter-mastery':
        container.innerHTML = renderCounterPhase(m, phase);
        attachCounterPhaseHandlers(m, phase);
        break;
      case 'flashcard':
        // V8: univerzális flashcard mód (Számláló Phase 1)
        renderModuleFlashcard(m, phase, container);
        break;
      default:
        container.innerHTML = `<div class="phase-placeholder glass-panel"><p>Ismeretlen fázis-típus.</p></div>`;
    }
  }

  // V8: Számláló-adapter — flashcard-okat épít a NIHONCORE_COUNTERS + NIHONCORE_COUNTER_ITEMS-ből
  function buildCounterFlashcards() {
    const cards = [];
    const counters = (typeof NIHONCORE_COUNTERS !== 'undefined') ? NIHONCORE_COUNTERS : {};
    const items    = (typeof NIHONCORE_COUNTER_ITEMS !== 'undefined') ? NIHONCORE_COUNTER_ITEMS : [];
    for (const item of items) {
      const counter = counters[item.primary];
      if (!counter) continue;
      // Front: nagy emoji + kicsi japán szöveg + még kisebb romaji.
      // A magyar jelentés ("alma") a hátlapra megy a counter-infóval.
      cards.push({
        id: 'cf_' + item.id,
        category: item.primary,
        front: {
          emoji:  item.emoji || '🔢',
          jp:     item.nameJp || '',
          romaji: item.id     // pl. "ringo"
        },
        back: {
          meaning: item.nameHu,    // pl. "alma"
          exampleJp:     `1${counter.jp} = ${counter.readings[1].kana}`,
          exampleRomaji: counter.readings[1].romaji,
          exampleHu:     `Számláló: ${counter.jp} (${counter.romaji}) — ${counter.nameHu}`,
          meta: [counter.nameHu, item.minLevel || ''].filter(Boolean)
        }
      });
    }
    return cards;
  }
  function buildCounterCategories() {
    const counters = (typeof NIHONCORE_COUNTERS !== 'undefined') ? NIHONCORE_COUNTERS : {};
    return Object.keys(counters).map(id => ({ id, label: `${counters[id].jp} ${counters[id].nameHu}` }));
  }

  function renderModuleFlashcard(m, phase, container) {
    if (!window.NihonCoreFlashcard) {
      container.innerHTML = '<div class="phase-placeholder glass-panel"><p>Flashcard motor nem elérhető.</p></div>';
      return;
    }
    // Modul-specifikus adapter — egyelőre csak a Számláló használja
    let cards = [], categories = [], storageKey = m.id;
    if (m.id === 'szamlalok') {
      cards      = buildCounterFlashcards();
      categories = buildCounterCategories();
    }
    container.innerHTML = '';
    window.NihonCoreFlashcard.mount(container, {
      cards, categories, storageKey,
      onSwipe: () => {}, onEnd: () => {}
    });
  }

  // ── Verb engine (állapotgép) ─────────────────────
  function verbEngine(state, config) {
    const { baseId, tense, polarity, question } = state;
    const baseDef   = config.bases[baseId];
    const suffixKey = `${tense}_${polarity}`;
    const suffixDef = config.suffixes[suffixKey];
    const qDef      = question ? config.questionSuffix : null;

    if (!baseDef || !suffixDef) return null;

    return {
      roman: baseDef.baseRoman + suffixDef.roman + (qDef ? qDef.roman : ''),
      jp:    baseDef.baseJp    + suffixDef.jp    + (qDef ? qDef.jp    : ''),
      parts: {
        stem:     { roman: baseDef.baseRoman, jp: baseDef.baseJp },
        suffix:   { roman: suffixDef.roman,   jp: suffixDef.jp   },
        question: qDef ? { roman: qDef.roman, jp: qDef.jp } : null
      }
    };
  }

  // ── PHASE 1 — Interaktív Demo ────────────────────
  function renderInteractiveDemo(m, phase) {
    const exp      = m.explanation;
    const cfg      = m.verbEngine;
    const baseDefs = cfg.bases;

    // V8: dinamikus base-picker — mind a 8 base, kategória-csoportosítva
    const categories = m.categories || [{ id: 'all', nameHu: 'Igék', emoji: '🔤', baseIds: Object.keys(baseDefs) }];
    let basePickerHtml = '';
    for (const cat of categories) {
      const cBases = (cat.baseIds || []).filter(id => baseDefs[id]);
      if (cBases.length === 0) continue;
      basePickerHtml += `<div class="base-cat-group">`;
      basePickerHtml += `<div class="base-cat-label"><span class="base-cat-emoji">${cat.emoji || ''}</span>${cat.nameHu || ''}</div>`;
      basePickerHtml += `<div class="base-picker">`;
      for (const baseId of cBases) {
        const bd = baseDefs[baseId];
        basePickerHtml += `
          <button class="base-btn ${demoState.baseId === baseId ? 'active' : ''}" data-base="${baseId}">
            <span class="base-icon">${bd.icon}</span>
            <span class="base-text">
              <span class="base-name">${bd.label}</span>
              <span class="base-sub">${bd.iconLabel || ''}</span>
            </span>
          </button>`;
      }
      basePickerHtml += `</div></div>`;
    }

    return `
      <div class="explanation glass-panel">
        <div class="exp-label">📖 Magyarázat</div>
        <p class="exp-hu">${exp.hu}</p>
        <div class="exp-divider"></div>
        <p class="exp-jp" lang="ja">${exp.jp}</p>
      </div>

      <div class="interactive-demo glass-panel-heavy">
        <div class="id-header">
          <div class="id-eyebrow">Interaktív Demo</div>
          <h3 class="id-title">Játssz a ragozással</h3>
          <p class="id-sub">Válassz egy igét — a kapcsolókkal valós időben átalakul.</p>
        </div>

        <div class="ctl-group">
          <label class="ctl-label">1. Válassz egy igét</label>
          ${basePickerHtml}
        </div>

        <div class="ctl-row">
          <div class="ctl-group">
            <label class="ctl-label">2. Idő</label>
            <div class="toggle-group" data-state="tense">
              <button class="tg-btn ${demoState.tense === 'Non-past' ? 'active' : ''}" data-value="Non-past">Most</button>
              <button class="tg-btn ${demoState.tense === 'Past' ? 'active' : ''}"     data-value="Past">Régen</button>
            </div>
          </div>
          <div class="ctl-group">
            <label class="ctl-label">3. Polaritás</label>
            <div class="toggle-group" data-state="polarity">
              <button class="tg-btn ${demoState.polarity === 'Affirmative' ? 'active' : ''}" data-value="Affirmative">Állítás</button>
              <button class="tg-btn ${demoState.polarity === 'Negative' ? 'active' : ''}"    data-value="Negative">Tagadás</button>
            </div>
          </div>
          <div class="ctl-group">
            <label class="ctl-label">4. Kérdő alak?</label>
            <label class="ni-switch">
              <input type="checkbox" id="demoQuestion" ${demoState.question ? 'checked' : ''}>
              <span class="ni-slider"></span>
            </label>
          </div>
        </div>

        <div class="verb-display">
          <div class="vd-eyebrow">Az ige most:</div>
          <div class="verb-form-jp" id="verbFormJp"></div>
          <div class="verb-form-roman" id="verbFormRoman"></div>
        </div>

        <div class="example-sentence">
          <div class="ex-eyebrow">Példa mondat:</div>
          <div class="ex-text" id="exampleText"></div>
          <div class="ex-context" id="exampleContext"></div>
        </div>
      </div>
    `;
  }

  function attachInteractiveDemoHandlers(m, phase) {
    document.querySelectorAll('.base-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.base-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        demoState.baseId = btn.dataset.base;
        updateDemoOutput(m, phase);
      });
    });

    document.querySelectorAll('.toggle-group').forEach(group => {
      const stateKey = group.dataset.state;
      group.querySelectorAll('.tg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.tg-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          demoState[stateKey] = btn.dataset.value;
          updateDemoOutput(m, phase);
        });
      });
    });

    const qSwitch = document.getElementById('demoQuestion');
    qSwitch.addEventListener('change', () => {
      demoState.question = qSwitch.checked;
      updateDemoOutput(m, phase);
    });

    updateDemoOutput(m, phase);
  }

  function updateDemoOutput(m, phase) {
    const cfg = m.verbEngine;
    const out = verbEngine(demoState, cfg);
    if (!out) return;

    const jpEl    = document.getElementById('verbFormJp');
    const romanEl = document.getElementById('verbFormRoman');
    jpEl.innerHTML = `<span class="vf-stem">${out.parts.stem.jp}</span><span class="vf-suffix pulse">${out.parts.suffix.jp}</span>${out.parts.question ? `<span class="vf-question">${out.parts.question.jp}</span>` : ''}`;
    romanEl.innerHTML = `<span class="vfr-stem">${out.parts.stem.roman}</span><span class="vfr-suffix pulse">${out.parts.suffix.roman}</span>${out.parts.question ? `<span class="vfr-question">${out.parts.question.roman}</span>` : ''}`;

    const ctx   = phase.sentenceContexts[demoState.baseId];
    const punct = demoState.question ? '？' : '。';
    document.getElementById('exampleText').innerHTML = `${ctx.templateBeforeBlank}<span class="ex-verb-jp">${out.jp}</span>${punct}`;
    document.getElementById('exampleContext').textContent = ctx.contextHu;
  }

  // ── PHASE 2 — Matrix Selector ────────────────────
  // V5 P2 — kategória-tudatos base-szelekció (csak ha m.categories megvan).
  // Visszaadja az ENGEDÉLYEZETT base-id-k listáját (a verbEngine.bases kulcsai).
  function getEnabledBaseIds(m) {
    if (!m || !m.verbEngine || !m.verbEngine.bases) return [];
    if (!Array.isArray(m.categories) || m.categories.length === 0) {
      return Object.keys(m.verbEngine.bases);
    }
    const ids = [];
    m.categories.forEach(c => {
      if (c.enabled && Array.isArray(c.baseIds)) {
        c.baseIds.forEach(b => { if (m.verbEngine.bases[b] && ids.indexOf(b) < 0) ids.push(b); });
      }
    });
    return ids.length ? ids : Object.keys(m.verbEngine.bases);
  }

  // Inicializálja / frissíti a matrixState.filters.base-t az aktív kategóriákhoz
  // illesztve. Ha új base-id került be (kategória bekapcsolásával), default ON.
  function syncMatrixBaseFilters(m) {
    const enabledIds = getEnabledBaseIds(m);
    const cur = matrixState.filters.base || {};
    const next = {};
    enabledIds.forEach(id => { next[id] = (cur[id] !== false); });
    matrixState.filters.base = next;
  }

  function renderMatrixSelector(m, phase) {
    matrixState.inLobby   = true;
    matrixState.taskIdx   = 0;
    matrixState.results   = [];
    matrixState.taskQueue = [];
    syncMatrixBaseFilters(m);
    return renderMatrixLobby(m, phase);
  }

  function renderMatrixLobby(m, phase) {
    const presets = [1, 5, 10, 16];
    const presetBtns = presets.map(n => `
      <button class="ml-count-btn ${matrixState.selectedTaskCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    // V5 P2 — kategória-section (csak ha m.categories megvan)
    let categorySectionHtml = '';
    if (Array.isArray(m.categories) && m.categories.length > 0) {
      const catChips = m.categories.map(c => {
        const cls = c.enabled ? 'ml-cat-btn' + (c._uiOn !== false ? ' active' : '') : 'ml-cat-btn ml-cat-btn-locked';
        const stubBadge = c.enabled ? '' : '<span class="ml-fb-lock">🔒</span>';
        return `<button class="${cls}" data-vbcat="${c.id}" ${c.enabled ? '' : 'disabled'} title="${c.stubNote || c.hint || ''}" type="button">
          <span class="ml-fb-emoji">${c.emoji || ''}</span>
          <span class="ml-fb-text">${c.nameHu}</span>
          ${stubBadge}
        </button>`;
      }).join('');
      const lockedCount = m.categories.filter(c => !c.enabled).length;
      const lockedNote = lockedCount > 0
        ? `<p class="ml-cat-note">🔒 <strong>${lockedCount}</strong> kategória még nincs feltöltve — a végső content-load fázisra vár (a motor készen áll rá).</p>`
        : '';
      categorySectionHtml = `
        <div class="lobby-section">
          <div class="lobby-section-label">Kategóriák</div>
          <div class="ml-filter-row ml-cat-row"><div class="ml-filter-buttons">${catChips}</div></div>
          ${lockedNote}
        </div>
      `;
    }

    // V5 P2 — dinamikus base-szűrő (kategória-tudatos)
    const baseOpts = getEnabledBaseIds(m).map(bid => {
      const bdef = m.verbEngine.bases[bid] || {};
      return { val: bid, label: `${bdef.icon || ''} ${bdef.label || bid}` };
    });

    return `
      <div class="ms-lobby glass-panel-heavy">
        <div class="lobby-header">
          <div class="lobby-eyebrow">${phase.name} · Beállítások</div>
          <h3 class="lobby-title">Állítsd be a kört</h3>
          <p class="lobby-sub">Válaszd ki hány kártyát gyakorolsz, és mely típusokat. A kör elindítása után minden taskon végig kell menned a megszokott módon.</p>
        </div>
        <div class="lobby-section">
          <div class="lobby-section-label">Kártyák száma</div>
          <div class="ml-count-row">
            <div class="ml-count-presets">${presetBtns}</div>
            <div class="ml-count-custom">
              <label class="ml-count-custom-label" for="msCustomCount">vagy saját szám:</label>
              <input type="number" id="msCustomCount" min="1" max="100" placeholder="—" />
            </div>
          </div>
        </div>
        ${categorySectionHtml}
        <div class="lobby-section">
          <div class="lobby-section-label">Típus-szűrők (kapcsold ki/be — több is választható)</div>
          ${renderFilterRow('Alany',     'base',     baseOpts)}
          ${renderFilterRow('Idő',       'tense',    [
            { val: 'Non-past', label: 'Most (jelen)' },
            { val: 'Past',     label: 'Régen (múlt)' }
          ])}
          ${renderFilterRow('Polaritás', 'polarity', [
            { val: 'Affirmative', label: 'Állító' },
            { val: 'Negative',    label: 'Tagadó' }
          ])}
          ${renderFilterRow('Forma',     'question', [
            { val: 'false', label: 'Kijelentő' },
            { val: 'true',  label: 'Kérdő' }
          ])}
        </div>
        <div class="lobby-stats">
          <span class="lobby-combos">Lehetséges kombinációk: <strong id="lobbyComboCount">${countFilteredCombos()}</strong> / ${baseOpts.length * 8}</span>
        </div>
        <button class="btn btn-primary glow-effect ml-start" id="msStart">Indítás — ${matrixState.selectedTaskCount} kártya</button>
      </div>
    `;
  }

  function renderFilterRow(label, dim, options) {
    const buttons = options.map(opt => {
      const isActive = matrixState.filters[dim][opt.val] === true;
      return `<button class="ml-fb ${isActive ? 'active' : ''}" data-dim="${dim}" data-val="${opt.val}">${opt.label}</button>`;
    }).join('');
    return `
      <div class="ml-filter-row">
        <span class="ml-filter-label">${label}</span>
        <div class="ml-filter-buttons">${buttons}</div>
      </div>
    `;
  }

  function renderMatrixTask(m, phase) {
    const task   = matrixState.taskQueue[matrixState.taskIdx];
    const cfg    = m.verbEngine;
    const total  = matrixState.taskQueue.length;

    matrixState.baseId    = null;
    matrixState.tense     = null;
    matrixState.polarity  = null;
    matrixState.question  = false;
    matrixState.submitted = false;

    // V23 FIX: dinamikus base-picker — az AKTÍV kategóriák összes base-e,
    // kategória-csoportosítva. (Korábban hard-kódolt arimasu/imasu volt, ezért
    // a fogyasztás/mozgás taskoknál nem lehetett helyes alanyt választani.)
    const baseDefs   = cfg.bases;
    const categories = m.categories || [];
    let basePickerHtml = '';
    for (const cat of categories) {
      const cBases = (cat.baseIds || []).filter(id => baseDefs[id] && matrixState.filters.base[id]);
      if (cBases.length === 0) continue;
      basePickerHtml += `<div class="base-cat-group">`;
      basePickerHtml += `<div class="base-cat-label"><span class="base-cat-emoji">${cat.emoji || ''}</span>${cat.nameHu || ''}</div>`;
      basePickerHtml += `<div class="base-picker">`;
      for (const baseId of cBases) {
        const bd = baseDefs[baseId];
        basePickerHtml += `
          <button class="base-btn" data-base="${baseId}">
            <span class="base-icon">${bd.icon}</span>
            <span class="base-text">
              <span class="base-name">${bd.label}</span>
              <span class="base-sub">${bd.iconLabel || ''}</span>
            </span>
          </button>`;
      }
      basePickerHtml += `</div></div>`;
    }
    // Fallback: ha nincs kategória-meta, mutassuk az összes aktív base-t simán
    if (!basePickerHtml) {
      const activeIds = Object.keys(baseDefs).filter(id => matrixState.filters.base[id]);
      basePickerHtml = '<div class="base-picker">' + activeIds.map(id => {
        const bd = baseDefs[id];
        return `<button class="base-btn" data-base="${id}"><span class="base-icon">${bd.icon}</span><span class="base-text"><span class="base-name">${bd.label}</span><span class="base-sub">${bd.iconLabel || ''}</span></span></button>`;
      }).join('') + '</div>';
    }

    const cells = ['Affirmative', 'Negative'].map(pol =>
      ['Non-past', 'Past'].map(t => {
        const sd = cfg.suffixes[`${t}_${pol}`];
        return `
          <button class="matrix-cell" data-tense="${t}" data-polarity="${pol}">
            <span class="cell-suffix-jp">${sd.jp}</span>
            <span class="cell-suffix-roman">${sd.roman}</span>
          </button>
        `;
      }).join('')
    );

    return `
      <div class="ms-progress">
        <span class="ms-counter">Feladat ${matrixState.taskIdx + 1} / ${total}</span>
        <div class="ms-progressbar">
          <div class="ms-progressfill" style="width: ${(matrixState.taskIdx / total) * 100}%"></div>
        </div>
        <button class="round-exit ms-exit-btn" data-ms-exit="1" type="button" title="Kilépés a körből">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Kilépés</span>
        </button>
      </div>
      <div class="matrix-task glass-panel">
        <div class="task-header">
          <h3 class="task-prompt">${task.promptHu}</h3>
          <p class="task-context">${task.context}</p>
        </div>
        <div class="ms-section">
          <div class="ms-section-label">1. Melyik ige? (válaszd ki az alanyt)</div>
          ${basePickerHtml}
        </div>
        <div class="ms-section">
          <div class="ms-section-label">2. Idő × Polaritás (mátrix)</div>
          <div class="vf-matrix">
            <div class="m-corner"></div>
            <div class="m-col-label">Most</div>
            <div class="m-col-label">Régen</div>
            <div class="m-row-label">Állítás</div>
            ${cells[0]}
            <div class="m-row-label">Tagadás</div>
            ${cells[1]}
          </div>
        </div>
        <div class="ms-section ms-section-row">
          <div class="ms-section-label">3. Kérdő alak?</div>
          <label class="ni-switch">
            <input type="checkbox" id="msQuestion">
            <span class="ni-slider"></span>
          </label>
        </div>
        <div class="ms-preview" id="msPreview">
          <span class="ms-preview-label">Az alak:</span>
          <span class="ms-preview-form" id="msPreviewForm">— válassz mindhárom dimenzióból —</span>
        </div>
        <button class="btn btn-primary glow-effect ms-submit" id="msSubmit" disabled>Beküldés</button>
        <div class="ms-feedback hidden" id="msFeedback"></div>
      </div>
    `;
  }

  function attachMatrixSelectorHandlers(m, phase) {
    if (matrixState.inLobby) attachMatrixLobbyHandlers(m, phase);
    else                     attachMatrixTaskHandlers(m, phase);
  }

  function attachMatrixLobbyHandlers(m, phase) {
    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const n = parseInt(btn.dataset.count, 10);
        matrixState.selectedTaskCount = n;
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const customInput = document.getElementById('msCustomCount');
        if (customInput) customInput.value = '';
        updateLobbyStats();
      });
    });

    const customInput = document.getElementById('msCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countFilteredCombos();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          matrixState.selectedTaskCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        }
        updateLobbyStats();
      });
    }

    document.querySelectorAll('.ml-fb').forEach(btn => {
      btn.addEventListener('click', () => {
        const dim = btn.dataset.dim;
        const val = btn.dataset.val;
        const isActive = btn.classList.contains('active');
        if (isActive) {
          const stillActive = Array.from(document.querySelectorAll(`.ml-fb[data-dim="${dim}"]`))
            .filter(b => b !== btn && b.classList.contains('active')).length;
          if (stillActive === 0) {
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);
            return;
          }
          btn.classList.remove('active');
          matrixState.filters[dim][val] = false;
        } else {
          btn.classList.add('active');
          matrixState.filters[dim][val] = true;
        }
        updateLobbyStats();
      });
    });

    // V5 P2 — kategória-toggle handler (csak az enabled kategóriákra).
    // Az engedélyezett kategóriák ki/be kapcsolásával a base-filter is
    // szinkronba kerül (a locked kategóriákat NEM érinti).
    document.querySelectorAll('.ml-cat-btn:not(.ml-cat-btn-locked)').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.vbcat;
        if (!Array.isArray(m.categories)) return;
        const cat = m.categories.find(c => c.id === catId);
        if (!cat || !cat.enabled) return;
        const otherEnabledActive = m.categories.some(c =>
          c.id !== catId && c.enabled && c._uiOn !== false
        );
        const isOn = btn.classList.contains('active');
        if (isOn && !otherEnabledActive) {
          btn.classList.add('shake');
          setTimeout(() => btn.classList.remove('shake'), 400);
          return;
        }
        cat._uiOn = !isOn;
        btn.classList.toggle('active', cat._uiOn);
        // sync base filters: a kategóriához tartozó base-ek ki/be
        (cat.baseIds || []).forEach(bid => {
          if (matrixState.filters.base[bid] !== undefined) {
            matrixState.filters.base[bid] = cat._uiOn;
          }
          const baseBtn = document.querySelector(`.ml-fb[data-dim="base"][data-val="${bid}"]`);
          if (baseBtn) baseBtn.classList.toggle('active', cat._uiOn);
        });
        updateLobbyStats();
      });
    });

    document.getElementById('msStart').addEventListener('click', () => startMatrixRound(m, phase));
  }

  function updateLobbyStats() {
    const combos = countFilteredCombos();
    const comboEl = document.getElementById('lobbyComboCount');
    if (comboEl) comboEl.textContent = combos;
    const startBtn = document.getElementById('msStart');
    if (!startBtn) return;
    startBtn.textContent = `Indítás — ${matrixState.selectedTaskCount} kártya`;
    startBtn.disabled = combos === 0 || matrixState.selectedTaskCount < 1;
  }

  function buildMatrixTaskPool(filters) {
    const pool = [];
    // V5 P2: a base-list a filters.base kulcsaiból jön (dinamikus, kategória-
    // tudatos), nem hard-coded ['arimasu', 'imasu'].
    const baseIds = Object.keys(filters.base || {});
    for (const baseId of baseIds) {
      if (!filters.base[baseId]) continue;
      for (const tense of ['Non-past', 'Past']) {
        if (!filters.tense[tense]) continue;
        for (const polarity of ['Affirmative', 'Negative']) {
          if (!filters.polarity[polarity]) continue;
          for (const q of [false, true]) {
            if (!filters.question[String(q)]) continue;
            pool.push({ baseId, tense, polarity, question: q });
          }
        }
      }
    }
    return pool;
  }

  function countFilteredCombos() {
    return buildMatrixTaskPool(matrixState.filters).length;
  }

  function generateMatrixTasks(filters, count, m) {
    const pool = buildMatrixTaskPool(filters);
    if (pool.length === 0) return [];
    const tasks = [];
    for (let i = 0; i < count; i++) {
      const expected = pool[Math.floor(Math.random() * pool.length)];
      const pool2    = SUBJECT_POOLS_MATRIX[expected.baseId] || ['valami'];
      const subject  = randomFromList(pool2);
      const baseDef  = (m && m.verbEngine && m.verbEngine.bases) ? m.verbEngine.bases[expected.baseId] : null;
      tasks.push({
        promptHu: composeMatrixPrompt(expected, subject, baseDef),
        context:  composeMatrixContext(expected, baseDef),
        expected
      });
    }
    return tasks;
  }

  function randomFromList(list) {
    if (!list || list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
  }

  // V8: kategória-tudatos prompt-építés (existence / consumption / movement)
  function composeMatrixPrompt(state, subject, baseDef) {
    const punct = state.question ? '?' : '.';
    const verbs = getCategoryVerbForms(state.baseId);
    // index a 4-elemű tömbben
    const idx = state.tense === 'Non-past'
      ? (state.polarity === 'Affirmative' ? 0 : 1)
      : (state.polarity === 'Affirmative' ? 2 : 3);
    const verb = verbs[idx] || '';
    const cat  = baseDef ? baseDef.categoryId : 'existence';

    if (cat === 'existence') {
      // "Van ott egy X" / "Nincs ott egy X" stb.
      return `${verb} ${subject}${punct}`;
    }
    if (cat === 'consumption') {
      // "{Subject}-t eszek/iszom/veszek" — egyszerűsítve magyarban:
      return `${capitalize(subject)} — ${verb}${punct}`;
    }
    if (cat === 'movement') {
      // "{Subject}-ba megyek" / "{Subject} jön" / "{Subject}-ba hazatérek"
      return `${capitalize(subject)} → ${verb}${punct}`;
    }
    return `${capitalize(subject)} — ${verb}${punct}`;
  }

  function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function composeMatrixContext(state, baseDef) {
    const cat = baseDef ? baseDef.categoryId : null;
    const parts = [];
    // kategória-tudatos első cimke
    if (cat === 'existence')   parts.push(state.baseId === 'arimasu' ? 'élettelen' : 'élő');
    else if (cat === 'consumption') parts.push('fogyasztás');
    else if (cat === 'movement')    parts.push('mozgás');
    else                            parts.push(state.baseId);

    parts.push(state.tense    === 'Past'  ? 'múlt'      : 'jelen');
    parts.push(state.polarity === 'Affirmative' ? 'állító' : 'tagadó');
    parts.push(state.question ? 'kérdő' : 'kijelentő');
    return parts.join(' · ');
  }

  function startMatrixRound(m, phase) {
    matrixState.inLobby = false;
    matrixState.taskIdx = 0;
    matrixState.results = [];
    matrixState.roundStartTs = Date.now();    // V5 P2 — stats
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'arimasu-imasu', mode:'matrix-selector', results: matrixState.results, score: matrixState.results.filter(function(r){return r.allCorrect;}).length*10, startTs: matrixState.roundStartTs }; });
    matrixState.taskQueue = generateMatrixTasks(matrixState.filters, matrixState.selectedTaskCount, m);
    if (matrixState.taskQueue.length === 0) return;

    document.querySelector('.module-hero')?.classList.add('hidden');

    const container = document.getElementById('phaseContent');
    container.innerHTML = renderMatrixTask(m, phase);
    attachMatrixTaskHandlers(m, phase);
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function attachMatrixTaskHandlers(m, phase) {
    // Exit gomb
    const exit = document.querySelector('[data-ms-exit]');
    if (exit) {
      exit.addEventListener('click', () => {
        if (matrixState.inLobby) return;
        if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
          'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) return;
        document.querySelector('.module-hero')?.classList.remove('hidden');
        const container = document.getElementById('phaseContent');
        container.innerHTML = renderMatrixSelector(m, phase);
        attachMatrixSelectorHandlers(m, phase);
      });
    }
    document.querySelectorAll('.matrix-task .base-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (matrixState.submitted) return;
        document.querySelectorAll('.matrix-task .base-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        matrixState.baseId = btn.dataset.base;
        updateMatrixPreview(m);
      });
    });

    document.querySelectorAll('.matrix-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        if (matrixState.submitted) return;
        document.querySelectorAll('.matrix-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        matrixState.tense    = cell.dataset.tense;
        matrixState.polarity = cell.dataset.polarity;
        updateMatrixPreview(m);
      });
    });

    const qSwitch = document.getElementById('msQuestion');
    qSwitch.addEventListener('change', () => {
      if (matrixState.submitted) return;
      matrixState.question = qSwitch.checked;
      updateMatrixPreview(m);
    });

    document.getElementById('msSubmit').addEventListener('click', () => {
      if (matrixState.submitted) return;
      submitMatrix(m, phase);
    });
  }

  function updateMatrixPreview(m) {
    const previewEl = document.getElementById('msPreviewForm');
    const submitBtn = document.getElementById('msSubmit');

    if (!matrixState.baseId || !matrixState.tense || !matrixState.polarity) {
      previewEl.textContent = '— válassz mindhárom dimenzióból —';
      submitBtn.disabled = true;
      return;
    }

    const out = verbEngine({
      baseId:   matrixState.baseId,
      tense:    matrixState.tense,
      polarity: matrixState.polarity,
      question: matrixState.question
    }, m.verbEngine);

    if (!out) return;
    previewEl.innerHTML = `<span class="ms-pf-jp">${out.jp}</span> <span class="ms-pf-roman">${out.roman}</span>`;
    submitBtn.disabled = false;
  }

  function submitMatrix(m, phase) {
    const task = matrixState.taskQueue[matrixState.taskIdx];
    const exp  = task.expected;

    const perField = {
      base:     matrixState.baseId   === exp.baseId,
      tense:    matrixState.tense    === exp.tense,
      polarity: matrixState.polarity === exp.polarity,
      question: matrixState.question === exp.question
    };
    const allCorrect = Object.values(perField).every(Boolean);

    matrixState.submitted = true;
    matrixState.results.push({
      taskIdx: matrixState.taskIdx,
      allCorrect, perField,
      attempt:  { baseId: matrixState.baseId, tense: matrixState.tense, polarity: matrixState.polarity, question: matrixState.question },
      expected: exp
    });

    const cfg = m.verbEngine;
    const expectedOut = verbEngine({ baseId: exp.baseId, tense: exp.tense, polarity: exp.polarity, question: exp.question }, cfg);

    const fieldRow = (label, ok, expected, attempt) => `
      <div class="fb-field ${ok ? 'fb-ok' : 'fb-bad'}">
        <span class="fb-mark">${ok ? '✓' : '✗'}</span>
        <span class="fb-field-label">${label}</span>
        <span class="fb-field-detail">${ok ? expected : `te: <em>${attempt}</em>, helyes: <strong>${expected}</strong>`}</span>
      </div>
    `;

    const tenseLabels    = cfg.tenseLabels;
    const polarityLabels = cfg.polarityLabels;
    const baseLabel = id => cfg.bases[id]?.label || '—';
    const qLabel    = q  => q ? 'Kérdő' : 'Kijelentő';

    const fbEl = document.getElementById('msFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.add(allCorrect ? 'ms-fb-correct' : 'ms-fb-wrong');
    fbEl.innerHTML = `
      <div class="ms-fb-header">
        <span class="ms-fb-mark">${allCorrect ? '🎉' : '⚠️'}</span>
        <span class="ms-fb-title">${allCorrect ? 'Tökéletes!' : 'Volt hiba — itt vannak a részletek:'}</span>
      </div>
      <div class="ms-fb-fields">
        ${fieldRow('Alany',     perField.base,     baseLabel(exp.baseId), baseLabel(matrixState.baseId))}
        ${fieldRow('Idő',       perField.tense,    tenseLabels[exp.tense], tenseLabels[matrixState.tense])}
        ${fieldRow('Polaritás', perField.polarity, polarityLabels[exp.polarity], polarityLabels[matrixState.polarity])}
        ${fieldRow('Kérdő?',    perField.question, qLabel(exp.question), qLabel(matrixState.question))}
      </div>
      <div class="ms-fb-correct-form">
        Helyes alak: <strong>${expectedOut.jp}</strong> <span class="fb-roman">(${expectedOut.roman})</span>
      </div>
      <button class="btn btn-primary glow-effect ms-next" id="msNext">
        ${matrixState.taskIdx + 1 < matrixState.taskQueue.length ? 'Következő feladat →' : 'Eredmények'}
      </button>
    `;

    document.getElementById('msNext').addEventListener('click', () => {
      if (matrixState.taskIdx + 1 < matrixState.taskQueue.length) {
        matrixState.taskIdx++;
        const container = document.getElementById('phaseContent');
        container.innerHTML = renderMatrixTask(m, phase);
        attachMatrixTaskHandlers(m, phase);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        showMatrixSummary(m, phase);
      }
    });

    document.getElementById('msSubmit').disabled = true;
    document.getElementById('msSubmit').textContent = 'Beküldve';
  }

  function showMatrixSummary(m, phase) {
    const container = document.getElementById('phaseContent');
    const correct = matrixState.results.filter(r => r.allCorrect).length;
    const total   = matrixState.results.length;
    const pct     = Math.round((correct / total) * 100);

    // V5 P2 — session-log a stats-be
    NihonCoreStats.recordSession({
      module: 'arimasu-imasu',
      mode: 'matrix-selector',
      results: matrixState.results,
      score: correct * 10,
      startTs: matrixState.roundStartTs || 0
    });

    container.innerHTML = `
      <div class="ms-summary glass-panel-heavy">
        <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 60 ? '🎯' : '🌱'}</div>
        <h3>${phase.name} — kész</h3>
        <div class="summary-score">${correct} / ${total} <span class="summary-pct">(${pct}%)</span></div>
        <p class="summary-blurb">
          ${pct === 100 ? 'Minden helyes! Jöhet a Gyorskör. 💪'
            : pct >= 60 ? 'Szép munka. Nézd át a hibás feladatokat és próbálj újra!'
                        : 'Még gyakorlás kell — térj vissza a Megértés fázisra átismételni.'}
        </p>
        <button class="btn btn-primary glow-effect" id="msReset">Új kör</button>
      </div>
    `;
    document.getElementById('msReset').addEventListener('click', () => {
      document.querySelector('.module-hero')?.classList.remove('hidden');
      container.innerHTML = renderMatrixSelector(m, phase);
      attachMatrixSelectorHandlers(m, phase);
    });
  }

  // ── PHASE 3 — Speed Drill ────────────────────────
  function renderSpeedDrill(m, phase) {
    // Indító képernyő: a fül megnyitása még nem indítja el az órát
    if (!drillState.started) {
      return `
        <div class="ms-lobby glass-panel-heavy">
          <div class="lobby-header">
            <div class="lobby-eyebrow">${phase.name}</div>
            <h3 class="lobby-title">Gyorskör</h3>
            <p class="sd-intro-text">${phase.cards.length} kártya, kártyánként ${Math.round(phase.timeLimit / 1000)} másodperc.
              Válaszd ki a helyes alakot, mielőtt lejár az idő.</p>
          </div>
          <button class="btn btn-primary ml-start" id="sdStart" type="button">Indítás — ${phase.cards.length} kártya</button>
        </div>
      `;
    }
    drillState.cardIdx = 0;
    drillState.score = 0;
    drillState.streak = 0;
    drillState.bestStreak = 0;
    drillState.results = [];
    drillState.roundStartTs = Date.now();   // V5 P2 — stats
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'arimasu-imasu', mode:'speed-drill', results: drillState.results, score: drillState.score, startTs: drillState.roundStartTs }; });

    document.querySelector('.module-hero')?.classList.add('hidden');

    return `
      <div class="speed-drill">
        <div class="sd-stats">
          <div class="sd-stat"><span class="sd-stat-label">Pont</span><span class="sd-stat-value" id="sdScore">0</span></div>
          <div class="sd-stat"><span class="sd-stat-label">Sorozat</span><span class="sd-stat-value" id="sdStreak">0 🔥</span></div>
          <button class="round-exit sd-exit-btn" id="sdExit" type="button" title="Kilépés a körből">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <span>Kilépés</span>
          </button>
        </div>
        <div class="round-progress">
          <span class="round-progress-text" id="sdCardCount">Kártya 1 / ${phase.cards.length}</span>
          <div class="round-progress-bar"><div class="round-progress-fill" id="sdProgressFill" style="width: 0%"></div></div>
        </div>
        <div class="sd-card glass-panel-heavy" id="sdCard"></div>
        <div class="sd-options" id="sdOptions"></div>
        <div class="sd-advance hidden" id="sdAdvance"></div>
        <div class="sd-summary hidden" id="sdSummary"></div>
      </div>
    `;
  }

  function attachSpeedDrillHandlers(m, phase) {
    const startBtn = document.getElementById('sdStart');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        drillState.started = true;
        const container = document.getElementById('phaseContent');
        container.innerHTML = renderSpeedDrill(m, phase);
        attachSpeedDrillHandlers(m, phase);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    renderDrillCard(m, phase);
    // Exit gomb
    const exit = document.getElementById('sdExit');
    if (exit) {
      exit.addEventListener('click', () => {
        if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
          'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) return;
        if (window._sdActiveTimer) { clearTimeout(window._sdActiveTimer); window._sdActiveTimer = null; }
        document.querySelector('.module-hero')?.classList.remove('hidden');
        // Vissza Phase 1-re (Megértés tab) — natural reset point
        document.querySelector('.phase-tab[data-phase="1"]')?.click();
      });
    }
  }

  function renderDrillCard(m, phase) {
    const card    = phase.cards[drillState.cardIdx];
    const cfg     = m.verbEngine;
    const baseDef = cfg.bases[card.iconBase];
    const options = generateDrillOptions(card, cfg);

    const cardEl = document.getElementById('sdCard');
    cardEl.innerHTML = `
      <div class="sd-icon">${card.iconChar}</div>
      <div class="sd-icon-label">${baseDef.iconLabel}</div>
      <div class="sd-tag">${card.tagHu}</div>
      <div class="sd-timer-bar"><div class="sd-timer-fill" id="sdTimerFill"></div></div>
    `;

    const optsEl = document.getElementById('sdOptions');
    optsEl.innerHTML = options.map((o, i) => `
      <button class="sd-option" data-correct="${o.isCorrect ? '1' : '0'}" data-idx="${i}">
        <span class="sd-opt-jp">${o.jp}</span>
        <span class="sd-opt-roman">${o.roman}</span>
      </button>
    `).join('');

    document.querySelectorAll('.sd-option').forEach(btn => {
      btn.addEventListener('click', () => handleDrillAnswer(m, phase, btn));
    });

    const advEl = document.getElementById('sdAdvance');
    advEl.classList.add('hidden');
    advEl.innerHTML = '';

    drillState.startTime = Date.now();
    drillState.isAnswering = true;
    startDrillTimer(m, phase);
  }

  function startDrillTimer(m, phase) {
    const fillEl = document.getElementById('sdTimerFill');
    const limit  = phase.timeLimit;
    fillEl.style.transition = 'none';
    fillEl.style.width = '100%';
    fillEl.offsetHeight; // reflow
    fillEl.style.transition = `width ${limit}ms linear`;
    fillEl.style.width = '0%';

    if (window._sdActiveTimer) clearTimeout(window._sdActiveTimer);
    window._sdActiveTimer = setTimeout(() => {
      if (drillState.isAnswering) handleDrillTimeout(m, phase);
    }, limit);
  }

  function handleDrillAnswer(m, phase, btn) {
    if (!drillState.isAnswering) return;
    drillState.isAnswering = false;
    if (window._sdActiveTimer) clearTimeout(window._sdActiveTimer);

    const latency   = Date.now() - drillState.startTime;
    const isCorrect = btn.dataset.correct === '1';

    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      const cb = document.querySelector('.sd-option[data-correct="1"]');
      if (cb) cb.classList.add('reveal-correct');
    }
    document.querySelectorAll('.sd-option').forEach(b => b.disabled = true);

    let points = 0;
    if (isCorrect) {
      points = 10;
      if (latency < 1500) points += 5;
      drillState.streak++;
      drillState.bestStreak = Math.max(drillState.bestStreak, drillState.streak);
    } else {
      drillState.streak = 0;
    }
    drillState.score += points;

    drillState.results.push({ cardIdx: drillState.cardIdx, correct: isCorrect, latencyMs: latency, timedOut: false });
    updateDrillStats(phase);
    showAdvanceButton(m, phase, isCorrect ? 'correct' : 'wrong');
  }

  function handleDrillTimeout(m, phase) {
    if (!drillState.isAnswering) return;
    drillState.isAnswering = false;

    const cb = document.querySelector('.sd-option[data-correct="1"]');
    if (cb) cb.classList.add('reveal-correct');
    document.querySelectorAll('.sd-option').forEach(b => b.disabled = true);

    drillState.streak = 0;
    drillState.results.push({ cardIdx: drillState.cardIdx, correct: false, latencyMs: phase.timeLimit, timedOut: true });
    updateDrillStats(phase);
    showAdvanceButton(m, phase, 'timeout');
  }

  function showAdvanceButton(m, phase, reason) {
    const advEl  = document.getElementById('sdAdvance');
    const isLast = drillState.cardIdx + 1 >= phase.cards.length;

    let msg = '';
    if (reason === 'correct') msg = '<div class="sd-advance-msg sd-msg-correct">✓ Helyes válasz</div>';
    else if (reason === 'wrong')   msg = '<div class="sd-advance-msg sd-msg-wrong">✗ Helytelen — nézd meg a helyes alakot</div>';
    else if (reason === 'timeout') msg = '<div class="sd-advance-msg sd-msg-timeout">⏱ Lejárt az idő</div>';

    advEl.innerHTML = `
      ${msg}
      <button class="btn btn-primary glow-effect sd-next-btn" id="sdNextBtn">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    advEl.classList.remove('hidden');
    document.getElementById('sdNextBtn').addEventListener('click', () => advanceDrill(m, phase));
  }

  function advanceDrill(m, phase) {
    drillState.cardIdx++;
    if (drillState.cardIdx >= phase.cards.length) showDrillSummary(m, phase);
    else                                          renderDrillCard(m, phase);
  }

  function updateDrillStats(phase) {
    document.getElementById('sdScore').textContent  = drillState.score;
    document.getElementById('sdStreak').textContent = `${drillState.streak} 🔥`;
    const total = phase.cards.length;
    const cur = Math.min(drillState.cardIdx, total - 1);
    document.getElementById('sdCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('sdProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (drillState.cardIdx / total) * 100 : 0}%`;
  }

  function showDrillSummary(m, phase) {
    const correct = drillState.results.filter(r => r.correct).length;
    const total   = drillState.results.length;
    const avgMs   = Math.round(drillState.results.reduce((s, r) => s + r.latencyMs, 0) / total);
    const avgSec  = (avgMs / 1000).toFixed(2);
    const pct     = Math.round((correct / total) * 100);

    // V5 P2 — session-log a stats-be
    NihonCoreStats.recordSession({
      module: 'arimasu-imasu',
      mode: 'speed-drill',
      results: drillState.results,
      score: drillState.score,
      startTs: drillState.roundStartTs || 0
    });

    document.getElementById('sdCard').classList.add('hidden');
    document.getElementById('sdOptions').classList.add('hidden');
    const summaryEl = document.getElementById('sdSummary');
    summaryEl.classList.remove('hidden');
    summaryEl.classList.add('glass-panel-heavy');
    summaryEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Gyorskör — kész</h3>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pontszám</span><span class="sf-value">${drillState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Helyes</span><span class="sf-value">${correct}/${total} <small>(${pct}%)</small></span></div>
        <div class="sd-final-stat"><span class="sf-label">Átlag idő</span><span class="sf-value">${avgSec}s</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="sdRestart">Még egyszer</button>
    `;
    document.getElementById('sdRestart').addEventListener('click', () => {
      const container = document.getElementById('phaseContent');
      container.innerHTML = renderSpeedDrill(m, phase);
      attachSpeedDrillHandlers(m, phase);
    });
  }

  function generateDrillOptions(card, cfg) {
    const correctOut = verbEngine({
      baseId: card.iconBase, tense: card.expected.tense,
      polarity: card.expected.polarity, question: card.expected.question
    }, cfg);

    const oppTense    = card.expected.tense    === 'Non-past'   ? 'Past'    : 'Non-past';
    const oppPolarity = card.expected.polarity === 'Affirmative' ? 'Negative' : 'Affirmative';

    const distractorStates = [
      { ...card.expected, tense: oppTense },
      { ...card.expected, polarity: oppPolarity },
      { ...card.expected, question: !card.expected.question }
    ];

    const distractors = distractorStates.map(s => verbEngine({ baseId: card.iconBase, ...s }, cfg));

    const all = [
      { ...correctOut, isCorrect: true },
      ...distractors.map(d => ({ ...d, isCorrect: false }))
    ];

    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  // ── LEGACY: Multiple Choice (régi modulokhoz) ────
  function renderLegacyMC(m) {
    const exp = m.explanation || { jp: '', hu: '' };
    const questions = m.phases[1].questions || [];
    const questionsHtml = questions.map((q, i) => renderMCQuestion(q, i)).join('');
    return `
      <div class="explanation glass-panel">
        <div class="exp-label">📖 Magyarázat</div>
        <p class="exp-hu">${exp.hu}</p>
        <div class="exp-divider"></div>
        <p class="exp-jp" lang="ja">${exp.jp}</p>
      </div>
      <div class="questions-block">
        <h3 class="questions-heading">Próbáld ki magad <span class="q-count-label">— ${questions.length} kérdés</span></h3>
        ${questionsHtml}
      </div>
    `;
  }

  function renderMCQuestion(q, idx) {
    const choicesHtml = q.choices.map((c, ci) => `
      <button class="mc-choice" data-q="${idx}" data-c="${ci}" data-correct="${c.correct ? '1' : '0'}">${c.text}</button>
    `).join('');
    return `
      <div class="question-card glass-panel" data-q-idx="${idx}">
        <div class="q-header">
          <span class="q-number">Kérdés ${idx + 1}</span>
          ${q.context ? `<span class="q-context">${q.context}</span>` : ''}
        </div>
        <p class="q-prompt">${q.prompt}</p>
        ${q.translation ? `<p class="q-translation">「 ${q.translation} 」</p>` : ''}
        <div class="mc-choices">${choicesHtml}</div>
        <div class="mc-feedback hidden" id="feedback-${idx}"></div>
      </div>
    `;
  }

  function attachMultipleChoiceHandlers() {
    const choices = document.querySelectorAll('.mc-choice');
    let answered = new Set();
    choices.forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.dataset.q, 10);
        const cIdx = parseInt(btn.dataset.c, 10);
        const isCorrect = btn.dataset.correct === '1';
        if (answered.has(qIdx)) return;
        answered.add(qIdx);
        const choiceData = mod.phases[1].questions[qIdx].choices[cIdx];
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const correctBtn = document.querySelector(`.mc-choice[data-q="${qIdx}"][data-correct="1"]`);
          if (correctBtn) correctBtn.classList.add('reveal-correct');
        }
        document.querySelectorAll(`.mc-choice[data-q="${qIdx}"]`).forEach(b => b.disabled = true);
        const fb = document.getElementById(`feedback-${qIdx}`);
        fb.innerHTML = `<span class="fb-mark">${isCorrect ? '✓' : '✗'}</span><span class="fb-text">${choiceData.feedback}</span>`;
        fb.classList.remove('hidden');
        fb.classList.add(isCorrect ? 'fb-correct' : 'fb-wrong');
      });
    });
  }

  /* ====================================================
     ── COUNTER MODULE — v1.6 ─────────────────────────
     Phase 1: Recognition (multiple choice)              ← Part 1
     Phase 2: Hybrid (counter pill + kana input)          ← Part 2
     Phase 3: Mastery (free input + diff engine)          ← Part 2
     ==================================================== */

  // ── Egységes phase belépő (lobby vagy kártya) ────
  function renderCounterPhase(m, phase) {
    // Tab-váltáskor mindig vissza a lobby-ba (settings persists)
    if (counterSettings.inLobby) return renderCounterLobby(m, phase);
    return renderCounterCardForPhase(m, phase);
  }

  function attachCounterPhaseHandlers(m, phase) {
    if (counterSettings.inLobby) attachCounterLobbyHandlers(m, phase);
    else                          attachCounterCardHandlersForPhase(m, phase);
  }

  function renderCounterCardForPhase(m, phase) {
    if (phase.type === 'counter-hybrid')  return renderCounterHybridCard(m, phase);
    if (phase.type === 'counter-mastery') return renderCounterMasteryCard(m, phase);
    return renderCounterCard(m, phase); // recognition (default)
  }

  function attachCounterCardHandlersForPhase(m, phase) {
    if (phase.type === 'counter-hybrid')       attachCounterHybridCardHandlers(m, phase);
    else if (phase.type === 'counter-mastery') attachCounterMasteryCardHandlers(m, phase);
    else                                       attachCounterCardHandlers(m, phase); // recognition
    // Közös exit-handler minden card-renderhez
    attachCounterExitHandler(m, phase);
  }

  function attachCounterExitHandler(m, phase) {
    const exit = document.querySelector('[data-cnt-exit]');
    if (!exit) return;
    exit.addEventListener('click', () => {
      if (counterSettings.inLobby) return;
      if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
        '')) return;
      counterSettings.inLobby = true;
      document.querySelector('.module-hero')?.classList.remove('hidden');
      const container = document.getElementById('phaseContent');
      container.innerHTML = renderCounterPhase(m, phase);
      attachCounterPhaseHandlers(m, phase);
    });
  }

  // ── Lobby — kategória-választó (decision tree) ───
  function renderCounterLobby(m, phase) {
    const categories = NIHONCORE_COUNTER_CATEGORIES.map(cat => {
      const isCatOn = counterSettings.selectedCategoryIds.includes(cat.id);
      const counterChips = cat.counters.map(cId => {
        const c = NIHONCORE_COUNTERS[cId];
        if (!c) return '';
        const isCounterOn = counterSettings.selectedCounterIds === null
          || counterSettings.selectedCounterIds.includes(cId);
        return `
          <button class="cnt-counter-chip ${isCounterOn ? 'active' : ''}"
                  data-counter-id="${cId}"
                  ${!isCatOn ? 'disabled' : ''}>
            <span class="ccc-jp">${c.jp}</span>
            <span class="ccc-romaji">${c.romaji}</span>
            <span class="ccc-hu">${c.nameHu}</span>
          </button>
        `;
      }).join('');

      return `
        <div class="cnt-cat-row">
          <button class="cnt-cat-btn ${isCatOn ? 'active' : ''}"
                  data-category-id="${cat.id}">
            <span class="ccb-emoji">${cat.emoji}</span>
            <span class="ccb-text">
              <span class="ccb-name">${cat.nameHu}</span>
              <span class="ccb-sub">${cat.counters.length} számlálószó</span>
            </span>
          </button>
          <div class="cnt-cat-children ${isCatOn ? '' : 'hidden'}">
            ${counterChips}
          </div>
        </div>
      `;
    }).join('');

    const presets = [5, 10, 20];
    const presetBtns = presets.map(n => `
      <button class="ml-count-btn ${counterSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    const matchCount = countCounterPool();

    return `
      <div class="cnt-lobby glass-panel-heavy">
        <div class="lobby-header">
          <div class="lobby-eyebrow">${phase.name} · Beállítások</div>
          <h3 class="lobby-title">Mit szeretnél gyakorolni?</h3>
          <p class="lobby-sub">Válaszd ki a főkategóriákat, majd ezen belül a konkrét számlálószavakat. A fa-szerű választó megmutatja, mely tárgyakra alkalmazod őket.</p>
        </div>

        <div class="lobby-section">
          <div class="lobby-section-label">Kategóriák — kapcsold ki/be</div>
          <div class="cnt-cat-tree">
            ${categories}
          </div>
        </div>

        <div class="lobby-section">
          <div class="lobby-section-label">Kártyák száma</div>
          <div class="ml-count-row">
            <div class="ml-count-presets">${presetBtns}</div>
            <div class="ml-count-custom">
              <label class="ml-count-custom-label" for="cntCustomCount">vagy saját:</label>
              <input type="number" id="cntCustomCount" min="1" max="100" placeholder="—" />
            </div>
          </div>
        </div>

        <div class="lobby-stats">
          <span class="lobby-combos">Megfelelő tárgyak: <strong id="cntPoolCount">${matchCount}</strong> · Számok: 1–10</span>
        </div>

        <button class="btn btn-primary glow-effect ml-start" id="cntStart">
          Indítás — ${counterSettings.cardCount} kártya
        </button>
      </div>
    `;
  }

  function attachCounterLobbyHandlers(m, phase) {
    // Kategória toggle
    document.querySelectorAll('.cnt-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.categoryId;
        const idx = counterSettings.selectedCategoryIds.indexOf(catId);
        if (idx === -1) {
          counterSettings.selectedCategoryIds.push(catId);
        } else {
          if (counterSettings.selectedCategoryIds.length === 1) {
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);
            return;
          }
          counterSettings.selectedCategoryIds.splice(idx, 1);
        }
        const container = document.getElementById('phaseContent');
        container.innerHTML = renderCounterLobby(m, phase);
        attachCounterLobbyHandlers(m, phase);
      });
    });

    // Counter chip toggle
    document.querySelectorAll('.cnt-counter-chip').forEach(chip => {
      if (chip.disabled) return;
      chip.addEventListener('click', () => {
        const cId = chip.dataset.counterId;
        // null érték → minden aktív → most ki kell vonni belőle
        if (counterSettings.selectedCounterIds === null) {
          counterSettings.selectedCounterIds = getAllAvailableCounterIds().filter(x => x !== cId);
        } else {
          const idx = counterSettings.selectedCounterIds.indexOf(cId);
          if (idx === -1) {
            counterSettings.selectedCounterIds.push(cId);
          } else {
            counterSettings.selectedCounterIds.splice(idx, 1);
          }
        }
        chip.classList.toggle('active');
        updateCounterPoolCount();
      });
    });

    // Kártyaszám preset
    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const n = parseInt(btn.dataset.count, 10);
        counterSettings.cardCount = n;
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('cntCustomCount');
        if (custom) custom.value = '';
        updateCounterPoolCount();
      });
    });

    // Custom kártyaszám
    const custom = document.getElementById('cntCustomCount');
    if (custom) {
      custom.addEventListener('input', () => {
        const n = parseInt(custom.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countCounterPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) custom.value = String(_v);
          counterSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        }
        updateCounterPoolCount();
      });
    }

    // Indítás
    document.getElementById('cntStart').addEventListener('click', () => startCounterRound(m, phase));
  }

  function getAllAvailableCounterIds() {
    const ids = [];
    NIHONCORE_COUNTER_CATEGORIES.forEach(cat => {
      if (counterSettings.selectedCategoryIds.includes(cat.id)) {
        cat.counters.forEach(cId => {
          if (NIHONCORE_COUNTERS[cId] && !ids.includes(cId)) ids.push(cId);
        });
      }
    });
    return ids;
  }

  function getActiveCounterIds() {
    const all = getAllAvailableCounterIds();
    if (counterSettings.selectedCounterIds === null) return all;
    return all.filter(cId => counterSettings.selectedCounterIds.includes(cId));
  }

  function getActiveItems() {
    const activeCounters = getActiveCounterIds();
    return NIHONCORE_COUNTER_ITEMS.filter(item => activeCounters.includes(item.primary));
  }

  function countCounterPool() {
    return getActiveItems().length;
  }

  function updateCounterPoolCount() {
    const el = document.getElementById('cntPoolCount');
    if (el) el.textContent = countCounterPool();
    const startBtn = document.getElementById('cntStart');
    if (startBtn) {
      startBtn.textContent = `Indítás — ${counterSettings.cardCount} kártya`;
      startBtn.disabled = countCounterPool() === 0 || counterSettings.cardCount < 1;
    }
  }

  // ── Kör indítása (phase.type alapján generál) ────
  function startCounterRound(m, phase) {
    const items = getActiveItems();
    if (items.length === 0) return;

    // Phase-specifikus card generálás
    if (phase.type === 'counter-recognition') {
      counterRunState.cards = generateRecognitionCards(items, counterSettings.cardCount);
    } else {
      // Hybrid és Mastery: ugyanaz az egyszerűsített card-objektum (item + num)
      counterRunState.cards = generateBaseCards(items, counterSettings.cardCount);
    }
    counterRunState.cardIdx = 0;
    counterRunState.score = 0;
    counterRunState.streak = 0;
    counterRunState.bestStreak = 0;
    counterRunState.results = [];
    counterRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'counter', mode: phase.type, results: counterRunState.results, score: counterRunState.score, startTs: counterRunState.roundStartTs }; });
    counterRunState.submitted = false;
    counterRunState.chosenIdx = null;

    counterSettings.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');

    const container = document.getElementById('phaseContent');
    container.innerHTML = renderCounterCardForPhase(m, phase);
    attachCounterCardHandlersForPhase(m, phase);
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Egyszerűbb card generátor Hybrid + Mastery módhoz
  function generateBaseCards(items, count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const item = items[Math.floor(Math.random() * items.length)];
      const num = randomNumber(counterSettings.minNum, counterSettings.maxNum);
      cards.push({
        item,
        num,
        counterId: item.primary,
        correctReading: NIHONCORE_COUNTERS[item.primary].readings[num]
      });
    }
    return cards;
  }

  // ── Kártyák generálása ───────────────────────────
  function generateRecognitionCards(items, count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const item = items[Math.floor(Math.random() * items.length)];
      const num  = randomNumber(counterSettings.minNum, counterSettings.maxNum);
      const counter = NIHONCORE_COUNTERS[item.primary];
      const correctReading = counter.readings[num];

      // 4 opció: 1 helyes + 3 distraktor
      const options = generateRecognitionOptions(item, num, correctReading);

      cards.push({
        item,
        num,
        counterId: item.primary,
        correctReading,
        options
      });
    }
    return cards;
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 4 opció: 1 helyes + 3 distraktor (pedagógiailag hasznos)
  function generateRecognitionOptions(item, num, correctReading) {
    const counter = NIHONCORE_COUNTERS[item.primary];
    const distractors = [];

    // 1) "Naiv szabályos" — ha a helyes alak rendhagyó, generáljuk a "ki nem mondott" szabályosat
    //    (pl. ippon helyett ichihon — ami nem létezik, de a tanuló ezt mondaná elsőre)
    if (correctReading.irregular) {
      const naive = constructNaiveReading(num, counter);
      if (naive && naive !== correctReading.kana) {
        distractors.push({ kana: naive, romaji: '', isWrong: 'naive-regular' });
      }
    } else {
      // Ha a helyes szabályos, vegyünk egy "false irregular" — más szám rendhagyóját
      const irregNums = Object.keys(counter.readings).map(Number).filter(n => n !== num && counter.readings[n].irregular);
      if (irregNums.length > 0) {
        const pick = irregNums[Math.floor(Math.random() * irregNums.length)];
        distractors.push({ kana: counter.readings[pick].kana, romaji: counter.readings[pick].romaji, isWrong: 'wrong-number' });
      }
    }

    // 2) Más szám olvasata ugyanazzal a counterrel
    const otherNums = Object.keys(counter.readings).map(Number).filter(n => n !== num);
    while (distractors.length < 2 && otherNums.length > 0) {
      const idx = Math.floor(Math.random() * otherNums.length);
      const pick = otherNums.splice(idx, 1)[0];
      const r = counter.readings[pick];
      // Kerüljük a duplikátumot
      if (!distractors.some(d => d.kana === r.kana)) {
        distractors.push({ kana: r.kana, romaji: r.romaji, isWrong: 'wrong-number' });
      }
    }

    // 3) Más counter — tsu (általános) ugyanazzal a számmal, ha az item-é nem tsu
    if (item.primary !== 'tsu' && NIHONCORE_COUNTERS.tsu.readings[num]) {
      const tsuReading = NIHONCORE_COUNTERS.tsu.readings[num];
      if (!distractors.some(d => d.kana === tsuReading.kana)) {
        distractors.push({ kana: tsuReading.kana, romaji: tsuReading.romaji, isWrong: 'wrong-counter' });
      }
    } else if (item.primary === 'tsu') {
      // tsu item esetén → mai vagy hon ugyanaz a szám
      const altCounters = ['mai', 'hon'];
      for (const aId of altCounters) {
        const r = NIHONCORE_COUNTERS[aId]?.readings?.[num];
        if (r && !distractors.some(d => d.kana === r.kana)) {
          distractors.push({ kana: r.kana, romaji: r.romaji, isWrong: 'wrong-counter' });
          break;
        }
      }
    }

    // Töltsük fel 3 distraktorra ha nincs elég
    while (distractors.length < 3) {
      const allCounters = Object.keys(NIHONCORE_COUNTERS);
      const cId = allCounters[Math.floor(Math.random() * allCounters.length)];
      const r = NIHONCORE_COUNTERS[cId].readings[num];
      if (r && !distractors.some(d => d.kana === r.kana) && r.kana !== correctReading.kana) {
        distractors.push({ kana: r.kana, romaji: r.romaji, isWrong: 'wrong-counter' });
      } else {
        break; // védőcsekk a végtelen ciklus ellen
      }
    }

    // Összes opció: helyes + 3 distraktor, megkeverve
    const all = [
      { kana: correctReading.kana, romaji: correctReading.romaji, isCorrect: true },
      ...distractors.slice(0, 3).map(d => ({ ...d, isCorrect: false }))
    ];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  // "Naiv szabályos" — pl. ichihon, mikor a helyes ippon
  function constructNaiveReading(num, counter) {
    const numStems = {
      1: { kana: 'いち', romaji: 'ichi' },
      2: { kana: 'に',   romaji: 'ni' },
      3: { kana: 'さん', romaji: 'san' },
      4: { kana: 'よん', romaji: 'yon' },
      5: { kana: 'ご',   romaji: 'go' },
      6: { kana: 'ろく', romaji: 'roku' },
      7: { kana: 'なな', romaji: 'nana' },
      8: { kana: 'はち', romaji: 'hachi' },
      9: { kana: 'きゅう', romaji: 'kyuu' },
      10:{ kana: 'じゅう', romaji: 'juu' }
    };
    const stem = numStems[num];
    if (!stem) return null;
    // Csak a counter "alap" formáját adjuk hozzá (pl. 'hon', 'satsu')
    const counterKana = counter.jp === '本' ? 'ほん'
      : counter.jp === '冊' ? 'さつ'
      : counter.jp === '人' ? 'にん'
      : counter.jp === '枚' ? 'まい'
      : counter.jp === 'つ' ? 'つ'
      : counter.romaji;
    return stem.kana + counterKana;
  }

  // ── Kártya render ────────────────────────────────
  function renderCounterCard(m, phase) {
    const card = counterRunState.cards[counterRunState.cardIdx];
    const total = counterRunState.cards.length;
    const counter = NIHONCORE_COUNTERS[card.counterId];

    // Vizuális: emoji × num (max 5 megjelenítve, ha több → "× N" jelölés)
    const visualEmojis = card.num <= 5
      ? card.item.emoji.repeat(card.num)
      : `${card.item.emoji} × ${card.num}`;

    const optionsHtml = card.options.map((opt, i) => `
      <button class="cnt-option" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cnt-opt-jp">${opt.kana}</span>
        ${opt.romaji ? `<span class="cnt-opt-romaji">${opt.romaji}</span>` : ''}
      </button>
    `).join('');

    return `
      <div class="cnt-progress">
        <span class="cnt-counter-label">Kártya ${counterRunState.cardIdx + 1} / ${total}</span>
        <div class="cnt-progress-bar">
          <div class="cnt-progress-fill" style="width: ${(counterRunState.cardIdx / total) * 100}%"></div>
        </div>
        <span class="cnt-score">Pont: <strong>${counterRunState.score}</strong> · 🔥 ${counterRunState.streak}</span>
        <button class="round-exit cnt-exit-btn" data-cnt-exit="1" type="button" title="Kilépés a körből">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Kilépés</span>
        </button>
      </div>

      <div class="cnt-card glass-panel-heavy">
        <div class="cnt-card-eyebrow">
          <span class="cnt-tag">${counter.emoji} ${counter.nameHu}</span>
        </div>

        <div class="cnt-visual">
          <div class="cnt-visual-emojis">${visualEmojis}</div>
          <div class="cnt-prompt-num">${card.num}</div>
          <div class="cnt-prompt-name">
            <span class="cnt-name-hu">${card.item.nameHu}</span>
            <span class="cnt-name-jp">${card.item.nameJp}</span>
          </div>
        </div>

        <div class="cnt-question">
          Hogyan mondod japánul?
        </div>

        <div class="cnt-options">
          ${optionsHtml}
        </div>

        <button class="dont-know-btn" type="button">🤔 Nem tudom</button>

        <div class="cnt-feedback hidden" id="cntFeedback"></div>
      </div>
    `;
  }

  function attachCounterCardHandlers(m, phase) {
    document.querySelectorAll('.cnt-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (counterRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const isCorrect = btn.dataset.correct === '1';
        submitCounterAnswer(m, phase, idx, isCorrect, btn);
      });
    });
    const dk = document.querySelector('.dont-know-btn');
    if (dk) dk.addEventListener('click', () => counterDontKnow(m, phase));
  }

  // „Nem tudom" — felfedi a helyes olvasatot + magyarázat
  function counterDontKnow(m, phase) {
    if (counterRunState.submitted) return;
    counterRunState.submitted = true;
    const correctBtn = document.querySelector('.cnt-option[data-correct="1"]');
    if (correctBtn) correctBtn.classList.add('reveal-correct');
    document.querySelectorAll('.cnt-option, .dont-know-btn').forEach(b => b.disabled = true);
    counterRunState.streak = 0;
    counterRunState.results.push({ cardIdx: counterRunState.cardIdx, correct: false });
    renderCounterFeedback(m, phase, false);
    markDontKnowFeedback(document.getElementById('cntFeedback'));
  }

  function submitCounterAnswer(m, phase, idx, isCorrect, btn) {
    counterRunState.submitted = true;
    counterRunState.chosenIdx = idx;

    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      const correctBtn = document.querySelector('.cnt-option[data-correct="1"]');
      if (correctBtn) correctBtn.classList.add('reveal-correct');
    }
    document.querySelectorAll('.cnt-option, .dont-know-btn').forEach(b => b.disabled = true);

    if (isCorrect) {
      counterRunState.score += 10;
      counterRunState.streak++;
      counterRunState.bestStreak = Math.max(counterRunState.bestStreak, counterRunState.streak);
    } else {
      counterRunState.streak = 0;
    }
    counterRunState.results.push({ cardIdx: counterRunState.cardIdx, correct: isCorrect });

    renderCounterFeedback(m, phase, isCorrect);
  }

  function renderCounterFeedback(m, phase, isCorrect) {
    const card = counterRunState.cards[counterRunState.cardIdx];
    const counter = NIHONCORE_COUNTERS[card.counterId];
    const reading = card.correctReading;
    const isLast = counterRunState.cardIdx + 1 >= counterRunState.cards.length;

    const explainHtml = isCorrect ? `
      <div class="pfe-row pfe-correct">
        <span class="pfe-label">Helyes!</span>
        <span class="pfe-text">
          <strong class="pfe-jp-ok">${reading.kana}</strong>
          <span class="pfe-roman">(${reading.romaji})</span>
          — <strong>${card.num}</strong> ${card.item.nameHu} → <strong>${counter.jp}</strong> (${counter.nameHu})
        </span>
      </div>
    ` : `
      <div class="pfe-row pfe-wrong">
        <span class="pfe-label">Hibás</span>
        <span class="pfe-text">
          A választott alak nem stimmel ehhez a kombinációhoz.
        </span>
      </div>
      <div class="pfe-row pfe-correct">
        <span class="pfe-label">Helyes</span>
        <span class="pfe-text">
          <strong class="pfe-jp-ok">${reading.kana}</strong>
          <span class="pfe-roman">(${reading.romaji})</span>
          — <strong>${card.num}</strong> ${card.item.nameHu} = <strong>${counter.jp}</strong>
        </span>
      </div>
      ${reading.irregular ? `
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Miért?</span>
          <span class="pfe-text">${explainChange(reading.changeType, card.num, counter)}</span>
        </div>
      ` : ''}
    `;

    const fbEl = document.getElementById('cntFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '✓' : '✗'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes!' : 'Még nem ez a helyes forma'}</span>
      </div>
      <div class="pr-fb-explain">
        ${explainHtml}
      </div>
      <button class="btn btn-primary glow-effect cnt-next" id="cntNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('cntNext').addEventListener('click', () => advanceCounterRound(m, phase));
  }

  function explainChange(type, num, counter) {
    switch (type) {
      case 'sokuon-p':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>kis tsu (っ) + p-hangzó</em>-val ejtődik (sokuon-átalakulás).`;
      case 'sokuon-s':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>dupla s-sel</em> (kis tsu + s) ejtődik.`;
      case 'sokuon-k':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>kis tsu (っ) + k-hangzó</em>-val ejtődik — a szám végső mássalhangzója megkettőződik.`;
      case 'rendaku-b':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>rendaku</em> (h → b) hangmódosulással: ${counter.romaji} → bon.`;
      case 'rendaku-z':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>rendaku</em> (s → z) hangmódosulással: ${counter.romaji} → zoku.`;
      case 'rendaku-g':
        return `A <strong>${counter.jp}</strong> ezen a számon (<strong>${num}</strong>) <em>rendaku</em> (k → g) hangmódosulással — az első mássalhangzó zöngésül (pl. さんかい → さんがい).`;
      case 'native':
        return `Ez a forma <em>natív japán számolási mód</em> (nem kínai eredetű).`;
      case 'yo-form':
        return `A 4-es szám előtt a <strong>人</strong> esetén <em>よ (yo)</em> használatos a よん helyett.`;
      default:
        return `Ez egy speciális ragozási forma.`;
    }
  }

  function advanceCounterRound(m, phase) {
    counterRunState.cardIdx++;
    counterRunState.submitted = false;
    counterRunState.chosenIdx = null;

    if (counterRunState.cardIdx >= counterRunState.cards.length) {
      showCounterRoundSummary(m, phase);
    } else {
      // A fázis saját kártyája (hibrid / mester), nem a felismerő-kártya:
      // különben a 2. kártyánál a kör elakad (a hibrid kártyának nincs options mezője).
      const container = document.getElementById('phaseContent');
      container.innerHTML = renderCounterCardForPhase(m, phase);
      attachCounterCardHandlersForPhase(m, phase);
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ── PHASE 2: HYBRID — counter pill + kana input ─ */

  function renderCounterHybridCard(m, phase) {
    const card = counterRunState.cards[counterRunState.cardIdx];
    const total = counterRunState.cards.length;

    // Aktív counterek pill-formában (a settings alapján)
    const activeCounters = getActiveCounterIds();
    const counterPills = activeCounters.map(cId => {
      const c = NIHONCORE_COUNTERS[cId];
      return `
        <button class="cnh-counter-pill" data-counter-id="${cId}">
          <span class="cnh-pill-jp">${c.jp}</span>
          <span class="cnh-pill-romaji">${c.romaji}</span>
          <span class="cnh-pill-hu">${c.nameHu}</span>
        </button>
      `;
    }).join('');

    const visualEmojis = card.num <= 5 ? card.item.emoji.repeat(card.num) : `${card.item.emoji} × ${card.num}`;

    return `
      <div class="cnt-progress">
        <span class="cnt-counter-label">Kártya ${counterRunState.cardIdx + 1} / ${total}</span>
        <div class="cnt-progress-bar">
          <div class="cnt-progress-fill" style="width: ${(counterRunState.cardIdx / total) * 100}%"></div>
        </div>
        <span class="cnt-score">Pont: <strong>${counterRunState.score}</strong> · 🔥 ${counterRunState.streak}</span>
        <button class="round-exit cnt-exit-btn" data-cnt-exit="1" type="button" title="Kilépés a körből">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Kilépés</span>
        </button>
      </div>

      <div class="cnt-card glass-panel-heavy">
        <div class="cnt-visual">
          <div class="cnt-visual-emojis">${visualEmojis}</div>
          <div class="cnt-prompt-num">${card.num}</div>
          <div class="cnt-prompt-name">
            <span class="cnt-name-hu">${card.item.nameHu}</span>
            <span class="cnt-name-jp">${card.item.nameJp}</span>
          </div>
        </div>

        <div class="cnh-step">
          <div class="cnh-step-label">1. Válaszd ki a számlálószót</div>
          <div class="cnh-counter-grid">${counterPills}</div>
        </div>

        <div class="cnh-step">
          <div class="cnh-step-label">2. Írd be a teljes olvasatot (kana vagy romaji)</div>
          <input type="text" class="cnh-input" id="cnhInput" placeholder="pl. ごさつ vagy gosatsu" autocomplete="off" autocapitalize="off" spellcheck="false" />
        </div>

        <button class="btn btn-primary glow-effect cnh-submit" id="cnhSubmit" disabled>Beküldés</button>

        <div class="cnt-feedback hidden" id="cntFeedback"></div>
      </div>
    `;
  }

  function attachCounterHybridCardHandlers(m, phase) {
    // Counter pill kiválasztása
    document.querySelectorAll('.cnh-counter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (counterRunState.submitted) return;
        document.querySelectorAll('.cnh-counter-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        counterRunState.chosenCounterId = pill.dataset.counterId;
        updateHybridSubmitState();
      });
    });

    // Input
    const input = document.getElementById('cnhInput');
    input.addEventListener('input', () => {
      counterRunState.userInput = input.value.trim();
      updateHybridSubmitState();
    });

    // Submit
    document.getElementById('cnhSubmit').addEventListener('click', () => {
      if (counterRunState.submitted) return;
      submitCounterHybrid(m, phase);
    });

    // Reset state
    counterRunState.chosenCounterId = null;
    counterRunState.userInput = '';
  }

  function updateHybridSubmitState() {
    const btn = document.getElementById('cnhSubmit');
    if (!btn) return;
    btn.disabled = !counterRunState.chosenCounterId || !counterRunState.userInput;
  }

  function submitCounterHybrid(m, phase) {
    counterRunState.submitted = true;
    const card = counterRunState.cards[counterRunState.cardIdx];
    const result = validateHybridAnswer(card, counterRunState.chosenCounterId, counterRunState.userInput);

    // Counter pillek vizuális jelzése
    document.querySelectorAll('.cnh-counter-pill').forEach(p => {
      p.disabled = true;
      if (p.dataset.counterId === card.item.primary) p.classList.add('reveal-correct');
      if (p.dataset.counterId === counterRunState.chosenCounterId) {
        p.classList.add(result.counterOk ? 'correct' : 'wrong');
      }
    });

    // Input vizuális jelzés
    const input = document.getElementById('cnhInput');
    input.disabled = true;
    input.classList.add(result.readingOk ? 'cnh-input-correct' : 'cnh-input-wrong');

    // Pontszám
    if (result.counterOk && result.readingOk) {
      counterRunState.score += result.isAlternative ? 8 : 10;
      counterRunState.streak++;
      counterRunState.bestStreak = Math.max(counterRunState.bestStreak, counterRunState.streak);
    } else {
      counterRunState.streak = 0;
    }
    counterRunState.results.push({ cardIdx: counterRunState.cardIdx, correct: result.counterOk && result.readingOk, hybridResult: result });

    renderHybridFeedback(m, phase, card, result);
  }

  function validateHybridAnswer(card, chosenCounterId, userKana) {
    const item = card.item;
    const acceptableCounters = [item.primary, ...(item.alternatives || [])];
    const counterOk = acceptableCounters.includes(chosenCounterId);

    // A kiválasztott counter olvasatát várjuk (vagy a primary-ét, ha a counter rossz)
    const counterForReading = counterOk ? chosenCounterId : item.primary;
    const expectedReading = NIHONCORE_COUNTERS[counterForReading].readings[card.num];

    const cmp = compareReading(userKana, expectedReading);

    return {
      counterOk,
      readingOk: counterOk && cmp.match,
      isAlternative: counterOk && chosenCounterId !== item.primary,
      chosenCounter: NIHONCORE_COUNTERS[chosenCounterId],
      primaryCounter: NIHONCORE_COUNTERS[item.primary],
      expectedReading,
      userInput: userKana,
      compare: cmp
    };
  }

  function renderHybridFeedback(m, phase, card, result) {
    const fbEl = document.getElementById('cntFeedback');
    fbEl.classList.remove('hidden');
    const isOverallOk = result.counterOk && result.readingOk;
    fbEl.classList.add(isOverallOk ? 'pr-fb-correct' : 'pr-fb-wrong');
    const isLast = counterRunState.cardIdx + 1 >= counterRunState.cards.length;

    // Per-field rows
    const counterRow = `
      <div class="pfe-row ${result.counterOk ? 'pfe-correct' : 'pfe-wrong'}">
        <span class="pfe-label">Számlálószó</span>
        <span class="pfe-text">
          ${result.counterOk
            ? `<strong class="pfe-jp-ok">${result.chosenCounter.jp}</strong> ✓ ${result.isAlternative ? '<em>(alternatív, de elfogadott)</em>' : ''}`
            : `Te: <strong class="pfe-jp-wrong">${result.chosenCounter.jp}</strong> · Helyes: <strong class="pfe-jp-ok">${result.primaryCounter.jp}</strong>`
          }
        </span>
      </div>
    `;

    const readingRow = result.readingOk ? `
      <div class="pfe-row pfe-correct">
        <span class="pfe-label">Olvasat</span>
        <span class="pfe-text">
          <strong class="pfe-jp-ok">${result.expectedReading.kana}</strong>
          <span class="pfe-roman">(${result.expectedReading.romaji})</span> ✓
        </span>
      </div>
    ` : `
      <div class="pfe-row pfe-wrong">
        <span class="pfe-label">Olvasat</span>
        <span class="pfe-text">
          ${renderInlineDiff(result.compare, result.expectedReading)}
        </span>
      </div>
    `;

    const explainRow = (!result.readingOk && result.expectedReading.irregular) ? `
      <div class="pfe-row pfe-context">
        <span class="pfe-label">Miért?</span>
        <span class="pfe-text">${explainChange(result.expectedReading.changeType, card.num, result.primaryCounter)}</span>
      </div>
    ` : '';

    const altNote = result.isAlternative ? `
      <div class="pfe-row pfe-rule">
        <span class="pfe-label">Megjegyzés</span>
        <span class="pfe-text">A "${card.item.nameHu}" elsődlegesen <strong>${result.primaryCounter.jp}</strong>-vel áll, de a <strong>${result.chosenCounter.jp}</strong> is helyes lehet a kontextusban.</span>
      </div>
    ` : '';

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isOverallOk ? '✓' : '✗'}</span>
        <span class="pr-fb-title">${isOverallOk ? (result.isAlternative ? 'Helyes (alternatív választás)' : 'Tökéletes!') : 'Volt eltérés'}</span>
      </div>
      <div class="pr-fb-explain">
        ${counterRow}
        ${readingRow}
        ${explainRow}
        ${altNote}
      </div>
      <button class="btn btn-primary glow-effect cnt-next" id="cntNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('cntNext').addEventListener('click', () => advanceCounterRound(m, phase));
  }

  /* ── PHASE 3: MASTERY — szabad input + diff engine ─ */

  function renderCounterMasteryCard(m, phase) {
    const card = counterRunState.cards[counterRunState.cardIdx];
    const total = counterRunState.cards.length;
    const visualEmojis = card.num <= 5 ? card.item.emoji.repeat(card.num) : `${card.item.emoji} × ${card.num}`;

    return `
      <div class="cnt-progress">
        <span class="cnt-counter-label">Kártya ${counterRunState.cardIdx + 1} / ${total}</span>
        <div class="cnt-progress-bar">
          <div class="cnt-progress-fill" style="width: ${(counterRunState.cardIdx / total) * 100}%"></div>
        </div>
        <span class="cnt-score">Pont: <strong>${counterRunState.score}</strong> · 🔥 ${counterRunState.streak}</span>
        <button class="round-exit cnt-exit-btn" data-cnt-exit="1" type="button" title="Kilépés a körből">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Kilépés</span>
        </button>
      </div>

      <div class="cnt-card glass-panel-heavy">
        <div class="cnt-visual">
          <div class="cnt-visual-emojis">${visualEmojis}</div>
          <div class="cnt-prompt-num">${card.num}</div>
          <div class="cnt-prompt-name">
            <span class="cnt-name-hu">${card.item.nameHu}</span>
            <span class="cnt-name-jp">${card.item.nameJp}</span>
          </div>
        </div>

        <div class="cnm-eyebrow">Mester mód</div>
        <div class="cnm-instruction">
          Írd be a teljes olvasatot — kana vagy romaji formában.
          A rendszer karakter-szintű elemzést ad.
        </div>

        <input type="text" class="cnm-input" id="cnmInput"
               placeholder="pl. いっぽん vagy ippon"
               autocomplete="off" autocapitalize="off" spellcheck="false" />

        <button class="btn btn-primary glow-effect cnm-submit" id="cnmSubmit" disabled>Beküldés</button>

        <div class="cnt-feedback hidden" id="cntFeedback"></div>
      </div>
    `;
  }

  function attachCounterMasteryCardHandlers(m, phase) {
    const input = document.getElementById('cnmInput');
    const btn   = document.getElementById('cnmSubmit');

    input.focus();
    input.addEventListener('input', () => {
      counterRunState.userInput = input.value.trim();
      btn.disabled = !counterRunState.userInput;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !btn.disabled && !counterRunState.submitted) {
        e.preventDefault();
        submitCounterMastery(m, phase);
      }
    });
    btn.addEventListener('click', () => {
      if (counterRunState.submitted) return;
      submitCounterMastery(m, phase);
    });

    counterRunState.userInput = '';
    counterRunState.submitted = false;
  }

  function submitCounterMastery(m, phase) {
    counterRunState.submitted = true;
    const card = counterRunState.cards[counterRunState.cardIdx];
    const cmp  = compareReading(counterRunState.userInput, card.correctReading);

    const input = document.getElementById('cnmInput');
    input.disabled = true;
    input.classList.add(cmp.match ? 'cnh-input-correct' : 'cnh-input-wrong');

    if (cmp.match) {
      counterRunState.score += cmp.fuzzyType === 'romaji-accepted' ? 8 : 10;
      counterRunState.streak++;
      counterRunState.bestStreak = Math.max(counterRunState.bestStreak, counterRunState.streak);
    } else {
      counterRunState.streak = 0;
    }
    counterRunState.results.push({ cardIdx: counterRunState.cardIdx, correct: cmp.match, masteryResult: cmp });

    renderMasteryFeedback(m, phase, card, cmp);
  }

  function renderMasteryFeedback(m, phase, card, cmp) {
    const fbEl = document.getElementById('cntFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.add(cmp.match ? 'pr-fb-correct' : 'pr-fb-wrong');
    const isLast = counterRunState.cardIdx + 1 >= counterRunState.cards.length;
    const counter = NIHONCORE_COUNTERS[card.counterId];

    // Diff visualization
    const diffHtml = cmp.match
      ? `<strong class="pfe-jp-ok">${card.correctReading.kana}</strong> <span class="pfe-roman">(${card.correctReading.romaji})</span>`
      : renderDiffBlock(cmp);

    const noteRow = (cmp.match && cmp.fuzzyType === 'romaji-accepted') ? `
      <div class="pfe-row pfe-rule">
        <span class="pfe-label">Tipp</span>
        <span class="pfe-text">A romaji-t elfogadtuk, de a Mester módban érdemesebb kana-ban gyakorolni: <strong class="pfe-jp-ok">${card.correctReading.kana}</strong>.</span>
      </div>
    ` : '';

    const explainRow = (!cmp.match && card.correctReading.irregular) ? `
      <div class="pfe-row pfe-context">
        <span class="pfe-label">Miért?</span>
        <span class="pfe-text">${explainChange(card.correctReading.changeType, card.num, counter)}</span>
      </div>
    ` : '';

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${cmp.match ? '✓' : '✗'}</span>
        <span class="pr-fb-title">${cmp.match ? 'Tökéletes!' : 'Eltérés a helyes alaktól'}</span>
      </div>
      <div class="pr-fb-explain">
        <div class="pfe-row ${cmp.match ? 'pfe-correct' : 'pfe-wrong'}">
          <span class="pfe-label">${cmp.match ? 'Helyes' : 'Diff'}</span>
          <span class="pfe-text">${diffHtml}</span>
        </div>
        ${noteRow}
        ${explainRow}
      </div>
      <button class="btn btn-primary glow-effect cnt-next" id="cntNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('cntNext').addEventListener('click', () => advanceCounterRound(m, phase));
  }

  /* ── SHARED UTILITIES ───────────────────────────── */

  // Normalizálás: trim, lowercase, whitespace eltávolítás
  function normalizeInput(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, '');
  }

  // Input-mód detektálás: 'kana' (hiragana), 'romaji' (latin), 'mixed'
  function detectInputMode(s) {
    const norm = s.trim();
    if (!norm) return 'empty';
    const hasKana  = /[぀-ゟ゠-ヿ]/.test(norm);
    const hasLatin = /[a-zA-Z]/.test(norm);
    if (hasKana && !hasLatin) return 'kana';
    if (hasLatin && !hasKana) return 'romaji';
    if (hasKana && hasLatin)  return 'mixed';
    return 'other';
  }

  // Olvasat-összehasonlítás (kana vs romaji formátumot felismeri)
  // Visszaad: { match: bool, diff: ops[], fuzzyType: string, mode: string,
  //             user: string, expected: string }
  function compareReading(userInput, expectedReading) {
    const mode = detectInputMode(userInput);
    const userNorm = normalizeInput(userInput);

    if (mode === 'kana') {
      const expNorm = normalizeInput(expectedReading.kana);
      const match = userNorm === expNorm;
      return {
        match,
        diff: match ? null : diffChars(userNorm, expNorm),
        fuzzyType: 'kana-strict',
        mode: 'kana',
        user: userNorm,
        expected: expNorm
      };
    }

    if (mode === 'romaji') {
      const expNorm = normalizeInput(expectedReading.romaji);
      const match = userNorm === expNorm;
      return {
        match,
        diff: match ? null : diffChars(userNorm, expNorm),
        fuzzyType: match ? 'romaji-accepted' : 'romaji-mismatch',
        mode: 'romaji',
        user: userNorm,
        expected: expNorm
      };
    }

    if (mode === 'mixed') {
      // Fuzzy: ha a hiragana része megegyezik, próbáljunk kana-összehasonlítást
      const expNorm = normalizeInput(expectedReading.kana);
      return {
        match: false,
        diff: diffChars(userNorm, expNorm),
        fuzzyType: 'mixed-input',
        mode: 'mixed',
        user: userNorm,
        expected: expNorm
      };
    }

    return {
      match: false,
      diff: null,
      fuzzyType: 'invalid',
      mode: mode,
      user: userNorm,
      expected: expectedReading.kana
    };
  }

  // LCS-alapú karakter diff — visszaad: [{type: 'eq'|'del'|'ins', char}]
  // 'eq'  = mindkettőben szerepel (helyes)
  // 'del' = a-ban (user) van, b-ben (expected) nincs → user-input felesleges karakter
  // 'ins' = b-ben (expected) van, a-ban (user) nincs → user-ből hiányzik
  function diffChars(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
        else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    const ops = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) {
        ops.unshift({ type: 'eq', char: a[i-1] });
        i--; j--;
      } else if (dp[i-1][j] >= dp[i][j-1]) {
        ops.unshift({ type: 'del', char: a[i-1] });
        i--;
      } else {
        ops.unshift({ type: 'ins', char: b[j-1] });
        j--;
      }
    }
    while (i > 0) { ops.unshift({ type: 'del', char: a[i-1] }); i--; }
    while (j > 0) { ops.unshift({ type: 'ins', char: b[j-1] }); j--; }
    return ops;
  }

  // Diff render — inline (egy soros). A user input kollekciója + javítások
  function renderInlineDiff(cmp, expectedReading) {
    if (!cmp.diff) return `<strong class="pfe-jp-ok">${expectedReading.kana}</strong>`;

    const userPart = cmp.diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del">${escapeHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins">${escapeHtml(op.char)}</span>`;
      return '';
    }).join('');

    return `
      <span class="diff-line">
        <span class="diff-label">Te:</span>
        <span class="diff-content">${userPart}</span>
      </span>
      <span class="diff-line">
        <span class="diff-label">Helyes:</span>
        <span class="diff-content"><strong class="pfe-jp-ok">${expectedReading.kana}</strong> <span class="pfe-roman">(${expectedReading.romaji})</span></span>
      </span>
    `;
  }

  // Kétsoros diff blokk a Mastery módhoz — részletesebb
  function renderDiffBlock(cmp) {
    if (!cmp.diff) return '';
    const userHtml = cmp.diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del" title="felesleges">${escapeHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins" title="hiányzik">${escapeHtml(op.char)}</span>`;
      return '';
    }).join('');

    const card = counterRunState.cards[counterRunState.cardIdx];
    const expected = card.correctReading;

    return `
      <div class="diff-block">
        <div class="diff-line">
          <span class="diff-label">Te írtad:</span>
          <span class="diff-content">${userHtml}</span>
        </div>
        <div class="diff-line">
          <span class="diff-label">Helyes:</span>
          <span class="diff-content"><strong class="pfe-jp-ok">${escapeHtml(expected.kana)}</strong> <span class="pfe-roman">(${escapeHtml(expected.romaji)})</span></span>
        </div>
        <div class="diff-legend">
          <span class="diff-eq-sample">helyes</span> ·
          <span class="diff-del-sample">felesleges karakter</span> ·
          <span class="diff-ins-sample">hiányzó karakter</span>
        </div>
      </div>
    `;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showCounterRoundSummary(m, phase) {
    NihonCoreStats.recordSession({
      module: 'counter', mode: phase.type,
      results: counterRunState.results, score: counterRunState.score,
      startTs: counterRunState.roundStartTs
    });
    const correct = counterRunState.results.filter(r => r.correct).length;
    const total   = counterRunState.results.length;
    const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
    const phaseTitle = phase.type === 'counter-hybrid'  ? 'Hibrid'
                     : phase.type === 'counter-mastery' ? 'Mester'
                     : 'Felismerés';

    const container = document.getElementById('phaseContent');
    container.innerHTML = `
      <div class="ms-summary glass-panel-heavy">
        <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 70 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
        <h3>${phaseTitle} — Kész</h3>
        <div class="summary-score">${correct} / ${total} <span class="summary-pct">(${pct}%)</span></div>
        <p class="summary-blurb">
          ${pct === 100 ? 'Tökéletes! Készen állsz a következő szintre. 💪'
            : pct >= 70 ? 'Szép munka! Próbáld a Hibrid mód-ot ha készen érzed magad.'
                        : 'Ne add fel — gyakorold tovább a felismerést, és nézd át a magyarázatokat.'}
        </p>
        <div class="sd-final-grid">
          <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${counterRunState.score}</span></div>
          <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${counterRunState.bestStreak} 🔥</span></div>
        </div>
        <button class="btn btn-primary glow-effect" id="cntReset">Új kör</button>
      </div>
    `;
    document.getElementById('cntReset').addEventListener('click', () => {
      counterSettings.inLobby = true;
      document.querySelector('.module-hero')?.classList.remove('hidden');
      const container = document.getElementById('phaseContent');
      container.innerHTML = renderCounterPhase(m, phase);
      attachCounterPhaseHandlers(m, phase);
    });
  }

  // ── INIT (a fájl ezen pontjára futtatva) ─────────
  const params      = new URLSearchParams(window.location.search);
  const moduleId    = params.get('id');
  const loadingEl   = document.getElementById('moduleLoading');
  const errorEl     = document.getElementById('moduleError');
  const contentEl   = document.getElementById('moduleContent');
  const mod         = moduleId ? NIHONCORE_MODULES[moduleId] : null;

  if (!mod) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
  } else {
    // Tanulási út: a lépés a modul egy szeletére szűkíti a kört, és rögtön a
    // gyakorló fázist nyitja (a magyarázat a lecke-oldalon már megvolt).
    const pathStep = window.NihonCorePath && NihonCorePath.activeStep();
    const preset = pathStep && pathStep.preset;
    let pathPhase = 1;
    if (preset && pathStep.module === 'counter' && Array.isArray(preset.counters)) {
      counterSettings.selectedCategoryIds = NIHONCORE_COUNTER_CATEGORIES
        .filter(c => c.counters.some(id => preset.counters.indexOf(id) >= 0)).map(c => c.id);
      counterSettings.selectedCounterIds = preset.counters.slice();
      pathPhase = 2;
    }
    if (preset && pathStep.module === 'arimasu-imasu' && preset.category && Array.isArray(mod.categories)) {
      const cat = mod.categories.find(c => c.id === preset.category);
      if (cat) {
        const base = {};
        Object.keys(mod.verbEngine.bases).forEach(id => { base[id] = cat.baseIds.indexOf(id) >= 0; });
        matrixState.filters.base = base;
        mod.categories.forEach(c => { c._uiOn = (c.id === cat.id); });
        if (cat.baseIds[0]) demoState.baseId = cat.baseIds[0];
        pathPhase = 2;
      }
    }

    populateHero(mod);
    setupPhaseTabs(mod);
    renderPhase(mod, 1);
    loadingEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    document.title = `${mod.title} — NihonCore`;
    if (pathPhase > 1) document.querySelector('.phase-tab[data-phase="' + pathPhase + '"]')?.click();
  }
}


/* ====================================================
   4. PRACTICE PAGE — Mondat-Mester (practice.html) ─
   ==================================================== */

function initPracticePage() {

  // ── State ────────────────────────────────────────
  const lobbyState = {
    level: 'N5',
    mode:  'particles',
    filters: {
      function: { Affirmative: true, Negative: true, Question: true },
      tense:    { 'Non-Past': true, 'Past': true, 'Progressive': true },
      register: { Polite: true, Casual: true }
    },
    cardCount: 5
  };

  const runtimeState = {
    inLobby: true,
    cardIdx: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    cards: [],
    fillState: {},
    selectedParticle: null,
    results: []
  };

  const puzzleState = {
    trayIndices:   [],
    answerIndices: [],
    submitted: false
  };

  // ── Lobby ────────────────────────────────────────
  function attachLobbyHandlers() {
    document.querySelectorAll('.pl-level-btn').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        lobbyState.level = btn.dataset.level;
        document.querySelectorAll('.pl-level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateLobbyMatchCount();
      });
    });

    document.querySelectorAll('.pl-mode-btn').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        lobbyState.mode = btn.dataset.mode;
        document.querySelectorAll('.pl-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateLobbyMatchCount();   // a két mód készlete eltérhet
      });
    });

    document.querySelectorAll('.pl-f-btn').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        const dim = btn.dataset.dim;
        const val = btn.dataset.val;
        const isActive = btn.classList.contains('active');
        if (isActive) {
          const otherActive = Array.from(document.querySelectorAll(`.pl-f-btn[data-dim="${dim}"]:not(.pl-f-locked)`))
            .filter(b => b !== btn && b.classList.contains('active')).length;
          if (otherActive === 0) {
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);
            return;
          }
          btn.classList.remove('active');
          lobbyState.filters[dim][val] = false;
        } else {
          btn.classList.add('active');
          lobbyState.filters[dim][val] = true;
        }
        updateLobbyMatchCount();
      });
    });

    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        lobbyState.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('plCustomCount');
        if (custom) custom.value = '';
        updateLobbyMatchCount();
      });
    });

    const customInput = document.getElementById('plCustomCount');
    customInput.addEventListener('input', () => {
      const n = parseInt(customInput.value, 10);
      if (!isNaN(n) && n > 0) {
        const _max = filterSentences().length;
        const _v = (_max > 0 && n > _max) ? _max : n;
        if (_v !== n) customInput.value = String(_v);
        lobbyState.cardCount = _v;
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
      }
      updateLobbyMatchCount();
    });

    document.getElementById('plStart').addEventListener('click', startRound);
  }

  function updateLobbyMatchCount() {
    const pool     = filterSentences();
    const matchEl  = document.getElementById('lobbyMatchCount');
    const startBtn = document.getElementById('plStart');
    matchEl.textContent  = pool.length;
    startBtn.textContent = `Indítás — ${lobbyState.cardCount} kártya`;
    startBtn.disabled    = pool.length === 0 || lobbyState.cardCount < 1;
  }

  // A lobby Funkció-szűrője 3 értéket ismer (Állító/Tagadó/Kérdő), de az N4
  // batchek metadata.function mezője ~70-féle részletes címke
  // ('Desire', 'Condition (Tara)', 'Permission (Asking)' …). Ezeket a 3 alap-
  // kategóriára képezzük le — különben a szűrő mindet kidobná.
  function sentenceFunction(s) {
    const f = s.metadata.function || '';
    if (f === 'Affirmative' || f === 'Negative' || f === 'Question') return f;
    if (/Negative/.test(f))         return 'Negative';
    if (/Question|Asking/.test(f))  return 'Question';
    return 'Affirmative';
  }

  // A mondat-metaadat angol kulcsai → magyar címke a kártya fejlécében
  const META_LABELS = {
    Affirmative: 'Állító', Negative: 'Tagadó', Question: 'Kérdő',
    'Non-Past': 'Jelen / jövő', Past: 'Múlt', Progressive: 'Folyamatos',
    Polite: 'Udvarias', Casual: 'Bizalmas'
  };
  const metaLabel = v => META_LABELS[v] || v;

  // Tanulási út: a lépés megszabhatja, mely partikulák szerepeljenek a körben
  // Tanulási út: a lépés az s_n5_NNN mondatok egy tartományára (idRanges)
  // vagy felsorolt mondatokra (ids) szűkítheti a kört
  function matchesIdRanges(s) {
    if (lobbyState.ids) return lobbyState.ids.indexOf(s.id) >= 0;
    // Út-lépésben a leckéhez kötött mondatok (lesson mező) csak a saját, felsorolt lépésükben
    // szerepelnek: az általános lépések (első mondatok, szórend) köre nem telik meg későbbi anyaggal.
    if (lobbyState.inStep && s.lesson) return false;
    const ranges = lobbyState.idRanges;
    if (!ranges) return true;
    const m = /^s_n5_(\d+)$/.exec(s.id || '');
    if (!m) return false;
    const n = parseInt(m[1], 10);
    return ranges.some(r => n >= r[0] && n <= r[1]);
  }
  function matchesParticleFocus(s) {
    const only = lobbyState.particlesOnly, any = lobbyState.particlesAny;
    if (!only && !any) return true;
    const ps = s.tokens.filter(t => t.type === 'particle').map(t => t.jp);
    if (only && !(ps.length > 0 && ps.every(p => only.indexOf(p) >= 0))) return false;
    if (any && !ps.some(p => any.indexOf(p) >= 0)) return false;
    return true;
  }

  // Partikula-mód: csak az a mondat kerülhet a körbe, amelyben van kitöltendő
  // partikula, és mindegyik szerepel a tálcán (különben a kártya megoldhatatlan).
  const TRAY_IDS = NIHONCORE_PARTICLES.map(p => p.id);
  function particleSolvable(s) {
    const ps = s.tokens.filter(t => t.type === 'particle');
    return ps.length > 0 && ps.every(t => TRAY_IDS.indexOf(t.romaji) >= 0);
  }

  function filterSentences() {
    return NIHONCORE_SENTENCES.filter(s => {
      if (s.level !== lobbyState.level) return false;
      if (lobbyState.mode === 'particles' && !particleSolvable(s)) return false;
      if (!matchesIdRanges(s)) return false;
      if (!matchesParticleFocus(s)) return false;
      if (!lobbyState.filters.function[sentenceFunction(s)]) return false;
      if (!lobbyState.filters.tense[s.metadata.tense])       return false;
      if (!lobbyState.filters.register[s.metadata.register]) return false;
      return true;
    });
  }

  function startRound() {
    const pool = filterSentences();
    if (pool.length === 0) return;

    // Keverés (Fisher–Yates), majd annyi mondat, amennyi a kör; ha a kör
    // hosszabb a készletnél, újrakevert körrel folytatjuk — mondat csak akkor
    // ismétlődik, ha elfogyott a készlet.
    const shuffled = () => {
      const a = pool.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    runtimeState.cards = [];
    while (runtimeState.cards.length < lobbyState.cardCount) {
      runtimeState.cards = runtimeState.cards.concat(shuffled());
    }
    runtimeState.cards.length = lobbyState.cardCount;
    runtimeState.inLobby = false;
    runtimeState.cardIdx = 0;
    runtimeState.score = 0;
    runtimeState.streak = 0;
    runtimeState.bestStreak = 0;
    runtimeState.results = [];
    runtimeState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'practice', mode: lobbyState.mode, results: runtimeState.results, score: runtimeState.score, startTs: runtimeState.roundStartTs }; });

    document.getElementById('practiceLobby').classList.add('hidden');
    document.getElementById('practiceRuntime').classList.remove('hidden');
    renderCurrentCard();
  }

  function renderCurrentCard() {
    if (lobbyState.mode === 'puzzle') renderPuzzleCard();
    else                              renderParticleCard();
  }

  // ── PARTIKULA-KITÖLTŐ mód ────────────────────────
  function renderParticleCard() {
    const sentence = runtimeState.cards[runtimeState.cardIdx];

    runtimeState.fillState = {};
    runtimeState.selectedParticle = null;
    sentence.tokens.forEach((tok, i) => {
      if (tok.type === 'particle') runtimeState.fillState[i] = null;
    });

    document.getElementById('prScore').textContent     = runtimeState.score;
    document.getElementById('prStreak').textContent    = `${runtimeState.streak} 🔥`;
    updatePracticeProgress();

    const cardEl = document.getElementById('prCard');
    cardEl.classList.remove('hidden'); // defensive
    cardEl.innerHTML = `
      <div class="prc-eyebrow">
        <span>${sentence.level}</span><span>·</span>
        <span>${metaLabel(sentenceFunction(sentence))}</span><span>·</span>
        <span>${metaLabel(sentence.metadata.tense)}</span>
      </div>
      <div class="prc-translation">
        <span class="prc-tr-label">Magyar jelentés:</span>
        <span class="prc-tr-text">${sentence.translation}</span>
      </div>
      <div class="prc-sentence" id="prcSentence">
        ${sentence.tokens.map((tok, i) => renderToken(tok, i)).join('')}
      </div>
      <div class="prc-tray">
        <div class="prc-tray-label">Partikula tálca <span class="prc-tray-hint">(húzd a slotba vagy kattints)</span></div>
        <div class="prc-tray-particles" id="prcTray">
          ${NIHONCORE_PARTICLES.map(p => renderTrayParticle(p)).join('')}
        </div>
      </div>
    `;

    document.getElementById('prActions').innerHTML =
      `<button class="btn btn-primary glow-effect prc-check" id="prcCheck" disabled>Ellenőrzés</button>`;
    document.getElementById('prFeedback').classList.add('hidden');
    document.getElementById('prFeedback').innerHTML = '';

    attachParticleHandlers(sentence);
    updateCheckButtonState();
  }

  function renderToken(tok, idx) {
    if (tok.type === 'particle') {
      return `
        <span class="prc-slot" data-slot-idx="${idx}" data-expected-id="${tok.romaji}">
          <span class="prc-slot-content">？</span>
        </span>
      `;
    }
    const cls = tok.type === 'verb' ? 'prc-verb' : 'prc-word';
    return `
      <span class="${cls}">
        <span class="prc-tok-jp">${tok.jp}</span>
        <span class="prc-tok-romaji">${tok.romaji}</span>
        ${tok.hu ? `<span class="prc-tok-hu">${tok.hu}</span>` : ''}
      </span>
    `;
  }

  function renderTrayParticle(p) {
    return `
      <button class="prc-particle" draggable="true"
              data-particle-id="${p.id}" data-particle-jp="${p.jp}" data-particle-romaji="${p.romaji}"
              title="${p.hint}">
        <span class="prc-p-jp">${p.jp}</span>
        <span class="prc-p-romaji">${p.romaji}</span>
      </button>
    `;
  }

  function attachParticleHandlers(sentence) {
    document.querySelectorAll('.prc-particle').forEach(p => {
      p.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/particle-id', p.dataset.particleId);
        e.dataTransfer.setData('text/particle-jp', p.dataset.particleJp);
        e.dataTransfer.setData('text/particle-romaji', p.dataset.particleRomaji);
        e.dataTransfer.effectAllowed = 'copy';
        p.classList.add('dragging');
      });
      p.addEventListener('dragend', () => p.classList.remove('dragging'));
      p.addEventListener('click', () => {
        if (runtimeState.selectedParticle === p.dataset.particleId) {
          runtimeState.selectedParticle = null;
          p.classList.remove('selected');
        } else {
          document.querySelectorAll('.prc-particle.selected').forEach(x => x.classList.remove('selected'));
          runtimeState.selectedParticle = p.dataset.particleId;
          p.classList.add('selected');
        }
      });
    });

    document.querySelectorAll('.prc-slot').forEach(slot => {
      slot.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        slot.classList.add('drag-over');
      });
      slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
      slot.addEventListener('drop', e => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        const particleId     = e.dataTransfer.getData('text/particle-id');
        const particleJp     = e.dataTransfer.getData('text/particle-jp');
        const particleRomaji = e.dataTransfer.getData('text/particle-romaji');
        fillSlot(slot, { id: particleId, jp: particleJp, romaji: particleRomaji });
      });

      slot.addEventListener('click', () => {
        if (slot.classList.contains('checked-correct') || slot.classList.contains('checked-wrong')) return;
        const slotIdx = parseInt(slot.dataset.slotIdx, 10);
        const filled  = runtimeState.fillState[slotIdx];

        if (filled && !runtimeState.selectedParticle) {
          clearSlot(slot, slotIdx);
          return;
        }
        if (runtimeState.selectedParticle) {
          const p = NIHONCORE_PARTICLES.find(x => x.id === runtimeState.selectedParticle);
          if (p) fillSlot(slot, { id: p.id, jp: p.jp, romaji: p.romaji });
        }
      });
    });

    document.getElementById('prcCheck').addEventListener('click', () => checkAnswer(sentence));
  }

  function fillSlot(slot, particle) {
    const slotIdx = parseInt(slot.dataset.slotIdx, 10);
    runtimeState.fillState[slotIdx] = particle.id;
    slot.classList.add('filled');
    slot.innerHTML = `
      <span class="prc-slot-content prc-filled-content">
        <span class="prc-filled-jp">${particle.jp}</span>
        <span class="prc-filled-romaji">${particle.romaji}</span>
      </span>
    `;
    updateCheckButtonState();
  }

  function clearSlot(slot, slotIdx) {
    runtimeState.fillState[slotIdx] = null;
    slot.classList.remove('filled');
    slot.innerHTML = `<span class="prc-slot-content">？</span>`;
    updateCheckButtonState();
  }

  function updateCheckButtonState() {
    const allFilled = Object.values(runtimeState.fillState).every(v => v !== null);
    document.getElementById('prcCheck').disabled = !allFilled;
  }

  function checkAnswer(sentence) {
    const perSlot = [];
    let allCorrect = true;

    document.querySelectorAll('.prc-slot').forEach(slot => {
      const slotIdx    = parseInt(slot.dataset.slotIdx, 10);
      const expectedId = slot.dataset.expectedId;
      const fillId     = runtimeState.fillState[slotIdx];
      const ok         = fillId === expectedId;
      perSlot.push({ slotIdx, expectedId, fillId, ok });
      if (!ok) allCorrect = false;
      slot.classList.add(ok ? 'checked-correct' : 'checked-wrong');
    });

    runtimeState.results.push({ cardIdx: runtimeState.cardIdx, allCorrect, perSlot });

    if (allCorrect) {
      runtimeState.score += 10;
      runtimeState.streak++;
      runtimeState.bestStreak = Math.max(runtimeState.bestStreak, runtimeState.streak);
    } else {
      runtimeState.streak = 0;
    }

    document.getElementById('prScore').textContent  = runtimeState.score;
    document.getElementById('prStreak').textContent = `${runtimeState.streak} 🔥`;

    document.querySelectorAll('.prc-particle').forEach(b => b.disabled = true);
    renderFeedback(sentence, perSlot, allCorrect);
  }

  function renderFeedback(sentence, perSlot, allCorrect) {
    const fbEl = document.getElementById('prFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.toggle('pr-fb-correct', allCorrect);
    fbEl.classList.toggle('pr-fb-wrong', !allCorrect);

    const headerHtml = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${allCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${allCorrect ? 'Tökéletes!' : 'Volt hiba — itt vannak a részletek:'}</span>
      </div>
    `;

    const slotExplanations = perSlot.filter(s => !s.ok).map(s => analyseSlotError(sentence, s)).join('');

    const correctSentence = sentence.tokens.map(t => t.jp).join('');
    const correctRomaji   = sentence.tokens.map(t =>
      t.type === 'particle' ? `<span class="prc-correct-particle">${t.romaji}</span>` : t.romaji
    ).join(' ');

    fbEl.innerHTML = `
      ${headerHtml}
      ${slotExplanations}
      <div class="pr-fb-correct-form">
        <div class="pr-fb-cf-label">Helyes mondat:</div>
        <div class="pr-fb-cf-jp">${correctSentence}</div>
        <div class="pr-fb-cf-romaji">${correctRomaji}</div>
      </div>
    `;

    const isLast = runtimeState.cardIdx + 1 >= runtimeState.cards.length;
    document.getElementById('prActions').innerHTML = `
      <button class="btn btn-primary glow-effect prc-next" id="prcNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('prcNext').addEventListener('click', advanceRound);
  }

  function analyseSlotError(sentence, slotResult) {
    const expectedToken    = sentence.tokens[slotResult.slotIdx];
    const expectedRole     = expectedToken.role;
    const expectedParticle = NIHONCORE_PARTICLES.find(p => p.id === slotResult.expectedId);
    const placedParticle   = NIHONCORE_PARTICLES.find(p => p.id === slotResult.fillId);

    const verbToken  = sentence.tokens.find(t => t.type === 'verb');
    const verbRomaji = verbToken ? verbToken.romaji : '';

    const rule = PARTICLE_ERROR_RULES.find(r => {
      if (r.putParticle !== slotResult.fillId) return false;
      if (r.expectedRole && r.expectedRole !== expectedRole) return false;
      if (r.expectedParticle && r.expectedParticle !== slotResult.expectedId) return false;
      if (r.onlyIfVerbContains) {
        const matches = r.onlyIfVerbContains.some(v => verbRomaji.includes(v));
        if (!matches) return false;
      }
      return true;
    });

    const contextExplain = explainRoleInSentence(expectedRole, sentence, slotResult.slotIdx, expectedParticle);

    return `
      <div class="pr-fb-slot">
        <div class="pr-fb-slot-head">
          <span class="pr-fb-slot-mark">✗</span>
          <span class="pr-fb-slot-pos">
            Slot ${slotResult.slotIdx + 1}: te <em>${placedParticle.jp}</em>-t választottál →
            helyes <strong>${expectedParticle.jp}</strong>
          </span>
        </div>
        <div class="pr-fb-explain">
          <div class="pfe-row pfe-wrong">
            <span class="pfe-label">Miért nem jó?</span>
            <span class="pfe-text">
              A választott <strong class="pfe-jp-wrong">${placedParticle.jp}</strong>
              <span class="pfe-roman">(${placedParticle.romaji})</span>
              ${placedParticle.fullExplain} — itt nem ez kell.
            </span>
          </div>
          <div class="pfe-row pfe-correct">
            <span class="pfe-label">Mi a helyes?</span>
            <span class="pfe-text">
              <strong class="pfe-jp-ok">${expectedParticle.jp}</strong>
              <span class="pfe-roman">(${expectedParticle.romaji})</span>
              — ${expectedParticle.fullExplain}.
            </span>
          </div>
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Miért itt?</span>
            <span class="pfe-text">${contextExplain}</span>
          </div>
          ${rule ? `
            <div class="pfe-row pfe-rule">
              <span class="pfe-label">Plusz</span>
              <span class="pfe-text">${rule.message}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function explainRoleInSentence(role, sentence, slotIdx, expectedParticle) {
    let nounToken = null;
    for (let i = slotIdx - 1; i >= 0; i--) {
      if (sentence.tokens[i].type === 'word') {
        nounToken = sentence.tokens[i];
        break;
      }
    }
    const nounHu = nounToken && nounToken.hu ? nounToken.hu : '?';
    const verbToken = sentence.tokens.find(t => t.type === 'verb');
    const verbHu = verbToken && verbToken.hu ? verbToken.hu : 'a cselekvés';
    const expJp = expectedParticle.jp;

    switch (role) {
      case 'topic':      return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" itt a mondat témája — róla beszélünk.`;
      case 'subject':    return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" itt új vagy hangsúlyos információ — fókuszt jelöl.`;
      case 'object':     return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" itt a közvetlen tárgy: amit ${verbHu}.`;
      case 'location':   return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" jelöli a helyszínt, ahol ${verbHu}.`;
      case 'goal':       return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" a cselekvés célpontja: ahova/akihez ${verbHu}.`;
      case 'tool':       return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" az eszköz, amivel ${verbHu}.`;
      case 'direction':  return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" jelöli az irányt, amerre ${verbHu}.`;
      case 'companion':  return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" a társ, akivel együtt ${verbHu}.`;
      case 'possession': return `A <strong>${expJp}</strong> azért helyes, mert "<em>${nounHu}</em>" birtokos kapcsolatban áll a következő szóval.`;
      default:           return `A <strong>${expJp}</strong> a megfelelő partikula ezen a helyen.`;
    }
  }

  function advanceRound() {
    runtimeState.cardIdx++;
    if (runtimeState.cardIdx >= runtimeState.cards.length) {
      showRoundSummary();
    } else {
      renderCurrentCard();
      document.getElementById('prFeedback').classList.add('hidden');
      NihonCoreRound.scrollToRound();
    }
  }

  function showRoundSummary() {
    NihonCoreStats.recordSession({
      module: 'practice', mode: lobbyState.mode,
      results: runtimeState.results, score: runtimeState.score,
      startTs: runtimeState.roundStartTs
    });
    const total   = runtimeState.results.length;
    const correct = runtimeState.results.filter(r => r.allCorrect).length;
    const pct     = Math.round((correct / total) * 100);

    document.getElementById('prCard').classList.add('hidden');
    document.getElementById('prActions').innerHTML = '';
    document.getElementById('prFeedback').classList.add('hidden');

    const summaryEl = document.getElementById('prSummary');
    summaryEl.classList.remove('hidden');
    summaryEl.classList.add('glass-panel-heavy');
    summaryEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 60 ? '🎯' : '🌱'}</div>
      <h3>Kör vége</h3>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pontszám</span><span class="sf-value">${runtimeState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Helyes</span><span class="sf-value">${correct}/${total} <small>(${pct}%)</small></span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${runtimeState.bestStreak} 🔥</span></div>
        <div class="sd-final-stat"><span class="sf-label">Mód</span><span class="sf-value">${lobbyState.mode === 'particles' ? 'Partikula' : 'Puzzle'}</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="prRestart">Új kör</button>
    `;
    document.getElementById('prRestart').addEventListener('click', backToLobby);
  }

  function backToLobby() {
    runtimeState.inLobby = true;
    runtimeState.cardIdx = 0;
    runtimeState.score   = 0;
    runtimeState.streak  = 0;
    runtimeState.results = [];
    runtimeState.cards   = [];

    document.getElementById('prCard').classList.remove('hidden');
    document.getElementById('prCard').innerHTML = '';
    document.getElementById('prSummary').classList.add('hidden');
    document.getElementById('prSummary').innerHTML = '';
    document.getElementById('practiceRuntime').classList.add('hidden');
    document.getElementById('practiceLobby').classList.remove('hidden');
  }

  // ── MONDAT-PUZZLE mód (drag-to-reorder) ──────────
  function renderPuzzleCard() {
    const sentence = runtimeState.cards[runtimeState.cardIdx];

    puzzleState.trayIndices   = shuffleIndices(sentence.tokens.length);
    puzzleState.answerIndices = [];
    puzzleState.submitted     = false;

    document.getElementById('prScore').textContent     = runtimeState.score;
    document.getElementById('prStreak').textContent    = `${runtimeState.streak} 🔥`;
    updatePracticeProgress();

    const cardEl = document.getElementById('prCard');
    cardEl.classList.remove('hidden');
    cardEl.innerHTML = `
      <div class="prc-eyebrow">
        <span>${sentence.level}</span><span>·</span>
        <span>${metaLabel(sentenceFunction(sentence))}</span><span>·</span>
        <span>${metaLabel(sentence.metadata.tense)}</span><span>·</span>
        <span>${metaLabel(sentence.metadata.register)}</span>
      </div>
      <div class="prc-translation">
        <span class="prc-tr-label">Magyar jelentés:</span>
        <span class="prc-tr-text">${sentence.translation}</span>
      </div>
      <div class="pp-section-label">Válasz-terület — húzd ide sorrendbe</div>
      <div class="pp-answer-area" id="ppAnswer"></div>
      <div class="pp-section-label">Tokenek (kevert sorrend)</div>
      <div class="pp-tray-area" id="ppTray"></div>
    `;

    document.getElementById('prActions').innerHTML =
      `<button class="btn btn-primary glow-effect prc-check" id="ppCheck" disabled>Ellenőrzés</button>`;
    document.getElementById('prFeedback').classList.add('hidden');
    document.getElementById('prFeedback').innerHTML = '';

    attachPuzzleContainerListeners(sentence);
    renderPuzzleAreas(sentence);
    attachPuzzleTokenListeners(sentence);
  }

  function shuffleIndices(n) {
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderPuzzleAreas(sentence) {
    const trayEl   = document.getElementById('ppTray');
    const answerEl = document.getElementById('ppAnswer');

    trayEl.innerHTML = puzzleState.trayIndices.length
      ? puzzleState.trayIndices.map(i => renderPuzzleToken(sentence.tokens[i], i, 'tray')).join('')
      : `<div class="pp-empty-msg">Üres tálca — minden token a válasz-területen van.</div>`;

    answerEl.innerHTML = puzzleState.answerIndices.length
      ? puzzleState.answerIndices.map(i => renderPuzzleToken(sentence.tokens[i], i, 'answer')).join('')
      : `<div class="pp-empty-msg">← Kattints / húzz ide tokent →</div>`;

    const checkBtn = document.getElementById('ppCheck');
    if (checkBtn) checkBtn.disabled = puzzleState.answerIndices.length !== sentence.tokens.length;
  }

  function renderPuzzleToken(tok, idx, area) {
    const typeClass = `pp-tok-${tok.type}`;
    const draggable = puzzleState.submitted ? 'false' : 'true';
    return `
      <button class="pp-token ${typeClass}" draggable="${draggable}" data-token-idx="${idx}" data-area="${area}">
        <span class="pp-tok-jp">${tok.jp}</span>
        <span class="pp-tok-romaji">${tok.romaji}</span>
        ${tok.hu ? `<span class="pp-tok-hu">${tok.hu}</span>` : ''}
      </button>
    `;
  }

  function attachPuzzleContainerListeners(sentence) {
    const trayEl   = document.getElementById('ppTray');
    const answerEl = document.getElementById('ppAnswer');

    if (answerEl) {
      answerEl.addEventListener('dragover', e => {
        if (puzzleState.submitted) return;
        e.preventDefault();
        answerEl.classList.add('drag-over');
      });
      answerEl.addEventListener('dragleave', e => {
        if (answerEl.contains(e.relatedTarget)) return;
        answerEl.classList.remove('drag-over');
      });
      answerEl.addEventListener('drop', e => {
        e.preventDefault();
        answerEl.classList.remove('drag-over');
        const tokenIdx = parseInt(e.dataTransfer.getData('text/token-idx'), 10);
        const source   = e.dataTransfer.getData('text/source');
        if (Number.isNaN(tokenIdx)) return;
        const insertAt = computeInsertIndex(answerEl, e.clientX);

        if (source === 'tray') {
          if (puzzleState.answerIndices.includes(tokenIdx)) return;
          puzzleState.trayIndices = puzzleState.trayIndices.filter(i => i !== tokenIdx);
          puzzleState.answerIndices.splice(insertAt, 0, tokenIdx);
        } else if (source === 'answer') {
          const oldIdx = puzzleState.answerIndices.indexOf(tokenIdx);
          if (oldIdx === -1) return;
          puzzleState.answerIndices.splice(oldIdx, 1);
          const adj = oldIdx < insertAt ? insertAt - 1 : insertAt;
          puzzleState.answerIndices.splice(adj, 0, tokenIdx);
        }
        renderPuzzleAreas(sentence);
        attachPuzzleTokenListeners(sentence);
      });
    }

    if (trayEl) {
      trayEl.addEventListener('dragover', e => {
        if (puzzleState.submitted) return;
        e.preventDefault();
        trayEl.classList.add('drag-over');
      });
      trayEl.addEventListener('dragleave', e => {
        if (trayEl.contains(e.relatedTarget)) return;
        trayEl.classList.remove('drag-over');
      });
      trayEl.addEventListener('drop', e => {
        e.preventDefault();
        trayEl.classList.remove('drag-over');
        const tokenIdx = parseInt(e.dataTransfer.getData('text/token-idx'), 10);
        const source   = e.dataTransfer.getData('text/source');
        if (Number.isNaN(tokenIdx)) return;
        if (source === 'answer') {
          if (puzzleState.trayIndices.includes(tokenIdx)) return;
          moveToTray(tokenIdx);
          renderPuzzleAreas(sentence);
          attachPuzzleTokenListeners(sentence);
        }
      });
    }

    const checkBtn = document.getElementById('ppCheck');
    if (checkBtn) checkBtn.addEventListener('click', () => checkPuzzle(sentence));
  }

  function attachPuzzleTokenListeners(sentence) {
    document.querySelectorAll('.pp-token').forEach(tok => {
      tok.addEventListener('dragstart', e => {
        if (puzzleState.submitted) { e.preventDefault(); return; }
        e.dataTransfer.setData('text/token-idx', tok.dataset.tokenIdx);
        e.dataTransfer.setData('text/source', tok.dataset.area);
        e.dataTransfer.effectAllowed = 'move';
        tok.classList.add('dragging');
      });
      tok.addEventListener('dragend', () => tok.classList.remove('dragging'));
      tok.addEventListener('click', () => {
        if (puzzleState.submitted) return;
        const idx = parseInt(tok.dataset.tokenIdx, 10);
        if (tok.dataset.area === 'tray') {
          if (puzzleState.answerIndices.includes(idx)) return;
          moveToAnswer(idx);
        } else {
          if (puzzleState.trayIndices.includes(idx)) return;
          moveToTray(idx);
        }
        renderPuzzleAreas(sentence);
        attachPuzzleTokenListeners(sentence);
      });
    });
  }

  function moveToAnswer(idx) {
    puzzleState.trayIndices = puzzleState.trayIndices.filter(i => i !== idx);
    if (!puzzleState.answerIndices.includes(idx)) puzzleState.answerIndices.push(idx);
  }

  function moveToTray(idx) {
    puzzleState.answerIndices = puzzleState.answerIndices.filter(i => i !== idx);
    if (!puzzleState.trayIndices.includes(idx)) puzzleState.trayIndices.push(idx);
  }

  function computeInsertIndex(container, clientX) {
    const tokens = Array.from(container.querySelectorAll('.pp-token'));
    for (let i = 0; i < tokens.length; i++) {
      const rect = tokens[i].getBoundingClientRect();
      if (clientX < rect.left + rect.width / 2) return i;
    }
    return tokens.length;
  }

  // ── Puzzle validátor: a közös NihonCorePuzzle modulban él (a dolgozatok is azt használják) ──
  const validatePuzzle = window.NihonCorePuzzle.validate;

  function checkPuzzle(sentence) {
    const result = validatePuzzle(puzzleState.answerIndices, sentence);
    puzzleState.submitted = true;

    runtimeState.results.push({
      cardIdx: runtimeState.cardIdx,
      allCorrect: result.valid,
      perSlot: [],
      puzzleResult: result
    });

    if (result.valid) {
      runtimeState.score += 15;
      runtimeState.streak++;
      runtimeState.bestStreak = Math.max(runtimeState.bestStreak, runtimeState.streak);
    } else {
      runtimeState.streak = 0;
    }

    document.getElementById('prScore').textContent  = runtimeState.score;
    document.getElementById('prStreak').textContent = `${runtimeState.streak} 🔥`;

    document.querySelectorAll('.pp-token').forEach(tok => {
      tok.draggable = false;
      tok.classList.add(result.valid ? 'pp-correct' : 'pp-wrong');
    });

    renderPuzzleFeedback(sentence, result);
  }

  function renderPuzzleFeedback(sentence, result) {
    const fbEl = document.getElementById('prFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.toggle('pr-fb-correct', result.valid);
    fbEl.classList.toggle('pr-fb-wrong', !result.valid);

    const correctSentence = sentence.tokens.map(t => t.jp).join('');
    const correctRomaji = sentence.tokens.map(t =>
      t.type === 'particle' ? `<span class="prc-correct-particle">${t.romaji}</span>` : t.romaji
    ).join(' ');

    if (result.valid) {
      fbEl.innerHTML = `
        <div class="pr-fb-header">
          <span class="pr-fb-mark">🎉</span>
          <span class="pr-fb-title">Helyes mondat-szerkezet!</span>
        </div>
        <div class="pr-fb-correct-form">
          <div class="pr-fb-cf-label">A te verziód</div>
          <div class="pr-fb-cf-jp">${puzzleState.answerIndices.map(i => sentence.tokens[i].jp).join('')}</div>
          <div class="pr-fb-cf-romaji">${puzzleState.answerIndices.map(i => sentence.tokens[i].romaji).join(' ')}</div>
        </div>
      `;
    } else {
      fbEl.innerHTML = `
        <div class="pr-fb-header">
          <span class="pr-fb-mark">⚠️</span>
          <span class="pr-fb-title">${getPuzzleErrorTitle(result.errorType)}</span>
        </div>
        <div class="pr-fb-explain">
          <div class="pfe-row pfe-wrong">
            <span class="pfe-label">Mi a baj?</span>
            <span class="pfe-text">${result.message}</span>
          </div>
          ${result.hint ? `
            <div class="pfe-row pfe-context">
              <span class="pfe-label">Tipp</span>
              <span class="pfe-text">${result.hint}</span>
            </div>
          ` : ''}
        </div>
        <div class="pr-fb-correct-form">
          <div class="pr-fb-cf-label">Egy helyes alak</div>
          <div class="pr-fb-cf-jp">${correctSentence}</div>
          <div class="pr-fb-cf-romaji">${correctRomaji}</div>
        </div>
      `;
    }

    const isLast = runtimeState.cardIdx + 1 >= runtimeState.cards.length;
    document.getElementById('prActions').innerHTML = `
      <button class="btn btn-primary glow-effect prc-next" id="prcNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('prcNext').addEventListener('click', advanceRound);
  }

  function getPuzzleErrorTitle(type) {
    switch (type) {
      case 'incomplete':              return 'Hiányos megoldás';
      case 'verb_not_at_end':         return 'Az ige nincs a mondat végén';
      case 'verb_in_middle':          return 'Az ige rossz helyen áll';
      case 'particle_first':          return 'Partikula a mondat elején';
      case 'particle_after_verb':     return 'Partikula az ige után';
      case 'particle_after_particle': return 'Két partikula egymás után';
      case 'pair_broken':             return 'Felbontott főnév-partikula pár';
      case 'predicate_order':         return 'Az állítmány szavai nem a mondat végén állnak';
      default:                        return 'Hibás sorrend';
    }
  }

  // ── Practice runtime helpers ─────────────────────
  function updatePracticeProgress() {
    const total = runtimeState.cards.length;
    const cur = runtimeState.cardIdx;
    const cc = document.getElementById('prCardCount');
    if (cc) cc.textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('prProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;
  }

  function exitPracticeRound() {
    if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
      'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
      '')) return;
    if (window.NihonCoreRound) NihonCoreRound.flush();   // practice-nek nincs .module-hero observer
    backToLobby();
  }

  // ── INIT ─────────────────────────────────────────
  attachLobbyHandlers();
  updateLobbyMatchCount();

  // Tanulási út: a lépés köre (szint, mód, partikula-fókusz) a lobbira
  (function applyPathPreset() {
    const step = window.NihonCorePath && NihonCorePath.activeStep();
    const p = step && step.module === 'practice' && step.preset;
    if (!p) return;
    lobbyState.inStep = true;
    if (p.particlesOnly) lobbyState.particlesOnly = p.particlesOnly;
    if (p.particlesAny)  lobbyState.particlesAny  = p.particlesAny;
    if (p.idRanges)      lobbyState.idRanges      = p.idRanges;
    if (p.ids)           lobbyState.ids           = p.ids;
    if (p.level) document.querySelector('.pl-level-btn[data-level="' + p.level + '"]')?.click();
    if (p.mode)  document.querySelector('.pl-mode-btn[data-mode="' + p.mode + '"]')?.click();
    // Felsorolt mondatoknál a kör a teljes készletet végigveszi (legfeljebb 10 mondat)
    if (p.ids) {
      const n = Math.min(10, filterSentences().length);
      if (n > 0) {
        lobbyState.cardCount = n;
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.count, 10) === n));
        const custom = document.getElementById('plCustomCount');
        if (custom) custom.value = document.querySelector('.ml-count-btn.active') ? '' : String(n);
      }
    }
    updateLobbyMatchCount();
  })();

  // Kilépés gomb a statikus HTML-ben
  const exitBtn = document.getElementById('prExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!runtimeState.inLobby) exitPracticeRound();
    });
  }
}


/* ====================================================
   5. AUTH PAGES (login.html + register.html) ──────
   ==================================================== */

function initAuthPages() {

  // Shake CSS injection (auth-only animáció)
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60%  { transform: translateX(-6px); }
      40%,80%  { transform: translateX(6px); }
    }
    .shake { animation: shake 0.4s ease; }
  `;
  document.head.appendChild(shakeStyle);

  // Password visibility toggle
  const togglePw = document.getElementById('togglePw');
  const pwInput  = document.getElementById('password');
  const eyeIcon  = document.getElementById('eyeIcon');

  const eyeOpen   = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>`;
  const eyeClosed = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

  if (togglePw && pwInput && eyeIcon) {
    togglePw.addEventListener('click', () => {
      const isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      eyeIcon.innerHTML = isPassword ? eyeClosed : eyeOpen;
    });
  }

  // Password strength (register only)
  const pwStrength = document.getElementById('pwStrength');
  const bars       = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4'),
  ];
  const pwLabel = document.getElementById('pwLabel');

  function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, score);
  }
  const strengthLabels  = ['Gyenge', 'Közepes', 'Erős', 'Nagyon erős'];
  const strengthClasses = ['weak', 'fair', 'good', 'strong'];

  if (pwInput && pwStrength && bars.length && bars[0]) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      if (!val) {
        bars.forEach(b => { b.className = 'pw-bar'; });
        if (pwLabel) pwLabel.textContent = 'Jelszó erőssége';
        return;
      }
      const score = getStrength(val);
      bars.forEach((b, i) => {
        b.className = 'pw-bar' + (i < score ? ' ' + strengthClasses[score - 1] : '');
      });
      if (pwLabel) pwLabel.textContent = strengthLabels[score - 1] || '';
    });
  }

  // Password confirm check (register only)
  const pwConfirm  = document.getElementById('passwordConfirm');
  const pwMatchErr = document.getElementById('pwMatchError');

  if (pwConfirm && pwMatchErr) {
    pwConfirm.addEventListener('input', () => {
      if (pwInput && pwConfirm.value && pwConfirm.value !== pwInput.value) {
        pwMatchErr.classList.remove('hidden');
        pwConfirm.classList.add('error');
      } else {
        pwMatchErr.classList.add('hidden');
        pwConfirm.classList.remove('error');
      }
    });
  }

  function shakeForm() {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
  }

  // ── V16: Firebase auth integráció ────────────────────
  const AUTH = window.NihonCoreAuth;

  // Univerzális hiba-megjelenítő az auth-kártyán
  function showAuthError(msg) {
    let box = document.getElementById('authErrorBox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'authErrorBox';
      box.className = 'auth-error-box';
      const form = document.querySelector('.auth-form');
      if (form) form.insertBefore(box, form.firstChild);
    }
    box.textContent = msg;
    box.classList.add('visible');
    shakeForm();
  }
  function clearAuthError() {
    const box = document.getElementById('authErrorBox');
    if (box) box.classList.remove('visible');
  }
  // Sikeres belépés/regisztráció után — vissza az indexre
  function redirectAfterAuth() {
    window.location.href = '../index.html';
  }

  // Login gomb — valós Firebase
  const loginBtn    = document.getElementById('loginBtn');
  const loginLoader = document.getElementById('loginLoader');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      clearAuthError();
      const email = document.getElementById('email')?.value?.trim();
      const pw    = document.getElementById('password')?.value;
      if (!email || !pw) { shakeForm(); return; }
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      const btnText = loginBtn.querySelector('.btn-text');
      const orig = btnText ? btnText.textContent : '';
      if (btnText) btnText.textContent = 'Bejelentkezés...';
      if (loginLoader) loginLoader.classList.remove('hidden');
      loginBtn.disabled = true; loginBtn.style.opacity = '0.8';
      try {
        await AUTH.login(email, pw);
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        if (btnText) btnText.textContent = orig || 'Bejelentkezés';
        if (loginLoader) loginLoader.classList.add('hidden');
        loginBtn.disabled = false; loginBtn.style.opacity = '';
      }
    });
  }

  // Register gomb — valós Firebase
  const registerBtn    = document.getElementById('registerBtn');
  const registerLoader = document.getElementById('registerLoader');
  if (registerBtn) {
    registerBtn.addEventListener('click', async () => {
      clearAuthError();
      const terms = document.getElementById('terms');
      if (terms && !terms.checked) {
        terms.closest('.form-check')?.classList.add('shake');
        setTimeout(() => terms.closest('.form-check')?.classList.remove('shake'), 500);
        return;
      }
      const email = document.getElementById('email')?.value?.trim();
      const pw  = document.getElementById('password')?.value;
      const pc  = document.getElementById('passwordConfirm')?.value;
      const fname = document.getElementById('firstname')?.value?.trim() || '';
      const lname = document.getElementById('lastname')?.value?.trim() || '';
      if (!email || !pw) { shakeForm(); return; }
      if (pw && pc && pw !== pc) {
        if (pwMatchErr) pwMatchErr.classList.remove('hidden');
        return;
      }
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      const btnText = registerBtn.querySelector('.btn-text');
      const orig = btnText ? btnText.textContent : '';
      if (btnText) btnText.textContent = 'Regisztrálás...';
      if (registerLoader) registerLoader.classList.remove('hidden');
      registerBtn.disabled = true; registerBtn.style.opacity = '0.8';
      try {
        const displayName = (fname + ' ' + lname).trim() || email.split('@')[0];
        await AUTH.register(email, pw, displayName);
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        if (btnText) btnText.textContent = orig || 'Regisztráció';
        if (registerLoader) registerLoader.classList.add('hidden');
        registerBtn.disabled = false; registerBtn.style.opacity = '';
      }
    });
  }

  // Google gomb — valós Firebase popup
  document.querySelectorAll('#googleBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      clearAuthError();
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      btn.disabled = true; btn.style.opacity = '0.8';
      try {
        await AUTH.loginGoogle();
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        btn.disabled = false; btn.style.opacity = '';
      }
    });
  });

  // Input focus icon color
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.input-wrapper')?.querySelector('.input-icon')?.setAttribute('style', 'color: var(--gold)');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.closest('.input-wrapper')?.querySelector('.input-icon')?.setAttribute('style', '');
      }
    });
  });
}


/* ====================================================
   6. CONJUGATION PAGE — Ragozó modul (V2.0 P1) ─────
   ────────────────────────────────────────────────────
   Architektúra:
     • Engine (closure-private, DOM-mentes):
         VerbDetector · StemEngine · MasuNaiEngine · TeTaEngine
         ExerciseGenerator · FeedbackEngine
     • UI (renderers + handlers): Lobby · Recognition · Mastery
     • Persistence: localStorage profile
   ==================================================== */

function initConjugationPage() {

  /* ─────────────────────────────────────────────────
     A) STATE (closure-scope) ──────────────────────── */

  const PROFILE_KEY = 'nihoncore_conj_profile_v1';
  const SETTINGS_KEY = 'nihoncore_conj_settings_v1';

  const drillSettings = mergeWithDefaults(loadSettings(), {
    groups:   { godan: true, ichidan: true, irregular: true },
    // V8: tematikus kategória-szűrő (6 user-tematika + daily)
    themes:   {
      // Kezdő alap: a leggyakoribb igék; a többi téma a Testreszabásban kapcsolható
      daily: true, movement: true, transitivity: false, clothing: false,
      giving: false, state: false, weather: false
    },
    forms:    {
      // Kezdő alap: az udvarias (masu) család; a bizalmas alakok kapcsolhatók
      masu: true, masen: true, mashita: true, masen_deshita: true,
      nai: false, te: false, ta: false,
      // P2 haladó (alapból kikapcsolva — explicit pipálás kell hozzá)
      potential: false, passive: false, causative: false,
      causative_passive: false, volitional: false
    },
    mode:     'recognition',   // 'recognition' | 'build' | 'mastery'
    adaptive: false,           // P2: hibás formák súlyozott újrahúzása
    cardCount: 8,
    timeLimit: 8000            // mastery módban / kártya
  });
  NihonCorePath.apply('conjugation', drillSettings);

  // Új forma-kulcsok megjelenésekor merge-eljük az alapot,
  // hogy a régi localStorage-bejegyzés ne hagyjon hiányzó kulcsokat
  function mergeWithDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    out.groups = { ...defaults.groups, ...(saved.groups || {}) };
    out.forms  = { ...defaults.forms,  ...(saved.forms  || {}) };
    return out;
  }

  const drillRunState = {
    inLobby: true,
    cards:   [],
    cardIdx: 0,
    score:   0,
    streak:  0,
    bestStreak: 0,
    results: [],
    submitted: false,
    userInput: '',
    chosenIdx: null,
    timerHandle: null,
    // V2.0 P2/2 — Build mód
    buildPick: { stemId: null, suffixIdx: null },
    buildData: null,
    // V2.0 P2/2 — Hint provider
    hintLevel: 0    // 0 = nincs hint, 1 = stem, 2 = stem+suffix
  };

  /* ─────────────────────────────────────────────────
     B) ENGINE — a ragozó motor a közös NihonCoreConj modulban él (a dolgozatok is azt használják) */
  const { VerbDetector, StemEngine, composeStemSuffix, composeTeTa, composeCausativePassive, conjugate } = window.NihonCoreConj;

  /* ─────────────────────────────────────────────────
     C) EXERCISE GENERATOR ─────────────────────────── */

  function getFilteredVerbs() {
    return NIHONCORE_VERBS.filter(v => {
      // group szűrő (godan/ichidan/irregular)
      if (!drillSettings.groups[v.group]) return false;
      // V8: theme szűrő — ha bármelyik theme aktív, csak azokat
      const t = v.theme || 'daily';
      const themes = drillSettings.themes || {};
      // Backward-compat: ha nincs themes objektum (régi localStorage), engedjük át
      if (Object.keys(themes).length === 0) return true;
      return themes[t] !== false;
    });
  }

  function getSelectedForms() {
    return Object.keys(drillSettings.forms).filter(f => drillSettings.forms[f]);
  }

  function countComboPool() {
    return getFilteredVerbs().length * getSelectedForms().length;
  }

  // Build mód által támogatott kombinációk:
  // - csak Godan / Ichidan (irregular kimarad)
  // - csak stemColumn-alapú formák (te/ta és causative_passive kimarad)
  function isBuildable(verb, formCode) {
    if (verb.group === 'irregular') return false;
    const rule = NIHONCORE_FORM_RULES[formCode];
    return !!(rule && rule.stemColumn);
  }

  // Adaptív súlyozás — minden (verb, form) kombináció kap egy weight-et.
  // weight = 1 + (1 - successRate) * 2  →  hibás formák ~3× gyakoribbak
  function getAdaptiveWeights(verbs, forms) {
    const profile = loadProfile();
    const verbWeights = verbs.map(v => {
      const gs = profile.groupStats[v.group] || { attempts: 0, correct: 0 };
      const rate = gs.attempts > 0 ? gs.correct / gs.attempts : 0.6;
      return { item: v, weight: 1 + (1 - rate) * 2 };
    });
    const formWeights = forms.map(f => {
      const fs = profile.formStats[f] || { attempts: 0, correct: 0 };
      const rate = fs.attempts > 0 ? fs.correct / fs.attempts : 0.6;
      return { item: f, weight: 1 + (1 - rate) * 2 };
    });
    return { verbWeights, formWeights };
  }

  function weightedPick(weightedList) {
    const total = weightedList.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of weightedList) {
      r -= x.weight;
      if (r <= 0) return x.item;
    }
    return weightedList[weightedList.length - 1].item;
  }

  function generateExerciseQueue(count) {
    let verbs = getFilteredVerbs();
    let forms = getSelectedForms();
    if (verbs.length === 0 || forms.length === 0) return [];

    // Build mód: szűkítsük a poolt a támogatott kombinációkra
    if (drillSettings.mode === 'build') {
      // Verbs which can be built with at least one selected form
      verbs = verbs.filter(v => forms.some(f => isBuildable(v, f)));
      forms = forms.filter(f => verbs.some(v => isBuildable(v, f)));
      if (verbs.length === 0 || forms.length === 0) return [];
    }

    // Adaptív súlyozás (csak akkor, ha be van pipálva ÉS van elég profil-adat)
    const profile = loadProfile();
    const useAdaptive = drillSettings.adaptive && profile.totalAttempts >= 10;
    const weights = useAdaptive ? getAdaptiveWeights(verbs, forms) : null;

    const queue = [];
    let attempts = 0;
    while (queue.length < count && attempts < count * 4) {
      attempts++;
      const verb     = useAdaptive ? weightedPick(weights.verbWeights) : verbs[Math.floor(Math.random() * verbs.length)];
      const formCode = useAdaptive ? weightedPick(weights.formWeights) : forms[Math.floor(Math.random() * forms.length)];

      // Build mód: csak buildable kombinációkat fogadunk el
      if (drillSettings.mode === 'build' && !isBuildable(verb, formCode)) continue;

      const expected = conjugate(verb, formCode);
      if (!expected) continue;

      const card = { verb, formCode, expected };
      if (drillSettings.mode === 'recognition') {
        card.options = generateDistractors(verb, formCode, expected);
      }
      if (drillSettings.mode === 'build') {
        card.buildData = buildBuildCardData(verb, formCode, expected);
      }
      queue.push(card);
    }
    return queue;
  }

  // ── BUILD MÓD — kártya-adat gyártás ────────────────
  function buildBuildCardData(verb, formCode, expected) {
    const rule = NIHONCORE_FORM_RULES[formCode];
    const correctSuffix = expected.morphemes.suffix; // {kana, romaji}

    let stemOptions = [];
    let correctStemId = null;

    if (verb.group === 'godan') {
      const stems = StemEngine.getStems(verb);
      for (const col of ['a','i','u','e','o']) {
        stemOptions.push({
          id: col,
          kana: stems[col].kana,
          romaji: stems[col].romaji,
          label: col.toUpperCase() + '-oszlop'
        });
      }
      correctStemId = expected.morphemes.column;
    } else if (verb.group === 'ichidan') {
      stemOptions.push({
        id: 'ichidan',
        kana: verb.stemKana,
        romaji: verb.stemRomaji,
        label: 'Ichidan tő'
      });
      correctStemId = 'ichidan';
    }

    // Suffix-bank: a helyes + 4-5 distraktor (más formák toldalékai)
    const suffixOptions = [{ ...correctSuffix, isCorrect: true, formCode }];
    const seenSuffixes = new Set([correctSuffix.kana]);

    const distractorForms = ['masu','masen','mashita','masen_deshita','nai','potential','passive','causative','volitional'];
    for (const f of distractorForms) {
      if (f === formCode) continue;
      if (suffixOptions.length >= 5) break;
      const r = NIHONCORE_FORM_RULES[f];
      if (!r) continue;
      const suf = (verb.group === 'ichidan' && r.ichidanSuffix) ? r.ichidanSuffix : r.suffix;
      if (!suf || seenSuffixes.has(suf.kana)) continue;
      suffixOptions.push({ ...suf, isCorrect: false, formCode: f });
      seenSuffixes.add(suf.kana);
    }

    // Shuffle suffix opciók (a stem-oszlopok rendezett a/i/u/e/o sorrendben maradnak)
    for (let i = suffixOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [suffixOptions[i], suffixOptions[j]] = [suffixOptions[j], suffixOptions[i]];
    }

    const correctSuffixIdx = suffixOptions.findIndex(s => s.isCorrect);

    return { stemOptions, suffixOptions, correctStemId, correctSuffixIdx };
  }

  // 4 opció (1 helyes + 3 morfológiailag releváns distraktor).
  // Pedagógiai szándék: a distraktorok ne random formák legyenek, hanem
  // tipikus hibák — másik forma, másik csoport mintát feltételezve, stb.
  function generateDistractors(verb, formCode, expected) {
    const distractors = [];
    const seen = new Set([expected.kana]);

    // 1) Ugyanennek az igének más formája (közeli forma)
    const otherForms = ['masu','masen','mashita','masen_deshita','nai','te','ta']
      .filter(f => f !== formCode);
    for (const f of otherForms) {
      if (distractors.length >= 1) break;
      const out = conjugate(verb, f);
      if (out && !seen.has(out.kana)) {
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-form', formCode: f });
        seen.add(out.kana);
      }
    }

    // 2) "Másik csoportbeli ragozás" — ha Godan, csináljunk neki Ichidan-szerű
    //    változatot ugyanazon formára (és vice versa). Ez a klasszikus
    //    csoport-tévesztési hiba.
    const fakeVerb = makeFakeOtherGroup(verb);
    if (fakeVerb) {
      const out = conjugate(fakeVerb, formCode);
      if (out && !seen.has(out.kana)) {
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-group' });
        seen.add(out.kana);
      }
    }

    // 3) "Tő-oszlop tévesztés" — Godan-nál: használjuk a másik oszlopot.
    if (verb.group === 'godan' && expected.morphemes) {
      const altColumn = pickAltColumn(expected.morphemes.column);
      const altStem = StemEngine.getStems(verb)[altColumn];
      const suf = (NIHONCORE_FORM_RULES[formCode] && NIHONCORE_FORM_RULES[formCode].suffix) || { kana:'', romaji:'' };
      if (altStem && suf.kana) {
        const fake = {
          kana:   altStem.kana   + suf.kana,
          romaji: altStem.romaji + suf.romaji
        };
        if (!seen.has(fake.kana)) {
          distractors.push({ ...fake, isCorrect: false, wrongReason: 'wrong-column' });
          seen.add(fake.kana);
        }
      }
    }

    // 4) Töltsük fel 3 distraktorra ha kevés
    while (distractors.length < 3) {
      const f = otherForms[Math.floor(Math.random() * otherForms.length)];
      const out = conjugate(verb, f);
      if (out && !seen.has(out.kana)) {
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-form', formCode: f });
        seen.add(out.kana);
      } else {
        break;
      }
    }

    // Összes opció
    const all = [
      { kana: expected.kana, romaji: expected.romaji, isCorrect: true },
      ...distractors.slice(0, 3)
    ];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  function makeFakeOtherGroup(verb) {
    // Godan → Ichidan-szerű fake (csak az -ru levágva, mintha ichidan lenne)
    if (verb.group === 'godan' && verb.godanFamily === 'ru') {
      return { ...verb, group: 'ichidan', stemKana: verb.kana.slice(0,-1), stemRomaji: verb.romaji.slice(0,-2) };
    }
    // Ichidan → "Godan-szerű" fake (úgy ragozzuk, mintha 〜る godan ru lenne)
    if (verb.group === 'ichidan') {
      return { ...verb, group: 'godan', godanFamily: 'ru', stemKana: verb.stemKana, stemRomaji: verb.stemRomaji };
    }
    return null;
  }

  function pickAltColumn(usedCol) {
    const cols = ['a','i','u','e','o'].filter(c => c !== usedCol);
    return cols[Math.floor(Math.random() * cols.length)];
  }

  /* ─────────────────────────────────────────────────
     D) MORPHEME SPLITTER (V2.0 P2) ─────────────────
     A user input-ját megpróbálja [stem + suffix] formájúra bontani,
     ismerve a célige + a célforma várt morfémáit. Visszaad:
       { matchedColumn, userStem, userSuffix, stemOk, suffixOk }
     vagy null, ha a darabolás bizonytalan.
     ────────────────────────────────────────────────── */

  function normInput(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, '');
  }
  function isRomajiOnly(s) { return /^[a-z\s]+$/.test(s); }
  function isKanaOnly(s)   { return /^[぀-ヿ]+$/.test(s); }

  // Visszaad: { ok: bool, mode, used: {stem, suffix}, expected: {stem, suffix},
  //             stemOk, suffixOk, usedColumn, requiredColumn, info: 'no-morphemes'|'no-match'|'fine' }
  function splitInput(card, userInput) {
    const exp = card.expected;
    if (!exp || !exp.morphemes) return { ok: false, info: 'no-morphemes' };

    const u   = normInput(userInput);
    if (!u) return { ok: false, info: 'empty' };
    const isLatin = isRomajiOnly(u);
    const mode = isLatin ? 'romaji' : 'kana';

    const expSuffix = isLatin ? normInput(exp.morphemes.suffix.romaji) : normInput(exp.morphemes.suffix.kana);
    const expStem   = isLatin ? normInput(exp.morphemes.stem.romaji)   : normInput(exp.morphemes.stem.kana);

    // Próbáljuk megtalálni a user által használt suffix-et.
    // Stratégia: a célige minden lehetséges formájának suffix-ét kipróbáljuk,
    // megnézzük melyikkel végződik a user input. A maradék lesz a user-féle stem.
    const v = card.verb;
    const candidates = [];

    // 1) az aktuális forma várt suffix-e
    candidates.push({ source: 'expected', suffix: expSuffix });

    // 2) minden más alapforma suffix-e (jellegzetes hibáknál ez segít)
    const allForms = ['masu','masen','mashita','masen_deshita','nai','potential','passive','causative','volitional'];
    for (const fc of allForms) {
      if (fc === card.formCode) continue;
      const alt = conjugate(v, fc);
      if (!alt || !alt.morphemes) continue;
      const s = isLatin ? normInput(alt.morphemes.suffix.romaji) : normInput(alt.morphemes.suffix.kana);
      if (s) candidates.push({ source: fc, suffix: s });
    }

    // Hosszabb suffix elsőbbsége (longest match)
    candidates.sort((a,b) => b.suffix.length - a.suffix.length);

    let matched = null;
    for (const c of candidates) {
      if (c.suffix && u.endsWith(c.suffix)) {
        matched = { suffix: c.suffix, source: c.source, userStem: u.slice(0, u.length - c.suffix.length) };
        break;
      }
    }
    if (!matched) return { ok: false, info: 'no-match', mode, expStem, expSuffix };

    // Beazonosítjuk melyik oszlopra (a/i/u/e/o) illeszkedik a user-stem (Godan-nál)
    let usedColumn = null;
    if (v.group === 'godan') {
      const stems = StemEngine.getStems(v);
      for (const col of ['a','i','u','e','o']) {
        const candidate = isLatin ? normInput(stems[col].romaji) : normInput(stems[col].kana);
        if (candidate === matched.userStem) { usedColumn = col; break; }
      }
    } else if (v.group === 'ichidan') {
      const ichi = isLatin ? normInput(v.stemRomaji) : normInput(v.stemKana);
      usedColumn = (matched.userStem === ichi) ? 'ichidan' : null;
    }

    const stemOk   = matched.userStem === expStem;
    const suffixOk = matched.suffix    === expSuffix;

    return {
      ok: true,
      mode,
      used: { stem: matched.userStem, suffix: matched.suffix, source: matched.source },
      expected: { stem: expStem, suffix: expSuffix },
      stemOk,
      suffixOk,
      usedColumn,
      requiredColumn: exp.morphemes.column,
      info: 'fine'
    };
  }

  /* ─────────────────────────────────────────────────
     E) FEEDBACK ENGINE V2 — morféma-szintű ────────── */

  function diagnose(card, userInput) {
    const u = normInput(userInput);
    const ek = normInput(card.expected.kana);
    const er = normInput(card.expected.romaji);

    if (u === ek || u === er) {
      return { match: true, mode: u === ek ? 'kana' : 'romaji', errorCode: null };
    }

    const isLatin = isRomajiOnly(u);
    const target  = isLatin ? er : ek;
    const diff    = diffCharsLocal(u, target);
    const distance = diff.filter(op => op.type !== 'eq').length;

    // ── 1) Próbálkozás morféma-szintű elemzéssel ───────
    const split = splitInput(card, userInput);

    // ── 2) Próbálkozás: másik forma teljes match-e ─────
    let matchedAltForm = null;
    const allForms = ['masu','masen','mashita','masen_deshita','nai','te','ta',
                      'potential','passive','causative','causative_passive','volitional'];
    for (const f of allForms) {
      if (f === card.formCode) continue;
      const alt = conjugate(card.verb, f);
      if (alt && (normInput(alt.kana) === u || normInput(alt.romaji) === u)) {
        matchedAltForm = f;
        break;
      }
    }

    // ── 3) Hibakód-prioritás ───────────────────────────
    let errorCode = 'wrong_form';
    let extra = {};

    // (a) Apró karakter-hiba: ha közel van és nem értelmezhető másként
    const isClose = distance > 0 && distance <= 2;

    // (b) Másik forma match → wrong_form, kiegészítve a formakóddal
    if (matchedAltForm) {
      errorCode = 'wrong_form';
      extra.matchedForm = matchedAltForm;
    }

    // (c) Rendhagyó-csoport (suru/kuru) hibája
    if (card.verb.group === 'irregular' && !matchedAltForm) {
      errorCode = 'irregular_verb';
    }

    // (d) Rendhagyó te-alak (jelenleg csak 行く)
    if (card.verb.irregularTe && (card.formCode === 'te' || card.formCode === 'ta')) {
      // Ellenőrzés: a user a szabályos te-formát (いて) adta-e meg a rendhagyó (いって) helyett?
      const fakeRegular = composeTeTa({ ...card.verb, irregularTe: false }, card.formCode);
      if (fakeRegular && (normInput(fakeRegular.kana) === u || normInput(fakeRegular.romaji) === u)) {
        errorCode = 'missing_irregular_te';
      }
    }

    // (e) Ál-Ichidan tévesztés: 〜る Godan-t Ichidan-ként ragozott a user
    if (card.verb.group === 'godan' && card.verb.godanFamily === 'ru') {
      const fake = makeFakeOtherGroup(card.verb);
      if (fake) {
        const out = conjugate(fake, card.formCode);
        if (out && (normInput(out.kana) === u || normInput(out.romaji) === u)) {
          errorCode = 'pseudo_ichidan';
        }
      }
    }

    // (f) Te/Ta family-pattern hibák — sokuon/rendaku hiány
    if ((card.formCode === 'te' || card.formCode === 'ta') &&
        card.verb.group === 'godan' && !card.verb.irregularTe) {
      const fam = card.verb.godanFamily;
      const rule = NIHONCORE_TE_RULES[fam];
      if (rule) {
        // Naív szabályos forma: stem + "te" / "ta" (azaz se sokuon, se rendaku)
        const naiveSuf = card.formCode === 'te' ? 'te' : 'ta';
        const naiveKana = card.formCode === 'te' ? 'て' : 'た';
        const naiveRomaji = card.verb.stemRomaji + naiveSuf;
        const naiveKn     = card.verb.stemKana   + naiveKana;
        if (u === normInput(naiveRomaji) || u === normInput(naiveKn)) {
          // El kell ismerni: pontosan azt rakta össze, ami szabályos lenne, ha nem lenne family-átalakulás
          if (rule.pattern && rule.pattern.indexOf('sokuon') === 0)       errorCode = 'missing_sokuon';
          else if (rule.pattern && rule.pattern.indexOf('rendaku') >= 0)  errorCode = 'missing_rendaku';
          else if (rule.pattern && rule.pattern.indexOf('n-rendaku') === 0) errorCode = 'missing_rendaku';
          else                                                           errorCode = 'wrong_suffix';
        }
      }
    }

    // (g) Morféma-szintű bontás eredménye — ha nincs jobb kód, ezt használjuk
    if (errorCode === 'wrong_form' && split && split.ok) {
      if (!split.stemOk && !split.suffixOk) {
        errorCode = 'morph_both_wrong';
      } else if (!split.stemOk && split.suffixOk) {
        errorCode = 'morph_wrong_column';
      } else if (split.stemOk && !split.suffixOk) {
        errorCode = 'morph_wrong_suffix';
      }
    }

    // (h) Ha még mindig wrong_form de tipo-távolság kicsi
    if (errorCode === 'wrong_form' && isClose) {
      errorCode = 'partial_match';
    }

    return {
      match: false,
      mode: isLatin ? 'romaji' : 'kana',
      errorCode,
      diff,
      distance,
      extra,
      split,
      userNorm: u,
      targetNorm: target
    };
  }

  function buildExplanation(card, diag) {
    if (!diag || diag.match) return '';
    const tpl = NIHONCORE_ERROR_TYPES[diag.errorCode] || NIHONCORE_ERROR_TYPES.wrong_form;
    const v = card.verb;
    const rule = NIHONCORE_FORM_RULES[card.formCode];
    const expected = card.expected;
    const split = diag.split && diag.split.ok ? diag.split : null;

    // Szabályos te-forma (ha 行く-szerű rendhagyó volna a szabályos)
    let regularGuess = '—';
    if (diag.errorCode === 'missing_irregular_te') {
      const fakeRegularTe = composeTeTa({ ...v, irregularTe: false }, card.formCode);
      if (fakeRegularTe) regularGuess = `<em>${fakeRegularTe.kana}</em> (${fakeRegularTe.romaji})`;
    }
    // Te/Ta sokuon/rendaku-hiba esetén a naív szabályos forma
    if (diag.errorCode === 'missing_sokuon' || diag.errorCode === 'missing_rendaku') {
      const naive = card.verb.stemKana + (card.formCode === 'te' ? 'て' : 'た');
      regularGuess = `<em>${naive}</em>`;
    }

    const stemBaseKana = v.stemKana || '';
    const stemBaseRomaji = v.stemRomaji || '';

    const params = {
      // P1 placeholderek
      lemma:         `${v.kanji} (${v.romaji})`,
      form:          rule ? rule.nameHu.toLowerCase() : card.formCode,
      realGroup:     v.group === 'godan' ? 'Godan' : v.group === 'ichidan' ? 'Ichidan' : 'Rendhagyó',
      guessedGroup:  v.group === 'godan' ? 'Ichidan' : 'Godan',
      correct:       `${expected.kana} (${expected.romaji})`,
      regular:       regularGuess,
      correctStem:   expected.morphemes ? expected.morphemes.stem.kana : '',
      suffix:        expected.morphemes ? expected.morphemes.suffix.kana : '',
      requiredColumn: expected.morphemes ? String(expected.morphemes.column || '').toUpperCase() : '',
      usedColumn:    split && split.usedColumn ? String(split.usedColumn).toUpperCase() : '—',
      requiredStem:  expected.morphemes ? `${expected.morphemes.stem.kana} (${expected.morphemes.stem.romaji})` : '',
      correctSuffix: expected.morphemes ? `${expected.morphemes.suffix.kana} (${expected.morphemes.suffix.romaji})` : '',
      usedSuffix:    split ? split.used.suffix : '—',
      extraHint:     '',

      // P2 placeholderek (morféma-szintű)
      stem:          expected.morphemes ? expected.morphemes.stem.kana : '',
      stemBase:      stemBaseKana ? `${stemBaseKana} (${stemBaseRomaji})` : `${v.kanji}-tő`,
      usedStem:      split ? split.used.stem : '—'
    };

    let msg = tpl.template;
    Object.keys(params).forEach(k => {
      msg = msg.split('{' + k + '}').join(params[k]);
    });
    return { title: tpl.title, html: msg };
  }

  /* ─────────────────────────────────────────────────
     E) LOCAL DIFF HELPER (újrahasznosítva v1.6-ból) ─ */

  function diffCharsLocal(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
        else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    const ops = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) { ops.unshift({ type:'eq',  char:a[i-1] }); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({ type:'del', char:a[i-1] }); i--; }
      else { ops.unshift({ type:'ins', char:b[j-1] }); j--; }
    }
    while (i > 0) { ops.unshift({ type:'del', char:a[i-1] }); i--; }
    while (j > 0) { ops.unshift({ type:'ins', char:b[j-1] }); j--; }
    return ops;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function renderDiffInline(diff, target) {
    if (!diff) return `<strong class="pfe-jp-ok">${escapeHtml(target)}</strong>`;
    const userHtml = diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del" title="felesleges">${escapeHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins" title="hiányzik">${escapeHtml(op.char)}</span>`;
      return '';
    }).join('');
    return `
      <div class="diff-block">
        <div class="diff-line"><span class="diff-label">Te írtad:</span><span class="diff-content">${userHtml}</span></div>
        <div class="diff-line"><span class="diff-label">Helyes:</span><span class="diff-content"><strong class="pfe-jp-ok">${escapeHtml(target)}</strong></span></div>
        <div class="diff-legend">
          <span class="diff-eq-sample">helyes</span> ·
          <span class="diff-del-sample">felesleges</span> ·
          <span class="diff-ins-sample">hiányzó</span>
        </div>
      </div>
    `;
  }

  // Morféma-szintű vizualizáció (V2.0 P2).
  // A user inputját [stem | suffix] szakaszra bontja, mindegyik szakaszt
  // OK/wrong színnel jelöli. A helyes alak szintén szétszedve mutatva.
  function renderMorphemeDiff(split, expected) {
    if (!split || !split.ok) return '';
    const { used } = split;

    const userStem = `<span class="morph ${split.stemOk ? 'morph-ok' : 'morph-bad'}">${escapeHtml(used.stem || '∅')}</span>`;
    const userSuf  = `<span class="morph ${split.suffixOk ? 'morph-ok' : 'morph-bad'}">${escapeHtml(used.suffix || '∅')}</span>`;

    const expStemTxt = expected.morphemes
      ? (split.mode === 'romaji' ? expected.morphemes.stem.romaji : expected.morphemes.stem.kana)
      : '';
    const expSufTxt = expected.morphemes
      ? (split.mode === 'romaji' ? expected.morphemes.suffix.romaji : expected.morphemes.suffix.kana)
      : '';

    return `
      <div class="morph-block">
        <div class="morph-line">
          <span class="diff-label">Te bontásod:</span>
          <span class="morph-content">${userStem}<span class="morph-sep">+</span>${userSuf}</span>
        </div>
        <div class="morph-line">
          <span class="diff-label">Helyes bontás:</span>
          <span class="morph-content">
            <span class="morph morph-target">${escapeHtml(expStemTxt)}</span>
            <span class="morph-sep">+</span>
            <span class="morph morph-target">${escapeHtml(expSufTxt)}</span>
          </span>
        </div>
        <div class="morph-legend">
          <span class="morph-ok-sample">tő/toldalék OK</span> ·
          <span class="morph-bad-sample">elcsúszott rész</span>
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────
     F) PERSISTENCE — localStorage profile ──────────  */

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch (e) { return null; }
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultProfile();
      const p = JSON.parse(raw);
      if (!p || !p.formStats) return defaultProfile();
      return p;
    } catch (e) { return defaultProfile(); }
  }
  function defaultProfile() {
    return {
      totalAttempts: 0,
      totalCorrect:  0,
      bestStreak:    0,
      formStats:  {},   // formCode → { attempts, correct }
      groupStats: {}    // group → { attempts, correct }
    };
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function updateProfileFromResults(results) {
    const p = loadProfile();
    let runStreak = 0, bestRun = 0;
    results.forEach(r => {
      p.totalAttempts++;
      if (r.correct) p.totalCorrect++;
      const fs = p.formStats[r.formCode]  = p.formStats[r.formCode]  || { attempts: 0, correct: 0 };
      const gs = p.groupStats[r.group]    = p.groupStats[r.group]    || { attempts: 0, correct: 0 };
      fs.attempts++; gs.attempts++;
      if (r.correct) { fs.correct++; gs.correct++; runStreak++; bestRun = Math.max(bestRun, runStreak); }
      else runStreak = 0;
    });
    if (bestRun > p.bestStreak) p.bestStreak = bestRun;
    saveProfile(p);
    return p;
  }

  function renderStatsBar() {
    const p = loadProfile();
    const el = document.getElementById('conjStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    const hasData = p.totalAttempts > 0;
    el.innerHTML = `
      <div class="conj-stat-chip">
        <span class="csc-num">${p.totalAttempts}</span>
        <span class="csc-label">összes</span>
      </div>
      <div class="conj-stat-chip">
        <span class="csc-num">${pct}%</span>
        <span class="csc-label">pontosság</span>
      </div>
      <div class="conj-stat-chip">
        <span class="csc-num">${p.bestStreak} 🔥</span>
        <span class="csc-label">leghosszabb sorozat</span>
      </div>
      ${hasData ? `
        <button class="conj-stat-toggle" id="conjStatsToggle">Részletek</button>
      ` : ''}
      <div class="conj-stats-panel hidden" id="conjStatsPanel"></div>
    `;

    const tBtn = document.getElementById('conjStatsToggle');
    if (tBtn) tBtn.addEventListener('click', toggleProfileDashboard);
  }

  // V2.0 P2/2 — részletes profil-panel
  function toggleProfileDashboard() {
    const panel = document.getElementById('conjStatsPanel');
    const btn   = document.getElementById('conjStatsToggle');
    if (!panel) return;
    const opening = panel.classList.contains('hidden');
    if (opening) {
      panel.innerHTML = renderProfileDashboard();
      panel.classList.remove('hidden');
      btn.classList.add('active');
      btn.textContent = '📊 Bezárás';
      // Reset gomb a panelen belül
      const resetBtn = panel.querySelector('#conjProfileReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          NihonCoreRound.confirmDelete('Törlöd a Ragozó profilját?', 'A modul összes eddigi eredménye elvész. Ez nem vonható vissza.', () => {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderStatsBar();
          });
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = 'Részletek';
    }
  }

  function renderProfileDashboard() {
    const p = loadProfile();
    if (p.totalAttempts === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }

    const groupRows = Object.keys(p.groupStats).map(g => {
      const s = p.groupStats[g];
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      const label = g === 'godan' ? 'Godan (I.)' : g === 'ichidan' ? 'Ichidan (II.)' : 'Rendhagyó (III.)';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    // Per-form bontás — leggyengébb felül
    const formEntries = Object.keys(p.formStats).map(f => {
      const s = p.formStats[f];
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      return { f, s, pct };
    }).sort((a, b) => a.pct - b.pct);

    const formRows = formEntries.map(({ f, s, pct }) => {
      const rule = NIHONCORE_FORM_RULES[f];
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${rule ? rule.shortHu : f}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    // Top-3 leggyengébb forma (csak ha legalább 3 attempt és <80%)
    const weakest = formEntries.filter(x => x.s.attempts >= 3 && x.pct < 80).slice(0, 3);
    const weakestHtml = weakest.length ? `
      <div class="cj-pd-weakest">
        <div class="cj-pd-section-label">Gyenge pontok</div>
        <div class="cj-pd-weakest-list">
          ${weakest.map(w => {
            const rule = NIHONCORE_FORM_RULES[w.f];
            return `<span class="cj-pd-weak-chip">${rule ? rule.shortHu : w.f} <em>${w.pct}%</em></span>`;
          }).join('')}
        </div>
        <p class="cj-pd-tip">💡 Kapcsold be az <strong>Adaptív gyakorlást</strong> a lobby-ban — ezeket fogja gyakrabban kihúzni.</p>
      </div>
    ` : '';

    return `
      <div class="cj-pd-grid">
        <div class="cj-pd-block">
          <div class="cj-pd-section-label">Csoportok szerint</div>
          ${groupRows || '<p class="cj-pd-empty">—</p>'}
        </div>
        <div class="cj-pd-block">
          <div class="cj-pd-section-label">Formák szerint (gyengétől erősig)</div>
          ${formRows || '<p class="cj-pd-empty">—</p>'}
        </div>
      </div>
      ${weakestHtml}
      <div class="cj-pd-actions">
        <button class="btn btn-ghost cj-pd-reset" id="conjProfileReset">🗑 Profil törlése</button>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────
     G) UI — Lobby ─────────────────────────────────── */

  function renderLobby() {
    const lobbyEl = document.getElementById('conjLobby');

    const groupRow = [
      { id: 'godan',     label: 'Godan (I.)',     hint: 'のむ・かく・はなす' },
      { id: 'ichidan',   label: 'Ichidan (II.)',  hint: 'たべる・みる' },
      { id: 'irregular', label: 'Rendhagyó (III.)', hint: 'する・くる' }
    ].map(g => `
      <button class="cj-group-btn ${drillSettings.groups[g.id] ? 'active' : ''}" data-group="${g.id}">
        <span class="cj-g-name">${g.label}</span>
        <span class="cj-g-hint">${g.hint}</span>
      </button>
    `).join('');

    // V8: Tematikus szűrő (a user 6 tematikus kategóriája + daily)
    const themeOptions = [
      { id: 'daily',        label: '🏠 Mindennapok',     hint: 'olvas, ír, beszél…' },
      { id: 'movement',     label: '🚶 Mozgás',          hint: 'megy, jön, hazatér…' },
      { id: 'transitivity', label: '⇄ Tranzitív-párok',  hint: 'kinyit/kinyílik…' },
      { id: 'clothing',     label: '👕 Ruházkodás',      hint: 'kiru, haku, kaburu…' },
      { id: 'giving',       label: '🎁 Adás-Kapás',      hint: 'morau, kureru, ageru…' },
      { id: 'state',        label: '✨ Állapot/Érzék',   hint: 'naru, mieru, tsukareru…' },
      { id: 'weather',      label: '☀️ Időjárás',        hint: 'furu, fuku, saku…' }
    ];
    // Counter per theme — csak akkor mutatjuk, ha van benne ige
    const themeCounts = {};
    NIHONCORE_VERBS.forEach(v => {
      const t = v.theme || 'daily';
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
    const themeRow = themeOptions
      .filter(t => themeCounts[t.id] > 0)
      .map(t => {
        const isOn = drillSettings.themes ? drillSettings.themes[t.id] !== false : true;
        return `
          <button class="cj-group-btn cj-theme-btn ${isOn ? 'active' : ''}" data-theme="${t.id}">
            <span class="cj-g-name">${t.label}</span>
            <span class="cj-g-hint">${t.hint} · ${themeCounts[t.id]} ige</span>
          </button>`;
      }).join('');

    const formRows = NIHONCORE_FORM_GROUPS.map(group => {
      const chips = group.forms.map(fcode => {
        const r = NIHONCORE_FORM_RULES[fcode];
        return `
          <button class="cj-form-chip ${drillSettings.forms[fcode] ? 'active' : ''}" data-form="${fcode}">
            <span class="cjfc-name">${r.shortHu}</span>
            <span class="cjfc-sub">${r.promptHu}</span>
          </button>
        `;
      }).join('');
      return `
        <div class="cj-form-row">
          <span class="cj-form-row-label">${group.nameHu}</span>
          <div class="cj-form-chips">${chips}</div>
        </div>
      `;
    }).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'négy válaszból választasz' },
      { id: 'build',       name: 'Építkezés',  sub: 'tőből és toldalékból rakod össze' },
      { id: 'mastery',     name: 'Mester',     sub: 'magad írod be az alakot' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-mode="${m.id}">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>
    `).join('');

    const presets = [5, 8, 15].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    lobbyEl.innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Ragozó modul</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">Válaszd ki melyik csoportokat és melyik célformákat akarod gyakorolni, aztán indítsd a kört.</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · Igecsoportok (több is választható)</div>
        <div class="cj-group-row">${groupRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Tematikus szűrő (csak ezek az igék kerülnek a körbe)</div>
        <div class="cj-group-row">${themeRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Célformák</div>
        ${formRows}
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Mód</div>
        <div class="cj-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">4 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="cjCustomCount">vagy saját:</label>
            <input type="number" id="cjCustomCount" min="1" max="50" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-section cj-adaptive-section">
        <label class="cj-adapt-switch">
          <input type="checkbox" id="cjAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A hibás formákat és csoportokat ~3× gyakrabban húzza ki a profilodból. (Legalább 10 megválaszolt kártya után kapcsol be.)</em>
          </span>
        </label>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Lehetséges kombinációk: <strong id="cjComboCount">${countComboPool()}</strong></span>
        <span class="lobby-build-note" id="cjBuildNote"></span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="cjStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachLobbyHandlers();
    updateStartBtn();
    updateBuildNote();
  }

  // Build módban tájékoztassuk a usert, hogy a te/ta/causative-passive és rendhagyó
  // kombinációk nem támogatottak — Recognition/Mastery módban viszont igen.
  function updateBuildNote() {
    const el = document.getElementById('cjBuildNote');
    if (!el) return;
    if (drillSettings.mode !== 'build') { el.textContent = ''; return; }
    const unsupported = [];
    if (drillSettings.forms.te)                unsupported.push('Te');
    if (drillSettings.forms.ta)                unsupported.push('Ta');
    if (drillSettings.forms.causative_passive) unsupported.push('Caus-Pass');
    if (drillSettings.groups.irregular)        unsupported.push('Rendhagyó');
    if (unsupported.length) {
      el.innerHTML = `<span class="cj-build-note-icon">ℹ️</span> Építkezés mód: <strong>${unsupported.join(', ')}</strong> kihagyva (csak Felismerés/Mester).`;
    } else {
      el.textContent = '';
    }
  }

  function attachLobbyHandlers() {
    // Csoport-toggle + Theme-toggle (V8: ugyanaz a class, de data- attribútum dönti el)
    document.querySelectorAll('.cj-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.theme;
        if (themeId) {
          // Theme toggle (legalább 1 aktív kell)
          if (!drillSettings.themes) drillSettings.themes = {};
          const isOn = drillSettings.themes[themeId] !== false;
          const allThemes = ['daily', 'movement', 'transitivity', 'clothing', 'giving', 'state', 'weather'];
          const otherOn = allThemes.filter(t => t !== themeId && drillSettings.themes[t] !== false).length;
          if (isOn && otherOn === 0) { shake(btn); return; }
          drillSettings.themes[themeId] = !isOn;
          btn.classList.toggle('active', drillSettings.themes[themeId]);
          saveSettings();
          updateStartBtn();
          updateBuildNote();
          return;
        }
        // Group toggle (godan/ichidan/irregular)
        const g = btn.dataset.group;
        if (!g) return;
        const isOn = drillSettings.groups[g];
        const otherOn = Object.keys(drillSettings.groups).filter(x => x !== g && drillSettings.groups[x]).length;
        if (isOn && otherOn === 0) { shake(btn); return; }
        drillSettings.groups[g] = !isOn;
        btn.classList.toggle('active', drillSettings.groups[g]);
        saveSettings();
        updateStartBtn();
        updateBuildNote();
      });
    });

    // Forma-toggle (legalább 1 aktív kell)
    document.querySelectorAll('.cj-form-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.form;
        const isOn = drillSettings.forms[f];
        const otherOn = Object.keys(drillSettings.forms).filter(x => x !== f && drillSettings.forms[x]).length;
        if (isOn && otherOn === 0) { shake(chip); return; }
        drillSettings.forms[f] = !isOn;
        chip.classList.toggle('active', drillSettings.forms[f]);
        saveSettings();
        updateStartBtn();
        updateBuildNote();
      });
    });

    // Mode-toggle (egyetlen aktív)
    document.querySelectorAll('.cj-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.mode = btn.dataset.mode;
        document.querySelectorAll('.cj-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveSettings();
        updateBuildNote();
      });
    });

    // Adaptive toggle
    const adaptCb = document.getElementById('cjAdaptive');
    if (adaptCb) {
      adaptCb.addEventListener('change', () => {
        drillSettings.adaptive = adaptCb.checked;
        saveSettings();
      });
    }

    // Kártyaszám
    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('cjCustomCount');
        if (custom) custom.value = '';
        saveSettings();
        updateStartBtn();
      });
    });
    const customInput = document.getElementById('cjCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countComboPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveSettings();
          updateStartBtn();
        }
      });
    }

    document.getElementById('cjStart').addEventListener('click', startRound);
  }

  function shake(el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  }

  function updateStartBtn() {
    const combos = countComboPool();
    const comboEl = document.getElementById('cjComboCount');
    if (comboEl) comboEl.textContent = combos;
    const startBtn = document.getElementById('cjStart');
    if (!startBtn) return;
    startBtn.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    startBtn.disabled = combos === 0 || drillSettings.cardCount < 1;
  }

  /* ─────────────────────────────────────────────────
     H) UI — Kör futtatása ────────────────────────── */

  function startRound() {
    drillRunState.cards = generateExerciseQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;

    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'conjugation', mode: drillSettings.mode, results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('conjLobby').classList.add('hidden');
    document.getElementById('conjRuntime').classList.remove('hidden');
    document.getElementById('conjSummary').classList.add('hidden');
    document.getElementById('conjSummary').innerHTML = '';

    renderCurrentCard();
  }

  function renderCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.userInput = '';
    drillRunState.chosenIdx = null;
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }

    document.getElementById('conjScore').textContent  = drillRunState.score;
    document.getElementById('conjStreak').textContent = `${drillRunState.streak} 🔥`;

    // Progress strip frissítés
    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('conjCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('conjProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('conjFeedback').classList.add('hidden');
    document.getElementById('conjFeedback').innerHTML = '';

    // Új hintet kezdünk minden kártyán
    drillRunState.hintLevel = 0;

    if (drillSettings.mode === 'recognition')      renderRecognitionCard();
    else if (drillSettings.mode === 'build')       renderBuildCard();
    else                                           renderMasteryCard();
  }

  function renderCardPrompt(card) {
    const v = card.verb;
    const rule = NIHONCORE_FORM_RULES[card.formCode];
    const groupLabel =
      v.group === 'godan' ? `Godan${v.pseudoIchidan ? ' · ál-Ichidan' : ''}` :
      v.group === 'ichidan' ? 'Ichidan' : 'Rendhagyó';
    return `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="cj-pe-group">${groupLabel}</span>
          <span class="cj-pe-dot">·</span>
          <span class="cj-pe-level">${v.level}</span>
        </div>
        <div class="cj-prompt-lemma">
          <span class="cj-pl-kanji">${v.kanji}</span>
          <span class="cj-pl-kana">${v.kana}</span>
          <span class="cj-pl-romaji">${v.romaji}</span>
        </div>
        <div class="cj-prompt-meaning">${v.meaningHu}</div>
        <div class="cj-target">
          <span class="cj-target-label">Cél-alak:</span>
          <span class="cj-target-name">${rule.nameHu}</span>
          <span class="cj-target-sub">${rule.promptHu}</span>
        </div>
      </div>
    `;
  }

  function renderRecognitionCard() {
    const card = drillRunState.cards[drillRunState.cardIdx];
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cj-opt-jp">${opt.kana}</span>
        <span class="cj-opt-romaji">${opt.romaji}</span>
      </button>
    `).join('');

    document.getElementById('conjCard').innerHTML = `
      ${renderCardPrompt(card)}
      ${renderHintBar(card)}
      <div class="cj-options">${optionsHtml}</div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('conjActions').innerHTML = '';

    document.querySelectorAll('.cj-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const isCorrect = btn.dataset.correct === '1';
        submitRecognition(idx, isCorrect, btn);
      });
    });
    document.querySelector('#conjCard .dont-know-btn').addEventListener('click', conjDontKnow);

    attachHintHandlers(card);
  }

  function submitRecognition(idx, isCorrect, btn) {
    drillRunState.submitted = true;
    drillRunState.chosenIdx = idx;

    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      const cb = document.querySelector('.cj-option[data-correct="1"]');
      if (cb) cb.classList.add('reveal-correct');
    }
    document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);

    // Hibánál a választott opciót is továbbadjuk: abból derül ki, MIT tévesztett
    const card = drillRunState.cards[drillRunState.cardIdx];
    finalizeCard(isCorrect, isCorrect ? null : { errorCode: 'wrong_form', chosen: card.options[idx] });
  }

  // Rövid szabály-emlékeztető: hogyan épül fel a kért alak ennél az igénél
  function howItsBuilt(card) {
    const v = card.verb, m = card.expected.morphemes;
    if (v.group === 'irregular') {
      return `A <strong>${v.kanji}</strong> rendhagyó ige: az alakjait külön kell megjegyezni.`;
    }
    if (m && m.stem && m.suffix && m.stem.kana && m.suffix.kana) {
      const built = `<strong>${m.stem.kana}</strong> + <strong>${m.suffix.kana}</strong>`;
      if (v.group === 'ichidan') return `Ichidan ige: a végső る lemarad, a toldalék a tőhöz jön: ${built}.`;
      // masu/nai-féle alakok: a tő egy magánhangzó-sorra vált; te/ta: hangváltozás
      if (/^[aiueo]$/.test(String(m.column || ''))) {
        return `Godan ige: az utolsó szótag a(z) ${String(m.column).toUpperCase()}-sorra vált: ${built}.`;
      }
      return `Godan ige: a te- és ta-alak az utolsó szótagtól függ (う・つ・る → って, む・ぶ・ぬ → んで, く → いて, ぐ → いで, す → して). Itt: ${built}.`;
    }
    return v.group === 'ichidan'
      ? 'Ichidan ige: a végső る helyére て / た kerül.'
      : 'Godan ige: a te- és ta-alak az utolsó szótagtól függ (う・つ・る → って, む・ぶ・ぬ → んで, く → いて, ぐ → いで, す → して).';
  }

  // Feleletválasztós hiba magyarázata a választott opció alapján
  function recognitionExplanation(card, chosen) {
    const rule = NIHONCORE_FORM_RULES[card.formCode];
    const want = rule ? rule.nameHu : card.formCode;
    const picked = `<em>${chosen.kana}</em>`;
    const other = chosen.formCode && NIHONCORE_FORM_RULES[chosen.formCode];
    if (chosen.wrongReason === 'wrong-form' && other) {
      return { title: 'Másik alak',
        html: `A ${picked} az ige egy másik alakja: <strong>${other.nameHu}</strong>. A feladat: <strong>${want}</strong>. ${howItsBuilt(card)}` };
    }
    if (chosen.wrongReason === 'wrong-group') {
      const guessed = card.verb.group === 'ichidan' ? 'godan' : 'ichidan';
      return { title: 'Igecsoport',
        html: `A ${picked} úgy ragoz, mintha ${guessed} ige lenne. ${howItsBuilt(card)}` };
    }
    if (chosen.wrongReason === 'wrong-column') {
      return { title: 'Rossz tő',
        html: `A ${picked} toldaléka jó, de a tő rossz sorban áll. ${howItsBuilt(card)}` };
    }
    return { title: 'Más alak', html: `Nem ez a kért alak. ${howItsBuilt(card)}` };
  }

  // „Nem tudom" — felfedi a helyes választ + magyarázat, nem helyesként számít
  function conjDontKnow() {
    if (drillRunState.submitted) return;
    drillRunState.submitted = true;
    drillRunState.chosenIdx = -1;
    const cb = document.querySelector('.cj-option[data-correct="1"]');
    if (cb) cb.classList.add('reveal-correct');
    document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);
    finalizeCard(false, null);
    markDontKnowFeedback(document.getElementById('conjFeedback'));
  }

  function renderMasteryCard() {
    const card = drillRunState.cards[drillRunState.cardIdx];

    document.getElementById('conjCard').innerHTML = `
      ${renderCardPrompt(card)}
      ${renderHintBar(card)}
      <div class="cj-input-area">
        <input type="text" class="cj-input" id="cjInput"
               placeholder="pl. のみました vagy nomimashita"
               autocomplete="off" autocapitalize="off" spellcheck="false" />
        <div class="cj-timer-bar"><div class="cj-timer-fill" id="cjTimerFill"></div></div>
      </div>
    `;
    document.getElementById('conjActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="cjSubmit" disabled>Beküldés</button>
    `;

    attachHintHandlers(card);

    const input = document.getElementById('cjInput');
    const btn   = document.getElementById('cjSubmit');
    input.focus();
    input.addEventListener('input', () => {
      drillRunState.userInput = input.value.trim();
      btn.disabled = !drillRunState.userInput;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !btn.disabled && !drillRunState.submitted) {
        e.preventDefault();
        submitMastery();
      }
    });
    btn.addEventListener('click', () => { if (!drillRunState.submitted) submitMastery(); });

    startMasteryTimer();
  }

  /* ─────────────────────────────────────────────────
     H/2) UI — BUILD MÓD (V2.0 P2/2) ─────────────────
     2 lépcső: stem-pick (Godan: 5 oszlop / Ichidan: 1)
              + suffix-pick (curated bank, 5 opció).
     Live preview, részleges pontszám 50/50.
     ────────────────────────────────────────────────── */

  function renderBuildCard() {
    const card = drillRunState.cards[drillRunState.cardIdx];
    drillRunState.buildPick = { stemId: null, suffixIdx: null };
    drillRunState.buildData = card.buildData;
    const bd = drillRunState.buildData;

    const stemHtml = bd.stemOptions.map(s => `
      <button class="cj-build-stem" data-stem-id="${s.id}" data-col="${s.id}">
        <span class="cjbs-col">${s.label}</span>
        <span class="cjbs-jp">${s.kana}</span>
        <span class="cjbs-roman">${s.romaji}</span>
      </button>
    `).join('');

    const sufHtml = bd.suffixOptions.map((s, i) => `
      <button class="cj-build-suf" data-suffix-idx="${i}">
        <span class="cjbf-jp">${s.kana}</span>
        <span class="cjbf-roman">${s.romaji}</span>
      </button>
    `).join('');

    const isGodan = card.verb.group === 'godan';
    const step1Label = isGodan
      ? '1 · Válaszd ki a tövet az oszlop-mátrixból'
      : '1 · Tő (Ichidan — nincs oszlopváltás)';

    document.getElementById('conjCard').innerHTML = `
      ${renderCardPrompt(card)}
      ${renderHintBar(card)}
      <div class="cj-build-step">
        <div class="cj-build-step-label">${step1Label}</div>
        <div class="cj-build-stems${isGodan ? ' cj-build-stems-godan' : ' cj-build-stems-single'}">${stemHtml}</div>
      </div>
      <div class="cj-build-step">
        <div class="cj-build-step-label">2 · Válaszd ki a toldalékot</div>
        <div class="cj-build-suffixes">${sufHtml}</div>
      </div>
      <div class="cj-build-preview" id="cjBuildPreview">
        <span class="cjbp-label">Előnézet:</span>
        <span class="cjbp-content"><em>— válassz mindkettőből —</em></span>
      </div>
    `;
    document.getElementById('conjActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="cjSubmit" disabled>Beküldés</button>
    `;

    attachBuildHandlers();
    attachHintHandlers(card);

    // Ha Ichidan és csak 1 stem-opció van, autoselect
    if (!isGodan && bd.stemOptions.length === 1) {
      const onlyBtn = document.querySelector('.cj-build-stem');
      if (onlyBtn) { onlyBtn.classList.add('selected'); drillRunState.buildPick.stemId = onlyBtn.dataset.stemId; }
    }
  }

  function attachBuildHandlers() {
    document.querySelectorAll('.cj-build-stem').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.cj-build-stem').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.stemId = btn.dataset.stemId;
        updateBuildPreview();
      });
    });
    document.querySelectorAll('.cj-build-suf').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.cj-build-suf').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.suffixIdx = parseInt(btn.dataset.suffixIdx, 10);
        updateBuildPreview();
      });
    });
    document.getElementById('cjSubmit').addEventListener('click', () => {
      if (!drillRunState.submitted) submitBuild();
    });
  }

  function updateBuildPreview() {
    const p = drillRunState.buildPick;
    const bd = drillRunState.buildData;
    const contentEl = document.getElementById('cjBuildPreview').querySelector('.cjbp-content');

    let stemPart = `<span class="morph morph-target morph-empty">___</span>`;
    let sufPart  = `<span class="morph morph-target morph-empty">___</span>`;
    if (p.stemId != null) {
      const s = bd.stemOptions.find(x => x.id === p.stemId);
      stemPart = `<span class="morph morph-target">${escapeHtml(s.kana)}</span>`;
    }
    if (p.suffixIdx != null) {
      const s = bd.suffixOptions[p.suffixIdx];
      sufPart  = `<span class="morph morph-target">${escapeHtml(s.kana)}</span>`;
    }
    contentEl.innerHTML = `${stemPart} <span class="morph-sep">+</span> ${sufPart}`;
    document.getElementById('cjSubmit').disabled = (p.stemId == null || p.suffixIdx == null);
  }

  function submitBuild() {
    drillRunState.submitted = true;
    const card = drillRunState.cards[drillRunState.cardIdx];
    const bd = drillRunState.buildData;
    const p = drillRunState.buildPick;

    const pickedStem = bd.stemOptions.find(x => x.id === p.stemId);
    const pickedSuf  = bd.suffixOptions[p.suffixIdx];
    const stemOk     = p.stemId === bd.correctStemId;
    const suffixOk   = p.suffixIdx === bd.correctSuffixIdx;
    const isCorrect  = stemOk && suffixOk;

    // Visual feedback
    document.querySelectorAll('.cj-build-stem').forEach(b => {
      b.disabled = true;
      if (b.dataset.stemId === bd.correctStemId) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(stemOk ? 'correct' : 'wrong');
    });
    document.querySelectorAll('.cj-build-suf').forEach((b, i) => {
      b.disabled = true;
      if (i === bd.correctSuffixIdx) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(suffixOk ? 'correct' : 'wrong');
    });

    // diag-objektum a buildExplanation-hoz
    const exp = card.expected;
    const correctStem = bd.stemOptions.find(x => x.id === bd.correctStemId);
    const correctSuf  = bd.suffixOptions[bd.correctSuffixIdx];
    const diag = {
      match: isCorrect,
      mode: 'kana',
      errorCode: isCorrect ? null
        : (!stemOk && !suffixOk) ? 'morph_both_wrong'
        : (!stemOk &&  suffixOk) ? 'morph_wrong_column'
        : 'morph_wrong_suffix',
      split: {
        ok: true, info: 'fine', mode: 'kana',
        used: { stem: pickedStem.kana, suffix: pickedSuf.kana, source: 'build' },
        expected: { stem: correctStem.kana, suffix: correctSuf.kana },
        stemOk, suffixOk,
        usedColumn: p.stemId,
        requiredColumn: bd.correctStemId
      }
    };

    // Partial-credit pontozás (− hint malus)
    let points = 0;
    if (isCorrect)                  points = 12;
    else if (stemOk || suffixOk)    points = 5;
    points = Math.max(0, points - drillRunState.hintLevel * 3);

    if (isCorrect) {
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.score += points;

    drillRunState.results.push({
      verbId: card.verb.id, group: card.verb.group, formCode: card.formCode,
      correct: isCorrect, errorCode: diag.errorCode,
      partial: !isCorrect && (stemOk || suffixOk),
      hintLevel: drillRunState.hintLevel
    });

    document.getElementById('conjScore').textContent  = drillRunState.score;
    document.getElementById('conjStreak').textContent = `${drillRunState.streak} 🔥`;

    renderFeedback(card, isCorrect, diag);
  }

  /* ─────────────────────────────────────────────────
     H/3) UI — Hint Provider (V2.0 P2/2) ────────────
     Progresszív tippek: 1) stem felfedés, 2) suffix.
     Minden tipp -3 pontot ér.
     ────────────────────────────────────────────────── */

  function renderHintBar(card) {
    // Csak akkor van értelme, ha van morpheme info (te/ta-nál és irregularnál nincs)
    const e = card.expected;
    if (!e || !e.morphemes) return '';
    return `
      <div class="cj-hint-bar">
        <button class="cj-hint-btn" id="cjHintBtn" type="button">
          <span class="cjh-icon">💡</span>
          <span class="cjh-text">Tipp <span class="cjh-pts">(−3 pont)</span></span>
        </button>
        <div class="cj-hint-display" id="cjHintDisplay"></div>
      </div>
    `;
  }

  function attachHintHandlers(card) {
    const btn = document.getElementById('cjHintBtn');
    const disp = document.getElementById('cjHintDisplay');
    if (!btn || !disp) return;
    btn.addEventListener('click', () => {
      if (drillRunState.submitted) return;
      if (drillRunState.hintLevel >= 2) return;
      drillRunState.hintLevel++;
      const e = card.expected;
      let html = disp.innerHTML;
      if (drillRunState.hintLevel === 1) {
        html += `<div class="cj-hint-line"><em>Tő:</em> <strong class="pfe-jp-ok">${escapeHtml(e.morphemes.stem.kana)}</strong> <span class="pfe-roman">(${escapeHtml(e.morphemes.stem.romaji)})</span></div>`;
      } else if (drillRunState.hintLevel === 2) {
        html += `<div class="cj-hint-line"><em>Toldalék:</em> <strong class="pfe-jp-ok">${escapeHtml(e.morphemes.suffix.kana)}</strong> <span class="pfe-roman">(${escapeHtml(e.morphemes.suffix.romaji)})</span></div>`;
        btn.disabled = true;
        btn.classList.add('exhausted');
      }
      disp.innerHTML = html;
    });
  }

  function startMasteryTimer() {
    const fill = document.getElementById('cjTimerFill');
    // Időlimit csak akkor, ha a tanuló bekapcsolta (NihonCorePrefs)
    if (!NihonCorePrefs.timerOn()) { if (fill && fill.parentElement) fill.parentElement.style.display = 'none'; return; }
    const limit = drillSettings.timeLimit;
    fill.style.transition = 'none';
    fill.style.width = '100%';
    fill.offsetHeight;
    fill.style.transition = `width ${limit}ms linear`;
    fill.style.width = '0%';

    drillRunState.timerHandle = setTimeout(() => {
      if (!drillRunState.submitted) handleMasteryTimeout();
    }, limit);
  }

  function handleMasteryTimeout() {
    drillRunState.submitted = true;
    const input = document.getElementById('cjInput');
    if (input) { input.disabled = true; input.classList.add('cnh-input-wrong'); }
    const btn = document.getElementById('cjSubmit');
    if (btn) btn.disabled = true;
    const card = drillRunState.cards[drillRunState.cardIdx];
    const diag = { match: false, mode: 'kana', errorCode: 'wrong_form', diff: null, distance: 0, userNorm: '', targetNorm: card.expected.kana, timeout: true };
    finalizeCard(false, diag);
  }

  function submitMastery() {
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    drillRunState.submitted = true;
    const input = document.getElementById('cjInput');
    if (input) input.disabled = true;
    const btn = document.getElementById('cjSubmit');
    if (btn) btn.disabled = true;

    const card = drillRunState.cards[drillRunState.cardIdx];
    const diag = diagnose(card, drillRunState.userInput);
    if (input) input.classList.add(diag.match ? 'cnh-input-correct' : 'cnh-input-wrong');
    finalizeCard(diag.match, diag);
  }

  function finalizeCard(isCorrect, diag) {
    const card = drillRunState.cards[drillRunState.cardIdx];
    if (isCorrect) {
      let basePoints = (drillSettings.mode === 'mastery' ? 12 : 10);
      basePoints = Math.max(0, basePoints - drillRunState.hintLevel * 3);
      drillRunState.score += basePoints;
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.results.push({
      verbId:   card.verb.id,
      group:    card.verb.group,
      formCode: card.formCode,
      correct:  isCorrect,
      errorCode: diag ? diag.errorCode : null,
      hintLevel: drillRunState.hintLevel
    });

    document.getElementById('conjScore').textContent  = drillRunState.score;
    document.getElementById('conjStreak').textContent = `${drillRunState.streak} 🔥`;

    renderFeedback(card, isCorrect, diag);
  }

  function renderFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('conjFeedback');
    fbEl.classList.remove('hidden');
    fbEl.classList.remove('pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');

    const exp = card.expected;
    const v = card.verb;
    const rule = NIHONCORE_FORM_RULES[card.formCode];
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;

    let explainHtml = '';
    if (isCorrect) {
      explainHtml = `
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${exp.kana}</strong>
            <span class="pfe-roman">(${exp.romaji})</span>
            — <strong>${v.kanji}</strong> + <em>${rule.nameHu}</em>
          </span>
        </div>
      `;
    } else {
      const exHtml = (diag && diag.chosen) ? recognitionExplanation(card, diag.chosen)
                                           : buildExplanation(card, diag);

      // Mastery: char-diff blokk
      const diffHtml = (diag && diag.diff && diag.userNorm)
        ? renderDiffInline(diag.diff, diag.targetNorm)
        : `<strong class="pfe-jp-ok">${exp.kana}</strong> <span class="pfe-roman">(${exp.romaji})</span>`;

      // V2.0 P2: morféma-szintű bontás (csak ha sikerült splittelni)
      const morphHtml = (diag && diag.split && diag.split.ok && diag.split.info === 'fine')
        ? renderMorphemeDiff(diag.split, exp)
        : '';

      // Időtúllépésnél nincs „mit rontott el" — csak az idő és a helyes alak
      const firstRow = (diag && diag.timeout) ? `
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Idő</span>
          <span class="pfe-text">Lejárt az idő.</span>
        </div>` : `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${(exHtml && exHtml.title) || 'Hiba'}</span>
          <span class="pfe-text">${(exHtml && exHtml.html) || howItsBuilt(card)}</span>
        </div>`;

      explainHtml = `
        ${firstRow}
        ${morphHtml ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Tő + toldalék</span>
            <span class="pfe-text">${morphHtml}</span>
          </div>
        ` : ''}
        ${(diag && diag.diff && !diag.timeout) ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Eltérés</span>
            <span class="pfe-text">${diffHtml}</span>
          </div>
        ` : `
          <div class="pfe-row pfe-correct">
            <span class="pfe-label">Helyes</span>
            <span class="pfe-text"><strong class="pfe-jp-ok">${exp.kana}</strong> <span class="pfe-roman">(${exp.romaji})</span></span>
          </div>
        `}
      `;
    }

    const exampleHtml = v.example ? `
      <div class="pfe-row pfe-rule">
        <span class="pfe-label">Mondatban</span>
        <span class="pfe-text"><strong>${v.example.jp}</strong> <span class="pfe-roman">(${v.example.romaji})</span> <span class="cj-example-hu">— ${v.example.hu}</span></span>
      </div>
    ` : '';

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes!' : 'Nézd át a részleteket'}</span>
      </div>
      <div class="pr-fb-explain">
        ${explainHtml}
        ${exampleHtml}
      </div>
      <button class="btn btn-primary glow-effect cj-next" id="cjNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('cjNext').addEventListener('click', advanceCard);
  }

  function advanceCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showRoundSummary();
    else                                                     renderCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  /* ─────────────────────────────────────────────────
     I) UI — Round summary + per-form bontás ──────── */

  function showRoundSummary() {
    NihonCoreStats.recordSession({
      module: 'conjugation', mode: drillSettings.mode,
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Per-form bontás
    const formBreakdown = {};
    drillRunState.results.forEach(r => {
      const f = formBreakdown[r.formCode] = formBreakdown[r.formCode] || { total: 0, correct: 0 };
      f.total++; if (r.correct) f.correct++;
    });
    const formRows = Object.keys(formBreakdown).map(fcode => {
      const f = formBreakdown[fcode];
      const fpct = Math.round((f.correct / f.total) * 100);
      const rule = NIHONCORE_FORM_RULES[fcode];
      const cls = fpct === 100 ? 'fb-ok' : fpct >= 60 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${rule ? rule.shortHu : fcode}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${fpct}%"></span></span>
          <span class="cj-bd-pct">${f.correct}/${f.total} (${fpct}%)</span>
        </div>
      `;
    }).join('');

    // Persistence: localStorage profile frissítés
    updateProfileFromResults(drillRunState.results);
    renderStatsBar();

    document.getElementById('conjCard').innerHTML = '';
    document.getElementById('conjActions').innerHTML = '';
    document.getElementById('conjFeedback').classList.add('hidden');
    document.getElementById('conjFeedback').innerHTML = '';

    const summary = document.getElementById('conjSummary');
    summary.classList.remove('hidden');
    summary.classList.add('glass-panel-heavy');
    summary.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="summary-blurb">
        ${pct === 100 ? 'Tökéletes — a reflex épül! 💪'
          : pct >= 75 ? 'Erős kör. Próbáld a Mester módot ha még nem.'
          : pct >= 50 ? 'Folytasd a gyakorlást — látható a haladás.'
          : 'Térj vissza a felismerés módra, és nézd át a hibákat.'}
      </p>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Alakonként</div>
        ${formRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="cjReset">Új kör</button>
    `;
    document.getElementById('cjReset').addEventListener('click', backToLobby);
  }

  function backToLobby() {
    drillRunState.inLobby = true;
    drillRunState.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');
    document.getElementById('conjRuntime').classList.add('hidden');
    document.getElementById('conjLobby').classList.remove('hidden');
    document.getElementById('conjSummary').classList.add('hidden');
    document.getElementById('conjSummary').innerHTML = '';
    renderStatsBar();
    renderLobby();
  }

  /* ─────────────────────────────────────────────────
     J) INIT ──────────────────────────────────────── */

  renderStatsBar();
  renderLobby();

  // Kilépés gomb (egyszer beköthető — statikus HTML-ben létezik)
  const exitBtn = document.getElementById('conjExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
        '')) {
        backToLobby();
      }
    });
  }

  // Dev hook konzolból teszteléshez — pl. window._conj.conjugate(verb, 'masu')
  window._conj = { VerbDetector, StemEngine, conjugate, generateExerciseQueue };
}


/* ====================================================
   7. ADJECTIVES PAGE — Melléknév modul (V2.1) ──────
   ────────────────────────────────────────────────────
   2 család: i-adj és na-adj. Ragozás (4 i + 4 na + 1 noun-modifier),
   típusfelismerés, copula-variánsok elfogadása. いい→よい kivétel.
   2 mód MVP: Felismerés (vegyes: type + form) + Mester.
   Build mód + adaptív későbbi update-ben.
   ==================================================== */

function initAdjectivesPage() {

  /* ── A) STATE ──────────────────────────────────── */

  const PROFILE_KEY  = 'nihoncore_adj_profile_v1';
  const SETTINGS_KEY = 'nihoncore_adj_settings_v1';

  const drillSettings = mergeAdjDefaults(loadAdjSettings(), {
    types: { 'i-adj': true, 'na-adj': true },
    forms: {
      // i-adj
      i_present_affirmative: true, i_present_negative: true,
      i_past_affirmative:    true, i_past_negative:    false,
      // na-adj
      na_noun_modifier:        true,
      na_present_affirmative:  true,
      na_present_negative:     true,
      na_past_affirmative:     false,
      na_past_negative:        false
    },
    mode: 'recognition',     // 'recognition' | 'build' | 'mastery'
    adaptive: false,         // V2.1 P2 — opt-in súlyozott pickelés
    typeQuestionRatio: 0.25, // Recognition módban 25% típuskérdés
    cardCount: 8,
    timeLimit: 10000         // mastery 10 mp / kártya
  });
  NihonCorePath.apply('adjectives', drillSettings);

  const drillRunState = {
    inLobby: true,
    cards: [],
    cardIdx: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    results: [],
    submitted: false,
    userInput: '',
    chosenIdx: null,
    timerHandle: null,
    hintLevel: 0,
    // V2.1 P2 — Build mode state
    buildPick: { stemId: null, suffixIdx: null },
    buildData: null
  };

  function mergeAdjDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    out.types = { ...defaults.types, ...(saved.types || {}) };
    out.forms = { ...defaults.forms, ...(saved.forms || {}) };
    return out;
  }

  /* ── B) ENGINE — Adjective core ─────────────────── */

  // Visszaadja az összes meghatározott melléknevet egységes tömbben
  function allAdjectives() {
    return [...NIHONCORE_I_ADJECTIVES, ...NIHONCORE_NA_ADJECTIVES];
  }

  // Csoport-lookup
  function classifyAdj(adj) {
    return { type: adj.type, exception: !!adj.exception };
  }

  // Egyetlen forma kompozíciója: a közös NihonCoreConj modulban él (a dolgozatok is azt használják).
  const composeAdj = window.NihonCoreConj.composeAdj;

  /* ── C) EXERCISE GENERATOR ──────────────────────── */

  function getFilteredAdjectives() {
    return allAdjectives().filter(a => drillSettings.types[a.type]);
  }

  function getSelectedFormsForType(t) {
    return Object.keys(drillSettings.forms).filter(f => {
      if (!drillSettings.forms[f]) return false;
      const rule = NIHONCORE_ADJ_FORM_RULES[f];
      return rule && rule.type === t;
    });
  }

  function countAdjPool() {
    const adjs = getFilteredAdjectives();
    let combos = 0;
    for (const t of Object.keys(drillSettings.types)) {
      if (!drillSettings.types[t]) continue;
      const ts = adjs.filter(a => a.type === t).length;
      const fs = getSelectedFormsForType(t).length;
      combos += ts * fs;
    }
    return combos;
  }

  // V2.1 P2 — Adaptív súlyozás: profile-ból kiolvasott success rate alapján
  // hibás formák/típusok kb. 3× gyakoribbak (min 10 attempt szükséges).
  function getAdjAdaptiveWeights(adjs, forms) {
    const profile = loadAdjProfile();
    const adjWeights = adjs.map(a => {
      const ts = profile.typeStats[a.type] || { attempts: 0, correct: 0 };
      const rate = ts.attempts > 0 ? ts.correct / ts.attempts : 0.6;
      return { item: a, weight: 1 + (1 - rate) * 2 };
    });
    const formWeights = forms.map(f => {
      const fs = profile.formStats[f] || { attempts: 0, correct: 0 };
      const rate = fs.attempts > 0 ? fs.correct / fs.attempts : 0.6;
      return { item: f, weight: 1 + (1 - rate) * 2 };
    });
    return { adjWeights, formWeights };
  }

  function adjWeightedPick(weightedList) {
    if (!weightedList || weightedList.length === 0) return null;
    const total = weightedList.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of weightedList) {
      r -= x.weight;
      if (r <= 0) return x.item;
    }
    return weightedList[weightedList.length - 1].item;
  }

  function generateAdjQueue(count) {
    const adjs = getFilteredAdjectives();
    if (adjs.length === 0) return [];

    // Csoportosítva, hogy típus szerint tudjunk megfelelő formát húzni
    const byType = {
      'i-adj':  adjs.filter(a => a.type === 'i-adj'),
      'na-adj': adjs.filter(a => a.type === 'na-adj')
    };
    const formsByType = {
      'i-adj':  getSelectedFormsForType('i-adj'),
      'na-adj': getSelectedFormsForType('na-adj')
    };

    // Adaptív weight-ek (csak ha opt-in + van elég profil-adat)
    const profile = loadAdjProfile();
    const useAdaptive = drillSettings.adaptive && profile.totalAttempts >= 10;
    const allForms = [...formsByType['i-adj'], ...formsByType['na-adj']];
    const weights = useAdaptive ? getAdjAdaptiveWeights(adjs, allForms) : null;

    const queue = [];
    let attempts = 0;
    while (queue.length < count && attempts < count * 5) {
      attempts++;

      // Recognition módban kis valószínűséggel típus-kérdés (Build/Mastery módban NEM)
      if (drillSettings.mode === 'recognition'
          && drillSettings.types['i-adj'] && drillSettings.types['na-adj']
          && Math.random() < drillSettings.typeQuestionRatio) {
        const adj = useAdaptive ? adjWeightedPick(weights.adjWeights) : adjs[Math.floor(Math.random() * adjs.length)];
        queue.push({ kind: 'type-question', adj });
        continue;
      }

      // Forma-kérdés
      const eligibleTypes = ['i-adj','na-adj'].filter(t =>
        byType[t].length > 0 && formsByType[t].length > 0);
      if (eligibleTypes.length === 0) break;

      let adj, formCode;
      if (useAdaptive) {
        // Súlyozott pick: először form-ot húzunk → onnan derül ki a típus → onnan adj
        formCode = adjWeightedPick(weights.formWeights);
        if (!formCode) continue;
        const rule = NIHONCORE_ADJ_FORM_RULES[formCode];
        if (!rule) continue;
        const tAdjs = byType[rule.type];
        if (!tAdjs || tAdjs.length === 0) continue;
        // Súlyozott adj (de csak ebből a típusból)
        const typeWeights = weights.adjWeights.filter(w => w.item.type === rule.type);
        adj = adjWeightedPick(typeWeights);
      } else {
        const t = eligibleTypes[Math.floor(Math.random() * eligibleTypes.length)];
        adj = byType[t][Math.floor(Math.random() * byType[t].length)];
        formCode = formsByType[t][Math.floor(Math.random() * formsByType[t].length)];
      }

      const expected = composeAdj(adj, formCode);
      if (!expected) continue;

      const card = { kind: 'form-question', adj, formCode, expected };
      if (drillSettings.mode === 'recognition') {
        card.options = generateFormDistractors(adj, formCode, expected);
      } else if (drillSettings.mode === 'build') {
        card.buildData = buildAdjBuildCardData(adj, formCode, expected);
      }
      queue.push(card);
    }
    return queue;
  }

  // V2.1 P2 — Build mód: stem + suffix bank generátor
  function buildAdjBuildCardData(adj, formCode, expected) {
    const rule = NIHONCORE_ADJ_FORM_RULES[formCode];

    // ── Stem opciók ──
    // i-adj normál: 1 stem (lemma - 'i')
    // i-adj exception (ii): 2 stem (い és よ) — a user kell megválassza
    // na-adj: 1 stem (teljes lemma)
    let stemOptions = [];
    let correctStemId;

    if (adj.type === 'i-adj') {
      if (adj.exception) {
        // 2 stem-választás: melyik kell ehhez a formához?
        stemOptions = [
          { id: 'natural', kana: adj.stemKana,            romaji: adj.stemRomaji,
            label: 'Természetes (' + adj.kana + '-alap)',
            sub: 'csak jelen állító' },
          { id: 'canonical', kana: adj.canonicalStemKana, romaji: adj.canonicalStemRomaji,
            label: 'Canonical (よい-alap)',
            sub: 'minden ragozott alak' }
        ];
        correctStemId = (formCode === 'i_present_affirmative') ? 'natural' : 'canonical';
      } else {
        stemOptions = [{ id: 'stem', kana: adj.stemKana, romaji: adj.stemRomaji,
                         label: 'i-melléknév tő', sub: adj.kanji + ' − い' }];
        correctStemId = 'stem';
      }
    } else { // na-adj
      stemOptions = [{ id: 'stem', kana: adj.stemKana, romaji: adj.stemRomaji,
                       label: 'na-melléknév tő', sub: 'teljes alak' }];
      correctStemId = 'stem';
    }

    // ── Suffix opciók: 5 (helyes + 4 distraktor) ──
    const seen = new Set([rule.suffix.kana]);
    const suffixOptions = [{ ...rule.suffix, isCorrect: true, formCode, srcType: rule.type }];

    // 3 distraktor: ugyanazon típus más formái (wrong-form)
    const sameTypeForms = Object.keys(NIHONCORE_ADJ_FORM_RULES)
      .filter(f => f !== formCode && NIHONCORE_ADJ_FORM_RULES[f].type === adj.type);
    for (const f of sameTypeForms) {
      if (suffixOptions.length >= 4) break;
      const r = NIHONCORE_ADJ_FORM_RULES[f];
      if (seen.has(r.suffix.kana)) continue;
      suffixOptions.push({ ...r.suffix, isCorrect: false, formCode: f, srcType: r.type, wrongReason: 'wrong-form' });
      seen.add(r.suffix.kana);
    }

    // 1-2 distraktor: másik típus toldaléka (wrong-type csapda)
    const otherType = adj.type === 'i-adj' ? 'na-adj' : 'i-adj';
    const otherTypeForms = Object.keys(NIHONCORE_ADJ_FORM_RULES)
      .filter(f => NIHONCORE_ADJ_FORM_RULES[f].type === otherType);
    for (const f of otherTypeForms) {
      if (suffixOptions.length >= 5) break;
      const r = NIHONCORE_ADJ_FORM_RULES[f];
      if (seen.has(r.suffix.kana)) continue;
      suffixOptions.push({ ...r.suffix, isCorrect: false, formCode: f, srcType: r.type, wrongReason: 'wrong-type' });
      seen.add(r.suffix.kana);
    }

    // Shuffle suffixek
    for (let i = suffixOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [suffixOptions[i], suffixOptions[j]] = [suffixOptions[j], suffixOptions[i]];
    }

    return {
      stemOptions,
      suffixOptions,
      correctStemId,
      correctSuffixIdx: suffixOptions.findIndex(s => s.isCorrect),
      adjType: adj.type
    };
  }

  // 4 opció: helyes + 3 morfológiailag releváns distraktor
  function generateFormDistractors(adj, formCode, expected) {
    const seen = new Set([normAdj(expected.kana)]);
    const distractors = [];

    // 1) Ugyanennek a mellékévnek a másik 3 formája
    const sameTypeForms = Object.keys(NIHONCORE_ADJ_FORM_RULES)
      .filter(f => f !== formCode && NIHONCORE_ADJ_FORM_RULES[f].type === adj.type);
    for (const f of sameTypeForms) {
      if (distractors.length >= 1) break;
      const out = composeAdj(adj, f);
      if (out && !seen.has(normAdj(out.kana))) {
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-form' });
        seen.add(normAdj(out.kana));
      }
    }

    // 2) "Másik típus" — más típus szabályaival ragozva (csapda)
    const otherType = adj.type === 'i-adj' ? 'na-adj' : 'i-adj';
    const otherTypeRule = Object.values(NIHONCORE_ADJ_FORM_RULES)
      .find(r => r.type === otherType
        && (formCode.endsWith('present_affirmative') ? r.code.endsWith('present_affirmative')
          : formCode.endsWith('present_negative')    ? r.code.endsWith('present_negative')
          : formCode.endsWith('past_affirmative')    ? r.code.endsWith('past_affirmative')
          : formCode.endsWith('past_negative')       ? r.code.endsWith('past_negative')
          : false));
    if (otherTypeRule) {
      // Fake: a másik típus suffix-ét rátesszük az aktuális adj stem-jére
      const fakeKana = adj.stemKana + otherTypeRule.suffix.kana;
      if (!seen.has(normAdj(fakeKana))) {
        distractors.push({
          kana: fakeKana,
          romaji: adj.stemRomaji + (adj.type === 'na-adj' ? '' : ' ') + otherTypeRule.suffix.romaji,
          isCorrect: false, wrongReason: 'wrong-type'
        });
        seen.add(normAdj(fakeKana));
      }
    }

    // 3) Töltsük fel: más adj-okból ugyanezen forma
    while (distractors.length < 3) {
      const otherAdjs = allAdjectives().filter(a => a.id !== adj.id && a.type === adj.type);
      if (otherAdjs.length === 0) break;
      const other = otherAdjs[Math.floor(Math.random() * otherAdjs.length)];
      const out = composeAdj(other, formCode);
      if (out && !seen.has(normAdj(out.kana))) {
        distractors.push({ kana: out.kana, romaji: out.romaji, isCorrect: false, wrongReason: 'random' });
        seen.add(normAdj(out.kana));
      } else {
        break;
      }
    }

    const all = [
      { kana: expected.kana, romaji: expected.romaji, isCorrect: true },
      ...distractors.slice(0, 3)
    ];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  /* ── D) INPUT NORMALIZER + FEEDBACK ─────────────── */

  function normAdj(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, ' ').replace(/\s+/g, '');
  }
  // 'kirei desu' és 'kireidesu' kelljen mindkettő egyezzen
  // ezért két lépés: trim+lowercase+ws-collapse → '  ki   rei  desu' → 'ki rei desu' → 'kireidesu'

  function isRomajiAdjInput(s) {
    return /^[a-z\s]+$/.test(s.trim().toLowerCase());
  }

  function diagnoseAdj(card, userInput) {
    const exp = card.expected;
    const u = normAdj(userInput);
    if (!u) return { match: false, errorCode: 'wrong_form', userNorm: u };

    const matchKana   = u === normAdj(exp.kana);
    const matchRomaji = u === normAdj(exp.romaji);
    if (matchKana || matchRomaji) {
      return { match: true, errorCode: null, mode: matchKana ? 'kana' : 'romaji' };
    }

    // Variánsok ellenőrzése (pl. dewa arimasen vs ja arimasen)
    if (exp.variants) {
      for (const v of exp.variants) {
        if (u === normAdj(v.kana) || u === normAdj(v.romaji)) {
          return { match: true, errorCode: 'copula_variant', mode: 'variant', variantUsed: v };
        }
      }
    }

    // Másik forma egyezés? → wrong_form
    const allForms = Object.keys(NIHONCORE_ADJ_FORM_RULES);
    for (const f of allForms) {
      if (f === card.formCode) continue;
      const alt = composeAdj(card.adj, f);
      if (alt && (u === normAdj(alt.kana) || u === normAdj(alt.romaji))) {
        return { match: false, errorCode: 'wrong_form', matchedForm: f, userNorm: u };
      }
    }

    // いい kivétel: ha ii-alapú alakot adott vissza (nem yoi-alapú) a present_aff-on kívül
    if (card.adj.exception && card.formCode !== 'i_present_affirmative') {
      // Ha 'ii' alapú ragozást próbált
      const fakeIiBased = card.adj.stemKana + NIHONCORE_ADJ_FORM_RULES[card.formCode].suffix.kana;
      const fakeIiRomaji = card.adj.stemRomaji + NIHONCORE_ADJ_FORM_RULES[card.formCode].suffix.romaji;
      if (u === normAdj(fakeIiBased) || u === normAdj(fakeIiRomaji)) {
        return { match: false, errorCode: 'ii_exception', userNorm: u };
      }
    }

    // Karakter-szintű közelség → typo
    const isLatin = isRomajiAdjInput(userInput);
    const target = isLatin ? normAdj(exp.romaji) : normAdj(exp.kana);
    const diff = diffAdjLocal(u, target);
    const distance = diff.filter(op => op.type !== 'eq').length;
    if (distance <= 2) {
      return { match: false, errorCode: 'typo', diff, distance, mode: isLatin ? 'romaji' : 'kana', userNorm: u, targetNorm: target };
    }

    // Csoport-tévesztés: na-adj-t i-adj módon ragozott? (pl. kireikatta desu)
    // → wrong_form (fallback)
    return { match: false, errorCode: 'wrong_form', diff, distance, mode: isLatin ? 'romaji' : 'kana', userNorm: u, targetNorm: target };
  }

  function buildAdjExplanation(card, diag) {
    if (!diag) return '';
    const tpl = NIHONCORE_ADJ_ERROR_TYPES[diag.errorCode] || NIHONCORE_ADJ_ERROR_TYPES.wrong_form;
    const adj = card.adj;
    const rule = NIHONCORE_ADJ_FORM_RULES[card.formCode] || {};
    const exp = card.expected;

    const params = {
      lemma:        `${adj.kanji} (${adj.romaji})`,
      form:         rule.nameHu ? rule.nameHu.toLowerCase() : card.formCode,
      realType:     adj.type === 'i-adj' ? 'i-melléknév' : 'na-melléknév',
      guessedType:  adj.type === 'i-adj' ? 'na-melléknév' : 'i-melléknév',
      correct:      `${exp.kana} (${exp.romaji})`,
      hint:         adj.note || '',
      usedVariant:    (diag.variantUsed) ? diag.variantUsed.kana : '—',
      primaryVariant: rule.suffix ? rule.suffix.kana : '—'
    };
    let msg = tpl.template;
    Object.keys(params).forEach(k => {
      msg = msg.split('{' + k + '}').join(params[k]);
    });
    return { title: tpl.title, html: msg, errorCategory: tpl.type };
  }

  // ── DIFF helpers (újrahasznosítva v1.6-ból) ──
  function diffAdjLocal(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
    const ops = []; let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) { ops.unshift({type:'eq',char:a[i-1]}); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({type:'del',char:a[i-1]}); i--; }
      else { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    }
    while (i > 0) { ops.unshift({type:'del',char:a[i-1]}); i--; }
    while (j > 0) { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    return ops;
  }
  function escapeAdjHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function renderAdjDiff(diff, target) {
    if (!diff) return `<strong class="pfe-jp-ok">${escapeAdjHtml(target)}</strong>`;
    const userHtml = diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeAdjHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del">${escapeAdjHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins">${escapeAdjHtml(op.char)}</span>`;
      return '';
    }).join('');
    return `
      <div class="diff-block">
        <div class="diff-line"><span class="diff-label">Te írtad:</span><span class="diff-content">${userHtml}</span></div>
        <div class="diff-line"><span class="diff-label">Helyes:</span><span class="diff-content"><strong class="pfe-jp-ok">${escapeAdjHtml(target)}</strong></span></div>
        <div class="diff-legend">
          <span class="diff-eq-sample">helyes</span> ·
          <span class="diff-del-sample">felesleges</span> ·
          <span class="diff-ins-sample">hiányzó</span>
        </div>
      </div>
    `;
  }

  /* ── E) PERSISTENCE ─────────────────────────────── */

  function loadAdjSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function saveAdjSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadAdjProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultAdjProfile();
      const p = JSON.parse(raw);
      if (!p || !p.formStats) return defaultAdjProfile();
      return p;
    } catch (e) { return defaultAdjProfile(); }
  }
  function defaultAdjProfile() {
    return { totalAttempts: 0, totalCorrect: 0, bestStreak: 0, formStats: {}, typeStats: {} };
  }
  function saveAdjProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }
  function updateAdjProfileFromResults(results) {
    const p = loadAdjProfile();
    let run = 0, best = 0;
    results.forEach(r => {
      p.totalAttempts++;
      if (r.correct) p.totalCorrect++;
      const k = r.formCode || 'type-question';
      const fs = p.formStats[k] = p.formStats[k] || { attempts: 0, correct: 0 };
      const ts = p.typeStats[r.type] = p.typeStats[r.type] || { attempts: 0, correct: 0 };
      fs.attempts++; ts.attempts++;
      if (r.correct) { fs.correct++; ts.correct++; run++; best = Math.max(best, run); }
      else run = 0;
    });
    if (best > p.bestStreak) p.bestStreak = best;
    saveAdjProfile(p);
    return p;
  }
  function renderAdjStatsBar() {
    const p = loadAdjProfile();
    const el = document.getElementById('adjStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    const hasData = p.totalAttempts > 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">összes</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${pct}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak} 🔥</span><span class="csc-label">leghosszabb sorozat</span></div>
      ${hasData ? `<button class="conj-stat-toggle" id="adjStatsToggle">Részletek</button>` : ''}
      <div class="conj-stats-panel hidden" id="adjStatsPanel"></div>
    `;
    const tBtn = document.getElementById('adjStatsToggle');
    if (tBtn) tBtn.addEventListener('click', toggleAdjProfileDashboard);
  }

  function toggleAdjProfileDashboard() {
    const panel = document.getElementById('adjStatsPanel');
    const btn   = document.getElementById('adjStatsToggle');
    if (!panel) return;
    const opening = panel.classList.contains('hidden');
    if (opening) {
      panel.innerHTML = renderAdjProfileDashboard();
      panel.classList.remove('hidden');
      btn.classList.add('active');
      btn.textContent = '📊 Bezárás';
      const resetBtn = panel.querySelector('#adjProfileReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          NihonCoreRound.confirmDelete('Törlöd a Melléknév profilját?', 'A modul összes eddigi eredménye elvész. Ez nem vonható vissza.', () => {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderAdjStatsBar();
          });
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = 'Részletek';
    }
  }

  function renderAdjProfileDashboard() {
    const p = loadAdjProfile();
    if (p.totalAttempts === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }

    // Típusonként
    const typeRows = Object.keys(p.typeStats).map(t => {
      const s = p.typeStats[t];
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      const label = t === 'i-adj' ? 'i-melléknév' : 'na-melléknév';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    // Alakonként — leggyengébb felül
    const formEntries = Object.keys(p.formStats).map(f => {
      const s = p.formStats[f];
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      return { f, s, pct };
    }).sort((a, b) => a.pct - b.pct);

    const formRows = formEntries.map(({ f, s, pct }) => {
      const rule = NIHONCORE_ADJ_FORM_RULES[f];
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      const label = rule ? rule.shortHu : (f === 'type-question' ? 'Típus-kérdés' : f);
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    // Top-3 leggyengébb (≥3 attempt és <80%)
    const weakest = formEntries.filter(x => x.s.attempts >= 3 && x.pct < 80).slice(0, 3);
    const weakestHtml = weakest.length ? `
      <div class="cj-pd-weakest">
        <div class="cj-pd-section-label">Gyenge pontok</div>
        <div class="cj-pd-weakest-list">
          ${weakest.map(w => {
            const rule = NIHONCORE_ADJ_FORM_RULES[w.f];
            const lbl = rule ? rule.shortHu : (w.f === 'type-question' ? 'Típus-kérdés' : w.f);
            return `<span class="cj-pd-weak-chip">${lbl} <em>${w.pct}%</em></span>`;
          }).join('')}
        </div>
        <p class="cj-pd-tip">💡 Kapcsold be az <strong>Adaptív gyakorlást</strong> a lobby-ban — ezeket fogja gyakrabban kihúzni.</p>
      </div>
    ` : '';

    return `
      <div class="cj-pd-grid">
        <div class="cj-pd-block">
          <div class="cj-pd-section-label">Típusok szerint</div>
          ${typeRows || '<p class="cj-pd-empty">—</p>'}
        </div>
        <div class="cj-pd-block">
          <div class="cj-pd-section-label">Formák szerint (gyengétől erősig)</div>
          ${formRows || '<p class="cj-pd-empty">—</p>'}
        </div>
      </div>
      ${weakestHtml}
      <div class="cj-pd-actions">
        <button class="btn btn-ghost cj-pd-reset" id="adjProfileReset">🗑 Profil törlése</button>
      </div>
    `;
  }

  /* ── F) UI — Lobby ──────────────────────────────── */

  function renderAdjLobby() {
    const typesRow = [
      { id: 'i-adj',  label: 'I-melléknév',  hint: '〜い (おおきい, ふるい)' },
      { id: 'na-adj', label: 'Na-melléknév', hint: '〜な + főnév (きれい, げんき)' }
    ].map(t => `
      <button class="cj-group-btn adj-type-btn type-${t.id} ${drillSettings.types[t.id] ? 'active' : ''}" data-adj-type="${t.id}">
        <span class="cj-g-name">${t.label}</span>
        <span class="cj-g-hint">${t.hint}</span>
      </button>
    `).join('');

    const formRows = NIHONCORE_ADJ_FORM_GROUPS.map(group => {
      const chips = group.forms.map(fcode => {
        const r = NIHONCORE_ADJ_FORM_RULES[fcode];
        return `
          <button class="cj-form-chip ${drillSettings.forms[fcode] ? 'active' : ''}" data-adj-form="${fcode}">
            <span class="cjfc-name">${r.shortHu}</span>
            <span class="cjfc-sub">${r.promptHu}</span>
          </button>
        `;
      }).join('');
      return `
        <div class="cj-form-row">
          <span class="cj-form-row-label">${group.nameHu}</span>
          <div class="cj-form-chips">${chips}</div>
        </div>
      `;
    }).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'négy válaszból választasz' },
      { id: 'build',       name: 'Építkezés',  sub: 'tőből és toldalékból rakod össze' },
      { id: 'mastery',     name: 'Mester',     sub: 'magad írod be az alakot' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-adj-mode="${m.id}">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>
    `).join('');

    const presets = [5, 8, 15].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    const lobbyEl = document.getElementById('adjLobby');
    lobbyEl.innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Melléknév modul</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">Melyik típusú és melyik formájú mellékneveket szeretnéd gyakorolni?</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · Melléknévtípusok</div>
        <div class="cj-group-row adj-types-row">${typesRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Formák</div>
        ${formRows}
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Mód</div>
        <div class="cj-mode-row adj-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">4 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="adjCustomCount">vagy saját:</label>
            <input type="number" id="adjCustomCount" min="1" max="50" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-section cj-adaptive-section">
        <label class="cj-adapt-switch">
          <input type="checkbox" id="adjAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A hibás formákat és típusokat ~3× gyakrabban húzza ki a profilodból. (Legalább 10 megválaszolt kártya után kapcsol be.)</em>
          </span>
        </label>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Lehetséges kombinációk: <strong id="adjComboCount">${countAdjPool()}</strong></span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="adjStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachAdjLobbyHandlers();
    updateAdjStartBtn();
  }

  function attachAdjLobbyHandlers() {
    // Típus-toggle
    document.querySelectorAll('.adj-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.adjType;
        const isOn = drillSettings.types[t];
        const otherOn = Object.keys(drillSettings.types).filter(x => x !== t && drillSettings.types[x]).length;
        if (isOn && otherOn === 0) { adjShake(btn); return; }
        drillSettings.types[t] = !isOn;
        btn.classList.toggle('active', drillSettings.types[t]);
        saveAdjSettings();
        updateAdjStartBtn();
      });
    });

    // Forma-toggle
    document.querySelectorAll('.cj-form-chip[data-adj-form]').forEach(chip => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.adjForm;
        const isOn = drillSettings.forms[f];
        const otherOn = Object.keys(drillSettings.forms).filter(x => x !== f && drillSettings.forms[x]).length;
        if (isOn && otherOn === 0) { adjShake(chip); return; }
        drillSettings.forms[f] = !isOn;
        chip.classList.toggle('active', drillSettings.forms[f]);
        saveAdjSettings();
        updateAdjStartBtn();
      });
    });

    // Mód-toggle
    document.querySelectorAll('.cj-mode-btn[data-adj-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.mode = btn.dataset.adjMode;
        document.querySelectorAll('.cj-mode-btn[data-adj-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveAdjSettings();
      });
    });

    // Adaptive toggle
    const adaptCb = document.getElementById('adjAdaptive');
    if (adaptCb) {
      adaptCb.addEventListener('change', () => {
        drillSettings.adaptive = adaptCb.checked;
        saveAdjSettings();
      });
    }

    // Kártyaszám
    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('adjCustomCount');
        if (custom) custom.value = '';
        saveAdjSettings();
        updateAdjStartBtn();
      });
    });
    const customInput = document.getElementById('adjCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countAdjPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveAdjSettings();
          updateAdjStartBtn();
        }
      });
    }

    document.getElementById('adjStart').addEventListener('click', startAdjRound);
  }
  function adjShake(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); }
  function updateAdjStartBtn() {
    const combos = countAdjPool();
    const cEl = document.getElementById('adjComboCount');
    if (cEl) cEl.textContent = combos;
    const startBtn = document.getElementById('adjStart');
    if (!startBtn) return;
    startBtn.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    startBtn.disabled = combos === 0 || drillSettings.cardCount < 1;
  }

  /* ── G) UI — Runtime + kártya ───────────────────── */

  function startAdjRound() {
    drillRunState.cards = generateAdjQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;
    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'adjectives', mode: drillSettings.mode, results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('adjLobby').classList.add('hidden');
    document.getElementById('adjRuntime').classList.remove('hidden');
    document.getElementById('adjSummary').classList.add('hidden');
    document.getElementById('adjSummary').innerHTML = '';

    renderAdjCurrentCard();
  }

  function renderAdjCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.userInput = '';
    drillRunState.chosenIdx = null;
    drillRunState.hintLevel = 0;
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }

    document.getElementById('adjScore').textContent  = drillRunState.score;
    document.getElementById('adjStreak').textContent = `${drillRunState.streak} 🔥`;

    // Progress strip frissítés
    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('adjCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('adjProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('adjFeedback').classList.add('hidden');
    document.getElementById('adjFeedback').innerHTML = '';

    drillRunState.buildPick = { stemId: null, suffixIdx: null };
    drillRunState.buildData = null;

    const card = drillRunState.cards[drillRunState.cardIdx];
    if (card.kind === 'type-question')              renderTypeQuestionCard(card);
    else if (drillSettings.mode === 'build')        renderAdjBuildCard(card);
    else if (drillSettings.mode === 'mastery')      renderMasteryAdjCard(card);
    else                                            renderFormRecognitionCard(card);
  }

  function renderAdjPromptHeader(card) {
    const adj = card.adj;
    const typeTag = adj.type === 'i-adj'
      ? '<span class="adj-type-tag adj-tag-i">i-melléknév</span>'
      : '<span class="adj-type-tag adj-tag-na">na-melléknév</span>';
    return `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="adj-level">${adj.level}</span>
        </div>
        <div class="cj-prompt-lemma">
          <span class="cj-pl-kanji">${adj.kanji}</span>
          <span class="cj-pl-kana">${adj.kana}</span>
          <span class="cj-pl-romaji">${adj.romaji}</span>
        </div>
        <div class="cj-prompt-meaning">${adj.meaningHu}</div>
        ${typeTag}
      </div>
    `;
  }

  function renderTypeQuestionCard(card) {
    const adj = card.adj;
    document.getElementById('adjCard').innerHTML = `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow"><span class="adj-level">${adj.level}</span></div>
        <div class="cj-prompt-lemma">
          <span class="cj-pl-kanji">${adj.kanji}</span>
          <span class="cj-pl-kana">${adj.kana}</span>
          <span class="cj-pl-romaji">${adj.romaji}</span>
        </div>
        <div class="cj-prompt-meaning">${adj.meaningHu}</div>
        <div class="cj-target">
          <span class="cj-target-label">Kérdés:</span>
          <span class="cj-target-name">Milyen típusú melléknév ez?</span>
        </div>
      </div>
      <div class="adj-type-choice">
        <button class="cj-option adj-type-opt type-i-adj" data-pick="i-adj">
          <span class="cj-opt-jp">i-melléknév</span>
          <span class="adj-type-opt-sub">〜い végű, ragozható</span>
        </button>
        <button class="cj-option adj-type-opt type-na-adj" data-pick="na-adj">
          <span class="cj-opt-jp">na-melléknév</span>
          <span class="adj-type-opt-sub">copulával, főnév előtt 〜な</span>
        </button>
      </div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('adjActions').innerHTML = '';

    document.querySelectorAll('.adj-type-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const pick = btn.dataset.pick;
        const isCorrect = pick === adj.type;
        drillRunState.submitted = true;
        drillRunState.chosenIdx = pick;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const cb = document.querySelector(`.adj-type-opt[data-pick="${adj.type}"]`);
          if (cb) cb.classList.add('reveal-correct');
        }
        document.querySelectorAll('.adj-type-opt, .dont-know-btn').forEach(b => b.disabled = true);
        finalizeAdjCard(card, isCorrect, isCorrect ? null : { errorCode: 'wrong_type' });
      });
    });
    document.querySelector('#adjCard .dont-know-btn').addEventListener('click', adjDontKnow);
  }

  function renderFormRecognitionCard(card) {
    const rule = NIHONCORE_ADJ_FORM_RULES[card.formCode];
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cj-opt-jp">${opt.kana}</span>
        <span class="cj-opt-romaji">${opt.romaji}</span>
      </button>
    `).join('');

    document.getElementById('adjCard').innerHTML = `
      ${renderAdjPromptHeader(card)}
      <div class="cj-target">
        <span class="cj-target-label">Cél-alak:</span>
        <span class="cj-target-name">${rule.nameHu}</span>
        <span class="cj-target-sub">${rule.promptHu}</span>
      </div>
      ${renderAdjHintBar(card)}
      <div class="cj-options">${optionsHtml}</div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('adjActions').innerHTML = '';

    document.querySelectorAll('.cj-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const isCorrect = btn.dataset.correct === '1';
        drillRunState.submitted = true;
        drillRunState.chosenIdx = idx;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const cb = document.querySelector('.cj-option[data-correct="1"]');
          if (cb) cb.classList.add('reveal-correct');
        }
        document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);
        finalizeAdjCard(card, isCorrect, null);
      });
    });
    document.querySelector('#adjCard .dont-know-btn').addEventListener('click', adjDontKnow);
    attachAdjHintHandlers(card);
  }

  // „Nem tudom" — mindkét recognition kártyatípust kezeli (típus + forma)
  function adjDontKnow() {
    if (drillRunState.submitted) return;
    const card = drillRunState.cards[drillRunState.cardIdx];
    drillRunState.submitted = true;
    if (document.querySelector('.adj-type-opt')) {
      const cb = document.querySelector(`.adj-type-opt[data-pick="${card.adj.type}"]`);
      if (cb) cb.classList.add('reveal-correct');
      document.querySelectorAll('.adj-type-opt, .dont-know-btn').forEach(b => b.disabled = true);
      finalizeAdjCard(card, false, { errorCode: 'wrong_type' });
    } else {
      const cb = document.querySelector('.cj-option[data-correct="1"]');
      if (cb) cb.classList.add('reveal-correct');
      document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);
      finalizeAdjCard(card, false, null);
    }
    markDontKnowFeedback(document.getElementById('adjFeedback'));
  }

  /* ── G/2) UI — Build mód (V2.1 P2) ─────────────── */

  function renderAdjBuildCard(card) {
    drillRunState.buildData = card.buildData;
    const bd = drillRunState.buildData;
    const rule = NIHONCORE_ADJ_FORM_RULES[card.formCode];

    const stemSingle = bd.stemOptions.length === 1;
    const stemHtml = bd.stemOptions.map(s => `
      <button class="cj-build-stem adj-build-stem type-${bd.adjType}" data-stem-id="${s.id}">
        <span class="cjbs-col">${s.label}</span>
        <span class="cjbs-jp">${s.kana || '∅'}</span>
        <span class="cjbs-roman">${s.romaji || ''}</span>
        ${s.sub ? `<span class="cjbs-sub">${s.sub}</span>` : ''}
      </button>
    `).join('');

    const sufHtml = bd.suffixOptions.map((s, i) => `
      <button class="cj-build-suf adj-build-suf" data-suffix-idx="${i}">
        <span class="cjbf-jp">${s.kana}</span>
        <span class="cjbf-roman">${s.romaji}</span>
      </button>
    `).join('');

    const step1Label = stemSingle
      ? '1 · Tő (ehhez az alakhoz egyetlen tő tartozik)'
      : '1 · Válaszd ki a megfelelő tövet (kivételes melléknév!)';

    document.getElementById('adjCard').innerHTML = `
      ${renderAdjPromptHeader(card)}
      <div class="cj-target">
        <span class="cj-target-label">Cél-alak:</span>
        <span class="cj-target-name">${rule.nameHu}</span>
        <span class="cj-target-sub">${rule.promptHu}</span>
      </div>
      ${renderAdjHintBar(card)}
      <div class="cj-build-step">
        <div class="cj-build-step-label">${step1Label}</div>
        <div class="cj-build-stems${stemSingle ? ' cj-build-stems-single' : ' cj-build-stems-godan'}">${stemHtml}</div>
      </div>
      <div class="cj-build-step">
        <div class="cj-build-step-label">2 · Válaszd ki a toldalékot</div>
        <div class="cj-build-suffixes">${sufHtml}</div>
      </div>
      <div class="cj-build-preview" id="adjBuildPreview">
        <span class="cjbp-label">Előnézet:</span>
        <span class="cjbp-content"><em>— válassz mindkettőből —</em></span>
      </div>
    `;
    document.getElementById('adjActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="adjSubmit" disabled>Beküldés</button>
    `;

    attachAdjBuildHandlers(card);
    attachAdjHintHandlers(card);

    // Ha csak 1 stem van, auto-select
    if (stemSingle) {
      const onlyBtn = document.querySelector('.adj-build-stem');
      if (onlyBtn) { onlyBtn.classList.add('selected'); drillRunState.buildPick.stemId = onlyBtn.dataset.stemId; }
    }
  }

  function attachAdjBuildHandlers(card) {
    document.querySelectorAll('.adj-build-stem').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.adj-build-stem').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.stemId = btn.dataset.stemId;
        updateAdjBuildPreview();
      });
    });
    document.querySelectorAll('.adj-build-suf').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.adj-build-suf').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.suffixIdx = parseInt(btn.dataset.suffixIdx, 10);
        updateAdjBuildPreview();
      });
    });
    document.getElementById('adjSubmit').addEventListener('click', () => {
      if (!drillRunState.submitted) submitAdjBuild(card);
    });
  }

  function updateAdjBuildPreview() {
    const p = drillRunState.buildPick;
    const bd = drillRunState.buildData;
    const contentEl = document.getElementById('adjBuildPreview').querySelector('.cjbp-content');

    let stemPart = `<span class="morph morph-target morph-empty">___</span>`;
    let sufPart  = `<span class="morph morph-target morph-empty">___</span>`;
    if (p.stemId != null) {
      const s = bd.stemOptions.find(x => x.id === p.stemId);
      stemPart = `<span class="morph morph-target">${escapeAdjHtml(s.kana || '')}</span>`;
    }
    if (p.suffixIdx != null) {
      const s = bd.suffixOptions[p.suffixIdx];
      sufPart  = `<span class="morph morph-target">${escapeAdjHtml(s.kana)}</span>`;
    }
    contentEl.innerHTML = `${stemPart} <span class="morph-sep">+</span> ${sufPart}`;
    document.getElementById('adjSubmit').disabled = (p.stemId == null || p.suffixIdx == null);
  }

  function submitAdjBuild(card) {
    drillRunState.submitted = true;
    const bd = drillRunState.buildData;
    const p  = drillRunState.buildPick;

    const pickedStem = bd.stemOptions.find(x => x.id === p.stemId);
    const pickedSuf  = bd.suffixOptions[p.suffixIdx];
    const stemOk     = p.stemId === bd.correctStemId;
    const suffixOk   = p.suffixIdx === bd.correctSuffixIdx;
    const isCorrect  = stemOk && suffixOk;

    // Visual feedback
    document.querySelectorAll('.adj-build-stem').forEach(b => {
      b.disabled = true;
      if (b.dataset.stemId === bd.correctStemId) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(stemOk ? 'correct' : 'wrong');
    });
    document.querySelectorAll('.adj-build-suf').forEach((b, i) => {
      b.disabled = true;
      if (i === bd.correctSuffixIdx) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(suffixOk ? 'correct' : 'wrong');
    });

    // Hibakód eldöntése
    let errorCode = null;
    if (!isCorrect) {
      const pickedSufType = pickedSuf.srcType;
      const wrongType = (pickedSufType && pickedSufType !== card.adj.type);
      if (!stemOk && card.adj.exception) {
        errorCode = 'ii_exception';
      } else if (!suffixOk && wrongType) {
        errorCode = card.adj.type === 'i-adj' ? 'na_adj_used_on_i' : 'i_adj_used_on_na';
      } else if (!stemOk && !suffixOk) {
        errorCode = 'wrong_form';
      } else if (!suffixOk) {
        errorCode = 'wrong_suffix';
      } else {
        errorCode = 'wrong_form';
      }
    }

    const diag = {
      match: isCorrect,
      mode: 'kana',
      errorCode,
      buildSplit: {
        used: { stem: pickedStem.kana, suffix: pickedSuf.kana },
        expected: {
          stem: bd.stemOptions.find(x => x.id === bd.correctStemId).kana,
          suffix: bd.suffixOptions[bd.correctSuffixIdx].kana
        },
        stemOk, suffixOk
      }
    };

    // Pontozás (partial credit) − hint malus
    let points = 0;
    if (isCorrect)                 points = 12;
    else if (stemOk || suffixOk)   points = 5;
    points = Math.max(0, points - drillRunState.hintLevel * 3);

    if (isCorrect) {
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.score += points;

    drillRunState.results.push({
      adjId: card.adj.id, type: card.adj.type, formCode: card.formCode,
      kind: 'build-question',
      correct: isCorrect, errorCode,
      partial: !isCorrect && (stemOk || suffixOk),
      hintLevel: drillRunState.hintLevel
    });
    document.getElementById('adjScore').textContent  = drillRunState.score;
    document.getElementById('adjStreak').textContent = `${drillRunState.streak} 🔥`;

    renderAdjFeedback(card, isCorrect, diag);
  }

  function renderMasteryAdjCard(card) {
    const rule = NIHONCORE_ADJ_FORM_RULES[card.formCode];
    document.getElementById('adjCard').innerHTML = `
      ${renderAdjPromptHeader(card)}
      <div class="cj-target">
        <span class="cj-target-label">Cél-alak:</span>
        <span class="cj-target-name">${rule.nameHu}</span>
        <span class="cj-target-sub">${rule.promptHu}</span>
      </div>
      ${renderAdjHintBar(card)}
      <div class="cj-input-area">
        <input type="text" class="cj-input" id="adjInput"
               placeholder="pl. おおきいです vagy ookii desu"
               autocomplete="off" autocapitalize="off" spellcheck="false" />
        <div class="cj-timer-bar"><div class="cj-timer-fill" id="adjTimerFill"></div></div>
      </div>
    `;
    document.getElementById('adjActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="adjSubmit" disabled>Beküldés</button>
    `;
    attachAdjHintHandlers(card);

    const input = document.getElementById('adjInput');
    const btn = document.getElementById('adjSubmit');
    input.focus();
    input.addEventListener('input', () => {
      drillRunState.userInput = input.value.trim();
      btn.disabled = !drillRunState.userInput;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !btn.disabled && !drillRunState.submitted) {
        e.preventDefault(); submitAdjMastery(card);
      }
    });
    btn.addEventListener('click', () => { if (!drillRunState.submitted) submitAdjMastery(card); });

    startAdjMasteryTimer(card);
  }

  function startAdjMasteryTimer(card) {
    const fill = document.getElementById('adjTimerFill');
    // Időlimit csak akkor, ha a tanuló bekapcsolta (NihonCorePrefs)
    if (!NihonCorePrefs.timerOn()) { if (fill && fill.parentElement) fill.parentElement.style.display = 'none'; return; }
    const limit = drillSettings.timeLimit;
    fill.style.transition = 'none'; fill.style.width = '100%'; fill.offsetHeight;
    fill.style.transition = `width ${limit}ms linear`;
    fill.style.width = '0%';
    drillRunState.timerHandle = setTimeout(() => {
      if (!drillRunState.submitted) {
        drillRunState.submitted = true;
        const input = document.getElementById('adjInput');
        if (input) { input.disabled = true; input.classList.add('cnh-input-wrong'); }
        const btn = document.getElementById('adjSubmit');
        if (btn) btn.disabled = true;
        finalizeAdjCard(card, false, { errorCode: 'wrong_form', timeout: true, mode: 'kana', targetNorm: normAdj(card.expected.kana), userNorm: '' });
      }
    }, limit);
  }

  function submitAdjMastery(card) {
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    drillRunState.submitted = true;
    const input = document.getElementById('adjInput');
    if (input) input.disabled = true;
    const btn = document.getElementById('adjSubmit');
    if (btn) btn.disabled = true;

    const diag = diagnoseAdj(card, drillRunState.userInput);
    if (input) input.classList.add(diag.match ? 'cnh-input-correct' : 'cnh-input-wrong');
    finalizeAdjCard(card, diag.match, diag);
  }

  function finalizeAdjCard(card, isCorrect, diag) {
    if (isCorrect) {
      let basePoints = (card.kind === 'type-question') ? 5
                     : (drillSettings.mode === 'mastery') ? 12 : 10;
      basePoints = Math.max(0, basePoints - drillRunState.hintLevel * 3);
      drillRunState.score += basePoints;
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.results.push({
      adjId: card.adj.id,
      type:  card.adj.type,
      formCode: card.formCode || null,
      kind: card.kind,
      correct: isCorrect,
      errorCode: diag ? diag.errorCode : null,
      hintLevel: drillRunState.hintLevel
    });
    document.getElementById('adjScore').textContent  = drillRunState.score;
    document.getElementById('adjStreak').textContent = `${drillRunState.streak} 🔥`;

    renderAdjFeedback(card, isCorrect, diag);
  }

  function renderAdjFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('adjFeedback');
    fbEl.classList.remove('hidden', 'pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    const adj = card.adj;
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;

    let explainHtml = '';

    if (card.kind === 'type-question') {
      // Típus-felismerés feedback
      const typeLabel = adj.type === 'i-adj' ? 'i-melléknév (〜い-végű, ragozható)' : 'na-melléknév (copulával + 〜な főnév előtt)';
      explainHtml = `
        <div class="pfe-row pfe-${isCorrect ? 'correct' : 'wrong'}">
          <span class="pfe-label">${isCorrect ? 'Helyes' : 'Helyes válasz'}</span>
          <span class="pfe-text">
            <strong>${adj.kanji}</strong> egy <strong class="pfe-jp-ok">${typeLabel}</strong>.
            ${adj.note ? `<br><em>${adj.note}</em>` : ''}
          </span>
        </div>
      `;
    } else if (isCorrect) {
      // Form-question helyes
      const variantNote = (diag && diag.errorCode === 'copula_variant')
        ? `<div class="pfe-row pfe-rule"><span class="pfe-label">Variáns</span><span class="pfe-text">A <strong>${diag.variantUsed.kana}</strong> és a <strong>${card.expected.morphemes.suffix.kana}</strong> ugyanazt jelenti — mindkettő elfogadva.</span></div>` : '';
      explainHtml = `
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${card.expected.kana}</strong>
            <span class="pfe-roman">(${card.expected.romaji})</span>
          </span>
        </div>
        ${variantNote}
      `;
    } else {
      const ex = buildAdjExplanation(card, diag);

      // Build mód: morféma-szintű bontás
      const buildSplitHtml = (diag && diag.buildSplit) ? `
        <div class="morph-block">
          <div class="morph-line">
            <span class="diff-label">Te bontásod:</span>
            <span class="morph-content">
              <span class="morph ${diag.buildSplit.stemOk ? 'morph-ok' : 'morph-bad'}">${escapeAdjHtml(diag.buildSplit.used.stem || '∅')}</span>
              <span class="morph-sep">+</span>
              <span class="morph ${diag.buildSplit.suffixOk ? 'morph-ok' : 'morph-bad'}">${escapeAdjHtml(diag.buildSplit.used.suffix || '∅')}</span>
            </span>
          </div>
          <div class="morph-line">
            <span class="diff-label">Helyes bontás:</span>
            <span class="morph-content">
              <span class="morph morph-target">${escapeAdjHtml(diag.buildSplit.expected.stem || '∅')}</span>
              <span class="morph-sep">+</span>
              <span class="morph morph-target">${escapeAdjHtml(diag.buildSplit.expected.suffix)}</span>
            </span>
          </div>
        </div>
      ` : '';

      const diffHtml = (diag && diag.diff)
        ? renderAdjDiff(diag.diff, diag.targetNorm || normAdj(card.expected.kana))
        : `<strong class="pfe-jp-ok">${card.expected.kana}</strong> <span class="pfe-roman">(${card.expected.romaji})</span>`;

      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${ex.title}</span>
          <span class="pfe-text">${ex.html}</span>
        </div>
        ${buildSplitHtml ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Tő + toldalék</span>
            <span class="pfe-text">${buildSplitHtml}</span>
          </div>
        ` : ''}
        ${diag && diag.timeout ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Idő</span>
            <span class="pfe-text">Lejárt az időlimit. A helyes alak: <strong class="pfe-jp-ok">${card.expected.kana}</strong> (${card.expected.romaji}).</span>
          </div>
        ` : ''}
        ${diag && diag.diff && !diag.timeout ? `
          <div class="pfe-row pfe-context"><span class="pfe-label">Eltérés</span><span class="pfe-text">${diffHtml}</span></div>
        ` : (!buildSplitHtml ? `
          <div class="pfe-row pfe-correct"><span class="pfe-label">Helyes</span><span class="pfe-text"><strong class="pfe-jp-ok">${card.expected.kana}</strong> <span class="pfe-roman">(${card.expected.romaji})</span></span></div>
        ` : '')}
      `;
    }

    const exampleHtml = adj.example ? `
      <div class="pfe-row pfe-rule">
        <span class="pfe-label">Példa</span>
        <span class="pfe-text"><strong>${adj.example.jp}</strong> <span class="pfe-roman">(${adj.example.romaji})</span> <span class="cj-example-hu">— ${adj.example.hu}</span></span>
      </div>
    ` : '';

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes!' : 'Nézd át a részleteket'}</span>
      </div>
      <div class="pr-fb-explain">
        ${explainHtml}
        ${exampleHtml}
      </div>
      <button class="btn btn-primary glow-effect cj-next" id="adjNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('adjNext').addEventListener('click', advanceAdjCard);
  }

  function advanceAdjCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showAdjSummary();
    else                                                     renderAdjCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  /* ── H) Hint provider (újrahasznosított minta) ───── */
  function renderAdjHintBar(card) {
    if (card.kind === 'type-question') return ''; // típuskérdéshez nincs hint
    if (!card.expected || !card.expected.morphemes) return '';
    return `
      <div class="cj-hint-bar">
        <button class="cj-hint-btn" id="adjHintBtn" type="button">
          <span class="cjh-icon">💡</span>
          <span class="cjh-text">Tipp <span class="cjh-pts">(−3 pont)</span></span>
        </button>
        <div class="cj-hint-display" id="adjHintDisplay"></div>
      </div>
    `;
  }
  function attachAdjHintHandlers(card) {
    const btn = document.getElementById('adjHintBtn');
    const disp = document.getElementById('adjHintDisplay');
    if (!btn || !disp) return;
    btn.addEventListener('click', () => {
      if (drillRunState.submitted) return;
      if (drillRunState.hintLevel >= 2) return;
      drillRunState.hintLevel++;
      const e = card.expected;
      let html = disp.innerHTML;
      if (drillRunState.hintLevel === 1) {
        html += `<div class="cj-hint-line"><em>Tő:</em> <strong class="pfe-jp-ok">${escapeAdjHtml(e.morphemes.stem.kana)}</strong> <span class="pfe-roman">(${escapeAdjHtml(e.morphemes.stem.romaji)})</span></div>`;
      } else {
        html += `<div class="cj-hint-line"><em>Toldalék:</em> <strong class="pfe-jp-ok">${escapeAdjHtml(e.morphemes.suffix.kana)}</strong> <span class="pfe-roman">(${escapeAdjHtml(e.morphemes.suffix.romaji)})</span></div>`;
        btn.disabled = true;
        btn.classList.add('exhausted');
      }
      disp.innerHTML = html;
    });
  }

  /* ── I) Round summary ───────────────────────────── */
  function showAdjSummary() {
    NihonCoreStats.recordSession({
      module: 'adjectives', mode: drillSettings.mode,
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    const breakdown = {};
    drillRunState.results.forEach(r => {
      const k = r.formCode || 'type-question';
      const b = breakdown[k] = breakdown[k] || { total: 0, correct: 0 };
      b.total++; if (r.correct) b.correct++;
    });
    const formRows = Object.keys(breakdown).map(k => {
      const b = breakdown[k];
      const fpct = Math.round((b.correct / b.total) * 100);
      const rule = NIHONCORE_ADJ_FORM_RULES[k];
      const label = rule ? rule.shortHu : 'Típus-kérdés';
      const cls = fpct === 100 ? 'fb-ok' : fpct >= 60 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${fpct}%"></span></span>
          <span class="cj-bd-pct">${b.correct}/${b.total} (${fpct}%)</span>
        </div>
      `;
    }).join('');

    updateAdjProfileFromResults(drillRunState.results);
    renderAdjStatsBar();

    document.getElementById('adjCard').innerHTML = '';
    document.getElementById('adjActions').innerHTML = '';
    document.getElementById('adjFeedback').classList.add('hidden');
    document.getElementById('adjFeedback').innerHTML = '';

    const sEl = document.getElementById('adjSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Alakonként</div>
        ${formRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="adjReset">Új kör</button>
    `;
    document.getElementById('adjReset').addEventListener('click', () => {
      drillRunState.inLobby = true;
      drillRunState.cards = [];
      document.querySelector('.module-hero')?.classList.remove('hidden');
      document.getElementById('adjRuntime').classList.add('hidden');
      document.getElementById('adjLobby').classList.remove('hidden');
      document.getElementById('adjSummary').classList.add('hidden');
      document.getElementById('adjSummary').innerHTML = '';
      renderAdjStatsBar();
      renderAdjLobby();
    });
  }

  /* ── J) INIT ────────────────────────────────────── */
  renderAdjStatsBar();
  renderAdjLobby();

  // Kilépés gomb (egyszer beköthető — statikus HTML-ben létezik)
  const exitBtn = document.getElementById('adjExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
        '')) {
        drillRunState.inLobby = true;
        drillRunState.cards = [];
        if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
        document.querySelector('.module-hero')?.classList.remove('hidden');
        document.getElementById('adjRuntime').classList.add('hidden');
        document.getElementById('adjLobby').classList.remove('hidden');
        document.getElementById('adjSummary').classList.add('hidden');
        document.getElementById('adjSummary').innerHTML = '';
        renderAdjStatsBar();
        renderAdjLobby();
      }
    });
  }

  // Dev hook
  window._adj = { composeAdj, classifyAdj, diagnoseAdj, allAdjectives };
}


/* ====================================================
   8. DATE & TIME PAGE — Dátum & Idő modul (V2.3 P1) ─
   ────────────────────────────────────────────────────
   日時モジュール — japán dátum/idő tanulás.
   4 kategória (months/days/weekdays/times), 2 mód
   MVP-ben (Felismerés + Mester). Build + adaptív + Years +
   Relative Time a V2.3 P2-ben.
   A cj-* osztályokat újrahasznosítja (lobby, card, feedback).
   ==================================================== */

function initDateTimePage() {

  /* ── A) STATE ──────────────────────────────────── */

  const PROFILE_KEY  = 'nihoncore_dt_profile_v1';
  const SETTINGS_KEY = 'nihoncore_dt_settings_v1';

  const drillSettings = mergeDtDefaults(loadDtSettings(), {
    categories: {
      months: true, days: true, weekdays: true, times: true,
      // V2.3 P2 — haladó kategóriák (alapból kikapcsolva)
      hours24: false, minutes: false, years: false, relative: false,
      // számlálós alakok a leckékből: életkor (1. lecke), időtartam (5. lecke)
      ages: false, durations: false
    },
    mode: 'recognition',    // 'recognition' | 'build' | 'mastery'
    adaptive: false,        // V2.3 P2 — opt-in súlyozott pickelés
    cardCount: 8,
    timeLimit: 10000
  });
  NihonCorePath.apply('datetime', drillSettings);

  const drillRunState = {
    inLobby: true,
    cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0,
    results: [],
    submitted: false, userInput: '', chosenIdx: null,
    timerHandle: null, hintLevel: 0,
    // V2.3 P2 — Build mód
    buildPick: { aIdx: null, bIdx: null },
    buildData: null
  };

  function mergeDtDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    out.categories = { ...defaults.categories, ...(saved.categories || {}) };
    return out;
  }

  /* ── B) ENGINE — pool + distraktorok ───────────── */

  // Kategória → adat-tömb (a data.js globális tömbjei)
  function categoryDataset(catId) {
    if (catId === 'months')   return NIHONCORE_DT_MONTHS;
    if (catId === 'days')     return NIHONCORE_DT_DAYS;
    if (catId === 'weekdays') return NIHONCORE_DT_WEEKDAYS;
    if (catId === 'times')    return NIHONCORE_DT_TIMES;
    if (catId === 'hours24')  return NIHONCORE_DT_HOURS24;
    if (catId === 'minutes')  return NIHONCORE_DT_MINUTES;
    if (catId === 'years')    return NIHONCORE_DT_YEARS;
    if (catId === 'relative') return NIHONCORE_DT_RELATIVE;
    if (catId === 'ages')      return (typeof NIHONCORE_DT_AGES !== 'undefined') ? NIHONCORE_DT_AGES : [];
    if (catId === 'durations') return (typeof NIHONCORE_DT_DURATIONS !== 'undefined') ? NIHONCORE_DT_DURATIONS : [];
    return [];
  }

  function getActivePool() {
    const pool = [];
    NIHONCORE_DT_CATEGORIES.forEach(cat => {
      if (drillSettings.categories[cat.id]) {
        categoryDataset(cat.id).forEach(entry => pool.push({ catId: cat.id, entry }));
      }
    });
    return pool;
  }

  function countDtPool() { return getActivePool().length; }

  // Natív szabályos nap-olvasat (distraktorhoz: pl. 4日 → よんにち, ami HIBÁS)
  const DT_NUM_KANA = {
    1:'いち', 2:'に', 3:'さん', 4:'よん', 5:'ご', 6:'ろく', 7:'なな', 8:'はち', 9:'きゅう', 10:'じゅう',
    11:'じゅういち', 12:'じゅうに', 13:'じゅうさん', 14:'じゅうよん', 15:'じゅうご',
    20:'にじゅう', 24:'にじゅうよん'
  };
  function naiveDayReading(num) {
    return DT_NUM_KANA[num] ? DT_NUM_KANA[num] + 'にち' : null;
  }

  // ── Build mód: morféma-bontás ────────────────────
  // Egy bejegyzést [A számrész + B counter] alakra bont, ha lehetséges.
  // Visszaad: { a, b } vagy null, ha nem építhető (rendhagyó natív nap, 〜半,
  // év, relatív, AM/PM összetett).
  function computeBuildParts(entry, catId) {
    const k = entry.kana;
    if (catId === 'months'  && k.endsWith('がつ'))   return { a: k.slice(0, -2), b: 'がつ' };
    if (catId === 'days'    && k.endsWith('にち'))   return { a: k.slice(0, -2), b: 'にち' };
    if (catId === 'weekdays'&& k.endsWith('ようび')) return { a: k.slice(0, -3), b: 'ようび' };
    if ((catId === 'times' || catId === 'hours24') && k.endsWith('じ') && !entry.composite)
      return { a: k.slice(0, -1), b: 'じ' };
    if (catId === 'minutes' && (k.endsWith('ふん') || k.endsWith('ぷん')))
      return { a: k.slice(0, -2), b: k.slice(-2) };
    // életkor, időtartam: a bejegyzés unit mezője a számláló (はたち nem bontható)
    if (entry.unit && k.endsWith(entry.unit) && k.length > entry.unit.length)
      return { a: k.slice(0, -entry.unit.length), b: entry.unit };
    return null;
  }
  function isDtBuildable(entry, catId) {
    return computeBuildParts(entry, catId) !== null;
  }

  function getBuildablePool() {
    return getActivePool().filter(p => isDtBuildable(p.entry, p.catId));
  }

  function generateDtQueue(count) {
    const pool = (drillSettings.mode === 'build') ? getBuildablePool() : getActivePool();
    if (pool.length === 0) return [];

    // Adaptív súlyozás (opt-in + min 10 attempt)
    const profile = loadDtProfile();
    const useAdaptive = drillSettings.adaptive && profile.totalAttempts >= 10;
    const weighted = useAdaptive ? pool.map(p => {
      const cs = profile.catStats[p.catId] || { attempts: 0, correct: 0 };
      const rate = cs.attempts > 0 ? cs.correct / cs.attempts : 0.6;
      return { item: p, weight: 1 + (1 - rate) * 2 };
    }) : null;

    const queue = [];
    for (let i = 0; i < count; i++) {
      const pick = useAdaptive ? dtWeightedPick(weighted) : pool[Math.floor(Math.random() * pool.length)];
      const card = { catId: pick.catId, entry: pick.entry };
      if (drillSettings.mode === 'recognition') {
        card.options = generateDtDistractors(pick.entry, pick.catId);
      } else if (drillSettings.mode === 'build') {
        card.buildData = buildDtBuildCardData(pick.entry, pick.catId);
      }
      queue.push(card);
    }
    return queue;
  }

  function dtWeightedPick(weightedList) {
    const total = weightedList.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of weightedList) { r -= x.weight; if (r <= 0) return x.item; }
    return weightedList[weightedList.length - 1].item;
  }

  // Build mód kártya-adat: A-rész (számolvasat) + B-rész (counter) opciók
  function buildDtBuildCardData(entry, catId) {
    const parts = computeBuildParts(entry, catId);
    if (!parts) return null;

    // A-opciók: azonos kategória más bejegyzéseinek A-része
    const aSeen = new Set([parts.a]);
    const aOptions = [{ text: parts.a, isCorrect: true }];
    const sameCat = categoryDataset(catId).filter(e => e.id !== entry.id);
    for (const other of sameCat) {
      if (aOptions.length >= 5) break;
      const op = computeBuildParts(other, catId);
      if (op && !aSeen.has(op.a)) { aOptions.push({ text: op.a, isCorrect: false }); aSeen.add(op.a); }
    }

    // B-opciók: counter-választék (cross-category)
    // (ahol a kategóriának saját egységei vannak — időtartam —, azok az első rossz válaszok)
    const catUnits = [];
    categoryDataset(catId).forEach(e => { if (e.unit && catUnits.indexOf(e.unit) < 0) catUnits.push(e.unit); });
    const allB = catUnits.concat(['がつ', 'にち', 'じ', 'ふん', 'ぷん', 'ようび']);
    const bSeen = new Set([parts.b]);
    const bOptions = [{ text: parts.b, isCorrect: true }];
    for (const b of allB) {
      if (bOptions.length >= 4) break;
      if (!bSeen.has(b)) { bOptions.push({ text: b, isCorrect: false }); bSeen.add(b); }
    }

    const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    shuffle(aOptions);
    shuffle(bOptions);

    return {
      aOptions, bOptions,
      correctAIdx: aOptions.findIndex(o => o.isCorrect),
      correctBIdx: bOptions.findIndex(o => o.isCorrect),
      expected: parts
    };
  }

  // a csapda-válasz romajija (a kanából): enélkül a hiánya elárulná, melyik a csapda
  const naiveRomaji = kana => (window.NihonCoreKana && NihonCoreKana.toRomaji) ? NihonCoreKana.toRomaji(kana) : '';

  // 4 opció: helyes + 3 distraktor (azonos kategóriából, pedagógiai csapdákkal)
  function generateDtDistractors(entry, catId) {
    const seen = new Set([entry.kana]);
    if (entry.alt) seen.add(entry.alt.kana);            // a második helyes olvasat nem lehet rossz válasz
    const distractors = [];

    // Napoknál: rendhagyó esetén a "naív szabályos" alak nagyon hasznos csapda
    if (catId === 'days' && entry.irregular) {
      const naive = naiveDayReading(entry.num);
      if (naive && !seen.has(naive)) {
        distractors.push({ kana: naive, romaji: naiveRomaji(naive), isCorrect: false, wrongReason: 'naive-regular' });
        seen.add(naive);
      }
    }

    // Számlálós alakoknál (életkor, időtartam): a hibás „szabályos" alak a legjobb csapda (よんじかん, いちさい)
    if (entry.naive && !seen.has(entry.naive)) {
      distractors.push({ kana: entry.naive, romaji: naiveRomaji(entry.naive), isCorrect: false, wrongReason: 'naive-regular' });
      seen.add(entry.naive);
    }

    // Töltsük fel azonos kategória más olvasataival — ha a bejegyzésnek egysége van (〜じかん), előbb az
    // azonos egységűekkel, különben az egység maga elárulná a választ
    const fill = list => {
      while (distractors.length < 3 && list.length > 0) {
        const idx = Math.floor(Math.random() * list.length);
        const e = list.splice(idx, 1)[0];
        if (!seen.has(e.kana)) {
          distractors.push({ kana: e.kana, romaji: e.romaji, isCorrect: false, wrongReason: 'wrong-reading' });
          seen.add(e.kana);
        }
      }
    };
    const sameCat = categoryDataset(catId).filter(e => e.id !== entry.id);
    if (entry.unit) fill(sameCat.filter(e => e.unit === entry.unit));
    fill(sameCat.filter(e => !entry.unit || e.unit !== entry.unit));

    const all = [
      { kana: entry.kana, romaji: entry.romaji, isCorrect: true },
      ...distractors.slice(0, 3)
    ];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  /* ── C) NORMALIZER + DIAGNÓZIS ─────────────────── */

  function normDt(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, '');
  }
  function isRomajiDt(s) { return /^[a-z\s]+$/.test((s || '').trim().toLowerCase()); }

  function diagnoseDt(card, userInput) {
    const e = card.entry;
    const u = normDt(userInput);
    if (!u) return { match: false, errorCode: 'wrong_reading', userNorm: u };

    const matchKana   = u === normDt(e.kana) || (!!e.alt && u === normDt(e.alt.kana));          // alt: második helyes olvasat
    const matchRomaji = u === normDt(e.romaji) || (!!e.alt && u === normDt(e.alt.romaji));
    if (matchKana || matchRomaji) {
      return { match: true, errorCode: null, mode: matchKana ? 'kana' : 'romaji' };
    }

    const isLatin = isRomajiDt(userInput);
    const target  = isLatin ? normDt(e.romaji) : normDt(e.kana);
    const diff     = diffDtLocal(u, target);
    const distance = diff.filter(op => op.type !== 'eq').length;

    // Apró typo
    if (distance > 0 && distance <= 2) {
      return { match: false, errorCode: 'typo', diff, distance, mode: isLatin ? 'romaji' : 'kana', userNorm: u, targetNorm: target };
    }

    // Másik kategória / másik bejegyzés teljes egyezése
    for (const cat of NIHONCORE_DT_CATEGORIES) {
      for (const other of categoryDataset(cat.id)) {
        if (other.id === e.id) continue;
        if (u === normDt(other.kana) || u === normDt(other.romaji)) {
          return { match: false, errorCode: 'wrong_category', diff, distance,
                   mode: isLatin ? 'romaji' : 'kana', userNorm: u, targetNorm: target };
        }
      }
    }

    // Rendhagyó-specifikus hibakódok
    let errorCode = 'wrong_reading';
    if (e.irregular) {
      if (card.catId === 'days')         errorCode = 'irregular_day';
      else if (card.catId === 'times' ||
               card.catId === 'hours24') errorCode = 'irregular_hour';
      else if (card.catId === 'months')  errorCode = 'irregular_month';
      else if (card.catId === 'minutes') errorCode = 'irregular_minute';
      else if (card.catId === 'years')   errorCode = 'irregular_year';
      else if (e.naive)                  errorCode = 'irregular_counter';
    }

    return { match: false, errorCode, diff, distance,
             mode: isLatin ? 'romaji' : 'kana', userNorm: u, targetNorm: target };
  }

  // Rendhagyó-specifikus hibakód egy kategóriához (Recognition + diagnose közös)
  function dtIrregularErrorCode(card) {
    if (!card.entry.irregular) return 'wrong_reading';
    if (card.catId === 'days')                                  return 'irregular_day';
    if (card.catId === 'times' || card.catId === 'hours24')     return 'irregular_hour';
    if (card.catId === 'months')                                return 'irregular_month';
    if (card.catId === 'minutes')                               return 'irregular_minute';
    if (card.catId === 'years')                                 return 'irregular_year';
    if (card.entry.naive)                                       return 'irregular_counter';
    return 'wrong_reading';
  }

  function buildDtExplanation(card, diag) {
    if (!diag) return '';
    const tpl = NIHONCORE_DT_ERROR_TYPES[diag.errorCode] || NIHONCORE_DT_ERROR_TYPES.wrong_reading;
    const e = card.entry;
    const params = {
      kanji:   e.kanji,
      correct: `${e.kana} (${e.romaji})`,
      regular: (card.catId === 'days' && naiveDayReading(e.num))
        ? `<em>${naiveDayReading(e.num)}</em>` : (e.naive ? `<em>${e.naive}</em>` : '—')
    };
    let msg = tpl.template;
    Object.keys(params).forEach(k => { msg = msg.split('{' + k + '}').join(params[k]); });
    return { title: tpl.title, html: msg };
  }

  // ── DIFF helpers (újrahasznosítva v1.6 mintából) ──
  function diffDtLocal(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
    const ops = []; let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) { ops.unshift({type:'eq',char:a[i-1]}); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({type:'del',char:a[i-1]}); i--; }
      else { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    }
    while (i > 0) { ops.unshift({type:'del',char:a[i-1]}); i--; }
    while (j > 0) { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    return ops;
  }
  function escapeDtHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function renderDtDiff(diff, target) {
    if (!diff) return `<strong class="pfe-jp-ok">${escapeDtHtml(target)}</strong>`;
    const userHtml = diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeDtHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del">${escapeDtHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins">${escapeDtHtml(op.char)}</span>`;
      return '';
    }).join('');
    return `
      <div class="diff-block">
        <div class="diff-line"><span class="diff-label">Te írtad:</span><span class="diff-content">${userHtml}</span></div>
        <div class="diff-line"><span class="diff-label">Helyes:</span><span class="diff-content"><strong class="pfe-jp-ok">${escapeDtHtml(target)}</strong></span></div>
        <div class="diff-legend">
          <span class="diff-eq-sample">helyes</span> ·
          <span class="diff-del-sample">felesleges</span> ·
          <span class="diff-ins-sample">hiányzó</span>
        </div>
      </div>
    `;
  }

  /* ── D) PERSISTENCE ─────────────────────────────── */

  function loadDtSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function saveDtSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadDtProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultDtProfile();
      const p = JSON.parse(raw);
      if (!p || !p.catStats) return defaultDtProfile();
      return p;
    } catch (e) { return defaultDtProfile(); }
  }
  function defaultDtProfile() {
    return { totalAttempts: 0, totalCorrect: 0, bestStreak: 0, catStats: {} };
  }
  function saveDtProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }
  function updateDtProfileFromResults(results) {
    const p = loadDtProfile();
    let run = 0, best = 0;
    results.forEach(r => {
      p.totalAttempts++;
      if (r.correct) p.totalCorrect++;
      const cs = p.catStats[r.catId] = p.catStats[r.catId] || { attempts: 0, correct: 0 };
      cs.attempts++;
      if (r.correct) { cs.correct++; run++; best = Math.max(best, run); }
      else run = 0;
    });
    if (best > p.bestStreak) p.bestStreak = best;
    saveDtProfile(p);
    return p;
  }
  function renderDtStatsBar() {
    const p = loadDtProfile();
    const el = document.getElementById('dtStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    const hasData = p.totalAttempts > 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">összes</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${pct}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak} 🔥</span><span class="csc-label">leghosszabb sorozat</span></div>
      ${hasData ? `<button class="conj-stat-toggle" id="dtStatsToggle">Részletek</button>` : ''}
      <div class="conj-stats-panel hidden" id="dtStatsPanel"></div>
    `;
    const tBtn = document.getElementById('dtStatsToggle');
    if (tBtn) tBtn.addEventListener('click', toggleDtProfileDashboard);
  }

  function toggleDtProfileDashboard() {
    const panel = document.getElementById('dtStatsPanel');
    const btn   = document.getElementById('dtStatsToggle');
    if (!panel) return;
    const opening = panel.classList.contains('hidden');
    if (opening) {
      panel.innerHTML = renderDtProfileDashboard();
      panel.classList.remove('hidden');
      btn.classList.add('active');
      btn.textContent = '📊 Bezárás';
      const resetBtn = panel.querySelector('#dtProfileReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          NihonCoreRound.confirmDelete('Törlöd a Dátum & Idő profilját?', 'A modul összes eddigi eredménye elvész. Ez nem vonható vissza.', () => {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderDtStatsBar();
          });
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = 'Részletek';
    }
  }

  function renderDtProfileDashboard() {
    const p = loadDtProfile();
    if (p.totalAttempts === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }
    // Kategóriánként — leggyengébb felül
    const entries = Object.keys(p.catStats).map(cid => {
      const s = p.catStats[cid];
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      return { cid, s, pct };
    }).sort((a, b) => a.pct - b.pct);

    const rows = entries.map(({ cid, s, pct }) => {
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${categoryLabel(cid)}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    const weakest = entries.filter(x => x.s.attempts >= 3 && x.pct < 80).slice(0, 3);
    const weakestHtml = weakest.length ? `
      <div class="cj-pd-weakest">
        <div class="cj-pd-section-label">Gyenge pontok</div>
        <div class="cj-pd-weakest-list">
          ${weakest.map(w => `<span class="cj-pd-weak-chip">${categoryLabel(w.cid)} <em>${w.pct}%</em></span>`).join('')}
        </div>
        <p class="cj-pd-tip">💡 Kapcsold be az <strong>Adaptív gyakorlást</strong> a lobby-ban — ezeket fogja gyakrabban kihúzni.</p>
      </div>
    ` : '';

    return `
      <div class="cj-pd-block">
        <div class="cj-pd-section-label">Kategóriák szerint (gyengétől erősig)</div>
        ${rows || '<p class="cj-pd-empty">—</p>'}
      </div>
      ${weakestHtml}
      <div class="cj-pd-actions">
        <button class="btn btn-ghost cj-pd-reset" id="dtProfileReset">🗑 Profil törlése</button>
      </div>
    `;
  }

  /* ── E) LOBBY ───────────────────────────────────── */

  function renderDtLobby() {
    const catRow = NIHONCORE_DT_CATEGORIES.map(cat => `
      <button class="cj-group-btn dt-cat-btn ${drillSettings.categories[cat.id] ? 'active' : ''}" data-dt-cat="${cat.id}">
        <span class="cj-g-name">${cat.emoji} ${cat.nameHu}</span>
        <span class="cj-g-hint">${cat.hint}</span>
      </button>
    `).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'négy olvasatból választasz' },
      { id: 'build',       name: 'Építkezés',  sub: 'számból és számlálóból rakod össze' },
      { id: 'mastery',     name: 'Mester',     sub: 'magad írod be az olvasatot' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-dt-mode="${m.id}">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>
    `).join('');

    const presets = [5, 8, 15].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    document.getElementById('dtLobby').innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Dátum & Idő modul</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">Válaszd ki, mely kategóriákat gyakorolod, majd indítsd a kört.</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · Kategóriák</div>
        <div class="cj-group-row dt-cat-row">${catRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Mód</div>
        <div class="cj-mode-row dt-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="dtCustomCount">vagy saját:</label>
            <input type="number" id="dtCustomCount" min="1" max="50" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-section cj-adaptive-section">
        <label class="cj-adapt-switch">
          <input type="checkbox" id="dtAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A gyengébb kategóriákat ~3× gyakrabban húzza ki a profilodból. (Legalább 10 megválaszolt kártya után kapcsol be.)</em>
          </span>
        </label>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Gyakorolható elemek: <strong id="dtComboCount">${countDtPool()}</strong></span>
        <span class="lobby-build-note" id="dtBuildNote"></span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="dtStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachDtLobbyHandlers();
    updateDtStartBtn();
    updateDtBuildNote();
  }

  // Build módban figyelmeztet, hogy az évek/relatív/rendhagyó-natív napok kimaradnak
  function updateDtBuildNote() {
    const el = document.getElementById('dtBuildNote');
    if (!el) return;
    if (drillSettings.mode !== 'build') { el.textContent = ''; return; }
    const buildable = getBuildablePool().length;
    const all = countDtPool();
    if (buildable < all) {
      el.innerHTML = `<span class="cj-build-note-icon">ℹ️</span> Építkezés mód: <strong>${all - buildable}</strong> nem építhető elem kimarad (évek, relatív idő, rendhagyó natív napok, 〜半).`;
    } else {
      el.textContent = '';
    }
  }

  function attachDtLobbyHandlers() {
    document.querySelectorAll('.dt-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.dataset.dtCat;
        const isOn = drillSettings.categories[c];
        const otherOn = Object.keys(drillSettings.categories).filter(x => x !== c && drillSettings.categories[x]).length;
        if (isOn && otherOn === 0) { dtShake(btn); return; }
        drillSettings.categories[c] = !isOn;
        btn.classList.toggle('active', drillSettings.categories[c]);
        saveDtSettings();
        updateDtStartBtn();
        updateDtBuildNote();
      });
    });

    document.querySelectorAll('.cj-mode-btn[data-dt-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.mode = btn.dataset.dtMode;
        document.querySelectorAll('.cj-mode-btn[data-dt-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveDtSettings();
        updateDtStartBtn();
        updateDtBuildNote();
      });
    });

    const adaptCb = document.getElementById('dtAdaptive');
    if (adaptCb) {
      adaptCb.addEventListener('change', () => {
        drillSettings.adaptive = adaptCb.checked;
        saveDtSettings();
      });
    }

    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('dtCustomCount');
        if (custom) custom.value = '';
        saveDtSettings();
        updateDtStartBtn();
      });
    });
    const customInput = document.getElementById('dtCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countDtPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveDtSettings();
          updateDtStartBtn();
        }
      });
    }

    document.getElementById('dtStart').addEventListener('click', startDtRound);
  }
  function dtShake(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); }
  function updateDtStartBtn() {
    const combos = countDtPool();
    const cEl = document.getElementById('dtComboCount');
    if (cEl) cEl.textContent = combos;
    const startBtn = document.getElementById('dtStart');
    if (!startBtn) return;
    const effective = drillSettings.mode === 'build' ? getBuildablePool().length : combos;
    startBtn.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    startBtn.disabled = effective === 0 || drillSettings.cardCount < 1;
  }

  /* ── F) RUNTIME ─────────────────────────────────── */

  function startDtRound() {
    drillRunState.cards = generateDtQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;
    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'datetime', mode: drillSettings.mode, results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('dtLobby').classList.add('hidden');
    document.getElementById('dtRuntime').classList.remove('hidden');
    document.getElementById('dtSummary').classList.add('hidden');
    document.getElementById('dtSummary').innerHTML = '';

    renderDtCurrentCard();
  }

  function renderDtCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.userInput = '';
    drillRunState.chosenIdx = null;
    drillRunState.hintLevel = 0;
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }

    document.getElementById('dtScore').textContent  = drillRunState.score;
    document.getElementById('dtStreak').textContent = `${drillRunState.streak} 🔥`;

    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('dtCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('dtProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('dtFeedback').classList.add('hidden');
    document.getElementById('dtFeedback').innerHTML = '';

    drillRunState.buildPick = { aIdx: null, bIdx: null };
    drillRunState.buildData = null;

    const card = drillRunState.cards[drillRunState.cardIdx];
    if (drillSettings.mode === 'build')        renderDtBuildCard(card);
    else if (drillSettings.mode === 'mastery') renderDtMasteryCard(card);
    else                                        renderDtRecognitionCard(card);
  }

  function categoryLabel(catId) {
    const cat = NIHONCORE_DT_CATEGORIES.find(c => c.id === catId);
    return cat ? `${cat.emoji} ${cat.nameHu}` : catId;
  }

  function renderDtPromptHeader(card) {
    const e = card.entry;
    return `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="dt-cat-tag">${categoryLabel(card.catId)}</span>
          ${e.irregular ? '<span class="dt-irr-tag">rendhagyó</span>' : ''}
        </div>
        <div class="cj-prompt-lemma">
          <span class="cj-pl-kanji">${e.kanji}</span>
        </div>
        <div class="cj-prompt-meaning">${e.meaningHu}</div>
        <div class="cj-target">
          <span class="cj-target-label">Feladat:</span>
          <span class="cj-target-name">Hogyan olvasod japánul?</span>
        </div>
      </div>
    `;
  }

  function renderDtHintBar(card) {
    return `
      <div class="cj-hint-bar">
        <button class="cj-hint-btn" id="dtHintBtn" type="button">
          <span class="cjh-icon">💡</span>
          <span class="cjh-text">Tipp <span class="cjh-pts">(−3 pont)</span></span>
        </button>
        <div class="cj-hint-display" id="dtHintDisplay"></div>
      </div>
    `;
  }
  function attachDtHintHandlers(card) {
    const btn = document.getElementById('dtHintBtn');
    const disp = document.getElementById('dtHintDisplay');
    if (!btn || !disp) return;
    btn.addEventListener('click', () => {
      if (drillRunState.submitted) return;
      if (drillRunState.hintLevel >= 2) return;
      drillRunState.hintLevel++;
      const e = card.entry;
      let html = disp.innerHTML;
      if (drillRunState.hintLevel === 1) {
        html += `<div class="cj-hint-line"><em>Kategória:</em> ${categoryLabel(card.catId)}` +
                `${e.irregular ? ' — <strong>RENDHAGYÓ olvasat!</strong>' : ' — szabályos olvasat'}</div>`;
      } else {
        html += `<div class="cj-hint-line"><em>Kezdő szótag:</em> <strong class="pfe-jp-ok">${escapeDtHtml(e.kana.slice(0, 2))}…</strong></div>`;
        btn.disabled = true;
        btn.classList.add('exhausted');
      }
      disp.innerHTML = html;
    });
  }

  function renderDtRecognitionCard(card) {
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cj-opt-jp">${opt.kana}</span>
        ${opt.romaji ? `<span class="cj-opt-romaji">${opt.romaji}</span>` : ''}
      </button>
    `).join('');

    document.getElementById('dtCard').innerHTML = `
      ${renderDtPromptHeader(card)}
      ${renderDtHintBar(card)}
      <div class="cj-options">${optionsHtml}</div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('dtActions').innerHTML = '';

    document.querySelectorAll('.cj-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const isCorrect = btn.dataset.correct === '1';
        drillRunState.submitted = true;
        drillRunState.chosenIdx = idx;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const cb = document.querySelector('.cj-option[data-correct="1"]');
          if (cb) cb.classList.add('reveal-correct');
        }
        document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);
        finalizeDtCard(card, isCorrect, isCorrect ? null : { errorCode: dtIrregularErrorCode(card) });
      });
    });
    document.querySelector('#dtCard .dont-know-btn').addEventListener('click', dtDontKnow);
    attachDtHintHandlers(card);
  }

  // „Nem tudom" — felfedi a helyes olvasatot + magyarázat
  function dtDontKnow() {
    if (drillRunState.submitted) return;
    const card = drillRunState.cards[drillRunState.cardIdx];
    drillRunState.submitted = true;
    const cb = document.querySelector('.cj-option[data-correct="1"]');
    if (cb) cb.classList.add('reveal-correct');
    document.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => b.disabled = true);
    finalizeDtCard(card, false, { errorCode: dtIrregularErrorCode(card) });
    markDontKnowFeedback(document.getElementById('dtFeedback'));
  }

  /* ── Build mód (V2.3 P2) ───────────────────────── */

  function renderDtBuildCard(card) {
    drillRunState.buildData = card.buildData;
    const bd = drillRunState.buildData;

    const aHtml = bd.aOptions.map((o, i) => `
      <button class="cj-build-suf dt-build-a" data-a-idx="${i}">
        <span class="cjbf-jp">${o.text}</span>
      </button>
    `).join('');
    const bHtml = bd.bOptions.map((o, i) => `
      <button class="cj-build-suf dt-build-b" data-b-idx="${i}">
        <span class="cjbf-jp">${o.text}</span>
      </button>
    `).join('');

    document.getElementById('dtCard').innerHTML = `
      ${renderDtPromptHeader(card)}
      ${renderDtHintBar(card)}
      <div class="cj-build-step">
        <div class="cj-build-step-label">1 · Válaszd ki a szám-olvasatot</div>
        <div class="cj-build-suffixes">${aHtml}</div>
      </div>
      <div class="cj-build-step">
        <div class="cj-build-step-label">2 · Válaszd ki a counter-részt</div>
        <div class="cj-build-suffixes">${bHtml}</div>
      </div>
      <div class="cj-build-preview" id="dtBuildPreview">
        <span class="cjbp-label">Előnézet:</span>
        <span class="cjbp-content"><em>— válassz mindkettőből —</em></span>
      </div>
    `;
    document.getElementById('dtActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="dtSubmit" disabled>Beküldés</button>
    `;

    attachDtBuildHandlers(card);
    attachDtHintHandlers(card);
  }

  function attachDtBuildHandlers(card) {
    document.querySelectorAll('.dt-build-a').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.dt-build-a').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.aIdx = parseInt(btn.dataset.aIdx, 10);
        updateDtBuildPreview();
      });
    });
    document.querySelectorAll('.dt-build-b').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        document.querySelectorAll('.dt-build-b').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        drillRunState.buildPick.bIdx = parseInt(btn.dataset.bIdx, 10);
        updateDtBuildPreview();
      });
    });
    document.getElementById('dtSubmit').addEventListener('click', () => {
      if (!drillRunState.submitted) submitDtBuild(card);
    });
  }

  function updateDtBuildPreview() {
    const p = drillRunState.buildPick;
    const bd = drillRunState.buildData;
    const contentEl = document.getElementById('dtBuildPreview').querySelector('.cjbp-content');
    let aPart = `<span class="morph morph-target morph-empty">___</span>`;
    let bPart = `<span class="morph morph-target morph-empty">___</span>`;
    if (p.aIdx != null) aPart = `<span class="morph morph-target">${escapeDtHtml(bd.aOptions[p.aIdx].text)}</span>`;
    if (p.bIdx != null) bPart = `<span class="morph morph-target">${escapeDtHtml(bd.bOptions[p.bIdx].text)}</span>`;
    contentEl.innerHTML = `${aPart} <span class="morph-sep">+</span> ${bPart}`;
    document.getElementById('dtSubmit').disabled = (p.aIdx == null || p.bIdx == null);
  }

  function submitDtBuild(card) {
    drillRunState.submitted = true;
    const bd = drillRunState.buildData;
    const p  = drillRunState.buildPick;
    const aOk = p.aIdx === bd.correctAIdx;
    const bOk = p.bIdx === bd.correctBIdx;
    const isCorrect = aOk && bOk;

    document.querySelectorAll('.dt-build-a').forEach((b, i) => {
      b.disabled = true;
      if (i === bd.correctAIdx) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(aOk ? 'correct' : 'wrong');
    });
    document.querySelectorAll('.dt-build-b').forEach((b, i) => {
      b.disabled = true;
      if (i === bd.correctBIdx) b.classList.add('reveal-correct');
      if (b.classList.contains('selected')) b.classList.add(bOk ? 'correct' : 'wrong');
    });

    const diag = {
      match: isCorrect,
      errorCode: isCorrect ? null : dtIrregularErrorCode(card),
      buildSplit: {
        used: { a: bd.aOptions[p.aIdx].text, b: bd.bOptions[p.bIdx].text },
        expected: { a: bd.expected.a, b: bd.expected.b },
        aOk, bOk
      }
    };

    let pts = 0;
    if (isCorrect)            pts = 12;
    else if (aOk || bOk)      pts = 5;
    pts = Math.max(0, pts - drillRunState.hintLevel * 3);

    if (isCorrect) {
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.score += pts;

    drillRunState.results.push({
      entryId: card.entry.id, catId: card.catId,
      correct: isCorrect, errorCode: diag.errorCode,
      partial: !isCorrect && (aOk || bOk), hintLevel: drillRunState.hintLevel
    });
    document.getElementById('dtScore').textContent  = drillRunState.score;
    document.getElementById('dtStreak').textContent = `${drillRunState.streak} 🔥`;

    renderDtFeedback(card, isCorrect, diag);
  }

  function renderDtMasteryCard(card) {
    document.getElementById('dtCard').innerHTML = `
      ${renderDtPromptHeader(card)}
      ${renderDtHintBar(card)}
      <div class="cj-input-area">
        <input type="text" class="cj-input" id="dtInput"
               placeholder="pl. しちじ vagy shichiji"
               autocomplete="off" autocapitalize="off" spellcheck="false" />
        <div class="cj-timer-bar"><div class="cj-timer-fill" id="dtTimerFill"></div></div>
      </div>
    `;
    document.getElementById('dtActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="dtSubmit" disabled>Beküldés</button>
    `;
    attachDtHintHandlers(card);

    const input = document.getElementById('dtInput');
    const btn = document.getElementById('dtSubmit');
    input.focus();
    input.addEventListener('input', () => {
      drillRunState.userInput = input.value.trim();
      btn.disabled = !drillRunState.userInput;
    });
    input.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' && !btn.disabled && !drillRunState.submitted) {
        ev.preventDefault(); submitDtMastery(card);
      }
    });
    btn.addEventListener('click', () => { if (!drillRunState.submitted) submitDtMastery(card); });

    startDtMasteryTimer(card);
  }

  function startDtMasteryTimer(card) {
    const fill = document.getElementById('dtTimerFill');
    // Időlimit csak akkor, ha a tanuló bekapcsolta (NihonCorePrefs)
    if (!NihonCorePrefs.timerOn()) { if (fill && fill.parentElement) fill.parentElement.style.display = 'none'; return; }
    const limit = drillSettings.timeLimit;
    fill.style.transition = 'none'; fill.style.width = '100%'; fill.offsetHeight;
    fill.style.transition = `width ${limit}ms linear`;
    fill.style.width = '0%';
    drillRunState.timerHandle = setTimeout(() => {
      if (!drillRunState.submitted) {
        drillRunState.submitted = true;
        const input = document.getElementById('dtInput');
        if (input) { input.disabled = true; input.classList.add('cnh-input-wrong'); }
        const btn = document.getElementById('dtSubmit');
        if (btn) btn.disabled = true;
        finalizeDtCard(card, false, { errorCode: 'wrong_reading', timeout: true,
          mode: 'kana', targetNorm: normDt(card.entry.kana), userNorm: '' });
      }
    }, limit);
  }

  function submitDtMastery(card) {
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    drillRunState.submitted = true;
    const input = document.getElementById('dtInput');
    if (input) input.disabled = true;
    const btn = document.getElementById('dtSubmit');
    if (btn) btn.disabled = true;

    const diag = diagnoseDt(card, drillRunState.userInput);
    if (input) input.classList.add(diag.match ? 'cnh-input-correct' : 'cnh-input-wrong');
    finalizeDtCard(card, diag.match, diag);
  }

  function finalizeDtCard(card, isCorrect, diag) {
    if (isCorrect) {
      let pts = (drillSettings.mode === 'mastery' ? 12 : 10);
      pts = Math.max(0, pts - drillRunState.hintLevel * 3);
      drillRunState.score += pts;
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.results.push({
      entryId: card.entry.id, catId: card.catId,
      correct: isCorrect, errorCode: diag ? diag.errorCode : null,
      hintLevel: drillRunState.hintLevel
    });
    document.getElementById('dtScore').textContent  = drillRunState.score;
    document.getElementById('dtStreak').textContent = `${drillRunState.streak} 🔥`;

    renderDtFeedback(card, isCorrect, diag);
  }

  function renderDtFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('dtFeedback');
    fbEl.classList.remove('hidden', 'pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    const e = card.entry;
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;

    let explainHtml;
    if (isCorrect) {
      explainHtml = `
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong>${e.kanji}</strong> =
            <strong class="pfe-jp-ok">${e.kana}</strong>
            <span class="pfe-roman">(${e.romaji})</span>
            <span class="cj-example-hu">— ${e.meaningHu}</span>
          </span>
        </div>
      `;
    } else {
      const ex = buildDtExplanation(card, diag);
      const diffHtml = (diag && diag.diff)
        ? renderDtDiff(diag.diff, diag.targetNorm || normDt(e.kana))
        : `<strong class="pfe-jp-ok">${e.kana}</strong> <span class="pfe-roman">(${e.romaji})</span>`;

      // Build mód: morféma-bontás (A számrész + B counter)
      const bs = diag && diag.buildSplit;
      const buildSplitHtml = bs ? `
        <div class="morph-block">
          <div class="morph-line">
            <span class="diff-label">Te bontásod:</span>
            <span class="morph-content">
              <span class="morph ${bs.aOk ? 'morph-ok' : 'morph-bad'}">${escapeDtHtml(bs.used.a)}</span>
              <span class="morph-sep">+</span>
              <span class="morph ${bs.bOk ? 'morph-ok' : 'morph-bad'}">${escapeDtHtml(bs.used.b)}</span>
            </span>
          </div>
          <div class="morph-line">
            <span class="diff-label">Helyes bontás:</span>
            <span class="morph-content">
              <span class="morph morph-target">${escapeDtHtml(bs.expected.a)}</span>
              <span class="morph-sep">+</span>
              <span class="morph morph-target">${escapeDtHtml(bs.expected.b)}</span>
            </span>
          </div>
        </div>
      ` : '';

      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${ex.title}</span>
          <span class="pfe-text">${ex.html}</span>
        </div>
        ${buildSplitHtml ? `
          <div class="pfe-row pfe-context"><span class="pfe-label">Tő + toldalék</span><span class="pfe-text">${buildSplitHtml}</span></div>
        ` : ''}
        ${diag && diag.timeout ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Idő</span>
            <span class="pfe-text">Lejárt az időlimit. Helyes: <strong class="pfe-jp-ok">${e.kana}</strong> (${e.romaji}).</span>
          </div>
        ` : ''}
        ${diag && diag.diff && !diag.timeout ? `
          <div class="pfe-row pfe-context"><span class="pfe-label">Eltérés</span><span class="pfe-text">${diffHtml}</span></div>
        ` : `
          <div class="pfe-row pfe-correct"><span class="pfe-label">Helyes</span><span class="pfe-text"><strong class="pfe-jp-ok">${e.kana}</strong> <span class="pfe-roman">(${e.romaji})</span> <span class="cj-example-hu">— ${e.meaningHu}</span></span></div>
        `}
      `;
    }

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes!' : 'Nézd át a részleteket'}</span>
      </div>
      <div class="pr-fb-explain">${explainHtml}</div>
      <button class="btn btn-primary glow-effect cj-next" id="dtNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('dtNext').addEventListener('click', advanceDtCard);
  }

  function advanceDtCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showDtSummary();
    else                                                     renderDtCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  function showDtSummary() {
    NihonCoreStats.recordSession({
      module: 'datetime', mode: drillSettings.mode,
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Kategóriánként
    const breakdown = {};
    drillRunState.results.forEach(r => {
      const b = breakdown[r.catId] = breakdown[r.catId] || { total: 0, correct: 0 };
      b.total++; if (r.correct) b.correct++;
    });
    const catRows = Object.keys(breakdown).map(cid => {
      const b = breakdown[cid];
      const cpct = Math.round((b.correct / b.total) * 100);
      const cls = cpct === 100 ? 'fb-ok' : cpct >= 60 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${categoryLabel(cid)}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${cpct}%"></span></span>
          <span class="cj-bd-pct">${b.correct}/${b.total} (${cpct}%)</span>
        </div>
      `;
    }).join('');

    updateDtProfileFromResults(drillRunState.results);
    renderDtStatsBar();

    document.getElementById('dtCard').innerHTML = '';
    document.getElementById('dtActions').innerHTML = '';
    document.getElementById('dtFeedback').classList.add('hidden');
    document.getElementById('dtFeedback').innerHTML = '';

    const sEl = document.getElementById('dtSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Kategóriánként</div>
        ${catRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="dtReset">Új kör</button>
    `;
    document.getElementById('dtReset').addEventListener('click', backToDtLobby);
  }

  function backToDtLobby() {
    drillRunState.inLobby = true;
    drillRunState.cards = [];
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    document.querySelector('.module-hero')?.classList.remove('hidden');
    document.getElementById('dtRuntime').classList.add('hidden');
    document.getElementById('dtLobby').classList.remove('hidden');
    document.getElementById('dtSummary').classList.add('hidden');
    document.getElementById('dtSummary').innerHTML = '';
    renderDtStatsBar();
    renderDtLobby();
  }

  /* ── G) INIT ────────────────────────────────────── */
  renderDtStatsBar();
  renderDtLobby();

  const exitBtn = document.getElementById('dtExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
        '')) {
        backToDtLobby();
      }
    });
  }

  // Dev hook
  window._dt = { diagnoseDt, getActivePool, generateDtQueue, generateDtDistractors, computeBuildParts };
}


/* ====================================================
   9. LISTENING PAGE — Hallás & Kiejtés (V3 P1) ─────
   ────────────────────────────────────────────────────
   Audio-alapú hallásértés. NihonCoreAudio motorral.
   Módok: Audio Recognition (PLAY + 4 választós) · Diktálás
   (PLAY → romaji input + mora-diff motor — V3 P2 A–C).
   Hátralévő P2: trap-analyzer, adaptív replay, globális injekció.
   A cj-* osztályok újrahasznosítva.
   ==================================================== */

function initListeningPage() {

  /* ── A) STATE ──────────────────────────────────── */

  const PROFILE_KEY  = 'nihoncore_listening_profile_v1';
  const SETTINGS_KEY = 'nihoncore_listening_settings_v1';

  const drillSettings = mergeLstDefaults(loadLstSettings(), {
    tier: 'beginner',        // egyválasztós lejátszási tempó (V3 P2 fix)
    mode: 'recognition',     // 'recognition' | 'dictation' | 'pro' (V6)
    cardCount: 8,
    adaptive: false          // V3 P2 D/E — opt-in trap-súlyozás + smart replay
  });
  NihonCorePath.apply('listening', drillSettings);

  const drillRunState = {
    inLobby: true,
    cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0,
    results: [],
    submitted: false,
    replayCount: 0, slowUsed: false, audioFailed: false,
    speedPenalty: 0          // V3 P2 E — adaptív tempó-lassítás a körön belül
  };

  function mergeLstDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    // Régi (multi-select) 'tiers' kulcs migrációja → egyetlen 'tier'
    if (saved.tier == null) out.tier = defaults.tier;
    delete out.tiers;
    return out;
  }

  /* ── B) ENGINE ─────────────────────────────────── */

  // V3 P2 fix: a tier már csak tempó — a teljes lecke-készlet mindig aktív
  function getActiveLessons() {
    return NIHONCORE_AUDIO_LESSONS.slice();
  }
  function countLstPool() { return getActiveLessons().length; }

  // V6 — Pro mód: mondat-szintű listening. A meglévő Grammar Patterns példáit
  // reuse-oljuk (mintánként két mondat). A séma egységes a sima
  // audio-leckéével: { id, text, romaji, meaningHu, source, jlpt }. NEM
  // hozunk létre új tartalmat — runtime aggregáció.
  function getProSentences() {
    const out = [];
    if (typeof NIHONCORE_GRAMMAR_PATTERNS !== 'undefined') {
      NIHONCORE_GRAMMAR_PATTERNS.forEach(p => {
        (p.examples || []).forEach((ex, i) => {
          if (!ex.kana) return;
          out.push({
            id: 'pro_grm_' + p.id + '_' + i,
            text: ex.kana,
            romaji: ex.romaji || '',
            meaningHu: ex.hu || '',
            source: 'grammar',
            jlpt: p.jlpt || 'N4',
            patternId: p.id,
            patternLabel: p.label,
            traps: []        // mondat-szinten nem trap-tagged egyelőre
          });
        });
      });
    }
    return out;
  }
  function countProPool() { return getProSentences().length; }

  // Playback-sebesség a kiválasztott tempó-szintből (nem a lecke difficulty-jéből).
  // 2026-06-03 fix: a Pro-mód MINDIG natural 1.0× alap (kártya-szintű override),
  // mert a Pro-listening mondatainál a tier-szerinti lassítás a prozódiát
  // tönkretenné — a spec szerint Pro = natural, slow = 0.75× (NEM 0.6×).
  function tierSpeed() {
    const tier = NIHONCORE_AUDIO_TIERS.find(t => t.id === drillSettings.tier);
    return tier ? tier.speed : 1.0;
  }
  function lessonSpeed() { return tierSpeed(); }   // legacy alias (nem-Pro hívókhoz)
  function computeLessonSpeed(card) {
    return (card && card.isPro) ? 1.0 : tierSpeed();
  }

  // V3 P2 D — adaptív lecke-súly: a user gyenge hang-csapdáit hordozó
  // leckék nagyobb súlyt kapnak (max ~3×).
  function getLessonWeight(lesson, profile) {
    let w = 1;
    (lesson.traps || []).forEach(t => {
      const errs = (profile.trapErrors && profile.trapErrors[t]) || 0;
      w += Math.min(errs, 6) / 3;
    });
    return w;
  }
  function lstWeightedPick(weightedList) {
    const total = weightedList.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of weightedList) { r -= x.weight; if (r <= 0) return x.lesson; }
    return weightedList[weightedList.length - 1].lesson;
  }

  function generateListeningQueue(count) {
    // V6 — Pro mód: külön pool (mondat-szintű), Diktálás-szerű kártya séma
    if (drillSettings.mode === 'pro') {
      const proPool = getProSentences();
      if (proPool.length === 0) return [];
      const queue = [];
      const used = new Set();
      // Először unique-shuffle, hogy ne ugyanaz a mondat jöjjön 2× egy körben
      // ha pool elég nagy; pool < count esetén ismétlésre is mehet
      const shuffled = proPool.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      for (let i = 0; i < count; i++) {
        const lesson = (i < shuffled.length)
          ? shuffled[i]
          : proPool[Math.floor(Math.random() * proPool.length)];
        queue.push({ lesson, isPro: true });
      }
      return queue;
    }

    const pool = getActiveLessons();
    if (pool.length === 0) return [];
    const dictation = drillSettings.mode === 'dictation';

    // V3 P2 D — trap-súlyozott pickelés (opt-in + min. 10 attempt)
    const profile = loadLstProfile();
    const useAdaptive = drillSettings.adaptive && profile.totalAttempts >= 10;
    const weighted = useAdaptive
      ? pool.map(l => ({ lesson: l, weight: getLessonWeight(l, profile) }))
      : null;

    const queue = [];
    for (let i = 0; i < count; i++) {
      const lesson = useAdaptive
        ? lstWeightedPick(weighted)
        : pool[Math.floor(Math.random() * pool.length)];
      // Diktálásnál nincs szükség distraktorokra (szabad input).
      queue.push(dictation ? { lesson } : { lesson, options: generateAudioDistractors(lesson) });
    }
    return queue;
  }

  // 4 opció: helyes + 3 distraktor. Minimal-pair esetén a partner
  // KÖTELEZŐEN az opciók közt van (ez a pedagógiai mag).
  function generateAudioDistractors(lesson) {
    const seen = new Set([lesson.id]);
    const distractors = [];

    // 1) Minimal-pair partner — a legfontosabb csapda-distraktor
    if (lesson.pairWith) {
      const partner = NIHONCORE_AUDIO_LESSONS.find(l => l.id === lesson.pairWith);
      if (partner) { distractors.push(partner); seen.add(partner.id); }
    }

    // 2) Azonos kategória más leckéi
    const sameCat = NIHONCORE_AUDIO_LESSONS.filter(l => l.category === lesson.category && !seen.has(l.id));
    while (distractors.length < 3 && sameCat.length > 0) {
      const idx = Math.floor(Math.random() * sameCat.length);
      const pick = sameCat.splice(idx, 1)[0];
      distractors.push(pick); seen.add(pick.id);
    }

    // 3) Bármi más, ha még kevés
    const rest = NIHONCORE_AUDIO_LESSONS.filter(l => !seen.has(l.id));
    while (distractors.length < 3 && rest.length > 0) {
      const idx = Math.floor(Math.random() * rest.length);
      const pick = rest.splice(idx, 1)[0];
      distractors.push(pick); seen.add(pick.id);
    }

    const all = [
      { lesson, isCorrect: true },
      ...distractors.slice(0, 3).map(l => ({ lesson: l, isCorrect: false }))
    ];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  // Hibadiagnózis: ha a választott a minimal-pair partner ÉS közös trap-jük
  // van, audio-specifikus hibakód (long_vowel / sokuon / mora).
  function diagnoseAudio(card, chosenLesson) {
    const correct = card.lesson;
    if (chosenLesson.id === correct.id) return { match: true, errorCode: null };

    let errorCode = 'wrong_choice';
    if (correct.pairWith === chosenLesson.id) {
      const sharedTrap = (correct.traps || []).find(t => (chosenLesson.traps || []).includes(t));
      if (sharedTrap) errorCode = sharedTrap;
    }
    return { match: false, errorCode, chosen: chosenLesson };
  }

  function buildLstExplanation(card, diag) {
    const tpl = NIHONCORE_AUDIO_ERROR_TYPES[diag.errorCode] || NIHONCORE_AUDIO_ERROR_TYPES.wrong_choice;
    const c = card.lesson;
    const params = {
      correct: c.text,
      romaji:  c.romaji,
      meaning: c.meaningHu,
      chosen:  diag.chosen ? `<strong class="pfe-jp-wrong">${diag.chosen.text}</strong>` : '—'
    };
    let msg = tpl.template;
    Object.keys(params).forEach(k => { msg = msg.split('{' + k + '}').join(params[k]); });
    return { title: tpl.title, html: msg };
  }

  /* ── B2) DIKTÁLÁS-MOTOR (V3 P2) ─────────────────────
     Romaji → kana normalizáló + audio-tudatos mora-diff.
     Belső canonical forma: hiragana. Input: csak romaji.
     A leckék explicit kana-választ tárolnak, így a parser
     determinisztikus — nincs "találgató" logika.
     ==================================================== */

  // Romaji → hiragana szótár (Hepburn). A sokuon (kis っ) és az
  // ん nem táblából jön — a parserben, dinamikusan dől el.
  const ROMAJI_KANA = {
    a:'あ', i:'い', u:'う', e:'え', o:'お',
    ka:'か', ki:'き', ku:'く', ke:'け', ko:'こ',
    ga:'が', gi:'ぎ', gu:'ぐ', ge:'げ', go:'ご',
    sa:'さ', shi:'し', si:'し', su:'す', se:'せ', so:'そ',
    za:'ざ', ji:'じ', zi:'じ', zu:'ず', ze:'ぜ', zo:'ぞ',
    ta:'た', chi:'ち', ti:'ち', tsu:'つ', tu:'つ', te:'て', to:'と',
    da:'だ', di:'ぢ', du:'づ', de:'で', do:'ど',
    na:'な', ni:'に', nu:'ぬ', ne:'ね', no:'の',
    ha:'は', hi:'ひ', fu:'ふ', hu:'ふ', he:'へ', ho:'ほ',
    ba:'ば', bi:'び', bu:'ぶ', be:'べ', bo:'ぼ',
    pa:'ぱ', pi:'ぴ', pu:'ぷ', pe:'ぺ', po:'ぽ',
    ma:'ま', mi:'み', mu:'む', me:'め', mo:'も',
    ya:'や', yu:'ゆ', yo:'よ',
    ra:'ら', ri:'り', ru:'る', re:'れ', ro:'ろ',
    wa:'わ', wo:'を', n:'ん',
    kya:'きゃ', kyu:'きゅ', kyo:'きょ',
    gya:'ぎゃ', gyu:'ぎゅ', gyo:'ぎょ',
    sha:'しゃ', shu:'しゅ', sho:'しょ', sya:'しゃ', syu:'しゅ', syo:'しょ',
    ja:'じゃ', ju:'じゅ', jo:'じょ', jya:'じゃ', jyu:'じゅ', jyo:'じょ',
    cha:'ちゃ', chu:'ちゅ', cho:'ちょ', cya:'ちゃ', cyu:'ちゅ', cyo:'ちょ',
    nya:'にゃ', nyu:'にゅ', nyo:'にょ',
    hya:'ひゃ', hyu:'ひゅ', hyo:'ひょ',
    bya:'びゃ', byu:'びゅ', byo:'びょ',
    pya:'ぴゃ', pyu:'ぴゅ', pyo:'ぴょ',
    mya:'みゃ', myu:'みゅ', myo:'みょ',
    rya:'りゃ', ryu:'りゅ', ryo:'りょ',
    fa:'ふぁ', fi:'ふぃ', fe:'ふぇ', fo:'ふぉ'
  };

  // Hiragana → magánhangzó (a katakana ー hosszújel feloldásához).
  const VOWEL_OF = (function () {
    const rows = {
      'あ': 'あかさたなはまやらわがざだばぱゃ',
      'い': 'いきしちにひみりぎじぢびぴ',
      'う': 'うくすつぬふむゆるぐずづぶぷゅ',
      'え': 'えけせてねへめれげぜでべぺ',
      'お': 'おこそとのほもよろをごぞどぼぽょ'
    };
    const m = {};
    Object.keys(rows).forEach(v => { for (const ch of rows[v]) m[ch] = v; });
    return m;
  })();

  function isVowelChar(c) {
    return c === 'a' || c === 'i' || c === 'u' || c === 'e' || c === 'o';
  }

  // Romaji szöveg → hiragana.
  function romajiToKana(input) {
    let s = (input || '').toLowerCase().normalize('NFKC');
    s = s.replace(/[āâ]/g, 'aa').replace(/[īî]/g, 'ii').replace(/[ūû]/g, 'uu')
         .replace(/[ēê]/g, 'ee').replace(/[ōô]/g, 'oo');
    // szavanként: a szóvégi n mindig ん (hon ya → ほんや, nem ほにゃ)
    return s.replace(/[^a-z'\s]/g, '').split(/\s+/).map(romajiWordToKana).join('');
  }
  function romajiWordToKana(s) {
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i];
      // sokuon: kettőzött mássalhangzó (+ a tch különeset)
      if (c !== 'n' && !isVowelChar(c) && s[i + 1] === c) { out += 'っ'; i++; continue; }
      if (c === 't' && s[i + 1] === 'c' && s[i + 2] === 'h') { out += 'っ'; i++; continue; }
      // ん: az n nem magánhangzó és nem 'y' előtt
      if (c === 'n') {
        const nx = s[i + 1];
        if (nx === undefined || (!isVowelChar(nx) && nx !== 'y')) {
          out += 'ん'; i++;
          if (nx === "'") i++;
          continue;
        }
      }
      // tábla — leghosszabb illeszkedés (3 → 2 → 1)
      let matched = false;
      for (let len = 3; len >= 1; len--) {
        const chunk = s.substring(i, i + len);
        if (ROMAJI_KANA[chunk]) { out += ROMAJI_KANA[chunk]; i += chunk.length; matched = true; break; }
      }
      if (!matched) { out += c; i++; }
    }
    return out;
  }

  // Kana-canonical normalizálás (a HELYES válasz oldalára):
  // katakana → hiragana, ー hosszújel feloldása, whitespace ki.
  function normalizeKana(str) {
    let s = (str || '').normalize('NFKC').replace(/\s+/g, '');
    s = s.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
    let out = '';
    for (let k = 0; k < s.length; k++) {
      if (s[k] === 'ー' && out.length) {
        out += VOWEL_OF[out[out.length - 1]] || '';
      } else out += s[k];
    }
    return out;
  }

  // Kana-string → mora-tömb. A kis ゃゅょ az előző karakterhez tapad,
  // a kis っ önálló mora (timing-egység).
  function toMorae(kana) {
    const small = 'ゃゅょ';
    const morae = [];
    for (let k = 0; k < kana.length; k++) {
      const nx = kana[k + 1];
      if (nx && small.includes(nx)) { morae.push(kana[k] + nx); k++; }
      else morae.push(kana[k]);
    }
    return morae;
  }

  // Mora-szintű igazítás (Levenshtein + visszafejtés).
  // op.type: 'eq' egyezés · 'sub' csere · 'ins' user-többlet · 'del' user-hiány
  function moraDiff(a, b) {
    const n = a.length, m = b.length;
    const dp = [];
    for (let x = 0; x <= n; x++) { dp.push(new Array(m + 1).fill(0)); dp[x][0] = x; }
    for (let y = 0; y <= m; y++) dp[0][y] = y;
    for (let x = 1; x <= n; x++) for (let y = 1; y <= m; y++) {
      dp[x][y] = a[x - 1] === b[y - 1]
        ? dp[x - 1][y - 1]
        : 1 + Math.min(dp[x - 1][y - 1], dp[x - 1][y], dp[x][y - 1]);
    }
    const ops = [];
    let x = n, y = m;
    while (x > 0 || y > 0) {
      if (x > 0 && y > 0 && a[x - 1] === b[y - 1]) {
        ops.push({ type: 'eq', user: a[x - 1], ans: b[y - 1] }); x--; y--;
      } else if (x > 0 && y > 0 && dp[x][y] === dp[x - 1][y - 1] + 1) {
        ops.push({ type: 'sub', user: a[x - 1], ans: b[y - 1] }); x--; y--;
      } else if (x > 0 && dp[x][y] === dp[x - 1][y] + 1) {
        ops.push({ type: 'ins', user: a[x - 1], ans: null }); x--;
      } else {
        ops.push({ type: 'del', user: null, ans: b[y - 1] }); y--;
      }
    }
    return ops.reverse();
  }

  // Mora-eltérések → audio-specifikus hibakód. Prioritás: sokuon > long_vowel > mora.
  // Ha a válasz túlnyomórészt hibás (több eltérés mint egyezés), a user
  // egy MÁS szót írt — ilyenkor wrong_choice, nem egy konkrét trap. (Két
  // ismeretlen szó Levenshtein-igazítása véletlen magánhangzó-/っ-eltérést
  // is dobhat, ami félrevezető trap-kód lenne.)
  function classifyMoraOps(ops) {
    const VOWELS = 'あいうえお';
    let sokuon = false, longVowel = false, mora = false;
    let eqCount = 0, diffCount = 0;
    ops.forEach(op => {
      if (op.type === 'eq') { eqCount++; return; }
      diffCount++;
      if (op.type === 'sub') {
        if (op.user === 'っ' || op.ans === 'っ') sokuon = true;
        else mora = true;
        return;
      }
      const tok = op.ans || op.user;            // del / ins
      if (tok === 'っ') sokuon = true;
      else if (tok.length === 1 && VOWELS.includes(tok)) longVowel = true;
      else mora = true;
    });
    if (diffCount >= 2 && diffCount > eqCount) return 'wrong_choice';
    if (sokuon)    return 'sokuon';
    if (longVowel) return 'long_vowel';
    if (mora)      return 'mora';
    return 'wrong_choice';
  }

  // Két-soros mora-diff vizualizáció (user vs helyes).
  function renderMoraDiff(ops) {
    const cell = (txt, cls) => `<span class="lst-mora-cell ${cls}">${txt}</span>`;
    const userCells = ops.map(op => {
      if (op.type === 'eq')  return cell(op.user, 'is-eq');
      if (op.type === 'sub') return cell(op.user, 'is-sub');
      if (op.type === 'ins') return cell(op.user, 'is-ins');
      return cell('·', 'is-gap');
    }).join('');
    const ansCells = ops.map(op => {
      if (op.type === 'eq')  return cell(op.ans, 'is-eq');
      if (op.type === 'sub') return cell(op.ans, 'is-ok');
      if (op.type === 'del') return cell(op.ans, 'is-miss');
      return cell('·', 'is-gap');
    }).join('');
    return `
      <div class="lst-mora-diff">
        <div class="lst-mora-row">
          <span class="lst-mora-label">Te írtad</span>
          <span class="lst-mora-cells">${userCells}</span>
        </div>
        <div class="lst-mora-row">
          <span class="lst-mora-label">Helyes</span>
          <span class="lst-mora-cells">${ansCells}</span>
        </div>
      </div>`;
  }

  // Diktálás-diagnózis: romaji input → canonical összevetés a lecke
  // explicit kana-válaszával. Egyezés → helyes; egyébként mora-diff.
  function classifyDictation(raw, lesson) {
    // A helyes oldalról az írásjelek kimaradnak (a romajiból sem lesz írásjel),
    // és a partikulák kiejtés szerinti írása (wa, o, e) nem hiba.
    const ansKana  = normalizeKana(lesson.text).replace(/[、。？！?!「」・,.]/g, '');
    const userKana = window.NihonCoreKana.repairSpoken(romajiToKana(raw), ansKana);
    if (userKana && userKana === ansKana) {
      return { match: true, errorCode: null, chosenKana: userKana, diffHtml: '' };
    }
    if (!userKana) {
      return { match: false, errorCode: 'wrong_choice', chosenKana: '', diffHtml: '' };
    }
    const userMorae = toMorae(userKana);
    const ansMorae  = toMorae(ansKana);
    const ops = moraDiff(userMorae, ansMorae);
    return {
      match: false,
      errorCode: classifyMoraOps(ops),
      chosenKana: userKana,
      diffHtml: renderMoraDiff(ops)
    };
  }

  // Diktálás-feedback magyarázat (a recognition buildLstExplanation
  // párja — itt a {chosen} a user beírt kanája, nem egy lecke).
  function buildDictExplanation(card, diag) {
    const tpl = NIHONCORE_AUDIO_ERROR_TYPES[diag.errorCode] || NIHONCORE_AUDIO_ERROR_TYPES.wrong_choice;
    const c = card.lesson;
    const params = {
      correct: c.text, romaji: c.romaji, meaning: c.meaningHu,
      chosen: diag.chosenKana ? `<strong class="pfe-jp-wrong">${diag.chosenKana}</strong>` : '—'
    };
    let msg = tpl.template;
    Object.keys(params).forEach(k => { msg = msg.split('{' + k + '}').join(params[k]); });
    return { title: tpl.title, html: msg };
  }

  /* ── C) PERSISTENCE ────────────────────────────── */

  function loadLstSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function saveLstSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadLstProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultLstProfile();
      const p = JSON.parse(raw);
      if (!p || !p.trapErrors) return defaultLstProfile();
      return p;
    } catch (e) { return defaultLstProfile(); }
  }
  function defaultLstProfile() {
    return {
      totalAttempts: 0, totalCorrect: 0, bestStreak: 0, replayCount: 0,
      trapErrors: { long_vowel: 0, sokuon: 0, mora: 0 }
    };
  }
  function saveLstProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }
  function updateLstProfileFromResults(results) {
    const p = loadLstProfile();
    let run = 0, best = 0;
    results.forEach(r => {
      p.totalAttempts++;
      p.replayCount += (r.replayCount || 0);
      if (r.correct) { p.totalCorrect++; run++; best = Math.max(best, run); }
      else {
        run = 0;
        if (r.errorCode && p.trapErrors[r.errorCode] != null) p.trapErrors[r.errorCode]++;
      }
    });
    if (best > p.bestStreak) p.bestStreak = best;
    saveLstProfile(p);
    return p;
  }
  function renderLstStatsBar() {
    const p = loadLstProfile();
    const el = document.getElementById('lstStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">összes</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${pct}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak} 🔥</span><span class="csc-label">leghosszabb sorozat</span></div>
    `;
  }

  /* ── D) LOBBY ──────────────────────────────────── */

  function renderLstLobby() {
    const tierRow = NIHONCORE_AUDIO_TIERS.map(t => `
      <button class="cj-group-btn lst-tier-btn ${drillSettings.tier === t.id ? 'active' : ''}" data-lst-tier="${t.id}">
        <span class="cj-g-name">${t.nameHu}</span>
        <span class="cj-g-hint">${t.sub}</span>
      </button>
    `).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'meghallgatod, négyből választasz', enabled: true },
      { id: 'dictation',   name: 'Diktálás', sub: 'meghallgatod, és leírod romajival', enabled: true },
      { id: 'pro',         name: 'Mondatok',   sub: 'egész mondat, természetes tempóban', enabled: true }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''} ${m.enabled ? '' : 'lst-mode-locked'}"
              data-lst-mode="${m.id}" ${m.enabled ? '' : 'disabled'}>
        <span class="cj-m-name">${m.name}${m.enabled ? '' : ' 🔒'}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>
    `).join('');

    const presets = [5, 8, 15].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    document.getElementById('lstLobby').innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Hallás & Kiejtés</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">Válaszd ki a lejátszási tempót — a teljes ${countLstPool()}-leckés készleten gyakorolsz.</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · Lejátszási tempó</div>
        <div class="cj-group-row lst-tier-row">${tierRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Mód</div>
        <div class="cj-mode-row lst-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="lstCustomCount">vagy saját:</label>
            <input type="number" id="lstCustomCount" min="1" max="50" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-section cj-adaptive-section">
        <label class="cj-adapt-switch">
          <input type="checkbox" id="lstAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A gyenge hang-csapdáidat gyakrabban húzza, a hibázott kártyát visszahozza, és lassítja a tempót, ha nehéz. (Legalább 10 megválaszolt kártya után kapcsol be.)</em>
          </span>
        </label>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Gyakorolható audió-leckék: <strong id="lstComboCount">${countLstPool()}</strong></span>
        <span class="lobby-build-note">🔊 A hang a Google TTS-ből jön — első lejátszáskor pici késés lehet.</span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="lstStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachLstLobbyHandlers();
    updateLstStartBtn();
  }

  function attachLstLobbyHandlers() {
    document.querySelectorAll('.lst-tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Egyválasztós: a kiválasztott tempó aktív, a többi kikapcsol
        drillSettings.tier = btn.dataset.lstTier;
        document.querySelectorAll('.lst-tier-btn').forEach(b =>
          b.classList.toggle('active', b.dataset.lstTier === drillSettings.tier));
        saveLstSettings();
        updateLstStartBtn();
      });
    });

    document.querySelectorAll('.cj-mode-btn[data-lst-mode]').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        drillSettings.mode = btn.dataset.lstMode;
        document.querySelectorAll('.cj-mode-btn[data-lst-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveLstSettings();
        updateLstStartBtn();   // V6 — a pool-szám is változik Pro-nál
      });
    });

    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('lstCustomCount');
        if (custom) custom.value = '';
        saveLstSettings();
        updateLstStartBtn();
      });
    });
    const customInput = document.getElementById('lstCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = (drillSettings.mode === 'pro') ? countProPool() : countLstPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveLstSettings();
          updateLstStartBtn();
        }
      });
    }

    const adaptCb = document.getElementById('lstAdaptive');
    if (adaptCb) {
      adaptCb.addEventListener('change', () => {
        drillSettings.adaptive = adaptCb.checked;
        saveLstSettings();
      });
    }

    document.getElementById('lstStart').addEventListener('click', startLstRound);
  }
  function lstShake(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); }
  function updateLstStartBtn() {
    // V6 — a pool-szám mód-függő (Pro = mondat-szintű)
    const isPro = drillSettings.mode === 'pro';
    const combos = isPro ? countProPool() : countLstPool();
    const cEl = document.getElementById('lstComboCount');
    if (cEl) {
      cEl.textContent = combos;
      const labelEl = cEl.parentNode;
      if (labelEl) {
        labelEl.innerHTML = isPro
          ? `Gyakorolható mondatok (Pro): <strong id="lstComboCount">${combos}</strong>`
          : `Gyakorolható audió-leckék: <strong id="lstComboCount">${combos}</strong>`;
      }
    }
    const startBtn = document.getElementById('lstStart');
    if (!startBtn) return;
    startBtn.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    startBtn.disabled = combos === 0 || drillSettings.cardCount < 1;
  }

  /* ── E) RUNTIME ────────────────────────────────── */

  function startLstRound() {
    drillRunState.cards = generateListeningQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;
    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.speedPenalty = 0;
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'listening', mode: drillSettings.mode, results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('lstLobby').classList.add('hidden');
    document.getElementById('lstRuntime').classList.remove('hidden');
    document.getElementById('lstSummary').classList.add('hidden');
    document.getElementById('lstSummary').innerHTML = '';

    renderLstCurrentCard();
  }

  function renderLstCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.replayCount = 0;
    drillRunState.slowUsed = false;
    drillRunState.audioFailed = false;
    NihonCoreAudio.stop();

    document.getElementById('lstScore').textContent  = drillRunState.score;
    document.getElementById('lstStreak').textContent = `${drillRunState.streak} 🔥`;

    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('lstCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('lstProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('lstFeedback').classList.add('hidden');
    document.getElementById('lstFeedback').innerHTML = '';

    renderListeningCard(drillRunState.cards[drillRunState.cardIdx]);
  }

  function renderListeningCard(card) {
    if (drillSettings.mode === 'pro')       { renderProCard(card); return; }
    if (drillSettings.mode === 'dictation') { renderDictationCard(card); return; }
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option lst-option" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cj-opt-jp">${opt.lesson.text}</span>
        <span class="lst-opt-meaning">${opt.lesson.meaningHu}</span>
      </button>
    `).join('');

    document.getElementById('lstCard').innerHTML = `
      <div class="lst-audio-zone">
        <button class="lst-play-btn pulse" id="lstPlayBtn" type="button">
          <span class="lst-play-icon">▶</span>
          <span class="lst-play-label">Lejátszás</span>
        </button>
        <button class="lst-slow-btn" id="lstSlowBtn" type="button">
          🐢 Lassan
        </button>
      </div>
      <div class="lst-replay-info" id="lstReplayInfo"></div>
      <div class="lst-audio-fallback hidden" id="lstAudioFallback"></div>
      <div class="lst-prompt">Mit hallottál?</div>
      <div class="cj-options">${optionsHtml}</div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('lstActions').innerHTML = '';

    document.getElementById('lstPlayBtn').addEventListener('click', () => playCardAudio(card, false));
    document.getElementById('lstSlowBtn').addEventListener('click', () => playCardAudio(card, true));

    document.querySelectorAll('.lst-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        submitListening(card, idx, btn);
      });
    });
    document.querySelector('#lstCard .dont-know-btn')
      .addEventListener('click', () => listeningDontKnow(card));
  }

  function playCardAudio(card, slow) {
    // V6 — Pro mód: natural tempó alap, mérsékelt slow (mondatnál a 0.6× túl lassú).
    // 2026-06-03 fix: `computeLessonSpeed(card)` Pro-aware; nem-Pro = tier-speed.
    let speed;
    if (card.isPro) {
      speed = slow ? 0.75 : 1.0;
    } else {
      speed = slow ? 0.6 : computeLessonSpeed(card);
    }
    // V3 P2 E — adaptív lassítás: ha a user küzd, a normál tempó csökken
    if (!slow && drillSettings.adaptive && drillRunState.speedPenalty > 0) {
      speed = Math.max(0.55, speed - drillRunState.speedPenalty);
    }
    if (slow) drillRunState.slowUsed = true;
    drillRunState.replayCount++;
    const info = document.getElementById('lstReplayInfo');
    if (info && drillRunState.replayCount > 1) {
      info.textContent = `Lejátszás: ${drillRunState.replayCount}×`;
    }
    const playBtn = document.getElementById('lstPlayBtn');
    if (playBtn) playBtn.classList.remove('pulse');

    NihonCoreAudio.play(card.lesson.text, {
      speed,
      onError: () => handleLstAudioError(card)
    });
  }

  function handleLstAudioError(card) {
    drillRunState.audioFailed = true;
    const fb = document.getElementById('lstAudioFallback');
    if (fb) {
      fb.classList.remove('hidden');
      fb.innerHTML = `🔇 A hang most nem elérhető (Google TTS). Szöveg-fallback: ` +
                     `<strong class="pfe-jp-ok">${card.lesson.text}</strong>`;
    }
    // 2026-06-03 fix B4: spec-elvárás szerint az onError letiltja a hanggombokat,
    // megakadályozza a spam-elhető hibafutást. (Visszaáll a következő kártyára
    // renderelésnél, mivel a renderListeningCard új gombokat hoz létre.)
    document.querySelectorAll('#lstPlayBtn, #lstSlowBtn, #lstFbReplay').forEach(b => {
      if (b) { b.disabled = true; b.classList.add('lst-audio-disabled'); }
    });
  }

  // V3 P2 E — adaptív utómunka egy válasz után: smart replay (a hibázott
  // kártya egyszer visszatér a kör vége felé) + tempó-penalty hangolása.
  function adaptiveAfterAnswer(card, isCorrect) {
    if (!drillSettings.adaptive) return;
    if (isCorrect) {
      drillRunState.speedPenalty = Math.max(0, drillRunState.speedPenalty - 0.05);
      return;
    }
    drillRunState.speedPenalty = Math.min(0.3, drillRunState.speedPenalty + 0.1);
    if (!card._replayed) {
      card._replayed = true;
      // 2026-06-03 fix B2: a clone megőrzi az `isPro` flaget, különben a
      // replay-elt Pro-kártya tier-speed-en menne le 1.0× helyett.
      const clone = card.options
        ? { lesson: card.lesson, options: card.options, isPro: !!card.isPro, _replayed: true }
        : { lesson: card.lesson, isPro: !!card.isPro, _replayed: true };
      const insertAt = Math.min(drillRunState.cardIdx + 3, drillRunState.cards.length);
      drillRunState.cards.splice(insertAt, 0, clone);
    }
  }

  function submitListening(card, idx, btn) {
    drillRunState.submitted = true;
    const chosen = card.options[idx];
    const diag = diagnoseAudio(card, chosen.lesson);
    const isCorrect = diag.match;

    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      const cb = document.querySelector('.lst-option[data-correct="1"]');
      if (cb) cb.classList.add('reveal-correct');
    }
    document.querySelectorAll('.lst-option, .dont-know-btn').forEach(b => b.disabled = true);

    if (isCorrect) {
      // Pontozás: 10 pont, kis levonás sok replay-ért (3+ lejátszás)
      let pts = 10;
      if (drillRunState.replayCount >= 4) pts -= 2;
      drillRunState.score += Math.max(0, pts);
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }

    drillRunState.results.push({
      lessonId: card.lesson.id,
      category: card.lesson.category,
      correct: isCorrect,
      errorCode: diag.errorCode,
      replayCount: drillRunState.replayCount,
      slowUsed: drillRunState.slowUsed
    });
    document.getElementById('lstScore').textContent  = drillRunState.score;
    document.getElementById('lstStreak').textContent = `${drillRunState.streak} 🔥`;

    adaptiveAfterAnswer(card, isCorrect);
    renderLstFeedback(card, isCorrect, diag);
  }

  // „Nem tudom" — felfedi a helyes választ + magyarázat (Audio Recognition)
  function listeningDontKnow(card) {
    if (drillRunState.submitted) return;
    drillRunState.submitted = true;
    const cb = document.querySelector('.lst-option[data-correct="1"]');
    if (cb) cb.classList.add('reveal-correct');
    document.querySelectorAll('.lst-option, .dont-know-btn').forEach(b => b.disabled = true);
    drillRunState.streak = 0;
    drillRunState.results.push({
      lessonId: card.lesson.id,
      category: card.lesson.category,
      correct: false,
      errorCode: 'wrong_choice',     // 2026-06-03 fix B8: konzisztens a feedback-kel
      replayCount: drillRunState.replayCount,
      slowUsed: drillRunState.slowUsed,
      dontKnow: true                 // külön flag, ha a stats-rétegnek később kell
    });
    document.getElementById('lstScore').textContent  = drillRunState.score;
    document.getElementById('lstStreak').textContent = `${drillRunState.streak} 🔥`;
    adaptiveAfterAnswer(card, false);
    renderLstFeedback(card, false, { match: false, errorCode: 'wrong_choice', chosen: null });
    markDontKnowFeedback(document.getElementById('lstFeedback'));
  }

  function renderLstFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('lstFeedback');
    fbEl.classList.remove('hidden', 'pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    const c = card.lesson;
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;

    let explainHtml;
    if (isCorrect) {
      explainHtml = `
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${c.text}</strong>
            <span class="pfe-roman">(${c.romaji})</span>
            <span class="cj-example-hu">— ${c.meaningHu}</span>
          </span>
        </div>
      `;
    } else {
      const ex = buildLstExplanation(card, diag);
      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${ex.title}</span>
          <span class="pfe-text">${ex.html}</span>
        </div>
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${c.text}</strong>
            <span class="pfe-roman">(${c.romaji})</span>
            <span class="cj-example-hu">— ${c.meaningHu}</span>
          </span>
        </div>
      `;
    }

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes hallás!' : 'Nézd át a részleteket'}</span>
      </div>
      <div class="pr-fb-explain">${explainHtml}</div>
      <div class="lst-fb-replay">
        <button class="lst-slow-btn" id="lstFbReplay" type="button">🔊 Hallgasd újra</button>
      </div>
      <button class="btn btn-primary glow-effect cj-next" id="lstNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('lstFbReplay').addEventListener('click', () => {
      // 2026-06-03 fix B5: a silent onError helyett a meglévő szöveg-fallback
      // mutatása és a gomb letiltása (spec: defenzív hálózat).
      NihonCoreAudio.play(c.text, {
        speed: computeLessonSpeed(card),
        onError: () => handleLstAudioError(card)
      });
    });
    document.getElementById('lstNext').addEventListener('click', advanceLstCard);
  }

  /* ── E2) DIKTÁLÁS MÓD (V3 P2) ───────────────────────
     State-folyamat: card render → PLAY → romaji input →
     Ellenőrzés → mora-diff feedback → Következő.
     ==================================================== */

  function renderDictationCard(card) {
    const c = card.lesson;
    document.getElementById('lstCard').innerHTML = `
      <div class="lst-audio-zone">
        <button class="lst-play-btn pulse" id="lstPlayBtn" type="button">
          <span class="lst-play-icon">▶</span>
          <span class="lst-play-label">Lejátszás</span>
        </button>
        <button class="lst-slow-btn" id="lstSlowBtn" type="button">🐢 Lassan</button>
      </div>
      <div class="lst-replay-info" id="lstReplayInfo"></div>
      <div class="lst-audio-fallback hidden" id="lstAudioFallback"></div>
      <div class="lst-dict-zone">
        <div class="lst-prompt">Írd le romaji-val, amit hallottál</div>
        <div class="lst-dict-cat">${NIHONCORE_AUDIO_CATEGORIES[c.category] || c.category}</div>
        <input type="text" class="cj-input lst-dict-input" id="lstDictInput"
               placeholder="pl. tooka" autocomplete="off" autocapitalize="off"
               autocorrect="off" spellcheck="false" />
        <div class="lst-dict-preview" id="lstDictPreview" aria-hidden="true"></div>
      </div>
    `;
    document.getElementById('lstActions').innerHTML =
      `<button class="btn btn-primary glow-effect lst-dict-submit" id="lstDictSubmit" type="button">Ellenőrzés</button>`;

    document.getElementById('lstPlayBtn').addEventListener('click', () => playCardAudio(card, false));
    document.getElementById('lstSlowBtn').addEventListener('click', () => playCardAudio(card, true));

    const input = document.getElementById('lstDictInput');
    const preview = document.getElementById('lstDictPreview');
    // Élő romaji → kana preview (a normalizáló pipeline-t vizuálisan tanítja)
    input.addEventListener('input', () => { preview.textContent = romajiToKana(input.value.trim()); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); trySubmitDictation(card); }
    });
    document.getElementById('lstDictSubmit').addEventListener('click', () => trySubmitDictation(card));
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 60);
  }

  /* ── E3) PRO MÓD (V6) — mondat-szintű listening ─────
     Reuse: a Diktálás-motor (romaji→kana parser, mora-diff). A különbség:
     - mondat-szintű szöveg (NIHONCORE_GRAMMAR_PATTERNS.examples)
     - természetes tempó (1.0×, NEM 0.6× lassú alap)
     - context badge-sor a kártya tetején (kategória + JLPT + pattern-cím)
     - HU fordítás teal hint-zónában, mert mondat-kontextus segít a hallásnál
     ==================================================== */

  function renderProCard(card) {
    const c = card.lesson;
    const jlptTag = c.jlpt ? `<span class="dt-cat-tag grm-jlpt-tag">JLPT ${c.jlpt}</span>` : '';
    const patternTag = c.patternLabel
      ? `<span class="dt-cat-tag grm-pattern-tag">${c.patternLabel}</span>` : '';

    document.getElementById('lstCard').innerHTML = `
      <div class="cj-prompt-eyebrow lst-pro-eyebrow">
        <span class="dt-cat-tag lst-pro-tag">🎧 Pro hallás</span>
        ${jlptTag}
        ${patternTag}
      </div>
      <div class="grm-trans-hu lst-pro-hu">
        <span class="grm-trans-hu-label">Magyar fordítás (kontextus)</span>
        <span class="grm-trans-hu-text">${c.meaningHu}</span>
      </div>
      <div class="lst-audio-zone">
        <button class="lst-play-btn pulse" id="lstPlayBtn" type="button">
          <span class="lst-play-icon">▶</span>
          <span class="lst-play-label">Lejátszás</span>
        </button>
        <button class="lst-slow-btn" id="lstSlowBtn" type="button">🐢 Lassan</button>
      </div>
      <div class="lst-replay-info" id="lstReplayInfo"></div>
      <div class="lst-audio-fallback hidden" id="lstAudioFallback"></div>
      <div class="lst-dict-zone">
        <div class="lst-prompt">Írd le romaji-val a teljes mondatot</div>
        <input type="text" class="cj-input lst-dict-input lst-pro-input" id="lstDictInput"
               placeholder="pl. ame ga futtara, uchi ni imasu"
               autocomplete="off" autocapitalize="off"
               autocorrect="off" spellcheck="false" />
        <div class="lst-dict-preview" id="lstDictPreview" aria-hidden="true"></div>
      </div>
    `;
    document.getElementById('lstActions').innerHTML =
      `<button class="btn btn-primary glow-effect lst-dict-submit" id="lstDictSubmit" type="button">Ellenőrzés</button>`;

    document.getElementById('lstPlayBtn').addEventListener('click', () => playCardAudio(card, false));
    document.getElementById('lstSlowBtn').addEventListener('click', () => playCardAudio(card, true));

    const input = document.getElementById('lstDictInput');
    const preview = document.getElementById('lstDictPreview');
    input.addEventListener('input', () => { preview.textContent = romajiToKana(input.value.trim()); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); trySubmitDictation(card); }
    });
    document.getElementById('lstDictSubmit').addEventListener('click', () => trySubmitDictation(card));
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 60);
  }

  function trySubmitDictation(card) {
    if (drillRunState.submitted) return;
    const input = document.getElementById('lstDictInput');
    if (!input) return;
    const raw = (input.value || '').trim();
    if (!raw) { lstShake(input); try { input.focus(); } catch (e) {} return; }
    submitDictation(card, raw);
  }

  function submitDictation(card, raw) {
    drillRunState.submitted = true;
    const diag = classifyDictation(raw, card.lesson);
    const isCorrect = diag.match;

    const input = document.getElementById('lstDictInput');
    if (input) {
      input.disabled = true;
      input.classList.add(isCorrect ? 'cnh-input-correct' : 'cnh-input-wrong');
    }
    const submitBtn = document.getElementById('lstDictSubmit');
    if (submitBtn) submitBtn.disabled = true;

    if (isCorrect) {
      // Diktálás nehezebb mint a felismerés → 12 pont alap
      let pts = 12;
      if (drillRunState.replayCount >= 4) pts -= 2;
      drillRunState.score += Math.max(0, pts);
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }

    drillRunState.results.push({
      lessonId: card.lesson.id,
      category: card.lesson.category,
      correct: isCorrect,
      errorCode: diag.errorCode,
      replayCount: drillRunState.replayCount,
      slowUsed: drillRunState.slowUsed
    });
    document.getElementById('lstScore').textContent  = drillRunState.score;
    document.getElementById('lstStreak').textContent = `${drillRunState.streak} 🔥`;

    adaptiveAfterAnswer(card, isCorrect);
    renderDictationFeedback(card, isCorrect, diag);
  }

  function renderDictationFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('lstFeedback');
    fbEl.classList.remove('hidden', 'pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    const c = card.lesson;
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;

    const correctRow = `
      <div class="pfe-row pfe-correct">
        <span class="pfe-label">Helyes</span>
        <span class="pfe-text">
          <strong class="pfe-jp-ok">${c.text}</strong>
          <span class="pfe-roman">(${c.romaji})</span>
          <span class="cj-example-hu">— ${c.meaningHu}</span>
        </span>
      </div>`;

    let explainHtml;
    if (isCorrect) {
      explainHtml = correctRow;
    } else {
      const ex = buildDictExplanation(card, diag);
      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${ex.title}</span>
          <span class="pfe-text">${ex.html}</span>
        </div>
        ${diag.diffHtml || ''}
        ${correctRow}`;
    }

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes leírás!' : 'Nézd át a mora-bontást'}</span>
      </div>
      <div class="pr-fb-explain">${explainHtml}</div>
      <div class="lst-fb-replay">
        <button class="lst-slow-btn" id="lstFbReplay" type="button">🔊 Hallgasd újra</button>
      </div>
      <button class="btn btn-primary glow-effect cj-next" id="lstNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('lstFbReplay').addEventListener('click', () => {
      // 2026-06-03 fix B5: a silent onError helyett szöveg-fallback + disable.
      NihonCoreAudio.play(c.text, {
        speed: computeLessonSpeed(card),
        onError: () => handleLstAudioError(card)
      });
    });
    document.getElementById('lstNext').addEventListener('click', advanceLstCard);
  }

  function advanceLstCard() {
    NihonCoreAudio.stop();
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showLstSummary();
    else                                                     renderLstCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  function showLstSummary() {
    NihonCoreStats.recordSession({
      module: 'listening', mode: drillSettings.mode,
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const totalReplays = drillRunState.results.reduce((s, r) => s + (r.replayCount || 0), 0);

    // Kategóriánként
    const breakdown = {};
    drillRunState.results.forEach(r => {
      const b = breakdown[r.category] = breakdown[r.category] || { total: 0, correct: 0 };
      b.total++; if (r.correct) b.correct++;
    });
    const catRows = Object.keys(breakdown).map(cid => {
      const b = breakdown[cid];
      const cpct = Math.round((b.correct / b.total) * 100);
      const cls = cpct === 100 ? 'fb-ok' : cpct >= 60 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${NIHONCORE_AUDIO_CATEGORIES[cid] || cid}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${cpct}%"></span></span>
          <span class="cj-bd-pct">${b.correct}/${b.total} (${cpct}%)</span>
        </div>
      `;
    }).join('');

    updateLstProfileFromResults(drillRunState.results);
    renderLstStatsBar();

    document.getElementById('lstCard').innerHTML = '';
    document.getElementById('lstActions').innerHTML = '';
    document.getElementById('lstFeedback').classList.add('hidden');
    document.getElementById('lstFeedback').innerHTML = '';

    const sEl = document.getElementById('lstSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Kategóriánként</div>
        ${catRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
        <div class="sd-final-stat"><span class="sf-label">Összes lejátszás</span><span class="sf-value">${totalReplays}×</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="lstReset">Új kör</button>
    `;
    document.getElementById('lstReset').addEventListener('click', backToLstLobby);
  }

  function backToLstLobby() {
    NihonCoreAudio.stop();
    drillRunState.inLobby = true;
    drillRunState.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');
    document.getElementById('lstRuntime').classList.add('hidden');
    document.getElementById('lstLobby').classList.remove('hidden');
    document.getElementById('lstSummary').classList.add('hidden');
    document.getElementById('lstSummary').innerHTML = '';
    renderLstStatsBar();
    renderLstLobby();
  }

  /* ── F) INIT ───────────────────────────────────── */
  renderLstStatsBar();
  renderLstLobby();

  const exitBtn = document.getElementById('lstExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.' +
        '')) {
        backToLstLobby();
      }
    });
  }

  // Dev hook
  window._lst = {
    diagnoseAudio, getActiveLessons, generateListeningQueue,
    romajiToKana, normalizeKana, toMorae, classifyDictation,
    getLessonWeight, loadLstProfile
  };
}


/* ====================================================
   9a. initGrammarPage() — V5 P1 Grammar Patterns ────
   ────────────────────────────────────────────────────
   grammar.html. Sentence-szintű mintázatok (〜たら,
   〜なきゃ, 〜のに, …). 2 mód: Felismerés (4-választós
   melyik-minta) és Cloze (a hiányzó morféma beírása).
   Opt-in SRS ütemezés (NihonCoreSRS) — esedékes itemek
   előre kerülnek, új itemek töltik fel a sort.
   ==================================================== */

function initGrammarPage() {

  /* ── A) STATE ──────────────────────────────────── */

  const PROFILE_KEY  = 'nihoncore_grm_profile_v1';
  const SETTINGS_KEY = 'nihoncore_grm_settings_v1';
  const SRS_PREFIX   = 'grammar:';

  // Indulóként minden N4 minta + minden kategória aktív; N5/N3 + adaptive opt-in.
  function defaultGrmCats() {
    const out = {};
    NIHONCORE_GRAMMAR_CATEGORIES.forEach(c => { out[c.id] = true; });
    return out;
  }
  const drillSettings = mergeGrmDefaults(loadGrmSettings(), {
    jlpt: { N5: true, N4: true, N3: true },
    categories: defaultGrmCats(),
    mode: 'recognition',    // 'recognition' | 'cloze'
    srs: false,             // opt-in SRS-vezérelt sor
    adaptive: false,        // V5 P3a — opt-in súlyozott pickelés patternStats alapján
    cardCount: 8,
    timeLimit: 18000
  });
  NihonCorePath.apply('grammar', drillSettings);

  const drillRunState = {
    inLobby: true,
    cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0,
    results: [],
    submitted: false, userInput: '', chosenIdx: null,
    timerHandle: null, hintLevel: 0,
    roundStartTs: 0,
    // V5 P4 — Translate mód state
    translateTrayIdx: [], translateAnswerIdx: []
  };

  function mergeGrmDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    out.jlpt = { ...defaults.jlpt, ...(saved.jlpt || {}) };
    out.categories = { ...defaults.categories, ...(saved.categories || {}) };
    return out;
  }

  /* ── B) ENGINE — pool + distraktorok ───────────── */

  function patternsByJlpt(jlpt) {
    return NIHONCORE_GRAMMAR_PATTERNS.filter(p => p.jlpt === jlpt);
  }

  // Tanulási út: a lépés felsorolt mintákra szűkítheti a kört (preset.patterns).
  // Nem a beállítások része, így a szabad gyakorlás szűrőit nem írja át.
  const pathPatterns = (function () {
    const step = window.NihonCorePath && NihonCorePath.activeStep();
    const ids = step && step.module === 'grammar' && step.preset && step.preset.patterns;
    return Array.isArray(ids) && ids.length ? ids : null;
  })();

  function getActivePool() {
    if (pathPatterns) return NIHONCORE_GRAMMAR_PATTERNS.filter(p => pathPatterns.indexOf(p.id) >= 0);
    return NIHONCORE_GRAMMAR_PATTERNS.filter(p =>
      drillSettings.jlpt[p.jlpt] && drillSettings.categories[p.category]
    );
  }

  function countGrmPool() { return getActivePool().length; }

  // Minden pattern legalább 2 példát kapott — a Cloze módhoz minden példa
  // egy külön item. Recognition módban patternenként egy találomra húzott példa.
  function exampleItemId(pattern, exIdx) {
    return SRS_PREFIX + pattern.id + ':ex' + exIdx;
  }
  function patternItemId(pattern) {
    return SRS_PREFIX + pattern.id;
  }

  // Az összes ismert SRS itemId — a NihonCoreSRS getDueItems-hez.
  function allItemIds() {
    const ids = [];
    NIHONCORE_GRAMMAR_PATTERNS.forEach(p => {
      ids.push(patternItemId(p));
      p.examples.forEach((_, i) => ids.push(exampleItemId(p, i)));
    });
    return ids;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // V5 P3a — Adaptív sampling: a profil patternStats alapján a gyenge minták
  // ~3× nagyobb súlyt kapnak. A min. 10 attempt küszöb megakadályozza, hogy
  // a kezdő adatok torzítsák a választást.
  function grmAdaptiveEnabled(profile) {
    return drillSettings.adaptive && (profile && profile.totalAttempts >= 10);
  }
  function getGrmAdaptiveWeights(pool, profile) {
    return pool.map(pat => {
      const ps = profile.patternStats[pat.id] || { attempts: 0, correct: 0 };
      const rate = ps.attempts > 0 ? ps.correct / ps.attempts : 0.6;   // ismeretlen → kb. „közepes"
      const weight = 1 + (1 - rate) * 2;                                // 0% pontosság → 3.0×, 100% → 1.0×
      return { pat, weight };
    });
  }
  function grmWeightedPick(weightedList) {
    const total = weightedList.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of weightedList) { r -= x.weight; if (r <= 0) return x.pat; }
    return weightedList[weightedList.length - 1].pat;
  }

  function buildCardForPattern(pattern, exampleIdx) {
    if (drillSettings.mode === 'recognition') {
      return {
        kind: 'recognition',
        pattern,
        example: pattern.examples[exampleIdx],
        exampleIdx,
        options: generatePatternDistractors(pattern),
        srsId: patternItemId(pattern)
      };
    }
    if (drillSettings.mode === 'translate') {
      return {
        kind: 'translate',
        pattern,
        example: pattern.examples[exampleIdx],
        exampleIdx,
        translateData: buildTranslateCardData(pattern, pattern.examples[exampleIdx]),
        srsId: patternItemId(pattern)
      };
    }
    // cloze
    return {
      kind: 'cloze',
      pattern,
      example: pattern.examples[exampleIdx],
      exampleIdx,
      srsId: exampleItemId(pattern, exampleIdx)
    };
  }

  function generateGrmQueue(count) {
    const pool = getActivePool();
    if (pool.length === 0) return [];

    // SRS pathway — opt-in.
    if (drillSettings.srs) {
      const known = allItemIds().filter(id => {
        // csak az aktív pool-ban lévő pattern itemeit nézzük
        const patId = id.split(':')[1];
        const pat = pool.find(p => p.id === patId);
        return !!pat;
      });
      const { due, unseen } = NihonCoreSRS.getDueItems(SRS_PREFIX, known);
      const ordered = [].concat(shuffle(due.slice()), shuffle(unseen.slice()));
      const queue = [];
      for (let i = 0; i < count && ordered.length > 0; i++) {
        // Csak akkor használunk SRS-itemet, ha a kártya kindja stimmel:
        // Recognition módban CSAK patternItemId, Cloze módban CSAK exampleItemId.
        const wantsExample = drillSettings.mode === 'cloze';
        let chosenId = null;
        for (let k = 0; k < ordered.length; k++) {
          const isExample = ordered[k].split(':').length === 3;   // grammar:<pat>:exN
          if (isExample === wantsExample) { chosenId = ordered.splice(k, 1)[0]; break; }
        }
        if (!chosenId) break;
        const parts = chosenId.split(':');
        const patternId = parts[1];
        const exIdx = wantsExample ? parseInt(parts[2].slice(2), 10) || 0 : Math.floor(Math.random() * 2);
        const pat = pool.find(p => p.id === patternId);
        if (!pat) continue;
        const safeExIdx = Math.max(0, Math.min(pat.examples.length - 1, exIdx));
        queue.push(buildCardForPattern(pat, safeExIdx));
      }
      // Ha az SRS nem ad annyit, ahányat kértek, töltsük fel random pickkel.
      while (queue.length < count) {
        const pat = pickRandom(pool);
        const exIdx = Math.floor(Math.random() * pat.examples.length);
        queue.push(buildCardForPattern(pat, exIdx));
      }
      return queue;
    }

    // V5 P3a — Adaptív (opt-in, min. 10 attempt küszöb) vagy klasszikus random
    const profile = loadGrmProfile();
    const useAdaptive = grmAdaptiveEnabled(profile);
    const weighted = useAdaptive ? getGrmAdaptiveWeights(pool, profile) : null;

    const queue = [];
    for (let i = 0; i < count; i++) {
      const pat = useAdaptive ? grmWeightedPick(weighted) : pickRandom(pool);
      const exIdx = Math.floor(Math.random() * pat.examples.length);
      queue.push(buildCardForPattern(pat, exIdx));
    }
    return queue;
  }

  // 4 opció: a helyes pattern + 3 distraktor. Prioritás: contrasts[]-ben szereplő
  // patternek, majd ugyanazon kategória, majd random az aktív pool-ból.
  function generatePatternDistractors(correctPattern) {
    const pool = getActivePool().filter(p => p.id !== correctPattern.id);
    const seen = new Set([correctPattern.id]);
    const distractors = [];

    // 1) Contrasts (kapcsolódó minták)
    (correctPattern.contrasts || []).forEach(cid => {
      if (distractors.length >= 3) return;
      const p = pool.find(x => x.id === cid);
      if (p && !seen.has(p.id)) { distractors.push(p); seen.add(p.id); }
    });
    // 2) Azonos kategória
    const sameCat = pool.filter(p => p.category === correctPattern.category && !seen.has(p.id));
    while (distractors.length < 3 && sameCat.length > 0) {
      const p = sameCat.splice(Math.floor(Math.random() * sameCat.length), 1)[0];
      if (p && !seen.has(p.id)) { distractors.push(p); seen.add(p.id); }
    }
    // 3) Random
    const rest = pool.filter(p => !seen.has(p.id));
    while (distractors.length < 3 && rest.length > 0) {
      const p = rest.splice(Math.floor(Math.random() * rest.length), 1)[0];
      if (p && !seen.has(p.id)) { distractors.push(p); seen.add(p.id); }
    }
    // 4) Szűk készletnél (a tanulási út egy leckéjének 2–4 mintája) a hiányzó elterelők a teljes
    //    mintakészletből jönnek: előbb az ellenpárok, aztán az azonos kategória, az azonos szint, végül bármi.
    if (distractors.length < 3) {
      const wider = NIHONCORE_GRAMMAR_PATTERNS.filter(p => !seen.has(p.id));
      const draw = list => {
        while (distractors.length < 3 && list.length > 0) {
          const p = list.splice(Math.floor(Math.random() * list.length), 1)[0];
          if (!seen.has(p.id)) { distractors.push(p); seen.add(p.id); }
        }
      };
      draw(wider.filter(p => (correctPattern.contrasts || []).indexOf(p.id) >= 0));
      draw(wider.filter(p => p.category === correctPattern.category));
      draw(wider.filter(p => p.jlpt === correctPattern.jlpt));
      draw(wider.slice());
    }

    const all = [
      { pattern: correctPattern, isCorrect: true },
      ...distractors.slice(0, 3).map(p => ({ pattern: p, isCorrect: false }))
    ];
    return shuffle(all);
  }

  /* ── B.2) V5 P4 — TRANSLATE MÓD: tokenizáció + distraktor ─ */

  // Particle-alapú heurisztikus tokenizáció a kana-mondatokon. A particle
  // a megelőző frázishoz tapad (mert grammatikailag oda tartozik). A
  // punktuáció (、。) saját token-ként szerepel.
  //
  // 2026-06-03 bugfix: csak a 'を' biztonságos single particle (a többi
  // — は/が/に/で/と/も/の/へ/や/か — gyakran szó-belsejében is előfordul:
  // えいが, さかな, にほん, です, とき, もの, へや stb. — ami nonszensz
  // fragmentekre tördelte a mondatokat). A grammar.js-ben minden példa
  // explicit `tokens[]` mezőt kapott — ez a fallback csak tényleges
  // hiány esetén fut.
  const TRANS_MULTI_PARTICLES = ['まで', 'から', 'でも', 'など', 'より', 'こそ', 'のに', 'ても', 'なら', 'ながら'];
  const TRANS_SINGLE_PARTICLES = ['を'];
  const TRANS_PUNCT = '、。・？！';

  function tokenizePhrases(kana) {
    const tokens = [];
    let cur = '';
    let i = 0;
    const text = String(kana || '');
    while (i < text.length) {
      const ch = text[i];
      if (TRANS_PUNCT.includes(ch)) {
        if (cur) tokens.push(cur);
        cur = '';
        tokens.push(ch);
        i++;
        continue;
      }
      // Multi-char particle prioritás
      let matched = null;
      if (cur.length > 0) {
        for (const p of TRANS_MULTI_PARTICLES) {
          if (text.slice(i, i + p.length) === p) { matched = p; break; }
        }
        if (!matched) {
          for (const p of TRANS_SINGLE_PARTICLES) {
            if (text.slice(i, i + p.length) === p) { matched = p; break; }
          }
        }
      }
      if (matched) {
        cur += matched;
        tokens.push(cur);
        cur = '';
        i += matched.length;
      } else {
        cur += ch;
        i++;
      }
    }
    if (cur) tokens.push(cur);
    return tokens.filter(t => t.length > 0);
  }

  // Translate kártya-adat: helyes tokenek + 1-2 distraktor a contrasts-ból
  // (vagy egy random aktív pattern-ből). A distraktorok NEM punktuáció és
  // NEM egyeznek a helyes tokenekkel.
  //
  // 2026-06-03 bugfix: a tokenizálás prioritása `example.tokens` (a
  // grammar.js-ben explicit megadva minden példára), és csak ennek
  // hiányában esik vissza a heurisztikus `tokenizePhrases`-ra.
  function exampleTokens(ex) {
    return (ex && Array.isArray(ex.tokens) && ex.tokens.length > 0)
      ? ex.tokens.slice()
      : tokenizePhrases(ex.kana);
  }
  function buildTranslateCardData(pattern, example) {
    const correct = exampleTokens(example);
    const distractors = [];
    const seen = new Set(correct);

    const tryAddFrom = (pat) => {
      if (!pat || distractors.length >= 2) return;
      const ctokens = exampleTokens(pat.examples[0]);
      const candidates = ctokens.filter(t =>
        !TRANS_PUNCT.includes(t) && !seen.has(t) && t.length >= 2
      );
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        distractors.push(pick);
        seen.add(pick);
      }
    };
    // 1) contrasts patternek
    (pattern.contrasts || []).forEach(cid => {
      tryAddFrom(NIHONCORE_GRAMMAR_PATTERNS.find(p => p.id === cid));
    });
    // 2) fill random aktív pool-ból
    if (distractors.length < 2) {
      const pool = getActivePool().filter(p => p.id !== pattern.id);
      while (distractors.length < 2 && pool.length > 0) {
        const idx = Math.floor(Math.random() * pool.length);
        tryAddFrom(pool[idx]);
        pool.splice(idx, 1);
      }
    }

    // Tálca = helyes + distraktor, megkeverve. A pozíciók indexei
    // (0..N-1) — a render shuffle-elt indexszel jelenik meg.
    const trayItems = correct.map((tok, i) => ({ kana: tok, srcIdx: i, isDistractor: false }))
      .concat(distractors.map((tok, i) => ({ kana: tok, srcIdx: correct.length + i, isDistractor: true })));

    return {
      correct,          // string[] — a helyes sorrend
      distractors,      // string[]
      trayItems         // [{ kana, srcIdx, isDistractor }] — render input
    };
  }

  /* ── C) NORMALIZER + DIAGNÓZIS ─────────────────── */

  // Kana normalizáló (katakana → hiragana + ー hosszú-jel egyszerű unification).
  // A Cloze blank-tartalom MINDIG hiragana — ha a felhasználó katakanát írt
  // (pl. ボタン kontextusban), azt is hiraganára konvertáljuk az összevetéshez.
  function kataToHira(s) {
    return String(s || '').replace(/[ァ-ヶ]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
  }
  function normKana(s) {
    return kataToHira(String(s || '').trim()).replace(/\s+/g, '');
  }

  function diagnoseCloze(card, userInput) {
    const correct = String(card.example.clozeAnswer || '');
    let u = normKana(userInput);
    if (!u) return { match: false, errorCode: 'empty', userNorm: u, targetNorm: normKana(correct) };
    // romajival beírt válasz: kanává alakul; a kiejtés szerint írt partikula (wa, o, e) nem hiba
    if (/^[a-z'\s-]+$/i.test(String(userInput).trim())) {
      u = window.NihonCoreKana.repairSpoken(window.NihonCoreKana.fromRomaji(userInput), normKana(correct));
    }

    if (u === normKana(correct)) {
      return { match: true, errorCode: null };
    }

    // Pattern-szintű találgatás: a user válasza más pattern blank-jét adja vissza?
    for (const p of NIHONCORE_GRAMMAR_PATTERNS) {
      if (p.id === card.pattern.id) continue;
      for (const ex of p.examples) {
        if (normKana(ex.clozeAnswer) === u) {
          // contrasts közeli?
          const isContrast = (card.pattern.contrasts || []).includes(p.id);
          return {
            match: false,
            errorCode: isContrast ? 'contrast_confused' : 'wrong_pattern',
            otherPattern: p,
            userNorm: u, targetNorm: normKana(correct)
          };
        }
      }
    }

    // Karakter-szintű diff (LCS — meglévő pattern, lokális helper)
    const diff = diffGrmLocal(u, normKana(correct));
    const distance = diff.filter(op => op.type !== 'eq').length;
    if (distance > 0 && distance <= 2) {
      return { match: false, errorCode: 'typo', diff, distance,
               userNorm: u, targetNorm: normKana(correct) };
    }
    return { match: false, errorCode: 'wrong_form', diff, distance,
             userNorm: u, targetNorm: normKana(correct) };
  }

  function buildGrmExplanation(card, diag) {
    if (!diag) return { title: 'Helyes', html: '' };
    const tpl = NIHONCORE_GRAMMAR_ERROR_TYPES[diag.errorCode] || NIHONCORE_GRAMMAR_ERROR_TYPES.wrong_form;
    const params = {
      correct: card.example.clozeAnswer || card.pattern.label,
      chosen:  diag.otherPattern ? diag.otherPattern.label :
               (diag.userNorm || '—'),
      summary: diag.otherPattern ? diag.otherPattern.summary : card.pattern.summary,
      pattern: card.pattern.label
    };
    let msg = tpl.template;
    Object.keys(params).forEach(k => { msg = msg.split('{' + k + '}').join(params[k]); });
    return { title: tpl.title, html: msg };
  }

  // LCS-diff (DateTime modulból átvett, lokális névtér)
  function diffGrmLocal(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
    const ops = []; let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) { ops.unshift({type:'eq',char:a[i-1]}); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({type:'del',char:a[i-1]}); i--; }
      else { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    }
    while (i > 0) { ops.unshift({type:'del',char:a[i-1]}); i--; }
    while (j > 0) { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    return ops;
  }
  function escapeGrmHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function renderGrmDiff(diff, target) {
    if (!diff) return `<strong class="pfe-jp-ok">${escapeGrmHtml(target)}</strong>`;
    const userHtml = diff.map(op => {
      if (op.type === 'eq')  return `<span class="diff-eq">${escapeGrmHtml(op.char)}</span>`;
      if (op.type === 'del') return `<span class="diff-del">${escapeGrmHtml(op.char)}</span>`;
      if (op.type === 'ins') return `<span class="diff-ins">${escapeGrmHtml(op.char)}</span>`;
      return '';
    }).join('');
    return `
      <div class="diff-block">
        <div class="diff-line"><span class="diff-label">Te írtad:</span><span class="diff-content">${userHtml}</span></div>
        <div class="diff-line"><span class="diff-label">Helyes:</span><span class="diff-content"><strong class="pfe-jp-ok">${escapeGrmHtml(target)}</strong></span></div>
        <div class="diff-legend">
          <span class="diff-eq-sample">helyes</span> ·
          <span class="diff-del-sample">felesleges</span> ·
          <span class="diff-ins-sample">hiányzó</span>
        </div>
      </div>
    `;
  }

  /* ── D) PERSISTENCE ─────────────────────────────── */

  function loadGrmSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function saveGrmSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadGrmProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultGrmProfile();
      const p = JSON.parse(raw);
      if (!p || !p.patternStats) return defaultGrmProfile();
      return p;
    } catch (e) { return defaultGrmProfile(); }
  }
  function defaultGrmProfile() {
    return { totalAttempts: 0, totalCorrect: 0, bestStreak: 0,
             patternStats: {}, catStats: {} };
  }
  function saveGrmProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }
  function updateGrmProfileFromResults(results) {
    const p = loadGrmProfile();
    let run = 0, best = 0;
    results.forEach(r => {
      p.totalAttempts++;
      if (r.correct) p.totalCorrect++;
      const ps = p.patternStats[r.patternId] = p.patternStats[r.patternId] || { attempts: 0, correct: 0 };
      ps.attempts++; if (r.correct) ps.correct++;
      const cs = p.catStats[r.category] = p.catStats[r.category] || { attempts: 0, correct: 0 };
      cs.attempts++; if (r.correct) cs.correct++;
      if (r.correct) { run++; best = Math.max(best, run); } else run = 0;
    });
    if (best > p.bestStreak) p.bestStreak = best;
    saveGrmProfile(p);
    return p;
  }

  function renderGrmStatsBar() {
    const p = loadGrmProfile();
    const el = document.getElementById('grmStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    const boxes = NihonCoreSRS.aggregateBoxes(SRS_PREFIX);
    const srsCount = boxes.reduce((s, n) => s + n, 0);
    const hasData = p.totalAttempts > 0 || srsCount > 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">összes</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${pct}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak} 🔥</span><span class="csc-label">leghosszabb sorozat</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${srsCount}</span><span class="csc-label">SRS itemek</span></div>
      ${hasData ? `<button class="conj-stat-toggle" id="grmStatsToggle">Részletek</button>` : ''}
      <div class="conj-stats-panel hidden" id="grmStatsPanel"></div>
    `;
    const tBtn = document.getElementById('grmStatsToggle');
    if (tBtn) tBtn.addEventListener('click', toggleGrmProfileDashboard);
  }

  function toggleGrmProfileDashboard() {
    const panel = document.getElementById('grmStatsPanel');
    const btn   = document.getElementById('grmStatsToggle');
    if (!panel) return;
    const opening = panel.classList.contains('hidden');
    if (opening) {
      panel.innerHTML = renderGrmProfileDashboard();
      panel.classList.remove('hidden');
      btn.classList.add('active');
      btn.textContent = '📊 Bezárás';
      const resetBtn = panel.querySelector('#grmProfileReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          NihonCoreRound.confirmDelete('Törlöd a Nyelvtani minták profilját?', 'A modul összes eddigi eredménye elvész. Ez nem vonható vissza.', () => {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderGrmStatsBar();
          });
        });
      }
      const srsBtn = panel.querySelector('#grmSrsReset');
      if (srsBtn) {
        srsBtn.addEventListener('click', () => {
          NihonCoreRound.confirmDelete('Törlöd az ismétlés-ütemezést?', 'Minden nyelvtani minta visszaáll „új" állapotra. Ez nem vonható vissza.', () => {
            NihonCoreSRS.clearScope(SRS_PREFIX);
            renderGrmStatsBar();
          });
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = 'Részletek';
    }
  }

  function renderGrmProfileDashboard() {
    const p = loadGrmProfile();
    const boxes = NihonCoreSRS.aggregateBoxes(SRS_PREFIX);
    const srsTotal = boxes.reduce((s, n) => s + n, 0);

    if (p.totalAttempts === 0 && srsTotal === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }

    // Per-pattern bontás (gyengétől erősig, csak >=2 attempt)
    const patEntries = Object.keys(p.patternStats).map(pid => {
      const s = p.patternStats[pid];
      const pat = NIHONCORE_GRAMMAR_PATTERNS.find(x => x.id === pid);
      const label = pat ? pat.label : pid;
      const pct = s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0;
      return { pid, s, pct, label };
    }).filter(x => x.s.attempts >= 1).sort((a, b) => a.pct - b.pct);

    const patRows = patEntries.map(({ pid, s, pct, label }) => {
      const cls = pct >= 80 ? 'fb-ok' : pct >= 50 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${pct}%"></span></span>
          <span class="cj-bd-pct">${s.correct}/${s.attempts} (${pct}%)</span>
        </div>
      `;
    }).join('');

    // SRS box-eloszlás (box 0 = INTERVALS_DAYS[0] = 0 nap, azaz azonnal esedékes)
    const boxLabels = ['Új / azonnal', '1 nap', '3 nap', '7 nap', '14 nap', '30 nap'];
    const boxRows = boxes.map((n, i) => `
      <div class="grm-srs-row">
        <span class="grm-srs-label">Box ${i} <em>(${boxLabels[i]})</em></span>
        <span class="grm-srs-bar"><span class="grm-srs-fill" style="width:${srsTotal > 0 ? (n / srsTotal) * 100 : 0}%"></span></span>
        <span class="grm-srs-n">${n}</span>
      </div>
    `).join('');

    const weakest = patEntries.filter(x => x.s.attempts >= 2 && x.pct < 80).slice(0, 3);
    const weakestHtml = weakest.length ? `
      <div class="cj-pd-weakest">
        <div class="cj-pd-section-label">Gyenge mintázatok</div>
        <div class="cj-pd-weakest-list">
          ${weakest.map(w => `<span class="cj-pd-weak-chip">${w.label} <em>${w.pct}%</em></span>`).join('')}
        </div>
        <p class="cj-pd-tip">💡 Kapcsold be az <strong>SRS</strong> ütemezést — a gyenge mintázatok hamarabb esedékesek lesznek.</p>
      </div>
    ` : '';

    return `
      <div class="cj-pd-block">
        <div class="cj-pd-section-label">Mintázatok szerint (gyengétől erősig)</div>
        ${patRows || '<p class="cj-pd-empty">—</p>'}
      </div>
      <div class="cj-pd-block">
        <div class="cj-pd-section-label">SRS ütemezés — box-eloszlás</div>
        ${srsTotal > 0 ? boxRows : '<p class="cj-pd-empty">Még nincs SRS-rekord. Kapcsold be a lobby-ban az SRS módot.</p>'}
      </div>
      ${weakestHtml}
      <div class="cj-pd-actions">
        <button class="btn btn-ghost cj-pd-reset" id="grmProfileReset">🗑 Profil törlése</button>
        <button class="btn btn-ghost cj-pd-reset" id="grmSrsReset">🗑 SRS ütemezés törlése</button>
      </div>
    `;
  }

  /* ── E) LOBBY ───────────────────────────────────── */

  function renderGrmLobby() {
    const jlptRow = ['N5', 'N4', 'N3'].map(level => {
      const cnt = patternsByJlpt(level).length;
      const enabled = cnt > 0;
      const active = drillSettings.jlpt[level] && enabled;
      return `
        <button class="cj-group-btn grm-jlpt-btn ${active ? 'active' : ''} ${enabled ? '' : 'is-empty'}"
                data-grm-jlpt="${level}" ${enabled ? '' : 'disabled'}>
          <span class="cj-g-name">${level}</span>
          <span class="cj-g-hint">${cnt} minta</span>
        </button>
      `;
    }).join('');

    const catRow = NIHONCORE_GRAMMAR_CATEGORIES.map(cat => {
      const total = NIHONCORE_GRAMMAR_PATTERNS.filter(p =>
        p.category === cat.id && drillSettings.jlpt[p.jlpt]
      ).length;
      if (total === 0) return '';
      return `
        <button class="cj-group-btn grm-cat-btn ${drillSettings.categories[cat.id] ? 'active' : ''}" data-grm-cat="${cat.id}">
          <span class="cj-g-name">${cat.emoji} ${cat.nameHu}</span>
          <span class="cj-g-hint">${cat.hint} · ${total} db</span>
        </button>
      `;
    }).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'melyik minta van a mondatban?' },
      { id: 'cloze',       name: 'Kiegészítés', sub: 'beírod a hiányzó részt' },
      { id: 'translate',   name: 'Fordítás',  sub: 'japán mondatot raksz össze' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-grm-mode="${m.id}">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>
    `).join('');

    const presets = [5, 8, 15].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    document.getElementById('grmLobby').innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Nyelvtani minták</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">Válaszd ki a szintet és kategóriákat, majd indítsd a kört. Ha bekapcsolod az SRS-t, a sor az esedékes mintázatokból válogat.</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · JLPT szint</div>
        <div class="cj-group-row grm-jlpt-row">${jlptRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Kategóriák</div>
        <div class="cj-group-row grm-cat-row">${catRow || '<p class="cj-pd-empty">Nincs minta a kiválasztott szinteken.</p>'}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Mód</div>
        <div class="cj-mode-row grm-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">4 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="grmCustomCount">vagy saját:</label>
            <input type="number" id="grmCustomCount" min="1" max="50" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-section cj-adaptive-section">
        <label class="cj-adapt-switch">
          <input type="checkbox" id="grmSrs" ${drillSettings.srs ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>📅 SRS ütemezés</strong>
            <em>Az esedékes mintázatok előre kerülnek a sorba. Új mintáknál először tanulsz, helyes válasz után a következő ismétlés napokkal később esedékes (ismétlési lépcsők: 1 → 3 → 7 → 14 → 30 nap).</em>
          </span>
        </label>
        <label class="cj-adapt-switch">
          <input type="checkbox" id="grmAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A gyengébb mintázatokat ~3× gyakrabban húzza ki a profilodból. (Legalább 10 megválaszolt kártya után kapcsol be; az SRS ütemezés felülírja.)</em>
          </span>
        </label>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Aktív mintázatok: <strong id="grmComboCount">${countGrmPool()}</strong></span>
        <span class="lobby-build-note" id="grmSrsNote"></span>
        <span class="lobby-build-note" id="grmAdaptiveNote"></span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="grmStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachGrmLobbyHandlers();
    updateGrmStartBtn();
    updateGrmSrsNote();
    updateGrmAdaptiveNote();
  }

  function updateGrmSrsNote() {
    const el = document.getElementById('grmSrsNote');
    if (!el) return;
    if (!drillSettings.srs) { el.textContent = ''; return; }
    const pool = getActivePool();
    if (pool.length === 0) { el.textContent = ''; return; }
    const known = allItemIds().filter(id => {
      const patId = id.split(':')[1];
      return pool.some(p => p.id === patId);
    });
    const { due, unseen } = NihonCoreSRS.getDueItems(SRS_PREFIX, known);
    el.innerHTML = `<span class="cj-build-note-icon">📅</span> SRS: <strong>${due.length}</strong> esedékes · <strong>${unseen.length}</strong> még új.`;
  }

  function updateGrmAdaptiveNote() {
    const el = document.getElementById('grmAdaptiveNote');
    if (!el) return;
    if (!drillSettings.adaptive) { el.textContent = ''; return; }
    if (drillSettings.srs) {
      el.innerHTML = `<span class="cj-build-note-icon">ℹ️</span> Az SRS bekapcsolva felülírja az adaptív gyakorlást.`;
      return;
    }
    const profile = loadGrmProfile();
    const need = Math.max(0, 10 - (profile.totalAttempts || 0));
    if (need > 0) {
      el.innerHTML = `<span class="cj-build-note-icon">🎯</span> Adaptív: még <strong>${need}</strong> megválaszolt kártya kell, hogy a súlyozás bekapcsoljon.`;
    } else {
      // Hány pattern van „gyenge" (≥2 attempt + <70%) sávban?
      const weak = Object.keys(profile.patternStats || {}).filter(pid => {
        const s = profile.patternStats[pid];
        return s.attempts >= 2 && (s.correct / s.attempts) < 0.7;
      }).length;
      el.innerHTML = `<span class="cj-build-note-icon">🎯</span> Adaptív aktív: <strong>${weak}</strong> gyenge mintázat gyakrabban jön.`;
    }
  }

  function attachGrmLobbyHandlers() {
    document.querySelectorAll('.grm-jlpt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.grmJlpt;
        const isOn = drillSettings.jlpt[level];
        const otherOn = ['N5','N4','N3'].filter(l => l !== level && drillSettings.jlpt[l]).length;
        if (isOn && otherOn === 0) { grmShake(btn); return; }
        drillSettings.jlpt[level] = !isOn;
        btn.classList.toggle('active', drillSettings.jlpt[level]);
        saveGrmSettings();
        renderGrmLobby();   // category row tartalma a szinttől függ
      });
    });

    document.querySelectorAll('.grm-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.dataset.grmCat;
        const isOn = drillSettings.categories[c];
        const otherOn = Object.keys(drillSettings.categories).filter(x => x !== c && drillSettings.categories[x]).length;
        if (isOn && otherOn === 0) { grmShake(btn); return; }
        drillSettings.categories[c] = !isOn;
        btn.classList.toggle('active', drillSettings.categories[c]);
        saveGrmSettings();
        updateGrmStartBtn();
        updateGrmSrsNote();
      });
    });

    document.querySelectorAll('.cj-mode-btn[data-grm-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.mode = btn.dataset.grmMode;
        document.querySelectorAll('.cj-mode-btn[data-grm-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveGrmSettings();
        updateGrmStartBtn();
        updateGrmSrsNote();
      });
    });

    const srsCb = document.getElementById('grmSrs');
    if (srsCb) {
      srsCb.addEventListener('change', () => {
        drillSettings.srs = srsCb.checked;
        saveGrmSettings();
        updateGrmSrsNote();
        updateGrmAdaptiveNote();
      });
    }

    const adaptCb = document.getElementById('grmAdaptive');
    if (adaptCb) {
      adaptCb.addEventListener('change', () => {
        drillSettings.adaptive = adaptCb.checked;
        saveGrmSettings();
        updateGrmAdaptiveNote();
      });
    }

    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('grmCustomCount');
        if (custom) custom.value = '';
        saveGrmSettings();
        updateGrmStartBtn();
      });
    });
    const customInput = document.getElementById('grmCustomCount');
    if (customInput) {
      customInput.addEventListener('input', () => {
        const n = parseInt(customInput.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countGrmPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) customInput.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveGrmSettings();
          updateGrmStartBtn();
        }
      });
    }

    document.getElementById('grmStart').addEventListener('click', startGrmRound);
  }
  function grmShake(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); }
  function updateGrmStartBtn() {
    const combos = countGrmPool();
    const cEl = document.getElementById('grmComboCount');
    if (cEl) cEl.textContent = combos;
    const startBtn = document.getElementById('grmStart');
    if (!startBtn) return;
    startBtn.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    startBtn.disabled = combos === 0 || drillSettings.cardCount < 1;
  }

  /* ── F) RUNTIME ─────────────────────────────────── */

  function startGrmRound() {
    drillRunState.cards = generateGrmQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;
    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'grammar', mode: drillSettings.mode, results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('grmLobby').classList.add('hidden');
    document.getElementById('grmRuntime').classList.remove('hidden');
    document.getElementById('grmSummary').classList.add('hidden');
    document.getElementById('grmSummary').innerHTML = '';

    renderGrmCurrentCard();
  }

  function renderGrmCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.userInput = '';
    drillRunState.chosenIdx = null;
    drillRunState.hintLevel = 0;
    drillRunState.translateTrayIdx = [];
    drillRunState.translateAnswerIdx = [];
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }

    document.getElementById('grmScore').textContent  = drillRunState.score;
    document.getElementById('grmStreak').textContent = `${drillRunState.streak} 🔥`;

    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('grmCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('grmProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('grmFeedback').classList.add('hidden');
    document.getElementById('grmFeedback').innerHTML = '';

    const card = drillRunState.cards[drillRunState.cardIdx];
    if (card.kind === 'cloze')          renderGrmClozeCard(card);
    else if (card.kind === 'translate') renderGrmTranslateCard(card);
    else                                renderGrmRecognitionCard(card);
  }

  function categoryLabel(catId) {
    const cat = NIHONCORE_GRAMMAR_CATEGORIES.find(c => c.id === catId);
    return cat ? `${cat.emoji} ${cat.nameHu}` : catId;
  }

  function renderGrmHintBar(card) {
    return `
      <div class="cj-hint-bar">
        <button class="cj-hint-btn" id="grmHintBtn" type="button">
          <span class="cjh-icon">💡</span>
          <span class="cjh-text">Tipp <span class="cjh-pts">(−3 pont)</span></span>
        </button>
        <div class="cj-hint-display" id="grmHintDisplay"></div>
      </div>
    `;
  }

  function attachGrmHintHandlers(card) {
    const btn = document.getElementById('grmHintBtn');
    const disp = document.getElementById('grmHintDisplay');
    if (!btn || !disp) return;
    btn.addEventListener('click', () => {
      if (drillRunState.submitted) return;
      if (drillRunState.hintLevel >= 2) return;
      drillRunState.hintLevel++;
      let html = disp.innerHTML;
      if (drillRunState.hintLevel === 1) {
        // a felismerő kártyán az összefoglaló maga a helyes válasz: ott csak a kategória a tipp
        html += card.kind === 'recognition'
          ? `<div class="cj-hint-line"><em>Kategória:</em> ${categoryLabel(card.pattern.category)}</div>`
          : `<div class="cj-hint-line"><em>Kategória:</em> ${categoryLabel(card.pattern.category)} — ${card.pattern.summary}</div>`;
      } else {
        if (card.kind === 'cloze') {
          const ans = card.example.clozeAnswer || '';
          const hintTxt = ans.length > 1 ? ans.slice(0, 1) + '…' : ans;
          html += `<div class="cj-hint-line"><em>Első karakter:</em> <strong class="pfe-jp-ok">${escapeGrmHtml(hintTxt)}</strong></div>`;
        } else {
          html += `<div class="cj-hint-line"><em>Struktúra:</em> <strong>${card.pattern.structure}</strong></div>`;
        }
        btn.disabled = true;
        btn.classList.add('exhausted');
      }
      disp.innerHTML = html;
    });
  }

  /* ── F.1) Recognition ─────────────────────────── */

  // A mondatban kiemeli a minta helyét (ami a kiegészítős feladat hiánya). Egy mondatban több szerkezet
  // is van (は, です, を…): a kiemelés mondja meg, melyikre kérdezünk rá.
  function grmHighlight(ex) {
    const parts = String(ex.cloze || '').split('___BLANK___');
    const jp = String(ex.jp || '');
    if (parts.length !== 2 || jp.indexOf(parts[0]) !== 0 || jp.length < parts[0].length + parts[1].length ||
        jp.slice(jp.length - parts[1].length) !== parts[1]) return jp;
    return parts[0] + '<span class="grm-hl">' + jp.slice(parts[0].length, jp.length - parts[1].length) + '</span>' + parts[1];
  }

  function renderGrmRecognitionCard(card) {
    const ex = card.example;
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option grm-opt" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="grm-opt-summary">${escapeGrmHtml(opt.pattern.summary)}</span>
        <span class="cj-opt-jp grm-opt-label" lang="ja">${opt.pattern.label}</span>
      </button>
    `).join('');

    document.getElementById('grmCard').innerHTML = `
      <div class="cj-prompt grm-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="dt-cat-tag grm-jlpt-tag">JLPT ${card.pattern.jlpt}</span>
        </div>
        <div class="grm-sentence">${grmHighlight(ex)}</div>
        <div class="grm-sentence-romaji">${escapeGrmHtml(ex.romaji)}</div>
        <div class="kana-task">Mit fejez ki a kiemelt rész?</div>
      </div>
      ${renderGrmHintBar(card)}
      <div class="cj-options grm-options">${optionsHtml}</div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('grmActions').innerHTML = '';

    document.querySelectorAll('.grm-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const isCorrect = btn.dataset.correct === '1';
        drillRunState.submitted = true;
        drillRunState.chosenIdx = idx;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const cb = document.querySelector('.grm-opt[data-correct="1"]');
          if (cb) cb.classList.add('reveal-correct');
        }
        document.querySelectorAll('.grm-opt, .dont-know-btn').forEach(b => b.disabled = true);
        const chosen = card.options[idx];
        const diag = isCorrect ? null : {
          errorCode: (card.pattern.contrasts || []).includes(chosen.pattern.id)
                      ? 'contrast_confused' : 'wrong_pattern',
          otherPattern: chosen.pattern
        };
        finalizeGrmCard(card, isCorrect, diag);
      });
    });
    document.querySelector('#grmCard .dont-know-btn').addEventListener('click', grmDontKnow);
    attachGrmHintHandlers(card);
  }

  function grmDontKnow() {
    if (drillRunState.submitted) return;
    const card = drillRunState.cards[drillRunState.cardIdx];
    drillRunState.submitted = true;
    if (card.kind === 'recognition') {
      const cb = document.querySelector('.grm-opt[data-correct="1"]');
      if (cb) cb.classList.add('reveal-correct');
      document.querySelectorAll('.grm-opt, .dont-know-btn').forEach(b => b.disabled = true);
      finalizeGrmCard(card, false, { errorCode: 'empty' });
    } else if (card.kind === 'translate') {
      // V5 P4 — translate „Nem tudom": tálca + submit + dk disabled,
      // a diag empty + 0 user-token (nincs részleges credit).
      document.querySelectorAll('.grm-trans-tok').forEach(b => b.disabled = true);
      const sub = document.getElementById('grmSubmit');
      if (sub) sub.disabled = true;
      const dk = document.querySelector('#grmCard .dont-know-btn');
      if (dk) dk.disabled = true;
      finalizeGrmCard(card, false, { errorCode: 'empty', user: [], correct: card.translateData.correct, posOk: 0, slots: card.translateData.correct.length });
    } else {
      const inp = document.getElementById('grmInput');
      if (inp) inp.disabled = true;
      const sub = document.getElementById('grmSubmit');
      if (sub) sub.disabled = true;
      const dk = document.querySelector('#grmCard .dont-know-btn');
      if (dk) dk.disabled = true;
      finalizeGrmCard(card, false, { errorCode: 'empty' });
    }
    markDontKnowFeedback(document.getElementById('grmFeedback'));
  }

  /* ── F.2) Cloze ────────────────────────────────── */

  function renderGrmClozeCard(card) {
    const ex = card.example;
    const clozeHtml = (ex.cloze || ex.jp).replace(/___BLANK___/,
      '<span class="grm-blank">___</span>');

    document.getElementById('grmCard').innerHTML = `
      <div class="cj-prompt grm-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="dt-cat-tag">${categoryLabel(card.pattern.category)}</span>
          <span class="dt-cat-tag grm-jlpt-tag">JLPT ${card.pattern.jlpt}</span>
          <span class="dt-cat-tag grm-pattern-tag">${card.pattern.label}</span>
        </div>
        <div class="grm-sentence grm-cloze-sentence">${clozeHtml}</div>
        <div class="cj-prompt-meaning grm-sentence-hu">${escapeGrmHtml(ex.hu)}</div>
        <div class="cj-target">
          <span class="cj-target-label">Feladat:</span>
          <span class="cj-target-name">Mi áll a <em>___</em> helyén? Írd be kanával vagy romajival.</span>
        </div>
      </div>
      ${renderGrmHintBar(card)}
      <div class="cj-input-area">
        <input type="text" class="cj-input" id="grmInput"
               placeholder="pl. たら vagy tara"
               autocomplete="off" autocapitalize="off" spellcheck="false" />
        <div class="cj-timer-bar"><div class="cj-timer-fill" id="grmTimerFill"></div></div>
      </div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('grmActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="grmSubmit" disabled>Beküldés</button>
    `;
    attachGrmHintHandlers(card);

    const input = document.getElementById('grmInput');
    const btn = document.getElementById('grmSubmit');
    input.focus();
    input.addEventListener('input', () => {
      drillRunState.userInput = input.value.trim();
      btn.disabled = !drillRunState.userInput;
    });
    input.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' && !btn.disabled && !drillRunState.submitted) {
        ev.preventDefault(); submitGrmCloze(card);
      }
    });
    btn.addEventListener('click', () => { if (!drillRunState.submitted) submitGrmCloze(card); });
    document.querySelector('#grmCard .dont-know-btn').addEventListener('click', grmDontKnow);

    startGrmClozeTimer(card);
  }

  function startGrmClozeTimer(card) {
    const fill = document.getElementById('grmTimerFill');
    // Időlimit csak akkor, ha a tanuló bekapcsolta (NihonCorePrefs)
    if (!NihonCorePrefs.timerOn()) { if (fill && fill.parentElement) fill.parentElement.style.display = 'none'; return; }
    const limit = drillSettings.timeLimit;
    fill.style.transition = 'none'; fill.style.width = '100%'; fill.offsetHeight;
    fill.style.transition = `width ${limit}ms linear`;
    fill.style.width = '0%';
    drillRunState.timerHandle = setTimeout(() => {
      if (!drillRunState.submitted) {
        drillRunState.submitted = true;
        const input = document.getElementById('grmInput');
        if (input) { input.disabled = true; input.classList.add('cnh-input-wrong'); }
        const btn = document.getElementById('grmSubmit');
        if (btn) btn.disabled = true;
        finalizeGrmCard(card, false, { errorCode: 'empty', timeout: true,
          targetNorm: normKana(card.example.clozeAnswer), userNorm: '' });
      }
    }, limit);
  }

  function submitGrmCloze(card) {
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    drillRunState.submitted = true;
    const input = document.getElementById('grmInput');
    if (input) input.disabled = true;
    const btn = document.getElementById('grmSubmit');
    if (btn) btn.disabled = true;
    const dk = document.querySelector('#grmCard .dont-know-btn');
    if (dk) dk.disabled = true;

    const diag = diagnoseCloze(card, drillRunState.userInput);
    if (input) input.classList.add(diag.match ? 'cnh-input-correct' : 'cnh-input-wrong');
    finalizeGrmCard(card, diag.match, diag);
  }

  /* ── F.2b) Translate (V5 P4) — frázis-tálca, Mondat-Puzzle stílus ── */

  // A translate-state local: trayIndices[] és answerIndices[]. Az indexek
  // a `card.translateData.trayItems`-be mutatnak; `srcIdx` mező a helyes
  // sorrend pozícióját azonosítja (a distraktorok srcIdx ≥ correct.length).
  function renderGrmTranslateCard(card) {
    const td = card.translateData;
    // shuffle a tray index-listáját
    drillRunState.translateTrayIdx = shuffle(Array.from({ length: td.trayItems.length }, (_, i) => i));
    drillRunState.translateAnswerIdx = [];

    document.getElementById('grmCard').innerHTML = `
      <div class="cj-prompt grm-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="dt-cat-tag">${categoryLabel(card.pattern.category)}</span>
          <span class="dt-cat-tag grm-jlpt-tag">JLPT ${card.pattern.jlpt}</span>
          <span class="dt-cat-tag grm-pattern-tag">${card.pattern.label}</span>
        </div>
        <div class="grm-trans-hu">
          <span class="grm-trans-hu-label">Fordítsd le japánra:</span>
          <span class="grm-trans-hu-text">${escapeGrmHtml(card.example.hu)}</span>
        </div>
        <div class="cj-target">
          <span class="cj-target-label">Feladat:</span>
          <span class="cj-target-name">Rakd össze a japán mondatot a tálca elemeiből (drag&drop vagy kattintás).</span>
        </div>
      </div>
      ${renderGrmHintBar(card)}
      <div class="grm-trans-section-label">Válasz — kattints vagy húzz ide sorrendbe</div>
      <div class="grm-trans-answer" id="grmTransAnswer"></div>
      <div class="grm-trans-section-label">Tálca <small>(${td.trayItems.length - td.correct.length} csapda-frázis is van benne)</small></div>
      <div class="grm-trans-tray" id="grmTransTray"></div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('grmActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="grmSubmit" disabled>Beküldés</button>
    `;

    renderGrmTransAreas(card);
    attachGrmTransContainerHandlers(card);
    attachGrmTransTokenHandlers(card);
    attachGrmHintHandlers(card);

    document.getElementById('grmSubmit').addEventListener('click', () => {
      if (!drillRunState.submitted) submitGrmTranslate(card);
    });
    document.querySelector('#grmCard .dont-know-btn').addEventListener('click', grmDontKnow);
  }

  function renderGrmTransAreas(card) {
    const td = card.translateData;
    const trayEl = document.getElementById('grmTransTray');
    const ansEl  = document.getElementById('grmTransAnswer');

    trayEl.innerHTML = drillRunState.translateTrayIdx.length
      ? drillRunState.translateTrayIdx.map(i => renderGrmTransTok(td.trayItems[i], i, 'tray')).join('')
      : `<div class="grm-trans-empty">Üres tálca — minden token a válaszban.</div>`;

    ansEl.innerHTML = drillRunState.translateAnswerIdx.length
      ? drillRunState.translateAnswerIdx.map(i => renderGrmTransTok(td.trayItems[i], i, 'answer')).join('')
      : `<div class="grm-trans-empty">← Kattints / húzz ide tokent →</div>`;

    const submitBtn = document.getElementById('grmSubmit');
    if (submitBtn) submitBtn.disabled = (drillRunState.translateAnswerIdx.length === 0);
  }

  function renderGrmTransTok(item, idx, area) {
    const draggable = drillRunState.submitted ? 'false' : 'true';
    return `
      <button class="grm-trans-tok" draggable="${draggable}" data-tok-idx="${idx}" data-area="${area}" type="button">
        <span class="grm-trans-tok-jp">${escapeGrmHtml(item.kana)}</span>
      </button>
    `;
  }

  function attachGrmTransContainerHandlers(card) {
    const trayEl = document.getElementById('grmTransTray');
    const ansEl  = document.getElementById('grmTransAnswer');

    const setupDrop = (el, target) => {
      if (!el) return;
      el.addEventListener('dragover', e => {
        if (drillRunState.submitted) return;
        e.preventDefault();
        el.classList.add('drag-over');
      });
      el.addEventListener('dragleave', e => {
        if (el.contains(e.relatedTarget)) return;
        el.classList.remove('drag-over');
      });
      el.addEventListener('drop', e => {
        e.preventDefault();
        el.classList.remove('drag-over');
        const tokIdx = parseInt(e.dataTransfer.getData('text/grm-tok-idx'), 10);
        const source = e.dataTransfer.getData('text/grm-source');
        if (Number.isNaN(tokIdx)) return;
        if (target === 'answer') {
          const insertAt = grmTransInsertIndex(ansEl, e.clientX);
          if (source === 'tray') {
            if (drillRunState.translateAnswerIdx.includes(tokIdx)) return;
            drillRunState.translateTrayIdx = drillRunState.translateTrayIdx.filter(i => i !== tokIdx);
            drillRunState.translateAnswerIdx.splice(insertAt, 0, tokIdx);
          } else {
            const oldIdx = drillRunState.translateAnswerIdx.indexOf(tokIdx);
            if (oldIdx === -1) return;
            drillRunState.translateAnswerIdx.splice(oldIdx, 1);
            const adj = oldIdx < insertAt ? insertAt - 1 : insertAt;
            drillRunState.translateAnswerIdx.splice(adj, 0, tokIdx);
          }
        } else {
          // target = tray
          if (source === 'answer') {
            drillRunState.translateAnswerIdx = drillRunState.translateAnswerIdx.filter(i => i !== tokIdx);
            if (!drillRunState.translateTrayIdx.includes(tokIdx)) drillRunState.translateTrayIdx.push(tokIdx);
          }
        }
        renderGrmTransAreas(card);
        attachGrmTransTokenHandlers(card);
      });
    };
    setupDrop(ansEl, 'answer');
    setupDrop(trayEl, 'tray');
  }

  function attachGrmTransTokenHandlers(card) {
    document.querySelectorAll('.grm-trans-tok').forEach(tok => {
      tok.addEventListener('dragstart', e => {
        if (drillRunState.submitted) { e.preventDefault(); return; }
        e.dataTransfer.setData('text/grm-tok-idx', tok.dataset.tokIdx);
        e.dataTransfer.setData('text/grm-source', tok.dataset.area);
        e.dataTransfer.effectAllowed = 'move';
        tok.classList.add('dragging');
      });
      tok.addEventListener('dragend', () => tok.classList.remove('dragging'));
      tok.addEventListener('click', () => {
        if (drillRunState.submitted) return;
        const idx = parseInt(tok.dataset.tokIdx, 10);
        if (tok.dataset.area === 'tray') {
          if (drillRunState.translateAnswerIdx.includes(idx)) return;
          drillRunState.translateTrayIdx = drillRunState.translateTrayIdx.filter(i => i !== idx);
          drillRunState.translateAnswerIdx.push(idx);
        } else {
          if (drillRunState.translateTrayIdx.includes(idx)) return;
          drillRunState.translateAnswerIdx = drillRunState.translateAnswerIdx.filter(i => i !== idx);
          drillRunState.translateTrayIdx.push(idx);
        }
        renderGrmTransAreas(card);
        attachGrmTransTokenHandlers(card);
      });
    });
  }

  function grmTransInsertIndex(container, clientX) {
    const tokens = Array.from(container.querySelectorAll('.grm-trans-tok'));
    for (let i = 0; i < tokens.length; i++) {
      const r = tokens[i].getBoundingClientRect();
      if (clientX < r.left + r.width / 2) return i;
    }
    return tokens.length;
  }

  // Diagnose: a user válasza vs. a helyes sorrend. Részleges credit a
  // pontosan helyes sorrend-pozíciókért. Hibakód: 'wrong_order' (egyezne
  // a tokenkészlet, de rossz sorrend) / 'wrong_form' (más tokeneket
  // választott) / 'empty' (üres válasz).
  function diagnoseTranslate(card) {
    const td = card.translateData;
    const user = drillRunState.translateAnswerIdx.map(i => td.trayItems[i].kana);
    const correct = td.correct;
    if (user.length === 0) {
      return { match: false, errorCode: 'empty', user, correct };
    }
    // pontos egyezés (sorrend is)
    const exact = user.length === correct.length && user.every((tok, i) => tok === correct[i]);
    if (exact) return { match: true, errorCode: null, user, correct };

    // Token-pozíció szerinti pont-számítás
    const slots = Math.max(user.length, correct.length);
    let posOk = 0;
    for (let i = 0; i < Math.min(user.length, correct.length); i++) {
      if (user[i] === correct[i]) posOk++;
    }

    // hibakód: ha minden helyes token benne van + ugyanannyi, csak sorrend rossz
    const userSorted = user.slice().sort().join('|');
    const corrSorted = correct.slice().sort().join('|');
    const errorCode = (userSorted === corrSorted) ? 'wrong_order' : 'wrong_form';

    return { match: false, errorCode, user, correct, posOk, slots };
  }

  function submitGrmTranslate(card) {
    drillRunState.submitted = true;
    document.querySelectorAll('.grm-trans-tok').forEach(b => b.disabled = true);
    const sb = document.getElementById('grmSubmit');
    if (sb) sb.disabled = true;
    const dk = document.querySelector('#grmCard .dont-know-btn');
    if (dk) dk.disabled = true;

    const diag = diagnoseTranslate(card);
    // visual highlight
    const td = card.translateData;
    document.querySelectorAll('#grmTransAnswer .grm-trans-tok').forEach((el, i) => {
      const idx = parseInt(el.dataset.tokIdx, 10);
      const userTok = td.trayItems[idx].kana;
      if (i < td.correct.length && userTok === td.correct[i]) el.classList.add('correct');
      else                                                     el.classList.add('wrong');
    });
    finalizeGrmCard(card, diag.match, diag);
  }

  /* ── F.3) Finalize + feedback ──────────────────── */

  function finalizeGrmCard(card, isCorrect, diag) {
    // Pontozás (mód-szerint)
    if (isCorrect) {
      let pts = 10;
      if (card.kind === 'cloze')     pts = 12;
      if (card.kind === 'translate') pts = 14;   // legnehezebb mód
      pts = Math.max(0, pts - drillRunState.hintLevel * 3);
      drillRunState.score += pts;
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else if (card.kind === 'translate' && diag && diag.posOk > 0) {
      // V5 P4 — részleges credit a translate módban (helyes-pozíció / total slot)
      const partial = Math.round((diag.posOk / diag.slots) * 6);
      const pts = Math.max(0, partial - drillRunState.hintLevel * 3);
      drillRunState.score += pts;
      drillRunState.streak = 0;
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.results.push({
      patternId: card.pattern.id,
      category: card.pattern.category,
      mode: card.kind,
      correct: isCorrect,
      errorCode: diag ? diag.errorCode : null,
      hintLevel: drillRunState.hintLevel,
      srsId: card.srsId
    });
    document.getElementById('grmScore').textContent  = drillRunState.score;
    document.getElementById('grmStreak').textContent = `${drillRunState.streak} 🔥`;

    // SRS frissítés — hint > 0 esetén csak "ok" (nem "easy"); hibázásnál "fail".
    if (card.srsId) {
      const quality = isCorrect ? (drillRunState.hintLevel === 0 ? 2 : 1) : 0;
      NihonCoreSRS.recordReview(card.srsId, quality);
    }

    renderGrmFeedback(card, isCorrect, diag);
  }

  function renderGrmFeedback(card, isCorrect, diag) {
    const fbEl = document.getElementById('grmFeedback');
    fbEl.classList.remove('hidden', 'pr-fb-correct', 'pr-fb-wrong');
    fbEl.classList.add(isCorrect ? 'pr-fb-correct' : 'pr-fb-wrong');
    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;
    const ex = card.example;

    // A teljes mondat (ruby-val), a blank visszahelyezve félkövéren.
    const filledHtml = (ex.cloze || ex.jp).replace(/___BLANK___/,
      `<strong class="pfe-jp-ok">${escapeGrmHtml(ex.clozeAnswer || '')}</strong>`);

    // V5 P4 — Translate mód speciális feedback (user mondata vs. helyes)
    let explainHtml;
    if (card.kind === 'translate') {
      const td = card.translateData;
      const userText = diag.user.join(' ');
      const correctText = td.correct.join(' ');
      explainHtml = `
        <div class="pfe-row ${isCorrect ? 'pfe-correct' : 'pfe-wrong'}">
          <span class="pfe-label">${isCorrect ? 'Helyes' : (diag.errorCode === 'wrong_order' ? 'Helyes tokenek, rossz sorrend' : (diag.errorCode === 'empty' ? 'Üres válasz' : 'Részben helyes'))}</span>
          <span class="pfe-text">
            <strong>${card.pattern.label}</strong> — ${escapeGrmHtml(card.pattern.summary)}
            ${(!isCorrect && diag.posOk != null && diag.slots > 0) ? `<br/><em>Részleges: ${diag.posOk}/${diag.slots} pozíció helyes</em>` : ''}
          </span>
        </div>
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Te válaszod</span>
          <span class="pfe-text"><span class="pfe-jp-ok">${escapeGrmHtml(userText) || '<em>(üres)</em>'}</span></span>
        </div>
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Helyes mondat</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${escapeGrmHtml(correctText)}</strong>
            <span class="pfe-roman"> (${escapeGrmHtml(ex.romaji)})</span>
            <span class="cj-example-hu"> — ${escapeGrmHtml(ex.hu)}</span>
          </span>
        </div>
      `;
    } else if (isCorrect) {
      explainHtml = `
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text">
            <strong>${card.pattern.label}</strong> — ${escapeGrmHtml(card.pattern.summary)}
          </span>
        </div>
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Mondat</span>
          <span class="pfe-text">${filledHtml}
            <span class="pfe-roman"> (${escapeGrmHtml(ex.romaji)})</span>
            <span class="cj-example-hu"> — ${escapeGrmHtml(ex.hu)}</span>
          </span>
        </div>
      `;
    } else {
      const ex2 = buildGrmExplanation(card, diag);
      const diffHtml = (diag && diag.diff)
        ? renderGrmDiff(diag.diff, diag.targetNorm || normKana(ex.clozeAnswer))
        : `<strong class="pfe-jp-ok">${escapeGrmHtml(ex.clozeAnswer)}</strong>`;

      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${ex2.title}</span>
          <span class="pfe-text">${ex2.html}</span>
        </div>
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Mintázat</span>
          <span class="pfe-text">
            <strong>${card.pattern.label}</strong> — ${escapeGrmHtml(card.pattern.summary)}<br/>
            <em>Szerkezet:</em> ${card.pattern.structure}
          </span>
        </div>
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Mondat</span>
          <span class="pfe-text">${filledHtml}
            <span class="pfe-roman"> (${escapeGrmHtml(ex.romaji)})</span>
            <span class="cj-example-hu"> — ${escapeGrmHtml(ex.hu)}</span>
          </span>
        </div>
        ${diag && diag.diff && !diag.timeout ? `
          <div class="pfe-row pfe-context"><span class="pfe-label">Eltérés</span><span class="pfe-text">${diffHtml}</span></div>
        ` : ''}
        ${diag && diag.timeout ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Idő</span>
            <span class="pfe-text">Lejárt az időlimit.</span>
          </div>
        ` : ''}
      `;
    }

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${isCorrect ? '🎉' : '⚠️'}</span>
        <span class="pr-fb-title">${isCorrect ? 'Tökéletes!' : 'Nézd át a részleteket'}</span>
      </div>
      <div class="pr-fb-explain">${explainHtml}</div>
      <button class="btn btn-primary glow-effect cj-next" id="grmNext">
        ${isLast ? 'Eredmények' : 'Következő'}
      </button>
    `;
    document.getElementById('grmNext').addEventListener('click', advanceGrmCard);
  }

  function advanceGrmCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showGrmSummary();
    else                                                     renderGrmCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  /* ── G) SUMMARY + lobby vissza ─────────────────── */

  function showGrmSummary() {
    NihonCoreStats.recordSession({
      module: 'grammar', mode: drillSettings.mode,
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Per-pattern bontás
    const breakdown = {};
    drillRunState.results.forEach(r => {
      const b = breakdown[r.patternId] = breakdown[r.patternId] || { total: 0, correct: 0 };
      b.total++; if (r.correct) b.correct++;
    });
    const patRows = Object.keys(breakdown).map(pid => {
      const b = breakdown[pid];
      const pat = NIHONCORE_GRAMMAR_PATTERNS.find(x => x.id === pid);
      const label = pat ? pat.label : pid;
      const cpct = Math.round((b.correct / b.total) * 100);
      const cls = cpct === 100 ? 'fb-ok' : cpct >= 60 ? 'fb-warn' : 'fb-bad';
      return `
        <div class="cj-bd-row ${cls}">
          <span class="cj-bd-form">${label}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${cpct}%"></span></span>
          <span class="cj-bd-pct">${b.correct}/${b.total} (${cpct}%)</span>
        </div>
      `;
    }).join('');

    updateGrmProfileFromResults(drillRunState.results);
    renderGrmStatsBar();

    document.getElementById('grmCard').innerHTML = '';
    document.getElementById('grmActions').innerHTML = '';
    document.getElementById('grmFeedback').classList.add('hidden');
    document.getElementById('grmFeedback').innerHTML = '';

    const sEl = document.getElementById('grmSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Mintánként</div>
        ${patRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="grmReset">Új kör</button>
    `;
    document.getElementById('grmReset').addEventListener('click', backToGrmLobby);
  }

  function backToGrmLobby() {
    drillRunState.inLobby = true;
    drillRunState.cards = [];
    if (drillRunState.timerHandle) { clearTimeout(drillRunState.timerHandle); drillRunState.timerHandle = null; }
    document.querySelector('.module-hero')?.classList.remove('hidden');
    document.getElementById('grmRuntime').classList.add('hidden');
    document.getElementById('grmLobby').classList.remove('hidden');
    document.getElementById('grmSummary').classList.add('hidden');
    document.getElementById('grmSummary').innerHTML = '';
    renderGrmStatsBar();
    renderGrmLobby();
  }

  /* ── H) INIT ────────────────────────────────────── */
  renderGrmStatsBar();
  renderGrmLobby();

  const exitBtn = document.getElementById('grmExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) {
        backToGrmLobby();
      }
    });
  }

  // Dev hook
  window._grm = {
    diagnoseCloze, getActivePool, generateGrmQueue,
    allItemIds, loadGrmProfile, NihonCoreSRS,
    NIHONCORE_GRAMMAR_PATTERNS, SRS_PREFIX
  };
}


/* ====================================================
   9c. initProductionPage() — V7 P1 Production modul ──
   ────────────────────────────────────────────────────
   production.html. Aktív termelés: HU→JP teljesen
   szabad input (kana vagy romaji), fuzzy LCS-diff.
   A V5 P4 Translate "mester" változata — NEM tálca,
   szabad gépelés.

   Design (emil-design-eng skill konzultáció):
   - 5-szintű verdict (perfect/close/near/far/wrong)
   - Token + karakter szintű diff KOMBINÁLVA
   - Anti-frustration szövegezés (NEM "HIBÁS")
   - Invisible details: autofocus, Enter beküld, kana preview
   ==================================================== */

function initProductionPage() {

  /* ── A) STATE ──────────────────────────────────── */

  const PROFILE_KEY  = 'nihoncore_prod_profile_v1';
  const SETTINGS_KEY = 'nihoncore_prod_settings_v1';

  const drillSettings = mergeProdDefaults(loadProdSettings(), {
    jlpt: { N5: true, N4: false, N3: false },     // kezdő alap: N5; a többi a lobbiban kapcsolható
    sources: { grammar: true, sentences: true },
    cardCount: 6,                 // alacsonyabb default — nehezebb mód
  });

  const drillRunState = {
    inLobby: true,
    cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0,
    results: [],
    submitted: false, userInput: '',
    roundStartTs: 0
  };

  function mergeProdDefaults(saved, defaults) {
    if (!saved || typeof saved !== 'object') return defaults;
    const out = { ...defaults, ...saved };
    out.jlpt = { ...defaults.jlpt, ...(saved.jlpt || {}) };
    out.sources = { ...defaults.sources, ...(saved.sources || {}) };
    return out;
  }

  /* ── B) POOL — runtime aggregátor ──────────────── */
  // Grammar Patterns examples + Mondat-Mester sentences egységesítve.
  // NEM content-bővítés — a meglévő adatból merít.
  //
  // Sémában minden card-nál:
  //   kana — PURE KANA (összehasonlításra)
  //   jp   — KANJI-MIX (megjelenésre / alternatív perfect-match-re)
  //
  // Mondat-Mester `tokens[]` `jp` mezője kanji-mix; ezért a kana változatot
  // tokenenként építjük: ha a token jp már pure kana (partikulák, hiragana-
  // szavak), úgy maradnak; egyébként a token romaji-ját parseoljuk kanába.
  function getProdSentences() {
    const out = [];
    if (drillSettings.sources.grammar && typeof NIHONCORE_GRAMMAR_PATTERNS !== 'undefined') {
      NIHONCORE_GRAMMAR_PATTERNS.forEach(p => {
        if (!drillSettings.jlpt[p.jlpt]) return;
        (p.examples || []).forEach((ex, i) => {
          if (!ex.kana || !ex.hu) return;
          out.push({
            id: 'prod_grm_' + p.id + '_' + i,
            kana: ex.kana,
            romaji: ex.romaji || '',
            hu: ex.hu,
            jp: ex.jp || ex.kana,           // ruby verziónál a kanji is
            source: 'grammar',
            jlpt: p.jlpt,
            patternLabel: p.label,
            patternSummary: p.summary
          });
        });
      });
    }
    if (drillSettings.sources.sentences && typeof NIHONCORE_SENTENCES !== 'undefined') {
      NIHONCORE_SENTENCES.forEach(s => {
        if (!s.tokens) return;
        const level = s.level || 'N5';
        if (!drillSettings.jlpt[level]) return;      // a mondat saját szintje szerint
        const jp = s.tokens.map(t => t.jp).join('');
        const kana = s.tokens.map(t => {
          // Partikulák jp-je mindig pure kana; szavak/igék jp-je kanji-mix lehet:
          // ott a token saját olvasata (kana) dönt, ennek híján a romajiból számoljuk
          return isPureKanaJp(t.jp) ? t.jp : (t.kana || romajiToKanaProd(t.romaji));
        }).join('');
        const romaji = s.tokens.map(t => t.romaji).join(' ');
        out.push({
          id: 'prod_sm_' + s.id,
          kana, romaji,
          hu: s.translation || '',
          jp,
          source: 'sentences',
          jlpt: level,
          patternLabel: null,
          patternSummary: null
        });
      });
    }
    return out;
  }
  function countProdPool() { return getProdSentences().length; }

  function shuffleProd(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function generateProdQueue(count) {
    const pool = getProdSentences();
    if (pool.length === 0) return [];
    const shuffled = shuffleProd(pool.slice());
    const queue = [];
    for (let i = 0; i < count; i++) {
      queue.push(i < shuffled.length ? shuffled[i] : pool[Math.floor(Math.random() * pool.length)]);
    }
    return queue;
  }

  /* ── C) FUZZY DIFF MOTOR ──────────────────────── */

  // Egységes pontozás-tábla — verdict → pont (perfect: 16 ... wrong: 0).
  // 2026-06-03: refaktor, korábban duplikálva volt finalizeProdCard +
  // renderProdFeedback függvényekben.
  const PROD_PTS = { perfect: 16, close: 12, near: 8, far: 4, wrong: 0 };

  // Normalizálás: katakana→hiragana, ー hosszújel feloldása, whitespace strip.
  // A romajiToKana-t a Listening modul exportálta — globálisan használjuk,
  // de itt nem érjük el (closure). Egyszerű reuse: a window._lst._romaji,
  // VAGY local minimal romaji parser. Use minimal: csak a basic Hepburn-t
  // kezeli, mert a user beír kana-t is.
  function kataToHiraProd(s) {
    return String(s || '').replace(/[ァ-ヶ]/g, ch =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }
  function normJpProd(s) {
    return kataToHiraProd(String(s || '').trim())
      .replace(/\s+/g, '')
      .replace(/[、。・！？「」『』（）]/g, '');   // punktuáció ignorálva
  }

  // Ruby HTML strip: a Grammar Patterns ex.jp `<ruby>水<rt>みず</rt></ruby>...`
  // formátumából eltávolítja a furigana-tageket → tiszta kanji+okurigana szöveg.
  function stripRubyHtml(s) {
    return String(s || '')
      .replace(/<rt>[^<]*<\/rt>/g, '')
      .replace(/<\/?ruby>/g, '');
  }

  // Pure-kana ellenőrző: minden karakter hiragana/katakana/punktuáció?
  // (A Mondat-Mester token.jp mezőjének felismeréséhez — particle vs kanji-szó.)
  function isPureKanaJp(s) {
    if (!s) return false;
    for (const ch of String(s)) {
      const code = ch.charCodeAt(0);
      const isHira = (code >= 0x3040 && code <= 0x309F);
      const isKata = (code >= 0x30A0 && code <= 0x30FF);
      const isPunct = '、。・！？「」（）'.includes(ch);
      if (!isHira && !isKata && !isPunct) return false;
    }
    return true;
  }

  // A romaji-átíró a közös NihonCoreKana része (a Nyelvtani minták kiegészítő
  // módja is azt használja): ha a tanuló TISZTÁN romajit ír, kanává alakul.
  function romajiToKanaProd(text) { return window.NihonCoreKana.fromRomaji(text); }

  // Heurisztika: a user input már kana? Ha legalább 80% hiragana/katakana,
  // ne konvertáljuk. Ha tisztán romaji (latin), konvertáljuk.
  function isKanaDominant(s) {
    const txt = String(s || '');
    if (!txt) return false;
    let kana = 0, latin = 0;
    for (const ch of txt) {
      const code = ch.charCodeAt(0);
      if ((code >= 0x3040 && code <= 0x309F) || (code >= 0x30A0 && code <= 0x30FF)) kana++;
      else if (code >= 0x61 && code <= 0x7A) latin++;
    }
    return kana > 0 && kana >= latin;
  }

  // Token-szintű bontás — a Grammar Translate `tokenizePhrases` reuse-a
  // (particle-alapú), de itt closure-private kell. Egyszerűsített: csak a
  // particle-határolós bontás, multi-char particle prioritás.
  const PROD_MULTI = ['まで','から','でも','など','より','こそ','のに','ても','なら','ながら'];
  const PROD_SINGLE = ['は','が','を','に','で','と','も','の','へ','や','か'];
  function tokenizeProdPhrases(kana) {
    const tokens = [];
    let cur = '';
    let i = 0;
    const text = String(kana || '');
    while (i < text.length) {
      let matched = null;
      if (cur.length > 0) {
        for (const p of PROD_MULTI) {
          if (text.slice(i, i + p.length) === p) { matched = p; break; }
        }
        if (!matched) {
          for (const p of PROD_SINGLE) {
            if (text.slice(i, i + p.length) === p) { matched = p; break; }
          }
        }
      }
      if (matched) {
        cur += matched;
        tokens.push(cur); cur = '';
        i += matched.length;
      } else {
        cur += text[i]; i++;
      }
    }
    if (cur) tokens.push(cur);
    return tokens.filter(t => t.length > 0);
  }

  // Levenshtein-távolság két stringe közt
  function levDist(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      const c = a[i-1] === b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+c);
    }
    return dp[m][n];
  }

  // Karakter-szintű LCS-diff (a Grammar/Datetime mintáját követi)
  function charDiffProd(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
    const ops = []; let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i-1] === b[j-1]) { ops.unshift({type:'eq',char:a[i-1]}); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({type:'del',char:a[i-1]}); i--; }
      else { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    }
    while (i > 0) { ops.unshift({type:'del',char:a[i-1]}); i--; }
    while (j > 0) { ops.unshift({type:'ins',char:b[j-1]}); j--; }
    return ops;
  }

  // Token-szintű alignment: a userTokens és targetTokens között találja a
  // legjobb párosítást. Egyszerű mohó algoritmus a starter-szettre.
  function alignTokens(userToks, targetToks) {
    const tokenDiff = [];
    const usedTarget = new Set();
    for (let i = 0; i < userToks.length; i++) {
      const u = userToks[i];
      // helyes pozíció?
      if (i < targetToks.length && u === targetToks[i] && !usedTarget.has(i)) {
        tokenDiff.push({ user: u, state: 'correct', targetIdx: i });
        usedTarget.add(i);
        continue;
      }
      // van-e a target-ben máshol?
      const otherIdx = targetToks.findIndex((t, k) => t === u && !usedTarget.has(k));
      if (otherIdx !== -1) {
        tokenDiff.push({ user: u, state: 'misplaced', targetIdx: otherIdx });
        usedTarget.add(otherIdx);
        continue;
      }
      // typo? lev-dist alapján a legközelebbi nem-használt target-tokenre
      let bestIdx = -1, bestDist = Infinity;
      for (let k = 0; k < targetToks.length; k++) {
        if (usedTarget.has(k)) continue;
        const d = levDist(u, targetToks[k]);
        if (d < bestDist) { bestDist = d; bestIdx = k; }
      }
      if (bestIdx !== -1 && bestDist <= Math.max(1, Math.floor(targetToks[bestIdx].length / 2))) {
        tokenDiff.push({
          user: u, state: 'typo', targetIdx: bestIdx,
          target: targetToks[bestIdx],
          charDiff: charDiffProd(u, targetToks[bestIdx])
        });
        usedTarget.add(bestIdx);
        continue;
      }
      tokenDiff.push({ user: u, state: 'wrong' });
    }
    const missingTokens = targetToks.filter((_, k) => !usedTarget.has(k));
    return { tokenDiff, missingTokens, extraTokens: tokenDiff.filter(d => d.state === 'wrong').map(d => d.user) };
  }

  function diagnoseProd(card, rawInput) {
    const raw = String(rawInput || '').trim();
    if (!raw) return { verdict: 'wrong', empty: true };

    // 1) Ha tisztán romaji, konvertálni — a kiejtés szerint írt partikula (wa, o, e)
    //    és a hosszújel helyén megkettőzött magánhangzó ilyenkor nem hiba
    const userKana = isKanaDominant(raw)
      ? raw
      : window.NihonCoreKana.repairSpoken(romajiToKanaProd(raw), kataToHiraProd(card.kana).replace(/[、。・！？「」『』（）\s]/g, ''));
    const userNorm = normJpProd(userKana);
    const targetNormKana = normJpProd(card.kana);
    // Alternatív target: kanji-mix (Mondat-Mester) vagy ruby-stripped (Grammar).
    // Lehetővé teszi, hogy a user kanjival is beírhassa a választ.
    const jpStripped = card.jp ? stripRubyHtml(card.jp) : null;
    const targetNormJp = jpStripped ? normJpProd(jpStripped) : null;

    // 2) Exact match (normalized) — bármelyik target elfogadható
    if (userNorm === targetNormKana || (targetNormJp && userNorm === targetNormJp)) {
      return { verdict: 'perfect', userKana, userNorm,
               targetNorm: targetNormKana,
               tokensCorrect: 1, tokensTotal: 1, charLevDist: 0 };
    }

    // 3) A diff-hez a közelebbi targetet választjuk (kana vagy jp).
    //    Ez kanji-író usernek értelmes diff-et ad, kana-író usernek pedig
    //    a pure-kana targetet használja.
    const charDistKana = levDist(userNorm, targetNormKana);
    const charDistJp   = targetNormJp ? levDist(userNorm, targetNormJp) : Infinity;
    const useKanaTarget = charDistKana <= charDistJp;
    const targetForTokens = useKanaTarget ? card.kana : (jpStripped || card.kana);
    const targetNormForRate = useKanaTarget ? targetNormKana : targetNormJp;
    const charDist = useKanaTarget ? charDistKana : charDistJp;

    // 4) Token-szintű alignment
    const userToks = tokenizeProdPhrases(userKana.replace(/[、。・！？「」『』（）\s]/g, ''));
    const targetToks = tokenizeProdPhrases(targetForTokens.replace(/[、。・！？「」『』（）\s]/g, ''));
    const align = alignTokens(userToks, targetToks);

    const tokensCorrect = align.tokenDiff.filter(d => d.state === 'correct').length;
    const tokensTotal = Math.max(userToks.length, targetToks.length);
    const tokenRate = tokensTotal > 0 ? tokensCorrect / tokensTotal : 0;
    const charRate = targetNormForRate.length > 0 ? charDist / targetNormForRate.length : 1;

    // 5) Verdict az emil-design tervezés szerinti küszöbök
    let verdict;
    if (tokenRate >= 0.80 && charRate <= 0.15) verdict = 'close';     // "Majdnem!"
    else if (tokenRate >= 0.60 && charRate <= 0.30) verdict = 'near'; // "Közel jó"
    else if (tokenRate >= 0.40) verdict = 'far';                       // "Még gyakorold"
    else verdict = 'wrong';                                            // "Próbáld újra"

    return {
      verdict, userKana, userNorm,
      targetNorm: targetNormForRate,
      tokensCorrect, tokensTotal, charLevDist: charDist, charRate, tokenRate,
      tokenDiff: align.tokenDiff,
      missingTokens: align.missingTokens,
      extraTokens: align.extraTokens
    };
  }

  /* ── D) PERSISTENCE ─────────────────────────────── */

  function loadProdSettings() {
    try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function saveProdSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadProdProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultProdProfile();
      const p = JSON.parse(raw);
      return p || defaultProdProfile();
    } catch (e) { return defaultProdProfile(); }
  }
  function defaultProdProfile() {
    return { totalAttempts: 0, totalCorrect: 0, bestStreak: 0,
             verdictCounts: { perfect:0, close:0, near:0, far:0, wrong:0 } };
  }
  function saveProdProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }
  function updateProdProfileFromResults(results) {
    const p = loadProdProfile();
    let run = 0, best = 0;
    results.forEach(r => {
      p.totalAttempts++;
      if (r.verdict === 'perfect' || r.verdict === 'close') p.totalCorrect++;
      p.verdictCounts[r.verdict] = (p.verdictCounts[r.verdict] || 0) + 1;
      if (r.verdict === 'perfect' || r.verdict === 'close') { run++; best = Math.max(best, run); }
      else run = 0;
    });
    if (best > p.bestStreak) p.bestStreak = best;
    saveProdProfile(p);
    return p;
  }

  function renderProdStatsBar() {
    const p = loadProdProfile();
    const el = document.getElementById('prodStatsBar');
    if (!el) return;
    const pct = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">összes</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${pct}%</span><span class="csc-label">helyes (Tökéletes+Majdnem)</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak} 🔥</span><span class="csc-label">leghosszabb sorozat</span></div>
    `;
  }

  /* ── E) LOBBY ───────────────────────────────────── */

  function renderProdLobby() {
    const LEVEL_HINT = { N5: 'alapmondatok', N4: 'nyelvtani minták', N3: 'haladó' };
    const jlptRow = ['N5', 'N4', 'N3'].map(level => `
      <button class="cj-group-btn prod-jlpt-btn ${drillSettings.jlpt[level] ? 'active' : ''}" data-prod-jlpt="${level}">
        <span class="cj-g-name">${level}</span>
        <span class="cj-g-hint">${LEVEL_HINT[level]}</span>
      </button>
    `).join('');

    const srcRow = [
      { id: 'grammar', name: 'Nyelvtani minták', hint: 'a minták példamondatai (N4–N3)' },
      { id: 'sentences', name: 'Mondat-Mester', hint: 'hétköznapi mondatok (N5–N3)' }
    ].map(s => `
      <button class="cj-group-btn prod-src-btn ${drillSettings.sources[s.id] ? 'active' : ''}" data-prod-src="${s.id}">
        <span class="cj-g-name">${s.name}</span>
        <span class="cj-g-hint">${s.hint}</span>
      </button>
    `).join('');

    const presets = [3, 6, 10].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}">${n}</button>
    `).join('');

    document.getElementById('prodLobby').innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Szabad fordítás</div>
        <h2 class="lobby-title">Állítsd be a kört</h2>
        <p class="lobby-sub">A legnehezebb mód: a magyar mondatot teljes japán mondatra fordítod. Írhatsz kanával vagy romajival — a visszajelzés azt is megmutatja, mennyire jártál közel.</p>
      </div>

      <div class="lobby-section" data-lobby-keep>
        <div class="lobby-section-label">Szint (több is választható)</div>
        <div class="cj-group-row prod-jlpt-row">${jlptRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">2 · Mondat-forrás</div>
        <div class="cj-group-row prod-src-row">${srcRow}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">3 · Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="prodCustomCount">vagy saját:</label>
            <input type="number" id="prodCustomCount" min="1" max="30" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Aktív mondatok: <strong id="prodComboCount">${countProdPool()}</strong></span>
        <span class="lobby-build-note">💡 Tipp: a vesszők és pontok ignoráltak a diff-ben. A katakana automatikusan hiragana-vá normalizálódik.</span>
      </div>

      <button class="btn btn-primary glow-effect ml-start" id="prodStart">
        Indítás — ${drillSettings.cardCount} kártya
      </button>
    `;

    attachProdLobbyHandlers();
    updateProdStartBtn();
  }

  function attachProdLobbyHandlers() {
    document.querySelectorAll('.prod-jlpt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lv = btn.dataset.prodJlpt;
        const isOn = drillSettings.jlpt[lv];
        const otherOn = ['N5','N4','N3'].filter(l => l !== lv && drillSettings.jlpt[l]).length;
        if (isOn && otherOn === 0) { prodShake(btn); return; }
        drillSettings.jlpt[lv] = !isOn;
        btn.classList.toggle('active', drillSettings.jlpt[lv]);
        saveProdSettings();
        updateProdStartBtn();
      });
    });
    document.querySelectorAll('.prod-src-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.dataset.prodSrc;
        const isOn = drillSettings.sources[s];
        const otherOn = Object.keys(drillSettings.sources).filter(x => x !== s && drillSettings.sources[x]).length;
        if (isOn && otherOn === 0) { prodShake(btn); return; }
        drillSettings.sources[s] = !isOn;
        btn.classList.toggle('active', drillSettings.sources[s]);
        saveProdSettings();
        updateProdStartBtn();
      });
    });
    document.querySelectorAll('.ml-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drillSettings.cardCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const custom = document.getElementById('prodCustomCount');
        if (custom) custom.value = '';
        saveProdSettings();
        updateProdStartBtn();
      });
    });
    const cust = document.getElementById('prodCustomCount');
    if (cust) {
      cust.addEventListener('input', () => {
        const n = parseInt(cust.value, 10);
        if (!isNaN(n) && n > 0) {
          const _max = countProdPool();
          const _v = (_max > 0 && n > _max) ? _max : n;
          if (_v !== n) cust.value = String(_v);
          drillSettings.cardCount = _v;
          document.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
          saveProdSettings();
          updateProdStartBtn();
        }
      });
    }
    document.getElementById('prodStart').addEventListener('click', startProdRound);
  }
  function prodShake(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); }
  function updateProdStartBtn() {
    const n = countProdPool();
    const cEl = document.getElementById('prodComboCount');
    if (cEl) cEl.textContent = n;
    const sb = document.getElementById('prodStart');
    if (!sb) return;
    sb.textContent = `Indítás — ${drillSettings.cardCount} kártya`;
    sb.disabled = n === 0 || drillSettings.cardCount < 1;
  }

  /* ── F) RUNTIME ─────────────────────────────────── */

  function startProdRound() {
    drillRunState.cards = generateProdQueue(drillSettings.cardCount);
    if (drillRunState.cards.length === 0) return;
    drillRunState.cardIdx = 0;
    drillRunState.score = 0;
    drillRunState.streak = 0;
    drillRunState.bestStreak = 0;
    drillRunState.results = [];
    drillRunState.roundStartTs = Date.now();
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'production', mode:'free', results: drillRunState.results, score: drillRunState.score, startTs: drillRunState.roundStartTs }; });
    drillRunState.inLobby = false;

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('prodLobby').classList.add('hidden');
    document.getElementById('prodRuntime').classList.remove('hidden');
    document.getElementById('prodSummary').classList.add('hidden');
    document.getElementById('prodSummary').innerHTML = '';

    renderProdCurrentCard();
  }

  function escProdHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function renderProdCurrentCard() {
    drillRunState.submitted = false;
    drillRunState.userInput = '';

    document.getElementById('prodScore').textContent = drillRunState.score;
    document.getElementById('prodStreak').textContent = `${drillRunState.streak} 🔥`;
    const total = drillRunState.cards.length;
    const cur = drillRunState.cardIdx;
    document.getElementById('prodCardCount').textContent = `Kártya ${cur + 1} / ${total}`;
    const fill = document.getElementById('prodProgressFill');
    if (fill) fill.style.width = `${total > 0 ? (cur / total) * 100 : 0}%`;

    document.getElementById('prodFeedback').classList.add('hidden');
    document.getElementById('prodFeedback').innerHTML = '';

    const card = drillRunState.cards[drillRunState.cardIdx];
    // A minta neve (pl. 〜たら) a nyelvtani példáknál segítség: azt kell használni
    const srcTag = (card.source === 'grammar' && card.patternLabel)
      ? `<span class="dt-cat-tag grm-pattern-tag" lang="ja">${escProdHtml(card.patternLabel)}</span>` : '';

    document.getElementById('prodCard').innerHTML = `
      <div class="cj-prompt-eyebrow prod-eyebrow">
        <span class="dt-cat-tag grm-jlpt-tag">JLPT ${card.jlpt}</span>
        ${srcTag}
      </div>
      <div class="grm-trans-hu prod-hu">
        <span class="grm-trans-hu-label">Fordítsd le japánra (kana vagy romaji)</span>
        <span class="grm-trans-hu-text">${escProdHtml(card.hu)}</span>
      </div>
      <div class="prod-input-zone">
        <textarea class="cj-input prod-input" id="prodInput"
                  rows="3"
                  placeholder="pl. あめがふったら、うちにいます。"
                  autocomplete="off" autocapitalize="off"
                  autocorrect="off" spellcheck="false"></textarea>
        <div class="prod-preview" id="prodPreview" aria-hidden="true"></div>
      </div>
      <button class="dont-know-btn" type="button">🤔 Nem tudom</button>
    `;
    document.getElementById('prodActions').innerHTML = `
      <button class="btn btn-primary glow-effect cj-submit" id="prodSubmit" disabled>Ellenőrzés</button>
    `;

    const input = document.getElementById('prodInput');
    const preview = document.getElementById('prodPreview');
    const submit = document.getElementById('prodSubmit');

    input.addEventListener('input', () => {
      drillRunState.userInput = input.value;
      // élő kana-preview ha romaji-t ír
      const v = input.value.trim();
      preview.textContent = (!isKanaDominant(v) && v.length > 0) ? romajiToKanaProd(v) : '';
      submit.disabled = v.length < 3 || drillRunState.submitted;
    });
    input.addEventListener('keydown', (e) => {
      // Enter beküld, Shift+Enter sortörés
      if (e.key === 'Enter' && !e.shiftKey && !submit.disabled && !drillRunState.submitted) {
        e.preventDefault();
        submitProdCard(card);
      }
    });
    submit.addEventListener('click', () => { if (!drillRunState.submitted) submitProdCard(card); });
    document.querySelector('#prodCard .dont-know-btn').addEventListener('click', () => prodDontKnow(card));

    // autofocus invisible detail
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 60);
  }

  function prodDontKnow(card) {
    if (drillRunState.submitted) return;
    drillRunState.submitted = true;
    const input = document.getElementById('prodInput');
    if (input) input.disabled = true;
    const sb = document.getElementById('prodSubmit');
    if (sb) sb.disabled = true;
    const dk = document.querySelector('#prodCard .dont-know-btn');
    if (dk) dk.disabled = true;
    const diag = { verdict: 'wrong', empty: true, userKana: '', userNorm: '',
                   targetNorm: normJpProd(card.kana), tokensCorrect: 0,
                   tokensTotal: tokenizeProdPhrases(card.kana).length,
                   tokenDiff: [], missingTokens: tokenizeProdPhrases(card.kana), extraTokens: [] };
    finalizeProdCard(card, diag);
    markDontKnowFeedback(document.getElementById('prodFeedback'));
  }

  function submitProdCard(card) {
    drillRunState.submitted = true;
    const input = document.getElementById('prodInput');
    if (input) input.disabled = true;
    const sb = document.getElementById('prodSubmit');
    if (sb) sb.disabled = true;
    const dk = document.querySelector('#prodCard .dont-know-btn');
    if (dk) dk.disabled = true;

    const diag = diagnoseProd(card, drillRunState.userInput);
    if (input) input.classList.add(diag.verdict === 'perfect' || diag.verdict === 'close'
                                    ? 'cnh-input-correct' : 'cnh-input-wrong');
    finalizeProdCard(card, diag);
  }

  function finalizeProdCard(card, diag) {
    // Pontozás az 5-szintű verdict alapján (PROD_PTS konstans)
    const pts = PROD_PTS[diag.verdict] ?? 0;
    drillRunState.score += pts;
    if (diag.verdict === 'perfect' || diag.verdict === 'close') {
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
    } else {
      drillRunState.streak = 0;
    }
    drillRunState.results.push({
      cardId: card.id,
      verdict: diag.verdict,
      correct: diag.verdict === 'perfect' || diag.verdict === 'close',
      points: pts
    });
    document.getElementById('prodScore').textContent = drillRunState.score;
    document.getElementById('prodStreak').textContent = `${drillRunState.streak} 🔥`;

    renderProdFeedback(card, diag);
  }

  /* ── G) FEEDBACK render (emil-design tervezés szerint) ──── */

  const PROD_VERDICT_META = {
    perfect: { icon: '🎉', title: 'Tökéletes!',         tone: 'pr-fb-perfect', sub: 'Pontos volt.' },
    close:   { icon: '✨', title: 'Majdnem!',           tone: 'pr-fb-close',   sub: 'Egy-két karakter csúszott. Nézd meg.' },
    near:    { icon: '🎯', title: 'Közel jó',           tone: 'pr-fb-near',    sub: 'A szerkezet jó, részletek elcsúsztak.' },
    far:     { icon: '🌱', title: 'Még gyakorold',      tone: 'pr-fb-far',     sub: 'A mondat szerkezete eltér a mintától.' },
    wrong:   { icon: '🤔', title: 'Nézzük meg együtt',  tone: 'pr-fb-wrong',   sub: 'Lent látod a mintamondatot. Ha a tiéd is jó, jelöld helyesnek.' }
  };

  function renderProdTokenDiff(diag) {
    if (!diag.tokenDiff || diag.tokenDiff.length === 0) return '';
    // user tokenei színes hátérrel + karakter-diff csak a typo-knál
    const userRow = diag.tokenDiff.map(d => {
      const cls = 'prod-tok prod-tok-' + d.state;
      let inner = `<span class="prod-tok-jp">${escProdHtml(d.user)}</span>`;
      if (d.state === 'typo' && d.target) {
        // karakter-szintű diff inline
        const charHtml = d.charDiff.map(op => {
          if (op.type === 'eq')  return `<span class="diff-eq">${escProdHtml(op.char)}</span>`;
          if (op.type === 'del') return `<span class="diff-del">${escProdHtml(op.char)}</span>`;
          if (op.type === 'ins') return `<span class="diff-ins">${escProdHtml(op.char)}</span>`;
          return '';
        }).join('');
        inner += `<span class="prod-tok-charfix">${charHtml} → <strong>${escProdHtml(d.target)}</strong></span>`;
      } else if (d.state === 'wrong' || d.state === 'misplaced') {
        // semmi extra — csak a háttér jelzi
      }
      return `<span class="${cls}">${inner}</span>`;
    }).join('');

    const missingHtml = (diag.missingTokens && diag.missingTokens.length > 0)
      ? `<div class="prod-tok-missing-row">
           <span class="prod-tok-missing-label">Hiányzik</span>
           ${diag.missingTokens.map(t => `<span class="prod-tok prod-tok-missing"><span class="prod-tok-jp">${escProdHtml(t)}</span></span>`).join('')}
         </div>` : '';

    return `
      <div class="prod-diff-block">
        <div class="prod-diff-row">
          <span class="prod-diff-label">A tiéd</span>
          <div class="prod-diff-tokens">${userRow}</div>
        </div>
        ${missingHtml}
      </div>
    `;
  }

  function renderProdFeedback(card, diag) {
    const fbEl = document.getElementById('prodFeedback');
    const meta = PROD_VERDICT_META[diag.verdict] || PROD_VERDICT_META.wrong;
    fbEl.classList.remove('hidden', 'pr-fb-perfect', 'pr-fb-close', 'pr-fb-near', 'pr-fb-far', 'pr-fb-wrong', 'pr-fb-correct');
    fbEl.classList.add(meta.tone);
    // legacy 2-szín support: perfect+close → correct-szerű háttér, near+far+wrong → wrong-szerű
    if (diag.verdict === 'perfect' || diag.verdict === 'close') fbEl.classList.add('pr-fb-correct');
    else                                                          fbEl.classList.add('pr-fb-wrong');

    const isLast = drillRunState.cardIdx + 1 >= drillRunState.cards.length;
    const tokenDiffHtml = renderProdTokenDiff(diag);
    const scorePts = PROD_PTS[diag.verdict] ?? 0;

    const canAccept = !diag.empty && diag.verdict !== 'perfect' && diag.verdict !== 'close';

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${meta.icon}</span>
        <span class="pr-fb-title">${meta.title}</span>
        <span class="prod-fb-points" id="prodFbPoints">+${scorePts} pont</span>
      </div>
      <p class="prod-fb-sub">${meta.sub}</p>
      <div class="pr-fb-explain">
        ${tokenDiffHtml ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Szavanként</span>
            <span class="pfe-text">${tokenDiffHtml}</span>
          </div>
        ` : ''}
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes mondat</span>
          <span class="pfe-text">
            <strong class="pfe-jp-ok">${escProdHtml(card.kana)}</strong>
            <span class="pfe-roman"> (${escProdHtml(card.romaji)})</span>
            <span class="cj-example-hu"> — ${escProdHtml(card.hu)}</span>
          </span>
        </div>
        ${card.patternLabel ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Mintázat</span>
            <span class="pfe-text"><strong>${escProdHtml(card.patternLabel)}</strong> — ${escProdHtml(card.patternSummary || '')}</span>
          </div>
        ` : ''}
      </div>
      <div class="prod-fb-secondary">
        <button class="lst-slow-btn prod-fb-listen" id="prodFbListen" type="button">🔊 Hallgasd meg</button>
        ${canAccept ? '<button class="lst-slow-btn prod-fb-accept" id="prodAccept" type="button">Az én válaszom is helyes</button>' : ''}
      </div>
      <button class="btn btn-primary cj-next" id="prodNext" type="button">${isLast ? 'Eredmények' : 'Következő'}</button>
    `;

    const acceptBtn = document.getElementById('prodAccept');
    if (acceptBtn) acceptBtn.addEventListener('click', () => {
      const last = drillRunState.results[drillRunState.results.length - 1];
      if (!last || last.selfAccepted) return;
      const gain = Math.max(0, PROD_PTS.near - (last.points || 0));     // „közel jó" pontszámig egészítjük ki
      last.correct = true; last.selfAccepted = true; last.points = (last.points || 0) + gain;
      drillRunState.score += gain;
      drillRunState.streak++;
      drillRunState.bestStreak = Math.max(drillRunState.bestStreak, drillRunState.streak);
      document.getElementById('prodScore').textContent = drillRunState.score;
      document.getElementById('prodStreak').textContent = `${drillRunState.streak} 🔥`;
      document.getElementById('prodFbPoints').textContent = `+${last.points} pont`;
      fbEl.classList.remove('pr-fb-near', 'pr-fb-far', 'pr-fb-wrong');
      fbEl.classList.add('pr-fb-close', 'pr-fb-correct');
      fbEl.querySelector('.pr-fb-title').textContent = 'Elfogadva';
      fbEl.querySelector('.prod-fb-sub').textContent = 'Helyesnek jelölted. Vesd össze a mintamondattal, hátha tanulsz belőle egy másik megoldást.';
      acceptBtn.remove();
    });

    document.getElementById('prodFbListen').addEventListener('click', () => {
      if (typeof NihonCoreAudio !== 'undefined') {
        NihonCoreAudio.play(card.kana, { speed: 0.95, onError: () => {} });
      }
    });
    document.getElementById('prodNext').addEventListener('click', advanceProdCard);
  }

  function advanceProdCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showProdSummary();
    else                                                     renderProdCurrentCard();
    NihonCoreRound.scrollToRound();
  }

  /* ── H) SUMMARY ─────────────────────────────────── */

  function showProdSummary() {
    NihonCoreStats.recordSession({
      module: 'production', mode: 'free',
      results: drillRunState.results, score: drillRunState.score,
      startTs: drillRunState.roundStartTs
    });
    const total = drillRunState.results.length;
    const correct = drillRunState.results.filter(r => r.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    const breakdown = { perfect:0, close:0, near:0, far:0, wrong:0 };
    drillRunState.results.forEach(r => { breakdown[r.verdict] = (breakdown[r.verdict] || 0) + 1; });
    const META = PROD_VERDICT_META;
    const verdictRows = Object.keys(breakdown).map(v => {
      if (breakdown[v] === 0) return '';
      const m = META[v];
      const w = Math.round((breakdown[v] / total) * 100);
      return `
        <div class="cj-bd-row">
          <span class="cj-bd-form">${m.icon} ${m.title}</span>
          <span class="cj-bd-bar"><span class="cj-bd-fill" style="width:${w}%"></span></span>
          <span class="cj-bd-pct">${breakdown[v]} / ${total}</span>
        </div>
      `;
    }).join('');

    updateProdProfileFromResults(drillRunState.results);
    renderProdStatsBar();

    document.getElementById('prodCard').innerHTML = '';
    document.getElementById('prodActions').innerHTML = '';
    document.getElementById('prodFeedback').classList.add('hidden');
    document.getElementById('prodFeedback').innerHTML = '';

    const sEl = document.getElementById('prodSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége — ${pct}% helyes</h3>
      <div class="summary-score">${correct} / ${total} <small>(Tökéletes + Majdnem)</small></div>
      <div class="cj-breakdown">
        <div class="cj-bd-title">Eredmények</div>
        ${verdictRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Legjobb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="prodReset">Új kör</button>
    `;
    document.getElementById('prodReset').addEventListener('click', backToProdLobby);
  }

  function backToProdLobby() {
    drillRunState.inLobby = true;
    drillRunState.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');
    document.getElementById('prodRuntime').classList.add('hidden');
    document.getElementById('prodLobby').classList.remove('hidden');
    document.getElementById('prodSummary').classList.add('hidden');
    document.getElementById('prodSummary').innerHTML = '';
    renderProdStatsBar();
    renderProdLobby();
  }

  /* ── I) INIT ────────────────────────────────────── */
  renderProdStatsBar();
  renderProdLobby();

  const exitBtn = document.getElementById('prodExit');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!drillRunState.inLobby && confirm(
        'Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
        'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) {
        backToProdLobby();
      }
    });
  }

  // Dev hook
  window._prod = {
    diagnoseProd, tokenizeProdPhrases, romajiToKanaProd, normJpProd,
    levDist, alignTokens, getProdSentences
  };
}


/* ====================================================
   9b. initStatsPage() — V4 Statisztika oldal ───────
   stats.html. P1: Practice History (E) nézet — a
   NihonCoreStats session-logokból. A többi fül (A/B/
   C/D/F) a V4 következő fázisaiban nyílik.
   ==================================================== */

function initStatsPage() {

  const MODULE_LABELS = {
    conjugation: 'Ragozó', adjectives: 'Melléknév', datetime: 'Dátum & Idő',
    listening: 'Hallás', counter: 'Számláló', practice: 'Mondat-Mester',
    grammar: 'Nyelvtani minták',
    'arimasu-imasu': 'Alap igék',  // V5 P2 — verb-engine instrumented
    production: 'Szabad fordítás', // V7 P1
    kana: 'Kana',
    lesson: 'Lecke',
    exam: 'Dolgozat'
  };
  const MODE_LABELS = {
    recognition: 'Felismerés', build: 'Építkezés', mastery: 'Mester',
    dictation: 'Diktálás', particles: 'Partikula', puzzle: 'Puzzle',
    cloze: 'Kiegészítés', translate: 'Fordítás', pro: 'Pro hallás',
    free: 'Szabad fordítás',
    reverse: 'Fordítva', typing: 'Beírás', match: 'Párosító',
    check: 'Ellenőrzés', listen: 'Hallás utáni kör', review: 'Ismétlés', retry: 'Hibák újra', quick: 'Gyors kérdések',
    'exam-quick': 'Kis teszt', 'exam-big': 'Nagy dolgozat', 'exam-retry': 'Dolgozat: hibák újra',
    'counter-recognition': 'Felismerés', 'counter-hybrid': 'Hibrid',
    'counter-mastery': 'Mester',
    'matrix-selector': 'Ragozás-összerakó', 'speed-drill': 'Gyorskör',
    'interactive-demo': 'Bemutató'
  };
  // Az Áttekintés műszerfal: benne az aktivitás (heatmap, sorozat) és a „mit gyakorolj" is.
  const TABS = [
    { id: 'overview',  name: 'Áttekintés', enabled: true  },
    { id: 'radar',     name: 'Modulok',    enabled: true  },
    { id: 'analytics', name: 'Elemzés',    enabled: true  },
    { id: 'exams',     name: 'Dolgozatok', enabled: true  },
    { id: 'history',   name: 'Előzmények', enabled: true  }
  ];
  let activeTab = 'overview';
  let radarModule = null;     // V4 P3 — modul drill-down állapot

  /* ── Formázók ──────────────────────────────────── */
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '. ' + pad(d.getMonth() + 1) + '. ' + pad(d.getDate()) +
           '.  ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function fmtDuration(ms) {
    const s = Math.round((ms || 0) / 1000);
    if (s < 60) return s + ' mp';
    return Math.floor(s / 60) + ' p ' + pad(s % 60) + ' mp';
  }
  // Hibakód → magyar felirat. Elsőként a modulok hiba-katalógusainak `title` mezője
  // (core.js), aztán a katalóguson kívüli, általános kódok; végső esetben a nyers kód.
  const ERROR_CATALOGS = [
    typeof NIHONCORE_ERROR_TYPES         !== 'undefined' ? NIHONCORE_ERROR_TYPES         : null,
    typeof NIHONCORE_ADJ_ERROR_TYPES     !== 'undefined' ? NIHONCORE_ADJ_ERROR_TYPES     : null,
    typeof NIHONCORE_DT_ERROR_TYPES      !== 'undefined' ? NIHONCORE_DT_ERROR_TYPES      : null,
    typeof NIHONCORE_AUDIO_ERROR_TYPES   !== 'undefined' ? NIHONCORE_AUDIO_ERROR_TYPES   : null,
    typeof NIHONCORE_GRAMMAR_ERROR_TYPES !== 'undefined' ? NIHONCORE_GRAMMAR_ERROR_TYPES : null
  ].filter(Boolean);
  const ERROR_LABELS = {
    wrong_form: 'Rossz alak', wrong_choice: 'Rossz válasz', wrong_reading: 'Rossz olvasat',
    wrong_type: 'Rossz típus', wrong_category: 'Rossz kategória', wrong_order: 'Rossz sorrend',
    wrong_pattern: 'Másik minta', wrong_particle: 'Rossz partikula', wrong: 'Rossz válasz',
    empty: 'Üres válasz', dont_know: 'Nem tudtam', typo: 'Elgépelés', timeout: 'Lejárt az idő',
    partial_match: 'Részben jó', far: 'Messze járt', near: 'Közel járt', close: 'Majdnem jó',
    long_vowel: 'Hosszú magánhangzó', sokuon: 'Kis っ', mora: 'Mora-ritmus'
  };
  function errorLabel(code) {
    const key = String(code || '');
    for (let i = 0; i < ERROR_CATALOGS.length; i++) {
      const hit = ERROR_CATALOGS[i][key];
      if (hit && hit.title) return hit.title;
    }
    return ERROR_LABELS[key] || key.replace(/[_-]/g, ' ');
  }
  function topError(codes) {
    if (!codes || !codes.length) return null;
    const freq = {};
    codes.forEach(c => { freq[c] = (freq[c] || 0) + 1; });
    let best = null, n = 0;
    Object.keys(freq).forEach(c => { if (freq[c] > n) { n = freq[c]; best = c; } });
    return best ? { code: errorLabel(best), count: n } : null;
  }

  /* ── V4 P2 — stat-számítók ─────────────────────── */
  const DAY_MS = 86400000;
  const MODULE_KEYS = Object.keys(MODULE_LABELS);
  const TOD_BUCKETS = [
    { id: 'reggel',  label: 'Reggel',  emoji: '🌅', hint: '5–11 óra' },
    { id: 'delutan', label: 'Délután', emoji: '☀️', hint: '12–17 óra' },
    { id: 'este',    label: 'Este',    emoji: '🌆', hint: '18–22 óra' },
    { id: 'ejszaka', label: 'Éjszaka', emoji: '🌙', hint: '23–4 óra' }
  ];
  function bucketOf(h) {
    if (h >= 5 && h <= 11) return 'reggel';
    if (h >= 12 && h <= 17) return 'delutan';
    if (h >= 18 && h <= 22) return 'este';
    return 'ejszaka';
  }
  function dayKey(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function startOfDay(ts) {
    const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime();
  }

  // Readiness: modul-mastery + frissesség + napi aktivitás (cél: JLPT N5)
  function computeReadiness() {
    const sessions = NihonCoreStats.getSessions();
    const now = Date.now();
    const pm = {};
    MODULE_KEYS.forEach(m => { pm[m] = { Q: 0, C: 0, last: 0 }; });
    sessions.forEach(s => {
      const p = pm[s.module]; if (!p) return;
      p.Q += s.questionCount || 0;
      p.C += s.correctCount || 0;
      if (s.ts > p.last) p.last = s.ts;
    });
    let masterySum = 0, freshSum = 0;
    const moduleScores = {};
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.Q === 0) { moduleScores[m] = 0; return; }
      const accuracy = p.C / p.Q;
      const coverage = Math.min(1, p.Q / 60);          // ~60 kérdés = teli lefedettség
      const mastery = accuracy * coverage;
      masterySum += mastery;
      const daysSince = (now - p.last) / DAY_MS;
      const fresh = daysSince <= 2 ? 1
                  : daysSince >= 21 ? 0.25
                  : 1 - 0.75 * (daysSince - 2) / 19;
      freshSum += fresh;
      moduleScores[m] = Math.round(mastery * 100);
    });
    const masteryComp = masterySum / MODULE_KEYS.length;
    const freshComp   = freshSum   / MODULE_KEYS.length;
    const weekAgo = startOfDay(now) - 6 * DAY_MS;
    let activeDays = 0;
    NihonCoreStats.getDailyAggregates().forEach(d => {
      if (new Date(d.date + 'T00:00:00').getTime() >= weekAgo) activeDays++;
    });
    const activityComp = Math.min(1, activeDays / 5);
    return {
      score:     Math.round(100 * (0.55 * masteryComp + 0.20 * freshComp + 0.25 * activityComp)),
      mastery:   Math.round(masteryComp * 100),
      freshness: Math.round(freshComp * 100),
      activity:  Math.round(activityComp * 100),
      moduleScores: moduleScores
    };
  }

  // V8: Readiness tier-átlépés trigger (Lottie helyett sakura-bloom celebration)
  // Tier-küszöbök: 25 / 50 / 75 / 90. Csak NÖVEKVŐ átlépésnél triggerel.
  // localStorage: 'nihoncore_last_readiness_tier' eltárolja a legmagasabb elért tier-t.
  function tierForScore(score) {
    if (score >= 90) return 90;
    if (score >= 75) return 75;
    if (score >= 50) return 50;
    if (score >= 25) return 25;
    return 0;
  }
  const TIER_MESSAGES = {
    25: { title: '🌱 Első küszöb!',     sub: '25% — megtetted az első lépéseket.' },
    50: { title: '🌸 Félút!',           sub: '50% — szilárd alapokon állsz.' },
    75: { title: '🎴 Erős készültség!', sub: '75% — már sokat tudsz.' },
    90: { title: '✨ Mester szint!',    sub: '90% — kiváló japán-tudás. Tarts ki!' }
  };
  function checkReadinessTierMilestone() {
    if (!window.NihonCoreMotion || !window.NihonCoreMotion.celebrate) return;
    const rd = computeReadiness();
    const newTier = tierForScore(rd.score);
    let lastTier = 0;
    try { lastTier = parseInt(localStorage.getItem('nihoncore_last_readiness_tier') || '0', 10) || 0; }
    catch (e) {}
    if (newTier > lastTier && TIER_MESSAGES[newTier]) {
      // Új tier átlépve — celebrate (800ms delay-vel, hogy a felhasználó lássa az új score-t)
      const msg = TIER_MESSAGES[newTier];
      setTimeout(() => {
        window.NihonCoreMotion.celebrate({ message: msg.title, subtitle: msg.sub, duration: 1700 });
      }, 800);
      try { localStorage.setItem('nihoncore_last_readiness_tier', String(newTier)); }
      catch (e) {}
    } else if (newTier < lastTier) {
      // Ha lecsökkent a score (pl. clearSessions után), reseteljük a track-et
      try { localStorage.setItem('nihoncore_last_readiness_tier', String(newTier)); }
      catch (e) {}
    }
  }

  // Egymást követő naptári napok streakje
  //   (a számítás a NihonCoreStats-ban van: a kezdőlap napi célja ugyanebből dolgozik)
  function computeStreak() { return NihonCoreStats.getStreak(); }

  function todayStats() { return NihonCoreStats.getToday(); }

  // Heatmap — az elmúlt egy év (53 hét × 7 nap), hétfő-kezdő hetek, GitHub-szerű elrendezés.
  //   level 0–4: a napi kérdésszám a legaktívabb naphoz mérve.
  const HM_MONTHS = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
  function heatmapData() {
    const map = {};
    let maxQ = 1;
    NihonCoreStats.getDailyAggregates().forEach(d => {
      map[d.date] = d; if (d.questions > maxQ) maxQ = d.questions;
    });
    const today = startOfDay(Date.now());
    const todayDow = (new Date(today).getDay() + 6) % 7;   // hétfő = 0
    const WEEKS = 53;
    const start = new Date(today);
    start.setDate(start.getDate() - todayDow - (WEEKS - 1) * 7);
    const cells = [], months = [];
    let totalQ = 0, activeDays = 0, lastMonth = -1;
    for (let i = 0; i < WEEKS * 7; i++) {
      const dt = new Date(start); dt.setDate(start.getDate() + i);   // naptári lépés (óraátállítás-biztos)
      const ts = dt.getTime();
      const d = map[dayKey(ts)];
      const q = d ? d.questions : 0;
      let level = 0;
      if (q > 0) level = q >= maxQ * 0.75 ? 4 : q >= maxQ * 0.5 ? 3 : q >= maxQ * 0.25 ? 2 : 1;
      const future = ts > today;
      if (!future && q > 0) { totalQ += q; activeDays++; }
      cells.push({ ts: ts, q: q, sessions: d ? d.sessions : 0, accuracy: d ? d.accuracy : 0,
                   level: level, future: future, today: ts === today });
      // hónap-felirat: annak a hétnek az oszlopa fölé, amelyikben a hónap első hétfője van
      if (i % 7 === 0 && dt.getMonth() !== lastMonth) {
        lastMonth = dt.getMonth();
        months.push({ week: i / 7, label: HM_MONTHS[lastMonth] });
      }
    }
    return { cells: cells, weeks: WEEKS, months: months, totalQ: totalQ, activeDays: activeDays };
  }

  function timeOfDayData() {
    const b = {};
    TOD_BUCKETS.forEach(x => { b[x.id] = { sessions: 0, Q: 0, C: 0 }; });
    NihonCoreStats.getSessions().forEach(s => {
      const bk = b[bucketOf(new Date(s.ts).getHours())];
      bk.sessions++; bk.Q += s.questionCount || 0; bk.C += s.correctCount || 0;
    });
    return TOD_BUCKETS.map(x => ({
      id: x.id, label: x.label, emoji: x.emoji, hint: x.hint,
      sessions: b[x.id].sessions,
      accuracy: b[x.id].Q > 0 ? Math.round(b[x.id].C / b[x.id].Q * 100) : 0
    }));
  }

  // Legjobb tanulási idő — a legjobb pontosságú napszak (min. 2 kör)
  function bestStudyTime(tod) {
    let best = null;
    tod.forEach(t => {
      if (t.sessions >= 2 && (!best || t.accuracy > best.accuracy)) best = t;
    });
    return best;
  }

  // Readiness ring SVG (kézzel rajzolt)
  function ringSvg(score) {
    const r = 80, C = 2 * Math.PI * r;
    const off = C * (1 - Math.max(0, Math.min(100, score)) / 100);
    const tone = score >= 70 ? 'ring-hi' : score >= 40 ? 'ring-mid' : 'ring-lo';
    // V8 polish: kezdeti offset = teljes kerület (üres ring), data-target-offset
    // attribútumban tároljuk a célt → a renderelés után JS animálja a CSS transition-ön át.
    return `
      <svg class="readiness-ring ${tone}" viewBox="0 0 200 200" data-target-offset="${off.toFixed(1)}">
        <circle class="ring-track" cx="100" cy="100" r="${r}" />
        <circle class="ring-fill" cx="100" cy="100" r="${r}"
                stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"
                transform="rotate(-90 100 100)" />
      </svg>`;
  }

  function animateReadinessRings(root) {
    const svgs = (root || document).querySelectorAll('.readiness-ring[data-target-offset]');
    svgs.forEach(svg => {
      const target = svg.getAttribute('data-target-offset');
      const fill = svg.querySelector('.ring-fill');
      if (!fill || !target) return;
      // Egy frame után állítjuk → CSS transition triggerel
      requestAnimationFrame(() => {
        setTimeout(() => fill.setAttribute('stroke-dashoffset', target), 50);
      });
      svg.removeAttribute('data-target-offset');
    });
  }

  function emptyState(icon, title, sub) {
    return `
      <div class="stats-empty glass-panel">
        <div class="stats-empty-icon">${icon}</div>
        <p>${title}</p>
        <p class="stats-empty-sub">${sub}</p>
        <a href="modules.html" class="btn btn-primary glow-effect">Irány a modulok →</a>
      </div>`;
  }

  /* ── V4 P3 — radar + analytics helperek ────────── */
  // Radar tengely-sorrend (V5 bővítve: + Mintázatok)
  const RADAR_ORDER = ['counter', 'conjugation', 'adjectives', 'datetime', 'practice', 'listening', 'grammar'];
  const RADAR_LABELS = {
    counter: 'Számlálók', conjugation: 'Igék', adjectives: 'Melléknevek',
    datetime: 'Idő', practice: 'Partikulák', listening: 'Hallás',
    grammar: 'Minták'
  };
  // Profil-alapú al-bontás (a modulok saját localStorage profiljaiból)
  const PROFILE_CONFIG = {
    conjugation: { key: 'nihoncore_conj_profile_v1', stats: [
      { field: 'groupStats', title: 'Ige-csoport' },
      { field: 'formStats',  title: 'Ragozási forma' } ] },
    adjectives:  { key: 'nihoncore_adj_profile_v1', stats: [
      { field: 'typeStats',  title: 'Melléknév-típus' },
      { field: 'formStats',  title: 'Forma' } ] },
    datetime:    { key: 'nihoncore_dt_profile_v1', stats: [
      { field: 'catStats',   title: 'Kategória' } ] },
    grammar:     { key: 'nihoncore_grm_profile_v1', stats: [
      { field: 'catStats',     title: 'Pattern-kategória' },
      { field: 'patternStats', title: 'Mintázat' } ] }
  };

  function cleanKey(k) {
    const s = String(k).replace(/[_-]/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }

  // Egy modul session-log statja (per-mód bontással)
  function moduleSessionStats(moduleKey) {
    const sess = NihonCoreStats.getSessions().filter(s => s.module === moduleKey);
    const modes = {};
    let Q = 0, C = 0, dur = 0;
    sess.forEach(s => {
      Q += s.questionCount || 0; C += s.correctCount || 0; dur += s.durationMs || 0;
      const m = modes[s.mode] = modes[s.mode] || { Q: 0, C: 0, n: 0 };
      m.Q += s.questionCount || 0; m.C += s.correctCount || 0; m.n++;
    });
    return {
      rounds: sess.length, questions: Q, correct: C, durationMs: dur,
      accuracy: Q > 0 ? Math.round(C / Q * 100) : 0,
      modes: Object.keys(modes).map(k => ({
        mode: k, rounds: modes[k].n, questions: modes[k].Q,
        pct: modes[k].Q > 0 ? Math.round(modes[k].C / modes[k].Q * 100) : 0
      }))
    };
  }

  // Profil-alapú al-bontások egy modulhoz (Godan/Ichidan, te/nai/masu, kategória…)
  function subBreakdowns(moduleKey) {
    const out = [];
    const cfg = PROFILE_CONFIG[moduleKey];
    if (cfg) {
      const p = readJson(cfg.key);
      if (p) cfg.stats.forEach(s => {
        const obj = p[s.field];
        if (obj && Object.keys(obj).length) {
          const rows = Object.keys(obj).map(k => {
            const st = obj[k] || {};
            const a = st.attempts || 0, c = st.correct || 0;
            return { label: cleanKey(k), attempts: a, correct: c,
                     pct: a > 0 ? Math.round(c / a * 100) : 0 };
          }).sort((x, y) => x.pct - y.pct);   // gyengétől erősig
          out.push({ title: s.title, kind: 'rate', rows: rows });
        }
      });
    }
    if (moduleKey === 'listening') {
      const p = readJson('nihoncore_listening_profile_v1');
      if (p && p.trapErrors) {
        const rows = Object.keys(p.trapErrors)
          .map(k => ({ label: errorLabel(k), count: p.trapErrors[k] || 0 }))
          .sort((x, y) => y.count - x.count);
        if (rows.some(r => r.count > 0))
          out.push({ title: 'Hang-csapda hibák', kind: 'count', rows: rows });
      }
    }
    return out;
  }

  // Pontosság-trend napi bontásban
  function trendData() {
    return NihonCoreStats.getDailyAggregates().map(d => ({
      date: d.date, accuracy: d.accuracy, questions: d.questions
    }));
  }

  // Radar SVG — kézzel rajzolt, 6 tengely
  function radarSvg(items) {
    const cx = 175, cy = 150, R = 96, n = items.length;
    const pt = (r, i) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const polyOf = rr => items.map((_, i) => pt(rr, i).map(v => v.toFixed(1)).join(',')).join(' ');
    let grid = '';
    [0.25, 0.5, 0.75, 1].forEach(f => { grid += `<polygon class="radar-grid" points="${polyOf(R * f)}" />`; });
    let axes = '';
    items.forEach((_, i) => {
      const [x, y] = pt(R, i);
      axes += `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
    });
    const dataPts = items.map((it, i) =>
      pt(R * Math.max(0, Math.min(100, it.value)) / 100, i).map(v => v.toFixed(1)).join(',')).join(' ');
    let dots = '', labels = '';
    items.forEach((it, i) => {
      const [dx, dy] = pt(R * Math.max(0, Math.min(100, it.value)) / 100, i);
      dots += `<circle class="radar-dot" cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="3.6" />`;
      const [lx, ly] = pt(R + 20, i);
      const anchor = Math.abs(lx - cx) < 8 ? 'middle' : (lx > cx ? 'start' : 'end');
      labels += `<text class="radar-label" x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" text-anchor="${anchor}">${it.label}</text>`;
      labels += `<text class="radar-label-val" x="${lx.toFixed(1)}" y="${(ly + 15).toFixed(1)}" text-anchor="${anchor}">${it.value}</text>`;
    });
    return `<svg viewBox="0 0 350 300" class="radar-svg">
      ${grid}${axes}
      <polygon class="radar-data" points="${dataPts}" />
      ${dots}${labels}
    </svg>`;
  }

  // Vonaldiagram SVG — kézzel rajzolt
  function lineSvg(points, opts) {
    opts = opts || {};
    if (points.length === 0) return '';
    const W = 600, H = 190, padL = 38, padR = 14, padT = 14, padB = 30;
    const iw = W - padL - padR, ih = H - padT - padB;
    const max = opts.max || 100;
    const xAt = i => padL + (points.length === 1 ? iw / 2 : iw * i / (points.length - 1));
    const yAt = v => padT + ih * (1 - Math.max(0, Math.min(max, v)) / max);
    let grid = '';
    [0, 0.5, 1].forEach(f => {
      const y = padT + ih * f;
      grid += `<line class="ln-grid" x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" />`;
      grid += `<text class="ln-axis" x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end">${Math.round(max * (1 - f))}</text>`;
    });
    const line = points.map((p, i) => `${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(' ');
    const area = `${padL},${(padT + ih).toFixed(1)} ${line} ${xAt(points.length - 1).toFixed(1)},${(padT + ih).toFixed(1)}`;
    let dots = '';
    points.forEach((p, i) => {
      dots += `<circle class="ln-dot" cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="3.2">` +
              `<title>${p.label}: ${p.value}${opts.unit || ''}</title></circle>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="line-svg">
      ${grid}
      <polygon class="ln-area" points="${area}" />
      <polyline class="ln-line" points="${line}" />
      ${dots}
    </svg>`;
  }

  /* ── Fül-sáv ───────────────────────────────────── */
  function renderTabs() {
    document.getElementById('statsTabs').innerHTML = TABS.map(t => `
      <button class="stats-tab ${t.id === activeTab ? 'active' : ''} ${t.enabled ? '' : 'stats-tab-locked'}"
              data-tab="${t.id}" ${t.enabled ? '' : 'disabled'}>
        ${t.name}${t.enabled ? '' : ' 🔒'}
      </button>
    `).join('');
    // telefonon a fül-sáv vízszintesen görgethető: az aktív fül legyen látható
    const bar = document.getElementById('statsTabs'), act = bar.querySelector('.stats-tab.active');
    if (act && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = Math.max(0, act.offsetLeft - (bar.clientWidth - act.offsetWidth) / 2);
    document.querySelectorAll('.stats-tab').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        radarModule = null;
        renderTabs();
        renderContent();
      });
    });
  }

  function renderContent() {
    if      (activeTab === 'overview')  renderOverview();
    else if (activeTab === 'radar')     renderRadar();
    else if (activeTab === 'analytics') renderAnalytics();
    else if (activeTab === 'exams')     renderExams();
    else if (activeTab === 'history')   renderHistory();
    else renderComingSoon();
  }

  function renderComingSoon() {
    document.getElementById('statsContent').innerHTML = `
      <div class="stats-empty glass-panel">
        <div class="stats-empty-icon">🚧</div>
        <p>Ez a nézet a V4 következő fázisában készül el.</p>
        <p class="stats-empty-sub">Addig is: az „Előzmények" fülön látod a befejezett köreidet.</p>
      </div>`;
  }

  /* ── E) Practice History ───────────────────────── */
  function renderHistory() {
    const sessions = NihonCoreStats.getSessions().slice().reverse(); // legújabb elöl
    const el = document.getElementById('statsContent');

    if (sessions.length === 0) {
      el.innerHTML = `
        <div class="stats-empty glass-panel">
          <div class="stats-empty-icon">📋</div>
          <p>Még nincs gyakorlási előzményed.</p>
          <p class="stats-empty-sub">Játssz le egy teljes kört bármelyik modulban —
            a kör végén automatikusan ide mentődik.</p>
          <a href="modules.html" class="btn btn-primary glow-effect">Irány a modulok →</a>
        </div>`;
      return;
    }

    const totalQ = sessions.reduce((s, x) => s + (x.questionCount || 0), 0);
    const totalC = sessions.reduce((s, x) => s + (x.correctCount || 0), 0);
    const acc = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;

    const rows = sessions.map(s => {
      const pct = s.questionCount > 0 ? Math.round((s.correctCount / s.questionCount) * 100) : 0;
      const cls = pct >= 80 ? 'sh-ok' : pct >= 50 ? 'sh-warn' : 'sh-bad';
      const te = topError(s.errorCodes);
      const statusCls = s.partial ? 'sh-status-partial' : 'sh-status-done';
      const statusTxt = s.partial ? '⏸ Félbehagyott' : '✓ Befejezett';
      return `
        <div class="sh-row ${cls}${s.partial ? ' sh-row-partial' : ''}">
          <div class="sh-main">
            <span class="sh-module">${MODULE_LABELS[s.module] || s.module}</span>
            <span class="sh-mode">${MODE_LABELS[s.mode] || s.mode}</span>
            <span class="sh-status ${statusCls}">${statusTxt}</span>
            <span class="sh-date">${fmtDate(s.ts)}</span>
          </div>
          <div class="sh-stats">
            <span class="sh-score">${s.correctCount}/${s.questionCount}</span>
            <span class="sh-pct">${pct}%</span>
            <span class="sh-dur">⏱ ${fmtDuration(s.durationMs)}</span>
            ${te ? `<span class="sh-err">fő hiba: ${te.code}${te.count > 1 ? ' ×' + te.count : ''}</span>` : ''}
          </div>
        </div>`;
    }).join('');

    const doneCount    = sessions.filter(s => !s.partial).length;
    const partialCount = sessions.length - doneCount;

    el.innerHTML = `
      <div class="sh-summary glass-panel">
        <div class="sh-sum-stat"><span class="sh-sum-num">${doneCount}</span><span class="sh-sum-label">befejezett kör</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${partialCount}</span><span class="sh-sum-label">félbehagyott kör</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${totalQ}</span><span class="sh-sum-label">összes kérdés</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${acc}%</span><span class="sh-sum-label">össz-pontosság</span></div>
        <button class="sh-clear" id="shClear" type="button">Előzmények törlése</button>
      </div>
      <div class="sh-list">${rows}</div>
    `;

    const clr = document.getElementById('shClear');
    if (clr) clr.addEventListener('click', () => {
      NihonCoreRound.confirmDelete('Törlöd az előzményeket?', 'A teljes gyakorlási előzmény elvész, vele a statisztika is. Ez nem vonható vissza.', () => {
        NihonCoreStats.clearSessions();
        renderHistory();
      });
    });
  }

  /* ── A) Áttekintés — műszerfal ─────────────────── */
  const ICON = {
    flame:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-1.6.6-2.7 1.4-3.6.3 1.4 1 2.2 1.9 2.4C10 9 10.6 6 12 3z"/></svg>',
    rounds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="13" height="15" rx="3"/><path d="M8 5V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    clock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  function todayBlurb(today, streak) {
    if (today.rounds === 0) {
      return streak.current > 0
        ? 'Ma még nem gyakoroltál. Egy gyors kör életben tartja a sorozatot.'
        : 'Ma még nem gyakoroltál. Egy rövid kör is számít.';
    }
    if (today.accuracy >= 85) return 'Kiváló forma ma: ' + today.accuracy + '% pontosság.';
    if (today.accuracy >= 60) return 'Szép munka ma, így tovább.';
    return 'A kitartás a lényeg: a mai körök is építenek.';
  }

  function fmtShort(ms) {
    const s = Math.round((ms || 0) / 1000);
    return s < 60 ? s + ' mp' : Math.round(s / 60) + ' perc';
  }
  function fmtDay(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '. ' + HM_MONTHS[d.getMonth()] + ' ' + d.getDate() + '.';
  }

  // Éves heatmap (GitHub-szerű): hetek oszlopban, napok sorban, hónap-feliratok felül.
  function heatmapHtml(hm) {
    const cells = hm.cells.map(c => {
      const tip = c.future ? '' : fmtDay(c.ts) + ': ' + (c.q > 0 ? c.q + ' kérdés, ' + c.sessions + ' kör, ' + c.accuracy + '%' : 'nem gyakoroltál');
      return '<i class="hm-c hm-l' + c.level + (c.future ? ' hm-future' : '') + (c.today ? ' hm-today' : '') + '"' +
        (tip ? ' data-tip="' + tip + '" title="' + tip + '"' : '') + '></i>';
    }).join('');
    const months = hm.months.map((m, i) => {
      const next = hm.months[i + 1];
      // túl szoros felirat (2 hétnél rövidebb hely) kimarad
      if (next && next.week - m.week < 3) return '';
      return '<span style="grid-column: ' + (m.week + 1) + ' / span ' + Math.min(3, hm.weeks - m.week) + '">' + m.label + '</span>';
    }).join('');
    return `
      <div class="hm">
        <div class="hm-dows" aria-hidden="true"><span>H</span><span></span><span>Sze</span><span></span><span>P</span><span></span><span></span></div>
        <div class="hm-scroll" id="hmScroll" tabindex="0" role="img"
             aria-label="Aktivitás az elmúlt egy évben: ${hm.totalQ} kérdés ${hm.activeDays} aktív napon">
          <div class="hm-months" style="grid-template-columns: repeat(${hm.weeks}, var(--hm-cell))">${months}</div>
          <div class="hm-grid">${cells}</div>
        </div>
      </div>
      <div class="hm-foot">
        <span class="hm-caption" id="hmCaption">${hm.totalQ} kérdés az elmúlt egy évben, ${hm.activeDays} aktív napon</span>
        <span class="hm-legend" aria-hidden="true">
          kevesebb
          <i class="hm-c hm-l0"></i><i class="hm-c hm-l1"></i><i class="hm-c hm-l2"></i><i class="hm-c hm-l3"></i><i class="hm-c hm-l4"></i>
          több
        </span>
      </div>`;
  }

  function renderOverview() {
    const el = document.getElementById('statsContent');
    const hasData = NihonCoreStats.getSessions().length > 0;
    const rd = computeReadiness();
    const today = todayStats();
    const streak = computeStreak();
    const hm = heatmapData();
    const readyLabel = rd.score >= 70 ? 'Jó úton haladsz' : rd.score >= 40 ? 'Halad a tanulás' : 'Most kezdődik';

    const comps = [
      { label: 'Tudás',      val: rd.mastery,   hint: 'pontosság és lefedettség, a modulok átlaga' },
      { label: 'Frissesség', val: rd.freshness, hint: 'mennyire friss a gyakorlásod' },
      { label: 'Aktivitás',  val: rd.activity,  hint: 'aktív napok az elmúlt héten' }
    ].map(c => `
      <div class="ov-comp">
        <div class="ov-comp-top">
          <span class="ov-comp-label">${c.label}</span>
          <span class="ov-comp-val">${c.val}%</span>
        </div>
        <div class="ov-comp-bar"><div class="ov-comp-fill" style="width:${c.val}%"></div></div>
        <div class="ov-comp-hint">${c.hint}</div>
      </div>
    `).join('');

    const vitals = [
      { icon: ICON.rounds, num: today.rounds,                  label: 'mai kör' },
      { icon: ICON.target, num: today.rounds ? today.accuracy + '%' : '–', label: 'mai pontosság' },
      { icon: ICON.clock,  num: today.rounds ? fmtShort(today.durationMs) : '–', label: 'mai idő' }
    ].map(v => `
      <div class="st-vital">
        <span class="st-vital-icon">${v.icon}</span>
        <span class="st-vital-num">${v.num}</span>
        <span class="st-vital-label">${v.label}</span>
      </div>
    `).join('');

    // „Mit gyakorolj most?" — a vakfolt-elemzés legfontosabb tételei
    const spots = hasData ? detectBlindSpots() : [];
    const spotCards = spots.slice(0, 4).map(s => `
      <div class="bs-card">
        <span class="bs-icon">${s.icon}</span>
        <div class="bs-body">
          <div class="bs-title">${s.title}</div>
          <div class="bs-text">${s.text}</div>
        </div>
        ${s.module ? `<button class="btn btn-outline bs-go" type="button" data-mod="${s.module}" data-note="${s.note || ''}">Gyakorlás</button>` : ''}
      </div>
    `).join('');

    el.innerHTML = `
      <section class="st-hero" aria-label="Sorozat és a mai nap">
        <div class="st-streak">
          <span class="st-streak-flame${streak.current > 0 ? ' is-lit' : ''}">${ICON.flame}</span>
          <div class="st-streak-text">
            <span class="st-streak-num" data-count="${streak.current}">${streak.current}</span>
            <span class="st-streak-label">napos sorozat</span>
          </div>
          <span class="st-streak-best">leghosszabb: ${streak.longest} nap</span>
        </div>
        <div class="st-vitals">${vitals}</div>
        <p class="st-blurb">${todayBlurb(today, streak)}</p>
      </section>

      <section class="st-card glass-panel">
        <h2 class="st-card-title">Aktivitás</h2>
        ${heatmapHtml(hm)}
      </section>

      ${hasData ? `
      <section class="st-card glass-panel st-ready">
        <div class="ov-ring-wrap">
          <div class="ov-ring">
            ${ringSvg(rd.score)}
            <div class="ov-ring-center">
              <span class="ov-ring-num" data-count="${rd.score}">${rd.score}</span>
              <span class="ov-ring-unit">/ 100</span>
            </div>
          </div>
          <div class="ov-ring-caption">
            <strong>Felkészültség</strong>
            <span>${readyLabel}</span>
          </div>
        </div>
        <div class="ov-comps">
          <h2 class="st-card-title">Miből áll össze</h2>
          ${comps}
        </div>
      </section>

      <section class="st-card glass-panel">
        <h2 class="st-card-title">Mit gyakorolj most?</h2>
        ${spots.length
          ? spotCards
          : '<p class="st-note">Nincs kiugró gyenge pont: kiegyensúlyozott a gyakorlásod. Ha egy terület lemarad, itt jelezzük.</p>'}
      </section>` : `
      <section class="st-card glass-panel st-empty">
        <h2 class="st-card-title">Itt fog megjelenni a haladásod</h2>
        <p class="st-note">Minden kör után színesedik a naptár, nő a sorozat, és megmutatjuk, mit érdemes gyakorolnod.</p>
        <a href="modules.html" class="btn btn-primary">Az első kör indítása</a>
      </section>`}
    `;

    animateReadinessRings(el);
    countUp(el);
    el.querySelectorAll('.bs-go').forEach(b => {
      b.addEventListener('click', () => goPractice(b.dataset.mod, b.dataset.note));
    });

    // heatmap: a legfrissebb hét látszódjon; koppintásra a nap részletei a lábléc-sorba kerülnek
    const sc = document.getElementById('hmScroll');
    const cap = document.getElementById('hmCaption');
    if (sc) {
      sc.scrollLeft = sc.scrollWidth;
      const base = cap ? cap.textContent : '';
      sc.addEventListener('click', e => {
        const c = e.target.closest ? e.target.closest('.hm-c[data-tip]') : null;
        sc.querySelectorAll('.hm-c.is-picked').forEach(x => x.classList.remove('is-picked'));
        if (!cap) return;
        if (c) { c.classList.add('is-picked'); cap.textContent = c.dataset.tip; }
        else cap.textContent = base;
      });
    }
  }

  // Számok felpörgetése 0-ról (sorozat, felkészültség) — csak ha a mozgás engedélyezett
  function countUp(root) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.querySelectorAll('[data-count]').forEach(n => {
      const to = +n.dataset.count;
      if (!(to > 0)) return;
      const t0 = performance.now(), D = 700;
      (function tick() {
        const p = Math.min(1, Math.max(0, (performance.now() - t0) / D));
        n.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      })();
      setTimeout(() => { n.textContent = to; }, D + 120);
    });
  }

  // Napszak szerinti eloszlás (az Elemzés fülön)
  function timeOfDayCard() {
    const tod = timeOfDayData();
    const best = bestStudyTime(tod);
    const maxTod = Math.max(1, tod[0].sessions, tod[1].sessions, tod[2].sessions, tod[3].sessions);
    const todBars = tod.map(t => `
      <div class="tod-col">
        <div class="tod-bar-wrap">
          <span class="tod-bar-val">${t.sessions}</span>
          <div class="tod-bar" style="height:${Math.round(t.sessions / maxTod * 100)}%"></div>
        </div>
        <div class="tod-label">${t.label}</div>
        <div class="tod-acc">${t.sessions > 0 ? t.accuracy + '%' : '–'}</div>
      </div>
    `).join('');
    return `
      <div class="act-card glass-panel">
        <div class="act-card-title">Mikor gyakorolsz?</div>
        <div class="tod-chart">${todBars}</div>
        <div class="act-best">
          ${best
            ? `<strong>A legjobb időd:</strong> ${best.label.toLowerCase()} (${best.hint}), ${best.accuracy}% pontossággal.`
            : 'Gyakorolj több körben, különböző napszakokban, és megmutatjuk, mikor megy a legjobban.'}
        </div>
      </div>`;
  }

  /* ── C) Module Radar + drill-down ──────────────── */
  function renderRadar() {
    const el = document.getElementById('statsContent');
    if (NihonCoreStats.getSessions().length === 0) {
      el.innerHTML = emptyState('📡', 'Még nincs modul-adat.',
        'Gyakorolj a modulokban — a radar a teljesítményedből rajzolódik ki.');
      return;
    }
    if (radarModule) { renderModuleDrill(radarModule); return; }

    const rd = computeReadiness();
    const items = RADAR_ORDER.map(m => ({
      key: m, label: RADAR_LABELS[m], value: rd.moduleScores[m] || 0
    }));
    const rows = items.map(it => `
      <button class="radar-row" data-mod="${it.key}">
        <span class="radar-row-name">${MODULE_LABELS[it.key]}</span>
        <span class="radar-row-bar"><span class="radar-row-fill" style="width:${it.value}%"></span></span>
        <span class="radar-row-val">${it.value}</span>
        <span class="radar-row-arrow">→</span>
      </button>
    `).join('');

    el.innerHTML = `
      <div class="act-card glass-panel">
        <div class="act-card-title">Modul-profil — felkészültség tengelyenként</div>
        <div class="radar-wrap">${radarSvg(items)}</div>
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Modulok — kattints a részletekért</div>
        ${rows}
      </div>
    `;
    document.querySelectorAll('.radar-row').forEach(b => {
      b.addEventListener('click', () => { radarModule = b.dataset.mod; renderContent(); });
    });
  }

  function renderModuleDrill(moduleKey) {
    const el = document.getElementById('statsContent');
    const st = moduleSessionStats(moduleKey);
    const subs = subBreakdowns(moduleKey);

    const modeRows = st.modes.length ? st.modes.map(m => `
      <div class="md-mode-row">
        <span class="md-mode-name">${MODE_LABELS[m.mode] || m.mode}</span>
        <span class="md-mode-bar"><span class="md-mode-fill" style="width:${m.pct}%"></span></span>
        <span class="md-mode-val">${m.pct}% · ${m.rounds} kör</span>
      </div>
    `).join('') : '<p class="md-empty">Ebben a modulban még nincs befejezett kör.</p>';

    const subHtml = subs.map(sub => {
      const rows = sub.rows.map(r => {
        if (sub.kind === 'count') {
          return `<div class="md-sub-row">
            <span class="md-sub-label">${r.label}</span>
            <span class="md-sub-count">${r.count} hiba</span>
          </div>`;
        }
        const cls = r.pct >= 80 ? 'sb-ok' : r.pct >= 50 ? 'sb-warn' : 'sb-bad';
        return `<div class="md-sub-row">
          <span class="md-sub-label">${r.label}</span>
          <span class="md-sub-bar"><span class="md-sub-fill ${cls}" style="width:${r.pct}%"></span></span>
          <span class="md-sub-val">${r.pct}% <small>(${r.correct}/${r.attempts})</small></span>
        </div>`;
      }).join('');
      return `<div class="md-sub"><div class="md-sub-title">${sub.title}</div>${rows}</div>`;
    }).join('');

    el.innerHTML = `
      <button class="md-back" id="mdBack">← Vissza a radarhoz</button>
      <div class="md-head glass-panel">
        <h3 class="md-title">${MODULE_LABELS[moduleKey]}</h3>
        <div class="md-head-stats">
          <span><strong>${st.rounds}</strong> kör</span>
          <span><strong>${st.questions}</strong> kérdés</span>
          <span><strong>${st.accuracy}%</strong> pontosság</span>
        </div>
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Módonkénti bontás</div>
        ${modeRows}
      </div>
      ${subs.length ? `<div class="act-card glass-panel">
        <div class="act-card-title">Részletes bontás (gyengétől erősig)</div>
        ${subHtml}
      </div>` : `<div class="act-card glass-panel">
        <p class="md-empty">Ehhez a modulhoz még nincs altéma-szintű profil-adat.</p>
      </div>`}
    `;
    document.getElementById('mdBack').addEventListener('click', () => {
      radarModule = null; renderContent();
    });
  }

  /* ── F) Analytics Detail ───────────────────────── */
  function renderAnalytics() {
    const el = document.getElementById('statsContent');
    const sessions = NihonCoreStats.getSessions();
    if (sessions.length === 0) {
      el.innerHTML = emptyState('📈', 'Még nincs elemzési adat.',
        'A fejlődési trend néhány nap gyakorlás után rajzolódik ki.');
      return;
    }
    const trend = trendData();
    const accPoints = trend.map(d => ({ label: d.date, value: d.accuracy }));
    const qPoints = trend.map(d => ({ label: d.date, value: d.questions }));
    const qMax = Math.max(10, ...trend.map(d => d.questions));

    const totalQ = sessions.reduce((a, s) => a + (s.questionCount || 0), 0);
    const totalC = sessions.reduce((a, s) => a + (s.correctCount || 0), 0);
    const totalDur = sessions.reduce((a, s) => a + (s.durationMs || 0), 0);
    const overallAcc = totalQ > 0 ? Math.round(totalC / totalQ * 100) : 0;

    // V5 P3b — SRS box-grafika (scope-agnostic; jelenleg csak 'grammar:')
    const srsPanels = SRS_SCOPES.map(sc => {
      const boxes = NihonCoreSRS.aggregateBoxes(sc.prefix);
      const total = boxes.reduce((s, n) => s + n, 0);
      if (total === 0) return '';
      return `
        <div class="act-card glass-panel">
          <div class="act-card-title">${sc.label} — SRS box-eloszlás</div>
          <div class="act-card-sub">Összesen <strong>${total}</strong> elem ütemezve · 6 ismétlési lépcső: 0 / 1 / 3 / 7 / 14 / 30 nap</div>
          ${srsBoxChart(boxes)}
        </div>
      `;
    }).filter(Boolean).join('');

    el.innerHTML = `
      <div class="an-stats">
        <div class="an-stat glass-panel"><span class="an-stat-num">${sessions.length}</span><span class="an-stat-label">összes kör</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${totalQ}</span><span class="an-stat-label">összes kérdés</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${overallAcc}%</span><span class="an-stat-label">átlagos pontosság</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${fmtDuration(totalDur)}</span><span class="an-stat-label">összes gyakorlás</span></div>
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Pontosság-trend — napi</div>
        ${trend.length >= 2
          ? lineSvg(accPoints, { max: 100, unit: '%' })
          : '<p class="md-empty">Legalább 2 különböző nap adata kell a trendhez — gyakorolj még!</p>'}
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Napi kérdés-volumen</div>
        ${trend.length >= 2
          ? lineSvg(qPoints, { max: qMax, unit: ' kérdés' })
          : '<p class="md-empty">Legalább 2 nap adata kell ehhez a grafikonhoz.</p>'}
      </div>
      ${timeOfDayCard()}
      ${srsPanels}
    `;
  }

  /* ── Dolgozatok: kitöltések, fejlődés dolgozatonként ───────────── */
  // Az adat a dolgozat-oldal mentése (nihoncore_exams_v1): kitöltésenként dátum, mód, idő, pontszám,
  // részenkénti és leckénkénti bontás. A dolgozatok leírása: NIHONCORE_EXAMS (core.js).
  const EXAM_SECTIONS = { gram: 'Nyelvtan és olvasás', part: 'Partikulák és mondatépítés', write: 'Ragozás és beírás', listen: 'Hallás' };
  const EXAM_PASS = 60;
  function renderExams() {
    const el = document.getElementById('statsContent');
    const defs = (typeof NIHONCORE_EXAMS !== 'undefined') ? NIHONCORE_EXAMS : [];
    let atts = [];
    try { atts = JSON.parse(localStorage.getItem('nihoncore_exams_v1') || '[]') || []; } catch (e) {}
    atts = atts.filter(a => a && a.exam && a.total).sort((a, b) => (a.ts || 0) - (b.ts || 0));
    const pc = a => Math.round(a.correct / a.total * 100);
    const day = ts => { const d = new Date(ts); return d.getFullYear() + '. ' + pad(d.getMonth() + 1) + '. ' + pad(d.getDate()) + '.'; };
    const clock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + pad(s % 60); };
    if (!atts.length) {
      el.innerHTML = emptyState('試', 'Még nem írtál dolgozatot.',
        'Négy leckénként egy kis teszt, tizenkét leckénként egy nagy dolgozat vár: itt látod majd, hogyan sikerültek, és mennyit fejlődtél.') +
        '<p class="st-exam-cta"><a class="btn btn-primary" href="exam.html">A dolgozatokhoz</a></p>';
      return;
    }
    const byExam = {};
    atts.forEach(a => { (byExam[a.exam] = byExam[a.exam] || []).push(a); });
    const written = defs.filter(d => byExam[d.id]);
    const avg = Math.round(atts.reduce((s, a) => s + pc(a), 0) / atts.length);
    const passed = written.filter(d => byExam[d.id].some(a => pc(a) >= EXAM_PASS)).length;

    // gyenge leckék: dolgozatonként a legutóbbi kitöltés leckénkénti eredményéből
    const lessonAgg = {};
    Object.keys(byExam).forEach(id => {
      const last = byExam[id][byExam[id].length - 1];
      Object.keys(last.lessons || {}).forEach(l => { const v = last.lessons[l]; const t = lessonAgg[l] = lessonAgg[l] || [0, 0]; t[0] += v[0]; t[1] += v[1]; });
    });
    const weak = Object.keys(lessonAgg).filter(l => lessonAgg[l][1] >= 2 && lessonAgg[l][0] / lessonAgg[l][1] * 100 < EXAM_PASS)
      .sort((a, b) => lessonAgg[a][0] / lessonAgg[a][1] - lessonAgg[b][0] / lessonAgg[b][1]).slice(0, 8);
    const lessonLabel = l => /^l\d+$/.test(l) ? l.slice(1) + '. lecke' : 'Kiegészítő ' + l.slice(1) + '.';

    const cards = written.map(d => {
      const mine = byExam[d.id];
      const last = mine[mine.length - 1], first = mine[0];
      const best = mine.reduce((m, a) => Math.max(m, pc(a)), 0);
      const diff = pc(last) - pc(first);
      const points = mine.slice(-12).map(a => ({ label: day(a.ts), value: pc(a) }));
      const secs = Object.keys(EXAM_SECTIONS).filter(s => last.sections && last.sections[s]).map(s => {
        const v = last.sections[s], q = Math.round(v[0] / v[1] * 100);
        return `<div class="exam-bar-row"><span class="exam-bar-name">${EXAM_SECTIONS[s]}</span>
            <span class="exam-bar"><span class="exam-bar-fill${q >= EXAM_PASS ? ' is-ok' : ''}" style="width:${q}%"></span></span>
            <span class="exam-bar-val">${v[0]} / ${v[1]}</span></div>`;
      }).join('');
      const rows = mine.slice(-6).reverse().map(a => `
            <li class="exam-att">
              <span class="exam-att-date">${day(a.ts)}</span>
              <span class="exam-att-mode">${a.examMode ? 'vizsga' : 'gyakorló'}</span>
              <span class="exam-att-time">${clock(a.durationMs || 0)}${a.timeUp ? ' · lejárt' : ''}</span>
              <strong class="exam-att-score${pc(a) >= EXAM_PASS ? ' is-ok' : ''}">${a.correct} / ${a.total} · ${pc(a)}%</strong>
            </li>`).join('');
      return `
        <div class="act-card glass-panel st-exam${d.kind === 'big' ? ' is-big' : ''}">
          <div class="st-exam-head">
            <span class="st-exam-glyph" lang="ja" aria-hidden="true">${d.glyph || '試'}</span>
            <div class="st-exam-titles">
              <div class="act-card-title">${d.title}</div>
              <div class="act-card-sub">${mine.length} kitöltés · legjobb <strong>${best}%</strong> · legutóbb ${pc(last)}%${mine.length > 1 ? ' · az első óta ' + (diff > 0 ? '+' + diff : diff) + ' százalékpont' : ''}</div>
            </div>
            <span class="st-exam-score${best >= EXAM_PASS ? ' is-ok' : ''}">${best}%</span>
          </div>
          ${mine.length >= 2 ? lineSvg(points, { max: 100, unit: '%' }) : '<p class="md-empty">Egy kitöltésed van: a fejlődés vonala a második után rajzolódik ki.</p>'}
          <div class="st-exam-block">
            <div class="st-exam-label">A legutóbbi kitöltés részenként</div>
            ${secs}
          </div>
          <div class="st-exam-block">
            <div class="st-exam-label">Kitöltések</div>
            <ul class="exam-att-list">${rows}</ul>
          </div>
          <a class="btn btn-outline st-exam-again" href="exam.html?id=${d.id}">Megírom újra</a>
        </div>`;
    }).join('');
    const todo = defs.filter(d => !byExam[d.id]);

    el.innerHTML = `
      <div class="an-stats">
        <div class="an-stat glass-panel"><span class="an-stat-num">${atts.length}</span><span class="an-stat-label">kitöltés</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${written.length} / ${defs.length}</span><span class="an-stat-label">megírt dolgozat</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${passed}</span><span class="an-stat-label">sikeres (60% fölött)</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${avg}%</span><span class="an-stat-label">átlagos eredmény</span></div>
      </div>
      ${weak.length ? `
      <div class="act-card glass-panel">
        <div class="act-card-title">Ezeket érdemes átismételni</div>
        <div class="act-card-sub">A dolgozatok legutóbbi kitöltései szerint ezekben a leckékben volt a legtöbb hiba.</div>
        <div class="exam-lesson-grid">
          ${weak.map(l => `<a class="exam-lesson is-weak" href="lesson.html?id=${l}"><span class="exam-lesson-name">${lessonLabel(l)}</span><span class="exam-lesson-val">${lessonAgg[l][0]} / ${lessonAgg[l][1]}</span></a>`).join('')}
        </div>
      </div>` : ''}
      ${cards}
      ${todo.length ? `
      <div class="act-card glass-panel">
        <div class="act-card-title">Még meg nem írt dolgozatok</div>
        <div class="st-exam-todo">
          ${todo.map(d => `<a class="st-exam-todo-link" href="exam.html?id=${d.id}"><span lang="ja" aria-hidden="true">${d.glyph || '試'}</span>${d.title}</a>`).join('')}
        </div>
      </div>` : ''}`;
  }

  // V5 P3b — Ismert SRS-scope-ok listája. Jövőbeli modulok ide kerülnek.
  const SRS_SCOPES = [
    { prefix: 'grammar:', label: 'Nyelvtani minták' },
    { prefix: 'lesson:', label: 'A leckék kérdései' }
    // pl. jövőbeli: { prefix: 'listening:', label: '🔊 Hallás' }
  ];

  const SRS_BOX_INFO = [
    { day: '<24 h', tone: 'fresh' },   // box 0 — új vagy bukott
    { day: '1 nap', tone: 'short' },
    { day: '3 nap', tone: 'short' },
    { day: '7 nap', tone: 'mid' },
    { day: '14 nap', tone: 'mid' },
    { day: '30 nap', tone: 'long' }
  ];

  // Vertikális bar-chart — 6 box-oszlop, magasság az ott lévő itemek számával
  // arányos. Tooltip (`title` attrib.) hover-on mutatja a következő esedékességet.
  function srsBoxChart(boxes) {
    const max = Math.max(1, ...boxes);
    const cols = boxes.map((n, i) => {
      const pct = Math.round((n / max) * 100);
      const info = SRS_BOX_INFO[i] || { day: '?', tone: 'short' };
      return `
        <div class="srs-box-col" title="Box ${i} — ${n} item · következő ismétlés: ${info.day}">
          <div class="srs-box-bar-wrap">
            <span class="srs-box-bar srs-box-tone-${info.tone}" style="height:${pct}%"></span>
          </div>
          <div class="srs-box-n">${n}</div>
          <div class="srs-box-label">Box ${i}<br/><em>${info.day}</em></div>
        </div>
      `;
    }).join('');
    return `<div class="srs-chart">${cols}</div>`;
  }

  /* ── D) Blind Spot Detector ────────────────────── */
  const MODULE_URL = {
    conjugation: 'conjugation.html', adjectives: 'adjectives.html',
    datetime: 'datetime.html', listening: 'listening.html',
    counter: 'module.html?id=szamlalok', practice: 'practice.html'
  };

  // Stratégiai diagnózisok a statokból, severity-szerint rendezve
  function detectBlindSpots() {
    const sessions = NihonCoreStats.getSessions();
    const out = [];
    if (sessions.length === 0) return out;
    const now = Date.now();

    const pm = {};
    MODULE_KEYS.forEach(m => { pm[m] = { Q: 0, C: 0, n: 0, last: 0 }; });
    sessions.forEach(s => {
      const p = pm[s.module]; if (!p) return;
      p.Q += s.questionCount || 0; p.C += s.correctCount || 0; p.n++;
      if (s.ts > p.last) p.last = s.ts;
    });

    // A) nem gyakorolt / régóta nem nyitott modulok
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.n === 0) {
        out.push({ severity: 72, icon: '🚪', module: m, note: 'feltérképezés',
          title: MODULE_LABELS[m] + ' — még nem próbáltad',
          text: 'Ezt a modult még meg sem nyitottad. Egy bevezető kör megmutatja, hol állsz.' });
      } else {
        const days = Math.floor((now - p.last) / DAY_MS);
        if (days >= 7) {
          out.push({ severity: 54 + Math.min(28, days), icon: '🕸️', module: m,
            note: days + ' napja kihagyva',
            title: MODULE_LABELS[m] + ' — ' + days + ' napja nem gyakoroltad',
            text: 'Rég nem nyitottad meg ezt a modult — a tudás fakul. Egy felfrissítő kör most sokat ér.' });
        }
      }
    });

    // B) alacsony pontosságú modulok
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.Q >= 12) {
        const acc = Math.round(p.C / p.Q * 100);
        if (acc < 55) {
          out.push({ severity: 62 + (55 - acc), icon: '📉', module: m, note: 'alacsony pontosság',
            title: MODULE_LABELS[m] + ' — alacsony pontosság (' + acc + '%)',
            text: 'Itt magas a hibaarányod. Lassíts, és olvasd el a magyarázatokat — a mennyiség önmagában kevés.' });
        }
      }
    });

    // C) gyenge al-területek (profil-alapú: forma / csoport / kategória)
    MODULE_KEYS.forEach(m => {
      subBreakdowns(m).forEach(sub => {
        if (sub.kind !== 'rate') return;
        sub.rows.forEach(r => {
          if (r.attempts >= 8 && r.pct < 50) {
            out.push({ severity: 50 + Math.round((50 - r.pct) / 2), icon: '🎯',
              module: m, note: r.label,
              title: MODULE_LABELS[m] + ' · ' + r.label + ' — gyenge pont (' + r.pct + '%)',
              text: 'A(z) „' + r.label + '" területet gyakran elvéted. Érdemes célzottan ismételni.' });
          }
        });
      });
    });

    // D) domináns, ismétlődő hibatípus
    const errFreq = {};
    let errTotal = 0;
    sessions.forEach(s => (s.errorCodes || []).forEach(c => {
      errFreq[c] = (errFreq[c] || 0) + 1; errTotal++;
    }));
    if (errTotal >= 6) {
      let topCode = null, topN = 0;
      Object.keys(errFreq).forEach(c => { if (errFreq[c] > topN) { topN = errFreq[c]; topCode = c; } });
      if (topCode && topN / errTotal >= 0.35) {
        out.push({ severity: 46 + Math.round(topN / errTotal * 28), icon: '🔁',
          title: 'Ismétlődő hibatípus: ' + errorLabel(topCode),
          text: 'A hibáid nagy része ugyanaz a típus (' + topN + '× / ' + errTotal + ' hiba). ' +
                'Ez nem véletlen — egy konkrét szabályt érdemes átnézni.' });
      }
    }

    out.sort((a, b) => b.severity - a.severity);
    return out;
  }

  // „Célzott gyakorlás" — focus-hint mentése + navigáció a gyenge modulhoz
  function goPractice(moduleKey, note) {
    try {
      localStorage.setItem('nihoncore_focus_hint',
        JSON.stringify({ module: moduleKey, note: note || '', ts: Date.now() }));
    } catch (e) {}
    if (MODULE_URL[moduleKey]) location.href = MODULE_URL[moduleKey];
  }

  /* ── INIT ──────────────────────────────────────── */
  renderTabs();
  renderContent();
  // V8: tier-átlépés celebration (sakura-bloom, ha új küszöböt léptél át)
  checkReadinessTierMilestone();

  window._stats = { NihonCoreStats, computeReadiness, computeStreak, detectBlindSpots, checkReadinessTierMilestone };
}


/* ====================================================
   9c. KANA PAGE — kana-tréner (kana.html)
   ----------------------------------------------------
   Hiragana + katakana a nulláról indulónak. A készlet a
   js/data/kana.js-ben van (NIHONCORE_KANA_ROWS).

   Módok:
     recognition  jel → olvasat (4 válasz)
     reverse      olvasat → jel (4 válasz)
     typing       jel → beírod az olvasatot (romaji)
     match        párosító: 5 jel ↔ 5 olvasat egy táblán
   Jó válasznál a kör magától lép tovább; hibánál megáll, és megmutatja,
   mit választottál és mi lett volna a helyes.

   Profil ('nihoncore_kana_profile_v1'): jelenként { n, ok } — ebből jön a
   tábla színezése (új / tanulod / megy) és a sor súlyozása (a gyengébb
   jelek gyakrabban jönnek).
   ==================================================== */
function initKanaPage() {
  const PROFILE_KEY  = 'nihoncore_kana_profile_v1';
  const SETTINGS_KEY = 'nihoncore_kana_settings_v1';
  const ROWS   = NIHONCORE_KANA_ROWS;
  const GROUPS = NIHONCORE_KANA_GROUPS;
  const SCRIPT_LABEL = { hiragana: 'Hiragana', katakana: 'Katakana', both: 'Mindkettő' };
  const MATCH_SIZE = 5;
  const AUTO_ADVANCE_MS = 650;

  /* ── A) Beállítások + profil ───────────────────── */
  function defaultRows() {
    const o = {};
    ROWS.forEach(r => { o[r.id] = r.group === 'basic'; });
    return o;
  }
  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  const saved = loadJson(SETTINGS_KEY) || {};
  const drillSettings = {
    script: saved.script || 'hiragana',          // 'hiragana' | 'katakana' | 'both'
    rows: Object.assign(defaultRows(), saved.rows || {}),
    mode: saved.mode || 'recognition',
    cardCount: saved.cardCount || 10
  };
  NihonCorePath.apply('kana', drillSettings);
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }

  function loadProfile() {
    const p = loadJson(PROFILE_KEY);
    return (p && p.items) ? p : { items: {}, totalAttempts: 0, totalCorrect: 0, bestStreak: 0 };
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
    if (window.NihonCoreSync && NihonCoreSync.schedulePush) NihonCoreSync.schedulePush();
  }
  // 'new' = még nem láttad · 'known' = legalább 3-ból 80% · 'learning' = a kettő között
  function mastery(profile, id) {
    const it = profile.items[id];
    if (!it || !it.n) return 'new';
    return (it.n >= 3 && it.ok / it.n >= 0.8) ? 'known' : 'learning';
  }

  const run = {
    inLobby: true, cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0, results: [],
    submitted: false, roundStartTs: 0, advanceTimer: null,
    match: null       // párosító tábla állapota
  };

  /* ── B) Készlet ────────────────────────────────── */
  // item: { id, script, kana, romaji, alt[], rowId, col, group }
  const ALL = { hiragana: [], katakana: [] };
  ROWS.forEach(row => row.items.forEach((cell, col) => {
    if (!cell) return;
    const base = { romaji: cell[2], alt: cell[3] || [], rowId: row.id, col: col, group: row.group };
    ALL.hiragana.push(Object.assign({ id: 'h:' + cell[0], script: 'hiragana', kana: cell[0] }, base));
    ALL.katakana.push(Object.assign({ id: 'k:' + cell[1], script: 'katakana', kana: cell[1] }, base));
  }));

  function activeScripts() {
    return drillSettings.script === 'both' ? ['hiragana', 'katakana'] : [drillSettings.script];
  }
  function activePool() {
    let pool = [];
    activeScripts().forEach(sc => { pool = pool.concat(ALL[sc].filter(it => drillSettings.rows[it.rowId])); });
    return pool;
  }
  // „Fordítva" módban a ぢ/づ kétértelmű (ugyanaz az olvasat, mint じ/ず) → kimarad
  function questionPool() {
    const pool = activePool();
    if (drillSettings.mode !== 'reverse') return pool;
    return pool.filter(it => !(it.rowId === 'da' && (it.col === 1 || it.col === 2)));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Súlyozott sor visszatevés nélkül: az új és a gyengébb jelek előrébb kerülnek
  function buildQueue(count) {
    const profile = loadProfile();
    const pool = questionPool();
    const keyed = pool.map(it => {
      const m = mastery(profile, it.id);
      const w = m === 'known' ? 1 : m === 'new' ? 2 : 3;
      return { it: it, key: Math.pow(Math.random(), 1 / w) };
    });
    keyed.sort((a, b) => b.key - a.key);
    let queue = keyed.map(k => k.it);
    while (queue.length && queue.length < count) queue = queue.concat(shuffle(pool));
    return queue.slice(0, count);
  }

  // Elterelő válaszok: előbb az összetéveszthető jelek, aztán ugyanaz a sor / oszlop
  function distractors(item, n) {
    const all = ALL[item.script];
    const out = [];
    const used = new Set([item.romaji]);
    const add = cand => {
      if (!cand || out.length >= n || used.has(cand.romaji)) return;
      used.add(cand.romaji); out.push(cand);
    };
    const groups = NIHONCORE_KANA_CONFUSABLE[item.script] || [];
    groups.filter(g => g.indexOf(item.kana) >= 0).forEach(g =>
      shuffle(g).forEach(k => add(all.find(x => x.kana === k))));
    shuffle(all.filter(x => x.rowId === item.rowId)).forEach(add);
    shuffle(all.filter(x => x.group === item.group && x.col === item.col)).forEach(add);
    shuffle(all.filter(x => x.group === item.group)).forEach(add);
    shuffle(all).forEach(add);
    return out;
  }

  const norm = s => String(s || '').trim().toLowerCase().replace(/[\s\-']/g, '');
  function romajiMatches(item, input) {
    const v = norm(input);
    return v === item.romaji || item.alt.indexOf(v) >= 0;
  }
  function kanaForRomaji(script, input) {
    const v = norm(input);
    return ALL[script].find(x => x.romaji === v || x.alt.indexOf(v) >= 0) || null;
  }
  const rowLabel = item => (ROWS.find(r => r.id === item.rowId) || {}).label || '';

  /* ── C) Fejléc-statisztika + tábla ─────────────── */
  function renderStatsBar() {
    const el = document.getElementById('kanaStatsBar');
    if (!el) return;
    const p = loadProfile();
    const pool = activePool();     // a kiválasztott írás és sorok
    const known = pool.filter(it => mastery(p, it.id) === 'known').length;
    const acc = p.totalAttempts ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${known} / ${pool.length}</span><span class="csc-label">megy</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${acc}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak || 0} 🔥</span><span class="csc-label">legjobb sorozat</span></div>`;
  }

  function renderChart() {
    const el = document.getElementById('kanaChart');
    if (!el) return;
    const p = loadProfile();
    const both = drillSettings.script === 'both';
    const main = drillSettings.script === 'katakana' ? 1 : 0;       // a cella nagy jele
    const mainScript = main === 1 ? 'katakana' : 'hiragana';

    const groupsHtml = GROUPS.map(g => {
      const rowsHtml = ROWS.filter(r => r.group === g.id).map(row => {
        const cells = row.items.map(cell => {
          if (!cell) return '<span class="kana-cell kana-cell-empty" aria-hidden="true"></span>';
          const id = (main === 1 ? 'k:' : 'h:') + cell[main];
          const m = mastery(p, id);
          return `<button class="kana-cell kana-${m}" type="button" data-say="${cell[0]}"
                    aria-label="${cell[main]}, ${cell[2]}">
                    <span class="kana-cell-jp" lang="ja">${cell[main]}</span>
                    ${both ? `<span class="kana-cell-alt" lang="ja">${cell[1]}</span>` : ''}
                    <span class="kana-cell-ro">${cell[2]}</span>
                  </button>`;
        }).join('');
        return `<div class="kana-row kana-cols-${row.cols}">${cells}</div>`;
      }).join('');
      return `<div class="kana-chart-group">
                <h3 class="kana-chart-title">${g.name}</h3>
                ${rowsHtml}
              </div>`;
    }).join('');

    el.innerHTML = `
      <div class="kana-chart-head">
        <h2 class="kana-chart-h">${SCRIPT_LABEL[mainScript]}-tábla${both ? ' <span class="kana-chart-note">(alatta a katakana)</span>' : ''}</h2>
        <p class="kana-chart-sub">Koppints egy jelre, és meghallgathatod.</p>
        <div class="kana-legend" aria-hidden="true">
          <span class="kana-legend-item"><span class="kana-dot kana-new"></span>új</span>
          <span class="kana-legend-item"><span class="kana-dot kana-learning"></span>tanulod</span>
          <span class="kana-legend-item"><span class="kana-dot kana-known"></span>megy</span>
        </div>
      </div>
      ${groupsHtml}`;
    el.querySelectorAll('.kana-cell[data-say]').forEach(btn => btn.addEventListener('click', () => {
      if (window.NihonCoreAudio) NihonCoreAudio.play(btn.dataset.say, { speed: 0.85 });
    }));
  }

  /* ── D) Lobbi ──────────────────────────────────── */
  function poolCount() { return questionPool().length; }

  function renderLobby() {
    const el = document.getElementById('kanaLobby');
    const scripts = [
      { id: 'hiragana', glyph: 'あ', name: 'Hiragana' },
      { id: 'katakana', glyph: 'ア', name: 'Katakana' },
      { id: 'both',     glyph: 'あア', name: 'Mindkettő' }
    ].map(s => `
      <button class="cj-mode-btn kana-script-btn ${drillSettings.script === s.id ? 'active' : ''}" data-script="${s.id}" type="button">
        <span class="kana-script-glyph" lang="ja">${s.glyph}</span>
        <span class="cj-m-name">${s.name}</span>
      </button>`).join('');

    const modes = [
      { id: 'recognition', name: 'Felismerés', sub: 'jel → olvasat' },
      { id: 'reverse',     name: 'Fordítva',   sub: 'olvasat → jel' },
      { id: 'typing',      name: 'Beírás',     sub: 'te írod be az olvasatot' },
      { id: 'match',       name: 'Párosító',   sub: 'öt jel, öt olvasat' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-mode="${m.id}" type="button">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>`).join('');

    const rowGroups = GROUPS.map(g => {
      const chips = ROWS.filter(r => r.group === g.id).map(r => `
        <button class="cj-form-chip kana-row-chip ${drillSettings.rows[r.id] ? 'active' : ''}" data-row="${r.id}" type="button">
          <span class="cjfc-name" lang="ja">${r.label}</span>
        </button>`).join('');
      return `
        <div class="cj-form-row">
          <span class="cj-form-row-label">${g.name} <span class="kana-group-hint">${g.hint}</span>
            <button class="kana-group-all" data-group="${g.id}" type="button">mind</button></span>
          <div class="cj-form-chips">${chips}</div>
        </div>`;
    }).join('');

    const presets = [10, 20, 40].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}" type="button">${n}</button>`).join('');

    el.innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Kana</div>
        <h2 class="lobby-title">Mit gyakorolnál?</h2>
      </div>

      <div class="lobby-section" data-lobby-keep>
        <div class="lobby-section-label">Írás</div>
        <div class="cj-mode-row kana-script-row">${scripts}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">Mód</div>
        <div class="cj-mode-row kana-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">Sorok</div>
        ${rowGroups}
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
          <div class="ml-count-custom">
            <label class="ml-count-custom-label" for="kanaCustomCount">vagy saját:</label>
            <input type="number" id="kanaCustomCount" min="1" max="200" placeholder="—" />
          </div>
        </div>
      </div>

      <div class="lobby-stats">
        <span class="lobby-combos">Kiválasztott jelek: <strong id="kanaPoolCount">${poolCount()}</strong></span>
      </div>

      <button class="btn btn-primary ml-start" id="kanaStart" type="button">Indítás</button>
    `;
    attachLobbyHandlers(el);
    updateStartBtn();
  }

  function updateStartBtn() {
    const n = poolCount();
    const cnt = document.getElementById('kanaPoolCount');
    if (cnt) cnt.textContent = n;
    const btn = document.getElementById('kanaStart');
    if (!btn) return;
    btn.disabled = n < 4;       // négy válaszhoz legalább négy jel kell
    btn.textContent = n < 4 ? 'Válassz ki legalább egy sort' : `Indítás — ${drillSettings.cardCount} kártya`;
  }

  function attachLobbyHandlers(el) {
    const pick = (sel, key, attr, after) => el.querySelectorAll(sel).forEach(btn => btn.addEventListener('click', () => {
      drillSettings[key] = btn.dataset[attr];
      el.querySelectorAll(sel).forEach(b => b.classList.toggle('active', b === btn));
      saveSettings(); updateStartBtn();
      if (after) after();
    }));
    pick('.kana-script-btn', 'script', 'script', () => { renderChart(); renderStatsBar(); });
    pick('.kana-mode-row .cj-mode-btn', 'mode', 'mode');

    el.querySelectorAll('.kana-row-chip').forEach(chip => chip.addEventListener('click', () => {
      const id = chip.dataset.row;
      drillSettings.rows[id] = !drillSettings.rows[id];
      chip.classList.toggle('active', drillSettings.rows[id]);
      saveSettings(); updateStartBtn(); renderStatsBar();
    }));
    // „mind": a csoport összes sora be; ha már mind be volt, ki
    el.querySelectorAll('.kana-group-all').forEach(btn => btn.addEventListener('click', () => {
      const ids = ROWS.filter(r => r.group === btn.dataset.group).map(r => r.id);
      const allOn = ids.every(id => drillSettings.rows[id]);
      ids.forEach(id => { drillSettings.rows[id] = !allOn; });
      el.querySelectorAll('.kana-row-chip').forEach(c => c.classList.toggle('active', !!drillSettings.rows[c.dataset.row]));
      saveSettings(); updateStartBtn(); renderStatsBar();
    }));

    el.querySelectorAll('.ml-count-btn').forEach(btn => btn.addEventListener('click', () => {
      drillSettings.cardCount = parseInt(btn.dataset.count, 10);
      el.querySelectorAll('.ml-count-btn').forEach(b => b.classList.toggle('active', b === btn));
      const custom = document.getElementById('kanaCustomCount');
      if (custom) custom.value = '';
      saveSettings(); updateStartBtn();
    }));
    const custom = document.getElementById('kanaCustomCount');
    custom.addEventListener('input', () => {
      const n = parseInt(custom.value, 10);
      if (isNaN(n) || n < 1) return;
      drillSettings.cardCount = Math.min(n, 200);
      el.querySelectorAll('.ml-count-btn').forEach(b => b.classList.remove('active'));
      saveSettings(); updateStartBtn();
    });

    document.getElementById('kanaStart').addEventListener('click', startRound);
  }

  /* ── E) Kör ────────────────────────────────────── */
  function startRound() {
    const queue = buildQueue(drillSettings.cardCount);
    if (queue.length < 1) return;
    // Párosító: a sor 5-ös táblákra bomlik (egy „kártya" = egy tábla)
    if (drillSettings.mode === 'match') {
      const uniq = [];
      queue.forEach(it => { if (!uniq.some(u => u.romaji === it.romaji)) uniq.push(it); });
      run.cards = [];
      for (let i = 0; i + 1 < uniq.length; i += MATCH_SIZE) run.cards.push({ board: uniq.slice(i, i + MATCH_SIZE) });
      if (!run.cards.length) return;
    } else {
      run.cards = queue.map(it => ({ item: it }));
    }
    run.cardIdx = 0; run.score = 0; run.streak = 0; run.bestStreak = 0; run.results = [];
    run.roundStartTs = Date.now();
    run.inLobby = false;
    NihonCoreRound.begin(function () {
      return { module: 'kana', mode: drillSettings.mode, results: run.results, score: run.score, startTs: run.roundStartTs };
    });

    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('kanaLobby').classList.add('hidden');
    document.getElementById('kanaChart').classList.add('hidden');
    document.getElementById('kanaRuntime').classList.remove('hidden');
    const sEl = document.getElementById('kanaSummary');
    sEl.classList.add('hidden'); sEl.innerHTML = '';
    renderCard();
  }

  function updateHeader() {
    const total = run.cards.length;
    const word = drillSettings.mode === 'match' ? 'Tábla' : 'Kártya';
    document.getElementById('kanaScore').textContent  = run.score;
    document.getElementById('kanaStreak').textContent = `${run.streak} 🔥`;
    document.getElementById('kanaCardCount').textContent = `${word} ${Math.min(run.cardIdx + 1, total)} / ${total}`;
    document.getElementById('kanaProgressFill').style.width = `${total ? (run.cardIdx / total) * 100 : 0}%`;
  }

  function renderCard() {
    run.submitted = false;
    updateHeader();
    const fb = document.getElementById('kanaFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('kanaActions').innerHTML = '';
    const card = run.cards[run.cardIdx];
    if (drillSettings.mode === 'match')        renderMatch(card);
    else if (drillSettings.mode === 'typing')  renderTyping(card);
    else                                       renderChoice(card);
  }

  function eyebrow(item) {
    return `<div class="cj-prompt-eyebrow">
              <span class="cj-pe-group">${SCRIPT_LABEL[item.script]}</span>
              <span class="cj-pe-dot">·</span><span lang="ja">${rowLabel(item)}</span>-sor
            </div>`;
  }

  // Felismerés (jel → olvasat) és Fordítva (olvasat → jel)
  function renderChoice(card) {
    const item = card.item;
    const reverse = drillSettings.mode === 'reverse';
    card.options = shuffle([item].concat(distractors(item, 3)));
    document.getElementById('kanaCard').innerHTML = `
      <div class="cj-prompt">
        ${eyebrow(item)}
        ${reverse
          ? `<div class="kana-prompt-ro">${item.romaji}</div>`
          : `<div class="kana-glyph" lang="ja">${item.kana}</div>`}
        <div class="kana-task">${reverse ? 'Melyik jel ez?' : 'Hogyan olvasod?'}</div>
      </div>
      <div class="cj-options kana-options ${reverse ? 'kana-options-jp' : ''}">
        ${card.options.map((o, i) => `
          <button class="cj-option" type="button" data-idx="${i}">
            ${reverse ? `<span class="cj-opt-jp kana-opt-jp" lang="ja">${o.kana}</span>`
                      : `<span class="kana-opt-ro">${o.romaji}</span>`}
          </button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;

    const buttons = document.querySelectorAll('#kanaCard .cj-option');
    const lock = () => document.querySelectorAll('#kanaCard .cj-option, #kanaCard .dont-know-btn').forEach(b => { b.disabled = true; });
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (run.submitted) return;
      const chosen = card.options[parseInt(btn.dataset.idx, 10)];
      const ok = chosen.id === item.id;
      lock();
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) buttons[card.options.indexOf(item)].classList.add('reveal-correct');
      finalize(item, ok, { chosen: chosen });
    }));
    document.querySelector('#kanaCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lock();
      buttons[card.options.indexOf(item)].classList.add('reveal-correct');
      finalize(item, false, { dontKnow: true });
    });
  }

  // Beírás (jel → romaji)
  function renderTyping(card) {
    const item = card.item;
    document.getElementById('kanaCard').innerHTML = `
      <div class="cj-prompt">
        ${eyebrow(item)}
        <div class="kana-glyph" lang="ja">${item.kana}</div>
        <div class="kana-task">Írd be az olvasatát latin betűkkel.</div>
      </div>
      <div class="cj-input-area">
        <input class="cj-input kana-input" id="kanaInput" type="text" inputmode="latin" autocomplete="off"
               autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="pl. ka" aria-label="Olvasat" />
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;
    document.getElementById('kanaActions').innerHTML =
      '<button class="btn btn-primary cj-submit" id="kanaSubmit" type="button" disabled>Ellenőrzés</button>';

    const input = document.getElementById('kanaInput');
    const submitBtn = document.getElementById('kanaSubmit');
    const lock = () => { input.disabled = true; submitBtn.disabled = true;
      const dk = document.querySelector('#kanaCard .dont-know-btn'); if (dk) dk.disabled = true; };
    const submit = () => {
      if (run.submitted || !norm(input.value)) return;
      const ok = romajiMatches(item, input.value);
      lock();
      input.classList.add(ok ? 'cnh-input-correct' : 'cnh-input-wrong');
      finalize(item, ok, { typed: input.value });
    };
    input.addEventListener('input', () => { submitBtn.disabled = !norm(input.value); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    submitBtn.addEventListener('click', submit);
    document.querySelector('#kanaCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lock();
      finalize(item, false, { dontKnow: true });
    });
    setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e) {} }, 60);
  }

  // Válasz lezárása: pont, sorozat, eredmény; jó válasznál magától lép tovább
  function finalize(item, ok, info) {
    run.submitted = true;
    if (ok) { run.score += 10; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); }
    else    { run.streak = 0; }
    run.results.push({ kanaId: item.id, script: item.script, rowId: item.rowId, correct: ok,
                       errorCode: ok ? null : (info.dontKnow ? 'dont_know' : 'wrong_reading') });
    document.getElementById('kanaScore').textContent  = run.score;
    document.getElementById('kanaStreak').textContent = `${run.streak} 🔥`;

    if (ok) {
      if (window.NihonCoreAudio && NihonCoreAudio.speakAnswer) NihonCoreAudio.speakAnswer(item.kana);
      run.advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS);
      return;
    }
    renderFeedback(item, info);
  }

  function renderFeedback(item, info) {
    const fb = document.getElementById('kanaFeedback');
    const isLast = run.cardIdx + 1 >= run.cards.length;
    let mistake = '';
    if (info.chosen) {
      // megmutatjuk, MI az, amit választott — ebből tanul a legtöbbet
      mistake = `<strong lang="ja">${info.chosen.kana}</strong> olvasata <strong>${info.chosen.romaji}</strong>, nem ${item.romaji}.`;
    } else if (info.typed) {
      const other = kanaForRomaji(item.script, info.typed);
      mistake = other
        ? `Amit beírtál (<strong>${norm(info.typed)}</strong>), az a <strong lang="ja">${other.kana}</strong> jel olvasata.`
        : `Ilyen olvasat nincs a táblában: <strong>${norm(info.typed)}</strong>.`;
    }
    fb.className = 'conj-feedback ' + (info.dontKnow ? 'pr-fb-dontknow' : 'pr-fb-wrong');
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${info.dontKnow ? '💡' : '🤔'}</span>
        <span class="pr-fb-title">${info.dontKnow ? 'Így olvasod' : 'Nézzük meg együtt'}</span>
      </div>
      <div class="pr-fb-explain">
        <div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text"><strong class="pfe-jp-ok kana-fb-jp" lang="ja">${item.kana}</strong> = <strong>${item.romaji}</strong></span>
        </div>
        ${mistake ? `<div class="pfe-row pfe-wrong"><span class="pfe-label">A te válaszod</span><span class="pfe-text">${mistake}</span></div>` : ''}
      </div>
      <button class="btn btn-primary cj-next" id="kanaNext" type="button">${isLast ? 'Eredmények' : 'Következő'}</button>`;
    document.getElementById('kanaNext').addEventListener('click', advance);
  }

  function advance() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    run.cardIdx++;
    if (run.cardIdx >= run.cards.length) showSummary();
    else renderCard();
    NihonCoreRound.scrollToRound();
  }

  /* ── F) Párosító ───────────────────────────────── */
  function renderMatch(card) {
    const left = shuffle(card.board), right = shuffle(card.board);
    run.match = { missed: new Set(), done: new Set(), pick: null };
    document.getElementById('kanaCard').innerHTML = `
      <div class="cj-prompt">
        <div class="kana-task">Párosítsd a jeleket az olvasatukkal.</div>
      </div>
      <div class="kana-match">
        <div class="kana-match-col">
          ${left.map(it => `<button class="kana-match-btn kana-match-jp" type="button" data-side="k" data-id="${it.id}" lang="ja">${it.kana}</button>`).join('')}
        </div>
        <div class="kana-match-col">
          ${right.map(it => `<button class="kana-match-btn" type="button" data-side="r" data-id="${it.id}">${it.romaji}</button>`).join('')}
        </div>
      </div>`;

    const btns = document.querySelectorAll('#kanaCard .kana-match-btn');
    btns.forEach(btn => btn.addEventListener('click', () => {
      const m = run.match;
      if (btn.disabled) return;
      if (!m.pick || m.pick.dataset.side === btn.dataset.side) {
        // első kiválasztás, vagy ugyanazon az oldalon másikra váltás
        if (m.pick) m.pick.classList.remove('selected');
        m.pick = (m.pick === btn) ? null : btn;
        if (m.pick) btn.classList.add('selected');
        return;
      }
      const a = m.pick, b = btn;
      a.classList.remove('selected'); m.pick = null;
      if (a.dataset.id === b.dataset.id) {
        [a, b].forEach(x => { x.classList.add('matched'); x.disabled = true; });
        m.done.add(a.dataset.id);
        if (m.done.size === card.board.length) finishMatch(card);
      } else {
        // a hibás párosítás a JEL oldalán számít (azt a jelet kell még tanulni)
        const kanaSide = a.dataset.side === 'k' ? a : b;
        m.missed.add(kanaSide.dataset.id);
        [a, b].forEach(x => { x.classList.add('mismatch'); setTimeout(() => x.classList.remove('mismatch'), 420); });
      }
    }));
  }

  function finishMatch(card) {
    const m = run.match;
    card.board.forEach(it => {
      const ok = !m.missed.has(it.id);
      if (ok) { run.score += 10; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); }
      else    { run.streak = 0; }
      run.results.push({ kanaId: it.id, script: it.script, rowId: it.rowId, correct: ok, errorCode: ok ? null : 'wrong_reading' });
    });
    document.getElementById('kanaScore').textContent  = run.score;
    document.getElementById('kanaStreak').textContent = `${run.streak} 🔥`;
    run.submitted = true;
    run.advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS + 150);
  }

  /* ── G) Összesítő ──────────────────────────────── */
  function showSummary() {
    NihonCoreStats.recordSession({
      module: 'kana', mode: drillSettings.mode,
      results: run.results, score: run.score, startTs: run.roundStartTs
    });
    const p = loadProfile();
    run.results.forEach(r => {
      const it = p.items[r.kanaId] = p.items[r.kanaId] || { n: 0, ok: 0 };
      it.n++; if (r.correct) it.ok++;
      p.totalAttempts++; if (r.correct) p.totalCorrect++;
    });
    p.bestStreak = Math.max(p.bestStreak || 0, run.bestStreak);
    saveProfile(p);

    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const missedIds = Array.from(new Set(run.results.filter(r => !r.correct).map(r => r.kanaId)));
    const lookup = id => ALL.hiragana.concat(ALL.katakana).find(x => x.id === id);
    const missedHtml = missedIds.length ? `
      <div class="kana-missed">
        <div class="cj-bd-title">Ezeket nézd át</div>
        <div class="kana-missed-list">
          ${missedIds.map(id => { const it = lookup(id); return it
            ? `<span class="kana-missed-chip"><span lang="ja">${it.kana}</span> ${it.romaji}</span>` : ''; }).join('')}
        </div>
      </div>` : '';

    document.getElementById('kanaCard').innerHTML = '';
    document.getElementById('kanaActions').innerHTML = '';
    const fb = document.getElementById('kanaFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('kanaProgressFill').style.width = '100%';

    const sEl = document.getElementById('kanaSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége: ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      ${missedHtml}
      <div class="kana-summary-actions">
        <button class="btn btn-primary" id="kanaAgain" type="button">Még egy kör</button>
        <button class="btn btn-outline" id="kanaBack" type="button">Vissza a táblához</button>
      </div>`;
    document.getElementById('kanaAgain').addEventListener('click', startRound);
    document.getElementById('kanaBack').addEventListener('click', backToLobby);
    if (pct === 100 && window.NihonCoreMotion && NihonCoreMotion.celebrate) {
      try { NihonCoreMotion.celebrate({ title: 'Hibátlan kör!', sub: `${total} / ${total}` }); } catch (e) {}
    }
  }

  function backToLobby() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    run.inLobby = true; run.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');   // → a kör-őr elmenti a részeredményt
    document.getElementById('kanaRuntime').classList.add('hidden');
    document.getElementById('kanaLobby').classList.remove('hidden');
    document.getElementById('kanaChart').classList.remove('hidden');
    renderStatsBar(); renderChart(); updateStartBtn();
  }

  /* ── H) Init ───────────────────────────────────── */
  document.getElementById('kanaExit').addEventListener('click', () => {
    if (run.inLobby) return;
    if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
      'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) return;
    backToLobby();
  });

  renderStatsBar();
  renderLobby();
  renderChart();

  window._kana = { ALL, buildQueue, distractors, romajiMatches, kanaForRomaji, mastery, drillSettings };
}


/* ====================================================
   9d. LESSON PAGE — a tanulási út magyarázó oldala (lesson.html)
   ----------------------------------------------------
   A lecke szövege a js/data/course.js-ben van (NIHONCORE_COURSE); az oldal
   a ?id=<lecke-id> paraméter szerint rajzolja ki:
     · fejléc: a lecke száma, címe, „a végére…" pontok
     · nyelvtani pontok: minta, magyarázat, meghallgatható példamondatok
     · „Ellenőrizd magad": rövid feleletválasztós kör a közös kör-keretben
   Az ellenőrző kör a statisztikába 'lesson' / 'check' néven kerül, és a
   tanulási út ezzel teljesíti a lecke lépését (legalább 60%).

   Japán szöveg: a {漢字|かな} jelölésből furigana lesz a képernyőn, a
   felolvasáshoz pedig a kana-olvasat megy.
   ==================================================== */
function initLessonPage() {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RB = /\{([^|{}]+)\|([^|{}]+)\}/g;
  const ruby = s => esc(s).replace(RB, '<ruby>$1<rt>$2</rt></ruby>');       // képernyőre
  const reading = s => String(s).replace(RB, '$2').replace(/[\s　＿…]/g, '');  // felolvasásra
  const rubyHtml = s => String(s).replace(RB, '<ruby>$1<rt>$2</rt></ruby>');   // HTML-es magyarázó szövegbe (body, tip)
  const hasJp = s => /[぀-ヿ一-鿿]/.test(s);
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const PLAY = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const STOP = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>';

  const course = (typeof NIHONCORE_COURSE !== 'undefined') ? NIHONCORE_COURSE : [];
  let id = null;
  try { id = new URLSearchParams(window.location.search).get('id'); } catch (e) {}
  // Ismétlő mód (lesson.html?review=1): nincs lecke, a kör a korábbi leckék esedékes kérdéseiből áll.
  let isReview = false;
  try { isReview = new URLSearchParams(window.location.search).get('review') === '1'; } catch (e) {}
  const lesson = isReview
    ? { id: 'review', review: true, no: '', badge: '復', kicker: 'Ismétlés', label: 'Ismétlés', title: 'Mai ismétlés',
        lead: 'A korábbi leckék kérdései térnek vissza, egyre ritkábban: amit tudsz, az 1, 3, 7, 14, majd 30 nap múlva jön újra; amit elrontasz, az rögtön.',
        cando: [], points: [], quiz: [], ownOnly: true }
    : course.find(l => l.id === id);
  if (isReview) document.documentElement.classList.remove('lesson-steps');

  // Ismétlés-ütemezés: a leckék saját kérdései a közös ütemezőbe (NihonCoreSRS) kerülnek.
  const SRS_PREFIX = 'lesson:';
  const srsOf = new Map();                                 // kérdés → { id, lesson }
  course.forEach(l => (l.quiz || []).forEach((q, qi) => srsOf.set(q, { id: SRS_PREFIX + l.id + ':' + qi, lesson: l })));
  // jó válasz csak akkor lépteti előre, ha a kérdés már esedékes volt (egy napon belüli újrázás nem „tanulás")
  function srsMark(q, ok) {
    const src = srsOf.get(q);
    if (!src || !window.NihonCoreSRS) return;
    const st = NihonCoreSRS.getItemState(src.id);
    if (ok && st && (st.nextDueTs || 0) > Date.now()) return;
    NihonCoreSRS.recordReview(src.id, ok ? 1 : 0);
  }
  const hero = document.getElementById('lessonHero');
  const content = document.getElementById('lessonContent');
  const runtime = document.getElementById('lessonRuntime');

  if (!lesson) {
    document.documentElement.classList.remove('lesson-steps');
    hero.classList.add('hidden');
    content.innerHTML = `
      <div class="stats-empty glass-panel">
        <p>Ez a lecke még nem készült el.</p>
        <p class="stats-empty-sub">Ilyen számú lecke nincs a tanulási úton.</p>
        <a href="../index.html#path" class="btn btn-primary">Vissza a tanulási útra</a>
      </div>`;
    return;
  }

  /* ── A) Fejléc ─────────────────────────────────── */
  // A könyv leckéi számot kapnak; az előkészítő és a kiegészítő leckék saját jelet (badge) és címkét (kicker, label).
  const lessonLabel = lesson.label || (lesson.no + '. lecke');
  document.title = lessonLabel + ': ' + lesson.title + ' — NihonCore';
  document.getElementById('lessonNo').textContent = lesson.badge || lesson.no;
  document.getElementById('lessonKicker').textContent = lesson.kicker || (lesson.book + ' · ' + lesson.no + '. lecke');
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonLead').textContent = lesson.lead;
  document.getElementById('lessonCando').innerHTML = lesson.cando.map(c => '<li>' + esc(c) + '</li>').join('');
  if (lesson.review) {
    const tag = document.querySelector('#lessonHero .badge-group');
    if (tag) tag.textContent = 'Időzített ismétlés';
  }
  if (window.NihonCoreRound && NihonCoreRound.refresh) NihonCoreRound.refresh();   // modul-név a fejlécbe

  /* ── A2) A lecke gyakorló lépései a tanulási útról ─ */
  //   A fejezet (NIHONCORE_PATH_UNITS) többi lépése: ezekbe vezet a lecke az
  //   ellenőrzés után, hogy az átvett anyagot rögtön gyakorolni lehessen.
  const Path = window.NihonCorePath;
  function practiceRows() {
    if (!Path || typeof NIHONCORE_PATH_UNITS === 'undefined') return [];
    const v = Path.view();
    const mine = v.rows.find(r => r.step.module === 'lesson' && new RegExp('[?&]id=' + lesson.id + '$').test(r.step.href));
    if (!mine) return [];
    const unit = NIHONCORE_PATH_UNITS.find(u => u.steps.indexOf(mine.step.id) >= 0);
    if (!unit) return [];
    // csak a gyakorló lépések: más modul köre, vagy ennek a leckének a saját hallás-lépése
    // (a fejezet többi magyarázó leckéje és azok hallás-lépései nem ide tartoznak)
    const isMine = st => new RegExp('[?&]id=' + lesson.id + '(&|$)').test(st.href);
    return unit.steps.filter(sid => sid !== mine.step.id)
      .map(sid => v.rows.find(r => r.step.id === sid))
      .filter(r => r && (r.step.module !== 'lesson' || (r.step.mode === 'listen' && isMine(r.step))));
  }
  function practiceHtml() {
    const rows = practiceRows();
    if (!rows.length) return '';
    return `
      <section class="lp-practice glass-panel" id="lpPractice">
        <h2 class="lp-check-title">Gyakorlás</h2>
        <p class="lp-check-sub">A lecke anyaga feladatokban. Sorban érdemes haladni, de bármelyik indítható.</p>
        <ul class="lp-practice-list">
          ${rows.map(r => `
            <li>
              <a class="path-step-link"${r.step.module === 'lesson' ? ' data-listen="1"' : ''} href="${Path.stepHref(r.step, false)}">
                <span class="path-glyph" lang="ja">${esc(r.step.glyph)}</span>
                <span class="path-step-body">
                  <span class="path-step-title">${esc(r.step.title)}</span>
                  <span class="path-step-desc">${esc(r.step.desc)}</span>
                </span>
                <span class="path-step-end">${r.done
                  ? '<span class="path-state path-state-done">' + (r.best !== null ? Math.round(r.best * 100) + '%' : 'Kész') + '</span>'
                  : '<span class="path-state path-state-next">Indítás</span>'}</span>
              </a>
            </li>`).join('')}
        </ul>
      </section>`;
  }

  /* ── B) Nyelvtani pontok ───────────────────────── */
  // Kanás lecke (1–4.: nincs kanji, így furigana sincs): a magyarázatok, táblák, minták, „gyakori hibák"
  // és kérdések kana-darabjai fölé romaji kerül. A példáknak, a párbeszédnek és a szavaknak saját
  // romaji-soruk van, azokhoz nem nyúl. A fejléc Romaji kapcsolója ezt is elrejti.
  const isKanaLesson = l => !!(l && l.points && l.points.length &&
    !l.points.some(p => p.examples.some(e => /\{[^|{}]+\|/.test(e.jp))));
  function glossRomaji(rootEl, forLesson) {
    if (!rootEl || !window.NihonCoreKana || !isKanaLesson(forLesson || lesson)) return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!/[ぁ-ゖァ-ヺ]/.test(node.nodeValue)) continue;
      if (node.parentElement.closest('ruby, rt, .lp-ex-jp, .lp-ex-romaji, .lp-word, script, style')) continue;
      nodes.push(node);
    }
    const RUN = /[ぁ-ゖァ-ヺー]+/g;
    nodes.forEach(node => {
      const text = node.nodeValue, frag = document.createDocumentFragment();
      let last = 0, m;
      RUN.lastIndex = 0;
      while ((m = RUN.exec(text))) {
        const ro = /[ぁ-ゖァ-ヺ]/.test(m[0]) ? NihonCoreKana.toRomaji(m[0]) : '';
        if (!ro) continue;
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const rb = document.createElement('ruby');
        rb.className = 'lp-rj';
        rb.appendChild(document.createTextNode(m[0]));
        const rt = document.createElement('rt');
        rt.className = 'lp-rj-romaji';
        rt.textContent = ro;
        rb.appendChild(rt);
        frag.appendChild(rb);
        last = m.index + m[0].length;
      }
      if (!last) return;
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  // a kör kártyájának leckéje (ismétlésnél a kérdés saját leckéje)
  const cardLesson = q => (lesson.review && srsOf.get(q)) ? srsOf.get(q).lesson : lesson;

  function renderLesson() {
    // meghallgatható sor (példa, párbeszéd, kifejezés): a hang a data-say-ből megy
    const sayRow = (e, extra) => `
            <li class="lp-ex${extra && extra.who ? ' lp-ex-line' : ''}">
              <button class="lp-ex-play" type="button" data-say="${esc(reading(e.jp))}" aria-label="Meghallgatom">${PLAY}</button>
              <div class="lp-ex-text">
                ${extra && extra.who ? `<div class="lp-ex-who">${esc(extra.who)}</div>` : ''}
                <div class="lp-ex-jp" lang="ja">${ruby(e.jp)}</div>
                <div class="lp-ex-romaji">${esc(e.romaji)}</div>
                <div class="lp-ex-hu">${esc(e.hu)}</div>
                ${e.note ? `<div class="lp-ex-note">${rubyHtml(e.note)}</div>` : ''}
              </div>
            </li>`;
    const tableHtml = t => `
        <figure class="lp-table-fig">
          ${t.caption ? `<figcaption class="lp-table-cap">${rubyHtml(t.caption)}</figcaption>` : ''}
          <div class="lp-table-wrap"><table class="lp-table">
            ${t.head ? `<thead><tr>${t.head.map(h => `<th>${rubyHtml(h)}</th>`).join('')}</tr></thead>` : ''}
            <tbody>${t.rows.map(r => `<tr>${r.map((c, k) => k === 0 ? `<th scope="row">${rubyHtml(c)}</th>` : `<td>${rubyHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </figure>`;

    // Egy pont két lap: előbb a szabály (minta, magyarázat, táblák, jó tudni),
    // utána a példák (példamondatok, gyakori hibák) — így egy lap egy-másfél képernyő.
    const points = lesson.points.map((p, i) => `
      <section class="lp-point glass-panel" id="p${i + 1}">
        <div class="lp-point-head">
          <span class="lp-point-no">${i + 1}</span>
          <h2 class="lp-point-title" lang="ja">${ruby(p.title)}</h2>
          <span class="lp-point-sub">${ruby(p.sub)}</span>
        </div>
        <div class="lp-pattern" lang="ja">${ruby(p.pattern)}</div>
        <p class="lp-body">${rubyHtml(p.body)}</p>
        ${(p.more || []).map(m => `<p class="lp-body lp-more">${rubyHtml(m)}</p>`).join('')}
        ${(p.tables || []).map(tableHtml).join('')}
        ${p.notes && p.notes.length ? `
          <div class="lp-notes">
            <div class="lp-block-title">Jó tudni</div>
            <ul>${p.notes.map(n => `<li>${rubyHtml(n)}</li>`).join('')}</ul>
          </div>` : ''}
      </section>
      <section class="lp-point lp-point-ex glass-panel" id="p${i + 1}x">
        <div class="lp-point-head">
          <span class="lp-point-no">${i + 1}</span>
          <h2 class="lp-point-title">Példák</h2>
          <span class="lp-point-sub" lang="ja">${ruby(p.title)}</span>
        </div>
        <div class="lp-pattern" lang="ja">${ruby(p.pattern)}</div>
        <ul class="lp-examples">
          ${p.examples.map(e => sayRow(e)).join('')}
        </ul>
        ${p.mistakes && p.mistakes.length ? `
          <div class="lp-mistakes">
            <div class="lp-block-title">Gyakori hiba</div>
            ${p.mistakes.map(m => `
              <div class="lp-mistake">
                <div class="lp-mis-bad" lang="ja"><span class="lp-mis-mark" aria-label="Hibás">✕</span><span>${ruby(m.bad)}</span></div>
                <div class="lp-mis-good" lang="ja"><span class="lp-mis-mark" aria-label="Helyes">✓</span><span>${ruby(m.good)}</span></div>
                <div class="lp-mis-why">${rubyHtml(m.why)}</div>
              </div>`).join('')}
          </div>` : ''}
        ${p.tip ? `<div class="lp-tip"><strong>Figyelj:</strong> ${rubyHtml(p.tip)}</div>` : ''}
      </section>
      <section class="lp-quick glass-panel-heavy" id="q${i + 1}" data-point="${i}"></section>`).join('');

    // A lecke elején: miről szól, és egy rövid párbeszéd, amelyben a lecke nyelvtana élőben látszik
    const introHtml = lesson.intro && lesson.intro.length ? `
      <section class="lp-intro glass-panel" id="lpIntro">
        <h2 class="lp-sec-title">Miről szól ez a lecke?</h2>
        ${lesson.intro.map(t => `<p class="lp-body">${rubyHtml(t)}</p>`).join('')}
      </section>` : '';
    const dlg = lesson.dialogue;
    const dialogueHtml = dlg ? `
      <section class="lp-dialogue glass-panel" id="lpDialogue">
        <h2 class="lp-sec-title">Párbeszéd<span class="lp-sec-sub">${esc(dlg.title || '')}</span></h2>
        ${dlg.scene ? `<p class="lp-body lp-scene">${rubyHtml(dlg.scene)}</p>` : ''}
        <div class="lp-dlg-tools">
          <button class="btn btn-outline lp-dlg-play" id="lpDlgPlay" type="button" aria-pressed="false">
            <span class="lp-dlg-ico" aria-hidden="true">${PLAY}</span><span class="lp-dlg-play-text">Lejátszás végig</span>
          </button>
          <button class="lp-dlg-toggle" id="lpDlgJp" type="button" aria-pressed="false">
            <span class="lp-dlg-dot" aria-hidden="true"></span>Csak japánul
          </button>
        </div>
        <p class="lp-dlg-hint" id="lpDlgHint" aria-live="polite">Koppints egy sorra, ha kell az átírás és a fordítás.</p>
        <ul class="lp-examples" id="lpDlgLines">${dlg.lines.map(l => sayRow(l, { who: l.who })).join('')}</ul>
      </section>
      ${dlg.notes && dlg.notes.length ? `
      <section class="lp-dialogue lp-dialogue-notes glass-panel" id="lpDialogueNotes">
        <h2 class="lp-sec-title">A párbeszédből<span class="lp-sec-sub">amit érdemes megjegyezni</span></h2>
        <div class="lp-notes lp-notes-plain">
          <ul>${dlg.notes.map(n => `<li>${rubyHtml(n)}</li>`).join('')}</ul>
        </div>
      </section>` : ''}` : '';

    // A lecke végén: kifejezések, szavak, kulturális tudnivalók, összefoglaló
    const phrasesHtml = lesson.phrases && lesson.phrases.length ? `
      <section class="lp-phrases glass-panel" id="lpPhrases">
        <h2 class="lp-sec-title">Hasznos kifejezések</h2>
        <p class="lp-body lp-scene">Kész fordulatok: ezeket egyben érdemes megtanulni, ahogy vannak.</p>
        <ul class="lp-examples">${lesson.phrases.map(e => sayRow(e)).join('')}</ul>
      </section>` : '';
    const wordsHtml = lesson.words && lesson.words.length ? `
      <section class="lp-words glass-panel" id="lpWords">
        <h2 class="lp-sec-title">Szavak a leckéhez</h2>
        <p class="lp-body lp-scene">Koppints egy szóra, és meghallgatod.</p>
        ${lesson.words.map(g => `
          <div class="lp-word-group">
            <h3 class="lp-word-title">${ruby(g.title)}</h3>
            ${g.note ? `<p class="lp-word-note">${rubyHtml(g.note)}</p>` : ''}
            <div class="lp-word-grid">
              ${g.items.map(w => `
                <button class="lp-word" type="button" data-say="${esc(reading(w.say || w.jp))}">
                  <span class="lp-word-jp" lang="ja">${ruby(w.jp)}</span>
                  <span class="lp-word-romaji lp-ex-romaji">${esc(w.romaji)}</span>
                  <span class="lp-word-hu lp-ex-hu">${esc(w.hu)}</span>
                </button>`).join('')}
            </div>
          </div>`).join('')}
      </section>` : '';
    const cultureHtml = lesson.culture && lesson.culture.length ? `
      <section class="lp-culture glass-panel" id="lpCulture">
        <h2 class="lp-sec-title">Jó tudni Japánról</h2>
        ${lesson.culture.map(c => `
          <div class="lp-culture-item">
            <h3 class="lp-word-title">${ruby(c.title)}</h3>
            <p class="lp-body">${rubyHtml(c.text)}</p>
          </div>`).join('')}
      </section>` : '';
    const glanceHtml = (lesson.intro || lesson.dialogue) ? `
      <section class="lp-glance glass-panel" id="lpGlance">
        <h2 class="lp-sec-title">A lecke egy pillantásra</h2>
        <ul class="lp-glance-list">
          ${lesson.points.map((p, i) => `
            <li><a href="#p${i + 1}" class="lp-glance-row lp-toc-link-plain">
              <span class="lp-glance-pattern" lang="ja">${ruby(p.pattern)}</span>
              <span class="lp-glance-sub">${ruby(p.sub)}</span>
            </a></li>`).join('')}
        </ul>
      </section>` : '';

    content.innerHTML = `
      ${introHtml}
      ${dialogueHtml}
      ${points}
      ${phrasesHtml}
      ${wordsHtml}
      ${cultureHtml}
      ${glanceHtml}
      <section class="lp-check glass-panel-heavy" id="lpCheck">
        <h2 class="lp-check-title">Ellenőrizd magad</h2>
        <p class="lp-check-sub">${ROUND} kérdés a leckéből: szabályok és a példamondatok fordítása. Minden kör más; a lépéshez 60% kell.</p>
        <div class="lp-check-actions">
          <button class="btn btn-primary btn-lg" id="lqStart" type="button">${canListen ? 'Ellenőrző kör' : 'Kezdjük'}</button>
          ${canListen ? '<button class="btn btn-outline btn-lg" id="lqListen" type="button">Hallás utáni kör</button>' : ''}
        </div>
        ${canListen ? '<p class="lp-check-hint">A hallás utáni körben a lecke példamondatait hallod, és ki kell választanod, mit jelentenek.</p>' : ''}
      </section>
      ${practiceHtml()}`;

    content.querySelectorAll('[data-say]').forEach(btn => btn.addEventListener('click', () => {
      if (!window.NihonCoreAudio) return;
      stopDialogue();                                      // egy sor meghallgatása leállítja a végigjátszást
      content.querySelectorAll('.is-playing').forEach(b => b.classList.remove('is-playing'));
      btn.classList.add('is-playing');
      const done = () => btn.classList.remove('is-playing');
      setTimeout(done, 4000);
      try { NihonCoreAudio.play(btn.dataset.say, { speed: 0.9, onError: done }); } catch (err) { done(); }
    }));
    // széles tábla: jelzés, hogy oldalra húzható
    content.querySelectorAll('.lp-table-wrap').forEach(w => {
      if (w.scrollWidth > w.clientWidth + 4) w.parentNode.classList.add('is-wide');
    });
    initDialogue();
    initSteps();
    // az összefoglaló sorai a megfelelő pont lapjára visznek
    content.querySelectorAll('.lp-glance-row').forEach(a => a.addEventListener('click', ev => {
      ev.preventDefault();
      const i = steps.laps.findIndex(l => l.kind === 'lap' && l.els[0].id === a.getAttribute('href').slice(1));
      if (i >= 0) showLap(i);
    }));
    document.getElementById('lqStart').addEventListener('click', () => startQuiz('check'));
    if (!canListen) return;
    document.getElementById('lqListen').addEventListener('click', () => startQuiz('listen'));
    // a „Gyakorlás" lista hallás-sora helyben indítja a kört
    content.querySelectorAll('.path-step-link[data-listen]').forEach(a => a.addEventListener('click', ev => {
      ev.preventDefault();
      startQuiz('listen');
    }));
    // A tanulási út hallás-lépése (…&round=listen): a hallás utáni kör a fő gomb, és odagörgetünk
    let wantListen = false;
    try { wantListen = new URLSearchParams(window.location.search).get('round') === 'listen'; } catch (e) {}
    if (wantListen) {
      const a = document.getElementById('lqStart'), b = document.getElementById('lqListen');
      a.classList.replace('btn-primary', 'btn-outline'); b.classList.replace('btn-outline', 'btn-primary');
      b.parentNode.insertBefore(b, a);
    }
  }

  /* ── B1) Párbeszéd: lejátszás végig, „csak japánul" ─ */
  //   A sorok egymás után szólalnak meg: a hang végén lép tovább, és ha a hang
  //   vége nem jelez, időre. „Csak japánul": az átírás és a fordítás rejtve,
  //   egy sorra koppintva az a sor megmutatja.
  const DLG_JP_KEY = 'nihoncore_dlg_jponly';               // eszköz-helyi beállítás
  const dlgRun = { token: 0, playing: false, timer: 0 };
  function dlgButton(on) {
    const btn = document.getElementById('lpDlgPlay');
    if (!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('is-on', on);
    btn.querySelector('.lp-dlg-play-text').textContent = on ? 'Leállítás' : 'Lejátszás végig';
    btn.querySelector('.lp-dlg-ico').innerHTML = on ? STOP : PLAY;
  }
  function stopDialogue() {
    const was = dlgRun.playing;
    dlgRun.token++; dlgRun.playing = false;
    clearTimeout(dlgRun.timer);
    if (!was) return;
    dlgButton(false);
    content.querySelectorAll('#lpDlgLines .is-current').forEach(li => li.classList.remove('is-current'));
    content.querySelectorAll('#lpDlgLines .is-playing').forEach(b => b.classList.remove('is-playing'));
  }
  function playDialogue() {
    const lines = Array.prototype.slice.call(content.querySelectorAll('#lpDlgLines .lp-ex'));
    if (!lines.length || !window.NihonCoreAudio) return;
    stopDialogue();
    const my = ++dlgRun.token;
    dlgRun.playing = true;
    dlgButton(true);
    const hint = document.getElementById('lpDlgHint');
    if (hint) { hint.textContent = 'Koppints egy sorra, ha kell az átírás és a fordítás.'; hint.classList.remove('is-alert'); }
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let silent = 0;                                        // egymás utáni néma sorok
    const step = k => {
      if (my !== dlgRun.token) return;
      lines.forEach(li => li.classList.remove('is-current'));
      if (k >= lines.length) { stopDialogue(); return; }
      const li = lines[k], b = li.querySelector('.lp-ex-play');
      li.classList.add('is-current');
      b.classList.add('is-playing');
      // a sor maradjon a lépés-sáv és az alsó gombsor között
      const r = li.getBoundingClientRect();
      if (r.top < 84 || r.bottom > window.innerHeight - 110) li.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
      let moved = false;
      const next = (wait, failed) => {
        if (moved || my !== dlgRun.token) return;
        moved = true;
        clearTimeout(dlgRun.timer);
        b.classList.remove('is-playing');
        silent = failed ? silent + 1 : 0;
        if (silent >= 2) {                                 // nincs hang: nem pörgetjük végig némán
          stopDialogue();
          if (hint) { hint.textContent = 'A hang most nem érhető el. A sorokat így is elolvashatod.'; hint.classList.add('is-alert'); }
          return;
        }
        dlgRun.timer = setTimeout(() => step(k + 1), wait);
      };
      const text = b.dataset.say;
      dlgRun.timer = setTimeout(() => next(0, false), 2600 + text.length * 320);   // ha a hang vége nem jelez
      try { NihonCoreAudio.play(text, { speed: 0.9, onEnd: () => next(450, false), onError: () => next(700, true) }); }
      catch (err) { next(700, true); }
    };
    step(0);
  }
  function initDialogue() {
    const sec = document.getElementById('lpDialogue');
    const jpBtn = document.getElementById('lpDlgJp'), playBtn = document.getElementById('lpDlgPlay');
    if (!sec || !jpBtn || !playBtn) return;
    const setJp = on => {
      sec.classList.toggle('is-jp-only', on);
      jpBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (!on) sec.querySelectorAll('.is-peek').forEach(li => li.classList.remove('is-peek'));
    };
    let on = false;
    try { on = localStorage.getItem(DLG_JP_KEY) === '1'; } catch (e) {}
    setJp(on);
    jpBtn.addEventListener('click', () => {
      const v = !sec.classList.contains('is-jp-only');
      setJp(v);
      try { localStorage.setItem(DLG_JP_KEY, v ? '1' : '0'); } catch (e) {}
    });
    sec.querySelectorAll('#lpDlgLines .lp-ex-text').forEach(t => t.addEventListener('click', () => {
      if (sec.classList.contains('is-jp-only')) t.parentNode.classList.toggle('is-peek');
    }));
    playBtn.addEventListener('click', () => {
      if (dlgRun.playing) { stopDialogue(); NihonCoreAudio.stop(); } else playDialogue();
    });
  }

  /* ── B2) Lépések: a lecke lapokra bontva ──────── */
  //   Egy rész = egy lap; egy nyelvtani pont két lap (szabály, aztán példák),
  //   utána egy gyors kérdés áll.
  //   Fent a lépés-sáv (✕ · folyamatosan töltődő csík · Tartalom), lent a gombsor
  //   (menü · Vissza · Következő). A menü-gomb hozza elő a fül-sávot.
  //   A stílusa: style.css LECKE-OLDAL blokk, „Lépések" rész.
  const POS_KEY = 'nihoncore_lesson_pos_v1';              // eszköz-helyi: leckénként az utolsó lap
  const root = document.documentElement;
  const steps = { laps: [], cur: 0, mains: 0 };
  const quickDone = {};                                    // pont → megválaszolta-e (erre a megnyitásra)
  const plainText = s => String(s || '').replace(RB, '$1').replace(/<[^>]+>/g, '');
  let wantListenLap = false;                               // a tanulási út hallás-lépése (…&round=listen)

  // A gyors kérdés: a lecke saját kérdései közül az, amelyik a ponthoz tartozik
  // (a japán szöveg egyezése alapján); ha nincs ilyen, a pont egyik példamondatából készül.
  let quickMap = null;
  let quickTagged = false;                                 // a lecke kérdései meg vannak-e jelölve (point mező)
  function buildQuickMap() {
    // A kérdés `point` mezője megmondja, melyik nyelvtani ponthoz tartozik (sorszám 1-től; ha nincs,
    // a kérdés egyik ponthoz sem kötődik — pl. köszönés, kultúra). Jelöletlen leckénél a
    // szövegegyezés dönt (lent).
    quickTagged = lesson.quiz.some(q => typeof q.point === 'number');
    if (quickTagged) {
      const tagged = lesson.points.map(() => []);
      lesson.quiz.forEach(q => { if (tagged[q.point - 1]) tagged[q.point - 1].push({ q: q, score: 9 }); });
      return tagged;
    }
    const JP = /[぀-ヿ一-鿿]+/g;
    const jpRuns = s => (plainText(s).match(JP) || []);
    const pointJp = lesson.points.map(p => {
      const parts = [p.title, p.pattern, p.body, p.tip].concat(p.more || [], p.notes || []);
      p.examples.forEach(e => parts.push(e.jp));
      (p.mistakes || []).forEach(m => parts.push(m.good, m.bad));
      (p.tables || []).forEach(t => t.rows.forEach(r => r.forEach(c => parts.push(c))));
      return jpRuns(parts.join(' ')).join(' ');
    });
    const pointWords = lesson.points.map(p => plainText([p.title, p.sub, p.pattern, p.body].concat(p.more || [],
      p.examples.map(e => e.romaji + ' ' + e.hu), (p.tables || []).map(t => t.rows.map(r => r.join(' ')).join(' '))).join(' ')).toLowerCase());
    // a leghosszabb közös japán szövegdarab hossza
    const common = (runs, text) => {
      let best = 0;
      runs.forEach(r => {
        for (let len = Math.min(r.length, 24); len > best && len >= 2; len--) {
          for (let i = 0; i + len <= r.length; i++) {
            if (text.indexOf(r.substr(i, len)) >= 0) { best = len; break; }
          }
        }
      });
      return best;
    };
    const map = lesson.points.map(() => []);
    lesson.quiz.forEach(q => {
      const filled = q.jp ? plainText(q.jp).replace(/＿/g, plainText(q.a)) : '';
      const runs = jpRuns([filled, q.a, q.q].join(' '));
      let bestP = -1, bestS = 0;
      lesson.points.forEach((p, pi) => {
        let s = common(runs, pointJp[pi]);
        if (s < 3 && lesson.ownOnly) {                    // az előkészítő leckénél a szavak egyezése dönt
          const words = plainText(q.q + ' ' + q.a).toLowerCase().match(/[a-záéíóöőúüűāīūēō]{4,}/g) || [];
          s = words.filter(w => pointWords[pi].indexOf(w) >= 0).length >= 2 ? 3 : 0;
        }
        if (s > bestS) { bestS = s; bestP = pi; }
      });
      if (bestP >= 0 && bestS >= 3) map[bestP].push({ q: q, score: bestS });
    });
    map.forEach(list => list.sort((a, b) => b.score - a.score));
    return map;
  }
  function quickFor(pi) {
    if (!quickMap) quickMap = buildQuickMap();
    const list = quickMap[pi];
    if (list.length) {
      // jelölt leckénél a pont bármelyik kérdése jöhet; becslésnél csak a legjobban illő három
      const top = quickTagged ? list : list.filter(x => x.score >= Math.max(3, list[0].score * 0.6)).slice(0, 3);
      return top[Math.floor(Math.random() * top.length)].q;
    }
    if (lesson.ownOnly) return null;
    const mine = shuffle(allExamples.filter(x => x.point === pi));
    for (let k = 0; k < mine.length; k++) {
      const wrong = pickOthers(mine[k], 'hu');
      if (wrong.length === 3) return { q: 'Mit jelent ez a mondat?', jp: mine[k].ex.jp, a: mine[k].ex.hu, wrong: wrong, why: 'Így olvasod: ' + mine[k].ex.romaji };
    }
    return null;
  }
  function hasQuick(pi) {
    if (lesson.ownOnly) { if (!quickMap) quickMap = buildQuickMap(); return quickMap[pi].length > 0; }
    return lesson.points[pi].examples.length > 0 && allExamples.length >= 4;
  }
  function renderQuick(pi) {
    const sec = document.getElementById('q' + (pi + 1));
    if (!sec || sec.dataset.ready) return;
    const q = quickFor(pi);
    if (!q) { quickDone[pi] = true; sec.innerHTML = '<p class="lp-body">Ehhez a ponthoz most nincs kérdés: mehetsz tovább.</p>'; sec.dataset.ready = '1'; return; }
    const options = shuffle([q.a].concat(q.wrong));
    const long = options.some(o => reading(o).length > 9);
    sec.dataset.ready = '1';
    sec.innerHTML = `
      <div class="lp-quick-eyebrow">Gyors kérdés<span class="cj-pe-dot">·</span><span lang="ja">${ruby(lesson.points[pi].title)}</span></div>
      <div class="lq-question">${ruby(q.q)}</div>
      ${q.jp ? `<div class="lq-jp" lang="ja">${ruby(q.jp)}</div>` : ''}
      <div class="cj-options lq-options${long ? ' lq-options-long' : ''}">
        ${options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}">${optHtml(o)}</button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>
      <div class="lp-quick-fb hidden" aria-live="polite"></div>`;
    glossRomaji(sec);
    const buttons = sec.querySelectorAll('.cj-option');
    const right = options.indexOf(q.a);
    const done = (ok, dontKnow) => {
      srsMark(q, ok);
      if (!quickLog.length) quickStart = Date.now();
      quickLog.push({ q: (srsOf.get(q) || {}).id || lesson.id + ':quick', correct: ok, errorCode: ok ? null : (dontKnow ? 'dont_know' : 'wrong_choice') });
      sec.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => { b.disabled = true; });
      if (!ok) buttons[right].classList.add('reveal-correct');
      const fb = sec.querySelector('.lp-quick-fb');
      fb.className = 'lp-quick-fb ' + (ok ? 'is-ok' : dontKnow ? 'is-reveal' : 'is-miss');
      fb.innerHTML = `<div class="lp-quick-fb-title">${ok ? 'Így van' : dontKnow ? 'Ez a helyes válasz' : 'Nézzük meg együtt'}</div>
        <div class="lp-quick-fb-why">${ruby(q.why)}</div>`;
      glossRomaji(fb);
      quickDone[pi] = true;
      updateStepBar();
      const next = document.getElementById('lsNext');
      if (next) try { next.focus({ preventScroll: true }); } catch (e) {}
    };
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (quickDone[pi]) return;
      const ok = options[parseInt(btn.dataset.idx, 10)] === q.a;
      btn.classList.add(ok ? 'correct' : 'wrong');
      done(ok, false);
    }));
    sec.querySelector('.dont-know-btn').addEventListener('click', () => { if (!quickDone[pi]) done(false, true); });
  }

  // A gyors kérdések válaszai egy rövid körként mennek a statisztikába, így a napi cél
  // a lecke olvasását is számolja. Mentés: kör indításakor és az oldal elhagyásakor.
  const quickLog = [];
  let quickStart = 0;
  function flushQuick() {
    if (!quickLog.length) return;
    const results = quickLog.splice(0, quickLog.length);
    NihonCoreStats.recordSession({ module: 'lesson', mode: 'quick', results: results,
      score: results.filter(r => r.correct).length * 10,
      startTs: Math.max(quickStart, Date.now() - results.length * 90000),   // kérdésenként legfeljebb másfél perc számít
      skipPath: true });
  }
  window.addEventListener('pagehide', flushQuick);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushQuick(); });

  function closeLayers() {
    root.classList.remove('ls-sheet-open', 'ls-nav-open');
    const a = document.getElementById('lsTocBtn'), b = document.getElementById('lsNavBtn');
    if (a) a.setAttribute('aria-expanded', 'false');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  function updateStepBar() {
    const lap = steps.laps[steps.cur];
    if (!lap) return;
    const last = steps.cur === steps.laps.length - 1;
    const pct = Math.round(((steps.cur + 1) / steps.laps.length) * 100);
    const fill = document.getElementById('lsFill'), track = document.getElementById('lsTrack');
    if (fill) fill.style.width = pct + '%';
    if (track) track.setAttribute('aria-valuenow', String(pct));
    document.getElementById('lsCount').textContent = lap.no + ' / ' + steps.mains;
    document.getElementById('lsName').innerHTML = lap.kind === 'quick' ? 'Gyors kérdés' : lap.nameHtml;
    const back = document.getElementById('lsBack'), next = document.getElementById('lsNext');
    back.classList.toggle('hidden', steps.cur === 0);
    next.textContent = steps.cur === 0 ? 'Kezdjük' : last ? (wantListenLap ? 'Hallás utáni kör' : 'Ellenőrző kör') : 'Következő';
    next.disabled = lap.kind === 'quick' && !quickDone[lap.point];
    document.querySelectorAll('#lsList .ls-item').forEach(b => {
      const i = parseInt(b.dataset.lap, 10);
      const here = steps.laps[steps.cur].no === steps.laps[i].no;
      b.classList.toggle('is-here', here);
      b.classList.toggle('is-seen', !here && i < steps.cur);
      if (here) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }

  function showLap(i, quiet) {
    i = Math.max(0, Math.min(steps.laps.length - 1, i));
    stopDialogue();
    if (window.NihonCoreAudio) try { NihonCoreAudio.stop(); } catch (e) {}
    closeLayers();
    steps.cur = i;
    const lap = steps.laps[i];
    steps.laps.forEach(l => l.els.forEach(el => { el.classList.add('ls-off'); el.classList.remove('ls-in'); }));
    if (lap.kind === 'quick') renderQuick(lap.point);
    lap.els.forEach(el => { el.classList.remove('ls-off'); if (!quiet) el.classList.add('ls-in'); });
    updateStepBar();
    try {
      const pos = JSON.parse(localStorage.getItem(POS_KEY) || '{}');
      pos[lesson.id] = i;
      localStorage.setItem(POS_KEY, JSON.stringify(pos));
    } catch (e) {}
    window.scrollTo(0, 0);
    // széles tábla: a jelzés csak látható lapon mérhető
    lap.els.forEach(el => el.querySelectorAll('.lp-table-wrap').forEach(w => {
      if (w.scrollWidth > w.clientWidth + 4) w.parentNode.classList.add('is-wide');
    }));
  }
  function nextLap() {
    const lap = steps.laps[steps.cur];
    if (lap.kind === 'quick' && !quickDone[lap.point]) return;
    if (steps.cur >= steps.laps.length - 1) { startQuiz(wantListenLap ? 'listen' : 'check'); return; }
    showLap(steps.cur + 1);
  }

  function initSteps() {
    try { wantListenLap = canListen && new URLSearchParams(window.location.search).get('round') === 'listen'; } catch (e) {}
    const sec = sel => content.querySelector(sel);
    const laps = [];
    let no = 0;
    const add = (els, nameHtml, sub, glyph, extra) => {
      els = els.filter(Boolean);
      if (!els.length) return;
      no++;
      laps.push(Object.assign({ kind: 'lap', no: no, els: els, nameHtml: nameHtml, sub: sub, glyph: glyph }, extra || {}));
    };
    add([hero, sec('#lpIntro')], 'Áttekintés', 'miről szól a lecke', String(lesson.badge || lesson.no));
    add([sec('#lpDialogue')], 'Párbeszéd', lesson.dialogue ? esc(lesson.dialogue.title || '') : '', '話');
    // a párbeszéd megjegyzései külön lapon (a Tartalom-lapon a párbeszédhez tartoznak)
    const dlgNotes = sec('#lpDialogueNotes');
    if (dlgNotes) laps.push({ kind: 'part', no: no, els: [dlgNotes], nameHtml: 'Párbeszéd<span class="ls-name-of">megjegyzések</span>' });
    lesson.points.forEach((p, pi) => {
      add([sec('#p' + (pi + 1))], '<span lang="ja">' + ruby(p.title) + '</span>', ruby(p.sub), String(pi + 1), { point: pi });
      // a pont második lapja: a példák (a Tartalom-lapon a ponthoz tartozik, nem külön sor)
      const ex = sec('#p' + (pi + 1) + 'x');
      if (ex) laps.push({ kind: 'part', no: no, els: [ex], point: pi, nameHtml: 'Példák<span class="ls-name-of" lang="ja">' + ruby(p.title) + '</span>' });
      const q = sec('#q' + (pi + 1));
      if (q && hasQuick(pi)) laps.push({ kind: 'quick', no: no, els: [q], point: pi });
      else if (q) q.classList.add('ls-off');
    });
    add([sec('#lpPhrases')], 'Hasznos kifejezések', (lesson.phrases || []).length + ' fordulat', '句');
    add([sec('#lpWords')], 'Szavak a leckéhez', (lesson.words || []).reduce((n, g) => n + g.items.length, 0) + ' szó', '語');
    add([sec('#lpCulture')], 'Jó tudni Japánról', (lesson.culture || []).length + ' tudnivaló', '文');
    add([sec('#lpGlance')], 'A lecke egy pillantásra', 'összefoglaló', '要');
    add([sec('#lpCheck'), sec('#lpPractice')], 'Ellenőrzés és gyakorlás', ROUND + ' kérdés, aztán feladatok', '✓');
    steps.laps = laps;
    steps.mains = no;

    // Tartalom-lap: a fő lapok listája (a gyors kérdések a pontjukhoz tartoznak)
    const list = document.getElementById('lsList');
    list.innerHTML = laps.map((l, i) => l.kind !== 'lap' ? '' : `
      <li><button class="ls-item" type="button" data-lap="${i}">
        <span class="ls-item-glyph" lang="ja" aria-hidden="true">${esc(l.glyph)}</span>
        <span class="ls-item-text"><span class="ls-item-name">${l.nameHtml}</span>${l.sub ? `<span class="ls-item-sub">${l.sub}</span>` : ''}</span>
      </button></li>`).join('');
    if (list.dataset.bound) { showLap(Math.min(steps.cur, laps.length - 1), true); return; }
    list.dataset.bound = '1';
    list.addEventListener('click', e => {
      const b = e.target.closest('.ls-item');
      if (b) showLap(parseInt(b.dataset.lap, 10));
    });
    // a segítők (romaji / magyar / hang) a Tartalom-lap aljára kerülnek
    const foot = document.getElementById('lsSheetFoot'), helpers = document.getElementById('helpersBar');
    if (foot && helpers) foot.insertBefore(helpers, foot.firstChild);
    document.getElementById('lsTheme').addEventListener('click', () => { if (window.NihonCoreTheme) NihonCoreTheme.toggle(); });

    document.getElementById('lsNext').addEventListener('click', nextLap);
    document.getElementById('lsBack').addEventListener('click', () => showLap(steps.cur - 1));
    const tocBtn = document.getElementById('lsTocBtn'), navBtn = document.getElementById('lsNavBtn');
    tocBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = !root.classList.contains('ls-sheet-open');
      closeLayers();
      root.classList.toggle('ls-sheet-open', open);
      tocBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { const here = list.querySelector('.is-here'); if (here) here.scrollIntoView({ block: 'nearest' }); }
    });
    navBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = !root.classList.contains('ls-nav-open');
      closeLayers();
      root.classList.toggle('ls-nav-open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.getElementById('lsScrim').addEventListener('click', closeLayers);
    document.addEventListener('click', e => {
      if (root.classList.contains('ls-nav-open') && !e.target.closest('.nc-tabbar')) closeLayers();
    });
    document.addEventListener('keydown', e => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (window.NihonCoreRound && NihonCoreRound.isActive && NihonCoreRound.isActive()) return;
      if (!content.offsetParent) return;                   // kör vagy összesítő látszik
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'Escape') { closeLayers(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextLap(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showLap(steps.cur - 1); return; }
      const lap = steps.laps[steps.cur];
      if (lap && lap.kind === 'quick' && /^[1-4]$/.test(e.key)) {
        const opts = lap.els[0].querySelectorAll('.cj-option:not(:disabled)');
        const pick = lap.els[0].querySelectorAll('.cj-option')[parseInt(e.key, 10) - 1];
        if (opts.length && pick && !pick.disabled) { e.preventDefault(); pick.click(); }
      }
    });

    // hol tartottál: a mentett lapon folytatod (a kör lapjáról elölről indul)
    let start = 0;
    try { start = parseInt((JSON.parse(localStorage.getItem(POS_KEY) || '{}'))[lesson.id], 10) || 0; } catch (e) {}
    if (start >= laps.length - 1) start = 0;
    if (wantListenLap) start = laps.length - 1;
    showLap(start, true);
  }

  /* ── C) Ellenőrző kör ──────────────────────────── */
  const run = { inLesson: true, kind: 'check', cards: [], idx: 0, score: 0, streak: 0, results: [], submitted: false, startTs: 0 };

  // Egy kör ROUND kérdés: a lecke saját kérdéseiből OWN_PER_ROUND, a többi a
  // példamondatokból készül (japán → magyar és magyar → japán), így minden kör más.
  const ROUND = 10, OWN_PER_ROUND = 6;
  const allExamples = [];
  lesson.points.forEach((p, pi) => p.examples.forEach(e => allExamples.push({ ex: e, point: pi })));
  (lesson.phrases || []).forEach(e => allExamples.push({ ex: e, point: 'phrases' }));

  // elterelő válaszok: előbb ugyanabból a pontból (hasonlóbbak), aztán a lecke többi példájából
  function pickOthers(item, field) {
    const same = shuffle(allExamples.filter(x => x !== item && x.point === item.point));
    const rest = shuffle(allExamples.filter(x => x.point !== item.point));
    const out = [];
    same.concat(rest).forEach(x => {
      const v = x.ex[field];
      if (out.length < 3 && v !== item.ex[field] && out.indexOf(v) < 0) out.push(v);
    });
    return out;
  }
  function generatedQuestions(n) {
    const out = [];
    shuffle(allExamples).forEach(item => {
      if (out.length >= n) return;
      const toHu = out.length % 2 === 0;
      const wrong = pickOthers(item, toHu ? 'hu' : 'jp');
      if (wrong.length < 3) return;
      out.push(toHu
        ? { q: 'Mit jelent ez a mondat?', jp: item.ex.jp, a: item.ex.hu, wrong: wrong, why: 'Így olvasod: ' + item.ex.romaji, gen: true }
        : { q: '„' + item.ex.hu + '" Melyik a japán mondat?', a: item.ex.jp, wrong: wrong, why: 'Így olvasod: ' + item.ex.romaji, gen: true });
    });
    return out;
  }
  function buildRound() {
    // ownOnly: a lecke csak a saját kérdéseit kapja (pl. az előkészítő leckénél,
    // ahol a tanuló még nem olvas kanát, így a példákból készített kérdés nem volna fair)
    const own = shuffle(lesson.quiz).slice(0, lesson.ownOnly ? ROUND : OWN_PER_ROUND);
    let qs = lesson.ownOnly ? own : own.concat(generatedQuestions(ROUND - own.length));
    if (qs.length < ROUND) qs = qs.concat(shuffle(lesson.quiz).filter(q => qs.indexOf(q) < 0).slice(0, ROUND - qs.length));
    return shuffle(qs).map(q => ({ q: q, options: shuffle([q.a].concat(q.wrong)) }));
  }

  // Hallás utáni kör: a lecke példamondatai hang alapján; a válasz a magyar jelentés.
  // (Az előkészítő leckénél nincs: ott a tanuló még nem ismer szavakat.)
  const canListen = !lesson.ownOnly && allExamples.length >= 8;
  function buildListenRound() {
    return shuffle(allExamples).slice(0, ROUND).map(item => {
      const wrong = pickOthers(item, 'hu');
      const q = { listen: true, gen: true, q: 'Melyik mondatot hallod?', ex: item.ex, a: item.ex.hu, wrong: wrong,
                  why: 'Így olvasod: ' + item.ex.romaji };
      return { q: q, options: shuffle([q.a].concat(wrong)) };
    }).filter(c => c.options.length === 4);
  }
  function playListen(card, speed, btn) {
    if (!window.NihonCoreAudio) return listenFailed();
    if (btn) { btn.classList.add('is-playing'); setTimeout(() => btn.classList.remove('is-playing'), 3500); }
    try { NihonCoreAudio.play(reading(card.q.ex.jp), { speed: speed, onError: listenFailed }); } catch (err) { listenFailed(); }
  }
  // Ha nincs hang, a mondat írásban jelenik meg: a kártya így is megválaszolható.
  function listenFailed() {
    const el = document.getElementById('lqListenText');
    if (el) el.classList.remove('hidden');
  }

  // retryCards: „Hibáim újra" — az előző kör elrontott kártyái jönnek vissza (a kör fajtája marad).
  function startQuiz(kind, retryCards) {
    stopDialogue();
    flushQuick();
    const retry = Array.isArray(retryCards) && retryCards.length > 0;
    run.kind = kind === 'listen' ? 'listen' : kind === 'review' ? 'review' : 'check';
    run.cards = retry ? shuffle(retryCards).map(c => ({ q: c.q, options: shuffle(c.options) }))
      : run.kind === 'listen' ? buildListenRound() : run.kind === 'review' ? buildReviewRound() : buildRound();
    if (!run.cards.length) return;
    run.retry = retry;
    run.idx = 0; run.score = 0; run.streak = 0; run.results = []; run.startTs = Date.now(); run.inLesson = false;
    NihonCoreRound.begin(function () {
      return { module: 'lesson', mode: run.retry ? 'retry' : run.kind, results: run.results, score: run.score, startTs: run.startTs, skipPath: run.retry };
    });
    closeLayers();
    root.classList.add('ls-round');                      // kör-nézet (a kör és az összesítője): a lépés-sáv és a gombsor rejtve
    hero.classList.add('hidden');
    content.classList.add('hidden');
    runtime.classList.remove('hidden');
    const sEl = document.getElementById('lqSummary');
    sEl.classList.add('hidden'); sEl.innerHTML = '';
    renderCard();
    NihonCoreRound.scrollToRound();
  }

  function updateBar() {
    const total = run.cards.length;
    document.getElementById('lqScore').textContent = run.score;
    document.getElementById('lqStreak').textContent = `${run.streak} 🔥`;
    document.getElementById('lqCount').textContent = `Kérdés ${Math.min(run.idx + 1, total)} / ${total}`;
    document.getElementById('lqFill').style.width = `${total ? (run.idx / total) * 100 : 0}%`;
  }

  function optHtml(text) {
    return `<span class="lq-opt"${hasJp(text) ? ' lang="ja"' : ''}>${ruby(text)}</span>`;
  }

  function renderCard() {
    run.submitted = false;
    updateBar();
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    const card = run.cards[run.idx];
    const q = card.q;
    const long = card.options.some(o => reading(o).length > 9);
    document.getElementById('lqCard').innerHTML = `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="cj-pe-group">${esc(lesson.review && srsOf.get(q) ? (srsOf.get(q).lesson.label || srsOf.get(q).lesson.no + '. lecke') : lessonLabel)}</span><span class="cj-pe-dot">·</span>${q.listen ? 'Hallás' : lesson.review ? 'Ismétlés' : 'Ellenőrzés'}
        </div>
        <div class="lq-question">${ruby(q.q)}</div>
        ${q.jp ? `<div class="lq-jp" lang="ja">${ruby(q.jp)}</div>` : ''}
        ${q.listen ? `
          <div class="lq-listen">
            <button class="lq-listen-btn" id="lqPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
            <button class="btn btn-ghost lq-listen-slow" id="lqSlow" type="button">Lassabban</button>
          </div>
          <div class="lq-jp lq-listen-text hidden" id="lqListenText" lang="ja">${ruby(q.ex.jp)}</div>` : ''}
      </div>
      <div class="cj-options lq-options${long ? ' lq-options-long' : ''}">
        ${card.options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}">${optHtml(o)}</button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;
    glossRomaji(document.getElementById('lqCard'), cardLesson(q));

    if (q.listen) {
      const playBtn = document.getElementById('lqPlay');
      playBtn.addEventListener('click', () => playListen(card, 0.9, playBtn));
      document.getElementById('lqSlow').addEventListener('click', () => playListen(card, 0.65, playBtn));
      playListen(card, 0.9, playBtn);          // a kártya megjelenésekor magától megszólal
    }
    const buttons = document.querySelectorAll('#lqCard .cj-option');
    const lock = () => document.querySelectorAll('#lqCard .cj-option, #lqCard .dont-know-btn').forEach(b => { b.disabled = true; });
    const right = card.options.indexOf(q.a);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (run.submitted) return;
      const chosen = card.options[parseInt(btn.dataset.idx, 10)];
      const ok = chosen === q.a;
      lock();
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) buttons[right].classList.add('reveal-correct');
      finalize(card, ok, { chosen: chosen });
    }));
    document.querySelector('#lqCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lock();
      buttons[right].classList.add('reveal-correct');
      finalize(card, false, { dontKnow: true });
    });
  }

  function finalize(card, ok, info) {
    run.submitted = true;
    if (ok) { run.score += 10; run.streak++; } else { run.streak = 0; }
    if (!card.q.listen && !card.q.gen) srsMark(card.q, ok);
    run.results.push({ q: lesson.review && srsOf.get(card.q) ? srsOf.get(card.q).id
                         : lesson.id + ':' + (card.q.listen ? 'listen' : card.q.gen ? 'gen' : lesson.quiz.indexOf(card.q)), correct: ok,
                       errorCode: ok ? null : (info.dontKnow ? 'dont_know' : 'wrong_choice') });
    document.getElementById('lqScore').textContent = run.score;
    document.getElementById('lqStreak').textContent = `${run.streak} 🔥`;

    const q = card.q;
    const isLast = run.idx + 1 >= run.cards.length;
    const fb = document.getElementById('lqFeedback');
    fb.className = 'conj-feedback ' + (ok ? 'pr-fb-correct' : info.dontKnow ? 'pr-fb-dontknow' : 'pr-fb-wrong');
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${ok ? '✅' : info.dontKnow ? '💡' : '🤔'}</span>
        <span class="pr-fb-title">${ok ? 'Így van' : info.dontKnow ? 'Ez a helyes' : 'Nézzük meg együtt'}</span>
      </div>
      <div class="pr-fb-explain">
        ${q.listen ? `<div class="pfe-row pfe-rule">
          <span class="pfe-label">Ezt hallottad</span>
          <span class="pfe-text"><strong class="pfe-jp-ok" lang="ja">${ruby(q.ex.jp)}</strong></span>
        </div>` : ''}
        ${ok ? '' : `<div class="pfe-row pfe-correct">
          <span class="pfe-label">${q.listen ? 'Jelentése' : 'Helyes'}</span>
          <span class="pfe-text"><strong class="${hasJp(q.a) ? 'pfe-jp-ok' : ''}"${hasJp(q.a) ? ' lang="ja"' : ''}>${ruby(q.a)}</strong></span>
        </div>`}
        ${!ok && info.chosen ? `<div class="pfe-row pfe-wrong">
          <span class="pfe-label">A te válaszod</span>
          <span class="pfe-text"${hasJp(info.chosen) ? ' lang="ja"' : ''}>${ruby(info.chosen)}</span>
        </div>` : ''}
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Miért?</span>
          <span class="pfe-text">${ruby(q.why)}</span>
        </div>
      </div>
      <button class="btn btn-primary cj-next" id="lqNext" type="button">${isLast ? 'Eredmény' : 'Következő'}</button>`;
    glossRomaji(fb, cardLesson(q));
    document.getElementById('lqNext').addEventListener('click', advance);
  }

  function advance() {
    run.idx++;
    if (run.idx >= run.cards.length) showSummary(); else renderCard();
    NihonCoreRound.scrollToRound();
  }

  // Összesítő. „Hibáim újra": az elrontott kérdések rövid körben térnek vissza; ez a kör a
  // statisztikába 'retry' néven megy, és a tanulási út lépését nem dönti el (skipPath) —
  // a lépéshez továbbra is egy teljes, legalább 60%-os kör kell.
  function showSummary() {
    const retry = !!run.retry;
    NihonCoreStats.recordSession({ module: 'lesson', mode: retry ? 'retry' : run.kind, results: run.results, score: run.score,
      startTs: run.startTs, skipPath: retry });
    if (run.kind === 'review') { showReviewSummary(); return; }
    const listen = run.kind === 'listen';
    if (listen && window.NihonCoreAudio) NihonCoreAudio.stop();
    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    if (!retry) run.base = { passed: pct >= 60 };          // a teljes kör eredménye: ettől függ, merre visz tovább a gomb
    const passed = run.base ? run.base.passed : pct >= 60;
    const missed = run.cards.filter((c, i) => run.results[i] && !run.results[i].correct);
    run.missed = missed;
    const nextPractice = practiceRows().find(r => !r.done);
    document.getElementById('lqCard').innerHTML = '';
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('lqFill').style.width = '100%';

    // a továbbvivő gomb: sikeres teljes kör után a gyakorlás, különben egy új teljes kör
    const main = missed.length ? 'btn-outline' : 'btn-primary';
    const forward = passed
      ? (nextPractice
          ? (nextPractice.step.module === 'lesson'
              ? '<button class="btn ' + main + '" id="lqGoListen" type="button">Gyakorlás: ' + esc(nextPractice.step.title) + '</button>'
              : '<a class="btn ' + main + '" href="' + Path.stepHref(nextPractice.step, false) + '">Gyakorlás: ' + esc(nextPractice.step.title) + '</a>')
          : '<a class="btn ' + main + '" href="../index.html#path">Tovább az úton</a>')
      : '<button class="btn ' + main + '" id="lqAgain" type="button">Új kör</button>';
    const title = retry
      ? (missed.length ? 'Még ' + missed.length + ' kérdés nem megy' : 'Kijavítottad a hibáidat')
      : !passed ? 'Még egy kör, és megvan' : listen ? 'Megvan a hallás utáni kör' : 'Megvan a lecke';
    const note = missed.length
      ? (passed ? 'Amit elrontottál, most rögtön átveheted újra — vagy mehetsz tovább.'
                : 'Előbb vedd át újra, amit elrontottál, aztán jöhet egy új kör: a lépéshez 60% kell.')
      : retry ? (passed ? 'Minden kérdés megvan. Mehetsz tovább.' : 'Minden kérdés megvan. Most jöhet egy új, teljes kör: a lépéshez 60% kell.')
      : nextPractice ? 'Most jöhet a gyakorlás: a lecke anyaga feladatokban.'
      : 'A lecke minden gyakorlása megvan. Mehet a következő lecke.';
    const sEl = document.getElementById('lqSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : passed ? '🎯' : '🌱'}</div>
      <h3>${title}</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="lq-summary-note">${note}</p>
      <div class="kana-summary-actions">
        ${missed.length ? '<button class="btn btn-primary" id="lqRetry" type="button">Hibáim újra (' + missed.length + ')</button>' : ''}
        ${forward}
        ${passed && !missed.length && !retry ? '<button class="btn btn-outline" id="lqAgain" type="button">Még egy kör</button>' : ''}
        <button class="btn btn-ghost" id="lqBack" type="button">Vissza a leckéhez</button>
      </div>`;
    document.getElementById('lqBack').addEventListener('click', backToLesson);
    const retryBtn = document.getElementById('lqRetry');
    if (retryBtn) retryBtn.addEventListener('click', () => startQuiz(run.kind, run.missed));
    const again = document.getElementById('lqAgain');
    if (again) again.addEventListener('click', () => startQuiz(run.kind));
    const goListen = document.getElementById('lqGoListen');
    if (goListen) goListen.addEventListener('click', () => startQuiz('listen'));
    if (pct === 100 && !retry && window.NihonCoreMotion && NihonCoreMotion.celebrate) {
      try { NihonCoreMotion.celebrate({ title: 'Hibátlan!', sub: `${total} / ${total}` }); } catch (e) {}
    }
  }

  function backToLesson() {
    if (window.NihonCoreAudio) NihonCoreAudio.stop();
    run.inLesson = true; run.cards = [];
    root.classList.remove('ls-round');
    hero.classList.remove('hidden');          // → a kör-őr elmenti a részeredményt
    content.classList.remove('hidden');
    runtime.classList.add('hidden');
    if (lesson.review) renderReview();        // az ismétlő mód nyitólapja a friss számokkal
    window.scrollTo({ top: 0 });
  }

  document.getElementById('lqExit').addEventListener('click', () => {
    if (run.inLesson) return;
    if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
      'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) return;
    backToLesson();
  });

  /* ── D) Ismétlő mód ─────────────────────────────── */
  //   Az esedékes kérdések (a legrégebben esedékes elöl); ha nincs elég, a már elvégzett
  //   leckék még nem látott kérdéseivel telik fel a kör.
  function reviewPool() {
    const now = Date.now();
    const due = [], fresh = [];
    const doneLessons = {};
    if (Path) Path.view().rows.forEach(r => {
      const m = r.done && r.step.module === 'lesson' && r.step.mode !== 'listen' && /[?&]id=(\w+)/.exec(r.step.href || '');
      if (m) doneLessons[m[1]] = true;
    });
    srsOf.forEach((src, q) => {
      const st = window.NihonCoreSRS ? NihonCoreSRS.getItemState(src.id) : null;
      if (st) { if ((st.nextDueTs || 0) <= now) due.push({ q: q, ts: st.nextDueTs || 0 }); }
      else if (doneLessons[src.lesson.id]) fresh.push(q);
    });
    due.sort((a, b) => a.ts - b.ts);
    return { due: due.map(x => x.q), fresh: fresh };
  }
  function buildReviewRound() {
    const pool = reviewPool();
    const qs = pool.due.slice(0, ROUND).concat(shuffle(pool.fresh)).slice(0, ROUND);
    return shuffle(qs).map(q => ({ q: q, options: shuffle([q.a].concat(q.wrong)) }));
  }
  function renderReview() {
    const pool = reviewPool();
    const info = window.NihonCoreSRS ? NihonCoreSRS.dueInfo(SRS_PREFIX) : { total: 0, due: 0, nextTs: 0 };
    const n = Math.min(ROUND, pool.due.length + pool.fresh.length);
    const days = info.nextTs ? Math.max(1, Math.ceil((info.nextTs - Date.now()) / 86400000)) : 0;
    const head = pool.due.length ? pool.due.length + ' kérdés vár'
      : n ? 'Ma nincs esedékes kérdés' : 'Még nincs mit ismételni';
    const sub = pool.due.length
      ? 'Egy kör ' + ROUND + ' kérdés, a legrégebben esedékesekkel kezdve.' + (pool.due.length > ROUND ? ' A többi a következő körben jön.' : '')
      : n ? (days ? 'A következő ' + (days <= 1 ? 'holnap' : days + ' nap múlva') + ' esedékes. ' : '') + 'Addig új kérdéseket kaphatsz az elvégzett leckékből.'
          : 'Az ismétlés az elvégzett leckék kérdéseiből áll. Előbb csinálj végig egy leckét az ellenőrző körével együtt.';
    content.innerHTML = `
      <section class="lp-check glass-panel-heavy" id="lpCheck">
        <h2 class="lp-check-title">${head}</h2>
        <p class="lp-check-sub">${sub}</p>
        <div class="rv-chips">
          <span class="rv-chip"><b>${pool.due.length}</b> esedékes</span>
          <span class="rv-chip"><b>${pool.fresh.length}</b> még nem látott</span>
          <span class="rv-chip"><b>${info.total}</b> ütemezve</span>
        </div>
        <div class="lp-check-actions">
          ${n ? '<button class="btn btn-primary btn-lg" id="lqStart" type="button">' + (pool.due.length ? 'Ismétlés indítása' : 'Új kérdések') + '</button>'
              : '<a class="btn btn-primary btn-lg" href="../index.html#path">A tanulási útra</a>'}
        </div>
      </section>`;
    const start = document.getElementById('lqStart');
    if (start) start.addEventListener('click', () => startQuiz('review'));
  }
  function showReviewSummary() {
    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const left = reviewPool().due.length;
    document.getElementById('lqCard').innerHTML = '';
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('lqFill').style.width = '100%';
    const sEl = document.getElementById('lqSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${correct === total ? '🏆' : '🎯'}</div>
      <h3>${left ? 'Még ' + left + ' kérdés vár' : 'Megvan a mai ismétlés'}</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="lq-summary-note">${left
        ? 'Amit elrontottál, rögtön visszajön; a többi kérdés a maga idejében tér vissza.'
        : 'Amit most tudtál, az néhány nap múlva jön újra. Mehet a következő lecke.'}</p>
      <div class="kana-summary-actions">
        ${left ? '<button class="btn btn-primary" id="lqAgain" type="button">Még egy kör</button><a class="btn btn-outline" href="../index.html">Kezdőlap</a>'
               : '<a class="btn btn-primary" href="../index.html">Tovább a tanulási úton</a><button class="btn btn-ghost" id="lqBack" type="button">Vissza</button>'}
      </div>`;
    const again = document.getElementById('lqAgain');
    if (again) again.addEventListener('click', () => startQuiz('review'));
    const back = document.getElementById('lqBack');
    if (back) back.addEventListener('click', backToLesson);
    if (correct === total && total >= 5 && window.NihonCoreMotion && NihonCoreMotion.celebrate) {
      try { NihonCoreMotion.celebrate({ title: 'Hibátlan!', sub: total + ' / ' + total }); } catch (e) {}
    }
  }

  if (lesson.review) renderReview(); else { renderLesson(); glossRomaji(content); }
  window._lesson = { lesson, ruby, reading, startQuiz, run, buildRound, buildListenRound, practiceRows, steps, showLap,
    playDialogue, stopDialogue, dlgRun, flushQuick,
    quickMatches: () => (quickMap || (quickMap = buildQuickMap())).map(l => l.length) };
}


/* ====================================================
   10. initExamPage() — Dolgozatok (exam.html)
   ----------------------------------------------------
   Kis teszt 4 leckénként (30 perc, 30 kérdés), nagy dolgozat 12 leckénként (60 perc,
   60 kérdés): a leírásuk NIHONCORE_EXAMS (core.js), a lépésük a tanulási úton `optional`.
   A kérdések kitöltésenként a leckék meglévő anyagából állnak össze, azonos arányokkal:
   kb. 80% a dolgozat saját leckéiből, 20% a korábbiakból.
     Részek:   gram (nyelvtan és olvasás) · part (partikulák és mondatépítés) ·
               write (ragozás és beírás) · listen (hallás)
     Típusok:  choice (négy válasz) · tokens (mondat összerakása) · typed (beírás, a romaji
               gépelés közben kanává alakul)
   Vizsga-mód: fut az óra, visszajelzés csak a végén. Gyakorló mód: idő nélkül, kérdésenként
   visszajelzéssel. Mentés: nihoncore_exams_v1 (kitöltések, szinkronizál),
   nihoncore_exam_settings_v1 (az indítás előtti beállítások, eszköz-helyi),
   nihoncore_exam_run_v1 (a futó dolgozat: újratöltés vagy kilépés után folytatható; eszköz-helyi).
   A dolgozat végén „Hibáim újra": a hibás kérdések gyakorló módban, kitöltésként nem mentve.
   ==================================================== */
function initExamPage() {
  const main = document.getElementById('examMain');
  if (!main) return;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RB = /\{([^|{}]+)\|([^|{}]+)\}/g;
  const ruby = s => esc(s).replace(RB, '<ruby>$1<rt>$2</rt></ruby>');
  const reading = s => String(s).replace(RB, '$2').replace(/[\s　＿…]/g, '');
  const plain = s => String(s == null ? '' : s).replace(RB, '$1').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '');
  const hasJp = s => /[぀-ヿ一-鿿]/.test(s);
  const hira = s => String(s || '').replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const PLAY = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

  const EXAMS = (typeof NIHONCORE_EXAMS !== 'undefined') ? NIHONCORE_EXAMS : [];
  const COURSE = (typeof NIHONCORE_COURSE !== 'undefined') ? NIHONCORE_COURSE : [];
  const PATH = (typeof NIHONCORE_PATH !== 'undefined') ? NIHONCORE_PATH : [];
  const UNITS = (typeof NIHONCORE_PATH_UNITS !== 'undefined') ? NIHONCORE_PATH_UNITS : [];
  const SENT = (typeof NIHONCORE_SENTENCES !== 'undefined') ? NIHONCORE_SENTENCES : [];
  const VERBS = (typeof NIHONCORE_VERBS !== 'undefined') ? NIHONCORE_VERBS : [];
  const PATTERNS = (typeof NIHONCORE_GRAMMAR_PATTERNS !== 'undefined') ? NIHONCORE_GRAMMAR_PATTERNS : [];
  const PARTICLES = (typeof NIHONCORE_PARTICLES !== 'undefined') ? NIHONCORE_PARTICLES : [];
  const FORMS = (typeof NIHONCORE_FORM_RULES !== 'undefined') ? NIHONCORE_FORM_RULES : {};
  const ADJ_FORMS = (typeof NIHONCORE_ADJ_FORM_RULES !== 'undefined') ? NIHONCORE_ADJ_FORM_RULES : {};
  const ADJS = ((typeof NIHONCORE_I_ADJECTIVES !== 'undefined') ? NIHONCORE_I_ADJECTIVES : [])
    .concat((typeof NIHONCORE_NA_ADJECTIVES !== 'undefined') ? NIHONCORE_NA_ADJECTIVES : []);
  const Kana = window.NihonCoreKana, Conj = window.NihonCoreConj, Puzzle = window.NihonCorePuzzle;

  const ATT_KEY = 'nihoncore_exams_v1', SET_KEY = 'nihoncore_exam_settings_v1', PATH_KEY = 'nihoncore_path_v1';
  const RUN_KEY = 'nihoncore_exam_run_v1', RUN_MAX_AGE = 7 * 86400000;
  const PASS = 0.6, MAX_ATTEMPTS = 200;
  const SECTIONS = { gram: 'Nyelvtan és olvasás', part: 'Partikulák és mondatépítés', write: 'Ragozás és beírás', listen: 'Hallás' };
  const SEC_SHORT = { gram: 'Nyelvtan', part: 'Partikulák', write: 'Beírás', listen: 'Hallás' };   // a kör-sávba
  const SEC_ORDER = ['gram', 'part', 'write', 'listen'];
  // kérdésszám típusonként: kis teszt / nagy dolgozat
  const PLAN = {
    quick: { quiz: 8,  pattern: 4, read: 3, particle: 4, puzzle: 3, conj: 3, cloze: 2, listen: 3 },
    big:   { quiz: 16, pattern: 8, read: 6, particle: 8, puzzle: 6, conj: 6, cloze: 4, listen: 6 }
  };
  const REVIEW_SHARE = 0.2;

  let examId = null;
  try { examId = new URLSearchParams(window.location.search).get('id'); } catch (e) {}
  const exam = EXAMS.find(x => x.id === examId) || null;

  /* ── Tárolás ─────────────────────────────────────── */
  function loadAttempts() {
    try { const a = JSON.parse(localStorage.getItem(ATT_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function saveAttempt(att) {
    const all = loadAttempts();
    all.push(att);
    if (all.length > MAX_ATTEMPTS) all.splice(0, all.length - MAX_ATTEMPTS);
    try { localStorage.setItem(ATT_KEY, JSON.stringify(all)); } catch (e) {}
    if (window.NihonCoreSync && NihonCoreSync.schedulePush) NihonCoreSync.schedulePush();
  }
  const settings = { examMode: true, romaji: true, hu: true, audio: true };
  try { Object.assign(settings, JSON.parse(localStorage.getItem(SET_KEY) || '{}') || {}); } catch (e) {}
  const saveSettings = () => { try { localStorage.setItem(SET_KEY, JSON.stringify(settings)); } catch (e) {} };
  function applyHelpers(on) {
    document.body.classList.toggle('helpers-no-romaji', on && !settings.romaji);
    document.body.classList.toggle('helpers-no-hu', on && !settings.hu);
  }
  // a dolgozat a tanulási út (nem kötelező) lépése: 60%-tól kész, akárhonnan nyílt az oldal
  function markPathStep(id, pct) {
    try {
      const st = JSON.parse(localStorage.getItem(PATH_KEY) || 'null') || { level: null, steps: {} };
      st.steps = st.steps || {};
      const prev = st.steps[id] || {};
      st.steps[id] = { best: Math.max(typeof prev.best === 'number' ? prev.best : 0, pct), done: !!prev.done || pct >= PASS, ts: Date.now() };
      localStorage.setItem(PATH_KEY, JSON.stringify(st));
    } catch (e) {}
  }

  /* ── Leckék, fejezetek ───────────────────────────── */
  const lessonOf = id => COURSE.find(l => l.id === id) || null;
  const lessonName = id => { const l = lessonOf(id); return !l ? id : (l.label ? l.title : l.no + '. lecke'); };
  const ORDER = [];
  PATH.forEach(s => {
    if (s.module !== 'lesson' || s.mode) return;
    const m = /[?&]id=(\w+)/.exec(s.href || '');
    if (m && ORDER.indexOf(m[1]) < 0) ORDER.push(m[1]);
  });
  const reviewLessons = ex => {
    const first = ORDER.indexOf(ex.lessons[0]);
    return first <= 0 ? [] : ORDER.slice(0, first).filter(id => id !== 'l0' && ex.lessons.indexOf(id) < 0);
  };
  const unitOf = id => UNITS.find(u => u.steps.indexOf(id + '-lesson') >= 0) || null;
  const stepsOf = id => { const u = unitOf(id); return u ? u.steps.map(sid => PATH.find(s => s.id === sid)).filter(Boolean) : []; };

  /* ── Kérdés-készletek leckénként ─────────────────── */
  const TRAY_JP = PARTICLES.map(p => p.jp);
  const cache = {};
  const memo = (k, fn) => (k in cache) ? cache[k] : (cache[k] = fn());

  // a lecke mondatai: a saját készlete + a fejezet Mondat-Mester lépéseinek régi mondatai
  function sentencesFor(id) {
    return memo('sent:' + id, () => {
      const out = SENT.filter(s => s.lesson === id);
      const seen = {};
      out.forEach(s => { seen[s.id] = true; });
      stepsOf(id).filter(st => st.module === 'practice' && st.preset).forEach(st => {
        const p = st.preset;
        if (!p.ids && !p.idRanges && !p.particlesOnly && !p.particlesAny) return;
        SENT.forEach(s => {
          if (seen[s.id] || s.lesson) return;
          let ok = false;
          if (p.ids) ok = p.ids.indexOf(s.id) >= 0;
          else if (p.idRanges) { const m = /^s_n5_(\d+)$/.exec(s.id); ok = !!m && p.idRanges.some(r => +m[1] >= r[0] && +m[1] <= r[1]); }
          else {
            if (s.level !== (p.level || 'N5')) return;
            const ps = s.tokens.filter(t => t.type === 'particle').map(t => t.jp);
            ok = ps.length > 0 && (!p.particlesOnly || ps.every(x => p.particlesOnly.indexOf(x) >= 0)) &&
                 (!p.particlesAny || ps.some(x => p.particlesAny.indexOf(x) >= 0));
          }
          if (ok) { seen[s.id] = true; out.push(s); }
        });
      });
      return out;
    });
  }
  const examplesFor = id => memo('ex:' + id, () => {
    const l = lessonOf(id), out = [];
    if (l) l.points.forEach((p, pi) => (p.examples || []).forEach((e, ei) => { if (e.jp && e.hu) out.push({ lesson: id, id: id + ':' + pi + ':' + ei, jp: e.jp, romaji: e.romaji || '', hu: e.hu }); }));
    return out;
  });
  const patternsFor = id => memo('pat:' + id, () => PATTERNS.filter(p => p.lesson === id && p.examples && p.examples.length));
  // az addig tanult ragozási alakok: a fejezetek Ragozó-lépéseiből
  function conjSetup(ids) {
    const forms = {}, themes = {}, adj = {};
    ids.forEach(id => stepsOf(id).forEach(st => {
      if (!st.preset || !st.preset.only) return;
      if (st.module === 'adjectives') { (st.preset.only.forms || []).forEach(f => { adj[f] = true; }); return; }
      if (st.module !== 'conjugation') return;
      (st.preset.only.forms || []).forEach(f => { forms[f] = true; });
      (st.preset.only.themes || []).forEach(t => { themes[t] = true; });
    }));
    return { forms: Object.keys(forms), themes: Object.keys(themes), adjForms: Object.keys(adj) };
  }

  // kiemelt rész a mintamondatban: a kiegészítendő rész helyére a válasz kerül, jelölve
  const patternSentence = ex => String(ex.cloze || ex.jp).replace('___BLANK___', '<span class="grm-hl">' + esc(ex.clozeAnswer) + '</span>');
  const clozeSentence = ex => String(ex.cloze || '').replace('___BLANK___', '<span class="exam-blank" aria-label="hiányzó rész">＿＿</span>');

  // mely partikulák nem lehetnek rossz válaszok (mert azon a helyen is elfogadhatók lennének)
  const NEAR = { 'は': ['が', 'も'], 'が': ['は', 'も'], 'を': ['は', 'も'], 'に': ['へ', 'は', 'も', 'で'], 'へ': ['に', 'は', 'も'], 'で': ['は', 'も', 'に'],
                 'も': ['は', 'が', 'を'], 'と': ['も', 'は', 'や'], 'の': [], 'から': ['は', 'も'], 'まで': ['は', 'も', 'に'], 'か': ['ね', 'よ'], 'ね': ['よ', 'か'], 'よ': ['ね', 'か'],
                 'なら': ['は', 'も'], 'でも': ['は', 'も'] };
  const COMMON = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'から', 'まで'];

  // egy lecke jelöltjei egy kérdéstípushoz (a válaszlehetőségek később készülnek)
  function candidates(type, id) {
    return memo(type + ':' + id, () => {
      const out = [];
      if (type === 'quiz') {
        const l = lessonOf(id);
        (l && l.quiz || []).forEach((q, i) => {
          if (!q || !q.a || !q.wrong || q.wrong.length < 2) return;
          out.push({ type: 'choice', sec: 'gram', kind: 'quiz', lesson: id, key: 'lesson:' + id + ':' + i,
            prompt: q.q, jp: q.jp || '', answer: q.a, options: [q.a].concat(q.wrong.slice(0, 3)), why: q.why || '' });
        });
      } else if (type === 'read' || type === 'listen') {
        examplesFor(id).forEach(e => out.push(type === 'read'
          ? { type: 'choice', sec: 'gram', kind: 'read', lesson: id, key: 'read:' + e.id, ex: e, prompt: 'Mit jelent ez a mondat?', jp: e.jp, romaji: e.romaji, answer: e.hu }
          : { type: 'choice', sec: 'listen', kind: 'listen', lesson: id, key: 'listen:' + e.id, ex: e, prompt: 'Hallgasd meg: mit jelent?', say: reading(e.jp), jpAfter: e.jp, answer: e.hu }));
      } else if (type === 'pattern' || type === 'cloze') {
        patternsFor(id).forEach(p => p.examples.forEach((ex, i) => {
          if (!ex.cloze || !ex.clozeAnswer) return;
          out.push(type === 'pattern'
            ? { type: 'choice', sec: 'gram', kind: 'pattern', lesson: id, key: 'pat:' + p.id + ':' + i, group: 'pe:' + p.id + ':' + i, pattern: p, prompt: 'Mit fejez ki a kiemelt rész?', html: patternSentence(ex), hu: ex.hu, answer: p.summary,
                why: p.label + ': ' + p.summary }
            : { type: 'typed', sec: 'write', kind: 'cloze', lesson: id, key: 'cloze:' + p.id + ':' + i, group: 'pe:' + p.id + ':' + i, pattern: p, prompt: 'Írd be a hiányzó részt!', html: clozeSentence(ex), hu: ex.hu,
                answerKana: ex.clozeAnswer, answerShow: ex.clozeAnswer, why: p.label + ': ' + p.summary });
        }));
      } else if (type === 'particle') {
        sentencesFor(id).forEach(s => {
          s.tokens.forEach((t, ti) => {
            if (t.type !== 'particle' || TRAY_JP.indexOf(t.jp) < 0 || !NEAR[t.jp]) return;
            out.push({ type: 'choice', sec: 'part', kind: 'particle', lesson: id, key: 'par:' + s.id + ':' + ti, group: s.id, sentence: s, blank: ti,
              prompt: 'Melyik partikula hiányzik?', hu: s.translation, answer: t.jp });
          });
        });
      } else if (type === 'puzzle') {
        sentencesFor(id).forEach(s => {
          if (s.tokens.length < 4 || s.tokens.length > 9) return;
          out.push({ type: 'tokens', sec: 'part', kind: 'puzzle', lesson: id, key: 'puz:' + s.id, group: s.id, sentence: s, prompt: 'Rakd össze a mondatot!', hu: s.translation });
        });
      }
      return out;
    });
  }

  /* ── A dolgozat összeállítása ─────────────────────── */
  // n elem, a leckék között egyenletesen elosztva
  function pickSpread(byLesson, n, used) {
    const lessons = shuffle(Object.keys(byLesson)), picked = [];
    const bags = {};
    lessons.forEach(l => { bags[l] = shuffle(byLesson[l]); });
    let moved = true;
    while (picked.length < n && moved) {
      moved = false;
      for (let i = 0; i < lessons.length && picked.length < n; i++) {
        const bag = bags[lessons[i]];
        while (bag.length) {
          const it = bag.pop();
          const g = it.group || it.key;
          if (used[it.key] || used['g:' + g] || (it.ex && used['ex:' + it.ex.id])) continue;
          used[it.key] = true; used['g:' + g] = true;
          if (it.ex) used['ex:' + it.ex.id] = true;
          picked.push(it); moved = true;
          break;
        }
      }
    }
    return picked;
  }
  function draw(type, n, mainIds, revIds, used) {
    if (n <= 0) return [];
    const pool = ids => { const m = {}; ids.forEach(id => { const c = candidates(type, id); if (c.length) m[id] = c; }); return m; };
    const mainPool = pool(mainIds), revPool = pool(revIds);
    const wantRev = Object.keys(revPool).length ? Math.round(n * REVIEW_SHARE) : 0;
    let out = pickSpread(revPool, wantRev, used);
    out = out.concat(pickSpread(mainPool, n - out.length, used));
    if (out.length < n) out = out.concat(pickSpread(revPool, n - out.length, used));   // ha a saját leckékből nem telik ki
    return out;
  }
  // melléknév-ragozás: az addig tanult melléknév-alakok (a fejezetek Melléknév-lépéseiből)
  function adjItems(n, mainIds, revIds, used) {
    if (n <= 0 || !Conj || !Conj.composeAdj || !ADJS.length) return [];
    const setup = conjSetup(mainIds), all = conjSetup(revIds.concat(mainIds));
    const forms = (setup.adjForms.length ? setup.adjForms : all.adjForms).filter(f => ADJ_FORMS[f]);
    if (!forms.length) return [];
    const older = all.adjForms.filter(f => forms.indexOf(f) < 0 && ADJ_FORMS[f]);
    const out = [];
    let guard = 0;
    while (out.length < n && guard++ < 300) {
      const useOld = older.length && Math.random() < REVIEW_SHARE;
      const list = useOld ? older : forms;
      const form = list[Math.floor(Math.random() * list.length)], rule = ADJ_FORMS[form];
      const pool = ADJS.filter(a => a.type === rule.type);
      const a = pool[Math.floor(Math.random() * pool.length)];
      const key = 'adj:' + (a && a.id) + ':' + form;
      if (!a || used[key] || used['adj:' + a.id]) continue;
      const res = Conj.composeAdj(a, form);
      if (!res || !res.kana) continue;
      used[key] = true; used['adj:' + a.id] = true;
      // kanjival beírva is jó (a rendhagyó いい kivételével: annak a töve よ)
      const alt = a.exception ? '' : (a.type === 'i-adj' && /い$/.test(a.kanji)) ? a.kanji.slice(0, -1) + rule.suffix.kana : (a.type === 'na-adj' ? a.kanji + rule.suffix.kana : '');
      out.push({ type: 'typed', sec: 'write', kind: 'conj', lesson: '', key: key, verb: a, form: form, formName: rule.nameHu,
        prompt: 'Ragozd a melléknevet!', answerKana: res.kana, answerRomaji: res.romaji, answerAlt: alt,
        answerAlts: (res.variants || []).map(v => v.kana).filter(Boolean), answerShow: res.kana,
        why: rule.nameHu + (rule.example ? ' (' + rule.example + ')' : '') });
    }
    return out;
  }
  function conjItems(n, mainIds, revIds, used) {
    if (n <= 0 || !Conj) return [];
    let setup = conjSetup(mainIds);
    const all = conjSetup(revIds.concat(mainIds));
    const forms = setup.forms.length ? setup.forms : all.forms;
    // ha már melléknév-alak is volt, a ragozós kérdések harmada melléknév (ige-alak nélkül mind az)
    const hasAdj = (setup.adjForms.length || all.adjForms.length) && ADJS.length;
    const adjN = !hasAdj ? 0 : !forms.length ? n : Math.max(1, Math.round(n / 3));
    const adj = adjItems(adjN, mainIds, revIds, used);
    n -= adj.length;
    if (!forms.length || n <= 0) return adj;
    const themes = (setup.themes.length ? setup.themes : all.themes);
    let verbs = VERBS.filter(v => !themes.length || themes.indexOf(v.theme || 'daily') >= 0);
    if (verbs.length < 6) verbs = VERBS.slice();
    // a korábban tanult alakok is előjöhetnek (ismétlés), de ritkábban
    const older = all.forms.filter(f => forms.indexOf(f) < 0);
    const out = [];
    const bag = shuffle(verbs);
    let guard = 0;
    while (out.length < n && bag.length && guard++ < 400) {
      const v = bag.pop();
      const useOld = older.length && Math.random() < REVIEW_SHARE;
      const form = (useOld ? older : forms)[Math.floor(Math.random() * (useOld ? older : forms).length)];
      const key = 'conj:' + v.id + ':' + form;
      if (used[key]) continue;
      const res = Conj.conjugate(v, form);
      const rule = FORMS[form];
      if (!res || !res.kana || !rule) continue;
      used[key] = true;
      // kanjival beírva is jó: az ige kanjis töve + a ragozott végződés
      const okuri = (/[ぁ-ん]+$/.exec(v.kanji) || [''])[0];
      const stemKana = okuri && v.kana.slice(-okuri.length) === okuri ? v.kana.slice(0, v.kana.length - okuri.length) : '';
      const alt = stemKana && res.kana.indexOf(stemKana) === 0 ? v.kanji.slice(0, v.kanji.length - okuri.length) + res.kana.slice(stemKana.length) : '';
      out.push({ type: 'typed', sec: 'write', kind: 'conj', lesson: '', key: key, verb: v, form: form, formName: rule.nameHu,
        prompt: 'Ragozd az igét!', answerKana: res.kana, answerRomaji: res.romaji, answerAlt: alt, answerShow: res.kana,
        why: rule.nameHu + (rule.example ? ' (' + rule.example + ')' : '') });
    }
    return out.concat(adj);
  }

  // válaszlehetőségek a választós kérdésekhez
  function finishChoice(it, scope) {
    if (it.kind === 'quiz') { it.options = shuffle(it.options); return it; }
    if (it.kind === 'read' || it.kind === 'listen') {
      const others = shuffle(scope.examples.filter(e => e.hu !== it.answer && e.id !== it.ex.id));
      const opts = [it.answer];
      // hasonló hosszú mondatok előre: így a hossz nem árulja el a választ
      others.sort((a, b) => Math.abs(a.hu.length - it.answer.length) - Math.abs(b.hu.length - it.answer.length));
      shuffle(others.slice(0, 8)).forEach(e => { if (opts.length < 4 && opts.indexOf(e.hu) < 0) opts.push(e.hu); });
      it.options = shuffle(opts);
      it.why = it.ex.romaji ? plain(it.ex.jp) + ' (' + it.ex.romaji + ')' : plain(it.ex.jp);
      return it;
    }
    if (it.kind === 'pattern') {
      const p = it.pattern, opts = [p.summary];
      const add = list => shuffle(list).forEach(x => { if (opts.length < 4 && x.id !== p.id && opts.indexOf(x.summary) < 0) opts.push(x.summary); });
      add(scope.patterns.filter(x => (p.contrasts || []).indexOf(x.id) >= 0));
      add(scope.patterns.filter(x => x.lesson === p.lesson));
      add(scope.patterns);
      add(PATTERNS.filter(x => x.jlpt === p.jlpt));
      add(PATTERNS);
      it.options = shuffle(opts);
      return it;
    }
    if (it.kind === 'particle') {
      const near = NEAR[it.answer] || [];
      const inSentence = it.sentence.tokens.filter(t => t.type === 'particle').map(t => t.jp);
      const opts = [it.answer];
      shuffle(COMMON.filter(x => x !== it.answer && near.indexOf(x) < 0)).forEach(x => { if (opts.length < 4) opts.push(x); });
      it.options = shuffle(opts);
      const def = PARTICLES.find(p => p.jp === it.answer);
      it.why = def ? it.answer + ': ' + def.fullExplain + '.' : '';
      it.others = inSentence;
      return it;
    }
    return it;
  }

  function buildExam(ex) {
    const mainIds = ex.lessons.slice(), revIds = reviewLessons(ex);
    const plan = Object.assign({}, PLAN[ex.kind === 'big' ? 'big' : 'quick']);
    if (!settings.audio) { plan.read += plan.listen; plan.listen = 0; }
    const target = Object.keys(plan).reduce((s, k) => s + plan[k], 0);
    const used = {};
    const scopeIds = revIds.concat(mainIds);
    const scope = { examples: [], patterns: [] };
    scopeIds.forEach(id => { scope.examples = scope.examples.concat(examplesFor(id)); scope.patterns = scope.patterns.concat(patternsFor(id)); });

    let items = [];
    ['listen', 'read', 'pattern', 'cloze', 'particle', 'puzzle', 'quiz'].forEach(t => { items = items.concat(draw(t, plan[t], mainIds, revIds, used)); });
    items = items.concat(conjItems(plan.conj, mainIds, revIds, used));
    // ami egy típusból nem telt ki (pl. még nincs tanult igealak), azt a leckék saját kérdései pótolják
    if (items.length < target) items = items.concat(draw('quiz', target - items.length, mainIds, revIds, used));
    if (items.length < target) items = items.concat(draw('read', target - items.length, mainIds, revIds, used));
    items.forEach(it => { if (it.type === 'choice') finishChoice(it, scope); });
    items = items.filter(it => it.type !== 'choice' || (it.options && it.options.length >= 3));
    // részenként, a részen belül kevert sorrendben
    let ordered = [];
    SEC_ORDER.forEach(sec => { ordered = ordered.concat(shuffle(items.filter(it => it.sec === sec))); });
    return ordered;
  }
  // mit ígér a lobbi: a terv szerinti darabszámok részenként
  function planSummary(ex) {
    const p = PLAN[ex.kind === 'big' ? 'big' : 'quick'];
    return { gram: p.quiz + p.pattern + p.read + (settings.audio ? 0 : p.listen), part: p.particle + p.puzzle, write: p.conj + p.cloze, listen: settings.audio ? p.listen : 0 };
  }
  const examMinutes = ex => ex.minutes || (ex.kind === 'big' ? 60 : 30);
  const examCount = ex => { const p = PLAN[ex.kind === 'big' ? 'big' : 'quick']; return Object.keys(p).reduce((s, k) => s + p[k], 0); };

  /* ── Megjelenítés: közös elemek ───────────────────── */
  const hero = document.getElementById('examHero');
  const lobby = document.getElementById('examLobby');
  const runtime = document.getElementById('examRuntime');
  const fmtTime = ms => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const fmtDate = ts => { const d = new Date(ts); return d.getFullYear() + '. ' + String(d.getMonth() + 1).padStart(2, '0') + '. ' + String(d.getDate()).padStart(2, '0') + '.'; };
  const pct = (c, t) => t ? Math.round(c / t * 100) : 0;
  const lessonRange = ex => {
    const first = lessonOf(ex.lessons[0]), last = lessonOf(ex.lessons[ex.lessons.length - 1]);
    return first && last ? first.no + '–' + last.no + '. lecke' : '';
  };

  /* ── Dolgozatok listája (exam.html, azonosító nélkül) ── */
  function renderIndex() {
    const atts = loadAttempts();
    if (hero) hero.innerHTML = `
      <div class="module-hero-icon icon-glow-gold"><span lang="ja">試</span></div>
      <div class="module-hero-meta">
        <div class="module-meta-row"><span class="badge-jlpt">JLPT N5 → N4</span><span class="badge-group">Nem kötelező</span></div>
        <h1 class="module-page-title">Dolgozatok</h1>
        <p class="module-page-desc">Négy leckénként egy kis teszt (30 perc), tizenkét leckénként egy nagy dolgozat (60 perc). Minden kitöltés más kérdésekből áll, és elmentődik: látod, mennyit fejlődtél.</p>
      </div>`;
    runtime.classList.add('hidden');
    lobby.className = 'exam-index';
    lobby.innerHTML = EXAMS.map(ex => {
      const mine = atts.filter(a => a.exam === ex.id);
      const best = mine.reduce((m, a) => Math.max(m, pct(a.correct, a.total)), -1);
      const last = mine[mine.length - 1];
      return `
        <a class="exam-row glass-panel${ex.kind === 'big' ? ' is-big' : ''}${best >= PASS * 100 ? ' is-passed' : ''}" href="exam.html?id=${esc(ex.id)}">
          <span class="exam-row-glyph" lang="ja" aria-hidden="true">${esc(ex.glyph || '試')}</span>
          <span class="exam-row-text">
            <span class="exam-row-kicker">${ex.kind === 'big' ? 'Nagy dolgozat' : 'Kis teszt'} · ${examMinutes(ex)} perc · ${examCount(ex)} kérdés</span>
            <strong class="exam-row-title">${esc(ex.title)}</strong>
            <span class="exam-row-sub">${mine.length ? 'Legjobb: ' + best + '% · ' + mine.length + ' kitöltés · utoljára ' + fmtDate(last.ts) : 'Még nem írtad meg'}</span>
          </span>
          <span class="exam-row-score">${mine.length ? best + '%' : '–'}</span>
        </a>`;
    }).join('') || '<p class="lp-body">Még nincs dolgozat.</p>';
  }

  /* ── Lobbi: miből áll, beállítások, korábbi eredmények ── */
  function historyHtml(ex) {
    const mine = loadAttempts().filter(a => a.exam === ex.id);
    if (!mine.length) return '<div class="lobby-stats exam-history"><span class="exam-history-empty">Ezt a dolgozatot még nem írtad meg.</span></div>';
    const best = mine.reduce((m, a) => Math.max(m, pct(a.correct, a.total)), 0);
    const rows = mine.slice(-5).reverse().map(a => `
      <li class="exam-att">
        <span class="exam-att-date">${fmtDate(a.ts)}</span>
        <span class="exam-att-mode">${a.examMode ? 'vizsga' : 'gyakorló'}</span>
        <span class="exam-att-time">${fmtTime(a.durationMs)}</span>
        <strong class="exam-att-score${pct(a.correct, a.total) >= PASS * 100 ? ' is-ok' : ''}">${a.correct} / ${a.total} · ${pct(a.correct, a.total)}%</strong>
      </li>`).join('');
    const first = pct(mine[0].correct, mine[0].total), lastP = pct(mine[mine.length - 1].correct, mine[mine.length - 1].total);
    const trend = mine.length > 1 ? (lastP > first ? 'Az első kitöltés óta +' + (lastP - first) + ' százalékpont.' : lastP < first ? 'Az első kitöltésed ' + first + '% volt, a legutóbbi ' + lastP + '%.' : 'Az első és a legutóbbi kitöltésed egyformán ' + lastP + '%.') : '';
    return `
      <div class="lobby-stats exam-history">
        <div class="exam-history-head"><strong>Korábbi eredményeid</strong><span>Legjobb: ${best}% · ${mine.length} kitöltés</span></div>
        <ul class="exam-att-list">${rows}</ul>
        ${trend ? '<p class="exam-history-trend">' + trend + '</p>' : ''}
      </div>`;
  }
  function renderLobby() {
    const ex = exam;
    applyHelpers(false);
    const rev = reviewLessons(ex);
    if (hero) {
      hero.classList.remove('hidden');
      hero.innerHTML = `
        <div class="module-hero-icon icon-glow-gold"><span lang="ja">${esc(ex.glyph || '試')}</span></div>
        <div class="module-hero-meta">
          <div class="module-meta-row"><span class="badge-jlpt">${ex.kind === 'big' ? 'Nagy dolgozat' : 'Kis teszt'}</span><span class="badge-group">${examMinutes(ex)} perc · ${examCount(ex)} kérdés</span></div>
          <h1 class="module-page-title">${esc(ex.title)}</h1>
          <p class="module-page-desc">${esc(ex.desc || '')}</p>
        </div>`;
    }
    const plan = planSummary(ex);
    const sw = (key, title, text) => `
        <label class="cj-adapt-switch exam-switch">
          <input type="checkbox" data-exam-set="${key}"${settings[key] ? ' checked' : ''} />
          <span class="cj-adapt-text"><strong>${title}</strong><em>${text}</em></span>
        </label>`;
    runtime.classList.add('hidden');
    lobby.classList.remove('hidden');
    const saved = loadRun();
    const resumeHtml = !saved ? '' : `
      <div class="exam-resume" data-lobby-keep>
        <div class="exam-resume-text">
          <strong>Félbehagyott dolgozatod van</strong>
          <span>${saved.results.length} / ${saved.items.length} kérdés megvan${saved.examMode ? ' · ' + fmtTime(saved.leftMs) + ' van hátra (vizsga-mód)' : ' · gyakorló mód'}</span>
        </div>
        <div class="exam-resume-actions">
          <button class="btn btn-primary" id="examResume" type="button">Folytatom</button>
          <button class="btn btn-ghost" id="examDiscard" type="button">Eldobom</button>
        </div>
      </div>`;
    lobby.innerHTML = `
      ${resumeHtml}
      <div class="lobby-header">
        <h2 class="lobby-title">Mielőtt elkezded</h2>
        <p class="lobby-sub">${ex.lessons.length} lecke anyaga${rev.length ? ', és egy kevés ismétlés a korábbiakból' : ''}. Minden kitöltés más kérdésekből áll.</p>
      </div>
      <div class="lobby-section" data-lobby-keep>
        <div class="lobby-section-label">Miből áll</div>
        <ul class="exam-parts">
          ${SEC_ORDER.filter(s => plan[s] > 0).map(s => `<li class="exam-part"><span class="exam-part-name">${SECTIONS[s]}</span><span class="exam-part-n">${plan[s]} kérdés</span></li>`).join('')}
        </ul>
        <p class="exam-lessons">${ex.lessons.map(id => { const l = lessonOf(id); return l ? '<span class="exam-lesson-chip">' + esc(l.label ? l.title : l.no + '. ' + plain(l.title)) + '</span>' : ''; }).join('')}</p>
      </div>
      <div class="lobby-section" data-lobby-keep>
        <div class="lobby-section-label">Beállítások</div>
        ${sw('examMode', 'Vizsga-mód: időre', 'Fut az óra (' + examMinutes(ex) + ' perc), és csak a végén látod, mit találtál el: mint a JLPT-n. Kikapcsolva nincs idő, és minden kérdés után jön a magyarázat.')}
        ${sw('romaji', 'Romaji segítség', 'A japán szavak alatt látszik az átírás. Kikapcsolva csak a kana és a kanji marad.')}
        ${sw('hu', 'Magyar segítség', 'A mondatok alatt látszik a fordítás, ahol az nem maga a feladat.')}
        ${sw('audio', 'Hanggal', 'Van hallás rész: a mondatot meghallgatod. Kikapcsolva a hallás rész kimarad, a helyére olvasós kérdés kerül.')}
      </div>
      ${historyHtml(ex)}
      <button class="btn ${saved ? 'btn-outline' : 'btn-primary glow-effect'} ml-start" id="examStart" type="button">${saved ? 'Új kitöltés' : 'Kezdés'} — ${examCount(ex)} kérdés</button>`;
    if (saved) {
      document.getElementById('examResume').addEventListener('click', resumeExam);
      document.getElementById('examDiscard').addEventListener('click', () => { discardRun(); renderLobby(); });
    }
    lobby.querySelectorAll('[data-exam-set]').forEach(inp => inp.addEventListener('change', () => {
      settings[inp.dataset.examSet] = inp.checked;
      saveSettings();
      const partsEl = lobby.querySelector('.exam-parts');
      if (partsEl) { const p2 = planSummary(ex); partsEl.innerHTML = SEC_ORDER.filter(s => p2[s] > 0).map(s => `<li class="exam-part"><span class="exam-part-name">${SECTIONS[s]}</span><span class="exam-part-n">${p2[s]} kérdés</span></li>`).join(''); }
    }));
    document.getElementById('examStart').addEventListener('click', startExam);
  }

  /* ── A kör ─────────────────────────────────────────── */
  const run = { items: [], idx: 0, results: [], startTs: 0, endTs: 0, timer: 0, submitted: false, score: 0, done: true, examMode: false, retry: false };
  const cardEl = () => document.getElementById('examCard');
  const actionsEl = () => document.getElementById('examActions');
  const fbEl = () => document.getElementById('examFeedback');

  const examModeName = () => exam.kind === 'big' ? 'exam-big' : 'exam-quick';

  // A futó dolgozat mentése (eszköz-helyi): újratöltés, véletlen bezárás vagy kilépés után a lobbiból folytatható.
  // Az óra a távollét alatt áll: a hátralévő idő mentődik, nem a lejárat időpontja. A javító kör nem mentődik.
  function saveRun() {
    if (run.done || run.retry || !run.items.length) return;
    try {
      localStorage.setItem(RUN_KEY, JSON.stringify({
        exam: exam.id, savedTs: Date.now(), examMode: run.examMode, score: run.score,
        elapsedMs: Date.now() - run.startTs, leftMs: run.examMode ? Math.max(0, run.endTs - Date.now()) : 0,
        items: run.items.map(it => { const o = {}; Object.keys(it).forEach(k => { if (['pattern', 'picked', 'order', 'tray'].indexOf(k) < 0) o[k] = it[k]; }); return o; }),
        results: run.results.map(r => ({ key: r.key, sec: r.sec, lesson: r.lesson, kind: r.kind, correct: r.correct, errorCode: r.errorCode, given: r.given, answer: r.answer, i: run.items.indexOf(r.item) }))
      }));
    } catch (e) {}
  }
  function loadRun() {
    try {
      const st = JSON.parse(localStorage.getItem(RUN_KEY) || 'null');
      if (!st || !exam || st.exam !== exam.id || !Array.isArray(st.items) || !st.items.length) return null;
      if (Date.now() - st.savedTs > RUN_MAX_AGE || (st.results || []).length >= st.items.length) return null;
      return st;
    } catch (e) { return null; }
  }
  // az eldobott (vagy újrakezdéssel felülírt) félbehagyott dolgozat válaszai részmentésként a statisztikába kerülnek
  function discardRun() {
    let st = null;
    try { st = JSON.parse(localStorage.getItem(RUN_KEY) || 'null'); } catch (e) {}
    try { localStorage.removeItem(RUN_KEY); } catch (e) {}
    if (st && st.exam === (exam && exam.id) && st.results && st.results.length && window.NihonCoreStats) {
      NihonCoreStats.recordSession({ module: 'exam', mode: examModeName(), partial: true, skipPath: true, score: st.score || 0, startTs: Date.now() - (st.elapsedMs || 0),
        results: st.results.map(r => ({ correct: r.correct, errorCode: r.errorCode })) });
    }
  }
  const clearRun = () => { try { localStorage.removeItem(RUN_KEY); } catch (e) {} };

  function startExam() {
    const items = buildExam(exam);
    if (!items.length) return;
    discardRun();                              // új kitöltés: a korábbi félbehagyott lezárul
    run.items = items; run.results = []; run.score = 0;
    run.examMode = !!settings.examMode; run.retry = false;
    run.startTs = Date.now();
    run.endTs = run.examMode ? run.startTs + examMinutes(exam) * 60000 : 0;
    beginRun();
    saveRun();
  }
  function resumeExam() {
    const st = loadRun();
    if (!st) { renderLobby(); return; }
    run.items = st.items;
    run.results = st.results.map(r => Object.assign({}, r, { item: run.items[r.i] }));
    run.score = st.score || 0;
    run.examMode = !!st.examMode; run.retry = false;
    run.startTs = Date.now() - (st.elapsedMs || 0);
    run.endTs = run.examMode ? Date.now() + (st.leftMs || 0) : 0;
    beginRun();
  }
  // „Hibáim újra": a hibás kérdések gyakorló módban (idő nélkül, visszajelzéssel); nem számít kitöltésnek
  function startRetry(items) {
    if (!items.length) return;
    run.items = items.map(it => { const o = Object.assign({}, it); delete o.picked; delete o.order; delete o.tray; if (o.options) o.options = shuffle(o.options); return o; });
    run.results = []; run.score = 0;
    run.examMode = false; run.retry = true;
    run.startTs = Date.now(); run.endTs = 0;
    beginRun();
  }
  function beginRun() {
    run.idx = run.results.length; run.done = false;
    applyHelpers(true);
    // a félbehagyott dolgozat folytatható, ezért kilépéskor nem megy részmentés a statisztikába (csak a javító körnél)
    if (window.NihonCoreRound) NihonCoreRound.begin(() => ({ module: 'exam', mode: run.retry ? 'exam-retry' : examModeName(),
      results: run.retry ? run.results : [], score: run.score, startTs: run.startTs, skipPath: true }));
    lobby.classList.add('hidden');
    if (hero) hero.classList.add('hidden');
    runtime.classList.remove('hidden', 'exam-done');
    document.getElementById('examSummary').classList.add('hidden');
    document.getElementById('examStat1Label').textContent = run.examMode ? 'Idő' : 'Helyes';
    clearInterval(run.timer);
    if (run.examMode) run.timer = setInterval(tick, 1000);
    tick();
    if (run.idx >= run.items.length) finish(false); else renderCard();
  }
  function tick() {
    const v = document.getElementById('examStat1');
    if (!v) return;
    if (!run.examMode) { v.textContent = run.results.filter(r => r.correct).length; return; }
    const left = run.endTs - Date.now();
    v.textContent = fmtTime(left);
    v.classList.toggle('is-low', left <= 5 * 60000);
    if (left <= 0 && !run.done) finish(true);
  }
  function updateBar() {
    const n = run.items.length, it = run.items[run.idx];
    document.getElementById('examStat2').textContent = Math.min(run.idx + 1, n) + ' / ' + n;
    document.getElementById('examCount').textContent = it ? SEC_SHORT[it.sec] : '';
    document.getElementById('examFill').style.width = (run.idx / n * 100) + '%';
    if (!run.examMode) tick();
  }

  const eyebrow = it => `
      <div class="cj-prompt-eyebrow">
        <span class="cj-pe-group">${SECTIONS[it.sec]}</span>${it.lesson ? '<span class="cj-pe-dot">·</span>' + esc(lessonName(it.lesson)) : ''}
      </div>`;
  const huLine = it => it.hu ? `<div class="exam-hint-hu">${esc(it.hu)}</div>` : '';
  const romajiOf = jp => (Kana && /^[ぁ-ゖァ-ヺー]+$/.test(jp)) ? Kana.toRomaji(jp) : '';

  // a mondat tokenjei egy hiánnyal (partikula-kérdés)
  function blankSentence(it) {
    return it.sentence.tokens.map((t, i) => i === it.blank
      ? '<span class="exam-tokw is-blank"><span class="exam-blank">＿</span></span>'
      : `<span class="exam-tokw${t.type === 'particle' ? ' is-particle' : ''}"><span class="exam-tokw-jp" lang="ja">${esc(t.jp)}</span><span class="exam-tokw-romaji">${esc(t.type === 'particle' ? (romajiOf(t.jp) || t.romaji) : t.romaji)}</span></span>`).join('');
  }

  function renderCard() {
    run.submitted = false;
    const it = run.items[run.idx];
    updateBar();
    const fb = fbEl();
    fb.classList.add('hidden'); fb.innerHTML = '';
    const card = cardEl();
    card.className = 'conj-card glass-panel-heavy exam-card exam-card-' + it.kind;
    let body = '';
    if (it.type === 'choice') {
      const long = it.options.some(o => plain(o).length > 14);
      const jpBlock = it.kind === 'particle' ? `<div class="exam-sentence">${blankSentence(it)}</div>`
        : it.html ? `<div class="exam-jp" lang="ja">${it.html}</div>`
        : it.jp ? `<div class="exam-jp" lang="ja">${ruby(it.jp)}</div>${it.kind === 'read' && it.romaji ? '<div class="exam-jp-romaji">' + esc(it.romaji) + '</div>' : ''}` : '';
      const listenBlock = it.kind === 'listen' ? `
          <div class="lq-listen">
            <button class="lq-listen-btn" id="examPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
            <button class="btn btn-ghost lq-listen-slow" id="examSlow" type="button">Lassabban</button>
          </div>
          <div class="exam-jp exam-listen-text hidden" id="examListenText" lang="ja">${ruby(it.jpAfter)}</div>` : '';
      body = `
        <div class="cj-prompt">
          ${eyebrow(it)}
          <div class="lq-question">${ruby(it.prompt)}</div>
          ${jpBlock}${listenBlock}
          ${it.kind === 'particle' || it.kind === 'pattern' ? huLine(it) : ''}
        </div>
        <div class="cj-options lq-options${long ? ' lq-options-long' : ''}">
          ${it.options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}"><span class="lq-opt"${hasJp(o) ? ' lang="ja"' : ''}>${ruby(o)}</span>${romajiOf(o) ? '<span class="exam-opt-romaji">' + esc(romajiOf(o)) + '</span>' : ''}</button>`).join('')}
        </div>`;
    } else if (it.type === 'tokens') {
      it.order = [];
      it.tray = shuffle(it.sentence.tokens.map((t, i) => i));
      body = `
        <div class="cj-prompt">
          ${eyebrow(it)}
          <div class="lq-question">${esc(it.prompt)}</div>
          <div class="exam-task-hu">${esc(it.hu)}</div>
        </div>
        <div class="exam-answer" id="examAnswer" aria-label="A mondatod"></div>
        <div class="exam-tray" id="examTray" aria-label="Szavak"></div>`;
    } else {
      const target = it.kind === 'conj' ? `
          <div class="exam-verb"><span class="exam-verb-jp" lang="ja">${esc(it.verb.kanji)}</span><span class="exam-verb-kana" lang="ja">${esc(it.verb.kana)}</span><span class="exam-verb-romaji">${esc(it.verb.romaji)}</span><span class="exam-verb-hu">${esc(it.verb.meaningHu)}</span></div>
          <div class="cj-target"><span class="cj-target-label">Alak:</span><span class="cj-target-name">${esc(it.formName)}</span></div>`
        : `<div class="exam-jp" lang="ja">${it.html}</div>${huLine(it)}`;
      body = `
        <div class="cj-prompt">
          ${eyebrow(it)}
          <div class="lq-question">${esc(it.prompt)}</div>
          ${target}
        </div>
        <div class="cj-input-area">
          <input type="text" class="cj-input exam-input" id="examInput" lang="ja" placeholder="kanával vagy romajival" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" />
        </div>`;
    }
    card.innerHTML = body + '<button class="dont-know-btn" type="button">Nem tudom</button>';
    actionsEl().innerHTML = (it.type !== 'choice' || run.examMode)
      ? `<button class="btn btn-primary glow-effect cj-submit" id="examSubmit" type="button" disabled>${run.examMode ? 'Tovább' : 'Ellenőrzés'}</button>` : '';
    wireCard(it);
    if (window.NihonCoreRound) NihonCoreRound.scrollToRound();
  }

  function playItem(it, speed) {
    const btn = document.getElementById('examPlay');
    if (btn) btn.classList.add('is-playing');
    if (!window.NihonCoreAudio) { listenFailed(); return; }
    NihonCoreAudio.play(it.say, { speed: speed, onEnd: () => { if (btn) btn.classList.remove('is-playing'); }, onError: listenFailed });
  }
  // ha a hang nem megy, a mondat szövege jelenik meg: a kérdés így is megválaszolható
  function listenFailed() {
    const t = document.getElementById('examListenText'), btn = document.getElementById('examPlay');
    if (btn) btn.classList.remove('is-playing');
    if (t) t.classList.remove('hidden');
  }

  function wireCard(it) {
    const card = cardEl();
    const submit = document.getElementById('examSubmit');
    card.querySelector('.dont-know-btn').addEventListener('click', () => { if (!run.submitted) answer(it, null, true); });
    if (it.type === 'choice') {
      const buttons = card.querySelectorAll('.cj-option');
      buttons.forEach(btn => btn.addEventListener('click', () => {
        if (run.submitted) return;
        const i = parseInt(btn.dataset.idx, 10);
        if (!run.examMode) { answer(it, it.options[i], false, btn); return; }
        // vizsga-módban a választás a „Tovább"-ig módosítható
        buttons.forEach(b => b.classList.toggle('is-picked', b === btn));
        it.picked = i;
        if (submit) submit.disabled = false;
      }));
      if (submit) submit.addEventListener('click', () => { if (!run.submitted && it.picked != null) answer(it, it.options[it.picked], false); });
      if (it.kind === 'listen') {
        document.getElementById('examPlay').addEventListener('click', () => playItem(it, 0.9));
        document.getElementById('examSlow').addEventListener('click', () => playItem(it, 0.65));
        playItem(it, 0.9);
      }
    } else if (it.type === 'tokens') {
      const paint = () => {
        const tok = (i, where) => { const t = it.sentence.tokens[i]; return `<button class="exam-tok${t.type === 'particle' ? ' is-particle' : ''}" type="button" data-tok="${i}" data-where="${where}"><span class="exam-tok-jp" lang="ja">${esc(t.jp)}</span><span class="exam-tok-romaji">${esc(t.romaji)}</span></button>`; };
        document.getElementById('examAnswer').innerHTML = it.order.map(i => tok(i, 'answer')).join('') || '<span class="exam-answer-hint">Koppints a szavakra a kívánt sorrendben.</span>';
        document.getElementById('examTray').innerHTML = it.tray.filter(i => it.order.indexOf(i) < 0).map(i => tok(i, 'tray')).join('');
        if (submit) submit.disabled = it.order.length !== it.sentence.tokens.length;
      };
      // a kezelő a kártya saját tárolóin él (a következő kártya újakat kap)
      const onTok = e => {
        const b = e.target.closest ? e.target.closest('.exam-tok') : null;
        if (!b || run.submitted) return;
        const i = parseInt(b.dataset.tok, 10);
        if (b.dataset.where === 'tray') it.order.push(i); else it.order = it.order.filter(x => x !== i);
        paint();
      };
      document.getElementById('examAnswer').addEventListener('click', onTok);
      document.getElementById('examTray').addEventListener('click', onTok);
      paint();
      if (submit) submit.addEventListener('click', () => { if (!run.submitted) answer(it, it.order.slice(), false); });
    } else {
      const input = document.getElementById('examInput');
      if (Kana && Kana.bindInput) Kana.bindInput(input);
      input.addEventListener('input', () => { if (submit) submit.disabled = !input.value.trim(); });
      input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing && input.value.trim() && !run.submitted) { e.preventDefault(); answer(it, input.value, false); } });
      if (submit) submit.addEventListener('click', () => { if (!run.submitted && input.value.trim()) answer(it, input.value, false); });
      setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e) {} }, 60);
    }
  }

  // beírt válasz: kana vagy romaji; a kiejtés szerint írt partikula és a kanjis alak is jó
  const normKana = s => hira(String(s || '')).replace(/[\s　、。？！?!「」・]/g, '');
  function checkTyped(it, raw) {
    const target = normKana(it.answerKana);
    let u = String(raw || '').trim();
    if (Kana) u = Kana.liveKana(u, true);
    const un = normKana(u);
    if (it.answerAlt && un === normKana(it.answerAlt)) return { ok: true, shown: u };
    if (it.answerAlts && it.answerAlts.some(a => normKana(a) === un)) return { ok: true, shown: u };     // másik helyes alak (ではありません)
    const fixed = Kana ? Kana.repairSpoken(un, target) : un;
    return { ok: fixed === target, shown: u };
  }

  function answer(it, given, dontKnow, btn) {
    run.submitted = true;
    let ok = false, shown = '';
    if (!dontKnow) {
      if (it.type === 'choice') { ok = given === it.answer; shown = given; }
      else if (it.type === 'tokens') { ok = !!(Puzzle && Puzzle.validate(given, it.sentence).valid); shown = given.map(i => it.sentence.tokens[i].jp).join(' '); }
      else { const r = checkTyped(it, given); ok = r.ok; shown = r.shown; }
    }
    const correctText = it.type === 'tokens' ? it.sentence.tokens.map(t => t.jp).join(' ') : it.type === 'typed' ? it.answerShow : it.answer;
    run.results.push({ key: it.key, sec: it.sec, lesson: it.lesson, kind: it.kind, correct: ok, errorCode: ok ? null : (dontKnow ? 'dont_know' : 'wrong_choice'),
      given: shown, answer: correctText, item: it });
    if (ok) run.score += 10;
    if (!ok && it.kind === 'quiz' && window.NihonCoreSRS) { try { NihonCoreSRS.recordReview(it.key, 0); } catch (e) {} }
    if (window.NihonCoreAudio && NihonCoreAudio.stop) NihonCoreAudio.stop();
    saveRun();
    if (run.examMode) { next(); return; }
    showFeedback(it, ok, dontKnow, shown, correctText, btn);
  }

  function showFeedback(it, ok, dontKnow, shown, correctText, btn) {
    const card = cardEl();
    card.querySelectorAll('.cj-option, .dont-know-btn, .exam-tok, #examInput').forEach(b => { b.disabled = true; });
    const sb = document.getElementById('examSubmit');
    if (sb) sb.disabled = true;
    if (it.type === 'choice') {
      const buttons = card.querySelectorAll('.cj-option');
      if (btn) btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) buttons[it.options.indexOf(it.answer)].classList.add('reveal-correct');
      if (it.kind === 'listen') listenFailed();          // a válasz után a mondat szövege is látszik
    } else if (it.type === 'typed') {
      const input = document.getElementById('examInput');
      if (input) input.classList.add(ok ? 'cnh-input-correct' : 'cnh-input-wrong');
    }
    const isLast = run.idx + 1 >= run.items.length;
    const fb = fbEl();
    fb.className = 'conj-feedback ' + (ok ? 'pr-fb-correct' : dontKnow ? 'pr-fb-dontknow' : 'pr-fb-wrong');
    const jpAns = hasJp(correctText);
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${ok ? '✅' : dontKnow ? '💡' : '🤔'}</span>
        <span class="pr-fb-title">${ok ? 'Így van' : dontKnow ? 'Ez a helyes' : 'Nézzük meg együtt'}</span>
      </div>
      <div class="pr-fb-explain">
        ${ok && it.type !== 'tokens' ? '' : `<div class="pfe-row pfe-correct">
          <span class="pfe-label">Helyes</span>
          <span class="pfe-text"><strong class="${jpAns ? 'pfe-jp-ok' : ''}"${jpAns ? ' lang="ja"' : ''}>${ruby(correctText)}</strong>${it.answerRomaji ? ' <span class="pfe-roman">(' + esc(it.answerRomaji) + ')</span>' : ''}</span>
        </div>`}
        ${!ok && shown ? `<div class="pfe-row pfe-wrong">
          <span class="pfe-label">A te válaszod</span>
          <span class="pfe-text"${hasJp(shown) ? ' lang="ja"' : ''}>${esc(shown)}</span>
        </div>` : ''}
        ${it.kind === 'puzzle' || it.kind === 'read' || it.kind === 'listen' ? '' : `<div class="pfe-row pfe-context">
          <span class="pfe-label">Miért?</span>
          <span class="pfe-text">${ruby(it.why || '')}</span>
        </div>`}
        ${it.kind === 'read' || it.kind === 'listen' ? `<div class="pfe-row pfe-context">
          <span class="pfe-label">A mondat</span>
          <span class="pfe-text" lang="ja">${ruby(it.ex.jp)}${it.ex.romaji ? ' <span class="pfe-roman">(' + esc(it.ex.romaji) + ')</span>' : ''}</span>
        </div>` : ''}
      </div>
      <button class="btn btn-primary cj-next" id="examNext" type="button">${isLast ? 'Eredmény' : 'Következő'}</button>`;
    document.getElementById('examNext').addEventListener('click', next);
    tick();
  }

  function next() {
    run.idx++;
    if (run.idx >= run.items.length) finish(false);
    else renderCard();
  }

  /* ── Befejezés, mentés, eredmény ──────────────────── */
  function finish(timeUp) {
    if (run.done) return;
    run.done = true;
    clearInterval(run.timer);
    if (window.NihonCoreAudio && NihonCoreAudio.stop) NihonCoreAudio.stop();
    // ami az idő lejártáig nem került sorra, az megválaszolatlan (hibának számít)
    for (let i = run.results.length; i < run.items.length; i++) {
      const it = run.items[i];
      run.results.push({ key: it.key, sec: it.sec, lesson: it.lesson, kind: it.kind, correct: false, errorCode: 'timeout', given: '',
        answer: it.type === 'tokens' ? it.sentence.tokens.map(t => t.jp).join(' ') : it.type === 'typed' ? it.answerShow : it.answer, item: it });
    }
    const total = run.results.length, correct = run.results.filter(r => r.correct).length;
    const sections = {}, lessons = {};
    run.results.forEach(r => {
      (sections[r.sec] = sections[r.sec] || [0, 0])[1]++; if (r.correct) sections[r.sec][0]++;
      if (r.lesson) { (lessons[r.lesson] = lessons[r.lesson] || [0, 0])[1]++; if (r.correct) lessons[r.lesson][0]++; }
    });
    const durationMs = Math.max(0, Date.now() - run.startTs);
    if (run.retry) {
      if (window.NihonCoreStats) NihonCoreStats.recordSession({ module: 'exam', mode: 'exam-retry', skipPath: true, score: run.score, startTs: run.startTs,
        results: run.results.map(r => ({ correct: r.correct, errorCode: r.errorCode })) });
      showRetrySummary();
      return;
    }
    clearRun();
    const att = {
      id: 'e' + Date.now() + Math.random().toString(36).slice(2, 7), ts: Date.now(), exam: exam.id, kind: exam.kind,
      examMode: !!run.examMode, timeUp: !!timeUp, durationMs: durationMs, limitMs: run.examMode ? examMinutes(exam) * 60000 : 0,
      total: total, correct: correct, sections: sections, lessons: lessons,
      opts: { romaji: !!settings.romaji, hu: !!settings.hu, audio: !!settings.audio },
      wrong: run.results.filter(r => !r.correct).slice(0, 60).map(r => ({ k: r.key, s: r.sec, l: r.lesson, c: r.errorCode }))
    };
    saveAttempt(att);
    if (window.NihonCoreStats) {
      NihonCoreStats.recordSession({ module: 'exam', mode: examModeName(),
        results: run.results.map(r => ({ correct: r.correct, errorCode: r.errorCode })), score: run.score, startTs: run.startTs, skipPath: true });
    }
    markPathStep(exam.id, total ? correct / total : 0);
    if (window.NihonCoreSync && NihonCoreSync.schedulePush) NihonCoreSync.schedulePush();
    showSummary(att, timeUp);
  }

  function reviewRow(r) {
    const it = r.item;
    const q = it.kind === 'conj' ? esc(it.verb.kanji) + ' → ' + esc(it.formName)
      : it.kind === 'particle' ? '<span lang="ja">' + it.sentence.tokens.map((t, i) => i === it.blank ? '＿' : esc(t.jp)).join(' ') + '</span>'
      : it.kind === 'puzzle' ? esc(it.hu)
      : it.kind === 'listen' ? '<span lang="ja">' + ruby(it.ex.jp) + '</span>'
      : it.html ? '<span lang="ja">' + it.html + '</span>'
      : it.jp ? esc(plain(it.prompt)) + ' <span lang="ja">' + ruby(it.jp) + '</span>' : ruby(it.prompt);
    return `
      <li class="exam-rev">
        <div class="exam-rev-q">${q}</div>
        <div class="exam-rev-a"><span class="exam-rev-label">Helyes</span><strong${hasJp(r.answer) ? ' lang="ja"' : ''}>${ruby(r.answer)}</strong></div>
        ${r.given ? `<div class="exam-rev-g"><span class="exam-rev-label">A te válaszod</span><span${hasJp(r.given) ? ' lang="ja"' : ''}>${esc(r.given)}</span></div>`
                  : `<div class="exam-rev-g"><span class="exam-rev-label">${r.errorCode === 'timeout' ? 'Nem jutott rá idő' : 'Nem válaszoltál'}</span></div>`}
        ${it.why && it.kind !== 'read' && it.kind !== 'listen' ? `<div class="exam-rev-why">${ruby(it.why)}</div>` : ''}
        <div class="exam-rev-meta">${SECTIONS[r.sec]}${r.lesson ? ' · ' + esc(lessonName(r.lesson)) : ''}</div>
      </li>`;
  }
  function showSummary(att, timeUp) {
    applyHelpers(false);
    const p = pct(att.correct, att.total), passed = p >= PASS * 100;
    const mine = loadAttempts().filter(a => a.exam === exam.id);
    const prev = mine.length > 1 ? mine[mine.length - 2] : null;
    const prevP = prev ? pct(prev.correct, prev.total) : null;
    const weak = Object.keys(att.lessons).filter(l => pct(att.lessons[l][0], att.lessons[l][1]) < PASS * 100 && att.lessons[l][1] >= 2)
      .sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
    const wrong = run.results.filter(r => !r.correct);
    cardEl().innerHTML = ''; actionsEl().innerHTML = '';
    fbEl().classList.add('hidden');
    runtime.classList.add('exam-done');
    const sEl = document.getElementById('examSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${p === 100 ? '🏆' : passed ? '🎯' : '🌱'}</div>
      <h3>${timeUp ? 'Lejárt az idő' : passed ? 'Megvan a dolgozat' : 'Ez most még nem lett meg'}</h3>
      <div class="summary-score">${att.correct} / ${att.total}<small> · ${p}%</small></div>
      <p class="lq-summary-note">${passed ? 'A dolgozathoz 60% kell: megvan.' : 'A dolgozathoz 60% kell. Nézd át a hibáidat, és írd meg újra: más kérdéseket kapsz.'}
        ${prevP !== null ? ' Az előző kitöltésed ' + prevP + '% volt' + (p > prevP ? ': +' + (p - prevP) + ' százalékpont.' : p < prevP ? '.' : ', most is annyi.') : ''}</p>
      <div class="exam-sum-meta">
        <span class="exam-sum-chip">Idő: ${fmtTime(att.durationMs)}${att.limitMs ? ' / ' + fmtTime(att.limitMs) : ''}</span>
        <span class="exam-sum-chip">${att.examMode ? 'Vizsga-mód' : 'Gyakorló mód'}</span>
      </div>
      <div class="exam-sum-block">
        <div class="lp-block-title">Részenként</div>
        ${SEC_ORDER.filter(s => att.sections[s]).map(s => { const v = att.sections[s], q = pct(v[0], v[1]); return `
          <div class="exam-bar-row"><span class="exam-bar-name">${SECTIONS[s]}</span>
            <span class="exam-bar"><span class="exam-bar-fill${q >= PASS * 100 ? ' is-ok' : ''}" style="width:${q}%"></span></span>
            <span class="exam-bar-val">${v[0]} / ${v[1]}</span></div>`; }).join('')}
      </div>
      <div class="exam-sum-block">
        <div class="lp-block-title">Leckénként</div>
        <div class="exam-lesson-grid">
          ${Object.keys(att.lessons).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).map(l => { const v = att.lessons[l], q = pct(v[0], v[1]); return `<a class="exam-lesson${q >= PASS * 100 ? ' is-ok' : ' is-weak'}" href="lesson.html?id=${esc(l)}" title="${esc(lessonName(l))}"><span class="exam-lesson-name">${esc(lessonName(l))}</span><span class="exam-lesson-val">${v[0]} / ${v[1]}</span></a>`; }).join('')}
        </div>
        ${weak.length ? '<p class="exam-weak">Ezeket érdemes átismételni: ' + weak.map(l => esc(lessonName(l))).join(', ') + '. (A lecke nevére koppintva megnyílik.)</p>' : ''}
      </div>
      ${wrong.length ? `
      <details class="exam-review"${wrong.length <= 6 ? ' open' : ''}>
        <summary class="exam-review-sum">Hibáid és a helyes válaszok (${wrong.length})</summary>
        <ul class="exam-rev-list">${wrong.map(reviewRow).join('')}</ul>
      </details>` : '<p class="exam-weak">Hibátlan: minden kérdést eltaláltál.</p>'}
      <div class="kana-summary-actions">
        ${wrong.length ? '<button class="btn btn-primary" id="examRetry" type="button">Hibáim újra (' + wrong.length + ')</button>' : ''}
        <button class="btn ${wrong.length ? 'btn-outline' : 'btn-primary'}" id="examAgain" type="button">Megírom újra</button>
        <a class="btn btn-outline" href="../index.html#path" data-no-guard>Vissza az útra</a>
        <a class="btn btn-ghost" href="exam.html" data-no-guard>Minden dolgozat</a>
      </div>`;
    document.getElementById('examAgain').addEventListener('click', backToLobby);
    const rb = document.getElementById('examRetry');
    if (rb) rb.addEventListener('click', () => startRetry(wrong.map(r => r.item)));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function showRetrySummary() {
    applyHelpers(false);
    const total = run.results.length, correct = run.results.filter(r => r.correct).length;
    const still = run.results.filter(r => !r.correct);
    cardEl().innerHTML = ''; actionsEl().innerHTML = '';
    fbEl().classList.add('hidden');
    runtime.classList.add('exam-done');
    const sEl = document.getElementById('examSummary');
    sEl.classList.remove('hidden');
    sEl.classList.add('glass-panel-heavy');
    sEl.innerHTML = `
      <div class="summary-icon">${still.length ? '🌱' : '🎯'}</div>
      <h3>Hibáid újra</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="lq-summary-note">${still.length ? 'Még ' + still.length + ' kérdés nem ment: ezeket újra megnézheted.' : 'Most mindegyik megvan. A dolgozat eredménye ettől nem változik: ha javítanál rajta, írd meg újra.'}</p>
      <div class="kana-summary-actions">
        ${still.length ? '<button class="btn btn-primary" id="examRetry" type="button">A maradék újra (' + still.length + ')</button>' : ''}
        <button class="btn ${still.length ? 'btn-outline' : 'btn-primary'}" id="examAgain" type="button">Vissza a dolgozathoz</button>
        <a class="btn btn-ghost" href="../index.html#path" data-no-guard>Vissza az útra</a>
      </div>`;
    document.getElementById('examAgain').addEventListener('click', backToLobby);
    const rb = document.getElementById('examRetry');
    if (rb) rb.addEventListener('click', () => startRetry(still.map(r => r.item)));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function backToLobby() {
    clearInterval(run.timer);
    run.done = true;
    runtime.classList.add('hidden');
    runtime.classList.remove('exam-done');
    document.getElementById('examSummary').classList.add('hidden');
    renderLobby();
    if (window.NihonCoreRound) NihonCoreRound.refresh();
  }

  // Kilépés kör közben: a kör-őr megerősítést kér. A dolgozat állása elmentve marad: a lobbiból folytatható
  // (vagy eldobható — akkor az addigi válaszok részmentésként a statisztikába kerülnek).
  const exitBtn = document.getElementById('examExit');
  if (exitBtn) exitBtn.addEventListener('click', () => {
    saveRun();
    if (window.NihonCoreRound) NihonCoreRound.flush();
    if (window.NihonCoreAudio && NihonCoreAudio.stop) NihonCoreAudio.stop();
    backToLobby();
  });
  // az óra állása akkor is mentődjön, ha a lap háttérbe kerül vagy bezárul
  window.addEventListener('pagehide', saveRun);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveRun(); });

  if (exam) renderLobby(); else renderIndex();
  if (window.NihonCoreRound) NihonCoreRound.refresh();

  window._exam = { exam, buildExam, candidates, sentencesFor, conjSetup, reviewLessons, checkTyped, run, settings, startExam, finish, loadAttempts,
    saveRun, loadRun, resumeExam, startRetry,
    show: i => { run.idx = i; renderCard(); } };
}


/* ====================================================
   10. PAGE DETECTOR — egy oldal-init futtatása ─────
   ----------------------------------------------------
   A switch egy függvénybe csomagolva (window.NihonCoreInitPage).
   ==================================================== */

function initCurrentPage() {
  if (document.getElementById('statsMain')) {
    initStatsPage();
  } else if (document.getElementById('examMain')) {
    initExamPage();
  } else if (document.getElementById('kanaMain')) {
    initKanaPage();
  } else if (document.getElementById('lessonMain')) {
    initLessonPage();
  } else if (document.getElementById('prodMain')) {
    initProductionPage();
  } else if (document.getElementById('grmMain')) {
    initGrammarPage();
  } else if (document.getElementById('listeningMain')) {
    initListeningPage();
  } else if (document.getElementById('dtMain')) {
    initDateTimePage();
  } else if (document.getElementById('adjMain')) {
    initAdjectivesPage();
  } else if (document.getElementById('conjugationMain')) {
    initConjugationPage();
  } else if (document.getElementById('moduleMain')) {
    initModulePage();
  } else if (document.getElementById('practiceMain')) {
    initPracticePage();
  } else if (document.querySelector('.auth-card')) {
    initAuthPages();
  } else if (document.getElementById('homeMain')) {
    initLanding();
  }
  // pages/modules.html (#modulesMain): statikus kártyarács — csak az univerzális részek futnak.
  // V18: modul-név fejléc-badge + hero-observer (kör-őr) frissítése
  if (window.NihonCoreRound && NihonCoreRound.refresh) NihonCoreRound.refresh();
}

// Kezdeti init
initCurrentPage();
window.NihonCoreInitPage = initCurrentPage;
