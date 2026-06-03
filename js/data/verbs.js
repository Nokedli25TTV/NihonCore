/* ====================================================
   NIHONCORE — verbs.js (Ragozó modul ige-szótár)
   ----------------------------------------------------
   NIHONCORE_VERBS — Ige starter szett (Godan + Ichidan + Irregular).
   Mező-séma a core.js NIHONCORE_FORM_RULES kommentjében.
   Engine: initConjugationPage az app.js-ben.
   Bővítés: új ige = új objektum a tömb végére.
   ==================================================== */
const NIHONCORE_VERBS = [

  // ── GODAN ────────────────────────────────────────
  {
    id: 'nomu',     kanji: '飲む',   kana: 'のむ',     romaji: 'nomu',
    group: 'godan', godanFamily: 'mu',
    stemKana: 'の', stemRomaji: 'no',
    level: 'N5', theme: 'daily', meaningHu: 'iszik',
    example: { jp: '水を飲みます。', romaji: 'mizu wo nomimasu.', hu: 'Vizet iszom.' }
  },
  {
    id: 'kaku',     kanji: '書く',   kana: 'かく',     romaji: 'kaku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'か', stemRomaji: 'ka',
    level: 'N5', theme: 'daily', meaningHu: 'ír',
    example: { jp: '手紙を書きます。', romaji: 'tegami wo kakimasu.', hu: 'Levelet írok.' }
  },
  {
    id: 'hanasu',   kanji: '話す',   kana: 'はなす',   romaji: 'hanasu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'はな', stemRomaji: 'hana',
    level: 'N5', theme: 'daily', meaningHu: 'beszél',
    example: { jp: '日本語を話します。', romaji: 'nihongo wo hanashimasu.', hu: 'Japánul beszélek.' }
  },
  {
    id: 'matsu',    kanji: '待つ',   kana: 'まつ',     romaji: 'matsu',
    group: 'godan', godanFamily: 'tsu',
    stemKana: 'ま', stemRomaji: 'ma',
    level: 'N5', theme: 'daily', meaningHu: 'vár',
    example: { jp: '友達を待ちます。', romaji: 'tomodachi wo machimasu.', hu: 'Várom a barátomat.' }
  },
  {
    id: 'asobu',    kanji: '遊ぶ',   kana: 'あそぶ',   romaji: 'asobu',
    group: 'godan', godanFamily: 'bu',
    stemKana: 'あそ', stemRomaji: 'aso',
    level: 'N5', theme: 'daily', meaningHu: 'játszik',
    example: { jp: '公園で遊びます。', romaji: 'kouen de asobimasu.', hu: 'A parkban játszom.' }
  },
  {
    id: 'kau',      kanji: '買う',   kana: 'かう',     romaji: 'kau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'か', stemRomaji: 'ka',
    level: 'N5', theme: 'daily', meaningHu: 'vesz / vásárol',
    example: { jp: '本を買います。', romaji: 'hon wo kaimasu.', hu: 'Könyvet veszek.' }
  },
  {
    id: 'iku',      kanji: '行く',   kana: 'いく',     romaji: 'iku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'い', stemRomaji: 'i',
    irregularTe: true,                     // 行く → 行って / 行った
    level: 'N5', theme: 'movement', meaningHu: 'megy',
    example: { jp: '学校へ行きます。', romaji: 'gakkou e ikimasu.', hu: 'Iskolába megyek.' }
  },
  {
    id: 'kaeru_g',  kanji: '帰る',   kana: 'かえる',   romaji: 'kaeru',
    group: 'godan', godanFamily: 'ru',     // Ál-Ichidan! Lát Ichidannak, de Godan.
    stemKana: 'かえ', stemRomaji: 'kae',
    pseudoIchidan: true,
    level: 'N5', theme: 'movement', meaningHu: 'hazamegy',
    example: { jp: '家に帰ります。', romaji: 'ie ni kaerimasu.', hu: 'Hazamegyek.' }
  },
  {
    id: 'hashiru',  kanji: '走る',   kana: 'はしる',   romaji: 'hashiru',
    group: 'godan', godanFamily: 'ru',     // Ál-Ichidan!
    stemKana: 'はし', stemRomaji: 'hashi',
    pseudoIchidan: true,
    level: 'N5', theme: 'movement', meaningHu: 'fut',
    example: { jp: '公園を走ります。', romaji: 'kouen wo hashirimasu.', hu: 'A parkban futok.' }
  },

  // ── ICHIDAN ──────────────────────────────────────
  {
    id: 'taberu',   kanji: '食べる', kana: 'たべる',   romaji: 'taberu',
    group: 'ichidan',
    stemKana: 'たべ', stemRomaji: 'tabe',
    level: 'N5', theme: 'daily', meaningHu: 'eszik',
    example: { jp: '寿司を食べます。', romaji: 'sushi wo tabemasu.', hu: 'Sushit eszem.' }
  },
  {
    id: 'miru',     kanji: '見る',   kana: 'みる',     romaji: 'miru',
    group: 'ichidan',
    stemKana: 'み', stemRomaji: 'mi',
    level: 'N5', theme: 'daily', meaningHu: 'néz / lát',
    example: { jp: '映画を見ます。', romaji: 'eiga wo mimasu.', hu: 'Filmet nézek.' }
  },
  {
    id: 'okiru',    kanji: '起きる', kana: 'おきる',   romaji: 'okiru',
    group: 'ichidan',
    stemKana: 'おき', stemRomaji: 'oki',
    level: 'N5', theme: 'daily', meaningHu: 'felkel',
    example: { jp: '七時に起きます。', romaji: 'shichiji ni okimasu.', hu: 'Hétkor kelek fel.' }
  },

  // ── IRREGULAR (Group 3) ──────────────────────────
  {
    id: 'suru',     kanji: 'する',   kana: 'する',     romaji: 'suru',
    group: 'irregular',
    stemKana: '',  stemRomaji: '',
    level: 'N5', theme: 'daily', meaningHu: 'csinál',
    example: { jp: '勉強をします。', romaji: 'benkyou wo shimasu.', hu: 'Tanulok.' }
  },
  {
    id: 'kuru',     kanji: '来る',   kana: 'くる',     romaji: 'kuru',
    group: 'irregular',
    stemKana: '',  stemRomaji: '',
    level: 'N5', theme: 'movement', meaningHu: 'jön',
    example: { jp: '友達が来ます。', romaji: 'tomodachi ga kimasu.', hu: 'Jön a barátom.' }
  },

  /* ════════════════════════════════════════════════════════
     V8 — IGE BŐVÍTÉS (Draft 50 — N5/N4 alap)
     A user végignézheti, módosíthat, törölhet, kiegészíthet.
     Csoportosítás: Godan kategóriánként → Ál-Ichidan → Ichidan
     ════════════════════════════════════════════════════════ */

  // ── GODAN · KU család (5 új) ─────────────────────────
  {
    id: 'aruku',    kanji: '歩く',   kana: 'あるく',   romaji: 'aruku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'ある', stemRomaji: 'aru',
    level: 'N5', theme: 'movement', meaningHu: 'sétál / gyalogol',
    example: { jp: '公園を歩きます。', romaji: 'kouen wo arukimasu.', hu: 'A parkban sétálok.' }
  },
  {
    id: 'hataraku', kanji: '働く',   kana: 'はたらく', romaji: 'hataraku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'はたら', stemRomaji: 'hatara',
    level: 'N5', theme: 'daily', meaningHu: 'dolgozik',
    example: { jp: '会社で働きます。', romaji: 'kaisha de hatarakimasu.', hu: 'Egy cégnél dolgozom.' }
  },
  {
    id: 'kiku',     kanji: '聞く',   kana: 'きく',     romaji: 'kiku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'き', stemRomaji: 'ki',
    level: 'N5', theme: 'daily', meaningHu: 'hall / kérdez',
    example: { jp: '音楽を聞きます。', romaji: 'ongaku wo kikimasu.', hu: 'Zenét hallgatok.' }
  },
  {
    id: 'tsuku',    kanji: '着く',   kana: 'つく',     romaji: 'tsuku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'つ', stemRomaji: 'tsu',
    level: 'N4', theme: 'movement', meaningHu: 'megérkezik',
    example: { jp: '駅に着きます。', romaji: 'eki ni tsukimasu.', hu: 'Megérkezem az állomásra.' }
  },
  {
    id: 'hiraku',   kanji: '開く',   kana: 'ひらく',   romaji: 'hiraku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'ひら', stemRomaji: 'hira',
    level: 'N4', theme: 'transitivity', meaningHu: 'kinyit / kinyílik',
    example: { jp: 'ドアが開きます。', romaji: 'doa ga hirakimasu.', hu: 'Az ajtó kinyílik.' }
  },

  // ── GODAN · GU család (3 új) ─────────────────────────
  {
    id: 'oyogu',    kanji: '泳ぐ',   kana: 'およぐ',   romaji: 'oyogu',
    group: 'godan', godanFamily: 'gu',
    stemKana: 'およ', stemRomaji: 'oyo',
    level: 'N5', theme: 'movement', meaningHu: 'úszik',
    example: { jp: '海で泳ぎます。', romaji: 'umi de oyogimasu.', hu: 'A tengerben úszom.' }
  },
  {
    id: 'isogu',    kanji: '急ぐ',   kana: 'いそぐ',   romaji: 'isogu',
    group: 'godan', godanFamily: 'gu',
    stemKana: 'いそ', stemRomaji: 'iso',
    level: 'N4', theme: 'movement', meaningHu: 'siet',
    example: { jp: '駅へ急ぎます。', romaji: 'eki e isogimasu.', hu: 'Sietek az állomásra.' }
  },
  {
    id: 'nugu',     kanji: '脱ぐ',   kana: 'ぬぐ',     romaji: 'nugu',
    group: 'godan', godanFamily: 'gu',
    stemKana: 'ぬ', stemRomaji: 'nu',
    level: 'N4', theme: 'clothing', meaningHu: 'levesz (ruhát, cipőt)',
    example: { jp: '靴を脱ぎます。', romaji: 'kutsu wo nugimasu.', hu: 'Leveszem a cipőt.' }
  },

  // ── GODAN · SU család (3 új) ─────────────────────────
  {
    id: 'kasu',     kanji: '貸す',   kana: 'かす',     romaji: 'kasu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'か', stemRomaji: 'ka',
    level: 'N4', theme: 'giving', meaningHu: 'kölcsönad',
    example: { jp: '友達に本を貸します。', romaji: 'tomodachi ni hon wo kashimasu.', hu: 'Kölcsönadom a könyvet a barátomnak.' }
  },
  {
    id: 'dasu',     kanji: '出す',   kana: 'だす',     romaji: 'dasu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'だ', stemRomaji: 'da',
    level: 'N5', theme: 'daily', meaningHu: 'kivesz / felad (levelet)',
    example: { jp: '手紙を出します。', romaji: 'tegami wo dashimasu.', hu: 'Feladom a levelet.' }
  },
  {
    id: 'kaesu',    kanji: '返す',   kana: 'かえす',   romaji: 'kaesu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'かえ', stemRomaji: 'kae',
    level: 'N4', theme: 'giving', meaningHu: 'visszaad',
    example: { jp: '本を返します。', romaji: 'hon wo kaeshimasu.', hu: 'Visszaadom a könyvet.' }
  },

  // ── GODAN · TSU család (3 új) ────────────────────────
  {
    id: 'tatsu',    kanji: '立つ',   kana: 'たつ',     romaji: 'tatsu',
    group: 'godan', godanFamily: 'tsu',
    stemKana: 'た', stemRomaji: 'ta',
    level: 'N5', theme: 'movement', meaningHu: 'áll / felkel',
    example: { jp: '椅子から立ちます。', romaji: 'isu kara tachimasu.', hu: 'Felállok a székről.' }
  },
  {
    id: 'motsu',    kanji: '持つ',   kana: 'もつ',     romaji: 'motsu',
    group: 'godan', godanFamily: 'tsu',
    stemKana: 'も', stemRomaji: 'mo',
    level: 'N5', theme: 'daily', meaningHu: 'tart / birtokol',
    example: { jp: 'かばんを持ちます。', romaji: 'kaban wo mochimasu.', hu: 'A táskát fogom.' }
  },
  {
    id: 'katsu',    kanji: '勝つ',   kana: 'かつ',     romaji: 'katsu',
    group: 'godan', godanFamily: 'tsu',
    stemKana: 'か', stemRomaji: 'ka',
    level: 'N4', theme: 'daily', meaningHu: 'nyer',
    example: { jp: '試合に勝ちます。', romaji: 'shiai ni kachimasu.', hu: 'Nyerek a meccsen.' }
  },

  // ── GODAN · NU család (1 új, kivételes ige!) ─────────
  {
    id: 'shinu',    kanji: '死ぬ',   kana: 'しぬ',     romaji: 'shinu',
    group: 'godan', godanFamily: 'nu',
    stemKana: 'し', stemRomaji: 'shi',
    level: 'N4', theme: 'state', meaningHu: 'meghal',
    note: 'Az EGYETLEN -ぬ végződésű japán ige.',
    example: { jp: '花が死にます。', romaji: 'hana ga shinimasu.', hu: 'A virág elpusztul.' }
  },

  // ── GODAN · BU család (3 új) ─────────────────────────
  {
    id: 'yobu',     kanji: '呼ぶ',   kana: 'よぶ',     romaji: 'yobu',
    group: 'godan', godanFamily: 'bu',
    stemKana: 'よ', stemRomaji: 'yo',
    level: 'N4', theme: 'daily', meaningHu: 'hív / megszólít',
    example: { jp: 'タクシーを呼びます。', romaji: 'takushii wo yobimasu.', hu: 'Hívok egy taxit.' }
  },
  {
    id: 'tobu',     kanji: '飛ぶ',   kana: 'とぶ',     romaji: 'tobu',
    group: 'godan', godanFamily: 'bu',
    stemKana: 'と', stemRomaji: 'to',
    level: 'N4', theme: 'movement', meaningHu: 'repül / ugrik',
    example: { jp: '鳥が飛びます。', romaji: 'tori ga tobimasu.', hu: 'Repül a madár.' }
  },
  {
    id: 'erabu',    kanji: '選ぶ',   kana: 'えらぶ',   romaji: 'erabu',
    group: 'godan', godanFamily: 'bu',
    stemKana: 'えら', stemRomaji: 'era',
    level: 'N4', theme: 'daily', meaningHu: 'választ',
    example: { jp: 'プレゼントを選びます。', romaji: 'purezento wo erabimasu.', hu: 'Ajándékot választok.' }
  },

  // ── GODAN · MU család (3 új) ─────────────────────────
  {
    id: 'yomu',     kanji: '読む',   kana: 'よむ',     romaji: 'yomu',
    group: 'godan', godanFamily: 'mu',
    stemKana: 'よ', stemRomaji: 'yo',
    level: 'N5', theme: 'daily', meaningHu: 'olvas',
    example: { jp: '新聞を読みます。', romaji: 'shinbun wo yomimasu.', hu: 'Újságot olvasok.' }
  },
  {
    id: 'yasumu',   kanji: '休む',   kana: 'やすむ',   romaji: 'yasumu',
    group: 'godan', godanFamily: 'mu',
    stemKana: 'やす', stemRomaji: 'yasu',
    level: 'N5', theme: 'daily', meaningHu: 'pihen / hiányzik',
    example: { jp: '日曜日は休みます。', romaji: 'nichiyoubi wa yasumimasu.', hu: 'Vasárnap pihenek.' }
  },
  {
    id: 'sumu',     kanji: '住む',   kana: 'すむ',     romaji: 'sumu',
    group: 'godan', godanFamily: 'mu',
    stemKana: 'す', stemRomaji: 'su',
    level: 'N5', theme: 'daily', meaningHu: 'lakik',
    example: { jp: '東京に住みます。', romaji: 'toukyou ni sumimasu.', hu: 'Tokióban lakom.' }
  },

  // ── GODAN · RU család (7 új — NEM ál-ichidan, valódi godan) ──
  {
    id: 'wakaru',   kanji: '分かる', kana: 'わかる',   romaji: 'wakaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'わか', stemRomaji: 'waka',
    level: 'N5', theme: 'state', meaningHu: 'ért / felfog',
    example: { jp: '日本語が分かります。', romaji: 'nihongo ga wakarimasu.', hu: 'Értem a japánt.' }
  },
  {
    id: 'tsukuru',  kanji: '作る',   kana: 'つくる',   romaji: 'tsukuru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'つく', stemRomaji: 'tsuku',
    level: 'N5', theme: 'daily', meaningHu: 'készít / csinál',
    example: { jp: '料理を作ります。', romaji: 'ryouri wo tsukurimasu.', hu: 'Főzök / ételt készítek.' }
  },
  {
    id: 'okuru',    kanji: '送る',   kana: 'おくる',   romaji: 'okuru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'おく', stemRomaji: 'oku',
    level: 'N4', theme: 'giving', meaningHu: 'küld',
    example: { jp: 'メールを送ります。', romaji: 'meeru wo okurimasu.', hu: 'E-mailt küldök.' }
  },
  {
    id: 'noru',     kanji: '乗る',   kana: 'のる',     romaji: 'noru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'の', stemRomaji: 'no',
    level: 'N5', theme: 'movement', meaningHu: 'felszáll (járműre)',
    example: { jp: 'バスに乗ります。', romaji: 'basu ni norimasu.', hu: 'Felszállok a buszra.' }
  },
  {
    id: 'toru',     kanji: '取る',   kana: 'とる',     romaji: 'toru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'と', stemRomaji: 'to',
    level: 'N5', theme: 'daily', meaningHu: 'vesz (kézbe) / elvesz',
    example: { jp: '本を取ります。', romaji: 'hon wo torimasu.', hu: 'Kézbe veszem a könyvet.' }
  },
  {
    id: 'tomaru',   kanji: '止まる', kana: 'とまる',   romaji: 'tomaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'とま', stemRomaji: 'toma',
    level: 'N4', theme: 'transitivity', meaningHu: 'megáll',
    example: { jp: '電車が止まります。', romaji: 'densha ga tomarimasu.', hu: 'Megáll a vonat.' }
  },
  {
    id: 'magaru',   kanji: '曲がる', kana: 'まがる',   romaji: 'magaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'まが', stemRomaji: 'maga',
    level: 'N4', theme: 'movement', meaningHu: 'kanyarodik',
    example: { jp: '右へ曲がります。', romaji: 'migi e magarimasu.', hu: 'Jobbra kanyarodom.' }
  },

  // ── GODAN · U család — vokális tő (8 új) ─────────────
  {
    id: 'au',       kanji: '会う',   kana: 'あう',     romaji: 'au',
    group: 'godan', godanFamily: 'u',
    stemKana: 'あ', stemRomaji: 'a',
    level: 'N5', theme: 'daily', meaningHu: 'találkozik',
    example: { jp: '友達に会います。', romaji: 'tomodachi ni aimasu.', hu: 'Találkozom a barátommal.' }
  },
  {
    id: 'iu',       kanji: '言う',   kana: 'いう',     romaji: 'iu',
    group: 'godan', godanFamily: 'u',
    stemKana: 'い', stemRomaji: 'i',
    level: 'N5', theme: 'daily', meaningHu: 'mond / hív',
    example: { jp: '「こんにちは」と言います。', romaji: '"konnichiwa" to iimasu.', hu: 'Azt mondom: „üdv".' }
  },
  {
    id: 'omou',     kanji: '思う',   kana: 'おもう',   romaji: 'omou',
    group: 'godan', godanFamily: 'u',
    stemKana: 'おも', stemRomaji: 'omo',
    level: 'N4', theme: 'state', meaningHu: 'gondol / vél',
    example: { jp: 'いいと思います。', romaji: 'ii to omoimasu.', hu: 'Szerintem jó.' }
  },
  {
    id: 'tsukau',   kanji: '使う',   kana: 'つかう',   romaji: 'tsukau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'つか', stemRomaji: 'tsuka',
    level: 'N5', theme: 'daily', meaningHu: 'használ',
    example: { jp: 'パソコンを使います。', romaji: 'pasokon wo tsukaimasu.', hu: 'Számítógépet használok.' }
  },
  {
    id: 'utau',     kanji: '歌う',   kana: 'うたう',   romaji: 'utau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'うた', stemRomaji: 'uta',
    level: 'N5', theme: 'daily', meaningHu: 'énekel',
    example: { jp: '歌を歌います。', romaji: 'uta wo utaimasu.', hu: 'Énekelek egy dalt.' }
  },
  {
    id: 'arau',     kanji: '洗う',   kana: 'あらう',   romaji: 'arau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'あら', stemRomaji: 'ara',
    level: 'N4', theme: 'daily', meaningHu: 'mos',
    example: { jp: '手を洗います。', romaji: 'te wo araimasu.', hu: 'Kezet mosok.' }
  },
  {
    id: 'warau',    kanji: '笑う',   kana: 'わらう',   romaji: 'warau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'わら', stemRomaji: 'wara',
    level: 'N4', theme: 'daily', meaningHu: 'nevet',
    example: { jp: '子供が笑います。', romaji: 'kodomo ga waraimasu.', hu: 'Nevet a gyerek.' }
  },
  {
    id: 'harau',    kanji: '払う',   kana: 'はらう',   romaji: 'harau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'はら', stemRomaji: 'hara',
    level: 'N4', theme: 'giving', meaningHu: 'fizet',
    example: { jp: 'お金を払います。', romaji: 'okane wo haraimasu.', hu: 'Pénzt fizetek.' }
  },

  // ── ÁL-ICHIDAN GODAN (3 új — csapdás "ru" végű igék) ──
  {
    id: 'hairu',    kanji: '入る',   kana: 'はいる',   romaji: 'hairu',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'はい', stemRomaji: 'hai',
    pseudoIchidan: true,
    level: 'N5', theme: 'movement', meaningHu: 'bemegy / belép',
    note: 'Ál-Ichidan: úgy néz ki mint Ichidan, de Godan-ként ragozódik (はいります, nem はいます).',
    example: { jp: '部屋に入ります。', romaji: 'heya ni hairimasu.', hu: 'Bemegyek a szobába.' }
  },
  {
    id: 'shiru',    kanji: '知る',   kana: 'しる',     romaji: 'shiru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'し', stemRomaji: 'shi',
    pseudoIchidan: true,
    level: 'N4', theme: 'state', meaningHu: 'tud / ismer',
    note: 'Ál-Ichidan! Megerősítő alak: 知っています (shitte imasu).',
    example: { jp: '答えを知ります。', romaji: 'kotae wo shirimasu.', hu: 'Megtudom a választ.' }
  },
  {
    id: 'kiru_g',   kanji: '切る',   kana: 'きる',     romaji: 'kiru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'き', stemRomaji: 'ki',
    pseudoIchidan: true,
    level: 'N4', theme: 'daily', meaningHu: 'vág',
    note: 'Ál-Ichidan godan! Ne keverd a 着る (felvenni ruhát, Ichidan) igével.',
    example: { jp: 'りんごを切ります。', romaji: 'ringo wo kirimasu.', hu: 'Felszeletelem az almát.' }
  },

  // ── ICHIDAN — valódi -iru / -eru végű (11 új) ────────
  {
    id: 'neru',     kanji: '寝る',   kana: 'ねる',     romaji: 'neru',
    group: 'ichidan',
    stemKana: 'ね', stemRomaji: 'ne',
    level: 'N5', theme: 'daily', meaningHu: 'alszik / lefekszik',
    example: { jp: '十時に寝ます。', romaji: 'juuji ni nemasu.', hu: 'Tízkor lefekszem.' }
  },
  {
    id: 'deru',     kanji: '出る',   kana: 'でる',     romaji: 'deru',
    group: 'ichidan',
    stemKana: 'で', stemRomaji: 'de',
    level: 'N5', theme: 'transitivity', meaningHu: 'kimegy / kilép',
    example: { jp: '家を出ます。', romaji: 'ie wo demasu.', hu: 'Elindulok otthonról.' }
  },
  {
    id: 'ireru',    kanji: '入れる', kana: 'いれる',   romaji: 'ireru',
    group: 'ichidan',
    stemKana: 'いれ', stemRomaji: 'ire',
    level: 'N4', theme: 'transitivity', meaningHu: 'betesz / behelyez',
    example: { jp: 'かばんに本を入れます。', romaji: 'kaban ni hon wo iremasu.', hu: 'Beteszem a könyvet a táskába.' }
  },
  {
    id: 'akeru',    kanji: '開ける', kana: 'あける',   romaji: 'akeru',
    group: 'ichidan',
    stemKana: 'あけ', stemRomaji: 'ake',
    level: 'N5', theme: 'transitivity', meaningHu: 'kinyit (tárgyat)',
    example: { jp: '窓を開けます。', romaji: 'mado wo akemasu.', hu: 'Kinyitom az ablakot.' }
  },
  {
    id: 'shimeru',  kanji: '閉める', kana: 'しめる',   romaji: 'shimeru',
    group: 'ichidan',
    stemKana: 'しめ', stemRomaji: 'shime',
    level: 'N5', theme: 'transitivity', meaningHu: 'bezár',
    example: { jp: 'ドアを閉めます。', romaji: 'doa wo shimemasu.', hu: 'Becsukom az ajtót.' }
  },
  {
    id: 'oshieru',  kanji: '教える', kana: 'おしえる', romaji: 'oshieru',
    group: 'ichidan',
    stemKana: 'おしえ', stemRomaji: 'oshie',
    level: 'N5', theme: 'giving', meaningHu: 'tanít / közöl',
    example: { jp: '日本語を教えます。', romaji: 'nihongo wo oshiemasu.', hu: 'Japánul tanítok.' }
  },
  {
    id: 'oboeru',   kanji: '覚える', kana: 'おぼえる', romaji: 'oboeru',
    group: 'ichidan',
    stemKana: 'おぼえ', stemRomaji: 'oboe',
    level: 'N4', theme: 'state', meaningHu: 'megjegyez / emlékszik',
    example: { jp: '漢字を覚えます。', romaji: 'kanji wo oboemasu.', hu: 'Megtanulom a kanjikat.' }
  },
  {
    id: 'wasureru', kanji: '忘れる', kana: 'わすれる', romaji: 'wasureru',
    group: 'ichidan',
    stemKana: 'わすれ', stemRomaji: 'wasure',
    level: 'N4', theme: 'state', meaningHu: 'elfelejt',
    example: { jp: '名前を忘れます。', romaji: 'namae wo wasuremasu.', hu: 'Elfelejtem a nevet.' }
  },
  {
    id: 'kangaeru', kanji: '考える', kana: 'かんがえる', romaji: 'kangaeru',
    group: 'ichidan',
    stemKana: 'かんがえ', stemRomaji: 'kangae',
    level: 'N4', theme: 'state', meaningHu: 'gondolkodik',
    example: { jp: '将来を考えます。', romaji: 'shourai wo kangaemasu.', hu: 'A jövőről gondolkodom.' }
  },
  {
    id: 'ageru',    kanji: '上げる', kana: 'あげる',   romaji: 'ageru',
    group: 'ichidan',
    stemKana: 'あげ', stemRomaji: 'age',
    level: 'N4', theme: 'giving', meaningHu: 'felemel / ad',
    example: { jp: '手を上げます。', romaji: 'te wo agemasu.', hu: 'Felemelem a kezem.' }
  },
  {
    id: 'dekiru',   kanji: '出来る', kana: 'できる',   romaji: 'dekiru',
    group: 'ichidan',
    stemKana: 'でき', stemRomaji: 'deki',
    level: 'N4', theme: 'state', meaningHu: 'tud / képes / készen áll',
    note: 'A "tudni-csinálni" gyakori formája: 〜することができる.',
    example: { jp: '日本語ができます。', romaji: 'nihongo ga dekimasu.', hu: 'Tudok japánul.' }
  },
// ════════════════════════════════════════════════════
  //  1. KATEGÓRIA: Ruházkodás (Testtájék specifikus igék - N5)
  //  (100% lefedettség, a 'nugu' már korábban bekerült)
  // ════════════════════════════════════════════════════

  {
    id: 'kiru_i',   kanji: '着る',   kana: 'きる',     romaji: 'kiru',
    group: 'ichidan',
    stemKana: 'き', stemRomaji: 'ki',
    level: 'N5', theme: 'clothing', meaningHu: 'felvesz (felsőtestre: ing, kabát, ruha)',
    note: 'Valódi Ichidan ige! Nem keverendő a 切る (vág) godan igével.',
    example: { jp: 'シャツを着ます。', romaji: 'shatsu wo kimasu.', hu: 'Felveszem az inget.' }
  },
  {
    id: 'haku',     kanji: '履く',   kana: 'はく',     romaji: 'haku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'は', stemRomaji: 'ha',
    level: 'N5', theme: 'clothing', meaningHu: 'felvesz (alsótestre: nadrág, cipő, zokni)',
    example: { jp: '靴を履きます。', romaji: 'kutsu wo hakimasu.', hu: 'Felveszem a cipőt.' }
  },
  {
    id: 'kaburu',   kanji: '被る',   kana: 'かぶる',   romaji: 'kaburu',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'かぶ', stemRomaji: 'kabu',
    level: 'N5', theme: 'clothing', meaningHu: 'felvesz (fejre: sapka, kalap)',
    example: { jp: '帽子を被ります。', romaji: 'boushi wo kaburimasu.', hu: 'Felveszem a sapkát.' }
  },
  {
    id: 'kakeru_glasses', kanji: '掛ける', kana: 'かける', romaji: 'kakeru',
    group: 'ichidan',
    stemKana: 'かけ', stemRomaji: 'kake',
    level: 'N5', theme: 'clothing', meaningHu: 'felvesz (szemüveget)',
    note: 'Sok jelentése van (hív, felakaszt), de ruházkodásnál a szemüvegre (眼鏡をかける) használják.',
    example: { jp: '眼鏡を掛けます。', romaji: 'megane wo kakemasu.', hu: 'Felveszem a szemüveget.' }
  },
// ════════════════════════════════════════════════════
  //  2. KATEGÓRIA: Tranzitív / Intranzitív párok (N5 & N4)
  //  (100% lefedettség a korábban meglévő párokkal együtt)
  // ════════════════════════════════════════════════════

  // ── Meglévő párok kiegészítése (Akeru, Shimeru, Tomaru, Noru párjai) ──
  {
    id: 'aku', kanji: '開く', kana: 'あく', romaji: 'aku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'あ', stemRomaji: 'a',
    level: 'N5', theme: 'transitivity', meaningHu: 'kinyílik (magától)',
    note: 'Intranzitív (Tárgyatlan). Párja a meglévő 開ける (akeru - kinyit). Vonzat: が.',
    example: { jp: 'ドアが開きます。', romaji: 'doa ga akimasu.', hu: 'Kinyílik az ajtó.' }
  },
  {
    id: 'shimaru', kanji: '閉まる', kana: 'しまる', romaji: 'shimaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'しま', stemRomaji: 'shima',
    level: 'N5', theme: 'transitivity', meaningHu: 'bezáródik (magától)',
    note: 'Intranzitív (Tárgyatlan). Párja a meglévő 閉める (shimeru - bezár). Vonzat: が.',
    example: { jp: 'ドアが閉まります。', romaji: 'doa ga shimarimasu.', hu: 'Bezáródik az ajtó.' }
  },
  {
    id: 'tomeru', kanji: '止める', kana: 'とめる', romaji: 'tomeru',
    group: 'ichidan',
    stemKana: 'とめ', stemRomaji: 'tome',
    level: 'N5', theme: 'transitivity', meaningHu: 'megállít / leparkol',
    note: 'Tranzitív (Tárgyas). Párja a meglévő 止まる (tomaru - megáll). Vonzat: を.',
    example: { jp: '車を止めます。', romaji: 'kuruma wo tomemasu.', hu: 'Megállítom/leparkolom az autót.' }
  },
  {
    id: 'noseru', kanji: '乗せる', kana: 'のせる', romaji: 'noseru',
    group: 'ichidan',
    stemKana: 'のせ', stemRomaji: 'nose',
    level: 'N4', theme: 'transitivity', meaningHu: 'felrak / felszállít / fuvaroz',
    note: 'Tranzitív (Tárgyas). Párja a meglévő 乗る (noru - felszáll). Vonzat: を.',
    example: { jp: '子供を車に乗せます。', romaji: 'kodomo wo kuruma ni nosemasu.', hu: 'Beszállítom a gyereket az autóba.' }
  },

  // ── Elektromosság és Fény (Felkapcsol / Lekapcsol) ──
  {
    id: 'tsukeru', kanji: '点ける', kana: 'つける', romaji: 'tsukeru',
    group: 'ichidan',
    stemKana: 'つけ', stemRomaji: 'tsuke',
    level: 'N5', theme: 'transitivity', meaningHu: 'felkapcsol (villanyt, gépet)',
    note: 'Tranzitív (Tárgyas). Gyakran hiraganával írják.',
    example: { jp: '電気を点けます。', romaji: 'denki wo tsukemasu.', hu: 'Felkapcsolom a villanyt.' }
  },
  {
    id: 'tsuku_light', kanji: '点く', kana: 'つく', romaji: 'tsuku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'つ', stemRomaji: 'tsu',
    level: 'N5', theme: 'transitivity', meaningHu: 'felkapcsolódik / ég (a villany)',
    note: 'Intranzitív (Tárgyatlan). Párja a 点ける (tsukeru).',
    example: { jp: '電気が点いています。', romaji: 'denki ga tsuite imasu.', hu: 'Ég a villany (fel van kapcsolva).' }
  },
  {
    id: 'kesu', kanji: '消す', kana: 'けす', romaji: 'kesu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'け', stemRomaji: 'ke',
    level: 'N5', theme: 'transitivity', meaningHu: 'lekapcsol (villanyt) / letöröl / elolt',
    note: 'Tranzitív (Tárgyas).',
    example: { jp: 'テレビを消します。', romaji: 'terebi wo keshimasu.', hu: 'Kikapcsolom a tévét.' }
  },
  {
    id: 'kieru', kanji: '消える', kana: 'きえる', romaji: 'kieru',
    group: 'ichidan',
    stemKana: 'きえ', stemRomaji: 'kie',
    level: 'N5', theme: 'transitivity', meaningHu: 'kikapcsolódik / kialszik / eltűnik',
    note: 'Intranzitív (Tárgyatlan). Párja a 消す (kesu).',
    example: { jp: '火が消えました。', romaji: 'hi ga kiemashita.', hu: 'Kialudt a tűz.' }
  },

  // ── Kezdet és Vég ──
  {
    id: 'hajimeru', kanji: '始める', kana: 'はじめる', romaji: 'hajimeru',
    group: 'ichidan',
    stemKana: 'はじめ', stemRomaji: 'hajime',
    level: 'N5', theme: 'transitivity', meaningHu: 'elkezd (vmit)',
    note: 'Tranzitív (Tárgyas). Te formához kapcsolva (〜て始める) is gyakori.',
    example: { jp: '勉強を始めます。', romaji: 'benkyou wo hajimemasu.', hu: 'Elkezdek tanulni.' }
  },
  {
    id: 'hajimaru', kanji: '始まる', kana: 'はじまる', romaji: 'hajimaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'はじま', stemRomaji: 'hajima',
    level: 'N5', theme: 'transitivity', meaningHu: 'elkezdődik',
    note: 'Intranzitív (Tárgyatlan). Párja a 始める (hajimeru).',
    example: { jp: '映画が始まります。', romaji: 'eiga ga hajimarimasu.', hu: 'Elkezdődik a film.' }
  },

  // ── Fizikai változások (Törés, Ejtés, Javítás) ──
  {
    id: 'kowasu', kanji: '壊す', kana: 'こわす', romaji: 'kowasu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'こわ', stemRomaji: 'kowa',
    level: 'N4', theme: 'transitivity', meaningHu: 'eltör / tönkretesz',
    note: 'Tranzitív (Tárgyas).',
    example: { jp: '時計を壊しました。', romaji: 'tokei wo kowashimashita.', hu: 'Tönkretettem az órát.' }
  },
  {
    id: 'kowareru', kanji: '壊れる', kana: 'こわれる', romaji: 'kowareru',
    group: 'ichidan',
    stemKana: 'こわれ', stemRomaji: 'koware',
    level: 'N4', theme: 'transitivity', meaningHu: 'eltörik / elromlik',
    note: 'Intranzitív (Tárgyatlan). Párja a 壊す (kowasu).',
    example: { jp: 'このパソコンは壊れています。', romaji: 'kono pasokon wa kowarete imasu.', hu: 'Ez a gép el van romolva.' }
  },
  {
    id: 'otosu', kanji: '落とす', kana: 'おとす', romaji: 'otosu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'おと', stemRomaji: 'oto',
    level: 'N4', theme: 'transitivity', meaningHu: 'leejt / elveszít',
    note: 'Tranzitív (Tárgyas).',
    example: { jp: '財布を落としました。', romaji: 'saifu wo otoshimashita.', hu: 'Leejtettem (elveszítettem) a pénztárcámat.' }
  },
  {
    id: 'ochiru', kanji: '落ちる', kana: 'おちる', romaji: 'ochiru',
    group: 'ichidan',
    stemKana: 'おち', stemRomaji: 'ochi',
    level: 'N4', theme: 'transitivity', meaningHu: 'leesik / hullik / megbukik (vizsgán)',
    note: 'Intranzitív (Tárgyatlan). Párja a 落とす (otosu).',
    example: { jp: '木から葉が落ちます。', romaji: 'ki kara ha ga ochimasu.', hu: 'Lehull a falevél a fáról.' }
  },
  {
    id: 'naosu', kanji: '直す', kana: 'なおす', romaji: 'naosu',
    group: 'godan', godanFamily: 'su',
    stemKana: 'なお', stemRomaji: 'nao',
    level: 'N5', theme: 'transitivity', meaningHu: 'megjavít / kijavít',
    note: 'Tranzitív (Tárgyas). (A 治す kanjival: meggyógyít vkit).',
    example: { jp: '自転車を直します。', romaji: 'jitensha wo naoshimasu.', hu: 'Megjavítom a biciklit.' }
  },
  {
    id: 'naoru', kanji: '直る', kana: 'なおる', romaji: 'naoru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'なお', stemRomaji: 'nao',
    level: 'N5', theme: 'transitivity', meaningHu: 'megjavul / meggyógyul',
    note: 'Intranzitív (Tárgyatlan). Párja a 直す (naosu).',
    example: { jp: 'パソコンが直りました。', romaji: 'pasokon ga naorimashita.', hu: 'Megjavult a számítógép.' }
  },

  // ── Keresés és Döntés ──
  {
    id: 'mitsukeru', kanji: '見つける', kana: 'みつける', romaji: 'mitsukeru',
    group: 'ichidan',
    stemKana: 'みつけ', stemRomaji: 'mitsuke',
    level: 'N4', theme: 'transitivity', meaningHu: 'megtalál (vmit keresve)',
    note: 'Tranzitív (Tárgyas).',
    example: { jp: 'いい仕事を見つけました。', romaji: 'ii shigoto wo mitsukemashita.', hu: 'Megtaláltam egy jó munkát.' }
  },
  {
    id: 'mitsukaru', kanji: '見つかる', kana: 'みつかる', romaji: 'mitsukaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'みつか', stemRomaji: 'mitsuka',
    level: 'N4', theme: 'transitivity', meaningHu: 'megkerül / rátalálnak',
    note: 'Intranzitív (Tárgyatlan). Párja a 見つける (mitsukeru).',
    example: { jp: '鍵が見つかりました！', romaji: 'kagi ga mitsukarimashita!', hu: 'Megkerült a kulcs!' }
  },
  {
    id: 'kimeru', kanji: '決める', kana: 'きめる', romaji: 'kimeru',
    group: 'ichidan',
    stemKana: 'きめ', stemRomaji: 'kime',
    level: 'N4', theme: 'transitivity', meaningHu: 'eldönt (vmit)',
    note: 'Tranzitív (Tárgyas).',
    example: { jp: '旅行の日を決めました。', romaji: 'ryokou no hi wo kimemashita.', hu: 'Eldöntöttem az utazás napját.' }
  },
  {
    id: 'kimaru', kanji: '決まる', kana: 'きまる', romaji: 'kimaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'きま', stemRomaji: 'kima',
    level: 'N4', theme: 'transitivity', meaningHu: 'eldől / el van döntve',
    note: 'Intranzitív (Tárgyatlan). Párja a 決める (kimeru).',
    example: { jp: '予定が決まりました。', romaji: 'yotei ga kimarimashita.', hu: 'A terv (program) eldőlt.' }
  },
// ════════════════════════════════════════════════════
  //  3. KATEGÓRIA: Adás-Kapás (Yari-Morai igék - N5 & N4)
  //  (100% lefedettség a már meglévő 'ageru' igével együtt)
  // ════════════════════════════════════════════════════

  {
    id: 'morau', kanji: '貰う', kana: 'もらう', romaji: 'morau',
    group: 'godan', godanFamily: 'u',
    stemKana: 'もら', stemRomaji: 'mora',
    level: 'N5', theme: 'giving', meaningHu: 'kap (valakitől)',
    note: 'Partikula: akitől kapom, az に (ni) vagy から (kara).',
    example: { jp: '友達にプレゼントを貰います。', romaji: 'tomodachi ni purezento wo moraimasu.', hu: 'Ajándékot kapok a barátomtól.' }
  },
  {
    id: 'kureru', kanji: 'くれる', kana: 'くれる', romaji: 'kureru',
    group: 'ichidan',
    stemKana: 'くれ', stemRomaji: 'kure',
    level: 'N5', theme: 'giving', meaningHu: 'ad (nekem vagy a belső körömnek)',
    note: 'Csak akkor használjuk, ha a beszélő (vagy a családja) a kedvezményezett!',
    example: { jp: '母が時計をくれます。', romaji: 'haha ga tokei wo kuremasu.', hu: 'Anyukám ad nekem egy órát.' }
  },
  {
    id: 'yaru', kanji: 'やる', kana: 'やる', romaji: 'yaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'や', stemRomaji: 'ya',
    level: 'N5', theme: 'giving', meaningHu: 'ad (állatnak, növénynek, kisebbnek) / csinál',
    example: { jp: '犬にえさをやります。', romaji: 'inu ni esa wo yarimasu.', hu: 'Enni adok a kutyának.' }
  },
  {
    id: 'itadaku', kanji: '頂く', kana: 'いただく', romaji: 'itadaku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'いただ', stemRomaji: 'itada',
    level: 'N4', theme: 'giving', meaningHu: 'kap (alázatos forma)',
    note: 'A もらう (morau) tiszteletteljes/alázatos verziója (pl. főnöktől kap). Étkezés előtt is ezt mondják (Itadakimasu).',
    example: { jp: '先生から本を頂きます。', romaji: 'sensei kara hon wo itadakimasu.', hu: 'Könyvet kapok a tanár úrtól.' }
  },
  {
    id: 'kudasaru', kanji: '下さる', kana: 'くださる', romaji: 'kudasaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'くださ', stemRomaji: 'kudasa',
    level: 'N4', theme: 'giving', meaningHu: 'ad nekem (tiszteletteljes forma)',
    note: 'A くれる (kureru) tiszteletteljes verziója. KIVÉTELES ragozás: a Masu-forma くださいます (kudasaimasu), nem kudasari-masu!',
    example: { jp: '先生が辞書を下さいました。', romaji: 'sensei ga jisho wo kudasaimashita.', hu: 'A tanár úr adott nekem egy szótárat.' }
  },
// ════════════════════════════════════════════════════
  //  4. KATEGÓRIA: Közlekedés, Testtartás és Helyváltoztatás (N5 & N4)
  //  (100% lefedettség a már meglévő noru, magaru, tomaru, aruku, tatsu igékkel együtt)
  // ════════════════════════════════════════════════════

  {
    id: 'oriru', kanji: '降りる', kana: 'おりる', romaji: 'oriru',
    group: 'ichidan',
    stemKana: 'おり', stemRomaji: 'ori',
    level: 'N5', theme: 'movement', meaningHu: 'leszáll (járműről) / leereszkedik',
    note: 'Ichidan ige! Vonzat: ahonnan leszáll, az を (wo). (Pl. バスを降りる)',
    example: { jp: '電車を降ります。', romaji: 'densha wo orimasu.', hu: 'Leszállok a vonatról.' }
  },
  {
    id: 'suwaru', kanji: '座る', kana: 'すわる', romaji: 'suwaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'すわ', stemRomaji: 'suwa',
    level: 'N5', theme: 'movement', meaningHu: 'leül',
    note: 'Vonzat: ahova leül, az に (ni).',
    example: { jp: '椅子に座ります。', romaji: 'isu ni suwarimasu.', hu: 'Leülök a székre.' }
  },
  {
    id: 'wataru', kanji: '渡る', kana: 'わたる', romaji: 'wataru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'わた', stemRomaji: 'wata',
    level: 'N5', theme: 'movement', meaningHu: 'átkel (úton, hídon)',
    note: 'Vonzat: amin átkel, az を (wo).',
    example: { jp: '道を渡ります。', romaji: 'michi wo watarimasu.', hu: 'Átkelek az úton.' }
  },
  {
    id: 'noboru', kanji: '登る', kana: 'のぼる', romaji: 'noboru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'のぼ', stemRomaji: 'nobo',
    level: 'N5', theme: 'movement', meaningHu: 'megmászik (hegyet, lépcsőt)',
    note: 'Vonzat: amit megmászik, az に (ni) vagy を (wo) is lehet, de hegymászásnál leggyakrabban に.',
    example: { jp: '山に登ります。', romaji: 'yama ni noborimasu.', hu: 'Hegyet mászok.' }
  },
  {
    id: 'mawaru', kanji: '回る', kana: 'まわる', romaji: 'mawaru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'まわ', stemRomaji: 'mawa',
    level: 'N5', theme: 'movement', meaningHu: 'forog / körbejár / elintéz (több helyet)',
    example: { jp: '地球は回ります。', romaji: 'chikyuu wa mawarimasu.', hu: 'A Föld forog.' }
  },
  {
    id: 'korobu', kanji: '転ぶ', kana: 'ころぶ', romaji: 'korobu',
    group: 'godan', godanFamily: 'bu',
    stemKana: 'ころ', stemRomaji: 'koro',
    level: 'N4', theme: 'movement', meaningHu: 'elesik / megbotlik',
    example: { jp: '道で転びました。', romaji: 'michi de korobimashita.', hu: 'Elestem az úton.' }
  },
  {
    id: 'suberu', kanji: '滑る', kana: 'すべる', romaji: 'suberu',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'すべ', stemRomaji: 'sube',
    pseudoIchidan: true,
    level: 'N4', theme: 'movement', meaningHu: 'megcsúszik / csúszik',
    note: 'Ál-Ichidan csapda ige! -eru végű, de godan ragozású (滑ります).',
    example: { jp: '雪で滑りました。', romaji: 'yuki de suberimashita.', hu: 'Megcsúsztam a havon.' }
  },
// ════════════════════════════════════════════════════
  //  5. KATEGÓRIA: Időjárás és Természeti jelenségek (N5)
  //  (100% lefedettség az alapvető N5 időjárási igékre)
  // ════════════════════════════════════════════════════

  {
    id: 'furu', kanji: '降る', kana: 'ふる', romaji: 'furu',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'ふ', stemRomaji: 'fu',
    level: 'N5', theme: 'weather', meaningHu: 'esik (eső, hó)',
    note: 'Vonzat: ami esik, az が (ga). Pl. 雨が降る (esik az eső).',
    example: { jp: '雨が降ります。', romaji: 'ame ga furimasu.', hu: 'Esik az eső.' }
  },
  {
    id: 'hareru', kanji: '晴れる', kana: 'はれる', romaji: 'hareru',
    group: 'ichidan',
    stemKana: 'はれ', stemRomaji: 'hare',
    level: 'N5', theme: 'weather', meaningHu: 'kiderül (az ég), napos idő lesz',
    note: 'Ichidan ige! Gyakran használják múlt időben (晴れました) vagy állapotként (晴れています).',
    example: { jp: '今日は晴れています。', romaji: 'kyou wa harete imasu.', hu: 'Ma tiszta/napos idő van.' }
  },
  {
    id: 'fuku', kanji: '吹く', kana: 'ふく', romaji: 'fuku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'ふ', stemRomaji: 'fu',
    level: 'N5', theme: 'weather', meaningHu: 'fúj (szél)',
    note: 'Vonzat: ami fúj, az が (ga). Pl. 風が吹く (fúj a szél).',
    example: { jp: '強い風が吹きます。', romaji: 'tsuyoi kaze ga fukimasu.', hu: 'Erős szél fúj.' }
  },
  {
    id: 'saku', kanji: '咲く', kana: 'さく', romaji: 'saku',
    group: 'godan', godanFamily: 'ku',
    stemKana: 'さ', stemRomaji: 'sa',
    level: 'N5', theme: 'weather', meaningHu: 'virágzik / kinyílik (virág)',
    note: 'Vonzat: ami virágzik, az が (ga).',
    example: { jp: '桜が咲きます。', romaji: 'sakura ga sakimasu.', hu: 'Virágzik a cseresznyefa.' }
  },
// ════════════════════════════════════════════════════
  //  6. KATEGÓRIA: Állapotváltozás, Képesség és Érzékelés (N5 & N4)
  //  (100% lefedettség, az adatbázis lezárása)
  // ════════════════════════════════════════════════════

  {
    id: 'naru', kanji: '成る', kana: 'なる', romaji: 'naru',
    group: 'godan', godanFamily: 'ru',
    stemKana: 'な', stemRomaji: 'na',
    level: 'N5', theme: 'state', meaningHu: 'válik valamivé',
    note: 'Nagyon fontos! Főnév/na-melléknév után: になる (ni naru), i-melléknév után: 〜くなる (~ku naru). A kanjit ritkán írják ki, többnyire csak hiraganával szerepel.',
    example: { jp: '先生になります。', romaji: 'sensei ni narimasu.', hu: 'Tanárrá válok (Tanár leszek).' }
  },
  {
    id: 'tsukareru', kanji: '疲れる', kana: 'つかれる', romaji: 'tsukareru',
    group: 'ichidan',
    stemKana: 'つかれ', stemRomaji: 'tsukare',
    level: 'N5', theme: 'state', meaningHu: 'elfárad',
    note: 'Általában múlt időben (疲れた / 疲れました) vagy folyamatos/állapot alakban (疲れています) használjuk.',
    example: { jp: '仕事で疲れました。', romaji: 'shigoto de tsukaremashita.', hu: 'Elfáradtam a munkában.' }
  },
  {
    id: 'mieru', kanji: '見える', kana: 'みえる', romaji: 'mieru',
    group: 'ichidan',
    stemKana: 'みえ', stemRomaji: 'mie',
    level: 'N4', theme: 'state', meaningHu: 'látszik / látható',
    note: 'Intranzitív! Azt fejezi ki, hogy valami spontán a látóteredbe kerül (ellentétben a 見られる - mirareru formával, ami a szándékos képességet jelenti). Vonzat: が.',
    example: { jp: 'ここから海が見えます。', romaji: 'koko kara umi ga miemasu.', hu: 'Innen látszik a tenger.' }
  },
  {
    id: 'kikoeru', kanji: '聞こえる', kana: 'きこえる', romaji: 'kikoeru',
    group: 'ichidan',
    stemKana: 'きこえ', stemRomaji: 'kikoe',
    level: 'N4', theme: 'state', meaningHu: 'hallatszik / hallható',
    note: 'Intranzitív! A spontán hallható hangokra utal. Vonzat: が.',
    example: { jp: '鳥の声が聞こえます。', romaji: 'tori no koe ga kikoemasu.', hu: 'Hallatszik a madarak hangja.' }
  }
];