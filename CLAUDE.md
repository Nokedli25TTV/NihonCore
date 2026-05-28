# NihonCore — Claude project context

> Ezt a fájlt **minden új Claude session** automatikusan beolvassa.
> A projekt teljes kontextusát adja: architektúra, file-struktúra, konvenciók,
> jelenlegi állapot, nyitott feladatok.

---

## 1. Mi a projekt

**NihonCore** — magyar nyelvű japán nyelvtanuló webapp. JLPT N5 → N3 szintű grammatikai
modulok + gyakorló módok. Statikus GitHub Pages-re tervezve, Firebase tervben (még nincs).

- **Forrás:** Dekiru 1 + Dekiru 2 tankönyvek alapján
- **Stack:** plain HTML/CSS/JS — **nincs framework, nincs build step**
- **Deploy:** GitHub Pages (statikus)
- **Backend tervben:** Firebase Auth + Firestore (Phase 2, még nem készült)
- **User nyelv:** magyar — **válaszolj magyarul**

### 🔴 FEJLESZTÉSI FÁZIS — fontos!

A user **jelenleg csak fejleszti** a weboldalt, **nem használja** napi tanulásra.
Ezért minden modul **szándékosan kicsi, tesztelhető starter-szetttel** indul:

| Modul | Jelenlegi tartalom |
|---|---|
| Számláló Szavak | 7 counter, **70 item** (V7 P3 batch 1) |
| Ragozó modul | 14 starter ige (9 godan + 3 ichidan + 2 irregular) |
| Mondat-Mester | **186 mondat** (152 N5 + 21 N4 + 13 N3) — V7 P3 batch 2 (+110 N5) |
| Melléknév modul (V2.1) | 8 i-adj + **40 na-adj** (20 N5 + 12 N4 + 8 N3) — V7 P3 batch 1 (+30) |
| Dátum & Idő modul (V2.3) | 12 hónap + 17 nap + 7 hétnap + 18 idő + 14×24h + 13 perc + 10 év + 12 relatív |
| Hallás & Kiejtés modul (V3) | 38 audió-lecke (8 dátum + 8 idő + 8 ige + 6 melléknév + 8 minimal pair) |
| Grammar Patterns modul (V5 P1) | 15 sentence-szintű minta (12 N4 + 3 N3), patternenként 2 példa (összesen 30) |

**A teljes tartalmi feltöltés szándékosan a legutolsó lépés** — minden modul végleges
működésének leigazolása után, **egyben** kell elvégezni. Addig:

- ❌ **NE add hozzá automatikusan** „a többi igét/szót/mondatot" csak azért, mert hiányosnak tűnik
- ❌ **NE javasolj tartalom-bővítést** kis lépésekben — összegyűlik egy nagy load-fázisra
- ✅ Új **funkció / mechanika / motor** OK — itt nincs korlátozás
- ✅ Új **séma-tipusú adat** (pl. új mező egy igén) OK — de csak a starter-szettben kerül kitöltésre
- ✅ A user maga fogja a végén feltölteni, vagy nagy batch-ben kérni

**📄 Részletes feltöltési útmutató és séma-referencia:** `CONTENT_LOAD_GUIDE.md`
a projekt gyökerében. Minden modul-séma, sablon, ál-Ichidan listák, csapdás
melléknevek, és validálási checklist ott található.


---

## 2. File-struktúra

A projekt **2026-05-10-én konszolidálva** lett 13 → 9 forrás-fájlra,
majd **V2.0**-ban +1 file: `conjugation.html`,
**V2.1**-ben +1 file: `adjectives.html`,
**V2.3**-ban +1 file: `datetime.html`,
**V3**-ban +1 file: `listening.html`,
**V4**-ben +1 file: `stats.html`,
**V5 P1**-ben +1 file: `grammar.html`,
**V7 P1**-ben +1 file: `production.html`,
**V7 P2**-ben +1 file: `sw.js` (PWA Service Worker).
A **V7 P3** (mappa-szervezés, 2026-05-25) átstrukturálta a fájlokat
mappákba átláthatóság céljából (lásd alább).

```
NihonCoreV2/
├── index.html              ← Landing (modul-kártyák) — ROOT-on marad (entry-point)
├── sw.js                   ← ★ V7 P2 PWA Service Worker — ROOT-on (scope!)
├── manifest.webmanifest    ← PWA manifest
├── CLAUDE.md               ← Ez a fájl (dev kontextus)
├── CONTENT_LOAD_GUIDE.md   ← Tartalom-feltöltési útmutató (utolsó lépéshez)
├── pages/                  ← ★ V7 P3 — minden HTML kivéve index
│   ├── module.html         ← Generikus modul-oldal (verb engine + counter engine)
│   ├── practice.html       ← Mondat-Mester (Partikula-kitöltő + Mondat-Puzzle)
│   ├── conjugation.html    ← V2.0 Ragozó modul
│   ├── adjectives.html     ← V2.1 Melléknév modul
│   ├── datetime.html       ← V2.3 Dátum & Idő modul
│   ├── listening.html      ← V3 + V6 Hallás & Kiejtés modul (Pro mód is)
│   ├── stats.html          ← V4 Statisztika & Dashboard
│   ├── grammar.html        ← V5 P1+P3+P4 Grammar Patterns modul
│   ├── production.html     ← V7 P1 Production modul
│   ├── login.html          ← Auth (mock)
│   └── register.html       ← Auth (mock)
├── css/                    ← ★ V7 P3
│   ├── style.css           ← Fő stíluslap (~4900 sor)
│   └── auth.css            ← Auth-oldalak stíluslap
├── js/                     ← ★ V7 P3 / V8
│   ├── app.js              ← Egyesített logika (~13400 sor, page detector-rel)
│   └── data/               ← ★ V8 (2026-05-26): tartalmi adatok 8 fájlra bontva
│       ├── core.js         ← config + engine-szabályok (modules, particles, form-rules, error-types) (~1170 sor)
│       ├── sentences.js    ← NIHONCORE_SENTENCES (Mondat-Mester, 186 mondat) (~2120 sor)
│       ├── verbs.js        ← NIHONCORE_VERBS (~115 sor)
│       ├── adjectives.js   ← NIHONCORE_I_ADJECTIVES + NA_ADJECTIVES (~935 sor)
│       ├── counters.js     ← NIHONCORE_COUNTERS + CATEGORIES + ITEMS (~260 sor)
│       ├── datetime.js     ← NIHONCORE_DT_* (8 kategória) (~150 sor)
│       ├── audio.js        ← NIHONCORE_AUDIO_LESSONS (~55 sor)
│       └── grammar.js      ← NIHONCORE_GRAMMAR_PATTERNS (~300 sor)
└── img/                    ← ★ V7 P3
    ├── fav_icon_nihoncore.png
    └── app_icon.png
```

### Path-hivatkozási konvenció (V7 P3 után)

| Cél | index.html-ből (root) | pages/*.html-ből |
|---|---|---|
| CSS | `css/style.css` | `../css/style.css` |
| JS engine | `js/app.js` | `../js/app.js` |
| JS data (8 fájl) | (nincs) | `../js/data/core.js`, `../js/data/sentences.js`, stb. |
| Képek | `img/foo.png` | `../img/foo.png` |
| Manifest | `manifest.webmanifest` | `../manifest.webmanifest` |
| Egy másik HTML page | `pages/grammar.html` | `grammar.html` (testvér) |
| Vissza az indexre | `index.html` (nem kell) | `../index.html` |
| Service Worker | (regisztrációt az app.js automatikusan számolja) | (ugyanaz) |

**Új V8 (2026-05-26) — data.js szétbontva**: a régi monolit `js/data.js` (~5125 sor)
8 modul-fájlra van bontva a `js/data/` mappában. Minden HTML, ami eddig egy
`<script src="../js/data.js">` tagot töltött, most 8 `<script defer src="../js/data/X.js">`
tagot tölt. A defer determinisztikus sorrendet ad — az app.js mindig az utolsó. A 8
data-fájl egymás között **független** (csak globális const-okat ír), így a sorrend
nem számít. **Hozzáadás új tartalomhoz**: simán felülírod a megfelelő fájlt batch-csere
módon, nem kell mergelni.

**SW regisztráció**: az app.js a `document.currentScript.src`-ből
visszafelé számolja a ROOT URL-t (mert az app.js `js/`-ben van, a `sw.js`
pedig a root-ban). Ezért mindkét forrásoldalról (index.html ÉS pages/*)
ugyanaz a regisztrációs URL keletkezik — a SW scope-ja `./` marad.

### Új page hozzáadása

1. Új HTML fájl → `pages/` mappába
2. A `<head>` path-ok: `../css/style.css`, `../img/fav_icon_nihoncore.png`, `../manifest.webmanifest`, stb.
3. A logo + home-btn `href="../index.html"`
4. Az index.html-ben új modul-kártya `href="pages/újfájl.html"`
5. `sw.js` APP_SHELL listájába `'./pages/újfájl.html'` + `CACHE_VERSION` bump
6. `js/app.js` page-detector új ágat kap (új `initŰjPage()` mintát követve)

**Új JS engine-funkció → `app.js` megfelelő szekciójába** (NEM külön JS-fájl).
**Új tartalom → a megfelelő `js/data/*.js`-be** (V8 óta 8 modul-fájl, nem 1 monolit).

Új fájl **CSAK** akkor indokolt, ha:
- Új teljes HTML oldal (új page) — pl. `dictionary.html`
- Új statikus eszköz (kép, font, manifest, service worker)
- Új komplett modul-tartalom új scope-pal (pl. `js/data/kanji.js`, ha lesz kanji modul)

---

## 3. app.js belső szerkezete

```
app.js (egyetlen entry point minden HTML-en)
├── 1. UNIVERZÁLIS részek (IIFE, minden oldalon fut)
│   ├── initHelpersToggle  — Romaji/Magyar + ★ V3 P2 🔊 Hang toggle, localStorage
│   ├── initHeaderScroll   — header sötétebb scroll-olva
│   ├── NihonCoreAudio     — ★ V3 AudioEngine (Google TTS endpoint, <audio>-cache,
│   │                        play/preload/stop API + ★ V3 P2 speakAnswer
│   │                        (opt-in + debounce); globálisan elérhető)
│   ├── initGlobalAnswerAudio — ★ V3 P2 F: MutationObserver a modul-feedback
│   │                        konténereken → a helyes japán választ felolvassa
│   ├── markDontKnowFeedback — „Nem tudom" feedback-fejléc egységesítő
│   │                        (pr-fb-wrong → pr-fb-dontknow, 💡 fejléc)
│   ├── initFocusBanner    — ★ V4 P4: a Statisztika „Célzott gyakorlás"
│   │                        gombja focus-hintet ír → a modul-oldalon banner
│   ├── NihonCoreStats     — ★ V4 statisztika adat-réteg (session-log tár,
│   │                        recordSession/getSessions/getDailyAggregates;
│   │                        localStorage 'nihoncore_sessions_v1')
│   └── NihonCoreSRS       — ★ V5 P1 univerzális SRS ütemező (Leitner box 0–5
│                            → 0/1/3/7/14/30 nap; recordReview(id,quality 0/1/2),
│                            getDueItems(prefix, knownIds), getItemState,
│                            aggregateBoxes; localStorage 'nihoncore_srs_v1';
│                            itemId konvenció '<scope>:<contentId>[:<sub>]')
│
├── 2. initLanding()          (index.html — mobile menu, scroll reveal, smooth anchor)
│
├── 3. initModulePage()       (module.html — bárhol amit ?id= paraméterrel megnyitsz)
│   ├── State (closure): demoState, matrixState, drillState, counterSettings, counterRunState
│   ├── populateHero, setupPhaseTabs, renderPhase (dispatcher)
│   ├── Phase types az dispatcherben:
│   │   ├── 'interactive-demo'   (verb engine Phase 1)
│   │   ├── 'matrix-selector'    (verb engine Phase 2 — lobby + matrix tasks)
│   │   ├── 'speed-drill'        (verb engine Phase 3 — 5s timer + 4 option)
│   │   ├── 'counter-recognition'(counter Phase 1 — multiple choice)
│   │   ├── 'counter-hybrid'     (counter Phase 2 — pill + kana input + ambiguity)
│   │   ├── 'counter-mastery'    (counter Phase 3 — free input + LCS diff engine)
│   │   └── 'multiple-choice'    (legacy MC fallback)
│   ├── verbEngine(state, config) — állapotgép: stem + suffix + (ka)
│   └── Counter shared utilities: normalizeInput, compareReading, diffChars (LCS),
│       renderDiffBlock, renderInlineDiff, explainChange
│
├── 4. initPracticePage()     (practice.html — Mondat-Mester)
│   ├── State (closure): lobbyState, runtimeState, puzzleState
│   ├── Lobby: szint + mód (particles/puzzle) + fókusz szűrők + cardCount
│   ├── Partikula-kitöltő: drag&drop + click, 3-rétegű kontextus-érzékeny feedback
│   └── Mondat-Puzzle: drag-to-reorder + flexibilis validátor (frázis-permutáció elfogadva)
│
├── 5. initAuthPages()        (login.html + register.html)
│   └── Password toggle/strength, mock submit, shake CSS injection
│
├── 6. initConjugationPage()  (conjugation.html — V2.0 Ragozó modul TELJES)
│   ├── State (closure): drillSettings (localStorage perzisztált), drillRunState
│   ├── Engine (DOM-mentes, closure-private):
│   │   ├── VerbDetector.classify(verb)      — DB lookup → group
│   │   ├── StemEngine.getStems(verb)        — a/i/u/e/o oszlopok
│   │   ├── composeStemSuffix(verb,form)     — Masu/Nai motor (Godan+Ichidan+Irregular)
│   │   ├── composeTeTa(verb,'te'|'ta')      — Te/Ta motor (családi minta + 行く + Ichidan + Irreg)
│   │   ├── composeCausativePassive(verb)    — kompozíció (passive ∘ causative)
│   │   ├── conjugate(verb,formCode)         — egységes belépő
│   │   ├── splitInput(card,userInput)       — V2 morféma-szintű bontás
│   │   ├── diagnose(card,userInput) v2      — prioritás-sorrendes hibakód
│   │   └── generateExerciseQueue            — adaptív weighted sampling lehetőség
│   ├── Módok: Recognition (4-választós) · Build (stem+suffix pick, 5-oszlopos Godan) · Mastery
│   ├── UI: Lobby (3 mód · adaptive toggle · Build figyelmeztetés)
│   │      · Hint provider (2 szint, −3 pt/szint)
│   │      · Profile dashboard (📊 toggle · per-csoport+per-forma bar)
│   └── Dev hook: window._conj = { VerbDetector, StemEngine, conjugate, ... }
│
├── 7. initAdjectivesPage()  (adjectives.html — V2.1 TELJES Melléknév modul)
│   ├── State (closure): drillSettings (localStorage) + drillRunState
│   ├── Engine (closure-private):
│   │   ├── classifyAdj(adj)                 — i-adj | na-adj
│   │   ├── composeAdj(adj, formCode)        — 9 forma (4 i + 4 na + na-modifier)
│   │   │     · いい→よい kivétel kezelve canonicalStem-mel
│   │   │     · na-adj: copula-variánsok variants[] mezőben
│   │   ├── generateAdjQueue                 — Recognition: ~25% típus-kérdés; mind módban: adaptív weighted opció
│   │   ├── getAdjAdaptiveWeights + adjWeightedPick — V2.1 P2 adaptív sampling
│   │   ├── buildAdjBuildCardData            — V2.1 P2 stem-options + suffix-bank generálás
│   │   │     · ii kivételnél 2 stem-opció (い vs よ) — user kell válasszon!
│   │   ├── generateFormDistractors          — másik forma + másik típus + random
│   │   ├── diagnoseAdj(card, userInput)     — variant elfogadás + typo + ii_exception + wrong_form
│   │   └── buildAdjExplanation              — NIHONCORE_ADJ_ERROR_TYPES sablon
│   ├── Módok: Recognition · Build · Mastery (10s timer)
│   ├── UI: Lobby (típus-toggle · forma-szűrők · 3 mód · adaptív toggle)
│   │      · Hint provider (újrahasznosított)
│   │      · Profile dashboard (📊 toggle, per-típus + per-forma bar + weakness chip)
│   │      · Build feedback morféma-bontást is mutat
│   └── Dev hook: window._adj = { composeAdj, classifyAdj, diagnoseAdj, ... }
│
├── 8. initDateTimePage()    (datetime.html — V2.3 TELJES Dátum & Idő modul)
│   ├── State (closure): drillSettings (localStorage) + drillRunState
│   ├── Engine (closure-private):
│   │   ├── categoryDataset(catId)           — kategória → adat-tömb (8 kategória)
│   │   ├── getActivePool() / getBuildablePool() — aktív elemek
│   │   ├── generateDtQueue(count)           — kártya-sor + adaptív weighted pick
│   │   ├── generateDtDistractors            — azonos kategória + naiveDayReading csapda
│   │   ├── computeBuildParts(entry,catId)   — morféma-bontás (szám + counter)
│   │   ├── buildDtBuildCardData             — Build mód A/B opciók
│   │   ├── diagnoseDt(card, userInput)      — typo + wrong_category + irregular_* kódok
│   │   └── buildDtExplanation               — NIHONCORE_DT_ERROR_TYPES sablon
│   ├── Módok: Recognition (4-választós) · Build (szám+counter) · Mastery (10s timer)
│   ├── UI: Lobby (8 kategória-toggle · 3 mód · adaptív toggle) · Hint (2 szint)
│   │      · Profile dashboard (📊 per-kategória bar + weakness chip)
│   ├── cj-* osztályok újrahasznosítva (lobby, card, build, feedback, dashboard)
│   └── Dev hook: window._dt = { diagnoseDt, getActivePool, ... }
│
├── 9. initListeningPage()   (listening.html — V3 P2 Hallás & Kiejtés modul)
│   ├── State (closure): drillSettings (localStorage) + drillRunState
│   ├── Engine (closure-private):
│   │   ├── getActiveLessons()               — tier-szűrt audió-leckék
│   │   ├── lessonSpeed(lesson)              — playback-sebesség a nehézségből
│   │   ├── generateListeningQueue(count)    — kártya-sor (mód-tudatos: distraktor csak Recognition)
│   │   ├── generateAudioDistractors         — minimal-pair partner KÖTELEZŐ distraktor
│   │   ├── diagnoseAudio(card, chosen)      — long_vowel/sokuon/mora trap-kódok
│   │   ├── buildLstExplanation              — NIHONCORE_AUDIO_ERROR_TYPES sablon
│   │   ├── romajiToKana / normalizeKana     — ★ V3 P2 romaji→hiragana parser + canonical
│   │   ├── toMorae / moraDiff               — ★ V3 P2 mora-tokenizer + Levenshtein-igazítás
│   │   ├── classifyDictation                — ★ V3 P2 audio-tudatos mora-diff diagnózis
│   │   ├── getLessonWeight / lstWeightedPick — ★ V3 P2 D trap-súlyozott pickelés
│   │   └── adaptiveAfterAnswer              — ★ V3 P2 E smart replay + tempó-penalty
│   ├── Módok: Audio Recognition (PLAY/SLOW + 4-választós) · ★ Diktálás (V3 P2:
│   │      PLAY → romaji input + élő kana-preview + 2-soros mora-diff feedback)
│   ├── UI: Lobby (tempó-választó EGYVÁLASZTÓS · 2 mód · ★ adaptív toggle)
│   │      · audio-zóna (PLAY + Lassan) · „Nem tudom" gomb Recognition-ben
│   │      · szöveg-fallback ha az audio hibázik · per-kategória summary
│   ├── ★ V3 P2 D/E: opt-in adaptív — trap-súlyozott sor + hibás kártya
│   │      visszasorolása + tempó-lassítás küzdéskor
│   ├── A NihonCoreAudio motort használja (univerzális szekció)
│   └── Dev hook: window._lst = { romajiToKana, classifyDictation, getLessonWeight, ... }
│
├── 9a. initGrammarPage()    (grammar.html — ★ V5 P1 Grammar Patterns)
│   ├── State (closure): drillSettings (localStorage 'nihoncore_grm_settings_v1') +
│   │      drillRunState + profile ('nihoncore_grm_profile_v1') +
│   │      SRS_PREFIX='grammar:'
│   ├── Engine (closure-private):
│   │   ├── getActivePool() / patternsByJlpt(level)
│   │   ├── allItemIds() / patternItemId / exampleItemId  — SRS-kulcsok
│   │   ├── generateGrmQueue(count)            — opt-in SRS-vezérelt sor:
│   │   │     · srs=ON: due → unseen → fill random (mód-tudatos: a Recognition
│   │   │       patternItemId-ket, a Cloze exampleItemId-ket fogyasztja)
│   │   │     · srs=OFF: klasszikus random sampling
│   │   ├── generatePatternDistractors         — contrasts[] → same-category → random
│   │   ├── kataToHira / normKana              — kana normalizáló
│   │   ├── diagnoseCloze(card, userInput)     — match / wrong_pattern / contrast_confused
│   │   │     · typo (LCS distance ≤ 2) / wrong_form / empty
│   │   └── buildGrmExplanation                — NIHONCORE_GRAMMAR_ERROR_TYPES sablon
│   ├── Módok: Felismerés (4-választós: melyik a minta a mondatban) ·
│   │      Cloze (___BLANK___ → input fuzzy match, 18s timer)
│   ├── UI: Lobby (3 szint-toggle · kategória-toggle · 2 mód · ★ SRS toggle ·
│   │      cardCount · live "esedékes/új" SRS-jelző)
│   │      · Hint provider (2 szint: kategória → első karakter / struktúra; −3 pt)
│   │      · „Nem tudom" gomb mindkét módban (felfedi a választ + 0 pont)
│   │      · Profile dashboard (📊 toggle, per-pattern bar + SRS box-eloszlás
│   │      0..5, weakness chip, profil/SRS reset)
│   ├── SRS integráció: minden finalizeGrmCard() → NihonCoreSRS.recordReview
│   │      (helyes+hint=0 → quality 2 "easy", helyes+hint>0 → 1 "ok", rossz → 0)
│   └── Dev hook: window._grm = { diagnoseCloze, getActivePool,
│         generateGrmQueue, allItemIds, NihonCoreSRS, ... }
│
├── 9b. initStatsPage()      (stats.html — ★ V4 Statisztika oldal — TELJES)
│   ├── Fül-sáv: Áttekintés/Aktivitás/Modulok/Vakfoltok/Előzmények/Elemzés
│   │      (mind a 6 aktív — V4 TELJES)
│   ├── Stat-számítók: computeReadiness · computeStreak · todayStats ·
│   │      heatmapData · timeOfDayData · subBreakdowns · trendData ·
│   │      detectBlindSpots · radarSvg · lineSvg · ringSvg
│   ├── A) Áttekintés: readiness ring + 3 al-komponens bar + vitals + blurb
│   ├── B) Aktivitás: heatmap (13 hét) + streak + napszak bar + best-time
│   ├── C) Modulok: ★ V5-ben 7-tengelyes radar (Számlálók/Igék/Melléknevek/
│   │      Idő/Partikulák/Hallás/Mintázatok) + kattintható modul-sorok →
│   │      drill-down (per-mód + profil-alapú al-bontás; Grammar:
│   │      catStats + patternStats)
│   ├── D) Vakfoltok: detectBlindSpots — stratégiai diagnózisok
│   │      (stale modul + alacsony pontosság + gyenge al-terület + domináns
│   │       hiba) + „Célzott gyakorlás" gomb → focus-hint + navigáció
│   ├── E) Előzmények: NihonCoreStats.getSessions() → kör-lista
│   ├── F) Elemzés: pontosság-trend + volumen vonaldiagram + összesítők
│   └── Üres állapot + „Előzmények törlése" gomb
│
└── 10. PAGE DETECTOR (file legalja)
    if      (document.getElementById('statsMain'))       initStatsPage();
    else if (document.getElementById('grmMain'))         initGrammarPage();   ← V5 P1
    else if (document.getElementById('listeningMain'))   initListeningPage();
    else if (document.getElementById('dtMain'))          initDateTimePage();
    else if (document.getElementById('adjMain'))         initAdjectivesPage();
    else if (document.getElementById('conjugationMain')) initConjugationPage();
    else if (document.getElementById('moduleMain'))      initModulePage();
    else if (document.getElementById('practiceMain'))    initPracticePage();
    else if (document.querySelector('.auth-card'))       initAuthPages();
    else if (document.querySelector('.modules-grid'))    initLanding();
```

**Fontos:** minden init függvény **closure-scope** ad — nincs globális state-szennyezés.
Új funkció hozzáadásakor a megfelelő init függvénybe írd, NEM globális szinten.

---

## 4. js/data/ belső szerkezete (V8 — szétbontva)

**V8 (2026-05-26) óta**: a `data.js` monolit fájl szét van bontva 8 modul-fájlra
a `js/data/` mappában. Minden fájl `globális const`-okat ad — egymással NEM
függenek össze, a sorrend mindegy. A HTML-ek `defer` script tag-ekkel töltik be,
így az `app.js` mindig azután fut, hogy minden adat elérhető.

```
js/data/
│
├── core.js  ──────────────────────────────────────  (~1170 sor — config + szabályok)
│   ├── NIHONCORE_MODULES                — module.html verb/counter engine configek
│   │   ├── 'arimasu-imasu'              → verb engine (3 phase, V5 P2)
│   │   ├── 'szamlalok'                  → counter engine (3 phase, v1.6 teljes)
│   │   └── 'hallas-kiejtes'             → locked stub (jövő)
│   ├── NIHONCORE_PARTICLES              — 9 partikula
│   ├── PARTICLE_ERROR_RULES             — 8 kontextus-érzékeny szabály
│   ├── NIHONCORE_GODAN_MAP              — 9 mássalhangzó-család × a/i/u/e/o
│   ├── NIHONCORE_TE_RULES               — Godan te/ta szabályok
│   ├── NIHONCORE_VERB_EXCEPTIONS        — pseudoIchidanGodan + irregularTe
│   ├── NIHONCORE_IRREGULAR_FORMS        — suru/kuru hard-coded
│   ├── NIHONCORE_FORM_RULES             — 12 formakód meta
│   ├── NIHONCORE_FORM_GROUPS            — UI-szűrőcsoportok
│   ├── NIHONCORE_ERROR_TYPES            — 15 verb-hibakód
│   ├── NIHONCORE_ADJ_FORM_RULES         — 9 forma (i + na + noun-modifier)
│   ├── NIHONCORE_ADJ_FORM_GROUPS        — i_adj_forms / na_adj_basic / na_adj_neg
│   ├── NIHONCORE_ADJ_ERROR_TYPES        — 9 melléknév-hibakód
│   ├── NIHONCORE_DT_CATEGORIES          — 8 datetime-kategória
│   ├── NIHONCORE_DT_ERROR_TYPES         — 7 datetime-hibakód
│   ├── NIHONCORE_AUDIO_CATEGORIES       — audio kategória-cím map
│   ├── NIHONCORE_AUDIO_TIERS            — 3 nehézségi szint + speed
│   ├── NIHONCORE_AUDIO_ERROR_TYPES      — 4 audió-hibakód
│   ├── NIHONCORE_GRAMMAR_CATEGORIES     — 11 grammar kategória
│   └── NIHONCORE_GRAMMAR_ERROR_TYPES    — 5 grammar hibakód
│
├── sentences.js (~2120 sor — Mondat-Mester tartalom)
│   └── NIHONCORE_SENTENCES              — 186 mondat (152 N5 + 21 N4 + 13 N3)
│
├── verbs.js (~115 sor — Ragozó modul ige-szótár)
│   └── NIHONCORE_VERBS                  — starter (14 ige, idővel bővül)
│
├── adjectives.js (~935 sor — Melléknév modul)
│   ├── NIHONCORE_I_ADJECTIVES           — i-melléknevek (V8 user-bővítés folyamatban)
│   └── NIHONCORE_NA_ADJECTIVES          — na-melléknevek (40+, V7 P3 batch 1)
│
├── counters.js (~260 sor — Számláló Szavak tartalom)
│   ├── NIHONCORE_COUNTERS               — 7 számláló (tsu/nin/mai/hon/satsu/soku/dai)
│   ├── NIHONCORE_COUNTER_CATEGORIES     — 3 főkategória
│   └── NIHONCORE_COUNTER_ITEMS          — 70 item (V7 P3 batch 1)
│
├── datetime.js (~150 sor — Dátum & Idő modul)
│   ├── NIHONCORE_DT_MONTHS              — 12 hónap
│   ├── NIHONCORE_DT_DAYS                — 17 nap starter
│   ├── NIHONCORE_DT_WEEKDAYS            — 7 hétnap
│   ├── NIHONCORE_DT_TIMES               — 18 időpont
│   ├── NIHONCORE_DT_HOURS24             — 14 elem (13時-24時 + 午前/午後)
│   ├── NIHONCORE_DT_MINUTES             — 13 perc
│   ├── NIHONCORE_DT_YEARS               — 10 év (nyugati + imperial)
│   └── NIHONCORE_DT_RELATIVE            — 12 relatív kifejezés
│
├── audio.js (~55 sor — Hallás & Kiejtés modul)
│   └── NIHONCORE_AUDIO_LESSONS          — 38 audió-lecke
│
└── grammar.js (~300 sor — Grammar Patterns modul)
    └── NIHONCORE_GRAMMAR_PATTERNS       — 15 minta (12 N4 + 3 N3)
                                          Mezők: id, label, jlpt, category,
                                          summary, structure, explanation,
                                          examples[2], contrasts[]
```

### Új tartalom hozzáadása (V8 workflow)

A batch-fájlok mostantól **fájl-szintű cserével** illeszthetők be:
1. A user új tartalom-batch-et ír (pl. `NIHONCORE_I_ADJECTIVES`-bővítés)
2. **Egyszerűen felülírjuk a `js/data/adjectives.js`-t** a teljes új tömbbel
3. Nem kell merge / insertion-point keresgélés
4. CACHE_VERSION bump az sw.js-ben, hard reload

---

## 5. Loading mátrix (melyik HTML mit tölt)

V8 (2026-05-26): minden HTML, ami eddig `<script src="../js/data.js">` tagot
használt, most **8 defer-elt** script tag-et tölt be a `js/data/` mappából.

| HTML | data/* (8 fájl) | app.js | helyzet |
|---|---|---|---|
| `index.html` | — | ✓ (csak engine) | root |
| `pages/module.html` | ✓ | ✓ | pages/ |
| `pages/practice.html` | ✓ | ✓ | pages/ |
| `pages/conjugation.html` | ✓ | ✓ | pages/ |
| `pages/adjectives.html` | ✓ | ✓ | pages/ |
| `pages/datetime.html` | ✓ | ✓ | pages/ |
| `pages/listening.html` | ✓ | ✓ | pages/ |
| `pages/grammar.html` | ✓ | ✓ | pages/ |
| `pages/production.html` | ✓ | ✓ | pages/ |
| `pages/stats.html` | ✓ | ✓ | pages/ |
| `pages/login.html` | — | ✓ (csak engine) | pages/ |
| `pages/register.html` | — | ✓ (csak engine) | pages/ |

A 9 modul-page mindegyikén ugyanaz a 9-tag-es head:
```html
<script defer src="../js/data/core.js"></script>
<script defer src="../js/data/sentences.js"></script>
<script defer src="../js/data/verbs.js"></script>
<script defer src="../js/data/adjectives.js"></script>
<script defer src="../js/data/counters.js"></script>
<script defer src="../js/data/datetime.js"></script>
<script defer src="../js/data/audio.js"></script>
<script defer src="../js/data/grammar.js"></script>
<script defer src="../js/app.js"></script>
```

---

## 6. Jelenlegi állapot — verzió-történet

| Verzió | Tartalom |
|---|---|
| v1.0 | Landing + alap design |
| v1.1 | NihonCore brand + Poppins font + fusion design (glass + glow + squircle) |
| v1.2 | (overlap — nincs külön verzió) |
| v1.3 | Verb engine modul (Arimasu/Imasu) — interactive demo + matrix selector + speed drill |
| v1.4 | Mondat-Mester (practice.html) — lobby + Partikula-kitöltő (drag&drop + 3-rétegű feedback) |
| v1.4.1 | Univerzális helpers toggle (Romaji/Magyar) minden modulban |
| v1.5 | Mondat-Puzzle (drag-to-reorder + flexibilis validátor) + N3 unlock + 12 új mondat |
| **konszolidáció** | 13 → 9 fájl: app.js + data.js egyesítve |
| **v1.6** | **Számláló Szavak modul TELJES** — Recognition + Hybrid + Mastery + LCS diff engine + fuzzy matching, 7 counter, 33 item |
| **v2.0 P1** | **Ragozó modul MVP** — új `conjugation.html` page. Engine: GodanMap (9 család × a/i/u/e/o) + StemEngine + composeStemSuffix + composeTeTa (családi minta + 行く + Ichidan + Irreg). 14 starter ige (9 godan közte 2 ál-Ichidan, 3 ichidan, 2 irregular). 7 forma: masu / masen / mashita / masen_deshita / nai / te / ta. 2 mód: Recognition (4 választós, pedagógiai distraktorok) + Mastery (input + 8s timer + LCS-diff). 8 hibakód magyar magyarázattal. localStorage profile (csak P1) — Firebase P2-re halasztva. |
| **v2.0 P2 (rész 1: Intelligens feedback)** | **Haladó formák + morféma-szintű diagnózis.** 5 új forma: Potential / Passive / Causative / Causative-Passive (kompozíció) / Volitional. Új engine: `composeCausativePassive(verb)` (passive ∘ causative). Suru/Kuru hard-coded mind az 5 új formára. Új lobby-csoport: "Haladó transzformációk (N4–N3)". **MorphemeSplitter** (`splitInput`): user inputot stem+suffix-re bontja, beazonosítja melyik godan-oszlopra esik a user-stem. **ErrorClassifier v2** (`diagnose` átdolgozva): 7 új hibakód (morph_wrong_column, morph_wrong_suffix, morph_both_wrong, missing_sokuon, missing_rendaku, partial_match), prioritás-sorrendes osztályozás. **renderMorphemeDiff**: két-soros vizualizáció (user-bontás vs helyes bontás), tő/suffix színkódolva (zöld=OK, piros áthúzott=hibás). Build mód + AdaptiveSelector még P2/2-ben. |
| **v2.0 P2 (rész 2: Build + Adaptive + Hint + Dashboard)** | **A teljes pedagógiai csomag.** Új mód: **Build** — 2 lépcsős konstrukció (Godan: 5-oszlopos a/i/u/e/o stem-mátrix · Ichidan: 1 stem) + 5-elemű suffix bank, élő `stem + suffix = preview`, partial credit 50/50. Build mód automatikusan kiszűri a Te/Ta/Causative-Passive/Irregular kombinációkat (a lobby figyelmeztető megjegyzéssel). **AdaptiveSelector**: opt-in toggle (`drillSettings.adaptive`), weighted random sampling profile alapján (hibás formák/csoportok ~3× gyakoribb pickelése, min. 10 attempt küszöb). **HintProvider**: minden módban "💡 Tipp" gomb a card-on, 2 progresszív szint (stem → suffix felfedés), −3 pont/szint. **Profile dashboard**: "📊 Részletek" toggle a stats-bárban → per-csoport és per-forma sorrendezett bar-list (gyengétől erősig), top-3 weakness chip-el, "Profil törlése" akció. |
| **v2.1 P1** | **Melléknév modul MVP** — új `adjectives.html` page. 2 család: i-melléknév (8 starter) + na-melléknév (10 starter). Engine: `classifyAdj` + `composeAdj(adj, formCode)` — 9 forma (4 i-adj alak + 4 na-adj alak + 1 na noun-modifier). いい→よい kivételkezelés (`canonicalStemKana/Romaji`). Na-adj copula-variánsok (ではありません / じゃありません) elfogadva a `variants[]` mező alapján. 2 mód: **Felismerés** (4-választós + ~25% típus-felismerő kártya) és **Mester** (10 mp timer + LCS-diff). 9 hibakód magyar magyarázattal. Hint provider újrahasznosítva (2 szint −3 pt). localStorage profile (`nihoncore_adj_profile_v1`). |
| **v2.1 P2** | **Melléknév Build + Adaptive + Dashboard.** Új mód: **Építkezés** — 2 lépcsős konstrukció. **Stem-pick okosan**: i-adj normál esetén 1 stem (auto-select), na-adj esetén 1 teljes-lemma stem, de az いい kivétel esetén **2 stem-opció**: い (jelen állítóhoz) ÉS よ (minden ragozott alakhoz) — a user kell válasszon, így vizuálisan tanulja a canonical-stem koncepciót. **Suffix-bank**: 5 opció = helyes + 3 same-type wrong-form + 1-2 cross-type csapda. Partial credit 12/5/0. **AdaptiveSelector**: opt-in toggle (`drillSettings.adaptive`), weighted random sampling profile alapján (gyenge típusok + gyenge formák ~3× gyakoribb, min. 10 attempt küszöb). Súlyozás kétszintű: típuson keresztül + formakód keresztül. **Profile dashboard**: "📊 Részletek" toggle a stats-bárban → per-típus (i-adj/na-adj) + per-forma sorrendezett bar-list (gyengétől erősig), top-3 weakness chip, "Profil törlése" akció. Build mód feedbackje morféma-bontást is mutat (helyes vs te választott stem+suffix színkódolva). Új error-kódok: na_adj_used_on_i / i_adj_used_on_na / wrong_suffix / ii_exception (Build-specifikus prioritás). |
| **UX-csomag** | **Univerzális runtime UI-konvenciók bevezetése minden modul-page-en.** Header jobb sarokba 🏠 home ikon (`.btn-home`, `index.html`-re visz) a régi "← Modulok" link helyett. Hero (`.module-hero`) a kör futása alatt rejtett. Runtime stats: 2 chip (Pont + Sorozat) + `.round-exit` kilépés-gomb (confirm dialóggal — V3 statisztika-mentés miatt). "Kártya N/M" chip → `.round-progress` gradient progress-strip. `.pr-stats` / `.sd-stats` grid→flex. Helpers toggle (Romaji/Magyar) kiterjesztve az új modulok osztályaira. |
| **v2.3 P1** | **Dátum & Idő modul MVP** — új `datetime.html` page. 4 kategória: hónapok (12), hónap napjai (17 starter: 1-15 + 20 + 24), hét napjai (7), időpontok (18: egész órák + 〜半 félórák). Kiemelt figyelem a rendhagyó olvasatokra (ついたち, よっか, はつか native napok · よじ/しちじ/くじ órák · しがつ/しちがつ/くがつ hónapok). Engine: `getActivePool` + `generateDtQueue` + `generateDtDistractors` (napoknál naiveDayReading-csapda). 2 mód: **Felismerés** (4-választós) + **Mester** (10 mp timer + LCS-diff). 6 hibakód (irregular_day/hour/month, wrong_category, typo, wrong_reading). Hint provider 2 szint. localStorage profile (`nihoncore_dt_profile_v1`). A cj-* osztályok újrahasznosítva. |
| **v2.3 P2** | **Dátum & Idő modul TELJES.** 4 új kategória (adatvezérelt — az engine automatikusan kezeli): **24 órás idő** (13時–24時 + 午前/午後, a 14/17/19/24 óra rendhagyó), **Percek** (1–30分, rendaku/sokuon rendhagyókkal: いっぷん/さんぷん/ろっぷん…), **Évek** (kerek nyugati évek + 令和/平成/昭和 imperial), **Relatív idő** (前/後/過ぎ/くらい/頃 kifejezések). Új mód: **Építkezés** — `computeBuildParts` morféma-bontás (szám-olvasat + counter), 2 lépcsős konstrukció. Build mód kihagyja az évek/relatív/rendhagyó-natív napok/〜半 elemeket (lobby figyelmeztetéssel). **AdaptiveSelector**: opt-in toggle, per-kategória súlyozott pickelés (min. 10 attempt). **Profile dashboard**: "📊 Részletek" → per-kategória bar-list (gyengétől erősig) + top-3 weakness chip. Új error-kód: irregular_minute. |
| **v3 P1** | **Hallás & Kiejtés modul MVP** — új `listening.html` page. **NihonCoreAudio** motor (app.js univerzális szekció): Google Translate TTS endpoint, `<audio>`-elem cache (Map), `play/preload/stop` API, `playbackRate` sebesség, védekező hibakezelés (onError → szöveg-fallback). 38 audió-lecke (date/time/verb/adj/minimal-pair). 3 nehézségi szint (Kezdő 0.75× / Haladó 0.9× / Profi 1.0× playback). **Audio Recognition mód**: nagy PLAY + Lassan (0.6×) gomb, 4-választós felismerés. Minimal-pair distraktorok (おばさん/おばあさん, ビル/ビール, きて/きって, おと/おっと) — `diagnoseAudio` audio-trap kódot ad (long_vowel/sokuon/mora). localStorage profile (per-trap hibaszámláló + replay-count). Diktálás + adaptív + globális audio-injekció a V3 P2-re. |
| **v3 P2 (A–C)** | **Diktálás mód.** Új belépő-mód a `listening.html`-en, **csak romaji input**. **Phase A — normalizáló pipeline:** `romajiToKana` Hepburn-parser (leghosszabb illeszkedés + sokuon-detektálás kettőzött mássalhangzónál + `ん`-kezelés), `normalizeKana` a helyes válasz oldalára (katakana→hiragana + `ー` hosszújel feloldása `VOWEL_OF`-fal — pl. ビール→びいる). Belső canonical forma: **hiragana**. A leckék explicit kana-választ tárolnak → a parser determinisztikus, nincs „találgatás". **Phase B — audio-tudatos diff:** `toMorae` mora-tokenizer (kis ゃゅょ tapad, kis っ önálló mora), `moraDiff` Levenshtein-igazítás visszafejtéssel (eq/sub/ins/del), `classifyMoraOps` → audio-hibakód (prioritás: sokuon > long_vowel > mora; mostly-wrong → wrong_choice), `renderMoraDiff` 2-soros vizualizáció. **Phase C — diktálás UI:** lobby mód-feloldás, mód-tudatos `generateListeningQueue` (distraktor csak Recognition-nél), `renderDictationCard` (audio-zóna + romaji input + élő kana-preview), `submitDictation` (12 pont alap), mora-diff feedback. Hátralévő P2: trap-analyzer, adaptív replay, globális audio-injekció (D–G). |
| **v3 P2 (D–G)** | **Adaptív hallás + globális audio.** **Phase D — trap-súlyozott sor:** `drillSettings.adaptive` opt-in lobby toggle; `generateListeningQueue` a profil `trapErrors` gyengeségei alapján súlyozottan húz (`getLessonWeight` — egy gyenge csapdát hordozó lecke max ~3× súly, min. 10 attempt). **Phase E — smart replay + adaptív tempó:** `adaptiveAfterAnswer` — hibázott kártya egyszeri visszasorolása a sor vége felé (`_replayed` flag, a kör M-je nő); `drillRunState.speedPenalty` — hibákkor a normál playback lassul (max −0.3, padló 0.55), helyesnél visszaáll. **Phase F — globális audio-injekció:** `NihonCoreAudio.speakAnswer` (opt-in `nihoncore_audio_on` + 1.5 mp debounce + japán-karakter szűrő — a romaji/zárójel kiesik); `initGlobalAnswerAudio` MutationObserver a `.conj-feedback` / `.pr-feedback` / `#phaseContent` konténereken → minden modul feedback-jében felolvassa a helyes japán választ (`.pfe-jp-ok`). Új helpers-bár toggle: **🔊 Hang** (mind a 6 modul-HTML-ben, opt-in, default OFF). **Phase G:** cross-modul böngészős validáció (conjugation/datetime/counter/practice injekció + helpers-toggle regresszió). Ezzel a Hallás & Kiejtés modul a V3 P2 spec szerint TELJES. |
| **Finomítások** | **Hallás tier-fix + univerzális „Nem tudom" gomb.** (1) A Hallás modul nehézségi szintje **egyválasztós** lett (`drillSettings.tiers` objektum → `drillSettings.tier` string) — a szint már CSAK lejátszási tempót ad, a lecke-készlet mindig a teljes 38 (`getActiveLessons` nem szűr, `lessonSpeed` a kiválasztott tier-ből). (2) Új **🤔 Nem tudom** gomb minden feleletválasztós Recognition kártyán (conjugation · adjectives · datetime · listening · counter): felfedi a helyes választ, nem-helyesként számít (streak 0), a feedback semleges amber `pr-fb-dontknow` panel 💡 fejléccel (univerzális `markDontKnowFeedback` helper). A gomb bármely válasz után eltűnik (`.dont-know-btn:disabled { display:none }`). |
| **v4 P1** | **Statisztika adat-alap + Practice History.** A V4 dashboard alapja: minden korábbi modul CSAK aggregált profilt mentett — nem volt időbélyeges kör-rekord. **`NihonCoreStats`** univerzális modul (app.js): session-log tár (`localStorage 'nihoncore_sessions_v1'`), `recordSession` (kör-rekord: id/ts/module/mode/questionCount/correctCount/wrongCount/durationMs/score/errorCodes), `getSessions`, `getDailyAggregates` (Layer 2 — a logokból SZÁMOLVA), `clearSessions`. **6 modul kör-vége instrumentálva** (conjugation/adjectives/datetime/listening/counter/practice): round-start `roundStartTs` + a summary-függvény `recordSession` hívása — csak BEFEJEZETT kör mentődik. Új **`stats.html`** oldal + `initStatsPage` + page-detector ág + nav-fül az index.html-ben (📊 Statisztika). **Practice History (E) nézet**: fül-sáv (6 szekció, P1-ben csak „Előzmények" aktív, a többi 🔒), kör-lista (időbélyeg · modul · mód · pont · % · időtartam · fő hibatípus), összegző sáv, előzmény-törlés. Chartok: kézzel rajzolt SVG/CSS lesz (user-döntés — nincs külső függőség). Hátralévő V4: P2 Overview+Activity, P3 Radar+Analytics, P4 Blind Spot Detector. |
| **v4 P2** | **Dashboard Overview (A) + Activity Engine (B).** Két új `stats.html` nézet (a fül-sávban feloldva, az Áttekintés az alap-nézet). **Stat-számítók** (`initStatsPage` closure): `computeReadiness` — felkészültség-pontszám 3 komponensből: modul-mastery (pontosság × lefedettség, 6 modul átlaga, 0.55 súly) + frissesség (utolsó gyakorlás kora, 0.20) + aktivitás (aktív napok/hét, 0.25); `computeStreak` (egymást követő naptári napok, tegnap is számít); `todayStats`; `heatmapData` (13 hét × 7 nap, hétfő-kezdő rács, kérdés-szám alapú 0–4 szint); `timeOfDayData` (4 napszak-bucket: reggel/délután/este/éjszaka); `bestStudyTime` (legjobb pontosságú bucket, min. 2 kör); `ringSvg` (kézzel rajzolt SVG-ring stroke-dasharray-jel). **A) Áttekintés:** központi readiness ring + a 3 al-komponens látható bar-bontásban + napi vitals kártyák (mai kör/pontosság/aktív idő/streak) + „mai állapot" szöveges összegzés. **B) Aktivitás:** streak-panel + GitHub-stílusú heatmap + napszak bar chart + „legjobb tanulási idő" ajánlás. Minden chart kézzel rajzolt SVG/CSS — nincs külső függőség. Hátralévő V4: P3 Module Radar + Analytics, P4 Blind Spot Detector. |
| **v4 P3** | **Module Radar (C) + Analytics Detail (F).** Két új `stats.html` nézet feloldva. **C) Modulok:** kézzel rajzolt 6-tengelyes **radar chart** (`radarSvg` — 4 grid-gyűrű + 6 tengely + adat-poligon; tengelyek: Számlálók/Igék/Melléknevek/Idő/Partikulák/Hallás, érték = `computeReadiness().moduleScores`). Alatta 6 kattintható modul-sor → **drill-down**: a modul session-log statja (per-mód bontás) + **profil-alapú al-bontás** — a modulok saját localStorage profiljaiból (`subBreakdowns`): conjugation `groupStats` (Godan/Ichidan/rendhagyó) + `formStats` (te/nai/masu…), adjectives `typeStats` + `formStats`, datetime `catStats`, listening `trapErrors`. Counter/practice: nincs profil → csak per-mód. **F) Elemzés:** 4 összesítő stat-kártya + kézzel rajzolt **vonaldiagram** (`lineSvg`) — pontosság-trend napi bontásban + napi kérdés-volumen (a `getDailyAggregates`-ből, ≥2 nap kell). Hátralévő V4: P4 Blind Spot Detector. |
| **v4 P4** | **Blind Spot Detector (D) — V4 TELJES.** Az utolsó V4 nézet feloldva. **`detectBlindSpots`** stratégiai diagnózist állít elő 4 forrásból: (A) nem gyakorolt / régóta nem nyitott modulok, (B) alacsony pontosságú modulok (≥12 kérdés + <55%), (C) gyenge al-területek a modul-profilokból (`subBreakdowns`, ≥8 attempt + <50%), (D) domináns ismétlődő hibatípus (≥6 hiba + ≥35% részarány). Severity-rendezve. **Diagnózis-kártyák** rövid szöveges üzenettel — nem lista, hanem stratégiai tanács („Ezt a formát gyakran kevered", „Ezt a modult X napja nem nyitottad"). **„Célzott gyakorlás" gomb**: a legmagasabb severity-jű, modulhoz kötött diagnózisból ajánlat → `goPractice` localStorage `nihoncore_focus_hint`-et ír és navigál a modulra. **Univerzális `initFocusBanner`** (app.js univerzális szekció, IIFE): a modul-oldalon a friss focus-hintet felismeri, banner-t mutat („🎯 Célzott gyakorlás — ..."), a hintet egyszer használatosan elfogyasztja (10 percen belül érvényes). Ezzel a V4 Statisztika & Dashboard a spec szerint TELJES (A–F mind élő). |
| **v5 P1** | **Grammar Patterns modul + Global SRS framework.** Új `grammar.html` page + új univerzális motor: **`NihonCoreSRS`** Leitner-stílus item-szintű ütemező (box 0..5 → 0/1/3/7/14/30 nap; quality 0=fail/reset, 1=ok, 2=easy; `recordReview`/`getDueItems(prefix, knownIds)`/`getItemState`/`aggregateBoxes`/`clearScope`; localStorage `nihoncore_srs_v1`; itemId formátum `<scope>:<contentId>[:<sub>]` — egyelőre csak a `grammar:` scope használja, de univerzális). Adatmodell: **`NIHONCORE_GRAMMAR_PATTERNS`** (15 minta: 12 N4 + 3 N3 — tai/tara/eba/nara/te_mo_ii/te_wa_ikenai/nakereba_naranai/nakute_mo_ii/to_omou/tsumori/nagara/temo + noni/sou_da_hearsay/you_ni_naru), patternenként 2 példa LexiLearn-stílusú `<ruby><rt>` furigana-val + `___BLANK___` cloze + `clozeAnswer` + `contrasts[]`. **11 grammatikai kategória** (vágy/feltétel/kötelesség/engedély/tiltás/vélemény/szándék/párhuzam/ellentét/hallomás/változás). **2 mód: Felismerés** (4-választós: melyik minta van a mondatban — distraktor prio: `contrasts[]` → azonos kategória → random) és **Cloze** (`___BLANK___` → kana input, 18 s timer, kana-normalizáló + diagnose: wrong_pattern / contrast_confused / typo (LCS dist ≤ 2) / wrong_form / empty). **Lobby**: 3 JLPT szint-toggle, kategória-toggle (üres kategória elrejtve), 2 mód, cardCount, **★ SRS opt-in toggle** (live „N esedékes · M új" jelzővel). Hint provider (2 szint: kategória → első karakter/struktúra, −3 pt). Univerzális „Nem tudom" gomb. **Profile dashboard**: per-pattern bar (gyengétől erősig) + **SRS box-eloszlás** (0..5 bar) + weakness chip + külön „Profil törlése" és „SRS törlése" akciók. **Stats integráció**: a `MODULE_LABELS`/`RADAR_LABELS` kibővítve a 7. tengellyel („Mintázatok"), `PROFILE_CONFIG.grammar` `{ catStats + patternStats }` → drill-down · `MODE_LABELS.cloze` hozzáadva. `NihonCoreStats.recordSession({module:'grammar', mode})` minden kör végén. Új univerzális IIFE `initFocusBanner` lista bővítve (`grmMain` → `grammar`). |
| **v5 P2** | **Arimasu/Imasu modul kibővíthetővé téve (mechanika-szint).** A meglévő `arimasu-imasu` modul kapott **kategória-tudatos sémát**: új `categories` mező a data.js-ben (3 kategória: `existence` ✅ aktív, `consumption` 🔒 stub, `movement` 🔒 stub). A `bases` mező kapott `categoryId` mezőt minden ige-bázishoz. **Engine-bővítés** (app.js initModulePage): új closure helper `getEnabledBaseIds(m)` + `syncMatrixBaseFilters(m)` — a `buildMatrixTaskPool` hard-coded `['arimasu', 'imasu']` listája dinamikus a `filters.base` kulcsai alapján. **Lobby UI** (matrix-selector): új „Kategóriák" section a Phase 2 lobby-ban — engedélyezett kategóriák `.ml-cat-btn` chipekkel, locked stub-ok 🔒 jelzéssel + figyelmeztető szövegével („A teljes tartalom-feltöltés a végső lépésben"). Új CSS blokk a `.ml-cat-btn` / `.ml-cat-btn-locked` / `.ml-cat-note`-hoz. **Stats integráció**: `MODULE_LABELS['arimasu-imasu'] = 'Alap igék'`, `MODE_LABELS` bővítve `matrix-selector`/`speed-drill`/`interactive-demo`-val, és **session-log rögzítés** a `showMatrixSummary` + `showDrillSummary` végén (`NihonCoreStats.recordSession({ module: 'arimasu-imasu', mode })`). A radar 7-tengelyű marad — `arimasu-imasu` NEM kerül a radarra (a `RADAR_ORDER` változatlan), de a History/Analytics/Blind Spot listákban megjelenik. **index.html** kártya frissítve: cím „Arimasu / Imasu" → „Alap igék (Arimasu / Imasu)", phase-felirat „1. fázis" → „Alap igék · létezés", badge „MVP" → „v5 P2". **Content NEM bővül** (user-direktíva: tartalom-feltöltés végső lépés) — a séma és motor készen áll a `tabemasu`/`nomimasu`/`ikimasu`/`kimasu`/`kaerimasu` befogadására, csak az ige-bázisok hiányoznak. |
| **v5 P3** | **Adaptive Selector Grammar Patternshez + SRS box-grafika Stats Analytics fülön.** **P3a — Adaptive:** új opt-in `drillSettings.adaptive` flag a Grammar lobby-ban (`#grmAdaptive` checkbox). Helperek: `grmAdaptiveEnabled(profile)` (min. 10 attempt küszöb), `getGrmAdaptiveWeights(pool, profile)` (per-pattern rate alapján 1–3× súly), `grmWeightedPick(weighted)`. A `generateGrmQueue` non-SRS ága használja. Lobby-info: hány attempt kell még / mennyi „gyenge" minta van (<70% és ≥2 attempt). Ha SRS bekapcsolva → felülírja az adaptív gyakorlást (info-szöveg). **P3b — SRS box-grafika:** új panel a `stats.html` Analytics fülén, scope-agnostic `SRS_SCOPES` lista (egyelőre csak `grammar:`) + `srsBoxChart(boxes)` vertikális bar-chart helper (6 box-oszlop, magasság az item-számmal arányos, hover-tooltip a következő esedékességgel). Box-szín kategóriák: `fresh` (box 0, amber) / `short` (1-2, teal) / `mid` (3-4, gold) / `long` (5, green). Üres scope automatikusan rejtve. Új CSS blokk `.srs-chart` / `.srs-box-col` / `.srs-box-bar` + 4 tone variant + `.act-card-sub`. Mobil: responsive media query 720px alatt. |
| **v5 P4** | **Translate mód a Grammar Patternsben (frázis-tálca, Mondat-Puzzle stílus).** Új belépő-mód a `grammar.html`-en: 3. mód-gomb a lobby-ban („Fordítás — HU→JP frázis-tálca"). **Engine** (initGrammarPage closure): `tokenizePhrases(kana)` heurisztikus particle-alapú tokenizáló (multi-char: まで/から/でも/のに/ても/なら/ながら; single: は/が/を/に/で/と/も/の/へ/や/か; védelem: a particle csak akkor érvényes, ha `cur.length > 0`, hogy a szó-eleji „に" stb. ne legyen téves vágva; punktuáció 、。 saját token). `buildTranslateCardData(pattern, example)` → helyes tokenek + 2 distraktor (`contrasts[]` patternek példáiból, fallback random pool, NEM-punkt + NEM-egyezés szűrés). `buildCardForPattern` új `kind:'translate'` ágat ad, `srsId: patternItemId(pattern)`. **UI** (Mondat-Puzzle minta): `renderGrmTranslateCard` (HU fordítás NAGY a tetején + tálca + üres válasz-sor), `.grm-trans-tok` chip-ek drag&drop + click-to-select. `attachGrmTransContainerHandlers` (drop targets) + `attachGrmTransTokenHandlers` (dragstart/end + click). `grmTransInsertIndex(container, clientX)` pozíció-számítás drop-hoz. **Diagnose** (`diagnoseTranslate`): `match` ha pontos sorrend; részleges `posOk/slots` (helyes-pozíció / összes slot); hibakódok: `empty` / `wrong_order` (jó tokenek, rossz sorrend) / `wrong_form` (más tokeneket választott). **Pontozás**: 14 pt helyes (legnehezebb mód), részleges credit `posOk/slots × 6` hibás esetben (pl. 3/4 → 4 pt), −3 pt hint. **„Nem tudom"** gomb: a tálca + submit ki, diag `empty` + 0 user-token. **Feedback**: új ág a `renderGrmFeedback`-ban — fejléc állapot-szerint („Helyes tokenek, rossz sorrend" / „Részben helyes" / „Üres válasz"), user válasza vs. helyes mondat side-by-side, romaji + magyar fordítás. **SRS integráció**: pattern-itemId (mint a recognition); helyes+hint=0 → quality 2, helyes+hint>0 → 1, hibás → 0. **CSS** (style.css végén): `.grm-trans-hu` (teal hint-zóna a HU-nak), `.grm-trans-section-label`, `.grm-trans-answer`/`.grm-trans-tray` (drag&drop drop-zóna stílus), `.grm-trans-tok` (chip + hover/correct/wrong állapot). Mobil: kompaktabb chip-méret. **Stats**: `MODE_LABELS.translate = 'Fordítás'`. **drillRunState** új mezők: `translateTrayIdx[]`, `translateAnswerIdx[]`. |
| **v6** | **Hallás Pro mód — mondat-szintű listening (V3 motor reuse).** Új 3. mód a `listening.html`-en a Recognition + Diktálás mellé. **Engine** (initListeningPage closure): `getProSentences()` runtime aggregátor — a `NIHONCORE_GRAMMAR_PATTERNS.examples`-ből (30 mondat) építi a Pro pool-t egységes `{ id, text, romaji, meaningHu, source, jlpt, patternId, patternLabel }` sémával. NEM hozunk létre új tartalmat. `generateListeningQueue` Pro-ágat ad — unique-shuffle a pool-on (ha pool < count, ismétlés). **UI** (impeccable skill konzultáció alapján, product register): a kártya-tetejére **konzisztens context-badge sor** (`🎧 Pro listening · JLPT N4 · 〜たら` — kategória + JLPT + pattern-cím), **HU fordítás teal hint-zónában** (`.grm-trans-hu` minta reuse, kötelezően látszik mert mondatnál a kontextus segít a hallásnál), majd a Diktálás-szerű audio-zóna (PLAY + Slow). **Audio**: `playCardAudio` Pro-szempontból natural tempó (1.0×) alap a tier-rel függetlenül, slow 0.75× (mondatnál a 0.6× túl lassú). **Romaji input + élő kana-preview + mora-diff** mind reuse-olva a meglévő Diktálás-motorból. **Pontozás**: 12 pt (Diktálás-szerű), replayCount≥4 → -2. **Lobby**: `updateLstStartBtn` mód-tudatos pool-számláló („Gyakorolható mondatok" vs „audió-leckék"). **Stats**: `MODE_LABELS.pro = 'Pro listening'`. **CSS**: `.lst-pro-eyebrow` (badge sor), `.lst-pro-tag` (gold akcent), `.lst-pro-hu` (margin-fix), `.lst-pro-input` (hosszabb input mondat-méretre). Anti-patterns elkerülve: nincs „Pro" badge a lobby-gombon (csak `sub` szöveg differenciál), nincs gradient text, nincs side-stripe border, nincs új szín-akcent. |
| **v7 P1** | **Production modul — HU→JP teljesen szabad input + fuzzy diff.** Új page `production.html` + új init `initProductionPage()` az app.js-ben. **Engine** (closure): `getProdSentences()` runtime aggregátor a `NIHONCORE_GRAMMAR_PATTERNS.examples` (30 mondat) + `NIHONCORE_SENTENCES` (24 mondat) tartalmából — egységes `{ id, kana, romaji, hu, jp, source, jlpt, patternLabel }` sémával. NEM content-bővítés. `generateProdQueue` unique-shuffle. **Fuzzy diff motor**: `kataToHiraProd` + `normJpProd` (katakana→hiragana + whitespace + punktuáció strip), `romajiToKanaProd` (~80 syllaba Hepburn parser, sokuon-detektálás), `isKanaDominant` (heurisztika: ≥80% kana → ne konvertáld), `tokenizeProdPhrases` (a V5 P4 Grammar tokenizer reuse-a), `levDist` (Levenshtein), `charDiffProd` (LCS character ops), `alignTokens` (greedy: helyes / misplaced / typo (≤floor(len/2) lev) / wrong), `diagnoseProd` → **5-szintű verdict** (emil-design-eng konzultáció szerint): **perfect** (exact) / **close** (token ≥80% + char ≤15%) / **near** (token ≥60% + char ≤30%) / **far** (token ≥40%) / **wrong**. Pontozás: 16/12/8/4/0 pt. **UI** (emil polish): kártya-tetejére **3 context-tag** (✍ Production red + JLPT N4 teal + 〜たら gold / 🧩 Mondat-Mester), **NAGY HU teal hint-zónában** (.grm-trans-hu reuse), 3-soros textarea (Zen Kaku Gothic JP font, monospace-szerű min-height 88px) + **élő romaji→kana preview** (csak ha romaji-t ír), Submit min. 3 karakter-után enabled, Enter beküld + Shift+Enter sortörés, autofocus 60ms-mal. **Feedback** (`renderProdFeedback`): 5-szintű meta (icon + title + sub) — „Tökéletes!" (🎉), „Majdnem!" (✨), „Közel jó" (🎯), „Még gyakorold" (🌱), „Nézzük meg együtt" (🤔 — NEM "HIBÁS"). Token-szintű diff háttér-színekkel (correct teal / misplaced amber dashed / typo gold + karakter-szintű inline-diff monospace fontban / wrong red-soft / missing dashed). 🔊 „Hallgasd meg" gomb (NihonCoreAudio reuse). „Nem tudom" gomb: input + submit disabled, diag empty. **Profile**: `nihoncore_prod_profile_v1` (totalAttempts + verdictCounts + bestStreak). **Stats**: `MODULE_LABELS.production = 'Produkció'`, `MODE_LABELS.free = 'Szabad fordítás'`, `recordSession({module:'production', mode:'free'})`. **CSS** (style.css végén ~150 sor): `.prod-eyebrow` / `.prod-tag` (red soft akcent — "advanced mode") / `.prod-hu` / `.prod-input-zone` / `.prod-input` (Zen Kaku JP font + min-height) / `.prod-preview` (teal italic) / `.pr-fb-perfect`/`-close`/`-near`/`-far` (5-szintű feedback gradient háttér) / `.prod-fb-points` (gold pont-pill) / `.prod-tok` + 5 állapot + `.prod-tok-charfix` (monospace inline char-diff). **Page detector**: új ág `prodMain` → `initProductionPage()`. **initFocusBanner**: `PAGE_MODULE.prodMain = 'production'`. **Anti-frustration UX**: NEM binary OK/NOT-OK; 5-szintű, „szövetséges" hangnem; token + karakter diff KOMBINÁLVA; HU látszik feedback alatt is. Animation előkészítve a polish-fázisra (animejs Nap 5). |
| **v7 P2 (PWA)** | **Service Worker — offline + install.** Új fájl `sw.js` a projekt root-jában (~120 sor). **Cache-stratégia**: APP-SHELL (mind a 11 HTML + style.css + auth.css + app.js + data.js + manifest + 2 ikon) → cache-first; Google Fonts (CSS + woff2) → cache-first runtime; **Google TTS endpoint NEM cache-elt** (változó query). **Verzió-bump**: `CACHE_VERSION` const → 1-gyel feljebb új release-nél, a régi cache automatikusan törlődik az `activate` event-ben. **3 listener**: `install` (precache + skipWaiting), `activate` (régi cache clean + clients.claim), `fetch` (per-kategória stratégia: TTS NETWORK-only, Fonts cache-first runtime, app-shell cache-first appShell, egyéb network-first). **Offline fallback**: ha cache miss + offline, az `index.html`-re irányít (SPA-szerű). **SW regisztráció**: új IIFE az app.js univerzális szekciójában (`initServiceWorker`) — minden HTML automatikusan kap egy regisztrált SW-t (mert mindegyik betölti az app.js-t). HTTPS / localhost / 127.0.0.1 protokollra van szűrve (a `file://` NEM regisztrál). Csendes hibakezelés (a SW opcionális, az app működik nélküle is). `manifest.webmanifest` változatlan — már korábban PWA-kész volt (start_url, standalone, theme_color, ikonok). |
| **v7 P3 (mappa-szervezés)** | **Fájl-struktúra átszervezés átláthatóság céljából (2026-05-25).** A meglévő flat-struktúra (mind a 18+ fájl a root-ban) helyett **4 új mappa**: `pages/` (11 HTML kivéve index), `css/` (style.css + auth.css), `js/` (app.js + data.js), `img/` (2 png). **Root-on MARAD** (technikai okok): `index.html` (entry-point), `sw.js` (Service Worker scope a registráció URL-éhez igazodik — ha mappába kerülne, csak az adott mappára érvényesülne), `manifest.webmanifest`, `CLAUDE.md`, `CONTENT_LOAD_GUIDE.md`. **Path-frissítések**: `index.html`-en CSS `css/style.css`, JS `js/app.js`, képek `img/...`, modul-link-ek `pages/...`; `pages/*.html`-en mindegyik `../`-prefix-szel hivatkozik (`../css/style.css`, `../js/app.js`, `../img/...`, `../index.html`); az auth.html-eknél `../css/auth.css`. **Testvér HTML-ek** (`login.html` link, etc.) változatlan — mind `pages/`-ben vannak. **SW regisztráció dinamikussá téve**: az app.js a `document.currentScript.src`-ből számolja a ROOT URL-t (`new URL('../', new URL('./', script.src))`) — mind az index.html-ből (root), mind a `pages/*.html`-ből (alkönyvtár) ugyanaz a sw.js URL és scope keletkezik. **sw.js APP_SHELL** lista frissítve az új path-okra, `CACHE_VERSION` bumpolva (`nihoncore-v2-2026-05-25`) → régi cache automatikusan törlődik. **A funkció változatlan** — csak az átláthatóság javult. |
| **v7 P3 content batch 1** | **Tartalom-feltöltés első ütem (2026-05-25)** — a user által saját kézzel megírt 3 batch fájl beillesztve a `js/data.js`-be. **Na-melléknév**: 10 → **40** rekord (20 N5 + 12 N4 + 8 N3) — teljes tömb-csere. Új szavak: shizuka/jouzu/heta/taisetsu/daijoubu/hima/rippa/futsuu/tokubetsu/joubu (N5) + jiyuu/anzen/kiken/hitsuyou/fukuzatsu/teinei/muri/raku/tokui/nigate/seikaku/daiji (N4) + taihen/tekitou/meiwaku/tekisetsu/majime/shinchou/kichou/tanki (N3). Ellentétpárok és csapdák jelölve `note` mezőben (上手↔下手, 安全↔危険, 得意↔苦手, 適当↔適切). **Counter-item**: 33 → **70** rekord — teljes tömb-csere. 7 kategória bővítve (tsu 5→12, nin 5→10, mai 5→10, hon 5→10, satsu 5→9, soku 4→8, dai 4→11). **Mondat-Mester**: 24 → **76** mondat (+52, append) — N5 +30 (s_n5_013..042: napi élet/helymeghatározás/mozgás/étel/hobbi/eszköz témakörök), N4 +14 (s_n4_008..021: te-iru progresszív, tai/takunai, potenciális, te-kudasai, ageru/morau), N3 +8 (s_n3_006..013: たことがある, ほうがいい, てしまう, ておく, ために, ながら, ～そうです). Minden új mondat tokenizált, `metadata` mezővel (function/form/tense/register), részleges semantic-time annotációval. CLAUDE.md Section 1 modul-táblázat frissítve. **NEM** módosultam az engine vagy CSS — csak a `js/data.js` 3 tömbje. |
| **v7 P3 content batch 2** | **Mondat-Mester nagy bővítés (2026-05-26)** — a user által írt `NIHONCORE_SENTENCES_Bovitett.js` fájl (sok syntaktikai hibával: hiányzó vesszők szekciók közt 4 helyen, duplikáció `s_n5_063..092` blokkon, ismeretlen token-típusok `copula`/`modifier`/`'companion (és)'`) **kijavítva + beillesztve** a `js/data.js NIHONCORE_SENTENCES` tömbjébe. **Eredmény**: 76 → **186** mondat (+110 új N5: s_n5_043..s_n5_152). 4 szekció: **Tárgyak mutatása** (これ/それ/あれ + の, s_n5_043..062, 20 db), **Helyszínek** (ここ/そこ/あそこ + どこ, s_n5_063..092, 30 db), **Főnevek mutatása** (この/その/あの + főnév, s_n5_093..122, 30 db), **Összetett helymeghatározás** (〜の中/上/下/前/後ろ + あります/います, s_n5_123..152, 30 db). **Tisztítások beillesztés közben**: `type:'copula'` → `type:'verb'` (engine word/particle/verb-et fogad), `role:'modifier'` → `role:'possession'` (a の-particle az engine-ben "possession"), `role:'companion (és)'` → `role:'companion'`, bare `ね`-particle (s_n5_121) kapott `role:'confirmer'`-t. Duplikációból csak az első előfordulás került be. **Statikus check**: 186 ID (152 N5 + 21 N4 + 13 N3), 0 ismeretlen type/role, 1300/1300 brace + 187/187 bracket egyensúly. CLAUDE.md Section 1 frissítve (Mondat-Mester 76→186). Engine + CSS + HTML ÉRINTETLEN. |
| **V8 (data-szétbontás)** | **A monolit `js/data.js` (~5125 sor) 8 modul-fájlra bontva (2026-05-26).** `js/data/`: core.js (config + összes engine-szabály/CATEGORIES/TIERS/ERROR_TYPES) + sentences.js + verbs.js + adjectives.js + counters.js + datetime.js + audio.js + grammar.js. **Fontos szabály:** a tartalom-fájlok CSAK tartalom-tömböket tartalmaznak — a CATEGORIES/TIERS/ERROR_TYPES const-ok a **core.js**-ben élnek. Ha a user újratölt egy tartalom-fájlt config-const-tal → `Identifier already declared` SyntaxError → megtörik a betöltés. 9 HTML script-tag átírva (1 helyett 8 data-fájl). `sw.js` APP_SHELL + CACHE_VERSION bump. Régi data.js törölve. Lásd Section 4. |
| **Zen Polish** | **Teljes vizuális újratervezés „generic SaaS" → autentikus japán zen esztétika.** Washi papír háttér (`--washi #F3EEE3`), sumi tinta szöveg (`--sumi #2A2A2E`), matcha zöld akcent (`--matcha #7A8B4F`) — **NINCS kék-lila gradient, nincs neon-glow**. Fontok: Nunito (UI) + Lora (serif mondatok) + Noto Serif JP (kanji/furigana). Emil-mikro-interakciók (`:active scale(0.97)`, KIZÁRÓLAG ease-out 120/160/220ms). `NihonCoreMotion` IIFE (anime.js CDN): flashCorrect/shakeWrong/staggerIn/celebrate. **Sakura-bloom celebration**, landing staggered entry + ring-rajzolódás. **Dual-téma**: `html.theme-sumi` (sötét) class — flicker-prevention inline `<head>` scripttel. Régi tokenek (`--ink`, `--gold`, `--teal`) alias-olva az új zen-értékekre. |
| **Flashcard rendszer** | **Univerzális 3D flashcard motor (`NihonCoreFlashcard` IIFE).** Kártya-flip (click) + swipe (drag >90px). Mind a 4 tartalmi modulnál „Szótár" mód (Számláló Phase 1 csere + Ragozó/Melléknév/Datetime). Kategória-szűrő. `nc_fc_state_*` localStorage (tudom/nem tudom per item). `initFlashcardLaunchers` adapterekkel (verbs/adjectives/datetime). |
| **Barba SPA + PWA toasts** | **Barba.js (CDN) SPA oldalváltás** — fade max 200ms, `data-barba="wrapper"` (body) + `data-barba="container"` (main). `data-barba-prevent` + explicit JS-navigáció a problémás linkekre (pl. profil→statisztika). `afterEnter` újrafuttatja `NihonCoreInitPage`-t. **PWA install + update toast** (`initPWAToasts`). |
| **V16 — Firebase Auth** | **Valós bejelentkezés (mock csere).** Új `js/auth.js` (`NihonCoreAuth` IIFE) — Firebase compat SDK (gstatic CDN), email/jelszó + Google provider, single-user. firebaseConfig projectId `japangyakorlo` (az apiKey PUBLIKUS by design — a védelmet a Firestore rules adja). `ready/isEnabled/getUser/onChange/getCachedUser/register/login/loginGoogle/logout/humanError`. `auth.css` zen-redesign. Header user-chip (`initAuthHeaderState`) avatarral + menüvel (email/sync/statisztika/logout). file:// alatt csendben kikapcsol. |
| **V17 — Firestore sync** | **Tanulási adat felhő-szinkron (`js/sync.js`, `NihonCoreSync`).** `users/{uid}` doc → `data:{kulcs→json}` + `updatedAt`. Login után PULL+merge, majd 3s debounce + 30s interval + visibilitychange + beforeunload PUSH. Merge: sessions=append (id-unió), srs=per-item frissebb, profilok/settings=last-write-wins. Eszköz-specifikus kulcsok (theme/helpers/audio_on…) NEM syncelnek. `fsError` magyar hibakódok. Firestore security rules: `match /users/{userId} { allow read, write: if request.auth != null && request.auth.uid == userId; }`. |
| **Perf — Firebase lazy-load** | **Mobil-gyorsítás.** A Firebase SDK NEM blokkolja a page-rendert — `scheduleIdle` (requestIdleCallback) tölti az app+auth SDK-t render UTÁN; a firestore-compat (~300 KB) CSAK az első bejelentkezéskor (`ensureFirestore`). Flicker-mentes header: `nihoncore_cached_user` localStorage cache → optimista render az SDK betöltése előtt; `onChange` nem hív null-lal kezdetben. |
| **Bugfix fázis (folyamatban)** | **Modul-onkénti hibajavítás (2026-05-28).** (1) **Arimasu Phase 2**: a base-picker hard-kódolt arimasu/imasu volt → dinamikus, kategória-csoportosított (existence/consumption/movement, `matrixState.filters.base` szerint). (2) **Helpers toggle fix**: a V8 új elemek (`.base-sub` „élettelen/élő", `.nc-fc-romaji/-meaning/-example-*`, `.grm-sentence-romaji`) kimaradtak a `helpers-no-romaji`/`helpers-no-hu` rejtés-listából — pótolva. (3) **Partikula-slot szín-harmónia**: a slot/konténer hideg-szürke (`rgba(42,42,46)`) ill. régi navy (`rgba(20,22,41,0.5)`) háttere meleg washi-homok tónusra cserélve. Új téma-tudatos slot-tokenek (`--slot-bg/-border/-bg-active/-border-active/-bg-filled/-border-filled/-placeholder` + `--surface-warm/-edge`) sumi-felülírással. Üres=homok-mélyedés taupe szaggatott, aktív=matcha jelzés, kitöltve=kiemelt papír+arany, neon-glow eltávolítva. (4) **Kontroll-panel zen** (helpers-bár `.helpers-bar`/`.ht-btn`, fázis-tabok `.phase-tabs`/`.phase-tab`/`.phase-sub`, Pont/Sorozat chipek `.pr-stat`/`.sd-stat`, Mondat-Puzzle tálca `.pp-tray-area`): a régi sötét **navy** (`rgba(20,22,41,0.4–0.55)`) háttér + blur + gold-glow lecserélve **világos krém kártya-felületre** (új `--panel-bg/-border/-shadow` tokenek = washi-soft + papír-árnyék). Szöveg sötét sumi/charcoal, kísérő-szöveg kisebb+light, főcímek airier letter-spacinggel, a nagy számok sötét sumi tónusban (glow nélkül), aktív fázis határozott gold-trad keret+töltés. |
| **V18 — Univerzális kör-őr (`NihonCoreRound`)** | **Minden modulra érvényes kör-életciklus (2026-05-28).** Új univerzális IIFE az app.js-ben — 3 funkció minden modulra: **(1) Kilépés-megerősítés BÁRMILYEN kilépésnél**: aktív kör közben a logo / 🏠 / böngésző-vissza/-bezárás / user-menü link is megerősítést kér (nem csak a „Kilépés" gomb) — capture-fázisú click-guard (a Barba elé fut) + `beforeunload` + `pagehide`. **(2) Modul-név MINDIG látszik a fejlécben**: a `.module-page-title` (vagy fallback: `document.title`) a `.nav.module-page-nav`-ba tükröződik egy `.module-name-badge` chipként — lobby ÉS kör közben (a hero el van rejtve a kör alatt). **(3) Részeredmény-mentés**: ha kör közben kilépsz (bárhogy), az eddigi válaszok (helyes/hibás) elmentődnek a statisztikába — nem csak a befejezett körök. Mechanizmus: `begin(snapshotFn)` a 10 kör-indító ponton regisztrál egy `{module,mode,results,score,startTs}`-pillanatképet; a kör vége (`recordSession`) → `markComplete()` (inaktív); kilépés → `flush()` (a `.module-hero` újra-megjelenését figyelő MutationObserver + a nav-guard + pagehide hívja; practice.html-nek nincs hero → explicit `flush()` az exit-handlerben). A `_recorded` flag gátolja a dupla mentést. A kilépő-confirm szövege frissítve (már NEM „nem mentődik az eredményed"). **(4) Kártyaszám-clamp**: a 9 „saját szám" inputban a custom érték a modul tényleges pool-méretére van vágva (`countFilteredCombos`/`countCounterPool`/`filterSentences().length`/`countComboPool`/`countAdjPool`/`countDtPool`/`countLstPool`/`countProPool`/`countGrmPool`/`countProdPool`) — nincs többé 120000-kártyás kör. `initCurrentPage` végén `NihonCoreRound.refresh()` (badge + observer; Barba afterEnter is hívja). |
| **V18b — Félbehagyott körök az Előzményekben** | **A részmentett (félbehagyott) körök megjelölése (2026-05-28).** A `recordSession` rekord új `partial` mezőt kap (`!!info.partial`); a `flush()` `partial:true`-t állít. A **stats.html Előzmények** nézet minden sorához `.sh-status` jelvény: **✓ Befejezett** (matcha) / **⏸ Félbehagyott** (gold), a félbehagyott sor halványabb (`.sh-row-partial`). A summary-sáv „befejezett kör" + új „félbehagyott kör" számláló. Minden egyéb stat (pontosság, heatmap, streak, radar, vakfoltok) automatikusan beleszámítja a félbehagyott köröket is, mert mind a `getSessions()`-ből számol. **Firebase: NINCS változás szükséges** — a `nihoncore_sessions_v1` sync append-merge id-unióval a TELJES rekord-JSON-t menti/olvassa (`mergeSessions` objektumonként tárol), így a `partial` mező automatikusan szinkronizálódik; a `recordSession` a meglévő `schedulePush()`-t hívja. |
| **Landing-redesign (impeccable skill)** | **A kezdőlap (index.html) frissítése (2026-05-28, brand register).** A hero elavult infói javítva: „JLPT N5 • Dekiru 1 / 15 Lecke / 5 Modul típus" → **„JLPT N5→N3 · 9 interaktív modul"**, hero-stat: 9 modul / N5–N3 / 100% ingyenes. Headline `日本語を` + „vidd reflexszintre.", pontosabb leírás. Hero-kártya tankönyv-specimenné bővítve: furigana (`<ruby>食<rt>た</rt></ruby>べます`) + ragozott alak-chipek (食べない/食べた/食べて). **Új informatív szekció** `.nc-method` („Három lépésben rögzül"): a 3-fázisú módszer (一 Megértés → 二 Alkalmazás → 三 Automatizálás) editorial sorszámozott flow összekötő vonallal + `.nc-facts` pill-sor (statisztika/SRS/offline/téma/magyar). NEM a korábban eltávolított „Miért NihonCore?" kártyarács — szándékosan más forma. **CSS-only hero belépő** (`nc-hero-rise` keyframe, staggered, ease-out, reduced-motion guard — mert az anime.js defer-rel tölt, az `initLanding` előtt nincs kész). Nav + mobil-nav „Módszer" (#method) link, footer „N5–N3", `theme-color` → washi `#F3EEE3`. Zen identitás megtartva (washi/sumi/matcha, Noto Serif JP + Nunito + Lora) — identity-preservation a reflex-reject lista felett. `initLanding` reveal-query bővítve (`.nc-method-step`, `.nc-fact`). |

**Jelenleg élő modulok:**
- ✅ **Alap igék (Arimasu/Imasu) — V5 P2** verb engine + kategória-tudatos lobby (1 aktív + 2 stub kategória) · session-log instrumentálva (stats)
- ✅ Mondat-Mester (Partikula-kitöltő + Mondat-Puzzle)
- ✅ Számláló Szavak (Recognition + Hybrid + Mastery)
- ✅ **Ragozó modul (V2.0 TELJES)** — Godan/Ichidan/Irregular · 12 forma · 3 mód · adaptív · hint · dashboard
- ✅ **Melléknév modul (V2.1 TELJES)** — i-adj + na-adj · 9 forma · 3 mód (Recognition + Build + Mastery) · いい kivétel + copula-variánsok · adaptív gyakorlás · profile dashboard
- ✅ **Dátum & Idő modul (V2.3 TELJES)** — 8 kategória (hónap/nap/hétnap/idő/24h/perc/év/relatív) · 3 mód (Recognition + Build + Mastery) · adaptív · profile dashboard · rendhagyó olvasatok
- ✅ **Hallás & Kiejtés modul (V3 P2 + V6 TELJES)** — NihonCoreAudio (Google TTS) · 38 audió-lecke (szó-szint) + 30 mondat (Pro mód, Grammar Patterns reuse) · **3 mód**: Audio Recognition + Diktálás + ★ **Pro listening** (V6: mondat-szintű, natural 1.0× tempó, context-badge sor, HU teal hint-zóna, mora-diff motor reuse) · minimal-pair csapdák · 3 nehézségi szint · adaptív · 🔊 globális válasz-felolvasás
- ✅ **Statisztika oldal (V4 TELJES)** — `stats.html` · NihonCoreStats session-log adat-réteg · mind a 6 nézet aktív: **Áttekintés** (readiness ring), **Aktivitás** (heatmap + streak), **Modulok** (radar — V5-ben 7 tengely + drill-down), **Vakfoltok** (Blind Spot Detector + „Célzott gyakorlás"), **Előzmények**, **Elemzés** (trend vonaldiagram)
- ✅ **Grammar Patterns modul (V5 P1 — új)** — `grammar.html` · 15 sentence-szintű minta (12 N4 + 3 N3) 11 kategóriában · 2 mód (Felismerés + Cloze) · opt-in **SRS ütemezés** (Leitner box 1/3/7/14/30 nap) · contrasts-alapú pedagógiai distraktorok · profile dashboard SRS box-eloszlással
- ✅ **`NihonCoreSRS` univerzális motor (V5 P1 — új)** — Item-szintű spaced repetition framework. Scope-alapú itemId konvenció (`<modul>:<id>[:<sub>]`); minden jövőbeli NihonCore modul ráköthető. **Nem** vocab — azt a LexiLearn kezeli.
- ✅ **Production modul (V7 P1 — új)** — `production.html` · HU→JP teljesen szabad input (kana vagy romaji) · fuzzy LCS-diff (token + karakter szinten kombinálva) · **5-szintű verdict** (Tökéletes/Majdnem/Közel jó/Még gyakorold/Nézzük meg együtt) — anti-frustration szövegezés · 54 mondat reuse (30 Grammar + 24 Mondat-Mester) · emil-design-eng skill konzultáció alapján polish · pontozás 16/12/8/4/0 pt
- ✅ **Firebase Auth (V16)** — `js/auth.js` · email/jelszó + Google · single-user · lazy SDK-load (mobil-perf) · header user-chip + menü · `auth.css` zen
- ✅ **Firestore sync (V17)** — `js/sync.js` · `users/{uid}` doc · login PULL+merge, debounce/interval/visibility PUSH · sessions=append / srs=per-item / profilok=last-write-wins · csak tanulási adat (eszköz-specifikus kulcsok nem)
- ✅ **3D Flashcard rendszer** — `NihonCoreFlashcard` univerzális motor · flip+swipe · mind a 4 tartalmi modul „Szótár" módja · `nc_fc_state_*` localStorage
- ✅ **Zen UI + dual-téma** — washi/sumi/matcha paletta · `html.theme-sumi` sötét mód · anime.js mikro-interakciók · Barba.js SPA oldalváltás · PWA install/update toast

---

## 7. Konvenciók (DO és DON'T)

### DO
- **Magyarul válaszolj** mindig, magyar UI-t használj
- **Edit-eld a meglévő fájlokat** új funkciónál (app.js, data.js, style.css)
- **Page detector pattern**-t használj új oldalhoz: új init függvény + új ág
- **Phase type pattern**-t használj új mechanikához: új case a renderPhase switch-ben
- **Closure-scope state** a per-modul/per-page állapothoz (nem globális)
- **Tokenizált data-struktúra** új mondatokhoz/itemekhez
- **3-rétegű feedback** új validáció-flow-hoz (mi a baj / mi helyes / kontextus)
- **Section-comment-eket** írj nagy refaktor után a kód-fájl elejére

### 🔴 Univerzális runtime UI-konvenciók (minden modul-page)

Minden kör futása alatt **azonos UI-elemek** vannak ugyanazon a helyen:

1. **Header (top)**
   - Bal: logo (`<a class="logo">`)
   - Jobb: `Bejelentkezés` + 🏠 home ikon (`.btn-home`) — az ikon az `index.html`-re visz
   - **NE** legyen "← Modulok" szöveges link a nav-ban

2. **Hero (modul-cím + ikon + leírás)**
   - Class: `.module-hero`
   - Lobby módban látszik, **kör futása alatt rejtett** (`hidden` class) — utility:
     ```js
     document.querySelector('.module-hero')?.classList.add('hidden');     // round start
     document.querySelector('.module-hero')?.classList.remove('hidden');  // back to lobby
     ```

3. **Runtime stats sor** (`.pr-stats`)
   - **2 chip**: Pont + Sorozat (3. chip NE legyen "Kártya N/M" — az progress-stripbe megy)
   - **Jobb szélén** `.round-exit` gomb (X ikon + "Kilépés" label) — `margin-left: auto` flex-layout-tal

4. **Round progress strip** (`.round-progress`)
   - Külön elem a stats sor után, 28px alulról spacing a card-előtt
   - Tartalom: `Kártya N / M` szöveg + gradient progress-bar
   - HTML séma:
     ```html
     <div class="round-progress">
       <span class="round-progress-text" id="xxCardCount">Kártya 1 / N</span>
       <div class="round-progress-bar"><div class="round-progress-fill" id="xxProgressFill" style="width: 0%"></div></div>
     </div>
     ```

5. **Kilépés-confirm**
   - Minden exit-gomb `confirm()` dialóggal kérdez:
     ```
     "Biztosan kilépsz a körből?
     A jelenleg játszott kör adatai elvesznek, a teljes kör végéig nem mentődik az eredményed.
     (Folyamatban lévő statisztika-mentés a V3-ban várható.)"
     ```
   - Igen → vissza lobby-ba, `module-hero` újra látszik

6. **„Nem tudom" gomb** (feleletválasztós Recognition kártyák)
   - Minden MC Recognition kártyán `<button class="dont-know-btn">🤔 Nem tudom</button>`
     az opciók után, a kártyában (nem külön actions-konténerben)
   - Kattintásra: felfedi a helyes választ + magyarázat, nem-helyesként számít
     (streak 0, 0 pont), `markDontKnowFeedback()` a feedback-fejlécet semlegesíti
   - A gomb a „disable minden opció" sweepbe is bekerül (`.cj-option, .dont-know-btn`)
     → `:disabled { display:none }` miatt bármely válasz után eltűnik

Új modul készítésekor ezeket az elemeket kötelezően be kell vezetni — **NE** legyen olyan modul, ahol nincs exit gomb vagy ahol a hero látszik kör alatt.

### 🔴 2-RÉSZES UPDATE — kötelező 2. part ellenőrzések

Amikor egy update 2 partból áll (pl. „V2.0 P1 + P2", „V2.1 P1 + P2"), a **második
part befejezése előtt** mindig el kell végezni az alábbi cross-modul ellenőrzéseket
— a user-nek nem szabad emlékeztetnie:

1. **Helpers toggle (Romaji + Magyar)** lefed minden új osztály-nevet:
   - Új `*-romaji` / `*-roman` osztály → vegyítsd be a `body.helpers-no-romaji` listába (style.css)
   - Új `*-hu` / `*-meaning` / `*-translation` osztály → vegyítsd be a `body.helpers-no-hu` listába
   - Új modul magyar-jelentés szövegei (pl. `example.hu`) **mindig** wrap-pelve külön spanbe (`<span class="cj-example-hu">`)
   - Inline szöveg = nem rejthető; mindig külön span / class

2. **Hero / module-header eltüntetése a kör futása alatt**:
   - Lobby → Start gomb klikk → `document.querySelector('.module-hero')?.classList.add('hidden')`
   - Round vége / „Új kör" / Reset → remove `'hidden'`
   - Phase tab váltáskor (module.html) → default reset (remove `'hidden'`), aztán phase-render dönt újra

3. **Új class név konvenciók**:
   - Romaji-elemekhez: `*-romaji` vagy `*-roman` suffix
   - Magyar fordítás-elemekhez: `*-hu` suffix
   - Magyar UI-helperek (pl. "udvarias jelen állító") NE legyenek `-hu` osztályúak — ezek instrukciók, nem fordítások

4. **Cross-modul tesztelés**:
   - Töltsd be mind a 6 modul-page-et (module?id=arimasu, module?id=szamlalok, practice, conjugation, adjectives, datetime)
   - Kattints a Romaji + Magyar toggle-ekre — minden romaji/magyar szöveg el kell tűnjön/megjelenjen
   - Indíts el egy kört minden modulban — a hero el kell tűnjön

Ha bármelyik fenti ellenőrzés elmarad, és a user később reklamál, az **2. part konvenciósértés**.

### DON'T
- **Ne hozz létre új JS fájlt** kódszervezés céljából — app.js a single source of truth
- **Ne hozz létre új data.js-szerű fájlt** — `data.js` a single source of truth
- **Ne adj hozzá globális változót** — wrap-eld init függvénybe
- **Ne használj framework-öt** (React, Vue stb.) — vanilla JS marad
- **Ne adj hozzá build step-et** (Webpack, Vite stb.) — közvetlen GitHub Pages
- **Ne amend-elj git commitokat** — mindig új commit
- **Ne sértsd a "Glass + Glow + Squircle" design-tokeneket** (lásd style.css :root)
- **Ne dolgozz konkrét CSS pixel-értékkel** — használd a `--radius-*`, `--gold`, stb. tokeneket

### 🔴 NE INDÍTS PREVIEW-T (user explicit kérése, 2026-05-23)

A user **nem szeretne preview-szervert** — ő maga megnézi a böngészőben, amit kell.
- ❌ **NE** hozz létre `.claude/launch.json`-t, `.claude/static-server.ps1`-t, vagy
  bármilyen más preview-launcher fájlt.
- ❌ **NE** hívd a `mcp__Claude_Preview__preview_start`-ot.
- ❌ **NE** indíts Pythonnal/PowerShell-lel HTTP szervert (`python -m http.server`,
  `Start-Process … server`, stb.) verifikációs célból.
- ❌ **NE** lokalhostot nyiss megnézni a változást.
- ✅ A változások leírása szövegben elég — a user maga ellenőrzi.
- ✅ Ha a változás ELLENŐRZÉSE szükséges (pl. szintaxis-hiba veszély), a
  meglévő fájlokat olvasd vissza vagy futtass STATIKUS ellenőrzést (grep, fájl-
  pattern). De NE indíts szervert.

Részletek és kontextus: `memory/no_preview_servers.md`.

---

## 8. Design tokenek (style.css :root) — ★ ZEN PALETTA

> A „Zen Polish" óta a paletta autentikus japán: washi papír + sumi tinta +
> matcha. **NINCS kék-lila gradient, nincs neon-glow.** A régi modern tokenek
> (`--ink`, `--gold`, `--teal`, `--white`) **alias-ok** az új zen-értékekre,
> hogy a régi kód ne törjön.

```css
/* Zen alap-paletta */
--washi:      #F3EEE3   (papír háttér — alap)
--washi-deep: #ECE5D5   (árnyaltabb papír)    --washi-soft: #F8F4EA  (világosabb)
--washi-edge: rgba(58,50,38,0.10)  (finom meleg keret — NEM feketés)
--sumi:       #2A2A2E   (fő szöveg — NEM tiszta fekete)
--sumi-soft:  #4A4A52   --sumi-faint: #6E6E78
--matcha:     #7A8B4F   (primary accent / siker)   --matcha-deep: #5F7038
--indigo:     (másodlagos hideg akcent)   --vermilion: (hiba/wrong, meleg piros)
--gold-trad:  #B8862F   (hagyományos lakk-arany)    --amber: #C68E3A

/* Drop-slot + meleg felület paletta (partikula-slotok + grammar drop-zónák) */
--slot-bg / --slot-border           (üres: homok-mélyedés + meleg taupe szaggatott)
--slot-bg-active / --slot-border-active   (fókusz/drag-over: matcha jelzés)
--slot-bg-filled / --slot-border-filled   (kitöltve: kiemelt papír + arany)
--slot-placeholder                  (placeholder glyph — lágy taupe)
--surface-warm / --surface-warm-edge      (mondat/fordítás-konténer meleg háttér)

/* Kontroll-panel felület (helpers-bár, fázis-tabok, Pont/Sorozat chipek) */
--panel-bg / --panel-border / --panel-shadow   (világos krém kártya + papír-árnyék)

/* Régi → zen ALIASOK (ne használd újhoz, de a régi kód miatt élnek) */
--ink → washi · --gold → gold-trad · --teal → matcha · --white → sumi

/* Tipográfia */
--font-jp:   'Noto Serif JP', 'Zen Kaku Gothic New', serif   (kanji/furigana)
--font-body: 'Nunito', system-ui, sans-serif                  (UI)
--font-serif:'Lora', Georgia, serif                           (HU/EN mondatok, hero)

/* Tranzíció: KIZÁRÓLAG ease-out (Emil-szabály) */
--t-fast: 120ms · --t-base: 160ms · --t-slow: 220ms ease-out
--radius-sm: 8px, --radius-md: 14px, --radius-lg: 20px, --radius-xl: 28px
```

**Dual-téma:** `html.theme-sumi` (sötét) felülírja a tokeneket — minden komponens
auto-adaptál a `var()` miatt. **Új színt mindig token-en keresztül adj** (és ha
hard-kódolsz, használj `var(--surface-warm)`-szerű téma-tudatos tokent — a hideg
`rgba(42,42,46)` / régi navy `rgba(20,22,41)` háttér NEM adaptál és töri a harmóniát).

**Árnyékok:** `--shadow-paper-1/2/3` (finom „papír egymáson", nincs neon-glow).
**Glassmorphism osztályok (legacy):** `.glass-panel`, `.glass-card`, `.glass-pill`
(zen-redesign után papír-felületek, nem üveg).

---

## 9. Common patterns referencia

### Új modul hozzáadása
1. Új rekord a `data.js NIHONCORE_MODULES`-ba (verb-engine vagy counter-engine config)
2. Új kártya az `index.html`-ben hivatkozással `module.html?id=ÚJ_ID`
3. Ha új phase-mechanika kell, új case az `app.js initModulePage() renderPhase` switch-ében

### Új phase-type hozzáadása (új mechanika)
1. Új case a `renderPhase` switch-ben + render/handler függvények
2. State objektum a closure-ben
3. CSS osztályok a style.css végéhez

### Új practice módú gyakorlás (sentence-alapú)
1. Új mondat-objektum a `NIHONCORE_SENTENCES`-be tokenizálva
2. Metadata: 4D (function × form × tense × register) — szűrhető a lobby-ban

### Új counter hozzáadása
1. Új rekord `NIHONCORE_COUNTERS`-be (1-10 reading mindegyik)
2. Hozzá kell csatolni egy kategóriához (`NIHONCORE_COUNTER_CATEGORIES`)
3. Új items a `NIHONCORE_COUNTER_ITEMS`-be `primary: '<counterId>'`-val
4. Ha új `changeType` is van, hozzá kell adni az `explainChange` switch-hez (app.js)

---

## 10. Tesztelési checklist (új feature után)

- [ ] Landing oldal betölt, modul-kártyák megjelennek
- [ ] Mind a 3 modul (Arimasu/Imasu, Mondat-Mester, Számláló Szavak) megnyitható
- [ ] Helpers toggle (Romaji/Magyar) működik minden oldalon, `localStorage` perzisztál
- [ ] Drag & drop működik desktop-on (Mondat-Puzzle, Partikula-kitöltő)
- [ ] Click fallback működik mobil-on (érintőképernyő)
- [ ] Mobile responsive (768px alatt) — minden grid 1 oszlopra esik
- [ ] Phase tab váltás nem köp ki konzol-hibát
- [ ] localStorage törölve → minden ismét default állapotra áll vissza

---

## 11. Nyitott backlog (jövő iterációk)

### V5 — LexiLearn-aware roadmap (user-jóváhagyott, 2026-05-23)

🔴 **Kontextus:** a user **párhuzamos webappot** is karbantart (`LexiLearn`
V10.5: vocab / kanji-as-vocab / sentence-cloze, PWA + IndexedDB). A NihonCore-nak
**komplementer** modulokat kell adni — NE duplikáljuk a vocab/cloze területet.
Részletek: `memory/lexilearn_ecosystem.md`, teljes V5+ terv:
`memory/v5_planning.md`. User-instrukció: V5 = funkció/mechanika; Firebase és
tartalom-load NEM most. **Közös sentence-formátum NEM cél** (user-döntés).

**Felelősség-megosztás:** vocab / kanji-as-vocab / cloze sentence / Dekiru-
haladás → LexiLearn. Morfológia / hallás / sentence-szintű grammar / produkció
/ olvasásértés / stats → NihonCore.

#### V5 P1 — ✅ KÉSZ
- [x] **Grammar Patterns modul** (`grammar.html`) — 15 starter minta (12 N4 + 3 N3),
  11 kategória, 2 mód (Felismerés + Cloze), `<ruby><rt>` furigana + `___BLANK___`
  cloze pattern. Hint provider, „Nem tudom" gomb, profile dashboard. ✅
- [x] **`NihonCoreSRS` univerzális motor** — Leitner box 0..5 (0/1/3/7/14/30 nap),
  scope-alapú itemId, `recordReview/getDueItems/aggregateBoxes`. Egyelőre csak
  a Grammar Patterns modul használja, de univerzális — bármely jövőbeli modul
  ráköthető. ✅
- [x] **Stats integráció** — radar 6 → 7 tengely („Mintázatok"), `PROFILE_CONFIG.grammar`
  drill-down (catStats + patternStats), `MODE_LABELS.cloze`, focus-banner támogatás. ✅

#### V5 P2 — ✅ KÉSZ (2026-05-23, scope-szűkítés: csak az Arimasu/Imasu bővítés)
- [x] **Arimasu/Imasu modul kibővíthetővé téve** — kategória-tudatos séma
  (`existence` aktív + `consumption` / `movement` 🔒 stub), engine adatvezérelt
  base-pool (`getEnabledBaseIds`), lobby-ban kategória-toggle, stats-integráció
  (`recordSession` matrix-selector + speed-drill végén, `MODULE_LABELS` bővítve).
  Content NEM töltött — séma + motor készen áll a végső load-fázisra. ✅

#### V5 P3 — ✅ KÉSZ (2026-05-23)
- [x] **Adaptive Selector Grammar Patternshez** — opt-in `drillSettings.adaptive`,
  weighted random sampling a profil `patternStats` alapján (gyenge minták
  ~3× gyakrabban). Min. 10 attempt küszöb. SRS bekapcsolva felülírja. ✅
- [x] **SRS box-grafika a stats.html Analytics fülön** — scope-agnostic
  `SRS_SCOPES` lista + `srsBoxChart(boxes)` vertikális bar-chart (6 oszlop,
  hover-tooltip a következő esedékességgel). Üres scope rejtve. ✅

#### V5 P4 — ✅ KÉSZ (2026-05-23)
- [x] **Translate mód** Grammar Patternsben — frázis-tálca, Mondat-Puzzle
  stílus. Heurisztikus particle-alapú tokenizáló (`tokenizePhrases`), 2
  distraktor frázis a contrasts[]-ből, drag&drop + click-to-select, részleges
  credit a helyes pozíciókra. SRS pattern-itemId. ✅

#### V5 P5 — javasolt következő (Firebase felé)
- [ ] **Firebase Auth élesítése** — login.html / register.html mock cseréje
  valós Firebase Auth-ra (email + Google provider). Új `auth.js` IIFE az
  app.js-be vagy külön (egyetlen indokolt új JS, mert egyetlen modul-független
  felelősség). A user setup-olja a Firebase projektet a Console-on, 4
  paramétert átad (apiKey, authDomain, projectId, appId), én integrálom.
- [ ] **Firestore sync — profilok réteg** — a 7 modul localStorage-profilját
  (`nihoncore_*_profile_v1`) szinkronizálja Firestore-ba, ha be vagy
  jelentkezve. Offline-friss localStorage stays, csak fel-le-sync.
- [ ] **Firestore sync — session-log + SRS** — `NihonCoreStats` session-log
  és `NihonCoreSRS` Leitner-state Firestore-ba. Ez a két collection lesz a
  fő szinkronizálási cél.

#### V6 — ✅ KÉSZ (2026-05-23)
- [x] **Hallás Pro mód** — mondat-szintű, természetes-tempójú listening. Új 3.
  mód a listening.html-en. `getProSentences()` runtime aggregátor a
  `NIHONCORE_GRAMMAR_PATTERNS.examples`-ből (30 mondat). A meglévő Diktálás
  mora-diff motor reuse-olva mondat-szinten. Context-badge sor + HU teal
  hint-zóna + natural tempó. NEM content-bővítés. ✅

#### V7 P1 — ✅ KÉSZ (2026-05-23)
- [x] **Production modul** — HU→JP teljesen szabad input, fuzzy LCS-diff
  token + karakter szinten, 5-szintű verdict (perfect/close/near/far/wrong).
  Új `production.html` page + `initProductionPage`. 54 mondat reuse a
  Grammar Patterns + Mondat-Mester tartalomból (NEM content-bővítés).
  emil-design-eng skill konzultáció alapján anti-frustration UX. ✅

#### Tier 2/3 — későbbi V-ekre
- **V8:** Reading Comprehension (passage + multiple-choice Q)
- **V9:** Keigo (N3+) vagy más speciális (Pitch accent, Dialogue, Kanji-character)
- **Később:** Firebase backend + tartalom-load (user explicit kérése)

### Pedagógia / hibamotor bővítés
- [ ] Conjugation rule + Style Clash rule a particle-mode hibadiagnosztikába
- [ ] Long-press hint a partikula-tálcán mobile-on (a `hint` mezőből tooltip)
- [ ] Time-adverb pozíció flexibilitás a puzzle-validátorban (`semantic: 'time'` már megvan)

### Tartalom-bővítés
- [ ] N2 / N1 szintek unlock + tartalom (lobbyban `pl-l-locked` chip-ek)
- [ ] Több N3 mondat (jelenleg 5)
- [ ] Új modul: Hallás & Kiejtés (TTS audio-match) — Web Speech API
- [ ] Új modul: Kanji tanuló / szótár / írás-gyakorló
- [ ] **Ragozó modul: igeállomány bővítése** — jelenleg 14 starter ige, user manuálisan tölti

### V2.0 P2 — Ragozó modul intelligens + adaptív réteg (TELJES)
- [x] **Haladó transzformációk** — Potential / Passive / Causative / Causative-Passive / Volitional ✅
- [x] **MorphemeSplitter** — user input morféma-szintű bontása (stem / suffix + oszlop-beazonosítás) ✅
- [x] **DiffEngine v2** — morféma-szintű diagnózis (renderMorphemeDiff) ✅
- [x] **ErrorClassifier v2** — új hibakódok: morph_wrong_column, morph_wrong_suffix, morph_both_wrong, missing_sokuon, missing_rendaku, partial_match ✅
- [x] **Build mód** — 2 lépcsős stem-pick (Godan: 5-oszlopos a/i/u/e/o mátrix · Ichidan: 1 stem) + suffix-pick curated bank, élő preview, partial credit ✅
- [x] **AdaptiveSelector** — opt-in lobby toggle (`drillSettings.adaptive`), weighted random sampling per-group + per-form a localStorage profile alapján (min. 10 attempt szükséges) ✅
- [x] **HintProvider** — toggle-elhető tipp gomb a card-on (Recognition + Mastery + Build módban), 2 progresszív szint (stem, suffix), −3 pont/szint ✅
- [x] **Profile dashboard** — "📊 Részletek" gomb a stats-bárban, lenyitható panel: csoport- és forma-szintű per-row bar, gyengék rangsorolva, top-3 weakness chip-el, profil-törlés gomb ✅

### V2.3 P2 — Dátum & Idő modul haladó réteg (TELJES)
- [x] **Years** — évek (nyugati naptár + olvasatok), 令和/平成/昭和 imperial calendar ✅
- [x] **Advanced időformátumok** — 24 órás rendszer (13時..24時), 午前/午後 (AM/PM) ✅
- [x] **分 perc-rendszer** — rendhagyó olvasatok (いっぷん, さんぷん, ろっぷん, はっぷん, じゅっぷん) ✅
- [x] **Relative Time** — 前 / 後 / 過ぎ / くらい / 頃 kifejezések ✅
- [x] **Build mód** — `computeBuildParts` morféma-bontás (szám-olvasat + counter), 2 lépcsős ✅
- [x] **AdaptiveSelector + Profile dashboard** — per-kategória súlyozás + bar-list ✅
- [ ] **Pro / Mastery mód** — menetrend-szimuláció, mixed formátumok, 25:00 rendszer (jövő)

### V3 P2 — Hallás & Kiejtés modul haladó réteg (TELJES)
- [x] **Diktálás mód (A–C)** — PLAY → romaji input + `romajiToKana` normalizáló + audio-tudatos `moraDiff` motor + 2-soros mora-diff feedback ✅
- [x] **Audio trap-rendszer (D)** — trap-súlyozott sor: a profil `trapErrors` gyengeségei alapján a gyenge long/short/kis-tsu leckék ~3× gyakoribbak ✅
- [x] **Adaptív replay + sebesség (E)** — hibázott kártya visszasorolása + sok hiba → lassabb playback (`speedPenalty`) ✅
- [x] **Globális audio-injekció (F)** — `NihonCoreAudio.speakAnswer` + MutationObserver minden modul feedback-jén; helpers-bár 🔊 Hang toggle (opt-in) ✅
- [ ] **Achievement-rendszer** — Long Vowel Master, Sokuon Hunter, Native Ear stb. (jövő)
- [x] **Pro mód** — természetes-tempójú hosszabb mondatok, kontextus-hallás. **V6-ban implementálva (2026-05-23)** — Grammar Patterns 30 mondat reuse, context-badge sor, HU teal hint, mora-diff motor mondat-szinten. ✅

### V4 — Statisztika & Dashboard
- [x] **P1 — Adat-alap + Practice History (E)** — `NihonCoreStats` session-log réteg, 6 modul instrumentálva, `stats.html` + History nézet, nav-fül ✅
- [x] **P2 — Dashboard Overview (A) + Activity Engine (B)** — readiness ring (3-komponensű pontszám), napi vitals, heatmap (13 hét), streak, napszak bar + „best time to study" ✅
- [x] **P3 — Module Radar (C) + Analytics Detail (F)** — 6-tengelyes radar + modul drill-down (profil-alapú al-bontás), pontosság-trend + volumen vonaldiagram ✅
- [x] **P4 — Blind Spot Detector (D)** — stratégiai szöveges diagnózis (stale/alacsony pontosság/gyenge al-terület/domináns hiba) + „Célzott gyakorlás" gomb (focus-hint + initFocusBanner univerzális IIFE) ✅
- Chartok: kézzel rajzolt SVG/CSS (nincs külső függőség — user-döntés). **V4 TELJES.**

### Még backlogban (V2.x / V3.x / V5.x)
- [ ] **Melléknév modul: kérdő transzformációs réteg** — `…ですか / …でしたか / …ではありませんか` mint külön formák (nem csak `ka` postfix)
- [ ] **Ragozó modul: igeállomány bővítése** — végleges feltöltés (utolsó lépés, lásd Section 1.1)
- [ ] **Melléknév modul: állomány bővítése** — végleges feltöltés
- [ ] **Dátum & Idő modul: állomány bővítése** — végleges feltöltés
- [ ] **Hallás & Kiejtés modul: állomány bővítése** — végleges feltöltés
- [ ] **Grammar Patterns modul: bővítés** — 15 → ~30–40 minta (N4 teljes + több N3), patternenként több példa (jelenleg 2). Utolsó lépés.

### Backend (külön későbbi update — V2.x)
- [ ] Firebase Auth élesítés (login.html + register.html mock cseréje)
- [ ] Firestore adatmodell: `users/{uid}/conjugation_stats` + `error_logs` + `user_overrides`
- [ ] Adaptív SRS — error trigger (3× egy héten), mastery küszöb (5× 80%)
- [ ] Cloud Function aggregátorhoz (`errorCounts/{errorCode}`)

### Robosztusság
- [ ] Speed Drill / Mastery timer pause Page Visibility API-val (háttér-tab kezelés)
- [ ] localStorage in-progress save (round közbeni reload túlélés)
- [x] **Service Worker → full PWA** — `sw.js` cache-first app-shell + Google Fonts runtime cache; SW auto-register az app.js univerzális szekciójában. **V7 P2 (PWA) implementálva (2026-05-23).** ✅

---

## 12. Memória-fájlok (külön részletes dokumentáció)

A `C:/Users/User/.claude/projects/C--Suli-Word-App-Project-NihonCoreV2/memory/` mappában
részletesebb per-feature dokumentáció van. Ha mélyebbre kell ásni egy specifikus
rendszerben, ott találod:

- `project_overview.md` — magas szintű projekt-leírás
- `project_current_state.md` — aktuális fájl-struktúra részletesen
- `curriculum_structure.md` — JLPT N5/N4/N3 nyelvtani csoportok
- `learning_framework.md` — 3-fázisú tanulási sablon
- `adaptive_logic.md` — hibakategóriák + SRS spec (még nem implementált)
- `v1_3_verb_engine.md` — Arimasu/Imasu modul architektúra
- `v1_4_practice.md` — Mondat-Mester architektúra
- `v1_5_mondat_puzzle.md` — Mondat-Puzzle drag-to-reorder + flexibilis validátor
- `v1_6_counter_module.md` — Számláló Szavak (3 phase + diff engine + fuzzy matching)
- `v5_p1_grammar_srs.md` — ★ V5 P1: Grammar Patterns modul + `NihonCoreSRS` univerzális motor
- `feedback_no_new_files.md` — user kérése: ne hozz létre új fájlokat feleslegesen

---

## 13. Gyors orientáció új session-höz

**1. Először ezt olvasd:** Section 1-2 (mi a projekt, file-struktúra)
**2. Aztán:** Section 7 (konvenciók — DO/DON'T)
**3. Ha új funkción dolgozol:** Section 9 (common patterns) + relevant memory file
**4. Ha bugot keresel:** kód helye Section 3 (app.js belső szerkezete) szerint
**5. Ha designt módosítasz:** Section 8 (design tokenek)
