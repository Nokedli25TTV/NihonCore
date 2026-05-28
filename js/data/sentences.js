/* ====================================================
   NIHONCORE — sentences.js (Mondat-Mester tartalom)
   ----------------------------------------------------
   NIHONCORE_SENTENCES — Tokenizált mondatok (N5/N4/N3).
   Engine: initPracticePage az app.js-ben.
   Token-séma: { type: 'word'|'particle'|'verb', jp, romaji, hu,
                 role? (particle), semantic? (időhatározó stb.) }
   Bővítés: új mondat = új objektum a tömb végére, mindig vesszővel.
   ==================================================== */
const NIHONCORE_SENTENCES = [

  // ── N5 — Alapok ─────────────────────────────────
  {
    id: 's_n5_001', level: 'N5', translation: 'Én sushit eszem.',
    tokens: [
      { type: 'word',     jp: '私',       romaji: 'watashi',   hu: 'én' },
      { type: 'particle', jp: 'は',       romaji: 'wa',        role: 'topic' },
      { type: 'word',     jp: '寿司',     romaji: 'sushi',     hu: 'sushi' },
      { type: 'particle', jp: 'を',       romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '食べます', romaji: 'tabemasu',  hu: 'eszem' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_002', level: 'N5', translation: 'A tanár a teremben van.',
    tokens: [
      { type: 'word',     jp: '先生',     romaji: 'sensei',     hu: 'tanár' },
      { type: 'particle', jp: 'は',       romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '教室',     romaji: 'kyoushitsu', hu: 'tanterem' },
      { type: 'particle', jp: 'に',       romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'います',   romaji: 'imasu',      hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_003', level: 'N5', translation: 'Egy könyv van az asztalon.',
    tokens: [
      { type: 'word',     jp: '本',       romaji: 'hon',       hu: 'könyv' },
      { type: 'particle', jp: 'が',       romaji: 'ga',        role: 'subject' },
      { type: 'word',     jp: '机',       romaji: 'tsukue',    hu: 'asztal' },
      { type: 'particle', jp: 'の',       romaji: 'no',        role: 'possession' },
      { type: 'word',     jp: '上',       romaji: 'ue',        hu: 'tetején' },
      { type: 'particle', jp: 'に',       romaji: 'ni',        role: 'location' },
      { type: 'verb',     jp: 'あります', romaji: 'arimasu',   hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_004', level: 'N5', translation: 'A barátommal megyek iskolába.',
    tokens: [
      { type: 'word',     jp: '友達',     romaji: 'tomodachi', hu: 'barát' },
      { type: 'particle', jp: 'と',       romaji: 'to',        role: 'companion' },
      { type: 'word',     jp: '学校',     romaji: 'gakkou',    hu: 'iskola' },
      { type: 'particle', jp: 'へ',       romaji: 'e',         role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',   hu: 'megyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_005', level: 'N5', translation: 'Japánul tanulok.',
    tokens: [
      { type: 'word',     jp: '私',         romaji: 'watashi',         hu: 'én' },
      { type: 'particle', jp: 'は',         romaji: 'wa',              role: 'topic' },
      { type: 'word',     jp: '日本語',     romaji: 'nihongo',         hu: 'japán nyelv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',              role: 'object' },
      { type: 'verb',     jp: '勉強します', romaji: 'benkyou shimasu', hu: 'tanulok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_006', level: 'N5', translation: 'Tegnap filmet néztem.',
    tokens: [
      { type: 'word',     jp: '昨日',     romaji: 'kinou',     hu: 'tegnap', semantic: 'time' },
      { type: 'word',     jp: '映画',     romaji: 'eiga',      hu: 'film' },
      { type: 'particle', jp: 'を',       romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '見ました', romaji: 'mimashita', hu: 'néztem' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n5_007', level: 'N5', translation: 'A kutya a kertben fut.',
    tokens: [
      { type: 'word',     jp: '犬',       romaji: 'inu',         hu: 'kutya' },
      { type: 'particle', jp: 'が',       romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '庭',       romaji: 'niwa',        hu: 'kert' },
      { type: 'particle', jp: 'で',       romaji: 'de',          role: 'location' },
      { type: 'verb',     jp: '走ります', romaji: 'hashirimasu', hu: 'fut' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_008', level: 'N5', translation: 'Tollal írok levelet.',
    tokens: [
      { type: 'word',     jp: 'ペン',     romaji: 'pen',      hu: 'toll' },
      { type: 'particle', jp: 'で',       romaji: 'de',       role: 'tool' },
      { type: 'word',     jp: '手紙',     romaji: 'tegami',   hu: 'levél' },
      { type: 'particle', jp: 'を',       romaji: 'wo',       role: 'object' },
      { type: 'verb',     jp: '書きます', romaji: 'kakimasu', hu: 'írok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_009', level: 'N5', translation: 'Holnap hazamegyek.',
    tokens: [
      { type: 'word',     jp: '明日',     romaji: 'asu',       hu: 'holnap', semantic: 'time' },
      { type: 'word',     jp: '家',       romaji: 'uchi',      hu: 'otthon' },
      { type: 'particle', jp: 'へ',       romaji: 'e',         role: 'direction' },
      { type: 'verb',     jp: '帰ります', romaji: 'kaerimasu', hu: 'hazamegyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_010', level: 'N5', translation: 'Nem ettem sushit.',
    tokens: [
      { type: 'word',     jp: '私',               romaji: 'watashi',           hu: 'én' },
      { type: 'particle', jp: 'は',               romaji: 'wa',                role: 'topic' },
      { type: 'word',     jp: '寿司',             romaji: 'sushi',             hu: 'sushi' },
      { type: 'particle', jp: 'を',               romaji: 'wo',                role: 'object' },
      { type: 'verb',     jp: '食べませんでした', romaji: 'tabemasen deshita', hu: 'nem ettem' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },

  // ── N5 — Question minták ────────────────────────
  {
    id: 's_n5_011', level: 'N5', translation: 'Te diák vagy?',
    tokens: [
      { type: 'word',     jp: 'あなた', romaji: 'anata',   hu: 'te' },
      { type: 'particle', jp: 'は',     romaji: 'wa',      role: 'topic' },
      { type: 'word',     jp: '学生',   romaji: 'gakusei', hu: 'diák' },
      { type: 'verb',     jp: 'ですか', romaji: 'desu ka', hu: 'vagy?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_012', level: 'N5', translation: 'Eszel sushit?',
    tokens: [
      { type: 'word',     jp: '寿司',       romaji: 'sushi',       hu: 'sushi' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '食べますか', romaji: 'tabemasu ka', hu: 'eszel?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Te-forma, Tai, Potenciális, Casual ─────
  {
    id: 's_n4_001', level: 'N4', translation: 'Éppen sushit eszem.',
    tokens: [
      { type: 'word',     jp: '私',           romaji: 'watashi',      hu: 'én' },
      { type: 'particle', jp: 'は',           romaji: 'wa',           role: 'topic' },
      { type: 'word',     jp: '寿司',         romaji: 'sushi',        hu: 'sushi' },
      { type: 'particle', jp: 'を',           romaji: 'wo',           role: 'object' },
      { type: 'verb',     jp: '食べています', romaji: 'tabete imasu', hu: 'éppen eszem' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Progressive', register: 'Polite' }
  },
  {
    id: 's_n4_002', level: 'N4', translation: 'Adtam a barátnak egy könyvet.',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',  hu: 'barát' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'goal' },
      { type: 'word',     jp: '本',         romaji: 'hon',        hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',         role: 'object' },
      { type: 'verb',     jp: 'あげました', romaji: 'agemashita', hu: 'adtam' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_003', level: 'N4', translation: 'Kérlek, írj egy levelet.',
    tokens: [
      { type: 'word',     jp: '手紙',           romaji: 'tegami',        hu: 'levél' },
      { type: 'particle', jp: 'を',             romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: '書いてください', romaji: 'kaite kudasai', hu: 'írj kérlek' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_004', level: 'N4', translation: 'Tegnap filmet néztem. (bizalmas)',
    tokens: [
      { type: 'word',     jp: '昨日', romaji: 'kinou', hu: 'tegnap', semantic: 'time' },
      { type: 'word',     jp: '映画', romaji: 'eiga',  hu: 'film' },
      { type: 'particle', jp: 'を',   romaji: 'wo',    role: 'object' },
      { type: 'verb',     jp: '見た', romaji: 'mita',  hu: 'néztem' }
    ],
    metadata: { function: 'Affirmative', form: 'Ta', tense: 'Past', register: 'Casual' }
  },
  {
    id: 's_n4_005', level: 'N4', translation: 'Tudsz vizet inni?',
    tokens: [
      { type: 'word',     jp: '水',         romaji: 'mizu',        hu: 'víz' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '飲めますか', romaji: 'nomemasu ka', hu: 'tudsz inni?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_006', level: 'N4', translation: 'Megettem a sushit. (bizalmas)',
    tokens: [
      { type: 'word',     jp: '寿司',   romaji: 'sushi',  hu: 'sushi' },
      { type: 'particle', jp: 'を',     romaji: 'wo',     role: 'object' },
      { type: 'verb',     jp: '食べた', romaji: 'tabeta', hu: 'megettem' }
    ],
    metadata: { function: 'Affirmative', form: 'Ta', tense: 'Past', register: 'Casual' }
  },
  {
    id: 's_n4_007', level: 'N4', translation: 'Nem akarok bemenni. (bizalmas)',
    tokens: [
      { type: 'word',     jp: '私',           romaji: 'watashi',      hu: 'én' },
      { type: 'particle', jp: 'は',           romaji: 'wa',           role: 'topic' },
      { type: 'verb',     jp: '入りたくない', romaji: 'hairitakunai', hu: 'nem akarok bemenni' }
    ],
    metadata: { function: 'Negative', form: 'Nai', tense: 'Non-Past', register: 'Casual' }
  },

  // ── N3 — Komplex aspektusok és szerkezetek ──────
  {
    id: 's_n3_001', level: 'N3', translation: 'Megettem az egész sushit.',
    tokens: [
      { type: 'word',     jp: '寿司',               romaji: 'sushi',                hu: 'sushi' },
      { type: 'particle', jp: 'を',                 romaji: 'wo',                   role: 'object' },
      { type: 'verb',     jp: '食べてしまいました', romaji: 'tabete shimaimashita', hu: 'megettem' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n3_002', level: 'N3', translation: 'A tanár megdicsért engem.',
    tokens: [
      { type: 'word',     jp: '私',             romaji: 'watashi',          hu: 'én' },
      { type: 'particle', jp: 'は',             romaji: 'wa',               role: 'topic' },
      { type: 'word',     jp: '先生',           romaji: 'sensei',           hu: 'tanár' },
      { type: 'particle', jp: 'に',             romaji: 'ni',               role: 'goal' },
      { type: 'verb',     jp: 'ほめられました', romaji: 'homerare mashita', hu: 'megdicsértek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n3_003', level: 'N3', translation: 'Anya zöldséget etetett a gyerekkel.',
    tokens: [
      { type: 'word',     jp: '母',             romaji: 'haha',            hu: 'anya' },
      { type: 'particle', jp: 'は',             romaji: 'wa',              role: 'topic' },
      { type: 'word',     jp: '子供',           romaji: 'kodomo',          hu: 'gyerek' },
      { type: 'particle', jp: 'に',             romaji: 'ni',              role: 'goal' },
      { type: 'word',     jp: '野菜',           romaji: 'yasai',           hu: 'zöldség' },
      { type: 'particle', jp: 'を',             romaji: 'wo',              role: 'object' },
      { type: 'verb',     jp: '食べさせました', romaji: 'tabesasemashita', hu: 'etette' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n3_004', level: 'N3', translation: 'Előre felkészülök.',
    tokens: [
      { type: 'word',     jp: '準備',         romaji: 'junbi',         hu: 'felkészülés' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: 'しておきます', romaji: 'shite okimasu', hu: 'előre megcsinálom' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n3_005', level: 'N3', translation: 'Jobb lenne, ha bevennéd a gyógyszert.',
    tokens: [
      { type: 'word',     jp: '薬',                   romaji: 'kusuri',               hu: 'gyógyszer' },
      { type: 'particle', jp: 'を',                   romaji: 'wo',                   role: 'object' },
      { type: 'verb',     jp: '飲んだほうがいいです', romaji: 'nonda hou ga ii desu', hu: 'jobb ha beveszed' }
    ],
    metadata: { function: 'Affirmative', form: 'Ta', tense: 'Non-Past', register: 'Polite' }
  },

  // ════════════════════════════════════════════════════
  //  V7 P3 content-batch 1 (2026-05-25) — +51 mondat
  //  N5: s_n5_013..s_n5_042 (+30) · N4: s_n4_008..s_n4_021 (+14) · N3: s_n3_006..s_n3_013 (+8)
  // ════════════════════════════════════════════════════

  // ── N5 — Napi élet ──────────────────────────────
  {
    id: 's_n5_013', level: 'N5', translation: 'Reggel kávét iszom.',
    tokens: [
      { type: 'word',     jp: '朝',         romaji: 'asa',      hu: 'reggel', semantic: 'time' },
      { type: 'word',     jp: 'コーヒー',   romaji: 'koohii',   hu: 'kávé' },
      { type: 'particle', jp: 'を',         romaji: 'wo',       role: 'object' },
      { type: 'verb',     jp: '飲みます',   romaji: 'nomimasu', hu: 'iszom' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_014', level: 'N5', translation: 'Minden nap fogat mosok.',
    tokens: [
      { type: 'word',     jp: '毎日',       romaji: 'mainichi',    hu: 'minden nap', semantic: 'time' },
      { type: 'word',     jp: '歯',         romaji: 'ha',          hu: 'fog' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '磨きます',   romaji: 'migakimasu',  hu: 'mosok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_015', level: 'N5', translation: 'Az édesanyám a konyhában főz.',
    tokens: [
      { type: 'word',     jp: '母',         romaji: 'haha',           hu: 'édesanyám' },
      { type: 'particle', jp: 'は',         romaji: 'wa',             role: 'topic' },
      { type: 'word',     jp: 'キッチン',   romaji: 'kitchin',        hu: 'konyha' },
      { type: 'particle', jp: 'で',         romaji: 'de',             role: 'location' },
      { type: 'verb',     jp: '料理します', romaji: 'ryouri shimasu', hu: 'főz' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_016', level: 'N5', translation: 'Nem megyek moziba.',
    tokens: [
      { type: 'word',     jp: '映画館',     romaji: 'eigakan',    hu: 'mozi' },
      { type: 'particle', jp: 'へ',         romaji: 'e',          role: 'direction' },
      { type: 'verb',     jp: '行きません', romaji: 'ikimasen',   hu: 'nem megyek' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_017', level: 'N5', translation: 'Mikor jön a barátod?',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi', hu: 'barát' },
      { type: 'particle', jp: 'は',         romaji: 'wa',        role: 'topic' },
      { type: 'word',     jp: 'いつ',       romaji: 'itsu',      hu: 'mikor' },
      { type: 'verb',     jp: '来ますか',   romaji: 'kimasu ka', hu: 'jön?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_018', level: 'N5', translation: 'Tegnap nem dolgoztam.',
    tokens: [
      { type: 'word',     jp: '昨日',               romaji: 'kinou',                  hu: 'tegnap', semantic: 'time' },
      { type: 'verb',     jp: '働きませんでした',   romaji: 'hatarakimasen deshita',  hu: 'nem dolgoztam' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },

  // ── N5 — Helymeghatározás / létezés ─────────────
  {
    id: 's_n5_019', level: 'N5', translation: 'A macska az ágyon van.',
    tokens: [
      { type: 'word',     jp: '猫',       romaji: 'neko',    hu: 'macska' },
      { type: 'particle', jp: 'は',       romaji: 'wa',      role: 'topic' },
      { type: 'word',     jp: 'ベッド',   romaji: 'beddo',   hu: 'ágy' },
      { type: 'particle', jp: 'の',       romaji: 'no',      role: 'possession' },
      { type: 'word',     jp: '上',       romaji: 'ue',      hu: 'tetején' },
      { type: 'particle', jp: 'に',       romaji: 'ni',      role: 'location' },
      { type: 'verb',     jp: 'います',   romaji: 'imasu',   hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_020', level: 'N5', translation: 'Az asztalon toll van.',
    tokens: [
      { type: 'word',     jp: '机',       romaji: 'tsukue',  hu: 'asztal' },
      { type: 'particle', jp: 'の',       romaji: 'no',      role: 'possession' },
      { type: 'word',     jp: '上',       romaji: 'ue',      hu: 'tetején' },
      { type: 'particle', jp: 'に',       romaji: 'ni',      role: 'location' },
      { type: 'word',     jp: 'ペン',     romaji: 'pen',     hu: 'toll' },
      { type: 'particle', jp: 'が',       romaji: 'ga',      role: 'subject' },
      { type: 'verb',     jp: 'あります', romaji: 'arimasu', hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_021', level: 'N5', translation: 'Nincs tej a hűtőben.',
    tokens: [
      { type: 'word',     jp: '冷蔵庫',   romaji: 'reizouko',   hu: 'hűtő' },
      { type: 'particle', jp: 'に',       romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'ミルク',   romaji: 'miruku',     hu: 'tej' },
      { type: 'particle', jp: 'が',       romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'ありません', romaji: 'arimasen', hu: 'nincs' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_022', level: 'N5', translation: 'Mi van a táskában?',
    tokens: [
      { type: 'word',     jp: 'カバン',   romaji: 'kaban',      hu: 'táska' },
      { type: 'particle', jp: 'の',       romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',       romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',       romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '何',       romaji: 'nani',       hu: 'mi' },
      { type: 'particle', jp: 'が',       romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'ありますか', romaji: 'arimasu ka', hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_023', level: 'N5', translation: 'Holnap vizsgám van.',
    tokens: [
      { type: 'word',     jp: '明日',     romaji: 'ashita',   hu: 'holnap', semantic: 'time' },
      { type: 'word',     jp: '試験',     romaji: 'shiken',   hu: 'vizsga' },
      { type: 'particle', jp: 'が',       romaji: 'ga',       role: 'subject' },
      { type: 'verb',     jp: 'あります', romaji: 'arimasu',  hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — Mozgás / közlekedés ─────────────────────
  {
    id: 's_n5_024', level: 'N5', translation: 'Nyáron Japánba megyek.',
    tokens: [
      { type: 'word',     jp: '夏',       romaji: 'natsu',    hu: 'nyár', semantic: 'time' },
      { type: 'particle', jp: 'に',       romaji: 'ni',       role: 'goal' },
      { type: 'word',     jp: '日本',     romaji: 'nihon',    hu: 'Japán' },
      { type: 'particle', jp: 'へ',       romaji: 'e',        role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',  hu: 'megyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_025', level: 'N5', translation: 'Vonattal megyek Oszakába.',
    tokens: [
      { type: 'word',     jp: '電車',     romaji: 'densha',   hu: 'vonat' },
      { type: 'particle', jp: 'で',       romaji: 'de',       role: 'tool' },
      { type: 'word',     jp: '大阪',     romaji: 'oosaka',   hu: 'Oszaka' },
      { type: 'particle', jp: 'へ',       romaji: 'e',        role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',  hu: 'megyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_026', level: 'N5', translation: 'A nővéremmel megyek bevásárolni.',
    tokens: [
      { type: 'word',     jp: '姉',       romaji: 'ane',        hu: 'nővér' },
      { type: 'particle', jp: 'と',       romaji: 'to',         role: 'companion' },
      { type: 'word',     jp: '買い物',   romaji: 'kaimono',    hu: 'bevásárlás' },
      { type: 'particle', jp: 'へ',       romaji: 'e',          role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',    hu: 'megyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_027', level: 'N5', translation: 'Az apám autóval megy munkába.',
    tokens: [
      { type: 'word',     jp: '父',       romaji: 'chichi',   hu: 'apám' },
      { type: 'particle', jp: 'は',       romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '車',       romaji: 'kuruma',   hu: 'autó' },
      { type: 'particle', jp: 'で',       romaji: 'de',       role: 'tool' },
      { type: 'word',     jp: '仕事',     romaji: 'shigoto',  hu: 'munka' },
      { type: 'particle', jp: 'へ',       romaji: 'e',        role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',  hu: 'megy' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_028', level: 'N5', translation: 'A testvérem nem jön haza.',
    tokens: [
      { type: 'word',     jp: '弟',         romaji: 'otouto',    hu: 'öcsém' },
      { type: 'particle', jp: 'は',         romaji: 'wa',        role: 'topic' },
      { type: 'word',     jp: '家',         romaji: 'ie',        hu: 'otthon' },
      { type: 'particle', jp: 'に',         romaji: 'ni',        role: 'goal' },
      { type: 'verb',     jp: '帰りません', romaji: 'kaerimasen', hu: 'nem jön haza' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_029', level: 'N5', translation: 'Szombaton moziba megyek.',
    tokens: [
      { type: 'word',     jp: '土曜日',   romaji: 'doyoubi',  hu: 'szombat', semantic: 'time' },
      { type: 'particle', jp: 'に',       romaji: 'ni',       role: 'goal' },
      { type: 'word',     jp: '映画館',   romaji: 'eigakan',  hu: 'mozi' },
      { type: 'particle', jp: 'へ',       romaji: 'e',        role: 'direction' },
      { type: 'verb',     jp: '行きます', romaji: 'ikimasu',  hu: 'megyek' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — Étel / ital ────────────────────────────
  {
    id: 's_n5_030', level: 'N5', translation: 'Teát iszom reggelire.',
    tokens: [
      { type: 'word',     jp: '朝ごはん', romaji: 'asagohan', hu: 'reggeli' },
      { type: 'particle', jp: 'に',       romaji: 'ni',       role: 'goal' },
      { type: 'word',     jp: 'お茶',     romaji: 'ocha',     hu: 'tea' },
      { type: 'particle', jp: 'を',       romaji: 'wo',       role: 'object' },
      { type: 'verb',     jp: '飲みます', romaji: 'nomimasu', hu: 'iszom' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_031', level: 'N5', translation: 'Nem iszom alkoholt.',
    tokens: [
      { type: 'word',     jp: 'お酒',       romaji: 'osake',     hu: 'alkohol' },
      { type: 'particle', jp: 'を',         romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '飲みません', romaji: 'nomimasen', hu: 'nem iszom' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_032', level: 'N5', translation: 'Tegnap sokat ettem.',
    tokens: [
      { type: 'word',     jp: '昨日',       romaji: 'kinou',       hu: 'tegnap', semantic: 'time' },
      { type: 'word',     jp: 'たくさん',   romaji: 'takusan',     hu: 'sokat' },
      { type: 'verb',     jp: '食べました', romaji: 'tabemashita', hu: 'ettem' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n5_033', level: 'N5', translation: 'Nem ettem reggelit.',
    tokens: [
      { type: 'word',     jp: '朝ごはん',             romaji: 'asagohan',          hu: 'reggeli' },
      { type: 'particle', jp: 'を',                   romaji: 'wo',                role: 'object' },
      { type: 'verb',     jp: '食べませんでした',     romaji: 'tabemasen deshita', hu: 'nem ettem' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n5_034', level: 'N5', translation: 'Ebéden rizst eszem.',
    tokens: [
      { type: 'word',     jp: '昼ごはん', romaji: 'hirugohan', hu: 'ebéd' },
      { type: 'particle', jp: 'に',       romaji: 'ni',        role: 'goal' },
      { type: 'word',     jp: 'ご飯',     romaji: 'gohan',     hu: 'rizs' },
      { type: 'particle', jp: 'を',       romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '食べます', romaji: 'tabemasu',  hu: 'eszem' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_035', level: 'N5', translation: 'Mikor etted meg?',
    tokens: [
      { type: 'word',     jp: 'いつ',         romaji: 'itsu',          hu: 'mikor' },
      { type: 'verb',     jp: '食べましたか', romaji: 'tabemashita ka', hu: 'etted meg?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Past', register: 'Polite' }
  },

  // ── N5 — Hobbi / szabadidő ───────────────────────
  {
    id: 's_n5_036', level: 'N5', translation: 'Zenét hallgatok.',
    tokens: [
      { type: 'word',     jp: '音楽',     romaji: 'ongaku',   hu: 'zene' },
      { type: 'particle', jp: 'を',       romaji: 'wo',       role: 'object' },
      { type: 'verb',     jp: '聴きます', romaji: 'kikimasu', hu: 'hallgatok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_037', level: 'N5', translation: 'Este könyvet olvasok.',
    tokens: [
      { type: 'word',     jp: '夜',       romaji: 'yoru',     hu: 'este', semantic: 'time' },
      { type: 'word',     jp: '本',       romaji: 'hon',      hu: 'könyv' },
      { type: 'particle', jp: 'を',       romaji: 'wo',       role: 'object' },
      { type: 'verb',     jp: '読みます', romaji: 'yomimasu', hu: 'olvasok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_038', level: 'N5', translation: 'A barátom gitározik.',
    tokens: [
      { type: 'word',     jp: '友達',     romaji: 'tomodachi', hu: 'barátom' },
      { type: 'particle', jp: 'は',       romaji: 'wa',        role: 'topic' },
      { type: 'word',     jp: 'ギター',   romaji: 'gitaa',     hu: 'gitár' },
      { type: 'particle', jp: 'を',       romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '弾きます', romaji: 'hikimasu',  hu: 'gitározik' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_039', level: 'N5', translation: 'A gyerekek a parkban játszanak.',
    tokens: [
      { type: 'word',     jp: '子供たち', romaji: 'kodomotachi', hu: 'gyerekek' },
      { type: 'particle', jp: 'は',       romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '公園',     romaji: 'kouen',       hu: 'park' },
      { type: 'particle', jp: 'で',       romaji: 'de',          role: 'location' },
      { type: 'verb',     jp: '遊びます', romaji: 'asobimasu',   hu: 'játszanak' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_040', level: 'N5', translation: 'Boltban dolgozom.',
    tokens: [
      { type: 'word',     jp: 'お店',       romaji: 'omise',       hu: 'bolt' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location' },
      { type: 'verb',     jp: '働きます',   romaji: 'hatarakimasu', hu: 'dolgozom' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — Eszköz / kérdések (összefoglaló) ────────
  {
    id: 's_n5_041', level: 'N5', translation: 'Vízzel mosod a kezedet?',
    tokens: [
      { type: 'word',     jp: '水',         romaji: 'mizu',      hu: 'víz' },
      { type: 'particle', jp: 'で',         romaji: 'de',        role: 'tool' },
      { type: 'word',     jp: '手',         romaji: 'te',        hu: 'kéz' },
      { type: 'particle', jp: 'を',         romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: '洗いますか', romaji: 'araimasu ka', hu: 'mosod?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_042', level: 'N5', translation: 'A szobámban tanulok.',
    tokens: [
      { type: 'word',     jp: '私',           romaji: 'watashi',         hu: 'én' },
      { type: 'particle', jp: 'は',           romaji: 'wa',              role: 'topic' },
      { type: 'word',     jp: '部屋',         romaji: 'heya',            hu: 'szoba' },
      { type: 'particle', jp: 'で',           romaji: 'de',              role: 'location' },
      { type: 'verb',     jp: '勉強します',   romaji: 'benkyou shimasu', hu: 'tanulok' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Te-iru progresszív ──────────────────────
  {
    id: 's_n4_008', level: 'N4', translation: 'Éppen könyvet olvasok.',
    tokens: [
      { type: 'word',     jp: '私',           romaji: 'watashi',      hu: 'én' },
      { type: 'particle', jp: 'は',           romaji: 'wa',           role: 'topic' },
      { type: 'word',     jp: '本',           romaji: 'hon',          hu: 'könyv' },
      { type: 'particle', jp: 'を',           romaji: 'wo',           role: 'object' },
      { type: 'verb',     jp: '読んでいます', romaji: 'yonde imasu',  hu: 'éppen olvasok' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Progressive', register: 'Polite' }
  },
  {
    id: 's_n4_009', level: 'N4', translation: 'A barátom éppen alszik.',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',  hu: 'barátom' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'verb',     jp: '寝ています', romaji: 'nete imasu', hu: 'alszik' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Progressive', register: 'Polite' }
  },
  {
    id: 's_n4_010', level: 'N4', translation: 'Tokióban élek.',
    tokens: [
      { type: 'word',     jp: '東京',           romaji: 'toukyou',     hu: 'Tokió' },
      { type: 'particle', jp: 'に',             romaji: 'ni',          role: 'location' },
      { type: 'verb',     jp: '住んでいます',   romaji: 'sunde imasu', hu: 'élek' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Progressive', register: 'Polite' }
  },
  {
    id: 's_n4_011', level: 'N4', translation: 'Még nem ettem.',
    tokens: [
      { type: 'word',     jp: 'まだ',             romaji: 'mada',              hu: 'még' },
      { type: 'verb',     jp: '食べていません',   romaji: 'tabete imasen',     hu: 'nem ettem' }
    ],
    metadata: { function: 'Negative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Tai / Takunai ───────────────────────────
  {
    id: 's_n4_012', level: 'N4', translation: 'Japánba akarok menni.',
    tokens: [
      { type: 'word',     jp: '日本',         romaji: 'nihon',        hu: 'Japán' },
      { type: 'particle', jp: 'へ',           romaji: 'e',            role: 'direction' },
      { type: 'verb',     jp: '行きたいです', romaji: 'ikitai desu',  hu: 'akarok menni' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_013', level: 'N4', translation: 'Holnap nem akarok dolgozni.',
    tokens: [
      { type: 'word',     jp: '明日',               romaji: 'ashita',              hu: 'holnap', semantic: 'time' },
      { type: 'verb',     jp: '働きたくないです',   romaji: 'hatarakitakunai desu', hu: 'nem akarok dolgozni' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_014', level: 'N4', translation: 'Sushit akarok enni!',
    tokens: [
      { type: 'word',     jp: '寿司',           romaji: 'sushi',          hu: 'sushi' },
      { type: 'particle', jp: 'を',             romaji: 'wo',             role: 'object' },
      { type: 'verb',     jp: '食べたいです',   romaji: 'tabetai desu',   hu: 'akarok enni' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Potenciális ────────────────────────────
  {
    id: 's_n4_015', level: 'N4', translation: 'Tudok japánul.',
    tokens: [
      { type: 'word',     jp: '日本語',       romaji: 'nihongo',      hu: 'japán' },
      { type: 'particle', jp: 'が',           romaji: 'ga',           role: 'subject' },
      { type: 'verb',     jp: '話せます',     romaji: 'hanasemasu',   hu: 'tudok beszélni' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_016', level: 'N4', translation: 'Nem tudok sushit enni.',
    tokens: [
      { type: 'word',     jp: '寿司',             romaji: 'sushi',           hu: 'sushi' },
      { type: 'particle', jp: 'が',               romaji: 'ga',              role: 'subject' },
      { type: 'verb',     jp: '食べられません',   romaji: 'taberaremasen',   hu: 'nem tudok enni' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Te-kudasai / kérés ──────────────────────
  {
    id: 's_n4_017', level: 'N4', translation: 'Vedd fel a kabátot!',
    tokens: [
      { type: 'word',     jp: 'コート',           romaji: 'kooto',           hu: 'kabát' },
      { type: 'particle', jp: 'を',               romaji: 'wo',              role: 'object' },
      { type: 'verb',     jp: '着てください',     romaji: 'kite kudasai',    hu: 'vedd fel kérlek' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_018', level: 'N4', translation: 'Kérlek, gyere holnap!',
    tokens: [
      { type: 'word',     jp: '明日',           romaji: 'ashita',          hu: 'holnap', semantic: 'time' },
      { type: 'verb',     jp: '来てください',   romaji: 'kite kudasai',    hu: 'gyere kérlek' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_019', level: 'N4', translation: 'Kérem, ne dohányozzon!',
    tokens: [
      { type: 'word',     jp: 'タバコ',                 romaji: 'tabako',                  hu: 'cigaretta' },
      { type: 'particle', jp: 'を',                     romaji: 'wo',                      role: 'object' },
      { type: 'verb',     jp: '吸わないでください',     romaji: 'suwanaide kudasai',       hu: 'ne szívjon kérlek' }
    ],
    metadata: { function: 'Negative', form: 'Nai', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N4 — Ageru / morau ──────────────────────────
  {
    id: 's_n4_020', level: 'N4', translation: 'Megöntöztem a virágot.',
    tokens: [
      { type: 'word',     jp: '花',         romaji: 'hana',        hu: 'virág' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'goal' },
      { type: 'word',     jp: '水',         romaji: 'mizu',        hu: 'víz' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'あげました', romaji: 'agemashita',  hu: 'adtam / öntöztem' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_021', level: 'N4', translation: 'Már megcsináltam a házifeladatot.',
    tokens: [
      { type: 'word',     jp: 'もう',       romaji: 'mou',         hu: 'már' },
      { type: 'word',     jp: '宿題',       romaji: 'shukudai',    hu: 'házifeladat' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'やりました', romaji: 'yarimashita', hu: 'megcsináltam' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Past', register: 'Polite' }
  },

  // ── N3 — たことがある (tapasztalat) ───────────────
  {
    id: 's_n3_006', level: 'N3', translation: 'Ettél már valaha sushit?',
    tokens: [
      { type: 'word',     jp: '寿司',                     romaji: 'sushi',                    hu: 'sushi' },
      { type: 'particle', jp: 'を',                       romaji: 'wo',                       role: 'object' },
      { type: 'verb',     jp: '食べたことがありますか',   romaji: 'tabeta koto ga arimasu ka', hu: 'ettél már?' }
    ],
    metadata: { function: 'Question', form: 'Ta', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n3_007', level: 'N3', translation: 'Még soha nem voltam Japánban.',
    tokens: [
      { type: 'word',     jp: '日本',                         romaji: 'nihon',                        hu: 'Japán' },
      { type: 'particle', jp: 'へ',                           romaji: 'e',                            role: 'direction' },
      { type: 'verb',     jp: '行ったことがありません',       romaji: 'itta koto ga arimasen',        hu: 'soha nem voltam' }
    ],
    metadata: { function: 'Negative', form: 'Ta', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N3 — ほうがいい (tanács) ──────────────────────
  {
    id: 's_n3_008', level: 'N3', translation: 'Jobb lenne, ha mennél orvoshoz.',
    tokens: [
      { type: 'word',     jp: '病院',                     romaji: 'byouin',                   hu: 'kórház / orvos' },
      { type: 'particle', jp: 'へ',                       romaji: 'e',                        role: 'direction' },
      { type: 'verb',     jp: '行ったほうがいいです',     romaji: 'itta hou ga ii desu',      hu: 'jobb ha elmész' }
    ],
    metadata: { function: 'Affirmative', form: 'Ta', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N3 — てしまう (befejezettség / sajnálat) ─────
  {
    id: 's_n3_009', level: 'N3', translation: 'Elolvastam az összes könyvet.',
    tokens: [
      { type: 'word',     jp: '本',                   romaji: 'hon',                      hu: 'könyv' },
      { type: 'particle', jp: 'を',                   romaji: 'wo',                       role: 'object' },
      { type: 'word',     jp: '全部',                 romaji: 'zenbu',                    hu: 'mind' },
      { type: 'verb',     jp: '読んでしまいました',   romaji: 'yonde shimaimashita',      hu: 'elolvastam (mind)' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Past', register: 'Polite' }
  },

  // ── N3 — ておく (előkészítés) ────────────────────
  {
    id: 's_n3_010', level: 'N3', translation: 'Előre elkészítem az ebédet.',
    tokens: [
      { type: 'word',     jp: '昼ごはん',         romaji: 'hirugohan',         hu: 'ebéd' },
      { type: 'particle', jp: 'を',               romaji: 'wo',                role: 'object' },
      { type: 'verb',     jp: '作っておきます',   romaji: 'tsukutte okimasu',  hu: 'előre elkészítem' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N3 — ために (cél) ────────────────────────────
  {
    id: 's_n3_011', level: 'N3', translation: 'Japánul tanulok azért, hogy megértsem a filmeket.',
    tokens: [
      { type: 'word',     jp: '映画',                   romaji: 'eiga',                    hu: 'film' },
      { type: 'particle', jp: 'を',                     romaji: 'wo',                      role: 'object' },
      { type: 'word',     jp: '分かるために',           romaji: 'wakaru tame ni',          hu: 'megérteni azért hogy' },
      { type: 'word',     jp: '日本語',                 romaji: 'nihongo',                 hu: 'japán' },
      { type: 'particle', jp: 'を',                     romaji: 'wo',                      role: 'object' },
      { type: 'verb',     jp: '勉強しています',         romaji: 'benkyou shite imasu',     hu: 'tanulok' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Progressive', register: 'Polite' }
  },

  // ── N3 — ながら (egyidejűség) ─────────────────────
  {
    id: 's_n3_012', level: 'N3', translation: 'Zenét hallgatva futott.',
    tokens: [
      { type: 'word',     jp: '音楽',                 romaji: 'ongaku',                  hu: 'zene' },
      { type: 'particle', jp: 'を',                   romaji: 'wo',                      role: 'object' },
      { type: 'verb',     jp: '聴きながら走りました', romaji: 'kikinagara hashirimashita', hu: 'zenét hallgatva futott' }
    ],
    metadata: { function: 'Affirmative', form: 'Te', tense: 'Past', register: 'Polite' }
  },

  // ── N3 — ～そうです (látszat / valószínűség) ──────
  {
    id: 's_n3_013', level: 'N3', translation: 'Úgy tűnik, esni fog.',
    tokens: [
      { type: 'word',     jp: '雨',             romaji: 'ame',             hu: 'eső' },
      { type: 'particle', jp: 'が',             romaji: 'ga',              role: 'subject' },
      { type: 'verb',     jp: '降りそうです',   romaji: 'furisou desu',    hu: 'úgy tűnik esik' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },

  // ════════════════════════════════════════════════════
  //  V7 P3 content batch 2 (2026-05-25) — +110 N5 mondat
  //  s_n5_043..s_n5_152 (4 szekció, mind N5)
  //  Tisztítás: 'copula' → 'verb', 'modifier' role → 'possession'
  //  Forrás: NIHONCORE_SENTENCES_Bovitett.js (user-írt batch)
  // ════════════════════════════════════════════════════

  // ── N5 — 1. szekció: Tárgyak mutatása (これ・それ・あれ + の) ──
  {
    id: 's_n5_043', level: 'N5', translation: 'Ez Réka táskája.',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'レカさん',   romaji: 'reka-san', hu: 'Réka' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'カバン',     romaji: 'kaban',    hu: 'táska' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_044', level: 'N5', translation: 'Az az én esernyőm.',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '傘',         romaji: 'kasa',     hu: 'esernyő' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_045', level: 'N5', translation: 'Amott a tanár úr autója.',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '先生',       romaji: 'sensei',   hu: 'tanár' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '車',         romaji: 'kuruma',   hu: 'autó' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_046', level: 'N5', translation: 'Ez a te kulcsod?',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'あなた',     romaji: 'anata',    hu: 'te' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '鍵',         romaji: 'kagi',     hu: 'kulcs' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_047', level: 'N5', translation: 'Az nem a barátom telefonja.',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '友達',       romaji: 'tomodachi', hu: 'barát' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'スマホ',     romaji: 'sumaho',   hu: 'telefon' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem az' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_048', level: 'N5', translation: 'Amott a bátyám kerékpárja?',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '兄',         romaji: 'ani',      hu: 'bátyám' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '自転車',     romaji: 'jitensha', hu: 'kerékpár' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_049', level: 'N5', translation: 'Ez az én cipőm.',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '靴',         romaji: 'kutsu',    hu: 'cipő' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_050', level: 'N5', translation: 'Az a japán nyelvkönyv?',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '日本語',     romaji: 'nihongo',  hu: 'japán nyelv' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '教科書',     romaji: 'kyoukasho', hu: 'tankönyv' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_051', level: 'N5', translation: 'Amott az apám órája.',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '父',         romaji: 'chichi',   hu: 'apám' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '時計',       romaji: 'tokei',    hu: 'óra' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_052', level: 'N5', translation: 'Ez nem az én tollam.',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'ペン',       romaji: 'pen',      hu: 'toll' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem az' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_053', level: 'N5', translation: 'Az kinek a számítógépe?',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '誰',         romaji: 'dare',     hu: 'ki' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'パソコン',   romaji: 'pasokon',  hu: 'számítógép' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_054', level: 'N5', translation: 'Amott Boti pénztárcája.',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'ボティさん',   romaji: 'boti-san', hu: 'Boti' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '財布',       romaji: 'saifu',    hu: 'pénztárca' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_055', level: 'N5', translation: 'Ez a húgom játéka.',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '妹',         romaji: 'imouto',   hu: 'húgom' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'おもちゃ',   romaji: 'omocha',   hu: 'játék' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_056', level: 'N5', translation: 'Az az iskola kulcsa?',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '学校',       romaji: 'gakkou',   hu: 'iskola' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '鍵',         romaji: 'kagi',     hu: 'kulcs' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_057', level: 'N5', translation: 'Amott nem a cég autója.',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '会社',       romaji: 'kaisha',   hu: 'cég' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '車',         romaji: 'kuruma',   hu: 'autó' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem az' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_058', level: 'N5', translation: 'Ez kinek az esernyője?',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '誰',         romaji: 'dare',     hu: 'ki' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '傘',         romaji: 'kasa',     hu: 'esernyő' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_059', level: 'N5', translation: 'Az az anyukám szemüvege.',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '母',         romaji: 'haha',     hu: 'anyám' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '眼鏡',       romaji: 'megane',   hu: 'szemüveg' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_060', level: 'N5', translation: 'Amott a repülőtér busza?',
    tokens: [
      { type: 'word',     jp: 'あれ',       romaji: 'are',      hu: 'az amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '空港',       romaji: 'kuukou',   hu: 'repülőtér' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'バス',       romaji: 'basu',     hu: 'busz' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_061', level: 'N5', translation: 'Ez egy angol újság.',
    tokens: [
      { type: 'word',     jp: 'これ',       romaji: 'kore',     hu: 'ez' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '英語',       romaji: 'eigo',     hu: 'angol' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: '新聞',       romaji: 'shinbun',  hu: 'újság' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_062', level: 'N5', translation: 'Az nem az én füzetem.',
    tokens: [
      { type: 'word',     jp: 'それ',       romaji: 'sore',     hu: 'az (hozzád közel)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'word',     jp: 'ノート',     romaji: 'nooto',    hu: 'füzet' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem az' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — 2. szekció: Helyszínek (ここ・そこ・あそこ + どこ) ──
  {
    id: 's_n5_063', level: 'N5', translation: 'Itt van a mosdó.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'トイレ',     romaji: 'toire',    hu: 'mosdó' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_064', level: 'N5', translation: 'Hol van a repülőtér?',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',   hu: 'repülőtér' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_065', level: 'N5', translation: 'Amott van a kényelmi bolt (konbini).',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'コンビニ',   romaji: 'konbini',  hu: 'kényelmi bolt' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_066', level: 'N5', translation: 'Ott van a jegypénztár?',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '切符売り場', romaji: 'kippuuriba', hu: 'jegypénztár' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_067', level: 'N5', translation: 'Hol van a csomagmegőrző (coin locker)?',
    tokens: [
      { type: 'word',     jp: 'コインロッカー', romaji: 'koinrokkaa', hu: 'csomagmegőrző' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',       hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',    hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_068', level: 'N5', translation: 'Itt nem a kijárat van.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '出口',       romaji: 'deguchi',  hu: 'kijárat' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_069', level: 'N5', translation: 'Ott van a jegykapu.',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '改札口',     romaji: 'kaisatsuguchi', hu: 'jegykapu' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_070', level: 'N5', translation: 'Amott nem szálloda van.',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'ホテル',     romaji: 'hoteru',   hu: 'szálloda' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_071', level: 'N5', translation: 'Hol van a metróállomás?',
    tokens: [
      { type: 'word',     jp: '地下鉄',     romaji: 'chikatetsu', hu: 'metró' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '駅',         romaji: 'eki',        hu: 'állomás' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',       hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',    hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_072', level: 'N5', translation: 'Itt van a vámmentes bolt.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '免税店',     romaji: 'menzeiten', hu: 'vámmentes bolt' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_073', level: 'N5', translation: 'Hol van a poggyászfeladó pult?',
    tokens: [
      { type: 'word',     jp: '手荷物カウンター', romaji: 'tenimotsu kauntaa', hu: 'poggyászfeladó pult' },
      { type: 'particle', jp: 'は',           romaji: 'wa',                role: 'topic' },
      { type: 'word',     jp: 'どこ',         romaji: 'doko',              hu: 'hol' },
      { type: 'verb',     jp: 'ですか',       romaji: 'desu ka',           hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_074', level: 'N5', translation: 'Ott étterem van?',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'レストラン', romaji: 'resutoran', hu: 'étterem' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_075', level: 'N5', translation: 'Amott van a taxiállomás.',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'タクシー乗り場', romaji: 'takushii noriba', hu: 'taxiállomás' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_076', level: 'N5', translation: 'Hol van a buszmegálló?',
    tokens: [
      { type: 'word',     jp: 'バス停',     romaji: 'basutei',  hu: 'buszmegálló' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_077', level: 'N5', translation: 'Ez itt a váróterem.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '待合室',     romaji: 'machiaishitsu', hu: 'váróterem' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_078', level: 'N5', translation: 'Ott nem dohányzóhely van.',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '喫煙所',     romaji: 'kitsuenjo', hu: 'dohányzóhely' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_079', level: 'N5', translation: 'Hol van a Tokió állomás?',
    tokens: [
      { type: 'word',     jp: '東京駅',     romaji: 'toukyou eki', hu: 'Tokió állomás' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',        hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',     hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_080', level: 'N5', translation: 'Amott van a rendőrségi fülke.',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '交番',       romaji: 'kouban',   hu: 'rendőrségi fülke' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_081', level: 'N5', translation: 'Hol van a gyógyszertár?',
    tokens: [
      { type: 'word',     jp: '薬局',       romaji: 'yakkyoku', hu: 'gyógyszertár' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_082', level: 'N5', translation: 'Itt van a kávézó.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'カフェ',     romaji: 'kafe',     hu: 'kávézó' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_083', level: 'N5', translation: 'Ott van a lift?',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'エレベーター', romaji: 'erebeetaa', hu: 'lift' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_084', level: 'N5', translation: 'Hol van a bank?',
    tokens: [
      { type: 'word',     jp: '銀行',       romaji: 'ginkou',   hu: 'bank' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_085', level: 'N5', translation: 'Amott van a szuvenírbolt.',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'お土産屋',   romaji: 'omiyageya', hu: 'szuvenírbolt' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_086', level: 'N5', translation: 'Ez itt a mi szobánk.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',       hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '私たち',     romaji: 'watashitachi', hu: 'mi' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',       hu: 'szoba' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',       hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_087', level: 'N5', translation: 'Hol van az 1-es vágány?',
    tokens: [
      { type: 'word',     jp: '1番線',      romaji: 'ichibansen', hu: '1-es vágány' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',       hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',    hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_088', level: 'N5', translation: 'Ott van az információs pult.',
    tokens: [
      { type: 'word',     jp: 'そこ',       romaji: 'soko',     hu: 'ott (közeledben)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '案内所',     romaji: 'annaisho', hu: 'információs pult' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_089', level: 'N5', translation: 'Hol van a szentély?',
    tokens: [
      { type: 'word',     jp: '神社',       romaji: 'jinja',    hu: 'szentély' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_090', level: 'N5', translation: 'Amott nem kórház van.',
    tokens: [
      { type: 'word',     jp: 'あそこ',     romaji: 'asoko',    hu: 'amott' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '病院',       romaji: 'byouin',   hu: 'kórház' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_091', level: 'N5', translation: 'Itt van az étkezde.',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',     hu: 'itt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '食堂',       romaji: 'shokudou', hu: 'étkezde' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_092', level: 'N5', translation: 'Hol van az ATM?',
    tokens: [
      { type: 'word',     jp: 'ATM',        romaji: 'etiiemu',  hu: 'ATM' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'どこ',       romaji: 'doko',     hu: 'hol' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — 3. szekció: Főnevek mutatása (この・その・あの + Főnév) ──
  {
    id: 's_n5_093', level: 'N5', translation: 'Mennyibe kerül ez a táska?',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: 'カバン',     romaji: 'kaban',    hu: 'táska' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'いくら',     romaji: 'ikura',    hu: 'mennyibe kerül' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_094', level: 'N5', translation: 'Ki az az ember?',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '人',         romaji: 'hito',     hu: 'ember' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '誰',         romaji: 'dare',     hu: 'ki' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_095', level: 'N5', translation: 'Az a vonat a Shinkansen.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '電車',       romaji: 'densha',   hu: 'vonat' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '新幹線',     romaji: 'shinkansen', hu: 'Shinkansen' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_096', level: 'N5', translation: 'Ez a sushi finom.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '寿司',       romaji: 'sushi',    hu: 'sushi' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'おいしい',   romaji: 'oishii',   hu: 'finom' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_097', level: 'N5', translation: 'Az a póló kicsi.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: 'Tシャツ',    romaji: 'tiishatsu', hu: 'póló' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '小さい',     romaji: 'chiisai',  hu: 'kicsi' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_098', level: 'N5', translation: 'Drága az a fényképezőgép?',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: 'カメラ',     romaji: 'kamera',   hu: 'fényképezőgép' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '高い',       romaji: 'takai',    hu: 'drága' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_099', level: 'N5', translation: 'Ez a tea hideg.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: 'お茶',       romaji: 'ocha',     hu: 'tea' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '冷たい',     romaji: 'tsumetai', hu: 'hideg' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_100', level: 'N5', translation: 'Az az ebéddoboz (bento) olcsó.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: 'お弁当',     romaji: 'obentou',  hu: 'ebéddoboz (bento)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '安い',       romaji: 'yasui',    hu: 'olcsó' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_101', level: 'N5', translation: 'Az az épület egy szálloda?',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '建物',       romaji: 'tatemono', hu: 'épület' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'ホテル',     romaji: 'hoteru',   hu: 'szálloda' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_102', level: 'N5', translation: 'Ez a jegy az enyém.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '切符',       romaji: 'kippu',    hu: 'jegy' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_103', level: 'N5', translation: 'Az a szuvenír szép.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: 'お土産',     romaji: 'omiyage',  hu: 'szuvenír' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'きれい',     romaji: 'kirei',    hu: 'szép' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_104', level: 'N5', translation: 'Az a busz a repülőtérre megy.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: 'バス',       romaji: 'basu',     hu: 'busz' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '空港',       romaji: 'kuukou',   hu: 'repülőtér' },
      { type: 'particle', jp: 'へ',         romaji: 'e',        role: 'direction' },
      { type: 'verb',     jp: '行きます',   romaji: 'ikimasu',  hu: 'megy' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_105', level: 'N5', translation: 'Ez a víz nem finom.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '水',         romaji: 'mizu',     hu: 'víz' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'おいしくない', romaji: 'oishikunai', hu: 'nem finom' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_106', level: 'N5', translation: 'Az a térkép jó.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: '地図',       romaji: 'chizu',    hu: 'térkép' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',       hu: 'jó' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_107', level: 'N5', translation: 'Az a fogadó (ryokan) régi.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '旅館',       romaji: 'ryokan',   hu: 'japán fogadó' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '古い',       romaji: 'furui',    hu: 'régi' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_108', level: 'N5', translation: 'Ez a matcha nem édes.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '抹茶',       romaji: 'matcha',   hu: 'matcha' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '甘くない',   romaji: 'amakunai', hu: 'nem édes' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_109', level: 'N5', translation: 'Érdekes az a könyv?',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: '本',         romaji: 'hon',      hu: 'könyv' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '面白い',     romaji: 'omoshiroi', hu: 'érdekes' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_110', level: 'N5', translation: 'Az az ember állomási alkalmazott.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '人',         romaji: 'hito',     hu: 'ember' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '駅員',       romaji: 'ekiin',    hu: 'állomási alkalmazott' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_111', level: 'N5', translation: 'Ez a város csendes.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '町',         romaji: 'machi',    hu: 'város' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '静か',       romaji: 'shizuka',  hu: 'csendes' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_112', level: 'N5', translation: 'Híres az az étterem?',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: 'レストラン', romaji: 'resutoran', hu: 'étterem' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '有名',       romaji: 'yuumei',   hu: 'híres' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_113', level: 'N5', translation: 'Az a hegy a Fuji.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '山',         romaji: 'yama',     hu: 'hegy' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '富士山',     romaji: 'fujisan',  hu: 'Fuji-hegy' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_114', level: 'N5', translation: 'Ez a pénztárca Botié?',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '財布',       romaji: 'saifu',    hu: 'pénztárca' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'ボティさん', romaji: 'boti-san', hu: 'Boti' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_115', level: 'N5', translation: 'Az a magazin új.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: '雑誌',       romaji: 'zasshi',   hu: 'magazin' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '新しい',     romaji: 'atarashii', hu: 'új' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_116', level: 'N5', translation: 'Az a poggyász nem nehéz.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '荷物',       romaji: 'nimotsu',  hu: 'poggyász' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '重くない',   romaji: 'omokunai', hu: 'nem nehéz' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_117', level: 'N5', translation: 'Ez a szoba tágas.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',     hu: 'szoba' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '広い',       romaji: 'hiroi',    hu: 'tágas' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_118', level: 'N5', translation: 'Az az autó nem az enyém.',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: '車',         romaji: 'kuruma',   hu: 'autó' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'verb',     jp: 'ではありません', romaji: 'de wa arimasen', hu: 'nem az' }
    ],
    metadata: { function: 'Negative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_119', level: 'N5', translation: 'Az a bolt egy kényelmi bolt (konbini)?',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: 'お店',       romaji: 'omise',    hu: 'bolt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'コンビニ',   romaji: 'konbini',  hu: 'kényelmi bolt' },
      { type: 'verb',     jp: 'ですか',     romaji: 'desu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_120', level: 'N5', translation: 'Ez az útlevél az enyém.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',     hu: 'ez a' },
      { type: 'word',     jp: 'パスポート', romaji: 'pasupooto', hu: 'útlevél' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '私',         romaji: 'watashi',  hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',       role: 'possession' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_121', level: 'N5', translation: 'Az a fotó szép, ugye?',
    tokens: [
      { type: 'word',     jp: 'その',       romaji: 'sono',     hu: 'az a (hozzád közeli)' },
      { type: 'word',     jp: '写真',       romaji: 'shashin',  hu: 'fotó' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: 'きれい',     romaji: 'kirei',    hu: 'szép' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' },
      { type: 'particle', jp: 'ね',         romaji: 'ne',       role: 'confirmer' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_122', level: 'N5', translation: 'Az az italautomata praktikus.',
    tokens: [
      { type: 'word',     jp: 'あの',       romaji: 'ano',      hu: 'az a (távoli)' },
      { type: 'word',     jp: '自動販売機', romaji: 'jidouhanbaiki', hu: 'italautomata' },
      { type: 'particle', jp: 'は',         romaji: 'wa',       role: 'topic' },
      { type: 'word',     jp: '便利',       romaji: 'benri',    hu: 'praktikus' },
      { type: 'verb',     jp: 'です',       romaji: 'desu',     hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Desu', tense: 'Non-Past', register: 'Polite' }
  },

  // ── N5 — 4. szekció: Összetett helymeghatározás (～の中/上/下 + あります/います) ──
  {
    id: 's_n5_123', level: 'N5', translation: 'A táska belsejében van az útlevél.',
    tokens: [
      { type: 'word',     jp: 'カバン',     romaji: 'kaban',      hu: 'táska' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'パスポート', romaji: 'pasupooto',  hu: 'útlevél' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_124', level: 'N5', translation: 'A szálloda mellett van egy kényelmi bolt.',
    tokens: [
      { type: 'word',     jp: 'ホテル',     romaji: 'hoteru',     hu: 'szálloda' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '隣',         romaji: 'tonari',     hu: 'mellett' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'コンビニ',   romaji: 'konbini',    hu: 'kényelmi bolt' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_125', level: 'N5', translation: 'Az asztal alatt van egy macska.',
    tokens: [
      { type: 'word',     jp: '机',         romaji: 'tsukue',     hu: 'asztal' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '下',         romaji: 'shita',      hu: 'alatt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '猫',         romaji: 'neko',       hu: 'macska' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'います',     romaji: 'imasu',      hu: 'van (élőlény)' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_126', level: 'N5', translation: 'Boti a vasútállomás előtt van.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'boti-san',   hu: 'Boti' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '駅',         romaji: 'eki',        hu: 'állomás' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '前',         romaji: 'mae',        hu: 'előtt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'います',     romaji: 'imasu',      hu: 'van (élőlény)' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_127', level: 'N5', translation: 'A pénztárcám a zsebemben van.',
    tokens: [
      { type: 'word',     jp: '私',         romaji: 'watashi',    hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '財布',       romaji: 'saifu',      hu: 'pénztárca' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'ポケット',   romaji: 'poketto',    hu: 'zseb' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_128', level: 'N5', translation: 'Az ATM a bankon belül van?',
    tokens: [
      { type: 'word',     jp: 'ATM',        romaji: 'etiiemu',    hu: 'ATM' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '銀行',       romaji: 'ginkou',     hu: 'bank' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'ありますか', romaji: 'arimasu ka', hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_129', level: 'N5', translation: 'A jegykapu mögött vannak a csomagmegőrzők.',
    tokens: [
      { type: 'word',     jp: '改札口',     romaji: 'kaisatsuguchi', hu: 'jegykapu' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '後ろ',       romaji: 'ushiro',     hu: 'mögött' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'コインロッカー', romaji: 'koinrokkaa', hu: 'csomagmegőrző' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_130', level: 'N5', translation: 'Nincs a szobában a kulcs.',
    tokens: [
      { type: 'word',     jp: '部屋',       romaji: 'heya',       hu: 'szoba' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '鍵',         romaji: 'kagi',       hu: 'kulcs' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'ありません', romaji: 'arimasen',   hu: 'nincs' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_131', level: 'N5', translation: 'A buszmegálló a kórház közelében van.',
    tokens: [
      { type: 'word',     jp: 'バス停',     romaji: 'basutei',    hu: 'buszmegálló' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '病院',       romaji: 'byouin',     hu: 'kórház' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '近く',       romaji: 'chikaku',    hu: 'közelében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_132', level: 'N5', translation: 'A könyv a telefonod alatt van.',
    tokens: [
      { type: 'word',     jp: '本',         romaji: 'hon',        hu: 'könyv' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'スマホ',     romaji: 'sumaho',     hu: 'okostelefon' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '下',         romaji: 'shita',      hu: 'alatt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_133', level: 'N5', translation: 'Ki van a kávézó előtt?',
    tokens: [
      { type: 'word',     jp: 'カフェ',     romaji: 'kafe',       hu: 'kávézó' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '前',         romaji: 'mae',        hu: 'előtt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '誰',         romaji: 'dare',       hu: 'ki' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'いますか',   romaji: 'imasu ka',   hu: 'van? (élőlény)' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_134', level: 'N5', translation: 'A bőrönd a szék mellett van.',
    tokens: [
      { type: 'word',     jp: 'スーツケース', romaji: 'suutsukeesu', hu: 'bőrönd' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '椅子',       romaji: 'isu',        hu: 'szék' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '隣',         romaji: 'tonari',     hu: 'mellett' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_135', level: 'N5', translation: 'A bolt felett van egy étterem.',
    tokens: [
      { type: 'word',     jp: 'お店',       romaji: 'omise',      hu: 'bolt' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '上',         romaji: 'ue',         hu: 'felett' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'レストラン', romaji: 'resutoran',  hu: 'étterem' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_136', level: 'N5', translation: 'A gyógyszertár a posta és a bank között van.',
    tokens: [
      { type: 'word',     jp: '薬局',       romaji: 'yakkyoku',   hu: 'gyógyszertár' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '郵便局',     romaji: 'yuubinkyoku', hu: 'posta' },
      { type: 'particle', jp: 'と',         romaji: 'to',         role: 'companion' },
      { type: 'word',     jp: '銀行',       romaji: 'ginkou',     hu: 'bank' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '間',         romaji: 'aida',       hu: 'között' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_137', level: 'N5', translation: 'A rendőrségi fülke a metróállomás jobb oldalán van.',
    tokens: [
      { type: 'word',     jp: '交番',       romaji: 'kouban',     hu: 'rendőrségi fülke' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '地下鉄の駅', romaji: 'chikatetsu no eki', hu: 'metróállomás' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '右',         romaji: 'migi',       hu: 'jobb oldalán' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_138', level: 'N5', translation: 'Nincsenek gyerekek a parkban.',
    tokens: [
      { type: 'word',     jp: '公園',       romaji: 'kouen',      hu: 'park' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '子供たち',   romaji: 'kodomotachi', hu: 'gyerekek' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'いません',   romaji: 'imasen',     hu: 'nincsenek' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_139', level: 'N5', translation: 'A szuvenírbolt a kijárat bal oldalán van.',
    tokens: [
      { type: 'word',     jp: 'お土産屋',   romaji: 'omiyageya',  hu: 'szuvenírbolt' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '出口',       romaji: 'deguchi',    hu: 'kijárat' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '左',         romaji: 'hidari',     hu: 'bal oldalán' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_140', level: 'N5', translation: 'A jegyem a pénztárcámban van.',
    tokens: [
      { type: 'word',     jp: '私',         romaji: 'watashi',    hu: 'én' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '切符',       romaji: 'kippu',      hu: 'jegy' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '財布',       romaji: 'saifu',      hu: 'pénztárca' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_141', level: 'N5', translation: 'A barátom a szálloda mögött van.',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',  hu: 'barátom' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'ホテル',     romaji: 'hoteru',     hu: 'szálloda' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '後ろ',       romaji: 'ushiro',     hu: 'mögött' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'います',     romaji: 'imasu',      hu: 'van (élőlény)' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_142', level: 'N5', translation: 'Az esernyő az ajtó mellett van.',
    tokens: [
      { type: 'word',     jp: '傘',         romaji: 'kasa',       hu: 'esernyő' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'ドア',       romaji: 'doa',        hu: 'ajtó' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '隣',         romaji: 'tonari',     hu: 'mellett' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_143', level: 'N5', translation: 'Emberek vannak a poggyászfeladó pult előtt.',
    tokens: [
      { type: 'word',     jp: '手荷物カウンター', romaji: 'tenimotsu kauntaa', hu: 'poggyászfeladó pult' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '前',         romaji: 'mae',        hu: 'előtt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '人',         romaji: 'hito',       hu: 'ember' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'います',     romaji: 'imasu',      hu: 'vannak (élőlény)' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_144', level: 'N5', translation: 'Az épületen kívül van a taxiállomás.',
    tokens: [
      { type: 'word',     jp: '建物',       romaji: 'tatemono',   hu: 'épület' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '外',         romaji: 'soto',       hu: 'kívül' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'タクシー乗り場', romaji: 'takushii noriba', hu: 'taxiállomás' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_145', level: 'N5', translation: 'A vonatban (belsejében) nincs mosdó.',
    tokens: [
      { type: 'word',     jp: '電車',       romaji: 'densha',     hu: 'vonat' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'トイレ',     romaji: 'toire',      hu: 'mosdó' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'ありません', romaji: 'arimasen',   hu: 'nincs' }
    ],
    metadata: { function: 'Negative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_146', level: 'N5', translation: 'A szék alatt van egy 100 jenes érme.',
    tokens: [
      { type: 'word',     jp: '椅子',       romaji: 'isu',        hu: 'szék' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '下',         romaji: 'shita',      hu: 'alatt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '100円玉',    romaji: 'hyakuendama', hu: '100 jenes érme' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_147', level: 'N5', translation: 'A kávézón belül van Wi-Fi?',
    tokens: [
      { type: 'word',     jp: 'カフェ',     romaji: 'kafe',       hu: 'kávézó' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: 'Wi-Fi',      romaji: 'waifai',     hu: 'Wi-Fi' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'ありますか', romaji: 'arimasu ka', hu: 'van?' }
    ],
    metadata: { function: 'Question', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_148', level: 'N5', translation: 'Az italautomata a kényelmi bolt mellett van.',
    tokens: [
      { type: 'word',     jp: '自動販売機', romaji: 'jidouhanbaiki', hu: 'italautomata' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: 'コンビニ',   romaji: 'konbini',    hu: 'kényelmi bolt' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '隣',         romaji: 'tonari',     hu: 'mellett' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_149', level: 'N5', translation: 'A fiúk a szentély közelében vannak.',
    tokens: [
      { type: 'word',     jp: '男の子たち', romaji: 'otokonokotachi', hu: 'fiúk' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '神社',       romaji: 'jinja',      hu: 'szentély' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '近く',       romaji: 'chikaku',    hu: 'közelében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'います',     romaji: 'imasu',      hu: 'vannak (élőlény)' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_150', level: 'N5', translation: 'A térkép a könyvben (belsejében) van.',
    tokens: [
      { type: 'word',     jp: '地図',       romaji: 'chizu',      hu: 'térkép' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '本',         romaji: 'hon',        hu: 'könyv' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',       hu: 'belsejében' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_151', level: 'N5', translation: 'Az ágyon van egy új törölköző.',
    tokens: [
      { type: 'word',     jp: 'ベッド',     romaji: 'beddo',      hu: 'ágy' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '上',         romaji: 'ue',         hu: 'tetején (ágyon)' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',  hu: 'új' },
      { type: 'word',     jp: 'タオル',     romaji: 'taoru',      hu: 'törölköző' },
      { type: 'particle', jp: 'が',         romaji: 'ga',         role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n5_152', level: 'N5', translation: 'A váróterem a jegypénztár előtt van.',
    tokens: [
      { type: 'word',     jp: '待合室',     romaji: 'machiaishitsu', hu: 'váróterem' },
      { type: 'particle', jp: 'は',         romaji: 'wa',         role: 'topic' },
      { type: 'word',     jp: '切符売り場', romaji: 'kippuuriba', hu: 'jegypénztár' },
      { type: 'particle', jp: 'の',         romaji: 'no',         role: 'possession' },
      { type: 'word',     jp: '前',         romaji: 'mae',        hu: 'előtt' },
      { type: 'particle', jp: 'に',         romaji: 'ni',         role: 'location' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',    hu: 'van' }
    ],
    metadata: { function: 'Affirmative', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
// ── N4_DYNAMICS — Cselekvés irányok, adás-kapás (Yari-morai, ni, e) ──
  {
    id: 's_n4_dyn_001', level: 'N4', translation: 'Adok egy könyvet a barátomnak.',
    tokens: [
      { type: 'word',     jp: '友達',     romaji: 'tomodachi', hu: 'barát' },
      { type: 'particle', jp: 'に',       romaji: 'ni',        role: 'receiver' },
      { type: 'word',     jp: '本',       romaji: 'hon',       hu: 'könyv' },
      { type: 'particle', jp: 'を',       romaji: 'wo',        role: 'object' },
      { type: 'verb',     jp: 'あげます', romaji: 'agemasu',   hu: 'adok' }
    ],
    metadata: { function: 'Giving (Outward)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_002', level: 'N4', translation: 'A barátom adott nekem egy játékot.',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'ゲーム',     romaji: 'geemu',       hu: 'játék' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'くれました', romaji: 'kuremashita', hu: 'adott (nekem)' }
    ],
    metadata: { function: 'Giving (Inward)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_003', level: 'N4', translation: 'Kaptam egy kamerát az apukámtól.',
    tokens: [
      { type: 'word',     jp: '父',           romaji: 'chichi',        hu: 'apa' },
      { type: 'particle', jp: 'に',           romaji: 'ni',            role: 'giver' },
      { type: 'word',     jp: 'カメラ',       romaji: 'kamera',        hu: 'kamera' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: 'もらいました', romaji: 'moraimashita',  hu: 'kaptam' }
    ],
    metadata: { function: 'Receiving', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_004', level: 'N4', translation: 'Megtanítom a húgomnak a japán nyelvet.',
    tokens: [
      { type: 'word',     jp: '妹',         romaji: 'imouto',  hu: 'húg' },
      { type: 'particle', jp: 'に',         romaji: 'ni',      role: 'receiver' },
      { type: 'word',     jp: '日本語',     romaji: 'nihongo', hu: 'japán nyelv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',      role: 'object' },
      { type: 'verb',     jp: '教えて',     romaji: 'oshiete', hu: 'tanítva' },
      { type: 'verb',     jp: 'あげます',   romaji: 'agemasu', hu: 'adom (teszem érte)' }
    ],
    metadata: { function: 'Favor (Giving)', form: 'Te + Ageru', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_005', level: 'N4', translation: 'A tanár elmagyarázta nekem a nyelvtant.',
    tokens: [
      { type: 'word',     jp: '先生',         romaji: 'sensei',       hu: 'tanár' },
      { type: 'particle', jp: 'が',           romaji: 'ga',           role: 'subject' },
      { type: 'word',     jp: '文法',         romaji: 'bunpou',       hu: 'nyelvtan' },
      { type: 'particle', jp: 'を',           romaji: 'wo',           role: 'object' },
      { type: 'verb',     jp: '説明して',     romaji: 'setsumeishite',hu: 'elmagyarázva' },
      { type: 'verb',     jp: 'くれました',   romaji: 'kuremashita',  hu: 'adta (nekem)' }
    ],
    metadata: { function: 'Favor (Received)', form: 'Te + Kureru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_006', level: 'N4', translation: 'Apukám készített nekem egy asztalt.',
    tokens: [
      { type: 'word',     jp: '父',           romaji: 'chichi',      hu: 'apa' },
      { type: 'particle', jp: 'が',           romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '机',           romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'を',           romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作って',       romaji: 'tsukutte',    hu: 'elkészítve' },
      { type: 'verb',     jp: 'くれました',   romaji: 'kuremashita', hu: 'adta (nekem)' }
    ],
    metadata: { function: 'Favor (Received)', form: 'Te + Kureru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_007', level: 'N4', translation: 'Megkértem Botit, hogy segítsen a programozásban.',
    tokens: [
      { type: 'word',     jp: 'ボティさん',   romaji: 'Boti-san',      hu: 'Boti' },
      { type: 'particle', jp: 'に',           romaji: 'ni',            role: 'giver' },
      { type: 'word',     jp: 'プログラミング',romaji: 'puroguramingu', hu: 'programozás' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: '手伝って',     romaji: 'tetsudatte',    hu: 'segítve' },
      { type: 'verb',     jp: 'もらいました', romaji: 'moraimashita',  hu: 'kaptam' }
    ],
    metadata: { function: 'Favor (Requesting)', form: 'Te + Morau', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_008', level: 'N4', translation: 'Elküldök egy emailt a cégnek.',
    tokens: [
      { type: 'word',     jp: '会社',       romaji: 'kaisha', hu: 'cég' },
      { type: 'particle', jp: 'に',         romaji: 'ni',     role: 'direction' },
      { type: 'word',     jp: 'メール',     romaji: 'meeru',  hu: 'email' },
      { type: 'particle', jp: 'を',         romaji: 'wo',     role: 'object' },
      { type: 'verb',     jp: '送ります',   romaji: 'okurimasu', hu: 'küldök' }
    ],
    metadata: { function: 'Directional Action', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_009', level: 'N4', translation: 'Japán felé indul a repülőgép.',
    tokens: [
      { type: 'word',     jp: '飛行機',       romaji: 'hikouki', hu: 'repülőgép' },
      { type: 'particle', jp: 'は',         romaji: 'wa',      role: 'topic' },
      { type: 'word',     jp: '日本',       romaji: 'nihon',   hu: 'Japán' },
      { type: 'particle', jp: 'へ',         romaji: 'e',       role: 'direction' },
      { type: 'verb',     jp: '出発します', romaji: 'shuppatsushimasu', hu: 'indul' }
    ],
    metadata: { function: 'Movement Direction', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_010', level: 'N4', translation: 'Kölcsönadod nekem azt a könyvet?',
    tokens: [
      { type: 'word',     jp: 'その',           romaji: 'sono',          hu: 'az a' },
      { type: 'word',     jp: '本',             romaji: 'hon',           hu: 'könyv' },
      { type: 'particle', jp: 'を',             romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: '貸して',         romaji: 'kashite',       hu: 'kölcsönadva' },
      { type: 'verb',     jp: 'くれませんか',   romaji: 'kuremasenka',   hu: 'nem adod (nekem)?' }
    ],
    metadata: { function: 'Polite Request', form: 'Te + Kuremasenka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_011', level: 'N4', translation: 'Vettem egy jegyet a barátomnak.',
    tokens: [
      { type: 'word',     jp: '友達',         romaji: 'tomodachi',  hu: 'barát' },
      { type: 'particle', jp: 'に',           romaji: 'ni',         role: 'receiver' },
      { type: 'word',     jp: 'チケット',     romaji: 'chiketto',   hu: 'jegy' },
      { type: 'particle', jp: 'を',           romaji: 'wo',         role: 'object' },
      { type: 'verb',     jp: '買って',       romaji: 'katte',      hu: 'megvéve' },
      { type: 'verb',     jp: 'あげました',   romaji: 'agemashita', hu: 'adtam' }
    ],
    metadata: { function: 'Favor (Giving)', form: 'Te + Ageru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_012', level: 'N4', translation: 'Megjavíttattam a számítógépet a bátyámmal.',
    tokens: [
      { type: 'word',     jp: '兄',           romaji: 'ani',          hu: 'báty' },
      { type: 'particle', jp: 'に',           romaji: 'ni',           role: 'giver' },
      { type: 'word',     jp: 'パソコン',     romaji: 'pasokon',      hu: 'számítógép' },
      { type: 'particle', jp: 'を',           romaji: 'wo',           role: 'object' },
      { type: 'verb',     jp: '直して',       romaji: 'naoshite',     hu: 'megjavítva' },
      { type: 'verb',     jp: 'もらいました', romaji: 'moraimashita', hu: 'kaptam' }
    ],
    metadata: { function: 'Favor (Requesting)', form: 'Te + Morau', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_013', level: 'N4', translation: 'Egy kedves ember megmutatta nekem az utat.',
    tokens: [
      { type: 'word',     jp: '親切な',       romaji: 'shinsetsu na',  hu: 'kedves (melléknév)' },
      { type: 'word',     jp: '人',           romaji: 'hito',          hu: 'ember' },
      { type: 'particle', jp: 'が',           romaji: 'ga',            role: 'subject' },
      { type: 'word',     jp: '道',           romaji: 'michi',         hu: 'út' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: '教えて',       romaji: 'oshiete',       hu: 'megmutatva/betanítva' },
      { type: 'verb',     jp: 'くれました',   romaji: 'kuremashita',   hu: 'adta (nekem)' }
    ],
    metadata: { function: 'Favor (Received)', form: 'Te + Kureru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_014', level: 'N4', translation: 'Sietve hazamentem.',
    tokens: [
      { type: 'verb',     jp: '急いで',       romaji: 'isoide',    hu: 'sietve', semantic: 'határozó' },
      { type: 'word',     jp: '家',           romaji: 'ie',        hu: 'ház/otthon' },
      { type: 'particle', jp: 'へ',           romaji: 'e',         role: 'direction' },
      { type: 'verb',     jp: '帰りました',   romaji: 'kaerimashita', hu: 'hazatértem' }
    ],
    metadata: { function: 'Movement Direction', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_015', level: 'N4', translation: 'Megkérem őt, hogy olvassa el a kanjikat.',
    tokens: [
      { type: 'word',     jp: '彼',           romaji: 'kare',        hu: 'ő (férfi)' },
      { type: 'particle', jp: 'に',           romaji: 'ni',          role: 'giver' },
      { type: 'word',     jp: '漢字',         romaji: 'kanji',       hu: 'kanji' },
      { type: 'particle', jp: 'を',           romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '読んで',       romaji: 'yonde',       hu: 'elolvasva' },
      { type: 'verb',     jp: 'もらいます',   romaji: 'moraimasu',   hu: 'kapom' }
    ],
    metadata: { function: 'Favor (Requesting)', form: 'Te + Morau', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_016', level: 'N4', translation: 'Kivittem a szemetet anyukám helyett.',
    tokens: [
      { type: 'word',     jp: '母',           romaji: 'haha',        hu: 'anya' },
      { type: 'particle', jp: 'の',           romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '代わり',       romaji: 'kawari',      hu: 'helyett' },
      { type: 'particle', jp: 'に',           romaji: 'ni',          role: 'context' },
      { type: 'word',     jp: 'ゴミ',         romaji: 'gomi',        hu: 'szemét' },
      { type: 'particle', jp: 'を',           romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '出して',       romaji: 'dashite',     hu: 'kivíve' },
      { type: 'verb',     jp: 'あげました',   romaji: 'agemashita',  hu: 'adtam' }
    ],
    metadata: { function: 'Favor (Giving)', form: 'Te + Ageru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_017', level: 'N4', translation: 'Kaptam egy szuvenírt a kollégámtól.',
    tokens: [
      { type: 'word',     jp: '同僚',         romaji: 'douryou',       hu: 'kolléga' },
      { type: 'particle', jp: 'から',         romaji: 'kara',          role: 'source' },
      { type: 'word',     jp: 'お土産',       romaji: 'omiyage',       hu: 'szuvenír' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: 'もらいました', romaji: 'moraimashita',  hu: 'kaptam' }
    ],
    metadata: { function: 'Receiving (Kara)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_018', level: 'N4', translation: 'A barátom csinált nekem egy fotót.',
    tokens: [
      { type: 'word',     jp: '友達',         romaji: 'tomodachi',     hu: 'barát' },
      { type: 'particle', jp: 'が',           romaji: 'ga',            role: 'subject' },
      { type: 'word',     jp: '写真',         romaji: 'shashin',       hu: 'fotó' },
      { type: 'particle', jp: 'を',           romaji: 'wo',            role: 'object' },
      { type: 'verb',     jp: '撮って',       romaji: 'totte',         hu: 'készítve (fotót)' },
      { type: 'verb',     jp: 'くれました',   romaji: 'kuremashita',   hu: 'adta (nekem)' }
    ],
    metadata: { function: 'Favor (Received)', form: 'Te + Kureru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_019', level: 'N4', translation: 'Holnap a könyvtárba megyek tanulni.',
    tokens: [
      { type: 'word',     jp: '明日',         romaji: 'ashita',      hu: 'holnap', semantic: 'időhatározó' },
      { type: 'word',     jp: '図書館',       romaji: 'toshokan',    hu: 'könyvtár' },
      { type: 'particle', jp: 'へ',           romaji: 'e',           role: 'direction' },
      { type: 'word',     jp: '勉強',         romaji: 'benkyou',     hu: 'tanulás' },
      { type: 'particle', jp: 'に',           romaji: 'ni',          role: 'purpose' },
      { type: 'verb',     jp: '行きます',     romaji: 'ikimasu',     hu: 'megyek' }
    ],
    metadata: { function: 'Direction with Purpose', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_dyn_020', level: 'N4', translation: 'Lefordítom ezt a mondatot a barátomnak.',
    tokens: [
      { type: 'word',     jp: 'この',         romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '文',           romaji: 'bun',         hu: 'mondat' },
      { type: 'particle', jp: 'を',           romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: '友達',         romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'に',           romaji: 'ni',          role: 'receiver' },
      { type: 'verb',     jp: '翻訳して',     romaji: 'honnyakushite', hu: 'lefordítva' },
      { type: 'verb',     jp: 'あげます',     romaji: 'agemasu',     hu: 'adom' }
    ],
    metadata: { function: 'Favor (Giving)', form: 'Te + Ageru', tense: 'Non-Past', register: 'Polite' }
  },
  // ── N4_CHANGE — Állapotváltozás, képesség (naru, mieru, kikoeru, dekiru) ──
  {
    id: 's_n4_chg_001', level: 'N4', translation: 'Júliusban Japán nagyon meleg lesz.',
    tokens: [
      { type: 'word',     jp: '七月',       romaji: 'shichigatsu', hu: 'július', semantic: 'időhatározó' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'time' },
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'とても',     romaji: 'totemo',      hu: 'nagyon' },
      { type: 'word',     jp: '熱く',       romaji: 'atsuku',      hu: 'melegen (i-adj -> ku)' },
      { type: 'verb',     jp: 'なります',   romaji: 'narimasu',    hu: 'lesz/válik' }
    ],
    metadata: { function: 'State Change (I-adj)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_002', level: 'N4', translation: 'A konditeremben sokkal erősebb lettem.',
    tokens: [
      { type: 'word',     jp: 'ジム',       romaji: 'jimu',        hu: 'konditerem' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location' },
      { type: 'word',     jp: 'ずっと',     romaji: 'zutto',       hu: 'sokkal' },
      { type: 'word',     jp: '強く',       romaji: 'tsuyoku',     hu: 'erősebben (i-adj -> ku)' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lettem' }
    ],
    metadata: { function: 'State Change (I-adj)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_003', level: 'N4', translation: 'Ügyesebb lettem a zongorázásban.',
    tokens: [
      { type: 'word',     jp: 'ピアノ',     romaji: 'piano',       hu: 'zongora' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '上手に',     romaji: 'jouzu ni',    hu: 'ügyesen (na-adj -> ni)' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lettem' }
    ],
    metadata: { function: 'State Change (Na-adj)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_004', level: 'N4', translation: 'Jövőre egyetemista leszek.',
    tokens: [
      { type: 'word',     jp: '来年',       romaji: 'rainen',      hu: 'jövőre', semantic: 'időhatározó' },
      { type: 'word',     jp: '大学生',     romaji: 'daigakusei',  hu: 'egyetemista' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'result' },
      { type: 'verb',     jp: 'なります',   romaji: 'narimasu',    hu: 'leszek' }
    ],
    metadata: { function: 'State Change (Noun)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_005', level: 'N4', translation: 'A mérnöki diploma megszerzése után mérnök szeretnék lenni.',
    tokens: [
      { type: 'word',     jp: '将来',       romaji: 'shourai',     hu: 'a jövőben', semantic: 'időhatározó' },
      { type: 'word',     jp: 'エンジニア', romaji: 'enjinia',     hu: 'mérnök' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'result' },
      { type: 'verb',     jp: 'なりたい',   romaji: 'naritai',     hu: 'szeretnék lenni' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van (polite)' }
    ],
    metadata: { function: 'Desire (Change)', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_006', level: 'N4', translation: 'A repülőgépből látszik a Fuji hegy.',
    tokens: [
      { type: 'word',     jp: '飛行機',     romaji: 'hikouki',     hu: 'repülőgép' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: '富士山',     romaji: 'fujisan',     hu: 'Fuji hegy' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '見えます',   romaji: 'miemasu',     hu: 'látszik' }
    ],
    metadata: { function: 'Visibility', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_007', level: 'N4', translation: 'A sötétben is jól látszik a monitor.',
    tokens: [
      { type: 'word',     jp: '暗い',       romaji: 'kurai',       hu: 'sötét' },
      { type: 'word',     jp: '所',         romaji: 'tokoro',      hu: 'hely' },
      { type: 'particle', jp: 'でも',       romaji: 'demo',        role: 'even_in' },
      { type: 'word',     jp: 'モニター',   romaji: 'monitaa',     hu: 'monitor' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'よく',       romaji: 'yoku',        hu: 'jól', semantic: 'határozó' },
      { type: 'verb',     jp: '見えます',   romaji: 'miemasu',     hu: 'látszik' }
    ],
    metadata: { function: 'Visibility', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_008', level: 'N4', translation: 'Hallatszik a húgom hangja a szomszéd szobából.',
    tokens: [
      { type: 'word',     jp: '隣',         romaji: 'tonari',      hu: 'szomszéd' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szoba' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: '妹',         romaji: 'imouto',      hu: 'húg' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '声',         romaji: 'koe',         hu: 'hang (emberi)' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '聞こえます', romaji: 'kikoemasu',   hu: 'hallatszik' }
    ],
    metadata: { function: 'Audibility', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_009', level: 'N4', translation: 'Furcsa hang hallatszott a számítógépből.',
    tokens: [
      { type: 'word',     jp: 'パソコン',   romaji: 'pasokon',     hu: 'számítógép' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: '変な',       romaji: 'hen na',      hu: 'furcsa' },
      { type: 'word',     jp: '音',         romaji: 'oto',         hu: 'hang (gép/tárgy)' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '聞こえました',romaji: 'kikoemashita', hu: 'hallatszott' }
    ],
    metadata: { function: 'Audibility', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_010', level: 'N4', translation: 'Nem hallatszik jól Boti hangja (a Discordon).',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '声',         romaji: 'koe',         hu: 'hang' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'よく',       romaji: 'yoku',        hu: 'jól' },
      { type: 'verb',     jp: '聞こえません',romaji: 'kikoemasen', hu: 'nem hallatszik' }
    ],
    metadata: { function: 'Audibility (Negative)', form: 'Masen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_011', level: 'N4', translation: 'Tudok Java-ban kódolni.',
    tokens: [
      { type: 'word',     jp: 'ジャバ',     romaji: 'jaba',        hu: 'Java' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means' },
      { type: 'word',     jp: 'コード',     romaji: 'koodo',       hu: 'kód' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '書く',       romaji: 'kaku',        hu: 'írni (szótári alak)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'dolog/tény' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'できます',   romaji: 'dekimasu',    hu: 'tudok/képes vagyok' }
    ],
    metadata: { function: 'Ability (Verb+Koto)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_012', level: 'N4', translation: 'Tudok 3D-s játékot készíteni a Godot motorral.',
    tokens: [
      { type: 'word',     jp: 'ゴドー',     romaji: 'Godoo',       hu: 'Godot (engine)' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means' },
      { type: 'word',     jp: '３Ｄゲーム', romaji: 'suriidii geemu', hu: '3D játék' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作る',       romaji: 'tsukuru',     hu: 'készíteni' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'dolog' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'できます',   romaji: 'dekimasu',    hu: 'tudok' }
    ],
    metadata: { function: 'Ability (Verb+Koto)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_013', level: 'N4', translation: 'Elkészült az új asztal!',
    tokens: [
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',   hu: 'új' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'できました', romaji: 'dekimashita', hu: 'elkészült' }
    ],
    metadata: { function: 'Completion', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_014', level: 'N4', translation: 'Már képes vagyok kanjikat olvasni.',
    tokens: [
      { type: 'word',     jp: '漢字',       romaji: 'kanji',       hu: 'kanji' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '読める',     romaji: 'yomeru',      hu: 'tud olvasni (potenciális)' },
      { type: 'word',     jp: 'ように',     romaji: 'you ni',      hu: 'úgy / arra az állapotra' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lettem' }
    ],
    metadata: { function: 'Change in Ability', form: 'You ni naru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_015', level: 'N4', translation: 'A fizika nagyon nehéz lett.',
    tokens: [
      { type: 'word',     jp: '物理',       romaji: 'butsuri',     hu: 'fizika' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'とても',     romaji: 'totemo',      hu: 'nagyon' },
      { type: 'word',     jp: '難しく',     romaji: 'muzukashiku', hu: 'nehezen (i-adj -> ku)' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lett' }
    ],
    metadata: { function: 'State Change (I-adj)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_016', level: 'N4', translation: 'Sok barátot szereztem (lett sok barátom).',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'たくさん',   romaji: 'takusan',     hu: 'sok' },
      { type: 'verb',     jp: 'できました', romaji: 'dekimashita', hu: 'lett / "elkészült"' }
    ],
    metadata: { function: 'Creation/Acquisition', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_017', level: 'N4', translation: 'A szobám sokkal csendesebb lett az akusztikus panelektől.',
    tokens: [
      { type: 'word',     jp: '私の',       romaji: 'watashi no',  hu: 'az én' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szobám' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'ずっと',     romaji: 'zutto',       hu: 'sokkal' },
      { type: 'word',     jp: '静かに',     romaji: 'shizuka ni',  hu: 'csendesen (na-adj -> ni)' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lett' }
    ],
    metadata: { function: 'State Change (Na-adj)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_018', level: 'N4', translation: 'Ma este nem tudok játszani veled.',
    tokens: [
      { type: 'word',     jp: '今晩',       romaji: 'konban',      hu: 'ma este', semantic: 'időhatározó' },
      { type: 'word',     jp: 'ゲーム',     romaji: 'geemu',       hu: 'játék' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'する',       romaji: 'suru',        hu: 'csinálni' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'dolog' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'できません', romaji: 'dekimasen',   hu: 'nem tudok' }
    ],
    metadata: { function: 'Ability (Negative)', form: 'Masen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_019', level: 'N4', translation: 'Tiszta lett az idő, így már látszik a csillag.',
    tokens: [
      { type: 'word',     jp: '天気が',     romaji: 'tenki ga',    hu: 'időjárás' },
      { type: 'word',     jp: 'よく',       romaji: 'yoku',        hu: 'jól/jó' },
      { type: 'verb',     jp: 'なって',     romaji: 'natte',       hu: 'lett és (te-forma)' },
      { type: 'word',     jp: '星',         romaji: 'hoshi',       hu: 'csillag' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '見えます',   romaji: 'miemasu',     hu: 'látszik' }
    ],
    metadata: { function: 'Cause & Visibility', form: 'Te + Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_chg_020', level: 'N4', translation: 'Már nem eszem annyi gyorséttermi ételt.',
    tokens: [
      { type: 'word',     jp: 'ファストフード', romaji: 'fasutofuudo', hu: 'gyorséttermi étel' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: 'あまり',     romaji: 'amari',       hu: 'annyira (tagadással)' },
      { type: 'verb',     jp: '食べなく',   romaji: 'tabenaku',    hu: 'nem eszik (nai -> naku)' },
      { type: 'verb',     jp: 'なりました', romaji: 'narimashita', hu: 'lett (állapot)' }
    ],
    metadata: { function: 'Change in Habit', form: 'Naku naru', tense: 'Past', register: 'Polite' }
  },
  // ── N4_CONDITION — Feltételek és hipotézisek (tara, ba, nara, to) ──
  {
    id: 's_n4_cnd_001', level: 'N4', translation: 'Ha befejeződnek a vizsgák, Japánba megyek.',
    tokens: [
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '終わったら', romaji: 'owattara',    hu: 'ha befejeződik (~tara)' },
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'へ',         romaji: 'e',           role: 'direction' },
      { type: 'verb',     jp: '行きます',   romaji: 'ikimasu',     hu: 'megyek' }
    ],
    metadata: { function: 'Condition (Tara)', form: 'Ta + Ra', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_002', level: 'N4', translation: 'Ha sietsz, eléred a repülőt.',
    tokens: [
      { type: 'verb',     jp: '急げば',     romaji: 'isogeba',     hu: 'ha sietsz (~ba)' },
      { type: 'word',     jp: '飛行機',     romaji: 'hikouki',     hu: 'repülőgép' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '間に合います',romaji: 'maniaimasu',  hu: 'időben odaér / eléri' }
    ],
    metadata: { function: 'Condition (Ba)', form: 'Ba-form', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_003', level: 'N4', translation: 'Ha 3D-s játékot fejlesztesz, a Godot a legjobb.',
    tokens: [
      { type: 'word',     jp: '３Ｄゲーム', romaji: 'suriidii geemu', hu: '3D játék' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作る',       romaji: 'tsukuru',     hu: 'készít' },
      { type: 'particle', jp: 'なら',       romaji: 'nara',        role: 'condition' },
      { type: 'word',     jp: 'ゴドー',     romaji: 'Godoo',       hu: 'Godot (engine)' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '一番',       romaji: 'ichiban',     hu: 'legjobban/első' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van (polite)' }
    ],
    metadata: { function: 'Condition (Nara)', form: 'Plain + Nara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_004', level: 'N4', translation: 'Ha megnyomod ezt a gombot, bekapcsol a terminál.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: 'ボタン',     romaji: 'botan',       hu: 'gomb' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '押す',       romaji: 'osu',         hu: 'megnyom' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'condition (natural)' },
      { type: 'word',     jp: '端末',       romaji: 'tanmatsu',    hu: 'terminál' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'つきます',   romaji: 'tsukimasu',   hu: 'felkapcsolódik' }
    ],
    metadata: { function: 'Natural Consequence (To)', form: 'Dictionary + To', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_005', level: 'N4', translation: 'Ha olcsó lenne a 3D nyomtató, megvenném.',
    tokens: [
      { type: 'word',     jp: '３Ｄプリンター',romaji: 'suriidii purintaa', hu: '3D nyomtató' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '安ければ',   romaji: 'yasukereba',  hu: 'ha olcsó lenne (~ba)' },
      { type: 'verb',     jp: '買います',   romaji: 'kaimasu',     hu: 'megvenném/megveszem' }
    ],
    metadata: { function: 'Condition (Ba, I-adj)', form: 'Kereba', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_006', level: 'N4', translation: 'Ha Boti is jön, akkor én is megyek.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'inclusion' },
      { type: 'verb',     jp: '行く',       romaji: 'iku',         hu: 'megy' },
      { type: 'particle', jp: 'なら',       romaji: 'nara',        role: 'condition' },
      { type: 'word',     jp: '私',         romaji: 'watashi',     hu: 'én' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'inclusion' },
      { type: 'verb',     jp: '行きます',   romaji: 'ikimasu',     hu: 'megyek' }
    ],
    metadata: { function: 'Condition (Nara)', form: 'Plain + Nara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_007', level: 'N4', translation: 'Ha elolvasod ezt a könyvet, megérted a sztoicizmust.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '読めば',     romaji: 'yomeba',      hu: 'ha elolvasod (~ba)' },
      { type: 'word',     jp: 'ストア派',   romaji: 'sutoaha',     hu: 'sztoicizmus (sztoa suli)' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'object_of_potential/understanding' },
      { type: 'verb',     jp: 'わかります', romaji: 'wakarimasu',  hu: 'megérted' }
    ],
    metadata: { function: 'Condition (Ba)', form: 'Ba-form', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_008', level: 'N4', translation: 'Amikor (ha) megérkeztünk Tokióba, együnk sushit!',
    tokens: [
      { type: 'word',     jp: '東京',       romaji: 'Toukyou',     hu: 'Tokió' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '着いたら',   romaji: 'tsuitara',    hu: 'amikor/ha megérkezünk (~tara)' },
      { type: 'word',     jp: '寿司',       romaji: 'sushi',       hu: 'sushi' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '食べましょう',romaji: 'tabemashou',  hu: 'együnk (volitional)' }
    ],
    metadata: { function: 'Condition (Tara)', form: 'Ta + Ra', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_009', level: 'N4', translation: 'Ha sokat játszol a Valoranttal, elfárad a szemed.',
    tokens: [
      { type: 'word',     jp: 'ヴァロラント',romaji: 'varoranto',   hu: 'Valorant' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: 'たくさん',   romaji: 'takusan',     hu: 'sokat' },
      { type: 'verb',     jp: 'する',       romaji: 'suru',        hu: 'csinál' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'condition (natural)' },
      { type: 'word',     jp: '目',         romaji: 'me',          hu: 'szem' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '疲れます',   romaji: 'tsukaremasu', hu: 'elfárad' }
    ],
    metadata: { function: 'Natural Consequence (To)', form: 'Dictionary + To', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_010', level: 'N4', translation: 'Ha lenne egy jó egyedi asztalod, apukád biztosan tud segíteni.',
    tokens: [
      { type: 'word',     jp: 'カスタムの', romaji: 'kasutamu no', hu: 'egyedi (custom)' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '欲しい',     romaji: 'hoshii',      hu: 'kívánt / akarja' },
      { type: 'particle', jp: 'なら',       romaji: 'nara',        role: 'condition' },
      { type: 'word',     jp: 'お父さん',   romaji: 'otousan',     hu: 'apukád' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '手伝えます', romaji: 'tetsudaemasu',hu: 'tud segíteni (potenciális)' }
    ],
    metadata: { function: 'Condition (Nara)', form: 'Plain + Nara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_011', level: 'N4', translation: 'Ha nem esik az eső holnap, elmegyünk horgászni.',
    tokens: [
      { type: 'word',     jp: '明日',       romaji: 'ashita',      hu: 'holnap', semantic: 'időhatározó' },
      { type: 'word',     jp: '雨',         romaji: 'ame',         hu: 'eső' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '降らなければ',romaji: 'furanakereba',hu: 'ha nem esik (~ba)' },
      { type: 'word',     jp: '釣り',       romaji: 'tsuri',       hu: 'horgászat' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'purpose' },
      { type: 'verb',     jp: '行きます',   romaji: 'ikimasu',     hu: 'megyünk' }
    ],
    metadata: { function: 'Condition (Negative Ba)', form: 'Nakereba', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_012', level: 'N4', translation: 'Ha megiszom ezt a kávét, jobban tudok majd fókuszálni.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: 'コーヒー',   romaji: 'koohii',      hu: 'kávé' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '飲んだら',   romaji: 'nondara',     hu: 'ha megiszom (~tara)' },
      { type: 'word',     jp: 'もっと',     romaji: 'motto',       hu: 'jobban / még' },
      { type: 'word',     jp: '集中',       romaji: 'shuuchuu',    hu: 'fókusz / koncentráció' },
      { type: 'verb',     jp: 'できます',   romaji: 'dekimasu',    hu: 'tudok (csinálni)' }
    ],
    metadata: { function: 'Condition (Tara)', form: 'Ta + Ra', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_013', level: 'N4', translation: 'Ha nehéz a matek érettségi, majd többet tanulok.',
    tokens: [
      { type: 'word',     jp: '数学',       romaji: 'suugaku',     hu: 'matematika' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '難しかったら',romaji: 'muzukashikattara', hu: 'ha nehéz lesz (~tara, i-adj)' },
      { type: 'word',     jp: 'もっと',     romaji: 'motto',       hu: 'többet' },
      { type: 'verb',     jp: '勉強します', romaji: 'benkyoushimasu', hu: 'tanulok' }
    ],
    metadata: { function: 'Condition (Tara, I-adj)', form: 'Kattara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_014', level: 'N4', translation: 'Ha minden nap gyakorolsz, a taekwondo jobban fog menni.',
    tokens: [
      { type: 'word',     jp: '毎日',       romaji: 'mainichi',    hu: 'minden nap', semantic: 'időhatározó' },
      { type: 'word',     jp: '練習',       romaji: 'renshuu',     hu: 'gyakorlás' },
      { type: 'verb',     jp: 'すれば',     romaji: 'sureba',      hu: 'ha csinálod (~ba)' },
      { type: 'word',     jp: 'テコンドー', romaji: 'tekondoo',    hu: 'taekwondo' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '上手に',     romaji: 'jouzu ni',    hu: 'ügyesebben (na-adj)' },
      { type: 'verb',     jp: 'なります',   romaji: 'narimasu',    hu: 'fogsz válni' }
    ],
    metadata: { function: 'Condition (Ba)', form: 'Ba-form', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_015', level: 'N4', translation: 'Ha nincs időd, nem kell elolvasnod.',
    tokens: [
      { type: 'word',     jp: '時間',       romaji: 'jikan',       hu: 'idő' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'ない',       romaji: 'nai',         hu: 'nincs' },
      { type: 'particle', jp: 'なら',       romaji: 'nara',        role: 'condition' },
      { type: 'verb',     jp: '読まなくても',romaji: 'yomanakutemo',hu: 'ha nem is olvasod' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó (nem kell)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van (polite)' }
    ],
    metadata: { function: 'Condition (Nara)', form: 'Plain + Nara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_016', level: 'N4', translation: 'Ha megírod a Java kódot, teszteljük a szerveren.',
    tokens: [
      { type: 'word',     jp: 'ジャバ',     romaji: 'Jaba',        hu: 'Java' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'コード',     romaji: 'koodo',       hu: 'kód' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '書いたら',   romaji: 'kaitara',     hu: 'ha megírod (~tara)' },
      { type: 'word',     jp: 'サーバー',   romaji: 'saabaa',      hu: 'szerver' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: 'テスト',     romaji: 'tesuto',      hu: 'teszt' },
      { type: 'verb',     jp: 'しましょう', romaji: 'shimashou',   hu: 'csináljuk (volitional)' }
    ],
    metadata: { function: 'Condition (Tara)', form: 'Ta + Ra', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_017', level: 'N4', translation: 'Ha csend van, jobban tudok aludni.',
    tokens: [
      { type: 'word',     jp: '静か',       romaji: 'shizuka',     hu: 'csendes' },
      { type: 'particle', jp: 'なら',       romaji: 'nara',        role: 'condition (na-adj)' },
      { type: 'word',     jp: 'よく',       romaji: 'yoku',        hu: 'jól' },
      { type: 'verb',     jp: '眠れます',   romaji: 'nemuremasu',  hu: 'tudok aludni (potenciális)' }
    ],
    metadata: { function: 'Condition (Nara, Na-adj)', form: 'Na-adj root + Nara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_018', level: 'N4', translation: 'Ha nem érted a feladatot, kérdezd meg a barátaidat.',
    tokens: [
      { type: 'word',     jp: '問題',       romaji: 'mondai',      hu: 'feladat/probléma' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'object_of_understanding' },
      { type: 'verb',     jp: 'わからなければ',romaji: 'wakaranakereba', hu: 'ha nem érted (~ba)' },
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '聞いて',     romaji: 'kiite',       hu: 'kérdezve' },
      { type: 'word',     jp: 'ください',   romaji: 'kudasai',     hu: 'kérlek' }
    ],
    metadata: { function: 'Condition (Negative Ba)', form: 'Nakereba', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_019', level: 'N4', translation: 'Tavasszal (Ha eljön a tavasz), kivirágzik a cseresznyefa.',
    tokens: [
      { type: 'word',     jp: '春',         romaji: 'haru',        hu: 'tavasz' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'result' },
      { type: 'verb',     jp: 'なる',       romaji: 'naru',        hu: 'lesz (válik)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'condition (natural)' },
      { type: 'word',     jp: '桜',         romaji: 'sakura',      hu: 'cseresznyefa/virág' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '咲きます',   romaji: 'sakimasu',    hu: 'kivirágzik' }
    ],
    metadata: { function: 'Natural Consequence (To)', form: 'Dictionary + To', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_cnd_020', level: 'N4', translation: 'Ha sokat eszel, gyorsan fogsz hízni.',
    tokens: [
      { type: 'word',     jp: 'たくさん',   romaji: 'takusan',     hu: 'sokat' },
      { type: 'verb',     jp: '食べたら',   romaji: 'tabetara',    hu: 'ha eszel (~tara)' },
      { type: 'word',     jp: '早く',       romaji: 'hayaku',      hu: 'gyorsan' },
      { type: 'word',     jp: '太り',       romaji: 'futori',      hu: 'hízik (masu stem)' },
      { type: 'verb',     jp: 'ます',       romaji: 'masu',        hu: '-masu végződés' }
    ],
    metadata: { function: 'Condition (Tara)', form: 'Ta + Ra', tense: 'Non-Past', register: 'Polite' }
  },
  // ── N4_VOLITION — Vágy, szándék, terv (tai, tsumori, yotei, volitional) ──
  {
    id: 's_n4_vol_001', level: 'N4', translation: 'A jövőben az egyetemen informatikát szeretnék tanulni.',
    tokens: [
      { type: 'word',     jp: '将来',       romaji: 'shourai',     hu: 'a jövőben', semantic: 'időhatározó' },
      { type: 'word',     jp: '大学',       romaji: 'daigaku',     hu: 'egyetem' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location' },
      { type: 'word',     jp: 'コンピューター',romaji: 'konpyuutaa', hu: 'számítógép/informatika' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: '勉強',       romaji: 'benkyou',     hu: 'tanulás' },
      { type: 'verb',     jp: 'したい',     romaji: 'shitai',      hu: 'akarom csinálni (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van (polite)' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_002', level: 'N4', translation: 'Júliusban Japánba szándékozom utazni.',
    tokens: [
      { type: 'word',     jp: '七月',       romaji: 'shichigatsu', hu: 'július', semantic: 'időhatározó' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'time' },
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'へ',         romaji: 'e',           role: 'direction' },
      { type: 'verb',     jp: '行く',       romaji: 'iku',         hu: 'megy (szótári)' },
      { type: 'word',     jp: 'つもり',     romaji: 'tsumori',     hu: 'szándék' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Intention', form: 'Tsumori', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_003', level: 'N4', translation: 'A tervek szerint a barátaimmal utazom.',
    tokens: [
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'accompaniment' },
      { type: 'word',     jp: '一緒に',     romaji: 'issho ni',    hu: 'együtt' },
      { type: 'word',     jp: '旅行',       romaji: 'ryokou',      hu: 'utazás' },
      { type: 'verb',     jp: 'する',       romaji: 'suru',        hu: 'csinál' },
      { type: 'word',     jp: '予定',       romaji: 'yotei',       hu: 'terv / program' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Schedule/Plan', form: 'Yotei', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_004', level: 'N4', translation: 'Arra gondoltam, hogy Botival egy RPG-t készítünk.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'accompaniment' },
      { type: 'word',     jp: 'ＲＰＧ',     romaji: 'aaru-pii-jii',hu: 'RPG' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作ろう',     romaji: 'tsukurou',    hu: 'készítsünk (volitional)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'quotation' },
      { type: 'verb',     jp: '思っています',romaji: 'omotte imasu',hu: 'gondolom' }
    ],
    metadata: { function: 'Volition (Thought)', form: 'Volitional + To omou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_005', level: 'N4', translation: 'Java-ban szeretnék kódot írni.',
    tokens: [
      { type: 'word',     jp: 'ジャバ',     romaji: 'Jaba',        hu: 'Java' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means' },
      { type: 'word',     jp: 'コード',     romaji: 'koodo',       hu: 'kód' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '書きたい',   romaji: 'kakitai',     hu: 'akarok írni (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_006', level: 'N4', translation: 'Szándékomban áll sokkal többet enni (hogy hízzak).',
    tokens: [
      { type: 'word',     jp: 'もっと',     romaji: 'motto',       hu: 'még jobban / többet' },
      { type: 'word',     jp: 'たくさん',   romaji: 'takusan',     hu: 'sokat' },
      { type: 'verb',     jp: '食べる',     romaji: 'taberu',      hu: 'eszik' },
      { type: 'word',     jp: 'つもり',     romaji: 'tsumori',     hu: 'szándék' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Intention', form: 'Tsumori', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_007', level: 'N4', translation: 'Arra gondoltam, hogy a vizsgák után visszatérek a taekwondóhoz.',
    tokens: [
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '後で',       romaji: 'ato de',      hu: 'után' },
      { type: 'word',     jp: 'テコンドー', romaji: 'tekondoo',    hu: 'taekwondo' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '戻ろう',     romaji: 'modorou',     hu: 'térjek vissza (volitional)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'quotation' },
      { type: 'verb',     jp: '思っています',romaji: 'omotte imasu',hu: 'gondolom' }
    ],
    metadata: { function: 'Volition (Thought)', form: 'Volitional + To omou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_008', level: 'N4', translation: 'Jövőre le akarom tenni az N3-as vizsgát.',
    tokens: [
      { type: 'word',     jp: '来年',       romaji: 'rainen',      hu: 'jövőre', semantic: 'időhatározó' },
      { type: 'word',     jp: 'Ｎ３の',     romaji: 'enu-san no',  hu: 'N3-as (birtokos)' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '受けたい',   romaji: 'uketai',      hu: 'akarom letenni/megkapni (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_009', level: 'N4', translation: 'Ma nem áll szándékomban videojátékozni.',
    tokens: [
      { type: 'word',     jp: '今日',       romaji: 'kyou',        hu: 'ma', semantic: 'időhatározó' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'ゲーム',     romaji: 'geemu',       hu: 'játék' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'しない',     romaji: 'shinai',      hu: 'nem csinál (nai)' },
      { type: 'word',     jp: 'つもり',     romaji: 'tsumori',     hu: 'szándék' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Negative Intention', form: 'Nai + Tsumori', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_010', level: 'N4', translation: 'A beosztás szerint holnap a reptéren fogok dolgozni.',
    tokens: [
      { type: 'word',     jp: '明日',       romaji: 'ashita',      hu: 'holnap', semantic: 'időhatározó' },
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'verb',     jp: '働く',       romaji: 'hataraku',    hu: 'dolgozik' },
      { type: 'word',     jp: '予定',       romaji: 'yotei',       hu: 'terv/beosztás' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Schedule/Plan', form: 'Yotei', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_011', level: 'N4', translation: 'Arra gondoltam, hogy apukámmal csinálunk egy új asztalt.',
    tokens: [
      { type: 'word',     jp: '父',         romaji: 'chichi',      hu: 'apa' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'accompaniment' },
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',   hu: 'új' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作ろう',     romaji: 'tsukurou',    hu: 'készítsünk (volitional)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'quotation' },
      { type: 'verb',     jp: '思っています',romaji: 'omotte imasu',hu: 'gondolom' }
    ],
    metadata: { function: 'Volition (Thought)', form: 'Volitional + To omou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_012', level: 'N4', translation: 'Szeretnék elolvasni egy könyvet a stratégiáról.',
    tokens: [
      { type: 'word',     jp: '戦略',       romaji: 'senryaku',    hu: 'stratégia' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'about (ni tsuite)' },
      { type: 'word',     jp: 'ついての',   romaji: 'tsuite no',   hu: 'valamivel kapcsolatos' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '読みたい',   romaji: 'yomitai',     hu: 'akarom olvasni (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_013', level: 'N4', translation: 'Minden nap szándékomban áll zongorázni.',
    tokens: [
      { type: 'word',     jp: '毎日',       romaji: 'mainichi',    hu: 'minden nap', semantic: 'időhatározó' },
      { type: 'word',     jp: 'ピアノ',     romaji: 'piano',       hu: 'zongora' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: '練習',       romaji: 'renshuu',     hu: 'gyakorlás' },
      { type: 'verb',     jp: 'する',       romaji: 'suru',        hu: 'csinál' },
      { type: 'word',     jp: 'つもり',     romaji: 'tsumori',     hu: 'szándék' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Intention', form: 'Tsumori', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_014', level: 'N4', translation: 'Szeretnék többet tudni a fizikáról és a kémiáról.',
    tokens: [
      { type: 'word',     jp: '物理',       romaji: 'butsuri',     hu: 'fizika' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'and' },
      { type: 'word',     jp: '化学',       romaji: 'kagaku',      hu: 'kémia' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'about (ni tsuite)' },
      { type: 'word',     jp: 'ついて',     romaji: 'tsuite',      hu: 'valamiről' },
      { type: 'word',     jp: 'もっと',     romaji: 'motto',       hu: 'még jobban' },
      { type: 'verb',     jp: '知りたい',   romaji: 'shiritai',    hu: 'akarom tudni (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_015', level: 'N4', translation: 'A tervek szerint augusztus 4-én jövünk vissza Japánból.',
    tokens: [
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: '八月の',     romaji: 'hachigatsu no',hu: 'augusztus (birtokos)' },
      { type: 'word',     jp: '四日に',     romaji: 'yokka ni',    hu: 'negyedikén' },
      { type: 'verb',     jp: '帰る',       romaji: 'kaeru',       hu: 'hazatér' },
      { type: 'word',     jp: '予定',       romaji: 'yotei',       hu: 'terv/menetrend' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Schedule/Plan', form: 'Yotei', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_016', level: 'N4', translation: 'Arra gondoltam, hogy a jövőben cserediák leszek.',
    tokens: [
      { type: 'word',     jp: '将来',       romaji: 'shourai',     hu: 'a jövőben', semantic: 'időhatározó' },
      { type: 'word',     jp: '留学生',     romaji: 'ryuugakusei', hu: 'cserediák' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'result' },
      { type: 'verb',     jp: 'なろう',     romaji: 'narou',       hu: 'legyek (volitional)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'quotation' },
      { type: 'verb',     jp: '思っています',romaji: 'omotte imasu',hu: 'gondolom' }
    ],
    metadata: { function: 'Volition (Thought)', form: 'Volitional + To omou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_017', level: 'N4', translation: 'Szeretném megjavítani a gépeket a repülőtéren.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '機械',       romaji: 'kikai',       hu: 'gép/berendezés' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '直したい',   romaji: 'naoshitai',   hu: 'meg akarom javítani (~tai)' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Desire', form: 'Tai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_018', level: 'N4', translation: 'Szándékomban áll egy "Maker Corner"-t kialakítani a szobámban.',
    tokens: [
      { type: 'word',     jp: '私の',       romaji: 'watashi no',  hu: 'az én' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szobám' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'location' },
      { type: 'word',     jp: 'メーカーコーナー',romaji: 'meekaa-koonaa',hu: 'maker corner' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作る',       romaji: 'tsukuru',     hu: 'készít' },
      { type: 'word',     jp: 'つもり',     romaji: 'tsumori',     hu: 'szándék' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Intention', form: 'Tsumori', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_019', level: 'N4', translation: 'Arra gondoltam, hogy ezentúl mély fókusszal fogok tanulni.',
    tokens: [
      { type: 'word',     jp: 'これから',   romaji: 'korekara',    hu: 'ezentúl', semantic: 'időhatározó' },
      { type: 'word',     jp: 'もっと',     romaji: 'motto',       hu: 'még jobban' },
      { type: 'word',     jp: '集中',       romaji: 'shuuchuu',    hu: 'fókusz/koncentráció' },
      { type: 'verb',     jp: 'して',       romaji: 'shite',       hu: 'csinálva' },
      { type: 'word',     jp: '勉強',       romaji: 'benkyou',     hu: 'tanulás' },
      { type: 'verb',     jp: 'しよう',     romaji: 'shiyou',      hu: 'csináljak (volitional)' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'quotation' },
      { type: 'verb',     jp: '思っています',romaji: 'omotte imasu',hu: 'gondolom' }
    ],
    metadata: { function: 'Volition (Thought)', form: 'Volitional + To omou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_vol_020', level: 'N4', translation: 'A tervek szerint hétvégén elmegyünk horgászni.',
    tokens: [
      { type: 'word',     jp: '週末',       romaji: 'shuumatsu',   hu: 'hétvége', semantic: 'időhatározó' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'time' },
      { type: 'word',     jp: '友達',       romaji: 'tomodachi',   hu: 'barát' },
      { type: 'particle', jp: 'と',         romaji: 'to',          role: 'accompaniment' },
      { type: 'word',     jp: '釣り',       romaji: 'tsuri',       hu: 'horgászat' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'purpose' },
      { type: 'verb',     jp: '行く',       romaji: 'iku',         hu: 'megy' },
      { type: 'word',     jp: '予定',       romaji: 'yotei',       hu: 'terv/program' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Schedule/Plan', form: 'Yotei', tense: 'Non-Past', register: 'Polite' }
  },
  // ── N4_APPEARANCE — Látszat, sejtés, tapasztalat (sou da, you da, ta koto ga aru) ──
  {
    id: 's_n4_app_001', level: 'N4', translation: 'A matematika érettségi nagyon nehéznek tűnik.',
    tokens: [
      { type: 'word',     jp: '数学',       romaji: 'suugaku',     hu: 'matematika' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga/érettségi' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'とても',     romaji: 'totemo',      hu: 'nagyon' },
      { type: 'word',     jp: '難し',       romaji: 'muzukashi',   hu: 'nehéz (i nélkül)' },
      { type: 'word',     jp: 'そう',       romaji: 'sou',         hu: 'tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Appearance (Visual/Impression)', form: 'Stem + Sou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_002', level: 'N4', translation: 'Az új asztal nagyon erősnek és stabilnak látszik.',
    tokens: [
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',   hu: 'új' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'とても',     romaji: 'totemo',      hu: 'nagyon' },
      { type: 'word',     jp: '丈夫',       romaji: 'joubu',       hu: 'erős/stabil (na nélkül)' },
      { type: 'word',     jp: 'そう',       romaji: 'sou',         hu: 'látszik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Appearance (Visual/Impression)', form: 'Stem + Sou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_003', level: 'N4', translation: 'Úgy tűnik, mindjárt elindul a repülőgép.',
    tokens: [
      { type: 'word',     jp: '飛行機',     romaji: 'hikouki',     hu: 'repülőgép' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'もうすぐ',   romaji: 'mousugu',     hu: 'mindjárt' },
      { type: 'verb',     jp: '出発し',     romaji: 'shuppatsushi',hu: 'indul (masu nélkül)' },
      { type: 'word',     jp: 'そう',       romaji: 'sou',         hu: 'tűnik/látszik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Imminent Action', form: 'Masu-stem + Sou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_004', level: 'N4', translation: 'Úgy tűnik, Boti a Valoranttal játszik.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: 'ヴァロラント',romaji: 'varoranto',   hu: 'Valorant' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'している',   romaji: 'shite iru',   hu: 'csinálja/játssza (folyamatos)' },
      { type: 'word',     jp: 'よう',       romaji: 'you',         hu: 'úgy tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + You', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_005', level: 'N4', translation: 'Úgy tűnik, a terminál elromlott a repülőtéren.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '端末',       romaji: 'tanmatsu',    hu: 'terminál' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '壊れている', romaji: 'kowarete iru',hu: 'el van romolva (állapot)' },
      { type: 'word',     jp: 'みたい',     romaji: 'mitai',       hu: 'úgy fest/tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + Mitai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_006', level: 'N4', translation: 'Már készítettem Minecraft modot.',
    tokens: [
      { type: 'word',     jp: 'マイクラ',   romaji: 'Maikura',     hu: 'Minecraft' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'モッド',     romaji: 'moddo',       hu: 'mod' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '作った',     romaji: 'tsukutta',    hu: 'készített (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat/dolog' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',     hu: 'van' }
    ],
    metadata: { function: 'Experience', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_007', level: 'N4', translation: 'Dolgoztam már raktárban.',
    tokens: [
      { type: 'word',     jp: '倉庫',       romaji: 'souko',       hu: 'raktár' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'verb',     jp: '働いた',     romaji: 'hataraita',   hu: 'dolgozott (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',     hu: 'van' }
    ],
    metadata: { function: 'Experience', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_008', level: 'N4', translation: 'Olvastad már Marcus Aurelius könyvét?',
    tokens: [
      { type: 'word',     jp: 'マルクス・アウレリウス', romaji: 'Marukusu Aureriusu', hu: 'Marcus Aurelius' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '読んだ',     romaji: 'yonda',       hu: 'olvasott (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'ありますか', romaji: 'arimasu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Experience (Question)', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_009', level: 'N4', translation: 'Ez a stratégiai könyv érdekesnek tűnik.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '戦略',       romaji: 'senryaku',    hu: 'stratégia' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '面白',       romaji: 'omoshiro',    hu: 'érdekes (i nélkül)' },
      { type: 'word',     jp: 'そう',       romaji: 'sou',         hu: 'tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Appearance (Visual/Impression)', form: 'Stem + Sou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_010', level: 'N4', translation: 'Még sosem voltam Japánban.',
    tokens: [
      { type: 'word',     jp: 'まだ',       romaji: 'mada',        hu: 'még (tagadással: sosem)' },
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'direction' },
      { type: 'verb',     jp: '行った',     romaji: 'itta',        hu: 'ment (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'ありません', romaji: 'arimasen',    hu: 'nincs' }
    ],
    metadata: { function: 'Experience (Negative)', form: 'Ta + Koto ga arimasen', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_011', level: 'N4', translation: 'Úgy tűnik, a húgom is szeretne zongorázni.',
    tokens: [
      { type: 'word',     jp: '妹',         romaji: 'imouto',      hu: 'húg' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'inclusion' },
      { type: 'word',     jp: 'ピアノ',     romaji: 'piano',       hu: 'zongora' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '弾きたい',   romaji: 'hikitai',     hu: 'akar játszani' },
      { type: 'word',     jp: 'みたい',     romaji: 'mitai',       hu: 'úgy fest' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + Mitai', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_012', level: 'N4', translation: 'Mindjárt esni fog az eső, így nem mehetünk horgászni.',
    tokens: [
      { type: 'word',     jp: '雨',         romaji: 'ame',         hu: 'eső' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '降りそう',   romaji: 'furisou',     hu: 'esni látszik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'reason' },
      { type: 'word',     jp: '釣り',       romaji: 'tsuri',       hu: 'horgászat' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'purpose' },
      { type: 'verb',     jp: '行けません', romaji: 'ikemasen',    hu: 'nem tudunk menni' }
    ],
    metadata: { function: 'Imminent Action + Reason', form: 'Masu-stem + Sou + Kara', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_013', level: 'N4', translation: 'Taekwondóztam régebben.',
    tokens: [
      { type: 'word',     jp: '昔',         romaji: 'mukashi',     hu: 'régebben/múltban' },
      { type: 'word',     jp: 'テコンドー', romaji: 'tekondoo',    hu: 'taekwondo' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'した',       romaji: 'shita',       hu: 'csinált (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',     hu: 'van' }
    ],
    metadata: { function: 'Experience', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_014', level: 'N4', translation: 'Úgy tűnik, a Java kód hibás.',
    tokens: [
      { type: 'word',     jp: 'ジャバ',     romaji: 'Jaba',        hu: 'Java' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'コード',     romaji: 'koodo',       hu: 'kód' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '間違っている',romaji: 'machigatte iru', hu: 'el van rontva/hibás' },
      { type: 'word',     jp: 'よう',       romaji: 'you',         hu: 'úgy tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + You', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_015', level: 'N4', translation: 'Az angol érettségi nem tűnik nehéznek.',
    tokens: [
      { type: 'word',     jp: '英語',       romaji: 'eigo',        hu: 'angol nyelv' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '難しく',     romaji: 'muzukashiku', hu: 'nehezen' },
      { type: 'word',     jp: 'なさそう',   romaji: 'nasasou',     hu: 'nem tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Appearance (Negative)', form: 'Ku + Nasasou', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_016', level: 'N4', translation: 'Programoztál már Godot motorral?',
    tokens: [
      { type: 'word',     jp: 'ゴドー',     romaji: 'Godoo',       hu: 'Godot (engine)' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means' },
      { type: 'word',     jp: 'プログラミング',romaji: 'puroguramingu', hu: 'programozás' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'した',       romaji: 'shita',       hu: 'csinált (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'ありますか', romaji: 'arimasu ka',  hu: 'van?' }
    ],
    metadata: { function: 'Experience (Question)', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_017', level: 'N4', translation: 'Úgy tűnik, Szun-ce stratégiája ma is hasznos.',
    tokens: [
      { type: 'word',     jp: '孫子',       romaji: 'Sonsi',       hu: 'Szun-ce' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '戦略',       romaji: 'senryaku',    hu: 'stratégia' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '今でも',     romaji: 'ima demo',    hu: 'még ma is' },
      { type: 'verb',     jp: '役に立つ',   romaji: 'yaku ni tatsu', hu: 'hasznos/segít' },
      { type: 'word',     jp: 'よう',       romaji: 'you',         hu: 'úgy tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + You', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_018', level: 'N4', translation: 'Ez a gyorséttermi étel finomnak látszik, de vigyáznom kell.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: 'ファストフード',romaji: 'fasutofuudo', hu: 'gyorséttermi étel' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '美味し',     romaji: 'oishi',       hu: 'finom (i nélkül)' },
      { type: 'word',     jp: 'そう',       romaji: 'sou',         hu: 'látszik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'but' },
      { type: 'verb',     jp: '気をつけます',romaji: 'ki o tsukemasu', hu: 'vigyázok/figyelek rá' }
    ],
    metadata: { function: 'Appearance + Contrast', form: 'Stem + Sou + Ga', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_019', level: 'N4', translation: 'Dolgoztam már sportboltban a nyáron.',
    tokens: [
      { type: 'word',     jp: '夏',         romaji: 'natsu',       hu: 'nyár', semantic: 'időhatározó' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'time' },
      { type: 'word',     jp: 'スポーツ店', romaji: 'supootsuten', hu: 'sportbolt' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'verb',     jp: '働いた',     romaji: 'hataraita',   hu: 'dolgozott (ta-forma)' },
      { type: 'word',     jp: 'こと',       romaji: 'koto',        hu: 'tapasztalat' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'あります',   romaji: 'arimasu',     hu: 'van' }
    ],
    metadata: { function: 'Experience', form: 'Ta + Koto ga aru', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_app_020', level: 'N4', translation: 'Úgy tűnik, a dopamin-detox segít a fókuszálásban.',
    tokens: [
      { type: 'word',     jp: 'デトックス', romaji: 'detokkusu',   hu: 'detox' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '集中',       romaji: 'shuuchuu',    hu: 'fókusz/koncentráció' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '役立つ',     romaji: 'yakudatsu',   hu: 'hasznos/segít' },
      { type: 'word',     jp: 'みたい',     romaji: 'mitai',       hu: 'úgy fest/tűnik' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Conjecture/Observation', form: 'Plain + Mitai', tense: 'Non-Past', register: 'Polite' }
  },
  // ── N4_PERMISSION — Engedélyek és tiltások (te mo ii, te wa ikenai) ──
  {
    id: 's_n4_prm_001', level: 'N4', translation: 'Használhatom ezt a gépet?',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '機械',       romaji: 'kikai',       hu: 'gép/berendezés' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '使って',     romaji: 'tsukatte',    hu: 'használva (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van (polite)' },
      { type: 'particle', jp: 'か',         romaji: 'ka',          role: 'question' }
    ],
    metadata: { function: 'Permission (Asking)', form: 'Te + Mo ii desu ka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_002', level: 'N4', translation: 'Ezt a terminált nem szabad megérinteni.',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '端末',       romaji: 'tanmatsu',    hu: 'terminál' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target' },
      { type: 'verb',     jp: '触って',     romaji: 'sawatte',     hu: 'megérintve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'nem megy / tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_003', level: 'N4', translation: 'A matek érettségi közben tilos beszélgetni.',
    tokens: [
      { type: 'word',     jp: '数学',       romaji: 'suugaku',     hu: 'matematika' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga/érettségi' },
      { type: 'word',     jp: '中',         romaji: 'chuu',        hu: 'közben', semantic: 'időhatározó' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'time' },
      { type: 'verb',     jp: '話して',     romaji: 'hanashite',   hu: 'beszélve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_004', level: 'N4', translation: 'Elolvashatom ezt a stratégiai könyvet?',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '戦略',       romaji: 'senryaku',    hu: 'stratégia' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '読んで',     romaji: 'yonde',       hu: 'olvasva (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'か',         romaji: 'ka',          role: 'question' }
    ],
    metadata: { function: 'Permission (Asking)', form: 'Te + Mo ii desu ka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_005', level: 'N4', translation: 'Nem szabad letörölni a Java kódot.',
    tokens: [
      { type: 'word',     jp: 'ジャバ',     romaji: 'jaba',        hu: 'Java' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'コード',     romaji: 'koodo',       hu: 'kód' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '消して',     romaji: 'keshite',     hu: 'letörölve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_006', level: 'N4', translation: 'Japánban nem szabad cipőben bemenni a házba.',
    tokens: [
      { type: 'word',     jp: '日本',       romaji: 'nihon',       hu: 'Japán' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location' },
      { type: 'word',     jp: '靴',         romaji: 'kutsu',       hu: 'cipő' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means/state' },
      { type: 'word',     jp: '家',         romaji: 'ie',          hu: 'ház' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'direction/into' },
      { type: 'verb',     jp: '入って',     romaji: 'haitte',      hu: 'bemenve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition (Cultural Rule)', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_007', level: 'N4', translation: 'Szabad fotózni a templom belsejében?',
    tokens: [
      { type: 'word',     jp: 'お寺',       romaji: 'otera',       hu: 'templom' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '中',         romaji: 'naka',        hu: 'belseje' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: '写真',       romaji: 'shashin',     hu: 'fotó' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '撮って',     romaji: 'totte',       hu: 'készítve (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'か',         romaji: 'ka',          role: 'question' }
    ],
    metadata: { function: 'Permission (Asking)', form: 'Te + Mo ii desu ka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_008', level: 'N4', translation: 'Késő éjszakáig nem szabad a Valoranttal játszani.',
    tokens: [
      { type: 'word',     jp: '夜',         romaji: 'yoru',        hu: 'éjszaka' },
      { type: 'word',     jp: '遅く',       romaji: 'osoku',       hu: 'későn' },
      { type: 'particle', jp: 'まで',       romaji: 'made',        role: 'until' },
      { type: 'word',     jp: 'ヴァロラント',romaji: 'varoranto',   hu: 'Valorant' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'して',       romaji: 'shite',       hu: 'csinálva (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_009', level: 'N4', translation: 'Boti, használhatod ezt a 3D modellt az RPG-hez.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'word',     jp: 'ＲＰＧ',     romaji: 'aaru-pii-jii',hu: 'RPG' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target/for' },
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '３Ｄモデル', romaji: 'suriidii moderu', hu: '3D modell' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '使って',     romaji: 'tsukatte',    hu: 'használva' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'よ',         romaji: 'yo',          role: 'assertion' }
    ],
    metadata: { function: 'Permission (Granting)', form: 'Te + Mo ii desu yo', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_010', level: 'N4', translation: 'Amikor dopamin-detoxon vagy, nem szabad sokáig nézni a telefont.',
    tokens: [
      { type: 'word',     jp: 'デトックス', romaji: 'detokkusu',   hu: 'detox' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '時',         romaji: 'toki',        hu: 'amikor / idő', semantic: 'időhatározó' },
      { type: 'word',     jp: 'スマホ',     romaji: 'sumaho',      hu: 'okostelefon' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: '長く',       romaji: 'nagaku',      hu: 'sokáig/hosszan' },
      { type: 'verb',     jp: '見て',       romaji: 'mite',        hu: 'nézve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition (Conditional Time)', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_011', level: 'N4', translation: 'A húgom játszhat a zongorámon.',
    tokens: [
      { type: 'word',     jp: '妹',         romaji: 'imouto',      hu: 'húg' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '私の',       romaji: 'watashi no',  hu: 'az én' },
      { type: 'word',     jp: 'ピアノ',     romaji: 'piano',       hu: 'zongora' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '弾いて',     romaji: 'hiite',       hu: 'játszva (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Permission (Granting)', form: 'Te + Mo ii desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_012', level: 'N4', translation: 'Nem szabad a táskát ide tenni.',
    tokens: [
      { type: 'word',     jp: 'カバン',     romaji: 'kaban',       hu: 'táska' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'word',     jp: 'ここ',       romaji: 'koko',        hu: 'ide (hely)' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'location' },
      { type: 'verb',     jp: '置いて',     romaji: 'oite',        hu: 'rakva/téve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_013', level: 'N4', translation: 'Szabad nehéz dolgokat tenni az új asztalra.',
    tokens: [
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',   hu: 'új' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'target location' },
      { type: 'word',     jp: '重い',       romaji: 'omoi',        hu: 'nehéz (súly)' },
      { type: 'word',     jp: '物',         romaji: 'mono',        hu: 'dolog' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '置いて',     romaji: 'oite',        hu: 'letéve (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Permission', form: 'Te + Mo ii desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_014', level: 'N4', translation: 'A repülőtéren nem szabad elveszíteni az útlevelet.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: 'パスポート', romaji: 'pasupooto',   hu: 'útlevél' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'なくして',   romaji: 'nakushite',   hu: 'elveszítve (te-forma)' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_015', level: 'N4', translation: 'Szabad itt horgászni?',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',        hu: 'itt' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: '釣り',       romaji: 'tsuri',       hu: 'horgászat' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'して',       romaji: 'shite',       hu: 'csinálva (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'か',         romaji: 'ka',          role: 'question' }
    ],
    metadata: { function: 'Permission (Asking)', form: 'Te + Mo ii desu ka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_016', level: 'N4', translation: 'Amikor sérült vagy, nem szabad taekwondózni.',
    tokens: [
      { type: 'word',     jp: '怪我',       romaji: 'kega',        hu: 'sérülés' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'している',   romaji: 'shite iru',   hu: 'szenved (állapot)' },
      { type: 'word',     jp: '時',         romaji: 'toki',        hu: 'amikor' },
      { type: 'word',     jp: 'テコンドー', romaji: 'tekondoo',    hu: 'taekwondo' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'して',       romaji: 'shite',       hu: 'csinálva' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition (Conditional Time)', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_017', level: 'N4', translation: 'Kikapcsolhatod a mikrofont a Discordon.',
    tokens: [
      { type: 'word',     jp: 'ディスコード',romaji: 'disukoodo',   hu: 'Discord' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: 'マイク',     romaji: 'maiku',       hu: 'mikrofon' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '消して',     romaji: 'keshite',     hu: 'kikapcsolva/eltüntetve' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Permission', form: 'Te + Mo ii desu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_018', level: 'N4', translation: 'Az egyetem könyvtárában nem szabad hangosan beszélni.',
    tokens: [
      { type: 'word',     jp: '大学',       romaji: 'daigaku',     hu: 'egyetem' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: '図書館',     romaji: 'toshokan',    hu: 'könyvtár' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: '大きい',     romaji: 'ookii',       hu: 'nagy' },
      { type: 'word',     jp: '声',         romaji: 'koe',         hu: 'hang' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'means' },
      { type: 'verb',     jp: '話して',     romaji: 'hanashite',   hu: 'beszélve' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic (prohibition)' },
      { type: 'verb',     jp: 'いけません', romaji: 'ikemasen',    hu: 'tilos' }
    ],
    metadata: { function: 'Prohibition', form: 'Te + Wa ikemasen', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_019', level: 'N4', translation: 'Letehetem ide a billentyűzetet?',
    tokens: [
      { type: 'word',     jp: 'ここ',       romaji: 'koko',        hu: 'ide' },
      { type: 'particle', jp: 'に',         romaji: 'ni',          role: 'location' },
      { type: 'word',     jp: 'キーボード', romaji: 'kiiboodo',    hu: 'billentyűzet' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '置いて',     romaji: 'oite',        hu: 'letéve (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' },
      { type: 'particle', jp: 'か',         romaji: 'ka',          role: 'question' }
    ],
    metadata: { function: 'Permission (Asking)', form: 'Te + Mo ii desu ka', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_prm_020', level: 'N4', translation: 'Ma korán hazamehetsz a repülőtérről.',
    tokens: [
      { type: 'word',     jp: '今日',       romaji: 'kyou',        hu: 'ma', semantic: 'időhatározó' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: '早く',       romaji: 'hayaku',      hu: 'korán/gyorsan' },
      { type: 'verb',     jp: '帰って',     romaji: 'kaette',      hu: 'hazatérve (te-forma)' },
      { type: 'particle', jp: 'も',         romaji: 'mo',          role: 'even/also' },
      { type: 'word',     jp: 'いい',       romaji: 'ii',          hu: 'jó' },
      { type: 'word',     jp: 'です',       romaji: 'desu',        hu: 'van' }
    ],
    metadata: { function: 'Permission (Granting)', form: 'Te + Mo ii desu', tense: 'Non-Past', register: 'Polite' }
  },
  // ── N4_TRANSITIVE — Tárgyas/Tárgyatlan párok (kowasu/kowareru, otosu/ochiru, stb.) ──
  {
    id: 's_n4_trn_001', level: 'N4', translation: 'Megjavítom a terminált a repülőtéren.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '端末',       romaji: 'tanmatsu',    hu: 'terminál' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '直します',   romaji: 'naoshimasu',  hu: 'megjavítom' }
    ],
    metadata: { function: 'Transitive Action (Naosu)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_002', level: 'N4', translation: 'Végre megjavult a gép.',
    tokens: [
      { type: 'word',     jp: 'やっと',     romaji: 'yatto',       hu: 'végre', semantic: 'határozó' },
      { type: 'word',     jp: '機械',       romaji: 'kikai',       hu: 'gép' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '直りました', romaji: 'naorimashita',hu: 'megjavult' }
    ],
    metadata: { function: 'Intransitive State Change (Naoru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_003', level: 'N4', translation: 'Véletlenül eltörtem a régi monitort.',
    tokens: [
      { type: 'word',     jp: '間違えて',   romaji: 'machigaete',  hu: 'véletlenül/tévedésből' },
      { type: 'word',     jp: '古い',       romaji: 'furui',       hu: 'régi' },
      { type: 'word',     jp: 'モニター',   romaji: 'monitaa',     hu: 'monitor' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '壊しました', romaji: 'kowashimashita', hu: 'eltörtem/elrontottam' }
    ],
    metadata: { function: 'Transitive Action (Kowasu)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_004', level: 'N4', translation: 'Elromlott a gép a raktárban.',
    tokens: [
      { type: 'word',     jp: '倉庫',       romaji: 'souko',       hu: 'raktár' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'location/modifier' },
      { type: 'word',     jp: '機械',       romaji: 'kikai',       hu: 'gép' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '壊れました', romaji: 'kowaremashita', hu: 'elromlott' }
    ],
    metadata: { function: 'Intransitive State Change (Kowareru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_005', level: 'N4', translation: 'Eleejtettem egy könyvet a könyvtárban.',
    tokens: [
      { type: 'word',     jp: '図書館',     romaji: 'toshokan',    hu: 'könyvtár' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: '本',         romaji: 'hon',         hu: 'könyv' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '落としました',romaji: 'otoshimashita', hu: 'elejtettem' }
    ],
    metadata: { function: 'Transitive Action (Otosu)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_006', level: 'N4', translation: 'Leesett a táskám az új asztalról.',
    tokens: [
      { type: 'word',     jp: '新しい',     romaji: 'atarashii',   hu: 'új' },
      { type: 'word',     jp: '机',         romaji: 'tsukue',      hu: 'asztal' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: 'カバン',     romaji: 'kaban',       hu: 'táska' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '落ちました', romaji: 'ochimashita', hu: 'leesett' }
    ],
    metadata: { function: 'Intransitive Action (Ochiru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_007', level: 'N4', translation: 'Bekapcsolom a számítógépet és elkezdek programozni.',
    tokens: [
      { type: 'word',     jp: 'パソコン',   romaji: 'pasokon',     hu: 'számítógép' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: 'つけて',     romaji: 'tsukete',     hu: 'bekapcsolva (te-forma)' },
      { type: 'word',     jp: 'プログラミング',romaji: 'puroguramingu',hu: 'programozás' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '始めます',   romaji: 'hajimemasu',  hu: 'elkezdem' }
    ],
    metadata: { function: 'Transitive Action (Tsukeru & Hajimeru)', form: 'Te + Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_008', level: 'N4', translation: 'A szobámban felkapcsolódott a villany.',
    tokens: [
      { type: 'word',     jp: '私の',       romaji: 'watashi no',  hu: 'az én' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szobám' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'location marker' },
      { type: 'word',     jp: '電気',       romaji: 'denki',       hu: 'villany/áram' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: 'つきました', romaji: 'tsukimashita',hu: 'felkapcsolódott' }
    ],
    metadata: { function: 'Intransitive State Change (Tsuku)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_009', level: 'N4', translation: 'A fókuszálás érdekében kikapcsolom a telefont.',
    tokens: [
      { type: 'word',     jp: '集中',       romaji: 'shuuchuu',    hu: 'fókusz' },
      { type: 'verb',     jp: 'する',       romaji: 'suru',        hu: 'csinál' },
      { type: 'word',     jp: 'ために',     romaji: 'tame ni',     hu: 'érdekében / céljából' },
      { type: 'word',     jp: 'スマホ',     romaji: 'sumaho',      hu: 'okostelefon' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '消します',   romaji: 'keshimasu',   hu: 'kikapcsolom/eltüntetem' }
    ],
    metadata: { function: 'Transitive Action (Kesu)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_010', level: 'N4', translation: 'A szerverről eltűntek a fájlok.',
    tokens: [
      { type: 'word',     jp: 'サーバー',   romaji: 'saabaa',      hu: 'szerver' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'source' },
      { type: 'word',     jp: 'ファイル',   romaji: 'fairu',       hu: 'fájl' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '消えました', romaji: 'kiemashita',  hu: 'eltűntek' }
    ],
    metadata: { function: 'Intransitive State Change (Kieru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_011', level: 'N4', translation: 'Nagyon meleg van, ezért kinyitom az ablakot.',
    tokens: [
      { type: 'word',     jp: 'とても',     romaji: 'totemo',      hu: 'nagyon' },
      { type: 'word',     jp: '暑い',       romaji: 'atsui',       hu: 'meleg' },
      { type: 'particle', jp: 'から',       romaji: 'kara',        role: 'reason' },
      { type: 'word',     jp: '窓',         romaji: 'mado',        hu: 'ablak' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '開けます',   romaji: 'akemasu',     hu: 'kinyitom' }
    ],
    metadata: { function: 'Transitive Action (Akeru)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_012', level: 'N4', translation: 'Kinyílt a repülőtér kapuja.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'ゲート',     romaji: 'geeto',       hu: 'kapu/gate' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '開きました', romaji: 'akimashita',  hu: 'kinyílt' }
    ],
    metadata: { function: 'Intransitive State Change (Aku)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_013', level: 'N4', translation: 'Boti bezárta a szoba ajtaját.',
    tokens: [
      { type: 'word',     jp: 'ボティさん', romaji: 'Boti-san',    hu: 'Boti' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szoba' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: 'ドア',       romaji: 'doa',         hu: 'ajtó' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '閉めました', romaji: 'shimemashita',hu: 'bezárta' }
    ],
    metadata: { function: 'Transitive Action (Shimeru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_014', level: 'N4', translation: 'Bezárult a sportbolt ajtaja.',
    tokens: [
      { type: 'word',     jp: 'スポーツ店', romaji: 'supootsuten', hu: 'sportbolt' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'possession' },
      { type: 'word',     jp: 'ドア',       romaji: 'doa',         hu: 'ajtó' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '閉まりました',romaji: 'shimarimashita', hu: 'bezárult' }
    ],
    metadata: { function: 'Intransitive State Change (Shimaru)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_015', level: 'N4', translation: 'Elkezdem a taekwondo edzést.',
    tokens: [
      { type: 'word',     jp: 'テコンドー', romaji: 'tekondoo',    hu: 'taekwondo' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '練習',       romaji: 'renshuu',     hu: 'edzés/gyakorlás' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '始めます',   romaji: 'hajimemasu',  hu: 'elkezdem' }
    ],
    metadata: { function: 'Transitive Action (Hajimeru)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_016', level: 'N4', translation: 'Nemsokára kezdődik a matek érettségi.',
    tokens: [
      { type: 'word',     jp: 'もうすぐ',   romaji: 'mousugu',     hu: 'nemsokára/mindjárt', semantic: 'időhatározó' },
      { type: 'word',     jp: '数学',       romaji: 'suugaku',     hu: 'matematika' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: '試験',       romaji: 'shiken',      hu: 'vizsga/érettségi' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '始まります', romaji: 'hajimarimasu',hu: 'elkezdődik' }
    ],
    metadata: { function: 'Intransitive Action (Hajimaru)', form: 'Masu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_017', level: 'N4', translation: 'Kijavítottam egy hibát a Godot projektben.',
    tokens: [
      { type: 'word',     jp: 'ゴドー',     romaji: 'Godoo',       hu: 'Godot (engine)' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'modifier' },
      { type: 'word',     jp: 'プロジェクト',romaji: 'purojekuto',  hu: 'projekt' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: 'バグ',       romaji: 'bagu',        hu: 'bug/hiba' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '直しました', romaji: 'naoshimashita', hu: 'megjavítottam/kijavítottam' }
    ],
    metadata: { function: 'Transitive Action (Naosu)', form: 'Masu', tense: 'Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_018', level: 'N4', translation: 'Ez a terminál jelenleg el van romolva (rossz).',
    tokens: [
      { type: 'word',     jp: 'この',       romaji: 'kono',        hu: 'ez a' },
      { type: 'word',     jp: '端末',       romaji: 'tanmatsu',    hu: 'terminál' },
      { type: 'particle', jp: 'は',         romaji: 'wa',          role: 'topic' },
      { type: 'word',     jp: '今',         romaji: 'ima',         hu: 'most', semantic: 'időhatározó' },
      { type: 'verb',     jp: '壊れています',romaji: 'kowarete imasu', hu: 'el van romolva (állapot)' }
    ],
    metadata: { function: 'Intransitive Resultant State (Te iru)', form: 'Te + Imasu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_019', level: 'N4', translation: 'A szobában le van kapcsolva a lámpa (sötét van).',
    tokens: [
      { type: 'word',     jp: '部屋',       romaji: 'heya',        hu: 'szoba' },
      { type: 'particle', jp: 'の',         romaji: 'no',          role: 'location' },
      { type: 'word',     jp: '電気',       romaji: 'denki',       hu: 'villany/lámpa' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'verb',     jp: '消えています',romaji: 'kiete imasu', hu: 'le van kapcsolva (állapot)' }
    ],
    metadata: { function: 'Intransitive Resultant State (Te iru)', form: 'Te + Imasu', tense: 'Non-Past', register: 'Polite' }
  },
  {
    id: 's_n4_trn_020', level: 'N4', translation: 'A repülőtéren valaki elejtette az útlevelét.',
    tokens: [
      { type: 'word',     jp: '空港',       romaji: 'kuukou',      hu: 'repülőtér' },
      { type: 'particle', jp: 'で',         romaji: 'de',          role: 'location of action' },
      { type: 'word',     jp: '誰か',       romaji: 'dareka',      hu: 'valaki' },
      { type: 'particle', jp: 'が',         romaji: 'ga',          role: 'subject' },
      { type: 'word',     jp: 'パスポート', romaji: 'pasupooto',   hu: 'útlevél' },
      { type: 'particle', jp: 'を',         romaji: 'wo',          role: 'object' },
      { type: 'verb',     jp: '落としました',romaji: 'otoshimashita', hu: 'elejtette' }
    ],
    metadata: { function: 'Transitive Action (Otosu)', form: 'Masu', tense: 'Past', register: 'Polite' }
  }
];


