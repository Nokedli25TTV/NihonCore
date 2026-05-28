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

// ── Barba.js SPA oldalváltás (V8) ──
//   Finom fade transition az oldalak között (NEM vakító fehér reload).
//   Csak akkor aktiválódik, ha a window.barba elérhető (CDN sikeres betöltés).
//   A page-detector (window.NihonCoreInitPage) afterEnter-ben újra-hívódik.
(function initBarbaSPA() {
  // Várjuk meg, amíg a Barba CDN betölt (defer-rel) — DOMContentLoaded után
  function setup() {
    if (typeof window.barba === 'undefined') return;
    // file:// protokollon a Barba AJAX-fetchje CORS-blokkolt — ne aktiváljuk
    if (window.location.protocol === 'file:') return;

    try {
      window.barba.init({
        debug: false,
        timeout: 5000,
        // V21: a [data-barba-prevent] linkeket a böngésző natívan navigálja
        // (pl. a user-menü Statisztika/Kezdőlap linkjei — a Barba AJAX-fetch
        //  elakadt rajtuk a modul-oldalakon).
        prevent: ({ el }) => el && el.hasAttribute && el.hasAttribute('data-barba-prevent'),
        transitions: [{
          name: 'zen-fade',
          leave({ current }) {
            // Eltüntetés (140ms ease-out)
            return new Promise(resolve => {
              if (window.anime) {
                window.anime({
                  targets: current.container,
                  opacity: [1, 0],
                  translateY: [0, 6],
                  duration: 140,
                  easing: 'easeOutQuad',
                  complete: resolve
                });
              } else {
                current.container.style.transition = 'opacity 140ms ease-out';
                current.container.style.opacity = '0';
                setTimeout(resolve, 140);
              }
            });
          },
          enter({ next }) {
            // Bejövetel (180ms ease-out)
            window.scrollTo(0, 0);
            return new Promise(resolve => {
              if (window.anime) {
                next.container.style.opacity = '0';
                next.container.style.transform = 'translateY(-6px)';
                window.anime({
                  targets: next.container,
                  opacity: [0, 1],
                  translateY: [-6, 0],
                  duration: 180,
                  easing: 'easeOutCubic',
                  complete: () => {
                    next.container.style.transform = '';
                    resolve();
                  }
                });
              } else {
                next.container.style.opacity = '0';
                next.container.style.transition = 'opacity 180ms ease-out';
                requestAnimationFrame(() => {
                  next.container.style.opacity = '1';
                  setTimeout(resolve, 180);
                });
              }
            });
          }
        }],
        // Az új oldal renderelése után újraindítjuk a page-init-et
        hooks: {
          afterEnter() {
            if (typeof window.NihonCoreInitPage === 'function') {
              try { window.NihonCoreInitPage(); } catch (e) { /* csendes */ }
            }
            // V8: a téma-toggle gombot újra-injektáljuk az új page-en
            if (window.NihonCoreTheme && window.NihonCoreTheme.inject) {
              try { window.NihonCoreTheme.inject(); } catch (e) {}
            }
            // Az új oldal data-script-jei (data/*.js) is bekerülnek a body-ba
            // → de mivel a Barba a body-n KÍVÜLI dolgokat nem cseréli, a globális
            //   NIHONCORE_* már megmaradt az első page-load-tól. A header és footer
            //   sem cserélődik (kívül vannak a [data-barba="wrapper"]-en).
            // A SW-cache miatt az új page is gyors.
          }
        }
      });
    } catch (e) {
      // Csendes — ha a Barba nem inicializálható, a normál multi-page reload marad
      console && console.warn && console.warn('[Barba] init skipped:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();


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
  }
  function isActive() { return _active; }
  function markComplete() { _recorded = true; _active = false; }

  function flush() {
    if (!_active || _recorded || !_snapshot) { _active = false; return; }
    try {
      var info = _snapshot();
      if (info && info.results && info.results.length > 0 &&
          window.NihonCoreStats && NihonCoreStats.recordSession) {
        _recorded = true;
        NihonCoreStats.recordSession(info);   // markComplete a recordSession-ben fut le
      }
    } catch (e) {}
    _active = false;
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

  // initCurrentPage (kezdeti + Barba afterEnter) hívja
  function refresh() { refreshBadge(); attachHeroObserver(); }

  // ── Req 1 — navigációs őr (capture — a Barba elé fut) ──
  function onClick(e) {
    if (!_active) return;
    var a = (e.target && e.target.closest) ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.closest('.round-exit')) return;            // saját confirm-je van
    if (a.hasAttribute('data-no-guard')) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
    if (confirm(EXIT_MSG)) {
      flush();                                        // megerősítve → mentsük a részeredményt
    } else {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
  }

  function init() {
    document.addEventListener('click', onClick, true);
    window.addEventListener('beforeunload', function (e) {
      if (_active) { e.preventDefault(); e.returnValue = ''; return ''; }
    });
    window.addEventListener('pagehide', function () { if (_active) flush(); });
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { begin: begin, isActive: isActive, markComplete: markComplete, flush: flush, refresh: refresh };
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
            ${state.sessionStats.no > 0 ? 'A "Még nem"-mel jelzett kártyákat a szűrő segítségével később újra átnézheted.' : 'Mind ismerős! Próbáld ki a Recognition vagy Build módot.'}
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
        <div class="nc-fc-overlay-title">📖 Szótár-böngészés</div>
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
    if (meta) meta.setAttribute('content', t === 'sumi' ? '#1B1B22' : '#F3EEE3');
    // Frissítsd minden injektált toggle-gomb ikonját
    document.querySelectorAll('.ht-theme-btn').forEach(btn => {
      btn.classList.toggle('active', t === 'sumi');
      const icon = btn.querySelector('.ht-theme-icon');
      if (icon) icon.textContent = t === 'sumi' ? '☀️' : '🌙';
      btn.setAttribute('title', t === 'sumi' ? 'Világos téma' : 'Sötét téma');
    });
    // Eltávolítjuk a transition class-t a tranzíció után — különben minden mozgás 220ms lenne
    setTimeout(() => root.classList.remove('theme-transition'), 260);
  }
  function toggle() {
    setTheme(getTheme() === 'sumi' ? 'washi' : 'sumi');
  }

  // Beilleszt egy 🌙/☀️ gombot a meglévő helpers-bar-ba (ha még nincs ott)
  function injectThemeButton() {
    const bars = document.querySelectorAll('.helpers-bar .helpers-toggle');
    bars.forEach(barEl => {
      if (barEl.querySelector('.ht-theme-btn')) return;
      const t = getTheme();
      const btn = document.createElement('button');
      btn.className = 'ht-btn ht-theme-btn' + (t === 'sumi' ? ' active' : '');
      btn.type = 'button';
      btn.setAttribute('data-helper', 'theme');
      btn.setAttribute('title', t === 'sumi' ? 'Világos téma' : 'Sötét téma');
      btn.innerHTML = `<span class="ht-theme-icon">${t === 'sumi' ? '☀️' : '🌙'}</span>Téma`;
      btn.addEventListener('click', toggle);
      barEl.appendChild(btn);
    });
  }

  // Az index.html-en nincs helpers-bar — oda a nav-ba teszünk gombot.
  function injectIndexButton() {
    // Csak akkor, ha nincs helpers-bar (NEM modul-page) ÉS van .auth-buttons
    if (document.querySelector('.helpers-bar')) return;
    const authBtns = document.querySelector('.auth-buttons');
    if (!authBtns || authBtns.querySelector('.theme-toggle-nav')) return;
    const t = getTheme();
    const btn = document.createElement('button');
    btn.className = 'btn-home theme-toggle-nav';
    btn.type = 'button';
    btn.setAttribute('title', t === 'sumi' ? 'Világos téma' : 'Sötét téma');
    btn.setAttribute('aria-label', 'Téma váltása');
    btn.style.background = 'transparent';
    btn.style.border = '1px solid var(--washi-edge)';
    btn.style.borderRadius = '999px';
    btn.style.padding = '8px 10px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1rem';
    btn.style.color = 'var(--sumi)';
    btn.innerHTML = `<span class="ht-theme-icon">${t === 'sumi' ? '☀️' : '🌙'}</span>`;
    btn.addEventListener('click', toggle);
    // A 🏠 gomb ELÉ szúrjuk
    const home = authBtns.querySelector('.btn-home');
    if (home) authBtns.insertBefore(btn, home);
    else      authBtns.appendChild(btn);
  }

  function setup() {
    injectThemeButton();
    injectIndexButton();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // Barba.js afterEnter-hez: a navigáció után újra-injektáljuk a gombot
  // (de a body-szinten meglévők megmaradnak)
  window.NihonCoreTheme = { get: getTheme, set: setTheme, toggle: toggle, inject: setup };
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
          <a class="nc-user-menu-link" href="${statsHref()}" data-barba-prevent>📊 Statisztika</a>
          <a class="nc-user-menu-link" href="${homeHref()}" data-barba-prevent>🏠 Kezdőlap</a>
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

      // V22 fix: a menü-linkek explicit JS-navigációval — megkerüli a Barba
      // AJAX-elfogását ÉS a document click-listener interferenciáját.
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

  function stop() {
    if (current) {
      try { current.pause(); current.currentTime = 0; } catch (e) {}
      current = null;
    }
  }

  // Lejátszás. Promise-t ad vissza; hiba esetén onError() hívódik
  // (de a Promise nem dob — a hívó UI-ja nem törik el).
  function play(text, options) {
    options = options || {};
    stop();
    const audio = getAudio(text);
    audio.playbackRate = options.speed || 1.0;
    try { audio.currentTime = 0; } catch (e) {}
    current = audio;

    let errored = false;
    const onErr = () => {
      if (errored) return;
      errored = true;
      if (typeof options.onError === 'function') options.onError();
    };
    audio.addEventListener('error', onErr, { once: true });

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
  let lastSpoke = { text: '', at: 0 };
  function speakAnswer(text) {
    if (!text) return;
    if (localStorage.getItem('nihoncore_audio_on') !== '1') return;
    // Csak a japán karakterek maradnak — a romaji / zárójel / ✓ / szóköz
    // kiesik (a feedback .pfe-jp-ok néha romaji-t is tartalmaz mellette).
    const jp = String(text).replace(/[^぀-ヿ一-龯]/g, '');
    if (!jp) return;
    const now = Date.now();
    if (jp === lastSpoke.text && now - lastSpoke.at < 1500) return;
    lastSpoke = { text: jp, at: now };
    play(jp, { speed: 0.95, onError: function () {} });
  }

  return { play, preload, stop, speakAnswer, buildUrl, _cache: cache };
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
  const JP = /[぀-ヿ一-龯]/;   // van-e japán karakter

  function findAnswer(node) {
    const hits = [];
    if (node.matches && node.matches('.pfe-jp-ok')) hits.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll('.pfe-jp-ok').forEach(e => hits.push(e));
    }
    for (const el of hits) {
      const t = (el.textContent || '').trim();
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
      errorCodes: errorCodes
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

  return { recordSession, getSessions, getDailyAggregates, clearSessions };
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
    recordReview, getItemState, getStateBatch, getDueItems,
    aggregateBoxes, resetItem, clearScope, clearAll,
    INTERVALS_DAYS, MAX_BOX
  };
})();


/* ====================================================
   2. LANDING (index.html) ─────────────────────────
   ==================================================== */

function initLanding() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav     = document.getElementById('mobileNav');

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      mobileMenuBtn?.classList.remove('open');
    });
  });

  // Scroll reveal animáció (Emil-szabály: 50ms stagger gyors, koherens érzet)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 50);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.section-header, .module-card, .feature-item, .demo-lesson, .hero-stats .stat, .cta-inner'
  ).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Smooth anchor scroll (in-page anchorok)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // Progress sávok animációja láthatóságkor
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.lesson-fill, .card-progress-fill').forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            setTimeout(() => { bar.style.width = targetWidth; }, 100);
          });
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-demo, .card-main').forEach(el => {
    progressObserver.observe(el);
  });

  // Aktív nav-link a görgetéssel
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));
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
        <p class="exp-jp">${exp.jp}</p>
        <div class="exp-divider"></div>
        <p class="exp-hu">${exp.hu}</p>
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
        const cls = c.enabled ? 'ml-cat-btn active' : 'ml-cat-btn ml-cat-btn-locked';
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
          <div class="lobby-eyebrow">Phase 2 · Beállítások</div>
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
        ${matrixState.taskIdx + 1 < matrixState.taskQueue.length ? 'Következő feladat →' : 'Eredmények megtekintése →'}
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
        <h3>Phase 2 — Kész</h3>
        <div class="summary-score">${correct} / ${total} <span class="summary-pct">(${pct}%)</span></div>
        <p class="summary-blurb">
          ${pct === 100 ? 'Minden helyes! Kész vagy a Speed Drillre. 💪'
            : pct >= 60 ? 'Szép munka. Nézd át a hibás feladatokat és próbálj újra!'
                        : 'Még gyakorlás kell — térj vissza Phase 1-re átismételni.'}
        </p>
        <button class="btn btn-primary glow-effect" id="msReset">Új kör beállításokkal →</button>
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
    drillState.cardIdx = 0;
    drillState.score = 0;
    drillState.streak = 0;
    drillState.bestStreak = 0;
    drillState.results = [];
    drillState.roundStartTs = Date.now();   // V5 P2 — stats
    if (window.NihonCoreRound) NihonCoreRound.begin(function(){ return { module:'arimasu-imasu', mode:'speed-drill', results: drillState.results, score: drillState.score, startTs: drillState.roundStartTs }; });

    // Speed Drill auto-indul a phase-tab kattintásra → hero rejtése
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
      <h3>Speed Drill — Kész</h3>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pontszám</span><span class="sf-value">${drillState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Helyes</span><span class="sf-value">${correct}/${total} <small>(${pct}%)</small></span></div>
        <div class="sd-final-stat"><span class="sf-label">Átlag idő</span><span class="sf-value">${avgSec}s</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillState.bestStreak} 🔥</span></div>
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
        <p class="exp-jp">${exp.jp}</p>
        <div class="exp-divider"></div>
        <p class="exp-hu">${exp.hu}</p>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
      const container = document.getElementById('phaseContent');
      container.innerHTML = renderCounterCard(m, phase);
      attachCounterCardHandlers(m, phase);
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
          <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${counterRunState.bestStreak} 🔥</span></div>
        </div>
        <button class="btn btn-primary glow-effect" id="cntReset">Új kör beállításokkal →</button>
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
    populateHero(mod);
    setupPhaseTabs(mod);
    renderPhase(mod, 1);
    loadingEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    document.title = `${mod.title} — NihonCore`;
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

  function filterSentences() {
    return NIHONCORE_SENTENCES.filter(s => {
      if (s.level !== lobbyState.level) return false;
      if (!lobbyState.filters.function[s.metadata.function]) return false;
      if (!lobbyState.filters.tense[s.metadata.tense])       return false;
      if (!lobbyState.filters.register[s.metadata.register]) return false;
      return true;
    });
  }

  function startRound() {
    const pool = filterSentences();
    if (pool.length === 0) return;

    runtimeState.cards = [];
    for (let i = 0; i < lobbyState.cardCount; i++) {
      runtimeState.cards.push(pool[Math.floor(Math.random() * pool.length)]);
    }
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
        <span>${sentence.metadata.function}</span><span>·</span>
        <span>${sentence.metadata.tense}</span>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
      document.getElementById('practiceRuntime').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${runtimeState.bestStreak} 🔥</span></div>
        <div class="sd-final-stat"><span class="sf-label">Mód</span><span class="sf-value">${lobbyState.mode === 'particles' ? 'Partikula' : 'Puzzle'}</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="prRestart">Új kör beállításokkal →</button>
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
        <span>${sentence.metadata.function}</span><span>·</span>
        <span>${sentence.metadata.tense}</span><span>·</span>
        <span>${sentence.metadata.register}</span>
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

  // ── Puzzle validátor ─────────────────────────────
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
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
      daily: true, movement: true, transitivity: true, clothing: true,
      giving: true, state: true, weather: true
    },
    forms:    {
      // P1 alapok
      masu: true, masen: true, mashita: true, masen_deshita: false,
      nai: true, te: true, ta: true,
      // P2 haladó (alapból kikapcsolva — explicit pipálás kell hozzá)
      potential: false, passive: false, causative: false,
      causative_passive: false, volitional: false
    },
    mode:     'recognition',   // 'recognition' | 'build' | 'mastery'
    adaptive: false,           // P2: hibás formák súlyozott újrahúzása
    cardCount: 8,
    timeLimit: 8000            // mastery módban / kártya
  });

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
     B) ENGINE — Conjugation core ─────────────────── */

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
    const stem = stems[rule.stemColumn];
    const suf  = (verb.group === 'ichidan' && rule.ichidanSuffix) ? rule.ichidanSuffix : rule.suffix;

    return {
      kana:   stem.kana   + suf.kana,
      romaji: stem.romaji + suf.romaji,
      irregular: false,
      morphemes: {
        stem: stem,
        suffix: suf,
        column: rule.stemColumn
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
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-form' });
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
        distractors.push({ ...out, isCorrect: false, wrongReason: 'wrong-form' });
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
        <button class="conj-stat-toggle" id="conjStatsToggle">📊 Részletek</button>
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
          if (confirm('Biztosan törlöd a Ragozó modul teljes profilját? Ez nem visszafordítható.')) {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderStatsBar();
          }
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = '📊 Részletek';
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
      { id: 'recognition', name: 'Felismerés', sub: '4 választós kártyák' },
      { id: 'build',       name: 'Építkezés',  sub: 'tő + toldalék külön' },
      { id: 'mastery',     name: 'Mester',     sub: 'szabad input + időlimit' }
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
        <div class="lobby-eyebrow">Ragozó modul · V2.0 P1</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
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
            <em>A hibás formákat és csoportokat ~3× gyakrabban húzza ki a profilodból. (Min. 10 attempt szükséges.)</em>
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
      el.innerHTML = `<span class="cj-build-note-icon">ℹ️</span> Build mód: <strong>${unsupported.join(', ')}</strong> kihagyva (csak Felismerés/Mester).`;
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

    finalizeCard(isCorrect, /* diag */ null);
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
      const exHtml = buildExplanation(card, diag);

      // Mastery: char-diff blokk
      const diffHtml = (diag && diag.diff && diag.userNorm)
        ? renderDiffInline(diag.diff, diag.targetNorm)
        : `<strong class="pfe-jp-ok">${exp.kana}</strong> <span class="pfe-roman">(${exp.romaji})</span>`;

      // V2.0 P2: morféma-szintű bontás (csak ha sikerült splittelni)
      const morphHtml = (diag && diag.split && diag.split.ok && diag.split.info === 'fine')
        ? renderMorphemeDiff(diag.split, exp)
        : '';

      explainHtml = `
        <div class="pfe-row pfe-wrong">
          <span class="pfe-label">${(exHtml && exHtml.title) || 'Hiba'}</span>
          <span class="pfe-text">${(exHtml && exHtml.html) || 'Nem ez a kért alak.'}</span>
        </div>
        ${diag && diag.timeout ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Idő</span>
            <span class="pfe-text">Lejárt az időlimit — a helyes alak: <strong class="pfe-jp-ok">${exp.kana}</strong> (${exp.romaji}).</span>
          </div>
        ` : ''}
        ${morphHtml ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Morféma-bontás</span>
            <span class="pfe-text">${morphHtml}</span>
          </div>
        ` : ''}
        ${(diag && diag.diff && !diag.timeout) ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Karakter-diff</span>
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
        <span class="pfe-label">Példa</span>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('cjNext').addEventListener('click', advanceCard);
  }

  function advanceCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showRoundSummary();
    else                                                     renderCurrentCard();
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
        <div class="cj-bd-title">Per-forma bontás</div>
        ${formRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="cjReset">Új kör beállításokkal →</button>
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
      ${hasData ? `<button class="conj-stat-toggle" id="adjStatsToggle">📊 Részletek</button>` : ''}
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
          if (confirm('Biztosan törlöd a Melléknév modul teljes profilját? Ez nem visszafordítható.')) {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderAdjStatsBar();
          }
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = '📊 Részletek';
    }
  }

  function renderAdjProfileDashboard() {
    const p = loadAdjProfile();
    if (p.totalAttempts === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }

    // Per-típus bontás
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

    // Per-forma bontás — leggyengébb felül
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
      { id: 'recognition', name: 'Felismerés', sub: 'Típus + 4-választós (~25% típuskérdés)' },
      { id: 'build',       name: 'Építkezés',  sub: 'tő + toldalék külön (kivételek vizuálisan)' },
      { id: 'mastery',     name: 'Mester',     sub: 'szabad input + 10s timer' }
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
        <div class="lobby-eyebrow">Melléknév modul · V2.1</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
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
            <em>A hibás formákat és típusokat ~3× gyakrabban húzza ki a profilodból. (Min. 10 attempt szükséges.)</em>
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
            <span class="pfe-label">Morféma-bontás</span>
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
          <div class="pfe-row pfe-context"><span class="pfe-label">Karakter-diff</span><span class="pfe-text">${diffHtml}</span></div>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('adjNext').addEventListener('click', advanceAdjCard);
  }

  function advanceAdjCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showAdjSummary();
    else                                                     renderAdjCurrentCard();
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
        <div class="cj-bd-title">Per-forma bontás</div>
        ${formRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="adjReset">Új kör beállításokkal →</button>
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
      hours24: false, minutes: false, years: false, relative: false
    },
    mode: 'recognition',    // 'recognition' | 'build' | 'mastery'
    adaptive: false,        // V2.3 P2 — opt-in súlyozott pickelés
    cardCount: 8,
    timeLimit: 10000
  });

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
    const allB = ['がつ', 'にち', 'じ', 'ふん', 'ぷん', 'ようび'];
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

  // 4 opció: helyes + 3 distraktor (azonos kategóriából, pedagógiai csapdákkal)
  function generateDtDistractors(entry, catId) {
    const seen = new Set([entry.kana]);
    const distractors = [];

    // Napoknál: rendhagyó esetén a "naív szabályos" alak nagyon hasznos csapda
    if (catId === 'days' && entry.irregular) {
      const naive = naiveDayReading(entry.num);
      if (naive && !seen.has(naive)) {
        distractors.push({ kana: naive, romaji: '', isCorrect: false, wrongReason: 'naive-regular' });
        seen.add(naive);
      }
    }

    // Töltsük fel azonos kategória más olvasataival
    const sameCat = categoryDataset(catId).filter(e => e.id !== entry.id);
    while (distractors.length < 3 && sameCat.length > 0) {
      const idx = Math.floor(Math.random() * sameCat.length);
      const e = sameCat.splice(idx, 1)[0];
      if (!seen.has(e.kana)) {
        distractors.push({ kana: e.kana, romaji: e.romaji, isCorrect: false, wrongReason: 'wrong-reading' });
        seen.add(e.kana);
      }
    }

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

    const matchKana   = u === normDt(e.kana);
    const matchRomaji = u === normDt(e.romaji);
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
        ? `<em>${naiveDayReading(e.num)}</em>` : '—'
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
      ${hasData ? `<button class="conj-stat-toggle" id="dtStatsToggle">📊 Részletek</button>` : ''}
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
          if (confirm('Biztosan törlöd a Dátum & Idő modul teljes profilját? Ez nem visszafordítható.')) {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderDtStatsBar();
          }
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = '📊 Részletek';
    }
  }

  function renderDtProfileDashboard() {
    const p = loadDtProfile();
    if (p.totalAttempts === 0) {
      return `<p class="cj-pd-empty">Még nincs adat. Játssz egy kört és térj vissza ide.</p>`;
    }
    // Per-kategória bontás — leggyengébb felül
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
      { id: 'recognition', name: 'Felismerés', sub: '4-választós olvasat' },
      { id: 'build',       name: 'Építkezés',  sub: 'szám + counter külön' },
      { id: 'mastery',     name: 'Mester',     sub: 'szabad input + 10s timer' }
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
        <div class="lobby-eyebrow">Dátum & Idő modul · V2.3</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
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
            <em>A gyengébb kategóriákat ~3× gyakrabban húzza ki a profilodból. (Min. 10 attempt szükséges.)</em>
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
      el.innerHTML = `<span class="cj-build-note-icon">ℹ️</span> Build mód: <strong>${all - buildable}</strong> nem építhető elem kimarad (évek, relatív idő, rendhagyó natív napok, 〜半).`;
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
          <div class="pfe-row pfe-context"><span class="pfe-label">Morféma-bontás</span><span class="pfe-text">${buildSplitHtml}</span></div>
        ` : ''}
        ${diag && diag.timeout ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Idő</span>
            <span class="pfe-text">Lejárt az időlimit. Helyes: <strong class="pfe-jp-ok">${e.kana}</strong> (${e.romaji}).</span>
          </div>
        ` : ''}
        ${diag && diag.diff && !diag.timeout ? `
          <div class="pfe-row pfe-context"><span class="pfe-label">Karakter-diff</span><span class="pfe-text">${diffHtml}</span></div>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('dtNext').addEventListener('click', advanceDtCard);
  }

  function advanceDtCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showDtSummary();
    else                                                     renderDtCurrentCard();
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

    // Per-kategória bontás
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
        <div class="cj-bd-title">Per-kategória bontás</div>
        ${catRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="dtReset">Új kör beállításokkal →</button>
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
  window._dt = { diagnoseDt, getActivePool, generateDtQueue };
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
  // reuse-oljuk (30 mondat 12 N4 + 3 N3 mintából). A séma egységes a sima
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

  // Playback-sebesség a kiválasztott tempó-szintből (nem a lecke difficulty-jéből)
  function lessonSpeed() {
    const tier = NIHONCORE_AUDIO_TIERS.find(t => t.id === drillSettings.tier);
    return tier ? tier.speed : 1.0;
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
    s = s.replace(/[^a-z']/g, '');
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
    const userKana = romajiToKana(raw);
    const ansKana  = normalizeKana(lesson.text);
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
      { id: 'recognition', name: 'Felismerés', sub: 'PLAY → 4 választós', enabled: true },
      { id: 'dictation',   name: 'Diktálás',   sub: 'PLAY → beírod romaji-val', enabled: true },
      { id: 'pro',         name: 'Pro',        sub: 'mondat-szintű, természetes tempó', enabled: true }
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
        <div class="lobby-eyebrow">Hallás & Kiejtés · V3</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
        <p class="lobby-sub">Válaszd ki a lejátszási tempót — a teljes 38-leckés készleten gyakorolsz.</p>
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
            <em>A gyenge hang-csapdáidat gyakrabban húzza, a hibázott kártyát visszahozza, és lassítja a tempót, ha nehéz. (Min. 10 attempt szükséges.)</em>
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
    // V6 — Pro mód: natural tempó alap, mérsékelt slow (mondatnál a 0.6× túl lassú)
    let speed;
    if (card.isPro) {
      speed = slow ? 0.75 : 1.0;
    } else {
      speed = slow ? 0.6 : lessonSpeed(card.lesson);
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
      const clone = card.options
        ? { lesson: card.lesson, options: card.options, _replayed: true }
        : { lesson: card.lesson, _replayed: true };
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
      errorCode: 'dont_know',
      replayCount: drillRunState.replayCount,
      slowUsed: drillRunState.slowUsed
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('lstFbReplay').addEventListener('click', () => {
      NihonCoreAudio.play(c.text, { speed: lessonSpeed(c), onError: () => {} });
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
        <span class="dt-cat-tag lst-pro-tag">🎧 Pro listening</span>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('lstFbReplay').addEventListener('click', () => {
      NihonCoreAudio.play(c.text, { speed: lessonSpeed(c), onError: () => {} });
    });
    document.getElementById('lstNext').addEventListener('click', advanceLstCard);
  }

  function advanceLstCard() {
    NihonCoreAudio.stop();
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showLstSummary();
    else                                                     renderLstCurrentCard();
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

    // Per-kategória bontás
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
        <div class="cj-bd-title">Per-kategória bontás</div>
        ${catRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
        <div class="sd-final-stat"><span class="sf-label">Összes lejátszás</span><span class="sf-value">${totalReplays}×</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="lstReset">Új kör beállításokkal →</button>
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

  function getActivePool() {
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

    const all = [
      { pattern: correctPattern, isCorrect: true },
      ...distractors.slice(0, 3).map(p => ({ pattern: p, isCorrect: false }))
    ];
    return shuffle(all);
  }

  /* ── B.2) V5 P4 — TRANSLATE MÓD: tokenizáció + distraktor ─ */

  // Particle-alapú heurisztikus tokenizáció a kana-mondatokon. A particle
  // a megelőző frázishoz tapad (mert grammatikailag oda tartozik). A
  // punktuáció (、。) saját token-ként szerepel. Védelem: a particle CSAK
  // akkor érvényes, ha a `cur` nem üres (vagyis volt előtte szó-anyag) —
  // különben pl. „にほん" elejéről a „に"-t hibásan particle-ként vágná le.
  const TRANS_MULTI_PARTICLES = ['まで', 'から', 'でも', 'など', 'より', 'こそ', 'のに', 'ても', 'なら', 'ながら'];
  const TRANS_SINGLE_PARTICLES = ['は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'や', 'か'];
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
  function buildTranslateCardData(pattern, example) {
    const correct = tokenizePhrases(example.kana);
    const distractors = [];
    const seen = new Set(correct);

    const tryAddFrom = (pat) => {
      if (!pat || distractors.length >= 2) return;
      const ctokens = tokenizePhrases(pat.examples[0].kana);
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
    const u = normKana(userInput);
    if (!u) return { match: false, errorCode: 'empty', userNorm: u, targetNorm: normKana(correct) };

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
      ${hasData ? `<button class="conj-stat-toggle" id="grmStatsToggle">📊 Részletek</button>` : ''}
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
          if (confirm('Biztosan törlöd a Grammar Patterns modul teljes profilját? Ez nem visszafordítható.')) {
            try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
            renderGrmStatsBar();
          }
        });
      }
      const srsBtn = panel.querySelector('#grmSrsReset');
      if (srsBtn) {
        srsBtn.addEventListener('click', () => {
          if (confirm('Biztosan törlöd az SRS-ütemezést a Grammar Patterns területén? Minden minta visszaáll "új" állapotra.')) {
            NihonCoreSRS.clearScope(SRS_PREFIX);
            renderGrmStatsBar();
          }
        });
      }
    } else {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.classList.remove('active');
      btn.textContent = '📊 Részletek';
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

    // SRS box-eloszlás
    const boxLabels = ['Új (1 nap)', '1 nap', '3 nap', '7 nap', '14 nap', '30 nap'];
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
      { id: 'recognition', name: 'Felismerés', sub: 'melyik mintát látod?' },
      { id: 'cloze',       name: 'Cloze',     sub: 'írd be a hiányzó morfémát' },
      { id: 'translate',   name: 'Fordítás',  sub: 'HU → JP frázis-tálca' }
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
        <div class="lobby-eyebrow">Grammar Patterns modul · V5 P1</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
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
            <em>Az esedékes mintázatok előre kerülnek a sorba. Új mintáknál először tanulsz, helyes válasz után a következő ismétlés napokkal később esedékes (Leitner box: 1 → 3 → 7 → 14 → 30 nap).</em>
          </span>
        </label>
        <label class="cj-adapt-switch">
          <input type="checkbox" id="grmAdaptive" ${drillSettings.adaptive ? 'checked' : ''} />
          <span class="cj-adapt-text">
            <strong>🎯 Adaptív gyakorlás</strong>
            <em>A gyengébb mintázatokat ~3× gyakrabban húzza ki a profilodból. (Min. 10 attempt szükséges; SRS bekapcsolva felülírja.)</em>
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
      el.innerHTML = `<span class="cj-build-note-icon">🎯</span> Adaptív: még <strong>${need}</strong> attempt kell, hogy a profil aktiválja a súlyozást.`;
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
        html += `<div class="cj-hint-line"><em>Kategória:</em> ${categoryLabel(card.pattern.category)} — ${card.pattern.summary}</div>`;
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

  function renderGrmRecognitionCard(card) {
    const ex = card.example;
    const optionsHtml = card.options.map((opt, i) => `
      <button class="cj-option grm-opt" data-idx="${i}" data-correct="${opt.isCorrect ? '1' : '0'}">
        <span class="cj-opt-jp grm-opt-label">${opt.pattern.label}</span>
        <span class="cj-opt-romaji grm-opt-summary">${escapeGrmHtml(opt.pattern.summary)}</span>
      </button>
    `).join('');

    document.getElementById('grmCard').innerHTML = `
      <div class="cj-prompt grm-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="dt-cat-tag">${categoryLabel(card.pattern.category)}</span>
          <span class="dt-cat-tag grm-jlpt-tag">JLPT ${card.pattern.jlpt}</span>
        </div>
        <div class="grm-sentence">${ex.jp}</div>
        <div class="grm-sentence-romaji">${escapeGrmHtml(ex.romaji)}</div>
        <div class="cj-prompt-meaning grm-sentence-hu">${escapeGrmHtml(ex.hu)}</div>
        <div class="cj-target">
          <span class="cj-target-label">Feladat:</span>
          <span class="cj-target-name">Melyik grammatikai mintázat van ebben a mondatban?</span>
        </div>
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
          <span class="cj-target-name">Mi áll a <em>___</em> helyén? Írd be hiraganával.</span>
        </div>
      </div>
      ${renderGrmHintBar(card)}
      <div class="cj-input-area">
        <input type="text" class="cj-input" id="grmInput"
               placeholder="pl. ${escapeGrmHtml(card.example.clozeAnswer.slice(0,1))}…"
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
          <div class="pfe-row pfe-context"><span class="pfe-label">Karakter-diff</span><span class="pfe-text">${diffHtml}</span></div>
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
        ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
      </button>
    `;
    document.getElementById('grmNext').addEventListener('click', advanceGrmCard);
  }

  function advanceGrmCard() {
    drillRunState.cardIdx++;
    if (drillRunState.cardIdx >= drillRunState.cards.length) showGrmSummary();
    else                                                     renderGrmCurrentCard();
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
        <div class="cj-bd-title">Per-mintázat bontás</div>
        ${patRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="grmReset">Új kör beállításokkal →</button>
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
    jlpt: { N4: true, N3: true },
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
        // A Mondat-Mester levelekre nem szűrünk JLPT-vel (N5-N3 vegyes),
        // mert a level mező más formátum. Csak akkor adunk hozzá, ha
        // valamelyik JLPT engedélyezett.
        if (!drillSettings.jlpt.N4 && !drillSettings.jlpt.N3) return;
        const kana = s.tokens.map(t => t.jp).join('');
        const romaji = s.tokens.map(t => t.romaji).join(' ');
        out.push({
          id: 'prod_sm_' + s.id,
          kana, romaji,
          hu: s.translation || '',
          jp: kana,
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
      .replace(/[、。・！？]/g, '');   // punktuáció ignorálva
  }

  // Egyszerű romaji→kana parser (a Listening modul reuse-a lehet, de itt
  // local). Csak a leggyakoribb syllabákat ismeri, a komplexitás a
  // Listening parser-é. Itt kis fallback van: ha a user TISZTÁN romaji-t ír,
  // megpróbálja konvertálni; ha kevert, hagyja.
  const PROD_ROMAJI_MAP = {
    kya:'きゃ',kyu:'きゅ',kyo:'きょ', gya:'ぎゃ',gyu:'ぎゅ',gyo:'ぎょ',
    sha:'しゃ',shu:'しゅ',sho:'しょ', ja:'じゃ',ju:'じゅ',jo:'じょ',
    cha:'ちゃ',chu:'ちゅ',cho:'ちょ', nya:'にゃ',nyu:'にゅ',nyo:'にょ',
    hya:'ひゃ',hyu:'ひゅ',hyo:'ひょ', bya:'びゃ',byu:'びゅ',byo:'びょ',
    pya:'ぴゃ',pyu:'ぴゅ',pyo:'ぴょ', mya:'みゃ',myu:'みゅ',myo:'みょ',
    rya:'りゃ',ryu:'りゅ',ryo:'りょ',
    ka:'か',ki:'き',ku:'く',ke:'け',ko:'こ',
    ga:'が',gi:'ぎ',gu:'ぐ',ge:'げ',go:'ご',
    sa:'さ',shi:'し',su:'す',se:'せ',so:'そ',
    za:'ざ',ji:'じ',zu:'ず',ze:'ぜ',zo:'ぞ',
    ta:'た',chi:'ち',tsu:'つ',te:'て',to:'と',
    da:'だ',di:'ぢ',du:'づ',de:'で',do:'ど',
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
  function romajiToKanaProd(text) {
    const s = String(text || '').toLowerCase().replace(/[^a-z\s、。]/g, '');
    if (!s) return '';
    let out = '';
    let i = 0;
    while (i < s.length) {
      if (s[i] === ' ') { i++; continue; }
      // sokuon — kettős mássalhangzó (kk, tt, pp, ss stb.) → kis っ
      if (i + 1 < s.length && /[bcdfghjkmpqrstvwxyz]/.test(s[i]) && s[i] === s[i+1] && s[i] !== 'n') {
        out += 'っ'; i++; continue;
      }
      // 3 char
      if (i + 3 <= s.length && PROD_ROMAJI_MAP[s.slice(i, i+3)]) {
        out += PROD_ROMAJI_MAP[s.slice(i, i+3)]; i += 3; continue;
      }
      // 2 char
      if (i + 2 <= s.length && PROD_ROMAJI_MAP[s.slice(i, i+2)]) {
        out += PROD_ROMAJI_MAP[s.slice(i, i+2)]; i += 2; continue;
      }
      // 1 char (vowel + n)
      if (PROD_ROMAJI_MAP[s[i]]) { out += PROD_ROMAJI_MAP[s[i]]; i++; continue; }
      // unknown — skip
      i++;
    }
    return out;
  }

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

    // 1) Ha tisztán romaji, konvertálni
    const userKana = isKanaDominant(raw) ? raw : romajiToKanaProd(raw);
    const userNorm = normJpProd(userKana);
    const targetNorm = normJpProd(card.kana);

    // 2) Exact match (normalized)
    if (userNorm === targetNorm) {
      return { verdict: 'perfect', userKana, userNorm, targetNorm,
               tokensCorrect: 1, tokensTotal: 1, charLevDist: 0 };
    }

    // 3) Token-szintű alignment
    const userToks = tokenizeProdPhrases(userKana.replace(/[、。・！？\s]/g, ''));
    const targetToks = tokenizeProdPhrases(card.kana.replace(/[、。・！？\s]/g, ''));
    const align = alignTokens(userToks, targetToks);

    const tokensCorrect = align.tokenDiff.filter(d => d.state === 'correct').length;
    const tokensTotal = Math.max(userToks.length, targetToks.length);
    const tokenRate = tokensTotal > 0 ? tokensCorrect / tokensTotal : 0;

    // 4) Karakter-szintű LCS-távolság
    const charDist = levDist(userNorm, targetNorm);
    const charRate = targetNorm.length > 0 ? charDist / targetNorm.length : 1;

    // 5) Verdict az emil-design tervezés szerinti küszöbök
    let verdict;
    if (tokenRate >= 0.80 && charRate <= 0.15) verdict = 'close';     // "Majdnem!"
    else if (tokenRate >= 0.60 && charRate <= 0.30) verdict = 'near'; // "Közel jó"
    else if (tokenRate >= 0.40) verdict = 'far';                       // "Még gyakorold"
    else verdict = 'wrong';                                            // "Próbáld újra"

    return {
      verdict, userKana, userNorm, targetNorm,
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
    const jlptRow = ['N4', 'N3'].map(level => `
      <button class="cj-group-btn prod-jlpt-btn ${drillSettings.jlpt[level] ? 'active' : ''}" data-prod-jlpt="${level}">
        <span class="cj-g-name">${level}</span>
        <span class="cj-g-hint">${level === 'N4' ? 'alap minták' : 'haladó'}</span>
      </button>
    `).join('');

    const srcRow = [
      { id: 'grammar', name: 'Grammar Patterns példák', hint: '30 mondat (12 N4 + 3 N3)' },
      { id: 'sentences', name: 'Mondat-Mester mondatok', hint: '24 mondat (N5-N3 vegyes)' }
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
        <div class="lobby-eyebrow">Production modul · V7 P1</div>
        <h2 class="lobby-title">Drill-paraméterek</h2>
        <p class="lobby-sub">A legnehezebb mód: a magyar mondatot teljes japán mondatra fordítod. Írhatsz kana-val vagy romaji-val — a rendszer fuzzy diff-fel értékel.</p>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">1 · JLPT szint</div>
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
        const otherOn = ['N4','N3'].filter(l => l !== lv && drillSettings.jlpt[l]).length;
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
    const srcTag = card.source === 'grammar'
      ? `<span class="dt-cat-tag grm-pattern-tag">${escProdHtml(card.patternLabel || 'pattern')}</span>`
      : `<span class="dt-cat-tag">🧩 Mondat-Mester</span>`;

    document.getElementById('prodCard').innerHTML = `
      <div class="cj-prompt-eyebrow prod-eyebrow">
        <span class="dt-cat-tag prod-tag">✍ Production</span>
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
    // Pontozás az 5-szintű verdict alapján
    const PTS = { perfect: 16, close: 12, near: 8, far: 4, wrong: 0 };
    const pts = PTS[diag.verdict] || 0;
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
    far:     { icon: '🌱', title: 'Még gyakorold',      tone: 'pr-fb-far',     sub: 'Próbáld újra — a struktúra eltér.' },
    wrong:   { icon: '🤔', title: 'Nézzük meg együtt',  tone: 'pr-fb-wrong',   sub: 'A helyes mondat lent — gyakorold be.' }
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
           <span class="prod-tok-missing-label">Hiányzó:</span>
           ${diag.missingTokens.map(t => `<span class="prod-tok prod-tok-missing"><span class="prod-tok-jp">${escProdHtml(t)}</span></span>`).join('')}
         </div>` : '';

    return `
      <div class="prod-diff-block">
        <div class="prod-diff-row">
          <span class="prod-diff-label">Te:</span>
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
    const scorePts = { perfect: 16, close: 12, near: 8, far: 4, wrong: 0 }[diag.verdict] || 0;

    fbEl.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${meta.icon}</span>
        <span class="pr-fb-title">${meta.title}</span>
        <span class="prod-fb-points">+${scorePts} pt</span>
      </div>
      <div class="pr-fb-explain">
        <div class="pfe-row pfe-${diag.verdict === 'perfect' || diag.verdict === 'close' ? 'correct' : 'wrong'}">
          <span class="pfe-label">${meta.sub.split('.')[0]}</span>
          <span class="pfe-text">${meta.sub}</span>
        </div>
        ${tokenDiffHtml ? `
          <div class="pfe-row pfe-context">
            <span class="pfe-label">Token-bontás</span>
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
      <div class="prod-fb-actions">
        <button class="lst-slow-btn prod-fb-listen" id="prodFbListen" type="button">🔊 Hallgasd meg</button>
        <button class="btn btn-primary glow-effect cj-next" id="prodNext">
          ${isLast ? 'Eredmények megtekintése →' : 'Következő →'}
        </button>
      </div>
    `;

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
        <div class="cj-bd-title">Verdict-bontás</div>
        ${verdictRows}
      </div>
      <div class="sd-final-grid">
        <div class="sd-final-stat"><span class="sf-label">Pont</span><span class="sf-value">${drillRunState.score}</span></div>
        <div class="sd-final-stat"><span class="sf-label">Leghosszabb sorozat</span><span class="sf-value">${drillRunState.bestStreak} 🔥</span></div>
      </div>
      <button class="btn btn-primary glow-effect" id="prodReset">Új kör beállításokkal →</button>
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
    grammar: 'Mintázatok',
    'arimasu-imasu': 'Alap igék',  // V5 P2 — verb-engine instrumented
    production: 'Produkció'        // V7 P1
  };
  const MODE_LABELS = {
    recognition: 'Felismerés', build: 'Építkezés', mastery: 'Mester',
    dictation: 'Diktálás', particles: 'Partikula', puzzle: 'Puzzle',
    cloze: 'Cloze', translate: 'Fordítás', pro: 'Pro listening',
    free: 'Szabad fordítás',
    'counter-recognition': 'Felismerés', 'counter-hybrid': 'Hibrid',
    'counter-mastery': 'Mester',
    'matrix-selector': 'Matrix', 'speed-drill': 'Speed Drill',
    'interactive-demo': 'Demo'
  };
  const TABS = [
    { id: 'overview',  name: 'Áttekintés', enabled: true  },
    { id: 'activity',  name: 'Aktivitás',  enabled: true  },
    { id: 'radar',     name: 'Modulok',    enabled: true  },
    { id: 'blindspot', name: 'Vakfoltok',  enabled: true  },
    { id: 'history',   name: 'Előzmények', enabled: true  },
    { id: 'analytics', name: 'Elemzés',    enabled: true  }
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
  function topError(codes) {
    if (!codes || !codes.length) return null;
    const freq = {};
    codes.forEach(c => { freq[c] = (freq[c] || 0) + 1; });
    let best = null, n = 0;
    Object.keys(freq).forEach(c => { if (freq[c] > n) { n = freq[c]; best = c; } });
    return best ? { code: best.replace(/_/g, ' '), count: n } : null;
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
  function computeStreak() {
    const days = NihonCoreStats.getDailyAggregates();
    if (days.length === 0) return { current: 0, longest: 0 };
    const set = {};
    days.forEach(d => { set[d.date] = true; });
    let longest = 0, run = 0, prev = null;
    days.forEach(d => {
      const t = new Date(d.date + 'T00:00:00').getTime();
      run = (prev !== null && t - prev === DAY_MS) ? run + 1 : 1;
      if (run > longest) longest = run;
      prev = t;
    });
    let current = 0, cursor = startOfDay(Date.now());
    if (!set[dayKey(cursor)]) cursor -= DAY_MS;        // a streak él, ha tegnap volt
    while (set[dayKey(cursor)]) { current++; cursor -= DAY_MS; }
    return { current: current, longest: longest };
  }

  function todayStats() {
    const todayKey = dayKey(Date.now());
    const today = NihonCoreStats.getSessions().filter(s => dayKey(s.ts) === todayKey);
    const Q = today.reduce((a, s) => a + (s.questionCount || 0), 0);
    const C = today.reduce((a, s) => a + (s.correctCount || 0), 0);
    return {
      rounds: today.length, questions: Q, correct: C,
      accuracy: Q > 0 ? Math.round(C / Q * 100) : 0,
      durationMs: today.reduce((a, s) => a + (s.durationMs || 0), 0)
    };
  }

  // Heatmap — 13 hét × 7 nap, hétfő-kezdő rács
  function heatmapData() {
    const map = {};
    let maxQ = 1;
    NihonCoreStats.getDailyAggregates().forEach(d => {
      map[d.date] = d; if (d.questions > maxQ) maxQ = d.questions;
    });
    const today = startOfDay(Date.now());
    const todayDow = (new Date(today).getDay() + 6) % 7;   // hétfő = 0
    const WEEKS = 13;
    const start = today - todayDow * DAY_MS - (WEEKS - 1) * 7 * DAY_MS;
    const cells = [];
    for (let i = 0; i < WEEKS * 7; i++) {
      const ts = start + i * DAY_MS;
      const d = map[dayKey(ts)];
      const q = d ? d.questions : 0;
      let level = 0;
      if (q > 0) level = q >= maxQ * 0.75 ? 4 : q >= maxQ * 0.5 ? 3 : q >= maxQ * 0.25 ? 2 : 1;
      cells.push({ ts: ts, q: q, level: level, future: ts > today });
    }
    return { cells: cells, weeks: WEEKS };
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
        <a href="index.html#modules" class="btn btn-primary glow-effect">Irány a modulok →</a>
      </div>`;
  }

  /* ── V4 P3 — radar + analytics helperek ────────── */
  // Radar tengely-sorrend (V5 bővítve: + Mintázatok)
  const RADAR_ORDER = ['counter', 'conjugation', 'adjectives', 'datetime', 'practice', 'listening', 'grammar'];
  const RADAR_LABELS = {
    counter: 'Számlálók', conjugation: 'Igék', adjectives: 'Melléknevek',
    datetime: 'Idő', practice: 'Partikulák', listening: 'Hallás',
    grammar: 'Mintázatok'
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
          .map(k => ({ label: cleanKey(k), count: p.trapErrors[k] || 0 }))
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
    else if (activeTab === 'activity')  renderActivity();
    else if (activeTab === 'radar')     renderRadar();
    else if (activeTab === 'blindspot') renderBlindSpot();
    else if (activeTab === 'analytics') renderAnalytics();
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
          <a href="index.html#modules" class="btn btn-primary glow-effect">Irány a modulok →</a>
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
      return `
        <div class="sh-row ${cls}">
          <div class="sh-main">
            <span class="sh-module">${MODULE_LABELS[s.module] || s.module}</span>
            <span class="sh-mode">${MODE_LABELS[s.mode] || s.mode}</span>
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

    el.innerHTML = `
      <div class="sh-summary glass-panel">
        <div class="sh-sum-stat"><span class="sh-sum-num">${sessions.length}</span><span class="sh-sum-label">befejezett kör</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${totalQ}</span><span class="sh-sum-label">összes kérdés</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${acc}%</span><span class="sh-sum-label">össz-pontosság</span></div>
        <button class="sh-clear" id="shClear" type="button">Előzmények törlése</button>
      </div>
      <div class="sh-list">${rows}</div>
    `;

    const clr = document.getElementById('shClear');
    if (clr) clr.addEventListener('click', () => {
      if (confirm('Biztosan törlöd a teljes gyakorlási előzményt?\nEz nem vonható vissza.')) {
        NihonCoreStats.clearSessions();
        renderHistory();
      }
    });
  }

  /* ── A) Dashboard Overview ─────────────────────── */
  function todayBlurb(today, streak) {
    if (today.rounds === 0) {
      return streak.current > 0
        ? `<strong>${streak.current} napos sorozatban</strong> vagy — egy gyors kör ma életben tartja!`
        : 'Ma még nem gyakoroltál. Egy rövid kör is sokat számít — válassz egy modult!';
    }
    const msg = `Ma <strong>${today.rounds}</strong> kört játszottál, <strong>${today.accuracy}%</strong> pontossággal`;
    if (today.accuracy >= 85) return msg + ' — kiváló forma! 💪';
    if (today.accuracy >= 60) return msg + ' — szép munka, így tovább.';
    return msg + ' — a kitartás a lényeg, ne add fel.';
  }

  function renderOverview() {
    const el = document.getElementById('statsContent');
    if (NihonCoreStats.getSessions().length === 0) {
      el.innerHTML = emptyState('🎯', 'Még nincs adat az áttekintéshez.',
        'Játssz le néhány kört — a felkészültség és a napi vitals automatikusan feltöltődik.');
      return;
    }

    const rd = computeReadiness();
    const today = todayStats();
    const streak = computeStreak();
    const readyLabel = rd.score >= 70 ? 'Jó úton haladsz'
                     : rd.score >= 40 ? 'Halad a tanulás'
                     : 'Most kezdődik';

    const comps = [
      { label: 'Modul-mastery', val: rd.mastery,   hint: 'pontosság × lefedettség, 6 modul átlaga' },
      { label: 'Frissesség',    val: rd.freshness, hint: 'mennyire friss a gyakorlásod' },
      { label: 'Aktivitás',     val: rd.activity,  hint: 'aktív napok az elmúlt héten' }
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
      { icon: '🎮', num: today.rounds,                  label: 'mai kör' },
      { icon: '🎯', num: today.accuracy + '%',          label: 'mai pontosság' },
      { icon: '⏱',  num: fmtDuration(today.durationMs), label: 'mai aktív idő' },
      { icon: '🔥', num: streak.current,                label: 'napos sorozat' }
    ].map(v => `
      <div class="ov-vital glass-panel">
        <span class="ov-vital-icon">${v.icon}</span>
        <span class="ov-vital-num">${v.num}</span>
        <span class="ov-vital-label">${v.label}</span>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="ov-top">
        <div class="ov-ring-wrap glass-panel">
          <div class="ov-ring">
            ${ringSvg(rd.score)}
            <div class="ov-ring-center">
              <span class="ov-ring-num">${rd.score}</span>
              <span class="ov-ring-unit">/ 100</span>
            </div>
          </div>
          <div class="ov-ring-caption">
            <strong>Felkészültség</strong>
            <span>${readyLabel}</span>
          </div>
        </div>
        <div class="ov-comps glass-panel">
          <div class="ov-comps-title">Miből áll össze</div>
          ${comps}
        </div>
      </div>

      <div class="ov-vitals">${vitals}</div>

      <div class="ov-status glass-panel">
        <span class="ov-status-icon">${today.rounds > 0 ? '✅' : '💡'}</span>
        <p class="ov-status-text">${todayBlurb(today, streak)}</p>
      </div>
    `;
    // V8 polish: readiness ring rajzolódási animáció (kezdő offset → target)
    animateReadinessRings(document.getElementById('statsContent'));
  }

  /* ── B) Activity Engine ────────────────────────── */
  function renderActivity() {
    const el = document.getElementById('statsContent');
    if (NihonCoreStats.getSessions().length === 0) {
      el.innerHTML = emptyState('🔥', 'Még nincs aktivitási adat.',
        'Néhány kör után megjelenik a heatmap, a sorozat és a napszak-bontás.');
      return;
    }

    const streak = computeStreak();
    const hm = heatmapData();
    const tod = timeOfDayData();
    const best = bestStudyTime(tod);
    const dow = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

    let hmRows = '';
    for (let row = 0; row < 7; row++) {
      let cellsHtml = '';
      for (let w = 0; w < hm.weeks; w++) {
        const c = hm.cells[w * 7 + row];
        const title = c.future ? dayKey(c.ts) : dayKey(c.ts) + ' — ' + c.q + ' kérdés';
        cellsHtml += `<span class="hm-cell hm-l${c.level}${c.future ? ' hm-future' : ''}" title="${title}"></span>`;
      }
      hmRows += `<div class="hm-row"><span class="hm-dow">${dow[row]}</span>${cellsHtml}</div>`;
    }

    const maxTod = Math.max(1, tod[0].sessions, tod[1].sessions, tod[2].sessions, tod[3].sessions);
    const todBars = tod.map(t => `
      <div class="tod-col">
        <div class="tod-bar-wrap">
          <span class="tod-bar-val">${t.sessions}</span>
          <div class="tod-bar" style="height:${Math.round(t.sessions / maxTod * 100)}%"></div>
        </div>
        <div class="tod-label">${t.emoji} ${t.label}</div>
        <div class="tod-acc">${t.sessions > 0 ? t.accuracy + '% pont.' : '—'}</div>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="act-streak glass-panel">
        <div class="act-streak-main">
          <span class="act-streak-flame">🔥</span>
          <div class="act-streak-box">
            <span class="act-streak-num">${streak.current}</span>
            <span class="act-streak-label">napos aktuális sorozat</span>
          </div>
        </div>
        <div class="act-streak-best">Leghosszabb: <strong>${streak.longest} nap</strong></div>
      </div>

      <div class="act-card glass-panel">
        <div class="act-card-title">Aktivitás — utolsó 13 hét</div>
        <div class="heatmap">${hmRows}</div>
        <div class="hm-legend">
          <span class="hm-leg-txt">kevesebb</span>
          <span class="hm-cell hm-l0"></span><span class="hm-cell hm-l1"></span>
          <span class="hm-cell hm-l2"></span><span class="hm-cell hm-l3"></span>
          <span class="hm-cell hm-l4"></span>
          <span class="hm-leg-txt">több</span>
        </div>
      </div>

      <div class="act-card glass-panel">
        <div class="act-card-title">Napszak szerinti eloszlás</div>
        <div class="tod-chart">${todBars}</div>
        <div class="act-best">
          ${best
            ? `💡 <strong>Legjobb tanulási időd:</strong> ${best.emoji} ${best.label} — ${best.accuracy}% pontosság (${best.hint}).`
            : '💡 Gyakorolj több körben különböző napszakokban, és megmutatjuk, mikor teljesítesz a legjobban.'}
        </div>
      </div>
    `;
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
          <div class="act-card-sub">Összesen <strong>${total}</strong> item ütemezve · Leitner box 0..5 → 0/1/3/7/14/30 nap</div>
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
      ${srsPanels}
    `;
  }

  // V5 P3b — Ismert SRS-scope-ok listája. Jövőbeli modulok ide kerülnek.
  const SRS_SCOPES = [
    { prefix: 'grammar:', label: '📐 Mintázatok (Grammar Patterns)' }
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
          title: 'Ismétlődő hibatípus: ' + cleanKey(topCode),
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

  function renderBlindSpot() {
    const el = document.getElementById('statsContent');
    if (NihonCoreStats.getSessions().length === 0) {
      el.innerHTML = emptyState('🔍', 'Még nincs elég adat a vakfolt-elemzéshez.',
        'Néhány kör után a rendszer megmutatja, hol vannak a gyenge pontjaid.');
      return;
    }
    const spots = detectBlindSpots();
    if (spots.length === 0) {
      el.innerHTML = `
        <div class="stats-empty glass-panel">
          <div class="stats-empty-icon">✨</div>
          <p>Nincs kiugró vakfolt — kiegyensúlyozott a gyakorlásod!</p>
          <p class="stats-empty-sub">Így tovább. Ha egy terület később lemarad, itt jelezni fogjuk.</p>
        </div>`;
      return;
    }
    const primary = spots.find(s => s.module);
    const cards = spots.map(s => `
      <div class="bs-card">
        <span class="bs-icon">${s.icon}</span>
        <div class="bs-body">
          <div class="bs-title">${s.title}</div>
          <div class="bs-text">${s.text}</div>
        </div>
        ${s.module ? `<button class="bs-go" data-mod="${s.module}" data-note="${s.note || ''}">Gyakorlás →</button>` : ''}
      </div>
    `).join('');
    el.innerHTML = `
      ${primary ? `
        <div class="bs-primary glass-panel">
          <div class="bs-primary-label">🎯 Célzott gyakorlás</div>
          <div class="bs-primary-text">A statisztikád szerint most ezzel nyered a legtöbbet:
            <strong>${MODULE_LABELS[primary.module]}</strong>${primary.note ? ' — ' + primary.note : ''}.</div>
          <button class="btn btn-primary glow-effect bs-primary-btn"
                  data-mod="${primary.module}" data-note="${primary.note || ''}">Célzott gyakorlás indítása →</button>
        </div>` : ''}
      <div class="bs-list glass-panel">
        <div class="act-card-title">Észlelt vakfoltok (${spots.length}) — fontossági sorrendben</div>
        ${cards}
      </div>
    `;
    document.querySelectorAll('.bs-go, .bs-primary-btn').forEach(b => {
      b.addEventListener('click', () => goPractice(b.dataset.mod, b.dataset.note));
    });
  }

  /* ── INIT ──────────────────────────────────────── */
  renderTabs();
  renderContent();
  // V8: tier-átlépés celebration (sakura-bloom, ha új küszöböt léptél át)
  checkReadinessTierMilestone();

  window._stats = { NihonCoreStats, computeReadiness, computeStreak, detectBlindSpots, checkReadinessTierMilestone };
}


/* ====================================================
   10. PAGE DETECTOR — egy oldal-init futtatása ─────
   ----------------------------------------------------
   V8 (Barba.js SPA): a switch egy függvénybe csomagolva,
   így a Barba afterEnter-ben újra-meghívható navigáció után.
   ==================================================== */

function initCurrentPage() {
  if (document.getElementById('statsMain')) {
    initStatsPage();
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
  } else if (document.querySelector('.modules-grid')) {
    initLanding();
  }
  // V18: modul-név fejléc-badge + hero-observer (kör-őr) frissítése
  if (window.NihonCoreRound && NihonCoreRound.refresh) NihonCoreRound.refresh();
}

// Kezdeti init
initCurrentPage();
window.NihonCoreInitPage = initCurrentPage;   // Barba afterEnter-ből hívja
