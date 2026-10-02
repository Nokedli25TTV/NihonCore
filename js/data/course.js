/* ====================================================
   NIHONCORE — Leckék (a tanulási út magyarázó oldalai)
   ----------------------------------------------------
   A pages/lesson.html?id=<lecke-id> ebből rajzolja ki a leckét
   (app.js: initLessonPage). A tanulási út a Dekiru 1 tankönyv leckéinek
   témáit és sorrendjét követi; a magyarázatok és a példamondatok
   SAJÁT megfogalmazások (a könyv szövege nem szerepel itt).

   NIHONCORE_COURSE: leckék tömbje.
     id      a lecke kulcsa (a tanulási út lépése ezzel hivatkozik rá: lesson.html?id=l1)
     no      a lecke sorszáma a könyvben
     book    melyik kötet
     title   a lecke címe · lead: egy mondat arról, mire leszel képes
     cando   2–4 „a lecke végére…" pont
     points  nyelvtani pontok, sorrendben:
       title    a szerkezet (japánul vagy röviden magyarul)
       sub      mit jelent, egy-két szóban
       pattern  a minta képlete
       body     magyarázat (rövid HTML: <b>, <i>)
       examples [{ jp, romaji, hu }]
       tip      (nem kötelező) tipikus buktató
     quiz    ellenőrző kérdések: { q, jp?, a, wrong: [3 rossz válasz], why }
             (leckénként 10; egy kör ezekből és a példamondatokból készített
              fordítós kérdésekből áll össze — app.js: initLessonPage)
             · q: a kérdés magyarul · jp: a hiányos japán mondat (＿ a hiány)
             · a: a helyes válasz · why: egy mondat, miért az

   Japán szöveg jelölése:
     · az 1–4. leckében kana, szóközökkel tagolva (ahogy a kezdő olvas)
     · az 5. leckétől kanji, az olvasat {漢字|かな} formában: ebből lesz a
       furigana a képernyőn ÉS a felolvasott kana-szöveg
   ==================================================== */

const NIHONCORE_COURSE = [

  /* ── 1. lecke ─────────────────────────────────────── */
  {
    id: 'l1', no: 1, book: 'Dekiru 1',
    title: 'Bemutatkozás',
    lead: 'Az első mondataid: megmondod, ki vagy és mivel foglalkozol, és vissza is kérdezel.',
    cando: [
      'Bemutatkozol, és megérted, ha más bemutatkozik.',
      'Megmondod, mi a foglalkozásod, honnan jöttél, hány éves vagy.',
      'Egyszerű kérdést teszel fel, és válaszolsz rá.'
    ],
    points: [
      {
        title: '〜は 〜です', sub: '„A az B"',
        pattern: 'A は B です',
        body: 'A japán mondat végén áll az állítmány. A <b>は</b> megjelöli, miről beszélünk, a <b>です</b> pedig udvariassá és lezárttá teszi a mondatot. Névelő nincs, és a „vagyok / vagy / van" sem kell külön: a „Diák vagyok" három szó.',
        examples: [
          { jp: 'わたしは がくせいです。', romaji: 'Watashi wa gakusei desu.', hu: 'Diák vagyok.' },
          { jp: 'やまださんは せんせいです。', romaji: 'Yamada-san wa sensei desu.', hu: 'Jamada úr tanár.' },
          { jp: 'わたしは ハンガリーじんです。', romaji: 'Watashi wa Hangarī-jin desu.', hu: 'Magyar vagyok.' }
        ],
        tip: 'A は partikulát a „ha" jelével írjuk, de „wa"-nak ejtjük. A さん megszólítás másoknak jár: a saját nevedhez soha ne tedd hozzá.'
      },
      {
        title: '〜の', sub: 'birtok és hovatartozás',
        pattern: 'A の B',
        body: 'A <b>の</b> két főnevet köt össze: az első pontosítja a másodikat. Magyarul ez sokszor birtokos szerkezet vagy jelző: „a barátom könyve", „egyetemi hallgató". A sorrend a magyar birtokos szerkezetével egyezik: elöl a birtokos.',
        examples: [
          { jp: 'わたしの なまえは アンナです。', romaji: 'Watashi no namae wa Anna desu.', hu: 'A nevem Anna.' },
          { jp: 'にほんごの せんせいです。', romaji: 'Nihongo no sensei desu.', hu: 'Japántanár.' },
          { jp: 'だいがくの がくせいです。', romaji: 'Daigaku no gakusei desu.', hu: 'Egyetemi hallgató vagyok.' }
        ]
      },
      {
        title: '〜か', sub: 'kérdés',
        pattern: 'A は B ですか',
        body: 'Kérdéshez nem kell megfordítani a szórendet: a mondat végére <b>か</b> kerül, és kérdőjel helyett is ez áll. A válasz <b>はい</b> (igen) vagy <b>いいえ</b> (nem).',
        examples: [
          { jp: 'たなかさんは がくせいですか。', romaji: 'Tanaka-san wa gakusei desu ka.', hu: 'Tanaka diák?' },
          { jp: 'はい、がくせいです。', romaji: 'Hai, gakusei desu.', hu: 'Igen, diák.' },
          { jp: 'いいえ、かいしゃいんです。', romaji: 'Iie, kaishain desu.', hu: 'Nem, irodai dolgozó.' }
        ]
      },
      {
        title: 'なんですか', sub: '„mi?"',
        pattern: 'A は なんですか',
        body: 'A <b>なん</b> (mi?) oda kerül, ahová a válasz: a です elé. Így kérdezel rá a névre, a hobbira, a foglalkozásra.',
        examples: [
          { jp: 'おなまえは なんですか。', romaji: 'O-namae wa nan desu ka.', hu: 'Mi a neve?' },
          { jp: 'しゅみは なんですか。', romaji: 'Shumi wa nan desu ka.', hu: 'Mi a hobbid?' },
          { jp: 'しゅみは おんがくです。', romaji: 'Shumi wa ongaku desu.', hu: 'A hobbim a zene.' }
        ]
      },
      {
        title: '〜も', sub: '„is"',
        pattern: 'A も B です',
        body: 'Ha valamire ugyanaz igaz, mint az előzőre, a は helyére <b>も</b> kerül. A kettő egyszerre nem állhat.',
        examples: [
          { jp: 'わたしは がくせいです。リーさんも がくせいです。', romaji: 'Watashi wa gakusei desu. Rī-san mo gakusei desu.', hu: 'Diák vagyok. Lí is diák.' },
          { jp: 'わたしも ハンガリーじんです。', romaji: 'Watashi mo Hangarī-jin desu.', hu: 'Én is magyar vagyok.' }
        ]
      },
      {
        title: '〜さい・〜ねんせい', sub: 'életkor és évfolyam',
        pattern: 'szám + さい · szám + ねんせい',
        body: 'Az életkort a szám után álló <b>さい</b> jelzi, az évfolyamot a <b>ねんせい</b>. Néhány szám kiejtése ilyenkor megváltozik: 1 éves <i>issai</i>, 8 éves <i>hassai</i>, 10 éves <i>jussai</i>; a 20 éves pedig rendhagyóan <i>hatachi</i>.',
        examples: [
          { jp: 'わたしは じゅうはっさいです。', romaji: 'Watashi wa jūhassai desu.', hu: 'Tizennyolc éves vagyok.' },
          { jp: 'いもうとは にねんせいです。', romaji: 'Imōto wa ninensei desu.', hu: 'A húgom másodikos.' },
          { jp: 'なんさいですか。', romaji: 'Nansai desu ka.', hu: 'Hány éves?' }
        ]
      }
    ],
    quiz: [
      { q: '„Diák vagyok." Melyik partikula hiányzik?', jp: 'わたし＿ がくせいです。', a: 'は', wrong: ['の', 'か', 'を'],
        why: 'A は jelöli, miről szól a mondat: „ami engem illet, diák".' },
      { q: '„A nevem Anna." Melyik partikula hiányzik?', jp: 'わたし＿ なまえは アンナです。', a: 'の', wrong: ['は', 'も', 'か'],
        why: 'A の köti össze a birtokost a birtokkal: わたしの なまえ = az én nevem.' },
      { q: 'Hogyan lesz kérdés ebből: たなかさんは せんせいです。', a: 'たなかさんは せんせいですか。',
        wrong: ['たなかさんか せんせいです。', 'か たなかさんは せんせいです。', 'たなかさんは か せんせいです。'],
        why: 'A szórend nem változik, a か a mondat legvégére kerül.' },
      { q: '„Lí is diák." Melyik partikula hiányzik?', jp: 'リーさん＿ がくせいです。', a: 'も', wrong: ['は', 'の', 'か'],
        why: 'Az „is" a も: a は helyére lép.' },
      { q: 'Mit jelent: しゅみは なんですか。', a: 'Mi a hobbid?', wrong: ['Ez a hobbid?', 'A hobbim a zene.', 'Kinek a hobbija?'],
        why: 'A なん = „mi?", és a です elé kerül, oda, ahová a válasz.' },
      { q: 'Tanaka diák? A válasz: „Nem, irodai dolgozó." Melyik szóval kezded?', a: 'いいえ',
        wrong: ['はい', 'も', 'なん'],
        why: 'Tagadó válasz elején いいえ áll.' },
      { q: 'Hogyan mondod: „Tizennyolc éves vagyok."', a: 'わたしは じゅうはっさいです。',
        wrong: ['わたしは じゅうはちねんせいです。', 'わたしの じゅうはっさいです。', 'わたしは じゅうはっさいですか。'],
        why: 'Életkor: szám + さい; a 8 kiejtése itt はっ.' },
      { q: 'Melyik mondat helytelen?', a: 'わたしは アンナさんです。',
        wrong: ['わたしは アンナです。', 'やまださんは せんせいです。', 'リーさんも がくせいです。'],
        why: 'A さん másoknak jár: a saját nevedhez nem teszed hozzá.' },
      { q: '„Japántanár." Melyik partikula hiányzik?', jp: 'にほんご＿ せんせいです。', a: 'の',
        wrong: ['は', 'も', 'か'],
        why: 'A の köti a pontosító főnevet a másikhoz: a japán nyelv tanára.' },
      { q: 'Mit jelent: いもうとは にねんせいです。', a: 'A húgom másodikos.',
        wrong: ['A húgom kétéves.', 'Két húgom van.', 'A húgom a második gyerek.'],
        why: 'ねんせい = évfolyam; a kétéves にさい lenne.' }
    ]
  },

  /* ── 2. lecke ─────────────────────────────────────── */
  {
    id: 'l2', no: 2, book: 'Dekiru 1',
    title: 'Ez, az, amaz',
    lead: 'Rámutatsz dolgokra és helyekre, megkérdezed, mi micsoda és kié, és tagadni is megtanulsz.',
    cando: [
      'Megnevezed, ami előtted van, és megkérdezed, mi az.',
      'Megkérdezed, hol van valami, és kié.',
      'Udvariasan tagadsz.'
    ],
    points: [
      {
        title: 'これ・それ・あれ', sub: 'ez, az, amaz',
        pattern: 'これ / それ / あれ は 〜です',
        body: 'A japán három távolságot különböztet meg. <b>これ</b>: ami nálam van. <b>それ</b>: ami nálad van. <b>あれ</b>: ami mindkettőnktől távol van. Ezek önállóan állnak, főnév nélkül. A hozzájuk tartozó kérdőszó: <b>どれ</b> (melyik?).',
        examples: [
          { jp: 'これは ほんです。', romaji: 'Kore wa hon desu.', hu: 'Ez könyv.' },
          { jp: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', hu: 'Az (ott nálad) micsoda?' },
          { jp: 'あれは がっこうです。', romaji: 'Are wa gakkō desu.', hu: 'Az ott iskola.' }
        ]
      },
      {
        title: 'この・その・あの', sub: 'ez a …, az a …',
        pattern: 'この / その / あの + főnév',
        body: 'Ha a főnevet is kimondod, a <b>この・その・あの</b> alakot használod, és utána rögtön a főnév jön. Önállóan nem állhatnak. Kérdőszó: <b>どの</b> (melyik …?).',
        examples: [
          { jp: 'この かばんは わたしのです。', romaji: 'Kono kaban wa watashi no desu.', hu: 'Ez a táska az enyém.' },
          { jp: 'その ほんは にほんごの ほんです。', romaji: 'Sono hon wa nihongo no hon desu.', hu: 'Az a könyv japánkönyv.' },
          { jp: 'あの ひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', hu: 'Ki az az ember ott?' }
        ],
        tip: 'これ = „ez" önállóan · この = „ez a …" főnév előtt. A kettő felcserélése a leggyakoribb kezdő hiba.'
      },
      {
        title: 'ここ・そこ・あそこ', sub: 'itt, ott, amott',
        pattern: 'ここ / そこ / あそこ は 〜です',
        body: 'Ugyanez a hármas helyekre: <b>ここ</b> (itt, nálam), <b>そこ</b> (ott, nálad), <b>あそこ</b> (amott). Kérdőszó: <b>どこ</b> (hol?). A „hol van X?" legegyszerűbben: X は どこですか。',
        examples: [
          { jp: 'ここは だいどころです。', romaji: 'Koko wa daidokoro desu.', hu: 'Ez itt a konyha.' },
          { jp: 'トイレは どこですか。', romaji: 'Toire wa doko desu ka.', hu: 'Hol van a mosdó?' },
          { jp: 'あそこです。', romaji: 'Asoko desu.', hu: 'Ott van.' }
        ]
      },
      {
        title: 'だれの', sub: 'kié?',
        pattern: 'だれの 〜ですか · 〜の です',
        body: 'A <b>だれ</b> (ki?) és a の együtt: <b>だれの</b> = kié. A válaszban a főnevet el is hagyhatod: <b>わたしのです</b> = „az enyém".',
        examples: [
          { jp: 'これは だれの かさですか。', romaji: 'Kore wa dare no kasa desu ka.', hu: 'Kié ez az esernyő?' },
          { jp: 'ははのです。', romaji: 'Haha no desu.', hu: 'Az anyámé.' },
          { jp: 'それは せんせいの くるまです。', romaji: 'Sore wa sensei no kuruma desu.', hu: 'Az a tanár autója.' }
        ]
      },
      {
        title: '〜じゃありません', sub: 'tagadás',
        pattern: 'A は B じゃありません',
        body: 'A です tagadása <b>じゃありません</b>; írásban és hivatalosabb helyzetben <b>ではありません</b>. A mondat többi része nem változik.',
        examples: [
          { jp: 'これは わたしの かばんじゃありません。', romaji: 'Kore wa watashi no kaban ja arimasen.', hu: 'Ez nem az én táskám.' },
          { jp: 'いいえ、がくせいじゃありません。', romaji: 'Iie, gakusei ja arimasen.', hu: 'Nem, nem vagyok diák.' },
          { jp: 'ここは きょうしつではありません。', romaji: 'Koko wa kyōshitsu dewa arimasen.', hu: 'Ez itt nem tanterem.' }
        ]
      }
    ],
    quiz: [
      { q: 'A tárgy a beszélgetőtársad kezében van. Melyik szóval mutatsz rá?', a: 'それ', wrong: ['これ', 'あれ', 'どれ'],
        why: 'A それ arra vonatkozik, ami a hallgatóhoz van közel.' },
      { q: '„Ez a táska az enyém." Mi hiányzik?', jp: '＿ かばんは わたしのです。', a: 'この', wrong: ['これ', 'ここ', 'どの'],
        why: 'Főnév előtt この áll; a これ csak önállóan.' },
      { q: '„Hol van a mosdó?" Mi hiányzik?', jp: 'トイレは ＿ ですか。', a: 'どこ', wrong: ['だれ', 'なん', 'どれ'],
        why: 'Helyre a どこ kérdez.' },
      { q: 'Mit jelent: これは だれの かさですか。', a: 'Kié ez az esernyő?', wrong: ['Ki ez?', 'Hol van az esernyő?', 'Ez esernyő?'],
        why: 'だれの = „kié", utána a birtok: かさ (esernyő).' },
      { q: 'Melyik mondat jelenti: „Ez nem könyv."', a: 'これは ほんじゃありません。',
        wrong: ['これは ほんですか。', 'これも ほんです。', 'これは ほんのです。'],
        why: 'A です tagadása じゃありません.' },
      { q: 'Egy épület mindkettőtöktől távol áll. Hogyan kérdezed meg, mi az?', a: 'あれは なんですか。',
        wrong: ['これは なんですか。', 'それは なんですか。', 'あの なんですか。'],
        why: 'Ami mindkét beszélőtől távol van: あれ.' },
      { q: '„Az anyámé." Melyik partikula hiányzik?', jp: 'はは＿です。', a: 'の',
        wrong: ['は', 'も', 'が'],
        why: 'A birtokos の után a főnév elhagyható: ははのです.' },
      { q: 'Melyik mondat helyes?', a: 'その ほんは わたしのです。',
        wrong: ['それ ほんは わたしのです。', 'そこ ほんは わたしのです。', 'その は わたしのです。'],
        why: 'Főnév előtt その áll; a それ csak önállóan.' },
      { q: '„Ki az az ember ott?" Mi hiányzik?', jp: 'あの ひとは ＿ですか。', a: 'だれ',
        wrong: ['どこ', 'なん', 'どれ'],
        why: 'Személyre a だれ kérdez.' },
      { q: 'Mit jelent: ここは きょうしつではありません。', a: 'Ez itt nem tanterem.',
        wrong: ['Ez itt a tanterem.', 'Hol van a tanterem?', 'Ez az én tantermem.'],
        why: 'A ではありません a です tagadása (írott, hivatalosabb alak).' }
    ]
  },

  /* ── 3. lecke ─────────────────────────────────────── */
  {
    id: 'l3', no: 3, book: 'Dekiru 1',
    title: 'Mi hol van?',
    lead: 'Elmondod, mi van a városodban és a szobádban, ki van otthon, és hányan vagytok a családban.',
    cando: [
      'Megmondod, mi hol található.',
      'Különbséget teszel élő és élettelen között.',
      'Bemutatod a családodat.'
    ],
    points: [
      {
        title: 'あります・います', sub: '„van"',
        pattern: 'hely に + valami が あります / います',
        body: 'A létezést két ige fejezi ki. <b>あります</b>: tárgyak, növények, épületek, vagyis ami nem mozog magától. <b>います</b>: emberek és állatok. A helyet a <b>に</b> jelöli, azt pedig, ami ott van, a <b>が</b>.',
        examples: [
          { jp: 'へやに つくえが あります。', romaji: 'Heya ni tsukue ga arimasu.', hu: 'A szobában van egy asztal.' },
          { jp: 'こうえんに いぬが います。', romaji: 'Kōen ni inu ga imasu.', hu: 'A parkban van egy kutya.' },
          { jp: 'きょうしつに がくせいが います。', romaji: 'Kyōshitsu ni gakusei ga imasu.', hu: 'A tanteremben diákok vannak.' }
        ],
        tip: 'Nem a méret vagy a fontosság dönt: a hal és a bogár is います, a fa és a busz あります.'
      },
      {
        title: '〜は 〜に あります', sub: '„X ott van"',
        pattern: 'valami は + hely に あります / います',
        body: 'Ha már ismert dologról mondod meg, hol van, az kerül előre は-val. A tartalom ugyanaz, a hangsúly más: az előző minta azt mondja meg, <i>mi</i> van ott; ez azt, <i>hol</i> van a dolog.',
        examples: [
          { jp: 'ぎんこうは えきの まえに あります。', romaji: 'Ginkō wa eki no mae ni arimasu.', hu: 'A bank az állomás előtt van.' },
          { jp: 'ねこは いすの したに います。', romaji: 'Neko wa isu no shita ni imasu.', hu: 'A macska a szék alatt van.' },
          { jp: 'ははは うちに います。', romaji: 'Haha wa uchi ni imasu.', hu: 'Anyám otthon van.' }
        ]
      },
      {
        title: 'うえ・した・まえ…', sub: 'helyviszonyok',
        pattern: 'főnév の うえ / した / まえ / うしろ / なか / となり に',
        body: 'A helyet jelölő szavak japánul főnevek: a viszonyítási pont után <b>の</b>-val kapcsolódnak, és utánuk jön a に. うえ = fölött, rajta · した = alatt · まえ = előtt · うしろ = mögött · なか = benne · となり = mellett.',
        examples: [
          { jp: 'つくえの うえに ほんが あります。', romaji: 'Tsukue no ue ni hon ga arimasu.', hu: 'Az asztalon van egy könyv.' },
          { jp: 'かばんの なかに さいふが あります。', romaji: 'Kaban no naka ni saifu ga arimasu.', hu: 'A táskában van a pénztárca.' },
          { jp: 'がっこうの となりに こうえんが あります。', romaji: 'Gakkō no tonari ni kōen ga arimasu.', hu: 'Az iskola mellett park van.' }
        ]
      },
      {
        title: 'ありません・いません', sub: '„nincs" · senki, semmi',
        pattern: '〜が ありません / いません · だれも / なにも + tagadás',
        body: 'A tagadás <b>ありません</b>, illetve <b>いません</b>. A „senki, semmi, sehol" úgy épül, hogy a kérdőszó után <b>も</b> áll, és az ige tagadó: <b>だれも いません</b>. Állító mondatban か kerül a kérdőszó után: <b>だれか います</b> (van valaki).',
        examples: [
          { jp: 'この まちに えいがかんが ありません。', romaji: 'Kono machi ni eigakan ga arimasen.', hu: 'Ebben a városban nincs mozi.' },
          { jp: 'へやに だれも いません。', romaji: 'Heya ni dare mo imasen.', hu: 'Senki sincs a szobában.' },
          { jp: 'はこの なかに なにか あります。', romaji: 'Hako no naka ni nanika arimasu.', hu: 'Van valami a dobozban.' }
        ]
      },
      {
        title: 'と・や', sub: 'felsorolás',
        pattern: 'A と B · A や B',
        body: 'A <b>と</b> lezárt felsorolás: pontosan ezek. A <b>や</b> nyitott: „például ezek, és még más is".',
        examples: [
          { jp: 'つくえの うえに ほんと ペンが あります。', romaji: 'Tsukue no ue ni hon to pen ga arimasu.', hu: 'Az asztalon egy könyv és egy toll van.' },
          { jp: 'まちに ぎんこうや スーパーが あります。', romaji: 'Machi ni ginkō ya sūpā ga arimasu.', hu: 'A városban van bank, szupermarket meg egyebek.' }
        ]
      },
      {
        title: 'かぞく・〜にん', sub: 'család: hányan vagytok?',
        pattern: 'かぞくは 〜にん です · 〜が 〜にん います',
        body: 'Az embereket a <b>〜にん</b> számlálóval számoljuk; az első kettő rendhagyó: <b>ひとり</b> (egy fő), <b>ふたり</b> (két fő). A saját családtagjaidra más szó jár, mint a máséira: はは / おかあさん (az anyám / az ön édesanyja), ちち / おとうさん.',
        examples: [
          { jp: 'かぞくは よにんです。', romaji: 'Kazoku wa yonin desu.', hu: 'Négyen vagyunk a családban.' },
          { jp: 'あにが ひとり います。', romaji: 'Ani ga hitori imasu.', hu: 'Egy bátyám van.' },
          { jp: 'いもうとが ふたり います。', romaji: 'Imōto ga futari imasu.', hu: 'Két húgom van.' }
        ]
      }
    ],
    quiz: [
      { q: '„A parkban van egy kutya." Mi hiányzik?', jp: 'こうえんに いぬが ＿。', a: 'います', wrong: ['あります', 'です', 'ありません'],
        why: 'Élőlényre います jár.' },
      { q: '„Az asztalon van egy könyv." Mi hiányzik?', jp: 'つくえの ＿に ほんが あります。', a: 'うえ', wrong: ['した', 'まえ', 'なか'],
        why: 'うえ = fölött, rajta.' },
      { q: '„Senki sincs a szobában." Melyik partikula hiányzik?', jp: 'へやに だれ＿ いません。', a: 'も', wrong: ['か', 'が', 'は'],
        why: 'Kérdőszó + も + tagadó ige = „senki, semmi".' },
      { q: 'Melyik mondat helyes? (A bank épület.)', a: 'ぎんこうは えきの まえに あります。',
        wrong: ['ぎんこうは えきの まえに います。', 'ぎんこうは えきの まえを あります。', 'ぎんこうを えきの まえに あります。'],
        why: 'Épületre あります jár, a helyet pedig に jelöli.' },
      { q: '„Két húgom van." Mi hiányzik?', jp: 'いもうとが ＿ います。', a: 'ふたり', wrong: ['ににん', 'ふたつ', 'にさい'],
        why: 'Két főre a rendhagyó ふたり alak jár.' },
      { q: '„A szobában van egy asztal." Mi hiányzik?', jp: 'へやに つくえが ＿。', a: 'あります',
        wrong: ['います', 'です', 'いません'],
        why: 'Tárgyra あります jár.' },
      { q: '„A macska a szék alatt van." Melyik partikula hiányzik?', jp: 'ねこは いすの した＿ います。', a: 'に',
        wrong: ['で', 'を', 'が'],
        why: 'A létezés helyét a に jelöli.' },
      { q: 'Melyik felsorolás jelenti: „bank, szupermarket meg egyebek"?', a: 'ぎんこうや スーパー',
        wrong: ['ぎんこうと スーパー', 'ぎんこうも スーパー', 'ぎんこうの スーパー'],
        why: 'A や nyitott felsorolás: „például ezek".' },
      { q: '„Van valaki a szobában." Melyik partikula hiányzik?', jp: 'へやに だれ＿ います。', a: 'か',
        wrong: ['も', 'を', 'の'],
        why: 'Kérdőszó + か = „valaki, valami"; も-val és tagadással „senki".' },
      { q: 'Mit jelent: かぞくは よにんです。', a: 'Négyen vagyunk a családban.',
        wrong: ['Négy családom van.', 'A családom négyéves.', 'A negyedik gyerek vagyok.'],
        why: 'A 〜にん embereket számol: よにん = négy fő.' }
    ]
  },

  /* ── 4. lecke ─────────────────────────────────────── */
  {
    id: 'l4', no: 4, book: 'Dekiru 1',
    title: 'Vásárlás és idő',
    lead: 'Boltban kérsz valamit, megszámolod, megkérdezed a nyitvatartást, és megmondod, hány óra van.',
    cando: [
      'Kérsz valamit a boltban, darabszámmal.',
      'Megmondod az időt és a hét napját.',
      'Megkérdezed, mettől meddig tart valami.'
    ],
    points: [
      {
        title: '〜を ください', sub: '„kérek egy…"',
        pattern: 'dolog を (mennyiség) ください',
        body: 'A boltban ennyi elég: megnevezed a dolgot, <b>を</b>, majd <b>ください</b>. A mennyiség a を után, a ください elé kerül, partikula nélkül.',
        examples: [
          { jp: 'これを ください。', romaji: 'Kore o kudasai.', hu: 'Ezt kérem.' },
          { jp: 'みずを ください。', romaji: 'Mizu o kudasai.', hu: 'Vizet kérek.' },
          { jp: 'りんごを みっつ ください。', romaji: 'Ringo o mittsu kudasai.', hu: 'Három almát kérek.' }
        ]
      },
      {
        title: 'つ・ほん・まい・さつ', sub: 'számlálók',
        pattern: 'szám + számláló',
        body: 'Japánul a darabszámhoz számlálószó kell, és azt a tárgy alakja dönti el. <b>〜つ</b>: általános (ひとつ, ふたつ, みっつ… tízig). <b>〜ほん</b>: hosszú, vékony tárgy (toll, üveg). <b>〜まい</b>: lapos (papír, póló, jegy). <b>〜さつ</b>: könyv, füzet. A ほん kiejtése változik: いっぽん, にほん, さんぼん.',
        examples: [
          { jp: 'ペンを にほん ください。', romaji: 'Pen o nihon kudasai.', hu: 'Két tollat kérek.' },
          { jp: 'きってを さんまい ください。', romaji: 'Kitte o sanmai kudasai.', hu: 'Három bélyeget kérek.' },
          { jp: 'ノートを いっさつ ください。', romaji: 'Nōto o issatsu kudasai.', hu: 'Egy füzetet kérek.' }
        ],
        tip: 'Ha nem jut eszedbe a számláló, a 〜つ sorral tízig szinte mindent megszámolhatsz.'
      },
      {
        title: 'なんの・どこの', sub: 'milyen? honnan való?',
        pattern: 'なんの 〜 · どこの 〜 ですか',
        body: 'A の itt is pontosít. <b>なんの ざっし</b>: miről szóló, milyen magazin. <b>どこの とけい</b>: melyik országban vagy cégnél készült óra.',
        examples: [
          { jp: 'それは なんの ざっしですか。', romaji: 'Sore wa nan no zasshi desu ka.', hu: 'Az milyen magazin?' },
          { jp: 'くるまの ざっしです。', romaji: 'Kuruma no zasshi desu.', hu: 'Autós magazin.' },
          { jp: 'これは どこの とけいですか。', romaji: 'Kore wa doko no tokei desu ka.', hu: 'Ez hol készült óra?' }
        ]
      },
      {
        title: '〜じ', sub: 'hány óra van?',
        pattern: 'いま 〜じ です · 〜じはん',
        body: 'Az órát a szám után álló <b>じ</b> jelzi, a felet a <b>はん</b>. Három óra olvasata rendhagyó: <b>よじ</b> (4), <b>しちじ</b> (7), <b>くじ</b> (9). Kérdőszó: <b>なんじ</b>.',
        examples: [
          { jp: 'いま なんじですか。', romaji: 'Ima nanji desu ka.', hu: 'Hány óra van most?' },
          { jp: 'よじです。', romaji: 'Yoji desu.', hu: 'Négy óra van.' },
          { jp: 'くじはんです。', romaji: 'Kuji han desu.', hu: 'Fél tíz van.' }
        ]
      },
      {
        title: '〜ようび', sub: 'a hét napjai',
        pattern: '〜ようび です',
        body: 'A hét napjai mind <b>ようび</b>-re végződnek; az elejük sorban: げつ, か, すい, もく, きん, ど, にち. Kérdőszó: <b>なんようび</b>.',
        examples: [
          { jp: 'きょうは なんようびですか。', romaji: 'Kyō wa nan\'yōbi desu ka.', hu: 'Milyen nap van ma?' },
          { jp: 'きんようびです。', romaji: 'Kin\'yōbi desu.', hu: 'Péntek van.' },
          { jp: 'やすみは にちようびです。', romaji: 'Yasumi wa nichiyōbi desu.', hu: 'A szünnap vasárnap van.' }
        ]
      },
      {
        title: '〜から 〜まで', sub: 'mettől meddig',
        pattern: 'A から B まで',
        body: 'A <b>から</b> a kezdőpont (-tól), a <b>まで</b> a végpont (-ig): időre és helyre egyaránt. Külön is állhatnak.',
        examples: [
          { jp: 'ぎんこうは くじから さんじまでです。', romaji: 'Ginkō wa kuji kara sanji made desu.', hu: 'A bank kilenctől háromig van nyitva.' },
          { jp: 'がっこうは げつようびから きんようびまでです。', romaji: 'Gakkō wa getsuyōbi kara kin\'yōbi made desu.', hu: 'Iskola hétfőtől péntekig van.' },
          { jp: 'みせは なんじまでですか。', romaji: 'Mise wa nanji made desu ka.', hu: 'Meddig van nyitva a bolt?' }
        ]
      }
    ],
    quiz: [
      { q: '„Három almát kérek." Mi hiányzik?', jp: 'りんごを ＿ ください。', a: 'みっつ', wrong: ['さんまい', 'さんぼん', 'さんさつ'],
        why: 'Az almára az általános 〜つ sor jár: みっつ = három darab.' },
      { q: 'Melyik számlálóval számolod a bélyeget? (lapos tárgy)', a: '〜まい', wrong: ['〜ほん', '〜さつ', '〜にん'],
        why: 'Lapos, vékony tárgyakra 〜まい jár.' },
      { q: '„Négy óra van." Melyik a helyes olvasat?', a: 'よじです。', wrong: ['よんじです。', 'しじです。', 'よっつじです。'],
        why: 'A négy óra rendhagyó: よじ.' },
      { q: '„A bank kilenctől háromig van nyitva." Mi hiányzik?', jp: 'ぎんこうは くじ＿ さんじ＿です。', a: 'から … まで', wrong: ['まで … から', 'に … へ', 'と … も'],
        why: 'から = -tól, まで = -ig.' },
      { q: 'Mit jelent: ペンを にほん ください。', a: 'Két tollat kérek.', wrong: ['Japán tollat kérek.', 'Két könyvet kérek.', 'Egy tollat kérek.'],
        why: 'Itt a にほん = に + ほん, vagyis két darab hosszú tárgy.' },
      { q: '„Ezt kérem." Melyik partikula hiányzik?', jp: 'これ＿ ください。', a: 'を',
        wrong: ['に', 'で', 'と'],
        why: 'Amit kérsz, az を-t kap.' },
      { q: '„Egy füzetet kérek." Mi hiányzik?', jp: 'ノートを ＿ ください。', a: 'いっさつ',
        wrong: ['いっぽん', 'いちまい', 'ひとり'],
        why: 'Könyvre, füzetre 〜さつ jár: いっさつ.' },
      { q: '„Fél tíz van." Melyik a helyes?', a: 'くじはんです。',
        wrong: ['きゅうじはんです。', 'じゅうじはんです。', 'くじからです。'],
        why: 'A 9 óra rendhagyó: くじ; a fél: はん. A fél tíz = kilenc és fél.' },
      { q: '„Milyen nap van ma?" Mi hiányzik?', jp: 'きょうは ＿ですか。', a: 'なんようび',
        wrong: ['なんさい', 'だれ', 'どれ'],
        why: 'A hét napjára なんようび kérdez.' },
      { q: 'Mit jelent: みせは なんじまでですか。', a: 'Meddig van nyitva a bolt?',
        wrong: ['Mikor nyit a bolt?', 'Hol van a bolt?', 'Hány bolt van?'],
        why: 'まで = -ig; なんじまで = hány óráig.' }
    ]
  },

  /* ── 5. lecke ─────────────────────────────────────── */
  {
    id: 'l5', no: 5, book: 'Dekiru 1',
    title: 'Hová, mikor, mivel?',
    lead: 'Megjelennek az igék: elmondod, hová mész, mikor, mivel és kivel, jelenben és múltban.',
    cando: [
      'Elmondod a napirendedet.',
      'Megmondod, hol laksz, és hogyan jársz iskolába.',
      'Dátumot és időpontot mondasz.'
    ],
    points: [
      {
        title: '〜ます', sub: 'az udvarias igealak négy formája',
        pattern: '〜ます · 〜ません · 〜ました · 〜ませんでした',
        body: 'Az ige a mondat végén áll, és a végződése mutatja az időt, valamint azt, hogy állítasz vagy tagadsz. A japán jelen idő a jövőt és a szokást is kifejezi: <b>{行|い}きます</b> = megyek, menni fogok, járni szoktam.',
        examples: [
          { jp: '{毎日|まいにち}{学校|がっこう}へ{行|い}きます。', romaji: 'Mainichi gakkō e ikimasu.', hu: 'Minden nap iskolába megyek.' },
          { jp: 'きのう{図書館|としょかん}へ{行|い}きました。', romaji: 'Kinō toshokan e ikimashita.', hu: 'Tegnap könyvtárba mentem.' },
          { jp: '{日曜日|にちようび}は{学校|がっこう}へ{行|い}きません。', romaji: 'Nichiyōbi wa gakkō e ikimasen.', hu: 'Vasárnap nem megyek iskolába.' },
          { jp: '{先週|せんしゅう}はどこへも{行|い}きませんでした。', romaji: 'Senshū wa doko e mo ikimasen deshita.', hu: 'Múlt héten sehová sem mentem.' }
        ]
      },
      {
        title: '〜へ・〜に 行きます', sub: 'hová',
        pattern: 'hely へ / に + {行|い}きます · {来|き}ます · {帰|かえ}ります',
        body: 'A mozgás célját a <b>へ</b> (kiejtve: <i>e</i>) vagy a <b>に</b> jelöli. A három alapige: {行|い}きます (megy), {来|き}ます (jön), {帰|かえ}ります (hazamegy). A kiindulópontot a <b>から</b> jelöli.',
        examples: [
          { jp: '{来週|らいしゅう}{日本|にほん}へ{行|い}きます。', romaji: 'Raishū Nihon e ikimasu.', hu: 'Jövő héten Japánba megyek.' },
          { jp: '{七時|しちじ}にうちへ{帰|かえ}ります。', romaji: 'Shichiji ni uchi e kaerimasu.', hu: 'Hétkor megyek haza.' },
          { jp: '{友|とも}だちはペーチから{来|き}ました。', romaji: 'Tomodachi wa Pēchi kara kimashita.', hu: 'A barátom Pécsről jött.' }
        ]
      },
      {
        title: '〜で 行きます', sub: 'mivel',
        pattern: 'jármű で + {行|い}きます',
        body: 'Az eszközt, így a közlekedési eszközt is a <b>で</b> jelöli. Kivétel a gyaloglás: <b>{歩|ある}いて</b>, で nélkül.',
        examples: [
          { jp: 'バスで{学校|がっこう}へ{行|い}きます。', romaji: 'Basu de gakkō e ikimasu.', hu: 'Busszal megyek iskolába.' },
          { jp: '{電車|でんしゃ}で{来|き}ました。', romaji: 'Densha de kimashita.', hu: 'Vonattal jöttem.' },
          { jp: '{歩|ある}いて{帰|かえ}ります。', romaji: 'Aruite kaerimasu.', hu: 'Gyalog megyek haza.' }
        ]
      },
      {
        title: '〜と', sub: 'kivel',
        pattern: 'személy と (いっしょに) + ige',
        body: 'A <b>と</b> itt társat jelöl: „valakivel". Az <b>いっしょに</b> (együtt) nyomatékosít. Egyedül: <b>{一人|ひとり}で</b>.',
        examples: [
          { jp: '{友|とも}だちと{映画館|えいがかん}へ{行|い}きます。', romaji: 'Tomodachi to eigakan e ikimasu.', hu: 'A barátommal moziba megyek.' },
          { jp: '{母|はは}といっしょに{来|き}ました。', romaji: 'Haha to issho ni kimashita.', hu: 'Anyámmal együtt jöttem.' },
          { jp: '{一人|ひとり}で{行|い}きました。', romaji: 'Hitori de ikimashita.', hu: 'Egyedül mentem.' }
        ]
      },
      {
        title: '〜に', sub: 'mikor',
        pattern: 'időpont に + ige',
        body: 'A számmal kifejezhető időpont (óra, dátum, a hét napja) után <b>に</b> áll. A „viszonylagos" időszavak után nem: {今日|きょう} (ma), {明日|あした} (holnap), {来週|らいしゅう} (jövő héten), {毎日|まいにち} (minden nap).',
        examples: [
          { jp: '{八時|はちじ}に{学校|がっこう}へ{行|い}きます。', romaji: 'Hachiji ni gakkō e ikimasu.', hu: 'Nyolckor megyek iskolába.' },
          { jp: '{土曜日|どようび}に{友|とも}だちが{来|き}ます。', romaji: 'Doyōbi ni tomodachi ga kimasu.', hu: 'Szombaton jön a barátom.' },
          { jp: '{明日|あした}{東京|とうきょう}へ{行|い}きます。', romaji: 'Ashita Tōkyō e ikimasu.', hu: 'Holnap Tokióba megyek.' }
        ],
        tip: '{明日|あした} に {行|い}きます ✗ — a „holnap", „ma", „jövő héten" után nincs に.'
      },
      {
        title: '〜月〜日', sub: 'dátum',
        pattern: 'szám + {月|がつ} · szám + {日|にち}',
        body: 'A hónap a szám + <b>月</b> (がつ), a nap a szám + <b>日</b> (にち). Az 1–10. és a 20. nap olvasata rendhagyó: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか, はつか. A hónapoknál a 4 (しがつ), a 7 (しちがつ) és a 9 (くがつ) tér el.',
        examples: [
          { jp: '{誕生日|たんじょうび}は{四月|しがつ}{三日|みっか}です。', romaji: 'Tanjōbi wa shigatsu mikka desu.', hu: 'A születésnapom április harmadika.' },
          { jp: '{九月|くがつ}{一日|ついたち}に{学校|がっこう}が{始|はじ}まります。', romaji: 'Kugatsu tsuitachi ni gakkō ga hajimarimasu.', hu: 'Szeptember elsején kezdődik az iskola.' },
          { jp: '{今日|きょう}は{何月|なんがつ}{何日|なんにち}ですか。', romaji: 'Kyō wa nangatsu nannichi desu ka.', hu: 'Hányadika van ma?' }
        ]
      },
      {
        title: '〜時間・〜回', sub: 'mennyi ideig, hányszor',
        pattern: 'szám + {時間|じかん} · időszak に + szám + {回|かい}',
        body: 'Az időtartam <b>〜時間</b> (じかん, óra hosszat) vagy <b>〜分</b> (perc). A gyakoriság: az időszak után に, aztán a szám + <b>回</b> (かい): „hetente kétszer".',
        examples: [
          { jp: 'うちから{学校|がっこう}まで{一時間|いちじかん}かかります。', romaji: 'Uchi kara gakkō made ichijikan kakarimasu.', hu: 'Otthonról az iskoláig egy óra az út.' },
          { jp: '{週|しゅう}に{二回|にかい}{図書館|としょかん}へ{行|い}きます。', romaji: 'Shū ni nikai toshokan e ikimasu.', hu: 'Hetente kétszer megyek könyvtárba.' },
          { jp: '{一日|いちにち}に{三回|さんかい}{食|た}べます。', romaji: 'Ichinichi ni sankai tabemasu.', hu: 'Naponta háromszor eszem.' }
        ]
      }
    ],
    quiz: [
      { q: '„Tegnap könyvtárba mentem." Mi hiányzik?', jp: 'きのう{図書館|としょかん}へ＿。', a: '{行|い}きました', wrong: ['{行|い}きます', '{行|い}きません', '{行|い}きませんでした'],
        why: 'Múlt idő, állítás: 〜ました.' },
      { q: '„Busszal megyek." Melyik partikula hiányzik?', jp: 'バス＿{行|い}きます。', a: 'で', wrong: ['に', 'へ', 'と'],
        why: 'Az eszközt a で jelöli.' },
      { q: 'Melyik időszó után NEM áll に?', a: '{明日|あした}', wrong: ['{八時|はちじ}', '{土曜日|どようび}', '{四月|しがつ}{三日|みっか}'],
        why: 'A viszonylagos időszavak (ma, holnap, jövő héten) után nincs に.' },
      { q: '„A barátommal megyek." Melyik partikula hiányzik?', jp: '{友|とも}だち＿{行|い}きます。', a: 'と', wrong: ['で', 'を', 'が'],
        why: 'A társat a と jelöli.' },
      { q: 'Hogyan olvasod: 四月三日', a: 'しがつ みっか', wrong: ['よんがつ さんにち', 'しがつ さんにち', 'よんがつ みっか'],
        why: 'Április: しがつ; harmadika: みっか. Mindkettő rendhagyó.' },
      { q: '„Vasárnap nem megyek iskolába." Mi hiányzik?', jp: '{日曜日|にちようび}は{学校|がっこう}へ＿。', a: '{行|い}きません',
        wrong: ['{行|い}きます', '{行|い}きました', '{行|い}きませんでした'],
        why: 'Jelen vagy jövő idő, tagadás: 〜ません.' },
      { q: '„A barátom Pécsről jött." Melyik partikula hiányzik?', jp: '{友|とも}だちはペーチ＿{来|き}ました。', a: 'から',
        wrong: ['まで', 'へ', 'を'],
        why: 'A kiindulópontot a から jelöli.' },
      { q: '„Nyolckor megyek iskolába." Melyik partikula hiányzik?', jp: '{八時|はちじ}＿{学校|がっこう}へ{行|い}きます。', a: 'に',
        wrong: ['で', 'を', 'と'],
        why: 'Számmal kifejezett időpont után に áll.' },
      { q: 'Hogyan mondod: „Gyalog megyek haza."', a: '{歩|ある}いて{帰|かえ}ります。',
        wrong: ['{歩|ある}いてで{帰|かえ}ります。', 'バスで{帰|かえ}ります。', '{歩|ある}いて{来|き}ました。'],
        why: 'A gyaloglás {歩|ある}いて, で nélkül; hazamenni: {帰|かえ}ります.' },
      { q: '„Hetente kétszer megyek könyvtárba." Mi hiányzik?', jp: '{週|しゅう}に＿{図書館|としょかん}へ{行|い}きます。', a: '{二回|にかい}',
        wrong: ['{二時間|にじかん}', '{二日|ふつか}', '{二人|ふたり}'],
        why: 'A gyakoriság: időszak に + szám + {回|かい}.' }
    ]
  },

  /* ── 6. lecke ─────────────────────────────────────── */
  {
    id: 'l6', no: 6, book: 'Dekiru 1',
    title: 'Mindennapok',
    lead: 'Elmondod, mit csinálsz egy átlagos napon és hol, és programot javasolsz valakinek.',
    cando: [
      'Beszélsz a napi teendőidről.',
      'Meghívsz valakit, és megérted, ha téged hívnak.',
      'Megmondod, miért mész valahová.'
    ],
    points: [
      {
        title: '〜を', sub: 'a cselekvés tárgya',
        pattern: 'tárgy を + ige',
        body: 'Amire a cselekvés irányul (mit eszel, mit olvasol), azt a <b>を</b> jelöli (kiejtve: <i>o</i>). A magyar -t rag megfelelője.',
        examples: [
          { jp: '{朝|あさ}パンを{食|た}べます。', romaji: 'Asa pan o tabemasu.', hu: 'Reggel kenyeret eszem.' },
          { jp: '{毎晩|まいばん}{本|ほん}を{読|よ}みます。', romaji: 'Maiban hon o yomimasu.', hu: 'Minden este könyvet olvasok.' },
          { jp: '{何|なに}を{飲|の}みますか。', romaji: 'Nani o nomimasu ka.', hu: 'Mit iszol?' }
        ]
      },
      {
        title: '〜で', sub: 'a cselekvés helye',
        pattern: 'hely で + cselekvés',
        body: 'Ahol valamit <i>csinálsz</i>, azt a <b>で</b> jelöli. Ne keverd a に-vel: a に a létezés helye (あります, います) és a mozgás célja.',
        examples: [
          { jp: '{図書館|としょかん}で{勉強|べんきょう}します。', romaji: 'Toshokan de benkyō shimasu.', hu: 'A könyvtárban tanulok.' },
          { jp: 'うちで{晩|ばん}ごはんを{食|た}べます。', romaji: 'Uchi de bangohan o tabemasu.', hu: 'Otthon vacsorázom.' },
          { jp: 'どこで{買|か}いましたか。', romaji: 'Doko de kaimashita ka.', hu: 'Hol vetted?' }
        ],
        tip: '{図書館|としょかん}<b>に</b> います = a könyvtárban vagyok · {図書館|としょかん}<b>で</b> {読|よ}みます = a könyvtárban olvasok.'
      },
      {
        title: '〜に 行きます', sub: 'miért megyek oda',
        pattern: 'hely へ + (ige ます nélkül / főnév) に {行|い}きます',
        body: 'A mozgás célját az ige <b>ます nélküli alakja + に</b> fejezi ki: {買|か}います → <b>{買|か}いに</b> {行|い}きます (megyek vásárolni). Cselekvést jelentő főnév is állhat itt: {買|か}い{物|もの}に, {散歩|さんぽ}に.',
        examples: [
          { jp: 'デパートへかばんを{買|か}いに{行|い}きます。', romaji: 'Depāto e kaban o kai ni ikimasu.', hu: 'Az áruházba megyek táskát venni.' },
          { jp: '{友|とも}だちのうちへ{遊|あそ}びに{行|い}きました。', romaji: 'Tomodachi no uchi e asobi ni ikimashita.', hu: 'Elmentem a barátomhoz vendégségbe.' },
          { jp: '{公園|こうえん}へ{散歩|さんぽ}に{行|い}きます。', romaji: 'Kōen e sanpo ni ikimasu.', hu: 'A parkba megyek sétálni.' }
        ]
      },
      {
        title: '〜ませんか', sub: 'meghívás',
        pattern: 'ige + ませんか',
        body: 'A tagadó kérdés udvarias meghívás: „nem …-nánk?" Azt jelzi, hogy a döntést a másikra bízod.',
        examples: [
          { jp: 'いっしょに{映画|えいが}を{見|み}ませんか。', romaji: 'Issho ni eiga o mimasen ka.', hu: 'Nem néznénk meg együtt egy filmet?' },
          { jp: 'コーヒーを{飲|の}みませんか。', romaji: 'Kōhī o nomimasen ka.', hu: 'Nem iszol egy kávét?' }
        ]
      },
      {
        title: '〜ましょう', sub: 'javaslat, beleegyezés',
        pattern: 'ige + ましょう',
        body: 'A <b>ましょう</b> közös cselekvésre szólít: „…-junk!". Gyakran ez a válasz a meghívásra. Ha nemet mondasz, elég ennyi: <b>すみません、ちょっと…</b> (elnézést, most nem igazán).',
        examples: [
          { jp: 'ええ、{見|み}ましょう。', romaji: 'Ee, mimashō.', hu: 'Jó, nézzük meg!' },
          { jp: '{駅|えき}で{会|あ}いましょう。', romaji: 'Eki de aimashō.', hu: 'Találkozzunk az állomáson!' },
          { jp: '{少|すこ}し{休|やす}みましょう。', romaji: 'Sukoshi yasumimashō.', hu: 'Pihenjünk egy kicsit!' }
        ]
      }
    ],
    quiz: [
      { q: '„Könyvet olvasok." Melyik partikula hiányzik?', jp: '{本|ほん}＿{読|よ}みます。', a: 'を', wrong: ['が', 'に', 'で'],
        why: 'A cselekvés tárgyát a を jelöli.' },
      { q: '„A könyvtárban tanulok." Melyik partikula hiányzik?', jp: '{図書館|としょかん}＿{勉強|べんきょう}します。', a: 'で', wrong: ['に', 'へ', 'を'],
        why: 'A cselekvés helye で; a に a létezés helye lenne.' },
      { q: '„Megyek táskát venni." Mi hiányzik?', jp: 'かばんを＿{行|い}きます。', a: '{買|か}いに', wrong: ['{買|か}いますに', '{買|か}いで', '{買|か}いを'],
        why: 'A cél: az ige ます nélküli alakja + に.' },
      { q: 'Mit jelent: いっしょに{映画|えいが}を{見|み}ませんか。', a: 'Nem néznénk meg együtt egy filmet?',
        wrong: ['Nem nézek filmet.', 'Együtt néztünk filmet.', 'Nem láttad a filmet?'],
        why: 'A 〜ませんか meghívás, nem tagadás.' },
      { q: 'Hogyan mondod: „Találkozzunk az állomáson!"', a: '{駅|えき}で{会|あ}いましょう。',
        wrong: ['{駅|えき}に{会|あ}いません。', '{駅|えき}を{会|あ}います。', '{駅|えき}で{会|あ}いましたか。'],
        why: 'Közös cselekvésre a 〜ましょう szólít; a hely で.' },
      { q: '„Mit iszol?" Melyik partikula hiányzik?', jp: '{何|なに}＿{飲|の}みますか。', a: 'を',
        wrong: ['で', 'に', 'へ'],
        why: 'A cselekvés tárgya を; a kérdőszó is megkapja.' },
      { q: 'Melyik mondat jelenti: „A könyvtárban vagyok."', a: '{図書館|としょかん}にいます。',
        wrong: ['{図書館|としょかん}でいます。', '{図書館|としょかん}をいます。', '{図書館|としょかん}へいます。'],
        why: 'A létezés helye に; a で a cselekvés helye.' },
      { q: 'Válasz a meghívásra: „Jó, igyunk!"', a: 'ええ、{飲|の}みましょう。',
        wrong: ['ええ、{飲|の}みません。', 'いいえ、{飲|の}みましょう。', 'ええ、{飲|の}みましたか。'],
        why: 'Beleegyezés: ええ + 〜ましょう.' },
      { q: '„A parkba megyek sétálni." Melyik partikula hiányzik?', jp: '{公園|こうえん}へ{散歩|さんぽ}＿{行|い}きます。', a: 'に',
        wrong: ['を', 'が', 'と'],
        why: 'A mozgás célja: főnév vagy ます nélküli ige + に.' },
      { q: 'Mit jelent: うちで{晩|ばん}ごはんを{食|た}べます。', a: 'Otthon vacsorázom.',
        wrong: ['Hazamegyek vacsorázni.', 'Otthon van a vacsora.', 'Nem vacsorázom otthon.'],
        why: 'で = a cselekvés helye, を = a tárgy.' }
    ]
  },

  /* ── 7. lecke ─────────────────────────────────────── */
  {
    id: 'l7', no: 7, book: 'Dekiru 1',
    title: 'Mit szeretsz?',
    lead: 'Elmondod, mit szeretsz és mit nem, megindokolod, és megmondod, milyen gyakran csinálsz valamit.',
    cando: [
      'Beszélsz arról, mit szeretsz és mit nem.',
      'Megkérdezed és megmondod, miért.',
      'Elmondod, milyen gyakran csinálsz valamit.'
    ],
    points: [
      {
        title: '〜が 好きです', sub: 'szeretem, nem szeretem',
        pattern: 'A は B が {好|す}きです · きらいです',
        body: 'A <b>{好|す}き</b> és a <b>きらい</b> japánul melléknév, nem ige: „számomra a zene kedvelt". Ezért amit szeretsz, az <b>が</b>-t kap, nem を-t. Tagadás: {好|す}きじゃありません. A きらい erős szó; finomabb így: あまり {好|す}きじゃありません.',
        examples: [
          { jp: 'わたしは{音楽|おんがく}が{好|す}きです。', romaji: 'Watashi wa ongaku ga suki desu.', hu: 'Szeretem a zenét.' },
          { jp: '{魚|さかな}はあまり{好|す}きじゃありません。', romaji: 'Sakana wa amari suki ja arimasen.', hu: 'A halat nem nagyon szeretem.' },
          { jp: 'どんなスポーツが{好|す}きですか。', romaji: 'Donna supōtsu ga suki desu ka.', hu: 'Milyen sportot szeretsz?' }
        ]
      },
      {
        title: 'どうして・〜から', sub: 'miért? mert…',
        pattern: 'どうしてですか。 — 〜から。',
        body: 'Az okra a <b>どうして</b> kérdez. A válaszban az okot kifejező mondat végére <b>から</b> kerül: előbb az ok, utána a „mert". Két tagmondatot is összeköt: ok + から、következmény.',
        examples: [
          { jp: 'どうして{行|い}きませんか。', romaji: 'Dōshite ikimasen ka.', hu: 'Miért nem mész el?' },
          { jp: '{時間|じかん}がありませんから。', romaji: 'Jikan ga arimasen kara.', hu: 'Mert nincs időm.' },
          { jp: '{日本|にほん}が{好|す}きですから、{日本語|にほんご}を{勉強|べんきょう}します。', romaji: 'Nihon ga suki desu kara, nihongo o benkyō shimasu.', hu: 'Szeretem Japánt, ezért tanulok japánul.' }
        ],
        tip: 'Ez a から nem ugyanaz, mint a „-tól" ({九時|くじ}から): az főnév után áll, ez mondat után.'
      },
      {
        title: '〜は…が、〜は…', sub: 'szembeállítás',
        pattern: 'A は 〜が、B は 〜',
        body: 'A tagmondat végi <b>が</b> „de"-t jelent. Ha két dolgot szembeállítasz, mindkettő <b>は</b>-t kap, akkor is, ha amúgy が vagy を járna neki.',
        examples: [
          { jp: '{肉|にく}は{好|す}きですが、{魚|さかな}は{好|す}きじゃありません。', romaji: 'Niku wa suki desu ga, sakana wa suki ja arimasen.', hu: 'A húst szeretem, de a halat nem.' },
          { jp: 'コーヒーは{飲|の}みますが、お{茶|ちゃ}は{飲|の}みません。', romaji: 'Kōhī wa nomimasu ga, ocha wa nomimasen.', hu: 'Kávét iszom, de teát nem.' }
        ]
      },
      {
        title: 'よく・ときどき・あまり・ぜんぜん', sub: 'milyen gyakran',
        pattern: 'よく / ときどき + 〜ます · あまり / ぜんぜん + 〜ません',
        body: 'A gyakoriságot jelölő szó az ige elé kerül. A <b>よく</b> (gyakran) és a <b>ときどき</b> (néha) állító igével áll; az <b>あまり</b> (nem nagyon) és a <b>ぜんぜん</b> (egyáltalán nem) mindig tagadóval.',
        examples: [
          { jp: 'よく{映画|えいが}を{見|み}ます。', romaji: 'Yoku eiga o mimasu.', hu: 'Gyakran nézek filmet.' },
          { jp: 'ときどき{料理|りょうり}をします。', romaji: 'Tokidoki ryōri o shimasu.', hu: 'Néha főzök.' },
          { jp: 'テレビはあまり{見|み}ません。', romaji: 'Terebi wa amari mimasen.', hu: 'Tévét nem nagyon nézek.' },
          { jp: 'お{酒|さけ}はぜんぜん{飲|の}みません。', romaji: 'Osake wa zenzen nomimasen.', hu: 'Alkoholt egyáltalán nem iszom.' }
        ]
      }
    ],
    quiz: [
      { q: '„Szeretem a zenét." Melyik partikula hiányzik?', jp: '{音楽|おんがく}＿{好|す}きです。', a: 'が', wrong: ['を', 'に', 'で'],
        why: 'A {好|す}き melléknév, ezért a tárgya が-t kap.' },
      { q: '„Mert nincs időm." Mi hiányzik?', jp: '{時間|じかん}がありません＿。', a: 'から', wrong: ['まで', 'か', 'も'],
        why: 'Az ok mondata után から áll.' },
      { q: 'Melyik mondat helyes?', a: 'テレビはあまり{見|み}ません。',
        wrong: ['テレビはあまり{見|み}ます。', 'テレビはぜんぜん{見|み}ます。', 'テレビはよく{見|み}ませんです。'],
        why: 'Az あまり és a ぜんぜん mindig tagadó igével jár.' },
      { q: '„A húst szeretem, de a halat nem." Mi hiányzik?', jp: '{肉|にく}は{好|す}きです＿、{魚|さかな}は{好|す}きじゃありません。', a: 'が', wrong: ['から', 'と', 'も'],
        why: 'A tagmondat végi が = „de".' },
      { q: 'Mit jelent: ときどき{料理|りょうり}をします。', a: 'Néha főzök.', wrong: ['Gyakran főzök.', 'Nem nagyon főzök.', 'Soha nem főzök.'],
        why: 'ときどき = néha.' },
      { q: '„Milyen sportot szeretsz?" Mi hiányzik?', jp: '＿スポーツが{好|す}きですか。', a: 'どんな',
        wrong: ['どうして', 'だれ', 'どこ'],
        why: 'Főnév előtt „milyen": どんな.' },
      { q: '„Miért nem mész el?" Mi hiányzik?', jp: '＿{行|い}きませんか。', a: 'どうして',
        wrong: ['どんな', 'だれの', 'なんの'],
        why: 'Az okra どうして kérdez.' },
      { q: 'Melyik mondat jelenti: „Alkoholt egyáltalán nem iszom."', a: 'お{酒|さけ}はぜんぜん{飲|の}みません。',
        wrong: ['お{酒|さけ}はぜんぜん{飲|の}みます。', 'お{酒|さけ}はよく{飲|の}みます。', 'お{酒|さけ}はときどき{飲|の}みます。'],
        why: 'ぜんぜん + tagadó ige = egyáltalán nem.' },
      { q: '„A halat nem nagyon szeretem." Mi hiányzik?', jp: '{魚|さかな}は＿{好|す}きじゃありません。', a: 'あまり',
        wrong: ['よく', 'ときどき', 'どんな'],
        why: 'Tagadással az あまり jelenti: „nem nagyon".' },
      { q: 'Mit jelent: {日本|にほん}が{好|す}きですから、{日本語|にほんご}を{勉強|べんきょう}します。', a: 'Szeretem Japánt, ezért tanulok japánul.',
        wrong: ['Japánul tanulok, de nem szeretem Japánt.', 'Japánból jöttem, és japánul tanulok.', 'Szeretnék Japánban tanulni.'],
        why: 'ok + から、következmény: „mert…, ezért…".' }
    ]
  },

  /* ── 8. lecke ─────────────────────────────────────── */
  {
    id: 'l8', no: 8, book: 'Dekiru 1',
    title: 'Milyen?',
    lead: 'Leírod, milyen egy hely vagy az idő, elmondod, mit szeretnél csinálni, és segítséget ajánlasz.',
    cando: [
      'Egyszerű szavakkal leírsz helyeket és az időjárást.',
      'Megmondod, mit szeretnél csinálni.',
      'Felajánlod a segítségedet.'
    ],
    points: [
      {
        title: 'い és な', sub: 'a két melléknév-fajta',
        pattern: 'い-melléknév + főnév · な-melléknév + な + főnév',
        body: 'Az <b>い-melléknevek</b> い-re végződnek, és közvetlenül a főnév elé állnak: {高|たか}い {山|やま}. A <b>な-melléknevek</b> és a főnév közé <b>な</b> kerül: {静|しず}かな {町|まち}. Néhány な-melléknév is い-re végződik, ezeket külön meg kell jegyezni: きれい (szép, tiszta), 有名 (ゆうめい, híres), きらい.',
        examples: [
          { jp: '{高|たか}い{山|やま}です。', romaji: 'Takai yama desu.', hu: 'Magas hegy.' },
          { jp: '{静|しず}かな{町|まち}です。', romaji: 'Shizuka na machi desu.', hu: 'Csendes város.' },
          { jp: 'きれいな{花|はな}ですね。', romaji: 'Kirei na hana desu ne.', hu: 'Szép virág, ugye?' }
        ]
      },
      {
        title: 'どんな・どう', sub: 'milyen?',
        pattern: 'どんな + főnév ですか · 〜は どうですか',
        body: 'A <b>どんな</b> főnév előtt kérdez („milyen város?"), a <b>どう</b> állítmányként („milyen, hogy tetszik?"). Állítmányként a melléknév a です elé kerül; a な-melléknév ilyenkor な nélkül.',
        examples: [
          { jp: 'ブダペストはどんな{町|まち}ですか。', romaji: 'Budapesuto wa donna machi desu ka.', hu: 'Milyen város Budapest?' },
          { jp: 'にぎやかな{町|まち}です。', romaji: 'Nigiyaka na machi desu.', hu: 'Nyüzsgő város.' },
          { jp: '{日本語|にほんご}はどうですか。', romaji: 'Nihongo wa dō desu ka.', hu: 'Milyen a japán nyelv?' },
          { jp: 'おもしろいです。', romaji: 'Omoshiroi desu.', hu: 'Érdekes.' }
        ]
      },
      {
        title: '〜くないです・〜じゃありません', sub: 'tagadás',
        pattern: 'い → くないです · な-melléknév + じゃありません',
        body: 'Az い-melléknév tagadásakor a végső い helyére <b>くない</b> kerül: {高|たか}い → {高|たか}くないです. A な-melléknév úgy tagad, mint a főnév: {静|しず}かじゃありません. Az いい (jó) rendhagyó: <b>よくないです</b>.',
        examples: [
          { jp: 'この{本|ほん}は{高|たか}くないです。', romaji: 'Kono hon wa takakunai desu.', hu: 'Ez a könyv nem drága.' },
          { jp: 'この{町|まち}は{静|しず}かじゃありません。', romaji: 'Kono machi wa shizuka ja arimasen.', hu: 'Ez a város nem csendes.' },
          { jp: '{今日|きょう}は{天気|てんき}がよくないです。', romaji: 'Kyō wa tenki ga yokunai desu.', hu: 'Ma nem jó az idő.' }
        ],
        tip: 'A {高|たか}い két dolgot jelent: „magas" és „drága". A szövegkörnyezet dönt.'
      },
      {
        title: 'とても・少し・あまり・ぜんぜん', sub: 'mennyire',
        pattern: 'とても / {少|すこ}し + állítás · あまり / ぜんぜん + tagadás',
        body: 'A fokozó szó a melléknév elé kerül. Itt is igaz: az <b>あまり</b> és a <b>ぜんぜん</b> tagadó alakkal jár.',
        examples: [
          { jp: '{今日|きょう}はとても{暑|あつ}いです。', romaji: 'Kyō wa totemo atsui desu.', hu: 'Ma nagyon meleg van.' },
          { jp: '{少|すこ}し{寒|さむ}いです。', romaji: 'Sukoshi samui desu.', hu: 'Kicsit hideg van.' },
          { jp: 'あまり{遠|とお}くないです。', romaji: 'Amari tōkunai desu.', hu: 'Nincs nagyon messze.' }
        ]
      },
      {
        title: '〜たいです', sub: 'szeretnék…',
        pattern: 'ige ます nélkül + たいです',
        body: 'A saját vágyadat az ige <b>ます nélküli alakja + たい</b> fejezi ki: {行|い}きます → {行|い}きたいです. A たい úgy viselkedik, mint egy い-melléknév, tehát a tagadása <b>たくないです</b>. Más ember vágyára így nem használjuk.',
        examples: [
          { jp: '{日本|にほん}へ{行|い}きたいです。', romaji: 'Nihon e ikitai desu.', hu: 'Japánba szeretnék menni.' },
          { jp: '{水|みず}が{飲|の}みたいです。', romaji: 'Mizu ga nomitai desu.', hu: 'Vizet szeretnék inni.' },
          { jp: '{今日|きょう}は{何|なに}も{食|た}べたくないです。', romaji: 'Kyō wa nani mo tabetakunai desu.', hu: 'Ma semmit sem szeretnék enni.' }
        ]
      },
      {
        title: '〜たいんですが・〜ましょうか', sub: 'kérés felvezetése, felajánlás',
        pattern: '〜たいんですが… · 〜ましょうか',
        body: 'A <b>〜たいんですが</b> udvarias felvezetés: elmondod, mit szeretnél, és a másiktól segítséget vársz. A <b>〜ましょうか</b> a párja: felajánlod, hogy megteszel valamit („…-jak?").',
        examples: [
          { jp: '{駅|えき}へ{行|い}きたいんですが…', romaji: 'Eki e ikitai n desu ga…', hu: 'Az állomásra szeretnék menni… (merre van?)' },
          { jp: '{窓|まど}を{開|あ}けましょうか。', romaji: 'Mado o akemashō ka.', hu: 'Kinyissam az ablakot?' },
          { jp: '{手伝|てつだ}いましょうか。', romaji: 'Tetsudaimashō ka.', hu: 'Segítsek?' }
        ]
      }
    ],
    quiz: [
      { q: '„Csendes város." Mi hiányzik?', jp: '{静|しず}か＿{町|まち}です。', a: 'な', wrong: ['い', 'の', 'に'],
        why: 'な-melléknév és főnév közé な kerül.' },
      { q: 'Mi a 高い tagadása?', a: '{高|たか}くないです', wrong: ['{高|たか}いじゃありません', '{高|たか}じゃないです', '{高|たか}いくないです'],
        why: 'Az い helyére くない kerül.' },
      { q: '„Japánba szeretnék menni." Mi hiányzik?', jp: '{日本|にほん}へ＿です。', a: '{行|い}きたい', wrong: ['{行|い}きますたい', '{行|い}くたい', '{行|い}きましょう'],
        why: 'ます nélküli alak + たい: {行|い}き + たい.' },
      { q: 'Melyik mondat helyes?', a: 'あまり{遠|とお}くないです。',
        wrong: ['あまり{遠|とお}いです。', 'ぜんぜん{遠|とお}いです。', 'あまり{遠|とお}いくないです。'],
        why: 'Az あまり tagadó alakkal jár.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けましょうか。', a: 'Kinyissam az ablakot?',
        wrong: ['Nyisd ki az ablakot!', 'Kinyitottam az ablakot.', 'Ki akarom nyitni az ablakot.'],
        why: 'A 〜ましょうか felajánlás: „megtegyem?"' },
      { q: '„Magas hegy." Mi hiányzik? (い-melléknév)', jp: '{高|たか}＿{山|やま}です。', a: 'い',
        wrong: ['な', 'の', 'く'],
        why: 'Az い-melléknév közvetlenül a főnév elé áll, な nélkül.' },
      { q: 'Mi a {静|しず}かです tagadása?', a: '{静|しず}かじゃありません',
        wrong: ['{静|しず}かくないです', '{静|しず}くないです', '{静|しず}かいじゃありません'],
        why: 'A な-melléknév úgy tagad, mint a főnév.' },
      { q: '„Ma nem jó az idő." Melyik a helyes?', a: '{今日|きょう}は{天気|てんき}がよくないです。',
        wrong: ['{今日|きょう}は{天気|てんき}がいくないです。', '{今日|きょう}は{天気|てんき}がいいじゃありません。', '{今日|きょう}は{天気|てんき}がよいくないです。'],
        why: 'Az いい rendhagyó: a tagadása よくないです.' },
      { q: '„Milyen város Budapest?" Mi hiányzik?', jp: 'ブダペストは＿{町|まち}ですか。', a: 'どんな',
        wrong: ['どう', 'だれ', 'どうして'],
        why: 'Főnév előtt どんな; állítmányként どう.' },
      { q: '„Ma semmit sem szeretnék enni." Mi hiányzik?', jp: '{今日|きょう}は{何|なに}も＿です。', a: '{食|た}べたくない',
        wrong: ['{食|た}べたい', '{食|た}べたいじゃない', '{食|た}べません'],
        why: 'A たい úgy tagad, mint az い-melléknév: たくない.' }
    ]
  },

  /* ── 9. lecke ─────────────────────────────────────── */
  {
    id: 'l9', no: 9, book: 'Dekiru 1',
    title: 'Milyen volt?',
    lead: 'Elmeséled, mi történt és milyen volt: múlt idő a főneveknél és a mellékneveknél, és megjelenik a て-alak, amivel mondatokat fűzöl össze.',
    cando: [
      'Elmeséled, mit csináltál a hétvégén vagy a szünetben.',
      'Megmondod, milyen volt valami.',
      'Több cselekvést egy mondatba fűzöl.'
    ],
    points: [
      {
        title: '〜でした', sub: 'volt (főnév)',
        pattern: 'A は B でした · B じゃありませんでした',
        body: 'A です múlt ideje <b>でした</b>, tagadva <b>じゃありませんでした</b>. Főnév és な-melléknév után ugyanígy.',
        examples: [
          { jp: 'きのうは{雨|あめ}でした。', romaji: 'Kinō wa ame deshita.', hu: 'Tegnap esős idő volt.' },
          { jp: '{先週|せんしゅう}は{休|やす}みじゃありませんでした。', romaji: 'Senshū wa yasumi ja arimasen deshita.', hu: 'Múlt héten nem volt szünet.' },
          { jp: '{旅行|りょこう}はどうでしたか。', romaji: 'Ryokō wa dō deshita ka.', hu: 'Milyen volt az utazás?' }
        ]
      },
      {
        title: '〜かったです', sub: 'い-melléknév múlt ideje',
        pattern: 'い → かったです · い → くなかったです',
        body: 'Az い-melléknév maga ragozódik: a végső い helyére <b>かった</b> kerül, a です változatlan marad. Tagadó múlt: <b>くなかったです</b>. Az いい múltja <b>よかったです</b>.',
        examples: [
          { jp: '{映画|えいが}はおもしろかったです。', romaji: 'Eiga wa omoshirokatta desu.', hu: 'A film érdekes volt.' },
          { jp: 'テストは{難|むずか}しくなかったです。', romaji: 'Tesuto wa muzukashikunakatta desu.', hu: 'A teszt nem volt nehéz.' },
          { jp: '{天気|てんき}がよかったです。', romaji: 'Tenki ga yokatta desu.', hu: 'Jó idő volt.' }
        ],
        tip: 'Az い-melléknévnél az időt a melléknév hordozza, nem a です: {高|たか}かったです ✓ · {高|たか}いでした ✗.'
      },
      {
        title: '〜でした (な)', sub: 'な-melléknév múlt ideje',
        pattern: 'な-melléknév + でした · じゃありませんでした',
        body: 'A な-melléknév úgy viselkedik, mint a főnév: múltja <b>でした</b>, tagadva <b>じゃありませんでした</b>.',
        examples: [
          { jp: '{町|まち}は{静|しず}かでした。', romaji: 'Machi wa shizuka deshita.', hu: 'A város csendes volt.' },
          { jp: 'ホテルはきれいじゃありませんでした。', romaji: 'Hoteru wa kirei ja arimasen deshita.', hu: 'A szálloda nem volt tiszta.' },
          { jp: 'パーティーはにぎやかでした。', romaji: 'Pātī wa nigiyaka deshita.', hu: 'A buli hangulatos, nyüzsgő volt.' }
        ]
      },
      {
        title: 'て-alak', sub: 'hogyan képezzük',
        pattern: '{食|た}べます → {食|た}べて · {書|か}きます → {書|か}いて · します → して',
        body: 'A <b>て-alak</b> összeköt, és rengeteg szerkezet alapja. A 2. csoport igéinél ({食|た}べます, {見|み}ます) a ます helyére egyszerűen て kerül. Az 1. csoportnál a ます előtti szótag dönt: <b>い・ち・り → って</b>, <b>み・び・に → んで</b>, <b>き → いて</b>, <b>ぎ → いで</b>, <b>し → して</b>. Rendhagyó: します → して, {来|き}ます → {来|き}て, {行|い}きます → {行|い}って.',
        examples: [
          { jp: '{朝|あさ}{起|お}きて、{顔|かお}を{洗|あら}います。', romaji: 'Asa okite, kao o araimasu.', hu: 'Reggel felkelek, és megmosom az arcom.' },
          { jp: '{本|ほん}を{読|よ}んで、{寝|ね}ました。', romaji: 'Hon o yonde, nemashita.', hu: 'Olvastam, aztán lefeküdtem.' },
          { jp: '{友|とも}だちに{会|あ}って、{映画|えいが}を{見|み}ました。', romaji: 'Tomodachi ni atte, eiga o mimashita.', hu: 'Találkoztam a barátommal, és megnéztünk egy filmet.' }
        ]
      },
      {
        title: '〜て、〜', sub: 'cselekvések egymás után',
        pattern: 'ige て-alak、+ következő cselekvés',
        body: 'Több cselekvést egymás után a て-alak fűz össze. Az idő és az udvariasság csak a mondat végén, az utolsó igén látszik.',
        examples: [
          { jp: '{駅|えき}へ{行|い}って、{切符|きっぷ}を{買|か}いました。', romaji: 'Eki e itte, kippu o kaimashita.', hu: 'Elmentem az állomásra, és jegyet vettem.' },
          { jp: 'うちへ{帰|かえ}って、{晩|ばん}ごはんを{食|た}べます。', romaji: 'Uchi e kaette, bangohan o tabemasu.', hu: 'Hazamegyek, és megvacsorázom.' },
          { jp: '{宿題|しゅくだい}をして、テレビを{見|み}ました。', romaji: 'Shukudai o shite, terebi o mimashita.', hu: 'Megcsináltam a leckét, aztán tévét néztem.' }
        ]
      },
      {
        title: '〜くて・〜で', sub: 'tulajdonságok összekötése',
        pattern: 'い → くて · な-melléknév / főnév + で',
        body: 'Két tulajdonságot is a て-alak köt össze: az い-melléknév végén <b>くて</b>, a な-melléknév és a főnév után <b>で</b> áll. Az いい itt is rendhagyó: <b>よくて</b>.',
        examples: [
          { jp: 'この{部屋|へや}は{広|ひろ}くて、{明|あか}るいです。', romaji: 'Kono heya wa hirokute, akarui desu.', hu: 'Ez a szoba tágas és világos.' },
          { jp: '{町|まち}は{静|しず}かで、きれいです。', romaji: 'Machi wa shizuka de, kirei desu.', hu: 'A város csendes és szép.' },
          { jp: 'このレストランは{安|やす}くて、おいしいです。', romaji: 'Kono resutoran wa yasukute, oishii desu.', hu: 'Ez az étterem olcsó és finom.' }
        ]
      }
    ],
    quiz: [
      { q: '„A film érdekes volt." Mi hiányzik?', jp: '{映画|えいが}は＿。', a: 'おもしろかったです', wrong: ['おもしろいでした', 'おもしろくてです', 'おもしろいかったです'],
        why: 'い-melléknév múltja: い → かった.' },
      { q: '„A város csendes volt." Mi hiányzik?', jp: '{町|まち}は{静|しず}か＿。', a: 'でした', wrong: ['かったです', 'くてです', 'いでした'],
        why: 'A な-melléknév múltja でした, mint a főnévé.' },
      { q: 'Mi az いいです múlt ideje?', a: 'よかったです', wrong: ['いかったです', 'いいでした', 'よいでした'],
        why: 'Az いい rendhagyó: よかった.' },
      { q: 'Mi a {書|か}きます て-alakja?', a: '{書|か}いて', wrong: ['{書|か}きて', '{書|か}って', '{書|か}んで'],
        why: 'き → いて.' },
      { q: 'Mi a {読|よ}みます て-alakja?', a: '{読|よ}んで', wrong: ['{読|よ}みて', '{読|よ}って', '{読|よ}いて'],
        why: 'み・び・に → んで.' },
      { q: 'Mi a {行|い}きます て-alakja?', a: '{行|い}って', wrong: ['{行|い}いて', '{行|い}きて', '{行|い}んで'],
        why: 'A {行|い}きます rendhagyó: {行|い}って (nem {行|い}いて).' },
      { q: '„Ez a szoba tágas és világos." Mi hiányzik?', jp: 'この{部屋|へや}は{広|ひろ}＿、{明|あか}るいです。', a: 'くて', wrong: ['で', 'いて', 'と'],
        why: 'い-melléknév összekötve: い → くて.' },
      { q: '„Hazamegyek, és megvacsorázom." Mi hiányzik?', jp: 'うちへ＿、{晩|ばん}ごはんを{食|た}べます。', a: '{帰|かえ}って', wrong: ['{帰|かえ}りて', '{帰|かえ}ります', '{帰|かえ}んで'],
        why: 'り → って; a て-alak köti össze a cselekvéseket.' },
      { q: 'Melyik mondat jelenti: „A teszt nem volt nehéz."', a: 'テストは{難|むずか}しくなかったです。',
        wrong: ['テストは{難|むずか}しいじゃありませんでした。', 'テストは{難|むずか}しくないでした。', 'テストは{難|むずか}しかったくないです。'],
        why: 'い-melléknév tagadó múltja: くなかったです.' },
      { q: 'Mit jelent: {旅行|りょこう}はどうでしたか。', a: 'Milyen volt az utazás?', wrong: ['Hová utaztál?', 'Mikor volt az utazás?', 'Milyen az utazás?'],
        why: 'どうでしたか = milyen volt?' }
    ]
  },

  /* ── 10. lecke ────────────────────────────────────── */
  {
    id: 'l10', no: 10, book: 'Dekiru 1',
    title: 'Melyik a jobb?',
    lead: 'Összehasonlítasz és választasz, megkérsz valakit valamire, és elmondod, mi után mit csinálsz.',
    cando: [
      'Összehasonlítasz két dolgot, és megmondod, melyik a legjobb.',
      'Udvariasan megkérsz valakit valamire.',
      'Megkérdezed, hogyan kell valamit használni.'
    ],
    points: [
      {
        title: 'A より B のほうが', sub: 'B …-bb, mint A',
        pattern: 'A より B のほうが + melléknév',
        body: 'A japánban nincs középfok: a melléknév alakja nem változik. A <b>より</b> jelöli, amihez hasonlítasz („-nál, -nél"), a <b>のほうが</b> pedig azt, ami „inkább" olyan. A より-s rész el is maradhat.',
        examples: [
          { jp: 'バスより{電車|でんしゃ}のほうが{速|はや}いです。', romaji: 'Basu yori densha no hō ga hayai desu.', hu: 'A vonat gyorsabb, mint a busz.' },
          { jp: '{犬|いぬ}より{猫|ねこ}のほうが{好|す}きです。', romaji: 'Inu yori neko no hō ga suki desu.', hu: 'A macskát jobban szeretem, mint a kutyát.' },
          { jp: '{今日|きょう}はきのうより{寒|さむ}いです。', romaji: 'Kyō wa kinō yori samui desu.', hu: 'Ma hidegebb van, mint tegnap.' }
        ]
      },
      {
        title: 'A と B と どちらが', sub: 'melyik …-bb?',
        pattern: 'A と B と どちらが + melléknév ですか',
        body: 'Két dolog közül a <b>どちら</b> (melyik) kérdez, akár tárgyról, akár emberről, akár helyről van szó. A válasz: <b>〜のほうが</b>… Ha mindegy: <b>どちらも</b> (mindkettő).',
        examples: [
          { jp: 'コーヒーと{紅茶|こうちゃ}とどちらが{好|す}きですか。', romaji: 'Kōhī to kōcha to dochira ga suki desu ka.', hu: 'A kávét vagy a teát szereted jobban?' },
          { jp: '{紅茶|こうちゃ}のほうが{好|す}きです。', romaji: 'Kōcha no hō ga suki desu.', hu: 'A teát szeretem jobban.' },
          { jp: 'どちらも{好|す}きです。', romaji: 'Dochira mo suki desu.', hu: 'Mindkettőt szeretem.' }
        ]
      },
      {
        title: '〜がいちばん', sub: 'a leg…-bb',
        pattern: '(〜の{中|なか}で) A がいちばん + melléknév',
        body: 'Három vagy több közül az <b>いちばん</b> fejezi ki a felsőfokot. A csoportot a <b>〜の{中|なか}で</b> adja meg; a kérdőszó dologra <b>{何|なに}</b>, helyre <b>どこ</b>, emberre <b>だれ</b>, időre <b>いつ</b>.',
        examples: [
          { jp: 'スポーツの{中|なか}で{何|なに}がいちばん{好|す}きですか。', romaji: 'Supōtsu no naka de nani ga ichiban suki desu ka.', hu: 'A sportok közül melyiket szereted a legjobban?' },
          { jp: 'サッカーがいちばん{好|す}きです。', romaji: 'Sakkā ga ichiban suki desu.', hu: 'A focit szeretem a legjobban.' },
          { jp: 'クラスでリーさんがいちばん{背|せ}が{高|たか}いです。', romaji: 'Kurasu de Rī-san ga ichiban se ga takai desu.', hu: 'Az osztályban Lí a legmagasabb.' }
        ]
      },
      {
        title: '〜てください', sub: 'kérés',
        pattern: 'ige て-alak + ください',
        body: 'A て-alak és a <b>ください</b> együtt udvarias kérés vagy utasítás: „kérem, …". Még udvariasabb a <b>〜てくださいませんか</b>.',
        examples: [
          { jp: 'ここに{名前|なまえ}を{書|か}いてください。', romaji: 'Koko ni namae o kaite kudasai.', hu: 'Kérem, írja ide a nevét.' },
          { jp: 'ちょっと{待|ま}ってください。', romaji: 'Chotto matte kudasai.', hu: 'Egy pillanat türelmet kérek.' },
          { jp: 'もう{一度|いちど}{言|い}ってください。', romaji: 'Mō ichido itte kudasai.', hu: 'Kérem, mondja még egyszer.' }
        ]
      },
      {
        title: '〜てから', sub: 'miután…',
        pattern: 'ige て-alak + から、…',
        body: 'A <b>てから</b> a sorrendet hangsúlyozza: az első cselekvés befejezése után jön a második.',
        examples: [
          { jp: '{手|て}を{洗|あら}ってから、{食|た}べます。', romaji: 'Te o aratte kara, tabemasu.', hu: 'Miután kezet mostam, eszem.' },
          { jp: '{宿題|しゅくだい}をしてから、{遊|あそ}びます。', romaji: 'Shukudai o shite kara, asobimasu.', hu: 'Miután megcsináltam a leckét, játszom.' },
          { jp: '{日本|にほん}へ{来|き}てから、{三年|さんねん}になります。', romaji: 'Nihon e kite kara, sannen ni narimasu.', hu: 'Három éve, hogy Japánba jöttem.' }
        ],
        tip: 'Ne keverd: {九時|くじ}<b>から</b> (kilenctől) főnév után áll, a て<b>から</b> ige て-alakja után.'
      },
      {
        title: '〜てみます', sub: 'kipróbálom',
        pattern: 'ige て-alak + みます',
        body: 'A <b>てみます</b> azt jelenti: megteszem, hogy lássam, milyen. Kóstolásra, kipróbálásra, felpróbálásra.',
        examples: [
          { jp: 'この{料理|りょうり}を{食|た}べてみます。', romaji: 'Kono ryōri o tabete mimasu.', hu: 'Megkóstolom ezt az ételt.' },
          { jp: '{使|つか}ってみてください。', romaji: 'Tsukatte mite kudasai.', hu: 'Próbálja ki!' },
          { jp: '{一度|いちど}{行|い}ってみたいです。', romaji: 'Ichido itte mitai desu.', hu: 'Egyszer szeretnék elmenni oda, megnézni, milyen.' }
        ]
      }
    ],
    quiz: [
      { q: '„A vonat gyorsabb, mint a busz." Mi hiányzik?', jp: 'バス＿{電車|でんしゃ}のほうが{速|はや}いです。', a: 'より', wrong: ['から', 'まで', 'と'],
        why: 'Amihez hasonlítasz, az より-t kap.' },
      { q: '„A kávét vagy a teát szereted jobban?" Mi hiányzik?', jp: 'コーヒーと{紅茶|こうちゃ}と＿が{好|す}きですか。', a: 'どちら', wrong: ['どれ', 'なに', 'どんな'],
        why: 'Két dolog közül どちら kérdez.' },
      { q: '„A focit szeretem a legjobban." Mi hiányzik?', jp: 'サッカーが＿{好|す}きです。', a: 'いちばん', wrong: ['より', 'のほうが', 'どちら'],
        why: 'Felsőfok: いちばん.' },
      { q: '„Kérem, írja ide a nevét." Mi hiányzik?', jp: 'ここに{名前|なまえ}を＿ください。', a: '{書|か}いて', wrong: ['{書|か}きて', '{書|か}きます', '{書|か}く'],
        why: 'Kérés: て-alak + ください; {書|か}きます → {書|か}いて.' },
      { q: '„Miután kezet mostam, eszem." Mi hiányzik?', jp: '{手|て}を{洗|あら}って＿、{食|た}べます。', a: 'から', wrong: ['より', 'まで', 'みて'],
        why: 'て-alak + から = miután.' },
      { q: 'Mit jelent: {使|つか}ってみてください。', a: 'Próbálja ki!', wrong: ['Ne használja!', 'Használni szeretném.', 'Használtam már.'],
        why: 'てみます = megteszem, hogy lássam, milyen.' },
      { q: 'Hogyan mondod: „Mindkettőt szeretem."', a: 'どちらも{好|す}きです。', wrong: ['どちらが{好|す}きです。', 'どちらか{好|す}きです。', 'いちばん{好|す}きです。'],
        why: 'どちらも = mindkettő.' },
      { q: 'Melyik mondat jelenti: „Ma hidegebb van, mint tegnap."', a: '{今日|きょう}はきのうより{寒|さむ}いです。',
        wrong: ['きのうは{今日|きょう}より{寒|さむ}いです。', '{今日|きょう}はきのうと{寒|さむ}いです。', '{今日|きょう}はきのうがいちばん{寒|さむ}いです。'],
        why: 'Ami után より áll, ahhoz hasonlítasz: ma hidegebb, mint tegnap.' },
      { q: 'Mi a {待|ま}ちます て-alakja?', a: '{待|ま}って', wrong: ['{待|ま}ちて', '{待|ま}いて', '{待|ま}んで'],
        why: 'い・ち・り → って.' },
      { q: '„A sportok közül melyiket szereted a legjobban?" Mi hiányzik?', jp: 'スポーツの＿で{何|なに}がいちばん{好|す}きですか。', a: '{中|なか}', wrong: ['{上|うえ}', '{前|まえ}', '{下|した}'],
        why: 'A csoportot a 〜の{中|なか}で adja meg.' }
    ]
  },

  /* ── 11. lecke ────────────────────────────────────── */
  {
    id: 'l11', no: 11, book: 'Dekiru 1',
    title: 'Mit tegyek?',
    lead: 'Megismered az igék rövid alakjait, tanácsot adsz és kérsz, és megmondod, mit ne tegyen valaki.',
    cando: [
      'Tanácsot adsz és kérsz.',
      'Megkérsz valakit, hogy ne tegyen valamit.',
      'Elmondod az orvosnak, mi a baj.'
    ],
    points: [
      {
        title: 'た-alak', sub: 'rövid múlt',
        pattern: 'て → た · で → だ',
        body: 'A <b>た-alak</b> a múlt idő rövid alakja. Ugyanúgy képzed, mint a て-alakot, csak a végén て helyett <b>た</b>, で helyett <b>だ</b> áll: {書|か}いて → {書|か}いた, {読|よ}んで → {読|よ}んだ, {食|た}べて → {食|た}べた. Mondat végén önmagában baráti, közvetlen stílusú múlt.',
        examples: [
          { jp: 'きのう{映画|えいが}を{見|み}た。', romaji: 'Kinō eiga o mita.', hu: 'Tegnap megnéztem egy filmet.' },
          { jp: '{朝|あさ}ごはんを{食|た}べた。', romaji: 'Asagohan o tabeta.', hu: 'Megreggeliztem.' },
          { jp: '{友|とも}だちに{会|あ}った。', romaji: 'Tomodachi ni atta.', hu: 'Találkoztam a barátommal.' }
        ]
      },
      {
        title: 'ない-alak', sub: 'rövid tagadás',
        pattern: '1. csoport: i-hang → a-hang + ない · 2. csoport: ます → ない',
        body: 'A <b>ない-alak</b> a tagadás rövid alakja. A 2. csoportnál a ます helyére ない kerül: {食|た}べます → {食|た}べない. Az 1. csoportnál a ます előtti i-hang a-hangra vált: {書|か}きます → {書|か}<b>か</b>ない, {飲|の}みます → {飲|の}<b>ま</b>ない; az い-ből <b>わ</b> lesz: {買|か}います → {買|か}わない. Rendhagyó: します → しない, {来|き}ます → {来|こ}ない, あります → ない.',
        examples: [
          { jp: '{今日|きょう}は{行|い}かない。', romaji: 'Kyō wa ikanai.', hu: 'Ma nem megyek.' },
          { jp: 'お{酒|さけ}は{飲|の}まない。', romaji: 'Osake wa nomanai.', hu: 'Alkoholt nem iszom.' },
          { jp: '{時間|じかん}がない。', romaji: 'Jikan ga nai.', hu: 'Nincs időm.' }
        ]
      },
      {
        title: '〜ないでください', sub: 'kérem, ne…',
        pattern: 'ない-alak + でください',
        body: 'A tiltó kérés: ない-alak + <b>でください</b>.',
        examples: [
          { jp: 'ここで{写真|しゃしん}を{撮|と}らないでください。', romaji: 'Koko de shashin o toranaide kudasai.', hu: 'Kérem, itt ne fényképezzen.' },
          { jp: '{心配|しんぱい}しないでください。', romaji: 'Shinpai shinaide kudasai.', hu: 'Ne aggódjon!' },
          { jp: 'まだ{帰|かえ}らないでください。', romaji: 'Mada kaeranaide kudasai.', hu: 'Kérem, még ne menjen haza.' }
        ]
      },
      {
        title: '〜たほうがいいです', sub: 'jobb lenne, ha…',
        pattern: 'た-alak + ほうがいいです',
        body: 'Tanácsot a <b>た-alak + ほうがいい</b> ad: „jobban tennéd, ha…". Bár múlt alak áll benne, a jelenre vagy a jövőre vonatkozik.',
        examples: [
          { jp: '{薬|くすり}を{飲|の}んだほうがいいです。', romaji: 'Kusuri o nonda hō ga ii desu.', hu: 'Jobb lenne, ha bevennéd a gyógyszert.' },
          { jp: '{早|はや}く{寝|ね}たほうがいいですよ。', romaji: 'Hayaku neta hō ga ii desu yo.', hu: 'Jobb lenne korán lefeküdnöd.' },
          { jp: '{病院|びょういん}へ{行|い}ったほうがいいです。', romaji: 'Byōin e itta hō ga ii desu.', hu: 'Jobb lenne orvoshoz menned.' }
        ]
      },
      {
        title: '〜ないほうがいいです', sub: 'jobb, ha nem…',
        pattern: 'ない-alak + ほうがいいです',
        body: 'A tagadó tanácshoz a ない-alak kell: „jobb, ha nem…".',
        examples: [
          { jp: '{今日|きょう}は{出|で}かけないほうがいいです。', romaji: 'Kyō wa dekakenai hō ga ii desu.', hu: 'Ma jobb, ha nem mész el itthonról.' },
          { jp: '{冷|つめ}たいものを{飲|の}まないほうがいいです。', romaji: 'Tsumetai mono o nomanai hō ga ii desu.', hu: 'Jobb, ha nem iszol hideget.' },
          { jp: '{無理|むり}をしないほうがいいですよ。', romaji: 'Muri o shinai hō ga ii desu yo.', hu: 'Jobb, ha nem erőlteted meg magad.' }
        ]
      },
      {
        title: '〜んです', sub: 'magyarázat, ok',
        pattern: 'rövid alak + んです',
        body: 'A mondat végi <b>んです</b> magyarázatot ad vagy kér: megindokolod a helyzetet, vagy rákérdezel az okára. Rövid (szótári, た-, ない-) alak áll előtte; főnév és な-melléknév után <b>なんです</b>.',
        examples: [
          { jp: 'どうしたんですか。', romaji: 'Dō shita n desu ka.', hu: 'Mi történt? Mi a baj?' },
          { jp: '{頭|あたま}が{痛|いた}いんです。', romaji: 'Atama ga itai n desu.', hu: 'Fáj a fejem (ezért vagyok ilyen).' },
          { jp: 'きのう{寝|ね}なかったんです。', romaji: 'Kinō nenakatta n desu.', hu: 'Tegnap nem aludtam (ez az oka).' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {飲|の}みます た-alakja?', a: '{飲|の}んだ', wrong: ['{飲|の}みた', '{飲|の}った', '{飲|の}いた'],
        why: 'み → んで, illetve んだ.' },
      { q: 'Mi a {書|か}きます ない-alakja?', a: '{書|か}かない', wrong: ['{書|か}きない', '{書|か}くない', '{書|か}こない'],
        why: '1. csoport: az i-hang a-hangra vált: き → か.' },
      { q: 'Mi a {買|か}います ない-alakja?', a: '{買|か}わない', wrong: ['{買|か}あない', '{買|か}いない', '{買|か}らない'],
        why: 'Az い-re végződő tőnél わ lesz: {買|か}わない.' },
      { q: '„Kérem, itt ne fényképezzen." Mi hiányzik?', jp: 'ここで{写真|しゃしん}を＿ください。', a: '{撮|と}らないで', wrong: ['{撮|と}って', '{撮|と}らなくて', '{撮|と}りないで'],
        why: 'Tiltó kérés: ない-alak + でください.' },
      { q: '„Jobb lenne, ha bevennéd a gyógyszert." Mi hiányzik?', jp: '{薬|くすり}を＿ほうがいいです。', a: '{飲|の}んだ', wrong: ['{飲|の}みます', '{飲|の}んで', '{飲|の}みたい'],
        why: 'Tanács: た-alak + ほうがいい.' },
      { q: '„Ma jobb, ha nem mész el itthonról." Mi hiányzik?', jp: '{今日|きょう}は＿ほうがいいです。', a: '{出|で}かけない', wrong: ['{出|で}かけた', '{出|で}かけて', '{出|で}かけません'],
        why: 'Tagadó tanács: ない-alak + ほうがいい.' },
      { q: 'Mit jelent: どうしたんですか。', a: 'Mi történt? Mi a baj?', wrong: ['Hogy vagy?', 'Mit csinálsz?', 'Miért mész el?'],
        why: 'A んですか magyarázatot kér: mi az oka annak, amit látok?' },
      { q: 'Mi a します ない-alakja?', a: 'しない', wrong: ['すない', 'さない', 'しらない'],
        why: 'A します rendhagyó: しない.' },
      { q: '„Fáj a fejem." (magyarázatként) Mi hiányzik?', jp: '{頭|あたま}が{痛|いた}い＿。', a: 'んです', wrong: ['でした', 'ください', 'ほうです'],
        why: 'Magyarázat: rövid alak + んです.' },
      { q: 'Mi a {来|き}ます ない-alakja?', a: 'こない', wrong: ['きない', 'くない', 'こらない'],
        why: 'A {来|き}ます rendhagyó: こない.' }
    ]
  },

  /* ── 12. lecke ────────────────────────────────────── */
  {
    id: 'l12', no: 12, book: 'Dekiru 1',
    title: 'Barátok között',
    lead: 'Megtanulod a baráti, közvetlen beszédstílust, leírod, ki mit csinál éppen és hogy néz ki, és főneveket bővítesz egész mondattal.',
    cando: [
      'Barátnak írsz, és vele közvetlen stílusban beszélsz.',
      'Leírod, hogy néz ki és mit visel valaki.',
      'Megmondod, ki mit csinál éppen.'
    ],
    points: [
      {
        title: 'Közvetlen stílus', sub: 'rövid alakok',
        pattern: '{行|い}きます → {行|い}く · {行|い}きません → {行|い}かない · {行|い}きました → {行|い}った',
        body: 'Barátok és családtagok között a <b>rövid alakokat</b> használjuk: a ます helyett a szótári alak, a ません helyett a ない-alak, a ました helyett a た-alak áll. A です főnév és な-melléknév után <b>だ</b>, az い-melléknév után egyszerűen elmarad. A kérdést a hanglejtés jelzi, a か gyakran elmarad.',
        examples: [
          { jp: 'あした{学校|がっこう}へ{行|い}く？', romaji: 'Ashita gakkō e iku?', hu: 'Holnap mész suliba?' },
          { jp: 'うん、{行|い}く。', romaji: 'Un, iku.', hu: 'Aha, megyek.' },
          { jp: 'きのうは{忙|いそが}しかった。', romaji: 'Kinō wa isogashikatta.', hu: 'Tegnap sok dolgom volt.' },
          { jp: '{今日|きょう}は{休|やす}みだ。', romaji: 'Kyō wa yasumi da.', hu: 'Ma szünnap van.' }
        ],
        tip: 'Tanárral, idegennel, idősebbel maradj a です / ます alaknál: a rövid alak velük szemben udvariatlan.'
      },
      {
        title: '〜ています (folyamat)', sub: 'éppen csinálja',
        pattern: 'ige て-alak + います',
        body: 'A <b>ています</b> elsőként azt fejezi ki, ami éppen most zajlik.',
        examples: [
          { jp: '{今|いま}{本|ほん}を{読|よ}んでいます。', romaji: 'Ima hon o yonde imasu.', hu: 'Most éppen könyvet olvasok.' },
          { jp: '{雨|あめ}が{降|ふ}っています。', romaji: 'Ame ga futte imasu.', hu: 'Esik az eső.' },
          { jp: '{何|なに}をしていますか。', romaji: 'Nani o shite imasu ka.', hu: 'Mit csinálsz éppen?' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'tartós állapot, foglalkozás',
        pattern: 'ige て-alak + います',
        body: 'Ugyanez az alak tartós állapotot is jelent: egy változás eredménye fennáll. Így mondod meg, hol laksz, házas vagy-e, mit tudsz, és azt is, mit visel valaki. Rendszeres tevékenységre, foglalkozásra is ez jár.',
        examples: [
          { jp: '{東京|とうきょう}に{住|す}んでいます。', romaji: 'Tōkyō ni sunde imasu.', hu: 'Tokióban lakom.' },
          { jp: '{兄|あに}は{結婚|けっこん}しています。', romaji: 'Ani wa kekkon shite imasu.', hu: 'A bátyám házas.' },
          { jp: '{田中|たなか}さんはめがねをかけています。', romaji: 'Tanaka-san wa megane o kakete imasu.', hu: 'Tanaka szemüveget visel.' },
          { jp: '{母|はは}は{銀行|ぎんこう}で{働|はたら}いています。', romaji: 'Haha wa ginkō de hataraite imasu.', hu: 'Anyám bankban dolgozik.' }
        ],
        tip: 'A „tudom" {知|し}っています, de a „nem tudom" {知|し}りません (nem {知|し}っていません).'
      },
      {
        title: 'A は B が 〜です', sub: 'személyleírás',
        pattern: 'A は + rész / tulajdonság が + melléknév',
        body: 'Ha valakiről azt mondod, milyen egy része vagy tulajdonsága, az egész <b>は</b>-t, a rész <b>が</b>-t kap: „ami Annát illeti, a haja hosszú".',
        examples: [
          { jp: 'アンナさんは{髪|かみ}が{長|なが}いです。', romaji: 'Anna-san wa kami ga nagai desu.', hu: 'Annának hosszú a haja.' },
          { jp: '{弟|おとうと}は{背|せ}が{高|たか}いです。', romaji: 'Otōto wa se ga takai desu.', hu: 'Az öcsém magas.' },
          { jp: 'この{町|まち}は{公園|こうえん}が{多|おお}いです。', romaji: 'Kono machi wa kōen ga ōi desu.', hu: 'Ebben a városban sok a park.' }
        ]
      },
      {
        title: 'Jelzős szerkezet', sub: 'mondat a főnév előtt',
        pattern: 'rövid alakú mondat + főnév',
        body: 'A magyar „aki, ami, amelyik" mellékmondat japánul a főnév <i>elé</i> kerül, rövid alakban, kötőszó nélkül: „a tegnap vett könyv" = きのう{買|か}った{本|ほん}.',
        examples: [
          { jp: 'これはきのう{買|か}った{本|ほん}です。', romaji: 'Kore wa kinō katta hon desu.', hu: 'Ez az a könyv, amit tegnap vettem.' },
          { jp: 'めがねをかけている{人|ひと}は{田中|たなか}さんです。', romaji: 'Megane o kakete iru hito wa Tanaka-san desu.', hu: 'A szemüveges ember Tanaka.' },
          { jp: '{日本|にほん}で{撮|と}った{写真|しゃしん}を{見|み}せます。', romaji: 'Nihon de totta shashin o misemasu.', hu: 'Megmutatom a Japánban készült képeket.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {行|い}きました közvetlen (rövid) alakja?', a: '{行|い}った', wrong: ['{行|い}く', '{行|い}かない', '{行|い}って'],
        why: 'A ました rövid párja a た-alak.' },
      { q: 'Mi a {食|た}べません közvetlen alakja?', a: '{食|た}べない', wrong: ['{食|た}べた', '{食|た}べる', '{食|た}べなかった'],
        why: 'A ません rövid párja a ない-alak.' },
      { q: '„Ma szünnap van." Közvetlen stílusban mi hiányzik?', jp: '{今日|きょう}は{休|やす}み＿。', a: 'だ', wrong: ['です', 'な', 'の'],
        why: 'Főnév után a です rövid alakja だ.' },
      { q: '„Esik az eső." Mi hiányzik?', jp: '{雨|あめ}が＿います。', a: '{降|ふ}って', wrong: ['{降|ふ}り', '{降|ふ}る', '{降|ふ}った'],
        why: 'Folyamat: て-alak + います.' },
      { q: 'Melyik mondat jelenti: „Tokióban lakom."', a: '{東京|とうきょう}に{住|す}んでいます。',
        wrong: ['{東京|とうきょう}に{住|す}みます。', '{東京|とうきょう}で{住|す}みました。', '{東京|とうきょう}を{住|す}んでいます。'],
        why: 'A lakóhely tartós állapot: {住|す}んでいます, a hely に-vel.' },
      { q: '„Annának hosszú a haja." Mi hiányzik?', jp: 'アンナさんは{髪|かみ}＿{長|なが}いです。', a: 'が', wrong: ['を', 'に', 'で'],
        why: 'Az egész は, a rész が.' },
      { q: 'Mit jelent: これはきのう{買|か}った{本|ほん}です。', a: 'Ez az a könyv, amit tegnap vettem.',
        wrong: ['Tegnap ezt a könyvet olvastam.', 'Ezt a könyvet holnap veszem meg.', 'Ez a könyv tegnap elveszett.'],
        why: 'A főnév előtti rövid alakú mondat jelző: „a tegnap vett könyv".' },
      { q: '„A szemüveges ember Tanaka." Mi hiányzik?', jp: 'めがねを＿{人|ひと}は{田中|たなか}さんです。', a: 'かけている', wrong: ['かけています', 'かけて', 'かけるの'],
        why: 'Főnév előtt rövid alak áll: かけている + {人|ひと}.' },
      { q: 'Hogyan mondod: „Nem tudom."', a: '{知|し}りません。', wrong: ['{知|し}っていません。', '{知|し}りています。', '{知|し}らないでください。'],
        why: 'Tudom: {知|し}っています; nem tudom: {知|し}りません.' },
      { q: '„Anyám bankban dolgozik." Mi hiányzik?', jp: '{母|はは}は{銀行|ぎんこう}で＿。', a: '{働|はたら}いています', wrong: ['{働|はたら}きています', '{働|はたら}っています', '{働|はたら}んでいます'],
        why: 'き → いて; a foglalkozás tartós állapot: {働|はたら}いています.' }
    ]
  },

  /* ── 13. lecke ────────────────────────────────────── */
  {
    id: 'l13', no: 13, book: 'Dekiru 1',
    title: 'Ajándék',
    lead: 'Ajándékot választasz, megindokolod a döntésed, és elmondod, ki kinek mit adott és kitől mit kapott.',
    cando: [
      'Megindokolod, mit miért teszel.',
      'Választasz több dolog közül, és megmondod, melyiket kéred.',
      'Elmondod, kinek mit adtál és kitől mit kaptál.'
    ],
    points: [
      {
        title: '〜ので', sub: 'mivel…, ezért…',
        pattern: 'rövid alak + ので · főnév / な-melléknév + なので',
        body: 'A <b>ので</b> okot ad meg, mint a から, de tárgyilagosabb és udvariasabb: kéréshez, mentegetőzéshez ez illik jobban. Rövid alak áll előtte; főnév és な-melléknév után <b>なので</b>.',
        examples: [
          { jp: '{雨|あめ}が{降|ふ}っているので、{出|で}かけません。', romaji: 'Ame ga futte iru node, dekakemasen.', hu: 'Mivel esik az eső, nem megyek el itthonról.' },
          { jp: '{今日|きょう}は{休|やす}みなので、{家|うち}にいます。', romaji: 'Kyō wa yasumi na node, uchi ni imasu.', hu: 'Mivel ma szünnap van, otthon vagyok.' },
          { jp: '{時間|じかん}がないので、タクシーで{行|い}きます。', romaji: 'Jikan ga nai node, takushī de ikimasu.', hu: 'Mivel nincs időm, taxival megyek.' }
        ]
      },
      {
        title: '〜にします', sub: 'ezt választom',
        pattern: 'főnév + にします',
        body: 'Ha több lehetőség közül döntesz, a választott dolog <b>に</b>-t kap: „emellett döntök". Étteremben, boltban ezzel mondod meg, mit kérsz.',
        examples: [
          { jp: '{私|わたし}はコーヒーにします。', romaji: 'Watashi wa kōhī ni shimasu.', hu: 'Én kávét kérek.' },
          { jp: 'プレゼントは{花|はな}にしました。', romaji: 'Purezento wa hana ni shimashita.', hu: 'Ajándéknak virágot választottam.' },
          { jp: '{何|なに}にしますか。', romaji: 'Nani ni shimasu ka.', hu: 'Mit választasz?' }
        ]
      },
      {
        title: '〜の', sub: 'a főnév helyett',
        pattern: 'melléknév + の · főnév + の',
        body: 'Ha már tudni, miről van szó, a főnevet a <b>の</b> helyettesíti: „a fekete", „a nagyobb". い-melléknév után közvetlenül áll, な-melléknév után <b>なの</b>. Főnév után csak egy の marad: {日本|にほん}の (a japán).',
        examples: [
          { jp: '{黒|くろ}いのをください。', romaji: 'Kuroi no o kudasai.', hu: 'A feketét kérem.' },
          { jp: 'もっと{大|おお}きいのはありますか。', romaji: 'Motto ōkii no wa arimasu ka.', hu: 'Van nagyobb?' },
          { jp: 'このかばんは{日本|にほん}のです。', romaji: 'Kono kaban wa Nihon no desu.', hu: 'Ez a táska japán gyártmány.' }
        ]
      },
      {
        title: 'あげます', sub: 'adok (másnak)',
        pattern: 'A は B に C を あげます',
        body: 'Az <b>あげます</b> kifelé irányuló adás: én adok valakinek, vagy valaki egy harmadik embernek. Aki kapja, <b>に</b>-t kap; amit adsz, <b>を</b>-t.',
        examples: [
          { jp: '{私|わたし}は{友|とも}だちに{本|ほん}をあげました。', romaji: 'Watashi wa tomodachi ni hon o agemashita.', hu: 'Adtam a barátomnak egy könyvet.' },
          { jp: '{母|はは}の{誕生日|たんじょうび}に{花|はな}をあげます。', romaji: 'Haha no tanjōbi ni hana o agemasu.', hu: 'Anyám születésnapjára virágot adok.' },
          { jp: '{田中|たなか}さんは{山田|やまだ}さんにチョコレートをあげました。', romaji: 'Tanaka-san wa Yamada-san ni chokorēto o agemashita.', hu: 'Tanaka csokit adott Jamadának.' }
        ]
      },
      {
        title: 'くれます', sub: 'ad (nekem)',
        pattern: 'A が ({私|わたし}に) C を くれます',
        body: 'Ha <i>nekem</i> (vagy a családomnak) ad valaki, az ige <b>くれます</b>. A {私|わたし}に többnyire el is marad, mert az ige maga megmondja, hogy felém irányul az adás.',
        examples: [
          { jp: '{友|とも}だちが{私|わたし}にケーキをくれました。', romaji: 'Tomodachi ga watashi ni kēki o kuremashita.', hu: 'A barátom tortát adott nekem.' },
          { jp: '{父|ちち}がカメラをくれました。', romaji: 'Chichi ga kamera o kuremashita.', hu: 'Apám adott nekem egy fényképezőgépet.' },
          { jp: 'これは{姉|あね}がくれたかばんです。', romaji: 'Kore wa ane ga kureta kaban desu.', hu: 'Ez az a táska, amit a nővéremtől kaptam.' }
        ],
        tip: 'Magyarul mindkettő „ad", japánul az irány dönt: tőlem kifelé あげます, felém くれます. A {私|わたし}にあげました hibás.'
      },
      {
        title: 'もらいます', sub: 'kapok',
        pattern: 'A は B に / から C を もらいます',
        body: 'A <b>もらいます</b> a kapó szemszögéből mondja el ugyanazt. Akitől kapsz, <b>に</b> vagy <b>から</b> jelöli; intézménynél (iskola, cég) inkább から.',
        examples: [
          { jp: '{私|わたし}は{友|とも}だちにプレゼントをもらいました。', romaji: 'Watashi wa tomodachi ni purezento o moraimashita.', hu: 'Ajándékot kaptam a barátomtól.' },
          { jp: '{会社|かいしゃ}から{手紙|てがみ}をもらいました。', romaji: 'Kaisha kara tegami o moraimashita.', hu: 'Levelet kaptam a cégtől.' },
          { jp: 'だれにもらいましたか。', romaji: 'Dare ni moraimashita ka.', hu: 'Kitől kaptad?' }
        ],
        tip: 'Figyelj: az あげます mellett a に azt jelöli, <i>akinek</i> adsz, a もらいます mellett azt, <i>akitől</i> kapsz.'
      }
    ],
    quiz: [
      { q: '„Mivel esik az eső, nem megyek el itthonról." Mi hiányzik?', jp: '{雨|あめ}が{降|ふ}っている＿、{出|で}かけません。', a: 'ので', wrong: ['より', 'まで', 'だけ'],
        why: 'Ok: rövid alak + ので.' },
      { q: '„Mivel ma szünnap van, otthon vagyok." Mi hiányzik?', jp: '{今日|きょう}は{休|やす}み＿、{家|うち}にいます。', a: 'なので', wrong: ['ので', 'だので', 'のので'],
        why: 'Főnév után なので áll.' },
      { q: 'Mit jelent: {私|わたし}はコーヒーにします。', a: 'Én kávét kérek.', wrong: ['Én kávét főzök.', 'Én szeretem a kávét.', 'Nekem van kávém.'],
        why: 'főnév + にします = ezt választom.' },
      { q: '„A feketét kérem." Mi hiányzik?', jp: '{黒|くろ}い＿をください。', a: 'の', wrong: ['な', 'に', 'が'],
        why: 'A の a már ismert főnevet helyettesíti: „a fekete".' },
      { q: '„Adtam a barátomnak egy könyvet." Mi hiányzik?', jp: '{私|わたし}は{友|とも}だちに{本|ほん}を＿。', a: 'あげました', wrong: ['くれました', 'もらいました', 'ありました'],
        why: 'Tőlem kifelé irányuló adás: あげます.' },
      { q: '„A barátom tortát adott nekem." Mi hiányzik?', jp: '{友|とも}だちが{私|わたし}にケーキを＿。', a: 'くれました', wrong: ['あげました', 'もらいました', 'いました'],
        why: 'Felém irányuló adás: くれます.' },
      { q: '„Ajándékot kaptam a barátomtól." Mi hiányzik?', jp: '{私|わたし}は{友|とも}だち＿プレゼントをもらいました。', a: 'に', wrong: ['を', 'で', 'へ'],
        why: 'A もらいます mellett a に jelöli, akitől kapsz.' },
      { q: 'Melyik mondat jelenti: „Anyám órát adott nekem."', a: '{母|はは}が{時計|とけい}をくれました。',
        wrong: ['{母|はは}に{時計|とけい}をあげました。', '{母|はは}が{時計|とけい}をもらいました。', '{母|はは}は{時計|とけい}にしました。'],
        why: 'Aki ad, が-t kap, és mivel nekem ad, az ige くれます.' },
      { q: '„Mivel nincs időm, taxival megyek." Mi hiányzik?', jp: '{時間|じかん}が＿ので、タクシーで{行|い}きます。', a: 'ない', wrong: ['ないな', 'ないだ', 'なくて'],
        why: 'A ので előtt rövid alak áll: ない + ので.' },
      { q: 'Mit jelent: だれにもらいましたか。', a: 'Kitől kaptad?', wrong: ['Kinek adtad?', 'Ki kapta meg?', 'Mit kaptál?'],
        why: 'A もらいます mellett a に „-tól, -től".' }
    ]
  },

  /* ── 14. lecke ────────────────────────────────────── */
  {
    id: 'l14', no: 14, book: 'Dekiru 1',
    title: 'Tervek és vélemények',
    lead: 'Megmondod, mit csináltál már meg és mit nem, sorba rendezed a teendőket, véleményt mondasz, és a terveidről beszélsz.',
    cando: [
      'Megmondod, mi van már kész és mi nincs.',
      'Elmondod a véleményed.',
      'Beszélsz a terveidről és arról, mire vágysz.'
    ],
    points: [
      {
        title: 'もう・まだ', sub: 'már · még nem',
        pattern: 'もう 〜ました · まだ 〜ていません',
        body: 'A <b>もう</b> + múlt idő azt jelenti: már megtörtént. A „még nem" <b>まだ</b> + <b>〜ていません</b>: a dolog még várat magára, ezért nem a sima múlt tagadása áll. Röviden: いいえ、まだです.',
        examples: [
          { jp: 'もう{昼|ひる}ごはんを{食|た}べましたか。', romaji: 'Mō hirugohan o tabemashita ka.', hu: 'Ebédeltél már?' },
          { jp: 'はい、もう{食|た}べました。', romaji: 'Hai, mō tabemashita.', hu: 'Igen, már ettem.' },
          { jp: 'いいえ、まだ{食|た}べていません。', romaji: 'Iie, mada tabete imasen.', hu: 'Nem, még nem ettem.' }
        ],
        tip: 'A まだ{食|た}べませんでした hibás: a „még nem" mindig 〜ていません.'
      },
      {
        title: '〜たあとで', sub: 'miután…',
        pattern: 'た-alak + あとで · főnév + のあとで',
        body: 'Az <b>あとで</b> előtt mindig た-alak áll, akkor is, ha a jövőről beszélsz: az első cselekvés addigra már lezárult.',
        examples: [
          { jp: '{仕事|しごと}が{終|お}わったあとで、{飲|の}みに{行|い}きます。', romaji: 'Shigoto ga owatta ato de, nomi ni ikimasu.', hu: 'Munka után elmegyünk inni.' },
          { jp: '{食事|しょくじ}のあとで、{散歩|さんぽ}します。', romaji: 'Shokuji no ato de, sanpo shimasu.', hu: 'Evés után sétálok.' },
          { jp: '{映画|えいが}を{見|み}たあとで、{買|か}い{物|もの}をしました。', romaji: 'Eiga o mita ato de, kaimono o shimashita.', hu: 'Miután megnéztük a filmet, vásároltunk.' }
        ]
      },
      {
        title: '〜るまえに', sub: 'mielőtt…',
        pattern: 'szótári alak + まえに · főnév + のまえに',
        body: 'A <b>まえに</b> előtt mindig szótári alak áll, akkor is, ha a mondat múlt idejű: amikor a második cselekvés történt, az első még nem zajlott le.',
        examples: [
          { jp: '{寝|ね}るまえに、{歯|は}をみがきます。', romaji: 'Neru mae ni, ha o migakimasu.', hu: 'Lefekvés előtt fogat mosok.' },
          { jp: '{日本|にほん}へ{来|く}るまえに、{日本語|にほんご}を{勉強|べんきょう}しました。', romaji: 'Nihon e kuru mae ni, nihongo o benkyō shimashita.', hu: 'Mielőtt Japánba jöttem, japánul tanultam.' },
          { jp: '{授業|じゅぎょう}のまえに、コーヒーを{飲|の}みます。', romaji: 'Jugyō no mae ni, kōhī o nomimasu.', hu: 'Óra előtt kávét iszom.' }
        ]
      },
      {
        title: '〜と思います', sub: 'azt hiszem, szerintem',
        pattern: 'rövid alak + と{思|おも}います',
        body: 'Véleményt és feltevést a <b>と{思|おも}います</b> fejez ki. Előtte rövid alak áll; főnév és な-melléknév után <b>だ</b> kell. A tagadás a mondat belsejébe kerül: „azt hiszem, nem jön".',
        examples: [
          { jp: 'あしたは{雨|あめ}が{降|ふ}ると{思|おも}います。', romaji: 'Ashita wa ame ga furu to omoimasu.', hu: 'Azt hiszem, holnap esni fog.' },
          { jp: 'この{映画|えいが}はおもしろいと{思|おも}います。', romaji: 'Kono eiga wa omoshiroi to omoimasu.', hu: 'Szerintem ez a film érdekes.' },
          { jp: '{田中|たなか}さんは{来|こ}ないと{思|おも}います。', romaji: 'Tanaka-san wa konai to omoimasu.', hu: 'Szerintem Tanaka nem jön el.' },
          { jp: '{日本語|にほんご}は{簡単|かんたん}だと{思|おも}います。', romaji: 'Nihongo wa kantan da to omoimasu.', hu: 'Szerintem a japán nyelv könnyű.' }
        ]
      },
      {
        title: '〜がほしいです', sub: 'szeretnék egy…',
        pattern: 'főnév + が + ほしいです',
        body: 'A <b>ほしい</b> い-melléknév: amire vágysz, <b>が</b>-t kap, a tagadása ほしくないです. Tárgyra használod; ha cselekedni szeretnél, a 〜たい kell.',
        examples: [
          { jp: '{新|あたら}しいパソコンがほしいです。', romaji: 'Atarashii pasokon ga hoshii desu.', hu: 'Szeretnék egy új számítógépet.' },
          { jp: '{誕生日|たんじょうび}に{何|なに}がほしいですか。', romaji: 'Tanjōbi ni nani ga hoshii desu ka.', hu: 'Mit szeretnél a születésnapodra?' },
          { jp: '{今|いま}は{何|なに}もほしくないです。', romaji: 'Ima wa nani mo hoshikunai desu.', hu: 'Most semmire sem vágyom.' }
        ],
        tip: 'A ほしい és a たい a saját vágyadról szól; másról legfeljebb kérdezhetsz vele.'
      },
      {
        title: '〜つもりです', sub: 'szándékozom',
        pattern: 'szótári alak / ない-alak + つもりです',
        body: 'A <b>つもり</b> elhatározott szándékot jelent: „az a tervem, hogy…". Ha valamit nem szándékozol megtenni, a ない-alak áll előtte.',
        examples: [
          { jp: '{来年|らいねん}{日本|にほん}へ{行|い}くつもりです。', romaji: 'Rainen Nihon e iku tsumori desu.', hu: 'Jövőre Japánba szándékozom menni.' },
          { jp: '{夏休|なつやす}みはどこへも{行|い}かないつもりです。', romaji: 'Natsuyasumi wa doko e mo ikanai tsumori desu.', hu: 'A nyári szünetben nem szándékozom sehová menni.' },
          { jp: '{大学|だいがく}で{何|なに}を{勉強|べんきょう}するつもりですか。', romaji: 'Daigaku de nani o benkyō suru tsumori desu ka.', hu: 'Mit szándékozol tanulni az egyetemen?' }
        ]
      }
    ],
    quiz: [
      { q: '„Nem, még nem ettem." Mi hiányzik?', jp: 'いいえ、まだ＿。', a: '{食|た}べていません', wrong: ['{食|た}べませんでした', '{食|た}べました', '{食|た}べています'],
        why: 'Még nem: まだ + 〜ていません.' },
      { q: '„Lefekvés előtt fogat mosok." Mi hiányzik?', jp: '＿まえに、{歯|は}をみがきます。', a: '{寝|ね}る', wrong: ['{寝|ね}た', '{寝|ね}て', '{寝|ね}ます'],
        why: 'A まえに előtt szótári alak áll.' },
      { q: '„Miután megnéztük a filmet, vásároltunk." Mi hiányzik?', jp: '{映画|えいが}を＿あとで、{買|か}い{物|もの}をしました。', a: '{見|み}た', wrong: ['{見|み}る', '{見|み}て', '{見|み}ない'],
        why: 'Az あとで előtt た-alak áll.' },
      { q: '„Azt hiszem, holnap esni fog." Mi hiányzik?', jp: 'あしたは{雨|あめ}が＿と{思|おも}います。', a: '{降|ふ}る', wrong: ['{降|ふ}ります', '{降|ふ}って', '{降|ふ}り'],
        why: 'A と{思|おも}います előtt rövid alak áll.' },
      { q: '„Szeretnék egy új számítógépet." Mi hiányzik?', jp: '{新|あたら}しいパソコン＿ほしいです。', a: 'が', wrong: ['に', 'で', 'へ'],
        why: 'Amire vágysz, が-t kap: 〜がほしい.' },
      { q: '„Jövőre Japánba szándékozom menni." Mi hiányzik?', jp: '{来年|らいねん}{日本|にほん}へ{行|い}く＿です。', a: 'つもり', wrong: ['ほしい', 'あとで', 'まえに'],
        why: 'Szándék: szótári alak + つもりです.' },
      { q: 'Mit jelent: もう{宿題|しゅくだい}をしましたか。', a: 'Megcsináltad már a leckét?',
        wrong: ['Mikor csinálod meg a leckét?', 'Még mindig a leckét csinálod?', 'Miért nem csináltad meg a leckét?'],
        why: 'もう + múlt idő = már.' },
      { q: '„Szerintem ő diák." Mi hiányzik?', jp: '{彼|かれ}は{学生|がくせい}＿と{思|おも}います。', a: 'だ', wrong: ['です', 'な', 'の'],
        why: 'Főnév után だ kell a と{思|おも}います elé.' },
      { q: '„Evés után sétálok." Mi hiányzik?', jp: '{食事|しょくじ}＿あとで、{散歩|さんぽ}します。', a: 'の', wrong: ['を', 'に', 'が'],
        why: 'Főnév után: のあとで.' },
      { q: 'Melyik mondat jelenti: „Vizet szeretnék inni."', a: '{水|みず}が{飲|の}みたいです。',
        wrong: ['{水|みず}がほしいたいです。', '{水|みず}を{飲|の}むほしいです。', '{水|みず}が{飲|の}みほしいです。'],
        why: 'Cselekvésre たい, tárgyra ほしい; a kettő nem keverhető.' }
    ]
  },

  /* ── 15. lecke ────────────────────────────────────── */
  {
    id: 'l15', no: 15, book: 'Dekiru 1',
    title: 'Találkozunk?',
    lead: 'Megbeszélsz egy találkozót: feltételezel, elmondod, mi sült el rosszul és miért, felsorolod, miket szoktál csinálni, és engedélyt kérsz.',
    cando: [
      'Megmondod, mi fog valószínűleg történni.',
      'Elnézést kérsz, és megmagyarázod, mi történt.',
      'Engedélyt kérsz valamire.'
    ],
    points: [
      {
        title: '〜でしょう', sub: 'valószínűleg',
        pattern: 'rövid alak + でしょう',
        body: 'A <b>でしょう</b> feltevést fejez ki: „valószínűleg, alighanem". Rövid alak áll előtte; főnév és な-melléknév után közvetlenül, だ nélkül. Az időjárás-jelentés állandó fordulata.',
        examples: [
          { jp: 'あしたは{晴|は}れるでしょう。', romaji: 'Ashita wa hareru deshō.', hu: 'Holnap valószínűleg napos idő lesz.' },
          { jp: '{今晩|こんばん}は{寒|さむ}いでしょう。', romaji: 'Konban wa samui deshō.', hu: 'Ma este valószínűleg hideg lesz.' },
          { jp: '{山田|やまだ}さんは{来|こ}ないでしょう。', romaji: 'Yamada-san wa konai deshō.', hu: 'Jamada valószínűleg nem jön el.' }
        ],
        tip: 'Emelkedő hanglejtéssel megerősítést kér: いいでしょう？ („Jó, ugye?")'
      },
      {
        title: '〜てしまいます', sub: 'megtörtént (és bánom)',
        pattern: 'ige て-alak + しまいます',
        body: 'A <b>てしまいます</b> azt jelzi, hogy valami teljesen, visszavonhatatlanul megtörtént. Leggyakrabban sajnálkozást hordoz: elvesztettem, elfelejtettem, elrontottam.',
        examples: [
          { jp: '{財布|さいふ}を{忘|わす}れてしまいました。', romaji: 'Saifu o wasurete shimaimashita.', hu: 'Otthon felejtettem a pénztárcámat.' },
          { jp: '{電車|でんしゃ}が{行|い}ってしまいました。', romaji: 'Densha ga itte shimaimashita.', hu: 'Elment a vonat, lekéstem.' },
          { jp: 'ケーキを{全部|ぜんぶ}{食|た}べてしまいました。', romaji: 'Kēki o zenbu tabete shimaimashita.', hu: 'Megettem az egész tortát.' }
        ]
      },
      {
        title: '〜たり〜たりします', sub: 'ezt is, azt is',
        pattern: 'た-alak + り、た-alak + り + します',
        body: 'Példaként említesz néhány tevékenységet a sok közül; a sorrend nem számít. A た-alakhoz <b>り</b> járul, a mondatot a <b>します</b> zárja, és az időt csak ez mutatja.',
        examples: [
          { jp: '{週末|しゅうまつ}は{本|ほん}を{読|よ}んだり、{音楽|おんがく}を{聞|き}いたりします。', romaji: 'Shūmatsu wa hon o yondari, ongaku o kiitari shimasu.', hu: 'Hétvégén olvasok, zenét hallgatok, ilyesmi.' },
          { jp: '{休|やす}みの{日|ひ}は{掃除|そうじ}したり、{洗濯|せんたく}したりします。', romaji: 'Yasumi no hi wa sōji shitari, sentaku shitari shimasu.', hu: 'Szabadnapon takarítok, mosok.' },
          { jp: 'きのうは{買|か}い{物|もの}をしたり、{友|とも}だちに{会|あ}ったりしました。', romaji: 'Kinō wa kaimono o shitari, tomodachi ni attari shimashita.', hu: 'Tegnap vásároltam, találkoztam a barátommal, ilyesmi.' }
        ]
      },
      {
        title: 'A も B も', sub: 'ez is, az is · sem, sem',
        pattern: 'A も B も + állítás / tagadás',
        body: 'Két <b>も</b> egymás után: állító mondatban „ez is, az is", tagadóban „sem ez, sem az". A も a は, が, を helyére lép.',
        examples: [
          { jp: '{肉|にく}も{魚|さかな}も{好|す}きです。', romaji: 'Niku mo sakana mo suki desu.', hu: 'A húst is, a halat is szeretem.' },
          { jp: '{土曜日|どようび}も{日曜日|にちようび}も{働|はたら}きます。', romaji: 'Doyōbi mo nichiyōbi mo hatarakimasu.', hu: 'Szombaton is, vasárnap is dolgozom.' },
          { jp: 'コーヒーも{紅茶|こうちゃ}も{飲|の}みません。', romaji: 'Kōhī mo kōcha mo nomimasen.', hu: 'Sem kávét, sem teát nem iszom.' }
        ]
      },
      {
        title: '〜て・〜で (ok)', sub: 'valami miatt',
        pattern: 'ige て-alak · い → くて · főnév + で',
        body: 'A て-alak okot is kifejezhet, ha a következmény nem rajtad múlik: érzés, állapot, „nem tudtam". Főnévnél a <b>で</b> jelenti: „miatt".',
        examples: [
          { jp: '{遅|おく}れて、すみません。', romaji: 'Okurete, sumimasen.', hu: 'Elnézést a késésért.' },
          { jp: '{風邪|かぜ}をひいて、{学校|がっこう}を{休|やす}みました。', romaji: 'Kaze o hiite, gakkō o yasumimashita.', hu: 'Megfáztam, ezért nem mentem iskolába.' },
          { jp: '{宿題|しゅくだい}が{多|おお}くて、{大変|たいへん}です。', romaji: 'Shukudai ga ōkute, taihen desu.', hu: 'Sok a lecke, nehéz dolgom van.' },
          { jp: '{病気|びょうき}で{会社|かいしゃ}を{休|やす}みました。', romaji: 'Byōki de kaisha o yasumimashita.', hu: 'Betegség miatt nem mentem dolgozni.' }
        ],
        tip: 'Kérés vagy javaslat előtt ne て-alakkal indokolj: oda から vagy ので kell.'
      },
      {
        title: '〜てもいいですか', sub: 'szabad…?',
        pattern: 'ige て-alak + もいいですか',
        body: 'Engedélyt a <b>てもいいですか</b> kér. Az igenlő válasz: はい、どうぞ. Az elutasítás udvariasan kitérő: すみません、ちょっと… (a mondat befejezetlen marad).',
        examples: [
          { jp: 'ここに{座|すわ}ってもいいですか。', romaji: 'Koko ni suwatte mo ii desu ka.', hu: 'Leülhetek ide?' },
          { jp: '{写真|しゃしん}を{撮|と}ってもいいですか。', romaji: 'Shashin o totte mo ii desu ka.', hu: 'Szabad fényképezni?' },
          { jp: '{窓|まど}を{開|あ}けてもいいですか。', romaji: 'Mado o akete mo ii desu ka.', hu: 'Kinyithatom az ablakot?' }
        ]
      }
    ],
    quiz: [
      { q: '„Holnap valószínűleg napos idő lesz." Mi hiányzik?', jp: 'あしたは{晴|は}れる＿。', a: 'でしょう', wrong: ['ましょう', 'でした', 'ください'],
        why: 'Feltevés: rövid alak + でしょう.' },
      { q: '„Otthon felejtettem a pénztárcámat." (sajnálkozva) Mi hiányzik?', jp: '{財布|さいふ}を{忘|わす}れて＿。', a: 'しまいました', wrong: ['ありました', 'ください', 'いいです'],
        why: 'Megtörtént, és bánom: て-alak + しまいました.' },
      { q: '„Hétvégén olvasok, zenét hallgatok, ilyesmi." Mi hiányzik?', jp: '{週末|しゅうまつ}は{本|ほん}を＿、{音楽|おんがく}を{聞|き}いたりします。', a: '{読|よ}んだり', wrong: ['{読|よ}みたり', '{読|よ}むたり', '{読|よ}んたり'],
        why: 'た-alak + り: {読|よ}んだ → {読|よ}んだり.' },
      { q: 'Mit jelent: コーヒーも{紅茶|こうちゃ}も{飲|の}みません。', a: 'Sem kávét, sem teát nem iszom.',
        wrong: ['Kávét iszom, teát nem.', 'Kávét is, teát is iszom.', 'Kávét vagy teát iszom.'],
        why: 'A も B も tagadással: sem ez, sem az.' },
      { q: '„Megfáztam, ezért nem mentem iskolába." Mi hiányzik?', jp: '{風邪|かぜ}を＿、{学校|がっこう}を{休|やす}みました。', a: 'ひいて', wrong: ['ひいたり', 'ひく', 'ひいても'],
        why: 'Az okot itt a て-alak fejezi ki.' },
      { q: '„Leülhetek ide?" Mi hiányzik?', jp: 'ここに{座|すわ}って＿いいですか。', a: 'も', wrong: ['は', 'が', 'を'],
        why: 'Engedélykérés: て-alak + もいいですか.' },
      { q: '„Sok a lecke, nehéz dolgom van." Mi hiányzik?', jp: '{宿題|しゅくだい}が＿、{大変|たいへん}です。', a: '{多|おお}くて', wrong: ['{多|おお}いで', '{多|おお}いて', '{多|おお}で'],
        why: 'い-melléknév て-alakja: い → くて.' },
      { q: 'Mit jelent: {電車|でんしゃ}が{行|い}ってしまいました。', a: 'Elment a vonat, lekéstem.',
        wrong: ['Megjött a vonat.', 'A vonat mindjárt indul.', 'Vonattal mentem.'],
        why: 'A てしまいました visszavonhatatlan, sajnálatos eseményt jelez.' },
      { q: '„Tegnap vásároltam, találkoztam a barátommal, ilyesmi." Mi hiányzik?', jp: 'きのうは{買|か}い{物|もの}をしたり、{友|とも}だちに{会|あ}ったり＿。', a: 'しました', wrong: ['でした', 'ました', 'いました'],
        why: 'A たり-sort a します zárja; itt múlt időben.' },
      { q: 'Valaki megkérdezi: ここでたばこを{吸|す}ってもいいですか。 Hogyan utasítod el udvariasan?', a: 'すみません、ちょっと…。',
        wrong: ['はい、どうぞ。', 'いいえ、ちがいます。', 'いいえ、ほしくないです。'],
        why: 'Az udvarias elutasítás kitérő: すみません、ちょっと…' }
    ]
  },

  /* ── 16. lecke ────────────────────────────────────── */
  {
    id: 'l16', no: 16, book: 'Dekiru 1',
    title: 'Hobbi és tapasztalat',
    lead: 'Elmondod, mi a hobbid, mit próbáltál már ki és mihez értesz, és megérted az üzletekben hallható tiszteleti kéréseket.',
    cando: [
      'Beszélsz a hobbidról.',
      'Elmondod, mit csináltál már életedben és mit tudsz.',
      'Megérted, amit a vendégnek, vásárlónak mondanak.'
    ],
    points: [
      {
        title: '〜ことです', sub: 'igéből főnév',
        pattern: 'szótári alak + こと',
        body: 'A <b>こと</b> főnévvé teszi az igét, a hozzá tartozó tárggyal együtt: {写真|しゃしん}を{撮|と}ること = „a fényképezés". Így mondod meg, mi a hobbid vagy az álmod.',
        examples: [
          { jp: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ることです。', romaji: 'Shumi wa shashin o toru koto desu.', hu: 'A hobbim a fényképezés.' },
          { jp: '{私|わたし}の{夢|ゆめ}は{日本|にほん}で{働|はたら}くことです。', romaji: 'Watashi no yume wa Nihon de hataraku koto desu.', hu: 'Az az álmom, hogy Japánban dolgozzak.' },
          { jp: '{好|す}きなことは{料理|りょうり}を{作|つく}ることです。', romaji: 'Suki na koto wa ryōri o tsukuru koto desu.', hu: 'Amit szeretek csinálni, az a főzés.' }
        ]
      },
      {
        title: '〜たことがあります', sub: 'volt már rá példa',
        pattern: 'た-alak + ことがあります',
        body: 'Élettapasztalatot fejez ki: „csináltam már ilyet". Tagadva: 〜たことがありません, „még soha". Nem használod arra, ami tegnap vagy a múlt héten történt: az sima múlt idő.',
        examples: [
          { jp: '{日本|にほん}へ{行|い}ったことがあります。', romaji: 'Nihon e itta koto ga arimasu.', hu: 'Voltam már Japánban.' },
          { jp: 'すしを{食|た}べたことがありますか。', romaji: 'Sushi o tabeta koto ga arimasu ka.', hu: 'Ettél már szusit?' },
          { jp: '{一度|いちど}も{馬|うま}に{乗|の}ったことがありません。', romaji: 'Ichido mo uma ni notta koto ga arimasen.', hu: 'Még soha nem ültem lovon.' }
        ]
      },
      {
        title: '〜ことができます', sub: 'tudok, lehet',
        pattern: 'szótári alak + ことができます · főnév + ができます',
        body: 'A <b>できます</b> képességet vagy lehetőséget jelent. Ige esetén こと kell elé; főnévvel (nyelv, sport, hangszer, vezetés) közvetlenül が-val áll.',
        examples: [
          { jp: '{漢字|かんじ}を{読|よ}むことができます。', romaji: 'Kanji o yomu koto ga dekimasu.', hu: 'Tudok kanjit olvasni.' },
          { jp: 'ここでインターネットを{使|つか}うことができます。', romaji: 'Koko de intānetto o tsukau koto ga dekimasu.', hu: 'Itt lehet internetet használni.' },
          { jp: '{私|わたし}は{車|くるま}の{運転|うんてん}ができます。', romaji: 'Watashi wa kuruma no unten ga dekimasu.', hu: 'Tudok autót vezetni.' },
          { jp: 'ピアノを{弾|ひ}くことができません。', romaji: 'Piano o hiku koto ga dekimasen.', hu: 'Nem tudok zongorázni.' }
        ]
      },
      {
        title: 'A は B ですが、C は D です', sub: 'szembeállítás',
        pattern: 'A は 〜が、C は 〜',
        body: 'A mondatvégi <b>が</b> itt „de". A két szembeállított dolog egyaránt <b>は</b>-t kap, akkor is, ha amúgy を vagy が járna neki.',
        examples: [
          { jp: '{兄|あに}は{背|せ}が{高|たか}いですが、{弟|おとうと}は{低|ひく}いです。', romaji: 'Ani wa se ga takai desu ga, otōto wa hikui desu.', hu: 'A bátyám magas, az öcsém viszont alacsony.' },
          { jp: '{平日|へいじつ}は{忙|いそが}しいですが、{週末|しゅうまつ}は{暇|ひま}です。', romaji: 'Heijitsu wa isogashii desu ga, shūmatsu wa hima desu.', hu: 'Hétköznap sok dolgom van, de hétvégén ráérek.' },
          { jp: '{肉|にく}は{食|た}べますが、{魚|さかな}は{食|た}べません。', romaji: 'Niku wa tabemasu ga, sakana wa tabemasen.', hu: 'Húst eszem, de halat nem.' }
        ]
      },
      {
        title: 'お〜ください', sub: 'tiszteleti kérés',
        pattern: 'お + ます-tő + ください',
        body: 'A 〜てください udvariasabb változata, amit vendégnek, vásárlónak, ügyfélnek mondanak: a ます-alakból elhagyod a ます-t, elé <b>お</b>, mögé <b>ください</b> kerül. Boltban, szállodában, állomáson fogod hallani; elég megértened.',
        examples: [
          { jp: '{少々|しょうしょう}お{待|ま}ちください。', romaji: 'Shōshō omachi kudasai.', hu: 'Kérem, várjon egy kicsit.' },
          { jp: 'こちらにお{名前|なまえ}をお{書|か}きください。', romaji: 'Kochira ni onamae o okaki kudasai.', hu: 'Kérem, ide írja a nevét.' },
          { jp: 'どうぞお{入|はい}りください。', romaji: 'Dōzo ohairi kudasai.', hu: 'Kérem, fáradjon be.' }
        ]
      }
    ],
    quiz: [
      { q: '„A hobbim a fényképezés." Mi hiányzik?', jp: '{趣味|しゅみ}は{写真|しゃしん}を＿ことです。', a: '{撮|と}る', wrong: ['{撮|と}って', '{撮|と}ります', '{撮|と}り'],
        why: 'A こと előtt szótári alak áll.' },
      { q: '„Voltam már Japánban." Mi hiányzik?', jp: '{日本|にほん}へ＿ことがあります。', a: '{行|い}った', wrong: ['{行|い}って', '{行|い}きます', '{行|い}き'],
        why: 'Tapasztalat: た-alak + ことがあります.' },
      { q: '„Tudok kanjit olvasni." Mi hiányzik?', jp: '{漢字|かんじ}を{読|よ}む＿ができます。', a: 'こと', wrong: ['もの', 'ところ', 'つもり'],
        why: 'Ige + こと + ができます.' },
      { q: '„Tudok autót vezetni." Mi hiányzik?', jp: '{私|わたし}は{車|くるま}の{運転|うんてん}＿できます。', a: 'が', wrong: ['に', 'で', 'へ'],
        why: 'Főnév + ができます.' },
      { q: '„Húst eszem, de halat nem." Mi hiányzik?', jp: '{肉|にく}は{食|た}べます＿、{魚|さかな}は{食|た}べません。', a: 'が', wrong: ['か', 'も', 'と'],
        why: 'A mondatvégi が itt „de".' },
      { q: '„Kérem, várjon egy kicsit." (tiszteleti) Mi hiányzik?', jp: '{少々|しょうしょう}＿ください。', a: 'お{待|ま}ち', wrong: ['お{待|ま}って', '{待|ま}ち', 'お{待|ま}つ'],
        why: 'お + ます-tő + ください: {待|ま}ちます → お{待|ま}ちください.' },
      { q: 'Mit jelent: すしを{食|た}べたことがありますか。', a: 'Ettél már szusit?',
        wrong: ['Szeretnél szusit enni?', 'Szoktál szusit enni?', 'Tegnap szusit ettél?'],
        why: '〜たことがあります = volt már rá példa az életedben.' },
      { q: 'Melyik mondat jelenti: „Még soha nem ültem lovon."', a: '{馬|うま}に{乗|の}ったことがありません。',
        wrong: ['{馬|うま}に{乗|の}ることができません。', '{馬|うま}に{乗|の}りませんでした。', '{馬|うま}に{乗|の}らないことです。'],
        why: 'A tapasztalat hiánya: た-alak + ことがありません.' },
      { q: '„Itt lehet internetet használni." Mi hiányzik?', jp: 'ここでインターネットを＿ことができます。', a: '{使|つか}う', wrong: ['{使|つか}って', '{使|つか}った', '{使|つか}います'],
        why: 'A ことができます előtt szótári alak áll.' },
      { q: 'Hol hallod leginkább: どうぞお{入|はい}りください。', a: 'Udvarias helyzetben: vendégnek, ügyfélnek mondják.',
        wrong: ['Barátok között, lazán.', 'Gyereknek szóló utasításként.', 'Csak írásban, tiltó táblán.'],
        why: 'Az お〜ください tiszteleti kérés.' }
    ]
  },

  /* ── 17. lecke ────────────────────────────────────── */
  {
    id: 'l17', no: 17, book: 'Dekiru 1',
    title: 'Szabad és tilos',
    lead: 'Megmondod, mikor mit csinálsz, megérted a házirendet, és két állítást egy mondatba kötsz.',
    cando: [
      'Megmondod, mit teszel egy adott helyzetben.',
      'Megérted és elmondod, mi szabad és mi tilos.',
      'Bejelentkezel egy szállodába, és eligazodsz a szabályok között.'
    ],
    points: [
      {
        title: '〜とき', sub: 'amikor (főnév, melléknév)',
        pattern: 'főnév + のとき · い-melléknév + とき · な-melléknév + なとき',
        body: 'A <b>とき</b> maga is főnév („idő, alkalom"), ezért úgy kapcsolódik, ahogy a főnévhez szokás: főnév után <b>の</b>, な-melléknév után <b>な</b> kell elé, az い-melléknév közvetlenül áll előtte.',
        examples: [
          { jp: '{子|こ}どものとき、{東京|とうきょう}に{住|す}んでいました。', romaji: 'Kodomo no toki, Tōkyō ni sunde imashita.', hu: 'Gyerekkoromban Tokióban laktam.' },
          { jp: '{暇|ひま}なとき、{本|ほん}を{読|よ}みます。', romaji: 'Hima na toki, hon o yomimasu.', hu: 'Amikor ráérek, olvasok.' },
          { jp: '{寒|さむ}いとき、コートを{着|き}ます。', romaji: 'Samui toki, kōto o kimasu.', hu: 'Amikor hideg van, kabátot veszek.' }
        ]
      },
      {
        title: '〜るとき・〜たとき', sub: 'amikor (ige)',
        pattern: 'szótári alak + とき · た-alak + とき',
        body: 'Ige után az alak azt mutatja, hogy a főmondat idején a cselekvés <i>lezárult-e már</i>. Szótári alak: még nem (előtte vagy közben). た-alak: már megtörtént (utána).',
        examples: [
          { jp: '{日本|にほん}へ{行|い}くとき、かばんを{買|か}いました。', romaji: 'Nihon e iku toki, kaban o kaimashita.', hu: 'Amikor Japánba készültem, vettem egy táskát.' },
          { jp: '{日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。', romaji: 'Nihon e itta toki, kaban o kaimashita.', hu: 'Amikor Japánban jártam, vettem egy táskát.' },
          { jp: '{道|みち}がわからないとき、{地図|ちず}を{見|み}ます。', romaji: 'Michi ga wakaranai toki, chizu o mimasu.', hu: 'Amikor nem tudom az utat, megnézem a térképet.' }
        ],
        tip: 'A とき előtti alak nem a mondat idejét adja meg: {行|い}くとき = még úton vagy indulás előtt, {行|い}ったとき = már odaértél.'
      },
      {
        title: '〜てはいけません', sub: 'tilos',
        pattern: 'ige て-alak + はいけません',
        body: 'Szabályt, tilalmat fejez ki: „nem szabad". Táblákon, házirendben gyakori; egy embernek szemtől szemben mondva kemény, oda a 〜ないでください illik.',
        examples: [
          { jp: 'ここでたばこを{吸|す}ってはいけません。', romaji: 'Koko de tabako o sutte wa ikemasen.', hu: 'Itt tilos dohányozni.' },
          { jp: '{美術館|びじゅつかん}で{写真|しゃしん}を{撮|と}ってはいけません。', romaji: 'Bijutsukan de shashin o totte wa ikemasen.', hu: 'A múzeumban tilos fényképezni.' },
          { jp: 'この{部屋|へや}に{入|はい}ってはいけません。', romaji: 'Kono heya ni haitte wa ikemasen.', hu: 'Ebbe a szobába tilos belépni.' }
        ]
      },
      {
        title: '〜てもいいですか', sub: 'szabad? (és a válaszok)',
        pattern: 'ige て-alak + もいいですか',
        body: 'Az engedélykérést már ismered. Az igenlő válasz: <b>ええ、いいですよ</b> vagy <b>どうぞ</b>. A tiltó válasz: <b>いいえ、いけません</b> (szabály), vagy udvariasabban a <b>〜ないでください</b>.',
        examples: [
          { jp: 'この{電話|でんわ}を{使|つか}ってもいいですか。', romaji: 'Kono denwa o tsukatte mo ii desu ka.', hu: 'Használhatom ezt a telefont?' },
          { jp: 'ええ、いいですよ。どうぞ。', romaji: 'Ee, ii desu yo. Dōzo.', hu: 'Persze, tessék.' },
          { jp: 'すみません、ここでは{使|つか}わないでください。', romaji: 'Sumimasen, koko de wa tsukawanaide kudasai.', hu: 'Elnézést, itt kérem, ne használja.' }
        ]
      },
      {
        title: 'A は B で、C は D です', sub: 'két állítás egy mondatban',
        pattern: 'A は B で、C は D です',
        body: 'A <b>で</b> itt a です て-alakja: két főneves (vagy な-mellékneves) mondatot köt össze. Az első fél végén nem áll です, csak で.',
        examples: [
          { jp: '{兄|あに}は{会社員|かいしゃいん}で、{姉|あね}は{学生|がくせい}です。', romaji: 'Ani wa kaishain de, ane wa gakusei desu.', hu: 'A bátyám irodai dolgozó, a nővérem diák.' },
          { jp: '{朝|あさ}ごはんは{七時|しちじ}からで、{夕|ゆう}ごはんは{六時|ろくじ}からです。', romaji: 'Asagohan wa shichiji kara de, yūgohan wa rokuji kara desu.', hu: 'A reggeli hét órától van, a vacsora hattól.' },
          { jp: 'これは{部屋|へや}の{鍵|かぎ}で、あれは{玄関|げんかん}の{鍵|かぎ}です。', romaji: 'Kore wa heya no kagi de, are wa genkan no kagi desu.', hu: 'Ez a szoba kulcsa, az pedig a bejárati ajtóé.' }
        ]
      }
    ],
    quiz: [
      { q: '„Gyerekkoromban Tokióban laktam." Mi hiányzik?', jp: '{子|こ}ども＿とき、{東京|とうきょう}に{住|す}んでいました。', a: 'の', wrong: ['な', 'だ', 'に'],
        why: 'Főnév után: のとき.' },
      { q: '„Amikor ráérek, olvasok." Mi hiányzik?', jp: '{暇|ひま}＿とき、{本|ほん}を{読|よ}みます。', a: 'な', wrong: ['の', 'だ', 'い'],
        why: 'な-melléknév után: なとき.' },
      { q: 'Mit jelent: {日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。', a: 'Japánban vettem a táskát, amikor már ott voltam.',
        wrong: ['Az út előtt, még itthon vettem a táskát.', 'Japánba menet elveszett a táskám.', 'Japánban szeretnék táskát venni.'],
        why: 'た-alak + とき: az odautazás már megtörtént, amikor vásároltál.' },
      { q: '„Itt tilos dohányozni." Mi hiányzik?', jp: 'ここでたばこを{吸|す}って＿。', a: 'はいけません', wrong: ['もいいです', 'ください', 'みます'],
        why: 'Tilalom: て-alak + はいけません.' },
      { q: '„A múzeumban tilos fényképezni." Mi hiányzik?', jp: '{美術館|びじゅつかん}で{写真|しゃしん}を＿はいけません。', a: '{撮|と}って', wrong: ['{撮|と}る', '{撮|と}った', '{撮|と}り'],
        why: 'A はいけません előtt て-alak áll.' },
      { q: '„A bátyám irodai dolgozó, a nővérem diák." Mi hiányzik?', jp: '{兄|あに}は{会社員|かいしゃいん}＿、{姉|あね}は{学生|がくせい}です。', a: 'で', wrong: ['と', 'も', 'くて'],
        why: 'A です て-alakja で: ez köti össze a két állítást.' },
      { q: 'Valaki megkérdezi: ここに{車|くるま}を{止|と}めてもいいですか。 Melyik válasz tiltja meg?', a: 'いいえ、{止|と}めてはいけません。',
        wrong: ['ええ、いいですよ。', 'はい、どうぞ。', 'いいえ、{止|と}めてもいいです。'],
        why: 'A tiltás: 〜てはいけません.' },
      { q: '„Amikor hideg van, kabátot veszek." Mi hiányzik?', jp: '＿とき、コートを{着|き}ます。', a: '{寒|さむ}い', wrong: ['{寒|さむ}いの', '{寒|さむ}いな', '{寒|さむ}くて'],
        why: 'い-melléknév közvetlenül áll a とき előtt.' },
      { q: 'Melyik mondat mondja azt, hogy a táskát még az út előtt vetted?', a: '{日本|にほん}へ{行|い}くとき、かばんを{買|か}いました。',
        wrong: ['{日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。', '{日本|にほん}へ{行|い}って、かばんを{買|か}いました。', '{日本|にほん}でかばんを{買|か}ったことがあります。'],
        why: 'Szótári alak + とき: az utazás még nem zárult le, amikor vásároltál.' },
      { q: '„Ebbe a szobába tilos belépni." Mi hiányzik?', jp: 'この{部屋|へや}に＿はいけません。', a: '{入|はい}って', wrong: ['{入|はい}て', '{入|はい}いて', '{入|はい}りて'],
        why: 'A {入|はい}ります 1. csoportú ige: り → って.' }
    ]
  },

  /* ── 18. lecke ────────────────────────────────────── */
  {
    id: 'l18', no: 18, book: 'Dekiru 1',
    title: 'Készülődés',
    lead: 'Bizonytalan feltevést mondasz, elmondod, mi hogyan változik és mit határoztál el, és megismered az adás-kapás tiszteleti igéit.',
    cando: [
      'Megmondod, mi fordulhat elő.',
      'Elmondod, mi lett valamiből, és mit döntöttél el.',
      'Tisztelettel beszélsz arról, mit adtál a tanárodnak és mit kaptál tőle.'
    ],
    points: [
      {
        title: '〜かもしれません', sub: 'lehet, hogy…',
        pattern: 'rövid alak + かもしれません',
        body: 'Bizonytalan lehetőséget fejez ki: „meglehet, talán". Rövid alak áll előtte; főnév és な-melléknév után közvetlenül, だ nélkül. Gyengébb, mint a 〜でしょう (valószínűleg).',
        examples: [
          { jp: 'あしたは{雨|あめ}が{降|ふ}るかもしれません。', romaji: 'Ashita wa ame ga furu kamo shiremasen.', hu: 'Lehet, hogy holnap esni fog.' },
          { jp: '{電車|でんしゃ}は{遅|おく}れるかもしれません。', romaji: 'Densha wa okureru kamo shiremasen.', hu: 'Lehet, hogy késik a vonat.' },
          { jp: 'あの{人|ひと}は{先生|せんせい}かもしれません。', romaji: 'Ano hito wa sensei kamo shiremasen.', hu: 'Lehet, hogy az az ember tanár.' }
        ]
      },
      {
        title: '〜くなります・〜になります', sub: 'valamilyenné válik',
        pattern: 'い → くなります · な-melléknév / főnév + になります',
        body: 'A <b>なります</b> változást jelent: valami magától más lesz. Az い-melléknév végén い helyett <b>く</b> áll, a な-melléknév és a főnév <b>に</b>-t kap.',
        examples: [
          { jp: 'だんだん{寒|さむ}くなります。', romaji: 'Dandan samuku narimasu.', hu: 'Egyre hidegebb lesz.' },
          { jp: '{日本語|にほんご}が{上手|じょうず}になりました。', romaji: 'Nihongo ga jōzu ni narimashita.', hu: 'Jobban megy már a japán.' },
          { jp: '{弟|おとうと}は{医者|いしゃ}になりました。', romaji: 'Otōto wa isha ni narimashita.', hu: 'Az öcsém orvos lett.' }
        ]
      },
      {
        title: '〜く・〜に + ige', sub: 'melléknévből határozó',
        pattern: 'い → く + ige · な-melléknév + に + ige',
        body: 'Ugyanezzel a két végződéssel lesz a melléknévből határozó: „hogyan?". A {早|はや}い-ból {早|はや}く (korán, gyorsan), a きれい-ből きれいに (szépen).',
        examples: [
          { jp: '{毎朝|まいあさ}{早|はや}く{起|お}きます。', romaji: 'Maiasa hayaku okimasu.', hu: 'Minden reggel korán kelek.' },
          { jp: '{字|じ}をきれいに{書|か}いてください。', romaji: 'Ji o kirei ni kaite kudasai.', hu: 'Kérem, írja szépen a betűket.' },
          { jp: '{静|しず}かに{歩|ある}きましょう。', romaji: 'Shizuka ni arukimashō.', hu: 'Menjünk csendben.' }
        ]
      },
      {
        title: '〜ことにします', sub: 'úgy döntök, hogy…',
        pattern: 'szótári alak / ない-alak + ことにします',
        body: 'A saját elhatározásodat fejezi ki. Múlt időben (<b>ことにしました</b>) azt jelenti: a döntés már megszületett.',
        examples: [
          { jp: '{夏休|なつやす}みに{日本|にほん}へ{行|い}くことにしました。', romaji: 'Natsuyasumi ni Nihon e iku koto ni shimashita.', hu: 'Úgy döntöttem, hogy a nyári szünetben Japánba megyek.' },
          { jp: '{今日|きょう}から{毎朝|まいあさ}{走|はし}ることにします。', romaji: 'Kyō kara maiasa hashiru koto ni shimasu.', hu: 'Elhatároztam, hogy mától minden reggel futok.' },
          { jp: 'お{酒|さけ}を{飲|の}まないことにしました。', romaji: 'Osake o nomanai koto ni shimashita.', hu: 'Úgy döntöttem, hogy nem iszom alkoholt.' }
        ],
        tip: 'Főnévvel: コーヒーにします (ezt választom). Igével: {行|い}くことにします (így döntök).'
      },
      {
        title: 'さしあげます', sub: 'adok (tisztelettel)',
        pattern: 'A は B に C を さしあげます',
        body: 'Az あげます tiszteleti párja: tanárnak, főnöknek, vendégnek, idősebbnek adsz valamit.',
        examples: [
          { jp: '{先生|せんせい}に{花|はな}をさしあげました。', romaji: 'Sensei ni hana o sashiagemashita.', hu: 'Virágot adtam a tanárnak.' },
          { jp: 'お{客|きゃく}さんにお{茶|ちゃ}をさしあげます。', romaji: 'Okyaku-san ni ocha o sashiagemasu.', hu: 'Teát adok a vendégnek.' },
          { jp: '{社長|しゃちょう}に{何|なに}をさしあげますか。', romaji: 'Shachō ni nani o sashiagemasu ka.', hu: 'Mit adsz az igazgatónak?' }
        ]
      },
      {
        title: 'くださいます・いただきます', sub: 'ad nekem · kapok (tisztelettel)',
        pattern: 'A が C を くださいます · A に C を いただきます',
        body: 'A くれます tiszteleti párja a <b>くださいます</b>, a もらいます-é az <b>いただきます</b>. A partikulák ugyanazok: aki ad, <b>が</b>-t kap a くださいます mellett, és <b>に</b>-t az いただきます mellett.',
        examples: [
          { jp: '{先生|せんせい}が{本|ほん}をくださいました。', romaji: 'Sensei ga hon o kudasaimashita.', hu: 'A tanár adott nekem egy könyvet.' },
          { jp: '{先生|せんせい}に{辞書|じしょ}をいただきました。', romaji: 'Sensei ni jisho o itadakimashita.', hu: 'Szótárat kaptam a tanártól.' },
          { jp: '{部長|ぶちょう}がお{土産|みやげ}をくださいました。', romaji: 'Buchō ga omiyage o kudasaimashita.', hu: 'Az osztályvezető szuvenírt adott nekem.' }
        ],
        tip: 'A くださる ます-alakja rendhagyó: くださいます (nem くださります).'
      }
    ],
    quiz: [
      { q: '„Lehet, hogy holnap esni fog." Mi hiányzik?', jp: 'あしたは{雨|あめ}が{降|ふ}る＿。', a: 'かもしれません', wrong: ['ことにします', 'になります', 'てはいけません'],
        why: 'Bizonytalan lehetőség: rövid alak + かもしれません.' },
      { q: 'Melyik mondat helyes: „Lehet, hogy az az ember tanár."', a: 'あの{人|ひと}は{先生|せんせい}かもしれません。',
        wrong: ['あの{人|ひと}は{先生|せんせい}だかもしれません。', 'あの{人|ひと}は{先生|せんせい}なかもしれません。', 'あの{人|ひと}は{先生|せんせい}のかもしれません。'],
        why: 'Főnév után közvetlenül áll a かもしれません, だ nélkül.' },
      { q: '„Egyre hidegebb lesz." Mi hiányzik?', jp: 'だんだん＿なります。', a: '{寒|さむ}く', wrong: ['{寒|さむ}い', '{寒|さむ}いに', '{寒|さむ}に'],
        why: 'い-melléknév + なります: い → く.' },
      { q: '„Az öcsém orvos lett." Mi hiányzik?', jp: '{弟|おとうと}は{医者|いしゃ}＿なりました。', a: 'に', wrong: ['く', 'を', 'で'],
        why: 'Főnév + になります.' },
      { q: '„Kérem, írja szépen a betűket." Mi hiányzik?', jp: '{字|じ}を＿{書|か}いてください。', a: 'きれいに', wrong: ['きれいく', 'きれいな', 'きれいで'],
        why: 'A きれい な-melléknév: határozóként きれいに.' },
      { q: '„Úgy döntöttem, hogy Japánba megyek." Mi hiányzik?', jp: '{日本|にほん}へ{行|い}く＿にしました。', a: 'こと', wrong: ['もの', 'とき', 'の'],
        why: 'Elhatározás: szótári alak + ことにします.' },
      { q: 'Mit jelent: お{酒|さけ}を{飲|の}まないことにしました。', a: 'Úgy döntöttem, hogy nem iszom alkoholt.',
        wrong: ['Nem szabad alkoholt innom.', 'Lehet, hogy nem iszom alkoholt.', 'Még soha nem ittam alkoholt.'],
        why: 'ない-alak + ことにしました: úgy döntöttem, hogy nem…' },
      { q: '„Virágot adtam a tanárnak." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}に{花|はな}を＿。', a: 'さしあげました', wrong: ['くださいました', 'いただきました', 'くれました'],
        why: 'Tisztelt személynek adok: さしあげます.' },
      { q: '„Szótárat kaptam a tanártól." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}に{辞書|じしょ}を＿。', a: 'いただきました', wrong: ['さしあげました', 'くださいました', 'あげました'],
        why: 'Tisztelt személytől kapok: いただきます.' },
      { q: 'Melyik a くれます tiszteleti párja?', a: 'くださいます', wrong: ['いただきます', 'さしあげます', 'もらいます'],
        why: 'くれます → くださいます · もらいます → いただきます · あげます → さしあげます.' }
    ]
  },

  /* ── 19. lecke ────────────────────────────────────── */
  {
    id: 'l19', no: 19, book: 'Dekiru 1',
    title: 'Úton',
    lead: 'Megmondod, mit kell megtenned és mit nem, elmondod, hogyan és merre mész, és kifejezed, hogy valamiből csak ennyi van.',
    cando: [
      'Megmondod, mit kell megtenned.',
      'Útbaigazítást kérsz, és megérted a választ.',
      'Kifejezed, hogy valamiből csak kevés van.'
    ],
    points: [
      {
        title: '〜なければなりません', sub: 'kell',
        pattern: 'ない-alak: ない → なければなりません',
        body: 'Kötelességet fejez ki. A ない-alak végéről elhagyod a い-t, és jön a <b>ければなりません</b>: {行|い}かない → {行|い}かなければなりません. Szó szerint: „ha nem megyek, az nem lesz jó".',
        examples: [
          { jp: '{毎日|まいにち}{薬|くすり}を{飲|の}まなければなりません。', romaji: 'Mainichi kusuri o nomanakereba narimasen.', hu: 'Minden nap be kell vennem a gyógyszert.' },
          { jp: 'あした{早|はや}く{起|お}きなければなりません。', romaji: 'Ashita hayaku okinakereba narimasen.', hu: 'Holnap korán kell kelnem.' },
          { jp: '{七時|しちじ}までに{駅|えき}へ{行|い}かなければなりません。', romaji: 'Shichiji made ni eki e ikanakereba narimasen.', hu: 'Hét óráig az állomásra kell érnem.' }
        ]
      },
      {
        title: '〜なくてもいいです', sub: 'nem kell',
        pattern: 'ない-alak: ない → なくてもいいです',
        body: 'A „kell" ellentéte: nem kötelező. Szintén a ない-alakból indul: {来|こ}ない → {来|こ}なくてもいいです.',
        examples: [
          { jp: 'あしたは{来|こ}なくてもいいです。', romaji: 'Ashita wa konakute mo ii desu.', hu: 'Holnap nem kell jönnöd.' },
          { jp: '{急|いそ}がなくてもいいですよ。', romaji: 'Isoganakute mo ii desu yo.', hu: 'Nem kell sietned.' },
          { jp: '{全部|ぜんぶ}{食|た}べなくてもいいです。', romaji: 'Zenbu tabenakute mo ii desu.', hu: 'Nem kell mindet megenned.' }
        ],
        tip: 'Ne keverd: 〜てはいけません = tilos · 〜なくてもいいです = nem kötelező.'
      },
      {
        title: '〜ていきます', sub: 'hogyan megyek',
        pattern: 'ige て-alak + いきます',
        body: 'A て-alak megmondja, <i>hogyan</i> vagy <i>mivel</i> együtt mész: gyalog, valamit víve, valakit kísérve.',
        examples: [
          { jp: '{駅|えき}まで{歩|ある}いていきます。', romaji: 'Eki made aruite ikimasu.', hu: 'Az állomásig gyalog megyek.' },
          { jp: '{傘|かさ}を{持|も}っていきます。', romaji: 'Kasa o motte ikimasu.', hu: 'Viszek esernyőt.' },
          { jp: '{友|とも}だちを{連|つ}れていきます。', romaji: 'Tomodachi o tsurete ikimasu.', hu: 'Elviszem a barátomat is.' }
        ]
      },
      {
        title: '〜を (útvonal)', sub: 'min át, miről le',
        pattern: 'hely + を + mozgást jelentő ige',
        body: 'Mozgást jelentő igéknél a <b>を</b> azt a helyet jelöli, amelyen áthaladsz ({道|みち}を{行|い}く, {橋|はし}を{渡|わた}る, {角|かど}を{曲|ま}がる), vagy amelyet elhagysz ({電車|でんしゃ}を{降|お}りる).',
        examples: [
          { jp: '{次|つぎ}の{駅|えき}で{電車|でんしゃ}を{降|お}ります。', romaji: 'Tsugi no eki de densha o orimasu.', hu: 'A következő állomáson leszállok a vonatról.' },
          { jp: 'この{道|みち}をまっすぐ{行|い}ってください。', romaji: 'Kono michi o massugu itte kudasai.', hu: 'Menjen egyenesen ezen az úton.' },
          { jp: '{二|ふた}つ{目|め}の{角|かど}を{右|みぎ}に{曲|ま}がります。', romaji: 'Futatsume no kado o migi ni magarimasu.', hu: 'A második saroknál jobbra fordulok.' },
          { jp: '{橋|はし}を{渡|わた}ります。', romaji: 'Hashi o watarimasu.', hu: 'Átmegyek a hídon.' }
        ]
      },
      {
        title: '〜だけ・〜しか', sub: 'csak',
        pattern: 'だけ + állítás · しか + tagadás',
        body: 'Mindkettő „csak", de a <b>しか</b> mindig tagadó igével áll, és azt is kifejezi, hogy keveselled. A <b>だけ</b> semleges.',
        examples: [
          { jp: '{千円|せんえん}だけあります。', romaji: 'Sen-en dake arimasu.', hu: 'Csak ezer jenem van.' },
          { jp: '{千円|せんえん}しかありません。', romaji: 'Sen-en shika arimasen.', hu: 'Mindössze ezer jenem van.' },
          { jp: '{日曜日|にちようび}しか{休|やす}みません。', romaji: 'Nichiyōbi shika yasumimasen.', hu: 'Csak vasárnap pihenek.' }
        ]
      },
      {
        title: '〜は (kiemelés)', sub: 'ami azt illeti',
        pattern: 'を / が → は · に / で + は',
        body: 'A <b>は</b> szembeállít és kiemel, főleg tagadásban: „ezt éppen nem (mást talán igen)". Az を és a が helyére lép; a に, で mögé odaáll.',
        examples: [
          { jp: 'お{酒|さけ}は{飲|の}みません。', romaji: 'Osake wa nomimasen.', hu: 'Alkoholt nem iszom.' },
          { jp: '{土曜日|どようび}には{行|い}きません。', romaji: 'Doyōbi ni wa ikimasen.', hu: 'Szombaton éppen nem megyek.' },
          { jp: 'ここでは{写真|しゃしん}を{撮|と}らないでください。', romaji: 'Koko de wa shashin o toranaide kudasai.', hu: 'Itt kérem, ne fényképezzen.' }
        ]
      }
    ],
    quiz: [
      { q: '„Holnap korán kell kelnem." Mi hiányzik?', jp: 'あした{早|はや}く＿なりません。', a: '{起|お}きなければ', wrong: ['{起|お}きれば', '{起|お}きなくて', '{起|お}きないで'],
        why: 'ない-alak: {起|お}きない → {起|お}きなければなりません.' },
      { q: 'Hogyan mondod: „Be kell vennem (meg kell innom)."', a: '{飲|の}まなければなりません。',
        wrong: ['{飲|の}みなければなりません。', '{飲|の}まなくてもいいです。', '{飲|の}んではいけません。'],
        why: '{飲|の}まない → {飲|の}まなければなりません.' },
      { q: 'Mit jelent: {急|いそ}がなくてもいいですよ。', a: 'Nem kell sietned.', wrong: ['Nem szabad sietned.', 'Sietned kell.', 'Siethetsz.'],
        why: '〜なくてもいいです = nem kötelező.' },
      { q: '„Az állomásig gyalog megyek." Mi hiányzik?', jp: '{駅|えき}まで＿いきます。', a: '{歩|ある}いて', wrong: ['{歩|ある}きて', '{歩|ある}いた', '{歩|ある}く'],
        why: 'Hogyan megyek: て-alak + いきます; き → いて.' },
      { q: '„Leszállok a vonatról." Mi hiányzik?', jp: '{電車|でんしゃ}＿{降|お}ります。', a: 'を', wrong: ['に', 'で', 'へ'],
        why: 'Amit elhagysz, を-t kap: {電車|でんしゃ}を{降|お}ります.' },
      { q: '„A saroknál jobbra fordulok." Mi hiányzik?', jp: '{角|かど}を{右|みぎ}＿{曲|ま}がります。', a: 'に', wrong: ['を', 'で', 'が'],
        why: 'A sarok (amin áthaladsz) を, az irány に.' },
      { q: '„Mindössze ezer jenem van." Mi hiányzik?', jp: '{千円|せんえん}＿ありません。', a: 'しか', wrong: ['だけ', 'まで', 'より'],
        why: 'Tagadó igével a しか jelenti: „csak ennyi".' },
      { q: '„Csak ezer jenem van." Mi hiányzik?', jp: '{千円|せんえん}だけ＿。', a: 'あります', wrong: ['ありません', 'いません', 'います'],
        why: 'A だけ állító igével áll.' },
      { q: 'Mit jelent: お{酒|さけ}は{飲|の}みません。', a: 'Alkoholt nem iszom (mást talán igen).',
        wrong: ['Csak alkoholt iszom.', 'Nem szabad alkoholt inni.', 'Alkoholt is iszom.'],
        why: 'A は tagadásban szembeállít: éppen ezt nem.' },
      { q: '„Viszek esernyőt." Mi hiányzik?', jp: '{傘|かさ}を＿いきます。', a: '{持|も}って', wrong: ['{持|も}ちて', '{持|も}て', '{持|も}んで'],
        why: '{持|も}ちます → {持|も}って; て-alak + いきます.' }
    ]
  },

  /* ── 20. lecke ────────────────────────────────────── */
  {
    id: 'l20', no: 20, book: 'Dekiru 1',
    title: 'Városnézés',
    lead: 'Megkülönbözteted, hogy valaki csinál valamit vagy az magától történik, leírod egy tárgy állapotát, és megnevezel számodra ismeretlen dolgokat.',
    cando: [
      'Bemutatod a városod nevezetességeit.',
      'Megmondod, mi van nyitva, bekapcsolva, zárva.',
      'Rákérdezel valaminek a nevére.'
    ],
    points: [
      {
        title: 'Tárgyas és tárgyatlan igék', sub: 'kinyitom · kinyílik',
        pattern: 'A が B を + tárgyas ige · B が + tárgyatlan ige',
        body: 'Sok ige párban él. A <b>tárgyas</b> ige mellett valaki tesz valamit egy tárggyal (を): {開|あ}けます. A <b>tárgyatlan</b> ige mellett a dolog magától változik (が): {開|あ}きます. Gyakori párok: {閉|し}めます / {閉|し}まります, つけます / つきます, {消|け}します / {消|き}えます, {始|はじ}めます / {始|はじ}まります, {止|と}めます / {止|と}まります.',
        examples: [
          { jp: '{私|わたし}は{窓|まど}を{開|あ}けます。', romaji: 'Watashi wa mado o akemasu.', hu: 'Kinyitom az ablakot.' },
          { jp: '{窓|まど}が{開|あ}きます。', romaji: 'Mado ga akimasu.', hu: 'Kinyílik az ablak.' },
          { jp: '{電気|でんき}を{消|け}しました。', romaji: 'Denki o keshimashita.', hu: 'Lekapcsoltam a villanyt.' },
          { jp: '{電気|でんき}が{消|き}えました。', romaji: 'Denki ga kiemashita.', hu: 'Kialudt a villany.' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'nyitva van, be van kapcsolva',
        pattern: 'B が + tárgyatlan ige て-alak + います',
        body: 'A tárgyatlan ige + <b>ています</b> nem folyamatot jelent, hanem az eredményt: a változás megtörtént, és az állapot most is fennáll.',
        examples: [
          { jp: '{窓|まど}が{開|あ}いています。', romaji: 'Mado ga aite imasu.', hu: 'Nyitva van az ablak.' },
          { jp: '{店|みせ}が{閉|し}まっています。', romaji: 'Mise ga shimatte imasu.', hu: 'Zárva van a bolt.' },
          { jp: 'テレビがついています。', romaji: 'Terebi ga tsuite imasu.', hu: 'Be van kapcsolva a tévé.' }
        ]
      },
      {
        title: 'A か B か', sub: 'vagy · -e',
        pattern: 'A か B (か)',
        body: 'Két lehetőség között a <b>か</b> áll: „A vagy B". Igével és a tagadó párjával azt jelenti: „megteszem-e vagy sem".',
        examples: [
          { jp: 'バスか{電車|でんしゃ}で{行|い}きます。', romaji: 'Basu ka densha de ikimasu.', hu: 'Busszal vagy vonattal megyek.' },
          { jp: '{行|い}くか{行|い}かないか、まだわかりません。', romaji: 'Iku ka ikanai ka, mada wakarimasen.', hu: 'Még nem tudom, megyek-e vagy sem.' },
          { jp: 'コーヒーか{紅茶|こうちゃ}か、{決|き}めてください。', romaji: 'Kōhī ka kōcha ka, kimete kudasai.', hu: 'Döntse el: kávé vagy tea.' }
        ]
      },
      {
        title: '〜で (összesen)', sub: 'ennyiért, ennyien, ennyi idő alatt',
        pattern: 'mennyiség + で',
        body: 'Mennyiség után a <b>で</b> a keretet adja meg: ennyi darab együtt, ennyi ember együtt, ennyi idő alatt.',
        examples: [
          { jp: 'これは{三|みっ}つで{五百円|ごひゃくえん}です。', romaji: 'Kore wa mittsu de gohyaku-en desu.', hu: 'Ebből három darab ötszáz jen.' },
          { jp: '{全部|ぜんぶ}でいくらですか。', romaji: 'Zenbu de ikura desu ka.', hu: 'Összesen mennyibe kerül?' },
          { jp: '{二人|ふたり}で{行|い}きます。', romaji: 'Futari de ikimasu.', hu: 'Ketten megyünk.' },
          { jp: '{一時間|いちじかん}で{終|お}わります。', romaji: 'Ichijikan de owarimasu.', hu: 'Egy óra alatt véget ér.' }
        ]
      },
      {
        title: 'どちらか・どちらも', sub: 'valamelyik · mindkettő',
        pattern: 'どちらか + állítás · どちらも + állítás / tagadás',
        body: 'Kettő közül: <b>どちらか</b> = az egyik, valamelyik; <b>どちらも</b> = mindkettő, tagadással egyik sem.',
        examples: [
          { jp: 'どちらか{一|ひと}つ{選|えら}んでください。', romaji: 'Dochira ka hitotsu erande kudasai.', hu: 'Válasszon egyet a kettő közül.' },
          { jp: 'どちらもおいしいです。', romaji: 'Dochira mo oishii desu.', hu: 'Mindkettő finom.' },
          { jp: 'どちらも{好|す}きじゃありません。', romaji: 'Dochira mo suki ja arimasen.', hu: 'Egyiket sem szeretem.' }
        ]
      },
      {
        title: '〜という', sub: '… nevű',
        pattern: 'A という B',
        body: 'Ha a másik valószínűleg nem ismeri a nevet (vagy te nem ismered), a <b>という</b> kapcsolja a nevet a főnévhez: „egy A nevű B".',
        examples: [
          { jp: '「さくら」というレストランを{知|し}っていますか。', romaji: '"Sakura" to iu resutoran o shitte imasu ka.', hu: 'Ismered a Szakura nevű éttermet?' },
          { jp: 'これは{何|なん}という{花|はな}ですか。', romaji: 'Kore wa nan to iu hana desu ka.', hu: 'Mi a neve ennek a virágnak?' },
          { jp: '{田中|たなか}さんという{人|ひと}から{電話|でんわ}がありました。', romaji: 'Tanaka-san to iu hito kara denwa ga arimashita.', hu: 'Egy Tanaka nevű ember telefonált.' }
        ]
      }
    ],
    quiz: [
      { q: '„Kinyitom az ablakot." Mi hiányzik?', jp: '{窓|まど}＿{開|あ}けます。', a: 'を', wrong: ['が', 'に', 'で'],
        why: 'A {開|あ}けます tárgyas ige: a tárgya を-t kap.' },
      { q: '„Kinyílik az ablak." Mi hiányzik?', jp: '{窓|まど}＿{開|あ}きます。', a: 'が', wrong: ['を', 'に', 'で'],
        why: 'A {開|あ}きます tárgyatlan: ami változik, が-t kap.' },
      { q: 'Melyik ige tárgyatlan (magától történik)?', a: '{消|き}える', wrong: ['{消|け}す', '{開|あ}ける', '{閉|し}める'],
        why: '{消|け}す = lekapcsol, {消|き}える = kialszik.' },
      { q: '„Zárva van a bolt." Mi hiányzik?', jp: '{店|みせ}が＿います。', a: '{閉|し}まって', wrong: ['{閉|し}めて', '{閉|し}まり', '{閉|し}まった'],
        why: 'Állapot: tárgyatlan ige ({閉|し}まります) て-alakja + います.' },
      { q: 'Mit jelent: テレビがついています。', a: 'Be van kapcsolva a tévé.', wrong: ['Bekapcsolom a tévét.', 'Elromlott a tévé.', 'Ki van kapcsolva a tévé.'],
        why: 'Tárgyatlan ige + ています: fennálló állapot.' },
      { q: '„Busszal vagy vonattal megyek." Mi hiányzik?', jp: 'バス＿{電車|でんしゃ}で{行|い}きます。', a: 'か', wrong: ['と', 'も', 'を'],
        why: 'A か B = A vagy B.' },
      { q: '„Ebből három darab ötszáz jen." Mi hiányzik?', jp: 'これは{三|みっ}つ＿{五百円|ごひゃくえん}です。', a: 'で', wrong: ['に', 'を', 'が'],
        why: 'Mennyiség + で: ennyi együtt.' },
      { q: '„Mindkettő finom." Mi hiányzik?', jp: '＿おいしいです。', a: 'どちらも', wrong: ['どちらか', 'どちらが', 'どれか'],
        why: 'どちらも = mindkettő.' },
      { q: '„Mi a neve ennek a virágnak?" Mi hiányzik?', jp: 'これは{何|なん}＿{花|はな}ですか。', a: 'という', wrong: ['といい', 'とか', 'のと'],
        why: 'A という B: „A nevű B".' },
      { q: 'Melyik mondat jelenti: „Lekapcsoltam a villanyt."', a: '{電気|でんき}を{消|け}しました。',
        wrong: ['{電気|でんき}が{消|き}えました。', '{電気|でんき}が{消|き}えています。', '{電気|でんき}をつけました。'],
        why: 'Én tettem: tárgyas ige ({消|け}します) を-val.' }
    ]
  },

  /* ── 21. lecke ────────────────────────────────────── */
  {
    id: 'l21', no: 21, book: 'Dekiru 1',
    title: 'Minden készen áll',
    lead: 'Megmondod, mit milyenné teszel, leírod, mi van már előkészítve, és elmondod, minek hívnak valamit és ki mit mondott.',
    cando: [
      'Megkérsz valakit, hogy tegyen valamit halkabbá, világosabbá, rendesebbé.',
      'Leírod, mi van előkészítve egy teremben.',
      'Megmondod, hogy mondanak valamit japánul, és visszaadod, amit más mondott.'
    ],
    points: [
      {
        title: '〜くします・〜にします', sub: 'valamilyenné tesz',
        pattern: 'い → くします · な-melléknév + にします',
        body: 'A <b>します</b> itt azt jelenti: valaki szándékosan megváltoztat valamit. Ugyanúgy kapcsolódik, mint a なります: い-melléknévnél <b>く</b>, な-melléknévnél <b>に</b>.',
        examples: [
          { jp: '{部屋|へや}を{明|あか}るくします。', romaji: 'Heya o akaruku shimasu.', hu: 'Világosabbá teszem a szobát.' },
          { jp: 'テレビの{音|おと}を{小|ちい}さくしてください。', romaji: 'Terebi no oto o chiisaku shite kudasai.', hu: 'Kérem, halkítsa le a tévét.' },
          { jp: '{部屋|へや}をきれいにしました。', romaji: 'Heya o kirei ni shimashita.', hu: 'Rendbe tettem a szobát.' }
        ],
        tip: 'なります: magától lesz olyan ({部屋|へや}が{明|あか}るくなります). します: valaki teszi olyanná ({部屋|へや}を{明|あか}るくします).'
      },
      {
        title: 'főnév + にします', sub: 'valamivé tesz',
        pattern: 'A を B にします',
        body: 'Főnévvel ugyanez: valamit valamivé alakítasz, vagy valamilyen értékre állítasz. (A „ezt választom" jelentésű にします ennek rokona.)',
        examples: [
          { jp: 'この{部屋|へや}を{子|こ}ども{部屋|べや}にします。', romaji: 'Kono heya o kodomobeya ni shimasu.', hu: 'Ebből a szobából gyerekszobát csinálok.' },
          { jp: '{会議|かいぎ}を{三時|さんじ}からにします。', romaji: 'Kaigi o sanji kara ni shimasu.', hu: 'Háromra teszem a megbeszélést.' },
          { jp: 'ケーキを{半分|はんぶん}にしてください。', romaji: 'Kēki o hanbun ni shite kudasai.', hu: 'Kérem, vágja félbe a tortát.' }
        ]
      },
      {
        title: '〜てあります', sub: 'el van készítve',
        pattern: 'B が + tárgyas ige て-alak + あります',
        body: 'Valaki valamilyen céllal megtett valamit, és az eredménye most is látszik. Tárgyas ige áll benne, de a tárgy <b>が</b>-t kap, mert az állapotáról beszélsz.',
        examples: [
          { jp: '{窓|まど}が{開|あ}けてあります。', romaji: 'Mado ga akete arimasu.', hu: 'Ki van nyitva az ablak (valaki kinyitotta).' },
          { jp: '{黒板|こくばん}に{名前|なまえ}が{書|か}いてあります。', romaji: 'Kokuban ni namae ga kaite arimasu.', hu: 'A táblára fel van írva a név.' },
          { jp: '{机|つくえ}の{上|うえ}に{花|はな}が{飾|かざ}ってあります。', romaji: 'Tsukue no ue ni hana ga kazatte arimasu.', hu: 'Az asztalt virággal díszítették.' }
        ]
      },
      {
        title: '〜ています és 〜てあります', sub: 'állapot · szándékos eredmény',
        pattern: 'tárgyatlan + ています · tárgyas + てあります',
        body: 'Mindkettő állapotot ír le. A <b>tárgyatlan ige + ています</b> csak azt mondja, mit látsz. A <b>tárgyas ige + てあります</b> azt is, hogy valaki szándékosan hagyta így.',
        examples: [
          { jp: 'ドアが{開|あ}いています。', romaji: 'Doa ga aite imasu.', hu: 'Nyitva van az ajtó.' },
          { jp: 'ドアが{開|あ}けてあります。', romaji: 'Doa ga akete arimasu.', hu: 'Nyitva hagyták az ajtót.' },
          { jp: '{電気|でんき}がつけてあります。', romaji: 'Denki ga tsukete arimasu.', hu: 'Fel van kapcsolva a villany (valaki felkapcsolta).' }
        ]
      },
      {
        title: '〜といいます', sub: 'úgy hívják · úgy mondják',
        pattern: 'A は B といいます',
        body: 'A <b>と</b> idéző partikula: azt jelöli, amit mondanak vagy aminek neveznek valamit. Bemutatkozáskor szerényebb, mint a です.',
        examples: [
          { jp: '{私|わたし}は{田中|たなか}といいます。', romaji: 'Watashi wa Tanaka to iimasu.', hu: 'Tanakának hívnak.' },
          { jp: 'これは{日本語|にほんご}で{何|なん}といいますか。', romaji: 'Kore wa nihongo de nan to iimasu ka.', hu: 'Hogy mondják ezt japánul?' },
          { jp: '{食事|しょくじ}のまえに「いただきます」といいます。', romaji: 'Shokuji no mae ni "itadakimasu" to iimasu.', hu: 'Evés előtt azt mondják: itadakimasu.' }
        ]
      },
      {
        title: '〜といいました', sub: 'azt mondta, hogy…',
        pattern: 'rövid alak + といいました',
        body: 'Ha más szavait a sajátoddal adod vissza, a と előtt rövid alak áll; főnév és な-melléknév után <b>だ</b> kell.',
        examples: [
          { jp: '{田中|たなか}さんはあした{来|く}ると{言|い}いました。', romaji: 'Tanaka-san wa ashita kuru to iimashita.', hu: 'Tanaka azt mondta, holnap jön.' },
          { jp: '{先生|せんせい}は{試験|しけん}は{簡単|かんたん}だと{言|い}いました。', romaji: 'Sensei wa shiken wa kantan da to iimashita.', hu: 'A tanár azt mondta, a vizsga könnyű.' },
          { jp: '{妹|いもうと}は{行|い}きたくないと{言|い}いました。', romaji: 'Imōto wa ikitakunai to iimashita.', hu: 'A húgom azt mondta, nem akar menni.' }
        ]
      }
    ],
    quiz: [
      { q: '„Kérem, halkítsa le a tévét." Mi hiányzik?', jp: 'テレビの{音|おと}を＿してください。', a: '{小|ちい}さく', wrong: ['{小|ちい}さい', '{小|ちい}さに', '{小|ちい}さくて'],
        why: 'い-melléknév + します: い → く.' },
      { q: '„Rendbe tettem a szobát." Mi hiányzik?', jp: '{部屋|へや}を＿しました。', a: 'きれいに', wrong: ['きれいく', 'きれいな', 'きれいで'],
        why: 'な-melléknév + にします.' },
      { q: 'Mit jelent: {部屋|へや}が{明|あか}るくなりました。', a: 'Világosabb lett a szoba (magától).',
        wrong: ['Világosabbá tettem a szobát.', 'Világosabbá kell tenni a szobát.', 'A szoba nem lett világosabb.'],
        why: 'なります: a változás magától történik; a szoba が-t kap.' },
      { q: '„A táblára fel van írva a név." Mi hiányzik?', jp: '{黒板|こくばん}に{名前|なまえ}が{書|か}いて＿。', a: 'あります', wrong: ['います', 'いきます', 'ください'],
        why: 'Szándékos eredmény: tárgyas ige て-alakja + あります.' },
      { q: '„Ki van nyitva az ablak (valaki kinyitotta)." Mi hiányzik?', jp: '{窓|まど}が＿あります。', a: '{開|あ}けて', wrong: ['{開|あ}いて', '{開|あ}け', '{開|あ}く'],
        why: 'A てあります előtt tárgyas ige áll: {開|あ}けます → {開|あ}けて.' },
      { q: 'Melyik mondat helyes: „Nyitva van az ajtó."', a: 'ドアが{開|あ}いています。',
        wrong: ['ドアを{開|あ}いています。', 'ドアが{開|あ}いてあります。', 'ドアを{開|あ}きます。'],
        why: 'Tárgyatlan ige ({開|あ}きます) + ています, が-val.' },
      { q: '„Tanakának hívnak." Mi hiányzik?', jp: '{私|わたし}は{田中|たなか}＿いいます。', a: 'と', wrong: ['を', 'に', 'が'],
        why: 'Az idéző と jelöli a nevet.' },
      { q: '„Hogy mondják ezt japánul?" Mi hiányzik?', jp: 'これは{日本語|にほんご}で{何|なん}＿。', a: 'といいますか', wrong: ['にしますか', 'がありますか', 'になりますか'],
        why: '{何|なん}といいますか = minek mondják?' },
      { q: '„A tanár azt mondta, a vizsga könnyű." Mi hiányzik?', jp: '{先生|せんせい}は{試験|しけん}は{簡単|かんたん}＿と{言|い}いました。', a: 'だ', wrong: ['な', 'の', 'で'],
        why: 'な-melléknév után だ kell az idéző と elé.' },
      { q: '„Kérem, vágja félbe a tortát." Mi hiányzik?', jp: 'ケーキを{半分|はんぶん}＿してください。', a: 'に', wrong: ['く', 'を', 'で'],
        why: 'Főnév + にします.' }
    ]
  },

  /* ── 22. lecke ────────────────────────────────────── */
  {
    id: 'l22', no: 22, book: 'Dekiru 1',
    title: 'Szívességek',
    lead: 'Elmondod, ki kinek tett szívességet, mit intézel el előre, és mit csinálsz egyszerre.',
    cando: [
      'Megköszönöd, amit érted tettek.',
      'Elmondod, mit készítettél elő egy kirándulásra.',
      'Leírod, mit csinálsz egy időben.'
    ],
    points: [
      {
        title: '〜てあげます', sub: 'megteszem valakinek',
        pattern: 'A は B に + ige て-alak + あげます',
        body: 'Az adás-kapás igéi cselekvésre is átvihetők: a て-alak után azt mutatják, kinek a javára történik valami. <b>てあげます</b>: én (vagy valaki) szívességet tesz másnak.',
        examples: [
          { jp: '{友|とも}だちに{傘|かさ}を{貸|か}してあげました。', romaji: 'Tomodachi ni kasa o kashite agemashita.', hu: 'Kölcsönadtam az esernyőmet a barátomnak.' },
          { jp: '{弟|おとうと}に{宿題|しゅくだい}を{教|おし}えてあげます。', romaji: 'Otōto ni shukudai o oshiete agemasu.', hu: 'Elmagyarázom az öcsémnek a leckét.' },
          { jp: '{荷物|にもつ}を{持|も}ってあげましょうか。', romaji: 'Nimotsu o motte agemashō ka.', hu: 'Vigyem a csomagodat?' }
        ],
        tip: 'Idősebbnek, felettesnek ne mondd szemtől szemben: lekezelően hat. Helyette: {持|も}ちましょうか.'
      },
      {
        title: '〜てくれます', sub: 'megteszi nekem',
        pattern: 'A が + ige て-alak + くれます',
        body: 'Valaki <i>nekem</i> (vagy a hozzám tartozóknak) tesz szívességet. Hálát fejez ki: e nélkül a mondat rideg tényközlés volna.',
        examples: [
          { jp: '{友|とも}だちが{駅|えき}まで{送|おく}ってくれました。', romaji: 'Tomodachi ga eki made okutte kuremashita.', hu: 'A barátom kikísért az állomásig.' },
          { jp: '{母|はは}がお{弁当|べんとう}を{作|つく}ってくれました。', romaji: 'Haha ga obentō o tsukutte kuremashita.', hu: 'Anyám készített nekem uzsonnát.' },
          { jp: '{手伝|てつだ}ってくれて、ありがとう。', romaji: 'Tetsudatte kurete, arigatō.', hu: 'Köszi, hogy segítettél.' }
        ]
      },
      {
        title: '〜てもらいます', sub: 'megkérem, megteszi nekem',
        pattern: 'A は B に + ige て-alak + もらいます',
        body: 'Ugyanaz a helyzet az én szemszögemből: én vagyok az alany, aki a szívességet kapja, a segítő <b>に</b>-t kap. Gyakran azt is jelenti, hogy megkértem rá.',
        examples: [
          { jp: '{友|とも}だちに{写真|しゃしん}を{撮|と}ってもらいました。', romaji: 'Tomodachi ni shashin o totte moraimashita.', hu: 'Megkértem a barátomat, hogy fényképezzen le.' },
          { jp: '{姉|あね}に{英語|えいご}を{教|おし}えてもらいました。', romaji: 'Ane ni eigo o oshiete moraimashita.', hu: 'A nővérem tanított angolra.' },
          { jp: 'だれに{手伝|てつだ}ってもらいましたか。', romaji: 'Dare ni tetsudatte moraimashita ka.', hu: 'Ki segített neked?' }
        ],
        tip: 'てくれます: a segítő az alany (が). てもらいます: én vagyok az alany, a segítő に-t kap.'
      },
      {
        title: '〜ておきます', sub: 'előre megteszem · úgy hagyom',
        pattern: 'ige て-alak + おきます',
        body: 'Két jelentése van: valamit <b>előre</b>, egy későbbi cél érdekében megteszel, vagy valamit <b>úgy hagysz</b>, ahogy van.',
        examples: [
          { jp: '{旅行|りょこう}のまえに、{切符|きっぷ}を{買|か}っておきます。', romaji: 'Ryokō no mae ni, kippu o katte okimasu.', hu: 'Az utazás előtt előre megveszem a jegyet.' },
          { jp: 'ホテルを{予約|よやく}しておきました。', romaji: 'Hoteru o yoyaku shite okimashita.', hu: 'Előre lefoglaltam a szállodát.' },
          { jp: '{窓|まど}を{開|あ}けておいてください。', romaji: 'Mado o akete oite kudasai.', hu: 'Kérem, hagyja nyitva az ablakot.' }
        ]
      },
      {
        title: '〜ながら', sub: 'közben',
        pattern: 'ige ます-tő + ながら、főcselekvés',
        body: 'Ugyanaz az ember két dolgot csinál egyszerre. A ます-alakból elhagyod a ます-t, mögé <b>ながら</b> kerül; a fontosabb cselekvés áll a mondat végén.',
        examples: [
          { jp: '{音楽|おんがく}を{聞|き}きながら、{勉強|べんきょう}します。', romaji: 'Ongaku o kikinagara, benkyō shimasu.', hu: 'Zenehallgatás közben tanulok.' },
          { jp: '{歩|ある}きながら{話|はな}しましょう。', romaji: 'Arukinagara hanashimashō.', hu: 'Beszéljünk séta közben.' },
          { jp: 'テレビを{見|み}ながら{食|た}べないでください。', romaji: 'Terebi o minagara tabenaide kudasai.', hu: 'Kérem, ne egyen tévénézés közben.' }
        ]
      }
    ],
    quiz: [
      { q: '„Kölcsönadtam az esernyőmet a barátomnak." Mi hiányzik?', jp: '{友|とも}だちに{傘|かさ}を{貸|か}して＿。', a: 'あげました', wrong: ['くれました', 'もらいました', 'おきました'],
        why: 'Én teszek szívességet másnak: てあげます.' },
      { q: '„Anyám készített nekem uzsonnát." Mi hiányzik?', jp: '{母|はは}がお{弁当|べんとう}を{作|つく}って＿。', a: 'くれました', wrong: ['あげました', 'もらいました', 'いきました'],
        why: 'Nekem tesz szívességet, és ő az alany: てくれます.' },
      { q: '„Megkértem a barátomat, hogy fényképezzen le." Mi hiányzik?', jp: '{友|とも}だち＿{写真|しゃしん}を{撮|と}ってもらいました。', a: 'に', wrong: ['が', 'を', 'で'],
        why: 'A てもらいます mellett a segítő に-t kap.' },
      { q: 'Melyik mondat jelenti: „A nővérem tanított angolra."', a: '{姉|あね}に{英語|えいご}を{教|おし}えてもらいました。',
        wrong: ['{姉|あね}に{英語|えいご}を{教|おし}えてあげました。', '{姉|あね}が{英語|えいご}を{教|おし}えてもらいました。', '{姉|あね}に{英語|えいご}を{教|おし}えてくれました。'],
        why: 'Én kaptam a szívességet (alany: én), a nővérem に-t kap: てもらいました.' },
      { q: '„Előre lefoglaltam a szállodát." Mi hiányzik?', jp: 'ホテルを{予約|よやく}して＿。', a: 'おきました', wrong: ['いきました', 'くれました', 'あげました'],
        why: 'Előre, későbbi cél érdekében: ておきます.' },
      { q: '„Zenehallgatás közben tanulok." Mi hiányzik?', jp: '{音楽|おんがく}を＿ながら、{勉強|べんきょう}します。', a: '{聞|き}き', wrong: ['{聞|き}いて', '{聞|き}く', '{聞|き}いた'],
        why: 'A ながら előtt a ます-tő áll: {聞|き}きます → {聞|き}き.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けておいてください。', a: 'Kérem, hagyja nyitva az ablakot.',
        wrong: ['Kérem, csukja be az ablakot.', 'Kinyithatom az ablakot?', 'Az ablak ki van nyitva.'],
        why: 'ておきます: úgy hagyni, ahogy van.' },
      { q: 'Mit jelent: {手伝|てつだ}ってくれて、ありがとう。', a: 'Köszi, hogy segítettél.',
        wrong: ['Segítsek?', 'Köszi, de nem kell segítség.', 'Kérlek, segíts.'],
        why: 'てくれて、ありがとう: köszönet azért, amit értem tettek.' },
      { q: '„Beszéljünk séta közben." Mi hiányzik?', jp: '＿ながら{話|はな}しましょう。', a: '{歩|ある}き', wrong: ['{歩|ある}いて', '{歩|ある}く', '{歩|ある}か'],
        why: 'ます-tő + ながら: {歩|ある}きます → {歩|ある}き.' },
      { q: 'Mit jelent: {兄|あに}が{自転車|じてんしゃ}を{直|なお}してくれました。', a: 'A bátyám megjavította nekem a biciklit.',
        wrong: ['Megjavítottam a bátyám biciklijét.', 'A bátyám megjavíttatta a biciklijét.', 'A bátyámmal együtt javítottuk a biciklit.'],
        why: 'てくれました: a bátyám (が) tette meg nekem.' }
    ]
  },

  /* ── 23. lecke ────────────────────────────────────── */
  {
    id: 'l23', no: 23, book: 'Dekiru 1',
    title: 'Udvarias kérések',
    lead: 'Tisztelettel beszélsz arról, amit érted tettek, udvariasan kérsz szívességet, és megtanulod, hogyan lesz főnév az igéből a の segítségével.',
    cando: [
      'Udvariasan megkérsz valakit egy szívességre.',
      'Megköszönöd a tanárodnak, amit érted tett.',
      'Elmondod, mit szeretsz csinálni, és miből készül valami.'
    ],
    points: [
      {
        title: '〜てくださいます・〜ていただきます', sub: 'megteszi nekem (tisztelettel)',
        pattern: 'A が 〜てくださいます · A に 〜ていただきます',
        body: 'A てくれます és a てもらいます tiszteleti párjai: akkor használod, ha tanár, főnök vagy idősebb ember tett érted valamit. A partikulák nem változnak.',
        examples: [
          { jp: '{先生|せんせい}が{作文|さくぶん}を{直|なお}してくださいました。', romaji: 'Sensei ga sakubun o naoshite kudasaimashita.', hu: 'A tanár kijavította a fogalmazásomat.' },
          { jp: '{先生|せんせい}に{日本語|にほんご}を{教|おし}えていただきました。', romaji: 'Sensei ni nihongo o oshiete itadakimashita.', hu: 'A tanár úr tanított japánra.' },
          { jp: '{部長|ぶちょう}が{駅|えき}まで{送|おく}ってくださいました。', romaji: 'Buchō ga eki made okutte kudasaimashita.', hu: 'Az osztályvezető kivitt az állomásra.' }
        ]
      },
      {
        title: '〜てさしあげます', sub: 'megteszem (tisztelettel)',
        pattern: 'A に + ige て-alak + さしあげます',
        body: 'A てあげます tiszteleti párja. Másnak mesélve használható; annak, akinek segítesz, közvetlenül nem mondjuk, mert kérkedésnek hat.',
        examples: [
          { jp: 'お{客|きゃく}さんに{町|まち}を{案内|あんない}してさしあげました。', romaji: 'Okyaku-san ni machi o annai shite sashiagemashita.', hu: 'Körbevezettem a vendéget a városban.' },
          { jp: '{先生|せんせい}の{荷物|にもつ}を{持|も}ってさしあげました。', romaji: 'Sensei no nimotsu o motte sashiagemashita.', hu: 'Vittem a tanár úr csomagját.' },
          { jp: 'お{年寄|としよ}りに{席|せき}を{譲|ゆず}ってさしあげます。', romaji: 'Otoshiyori ni seki o yuzutte sashiagemasu.', hu: 'Átadom a helyem az időseknek.' }
        ]
      },
      {
        title: '〜てくれませんか・〜ていただけませんか', sub: 'megtenné…?',
        pattern: 'ige て-alak + くれませんか / いただけませんか',
        body: 'A kérés annál udvariasabb, minél közvetettebb. Barátnak: <b>〜てくれませんか</b>. Tanárnak, idegennek: <b>〜ていただけませんか</b>. A legóvatosabb a befejezetlen <b>〜ていただきたいんですが…</b>',
        examples: [
          { jp: 'ちょっと{手伝|てつだ}ってくれませんか。', romaji: 'Chotto tetsudatte kuremasen ka.', hu: 'Segítenél egy kicsit?' },
          { jp: '{駅|えき}へ{行|い}く{道|みち}を{教|おし}えていただけませんか。', romaji: 'Eki e iku michi o oshiete itadakemasen ka.', hu: 'Megmondaná, merre van az állomás?' },
          { jp: 'この{書類|しょるい}を{見|み}ていただきたいんですが。', romaji: 'Kono shorui o mite itadakitai n desu ga.', hu: 'Szeretném megkérni, hogy nézze át ezt az iratot.' }
        ]
      },
      {
        title: '〜の', sub: 'igéből főnév',
        pattern: 'szótári alak + の + が / は / を',
        body: 'A <b>の</b> is főnévvé teszi az igét, mint a こと: „az, hogy…". Leggyakrabban a {好|す}き, {上手|じょうず}, {大変|たいへん}, {忘|わす}れる előtt hallod.',
        examples: [
          { jp: '{料理|りょうり}を{作|つく}るのが{好|す}きです。', romaji: 'Ryōri o tsukuru no ga suki desu.', hu: 'Szeretek főzni.' },
          { jp: '{朝|あさ}{早|はや}く{起|お}きるのは{大変|たいへん}です。', romaji: 'Asa hayaku okiru no wa taihen desu.', hu: 'Korán kelni nehéz.' },
          { jp: '{宿題|しゅくだい}を{持|も}ってくるのを{忘|わす}れました。', romaji: 'Shukudai o motte kuru no o wasuremashita.', hu: 'Elfelejtettem elhozni a leckét.' }
        ],
        tip: 'A です előtt こと áll, nem の: {趣味|しゅみ}は{本|ほん}を{読|よ}むことです.'
      },
      {
        title: 'まだ〜ます・もう〜ません', sub: 'még mindig · már nem',
        pattern: 'まだ + állítás · もう + tagadás',
        body: 'A 14. leckében a もう „már", a まだ „még nem" volt. Itt a tükörképük: <b>まだ</b> + állítás = még mindig tart; <b>もう</b> + tagadás = már nem, többé nem.',
        examples: [
          { jp: 'まだ{雨|あめ}が{降|ふ}っています。', romaji: 'Mada ame ga futte imasu.', hu: 'Még mindig esik az eső.' },
          { jp: 'まだ{時間|じかん}があります。', romaji: 'Mada jikan ga arimasu.', hu: 'Még van idő.' },
          { jp: 'もう{時間|じかん}がありません。', romaji: 'Mō jikan ga arimasen.', hu: 'Már nincs idő.' },
          { jp: 'もうお{酒|さけ}は{飲|の}みません。', romaji: 'Mō osake wa nomimasen.', hu: 'Többé nem iszom alkoholt.' }
        ]
      },
      {
        title: '〜でつくります・〜からつくります', sub: 'miből készül',
        pattern: 'anyag + で / から + つくります',
        body: 'A <b>で</b> akkor áll, ha az anyag a kész tárgyon is felismerhető (fa, papír). A <b>から</b> akkor, ha az alapanyag átalakul, és már nem látszik (rizsből szaké, szőlőből bor).',
        examples: [
          { jp: 'このいすは{木|き}で{作|つく}ります。', romaji: 'Kono isu wa ki de tsukurimasu.', hu: 'Ez a szék fából készül.' },
          { jp: '{日本|にほん}のお{酒|さけ}は{米|こめ}から{作|つく}ります。', romaji: 'Nihon no osake wa kome kara tsukurimasu.', hu: 'A japán szaké rizsből készül.' },
          { jp: '{紙|かみ}で{鶴|つる}を{作|つく}りました。', romaji: 'Kami de tsuru o tsukurimashita.', hu: 'Papírból darut hajtogattam.' }
        ]
      }
    ],
    quiz: [
      { q: '„A tanár kijavította a fogalmazásomat." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}が{作文|さくぶん}を{直|なお}して＿。', a: 'くださいました', wrong: ['いただきました', 'さしあげました', 'あげました'],
        why: 'A tanár az alany (が), nekem tette: てくださいました.' },
      { q: '„A tanár úr tanított japánra." Mi hiányzik?', jp: '{先生|せんせい}＿{日本語|にほんご}を{教|おし}えていただきました。', a: 'に', wrong: ['が', 'を', 'で'],
        why: 'A ていただきます mellett a segítő に-t kap.' },
      { q: 'Melyik a legudvariasabb kérés?', a: '{教|おし}えていただけませんか。', wrong: ['{教|おし}えてください。', '{教|おし}えてくれませんか。', '{教|おし}えて。'],
        why: 'Minél közvetettebb, annál udvariasabb: 〜ていただけませんか.' },
      { q: '„Szeretek főzni." Mi hiányzik?', jp: '{料理|りょうり}を{作|つく}る＿が{好|す}きです。', a: 'の', wrong: ['を', 'に', 'と'],
        why: 'A の főnévvé teszi az igét: {作|つく}るのが{好|す}き.' },
      { q: '„Elfelejtettem elhozni a leckét." Mi hiányzik?', jp: '{宿題|しゅくだい}を{持|も}ってくるの＿{忘|わす}れました。', a: 'を', wrong: ['が', 'に', 'で'],
        why: 'A の-val főnevesített rész a {忘|わす}れました tárgya: を.' },
      { q: '„Még van idő." Mi hiányzik?', jp: '＿{時間|じかん}があります。', a: 'まだ', wrong: ['もう', 'しか', 'だけ'],
        why: 'まだ + állítás = még (mindig).' },
      { q: 'Mit jelent: もう{時間|じかん}がありません。', a: 'Már nincs idő.', wrong: ['Még van idő.', 'Még nincs itt az ideje.', 'Már van időm.'],
        why: 'もう + tagadás = már nem.' },
      { q: '„Ez a szék fából készül." Mi hiányzik?', jp: 'このいすは{木|き}＿{作|つく}ります。', a: 'で', wrong: ['に', 'を', 'が'],
        why: 'A felismerhető anyag で-t kap.' },
      { q: '„A japán szaké rizsből készül." Mi hiányzik?', jp: '{日本|にほん}のお{酒|さけ}は{米|こめ}＿{作|つく}ります。', a: 'から', wrong: ['まで', 'より', 'へ'],
        why: 'Az átalakuló alapanyag から-t kap.' },
      { q: 'Mit jelent: ちょっと{手伝|てつだ}ってくれませんか。', a: 'Segítenél egy kicsit?',
        wrong: ['Segítsek egy kicsit?', 'Miért nem segítettél?', 'Köszi, hogy segítettél.'],
        why: '〜てくれませんか: kérés, hogy tegyen meg nekem valamit.' }
    ]
  },

  /* ── 24. lecke ────────────────────────────────────── */
  {
    id: 'l24', no: 24, book: 'Dekiru 1',
    title: 'Búcsú',
    lead: 'Kifejezed, hogy valami feléd tart vagy távolodik, hogy egy változás eddig tartott vagy ezután folytatódik, és leírod, milyen állapotban vannak a dolgok körülötted.',
    cando: [
      'Megmondod, hogy elmész valamiért és visszajössz.',
      'Elmondod, mi változott eddig, és mi változik ezután.',
      'Leírod, mit látsz magad körül.'
    ],
    points: [
      {
        title: '〜てきます (irány)', sub: 'megteszem és jövök · idehoz',
        pattern: 'ige て-alak + きます',
        body: 'A <b>きます</b> a beszélő felé mutat. Két gyakori jelentése: elmész, megteszel valamit, és <i>visszajössz</i>; vagy valaki <i>ide</i> hoz, ide jön valahogyan.',
        examples: [
          { jp: 'ちょっと{飲|の}み{物|もの}を{買|か}ってきます。', romaji: 'Chotto nomimono o katte kimasu.', hu: 'Elugrom innivalóért, mindjárt jövök.' },
          { jp: '{行|い}ってきます。', romaji: 'Itte kimasu.', hu: 'Elmentem, majd jövök!' },
          { jp: '{友|とも}だちがお{土産|みやげ}を{持|も}ってきました。', romaji: 'Tomodachi ga omiyage o motte kimashita.', hu: 'A barátom hozott szuvenírt.' }
        ]
      },
      {
        title: '〜ていきます (irány)', sub: 'elmegy, elvisz',
        pattern: 'ige て-alak + いきます',
        body: 'Az <b>いきます</b> a beszélőtől távolodik: valaki vagy valami elmegy innen, vagy elviszel magaddal valamit.',
        examples: [
          { jp: '{子|こ}どもが{学校|がっこう}へ{走|はし}っていきました。', romaji: 'Kodomo ga gakkō e hashitte ikimashita.', hu: 'A gyerek elszaladt az iskolába.' },
          { jp: 'お{弁当|べんとう}を{持|も}っていきます。', romaji: 'Obentō o motte ikimasu.', hu: 'Viszek uzsonnát.' },
          { jp: '{鳥|とり}が{飛|と}んでいきました。', romaji: 'Tori ga tonde ikimashita.', hu: 'Elrepült a madár.' }
        ]
      },
      {
        title: '〜てきました (változás eddig)', sub: 'kezd…, egyre inkább',
        pattern: 'változást jelentő ige て-alak + きました',
        body: 'Időben is van „felém": a változás a múltban indult, és mostanra ért ide. Magyarul: „kezd…", „egyre…", „eleredt".',
        examples: [
          { jp: '{寒|さむ}くなってきました。', romaji: 'Samuku natte kimashita.', hu: 'Kezd hideg lenni.' },
          { jp: '{日本語|にほんご}がわかってきました。', romaji: 'Nihongo ga wakatte kimashita.', hu: 'Kezdem érteni a japánt.' },
          { jp: '{雨|あめ}が{降|ふ}ってきました。', romaji: 'Ame ga futte kimashita.', hu: 'Eleredt az eső.' }
        ]
      },
      {
        title: '〜ていきます (változás ezután)', sub: 'tovább, ezután is',
        pattern: 'ige て-alak + いきます',
        body: 'Időben az いきます a jövő felé mutat: a változás vagy a cselekvés mostantól folytatódik.',
        examples: [
          { jp: 'これからも{日本語|にほんご}を{勉強|べんきょう}していきます。', romaji: 'Kore kara mo nihongo o benkyō shite ikimasu.', hu: 'Ezután is tovább tanulok japánul.' },
          { jp: 'これから{暖|あたた}かくなっていきます。', romaji: 'Kore kara atatakaku natte ikimasu.', hu: 'Mostantól egyre melegebb lesz.' },
          { jp: '{観光客|かんこうきゃく}は{増|ふ}えていくでしょう。', romaji: 'Kankōkyaku wa fuete iku deshō.', hu: 'A turisták száma valószínűleg tovább nő.' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'amit magad körül látsz',
        pattern: 'B が + tárgyatlan ige て-alak + います',
        body: 'A tárgyatlan ige + ています-szal írod le, amit látsz: valami megállt, leesett, eltört, és most is úgy van. Nem azt jelenti, hogy éppen történik.',
        examples: [
          { jp: '{時計|とけい}が{止|と}まっています。', romaji: 'Tokei ga tomatte imasu.', hu: 'Áll az óra.' },
          { jp: '{財布|さいふ}が{落|お}ちています。', romaji: 'Saifu ga ochite imasu.', hu: 'Egy pénztárca hever a földön.' },
          { jp: 'コップが{割|わ}れています。', romaji: 'Koppu ga warete imasu.', hu: 'El van törve a pohár.' }
        ]
      }
    ],
    quiz: [
      { q: '„Elugrom innivalóért, és visszajövök." Mi hiányzik?', jp: '{飲|の}み{物|もの}を{買|か}って＿。', a: 'きます', wrong: ['いきます', 'あります', 'います'],
        why: 'Megteszem és visszajövök: てきます.' },
      { q: 'Mit mondasz, amikor elindulsz otthonról?', a: '{行|い}ってきます。', wrong: ['{行|い}っていきます。', 'ただいま。', 'おかえりなさい。'],
        why: '{行|い}ってきます: elmegyek, és visszajövök.' },
      { q: '„Elrepült a madár." Mi hiányzik?', jp: '{鳥|とり}が{飛|と}んで＿。', a: 'いきました', wrong: ['きました', 'ありました', 'おきました'],
        why: 'Távolodik tőlem: ていきます.' },
      { q: '„Eleredt az eső." Mi hiányzik?', jp: '{雨|あめ}が{降|ふ}って＿。', a: 'きました', wrong: ['いきました', 'ありました', 'おきました'],
        why: 'A változás mostanra ért ide: てきました.' },
      { q: 'Mit jelent: {寒|さむ}くなってきました。', a: 'Kezd hideg lenni.',
        wrong: ['Már nincs hideg.', 'Hideg volt, amikor megjöttem.', 'Hidegben jöttem ide.'],
        why: 'なってきました: a változás elindult, és mostanra érezhető.' },
      { q: '„Ezután is tovább tanulok japánul." Mi hiányzik?', jp: 'これからも{日本語|にほんご}を{勉強|べんきょう}して＿。', a: 'いきます', wrong: ['きました', 'あります', 'みました'],
        why: 'Mostantól a jövő felé: ていきます.' },
      { q: '„Áll az óra." Mi hiányzik?', jp: '{時計|とけい}が＿います。', a: '{止|と}まって', wrong: ['{止|と}めて', '{止|と}まり', '{止|と}まる'],
        why: 'Állapot: tárgyatlan ige ({止|と}まります) て-alakja + います.' },
      { q: 'Mit jelent: {財布|さいふ}が{落|お}ちています。', a: 'Egy pénztárca hever a földön.',
        wrong: ['Elejtem a pénztárcámat.', 'Éppen esik le a pénztárca.', 'Elvesztettem a pénztárcámat.'],
        why: 'Tárgyatlan ige + ています: az eredmény állapota, nem folyamat.' },
      { q: '„A barátom hozott szuvenírt." Mi hiányzik?', jp: '{友|とも}だちがお{土産|みやげ}を{持|も}って＿。', a: 'きました', wrong: ['いきました', 'ありました', 'いました'],
        why: 'Ide, felém hozta: {持|も}ってきました.' },
      { q: 'Melyik mondat ír le állapotot (nem cselekvést)?', a: 'コップが{割|わ}れています。',
        wrong: ['コップを{割|わ}りました。', 'コップを{割|わ}っています。', 'コップを{割|わ}らないでください。'],
        why: 'が + tárgyatlan ige + ています: állapot.' }
    ]
  }
];
