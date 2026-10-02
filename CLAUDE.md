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
| Számláló Szavak | **12 counter, 102 item** (5 kategória; bugfix dedup után) |
| Ragozó modul | **108 ige** (75 godan + 31 ichidan + 2 irregular; user-bővítés után, bugfix dedup nem volt szükséges) |
| Mondat-Mester | **326 mondat** (152 N5 + 161 N4 + 13 N3) — user N4 batchek: dynamics/change/condition/volition/appearance/permission/transitive |
| Melléknév modul (V2.1) | **109 i-adj** (40 N5 + 39 N4 + 23 N3 + 7 N2/N1) + **40 na-adj** (20 N5 + 12 N4 + 8 N3) — V7 P3 batch 1 + 2026-06-03 bugfix |
| Dátum & Idő modul (V2.3) | **227 elem**: 12 hónap + 31 nap + 7 hétnap + 24 idő + 21×24h (12 sima + 9 AM/PM) + 35 perc + 37 év + 60 relatív (user-bővítés + 2026-06-03 bugfix) |
| Hallás & Kiejtés modul (V3) | **134 audió-lecke** (17 dátum + 18 idő + 23 ige + 20 melléknév + 26 minimal pair + 13 szám + 7 hétnap + 10 kifejezés) + 30 Pro mondat (Grammar reuse) — user-bővítés + 2026-06-03 bugfix |
| Grammar Patterns modul (V5 P1) | 15 sentence-szintű minta (12 N4 + 3 N3), patternenként 2 példa (összesen 30) |
| Kana-tréner (Redesign 6.) | **104 jel / írás** (46 alapjel + 25 zöngés + 33 összetett), hiragana + katakana — zárt, teljes készlet |
| Mini-leckék (Redesign 6.) | **7 lecke** (modulonként egy minta) — a bővítés a végső feltöltés része |

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
├── PRODUCT.md              ← Design-kontextus (kinek, milyen hangon) — az impeccable skill olvassa
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
│   ├── kana.html           ← ★ Redesign 6.: Kana-tréner
│   ├── modules.html        ← ★ Modulok oldal: a modul-kártyák (Szabad gyakorlás) — statikus
│   ├── lesson.html         ← ★ Lecke-oldal: a tanulási út magyarázó lépése (?id=l0…l48, k1…k8)
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
│       ├── grammar.js      ← NIHONCORE_GRAMMAR_PATTERNS (~300 sor)
│       ├── kana.js         ← ★ NIHONCORE_KANA_ROWS / _GROUPS / _CONFUSABLE
│       └── course.js       ← ★ NIHONCORE_COURSE: a leckék magyarázatai, példamondatai, ellenőrző kérdései
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
4. A `pages/modules.html`-ben új modul-kártya `href="újfájl.html"` (a modul-kártyák ott vannak, nem az index.html-ben)
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
    else if (document.getElementById('homeMain'))        initLanding();
    // pages/modules.html (#modulesMain): statikus kártyarács, nincs saját init
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
│   ├── NIHONCORE_PARTICLES              — 11 partikula (a Partikula-kitöltő tálcája)
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
│   └── NIHONCORE_VERBS                  — 108 ige (75 godan + 31 ichidan + 2 irregular)
│
├── adjectives.js (~935 sor — Melléknév modul)
│   ├── NIHONCORE_I_ADJECTIVES           — i-melléknevek (V8 user-bővítés folyamatban)
│   └── NIHONCORE_NA_ADJECTIVES          — na-melléknevek (40+, V7 P3 batch 1)
│
├── counters.js (~260 sor — Számláló Szavak tartalom)
│   ├── NIHONCORE_COUNTERS               — 12 számláló (tsu/nin/mai/hon/satsu/soku/dai/hiki/hai/kai_floor/kai_times/ko)
│   ├── NIHONCORE_COUNTER_CATEGORIES     — 5 főkategória (living/objects/general/drinks/places_events)
│   └── NIHONCORE_COUNTER_ITEMS          — 102 item (counters-review utáni dedup)
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
| `index.html` | csak `core.js` (tanulási út) | ✓ | root |
| `pages/kana.html` | `core.js` + `kana.js` | ✓ | pages/ |
| `pages/lesson.html` | `core.js` + `course.js` | ✓ | pages/ |
| `pages/modules.html` | — | ✓ (csak az univerzális részek: fejléc, fül-sáv, téma) | pages/ |
| `pages/module.html` | ✓ | ✓ | pages/ |
| `pages/practice.html` | ✓ | ✓ | pages/ |
| `pages/conjugation.html` | ✓ | ✓ | pages/ |
| `pages/adjectives.html` | ✓ | ✓ | pages/ |
| `pages/datetime.html` | ✓ | ✓ | pages/ |
| `pages/listening.html` | ✓ | ✓ | pages/ |
| `pages/grammar.html` | ✓ | ✓ | pages/ |
| `pages/production.html` | ✓ | ✓ | pages/ |
| `pages/stats.html` | ✓ | ✓ | pages/ |
| `pages/login.html` | — | ✓ (csak engine; `style.css` + `auth.css`) | pages/ |
| `pages/register.html` | — | ✓ (csak engine; `style.css` + `auth.css`) | pages/ |

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
| **Landing — `.nc-method` eltávolítva** | **(2026-05-28) A user kérésére a „Három lépésben rögzül" (`.nc-method` 3-lépéses módszer-flow + `.nc-facts` pill-sor) szekció TÖRÖLVE** az index.html-ből (instabilitás-jelzés). Teljes revert: HTML-szekció, a `#method` nav + mobil-nav linkek, a `.nc-method*`/`.nc-facts` CSS-blokk, és az `initLanding` reveal-query bővítés mind visszavonva. **A hero frissítései MEGMARADTAK** (pontos N5→N3 / 9 modul / 100% ingyenes statok, furigana-specimen kártya, `nc-hero-rise` belépő). |
| **Bugfix — Mondat-Mester tartalmi review** | **A 2. modul (Mondat-Mester / `NIHONCORE_SENTENCES`) teljes átnézése (2026-05-28).** A user kérésére japán-helyesség ellenőrzés mind a 246 mondatra (152 N5 + 81 N4 + 13 N3 — a user N4 dynamics/change/condition batchei +60). **Javítva:** (1) `s_n4_chg_001` 熱く → **暑く** (időjárás-„meleg" = 暑い, nem a tapintásra forró 熱い; az olvasat azonos: atsuku); (2) `s_n4_cnd_013` の particle `role:'modifier'` → **`'possession'`** (a batch-2-ben már tisztított konvenció szerint); (3) ATM romaji `etiiemu` → **`eetiiemu`** (エーティーエム, 2 helyen). **Megfigyelés (nem hiba):** a user dyn/chg/cnd batcheiben több nem-standard particle-role van (receiver/giver/source/result/means/time/condition…) és pár tokenbe ágyazott partikula (`天気が`, `私の` egy szóként) — a motor ezeket tolerálja (nem crashel), csak a Partikula-mód kontextus-feedbackje lehet rajtuk generikus. Engine/CSS/HTML ÉRINTETLEN. |
| **SW — network-first app-shell** | **A „weboldal instabil" valódi oka: a Service Worker cache-first stratégiája elavult fájlokat szolgált ki (2026-05-28).** Tünet: néha a RÉGI oldal jött be megnyitáskor, néha a friss HTML a régi (cache-elt) CSS-sel párosult → „nem töltött be a CSS az új résznél". **Megoldás:** a saját origin (HTML/CSS/JS) `cacheFirstAppShell` → **`networkFirstAppShell`** csere a `sw.js`-ben: online MINDIG a friss verziót hozza (és frissíti a cache-t), a cache CSAK offline fallback. A Google Fonts + lib-CDN-ek maradnak cache-first runtime; a TTS network-only. `CACHE_VERSION` → v31. **Fontos elv ezután: fejlesztés közben az app-shell network-first** — nem kell minden apró változásnál a cache-re hagyatkozni, de a `CACHE_VERSION` bump továbbra is ajánlott release-nél (az offline-tartalék frissítéséhez + a régi cache törléséhez). Átmenetkor 1-2 hard reload kell, amíg az új SW aktiválódik (skipWaiting + clients.claim). |
| **Bugfix — Ragozó modul review (engine + data)** | **A 4. modul (Ragozó modul / `verbs.js` + engine) bug-fixe (2026-06-02).** A user-bővítés óta a fájl már **108 ige** (75 godan + 31 ichidan + 2 irregular — eredeti 14 starter → 108) 6 új tematikus kategóriával (Ruházkodás / Tranzitív-Intranzitív párok / Yari-Morai / Közlekedés-Testtartás / Időjárás / Állapotváltozás), de egy valódi engine-bug rejtőzött benne. **Kritikus motor-bug:** **`kudasaru` (verbs.js:749) masu-form HIBÁS** — a motor a sima godan-ru szabály szerint `くださり + ます = くださります`-t generálta a helyes `くださいます` helyett. A `NIHONCORE_VERB_EXCEPTIONS`-ben csak `pseudoIchidanGodan` és `irregularTe` típus volt, **nem volt `irregularMasuStem` támogatás**. A user a verb note-jában már jelezte, de a motor nem tudta lekezelni → student wrong Japanese. **Fix:** (a) új **`NIHONCORE_VERB_EXCEPTIONS.irregularMasuStem`** kivétel-tábla a `core.js`-be (verb-id → masu-stem override), kudasaru: `ください/kudasai`. Jövőre felvehető: ossharu/nasaru/irassharu/gozaru (mind ugyanezzel a -aru honorific mintával). (b) **`composeStemSuffix` (app.js:5824)** kibővítve: ha `rule.stemColumn === 'i'` és a verb-id szerepel az új táblában, a stem felülíródik. Csak a masu-családra hat (masu/masen/mashita/masen_deshita), a nai/te/ta/potential/passive/causative/volitional érintetlen (kudasaru azokra szabályos godan-ru). Új mező a morphemes-ben: `irregularStem: true`. **Tipó:** `mieru` note (verbs.js:879) "mirareu" → **`mirareru`** formával. **Pozitív megerősítések:** 0 duplikátum-id, mind a 108 stem (kana+romaji) konzisztens, 6 pseudoIchidan a megfelelő -iru/-eru csapdás godanon (kaeru_g/hashiru/hairu/shiru/kiru_g/suberu), `iku` egyetlen irregularTe ✓. Apró tartalmi furcsaságok (`shinu` example 花が死にます, `hiraku` example ドアが開きます — pedagógiailag a 枯れる ill. あく lenne természetesebb) NEM grammatikai hibák, meghagyva user-döntésre. **Statikus check:** verbs.js brace 216/216, core.js brace 442/442, 108 verb id, motor-fix más igét nem érint (verifikálva: kaeru_g/naru/taberu/suru mind változatlan eredmény). `CACHE_VERSION` → v35. |
| **Bugfix — Számláló Szavak review** | **A 3. modul (Számláló Szavak / `counters.js`) bug-fixe (2026-06-02).** A user-bővítés óta a fájl már **12 counter** (eredeti 7 + 5 új: hiki/hai/kai_floor/kai_times/ko) + **~105 item** (5 új kategóriával), de több valódi bug volt benne. **Kritikus (motor-érintő):** (1) **`hiki` és `ko` counterek egyik kategóriában sem szerepeltek** → 12 item (7 hiki + 5 ko) ELÉRHETETLEN volt a lobby-szűrőn keresztül (motor: `getAllAvailableCounterIds`/`getActiveItems`, app.js 3548–3568). Javítva: `hiki` → `living`, `ko` → `general` kategóriába. (2) **5 duplikált item-id**: `okashi`/`isu`/`kaban` (pure dupes, ugyanaz a primary) → törölve; `tamago` (tsu vs ko) → új átnevezve **`tamago_ko`**-ra (tojás formális); `biiru` (hon vs hai) → új átnevezve **`biiru_drink`**-re (sör pohár). A különböző-primary dupes megtartva mert pedagógiailag értékesek (azonos item két counter alatt — `alternatives` mező MŰKÖDIK, validateHybridAnswer 4095). **Id-tipók:** (3) `pamphretto` → **`panfuretto`** (パンフレット), `hamster` → **`hamusutaa`** (romaji-konvenció), `jiishaku` → **`jishaku`** (dupla `i` típo). **Counter-olvasatok:** mind a 12 counter 1–10 olvasata átnézve — mind helyes (rendaku ぼん/ぼん/ばい/ぞく/がい kontrasztok jól vannak, さんがい vs さんかい explicit kommenttel). **Eredmény:** 12 counter / 5 kategória / **102 egyedi item** (16 tsu + 10 nin + 10 mai + 10 hon + 9 satsu + 8 soku + 11 dai + 7 hiki + 7 hai + 4 kai_floor + 5 kai_times + 5 ko). **Statikus check:** 0 duplikátum, brace 252/252 + bracket 16/16, minden counter szerepel pontosan egy kategóriában. `CACHE_VERSION` → v34. Engine/CSS/HTML ÉRINTETLEN. |
| **Bugfix — Mondat-Mester review újra (merge-collision)** | **(2026-05-28) A user véletlen párhuzamos mentése felülírta a korábbi „Mondat-Mester tartalmi review" javításait → újra alkalmazva + a megnőtt fájl átnézve.** A mentett verzió **326 mondat** (152 N5 + 161 N4 + 13 N3 — a korábbi 246-hoz képest 4 ÚJ N4 szekció: volition/appearance/permission/transitive, 80 mondat). **Újra-javítva:** (1) `s_n4_chg_001` 熱く → **暑く** (időjárás-meleg); (2) ATM romaji `etiiemu` → **`eetiiemu`** (2 helyen); (3) `の` particle `role:'modifier'` → **`'possession'`** (mind a ~20 előfordulás; a motor a `の`-nél CSAK a `possession`-t ismeri — core.js 360). **Új átnézésből (4 új szekció):** (4) 3 további `の` szerep normalizálva possession-re (`'location/modifier'`, `'location marker'`, `'location'` — TRANSITIVE szekció); (5) `s_n4_app_017` 孫子 romaji `'Sonsi'` → **`'Sonshi'`** (Hepburn-konzisztencia, し=shi). **Nem hiba (tolerált):** a nem-`の` partikulák nem-standard szerepei (accompaniment/target/source/means/result/reason/purpose/until…) — a motor generikus feedbacket ad, nem crashel. **Statikus check:** 326 ID, csak word/particle/verb token-típus, brace 2519/2519 + bracket 327/327. `CACHE_VERSION` → v33. Engine/CSS/HTML ÉRINTETLEN. |
| **Bugfix — Melléknév modul review (N2/N1 takarítás)** | **Az 5. modul (Melléknév modul / `adjectives.js`) bug-fixe (2026-06-03).** A user-bővítések után a fájl már **134 i-adj** (40 N5 + 39 N4 + 23 N3 + 25 N2/N1) + 40 na-adj volt — de a 25 elemes N2/N1 szekció súlyosan szennyezett: **(a) 7 duplikált id** ütközött az N3/N4 szekciókkal (`kayui ×2`, `kuyashii ×3`, `kurushii ×2`, `urayamashii ×2`, `mabushii ×2`, `okashii ×2`, `natsukashii ×2`) → SRS/profil stat-ütközés és önmagával-distraktor lehetőség; **(b) 3 wrong-type entry** (i-adj-ként deklarált főnév/na-adj: `kowamote` 強面, `fushiawase` 不幸せ, `uwamukii` 上向き) — a `composeAdj` `stem + い` szabálya nonszensz alakokat generált (`こわもてい`, `ふしあわせい`, `うわむきい`) ÉS a user kártyán helyes japánként mutatva! A note maga is jelezte; **(c) 3 made-up szó** (`kuzushii` 崩しい, `midarashii` 乱しい, `umashii` うましい — nem standard japán; `tsukizukashii` kanji-mismatch 月々しい a 付き付きしい helyett); **(d) 1 id-typo** `tadorashii` → tényleges romaji `tadotadoshii`; **(e) 1 redundáns variant** (`urusai_pestering` = N4 `urusai` ateji-kanji-val). **Kritikus észrevétel:** a motor (`getFilteredAdjectives`, app.js:7784) **nem szűr szintre** → a 25 broken entry mind a tényleges gyakorló-pool-ban volt, NEM dead code. **Fix:** a teljes N2/N1 szekció lecserélve **7 valódi, duplikáció-mentes i-adj-re** — N2: `nikui`, `kudaranai`, `yurusenai`; N1: `hakanai`, `namagusai`, `itawashii`, `tadotadoshii` (id-typo javítva). A `shabui` (szleng/dialektus) elhagyva — curriculum-starter-be nem való. **Eredmény:** **109 i-adj** (40 N5 + 39 N4 + 23 N3 + 3 N2 + 4 N1) + 40 na-adj. **Statikus check** (vm-context tesztelve): 0 duplikátum, brace 298/298, 3 exception (ii/kakkoii/kimochiii) helyesen kezelve `canonicalStemKana: よ/かっこよ/きもちよ`-val, 0 i-adj stem-anomália. `CACHE_VERSION` → v36. Engine/CSS/HTML ÉRINTETLEN. |
| **Bugfix — Dátum & Idő modul review (engine + data)** | **A 6. modul (Dátum & Idő / `datetime.js` + engine) bug-fixe (2026-06-03).** A user-bővítés után a fájl már **227 elem** (12 hónap + 31 nap + 7 hétnap + 24 idő + 21×24h + 35 perc + 37 év + 60 relatív). **Engine-bug:** `diagnoseDt` (app.js:9511-9519) és `dtIrregularErrorCode` (app.js:9526-9533) **hiányzott a `years` kategória ága** → minden irregular év (y2024, y_reiwa1, y_reiwa4, y_heisei1, y_showa64 — összesen 5 darab a fix előtt) `wrong_reading` hibakódot kapott az `irregular_year` helyett, pedig a `NIHONCORE_DT_ERROR_TYPES.irregular_year` szabály (core.js:1045) létezik. **Fix:** mindkét helyen hozzáadva: `else if (card.catId === 'years') errorCode = 'irregular_year'` / `if (card.catId === 'years') return 'irregular_year'`. **Adat-bugok:** (1) **`rel46` 午後過ぎ ごごすぎ** "délután elmúlt (általánosan)" — **NEM standard japán** (a 過ぎ specifikus időponthoz tartozik, nem általános napszak-markerhez); javítva **夕方過ぎ ゆうがたすぎ** "alkonyat után / kora este" valódi kifejezésre. (2) **`y1945` és `y_showa40` téves `irregular: true` flag eltávolítva** — `せんきゅうひゃくよんじゅうごねん` és `しょうわよんじゅうねん` mindenestül szabályos olvasatok (a よんじゅう regular compound, nem よ/し csapda). Az irregular-flag korábbi feedbacket adta volna ("Rendhagyó év-olvasat"), pedig nincs benne rendhagyó. **Pozitív megerősítések:** 0 duplikátum-id (227 mind egyedi), `categoryDataset` mind a 8 kategóriát lefedi, `computeBuildParts` helyesen szűri ki a build-pool-ból a 〜半 időket / native napokat / éveket / relatív / AM/PM-összetetteket (composite: true), minden rendaku/sokuon perc helyes (1/3/4/6/8/10 + tízesei), a よ/し alternáció helyesen jelölt (m4/m7/m9, t4/t7/t9, h14/h17/h19/h24, y_reiwa4, y2024, y_showa64). **Stilisztikai megjegyzés (nem hiba):** a relatív szekció kanji-számjegyeket használ (二時間前), míg a többi szekció arab számokat (1月, 1日) — szándékos, hangulati választás, az engine nem érzékeny rá (csak kana/romaji egyezést néz). `CACHE_VERSION` → v37. CSS/HTML ÉRINTETLEN. |
| **Bugfix — Production modul review (engine)** | **A 7. modul (Production / `initProductionPage` az app.js-ben) bug-fixe (2026-06-03).** A modul saját adat-fájl nélkül van: a Grammar Patterns examples (30) + Mondat-Mester sentences (326) tartalomból merít — 356 mondat összesen. **KRITIKUS engine-bug:** a `getProdSentences` Mondat-Mester ágban (app.js:13321-13341) a `card.kana` mező a `tokens.map(t => t.jp).join('')`-szal volt építve — de a Mondat-Mester `tokens[].jp` mezője **KANJI-mix** ("私", "寿司", "食べます"), nem pure kana. Eredmény: `card.kana` = `"私は寿司を食べます"`. **Cascade-effekt:** a `diagnoseProd` exact-match check (`userNorm === targetNorm`) sosem teljesülhetett pure-kana userinputra, mert a `normJpProd` nem konvertál kanji→kana. **A modul placeholder-szövege** (`pl. あめがふったら、うちにいます。`) pure kanát mutat és tanítja a usert pure kanát írni → **mind a 326 Mondat-Mester mondat broken volt pure-kana userinputra: a tökéletes válasz is 'wrong' verdict-et kapott**. Ugyanakkor a Grammar Patterns oldalon fordított volt a probléma: a `card.kana` pure kana, de a user **kanji-mix beírást sem tudta perfect-re matchelni**. **Fix:** (1) Új helpers: `stripRubyHtml` (Grammar `ex.jp` `<ruby><rt>` tageinek eltávolítása) + `isPureKanaJp` (token jp-mező pure-kana ellenőrző). (2) `getProdSentences` Mondat-Mester ág: külön `kana` (tokenenként — partikuláknál és pure-kana szavaknál `t.jp` direkt, kanji-szavaknál `romajiToKanaProd(t.romaji)`) és `jp` (változatlanul a kanji-mix). (3) `diagnoseProd` perfect-match check elfogadja MIND a `card.kana`-t, MIND a stripped `card.jp`-t targetként; a non-perfect token-diff a közelebbi (kisebb Levenshtein) targetet választja, így kanji-íróknak értelmes diff jár, kana-íróknak pure-kana target. **VM-context teszt-eredmény:** mind a 7 reprezentatív teszt PASS — pure kana → perfect ✓, kanji-mix → perfect ✓, üres → wrong ✓, teljesen rossz → wrong ✓ (Mondat-Mester ÉS Grammar oldalon is). Az összes 326 Mondat-Mester `card.kana` pure-kana ellenőrzése PASS. **Egyéb refaktor:** `PROD_PTS` konstans bevezetve (pontozás-tábla `{ perfect: 16, close: 12, near: 8, far: 4, wrong: 0 }`) — korábban duplikálva volt `finalizeProdCard`-ban és `renderProdFeedback`-ben. **Lobby-hint frissítve:** `'24 mondat (N5-N3 vegyes)'` → `'326 mondat (N5-N3 vegyes)'`. `CACHE_VERSION` → v38. CSS/HTML ÉRINTETLEN. |
| **Bugfix — Grammar Patterns modul review (engine + data)** | **A 8. modul (Grammar Patterns / `grammar.js` + `initGrammarPage` az app.js-ben) bug-fixe (2026-06-03).** **KRITIKUS Translate-mód tokenizer-bug:** a `tokenizePhrases` (app.js:11921) heurisztikus single-particle match-e (`['は','が','を','に','で','と','も','の','へ','や','か']`) gyakran tévesen tördelt szó-belsejében — a 'か' szó-belsejében (さかな, じかん), a 'が' (えいが), a 'で' (です), a 'は' (はやく), a 'の' (もの), a 'に' (にほん) mind false-positive particle-matchet adott. Eredmény: **a 30 grammar-példából 20+ nonszensz fragmentekre tördelődött** — pl. nara ex2 (`さかななら、...`) → `['さか','ななら',...]`; tara ex2 (`じかんがあったら、...`) → `['じか','んが',...]`; to_omou ex2 (`このほんはおもしろいとおもう。`) → `['この','ほんは','おも','しろいと','おも','う','。']`; tsumori ex1 (`らいねんけっこんするつもりです。`) → egy 12-karakteres frag + 'りで' + 'す' + '。'. A Translate-mód puzzle így nagyrészt **megoldhatatlan** volt. **Fix:** (1) **Új `tokens` mező mind a 30 példára** a `grammar.js`-ben — manuálisan, frázis-szinten (`['みずを', 'のみたい', '。']`-stílus). Minden `tokens.join('') === kana` invariáns vm-context-tel ellenőrizve. (2) **Új `exampleTokens(ex)` helper** az `app.js`-ben (`initGrammarPage` closure): először `ex.tokens`-t használja, ha nincs, fallback `tokenizePhrases`-re. A `buildTranslateCardData` mind a helyes-tokenekhez (`correct`), mind a distraktor-source-okhoz (`tryAddFrom`) ezt használja. (3) **Tokenizer fallback szigorítva**: `TRANS_SINGLE_PARTICLES = ['を']` (csak az egyetlen biztonságos single — a 'を' szó-belsejében gyakorlatilag soha nem fordul elő modern japánban). A többi 10 single particle eltávolítva → defense-in-depth, hogy a fallback se generáljon szemetet ha egy jövőbeli új példa kihagyná a `tokens` mezőt. **Cloze-mód bug:** a `<input>` placeholder (app.js:12728) `pl. ${clozeAnswer.slice(0,1)}…` **ingyen mutatta a válasz első karakterét** — pedig a "💡 Tipp" gomb ugyanezt adja −3 pontért. A placeholder trivializálta a fizetős hint mechanizmusát. **Fix:** placeholder generikussá téve: `"hiraganával írd be a hiányzó részt"`. **SRS dashboard bug:** a profil-dashboard SRS box-eloszlás (app.js:12242) `boxLabels[0] = 'Új (1 nap)'` félrevezető volt — a `NihonCoreSRS.INTERVALS_DAYS[0] = 0` (azaz a box 0 azonnal esedékes, nem 1 nap múlva). **Fix:** `'Új / azonnal'`. **VM-context teszt-eredmény:** mind a 30 példa `tokens.join() === kana` ✓; mind a 7 reprezentatív `diagnoseCloze` teszt PASS (match / empty / katakana→hira / typo / wrong_pattern / contrast_confused / wrong_form). **Pozitív megerősítések:** 15 pattern (12 N4 + 3 N3), 30 példa, 11 kategória — mind helyes ✓; minden `contrasts[]` valós pattern-id-re mutat (validálva) ✓; 0 duplikátum-id ✓; minden `clozeAnswer` egyedi pattern-szinten ✓. `CACHE_VERSION` → v39. CSS/HTML ÉRINTETLEN. |
| **Bugfix — Hallás & Kiejtés modul review (engine + globális audio)** | **A 9. modul (Hallás & Kiejtés / `NihonCoreAudio` + `initGlobalAnswerAudio` + `initListeningPage` az app.js-ben) bug-fixe (2026-06-03).** A user-bővítés óta a fájl már **134 audió-lecke** (17+18+23+20+26+13+7+10) + 30 Pro mondat (Grammar Patterns reuse). **Adat-validáció PASS:** 0 duplikátum-id, 0 broken `pairWith` (minden minimal-pair partner valid), 0 érvénytelen `trap` tag. **KRITIKUS bugok:** **(B1+B2) Pro-mód tempó:** a `lessonSpeed()` mindig a tier-speed-et adta (0.75/0.9/1.0×), de a Pro-mód spec szerint MINDIG natural 1.0× alap (mondatnál a tier-lassítás a prozódiát tönkretenné). A feedback-replay (2 helyen: recognition + dictation/pro) `lessonSpeed(c)`-vel hívott — Pro replay 0.75×-en ment volna. Az `adaptiveAfterAnswer` clone (replay-elt kártya) **elveszítette az `isPro: true` flaget**, így a 2.-szor odakerült Pro-kártya is tier-speed-en futott. **Fix:** új `computeLessonSpeed(card)` Pro-aware helper (`card.isPro ? 1.0 : tierSpeed()`); a 3 hívóhelyen csere; a clone `isPro: !!card.isPro` megőrzéssel. **(B3) Globális válasz-felolvasás kanji-duplázás:** a `initGlobalAnswerAudio.findAnswer` a `.pfe-jp-ok` strong `.textContent`-jét vette közvetlenül — de ha a strong belsejében `<ruby>水<rt>みず</rt></ruby>` van (Grammar Patterns feedback gyakran ilyet renderel), a textContent összefűzi: `水みず` → a TTS **kétszer ejti** a kanjit. **Pontosan ez a user által említett kanji-félreolvasás konkrét forrása.** **Fix:** új `extractKanaPreferringText(el)` helper — clone-olja a node-ot, és minden `<ruby>` tag-et lecseréli **csak a `<rt>` (furigana) tartalmára**, így csak a pure-kana olvasat megy a TTS-nek (`みず` mizu). **Speak-regex bővítve:** `[一-龯]` (U+4E00..U+9FAF) → `[一-鿿]` (U+4E00..U+9FFF) — modern ritka kanjik nem esnek ki. **MEDIUM bugok:** **(B4) onError-disable:** a `handleLstAudioError` csak text-fallback-et mutatott, a PLAY/Slow gombok továbbra is kattinthatók (spam-elhető hiba). A spec szerint az onError letiltja a hanggombokat. **Fix:** a fallback megjelenítése MELLETT a `#lstPlayBtn`, `#lstSlowBtn`, `#lstFbReplay` `disabled = true` + `.lst-audio-disabled` class. **(B5) Silent replay-fail:** a feedback `lstFbReplay` `onError: () => {}` — ha a TTS-API kiesik a replay alatt, semmi nem történik (zavart UX). **Fix:** `onError: () => handleLstAudioError(card)`. **(B6) Lobby outdated:** `'a teljes 38-leckés készleten gyakorolsz'` (régi starter-szám) → dinamikus `${countLstPool()}` (most 134). **MINOR:** **(B7)** `lessonSpeed(c)` paramétert ignorált — refaktorálva `computeLessonSpeed(card)`-ra (signature pollution kivédve). **(B8)** `listeningDontKnow` results.push errorCode='dont_know', feedback errorCode='wrong_choice' — inkonzisztens. **Fix:** `errorCode: 'wrong_choice'` + külön `dontKnow: true` flag. **(B10)** `listening.html` `badge-jlpt JLPT N5` → `JLPT N5–N3` (Pro mód N4/N3 mondatokat is használ). **VM-context teszt-eredmény:** speak-regex új-range U+9FD0 és U+9FFF kanji-kat befogadja (régi range NEM); kanji-duplázás: régi `'水みずを飲のみたい'` → új `'みずをのみたい'` (a kanji nem megy TTS-be); Pro-clone `isPro: true` megőrzött; lobby-string dinamikus; listening.html badge frissítve. **CSS-jegyzet:** `.lst-audio-disabled` class hozzáadható később a style.css-be (disabled-gomb halvány stílus); a `disabled` attribútum már így is letiltja a kattintást. `CACHE_VERSION` → v40. CSS opcionális, HTML egyetlen sor (badge). |
| **Redesign 0. fázis — gyors javítások** | **(2026-10-01) A teljes redesign első, önálló lépése.** (1) **Mondat-Mester haladási csík**: a `.round-progress` `margin: 0 auto`-ja a flex-oszlop `.practice-runtime`-ban tartalom-szélességre zsugorította a csíkot (a sáv 0 px volt) → `margin: 0 0 28px`. (2) **Görgetés a körhöz**: új `NihonCoreRound.scrollToRound()` — a `begin()` és a 6 dedikált modul `advance*Card()`-ja + a Mondat-Mester hívja; a Pont/Sorozat sort (`.pr-stats`) a fix fejléc alá görgeti. A module.html fázisainak nincs `.pr-stats` sora → ott no-op. (3) **Mondat-Mester szűrő-bug**: a lobby Funkció-szűrője csak Affirmative/Negative/Question-t ismert, az N4 batchek ~70-féle `metadata.function` címkéje miatt **a 161 N4 mondatból 140 soha nem került elő**. Új `sentenceFunction(s)` a 3 alap-kategóriára képez le; a kártya fejlécén `metaLabel()` magyar címkét ad (a nyers „QUESTION · NON-PAST" helyett). (4) **Halott „Haladásod ezen a modulon 0%" sáv** törölve (module.html + CSS) — semmi nem írta. (5) **Fázisfülek** felirata a `m.phases[n].name/subtitle`-ből jön (`setupPhaseTabs`), a core.js alcímek magyarítva. (6) **Kezdőlap**: verzió-jelvények (`.module-badge`) törölve, az Alap igék kártya a tényleges tartalmat írja le, „-motor"/„free input"/„fuzzy diff" feliratok magyarítva. (7) **Zsargon**: „Drill-paraméterek" → „Állítsd be a kört", „attempt" → „megválaszolt kártya", „Cloze" → „Kiegészítés", „Speed Drill" → „Gyorskör", „Pro listening" → „Pro hallás", verziószámok ki a látható feliratokból. (8) `theme-color` a pages/ oldalakon `#0a0b14` → `#F3EEE3`. `CACHE_VERSION` → v41. **A modul-nevek („Grammar Patterns", „Production modul") NEM változtak** — az a 4. fázis döntése. |

| **Redesign 1. fázis — üveges design-alap** | **(2026-10-01)** Új token-rendszer: **szín-csatornák** (`rgb(var(--x-rgb) / alfa)`), **üveg-tokenek** (`--glass-bg/-strong/-border/-blur/-shadow`), **fix betűméret-skála** (`--fs-2xs`…`--fs-4xl`, 12 px minimum). Szkripttel normalizálva: 358 beégetett régi szín és 427 betűméret tokenre; 129 ragyogás/dísz-színátmenet ki. **Lebegő üveg-fejléc** (`.header`), telefonon **alsó fül-sáv** (`initAppTabbar` → `.nc-tabbar`: Kezdőlap · Modulok · Statisztika · Fiók), a hamburger-menü megszűnt. Téma-gomb egységesen a fejlécben. Sötét téma a csatorna-tokenekből. Belépő oldalak a közös stíluslapra állítva (`auth.css` 655 → 176 sor; a login/register a `style.css`-t IS betölti). **Barba.js eltávolítva** (az index.html-en soha nem aktiválódott, a modul-oldalakon hibára futott) → natív `@view-transition`. Új `PRODUCT.md` (design-kontextus az impeccable skillnek). |
| **Redesign 2. fázis — egységes kör-keret** | **(2026-10-01)** A stíluslap végén álló **KÖR-KERET** blokk minden modul futó körét egységesíti: **kompakt kör-sáv** (✕ · haladás · sorozat · pont; a `.pr-stats` + `.round-progress` `display: contents`-szel egy rácsban), **egy képernyős kártya** telefonon, **alulról becsúszó visszajelzés-lap** (`.conj-feedback` / `.pr-feedback` rögzített; a „Következő" gomb ragadós és fókuszt kap). `initRoundKeys`: **1–9** válasz, **Enter** tovább, **Esc** kilépés. `body.round-active` (NihonCoreRound állítja) rejti a segítők sávot, a fázisfüleket, a fül-sávot és a láblécet. Oldalsávos (side-stripe) keretek ki. |
| **Redesign 3. fázis — lobbi** | **(2026-10-01)** `initLobbyQuickStart`: minden lobbit átrendez (csomópont-mozgatással, a modul-kód érintése nélkül): fejléc → **Mód** → **Indítás** → összecsukott **Testreszabás** (`<details class="lobby-custom">`, állapota: `nihoncore_lobby_custom_open`). Elöl marad a `[class*="mode-row"]`-t tartalmazó vagy `data-lobby-keep` jelű szekció. `NihonCorePrefs.timerOn()`: az **időlimit a beírós módokban kapcsolható, alapból KI** (`nihoncore_timer`). **Gyorskör**: indító képernyő (`drillState.started`), az óra nem indul a fül megnyitásakor. Ragozó kezdő-alapértékek: mindennapi + mozgás-igék, masu-család. |
| **Redesign 4. fázis — kezdőlap + tanulási út** | **(2026-10-01)** Az index.html már nem marketing-oldal: **első alkalommal szintválasztó** (nulláról / a kanát már olvasom), utána **„Folytatás" kártya** a következő lépéssel, alatta a **tanulási út** (13 lépés) és a **Szabad gyakorlás** (modul-kártyák). `NIHONCORE_PATH` (core.js) + `NihonCorePath` (app.js): haladás a `nihoncore_path_v1`-ben (szinkronizálva), aktív lépés a modul-oldal `?step=<id>` paraméteréből, `apply(modul, settings)` a lépés előre beállított körét ülteti a modulra (`only` / `set`), `onSession` (a `recordSession`-ből) dönti el a lépést (**≥ 60% = kész**), a kör végén `.path-result` jelzés visszaúttal. Mondat-Mester: partikula-fókusz (`particlesOnly` / `particlesAny`), és egy körben már nem ismétlődik mondat. |
| **Redesign 5. fázis — feladat-javítások** | **(2026-10-01)** **Nyelvtani minták, Felismerés**: a kártya nem árulja el a választ (nincs kategória és fordítás; a kérdés „Mit fejez ki ez a mondat?"; az opció a jelentés, a minta neve válasz után jelenik meg). **Ragozó, Felismerés**: hibánál `recognitionExplanation` megmondja, mit választottál (másik alak / másik igecsoport / rossz tő), `howItsBuilt` pedig hogyan épül a helyes alak. **Szabad fordítás**: N5 szint + valódi szint-szűrés, **„Az én válaszom is helyes"** gomb (önértékelés), fejlesztői címkék ki. **Hang**: ha a Google TTS-végpont hibázik, a `NihonCoreAudio` a böngésző beépített japán felolvasójára (Web Speech API) vált. A magyarázatok magyarul indulnak. |
| **Redesign 6. fázis — új feladatok** | **(2026-10-01)** **Kana-tréner** (új modul: `pages/kana.html`, `js/data/kana.js`, `initKanaPage`): hiragana + katakana (46 alapjel + zöngés + összetett), **tábla hanggal** és jelenkénti haladás-színezéssel, 4 mód: felismerés · fordítva · beírás · **párosító**; jó válasznál magától lép tovább, hibánál megmutatja, mit választottál; a gyengébb jelek gyakrabban jönnek (`nihoncore_kana_profile_v1`). **Mini-leckék** (`NIHONCORE_LESSONS` a core.js-ben + `initLessons`): „Tanuld meg" panel a lobbi fölött, első alkalommal nyitva. **Minta-készlet: modulonként EGY lecke** — a bővítés a végső tartalom-feltöltés része. |
| **Görgetés-teljesítmény + Modulok oldal** | **(2026-10-01)** **(1) Akadó görgetés javítva.** Az ok: a tartalommal együtt görgő üveg-elemek (`.glass-panel`, `.glass-panel-heavy`, `.glass-card`, `.path-step-link`, `.helpers-bar`, `.phase-tabs`, `.stats-tabs`, összesítő, belépő-kártya) mind saját `backdrop-filter` elmosást kaptak — a kezdőlapon **27 elmosott réteg** volt, amit a böngésző görgetéskor képkockánként újraszámolt a rögzített háttér fölött. Most **elmosás csak rögzített rétegen** van (fejléc + fül-sáv = 2 réteg, kisebb sugárral: `blur(16px) saturate(1.4)`); a görgő panelek „matt üveget" kapnak (`--glass-bg` 0,56 → 0,70 átlátszatlanság — mögöttük úgyis csak a lágy háttér-mezők vannak, ott az elmosás nem látszott). További: a `.bg-decoration` saját, stabil méretű réteg (`translateZ(0)` + `100lvh` + `contain: strict` — telefonon a címsor mozgása nem rajzolja újra), kisebb árnyék-sugarak, a kártya-hover keret-színt vált (nem árnyékot animál), a visszajelzés-lap és a `.path-result` tömör (0,97) elmosás nélkül, a globális `scroll-behavior: smooth` és a `text-rendering: optimizeLegibility` törölve (sima görgetést a JS kér, ahol kell), `prefers-reduced-transparency` támogatás. **(2) Modulok külön oldalon:** új `pages/modules.html` (`#modulesMain`, statikus — nincs saját init) a 10 modul-kártyával; a kezdőlapról a rács kikerült, a helyén egy „Szabad gyakorlás" sor visz az új oldalra. A fejléc „Modulok" linkje és a fül-sáv „Modulok" füle oda mutat; a régi `index.html#modules` horgony átirányít. Az oldal-felismerő a kezdőlapot `#homeMain` alapján ismeri fel. **Közben javítva:** egy régi `a.module-card { display: block }` szabály felülírta a kártyák rács/flex elrendezését (telefonon nem volt meg a tömör sor, tableten a lábléc nem nyúlt ki); a statisztika üres állapotának „Irány a modulok" linkje nem létező oldalra mutatott. `CACHE_VERSION` → v49. |
| **Apróságok (v50)** | **(2026-10-01)** „Grammar Patterns" → **Nyelvtani minták**, „Production modul" → **Szabad fordítás** (oldalcím, kártya, lobbi, statisztika). A profil-, ismétlés- és előzmény-törlés a saját megerősítő lapot használja (`NihonCoreRound.confirmDelete(title, text, onYes)`). A statisztika hibakódjai magyar felirattal jelennek meg (`errorLabel`: a hiba-katalógusok `title` mezője + általános kódok). A statisztika-oldal fejlécében megvan a fő menü. |
| **Második redesign — indigó, térkép, műszerfal** | **(2026-10-02, impeccable skill, product register.)** A user a matcha-paletta helyett **indigót** választott („élénkebb, prémiumabb", simább háttér, szebb/üveges gombok), a tanulási útra **kanyargó térképet** kért, a statisztikára **GitHub-szerű heatmapet**, plusz animációkat. **(1) Színrendszer:** a `--matcha*` tokenek átnevezve **`--brand*`**-re (szerep-név), külön **`--ok*`** zöld a helyes válasznak (56 „correct/ok/success" szabály szkripttel átállítva — indigó fő színnél a jó válasz különben kék lett volna). Új értékek világos és sötét témára; a háttér négy nagy, hosszan kifutó színmező (a pöttyös rács megszűnt). **(2) Gombok:** lakkozott `.btn-primary`, üveg `.btn-outline`. **(3) Betű:** Nunito → **Figtree**; a címek is Figtree 800 (a Lora csak a logóban és a magyar példamondatokban maradt). **(4) Tanulási út — térkép** (`initLanding.renderPath` + a stíluslap „TANULÁSI ÚT — térkép" blokkja): fejezetek (`NIHONCORE_PATH_UNITS` a core.js-ben: `{id, title, sub, steps[]}`), bennük kanyargó ösvény kerek, peremes csomópontokkal; állapotok: kész (kitöltött + zöld pipa), következő (lüktető gyűrű + „Folytatás" címke), átugorva (szaggatott). Koppintásra **buborék** (`.path-pop`): leírás, legjobb kör, indítás. A geometria rögzített (`mapGeom()` az app.js-ben = `--row` / `--disc` a CSS-ben), az összekötő SVG mérés nélkül számolt. A frissen kész lépés animálva jelenik meg (`nihoncore_path_seen_v1` — eszköz-helyi, nem szinkronizált). A „Folytatás" kártya telített indigó, a lépés jele vízjelként. **A fejezetek most témák; a Dekiru-leckékre váltás csak a `NIHONCORE_PATH_UNITS` + `NIHONCORE_PATH` cseréje** (user-döntés: az út a könyv leckéit kövesse — a PDF-re vár). **(5) Statisztika — műszerfal:** 6 fül helyett 4 (Áttekintés · Modulok · Elemzés · Előzmények). Az Áttekintés: telített sorozat-kártya a mai számokkal, **éves aktivitás-naptár** (`heatmapData` 53 hét, hétfő-kezdő; `heatmapHtml`: hónap-feliratok, H/Sze/P sorcímkék, jelmagyarázat, koppintásra a nap részletei; telefonon vízszintesen görög, a legfrissebb hétnél indul), felkészültség-gyűrű, „Mit gyakorolj most?" (a vakfolt-elemzés tételei). A napszak-diagram az Elemzés fülre került; a külön Aktivitás és Vakfoltok fül megszűnt. Karcsú `.page-head` a nagy hero helyett. **(6) Mozgás** („MOZGÁS ÉS FELÜLET-FINOMÍTÁS" blokk): peremes válasz-gombok, kártya-belépés, jó válasz „pattanás" / rossz rázás, modul-kártyák és panelek belépése, számláló-felpörgés (`countUp`). Csak transform/opacity/clip-path, `prefers-reduced-motion` kikapcsolja. `CACHE_VERSION` → v51. |
| **Részletes leckék (v64–)** | **(2026-10-02, user-visszajelzés: „hasznos dolgok vannak leírva a könyvben, amiket részletesen ki kell fejteni a tanulási lépésekben, hogy ne csak egy fos app legyen, hanem egy normális, rendes tanuló" — nem 1:1 átemelés, hanem a könyv tudnivalóinak alapos, saját szavas kifejtése.)** A leckék eddig pontonként egy rövid bekezdésből és 3 példából álltak; a könyv végi **„Nyelvtan" rész** (Dekiru 1: PDF 181–218, utána Függelék 219–233) és a lecke-oldalak megjegyzései (használat, kivételek, táblázatok, kifejezések, kultúra) kimaradtak. **Új lecke-forma** (minden mező nem kötelező, a régi leckék változatlanul működnek): lecke-szinten `intro[]` („Miről szól ez a lecke?"), `dialogue {title, scene, lines[{who, jp, romaji, hu}], notes[]}` (saját párbeszéd, soronként meghallgatható), `phrases[{jp, romaji, hu, note?}]` (kész fordulatok — bekerülnek a kérdés- és hallás-készletbe), `words[{title, note?, items[{jp, romaji, hu, say?}]}]` (koppintható szó-kártyák hanggal), `culture[{title, text}]`; pont-szinten `more[]` (további bekezdések), `tables[{caption, head[], rows[][]}]`, `notes[]` („Jó tudni"), `mistakes[{bad, good, why}]` („Gyakori hiba"). A lecke végén „A lecke egy pillantásra" összefoglaló a mintákból. Megjelenítés: `renderLesson` (`sayRow`, `tableHtml`), a stíluslap LECKE-OLDAL blokkja (`.lp-intro`, `.lp-dialogue`, `.lp-table`, `.lp-notes`, `.lp-mistakes`, `.lp-word`, `.lp-glance`); a magyar szövegbe ágyazott japán szó nem törik ketté (`word-break: keep-all`). **Kész ebben a formában: 1–8. lecke** (leckénként 6–9 pont, 27–40 példa, 20 saját kérdés, párbeszéd, ~10 kifejezés, ~28 szó, 3 kulturális tudnivaló); a többi lecke sorban következik. A szókincs továbbra is a LexiLearn területe: a leckékbe csak a lecke megértéséhez kellő szavak kerülnek. `CACHE_VERSION` → v64 (1–4.), utána adagonként (most: v65). |
| **Kiegészítő leckék + hallás utáni kör (v63)** | **(2026-10-02, user-kérés: a `Japan_anyagok/` többi anyagával egészítsük ki a leckéket, akár új résszel.)** A JLPT N5 / N4 nyelvtani listák és a kezdő nyelvkönyv **csak ellenőrző listaként** szolgáltak (mi hiányzik a Dekiru-leckékből); a szöveg és minden példamondat saját — azok a könyvek sem másolhatók. **(1) Előkészítő lecke `l0`** („Az írás és a kiejtés": három írás, a latin betűs átírás kiejtése magyar szemmel, hosszú hang, kis っ, ん, néma u / i, は・へ・を) az út legelején; `ownOnly: true` → az ellenőrző kör csak a 12 saját kérdésből áll (a tanuló még nem olvas kanát), hallás utáni köre nincs. **(2) Nyolc kiegészítő lecke `k1`…`k8`** (`book: 'Kiegészítő'`): N5 — kötőszavak · mondatvégi partikulák · beszélt rövidítések · hogyan / milyen jól / milyen gyakran (fejezet: `u-k-n5`, a Dekiru 1 összefoglalója után); N4 — közben, éppen, az imént · kívánság és tanács · bizonyosság · szükség és eset (fejezet: `u-k-n4`, a 48. lecke után). A Dekiru-leckék tartalma nem változott: a kiegészítés külön fejezetben áll. **Új lecke-mezők:** `badge` (a fejléc jele a szám helyett), `kicker`, `label` (a „N. lecke" helyett), `ownOnly`. **(3) Hallás utáni kör** a lecke-oldalon (`buildListenRound`, `playListen`; `run.kind`: `check` / `listen`): a lecke saját példamondatai hang alapján, négy magyar jelentésből kell választani; nagy lejátszó gomb + „Lassabban"; a mondat írásban csak válasz után jelenik meg (ha nincs hang, rögtön — így is megválaszolható). Minden leckén elérhető (az előkészítőn nem), a statisztikába `lesson` / `listen` néven megy. **Út:** új lépés-mező `mode: 'listen'` (`href: …?id=l25&round=listen`): a gyakorló lépés nélküli leckék (25, 29, 34, 35, 39–43, 48 és k1–k8) hallás-lépést kaptak → **136 lépés, 53 fejezet**, és már minden leckének van gyakorló lépése. `NihonCorePath.onSession`: a lecke-oldalon a kör azt a lépést teljesíti, amelyik a leckéhez ÉS a kör fajtájához tartozik (`lessonStep`), bármelyik lépésről nyílt az oldal. A lecke magyarázatában az `<i>` kiemelés álló betű (a „nincs dőlt" szabály szerint). `CACHE_VERSION` → v63. |
| **Dekiru 2: 25–48. lecke (v60–v62)** | **(2026-10-02) Elkészült a Dekiru 2 mind a 24 leckéje** (`course.js`: `l25`…`l48`, `book: 'Dekiru 2'`; 129 nyelvtani pont, 388 példamondat, leckénként 10 saját kérdés — saját megfogalmazásban). A tartalomjegyzék a PDF 10–16. oldaláról lett kiolvasva (a lecke-lista a munkamenet-memóriában: `dekiru-lesson-map`). **Út:** 66 → **109 lépés, 51 fejezet**: a Dekiru 1 után az összefoglaló fejezet (`u-next`), majd a 25–48. lecke, a végén „A Dekiru 2 után — Záró gyakorlás" (`u-end`: Nyelvtani minták kiegészítéssel + Pro hallás). **Gyakorló lépések a meglévő készletből:** Ragozó (szándékos, ható, szenvedő, műveltető, műveltető-szenvedő alak; felismerés és beírás), Mondat-Mester N4 (feltételes, érzékelős, látszatot kifejező mondatok), Nyelvtani minták felsorolt mintákkal. **10 leckének csak magyarázó lépése van** (25, 29, 34, 35, 39–43, 48): ezekhez nincs illő gyakorló készlet — a bővítés tartalom-feltöltés. **Új út-beállítás:** Nyelvtani minták `patterns: [minta-azonosítók]` — a kör pontosan ezekből áll; a `initGrammarPage` `pathPatterns` zárványa olvassa a lépésből, a mentett beállításokat nem írja át. **Kezdőlap:** a „Folytatás" kártyán új **„Mutasd a térképen"** gomb (`.continue-jump`) a következő lépés csomópontjához görget — a térkép telefonon már ~24 000 px magas. Saját kiegészítések a könyv listájához (hogy a leckék kerekek legyenek): 〜と言っていました (34.), sorrend-szavak (37.), különleges tiszteleti és szerény igék (38–39.), 〜というのは (41.), egyetértés / ellenvetés fordulatai (42.), a beszéd váza (44.), 〜のは…からです (47.), köszönet és búcsú (48.). `CACHE_VERSION` → v60 (25–32.), v61 (33–40.), v62 (41–48.). |
| **Leckék 17–24: a Dekiru 1 teljes (v59)** | **(2026-10-02) Elkészült a Dekiru 1 17–24. leckéje** (`course.js`: `l17`…`l24`; 45 új nyelvtani pont, 139 új példamondat, leckénként 10 saját kérdés — saját megfogalmazásban). Címek: Szabad és tilos · Készülődés · Úton · Városnézés · Minden készen áll · Szívességek · Udvarias kérések · Búcsú. **Út:** 48 → **66 lépés, 26 fejezet**; az új gyakorló lépések: Mondat-Mester az N4-es mondatokból (tilalmak, 〜なります, igepárok を/が partikulával, szívességek, tárgyatlan igék), Ragozó (ない beírva; az igepárok alakjai és て-alakja; az adás-kapás igéinek て-alakja), Nyelvtani minták (szabad / tilos / kell). Az utolsó fejezet: „A Dekiru 1 után — Összefoglaló gyakorlás" (hallás, minták, szabad fordítás). A 19. lecke a 〜なければなりません mellé a párját, a 〜なくてもいいです-t is tanítja (a Nyelvtani minták lépés mindkettőt kérdezi). Kódváltozás nincs, csak adat. `CACHE_VERSION` → v59. |
| **Leckék 9–16 + Mondat-Mester javítások (v58)** | **(2026-10-02) A Dekiru 1 9–16. leckéje kész** (`course.js`: `l9`…`l16`; 46 új nyelvtani pont, 143 új példamondat, leckénként 10 saját kérdés — saját megfogalmazásban). Címek: Milyen volt? · Melyik a jobb? · Mit tegyek? · Barátok között · Ajándék · Tervek és vélemények · Találkozunk? · Hobbi és tapasztalat. **Út:** 29 → **48 lépés, 18 fejezet**; a 9–16. lecke gyakorló lépései: Melléknév múlt idő, Ragozó (て felismerés → て beírás → ない/た → rövid alakok beírva → adás-kapás igéi), Nyelvtani minták (vágy/vélemény/szándék), Mondat-Mester az N4-es mondatokból. A `verb-forms` lépés azonosítója megmaradt (a 11. leckébe került, ない + た). Az utolsó fejezet most „A 17. leckétől". **Új út-beállítás:** Mondat-Mester `ids: [mondat-azonosítók]` — a kör pontosan ezekből áll, és a teljes készletet végigveszi (max. 10). **Három régi Mondat-Mester hiba javítva** (az N4 lépések tesztje hozta elő): (1) **Mondat-Puzzle**: a validátor egyetlen, mondatvégi igét feltételezett, ezért az összetett állítmányú mondatoknál (行く つもりです · 撮って も いいですか · 行った こと が あります) **a helyes sorrendet is hibásnak ítélte — a 161 N4 mondatból 97-nél**. Most az eredeti sorrend mindig helyes; összetett állítmánynál az első igétől a mondat végéig kötött a sorrend, előtte a „szó + partikula" egységek cserélhetők (új hibakód: `predicate_order`). (2) **Partikula-kitöltő**: a tálcán csak 9 partikula volt, így a から / まで / か / ね / よ / なら / でも partikulát kérő mondatok (24 db) megoldhatatlanok voltak (az Ellenőrzés gomb sosem élesedett). A **から és a まで felkerült a tálcára** (`NIHONCORE_PARTICLES`: 9 → 11); a többi ilyen mondat és a partikula nélküli mondatok kimaradnak a partikula-módból (`particleSolvable`). (3) A lobbi mondatszámlálója módváltáskor is frissül. `CACHE_VERSION` → v58. |
| **Szöveg-erősítés (v57)** | **(2026-10-02, user-visszajelzés: a kérdések és a magyarázatok szövege „vékony és csúnya".)** Az alap betűsúly 400 → **500**; a talpas Lora megszűnt (`--font-serif` = Figtree, a betű-linkből is kikerült); **minden dőlt betű álló lett** (26 szabály: romaji, magyar glosszák, fordítások); a másodlagos szöveg sötétebb (`--sumi-soft`, `--sumi-faint`). A stíluslap végén új **SZÖVEG-ERŐSÍTÉS** blokk: kérdések (`.kana-task`, `.lq-question`, `.prc-translation`) vastagok és nagyobbak, a visszajelzés magyarázó sorai (`.pfe-row`, `.pfe-text`) alapméretűek, teljes kontraszttal. A `--font-jp` lánc élén Figtree áll, így a japán szövegbe ágyazott latin betű és szám is a UI-betűvel jelenik meg. `CACHE_VERSION` → v57. |
| **Japán betű mindenhol: Noto Sans JP (v56)** | **(2026-10-02, user-döntés: „MINDENHOL EZ LEGYEN".)** A `--font-jp` token Noto Serif JP → **Noto Sans JP**; mind a 15 HTML betű-linkje a Sans változatot tölti (a Serif kikerült). Érinti a kana-táblát, a térkép jeleit, a kártyákat és minden modul mondatait. `CACHE_VERSION` → v56. |
| **Lecke-oldal: olvashatóbb japán betű (v55)** | **(2026-10-02, user-visszajelzés: a példák kanái „elég nehezen olvashatóak".)** A lecke-oldal japán mondatai (példák, kérdések, válaszok, visszajelzés) a talpas Noto Serif JP helyett **Noto Sans JP**-vel jelennek meg (új `--font-jp-text` token; `.lesson-main [lang="ja"]`). A magyar szövegbe ágyazott japánnál a latin betű Figtree marad. A modulok mondatai egyelőre a régi betűvel mennek (a user döntésére vár, kiterjesszük-e). `CACHE_VERSION` → v55. |
| **Lecke: több kérdés + bevezetés a gyakorlásba (v54)** | **(2026-10-02, user-visszajelzés: „5-nél több legyen egy leckében, és a gyakorlásba is be kell vezetni".)** **Kérdéskészlet:** leckénként 5 → **10 saját kérdés**, és a kör mellé a példamondatokból **készített fordítós kérdések** jönnek (japán → magyar „Mit jelent?", magyar → japán „Melyik a japán mondat?"; az elterelők előbb ugyanabból a nyelvtani pontból jönnek). Egy kör **10 kérdés** (`ROUND`; ebből `OWN_PER_ROUND` = 6 saját), minden kör más — leckénként 34–54 különböző kérdés fordulhat elő (`buildRound`, `generatedQuestions`, `pickOthers` az `initLessonPage`-ben). **Gyakorlás a leckéből:** a lecke alján új „Gyakorlás" szekció a fejezet gyakorló lépéseivel (`practiceRows()` a `NIHONCORE_PATH_UNITS`-ból; állapot és „Indítás"), és az ellenőrző kör eredményénél a fő gomb a következő, még nem teljesített gyakorló lépést indítja („Gyakorlás: …"); ha mind megvan: „Tovább az úton". A lecke-oldalon a tanulási út lebegő `.path-result` jelzése nem jelenik meg (az összesítő vezet tovább). `CACHE_VERSION` → v54. |
| **Leckék 1–8 (v53)** | **(2026-10-02) A tanulási út a Dekiru 1 leckéit követi; az 1–8. lecke kész.** User-döntés: az út a könyv leckéire épüljön, leckénként magyarázattal; a forrás a `Japan_anyagok/` (gitignore-olt) PDF-ek. **A könyv szövege nem kerül át** (az impresszum tiltja): a magyarázatok és a példamondatok saját megfogalmazások, csak a leckék témája, sorrendje és nyelvtani pontjai követik a könyvet. **Új oldal:** `pages/lesson.html?id=l1…l8` + `initLessonPage` + `js/data/course.js` (`NIHONCORE_COURSE`: leckénként `title/lead/cando/points[]/quiz[]`; pont = `title, sub, pattern, body, examples[{jp,romaji,hu}], tip`). Japán szöveg: 1–4. lecke kana szóközökkel; 5-től kanji `{漢字|かな}` jelöléssel → a képernyőn furigana, a felolvasáshoz kana. Minden példa meghallgatható (`NihonCoreAudio.play`). **„Ellenőrizd magad"**: leckénként 5 feleletválasztós kérdés a közös kör-keretben; válasz után mindig „Miért?" magyarázat. A kör `lesson` / `check` néven megy a statisztikába, és ≥60%-nál teljesíti a lecke lépését. **Út-adatok** (`core.js`): egy fejezet = egy lecke (`kicker`: „Dekiru 1 · N. lecke"), minden lecke egy `lesson` lépéssel indul, utána a leckéhez illő gyakorló lépések a meglévő modulokból. **Új út-beállítások:** Mondat-Mester `idRanges` (az `s_n5_NNN` mondatok tartománya — a 2–3. lecke a meglévő mutató- és hely-mondatokat kapja), Számlálók `counters` (4. lecke: つ・本・枚・冊), Alap igék `category` (3.: létezés · 5.: mozgás · 6.: fogyasztás); a `module.html` út-lépésnél rögtön a 2. (gyakorló) fázist nyitja. A 9. leckétől a régi tematikus lépések az utolsó fejezetben állnak. **Nyitva:** 9–24. lecke; a 7. leckéhez (〜が好き, から, gyakoriság) nincs célzott mondatkészlet, csak a が-os mondatok. `CACHE_VERSION` → v53. |
| **Finomhangolás (v52)** | **(2026-10-02, user-visszajelzés.)** **Világos téma:** a fehér visszafogottabb (`--washi` #F3F5FB → #E9EDF6, az üveg anyaga 246 248 253). **Sötét téma:** kevésbé fekete alap, jobban elváló panelek, a telített felületek mély indigóból indulnak (új `--brand-fill-top` / `--brand-fill-deep` tokenek — korábban a világos szöveg-indigóból, ezért pasztellnek hatottak); a naptár-szintek sötétben a világos felé erősödnek. **Logó:** a „日" kanji helyett PNG-ikon (`img/logo.png`), a felirat Sora betűvel. **Görgetősáv:** egységes, témát követő sáv minden oldalon; az éves aktivitás-naptár asztali gépen görgetés nélkül kifér (a cella mérete a kártya szélességéből számol: `container-type` + `cqw`), telefonon sáv nélkül húzható. |

### 🔴 Redesign 2026-10 — user-döntések (ezekhez mérj minden további UI-munkát)

- **Célközönség:** nulláról induló ÉS kanát már olvasó kezdő, első indításkor szintválasztóval.
- **Vizuális irány:** **indigó paletta** (user-választás 2026-10-02: a matcha/zen színek nem tetszettek; „élénkebb, prémiumabb", simább háttér, szebb és üveges gombok), a felületek **üvegesek** (glass panelek + lebegő navbar), az app **nagyon telefon- és tabletbarát**, **app-szintű** érzettel (térképes tanulási út, animációk).
- **Tartalom iránya:** a tanulási út a **Dekiru-leckéket** kövesse, leckénként magyarázattal. A user odaadja a könyv PDF-jét (`C:\Projekts\Word_App_Project\dekiru\` — a repón KÍVÜL). **A könyv szövegét nem másoljuk:** saját szavas magyarázat és saját példamondatok készülnek a leckék témái alapján, a PDF nem kerül a nyilvános repóba.
- **Szerkezet:** vezetett tanulási út a kezdőlapon „Folytatás" gombbal + a modulok „Szabad gyakorlás"-ként — **a modul-kártyák külön oldalon** vannak (`pages/modules.html`), nem a kezdőlapon (user-kérés, 2026-10-01).
- **Görgetés:** a simaság elsőbbséget élvez a látvánnyal szemben — **elmosás (`backdrop-filter`) csak rögzített rétegen** lehet (user-panasz: „szétlaggolja magát görgetésnél").
- **Utólagos kiegészítések (2026-10-01):** szó–jelentés **Párosító** az igékhez, melléknevekhez és dátumokhoz (`[data-match-launcher]`, a szókártya-adapterekből) · **kilépés-megerősítő lap** a natív `confirm()` helyett (`NihonCoreRound.confirmExit`; a modulok kezelői változatlanok) · **`window.NihonCoreStats` / `NihonCoreAudio` / `NihonCoreSRS`**: top-level `const`-ként nem voltak a `window`-n, ezért a V18 részmentés (`NihonCoreRound.flush`) **soha nem futott le** — most tényleg mentődnek a félbehagyott körök · **Számlálók 2–3. fázis**: a „Következő" a felismerő-kártyát rajzolta, a kör az első kártya után elakadt (javítva).
- **Nyitva maradt:** a „Grammar Patterns" és a „Production modul" **neve** (user-döntés) · a profil-törlések még natív `confirm()`-ot használnak · a statisztika hibakódjai még nyersen jelennek meg („fő hiba: wrong form").
- **Ellenőrzés szerver nélkül:** a vizuális és funkcionális ellenőrzés fej nélküli böngészővel (Edge vagy Chrome) történik a helyi fájlokon (`file://`), preview-szerver és localhost nélkül.
- **Ág:** a redesign a `main`-en van és élesítve lett (2026-10-01); a `redesign-2026-10` ág lezárult.

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
- ✅ **Indigó UI + dual-téma** — indigó/arany paletta üveges felületeken · `html.theme-sumi` sötét mód · anime.js mikro-interakciók · natív view-transition oldalváltás · PWA install/update toast
- ✅ **Kana-tréner (Redesign 6.)** — `kana.html` · hiragana + katakana · tábla hanggal · felismerés / fordítva / beírás / párosító
- ✅ **Tanulási út — Dekiru-leckék szerint** — `NIHONCORE_PATH` + `NIHONCORE_PATH_UNITS` + `NihonCorePath` · 136 lépés 53 fejezetben (előkészítő lecke + kana · Dekiru 1: 1–24. lecke · összefoglaló · N5 kiegészítő · Dekiru 2: 25–48. lecke · N4 kiegészítő · záró gyakorlás) · kanyargó térkép · szintválasztó · „Folytatás"
- ✅ **Lecke-oldal** — `lesson.html` + `js/data/course.js` + `initLessonPage` · 57 lecke (előkészítő + Dekiru 1 és 2 + 8 kiegészítő), 320 nyelvtani pont, 975 saját példamondat hanggal · hallás utáni kör a lecke példáiból · 10 kérdéses ellenőrző kör (leckénként 10 saját kérdés + a példákból készített fordítós kérdések) · a lecke végén a fejezet gyakorló lépései
- ✅ **Mini-leckék (Redesign 6.)** — `NIHONCORE_LESSONS` + `initLessons` · modulonként egy minta-lecke

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

A keretet a stíluslap végi **KÖR-KERET** és **LOBBI** blokk, valamint az app.js univerzális IIFE-i adják. Új modulnál elég a meglévő osztályneveket használni.

1. **Fejléc**: lebegő üveg-sáv. Bal: logó · közép: modul-név (`.nav.module-page-nav`, JS tölti) · jobb: `Bejelentkezés`, téma-gomb (JS injektálja), 🏠 `.btn-home`. Telefonon (< 768 px) a navigáció az **alsó fül-sávban** van (`initAppTabbar`: Kezdőlap → `index.html`, Modulok → `pages/modules.html`, Statisztika, Fiók).

2. **Modul-fejléc** (`.module-hero`): lobbiban látszik, **kör alatt rejtett** (`classList.add('hidden')` indításkor, `remove` visszatéréskor). Az újra-megjelenése jelzi a kör-őrnek a kilépést.

3. **Lobbi** (`.conj-lobby` / `.practice-lobby` / `.ms-lobby` / `.cnt-lobby`): a szokásos sorrendben rendereld (`.lobby-header`, `.lobby-section`-ök, `.lobby-stats`, `.ml-start` gomb). Az `initLobbyQuickStart` magától átrendezi: Mód → Indítás → Testreszabás. A módválasztó sor osztályneve tartalmazza a `mode-row`-t; ami még elöl maradjon, kapjon `data-lobby-keep`-et.

4. **Kör-sáv**: a HTML-ben `.pr-stats` (2 × `.pr-stat`: Pont, Sorozat + `.round-exit`) és utána `.round-progress` (`.round-progress-text` + `.round-progress-bar > .round-progress-fill`); a CSS egyetlen sorba rendezi. A futó kör tárolója `.conj-runtime` (vagy `.practice-runtime`).

5. **Kártya**: `.conj-card` (vagy `.pr-card`), benne `.cj-prompt`, `.cj-options > .cj-option` (2×2 rács; `correct` / `wrong` / `reveal-correct` állapot), `.dont-know-btn`. Beírós módnál a beküldés a `.conj-actions`-ben van (ragadós).

6. **Visszajelzés**: `.conj-feedback` (vagy `.pr-feedback`) a kártya TESTVÉRE (nem üveg-panelen belül!) → rögzített alsó lap. Állapot-osztály: `pr-fb-correct` / `pr-fb-wrong` / `pr-fb-dontknow`. Tartalom: `.pr-fb-header`, `.pr-fb-explain > .pfe-row` (`pfe-correct` / `pfe-wrong` / `pfe-context` / `pfe-rule`), a végén `.btn.btn-primary` (Következő). A helyes japán válasz `.pfe-jp-ok`-ban legyen (ezt olvassa fel a hang).

7. **Kör-életciklus**: indításkor `NihonCoreRound.begin(snapshotFn)`; lapozáskor `NihonCoreRound.scrollToRound()`; a végén `NihonCoreStats.recordSession({...})` (ez zárja a kört és értesíti a tanulási utat). Kilépésnél a megerősítő szöveg: az eddigi válaszok elmentődnek.

8. **„Nem tudom" gomb**: minden feleletválasztós és beírós kártyán `<button class="dont-know-btn">`; felfedi a helyes választ, nem-helyesként számít, a visszajelzés fejléce semleges (`markDontKnowFeedback()` vagy `pr-fb-dontknow`).

9. **Billentyűk**: az `initRoundKeys` adja (1–9, Enter, Esc) — ehhez az opciók osztálya `.cj-option` / `.cnt-option` / `.sd-option` / `.mc-choice` legyen.

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

## 8. Design tokenek (style.css :root) — ★ INDIGÓ PALETTA, ÜVEGES FELÜLETEK

> A paletta japán indigó (藍) gyöngyfehér alapon, arany kiemeléssel (user-választás, 2026-10-02);
> a felületek üvegesek: áttetsző, lebegő panelek a sima színmezős háttér fölött.
> **A token neve a SZEREPÉT mondja, nem a színét** — új paletta = csak a `:root` értékei változnak.
> **Nincs neon-ragyogás, nincs színátmenetes szöveg, nincs oldalsávos (side-stripe) keret.**
> A design-kontextus (kinek, milyen hangon) a `PRODUCT.md`-ben van.

```css
/* Szín-csatornák — MINDEN áttetsző szín ezekből: rgb(var(--x-rgb) / alfa) */
--tint-rgb   (meleg tinta: halvány töltés, keret)     --shade-rgb  (árnyék, fátyol)
--glass-rgb  (az üveg anyaga)                          --brand-rgb / --ok-rgb / --gold-rgb / --verm-rgb / --amber-rgb / --indigo-rgb

/* Paletta — szerepek */
--washi #E9EDF6 (háttér — szándékosan nem vakító fehér) · --washi-deep · --washi-soft · --washi-edge
--sumi #171C2E (szöveg) · --sumi-soft · --sumi-faint (5:1 — a legkisebb szövegnek is elég)
--brand (FŐ SZÍN, indigó: felület, keret, kijelölés) · --brand-deep (SZÖVEG) · --brand-soft
--ok (HELYES válasz, zöld) · --ok-deep (SZÖVEG) · --ok-soft      ← nem a fő szín!
--gold-trad (arany kiemelés) · --gold-ink (arany SZÖVEG) · --amber / --amber-ink (figyelmeztetés)
--vermilion (hiba) · --indigo (info — türkiz; a név régi, a szerep „info")
--accent / --accent-hover / --on-accent   (elsődleges gomb)
--brand-fill-top / --brand-fill-deep   telített felület színátmenetének teteje és alja (gomb, „Folytatás" kártya,
                                       kész csomópont). Sötét témában mély indigó — NEM a világos szöveg-indigó (--brand).
--teal / --green   régi aliasok a --brand-re (ne használd új kódban)

/* Üveg */
--glass-bg         görgő panel (kártya, lobbi): matt üveg, ELMOSÁS NÉLKÜL
--glass-bg-strong  rögzített réteg (fejléc, fül-sáv, menü)
--glass-blur       elmosás — CSAK rögzített (position: fixed) rétegen
--glass-border · --glass-shadow · --glass-shadow-lg
--glass-fill / --glass-fill-edge   beágyazott blokk töltése (NEM újabb elmosás!)

/* Tipográfia: fix skála, 12 px alatt nincs szöveg */
--fs-2xs 12 · --fs-xs 13 · --fs-sm 14 · --fs-base 16 · --fs-md 18 · --fs-lg 20 · --fs-xl 24 · --fs-2xl 32 · --fs-3xl 40 · --fs-4xl 48
--font-body Figtree (UI, címek, folyószöveg; alap betűsúly **500**; --font-display = ugyanez) · --font-logo Sora (csak a „NihonCore" felirat) · --font-jp Figtree + **Noto Sans JP** (MINDEN japán szöveg; a latin betű Figtree) · --font-serif / --font-jp-text: régi nevek, ugyanezekre mutatnak. **Nincs talpas és nincs dőlt betű** (user-döntés: vékonyak és nehezen olvashatók voltak) — ne állítsd vissza.

/* App-váz */
--nav-h · --nav-gap · --header-h (a tetején lefoglalt hely) · --tabbar-h · --tabbar-space · --page-pad · --touch (44 px)
--radius-sm 10 · --radius-md 16 · --radius-lg 24 · --radius-xl 32
--t-fast 120ms · --t-base 160ms · --t-slow 220ms (csak ease-out) · --ease-out
```

**Szabályok**
- **Új színt csak tokenből.** Áttetsző szín: `rgb(var(--tint-rgb) / 0.08)` — soha ne beégetett `rgba(…)`, mert az nem követi a sötét témát.
- **Fő szín ≠ helyes válasz.** Gomb, kijelölés, haladás: `--brand*`. Jó válasz, siker, „kész": `--ok*`. Ha egy új szabály `correct` / `ok` / `success` állapotot színez, az `--ok*` tokent használja.
- **Egy telített felület képernyőnként** (indigó színátmenet, fehér szöveg): a kezdőlapon a `.continue`, a statisztikában a `.st-hero`. Több ne legyen: ettől marad kiemelés.
- **Gombok:** `.btn-primary` = lakkozott indigó (felül fény, alul színes árnyék) · `.btn-outline` = üveg-gomb · `.btn-ghost` = csak szöveg. Lenyomható elem (térkép-csomópont, válasz-gomb): alsó „perem" (`box-shadow: 0 Npx 0`), lenyomva `translateY`.
- **Szövegszín kontrasztja:** fő szín szövegként `--brand-deep`, zöld szöveg `--ok-deep`, arany szöveg `--gold-ink`, borostyán `--amber-ink` (az alapszínek washi-n nem érik el a 4,5:1-et).
- **Üveg csak lebegő rétegre** (`.glass-panel`, `.glass-panel-heavy`, `.glass-card`, fejléc, fül-sáv, lapok). **Üvegen belül ne legyen újabb üveg** — beágyazott blokk: `--glass-fill`.
- 🔴 **Elmosás (`backdrop-filter`) CSAK rögzített rétegen** (`.header`, `.nc-tabbar`). A tartalommal együtt görgő elemre **tilos** tenni: a böngésző görgetéskor minden képkockán újraszámolja, és akad az oldal (ez volt a 2026-10-01-es görgetés-hiba oka: 27 elmosott réteg a kezdőlapon). Görgő panel = `--glass-bg` áttetsző töltés, elmosás nélkül. Kerüld a `box-shadow` animálását nagy kártyán (hover: keret-szín vagy `transform`), és a `will-change`-et állandó szabályban. `backdrop-filter`-es szülőn belül a `position: fixed` gyerek a szülőhöz rögzül!
- **Betűméret csak a skáláról** (`var(--fs-*)`); a japán dísz-glyph-ek `clamp()`-ben maradhatnak.
- **Érintési célpont ≥ 44 px**, beviteli mező betűmérete ≥ 16 px (iOS nem nagyít rá).
- **Töréspontok:** telefon ≤ 599 · tablet 600–1023 · asztali ≥ 1024; a navigáció 768-nál vált (alatta alsó fül-sáv). Telefon az első: az alap-szabály a telefonos, a `min-width` média-lekérdezés bővít.
- **Dual-téma:** `html.theme-sumi` csak a csatornákat és a paletta-tokeneket cseréli (plusz néhány felület-finomítás a blokk alatt).
- **Logó:** `<img class="logo-mark" src="…/img/logo.png">` (indigó ikon torii-kapuval és felkelő nappal, 192 px, átlátszó) + `.logo-text` Sora betűvel. A régi „日" kanji-jel megszűnt.
- **Görgetősáv:** egységes, vékony, lekerekített (a stíluslap elején: `::-webkit-scrollbar*`, Firefoxon `scrollbar-color`). Ahol a sáv zavarna (aktivitás-naptár, fül-sáv), `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`.

**A stíluslap rétegei:** alap (tokenek, váz) → modulok régebbi szabályai → a fájl VÉGÉN a közös rétegek, ebben a sorrendben: **KÖR-KERET**, **LOBBI**, **KANA**, **MINI-LECKE**, **TANULÁSI ÚT — térkép**, **STATISZTIKA — műszerfal**, **MOZGÁS ÉS FELÜLET-FINOMÍTÁS**, **LECKE-OLDAL**, **SZÖVEG-ERŐSÍTÉS**. A végső blokkok felülírják a modulok korábbi futásidejű szabályait — közös viselkedést oda írj, ne a modul-szekcióba.

---

## 9. Common patterns referencia

### Új modul hozzáadása
1. Új rekord a `data.js NIHONCORE_MODULES`-ba (verb-engine vagy counter-engine config)
2. Új kártya a `pages/modules.html`-ben hivatkozással `module.html?id=ÚJ_ID`
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

### 🔴 Leckék — a jelenlegi fő munka (user-döntés, 2026-10-02)

A tanulási út a Dekiru-tankönyvek leckéit követi. **Kész: a Dekiru 1 (1–24.) és a Dekiru 2 (25–48.) minden leckéje.** Nyitva:
- [x] **9–16. lecke** (v58).
- [x] **17–24. lecke** (v59).
- [x] **Dekiru 2, 25–48. lecke** (v60–v62).
- [x] **Előkészítő lecke + 8 kiegészítő (JLPT N5 / N4) lecke + hallás utáni kör** (v63). A `Japan_anyagok/` szólistái (igék, főnevek) és a Heisig-féle kanji-könyv nincs felhasználva: a szókincs és a kanji a LexiLearn területe.
- [ ] 🔴 **Részletes leckék** (user-kérés): az 1–8. lecke kész az új, részletes formában; **a többi lecke és a kiegészítők még a régi, rövid formában vannak** — sorban át kell írni őket (forrás: a könyvek „Nyelvtan" része és a lecke-oldalak megjegyzései; saját szavakkal, saját példákkal).
- [ ] Az N4-es listából kimaradt apróságok: 〜てやる, 〜と言ってもいい, a 〜ということ főnevesítő.
- [ ] A leckék japán mondatait anyanyelvi lektor nem látta: a végső tartalom-ellenőrzés része.
- [ ] A térkép 136 csomóponttal hosszú; ha zavaró, a kész fejezetek összecsukása lehet a következő lépés (a user dönt).
- [ ] Leckénként célzott mondatkészlet a Mondat-Mesterhez: saját mondata a 2–3., a 12–18., a 20., a 22., a 24., a 26., a 28., a 31. és a 33. leckének van; a többinél a Ragozó, a Melléknév és a Nyelvtani minták modul gyakoroltat, 10 Dekiru 2 leckének és a kiegészítő leckéknek pedig a hallás utáni kör a gyakorló lépése (25, 29, 34, 35, 39–43, 48, k1–k8). Ez tartalom-feltöltés, a user dönt róla.
- [ ] A Partikula-kitöltő tálcáján nincs か / ね / よ / なら / でも: az ilyen mondatok (13 db) csak puzzle-módban jönnek elő.
- Új lecke felvétele: `js/data/course.js` (szöveg) + `js/data/core.js` `NIHONCORE_PATH` (lépések) és `NIHONCORE_PATH_UNITS` (fejezet). Kódot nem kell írni hozzá.
- A leckék nyelvtani pontjainak listája a munkamenet-memóriában van (`dekiru-lesson-map`); a PDF-ek szkenneltek, oldalanként képként olvashatók.

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
