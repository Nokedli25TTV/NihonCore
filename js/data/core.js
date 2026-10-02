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
    description: 'Létezés, étkezés, vásárlás és mozgás kifejezése japánul, udvarias masu-alakban: jelen és múlt, állítás és tagadás, kérdés. 8 mindennapi igével.',
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
        subtitle: 'Magyarázat + interaktív bemutató',
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
        subtitle: 'Rakd össze az alakot kapcsolókkal',
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
        subtitle: 'Gyorskör — 5 mp / kártya',
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
        subtitle: 'Szókártyák böngészése',
        unlocked: true
      },
      2: {
        type: 'counter-hybrid',
        name: 'Alkalmazás',
        subtitle: 'Számláló kiválasztása + olvasat beírása',
        unlocked: true
      },
      3: {
        type: 'counter-mastery',
        name: 'Automatizálás',
        subtitle: 'Szabad beírás, részletes hibajelzéssel',
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
  },
  {
    id: 'kara', jp: 'から', romaji: 'kara',
    hint: 'Kiindulópont ("-tól, -ból") vagy ok ("mert")',
    shortPurpose: 'kiindulópont / ok',
    fullExplain: 'kiindulópontot jelöl (honnan, kitől, mettől), mondat végén pedig okot ad meg ("mert")'
  },
  {
    id: 'made', jp: 'まで', romaji: 'made',
    hint: 'Végpont ("-ig")',
    shortPurpose: 'végpont',
    fullExplain: 'végpontot jelöl (meddig: hely vagy idő)'
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
  },
  // -aru tiszteletteljes igék (honorific 5-ös: kudasaru, ossharu, nasaru, irassharu, gozaru)
  // a masu-stem ('i' oszlop) NEM くださり (rendszeres godan-ru), hanem ください — utána
  // jön az ます/ません/ました/ませんでした. Engine: composeStemSuffix override-eli, ha a
  // rule.stemColumn === 'i' és a verb id szerepel ebben a táblában.
  // Jelenleg csak kudasaru-t használja a dataset; a többi 4 honorific verb felvehetô lesz.
  irregularMasuStem: {
    'kudasaru': { kana: 'ください', romaji: 'kudasai' }
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

/* ====================================================
   TANULÁSI ÚT — a kezdőlap térképe
   ----------------------------------------------------
   Az út a Dekiru 1 tankönyv leckéit követi: egy fejezet = egy lecke.
   Minden lecke egy magyarázó lépéssel indul (pages/lesson.html, a szövege a
   js/data/course.js-ben), utána a leckéhez illő gyakorló lépések jönnek a
   meglévő modulokból, előre beállított körrel.
   A Dekiru 1 (1–24. lecke) után három általános, összefoglaló lépés áll
   (hallás, minták, szabad fordítás), majd a Dekiru 2 leckéi (25–48.) jönnek.

   NIHONCORE_PATH — lépések:
     id       egyedi kulcs (a haladás ezzel mentődik)
     glyph    a lépés jele a térképen
     title / desc
     module   a NihonCoreStats modul-kulcsa (ehhez a modulhoz tartozó
              befejezett kör teljesíti a lépést; a magyarázó lépésnél 'lesson')
     href     a megnyitandó oldal (a gyökérhez képest)
     level    'zero' = csak a nulláról indulónak kötelező (kana);
              aki már olvas kanát, annál „átugorva" jelenik meg
     preset   a modul beállításaira ültetett kör:
                only: { térkép-kulcs: [bekapcsolt elemek] }  — a többi ki
                set:  { skalár kulcs: érték }
              Mondat-Mester: level, mode, particlesOnly / particlesAny,
                             idRanges: [[tól, ig], …] az s_n5_NNN mondatokra,
                             ids: [mondat-azonosítók] — pontosan ezek a mondatok
              Nyelvtani minták: patterns: [minta-azonosítók] — pontosan ezek a minták
              Számlálók:     counters: [számláló-azonosítók]
              Alap igék:     category: 'existence' | 'consumption' | 'movement'
   A lépés akkor „kész", ha az innen indított kör legalább 60%-os.

   NIHONCORE_PATH_UNITS — fejezetek (a térkép ezek szerint tagol):
     id · kicker (a fejléc kis címkéje) · title · sub · steps: [lépés-azonosítók]
   ==================================================== */
const NIHONCORE_PATH = [
  // ── Előkészítő: az írás ──
  { id: 'kana-hira', glyph: 'あ', title: 'Hiragana',
    desc: 'A 46 alapjel: ezzel olvasol el mindent, ami ezután jön.',
    module: 'kana', href: 'pages/kana.html', level: 'zero',
    preset: { set: { script: 'hiragana' } } },
  { id: 'kana-kata', glyph: 'ア', title: 'Katakana',
    desc: 'A jövevényszavak írása: パソコン, レストラン.',
    module: 'kana', href: 'pages/kana.html', level: 'zero',
    preset: { set: { script: 'katakana' } } },

  // ── 1. lecke ──
  { id: 'l1-lesson', glyph: '読', title: 'Magyarázat: です, は, の',
    desc: 'Elolvasod, hogyan épül fel az első mondat, aztán tíz kérdéssel ellenőrzöd.',
    module: 'lesson', href: 'pages/lesson.html?id=l1' },
  { id: 'first-sentences', glyph: '文', title: 'Első mondatok',
    desc: 'は, の, か, も: töltsd ki a hiányzó partikulát.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', particlesOnly: ['は', 'の', 'か', 'も'] } },

  // ── 2. lecke ──
  { id: 'l2-lesson', glyph: '読', title: 'Magyarázat: これ, この, ここ',
    desc: 'Ez, az, amaz; itt, ott; kié; és a tagadás.',
    module: 'lesson', href: 'pages/lesson.html?id=l2' },
  { id: 'l2-things', glyph: '此', title: 'Ez és az: これ, この',
    desc: 'Tárgyak megnevezése és a birtokos の.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', idRanges: [[43, 62], [93, 122]] } },
  { id: 'l2-places', glyph: '所', title: 'Hol van? ここ, そこ, あそこ',
    desc: 'Helyek megmutatása és a どこ kérdés.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', idRanges: [[63, 92]] } },

  // ── 3. lecke ──
  { id: 'l3-lesson', glyph: '読', title: 'Magyarázat: あります, います',
    desc: 'Mi hol van, ki van otthon, hányan vagytok.',
    module: 'lesson', href: 'pages/lesson.html?id=l3' },
  { id: 'basic-verbs', glyph: '在', title: 'Van és nincs',
    desc: 'あります és います: jelen és múlt, állítás és tagadás.',
    module: 'arimasu-imasu', href: 'pages/module.html?id=arimasu-imasu',
    preset: { category: 'existence' } },
  { id: 'l3-where', glyph: '上', title: 'Rajta, alatta, benne',
    desc: '〜の うえ / した / なか に: helymeghatározás mondatban.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', idRanges: [[123, 152]] } },

  // ── 4. lecke ──
  { id: 'l4-lesson', glyph: '読', title: 'Magyarázat: 〜をください, óra, napok',
    desc: 'Kérés a boltban, számlálók, idő, mettől meddig.',
    module: 'lesson', href: 'pages/lesson.html?id=l4' },
  { id: 'counters', glyph: '数', title: 'Számlálók',
    desc: 'つ, 本, 枚, 冊: mit mivel számolunk.',
    module: 'counter', href: 'pages/module.html?id=szamlalok',
    preset: { counters: ['tsu', 'hon', 'mai', 'satsu'] } },
  { id: 'datetime', glyph: '時', title: 'Óra és a hét napjai',
    desc: 'なんじ, なんようび: a rendhagyó olvasatokkal.',
    module: 'datetime', href: 'pages/datetime.html',
    preset: { only: { categories: ['weekdays', 'times'] }, set: { mode: 'recognition' } } },

  // ── 5. lecke ──
  { id: 'l5-lesson', glyph: '読', title: 'Magyarázat: 〜ます, へ, で, と',
    desc: 'Az ige négy udvarias alakja; hová, mivel, kivel, mikor.',
    module: 'lesson', href: 'pages/lesson.html?id=l5' },
  { id: 'l5-masu', glyph: '動', title: 'A ます-alak négy formája',
    desc: '〜ます, 〜ません, 〜ました, 〜ませんでした.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['masu', 'masen', 'mashita', 'masen_deshita'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },
  { id: 'l5-move', glyph: '行', title: 'Megyek, jövök, hazamegyek',
    desc: '行きます, 来ます, 帰ります: mind a négy alakban.',
    module: 'arimasu-imasu', href: 'pages/module.html?id=arimasu-imasu',
    preset: { category: 'movement' } },
  { id: 'l5-dates', glyph: '日', title: 'Hónapok és napok',
    desc: '〜月〜日: ついたち, ふつか, みっか…',
    module: 'datetime', href: 'pages/datetime.html',
    preset: { only: { categories: ['months', 'days'] }, set: { mode: 'recognition' } } },

  // ── 6. lecke ──
  { id: 'l6-lesson', glyph: '読', title: 'Magyarázat: を, で, 〜ませんか',
    desc: 'Mit csinálsz, hol csinálod; meghívás és javaslat.',
    module: 'lesson', href: 'pages/lesson.html?id=l6' },
  { id: 'l6-daily', glyph: '食', title: 'Eszem, iszom, veszek',
    desc: '食べます, 飲みます, 買います: mind a négy alakban.',
    module: 'arimasu-imasu', href: 'pages/module.html?id=arimasu-imasu',
    preset: { category: 'consumption' } },
  { id: 'particles', glyph: '助', title: 'Partikulák',
    desc: 'を, に, で, へ, と, が: mit, hol, hová, kivel.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', particlesAny: ['を', 'に', 'で', 'へ', 'と', 'が'] } },
  { id: 'word-order', glyph: '順', title: 'Szórend',
    desc: 'Rakd össze a mondatot az összekevert szavakból.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'puzzle' } },

  // ── 7. lecke ──
  { id: 'l7-lesson', glyph: '読', title: 'Magyarázat: 〜が好きです, から',
    desc: 'Szeretem, nem szeretem; miért; milyen gyakran.',
    module: 'lesson', href: 'pages/lesson.html?id=l7' },
  { id: 'l7-ga', glyph: '好', title: 'A が partikula',
    desc: 'Szeretem, van, értem: mondatok が-val.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N5', mode: 'particles', particlesAny: ['が'] } },

  // ── 8. lecke ──
  { id: 'l8-lesson', glyph: '読', title: 'Magyarázat: melléknevek, 〜たい',
    desc: 'い- és な-melléknevek, tagadás, „szeretnék…".',
    module: 'lesson', href: 'pages/lesson.html?id=l8' },
  { id: 'adjectives', glyph: '形', title: 'Melléknevek',
    desc: 'I- és na-melléknevek: állítás, tagadás, jelzőként.',
    module: 'adjectives', href: 'pages/adjectives.html',
    preset: { only: { forms: ['i_present_affirmative', 'i_present_negative', 'na_noun_modifier', 'na_present_affirmative', 'na_present_negative'] },
              set: { mode: 'recognition' } } },

  // ── 9. lecke ──
  { id: 'l9-lesson', glyph: '読', title: 'Magyarázat: 〜かった, 〜でした, て-alak',
    desc: 'Múlt idő a mellékneveknél, és a て-alak, ami mondatokat fűz össze.',
    module: 'lesson', href: 'pages/lesson.html?id=l9' },
  { id: 'l9-adj-past', glyph: '昔', title: 'Melléknevek múlt időben',
    desc: '〜かったです, 〜くなかったです, 〜でした: milyen volt?',
    module: 'adjectives', href: 'pages/adjectives.html',
    preset: { only: { forms: ['i_past_affirmative', 'i_past_negative', 'na_past_affirmative', 'na_past_negative'] },
              set: { mode: 'recognition' } } },
  { id: 'l9-te', glyph: 'て', title: 'A て-alak',
    desc: 'って, んで, いて, して: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['te'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 10. lecke ──
  { id: 'l10-lesson', glyph: '読', title: 'Magyarázat: より, いちばん, 〜てください',
    desc: 'Összehasonlítás, kérés, „miután", „kipróbálom".',
    module: 'lesson', href: 'pages/lesson.html?id=l10' },
  { id: 'l10-te', glyph: '書', title: 'て-alak: írd be',
    desc: 'A 〜てください, 〜てから, 〜てみます alapja: most te írod le.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['te'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 11. lecke ──
  { id: 'l11-lesson', glyph: '読', title: 'Magyarázat: た-alak, ない-alak, tanács',
    desc: 'A rövid alakok; 〜たほうがいい, 〜ないでください, 〜んです.',
    module: 'lesson', href: 'pages/lesson.html?id=l11' },
  { id: 'verb-forms', glyph: '活', title: 'ない- és た-alak',
    desc: 'A rövid tagadás és a rövid múlt: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['nai', 'ta'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 12. lecke ──
  { id: 'l12-lesson', glyph: '読', title: 'Magyarázat: közvetlen stílus, 〜ています',
    desc: 'Baráti beszéd, folyamat és állapot, mondat a főnév előtt.',
    module: 'lesson', href: 'pages/lesson.html?id=l12' },
  { id: 'l12-forms', glyph: '短', title: 'Rövid alakok: írd be',
    desc: 'ない-, て- és た-alak vegyesen, a ruházkodás igéivel is.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['nai', 'te', 'ta'], themes: ['daily', 'movement', 'clothing'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },
  { id: 'l12-teiru', glyph: '今', title: 'Éppen most: 〜ています',
    desc: 'Rakd össze a 〜ています-es és a baráti stílusú mondatokat.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_001', 's_n4_004', 's_n4_006', 's_n4_008', 's_n4_009', 's_n4_010', 's_n4_011'] } },

  // ── 13. lecke ──
  { id: 'l13-lesson', glyph: '読', title: 'Magyarázat: 〜ので, あげます, もらいます',
    desc: 'Indoklás, választás, adás és kapás.',
    module: 'lesson', href: 'pages/lesson.html?id=l13' },
  { id: 'l13-giving', glyph: '贈', title: 'Ki kinek ad?',
    desc: 'に, を, が, から: partikulák az adás-kapás mondataiban.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'particles',
              ids: ['s_n4_002', 's_n4_020', 's_n4_dyn_001', 's_n4_dyn_002', 's_n4_dyn_003', 's_n4_dyn_017'] } },
  { id: 'l13-verbs', glyph: '貸', title: 'Adok, kapok, kölcsönadok',
    desc: 'あげる, もらう, くれる, 貸す, 返す: a legfontosabb alakokban.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['masu', 'mashita', 'te', 'ta'], themes: ['giving'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 14. lecke ──
  { id: 'l14-lesson', glyph: '読', title: 'Magyarázat: もう, まだ, 〜と思います',
    desc: 'Már és még nem; előtte, utána; vélemény, vágy, szándék.',
    module: 'lesson', href: 'pages/lesson.html?id=l14' },
  { id: 'l14-patterns', glyph: '思', title: 'Vágy, vélemény, szándék',
    desc: '〜たい, 〜と思う, 〜つもり: ismerd fel, mit fejez ki a mondat.',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { only: { categories: ['desire', 'opinion', 'intention'] }, set: { mode: 'recognition' } } },
  { id: 'l14-plans', glyph: '予', title: 'Tervek mondatban',
    desc: 'つもりです, 〜たいです, もう, まだ: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_011', 's_n4_021', 's_n4_vol_001', 's_n4_vol_002', 's_n4_vol_005', 's_n4_vol_006',
                    's_n4_vol_008', 's_n4_vol_009', 's_n4_vol_013', 's_n4_vol_018'] } },

  // ── 15. lecke ──
  { id: 'l15-lesson', glyph: '読', title: 'Magyarázat: 〜でしょう, 〜てしまう, 〜たり',
    desc: 'Feltevés, sajnálkozás, felsorolás, ok, engedélykérés.',
    module: 'lesson', href: 'pages/lesson.html?id=l15' },
  { id: 'l15-permission', glyph: '可', title: 'Szabad? 〜てもいいですか',
    desc: 'Engedélyt kérsz és adsz: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_prm_001', 's_n4_prm_004', 's_n4_prm_007', 's_n4_prm_009', 's_n4_prm_011',
                    's_n4_prm_013', 's_n4_prm_015', 's_n4_prm_017', 's_n4_prm_019', 's_n4_prm_020'] } },

  // ── 16. lecke ──
  { id: 'l16-lesson', glyph: '読', title: 'Magyarázat: 〜こと, 〜たことがある, できます',
    desc: 'Hobbi, tapasztalat, képesség, tiszteleti kérés.',
    module: 'lesson', href: 'pages/lesson.html?id=l16' },
  { id: 'l16-experience', glyph: '験', title: 'Csináltam már: 〜たことがあります',
    desc: 'Tapasztalat állítva, tagadva, kérdezve: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_app_006', 's_n4_app_007', 's_n4_app_008', 's_n4_app_010', 's_n4_app_013',
                    's_n4_app_016', 's_n4_app_019'] } },

  // ── 17. lecke ──
  { id: 'l17-lesson', glyph: '読', title: 'Magyarázat: 〜とき, 〜てはいけません',
    desc: 'Amikor…; mi szabad és mi tilos; két állítás egy mondatban.',
    module: 'lesson', href: 'pages/lesson.html?id=l17' },
  { id: 'l17-rules', glyph: '禁', title: 'Tilos! 〜てはいけません',
    desc: 'Szabályok és tilalmak: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_prm_002', 's_n4_prm_003', 's_n4_prm_005', 's_n4_prm_006', 's_n4_prm_008',
                    's_n4_prm_010', 's_n4_prm_012', 's_n4_prm_014', 's_n4_prm_016', 's_n4_prm_018'] } },

  // ── 18. lecke ──
  { id: 'l18-lesson', glyph: '読', title: 'Magyarázat: 〜かもしれません, 〜なります',
    desc: 'Lehet, hogy…; változás; elhatározás; tiszteleti adás-kapás.',
    module: 'lesson', href: 'pages/lesson.html?id=l18' },
  { id: 'l18-change', glyph: '変', title: 'Mi lett belőle? 〜なります',
    desc: '〜くなります, 〜になります: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_chg_001', 's_n4_chg_002', 's_n4_chg_003', 's_n4_chg_004', 's_n4_chg_005',
                    's_n4_chg_015', 's_n4_chg_017'] } },

  // ── 19. lecke ──
  { id: 'l19-lesson', glyph: '読', title: 'Magyarázat: 〜なければなりません',
    desc: 'Kell és nem kell; hogyan és merre mész; だけ és しか.',
    module: 'lesson', href: 'pages/lesson.html?id=l19' },
  { id: 'l19-nai', glyph: '要', title: 'ない-alak: írd be',
    desc: 'A 〜なければなりません és a 〜なくてもいい alapja.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['nai'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },
  { id: 'l19-patterns', glyph: '則', title: 'Szabad, tilos, kell',
    desc: '〜てもいい, 〜てはいけない, 〜なければならない: mit fejez ki a mondat?',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { only: { categories: ['permission', 'prohibition', 'obligation'] }, set: { mode: 'recognition' } } },

  // ── 20. lecke ──
  { id: 'l20-lesson', glyph: '読', title: 'Magyarázat: kinyitom és kinyílik',
    desc: 'Tárgyas és tárgyatlan igék; állapot; A か B; 〜という.',
    module: 'lesson', href: 'pages/lesson.html?id=l20' },
  { id: 'l20-pairs', glyph: '対', title: 'を vagy が? Igepárok',
    desc: 'Valaki csinálja (を) vagy magától történik (が)?',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'particles',
              ids: ['s_n4_trn_001', 's_n4_trn_002', 's_n4_trn_003', 's_n4_trn_004', 's_n4_trn_005', 's_n4_trn_006',
                    's_n4_trn_008', 's_n4_trn_010', 's_n4_trn_012', 's_n4_trn_013', 's_n4_trn_014', 's_n4_trn_016'] } },
  { id: 'l20-verbs', glyph: '開', title: 'Igepárok alakjai',
    desc: '開ける / 開く, 消す / 消える: a legfontosabb alakokban.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['masu', 'mashita', 'te'], themes: ['transitivity'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 21. lecke ──
  { id: 'l21-lesson', glyph: '読', title: 'Magyarázat: 〜くします, 〜てあります',
    desc: 'Valamilyenné tesz; el van készítve; úgy hívják, azt mondta.',
    module: 'lesson', href: 'pages/lesson.html?id=l21' },
  { id: 'l21-te', glyph: '置', title: 'Igepárok て-alakja',
    desc: 'A 〜てあります és a 〜ています alapja: most te írod le.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['te'], themes: ['transitivity'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 22. lecke ──
  { id: 'l22-lesson', glyph: '読', title: 'Magyarázat: 〜てあげます, 〜ておきます',
    desc: 'Szívességek; előre megteszem; közben.',
    module: 'lesson', href: 'pages/lesson.html?id=l22' },
  { id: 'l22-favors', glyph: '助', title: 'Szívességek mondatban',
    desc: '〜てあげます, 〜てくれます, 〜てもらいます: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_dyn_004', 's_n4_dyn_005', 's_n4_dyn_006', 's_n4_dyn_007', 's_n4_dyn_011', 's_n4_dyn_012',
                    's_n4_dyn_013', 's_n4_dyn_015', 's_n4_dyn_016', 's_n4_dyn_018', 's_n4_dyn_020'] } },

  // ── 23. lecke ──
  { id: 'l23-lesson', glyph: '読', title: 'Magyarázat: udvarias kérések, 〜の',
    desc: 'Tiszteleti szívességek; kérés; igéből főnév; まだ és もう.',
    module: 'lesson', href: 'pages/lesson.html?id=l23' },
  { id: 'l23-te', glyph: '願', title: 'Kérés előtt: て-alak',
    desc: '貸して, 教えて, 送って: az udvarias kérések alapja.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['te'], themes: ['giving'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 24. lecke ──
  { id: 'l24-lesson', glyph: '読', title: 'Magyarázat: 〜てきます, 〜ていきます',
    desc: 'Felém és tőlem el; változás eddig és ezután; állapotok.',
    module: 'lesson', href: 'pages/lesson.html?id=l24' },
  { id: 'l24-state', glyph: '止', title: 'Magától történt',
    desc: 'が + tárgyatlan ige, 〜ています: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_trn_002', 's_n4_trn_004', 's_n4_trn_006', 's_n4_trn_008', 's_n4_trn_010',
                    's_n4_trn_012', 's_n4_trn_014', 's_n4_trn_016', 's_n4_trn_018', 's_n4_trn_019'] } },

  // ── A Dekiru 1 után: összefoglaló gyakorlás ──
  { id: 'listening', glyph: '聴', title: 'Hallás',
    desc: 'Hosszú és rövid hangok, kis っ: halld meg a különbséget.',
    module: 'listening', href: 'pages/listening.html',
    preset: { set: { mode: 'recognition' } } },
  { id: 'patterns', glyph: '型', title: 'Nyelvtani minták',
    desc: '〜たい, 〜たら, 〜てもいい: mondatszintű szerkezetek.',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { set: { mode: 'recognition' } } },
  { id: 'production', glyph: '作', title: 'Szabad fordítás',
    desc: 'Magyar mondatból japánt írsz, segítség nélkül.',
    module: 'production', href: 'pages/production.html' },

  // ════════ DEKIRU 2 (25–48. lecke) ════════

  // ── 25. lecke ──
  { id: 'l25-lesson', glyph: '読', title: 'Magyarázat: 〜だろう, 〜はずです',
    desc: 'Feltevés és megalapozott várakozás; kérdés a mondatban.',
    module: 'lesson', href: 'pages/lesson.html?id=l25' },

  // ── 26. lecke ──
  { id: 'l26-lesson', glyph: '読', title: 'Magyarázat: 〜たら, szándékos alak',
    desc: 'Ha…; csináljuk!; azt tervezem; határidő.',
    module: 'lesson', href: 'pages/lesson.html?id=l26' },
  { id: 'l26-volitional', glyph: '志', title: 'Szándékos alak',
    desc: '行こう, 食べよう, しよう: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['volitional'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },
  { id: 'l26-tara', glyph: '夢', title: 'Ha… és azt tervezem…',
    desc: '〜たら, 〜ようと思っています: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_cnd_001', 's_n4_cnd_008', 's_n4_cnd_012', 's_n4_cnd_013', 's_n4_cnd_016', 's_n4_cnd_020',
                    's_n4_vol_004', 's_n4_vol_007', 's_n4_vol_011', 's_n4_vol_016', 's_n4_vol_019'] } },

  // ── 27. lecke ──
  { id: 'l27-lesson', glyph: '読', title: 'Magyarázat: ható alak',
    desc: 'Tudok, lehet; egészen biztos; például; 〜さ.',
    module: 'lesson', href: 'pages/lesson.html?id=l27' },
  { id: 'l27-potential', glyph: '能', title: 'Ható alak',
    desc: '書けます, 食べられます, できます: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['potential'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },
  { id: 'l27-potential-w', glyph: '可', title: 'Ható alak: írd be',
    desc: 'Most te képzed a ható alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['potential'], themes: ['daily', 'movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 28. lecke ──
  { id: 'l28-lesson', glyph: '読', title: 'Magyarázat: 〜ば, 〜なら',
    desc: 'Feltételek; udvarias bolti beszéd; indokok; bizonyosság.',
    module: 'lesson', href: 'pages/lesson.html?id=l28' },
  { id: 'l28-if', glyph: '条', title: 'Feltételek mondatban',
    desc: '〜ば és 〜なら: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_cnd_002', 's_n4_cnd_003', 's_n4_cnd_005', 's_n4_cnd_006', 's_n4_cnd_007', 's_n4_cnd_010',
                    's_n4_cnd_011', 's_n4_cnd_014', 's_n4_cnd_015', 's_n4_cnd_017', 's_n4_cnd_018'] } },
  { id: 'l28-patterns', glyph: '若', title: 'たら, ば, なら',
    desc: 'A három feltételes szerkezet: mit fejez ki a mondat?',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { patterns: ['tara', 'eba', 'nara'], set: { mode: 'recognition' } } },

  // ── 29. lecke ──
  { id: 'l29-lesson', glyph: '読', title: 'Magyarázat: 〜ところ, 〜について',
    desc: 'Éppen készülök, csinálom, most fejeztem be; üzenet átadása.',
    module: 'lesson', href: 'pages/lesson.html?id=l29' },

  // ── 30. lecke ──
  { id: 'l30-lesson', glyph: '読', title: 'Magyarázat: 〜のに, 〜によって',
    desc: 'Pedig…; nem baj, ha…; országonként más.',
    module: 'lesson', href: 'pages/lesson.html?id=l30' },
  { id: 'l30-patterns', glyph: '逆', title: 'Pedig, szabad, nem kell',
    desc: '〜のに, 〜てもいい, 〜なくてもいい: mit fejez ki a mondat?',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { patterns: ['noni', 'te_mo_ii', 'nakute_mo_ii'], set: { mode: 'recognition' } } },

  // ── 31. lecke ──
  { id: 'l31-lesson', glyph: '読', title: 'Magyarázat: 〜と, 〜ようです',
    desc: 'Útbaigazítás; látszik, hallatszik; úgy tűnik; már tudok.',
    module: 'lesson', href: 'pages/lesson.html?id=l31' },
  { id: 'l31-senses', glyph: '見', title: 'Látszik, hallatszik, úgy tűnik',
    desc: '見えます, 聞こえます, 〜と, 〜ようです: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_chg_006', 's_n4_chg_007', 's_n4_chg_008', 's_n4_chg_009', 's_n4_chg_010', 's_n4_chg_014',
                    's_n4_cnd_004', 's_n4_cnd_009', 's_n4_cnd_019', 's_n4_app_004', 's_n4_app_014', 's_n4_app_017'] } },

  // ── 32. lecke ──
  { id: 'l32-lesson', glyph: '読', title: 'Magyarázat: 〜ても, 〜ために',
    desc: 'Akkor is, ha…; úgy alakult; ez a szabály; cél és ok.',
    module: 'lesson', href: 'pages/lesson.html?id=l32' },
  { id: 'l32-patterns', glyph: '譲', title: 'Ha, akkor is ha, pedig',
    desc: '〜たら, 〜ても, 〜のに: mit fejez ki a mondat?',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { patterns: ['tara', 'temo', 'noni'], set: { mode: 'recognition' } } },

  // ── 33. lecke ──
  { id: 'l33-lesson', glyph: '読', title: 'Magyarázat: 〜そうです, 〜みたい',
    desc: 'Minek látszik; olyan, mint; körülbelül; íz, illat, hang.',
    module: 'lesson', href: 'pages/lesson.html?id=l33' },
  { id: 'l33-looks', glyph: '様', title: 'Minek látszik?',
    desc: '〜そうです, 〜みたいです: rakd össze a mondatot.',
    module: 'practice', href: 'pages/practice.html',
    preset: { level: 'N4', mode: 'puzzle',
              ids: ['s_n4_app_001', 's_n4_app_002', 's_n4_app_003', 's_n4_app_005', 's_n4_app_009',
                    's_n4_app_011', 's_n4_app_012', 's_n4_app_015', 's_n4_app_018', 's_n4_app_020'] } },

  // ── 34. lecke ──
  { id: 'l34-lesson', glyph: '読', title: 'Magyarázat: hallomás, 〜らしい',
    desc: 'Azt hallottam; … szerint; úgy tudni.',
    module: 'lesson', href: 'pages/lesson.html?id=l34' },

  // ── 35. lecke ──
  { id: 'l35-lesson', glyph: '読', title: 'Magyarázat: 〜方, 〜かわりに, 〜まま',
    desc: 'Hogyan kell; helyett; úgy, ahogy van.',
    module: 'lesson', href: 'pages/lesson.html?id=l35' },

  // ── 36. lecke ──
  { id: 'l36-lesson', glyph: '読', title: 'Magyarázat: szenvedő alak',
    desc: 'Megrendezik, megépítették; ki készítette; nagyjából mettől meddig.',
    module: 'lesson', href: 'pages/lesson.html?id=l36' },
  { id: 'l36-passive', glyph: '受', title: 'Szenvedő alak',
    desc: '書かれます, 食べられます, されます: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['passive'], themes: ['daily'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 37. lecke ──
  { id: 'l37-lesson', glyph: '読', title: 'Magyarázat: megdicsértek, elloptak',
    desc: 'Szenvedő mondat emberrel; kellemetlenség; 〜おかげで.',
    module: 'lesson', href: 'pages/lesson.html?id=l37' },
  { id: 'l37-passive-w', glyph: '被', title: 'Szenvedő alak: írd be',
    desc: 'Most te képzed a szenvedő alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['passive'], themes: ['daily'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 38. lecke ──
  { id: 'l38-lesson', glyph: '読', title: 'Magyarázat: tiszteleti nyelv',
    desc: 'お〜になります, いらっしゃいます, ご〜ください; 〜うちに.',
    module: 'lesson', href: 'pages/lesson.html?id=l38' },
  { id: 'l38-honorific', glyph: '敬', title: 'Tiszteleti alak a mozgás igéivel',
    desc: '来られます, 帰られます, 行かれます: ugyanaz az alak, tisztelettel.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['passive'], themes: ['movement'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 39. lecke ──
  { id: 'l39-lesson', glyph: '読', title: 'Magyarázat: szerény nyelv',
    desc: 'お〜します, 参ります, 申します; könnyű, nehéz, túl sok.',
    module: 'lesson', href: 'pages/lesson.html?id=l39' },

  // ── 40. lecke ──
  { id: 'l40-lesson', glyph: '読', title: 'Magyarázat: bármi, elkezd, folytat',
    desc: 'いくら〜ても, 何でも; 〜始めます, 〜続けます; 〜そうです.',
    module: 'lesson', href: 'pages/lesson.html?id=l40' },

  // ── 41. lecke ──
  { id: 'l41-lesson', glyph: '読', title: 'Magyarázat: まるで〜よう, 〜しかない',
    desc: 'Mintha…; egész sok; nincs más hátra; nem hiába.',
    module: 'lesson', href: 'pages/lesson.html?id=l41' },

  // ── 42. lecke ──
  { id: 'l42-lesson', glyph: '読', title: 'Magyarázat: 〜にとって, 〜こそ',
    desc: 'Kinek a szemével; kiemelés; egyetértés és ellenvetés.',
    module: 'lesson', href: 'pages/lesson.html?id=l42' },

  // ── 43. lecke ──
  { id: 'l43-lesson', glyph: '読', title: 'Magyarázat: parancsoló alak',
    desc: 'Menj! Ne…!; hogy…, nehogy…; igyekszem; pontosan úgy.',
    module: 'lesson', href: 'pages/lesson.html?id=l43' },

  // ── 44. lecke ──
  { id: 'l44-lesson', glyph: '読', title: 'Magyarázat: 〜べきです, 〜ずに',
    desc: 'Mi a helyes; anélkül, hogy…; a beszéd váza.',
    module: 'lesson', href: 'pages/lesson.html?id=l44' },
  { id: 'l44-nai', glyph: '無', title: 'A 〜ずに alapja: ない-alak',
    desc: 'Állapot és öltözködés igéi: írd be a ない-alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['nai'], themes: ['state', 'clothing'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 45. lecke ──
  { id: 'l45-lesson', glyph: '読', title: 'Magyarázat: műveltető alak',
    desc: 'Megpróbál; megcsináltat valakivel; más érzései és vágyai.',
    module: 'lesson', href: 'pages/lesson.html?id=l45' },
  { id: 'l45-causative', glyph: '使', title: 'Műveltető alak',
    desc: '書かせます, 食べさせます, させます: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['causative'], themes: ['daily'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 46. lecke ──
  { id: 'l46-lesson', glyph: '読', title: 'Magyarázat: 〜なさい, 〜させてください',
    desc: 'Utasítás; elküld, hagy, megnevettet; nagyon udvarias engedélykérés.',
    module: 'lesson', href: 'pages/lesson.html?id=l46' },
  { id: 'l46-causative-w', glyph: '任', title: 'Műveltető alak: írd be',
    desc: 'Most te képzed a műveltető alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['causative'], themes: ['daily'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'mastery' } } },

  // ── 47. lecke ──
  { id: 'l47-lesson', glyph: '読', title: 'Magyarázat: 〜させられます',
    desc: 'Velem csináltatják: akaratom ellenére kellett megtennem.',
    module: 'lesson', href: 'pages/lesson.html?id=l47' },
  { id: 'l47-causpass', glyph: '強', title: 'Műveltető-szenvedő alak',
    desc: '食べさせられます, 書かせられます: ismerd fel a helyes alakot.',
    module: 'conjugation', href: 'pages/conjugation.html',
    preset: { only: { forms: ['causative_passive'], themes: ['daily'], groups: ['godan', 'ichidan', 'irregular'] },
              set: { mode: 'recognition' } } },

  // ── 48. lecke ──
  { id: 'l48-lesson', glyph: '読', title: 'Magyarázat: 〜ば〜ほど, 〜として',
    desc: 'Mi indította el; mi okozta; minél…, annál…; köszönet és búcsú.',
    module: 'lesson', href: 'pages/lesson.html?id=l48' },

  // ── A Dekiru 2 után: záró gyakorlás ──
  { id: 'final-cloze', glyph: '結', title: 'Minták kiegészítéssel',
    desc: 'Nyelvtani minták: most te írod be a hiányzó részt.',
    module: 'grammar', href: 'pages/grammar.html',
    preset: { set: { mode: 'cloze' } } },
  { id: 'final-pro', glyph: '耳', title: 'Mondatok hallás után',
    desc: 'Pro hallás: egész mondatot hallasz, és leírod.',
    module: 'listening', href: 'pages/listening.html',
    preset: { set: { mode: 'pro' } } }
];

const NIHONCORE_PATH_UNITS = [
  { id: 'u-kana', kicker: 'Előkészítő',          title: 'Az írás',             sub: 'Hiragana és katakana',
    steps: ['kana-hira', 'kana-kata'] },
  { id: 'u-l1',   kicker: 'Dekiru 1 · 1. lecke', title: 'Bemutatkozás',        sub: 'Ki vagyok, mivel foglalkozom: です, は, の, も, か',
    steps: ['l1-lesson', 'first-sentences'] },
  { id: 'u-l2',   kicker: 'Dekiru 1 · 2. lecke', title: 'Ez, az, amaz',        sub: 'これ, この, ここ; kié; tagadás',
    steps: ['l2-lesson', 'l2-things', 'l2-places'] },
  { id: 'u-l3',   kicker: 'Dekiru 1 · 3. lecke', title: 'Mi hol van?',         sub: 'あります és います, helyviszonyok, család',
    steps: ['l3-lesson', 'basic-verbs', 'l3-where'] },
  { id: 'u-l4',   kicker: 'Dekiru 1 · 4. lecke', title: 'Vásárlás és idő',     sub: '〜をください, számlálók, óra, a hét napjai',
    steps: ['l4-lesson', 'counters', 'datetime'] },
  { id: 'u-l5',   kicker: 'Dekiru 1 · 5. lecke', title: 'Hová, mikor, mivel?', sub: 'A ます-alak; へ, で, と; dátum',
    steps: ['l5-lesson', 'l5-masu', 'l5-move', 'l5-dates'] },
  { id: 'u-l6',   kicker: 'Dekiru 1 · 6. lecke', title: 'Mindennapok',         sub: 'を és で; 〜ませんか, 〜ましょう',
    steps: ['l6-lesson', 'l6-daily', 'particles', 'word-order'] },
  { id: 'u-l7',   kicker: 'Dekiru 1 · 7. lecke', title: 'Mit szeretsz?',       sub: '〜が好きです, から, よく és あまり',
    steps: ['l7-lesson', 'l7-ga'] },
  { id: 'u-l8',   kicker: 'Dekiru 1 · 8. lecke', title: 'Milyen?',             sub: 'い- és な-melléknevek, 〜たいです',
    steps: ['l8-lesson', 'adjectives'] },
  { id: 'u-l9',   kicker: 'Dekiru 1 · 9. lecke',  title: 'Milyen volt?',         sub: 'Múlt idejű melléknevek; a て-alak',
    steps: ['l9-lesson', 'l9-adj-past', 'l9-te'] },
  { id: 'u-l10',  kicker: 'Dekiru 1 · 10. lecke', title: 'Melyik a jobb?',       sub: 'より, いちばん; 〜てください, 〜てから, 〜てみます',
    steps: ['l10-lesson', 'l10-te'] },
  { id: 'u-l11',  kicker: 'Dekiru 1 · 11. lecke', title: 'Mit tegyek?',          sub: 'た- és ない-alak; tanács, tiltás, 〜んです',
    steps: ['l11-lesson', 'verb-forms'] },
  { id: 'u-l12',  kicker: 'Dekiru 1 · 12. lecke', title: 'Barátok között',       sub: 'Közvetlen stílus; 〜ています; jelzős szerkezet',
    steps: ['l12-lesson', 'l12-forms', 'l12-teiru'] },
  { id: 'u-l13',  kicker: 'Dekiru 1 · 13. lecke', title: 'Ajándék',              sub: '〜ので, 〜にします; あげます, くれます, もらいます',
    steps: ['l13-lesson', 'l13-giving', 'l13-verbs'] },
  { id: 'u-l14',  kicker: 'Dekiru 1 · 14. lecke', title: 'Tervek és vélemények', sub: 'もう és まだ; 〜と思います, 〜がほしい, 〜つもりです',
    steps: ['l14-lesson', 'l14-patterns', 'l14-plans'] },
  { id: 'u-l15',  kicker: 'Dekiru 1 · 15. lecke', title: 'Találkozunk?',         sub: '〜でしょう, 〜てしまいます, 〜たり; 〜てもいいですか',
    steps: ['l15-lesson', 'l15-permission'] },
  { id: 'u-l16',  kicker: 'Dekiru 1 · 16. lecke', title: 'Hobbi és tapasztalat', sub: '〜こと, 〜たことがあります, 〜ことができます',
    steps: ['l16-lesson', 'l16-experience'] },
  { id: 'u-l17',  kicker: 'Dekiru 1 · 17. lecke', title: 'Szabad és tilos',      sub: '〜とき; 〜てはいけません; A は B で、C は D です',
    steps: ['l17-lesson', 'l17-rules'] },
  { id: 'u-l18',  kicker: 'Dekiru 1 · 18. lecke', title: 'Készülődés',           sub: '〜かもしれません; 〜なります; 〜ことにします; さしあげます',
    steps: ['l18-lesson', 'l18-change'] },
  { id: 'u-l19',  kicker: 'Dekiru 1 · 19. lecke', title: 'Úton',                 sub: '〜なければなりません; 〜ていきます; だけ és しか',
    steps: ['l19-lesson', 'l19-nai', 'l19-patterns'] },
  { id: 'u-l20',  kicker: 'Dekiru 1 · 20. lecke', title: 'Városnézés',           sub: 'Tárgyas és tárgyatlan igék; 〜ています (állapot); 〜という',
    steps: ['l20-lesson', 'l20-pairs', 'l20-verbs'] },
  { id: 'u-l21',  kicker: 'Dekiru 1 · 21. lecke', title: 'Minden készen áll',    sub: '〜くします; 〜てあります; 〜といいます',
    steps: ['l21-lesson', 'l21-te'] },
  { id: 'u-l22',  kicker: 'Dekiru 1 · 22. lecke', title: 'Szívességek',          sub: '〜てあげます, 〜てくれます, 〜てもらいます; 〜ておきます; 〜ながら',
    steps: ['l22-lesson', 'l22-favors'] },
  { id: 'u-l23',  kicker: 'Dekiru 1 · 23. lecke', title: 'Udvarias kérések',     sub: '〜てくださいます, 〜ていただきます; 〜の; まだ és もう',
    steps: ['l23-lesson', 'l23-te'] },
  { id: 'u-l24',  kicker: 'Dekiru 1 · 24. lecke', title: 'Búcsú',                sub: '〜てきます, 〜ていきます; 〜ています (állapot)',
    steps: ['l24-lesson', 'l24-state'] },
  { id: 'u-next', kicker: 'A Dekiru 1 után',      title: 'Összefoglaló gyakorlás', sub: 'Hallás, nyelvtani minták, szabad fordítás; utána a Dekiru 2 leckéi jönnek',
    steps: ['listening', 'patterns', 'production'] },
  { id: 'u-l25',  kicker: 'Dekiru 2 · 25. lecke', title: 'A repülőtéren',        sub: '〜だろう, 〜はずです; 〜か és 〜かどうか; 〜の？',
    steps: ['l25-lesson'] },
  { id: 'u-l26',  kicker: 'Dekiru 2 · 26. lecke', title: 'Álmok és tervek',      sub: '〜たら; szándékos alak; 〜までに; 〜らしい',
    steps: ['l26-lesson', 'l26-volitional', 'l26-tara'] },
  { id: 'u-l27',  kicker: 'Dekiru 2 · 27. lecke', title: 'Ki mit tud?',          sub: 'Ható alak; 〜にきまっています; 〜とか; 〜さ',
    steps: ['l27-lesson', 'l27-potential', 'l27-potential-w'] },
  { id: 'u-l28',  kicker: 'Dekiru 2 · 28. lecke', title: 'Melyiket ajánlja?',    sub: '〜ば, 〜なら; 〜でございます; 〜し; 〜にちがいありません',
    steps: ['l28-lesson', 'l28-if', 'l28-patterns'] },
  { id: 'u-l29',  kicker: 'Dekiru 2 · 29. lecke', title: 'Új félév',             sub: '〜ところ; 〜ように言います; 〜ということです; 〜について',
    steps: ['l29-lesson'] },
  { id: 'u-l30',  kicker: 'Dekiru 2 · 30. lecke', title: 'Közös munka',          sub: '〜のに; 〜なくてもかまいません; 〜によって',
    steps: ['l30-lesson', 'l30-patterns'] },
  { id: 'u-l31',  kicker: 'Dekiru 2 · 31. lecke', title: 'Útbaigazítás',         sub: '〜と; 〜にくらべて; 見えます, 聞こえます; 〜ようです',
    steps: ['l31-lesson', 'l31-senses'] },
  { id: 'u-l32',  kicker: 'Dekiru 2 · 32. lecke', title: 'Külföldi tanulmányok', sub: '〜ても; 〜ことになります; 〜ばかり; 〜ために',
    steps: ['l32-lesson', 'l32-patterns'] },
  { id: 'u-l33',  kicker: 'Dekiru 2 · 33. lecke', title: 'A konyhában',          sub: '〜そうです (látszat); 〜みたいな; 〜くらい; 〜がします',
    steps: ['l33-lesson', 'l33-looks'] },
  { id: 'u-l34',  kicker: 'Dekiru 2 · 34. lecke', title: 'Mit hallottál?',       sub: '〜そうです (hallomás); 〜によると; 〜らしいです',
    steps: ['l34-lesson'] },
  { id: 'u-l35',  kicker: 'Dekiru 2 · 35. lecke', title: 'Hogyan kell?',         sub: '〜方; 〜かわりに; 〜にかわって; 〜まま',
    steps: ['l35-lesson'] },
  { id: 'u-l36',  kicker: 'Dekiru 2 · 36. lecke', title: 'Rendezvény',           sub: 'Szenvedő alak; 〜によって; 〜から〜にかけて; 〜でも',
    steps: ['l36-lesson', 'l36-passive'] },
  { id: 'u-l37',  kicker: 'Dekiru 2 · 37. lecke', title: 'Baj történt',          sub: 'Szenvedő mondat emberrel; kellemetlenség; 〜おかげで',
    steps: ['l37-lesson', 'l37-passive-w'] },
  { id: 'u-l38',  kicker: 'Dekiru 2 · 38. lecke', title: 'Tiszteletteljes beszéd', sub: 'お〜になります; いらっしゃいます; ご〜ください; 〜うちに',
    steps: ['l38-lesson', 'l38-honorific'] },
  { id: 'u-l39',  kicker: 'Dekiru 2 · 39. lecke', title: 'Szerényen szólva',     sub: 'お〜します; 参ります, 申します; 〜やすい, 〜にくい; 〜すぎます',
    steps: ['l39-lesson'] },
  { id: 'u-l40',  kicker: 'Dekiru 2 · 40. lecke', title: 'Interjú',              sub: 'いくら〜ても; 何でも; 〜始めます, 〜出します, 〜続けます',
    steps: ['l40-lesson'] },
  { id: 'u-l41',  kicker: 'Dekiru 2 · 41. lecke', title: 'Bemutató',             sub: 'まるで〜ようです; 〜も; 〜しかありません; 〜だけあって',
    steps: ['l41-lesson'] },
  { id: 'u-l42',  kicker: 'Dekiru 2 · 42. lecke', title: 'Vita',                 sub: '〜にとって; 〜から見ると; 〜こそ; egyetértés és ellenvetés',
    steps: ['l42-lesson'] },
  { id: 'u-l43',  kicker: 'Dekiru 2 · 43. lecke', title: 'Tanulási tanácsok',    sub: 'Parancsoló alak; 〜な; 〜ように; 〜ようにします; 〜とおりに',
    steps: ['l43-lesson'] },
  { id: 'u-l44',  kicker: 'Dekiru 2 · 44. lecke', title: 'Beszédverseny',        sub: '〜べきです; 〜ずに; 〜を中心に',
    steps: ['l44-lesson', 'l44-nai'] },
  { id: 'u-l45',  kicker: 'Dekiru 2 · 45. lecke', title: 'Félreértés',           sub: '〜ようとします; műveltető alak; 〜がります, 〜たがります',
    steps: ['l45-lesson', 'l45-causative'] },
  { id: 'u-l46',  kicker: 'Dekiru 2 · 46. lecke', title: 'Megbeszélés',          sub: '〜なさい; műveltető mondatok; 〜させてください',
    steps: ['l46-lesson', 'l46-causative-w'] },
  { id: 'u-l47',  kicker: 'Dekiru 2 · 47. lecke', title: 'Nyelvtanulás',         sub: 'Műveltető-szenvedő alak: 〜させられます, 〜されます',
    steps: ['l47-lesson', 'l47-causpass'] },
  { id: 'u-l48',  kicker: 'Dekiru 2 · 48. lecke', title: 'Köszönet és búcsú',    sub: '〜をきっかけに; 〜せいで; 〜ば〜ほど; 〜として',
    steps: ['l48-lesson'] },
  { id: 'u-end',  kicker: 'A Dekiru 2 után',      title: 'Záró gyakorlás',       sub: 'Nyelvtani minták kiegészítéssel és mondatszintű hallás',
    steps: ['final-cloze', 'final-pro'] }
];

/* ====================================================
   MINI-LECKÉK — „Tanuld meg" a gyakorlás előtt
   ----------------------------------------------------
   Modulonként egy rövid magyarázat, ami a lobbi fölött jelenik meg
   (app.js: initLessons). Első alkalommal nyitva van, utána összecsukva.
   Mezők:
     title    a lecke címe
     points   [{ h: alcím, t: szöveg (HTML megengedett) }]
     examples [{ jp, ro, hu }]  — példamondatok
   Kulcs: a NihonCoreStats modul-kulcsa.
   MINTA-KÉSZLET: modulonként egy lecke; a bővítés a végső tartalom-feltöltés része.
   ==================================================== */
const NIHONCORE_LESSONS = {
  practice: {
    title: 'A japán mondat váza',
    points: [
      { h: 'Az ige a mondat végén áll',
        t: 'A magyarban a szórend szabad, a japánban az ige (vagy a <strong lang="ja">です</strong>) mindig zárja a mondatot.' },
      { h: 'A szó szerepét a partikula mutatja',
        t: 'A partikula a szó <em>után</em> áll: <strong lang="ja">は</strong> téma, <strong lang="ja">が</strong> alany, <strong lang="ja">を</strong> tárgy, <strong lang="ja">に</strong> cél vagy időpont, <strong lang="ja">で</strong> a cselekvés helye vagy eszköze, <strong lang="ja">へ</strong> irány, <strong lang="ja">と</strong> „-val", <strong lang="ja">も</strong> „is", <strong lang="ja">の</strong> birtokos.' },
      { h: 'Kérdés: か a végére',
        t: 'A szórend nem változik, csak a mondat végére kerül a <strong lang="ja">か</strong>.' }
    ],
    examples: [
      { jp: '私は寿司を食べます。', ro: 'watashi wa sushi o tabemasu.', hu: 'Én sushit eszem.' },
      { jp: 'これは本ですか。', ro: 'kore wa hon desu ka.', hu: 'Ez könyv?' }
    ]
  },

  conjugation: {
    title: 'A három igecsoport',
    points: [
      { h: 'Ichidan (II.): a る lemarad',
        t: 'Az <em>-iru / -eru</em> végű igék többsége. A végső <strong lang="ja">る</strong> helyére jön a toldalék: <span lang="ja">食べる → 食べます, 食べない, 食べて</span>.' },
      { h: 'Godan (I.): az utolsó szótag sort vált',
        t: 'Az utolsó szótag a toldaléktól függően másik magánhangzó-sorra lép: <span lang="ja">書く → 書きます</span> (i-sor), <span lang="ja">書かない</span> (a-sor).' },
      { h: 'Godan te- és ta-alak: a végződés dönt',
        t: '<span lang="ja">う・つ・る → って</span>, <span lang="ja">む・ぶ・ぬ → んで</span>, <span lang="ja">く → いて</span>, <span lang="ja">ぐ → いで</span>, <span lang="ja">す → して</span>. Kivétel: <span lang="ja">行く → 行って</span>.' },
      { h: 'Rendhagyó (III.): kettő van',
        t: '<span lang="ja">する → します, しない, して</span> és <span lang="ja">来る → 来ます</span> (kimasu), <span lang="ja">来ない</span> (konai), <span lang="ja">来て</span> (kite).' }
    ],
    examples: [
      { jp: '毎日日本語を勉強します。', ro: 'mainichi nihongo o benkyou shimasu.', hu: 'Minden nap japánt tanulok.' }
    ]
  },

  adjectives: {
    title: 'I- és na-melléknevek',
    points: [
      { h: 'I-melléknév: a végső い változik',
        t: 'Tagadás: <span lang="ja">い → くない</span>. Múlt: <span lang="ja">い → かった</span>. Múlt tagadás: <span lang="ja">くなかった</span>. Például <span lang="ja">高い → 高くない, 高かった</span>.' },
      { h: 'Kivétel: いい',
        t: 'A ragozott alakok a <span lang="ja">よい</span> tőből képződnek: <span lang="ja">よくない, よかった</span>.' },
      { h: 'Na-melléknév: a です ragozódik',
        t: 'Főnév előtt <strong lang="ja">な</strong> áll: <span lang="ja">静かな部屋</span>. Állítmányként: <span lang="ja">静かです, 静かじゃありません, 静かでした</span>.' },
      { h: 'Csapda: い-re végződő na-melléknevek',
        t: '<span lang="ja">きれい</span>, <span lang="ja">きらい</span> és <span lang="ja">ゆうめい</span> na-melléknév, pedig い-re végződik.' }
    ],
    examples: [
      { jp: 'この本は面白かったです。', ro: 'kono hon wa omoshirokatta desu.', hu: 'Ez a könyv érdekes volt.' }
    ]
  },

  datetime: {
    title: 'Dátum és idő: a rendhagyó olvasatok',
    points: [
      { h: 'Hónapok: szám + がつ',
        t: 'Három rendhagyó: <span lang="ja">4月 しがつ</span>, <span lang="ja">7月 しちがつ</span>, <span lang="ja">9月 くがつ</span>.' },
      { h: 'A hónap napjai 1–10: külön szavak',
        t: '<span lang="ja">ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか</span>. Rendhagyó még a <span lang="ja">14日 じゅうよっか</span>, a <span lang="ja">20日 はつか</span> és a <span lang="ja">24日 にじゅうよっか</span>.' },
      { h: 'Órák: szám + じ',
        t: 'Rendhagyó: <span lang="ja">4時 よじ</span>, <span lang="ja">7時 しちじ</span>, <span lang="ja">9時 くじ</span>. A fél óra: <span lang="ja">〜半 (はん)</span>.' },
      { h: 'Percek: ふん vagy ぷん',
        t: '<span lang="ja">いっぷん, さんぷん, よんぷん, ろっぷん, はっぷん, じゅっぷん</span>: az 1, 3, 4, 6, 8 és 10 után ぷん.' }
    ],
    examples: [
      { jp: '今、四時半です。', ro: 'ima, yoji han desu.', hu: 'Most fél öt van.' }
    ]
  },

  listening: {
    title: 'Mire figyelj hallás közben',
    points: [
      { h: 'Hosszú és rövid magánhangzó',
        t: 'A hossz jelentést különböztet meg: <span lang="ja">おばさん</span> (néni) és <span lang="ja">おばあさん</span> (nagymama), <span lang="ja">ビル</span> (épület) és <span lang="ja">ビール</span> (sör).' },
      { h: 'A kis っ: egy ütésnyi szünet',
        t: 'A következő mássalhangzó megnyúlik: <span lang="ja">きて</span> (gyere) és <span lang="ja">きって</span> (bélyeg).' },
      { h: 'A ritmus morákból áll',
        t: 'Minden kana egy ütés, a <span lang="ja">ん</span> és a <span lang="ja">っ</span> is. Ha számolod az ütéseket, a hosszú hangot és a kis っ-t is meghallod.' }
    ],
    examples: []
  },

  grammar: {
    title: 'Hogyan olvass egy nyelvtani mintát',
    points: [
      { h: 'A minta egy igealakhoz kapcsolódik',
        t: '<span lang="ja">〜たい</span> a masu-tőhöz (<span lang="ja">飲み + たい</span>), <span lang="ja">〜てもいい</span> a te-alakhoz, <span lang="ja">〜なければならない</span> a nai-tőhöz.' },
      { h: 'A jelentést a mondat vége hordozza',
        t: 'A japánban az ige zárja a mondatot, a minta pedig az igén ül. Először a mondat végét nézd meg.' },
      { h: 'Hasonló minták, más helyzet',
        t: '<span lang="ja">〜たら</span>, <span lang="ja">〜ば</span> és <span lang="ja">〜なら</span> mind „ha", de nem cserélhetők fel szabadon. A visszajelzés megmutatja a különbséget.' }
    ],
    examples: [
      { jp: '水を飲みたい。', ro: 'mizu o nomitai.', hu: 'Vizet akarok inni.' }
    ]
  },

  production: {
    title: 'Így építs japán mondatot',
    points: [
      { h: 'Kezdd az igével',
        t: 'Találd meg a magyar mondat igéjét, ragozd japánul, és tedd a mondat végére.' },
      { h: 'A többi az ige elé kerül, partikulával',
        t: 'Szokásos sorrend: téma <span lang="ja">は</span>, idő, hely <span lang="ja">で / に</span>, tárgy <span lang="ja">を</span>, ige.' },
      { h: 'Több jó megoldás is lehet',
        t: 'A gép egy mintamondathoz hasonlít. Ha a tiéd más, de helyes, a visszajelzésnél jelöld annak.' }
    ],
    examples: [
      { jp: '明日、友達と映画を見ます。', ro: 'ashita, tomodachi to eiga o mimasu.', hu: 'Holnap filmet nézek a barátommal.' }
    ]
  }
};

