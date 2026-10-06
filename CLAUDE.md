# NihonCore — Claude project context

> Ezt a fájlt **minden új munkamenet** beolvassa: mi a projekt, hol mi van, milyen szabályok
> szerint dolgozunk, mi van nyitva. A mostani állapotot írja le (utoljára rendbe téve: 2026-10-06, v98).
> A teljes verzió-történet, a modulok motorjainak részletes leírása és a lezárt backlog a
> **`HISTORY.md`**-ben van — oda akkor nézz be, ha egy régi döntés vagy javítás hátterét keresed.

---

## 1. Mi a projekt

**NihonCore** — magyar nyelvű japán nyelvtanuló webapp. A kezdőlapon vezetett **tanulási út** áll
(a Dekiru 1 és 2 tankönyv leckéinek sorrendjében, JLPT N5 → N4, némi N3), leckénként magyarázattal;
mellette **gyakorló modulok** (ragozás, partikulák, melléknevek, számlálók, dátum és idő, hallás,
nyelvtani minták, szabad fordítás, kana) és **statisztika**.

- **Stack:** sima HTML / CSS / JS — **nincs keretrendszer, nincs build**.
- **Élesítés:** GitHub Pages a `main` ágról (`github.com/Nokedli25TTV/NihonCore`).
- **Fiók és szinkron:** Firebase Auth + Firestore (`js/auth.js`, `js/sync.js`). Nem kötelező: az app
  bejelentkezés nélkül is teljes, minden adat a böngészőben (localStorage) él.
- **PWA:** `sw.js` (network-first app-shell), `manifest.webmanifest`.
- **A user nyelve magyar: válaszolj magyarul**, a felület magyar.
- **Testvér-app:** a user LexiLearn nevű appja viszi a **szókincset és a kanjit**. A NihonCore ezt
  nem duplázza: a leckékbe csak a megértéshez kellő szavak kerülnek.

### 🟢 A tartalom-feltöltés folyamatban van (2026-10-04 óta)

A user elindította a nagy feltöltést („kezdhetjük… nagy munka lesz"). A sorrendet nem ő szabta meg:
a terv a munkamenet-memóriában van (`content-load-plan.md`), a már kész adagok a 11. fejezetben.

- ✅ **Leckéhez kötött gyakorló anyag** készül: nyelvtani minták és Mondat-Mester-készletek leckénként,
  mindegyikhez lépés a tanulási úton. Adagonként: generálás → fej nélküli próba → commit.
- ✅ Új **funkció, mechanika, motor**: nincs korlát. Új **mező a sémában**: rendben.
- ❌ **Szókincset és kanjit ne tölts fel** (az a LexiLearn dolga); a leckékhez nem tartozó, öncélú
  mennyiség-növelés sem cél.
- Sémák és a generált blokkok rendje: **`CONTENT_LOAD_GUIDE.md`** (8d. fejezet).

**A leckék** (`js/data/course.js`) készek és részletesek (a user kérésére).

### Mi van benne most

| Rész | Tartalom |
|---|---|
| **Leckék** | **57 lecke** (előkészítő + Dekiru 1: 24 + Dekiru 2: 24 + 8 kiegészítő N5 / N4): 402 nyelvtani pont, 2390 példamondat, 1142 saját kérdés, 699 párbeszéd-sor, 547 kifejezés, 1484 szó-kártya, 321 tábla, 344 „gyakori hiba", 197 kulturális tudnivaló |
| **Tanulási út** | 238 lépés 53 fejezetben: 226 kötelező (75 lecke-lépés: magyarázat és hallás utáni kör; 151 gyakorló lépés a modulokból, ebből 56 „a lecke mintái" és 37 leckéhez kötött mondatkészlet) + 12 nem kötelező dolgozat |
| Ragozó | 168 ige (111 godan + 55 ichidan + 2 rendhagyó), 12 alak |
| Mondat-Mester | 627 mondat (224 N5 + 301 N4 + 102 N3), ebből 301 leckéhez kötött (37 készlet); 16 partikula a tálcán |
| Melléknév | 109 い + 40 な melléknév, 9 alak |
| Számlálók | 12 számláló, 102 tárgy |
| Dátum & Idő | 289 elem 10 kategóriában (a nyolc dátum- és idő-kategória + életkor: 〜歳, időtartam: 〜時間・〜週間・〜か月・〜年間) |
| Hallás & Kiejtés | 134 hang-lecke + 1065 mondat (Pro hallás: a nyelvtani minták példái) |
| Nyelvtani minták | 283 minta (92 N5 + 138 N4 + 53 N3) 32 kategóriában, 1065 példa (mintánként 2–5: 566 saját + 499 a leckék példamondataiból); 268 leckéhez kötött (56 lecke) |
| Kana | 104 jel írásonként (hiragana + katakana) — teljes készlet |
| Mini-leckék | 7 (modulonként egy minta) — félretéve |
| **Dolgozatok** | 12: nyolc kis teszt (4 leckénként, 30 perc, 30 kérdés) és négy nagy dolgozat (12 leckénként, 60 perc, 60 kérdés); a kérdések kitöltésenként a leckék anyagából állnak össze |

---

## 2. Fájlszerkezet

```
NihonCoreV2/
├── index.html              ← Kezdőlap: „Folytatás" kártya, napi cél, ismétlés, tanulási út (térkép)
├── sw.js                   ← Service Worker — a gyökérben KELL lennie (hatókör)
├── manifest.webmanifest
├── README.md               ← a GitHub-oldal bemutatója (képek: img/readme/)
├── CLAUDE.md               ← ez a fájl
├── HISTORY.md              ← verzió-történet, a motorok részletes leírása, lezárt backlog
├── PRODUCT.md              ← design-kontextus (kinek, milyen hangon) — az impeccable skill olvassa
├── CONTENT_LOAD_GUIDE.md   ← tartalom-feltöltési útmutató, sémák
├── pages/
│   ├── lesson.html         ← lecke (?id=l0…l48, k1…k8 · &round=listen · ?review=1 = napi ismétlés)
│   ├── modules.html        ← a modul-kártyák („Szabad gyakorlás") — statikus
│   ├── kana.html           ← Kana
│   ├── module.html         ← generikus modul-oldal: ?id=arimasu-imasu (Alap igék) · ?id=szamlalok (Számlálók)
│   ├── practice.html       ← Mondat-Mester (Partikula-kitöltő + Mondat-Puzzle)
│   ├── conjugation.html    ← Ragozó
│   ├── adjectives.html     ← Melléknév
│   ├── datetime.html       ← Dátum & Idő
│   ├── listening.html      ← Hallás & Kiejtés
│   ├── grammar.html        ← Nyelvtani minták
│   ├── production.html     ← Szabad fordítás
│   ├── exam.html           ← Dolgozatok (azonosító nélkül: a lista · ?id=t04 … d48: egy dolgozat)
│   ├── stats.html          ← Statisztika
│   └── login.html · register.html
├── css/
│   ├── style.css           ← a teljes stíluslap (~8400 sor)
│   └── auth.css            ← a belépő oldalak kiegészítése (a style.css-t is betöltik)
├── js/
│   ├── app.js              ← MINDEN logika (~18 700 sor): közös részek + oldalanként egy init…Page()
│   ├── auth.js             ← NihonCoreAuth (Firebase Auth, lusta betöltés)
│   ├── sync.js             ← NihonCoreSync (Firestore: a tanulási adatok szinkronja)
│   └── data/               ← tartalom és szabályok, fájlonként globális const-ok
│       ├── core.js         ← modul-configok, partikulák, ragozási szabályok, hibatípusok,
│       │                     NIHONCORE_PATH + _PATH_UNITS (tanulási út), NIHONCORE_LESSONS (mini-leckék)
│       ├── course.js       ← NIHONCORE_COURSE: az 57 lecke (2,1 MB — csak a lesson.html tölti)
│       ├── sentences.js · verbs.js · adjectives.js · counters.js · datetime.js · audio.js · grammar.js
│       └── kana.js
├── img/                    ← logo.png, ikonok; img/readme/ = a README képei
└── .claude/skills/impeccable/   ← design-skill (követett)

Nem követett, helyi: Japan_anyagok/ (a forrás-könyvek — SOHA nem kerülhet a repóba), AGENTS.md, .agents/
```

### Útvonalak

| Cél | `index.html`-ből | `pages/*.html`-ből |
|---|---|---|
| CSS / JS / kép | `css/style.css` · `js/app.js` · `img/x.png` | `../css/style.css` · `../js/app.js` · `../img/x.png` |
| Másik oldal | `pages/grammar.html` | `grammar.html` |
| Vissza a kezdőlapra | — | `../index.html` |

A Service Worker regisztrációja az `app.js` saját URL-jéből számolja a gyökeret, így mindkét helyről jó.

### Új oldal hozzáadása

1. Új HTML a `pages/`-be (a fejléc, a betűk és a szkriptek mintája: bármelyik meglévő modul-oldal).
2. `<main id="újMain">` + új `initÚjPage()` az `app.js`-ben + új ág az `initCurrentPage()` oldal-felismerőben.
3. Kártya a `pages/modules.html`-ben.
4. `sw.js`: az oldal az `APP_SHELL` listára + `CACHE_VERSION` léptetése.
5. Ha a tanulási útba is kell: lépés a `NIHONCORE_PATH`-ba (lásd 6. fejezet).

**Új logika → az `app.js` megfelelő részébe. Új tartalom → a megfelelő `js/data/*.js`-be.**
Új fájl csak akkor indokolt, ha új oldal, új statikus eszköz vagy új, önálló tartalom-kör.

---

## 3. Az `app.js` szerkezete

Egyetlen fájl, minden oldal ezt tölti. Felül a **közös részek** (minden oldalon futnak), alattuk
**oldalanként egy `init…Page()`** — mindegyik zárványban (closure) tartja az állapotát, globális változó nincs.

Gyors térkép: `grep -n "^function init\|^window.NihonCore\|^const NihonCore\|^(function init" js/app.js`

**Közös részek (a fájl elején, ebben a sorrendben):**

| Név | Mit csinál |
|---|---|
| `NihonCoreMotion` | animációk (anime.js): `flashCorrect`, `shakeWrong`, `staggerIn`, `celebrate` |
| `NihonCoreRound` | **kör-őr**: `begin(snapshotFn)`, `isActive()`, `flush()` (félbehagyott kör mentése), `markComplete()`, `scrollToRound()`, `confirmExit` / `confirmDelete` (saját megerősítő lap), `refresh()` (modul-név a fejlécbe). Ő teszi a `body.round-active` osztályt. |
| `NihonCorePath` | **tanulási út**: `view()`, `setLevel()`, `stepHref()`, `apply(modul, settings)`, `onSession(rec)`, `PASS` (0,6) |
| `initLessons` | mini-leckék a lobbi fölött (`NIHONCORE_LESSONS`) |
| `NihonCorePrefs` | `timerOn()` — időlimit a beírós módokban (alapból ki) |
| `initLobbyQuickStart` | minden lobbit átrendez: Mód → Indítás → összecsukott Testreszabás |
| `initRoundKeys` | billentyűk körben: 1–9 válasz, Enter tovább, Esc kilépés |
| `NihonCoreFlashcard` + `initFlashcardLaunchers` | szókártyák és párosító a modulokhoz |
| `initPWAToasts` · `initServiceWorker` | telepítés / frissítés jelzése, SW regisztráció |
| `initNihonCoreTheme` | világos / sötét téma (`html.theme-sumi`), `NihonCoreTheme.toggle()` |
| `initAppTabbar` | telefonon az alsó fül-sáv (Kezdőlap · Modulok · Statisztika · Fiók) |
| `initAuthHeaderState` | fiók-jelvény és menü a fejlécben |
| `initHelpersToggle` | Romaji / Magyar / Hang kapcsolók (`body.helpers-no-romaji`, `helpers-no-hu`) |
| `NihonCoreAudio` | hang: `play(szöveg, { speed, onEnd, onError })`, `stop()`, `speakAnswer()`. Google TTS, hibánál a böngésző japán felolvasója. |
| `NihonCoreKana` | kana ⇄ romaji: `fromRomaji(szöveg)` · `toRomaji(kana-darab)` (kiejtés szerint: a darab végi は = wa) · `repairSpoken(beírt, helyes)` — a kiejtés szerint írt partikula (wa, o, e), a kettőzött magánhangzó a ー helyén, a „zu" a づ helyén nem hiba · `liveKana(érték)` / `bindInput(mező)`: gépelés közben a romaji kanává alakul. A Pro hallás, a Szabad fordítás, a minták kiegészítő módja, a kanás leckék és a dolgozatok használják. |
| `NihonCoreConj` | **ragozó motor** (állapot nélkül): `conjugate(ige, alak)` → `{ kana, romaji, irregular, morphemes }`, `composeAdj(melléknév, alak)`, `StemEngine`, `VerbDetector`. A Ragozó és a Melléknév oldal meg a dolgozatok közösen használják. |
| `NihonCorePuzzle` | **mondat-ellenőrző**: `validate(sorrend, mondat)` — a Mondat-Mester puzzle-módja és a dolgozatok közösen használják. |
| `initGlobalAnswerAudio` · `initGlobalFeedbackMotion` | a visszajelzés helyes japán válaszának felolvasása (`.pfe-jp-ok`) és animálása |
| `initFocusBanner` | a statisztika „célzott gyakorlás" ajánlata a modul-oldalon |
| `NihonCoreStats` | **munkamenet-napló**: `recordSession(info)`, `getSessions()`, `getDailyAggregates()`, `getToday()`, `getStreak()`, `clearSessions()` |
| `NihonCoreSRS` | **ismétlés-ütemező** (dobozok: 0 / 1 / 3 / 7 / 14 / 30 nap): `recordReview(id, 0\|1\|2)`, `getItemState`, `getDueItems`, `dueInfo(prefix)`, `aggregateBoxes`, `clearScope` |

**Oldalak:** `initLanding` (kezdőlap) · `initModulePage` (Alap igék, Számlálók) · `initPracticePage`
(Mondat-Mester) · `initAuthPages` · `initConjugationPage` · `initAdjectivesPage` · `initDateTimePage` ·
`initListeningPage` · `initGrammarPage` · `initProductionPage` · `initExamPage` (dolgozatok) · `initStatsPage` ·
`initKanaPage` · `initLessonPage`. A modulok motorjainak belső felépítése: `HISTORY.md` 2. fejezet.

**Oldal-felismerő** (`initCurrentPage`, a fájl végén) a `<main>` azonosítója szerint: `statsMain`,
`examMain`, `kanaMain`, `lessonMain`, `prodMain`, `grmMain`, `listeningMain`, `dtMain`, `adjMain`, `conjugationMain`,
`moduleMain`, `practiceMain`, `.auth-card`, `homeMain`. A `modules.html`-nek nincs saját initje.

🔴 **A közös modulok a `window`-n legyenek** (`window.NihonCoreX = …`): a felső szintű `const` nem kerül
a `window`-ra, és a `window.NihonCoreX` ellenőrzések csendben hamisak lesznek (ebből volt már hiba).

**Fejlesztői kampók** (konzolból, tesztből): `window._lesson`, `_conj`, `_adj`, `_dt`, `_lst`, `_grm`, `_prod`, `_exam`.

---

## 4. Adatfájlok (`js/data/`)

Minden fájl globális `const`-okat ad, egymástól függetlenek, `defer`-rel töltődnek az `app.js` előtt.

| Fájl | Globálok |
|---|---|
| `core.js` | `NIHONCORE_MODULES` (arimasu-imasu, szamlalok) · `NIHONCORE_PARTICLES` (16) · `PARTICLE_ERROR_RULES` · ragozás: `_GODAN_MAP`, `_TE_RULES`, `_VERB_EXCEPTIONS`, `_IRREGULAR_FORMS`, `_FORM_RULES`, `_FORM_GROUPS`, `_ERROR_TYPES` · melléknév: `_ADJ_FORM_RULES`, `_ADJ_FORM_GROUPS`, `_ADJ_ERROR_TYPES` · `_DT_CATEGORIES`, `_DT_ERROR_TYPES` · `_AUDIO_CATEGORIES`, `_AUDIO_TIERS`, `_AUDIO_ERROR_TYPES` · `_GRAMMAR_CATEGORIES`, `_GRAMMAR_ERROR_TYPES` · **`NIHONCORE_PATH`**, **`NIHONCORE_PATH_UNITS`** · **`NIHONCORE_EXAMS`** (dolgozatok) · `NIHONCORE_LESSONS` |
| `course.js` | `NIHONCORE_COURSE` — a leckék. A séma a fájl elején van leírva. |
| `sentences.js` | `NIHONCORE_SENTENCES` — tokenizált mondatok (`type`: `word` / `particle` / `verb`) |
| `verbs.js` · `adjectives.js` | `NIHONCORE_VERBS` · `NIHONCORE_I_ADJECTIVES`, `NIHONCORE_NA_ADJECTIVES` |
| `counters.js` | `NIHONCORE_COUNTERS`, `_COUNTER_CATEGORIES`, `_COUNTER_ITEMS` |
| `datetime.js` | `NIHONCORE_DT_MONTHS / DAYS / WEEKDAYS / TIMES / HOURS24 / MINUTES / YEARS / RELATIVE / AGES / DURATIONS` |
| `audio.js` · `grammar.js` · `kana.js` | `NIHONCORE_AUDIO_LESSONS` · `NIHONCORE_GRAMMAR_PATTERNS` · `NIHONCORE_KANA_ROWS / _GROUPS / _CONFUSABLE` |

**Szabályok**
- A tartalom-fájlokban **csak tartalom-tömb** legyen; a kategóriák, hibatípusok, szabályok a `core.js`-ben
  élnek. Ha ugyanaz a `const` két fájlban szerepel, a betöltés `SyntaxError`-ral megáll.
- Egy tartalom-fájl **teljes cseréje** rendben van (a user így tölt fel), összefésülni nem kell.
- **Mondat-Mester:** a partikula-token `romaji` mezője a tálca-azonosító (`NIHONCORE_PARTICLES[].id`);
  ami nincs a tálcán, az partikula-módban megoldhatatlan. A の szerepe `possession`. A `metadata.tense`
  csak `Non-Past` / `Past` / `Progressive`, a `register` csak `Polite` / `Casual` lehet (a lobbi szűrői).
  Kanjis tokennél a Szabad fordítás a romajiból számolja a kanát: ahol ez nem pontos (つづける), a token
  kapjon `kana` mezőt.
- **Leckéhez kötött készletek** (`lesson: 'l25'` mező a mintán / mondaton): a `grammar.js` és a
  `sentences.js` végén, `/* @feltöltés:kezdet … */` és `/* @feltöltés:vég */` között állnak, leckénként
  rendezve. Tömör forrásból generált blokkok: kézzel is szerkeszthetők, de új adagnál a blokk egésze újraíródik.
  Út-lépésben a `lesson` mezős mondat csak a saját (`ids`-szel felsorolt) lépésében jön elő.
- **Dátum & Idő — számlálós alakok** (életkor, időtartam): a bejegyzés `unit` mezője a számláló kanája (a rossz válaszok
  azonos egységűek, és az Építkezés mód ebből bont), `naive` a hibás „szabályos" alak (csapda-válasz és magyarázat),
  `alt` a második, szintén helyes olvasat (しちじかん / ななじかん).
- **A minták `from: 'lecke:pont:példa'` mezős példái** a lecke adott példamondatából készültek (a kiemelt rész, a romaji
  és a tokenek gépi úton): ha a lecke példája változik, ezt is javítani kell.
- **Nyelvtani minta `summary` mezője** a felismerő mód válasz-szövege: rövid és **egyedi** legyen. A példa
  `cloze` / `clozeAnswer` része a minta legjellemzőbb eleme (a felismerő kártya ezt emeli ki).
- **Leckék japán szövege:** 1–4. lecke kana szóközökkel; 5-től kanji `{漢字|かな}` jelöléssel (ebből lesz a
  furigana ÉS a felolvasott kana). A `lead` és a `cando` sima szöveg: ott nem lehet jelölés.
- 🔴 **A lecke `quiz` tömbjének sorrendje azonosító** (az ismétlés-ütemező `lesson:<lecke>:<sorszám>` kulcsa):
  új kérdés a tömb **végére**, meglévőt ne törölj és ne cserélj fel. A kérdés `point` mezője mondja meg,
  melyik nyelvtani ponthoz tartozik (sorszám 1-től; ha egyikhez sem, a mező elmarad).

**Betöltés:** a 8 gyakorló oldal (module, practice, conjugation, adjectives, datetime, listening, grammar,
production) és a statisztika mind a 8 modul-adatfájlt tölti (`core`, `sentences`,
`verbs`, `adjectives`, `counters`, `datetime`, `audio`, `grammar`); `index.html`: csak `core.js`;
`lesson.html`: `core.js` + `course.js`; `exam.html`: `core`, `course`, `sentences`, `verbs`, `grammar`;
`kana.html`: `core.js` + `kana.js`; `modules.html`, `login`,
`register`: adat nélkül. Mindenhol: anime.js (CDN) → adat → `auth.js` → `sync.js` → `app.js`.

---

## 5. Tárolás (localStorage)

| Kulcs | Mi | Szinkron |
|---|---|---|
| `nihoncore_sessions_v1` | munkamenet-napló (minden kör egy rekord; `partial`: félbehagyott) | ✓ hozzáfűzés |
| `nihoncore_srs_v1` | ismétlés-ütemező (`grammar:` és `lesson:` elemek) | ✓ elemenként a frissebb |
| `nihoncore_path_v1` | tanulási út: szint + lépések (`best`, `done`) | ✓ |
| `nihoncore_goal_v1` | napi cél | ✓ |
| `nihoncore_exams_v1` | dolgozatok: a kitöltések listája (dátum, mód, idő, pontszám, részenként és leckénként, hibák) | ✓ hozzáfűzés |
| `nihoncore_<modul>_profile_v1` / `_settings_v1` | modul-profilok és lobbi-beállítások (conj, adj, dt, listening, grm, prod, kana) | ✓ (a kana_settings nem) |
| `nc_fc_state_*` | szókártyák állapota | ✓ |
| `nihoncore_exam_settings_v1` (a dolgozat indítás előtti beállításai), `nihoncore_exam_run_v1` (a futó dolgozat: folytatható), `nihoncore_theme`, `helpers_*`, `audio_on`, `timer`, `lobby_custom_open`, `toc_v1`, `lesson_pos_v1`, `lessons_seen`, `path_seen_v1`, `dlg_jponly`, `focus_hint`, `last_readiness_tier` | eszköz-helyi beállítások és nézet-állapot | ✗ |
| `sessionStorage: nihoncore_map_open` | a térképen kézzel nyitott / csukott fejezetek | ✗ |

Szinkron (`js/sync.js`): `users/{uid}` dokumentum; belépéskor letöltés + összefésülés, utána feltöltés
3 mp késleltetéssel (`NihonCoreSync.schedulePush()`). **Új szinkronizálandó kulcs → az `EXACT_KEYS` listára.**
`file://` alatt az Auth és a szinkron csendben kikapcsol.

---

## 6. Hogyan működik: út, lecke, kör, ismétlés

### Tanulási út (`core.js` + `NihonCorePath` + `initLanding`)
- **Lépés** (`NIHONCORE_PATH`): `{ id, glyph, title, desc, module, href, level?, mode?, preset?, optional? }`. Az `optional` lépés
  (dolgozat) megjelenik a térképen, de nem állítja meg az utat, és nem számít bele a haladásba.
  **Fejezet** (`NIHONCORE_PATH_UNITS`): `{ id, kicker, title, sub, steps[] }`. Új lecke vagy lépés = csak adat.
- **`preset`** a lépés előre beállított köre, modulonként: Mondat-Mester `level`, `mode`, `ids`, `idRanges`,
  `particlesOnly`, `particlesAny` · Ragozó / Melléknév / Dátum / Nyelvtan `only` (szűrők) + `set` (pl. `mode`) ·
  Nyelvtan `patterns` · Számlálók `counters` · Alap igék `category` · Kana `set.script`.
- A modul-oldal a `?step=<id>` paraméterből tudja, hogy út-lépés fut; szabad gyakorlásnál nincs aktív lépés.
- **A lépés akkor kész, ha egy teljes kör ≥ 60%.** A `recordSession` szól az útnak (`onSession`), kivéve ha
  `skipPath: true` vagy a kör félbehagyott.
- **Kezdőlap:** szintválasztó (első alkalommal) → „Folytatás" kártya (napi cél + sorozat) → „Mai ismétlés"
  kártya → térkép. A térképen csak az aktuális és a következő két fejezet nyitott (`foldMapUnit`); oldalt
  becsukható tartalomjegyzék (`renderToc`).

### Lecke-oldal (`initLessonPage`)
- **Lapozós menet:** egy rész = egy lap (`initSteps`, `showLap`, `nextLap`). Lapfajták: `lap` (fő lap),
  `part` (a fő laphoz tartozó folytatás: a pont példa-lapja, a párbeszéd megjegyzései), `quick` (gyors kérdés).
  Egy nyelvtani pont = **szabály-lap → példa-lap → gyors kérdés**.
- **Állapot-osztályok:** `html.lesson-steps` (lapozós keret; a fejléc helyén a lépés-sáv) ·
  `html.ls-round` (kör-nézet: a kör ÉS az összesítője — ilyenkor a lépés-sáv és a gombsor rejtve) ·
  `body.round-active` (fut a kör; a kör-őr állítja).
- **Körök** (`startQuiz(kind, retryCards)`): `check` (10 kérdés: 6 saját + a példákból készített fordítós) ·
  `listen` (a lecke példái hang után) · `review` (`?review=1`: napi ismétlés) · javító kör („Hibáim újra":
  `retry` néven mentve, `skipPath`) · a lapok gyors kérdései `quick` néven mentve (`flushQuick`).
- **Ismétlés:** a saját kérdések az ütemezőbe kerülnek (`srsMark`): rossz válasz → azonnal esedékes; jó válasz
  csak akkor léptet előre, ha a kérdés új vagy már esedékes volt.
- **Párbeszéd:** „Lejátszás végig" (`playDialogue`) és „Csak japánul" nézet.
- **Kanás leckék (1–4.: nincs kanji):** a megjelenítés után a `glossRomaji(elem)` a magyarázatok, táblák, minták, „gyakori
  hibák" és kérdések kana-darabjai fölé romajit tesz (`ruby.lp-rj > rt.lp-rj-romaji`); a példák, a párbeszéd és a szavak saját
  romaji-sora marad. Új, kanát tartalmazó lecke-elem megjelenítése után hívd meg rá.

### Dolgozatok (`core.js` + `initExamPage`)
- **Leírás** (`NIHONCORE_EXAMS`): `{ id, kind: 'quick' | 'big', glyph, title, desc, lessons[] }`; az `id` egyben a (nem kötelező)
  lépés azonosítója a tanulási úton. Kis teszt: 30 perc, 30 kérdés; nagy dolgozat: 60 perc, 60 kérdés.
- **Összeállítás** kitöltésenként, azonos arányokkal (`PLAN`): kb. 80% a `lessons` leckéiből, 20% a korábbiakból. Források: a
  leckék saját kérdései és példamondatai (`course.js`), a lecke mintái (`grammar.js`), a lecke mondatai (`sentences.js`: a
  `lesson` mezősek + a fejezet Mondat-Mester lépéseinek régi mondatai), az addig tanult igealakok (a fejezetek Ragozó-lépéseiből).
- **Részek:** `gram` (saját kérdés, mintafelismerés, olvasás) · `part` (partikula, mondat összerakása) · `write` (ragozás, a minta
  hiányzó része: beírós, a romaji gépelés közben kanává alakul) · `listen` (mondat hang után). **Típusok:** `choice` / `tokens` / `typed`.
- **Beállítások indítás előtt** (`nihoncore_exam_settings_v1`): vizsga-mód (óra, visszajelzés csak a végén; a választás a
  „Tovább"-ig módosítható) vagy gyakorló mód (idő nélkül, kérdésenként visszajelzés) · romaji · magyar segítség · hanggal
  (nélküle a hallás rész helyére olvasós kérdés kerül).
- **Befejezés:** a kitöltés mentése (`nihoncore_exams_v1`), `recordSession({ module: 'exam', mode: 'exam-quick' | 'exam-big', skipPath })`,
  a lépés 60%-tól kész (az oldal maga írja az út állapotát).
  A hibás saját kérdések az ismétlés-ütemezőbe kerülnek.
- **Folytatás:** a futó dolgozat minden válasz után (és a lap háttérbe kerülésekor) elmentődik (`nihoncore_exam_run_v1`): újratöltés
  vagy kilépés után a lobbiból folytatható, az óra a távollét alatt áll. Kilépéskor ezért nem megy részmentés a statisztikába;
  eldobáskor (vagy új kitöltés indításakor) az addigi válaszok részmentésként kerülnek oda.
- **„Hibáim újra"** a dolgozat végén: a hibás kérdések gyakorló módban (`exam-retry` néven mentve, kitöltésnek nem számít).
- **Ragozós kérdések:** igék (`conjugate`) és — ahol a fejezetekben már volt Melléknév-lépés — melléknevek (`composeAdj`, a kérdések harmada).
- **Statisztika → „Dolgozatok" fül** (`renderExams`): összesítő számok, a gyenge leckék (dolgozatonként a legutóbbi kitöltésből),
  dolgozatonként kártya (a kitöltések vonala, a legutóbbi részenként, a kitöltések listája), a még meg nem írtak.

### Minden kör közös életciklusa
`NihonCoreRound.begin(snapshotFn)` → kártyák (`scrollToRound()` lapozáskor) → a végén
`NihonCoreStats.recordSession({ module, mode, results, score, startTs, skipPath? })`. Kilépéskor a kör-őr
elmenti a részeredményt (`partial`). Új mód vagy modul nevét vedd fel a statisztika `MODE_LABELS` /
`MODULE_LABELS` tábláiba, különben nyers kóddal jelenik meg.

---

## 7. Konvenciók

### Munkamód
- **Magyarul** válaszolj; a felület szövege magyar, zsargon és verziószám nélkül.
- **Ne indíts szervert, előnézetet, localhostot** (user-kérés): ne hozz létre `.claude/launch.json`-t, ne hívj
  `preview_start`-ot, ne futtass `python -m http.server`-t. Az ellenőrzés **fej nélküli böngészővel megy a helyi
  fájlokon (`file://`)** és statikus vizsgálattal (`node --check`, adat-ellenőrző szkriptek).
- **A forrás-könyvek szövege nem másolható** (a `Japan_anyagok/` mappa soha nem kerülhet a repóba): a leckékben
  csak saját szavas magyarázat és saját példamondat lehet.
- **Git:** kész, ellenőrzött munka a `main`-re megy és feltöltődik; soha ne írj felül commitot (`--amend` nincs).
  Minden kiadásnál léptesd a `sw.js` `CACHE_VERSION`-jét.
- **Ízlés-kérdésnél** (elrendezés, szín) valódi képeken mutass változatokat, és a user válasszon.
- Jóváhagyott terven belül **ne állj meg fázisonként**; csak valódi kérdésnél kérdezz.
- Amit nem tudtál ellenőrizni (valódi telefon: érintés, hang, animáció; anyanyelvi helyesség), azt mondd meg.

### Kód
- Vanilla JS, nincs keretrendszer, nincs build, nincs új JS-fájl kódszervezés címén.
- Állapot zárványban (az `init…Page()`-en belül), nem globálisan.
- Új szín, betűméret, lekerekítés, időzítés: **tokenből** (8. fejezet), ne beégetett értékből.
- Új osztály a romaji szövegre `*-romaji`, a magyar fordításra `*-hu` végződést kapjon, és kerüljön be a
  `body.helpers-no-romaji` / `helpers-no-hu` rejtő-listába. A magyar felirat (utasítás) nem „`-hu`".
- Nagyobb változás után: fej nélküli végigjárás az érintett oldalakon, és nézd meg a többi oldalt is, ha
  közös részhez nyúltál.

### 🔴 Kör-keret: minden modul-oldal ugyanúgy épül

A keretet a stíluslap végi **KÖR-KERET** és **LOBBI** blokk és az `app.js` közös részei adják; új modulnál elég
a meglévő osztályneveket használni.

1. **Fejléc:** lebegő üveg-sáv — logó · modul-név (`.nav.module-page-nav`, JS tölti) · belépés, téma, 🏠.
   Telefonon (< 768 px) a navigáció az alsó fül-sáv.
2. **Modul-fejléc** (`.module-hero`): lobbiban látszik, **kör alatt rejtett** (`hidden` osztály). Az
   újra-megjelenése jelzi a kör-őrnek a kilépést.
3. **Lobbi** (`.conj-lobby` / `.practice-lobby` / `.ms-lobby` / `.cnt-lobby`): `.lobby-header`, `.lobby-section`-ök,
   `.lobby-stats`, `.ml-start`. A módválasztó sor osztályneve tartalmazza a `mode-row`-t; ami elöl maradjon,
   kapjon `data-lobby-keep`-et.
4. **Kör-sáv:** `.pr-stats` (Pont, Sorozat, `.round-exit`) + `.round-progress`; a tároló `.conj-runtime`
   (vagy `.practice-runtime`).
5. **Kártya:** `.conj-card` (vagy `.pr-card`): `.cj-prompt`, `.cj-options > .cj-option` (`correct` / `wrong` /
   `reveal-correct`), `.dont-know-btn`. Beírós módnál a beküldés a `.conj-actions`-ben (ragadós).
6. **Visszajelzés:** `.conj-feedback` (vagy `.pr-feedback`) a kártya **testvére** → rögzített alsó lap.
   Osztály: `pr-fb-correct` / `pr-fb-wrong` / `pr-fb-dontknow`. Tartalom: `.pr-fb-header`,
   `.pr-fb-explain > .pfe-row` (`pfe-correct` / `pfe-wrong` / `pfe-context` / `pfe-rule`), a végén a „Következő".
   A helyes japán válasz `.pfe-jp-ok`-ban legyen (ezt olvassa fel a hang).
7. **„Nem tudom"** gomb minden kártyán: felfedi a választ, hibának számít, a fejléc semleges.
8. **Billentyűk:** az opciók osztálya `.cj-option` / `.cnt-option` / `.sd-option` / `.mc-choice` legyen.
9. **Kilépés:** megerősítő lap; az eddigi válaszok elmentődnek.

---

## 8. Design tokenek (`style.css :root`) — indigó paletta, üveges felületek

> Japán indigó gyöngyfehér alapon, arany kiemeléssel; a felületek áttetsző, lebegő panelek sima színmezős
> háttér fölött. **A token neve a szerepét mondja, nem a színét.** Nincs neon-ragyogás, nincs színátmenetes
> szöveg, nincs oldalsávos keret. A design-kontextus a `PRODUCT.md`-ben van.

```css
/* Szín-csatornák — MINDEN áttetsző szín ezekből: rgb(var(--x-rgb) / alfa) */
--tint-rgb (halvány töltés, keret) · --shade-rgb (árnyék) · --glass-rgb (az üveg anyaga)
--brand-rgb / --ok-rgb / --gold-rgb / --verm-rgb / --amber-rgb / --indigo-rgb

/* Paletta — szerepek */
--washi #E9EDF6 (háttér) · --washi-deep · --washi-soft · --washi-edge
--sumi #171C2E (szöveg) · --sumi-soft · --sumi-faint
--brand (FŐ SZÍN: felület, keret, kijelölés) · --brand-deep (SZÖVEG) · --brand-soft
--ok (HELYES válasz, zöld) · --ok-deep (SZÖVEG) · --ok-soft        ← nem a fő szín!
--gold-trad (arany kiemelés) · --gold-ink (arany SZÖVEG) · --amber / --amber-ink (figyelmeztetés)
--vermilion (hiba) · --indigo (info — türkiz; a név régi)
--accent / --accent-hover / --on-accent   (elsődleges gomb)
--brand-fill-top / --brand-fill-deep      (telített felület színátmenete)
--teal / --green   régi aliasok (új kódban ne)

/* Üveg */
--glass-bg         görgő panel: matt üveg, ELMOSÁS NÉLKÜL
--glass-bg-strong  rögzített réteg (fejléc, fül-sáv, menü)
--glass-blur       elmosás — CSAK rögzített rétegen
--glass-border · --glass-shadow · --glass-shadow-lg
--glass-fill / --glass-fill-edge   beágyazott blokk töltése

/* Tipográfia: fix skála, 12 px alatt nincs szöveg */
--fs-2xs 12 · --fs-xs 13 · --fs-sm 14 · --fs-base 16 · --fs-md 18 · --fs-lg 20 · --fs-xl 24 · --fs-2xl 32 · --fs-3xl 40 · --fs-4xl 48
--font-body Figtree (alap súly 500) · --font-logo Sora (csak a logó) · --font-jp Figtree + Noto Sans JP (MINDEN japán szöveg)

/* Váz */
--nav-h · --header-h · --tabbar-h · --page-pad · --touch (44 px)
--radius-sm 10 · --radius-md 16 · --radius-lg 24 · --radius-xl 32
--t-fast 120ms · --t-base 160ms · --t-slow 220ms (csak ease-out) · --ease-out
```

**Szabályok**
- **Színt csak tokenből.** Áttetsző szín: `rgb(var(--tint-rgb) / 0.08)` — a beégetett `rgba(…)` nem követi a sötét témát.
- **Fő szín ≠ helyes válasz.** Gomb, kijelölés, haladás: `--brand*`. Jó válasz, „kész": `--ok*`.
- **Egy telített felület képernyőnként** (indigó színátmenet, fehér szöveg): a kezdőlapon a `.continue`, a
  statisztikában a `.st-hero`. Ezeken belül a fehér árnyalatok beégetve maradhatnak.
- **Gombok:** `.btn-primary` lakkozott indigó · `.btn-outline` üveg · `.btn-ghost` csak szöveg. Lenyomható elem:
  alsó „perem" (`box-shadow: 0 Npx 0`), lenyomva `translateY`.
- **Szöveg kontrasztja:** fő szín szövegként `--brand-deep`, zöld `--ok-deep`, arany `--gold-ink`, borostyán `--amber-ink`.
- **Üvegen belül nincs újabb üveg** — beágyazott blokk: `--glass-fill`.
- 🔴 **Elmosás (`backdrop-filter`) CSAK rögzített rétegen** (`.header`, `.nc-tabbar`). Görgő elemen tilos: a
  böngésző képkockánként újraszámolja, és akad a görgetés (ebből volt user-panasz). Új rögzített réteget is
  építs inkább tömörre. Nagy kártyán ne animálj `box-shadow`-t; állandó szabályban ne legyen `will-change`.
- **Nincs talpas és nincs dőlt betű** (user-döntés) — ne állítsd vissza.
- **Betűméret csak a skáláról**; érintési célpont ≥ 44 px; beviteli mező betűje ≥ 16 px.
- **Töréspontok:** telefon ≤ 599 · tablet 600–1023 · asztali ≥ 1024; a navigáció 768-nál vált. Telefon az első.
- **Sötét téma:** `html.theme-sumi` csak a csatornákat és a paletta-tokeneket cseréli.
- **Mozgás:** csak `transform` / `opacity`; `prefers-reduced-motion` mellett kikapcsol.

**A stíluslap rétegei:** tokenek, váz → a modulok régebbi szabályai → a fájl **végén** a közös blokkok, ebben a
sorrendben: KÖR-KERET · LOBBI · KANA · MINI-LECKE · TANULÁSI ÚT — térkép · STATISZTIKA — műszerfal · MOZGÁS ÉS
FELÜLET-FINOMÍTÁS · LECKE-OLDAL · DOLGOZAT · SZÖVEG-ERŐSÍTÉS. A végső blokkok felülírják a korábbiakat: közös viselkedést
oda írj, ne a modul-szekcióba.

---

## 9. User-döntések (ezekhez mérj minden további munkát)

- **Célközönség:** nulláról induló és kanát már olvasó kezdő; első indításkor szintválasztó.
- **Látvány:** indigó, üveges, „élénk, prémium", **nagyon telefon- és tabletbarát**, app-érzet (térkép, animációk).
  A korábbi matcha / zen paletta nem tetszett.
- **Görgetés:** a simaság fontosabb a látványnál.
- **Szerkezet:** kezdőlap = vezetett út „Folytatás" gombbal; a modulok külön oldalon („Szabad gyakorlás").
- **Leckék:** a Dekiru-könyvek sorrendjében, **részletesen kifejtve** (nem rövid összefoglaló: szabály, táblák,
  megjegyzések, gyakori hibák, párbeszéd, kifejezések, kultúra — saját szavakkal).
- **A lecke menete lapozós**, nem hosszú görgetés: fent egy folyamatosan töltődő csík, lent menü-gomb + Vissza /
  Következő, pontonként gyors kérdés; egy pont két lap.
- **Betű:** Figtree + Noto Sans JP mindenhol; nincs talpas, nincs dőlt; a szöveg legyen erős, jól olvasható.

---

## 10. Nyitott feladatok

**Amit a usernek kell kipróbálnia (én nem tudom ellenőrizni):** valódi telefonon a hang (a párbeszéd
végigjátszása jelzi-e a sor végét), az érintés, a sima görgetés; több nap után visszajönnek-e az ismétlés kérdései.

**Tartalom-feltöltés (folyamatban):**
- [x] Nyelvtani minták mind az 56 leckéhez (283 minta) + „a lecke mintái" lépések.
- [x] Mondat-Mester-készlet 37 leckéhez (301 mondat): minden leckének van saját vagy tematikus
      mondat-lépése (az l1–l3, l6, l7 és az l12–l33 egy részénél a régi mondatokból válogatva).
- [x] Ragozó: a leckék gyakori igéi (108 → 168 ige).
- [x] A leckékben szereplő, de addig nem gyakorolható számlálós alakok: életkor és időtartam (a Dátum & Idő két új kategóriája).
- [x] A minták több példát kaptak a leckék példamondataiból (566 → 1065).
- [ ] A leckék és az új készletek japán mondatait anyanyelvi lektor nem látta.
- [ ] Az N4-es listából kimaradt apróságok: 〜てやる, 〜と言ってもいい, a 〜ということ főnevesítő.

**Dolgozatok — a user 2026-10-05-i döntései; minden megbeszélt rész kész (v96–v98). Ami szóba jöhet még:**
- [ ] A k1–k8 kiegészítő leckék csak ismétlésként szerepelnek a dolgozatokban (saját tesztjük nincs).
- [ ] A pénzösszegek (〜円) és a nagy számok gyakorlása (a 4. lecke anyaga) egyik modulban sincs benne.

*A megbeszélt terv (megvalósítva, kivéve a fentieket):*
- Kis teszt (30 perc, kb. 30 kérdés) a 4., 8., 16., 20., 28., 32., 40., 44. lecke után: az utolsó 4 lecke + kb. 20%
  ismétlés. Nagy dolgozat (60 perc, kb. 60 kérdés) a 12., 24., 36., 48. lecke után.
- Vegyes részek (nyelvtan és partikulák, ragozás, mondatépítés, hallás), csak a már tanult anyagból; **beírós
  feladat is van**, a romaji gépelés közben azonnal kanává alakul.
- **Nem kötelező** (kiemelt lépés a térképen, nélküle is tovább lehet menni). Újraírható; minden kitöltés
  elmentődik (dátum, idő, pontszám, részpontok, hibák) és szinkronizál.
- Indítás előtt **beállítások**: időre (vizsga-mód) vagy idő nélkül, romaji / magyar segítség, hanggal vagy hang nélkül.
- Statisztika: új „Dolgozatok" rész (mikor, hányszor, fejlődés tesztenként).
- A mini-leckék félretéve (`HISTORY.md` 3. fejezet). A LexiLearn japán részének beolvasztása nyitott kérdés.

**Funkció (ötletek, a user még nem kérte):**
- [ ] A párbeszéd sorai egy lapon 1,6–4,2 ezer px: ha sok, a sorok is kettébonthatók.
- [ ] A példamondatok hallás utáni ismétlése az ütemezőben.
- [ ] Időzítő megállítása háttérbe tett lapnál; kör közbeni újratöltés túlélése.
- [ ] Olvasásértés (szöveg + kérdések), tiszteleti nyelv modul — a régi tervekből (`HISTORY.md` 3. fejezet).

**Technikai:**
- [ ] Az `img/app_icon.png` 1,1 MB: érdemes kisebbre cserélni.

---

## 11. Legutóbbi verziók

| Verzió | Mi történt |
|---|---|
| v98 | Életkor és időtartam a Dátum & Idő modulban (62 elem, 2 új lépés) · a minták 499 új példát kaptak a leckék mondataiból · dolgozat: félbehagyott folytatása, „Hibáim újra", melléknév-ragozás (`composeAdj` a közös ragozóban) |
| v97 | A statisztika új „Dolgozatok" füle: kitöltések, fejlődés dolgozatonként, gyenge leckék; telefonon a fül-sáv görgethető |
| v96 | **Dolgozatok**: új oldal (`exam.html`), 12 dolgozat a tanulási úton nem kötelező lépésként; vizsga- és gyakorló mód, beállítások, mentés és szinkron; közös `NihonCoreConj`, `NihonCorePuzzle`, élő kana-beírás |
| v95 | Romaji a kanás leckék (1–4.) magyarázataiban, tábláiban, mintáiban és kérdéseiben (`NihonCoreKana.toRomaji`, `glossRomaji`) |
| v94 | Tartalom-feltöltés: 60 új ige a Ragozóba a leckék gyakori igéiből (108 → 168) |
| v93 | Tartalom-feltöltés: Mondat-Mester-készlet a maradék 17 leckéhez is (490 → 627 mondat, 207 → 224 lépés) |
| v92 | Tartalom-feltöltés: célzott Mondat-Mester-készletek 20 leckéhez (326 → 490 mondat, 20 új lépés); a `lesson` mezős mondat út-lépésben csak a saját lépésében jön elő; token `kana` mező |
| v91 | Romajival beírt válasz javítása: `NihonCoreKana` (wa / o / e partikula, ー, づ, kinyoubi); a Pro hallás eddig egy mondatot sem fogadott el; a minták kiegészítő módja romajit is elfogad |
| v84–v90 | Tartalom-feltöltés: nyelvtani minták mind az 56 leckéhez (15 → 283 minta, 21 új kategória), leckénként „a lecke mintái" lépés (136 → 187); a felismerő kártya kiemeli a kérdezett részt |
| v83 | Jelölt gyors kérdések (`point` mező) · teljes partikula-tálca (16) · a napi cél szinkronizál · javítás az ütemező szinkron-összefésülésében · a `CLAUDE.md` rendbetétele, `HISTORY.md`, `README.md` |
| v82 | „Hibáim újra" · egy pont két lapon · párbeszéd végighallgatása és „csak japánul" · összecsukható fejezetek a térképen · napi cél és sorozat |
| v81 | Napi ismétlés a leckék kérdéseiből (`lesson.html?review=1`, `lesson:` elemek az ütemezőben) |
| v80 | A lecke lapozós menete (lépés-sáv, gombsor, pontonként gyors kérdés) |
| v79 | Oldalsó tartalomjegyzék a tanulási úthoz |
| v64–v78 | Mind az 57 lecke részletes formában |
| v53–v63 | A tanulási út a Dekiru-leckéket követi; lecke-oldal; 48 lecke + előkészítő + 8 kiegészítő; hallás utáni kör |
| v41–v52 | Teljes újratervezés: indigó üveges felület, kör-keret, lobbi, térképes út, statisztika-műszerfal, Kana |

A részletek soronként: `HISTORY.md` 1. fejezet. **Új verziónál:** egy rövid sor ide, a részletes leírás a `HISTORY.md`-be.

---

## 12. Munkamenet-memória

Mappa: `C:\Users\User\.claude\projects\C--Projekts-Word-App-Project-NihonCoreV2\memory\` (az index: `MEMORY.md`).
Ami ott van, és itt nincs részletezve: a redesign-döntések háttere, a Dekiru-leckék nyelvtani térképe (melyik
lecke mit tanít, hol vannak a forrás-oldalak), a fej nélküli ellenőrzés módszere és buktatói, a lecke lapozós
menetének pontos user-kérései.

## 13. Gyors eligazítás

1. **Mi ez és hol tartunk:** 1. és 11. fejezet. 2. **Hol van a kód:** 2–4. fejezet. 3. **Hogyan működik az út és a
lecke:** 6. fejezet. 4. **Mielőtt kódot írsz:** 7–8. fejezet. 5. **Régi döntés háttere:** `HISTORY.md`.
