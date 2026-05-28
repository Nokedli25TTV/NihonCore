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
  }
];


