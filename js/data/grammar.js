/* ====================================================
   NIHONCORE — grammar.js (Grammar Patterns modul — V5 P1)
   ----------------------------------------------------
   NIHONCORE_GRAMMAR_PATTERNS — sentence-szintű minták (N4 + N3).
   Pattern-séma: id, label, jlpt, category, summary, structure,
                 explanation, examples[2], contrasts[].
   Kategóriák és error-kódok: core.js (GRAMMAR_CATEGORIES, GRAMMAR_ERROR_TYPES).
   Engine: initGrammarPage az app.js-ben (SRS-integrált).

   Példa-séma minden példánál:
     jp           — <ruby><rt> furigana-val
     kana         — pure hiragana/katakana (összehasonlításra)
     romaji       — Hepburn
     hu           — magyar fordítás
     cloze        — ___BLANK___ marker-rel
     clozeAnswer  — a blank kana-tartalma
     tokens       — frázis-szintű kana-tömb (translate módhoz, 2026-06-03)
                    Megbízható: a heurisztikus tokenizer 80%-ban broken volt,
                    explicit tokenek garantálják a Mondat-Puzzle stílust.
                    Összefűzve === kana (mind a 30 példa verifikálva).
   ==================================================== */
const NIHONCORE_GRAMMAR_PATTERNS = [

  /* ── N4 ── Vágy ───────────────────────────────────── */
  {
    id: 'tai', label: '〜たい', jlpt: 'N4', category: 'desire',
    summary: 'A beszélő saját vágya („…akarok / szeretnék …").',
    structure: 'V-stem (ます-tő) + たい',
    explanation: 'A beszélő SAJÁT vágyát fejezi ki. I-melléknévként ragozódik: たくない (nem akarom), たかった (akartam). Harmadik személynél inkább 〜たがる kell.',
    examples: [
      { jp: '<ruby>水<rt>みず</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みたい。',
        kana: 'みずをのみたい。', romaji: 'mizu o nomitai.', hu: 'Vizet akarok inni.',
        cloze: '<ruby>水<rt>みず</rt></ruby>を<ruby>飲<rt>の</rt></ruby>み___BLANK___。', clozeAnswer: 'たい',
        tokens: ['みずを', 'のみたい', '。'] },
      { jp: '<ruby>日本<rt>にほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きたいです。',
        kana: 'にほんにいきたいです。', romaji: 'nihon ni ikitai desu.', hu: 'Japánba szeretnék menni.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>き___BLANK___です。', clozeAnswer: 'たい',
        tokens: ['にほんに', 'いきたいです', '。'] }
    ],
    contrasts: ['tsumori', 'to_omou']
  },

  /* ── N4 ── Feltétel (3) ───────────────────────────── */
  {
    id: 'tara', label: '〜たら', jlpt: 'N4', category: 'conditional',
    summary: 'Általános feltétel: „ha …, (akkor) …".',
    structure: 'V-た + ら / Adj-かった + ら / N + だった + ら',
    explanation: 'A legrugalmasabb feltétel: jövőre, múltra is működik (a befejezett た-formára épül). A főmondatban akár felszólítás, akár múlt is állhat („Mire hazaértem, …").',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ったら、<ruby>家<rt>うち</rt></ruby>にいます。',
        kana: 'あめがふったら、うちにいます。', romaji: 'ame ga futtara, uchi ni imasu.',
        hu: 'Ha esik, otthon maradok.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>___BLANK___、<ruby>家<rt>うち</rt></ruby>にいます。',
        clozeAnswer: 'ったら',
        tokens: ['あめが', 'ふったら', '、', 'うちに', 'います', '。'] },
      { jp: '<ruby>時間<rt>じかん</rt></ruby>があったら、<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ます。',
        kana: 'じかんがあったら、えいがをみます。', romaji: 'jikan ga attara, eiga o mimasu.',
        hu: 'Ha lesz időm, megnézek egy filmet.',
        cloze: '<ruby>時間<rt>じかん</rt></ruby>があ___BLANK___、<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ます。',
        clozeAnswer: 'ったら',
        tokens: ['じかんが', 'あったら', '、', 'えいがを', 'みます', '。'] }
    ],
    contrasts: ['eba', 'nara', 'to_omou']
  },
  {
    id: 'eba', label: '〜ば', jlpt: 'N4', category: 'conditional',
    summary: 'Általános feltétel a feltételre fókuszálva („ha … akkor általában").',
    structure: 'Godan: u→eba (行く→行けば) · Ichidan: る→れば (見る→見れば) · i-Adj: い→ければ',
    explanation: 'Az általános/természeti törvény jellegű feltételek favorit formája („ha megnyomod, kinyílik"). A főmondat ritkán múlt; sokszor tanácsadás.',
    examples: [
      { jp: 'このボタンを<ruby>押<rt>お</rt></ruby>せば、ドアが<ruby>開<rt>あ</rt></ruby>きます。',
        kana: 'このボタンをおせば、ドアがあきます。', romaji: 'kono botan o oseba, doa ga akimasu.',
        hu: 'Ha megnyomod ezt a gombot, kinyílik az ajtó.',
        cloze: 'このボタンを<ruby>押<rt>お</rt></ruby>___BLANK___、ドアが<ruby>開<rt>あ</rt></ruby>きます。',
        clozeAnswer: 'せば',
        tokens: ['このボタンを', 'おせば', '、', 'ドアが', 'あきます', '。'] },
      { jp: '<ruby>安<rt>やす</rt></ruby>ければ、<ruby>買<rt>か</rt></ruby>います。',
        kana: 'やすければ、かいます。', romaji: 'yasukereba, kaimasu.',
        hu: 'Ha olcsó, megveszem.',
        cloze: '<ruby>安<rt>やす</rt></ruby>___BLANK___、<ruby>買<rt>か</rt></ruby>います。',
        clozeAnswer: 'ければ',
        tokens: ['やすければ', '、', 'かいます', '。'] }
    ],
    contrasts: ['tara', 'nara']
  },
  {
    id: 'nara', label: '〜なら', jlpt: 'N4', category: 'conditional',
    summary: 'Témakezdő feltétel: „ha már szóba került X, akkor …".',
    structure: 'V-szótári / Adj / N + なら',
    explanation: 'Akkor használjuk, ha a partner említett valamit és arra reagálunk: „Ha (már) Tokióba mész, próbáld ki…". Nem maga az esemény a feltétel, hanem a TÉMA.',
    examples: [
      { jp: '<ruby>日本<rt>にほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>くなら、<ruby>京都<rt>きょうと</rt></ruby>がいいですよ。',
        kana: 'にほんにいくなら、きょうとがいいですよ。', romaji: 'nihon ni iku nara, kyouto ga ii desu yo.',
        hu: 'Ha (már) Japánba mész, Kiotó jó hely.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>く___BLANK___、<ruby>京都<rt>きょうと</rt></ruby>がいいですよ。',
        clozeAnswer: 'なら',
        tokens: ['にほんに', 'いくなら', '、', 'きょうとが', 'いいですよ', '。'] },
      { jp: '<ruby>魚<rt>さかな</rt></ruby>なら、この<ruby>店<rt>みせ</rt></ruby>がおいしいです。',
        kana: 'さかななら、このみせがおいしいです。', romaji: 'sakana nara, kono mise ga oishii desu.',
        hu: 'Ami a halat illeti, ez a bolt finom.',
        cloze: '<ruby>魚<rt>さかな</rt></ruby>___BLANK___、この<ruby>店<rt>みせ</rt></ruby>がおいしいです。',
        clozeAnswer: 'なら',
        tokens: ['さかななら', '、', 'このみせが', 'おいしいです', '。'] }
    ],
    contrasts: ['tara', 'eba']
  },

  /* ── N4 ── Engedély / Kötelesség / Tiltás (4) ─────── */
  {
    id: 'te_mo_ii', label: '〜てもいい', jlpt: 'N4', category: 'permission',
    summary: 'Engedély: „szabad / lehet …".',
    structure: 'V-て + もいい (です/(か))',
    explanation: 'Megengedés vagy engedélykérés. Kérdő formában szelíden engedélyt kér.',
    examples: [
      { jp: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ってもいいですか。',
        kana: 'ここでしゃしんをとってもいいですか。', romaji: 'koko de shashin o totte mo ii desu ka.',
        hu: 'Lefényképezhetek itt?',
        cloze: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>って___BLANK___ですか。',
        clozeAnswer: 'もいい',
        tokens: ['ここで', 'しゃしんを', 'とってもいいですか', '。'] },
      { jp: '<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けてもいいです。',
        kana: 'まどをあけてもいいです。', romaji: 'mado o akete mo ii desu.',
        hu: 'Kinyithatod az ablakot.',
        cloze: '<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けて___BLANK___です。',
        clozeAnswer: 'もいい',
        tokens: ['まどを', 'あけてもいいです', '。'] }
    ],
    contrasts: ['te_wa_ikenai', 'nakute_mo_ii']
  },
  {
    id: 'te_wa_ikenai', label: '〜てはいけない', jlpt: 'N4', category: 'prohibition',
    summary: 'Tiltás: „nem szabad …".',
    structure: 'V-て + はいけない / はいけません',
    explanation: 'Erős tiltás (szabály, szülő/tanár). Beszélt nyelvben gyakran 〜ちゃだめ rövidítve.',
    examples: [
      { jp: 'ここでタバコを<ruby>吸<rt>す</rt></ruby>ってはいけません。',
        kana: 'ここでタバコをすってはいけません。', romaji: 'koko de tabako o sutte wa ikemasen.',
        hu: 'Itt tilos a dohányzás.',
        cloze: 'ここでタバコを<ruby>吸<rt>す</rt></ruby>って___BLANK___ません。',
        clozeAnswer: 'はいけ',
        tokens: ['ここで', 'タバコを', 'すってはいけません', '。'] },
      { jp: '<ruby>夜<rt>よる</rt></ruby><ruby>遅<rt>おそ</rt></ruby>く<ruby>電話<rt>でんわ</rt></ruby>してはいけない。',
        kana: 'よるおそくでんわしてはいけない。', romaji: 'yoru osoku denwa shite wa ikenai.',
        hu: 'Késő este nem szabad telefonálni.',
        cloze: '<ruby>夜<rt>よる</rt></ruby><ruby>遅<rt>おそ</rt></ruby>く<ruby>電話<rt>でんわ</rt></ruby>して___BLANK___ない。',
        clozeAnswer: 'はいけ',
        tokens: ['よるおそく', 'でんわしてはいけない', '。'] }
    ],
    contrasts: ['te_mo_ii', 'nakereba_naranai']
  },
  {
    id: 'nakereba_naranai', label: '〜なければならない', jlpt: 'N4', category: 'obligation',
    summary: 'Kötelesség: „muszáj / kell …".',
    structure: 'V-nai → nai-tő + なければならない (formálisan ならない/なりません)',
    explanation: 'Erős kötelesség. Beszélt nyelvben rövidített változatok: 〜なきゃ(いけない) / 〜なくちゃ(いけない).',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby><ruby>早<rt>はや</rt></ruby>く<ruby>起<rt>お</rt></ruby>きなければなりません。',
        kana: 'あしたはやくおきなければなりません。', romaji: 'ashita hayaku okinakereba narimasen.',
        hu: 'Holnap korán kell kelnem.',
        cloze: '<ruby>明日<rt>あした</rt></ruby><ruby>早<rt>はや</rt></ruby>く<ruby>起<rt>お</rt></ruby>き___BLANK___なりません。',
        clozeAnswer: 'なければ',
        tokens: ['あしたはやく', 'おきなければなりません', '。'] },
      { jp: '<ruby>宿題<rt>しゅくだい</rt></ruby>をしなければならない。',
        kana: 'しゅくだいをしなければならない。', romaji: 'shukudai o shinakereba naranai.',
        hu: 'Meg kell csinálnom a leckét.',
        cloze: '<ruby>宿題<rt>しゅくだい</rt></ruby>をし___BLANK___ならない。',
        clozeAnswer: 'なければ',
        tokens: ['しゅくだいを', 'しなければならない', '。'] }
    ],
    contrasts: ['te_wa_ikenai', 'nakute_mo_ii']
  },
  {
    id: 'nakute_mo_ii', label: '〜なくてもいい', jlpt: 'N4', category: 'permission',
    summary: 'Nincs szükség: „nem kell …".',
    structure: 'V-nai → nai-tő + なくてもいい',
    explanation: 'A kötelesség OPPOZITJA: nem kell. Adj-i-re: 〜くなくてもいい. N-re: 〜じゃなくてもいい.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby>は<ruby>来<rt>こ</rt></ruby>なくてもいいです。',
        kana: 'あしたはこなくてもいいです。', romaji: 'ashita wa konakute mo ii desu.',
        hu: 'Holnap nem kell jönnöd.',
        cloze: '<ruby>明日<rt>あした</rt></ruby>は<ruby>来<rt>こ</rt></ruby>な___BLANK___です。',
        clozeAnswer: 'くてもいい',
        tokens: ['あしたは', 'こなくてもいいです', '。'] },
      { jp: '<ruby>靴<rt>くつ</rt></ruby>を<ruby>脱<rt>ぬ</rt></ruby>がなくてもいいですよ。',
        kana: 'くつをぬがなくてもいいですよ。', romaji: 'kutsu o nuganakute mo ii desu yo.',
        hu: 'Nem kell levenned a cipőt.',
        cloze: '<ruby>靴<rt>くつ</rt></ruby>を<ruby>脱<rt>ぬ</rt></ruby>がな___BLANK___ですよ。',
        clozeAnswer: 'くてもいい',
        tokens: ['くつを', 'ぬがなくてもいいですよ', '。'] }
    ],
    contrasts: ['nakereba_naranai', 'te_mo_ii']
  },

  /* ── N4 ── Vélemény / Szándék (2) ─────────────────── */
  {
    id: 'to_omou', label: '〜と思う', jlpt: 'N4', category: 'opinion',
    summary: 'Vélemény: „azt gondolom, hogy …".',
    structure: 'Mondat (sima alak) + と<ruby>思<rt>おも</rt></ruby>う',
    explanation: 'A と előtt mindig SIMA alak áll (nem ます). Mások véleményéhez 〜と<ruby>言<rt>い</rt></ruby>う.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ると<ruby>思<rt>おも</rt></ruby>います。',
        kana: 'あしたはあめがふるとおもいます。', romaji: 'ashita wa ame ga furu to omoimasu.',
        hu: 'Azt gondolom, holnap esni fog.',
        cloze: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る___BLANK___います。',
        clozeAnswer: 'とおも',
        tokens: ['あしたは', 'あめが', 'ふるとおもいます', '。'] },
      { jp: 'この<ruby>本<rt>ほん</rt></ruby>はおもしろいと<ruby>思<rt>おも</rt></ruby>う。',
        kana: 'このほんはおもしろいとおもう。', romaji: 'kono hon wa omoshiroi to omou.',
        hu: 'Szerintem ez a könyv érdekes.',
        cloze: 'この<ruby>本<rt>ほん</rt></ruby>はおもしろい___BLANK___。',
        clozeAnswer: 'とおもう',
        tokens: ['このほんは', 'おもしろいとおもう', '。'] }
    ],
    contrasts: ['tsumori', 'sou_da_hearsay']
  },
  {
    id: 'tsumori', label: '〜つもり', jlpt: 'N4', category: 'intention',
    summary: 'Tudatos szándék: „azt tervezem, hogy …".',
    structure: 'V-szótári + つもり (です) · Tagadáshoz V-nai + つもり VAGY つもりは ない',
    explanation: 'Előre eldöntött, határozott szándék — nem pillanatnyi vágy (〜たい). A つもりはない formával erős tagadás.',
    examples: [
      { jp: '<ruby>来年<rt>らいねん</rt></ruby><ruby>結婚<rt>けっこん</rt></ruby>するつもりです。',
        kana: 'らいねんけっこんするつもりです。', romaji: 'rainen kekkon suru tsumori desu.',
        hu: 'Jövőre tervezek megházasodni.',
        cloze: '<ruby>来年<rt>らいねん</rt></ruby><ruby>結婚<rt>けっこん</rt></ruby>する___BLANK___です。',
        clozeAnswer: 'つもり',
        tokens: ['らいねん', 'けっこんするつもりです', '。'] },
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>何<rt>なに</rt></ruby>もしないつもりだ。',
        kana: 'きょうはなにもしないつもりだ。', romaji: 'kyou wa nani mo shinai tsumori da.',
        hu: 'Ma semmit sem tervezek csinálni.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>何<rt>なに</rt></ruby>もしない___BLANK___だ。',
        clozeAnswer: 'つもり',
        tokens: ['きょうは', 'なにもしないつもりだ', '。'] }
    ],
    contrasts: ['tai', 'to_omou']
  },

  /* ── N4 ── Párhuzam / Engedmény (2) ───────────────── */
  {
    id: 'nagara', label: '〜ながら', jlpt: 'N4', category: 'concurrent',
    summary: 'Egyidejű cselekvés: „miközben …".',
    structure: 'V-stem (ます-tő) + ながら',
    explanation: 'Két cselekvést UGYANAZ A személy végzi egyszerre. A főmondatban a hangsúlyos cselekvés van; a ながら-rész a háttér.',
    examples: [
      { jp: '<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きながら<ruby>勉強<rt>べんきょう</rt></ruby>します。',
        kana: 'おんがくをききながらべんきょうします。', romaji: 'ongaku o kikinagara benkyou shimasu.',
        hu: 'Zenét hallgatva tanulok.',
        cloze: '<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>き___BLANK___<ruby>勉強<rt>べんきょう</rt></ruby>します。',
        clozeAnswer: 'ながら',
        tokens: ['おんがくを', 'ききながら', 'べんきょうします', '。'] },
      { jp: '<ruby>歩<rt>ある</rt></ruby>きながら<ruby>話<rt>はな</rt></ruby>しましょう。',
        kana: 'あるきながらはなしましょう。', romaji: 'arukinagara hanashimashou.',
        hu: 'Beszélgessünk séta közben.',
        cloze: '<ruby>歩<rt>ある</rt></ruby>き___BLANK___<ruby>話<rt>はな</rt></ruby>しましょう。',
        clozeAnswer: 'ながら',
        tokens: ['あるきながら', 'はなしましょう', '。'] }
    ],
    contrasts: ['temo']
  },
  {
    id: 'temo', label: '〜ても', jlpt: 'N4', category: 'contrast',
    summary: 'Engedmény: „még akkor is, ha …".',
    structure: 'V-て + も · Adj-くて + も · N + でも',
    explanation: 'A főmondat NEM az elvárt eredményt mutatja: „Még ha … is, mégis …". Kérdőszóval általánosító („akárhova is mész…").',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っても、<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'あめがふっても、いきます。', romaji: 'ame ga futte mo, ikimasu.',
        hu: 'Akkor is megyek, ha esik.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っ___BLANK___、<ruby>行<rt>い</rt></ruby>きます。',
        clozeAnswer: 'ても',
        tokens: ['あめが', 'ふっても', '、', 'いきます', '。'] },
      { jp: '<ruby>高<rt>たか</rt></ruby>くても<ruby>買<rt>か</rt></ruby>います。',
        kana: 'たかくてもかいます。', romaji: 'takakute mo kaimasu.',
        hu: 'Akkor is megveszem, ha drága.',
        cloze: '<ruby>高<rt>たか</rt></ruby>く___BLANK___<ruby>買<rt>か</rt></ruby>います。',
        clozeAnswer: 'ても',
        tokens: ['たかくても', 'かいます', '。'] }
    ],
    contrasts: ['noni', 'tara']
  },

  /* ── N3 ── Ellentét / Hallomás / Változás (3) ─────── */
  {
    id: 'noni', label: '〜のに', jlpt: 'N3', category: 'contrast',
    summary: 'Váratlan ellentét: „annak ellenére, hogy …" (gyakran panaszos felhanggal).',
    structure: 'Sima alak + のに (Na-Adj/N esetén: ～な + のに)',
    explanation: 'Az 〜ても rokonai, de erősebb csalódás/meglepetés érzettel. A főmondatban NEM állhat felszólítás vagy szándék.',
    examples: [
      { jp: '<ruby>勉強<rt>べんきょう</rt></ruby>したのに、<ruby>試験<rt>しけん</rt></ruby>に<ruby>落<rt>お</rt></ruby>ちました。',
        kana: 'べんきょうしたのに、しけんにおちました。', romaji: 'benkyou shita noni, shiken ni ochimashita.',
        hu: 'Hiába tanultam, megbuktam a vizsgán.',
        cloze: '<ruby>勉強<rt>べんきょう</rt></ruby>した___BLANK___、<ruby>試験<rt>しけん</rt></ruby>に<ruby>落<rt>お</rt></ruby>ちました。',
        clozeAnswer: 'のに',
        tokens: ['べんきょうしたのに', '、', 'しけんに', 'おちました', '。'] },
      { jp: 'まだ<ruby>子供<rt>こども</rt></ruby>なのに、<ruby>難<rt>むずか</rt></ruby>しい<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        kana: 'まだこどもなのに、むずかしいほんをよみます。', romaji: 'mada kodomo na noni, muzukashii hon o yomimasu.',
        hu: 'Pedig még gyerek, mégis nehéz könyveket olvas.',
        cloze: 'まだ<ruby>子供<rt>こども</rt></ruby>な___BLANK___、<ruby>難<rt>むずか</rt></ruby>しい<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        clozeAnswer: 'のに',
        tokens: ['まだこどもなのに', '、', 'むずかしいほんを', 'よみます', '。'] }
    ],
    contrasts: ['temo']
  },
  {
    id: 'sou_da_hearsay', label: '〜そうだ (hallomás)', jlpt: 'N3', category: 'hearsay',
    summary: 'Hallomás: „azt mondják / állítólag …".',
    structure: 'Sima alak + そうだ (です)',
    explanation: 'Hallott információ továbbadása. NE keverd a 〜そう (látszat) formával — az a V-stem / Adj-tőhöz csatlakozik, ez viszont MINDIG sima alak után.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>来週<rt>らいしゅう</rt></ruby><ruby>来<rt>く</rt></ruby>るそうです。',
        kana: 'たなかさんはらいしゅうくるそうです。', romaji: 'tanaka-san wa raishuu kuru sou desu.',
        hu: 'Azt mondják, Tanaka-san jövő héten jön.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>来週<rt>らいしゅう</rt></ruby><ruby>来<rt>く</rt></ruby>る___BLANK___です。',
        clozeAnswer: 'そう',
        tokens: ['たなかさんは', 'らいしゅう', 'くるそうです', '。'] },
      { jp: 'あの<ruby>店<rt>みせ</rt></ruby>のラーメンはおいしいそうだ。',
        kana: 'あのみせのラーメンはおいしいそうだ。', romaji: 'ano mise no raamen wa oishii sou da.',
        hu: 'Állítólag annak a boltnak finom a ramenje.',
        cloze: 'あの<ruby>店<rt>みせ</rt></ruby>のラーメンはおいしい___BLANK___だ。',
        clozeAnswer: 'そう',
        tokens: ['あのみせの', 'ラーメンは', 'おいしいそうだ', '。'] }
    ],
    contrasts: ['to_omou']
  },
  {
    id: 'you_ni_naru', label: '〜ようになる', jlpt: 'N3', category: 'change',
    summary: 'Fokozatos képességbeli/szokásbeli változás: „lassan kezd …".',
    structure: 'V-szótári VAGY V-Potential + ようになる',
    explanation: 'Tartós állapotváltozás (eddig nem tudtam/szoktam, most már igen). Tagadáshoz 〜なくなる, vagy 〜ないようになる.',
    examples: [
      { jp: '<ruby>漢字<rt>かんじ</rt></ruby>が<ruby>読<rt>よ</rt></ruby>めるようになりました。',
        kana: 'かんじがよめるようになりました。', romaji: 'kanji ga yomeru you ni narimashita.',
        hu: 'Megtanultam olvasni a kanjikat.',
        cloze: '<ruby>漢字<rt>かんじ</rt></ruby>が<ruby>読<rt>よ</rt></ruby>める___BLANK___なりました。',
        clozeAnswer: 'ように',
        tokens: ['かんじが', 'よめるようになりました', '。'] },
      { jp: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>走<rt>はし</rt></ruby>るようになった。',
        kana: 'まいあさはしるようになった。', romaji: 'maiasa hashiru you ni natta.',
        hu: 'Beszoktam minden reggel futni.',
        cloze: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>走<rt>はし</rt></ruby>る___BLANK___なった。',
        clozeAnswer: 'ように',
        tokens: ['まいあさ', 'はしるようになった', '。'] }
    ],
    contrasts: ['tsumori']
  },

  /* @feltöltés:kezdet — a leckék mintái (leckénként, a tanulási út sorrendjében) */
  /* ── l1 ── */
  {
    id: 'wa_desu', label: '〜は 〜です', jlpt: 'N5', category: 'basic', lesson: 'l1',
    summary: 'Azonosítás: „A az B."',
    structure: 'főnév は főnév です',
    explanation: 'A は a mondat témáját jelöli, a です pedig udvariasan lezárja az állítást. A „vagyok, vagy, van" jelentést a です hordozza, személytől függetlenül.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。',
        kana: 'わたしはがくせいです。', romaji: 'watashi wa gakusei desu.', hu: 'Diák vagyok.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>___BLANK___<ruby>学生<rt>がくせい</rt></ruby>です。', clozeAnswer: 'は',
        tokens: ['わたし', 'は', 'がくせいです', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>先生<rt>せんせい</rt></ruby>です。',
        kana: 'たなかさんはせんせいです。', romaji: 'tanaka-san wa sensei desu.', hu: 'Tanaka tanár.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さん___BLANK___<ruby>先生<rt>せんせい</rt></ruby>です。', clozeAnswer: 'は',
        tokens: ['たなかさん', 'は', 'せんせいです', '。'] }
    ],
    contrasts: ['mo_also', 'no_possession']
  },
  {
    id: 'no_possession', label: '〜の 〜', jlpt: 'N5', category: 'basic', lesson: 'l1',
    summary: 'Birtok vagy hovatartozás: „A-nak a B-je."',
    structure: 'főnév の főnév',
    explanation: 'A の két főnevet köt össze: az első pontosítja a másodikat. Birtokost, hovatartozást és fajtát is így mondunk; a sorrend: előbb a birtokos, utána a birtok.',
    examples: [
      { jp: 'これは<ruby>私<rt>わたし</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>です。',
        kana: 'これはわたしのほんです。', romaji: 'kore wa watashi no hon desu.', hu: 'Ez az én könyvem.',
        cloze: 'これは<ruby>私<rt>わたし</rt></ruby>___BLANK___<ruby>本<rt>ほん</rt></ruby>です。', clozeAnswer: 'の',
        tokens: ['これは', 'わたしの', 'ほんです', '。'] },
      { jp: '<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>先生<rt>せんせい</rt></ruby>です。',
        kana: 'にほんごのせんせいです。', romaji: 'nihongo no sensei desu.', hu: 'Japántanár.',
        cloze: '<ruby>日本語<rt>にほんご</rt></ruby>___BLANK___<ruby>先生<rt>せんせい</rt></ruby>です。', clozeAnswer: 'の',
        tokens: ['にほんごの', 'せんせいです', '。'] }
    ],
    contrasts: ['wa_desu', 'mo_also']
  },
  {
    id: 'mo_also', label: '〜も', jlpt: 'N5', category: 'basic', lesson: 'l1',
    summary: '„Is": ugyanaz igaz erre is.',
    structure: 'főnév も (a は helyén)',
    explanation: 'A も a は helyére lép, és azt jelenti: „is". A は és a も együtt nem állhat; tagadó mondatban „sem" lesz belőle.',
    examples: [
      { jp: 'リーさんも<ruby>学生<rt>がくせい</rt></ruby>です。',
        kana: 'リーさんもがくせいです。', romaji: 'rii-san mo gakusei desu.', hu: 'Lí is diák.',
        cloze: 'リーさん___BLANK___<ruby>学生<rt>がくせい</rt></ruby>です。', clozeAnswer: 'も',
        tokens: ['リーさん', 'も', 'がくせいです', '。'] },
      { jp: '<ruby>私<rt>わたし</rt></ruby>もハンガリー<ruby>人<rt>じん</rt></ruby>です。',
        kana: 'わたしもハンガリーじんです。', romaji: 'watashi mo hangariijin desu.', hu: 'Én is magyar vagyok.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>___BLANK___ハンガリー<ruby>人<rt>じん</rt></ruby>です。', clozeAnswer: 'も',
        tokens: ['わたし', 'も', 'ハンガリーじんです', '。'] }
    ],
    contrasts: ['wa_desu']
  },
  {
    id: 'ka_question', label: '〜か', jlpt: 'N5', category: 'basic', lesson: 'l1',
    summary: 'Eldöntendő kérdés: a mondat végén か áll.',
    structure: 'mondat + か',
    explanation: 'A mondat végére tett か kérdéssé teszi az állítást; a szórend nem változik. A válasz はい vagy いいえ.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>先生<rt>せんせい</rt></ruby>ですか。',
        kana: 'たなかさんはせんせいですか。', romaji: 'tanaka-san wa sensei desu ka.', hu: 'Tanaka tanár?',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>先生<rt>せんせい</rt></ruby>です___BLANK___。', clozeAnswer: 'か',
        tokens: ['たなかさんは', 'せんせいですか', '。'] },
      { jp: 'リーさんは<ruby>中国人<rt>ちゅうごくじん</rt></ruby>ですか。',
        kana: 'リーさんはちゅうごくじんですか。', romaji: 'rii-san wa chuugokujin desu ka.', hu: 'Lí kínai?',
        cloze: 'リーさんは<ruby>中国人<rt>ちゅうごくじん</rt></ruby>です___BLANK___。', clozeAnswer: 'か',
        tokens: ['リーさんは', 'ちゅうごくじんですか', '。'] }
    ],
    contrasts: ['wa_desu']
  },

  /* ── l2 ── */
  {
    id: 'kore_sore_are', label: 'これ・それ・あれ', jlpt: 'N5', category: 'basic', lesson: 'l2',
    summary: 'Rámutatás egy tárgyra: „ez, az, amaz".',
    structure: 'これ / それ / あれ + は',
    explanation: 'Önállóan álló mutatószók: a これ a beszélőhöz, a それ a hallgatóhoz van közel, az あれ mindkettőtől távol. Utánuk nem állhat főnév.',
    examples: [
      { jp: 'これは<ruby>辞書<rt>じしょ</rt></ruby>です。',
        kana: 'これはじしょです。', romaji: 'kore wa jisho desu.', hu: 'Ez szótár.',
        cloze: '___BLANK___は<ruby>辞書<rt>じしょ</rt></ruby>です。', clozeAnswer: 'これ',
        tokens: ['これは', 'じしょです', '。'] },
      { jp: 'あれは<ruby>何<rt>なん</rt></ruby>ですか。',
        kana: 'あれはなんですか。', romaji: 'are wa nan desu ka.', hu: 'Az ott mi?',
        cloze: '___BLANK___は<ruby>何<rt>なん</rt></ruby>ですか。', clozeAnswer: 'あれ',
        tokens: ['あれは', 'なんですか', '。'] }
    ],
    contrasts: ['kono_sono_ano', 'koko_soko_asoko']
  },
  {
    id: 'kono_sono_ano', label: 'この・その・あの', jlpt: 'N5', category: 'basic', lesson: 'l2',
    summary: 'Rámutatás főnévvel: „ez a…, az a…".',
    structure: 'この / その / あの + főnév',
    explanation: 'Ezek mindig főnév előtt állnak, önállóan soha. A távolság ugyanúgy oszlik meg, mint a これ・それ・あれ sorban.',
    examples: [
      { jp: 'このかばんは<ruby>私<rt>わたし</rt></ruby>のです。',
        kana: 'このかばんはわたしのです。', romaji: 'kono kaban wa watashi no desu.', hu: 'Ez a táska az enyém.',
        cloze: '___BLANK___かばんは<ruby>私<rt>わたし</rt></ruby>のです。', clozeAnswer: 'この',
        tokens: ['この', 'かばんは', 'わたしのです', '。'] },
      { jp: 'あの<ruby>人<rt>ひと</rt></ruby>はだれですか。',
        kana: 'あのひとはだれですか。', romaji: 'ano hito wa dare desu ka.', hu: 'Ki az az ember ott?',
        cloze: '___BLANK___<ruby>人<rt>ひと</rt></ruby>はだれですか。', clozeAnswer: 'あの',
        tokens: ['あの', 'ひとは', 'だれですか', '。'] }
    ],
    contrasts: ['kore_sore_are']
  },
  {
    id: 'koko_soko_asoko', label: 'ここ・そこ・あそこ', jlpt: 'N5', category: 'existence', lesson: 'l2',
    summary: 'Hely megnevezése: „itt, ott, amott".',
    structure: 'ここ / そこ / あそこ + は / です',
    explanation: 'Helyre mutató szók. A „hol?" kérdőszava どこ; udvariasabban こちら, そちら, あちら, どちら.',
    examples: [
      { jp: 'トイレはあそこです。',
        kana: 'トイレはあそこです。', romaji: 'toire wa asoko desu.', hu: 'A mosdó ott van.',
        cloze: 'トイレは___BLANK___です。', clozeAnswer: 'あそこ',
        tokens: ['トイレは', 'あそこです', '。'] },
      { jp: 'ここは<ruby>図書館<rt>としょかん</rt></ruby>です。',
        kana: 'ここはとしょかんです。', romaji: 'koko wa toshokan desu.', hu: 'Ez itt a könyvtár.',
        cloze: '___BLANK___は<ruby>図書館<rt>としょかん</rt></ruby>です。', clozeAnswer: 'ここ',
        tokens: ['ここは', 'としょかんです', '。'] }
    ],
    contrasts: ['kore_sore_are']
  },
  {
    id: 'ja_arimasen', label: '〜じゃありません', jlpt: 'N5', category: 'basic', lesson: 'l2',
    summary: 'Főnév tagadása: „A nem B."',
    structure: 'főnév + じゃありません / ではありません',
    explanation: 'A です tagadása. Beszédben じゃありません, írásban és hivatalosabban ではありません.',
    examples: [
      { jp: 'これは<ruby>私<rt>わたし</rt></ruby>のかさじゃありません。',
        kana: 'これはわたしのかさじゃありません。', romaji: 'kore wa watashi no kasa ja arimasen.', hu: 'Ez nem az én esernyőm.',
        cloze: 'これは<ruby>私<rt>わたし</rt></ruby>のかさ___BLANK___。', clozeAnswer: 'じゃありません',
        tokens: ['これは', 'わたしのかさ', 'じゃありません', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>学生<rt>がくせい</rt></ruby>じゃありません。',
        kana: 'たなかさんはがくせいじゃありません。', romaji: 'tanaka-san wa gakusei ja arimasen.', hu: 'Tanaka nem diák.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>学生<rt>がくせい</rt></ruby>___BLANK___。', clozeAnswer: 'じゃありません',
        tokens: ['たなかさんは', 'がくせい', 'じゃありません', '。'] }
    ],
    contrasts: ['wa_desu']
  },

  /* ── l3 ── */
  {
    id: 'ni_ga_arimasu', label: '〜に 〜が あります / います', jlpt: 'N5', category: 'existence', lesson: 'l3',
    summary: 'Valahol van valami vagy valaki.',
    structure: 'hely に + dolog が あります / élőlény が います',
    explanation: 'Új dolgot mutatsz be egy helyen: a hely に-t, a dolog が-t kap. Tárgyra és növényre あります, emberre és állatra います.',
    examples: [
      { jp: '<ruby>公園<rt>こうえん</rt></ruby>に<ruby>犬<rt>いぬ</rt></ruby>がいます。',
        kana: 'こうえんにいぬがいます。', romaji: 'kouen ni inu ga imasu.', hu: 'A parkban van egy kutya.',
        cloze: '<ruby>公園<rt>こうえん</rt></ruby>に<ruby>犬<rt>いぬ</rt></ruby>が___BLANK___。', clozeAnswer: 'います',
        tokens: ['こうえんに', 'いぬが', 'います', '。'] },
      { jp: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>があります。',
        kana: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', hu: 'Az asztalon van egy könyv.',
        cloze: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>が___BLANK___。', clozeAnswer: 'あります',
        tokens: ['つくえのうえに', 'ほんが', 'あります', '。'] }
    ],
    contrasts: ['wa_ni_arimasu']
  },
  {
    id: 'wa_ni_arimasu', label: '〜は 〜に あります / います', jlpt: 'N5', category: 'existence', lesson: 'l3',
    summary: 'Egy ismert dolog helye: „X ott van."',
    structure: 'dolog は + hely に あります / います',
    explanation: 'Itt a dolog már ismert (ezért は), és azt mondod meg, hol van. A kérdés: 〜は どこに ありますか。',
    examples: [
      { jp: '<ruby>銀行<rt>ぎんこう</rt></ruby>は<ruby>駅<rt>えき</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>にあります。',
        kana: 'ぎんこうはえきのまえにあります。', romaji: 'ginkou wa eki no mae ni arimasu.', hu: 'A bank az állomás előtt van.',
        cloze: '<ruby>銀行<rt>ぎんこう</rt></ruby>___BLANK___<ruby>駅<rt>えき</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>にあります。', clozeAnswer: 'は',
        tokens: ['ぎんこうは', 'えきのまえに', 'あります', '。'] },
      { jp: '<ruby>猫<rt>ねこ</rt></ruby>はいすの<ruby>下<rt>した</rt></ruby>にいます。',
        kana: 'ねこはいすのしたにいます。', romaji: 'neko wa isu no shita ni imasu.', hu: 'A macska a szék alatt van.',
        cloze: '<ruby>猫<rt>ねこ</rt></ruby>___BLANK___いすの<ruby>下<rt>した</rt></ruby>にいます。', clozeAnswer: 'は',
        tokens: ['ねこは', 'いすのしたに', 'います', '。'] }
    ],
    contrasts: ['ni_ga_arimasu', 'de_place']
  },
  {
    id: 'daremo_imasen', label: 'だれも・なにも + 〜ません', jlpt: 'N5', category: 'existence', lesson: 'l3',
    summary: '„Senki, semmi": teljes tagadás kérdőszóval.',
    structure: 'kérdőszó + も + tagadó ige',
    explanation: 'A kérdőszó és a も együtt, tagadó igével „senki, semmi, sehol" jelentést ad. A が és a を ilyenkor elmarad.',
    examples: [
      { jp: '<ruby>部屋<rt>へや</rt></ruby>にだれもいません。',
        kana: 'へやにだれもいません。', romaji: 'heya ni dare mo imasen.', hu: 'Senki sincs a szobában.',
        cloze: '<ruby>部屋<rt>へや</rt></ruby>にだれ___BLANK___いません。', clozeAnswer: 'も',
        tokens: ['へやに', 'だれも', 'いません', '。'] },
      { jp: '<ruby>箱<rt>はこ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>に<ruby>何<rt>なに</rt></ruby>もありません。',
        kana: 'はこのなかになにもありません。', romaji: 'hako no naka ni nani mo arimasen.', hu: 'Semmi sincs a dobozban.',
        cloze: '<ruby>箱<rt>はこ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>に<ruby>何<rt>なに</rt></ruby>___BLANK___ありません。', clozeAnswer: 'も',
        tokens: ['はこのなかに', 'なにも', 'ありません', '。'] }
    ],
    contrasts: ['mo_also', 'ni_ga_arimasu']
  },
  {
    id: 'to_ya', label: '〜と・〜や', jlpt: 'N5', category: 'particle', lesson: 'l3',
    summary: 'Felsorolás: „és" (teljes vagy példálózó).',
    structure: 'főnév と főnév · főnév や főnév (など)',
    explanation: 'A と teljes felsorolás: csak ezek vannak. A や példákat sorol: ezek és még mások is. Mindkettő csak főneveket köt össze.',
    examples: [
      { jp: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>とペンがあります。',
        kana: 'つくえのうえにほんとペンがあります。', romaji: 'tsukue no ue ni hon to pen ga arimasu.', hu: 'Az asztalon egy könyv és egy toll van.',
        cloze: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>___BLANK___ペンがあります。', clozeAnswer: 'と',
        tokens: ['つくえのうえに', 'ほんとペンが', 'あります', '。'] },
      { jp: 'かばんの<ruby>中<rt>なか</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>やノートがあります。',
        kana: 'かばんのなかにほんやノートがあります。', romaji: 'kaban no naka ni hon ya nooto ga arimasu.', hu: 'A táskában könyvek, füzetek és hasonlók vannak.',
        cloze: 'かばんの<ruby>中<rt>なか</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>___BLANK___ノートがあります。', clozeAnswer: 'や',
        tokens: ['かばんのなかに', 'ほんやノートが', 'あります', '。'] }
    ],
    contrasts: ['to_with']
  },

  /* ── l4 ── */
  {
    id: 'wo_kudasai', label: '〜を ください', jlpt: 'N5', category: 'request', lesson: 'l4',
    summary: 'Kérsz valamit: „Kérek egy…"',
    structure: 'főnév を (+ mennyiség) ください',
    explanation: 'Boltban, étteremben így kérsz. A mennyiség a を után, a ください előtt áll, partikula nélkül.',
    examples: [
      { jp: 'これをください。',
        kana: 'これをください。', romaji: 'kore o kudasai.', hu: 'Ezt kérem.',
        cloze: 'これ___BLANK___ください。', clozeAnswer: 'を',
        tokens: ['これを', 'ください', '。'] },
      { jp: 'りんごを<ruby>三<rt>みっ</rt></ruby>つください。',
        kana: 'りんごをみっつください。', romaji: 'ringo o mittsu kudasai.', hu: 'Három almát kérek.',
        cloze: 'りんごを<ruby>三<rt>みっ</rt></ruby>つ___BLANK___。', clozeAnswer: 'ください',
        tokens: ['りんごを', 'みっつ', 'ください', '。'] }
    ],
    contrasts: ['te_kudasai', 'ni_shimasu']
  },
  {
    id: 'ikura', label: 'いくらですか', jlpt: 'N5', category: 'basic', lesson: 'l4',
    summary: 'Az ár megkérdezése: „Mennyibe kerül?"',
    structure: 'főnév は いくらですか',
    explanation: 'Az いくら az ár kérdőszava. A válaszban a szám után 円 áll: 五百円です。',
    examples: [
      { jp: 'このかばんはいくらですか。',
        kana: 'このかばんはいくらですか。', romaji: 'kono kaban wa ikura desu ka.', hu: 'Mennyibe kerül ez a táska?',
        cloze: 'このかばんは___BLANK___ですか。', clozeAnswer: 'いくら',
        tokens: ['この', 'かばんは', 'いくらですか', '。'] },
      { jp: 'コーヒーはいくらですか。',
        kana: 'コーヒーはいくらですか。', romaji: 'koohii wa ikura desu ka.', hu: 'Mennyibe kerül a kávé?',
        cloze: 'コーヒーは___BLANK___ですか。', clozeAnswer: 'いくら',
        tokens: ['コーヒーは', 'いくらですか', '。'] }
    ],
    contrasts: ['nan_ji']
  },
  {
    id: 'kara_made', label: '〜から 〜まで', jlpt: 'N5', category: 'particle', lesson: 'l4',
    summary: 'Kezdő- és végpont: „…-tól …-ig".',
    structure: 'idő / hely から + idő / hely まで',
    explanation: 'A から a kiindulópont, a まで a végpont; időre és helyre egyaránt jó. Külön-külön is használhatók.',
    examples: [
      { jp: '<ruby>銀行<rt>ぎんこう</rt></ruby>は<ruby>九時<rt>くじ</rt></ruby>から<ruby>三時<rt>さんじ</rt></ruby>までです。',
        kana: 'ぎんこうはくじからさんじまでです。', romaji: 'ginkou wa kuji kara sanji made desu.', hu: 'A bank kilenctől háromig van nyitva.',
        cloze: '<ruby>銀行<rt>ぎんこう</rt></ruby>は<ruby>九時<rt>くじ</rt></ruby>___BLANK___<ruby>三時<rt>さんじ</rt></ruby>までです。', clozeAnswer: 'から',
        tokens: ['ぎんこうは', 'くじから', 'さんじまでです', '。'] },
      { jp: '<ruby>月曜日<rt>げつようび</rt></ruby>から<ruby>金曜日<rt>きんようび</rt></ruby>まで<ruby>働<rt>はたら</rt></ruby>きます。',
        kana: 'げつようびからきんようびまではたらきます。', romaji: 'getsuyoubi kara kinyoubi made hatarakimasu.', hu: 'Hétfőtől péntekig dolgozom.',
        cloze: '<ruby>月曜日<rt>げつようび</rt></ruby>から<ruby>金曜日<rt>きんようび</rt></ruby>___BLANK___<ruby>働<rt>はたら</rt></ruby>きます。', clozeAnswer: 'まで',
        tokens: ['げつようびから', 'きんようびまで', 'はたらきます', '。'] }
    ],
    contrasts: ['kara_reason']
  },
  {
    id: 'nan_ji', label: '何時・何曜日', jlpt: 'N5', category: 'sequence', lesson: 'l4',
    summary: 'Időpont vagy nap megkérdezése: „Hány óra? Milyen nap?"',
    structure: '今 何時ですか · 何曜日ですか',
    explanation: 'Az órát 何時, a hét napját 何曜日 kérdezi. A 4, a 7 és a 9 óra olvasata rendhagyó: よじ, しちじ, くじ.',
    examples: [
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>何時<rt>なんじ</rt></ruby>ですか。',
        kana: 'いまなんじですか。', romaji: 'ima nanji desu ka.', hu: 'Hány óra van most?',
        cloze: '<ruby>今<rt>いま</rt></ruby>___BLANK___ですか。', clozeAnswer: 'なんじ',
        tokens: ['いま', 'なんじですか', '。'] },
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>何曜日<rt>なんようび</rt></ruby>ですか。',
        kana: 'きょうはなんようびですか。', romaji: 'kyou wa nanyoubi desu ka.', hu: 'Milyen nap van ma?',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は___BLANK___ですか。', clozeAnswer: 'なんようび',
        tokens: ['きょうは', 'なんようびですか', '。'] }
    ],
    contrasts: ['ikura']
  },

  /* ── l5 ── */
  {
    id: 'masu_forms', label: '〜ます・〜ません・〜ました', jlpt: 'N5', category: 'basic', lesson: 'l5',
    summary: 'Udvarias igealak: jelen, tagadás, múlt.',
    structure: 'ます-tő + ます / ません / ました / ませんでした',
    explanation: 'Az udvarias igealak négy formája. A jelen a jövőt és a szokást is kifejezi; a személyt az ige nem jelöli.',
    examples: [
      { jp: '<ruby>昨日<rt>きのう</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きました。',
        kana: 'きのうとしょかんへいきました。', romaji: 'kinou toshokan e ikimashita.', hu: 'Tegnap könyvtárba mentem.',
        cloze: '<ruby>昨日<rt>きのう</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>き___BLANK___。', clozeAnswer: 'ました',
        tokens: ['きのう', 'としょかんへ', 'いきました', '。'] },
      { jp: '<ruby>日曜日<rt>にちようび</rt></ruby>は<ruby>働<rt>はたら</rt></ruby>きません。',
        kana: 'にちようびははたらきません。', romaji: 'nichiyoubi wa hatarakimasen.', hu: 'Vasárnap nem dolgozom.',
        cloze: '<ruby>日曜日<rt>にちようび</rt></ruby>は<ruby>働<rt>はたら</rt></ruby>き___BLANK___。', clozeAnswer: 'ません',
        tokens: ['にちようびは', 'はたらきません', '。'] }
    ],
    contrasts: []
  },
  {
    id: 'he_ikimasu', label: '〜へ / 〜に 行きます', jlpt: 'N5', category: 'particle', lesson: 'l5',
    summary: 'A mozgás iránya: „valahová megyek".',
    structure: 'hely へ / に + 行きます・来ます・帰ります',
    explanation: 'A へ (ejtsd: e) az irányt, a に a célpontot jelöli; mozgást jelentő igével szinte mindig felcserélhetők.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby><ruby>京都<rt>きょうと</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'あしたきょうとへいきます。', romaji: 'ashita kyouto e ikimasu.', hu: 'Holnap Kiotóba megyek.',
        cloze: '<ruby>明日<rt>あした</rt></ruby><ruby>京都<rt>きょうと</rt></ruby>___BLANK___<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'へ',
        tokens: ['あした', 'きょうとへ', 'いきます', '。'] },
      { jp: '<ruby>七時<rt>しちじ</rt></ruby>にうちへ<ruby>帰<rt>かえ</rt></ruby>ります。',
        kana: 'しちじにうちへかえります。', romaji: 'shichiji ni uchi e kaerimasu.', hu: 'Hétkor megyek haza.',
        cloze: '<ruby>七時<rt>しちじ</rt></ruby>にうち___BLANK___<ruby>帰<rt>かえ</rt></ruby>ります。', clozeAnswer: 'へ',
        tokens: ['しちじに', 'うちへ', 'かえります', '。'] }
    ],
    contrasts: ['de_place', 'ni_time']
  },
  {
    id: 'de_means', label: '〜で (eszköz)', jlpt: 'N5', category: 'particle', lesson: 'l5',
    summary: 'Eszköz vagy jármű: „valamivel".',
    structure: 'eszköz / jármű で + ige',
    explanation: 'A で megmondja, mivel történik a cselekvés: járművel, szerszámmal, nyelven. Gyalog: 歩いて (で nélkül).',
    examples: [
      { jp: 'バスで<ruby>学校<rt>がっこう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'バスでがっこうへいきます。', romaji: 'basu de gakkou e ikimasu.', hu: 'Busszal megyek iskolába.',
        cloze: 'バス___BLANK___<ruby>学校<rt>がっこう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'で',
        tokens: ['バスで', 'がっこうへ', 'いきます', '。'] },
      { jp: 'はしでごはんを<ruby>食<rt>た</rt></ruby>べます。',
        kana: 'はしでごはんをたべます。', romaji: 'hashi de gohan o tabemasu.', hu: 'Pálcikával eszem a rizst.',
        cloze: 'はし___BLANK___ごはんを<ruby>食<rt>た</rt></ruby>べます。', clozeAnswer: 'で',
        tokens: ['はしで', 'ごはんを', 'たべます', '。'] }
    ],
    contrasts: ['de_place', 'to_with']
  },
  {
    id: 'to_with', label: '〜と (társ)', jlpt: 'N5', category: 'particle', lesson: 'l5',
    summary: 'Társ: „valakivel együtt".',
    structure: 'személy と + ige',
    explanation: 'A と itt azt jelöli, kivel együtt csinálsz valamit. Egyedül: 一人で.',
    examples: [
      { jp: '<ruby>友<rt>とも</rt></ruby>だちと<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ます。',
        kana: 'ともだちとえいがをみます。', romaji: 'tomodachi to eiga o mimasu.', hu: 'A barátommal filmet nézek.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だち___BLANK___<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ます。', clozeAnswer: 'と',
        tokens: ['ともだちと', 'えいがを', 'みます', '。'] },
      { jp: '<ruby>家族<rt>かぞく</rt></ruby>と<ruby>日本<rt>にほん</rt></ruby>へ<ruby>来<rt>き</rt></ruby>ました。',
        kana: 'かぞくとにほんへきました。', romaji: 'kazoku to nihon e kimashita.', hu: 'A családommal jöttem Japánba.',
        cloze: '<ruby>家族<rt>かぞく</rt></ruby>___BLANK___<ruby>日本<rt>にほん</rt></ruby>へ<ruby>来<rt>き</rt></ruby>ました。', clozeAnswer: 'と',
        tokens: ['かぞくと', 'にほんへ', 'きました', '。'] }
    ],
    contrasts: ['to_ya', 'de_means']
  },
  {
    id: 'ni_time', label: '〜に (időpont)', jlpt: 'N5', category: 'particle', lesson: 'l5',
    summary: 'Pontos időpont: „…-kor, …-án".',
    structure: 'óra / dátum / nap に + ige',
    explanation: 'Számmal megadható időpont után に áll. A viszonyított időszavak (今日, 明日, 毎日, 来週) után nem.',
    examples: [
      { jp: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>六時<rt>ろくじ</rt></ruby>に<ruby>起<rt>お</rt></ruby>きます。',
        kana: 'まいあさろくじにおきます。', romaji: 'maiasa rokuji ni okimasu.', hu: 'Minden reggel hatkor kelek.',
        cloze: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>六時<rt>ろくじ</rt></ruby>___BLANK___<ruby>起<rt>お</rt></ruby>きます。', clozeAnswer: 'に',
        tokens: ['まいあさ', 'ろくじに', 'おきます', '。'] },
      { jp: '<ruby>日曜日<rt>にちようび</rt></ruby>に<ruby>友<rt>とも</rt></ruby>だちに<ruby>会<rt>あ</rt></ruby>います。',
        kana: 'にちようびにともだちにあいます。', romaji: 'nichiyoubi ni tomodachi ni aimasu.', hu: 'Vasárnap találkozom a barátommal.',
        cloze: '<ruby>日曜日<rt>にちようび</rt></ruby>___BLANK___<ruby>友<rt>とも</rt></ruby>だちに<ruby>会<rt>あ</rt></ruby>います。', clozeAnswer: 'に',
        tokens: ['にちようびに', 'ともだちに', 'あいます', '。'] }
    ],
    contrasts: ['he_ikimasu', 'de_place']
  },

  /* ── l6 ── */
  {
    id: 'wo_object', label: '〜を (tárgy)', jlpt: 'N5', category: 'particle', lesson: 'l6',
    summary: 'A cselekvés tárgya: „valamit".',
    structure: 'főnév を + ige',
    explanation: 'A を (ejtsd: o) a tárgyat jelöli: amit eszel, olvasol, nézel. Mindig közvetlenül a tárgy után áll.',
    examples: [
      { jp: '<ruby>毎日<rt>まいにち</rt></ruby><ruby>新聞<rt>しんぶん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        kana: 'まいにちしんぶんをよみます。', romaji: 'mainichi shinbun o yomimasu.', hu: 'Minden nap újságot olvasok.',
        cloze: '<ruby>毎日<rt>まいにち</rt></ruby><ruby>新聞<rt>しんぶん</rt></ruby>___BLANK___<ruby>読<rt>よ</rt></ruby>みます。', clozeAnswer: 'を',
        tokens: ['まいにち', 'しんぶんを', 'よみます', '。'] },
      { jp: '<ruby>朝<rt>あさ</rt></ruby>コーヒーを<ruby>飲<rt>の</rt></ruby>みます。',
        kana: 'あさコーヒーをのみます。', romaji: 'asa koohii o nomimasu.', hu: 'Reggel kávét iszom.',
        cloze: '<ruby>朝<rt>あさ</rt></ruby>コーヒー___BLANK___<ruby>飲<rt>の</rt></ruby>みます。', clozeAnswer: 'を',
        tokens: ['あさ', 'コーヒーを', 'のみます', '。'] }
    ],
    contrasts: ['de_place', 'ga_suki']
  },
  {
    id: 'de_place', label: '〜で (helyszín)', jlpt: 'N5', category: 'particle', lesson: 'l6',
    summary: 'A cselekvés helyszíne: „valahol csinálok valamit".',
    structure: 'hely で + cselekvést jelentő ige',
    explanation: 'Ahol valami történik, az で-t kap. A puszta létezés helye に (あります, います), a cselekvésé で.',
    examples: [
      { jp: '<ruby>図書館<rt>としょかん</rt></ruby>で<ruby>勉強<rt>べんきょう</rt></ruby>します。',
        kana: 'としょかんでべんきょうします。', romaji: 'toshokan de benkyou shimasu.', hu: 'A könyvtárban tanulok.',
        cloze: '<ruby>図書館<rt>としょかん</rt></ruby>___BLANK___<ruby>勉強<rt>べんきょう</rt></ruby>します。', clozeAnswer: 'で',
        tokens: ['としょかんで', 'べんきょうします', '。'] },
      { jp: '<ruby>喫茶店<rt>きっさてん</rt></ruby>で<ruby>友<rt>とも</rt></ruby>だちと<ruby>話<rt>はな</rt></ruby>します。',
        kana: 'きっさてんでともだちとはなします。', romaji: 'kissaten de tomodachi to hanashimasu.', hu: 'A kávézóban beszélgetek a barátommal.',
        cloze: '<ruby>喫茶店<rt>きっさてん</rt></ruby>___BLANK___<ruby>友<rt>とも</rt></ruby>だちと<ruby>話<rt>はな</rt></ruby>します。', clozeAnswer: 'で',
        tokens: ['きっさてんで', 'ともだちと', 'はなします', '。'] }
    ],
    contrasts: ['de_means', 'wa_ni_arimasu']
  },
  {
    id: 'ni_iku_purpose', label: '〜に 行きます (cél)', jlpt: 'N5', category: 'reason', lesson: 'l6',
    summary: 'A mozgás célja: „megyek valamit csinálni".',
    structure: 'ます-tő + に + 行きます / 来ます / 帰ります',
    explanation: 'Az ige ます-töve és a に megmondja, miért mész oda. A helyet előtte へ vagy に jelöli.',
    examples: [
      { jp: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'えいがをみにいきます。', romaji: 'eiga o mi ni ikimasu.', hu: 'Megyek filmet nézni.',
        cloze: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>___BLANK___<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'に',
        tokens: ['えいがを', 'みに', 'いきます', '。'] },
      { jp: 'デパートへ<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。',
        kana: 'デパートへかいものにいきました。', romaji: 'depaato e kaimono ni ikimashita.', hu: 'Áruházba mentem vásárolni.',
        cloze: 'デパートへ<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>___BLANK___<ruby>行<rt>い</rt></ruby>きました。', clozeAnswer: 'に',
        tokens: ['デパートへ', 'かいものに', 'いきました', '。'] }
    ],
    contrasts: ['he_ikimasu']
  },
  {
    id: 'masenka', label: '〜ませんか', jlpt: 'N5', category: 'invitation', lesson: 'l6',
    summary: 'Meghívás: „Nem …-nánk?"',
    structure: 'ます-tő + ませんか',
    explanation: 'Udvarias meghívás: a tagadó kérdés teret hagy a másiknak. Elfogadás: ええ、いいですね。 Elhárítás: すみません、ちょっと…。',
    examples: [
      { jp: 'いっしょに<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ませんか。',
        kana: 'いっしょにえいがをみませんか。', romaji: 'issho ni eiga o mimasen ka.', hu: 'Nem néznénk meg együtt egy filmet?',
        cloze: 'いっしょに<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>___BLANK___。', clozeAnswer: 'ませんか',
        tokens: ['いっしょに', 'えいがを', 'みませんか', '。'] },
      { jp: '<ruby>明日<rt>あした</rt></ruby>テニスをしませんか。',
        kana: 'あしたテニスをしませんか。', romaji: 'ashita tenisu o shimasen ka.', hu: 'Nem teniszeznénk holnap?',
        cloze: '<ruby>明日<rt>あした</rt></ruby>テニスをし___BLANK___。', clozeAnswer: 'ませんか',
        tokens: ['あした', 'テニスを', 'しませんか', '。'] }
    ],
    contrasts: ['mashou', 'mashouka']
  },
  {
    id: 'mashou', label: '〜ましょう', jlpt: 'N5', category: 'invitation', lesson: 'l6',
    summary: 'Javaslat vagy beleegyezés: „…-junk!"',
    structure: 'ます-tő + ましょう',
    explanation: 'Közös cselekvésre hív, vagy egy meghívásra felel. Határozottabb, mint a 〜ませんか.',
    examples: [
      { jp: '<ruby>少<rt>すこ</rt></ruby>し<ruby>休<rt>やす</rt></ruby>みましょう。',
        kana: 'すこしやすみましょう。', romaji: 'sukoshi yasumimashou.', hu: 'Pihenjünk egy kicsit!',
        cloze: '<ruby>少<rt>すこ</rt></ruby>し<ruby>休<rt>やす</rt></ruby>み___BLANK___。', clozeAnswer: 'ましょう',
        tokens: ['すこし', 'やすみましょう', '。'] },
      { jp: 'ええ、<ruby>行<rt>い</rt></ruby>きましょう。',
        kana: 'ええ、いきましょう。', romaji: 'ee, ikimashou.', hu: 'Jó, menjünk!',
        cloze: 'ええ、<ruby>行<rt>い</rt></ruby>き___BLANK___。', clozeAnswer: 'ましょう',
        tokens: ['ええ', '、', 'いきましょう', '。'] }
    ],
    contrasts: ['masenka', 'mashouka']
  },

  /* ── l7 ── */
  {
    id: 'ga_suki', label: '〜が 好きです', jlpt: 'N5', category: 'description', lesson: 'l7',
    summary: 'Mit szeretsz és mit nem.',
    structure: 'főnév が 好きです / きらいです',
    explanation: 'A 好き és a きらい melléknév, nem ige: amit szeretsz, az が-t kap, nem を-t.',
    examples: [
      { jp: '<ruby>音楽<rt>おんがく</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'おんがくがすきです。', romaji: 'ongaku ga suki desu.', hu: 'Szeretem a zenét.',
        cloze: '<ruby>音楽<rt>おんがく</rt></ruby>___BLANK___<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'が',
        tokens: ['おんがくが', 'すきです', '。'] },
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>魚<rt>さかな</rt></ruby>が<ruby>好<rt>す</rt></ruby>きじゃありません。',
        kana: 'わたしはさかながすきじゃありません。', romaji: 'watashi wa sakana ga suki ja arimasen.', hu: 'Nem szeretem a halat.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>魚<rt>さかな</rt></ruby>が___BLANK___じゃありません。', clozeAnswer: 'すき',
        tokens: ['わたしは', 'さかなが', 'すきじゃありません', '。'] }
    ],
    contrasts: ['ga_jouzu', 'wo_object']
  },
  {
    id: 'ga_jouzu', label: '〜が 上手です・わかります', jlpt: 'N5', category: 'description', lesson: 'l7',
    summary: 'Miben vagy jó, mit értesz.',
    structure: 'főnév が 上手です / 下手です / わかります / できます',
    explanation: 'A képesség és a megértés tárgya is が-t kap. Magadról a 上手 szerénytelenül hangzik: mondd inkább: まだまだです。',
    examples: [
      { jp: 'リーさんは<ruby>料理<rt>りょうり</rt></ruby>が<ruby>上手<rt>じょうず</rt></ruby>です。',
        kana: 'リーさんはりょうりがじょうずです。', romaji: 'rii-san wa ryouri ga jouzu desu.', hu: 'Lí jól főz.',
        cloze: 'リーさんは<ruby>料理<rt>りょうり</rt></ruby>___BLANK___<ruby>上手<rt>じょうず</rt></ruby>です。', clozeAnswer: 'が',
        tokens: ['リーさんは', 'りょうりが', 'じょうずです', '。'] },
      { jp: '<ruby>日本語<rt>にほんご</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>しわかります。',
        kana: 'にほんごがすこしわかります。', romaji: 'nihongo ga sukoshi wakarimasu.', hu: 'Egy kicsit értek japánul.',
        cloze: '<ruby>日本語<rt>にほんご</rt></ruby>___BLANK___<ruby>少<rt>すこ</rt></ruby>しわかります。', clozeAnswer: 'が',
        tokens: ['にほんごが', 'すこし', 'わかります', '。'] }
    ],
    contrasts: ['ga_suki']
  },
  {
    id: 'kara_reason', label: '〜から (ok)', jlpt: 'N5', category: 'reason', lesson: 'l7',
    summary: 'Ok: „mert…, ezért…"',
    structure: 'mondat + から、 következmény',
    explanation: 'A から az ok végére kerül: előbb az ok, utána a következmény. A どうして kérdésre 〜からです felel.',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>ですから、<ruby>行<rt>い</rt></ruby>きません。',
        kana: 'あめですから、いきません。', romaji: 'ame desu kara, ikimasen.', hu: 'Esik, ezért nem megyek.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>です___BLANK___、<ruby>行<rt>い</rt></ruby>きません。', clozeAnswer: 'から',
        tokens: ['あめですから', '、', 'いきません', '。'] },
      { jp: '<ruby>時間<rt>じかん</rt></ruby>がありませんから、タクシーで<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'じかんがありませんから、タクシーでいきます。', romaji: 'jikan ga arimasen kara, takushii de ikimasu.', hu: 'Nincs időm, ezért taxival megyek.',
        cloze: '<ruby>時間<rt>じかん</rt></ruby>がありません___BLANK___、タクシーで<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'から',
        tokens: ['じかんが', 'ありませんから', '、', 'タクシーで', 'いきます', '。'] }
    ],
    contrasts: ['node', 'kara_made', 'n_desu']
  },
  {
    id: 'wa_ga_contrast', label: '〜は…が、〜は…', jlpt: 'N5', category: 'contrast', lesson: 'l7',
    summary: 'Szembeállítás: „ezt igen, de azt nem".',
    structure: 'A は … が、B は …',
    explanation: 'Két dolgot állítasz szembe: mindkettő は-t kap, a tagmondatokat が („de") köti össze.',
    examples: [
      { jp: '<ruby>肉<rt>にく</rt></ruby>は<ruby>好<rt>す</rt></ruby>きですが、<ruby>魚<rt>さかな</rt></ruby>は<ruby>好<rt>す</rt></ruby>きじゃありません。',
        kana: 'にくはすきですが、さかなはすきじゃありません。', romaji: 'niku wa suki desu ga, sakana wa suki ja arimasen.', hu: 'A húst szeretem, de a halat nem.',
        cloze: '<ruby>肉<rt>にく</rt></ruby>は<ruby>好<rt>す</rt></ruby>きです___BLANK___、<ruby>魚<rt>さかな</rt></ruby>は<ruby>好<rt>す</rt></ruby>きじゃありません。', clozeAnswer: 'が',
        tokens: ['にくは', 'すきですが', '、', 'さかなは', 'すきじゃありません', '。'] },
      { jp: '<ruby>英語<rt>えいご</rt></ruby>はわかりますが、<ruby>中国語<rt>ちゅうごくご</rt></ruby>はわかりません。',
        kana: 'えいごはわかりますが、ちゅうごくごはわかりません。', romaji: 'eigo wa wakarimasu ga, chuugokugo wa wakarimasen.', hu: 'Angolul értek, de kínaiul nem.',
        cloze: '<ruby>英語<rt>えいご</rt></ruby>___BLANK___わかりますが、<ruby>中国語<rt>ちゅうごくご</rt></ruby>はわかりません。', clozeAnswer: 'は',
        tokens: ['えいごは', 'わかりますが', '、', 'ちゅうごくごは', 'わかりません', '。'] }
    ],
    contrasts: ['noni', 'ga_suki']
  },
  {
    id: 'amari_masen', label: 'あまり・ぜんぜん + 〜ません', jlpt: 'N5', category: 'degree', lesson: 'l7',
    summary: 'Ritkán vagy soha: „nem nagyon, egyáltalán nem".',
    structure: 'あまり / ぜんぜん + tagadó alak',
    explanation: 'Az あまり és a ぜんぜん csak tagadással áll. Állító párjuk: よく (gyakran), ときどき (néha).',
    examples: [
      { jp: 'テレビはあまり<ruby>見<rt>み</rt></ruby>ません。',
        kana: 'テレビはあまりみません。', romaji: 'terebi wa amari mimasen.', hu: 'Tévét nem nagyon nézek.',
        cloze: 'テレビは___BLANK___<ruby>見<rt>み</rt></ruby>ません。', clozeAnswer: 'あまり',
        tokens: ['テレビは', 'あまり', 'みません', '。'] },
      { jp: 'お<ruby>酒<rt>さけ</rt></ruby>はぜんぜん<ruby>飲<rt>の</rt></ruby>みません。',
        kana: 'おさけはぜんぜんのみません。', romaji: 'osake wa zenzen nomimasen.', hu: 'Alkoholt egyáltalán nem iszom.',
        cloze: 'お<ruby>酒<rt>さけ</rt></ruby>は___BLANK___<ruby>飲<rt>の</rt></ruby>みません。', clozeAnswer: 'ぜんぜん',
        tokens: ['おさけは', 'ぜんぜん', 'のみません', '。'] }
    ],
    contrasts: ['masu_forms']
  },

  /* ── l8 ── */
  {
    id: 'adj_noun', label: 'い / な + főnév', jlpt: 'N5', category: 'description', lesson: 'l8',
    summary: 'Jelző a főnév előtt: „milyen dolog".',
    structure: 'い-melléknév + főnév · な-melléknév + な + főnév',
    explanation: 'Az い-melléknév változatlanul áll a főnév előtt; a な-melléknév és a főnév közé な kerül.',
    examples: [
      { jp: '<ruby>静<rt>しず</rt></ruby>かな<ruby>町<rt>まち</rt></ruby>です。',
        kana: 'しずかなまちです。', romaji: 'shizuka na machi desu.', hu: 'Csendes város.',
        cloze: '<ruby>静<rt>しず</rt></ruby>か___BLANK___<ruby>町<rt>まち</rt></ruby>です。', clozeAnswer: 'な',
        tokens: ['しずかな', 'まちです', '。'] },
      { jp: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>車<rt>くるま</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        kana: 'あたらしいくるまをかいました。', romaji: 'atarashii kuruma o kaimashita.', hu: 'Új autót vettem.',
        cloze: '___BLANK___<ruby>車<rt>くるま</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。', clozeAnswer: 'あたらしい',
        tokens: ['あたらしい', 'くるまを', 'かいました', '。'] }
    ],
    contrasts: ['adj_negative', 'donna']
  },
  {
    id: 'adj_negative', label: '〜くないです・〜じゃありません', jlpt: 'N5', category: 'description', lesson: 'l8',
    summary: 'Melléknév tagadása: „nem ilyen".',
    structure: 'い → くないです · な-melléknév + じゃありません',
    explanation: 'Az い-melléknévnél az い helyére くない kerül (いい → よくない); a な-melléknév a főnevek módjára tagad.',
    examples: [
      { jp: 'この<ruby>本<rt>ほん</rt></ruby>は<ruby>高<rt>たか</rt></ruby>くないです。',
        kana: 'このほんはたかくないです。', romaji: 'kono hon wa takakunai desu.', hu: 'Ez a könyv nem drága.',
        cloze: 'この<ruby>本<rt>ほん</rt></ruby>は<ruby>高<rt>たか</rt></ruby>___BLANK___です。', clozeAnswer: 'くない',
        tokens: ['この', 'ほんは', 'たかくないです', '。'] },
      { jp: 'この<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かじゃありません。',
        kana: 'このまちはしずかじゃありません。', romaji: 'kono machi wa shizuka ja arimasen.', hu: 'Ez a város nem csendes.',
        cloze: 'この<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>か___BLANK___。', clozeAnswer: 'じゃありません',
        tokens: ['この', 'まちは', 'しずかじゃありません', '。'] }
    ],
    contrasts: ['ja_arimasen', 'adj_noun']
  },
  {
    id: 'donna', label: 'どんな・どう', jlpt: 'N5', category: 'description', lesson: 'l8',
    summary: 'Rákérdezés a tulajdonságra: „milyen?"',
    structure: 'どんな + főnév ですか · 〜は どうですか',
    explanation: 'A どんな főnév előtt áll (milyen város?), a どう önállóan (milyen a város?).',
    examples: [
      { jp: '<ruby>京都<rt>きょうと</rt></ruby>はどんな<ruby>町<rt>まち</rt></ruby>ですか。',
        kana: 'きょうとはどんなまちですか。', romaji: 'kyouto wa donna machi desu ka.', hu: 'Milyen város Kiotó?',
        cloze: '<ruby>京都<rt>きょうと</rt></ruby>は___BLANK___<ruby>町<rt>まち</rt></ruby>ですか。', clozeAnswer: 'どんな',
        tokens: ['きょうとは', 'どんな', 'まちですか', '。'] },
      { jp: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>はどうですか。',
        kana: 'にほんのせいかつはどうですか。', romaji: 'nihon no seikatsu wa dou desu ka.', hu: 'Milyen az élet Japánban?',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>は___BLANK___ですか。', clozeAnswer: 'どう',
        tokens: ['にほんのせいかつは', 'どうですか', '。'] }
    ],
    contrasts: ['adj_noun']
  },
  {
    id: 'mashouka', label: '〜ましょうか', jlpt: 'N5', category: 'invitation', lesson: 'l8',
    summary: 'Felajánlás: „…-jak?"',
    structure: 'ます-tő + ましょうか',
    explanation: 'Felajánlod, hogy megteszel valamit a másikért. Elfogadás: お願いします。 Elhárítás: いいえ、けっこうです。',
    examples: [
      { jp: '<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>持<rt>も</rt></ruby>ちましょうか。',
        kana: 'にもつをもちましょうか。', romaji: 'nimotsu o mochimashou ka.', hu: 'Vigyem a csomagot?',
        cloze: '<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>持<rt>も</rt></ruby>ち___BLANK___。', clozeAnswer: 'ましょうか',
        tokens: ['にもつを', 'もちましょうか', '。'] },
      { jp: '<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けましょうか。',
        kana: 'まどをあけましょうか。', romaji: 'mado o akemashou ka.', hu: 'Kinyissam az ablakot?',
        cloze: '<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>け___BLANK___。', clozeAnswer: 'ましょうか',
        tokens: ['まどを', 'あけましょうか', '。'] }
    ],
    contrasts: ['mashou', 'masenka']
  },

  /* ── l9 ── */
  {
    id: 'deshita', label: '〜でした', jlpt: 'N5', category: 'basic', lesson: 'l9',
    summary: 'Múlt idő főnévvel és な-melléknévvel: „…volt".',
    structure: 'főnév / な-melléknév + でした · tagadva: じゃありませんでした',
    explanation: 'A です múlt ideje でした. Főnév és な-melléknév után egyformán áll; a tagadó múlt: じゃありませんでした.',
    examples: [
      { jp: '<ruby>昨日<rt>きのう</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>でした。',
        kana: 'きのうはあめでした。', romaji: 'kinou wa ame deshita.', hu: 'Tegnap esős idő volt.',
        cloze: '<ruby>昨日<rt>きのう</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>___BLANK___。', clozeAnswer: 'でした',
        tokens: ['きのうは', 'あめでした', '。'] },
      { jp: '<ruby>町<rt>まち</rt></ruby>はとても<ruby>静<rt>しず</rt></ruby>かでした。',
        kana: 'まちはとてもしずかでした。', romaji: 'machi wa totemo shizuka deshita.', hu: 'A város nagyon csendes volt.',
        cloze: '<ruby>町<rt>まち</rt></ruby>はとても<ruby>静<rt>しず</rt></ruby>か___BLANK___。', clozeAnswer: 'でした',
        tokens: ['まちは', 'とても', 'しずかでした', '。'] }
    ],
    contrasts: ['katta_desu', 'wa_desu']
  },
  {
    id: 'katta_desu', label: '〜かったです', jlpt: 'N5', category: 'description', lesson: 'l9',
    summary: 'い-melléknév múlt ideje: az い helyén かった áll.',
    structure: 'い → かったです · tagadva: くなかったです',
    explanation: 'Az い-melléknév maga ragozódik: az い helyére かった kerül, a です változatlan marad. いい → よかったです. Hibás: ×おいしいでした.',
    examples: [
      { jp: '<ruby>映画<rt>えいが</rt></ruby>はおもしろかったです。',
        kana: 'えいがはおもしろかったです。', romaji: 'eiga wa omoshirokatta desu.', hu: 'A film érdekes volt.',
        cloze: '<ruby>映画<rt>えいが</rt></ruby>はおもしろ___BLANK___です。', clozeAnswer: 'かった',
        tokens: ['えいがは', 'おもしろかったです', '。'] },
      { jp: '<ruby>旅行<rt>りょこう</rt></ruby>はとても<ruby>楽<rt>たの</rt></ruby>しかったです。',
        kana: 'りょこうはとてもたのしかったです。', romaji: 'ryokou wa totemo tanoshikatta desu.', hu: 'Az utazás nagyon jó volt.',
        cloze: '<ruby>旅行<rt>りょこう</rt></ruby>はとても<ruby>楽<rt>たの</rt></ruby>し___BLANK___です。', clozeAnswer: 'かった',
        tokens: ['りょこうは', 'とても', 'たのしかったです', '。'] }
    ],
    contrasts: ['deshita', 'adj_negative']
  },
  {
    id: 'te_sequence', label: '〜て、〜', jlpt: 'N5', category: 'sequence', lesson: 'l9',
    summary: 'Cselekvések egymás után: „megteszem, aztán…".',
    structure: 'ige て-alakja、 következő ige',
    explanation: 'A て-alak összefűzi az egymás után következő cselekvéseket. Az időt csak az utolsó ige mutatja meg.',
    examples: [
      { jp: '<ruby>朝<rt>あさ</rt></ruby><ruby>起<rt>お</rt></ruby>きて、コーヒーを<ruby>飲<rt>の</rt></ruby>みます。',
        kana: 'あさおきて、コーヒーをのみます。', romaji: 'asa okite, koohii o nomimasu.', hu: 'Reggel felkelek, és kávét iszom.',
        cloze: '<ruby>朝<rt>あさ</rt></ruby><ruby>起<rt>お</rt></ruby>き___BLANK___、コーヒーを<ruby>飲<rt>の</rt></ruby>みます。', clozeAnswer: 'て',
        tokens: ['あさ', 'おきて', '、', 'コーヒーを', 'のみます', '。'] },
      { jp: 'うちへ<ruby>帰<rt>かえ</rt></ruby>って、<ruby>晩<rt>ばん</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べました。',
        kana: 'うちへかえって、ばんごはんをたべました。', romaji: 'uchi e kaette, bangohan o tabemashita.', hu: 'Hazamentem, és megvacsoráztam.',
        cloze: 'うちへ<ruby>帰<rt>かえ</rt></ruby>っ___BLANK___、<ruby>晩<rt>ばん</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べました。', clozeAnswer: 'て',
        tokens: ['うちへ', 'かえって', '、', 'ばんごはんを', 'たべました', '。'] }
    ],
    contrasts: ['te_kara', 'kute_de']
  },
  {
    id: 'kute_de', label: '〜くて・〜で', jlpt: 'N5', category: 'description', lesson: 'l9',
    summary: 'Tulajdonságok összekötése: „ilyen és olyan".',
    structure: 'い → くて · な-melléknév / főnév + で',
    explanation: 'Két tulajdonságot így kötsz össze: az い-melléknév くて, a な-melléknév és a főnév で alakot kap. Egyirányú tulajdonságokat fűzz össze (jó és jó, rossz és rossz).',
    examples: [
      { jp: 'この<ruby>部屋<rt>へや</rt></ruby>は<ruby>広<rt>ひろ</rt></ruby>くて、<ruby>明<rt>あか</rt></ruby>るいです。',
        kana: 'このへやはひろくて、あかるいです。', romaji: 'kono heya wa hirokute, akarui desu.', hu: 'Ez a szoba tágas és világos.',
        cloze: 'この<ruby>部屋<rt>へや</rt></ruby>は<ruby>広<rt>ひろ</rt></ruby>___BLANK___、<ruby>明<rt>あか</rt></ruby>るいです。', clozeAnswer: 'くて',
        tokens: ['この', 'へやは', 'ひろくて', '、', 'あかるいです', '。'] },
      { jp: '<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かで、きれいです。',
        kana: 'まちはしずかで、きれいです。', romaji: 'machi wa shizuka de, kirei desu.', hu: 'A város csendes és szép.',
        cloze: '<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>か___BLANK___、きれいです。', clozeAnswer: 'で',
        tokens: ['まちは', 'しずかで', '、', 'きれいです', '。'] }
    ],
    contrasts: ['te_sequence', 'adj_noun']
  },

  /* ── l10 ── */
  {
    id: 'yori_hou_ga', label: 'A より B のほうが', jlpt: 'N5', category: 'comparison', lesson: 'l10',
    summary: 'Két dolog összevetése: „B …-bb, mint A".',
    structure: 'A より B のほうが + melléknév',
    explanation: 'A より jelöli azt, amihez mérsz („mint A"), a のほうが azt, amelyik jobban olyan. A melléknév alakja nem változik: nincs külön középfok.',
    examples: [
      { jp: 'バスより<ruby>電車<rt>でんしゃ</rt></ruby>のほうが<ruby>速<rt>はや</rt></ruby>いです。',
        kana: 'バスよりでんしゃのほうがはやいです。', romaji: 'basu yori densha no hou ga hayai desu.', hu: 'A vonat gyorsabb, mint a busz.',
        cloze: 'バス___BLANK___<ruby>電車<rt>でんしゃ</rt></ruby>のほうが<ruby>速<rt>はや</rt></ruby>いです。', clozeAnswer: 'より',
        tokens: ['バスより', 'でんしゃのほうが', 'はやいです', '。'] },
      { jp: '<ruby>肉<rt>にく</rt></ruby>より<ruby>魚<rt>さかな</rt></ruby>のほうが<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'にくよりさかなのほうがすきです。', romaji: 'niku yori sakana no hou ga suki desu.', hu: 'A halat jobban szeretem, mint a húst.',
        cloze: '<ruby>肉<rt>にく</rt></ruby>より<ruby>魚<rt>さかな</rt></ruby>___BLANK___<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'のほうが',
        tokens: ['にくより', 'さかなのほうが', 'すきです', '。'] }
    ],
    contrasts: ['dochira', 'ichiban']
  },
  {
    id: 'dochira', label: 'A と B と どちらが', jlpt: 'N5', category: 'comparison', lesson: 'l10',
    summary: 'Választás kettő közül: „melyik …-bb?"',
    structure: 'A と B と どちらが + melléknév ですか',
    explanation: 'Két dolog közül a どちら kérdez. A válasz: 〜のほうが…。 Ha egyformák: どちらも…。',
    examples: [
      { jp: '<ruby>犬<rt>いぬ</rt></ruby>と<ruby>猫<rt>ねこ</rt></ruby>とどちらが<ruby>好<rt>す</rt></ruby>きですか。',
        kana: 'いぬとねことどちらがすきですか。', romaji: 'inu to neko to dochira ga suki desu ka.', hu: 'A kutyát vagy a macskát szereted jobban?',
        cloze: '<ruby>犬<rt>いぬ</rt></ruby>と<ruby>猫<rt>ねこ</rt></ruby>と___BLANK___が<ruby>好<rt>す</rt></ruby>きですか。', clozeAnswer: 'どちら',
        tokens: ['いぬと', 'ねこと', 'どちらが', 'すきですか', '。'] },
      { jp: '<ruby>春<rt>はる</rt></ruby>と<ruby>秋<rt>あき</rt></ruby>とどちらがいいですか。',
        kana: 'はるとあきとどちらがいいですか。', romaji: 'haru to aki to dochira ga ii desu ka.', hu: 'Melyik jobb: a tavasz vagy az ősz?',
        cloze: '<ruby>春<rt>はる</rt></ruby>と<ruby>秋<rt>あき</rt></ruby>と___BLANK___がいいですか。', clozeAnswer: 'どちら',
        tokens: ['はると', 'あきと', 'どちらが', 'いいですか', '。'] }
    ],
    contrasts: ['yori_hou_ga', 'ichiban']
  },
  {
    id: 'ichiban', label: '〜が いちばん', jlpt: 'N5', category: 'comparison', lesson: 'l10',
    summary: 'Felsőfok: „a leg…-bb".',
    structure: 'csoport で + X が いちばん + melléknév',
    explanation: 'Három vagy több közül az いちばん („első számú") emeli ki a legjobbat. A csoportot で jelöli: クラスで, 一年で.',
    examples: [
      { jp: '<ruby>果物<rt>くだもの</rt></ruby>でりんごがいちばん<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'くだものでりんごがいちばんすきです。', romaji: 'kudamono de ringo ga ichiban suki desu.', hu: 'A gyümölcsök közül az almát szeretem a legjobban.',
        cloze: '<ruby>果物<rt>くだもの</rt></ruby>でりんごが___BLANK___<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'いちばん',
        tokens: ['くだもので', 'りんごが', 'いちばん', 'すきです', '。'] },
      { jp: '<ruby>一年<rt>いちねん</rt></ruby>で<ruby>八月<rt>はちがつ</rt></ruby>がいちばん<ruby>暑<rt>あつ</rt></ruby>いです。',
        kana: 'いちねんではちがつがいちばんあついです。', romaji: 'ichinen de hachigatsu ga ichiban atsui desu.', hu: 'Az évben augusztus a legmelegebb.',
        cloze: '<ruby>一年<rt>いちねん</rt></ruby>で<ruby>八月<rt>はちがつ</rt></ruby>が___BLANK___<ruby>暑<rt>あつ</rt></ruby>いです。', clozeAnswer: 'いちばん',
        tokens: ['いちねんで', 'はちがつが', 'いちばん', 'あついです', '。'] }
    ],
    contrasts: ['yori_hou_ga', 'dochira']
  },
  {
    id: 'ni_shimasu', label: '〜にします', jlpt: 'N5', category: 'intention', lesson: 'l10',
    summary: 'Döntés, választás: „ezt kérem, ezt választom".',
    structure: 'főnév + にします',
    explanation: 'Amikor választasz (étlapról, boltban, időpontok közül), a választott dolog に-t kap. Múltban: 〜にしました.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>はコーヒーにします。',
        kana: 'わたしはコーヒーにします。', romaji: 'watashi wa koohii ni shimasu.', hu: 'Én kávét kérek.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>はコーヒー___BLANK___します。', clozeAnswer: 'に',
        tokens: ['わたしは', 'コーヒーに', 'します', '。'] },
      { jp: 'プレゼントは<ruby>本<rt>ほん</rt></ruby>にします。',
        kana: 'プレゼントはほんにします。', romaji: 'purezento wa hon ni shimasu.', hu: 'Ajándéknak könyvet választok.',
        cloze: 'プレゼントは<ruby>本<rt>ほん</rt></ruby>___BLANK___。', clozeAnswer: 'にします',
        tokens: ['プレゼントは', 'ほんにします', '。'] }
    ],
    contrasts: ['tsumori', 'wo_kudasai']
  },
  {
    id: 'te_kudasai', label: '〜てください', jlpt: 'N5', category: 'request', lesson: 'l10',
    summary: 'Kérés: „kérem, tegye meg".',
    structure: 'ige て-alakja + ください',
    explanation: 'Udvarias kérés vagy utasítás. Tagadva: 〜ないでください (kérem, ne…).',
    examples: [
      { jp: 'ここに<ruby>名前<rt>なまえ</rt></ruby>を<ruby>書<rt>か</rt></ruby>いてください。',
        kana: 'ここになまえをかいてください。', romaji: 'koko ni namae o kaite kudasai.', hu: 'Kérem, írja ide a nevét!',
        cloze: 'ここに<ruby>名前<rt>なまえ</rt></ruby>を<ruby>書<rt>か</rt></ruby>い___BLANK___。', clozeAnswer: 'てください',
        tokens: ['ここに', 'なまえを', 'かいてください', '。'] },
      { jp: 'ちょっと<ruby>待<rt>ま</rt></ruby>ってください。',
        kana: 'ちょっとまってください。', romaji: 'chotto matte kudasai.', hu: 'Kérem, várjon egy kicsit!',
        cloze: 'ちょっと<ruby>待<rt>ま</rt></ruby>っ___BLANK___ください。', clozeAnswer: 'て',
        tokens: ['ちょっと', 'まってください', '。'] }
    ],
    contrasts: ['wo_kudasai', 'naide_kudasai', 'o_kudasai']
  },
  {
    id: 'te_kara', label: '〜てから', jlpt: 'N5', category: 'sequence', lesson: 'l10',
    summary: 'Sorrend hangsúlyozva: „miután…, csak azután…".',
    structure: 'ige て-alakja + から',
    explanation: 'A 〜てから kiemeli, hogy az első cselekvés előbb befejeződik. A sima 〜て csak egymás után sorol.',
    examples: [
      { jp: '<ruby>手<rt>て</rt></ruby>を<ruby>洗<rt>あら</rt></ruby>ってから、<ruby>食<rt>た</rt></ruby>べます。',
        kana: 'てをあらってから、たべます。', romaji: 'te o aratte kara, tabemasu.', hu: 'Miután kezet mostam, eszem.',
        cloze: '<ruby>手<rt>て</rt></ruby>を<ruby>洗<rt>あら</rt></ruby>っ___BLANK___、<ruby>食<rt>た</rt></ruby>べます。', clozeAnswer: 'てから',
        tokens: ['てを', 'あらってから', '、', 'たべます', '。'] },
      { jp: '<ruby>宿題<rt>しゅくだい</rt></ruby>をしてから、<ruby>遊<rt>あそ</rt></ruby>びます。',
        kana: 'しゅくだいをしてから、あそびます。', romaji: 'shukudai o shite kara, asobimasu.', hu: 'Miután megcsináltam a leckét, játszom.',
        cloze: '<ruby>宿題<rt>しゅくだい</rt></ruby>をし___BLANK___、<ruby>遊<rt>あそ</rt></ruby>びます。', clozeAnswer: 'てから',
        tokens: ['しゅくだいを', 'してから', '、', 'あそびます', '。'] }
    ],
    contrasts: ['te_sequence', 'kara_reason', 'ta_ato_de']
  },
  {
    id: 'te_miru', label: '〜てみます', jlpt: 'N5', category: 'experience', lesson: 'l10',
    summary: 'Kipróbálás: „megpróbálom, megnézem, milyen".',
    structure: 'ige て-alakja + みます',
    explanation: 'Azt fejezi ki, hogy kipróbálsz valamit, hogy megtudd, milyen. A みます itt hiraganával áll.',
    examples: [
      { jp: 'この<ruby>料理<rt>りょうり</rt></ruby>を<ruby>食<rt>た</rt></ruby>べてみます。',
        kana: 'このりょうりをたべてみます。', romaji: 'kono ryouri o tabete mimasu.', hu: 'Megkóstolom ezt az ételt.',
        cloze: 'この<ruby>料理<rt>りょうり</rt></ruby>を<ruby>食<rt>た</rt></ruby>べ___BLANK___。', clozeAnswer: 'てみます',
        tokens: ['この', 'りょうりを', 'たべてみます', '。'] },
      { jp: '<ruby>着物<rt>きもの</rt></ruby>を<ruby>着<rt>き</rt></ruby>てみたいです。',
        kana: 'きものをきてみたいです。', romaji: 'kimono o kite mitai desu.', hu: 'Szeretnék felpróbálni egy kimonót.',
        cloze: '<ruby>着物<rt>きもの</rt></ruby>を<ruby>着<rt>き</rt></ruby>___BLANK___たいです。', clozeAnswer: 'てみ',
        tokens: ['きものを', 'きてみたいです', '。'] }
    ],
    contrasts: ['te_kudasai']
  },

  /* ── l11 ── */
  {
    id: 'naide_kudasai', label: '〜ないでください', jlpt: 'N5', category: 'request', lesson: 'l11',
    summary: 'Kérés tiltással: „kérem, ne…".',
    structure: 'ige ない-alakja + でください',
    explanation: 'Udvariasan megkérsz valakit, hogy ne tegyen meg valamit. Szabályt inkább a 〜てはいけません mond ki.',
    examples: [
      { jp: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>らないでください。',
        kana: 'ここでしゃしんをとらないでください。', romaji: 'koko de shashin o toranaide kudasai.', hu: 'Kérem, itt ne fényképezzen!',
        cloze: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ら___BLANK___。', clozeAnswer: 'ないでください',
        tokens: ['ここで', 'しゃしんを', 'とらないでください', '。'] },
      { jp: '<ruby>心配<rt>しんぱい</rt></ruby>しないでください。',
        kana: 'しんぱいしないでください。', romaji: 'shinpai shinaide kudasai.', hu: 'Kérem, ne aggódjon!',
        cloze: '<ruby>心配<rt>しんぱい</rt></ruby>し___BLANK___ください。', clozeAnswer: 'ないで',
        tokens: ['しんぱい', 'しないでください', '。'] }
    ],
    contrasts: ['te_kudasai', 'te_wa_ikenai']
  },
  {
    id: 'ta_hou_ga_ii', label: '〜たほうがいいです', jlpt: 'N5', category: 'advice', lesson: 'l11',
    summary: 'Tanács: „jobb lenne, ha megtennéd".',
    structure: 'ige た-alakja + ほうがいいです',
    explanation: 'Határozott tanács; a mondat végi よ lágyítja. Az ige た-alakban áll, noha a jövőről van szó.',
    examples: [
      { jp: '<ruby>薬<rt>くすり</rt></ruby>を<ruby>飲<rt>の</rt></ruby>んだほうがいいですよ。',
        kana: 'くすりをのんだほうがいいですよ。', romaji: 'kusuri o nonda hou ga ii desu yo.', hu: 'Jobb lenne, ha bevennéd a gyógyszert.',
        cloze: '<ruby>薬<rt>くすり</rt></ruby>を<ruby>飲<rt>の</rt></ruby>ん___BLANK___ですよ。', clozeAnswer: 'だほうがいい',
        tokens: ['くすりを', 'のんだほうがいいですよ', '。'] },
      { jp: '<ruby>早<rt>はや</rt></ruby>く<ruby>寝<rt>ね</rt></ruby>たほうがいいです。',
        kana: 'はやくねたほうがいいです。', romaji: 'hayaku neta hou ga ii desu.', hu: 'Jobb lenne korán lefeküdni.',
        cloze: '<ruby>早<rt>はや</rt></ruby>く<ruby>寝<rt>ね</rt></ruby>___BLANK___です。', clozeAnswer: 'たほうがいい',
        tokens: ['はやく', 'ねたほうがいいです', '。'] }
    ],
    contrasts: ['nai_hou_ga_ii']
  },
  {
    id: 'nai_hou_ga_ii', label: '〜ないほうがいいです', jlpt: 'N5', category: 'advice', lesson: 'l11',
    summary: 'Tanács tiltással: „jobb, ha nem teszed".',
    structure: 'ige ない-alakja + ほうがいいです',
    explanation: 'A tagadó tanácsban az ige ない-alakban áll (nem た-alakban).',
    examples: [
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけないほうがいいです。',
        kana: 'きょうはでかけないほうがいいです。', romaji: 'kyou wa dekakenai hou ga ii desu.', hu: 'Ma jobb, ha nem mész el itthonról.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけ___BLANK___です。', clozeAnswer: 'ないほうがいい',
        tokens: ['きょうは', 'でかけないほうがいいです', '。'] },
      { jp: 'お<ruby>酒<rt>さけ</rt></ruby>は<ruby>飲<rt>の</rt></ruby>まないほうがいいですよ。',
        kana: 'おさけはのまないほうがいいですよ。', romaji: 'osake wa nomanai hou ga ii desu yo.', hu: 'Alkoholt jobb, ha nem iszol.',
        cloze: 'お<ruby>酒<rt>さけ</rt></ruby>は<ruby>飲<rt>の</rt></ruby>ま___BLANK___ですよ。', clozeAnswer: 'ないほうがいい',
        tokens: ['おさけは', 'のまないほうがいいですよ', '。'] }
    ],
    contrasts: ['ta_hou_ga_ii', 'naide_kudasai']
  },
  {
    id: 'n_desu', label: '〜んです', jlpt: 'N5', category: 'reason', lesson: 'l11',
    summary: 'Magyarázat vagy magyarázatkérés: „az a helyzet, hogy…".',
    structure: 'rövid alak + んです (な-melléknév / főnév + なんです)',
    explanation: 'Hátteret, okot ad, vagy arra kérdez rá. Kérdésben érdeklődést mutat: どうしたんですか。',
    examples: [
      { jp: '<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いんです。',
        kana: 'あたまがいたいんです。', romaji: 'atama ga itai n desu.', hu: 'Az a helyzet, hogy fáj a fejem.',
        cloze: '<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>い___BLANK___。', clozeAnswer: 'んです',
        tokens: ['あたまが', 'いたいんです', '。'] },
      { jp: 'どうして<ruby>食<rt>た</rt></ruby>べないんですか。',
        kana: 'どうしてたべないんですか。', romaji: 'doushite tabenai n desu ka.', hu: 'Miért nem eszel?',
        cloze: 'どうして<ruby>食<rt>た</rt></ruby>べない___BLANK___か。', clozeAnswer: 'んです',
        tokens: ['どうして', 'たべないんですか', '。'] }
    ],
    contrasts: ['kara_reason', 'node']
  },

  /* ── l12 ── */
  {
    id: 'te_iru_progress', label: '〜ています (folyamat)', jlpt: 'N5', category: 'state', lesson: 'l12',
    summary: 'Éppen zajló cselekvés: „most csinálom".',
    structure: 'ige て-alakja + います',
    explanation: 'Olyan cselekvés, amely éppen most tart. Beszédben gyakran 〜てます.',
    examples: [
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでいます。',
        kana: 'いまほんをよんでいます。', romaji: 'ima hon o yonde imasu.', hu: 'Most éppen könyvet olvasok.',
        cloze: '<ruby>今<rt>いま</rt></ruby><ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>ん___BLANK___。', clozeAnswer: 'でいます',
        tokens: ['いま', 'ほんを', 'よんでいます', '。'] },
      { jp: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っています。',
        kana: 'あめがふっています。', romaji: 'ame ga futte imasu.', hu: 'Esik az eső.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っ___BLANK___。', clozeAnswer: 'ています',
        tokens: ['あめが', 'ふっています', '。'] }
    ],
    contrasts: ['te_iru_state']
  },
  {
    id: 'te_iru_state', label: '〜ています (állapot)', jlpt: 'N5', category: 'state', lesson: 'l12',
    summary: 'Tartós állapot: hol laksz, mit viselsz, mit tudsz.',
    structure: '住んで / 結婚して / 知って / 着て + います',
    explanation: 'Egyes igéknél a 〜ています nem folyamatot, hanem tartós állapotot jelent. A 知っています tagadása: 知りません.',
    examples: [
      { jp: '<ruby>東京<rt>とうきょう</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでいます。',
        kana: 'とうきょうにすんでいます。', romaji: 'toukyou ni sunde imasu.', hu: 'Tokióban lakom.',
        cloze: '<ruby>東京<rt>とうきょう</rt></ruby>に<ruby>住<rt>す</rt></ruby>ん___BLANK___。', clozeAnswer: 'でいます',
        tokens: ['とうきょうに', 'すんでいます', '。'] },
      { jp: '<ruby>兄<rt>あに</rt></ruby>は<ruby>結婚<rt>けっこん</rt></ruby>しています。',
        kana: 'あにはけっこんしています。', romaji: 'ani wa kekkon shite imasu.', hu: 'A bátyám házas.',
        cloze: '<ruby>兄<rt>あに</rt></ruby>は<ruby>結婚<rt>けっこん</rt></ruby>し___BLANK___。', clozeAnswer: 'ています',
        tokens: ['あには', 'けっこんしています', '。'] }
    ],
    contrasts: ['te_iru_progress']
  },
  {
    id: 'wa_ga_desc', label: 'A は B が 〜です', jlpt: 'N5', category: 'description', lesson: 'l12',
    summary: 'Jellemzés résszel: „A-nak a B-je ilyen".',
    structure: 'egész は + rész が + melléknév',
    explanation: 'Az egész (ember, hely) は-t, a jellemzett része が-t kap. Így mondod: „hosszú a haja", „finom ott az étel".',
    examples: [
      { jp: '<ruby>姉<rt>あね</rt></ruby>は<ruby>髪<rt>かみ</rt></ruby>が<ruby>長<rt>なが</rt></ruby>いです。',
        kana: 'あねはかみがながいです。', romaji: 'ane wa kami ga nagai desu.', hu: 'A nővéremnek hosszú a haja.',
        cloze: '<ruby>姉<rt>あね</rt></ruby>は<ruby>髪<rt>かみ</rt></ruby>___BLANK___<ruby>長<rt>なが</rt></ruby>いです。', clozeAnswer: 'が',
        tokens: ['あねは', 'かみが', 'ながいです', '。'] },
      { jp: 'この<ruby>町<rt>まち</rt></ruby>は<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>がおいしいです。',
        kana: 'このまちはたべものがおいしいです。', romaji: 'kono machi wa tabemono ga oishii desu.', hu: 'Ebben a városban finom az étel.',
        cloze: 'この<ruby>町<rt>まち</rt></ruby>は<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>___BLANK___おいしいです。', clozeAnswer: 'が',
        tokens: ['この', 'まちは', 'たべものが', 'おいしいです', '。'] }
    ],
    contrasts: ['ga_suki', 'wa_ga_contrast']
  },
  {
    id: 'noun_modifier', label: 'Jelzős mondat', jlpt: 'N5', category: 'nominal', lesson: 'l12',
    summary: 'Mondat a főnév előtt: „az a …, aki / amely…".',
    structure: 'rövid alakú mondat + főnév',
    explanation: 'A japánban a jelzős mondat a főnév ELŐTT áll, kötőszó nélkül. Az ige rövid alakban van, és nincs „aki, amely".',
    examples: [
      { jp: 'これは<ruby>昨日<rt>きのう</rt></ruby><ruby>買<rt>か</rt></ruby>った<ruby>本<rt>ほん</rt></ruby>です。',
        kana: 'これはきのうかったほんです。', romaji: 'kore wa kinou katta hon desu.', hu: 'Ez az a könyv, amelyet tegnap vettem.',
        cloze: 'これは<ruby>昨日<rt>きのう</rt></ruby>___BLANK___<ruby>本<rt>ほん</rt></ruby>です。', clozeAnswer: 'かった',
        tokens: ['これは', 'きのう', 'かった', 'ほんです', '。'] },
      { jp: 'めがねをかけている<ruby>人<rt>ひと</rt></ruby>は<ruby>田中<rt>たなか</rt></ruby>さんです。',
        kana: 'めがねをかけているひとはたなかさんです。', romaji: 'megane o kakete iru hito wa tanaka-san desu.', hu: 'A szemüveges ember Tanaka.',
        cloze: 'めがねを___BLANK___<ruby>人<rt>ひと</rt></ruby>は<ruby>田中<rt>たなか</rt></ruby>さんです。', clozeAnswer: 'かけている',
        tokens: ['めがねを', 'かけている', 'ひとは', 'たなかさんです', '。'] }
    ],
    contrasts: ['adj_noun']
  },
  {
    id: 'plain_style', label: 'Közvetlen stílus', jlpt: 'N5', category: 'spoken', lesson: 'l12',
    summary: 'Baráti hangnem: rövid alakok です és ます nélkül.',
    structure: 'ます → szótári alak · ました → た · ません → ない',
    explanation: 'Barátok, család között a rövid alakokat használod; a kérdő か elmarad, a hanglejtés kérdez. Idősebbel, idegennel marad a です / ます.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby><ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>る？',
        kana: 'あしたえいがをみる？', romaji: 'ashita eiga o miru?', hu: 'Megnézel holnap egy filmet?',
        cloze: '<ruby>明日<rt>あした</rt></ruby><ruby>映画<rt>えいが</rt></ruby>を___BLANK___？', clozeAnswer: 'みる',
        tokens: ['あした', 'えいがを', 'みる', '？'] },
      { jp: '<ruby>昨日<rt>きのう</rt></ruby>はどこへも<ruby>行<rt>い</rt></ruby>かなかった。',
        kana: 'きのうはどこへもいかなかった。', romaji: 'kinou wa doko e mo ikanakatta.', hu: 'Tegnap sehová sem mentem.',
        cloze: '<ruby>昨日<rt>きのう</rt></ruby>はどこへも___BLANK___。', clozeAnswer: 'いかなかった',
        tokens: ['きのうは', 'どこへも', 'いかなかった', '。'] }
    ],
    contrasts: ['masu_forms']
  },

  /* ── l13 ── */
  {
    id: 'node', label: '〜ので', jlpt: 'N5', category: 'reason', lesson: 'l13',
    summary: 'Tárgyilagos ok: „mivel…, ezért…".',
    structure: 'rövid alak + ので (な-melléknév / főnév + なので)',
    explanation: 'A ので tárgyilagosabb és udvariasabb a から-nál: kérés, mentegetőzés előtt ezt használd.',
    examples: [
      { jp: '<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いので、<ruby>帰<rt>かえ</rt></ruby>ります。',
        kana: 'あたまがいたいので、かえります。', romaji: 'atama ga itai node, kaerimasu.', hu: 'Mivel fáj a fejem, hazamegyek.',
        cloze: '<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>い___BLANK___、<ruby>帰<rt>かえ</rt></ruby>ります。', clozeAnswer: 'ので',
        tokens: ['あたまが', 'いたいので', '、', 'かえります', '。'] },
      { jp: '<ruby>雨<rt>あめ</rt></ruby>なので、バスで<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'あめなので、バスでいきます。', romaji: 'ame na node, basu de ikimasu.', hu: 'Mivel esik, busszal megyek.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>___BLANK___、バスで<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'なので',
        tokens: ['あめなので', '、', 'バスで', 'いきます', '。'] }
    ],
    contrasts: ['kara_reason', 'noni', 'n_desu']
  },
  {
    id: 'no_pronoun', label: '〜の (a főnév helyett)', jlpt: 'N5', category: 'nominal', lesson: 'l13',
    summary: 'Főnév helyettesítése: „a pirosat, az olcsóbbat".',
    structure: 'melléknév + の',
    explanation: 'Ha a főnév már ismert, a の áll a helyén: 赤いかばん → 赤いの. A な-melléknév után なの.',
    examples: [
      { jp: 'もっと<ruby>安<rt>やす</rt></ruby>いのはありませんか。',
        kana: 'もっとやすいのはありませんか。', romaji: 'motto yasui no wa arimasen ka.', hu: 'Nincs olcsóbb?',
        cloze: 'もっと<ruby>安<rt>やす</rt></ruby>い___BLANK___はありませんか。', clozeAnswer: 'の',
        tokens: ['もっと', 'やすいのは', 'ありませんか', '。'] },
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>赤<rt>あか</rt></ruby>いのが<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'わたしはあかいのがすきです。', romaji: 'watashi wa akai no ga suki desu.', hu: 'Nekem a piros tetszik.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>赤<rt>あか</rt></ruby>い___BLANK___が<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'の',
        tokens: ['わたしは', 'あかいのが', 'すきです', '。'] }
    ],
    contrasts: ['no_possession']
  },
  {
    id: 'agemasu', label: '〜に 〜を あげます', jlpt: 'N5', category: 'giving', lesson: 'l13',
    summary: 'Adok valakinek (tőlem kifelé).',
    structure: 'adó は + kapó に + dolog を あげます',
    explanation: 'Az あげます a beszélőtől kifelé irányuló adás: én adok másnak, vagy valaki egy harmadiknak. Ha nekem adnak: くれます.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>友<rt>とも</rt></ruby>だちに<ruby>花<rt>はな</rt></ruby>をあげました。',
        kana: 'わたしはともだちにはなをあげました。', romaji: 'watashi wa tomodachi ni hana o agemashita.', hu: 'Virágot adtam a barátomnak.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>友<rt>とも</rt></ruby>だちに<ruby>花<rt>はな</rt></ruby>を___BLANK___。', clozeAnswer: 'あげました',
        tokens: ['わたしは', 'ともだちに', 'はなを', 'あげました', '。'] },
      { jp: '<ruby>母<rt>はは</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>に<ruby>母<rt>はは</rt></ruby>にプレゼントをあげます。',
        kana: 'ははのひにははにプレゼントをあげます。', romaji: 'haha no hi ni haha ni purezento o agemasu.', hu: 'Anyák napján ajándékot adok anyámnak.',
        cloze: '<ruby>母<rt>はは</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>に<ruby>母<rt>はは</rt></ruby>にプレゼントを___BLANK___。', clozeAnswer: 'あげます',
        tokens: ['ははのひに', 'ははに', 'プレゼントを', 'あげます', '。'] }
    ],
    contrasts: ['kuremasu', 'moraimasu']
  },
  {
    id: 'kuremasu', label: '〜が 〜を くれます', jlpt: 'N5', category: 'giving', lesson: 'l13',
    summary: 'Valaki nekem ad (felém).',
    structure: 'adó が + (私に) dolog を くれます',
    explanation: 'A くれます mindig a beszélő (vagy a családja) felé irányul: valaki nekem ad. A 私に többnyire elmarad.',
    examples: [
      { jp: '<ruby>友<rt>とも</rt></ruby>だちがケーキをくれました。',
        kana: 'ともだちがケーキをくれました。', romaji: 'tomodachi ga keeki o kuremashita.', hu: 'A barátom tortát adott nekem.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だちがケーキを___BLANK___。', clozeAnswer: 'くれました',
        tokens: ['ともだちが', 'ケーキを', 'くれました', '。'] },
      { jp: '<ruby>父<rt>ちち</rt></ruby>が<ruby>時計<rt>とけい</rt></ruby>をくれました。',
        kana: 'ちちがとけいをくれました。', romaji: 'chichi ga tokei o kuremashita.', hu: 'Apám órát adott nekem.',
        cloze: '<ruby>父<rt>ちち</rt></ruby>が<ruby>時計<rt>とけい</rt></ruby>を___BLANK___。', clozeAnswer: 'くれました',
        tokens: ['ちちが', 'とけいを', 'くれました', '。'] }
    ],
    contrasts: ['agemasu', 'moraimasu']
  },
  {
    id: 'moraimasu', label: '〜に 〜を もらいます', jlpt: 'N5', category: 'giving', lesson: 'l13',
    summary: 'Kapok valakitől.',
    structure: 'kapó は + adó に / から + dolog を もらいます',
    explanation: 'A もらいます a kapó szemszögéből mondja el ugyanazt. Az adó に-t vagy から-t kap.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>母<rt>はは</rt></ruby>にかばんをもらいました。',
        kana: 'わたしはははにかばんをもらいました。', romaji: 'watashi wa haha ni kaban o moraimashita.', hu: 'Táskát kaptam anyámtól.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>母<rt>はは</rt></ruby>にかばんを___BLANK___。', clozeAnswer: 'もらいました',
        tokens: ['わたしは', 'ははに', 'かばんを', 'もらいました', '。'] },
      { jp: '<ruby>誕生日<rt>たんじょうび</rt></ruby>に<ruby>何<rt>なに</rt></ruby>をもらいましたか。',
        kana: 'たんじょうびになにをもらいましたか。', romaji: 'tanjoubi ni nani o moraimashita ka.', hu: 'Mit kaptál a születésnapodra?',
        cloze: '<ruby>誕生日<rt>たんじょうび</rt></ruby>に<ruby>何<rt>なに</rt></ruby>を___BLANK___か。', clozeAnswer: 'もらいました',
        tokens: ['たんじょうびに', 'なにを', 'もらいましたか', '。'] }
    ],
    contrasts: ['agemasu', 'kuremasu']
  },

  /* ── l14 ── */
  {
    id: 'mou_mada', label: 'もう・まだ', jlpt: 'N5', category: 'state', lesson: 'l14',
    summary: '„Már" és „még nem": megtörtént-e.',
    structure: 'もう + 〜ました · まだ + 〜ていません',
    explanation: 'A もう a befejezettséget, a まだ a hiányát jelzi. „Még nem": まだ 〜ていません, röviden まだです.',
    examples: [
      { jp: 'もう<ruby>昼<rt>ひる</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べましたか。',
        kana: 'もうひるごはんをたべましたか。', romaji: 'mou hirugohan o tabemashita ka.', hu: 'Ebédeltél már?',
        cloze: '___BLANK___<ruby>昼<rt>ひる</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べましたか。', clozeAnswer: 'もう',
        tokens: ['もう', 'ひるごはんを', 'たべましたか', '。'] },
      { jp: 'いいえ、まだ<ruby>食<rt>た</rt></ruby>べていません。',
        kana: 'いいえ、まだたべていません。', romaji: 'iie, mada tabete imasen.', hu: 'Nem, még nem ettem.',
        cloze: 'いいえ、___BLANK___<ruby>食<rt>た</rt></ruby>べていません。', clozeAnswer: 'まだ',
        tokens: ['いいえ', '、', 'まだ', 'たべていません', '。'] }
    ],
    contrasts: ['te_iru_state']
  },
  {
    id: 'ta_ato_de', label: '〜たあとで', jlpt: 'N5', category: 'sequence', lesson: 'l14',
    summary: 'Utána: „miután megtettem…".',
    structure: 'ige た-alakja + あとで · főnév の あとで',
    explanation: 'Azt mondja meg, mi történik valami után. Főnévvel: 食事のあとで.',
    examples: [
      { jp: 'ごはんを<ruby>食<rt>た</rt></ruby>べたあとで、<ruby>散歩<rt>さんぽ</rt></ruby>します。',
        kana: 'ごはんをたべたあとで、さんぽします。', romaji: 'gohan o tabeta ato de, sanpo shimasu.', hu: 'Evés után sétálok.',
        cloze: 'ごはんを<ruby>食<rt>た</rt></ruby>べ___BLANK___、<ruby>散歩<rt>さんぽ</rt></ruby>します。', clozeAnswer: 'たあとで',
        tokens: ['ごはんを', 'たべたあとで', '、', 'さんぽします', '。'] },
      { jp: '<ruby>授業<rt>じゅぎょう</rt></ruby>のあとで、<ruby>図書館<rt>としょかん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'じゅぎょうのあとで、としょかんへいきます。', romaji: 'jugyou no ato de, toshokan e ikimasu.', hu: 'Óra után könyvtárba megyek.',
        cloze: '<ruby>授業<rt>じゅぎょう</rt></ruby>の___BLANK___、<ruby>図書館<rt>としょかん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'あとで',
        tokens: ['じゅぎょうのあとで', '、', 'としょかんへ', 'いきます', '。'] }
    ],
    contrasts: ['mae_ni', 'te_kara']
  },
  {
    id: 'mae_ni', label: '〜るまえに', jlpt: 'N5', category: 'sequence', lesson: 'l14',
    summary: 'Előtte: „mielőtt megtenném…".',
    structure: 'ige szótári alakja + まえに · főnév の まえに',
    explanation: 'A まえに előtt az ige mindig szótári alakban áll, akkor is, ha a mondat múlt idejű.',
    examples: [
      { jp: '<ruby>寝<rt>ね</rt></ruby>るまえに、<ruby>歯<rt>は</rt></ruby>を<ruby>磨<rt>みが</rt></ruby>きます。',
        kana: 'ねるまえに、はをみがきます。', romaji: 'neru mae ni, ha o migakimasu.', hu: 'Lefekvés előtt fogat mosok.',
        cloze: '<ruby>寝<rt>ね</rt></ruby>る___BLANK___、<ruby>歯<rt>は</rt></ruby>を<ruby>磨<rt>みが</rt></ruby>きます。', clozeAnswer: 'まえに',
        tokens: ['ねるまえに', '、', 'はを', 'みがきます', '。'] },
      { jp: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>来<rt>く</rt></ruby>るまえに、<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しました。',
        kana: 'にほんへくるまえに、にほんごをべんきょうしました。', romaji: 'nihon e kuru mae ni, nihongo o benkyou shimashita.', hu: 'Mielőtt Japánba jöttem, japánul tanultam.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>来<rt>く</rt></ruby>る___BLANK___、<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しました。', clozeAnswer: 'まえに',
        tokens: ['にほんへ', 'くるまえに', '、', 'にほんごを', 'べんきょうしました', '。'] }
    ],
    contrasts: ['ta_ato_de']
  },
  {
    id: 'ga_hoshii', label: '〜が ほしいです', jlpt: 'N5', category: 'desire', lesson: 'l14',
    summary: 'Tárgyat szeretnél: „szeretnék egy…".',
    structure: 'főnév が ほしいです',
    explanation: 'A ほしい melléknév: amit szeretnél, az が-t kap. Cselekvésre a 〜たい való. Más vágyáról: ほしがっています.',
    examples: [
      { jp: '<ruby>新<rt>あたら</rt></ruby>しいパソコンがほしいです。',
        kana: 'あたらしいパソコンがほしいです。', romaji: 'atarashii pasokon ga hoshii desu.', hu: 'Szeretnék egy új számítógépet.',
        cloze: '<ruby>新<rt>あたら</rt></ruby>しいパソコン___BLANK___ほしいです。', clozeAnswer: 'が',
        tokens: ['あたらしい', 'パソコンが', 'ほしいです', '。'] },
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>何<rt>なに</rt></ruby>がほしいですか。',
        kana: 'いまなにがほしいですか。', romaji: 'ima nani ga hoshii desu ka.', hu: 'Mit szeretnél most?',
        cloze: '<ruby>今<rt>いま</rt></ruby><ruby>何<rt>なに</rt></ruby>が___BLANK___ですか。', clozeAnswer: 'ほしい',
        tokens: ['いま', 'なにが', 'ほしいですか', '。'] }
    ],
    contrasts: ['tai', 'ga_suki']
  },
  {
    id: 'tai_to_omou', label: '〜たいと思います', jlpt: 'N5', category: 'desire', lesson: 'l14',
    summary: 'Megfontolt, udvarias óhaj: „úgy gondolom, szeretnék…".',
    structure: 'ます-tő + たい + と思います',
    explanation: 'A 〜たいです nyersebb; a と思います hozzátéve visszafogottabb, felnőttes megfogalmazás. Tervekről, bemutatkozáskor gyakori.',
    examples: [
      { jp: '<ruby>将来<rt>しょうらい</rt></ruby><ruby>日本<rt>にほん</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>きたいと<ruby>思<rt>おも</rt></ruby>います。',
        kana: 'しょうらいにほんではたらきたいとおもいます。', romaji: 'shourai nihon de hatarakitai to omoimasu.', hu: 'A jövőben Japánban szeretnék dolgozni.',
        cloze: '<ruby>将来<rt>しょうらい</rt></ruby><ruby>日本<rt>にほん</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>き___BLANK___。', clozeAnswer: 'たいとおもいます',
        tokens: ['しょうらい', 'にほんで', 'はたらきたいとおもいます', '。'] },
      { jp: 'もっと<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>したいと<ruby>思<rt>おも</rt></ruby>っています。',
        kana: 'もっとかんじをべんきょうしたいとおもっています。', romaji: 'motto kanji o benkyou shitai to omotte imasu.', hu: 'Szeretnék több kanjit tanulni.',
        cloze: 'もっと<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>し___BLANK___います。', clozeAnswer: 'たいとおもって',
        tokens: ['もっと', 'かんじを', 'べんきょう', 'したいとおもっています', '。'] }
    ],
    contrasts: ['tai', 'to_omou']
  },

  /* ── l15 ── */
  {
    id: 'deshou', label: '〜でしょう', jlpt: 'N5', category: 'guess', lesson: 'l15',
    summary: 'Valószínűség: „valószínűleg, bizonyára".',
    structure: 'rövid alak + でしょう (な-melléknév / főnév közvetlenül)',
    explanation: 'Feltevés, előrejelzés (időjárás). Emelkedő hanglejtéssel megerősítést kér: „ugye?"',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るでしょう。',
        kana: 'あしたはあめがふるでしょう。', romaji: 'ashita wa ame ga furu deshou.', hu: 'Holnap valószínűleg esni fog.',
        cloze: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る___BLANK___。', clozeAnswer: 'でしょう',
        tokens: ['あしたは', 'あめが', 'ふるでしょう', '。'] },
      { jp: 'この<ruby>問題<rt>もんだい</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しいでしょう。',
        kana: 'このもんだいはむずかしいでしょう。', romaji: 'kono mondai wa muzukashii deshou.', hu: 'Ez a feladat bizonyára nehéz.',
        cloze: 'この<ruby>問題<rt>もんだい</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しい___BLANK___。', clozeAnswer: 'でしょう',
        tokens: ['この', 'もんだいは', 'むずかしいでしょう', '。'] }
    ],
    contrasts: ['to_omou']
  },
  {
    id: 'te_shimau', label: '〜てしまいます', jlpt: 'N5', category: 'state', lesson: 'l15',
    summary: 'Befejezés vagy sajnálat: megtörtént, nem lehet visszacsinálni.',
    structure: 'ige て-alakja + しまいます',
    explanation: 'Vagy azt jelzi, hogy valami teljesen elkészült, vagy azt, hogy sajnálatos módon megtörtént. Beszédben: 〜ちゃう.',
    examples: [
      { jp: '<ruby>財布<rt>さいふ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れてしまいました。',
        kana: 'さいふをわすれてしまいました。', romaji: 'saifu o wasurete shimaimashita.', hu: 'Sajnos otthon felejtettem a pénztárcámat.',
        cloze: '<ruby>財布<rt>さいふ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れ___BLANK___。', clozeAnswer: 'てしまいました',
        tokens: ['さいふを', 'わすれてしまいました', '。'] },
      { jp: 'この<ruby>本<rt>ほん</rt></ruby>はもう<ruby>読<rt>よ</rt></ruby>んでしまいました。',
        kana: 'このほんはもうよんでしまいました。', romaji: 'kono hon wa mou yonde shimaimashita.', hu: 'Ezt a könyvet már kiolvastam.',
        cloze: 'この<ruby>本<rt>ほん</rt></ruby>はもう<ruby>読<rt>よ</rt></ruby>ん___BLANK___。', clozeAnswer: 'でしまいました',
        tokens: ['この', 'ほんは', 'もう', 'よんでしまいました', '。'] }
    ],
    contrasts: ['te_iru_state', 'te_miru']
  },
  {
    id: 'tari_tari', label: '〜たり 〜たりします', jlpt: 'N5', category: 'sequence', lesson: 'l15',
    summary: 'Példálózó felsorolás: „ilyesmiket csinálok".',
    structure: 'ige た-alakja + り、 … たり + します',
    explanation: 'Néhány jellemző cselekvést sorol fel a sok közül, sorrend nélkül. A végén mindig します áll.',
    examples: [
      { jp: '<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んだり、<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>たりします。',
        kana: 'やすみのひはほんをよんだり、えいがをみたりします。', romaji: 'yasumi no hi wa hon o yondari, eiga o mitari shimasu.', hu: 'Szabadnapon olvasok, filmet nézek, ilyesmi.',
        cloze: '<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>ん___BLANK___、<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>たりします。', clozeAnswer: 'だり',
        tokens: ['やすみのひは', 'ほんを', 'よんだり', '、', 'えいがを', 'みたりします', '。'] },
      { jp: '<ruby>昨日<rt>きのう</rt></ruby>は<ruby>掃除<rt>そうじ</rt></ruby>をしたり、<ruby>洗濯<rt>せんたく</rt></ruby>をしたりしました。',
        kana: 'きのうはそうじをしたり、せんたくをしたりしました。', romaji: 'kinou wa souji o shitari, sentaku o shitari shimashita.', hu: 'Tegnap takarítottam, mostam, ilyesmiket csináltam.',
        cloze: '<ruby>昨日<rt>きのう</rt></ruby>は<ruby>掃除<rt>そうじ</rt></ruby>をし___BLANK___、<ruby>洗濯<rt>せんたく</rt></ruby>をしたりしました。', clozeAnswer: 'たり',
        tokens: ['きのうは', 'そうじを', 'したり', '、', 'せんたくを', 'したりしました', '。'] }
    ],
    contrasts: ['te_sequence', 'to_ya']
  },
  {
    id: 'mo_mo', label: 'A も B も', jlpt: 'N5', category: 'basic', lesson: 'l15',
    summary: 'Mindkettő: „ez is, az is" (tagadva: sem, sem).',
    structure: 'A も B も + állítás / tagadás',
    explanation: 'Két dologról ugyanazt állítod. Tagadó igével „sem… sem…".',
    examples: [
      { jp: '<ruby>肉<rt>にく</rt></ruby>も<ruby>魚<rt>さかな</rt></ruby>も<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'にくもさかなもすきです。', romaji: 'niku mo sakana mo suki desu.', hu: 'A húst is, a halat is szeretem.',
        cloze: '<ruby>肉<rt>にく</rt></ruby>___BLANK___<ruby>魚<rt>さかな</rt></ruby>も<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'も',
        tokens: ['にくも', 'さかなも', 'すきです', '。'] },
      { jp: '<ruby>土曜日<rt>どようび</rt></ruby>も<ruby>日曜日<rt>にちようび</rt></ruby>も<ruby>働<rt>はたら</rt></ruby>きません。',
        kana: 'どようびもにちようびもはたらきません。', romaji: 'doyoubi mo nichiyoubi mo hatarakimasen.', hu: 'Sem szombaton, sem vasárnap nem dolgozom.',
        cloze: '<ruby>土曜日<rt>どようび</rt></ruby>も<ruby>日曜日<rt>にちようび</rt></ruby>___BLANK___<ruby>働<rt>はたら</rt></ruby>きません。', clozeAnswer: 'も',
        tokens: ['どようびも', 'にちようびも', 'はたらきません', '。'] }
    ],
    contrasts: ['mo_also', 'daremo_imasen']
  },
  {
    id: 'te_reason', label: '〜て・〜で (ok)', jlpt: 'N5', category: 'reason', lesson: 'l15',
    summary: 'Ok érzelem vagy állapot előtt: „valami miatt".',
    structure: 'て-alak / くて / főnév で + érzelem, állapot',
    explanation: 'A て-alak okot is kifejezhet, ha utána érzelem vagy nem szándékos állapot áll. Kérés, szándék nem állhat utána.',
    examples: [
      { jp: 'ニュースを<ruby>聞<rt>き</rt></ruby>いて、びっくりしました。',
        kana: 'ニュースをきいて、びっくりしました。', romaji: 'nyuusu o kiite, bikkuri shimashita.', hu: 'Meglepődtem a hír hallatán.',
        cloze: 'ニュースを<ruby>聞<rt>き</rt></ruby>い___BLANK___、びっくりしました。', clozeAnswer: 'て',
        tokens: ['ニュースを', 'きいて', '、', 'びっくりしました', '。'] },
      { jp: '<ruby>遅<rt>おく</rt></ruby>れて、すみません。',
        kana: 'おくれて、すみません。', romaji: 'okurete, sumimasen.', hu: 'Elnézést a késésért.',
        cloze: '<ruby>遅<rt>おく</rt></ruby>れ___BLANK___、すみません。', clozeAnswer: 'て',
        tokens: ['おくれて', '、', 'すみません', '。'] }
    ],
    contrasts: ['kara_reason', 'node', 'te_sequence']
  },

  /* ── l16 ── */
  {
    id: 'koto_desu', label: '〜ことです', jlpt: 'N5', category: 'nominal', lesson: 'l16',
    summary: 'Igéből főnév: „a hobbim az, hogy…".',
    structure: 'ige szótári alakja + こと',
    explanation: 'A こと főnévvé teszi az igét: 読む → 読むこと (az olvasás). Hobbi, álom, terv megnevezésénél gyakori.',
    examples: [
      { jp: '<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ることです。',
        kana: 'しゅみはしゃしんをとることです。', romaji: 'shumi wa shashin o toru koto desu.', hu: 'A hobbim a fényképezés.',
        cloze: '<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>る___BLANK___です。', clozeAnswer: 'こと',
        tokens: ['しゅみは', 'しゃしんを', 'とることです', '。'] },
      { jp: '<ruby>私<rt>わたし</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>は<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>くことです。',
        kana: 'わたしのゆめはにほんへいくことです。', romaji: 'watashi no yume wa nihon e iku koto desu.', hu: 'Az az álmom, hogy eljussak Japánba.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>は<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>く___BLANK___です。', clozeAnswer: 'こと',
        tokens: ['わたしのゆめは', 'にほんへ', 'いくことです', '。'] }
    ],
    contrasts: ['ta_koto_ga_aru']
  },
  {
    id: 'ta_koto_ga_aru', label: '〜たことがあります', jlpt: 'N5', category: 'experience', lesson: 'l16',
    summary: 'Tapasztalat: „volt már rá példa".',
    structure: 'ige た-alakja + ことがあります',
    explanation: 'Azt mondja, hogy életedben legalább egyszer megtörtént. Tagadva: 〜たことがありません (még soha).',
    examples: [
      { jp: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ったことがあります。',
        kana: 'にほんへいったことがあります。', romaji: 'nihon e itta koto ga arimasu.', hu: 'Voltam már Japánban.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>っ___BLANK___。', clozeAnswer: 'たことがあります',
        tokens: ['にほんへ', 'いったことがあります', '。'] },
      { jp: 'すしを<ruby>食<rt>た</rt></ruby>べたことがありません。',
        kana: 'すしをたべたことがありません。', romaji: 'sushi o tabeta koto ga arimasen.', hu: 'Még soha nem ettem szusit.',
        cloze: 'すしを<ruby>食<rt>た</rt></ruby>べ___BLANK___。', clozeAnswer: 'たことがありません',
        tokens: ['すしを', 'たべたことがありません', '。'] }
    ],
    contrasts: ['koto_ga_dekiru', 'koto_desu']
  },
  {
    id: 'koto_ga_dekiru', label: '〜ことができます', jlpt: 'N5', category: 'experience', lesson: 'l16',
    summary: 'Képesség vagy lehetőség: „tudok, lehet".',
    structure: 'ige szótári alakja + ことができます',
    explanation: 'Képességet (tudok úszni) és lehetőséget (itt lehet fizetni) is kifejez. Főnévvel: 〜ができます.',
    examples: [
      { jp: '<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>読<rt>よ</rt></ruby>むことができます。',
        kana: 'かんじをよむことができます。', romaji: 'kanji o yomu koto ga dekimasu.', hu: 'Tudok kanjit olvasni.',
        cloze: '<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>読<rt>よ</rt></ruby>む___BLANK___。', clozeAnswer: 'ことができます',
        tokens: ['かんじを', 'よむことができます', '。'] },
      { jp: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ることができます。',
        kana: 'ここでしゃしんをとることができます。', romaji: 'koko de shashin o toru koto ga dekimasu.', hu: 'Itt lehet fényképezni.',
        cloze: 'ここで<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>る___BLANK___。', clozeAnswer: 'ことができます',
        tokens: ['ここで', 'しゃしんを', 'とることができます', '。'] }
    ],
    contrasts: ['ta_koto_ga_aru']
  },
  {
    id: 'o_kudasai', label: 'お〜ください', jlpt: 'N5', category: 'honorific', lesson: 'l16',
    summary: 'Tiszteleti kérés vendéghez, ügyfélhez.',
    structure: 'お + ます-tő + ください',
    explanation: 'A 〜てください tiszteletteljes párja: boltban, állomáson, szállodában hallod. A する igéknél: ご + főnév + ください.',
    examples: [
      { jp: '<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ちください。',
        kana: 'しょうしょうおまちください。', romaji: 'shoushou omachi kudasai.', hu: 'Kérem, szíveskedjék várni egy kicsit!',
        cloze: '<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ち___BLANK___。', clozeAnswer: 'ください',
        tokens: ['しょうしょう', 'おまちください', '。'] },
      { jp: 'どうぞお<ruby>入<rt>はい</rt></ruby>りください。',
        kana: 'どうぞおはいりください。', romaji: 'douzo ohairi kudasai.', hu: 'Tessék, fáradjon be!',
        cloze: 'どうぞ___BLANK___<ruby>入<rt>はい</rt></ruby>りください。', clozeAnswer: 'お',
        tokens: ['どうぞ', 'おはいりください', '。'] }
    ],
    contrasts: ['te_kudasai']
  },

  /* ── l17 ── */
  {
    id: 'toki', label: '〜とき', jlpt: 'N4', category: 'sequence', lesson: 'l17',
    summary: 'Időpont megadása főnévvel, melléknévvel: „amikor…".',
    structure: 'főnév の とき · い-melléknév + とき · な-melléknév + な とき',
    explanation: 'A とき főnév („idő"), ezért úgy kapcsolódik hozzá minden, mint egy főnévhez: 子どものとき, 暇なとき, 若いとき.',
    examples: [
      { jp: '<ruby>子<rt>こ</rt></ruby>どものとき、よく<ruby>川<rt>かわ</rt></ruby>で<ruby>泳<rt>およ</rt></ruby>ぎました。',
        kana: 'こどものとき、よくかわでおよぎました。', romaji: 'kodomo no toki, yoku kawa de oyogimashita.', hu: 'Gyerekkoromban gyakran úsztam a folyóban.',
        cloze: '<ruby>子<rt>こ</rt></ruby>どもの___BLANK___、よく<ruby>川<rt>かわ</rt></ruby>で<ruby>泳<rt>およ</rt></ruby>ぎました。', clozeAnswer: 'とき',
        tokens: ['こどものとき', '、', 'よく', 'かわで', 'およぎました', '。'] },
      { jp: '<ruby>暇<rt>ひま</rt></ruby>なとき、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        kana: 'ひまなとき、ほんをよみます。', romaji: 'hima na toki, hon o yomimasu.', hu: 'Amikor ráérek, olvasok.',
        cloze: '<ruby>暇<rt>ひま</rt></ruby>な___BLANK___、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。', clozeAnswer: 'とき',
        tokens: ['ひまなとき', '、', 'ほんを', 'よみます', '。'] }
    ],
    contrasts: ['ru_toki_ta_toki']
  },
  {
    id: 'ru_toki_ta_toki', label: '〜るとき・〜たとき', jlpt: 'N4', category: 'sequence', lesson: 'l17',
    summary: '„Amikor" igével: előtte (る) vagy utána (た).',
    structure: 'ige szótári alakja + とき (előtte) · た-alak + とき (utána)',
    explanation: 'A とき előtti igealak azt mutatja, hogy a főmondat cselekvése előbb (szótári alak) vagy később (た-alak) történik-e.',
    examples: [
      { jp: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>くとき、かばんを<ruby>買<rt>か</rt></ruby>いました。',
        kana: 'にほんへいくとき、かばんをかいました。', romaji: 'nihon e iku toki, kaban o kaimashita.', hu: 'Mielőtt Japánba indultam, vettem egy táskát.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>く___BLANK___、かばんを<ruby>買<rt>か</rt></ruby>いました。', clozeAnswer: 'とき',
        tokens: ['にほんへ', 'いくとき', '、', 'かばんを', 'かいました', '。'] },
      { jp: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ったとき、かばんを<ruby>買<rt>か</rt></ruby>いました。',
        kana: 'にほんへいったとき、かばんをかいました。', romaji: 'nihon e itta toki, kaban o kaimashita.', hu: 'Amikor Japánban jártam, vettem egy táskát.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>っ___BLANK___、かばんを<ruby>買<rt>か</rt></ruby>いました。', clozeAnswer: 'たとき',
        tokens: ['にほんへ', 'いったとき', '、', 'かばんを', 'かいました', '。'] }
    ],
    contrasts: ['toki', 'mae_ni', 'ta_ato_de', 'tara']
  },
  {
    id: 'de_joining', label: 'A は B で、C は D です', jlpt: 'N4', category: 'basic', lesson: 'l17',
    summary: 'Két állítás egy mondatban: a です helyén で áll.',
    structure: 'főnév / な-melléknév + で、 …',
    explanation: 'A です て-alakja で: ezzel két főnévi vagy な-melléknévi állítmányú mondatot fűzöl össze.',
    examples: [
      { jp: '<ruby>兄<rt>あに</rt></ruby>は<ruby>会社員<rt>かいしゃいん</rt></ruby>で、<ruby>姉<rt>あね</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。',
        kana: 'あにはかいしゃいんで、あねはがくせいです。', romaji: 'ani wa kaishain de, ane wa gakusei desu.', hu: 'A bátyám irodai dolgozó, a nővérem diák.',
        cloze: '<ruby>兄<rt>あに</rt></ruby>は<ruby>会社員<rt>かいしゃいん</rt></ruby>___BLANK___、<ruby>姉<rt>あね</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。', clozeAnswer: 'で',
        tokens: ['あには', 'かいしゃいんで', '、', 'あねは', 'がくせいです', '。'] },
      { jp: 'これは<ruby>日本<rt>にほん</rt></ruby>のお<ruby>茶<rt>ちゃ</rt></ruby>で、それは<ruby>中国<rt>ちゅうごく</rt></ruby>のお<ruby>茶<rt>ちゃ</rt></ruby>です。',
        kana: 'これはにほんのおちゃで、それはちゅうごくのおちゃです。', romaji: 'kore wa nihon no ocha de, sore wa chuugoku no ocha desu.', hu: 'Ez japán tea, az pedig kínai.',
        cloze: 'これは<ruby>日本<rt>にほん</rt></ruby>のお<ruby>茶<rt>ちゃ</rt></ruby>___BLANK___、それは<ruby>中国<rt>ちゅうごく</rt></ruby>のお<ruby>茶<rt>ちゃ</rt></ruby>です。', clozeAnswer: 'で',
        tokens: ['これは', 'にほんのおちゃで', '、', 'それは', 'ちゅうごくのおちゃです', '。'] }
    ],
    contrasts: ['kute_de', 'wa_ga_contrast']
  },

  /* ── l18 ── */
  {
    id: 'kamoshirenai', label: '〜かもしれません', jlpt: 'N4', category: 'guess', lesson: 'l18',
    summary: 'Bizonytalan feltevés: „lehet, hogy…".',
    structure: 'rövid alak + かもしれません (な-melléknév / főnév közvetlenül)',
    explanation: 'Kisebb valószínűség, mint a でしょう: talán igen, talán nem. Beszédben: 〜かも.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雪<rt>ゆき</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るかもしれません。',
        kana: 'あしたはゆきがふるかもしれません。', romaji: 'ashita wa yuki ga furu kamoshiremasen.', hu: 'Lehet, hogy holnap havazni fog.',
        cloze: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雪<rt>ゆき</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る___BLANK___。', clozeAnswer: 'かもしれません',
        tokens: ['あしたは', 'ゆきが', 'ふるかもしれません', '。'] },
      { jp: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>かもしれません。',
        kana: 'あのひとはせんせいかもしれません。', romaji: 'ano hito wa sensei kamoshiremasen.', hu: 'Lehet, hogy az az ember tanár.',
        cloze: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>___BLANK___。', clozeAnswer: 'かもしれません',
        tokens: ['あの', 'ひとは', 'せんせいかもしれません', '。'] }
    ],
    contrasts: ['deshou']
  },
  {
    id: 'ku_naru', label: '〜くなります・〜になります', jlpt: 'N4', category: 'change', lesson: 'l18',
    summary: 'Magától változik: „valamilyenné válik".',
    structure: 'い → くなります · な-melléknév / főnév + になります',
    explanation: 'Változást ír le, amely magától megy végbe. Ha valaki szándékosan változtat: 〜くします / 〜にします.',
    examples: [
      { jp: '<ruby>最近<rt>さいきん</rt></ruby><ruby>寒<rt>さむ</rt></ruby>くなりましたね。',
        kana: 'さいきんさむくなりましたね。', romaji: 'saikin samuku narimashita ne.', hu: 'Mostanában hidegebb lett, ugye?',
        cloze: '<ruby>最近<rt>さいきん</rt></ruby><ruby>寒<rt>さむ</rt></ruby>___BLANK___ね。', clozeAnswer: 'くなりました',
        tokens: ['さいきん', 'さむくなりましたね', '。'] },
      { jp: '<ruby>息子<rt>むすこ</rt></ruby>は<ruby>医者<rt>いしゃ</rt></ruby>になりました。',
        kana: 'むすこはいしゃになりました。', romaji: 'musuko wa isha ni narimashita.', hu: 'A fiamból orvos lett.',
        cloze: '<ruby>息子<rt>むすこ</rt></ruby>は<ruby>医者<rt>いしゃ</rt></ruby>___BLANK___。', clozeAnswer: 'になりました',
        tokens: ['むすこは', 'いしゃになりました', '。'] }
    ],
    contrasts: ['ku_suru', 'you_ni_naru']
  },
  {
    id: 'ku_ni_adverb', label: '〜く・〜に + ige', jlpt: 'N4', category: 'description', lesson: 'l18',
    summary: 'Melléknévből határozó: „hogyan teszem".',
    structure: 'い → く + ige · な-melléknév + に + ige',
    explanation: 'A melléknév határozóként az igét jellemzi: 早く起きます, 静かに話します.',
    examples: [
      { jp: '<ruby>今朝<rt>けさ</rt></ruby>は<ruby>早<rt>はや</rt></ruby>く<ruby>起<rt>お</rt></ruby>きました。',
        kana: 'けさははやくおきました。', romaji: 'kesa wa hayaku okimashita.', hu: 'Ma reggel korán keltem.',
        cloze: '<ruby>今朝<rt>けさ</rt></ruby>は<ruby>早<rt>はや</rt></ruby>___BLANK___<ruby>起<rt>お</rt></ruby>きました。', clozeAnswer: 'く',
        tokens: ['けさは', 'はやく', 'おきました', '。'] },
      { jp: 'もう<ruby>少<rt>すこ</rt></ruby>し<ruby>静<rt>しず</rt></ruby>かにしてください。',
        kana: 'もうすこししずかにしてください。', romaji: 'mou sukoshi shizuka ni shite kudasai.', hu: 'Legyen szíves egy kicsit csendesebben!',
        cloze: 'もう<ruby>少<rt>すこ</rt></ruby>し<ruby>静<rt>しず</rt></ruby>か___BLANK___してください。', clozeAnswer: 'に',
        tokens: ['もう', 'すこし', 'しずかに', 'してください', '。'] }
    ],
    contrasts: ['ku_naru', 'adj_noun']
  },
  {
    id: 'koto_ni_suru', label: '〜ことにします', jlpt: 'N4', category: 'intention', lesson: 'l18',
    summary: 'Saját elhatározás: „úgy döntök, hogy…".',
    structure: 'ige szótári / ない-alakja + ことにします',
    explanation: 'A beszélő maga dönt. Ha a körülmények döntenek helyetted: 〜ことになります.',
    examples: [
      { jp: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>走<rt>はし</rt></ruby>ることにしました。',
        kana: 'まいあさはしることにしました。', romaji: 'maiasa hashiru koto ni shimashita.', hu: 'Úgy döntöttem, hogy minden reggel futok.',
        cloze: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>走<rt>はし</rt></ruby>る___BLANK___。', clozeAnswer: 'ことにしました',
        tokens: ['まいあさ', 'はしることにしました', '。'] },
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけないことにします。',
        kana: 'きょうはでかけないことにします。', romaji: 'kyou wa dekakenai koto ni shimasu.', hu: 'Úgy döntök, hogy ma nem megyek el itthonról.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけない___BLANK___。', clozeAnswer: 'ことにします',
        tokens: ['きょうは', 'でかけないことにします', '。'] }
    ],
    contrasts: ['tsumori', 'ni_shimasu']
  },
  {
    id: 'sashiagemasu', label: 'さしあげます', jlpt: 'N4', category: 'giving', lesson: 'l18',
    summary: 'Adok egy tisztelt embernek.',
    structure: 'tisztelt személy に + dolog を さしあげます',
    explanation: 'Az あげます szerény párja: tanárnak, főnöknek, vendégnek adsz. Saját családtagodnak nem mondjuk.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>花<rt>はな</rt></ruby>をさしあげました。',
        kana: 'せんせいにはなをさしあげました。', romaji: 'sensei ni hana o sashiagemashita.', hu: 'Virágot adtam a tanár úrnak.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>花<rt>はな</rt></ruby>を___BLANK___。', clozeAnswer: 'さしあげました',
        tokens: ['せんせいに', 'はなを', 'さしあげました', '。'] },
      { jp: 'お<ruby>客<rt>きゃく</rt></ruby>さんにお<ruby>茶<rt>ちゃ</rt></ruby>をさしあげます。',
        kana: 'おきゃくさんにおちゃをさしあげます。', romaji: 'okyaku-san ni ocha o sashiagemasu.', hu: 'Teát adok a vendégnek.',
        cloze: 'お<ruby>客<rt>きゃく</rt></ruby>さんにお<ruby>茶<rt>ちゃ</rt></ruby>を___BLANK___。', clozeAnswer: 'さしあげます',
        tokens: ['おきゃくさんに', 'おちゃを', 'さしあげます', '。'] }
    ],
    contrasts: ['agemasu', 'itadakimasu']
  },
  {
    id: 'itadakimasu', label: 'いただきます・くださいます', jlpt: 'N4', category: 'giving', lesson: 'l18',
    summary: 'Tisztelt embertől kapok.',
    structure: 'tisztelt személy に いただきます · tisztelt személy が くださいます',
    explanation: 'A もらいます szerény párja いただきます, a くれます tiszteletteljes párja くださいます. Ugyanazt mondják két szemszögből.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をいただきました。',
        kana: 'せんせいにほんをいただきました。', romaji: 'sensei ni hon o itadakimashita.', hu: 'Könyvet kaptam a tanár úrtól.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>を___BLANK___。', clozeAnswer: 'いただきました',
        tokens: ['せんせいに', 'ほんを', 'いただきました', '。'] },
      { jp: '<ruby>社長<rt>しゃちょう</rt></ruby>がお<ruby>土産<rt>みやげ</rt></ruby>をくださいました。',
        kana: 'しゃちょうがおみやげをくださいました。', romaji: 'shachou ga omiyage o kudasaimashita.', hu: 'Az igazgató úr ajándékot adott nekem.',
        cloze: '<ruby>社長<rt>しゃちょう</rt></ruby>がお<ruby>土産<rt>みやげ</rt></ruby>を___BLANK___。', clozeAnswer: 'くださいました',
        tokens: ['しゃちょうが', 'おみやげを', 'くださいました', '。'] }
    ],
    contrasts: ['moraimasu', 'kuremasu', 'sashiagemasu']
  },

  /* ── l19 ── */
  {
    id: 'te_iku_way', label: '〜ていきます (mód)', jlpt: 'N4', category: 'sequence', lesson: 'l19',
    summary: 'Hogyan mész: gyalog, valamit vive, valamit megtéve.',
    structure: 'ige て-alakja + いきます / きます',
    explanation: 'Az első ige megmondja, hogyan vagy mit csinálva indulsz el: 歩いていきます, 持っていきます, 食べていきます.',
    examples: [
      { jp: '<ruby>駅<rt>えき</rt></ruby>まで<ruby>歩<rt>ある</rt></ruby>いていきます。',
        kana: 'えきまであるいていきます。', romaji: 'eki made aruite ikimasu.', hu: 'Az állomásig gyalog megyek.',
        cloze: '<ruby>駅<rt>えき</rt></ruby>まで<ruby>歩<rt>ある</rt></ruby>い___BLANK___。', clozeAnswer: 'ていきます',
        tokens: ['えきまで', 'あるいていきます', '。'] },
      { jp: '<ruby>傘<rt>かさ</rt></ruby>を<ruby>持<rt>も</rt></ruby>っていきます。',
        kana: 'かさをもっていきます。', romaji: 'kasa o motte ikimasu.', hu: 'Viszek esernyőt.',
        cloze: '<ruby>傘<rt>かさ</rt></ruby>を<ruby>持<rt>も</rt></ruby>っ___BLANK___。', clozeAnswer: 'ていきます',
        tokens: ['かさを', 'もっていきます', '。'] }
    ],
    contrasts: ['te_kuru_go', 'de_means']
  },
  {
    id: 'wo_route', label: '〜を (útvonal)', jlpt: 'N4', category: 'particle', lesson: 'l19',
    summary: 'Útvonal vagy elhagyott hely: „valamin át, valamiről le".',
    structure: 'hely を + mozgást jelentő ige',
    explanation: 'A を azt a helyet is jelöli, amelyen áthaladsz (橋を渡ります), vagy amelyet elhagysz (電車を降ります).',
    examples: [
      { jp: 'この<ruby>橋<rt>はし</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>ります。',
        kana: 'このはしをわたります。', romaji: 'kono hashi o watarimasu.', hu: 'Átmegyek ezen a hídon.',
        cloze: 'この<ruby>橋<rt>はし</rt></ruby>___BLANK___<ruby>渡<rt>わた</rt></ruby>ります。', clozeAnswer: 'を',
        tokens: ['この', 'はしを', 'わたります', '。'] },
      { jp: '<ruby>次<rt>つぎ</rt></ruby>の<ruby>駅<rt>えき</rt></ruby>で<ruby>電車<rt>でんしゃ</rt></ruby>を<ruby>降<rt>お</rt></ruby>ります。',
        kana: 'つぎのえきででんしゃをおります。', romaji: 'tsugi no eki de densha o orimasu.', hu: 'A következő állomáson szállok le a vonatról.',
        cloze: '<ruby>次<rt>つぎ</rt></ruby>の<ruby>駅<rt>えき</rt></ruby>で<ruby>電車<rt>でんしゃ</rt></ruby>___BLANK___<ruby>降<rt>お</rt></ruby>ります。', clozeAnswer: 'を',
        tokens: ['つぎのえきで', 'でんしゃを', 'おります', '。'] }
    ],
    contrasts: ['wo_object', 'de_place']
  },
  {
    id: 'dake', label: '〜だけ', jlpt: 'N4', category: 'degree', lesson: 'l19',
    summary: 'Korlátozás állító mondatban: „csak".',
    structure: 'főnév + だけ',
    explanation: 'A だけ semleges korlátozás, állító igével. Ha kevésnek érzed: 〜しか + tagadás.',
    examples: [
      { jp: '<ruby>一<rt>ひと</rt></ruby>つだけ<ruby>買<rt>か</rt></ruby>いました。',
        kana: 'ひとつだけかいました。', romaji: 'hitotsu dake kaimashita.', hu: 'Csak egyet vettem.',
        cloze: '<ruby>一<rt>ひと</rt></ruby>つ___BLANK___<ruby>買<rt>か</rt></ruby>いました。', clozeAnswer: 'だけ',
        tokens: ['ひとつだけ', 'かいました', '。'] },
      { jp: '<ruby>日曜日<rt>にちようび</rt></ruby>だけ<ruby>休<rt>やす</rt></ruby>みます。',
        kana: 'にちようびだけやすみます。', romaji: 'nichiyoubi dake yasumimasu.', hu: 'Csak vasárnap pihenek.',
        cloze: '<ruby>日曜日<rt>にちようび</rt></ruby>___BLANK___<ruby>休<rt>やす</rt></ruby>みます。', clozeAnswer: 'だけ',
        tokens: ['にちようびだけ', 'やすみます', '。'] }
    ],
    contrasts: ['shika_nai']
  },
  {
    id: 'shika_nai', label: '〜しか + 〜ません', jlpt: 'N4', category: 'degree', lesson: 'l19',
    summary: '„Csak" kevesellve: mindig tagadó igével.',
    structure: 'főnév + しか + tagadó ige',
    explanation: 'A しか azt érzékelteti, hogy kevés: „csak ennyi, több nincs". Az ige alakja tagadó, a jelentés mégis állító.',
    examples: [
      { jp: '<ruby>百円<rt>ひゃくえん</rt></ruby>しかありません。',
        kana: 'ひゃくえんしかありません。', romaji: 'hyakuen shika arimasen.', hu: 'Csak száz jenem van.',
        cloze: '<ruby>百円<rt>ひゃくえん</rt></ruby>___BLANK___ありません。', clozeAnswer: 'しか',
        tokens: ['ひゃくえんしか', 'ありません', '。'] },
      { jp: '<ruby>朝<rt>あさ</rt></ruby>はコーヒーしか<ruby>飲<rt>の</rt></ruby>みません。',
        kana: 'あさはコーヒーしかのみません。', romaji: 'asa wa koohii shika nomimasen.', hu: 'Reggel csak kávét iszom.',
        cloze: '<ruby>朝<rt>あさ</rt></ruby>はコーヒー___BLANK___<ruby>飲<rt>の</rt></ruby>みません。', clozeAnswer: 'しか',
        tokens: ['あさは', 'コーヒーしか', 'のみません', '。'] }
    ],
    contrasts: ['dake', 'amari_masen']
  },

  /* ── l20 ── */
  {
    id: 'te_iru_result', label: '〜ています (eredmény)', jlpt: 'N4', category: 'state', lesson: 'l20',
    summary: 'Egy változás megmaradt eredménye: „nyitva van, ég".',
    structure: 'tárgyatlan ige て-alakja + います',
    explanation: 'Tárgyatlan igével a 〜ています azt az állapotot írja le, amely a változás után megmaradt: 開いています, 消えています.',
    examples: [
      { jp: '<ruby>窓<rt>まど</rt></ruby>が<ruby>開<rt>あ</rt></ruby>いています。',
        kana: 'まどがあいています。', romaji: 'mado ga aite imasu.', hu: 'Nyitva van az ablak.',
        cloze: '<ruby>窓<rt>まど</rt></ruby>が<ruby>開<rt>あ</rt></ruby>い___BLANK___。', clozeAnswer: 'ています',
        tokens: ['まどが', 'あいています', '。'] },
      { jp: '<ruby>電気<rt>でんき</rt></ruby>がついています。',
        kana: 'でんきがついています。', romaji: 'denki ga tsuite imasu.', hu: 'Ég a villany.',
        cloze: '<ruby>電気<rt>でんき</rt></ruby>がつい___BLANK___。', clozeAnswer: 'ています',
        tokens: ['でんきが', 'ついています', '。'] }
    ],
    contrasts: ['te_aru', 'te_iru_progress']
  },
  {
    id: 'ka_ka', label: 'A か B か', jlpt: 'N4', category: 'connective', lesson: 'l20',
    summary: 'Választási lehetőség: „vagy… vagy…".',
    structure: 'A か B (か)',
    explanation: 'A か két lehetőséget kínál fel. Mondatba ágyazva: 行くか行かないか (megyek-e vagy sem).',
    examples: [
      { jp: 'コーヒーか<ruby>紅茶<rt>こうちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。',
        kana: 'コーヒーかこうちゃをのみます。', romaji: 'koohii ka koucha o nomimasu.', hu: 'Kávét vagy teát iszom.',
        cloze: 'コーヒー___BLANK___<ruby>紅茶<rt>こうちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。', clozeAnswer: 'か',
        tokens: ['コーヒーか', 'こうちゃを', 'のみます', '。'] },
      { jp: '<ruby>土曜日<rt>どようび</rt></ruby>か<ruby>日曜日<rt>にちようび</rt></ruby>に<ruby>行<rt>い</rt></ruby>きましょう。',
        kana: 'どようびかにちようびにいきましょう。', romaji: 'doyoubi ka nichiyoubi ni ikimashou.', hu: 'Menjünk szombaton vagy vasárnap!',
        cloze: '<ruby>土曜日<rt>どようび</rt></ruby>___BLANK___<ruby>日曜日<rt>にちようび</rt></ruby>に<ruby>行<rt>い</rt></ruby>きましょう。', clozeAnswer: 'か',
        tokens: ['どようびか', 'にちようびに', 'いきましょう', '。'] }
    ],
    contrasts: ['to_ya', 'ka_question']
  },
  {
    id: 'ni_tsukau', label: '〜に 使います', jlpt: 'N4', category: 'reason', lesson: 'l20',
    summary: 'Rendeltetés: „mire való, mire használom".',
    structure: 'főnév に / ige szótári alakja + のに + 使います',
    explanation: 'A に megmondja, mire szolgál valami. Igével: 切るのに使います.',
    examples: [
      { jp: 'これは<ruby>料理<rt>りょうり</rt></ruby>に<ruby>使<rt>つか</rt></ruby>います。',
        kana: 'これはりょうりにつかいます。', romaji: 'kore wa ryouri ni tsukaimasu.', hu: 'Ezt főzéshez használom.',
        cloze: 'これは<ruby>料理<rt>りょうり</rt></ruby>___BLANK___<ruby>使<rt>つか</rt></ruby>います。', clozeAnswer: 'に',
        tokens: ['これは', 'りょうりに', 'つかいます', '。'] },
      { jp: 'このはさみは<ruby>紙<rt>かみ</rt></ruby>を<ruby>切<rt>き</rt></ruby>るのに<ruby>使<rt>つか</rt></ruby>います。',
        kana: 'このはさみはかみをきるのにつかいます。', romaji: 'kono hasami wa kami o kiru no ni tsukaimasu.', hu: 'Ezt az ollót papírvágásra használom.',
        cloze: 'このはさみは<ruby>紙<rt>かみ</rt></ruby>を<ruby>切<rt>き</rt></ruby>る___BLANK___<ruby>使<rt>つか</rt></ruby>います。', clozeAnswer: 'のに',
        tokens: ['この', 'はさみは', 'かみを', 'きるのに', 'つかいます', '。'] }
    ],
    contrasts: ['ni_iku_purpose']
  },
  {
    id: 'de_total', label: '〜で (összesen)', jlpt: 'N4', category: 'particle', lesson: 'l20',
    summary: 'Mennyiségi keret: „ennyiért, ennyien, ennyi idő alatt".',
    structure: 'mennyiség + で',
    explanation: 'A で a keretet adja meg: 三つで五百円 (három darab 500 jen), 一人で (egyedül), 一時間で (egy óra alatt).',
    examples: [
      { jp: 'りんごは<ruby>三<rt>みっ</rt></ruby>つで<ruby>五百円<rt>ごひゃくえん</rt></ruby>です。',
        kana: 'りんごはみっつでごひゃくえんです。', romaji: 'ringo wa mittsu de gohyakuen desu.', hu: 'Az alma három darab ötszáz jen.',
        cloze: 'りんごは<ruby>三<rt>みっ</rt></ruby>つ___BLANK___<ruby>五百円<rt>ごひゃくえん</rt></ruby>です。', clozeAnswer: 'で',
        tokens: ['りんごは', 'みっつで', 'ごひゃくえんです', '。'] },
      { jp: '<ruby>一時間<rt>いちじかん</rt></ruby>で<ruby>終<rt>お</rt></ruby>わります。',
        kana: 'いちじかんでおわります。', romaji: 'ichijikan de owarimasu.', hu: 'Egy óra alatt végzek.',
        cloze: '<ruby>一時間<rt>いちじかん</rt></ruby>___BLANK___<ruby>終<rt>お</rt></ruby>わります。', clozeAnswer: 'で',
        tokens: ['いちじかんで', 'おわります', '。'] }
    ],
    contrasts: ['de_means', 'de_place']
  },
  {
    id: 'to_iu', label: '〜という', jlpt: 'N4', category: 'quotation', lesson: 'l20',
    summary: 'Megnevezés főnév előtt: „… nevű, … című".',
    structure: 'név + という + főnév',
    explanation: 'Olyan dolgot nevezel meg, amelyet a másik talán nem ismer.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>という<ruby>人<rt>ひと</rt></ruby>から<ruby>電話<rt>でんわ</rt></ruby>がありました。',
        kana: 'たなかというひとからでんわがありました。', romaji: 'tanaka to iu hito kara denwa ga arimashita.', hu: 'Egy Tanaka nevű ember telefonált.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>___BLANK___<ruby>人<rt>ひと</rt></ruby>から<ruby>電話<rt>でんわ</rt></ruby>がありました。', clozeAnswer: 'という',
        tokens: ['たなかという', 'ひとから', 'でんわが', 'ありました', '。'] },
      { jp: '「さくら」という<ruby>店<rt>みせ</rt></ruby>を<ruby>知<rt>し</rt></ruby>っていますか。',
        kana: '「さくら」というみせをしっていますか。', romaji: 'sakura to iu mise o shitte imasu ka.', hu: 'Ismered a Szakura nevű boltot?',
        cloze: '「さくら」___BLANK___<ruby>店<rt>みせ</rt></ruby>を<ruby>知<rt>し</rt></ruby>っていますか。', clozeAnswer: 'という',
        tokens: ['「さくら」という', 'みせを', 'しっていますか', '。'] }
    ],
    contrasts: ['to_iimasu']
  },

  /* ── l21 ── */
  {
    id: 'ku_suru', label: '〜くします・〜にします', jlpt: 'N4', category: 'change', lesson: 'l21',
    summary: 'Szándékos változtatás: „valamilyenné teszem".',
    structure: 'い → くします · な-melléknév / főnév + にします',
    explanation: 'Valaki tudatosan megváltoztat valamit. Ha magától változik: 〜くなります / 〜になります.',
    examples: [
      { jp: '<ruby>部屋<rt>へや</rt></ruby>を<ruby>明<rt>あか</rt></ruby>るくします。',
        kana: 'へやをあかるくします。', romaji: 'heya o akaruku shimasu.', hu: 'Világosabbá teszem a szobát.',
        cloze: '<ruby>部屋<rt>へや</rt></ruby>を<ruby>明<rt>あか</rt></ruby>る___BLANK___。', clozeAnswer: 'くします',
        tokens: ['へやを', 'あかるくします', '。'] },
      { jp: '<ruby>音<rt>おと</rt></ruby>を<ruby>小<rt>ちい</rt></ruby>さくしてください。',
        kana: 'おとをちいさくしてください。', romaji: 'oto o chiisaku shite kudasai.', hu: 'Kérem, halkítsa le!',
        cloze: '<ruby>音<rt>おと</rt></ruby>を<ruby>小<rt>ちい</rt></ruby>さ___BLANK___ください。', clozeAnswer: 'くして',
        tokens: ['おとを', 'ちいさくしてください', '。'] }
    ],
    contrasts: ['ku_naru', 'ni_shimasu']
  },
  {
    id: 'te_aru', label: '〜てあります', jlpt: 'N4', category: 'state', lesson: 'l21',
    summary: 'Szándékos előkészítés eredménye: „el van készítve".',
    structure: 'tárgy が + tárgyas ige て-alakja + あります',
    explanation: 'Valaki szándékosan megtette, és az eredménye most látható. A 〜ています (tárgyatlan igével) csak az állapotot közli.',
    examples: [
      { jp: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>にメモが<ruby>置<rt>お</rt></ruby>いてあります。',
        kana: 'つくえのうえにメモがおいてあります。', romaji: 'tsukue no ue ni memo ga oite arimasu.', hu: 'Az asztalra ki van téve egy cetli.',
        cloze: '<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>にメモが<ruby>置<rt>お</rt></ruby>い___BLANK___。', clozeAnswer: 'てあります',
        tokens: ['つくえのうえに', 'メモが', 'おいてあります', '。'] },
      { jp: '<ruby>窓<rt>まど</rt></ruby>が<ruby>開<rt>あ</rt></ruby>けてあります。',
        kana: 'まどがあけてあります。', romaji: 'mado ga akete arimasu.', hu: 'Az ablak ki van nyitva (valaki kinyitotta).',
        cloze: '<ruby>窓<rt>まど</rt></ruby>が<ruby>開<rt>あ</rt></ruby>け___BLANK___。', clozeAnswer: 'てあります',
        tokens: ['まどが', 'あけてあります', '。'] }
    ],
    contrasts: ['te_iru_result', 'te_oku']
  },
  {
    id: 'to_iimasu', label: '〜といいます', jlpt: 'N4', category: 'quotation', lesson: 'l21',
    summary: 'Megnevezés: „úgy hívják, úgy mondják".',
    structure: 'A は B と いいます',
    explanation: 'Megmondod valaminek a nevét, vagy azt, hogyan mondják egy nyelven.',
    examples: [
      { jp: 'これは<ruby>日本語<rt>にほんご</rt></ruby>で「はし」といいます。',
        kana: 'これはにほんごで「はし」といいます。', romaji: 'kore wa nihongo de hashi to iimasu.', hu: 'Ezt japánul „hasi"-nak mondják.',
        cloze: 'これは<ruby>日本語<rt>にほんご</rt></ruby>で「はし」___BLANK___いいます。', clozeAnswer: 'と',
        tokens: ['これは', 'にほんごで', '「はし」と', 'いいます', '。'] },
      { jp: '<ruby>私<rt>わたし</rt></ruby>はアンナといいます。',
        kana: 'わたしはアンナといいます。', romaji: 'watashi wa anna to iimasu.', hu: 'Annának hívnak.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>はアンナ___BLANK___。', clozeAnswer: 'といいます',
        tokens: ['わたしは', 'アンナといいます', '。'] }
    ],
    contrasts: ['to_iu', 'to_iimashita']
  },
  {
    id: 'to_iimashita', label: '〜といいました', jlpt: 'N4', category: 'quotation', lesson: 'l21',
    summary: 'Idézés: „azt mondta, hogy…".',
    structure: 'rövid alakú mondat + と いいました',
    explanation: 'Más szavait adod vissza: az idézett rész rövid alakban áll, utána と.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>明日<rt>あした</rt></ruby><ruby>来<rt>く</rt></ruby>ると<ruby>言<rt>い</rt></ruby>いました。',
        kana: 'たなかさんはあしたくるといいました。', romaji: 'tanaka-san wa ashita kuru to iimashita.', hu: 'Tanaka azt mondta, hogy holnap jön.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>明日<rt>あした</rt></ruby><ruby>来<rt>く</rt></ruby>る___BLANK___<ruby>言<rt>い</rt></ruby>いました。', clozeAnswer: 'と',
        tokens: ['たなかさんは', 'あした', 'くると', 'いいました', '。'] },
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>試験<rt>しけん</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しくないと<ruby>言<rt>い</rt></ruby>いました。',
        kana: 'せんせいはしけんはむずかしくないといいました。', romaji: 'sensei wa shiken wa muzukashikunai to iimashita.', hu: 'A tanár azt mondta, hogy a vizsga nem nehéz.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>試験<rt>しけん</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しくない___BLANK___。', clozeAnswer: 'といいました',
        tokens: ['せんせいは', 'しけんは', 'むずかしくない', 'といいました', '。'] }
    ],
    contrasts: ['to_omou', 'to_iimasu', 'sou_da_hearsay']
  },
  {
    id: 'tte', label: '〜って', jlpt: 'N4', category: 'spoken', lesson: 'l21',
    summary: 'A と beszélt változata: idéz vagy rákérdez.',
    structure: 'mondat + って · szó + って + 何？',
    explanation: 'A って a と, a という és a というのは beszélt, baráti alakja.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>来<rt>こ</rt></ruby>ないって<ruby>言<rt>い</rt></ruby>っていたよ。',
        kana: 'たなかさんはこないっていっていたよ。', romaji: 'tanaka-san wa konai tte itte ita yo.', hu: 'Tanaka azt mondta, hogy nem jön.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>来<rt>こ</rt></ruby>ない___BLANK___<ruby>言<rt>い</rt></ruby>っていたよ。', clozeAnswer: 'って',
        tokens: ['たなかさんは', 'こないって', 'いっていたよ', '。'] },
      { jp: '「おにぎり」って<ruby>何<rt>なに</rt></ruby>？',
        kana: '「おにぎり」ってなに？', romaji: 'onigiri tte nani?', hu: 'Mi az az „onigiri"?',
        cloze: '「おにぎり」___BLANK___<ruby>何<rt>なに</rt></ruby>？', clozeAnswer: 'って',
        tokens: ['「おにぎり」って', 'なに', '？'] }
    ],
    contrasts: ['to_iimashita', 'plain_style']
  },

  /* ── l22 ── */
  {
    id: 'te_ageru', label: '〜てあげます', jlpt: 'N4', category: 'giving', lesson: 'l22',
    summary: 'Megteszek valamit valakinek, szívességből.',
    structure: 'ige て-alakja + あげます',
    explanation: 'A beszélő tesz szívességet másnak. Fölényesnek hangozhat: tisztelt embernek inkább お〜しましょうか.',
    examples: [
      { jp: '<ruby>友<rt>とも</rt></ruby>だちに<ruby>傘<rt>かさ</rt></ruby>を<ruby>貸<rt>か</rt></ruby>してあげました。',
        kana: 'ともだちにかさをかしてあげました。', romaji: 'tomodachi ni kasa o kashite agemashita.', hu: 'Kölcsönadtam az esernyőmet a barátomnak.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だちに<ruby>傘<rt>かさ</rt></ruby>を<ruby>貸<rt>か</rt></ruby>し___BLANK___。', clozeAnswer: 'てあげました',
        tokens: ['ともだちに', 'かさを', 'かしてあげました', '。'] },
      { jp: '<ruby>妹<rt>いもうと</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んであげます。',
        kana: 'いもうとにほんをよんであげます。', romaji: 'imouto ni hon o yonde agemasu.', hu: 'Felolvasok a húgomnak.',
        cloze: '<ruby>妹<rt>いもうと</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>ん___BLANK___。', clozeAnswer: 'であげます',
        tokens: ['いもうとに', 'ほんを', 'よんであげます', '。'] }
    ],
    contrasts: ['te_kureru', 'te_morau', 'agemasu']
  },
  {
    id: 'te_kureru', label: '〜てくれます', jlpt: 'N4', category: 'giving', lesson: 'l22',
    summary: 'Valaki megtesz valamit nekem.',
    structure: 'személy が + ige て-alakja + くれます',
    explanation: 'Más tesz szívességet a beszélőnek: a mondat hálát sugall.',
    examples: [
      { jp: '<ruby>兄<rt>あに</rt></ruby>が<ruby>自転車<rt>じてんしゃ</rt></ruby>を<ruby>直<rt>なお</rt></ruby>してくれました。',
        kana: 'あにがじてんしゃをなおしてくれました。', romaji: 'ani ga jitensha o naoshite kuremashita.', hu: 'A bátyám megjavította nekem a biciklit.',
        cloze: '<ruby>兄<rt>あに</rt></ruby>が<ruby>自転車<rt>じてんしゃ</rt></ruby>を<ruby>直<rt>なお</rt></ruby>し___BLANK___。', clozeAnswer: 'てくれました',
        tokens: ['あにが', 'じてんしゃを', 'なおしてくれました', '。'] },
      { jp: '<ruby>友<rt>とも</rt></ruby>だちが<ruby>駅<rt>えき</rt></ruby>まで<ruby>送<rt>おく</rt></ruby>ってくれました。',
        kana: 'ともだちがえきまでおくってくれました。', romaji: 'tomodachi ga eki made okutte kuremashita.', hu: 'A barátom elkísért az állomásig.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だちが<ruby>駅<rt>えき</rt></ruby>まで<ruby>送<rt>おく</rt></ruby>っ___BLANK___。', clozeAnswer: 'てくれました',
        tokens: ['ともだちが', 'えきまで', 'おくってくれました', '。'] }
    ],
    contrasts: ['te_ageru', 'te_morau', 'kuremasu']
  },
  {
    id: 'te_morau', label: '〜てもらいます', jlpt: 'N4', category: 'giving', lesson: 'l22',
    summary: 'Megkérek valakit, és megteszi nekem.',
    structure: 'személy に + ige て-alakja + もらいます',
    explanation: 'A beszélő az alany: ő kapja a szívességet, többnyire kérésre.',
    examples: [
      { jp: '<ruby>友<rt>とも</rt></ruby>だちに<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ってもらいました。',
        kana: 'ともだちにしゃしんをとってもらいました。', romaji: 'tomodachi ni shashin o totte moraimashita.', hu: 'Megkértem a barátomat, hogy fényképezzen le.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だちに<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>っ___BLANK___。', clozeAnswer: 'てもらいました',
        tokens: ['ともだちに', 'しゃしんを', 'とってもらいました', '。'] },
      { jp: '<ruby>姉<rt>あね</rt></ruby>に<ruby>宿題<rt>しゅくだい</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>ってもらいます。',
        kana: 'あねにしゅくだいをてつだってもらいます。', romaji: 'ane ni shukudai o tetsudatte moraimasu.', hu: 'A nővérem segít nekem a leckében.',
        cloze: '<ruby>姉<rt>あね</rt></ruby>に<ruby>宿題<rt>しゅくだい</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>っ___BLANK___。', clozeAnswer: 'てもらいます',
        tokens: ['あねに', 'しゅくだいを', 'てつだってもらいます', '。'] }
    ],
    contrasts: ['te_ageru', 'te_kureru', 'moraimasu']
  },
  {
    id: 'te_kurete_arigatou', label: '〜てくれて、ありがとう', jlpt: 'N4', category: 'giving', lesson: 'l22',
    summary: 'Köszönet egy szívességért: „köszönöm, hogy…".',
    structure: 'ige て-alakja + くれて、ありがとう',
    explanation: 'A köszönet oka て-alakban áll. Udvariasan: 〜てくださって、ありがとうございます.',
    examples: [
      { jp: '<ruby>手伝<rt>てつだ</rt></ruby>ってくれて、ありがとう。',
        kana: 'てつだってくれて、ありがとう。', romaji: 'tetsudatte kurete, arigatou.', hu: 'Köszi, hogy segítettél.',
        cloze: '<ruby>手伝<rt>てつだ</rt></ruby>っ___BLANK___、ありがとう。', clozeAnswer: 'てくれて',
        tokens: ['てつだってくれて', '、', 'ありがとう', '。'] },
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>来<rt>き</rt></ruby>てくれて、ありがとう。',
        kana: 'きょうはきてくれて、ありがとう。', romaji: 'kyou wa kite kurete, arigatou.', hu: 'Köszi, hogy ma eljöttél.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>来<rt>き</rt></ruby>___BLANK___、ありがとう。', clozeAnswer: 'てくれて',
        tokens: ['きょうは', 'きてくれて', '、', 'ありがとう', '。'] }
    ],
    contrasts: ['te_kureru', 'te_reason']
  },
  {
    id: 'te_oku', label: '〜ておきます', jlpt: 'N4', category: 'state', lesson: 'l22',
    summary: 'Előkészület: előre megteszem, vagy úgy hagyom.',
    structure: 'ige て-alakja + おきます',
    explanation: 'Valamit előre megcsinálsz egy későbbi célra, vagy szándékosan úgy hagyod. Beszédben: 〜とく.',
    examples: [
      { jp: '<ruby>旅行<rt>りょこう</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>っておきます。',
        kana: 'りょこうのまえにきっぷをかっておきます。', romaji: 'ryokou no mae ni kippu o katte okimasu.', hu: 'Az utazás előtt megveszem a jegyet.',
        cloze: '<ruby>旅行<rt>りょこう</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>っ___BLANK___。', clozeAnswer: 'ておきます',
        tokens: ['りょこうのまえに', 'きっぷを', 'かっておきます', '。'] },
      { jp: '<ruby>窓<rt>まど</rt></ruby>は<ruby>開<rt>あ</rt></ruby>けておいてください。',
        kana: 'まどはあけておいてください。', romaji: 'mado wa akete oite kudasai.', hu: 'Az ablakot hagyja nyitva, kérem!',
        cloze: '<ruby>窓<rt>まど</rt></ruby>は<ruby>開<rt>あ</rt></ruby>け___BLANK___ください。', clozeAnswer: 'ておいて',
        tokens: ['まどは', 'あけておいてください', '。'] }
    ],
    contrasts: ['te_aru', 'te_shimau']
  },

  /* ── l23 ── */
  {
    id: 'te_itadaku', label: '〜ていただきます・〜てくださいます', jlpt: 'N4', category: 'honorific', lesson: 'l23',
    summary: 'Tisztelt ember tesz szívességet nekem.',
    structure: 'személy に 〜ていただきます · személy が 〜てくださいます',
    explanation: 'A 〜てもらいます és a 〜てくれます tiszteletteljes párja: tanárról, főnökről, vendégről.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>作文<rt>さくぶん</rt></ruby>を<ruby>見<rt>み</rt></ruby>ていただきました。',
        kana: 'せんせいにさくぶんをみていただきました。', romaji: 'sensei ni sakubun o mite itadakimashita.', hu: 'A tanár úr megnézte a fogalmazásomat.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>作文<rt>さくぶん</rt></ruby>を<ruby>見<rt>み</rt></ruby>___BLANK___。', clozeAnswer: 'ていただきました',
        tokens: ['せんせいに', 'さくぶんを', 'みていただきました', '。'] },
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>が<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてくださいました。',
        kana: 'せんせいがかんじをおしえてくださいました。', romaji: 'sensei ga kanji o oshiete kudasaimashita.', hu: 'A tanár úr megtanította nekem a kanjikat.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>が<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>教<rt>おし</rt></ruby>え___BLANK___。', clozeAnswer: 'てくださいました',
        tokens: ['せんせいが', 'かんじを', 'おしえてくださいました', '。'] }
    ],
    contrasts: ['te_morau', 'te_kureru']
  },
  {
    id: 'te_kuremasenka', label: '〜てくれませんか', jlpt: 'N4', category: 'request', lesson: 'l23',
    summary: 'Baráti, udvarias kérés: „megtennéd?"',
    structure: 'ige て-alakja + くれませんか',
    explanation: 'Közvetlenebb a 〜てください-nál: kérdés formájában kérsz. Barátnak: 〜てくれない？',
    examples: [
      { jp: 'ちょっと<ruby>手伝<rt>てつだ</rt></ruby>ってくれませんか。',
        kana: 'ちょっとてつだってくれませんか。', romaji: 'chotto tetsudatte kuremasen ka.', hu: 'Segítenél egy kicsit?',
        cloze: 'ちょっと<ruby>手伝<rt>てつだ</rt></ruby>っ___BLANK___。', clozeAnswer: 'てくれませんか',
        tokens: ['ちょっと', 'てつだってくれませんか', '。'] },
      { jp: '<ruby>塩<rt>しお</rt></ruby>を<ruby>取<rt>と</rt></ruby>ってくれませんか。',
        kana: 'しおをとってくれませんか。', romaji: 'shio o totte kuremasen ka.', hu: 'Ideadnád a sót?',
        cloze: '<ruby>塩<rt>しお</rt></ruby>を<ruby>取<rt>と</rt></ruby>っ___BLANK___。', clozeAnswer: 'てくれませんか',
        tokens: ['しおを', 'とってくれませんか', '。'] }
    ],
    contrasts: ['te_kudasai', 'te_itadakemasenka']
  },
  {
    id: 'te_itadakemasenka', label: '〜ていただけませんか', jlpt: 'N4', category: 'request', lesson: 'l23',
    summary: 'Nagyon udvarias kérés: „megtenné, kérem?"',
    structure: 'ige て-alakja + いただけませんか',
    explanation: 'A legudvariasabb kérés: tanárnak, idegennek, hivatalos helyzetben. Előtte gyakran: すみませんが….',
    examples: [
      { jp: 'もう<ruby>一度<rt>いちど</rt></ruby><ruby>説明<rt>せつめい</rt></ruby>していただけませんか。',
        kana: 'もういちどせつめいしていただけませんか。', romaji: 'mou ichido setsumei shite itadakemasen ka.', hu: 'Elmagyarázná még egyszer, kérem?',
        cloze: 'もう<ruby>一度<rt>いちど</rt></ruby><ruby>説明<rt>せつめい</rt></ruby>し___BLANK___。', clozeAnswer: 'ていただけませんか',
        tokens: ['もういちど', 'せつめい', 'していただけませんか', '。'] },
      { jp: '<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>っていただけませんか。',
        kana: 'しゃしんをとっていただけませんか。', romaji: 'shashin o totte itadakemasen ka.', hu: 'Lefényképezne, kérem?',
        cloze: '<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>っ___BLANK___。', clozeAnswer: 'ていただけませんか',
        tokens: ['しゃしんを', 'とっていただけませんか', '。'] }
    ],
    contrasts: ['te_kuremasenka', 'o_kudasai']
  },
  {
    id: 'no_nominalizer', label: '〜の (igéből főnév)', jlpt: 'N4', category: 'nominal', lesson: 'l23',
    summary: 'Cselekvés mint dolog: „szeretek úszni, nehéz írni".',
    structure: 'ige szótári alakja + の + が / は',
    explanation: 'A の főnévvé teszi az igét: 泳ぐのが好きです. Tetszés, nehézség, érzékelés előtt ez a természetes.',
    examples: [
      { jp: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>るのが<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'えいがをみるのがすきです。', romaji: 'eiga o miru no ga suki desu.', hu: 'Szeretek filmet nézni.',
        cloze: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>る___BLANK___が<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'の',
        tokens: ['えいがを', 'みるのが', 'すきです', '。'] },
      { jp: '<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>書<rt>か</rt></ruby>くのは<ruby>難<rt>むずか</rt></ruby>しいです。',
        kana: 'かんじをかくのはむずかしいです。', romaji: 'kanji o kaku no wa muzukashii desu.', hu: 'Kanjit írni nehéz.',
        cloze: '<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>書<rt>か</rt></ruby>く___BLANK___は<ruby>難<rt>むずか</rt></ruby>しいです。', clozeAnswer: 'の',
        tokens: ['かんじを', 'かくのは', 'むずかしいです', '。'] }
    ],
    contrasts: ['koto_desu', 'no_pronoun']
  },
  {
    id: 'mada_mou', label: 'まだ〜ます・もう〜ません', jlpt: 'N4', category: 'state', lesson: 'l23',
    summary: '„Még mindig" és „már nem".',
    structure: 'まだ + állító alak · もう + tagadó alak',
    explanation: 'A まだ állító igével azt jelenti: még tart. A もう tagadóval: már nincs így.',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>はまだ<ruby>降<rt>ふ</rt></ruby>っています。',
        kana: 'あめはまだふっています。', romaji: 'ame wa mada futte imasu.', hu: 'Még mindig esik.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>は___BLANK___<ruby>降<rt>ふ</rt></ruby>っています。', clozeAnswer: 'まだ',
        tokens: ['あめは', 'まだ', 'ふっています', '。'] },
      { jp: 'お<ruby>金<rt>かね</rt></ruby>はもうありません。',
        kana: 'おかねはもうありません。', romaji: 'okane wa mou arimasen.', hu: 'Már nincs pénzem.',
        cloze: 'お<ruby>金<rt>かね</rt></ruby>は___BLANK___ありません。', clozeAnswer: 'もう',
        tokens: ['おかねは', 'もう', 'ありません', '。'] }
    ],
    contrasts: ['mou_mada']
  },
  {
    id: 'de_kara_tsukuru', label: '〜で・〜から つくります', jlpt: 'N4', category: 'particle', lesson: 'l23',
    summary: 'Miből készül: látható anyag (で) vagy átalakult alapanyag (から).',
    structure: 'anyag で / から + つくります',
    explanation: 'Ha az anyag felismerhető marad (fa, papír): で. Ha átalakul (szőlő → bor): から.',
    examples: [
      { jp: 'このいすは<ruby>木<rt>き</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ります。',
        kana: 'このいすはきでつくります。', romaji: 'kono isu wa ki de tsukurimasu.', hu: 'Ezt a széket fából készítik.',
        cloze: 'このいすは<ruby>木<rt>き</rt></ruby>___BLANK___<ruby>作<rt>つく</rt></ruby>ります。', clozeAnswer: 'で',
        tokens: ['この', 'いすは', 'きで', 'つくります', '。'] },
      { jp: 'ワインはぶどうから<ruby>作<rt>つく</rt></ruby>ります。',
        kana: 'ワインはぶどうからつくります。', romaji: 'wain wa budou kara tsukurimasu.', hu: 'A bort szőlőből készítik.',
        cloze: 'ワインはぶどう___BLANK___<ruby>作<rt>つく</rt></ruby>ります。', clozeAnswer: 'から',
        tokens: ['ワインは', 'ぶどうから', 'つくります', '。'] }
    ],
    contrasts: ['de_means', 'kara_made']
  },

  /* ── l24 ── */
  {
    id: 'te_kuru_go', label: '〜てきます (oda és vissza)', jlpt: 'N4', category: 'sequence', lesson: 'l24',
    summary: 'Elmegyek, megteszem, és visszajövök.',
    structure: 'ige て-alakja + きます',
    explanation: 'A cselekvés után a beszélő visszatér oda, ahol most van: 買ってきます, 行ってきます.',
    examples: [
      { jp: 'ちょっと<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>を<ruby>買<rt>か</rt></ruby>ってきます。',
        kana: 'ちょっとのみものをかってきます。', romaji: 'chotto nomimono o katte kimasu.', hu: 'Elugrom innivalóért.',
        cloze: 'ちょっと<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>を<ruby>買<rt>か</rt></ruby>っ___BLANK___。', clozeAnswer: 'てきます',
        tokens: ['ちょっと', 'のみものを', 'かってきます', '。'] },
      { jp: '<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ってきます。',
        kana: 'ゆうびんきょくへいってきます。', romaji: 'yuubinkyoku e itte kimasu.', hu: 'Elmegyek a postára, és jövök.',
        cloze: '<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>へ<ruby>行<rt>い</rt></ruby>っ___BLANK___。', clozeAnswer: 'てきます',
        tokens: ['ゆうびんきょくへ', 'いってきます', '。'] }
    ],
    contrasts: ['te_iku_way']
  },
  {
    id: 'te_kita_change', label: '〜てきました (változás)', jlpt: 'N4', category: 'change', lesson: 'l24',
    summary: 'Változás a múltból mostanáig: „kezd…, egyre inkább".',
    structure: 'változást jelentő ige て-alakja + きました',
    explanation: 'A beszélő felé „érkező" változás: eddig fokozatosan így alakult.',
    examples: [
      { jp: '<ruby>寒<rt>さむ</rt></ruby>くなってきました。',
        kana: 'さむくなってきました。', romaji: 'samuku natte kimashita.', hu: 'Kezd hideg lenni.',
        cloze: '<ruby>寒<rt>さむ</rt></ruby>くなっ___BLANK___。', clozeAnswer: 'てきました',
        tokens: ['さむく', 'なってきました', '。'] },
      { jp: '<ruby>日本語<rt>にほんご</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>しわかってきました。',
        kana: 'にほんごがすこしわかってきました。', romaji: 'nihongo ga sukoshi wakatte kimashita.', hu: 'Kezdem egy kicsit érteni a japánt.',
        cloze: '<ruby>日本語<rt>にほんご</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>しわかっ___BLANK___。', clozeAnswer: 'てきました',
        tokens: ['にほんごが', 'すこし', 'わかってきました', '。'] }
    ],
    contrasts: ['te_iku_change', 'ku_naru']
  },
  {
    id: 'te_iku_change', label: '〜ていきます (változás)', jlpt: 'N4', category: 'change', lesson: 'l24',
    summary: 'Változás mostantól a jövő felé: „ezután is, tovább".',
    structure: 'változást jelentő ige て-alakja + いきます',
    explanation: 'A beszélőtől „távolodó" változás: mostantól így folytatódik.',
    examples: [
      { jp: 'これから<ruby>人口<rt>じんこう</rt></ruby>は<ruby>減<rt>へ</rt></ruby>っていきます。',
        kana: 'これからじんこうはへっていきます。', romaji: 'kore kara jinkou wa hette ikimasu.', hu: 'Ezután a népesség csökkenni fog.',
        cloze: 'これから<ruby>人口<rt>じんこう</rt></ruby>は<ruby>減<rt>へ</rt></ruby>っ___BLANK___。', clozeAnswer: 'ていきます',
        tokens: ['これから', 'じんこうは', 'へっていきます', '。'] },
      { jp: 'これからも<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>していきます。',
        kana: 'これからもにほんごをべんきょうしていきます。', romaji: 'kore kara mo nihongo o benkyou shite ikimasu.', hu: 'Ezután is tovább tanulom a japánt.',
        cloze: 'これからも<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>し___BLANK___。', clozeAnswer: 'ていきます',
        tokens: ['これからも', 'にほんごを', 'べんきょう', 'していきます', '。'] }
    ],
    contrasts: ['te_kita_change', 'te_iku_way']
  },
  {
    id: 'dake_de_naku', label: '〜だけでなく、〜も', jlpt: 'N4', category: 'connective', lesson: 'l24',
    summary: 'Bővítés: „nemcsak…, hanem… is".',
    structure: 'A だけでなく、B も',
    explanation: 'Az első elemhez hozzátesz egy másodikat; a második も-t kap.',
    examples: [
      { jp: '<ruby>英語<rt>えいご</rt></ruby>だけでなく、<ruby>日本語<rt>にほんご</rt></ruby>も<ruby>話<rt>はな</rt></ruby>せます。',
        kana: 'えいごだけでなく、にほんごもはなせます。', romaji: 'eigo dake de naku, nihongo mo hanasemasu.', hu: 'Nemcsak angolul, hanem japánul is tudok.',
        cloze: '<ruby>英語<rt>えいご</rt></ruby>___BLANK___、<ruby>日本語<rt>にほんご</rt></ruby>も<ruby>話<rt>はな</rt></ruby>せます。', clozeAnswer: 'だけでなく',
        tokens: ['えいごだけでなく', '、', 'にほんごも', 'はなせます', '。'] },
      { jp: '<ruby>子<rt>こ</rt></ruby>どもだけでなく、<ruby>大人<rt>おとな</rt></ruby>も<ruby>楽<rt>たの</rt></ruby>しめます。',
        kana: 'こどもだけでなく、おとなもたのしめます。', romaji: 'kodomo dake de naku, otona mo tanoshimemasu.', hu: 'Nemcsak a gyerekek, a felnőttek is élvezhetik.',
        cloze: '<ruby>子<rt>こ</rt></ruby>ども___BLANK___、<ruby>大人<rt>おとな</rt></ruby>も<ruby>楽<rt>たの</rt></ruby>しめます。', clozeAnswer: 'だけでなく',
        tokens: ['こどもだけでなく', '、', 'おとなも', 'たのしめます', '。'] }
    ],
    contrasts: ['dake', 'mo_mo']
  },
  {
    id: 'okage_de', label: '〜のおかげで', jlpt: 'N4', category: 'reason', lesson: 'l24',
    summary: 'Hála: „…-nak köszönhetően" (jó eredmény).',
    structure: 'főnév の おかげで · rövid alak + おかげで',
    explanation: 'Jó eredmény okát nevezi meg, hálával. Rossz eredménynél: 〜のせいで.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>のおかげで、<ruby>合格<rt>ごうかく</rt></ruby>しました。',
        kana: 'せんせいのおかげで、ごうかくしました。', romaji: 'sensei no okage de, goukaku shimashita.', hu: 'A tanár úrnak köszönhetően sikerült a vizsgám.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>の___BLANK___、<ruby>合格<rt>ごうかく</rt></ruby>しました。', clozeAnswer: 'おかげで',
        tokens: ['せんせいのおかげで', '、', 'ごうかくしました', '。'] },
      { jp: '<ruby>友<rt>とも</rt></ruby>だちのおかげで、<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>に<ruby>慣<rt>な</rt></ruby>れました。',
        kana: 'ともだちのおかげで、にほんのせいかつになれました。', romaji: 'tomodachi no okage de, nihon no seikatsu ni naremashita.', hu: 'A barátaimnak köszönhetően megszoktam a japán életet.',
        cloze: '<ruby>友<rt>とも</rt></ruby>だちの___BLANK___、<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>に<ruby>慣<rt>な</rt></ruby>れました。', clozeAnswer: 'おかげで',
        tokens: ['ともだちのおかげで', '、', 'にほんのせいかつに', 'なれました', '。'] }
    ],
    contrasts: ['kara_reason', 'node']
  },

  /* ── l25 ── */
  {
    id: 'darou_to_omou', label: '〜だろうと思います', jlpt: 'N4', category: 'guess', lesson: 'l25',
    summary: 'Saját feltevés: „azt hiszem, valószínűleg…".',
    structure: 'rövid alak + だろう + と思います',
    explanation: 'A でしょう rövid alakja だろう; a と思います hozzátéve a saját véleményedként hangzik.',
    examples: [
      { jp: '<ruby>飛行機<rt>ひこうき</rt></ruby>は<ruby>遅<rt>おく</rt></ruby>れるだろうと<ruby>思<rt>おも</rt></ruby>います。',
        kana: 'ひこうきはおくれるだろうとおもいます。', romaji: 'hikouki wa okureru darou to omoimasu.', hu: 'Azt hiszem, a repülő késni fog.',
        cloze: '<ruby>飛行機<rt>ひこうき</rt></ruby>は<ruby>遅<rt>おく</rt></ruby>れる___BLANK___。', clozeAnswer: 'だろうとおもいます',
        tokens: ['ひこうきは', 'おくれる', 'だろうとおもいます', '。'] },
      { jp: '<ruby>明日<rt>あした</rt></ruby>はいい<ruby>天気<rt>てんき</rt></ruby>だろうと<ruby>思<rt>おも</rt></ruby>います。',
        kana: 'あしたはいいてんきだろうとおもいます。', romaji: 'ashita wa ii tenki darou to omoimasu.', hu: 'Azt hiszem, holnap szép idő lesz.',
        cloze: '<ruby>明日<rt>あした</rt></ruby>はいい<ruby>天気<rt>てんき</rt></ruby>___BLANK___と<ruby>思<rt>おも</rt></ruby>います。', clozeAnswer: 'だろう',
        tokens: ['あしたは', 'いいてんきだろうと', 'おもいます', '。'] }
    ],
    contrasts: ['deshou', 'to_omou', 'hazu_desu']
  },
  {
    id: 'hazu_desu', label: '〜はずです', jlpt: 'N4', category: 'guess', lesson: 'l25',
    summary: 'Megalapozott várakozás: „elvileg így kell lennie".',
    structure: 'rövid alak + はずです (な-melléknév + な, főnév + の)',
    explanation: 'Tények, tervek, menetrend alapján számítasz rá. Nem a saját szándékodról szól.',
    examples: [
      { jp: '<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>十時<rt>じゅうじ</rt></ruby>に<ruby>着<rt>つ</rt></ruby>くはずです。',
        kana: 'でんしゃはじゅうじにつくはずです。', romaji: 'densha wa juuji ni tsuku hazu desu.', hu: 'A vonatnak tízkor kell megérkeznie.',
        cloze: '<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>十時<rt>じゅうじ</rt></ruby>に<ruby>着<rt>つ</rt></ruby>く___BLANK___。', clozeAnswer: 'はずです',
        tokens: ['でんしゃは', 'じゅうじに', 'つくはずです', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんはもう<ruby>知<rt>し</rt></ruby>っているはずです。',
        kana: 'たなかさんはもうしっているはずです。', romaji: 'tanaka-san wa mou shitte iru hazu desu.', hu: 'Tanakának már tudnia kell róla.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんはもう<ruby>知<rt>し</rt></ruby>っている___BLANK___です。', clozeAnswer: 'はず',
        tokens: ['たなかさんは', 'もう', 'しっているはずです', '。'] }
    ],
    contrasts: ['darou_to_omou', 'kamoshirenai', 'ni_chigai_nai']
  },
  {
    id: 'embedded_ka', label: 'kérdőszó + 〜か', jlpt: 'N4', category: 'nominal', lesson: 'l25',
    summary: 'Kérdőszavas kérdés a mondaton belül: „nem tudom, mikor, hol…".',
    structure: 'kérdőszó + rövid alak + か + わかりません / 教えてください',
    explanation: 'A kérdőszavas kérdést beágyazod egy másik mondatba; a beágyazott rész rövid alakban áll, a végén か.',
    examples: [
      { jp: '<ruby>何時<rt>なんじ</rt></ruby>に<ruby>着<rt>つ</rt></ruby>くか、わかりません。',
        kana: 'なんじにつくか、わかりません。', romaji: 'nanji ni tsuku ka, wakarimasen.', hu: 'Nem tudom, hánykor érkezünk.',
        cloze: '<ruby>何時<rt>なんじ</rt></ruby>に<ruby>着<rt>つ</rt></ruby>く___BLANK___、わかりません。', clozeAnswer: 'か',
        tokens: ['なんじに', 'つくか', '、', 'わかりません', '。'] },
      { jp: 'どこで<ruby>買<rt>か</rt></ruby>ったか、<ruby>教<rt>おし</rt></ruby>えてください。',
        kana: 'どこでかったか、おしえてください。', romaji: 'doko de katta ka, oshiete kudasai.', hu: 'Kérlek, mondd meg, hol vetted!',
        cloze: 'どこで<ruby>買<rt>か</rt></ruby>った___BLANK___、<ruby>教<rt>おし</rt></ruby>えてください。', clozeAnswer: 'か',
        tokens: ['どこで', 'かったか', '、', 'おしえてください', '。'] }
    ],
    contrasts: ['ka_dou_ka', 'ka_question']
  },
  {
    id: 'ka_dou_ka', label: '〜かどうか', jlpt: 'N4', category: 'nominal', lesson: 'l25',
    summary: 'Eldöntendő kérdés a mondaton belül: „hogy …-e".',
    structure: 'rövid alak + かどうか + わかりません / 聞きます',
    explanation: 'Ha nincs kérdőszó, かどうか kell: „igen vagy nem?" Kérdőszóval csak か.',
    examples: [
      { jp: '<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>うかどうか、わかりません。',
        kana: 'まにあうかどうか、わかりません。', romaji: 'ma ni au ka dou ka, wakarimasen.', hu: 'Nem tudom, odaérek-e időben.',
        cloze: '<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>う___BLANK___、わかりません。', clozeAnswer: 'かどうか',
        tokens: ['まにあうかどうか', '、', 'わかりません', '。'] },
      { jp: 'おいしいかどうか、<ruby>食<rt>た</rt></ruby>べてみます。',
        kana: 'おいしいかどうか、たべてみます。', romaji: 'oishii ka dou ka, tabete mimasu.', hu: 'Megkóstolom, hogy finom-e.',
        cloze: 'おいしい___BLANK___、<ruby>食<rt>た</rt></ruby>べてみます。', clozeAnswer: 'かどうか',
        tokens: ['おいしいかどうか', '、', 'たべてみます', '。'] }
    ],
    contrasts: ['embedded_ka']
  },
  {
    id: 'no_question', label: '〜の？', jlpt: 'N4', category: 'spoken', lesson: 'l25',
    summary: 'Baráti kérdés vagy magyarázat a mondat végén.',
    structure: 'rövid alak + の？ (な-melléknév / főnév + なの？)',
    explanation: 'A 〜んですか baráti párja: érdeklődő, meleg hangú kérdés. Kijelentésként lágy magyarázat.',
    examples: [
      { jp: 'どこへ<ruby>行<rt>い</rt></ruby>くの？',
        kana: 'どこへいくの？', romaji: 'doko e iku no?', hu: 'Hová mész?',
        cloze: 'どこへ<ruby>行<rt>い</rt></ruby>く___BLANK___？', clozeAnswer: 'の',
        tokens: ['どこへ', 'いくの', '？'] },
      { jp: 'どうして<ruby>食<rt>た</rt></ruby>べないの？',
        kana: 'どうしてたべないの？', romaji: 'doushite tabenai no?', hu: 'Miért nem eszel?',
        cloze: 'どうして<ruby>食<rt>た</rt></ruby>べない___BLANK___？', clozeAnswer: 'の',
        tokens: ['どうして', 'たべないの', '？'] }
    ],
    contrasts: ['n_desu', 'kana']
  },
  {
    id: 'kana', label: '〜かな', jlpt: 'N4', category: 'spoken', lesson: 'l25',
    summary: 'Tűnődés: „vajon…?"',
    structure: 'rövid alak + かな',
    explanation: 'Magadnak teszed fel a kérdést, vagy óvatosan kérdezel. Baráti hangnem.',
    examples: [
      { jp: '<ruby>明日<rt>あした</rt></ruby><ruby>晴<rt>は</rt></ruby>れるかな。',
        kana: 'あしたはれるかな。', romaji: 'ashita hareru kana.', hu: 'Vajon holnap szép idő lesz?',
        cloze: '<ruby>明日<rt>あした</rt></ruby><ruby>晴<rt>は</rt></ruby>れる___BLANK___。', clozeAnswer: 'かな',
        tokens: ['あした', 'はれるかな', '。'] },
      { jp: 'これでいいかな。',
        kana: 'これでいいかな。', romaji: 'kore de ii kana.', hu: 'Vajon így jó lesz?',
        cloze: 'これでいい___BLANK___。', clozeAnswer: 'かな',
        tokens: ['これで', 'いいかな', '。'] }
    ],
    contrasts: ['no_question', 'deshou']
  },

  /* ── l26 ── */
  {
    id: 'tara_after', label: '〜たら (utána)', jlpt: 'N4', category: 'sequence', lesson: 'l26',
    summary: 'Biztos jövőbeli sorrend: „amikor majd…, akkor…".',
    structure: 'ige た-alakja + ら、 …',
    explanation: 'Ha az első esemény biztosan bekövetkezik, a 〜たら nem feltétel, hanem sorrend: „amint megtörtént".',
    examples: [
      { jp: '<ruby>駅<rt>えき</rt></ruby>に<ruby>着<rt>つ</rt></ruby>いたら、<ruby>電話<rt>でんわ</rt></ruby>します。',
        kana: 'えきについたら、でんわします。', romaji: 'eki ni tsuitara, denwa shimasu.', hu: 'Amikor megérkezem az állomásra, telefonálok.',
        cloze: '<ruby>駅<rt>えき</rt></ruby>に<ruby>着<rt>つ</rt></ruby>い___BLANK___、<ruby>電話<rt>でんわ</rt></ruby>します。', clozeAnswer: 'たら',
        tokens: ['えきに', 'ついたら', '、', 'でんわします', '。'] },
      { jp: '<ruby>二十歳<rt>はたち</rt></ruby>になったら、お<ruby>酒<rt>さけ</rt></ruby>が<ruby>飲<rt>の</rt></ruby>めます。',
        kana: 'はたちになったら、おさけがのめます。', romaji: 'hatachi ni nattara, osake ga nomemasu.', hu: 'Amikor betöltöm a húszat, ihatok alkoholt.',
        cloze: '<ruby>二十歳<rt>はたち</rt></ruby>になっ___BLANK___、お<ruby>酒<rt>さけ</rt></ruby>が<ruby>飲<rt>の</rt></ruby>めます。', clozeAnswer: 'たら',
        tokens: ['はたちに', 'なったら', '、', 'おさけが', 'のめます', '。'] }
    ],
    contrasts: ['tara', 'te_kara', 'ru_toki_ta_toki']
  },
  {
    id: 'volitional', label: 'Szándékos alak (〜よう)', jlpt: 'N4', category: 'invitation', lesson: 'l26',
    summary: 'Baráti felhívás vagy elhatározás: „csináljuk! na, megcsinálom".',
    structure: 'I. csoport: u → おう · II. csoport: る → よう · する → しよう, 来る → こよう',
    explanation: 'A 〜ましょう rövid, baráti alakja. Magadban mondva elhatározás.',
    examples: [
      { jp: 'いっしょに<ruby>帰<rt>かえ</rt></ruby>ろう。',
        kana: 'いっしょにかえろう。', romaji: 'issho ni kaerou.', hu: 'Menjünk haza együtt!',
        cloze: 'いっしょに<ruby>帰<rt>かえ</rt></ruby>___BLANK___。', clozeAnswer: 'ろう',
        tokens: ['いっしょに', 'かえろう', '。'] },
      { jp: 'そろそろ<ruby>寝<rt>ね</rt></ruby>よう。',
        kana: 'そろそろねよう。', romaji: 'sorosoro neyou.', hu: 'Lassan feküdjünk le!',
        cloze: 'そろそろ<ruby>寝<rt>ね</rt></ruby>___BLANK___。', clozeAnswer: 'よう',
        tokens: ['そろそろ', 'ねよう', '。'] }
    ],
    contrasts: ['mashou', 'you_to_omou']
  },
  {
    id: 'you_to_omou', label: '〜ようと思います', jlpt: 'N4', category: 'intention', lesson: 'l26',
    summary: 'Friss szándék: „azt tervezem, hogy…".',
    structure: 'szándékos alak + と思います / と思っています',
    explanation: 'A beszélő szándékát közli. Régebb óta érlelt tervnél: 〜ようと思っています.',
    examples: [
      { jp: '<ruby>来年<rt>らいねん</rt></ruby><ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>こうと<ruby>思<rt>おも</rt></ruby>います。',
        kana: 'らいねんにほんへいこうとおもいます。', romaji: 'rainen nihon e ikou to omoimasu.', hu: 'Azt tervezem, hogy jövőre Japánba megyek.',
        cloze: '<ruby>来年<rt>らいねん</rt></ruby><ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>こ___BLANK___。', clozeAnswer: 'うとおもいます',
        tokens: ['らいねん', 'にほんへ', 'いこうとおもいます', '。'] },
      { jp: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>仕事<rt>しごと</rt></ruby>を<ruby>探<rt>さが</rt></ruby>そうと<ruby>思<rt>おも</rt></ruby>っています。',
        kana: 'あたらしいしごとをさがそうとおもっています。', romaji: 'atarashii shigoto o sagasou to omotte imasu.', hu: 'Azt tervezem, hogy új munkát keresek.',
        cloze: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>仕事<rt>しごと</rt></ruby>を<ruby>探<rt>さが</rt></ruby>そ___BLANK___います。', clozeAnswer: 'うとおもって',
        tokens: ['あたらしい', 'しごとを', 'さがそうとおもっています', '。'] }
    ],
    contrasts: ['tsumori', 'tai_to_omou', 'koto_ni_suru']
  },
  {
    id: 'made_ni', label: '〜までに', jlpt: 'N4', category: 'sequence', lesson: 'l26',
    summary: 'Határidő: „legkésőbb …-ig".',
    structure: 'időpont + までに + egyszeri cselekvés',
    explanation: 'A まで folyamatos időtartam vége (addig tart), a までに határidő (addig megtörténik).',
    examples: [
      { jp: '<ruby>金曜日<rt>きんようび</rt></ruby>までにレポートを<ruby>出<rt>だ</rt></ruby>してください。',
        kana: 'きんようびまでにレポートをだしてください。', romaji: 'kinyoubi made ni repooto o dashite kudasai.', hu: 'Péntekig adja le a beszámolót!',
        cloze: '<ruby>金曜日<rt>きんようび</rt></ruby>___BLANK___レポートを<ruby>出<rt>だ</rt></ruby>してください。', clozeAnswer: 'までに',
        tokens: ['きんようびまでに', 'レポートを', 'だしてください', '。'] },
      { jp: '<ruby>五時<rt>ごじ</rt></ruby>までに<ruby>帰<rt>かえ</rt></ruby>ります。',
        kana: 'ごじまでにかえります。', romaji: 'goji made ni kaerimasu.', hu: 'Legkésőbb ötre hazaérek.',
        cloze: '<ruby>五時<rt>ごじ</rt></ruby>___BLANK___<ruby>帰<rt>かえ</rt></ruby>ります。', clozeAnswer: 'までに',
        tokens: ['ごじまでに', 'かえります', '。'] }
    ],
    contrasts: ['kara_made']
  },
  {
    id: 'rashii_typical', label: 'főnév + らしい', jlpt: 'N4', category: 'description', lesson: 'l26',
    summary: 'Jellegzetes: „igazi, hozzá illő".',
    structure: 'főnév + らしい (+ főnév)',
    explanation: 'Azt mondja, hogy valami pontosan olyan, amilyennek a fajtájától várjuk: 春らしい天気, 子どもらしい.',
    examples: [
      { jp: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>春<rt>はる</rt></ruby>らしい<ruby>天気<rt>てんき</rt></ruby>です。',
        kana: 'きょうははるらしいてんきです。', romaji: 'kyou wa haru rashii tenki desu.', hu: 'Ma igazi tavaszi idő van.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>春<rt>はる</rt></ruby>___BLANK___<ruby>天気<rt>てんき</rt></ruby>です。', clozeAnswer: 'らしい',
        tokens: ['きょうは', 'はるらしい', 'てんきです', '。'] },
      { jp: 'それはあなたらしくないです。',
        kana: 'それはあなたらしくないです。', romaji: 'sore wa anata rashikunai desu.', hu: 'Ez nem vall rád.',
        cloze: 'それはあなた___BLANK___ないです。', clozeAnswer: 'らしく',
        tokens: ['それは', 'あなたらしくないです', '。'] }
    ],
    contrasts: ['you_desu']
  },

  /* ── l27 ── */
  {
    id: 'potential', label: 'Ható alak', jlpt: 'N4', category: 'experience', lesson: 'l27',
    summary: 'Képesség, lehetőség magán az igén: „tudok, lehet".',
    structure: 'I. csoport: u → eます · II. csoport: る → られます · する → できます, 来る → こられます',
    explanation: 'A ható alakú ige tárgya többnyire が-t kap. Rövidebb, mint a 〜ことができます.',
    examples: [
      { jp: '<ruby>漢字<rt>かんじ</rt></ruby>が<ruby>読<rt>よ</rt></ruby>めます。',
        kana: 'かんじがよめます。', romaji: 'kanji ga yomemasu.', hu: 'Tudok kanjit olvasni.',
        cloze: '<ruby>漢字<rt>かんじ</rt></ruby>が<ruby>読<rt>よ</rt></ruby>___BLANK___。', clozeAnswer: 'めます',
        tokens: ['かんじが', 'よめます', '。'] },
      { jp: 'この<ruby>水<rt>みず</rt></ruby>は<ruby>飲<rt>の</rt></ruby>めません。',
        kana: 'このみずはのめません。', romaji: 'kono mizu wa nomemasen.', hu: 'Ez a víz nem iható.',
        cloze: 'この<ruby>水<rt>みず</rt></ruby>は<ruby>飲<rt>の</rt></ruby>___BLANK___。', clozeAnswer: 'めません',
        tokens: ['この', 'みずは', 'のめません', '。'] }
    ],
    contrasts: ['koto_ga_dekiru', 'ga_jouzu']
  },
  {
    id: 'tara_ii_desu_ka', label: '〜たらいいですか', jlpt: 'N4', category: 'advice', lesson: 'l27',
    summary: 'Tanácskérés: „mit tegyek, hogyan csináljam?"',
    structure: 'kérdőszó + ige た-alakja + らいいですか',
    explanation: 'Útmutatást kérsz. A válasz gyakran: 〜たらいいですよ / 〜といいですよ.',
    examples: [
      { jp: 'どこで<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>ったらいいですか。',
        kana: 'どこできっぷをかったらいいですか。', romaji: 'doko de kippu o kattara ii desu ka.', hu: 'Hol vegyek jegyet?',
        cloze: 'どこで<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>っ___BLANK___。', clozeAnswer: 'たらいいですか',
        tokens: ['どこで', 'きっぷを', 'かったらいいですか', '。'] },
      { jp: 'だれに<ruby>聞<rt>き</rt></ruby>いたらいいですか。',
        kana: 'だれにきいたらいいですか。', romaji: 'dare ni kiitara ii desu ka.', hu: 'Kitől kérdezzem meg?',
        cloze: 'だれに<ruby>聞<rt>き</rt></ruby>い___BLANK___。', clozeAnswer: 'たらいいですか',
        tokens: ['だれに', 'きいたらいいですか', '。'] }
    ],
    contrasts: ['ta_hou_ga_ii', 'tara']
  },
  {
    id: 'ni_kimatte_iru', label: '〜にきまっています', jlpt: 'N4', category: 'guess', lesson: 'l27',
    summary: 'Teljes meggyőződés: „egészen biztos, hogy…".',
    structure: 'rövid alak / főnév + にきまっています',
    explanation: 'A beszélő szerint nem is kérdés. Erős, olykor kissé nyers állítás.',
    examples: [
      { jp: 'あのチームが<ruby>勝<rt>か</rt></ruby>つにきまっています。',
        kana: 'あのチームがかつにきまっています。', romaji: 'ano chiimu ga katsu ni kimatte imasu.', hu: 'Egészen biztos, hogy az a csapat nyer.',
        cloze: 'あのチームが<ruby>勝<rt>か</rt></ruby>つ___BLANK___。', clozeAnswer: 'にきまっています',
        tokens: ['あの', 'チームが', 'かつにきまっています', '。'] },
      { jp: 'そんな<ruby>話<rt>はなし</rt></ruby>はうそにきまっています。',
        kana: 'そんなはなしはうそにきまっています。', romaji: 'sonna hanashi wa uso ni kimatte imasu.', hu: 'Az ilyen történet biztosan hazugság.',
        cloze: 'そんな<ruby>話<rt>はなし</rt></ruby>はうそ___BLANK___。', clozeAnswer: 'にきまっています',
        tokens: ['そんな', 'はなしは', 'うそにきまっています', '。'] }
    ],
    contrasts: ['ni_chigai_nai', 'hazu_desu']
  },
  {
    id: 'toka', label: '〜とか', jlpt: 'N4', category: 'spoken', lesson: 'l27',
    summary: 'Laza példálózás: „például, meg ilyesmi".',
    structure: 'A とか B とか',
    explanation: 'A や beszélt párja: néhány példát említesz a sok közül. Igékkel is állhat.',
    examples: [
      { jp: 'すしとかてんぷらとかが<ruby>好<rt>す</rt></ruby>きです。',
        kana: 'すしとかてんぷらとかがすきです。', romaji: 'sushi toka tenpura toka ga suki desu.', hu: 'A szusit, a tempurát meg az ilyesmit szeretem.',
        cloze: 'すし___BLANK___てんぷらとかが<ruby>好<rt>す</rt></ruby>きです。', clozeAnswer: 'とか',
        tokens: ['すしとか', 'てんぷらとかが', 'すきです', '。'] },
      { jp: '<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>映画<rt>えいが</rt></ruby>とかを<ruby>見<rt>み</rt></ruby>ます。',
        kana: 'やすみのひはえいがとかをみます。', romaji: 'yasumi no hi wa eiga toka o mimasu.', hu: 'Szabadnapon például filmet nézek.',
        cloze: '<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>映画<rt>えいが</rt></ruby>___BLANK___を<ruby>見<rt>み</rt></ruby>ます。', clozeAnswer: 'とか',
        tokens: ['やすみのひは', 'えいがとかを', 'みます', '。'] }
    ],
    contrasts: ['to_ya', 'tari_tari']
  },
  {
    id: 'sa_noun', label: '〜さ', jlpt: 'N4', category: 'nominal', lesson: 'l27',
    summary: 'Melléknévből mérhető főnév: „magasság, súly".',
    structure: 'い-melléknév: い → さ · な-melléknév + さ',
    explanation: 'A さ a tulajdonság mértékét nevezi meg: 高い → 高さ, 便利 → 便利さ. いい → よさ.',
    examples: [
      { jp: 'この<ruby>山<rt>やま</rt></ruby>の<ruby>高<rt>たか</rt></ruby>さはどのくらいですか。',
        kana: 'このやまのたかさはどのくらいですか。', romaji: 'kono yama no takasa wa dono kurai desu ka.', hu: 'Milyen magas ez a hegy?',
        cloze: 'この<ruby>山<rt>やま</rt></ruby>の<ruby>高<rt>たか</rt></ruby>___BLANK___はどのくらいですか。', clozeAnswer: 'さ',
        tokens: ['この', 'やまの', 'たかさは', 'どのくらいですか', '。'] },
      { jp: '<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>重<rt>おも</rt></ruby>さを<ruby>量<rt>はか</rt></ruby>ります。',
        kana: 'にもつのおもさをはかります。', romaji: 'nimotsu no omosa o hakarimasu.', hu: 'Megmérem a csomag súlyát.',
        cloze: '<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>重<rt>おも</rt></ruby>___BLANK___を<ruby>量<rt>はか</rt></ruby>ります。', clozeAnswer: 'さ',
        tokens: ['にもつの', 'おもさを', 'はかります', '。'] }
    ],
    contrasts: ['ku_ni_adverb']
  },

  /* ── l28 ── */
  {
    id: 'de_gozaimasu', label: '〜でございます', jlpt: 'N4', category: 'honorific', lesson: 'l28',
    summary: 'A です nagyon udvarias változata (kiszolgálásban).',
    structure: 'főnév + でございます',
    explanation: 'Boltban, szállodában, telefonban az alkalmazott így beszél. Az あります megfelelője: ございます.',
    examples: [
      { jp: 'こちらがメニューでございます。',
        kana: 'こちらがメニューでございます。', romaji: 'kochira ga menyuu de gozaimasu.', hu: 'Tessék, ez az étlap.',
        cloze: 'こちらがメニュー___BLANK___。', clozeAnswer: 'でございます',
        tokens: ['こちらが', 'メニューでございます', '。'] },
      { jp: 'お<ruby>手洗<rt>てあら</rt></ruby>いは<ruby>二階<rt>にかい</rt></ruby>でございます。',
        kana: 'おてあらいはにかいでございます。', romaji: 'otearai wa nikai de gozaimasu.', hu: 'A mosdó a második szinten található.',
        cloze: 'お<ruby>手洗<rt>てあら</rt></ruby>いは<ruby>二階<rt>にかい</rt></ruby>___BLANK___。', clozeAnswer: 'でございます',
        tokens: ['おてあらいは', 'にかいでございます', '。'] }
    ],
    contrasts: ['wa_desu', 'o_kudasai']
  },
  {
    id: 'shi_shi', label: '〜し、〜し', jlpt: 'N4', category: 'reason', lesson: 'l28',
    summary: 'Több indok felsorolása: „ez is, az is (ezért…)".',
    structure: 'rövid alak + し、 rövid alak + し、 következtetés',
    explanation: 'Több okot vagy tulajdonságot sorolsz, és sejteted, hogy van még. A végén a következtetés áll.',
    examples: [
      { jp: 'この<ruby>店<rt>みせ</rt></ruby>は<ruby>安<rt>やす</rt></ruby>いし、おいしいし、よく<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'このみせはやすいし、おいしいし、よくいきます。', romaji: 'kono mise wa yasui shi, oishii shi, yoku ikimasu.', hu: 'Ez a hely olcsó is, finom is, ezért gyakran járok ide.',
        cloze: 'この<ruby>店<rt>みせ</rt></ruby>は<ruby>安<rt>やす</rt></ruby>い___BLANK___、おいしいし、よく<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'し',
        tokens: ['この', 'みせは', 'やすいし', '、', 'おいしいし', '、', 'よく', 'いきます', '。'] },
      { jp: '<ruby>雨<rt>あめ</rt></ruby>も<ruby>降<rt>ふ</rt></ruby>っているし、<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけません。',
        kana: 'あめもふっているし、きょうはでかけません。', romaji: 'ame mo futte iru shi, kyou wa dekakemasen.', hu: 'Esik is, úgyhogy ma nem megyek el.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>も<ruby>降<rt>ふ</rt></ruby>っている___BLANK___、<ruby>今日<rt>きょう</rt></ruby>は<ruby>出<rt>で</rt></ruby>かけません。', clozeAnswer: 'し',
        tokens: ['あめも', 'ふっているし', '、', 'きょうは', 'でかけません', '。'] }
    ],
    contrasts: ['kara_reason', 'kute_de']
  },
  {
    id: 'ni_chigai_nai', label: '〜にちがいありません', jlpt: 'N4', category: 'guess', lesson: 'l28',
    summary: 'Következtetés jelekből: „kétségtelenül".',
    structure: 'rövid alak / főnév + にちがいありません',
    explanation: 'Bizonyítékok alapján vonsz le biztos következtetést. Írott, tárgyilagos stílus.',
    examples: [
      { jp: '<ruby>彼<rt>かれ</rt></ruby>はもう<ruby>帰<rt>かえ</rt></ruby>ったにちがいありません。',
        kana: 'かれはもうかえったにちがいありません。', romaji: 'kare wa mou kaetta ni chigai arimasen.', hu: 'Ő kétségtelenül hazament már.',
        cloze: '<ruby>彼<rt>かれ</rt></ruby>はもう<ruby>帰<rt>かえ</rt></ruby>った___BLANK___。', clozeAnswer: 'にちがいありません',
        tokens: ['かれは', 'もう', 'かえった', 'にちがいありません', '。'] },
      { jp: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>日本人<rt>にほんじん</rt></ruby>にちがいありません。',
        kana: 'あのひとはにほんじんにちがいありません。', romaji: 'ano hito wa nihonjin ni chigai arimasen.', hu: 'Az az ember kétségtelenül japán.',
        cloze: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>日本人<rt>にほんじん</rt></ruby>___BLANK___。', clozeAnswer: 'にちがいありません',
        tokens: ['あの', 'ひとは', 'にほんじん', 'にちがいありません', '。'] }
    ],
    contrasts: ['ni_kimatte_iru', 'hazu_desu', 'kamoshirenai']
  },

  /* ── l29 ── */
  {
    id: 'ru_tokoro', label: '〜るところです', jlpt: 'N4', category: 'state', lesson: 'l29',
    summary: 'Közvetlenül előtte: „éppen készülök megtenni".',
    structure: 'ige szótári alakja + ところです',
    explanation: 'A cselekvés még nem kezdődött el, de mindjárt elkezdődik.',
    examples: [
      { jp: 'これから<ruby>出<rt>で</rt></ruby>かけるところです。',
        kana: 'これからでかけるところです。', romaji: 'kore kara dekakeru tokoro desu.', hu: 'Éppen indulni készülök.',
        cloze: 'これから<ruby>出<rt>で</rt></ruby>かける___BLANK___。', clozeAnswer: 'ところです',
        tokens: ['これから', 'でかけるところです', '。'] },
      { jp: '<ruby>今<rt>いま</rt></ruby>からごはんを<ruby>食<rt>た</rt></ruby>べるところです。',
        kana: 'いまからごはんをたべるところです。', romaji: 'ima kara gohan o taberu tokoro desu.', hu: 'Épp most készülök enni.',
        cloze: '<ruby>今<rt>いま</rt></ruby>からごはんを<ruby>食<rt>た</rt></ruby>べる___BLANK___です。', clozeAnswer: 'ところ',
        tokens: ['いまから', 'ごはんを', 'たべるところです', '。'] }
    ],
    contrasts: ['te_iru_tokoro', 'ta_tokoro']
  },
  {
    id: 'te_iru_tokoro', label: '〜ているところです', jlpt: 'N4', category: 'state', lesson: 'l29',
    summary: 'Éppen közben: „pont most csinálom".',
    structure: 'ige て-alakja + いるところです',
    explanation: 'A cselekvés épp folyamatban van. Hangsúlyosabb, mint a sima 〜ています.',
    examples: [
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>資料<rt>しりょう</rt></ruby>を<ruby>作<rt>つく</rt></ruby>っているところです。',
        kana: 'いましりょうをつくっているところです。', romaji: 'ima shiryou o tsukutte iru tokoro desu.', hu: 'Éppen az anyagot készítem.',
        cloze: '<ruby>今<rt>いま</rt></ruby><ruby>資料<rt>しりょう</rt></ruby>を<ruby>作<rt>つく</rt></ruby>っ___BLANK___。', clozeAnswer: 'ているところです',
        tokens: ['いま', 'しりょうを', 'つくっているところです', '。'] },
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>調<rt>しら</rt></ruby>べているところです。',
        kana: 'いましらべているところです。', romaji: 'ima shirabete iru tokoro desu.', hu: 'Éppen most nézek utána.',
        cloze: '<ruby>今<rt>いま</rt></ruby><ruby>調<rt>しら</rt></ruby>べ___BLANK___です。', clozeAnswer: 'ているところ',
        tokens: ['いま', 'しらべているところです', '。'] }
    ],
    contrasts: ['ru_tokoro', 'ta_tokoro', 'te_iru_progress']
  },
  {
    id: 'ta_tokoro', label: '〜たところです', jlpt: 'N4', category: 'state', lesson: 'l29',
    summary: 'Közvetlenül utána: „éppen most fejeztem be".',
    structure: 'ige た-alakja + ところです',
    explanation: 'A cselekvés az imént ért véget. Gyakran áll vele a 今 vagy a たった今.',
    examples: [
      { jp: '<ruby>今<rt>いま</rt></ruby><ruby>起<rt>お</rt></ruby>きたところです。',
        kana: 'いまおきたところです。', romaji: 'ima okita tokoro desu.', hu: 'Most keltem fel.',
        cloze: '<ruby>今<rt>いま</rt></ruby><ruby>起<rt>お</rt></ruby>き___BLANK___。', clozeAnswer: 'たところです',
        tokens: ['いま', 'おきたところです', '。'] },
      { jp: 'ちょうど<ruby>駅<rt>えき</rt></ruby>に<ruby>着<rt>つ</rt></ruby>いたところです。',
        kana: 'ちょうどえきについたところです。', romaji: 'choudo eki ni tsuita tokoro desu.', hu: 'Épp most értem az állomásra.',
        cloze: 'ちょうど<ruby>駅<rt>えき</rt></ruby>に<ruby>着<rt>つ</rt></ruby>い___BLANK___です。', clozeAnswer: 'たところ',
        tokens: ['ちょうど', 'えきに', 'ついたところです', '。'] }
    ],
    contrasts: ['ru_tokoro', 'te_iru_tokoro']
  },
  {
    id: 'you_ni_iu', label: '〜ように言います', jlpt: 'N4', category: 'quotation', lesson: 'l29',
    summary: 'Kérés vagy utasítás továbbadása: „megmondja, hogy tegye".',
    structure: 'ige szótári / ない-alakja + ように + 言います / 伝えます',
    explanation: 'Valakinek a kérését, utasítását közvetíted. Tiltás: 〜ないように言います.',
    examples: [
      { jp: '<ruby>医者<rt>いしゃ</rt></ruby>は<ruby>毎日<rt>まいにち</rt></ruby><ruby>歩<rt>ある</rt></ruby>くように<ruby>言<rt>い</rt></ruby>いました。',
        kana: 'いしゃはまいにちあるくようにいいました。', romaji: 'isha wa mainichi aruku you ni iimashita.', hu: 'Az orvos azt mondta, hogy sétáljak minden nap.',
        cloze: '<ruby>医者<rt>いしゃ</rt></ruby>は<ruby>毎日<rt>まいにち</rt></ruby><ruby>歩<rt>ある</rt></ruby>く___BLANK___<ruby>言<rt>い</rt></ruby>いました。', clozeAnswer: 'ように',
        tokens: ['いしゃは', 'まいにち', 'あるくように', 'いいました', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんに<ruby>三時<rt>さんじ</rt></ruby>に<ruby>来<rt>く</rt></ruby>るように<ruby>伝<rt>つた</rt></ruby>えてください。',
        kana: 'たなかさんにさんじにくるようにつたえてください。', romaji: 'tanaka-san ni sanji ni kuru you ni tsutaete kudasai.', hu: 'Kérem, mondja meg Tanakának, hogy háromra jöjjön!',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんに<ruby>三時<rt>さんじ</rt></ruby>に<ruby>来<rt>く</rt></ruby>る___BLANK___<ruby>伝<rt>つた</rt></ruby>えてください。', clozeAnswer: 'ように',
        tokens: ['たなかさんに', 'さんじに', 'くるように', 'つたえてください', '。'] }
    ],
    contrasts: ['to_iimashita']
  },
  {
    id: 'to_iu_koto_desu', label: '〜ということです', jlpt: 'N4', category: 'hearsay', lesson: 'l29',
    summary: 'Üzenet, értesülés továbbadása: „úgy tudom, azt üzeni".',
    structure: 'rövid alak + ということです',
    explanation: 'Hivatalosabb a 〜そうです-nél: hírek, üzenetek, jelentések nyelve.',
    examples: [
      { jp: '<ruby>会議<rt>かいぎ</rt></ruby>は<ruby>三時<rt>さんじ</rt></ruby>からということです。',
        kana: 'かいぎはさんじからということです。', romaji: 'kaigi wa sanji kara to iu koto desu.', hu: 'Úgy tudom, az értekezlet háromkor kezdődik.',
        cloze: '<ruby>会議<rt>かいぎ</rt></ruby>は<ruby>三時<rt>さんじ</rt></ruby>から___BLANK___。', clozeAnswer: 'ということです',
        tokens: ['かいぎは', 'さんじからということです', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れるということです。',
        kana: 'たなかさんはすこしおくれるということです。', romaji: 'tanaka-san wa sukoshi okureru to iu koto desu.', hu: 'Tanaka azt üzeni, hogy késik egy kicsit.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れる___BLANK___。', clozeAnswer: 'ということです',
        tokens: ['たなかさんは', 'すこし', 'おくれるということです', '。'] }
    ],
    contrasts: ['sou_da_hearsay', 'to_iimashita']
  },
  {
    id: 'ni_tsuite', label: '〜について', jlpt: 'N4', category: 'particle', lesson: 'l29',
    summary: 'Téma megjelölése: „-ról, -ről".',
    structure: 'főnév + について',
    explanation: 'Azt nevezi meg, miről beszélsz, írsz, gondolkodsz. Főnév előtt: 〜についての.',
    examples: [
      { jp: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>文化<rt>ぶんか</rt></ruby>について<ruby>話<rt>はな</rt></ruby>します。',
        kana: 'にほんのぶんかについてはなします。', romaji: 'nihon no bunka ni tsuite hanashimasu.', hu: 'A japán kultúráról fogok beszélni.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>文化<rt>ぶんか</rt></ruby>___BLANK___<ruby>話<rt>はな</rt></ruby>します。', clozeAnswer: 'について',
        tokens: ['にほんのぶんかについて', 'はなします', '。'] },
      { jp: 'この<ruby>問題<rt>もんだい</rt></ruby>についてどう<ruby>思<rt>おも</rt></ruby>いますか。',
        kana: 'このもんだいについてどうおもいますか。', romaji: 'kono mondai ni tsuite dou omoimasu ka.', hu: 'Mit gondolsz erről a kérdésről?',
        cloze: 'この<ruby>問題<rt>もんだい</rt></ruby>___BLANK___どう<ruby>思<rt>おも</rt></ruby>いますか。', clozeAnswer: 'について',
        tokens: ['この', 'もんだいについて', 'どう', 'おもいますか', '。'] }
    ],
    contrasts: ['ni_yotte']
  },

  /* ── l30 ── */
  {
    id: 'te_mo_kamaimasen', label: '〜てもかまいません', jlpt: 'N4', category: 'permission', lesson: 'l30',
    summary: 'Engedély: „nem baj, ha…".',
    structure: 'ige て-alakja + もかまいません',
    explanation: 'Udvariasabb, visszafogottabb a 〜てもいいです-nél: „nem bánom, ha".',
    examples: [
      { jp: 'ここに<ruby>座<rt>すわ</rt></ruby>ってもかまいません。',
        kana: 'ここにすわってもかまいません。', romaji: 'koko ni suwatte mo kamaimasen.', hu: 'Nyugodtan leülhet ide.',
        cloze: 'ここに<ruby>座<rt>すわ</rt></ruby>っ___BLANK___。', clozeAnswer: 'てもかまいません',
        tokens: ['ここに', 'すわってもかまいません', '。'] },
      { jp: '<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れてもかまいません。',
        kana: 'すこしおくれてもかまいません。', romaji: 'sukoshi okurete mo kamaimasen.', hu: 'Nem baj, ha késik egy kicsit.',
        cloze: '<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れ___BLANK___。', clozeAnswer: 'てもかまいません',
        tokens: ['すこし', 'おくれてもかまいません', '。'] }
    ],
    contrasts: ['te_mo_ii', 'nakute_mo_kamaimasen']
  },
  {
    id: 'nakute_mo_kamaimasen', label: '〜なくてもかまいません', jlpt: 'N4', category: 'permission', lesson: 'l30',
    summary: 'Felmentés: „nem baj, ha nem…".',
    structure: 'ige ない-alakja: ない → なくてもかまいません',
    explanation: 'Azt jelzi, hogy valamit nem szükséges megtenni.',
    examples: [
      { jp: '<ruby>名前<rt>なまえ</rt></ruby>は<ruby>書<rt>か</rt></ruby>かなくてもかまいません。',
        kana: 'なまえはかかなくてもかまいません。', romaji: 'namae wa kakanakute mo kamaimasen.', hu: 'Nem baj, ha nem írja oda a nevét.',
        cloze: '<ruby>名前<rt>なまえ</rt></ruby>は<ruby>書<rt>か</rt></ruby>か___BLANK___。', clozeAnswer: 'なくてもかまいません',
        tokens: ['なまえは', 'かかなくてもかまいません', '。'] },
      { jp: '<ruby>今日<rt>きょう</rt></ruby><ruby>来<rt>こ</rt></ruby>なくてもかまいません。',
        kana: 'きょうこなくてもかまいません。', romaji: 'kyou konakute mo kamaimasen.', hu: 'Nem baj, ha ma nem jön el.',
        cloze: '<ruby>今日<rt>きょう</rt></ruby><ruby>来<rt>こ</rt></ruby>___BLANK___。', clozeAnswer: 'なくてもかまいません',
        tokens: ['きょう', 'こなくてもかまいません', '。'] }
    ],
    contrasts: ['nakute_mo_ii', 'te_mo_kamaimasen']
  },
  {
    id: 'ni_yotte', label: '〜によって', jlpt: 'N4', category: 'comparison', lesson: 'l30',
    summary: 'Különbség: „…-tól függően, …-nként más".',
    structure: 'főnév + によって + ちがいます / いろいろです',
    explanation: 'Azt mondja, hogy valami aszerint változik, kiről vagy miről van szó.',
    examples: [
      { jp: '<ruby>習慣<rt>しゅうかん</rt></ruby>は<ruby>国<rt>くに</rt></ruby>によって<ruby>違<rt>ちが</rt></ruby>います。',
        kana: 'しゅうかんはくにによってちがいます。', romaji: 'shuukan wa kuni ni yotte chigaimasu.', hu: 'A szokások országonként mások.',
        cloze: '<ruby>習慣<rt>しゅうかん</rt></ruby>は<ruby>国<rt>くに</rt></ruby>___BLANK___<ruby>違<rt>ちが</rt></ruby>います。', clozeAnswer: 'によって',
        tokens: ['しゅうかんは', 'くにによって', 'ちがいます', '。'] },
      { jp: '<ruby>人<rt>ひと</rt></ruby>によって<ruby>考<rt>かんが</rt></ruby>え<ruby>方<rt>かた</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>います。',
        kana: 'ひとによってかんがえかたがちがいます。', romaji: 'hito ni yotte kangaekata ga chigaimasu.', hu: 'Embere válogatja, ki hogyan gondolkodik.',
        cloze: '<ruby>人<rt>ひと</rt></ruby>___BLANK___<ruby>考<rt>かんが</rt></ruby>え<ruby>方<rt>かた</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>います。', clozeAnswer: 'によって',
        tokens: ['ひとによって', 'かんがえかたが', 'ちがいます', '。'] }
    ],
    contrasts: ['ni_tsuite', 'ni_kurabete']
  },
  {
    id: 'te_moraemasenka', label: '〜てもらえませんか', jlpt: 'N4', category: 'request', lesson: 'l30',
    summary: 'Udvarias felkérés: „megtenné nekem?"',
    structure: 'ige て-alakja + もらえませんか',
    explanation: 'Szívességet kérsz, udvariasan. Még udvariasabb: 〜ていただけませんか.',
    examples: [
      { jp: 'この<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでもらえませんか。',
        kana: 'このかんじをよんでもらえませんか。', romaji: 'kono kanji o yonde moraemasen ka.', hu: 'Felolvasná nekem ezt a kanjit?',
        cloze: 'この<ruby>漢字<rt>かんじ</rt></ruby>を<ruby>読<rt>よ</rt></ruby>ん___BLANK___。', clozeAnswer: 'でもらえませんか',
        tokens: ['この', 'かんじを', 'よんでもらえませんか', '。'] },
      { jp: 'ちょっと<ruby>見<rt>み</rt></ruby>てもらえませんか。',
        kana: 'ちょっとみてもらえませんか。', romaji: 'chotto mite moraemasen ka.', hu: 'Megnézné egy pillanatra?',
        cloze: 'ちょっと<ruby>見<rt>み</rt></ruby>___BLANK___。', clozeAnswer: 'てもらえませんか',
        tokens: ['ちょっと', 'みてもらえませんか', '。'] }
    ],
    contrasts: ['te_kuremasenka', 'te_itadakemasenka']
  },

  /* ── l31 ── */
  {
    id: 'to_conditional', label: '〜と (feltétel)', jlpt: 'N4', category: 'conditional', lesson: 'l31',
    summary: 'Törvényszerű következmény: „ha…, mindig…".',
    structure: 'ige szótári / ない-alakja + と、 magától bekövetkező eredmény',
    explanation: 'Természeti törvény, gép működése, útbaigazítás. Utána nem állhat kérés, szándék, javaslat.',
    examples: [
      { jp: '<ruby>春<rt>はる</rt></ruby>になると、<ruby>暖<rt>あたた</rt></ruby>かくなります。',
        kana: 'はるになると、あたたかくなります。', romaji: 'haru ni naru to, atatakaku narimasu.', hu: 'Ha jön a tavasz, melegebb lesz.',
        cloze: '<ruby>春<rt>はる</rt></ruby>になる___BLANK___、<ruby>暖<rt>あたた</rt></ruby>かくなります。', clozeAnswer: 'と',
        tokens: ['はるに', 'なると', '、', 'あたたかくなります', '。'] },
      { jp: 'まっすぐ<ruby>行<rt>い</rt></ruby>くと、<ruby>右<rt>みぎ</rt></ruby>に<ruby>銀行<rt>ぎんこう</rt></ruby>があります。',
        kana: 'まっすぐいくと、みぎにぎんこうがあります。', romaji: 'massugu iku to, migi ni ginkou ga arimasu.', hu: 'Ha egyenesen megy, jobbra lesz egy bank.',
        cloze: 'まっすぐ<ruby>行<rt>い</rt></ruby>く___BLANK___、<ruby>右<rt>みぎ</rt></ruby>に<ruby>銀行<rt>ぎんこう</rt></ruby>があります。', clozeAnswer: 'と',
        tokens: ['まっすぐ', 'いくと', '、', 'みぎに', 'ぎんこうが', 'あります', '。'] }
    ],
    contrasts: ['tara', 'eba', 'nara']
  },
  {
    id: 'ni_kurabete', label: '〜にくらべて', jlpt: 'N4', category: 'comparison', lesson: 'l31',
    summary: 'Viszonyítás: „…-hoz képest".',
    structure: 'főnév + にくらべて',
    explanation: 'Két dolgot vetsz össze úgy, hogy az egyiket viszonyítási alapnak veszed.',
    examples: [
      { jp: '<ruby>東京<rt>とうきょう</rt></ruby>にくらべて、この<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かです。',
        kana: 'とうきょうにくらべて、このまちはしずかです。', romaji: 'toukyou ni kurabete, kono machi wa shizuka desu.', hu: 'Tokióhoz képest ez a város csendes.',
        cloze: '<ruby>東京<rt>とうきょう</rt></ruby>___BLANK___、この<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かです。', clozeAnswer: 'にくらべて',
        tokens: ['とうきょうにくらべて', '、', 'この', 'まちは', 'しずかです', '。'] },
      { jp: '<ruby>去年<rt>きょねん</rt></ruby>にくらべて、<ruby>今年<rt>ことし</rt></ruby>は<ruby>暑<rt>あつ</rt></ruby>いです。',
        kana: 'きょねんにくらべて、ことしはあついです。', romaji: 'kyonen ni kurabete, kotoshi wa atsui desu.', hu: 'Tavalyhoz képest idén meleg van.',
        cloze: '<ruby>去年<rt>きょねん</rt></ruby>___BLANK___、<ruby>今年<rt>ことし</rt></ruby>は<ruby>暑<rt>あつ</rt></ruby>いです。', clozeAnswer: 'にくらべて',
        tokens: ['きょねんにくらべて', '、', 'ことしは', 'あついです', '。'] }
    ],
    contrasts: ['yori_hou_ga', 'ni_yotte']
  },
  {
    id: 'miemasu_kikoemasu', label: 'みえます・きこえます', jlpt: 'N4', category: 'state', lesson: 'l31',
    summary: 'Magától észlelhető: „látszik, hallatszik".',
    structure: 'főnév が + 見えます / 聞こえます',
    explanation: 'Nem a képességről szól, hanem arról, hogy valami magától a szemed, füled elé kerül. Tárgya が-t kap.',
    examples: [
      { jp: '<ruby>窓<rt>まど</rt></ruby>から<ruby>海<rt>うみ</rt></ruby>が<ruby>見<rt>み</rt></ruby>えます。',
        kana: 'まどからうみがみえます。', romaji: 'mado kara umi ga miemasu.', hu: 'Az ablakból látszik a tenger.',
        cloze: '<ruby>窓<rt>まど</rt></ruby>から<ruby>海<rt>うみ</rt></ruby>が___BLANK___。', clozeAnswer: 'みえます',
        tokens: ['まどから', 'うみが', 'みえます', '。'] },
      { jp: '<ruby>隣<rt>となり</rt></ruby>の<ruby>部屋<rt>へや</rt></ruby>から<ruby>音楽<rt>おんがく</rt></ruby>が<ruby>聞<rt>き</rt></ruby>こえます。',
        kana: 'となりのへやからおんがくがきこえます。', romaji: 'tonari no heya kara ongaku ga kikoemasu.', hu: 'A szomszéd szobából zene hallatszik.',
        cloze: '<ruby>隣<rt>となり</rt></ruby>の<ruby>部屋<rt>へや</rt></ruby>から<ruby>音楽<rt>おんがく</rt></ruby>が___BLANK___。', clozeAnswer: 'きこえます',
        tokens: ['となりのへやから', 'おんがくが', 'きこえます', '。'] }
    ],
    contrasts: ['potential']
  },
  {
    id: 'you_desu', label: '〜ようです', jlpt: 'N4', category: 'guess', lesson: 'l31',
    summary: 'Következtetés megfigyelésből: „úgy tűnik".',
    structure: 'rövid alak + ようです (な-melléknév + な, főnév + の)',
    explanation: 'Saját megfigyeléseid alapján következtetsz. Beszédben: 〜みたいです.',
    examples: [
      { jp: 'だれか<ruby>来<rt>き</rt></ruby>たようです。',
        kana: 'だれかきたようです。', romaji: 'dareka kita you desu.', hu: 'Úgy tűnik, jött valaki.',
        cloze: 'だれか<ruby>来<rt>き</rt></ruby>た___BLANK___。', clozeAnswer: 'ようです',
        tokens: ['だれか', 'きたようです', '。'] },
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>留守<rt>るす</rt></ruby>のようです。',
        kana: 'たなかさんはるすのようです。', romaji: 'tanaka-san wa rusu no you desu.', hu: 'Úgy tűnik, Tanaka nincs otthon.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>留守<rt>るす</rt></ruby>の___BLANK___。', clozeAnswer: 'ようです',
        tokens: ['たなかさんは', 'るすのようです', '。'] }
    ],
    contrasts: ['sou_da_hearsay', 'kamoshirenai', 'rashii_typical']
  },

  /* ── l32 ── */
  {
    id: 'koto_ni_naru', label: '〜ことになります', jlpt: 'N4', category: 'change', lesson: 'l32',
    summary: 'Külső döntés: „úgy alakult, hogy…".',
    structure: 'ige szótári / ない-alakja + ことになりました',
    explanation: 'Nem te döntöttél: a körülmények, a cég, a szabályok. Saját döntés: 〜ことにします.',
    examples: [
      { jp: '<ruby>来月<rt>らいげつ</rt></ruby><ruby>大阪<rt>おおさか</rt></ruby>へ<ruby>転勤<rt>てんきん</rt></ruby>することになりました。',
        kana: 'らいげつおおさかへてんきんすることになりました。', romaji: 'raigetsu oosaka e tenkin suru koto ni narimashita.', hu: 'Úgy alakult, hogy jövő hónapban Oszakába helyeznek.',
        cloze: '<ruby>来月<rt>らいげつ</rt></ruby><ruby>大阪<rt>おおさか</rt></ruby>へ<ruby>転勤<rt>てんきん</rt></ruby>する___BLANK___。', clozeAnswer: 'ことになりました',
        tokens: ['らいげつ', 'おおさかへ', 'てんきんする', 'ことになりました', '。'] },
      { jp: '<ruby>来週<rt>らいしゅう</rt></ruby><ruby>会議<rt>かいぎ</rt></ruby>をすることになりました。',
        kana: 'らいしゅうかいぎをすることになりました。', romaji: 'raishuu kaigi o suru koto ni narimashita.', hu: 'Úgy döntöttek, hogy jövő héten értekezlet lesz.',
        cloze: '<ruby>来週<rt>らいしゅう</rt></ruby><ruby>会議<rt>かいぎ</rt></ruby>をする___BLANK___。', clozeAnswer: 'ことになりました',
        tokens: ['らいしゅう', 'かいぎを', 'することになりました', '。'] }
    ],
    contrasts: ['koto_ni_suru', 'koto_ni_natte_iru']
  },
  {
    id: 'koto_ni_natte_iru', label: '〜ことになっています', jlpt: 'N4', category: 'obligation', lesson: 'l32',
    summary: 'Szabály, szokás: „így van elrendelve".',
    structure: 'ige szótári / ない-alakja + ことになっています',
    explanation: 'Érvényben lévő szabályt, megállapodást, szokást ír le.',
    examples: [
      { jp: 'ここでは<ruby>靴<rt>くつ</rt></ruby>を<ruby>脱<rt>ぬ</rt></ruby>ぐことになっています。',
        kana: 'ここではくつをぬぐことになっています。', romaji: 'koko de wa kutsu o nugu koto ni natte imasu.', hu: 'Itt le kell venni a cipőt, ez a szabály.',
        cloze: 'ここでは<ruby>靴<rt>くつ</rt></ruby>を<ruby>脱<rt>ぬ</rt></ruby>ぐ___BLANK___。', clozeAnswer: 'ことになっています',
        tokens: ['ここでは', 'くつを', 'ぬぐことになっています', '。'] },
      { jp: '<ruby>授業<rt>じゅぎょう</rt></ruby>は<ruby>九時<rt>くじ</rt></ruby>に<ruby>始<rt>はじ</rt></ruby>まることになっています。',
        kana: 'じゅぎょうはくじにはじまることになっています。', romaji: 'jugyou wa kuji ni hajimaru koto ni natte imasu.', hu: 'Az óra a rend szerint kilenckor kezdődik.',
        cloze: '<ruby>授業<rt>じゅぎょう</rt></ruby>は<ruby>九時<rt>くじ</rt></ruby>に<ruby>始<rt>はじ</rt></ruby>まる___BLANK___。', clozeAnswer: 'ことになっています',
        tokens: ['じゅぎょうは', 'くじに', 'はじまる', 'ことになっています', '。'] }
    ],
    contrasts: ['nakereba_naranai', 'koto_ni_naru']
  },
  {
    id: 'bakari', label: '〜ばかり', jlpt: 'N4', category: 'degree', lesson: 'l32',
    summary: 'Túl sok egyvalamiből: „folyton csak, csupa".',
    structure: 'főnév + ばかり · ige て-alakja + ばかりいます',
    explanation: 'Rosszalló árnyalatú: valamiből aránytalanul sok van, vagy valaki mindig ugyanazt csinálja.',
    examples: [
      { jp: '<ruby>弟<rt>おとうと</rt></ruby>はゲームばかりしています。',
        kana: 'おとうとはゲームばかりしています。', romaji: 'otouto wa geemu bakari shite imasu.', hu: 'Az öcsém folyton csak játszik.',
        cloze: '<ruby>弟<rt>おとうと</rt></ruby>はゲーム___BLANK___しています。', clozeAnswer: 'ばかり',
        tokens: ['おとうとは', 'ゲームばかり', 'しています', '。'] },
      { jp: '<ruby>肉<rt>にく</rt></ruby>ばかり<ruby>食<rt>た</rt></ruby>べてはいけません。',
        kana: 'にくばかりたべてはいけません。', romaji: 'niku bakari tabete wa ikemasen.', hu: 'Nem szabad csak húst enni.',
        cloze: '<ruby>肉<rt>にく</rt></ruby>___BLANK___<ruby>食<rt>た</rt></ruby>べてはいけません。', clozeAnswer: 'ばかり',
        tokens: ['にくばかり', 'たべては', 'いけません', '。'] }
    ],
    contrasts: ['dake', 'shika_nai']
  },
  {
    id: 'koto_ga_aru', label: '〜ことがあります', jlpt: 'N4', category: 'experience', lesson: 'l32',
    summary: 'Alkalmankénti előfordulás: „megesik, hogy…".',
    structure: 'ige szótári / ない-alakja + ことがあります',
    explanation: 'Szótári alakkal azt jelenti: néha megtörténik. (た-alakkal tapasztalat: „volt már rá példa".)',
    examples: [
      { jp: 'ときどき<ruby>朝<rt>あさ</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べないことがあります。',
        kana: 'ときどきあさごはんをたべないことがあります。', romaji: 'tokidoki asagohan o tabenai koto ga arimasu.', hu: 'Néha megesik, hogy nem reggelizem.',
        cloze: 'ときどき<ruby>朝<rt>あさ</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べない___BLANK___。', clozeAnswer: 'ことがあります',
        tokens: ['ときどき', 'あさごはんを', 'たべないことがあります', '。'] },
      { jp: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>間違<rt>まちが</rt></ruby>えることがあります。',
        kana: 'にほんごをまちがえることがあります。', romaji: 'nihongo o machigaeru koto ga arimasu.', hu: 'Előfordul, hogy hibázom a japánban.',
        cloze: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>間違<rt>まちが</rt></ruby>える___BLANK___。', clozeAnswer: 'ことがあります',
        tokens: ['にほんごを', 'まちがえることがあります', '。'] }
    ],
    contrasts: ['ta_koto_ga_aru']
  },
  {
    id: 'tame_ni', label: '〜ために', jlpt: 'N4', category: 'reason', lesson: 'l32',
    summary: 'Tudatos cél vagy ok: „azért, hogy · miatt".',
    structure: 'ige szótári alakja / főnév の + ために',
    explanation: 'Szándékos igével célt jelent (magad teszel érte). Főnévvel vagy múlt idővel okot is: 事故のために.',
    examples: [
      { jp: '<ruby>日本<rt>にほん</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>くために、<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しています。',
        kana: 'にほんではたらくために、にほんごをべんきょうしています。', romaji: 'nihon de hataraku tame ni, nihongo o benkyou shite imasu.', hu: 'Azért tanulok japánul, hogy Japánban dolgozhassak.',
        cloze: '<ruby>日本<rt>にほん</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>く___BLANK___、<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しています。', clozeAnswer: 'ために',
        tokens: ['にほんで', 'はたらくために', '、', 'にほんごを', 'べんきょうしています', '。'] },
      { jp: '<ruby>家族<rt>かぞく</rt></ruby>のために、<ruby>毎日<rt>まいにち</rt></ruby><ruby>働<rt>はたら</rt></ruby>きます。',
        kana: 'かぞくのために、まいにちはたらきます。', romaji: 'kazoku no tame ni, mainichi hatarakimasu.', hu: 'A családomért dolgozom minden nap.',
        cloze: '<ruby>家族<rt>かぞく</rt></ruby>の___BLANK___、<ruby>毎日<rt>まいにち</rt></ruby><ruby>働<rt>はたら</rt></ruby>きます。', clozeAnswer: 'ために',
        tokens: ['かぞくのために', '、', 'まいにち', 'はたらきます', '。'] }
    ],
    contrasts: ['ni_iku_purpose', 'okage_de']
  },

  /* ── l33 ── */
  {
    id: 'sou_desu_look', label: '〜そうです (látszat)', jlpt: 'N4', category: 'guess', lesson: 'l33',
    summary: 'Ránézésre ítélve: „…-nak látszik".',
    structure: 'い-melléknév: い → そうです · な-melléknév + そうです',
    explanation: 'Amit a szemeddel látsz, és abból ítélsz. いい → よさそうです. Nyilvánvaló tulajdonságra (piros, magas) nem használjuk.',
    examples: [
      { jp: 'このケーキはおいしそうです。',
        kana: 'このケーキはおいしそうです。', romaji: 'kono keeki wa oishisou desu.', hu: 'Ez a torta finomnak látszik.',
        cloze: 'このケーキはおいし___BLANK___。', clozeAnswer: 'そうです',
        tokens: ['この', 'ケーキは', 'おいしそうです', '。'] },
      { jp: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>元気<rt>げんき</rt></ruby>そうですね。',
        kana: 'あのひとはげんきそうですね。', romaji: 'ano hito wa genkisou desu ne.', hu: 'Az az ember egészségesnek látszik, ugye?',
        cloze: 'あの<ruby>人<rt>ひと</rt></ruby>は<ruby>元気<rt>げんき</rt></ruby>___BLANK___ですね。', clozeAnswer: 'そう',
        tokens: ['あの', 'ひとは', 'げんきそうですね', '。'] }
    ],
    contrasts: ['sou_da_hearsay', 'you_desu', 'sou_desu_verb']
  },
  {
    id: 'sou_desu_verb', label: 'ige + そうです', jlpt: 'N4', category: 'guess', lesson: 'l33',
    summary: 'Küszöbön álló esemény: „mindjárt…".',
    structure: 'ます-tő + そうです',
    explanation: 'Az ige ます-tövével azt jelzi, hogy valami mindjárt bekövetkezik, vagy a jelek erre utalnak.',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りそうです。',
        kana: 'あめがふりそうです。', romaji: 'ame ga furisou desu.', hu: 'Úgy néz ki, mindjárt esni fog.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>り___BLANK___。', clozeAnswer: 'そうです',
        tokens: ['あめが', 'ふりそうです', '。'] },
      { jp: '<ruby>荷物<rt>にもつ</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちそうですよ。',
        kana: 'にもつがおちそうですよ。', romaji: 'nimotsu ga ochisou desu yo.', hu: 'Mindjárt leesik a csomag!',
        cloze: '<ruby>荷物<rt>にもつ</rt></ruby>が<ruby>落<rt>お</rt></ruby>ち___BLANK___ですよ。', clozeAnswer: 'そう',
        tokens: ['にもつが', 'おちそうですよ', '。'] }
    ],
    contrasts: ['sou_desu_look', 'sou_da_hearsay']
  },
  {
    id: 'mitai_na', label: '〜みたいな・〜のような', jlpt: 'N4', category: 'description', lesson: 'l33',
    summary: 'Hasonlat: „olyan, mint…".',
    structure: 'főnév + みたいな / のような + főnév',
    explanation: 'Valamit egy másikhoz hasonlítasz. A みたい beszélt, a のよう választékosabb.',
    examples: [
      { jp: '<ruby>夢<rt>ゆめ</rt></ruby>みたいな<ruby>話<rt>はなし</rt></ruby>です。',
        kana: 'ゆめみたいなはなしです。', romaji: 'yume mitai na hanashi desu.', hu: 'Olyan ez, mint egy álom.',
        cloze: '<ruby>夢<rt>ゆめ</rt></ruby>___BLANK___<ruby>話<rt>はなし</rt></ruby>です。', clozeAnswer: 'みたいな',
        tokens: ['ゆめみたいな', 'はなしです', '。'] },
      { jp: '<ruby>母<rt>はは</rt></ruby>のような<ruby>人<rt>ひと</rt></ruby>になりたいです。',
        kana: 'ははのようなひとになりたいです。', romaji: 'haha no you na hito ni naritai desu.', hu: 'Olyan ember szeretnék lenni, mint anyám.',
        cloze: '<ruby>母<rt>はは</rt></ruby>___BLANK___<ruby>人<rt>ひと</rt></ruby>になりたいです。', clozeAnswer: 'のような',
        tokens: ['ははのような', 'ひとに', 'なりたいです', '。'] }
    ],
    contrasts: ['you_desu', 'rashii_typical']
  },
  {
    id: 'kurai', label: '〜くらい・〜ぐらい', jlpt: 'N4', category: 'degree', lesson: 'l33',
    summary: 'Közelítő mennyiség: „körülbelül".',
    structure: 'mennyiség + くらい / ぐらい',
    explanation: 'Mennyiség után „körülbelül". Időpontnál a ごろ való: 三時ごろ.',
    examples: [
      { jp: '<ruby>駅<rt>えき</rt></ruby>まで<ruby>十分<rt>じゅっぷん</rt></ruby>ぐらいかかります。',
        kana: 'えきまでじゅっぷんぐらいかかります。', romaji: 'eki made juppun gurai kakarimasu.', hu: 'Az állomásig körülbelül tíz perc.',
        cloze: '<ruby>駅<rt>えき</rt></ruby>まで<ruby>十分<rt>じゅっぷん</rt></ruby>___BLANK___かかります。', clozeAnswer: 'ぐらい',
        tokens: ['えきまで', 'じゅっぷんぐらい', 'かかります', '。'] },
      { jp: '<ruby>一時間<rt>いちじかん</rt></ruby>くらい<ruby>待<rt>ま</rt></ruby>ちました。',
        kana: 'いちじかんくらいまちました。', romaji: 'ichijikan kurai machimashita.', hu: 'Körülbelül egy órát vártam.',
        cloze: '<ruby>一時間<rt>いちじかん</rt></ruby>___BLANK___<ruby>待<rt>ま</rt></ruby>ちました。', clozeAnswer: 'くらい',
        tokens: ['いちじかんくらい', 'まちました', '。'] }
    ],
    contrasts: ['dake']
  },
  {
    id: 'ga_shimasu', label: '〜が します', jlpt: 'N4', category: 'description', lesson: 'l33',
    summary: 'Érzékelés: illatot, hangot, ízt észlelsz.',
    structure: 'におい / 音 / 味 + が します',
    explanation: 'Amit az érzékszerveiddel észlelsz: におい (illat), 音 (hang), 味 (íz), 気 (érzés).',
    examples: [
      { jp: 'いいにおいがします。',
        kana: 'いいにおいがします。', romaji: 'ii nioi ga shimasu.', hu: 'Jó illat van.',
        cloze: 'いいにおい___BLANK___。', clozeAnswer: 'がします',
        tokens: ['いい', 'においがします', '。'] },
      { jp: '<ruby>変<rt>へん</rt></ruby>な<ruby>音<rt>おと</rt></ruby>がします。',
        kana: 'へんなおとがします。', romaji: 'hen na oto ga shimasu.', hu: 'Furcsa hangot hallok.',
        cloze: '<ruby>変<rt>へん</rt></ruby>な<ruby>音<rt>おと</rt></ruby>___BLANK___。', clozeAnswer: 'がします',
        tokens: ['へんな', 'おとがします', '。'] }
    ],
    contrasts: ['miemasu_kikoemasu']
  },

  /* ── l34 ── */
  {
    id: 'ni_yoru_to', label: '〜によると', jlpt: 'N4', category: 'hearsay', lesson: 'l34',
    summary: 'Az értesülés forrása: „… szerint".',
    structure: 'forrás + によると、 … そうです',
    explanation: 'Megnevezi, honnan tudod. A mondat végén hallomást jelző alak áll: 〜そうです, 〜らしいです.',
    examples: [
      { jp: '<ruby>天気予報<rt>てんきよほう</rt></ruby>によると、<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>だそうです。',
        kana: 'てんきよほうによると、あしたはあめだそうです。', romaji: 'tenkiyohou ni yoru to, ashita wa ame da sou desu.', hu: 'Az időjárás-jelentés szerint holnap esni fog.',
        cloze: '<ruby>天気予報<rt>てんきよほう</rt></ruby>___BLANK___、<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>だそうです。', clozeAnswer: 'によると',
        tokens: ['てんきよほうによると', '、', 'あしたは', 'あめだそうです', '。'] },
      { jp: 'ニュースによると、<ruby>事故<rt>じこ</rt></ruby>があったそうです。',
        kana: 'ニュースによると、じこがあったそうです。', romaji: 'nyuusu ni yoru to, jiko ga atta sou desu.', hu: 'A hírek szerint baleset történt.',
        cloze: 'ニュース___BLANK___、<ruby>事故<rt>じこ</rt></ruby>があったそうです。', clozeAnswer: 'によると',
        tokens: ['ニュースによると', '、', 'じこが', 'あったそうです', '。'] }
    ],
    contrasts: ['sou_da_hearsay', 'ni_yotte']
  },
  {
    id: 'rashii_hearsay', label: '〜らしいです', jlpt: 'N4', category: 'hearsay', lesson: 'l34',
    summary: 'Bizonytalan értesülés: „úgy tudni, állítólag".',
    structure: 'rövid alak + らしいです (な-melléknév / főnév közvetlenül)',
    explanation: 'Mástól hallott vagy közvetett jelekből leszűrt információ, amelyért nem vállalsz felelősséget.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>会社<rt>かいしゃ</rt></ruby>をやめるらしいです。',
        kana: 'たなかさんはかいしゃをやめるらしいです。', romaji: 'tanaka-san wa kaisha o yameru rashii desu.', hu: 'Úgy tudni, Tanaka felmond a cégnél.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>会社<rt>かいしゃ</rt></ruby>をやめる___BLANK___。', clozeAnswer: 'らしいです',
        tokens: ['たなかさんは', 'かいしゃを', 'やめるらしいです', '。'] },
      { jp: 'あの<ruby>店<rt>みせ</rt></ruby>はおいしいらしいですよ。',
        kana: 'あのみせはおいしいらしいですよ。', romaji: 'ano mise wa oishii rashii desu yo.', hu: 'Állítólag finom az a hely.',
        cloze: 'あの<ruby>店<rt>みせ</rt></ruby>はおいしい___BLANK___ですよ。', clozeAnswer: 'らしい',
        tokens: ['あの', 'みせは', 'おいしいらしいですよ', '。'] }
    ],
    contrasts: ['sou_da_hearsay', 'you_desu', 'rashii_typical']
  },
  {
    id: 'to_itte_imashita', label: '〜と言っていました', jlpt: 'N4', category: 'quotation', lesson: 'l34',
    summary: 'Üzenetátadás: „azt üzeni, azt mondta nekem, hogy…".',
    structure: 'rövid alak + と言っていました',
    explanation: 'Amikor valakinek a szavait közvetíted egy harmadiknak. A 言いました egyszeri kijelentés, a 言っていました üzenet.',
    examples: [
      { jp: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れると<ruby>言<rt>い</rt></ruby>っていました。',
        kana: 'たなかさんはすこしおくれるといっていました。', romaji: 'tanaka-san wa sukoshi okureru to itte imashita.', hu: 'Tanaka azt mondta, hogy késik egy kicsit.',
        cloze: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れる___BLANK___。', clozeAnswer: 'といっていました',
        tokens: ['たなかさんは', 'すこし', 'おくれるといっていました', '。'] },
      { jp: '<ruby>母<rt>はは</rt></ruby>がよろしくと<ruby>言<rt>い</rt></ruby>っていました。',
        kana: 'ははがよろしくといっていました。', romaji: 'haha ga yoroshiku to itte imashita.', hu: 'Anyám üdvözletét küldi.',
        cloze: '<ruby>母<rt>はは</rt></ruby>がよろしく___BLANK___。', clozeAnswer: 'といっていました',
        tokens: ['ははが', 'よろしくといっていました', '。'] }
    ],
    contrasts: ['to_iimashita', 'to_iu_koto_desu']
  },

  /* ── l35 ── */
  {
    id: 'kata', label: '〜かた', jlpt: 'N4', category: 'nominal', lesson: 'l35',
    summary: 'A mód: „ahogyan valamit csinálni kell".',
    structure: 'ます-tő + かた',
    explanation: 'Az igéből főnév lesz: 使います → 使い方 (a használat módja). A tárgy の-t kap: 漢字の読み方.',
    examples: [
      { jp: 'この<ruby>漢字<rt>かんじ</rt></ruby>の<ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてください。',
        kana: 'このかんじのよみかたをおしえてください。', romaji: 'kono kanji no yomikata o oshiete kudasai.', hu: 'Kérem, mondja meg, hogyan kell olvasni ezt a kanjit!',
        cloze: 'この<ruby>漢字<rt>かんじ</rt></ruby>の<ruby>読<rt>よ</rt></ruby>み___BLANK___を<ruby>教<rt>おし</rt></ruby>えてください。', clozeAnswer: 'かた',
        tokens: ['この', 'かんじの', 'よみかたを', 'おしえてください', '。'] },
      { jp: 'はしの<ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>がわかりません。',
        kana: 'はしのつかいかたがわかりません。', romaji: 'hashi no tsukaikata ga wakarimasen.', hu: 'Nem tudom, hogyan kell a pálcikát használni.',
        cloze: 'はしの<ruby>使<rt>つか</rt></ruby>い___BLANK___がわかりません。', clozeAnswer: 'かた',
        tokens: ['はしの', 'つかいかたが', 'わかりません', '。'] }
    ],
    contrasts: ['koto_desu', 'sa_noun']
  },
  {
    id: 'no_kawari_ni', label: '〜のかわりに', jlpt: 'N4', category: 'particle', lesson: 'l35',
    summary: 'Helyettesítés: „valami vagy valaki helyett".',
    structure: 'főnév の かわりに',
    explanation: 'Egyik dolog vagy személy a másik helyére lép.',
    examples: [
      { jp: 'コーヒーのかわりに、お<ruby>茶<rt>ちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。',
        kana: 'コーヒーのかわりに、おちゃをのみます。', romaji: 'koohii no kawari ni, ocha o nomimasu.', hu: 'Kávé helyett teát iszom.',
        cloze: 'コーヒー___BLANK___、お<ruby>茶<rt>ちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。', clozeAnswer: 'のかわりに',
        tokens: ['コーヒーのかわりに', '、', 'おちゃを', 'のみます', '。'] },
      { jp: '<ruby>父<rt>ちち</rt></ruby>のかわりに、<ruby>私<rt>わたし</rt></ruby>が<ruby>行<rt>い</rt></ruby>きます。',
        kana: 'ちちのかわりに、わたしがいきます。', romaji: 'chichi no kawari ni, watashi ga ikimasu.', hu: 'Apám helyett én megyek.',
        cloze: '<ruby>父<rt>ちち</rt></ruby>___BLANK___、<ruby>私<rt>わたし</rt></ruby>が<ruby>行<rt>い</rt></ruby>きます。', clozeAnswer: 'のかわりに',
        tokens: ['ちちのかわりに', '、', 'わたしが', 'いきます', '。'] }
    ],
    contrasts: ['kawari_ni_verb']
  },
  {
    id: 'kawari_ni_verb', label: 'ige + かわりに', jlpt: 'N4', category: 'contrast', lesson: 'l35',
    summary: 'Csere: „ahelyett, hogy…" vagy „cserébe".',
    structure: 'ige rövid alakja + かわりに',
    explanation: 'Vagy az egyik cselekvés váltja a másikat, vagy ellentételezésről van szó: „megteszem, cserébe…".',
    examples: [
      { jp: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>るかわりに、うちで<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みました。',
        kana: 'えいがをみるかわりに、うちでほんをよみました。', romaji: 'eiga o miru kawari ni, uchi de hon o yomimashita.', hu: 'Ahelyett, hogy moziba mentem volna, otthon olvastam.',
        cloze: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>る___BLANK___、うちで<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みました。', clozeAnswer: 'かわりに',
        tokens: ['えいがを', 'みるかわりに', '、', 'うちで', 'ほんを', 'よみました', '。'] },
      { jp: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えるかわりに、<ruby>英語<rt>えいご</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてもらいます。',
        kana: 'にほんごをおしえるかわりに、えいごをおしえてもらいます。', romaji: 'nihongo o oshieru kawari ni, eigo o oshiete moraimasu.', hu: 'Japánt tanítok, cserébe engem angolra tanítanak.',
        cloze: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>教<rt>おし</rt></ruby>える___BLANK___、<ruby>英語<rt>えいご</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてもらいます。', clozeAnswer: 'かわりに',
        tokens: ['にほんごを', 'おしえるかわりに', '、', 'えいごを', 'おしえてもらいます', '。'] }
    ],
    contrasts: ['no_kawari_ni']
  },
  {
    id: 'mama', label: '〜まま', jlpt: 'N4', category: 'state', lesson: 'l35',
    summary: 'Változatlan állapot: „úgy, ahogy van".',
    structure: 'ige た-alakja + まま · főnév の まま',
    explanation: 'Egy állapot megmarad, miközben valami más történik; gyakran nem illő vagy nem várt módon.',
    examples: [
      { jp: '<ruby>電気<rt>でんき</rt></ruby>をつけたまま、<ruby>寝<rt>ね</rt></ruby>てしまいました。',
        kana: 'でんきをつけたまま、ねてしまいました。', romaji: 'denki o tsuketa mama, nete shimaimashita.', hu: 'Égve hagyott villannyal aludtam el.',
        cloze: '<ruby>電気<rt>でんき</rt></ruby>をつけ___BLANK___、<ruby>寝<rt>ね</rt></ruby>てしまいました。', clozeAnswer: 'たまま',
        tokens: ['でんきを', 'つけたまま', '、', 'ねてしまいました', '。'] },
      { jp: '<ruby>靴<rt>くつ</rt></ruby>をはいたまま、<ruby>入<rt>はい</rt></ruby>らないでください。',
        kana: 'くつをはいたまま、はいらないでください。', romaji: 'kutsu o haita mama, hairanaide kudasai.', hu: 'Kérem, ne jöjjön be cipőben!',
        cloze: '<ruby>靴<rt>くつ</rt></ruby>をはい___BLANK___、<ruby>入<rt>はい</rt></ruby>らないでください。', clozeAnswer: 'たまま',
        tokens: ['くつを', 'はいたまま', '、', 'はいらないでください', '。'] }
    ],
    contrasts: ['te_oku', 'nagara']
  },

  /* ── l36 ── */
  {
    id: 'passive_thing', label: 'Szenvedő mondat (dolog az alany)', jlpt: 'N4', category: 'voice', lesson: 'l36',
    summary: 'Tárgyilagos közlés: „megrendezik, megépítették".',
    structure: 'dolog が / は + ige szenvedő alakja',
    explanation: 'Ha nem fontos, ki teszi: a dolog lesz az alany. Hírek, leírások, ismertetők nyelve.',
    examples: [
      { jp: 'このお<ruby>寺<rt>てら</rt></ruby>は<ruby>五百年前<rt>ごひゃくねんまえ</rt></ruby>に<ruby>建<rt>た</rt></ruby>てられました。',
        kana: 'このおてらはごひゃくねんまえにたてられました。', romaji: 'kono otera wa gohyakunen mae ni tateraremashita.', hu: 'Ezt a templomot ötszáz éve építették.',
        cloze: 'このお<ruby>寺<rt>てら</rt></ruby>は<ruby>五百年前<rt>ごひゃくねんまえ</rt></ruby>に<ruby>建<rt>た</rt></ruby>て___BLANK___。', clozeAnswer: 'られました',
        tokens: ['この', 'おてらは', 'ごひゃくねんまえに', 'たてられました', '。'] },
      { jp: '<ruby>来月<rt>らいげつ</rt></ruby>ここで<ruby>祭<rt>まつ</rt></ruby>りが<ruby>行<rt>おこな</rt></ruby>われます。',
        kana: 'らいげつここでまつりがおこなわれます。', romaji: 'raigetsu koko de matsuri ga okonawaremasu.', hu: 'Jövő hónapban itt fesztivált rendeznek.',
        cloze: '<ruby>来月<rt>らいげつ</rt></ruby>ここで<ruby>祭<rt>まつ</rt></ruby>りが<ruby>行<rt>おこな</rt></ruby>わ___BLANK___。', clozeAnswer: 'れます',
        tokens: ['らいげつ', 'ここで', 'まつりが', 'おこなわれます', '。'] }
    ],
    contrasts: ['passive_person', 'te_aru']
  },
  {
    id: 'ni_yotte_agent', label: '〜によって (alkotó)', jlpt: 'N4', category: 'voice', lesson: 'l36',
    summary: 'Ki alkotta, találta fel: „… által".',
    structure: 'alkotó + によって + szenvedő ige',
    explanation: 'Műalkotás, találmány, felfedezés létrehozóját a によって jelöli (nem a に).',
    examples: [
      { jp: 'この<ruby>絵<rt>え</rt></ruby>はピカソによって<ruby>描<rt>か</rt></ruby>かれました。',
        kana: 'このえはピカソによってかかれました。', romaji: 'kono e wa pikaso ni yotte kakaremashita.', hu: 'Ezt a képet Picasso festette.',
        cloze: 'この<ruby>絵<rt>え</rt></ruby>はピカソ___BLANK___<ruby>描<rt>か</rt></ruby>かれました。', clozeAnswer: 'によって',
        tokens: ['この', 'えは', 'ピカソによって', 'かかれました', '。'] },
      { jp: '<ruby>電話<rt>でんわ</rt></ruby>はベルによって<ruby>発明<rt>はつめい</rt></ruby>されました。',
        kana: 'でんわはベルによってはつめいされました。', romaji: 'denwa wa beru ni yotte hatsumei saremashita.', hu: 'A telefont Bell találta fel.',
        cloze: '<ruby>電話<rt>でんわ</rt></ruby>はベル___BLANK___<ruby>発明<rt>はつめい</rt></ruby>されました。', clozeAnswer: 'によって',
        tokens: ['でんわは', 'ベルによって', 'はつめいされました', '。'] }
    ],
    contrasts: ['ni_yotte', 'passive_thing']
  },
  {
    id: 'kara_ni_kakete', label: '〜から〜にかけて', jlpt: 'N4', category: 'particle', lesson: 'l36',
    summary: 'Elmosódó határú sáv: „…-tól nagyjából …-ig".',
    structure: 'A から B にかけて',
    explanation: 'Idő- vagy térbeli sáv, amelynek a határai nem élesek. A から〜まで pontos határt ad.',
    examples: [
      { jp: '<ruby>六月<rt>ろくがつ</rt></ruby>から<ruby>七月<rt>しちがつ</rt></ruby>にかけて、<ruby>雨<rt>あめ</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いです。',
        kana: 'ろくがつからしちがつにかけて、あめがおおいです。', romaji: 'rokugatsu kara shichigatsu ni kakete, ame ga ooi desu.', hu: 'Júniustól nagyjából júliusig sok az eső.',
        cloze: '<ruby>六月<rt>ろくがつ</rt></ruby>から<ruby>七月<rt>しちがつ</rt></ruby>___BLANK___、<ruby>雨<rt>あめ</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いです。', clozeAnswer: 'にかけて',
        tokens: ['ろくがつから', 'しちがつにかけて', '、', 'あめが', 'おおいです', '。'] },
      { jp: '<ruby>今夜<rt>こんや</rt></ruby>から<ruby>明日<rt>あした</rt></ruby>の<ruby>朝<rt>あさ</rt></ruby>にかけて、<ruby>雪<rt>ゆき</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ります。',
        kana: 'こんやからあしたのあさにかけて、ゆきがふります。', romaji: 'konya kara ashita no asa ni kakete, yuki ga furimasu.', hu: 'Ma éjjeltől holnap reggelig havazni fog.',
        cloze: '<ruby>今夜<rt>こんや</rt></ruby>から<ruby>明日<rt>あした</rt></ruby>の<ruby>朝<rt>あさ</rt></ruby>___BLANK___、<ruby>雪<rt>ゆき</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ります。', clozeAnswer: 'にかけて',
        tokens: ['こんやから', 'あしたのあさにかけて', '、', 'ゆきが', 'ふります', '。'] }
    ],
    contrasts: ['kara_made']
  },
  {
    id: 'demo_example', label: '〜でも', jlpt: 'N4', category: 'degree', lesson: 'l36',
    summary: 'Laza felvetés vagy szélső eset: „mondjuk… · még … is".',
    structure: 'főnév + でも',
    explanation: 'Javaslatban egy lehetőséget dob fel („mondjuk egy teát"), állításban szélső esetet („még a gyerek is").',
    examples: [
      { jp: 'お<ruby>茶<rt>ちゃ</rt></ruby>でも<ruby>飲<rt>の</rt></ruby>みませんか。',
        kana: 'おちゃでものみませんか。', romaji: 'ocha demo nomimasen ka.', hu: 'Nem innánk mondjuk egy teát?',
        cloze: 'お<ruby>茶<rt>ちゃ</rt></ruby>___BLANK___<ruby>飲<rt>の</rt></ruby>みませんか。', clozeAnswer: 'でも',
        tokens: ['おちゃでも', 'のみませんか', '。'] },
      { jp: 'これは<ruby>子<rt>こ</rt></ruby>どもでもできます。',
        kana: 'これはこどもでもできます。', romaji: 'kore wa kodomo demo dekimasu.', hu: 'Ezt még egy gyerek is meg tudja csinálni.',
        cloze: 'これは<ruby>子<rt>こ</rt></ruby>ども___BLANK___できます。', clozeAnswer: 'でも',
        tokens: ['これは', 'こどもでも', 'できます', '。'] }
    ],
    contrasts: ['temo', 'dare_demo']
  },

  /* ── l37 ── */
  {
    id: 'passive_person', label: 'Szenvedő mondat (ember az alany)', jlpt: 'N4', category: 'voice', lesson: 'l37',
    summary: 'Valaki tesz velem valamit: „megdicsértek, megszidtak".',
    structure: 'én は + cselekvő に + ige szenvedő alakja',
    explanation: 'Az alany az, akit a cselekvés ér; aki teszi, に-t kap.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>にほめられました。',
        kana: 'わたしはせんせいにほめられました。', romaji: 'watashi wa sensei ni homeraremashita.', hu: 'Megdicsért a tanár.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>にほめ___BLANK___。', clozeAnswer: 'られました',
        tokens: ['わたしは', 'せんせいに', 'ほめられました', '。'] },
      { jp: '<ruby>弟<rt>おとうと</rt></ruby>は<ruby>母<rt>はは</rt></ruby>に<ruby>叱<rt>しか</rt></ruby>られました。',
        kana: 'おとうとはははにしかられました。', romaji: 'otouto wa haha ni shikararemashita.', hu: 'Az öcsémet megszidta anyánk.',
        cloze: '<ruby>弟<rt>おとうと</rt></ruby>は<ruby>母<rt>はは</rt></ruby>に<ruby>叱<rt>しか</rt></ruby>___BLANK___。', clozeAnswer: 'られました',
        tokens: ['おとうとは', 'ははに', 'しかられました', '。'] }
    ],
    contrasts: ['passive_thing', 'te_morau']
  },
  {
    id: 'passive_possession', label: 'Szenvedő mondat tárggyal', jlpt: 'N4', category: 'voice', lesson: 'l37',
    summary: 'A tulajdonomat éri valami: „ellopták a…-mat".',
    structure: 'én は + cselekvő に + tárgy を + szenvedő ige',
    explanation: 'A károsult ember az alany, a tulajdona を-t kap: így a kár érzik ki a mondatból.',
    examples: [
      { jp: '<ruby>私<rt>わたし</rt></ruby>は<ruby>財布<rt>さいふ</rt></ruby>を<ruby>盗<rt>ぬす</rt></ruby>まれました。',
        kana: 'わたしはさいふをぬすまれました。', romaji: 'watashi wa saifu o nusumaremashita.', hu: 'Ellopták a pénztárcámat.',
        cloze: '<ruby>私<rt>わたし</rt></ruby>は<ruby>財布<rt>さいふ</rt></ruby>を<ruby>盗<rt>ぬす</rt></ruby>ま___BLANK___。', clozeAnswer: 'れました',
        tokens: ['わたしは', 'さいふを', 'ぬすまれました', '。'] },
      { jp: '<ruby>電車<rt>でんしゃ</rt></ruby>で<ruby>足<rt>あし</rt></ruby>を<ruby>踏<rt>ふ</rt></ruby>まれました。',
        kana: 'でんしゃであしをふまれました。', romaji: 'densha de ashi o fumaremashita.', hu: 'A vonaton ráléptek a lábamra.',
        cloze: '<ruby>電車<rt>でんしゃ</rt></ruby>で<ruby>足<rt>あし</rt></ruby>を<ruby>踏<rt>ふ</rt></ruby>ま___BLANK___。', clozeAnswer: 'れました',
        tokens: ['でんしゃで', 'あしを', 'ふまれました', '。'] }
    ],
    contrasts: ['passive_person', 'passive_nuisance']
  },
  {
    id: 'passive_nuisance', label: 'Kellemetlenség szenvedő alakkal', jlpt: 'N4', category: 'voice', lesson: 'l37',
    summary: 'Valami történik, és nekem ez rossz: „megáztam".',
    structure: 'én は + ok に + tárgyatlan ige szenvedő alakja',
    explanation: 'Tárgyatlan igével is képezhető: azt fejezi ki, hogy az esemény a beszélőnek kellemetlen.',
    examples: [
      { jp: '<ruby>雨<rt>あめ</rt></ruby>に<ruby>降<rt>ふ</rt></ruby>られました。',
        kana: 'あめにふられました。', romaji: 'ame ni furaremashita.', hu: 'Megáztam, rám esett az eső.',
        cloze: '<ruby>雨<rt>あめ</rt></ruby>に<ruby>降<rt>ふ</rt></ruby>ら___BLANK___。', clozeAnswer: 'れました',
        tokens: ['あめに', 'ふられました', '。'] },
      { jp: '<ruby>隣<rt>となり</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>騒<rt>さわ</rt></ruby>がれて、<ruby>眠<rt>ねむ</rt></ruby>れませんでした。',
        kana: 'となりのひとにさわがれて、ねむれませんでした。', romaji: 'tonari no hito ni sawagarete, nemuremasen deshita.', hu: 'A szomszéd zajongott, ezért nem tudtam aludni.',
        cloze: '<ruby>隣<rt>となり</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>騒<rt>さわ</rt></ruby>が___BLANK___、<ruby>眠<rt>ねむ</rt></ruby>れませんでした。', clozeAnswer: 'れて',
        tokens: ['となりのひとに', 'さわがれて', '、', 'ねむれませんでした', '。'] }
    ],
    contrasts: ['passive_person', 'passive_possession']
  },
  {
    id: 'tara_dou_desu_ka', label: '〜たらどうですか', jlpt: 'N4', category: 'advice', lesson: 'l37',
    summary: 'Szelíd javaslat: „mi lenne, ha…?"',
    structure: 'ige た-alakja + らどうですか',
    explanation: 'Tanácsot adsz úgy, hogy a döntést a másikra hagyod. Barátnak: 〜たらどう？',
    examples: [
      { jp: '<ruby>少<rt>すこ</rt></ruby>し<ruby>休<rt>やす</rt></ruby>んだらどうですか。',
        kana: 'すこしやすんだらどうですか。', romaji: 'sukoshi yasundara dou desu ka.', hu: 'Mi lenne, ha pihennél egy kicsit?',
        cloze: '<ruby>少<rt>すこ</rt></ruby>し<ruby>休<rt>やす</rt></ruby>ん___BLANK___。', clozeAnswer: 'だらどうですか',
        tokens: ['すこし', 'やすんだらどうですか', '。'] },
      { jp: '<ruby>交番<rt>こうばん</rt></ruby>で<ruby>聞<rt>き</rt></ruby>いたらどうですか。',
        kana: 'こうばんできいたらどうですか。', romaji: 'kouban de kiitara dou desu ka.', hu: 'Mi lenne, ha a rendőrőrsön kérdeznéd meg?',
        cloze: '<ruby>交番<rt>こうばん</rt></ruby>で<ruby>聞<rt>き</rt></ruby>い___BLANK___。', clozeAnswer: 'たらどうですか',
        tokens: ['こうばんで', 'きいたらどうですか', '。'] }
    ],
    contrasts: ['ta_hou_ga_ii', 'tara_ii_desu_ka']
  },

  /* ── l38 ── */
  {
    id: 'rareru_honorific', label: '〜れます・〜られます (tiszteleti)', jlpt: 'N3', category: 'honorific', lesson: 'l38',
    summary: 'Enyhe tisztelet a szenvedő alakkal.',
    structure: 'ige szenvedő alakja tiszteleti értelemben',
    explanation: 'A szenvedő alak tiszteletet is kifejezhet: a tisztelt személy cselekszik. Alakilag ugyanaz, a szövegkörnyezet dönt.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>何時<rt>なんじ</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>られますか。',
        kana: 'せんせいはなんじにかえられますか。', romaji: 'sensei wa nanji ni kaeraremasu ka.', hu: 'Hánykor megy haza a tanár úr?',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>何時<rt>なんじ</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>ら___BLANK___か。', clozeAnswer: 'れます',
        tokens: ['せんせいは', 'なんじに', 'かえられますか', '。'] },
      { jp: '<ruby>社長<rt>しゃちょう</rt></ruby>はもう<ruby>出<rt>で</rt></ruby>かけられました。',
        kana: 'しゃちょうはもうでかけられました。', romaji: 'shachou wa mou dekakeraremashita.', hu: 'Az igazgató úr már elment.',
        cloze: '<ruby>社長<rt>しゃちょう</rt></ruby>はもう<ruby>出<rt>で</rt></ruby>かけ___BLANK___。', clozeAnswer: 'られました',
        tokens: ['しゃちょうは', 'もう', 'でかけられました', '。'] }
    ],
    contrasts: ['o_ni_naru', 'passive_person']
  },
  {
    id: 'o_ni_naru', label: 'お〜になります', jlpt: 'N3', category: 'honorific', lesson: 'l38',
    summary: 'Tiszteleti igealak: a tisztelt személy cselekszik.',
    structure: 'お + ます-tő + になります',
    explanation: 'Általános tiszteleti forma. Egy szótagú tövű és különleges alakú igéknél nem használható (見ます → ご覧になります).',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>はもうお<ruby>帰<rt>かえ</rt></ruby>りになりました。',
        kana: 'せんせいはもうおかえりになりました。', romaji: 'sensei wa mou okaeri ni narimashita.', hu: 'A tanár úr már hazament.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>はもうお<ruby>帰<rt>かえ</rt></ruby>り___BLANK___。', clozeAnswer: 'になりました',
        tokens: ['せんせいは', 'もう', 'おかえりになりました', '。'] },
      { jp: 'この<ruby>本<rt>ほん</rt></ruby>をお<ruby>読<rt>よ</rt></ruby>みになりますか。',
        kana: 'このほんをおよみになりますか。', romaji: 'kono hon o oyomi ni narimasu ka.', hu: 'Elolvassa ezt a könyvet?',
        cloze: 'この<ruby>本<rt>ほん</rt></ruby>をお<ruby>読<rt>よ</rt></ruby>み___BLANK___か。', clozeAnswer: 'になります',
        tokens: ['この', 'ほんを', 'およみになりますか', '。'] }
    ],
    contrasts: ['o_shimasu', 'rareru_honorific']
  },
  {
    id: 'keigo_special', label: 'Különleges tiszteleti igék', jlpt: 'N3', category: 'honorific', lesson: 'l38',
    summary: 'Külön tiszteleti szó a másik cselekvésére (いらっしゃいます…).',
    structure: '行きます / 来ます / います → いらっしゃいます · 食べます → 召し上がります · 言います → おっしゃいます',
    explanation: 'A leggyakoribb igéknek saját tiszteleti alakjuk van. Magadról soha nem mondod őket.',
    examples: [
      { jp: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>研究室<rt>けんきゅうしつ</rt></ruby>にいらっしゃいます。',
        kana: 'せんせいはけんきゅうしつにいらっしゃいます。', romaji: 'sensei wa kenkyuushitsu ni irasshaimasu.', hu: 'A tanár úr a szobájában van.',
        cloze: '<ruby>先生<rt>せんせい</rt></ruby>は<ruby>研究室<rt>けんきゅうしつ</rt></ruby>に___BLANK___。', clozeAnswer: 'いらっしゃいます',
        tokens: ['せんせいは', 'けんきゅうしつに', 'いらっしゃいます', '。'] },
      { jp: 'どうぞ<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がってください。',
        kana: 'どうぞめしあがってください。', romaji: 'douzo meshiagatte kudasai.', hu: 'Tessék, fogyassza egészséggel!',
        cloze: 'どうぞ___BLANK___ください。', clozeAnswer: 'めしあがって',
        tokens: ['どうぞ', 'めしあがってください', '。'] }
    ],
    contrasts: ['kenjou_special', 'o_ni_naru']
  },
  {
    id: 'uchi_ni', label: '〜うちに', jlpt: 'N3', category: 'sequence', lesson: 'l38',
    summary: 'Amíg az állapot tart: „amíg még…, mielőtt megváltozik".',
    structure: 'い-melléknév · な-melléknév + な · főnév の · ige ている / ない-alakja + うちに',
    explanation: 'Azt sürgeti, hogy tedd meg, amíg a kedvező állapot fennáll.',
    examples: [
      { jp: '<ruby>熱<rt>あつ</rt></ruby>いうちに、<ruby>食<rt>た</rt></ruby>べてください。',
        kana: 'あついうちに、たべてください。', romaji: 'atsui uchi ni, tabete kudasai.', hu: 'Egye, amíg meleg!',
        cloze: '<ruby>熱<rt>あつ</rt></ruby>い___BLANK___、<ruby>食<rt>た</rt></ruby>べてください。', clozeAnswer: 'うちに',
        tokens: ['あついうちに', '、', 'たべてください', '。'] },
      { jp: '<ruby>若<rt>わか</rt></ruby>いうちに、いろいろな<ruby>国<rt>くに</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きたいです。',
        kana: 'わかいうちに、いろいろなくにへいきたいです。', romaji: 'wakai uchi ni, iroiro na kuni e ikitai desu.', hu: 'Amíg fiatal vagyok, sok országba szeretnék eljutni.',
        cloze: '<ruby>若<rt>わか</rt></ruby>い___BLANK___、いろいろな<ruby>国<rt>くに</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きたいです。', clozeAnswer: 'うちに',
        tokens: ['わかいうちに', '、', 'いろいろなくにへ', 'いきたいです', '。'] }
    ],
    contrasts: ['mae_ni', 'toki']
  },

  /* ── l39 ── */
  {
    id: 'o_shimasu', label: 'お〜します', jlpt: 'N3', category: 'honorific', lesson: 'l39',
    summary: 'Szerény igealak: én teszem a másikért.',
    structure: 'お + ます-tő + します (する igék: ご + főnév + します)',
    explanation: 'A saját cselekvésedet mondod szerényen, ha az a tisztelt személyt szolgálja.',
    examples: [
      { jp: 'かばんをお<ruby>持<rt>も</rt></ruby>ちします。',
        kana: 'かばんをおもちします。', romaji: 'kaban o omochi shimasu.', hu: 'Viszem a táskáját.',
        cloze: 'かばんをお<ruby>持<rt>も</rt></ruby>ち___BLANK___。', clozeAnswer: 'します',
        tokens: ['かばんを', 'おもちします', '。'] },
      { jp: '<ruby>駅<rt>えき</rt></ruby>までお<ruby>送<rt>おく</rt></ruby>りします。',
        kana: 'えきまでおおくりします。', romaji: 'eki made ookuri shimasu.', hu: 'Elkísérem az állomásig.',
        cloze: '<ruby>駅<rt>えき</rt></ruby>までお<ruby>送<rt>おく</rt></ruby>り___BLANK___。', clozeAnswer: 'します',
        tokens: ['えきまで', 'おおくりします', '。'] }
    ],
    contrasts: ['o_ni_naru', 'mashouka']
  },
  {
    id: 'kenjou_special', label: 'Különleges szerény igék', jlpt: 'N3', category: 'honorific', lesson: 'l39',
    summary: 'Külön szerény szó a saját cselekvésemre (参ります, 申します…).',
    structure: '行きます / 来ます → 参ります · 言います → 申します · います → おります · 見ます → 拝見します',
    explanation: 'A saját cselekvésedre használod, hogy a másikat felemeld. Bemutatkozáskor: 〜と申します.',
    examples: [
      { jp: 'アンナと<ruby>申<rt>もう</rt></ruby>します。',
        kana: 'アンナともうします。', romaji: 'anna to moushimasu.', hu: 'Annának hívnak (szerényen mondva).',
        cloze: 'アンナと___BLANK___。', clozeAnswer: 'もうします',
        tokens: ['アンナと', 'もうします', '。'] },
      { jp: '<ruby>明日<rt>あした</rt></ruby><ruby>三時<rt>さんじ</rt></ruby>に<ruby>参<rt>まい</rt></ruby>ります。',
        kana: 'あしたさんじにまいります。', romaji: 'ashita sanji ni mairimasu.', hu: 'Holnap háromkor jövök.',
        cloze: '<ruby>明日<rt>あした</rt></ruby><ruby>三時<rt>さんじ</rt></ruby>に___BLANK___。', clozeAnswer: 'まいります',
        tokens: ['あした', 'さんじに', 'まいります', '。'] }
    ],
    contrasts: ['keigo_special', 'o_shimasu']
  },
  {
    id: 'yasui_nikui', label: '〜やすいです・〜にくいです', jlpt: 'N3', category: 'description', lesson: 'l39',
    summary: 'Könnyű vagy nehéz megtenni.',
    structure: 'ます-tő + やすい / にくい',
    explanation: 'Azt mondja meg, mennyire megy könnyen a cselekvés. い-melléknévként ragozódik.',
    examples: [
      { jp: 'このペンは<ruby>書<rt>か</rt></ruby>きやすいです。',
        kana: 'このペンはかきやすいです。', romaji: 'kono pen wa kakiyasui desu.', hu: 'Ezzel a tollal könnyű írni.',
        cloze: 'このペンは<ruby>書<rt>か</rt></ruby>き___BLANK___です。', clozeAnswer: 'やすい',
        tokens: ['この', 'ペンは', 'かきやすいです', '。'] },
      { jp: 'この<ruby>字<rt>じ</rt></ruby>は<ruby>読<rt>よ</rt></ruby>みにくいです。',
        kana: 'このじはよみにくいです。', romaji: 'kono ji wa yominikui desu.', hu: 'Ezt a betűt nehéz elolvasni.',
        cloze: 'この<ruby>字<rt>じ</rt></ruby>は<ruby>読<rt>よ</rt></ruby>み___BLANK___です。', clozeAnswer: 'にくい',
        tokens: ['この', 'じは', 'よみにくいです', '。'] }
    ],
    contrasts: ['sugiru']
  },
  {
    id: 'sugiru', label: '〜すぎます', jlpt: 'N3', category: 'degree', lesson: 'l39',
    summary: 'Túlzás: „túl…, túlságosan".',
    structure: 'ます-tő / melléknév töve + すぎます',
    explanation: 'A mérték átlépi a kívánatosat. いい → よすぎます.',
    examples: [
      { jp: '<ruby>昨日<rt>きのう</rt></ruby><ruby>食<rt>た</rt></ruby>べすぎました。',
        kana: 'きのうたべすぎました。', romaji: 'kinou tabesugimashita.', hu: 'Tegnap túl sokat ettem.',
        cloze: '<ruby>昨日<rt>きのう</rt></ruby><ruby>食<rt>た</rt></ruby>べ___BLANK___。', clozeAnswer: 'すぎました',
        tokens: ['きのう', 'たべすぎました', '。'] },
      { jp: 'この<ruby>靴<rt>くつ</rt></ruby>は<ruby>大<rt>おお</rt></ruby>きすぎます。',
        kana: 'このくつはおおきすぎます。', romaji: 'kono kutsu wa ookisugimasu.', hu: 'Ez a cipő túl nagy.',
        cloze: 'この<ruby>靴<rt>くつ</rt></ruby>は<ruby>大<rt>おお</rt></ruby>き___BLANK___。', clozeAnswer: 'すぎます',
        tokens: ['この', 'くつは', 'おおきすぎます', '。'] }
    ],
    contrasts: ['yasui_nikui', 'bakari']
  },

  /* ── l40 ── */
  {
    id: 'donna_ni_temo', label: 'kérdőszó + 〜ても', jlpt: 'N3', category: 'contrast', lesson: 'l40',
    summary: 'Bármilyen mértékben is: „akármennyire…, mégis".',
    structure: 'いくら / どんなに / 何を + ige て-alakja + も',
    explanation: 'A kérdőszó a mértéket vagy a választást korlátlanná teszi: bármennyi, bármi.',
    examples: [
      { jp: 'いくら<ruby>食<rt>た</rt></ruby>べても、<ruby>太<rt>ふと</rt></ruby>りません。',
        kana: 'いくらたべても、ふとりません。', romaji: 'ikura tabete mo, futorimasen.', hu: 'Akármennyit eszem, nem hízom.',
        cloze: 'いくら<ruby>食<rt>た</rt></ruby>べ___BLANK___、<ruby>太<rt>ふと</rt></ruby>りません。', clozeAnswer: 'ても',
        tokens: ['いくら', 'たべても', '、', 'ふとりません', '。'] },
      { jp: 'どんなに<ruby>忙<rt>いそが</rt></ruby>しくても、<ruby>毎日<rt>まいにち</rt></ruby><ruby>勉強<rt>べんきょう</rt></ruby>します。',
        kana: 'どんなにいそがしくても、まいにちべんきょうします。', romaji: 'donna ni isogashikute mo, mainichi benkyou shimasu.', hu: 'Bármennyire elfoglalt vagyok, minden nap tanulok.',
        cloze: '___BLANK___<ruby>忙<rt>いそが</rt></ruby>しくても、<ruby>毎日<rt>まいにち</rt></ruby><ruby>勉強<rt>べんきょう</rt></ruby>します。', clozeAnswer: 'どんなに',
        tokens: ['どんなに', 'いそがしくても', '、', 'まいにち', 'べんきょうします', '。'] }
    ],
    contrasts: ['temo', 'dare_demo']
  },
  {
    id: 'dare_demo', label: 'kérdőszó + でも', jlpt: 'N3', category: 'degree', lesson: 'l40',
    summary: 'Kivétel nélkül: „bármi, bárki, bármikor".',
    structure: '何でも / だれでも / いつでも / どこでも',
    explanation: 'A kérdőszó és a でも együtt mindent felölel. Tagadással a も használatos: 何も.',
    examples: [
      { jp: '<ruby>何<rt>なん</rt></ruby>でも<ruby>食<rt>た</rt></ruby>べます。',
        kana: 'なんでもたべます。', romaji: 'nandemo tabemasu.', hu: 'Bármit megeszem.',
        cloze: '___BLANK___<ruby>食<rt>た</rt></ruby>べます。', clozeAnswer: 'なんでも',
        tokens: ['なんでも', 'たべます', '。'] },
      { jp: 'いつでも<ruby>来<rt>き</rt></ruby>てください。',
        kana: 'いつでもきてください。', romaji: 'itsudemo kite kudasai.', hu: 'Bármikor jöjjön nyugodtan!',
        cloze: '___BLANK___<ruby>来<rt>き</rt></ruby>てください。', clozeAnswer: 'いつでも',
        tokens: ['いつでも', 'きてください', '。'] }
    ],
    contrasts: ['daremo_imasen', 'demo_example']
  },
  {
    id: 'hajimeru_owaru', label: '〜はじめます・〜おわります', jlpt: 'N3', category: 'state', lesson: 'l40',
    summary: 'Egy cselekvés kezdete vagy vége.',
    structure: 'ます-tő + はじめます / おわります',
    explanation: 'Összetett ige: 読みはじめます (olvasni kezd), 読みおわります (befejezi az olvasást).',
    examples: [
      { jp: '<ruby>先月<rt>せんげつ</rt></ruby>からピアノを<ruby>習<rt>なら</rt></ruby>いはじめました。',
        kana: 'せんげつからピアノをならいはじめました。', romaji: 'sengetsu kara piano o naraihajimemashita.', hu: 'Múlt hónapban kezdtem zongorázni tanulni.',
        cloze: '<ruby>先月<rt>せんげつ</rt></ruby>からピアノを<ruby>習<rt>なら</rt></ruby>い___BLANK___。', clozeAnswer: 'はじめました',
        tokens: ['せんげつから', 'ピアノを', 'ならいはじめました', '。'] },
      { jp: 'やっとレポートを<ruby>書<rt>か</rt></ruby>きおわりました。',
        kana: 'やっとレポートをかきおわりました。', romaji: 'yatto repooto o kakiowarimashita.', hu: 'Végre megírtam a beszámolót.',
        cloze: 'やっとレポートを<ruby>書<rt>か</rt></ruby>き___BLANK___。', clozeAnswer: 'おわりました',
        tokens: ['やっと', 'レポートを', 'かきおわりました', '。'] }
    ],
    contrasts: ['dasu', 'tsuzukeru']
  },
  {
    id: 'dasu', label: '〜だします', jlpt: 'N3', category: 'state', lesson: 'l40',
    summary: 'Hirtelen kezdet: „egyszer csak elkezd".',
    structure: 'ます-tő + だします',
    explanation: 'Váratlanul, szándék nélkül induló cselekvés: 泣きだします, 降りだします.',
    examples: [
      { jp: '<ruby>急<rt>きゅう</rt></ruby>に<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りだしました。',
        kana: 'きゅうにあめがふりだしました。', romaji: 'kyuu ni ame ga furidashimashita.', hu: 'Hirtelen eleredt az eső.',
        cloze: '<ruby>急<rt>きゅう</rt></ruby>に<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>り___BLANK___。', clozeAnswer: 'だしました',
        tokens: ['きゅうに', 'あめが', 'ふりだしました', '。'] },
      { jp: '<ruby>赤<rt>あか</rt></ruby>ちゃんが<ruby>泣<rt>な</rt></ruby>きだしました。',
        kana: 'あかちゃんがなきだしました。', romaji: 'akachan ga nakidashimashita.', hu: 'A kisbaba sírni kezdett.',
        cloze: '<ruby>赤<rt>あか</rt></ruby>ちゃんが<ruby>泣<rt>な</rt></ruby>き___BLANK___。', clozeAnswer: 'だしました',
        tokens: ['あかちゃんが', 'なきだしました', '。'] }
    ],
    contrasts: ['hajimeru_owaru']
  },
  {
    id: 'tsuzukeru', label: '〜つづけます', jlpt: 'N3', category: 'state', lesson: 'l40',
    summary: 'Folytatás megszakítás nélkül: „tovább csinál".',
    structure: 'ます-tő + つづけます',
    explanation: 'A cselekvés hosszan, megszakítás nélkül tart.',
    examples: [
      { jp: '<ruby>三時間<rt>さんじかん</rt></ruby><ruby>歩<rt>ある</rt></ruby>きつづけました。',
        kana: 'さんじかんあるきつづけました。', romaji: 'sanjikan arukitsuzukemashita.', hu: 'Három órán át megállás nélkül gyalogoltam.',
        cloze: '<ruby>三時間<rt>さんじかん</rt></ruby><ruby>歩<rt>ある</rt></ruby>き___BLANK___。', clozeAnswer: 'つづけました',
        tokens: ['さんじかん', 'あるきつづけました', '。'] },
      { jp: 'これからも<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しつづけます。',
        kana: 'これからもにほんごをべんきょうしつづけます。', romaji: 'kore kara mo nihongo o benkyou shitsuzukemasu.', hu: 'Ezután is tovább tanulok japánul.',
        cloze: 'これからも<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>し___BLANK___。', clozeAnswer: 'つづけます',
        tokens: ['これからも', 'にほんごを', 'べんきょう', 'しつづけます', '。'] }
    ],
    contrasts: ['hajimeru_owaru', 'te_iku_change']
  }
  /* @feltöltés:vég */
];
