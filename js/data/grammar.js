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
  }
];
