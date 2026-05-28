/* ====================================================
   NihonCoreV2 — Service Worker (V7-Nap3 PWA)
   ----------------------------------------------------
   Cache-stratégia:
   - APP-SHELL (HTML/CSS/JS/manifest/icons) → cache-first
     (a teljes app offline elérhető)
   - Google Fonts (CSS + woff2) → cache-first runtime
     (első betöltés után offline tényleg működik)
   - Google Translate TTS endpoint → NETWORK-only (NEM cache,
     mert változó query, és nagy a forgalom)
   - localStorage adatok érintetlen (a SW nem nyúl hozzá)

   Verzió-bump: amikor új fájl kerül a precache-listába vagy
   változik bármi fundamentális, állítsd 1-gyel feljebb a
   CACHE_VERSION-t — a régi cache automatikusan törlődik.
   ==================================================== */

const CACHE_VERSION = 'nihoncore-v15-2026-05-26-counter-expand';
const APP_SHELL_CACHE = CACHE_VERSION + '-shell';
const RUNTIME_CACHE   = CACHE_VERSION + '-runtime';

// App-shell — minden statikus erőforrás, amit a teljes app igényel.
// V7-Nap3 mappa-szervezés: HTML-ek a /pages/-ben, CSS a /css/-ben,
// JS a /js/-ben, képek a /img/-ban. Az index.html ROOT-on marad.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  // pages/
  './pages/module.html',
  './pages/practice.html',
  './pages/conjugation.html',
  './pages/adjectives.html',
  './pages/datetime.html',
  './pages/listening.html',
  './pages/grammar.html',
  './pages/production.html',
  './pages/stats.html',
  './pages/login.html',
  './pages/register.html',
  // css/
  './css/style.css',
  './css/auth.css',
  // js/
  './js/app.js',
  // ── V8: data.js szétbontva 8 modul-fájlra ──
  './js/data/core.js',
  './js/data/sentences.js',
  './js/data/verbs.js',
  './js/data/adjectives.js',
  './js/data/counters.js',
  './js/data/datetime.js',
  './js/data/audio.js',
  './js/data/grammar.js',
  // img/
  './img/app_icon.png',
  './img/fav_icon_nihoncore.png'
];

// Külső font-domainek (cache-first runtime)
const FONT_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Külső lib CDN-ek (cache-first runtime — zen-polish:
// anime.js / lottie / barba.js a jsdelivr-ről)
const LIB_HOSTS = [
  'cdn.jsdelivr.net'
];

// TTS endpoint — NETWORK-only (nem cache-eljük)
const TTS_HOST = 'translate.google.com';

/* ── INSTALL — precache az app-shell ─────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())   // azonnal aktív legyen
  );
});

/* ── ACTIVATE — régi cache-k törlése ─────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => !k.startsWith(CACHE_VERSION))
          .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

/* ── FETCH — stratégia per kategória ─────────── */
self.addEventListener('fetch', event => {
  const req = event.request;
  // Csak GET — POST/PUT stb. átengedve
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) TTS endpoint → NETWORK-only (NE cache-eld)
  if (url.hostname.includes(TTS_HOST)) {
    return;  // a böngésző natívan kezeli
  }

  // 2) Google Fonts → cache-first runtime
  if (FONT_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(cacheFirstRuntime(req));
    return;
  }

  // 2b) Külső lib CDN-ek (anime / lottie / barba) → cache-first runtime
  if (LIB_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(cacheFirstRuntime(req));
    return;
  }

  // 3) Saját origin (app-shell) → cache-first, fallback network
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstAppShell(req));
    return;
  }

  // 4) Minden más → network-first
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

/* Cache-first az app-shell-re. Ha a cache-ben nincs, hálózat;
   ha az is offline, a precache-ből próbál a path alapján. */
async function cacheFirstAppShell(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    // Ha sikeresen 200-as választ kaptunk, frissítsük a cache-t
    if (fresh && fresh.status === 200 && fresh.type === 'basic') {
      const cache = await caches.open(APP_SHELL_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (e) {
    // Offline és cache miss — fallback az index.html-re (SPA-szerű)
    return caches.match('./index.html');
  }
}

/* Cache-first runtime — Google Fonts esetén:
   ha cache-ben van, instant; ha nincs, network → cache → response. */
async function cacheFirstRuntime(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (e) {
    return cached || Response.error();
  }
}

/* ── MESSAGE — opcionális: kézi cache-update ─── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
