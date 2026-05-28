/* ====================================================
   NIHONCORE — adjectives.js (Melléknév modul)
   ----------------------------------------------------
   NIHONCORE_I_ADJECTIVES    — i-melléknevek (い-végű)
   NIHONCORE_NA_ADJECTIVES   — na-melléknevek (な-val főnév előtt)
   Form-szabályok és error-kódok: core.js (ADJ_FORM_RULES, ADJ_FORM_GROUPS).
   Engine: initAdjectivesPage az app.js-ben.
   Kivétel: いい → canonicalStemKana/Romaji-vel kódolva.
   ==================================================== */
const NIHONCORE_I_ADJECTIVES = [

  // ── 1. Méret és Tér (Size & Space) ───────────────
  {
    id: 'ookii', kanji: '大きい', kana: 'おおきい', romaji: 'ookii',
    type: 'i-adj', level: 'N5',
    meaningHu: 'nagy',
    stemKana: 'おおき', stemRomaji: 'ooki',
    example: { jp: '大きい家です。', romaji: 'ookii ie desu.', hu: 'Egy nagy ház.' }
  },
  {
    id: 'chiisai', kanji: '小さい', kana: 'ちいさい', romaji: 'chiisai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'kicsi',
    stemKana: 'ちいさ', stemRomaji: 'chiisa',
    example: { jp: '小さい犬です。', romaji: 'chiisai inu desu.', hu: 'Egy kis kutya.' }
  },
  {
    id: 'takai', kanji: '高い', kana: 'たかい', romaji: 'takai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'magas (térben) / drága (árban)',
    stemKana: 'たか', stemRomaji: 'taka',
    note: 'Kettős jelentés: magas ember/hegy, vagy drága termék.',
    example: { jp: '高い山です。', romaji: 'takai yama desu.', hu: 'Egy magas hegy.' }
  },
  {
    id: 'hikui', kanji: '低い', kana: 'ひくい', romaji: 'hikui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'alacsony',
    stemKana: 'ひく', stemRomaji: 'hiku',
    example: { jp: '背が低いです。', romaji: 'se ga hikui desu.', hu: 'Alacsony termetű (szó szerint: a háta alacsony).' }
  },
  {
    id: 'nagai', kanji: '長い', kana: 'ながい', romaji: 'nagai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'hosszú (térben és időben is)',
    stemKana: 'なが', stemRomaji: 'naga',
    example: { jp: '長い川です。', romaji: 'nagai kawa desu.', hu: 'Egy hosszú folyó.' }
  },
  {
    id: 'mijikai', kanji: '短い', kana: 'みじかい', romaji: 'mijikai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'rövid',
    stemKana: 'みじか', stemRomaji: 'mijika',
    example: { jp: '短い時間でした。', romaji: 'mijikai jikan deshita.', hu: 'Rövid idő volt.' }
  },
  {
    id: 'hiroi', kanji: '広い', kana: 'ひろい', romaji: 'hiroi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'tágas, széles',
    stemKana: 'ひろ', stemRomaji: 'hiro',
    example: { jp: '広い部屋ですね。', romaji: 'hiroi heya desu ne.', hu: 'Tágas szoba, ugye?' }
  },
  {
    id: 'semai', kanji: '狭い', kana: 'せまい', romaji: 'semai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'szűk, keskeny',
    stemKana: 'せま', stemRomaji: 'sema',
    example: { jp: 'この道は狭いです。', romaji: 'kono michi wa semai desu.', hu: 'Ez az út szűk.' }
  },
  {
    id: 'tooi', kanji: '遠い', kana: 'とおい', romaji: 'tooi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'messzi, távoli',
    stemKana: 'とお', stemRomaji: 'too',
    example: { jp: '駅は遠くないです。', romaji: 'eki wa tookunai desu.', hu: 'Az állomás nincs messze.' }
  },
  {
    id: 'chikai', kanji: '近い', kana: 'ちかい', romaji: 'chikai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'közeli, közel',
    stemKana: 'ちか', stemRomaji: 'chika',
    example: { jp: 'コンビニが近いです。', romaji: 'konbini ga chikai desu.', hu: 'A kényelmi bolt közel van.' }
  },

  // ── 2. Fizikai tulajdonságok (Súly, Vastagság, Forma) ──
  {
    id: 'omoi', kanji: '重い', kana: 'おもい', romaji: 'omoi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'nehéz (súly)',
    stemKana: 'おも', stemRomaji: 'omo',
    example: { jp: 'このカバンは重いです。', romaji: 'kono kaban wa omoi desu.', hu: 'Ez a táska nehéz.' }
  },
  {
    id: 'karui', kanji: '軽い', kana: 'かるい', romaji: 'karui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'könnyű (súly)',
    stemKana: 'かる', stemRomaji: 'karu',
    example: { jp: '軽いパソコンです。', romaji: 'karui pasokon desu.', hu: 'Könnyű (súlyú) számítógép.' }
  },
  {
    id: 'futoi', kanji: '太い', kana: 'ふとい', romaji: 'futoi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'vastag, kövér (hengeres dolgok, pl. faág, láb)',
    stemKana: 'ふと', stemRomaji: 'futo',
    example: { jp: '太いペンで書きます。', romaji: 'futoi pen de kakimasu.', hu: 'Vastag tollal írok.' }
  },
  {
    id: 'hosoi', kanji: '細い', kana: 'ほそい', romaji: 'hosoi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'vékony, karcsú (hengeres dolgok)',
    stemKana: 'ほそ', stemRomaji: 'hoso',
    example: { jp: '細い道です。', romaji: 'hosoi michi desu.', hu: 'Keskeny/vékony út.' }
  },
  {
    id: 'atsui_thick', kanji: '厚い', kana: 'あつい', romaji: 'atsui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'vastag (lapos dolgok, pl. könyv, fal)',
    stemKana: 'あつ', stemRomaji: 'atsu',
    note: 'Kiejtése megegyezik a "meleg" (暑い) szóval, de a kanji és a jelentés más!',
    example: { jp: '厚い本を読みます。', romaji: 'atsui hon wo yomimasu.', hu: 'Egy vastag könyvet olvasok.' }
  },
  {
    id: 'usui', kanji: '薄い', kana: 'うすい', romaji: 'usui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'vékony (lapos dolgok), híg (folyadék), halvány',
    stemKana: 'うす', stemRomaji: 'usu',
    example: { jp: 'コーヒーが薄いです。', romaji: 'koohii ga usui desu.', hu: 'A kávé híg/gyenge.' }
  },
  {
    id: 'marui', kanji: '丸い', kana: 'まるい', romaji: 'marui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'kerek, gömbölyű',
    stemKana: 'まる', stemRomaji: 'maru',
    example: { jp: '丸いテーブルです。', romaji: 'marui teeburu desu.', hu: 'Egy kerek asztal.' }
  },

  // ── 3. Idő, Kor és Sebesség (Time & Speed) ────────
  {
    id: 'atarashii', kanji: '新しい', kana: 'あたらしい', romaji: 'atarashii',
    type: 'i-adj', level: 'N5',
    meaningHu: 'új',
    stemKana: 'あたらし', stemRomaji: 'atarashi',
    example: { jp: '新しい本です。', romaji: 'atarashii hon desu.', hu: 'Egy új könyv.' }
  },
  {
    id: 'furui', kanji: '古い', kana: 'ふるい', romaji: 'furui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'régi',
    stemKana: 'ふる', stemRomaji: 'furu',
    example: { jp: '古い車です。', romaji: 'furui kuruma desu.', hu: 'Egy régi autó.' }
  },
  {
    id: 'hayai_speed', kanji: '速い', kana: 'はやい', romaji: 'hayai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'gyors (sebesség)',
    stemKana: 'はや', stemRomaji: 'haya',
    example: { jp: '新幹線は速いです。', romaji: 'shinkansen wa hayai desu.', hu: 'A Shinkansen gyors.' }
  },
  {
    id: 'hayai_time', kanji: '早い', kana: 'はやい', romaji: 'hayai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'korai (időben)',
    stemKana: 'はや', stemRomaji: 'haya',
    note: 'Kiejtés azonos, de a kanji más: 速い (sebesség) vs 早い (korai idő).',
    example: { jp: '朝、早いです。', romaji: 'asa, hayai desu.', hu: 'Reggel korán van.' }
  },
  {
    id: 'osoi', kanji: '遅い', kana: 'おそい', romaji: 'osoi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'lassú (sebesség), késői (idő)',
    stemKana: 'おそ', stemRomaji: 'oso',
    example: { jp: '電車が遅いです。', romaji: 'densha ga osoi desu.', hu: 'A vonat lassú/késik.' }
  },

  // ── 4. Minőség, Érték és Mennyiség ───────────────
  {
    id: 'ii', kanji: 'いい', kana: 'いい', romaji: 'ii',
    type: 'i-adj', level: 'N5',
    meaningHu: 'jó',
    stemKana: 'い', stemRomaji: 'i',
    canonicalStemKana: 'よ', canonicalStemRomaji: 'yo', // Ragozott formákhoz (yokunai, yokatta, stb.)
    exception: true,
    example: { jp: 'これはいいです。', romaji: 'kore wa ii desu.', hu: 'Ez jó.' }
  },
  {
    id: 'warui', kanji: '悪い', kana: 'わるい', romaji: 'warui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'rossz',
    stemKana: 'わる', stemRomaji: 'waru',
    example: { jp: '悪い天気です。', romaji: 'warui tenki desu.', hu: 'Rossz idő van.' }
  },
  {
    id: 'ooi', kanji: '多い', kana: 'おおい', romaji: 'ooi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'sok, számos',
    stemKana: 'おお', stemRomaji: 'oo',
    note: 'Általában nem áll közvetlenül főnév előtt, hanem állítmányként: 人が多いです (sok az ember).',
    example: { jp: '日本は山が多いです。', romaji: 'Nihon wa yama ga ooi desu.', hu: 'Japánban sok a hegy.' }
  },
  {
    id: 'sukunai', kanji: '少ない', kana: 'すくない', romaji: 'sukunai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'kevés',
    stemKana: 'すくな', stemRomaji: 'sukuna',
    example: { jp: '車が少ないです。', romaji: 'kuruma ga sukunai desu.', hu: 'Kevés az autó.' }
  },
  {
    id: 'tsuyoi', kanji: '強い', kana: 'つよい', romaji: 'tsuyoi',
    type: 'i-adj', level: 'N5',
    meaningHu: 'erős',
    stemKana: 'つよ', stemRomaji: 'tsuyo',
    example: { jp: '風が強いです。', romaji: 'kaze ga tsuyoi desu.', hu: 'A szél erős.' }
  },
  {
    id: 'yowai', kanji: '弱い', kana: 'よわい', romaji: 'yowai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'gyenge',
    stemKana: 'よわ', stemRomaji: 'yowa',
    example: { jp: 'お酒に弱いです。', romaji: 'osake ni yowai desu.', hu: 'Gyenge vagyok az alkoholhoz (nem bírom).' }
  },

  // ── 5. Fény, Hőmérséklet, Érzékelés és Íz ────────
  {
    id: 'akarui', kanji: '明るい', kana: 'あかるい', romaji: 'akarui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'világos (fény) / vidám (személyiség)',
    stemKana: 'あかる', stemRomaji: 'akaru',
    example: { jp: '明るい部屋です。', romaji: 'akarui heya desu.', hu: 'Világos szoba.' }
  },
  {
    id: 'kurai', kanji: '暗い', kana: 'くらい', romaji: 'kurai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'sötét',
    stemKana: 'くら', stemRomaji: 'kura',
    example: { jp: '外はもう暗いです。', romaji: 'soto wa mou kurai desu.', hu: 'Kint már sötét van.' }
  },
  {
    id: 'atsui_weather', kanji: '暑い', kana: 'あつい', romaji: 'atsui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'meleg, forró (időjárás, klíma)',
    stemKana: 'あつ', stemRomaji: 'atsu',
    note: 'Csak az időjárásra használjuk! (Ellentéte: 寒い / samui)',
    example: { jp: '今日は暑いです。', romaji: 'kyou wa atsui desu.', hu: 'Ma meleg van.' }
  },
  {
    id: 'samui', kanji: '寒い', kana: 'さむい', romaji: 'samui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'hideg (időjárás, klíma)',
    stemKana: 'さむ', stemRomaji: 'samu',
    note: 'Csak az időjárásra használjuk! (Ellentéte: 暑い / atsui)',
    example: { jp: '冬は寒いです。', romaji: 'fuyu wa samui desu.', hu: 'Télen hideg van.' }
  },
  {
    id: 'atsui_hot', kanji: '熱い', kana: 'あつい', romaji: 'atsui',
    type: 'i-adj', level: 'N5',
    meaningHu: 'forró (tárgy, ital, érzés)',
    stemKana: 'あつ', stemRomaji: 'atsu',
    note: 'Csak megérinthető dolgokra! (Ellentéte: 冷たい / tsumetai)',
    example: { jp: '熱いお茶を飲みます。', romaji: 'atsui ocha wo nomimasu.', hu: 'Forró teát iszom.' }
  },
  {
    id: 'tsumetai', kanji: '冷たい', kana: 'つめたい', romaji: 'tsumetai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'hideg (tárgy, ital, érintés)',
    stemKana: 'つめた', stemRomaji: 'tsumeta',
    note: 'Csak megérinthető dolgokra! (Ellentéte: 熱い / atsui_hot)',
    example: { jp: '冷たい水が欲しいです。', romaji: 'tsumetai mizu ga hoshii desu.', hu: 'Hideg vizet szeretnék.' }
  },
  {
    id: 'atatakai', kanji: '暖かい', kana: 'あたたかい', romaji: 'atatakai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'meleg, kellemesen meleg (időjárás / tárgy)',
    stemKana: 'あたたか', stemRomaji: 'atataka',
    example: { jp: '春は暖かいです。', romaji: 'haru wa atatakai desu.', hu: 'A tavasz (kellemesen) meleg.' }
  },
  {
    id: 'suzushii', kanji: '涼しい', kana: 'すずしい', romaji: 'suzushii',
    type: 'i-adj', level: 'N5',
    meaningHu: 'hűvös, kellemesen friss (időjárás)',
    stemKana: 'すずし', stemRomaji: 'suzushi',
    example: { jp: '今日は涼しいですね。', romaji: 'kyou wa suzushii desu ne.', hu: 'Ma hűvös/kellemes idő van, ugye?' }
  },
  {
    id: 'kitanai', kanji: '汚い', kana: 'きたない', romaji: 'kitanai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'piszkos, koszos',
    stemKana: 'きたな', stemRomaji: 'kitana',
    example: { jp: '手が汚いです。', romaji: 'te ga kitanai desu.', hu: 'Piszkos a kezem.' }
  },
  {
    id: 'amai', kanji: '甘い', kana: 'あまい', romaji: 'amai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'édes',
    stemKana: 'あま', stemRomaji: 'ama',
    example: { jp: 'このケーキは甘いです。', romaji: 'kono keeki wa amai desu.', hu: 'Ez a torta édes.' }
  },
  {
    id: 'karai', kanji: '辛い', kana: 'からい', romaji: 'karai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'csípős, fűszeres',
    stemKana: 'から', stemRomaji: 'kara',
    example: { jp: 'カレーは辛いです。', romaji: 'karee wa karai desu.', hu: 'A curry csípős.' }
  },
  {
    id: 'itai', kanji: '痛い', kana: 'いたい', romaji: 'itai',
    type: 'i-adj', level: 'N5',
    meaningHu: 'fájdalmas, fáj',
    stemKana: 'いた', stemRomaji: 'ita',
    example: { jp: '頭が痛いです。', romaji: 'atama ga itai desu.', hu: 'Fáj a fejem.' }
  },
// ════════════════════════════════════════════════════
  //  N4 — Belső érzések, Értékelés, Finomabb tulajdonságok (30 db)
  // ════════════════════════════════════════════════════

  // ── 1. Érzelmek és belső állapotok ────────────────
  {
    id: 'ureshii', kanji: '嬉しい', kana: 'うれしい', romaji: 'ureshii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'boldog, örömteli (egy adott dolog miatt)',
    stemKana: 'うれし', stemRomaji: 'ureshi',
    example: { jp: 'プレゼントをもらって嬉しいです。', romaji: 'purezento wo moratte ureshii desu.', hu: 'Örülök, hogy ajándékot kaptam.' }
  },
  {
    id: 'kanashii', kanji: '悲しい', kana: 'かなしい', romaji: 'kanashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szomorú',
    stemKana: 'かなし', stemRomaji: 'kanashi',
    example: { jp: '悲しい映画を見ました。', romaji: 'kanashii eiga wo mimashita.', hu: 'Egy szomorú filmet láttam.' }
  },
  {
    id: 'sabishii', kanji: '寂しい', kana: 'さびしい', romaji: 'sabishii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'magányos',
    stemKana: 'さびし', stemRomaji: 'sabishi',
    example: { jp: '一人で寂しいです。', romaji: 'hitori de sabishii desu.', hu: 'Egyedül vagyok és magányos.' }
  },
  {
    id: 'kowai', kanji: '怖い', kana: 'こわい', romaji: 'kowai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'félelmetes, ijesztő / fél vmitől',
    stemKana: 'こわ', stemRomaji: 'kowa',
    example: { jp: 'お化けが怖いです。', romaji: 'obake ga kowai desu.', hu: 'Félek a szellemektől.' }
  },
  {
    id: 'hazukashii', kanji: '恥ずかしい', kana: 'はずかしい', romaji: 'hazukashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szégyenlős, ciki, kínos',
    stemKana: 'はずかし', stemRomaji: 'hazukashi',
    example: { jp: 'みんなの前で話すのは恥ずかしいです。', romaji: 'minna no mae de hanasu no wa hazukashii desu.', hu: 'Mindenki előtt beszélni kínos/ciki.' }
  },
  {
    id: 'nemui', kanji: '眠い', kana: 'ねむい', romaji: 'nemui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'álmos',
    stemKana: 'ねむ', stemRomaji: 'nemu',
    example: { jp: '昨日はあまり寝ていないので、眠いです。', romaji: 'kinou wa amari nete inai node, nemui desu.', hu: 'Tegnap nem sokat aludtam, ezért álmos vagyok.' }
  },
  {
    id: 'kurushii', kanji: '苦しい', kana: 'くるしい', romaji: 'kurushii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'fájdalmas (lelkileg/fizikailag), gyötrelmes',
    stemKana: 'くるし', stemRomaji: 'kurushi',
    example: { jp: '息が苦しいです。', romaji: 'iki ga kurushii desu.', hu: 'Nehéz/fájdalmas a légzés.' }
  },

  // ── 2. Értékelés, Személyiség és Helyzetek ────────
  {
    id: 'muzukashii', kanji: '難しい', kana: 'むずかしい', romaji: 'muzukashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'nehéz (feladat), bonyolult',
    stemKana: 'むずかし', stemRomaji: 'muzukashi',
    note: 'Udvarias visszautasításként is használják ("Hát ez nehéz lesz...").',
    example: { jp: '日本語は難しいですが、面白いです。', romaji: 'nihongo wa muzukashii desu ga, omoshiroi desu.', hu: 'A japán nyelv nehéz, de érdekes.' }
  },
  {
    id: 'yasashii', kanji: '優しい', kana: 'やさしい', romaji: 'yasashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'kedves, gyengéd / könnyű (feladat)',
    stemKana: 'やさし', stemRomaji: 'yasashi',
    note: 'Kettős jelentés: kedves ember (優しい人) vagy könnyű vizsga (易しい試験 - más kanji, de azonos kiejtés).',
    example: { jp: '彼はとても優しい人です。', romaji: 'kare wa totemo yasashii hito desu.', hu: 'Ő egy nagyon kedves ember.' }
  },
  {
    id: 'tanoshii', kanji: '楽しい', kana: 'たのしい', romaji: 'tanoshii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szórakoztató, élvezetes',
    stemKana: 'たのし', stemRomaji: 'tanoshi',
    example: { jp: '旅行はとても楽しかったです。', romaji: 'ryokou wa totemo tanoshikatta desu.', hu: 'Az utazás nagyon élvezetes volt.' }
  },
  {
    id: 'kibishii', kanji: '厳しい', kana: 'きびしい', romaji: 'kibishii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szigorú, kemény',
    stemKana: 'きびし', stemRomaji: 'kibishi',
    example: { jp: '先生は厳しいです。', romaji: 'sensei wa kibishii desu.', hu: 'A tanár szigorú.' }
  },
  {
    id: 'tadashii', kanji: '正しい', kana: 'ただしい', romaji: 'tadashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'helyes, igaz',
    stemKana: 'ただし', stemRomaji: 'tadashi',
    example: { jp: '正しい答えを選んでください。', romaji: 'tadashii kotae wo erande kudasai.', hu: 'Kérem, válassza ki a helyes választ.' }
  },
  {
    id: 'subarashii', kanji: '素晴らしい', kana: 'すばらしい', romaji: 'subarashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'csodálatos, nagyszerű',
    stemKana: 'すばらし', stemRomaji: 'subarashi',
    example: { jp: '素晴らしい景色ですね。', romaji: 'subarashii keshiki desu ne.', hu: 'Csodálatos kilátás, ugye?' }
  },
  {
    id: 'hidoi', kanji: 'ひどい', kana: 'ひどい', romaji: 'hidoi',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szörnyű, borzalmas, kegyetlen',
    stemKana: 'ひど', stemRomaji: 'hido',
    example: { jp: 'ひどい雨ですね。', romaji: 'hidoi ame desu ne.', hu: 'Szörnyű (heves) eső van, ugye?' }
  },
  {
    id: 'sugoi', kanji: 'すごい', kana: 'すごい', romaji: 'sugoi',
    type: 'i-adj', level: 'N4',
    meaningHu: 'lenyűgöző, eszméletlen, "hűha"',
    stemKana: 'すご', stemRomaji: 'sugo',
    example: { jp: 'その車はすごいですね。', romaji: 'sono kuruma wa sugoi desu ne.', hu: 'Az az autó eszméletlen, nem?' }
  },

  // ── 3. Ízek és Tapasztalatok ──────────────────────
  {
    id: 'oishii', kanji: '美味しい', kana: 'おいしい', romaji: 'oishii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'finom, ízletes',
    stemKana: 'おいし', stemRomaji: 'oishi',
    example: { jp: 'このお寿司は本当に美味しいです。', romaji: 'kono osushi wa hontou ni oishii desu.', hu: 'Ez a sushi igazán finom.' }
  },
  {
    id: 'mazui', kanji: 'まずい', kana: 'まずい', romaji: 'mazui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'rossz ízű, ehetetlen / gáz (helyzet)',
    stemKana: 'まず', stemRomaji: 'mazu',
    example: { jp: 'この料理はまずいです。', romaji: 'kono ryouri wa mazui desu.', hu: 'Ez az étel rossz ízű.' }
  },
  {
    id: 'nigai', kanji: '苦い', kana: 'にがい', romaji: 'nigai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'keserű',
    stemKana: 'にが', stemRomaji: 'niga',
    note: 'Vigyázz! A kanji ugyanaz, mint a kurushii (苦しい), de a jelentés és kiejtés más.',
    example: { jp: 'コーヒーは苦いです。', romaji: 'koohii wa nigai desu.', hu: 'A kávé keserű.' }
  },
  {
    id: 'suppai', kanji: '酸っぱい', kana: 'すっぱい', romaji: 'suppai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'savanyú',
    stemKana: 'すっぱ', stemRomaji: 'suppa',
    example: { jp: 'レモンは酸っぱいです。', romaji: 'remon wa suppai desu.', hu: 'A citrom savanyú.' }
  },
  {
    id: 'koi', kanji: '濃い', kana: 'こい', romaji: 'koi',
    type: 'i-adj', level: 'N4',
    meaningHu: 'sűrű, erős (íz, kávé, szín)',
    stemKana: 'こ', stemRomaji: 'ko',
    example: { jp: '濃いお茶が好きです。', romaji: 'koi ocha ga suki desu.', hu: 'Az erős teát szeretem.' }
  },
  {
    id: 'nurui', kanji: 'ぬるい', kana: 'ぬるい', romaji: 'nurui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'langyos (negatív értelemben, ha vminek melegnek kéne lennie)',
    stemKana: 'ぬる', stemRomaji: 'nuru',
    example: { jp: 'お風呂がぬるいです。', romaji: 'ofuro ga nurui desu.', hu: 'A fürdővíz langyos.' }
  },
  {
    id: 'urusai', kanji: 'うるさい', kana: 'うるさい', romaji: 'urusai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'zajos, hangos, idegesítő',
    stemKana: 'うるさ', stemRomaji: 'urusa',
    note: 'Gyakran használják rászólásként ("Csend legyen!").',
    example: { jp: '隣の部屋がうるさいです。', romaji: 'tonari no heya ga urusai desu.', hu: 'A szomszéd szoba zajos.' }
  },

  // ── 4. Absztraktabb fizikai jellemzők ────────────
  {
    id: 'fukai', kanji: '深い', kana: 'ふかい', romaji: 'fukai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'mély',
    stemKana: 'ふか', stemRomaji: 'fuka',
    example: { jp: '深い海で泳ぎます。', romaji: 'fukai umi de oyogimasu.', hu: 'A mély tengerben úszom.' }
  },
  {
    id: 'asai', kanji: '浅い', kana: 'あさい', romaji: 'asai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'sekély',
    stemKana: 'あさ', stemRomaji: 'asa',
    example: { jp: 'この川は浅いです。', romaji: 'kono kawa wa asai desu.', hu: 'Ez a folyó sekély.' }
  },
  {
    id: 'katai', kanji: '固い', kana: 'かたい', romaji: 'katai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'kemény',
    stemKana: 'かた', stemRomaji: 'kata',
    example: { jp: 'このパンは固いです。', romaji: 'kono pan wa katai desu.', hu: 'Ez a kenyér kemény.' }
  },
  {
    id: 'yawarakai', kanji: '柔らかい', kana: 'やわらかい', romaji: 'yawarakai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'puha',
    stemKana: 'やわらか', stemRomaji: 'yawaraka',
    example: { jp: '柔らかいベッドで寝ます。', romaji: 'yawarakai beddo de nemasu.', hu: 'Puha ágyban alszom.' }
  },
  {
    id: 'komakai', kanji: '細かい', kana: 'こまかい', romaji: 'komakai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'apró, finom (pl. aprópénz is), részletes',
    stemKana: 'こまか', stemRomaji: 'komaka',
    example: { jp: '細かいお金がありますか。', romaji: 'komakai okane ga arimasu ka.', hu: 'Van aprópénze?' }
  },
  {
    id: 'kuwashii', kanji: '詳しい', kana: 'くわしい', romaji: 'kuwashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'részletes, jól tájékozott (vmiről)',
    stemKana: 'くわし', stemRomaji: 'kuwashi',
    example: { jp: '彼は日本について詳しいです。', romaji: 'kare wa Nihon ni tsuite kuwashii desu.', hu: 'Jól ismeri Japánt (tájékozott róla).' }
  },
  {
    id: 'mezurashii', kanji: '珍しい', kana: 'めずらしい', romaji: 'mezurashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'ritka, szokatlan',
    stemKana: 'めずらし', stemRomaji: 'mezurashi',
    example: { jp: 'これは珍しい花です。', romaji: 'kore wa mezurashii hana desu.', hu: 'Ez egy ritka virág.' }
  },
  {
    id: 'okashii', kanji: 'おかしい', kana: 'おかしい', romaji: 'okashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'furcsa, vicces, nevetséges',
    stemKana: 'おかし', stemRomaji: 'okashi',
    example: { jp: 'あの人の話はおかしいです。', romaji: 'ano hito no hanashi wa okashii desu.', hu: 'Annak az embernek a története vicces/furcsa.' }
  },
// ── 5. N4 Maradék (Teljes lezárás) ────────────────
  {
    id: 'hoshii', kanji: '欲しい', kana: 'ほしい', romaji: 'hoshii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'akar vmit, vágyik vmire',
    stemKana: 'ほし', stemRomaji: 'hoshi',
    note: 'Japánban a "kívánni" nem ige, hanem i-melléknév! Használata: [Tárgy]が欲しいです。',
    example: { jp: '新しいパソコンが欲しいです。', romaji: 'atarashii pasokon ga hoshii desu.', hu: 'Egy új számítógépet akarok.' }
  },
  {
    id: 'kakkoii', kanji: 'かっこいい', kana: 'かっこいい', romaji: 'kakkoii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'menő, jóképű, stílusos',
    stemKana: 'かっこい', stemRomaji: 'kakkoi',
    canonicalStemKana: 'かっこよ', canonicalStemRomaji: 'kakkoyo', // Ragozáshoz: kakkoyokunai, kakkoyokatta
    exception: true,
    note: 'Az いい (jó) szóból származik, ezért a ragozása is kivételes (かっこよくない).',
    example: { jp: 'あの車はかっこいいですね。', romaji: 'ano kuruma wa kakkoii desu ne.', hu: 'Az az autó nagyon menő, igaz?' }
  },
  {
    id: 'kusai', kanji: '臭い', kana: 'くさい', romaji: 'kusai',
    type: 'i-adj', level: 'N4',
    meaningHu: 'büdös, kellemetlen szagú',
    stemKana: 'くさ', stemRomaji: 'kusa',
    example: { jp: 'このゴミは臭いです。', romaji: 'kono gomi wa kusai desu.', hu: 'Ez a szemét büdös.' }
  },
  {
    id: 'shikakui', kanji: '四角い', kana: 'しかくい', romaji: 'shikakui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'szögletes, négyszögletű',
    stemKana: 'しかく', stemRomaji: 'shikaku',
    example: { jp: '四角いテーブルを買いました。', romaji: 'shikakui teeburu wo kaimashita.', hu: 'Vettem egy szögletes asztalt.' }
  },
  {
    id: 'otonashii', kanji: '大人しい', kana: 'おとなしい', romaji: 'otonashii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'csendes, nyugodt, engedelmes (személy vagy állat)',
    stemKana: 'おとなし', stemRomaji: 'otonashi',
    note: 'Nem a környezetre (arra a shizuka való), hanem a természetre/viselkedésre mondják.',
    example: { jp: 'この犬はとても大人しいです。', romaji: 'kono inu wa totemo otonashii desu.', hu: 'Ez a kutya nagyon nyugodt/engedelmes.' }
  },
  {
    id: 'zurui', kanji: 'ずるい', kana: 'ずるい', romaji: 'zurui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'ravasz, tisztességtelen, "ez nem ér"',
    stemKana: 'ずる', stemRomaji: 'zuru',
    example: { jp: '一人で食べるなんてずるいです！', romaji: 'hitori de taberu nante zurui desu!', hu: 'Egyedül megenni tisztességtelen (nem ér)!' }
  },
  {
    id: 'yurui', kanji: '緩い', kana: 'ゆるい', romaji: 'yurui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'laza (nem szoros), enyhe',
    stemKana: 'ゆる', stemRomaji: 'yuru',
    example: { jp: 'この靴は少し緩いです。', romaji: 'kono kutsu wa sukoshi yurui desu.', hu: 'Ez a cipő egy kicsit laza.' }
  },
  {
    id: 'kimochiii', kanji: '気持ちいい', kana: 'きもちいい', romaji: 'kimochiii',
    type: 'i-adj', level: 'N4',
    meaningHu: 'kellemes (testi érzés, pl. szellő, masszázs, ágy)',
    stemKana: 'きもちい', stemRomaji: 'kimochii',
    canonicalStemKana: 'きもちよ', canonicalStemRomaji: 'kimochiyo',
    exception: true,
    note: 'Szintén az いい-ből képzett szó, ragozása kivételes.',
    example: { jp: 'お風呂は気持ちいいです。', romaji: 'ofuro wa kimochiii desu.', hu: 'A fürdő(zés) nagyon kellemes.' }
  },
  {
    id: 'kimochiwarui', kanji: '気持ち悪い', kana: 'きもちわるい', romaji: 'kimochiwarui',
    type: 'i-adj', level: 'N4',
    meaningHu: 'kellemetlen érzés, undorító, rosszul van',
    stemKana: 'きもちわる', stemRomaji: 'kimochiwaru',
    note: 'Kétféleképpen használják: ha valami gusztustalan, vagy ha te érzed fizikailag rosszul magad (hányingered van).',
    example: { jp: '船に乗って気持ち悪くなりました。', romaji: 'fune ni notte kimochiwaruku narimashita.', hu: 'Hajóra szálltam és rosszul lettem (kavarog a gyomrom).' }
  },
// ════════════════════════════════════════════════════
  //  N3 — Komplex érzelmek, Személyiség és Elvont jellemzők (23 db)
  //  (Teljes N3 lefedettség)
  // ════════════════════════════════════════════════════

  // ── 1. Érzelmek és Erős reakciók ──────────────────
  {
    id: 'natsukashii', kanji: '懐かしい', kana: 'なつかしい', romaji: 'natsukashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'nosztalgikus, kedves (emlék), hiányzik (a múlt)',
    stemKana: 'なつかし', stemRomaji: 'natsukashi',
    example: { jp: '子供の頃の写真を見て、懐かしいです。', romaji: 'kodomo no koro no shashin wo mite, natsukashii desu.', hu: 'Gyerekkori képeket nézve nosztalgikus érzésem van.' }
  },
  {
    id: 'urayamashii', kanji: '羨ましい', kana: 'うらやましい', romaji: 'urayamashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'irigylésre méltó, irigy',
    stemKana: 'うらやまし', stemRomaji: 'urayamashi',
    example: { jp: 'あなたの新しい車が羨ましいです。', romaji: 'anata no atarashii kuruma ga urayamashii desu.', hu: 'Irigylem az új autódat.' }
  },
  {
    id: 'kuyashii', kanji: '悔しい', kana: 'くやしい', romaji: 'kuyashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'bosszantó, frusztráló (mert vmi nem sikerült)',
    stemKana: 'くやし', stemRomaji: 'kuyashi',
    example: { jp: '試合に負けて悔しいです。', romaji: 'shiai ni makete kuyashii desu.', hu: 'Bosszantó, hogy elvesztettük a meccset.' }
  },
  {
    id: 'oshii', kanji: '惜しい', kana: 'おしい', romaji: 'oshii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'sajnálatos, kár érte (mert majdnem sikerült)',
    stemKana: 'おし', stemRomaji: 'oshi',
    example: { jp: 'もう少しで合格だったのに、惜しいです。', romaji: 'mou sukoshi de goukaku datta noni, oshii desu.', hu: 'Még egy kicsi és átmentél volna, nagy kár érte!' }
  },
  {
    id: 'osoroshii', kanji: '恐ろしい', kana: 'おそろしい', romaji: 'osoroshii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'rémisztő, borzalmas',
    stemKana: 'おそろし', stemRomaji: 'osoroshi',
    example: { jp: '恐ろしい事件が起きました。', romaji: 'osoroshii jiken ga okimashita.', hu: 'Rémisztő incidens történt.' }
  },

  // ── 2. Személyiség és Viselkedés ──────────────────
  {
    id: 'erai', kanji: '偉い', kana: 'えらい', romaji: 'erai',
    type: 'i-adj', level: 'N3',
    meaningHu: 'nagyszerű, elismerésre méltó, fontos (személy)',
    stemKana: 'えら', stemRomaji: 'era',
    note: 'Gyakran használják dicséretként, vagy magas rangú emberekre.',
    example: { jp: '毎日勉強して、偉いですね。', romaji: 'mainichi benkyou shite, erai desu ne.', hu: 'Minden nap tanulsz, ez igazán dicséretes.' }
  },
  {
    id: 'kashikoi', kanji: '賢い', kana: 'かしこい', romaji: 'kashikoi',
    type: 'i-adj', level: 'N3',
    meaningHu: 'okos, bölcs',
    stemKana: 'かしこ', stemRomaji: 'kashiko',
    example: { jp: '彼女はとても賢い学生です。', romaji: 'kanojo wa totemo kashikoi gakusei desu.', hu: 'Ő egy nagyon okos diák.' }
  },
  {
    id: 'tanomoshii', kanji: '頼もしい', kana: 'たのもしい', romaji: 'tanomoshii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'megbízható, ígéretes',
    stemKana: 'たのもし', stemRomaji: 'tanomoshi',
    example: { jp: '彼は頼もしいリーダーです。', romaji: 'kare wa tanomoshii riidaa desu.', hu: 'Ő egy megbízható vezető.' }
  },
  {
    id: 'shitashii', kanji: '親しい', kana: 'したしい', romaji: 'shitashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'közeli, intim (kapcsolat)',
    stemKana: 'したし', stemRomaji: 'shitashi',
    example: { jp: '私には親しい友人がいます。', romaji: 'watashi ni wa shitashii yuujin ga imasu.', hu: 'Vannak közeli barátaim.' }
  },
  {
    id: 'shitsukoi', kanji: 'しつこい', kana: 'しつこい', romaji: 'shitsukoi',
    type: 'i-adj', level: 'N3',
    meaningHu: 'kitartó, makacs, tolakodó',
    stemKana: 'しつこ', stemRomaji: 'shitsuko',
    note: 'Negatív árnyalatú: valaki, aki nem hagyja békén a másikat.',
    example: { jp: 'あのセールスマンはしつこいです。', romaji: 'ano seerusuman wa shitsukoi desu.', hu: 'Az az ügynök nagyon tolakodó.' }
  },
  {
    id: 'darashinai', kanji: 'だらしない', kana: 'だらしない', romaji: 'darashinai',
    type: 'i-adj', level: 'N3',
    meaningHu: 'hanyag, rendetlen, fegyelmezetlen',
    stemKana: 'だらしな', stemRomaji: 'darashina',
    note: 'Bár a "nai" végződés tagadást sugall, ez maga a szótári alapforma. Ragozva: だらしなくない (darashinakunai).',
    example: { jp: 'だらしない格好をしないでください。', romaji: 'darashinai kakkou wo shinaide kudasai.', hu: 'Ne öltözz hanyagul.' }
  },

  // ── 3. Megjelenés és Helyzetek ────────────────────
  {
    id: 'ayashii', kanji: '怪しい', kana: 'あやしい', romaji: 'ayashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'gyanús, kétes',
    stemKana: 'あやし', stemRomaji: 'ayashi',
    example: { jp: 'あの男は怪しいです。', romaji: 'ano otoko wa ayashii desu.', hu: 'Az a férfi gyanús.' }
  },
  {
    id: 'tondemonai', kanji: 'とんでもない', kana: 'とんでもない', romaji: 'tondemonai',
    type: 'i-adj', level: 'N3',
    meaningHu: 'abszurd, képtelenség / szó sincs róla!',
    stemKana: 'とんでもな', stemRomaji: 'tondemona',
    note: 'Gyakran használják erős udvarias hárításként is ("Ó, szó sincs róla, dehogy!").',
    example: { jp: 'とんでもない間違いをしました。', romaji: 'tondemonai machigai wo shimashita.', hu: 'Abszurd (óriási) hibát vétettem.' }
  },
  {
    id: 'kawairashii', kanji: '可愛らしい', kana: 'かわいらしい', romaji: 'kawairashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'bájos, aranyos, szeretetre méltó',
    stemKana: 'かわいらし', stemRomaji: 'kawairashi',
    note: 'Az "aranyos" (可愛い - kawaii) formálisabb, finomabb változata.',
    example: { jp: '可愛らしい赤ちゃんですね。', romaji: 'kawairashii akachan desu ne.', hu: 'Milyen bájos kisbaba!' }
  },
  {
    id: 'wakawakashii', kanji: '若々しい', kana: 'わかわかしい', romaji: 'wakawakashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'fiatalos',
    stemKana: 'わかわかし', stemRomaji: 'wakawakashi',
    example: { jp: '祖母はいつも若々しいです。', romaji: 'sobo wa itsumo wakawakashii desu.', hu: 'A nagymamám mindig nagyon fiatalos.' }
  },
  {
    id: 'mazushii', kanji: '貧しい', kana: 'まずしい', romaji: 'mazushii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'szegény (anyagilag)',
    stemKana: 'まずし', stemRomaji: 'mazushi',
    example: { jp: '貧しい国を助けたいです。', romaji: 'mazushii kuni wo tasuketai desu.', hu: 'Segíteni akarok a szegény országokon.' }
  },
  {
    id: 'hitoshii', kanji: '等しい', kana: 'ひとしい', romaji: 'hitoshii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'egyenlő, megegyező',
    stemKana: 'ひとし', stemRomaji: 'hitoshi',
    example: { jp: '二つの力は等しいです。', romaji: 'futatsu no chikara wa hitoshii desu.', hu: 'A két erő egyenlő.' }
  },

  // ── 4. Kifinomultabb Fizikai Jellemzők és Érzékek ──
  {
    id: 'hageshii', kanji: '激しい', kana: 'はげしい', romaji: 'hageshii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'heves, intenzív, viharos',
    stemKana: 'はげし', stemRomaji: 'hageshi',
    example: { jp: '雨が激しいです。', romaji: 'ame ga hageshii desu.', hu: 'Az eső hevesen esik.' }
  },
  {
    id: 'surudoi', kanji: '鋭い', kana: 'するどい', romaji: 'surudoi',
    type: 'i-adj', level: 'N3',
    meaningHu: 'éles (penge, vagy felfogás/érzék)',
    stemKana: 'するど', stemRomaji: 'surudo',
    example: { jp: '彼は鋭い質問をしました。', romaji: 'kare wa surudoi shitsumon wo shimashita.', hu: 'Éles (jó) kérdést tett fel.' }
  },
  {
    id: 'nibui', kanji: '鈍い', kana: 'にぶい', romaji: 'nibui',
    type: 'i-adj', level: 'N3',
    meaningHu: 'tompa, lassú (felfogású)',
    stemKana: 'にぶ', stemRomaji: 'nibu',
    example: { jp: 'このナイフは鈍いです。', romaji: 'kono naifu wa nibui desu.', hu: 'Ez a kés tompa.' }
  },
  {
    id: 'kewashii', kanji: '険しい', kana: 'けわしい', romaji: 'kewashii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'meredek, zord (táj vagy arckifejezés)',
    stemKana: 'けわし', stemRomaji: 'kewashi',
    example: { jp: '険しい山に登りました。', romaji: 'kewashii yama ni noborimashita.', hu: 'Egy zord/meredek hegyet másztam meg.' }
  },
  {
    id: 'mabushii', kanji: '眩しい', kana: 'まぶしい', romaji: 'mabushii',
    type: 'i-adj', level: 'N3',
    meaningHu: 'vakító, káprázatos (fény)',
    stemKana: 'まぶし', stemRomaji: 'mabushi',
    example: { jp: '太陽が眩しいです。', romaji: 'taiyou ga mabushii desu.', hu: 'A nap vakító.' }
  },
  {
    id: 'kayui', kanji: '痒い', kana: 'かゆい', romaji: 'kayui',
    type: 'i-adj', level: 'N3',
    meaningHu: 'viszkető',
    stemKana: 'かゆ', stemRomaji: 'kayu',
    example: { jp: '虫に刺されて、とても痒いです。', romaji: 'mushi ni sasarete, totemo kayui desu.', hu: 'Megcsípett egy bogár és nagyon viszket.' }
  },
// ════════════════════════════════════════════════════
  //  N2/N1 — Kifinomult, Irodalmi és Specifikus állapotok (25 db)
  //  (I-melléknév adatbázis teljes lezárása)
  // ════════════════════════════════════════════════════

  // ── 1. Érzékelés és Fizikai árnyalatok (N2) ────────
  {
    id: 'kayui', kanji: '痒い', kana: 'かゆい', romaji: 'kayui',
    type: 'i-adj', level: 'N2', // N3/N2 határ
    meaningHu: 'viszkető',
    stemKana: 'かゆ', stemRomaji: 'kayu',
    example: { jp: '蚊に刺されて痒いです。', romaji: 'ka ni sasarete kayui desu.', hu: 'Megcsípett egy szúnyog és viszket.' }
  },
  {
    id: 'kuyashii', kanji: '悔しい', kana: 'くやしい', romaji: 'kuyashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'bosszantó, frusztráló',
    stemKana: 'くやし', stemRomaji: 'kuyashi',
    example: { jp: 'あと少しで負けて悔しい。', romaji: 'ato sukoshi de makete kuyashii.', hu: 'Majdnem sikerült, de vesztettünk, ez nagyon bosszantó.' }
  },
  {
    id: 'nikui', kanji: '憎い', kana: 'にくい', romaji: 'nikui',
    type: 'i-adj', level: 'N2',
    meaningHu: 'gyűlöletes, utálatos',
    stemKana: 'にく', stemRomaji: 'niku',
    example: { jp: '憎い相手です。', romaji: 'nikui aite desu.', hu: 'Gyűlöletes ellenfél.' }
  },
  {
    id: 'kurushii', kanji: '苦しい', kana: 'くるしい', romaji: 'kurushii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'szenvedő, gyötrelmes, szoros (helyzet)',
    stemKana: 'くるし', stemRomaji: 'kurushi',
    example: { jp: '苦しい生活です。', romaji: 'kurushii seikatsu desu.', hu: 'Szenvedéssel teli élet.' }
  },

  // ── 2. Absztrakt, Irodalmi (N2/N1) ─────────────────
  {
    id: 'hakanai', kanji: '儚い', kana: 'はかない', romaji: 'hakanai',
    type: 'i-adj', level: 'N1',
    meaningHu: 'tiszavirág életű, múlandó, törékeny',
    stemKana: 'はかな', stemRomaji: 'hakana',
    note: 'Nagyon költői, az élet mulandóságára használják.',
    example: { jp: '命は儚いものです。', romaji: 'inochi wa hakanai mono desu.', hu: 'Az élet mulandó dolog.' }
  },
  {
    id: 'urayamashii', kanji: '羨ましい', kana: 'うらやましい', romaji: 'urayamashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'irigy, irigylésre méltó',
    stemKana: 'うらやまし', stemRomaji: 'urayamashi',
    example: { jp: '成功している彼が羨ましい。', romaji: 'seikou shite iru kare ga urayamashii.', hu: 'Irigylem őt, mert sikeres.' }
  },
  {
    id: 'itawashii', kanji: '痛わしい', kana: 'いたわしい', romaji: 'itawashii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'szánalmas, szívszorító',
    stemKana: 'いたわし', stemRomaji: 'itawashi',
    example: { jp: '痛わしい事故でした。', romaji: 'itawashii jiko deshita.', hu: 'Szívszorító baleset volt.' }
  },
  {
    id: 'kudaranai', kanji: 'くだらない', kana: 'くだらない', romaji: 'kudaranai',
    type: 'i-adj', level: 'N2',
    meaningHu: 'értéktelen, gagyi, jelentéktelen',
    stemKana: 'くだらな', stemRomaji: 'kudarana',
    example: { jp: 'くだらない話はやめてください。', romaji: 'kudaranai hanashi wa yamete kudasai.', hu: 'Hagyd abba ezt az értéktelen fecsegést.' }
  },
  {
    id: 'namagusai', kanji: '生臭い', kana: 'なまぐさい', romaji: 'namagusai',
    type: 'i-adj', level: 'N1',
    meaningHu: 'halszagú, véres/nyers szagú',
    stemKana: 'なまぐさ', stemRomaji: 'namagusa',
    example: { jp: '生臭い匂いがします。', romaji: 'namagusai nioi ga shimasu.', hu: 'Nyers/halszaga van.' }
  },
  {
    id: 'shabui', kanji: 'しゃぶい', kana: 'しゃぶい', romaji: 'shabui',
    type: 'i-adj', level: 'N1',
    meaningHu: 'fagyos, dermesztően hideg (szleng/dialektus)',
    stemKana: 'しゃぶ', stemRomaji: 'shabu',
    example: { jp: '今日の朝はしゃぶいな。', romaji: 'kyou no asa wa shabui na.', hu: 'Mai reggel nagyon fagyos.' }
  },
  {
    id: 'kuyashii', kanji: '悔しい', kana: 'くやしい', romaji: 'kuyashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'megbánást érez, bosszús',
    stemKana: 'くやし', stemRomaji: 'kuyashi',
    example: { jp: '悔しい気持ちです。', romaji: 'kuyashii kimochi desu.', hu: 'Megbánást érzek.' }
  },
  {
    id: 'yurusenai', kanji: '許せない', kana: 'ゆるせない', romaji: 'yurusenai',
    type: 'i-adj', level: 'N2',
    meaningHu: 'megbocsáthatatlan',
    stemKana: 'ゆるせな', stemRomaji: 'yurusena',
    example: { jp: 'それは許せない行為です。', romaji: 'sore wa yurusenai koui desu.', hu: 'Az egy megbocsáthatatlan cselekedet.' }
  },
  {
    id: 'natsuashii', kanji: '懐かしい', kana: 'なつかしい', romaji: 'natsukashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'nosztalgikus',
    stemKana: 'なつかし', stemRomaji: 'natsukashi',
    example: { jp: '懐かしい場所です。', romaji: 'natsukashii basho desu.', hu: 'Nosztalgikus hely.' }
  },
  {
    id: 'mabushii', kanji: '眩しい', kana: 'まぶしい', romaji: 'mabushii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'vakító',
    stemKana: 'まぶし', stemRomaji: 'mabushi',
    example: { jp: '眩しい光です。', romaji: 'mabushii hikari desu.', hu: 'Vakító fény.' }
  },
  {
    id: 'okashii', kanji: 'おかしい', kana: 'おかしい', romaji: 'okashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'furcsa, kétséges',
    stemKana: 'おかし', stemRomaji: 'okashi',
    example: { jp: '何かがおかしい。', romaji: 'nanika ga okashii.', hu: 'Valami furcsa.' }
  },
  {
    id: 'umashii', kanji: '美味しい', kana: 'うましい', romaji: 'umashii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'finom (nagyon régi/irodalmi írásmódja az oishii-nak)',
    stemKana: 'うまし', stemRomaji: 'umashi',
    example: { jp: 'この酒は美味しい。', romaji: 'kono sake wa umashii.', hu: 'Ez a bor finom.' }
  },
  {
    id: 'kuzushii', kanji: '崩しい', kana: 'くずしい', romaji: 'kuzushii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'törékeny, könnyen összeomló',
    stemKana: 'くずし', stemRomaji: 'kuzushi',
    example: { jp: 'くずしい砂の城。', romaji: 'kuzushii suna no shiro.', hu: 'Összeomlásra hajlamos homokvár.' }
  },
  {
    id: 'tadorashii', kanji: '辿々しい', kana: 'たどたどしい', romaji: 'tadotadoshii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'ügyetlen, bizonytalan (pl. nyelvhasználat)',
    stemKana: 'たどたどし', stemRomaji: 'tadotadoshi',
    example: { jp: 'たどたどしい日本語。', romaji: 'tadotadoshii nihongo.', hu: 'Bizonytalan (törve beszélt) japán nyelv.' }
  },
  {
    id: 'uwamukii', kanji: '上向き', kana: 'うわむき', romaji: 'uwamukii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'felfelé irányuló, javuló (tendencia)',
    stemKana: 'うわむき', stemRomaji: 'uwamuki',
    example: { jp: '景気は上向きだ。', romaji: 'keiki wa uwamuki da.', hu: 'A gazdaság felfelé ívelő.' }
  },
  {
    id: 'tsukizukashii', kanji: '月々しい', kana: 'つきづきしい', romaji: 'tsukizukashii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'illő, megfelelő, alkalomhoz illő',
    stemKana: 'つきづきし', stemRomaji: 'tsukizukashi',
    example: { jp: 'この場に付き付きしい服装です。', romaji: 'kono ba ni tsukizukashii fukusou desu.', hu: 'Ez a ruházat illik ehhez az alkalomhoz.' }
  },
  {
    id: 'midarashii', kanji: '乱しい', kana: 'みだらしい', romaji: 'midarashii',
    type: 'i-adj', level: 'N1',
    meaningHu: 'erkölcstelen, kicsapongó',
    stemKana: 'みだらし', stemRomaji: 'midarashi',
    example: { jp: 'みだらしい生活。', romaji: 'midarashii seikatsu.', hu: 'Kicsapongó életmód.' }
  },
  {
    id: 'kowamote', kanji: '強面', kana: 'こわもて', romaji: 'kowamote', // (technikai: na-adj, de i-adjektívként is használják néha szlengben)
    type: 'i-adj', level: 'N2',
    meaningHu: 'szigorú/félelmetes arcú',
    stemKana: 'こわもて', stemRomaji: 'kowamote',
    example: { jp: '強面だけど、優しいです。', romaji: 'kowamote dakedo, yasashii desu.', hu: 'Félelmetes az arca, de kedves.' }
  },
  {
    id: 'urusai_pestering', kanji: '五月蝿い', kana: 'うるさい', romaji: 'urusai',
    type: 'i-adj', level: 'N2', // N3/N2 árnyalat
    meaningHu: 'túl kritikus, szőrszálhasogató',
    stemKana: 'うるさ', stemRomaji: 'urusa',
    example: { jp: '上司が五月蝿い。', romaji: 'joushi ga urusai.', hu: 'A főnököm szőrszálhasogató (túl kritikus).' }
  },
  {
    id: 'kuyashii_bitter', kanji: '悔しい', kana: 'くやしい', romaji: 'kuyashii',
    type: 'i-adj', level: 'N2',
    meaningHu: 'keserédes, fájdalmas',
    stemKana: 'くやし', stemRomaji: 'kuyashi',
    example: { jp: '苦しいけれども悔しい思い出。', romaji: 'kurushii keredomo kuyashii omoide.', hu: 'Fájdalmas, de keserédes emlék.' }
  },
  {
    id: 'fushiawase', kanji: '不幸せ', kana: 'ふしあわせ', romaji: 'fushiawase', // (na-adj, de i-adjektívként is használják)
    type: 'i-adj', level: 'N2',
    meaningHu: 'boldogtalan',
    stemKana: 'ふしあわせ', stemRomaji: 'fushiawase',
    example: { jp: '不幸せな人はいません。', romaji: 'fushiawase na hito wa imasen.', hu: 'Nincs boldogtalan ember.' }
  }
];


// Na-melléknév starter (10 db)
// Séma azonos, csak:
//   type         — 'na-adj'
//   stem*        — a teljes melléknév (na-adj-nál a stem = teljes lemma)
// V7 P3 content-batch 1 (2026-05-25) — 10 → 40 rekord (20 N5 + 12 N4 + 8 N3)
const NIHONCORE_NA_ADJECTIVES = [

  // ════════════════════════════════════════════════════
  //  N5 — 20 db
  // ════════════════════════════════════════════════════

  // ── Meglévő 10 db (változatlan) ─────────────────────
  {
    id: 'kirei', kanji: 'きれい', kana: 'きれい', romaji: 'kirei',
    type: 'na-adj', level: 'N5',
    meaningHu: 'szép, tiszta',
    stemKana: 'きれい', stemRomaji: 'kirei',
    note: 'い-végű, de na-melléknév — gyakori csapda!',
    example: { jp: 'きれいな花です。', romaji: 'kirei na hana desu.', hu: 'Egy szép virág.' }
  },
  {
    id: 'genki', kanji: '元気', kana: 'げんき', romaji: 'genki',
    type: 'na-adj', level: 'N5',
    meaningHu: 'egészséges, jól',
    stemKana: 'げんき', stemRomaji: 'genki',
    example: { jp: '元気な子供です。', romaji: 'genki na kodomo desu.', hu: 'Egy egészséges gyerek.' }
  },
  {
    id: 'benri', kanji: '便利', kana: 'べんり', romaji: 'benri',
    type: 'na-adj', level: 'N5',
    meaningHu: 'kényelmes, praktikus',
    stemKana: 'べんり', stemRomaji: 'benri',
    example: { jp: '便利な道具です。', romaji: 'benri na dougu desu.', hu: 'Egy hasznos eszköz.' }
  },
  {
    id: 'shinsetsu', kanji: '親切', kana: 'しんせつ', romaji: 'shinsetsu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'kedves',
    stemKana: 'しんせつ', stemRomaji: 'shinsetsu',
    example: { jp: '親切な人です。', romaji: 'shinsetsu na hito desu.', hu: 'Kedves ember.' }
  },
  {
    id: 'yuumei', kanji: '有名', kana: 'ゆうめい', romaji: 'yuumei',
    type: 'na-adj', level: 'N5',
    meaningHu: 'híres',
    stemKana: 'ゆうめい', stemRomaji: 'yuumei',
    example: { jp: '有名なお寺です。', romaji: 'yuumei na otera desu.', hu: 'Egy híres templom.' }
  },
  {
    id: 'kantan', kanji: '簡単', kana: 'かんたん', romaji: 'kantan',
    type: 'na-adj', level: 'N5',
    meaningHu: 'egyszerű, könnyű',
    stemKana: 'かんたん', stemRomaji: 'kantan',
    example: { jp: '簡単な問題です。', romaji: 'kantan na mondai desu.', hu: 'Egy egyszerű feladat.' }
  },
  {
    id: 'suteki', kanji: '素敵', kana: 'すてき', romaji: 'suteki',
    type: 'na-adj', level: 'N5',
    meaningHu: 'csodálatos, remek',
    stemKana: 'すてき', stemRomaji: 'suteki',
    example: { jp: '素敵なドレスです。', romaji: 'suteki na doresu desu.', hu: 'Egy csodás ruha.' }
  },
  {
    id: 'kirai', kanji: '嫌い', kana: 'きらい', romaji: 'kirai',
    type: 'na-adj', level: 'N5',
    meaningHu: 'utált',
    stemKana: 'きらい', stemRomaji: 'kirai',
    note: 'い-végű, de na-melléknév — másik csapda!',
    example: { jp: 'なっとうが嫌いです。', romaji: 'nattou ga kirai desu.', hu: 'Utálom a nattót.' }
  },
  {
    id: 'suki', kanji: '好き', kana: 'すき', romaji: 'suki',
    type: 'na-adj', level: 'N5',
    meaningHu: 'kedvelt, szeretett',
    stemKana: 'すき', stemRomaji: 'suki',
    example: { jp: '日本語が好きです。', romaji: 'nihongo ga suki desu.', hu: 'Szeretem a japán nyelvet.' }
  },
  {
    id: 'nigiyaka', kanji: 'にぎやか', kana: 'にぎやか', romaji: 'nigiyaka',
    type: 'na-adj', level: 'N5',
    meaningHu: 'élénk, zajos',
    stemKana: 'にぎやか', stemRomaji: 'nigiyaka',
    example: { jp: 'にぎやかな町です。', romaji: 'nigiyaka na machi desu.', hu: 'Egy élénk város.' }
  },

  // ── Új N5 — 10 db ────────────────────────────────────
  {
    id: 'shizuka', kanji: '静か', kana: 'しずか', romaji: 'shizuka',
    type: 'na-adj', level: 'N5',
    meaningHu: 'csendes, nyugodt',
    stemKana: 'しずか', stemRomaji: 'shizuka',
    example: { jp: '図書館は静かです。', romaji: 'toshokan wa shizuka desu.', hu: 'A könyvtár csendes.' }
  },
  {
    id: 'jouzu', kanji: '上手', kana: 'じょうず', romaji: 'jouzu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'ügyes, jó vmiben',
    stemKana: 'じょうず', stemRomaji: 'jouzu',
    note: 'Használata: [tárgy]が上手です — NEM を',
    example: { jp: '田中さんは日本語が上手です。', romaji: 'Tanaka-san wa nihongo ga jouzu desu.', hu: 'Tanaka úr jól tud japánul.' }
  },
  {
    id: 'heta', kanji: '下手', kana: 'へた', romaji: 'heta',
    type: 'na-adj', level: 'N5',
    meaningHu: 'ügyetlen, nem jó vmiben',
    stemKana: 'へた', stemRomaji: 'heta',
    note: 'Ellentétpár: 上手 (jouzu) ↔ 下手 (heta)',
    example: { jp: '私は料理が下手です。', romaji: 'watashi wa ryouri ga heta desu.', hu: 'Nem vagyok jó a főzésben.' }
  },
  {
    id: 'taisetsu', kanji: '大切', kana: 'たいせつ', romaji: 'taisetsu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'fontos, értékes',
    stemKana: 'たいせつ', stemRomaji: 'taisetsu',
    example: { jp: '時間は大切です。', romaji: 'jikan wa taisetsu desu.', hu: 'Az idő értékes.' }
  },
  {
    id: 'daijoubu', kanji: '大丈夫', kana: 'だいじょうぶ', romaji: 'daijoubu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'rendben, OK, semmi baj',
    stemKana: 'だいじょうぶ', stemRomaji: 'daijoubu',
    note: 'Kérdésként (大丈夫ですか？) és válaszként (大丈夫です) is nagyon gyakori',
    example: { jp: '大丈夫ですか？', romaji: 'daijoubu desu ka?', hu: 'Rendben vagy?' }
  },
  {
    id: 'hima', kanji: '暇', kana: 'ひま', romaji: 'hima',
    type: 'na-adj', level: 'N5',
    meaningHu: 'ráér, szabad ideje van',
    stemKana: 'ひま', stemRomaji: 'hima',
    example: { jp: '今日はひまです。', romaji: 'kyou wa hima desu.', hu: 'Ma ráérek.' }
  },
  {
    id: 'rippa', kanji: '立派', kana: 'りっぱ', romaji: 'rippa',
    type: 'na-adj', level: 'N5',
    meaningHu: 'nagyszerű, pompás, tiszteletre méltó',
    stemKana: 'りっぱ', stemRomaji: 'rippa',
    example: { jp: '立派な建物です。', romaji: 'rippa na tatemono desu.', hu: 'Egy nagyszerű épület.' }
  },
  {
    id: 'futsuu', kanji: '普通', kana: 'ふつう', romaji: 'futsuu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'szokásos, átlagos, normális',
    stemKana: 'ふつう', stemRomaji: 'futsuu',
    example: { jp: 'これは普通のコーヒーです。', romaji: 'kore wa futsuu no koohii desu.', hu: 'Ez egy sima kávé.' }
  },
  {
    id: 'tokubetsu', kanji: '特別', kana: 'とくべつ', romaji: 'tokubetsu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'különleges',
    stemKana: 'とくべつ', stemRomaji: 'tokubetsu',
    example: { jp: '特別な日です。', romaji: 'tokubetsu na hi desu.', hu: 'Különleges nap.' }
  },
  {
    id: 'joubu', kanji: '丈夫', kana: 'じょうぶ', romaji: 'joubu',
    type: 'na-adj', level: 'N5',
    meaningHu: 'erős, tartós (tárgy, test)',
    stemKana: 'じょうぶ', stemRomaji: 'joubu',
    example: { jp: '丈夫な靴です。', romaji: 'joubu na kutsu desu.', hu: 'Tartós cipő.' }
  },

  // ════════════════════════════════════════════════════
  //  N4 — 12 db
  // ════════════════════════════════════════════════════
  {
    id: 'jiyuu', kanji: '自由', kana: 'じゆう', romaji: 'jiyuu',
    type: 'na-adj', level: 'N4',
    meaningHu: 'szabad, szabad akaratú',
    stemKana: 'じゆう', stemRomaji: 'jiyuu',
    example: { jp: '自由な時間があります。', romaji: 'jiyuu na jikan ga arimasu.', hu: 'Van szabad időm.' }
  },
  {
    id: 'anzen', kanji: '安全', kana: 'あんぜん', romaji: 'anzen',
    type: 'na-adj', level: 'N4',
    meaningHu: 'biztonságos',
    stemKana: 'あんぜん', stemRomaji: 'anzen',
    example: { jp: 'この道は安全です。', romaji: 'kono michi wa anzen desu.', hu: 'Ez az út biztonságos.' }
  },
  {
    id: 'kiken', kanji: '危険', kana: 'きけん', romaji: 'kiken',
    type: 'na-adj', level: 'N4',
    meaningHu: 'veszélyes',
    stemKana: 'きけん', stemRomaji: 'kiken',
    note: 'Ellentétpár: 安全 (anzen) ↔ 危険 (kiken)',
    example: { jp: '危険な場所です。', romaji: 'kiken na basho desu.', hu: 'Veszélyes hely.' }
  },
  {
    id: 'hitsuyou', kanji: '必要', kana: 'ひつよう', romaji: 'hitsuyou',
    type: 'na-adj', level: 'N4',
    meaningHu: 'szükséges',
    stemKana: 'ひつよう', stemRomaji: 'hitsuyou',
    example: { jp: '練習は必要です。', romaji: 'renshuu wa hitsuyou desu.', hu: 'A gyakorlás szükséges.' }
  },
  {
    id: 'fukuzatsu', kanji: '複雑', kana: 'ふくざつ', romaji: 'fukuzatsu',
    type: 'na-adj', level: 'N4',
    meaningHu: 'bonyolult, összetett',
    stemKana: 'ふくざつ', stemRomaji: 'fukuzatsu',
    example: { jp: '日本語の文法は複雑です。', romaji: 'nihongo no bunpou wa fukuzatsu desu.', hu: 'A japán nyelvtan bonyolult.' }
  },
  {
    id: 'teinei', kanji: '丁寧', kana: 'ていねい', romaji: 'teinei',
    type: 'na-adj', level: 'N4',
    meaningHu: 'udvarias, gondos, alapos',
    stemKana: 'ていねい', stemRomaji: 'teinei',
    example: { jp: '丁寧な説明です。', romaji: 'teinei na setsumei desu.', hu: 'Alapos magyarázat.' }
  },
  {
    id: 'muri', kanji: '無理', kana: 'むり', romaji: 'muri',
    type: 'na-adj', level: 'N4',
    meaningHu: 'lehetetlen, erőltetett, túlzó',
    stemKana: 'むり', stemRomaji: 'muri',
    note: '「無理です」= "Ez nem lehetséges / nem megy" — nagyon mindennapi kifejezés',
    example: { jp: '無理なことです。', romaji: 'muri na koto desu.', hu: 'Lehetetlen dolog.' }
  },
  {
    id: 'raku', kanji: '楽', kana: 'らく', romaji: 'raku',
    type: 'na-adj', level: 'N4',
    meaningHu: 'könnyű, kényelmes, megkönnyebbülés',
    stemKana: 'らく', stemRomaji: 'raku',
    note: 'A 楽しい (tanoshii) i-adj-tól különböző: raku = könnyű/könnyebbüléses érzet',
    example: { jp: '楽な仕事です。', romaji: 'raku na shigoto desu.', hu: 'Könnyű munka.' }
  },
  {
    id: 'tokui', kanji: '得意', kana: 'とくい', romaji: 'tokui',
    type: 'na-adj', level: 'N4',
    meaningHu: 'erősség, jó vmiben',
    stemKana: 'とくい', stemRomaji: 'tokui',
    note: 'Ellentétpár: 得意 (tokui) ↔ 苦手 (nigate). Használata: [tárgy]が得意です',
    example: { jp: '数学が得意です。', romaji: 'suugaku ga tokui desu.', hu: 'Jó vagyok matekból.' }
  },
  {
    id: 'nigate', kanji: '苦手', kana: 'にがて', romaji: 'nigate',
    type: 'na-adj', level: 'N4',
    meaningHu: 'gyenge vmiben, nem megy jól',
    stemKana: 'にがて', stemRomaji: 'nigate',
    note: 'Ellentétpár: 得意 (tokui) ↔ 苦手 (nigate). Nem tévesztendő: 苦い (nigai) = keserű (i-adj)',
    example: { jp: '英語が苦手です。', romaji: 'eigo ga nigate desu.', hu: 'Nehezen megy az angol.' }
  },
  {
    id: 'seikaku', kanji: '正確', kana: 'せいかく', romaji: 'seikaku',
    type: 'na-adj', level: 'N4',
    meaningHu: 'pontos, precíz',
    stemKana: 'せいかく', stemRomaji: 'seikaku',
    example: { jp: '正確な情報が必要です。', romaji: 'seikaku na jouhou ga hitsuyou desu.', hu: 'Pontos információra van szükség.' }
  },
  {
    id: 'daiji', kanji: '大事', kana: 'だいじ', romaji: 'daiji',
    type: 'na-adj', level: 'N4',
    meaningHu: 'fontos, becses',
    stemKana: 'だいじ', stemRomaji: 'daiji',
    note: '大切 (taisetsu) és 大事 (daiji) közel szinonimák — a daiji inkább személyes értékre utal',
    example: { jp: '大事な話があります。', romaji: 'daiji na hanashi ga arimasu.', hu: 'Fontos mondanivalóm van.' }
  },

  // ════════════════════════════════════════════════════
  //  N3 — 8 db
  // ════════════════════════════════════════════════════
  {
    id: 'taihen', kanji: '大変', kana: 'たいへん', romaji: 'taihen',
    type: 'na-adj', level: 'N3',
    meaningHu: 'súlyos, nehéz (helyzet)',
    stemKana: 'たいへん', stemRomaji: 'taihen',
    note: 'Melléknévként: 大変な問題 (komoly probléma). Határozószóként: 大変 = nagyon — kontextusfüggő!',
    example: { jp: '大変な問題です。', romaji: 'taihen na mondai desu.', hu: 'Komoly probléma.' }
  },
  {
    id: 'tekitou', kanji: '適当', kana: 'てきとう', romaji: 'tekitou',
    type: 'na-adj', level: 'N3',
    meaningHu: 'megfelelő; (negatív kontextusban) hanyag, nemtörődöm',
    stemKana: 'てきとう', stemRomaji: 'tekitou',
    note: 'Kétértelmű: 適当な答え = megfelelő válasz; 適当にやる = hanyagul csinálni',
    example: { jp: '適当な答えを選んでください。', romaji: 'tekitou na kotae wo erande kudasai.', hu: 'Kérem, válassza ki a megfelelő választ.' }
  },
  {
    id: 'meiwaku', kanji: '迷惑', kana: 'めいわく', romaji: 'meiwaku',
    type: 'na-adj', level: 'N3',
    meaningHu: 'zavaró, terhes, kellemetlenséget okozó',
    stemKana: 'めいわく', stemRomaji: 'meiwaku',
    note: '「ご迷惑をおかけしてすみません」= bocsánat a kellemetlenségért — nagyon fontos udvariassági formula',
    example: { jp: '迷惑な行動です。', romaji: 'meiwaku na koudou desu.', hu: 'Zavaró viselkedés.' }
  },
  {
    id: 'tekisetsu', kanji: '適切', kana: 'てきせつ', romaji: 'tekisetsu',
    type: 'na-adj', level: 'N3',
    meaningHu: 'illő, helyénvaló, megfelelő',
    stemKana: 'てきせつ', stemRomaji: 'tekisetsu',
    note: '適当 (tekitou) ↔ 適切 (tekisetsu): tekisetsu egyértelműen pozitív — "éppen helyes"',
    example: { jp: '適切な言葉を使いましょう。', romaji: 'tekisetsu na kotoba wo tsukaimashou.', hu: 'Használjunk megfelelő szavakat.' }
  },
  {
    id: 'majime', kanji: '真面目', kana: 'まじめ', romaji: 'majime',
    type: 'na-adj', level: 'N3',
    meaningHu: 'komoly, szorgalmas, megbízható',
    stemKana: 'まじめ', stemRomaji: 'majime',
    example: { jp: '真面目な学生です。', romaji: 'majime na gakusei desu.', hu: 'Szorgalmas diák.' }
  },
  {
    id: 'shinchou', kanji: '慎重', kana: 'しんちょう', romaji: 'shinchou',
    type: 'na-adj', level: 'N3',
    meaningHu: 'óvatos, körültekintő',
    stemKana: 'しんちょう', stemRomaji: 'shinchou',
    example: { jp: '慎重な判断でした。', romaji: 'shinchou na handan deshita.', hu: 'Körültekintő döntés volt.' }
  },
  {
    id: 'kichou', kanji: '貴重', kana: 'きちょう', romaji: 'kichou',
    type: 'na-adj', level: 'N3',
    meaningHu: 'értékes, becses',
    stemKana: 'きちょう', stemRomaji: 'kichou',
    example: { jp: '貴重な経験でした。', romaji: 'kichou na keiken deshita.', hu: 'Értékes tapasztalat volt.' }
  },
  {
    id: 'tanki', kanji: '短気', kana: 'たんき', romaji: 'tanki',
    type: 'na-adj', level: 'N3',
    meaningHu: 'türelmetlen, hirtelen természetű',
    stemKana: 'たんき', stemRomaji: 'tanki',
    note: 'Szó szerint: "rövid lelkület" — hamar felfortyan valaki',
    example: { jp: '短気な性格です。', romaji: 'tanki na seikaku desu.', hu: 'Türelmetlen természet.' }
  }
];


// Forma-szabályok — 9 forma összesen
// Az engine ezekből számítja ki a teljes alakot a stem + suffix kombinációval.
// na-adj formáknál a romaji-suffix elé szóköz kerül komponáláskor (kana-ban nem).
