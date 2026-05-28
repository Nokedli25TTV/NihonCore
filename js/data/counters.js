/* ====================================================
   NIHONCORE — counters.js (Számláló Szavak tartalom)
   ----------------------------------------------------
   NIHONCORE_COUNTERS              — 7 counter, 1-10 readings
   NIHONCORE_COUNTER_CATEGORIES    — 3 főkategória
   NIHONCORE_COUNTER_ITEMS         — 70 item, primary + alternatives
   Engine: initModulePage counter-engine ágai (app.js).
   ==================================================== */
const NIHONCORE_COUNTERS = {

  // ── つ — általános (csak 1-10, native japán számokkal) ──
  tsu: {
    id: 'tsu',
    jp: 'つ',
    romaji: 'tsu',
    nameHu: 'általános dolgok',
    emoji: '⚪',
    description: 'Általános számláló — bármilyen dologra használható ha nincs specifikus számlálószó (csak 1-10).',
    readings: {
      1:  { kana: 'ひとつ',     romaji: 'hitotsu',   irregular: true, changeType: 'native' },
      2:  { kana: 'ふたつ',     romaji: 'futatsu',   irregular: true, changeType: 'native' },
      3:  { kana: 'みっつ',     romaji: 'mittsu',    irregular: true, changeType: 'native' },
      4:  { kana: 'よっつ',     romaji: 'yottsu',    irregular: true, changeType: 'native' },
      5:  { kana: 'いつつ',     romaji: 'itsutsu',   irregular: true, changeType: 'native' },
      6:  { kana: 'むっつ',     romaji: 'muttsu',    irregular: true, changeType: 'native' },
      7:  { kana: 'ななつ',     romaji: 'nanatsu',   irregular: true, changeType: 'native' },
      8:  { kana: 'やっつ',     romaji: 'yattsu',    irregular: true, changeType: 'native' },
      9:  { kana: 'ここのつ',   romaji: 'kokonotsu', irregular: true, changeType: 'native' },
      10: { kana: 'とお',       romaji: 'too',       irregular: true, changeType: 'native' }
    }
  },

  // ── 人 — emberek ──
  nin: {
    id: 'nin',
    jp: '人',
    romaji: 'nin',
    nameHu: 'emberek',
    emoji: '👤',
    description: 'Emberek számolásához. 1-2 rendhagyó (hitori, futari), 4-nél a よ.',
    readings: {
      1:  { kana: 'ひとり',     romaji: 'hitori',  irregular: true, changeType: 'native' },
      2:  { kana: 'ふたり',     romaji: 'futari',  irregular: true, changeType: 'native' },
      3:  { kana: 'さんにん',   romaji: 'sannin',  irregular: false },
      4:  { kana: 'よにん',     romaji: 'yonin',   irregular: true, changeType: 'yo-form' },
      5:  { kana: 'ごにん',     romaji: 'gonin',   irregular: false },
      6:  { kana: 'ろくにん',   romaji: 'rokunin', irregular: false },
      7:  { kana: 'しちにん',   romaji: 'shichinin', irregular: false },
      8:  { kana: 'はちにん',   romaji: 'hachinin', irregular: false },
      9:  { kana: 'きゅうにん', romaji: 'kyuunin', irregular: false },
      10: { kana: 'じゅうにん', romaji: 'juunin',  irregular: false }
    }
  },

  // ── 枚 — lapos tárgyak (mind szabályos) ──
  mai: {
    id: 'mai',
    jp: '枚',
    romaji: 'mai',
    nameHu: 'lapos, vékony tárgyak',
    emoji: '📄',
    description: 'Papír, kártya, tányér, kép — minden lapos. Mind szabályos.',
    readings: {
      1:  { kana: 'いちまい',   romaji: 'ichimai', irregular: false },
      2:  { kana: 'にまい',     romaji: 'nimai',   irregular: false },
      3:  { kana: 'さんまい',   romaji: 'sanmai',  irregular: false },
      4:  { kana: 'よんまい',   romaji: 'yonmai',  irregular: false },
      5:  { kana: 'ごまい',     romaji: 'gomai',   irregular: false },
      6:  { kana: 'ろくまい',   romaji: 'rokumai', irregular: false },
      7:  { kana: 'ななまい',   romaji: 'nanamai', irregular: false },
      8:  { kana: 'はちまい',   romaji: 'hachimai', irregular: false },
      9:  { kana: 'きゅうまい', romaji: 'kyuumai', irregular: false },
      10: { kana: 'じゅうまい', romaji: 'juumai',  irregular: false }
    }
  },

  // ── 本 — hosszú, vékony tárgyak (1, 3, 6, 8, 10 rendhagyó) ──
  hon: {
    id: 'hon',
    jp: '本',
    romaji: 'hon',
    nameHu: 'hosszú, vékony tárgyak',
    emoji: '🖊️',
    description: 'Toll, ceruza, üveg, fa — bármi hosszú, henger alakú. Több szám rendhagyó (hangmódosulás).',
    readings: {
      1:  { kana: 'いっぽん',   romaji: 'ippon',   irregular: true, changeType: 'sokuon-p' },
      2:  { kana: 'にほん',     romaji: 'nihon',   irregular: false },
      3:  { kana: 'さんぼん',   romaji: 'sanbon',  irregular: true, changeType: 'rendaku-b' },
      4:  { kana: 'よんほん',   romaji: 'yonhon',  irregular: false },
      5:  { kana: 'ごほん',     romaji: 'gohon',   irregular: false },
      6:  { kana: 'ろっぽん',   romaji: 'roppon',  irregular: true, changeType: 'sokuon-p' },
      7:  { kana: 'ななほん',   romaji: 'nanahon', irregular: false },
      8:  { kana: 'はっぽん',   romaji: 'happon',  irregular: true, changeType: 'sokuon-p' },
      9:  { kana: 'きゅうほん', romaji: 'kyuuhon', irregular: false },
      10: { kana: 'じゅっぽん', romaji: 'juppon',  irregular: true, changeType: 'sokuon-p' }
    }
  },

  // ── 冊 — könyvek (1, 8, 10 rendhagyó) ──
  satsu: {
    id: 'satsu',
    jp: '冊',
    romaji: 'satsu',
    nameHu: 'kötött dolgok (könyvek, füzetek)',
    emoji: '📚',
    description: 'Könyv, füzet, magazin, szótár — bármi kötött. 1, 8, 10 rendhagyó (sokuon).',
    readings: {
      1:  { kana: 'いっさつ',   romaji: 'issatsu', irregular: true, changeType: 'sokuon-s' },
      2:  { kana: 'にさつ',     romaji: 'nisatsu', irregular: false },
      3:  { kana: 'さんさつ',   romaji: 'sansatsu', irregular: false },
      4:  { kana: 'よんさつ',   romaji: 'yonsatsu', irregular: false },
      5:  { kana: 'ごさつ',     romaji: 'gosatsu',  irregular: false },
      6:  { kana: 'ろくさつ',   romaji: 'rokusatsu', irregular: false },
      7:  { kana: 'ななさつ',   romaji: 'nanasatsu', irregular: false },
      8:  { kana: 'はっさつ',   romaji: 'hassatsu', irregular: true, changeType: 'sokuon-s' },
      9:  { kana: 'きゅうさつ', romaji: 'kyuusatsu', irregular: false },
      10: { kana: 'じゅっさつ', romaji: 'jussatsu', irregular: true, changeType: 'sokuon-s' }
    }
  },

  // ── 足 — lábbelik (1, 3, 8, 10 rendhagyó) ──
  soku: {
    id: 'soku',
    jp: '足',
    romaji: 'soku',
    nameHu: 'lábbelik (cipő, zokni)',
    emoji: '👟',
    description: 'Cipő, zokni, csizma — bármi lábra kerül. 1/8/10 sokuon, 3 rendaku.',
    readings: {
      1:  { kana: 'いっそく',   romaji: 'issoku',   irregular: true, changeType: 'sokuon-s' },
      2:  { kana: 'にそく',     romaji: 'nisoku',   irregular: false },
      3:  { kana: 'さんぞく',   romaji: 'sanzoku',  irregular: true, changeType: 'rendaku-z' },
      4:  { kana: 'よんそく',   romaji: 'yonsoku',  irregular: false },
      5:  { kana: 'ごそく',     romaji: 'gosoku',   irregular: false },
      6:  { kana: 'ろくそく',   romaji: 'rokusoku', irregular: false },
      7:  { kana: 'ななそく',   romaji: 'nanasoku', irregular: false },
      8:  { kana: 'はっそく',   romaji: 'hassoku',  irregular: true, changeType: 'sokuon-s' },
      9:  { kana: 'きゅうそく', romaji: 'kyuusoku', irregular: false },
      10: { kana: 'じゅっそく', romaji: 'jussoku',  irregular: true, changeType: 'sokuon-s' }
    }
  },

  // ── 台 — gépek, járművek (mind szabályos) ──
  dai: {
    id: 'dai',
    jp: '台',
    romaji: 'dai',
    nameHu: 'gépek, járművek',
    emoji: '🚗',
    description: 'Autó, biciklik, számítógép, kamera — mind technikai eszköz. Mind szabályos (4 = yon).',
    readings: {
      1:  { kana: 'いちだい',   romaji: 'ichidai', irregular: false },
      2:  { kana: 'にだい',     romaji: 'nidai',   irregular: false },
      3:  { kana: 'さんだい',   romaji: 'sandai',  irregular: false },
      4:  { kana: 'よんだい',   romaji: 'yondai',  irregular: false },
      5:  { kana: 'ごだい',     romaji: 'godai',   irregular: false },
      6:  { kana: 'ろくだい',   romaji: 'rokudai', irregular: false },
      7:  { kana: 'ななだい',   romaji: 'nanadai', irregular: false },
      8:  { kana: 'はちだい',   romaji: 'hachidai', irregular: false },
      9:  { kana: 'きゅうだい', romaji: 'kyuudai', irregular: false },
      10: { kana: 'じゅうだい', romaji: 'juudai',  irregular: false }
    }
  },
 //匹 hiki — kis állatok
  hiki: {
  id: 'hiki', jp: '匹', romaji: 'hiki',
  nameHu: 'kis állatok (kutya, macska, hal)',
  emoji: '🐾',
  description: 'Kis és közepes állatok számolása. 1, 3, 6, 8, 10 hangváltozás.',
  readings: {
    1:  { kana: 'いっぴき',   romaji: 'ippiki',   irregular: true,  changeType: 'sokuon-p' },
    2:  { kana: 'にひき',     romaji: 'nihiki',   irregular: false },
    3:  { kana: 'さんびき',   romaji: 'sanbiki',  irregular: true,  changeType: 'rendaku-b' },
    4:  { kana: 'よんひき',   romaji: 'yonhiki',  irregular: false },
    5:  { kana: 'ごひき',     romaji: 'gohiki',   irregular: false },
    6:  { kana: 'ろっぴき',   romaji: 'roppiki',  irregular: true,  changeType: 'sokuon-p' },
    7:  { kana: 'ななひき',   romaji: 'nanahiki', irregular: false },
    8:  { kana: 'はっぴき',   romaji: 'happiki',  irregular: true,  changeType: 'sokuon-p' },
    9:  { kana: 'きゅうひき', romaji: 'kyuuhiki', irregular: false },
    10: { kana: 'じゅっぴき', romaji: 'juppiki',  irregular: true,  changeType: 'sokuon-p' }
  }
},
//杯 hai — italok, poharak, tálak
hai: {
  id: 'hai', jp: '杯', romaji: 'hai',
  nameHu: 'poharak, csészék, italok',
  emoji: '🥤',
  description: 'Folyadék-egységek számolása (pohár, csésze, tál). 1, 6, 8, 10 sokuon, 3 rendaku.',
  readings: {
    1:  { kana: 'いっぱい',   romaji: 'ippai',   irregular: true,  changeType: 'sokuon-p' },
    2:  { kana: 'にはい',     romaji: 'nihai',   irregular: false },
    3:  { kana: 'さんばい',   romaji: 'sanbai',  irregular: true,  changeType: 'rendaku-b' },
    4:  { kana: 'よんはい',   romaji: 'yonhai',  irregular: false },
    5:  { kana: 'ごはい',     romaji: 'gohai',   irregular: false },
    6:  { kana: 'ろっぱい',   romaji: 'roppai',  irregular: true,  changeType: 'sokuon-p' },
    7:  { kana: 'ななはい',   romaji: 'nanahai', irregular: false },
    8:  { kana: 'はっぱい',   romaji: 'happai',  irregular: true,  changeType: 'sokuon-p' },
    9:  { kana: 'きゅうはい', romaji: 'kyuuhai', irregular: false },
    10: { kana: 'じゅっぱい', romaji: 'juppai',  irregular: true,  changeType: 'sokuon-p' }
  }
},
//階 kai_floor — emeletek

kai_floor: {
  id: 'kai_floor', jp: '階', romaji: 'kai',
  nameHu: 'emeletek',
  emoji: '🏢',
  description: 'Épület-szintek számolása. 3階 rendaku (さんがい), 1/6/8/10 sokuon.',
  readings: {
    1:  { kana: 'いっかい',   romaji: 'ikkai',    irregular: true,  changeType: 'sokuon-k' },
    2:  { kana: 'にかい',     romaji: 'nikai',    irregular: false },
    3:  { kana: 'さんがい',   romaji: 'sangai',   irregular: true,  changeType: 'rendaku-g' },
    4:  { kana: 'よんかい',   romaji: 'yonkai',   irregular: false },
    5:  { kana: 'ごかい',     romaji: 'gokai',    irregular: false },
    6:  { kana: 'ろっかい',   romaji: 'rokkai',   irregular: true,  changeType: 'sokuon-k' },
    7:  { kana: 'ななかい',   romaji: 'nanakai',  irregular: false },
    8:  { kana: 'はっかい',   romaji: 'hakkai',   irregular: true,  changeType: 'sokuon-k' },
    9:  { kana: 'きゅうかい', romaji: 'kyuukai',  irregular: false },
    10: { kana: 'じゅっかい', romaji: 'jukkai',   irregular: true,  changeType: 'sokuon-k' }
  }
},
//回 kai_times — alkalmak, ismétlések

kai_times: {
  id: 'kai_times', jp: '回', romaji: 'kai',
  nameHu: 'alkalmak, ismétlések',
  emoji: '🔁',
  description: 'Cselekvések, ismétlések számlálása. 1/6/8/10 sokuon, 3回 = さんかい (NEM rendaku — ellenben a 3階-val!).',
  readings: {
    1:  { kana: 'いっかい',   romaji: 'ikkai',    irregular: true,  changeType: 'sokuon-k' },
    2:  { kana: 'にかい',     romaji: 'nikai',    irregular: false },
    3:  { kana: 'さんかい',   romaji: 'sankai',   irregular: false },
    4:  { kana: 'よんかい',   romaji: 'yonkai',   irregular: false },
    5:  { kana: 'ごかい',     romaji: 'gokai',    irregular: false },
    6:  { kana: 'ろっかい',   romaji: 'rokkai',   irregular: true,  changeType: 'sokuon-k' },
    7:  { kana: 'ななかい',   romaji: 'nanakai',  irregular: false },
    8:  { kana: 'はっかい',   romaji: 'hakkai',   irregular: true,  changeType: 'sokuon-k' },
    9:  { kana: 'きゅうかい', romaji: 'kyuukai',  irregular: false },
    10: { kana: 'じゅっかい', romaji: 'jukkai',   irregular: true,  changeType: 'sokuon-k' }
  }
},
//個 ko — kis tárgyak (alternatíva a つ-hoz
ko: {
  id: 'ko', jp: '個', romaji: 'ko',
  nameHu: 'kis tárgyak, darabok (formális)',
  emoji: '📦',
  description: 'Kis, kompakt tárgyak formális számlálása. Alternatíva a つ-hoz. 1/6/8/10 sokuon-k.',
  readings: {
    1:  { kana: 'いっこ',   romaji: 'ikko',    irregular: true,  changeType: 'sokuon-k' },
    2:  { kana: 'にこ',     romaji: 'niko',    irregular: false },
    3:  { kana: 'さんこ',   romaji: 'sanko',   irregular: false },
    4:  { kana: 'よんこ',   romaji: 'yonko',   irregular: false },
    5:  { kana: 'ごこ',     romaji: 'goko',    irregular: false },
    6:  { kana: 'ろっこ',   romaji: 'rokko',   irregular: true,  changeType: 'sokuon-k' },
    7:  { kana: 'ななこ',   romaji: 'nanako',  irregular: false },
    8:  { kana: 'はっこ',   romaji: 'hakko',   irregular: true,  changeType: 'sokuon-k' },
    9:  { kana: 'きゅうこ', romaji: 'kyuuko',  irregular: false },
    10: { kana: 'じゅっこ', romaji: 'jukko',   irregular: true,  changeType: 'sokuon-k' }
  }
},
};

const NIHONCORE_COUNTER_CATEGORIES = [
  { id: 'living',  nameHu: 'Élőlények', emoji: '🐾', counters: ['nin'] },
  { id: 'objects', nameHu: 'Tárgyak',   emoji: '📦', counters: ['mai', 'hon', 'satsu', 'soku', 'dai'] },
  { id: 'general', nameHu: 'Általános', emoji: '🌐', counters: ['tsu'] },
  { id: 'drinks',   nameHu: 'Italok & adagok', emoji: '🥤', counters: ['hai'] },
  { id: 'places_events', nameHu: 'Helyek & Események', emoji: '🏢', counters: ['kai_floor', 'kai_times'] }
];

// V7 P3 content-batch 1 (2026-05-25) — 33 → 70 item (7 kategória)
const NIHONCORE_COUNTER_ITEMS = [

  // ── tsu (általános) — 12 db ──
  { id: 'ringo',      nameHu: 'alma',            nameJp: 'りんご',       emoji: '🍎', minLevel: 'N5', primary: 'tsu' },
  { id: 'isu',        nameHu: 'szék',            nameJp: '椅子',         emoji: '🪑', minLevel: 'N5', primary: 'tsu' },
  { id: 'ie',         nameHu: 'ház',             nameJp: '家',           emoji: '🏠', minLevel: 'N5', primary: 'tsu' },
  { id: 'okashi',     nameHu: 'édesség',         nameJp: 'お菓子',       emoji: '🍪', minLevel: 'N5', primary: 'tsu' },
  { id: 'tamago',     nameHu: 'tojás',           nameJp: '卵',           emoji: '🥚', minLevel: 'N5', primary: 'tsu' },
  { id: 'mikan',      nameHu: 'mandarin',        nameJp: 'みかん',       emoji: '🍊', minLevel: 'N5', primary: 'tsu' },
  { id: 'banana',     nameHu: 'banán',           nameJp: 'バナナ',       emoji: '🍌', minLevel: 'N5', primary: 'tsu' },
  { id: 'booru',      nameHu: 'labda',           nameJp: 'ボール',       emoji: '⚽', minLevel: 'N5', primary: 'tsu' },
  { id: 'beddo',      nameHu: 'ágy',             nameJp: 'ベッド',       emoji: '🛏️', minLevel: 'N5', primary: 'tsu' },
  { id: 'kaban',      nameHu: 'táska',           nameJp: 'かばん',       emoji: '👜', minLevel: 'N5', primary: 'tsu' },
  { id: 'kagi',       nameHu: 'kulcs',           nameJp: '鍵',           emoji: '🔑', minLevel: 'N5', primary: 'tsu' },
  { id: 'mado',       nameHu: 'ablak',           nameJp: '窓',           emoji: '🪟', minLevel: 'N5', primary: 'tsu' },

  // ── nin (emberek) — 10 db ──
  { id: 'gakusei',    nameHu: 'diák',            nameJp: '学生',         emoji: '🎓', minLevel: 'N5', primary: 'nin' },
  { id: 'sensei',     nameHu: 'tanár',           nameJp: '先生',         emoji: '👨‍🏫', minLevel: 'N5', primary: 'nin' },
  { id: 'kodomo',     nameHu: 'gyerek',          nameJp: '子供',         emoji: '🧒', minLevel: 'N5', primary: 'nin' },
  { id: 'kazoku',     nameHu: 'családtag',       nameJp: '家族',         emoji: '👨‍👩‍👧', minLevel: 'N5', primary: 'nin' },
  { id: 'tomodachi',  nameHu: 'barát',           nameJp: '友達',         emoji: '🧑‍🤝‍🧑', minLevel: 'N5', primary: 'nin' },
  { id: 'isha',       nameHu: 'orvos',           nameJp: '医者',         emoji: '👨‍⚕️', minLevel: 'N4', primary: 'nin' },
  { id: 'shain',      nameHu: 'alkalmazott',     nameJp: '社員',         emoji: '💼', minLevel: 'N4', primary: 'nin' },
  { id: 'kyaku',      nameHu: 'vendég',          nameJp: '客',           emoji: '🧑‍💼', minLevel: 'N4', primary: 'nin' },
  { id: 'untenshu',   nameHu: 'sofőr',           nameJp: '運転手',       emoji: '🚘', minLevel: 'N4', primary: 'nin' },
  { id: 'ryokousha',  nameHu: 'turista',         nameJp: '旅行者',       emoji: '🧳', minLevel: 'N3', primary: 'nin' },

  // ── mai (lapos, vékony) — 10 db ──
  { id: 'kami',       nameHu: 'papír',           nameJp: '紙',           emoji: '📄', minLevel: 'N5', primary: 'mai' },
  { id: 'kitte',      nameHu: 'bélyeg',          nameJp: '切手',         emoji: '🪧', minLevel: 'N5', primary: 'mai' },
  { id: 'shashin',    nameHu: 'fénykép',         nameJp: '写真',         emoji: '📸', minLevel: 'N5', primary: 'mai' },
  { id: 'osara',      nameHu: 'tányér',          nameJp: 'お皿',         emoji: '🍽️', minLevel: 'N5', primary: 'mai' },
  { id: 'kaado',      nameHu: 'kártya',          nameJp: 'カード',       emoji: '💳', minLevel: 'N5', primary: 'mai' },
  { id: 'tiishatsu',  nameHu: 'póló',            nameJp: 'Tシャツ',      emoji: '👕', minLevel: 'N5', primary: 'mai', alternatives: ['tsu'] },
  { id: 'tegami',     nameHu: 'levél (papír)',   nameJp: '手紙',         emoji: '📝', minLevel: 'N5', primary: 'mai' },
  { id: 'chizu',      nameHu: 'térkép',          nameJp: '地図',         emoji: '🗺️', minLevel: 'N4', primary: 'mai' },
  { id: 'e_picture',  nameHu: 'kép, festmény',   nameJp: '絵',           emoji: '🖼️', minLevel: 'N4', primary: 'mai' },
  { id: 'hagaki',     nameHu: 'képeslap',        nameJp: '葉書',         emoji: '💌', minLevel: 'N4', primary: 'mai' },

  // ── hon (hosszú, vékony) — 10 db ──
  { id: 'enpitsu',    nameHu: 'ceruza',          nameJp: '鉛筆',         emoji: '✏️', minLevel: 'N5', primary: 'hon', alternatives: ['tsu'] },
  { id: 'pen',        nameHu: 'toll',            nameJp: 'ペン',         emoji: '🖊️', minLevel: 'N5', primary: 'hon', alternatives: ['tsu'] },
  { id: 'kasa',       nameHu: 'esernyő',         nameJp: '傘',           emoji: '☂️', minLevel: 'N5', primary: 'hon' },
  { id: 'ki',         nameHu: 'fa',              nameJp: '木',           emoji: '🌳', minLevel: 'N5', primary: 'hon' },
  { id: 'biiru',      nameHu: 'sör (üveg)',      nameJp: 'ビール',       emoji: '🍺', minLevel: 'N5', primary: 'hon', alternatives: ['tsu'] },
  { id: 'hana',       nameHu: 'virág',           nameJp: '花',           emoji: '🌸', minLevel: 'N4', primary: 'hon', alternatives: ['tsu'] },
  { id: 'ninjin',     nameHu: 'sárgarépa',       nameJp: '人参',         emoji: '🥕', minLevel: 'N4', primary: 'hon', alternatives: ['tsu'] },
  { id: 'rosoku',     nameHu: 'gyertya',         nameJp: 'ろうそく',     emoji: '🕯️', minLevel: 'N4', primary: 'hon' },
  { id: 'batto',      nameHu: 'baseball-ütő',    nameJp: 'バット',       emoji: '🏏', minLevel: 'N4', primary: 'hon' },
  { id: 'michi',      nameHu: 'út, ösvény',      nameJp: '道',           emoji: '🛤️', minLevel: 'N4', primary: 'hon' },

  // ── satsu (kötött) — 9 db ──
  { id: 'hon_book',   nameHu: 'könyv',           nameJp: '本',           emoji: '📖', minLevel: 'N5', primary: 'satsu' },
  { id: 'noto',       nameHu: 'füzet',           nameJp: 'ノート',       emoji: '📓', minLevel: 'N5', primary: 'satsu' },
  { id: 'zasshi',     nameHu: 'magazin',         nameJp: '雑誌',         emoji: '📰', minLevel: 'N5', primary: 'satsu' },
  { id: 'jisho',      nameHu: 'szótár',          nameJp: '辞書',         emoji: '📕', minLevel: 'N5', primary: 'satsu' },
  { id: 'kyokasho',   nameHu: 'tankönyv',        nameJp: '教科書',       emoji: '📘', minLevel: 'N5', primary: 'satsu' },
  { id: 'manga',      nameHu: 'manga',           nameJp: '漫画',         emoji: '📗', minLevel: 'N4', primary: 'satsu' },
  { id: 'techo',      nameHu: 'határidőnapló',   nameJp: '手帳',         emoji: '📔', minLevel: 'N4', primary: 'satsu' },
  { id: 'arubamu',    nameHu: 'album',           nameJp: 'アルバム',     emoji: '🗂️', minLevel: 'N4', primary: 'satsu' },
  { id: 'pamphretto', nameHu: 'szórólap',        nameJp: 'パンフレット', emoji: '📃', minLevel: 'N4', primary: 'satsu' },

  // ── soku (lábbelik) — 8 db ──
  { id: 'kutsu',      nameHu: 'cipő',            nameJp: '靴',           emoji: '👟', minLevel: 'N5', primary: 'soku' },
  { id: 'kutsushita', nameHu: 'zokni',           nameJp: '靴下',         emoji: '🧦', minLevel: 'N5', primary: 'soku' },
  { id: 'buutsu',     nameHu: 'csizma',          nameJp: 'ブーツ',       emoji: '🥾', minLevel: 'N5', primary: 'soku' },
  { id: 'surippa',    nameHu: 'papucs',          nameJp: 'スリッパ',     emoji: '🩴', minLevel: 'N5', primary: 'soku' },
  { id: 'sandaru',    nameHu: 'szandál',         nameJp: 'サンダル',     emoji: '👡', minLevel: 'N4', primary: 'soku' },
  { id: 'suniikaa',   nameHu: 'sportcipő',       nameJp: 'スニーカー',   emoji: '👟', minLevel: 'N4', primary: 'soku' },
  { id: 'nagagutsu',  nameHu: 'gumicsizma',      nameJp: '長靴',         emoji: '🥾', minLevel: 'N4', primary: 'soku' },
  { id: 'tabi',       nameHu: 'hagyományos zokni', nameJp: '足袋',       emoji: '🧦', minLevel: 'N3', primary: 'soku' },

  // ── dai (gépek, járművek) — 11 db ──
  { id: 'kuruma',     nameHu: 'autó',            nameJp: '車',           emoji: '🚗', minLevel: 'N5', primary: 'dai' },
  { id: 'jitensha',   nameHu: 'bicikli',         nameJp: '自転車',       emoji: '🚲', minLevel: 'N5', primary: 'dai' },
  { id: 'pasokon',    nameHu: 'számítógép',      nameJp: 'パソコン',     emoji: '💻', minLevel: 'N5', primary: 'dai' },
  { id: 'kamera',     nameHu: 'fényképező',      nameJp: 'カメラ',       emoji: '📷', minLevel: 'N5', primary: 'dai' },
  { id: 'terebi',     nameHu: 'televízió',       nameJp: 'テレビ',       emoji: '📺', minLevel: 'N5', primary: 'dai' },
  { id: 'sumaho',     nameHu: 'okostelefon',     nameJp: 'スマホ',       emoji: '📱', minLevel: 'N5', primary: 'dai' },
  { id: 'densha',     nameHu: 'vonat',           nameJp: '電車',         emoji: '🚆', minLevel: 'N5', primary: 'dai' },
  { id: 'hikooki',    nameHu: 'repülő',          nameJp: '飛行機',       emoji: '✈️', minLevel: 'N5', primary: 'dai' },
  { id: 'basu',       nameHu: 'busz',            nameJp: 'バス',         emoji: '🚌', minLevel: 'N5', primary: 'dai' },
  { id: 'rajio',      nameHu: 'rádió',           nameJp: 'ラジオ',       emoji: '📻', minLevel: 'N4', primary: 'dai' },
  { id: 'ootobai',    nameHu: 'motorkerékpár',   nameJp: 'オートバイ',   emoji: '🏍️', minLevel: 'N4', primary: 'dai' },

//tsu (つ) — új általános tárgyak
  
{ id: 'okashi',    nameHu: 'sütemény',  nameJp: 'おかし',      emoji: '🍪', minLevel: 'N5', primary: 'tsu' },
{ id: 'momo',      nameHu: 'őszibarack', nameJp: 'もも',       emoji: '🍑', minLevel: 'N5', primary: 'tsu' },
{ id: 'nashi',     nameHu: 'körte',     nameJp: 'なし',        emoji: '🍐', minLevel: 'N5', primary: 'tsu' },
{ id: 'ichigo',    nameHu: 'eper',      nameJp: 'いちご',      emoji: '🍓', minLevel: 'N5', primary: 'tsu' },
{ id: 'shitsumon', nameHu: 'kérdés',   nameJp: 'しつもん',    emoji: '❓', minLevel: 'N5', primary: 'tsu' },
{ id: 'isu',       nameHu: 'szék',     nameJp: 'いす',        emoji: '🪑', minLevel: 'N5', primary: 'tsu' },
{ id: 'kaban',     nameHu: 'táska',    nameJp: 'かばん',      emoji: '👜', minLevel: 'N5', primary: 'tsu' },



//hiki (匹) — kis állatok
{ id: 'neko',      nameHu: 'macska',    nameJp: 'ねこ',      emoji: '🐱', minLevel: 'N5', primary: 'hiki' },
{ id: 'inu',       nameHu: 'kutya',     nameJp: 'いぬ',      emoji: '🐶', minLevel: 'N5', primary: 'hiki' },
{ id: 'sakana',    nameHu: 'hal',       nameJp: 'さかな',    emoji: '🐟', minLevel: 'N5', primary: 'hiki' },
{ id: 'usagi',     nameHu: 'nyúl',      nameJp: 'うさぎ',   emoji: '🐰', minLevel: 'N5', primary: 'hiki' },
{ id: 'hamster',   nameHu: 'hörcsög',  nameJp: 'ハムスター', emoji: '🐹', minLevel: 'N4', primary: 'hiki' },
{ id: 'hebi',      nameHu: 'kígyó',    nameJp: 'へび',      emoji: '🐍', minLevel: 'N4', primary: 'hiki' },
{ id: 'kame',      nameHu: 'teknős',   nameJp: 'かめ',      emoji: '🐢', minLevel: 'N4', primary: 'hiki' },
//hai (杯) — italok, poharak
{ id: 'mizu',     nameHu: 'víz',       nameJp: 'みず',      emoji: '💧', minLevel: 'N5', primary: 'hai' },
{ id: 'ocha',     nameHu: 'tea',       nameJp: 'おちゃ',    emoji: '🍵', minLevel: 'N5', primary: 'hai' },
{ id: 'koohii',   nameHu: 'kávé',      nameJp: 'コーヒー', emoji: '☕', minLevel: 'N5', primary: 'hai' },
{ id: 'juusu',    nameHu: 'gyümölcslé', nameJp: 'ジュース', emoji: '🧃', minLevel: 'N5', primary: 'hai' },
{ id: 'biiru',    nameHu: 'sör',       nameJp: 'ビール',    emoji: '🍺', minLevel: 'N4', primary: 'hai' },
{ id: 'suupu',    nameHu: 'leves',     nameJp: 'スープ',    emoji: '🍲', minLevel: 'N5', primary: 'hai' },
{ id: 'wain',     nameHu: 'bor',       nameJp: 'ワイン',    emoji: '🍷', minLevel: 'N4', primary: 'hai' },
//kai_floor (階) — emeletek
{ id: 'manshon',  nameHu: 'lakóépület', nameJp: 'マンション', emoji: '🏢', minLevel: 'N4', primary: 'kai_floor' },
{ id: 'biru',     nameHu: 'irodaház',  nameJp: 'ビル',       emoji: '🏬', minLevel: 'N4', primary: 'kai_floor' },
{ id: 'depaato',  nameHu: 'áruház',    nameJp: 'デパート',  emoji: '🏪', minLevel: 'N4', primary: 'kai_floor' },
{ id: 'hoteru',   nameHu: 'szálloda',  nameJp: 'ホテル',    emoji: '🏨', minLevel: 'N4', primary: 'kai_floor' },
//kai_times (回) — alkalmak
{ id: 'renshuu',  nameHu: 'gyakorlás', nameJp: 'れんしゅう', emoji: '📝', minLevel: 'N4', primary: 'kai_times' },
{ id: 'kaigi',    nameHu: 'megbeszélés', nameJp: 'かいぎ',   emoji: '👥', minLevel: 'N4', primary: 'kai_times' },
{ id: 'ryokou',   nameHu: 'utazás',    nameJp: 'りょこう',  emoji: '✈️', minLevel: 'N4', primary: 'kai_times' },
{ id: 'shiai',    nameHu: 'meccs',     nameJp: 'しあい',    emoji: '⚽', minLevel: 'N4', primary: 'kai_times' },
{ id: 'ressun',   nameHu: 'lecke (óra)', nameJp: 'レッスン', emoji: '📚', minLevel: 'N4', primary: 'kai_times' },
//ko (個) — kis darabok (formális) 
{ id: 'tamago',   nameHu: 'tojás',     nameJp: 'たまご',   emoji: '🥚', minLevel: 'N5', primary: 'ko', alternatives: ['tsu'] },
{ id: 'ishi',     nameHu: 'kő',        nameJp: 'いし',     emoji: '🪨', minLevel: 'N5', primary: 'ko', alternatives: ['tsu'] },
{ id: 'botan',    nameHu: 'gomb (ruha)', nameJp: 'ボタン', emoji: '🔘', minLevel: 'N4', primary: 'ko' },
{ id: 'ame_candy',nameHu: 'cukorka',   nameJp: 'アメ',     emoji: '🍬', minLevel: 'N5', primary: 'ko', alternatives: ['tsu'] },
{ id: 'jiishaku', nameHu: 'mágnes',    nameJp: 'じしゃく', emoji: '🧲', minLevel: 'N4', primary: 'ko' },
];
