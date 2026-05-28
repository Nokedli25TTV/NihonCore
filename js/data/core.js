/* ====================================================
   NIHONCORE — core.js (központi config + engine-szabályok)
   ----------------------------------------------------
   Ide kerül minden, ami NEM tartalom (szavak/mondatok),
   hanem a moduloknak közös engine-meta: modul-leírások,
   ragozási mátrixok, hibakód-szótárak, kategória-listák,
   szabály-rendszerek.

   FONTOS: ez a fájl a többi data-fájl ELŐTT/UTÁN egyaránt
   tölthető, mert csak globális const-okat hoz létre — nincs
   kölcsönös függőség a tartalom-fájlokkal.

   Tartalom (a régi data.js-ből összevonva):
     · NIHONCORE_MODULES                  (verb/counter engine config)
     · NIHONCORE_PARTICLES                (Mondat-Mester partikulák)
     · PARTICLE_ERROR_RULES               (particle hibadiagnosztika)
     · NIHONCORE_GODAN_MAP                (ragozó motor)
     · NIHONCORE_TE_RULES                 (te-szabályok)
     · NIHONCORE_VERB_EXCEPTIONS          (ál-Ichidan + irregular_te)
     · NIHONCORE_IRREGULAR_FORMS          (suru/kuru)
     · NIHONCORE_FORM_RULES               (forma-katalógus)
     · NIHONCORE_FORM_GROUPS              (UI-szűrőcsoportok)
     · NIHONCORE_ERROR_TYPES              (verb-modul hibakódok)
     · NIHONCORE_ADJ_FORM_RULES           (melléknév forma-katalógus)
     · NIHONCORE_ADJ_FORM_GROUPS          (UI-szűrők)
     · NIHONCORE_ADJ_ERROR_TYPES          (melléknév hibakódok)
     · NIHONCORE_DT_CATEGORIES            (datetime kategóriák)
     · NIHONCORE_DT_ERROR_TYPES           (datetime hibakódok)
     · NIHONCORE_AUDIO_CATEGORIES         (audio kategória-cím)
     · NIHONCORE_AUDIO_TIERS              (audio sebesség-szintek)
     · NIHONCORE_AUDIO_ERROR_TYPES        (audio hibakódok)
     · NIHONCORE_GRAMMAR_CATEGORIES       (grammar kategória-meta)
     · NIHONCORE_GRAMMAR_ERROR_TYPES      (grammar hibakódok)
   ==================================================== */
/* ---- 1) NIHONCORE_MODULES (verb-engine + counter-engine config) (sorok 24..339) ---- */
/* ====================================================
   ── 1) MODULE adatok (module.html-hez) ──────────────
   ==================================================== */

const NIHONCORE_MODULES = {

  // ── Modul 1 — Alap igék (Létezés, Fogyasztás, Mozgás) — V5 P2 ──
  'arimasu-imasu': {
    id: 'arimasu-imasu',
    jlptLevel: 'N5',
    group: 'Alap igék · Létezés, Fogyasztás, Mozgás',
    icon: '動',
    iconClass: 'icon-glow-teal',
    title: 'Alap igék (Masu forma)',
    description: 'Létezés, étkezés, vásárlás és mozgás kifejezése japánul. Állapotvezérelt ragozó-motor 4 toldalékkal. V5 P2: A modul teljesen feltöltve a legfontosabb mindennapi igékkel.',
    status: 'available',

    explanation: {
      jp: '動詞の「ます形」は丁寧な表現です。時制（現在・過去）と肯定／否定で4つの形があります。',
      hu: 'A <strong>ます (masu)</strong> forma a japán igék udvarias alakja. A szótő (pl. <em>tabe-</em>, <em>iki-</em>, <em>ari-</em>) fix marad, csak a toldalék változik az <strong>idő</strong> (most/régen) és a <strong>polaritás</strong> (állítás/tagadás) szerint. Kérdéshez a végére kerül a <strong>か</strong>.'
    },

    categories: [
      {
        id: 'existence', nameHu: 'Létezés', emoji: '📍',
        hint: 'arimasu / imasu — élettelen / élő',
        enabled: true, baseIds: ['arimasu', 'imasu']
      },
      {
        id: 'consumption', nameHu: 'Fogyasztás', emoji: '🍽️',
        hint: 'tabemasu / nomimasu / kaimasu',
        enabled: true, baseIds: ['tabemasu', 'nomimasu', 'kaimasu']
      },
      {
        id: 'movement', nameHu: 'Mozgás', emoji: '🚶',
        hint: 'ikimasu / kimasu / kaerimasu',
        enabled: true, baseIds: ['ikimasu', 'kimasu', 'kaerimasu']
      }
    ],

    verbEngine: {
      bases: {
        // Létezés
        arimasu: {
          baseRoman: 'ari',
          baseJp:    'あり',
          label:     'Arimasu',
          icon:      '📚',
          iconLabel: 'élettelen',
          categoryId: 'existence',
          examples:  ['本', '机', 'コンピューター']
        },
        imasu: {
          baseRoman: 'i',
          baseJp:    'い',
          label:     'Imasu',
          icon:      '🐱',
          iconLabel: 'élő',
          categoryId: 'existence',
          examples:  ['犬', '人', '先生']
        },
        // Fogyasztás (Étel, ital, vásárlás)
        tabemasu: {
          baseRoman: 'tabe',
          baseJp:    '食べ',
          label:     'Tabemasu',
          icon:      '🍣',
          iconLabel: 'eszik',
          categoryId: 'consumption',
          examples:  ['寿司', '朝ごはん', 'お弁当']
        },
        nomimasu: {
          baseRoman: 'nomi',
          baseJp:    '飲み',
          label:     'Nomimasu',
          icon:      '🍵',
          iconLabel: 'iszik',
          categoryId: 'consumption',
          examples:  ['水', 'お茶', 'コーヒー']
        },
        kaimasu: {
          baseRoman: 'kai',
          baseJp:    '買い',
          label:     'Kaimasu',
          icon:      '🛍️',
          iconLabel: 'vesz',
          categoryId: 'consumption',
          examples:  ['お土産', '切符', '本']
        },
        // Mozgás
        ikimasu: {
          baseRoman: 'iki',
          baseJp:    '行き',
          label:     'Ikimasu',
          icon:      '🚆',
          iconLabel: 'megy',
          categoryId: 'movement',
          examples:  ['日本', '東京', '駅']
        },
        kimasu: {
          baseRoman: 'ki',
          baseJp:    '来',
          label:     'Kimasu',
          icon:      '🚶‍♂️',
          iconLabel: 'jön',
          categoryId: 'movement',
          examples:  ['友達', '電車', 'バス']
        },
        kaerimasu: {
          baseRoman: 'kaeri',
          baseJp:    '帰り',
          label:     'Kaerimasu',
          icon:      '🏨',
          iconLabel: 'hazatér',
          categoryId: 'movement',
          examples:  ['家', 'ホテル', '国']
        }
      },
      suffixes: {
        'Non-past_Affirmative': { roman: 'masu',         jp: 'ます'         },
        'Non-past_Negative':    { roman: 'masen',        jp: 'ません'       },
        'Past_Affirmative':     { roman: 'mashita',      jp: 'ました'       },
        'Past_Negative':        { roman: 'masen deshita', jp: 'ませんでした' }
      },
      questionSuffix: { roman: ' ka', jp: 'か' },
      tenseLabels:    { 'Non-past': 'Most',     'Past':       'Régen'   },
      polarityLabels: { 'Affirmative': 'Állítás', 'Negative': 'Tagadás' }
    },

    phases: {
      1: {
        type: 'interactive-demo',
        name: 'Megértés',
        subtitle: 'Magyarázat + interaktív demo',
        unlocked: true,
        sentenceContexts: {
          arimasu: {
            templateBeforeBlank: '机の上に本が',
            placeholder: '___',
            contextHu: 'Az asztalon (van) egy könyv'
          },
          imasu: {
            templateBeforeBlank: '公園に犬が',
            placeholder: '___',
            contextHu: 'A parkban (van) egy kutya'
          },
          tabemasu: {
            templateBeforeBlank: 'おいしい寿司を',
            placeholder: '___',
            contextHu: 'Finom sushit (eszem)'
          },
          nomimasu: {
            templateBeforeBlank: '毎朝、抹茶を',
            placeholder: '___',
            contextHu: 'Minden reggel matchát (iszom)'
          },
          kaimasu: {
            templateBeforeBlank: '東京でお土産を',
            placeholder: '___',
            contextHu: 'Tokióban szuvenírt (veszek)'
          },
          ikimasu: {
            templateBeforeBlank: '明日、日本へ',
            placeholder: '___',
            contextHu: 'Holnap Japánba (megyek)'
          },
          kimasu: {
            templateBeforeBlank: '友達のボティさんが',
            placeholder: '___',
            contextHu: 'A barátom, Boti (jön)'
          },
          kaerimasu: {
            templateBeforeBlank: '夜、ホテルへ',
            placeholder: '___',
            contextHu: 'Este a hotelbe (visszatérek)'
          }
        }
      },

      2: {
        type: 'matrix-selector',
        name: 'Alkalmazás',
        subtitle: 'Ragozó-Selector — 10 feladat',
        unlocked: true,
        tasks: [
          {
            promptHu: 'Nincs ott (múlt időben, élettelen tárgy esetén)',
            context: 'Pl. korábban volt egy könyv az asztalon, de most már nincs',
            expected: { baseId: 'arimasu', tense: 'Past',     polarity: 'Negative',    question: false }
          },
          {
            promptHu: 'Van itt? (kérdés, élőlényre, jelenben)',
            context: 'Pl. a tanár ott van a teremben?',
            expected: { baseId: 'imasu',   tense: 'Non-past', polarity: 'Affirmative', question: true  }
          },
          {
            promptHu: 'Ettem (állító, étel, múlt)',
            context: 'Pl. tegnap sushit ettem',
            expected: { baseId: 'tabemasu', tense: 'Past',     polarity: 'Affirmative', question: false }
          },
          {
            promptHu: 'Nem iszom (jelen, ital, tagadó)',
            context: 'Pl. nem iszom kávét',
            expected: { baseId: 'nomimasu', tense: 'Non-past', polarity: 'Negative',    question: false }
          },
          {
            promptHu: 'Mész Tokióba? (kérdés, mozgás, jelen/jövő)',
            context: 'Pl. holnap elutazol?',
            expected: { baseId: 'ikimasu',  tense: 'Non-past', polarity: 'Affirmative', question: true  }
          },
          {
            promptHu: 'Nem vettem (múlt, vásárlás, tagadó)',
            context: 'Pl. nem vettem meg a jegyet',
            expected: { baseId: 'kaimasu',  tense: 'Past',     polarity: 'Negative',    question: false }
          },
          {
            promptHu: 'Visszatértünk (múlt, mozgás, állító)',
            context: 'Pl. este visszamentünk a hotelbe',
            expected: { baseId: 'kaerimasu', tense: 'Past',    polarity: 'Affirmative', question: false }
          },
          {
            promptHu: 'Eljött Boti? (kérdés, mozgás, múlt)',
            context: 'Pl. végül megérkezett a találkozóra?',
            expected: { baseId: 'kimasu',   tense: 'Past',     polarity: 'Affirmative', question: true  }
          },
          {
            promptHu: 'Nem megyek (jelen/jövő, mozgás, tagadó)',
            context: 'Pl. ma nem megyek a boltba',
            expected: { baseId: 'ikimasu',  tense: 'Non-past', polarity: 'Negative',    question: false }
          },
          {
            promptHu: 'Volt egy az asztalon (állító, élettelen, múlt)',
            context: 'Pl. tegnap ott volt az útlevelem',
            expected: { baseId: 'arimasu',  tense: 'Past',     polarity: 'Affirmative', question: false }
          }
        ]
      },

      3: {
        type: 'speed-drill',
        name: 'Automatizálás',
        subtitle: 'Speed Drill — 5 mp / kártya',
        unlocked: true,
        timeLimit: 5000,
        cards: [
          { iconBase: 'imasu',     iconChar: '🐶',   tagHu: 'Múlt + Állító',  expected: { tense: 'Past',     polarity: 'Affirmative', question: false } },
          { iconBase: 'tabemasu',  iconChar: '🍣',   tagHu: 'Most + Kérdő',   expected: { tense: 'Non-past', polarity: 'Affirmative', question: true  } },
          { iconBase: 'ikimasu',   iconChar: '🚆',   tagHu: 'Most + Tagadó',  expected: { tense: 'Non-past', polarity: 'Negative',    question: false } },
          { iconBase: 'arimasu',   iconChar: '📚',   tagHu: 'Múlt + Tagadó',  expected: { tense: 'Past',     polarity: 'Negative',    question: false } },
          { iconBase: 'nomimasu',  iconChar: '🍵',   tagHu: 'Múlt + Állító',  expected: { tense: 'Past',     polarity: 'Affirmative', question: false } },
          { iconBase: 'kaerimasu', iconChar: '🏨',   tagHu: 'Most + Állító',  expected: { tense: 'Non-past', polarity: 'Affirmative', question: false } },
          { iconBase: 'kaimasu',   iconChar: '🛍️',   tagHu: 'Múlt + Tagadó',  expected: { tense: 'Past',     polarity: 'Negative',    question: false } },
          { iconBase: 'kimasu',    iconChar: '🚶‍♂️', tagHu: 'Múlt + Kérdő',   expected: { tense: 'Past',     polarity: 'Affirmative', question: true  } },
          { iconBase: 'arimasu',   iconChar: '🪑',   tagHu: 'Most + Állító',  expected: { tense: 'Non-past', polarity: 'Affirmative', question: false } },
          { iconBase: 'tabemasu',  iconChar: '🍱',   tagHu: 'Múlt + Tagadó',  expected: { tense: 'Past',     polarity: 'Negative',    question: false } }
        ]
      }
    }
  }, // <--- CSAK EGY ZÁRÓJEL ÉS EGY VESSZŐ LEGYEN ITT!

  // ── Modul 3 — Számláló Szavak (v1.6 — élő) ──────────
  'szamlalok': {
    id: 'szamlalok',
    jlptLevel: 'N5',
    group: 'Számlálók (つ / 人 / 枚 / 本 / 冊)',
    icon: '🔢',
    iconClass: 'icon-glow-green',
    title: 'Számláló Szavak',
    description: 'A japán számlálószavak felismerése, kiejtése és alkalmazása. 3 lépcsős tanulási útvonal, kategória-szűrővel.',
    status: 'available',

    explanation: {
      jp: '日本語では物を数える時、種類によって違う数え方を使います。「つ」は一般的、「人」は人、「枚」は薄くて平らな物、「本」は細長い物、「冊」は本に使います。',
      hu: 'A japán nyelvben minden tárgyhoz külön <strong>számlálószó</strong> tartozik a forma vagy típus alapján. A <strong>つ (tsu)</strong> általános, a <strong>人 (nin)</strong> embereké, a <strong>枚 (mai)</strong> lapos dolgoké (papír), a <strong>本 (hon)</strong> hosszú-vékony tárgyaké (toll), a <strong>冊 (satsu)</strong> könyveké. Néhány szám rendhagyó hangmódosulást okoz: <em>1本 = ippon</em> (nem ichihon), <em>3本 = sanbon</em> (rendaku), <em>6本 = roppon</em> stb.'
    },

    phases: {
      1: {
        type: 'flashcard',
        name: 'Megértés',
        subtitle: 'Szótár-böngészés flashcard-okon',
        unlocked: true
      },
      2: {
        type: 'counter-hybrid',
        name: 'Alkalmazás',
        subtitle: 'Hibrid: counter pill + kana input',
        unlocked: true
      },
      3: {
        type: 'counter-mastery',
        name: 'Automatizálás',
        subtitle: 'Mester: szabad input + diff engine',
        unlocked: true
      }
    }
  },

  // ── Modul 4 — Hallás & Kiejtés (locked stub) ────────
  'hallas-kiejtes': {
    id: 'hallas-kiejtes',
    jlptLevel: 'N5–N3',
    group: 'Mechanika · Audio (TTS)',
    icon: '🔊',
    iconClass: 'icon-glow-red',
    title: 'Hallás & Kiejtés',
    description: 'Text-to-Speech felolvasás és audio-match — halld és ismételd a szavakat.',
    status: 'locked',
    lockedNote: 'Ez a 3. fázis (Automatizálás) audio-mechanikája — minden grammar-point modulon belül elérhető lesz, miután a TTS integrálva van.',
    phases: {
      1: { name: 'Megértés',      unlocked: false, comingSoon: 'A TTS mechanika a grammar-point modulokon belül lesz.' },
      2: { name: 'Alkalmazás',    unlocked: false, comingSoon: 'A TTS mechanika a grammar-point modulokon belül lesz.' },
      3: { name: 'Automatizálás', unlocked: false, comingSoon: 'A TTS mechanika a grammar-point modulokon belül lesz.' }
    }
  }
};

/* ---- 2) NIHONCORE_PARTICLES (Mondat-Mester partikulák) (sorok 342..405) ---- */
/* ====================================================
   ── 2) PRACTICE adatok (practice.html-hez) ──────────
   ==================================================== */

// Token-tipusok: 'word' | 'particle' | 'verb'
// Particle role-ok: 'topic' | 'subject' | 'object' | 'location'
//                   | 'goal' | 'tool' | 'direction' | 'companion' | 'possession'

const NIHONCORE_PARTICLES = [
  {
    id: 'wa', jp: 'は', romaji: 'wa',
    hint: 'Témajelölő — "ami a beszélgetés tárgya"',
    shortPurpose: 'téma',
    fullExplain: 'a témát jelöli (amit a mondat központjába helyezünk, ismert dolog)'
  },
  {
    id: 'ga', jp: 'が', romaji: 'ga',
    hint: 'Alanyjelölő — új információ, fókusz',
    shortPurpose: 'új info / hangsúlyos alany',
    fullExplain: 'új információt vagy hangsúlyos alanyt jelöl (fókuszra hívja fel a figyelmet)'
  },
  {
    id: 'wo', jp: 'を', romaji: 'wo',
    hint: 'Tárgyrag — közvetlen tárgy',
    shortPurpose: 'tárgyrag',
    fullExplain: 'közvetlen tárgyat jelöl (mit/kit érint a cselekvés)'
  },
  {
    id: 'ni', jp: 'に', romaji: 'ni',
    hint: 'Helye / célpontja / időpontja',
    shortPurpose: 'célpont / hely / idő',
    fullExplain: 'célpontot, statikus helyet vagy időpontot jelöl (létezés helye, mozgás célja, időbeli pont)'
  },
  {
    id: 'de', jp: 'で', romaji: 'de',
    hint: 'Cselekvés helyszíne / eszköze',
    shortPurpose: 'helyszín / eszköz',
    fullExplain: 'a cselekvés helyszínét vagy eszközét jelöli (hol/mivel végezzük)'
  },
  {
    id: 'e',  jp: 'へ', romaji: 'e',
    hint: 'Mozgás iránya',
    shortPurpose: 'irány',
    fullExplain: 'mozgás irányát jelöli (merre tartunk)'
  },
  {
    id: 'to', jp: 'と', romaji: 'to',
    hint: 'Társalgással ("X-szel")',
    shortPurpose: 'társ',
    fullExplain: 'társalgást jelöl ("X-szel/-vel együtt")'
  },
  {
    id: 'mo', jp: 'も', romaji: 'mo',
    hint: '"is", "szintén"',
    shortPurpose: '"is", "szintén"',
    fullExplain: '"is"/"szintén" jelentést hordoz (hozzáadás)'
  },
  {
    id: 'no', jp: 'の', romaji: 'no',
    hint: 'Birtokos / leíró',
    shortPurpose: 'birtoklás / leírás',
    fullExplain: 'birtoklást vagy leíró kapcsolatot jelöl (X-é, X tulajdonsága)'
  }
];

/* ---- 3) PARTICLE_ERROR_RULES (particle hibadiagnosztika) (sorok 2776..2820) ---- */
// Particle hibadiagnosztika — kontextus-érzékeny szabályok
const PARTICLE_ERROR_RULES = [
  {
    putParticle: 'de',
    expectedRole: 'goal',
    message: 'A <strong>で</strong> a cselekvés helyszínét vagy eszközét jelöli — itt mozgás célpontjáról van szó, ezért a <strong>に</strong> vagy a <strong>へ</strong> kell.'
  },
  {
    putParticle: 'de',
    expectedRole: 'direction',
    message: 'A <strong>で</strong> nem irányt jelöl, hanem helyszínt vagy eszközt. Mozgás irányához használd a <strong>へ</strong> vagy <strong>に</strong> partikulát.'
  },
  {
    putParticle: 'ni',
    expectedRole: 'location',
    expectedParticle: 'de',
    onlyIfVerbContains: ['hashirimasu', 'tabemasu', 'kakimasu', 'shimasu'],
    message: 'Itt cselekvés zajlik egy helyszínen — a <strong>に</strong> a statikus létezéshez (arimasu/imasu) tartozik. Cselekvés helyszínéhez a <strong>で</strong> kell.'
  },
  {
    putParticle: 'wa',
    expectedRole: 'subject',
    message: 'A <strong>は</strong> a témát jelöli (ismert dolog), de itt új információ kerül fókuszba — ezért a <strong>が</strong> partikula illik (alanyjelölő, fókuszra).'
  },
  {
    putParticle: 'ga',
    expectedRole: 'topic',
    message: 'A <strong>が</strong> új információt vagy fókuszt jelöl — itt a téma már ismert (a beszélő önmagáról beszél), ezért a <strong>は</strong> kell.'
  },
  {
    putParticle: 'ni',
    expectedRole: 'tool',
    message: 'A <strong>に</strong> nem eszközt jelöl. Eszközhöz, módhoz a <strong>で</strong> partikula kell.'
  },
  {
    putParticle: 'wo',
    expectedRole: 'topic',
    message: 'A <strong>を</strong> tárgyrag — közvetlen tárgyat jelöl (mit eszünk, mit látunk). Itt témajelölő kell: <strong>は</strong>.'
  },
  {
    putParticle: 'wo',
    expectedRole: 'subject',
    message: 'A <strong>を</strong> nem alany-jelölő — itt új információ-fókusz van: <strong>が</strong> kell.'
  }
];

/* ---- 4) RAGOZÓ MODUL — engine-szabályok (sorok 2823..2895) ---- */
/* ====================================================
   ── 4) CONJUGATION (Ragozó modul) adatok — V2.0 P1 ──
   ────────────────────────────────────────────────────
   Architektúra: adatvezérelt morfológia.
   A motor (app.js) ezekből az adatokból dolgozik:

     NIHONCORE_GODAN_MAP        — 9 mássalhangzó-család × a/i/u/e/o
     NIHONCORE_VERB_EXCEPTIONS  — ál-Ichidan godanok + irregular_te
     NIHONCORE_VERBS            — starter szett (14 ige)
     NIHONCORE_IRREGULAR_FORMS  — suru/kuru hard-coded formái
     NIHONCORE_FORM_RULES       — formakód → leíró + szabály-id
     NIHONCORE_ERROR_TYPES      — hibakód → cím + magyarázat-sablon

   Bővítés: új ige = 1 sor a NIHONCORE_VERBS-be. Új kivétel = 1 sor.
   ==================================================== */


// Godan mátrix — a verb final mora helyett mit teszünk az adott oszlopban.
// Kulcs = az ige végződésének mássalhangzó-családja (u-végű "vokális tövű" kulcsa: 'u').
// Érték: { a, i, u, e, o } — mindegyik { kana, romaji }.
//
// FONTOS: az 'u' család (買う, 言う, 思う) a-oszlopa 'wa' (kawanai!),
// nem 'a' — ezt a táblázat helyesen kódolja.
const NIHONCORE_GODAN_MAP = {
  ku:  { a:{kana:'か',romaji:'ka'},  i:{kana:'き',romaji:'ki'},  u:{kana:'く',romaji:'ku'},  e:{kana:'け',romaji:'ke'},  o:{kana:'こ',romaji:'ko'} },
  gu:  { a:{kana:'が',romaji:'ga'},  i:{kana:'ぎ',romaji:'gi'},  u:{kana:'ぐ',romaji:'gu'},  e:{kana:'げ',romaji:'ge'},  o:{kana:'ご',romaji:'go'} },
  su:  { a:{kana:'さ',romaji:'sa'},  i:{kana:'し',romaji:'shi'}, u:{kana:'す',romaji:'su'},  e:{kana:'せ',romaji:'se'},  o:{kana:'そ',romaji:'so'} },
  tsu: { a:{kana:'た',romaji:'ta'},  i:{kana:'ち',romaji:'chi'}, u:{kana:'つ',romaji:'tsu'}, e:{kana:'て',romaji:'te'},  o:{kana:'と',romaji:'to'} },
  nu:  { a:{kana:'な',romaji:'na'},  i:{kana:'に',romaji:'ni'},  u:{kana:'ぬ',romaji:'nu'},  e:{kana:'ね',romaji:'ne'},  o:{kana:'の',romaji:'no'} },
  bu:  { a:{kana:'ば',romaji:'ba'},  i:{kana:'び',romaji:'bi'},  u:{kana:'ぶ',romaji:'bu'},  e:{kana:'べ',romaji:'be'},  o:{kana:'ぼ',romaji:'bo'} },
  mu:  { a:{kana:'ま',romaji:'ma'},  i:{kana:'み',romaji:'mi'},  u:{kana:'む',romaji:'mu'},  e:{kana:'め',romaji:'me'},  o:{kana:'も',romaji:'mo'} },
  ru:  { a:{kana:'ら',romaji:'ra'},  i:{kana:'り',romaji:'ri'},  u:{kana:'る',romaji:'ru'},  e:{kana:'れ',romaji:'re'},  o:{kana:'ろ',romaji:'ro'} },
  u:   { a:{kana:'わ',romaji:'wa'},  i:{kana:'い',romaji:'i'},   u:{kana:'う',romaji:'u'},   e:{kana:'え',romaji:'e'},   o:{kana:'お',romaji:'o'} }
};

// Te-form / Ta-form családi szabályok — Godan-ra.
// A szabály a verb final mora családjából (godan-family) indul.
// 'iku' kivétel: külön kezelés (irregular_te flag a verb-en).
const NIHONCORE_TE_RULES = {
  ku:  { te: { kana:'いて', romaji:'ite' },   ta: { kana:'いた', romaji:'ita' },   pattern: 'i-drop' },
  gu:  { te: { kana:'いで', romaji:'ide' },   ta: { kana:'いだ', romaji:'ida' },   pattern: 'i-drop-rendaku' },
  su:  { te: { kana:'して', romaji:'shite' }, ta: { kana:'した', romaji:'shita' }, pattern: 'shi-stem' },
  tsu: { te: { kana:'って', romaji:'tte' },   ta: { kana:'った', romaji:'tta' },   pattern: 'sokuon-t' },
  nu:  { te: { kana:'んで', romaji:'nde' },   ta: { kana:'んだ', romaji:'nda' },   pattern: 'n-rendaku' },
  bu:  { te: { kana:'んで', romaji:'nde' },   ta: { kana:'んだ', romaji:'nda' },   pattern: 'n-rendaku' },
  mu:  { te: { kana:'んで', romaji:'nde' },   ta: { kana:'んだ', romaji:'nda' },   pattern: 'n-rendaku' },
  ru:  { te: { kana:'って', romaji:'tte' },   ta: { kana:'った', romaji:'tta' },   pattern: 'sokuon-t' },
  u:   { te: { kana:'って', romaji:'tte' },   ta: { kana:'った', romaji:'tta' },   pattern: 'sokuon-t' }
};


// Ál-Ichidan kivételek (látszólag Ichidan, de valójában Godan).
// Plusz olyan igék, amelyeknek rendhagyó te/ta-formájuk van (jelenleg csak 行く).
// Ez a tábla csak akkor jön szóba, ha a verb-record explicit `group: 'godan'` van
// — de itt vannak listázva referencia és későbbi auto-detektorhoz.
const NIHONCORE_VERB_EXCEPTIONS = {
  pseudoIchidanGodan: [
    // Mind 〜る végű, mind Godan
    'kaeru',    // 帰る (visszamegy)
    'hashiru',  // 走る (fut)
    'kiru',     // 切る (vág)  — vigyázz: 着る (felvesz) az Ichidan
    'iru',      // 要る (kell) — vigyázz: いる (van) az Ichidan
    'suberu',   // 滑る (csúszik)
    'shaberu',  // 喋る (csevegen)
    'hairu',    // 入る (bemegy)
    'shiru',    // 知る (tud)
    'kagiru',   // 限る (korlátoz)
    'chiru'     // 散る (szétszóródik)
  ],
  irregularTe: {
    // verb-id → rendhagyó te/ta forma
    'iku': { te: { kana:'いって', romaji:'itte' }, ta: { kana:'いった', romaji:'itta' } }
  }
};

/* ---- 5) NIHONCORE_IRREGULAR_FORMS + FORM_RULES + FORM_GROUPS + ERROR_TYPES (sorok 3030..3304) ---- */

// Rendhagyó (Group 3) igék — minden P1-forma hard-coded.
// Kulcs = verb id ('suru', 'kuru').
const NIHONCORE_IRREGULAR_FORMS = {
  suru: {
    masu:              { kana:'します',           romaji:'shimasu' },
    masen:             { kana:'しません',         romaji:'shimasen' },
    mashita:           { kana:'しました',         romaji:'shimashita' },
    masen_deshita:     { kana:'しませんでした',   romaji:'shimasen deshita' },
    nai:               { kana:'しない',           romaji:'shinai' },
    te:                { kana:'して',             romaji:'shite' },
    ta:                { kana:'した',             romaji:'shita' },
    // V2.0 P2 — haladó
    potential:         { kana:'できる',           romaji:'dekiru' },
    passive:           { kana:'される',           romaji:'sareru' },
    causative:         { kana:'させる',           romaji:'saseru' },
    causative_passive: { kana:'させられる',       romaji:'saserareru' },
    volitional:        { kana:'しよう',           romaji:'shiyou' }
  },
  kuru: {
    masu:              { kana:'きます',           romaji:'kimasu' },
    masen:             { kana:'きません',         romaji:'kimasen' },
    mashita:           { kana:'きました',         romaji:'kimashita' },
    masen_deshita:     { kana:'きませんでした',   romaji:'kimasen deshita' },
    nai:               { kana:'こない',           romaji:'konai' },
    te:                { kana:'きて',             romaji:'kite' },
    ta:                { kana:'きた',             romaji:'kita' },
    // V2.0 P2 — haladó
    potential:         { kana:'こられる',         romaji:'korareru' },
    passive:           { kana:'こられる',         romaji:'korareru' },  // homográf: potential = passive a kuru-nál
    causative:         { kana:'こさせる',         romaji:'kosaseru' },
    causative_passive: { kana:'こさせられる',     romaji:'kosaserareru' },
    volitional:        { kana:'こよう',           romaji:'koyou' }
  }
};


// Forma-katalógus — formakód → meta.
// stemColumn: melyik godan-oszlopra megy a stem (Godan-nál).
// suffix:     a stem után fűzött rész (Godan + Ichidan közös; Ichidan stem-je a 〜る levágott).
// Az 'irregular' formák a NIHONCORE_IRREGULAR_FORMS-ből jönnek (suru/kuru).
const NIHONCORE_FORM_RULES = {

  masu: {
    code: 'masu',
    nameHu: 'Udvarias jelen állító',
    shortHu: 'Masu (です-stílus)',
    promptHu: 'udvarias jelen, állító',
    example: 'のむ → のみます',
    stemColumn: 'i',
    suffix: { kana: 'ます', romaji: 'masu' },
    ichidanSuffix: { kana: 'ます', romaji: 'masu' },
    level: 'N5'
  },

  masen: {
    code: 'masen',
    nameHu: 'Udvarias jelen tagadó',
    shortHu: 'Masen',
    promptHu: 'udvarias jelen, tagadó',
    example: 'のむ → のみません',
    stemColumn: 'i',
    suffix: { kana: 'ません', romaji: 'masen' },
    ichidanSuffix: { kana: 'ません', romaji: 'masen' },
    level: 'N5'
  },

  mashita: {
    code: 'mashita',
    nameHu: 'Udvarias múlt állító',
    shortHu: 'Mashita',
    promptHu: 'udvarias múlt, állító',
    example: 'のむ → のみました',
    stemColumn: 'i',
    suffix: { kana: 'ました', romaji: 'mashita' },
    ichidanSuffix: { kana: 'ました', romaji: 'mashita' },
    level: 'N5'
  },

  masen_deshita: {
    code: 'masen_deshita',
    nameHu: 'Udvarias múlt tagadó',
    shortHu: 'Masen deshita',
    promptHu: 'udvarias múlt, tagadó',
    example: 'のむ → のみませんでした',
    stemColumn: 'i',
    suffix: { kana: 'ませんでした', romaji: 'masen deshita' },
    ichidanSuffix: { kana: 'ませんでした', romaji: 'masen deshita' },
    level: 'N5'
  },

  nai: {
    code: 'nai',
    nameHu: 'Tagadó alak (-nai)',
    shortHu: 'Nai-forma',
    promptHu: 'bizalmas tagadó (-nai)',
    example: 'のむ → のまない',
    stemColumn: 'a',
    suffix: { kana: 'ない', romaji: 'nai' },
    ichidanSuffix: { kana: 'ない', romaji: 'nai' },
    level: 'N4'
  },

  te: {
    code: 'te',
    nameHu: 'Te-alak',
    shortHu: 'Te-forma',
    promptHu: 'te-alak (összekötő / kérés alapja)',
    example: 'のむ → のんで · かく → かいて · 行く → 行って',
    stemColumn: null,                       // saját motor (te-rules)
    suffix: null,                           // saját motor
    ichidanSuffix: { kana: 'て', romaji: 'te' },
    level: 'N4'
  },

  ta: {
    code: 'ta',
    nameHu: 'Ta-alak (bizalmas múlt)',
    shortHu: 'Ta-forma',
    promptHu: 'bizalmas múlt (-ta)',
    example: 'のむ → のんだ · かく → かいた',
    stemColumn: null,                       // saját motor (ta-rules)
    suffix: null,
    ichidanSuffix: { kana: 'た', romaji: 'ta' },
    level: 'N4'
  },

  // ── V2.0 P2 — Haladó transzformációk ────────────────
  potential: {
    code: 'potential',
    nameHu: 'Potenciális (képes rá)',
    shortHu: 'Potential',
    promptHu: 'képesség kifejezése ("tud X-ni")',
    example: 'のむ → のめる · たべる → たべられる',
    stemColumn: 'e',
    suffix: { kana: 'る', romaji: 'ru' },
    ichidanSuffix: { kana: 'られる', romaji: 'rareru' },
    level: 'N4'
  },

  passive: {
    code: 'passive',
    nameHu: 'Szenvedő',
    shortHu: 'Passive',
    promptHu: 'szenvedő szerkezet ("X-tetik velem")',
    example: 'のむ → のまれる · たべる → たべられる',
    stemColumn: 'a',
    suffix: { kana: 'れる', romaji: 'reru' },
    ichidanSuffix: { kana: 'られる', romaji: 'rareru' },
    level: 'N4'
  },

  causative: {
    code: 'causative',
    nameHu: 'Műveltető',
    shortHu: 'Causative',
    promptHu: 'műveltető ("X-tetni hagy", "X-ettet")',
    example: 'のむ → のませる · たべる → たべさせる',
    stemColumn: 'a',
    suffix: { kana: 'せる', romaji: 'seru' },
    ichidanSuffix: { kana: 'させる', romaji: 'saseru' },
    level: 'N3'
  },

  causative_passive: {
    code: 'causative_passive',
    nameHu: 'Műveltető-szenvedő',
    shortHu: 'Caus-Pass',
    promptHu: 'kényszerített cselekvés ("kénytelen voltam X-ni")',
    example: 'のむ → のまされる(のまされる)/のませられる · たべる → たべさせられる',
    stemColumn: null,                       // composition: passive(causative(v))
    suffix: null,
    ichidanSuffix: null,
    level: 'N3'
  },

  volitional: {
    code: 'volitional',
    nameHu: 'Akarat (-ou/-you)',
    shortHu: 'Volitional',
    promptHu: 'akarat/javaslat ("X-jünk!", "X-ni szándékozom")',
    example: 'のむ → のもう · たべる → たべよう',
    stemColumn: 'o',
    suffix: { kana: 'う', romaji: 'u' },
    ichidanSuffix: { kana: 'よう', romaji: 'you' },
    level: 'N4'
  }
};

// A formákat csoportokba szedjük (UI-szűrőkhöz)
const NIHONCORE_FORM_GROUPS = [
  { id: 'polite_basic', nameHu: 'Udvarias alapok (N5)', forms: ['masu', 'masen', 'mashita', 'masen_deshita'] },
  { id: 'casual_basic', nameHu: 'Bizalmas alapok (N5/N4)', forms: ['nai', 'te', 'ta'] },
  { id: 'advanced',     nameHu: 'Haladó transzformációk (N4–N3)', forms: ['potential', 'passive', 'causative', 'volitional', 'causative_passive'] }
];


// Hibakód → felhasználói magyarázat-sablon. {placeholders} runtime cserélve.
// type: 'group' (csoport-tévedés) | 'stem' (oszloptévedés) | 'suffix' (toldalék)
//       | 'irregular' (kivétel) | 'typo' (kis karakterhiba) | 'unknown'
const NIHONCORE_ERROR_TYPES = {
  group_mismatch: {
    type: 'group',
    title: 'Csoport-tévesztés',
    template: 'A <strong>{lemma}</strong> {realGroup} ige, nem {guessedGroup}. {extraHint}'
  },
  wrong_stem_column: {
    type: 'stem',
    title: 'Tőváltás-hiba',
    template: 'A <strong>{lemma}</strong> {form}-alakjához a Godan <strong>{requiredColumn}-oszlopa</strong> kell ({requiredStem}), nem a <strong>{usedColumn}-oszlop</strong>. Helyes: <strong class="pfe-jp-ok">{correctStem}{suffix}</strong>.'
  },
  wrong_suffix: {
    type: 'suffix',
    title: 'Toldalék-hiba',
    template: 'A tő ({correctStem}) jó, de a toldalék téves: <strong class="pfe-jp-ok">{correctSuffix}</strong> kell ide, nem <strong class="pfe-jp-wrong">{usedSuffix}</strong>.'
  },
  missing_irregular_te: {
    type: 'irregular',
    title: 'Rendhagyó te-alak',
    template: 'A <strong>{lemma}</strong> rendhagyó: te-alakja <strong class="pfe-jp-ok">{correct}</strong>, nem a szabályos {regular}.'
  },
  irregular_verb: {
    type: 'irregular',
    title: 'Rendhagyó ige',
    template: 'A <strong>{lemma}</strong> rendhagyó (Group 3) ige. A {form}-alakja: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  pseudo_ichidan: {
    type: 'group',
    title: 'Ál-Ichidan tévesztés',
    template: 'A <strong>{lemma}</strong> <em>úgy néz ki</em>, mint egy Ichidan (〜る végű), de valójában Godan. A {form}-alak: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  typo: {
    type: 'typo',
    title: 'Apró karakter-hiba',
    template: 'Majdnem jó volt — csak 1-2 karakter csúszott el. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_form: {
    type: 'unknown',
    title: 'Más alak',
    template: 'Ez nem a kért alak. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },

  // ── V2.0 P2 — morféma-szintű hibakódok ───────────────
  // A MorphemeSplitter ezeket adja vissza pontosabb diagnózishoz.
  morph_wrong_column: {
    type: 'stem',
    title: 'Rossz tő-oszlop',
    template: 'A tő jó (<strong>{stemBase}</strong>), de rossz oszlopot használtál: te a <strong>{usedColumn}-oszlopot</strong> ({usedStem}) raktad oda. A {form}-alakhoz az <strong class="pfe-jp-ok">{requiredColumn}-oszlop</strong> kell ({requiredStem}).'
  },
  morph_wrong_suffix: {
    type: 'suffix',
    title: 'Rossz toldalék',
    template: 'A tő jó (<strong class="pfe-jp-ok">{stem}</strong>), de a toldalék téves: te <strong class="pfe-jp-wrong">{usedSuffix}</strong>-t raktál oda — a {form}-alakhoz <strong class="pfe-jp-ok">{correctSuffix}</strong> kell.'
  },
  morph_both_wrong: {
    type: 'stem',
    title: 'Tő és toldalék is hibás',
    template: 'Mindkét rész elcsúszott: tő <strong class="pfe-jp-wrong">{usedStem}</strong> → kellett <strong class="pfe-jp-ok">{correctStem}</strong>; toldalék <strong class="pfe-jp-wrong">{usedSuffix}</strong> → kellett <strong class="pfe-jp-ok">{correctSuffix}</strong>.'
  },
  missing_sokuon: {
    type: 'irregular',
    title: 'Hiányzó kis tsu (っ)',
    template: 'A te/ta-alak itt <em>sokuon-átalakulást</em> kíván (kis tsu — っ). Helyes: <strong class="pfe-jp-ok">{correct}</strong> (a szabályos {regular} helyett).'
  },
  missing_rendaku: {
    type: 'irregular',
    title: 'Hiányzó rendaku (hangosítás)',
    template: 'A te/ta-alak itt <em>rendaku</em>-t kíván (te → de, vagy mu/bu/nu → -nde/-nda). Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  partial_match: {
    type: 'typo',
    title: 'Közel jó — 1-2 karakter csúszás',
    template: 'Nagyon közel van — pár karakter siklott el. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  }
};

/* ---- 6) MELLÉKNÉV MODUL — engine-szabályok (sorok 4272..4451) ---- */
const NIHONCORE_ADJ_FORM_RULES = {

  // ── i-melléknév formák ────────────────────────────
  i_present_affirmative: {
    code: 'i_present_affirmative', type: 'i-adj',
    nameHu: 'Jelen állító (udvarias)',
    shortHu: '〜いです',
    promptHu: 'jelen állító, udvarias',
    example: 'おおきい → おおきいです',
    suffix: { kana: 'いです', romaji: 'i desu' },
    level: 'N5'
  },
  i_present_negative: {
    code: 'i_present_negative', type: 'i-adj',
    nameHu: 'Jelen tagadó (udvarias)',
    shortHu: '〜くないです',
    promptHu: 'jelen tagadó, udvarias',
    example: 'おおきい → おおきくないです',
    suffix: { kana: 'くないです', romaji: 'kunai desu' },
    level: 'N5'
  },
  i_past_affirmative: {
    code: 'i_past_affirmative', type: 'i-adj',
    nameHu: 'Múlt állító (udvarias)',
    shortHu: '〜かったです',
    promptHu: 'múlt állító, udvarias',
    example: 'おおきい → おおきかったです',
    suffix: { kana: 'かったです', romaji: 'katta desu' },
    level: 'N5'
  },
  i_past_negative: {
    code: 'i_past_negative', type: 'i-adj',
    nameHu: 'Múlt tagadó (udvarias)',
    shortHu: '〜くなかったです',
    promptHu: 'múlt tagadó, udvarias',
    example: 'おおきい → おおきくなかったです',
    suffix: { kana: 'くなかったです', romaji: 'kunakatta desu' },
    level: 'N5'
  },

  // ── na-melléknév formák ───────────────────────────
  na_noun_modifier: {
    code: 'na_noun_modifier', type: 'na-adj',
    nameHu: 'Főnév előtt (〜な+főnév)',
    shortHu: '〜な+főnév',
    promptHu: 'főnév előtti alak',
    example: 'きれい → きれいな (hana)',
    suffix: { kana: 'な', romaji: 'na' },
    level: 'N5'
  },
  na_present_affirmative: {
    code: 'na_present_affirmative', type: 'na-adj',
    nameHu: 'Jelen állító (udvarias)',
    shortHu: '〜です',
    promptHu: 'jelen állító, udvarias',
    example: 'きれい → きれいです',
    suffix: { kana: 'です', romaji: 'desu' },
    level: 'N5'
  },
  na_present_negative: {
    code: 'na_present_negative', type: 'na-adj',
    nameHu: 'Jelen tagadó (udvarias)',
    shortHu: '〜ではありません',
    promptHu: 'jelen tagadó, udvarias',
    example: 'きれい → きれいではありません',
    suffix: { kana: 'ではありません', romaji: 'dewa arimasen' },
    // Elfogadott variánsok (interchangeable):
    variants: [
      { kana: 'じゃありません', romaji: 'ja arimasen' }
    ],
    level: 'N5'
  },
  na_past_affirmative: {
    code: 'na_past_affirmative', type: 'na-adj',
    nameHu: 'Múlt állító (udvarias)',
    shortHu: '〜でした',
    promptHu: 'múlt állító, udvarias',
    example: 'きれい → きれいでした',
    suffix: { kana: 'でした', romaji: 'deshita' },
    level: 'N5'
  },
  na_past_negative: {
    code: 'na_past_negative', type: 'na-adj',
    nameHu: 'Múlt tagadó (udvarias)',
    shortHu: '〜ではありませんでした',
    promptHu: 'múlt tagadó, udvarias',
    example: 'きれい → きれいではありませんでした',
    suffix: { kana: 'ではありませんでした', romaji: 'dewa arimasen deshita' },
    variants: [
      { kana: 'じゃありませんでした', romaji: 'ja arimasen deshita' }
    ],
    level: 'N5'
  }
};


// Forma-csoportok az UI-szűrőhöz
const NIHONCORE_ADJ_FORM_GROUPS = [
  { id: 'i_adj_forms',  nameHu: 'I-melléknév ragozás (N5)',
    forms: ['i_present_affirmative', 'i_present_negative', 'i_past_affirmative', 'i_past_negative'] },
  { id: 'na_adj_basic', nameHu: 'Na-melléknév alapok (N5)',
    forms: ['na_present_affirmative', 'na_past_affirmative', 'na_noun_modifier'] },
  { id: 'na_adj_neg',   nameHu: 'Na-melléknév tagadó alakok (N5)',
    forms: ['na_present_negative', 'na_past_negative'] }
];


// Hibakód-katalógus (melléknév-specifikus, külön a NIHONCORE_ERROR_TYPES-tól)
const NIHONCORE_ADJ_ERROR_TYPES = {
  wrong_type: {
    type: 'type',
    title: 'Csoport-tévesztés',
    template: 'A <strong>{lemma}</strong> <strong class="pfe-jp-ok">{realType}</strong>, nem {guessedType}. {hint}'
  },
  i_adj_used_on_na: {
    type: 'type',
    title: 'I-alak na-mellékneven',
    template: 'A <strong>{lemma}</strong> na-melléknév — nem i-melléknévként ragozható (nem 〜く-, 〜かった- toldalékkal). Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  na_adj_used_on_i: {
    type: 'type',
    title: 'Na-alak i-mellékneven',
    template: 'A <strong>{lemma}</strong> i-melléknév — copulát NEM kell hozzá tenni a {form} alaknál. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  missing_na: {
    type: 'form',
    title: 'Hiányzó な',
    template: 'Főnév előtt na-melléknévhez kell a <strong>な</strong>. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  ii_exception: {
    type: 'irregular',
    title: 'いい kivétel',
    template: 'Az <strong>いい</strong> minden ragozott alakja a <strong>よい</strong> alapján képződik. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  copula_variant: {
    type: 'form',
    title: 'Copula-variáns elfogadva',
    template: 'Helyes! A <strong>{usedVariant}</strong> és a <strong>{primaryVariant}</strong> ugyanazt jelenti (informálisabb vs formálisabb). Mindkettő elfogadott.'
  },
  wrong_suffix: {
    type: 'suffix',
    title: 'Rossz toldalék',
    template: 'A tő jó, de a toldalék téves. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_form: {
    type: 'unknown',
    title: 'Más alak',
    template: 'Ez nem a kért alak. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  typo: {
    type: 'typo',
    title: 'Közel jó',
    template: 'Pár karakter csúszott el. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  }
};


/* ====================================================
   ── 6) DATE & TIME (Dátum & Idő) modul — V2.3 ──────
   ────────────────────────────────────────────────────
   日時モジュール — japán dátum- és időkezelés.

   Kategóriák:
     • months   — hónapok (1月..12月)
     • days     — hónap napjai (1日..) — sok rendhagyó olvasat!
     • weekdays — hét napjai (月曜日..)
     • times    — időpontok (időpontok + félórák)

   FONTOS kivételek:
     • 日 native olvasatok: ついたち, ふつか, よっか, はつか, ...
     • 時 rendhagyó: よじ (4), しちじ (7), くじ (9)
     • 月 rendhagyó: しがつ (4), しちがつ (7), くがつ (9)

   STARTER SZETT — szándékosan kicsi. A teljes feltöltés a
   legutolsó lépés (lásd CONTENT_LOAD_GUIDE.md). A Years +
   Relative Time + Advanced 24h formák a V2.3 P2-ben jönnek.
   ==================================================== */


// Hónapok — mind a 12 (4/7/9 rendhagyó olvasattal)

/* ---- 7) DATETIME MODUL — kategóriák + hibakódok (a user által bővítve) ---- */
// Kategória-katalógus (lobby-szűrőhöz)
const NIHONCORE_DT_CATEGORIES = [
  { id: 'months',   nameHu: 'Hónapok',       emoji: '📅', hint: '1月..12月',                      dataset: 'NIHONCORE_DT_MONTHS'   },
  { id: 'days',     nameHu: 'Napok',          emoji: '🗓️', hint: '1日..31日 (1-10 + 14/20/24 irregular)', dataset: 'NIHONCORE_DT_DAYS'     },
  { id: 'weekdays', nameHu: 'Hét napjai',     emoji: '📆', hint: '月曜日..日曜日',                  dataset: 'NIHONCORE_DT_WEEKDAYS' },
  { id: 'times',    nameHu: 'Időpontok',      emoji: '🕘', hint: '1時..12時 + mind a 12 félóra',   dataset: 'NIHONCORE_DT_TIMES'    },
  { id: 'hours24',  nameHu: '24 órás idő',    emoji: '🕓', hint: '13時..24時 · 午前/午後',          dataset: 'NIHONCORE_DT_HOURS24'  },
  { id: 'minutes',  nameHu: 'Percek',         emoji: '⏱️', hint: '1分..55分 (rendaku/sokuon!)',    dataset: 'NIHONCORE_DT_MINUTES'  },
  { id: 'years',    nameHu: 'Évek',           emoji: '📰', hint: '年 · 令和/平成/昭和',             dataset: 'NIHONCORE_DT_YEARS'    },
  { id: 'relative', nameHu: 'Relatív idő',    emoji: '⏳', hint: '前/後/過ぎ/頃/今日/来週...',      dataset: 'NIHONCORE_DT_RELATIVE' }
];


// Hibakód-katalógus a Dátum & Idő modulhoz
const NIHONCORE_DT_ERROR_TYPES = {
  irregular_day: {
    type: 'irregular',
    title: 'Rendhagyó nap-olvasat',
    template: 'A <strong>{kanji}</strong> rendhagyó (natív japán számolás): <strong class="pfe-jp-ok">{correct}</strong>, nem a szabályos {regular}.'
  },
  irregular_hour: {
    type: 'irregular',
    title: 'Rendhagyó óra-olvasat',
    template: 'A <strong>{kanji}</strong> óra rendhagyó: <strong class="pfe-jp-ok">{correct}</strong> (a 4/7/9 óra mindig kivételes).'
  },
  irregular_month: {
    type: 'irregular',
    title: 'Rendhagyó hónap-olvasat',
    template: 'A <strong>{kanji}</strong> rendhagyó: <strong class="pfe-jp-ok">{correct}</strong> (a 4月/7月/9月 kivételes).'
  },
  irregular_minute: {
    type: 'irregular',
    title: 'Rendhagyó perc-olvasat',
    template: 'A <strong>{kanji}</strong> perc <em>rendaku/sokuon</em> hangmódosulással jár: <strong class="pfe-jp-ok">{correct}</strong> (az 1/3/4/6/8/10 perc és tízesei kivételesek).'
  },
  irregular_year: {
    type: 'irregular',
    title: 'Rendhagyó év-olvasat',
    template: 'A <strong>{kanji}</strong> rendhagyó (よ/ん vagy がんねん): <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_category: {
    type: 'category',
    title: 'Másik kategória',
    template: 'Ez egy másik kategóriába tartozó olvasat. A helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  typo: {
    type: 'typo',
    title: 'Közel jó',
    template: 'Pár karakter csúszott el. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_reading: {
    type: 'unknown',
    title: 'Hibás olvasat',
    template: 'Ez nem a helyes olvasat. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  }
};

/* ---- 8) AUDIO MODUL — kategóriák + tier-ek + hibakódok (sorok 4718..4752) ---- */
// Audio-kategória meta (lobby-szűrőhöz nem kell, de a feedback használja)
const NIHONCORE_AUDIO_CATEGORIES = {
  date:    'Dátum',
  time:    'Időpont',
  verb:    'Ige',
  adj:     'Melléknév',
  pair:    'Minimal pair',
  number:  'Szám',
  weekday: 'Hét napja',
  phrase:  'Kifejezés'
};

// Nehézségi szintek — playback-sebesség hozzárendelve
const NIHONCORE_AUDIO_TIERS = [
  { id: 'beginner',     nameHu: 'Kezdő',    sub: 'lassú audio (0.75×)', speed: 0.75 },
  { id: 'intermediate', nameHu: 'Haladó',   sub: 'közel természetes (0.9×)', speed: 0.9 },
  { id: 'advanced',     nameHu: 'Profi',    sub: 'természetes tempó (1.0×)', speed: 1.0 }
];

// Audio-specifikus hibakódok
const NIHONCORE_AUDIO_ERROR_TYPES = {
  long_vowel: {
    type: 'audio',
    title: 'Hosszú magánhangzó',
    template: 'Nem hallottad meg a <strong>hosszú magánhangzót</strong>. A japánban a hanghossz <em>jelentéskülönbséget</em> okoz: <strong class="pfe-jp-ok">{correct}</strong> ≠ {chosen}.'
  },
  sokuon: {
    type: 'audio',
    title: 'Kis っ (促音)',
    template: 'Lemaradt a <strong>kis っ</strong> (sokuon). Figyelj a rövid szünetre a hang előtt: <strong class="pfe-jp-ok">{correct}</strong> ≠ {chosen}.'
  },
  mora: {
    type: 'audio',
    title: 'Mora-hiba',
    template: 'Egy mora elcsúszott. A japán ritmus mora-alapú — minden mora azonos hosszú: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_choice: {
    type: 'audio',
    title: 'Hibás felismerés',
    template: 'Nem ezt hallottad. A helyes: <strong class="pfe-jp-ok">{correct}</strong> ({romaji}) — {meaning}.'
  }
};

/* ---- 9) GRAMMAR MODUL — kategóriák + hibakódok (sorok 4755..4799) ---- */
/* ====================================================
   ── 8) GRAMMAR PATTERNS modul — V5 P1 ──────────────
   ────────────────────────────────────────────────────
   Sentence-szintű grammatikai minták (N4 magvető + N3
   bevezető). NEM ragozás (azt a Ragozó modul fedi) és
   NEM partikula (azt a Mondat-Mester). Ez a "mintát
   ismerd fel + építsd be" réteg.

   Pattern séma:
     id            — egyedi (SRS-kulcs alapja: 'grammar:<id>')
     label         — japán pattern-címke (pl. '〜たい')
     jlpt          — 'N5' | 'N4' | 'N3'
     category      — desire | conditional | obligation | permission |
                     prohibition | opinion | intention | concurrent |
                     contrast | hearsay | change
     summary       — egysoros magyar leírás
     structure     — ragozási sablon (str)
     explanation   — bővebb magyar magyarázat
     examples[]    — 2 példa minimum:
       jp          — <ruby><rt> furigana-val
       kana        — tisztán hiragana (TTS-barát)
       romaji      — Hepburn
       hu          — magyar fordítás
       cloze       — ugyanaz mint jp, de a pattern helye ___BLANK___
       clozeAnswer — a blank kana-tartalma
     contrasts[]   — kapcsolódó pattern-id-k (Recognition distraktorhoz)

   STARTER SZETT — szándékosan kicsi (15 minta). A teljes
   feltöltés a legutolsó lépés (lásd CONTENT_LOAD_GUIDE.md).
   ==================================================== */

const NIHONCORE_GRAMMAR_CATEGORIES = [
  { id: 'desire',      nameHu: 'Vágy',           emoji: '💭', hint: 'akarni / szeretne' },
  { id: 'conditional', nameHu: 'Feltétel',       emoji: '🔀', hint: 'ha …, akkor' },
  { id: 'obligation',  nameHu: 'Kötelesség',     emoji: '⛓️', hint: 'muszáj / kell' },
  { id: 'permission',  nameHu: 'Engedély',       emoji: '✅', hint: 'lehet / nem kell' },
  { id: 'prohibition', nameHu: 'Tiltás',         emoji: '🚫', hint: 'nem szabad' },
  { id: 'opinion',     nameHu: 'Vélemény',       emoji: '💬', hint: 'azt gondolom' },
  { id: 'intention',   nameHu: 'Szándék',        emoji: '🎯', hint: 'tervezem' },
  { id: 'concurrent',  nameHu: 'Párhuzam',       emoji: '🔁', hint: 'miközben' },
  { id: 'contrast',    nameHu: 'Ellentét',       emoji: '↔️', hint: 'annak ellenére' },
  { id: 'hearsay',     nameHu: 'Hallomás',       emoji: '🗣️', hint: 'állítólag' },
  { id: 'change',      nameHu: 'Változás',       emoji: '🌱', hint: 'kezd vmi lenni' }
];


/* ---- 10) NIHONCORE_GRAMMAR_ERROR_TYPES (sorok 5097..5125) ---- */
// Hibakód-katalógus a Grammar Patterns modulhoz
const NIHONCORE_GRAMMAR_ERROR_TYPES = {
  wrong_pattern: {
    type: 'pattern',
    title: 'Másik mintázat',
    template: 'Ez egy másik mintázat. Itt a helyes: <strong class="pfe-jp-ok">{correct}</strong> — {summary}.'
  },
  contrast_confused: {
    type: 'pattern',
    title: 'Rokon mintázattal kevered',
    template: 'A <strong class="pfe-jp-ok">{chosen}</strong> hasonló, de itt a <strong class="pfe-jp-ok">{correct}</strong> kell — {summary}.'
  },
  typo: {
    type: 'typo',
    title: 'Közel jó',
    template: 'Pár karakter csúszott el. Helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  wrong_form: {
    type: 'form',
    title: 'Másik morféma',
    template: 'Más formát írtál a blank helyére. A helyes: <strong class="pfe-jp-ok">{correct}</strong>.'
  },
  empty: {
    type: 'empty',
    title: 'Nincs válasz',
    template: 'A helyes blank-tartalom: <strong class="pfe-jp-ok">{correct}</strong>.'
  }
};

