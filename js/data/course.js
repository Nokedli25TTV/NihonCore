/* ====================================================
   NIHONCORE — Leckék (a tanulási út magyarázó oldalai)
   ----------------------------------------------------
   A pages/lesson.html?id=<lecke-id> ebből rajzolja ki a leckét
   (app.js: initLessonPage). A tanulási út a Dekiru 1 tankönyv leckéinek
   témáit és sorrendjét követi; a magyarázatok és a példamondatok
   SAJÁT megfogalmazások (a könyv szövege nem szerepel itt).

   NIHONCORE_COURSE: leckék tömbje.
     id      a lecke kulcsa (a tanulási út lépése ezzel hivatkozik rá: lesson.html?id=l1)
     no      a lecke sorszáma a könyvben (a nem könyvbeli leckéknél belső sorszám)
     book    melyik kötet
     badge / kicker / label  (nem kötelező) a nem számozott leckék fejléce:
             badge = a nagy jel a szám helyén · kicker = a kis címke ·
             label = a lecke megnevezése („Kiegészítő lecke")
     title   a lecke címe · lead: egy mondat arról, mire leszel képes
     cando   2–4 „a lecke végére…" pont
     points  nyelvtani pontok, sorrendben:
       title    a szerkezet (japánul vagy röviden magyarul)
       sub      mit jelent, egy-két szóban
       pattern  a minta képlete
       body     magyarázat (rövid HTML: <b>, <i>)
       examples [{ jp, romaji, hu }]
       tip      (nem kötelező) tipikus buktató
       more     (nem kötelező) további bekezdések a body után
       tables   (nem kötelező) [{ caption, head: [], rows: [[]] }]
       notes    (nem kötelező) „Jó tudni" megjegyzések
       mistakes (nem kötelező) [{ bad, good, why }]: gyakori hiba és a helyes alak
     Részletes lecke (az elvárt forma) lecke-szintű mezői, mind nem kötelező:
       intro    bekezdések: miről szól a lecke, mi benne az új
       dialogue { title, scene, lines: [{ who, jp, romaji, hu }], notes: [] }
       phrases  [{ jp, romaji, hu, note? }] kész fordulatok (a kérdés-készletbe is bekerülnek)
       words    [{ title, note?, items: [{ jp, romaji, hu, say? }] }] a leckéhez kellő szavak
       culture  [{ title, text }] tudnivalók Japánról
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

  /* ── Előkészítő lecke: az írás és a kiejtés ───────── */
  {
    id: 'l0', no: 0, book: 'Előkészítő',
    badge: 'あ', kicker: 'Előkészítő', label: 'Előkészítő lecke', ownOnly: true,
    title: 'Az írás és a kiejtés',
    lead: 'Mielőtt belevágsz: milyen írásjegyekkel ír a japán, és hogyan olvasd ki magyar füllel a latin betűs átírást, amit az app mindenütt mutat.',
    cando: [
      'Tudod, mire való a hiragana, a katakana és a kanji.',
      'Helyesen ejted ki a latin betűs átírást.',
      'Felismered a hosszú hangot és a kettőzött mássalhangzót.'
    ],
    points: [
      {
        title: 'Három írás egy mondatban', sub: 'hiragana, katakana, kanji',
        pattern: 'ひらがな · カタカナ · {漢字|かんじ}',
        body: 'A japán három írást használ egyszerre. A <b>hiragana</b> gömbölyű szótagírás: ezzel írják a végződéseket, a partikulákat és sok japán szót. A <b>katakana</b> szögletes szótagírás: jövevényszavak és idegen nevek. A <b>kanji</b> kínai eredetű fogalomjel: a szavak jelentéses részét írja. A latin betűs átírás neve <b>rómadzsi</b>; az app segítségként mutatja, a tetején ki is kapcsolhatod.',
        examples: [
          { jp: 'わたしは テレビを {見|み}ます。', romaji: 'Watashi wa terebi o mimasu.', hu: 'Tévét nézek.' },
          { jp: 'すし', romaji: 'sushi', hu: 'szusi (hiraganával)' },
          { jp: 'コーヒー', romaji: 'kōhī', hu: 'kávé (katakanával)' },
          { jp: '{山|やま}', romaji: 'yama', hu: 'hegy (kanjival)' }
        ],
        tip: 'Az első mondatban mindhárom írás szerepel: わたしは … を … ます hiragana, テレビ katakana, {見|み} kanji.'
      },
      {
        title: 'A rómadzsi kiejtése', sub: 'magyar füllel',
        pattern: 's = sz · sh = s · ch = cs · j = dzs · ts = c · y = j · w = v · z = z',
        body: 'Az átírás az angol helyesírást követi (ez a Hepburn-átírás), ezért néhány betűt másképp kell kiolvasni, mint magyarul. A legfontosabb: az <b>s</b> mindig „sz", az <b>sh</b> „s", a <b>ch</b> „cs", a <b>j</b> „dzs", a <b>ts</b> „c", az <b>y</b> „j". A <b>w</b> lágy, ajakkal képzett v; az <b>r</b> rövid, egyet pördülő hang; az <b>f</b> (csak a „fu" szótagban) ajakkal fújt h.',
        examples: [
          { jp: 'さしみ', romaji: 'sashimi', hu: 'szasimi: nyers halszeletek' },
          { jp: 'おちゃ', romaji: 'ocha', hu: 'tea' },
          { jp: 'ふじさん', romaji: 'Fujisan', hu: 'a Fudzsi-hegy' },
          { jp: 'つなみ', romaji: 'tsunami', hu: 'szökőár' },
          { jp: 'わさび', romaji: 'wasabi', hu: 'vaszabi: japán torma' }
        ]
      },
      {
        title: 'Az öt magánhangzó', sub: 'a, i, u, e, o',
        pattern: 'あ a · い i · う u · え e · お o',
        body: 'Csak öt magánhangzó van, mind rövid és tiszta. Az <b>a</b> rövid „á" (nem a magyar „a"); az <b>e</b> rövid, nyílt e; az <b>u</b> ajakkerekítés nélkül, lazán ejtett u. Kettőshangzó nincs: az „ai", „ie" két külön szótag.',
        examples: [
          { jp: 'あおい', romaji: 'aoi', hu: 'kék' },
          { jp: 'いいえ', romaji: 'iie', hu: 'nem' },
          { jp: 'えき', romaji: 'eki', hu: 'állomás' }
        ]
      },
      {
        title: 'Hosszú hangok', sub: 'ā, ī, ū, ē, ō',
        pattern: 'rövid ↔ hosszú: más szó',
        body: 'A magánhangzó hossza megkülönbözteti a szavakat, ahogy a magyarban is (kor ↔ kór). A rómadzsiban a hosszú hangot felülvonás jelöli: ō, ū. Katakanában a hosszúság jele a vízszintes vonal: ー.',
        examples: [
          { jp: 'おばさん', romaji: 'obasan', hu: 'néni' },
          { jp: 'おばあさん', romaji: 'obāsan', hu: 'nagymama' },
          { jp: 'ビール', romaji: 'bīru', hu: 'sör' },
          { jp: 'とうきょう', romaji: 'Tōkyō', hu: 'Tokió' }
        ]
      },
      {
        title: 'Kis っ és ん', sub: 'kettőzés és orrhang',
        pattern: 'っ + mássalhangzó = kettőzve · ん = n',
        body: 'A kisméretű <b>っ</b> nem külön hang: azt jelzi, hogy az utána álló mássalhangzót hosszan, megkettőzve ejted (kitte, zasshi). Az <b>ん</b> az egyetlen mássalhangzó, amely önálló szótagot alkot.',
        examples: [
          { jp: 'きって', romaji: 'kitte', hu: 'bélyeg' },
          { jp: 'きて', romaji: 'kite', hu: 'gyere' },
          { jp: 'ざっし', romaji: 'zasshi', hu: 'magazin' },
          { jp: 'にほん', romaji: 'Nihon', hu: 'Japán' }
        ]
      },
      {
        title: 'Elnyelt u és i', sub: 'desu = „desz"',
        pattern: 'です → „desz" · ます → „masz" · した → „sta"',
        body: 'Zöngétlen mássalhangzók (k, s, t, h, p) között és a szó végén az <b>u</b> és az <b>i</b> gyakran alig hallatszik. Ezért hangzik a です „desz"-nek, a 〜ます „masz"-nak. Leírni mindig kell, kiejteni nem.',
        examples: [
          { jp: 'がくせいです。', romaji: 'Gakusei desu.', hu: 'Diák vagyok.' },
          { jp: 'いきます。', romaji: 'Ikimasu.', hu: 'Megyek.' },
          { jp: 'すきです。', romaji: 'Suki desu.', hu: 'Szeretem.' }
        ]
      },
      {
        title: 'は, へ, を partikulaként', sub: 'másképp ejtjük',
        pattern: 'は = wa · へ = e · を = o',
        body: 'Három jelet másképp ejtünk, amikor partikula (a szó szerepét jelölő kis szó): a <b>は</b> ilyenkor „wa", a <b>へ</b> „e", az <b>を</b> „o". Szó belsejében a szokott módon olvasod őket (ha, he).',
        examples: [
          { jp: 'これは ほんです。', romaji: 'Kore wa hon desu.', hu: 'Ez könyv.' },
          { jp: 'がっこうへ いきます。', romaji: 'Gakkō e ikimasu.', hu: 'Iskolába megyek.' },
          { jp: 'みずを のみます。', romaji: 'Mizu o nomimasu.', hu: 'Vizet iszom.' }
        ]
      }
    ],
    quiz: [
      { q: 'Melyik írással írják a jövevényszavakat és az idegen neveket?', a: 'Katakanával', wrong: ['Hiraganával', 'Kanjival', 'Latin betűvel'],
        why: 'A katakana a jövevényszavak és az idegen nevek írása: テレビ, コーヒー.' },
      { q: 'Mire való leginkább a hiragana?', a: 'A végződések, a partikulák és sok japán szó leírására.',
        wrong: ['Csak idegen szavak leírására.', 'Csak számok leírására.', 'Csak nevek leírására.'],
        why: 'A hiragana a japán írás alapja: ezzel bármi leírható.' },
      { q: 'Mi a kanji?', a: 'Kínai eredetű fogalomjel: a szavak jelentéses részét írja.',
        wrong: ['A latin betűs átírás neve.', 'A hosszú magánhangzó jele.', 'A katakana másik neve.'],
        why: 'A kanji jelentést hordoz; a latin betűs átírás neve rómadzsi.' },
      { q: 'Hogyan ejted magyarul: sashimi?', a: 'szasimi', wrong: ['sasimi', 'szaszimi', 'saszimi'],
        why: 'Az s mindig „sz", az sh pedig „s".' },
      { q: 'Hogyan ejted magyarul: ocha?', a: 'ocsa', wrong: ['oha', 'okha', 'occa'],
        why: 'A ch a magyar „cs".' },
      { q: 'Hogyan ejted a j betűt az átírásban (például: Fuji)?', a: 'dzs', wrong: ['j', 'zs', 'h'],
        why: 'A j a magyar „dzs": Fuji = „fudzsi".' },
      { q: 'Hogyan ejted magyarul: tsunami?', a: 'cunami', wrong: ['csunami', 'tunami', 'szunami'],
        why: 'A ts a magyar „c".' },
      { q: 'Mit jelöl a felülvonás (például: Tōkyō, kōhī)?', a: 'Hosszú magánhangzót.', wrong: ['Hangsúlyt.', 'Kettőzött mássalhangzót.', 'Néma hangot.'],
        why: 'ō = hosszú o, ī = hosszú i.' },
      { q: 'Melyik szó jelenti: „nagymama"?', a: 'obāsan', wrong: ['obasan', 'ōbasan', 'obassan'],
        why: 'Az obasan „néni"; a hosszú ā-val ejtett obāsan „nagymama".' },
      { q: 'Mit jelöl a kis っ (például: kitte)?', a: 'A következő mássalhangzót megkettőzve ejted.',
        wrong: ['A magánhangzó megnyúlik.', 'A szó véget ér.', 'A szótag néma.'],
        why: 'きって = kitte: hosszú, kettőzött t.' },
      { q: 'Hogyan ejted a は jelet, amikor partikula?', a: 'wa', wrong: ['ha', 'ba', 'pa'],
        why: 'Partikulaként は = wa; szó belsejében ha.' },
      { q: 'Hogyan hangzik a mondat végi です?', a: 'desz', wrong: ['deszu, hangsúlyos u-val', 'desu, magyar s-sel', 'dec'],
        why: 'A szó végi u alig hallatszik: „desz".' }
    ]
  },

  /* ── 1. lecke ─────────────────────────────────────── */
  {
    id: 'l1', no: 1, book: 'Dekiru 1', title: 'Bemutatkozás',
    lead: 'Az első japán mondataid: bemutatkozol, megmondod, ki vagy és honnan jöttél, és vissza is kérdezel.',
    cando: [
      'Bemutatkozol, és megérted, ha más bemutatkozik.',
      'Megmondod, mi a foglalkozásod, honnan jöttél, hány éves vagy és hányadikos.',
      'Egyszerű kérdést teszel fel, és igennel vagy nemmel válaszolsz.',
      'Tudod, kit hogyan szólíts meg, és mit mondj az első találkozáskor.'
    ],
    intro: [
      'Ebben a leckében egyetlen mondatfajtát tanulsz meg, de azt alaposan: <b>„A az B"</b>. Ezzel már be tudsz mutatkozni, meg tudod mondani a foglalkozásodat, a nemzetiségedet, az életkorodat, és rá tudsz kérdezni ugyanezekre.',
      'Mielőtt belevágsz, négy dolog, amiben a japán mondat más, mint a magyar. <b>Az állítmány mindig a mondat végén áll.</b> A szavak szerepét a mögéjük tett rövid szócskák, a <b>partikulák</b> mutatják (は, の, も, か): ezek a magyar ragok és névutók rokonai, csak külön szóként állnak. <b>Névelő nincs</b>, a főnévnek <b>nincs többes száma</b>, és az igét <b>nem ragozzuk személy szerint</b>: ugyanaz a です áll az „én", a „te" és az „ők" mellett is.',
      'A negyedik: a japán <b>kihagyja, ami a helyzetből egyértelmű</b>. Ha magadról beszélsz, nem kell minden mondatot azzal kezdened, hogy „én". Ettől nem leszel udvariatlan, sőt: így hangzik természetesen.'
    ],
    dialogue: {
      title: 'Első találkozás',
      scene: 'Anna magyar cserediák, most érkezett Japánba. Az iskolában Tanaka tanár úr fogadja.',
      lines: [
        { who: 'Tanaka', jp: 'はじめまして。たなかです。', romaji: 'Hajimemashite. Tanaka desu.', hu: 'Örvendek. Tanaka vagyok.' },
        { who: 'Anna', jp: 'はじめまして。アンナです。ハンガリーから きました。', romaji: 'Hajimemashite. Anna desu. Hangarī kara kimashita.', hu: 'Örvendek. Anna vagyok. Magyarországról jöttem.' },
        { who: 'Anna', jp: 'どうぞ よろしく おねがいします。', romaji: 'Dōzo yoroshiku onegai shimasu.', hu: 'Kérem, fogadjon jó szívvel.' },
        { who: 'Tanaka', jp: 'こちらこそ、よろしく おねがいします。アンナさんは こうこうせいですか。', romaji: 'Kochira koso, yoroshiku onegai shimasu. Anna-san wa kōkōsei desu ka.', hu: 'Részemről a szerencse. Anna gimnazista?' },
        { who: 'Anna', jp: 'はい、こうこうの にねんせいです。たなかさんは せんせいですか。', romaji: 'Hai, kōkō no ninensei desu. Tanaka-san wa sensei desu ka.', hu: 'Igen, a gimnázium második évfolyamára járok. Ön tanár?' },
        { who: 'Tanaka', jp: 'はい、にほんごの きょうしです。', romaji: 'Hai, nihongo no kyōshi desu.', hu: 'Igen, japántanár vagyok.' },
        { who: 'Anna', jp: 'そうですか。', romaji: 'Sō desu ka.', hu: 'Értem.' },
        { who: 'Tanaka', jp: 'アンナさんの しゅみは なんですか。', romaji: 'Anna-san no shumi wa nan desu ka.', hu: 'Mi a hobbija, Anna?' },
        { who: 'Anna', jp: 'しゅみは おんがくです。', romaji: 'Shumi wa ongaku desu.', hu: 'A hobbim a zene.' },
        { who: 'Tanaka', jp: 'わたしの しゅみも おんがくです。', romaji: 'Watashi no shumi mo ongaku desu.', hu: 'Az én hobbim is a zene.' }
      ],
      notes: [
        'A <b>はじめまして</b> csak az <b>első</b> találkozáskor hangzik el. Aki már ismerősöd, annak こんにちは-val köszönsz.',
        'A bemutatkozás váza mindig ugyanaz: はじめまして → a neved + です → honnan jöttél → どうぞ よろしく おねがいします. Ezt egyben érdemes megtanulni.',
        'Anna végig <b>„たなかさん"</b>-nak szólítja a tanárt, Tanaka pedig <b>„アンナさん"</b>-nak őt: a japán a „te / ön" helyett a másik <b>nevét</b> mondja. Az あなた (te, ön) szót ilyenkor nem használjuk.',
        'Tanaka magáról <b>きょうし</b>-t mond, Anna róla <b>せんせい</b>-t. Mindkettő „tanár": a きょうし a foglalkozás neve, a せんせい tiszteletet kifejező megszólítás, ezért magadra nem mondod.',
        'A <b>そうですか</b> itt nem kérdés: ereszkedő hanglejtéssel annyit tesz, hogy „értem", „valóban".'
      ]
    },
    points: [
      {
        title: '〜は 〜です', sub: '„A az B"',
        pattern: 'A は B です',
        body: 'A japán mondat végén áll az állítmány. A <b>は</b> megjelöli, miről beszélünk, a <b>です</b> pedig udvariassá és lezárttá teszi a mondatot. Névelő nincs, és a „vagyok / vagy / van" sem kell külön: a „Diák vagyok" három szó.',
        more: [
          'A <b>は</b> előtt az áll, amiről a mondat szól: ez a mondat <b>témája</b>. Magyarul így érzékeltetheted: „ami engem illet: diák". Ami a は után jön, az az állítás a témáról.',
          'Ha a téma a helyzetből világos, <b>elhagyod</b>. Bemutatkozáskor nem azt mondod, hogy わたしは アンナです, hanem egyszerűen: アンナです. A わたしは akkor kell, ha hangsúlyozod, hogy rólad van szó („én viszont…"), vagy ha más is szóba került.',
          'A <b>です</b> nem létige. Nem azt jelenti, hogy valami „létezik" vagy „ott van": csak lezárja és udvariassá teszi az állítást. A „van valahol" igéit a 3. leckében tanulod (あります, います).'
        ],
        tables: [
          {
            caption: 'A mondat felépítése',
            head: ['Téma', 'は', 'Állítás', 'です'],
            rows: [
              ['わたし', 'は', 'がくせい', 'です。'],
              ['やまださん', 'は', 'せんせい', 'です。'],
              ['(わたしは)', '', 'アンナ', 'です。']
            ]
          }
        ],
        examples: [
          { jp: 'わたしは がくせいです。', romaji: 'Watashi wa gakusei desu.', hu: 'Diák vagyok.' },
          { jp: 'やまださんは せんせいです。', romaji: 'Yamada-san wa sensei desu.', hu: 'Jamada úr tanár.' },
          { jp: 'わたしは ハンガリーじんです。', romaji: 'Watashi wa Hangarī-jin desu.', hu: 'Magyar vagyok.' },
          { jp: 'アンナです。', romaji: 'Anna desu.', hu: 'Anna vagyok.' },
          { jp: 'ちちは いしゃです。', romaji: 'Chichi wa isha desu.', hu: 'Az apám orvos.' }
        ],
        notes: [
          'A は partikula írásban a „ha" jele, de <b>„wa"</b>-nak ejtjük. Csak a partikula ilyen: a szavak belsejében a は rendesen „ha" (はい = hai).',
          'A です végén az „u" alig hallatszik: nagyjából „desz".',
          'Nincs külön „vagyok / vagy / van / vagyunk": a です minden személyre és számra ugyanaz.',
          'Az „én" nem csak わたし lehet: fiúk gyakran ぼく-ot mondanak. Kezdőként a わたし mindig jó.'
        ],
        mistakes: [
          { bad: 'わたしは です がくせい。', good: 'わたしは がくせいです。', why: 'A です mindig a mondat legvégén áll, közvetlenül az állítás után.' },
          { bad: 'あなたは がくせいですか。', good: 'アンナさんは がくせいですか。', why: 'Nyelvtanilag nem hibás, de a másikat a <b>nevén</b> szólítjuk; az あなた idegenül, néha kifejezetten bántóan hat.' }
        ],
        tip: 'Ha a téma már elhangzott, a következő mondatban ne ismételd meg: a japán fülnek a sok わたしは nehézkes.'
      },
      {
        title: '〜さん', sub: 'megszólítás',
        pattern: 'név + さん · név + せんせい',
        body: 'A <b>さん</b> a név után áll, és nagyjából az „úr / asszony / kisasszony" helyén szerepel, de sokkal hétköznapibb: szinte mindenkinek kijár, akivel udvarias vagy. Nem függ sem nemtől, sem kortól.',
        more: [
          'A legfontosabb szabály: <b>a saját nevedhez soha nem teszed hozzá</b>. A さん a másik ember megtisztelése; magadat megtisztelni nevetséges volna.',
          'Tanárt, orvost, ügyvédet, mestert a さん helyett <b>せんせい</b>-jel szólítasz meg: たなかせんせい. Harmadik személyt bemutatni a <b>こちらは 〜さんです</b> mondattal szokás (ő itt …).'
        ],
        tables: [
          {
            caption: 'Megszólítások',
            head: ['Utótag', 'Kinek?', 'Példa'],
            rows: [
              ['さん', 'bárkinek, akivel udvarias vagy', 'やまださん'],
              ['せんせい', 'tanárnak, orvosnak, mesternek', 'たなかせんせい'],
              ['くん', 'fiúnak, fiatalabb férfinak', 'けんくん'],
              ['ちゃん', 'kisgyereknek, közeli barátnőnek', 'はなちゃん']
            ]
          }
        ],
        examples: [
          { jp: 'やまださんは かいしゃいんです。', romaji: 'Yamada-san wa kaishain desu.', hu: 'Jamada irodai dolgozó.' },
          { jp: 'こちらは リーさんです。', romaji: 'Kochira wa Rī-san desu.', hu: 'Ő itt Lí.' },
          { jp: 'たなかせんせいは にほんごの せんせいです。', romaji: 'Tanaka-sensei wa nihongo no sensei desu.', hu: 'Tanaka tanár úr japántanár.' }
        ],
        notes: [
          'A さん a családnévhez és az utónévhez is járulhat; idegenekkel és munkahelyen a <b>családnév + さん</b> a megszokott.',
          'A saját családtagjaidról másnak beszélve sem használsz さん-t.'
        ],
        mistakes: [
          { bad: 'わたしは アンナさんです。', good: 'わたしは アンナです。', why: 'A さん másoknak jár: a saját nevedhez soha nem teszed hozzá.' }
        ]
      },
      {
        title: '〜の', sub: 'birtok és hovatartozás',
        pattern: 'A の B',
        body: 'A <b>の</b> két főnevet köt össze: az első pontosítja a másodikat. Magyarul ez sokszor birtokos szerkezet vagy jelző: „a barátom könyve", „egyetemi hallgató". A sorrend a magyar birtokos szerkezetével egyezik: elöl a birtokos.',
        more: [
          'A の mindig azt jelzi, hogy az előtte álló szó <b>pontosítja</b> a mögötte állót. A fő szó a <b>második</b>: a にほんごの せんせい tanár (aki japánt tanít), nem nyelv.',
          'Többet is egymás után fűzhetsz: わたしの ともだちの なまえ = a barátom neve. Ilyenkor is hátulról előre haladsz a fordítással.'
        ],
        tables: [
          {
            caption: 'Mit fejezhet ki a の?',
            head: ['Viszony', 'Példa', 'Magyarul'],
            rows: [
              ['birtokos', 'わたしの なまえ', 'a nevem'],
              ['hovatartozás', 'さくらこうこうの がくせい', 'a Szakura gimnázium diákja'],
              ['fajta, tartalom', 'にほんごの せんせい', 'japántanár'],
              ['eredet', 'にほんの くるま', 'japán autó']
            ]
          }
        ],
        examples: [
          { jp: 'わたしの なまえは アンナです。', romaji: 'Watashi no namae wa Anna desu.', hu: 'A nevem Anna.' },
          { jp: 'にほんごの せんせいです。', romaji: 'Nihongo no sensei desu.', hu: 'Japántanár.' },
          { jp: 'だいがくの がくせいです。', romaji: 'Daigaku no gakusei desu.', hu: 'Egyetemi hallgató vagyok.' },
          { jp: 'わたしの ともだちの なまえは ケンです。', romaji: 'Watashi no tomodachi no namae wa Ken desu.', hu: 'A barátom neve Ken.' }
        ],
        mistakes: [
          { bad: 'せんせいの にほんご', good: 'にほんごの せんせい', why: 'A sorrend megfordítja a jelentést: a せんせいの にほんご „a tanár japán nyelvtudása" volna. Mindig a pontosító szó áll elöl.' }
        ],
        tip: 'A magyar összetett szó vagy -i képzős jelző japánul nagyon gyakran の: egyetemi hallgató = だいがくの がくせい.'
      },
      {
        title: '〜じん・〜ご', sub: 'nemzetiség és nyelv',
        pattern: 'ország + じん · ország + ご',
        body: 'Az ország neve után álló <b>じん</b> az ott élő embert jelenti, a <b>ご</b> pedig a nyelvet: にほん (Japán) → にほんじん (japán ember), にほんご (japán nyelv).',
        more: [
          'Egy fontos kivétel van: az angol nyelv <b>えいご</b>, nem az ország nevéből képezzük. Az amerikaiak és a britek nyelve egyaránt えいご.',
          'A külföldi országnevek katakanával íródnak, és a japán hangrendszerhez igazodnak: ハンガリー, ドイツ, アメリカ.'
        ],
        tables: [
          {
            caption: 'Ország, ember, nyelv',
            head: ['Ország', 'Ember', 'Nyelv', 'Magyarul'],
            rows: [
              ['にほん', 'にほんじん', 'にほんご', 'Japán'],
              ['ハンガリー', 'ハンガリーじん', 'ハンガリーご', 'Magyarország'],
              ['アメリカ', 'アメリカじん', '<b>えいご</b>', 'Amerika'],
              ['イギリス', 'イギリスじん', '<b>えいご</b>', 'Nagy-Britannia'],
              ['ドイツ', 'ドイツじん', 'ドイツご', 'Németország'],
              ['フランス', 'フランスじん', 'フランスご', 'Franciaország'],
              ['ちゅうごく', 'ちゅうごくじん', 'ちゅうごくご', 'Kína'],
              ['かんこく', 'かんこくじん', 'かんこくご', 'Dél-Korea']
            ]
          }
        ],
        examples: [
          { jp: 'リーさんは ちゅうごくじんです。', romaji: 'Rī-san wa Chūgoku-jin desu.', hu: 'Lí kínai.' },
          { jp: 'スミスさんは アメリカじんですか。', romaji: 'Sumisu-san wa Amerika-jin desu ka.', hu: 'Smith amerikai?' },
          { jp: 'やまださんは えいごの せんせいです。', romaji: 'Yamada-san wa eigo no sensei desu.', hu: 'Jamada angoltanár.' }
        ],
        notes: [
          'Így kérdezel rá: <b>なにじんですか</b> (milyen nemzetiségű?) és <b>なにごですか</b> (milyen nyelv?). Itt kivételesen なに áll, nem なん.'
        ]
      },
      {
        title: '〜から きました', sub: '„…-ból jöttem"',
        pattern: 'hely + から きました',
        body: 'Bemutatkozáskor így mondod meg, honnan jöttél. A <b>から</b> partikula a kiindulópontot jelöli (-ból, -ről, -tól), a <b>きました</b> pedig azt jelenti: „jöttem". Az igékkel az 5. leckében foglalkozol; ezt a mondatot most egyben tanuld meg.',
        more: [
          'Országot és várost is mondhatsz: ハンガリーから きました, ブダペストから きました. A rákérdezés: <b>どこから きましたか</b> (honnan jött?).'
        ],
        examples: [
          { jp: 'ハンガリーから きました。', romaji: 'Hangarī kara kimashita.', hu: 'Magyarországról jöttem.' },
          { jp: 'どこから きましたか。', romaji: 'Doko kara kimashita ka.', hu: 'Honnan jött?' },
          { jp: 'たなかさんは にほんから きました。', romaji: 'Tanaka-san wa Nihon kara kimashita.', hu: 'Tanaka Japánból jött.' }
        ],
        tip: 'A ハンガリーじんです és a ハンガリーから きました nem ugyanaz: az első a nemzetiségedet, a második az indulásod helyét mondja meg.'
      },
      {
        title: '〜か', sub: 'kérdés',
        pattern: 'A は B ですか',
        body: 'Kérdéshez nem kell megfordítani a szórendet: a mondat végére <b>か</b> kerül, és kérdőjel helyett is ez áll. A válasz <b>はい</b> (igen) vagy <b>いいえ</b> (nem).',
        more: [
          'A か a beszélt kérdőjel. Udvarias mondatban a kérdés végére hagyományosan <b>pont</b> kerül, nem kérdőjel: a か már jelzi, hogy kérdezel. A hanglejtés a mondat végén emelkedik.',
          'Az igenlő válaszban megismételheted az állítást (はい、がくせいです), vagy röviden rábólinthatsz: <b>はい、そうです</b> (igen, így van). A tagadó válasz rövid formája: <b>いいえ、ちがいます</b> (nem, nem így van). A teljes tagadó mondatot a következő leckében tanulod.'
        ],
        examples: [
          { jp: 'たなかさんは がくせいですか。', romaji: 'Tanaka-san wa gakusei desu ka.', hu: 'Tanaka diák?' },
          { jp: 'はい、がくせいです。', romaji: 'Hai, gakusei desu.', hu: 'Igen, diák.' },
          { jp: 'いいえ、かいしゃいんです。', romaji: 'Iie, kaishain desu.', hu: 'Nem, irodai dolgozó.' },
          { jp: 'はい、そうです。', romaji: 'Hai, sō desu.', hu: 'Igen, így van.' },
          { jp: 'いいえ、ちがいます。', romaji: 'Iie, chigaimasu.', hu: 'Nem, nem így van.' }
        ],
        notes: [
          'A <b>そうですか</b> alakra kérdés, de ereszkedő hanglejtéssel azt jelenti: „értem", „á, szóval így". Ne válaszolj rá igennel.',
          'Az いいえ kimondva elég határozott; a japánok szívesebben kerülik a kerek „nem"-et, és inkább a helyes adatot mondják meg.'
        ]
      },
      {
        title: 'なんですか', sub: '„mi?"',
        pattern: 'A は なんですか',
        body: 'A <b>なん</b> (mi?) oda kerül, ahová a válasz: a です elé. Így kérdezel rá a névre, a hobbira, a foglalkozásra.',
        more: [
          'A japán kérdőszó nem megy a mondat elejére, hanem <b>ott marad, ahová a válasz kerül</b>. A kérdés és a felelet ezért pontosan ugyanolyan szerkezetű: しゅみは <b>なん</b>ですか → しゅみは <b>おんがく</b>です.',
          'A „mi?" alapalakja <b>なに</b>; a です, a の és a számlálószók előtt rövidül <b>なん</b>-ra (なんですか, なんさい, なんねんせい).',
          'Az <b>お</b> a szó elején tiszteletet fejez ki: おなまえ = az ön neve. Csak <b>másra</b> használod; a saját nevedről beszélve elmarad: わたしの なまえは…'
        ],
        examples: [
          { jp: 'おなまえは なんですか。', romaji: 'O-namae wa nan desu ka.', hu: 'Mi a neve?' },
          { jp: 'しゅみは なんですか。', romaji: 'Shumi wa nan desu ka.', hu: 'Mi a hobbid?' },
          { jp: 'しゅみは おんがくです。', romaji: 'Shumi wa ongaku desu.', hu: 'A hobbim a zene.' },
          { jp: 'おしごとは なんですか。', romaji: 'O-shigoto wa nan desu ka.', hu: 'Mi a foglalkozása?' }
        ],
        mistakes: [
          { bad: 'わたしの おなまえは アンナです。', good: 'わたしの なまえは アンナです。', why: 'A tiszteleti お a másik embernek jár, magunkra nem tesszük ki.' },
          { bad: 'なんですか しゅみは。', good: 'しゅみは なんですか。', why: 'A kérdőszó a です elé kerül, a szórend ugyanaz, mint a kijelentő mondatban.' }
        ]
      },
      {
        title: '〜も', sub: '„is"',
        pattern: 'A も B です',
        body: 'Ha valamire ugyanaz igaz, mint az előzőre, a は helyére <b>も</b> kerül. A kettő egyszerre nem állhat.',
        more: [
          'A も a は <b>helyére</b> lép, nem mellé: a „はも" együtt nem létezik. Ugyanígy váltja majd fel a が és a を partikulát is.',
          'A も-val arra utalsz vissza, ami előbb elhangzott, ezért önálló első mondatban ritkán áll.'
        ],
        examples: [
          { jp: 'わたしは がくせいです。リーさんも がくせいです。', romaji: 'Watashi wa gakusei desu. Rī-san mo gakusei desu.', hu: 'Diák vagyok. Lí is diák.' },
          { jp: 'わたしも ハンガリーじんです。', romaji: 'Watashi mo Hangarī-jin desu.', hu: 'Én is magyar vagyok.' },
          { jp: 'やまださんも せんせいですか。', romaji: 'Yamada-san mo sensei desu ka.', hu: 'Jamada is tanár?' }
        ],
        mistakes: [
          { bad: 'リーさんはも がくせいです。', good: 'リーさんも がくせいです。', why: 'A も kiszorítja a は-t; a kettő egyszerre nem állhat.' }
        ]
      },
      {
        title: '〜さい・〜ねんせい', sub: 'életkor és évfolyam',
        pattern: 'szám + さい · szám + ねんせい',
        body: 'Az életkort a szám után álló <b>さい</b> jelzi, az évfolyamot a <b>ねんせい</b>. Néhány szám kiejtése ilyenkor megváltozik: 1 éves <i>issai</i>, 8 éves <i>hassai</i>, 10 éves <i>jussai</i>; a 20 éves pedig rendhagyóan <i>hatachi</i>.',
        more: [
          'Az életkor a szám + <b>さい</b>. Néhány szám a さい előtt megrövidül és megkettőzi a mássalhangzót (1, 8, 10), a húszévesre pedig külön szó van: <b>はたち</b>.',
          'Az évfolyam a szám + <b>ねんせい</b> („évi tanuló"). Az iskola típusát a の-val teszed elé: こうこうの にねんせい, だいがくの いちねんせい.'
        ],
        tables: [
          {
            caption: 'Életkor',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1', '<b>いっさい</b>', '7', 'ななさい'],
              ['2', 'にさい', '8', '<b>はっさい</b>'],
              ['3', 'さんさい', '9', 'きゅうさい'],
              ['4', 'よんさい', '10', '<b>じゅっさい</b>'],
              ['5', 'ごさい', '20', '<b>はたち</b>'],
              ['6', 'ろくさい', '?', 'なんさい']
            ]
          },
          {
            caption: 'Évfolyam',
            head: ['', 'Olvasat'],
            rows: [
              ['1.', 'いちねんせい'],
              ['2.', 'にねんせい'],
              ['3.', 'さんねんせい'],
              ['4.', '<b>よねんせい</b>'],
              ['?', 'なんねんせい']
            ]
          }
        ],
        examples: [
          { jp: 'わたしは じゅうはっさいです。', romaji: 'Watashi wa jūhassai desu.', hu: 'Tizennyolc éves vagyok.' },
          { jp: 'いもうとは にねんせいです。', romaji: 'Imōto wa ninensei desu.', hu: 'A húgom másodikos.' },
          { jp: 'なんさいですか。', romaji: 'Nansai desu ka.', hu: 'Hány éves?' },
          { jp: 'あには はたちです。', romaji: 'Ani wa hatachi desu.', hu: 'A bátyám húszéves.' },
          { jp: 'なんねんせいですか。', romaji: 'Nannensei desu ka.', hu: 'Hányadikos vagy?' }
        ],
        notes: [
          'A negyedik évfolyam <b>よねんせい</b>, nem „よんねんせい".',
          'Felnőttől udvariasabb így kérdezni az életkort: <b>おいくつですか</b>. A なんさいですか gyerekhez, fiatalhoz illik.'
        ],
        tip: 'A 18 éves じゅうはっさい, a 21 éves にじゅういっさい: az utolsó számjegy dönti el, kell-e rövidülés.'
      }
    ],
    phrases: [
      { jp: 'はじめまして。', romaji: 'Hajimemashite.', hu: 'Örvendek. (első találkozáskor)', note: 'Szó szerint: „először". Csak akkor mondod, ha valakivel először találkozol.' },
      { jp: 'どうぞ よろしく おねがいします。', romaji: 'Dōzo yoroshiku onegai shimasu.', hu: 'Kérem, fogadjon jó szívvel.', note: 'A bemutatkozás zárómondata; magyarul nincs pontos megfelelője. Barátok között elég annyi: よろしく.' },
      { jp: 'こちらこそ。', romaji: 'Kochira koso.', hu: 'Részemről a szerencse.', note: 'Válasz a よろしく おねがいします-ra és a köszönetre is: „én is, sőt én még inkább".' },
      { jp: 'おはよう ございます。', romaji: 'Ohayō gozaimasu.', hu: 'Jó reggelt kívánok!', note: 'Körülbelül délelőtt tízig. Barátnak, családtagnak: おはよう.' },
      { jp: 'こんにちは。', romaji: 'Konnichiwa.', hu: 'Jó napot kívánok!', note: 'A végén álló は itt is „wa"-nak hangzik.' },
      { jp: 'こんばんは。', romaji: 'Konbanwa.', hu: 'Jó estét kívánok!' },
      { jp: 'さようなら。', romaji: 'Sayōnara.', hu: 'Viszontlátásra!', note: 'Hosszabb időre szóló búcsú. Aki holnap is látja a másikat, inkább azt mondja: じゃあ、また (na, szia).' },
      { jp: 'ありがとう ございます。', romaji: 'Arigatō gozaimasu.', hu: 'Köszönöm szépen.' },
      { jp: 'すみません。', romaji: 'Sumimasen.', hu: 'Elnézést!', note: 'Bocsánatkérés, de megszólítás is: ezzel kezded, ha ismeretlentől kérdezel valamit.' },
      { jp: 'にほんへ ようこそ。', romaji: 'Nihon e yōkoso.', hu: 'Isten hozott Japánban!', note: 'A へ partikulát „e"-nek ejtjük.' }
    ],
    words: [
      {
        title: 'Foglalkozások',
        note: 'A 〜せい végű szavak tanulót jelentenek: こうこうせい = gimnazista, だいがくせい = egyetemista.',
        items: [
          { jp: 'がくせい', romaji: 'gakusei', hu: 'diák, hallgató' },
          { jp: 'こうこうせい', romaji: 'kōkōsei', hu: 'középiskolás' },
          { jp: 'だいがくせい', romaji: 'daigakusei', hu: 'egyetemista' },
          { jp: 'せんせい', romaji: 'sensei', hu: 'tanár (megszólítás is)' },
          { jp: 'きょうし', romaji: 'kyōshi', hu: 'tanár (a foglalkozás neve)' },
          { jp: 'かいしゃいん', romaji: 'kaishain', hu: 'irodai dolgozó' },
          { jp: 'いしゃ', romaji: 'isha', hu: 'orvos' },
          { jp: 'エンジニア', romaji: 'enjinia', hu: 'mérnök' }
        ]
      },
      {
        title: 'Hobbik',
        items: [
          { jp: 'しゅみ', romaji: 'shumi', hu: 'hobbi' },
          { jp: 'おんがく', romaji: 'ongaku', hu: 'zene' },
          { jp: 'スポーツ', romaji: 'supōtsu', hu: 'sport' },
          { jp: 'サッカー', romaji: 'sakkā', hu: 'foci' },
          { jp: 'えいが', romaji: 'eiga', hu: 'film, mozi' },
          { jp: 'どくしょ', romaji: 'dokusho', hu: 'olvasás' },
          { jp: 'りょうり', romaji: 'ryōri', hu: 'főzés' },
          { jp: 'りょこう', romaji: 'ryokō', hu: 'utazás' },
          { jp: 'ゲーム', romaji: 'gēmu', hu: 'játék (videojáték)' }
        ]
      },
      {
        title: 'Számok 1–10',
        note: 'A 4-nek, a 7-nek és a 9-nek két olvasata van; hogy mikor melyik kell, azt a szám után álló szó dönti el.',
        items: [
          { jp: 'いち', romaji: 'ichi', hu: '1' },
          { jp: 'に', romaji: 'ni', hu: '2' },
          { jp: 'さん', romaji: 'san', hu: '3' },
          { jp: 'よん / し', romaji: 'yon / shi', hu: '4', say: 'よん' },
          { jp: 'ご', romaji: 'go', hu: '5' },
          { jp: 'ろく', romaji: 'roku', hu: '6' },
          { jp: 'なな / しち', romaji: 'nana / shichi', hu: '7', say: 'なな' },
          { jp: 'はち', romaji: 'hachi', hu: '8' },
          { jp: 'きゅう / く', romaji: 'kyū / ku', hu: '9', say: 'きゅう' },
          { jp: 'じゅう', romaji: 'jū', hu: '10' }
        ]
      }
    ],
    culture: [
      {
        title: 'Meghajlás és kézfogás',
        text: 'Japánban bemutatkozáskor és köszönéskor <b>meghajolnak</b>: derékból, egyenes háttal, lesütött szemmel. Minél mélyebb a meghajlás, annál nagyobb a tisztelet. Kezet egymás között nem fognak; külföldivel kedvességből igen, de ha bizonytalan vagy, egy kis meghajlás mindig jó választás. A はじめまして és a よろしく おねがいします is meghajlással együtt hangzik el.'
      },
      {
        title: 'Előbb a családnév',
        text: 'A japánok a nevüket ugyanabban a sorrendben mondják, mint a magyarok: <b>elöl a családnév</b>, utána az utónév. A やまだ たろう családneve やまだ. A megszólítás alapja a családnév + さん; utónéven csak a család és a közeli barátok szólítják egymást.'
      },
      {
        title: 'Hányadikos vagy?',
        text: 'Az évfolyamot iskolatípusonként számolják újra. Az általános iskola (<b>しょうがっこう</b>) hat év, hatéves kortól; az alsó középiskola (<b>ちゅうがっこう</b>) három év; a felső középiskola (<b>こうこう</b>) szintén három; az egyetem (<b>だいがく</b>) négy. Egy tizenhét éves diák ezért nem „tizenegyedikes", hanem こうこうの にねんせい: a gimnázium másodikosa.'
      }
    ],
    quiz: [
      { q: '„Diák vagyok." Melyik partikula hiányzik?', jp: 'わたし＿ がくせいです。', a: 'は', wrong: ['の', 'か', 'を'], why: 'A は jelöli, miről szól a mondat: „ami engem illet, diák".' },
      { q: '„A nevem Anna." Melyik partikula hiányzik?', jp: 'わたし＿ なまえは アンナです。', a: 'の', wrong: ['は', 'も', 'か'], why: 'A の köti össze a birtokost a birtokkal: わたしの なまえ = az én nevem.' },
      { q: 'Hogyan lesz kérdés ebből: たなかさんは せんせいです。', a: 'たなかさんは せんせいですか。', wrong: ['たなかさんか せんせいです。', 'か たなかさんは せんせいです。', 'たなかさんは か せんせいです。'], why: 'A szórend nem változik, a か a mondat legvégére kerül.' },
      { q: '„Lí is diák." Melyik partikula hiányzik?', jp: 'リーさん＿ がくせいです。', a: 'も', wrong: ['は', 'の', 'か'], why: 'Az „is" a も: a は helyére lép.' },
      { q: 'Mit jelent: しゅみは なんですか。', a: 'Mi a hobbid?', wrong: ['Ez a hobbid?', 'A hobbim a zene.', 'Kinek a hobbija?'], why: 'A なん = „mi?", és a です elé kerül, oda, ahová a válasz.' },
      { q: 'Tanaka diák? A válasz: „Nem, irodai dolgozó." Melyik szóval kezded?', a: 'いいえ', wrong: ['はい', 'も', 'なん'], why: 'Tagadó válasz elején いいえ áll.' },
      { q: 'Hogyan mondod: „Tizennyolc éves vagyok."', a: 'わたしは じゅうはっさいです。', wrong: ['わたしは じゅうはちねんせいです。', 'わたしの じゅうはっさいです。', 'わたしは じゅうはっさいですか。'], why: 'Életkor: szám + さい; a 8 kiejtése itt はっ.' },
      { q: 'Melyik mondat helytelen?', a: 'わたしは アンナさんです。', wrong: ['わたしは アンナです。', 'やまださんは せんせいです。', 'リーさんも がくせいです。'], why: 'A さん másoknak jár: a saját nevedhez nem teszed hozzá.' },
      { q: '„Japántanár." Melyik partikula hiányzik?', jp: 'にほんご＿ せんせいです。', a: 'の', wrong: ['は', 'も', 'か'], why: 'A の köti a pontosító főnevet a másikhoz: a japán nyelv tanára.' },
      { q: 'Mit jelent: いもうとは にねんせいです。', a: 'A húgom másodikos.', wrong: ['A húgom kétéves.', 'Két húgom van.', 'A húgom a második gyerek.'], why: 'ねんせい = évfolyam; a kétéves にさい lenne.' },
      { q: 'Melyik mondatot mondod CSAK az első találkozáskor?', a: 'はじめまして。', wrong: ['こんにちは。', 'すみません。', 'さようなら。'], why: 'A はじめまして szó szerint „először": ismerősnek már nem mondod.' },
      { q: 'Valaki azt mondja: よろしく おねがいします。 Mit felelsz?', a: 'こちらこそ。', wrong: ['いいえ。', 'そうですか。', 'はじめまして。'], why: 'A こちらこそ = „részemről a szerencse": visszaadja az udvariasságot.' },
      { q: '„Magyarországról jöttem." Melyik partikula hiányzik?', jp: 'ハンガリー＿ きました。', a: 'から', wrong: ['は', 'の', 'も'], why: 'A から a kiindulópontot jelöli: -ból, -ről.' },
      { q: 'Hogy mondod: „angol nyelv"?', a: 'えいご', wrong: ['イギリスご', 'アメリカご', 'えいじん'], why: 'Az angol nyelv kivétel: nem az ország nevéből képezzük.' },
      { q: 'Tanaka tanár. Hogyan szólítod meg?', a: 'たなかせんせい', wrong: ['たなかくん', 'たなかちゃん', 'たなかきょうし'], why: 'Tanárt a nevével és a せんせい utótaggal szólítunk meg; a きょうし csak a foglalkozás neve.' },
      { q: 'Hogy mondod: „húszéves"?', a: 'はたち', wrong: ['にじゅっさい', 'にじゅうさい', 'はつか'], why: 'A húszévesre külön szó van: はたち.' },
      {
        q: 'Egy tizenhét éves japán diák a felső középiskola második évfolyamára jár. Hogy mondja?',
        a: 'こうこうの にねんせいです。',
        wrong: ['こうこうの じゅういちねんせいです。', 'にねんせいの こうこうです。', 'こうこうは にさいです。'],
        why: 'Az évfolyamot iskolatípusonként újraszámolják, és az iskola a の-val áll elöl.'
      },
      { q: 'Melyik a helyes kérdés a névre?', a: 'おなまえは なんですか。', wrong: ['なんですか おなまえは。', 'おなまえは なにですか。', 'おなまえの なんですか。'], why: 'A kérdőszó a です elé kerül, és ott なん alakban áll.' },
      { q: 'Mit jelent ereszkedő hanglejtéssel: そうですか。', a: 'Értem.', wrong: ['Tényleg így van?', 'Igen, így van.', 'Nem így van.'], why: 'Ereszkedő hanglejtéssel nem kérdés, hanem tudomásulvétel.' },
      { q: 'Melyik szó áll a „te / ön" helyén egy udvarias japán mondatban?', a: 'a másik ember neve + さん', wrong: ['あなた', 'わたし', 'こちら'], why: 'A japán a megszólított nevét használja; az あなた idegenül hat.' }
    ]
  },

  /* ── 2. lecke ─────────────────────────────────────── */
  {
    id: 'l2', no: 2, book: 'Dekiru 1', title: 'Ez, az, amaz',
    lead: 'Rámutatsz dolgokra és helyekre, megkérdezed, mi micsoda, hol van és kié, és megtanulsz udvariasan tagadni.',
    cando: [
      'Megnevezed, ami előtted van, és megkérdezed, mi az.',
      'Megkérdezed, hol van valami, és kié.',
      'Körbevezetsz valakit a lakásban, és megérted, ha téged vezetnek körbe.',
      'Udvariasan tagadsz, és tudod, mit mondj vendégségben.'
    ],
    intro: [
      'A magyarban két távolság van: <i>ez</i> és <i>az</i>. A japánban <b>három</b>: ami <b>nálam</b> van (こ), ami <b>nálad</b> van (そ), és ami <b>mindkettőnktől távol</b> van (あ). A negyedik tag a kérdés (ど). Ebből a négy kezdőhangból épül fel az egész mutató rendszer: ha egyszer megérted, minden sora ugyanúgy működik.',
      'A lecke másik fele a tagadás. Az előző leckében csak állítani tudtál (〜です); most megtanulod az ellenkezőjét is (〜じゃ ありません), és ezzel már teljes, udvarias választ tudsz adni egy eldöntendő kérdésre.'
    ],
    dialogue: {
      title: 'A fogadócsaládnál',
      scene: 'Anna megérkezik a fogadócsaládjához. Szató asszony az ajtóban várja, és körbevezeti a házban.',
      lines: [
        { who: 'Szató', jp: 'アンナさん、どうぞ あがって ください。', romaji: 'Anna-san, dōzo agatte kudasai.', hu: 'Anna, fáradj be!' },
        { who: 'Anna', jp: 'おじゃまします。', romaji: 'Ojama shimasu.', hu: 'Elnézést a zavarásért. (belépéskor)' },
        { who: 'Szató', jp: 'これは アンナさんの スリッパです。どうぞ。', romaji: 'Kore wa Anna-san no surippa desu. Dōzo.', hu: 'Ez a te papucsod. Tessék.' },
        { who: 'Anna', jp: 'ありがとう ございます。', romaji: 'Arigatō gozaimasu.', hu: 'Köszönöm szépen.' },
        { who: 'Szató', jp: 'ここは リビングです。そこは だいどころです。', romaji: 'Koko wa ribingu desu. Soko wa daidokoro desu.', hu: 'Ez itt a nappali. Az ott a konyha.' },
        { who: 'Anna', jp: 'すみません、トイレは どこですか。', romaji: 'Sumimasen, toire wa doko desu ka.', hu: 'Elnézést, hol van a vécé?' },
        { who: 'Szató', jp: 'あそこです。アンナさんの へやは にかいです。', romaji: 'Asoko desu. Anna-san no heya wa nikai desu.', hu: 'Amott. A te szobád az emeleten van.' },
        { who: 'Anna', jp: 'わあ、たたみの へやですね。あれは なんですか。', romaji: 'Wā, tatami no heya desu ne. Are wa nan desu ka.', hu: 'Jé, tatamis szoba! Az ott micsoda?' },
        { who: 'Szató', jp: 'あれは おしいれです。', romaji: 'Are wa oshiire desu.', hu: 'Az a beépített szekrény.' },
        { who: 'Anna', jp: 'この かばんは だれのですか。', romaji: 'Kono kaban wa dare no desu ka.', hu: 'Ez a táska kié?' },
        { who: 'Szató', jp: 'それは わたしのじゃ ありません。むすめのです。', romaji: 'Sore wa watashi no ja arimasen. Musume no desu.', hu: 'Az nem az enyém. A lányomé.' }
      ],
      notes: [
        'A <b>どうぞ あがって ください</b> szó szerint „tessék fellépni": a japán lakás padlója magasabban van, mint az előtér, ahol a cipőt leveszed. Ezért a vendéget nem „beljebb", hanem „feljebb" invitálják.',
        'Az <b>おじゃまします</b> („zavarni fogok") a belépő vendég mondata; távozáskor ugyanez múlt időben hangzik el: <b>おじゃましました</b>.',
        'Figyeld meg a nézőpontváltást: Anna azt kérdezi, <b>この</b> かばん (ami nála van), Szató asszony pedig úgy felel, <b>それ</b> (ami a másiknál van). Ugyanarról a táskáról beszélnek.',
        'A <b>にかい</b> a japán számolás szerinti „második szint": az, amit magyarul első emeletnek hívunk. A földszint az いっかい.',
        'A mondat végi <b>ね</b> egyetértést vár: „…, ugye?", „milyen …!". A <b>わあ</b> a meglepett öröm hangja.'
      ]
    },
    points: [
      {
        title: 'これ・それ・あれ', sub: 'ez, az, amaz',
        pattern: 'これ / それ / あれ は 〜です',
        body: 'A japán három távolságot különböztet meg. <b>これ</b>: ami nálam van. <b>それ</b>: ami nálad van. <b>あれ</b>: ami mindkettőnktől távol van. Ezek önállóan állnak, főnév nélkül. A hozzájuk tartozó kérdőszó: <b>どれ</b> (melyik?).',
        more: [
          'A három szó közül az dönt, <b>kihez van közelebb</b> a dolog. <b>これ</b>: nálam, a beszélőnél. <b>それ</b>: nálad, akihez beszélek. <b>あれ</b>: egyikünknél sincs, mindkettőnktől távol.',
          'Ha a két beszélgető egymás mellett áll, és együtt néznek valamit, a felosztás távolság szerinti: これ a közeli, それ a kicsit távolabbi, あれ a messzi.',
          'A kérdő tag a <b>どれ</b> (melyik?): három vagy több dolog közül választasz vele. Önállóan állnak, főnév nélkül: úgy viselkednek, mint egy főnév.'
        ],
        tables: [
          {
            caption: 'A こ・そ・あ・ど rendszer',
            head: ['', 'こ (nálam)', 'そ (nálad)', 'あ (távol)', 'ど (kérdés)'],
            rows: [
              ['dolog', 'これ', 'それ', 'あれ', 'どれ'],
              ['+ főnév', 'この', 'その', 'あの', 'どの'],
              ['hely', 'ここ', 'そこ', 'あそこ', 'どこ'],
              ['irány, udvarias', 'こちら', 'そちら', 'あちら', 'どちら']
            ]
          }
        ],
        examples: [
          { jp: 'これは ほんです。', romaji: 'Kore wa hon desu.', hu: 'Ez könyv.' },
          { jp: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', hu: 'Az (ott nálad) micsoda?' },
          { jp: 'あれは がっこうです。', romaji: 'Are wa gakkō desu.', hu: 'Az ott iskola.' },
          { jp: 'たなかさんの かさは どれですか。', romaji: 'Tanaka-san no kasa wa dore desu ka.', hu: 'Melyik Tanaka esernyője?' },
          { jp: 'それは わたしの とけいです。', romaji: 'Sore wa watashi no tokei desu.', hu: 'Az az én órám.' }
        ],
        notes: [
          'A válaszban <b>megfordul a nézőpont</b>. Ha azt kérdezed, それは なんですか (az mi nálad?), a másik így felel: これは …です (ez nálam egy …).',
          'A これ, それ, あれ tárgyakra való. Emberre rámutatva udvariatlan; emberre a この ひと vagy az udvarias こちら használatos.'
        ],
        mistakes: [
          { bad: 'A: それは なんですか。 B: それは じしょです。', good: 'A: それは なんですか。 B: これは じしょです。', why: 'Ami a kérdezőnek „az nálad", az a válaszolónak „ez nálam".' }
        ]
      },
      {
        title: 'この・その・あの', sub: 'ez a …, az a …',
        pattern: 'この / その / あの + főnév',
        body: 'Ha a főnevet is kimondod, a <b>この・その・あの</b> alakot használod, és utána rögtön a főnév jön. Önállóan nem állhatnak. Kérdőszó: <b>どの</b> (melyik …?).',
        more: [
          'A <b>この, その, あの</b> önállóan nem állhat meg: mindig <b>főnév</b> jön utána. A これ maga a dolog („ez"), a この csak jelző („ez a …").',
          'A kérdő tag a <b>どの</b> + főnév: どの かばんですか (melyik táska?).'
        ],
        tables: [
          {
            caption: 'これ vagy この?',
            head: ['Önállóan', 'Főnévvel'],
            rows: [
              ['これは ほんです。', 'この ほんは わたしのです。'],
              ['それは かさです。', 'その かさは だれのですか。'],
              ['あれは がっこうです。', 'あの がっこうは こうこうです。']
            ]
          }
        ],
        examples: [
          { jp: 'この かばんは わたしのです。', romaji: 'Kono kaban wa watashi no desu.', hu: 'Ez a táska az enyém.' },
          { jp: 'その ほんは にほんごの ほんです。', romaji: 'Sono hon wa nihongo no hon desu.', hu: 'Az a könyv japánkönyv.' },
          { jp: 'あの ひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', hu: 'Ki az az ember ott?' },
          { jp: 'どの かばんですか。', romaji: 'Dono kaban desu ka.', hu: 'Melyik táska?' }
        ],
        notes: [
          'Az <b>あの ひと</b> („az az ember") a japán „ő": külön személyes névmást ritkán használnak. Udvariasabban: <b>あの かた</b>.'
        ],
        mistakes: [
          { bad: 'このは わたしの ほんです。', good: 'これは わたしの ほんです。', why: 'A この után kötelező a főnév. Ha nincs főnév, a これ kell.' },
          { bad: 'これ ほんは わたしのです。', good: 'この ほんは わたしのです。', why: 'Főnév előtt a この áll, nem a これ.' }
        ],
        tip: 'これ = „ez" önállóan · この = „ez a …" főnév előtt. A kettő felcserélése a leggyakoribb kezdő hiba.'
      },
      {
        title: 'ここ・そこ・あそこ', sub: 'itt, ott, amott',
        pattern: 'ここ / そこ / あそこ は 〜です',
        body: 'Ugyanez a hármas helyekre: <b>ここ</b> (itt, nálam), <b>そこ</b> (ott, nálad), <b>あそこ</b> (amott). Kérdőszó: <b>どこ</b> (hol?). A „hol van X?" legegyszerűbben: X は どこですか。',
        more: [
          'A <b>ここ, そこ, あそこ</b> ugyanazt a hármas felosztást követi, csak nem tárgyra, hanem <b>helyre</b> mutat. Ha egy tárgyat nevezel meg, これ kell; ha azt a helyet, ahol állsz, akkor ここ.',
          'Kétféle mondatot építhetsz vele. Bemutatod a helyet: <b>ここは だいどころです</b> (ez itt a konyha). Vagy megmondod, hol van valami: <b>トイレは あそこです</b> (a vécé amott van).',
          'Az udvarias sor a <b>こちら, そちら, あちら, どちら</b>: eredetileg irányt jelent (erre, arra, merre), de helyre és emberre is ezt használják, ha tisztelettel beszélnek.'
        ],
        examples: [
          { jp: 'ここは だいどころです。', romaji: 'Koko wa daidokoro desu.', hu: 'Ez itt a konyha.' },
          { jp: 'トイレは どこですか。', romaji: 'Toire wa doko desu ka.', hu: 'Hol van a mosdó?' },
          { jp: 'あそこです。', romaji: 'Asoko desu.', hu: 'Ott van.' },
          { jp: 'ここは どこですか。', romaji: 'Koko wa doko desu ka.', hu: 'Hol vagyunk?' },
          { jp: 'うけつけは こちらです。', romaji: 'Uketsuke wa kochira desu.', hu: 'A recepció erre van.' },
          { jp: 'おくには どちらですか。', romaji: 'O-kuni wa dochira desu ka.', hu: 'Melyik országból való?' }
        ],
        notes: ['A harmadik tag <b>あそこ</b>, nem „あこ": ez az egyetlen szabálytalan alak a rendszerben.'],
        mistakes: [
          { bad: 'これは きょうしつです。', good: 'ここは きょうしつです。', why: 'A tanterem hely, nem tárgy: a helyet a ここ nevezi meg.' }
        ]
      },
      {
        title: '〜かい', sub: 'emeletek',
        pattern: 'szám + かい (がい)',
        body: 'Az épület szintjeit a <b>かい</b> számlálja. A japán nem földszintet és emeleteket mond, hanem <b>szinteket</b>: ahol belépsz az utcáról, az az első szint (<b>いっかい</b>). Amit magyarul első emeletnek hívunk, az japánul már <b>にかい</b>.',
        more: [
          'Néhány szám a かい előtt megváltozik: 1 いっかい, 6 ろっかい, 8 はっかい, 10 じゅっかい. A hármas után a かい zöngés lesz: <b>さんがい</b>, és a kérdés is így hangzik: <b>なんがい</b>.'
        ],
        tables: [
          {
            caption: 'Szintek',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1.', '<b>いっかい</b>', '6.', '<b>ろっかい</b>'],
              ['2.', 'にかい', '7.', 'ななかい'],
              ['3.', '<b>さんがい</b>', '8.', '<b>はっかい</b>'],
              ['4.', 'よんかい', '9.', 'きゅうかい'],
              ['5.', 'ごかい', '10.', '<b>じゅっかい</b>']
            ]
          }
        ],
        examples: [
          { jp: 'わたしの へやは にかいです。', romaji: 'Watashi no heya wa nikai desu.', hu: 'A szobám az első emeleten van.' },
          { jp: 'うけつけは いっかいです。', romaji: 'Uketsuke wa ikkai desu.', hu: 'A recepció a földszinten van.' },
          { jp: 'きょうしつは なんがいですか。', romaji: 'Kyōshitsu wa nangai desu ka.', hu: 'Hányadik szinten van a tanterem?' }
        ],
        tip: 'Liftben, áruházban mindig eggyel nagyobb számot keress, mint amit magyarul mondanál: a „harmadik emelet" a よんかい.'
      },
      {
        title: 'だれの', sub: 'kié?',
        pattern: 'だれの 〜ですか · 〜の です',
        body: 'A <b>だれ</b> (ki?) és a の együtt: <b>だれの</b> = kié. A válaszban a főnevet el is hagyhatod: <b>わたしのです</b> = „az enyém".',
        more: [
          'A kérdőszó itt is oda kerül, ahová a válasz: <b>だれ</b>の かさ → <b>はは</b>の かさ. A birtokos + の a birtok <b>elé</b> áll.',
          'Ha a birtok már szóba került, a の után <b>elhagyhatod</b>: わたしの かさです helyett elég annyi, hogy わたしのです (az enyém).',
          'A だれ udvarias párja a <b>どなた</b>: idegenre, idősebbre így kérdezel rá.'
        ],
        tables: [
          {
            caption: 'Kérdőszók eddig',
            head: ['Kérdőszó', 'Jelentés', 'Példa'],
            rows: [
              ['なん', 'mi?', 'これは なんですか。'],
              ['どれ', 'melyik? (önállóan)', 'かさは どれですか。'],
              ['どの + főnév', 'melyik …?', 'どの かさですか。'],
              ['どこ', 'hol?', 'トイレは どこですか。'],
              ['だれ', 'ki?', 'あの ひとは だれですか。'],
              ['だれの', 'kié?', 'だれの かさですか。']
            ]
          }
        ],
        examples: [
          { jp: 'これは だれの かさですか。', romaji: 'Kore wa dare no kasa desu ka.', hu: 'Kié ez az esernyő?' },
          { jp: 'ははのです。', romaji: 'Haha no desu.', hu: 'Az anyámé.' },
          { jp: 'それは せんせいの くるまです。', romaji: 'Sore wa sensei no kuruma desu.', hu: 'Az a tanár autója.' },
          { jp: 'あの かたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', hu: 'Ki az az úr (hölgy)?' },
          { jp: 'この じしょは わたしのです。', romaji: 'Kono jisho wa watashi no desu.', hu: 'Ez a szótár az enyém.' }
        ],
        notes: [
          'A saját családtagjaidról másnak beszélve a szerény alakot használod: はは (az anyám), ちち (az apám). A családi szavak két soráról a 3. leckében lesz szó.'
        ]
      },
      {
        title: '〜じゃありません', sub: 'tagadás',
        pattern: 'A は B じゃありません',
        body: 'A です tagadása <b>じゃありません</b>; írásban és hivatalosabb helyzetben <b>ではありません</b>. A mondat többi része nem változik.',
        more: [
          'A tagadáshoz a です helyére <b>じゃ ありません</b> kerül. A じゃ a <b>では</b> összevont, beszélt alakja: a 〜では ありません ugyanazt jelenti, csak hivatalosabb, írásban gyakoribb.',
          'Egy eldöntendő kérdésre a teljes, udvarias tagadó válasz három lépés: いいえ → mi nem az → mi az. これは えんぴつですか。 → いいえ、えんぴつじゃ ありません。ペンです。'
        ],
        tables: [
          {
            caption: 'Állítás és tagadás',
            head: ['', 'Állító', 'Tagadó'],
            rows: [
              ['beszédben', 'がくせいです', 'がくせい<b>じゃ ありません</b>'],
              ['hivatalosan', 'がくせいです', 'がくせい<b>では ありません</b>']
            ]
          }
        ],
        examples: [
          { jp: 'これは わたしの かばんじゃありません。', romaji: 'Kore wa watashi no kaban ja arimasen.', hu: 'Ez nem az én táskám.' },
          { jp: 'いいえ、がくせいじゃありません。', romaji: 'Iie, gakusei ja arimasen.', hu: 'Nem, nem vagyok diák.' },
          { jp: 'ここは きょうしつではありません。', romaji: 'Koko wa kyōshitsu dewa arimasen.', hu: 'Ez itt nem tanterem.' },
          { jp: 'いいえ、えんぴつじゃ ありません。ペンです。', romaji: 'Iie, enpitsu ja arimasen. Pen desu.', hu: 'Nem, nem ceruza. Toll.' }
        ],
        notes: [
          'A では-ban álló は partikula, ezért itt is „wa"-nak hangzik: „dewa arimasen".',
          'A じゃ önmagában nem tagad: mindig az ありません követi.'
        ],
        mistakes: [
          { bad: 'これは ほんです ありません。', good: 'これは ほんじゃ ありません。', why: 'A tagadó alak a です <b>helyére</b> lép, nem mellé.' }
        ]
      }
    ],
    phrases: [
      { jp: 'どうぞ あがって ください。', romaji: 'Dōzo agatte kudasai.', hu: 'Fáradjon be! (lakásba)', note: 'Szó szerint: „tessék fellépni". Üzletbe, irodába hívva: どうぞ おはいり ください.' },
      { jp: 'おじゃまします。', romaji: 'Ojama shimasu.', hu: 'Elnézést a zavarásért. (belépéskor)' },
      { jp: 'おじゃましました。', romaji: 'Ojama shimashita.', hu: 'Elnézést, hogy zavartam. (távozáskor)' },
      { jp: 'どうぞ。', romaji: 'Dōzo.', hu: 'Tessék.', note: 'Kínáláskor, átadáskor, előreengedéskor: mindenre jó.' },
      { jp: 'おのみものは いかがですか。', romaji: 'O-nomimono wa ikaga desu ka.', hu: 'Iszik valamit?', note: 'Az いかがですか a „hogy tetszik? kér?" udvarias kérdése.' },
      { jp: 'コーヒーを おねがいします。', romaji: 'Kōhī o onegai shimasu.', hu: 'Kávét kérek.' },
      { jp: 'そろそろ しつれいします。', romaji: 'Sorosoro shitsurei shimasu.', hu: 'Lassan indulnom kell.', note: 'Így jelzed vendégségben, hogy mennél. A しつれいします önmagában is búcsú: „engedelmével".' },
      { jp: 'また きて ください。', romaji: 'Mata kite kudasai.', hu: 'Jöjjön el máskor is!' },
      { jp: 'ただいま。', romaji: 'Tadaima.', hu: 'Megjöttem!', note: 'Aki hazaér, ezt mondja; a válasz: おかえりなさい.' },
      { jp: 'おかえりなさい。', romaji: 'Okaerinasai.', hu: 'Isten hozott itthon!' }
    ],
    words: [
      {
        title: 'A ház helyiségei',
        items: [
          { jp: 'うち', romaji: 'uchi', hu: 'otthon, ház' },
          { jp: 'へや', romaji: 'heya', hu: 'szoba' },
          { jp: 'げんかん', romaji: 'genkan', hu: 'előtér' },
          { jp: 'リビング', romaji: 'ribingu', hu: 'nappali' },
          { jp: 'だいどころ', romaji: 'daidokoro', hu: 'konyha' },
          { jp: 'しんしつ', romaji: 'shinshitsu', hu: 'hálószoba' },
          { jp: 'トイレ', romaji: 'toire', hu: 'vécé' },
          { jp: 'おふろ', romaji: 'o-furo', hu: 'fürdő' },
          { jp: 'にわ', romaji: 'niwa', hu: 'kert' }
        ]
      },
      {
        title: 'Tárgyak körülötted',
        items: [
          { jp: 'ほん', romaji: 'hon', hu: 'könyv' },
          { jp: 'ノート', romaji: 'nōto', hu: 'füzet' },
          { jp: 'えんぴつ', romaji: 'enpitsu', hu: 'ceruza' },
          { jp: 'じしょ', romaji: 'jisho', hu: 'szótár' },
          { jp: 'かばん', romaji: 'kaban', hu: 'táska' },
          { jp: 'かさ', romaji: 'kasa', hu: 'esernyő' },
          { jp: 'かぎ', romaji: 'kagi', hu: 'kulcs' },
          { jp: 'とけい', romaji: 'tokei', hu: 'óra' },
          { jp: 'つくえ', romaji: 'tsukue', hu: 'íróasztal' },
          { jp: 'いす', romaji: 'isu', hu: 'szék' },
          { jp: 'まど', romaji: 'mado', hu: 'ablak' },
          { jp: 'けいたい', romaji: 'keitai', hu: 'mobiltelefon' }
        ]
      },
      {
        title: 'A japán otthon tárgyai',
        items: [
          { jp: 'たたみ', romaji: 'tatami', hu: 'gyékénypadló' },
          { jp: 'ふとん', romaji: 'futon', hu: 'földre terített ágynemű' },
          { jp: 'おしいれ', romaji: 'oshiire', hu: 'beépített szekrény' },
          { jp: 'スリッパ', romaji: 'surippa', hu: 'papucs' },
          { jp: 'こたつ', romaji: 'kotatsu', hu: 'fűtött, takarós asztal' },
          { jp: 'ざぶとん', romaji: 'zabuton', hu: 'ülőpárna' }
        ]
      }
    ],
    culture: [
      {
        title: 'Cipő le, papucs fel, papucs le',
        text: 'A japán lakásba belépve először az előtérbe (<b>げんかん</b>) jutsz. Itt leveszed a cipődet, és orrával az ajtó felé fordítva leteszed. A lakás padlója egy lépcsőfoknyival magasabban van: ide már papucsban lépsz fel. A gyékénypadlós (<b>たたみ</b>) szobába viszont a papucs sem jöhet be, oda zokniban vagy mezítláb lépsz. A vécében külön papucs vár: azt ne felejtsd a lábadon, amikor kijössz.'
      },
      {
        title: 'Ahol nappal nincs ágy',
        text: 'A hagyományos szobában nincs ágy. Este a beépített szekrényből (<b>おしいれ</b>) előveszik és a tatamira terítik a <b>ふとん</b>-t, reggel pedig összehajtva visszateszik. Így ugyanaz a szoba nappal nappali, éjjel hálószoba. A mai lakásokban gyakran van egy tatamis és több nyugati stílusú, ágyas szoba is.'
      },
      {
        title: 'Zöld tea, fekete tea, árpatea',
        text: 'Ha vendégségben teával kínálnak, az <b>おちゃ</b> zöld teát jelent. A nálunk megszokott fekete tea neve <b>こうちゃ</b> („vörös tea"). Nyáron gyakran <b>むぎちゃ</b>-t kapsz: ez pirított árpából készült, hidegen, jégkockával ivott ital, koffein nélkül.'
      }
    ],
    quiz: [
      { q: 'A tárgy a beszélgetőtársad kezében van. Melyik szóval mutatsz rá?', a: 'それ', wrong: ['これ', 'あれ', 'どれ'], why: 'A それ arra vonatkozik, ami a hallgatóhoz van közel.' },
      { q: '„Ez a táska az enyém." Mi hiányzik?', jp: '＿ かばんは わたしのです。', a: 'この', wrong: ['これ', 'ここ', 'どの'], why: 'Főnév előtt この áll; a これ csak önállóan.' },
      { q: '„Hol van a mosdó?" Mi hiányzik?', jp: 'トイレは ＿ ですか。', a: 'どこ', wrong: ['だれ', 'なん', 'どれ'], why: 'Helyre a どこ kérdez.' },
      { q: 'Mit jelent: これは だれの かさですか。', a: 'Kié ez az esernyő?', wrong: ['Ki ez?', 'Hol van az esernyő?', 'Ez esernyő?'], why: 'だれの = „kié", utána a birtok: かさ (esernyő).' },
      { q: 'Melyik mondat jelenti: „Ez nem könyv."', a: 'これは ほんじゃありません。', wrong: ['これは ほんですか。', 'これも ほんです。', 'これは ほんのです。'], why: 'A です tagadása じゃありません.' },
      { q: 'Egy épület mindkettőtöktől távol áll. Hogyan kérdezed meg, mi az?', a: 'あれは なんですか。', wrong: ['これは なんですか。', 'それは なんですか。', 'あの なんですか。'], why: 'Ami mindkét beszélőtől távol van: あれ.' },
      { q: '„Az anyámé." Melyik partikula hiányzik?', jp: 'はは＿です。', a: 'の', wrong: ['は', 'も', 'が'], why: 'A birtokos の után a főnév elhagyható: ははのです.' },
      { q: 'Melyik mondat helyes?', a: 'その ほんは わたしのです。', wrong: ['それ ほんは わたしのです。', 'そこ ほんは わたしのです。', 'その は わたしのです。'], why: 'Főnév előtt その áll; a それ csak önállóan.' },
      { q: '„Ki az az ember ott?" Mi hiányzik?', jp: 'あの ひとは ＿ですか。', a: 'だれ', wrong: ['どこ', 'なん', 'どれ'], why: 'Személyre a だれ kérdez.' },
      { q: 'Mit jelent: ここは きょうしつではありません。', a: 'Ez itt nem tanterem.', wrong: ['Ez itt a tanterem.', 'Hol van a tanterem?', 'Ez az én tantermem.'], why: 'A ではありません a です tagadása (írott, hivatalosabb alak).' },
      { q: 'A barátod kezében van egy könyv. Rákérdezel: „Az mi?"', a: 'それは なんですか。', wrong: ['これは なんですか。', 'あれは なんですか。', 'どれは なんですか。'], why: 'Ami a másiknál van, arra a それ mutat.' },
      { q: 'Azt kérdezik tőled: それは なんですか。 A kezedben szótár van. Hogy felelsz?', a: 'これは じしょです。', wrong: ['それは じしょです。', 'あれは じしょです。', 'ここは じしょです。'], why: 'A válaszban megfordul a nézőpont: ami neki それ, az neked これ.' },
      { q: 'Melyik mondatban jó a mutatószó?', a: 'この ほんは わたしのです。', wrong: ['これ ほんは わたしのです。', 'このは わたしの ほんです。', 'ここ ほんは わたしのです。'], why: 'Főnév előtt この áll; a これ önállóan használatos.' },
      { q: '„Ez itt a konyha." Melyik szó hiányzik?', jp: '＿は だいどころです。', a: 'ここ', wrong: ['これ', 'この', 'どこ'], why: 'A konyha hely: a helyre a ここ mutat.' },
      { q: 'Hogy mondod: „a földszinten"?', a: 'いっかい', wrong: ['にかい', 'ぜろかい', 'さんがい'], why: 'A japán szinteket számol: az utcaszint az első szint.' },
      { q: 'Mit mondasz, amikor vendégként belépsz valaki lakásába?', a: 'おじゃまします。', wrong: ['ただいま。', 'おかえりなさい。', 'はじめまして。'], why: 'Az おじゃまします a belépő vendég mondata; a ただいま-t az mondja, aki hazaér.' },
      { q: 'Mi a 〜じゃ ありません hivatalosabb párja?', a: '〜では ありません', wrong: ['〜です ありません', '〜も ありません', '〜の ありません'], why: 'A じゃ a では összevont, beszélt alakja.' },
      { q: 'Valaki megkérdezi: これは だれの かさですか。 Az esernyő a tiéd. Mi a legrövidebb helyes válasz?', a: 'わたしのです。', wrong: ['わたしです。', 'わたしの です かさ。', 'これは わたしです。'], why: 'A birtokot a の után elhagyhatod: わたしのです = az enyém.' },
      { q: 'Melyik a „hányadik szinten?" kérdés?', a: 'なんがい', wrong: ['いくつかい', 'なにかい', 'どこかい'], why: 'A kérdésben a かい zöngés: なんがい, akárcsak a さんがい-ban.' },
      { q: 'Hol veszed le a cipődet egy japán lakásban?', a: 'a げんかん-ban', wrong: ['a たたみ-n', 'az おしいれ-ben', 'a リビング-ben'], why: 'A げんかん az előtér: innen lépsz fel a lakásba, már cipő nélkül.' }
    ]
  },

  /* ── 3. lecke ─────────────────────────────────────── */
  {
    id: 'l3', no: 3, book: 'Dekiru 1', title: 'Mi hol van?',
    lead: 'Elmondod, mi van a városodban és a szobádban, ki van otthon, és bemutatod a családodat.',
    cando: [
      'Megmondod, mi hol található, és rá is kérdezel.',
      'Különbséget teszel élő és élettelen között (います / あります).',
      'Megmondod, hogy valami nincs, senki sincs, semmi sincs.',
      'Bemutatod a családodat, és megszámolod az embereket.'
    ],
    intro: [
      'Eddig csak azt tudtad megmondani, hogy valami <i>micsoda</i> (〜です). Most megtanulod, hogy valami <b>van valahol</b>. A japán erre két igét használ, és a választás nem a mérettől vagy a fontosságtól függ, hanem attól, hogy a dolog <b>él-e és magától mozog-e</b>: emberre és állatra <b>います</b>, minden másra <b>あります</b>.',
      'Ezzel együtt két új partikula érkezik. A <b>に</b> megmondja, <b>hol</b> van valami; a <b>が</b> megjelöli, <b>mi</b> az, ami ott van. A が az alany jele: ezzel vezetsz be új szereplőt a beszélgetésbe, míg a は arról szól, amit már mindketten ismertek. A kettő különbsége az egész japán nyelvtan egyik legfontosabb kérdése, és ebben a leckében találkozol vele először.'
    ],
    dialogue: {
      title: 'Séta a környéken',
      scene: 'Anna és a fogadócsalád lánya, Jui elindulnak, hogy körülnézzenek a környéken.',
      lines: [
        { who: 'Jui', jp: 'いって きます。', romaji: 'Itte kimasu.', hu: 'Elmentem! (és visszajövök)' },
        { who: 'Szató', jp: 'いって らっしゃい。', romaji: 'Itte rasshai.', hu: 'Menj csak, és gyere vissza épségben!' },
        { who: 'Anna', jp: 'ユイさん、この ちかくに コンビニが ありますか。', romaji: 'Yui-san, kono chikaku ni konbini ga arimasu ka.', hu: 'Jui, van itt a közelben kisbolt?' },
        { who: 'Jui', jp: 'はい、あります。えきの まえに ありますよ。', romaji: 'Hai, arimasu. Eki no mae ni arimasu yo.', hu: 'Igen, van. Az állomás előtt.' },
        { who: 'Anna', jp: 'ぎんこうも ありますか。', romaji: 'Ginkō mo arimasu ka.', hu: 'Bank is van?' },
        { who: 'Jui', jp: 'ぎんこうは コンビニの となりに あります。', romaji: 'Ginkō wa konbini no tonari ni arimasu.', hu: 'A bank a kisbolt mellett van.' },
        { who: 'Anna', jp: 'あ、あそこに ねこが いますね。', romaji: 'A, asoko ni neko ga imasu ne.', hu: 'Ó, ott egy macska!' },
        { who: 'Jui', jp: 'ええ。いつも あの みせの まえに います。', romaji: 'Ee. Itsumo ano mise no mae ni imasu.', hu: 'Igen. Mindig az előtt a bolt előtt van.' },
        { who: 'Anna', jp: 'ユイさんは きょうだいが いますか。', romaji: 'Yui-san wa kyōdai ga imasu ka.', hu: 'Van testvéred, Jui?' },
        { who: 'Jui', jp: 'はい、あにが ひとり います。いま とうきょうに います。', romaji: 'Hai, ani ga hitori imasu. Ima Tōkyō ni imasu.', hu: 'Igen, van egy bátyám. Most Tokióban van.' },
        { who: 'Anna', jp: 'そうですか。わたしは きょうだいが いません。', romaji: 'Sō desu ka. Watashi wa kyōdai ga imasen.', hu: 'Értem. Nekem nincs testvérem.' }
      ],
      notes: [
        'Az <b>いって きます</b> és az <b>いって らっしゃい</b> elválaszthatatlan pár: az első az induló mondata („megyek és jövök"), a második az otthon maradóé. Minden reggel elhangzik.',
        'Anna először azt kérdezi, コンビニ<b>が</b> ありますか: a kisbolt új szereplő, ezért が. A bankról Jui már úgy beszél, ぎんこう<b>は</b>: az előbb szóba került, most már az a téma, hogy <i>hol</i> van.',
        'A ぎんこう<b>も</b> ありますか mondatban a も a が helyére lépett („bank <i>is</i> van?").',
        'A <b>きょうだいが います</b> szó szerint „testvér van": a japán így mondja azt, hogy valakinek van testvére. A „nekem van" nem külön ige, hanem a létezés igéje.',
        'Az <b>ええ</b> a はい lazább, beszélgetős párja. A mondatvégi <b>よ</b> új információt ad át, a <b>ね</b> egyetértést vár.'
      ]
    },
    points: [
      {
        title: 'あります・います', sub: '„van"',
        pattern: 'hely に + valami が あります / います',
        body: 'A létezést két ige fejezi ki. <b>あります</b>: tárgyak, növények, épületek, vagyis ami nem mozog magától. <b>います</b>: emberek és állatok. A helyet a <b>に</b> jelöli, azt pedig, ami ott van, a <b>が</b>.',
        more: [
          'A választás elve: <b>ami él és magától mozog</b>, az います; <b>minden más</b> あります. A növény él, de nem mozog, ezért あります. A busz mozog, de nem él, ezért szintén あります.',
          'Az ige <b>nem változik</b> sem szám, sem személy szerint: egy diák és száz diák mellett ugyanúgy います áll.',
          'Ugyanezzel a két igével fejezed ki azt is, hogy valakinek <b>van valamije</b>: じかんが あります (van időm), きょうだいが います (van testvérem). A „nekem" rész a は-val áll elöl: わたしは くるまが あります.'
        ],
        tables: [
          {
            caption: 'Melyik ige?',
            head: ['', 'います', 'あります'],
            rows: [
              ['mire?', 'ember, állat', 'tárgy, növény, épület, esemény'],
              ['példa', 'せんせい, いぬ, さかな', 'ほん, き, バス, じかん'],
              ['kérdés', '<b>だれ</b>が いますか · <b>なに</b>が いますか', '<b>なに</b>が ありますか']
            ]
          }
        ],
        examples: [
          { jp: 'へやに つくえが あります。', romaji: 'Heya ni tsukue ga arimasu.', hu: 'A szobában van egy asztal.' },
          { jp: 'こうえんに いぬが います。', romaji: 'Kōen ni inu ga imasu.', hu: 'A parkban van egy kutya.' },
          { jp: 'きょうしつに がくせいが います。', romaji: 'Kyōshitsu ni gakusei ga imasu.', hu: 'A tanteremben diákok vannak.' },
          { jp: 'にわに きが あります。', romaji: 'Niwa ni ki ga arimasu.', hu: 'A kertben van egy fa.' },
          { jp: 'わたしは くるまが あります。', romaji: 'Watashi wa kuruma ga arimasu.', hu: 'Van autóm.' }
        ],
        notes: [
          'Állatra a kérdőszó <b>なに</b> (mi?), nem だれ: こうえんに なにが いますか。 → いぬが います。',
          'A helyet jelölő に a magyar -ban/-ben, -on/-en ragnak felel meg, de csak a <b>létezés helyére</b>. A cselekvés helyét más partikula jelöli (で), azt a 6. leckében tanulod.'
        ],
        mistakes: [
          { bad: 'こうえんに いぬが あります。', good: 'こうえんに いぬが います。', why: 'A kutya él és mozog: います.' },
          { bad: 'へやに はなが います。', good: 'へやに はなが あります。', why: 'A növény él, de nem mozog magától: あります.' }
        ],
        tip: 'Nem a méret vagy a fontosság dönt: a hal és a bogár is います, a fa és a busz あります.'
      },
      {
        title: '〜は 〜に あります', sub: '„X ott van"',
        pattern: 'valami は + hely に あります / います',
        body: 'Ha már ismert dologról mondod meg, hol van, az kerül előre は-val. A tartalom ugyanaz, a hangsúly más: az előző minta azt mondja meg, <i>mi</i> van ott; ez azt, <i>hol</i> van a dolog.',
        more: [
          'A két mondatfajta két különböző kérdésre felel. <b>へやに なにが ありますか</b> (mi van a szobában?) → へやに つくえ<b>が</b> あります. Itt az asztal az új információ, ezért が. <b>つくえは どこに ありますか</b> (hol van az asztal?) → つくえ<b>は</b> へやに あります. Itt az asztalt már ismerjük, a hely az új.',
          'A válaszban az igét a です is helyettesítheti: ぎんこうは どこですか。 → えきの まえです. Ez rövidebb és a beszédben nagyon gyakori.'
        ],
        tables: [
          {
            caption: 'Két kérdés, két szórend',
            head: ['Mit kérdezel?', 'Minta', 'Példa'],
            rows: [
              ['mi van ott?', 'hely に + dolog が', 'えきの まえに ぎんこうが あります。'],
              ['hol van a dolog?', 'dolog は + hely に', 'ぎんこうは えきの まえに あります。']
            ]
          }
        ],
        examples: [
          { jp: 'ぎんこうは えきの まえに あります。', romaji: 'Ginkō wa eki no mae ni arimasu.', hu: 'A bank az állomás előtt van.' },
          { jp: 'ねこは いすの したに います。', romaji: 'Neko wa isu no shita ni imasu.', hu: 'A macska a szék alatt van.' },
          { jp: 'ははは うちに います。', romaji: 'Haha wa uchi ni imasu.', hu: 'Anyám otthon van.' },
          { jp: 'たなかさんは どこに いますか。', romaji: 'Tanaka-san wa doko ni imasu ka.', hu: 'Hol van Tanaka?' },
          { jp: 'としょかんに います。', romaji: 'Toshokan ni imasu.', hu: 'A könyvtárban van.' }
        ],
        notes: [
          '<b>Kérdőszó után soha nem áll は</b>: だれ<b>が</b> いますか, なに<b>が</b> ありますか. A kérdőszó mindig ismeretlenre kérdez, a は pedig ismert témát jelöl: a kettő nem fér össze.',
          'A válaszban ugyanaz a partikula marad, ami a kérdésben volt: だれ<b>が</b> いますか → たなかさん<b>が</b> います.'
        ],
        mistakes: [
          { bad: 'へやに だれは いますか。', good: 'へやに だれが いますか。', why: 'Kérdőszó után が áll, は nem.' }
        ]
      },
      {
        title: 'うえ・した・まえ…', sub: 'helyviszonyok',
        pattern: 'főnév の うえ / した / まえ / うしろ / なか / となり に',
        body: 'A helyet jelölő szavak japánul főnevek: a viszonyítási pont után <b>の</b>-val kapcsolódnak, és utánuk jön a に. うえ = fölött, rajta · した = alatt · まえ = előtt · うしろ = mögött · なか = benne · となり = mellett.',
        more: [
          'A magyar névutó (<i>alatt, fölött, mellett</i>) japánul <b>főnév</b>: a うえ annyi, mint „a teteje", a なか „a belseje". Ezért kell elé a の: つくえ<b>の</b> うえ = az asztal teteje, és utána a hely に-je: つくえの うえ<b>に</b>.',
          'A sorrend tehát mindig: <b>viszonyítási pont + の + helyzet + に</b>. A magyarhoz képest csak a の a többlet.',
          'Három szó is „mellett"-et jelent, de nem ugyanazt: a <b>となり</b> a közvetlen szomszéd (ugyanolyan fajta dolgok között: két épület, két ember); a <b>よこ</b> az oldala mellett; a <b>そば</b> a közelében, nem feltétlenül érintkezve.'
        ],
        tables: [
          {
            caption: 'Helyviszonyok',
            head: ['Japánul', 'Magyarul', 'Japánul', 'Magyarul'],
            rows: [
              ['うえ', 'fölött, rajta', 'みぎ', 'jobbra'],
              ['した', 'alatt', 'ひだり', 'balra'],
              ['まえ', 'előtt', 'あいだ', 'között'],
              ['うしろ', 'mögött', 'となり', 'szomszédjában'],
              ['なか', 'benne', 'よこ', 'az oldalánál'],
              ['そと', 'kívül', 'そば', 'a közelében']
            ]
          }
        ],
        examples: [
          { jp: 'つくえの うえに ほんが あります。', romaji: 'Tsukue no ue ni hon ga arimasu.', hu: 'Az asztalon van egy könyv.' },
          { jp: 'かばんの なかに さいふが あります。', romaji: 'Kaban no naka ni saifu ga arimasu.', hu: 'A táskában van a pénztárca.' },
          { jp: 'がっこうの となりに こうえんが あります。', romaji: 'Gakkō no tonari ni kōen ga arimasu.', hu: 'Az iskola mellett park van.' },
          { jp: 'ぎんこうは ほんやと スーパーの あいだに あります。', romaji: 'Ginkō wa hon-ya to sūpā no aida ni arimasu.', hu: 'A bank a könyvesbolt és a szupermarket között van.' },
          { jp: 'えきの みぎに こうばんが あります。', romaji: 'Eki no migi ni kōban ga arimasu.', hu: 'Az állomástól jobbra rendőrőrs van.' },
          { jp: 'いぬは いえの そとに います。', romaji: 'Inu wa ie no soto ni imasu.', hu: 'A kutya a házon kívül van.' }
        ],
        notes: [
          'Az <b>あいだ</b> két viszonyítási pontot kér, と-val összekötve: A と B の あいだ.',
          'A うえ egyszerre jelenti azt, hogy „rajta" és hogy „fölötte": a japán nem tesz különbséget.'
        ],
        mistakes: [
          { bad: 'つくえ うえに ほんが あります。', good: 'つくえの うえに ほんが あります。', why: 'A うえ főnév: a viszonyítási ponthoz の köti.' }
        ]
      },
      {
        title: 'ありません・いません', sub: '„nincs" · senki, semmi',
        pattern: '〜が ありません / いません · だれも / なにも + tagadás',
        body: 'A tagadás <b>ありません</b>, illetve <b>いません</b>. A „senki, semmi, sehol" úgy épül, hogy a kérdőszó után <b>も</b> áll, és az ige tagadó: <b>だれも いません</b>. Állító mondatban か kerül a kérdőszó után: <b>だれか います</b> (van valaki).',
        more: [
          'Tagadó mondatban a が helyén gyakran <b>は</b> áll: へやに テレビ<b>は</b> ありません. A は ilyenkor kiemel: „tévé (az) nincs" — más talán van.',
          'A kérdőszóból két új szó képezhető. <b>か</b>-val határozatlan lesz: なにか (valami), だれか (valaki), どこか (valahol). <b>も</b>-val és tagadó igével teljes tagadás: なにも (semmi), だれも (senki), どこにも (sehol).',
          'A なにか, だれか után a が rendszerint elmarad: はこの なかに なにか あります.'
        ],
        tables: [
          {
            caption: 'Valami, valaki — semmi, senki',
            head: ['Kérdőszó', '+ か (állító)', '+ も (tagadó)'],
            rows: [
              ['なに (mi?)', 'なにか — valami', 'なにも …ません — semmi'],
              ['だれ (ki?)', 'だれか — valaki', 'だれも …ません — senki'],
              ['どこ (hol?)', 'どこか — valahol', 'どこにも …ません — sehol']
            ]
          }
        ],
        examples: [
          { jp: 'この まちに えいがかんが ありません。', romaji: 'Kono machi ni eigakan ga arimasen.', hu: 'Ebben a városban nincs mozi.' },
          { jp: 'へやに だれも いません。', romaji: 'Heya ni dare mo imasen.', hu: 'Senki sincs a szobában.' },
          { jp: 'はこの なかに なにか あります。', romaji: 'Hako no naka ni nanika arimasu.', hu: 'Van valami a dobozban.' },
          { jp: 'れいぞうこに なにか ありますか。', romaji: 'Reizōko ni nanika arimasu ka.', hu: 'Van valami a hűtőben?' },
          { jp: 'いいえ、なにも ありません。', romaji: 'Iie, nanimo arimasen.', hu: 'Nem, semmi sincs.' },
          { jp: 'へやに テレビは ありません。', romaji: 'Heya ni terebi wa arimasen.', hu: 'A szobában tévé nincs.' }
        ],
        notes: [
          'A なにか ありますか eldöntendő kérdés („van-e valami?"): はい-jal vagy いいえ-vel felelsz rá. A なにが ありますか kiegészítendő („mi van?"): arra megnevezed a dolgot.'
        ],
        mistakes: [
          { bad: 'へやに だれも います。', good: 'へやに だれも いません。', why: 'A だれも (senki) mellett az ige mindig tagadó.' }
        ]
      },
      {
        title: 'と・や', sub: 'felsorolás',
        pattern: 'A と B · A や B',
        body: 'A <b>と</b> lezárt felsorolás: pontosan ezek. A <b>や</b> nyitott: „például ezek, és még más is".',
        more: [
          'A <b>と</b> mindent felsorol, ami ott van: ほんと ペン = egy könyv és egy toll, és semmi más. A <b>や</b> csak példákat mond; a végére gyakran odakerül a <b>など</b> (és így tovább): ほんや ペンなど.',
          'Mindkettő csak <b>főneveket</b> köt össze. Két mondatot a <b>そして</b> (és, azután) kapcsol egymáshoz.'
        ],
        examples: [
          { jp: 'つくえの うえに ほんと ペンが あります。', romaji: 'Tsukue no ue ni hon to pen ga arimasu.', hu: 'Az asztalon egy könyv és egy toll van.' },
          { jp: 'まちに ぎんこうや スーパーが あります。', romaji: 'Machi ni ginkō ya sūpā ga arimasu.', hu: 'A városban van bank, szupermarket meg egyebek.' },
          { jp: 'かばんの なかに ほんや ノートなどが あります。', romaji: 'Kaban no naka ni hon ya nōto nado ga arimasu.', hu: 'A táskában könyv, füzet és hasonlók vannak.' },
          { jp: 'いぬが います。そして、ねこも います。', romaji: 'Inu ga imasu. Soshite, neko mo imasu.', hu: 'Van egy kutya. És macska is van.' }
        ],
        mistakes: [
          { bad: 'いぬが いますと ねこが います。', good: 'いぬが います。そして、ねこが います。', why: 'A と csak főnevek között áll; mondatokat a そして köt össze.' }
        ]
      },
      {
        title: 'かぞく・〜にん', sub: 'család: hányan vagytok?',
        pattern: 'かぞくは 〜にん です · 〜が 〜にん います',
        body: 'Az embereket a <b>〜にん</b> számlálóval számoljuk; az első kettő rendhagyó: <b>ひとり</b> (egy fő), <b>ふたり</b> (két fő). A saját családtagjaidra más szó jár, mint a máséira: はは / おかあさん (az anyám / az ön édesanyja), ちち / おとうさん.',
        more: [
          'Az emberek számlálója a <b>にん</b>, de az első kettő külön szó: <b>ひとり</b>, <b>ふたり</b>. A négy főt <b>よにん</b>-nak mondjuk (nem „よんにん").',
          'A szám közvetlenül az ige elé kerül, <b>partikula nélkül</b>: あにが ひとり います. Ez minden számlálószóra igaz, a következő leckében is így lesz.',
          'A családtagokra két szósor van. A <b>szerény</b> sorral a saját családodról beszélsz másoknak (ちち, はは). A <b>tisztelő</b> sorral a másik ember családjáról beszélsz (おとうさん, おかあさん) — és a saját szüleidet, idősebb testvéreidet is így <i>szólítod meg</i> otthon.'
        ],
        tables: [
          {
            caption: 'Emberek számlálása',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1', '<b>ひとり</b>', '6', 'ろくにん'],
              ['2', '<b>ふたり</b>', '7', 'しちにん / ななにん'],
              ['3', 'さんにん', '8', 'はちにん'],
              ['4', '<b>よにん</b>', '9', 'きゅうにん'],
              ['5', 'ごにん', '10', 'じゅうにん'],
              ['?', 'なんにん', '', '']
            ]
          },
          {
            caption: 'Családtagok',
            head: ['Magyarul', 'A saját családom', 'Más családja'],
            rows: [
              ['apa', 'ちち', 'おとうさん'],
              ['anya', 'はは', 'おかあさん'],
              ['báty', 'あに', 'おにいさん'],
              ['nővér', 'あね', 'おねえさん'],
              ['öcs', 'おとうと', 'おとうとさん'],
              ['húg', 'いもうと', 'いもうとさん'],
              ['nagyapa', 'そふ', 'おじいさん'],
              ['nagymama', 'そぼ', 'おばあさん'],
              ['család', 'かぞく', 'ごかぞく'],
              ['szülők', 'りょうしん', 'ごりょうしん'],
              ['testvérek', 'きょうだい', 'ごきょうだい']
            ]
          }
        ],
        examples: [
          { jp: 'かぞくは よにんです。', romaji: 'Kazoku wa yonin desu.', hu: 'Négyen vagyunk a családban.' },
          { jp: 'あにが ひとり います。', romaji: 'Ani ga hitori imasu.', hu: 'Egy bátyám van.' },
          { jp: 'いもうとが ふたり います。', romaji: 'Imōto ga futari imasu.', hu: 'Két húgom van.' },
          { jp: 'ごかぞくは なんにんですか。', romaji: 'Go-kazoku wa nannin desu ka.', hu: 'Hányan vannak a családjában?' },
          { jp: 'ちちと ははと あねが います。', romaji: 'Chichi to haha to ane ga imasu.', hu: 'Apám, anyám és a nővérem van.' }
        ],
        notes: [
          'A japán külön szót használ az idősebb és a fiatalabb testvérre: nincs általános „fivér" vagy „nővér", mindig tudni kell, ki az idősebb.',
          'A <b>ご</b> ugyanolyan tiszteleti előtag, mint az お: ごかぞく = az ön családja.',
          'A <b>きょうだいが いますか</b> kérdésre a létszámmal is felelhetsz: はい、ふたり います.'
        ],
        mistakes: [
          { bad: 'わたしの おかあさんは きょうしです。', good: 'ははは きょうしです。', why: 'A saját családodról másnak a szerény alakkal beszélsz: はは, nem おかあさん.' },
          { bad: 'あにが ひとりを います。', good: 'あにが ひとり います。', why: 'A számláló partikula nélkül áll az ige előtt.' }
        ]
      },
      {
        title: '〜ね・〜よ', sub: 'a mondat végi árnyalat',
        pattern: 'mondat + ね · mondat + よ',
        body: 'A japán mondat legvégére apró szócskák kerülhetnek, amelyek nem a tartalmat, hanem a <b>hangulatot</b> jelzik. A <b>ね</b> egyetértést vár vagy megerősítést kér: „ugye?", „milyen …!". A <b>よ</b> olyat közöl, amit a másik még nem tud: „tudod", „hidd el".',
        more: [
          'A ね-vel azt jelzed, hogy <b>ugyanazt látjátok</b>: いい てんきですね (szép idő van, ugye?). A válasz rá: そうですね. Ellenőrzésre is jó: たなかさんですね (ön Tanaka, igaz?).',
          'A よ-val <b>új információt</b> adsz át: あそこに コンビニが ありますよ (ott van egy kisbolt, ha nem tudnád). A harmadik ilyen szócskát már ismered: a <b>か</b> kérdést jelez.'
        ],
        tables: [
          {
            caption: 'Mondatvégi szócskák',
            head: ['', 'Mit jelez?', 'Példa'],
            rows: [
              ['か', 'kérdés', 'コンビニが ありますか。'],
              ['ね', 'egyetértést vár, megerősít', 'ねこが いますね。'],
              ['よ', 'új információ, nyomaték', 'えきの まえに ありますよ。']
            ]
          }
        ],
        examples: [
          { jp: 'いい てんきですね。', romaji: 'Ii tenki desu ne.', hu: 'Szép idő van, ugye?' },
          { jp: 'あそこに こうばんが ありますよ。', romaji: 'Asoko ni kōban ga arimasu yo.', hu: 'Ott van egy rendőrőrs, tudja.' },
          { jp: 'この いぬは かわいいですね。', romaji: 'Kono inu wa kawaii desu ne.', hu: 'De aranyos ez a kutya!' }
        ],
        tip: 'A よ-t felettesnek, tanárnak óvatosan mondd: könnyen kioktatónak hat. A ね mindig biztonságos.'
      }
    ],
    phrases: [
      { jp: 'いって きます。', romaji: 'Itte kimasu.', hu: 'Elmentem! (és visszajövök)', note: 'Aki elindul otthonról, ezt mondja.' },
      { jp: 'いって らっしゃい。', romaji: 'Itte rasshai.', hu: 'Menj csak, és gyere vissza épségben!', note: 'Az otthon maradó válasza.' },
      { jp: 'いただきます。', romaji: 'Itadakimasu.', hu: 'Köszönettel elfogadom. (evés előtt)', note: 'Te mondod, mielőtt enni kezdesz. Másnak jó étvágyat nem ezzel kívánsz.' },
      { jp: 'ごちそうさまでした。', romaji: 'Gochisōsama deshita.', hu: 'Köszönöm az ételt. (evés után)' },
      { jp: 'おなかが すきました。', romaji: 'Onaka ga sukimashita.', hu: 'Megéheztem.' },
      { jp: 'のどが かわきました。', romaji: 'Nodo ga kawakimashita.', hu: 'Megszomjaztam.' },
      { jp: 'そうですね。', romaji: 'Sō desu ne.', hu: 'Így van, egyetértek.', note: 'Ne keverd a そうですか-val: a ね egyetértés, a か tudomásulvétel.' },
      { jp: 'あれ？', romaji: 'Are?', hu: 'Hogyan? Mi a csuda?', note: 'Rövid, felfelé ívelő hang: amikor valami nem úgy van, ahogy vártad.' },
      { jp: 'へえ。', romaji: 'Hee.', hu: 'Nahát!', note: 'Csodálkozás, érdeklődő meglepődés.' }
    ],
    words: [
      {
        title: 'A városban',
        items: [
          { jp: 'まち', romaji: 'machi', hu: 'város' },
          { jp: 'えき', romaji: 'eki', hu: 'állomás' },
          { jp: 'ぎんこう', romaji: 'ginkō', hu: 'bank' },
          { jp: 'ゆうびんきょく', romaji: 'yūbinkyoku', hu: 'posta' },
          { jp: 'コンビニ', romaji: 'konbini', hu: 'éjjel-nappali kisbolt' },
          { jp: 'スーパー', romaji: 'sūpā', hu: 'szupermarket' },
          { jp: 'びょういん', romaji: 'byōin', hu: 'kórház, rendelő' },
          { jp: 'がっこう', romaji: 'gakkō', hu: 'iskola' },
          { jp: 'としょかん', romaji: 'toshokan', hu: 'könyvtár' },
          { jp: 'こうえん', romaji: 'kōen', hu: 'park' },
          { jp: 'ほんや', romaji: 'hon-ya', hu: 'könyvesbolt' },
          { jp: 'みせ', romaji: 'mise', hu: 'bolt' },
          { jp: 'こうばん', romaji: 'kōban', hu: 'körzeti rendőrőrs' },
          { jp: 'じんじゃ', romaji: 'jinja', hu: 'sintó szentély' }
        ]
      },
      {
        title: 'Otthon',
        items: [
          { jp: 'テーブル', romaji: 'tēburu', hu: 'asztal' },
          { jp: 'れいぞうこ', romaji: 'reizōko', hu: 'hűtőszekrény' },
          { jp: 'テレビ', romaji: 'terebi', hu: 'tévé' },
          { jp: 'ベッド', romaji: 'beddo', hu: 'ágy' },
          { jp: 'たな', romaji: 'tana', hu: 'polc' },
          { jp: 'はこ', romaji: 'hako', hu: 'doboz' },
          { jp: 'さいふ', romaji: 'saifu', hu: 'pénztárca' },
          { jp: 'しゃしん', romaji: 'shashin', hu: 'fénykép' }
        ]
      },
      {
        title: 'Élőlények',
        note: 'Emberre és állatra います, növényre あります.',
        items: [
          { jp: 'ひと', romaji: 'hito', hu: 'ember' },
          { jp: 'こども', romaji: 'kodomo', hu: 'gyerek' },
          { jp: 'いぬ', romaji: 'inu', hu: 'kutya' },
          { jp: 'ねこ', romaji: 'neko', hu: 'macska' },
          { jp: 'とり', romaji: 'tori', hu: 'madár' },
          { jp: 'さかな', romaji: 'sakana', hu: 'hal' },
          { jp: 'き', romaji: 'ki', hu: 'fa' },
          { jp: 'はな', romaji: 'hana', hu: 'virág' }
        ]
      }
    ],
    culture: [
      {
        title: 'Két szó minden étkezés körül',
        text: 'Evés előtt mindenki azt mondja: <b>いただきます</b>. Ez nem jókívánság a többieknek, hanem a saját köszöneted: annak, aki főzött, és mindannak, amiből az étel készült. Ezért akkor is elhangzik, ha egyedül eszel. Az étkezés végén a párja jön: <b>ごちそうさまでした</b>. Étteremből kifelé menet a személyzetnek is ezt mondod.'
      },
      {
        title: 'A sarki rendőrőrs',
        text: 'A japán városokban szinte minden állomás és nagyobb kereszteződés mellett áll egy <b>こうばん</b>: egy-két rendőrrel működő, apró körzeti őrs. Ide nemcsak baj esetén mennek az emberek: itt lehet útbaigazítást kérni, és ide viszik a talált tárgyakat is. Ha eltévedsz, a こうばん a legjobb hely, ahol megkérdezheted az utat.'
      },
      {
        title: 'Ki mindenki せんせい?',
        text: 'A <b>せんせい</b> nem csak a tanárnak jár. Így szólítják az orvost, az ügyvédet, az írót, a harcművészet vagy a teaszertartás mesterét is: mindenkit, akitől tanulni lehet, vagy aki a tudásával szolgál. A saját foglalkozásodról beszélve viszont a semleges <b>きょうし</b> (oktató), <b>いしゃ</b> (orvos) szót használod.'
      }
    ],
    quiz: [
      { q: '„A parkban van egy kutya." Mi hiányzik?', jp: 'こうえんに いぬが ＿。', a: 'います', wrong: ['あります', 'です', 'ありません'], why: 'Élőlényre います jár.' },
      { q: '„Az asztalon van egy könyv." Mi hiányzik?', jp: 'つくえの ＿に ほんが あります。', a: 'うえ', wrong: ['した', 'まえ', 'なか'], why: 'うえ = fölött, rajta.' },
      { q: '„Senki sincs a szobában." Melyik partikula hiányzik?', jp: 'へやに だれ＿ いません。', a: 'も', wrong: ['か', 'が', 'は'], why: 'Kérdőszó + も + tagadó ige = „senki, semmi".' },
      { q: 'Melyik mondat helyes? (A bank épület.)', a: 'ぎんこうは えきの まえに あります。', wrong: ['ぎんこうは えきの まえに います。', 'ぎんこうは えきの まえを あります。', 'ぎんこうを えきの まえに あります。'], why: 'Épületre あります jár, a helyet pedig に jelöli.' },
      { q: '„Két húgom van." Mi hiányzik?', jp: 'いもうとが ＿ います。', a: 'ふたり', wrong: ['ににん', 'ふたつ', 'にさい'], why: 'Két főre a rendhagyó ふたり alak jár.' },
      { q: '„A szobában van egy asztal." Mi hiányzik?', jp: 'へやに つくえが ＿。', a: 'あります', wrong: ['います', 'です', 'いません'], why: 'Tárgyra あります jár.' },
      { q: '„A macska a szék alatt van." Melyik partikula hiányzik?', jp: 'ねこは いすの した＿ います。', a: 'に', wrong: ['で', 'を', 'が'], why: 'A létezés helyét a に jelöli.' },
      { q: 'Melyik felsorolás jelenti: „bank, szupermarket meg egyebek"?', a: 'ぎんこうや スーパー', wrong: ['ぎんこうと スーパー', 'ぎんこうも スーパー', 'ぎんこうの スーパー'], why: 'A や nyitott felsorolás: „például ezek".' },
      { q: '„Van valaki a szobában." Melyik partikula hiányzik?', jp: 'へやに だれ＿ います。', a: 'か', wrong: ['も', 'を', 'の'], why: 'Kérdőszó + か = „valaki, valami"; も-val és tagadással „senki".' },
      { q: 'Mit jelent: かぞくは よにんです。', a: 'Négyen vagyunk a családban.', wrong: ['Négy családom van.', 'A családom négyéves.', 'A negyedik gyerek vagyok.'], why: 'A 〜にん embereket számol: よにん = négy fő.' },
      { q: '„A kertben van egy fa." Melyik ige kell?', jp: 'にわに きが ＿。', a: 'あります', wrong: ['います', 'です', 'いません'], why: 'A növény él, de nem mozog magától: あります.' },
      { q: '„Ki van a szobában?" Melyik partikula hiányzik?', jp: 'へやに だれ＿ いますか。', a: 'が', wrong: ['は', 'の', 'を'], why: 'Kérdőszó után が áll, は soha.' },
      {
        q: 'Melyik mondat felel arra: „Hol van a bank?"',
        a: 'ぎんこうは えきの となりに あります。',
        wrong: ['えきの となりに ぎんこうが います。', 'ぎんこうが えきの となりです あります。', 'ぎんこうは えきの となりを あります。'],
        why: 'Az ismert dolog は-val áll elöl, a hely に-vel utána; a bank épület, ezért あります.'
      },
      { q: 'Hogy mondod: „négy fő"?', a: 'よにん', wrong: ['よんにん', 'しにん', 'よっつにん'], why: 'A négy fő rendhagyó: よにん.' },
      { q: 'Egy ismerősödnek mesélsz az édesanyádról. Melyik szót használod?', a: 'はは', wrong: ['おかあさん', 'ごかぞく', 'おばあさん'], why: 'A saját családodról másnak a szerény alakkal beszélsz.' },
      { q: 'Mit mondasz, mielőtt enni kezdesz?', a: 'いただきます。', wrong: ['ごちそうさまでした。', 'いって きます。', 'おなかが すきました。'], why: 'Az いただきます az evés előtti köszönet; a ごちそうさまでした az evés utáni.' },
      { q: '„Van valami a dobozban?" Melyik szó hiányzik?', jp: 'はこの なかに ＿ ありますか。', a: 'なにか', wrong: ['なにも', 'だれか', 'どこか'], why: 'A なにか = „valami"; a なにも tagadó igét kér.' },
      { q: 'A barátod elindul otthonról, és azt mondja: いって きます。 Mit felelsz?', a: 'いって らっしゃい。', wrong: ['おかえりなさい。', 'ただいま。', 'おじゃまします。'], why: 'Az いって らっしゃい az otthon maradó válasza az indulónak.' },
      { q: 'Melyik szócska vár egyetértést a mondat végén?', a: 'ね', wrong: ['よ', 'か', 'も'], why: 'A ね azt jelzi: „ugye te is így látod?".' },
      { q: '„A bank a könyvesbolt és a szupermarket között van." Melyik szó hiányzik?', jp: 'ぎんこうは ほんやと スーパーの ＿に あります。', a: 'あいだ', wrong: ['となり', 'なか', 'うえ'], why: 'Az あいだ = „között": két viszonyítási pontot kér, と-val összekötve.' }
    ]
  },

  /* ── 4. lecke ─────────────────────────────────────── */
  {
    id: 'l4', no: 4, book: 'Dekiru 1', title: 'Vásárlás és idő',
    lead: 'Boltban kérsz valamit, megkérdezed az árát, megszámolod, amit veszel, és megmondod, hány óra van és mettől meddig van nyitva egy hely.',
    cando: [
      'Megkérdezed valaminek az árát, és megérted a választ.',
      'Kérsz valamit a boltban, darabszámmal.',
      'Megmondod az időt és a hét napját.',
      'Megkérdezed, mettől meddig tart vagy van nyitva valami.'
    ],
    intro: [
      'Ez a lecke a számokról szól: árak, darabszámok, órák. Három dolog lesz szokatlan. Az egyik, hogy a japán <b>nem tud úgy számolni, hogy „három alma"</b>: a szám és a dolog közé <b>számlálószó</b> kell, mint a magyarban a „három <i>szál</i> virág" vagy a „két <i>pár</i> cipő" esetében — csak itt mindig.',
      'A másik, hogy a számok egy része <b>megváltoztatja a kiejtését</b> a mögötte álló szó előtt: a 300 nem „さんひゃく", hanem さんびゃく, a 600 ろっぴゃく. Ezek a változások nem véletlenszerűek, néhány szám (1, 3, 6, 8, 10) mindig hajlamos rájuk; táblázatban megtalálod mindet.',
      'A harmadik az új partikula, a <b>を</b>: ez jelöli a mondat tárgyát, azt, amire a cselekvés irányul. Egyelőre egyetlen igével használod (ください = adjon), de a 6. leckétől minden tárgyas ige mellett ott lesz.'
    ],
    dialogue: {
      title: 'A boltban',
      scene: 'Anna a sarki zöldségesnél vásárol, aztán megkérdezi a nyitvatartást.',
      lines: [
        { who: 'Eladó', jp: 'いらっしゃいませ。', romaji: 'Irasshaimase.', hu: 'Üdvözlöm! Fáradjon beljebb!' },
        { who: 'Anna', jp: 'すみません、この りんごは いくらですか。', romaji: 'Sumimasen, kono ringo wa ikura desu ka.', hu: 'Elnézést, mennyibe kerül ez az alma?' },
        { who: 'Eladó', jp: 'ひとつ ひゃくえんです。', romaji: 'Hitotsu hyaku-en desu.', hu: 'Darabja száz jen.' },
        { who: 'Anna', jp: 'じゃあ、りんごを みっつ ください。それから、みずを にほん ください。', romaji: 'Jā, ringo o mittsu kudasai. Sorekara, mizu o nihon kudasai.', hu: 'Akkor három almát kérek. És két üveg vizet.' },
        { who: 'Eladó', jp: 'りんごを みっつと みずを にほんですね。ごひゃくえんです。', romaji: 'Ringo o mittsu to mizu o nihon desu ne. Gohyaku-en desu.', hu: 'Három alma és két víz, igaz? Ötszáz jen lesz.' },
        { who: 'Anna', jp: 'はい、ごひゃくえん。', romaji: 'Hai, gohyaku-en.', hu: 'Tessék, ötszáz jen.' },
        { who: 'Eladó', jp: 'ありがとう ございました。', romaji: 'Arigatō gozaimashita.', hu: 'Köszönöm a vásárlást!' },
        { who: 'Anna', jp: 'すみません、この みせは なんじまでですか。', romaji: 'Sumimasen, kono mise wa nanji made desu ka.', hu: 'Elnézést, meddig van nyitva ez a bolt?' },
        { who: 'Eladó', jp: 'はちじまでです。にちようびは ろくじまでです。', romaji: 'Hachiji made desu. Nichiyōbi wa rokuji made desu.', hu: 'Nyolcig. Vasárnap hatig.' },
        { who: 'Anna', jp: 'そうですか。いま なんじですか。', romaji: 'Sō desu ka. Ima nanji desu ka.', hu: 'Értem. Most hány óra van?' },
        { who: 'Eladó', jp: 'ごじはんです。', romaji: 'Goji han desu.', hu: 'Fél hat.' }
      ],
      notes: [
        'Az <b>いらっしゃいませ</b> az eladó köszöntése: minden boltban, étteremben ezt hallod belépéskor. <b>Nem kell rá felelni</b>, elég egy biccentés.',
        'A <b>じゃあ</b> („akkor hát") a döntés szava: ezzel jelzed, hogy választottál. A <b>それから</b> („és még") újabb tételt fűz a rendeléshez.',
        'Az eladó megismétli a rendelést, és <b>ね</b>-vel zárja: így ellenőrzi, jól értette-e. Ez Japánban általános szokás.',
        'A vásárlás végén a köszönet <b>múlt időben</b> hangzik el: ありがとう ございました. A múlt idő azt jelzi, hogy valami lezárult.',
        'A <b>ごじはん</b> öt óra harmincat jelent, vagyis magyarul <b>fél hatot</b>: a japán az elmúlt órához adja a felet, a magyar a következőhöz viszonyít.'
      ]
    },
    points: [
      {
        title: '〜を ください', sub: '„kérek egy…"',
        pattern: 'dolog を (mennyiség) ください',
        body: 'A boltban ennyi elég: megnevezed a dolgot, <b>を</b>, majd <b>ください</b>. A mennyiség a を után, a ください elé kerül, partikula nélkül.',
        more: [
          'A <b>を</b> a mondat <b>tárgyát</b> jelöli: azt, amit kérsz, veszel, eszel, olvasol. A magyar -t ragnak felel meg. A jelét csak erre az egy partikulára használják; a kiejtése egyszerűen „o".',
          'A <b>ください</b> jelentése „adjon (nekem)". Ha darabszámot is mondasz, a sorrend kötött: <b>dolog + を + mennyiség + ください</b>. A mennyiség után <b>nincs partikula</b>.',
          'Több dolgot a と köt össze: パンと みずを ください. Ha mindegyikhez külön darabszám tartozik, a mennyiségek után jön a と: りんごを みっつと みかんを いつつ ください.'
        ],
        tables: [
          {
            caption: 'A kérés felépítése',
            head: ['Mit?', 'を', 'Mennyit?', 'ください'],
            rows: [
              ['これ', 'を', '', 'ください。'],
              ['りんご', 'を', 'みっつ', 'ください。'],
              ['きって', 'を', 'にまい', 'ください。']
            ]
          }
        ],
        examples: [
          { jp: 'これを ください。', romaji: 'Kore o kudasai.', hu: 'Ezt kérem.' },
          { jp: 'みずを ください。', romaji: 'Mizu o kudasai.', hu: 'Vizet kérek.' },
          { jp: 'りんごを みっつ ください。', romaji: 'Ringo o mittsu kudasai.', hu: 'Három almát kérek.' },
          { jp: 'パンと ぎゅうにゅうを ください。', romaji: 'Pan to gyūnyū o kudasai.', hu: 'Kenyeret és tejet kérek.' },
          { jp: 'りんごを みっつと みかんを いつつ ください。', romaji: 'Ringo o mittsu to mikan o itsutsu kudasai.', hu: 'Három almát és öt mandarint kérek.' }
        ],
        notes: [
          'Udvariasabb, főleg étteremben: <b>〜を おねがいします</b>. A jelentése ugyanaz.',
          'Rámutatva a legegyszerűbb: これを ください (ezt kérem), あれを ください (azt ott kérem).'
        ],
        mistakes: [
          { bad: 'りんごを みっつを ください。', good: 'りんごを みっつ ください。', why: 'A mennyiség partikula nélkül áll a ください előtt; を csak a dolog után jár.' }
        ]
      },
      {
        title: 'いくらですか', sub: 'árak és nagy számok',
        pattern: '〜は いくらですか · szám + えん',
        body: 'Az árra az <b>いくら</b> (mennyi? mennyibe kerül?) kérdez. A válaszban a szám után a pénznem áll: <b>えん</b> (jen). Ehhez a számokat tízezerig kell ismerned.',
        more: [
          'A tízesek, százasok és ezresek úgy épülnek, mint a magyarban: にじゅう (két-tíz), さんびゃく (három-száz), ごせん (öt-ezer). A részeket nagyság szerint sorban mondod: 1550 = せん ごひゃく ごじゅう.',
          'Három százas és két ezres alak megváltozik: <b>さんびゃく, ろっぴゃく, はっぴゃく</b> és <b>さんぜん, はっせん</b>.',
          'A legnagyobb különbség: a japán nem ezresével, hanem <b>tízezresével</b> csoportosít. A 10 000 külön egység: <b>まん</b>. Az ötvenezer ezért nem „ötven-ezer", hanem ごまん (öt-tízezer).'
        ],
        tables: [
          {
            caption: 'Tízesek, százasok, ezresek',
            head: ['', 'Tízes', 'Százas', 'Ezres'],
            rows: [
              ['1', 'じゅう', 'ひゃく', 'せん'],
              ['2', 'にじゅう', 'にひゃく', 'にせん'],
              ['3', 'さんじゅう', '<b>さんびゃく</b>', '<b>さんぜん</b>'],
              ['4', 'よんじゅう', 'よんひゃく', 'よんせん'],
              ['5', 'ごじゅう', 'ごひゃく', 'ごせん'],
              ['6', 'ろくじゅう', '<b>ろっぴゃく</b>', 'ろくせん'],
              ['7', 'ななじゅう', 'ななひゃく', 'ななせん'],
              ['8', 'はちじゅう', '<b>はっぴゃく</b>', '<b>はっせん</b>'],
              ['9', 'きゅうじゅう', 'きゅうひゃく', 'きゅうせん']
            ]
          }
        ],
        examples: [
          { jp: 'この かさは いくらですか。', romaji: 'Kono kasa wa ikura desu ka.', hu: 'Mennyibe kerül ez az esernyő?' },
          { jp: 'せんごひゃくえんです。', romaji: 'Sen-gohyaku-en desu.', hu: 'Ezerötszáz jen.' },
          { jp: 'この とけいは いちまんえんです。', romaji: 'Kono tokei wa ichiman-en desu.', hu: 'Ez az óra tízezer jen.' },
          { jp: 'ぜんぶで さんびゃくえんです。', romaji: 'Zenbu de sanbyaku-en desu.', hu: 'Összesen háromszáz jen.' }
        ],
        notes: [
          'A 10, a 100 és az 1000 elé <b>nem</b> kell いち: じゅう, ひゃく, せん. A tízezer elé viszont kötelező: <b>いちまん</b>.',
          'A telefonszámot számjegyenként mondod, a kötőjelet <b>の</b>-nak ejted: 214-5678 → に いち よん の ご ろく なな はち. A nulla ゼロ vagy れい.',
          'A <b>ぜんぶで</b> annyit tesz: „mindent együttvéve". Ez az első találkozásod a で partikulával.'
        ],
        mistakes: [
          { bad: 'さんひゃくえん', good: 'さんびゃくえん', why: 'A 3 után a ひゃく zöngés lesz: びゃく. A 6 és a 8 után ぴゃく.' },
          { bad: 'いちせんえん', good: 'せんえん', why: 'Az ezer elé nem kerül いち; a tízezer elé igen (いちまん).' }
        ]
      },
      {
        title: 'つ・ほん・まい・さつ', sub: 'számlálók',
        pattern: 'szám + számláló',
        body: 'Japánul a darabszámhoz számlálószó kell, és azt a tárgy alakja dönti el. <b>〜つ</b>: általános (ひとつ, ふたつ, みっつ… tízig). <b>〜ほん</b>: hosszú, vékony tárgy (toll, üveg). <b>〜まい</b>: lapos (papír, póló, jegy). <b>〜さつ</b>: könyv, füzet. A ほん kiejtése változik: いっぽん, にほん, さんぼん.',
        more: [
          'A számlálót a tárgy <b>alakja</b> dönti el, nem a fajtája: az üveg, a toll, az esernyő és a banán egyaránt hosszú és vékony, ezért mind ほん. A levél, a jegy, a póló és a tányér lapos: まい.',
          'A <b>つ</b> sor régi japán számnevekből áll, ezért egészen más, mint az いち, に, さん: ひとつ, ふたつ, みっつ… Csak <b>tízig</b> létezik; tíz fölött a sima számot mondod (じゅういち).',
          'A <b>ほん</b> a legtrükkösebb: a szám szerint ほん, ぽん vagy ぼん lesz belőle. A <b>さつ</b> csak az 1, a 8 és a 10 után változtat; a <b>まい</b> teljesen szabályos.'
        ],
        tables: [
          {
            caption: 'A négy számláló 1-től 10-ig',
            head: ['', 'つ (általános)', 'ほん (hosszú)', 'まい (lapos)', 'さつ (kötet)'],
            rows: [
              ['1', 'ひとつ', '<b>いっぽん</b>', 'いちまい', '<b>いっさつ</b>'],
              ['2', 'ふたつ', 'にほん', 'にまい', 'にさつ'],
              ['3', 'みっつ', '<b>さんぼん</b>', 'さんまい', 'さんさつ'],
              ['4', 'よっつ', 'よんほん', 'よんまい', 'よんさつ'],
              ['5', 'いつつ', 'ごほん', 'ごまい', 'ごさつ'],
              ['6', 'むっつ', '<b>ろっぽん</b>', 'ろくまい', 'ろくさつ'],
              ['7', 'ななつ', 'ななほん', 'ななまい', 'ななさつ'],
              ['8', 'やっつ', '<b>はっぽん</b>', 'はちまい', '<b>はっさつ</b>'],
              ['9', 'ここのつ', 'きゅうほん', 'きゅうまい', 'きゅうさつ'],
              ['10', 'とお', '<b>じゅっぽん</b>', 'じゅうまい', '<b>じゅっさつ</b>'],
              ['?', 'いくつ', '<b>なんぼん</b>', 'なんまい', 'なんさつ']
            ]
          },
          {
            caption: 'Mit mivel számolsz?',
            head: ['Számláló', 'Mire való?', 'Példák'],
            rows: [
              ['つ', 'általános: kisebb tárgyak, rendelés', 'りんご, ケーキ, かばん'],
              ['ほん', 'hosszú, vékony tárgyak', 'ペン, かさ, みず (üveg)'],
              ['まい', 'lapos, vékony tárgyak', 'かみ, きって, シャツ'],
              ['さつ', 'könyv, füzet, magazin', 'ほん, ノート, ざっし']
            ]
          }
        ],
        examples: [
          { jp: 'ペンを にほん ください。', romaji: 'Pen o nihon kudasai.', hu: 'Két tollat kérek.' },
          { jp: 'きってを さんまい ください。', romaji: 'Kitte o sanmai kudasai.', hu: 'Három bélyeget kérek.' },
          { jp: 'ノートを いっさつ ください。', romaji: 'Nōto o issatsu kudasai.', hu: 'Egy füzetet kérek.' },
          { jp: 'かさを いっぽん ください。', romaji: 'Kasa o ippon kudasai.', hu: 'Egy esernyőt kérek.' },
          { jp: 'ケーキを ふたつ ください。', romaji: 'Kēki o futatsu kudasai.', hu: 'Két süteményt kérek.' },
          { jp: 'りんごは いくつ ありますか。', romaji: 'Ringo wa ikutsu arimasu ka.', hu: 'Hány alma van?' }
        ],
        notes: [
          'A „könyv" szó (ほん) és a hosszú tárgyak számlálója (ほん) véletlenül hangzik egyformán: a könyvet <b>さつ</b>-cal számolod, nem ほん-nal.',
          'A számláló a létezés igéi mellett is ugyanott áll: つくえの うえに ペンが さんぼん あります.'
        ],
        mistakes: [
          { bad: 'かみを いっぽん ください。', good: 'かみを いちまい ください。', why: 'A papír lapos: まい. A ほん hosszú, vékony tárgyakra való.' },
          { bad: 'ほんを にほん ください。', good: 'ほんを にさつ ください。', why: 'A könyv számlálója さつ, hiába hangzik úgy a neve, mint a ほん számláló.' }
        ],
        tip: 'Ha nem jut eszedbe a számláló, a 〜つ sorral tízig szinte mindent megszámolhatsz.'
      },
      {
        title: 'なんの・どこの', sub: 'milyen? honnan való?',
        pattern: 'なんの 〜 · どこの 〜 ですか',
        body: 'A の itt is pontosít. <b>なんの ざっし</b>: miről szóló, milyen magazin. <b>どこの とけい</b>: melyik országban vagy cégnél készült óra.',
        more: [
          'A の-val háromféleképpen kérdezhetsz rá egy dologra. <b>だれの</b>: kié? (tulajdonos) <b>なんの</b>: miről szóló, miféle? (tartalom, fajta) <b>どこの</b>: honnan való, melyik cégé? (eredet, gyártó)',
          'A válasz ugyanabba a szerkezetbe illik: なんの ほん → りょうり<b>の</b> ほん (szakácskönyv); どこの くるま → にほん<b>の</b> くるま (japán autó).'
        ],
        tables: [
          {
            caption: 'Három kérdés a の-val',
            head: ['Kérdés', 'Mire kérdez?', 'Válasz'],
            rows: [
              ['だれの かさ', 'tulajdonos', 'たなかさんの かさ'],
              ['なんの ざっし', 'tartalom, fajta', 'スポーツの ざっし'],
              ['どこの とけい', 'eredet, gyártó', 'スイスの とけい']
            ]
          }
        ],
        examples: [
          { jp: 'それは なんの ざっしですか。', romaji: 'Sore wa nan no zasshi desu ka.', hu: 'Az milyen magazin?' },
          { jp: 'くるまの ざっしです。', romaji: 'Kuruma no zasshi desu.', hu: 'Autós magazin.' },
          { jp: 'これは どこの とけいですか。', romaji: 'Kore wa doko no tokei desu ka.', hu: 'Ez hol készült óra?' },
          { jp: 'スイスの とけいです。', romaji: 'Suisu no tokei desu.', hu: 'Svájci óra.' },
          { jp: 'これは なんの ほんですか。', romaji: 'Kore wa nan no hon desu ka.', hu: 'Ez milyen könyv?' },
          { jp: 'りょうりの ほんです。', romaji: 'Ryōri no hon desu.', hu: 'Szakácskönyv.' }
        ]
      },
      {
        title: '〜じ', sub: 'hány óra van?',
        pattern: 'いま 〜じ です · 〜じはん',
        body: 'Az órát a szám után álló <b>じ</b> jelzi, a felet a <b>はん</b>. Három óra olvasata rendhagyó: <b>よじ</b> (4), <b>しちじ</b> (7), <b>くじ</b> (9). Kérdőszó: <b>なんじ</b>.',
        more: [
          'Az idő kimondásának sorrendje: <b>(délelőtt / délután) + óra + perc</b>. A ごぜん (délelőtt) és a ごご (délután) az óra <b>elé</b> kerül: ごご さんじ = délután három.',
          'A perc számlálója a <b>ふん</b>, amely egyes számok után <b>ぷん</b>-ra vált. A harminc perc helyett a <b>はん</b> (fél) a megszokott: くじはん = 9:30.',
          'Vigyázz a magyar „fél"-lel: a japán az <b>elmúlt</b> órához adja hozzá a felet. A ごじはん 5:30, azaz magyarul <b>fél hat</b>.'
        ],
        tables: [
          {
            caption: 'Órák',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1', 'いちじ', '7', '<b>しちじ</b>'],
              ['2', 'にじ', '8', 'はちじ'],
              ['3', 'さんじ', '9', '<b>くじ</b>'],
              ['4', '<b>よじ</b>', '10', 'じゅうじ'],
              ['5', 'ごじ', '11', 'じゅういちじ'],
              ['6', 'ろくじ', '12', 'じゅうにじ']
            ]
          },
          {
            caption: 'Percek',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1', '<b>いっぷん</b>', '6', '<b>ろっぷん</b>'],
              ['2', 'にふん', '7', 'ななふん'],
              ['3', '<b>さんぷん</b>', '8', '<b>はっぷん</b>'],
              ['4', '<b>よんぷん</b>', '9', 'きゅうふん'],
              ['5', 'ごふん', '10', '<b>じゅっぷん</b>'],
              ['15', 'じゅうごふん', '30', 'さんじゅっぷん / はん']
            ]
          }
        ],
        examples: [
          { jp: 'いま なんじですか。', romaji: 'Ima nanji desu ka.', hu: 'Hány óra van most?' },
          { jp: 'よじです。', romaji: 'Yoji desu.', hu: 'Négy óra van.' },
          { jp: 'くじはんです。', romaji: 'Kuji han desu.', hu: 'Fél tíz van.' },
          { jp: 'ごご さんじです。', romaji: 'Gogo sanji desu.', hu: 'Délután három óra van.' },
          { jp: 'しちじ じゅうごふんです。', romaji: 'Shichiji jūgofun desu.', hu: 'Negyed nyolc van.' },
          { jp: 'いま じゅうじ じゅっぷんです。', romaji: 'Ima jūji juppun desu.', hu: 'Most tíz óra tíz perc van.' }
        ],
        notes: [
          'A négy, a hét és a kilenc óra olvasata eltér a megszokottól: <b>よじ, しちじ, くじ</b> — nem „よんじ", „ななじ", „きゅうじ".',
          'A perc kérdőszava <b>なんぷん</b>.'
        ],
        mistakes: [
          { bad: 'いま よんじです。', good: 'いま よじです。', why: 'A négy óra rendhagyó: よじ.' },
          { bad: 'ろくじはん (= „fél hat")', good: 'ごじはん (= fél hat, 5:30)', why: 'A はん az előtte kimondott órához ad harminc percet: a ろくじはん 6:30, vagyis fél hét.' }
        ]
      },
      {
        title: '〜ようび', sub: 'a hét napjai',
        pattern: '〜ようび です',
        body: 'A hét napjai mind <b>ようび</b>-re végződnek; az elejük sorban: げつ, か, すい, もく, きん, ど, にち. Kérdőszó: <b>なんようび</b>.',
        more: [
          'A hét napjainak neve egy-egy természeti elemből és a <b>ようび</b> (a hét napja) szóból áll. Az elemek sorrendje: hold, tűz, víz, fa, arany, föld, nap.',
          'A hét napját a です-szel mondod meg: きょうは かようびです. Arról, hogy mikor kell a nap után に partikula, az 5. leckében lesz szó.'
        ],
        tables: [
          {
            caption: 'A hét napjai',
            head: ['Japánul', 'Magyarul', 'Az elem'],
            rows: [
              ['げつようび', 'hétfő', 'hold'],
              ['かようび', 'kedd', 'tűz'],
              ['すいようび', 'szerda', 'víz'],
              ['もくようび', 'csütörtök', 'fa'],
              ['きんようび', 'péntek', 'arany'],
              ['どようび', 'szombat', 'föld'],
              ['にちようび', 'vasárnap', 'nap']
            ]
          }
        ],
        examples: [
          { jp: 'きょうは なんようびですか。', romaji: 'Kyō wa nan\'yōbi desu ka.', hu: 'Milyen nap van ma?' },
          { jp: 'きんようびです。', romaji: 'Kin\'yōbi desu.', hu: 'Péntek van.' },
          { jp: 'やすみは にちようびです。', romaji: 'Yasumi wa nichiyōbi desu.', hu: 'A szünnap vasárnap van.' },
          { jp: 'あしたは どようびです。', romaji: 'Ashita wa doyōbi desu.', hu: 'Holnap szombat lesz.' }
        ],
        notes: ['Beszédben a び gyakran lemarad: げつよう, かよう. Naptárban csak az első jel áll.']
      },
      {
        title: '〜から 〜まで', sub: 'mettől meddig',
        pattern: 'A から B まで',
        body: 'A <b>から</b> a kezdőpont (-tól), a <b>まで</b> a végpont (-ig): időre és helyre egyaránt. Külön is állhatnak.',
        more: [
          'A <b>から</b> a kezdőpontot, a <b>まで</b> a végpontot jelöli, és ugyanúgy használható <b>időre</b> (くじから), <b>helyre</b> (うちから えきまで) és <b>napokra</b> (げつようびから).',
          'Nem kötelező mindkettőnek szerepelnie: みせは くじからです (a bolt kilenckor nyit), みせは はちじまでです (a bolt nyolcig van nyitva). A mondatot a です zárja.'
        ],
        examples: [
          { jp: 'ぎんこうは くじから さんじまでです。', romaji: 'Ginkō wa kuji kara sanji made desu.', hu: 'A bank kilenctől háromig van nyitva.' },
          { jp: 'がっこうは げつようびから きんようびまでです。', romaji: 'Gakkō wa getsuyōbi kara kin\'yōbi made desu.', hu: 'Iskola hétfőtől péntekig van.' },
          { jp: 'みせは なんじまでですか。', romaji: 'Mise wa nanji made desu ka.', hu: 'Meddig van nyitva a bolt?' },
          { jp: 'えいがは しちじからです。', romaji: 'Eiga wa shichiji kara desu.', hu: 'A film hétkor kezdődik.' },
          { jp: 'うちから えきまで じゅっぷんです。', romaji: 'Uchi kara eki made juppun desu.', hu: 'Otthonról az állomásig tíz perc.' },
          { jp: 'ゆうびんきょくは なんじから なんじまでですか。', romaji: 'Yūbinkyoku wa nanji kara nanji made desu ka.', hu: 'Mettől meddig van nyitva a posta?' }
        ],
        notes: ['Ezt a から-t már ismered a bemutatkozásból: ハンガリー<b>から</b> きました. Ott is kiindulópontot jelölt.']
      },
      {
        title: '〜では ありませんか', sub: 'tagadó kérdés',
        pattern: '〜では (じゃ) ありませんか',
        body: 'A tagadó alakból is lehet kérdés: <b>〜では ありませんか</b> („nem … ez?"). Akkor használod, ha már sejted a választ, és megerősítést vársz: これは たなかさんの かさでは ありませんか (nem Tanaka esernyője ez?).',
        more: [
          'A válasz logikája <b>fordított</b>, mint a magyarban. A はい azt jelenti: „igazad van, valóban <i>nem</i> az". Az いいえ azt: „tévedsz, <i>de</i> az". A japán a kérdés <b>szavaira</b> felel, nem a tényre.'
        ],
        tables: [
          {
            caption: 'Válasz a tagadó kérdésre',
            head: ['Kérdés', 'Válasz', 'Magyarul'],
            rows: [
              ['アンナさんの かさでは ありませんか。', '<b>はい</b>、わたしのでは ありません。', 'Nem, nem az enyém.'],
              ['アンナさんの かさでは ありませんか。', '<b>いいえ</b>、わたしのです。', 'De, az enyém.']
            ]
          }
        ],
        examples: [
          { jp: 'これは アンナさんの かさでは ありませんか。', romaji: 'Kore wa Anna-san no kasa dewa arimasen ka.', hu: 'Nem Anna esernyője ez?' },
          { jp: 'はい、わたしのでは ありません。', romaji: 'Hai, watashi no dewa arimasen.', hu: 'Nem, nem az enyém.' },
          { jp: 'いいえ、わたしのです。', romaji: 'Iie, watashi no desu.', hu: 'De, az enyém.' }
        ],
        tip: 'Ha bizonytalan vagy, mondd ki a teljes mondatot (わたしのです / わたしのでは ありません): abból a はい vagy az いいえ nélkül is világos, mire gondolsz.'
      }
    ],
    phrases: [
      { jp: 'いらっしゃいませ。', romaji: 'Irasshaimase.', hu: 'Üdvözlöm! Fáradjon beljebb!', note: 'Az eladó mondja a vevőnek; válaszolni nem szokás.' },
      { jp: 'これは いくらですか。', romaji: 'Kore wa ikura desu ka.', hu: 'Ez mennyibe kerül?' },
      { jp: 'コーヒーを ふたつ おねがいします。', romaji: 'Kōhī o futatsu onegai shimasu.', hu: 'Két kávét kérek szépen.', note: 'Az おねがいします a ください udvariasabb párja; étteremben, pultnál ez a szokásosabb.' },
      { jp: 'ちょっと まって ください。', romaji: 'Chotto matte kudasai.', hu: 'Egy pillanat türelmet!' },
      { jp: 'たかいですね。', romaji: 'Takai desu ne.', hu: 'Ez drága!' },
      { jp: 'やすいですね。', romaji: 'Yasui desu ne.', hu: 'Ez olcsó!' },
      { jp: 'ちょっと かんがえます。', romaji: 'Chotto kangaemasu.', hu: 'Még átgondolom.', note: 'Udvarias mód arra, hogy most nem veszed meg.' },
      { jp: 'また きます。', romaji: 'Mata kimasu.', hu: 'Majd visszajövök.' },
      { jp: 'すみません、きっては ありますか。', romaji: 'Sumimasen, kitte wa arimasu ka.', hu: 'Elnézést, bélyeg van?' },
      { jp: 'ありがとう ございました。', romaji: 'Arigatō gozaimashita.', hu: 'Köszönöm! (lezárult dologért)' }
    ],
    words: [
      {
        title: 'Amit a boltban kérsz',
        items: [
          { jp: 'りんご', romaji: 'ringo', hu: 'alma' },
          { jp: 'みかん', romaji: 'mikan', hu: 'mandarin' },
          { jp: 'パン', romaji: 'pan', hu: 'kenyér' },
          { jp: 'たまご', romaji: 'tamago', hu: 'tojás' },
          { jp: 'みず', romaji: 'mizu', hu: 'víz' },
          { jp: 'おちゃ', romaji: 'o-cha', hu: 'zöld tea' },
          { jp: 'ぎゅうにゅう', romaji: 'gyūnyū', hu: 'tej' },
          { jp: 'ケーキ', romaji: 'kēki', hu: 'torta, sütemény' },
          { jp: 'きって', romaji: 'kitte', hu: 'bélyeg' },
          { jp: 'かみ', romaji: 'kami', hu: 'papír' },
          { jp: 'ざっし', romaji: 'zasshi', hu: 'magazin' },
          { jp: 'しんぶん', romaji: 'shinbun', hu: 'újság' },
          { jp: 'シャツ', romaji: 'shatsu', hu: 'ing, póló' },
          { jp: 'ペン', romaji: 'pen', hu: 'toll' }
        ]
      },
      {
        title: 'Pénz',
        items: [
          { jp: 'おかね', romaji: 'o-kane', hu: 'pénz' },
          { jp: 'えん', romaji: 'en', hu: 'jen' },
          { jp: 'おつり', romaji: 'o-tsuri', hu: 'visszajáró' },
          { jp: 'レジ', romaji: 'reji', hu: 'pénztár' },
          { jp: 'てんいん', romaji: 'ten-in', hu: 'eladó' }
        ]
      },
      {
        title: 'Idő',
        items: [
          { jp: 'いま', romaji: 'ima', hu: 'most' },
          { jp: 'きょう', romaji: 'kyō', hu: 'ma' },
          { jp: 'あした', romaji: 'ashita', hu: 'holnap' },
          { jp: 'あさ', romaji: 'asa', hu: 'reggel' },
          { jp: 'ひる', romaji: 'hiru', hu: 'dél, nappal' },
          { jp: 'よる', romaji: 'yoru', hu: 'este, éjjel' },
          { jp: 'ごぜん', romaji: 'gozen', hu: 'délelőtt' },
          { jp: 'ごご', romaji: 'gogo', hu: 'délután' },
          { jp: 'やすみ', romaji: 'yasumi', hu: 'szünet, szünnap' }
        ]
      }
    ],
    culture: [
      {
        title: 'Jen: érmék és bankjegyek',
        text: 'Japán pénze a jen (<b>えん</b>). Hatféle érme van forgalomban: 1, 5, 10, 50, 100 és 500 jenes; az ötösnek és az ötvenesnek lyuk van a közepén. A bankjegyek 1000, 5000 és 10 000 jenesek (kétezres is létezik, de ritka). A japánok ma is sokat fizetnek készpénzzel, ezért az aprónak mindig van szerepe.'
      },
      {
        title: 'A pénz nem kézből kézbe megy',
        text: 'A pénztárnál kis tálca áll a pulton: a pénzt <b>arra teszed</b>, nem az eladó kezébe adod, és a visszajárót is onnan kapod vissza, sokszor hangosan megszámolva. Az eladó minden lépést kimond: mennyit vett át, mennyi a visszajáró. Borravalót sehol sem adnak; ha ott hagyod a pénzt, utánad viszik.'
      },
      {
        title: 'A „kicsit…", ami nemet jelent',
        text: 'Ha egy boltban azt kérdezed, van-e valami, és az eladó csak annyit mond: <b>ちょっと…</b> (kicsit…), az udvarias <b>nem</b>. A japán eladó nem szívesen mond kerek „nincs"-et a vevőnek, ezért a mondatot befejezetlenül hagyja, és a hangsúlyból kell értened. Ugyanígy utasíthatsz vissza te is: ちょっと…, egy sajnálkozó mosollyal.'
      }
    ],
    quiz: [
      { q: '„Három almát kérek." Mi hiányzik?', jp: 'りんごを ＿ ください。', a: 'みっつ', wrong: ['さんまい', 'さんぼん', 'さんさつ'], why: 'Az almára az általános 〜つ sor jár: みっつ = három darab.' },
      { q: 'Melyik számlálóval számolod a bélyeget? (lapos tárgy)', a: '〜まい', wrong: ['〜ほん', '〜さつ', '〜にん'], why: 'Lapos, vékony tárgyakra 〜まい jár.' },
      { q: '„Négy óra van." Melyik a helyes olvasat?', a: 'よじです。', wrong: ['よんじです。', 'しじです。', 'よっつじです。'], why: 'A négy óra rendhagyó: よじ.' },
      { q: '„A bank kilenctől háromig van nyitva." Mi hiányzik?', jp: 'ぎんこうは くじ＿ さんじ＿です。', a: 'から … まで', wrong: ['まで … から', 'に … へ', 'と … も'], why: 'から = -tól, まで = -ig.' },
      { q: 'Mit jelent: ペンを にほん ください。', a: 'Két tollat kérek.', wrong: ['Japán tollat kérek.', 'Két könyvet kérek.', 'Egy tollat kérek.'], why: 'Itt a にほん = に + ほん, vagyis két darab hosszú tárgy.' },
      { q: '„Ezt kérem." Melyik partikula hiányzik?', jp: 'これ＿ ください。', a: 'を', wrong: ['に', 'で', 'と'], why: 'Amit kérsz, az を-t kap.' },
      { q: '„Egy füzetet kérek." Mi hiányzik?', jp: 'ノートを ＿ ください。', a: 'いっさつ', wrong: ['いっぽん', 'いちまい', 'ひとり'], why: 'Könyvre, füzetre 〜さつ jár: いっさつ.' },
      { q: '„Fél tíz van." Melyik a helyes?', a: 'くじはんです。', wrong: ['きゅうじはんです。', 'じゅうじはんです。', 'くじからです。'], why: 'A 9 óra rendhagyó: くじ; a fél: はん. A fél tíz = kilenc és fél.' },
      { q: '„Milyen nap van ma?" Mi hiányzik?', jp: 'きょうは ＿ですか。', a: 'なんようび', wrong: ['なんさい', 'だれ', 'どれ'], why: 'A hét napjára なんようび kérdez.' },
      { q: 'Mit jelent: みせは なんじまでですか。', a: 'Meddig van nyitva a bolt?', wrong: ['Mikor nyit a bolt?', 'Hol van a bolt?', 'Hány bolt van?'], why: 'まで = -ig; なんじまで = hány óráig.' },
      { q: 'Hogy kérdezed meg, mennyibe kerül valami?', a: 'いくらですか。', wrong: ['いくつですか。', 'なんじですか。', 'どこですか。'], why: 'Az いくら az árra kérdez; az いくつ a darabszámra.' },
      { q: 'Hogy mondod: 300?', a: 'さんびゃく', wrong: ['さんひゃく', 'さんぴゃく', 'みっつひゃく'], why: 'A 3 után a ひゃく zöngés lesz: さんびゃく.' },
      { q: 'Hogy mondod: 10 000 jen?', a: 'いちまんえん', wrong: ['まんえん', 'じゅうせんえん', 'いちせんえん'], why: 'A tízezer külön egység (まん), és elé kötelező az いち.' },
      { q: 'Melyik számlálóval számolod az esernyőt?', a: '〜ほん', wrong: ['〜まい', '〜さつ', '〜にん'], why: 'Az esernyő hosszú és vékony: ほん.' },
      { q: '„Három üveg vizet kérek." Mi hiányzik?', jp: 'みずを ＿ ください。', a: 'さんぼん', wrong: ['さんほん', 'さんぽん', 'さんまい'], why: 'A 3 után a ほん ぼん-ra változik.' },
      { q: 'A ごじはん hány óra?', a: '5:30 (fél hat)', wrong: ['4:30 (fél öt)', '5:15 (negyed hat)', '6:30 (fél hét)'], why: 'A はん az előtte kimondott órához ad harminc percet.' },
      { q: 'Hogy mondod: „hét óra"?', a: 'しちじ', wrong: ['ななじ', 'しちふん', 'なのか'], why: 'A hét óra olvasata しちじ.' },
      {
        q: 'Belépsz egy boltba, az eladó azt mondja: いらっしゃいませ。 Mit teszel?',
        a: 'Semmit nem kell felelned, legfeljebb biccentesz.',
        wrong: ['Azt feleled: いらっしゃいませ。', 'Azt feleled: おじゃまします。', 'Azt feleled: いただきます。'],
        why: 'Az いらっしゃいませ az eladó köszöntése; a vevő nem válaszol rá.'
      },
      { q: 'Azt kérdezik: これは あなたの かさでは ありませんか。 Az esernyő NEM a tiéd. Hogy kezded a választ?', a: 'はい、…', wrong: ['いいえ、…', 'そうです、…', 'どうぞ、…'], why: 'A はい itt azt jelenti: „igazad van, nem az enyém". A japán a kérdés szavaira felel.' },
      { q: 'Melyik nap a もくようび?', a: 'csütörtök', wrong: ['kedd', 'szerda', 'péntek'], why: 'もく = fa; a sorrend: hold, tűz, víz, fa, arany, föld, nap.' }
    ]
  },

  /* ── 5. lecke ─────────────────────────────────────── */
  {
    id: 'l5', no: 5, book: 'Dekiru 1', title: 'Hová, mikor, mivel?',
    lead: 'Megjelennek az igék: elmondod, hová mész, mikor, mivel és kivel, jelenben és múltban, dátummal és időtartammal.',
    cando: [
      'Elmondod a napirendedet: mikor hová mész, és mikor mész haza.',
      'Megmondod, mivel és kivel jársz iskolába, és mennyi ideig tart az út.',
      'Dátumot mondasz, és tudod, mikor kell az időpont után に.',
      'Bemutatsz valakit, és udvariasan megszólítod a tanárt.'
    ],
    intro: [
      'Eddig a mondataid végén です állt, vagy a létezés két igéje. Most megérkeznek a <b>valódi igék</b>. Az első három a mozgás igéje: <b>{行|い}きます</b> (megy), <b>{来|き}ます</b> (jön) és <b>{帰|かえ}ります</b> (hazamegy). Rajtuk tanulod meg azt a négy végződést, amellyel minden japán ige udvarias alakban állít és tagad, jelenben és múltban.',
      'Az ige köré partikulák sorakoznak, és mindegyik egy kérdésre felel: <b>へ / に</b> (hová?), <b>から</b> (honnan?), <b>まで</b> (meddig?), <b>で</b> (mivel?), <b>と</b> (kivel?), <b>に</b> (mikor?). A sorrendjük szabad, mert a partikula megmondja a szó szerepét; az egyetlen kötött hely az igéé: a mondat vége.',
      'A lecke második fele az idő: a dátum (hónap és nap), az időpont és az időtartam különbsége, és az, hogy „hetente kétszer". A dátumoknál és az időtartamoknál sok a rendhagyó olvasat; ezeket táblázatokban találod, nem kell egyszerre megjegyezned mindet.'
    ],
    dialogue: {
      title: 'Reggel az iskola előtt',
      scene: 'Anna japán nyelviskolába jár. Reggel a kapuban találkozik egy osztálytársával, Kennel.',
      lines: [
        { who: 'Ken', jp: 'アンナさん、おはようございます。', romaji: 'Anna-san, ohayō gozaimasu.', hu: 'Jó reggelt, Anna!' },
        { who: 'Anna', jp: 'おはようございます。ケンさんは{毎日|まいにち}{何|なに}で{学校|がっこう}へ{来|き}ますか。', romaji: 'Ohayō gozaimasu. Ken-san wa mainichi nani de gakkō e kimasu ka.', hu: 'Jó reggelt! Ken, te mivel jössz iskolába minden nap?' },
        { who: 'Ken', jp: '{電車|でんしゃ}で{来|き}ます。アンナさんは？', romaji: 'Densha de kimasu. Anna-san wa?', hu: 'Vonattal jövök. És te?' },
        {
          who: 'Anna',
          jp: 'わたしは{自転車|じてんしゃ}で{来|き}ます。うちから{学校|がっこう}まで{二十分|にじゅっぷん}ぐらいです。',
          romaji: 'Watashi wa jitensha de kimasu. Uchi kara gakkō made nijuppun gurai desu.',
          hu: 'Én biciklivel jövök. Otthonról az iskoláig körülbelül húsz perc.'
        },
        { who: 'Ken', jp: '{近|ちか}いですね。きのうはどこかへ{行|い}きましたか。', romaji: 'Chikai desu ne. Kinō wa dokoka e ikimashita ka.', hu: 'Közel laksz! Tegnap voltál valahol?' },
        { who: 'Anna', jp: 'はい、{友|とも}だちと{図書館|としょかん}へ{行|い}きました。ケンさんは？', romaji: 'Hai, tomodachi to toshokan e ikimashita. Ken-san wa?', hu: 'Igen, a barátommal könyvtárba mentem. És te?' },
        { who: 'Ken', jp: 'わたしはどこへも{行|い}きませんでした。', romaji: 'Watashi wa doko e mo ikimasen deshita.', hu: 'Én sehová sem mentem.' },
        { who: 'Anna', jp: '{授業|じゅぎょう}は{何時|なんじ}からですか。', romaji: 'Jugyō wa nanji kara desu ka.', hu: 'Hánykor kezdődik az óra?' },
        { who: 'Ken', jp: '{九時|くじ}からです。あ、{先生|せんせい}が{来|き}ましたよ。', romaji: 'Kuji kara desu. A, sensei ga kimashita yo.', hu: 'Kilenckor. Ó, megjött a tanár!' },
        { who: 'Anna', jp: 'あのう、{先生|せんせい}、{今日|きょう}は{宿題|しゅくだい}がありますか。', romaji: 'Anō, sensei, kyō wa shukudai ga arimasu ka.', hu: 'Öö, tanár úr, ma van házi feladat?' },
        { who: 'Tanár', jp: 'はい、あります。がんばってください。', romaji: 'Hai, arimasu. Ganbatte kudasai.', hu: 'Igen, van. Hajrá, csak ügyesen!' }
      ],
      notes: [
        'A <b>〜さんは？</b> a legrövidebb visszakérdezés: „és te?". A mondat többi részét nem kell megismételned, a hanglejtés emelkedik.',
        'Ken az iskolánál áll, ezért azt kérdezik tőle, mivel <b>{来|き}ます</b> (jön) — nem azt, hogy mivel megy. A beszélő helye dönti el, melyik ige kell.',
        'A <b>どこかへ</b> „valahová", a <b>どこへも</b> + tagadás „sehová". Ugyanaz a か / も páros, amit a 3. leckében a なにか / なにも alakban láttál; a へ partikula a kettő közé kerül.',
        'Az <b>あのう</b> a megszólítás előtti tétova hang: ezzel jelzed, hogy kérdezni vagy kérni szeretnél valamit, és nem akarsz ajtóstul rontani a házba.',
        'A <b>{先生|せんせい}が{来|き}ました</b> múlt idő, mégis azt jelenti: „megjött", vagyis már itt van. A japán múlt idő a befejezett cselekvést is jelöli.'
      ]
    },
    points: [
      {
        title: '〜ます', sub: 'az udvarias igealak négy formája',
        pattern: '〜ます · 〜ません · 〜ました · 〜ませんでした',
        body: 'Az ige a mondat végén áll, és a végződése mutatja az időt, valamint azt, hogy állítasz vagy tagadsz. A japán jelen idő a jövőt és a szokást is kifejezi: <b>{行|い}きます</b> = megyek, menni fogok, járni szoktam.',
        more: [
          'A négy alak csak a <b>végződésben</b> különbözik; az ige eleje (itt: {行|い}き) nem változik. Ha egy igének ismered a 〜ます alakját, a másik hármat gépiesen képezheted.',
          'A japánnak <b>nincs külön jövő ideje</b>. A 〜ます egyszerre jelenti azt, hogy „megyek" (szokás), és azt, hogy „menni fogok" (jövő). Hogy melyikről van szó, azt az időhatározó dönti el: {毎日|まいにち} (minden nap) vagy {明日|あした} (holnap).',
          'Az ige itt sem változik személy és szám szerint: わたしは{行|い}きます, {友|とも}だちは{行|い}きます, わたしたちは{行|い}きます.'
        ],
        tables: [
          {
            caption: 'Az udvarias igealak négy formája',
            head: ['', 'Állító', 'Tagadó'],
            rows: [
              ['jelen és jövő', 'いき<b>ます</b>', 'いき<b>ません</b>'],
              ['múlt', 'いき<b>ました</b>', 'いき<b>ませんでした</b>']
            ]
          },
          {
            caption: 'A három mozgásige',
            head: ['Jelentés', '〜ます', '〜ません', '〜ました', '〜ませんでした'],
            rows: [
              ['megy', 'いきます', 'いきません', 'いきました', 'いきませんでした'],
              ['jön', 'きます', 'きません', 'きました', 'きませんでした'],
              ['hazamegy', 'かえります', 'かえりません', 'かえりました', 'かえりませんでした']
            ]
          }
        ],
        examples: [
          { jp: '{毎日|まいにち}{学校|がっこう}へ{行|い}きます。', romaji: 'Mainichi gakkō e ikimasu.', hu: 'Minden nap iskolába megyek.' },
          { jp: 'きのう{図書館|としょかん}へ{行|い}きました。', romaji: 'Kinō toshokan e ikimashita.', hu: 'Tegnap könyvtárba mentem.' },
          { jp: '{日曜日|にちようび}は{学校|がっこう}へ{行|い}きません。', romaji: 'Nichiyōbi wa gakkō e ikimasen.', hu: 'Vasárnap nem megyek iskolába.' },
          { jp: '{先週|せんしゅう}はどこへも{行|い}きませんでした。', romaji: 'Senshū wa doko e mo ikimasen deshita.', hu: 'Múlt héten sehová sem mentem.' },
          { jp: '{明日|あした}{大阪|おおさか}へ{行|い}きます。', romaji: 'Ashita Ōsaka e ikimasu.', hu: 'Holnap Oszakába megyek.' }
        ],
        notes: [
          'A múlt idejű tagadás két részből áll: a jelen tagadó alak (〜ません) + <b>でした</b>.',
          'A kérdés itt is か-val készül: {行|い}きますか (mész?), {行|い}きましたか (elmentél?).'
        ],
        mistakes: [
          { bad: 'きのう{図書館|としょかん}へ{行|い}きますでした。', good: 'きのう{図書館|としょかん}へ{行|い}きました。', why: 'A múlt idő az ige végződésében van: ます → ました. A でした csak a tagadó alakhoz járul.' },
          { bad: 'きのう{学校|がっこう}へ{行|い}きません。', good: 'きのう{学校|がっこう}へ{行|い}きませんでした。', why: 'Múlt időre a tagadásnak is múlt alakja kell.' }
        ]
      },
      {
        title: '〜へ・〜に 行きます', sub: 'hová',
        pattern: 'hely へ / に + {行|い}きます · {来|き}ます · {帰|かえ}ります',
        body: 'A mozgás célját a <b>へ</b> (kiejtve: <i>e</i>) vagy a <b>に</b> jelöli. A három alapige: {行|い}きます (megy), {来|き}ます (jön), {帰|かえ}ります (hazamegy). A kiindulópontot a <b>から</b> jelöli.',
        more: [
          'A <b>へ</b> az irányt jelöli („felé"), a <b>に</b> a célpontot („oda"). A három mozgásige mellett a kettő <b>felcserélhető</b>: {学校|がっこう}へ{行|い}きます és {学校|がっこう}に{行|い}きます ugyanazt jelenti.',
          'A <b>{行|い}きます</b> és a <b>{来|き}ます</b> között a beszélő helye dönt. Ha a cél az a hely, <b>ahol te vagy</b> (vagy ahová tartozol), akkor {来|き}ます; minden más esetben {行|い}きます.',
          'A <b>{帰|かえ}ります</b> nem egyszerűen „visszamegy": oda térsz vissza, ahová tartozol — haza, a szülővárosodba, a hazádba. Ezért mellette szinte mindig うち (otthon) vagy {国|くに} (haza) áll.'
        ],
        tables: [
          {
            caption: 'A mozgás partikulái',
            head: ['Partikula', 'Kérdés', 'Példa'],
            rows: [
              ['へ / に', 'hová?', 'がっこう<b>へ</b> いきます'],
              ['から', 'honnan?', 'うち<b>から</b> きました'],
              ['まで', 'meddig?', 'えき<b>まで</b> いきます']
            ]
          }
        ],
        examples: [
          { jp: '{来週|らいしゅう}{日本|にほん}へ{行|い}きます。', romaji: 'Raishū Nihon e ikimasu.', hu: 'Jövő héten Japánba megyek.' },
          { jp: '{七時|しちじ}にうちへ{帰|かえ}ります。', romaji: 'Shichiji ni uchi e kaerimasu.', hu: 'Hétkor megyek haza.' },
          { jp: '{友|とも}だちはペーチから{来|き}ました。', romaji: 'Tomodachi wa Pēchi kara kimashita.', hu: 'A barátom Pécsről jött.' },
          { jp: 'どこへ{行|い}きますか。', romaji: 'Doko e ikimasu ka.', hu: 'Hová mész?' },
          { jp: '{日曜日|にちようび}はどこへも{行|い}きません。', romaji: 'Nichiyōbi wa doko e mo ikimasen.', hu: 'Vasárnap sehová sem megyek.' },
          { jp: '{夏休|なつやす}みに{国|くに}へ{帰|かえ}ります。', romaji: 'Natsuyasumi ni kuni e kaerimasu.', hu: 'A nyári szünetben hazautazom a hazámba.' }
        ],
        notes: [
          'A へ partikula írásban a „he" jele, de <b>„e"</b>-nek ejtjük, ahogy a は partikula „wa".',
          'A magyar „voltál már …?" kérdést a japán gyakran a „mentél" igével fejezi ki: バラトンへ{行|い}きましたか (voltál a Balatonon?).'
        ],
        mistakes: [
          { bad: '{七時|しちじ}にうちへ{行|い}きます。', good: '{七時|しちじ}にうちへ{帰|かえ}ります。', why: 'A saját otthonodba nem „mész", hanem „hazatérsz": {帰|かえ}ります.' }
        ]
      },
      {
        title: '〜で 行きます', sub: 'mivel',
        pattern: 'jármű で + {行|い}きます',
        body: 'Az eszközt, így a közlekedési eszközt is a <b>で</b> jelöli. Kivétel a gyaloglás: <b>{歩|ある}いて</b>, で nélkül.',
        more: [
          'A <b>で</b> itt az <b>eszközt</b> jelöli: azt, aminek a segítségével a cselekvés történik. A közlekedési eszköz is eszköz, ezért kap で-t.',
          'A rákérdezés: <b>{何|なに}で</b> (mivel?). Ugyanezt jelenti a <b>どうやって</b> (hogyan, milyen módon?) is, amelyre eszközzel és útvonallal is felelhetsz.',
          'A gyaloglás nem eszköz, hanem mód: az <b>{歩|ある}いて</b> egy ige alakja („gyalogolva"), ezért で nélkül áll.'
        ],
        examples: [
          { jp: 'バスで{学校|がっこう}へ{行|い}きます。', romaji: 'Basu de gakkō e ikimasu.', hu: 'Busszal megyek iskolába.' },
          { jp: '{電車|でんしゃ}で{来|き}ました。', romaji: 'Densha de kimashita.', hu: 'Vonattal jöttem.' },
          { jp: '{歩|ある}いて{帰|かえ}ります。', romaji: 'Aruite kaerimasu.', hu: 'Gyalog megyek haza.' },
          { jp: '{毎日|まいにち}{何|なに}で{学校|がっこう}へ{来|き}ますか。', romaji: 'Mainichi nani de gakkō e kimasu ka.', hu: 'Mivel jössz iskolába minden nap?' },
          { jp: '{自転車|じてんしゃ}で{駅|えき}まで{行|い}きます。', romaji: 'Jitensha de eki made ikimasu.', hu: 'Biciklivel megyek az állomásig.' }
        ],
        notes: [
          'Több eszközt と-val sorolhatsz fel: バスと{地下鉄|ちかてつ}で{来|き}ます (busszal és metróval jövök).',
          'A {何|なに}で beszédben gyakran なんで-nek hangzik, de az „miért?"-et is jelenthet; a なにで egyértelmű.'
        ],
        mistakes: [
          { bad: 'バスに{学校|がっこう}へ{行|い}きます。', good: 'バスで{学校|がっこう}へ{行|い}きます。', why: 'A jármű eszköz: で. A に a célt jelölné.' },
          { bad: '{歩|ある}いてで{帰|かえ}ります。', good: '{歩|ある}いて{帰|かえ}ります。', why: 'Az {歩|ある}いて után nincs partikula.' }
        ]
      },
      {
        title: '〜と', sub: 'kivel',
        pattern: 'személy と (いっしょに) + ige',
        body: 'A <b>と</b> itt társat jelöl: „valakivel". Az <b>いっしょに</b> (együtt) nyomatékosít. Egyedül: <b>{一人|ひとり}で</b>.',
        more: [
          'A magyar <i>-val, -vel</i> rag japánul kétfelé válik. Ha <b>eszközről</b> van szó, で (バスで = busszal); ha <b>társról</b>, と ({友|とも}だちと = a barátommal). A magyar anyanyelvűek ezt keverik a leggyakrabban.',
          'A létszámot kifejező szavak viszont <b>で</b>-t kapnak: {一人|ひとり}で (egyedül), {二人|ふたり}で (ketten), みんなで (mindannyian együtt). Ezek nem társat neveznek meg, hanem azt, hányan vagytok.'
        ],
        tables: [
          {
            caption: 'で vagy と?',
            head: ['', 'Partikula', 'Példa'],
            rows: [
              ['eszköz, jármű', 'で', 'でんしゃ<b>で</b> いきます'],
              ['társ', 'と', 'ともだち<b>と</b> いきます'],
              ['létszám', 'で', 'ひとり<b>で</b> · ふたり<b>で</b> · みんな<b>で</b>']
            ]
          }
        ],
        examples: [
          { jp: '{友|とも}だちと{映画館|えいがかん}へ{行|い}きます。', romaji: 'Tomodachi to eigakan e ikimasu.', hu: 'A barátommal moziba megyek.' },
          { jp: '{母|はは}といっしょに{来|き}ました。', romaji: 'Haha to issho ni kimashita.', hu: 'Anyámmal együtt jöttem.' },
          { jp: '{一人|ひとり}で{行|い}きました。', romaji: 'Hitori de ikimashita.', hu: 'Egyedül mentem.' },
          { jp: 'だれと{行|い}きましたか。', romaji: 'Dare to ikimashita ka.', hu: 'Kivel mentél?' },
          { jp: 'みんなで{京都|きょうと}へ{行|い}きます。', romaji: 'Minna de Kyōto e ikimasu.', hu: 'Mindannyian együtt megyünk Kiotóba.' }
        ],
        mistakes: [
          { bad: '{友|とも}だちで{行|い}きます。', good: '{友|とも}だちと{行|い}きます。', why: 'A társ と-t kap; a で eszközt jelentene.' }
        ]
      },
      {
        title: '〜に', sub: 'mikor',
        pattern: 'időpont に + ige',
        body: 'A számmal kifejezhető időpont (óra, dátum, a hét napja) után <b>に</b> áll. A „viszonylagos" időszavak után nem: {今日|きょう} (ma), {明日|あした} (holnap), {来週|らいしゅう} (jövő héten), {毎日|まいにち} (minden nap).',
        more: [
          'A szabály: <b>ami számmal megadható pont az időben</b>, az に-t kap (óra, perc, dátum, évszám). Ami a <b>mostani pillanathoz viszonyít</b> (ma, tegnap, jövő héten, minden nap), az nem.',
          'A hét napjai után a に elmaradhat: {土曜日|どようび}に és {土曜日|どようび} egyaránt helyes. A kérdőszó, az <b>いつ</b> (mikor?) után soha nincs に.',
          'Az időhatározó rendszerint a mondat <b>elején</b> áll, a téma után: わたしは{明日|あした}{東京|とうきょう}へ{行|い}きます.'
        ],
        tables: [
          {
            caption: 'Kell に vagy nem kell?',
            head: ['', 'Időszó', 'Példa'],
            rows: [
              ['kell', 'óra, perc', 'はちじ<b>に</b> いきます'],
              ['kell', 'dátum, évszám', 'しがつ みっか<b>に</b> きます'],
              ['lehet', 'a hét napja', 'どようび(<b>に</b>) いきます'],
              ['nem kell', 'ma, tegnap, holnap, most', 'あした いきます'],
              ['nem kell', 'ez a / múlt / jövő hét, hónap, év', 'らいしゅう いきます'],
              ['nem kell', 'minden nap, minden héten', 'まいにち いきます']
            ]
          },
          {
            caption: 'Viszonylagos időszavak',
            head: ['', 'Múlt', 'Most', 'Jövő'],
            rows: [
              ['nap', 'きのう', 'きょう', 'あした'],
              ['hét', 'せんしゅう', 'こんしゅう', 'らいしゅう'],
              ['hónap', 'せんげつ', 'こんげつ', 'らいげつ'],
              ['év', 'きょねん', 'ことし', 'らいねん']
            ]
          }
        ],
        examples: [
          { jp: '{八時|はちじ}に{学校|がっこう}へ{行|い}きます。', romaji: 'Hachiji ni gakkō e ikimasu.', hu: 'Nyolckor megyek iskolába.' },
          { jp: '{土曜日|どようび}に{友|とも}だちが{来|き}ます。', romaji: 'Doyōbi ni tomodachi ga kimasu.', hu: 'Szombaton jön a barátom.' },
          { jp: '{明日|あした}{東京|とうきょう}へ{行|い}きます。', romaji: 'Ashita Tōkyō e ikimasu.', hu: 'Holnap Tokióba megyek.' },
          { jp: 'いつ{日本|にほん}へ{行|い}きますか。', romaji: 'Itsu Nihon e ikimasu ka.', hu: 'Mikor mész Japánba?' },
          { jp: '{来月|らいげつ}{行|い}きます。', romaji: 'Raigetsu ikimasu.', hu: 'Jövő hónapban megyek.' }
        ],
        notes: [
          'A „minden" a {毎|まい} előtaggal készül: {毎日|まいにち} (minden nap), {毎週|まいしゅう} (minden héten), {毎朝|まいあさ} (minden reggel), {毎晩|まいばん} (minden este).',
          'A は-val kiemelt időszó kontrasztot jelez: {日曜日|にちようび}<b>は</b>{行|い}きません („vasárnap viszont nem megyek").'
        ],
        mistakes: [
          { bad: '{明日|あした}に{東京|とうきょう}へ{行|い}きます。', good: '{明日|あした}{東京|とうきょう}へ{行|い}きます。', why: 'A „holnap" a mához viszonyít: utána nincs に.' },
          { bad: 'いつに{行|い}きますか。', good: 'いつ{行|い}きますか。', why: 'Az いつ után soha nem áll に.' }
        ],
        tip: '{明日|あした} に {行|い}きます ✗ — a „holnap", „ma", „jövő héten" után nincs に.'
      },
      {
        title: '〜月〜日', sub: 'dátum',
        pattern: 'szám + {月|がつ} · szám + {日|にち}',
        body: 'A hónap a szám + <b>月</b> (がつ), a nap a szám + <b>日</b> (にち). Az 1–10. és a 20. nap olvasata rendhagyó: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか, はつか. A hónapoknál a 4 (しがつ), a 7 (しちがつ) és a 9 (くがつ) tér el.',
        more: [
          'A dátum sorrendje a nagytól a kicsi felé halad, akárcsak a magyarban: <b>év, hónap, nap</b>. A hónapoknak nincs külön nevük: egyszerűen megszámozzák őket („egyes hónap", „kettes hónap").',
          'A napoknál az 1–10. és a 20. nap a régi japán számnevekből ered, ezért egészen más, mint a szám + にち. A 14. és a 24. nap a négyest よっか-nak mondja; a 19. és a 29. a kilencest く-nak.'
        ],
        tables: [
          {
            caption: 'A hónap napjai',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1.', '<b>ついたち</b>', '8.', '<b>ようか</b>'],
              ['2.', '<b>ふつか</b>', '9.', '<b>ここのか</b>'],
              ['3.', '<b>みっか</b>', '10.', '<b>とおか</b>'],
              ['4.', '<b>よっか</b>', '11.', 'じゅういちにち'],
              ['5.', '<b>いつか</b>', '14.', '<b>じゅうよっか</b>'],
              ['6.', '<b>むいか</b>', '20.', '<b>はつか</b>'],
              ['7.', '<b>なのか</b>', '24.', '<b>にじゅうよっか</b>']
            ]
          },
          {
            caption: 'Hónapok',
            head: ['', 'Olvasat', '', 'Olvasat'],
            rows: [
              ['1', 'いちがつ', '7', '<b>しちがつ</b>'],
              ['2', 'にがつ', '8', 'はちがつ'],
              ['3', 'さんがつ', '9', '<b>くがつ</b>'],
              ['4', '<b>しがつ</b>', '10', 'じゅうがつ'],
              ['5', 'ごがつ', '11', 'じゅういちがつ'],
              ['6', 'ろくがつ', '12', 'じゅうにがつ']
            ]
          }
        ],
        examples: [
          { jp: '{誕生日|たんじょうび}は{四月|しがつ}{三日|みっか}です。', romaji: 'Tanjōbi wa shigatsu mikka desu.', hu: 'A születésnapom április harmadika.' },
          { jp: '{九月|くがつ}{一日|ついたち}に{学校|がっこう}が{始|はじ}まります。', romaji: 'Kugatsu tsuitachi ni gakkō ga hajimarimasu.', hu: 'Szeptember elsején kezdődik az iskola.' },
          { jp: '{今日|きょう}は{何月|なんがつ}{何日|なんにち}ですか。', romaji: 'Kyō wa nangatsu nannichi desu ka.', hu: 'Hányadika van ma?' },
          { jp: '{誕生日|たんじょうび}はいつですか。', romaji: 'Tanjōbi wa itsu desu ka.', hu: 'Mikor van a születésnapod?' },
          { jp: '{十月|じゅうがつ}{二十日|はつか}に{日本|にほん}へ{行|い}きます。', romaji: 'Jūgatsu hatsuka ni Nihon e ikimasu.', hu: 'Október huszadikán megyek Japánba.' }
        ],
        notes: [
          'A 4., 7. és 9. hónap olvasata: <b>しがつ, しちがつ, くがつ</b> — nem „よんがつ", „なながつ", „きゅうがつ".',
          'Az {一日|ついたち} dátumként ついたち, de időtartamként („egy nap") いちにち.'
        ],
        mistakes: [
          { bad: '{四月|よんがつ}', good: '{四月|しがつ}', why: 'Az április しがつ; a 4-nek itt a し olvasata kell.' }
        ]
      },
      {
        title: '〜時間・〜回', sub: 'mennyi ideig, hányszor',
        pattern: 'szám + {時間|じかん} · időszak に + szám + {回|かい}',
        body: 'Az időtartam <b>〜時間</b> (じかん, óra hosszat) vagy <b>〜分</b> (perc). A gyakoriság: az időszak után に, aztán a szám + <b>回</b> (かい): „hetente kétszer".',
        more: [
          'Az <b>időpont</b> és az <b>időtartam</b> két külön dolog, és a japán szó is más rá. {一時|いちじ} = egy óra (időpont), {一時間|いちじかん} = egy órán át (tartam). A különbséget a <b>{間|かん}</b> (köz, tartam) adja.',
          'Az időtartam után <b>nincs partikula</b>: {二時間|にじかん}{勉強|べんきょう}します. A „körülbelül" a <b>くらい / ぐらい</b>, amely a mennyiség után áll; a rákérdezés: <b>どのくらい</b> (mennyi ideig?).',
          'A gyakoriság szerkezete: <b>időszak + に + szám + {回|かい}</b>. Szó szerint: „egy hétben kétszer". Az időszak lehet {一日|いちにち} (naponta), {週|しゅう} (hetente), {月|つき} (havonta), {年|ねん} (évente).'
        ],
        tables: [
          {
            caption: 'Időpont és időtartam',
            head: ['', 'Időpont (mikor?)', 'Időtartam (mennyi ideig?)'],
            rows: [
              ['óra', 'いちじ — egy órakor', 'いちじかん — egy órán át'],
              ['fél', 'いちじはん — fél kettőkor', 'いちじかんはん — másfél órán át'],
              ['perc', 'くじ ごふん — 9:05-kor', 'ごふん(かん) — öt percig'],
              ['nap', 'ふつか — másodikán', 'ふつか(かん) — két napig'],
              ['hét', '—', 'いっしゅうかん — egy hétig'],
              ['hónap', 'いちがつ — januárban', 'いっかげつ — egy hónapig'],
              ['év', '—', 'いちねん — egy évig']
            ]
          }
        ],
        examples: [
          { jp: 'うちから{学校|がっこう}まで{一時間|いちじかん}かかります。', romaji: 'Uchi kara gakkō made ichijikan kakarimasu.', hu: 'Otthonról az iskoláig egy óra az út.' },
          { jp: '{週|しゅう}に{二回|にかい}{図書館|としょかん}へ{行|い}きます。', romaji: 'Shū ni nikai toshokan e ikimasu.', hu: 'Hetente kétszer megyek könyvtárba.' },
          { jp: '{一日|いちにち}に{三回|さんかい}{食|た}べます。', romaji: 'Ichinichi ni sankai tabemasu.', hu: 'Naponta háromszor eszem.' },
          { jp: 'うちから{駅|えき}までどのくらいかかりますか。', romaji: 'Uchi kara eki made dono kurai kakarimasu ka.', hu: 'Mennyi idő az út otthonról az állomásig?' },
          { jp: '{歩|ある}いて{十分|じゅっぷん}ぐらいです。', romaji: 'Aruite juppun gurai desu.', hu: 'Gyalog körülbelül tíz perc.' },
          { jp: '{年|ねん}に{一回|いっかい}{国|くに}へ{帰|かえ}ります。', romaji: 'Nen ni ikkai kuni e kaerimasu.', hu: 'Évente egyszer utazom haza.' }
        ],
        notes: [
          'Néhány időtartam olvasata rendhagyó: {四時間|よじかん}, {九時間|くじかん}, {一週間|いっしゅうかん}, {一|いっ}か{月|げつ}, {六|ろっ}か{月|げつ}, {四年|よねん}.',
          'A <b>かかります</b> azt jelenti: „(ennyi időbe vagy pénzbe) kerül".',
          'A {回|かい} néhány szám után megváltoztatja az előtte álló számot: {一回|いっかい}, {六回|ろっかい}, {八回|はっかい}, {十回|じゅっかい}.'
        ],
        mistakes: [
          { bad: '{二時|にじ}{勉強|べんきょう}しました。', good: '{二時間|にじかん}{勉強|べんきょう}しました。', why: 'A {二時|にじ} időpont („kettőkor"); a „két órán át" {二時間|にじかん}.' }
        ]
      }
    ],
    phrases: [
      { jp: 'はじめまして。アンナと{申|もう}します。', romaji: 'Hajimemashite. Anna to mōshimasu.', hu: 'Örvendek. Annának hívnak.', note: 'A 〜と{申|もう}します a 〜です szerényebb, udvariasabb párja: felnőttnek, tanárnak, hivatalos helyen így mutatkozol be.' },
      { jp: 'こちらはケンさんです。', romaji: 'Kochira wa Ken-san desu.', hu: 'Ő itt Ken.', note: 'Így mutatsz be valakit egy harmadik embernek.' },
      { jp: 'ブダペストに{住|す}んでいます。', romaji: 'Budapesuto ni sunde imasu.', hu: 'Budapesten lakom.', note: 'A 〜ています alakot a 12. leckében tanulod; ezt a mondatot most egyben jegyezd meg.' },
      { jp: 'がんばってください。', romaji: 'Ganbatte kudasai.', hu: 'Hajrá, csak ügyesen!', note: 'Biztatás vizsga, verseny, nehéz feladat előtt. A válasz: がんばります (igyekezni fogok).' },
      { jp: '{本当|ほんとう}ですか。', romaji: 'Hontō desu ka.', hu: 'Tényleg?' },
      { jp: 'いいですか。', romaji: 'Ii desu ka.', hu: 'Rendben? Mehet?', note: 'Így kérdez vissza a tanár, hogy mindenki értette-e.' },
      { jp: 'どのくらいかかりますか。', romaji: 'Dono kurai kakarimasu ka.', hu: 'Mennyi ideig tart?' },
      { jp: '{速|はや}いですね。', romaji: 'Hayai desu ne.', hu: 'De gyors!' },
      { jp: 'では、また{来週|らいしゅう}。', romaji: 'Dewa, mata raishū.', hu: 'Akkor a jövő héten találkozunk!' }
    ],
    words: [
      {
        title: 'Közlekedés',
        items: [
          { jp: '{電車|でんしゃ}', romaji: 'densha', hu: 'vonat, villamos' },
          { jp: '{地下鉄|ちかてつ}', romaji: 'chikatetsu', hu: 'metró' },
          { jp: 'バス', romaji: 'basu', hu: 'busz' },
          { jp: '{自転車|じてんしゃ}', romaji: 'jitensha', hu: 'kerékpár' },
          { jp: '{車|くるま}', romaji: 'kuruma', hu: 'autó' },
          { jp: 'タクシー', romaji: 'takushī', hu: 'taxi' },
          { jp: '{飛行機|ひこうき}', romaji: 'hikōki', hu: 'repülőgép' },
          { jp: '{新幹線|しんかんせん}', romaji: 'shinkansen', hu: 'szuperexpressz' },
          { jp: '{駅|えき}', romaji: 'eki', hu: 'állomás' }
        ]
      },
      {
        title: 'Az iskolában',
        items: [
          { jp: '{授業|じゅぎょう}', romaji: 'jugyō', hu: 'tanóra' },
          { jp: '{宿題|しゅくだい}', romaji: 'shukudai', hu: 'házi feladat' },
          { jp: 'テスト', romaji: 'tesuto', hu: 'dolgozat' },
          { jp: '{質問|しつもん}', romaji: 'shitsumon', hu: 'kérdés' },
          { jp: '{教科書|きょうかしょ}', romaji: 'kyōkasho', hu: 'tankönyv' },
          { jp: '{教室|きょうしつ}', romaji: 'kyōshitsu', hu: 'tanterem' },
          { jp: 'クラスメイト', romaji: 'kurasumeito', hu: 'osztálytárs' },
          { jp: '{留学生|りゅうがくせい}', romaji: 'ryūgakusei', hu: 'külföldi diák' }
        ]
      },
      {
        title: 'Mikor?',
        items: [
          { jp: '{朝|あさ}', romaji: 'asa', hu: 'reggel' },
          { jp: '{昼|ひる}', romaji: 'hiru', hu: 'délben, nappal' },
          { jp: '{夜|よる}', romaji: 'yoru', hu: 'este, éjjel' },
          { jp: '{週末|しゅうまつ}', romaji: 'shūmatsu', hu: 'hétvége' },
          { jp: '{夏休|なつやす}み', romaji: 'natsuyasumi', hu: 'nyári szünet' },
          { jp: '{冬休|ふゆやす}み', romaji: 'fuyuyasumi', hu: 'téli szünet' },
          { jp: '{誕生日|たんじょうび}', romaji: 'tanjōbi', hu: 'születésnap' }
        ]
      }
    ],
    culture: [
      {
        title: 'A tanév áprilisban kezdődik',
        text: 'Japánban az iskolaév és a munkahelyi év is <b>áprilisban</b> indul, éppen akkor, amikor a cseresznyefák virágoznak. Az évnyitó ezért a rózsaszín virágok képével forrt össze: az új kezdet jelképe. A tanév három szakaszból áll, a nyári szünet rövidebb, mint nálunk (nagyjából július végétől augusztus végéig), és a tanév márciusban ér véget.'
      },
      {
        title: 'Nem minden vonat áll meg mindenhol',
        text: 'A japán vasúton ugyanazon a vágányon többféle vonat jár. A <b>{普通|ふつう}</b> minden állomáson megáll; a <b>{急行|きゅうこう}</b> (gyors) és a <b>{特急|とっきゅう}</b> (expressz) sok megállót kihagy. Ha rossz vonatra szállsz, egyszerűen átrobog azon az állomáson, ahol le akartál szállni. Felszállás előtt mindig nézd meg a vonat típusát a kijelzőn.'
      },
      {
        title: 'Melyik kijáratnál?',
        text: 'A nagyobb állomásoknak több kijáratuk van, és ezeket égtájak szerint nevezik el: <b>{北口|きたぐち}</b> (északi), <b>{南口|みなみぐち}</b> (déli), <b>{東口|ひがしぐち}</b> (keleti), <b>{西口|にしぐち}</b> (nyugati kijárat). Ha valakivel az állomásnál találkozol, mindig a kijáratot is beszéljétek meg, különben ugyanannál az állomásnál várhattok egymásra fél órát, két különböző helyen.'
      }
    ],
    quiz: [
      { q: '„Tegnap könyvtárba mentem." Mi hiányzik?', jp: 'きのう{図書館|としょかん}へ＿。', a: '{行|い}きました', wrong: ['{行|い}きます', '{行|い}きません', '{行|い}きませんでした'], why: 'Múlt idő, állítás: 〜ました.' },
      { q: '„Busszal megyek." Melyik partikula hiányzik?', jp: 'バス＿{行|い}きます。', a: 'で', wrong: ['に', 'へ', 'と'], why: 'Az eszközt a で jelöli.' },
      { q: 'Melyik időszó után NEM áll に?', a: '{明日|あした}', wrong: ['{八時|はちじ}', '{土曜日|どようび}', '{四月|しがつ}{三日|みっか}'], why: 'A viszonylagos időszavak (ma, holnap, jövő héten) után nincs に.' },
      { q: '„A barátommal megyek." Melyik partikula hiányzik?', jp: '{友|とも}だち＿{行|い}きます。', a: 'と', wrong: ['で', 'を', 'が'], why: 'A társat a と jelöli.' },
      { q: 'Hogyan olvasod: 四月三日', a: 'しがつ みっか', wrong: ['よんがつ さんにち', 'しがつ さんにち', 'よんがつ みっか'], why: 'Április: しがつ; harmadika: みっか. Mindkettő rendhagyó.' },
      { q: '„Vasárnap nem megyek iskolába." Mi hiányzik?', jp: '{日曜日|にちようび}は{学校|がっこう}へ＿。', a: '{行|い}きません', wrong: ['{行|い}きます', '{行|い}きました', '{行|い}きませんでした'], why: 'Jelen vagy jövő idő, tagadás: 〜ません.' },
      { q: '„A barátom Pécsről jött." Melyik partikula hiányzik?', jp: '{友|とも}だちはペーチ＿{来|き}ました。', a: 'から', wrong: ['まで', 'へ', 'を'], why: 'A kiindulópontot a から jelöli.' },
      { q: '„Nyolckor megyek iskolába." Melyik partikula hiányzik?', jp: '{八時|はちじ}＿{学校|がっこう}へ{行|い}きます。', a: 'に', wrong: ['で', 'を', 'と'], why: 'Számmal kifejezett időpont után に áll.' },
      { q: 'Hogyan mondod: „Gyalog megyek haza."', a: '{歩|ある}いて{帰|かえ}ります。', wrong: ['{歩|ある}いてで{帰|かえ}ります。', 'バスで{帰|かえ}ります。', '{歩|ある}いて{来|き}ました。'], why: 'A gyaloglás {歩|ある}いて, で nélkül; hazamenni: {帰|かえ}ります.' },
      { q: '„Hetente kétszer megyek könyvtárba." Mi hiányzik?', jp: '{週|しゅう}に＿{図書館|としょかん}へ{行|い}きます。', a: '{二回|にかい}', wrong: ['{二時間|にじかん}', '{二日|ふつか}', '{二人|ふたり}'], why: 'A gyakoriság: időszak に + szám + {回|かい}.' },
      { q: 'Melyik a „megy" ige múlt idejű tagadó alakja?', a: '{行|い}きませんでした', wrong: ['{行|い}きませんです', '{行|い}きましたません', '{行|い}きないでした'], why: 'A jelen tagadó alakhoz (〜ません) でした járul.' },
      { q: 'A japán iskolában állsz. Megkérdezed az osztálytársadat, mivel jár ide. Melyik ige kell?', a: '{来|き}ます', wrong: ['{行|い}きます', '{帰|かえ}ります', 'います'], why: 'A cél az a hely, ahol te vagy: ide „jönni" kell.' },
      { q: '„Hétkor megyek haza." Melyik a helyes?', a: '{七時|しちじ}にうちへ{帰|かえ}ります。', wrong: ['{七時|しちじ}にうちへ{行|い}きます。', '{七時|しちじ}うちで{帰|かえ}ります。', '{七時|しちじ}にうちを{帰|かえ}ります。'], why: 'A saját otthonodba „hazatérsz": {帰|かえ}ります; a cél へ-t kap.' },
      { q: '„Egyedül mentem." Melyik partikula hiányzik?', jp: '{一人|ひとり}＿{行|い}きました。', a: 'で', wrong: ['と', 'に', 'を'], why: 'A létszámot kifejező szavak で-t kapnak: {一人|ひとり}で, {二人|ふたり}で, みんなで.' },
      { q: 'Melyik mondatban van hiba?', a: 'いつに{行|い}きますか。', wrong: ['いつ{行|い}きますか。', '{八時|はちじ}に{行|い}きます。', '{来週|らいしゅう}{行|い}きます。'], why: 'Az いつ után soha nincs に.' },
      { q: 'Hogy olvasod: 二十日 (a hónap 20. napja)?', a: 'はつか', wrong: ['にじゅうにち', 'ふつか', 'にじゅっか'], why: 'A huszadika rendhagyó: はつか.' },
      {
        q: 'Mi a különbség? {三時|さんじ} és {三時間|さんじかん}',
        a: 'az első időpont (háromkor), a második időtartam (három órán át)',
        wrong: ['az első időtartam, a második időpont', 'ugyanazt jelentik', 'az első délelőtt, a második délután'],
        why: 'A {間|かん} teszi időtartammá: {三時間|さんじかん} = három órán át.'
      },
      { q: '„Sehová sem mentem." Mi hiányzik?', jp: '＿{行|い}きませんでした。', a: 'どこへも', wrong: ['どこかへ', 'どこへ', 'どこでも'], why: 'A どこへも + tagadás = „sehová"; a どこかへ „valahová".' },
      { q: 'Felnőttnek, hivatalos helyen mutatkozol be. Melyik az udvariasabb?', a: 'アンナと{申|もう}します。', wrong: ['アンナさんです。', 'アンナが{来|き}ます。', 'アンナといいですか。'], why: 'A 〜と{申|もう}します a 〜です szerény, udvarias párja.' },
      { q: 'Mikor kezdődik a tanév Japánban?', a: 'áprilisban', wrong: ['szeptemberben', 'januárban', 'júliusban'], why: 'Az iskolaév áprilisban indul, a cseresznyevirágzás idején.' }
    ]
  },

  /* ── 6. lecke ─────────────────────────────────────── */
  {
    id: 'l6', no: 6, book: 'Dekiru 1', title: 'Mindennapok',
    lead: 'Elmondod, mit csinálsz egy átlagos napon és hol, megmondod, miért mész valahová, és programot javasolsz valakinek.',
    cando: [
      'Beszélsz a napi teendőidről, sorrendben.',
      'Megmondod, hol csinálsz valamit, és miért mész valahová.',
      'Meghívsz valakit, és elfogadod vagy udvariasan elhárítod a meghívást.',
      'Megismered az igék három csoportját és a szótári alakot.'
    ],
    intro: [
      'Az előző leckében csak mozogni tudtál: menni, jönni, hazamenni. Most megjönnek a <b>hétköznapi cselekvések</b>: enni, inni, olvasni, tanulni, találkozni. Ezekhez két új szerep kell a mondatban: a <b>tárgy</b> (mit?), amelyet a <b>を</b> jelöl, és a <b>cselekvés helye</b> (hol?), amelyet a <b>で</b>.',
      'Ez az a lecke, ahol a に és a で először ütközik. Mindkettőt fordíthatod úgy, hogy „-ban, -ben", mégsem cserélhetők fel: a に azt mondja meg, hol <b>van</b> valami, a で azt, hol <b>történik</b> valami. Ha ezt most megjegyzed, sok későbbi hibától megkíméled magad.',
      'A lecke végén megismered az igék <b>szótári alakját</b> és a három igecsoportot. Egyelőre nem kell vele mondatot alkotnod: arra való, hogy a szótárban megtaláld az igét, és hogy a következő leckékben meg tudd képezni a többi alakot.'
    ],
    dialogue: {
      title: 'Program holnapra',
      scene: 'Ken a szünetben megszólítja Annát: szótárt szeretne venni, és nem akar egyedül menni.',
      lines: [
        { who: 'Ken', jp: 'アンナさん、{明日|あした}の{午後|ごご}、{時間|じかん}がありますか。', romaji: 'Anna-san, ashita no gogo, jikan ga arimasu ka.', hu: 'Anna, holnap délután ráérsz?' },
        { who: 'Anna', jp: 'はい、ありますよ。', romaji: 'Hai, arimasu yo.', hu: 'Igen, ráérek.' },
        {
          who: 'Ken',
          jp: '{駅|えき}の{近|ちか}くの{本屋|ほんや}へ{辞書|じしょ}を{買|か}いに{行|い}きます。いっしょに{行|い}きませんか。',
          romaji: 'Eki no chikaku no hon-ya e jisho o kai ni ikimasu. Issho ni ikimasen ka.',
          hu: 'Az állomás melletti könyvesboltba megyek szótárt venni. Nem jönnél velem?'
        },
        { who: 'Anna', jp: 'ええ、いいですね。{行|い}きましょう。', romaji: 'Ee, ii desu ne. Ikimashō.', hu: 'De, jó ötlet. Menjünk!' },
        { who: 'Ken', jp: 'じゃあ、{二時|にじ}に{駅|えき}の{前|まえ}で{会|あ}いましょう。', romaji: 'Jā, niji ni eki no mae de aimashō.', hu: 'Akkor találkozzunk kettőkor az állomás előtt!' },
        { who: 'Anna', jp: 'はい。それから、{喫茶店|きっさてん}でコーヒーを{飲|の}みませんか。', romaji: 'Hai. Sorekara, kissaten de kōhī o nomimasen ka.', hu: 'Rendben. És utána nem innánk egy kávét egy kávézóban?' },
        { who: 'Ken', jp: 'いいですね。そうしましょう。', romaji: 'Ii desu ne. Sō shimashō.', hu: 'Jó ötlet. Legyen úgy!' },
        { who: 'Anna', jp: 'ケンさんは{毎朝|まいあさ}{何時|なんじ}に{起|お}きますか。', romaji: 'Ken-san wa maiasa nanji ni okimasu ka.', hu: 'Ken, te hánykor kelsz reggelente?' },
        { who: 'Ken', jp: '{六時|ろくじ}に{起|お}きます。そして、{公園|こうえん}で{一時間|いちじかん}ジョギングをします。', romaji: 'Rokuji ni okimasu. Soshite, kōen de ichijikan jogingu o shimasu.', hu: 'Hatkor kelek. És egy órát kocogok a parkban.' },
        { who: 'Anna', jp: 'すごいですね。わたしは{七時半|しちじはん}に{起|お}きます。', romaji: 'Sugoi desu ne. Watashi wa shichiji han ni okimasu.', hu: 'Ez igen! Én fél nyolckor kelek.' },
        { who: 'Ken', jp: 'じゃあ、また{明日|あした}。', romaji: 'Jā, mata ashita.', hu: 'Akkor holnap találkozunk!' }
      ],
      notes: [
        'A meghívás előtt Ken <b>előkészíti a terepet</b>: megkérdezi, ráér-e Anna ({時間|じかん}がありますか). Japánul udvariatlan ajtóstul rontani a meghívással; előbb megadod a másiknak a lehetőséget, hogy elegánsan kitérjen.',
        'A {駅|えき}の{前|まえ}<b>で</b>{会|あ}いましょう mondatban で áll, nem に: a találkozás <b>cselekvés</b>, és a で mondja meg, hol történik.',
        'A <b>そうしましょう</b> („csináljuk úgy") beleegyezés egy javaslatba. Az <b>ええ</b> a はい lazább, barátságosabb párja; a jelentése ugyanaz.',
        'A <b>そして</b> („és") egyszerűen hozzáfűz egy újabb mondatot; a <b>それから</b> („azután") időrendet is jelez. Egy nap elmesélésekor ez a két szó köti össze a mondatokat.',
        'A <b>じゃあ、また{明日|あした}</b> hétköznapi búcsú azok között, akik másnap is találkoznak. Még rövidebben: じゃあ、また.'
      ]
    },
    points: [
      {
        title: '〜を', sub: 'a cselekvés tárgya',
        pattern: 'tárgy を + ige',
        body: 'Amire a cselekvés irányul (mit eszel, mit olvasol), azt a <b>を</b> jelöli (kiejtve: <i>o</i>). A magyar -t rag megfelelője.',
        more: [
          'Tárgyas igének azt hívjuk, amelyik mellett megmondható, <b>mire</b> irányul a cselekvés: {食|た}べます (eszik valamit), {飲|の}みます (iszik valamit), {見|み}ます (néz valamit), します (csinál valamit).',
          'Egy ige mellett <b>egyetlen を</b> állhat. Ha több tárgyad van, a と köti össze őket, és a を csak az utolsó után jön: パン<b>と</b>ハム<b>を</b>{食|た}べます.',
          'A <b>します</b> („csinál") igével a cselekvést jelentő főnévből ige lesz: {勉強|べんきょう} (tanulás) → {勉強|べんきょう}します (tanul). Az ilyen igéknél kétféleképpen mondhatod meg, <i>mit</i> tanulsz.'
        ],
        tables: [
          {
            caption: 'A します-igék két szerkezete',
            head: ['Szerkezet', 'Példa', 'Magyarul'],
            rows: [
              ['tárgy を + főnév + します', 'にほんご<b>を</b> べんきょうします', 'japánt tanulok'],
              ['tárgy の + főnév を + します', 'にほんご<b>の</b> べんきょう<b>を</b> します', 'japán tanulmányokat folytatok']
            ]
          }
        ],
        examples: [
          { jp: '{朝|あさ}パンを{食|た}べます。', romaji: 'Asa pan o tabemasu.', hu: 'Reggel kenyeret eszem.' },
          { jp: '{毎晩|まいばん}{本|ほん}を{読|よ}みます。', romaji: 'Maiban hon o yomimasu.', hu: 'Minden este könyvet olvasok.' },
          { jp: '{何|なに}を{飲|の}みますか。', romaji: 'Nani o nomimasu ka.', hu: 'Mit iszol?' },
          { jp: 'パンとたまごを{食|た}べます。', romaji: 'Pan to tamago o tabemasu.', hu: 'Kenyeret és tojást eszem.' },
          { jp: '{日本語|にほんご}を{勉強|べんきょう}します。', romaji: 'Nihongo o benkyō shimasu.', hu: 'Japánt tanulok.' },
          { jp: '{日曜日|にちようび}にテニスをします。', romaji: 'Nichiyōbi ni tenisu o shimasu.', hu: 'Vasárnap teniszezem.' }
        ],
        notes: [
          'A を írásban külön jel, de a kiejtése egyszerűen <b>„o"</b>.',
          'A kérdésben a kérdőszó kapja a を-t: {何|なに}<b>を</b>しますか (mit csinálsz?).',
          'Semleges tagadás: {何|なに}も{食|た}べません (semmit sem eszem) — a も kiszorítja a を-t.'
        ],
        mistakes: [
          { bad: '{日本語|にほんご}を{勉強|べんきょう}をします。', good: '{日本語|にほんご}を{勉強|べんきょう}します。', why: 'Egy ige mellett csak egy を lehet. Vagy: {日本語|にほんご}<b>の</b>{勉強|べんきょう}をします.' }
        ]
      },
      {
        title: '〜で', sub: 'a cselekvés helye',
        pattern: 'hely で + cselekvés',
        body: 'Ahol valamit <i>csinálsz</i>, azt a <b>で</b> jelöli. Ne keverd a に-vel: a に a létezés helye (あります, います) és a mozgás célja.',
        more: [
          'A で-nek ez már a második szerepe: az 5. leckében az <b>eszközt</b> jelölte (バスで), most a <b>cselekvés helyét</b>. A kettőben közös, hogy a cselekvés <i>körülményét</i> adják meg.',
          'A döntő kérdés: az ige <b>létezést</b> vagy <b>cselekvést</b> fejez-e ki? あります, います → に. Minden más ige (eszik, olvas, tanul, találkozik, vásárol) → で.'
        ],
        tables: [
          {
            caption: 'に vagy で?',
            head: ['', 'Partikula', 'Példa'],
            rows: [
              ['hol van?', 'に', 'としょかん<b>に</b> います'],
              ['hová megy?', 'に / へ', 'としょかん<b>に</b> いきます'],
              ['hol csinálja?', 'で', 'としょかん<b>で</b> べんきょうします']
            ]
          }
        ],
        examples: [
          { jp: '{図書館|としょかん}で{勉強|べんきょう}します。', romaji: 'Toshokan de benkyō shimasu.', hu: 'A könyvtárban tanulok.' },
          { jp: 'うちで{晩|ばん}ごはんを{食|た}べます。', romaji: 'Uchi de bangohan o tabemasu.', hu: 'Otthon vacsorázom.' },
          { jp: 'どこで{買|か}いましたか。', romaji: 'Doko de kaimashita ka.', hu: 'Hol vetted?' },
          { jp: '{駅|えき}の{前|まえ}で{友|とも}だちに{会|あ}います。', romaji: 'Eki no mae de tomodachi ni aimasu.', hu: 'Az állomás előtt találkozom a barátommal.' },
          { jp: '{学校|がっこう}で{昼|ひる}ごはんを{食|た}べます。', romaji: 'Gakkō de hirugohan o tabemasu.', hu: 'Az iskolában ebédelek.' }
        ],
        notes: [
          'Az {会|あ}います (találkozik) mellett az, akivel találkozol, <b>に</b>-t kap: {友|とも}だち<b>に</b>{会|あ}います. A と is helyes ({友|とも}だちと{会|あ}います), ha a találkozót közösen beszéltétek meg.',
          'Egy mondatban lehet で és を is: {喫茶店|きっさてん}<b>で</b>コーヒー<b>を</b>{飲|の}みます. A szokásos sorrend: idő, hely, tárgy, ige.'
        ],
        mistakes: [
          { bad: '{図書館|としょかん}に{勉強|べんきょう}します。', good: '{図書館|としょかん}で{勉強|べんきょう}します。', why: 'A tanulás cselekvés: a helyét で jelöli.' },
          { bad: '{図書館|としょかん}でいます。', good: '{図書館|としょかん}にいます。', why: 'Az います létezést fejez ki: a helyét に jelöli.' }
        ],
        tip: '{図書館|としょかん}<b>に</b> います = a könyvtárban vagyok · {図書館|としょかん}<b>で</b> {読|よ}みます = a könyvtárban olvasok.'
      },
      {
        title: '〜に 行きます', sub: 'miért megyek oda',
        pattern: 'hely へ + (ige ます nélkül / főnév) に {行|い}きます',
        body: 'A mozgás célját az ige <b>ます nélküli alakja + に</b> fejezi ki: {買|か}います → <b>{買|か}いに</b> {行|い}きます (megyek vásárolni). Cselekvést jelentő főnév is állhat itt: {買|か}い{物|もの}に, {散歩|さんぽ}に.',
        more: [
          'A cél kifejezéséhez az ige <b>ます előtti részét</b> (a ます-tövet) veszed, és に-t teszel utána: {買|か}い<b>ます</b> → {買|か}い<b>に</b>, {食|た}べ<b>ます</b> → {食|た}べ<b>に</b>, {見|み}<b>ます</b> → {見|み}<b>に</b>.',
          'Ez a szerkezet csak a három <b>mozgásigével</b> működik: {行|い}きます, {来|き}ます, {帰|かえ}ります. A helyet továbbra is へ vagy に jelöli, így egy mondatban két に is lehet: デパート<b>に</b>かばんを{買|か}い<b>に</b>{行|い}きます.',
          'A します-igéknél a し elhagyható: {勉強|べんきょう}しに{行|い}きます vagy egyszerűen {勉強|べんきょう}に{行|い}きます.'
        ],
        tables: [
          {
            caption: 'A cél alakja',
            head: ['〜ます', 'Cél', 'Példa'],
            rows: [
              ['かいます', 'かい<b>に</b>', 'ほんを かいに いきます'],
              ['たべます', 'たべ<b>に</b>', 'すしを たべに いきます'],
              ['みます', 'み<b>に</b>', 'えいがを みに いきます'],
              ['あいます', 'あい<b>に</b>', 'ともだちに あいに いきます'],
              ['べんきょうします', 'べんきょう(し)<b>に</b>', 'にほんごを べんきょうしに きました']
            ]
          }
        ],
        examples: [
          { jp: 'デパートへかばんを{買|か}いに{行|い}きます。', romaji: 'Depāto e kaban o kai ni ikimasu.', hu: 'Az áruházba megyek táskát venni.' },
          { jp: '{友|とも}だちのうちへ{遊|あそ}びに{行|い}きました。', romaji: 'Tomodachi no uchi e asobi ni ikimashita.', hu: 'Elmentem a barátomhoz vendégségbe.' },
          { jp: '{公園|こうえん}へ{散歩|さんぽ}に{行|い}きます。', romaji: 'Kōen e sanpo ni ikimasu.', hu: 'A parkba megyek sétálni.' },
          { jp: '{日本|にほん}へ{日本語|にほんご}を{勉強|べんきょう}しに{来|き}ました。', romaji: 'Nihon e nihongo o benkyō shi ni kimashita.', hu: 'Japánba japánt tanulni jöttem.' },
          { jp: 'うちへ{昼|ひる}ごはんを{食|た}べに{帰|かえ}ります。', romaji: 'Uchi e hirugohan o tabe ni kaerimasu.', hu: 'Hazamegyek ebédelni.' },
          { jp: '{何|なに}をしに{行|い}きますか。', romaji: 'Nani o shi ni ikimasu ka.', hu: 'Mit csinálni mész oda?' }
        ],
        mistakes: [
          { bad: 'かばんを{買|か}いますに{行|い}きます。', good: 'かばんを{買|か}いに{行|い}きます。', why: 'A に elé a ます nélküli tő kerül.' }
        ]
      },
      {
        title: '〜ませんか', sub: 'meghívás',
        pattern: 'ige + ませんか',
        body: 'A tagadó kérdés udvarias meghívás: „nem …-nánk?" Azt jelzi, hogy a döntést a másikra bízod.',
        more: [
          'A <b>〜ませんか</b> alakra tagadó kérdés, de nem azt kérdezi, hogy „nem csinálod-e": <b>meghívás</b>. A tagadó forma itt udvariassági eszköz: nyitva hagyja a kaput, a másik könnyen mondhat nemet.',
          'A meghívást gyakran az <b>いっしょに</b> (együtt) vezeti be. Elfogadni így szokás: <b>ええ、いいですね</b>. Elhárítani pedig úgy, hogy megnevezed az időpontot, és félbehagyod a mondatot: <b>すみません、{明日|あした}はちょっと…</b>'
        ],
        tables: [
          {
            caption: 'Meghívás és válasz',
            head: ['', 'Mondat', 'Magyarul'],
            rows: [
              ['meghívás', 'いっしょに いきませんか。', 'Nem mennénk együtt?'],
              ['elfogadás', 'ええ、いいですね。いきましょう。', 'De, jó ötlet. Menjünk!'],
              ['elhárítás', 'すみません、きょうは ちょっと…。', 'Ne haragudj, ma nem igazán…']
            ]
          }
        ],
        examples: [
          { jp: 'いっしょに{映画|えいが}を{見|み}ませんか。', romaji: 'Issho ni eiga o mimasen ka.', hu: 'Nem néznénk meg együtt egy filmet?' },
          { jp: 'コーヒーを{飲|の}みませんか。', romaji: 'Kōhī o nomimasen ka.', hu: 'Nem iszol egy kávét?' },
          { jp: '{日曜日|にちようび}にいっしょにテニスをしませんか。', romaji: 'Nichiyōbi ni issho ni tenisu o shimasen ka.', hu: 'Nem teniszeznénk együtt vasárnap?' }
        ],
        notes: [
          'A kerek „nem megyek" ({行|い}きません) meghívásra adott válaszként nyers. A ちょっと… azért udvarias, mert nem mondja ki a nemet.'
        ],
        mistakes: [
          { bad: 'いっしょに{行|い}きますか。', good: 'いっしょに{行|い}きませんか。', why: 'Az {行|い}きますか egyszerű kérdés („mész?"); meghívásnak a tagadó kérdő alak kell.' }
        ]
      },
      {
        title: '〜ましょう', sub: 'javaslat, beleegyezés',
        pattern: 'ige + ましょう',
        body: 'A <b>ましょう</b> közös cselekvésre szólít: „…-junk!". Gyakran ez a válasz a meghívásra. Ha nemet mondasz, elég ennyi: <b>すみません、ちょっと…</b> (elnézést, most nem igazán).',
        more: [
          'A <b>〜ましょう</b> közös cselekvésre szólít: magyarul a többes szám első személyű felszólító mód felel meg neki („menjünk", „együnk"). Képzése: a ます helyére ましょう kerül.',
          'A két alak munkamegosztása: a <b>〜ませんか</b> <i>kérdez</i> (még nem tudod, mit szól a másik), a <b>〜ましょう</b> <i>kijelent</i> (már megegyeztetek, vagy biztosra veszed a beleegyezést). Ezért lesz a meghívásra adott igenlő válasz ましょう.'
        ],
        tables: [
          {
            caption: 'Három alak egymás mellett',
            head: ['Alak', 'Mit fejez ki?', 'Példa'],
            rows: [
              ['〜ます', 'kijelentés', 'えいがを みます。 — Filmet nézek.'],
              ['〜ませんか', 'meghívás', 'えいがを みませんか。 — Nem néznénk filmet?'],
              ['〜ましょう', 'közös elhatározás', 'えいがを みましょう。 — Nézzünk filmet!']
            ]
          }
        ],
        examples: [
          { jp: 'ええ、{見|み}ましょう。', romaji: 'Ee, mimashō.', hu: 'Jó, nézzük meg!' },
          { jp: '{駅|えき}で{会|あ}いましょう。', romaji: 'Eki de aimashō.', hu: 'Találkozzunk az állomáson!' },
          { jp: '{少|すこ}し{休|やす}みましょう。', romaji: 'Sukoshi yasumimashō.', hu: 'Pihenjünk egy kicsit!' },
          { jp: 'じゃあ、{三時|さんじ}に{行|い}きましょう。', romaji: 'Jā, sanji ni ikimashō.', hu: 'Akkor menjünk háromkor!' }
        ],
        notes: [
          'A találkozó megbeszélésének kész mondata: <b>(időpont) に (hely) で {会|あ}いましょう</b>.',
          'Tanár az órán: はじめましょう (kezdjük!), おわりましょう (fejezzük be!).'
        ]
      },
      {
        title: 'そして・それから', sub: 'mondatok összefűzése',
        pattern: 'mondat。そして、mondat。 · mondat。それから、mondat。',
        body: 'Ha el akarod mesélni a napodat, a mondatokat össze kell kötnöd. Erre két szó szolgál, mindkettő a <b>következő mondat elején</b> áll. A <b>そして</b> egyszerűen hozzáad („és"); a <b>それから</b> azt is jelzi, hogy valami <b>utána</b> történt („azután", „és még").',
        more: [
          'A そして tulajdonságokat és tényeket is összeköthet, a それから inkább eseményeket időrendben. Rendeléskor a それから azt jelenti: „és még kérek…".',
          'Ezek kötőszavak, nem partikulák: nem tapadnak az előző szóhoz, előttük a mondat pontra végződik. Főneveket továbbra is a と köt össze.'
        ],
        examples: [
          { jp: '{朝|あさ}{六時|ろくじ}に{起|お}きます。そして、{朝|あさ}ごはんを{食|た}べます。', romaji: 'Asa rokuji ni okimasu. Soshite, asagohan o tabemasu.', hu: 'Reggel hatkor kelek. És megreggelizem.' },
          { jp: '{図書館|としょかん}で{勉強|べんきょう}しました。それから、うちへ{帰|かえ}りました。', romaji: 'Toshokan de benkyō shimashita. Sorekara, uchi e kaerimashita.', hu: 'A könyvtárban tanultam. Azután hazamentem.' },
          { jp: '{新聞|しんぶん}を{読|よ}みます。それから、{学校|がっこう}へ{行|い}きます。', romaji: 'Shinbun o yomimasu. Sorekara, gakkō e ikimasu.', hu: 'Újságot olvasok. Azután iskolába megyek.' }
        ],
        tip: 'Naplót vagy beszámolót így építhetsz: első mondat, そして…, それから…, それから… A múlt idejű végződést (〜ました) minden mondat megkapja.'
      },
      {
        title: 'Az igék három csoportja', sub: 'a szótári alak',
        pattern: 'I. csoport: 〜う · II. csoport: 〜る · III. csoport: くる, する',
        body: 'Minden japán igének van egy <b>szótári alakja</b>: ebben a formában áll a szótárban, és mindig <b>u hangra</b> végződik. Az eddig tanult 〜ます alak ennek az udvarias változata. A szótári alak alapján az igék három csoportba tartoznak, és a későbbi leckékben minden új alakot csoportonként másképp képzünk.',
        more: [
          '<b>I. csoport</b> (ötfokú igék): a 〜ます előtt mindig <b>i</b> hangú szótag áll; a szótári alakban ez <b>u</b> hangúra vált: かき<b>ます</b> → か<b>く</b>, のみ<b>ます</b> → の<b>む</b>, あい<b>ます</b> → あ<b>う</b>.',
          '<b>II. csoport</b> (egyfokú igék): a 〜ます helyére egyszerűen <b>る</b> kerül: たべ<b>ます</b> → たべ<b>る</b>, み<b>ます</b> → み<b>る</b>. A る előtt mindig e vagy i hang áll.',
          '<b>III. csoport</b>: a két rendhagyó ige, <b>きます → くる</b> és <b>します → する</b>, valamint minden する-val képzett ige ({勉強|べんきょう}する).'
        ],
        tables: [
          {
            caption: 'Szótári alak és 〜ます alak',
            head: ['Csoport', 'Szótári alak', '〜ます alak', 'Jelentés'],
            rows: [
              ['I.', 'あ<b>う</b>', 'あ<b>い</b>ます', 'találkozik'],
              ['I.', 'か<b>く</b>', 'か<b>き</b>ます', 'ír'],
              ['I.', 'はな<b>す</b>', 'はな<b>し</b>ます', 'beszél'],
              ['I.', 'ま<b>つ</b>', 'ま<b>ち</b>ます', 'vár'],
              ['I.', 'よ<b>む</b>', 'よ<b>み</b>ます', 'olvas'],
              ['I.', 'つく<b>る</b>', 'つく<b>り</b>ます', 'készít'],
              ['II.', 'たべ<b>る</b>', 'たべます', 'eszik'],
              ['II.', 'み<b>る</b>', 'みます', 'néz'],
              ['II.', 'おき<b>る</b>', 'おきます', 'felkel'],
              ['II.', 'ね<b>る</b>', 'ねます', 'lefekszik'],
              ['III.', '<b>くる</b>', '<b>き</b>ます', 'jön'],
              ['III.', '<b>する</b>', '<b>し</b>ます', 'csinál']
            ]
          }
        ],
        examples: [
          { jp: '「{食|た}べます」の{辞書形|じしょけい}は「{食|た}べる」です。', romaji: '"Tabemasu" no jishokei wa "taberu" desu.', hu: 'A „tabemasu" szótári alakja „taberu".' },
          { jp: '「{行|い}きます」の{辞書形|じしょけい}は「{行|い}く」です。', romaji: '"Ikimasu" no jishokei wa "iku" desu.', hu: 'Az „ikimasu" szótári alakja „iku".' },
          { jp: '「します」の{辞書形|じしょけい}は「する」です。', romaji: '"Shimasu" no jishokei wa "suru" desu.', hu: 'A „shimasu" szótári alakja „suru".' }
        ],
        notes: [
          'Honnan tudod, melyik csoport? Ha a 〜ます előtt <b>e</b> hang áll (たべ, ね), az ige szinte biztosan II. csoportú. Ha <b>i</b> hang áll, többnyire I. csoportú — de néhány rövid ige (みます, おきます, います) a II. csoportba tartozik; ezeket meg kell jegyezni.',
          'Van néhány ige, amelynek a szótári alakja <b>える / いる</b> végű, tehát II. csoportúnak látszik, mégis az I. csoport szerint ragozódik: {帰|かえ}る → {帰|かえ}ります, {走|はし}る → {走|はし}ります, {入|はい}る → {入|はい}ります, {切|き}る → {切|き}ります.',
          'A はなします (beszél) I. csoportú ige; ne keverd a III. csoportú します-szal, csak mert ugyanúgy végződik.'
        ],
        mistakes: [
          { bad: '{帰|かえ}ます', good: '{帰|かえ}ります', why: 'A {帰|かえ}る I. csoportú, hiába える végű: a る-ból り lesz, nem esik ki.' }
        ]
      }
    ],
    phrases: [
      { jp: '{時間|じかん}がありますか。', romaji: 'Jikan ga arimasu ka.', hu: 'Ráérsz? Van időd?', note: 'A meghívás bevezetője.' },
      { jp: 'ええ、いいですね。', romaji: 'Ee, ii desu ne.', hu: 'De, jó ötlet!', note: 'Így fogadsz el egy meghívást.' },
      { jp: 'すみません、{明日|あした}はちょっと…。', romaji: 'Sumimasen, ashita wa chotto…', hu: 'Ne haragudj, holnap nem igazán jó…', note: 'Udvarias elhárítás: a mondatot nem fejezed be, az okot nem kell megmondanod.' },
      { jp: 'そうしましょう。', romaji: 'Sō shimashō.', hu: 'Legyen úgy!' },
      { jp: 'すごいですね。', romaji: 'Sugoi desu ne.', hu: 'Ez igen! Nem semmi!' },
      { jp: 'じゃあ、また{明日|あした}。', romaji: 'Jā, mata ashita.', hu: 'Akkor holnap találkozunk!' },
      { jp: 'おやすみなさい。', romaji: 'Oyasuminasai.', hu: 'Jó éjszakát!' },
      { jp: 'お{先|さき}に{失礼|しつれい}します。', romaji: 'O-saki ni shitsurei shimasu.', hu: 'Elnézést, hogy előbb megyek.', note: 'Így búcsúzik, aki hamarabb indul haza, mint a többiek: munkahelyen, szakkörön mindennapos.' }
    ],
    words: [
      {
        title: 'Egy nap igéi',
        note: 'A szótári alakjukat a lecke utolsó pontjában találod.',
        items: [
          { jp: '{起|お}きます', romaji: 'okimasu', hu: 'felkel' },
          { jp: '{寝|ね}ます', romaji: 'nemasu', hu: 'lefekszik, alszik' },
          { jp: '{食|た}べます', romaji: 'tabemasu', hu: 'eszik' },
          { jp: '{飲|の}みます', romaji: 'nomimasu', hu: 'iszik' },
          { jp: '{見|み}ます', romaji: 'mimasu', hu: 'néz, lát' },
          { jp: '{聞|き}きます', romaji: 'kikimasu', hu: 'hallgat, hall' },
          { jp: '{読|よ}みます', romaji: 'yomimasu', hu: 'olvas' },
          { jp: '{書|か}きます', romaji: 'kakimasu', hu: 'ír' },
          { jp: '{買|か}います', romaji: 'kaimasu', hu: 'vesz, vásárol' },
          { jp: '{会|あ}います', romaji: 'aimasu', hu: 'találkozik' },
          { jp: '{作|つく}ります', romaji: 'tsukurimasu', hu: 'készít, csinál' },
          { jp: '{勉強|べんきょう}します', romaji: 'benkyō shimasu', hu: 'tanul' },
          { jp: '{働|はたら}きます', romaji: 'hatarakimasu', hu: 'dolgozik' },
          { jp: '{休|やす}みます', romaji: 'yasumimasu', hu: 'pihen' }
        ]
      },
      {
        title: 'Étkezések',
        items: [
          { jp: '{朝|あさ}ごはん', romaji: 'asagohan', hu: 'reggeli' },
          { jp: '{昼|ひる}ごはん', romaji: 'hirugohan', hu: 'ebéd' },
          { jp: '{晩|ばん}ごはん', romaji: 'bangohan', hu: 'vacsora' },
          { jp: 'ごはん', romaji: 'gohan', hu: 'főtt rizs; étkezés' },
          { jp: 'お{弁当|べんとう}', romaji: 'o-bentō', hu: 'dobozos ebéd' }
        ]
      },
      {
        title: 'Hová menjünk?',
        items: [
          { jp: '{映画館|えいがかん}', romaji: 'eigakan', hu: 'mozi' },
          { jp: '{喫茶店|きっさてん}', romaji: 'kissaten', hu: 'kávézó' },
          { jp: 'レストラン', romaji: 'resutoran', hu: 'étterem' },
          { jp: 'デパート', romaji: 'depāto', hu: 'áruház' },
          { jp: '{美術館|びじゅつかん}', romaji: 'bijutsukan', hu: 'szépművészeti múzeum' },
          { jp: '{温泉|おんせん}', romaji: 'onsen', hu: 'termálfürdő' },
          { jp: 'カラオケ', romaji: 'karaoke', hu: 'karaoke' },
          { jp: 'コンサート', romaji: 'konsāto', hu: 'koncert' }
        ]
      }
    ],
    culture: [
      {
        title: 'A kádban nem mosakszunk',
        text: 'A japán fürdőben a kád (<b>お{風呂|ふろ}</b>) nem a tisztálkodás, hanem az <b>ellazulás</b> helye. A család tagjai egymás után ugyanabban a forró vízben ülnek, ezért a kádba csak tisztán szabad belépni: előtte a kád mellett, kis széken ülve szappanozod és öblíted le magad. A kádban szappant, sampont használni komoly illetlenség. Ugyanez a szabály a termálfürdőkben (<b>{温泉|おんせん}</b>) is.'
      },
      {
        title: 'Rizs és leves reggelire',
        text: 'A hagyományos japán reggeli nem édes: egy tál rizs (<b>ごはん</b>), miszoleves, sült hal, savanyúság, és sokaknál erjesztett szójabab (<b>{納豆|なっとう}</b>). A ごはん szó egyszerre jelent főtt rizst és étkezést: az {朝|あさ}ごはん szó szerint „reggeli rizs". Ma persze sokan pirítóst és kávét reggeliznek.'
      },
      {
        title: 'A tanítás után kezdődik a nap másik fele',
        text: 'A japán diákok az órák után sokáig az iskolában maradnak: délután zajlanak a szakkörök és a sportfoglalkozások (<b>{部活|ぶかつ}</b>), és szinte mindenki tagja valamelyiknek. A boltok később nyitnak és később zárnak, mint nálunk, a sarki kisboltok (<b>コンビニ</b>) pedig éjjel-nappal nyitva vannak.'
      }
    ],
    quiz: [
      { q: '„Könyvet olvasok." Melyik partikula hiányzik?', jp: '{本|ほん}＿{読|よ}みます。', a: 'を', wrong: ['が', 'に', 'で'], why: 'A cselekvés tárgyát a を jelöli.' },
      { q: '„A könyvtárban tanulok." Melyik partikula hiányzik?', jp: '{図書館|としょかん}＿{勉強|べんきょう}します。', a: 'で', wrong: ['に', 'へ', 'を'], why: 'A cselekvés helye で; a に a létezés helye lenne.' },
      { q: '„Megyek táskát venni." Mi hiányzik?', jp: 'かばんを＿{行|い}きます。', a: '{買|か}いに', wrong: ['{買|か}いますに', '{買|か}いで', '{買|か}いを'], why: 'A cél: az ige ます nélküli alakja + に.' },
      { q: 'Mit jelent: いっしょに{映画|えいが}を{見|み}ませんか。', a: 'Nem néznénk meg együtt egy filmet?', wrong: ['Nem nézek filmet.', 'Együtt néztünk filmet.', 'Nem láttad a filmet?'], why: 'A 〜ませんか meghívás, nem tagadás.' },
      { q: 'Hogyan mondod: „Találkozzunk az állomáson!"', a: '{駅|えき}で{会|あ}いましょう。', wrong: ['{駅|えき}に{会|あ}いません。', '{駅|えき}を{会|あ}います。', '{駅|えき}で{会|あ}いましたか。'], why: 'Közös cselekvésre a 〜ましょう szólít; a hely で.' },
      { q: '„Mit iszol?" Melyik partikula hiányzik?', jp: '{何|なに}＿{飲|の}みますか。', a: 'を', wrong: ['で', 'に', 'へ'], why: 'A cselekvés tárgya を; a kérdőszó is megkapja.' },
      { q: 'Melyik mondat jelenti: „A könyvtárban vagyok."', a: '{図書館|としょかん}にいます。', wrong: ['{図書館|としょかん}でいます。', '{図書館|としょかん}をいます。', '{図書館|としょかん}へいます。'], why: 'A létezés helye に; a で a cselekvés helye.' },
      { q: 'Válasz a meghívásra: „Jó, igyunk!"', a: 'ええ、{飲|の}みましょう。', wrong: ['ええ、{飲|の}みません。', 'いいえ、{飲|の}みましょう。', 'ええ、{飲|の}みましたか。'], why: 'Beleegyezés: ええ + 〜ましょう.' },
      { q: '„A parkba megyek sétálni." Melyik partikula hiányzik?', jp: '{公園|こうえん}へ{散歩|さんぽ}＿{行|い}きます。', a: 'に', wrong: ['を', 'が', 'と'], why: 'A mozgás célja: főnév vagy ます nélküli ige + に.' },
      { q: 'Mit jelent: うちで{晩|ばん}ごはんを{食|た}べます。', a: 'Otthon vacsorázom.', wrong: ['Hazamegyek vacsorázni.', 'Otthon van a vacsora.', 'Nem vacsorázom otthon.'], why: 'で = a cselekvés helye, を = a tárgy.' },
      { q: '„A kávézóban kávét iszom." Melyik két partikula hiányzik?', jp: '{喫茶店|きっさてん}＿コーヒー＿{飲|の}みます。', a: 'で … を', wrong: ['に … を', 'で … が', 'を … で'], why: 'A cselekvés helye で, a tárgy を.' },
      { q: 'Melyik mondat helyes?', a: '{図書館|としょかん}にいます。', wrong: ['{図書館|としょかん}でいます。', '{図書館|としょかん}をいます。', '{図書館|としょかん}といます。'], why: 'Az います létezést fejez ki: a helyét に jelöli.' },
      { q: 'Hogy mondod: „megyek filmet nézni"?', a: '{映画|えいが}を{見|み}に{行|い}きます。', wrong: ['{映画|えいが}を{見|み}ますに{行|い}きます。', '{映画|えいが}を{見|み}で{行|い}きます。', '{映画|えいが}に{見|み}を{行|い}きます。'], why: 'A cél: a ます nélküli tő + に, utána a mozgásige.' },
      { q: 'A barátod azt mondja: いっしょに{行|い}きませんか。 El akarod fogadni. Mit felelsz?', a: 'ええ、{行|い}きましょう。', wrong: ['いいえ、{行|い}きません。', 'ええ、{行|い}きませんか。', 'はい、{行|い}きました。'], why: 'A meghívásra a beleegyező válasz a 〜ましょう.' },
      {
        q: 'Udvariasan el akarsz hárítani egy holnapi meghívást. Melyik a legjobb?',
        a: 'すみません、{明日|あした}はちょっと…。',
        wrong: ['いいえ、{行|い}きません。', '{明日|あした}は{行|い}きましょう。', 'そうしましょう。'],
        why: 'A japán nem mondja ki a nemet: a ちょっと… félbehagyott mondata az udvarias elhárítás.'
      },
      { q: 'Mi a {食|た}べます szótári alakja?', a: '{食|た}べる', wrong: ['{食|た}ぶ', '{食|た}べく', '{食|た}べす'], why: 'II. csoportú ige: a ます helyére る kerül.' },
      { q: 'Mi a {書|か}きます szótári alakja?', a: '{書|か}く', wrong: ['{書|か}きる', '{書|か}る', '{書|か}きう'], why: 'I. csoportú ige: a ます előtti i hangból (き) u hang (く) lesz.' },
      { q: 'Melyik ige tartozik a III. (rendhagyó) csoportba?', a: 'します', wrong: ['{話|はな}します', '{食|た}べます', '{読|よ}みます'], why: 'A III. csoport két igéje a きます és a します; a {話|はな}します I. csoportú.' },
      { q: '„Japánt tanulok." Melyik mondat HIBÁS?', a: '{日本語|にほんご}を{勉強|べんきょう}をします。', wrong: ['{日本語|にほんご}を{勉強|べんきょう}します。', '{日本語|にほんご}の{勉強|べんきょう}をします。', '{毎日|まいにち}{日本語|にほんご}を{勉強|べんきょう}します。'], why: 'Egy ige mellett csak egy を állhat.' },
      { q: 'Mit NEM szabad csinálni a japán fürdőkádban?', a: 'szappannal mosakodni', wrong: ['forró vízben ülni', 'pihenni', 'csendben lenni'], why: 'A kád vizét többen használják: előtte, a kádon kívül kell megmosakodni.' }
    ]
  },

  /* ── 7. lecke ─────────────────────────────────────── */
  {
    id: 'l7', no: 7, book: 'Dekiru 1', title: 'Mit szeretsz?',
    lead: 'Elmondod, mit szeretsz és mit nem, megindokolod, udvariasan visszautasítasz egy meghívást, és megmondod, milyen gyakran csinálsz valamit.',
    cando: [
      'Beszélsz arról, mit szeretsz, mit nem, és miben vagy jó.',
      'Megkérdezed és megmondod, miért.',
      'Udvariasan visszautasítasz egy meghívást, okkal együtt.',
      'Elmondod, milyen gyakran csinálsz valamit.'
    ],
    intro: [
      'A „szeretem" magyarul ige. Japánul <b>melléknév</b>: a <b>{好|す}き</b> annyit tesz, „kedvelt", a <b>きらい</b> annyit, „ellenszenves". A japán mondat ezért nem azt mondja, hogy „én szeretem a zenét", hanem azt: „ami engem illet, a zene kedvelt". Ebből következik a lecke legfontosabb szabálya: amit szeretsz, az nem tárgy (を), hanem alany (<b>が</b>).',
      'Ugyanez a „は … が" szerkezet tér vissza a képességnél ({上手|じょうず}, {下手|へた}), a megértésnél (わかります), és később még sok helyen. Érdemes most jól megérteni: a は megadja, <b>kiről</b> beszélünk, a が megnevezi, <b>mire</b> vonatkozik az állítás.',
      'A lecke másik témája az indoklás és a szembeállítás: a <b>から</b> (mert) és a <b>が</b> (de). Mindkettő a tagmondat <b>végén</b> áll, nem az elején, mint a magyar megfelelője: a japán előbb mondja az okot, aztán azt, hogy „mert".'
    ],
    dialogue: {
      title: 'Szakkör-választás',
      scene: 'Az iskolában szakkörök toboroznak. Annát megszólítja a teniszkör egyik tagja, majd Kennel beszélget arról, ki mit szeret.',
      lines: [
        { who: 'Teniszkör', jp: 'すみません、テニスをしませんか。{土曜日|どようび}、{時間|じかん}がありませんか。', romaji: 'Sumimasen, tenisu o shimasen ka. Doyōbi, jikan ga arimasen ka.', hu: 'Elnézést, nem teniszeznél velünk? Szombaton nem érsz rá?' },
        { who: 'Anna', jp: 'すみません、{土曜日|どようび}はちょっと…。{友|とも}だちに{会|あ}いますから。', romaji: 'Sumimasen, doyōbi wa chotto… Tomodachi ni aimasu kara.', hu: 'Ne haragudj, szombaton nem igazán… A barátommal találkozom.' },
        { who: 'Teniszkör', jp: 'そうですか。{残念|ざんねん}ですね。', romaji: 'Sō desu ka. Zannen desu ne.', hu: 'Értem. Kár.' },
        { who: 'Ken', jp: 'アンナさんはスポーツが{好|す}きですか。', romaji: 'Anna-san wa supōtsu ga suki desu ka.', hu: 'Anna, szereted a sportot?' },
        { who: 'Anna', jp: 'スポーツはあまり{好|す}きじゃありません。でも、{音楽|おんがく}は{大好|だいす}きです。', romaji: 'Supōtsu wa amari suki ja arimasen. Demo, ongaku wa daisuki desu.', hu: 'A sportot nem nagyon szeretem. A zenét viszont imádom.' },
        { who: 'Ken', jp: 'どんな{音楽|おんがく}が{好|す}きですか。', romaji: 'Donna ongaku ga suki desu ka.', hu: 'Milyen zenét szeretsz?' },
        { who: 'Anna', jp: 'ジャズが{好|す}きです。よくコンサートへ{行|い}きます。ケンさんは？', romaji: 'Jazu ga suki desu. Yoku konsāto e ikimasu. Ken-san wa?', hu: 'A dzsesszt szeretem. Gyakran járok koncertre. És te?' },
        { who: 'Ken', jp: 'わたしは{剣道|けんどう}が{好|す}きです。{毎朝|まいあさ}{練習|れんしゅう}します。', romaji: 'Watashi wa kendō ga suki desu. Maiasa renshū shimasu.', hu: 'Én a kendót szeretem. Minden reggel edzek.' },
        { who: 'Anna', jp: 'え、{毎朝|まいあさ}ですか。どうしてですか。', romaji: 'E, maiasa desu ka. Dōshite desu ka.', hu: 'Hogy, minden reggel? Miért?' },
        { who: 'Ken', jp: '{来月|らいげつ}{試合|しあい}がありますから。アンナさんは{剣道|けんどう}を{知|し}っていますか。', romaji: 'Raigetsu shiai ga arimasu kara. Anna-san wa kendō o shitte imasu ka.', hu: 'Mert jövő hónapban versenyem lesz. Ismered a kendót, Anna?' },
        { who: 'Anna', jp: 'いいえ、{知|し}りません。でも、{見|み}たいです。', romaji: 'Iie, shirimasen. Demo, mitai desu.', hu: 'Nem, nem ismerem. De szívesen megnézném.' }
      ],
      notes: [
        'Anna a visszautasításkor <b>nem mondja ki a nemet</b>. Megnevezi a napot ({土曜日|どようび}は), félbehagyja a mondatot (ちょっと…), és odatesz egy okot から-val. Ez a japán visszautasítás teljes receptje.',
        'A スポーツ<b>は</b>あまり{好|す}きじゃありません mondatban a が helyén は áll: tagadásban és szembeállításban a は kiemeli, miről van szó („a sportot <i>éppen</i> nem").',
        'A <b>でも</b> („de, viszont") mondat <b>elején</b> áll, és új mondatot kezd; a tagmondat végi が ugyanezt fejezi ki egy mondaton belül.',
        'A <b>{知|し}っています</b> (tudom, ismerem) tagadása nem „{知|し}っていません", hanem <b>{知|し}りません</b>. A tudás állapot, ezért 〜ています alakban áll; a nem-tudás egyszerű tény.',
        'A <b>{残念|ざんねん}ですね</b> („de kár") a csalódás udvarias kifejezése: így veszed tudomásul, ha valaki nemet mond.'
      ]
    },
    points: [
      {
        title: '〜が 好きです', sub: 'szeretem, nem szeretem',
        pattern: 'A は B が {好|す}きです · きらいです',
        body: 'A <b>{好|す}き</b> és a <b>きらい</b> japánul melléknév, nem ige: „számomra a zene kedvelt". Ezért amit szeretsz, az <b>が</b>-t kap, nem を-t. Tagadás: {好|す}きじゃありません. A きらい erős szó; finomabb így: あまり {好|す}きじゃありません.',
        more: [
          'A mondat szerkezete: <b>(kinek) は + (mi) が + {好|す}きです</b>. A は-s rész a téma (akiről szó van), a が-s rész az, amire az érzés vonatkozik. Ha magadról beszélsz, a わたしは elhagyható.',
          'A {好|す}き és a きらい <b>な-melléknév</b>, ezért úgy tagadod, mint a főnevet: {好|す}き<b>じゃ ありません</b>. Jelzőként な-val áll: {好|す}き<b>な</b>{音楽|おんがく} (a kedvenc zeném).',
          'Fokozatok: {大好|だいす}き (imádom) → {好|す}き → あまり{好|す}きじゃありません (nem nagyon szeretem) → きらい (nem szeretem) → {大|だい}きらい (utálom). A きらい nyers szó: ételre, dologra mondhatod, emberre ritkán.'
        ],
        tables: [
          {
            caption: 'Mennyire szereted?',
            head: ['Japánul', 'Magyarul'],
            rows: [
              ['{大好|だいす}きです', 'imádom'],
              ['{好|す}きです', 'szeretem'],
              ['あまり{好|す}きじゃありません', 'nem nagyon szeretem'],
              ['きらいです', 'nem szeretem'],
              ['{大|だい}きらいです', 'utálom']
            ]
          }
        ],
        examples: [
          { jp: 'わたしは{音楽|おんがく}が{好|す}きです。', romaji: 'Watashi wa ongaku ga suki desu.', hu: 'Szeretem a zenét.' },
          { jp: '{魚|さかな}はあまり{好|す}きじゃありません。', romaji: 'Sakana wa amari suki ja arimasen.', hu: 'A halat nem nagyon szeretem.' },
          { jp: 'どんなスポーツが{好|す}きですか。', romaji: 'Donna supōtsu ga suki desu ka.', hu: 'Milyen sportot szeretsz?' },
          { jp: '{日本|にほん}の{食|た}べ{物|もの}で{何|なに}が{好|す}きですか。', romaji: 'Nihon no tabemono de nani ga suki desu ka.', hu: 'Mit szeretsz a japán ételek közül?' },
          { jp: 'すしが{大好|だいす}きです。', romaji: 'Sushi ga daisuki desu.', hu: 'Imádom a szusit.' },
          { jp: '{好|す}きな{食|た}べ{物|もの}は{何|なに}ですか。', romaji: 'Suki na tabemono wa nan desu ka.', hu: 'Mi a kedvenc ételed?' }
        ],
        notes: [
          'Ha egy csoporton belül kérdezel, a csoportot <b>で</b> jelöli: スポーツ<b>で</b>{何|なに}が{好|す}きですか (a sportok közül mit szeretsz?).',
          'A <b>どんな</b> + főnév fajtára kérdez: どんな{音楽|おんがく}が{好|す}きですか (milyen zenét szeretsz?).',
          'Más emberről is mondhatod: {田中|たなか}さんは{魚|さかな}が{好|す}きです. A は-s rész mindig az, aki érez.'
        ],
        mistakes: [
          { bad: '{音楽|おんがく}を{好|す}きです。', good: '{音楽|おんがく}が{好|す}きです。', why: 'A {好|す}き melléknév, nem tárgyas ige: amit szeretsz, az が-t kap.' },
          { bad: '{好|す}くないです。', good: '{好|す}きじゃありません。', why: 'A {好|す}き な-melléknév: úgy tagadod, mint a főnevet.' }
        ]
      },
      {
        title: '〜が {上手|じょうず}です・わかります', sub: 'jó benne, érti',
        pattern: 'A は B が {上手|じょうず}です · {下手|へた}です · わかります',
        body: 'A {好|す}き mintájára működik még néhány fontos szó: mindegyik mellett <b>が</b> jelöli azt, amire vonatkozik. <b>{上手|じょうず}</b> = ügyes, jól megy neki; <b>{下手|へた}</b> = ügyetlen, nem megy neki; <b>わかります</b> = érti.',
        more: [
          'A <b>{上手|じょうず}</b> dicséret, ezért <b>másra</b> mondjuk. A saját ügyességedről szerényebb szó illik: <b>{得意|とくい}</b> (erősségem). Ha azt mondják neked, hogy {日本語|にほんご}が{上手|じょうず}ですね, az illendő válasz a szabadkozás: いいえ、まだまだです (ó, még messze vagyok attól).',
          'A <b>わかります</b> mellett a megértés mértékét határozószó adja meg: よく (jól), {少|すこ}し (egy kicsit), あまり + tagadás (nem nagyon), ぜんぜん + tagadás (egyáltalán nem).'
        ],
        tables: [
          {
            caption: 'が-t kérő szavak',
            head: ['Szó', 'Jelentés', 'Példa'],
            rows: [
              ['すき', 'szereti', 'おんがく<b>が</b> すきです'],
              ['きらい', 'nem szereti', 'さかな<b>が</b> きらいです'],
              ['じょうず', 'ügyes benne', 'うた<b>が</b> じょうずです'],
              ['へた', 'nem megy neki', 'え<b>が</b> へたです'],
              ['わかります', 'érti', 'えいご<b>が</b> わかります']
            ]
          }
        ],
        examples: [
          { jp: '{田中|たなか}さんは{歌|うた}が{上手|じょうず}です。', romaji: 'Tanaka-san wa uta ga jōzu desu.', hu: 'Tanaka jól énekel.' },
          { jp: 'わたしは{絵|え}が{下手|へた}です。', romaji: 'Watashi wa e ga heta desu.', hu: 'Nem megy nekem a rajzolás.' },
          { jp: '{日本語|にほんご}が{少|すこ}しわかります。', romaji: 'Nihongo ga sukoshi wakarimasu.', hu: 'Egy kicsit értek japánul.' },
          { jp: '{英語|えいご}はぜんぜんわかりません。', romaji: 'Eigo wa zenzen wakarimasen.', hu: 'Angolul egyáltalán nem értek.' }
        ],
        notes: [
          'A <b>{知|し}っています</b> (tudom, ismerem) viszont tárgyas: {剣道|けんどう}<b>を</b>{知|し}っていますか. Tagadása: <b>{知|し}りません</b>.'
        ],
        mistakes: [
          { bad: 'わたしは{日本語|にほんご}が{上手|じょうず}です。', good: 'わたしは{日本語|にほんご}が{少|すこ}しわかります。', why: 'A {上手|じょうず} dicséret: magadra mondva dicsekvésnek hat.' }
        ]
      },
      {
        title: 'どうして・〜から', sub: 'miért? mert…',
        pattern: 'どうしてですか。 — 〜から。',
        body: 'Az okra a <b>どうして</b> kérdez. A válaszban az okot kifejező mondat végére <b>から</b> kerül: előbb az ok, utána a „mert". Két tagmondatot is összeköt: ok + から、következmény.',
        more: [
          'A <b>から</b> azt a tagmondatot zárja, amely az <b>okot</b> mondja meg. A sorrend ezért fordított a magyarhoz képest: <b>ok + から、következmény</b>. Magyarul: „mivel…, ezért…".',
          'A から előtt udvarias alak áll (〜ます, 〜です), és a mondat végén is. A következményt el is hagyhatod, ha a helyzetből világos: {時間|じかん}がありませんから。',
          'A <b>どうして</b> kérdésre mindig から-val felelsz. A どうしてですか önálló kérdés: „miért (van ez így)?". Lazább párja a なんで, hivatalosabb a なぜ.'
        ],
        tables: [
          {
            caption: 'Két から',
            head: ['', 'Mi után áll?', 'Jelentés', 'Példa'],
            rows: [
              ['kiindulópont', 'főnév után', '-tól, -ból', 'くじ<b>から</b> · うち<b>から</b>'],
              ['ok', 'mondat után', 'mert, mivel', 'あめです<b>から</b>']
            ]
          }
        ],
        examples: [
          { jp: 'どうして{行|い}きませんか。', romaji: 'Dōshite ikimasen ka.', hu: 'Miért nem mész el?' },
          { jp: '{時間|じかん}がありませんから。', romaji: 'Jikan ga arimasen kara.', hu: 'Mert nincs időm.' },
          { jp: '{日本|にほん}が{好|す}きですから、{日本語|にほんご}を{勉強|べんきょう}します。', romaji: 'Nihon ga suki desu kara, nihongo o benkyō shimasu.', hu: 'Szeretem Japánt, ezért tanulok japánul.' },
          { jp: '{明日|あした}テストがありますから、{今晩|こんばん}{勉強|べんきょう}します。', romaji: 'Ashita tesuto ga arimasu kara, konban benkyō shimasu.', hu: 'Holnap dolgozatot írunk, ezért ma este tanulok.' },
          { jp: '{雨|あめ}ですから、{行|い}きません。', romaji: 'Ame desu kara, ikimasen.', hu: 'Esik az eső, ezért nem megyek.' }
        ],
        notes: [
          'Az ok után álló から-t mindig a <b>mondat</b> végéhez tedd, ne az elejére: a japánban nincs mondatkezdő „mert".',
          'Visszautasításkor az ok önmagában, félbehagyva is elég: {友|とも}だちに{会|あ}いますから… (mert a barátommal találkozom…).'
        ],
        mistakes: [
          { bad: 'から{時間|じかん}がありません、{行|い}きません。', good: '{時間|じかん}がありませんから、{行|い}きません。', why: 'A から az okot kifejező tagmondat <b>végén</b> áll.' }
        ],
        tip: 'Ez a から nem ugyanaz, mint a „-tól" ({九時|くじ}から): az főnév után áll, ez mondat után.'
      },
      {
        title: '〜は…が、〜は…', sub: 'szembeállítás',
        pattern: 'A は 〜が、B は 〜',
        body: 'A tagmondat végi <b>が</b> „de"-t jelent. Ha két dolgot szembeállítasz, mindkettő <b>は</b>-t kap, akkor is, ha amúgy が vagy を járna neki.',
        more: [
          'A tagmondat végi <b>が</b> ellentétet fejez ki („de, viszont"), és két tagmondatot köt össze. Előtte udvarias alak áll: {好|す}きです<b>が</b>、…',
          'Ha két dolgot <b>szembeállítasz</b>, mindkettőt は emeli ki — akkor is, ha egyébként が vagy を járna neki. Ez a は „kontrasztív": azt mondja, „ez igen, az viszont nem".',
          'Ez a が nem ugyanaz, mint az alanyt jelölő が. Az alany-が egy <b>főnév</b> után áll, az ellentétes が egy <b>tagmondat</b> végén.'
        ],
        tables: [
          {
            caption: 'A は átveszi a が és a を helyét',
            head: ['Sima mondat', 'Szembeállítva'],
            rows: [
              ['にく<b>が</b> すきです。', 'にく<b>は</b> すきですが、さかな<b>は</b> すきじゃありません。'],
              ['コーヒー<b>を</b> のみます。', 'コーヒー<b>は</b> のみますが、おちゃ<b>は</b> のみません。']
            ]
          }
        ],
        examples: [
          { jp: '{肉|にく}は{好|す}きですが、{魚|さかな}は{好|す}きじゃありません。', romaji: 'Niku wa suki desu ga, sakana wa suki ja arimasen.', hu: 'A húst szeretem, de a halat nem.' },
          { jp: 'コーヒーは{飲|の}みますが、お{茶|ちゃ}は{飲|の}みません。', romaji: 'Kōhī wa nomimasu ga, ocha wa nomimasen.', hu: 'Kávét iszom, de teát nem.' },
          { jp: '{日本語|にほんご}は{難|むずか}しいですが、おもしろいです。', romaji: 'Nihongo wa muzukashii desu ga, omoshiroi desu.', hu: 'A japán nehéz, de érdekes.' },
          { jp: '{土曜日|どようび}は{行|い}きますが、{日曜日|にちようび}は{行|い}きません。', romaji: 'Doyōbi wa ikimasu ga, nichiyōbi wa ikimasen.', hu: 'Szombaton megyek, de vasárnap nem.' }
        ],
        notes: [
          'Mondat elején a „de" a <b>でも</b>: {肉|にく}は{好|す}きです。でも、{魚|さかな}は{好|す}きじゃありません。',
          'A が puhíthat is: すみませんが、… (elnézést, de…) — itt nincs valódi ellentét, csak felvezeti a kérést.'
        ]
      },
      {
        title: 'よく・ときどき・あまり・ぜんぜん', sub: 'milyen gyakran',
        pattern: 'よく / ときどき + 〜ます · あまり / ぜんぜん + 〜ません',
        body: 'A gyakoriságot jelölő szó az ige elé kerül. A <b>よく</b> (gyakran) és a <b>ときどき</b> (néha) állító igével áll; az <b>あまり</b> (nem nagyon) és a <b>ぜんぜん</b> (egyáltalán nem) mindig tagadóval.',
        more: [
          'A gyakoriság szavai két csoportba tartoznak, és a csoport megszabja az ige alakját. <b>いつも, よく, ときどき</b> → állító ige. <b>あまり, ぜんぜん</b> → <b>kötelezően tagadó</b> ige.',
          'Az あまり és a ぜんぜん önmagában nem tagad: a tagadást az ige hordozza. Az あまり + tagadás = „nem nagyon", a ぜんぜん + tagadás = „egyáltalán nem".'
        ],
        tables: [
          {
            caption: 'Milyen gyakran?',
            head: ['Szó', 'Jelentés', 'Az ige'],
            rows: [
              ['いつも', 'mindig', 'állító'],
              ['よく', 'gyakran', 'állító'],
              ['ときどき', 'néha', 'állító'],
              ['あまり', 'nem nagyon', '<b>tagadó</b>'],
              ['ぜんぜん', 'egyáltalán nem', '<b>tagadó</b>']
            ]
          }
        ],
        examples: [
          { jp: 'よく{映画|えいが}を{見|み}ます。', romaji: 'Yoku eiga o mimasu.', hu: 'Gyakran nézek filmet.' },
          { jp: 'ときどき{料理|りょうり}をします。', romaji: 'Tokidoki ryōri o shimasu.', hu: 'Néha főzök.' },
          { jp: 'テレビはあまり{見|み}ません。', romaji: 'Terebi wa amari mimasen.', hu: 'Tévét nem nagyon nézek.' },
          { jp: 'お{酒|さけ}はぜんぜん{飲|の}みません。', romaji: 'Osake wa zenzen nomimasen.', hu: 'Alkoholt egyáltalán nem iszom.' },
          { jp: 'いつも{七時|しちじ}に{起|お}きます。', romaji: 'Itsumo shichiji ni okimasu.', hu: 'Mindig hétkor kelek.' },
          { jp: 'よくスポーツをしますか。', romaji: 'Yoku supōtsu o shimasu ka.', hu: 'Gyakran sportolsz?' }
        ],
        notes: [
          'Ugyanezek a szavak mértéket is kifejeznek melléknév előtt: あまり{好|す}きじゃありません (nem nagyon szeretem). A 8. leckében erről bővebben lesz szó.',
          'Az 5. leckében tanult pontos gyakoriság ({週|しゅう}に{二回|にかい}) és ezek a szavak kiegészítik egymást: az egyik számot mond, a másik benyomást.'
        ],
        mistakes: [
          { bad: 'テレビはあまり{見|み}ます。', good: 'テレビはあまり{見|み}ません。', why: 'Az あまり mellett az ige mindig tagadó.' },
          { bad: 'ぜんぜん{好|す}きです。', good: 'ぜんぜん{好|す}きじゃありません。', why: 'A ぜんぜん is tagadó alakot kér.' }
        ]
      }
    ],
    phrases: [
      { jp: 'すみません、{今日|きょう}はちょっと…。', romaji: 'Sumimasen, kyō wa chotto…', hu: 'Ne haragudj, ma nem igazán…', note: 'A visszautasítás alapmondata: a befejezést a másik kitalálja.' },
      { jp: '{残念|ざんねん}ですね。', romaji: 'Zannen desu ne.', hu: 'De kár!' },
      { jp: 'また{今度|こんど}お{願|ねが}いします。', romaji: 'Mata kondo onegai shimasu.', hu: 'Majd legközelebb, kérlek.', note: 'Így jelzed, hogy máskor szívesen mennél.' },
      { jp: 'どうしてですか。', romaji: 'Dōshite desu ka.', hu: 'Miért?' },
      { jp: 'いっしょにがんばりましょう。', romaji: 'Issho ni ganbarimashō.', hu: 'Igyekezzünk együtt!' },
      { jp: 'はじめてですが、{大丈夫|だいじょうぶ}ですか。', romaji: 'Hajimete desu ga, daijōbu desu ka.', hu: 'Most csinálom először; nem baj?', note: 'A {大丈夫|だいじょうぶ} = „rendben van, nem gond".' },
      { jp: '{失礼|しつれい}します。', romaji: 'Shitsurei shimasu.', hu: 'Elnézést. (belépve vagy távozva)', note: 'Tanári szobába, irodába belépve és onnan kijövet is ezt mondod.' },
      { jp: 'いいですよ。', romaji: 'Ii desu yo.', hu: 'Persze, rendben.' }
    ],
    words: [
      {
        title: 'Hobbik, szakkörök',
        items: [
          { jp: '{音楽|おんがく}', romaji: 'ongaku', hu: 'zene' },
          { jp: '{映画|えいが}', romaji: 'eiga', hu: 'film' },
          { jp: '{漫画|まんが}', romaji: 'manga', hu: 'manga, képregény' },
          { jp: 'アニメ', romaji: 'anime', hu: 'anime' },
          { jp: '{歌|うた}', romaji: 'uta', hu: 'ének, dal' },
          { jp: '{絵|え}', romaji: 'e', hu: 'kép, festmény' },
          { jp: '{料理|りょうり}', romaji: 'ryōri', hu: 'főzés' },
          { jp: '{旅行|りょこう}', romaji: 'ryokō', hu: 'utazás' },
          { jp: '{練習|れんしゅう}', romaji: 'renshū', hu: 'gyakorlás, edzés' },
          { jp: '{試合|しあい}', romaji: 'shiai', hu: 'mérkőzés, verseny' }
        ]
      },
      {
        title: 'Sportok',
        note: 'A dzsúdó, a kendó, a karate és az aikidó Japánban született.',
        items: [
          { jp: 'サッカー', romaji: 'sakkā', hu: 'foci' },
          { jp: 'テニス', romaji: 'tenisu', hu: 'tenisz' },
          { jp: '{野球|やきゅう}', romaji: 'yakyū', hu: 'baseball' },
          { jp: '{水泳|すいえい}', romaji: 'suiei', hu: 'úszás' },
          { jp: '{柔道|じゅうどう}', romaji: 'jūdō', hu: 'dzsúdó' },
          { jp: '{剣道|けんどう}', romaji: 'kendō', hu: 'kendó' },
          { jp: '{空手|からて}', romaji: 'karate', hu: 'karate' },
          { jp: '{合気道|あいきどう}', romaji: 'aikidō', hu: 'aikidó' }
        ]
      },
      {
        title: 'Ételek, italok',
        items: [
          { jp: '{肉|にく}', romaji: 'niku', hu: 'hús' },
          { jp: '{魚|さかな}', romaji: 'sakana', hu: 'hal' },
          { jp: '{野菜|やさい}', romaji: 'yasai', hu: 'zöldség' },
          { jp: '{果物|くだもの}', romaji: 'kudamono', hu: 'gyümölcs' },
          { jp: 'お{酒|さけ}', romaji: 'o-sake', hu: 'alkohol; szaké' },
          { jp: '{甘|あま}いもの', romaji: 'amai mono', hu: 'édesség' }
        ]
      }
    ],
    culture: [
      {
        title: 'Idősebb és fiatalabb: {先輩|せんぱい} és {後輩|こうはい}',
        text: 'A japán iskolában, szakkörben, munkahelyen mindenkinek tudnia kell, ki érkezett előbb. Aki akár csak egy évvel fölötted jár, az a <b>{先輩|せんぱい}</b>-od: tisztelettel szólsz hozzá, köszönéskor meghajolsz előtte, és ő cserébe tanít, segít. Aki utánad jött, az a <b>{後輩|こうはい}</b>-od. Ez a viszony a felső tagozatban kezdődik, a szakkörökben a legerősebb, és sokszor egy életen át megmarad.'
      },
      {
        title: 'Kör vagy klub?',
        text: 'Az egyetemeken kétféle közösség működik. A <b>サークル</b> (kör) lazább, baráti társaság: a hangsúly az együttléten van. A <b>クラブ</b> vagy <b>{部|ぶ}</b> (klub, szakosztály) komolyabb: rendszeres, kemény edzések, versenyek, szigorú rend. Egy sportklubban a heti hat edzés sem ritka; aki belép, az a szabadidejének nagy részét odaadja.'
      },
      {
        title: 'A nem, amit nem mondanak ki',
        text: 'A japán beszélgetésben a nyílt visszautasítás udvariatlan, mert kellemetlen helyzetbe hozza a másikat. Ezért a „nem" helyett <b>jelzéseket</b> használnak: ちょっと… (kicsit…), {考|かんが}えておきます (majd meggondolom), {難|むずか}しいですね (hát, ez nehéz). Ha ezeket hallod, az nemet jelent, és nem illik tovább erősködni.'
      }
    ],
    quiz: [
      { q: '„Szeretem a zenét." Melyik partikula hiányzik?', jp: '{音楽|おんがく}＿{好|す}きです。', a: 'が', wrong: ['を', 'に', 'で'], why: 'A {好|す}き melléknév, ezért a tárgya が-t kap.' },
      { q: '„Mert nincs időm." Mi hiányzik?', jp: '{時間|じかん}がありません＿。', a: 'から', wrong: ['まで', 'か', 'も'], why: 'Az ok mondata után から áll.' },
      { q: 'Melyik mondat helyes?', a: 'テレビはあまり{見|み}ません。', wrong: ['テレビはあまり{見|み}ます。', 'テレビはぜんぜん{見|み}ます。', 'テレビはよく{見|み}ませんです。'], why: 'Az あまり és a ぜんぜん mindig tagadó igével jár.' },
      { q: '„A húst szeretem, de a halat nem." Mi hiányzik?', jp: '{肉|にく}は{好|す}きです＿、{魚|さかな}は{好|す}きじゃありません。', a: 'が', wrong: ['から', 'と', 'も'], why: 'A tagmondat végi が = „de".' },
      { q: 'Mit jelent: ときどき{料理|りょうり}をします。', a: 'Néha főzök.', wrong: ['Gyakran főzök.', 'Nem nagyon főzök.', 'Soha nem főzök.'], why: 'ときどき = néha.' },
      { q: '„Milyen sportot szeretsz?" Mi hiányzik?', jp: '＿スポーツが{好|す}きですか。', a: 'どんな', wrong: ['どうして', 'だれ', 'どこ'], why: 'Főnév előtt „milyen": どんな.' },
      { q: '„Miért nem mész el?" Mi hiányzik?', jp: '＿{行|い}きませんか。', a: 'どうして', wrong: ['どんな', 'だれの', 'なんの'], why: 'Az okra どうして kérdez.' },
      { q: 'Melyik mondat jelenti: „Alkoholt egyáltalán nem iszom."', a: 'お{酒|さけ}はぜんぜん{飲|の}みません。', wrong: ['お{酒|さけ}はぜんぜん{飲|の}みます。', 'お{酒|さけ}はよく{飲|の}みます。', 'お{酒|さけ}はときどき{飲|の}みます。'], why: 'ぜんぜん + tagadó ige = egyáltalán nem.' },
      { q: '„A halat nem nagyon szeretem." Mi hiányzik?', jp: '{魚|さかな}は＿{好|す}きじゃありません。', a: 'あまり', wrong: ['よく', 'ときどき', 'どんな'], why: 'Tagadással az あまり jelenti: „nem nagyon".' },
      {
        q: 'Mit jelent: {日本|にほん}が{好|す}きですから、{日本語|にほんご}を{勉強|べんきょう}します。',
        a: 'Szeretem Japánt, ezért tanulok japánul.',
        wrong: [
          'Japánul tanulok, de nem szeretem Japánt.',
          'Japánból jöttem, és japánul tanulok.',
          'Szeretnék Japánban tanulni.'
        ],
        why: 'ok + から、következmény: „mert…, ezért…".'
      },
      { q: 'Melyik mondatban jók a partikulák?', a: 'わたしは{音楽|おんがく}が{好|す}きです。', wrong: ['わたしは{音楽|おんがく}を{好|す}きです。', 'わたしが{音楽|おんがく}は{好|す}きます。', 'わたしは{音楽|おんがく}に{好|す}きです。'], why: 'A {好|す}き melléknév: amit szeretsz, が-t kap, és a mondatot です zárja.' },
      { q: 'Hogy mondod: „a kedvenc ételem"?', a: '{好|す}きな{食|た}べ{物|もの}', wrong: ['{好|す}きい{食|た}べ{物|もの}', '{好|す}きの{食|た}べ{物|もの}', '{好|す}き{食|た}べ{物|もの}'], why: 'A {好|す}き な-melléknév: jelzőként な-val kapcsolódik a főnévhez.' },
      {
        q: '„Esik, ezért nem megyek." Hol áll a から?',
        a: '{雨|あめ}ですから、{行|い}きません。',
        wrong: ['から{雨|あめ}です、{行|い}きません。', '{雨|あめ}です、{行|い}きませんから。', '{雨|あめ}から、{行|い}きませんです。'],
        why: 'A から az okot kifejező tagmondat végén áll, a következmény utána jön.'
      },
      { q: 'Azt mondják neked: {日本語|にほんご}が{上手|じょうず}ですね。 Mi az illendő válasz?', a: 'いいえ、まだまだです。', wrong: ['はい、{上手|じょうず}です。', 'はい、{好|す}きです。', 'いいえ、きらいです。'], why: 'A dicséretet szabadkozással fogadjuk: „ó, még messze vagyok attól".' },
      { q: '„Egy kicsit értek japánul." Melyik partikula hiányzik?', jp: '{日本語|にほんご}＿{少|すこ}しわかります。', a: 'が', wrong: ['を', 'に', 'で'], why: 'A わかります mellett az, amit értesz, が-t kap.' },
      { q: 'Mi a {知|し}っています tagadása?', a: '{知|し}りません', wrong: ['{知|し}っていません', '{知|し}りないです', '{知|し}くないです'], why: 'A tudás állapot (〜ています), a nem-tudás egyszerű tény: {知|し}りません.' },
      {
        q: 'Szombatra hívnak, de nem érsz rá. Melyik a legudvariasabb válasz?',
        a: 'すみません、{土曜日|どようび}はちょっと…。',
        wrong: ['いいえ、{行|い}きません。', '{土曜日|どようび}はきらいです。', 'いいえ、{好|す}きじゃありません。'],
        why: 'A japán nem mondja ki a nemet: megnevezi a napot, és félbehagyja a mondatot.'
      },
      {
        q: 'Mit jelent: {日本語|にほんご}は{難|むずか}しいですが、おもしろいです。',
        a: 'A japán nehéz, de érdekes.',
        wrong: ['A japán nehéz, mert érdekes.', 'A japán nem nehéz, hanem érdekes.', 'A japán nehéz és unalmas.'],
        why: 'A tagmondat végi が ellentétet fejez ki: „de".'
      },
      { q: 'Ki a {先輩|せんぱい}?', a: 'aki előbb érkezett az iskolába, szakkörbe, munkahelyre', wrong: ['aki fiatalabb nálad', 'a tanár', 'az osztálytárs, aki veled egyidős'], why: 'A {先輩|せんぱい} a fölötted járó; a fiatalabb a {後輩|こうはい}.' },
      { q: '„Mindig hétkor kelek." Melyik szó hiányzik?', jp: '＿{七時|しちじ}に{起|お}きます。', a: 'いつも', wrong: ['あまり', 'ぜんぜん', 'どうして'], why: 'Az いつも = „mindig"; az あまり és a ぜんぜん tagadó igét kérne.' }
    ]
  },

  /* ── 8. lecke ─────────────────────────────────────── */
  {
    id: 'l8', no: 8, book: 'Dekiru 1', title: 'Milyen?',
    lead: 'Leírod, milyen egy hely vagy az idő, elmondod, mit szeretnél csinálni, útbaigazítást kérsz, és segítséget ajánlasz.',
    cando: [
      'Egyszerű szavakkal leírsz helyeket, és megmondod, milyen az idő.',
      'Helyesen használod és tagadod a kétféle melléknevet.',
      'Megmondod, mit szeretnél csinálni, és udvariasan segítséget kérsz.',
      'Felajánlod a segítségedet, és megérted az útbaigazítást.'
    ],
    intro: [
      'A japánban <b>kétféle melléknév</b> van, és a kettő egészen másképp viselkedik. Az <b>い-melléknév</b> ({高|たか}い, おいしい) önmagában is ragozható, szinte úgy, mint egy ige: saját tagadó és múlt alakja van. A <b>な-melléknév</b> ({静|しず}か, {有名|ゆうめい}) valójában főnévszerű szó: a です-re támaszkodik, és úgy tagadod, mint a főnevet.',
      'Mindkét fajta kétféle helyen állhat a mondatban. <b>Jelzőként</b> a főnév előtt: „magas hegy". <b>Állítmányként</b> a mondat végén: „a hegy magas". A な-melléknév a nevét onnan kapta, hogy jelzőként な-val kapcsolódik a főnévhez — állítmányként viszont a な eltűnik.',
      'A lecke második fele a vágyról és a segítségkérésről szól. A <b>〜たいです</b> („szeretnék…") a saját kívánságodat fejezi ki, a <b>〜たいんですが…</b> pedig a japán segítségkérés leggyakoribb formája: nem kérsz, csak elmondod, mit szeretnél, és a másik megérti a többit.'
    ],
    dialogue: {
      title: 'Hétvégi terv és egy eltévedt turista',
      scene: 'Szató asszony kirándulást javasol Annának. A hétvégén aztán Anna Kiotóban egy járókelőtől kér útbaigazítást.',
      lines: [
        { who: 'Szató', jp: '{週末|しゅうまつ}、{京都|きょうと}へもみじを{見|み}に{行|い}きませんか。', romaji: 'Shūmatsu, Kyōto e momiji o mi ni ikimasen ka.', hu: 'Nem mennénk el a hétvégén Kiotóba megnézni az őszi juharokat?' },
        { who: 'Anna', jp: '{京都|きょうと}ですか。どんなところですか。', romaji: 'Kyōto desu ka. Donna tokoro desu ka.', hu: 'Kiotóba? Milyen hely az?' },
        { who: 'Szató', jp: '{古|ふる}い{町|まち}です。お{寺|てら}が{多|おお}いです。とてもきれいなところですよ。', romaji: 'Furui machi desu. O-tera ga ōi desu. Totemo kirei na tokoro desu yo.', hu: 'Régi város. Sok a templom. Nagyon szép hely.' },
        { who: 'Anna', jp: 'いいですね。{行|い}きたいです。{週末|しゅうまつ}の{天気|てんき}はどうですか。', romaji: 'Ii desu ne. Ikitai desu. Shūmatsu no tenki wa dō desu ka.', hu: 'De jó! Szeretnék menni. Milyen idő lesz a hétvégén?' },
        { who: 'Szató', jp: '{晴|は}れですよ。あまり{寒|さむ}くないです。', romaji: 'Hare desu yo. Amari samuku nai desu.', hu: 'Derült. Nem lesz nagyon hideg.' },
        { who: 'Anna', jp: 'そうですか。{楽|たの}しみです。', romaji: 'Sō desu ka. Tanoshimi desu.', hu: 'Értem. Már alig várom.' },
        { who: 'Anna', jp: 'あのう、すみません。{清水寺|きよみずでら}へ{行|い}きたいんですが…。', romaji: 'Anō, sumimasen. Kiyomizu-dera e ikitai n desu ga…', hu: 'Öö, elnézést! A Kijomizu-templomhoz szeretnék eljutni…' },
        {
          who: 'Járókelő',
          jp: '{清水寺|きよみずでら}ですか。ここから{少|すこ}し{遠|とお}いですよ。バスで{行|い}きますか。',
          romaji: 'Kiyomizu-dera desu ka. Koko kara sukoshi tōi desu yo. Basu de ikimasu ka.',
          hu: 'A Kijomizu-templomhoz? Innen kicsit messze van. Busszal megy?'
        },
        { who: 'Anna', jp: 'はい。バス{停|てい}はどこですか。', romaji: 'Hai. Basutei wa doko desu ka.', hu: 'Igen. Hol van a buszmegálló?' },
        { who: 'Járókelő', jp: 'あの{白|しろ}い{建物|たてもの}の{前|まえ}です。いっしょに{行|い}きましょうか。', romaji: 'Ano shiroi tatemono no mae desu. Issho ni ikimashō ka.', hu: 'Az előtt a fehér épület előtt. Elkísérjem?' },
        { who: 'Anna', jp: 'ありがとうございます。{親切|しんせつ}ですね。', romaji: 'Arigatō gozaimasu. Shinsetsu desu ne.', hu: 'Köszönöm szépen. Milyen kedves!' }
      ],
      notes: [
        'A <b>どんなところですか</b> („milyen hely?") kérdésre a válasz jelzős szerkezet: {古|ふる}い{町|まち}, きれい<b>な</b>ところ. Az い-melléknév közvetlenül, a な-melléknév な-val áll a főnév előtt.',
        'Az <b>お{寺|てら}が{多|おお}いです</b> szó szerint: „a templom sok". A {多|おお}い (sok) és a {少|すく}ない (kevés) állítmányként használatos; jelzőként más szerkezet kell (たくさんの…).',
        'A <b>{楽|たの}しみです</b> („örömmel várom") az a mondat, amellyel egy közelgő programra reagálsz. Külön ige nem kell hozzá.',
        'Anna nem azt mondja, „kérem, mondja meg, merre van": csak annyit, hogy <b>{行|い}きたいんですが…</b>, és elhallgat. A befejezetlen mondat a kérés.',
        'Az <b>いっしょに{行|い}きましょうか</b> felajánlás („elkísérjem?"). A か nélküli ましょう javaslat volna („menjünk együtt!").'
      ]
    },
    points: [
      {
        title: 'い és な', sub: 'a két melléknév-fajta',
        pattern: 'い-melléknév + főnév · な-melléknév + な + főnév',
        body: 'Az <b>い-melléknevek</b> い-re végződnek, és közvetlenül a főnév elé állnak: {高|たか}い {山|やま}. A <b>な-melléknevek</b> és a főnév közé <b>な</b> kerül: {静|しず}かな {町|まち}. Néhány な-melléknév is い-re végződik, ezeket külön meg kell jegyezni: きれい (szép, tiszta), 有名 (ゆうめい, híres), きらい.',
        more: [
          'Honnan tudod, melyik fajta? Az <b>い-melléknév</b> szótári alakja mindig い-re végződik, és ez az い a szó ragozható része. A <b>な-melléknév</b> bármire végződhet; a legtöbbje kínai eredetű, kanjival írt szó.',
          'A csapda: néhány な-melléknév <b>véletlenül</b> い-re végződik. A leggyakoribbak: <b>きれい</b> (szép), <b>{有名|ゆうめい}</b> (híres), <b>きらい</b> (nem szeretett). Ezek い-je nem rag, hanem a szó része, ezért nem változik.',
          'Jelzőként az い-melléknév <b>közvetlenül</b> a főnév elé áll, a な-melléknév és a főnév közé <b>な</b> kerül. Állítmányként mindkettő a です elé kerül, és a な ilyenkor <b>eltűnik</b>.'
        ],
        tables: [
          {
            caption: 'A két melléknévfajta',
            head: ['', 'い-melléknév', 'な-melléknév'],
            rows: [
              ['szótári alak', 'たか<b>い</b>', 'しずか'],
              ['jelzőként', 'たかい やま', 'しずか<b>な</b> まち'],
              ['állítmányként', 'やまは たかいです', 'まちは しずかです'],
              ['tagadva', 'たか<b>くないです</b>', 'しずか<b>じゃありません</b>']
            ]
          }
        ],
        examples: [
          { jp: '{高|たか}い{山|やま}です。', romaji: 'Takai yama desu.', hu: 'Magas hegy.' },
          { jp: '{静|しず}かな{町|まち}です。', romaji: 'Shizuka na machi desu.', hu: 'Csendes város.' },
          { jp: 'きれいな{花|はな}ですね。', romaji: 'Kirei na hana desu ne.', hu: 'Szép virág, ugye?' },
          { jp: 'この{山|やま}は{高|たか}いです。', romaji: 'Kono yama wa takai desu.', hu: 'Ez a hegy magas.' },
          { jp: 'この{町|まち}は{静|しず}かです。', romaji: 'Kono machi wa shizuka desu.', hu: 'Ez a város csendes.' },
          { jp: '{京都|きょうと}は{有名|ゆうめい}な{町|まち}です。', romaji: 'Kyōto wa yūmei na machi desu.', hu: 'Kiotó híres város.' }
        ],
        notes: [
          'Az い-melléknév <b>és</b> a főnév közé soha nem kerül の vagy な: {高|たか}い{山|やま}, nem „{高|たか}いの{山|やま}".',
          'A {大|おお}きい és a {小|ちい}さい jelzőként な-val is állhat: {大|おお}きな{木|き}, {小|ちい}さな{花|はな}. Ez a két szó kivétel, a jelentés ugyanaz.'
        ],
        mistakes: [
          { bad: 'きれい{花|はな}です。', good: 'きれいな{花|はな}です。', why: 'A きれい な-melléknév, hiába い-re végződik: a főnév elé な kell.' },
          { bad: 'この{町|まち}は{静|しず}かなです。', good: 'この{町|まち}は{静|しず}かです。', why: 'Állítmányként a な eltűnik: a な csak főnév előtt áll.' },
          { bad: '{高|たか}いな{山|やま}', good: '{高|たか}い{山|やま}', why: 'Az い-melléknév közvetlenül kapcsolódik a főnévhez.' }
        ]
      },
      {
        title: 'どんな・どう', sub: 'milyen?',
        pattern: 'どんな + főnév ですか · 〜は どうですか',
        body: 'A <b>どんな</b> főnév előtt kérdez („milyen város?"), a <b>どう</b> állítmányként („milyen, hogy tetszik?"). Állítmányként a melléknév a です elé kerül; a な-melléknév ilyenkor な nélkül.',
        more: [
          'A két kérdőszó a melléknév két helyét követi. A <b>どんな</b> + főnév jelzőre kérdez, és jelzős szerkezettel felelsz rá: どんな{町|まち}ですか → にぎやかな{町|まち}です. A <b>どう</b> állítmányra kérdez, és a válaszban a melléknév a mondat végére kerül: {町|まち}はどうですか → にぎやかです.',
          'A どうですか véleményt és benyomást is kér („hogy tetszik? milyen volt?"), és kínálásra is jó: コーヒーはどうですか (egy kávét?). Udvariasabb párja az いかがですか.'
        ],
        tables: [
          {
            caption: 'Két kérdés, két válasz',
            head: ['Kérdés', 'Válasz'],
            rows: [
              ['<b>どんな</b> まちですか。', 'ふるい まちです。'],
              ['<b>どんな</b> ひとですか。', 'しんせつな ひとです。'],
              ['まちは <b>どう</b>ですか。', 'ふるいです。'],
              ['にほんごは <b>どう</b>ですか。', 'むずかしいですが、おもしろいです。']
            ]
          }
        ],
        examples: [
          { jp: 'ブダペストはどんな{町|まち}ですか。', romaji: 'Budapesuto wa donna machi desu ka.', hu: 'Milyen város Budapest?' },
          { jp: 'にぎやかな{町|まち}です。', romaji: 'Nigiyaka na machi desu.', hu: 'Nyüzsgő város.' },
          { jp: '{日本語|にほんご}はどうですか。', romaji: 'Nihongo wa dō desu ka.', hu: 'Milyen a japán nyelv?' },
          { jp: 'おもしろいです。', romaji: 'Omoshiroi desu.', hu: 'Érdekes.' },
          { jp: '{田中|たなか}さんはどんな{人|ひと}ですか。', romaji: 'Tanaka-san wa donna hito desu ka.', hu: 'Milyen ember Tanaka?' },
          { jp: '{親切|しんせつ}な{人|ひと}です。', romaji: 'Shinsetsu na hito desu.', hu: 'Kedves ember.' }
        ],
        notes: [
          'Két tulajdonságot egyelőre a <b>そして</b> köt össze két mondatban: {古|ふる}い{町|まち}です。そして、きれいです。 Az egy mondatba fűzést (〜くて, 〜で) a 9. leckében tanulod.'
        ]
      },
      {
        title: '〜くないです・〜じゃありません', sub: 'tagadás',
        pattern: 'い → くないです · な-melléknév + じゃありません',
        body: 'Az い-melléknév tagadásakor a végső い helyére <b>くない</b> kerül: {高|たか}い → {高|たか}くないです. A な-melléknév úgy tagad, mint a főnév: {静|しず}かじゃありません. Az いい (jó) rendhagyó: <b>よくないです</b>.',
        more: [
          'Az <b>い-melléknév</b> tagadásakor a szó végi い leesik, és a helyére <b>くない</b> kerül. Az így kapott szó (たかくない) maga is い-melléknévként viselkedik, a です csak udvariassá teszi.',
          'Van egy hivatalosabb változat is: <b>〜くありません</b> ({高|たか}くありません). A jelentése ugyanaz, mint a 〜くないです alaké.',
          'A <b>な-melléknév</b> pontosan úgy tagad, mint a főnév: <b>じゃありません</b> (beszédben) vagy <b>ではありません</b> (hivatalosan). Lazább változata: じゃないです.',
          'Az <b>いい</b> (jó) az egyetlen rendhagyó い-melléknév: minden ragozott alakját a régi <b>よい</b> formából képezzük. Ezért a tagadása <b>よくないです</b>, nem „いくないです".'
        ],
        tables: [
          {
            caption: 'Jelen idő: állító és tagadó',
            head: ['', 'Állító', 'Tagadó', 'Hivatalosabb tagadó'],
            rows: [
              ['い-mn.', 'たかいです', 'たか<b>くない</b>です', 'たか<b>くありません</b>'],
              ['いい', 'いいです', '<b>よくない</b>です', '<b>よくありません</b>'],
              ['な-mn.', 'しずかです', 'しずか<b>じゃありません</b>', 'しずか<b>ではありません</b>'],
              ['főnév', 'あめです', 'あめ<b>じゃありません</b>', 'あめ<b>ではありません</b>']
            ]
          }
        ],
        examples: [
          { jp: 'この{本|ほん}は{高|たか}くないです。', romaji: 'Kono hon wa takakunai desu.', hu: 'Ez a könyv nem drága.' },
          { jp: 'この{町|まち}は{静|しず}かじゃありません。', romaji: 'Kono machi wa shizuka ja arimasen.', hu: 'Ez a város nem csendes.' },
          { jp: '{今日|きょう}は{天気|てんき}がよくないです。', romaji: 'Kyō wa tenki ga yokunai desu.', hu: 'Ma nem jó az idő.' },
          { jp: 'このレストランはおいしくないです。', romaji: 'Kono resutoran wa oishiku nai desu.', hu: 'Ez az étterem nem jó (nem finom).' },
          { jp: 'この{町|まち}は{有名|ゆうめい}じゃありません。', romaji: 'Kono machi wa yūmei ja arimasen.', hu: 'Ez a város nem híres.' }
        ],
        notes: [
          'A {高|たか}い két dolgot jelent: „magas" és „drága". A szövegkörnyezet dönt: {山|やま} mellett magas, かばん mellett drága.',
          'A {暑|あつ}い (meleg idő), a {熱|あつ}い (forró tárgy) és a {厚|あつ}い (vastag) ugyanúgy hangzik; a kanji mutatja a különbséget.'
        ],
        mistakes: [
          { bad: '{高|たか}いじゃありません', good: '{高|たか}くないです', why: 'Az い-melléknevet nem a です tagadásával, hanem a saját くない alakjával tagadod.' },
          { bad: 'いくないです', good: 'よくないです', why: 'Az いい ragozott alakjai a よい tőből erednek.' },
          { bad: 'きれくないです', good: 'きれいじゃありません', why: 'A きれい な-melléknév: az い nem rag, nem esik le.' }
        ],
        tip: 'A {高|たか}い két dolgot jelent: „magas" és „drága". A szövegkörnyezet dönt.'
      },
      {
        title: 'とても・少し・あまり・ぜんぜん', sub: 'mennyire',
        pattern: 'とても / {少|すこ}し + állítás · あまり / ぜんぜん + tagadás',
        body: 'A fokozó szó a melléknév elé kerül. Itt is igaz: az <b>あまり</b> és a <b>ぜんぜん</b> tagadó alakkal jár.',
        more: [
          'A fokozó szavak ugyanazt a két csoportot alkotják, mint a gyakoriság szavai a 7. leckében. <b>とても, {少|すこ}し, ちょっと</b> → állító alak. <b>あまり, ぜんぜん</b> → tagadó alak.',
          'A <b>ちょっと</b> a {少|すこ}し hétköznapibb párja, és puhításra is szolgál: ちょっと{高|たか}いですね („hát, ez egy kicsit drága") valójában azt jelenti: túl drága.'
        ],
        tables: [
          {
            caption: 'Mennyire?',
            head: ['Szó', 'Jelentés', 'A melléknév alakja'],
            rows: [
              ['とても', 'nagyon', 'állító: とても さむいです'],
              ['すこし / ちょっと', 'egy kicsit', 'állító: すこし さむいです'],
              ['あまり', 'nem nagyon', '<b>tagadó</b>: あまり さむくないです'],
              ['ぜんぜん', 'egyáltalán nem', '<b>tagadó</b>: ぜんぜん さむくないです']
            ]
          }
        ],
        examples: [
          { jp: '{今日|きょう}はとても{暑|あつ}いです。', romaji: 'Kyō wa totemo atsui desu.', hu: 'Ma nagyon meleg van.' },
          { jp: '{少|すこ}し{寒|さむ}いです。', romaji: 'Sukoshi samui desu.', hu: 'Kicsit hideg van.' },
          { jp: 'あまり{遠|とお}くないです。', romaji: 'Amari tōkunai desu.', hu: 'Nincs nagyon messze.' },
          { jp: 'この{店|みせ}はちょっと{高|たか}いですね。', romaji: 'Kono mise wa chotto takai desu ne.', hu: 'Ez a bolt egy kicsit drága, nem?' },
          { jp: 'この{本|ほん}はぜんぜんおもしろくないです。', romaji: 'Kono hon wa zenzen omoshiroku nai desu.', hu: 'Ez a könyv egyáltalán nem érdekes.' }
        ],
        notes: [
          'Két tulajdonságot a <b>それに</b> („ráadásul") is összeköthet, ha mindkettő ugyanabba az irányba mutat: {静|しず}かです。それに、あまり{高|たか}くないです。'
        ],
        mistakes: [
          { bad: 'あまり{遠|とお}いです。', good: 'あまり{遠|とお}くないです。', why: 'Az あまり tagadó alakot kér.' }
        ]
      },
      {
        title: '〜たいです', sub: 'szeretnék…',
        pattern: 'ige ます nélkül + たいです',
        body: 'A saját vágyadat az ige <b>ます nélküli alakja + たい</b> fejezi ki: {行|い}きます → {行|い}きたいです. A たい úgy viselkedik, mint egy い-melléknév, tehát a tagadása <b>たくないです</b>. Más ember vágyára így nem használjuk.',
        more: [
          'Képzése: az ige <b>ます-töve + たい</b>. {行|い}き<b>ます</b> → {行|い}き<b>たい</b>, {食|た}べ<b>ます</b> → {食|た}べ<b>たい</b>, し<b>ます</b> → し<b>たい</b>.',
          'A たい alak <b>い-melléknévként</b> ragozódik tovább: tagadása 〜たくないです (vagy 〜たくありません).',
          'Tárgyas igénél a tárgy <b>が</b>-t és <b>を</b>-t is kaphat: {水|みず}<b>が</b>{飲|の}みたいです és {水|みず}<b>を</b>{飲|の}みたいです egyaránt helyes. A が a vágy tárgyát emeli ki.',
          'A 〜たい a <b>saját</b> vágyadat fejezi ki; kérdésben a megszólítottét. Harmadik személy kívánságát így nem mondhatod: mások fejébe nem látsz bele.'
        ],
        tables: [
          {
            caption: 'A たい-alak',
            head: ['〜ます', '〜たいです', '〜たくないです'],
            rows: [
              ['いきます', 'いき<b>たい</b>です', 'いき<b>たくない</b>です'],
              ['たべます', 'たべたいです', 'たべたくないです'],
              ['みます', 'みたいです', 'みたくないです'],
              ['します', 'したいです', 'したくないです'],
              ['きます', 'きたいです', 'きたくないです']
            ]
          }
        ],
        examples: [
          { jp: '{日本|にほん}へ{行|い}きたいです。', romaji: 'Nihon e ikitai desu.', hu: 'Japánba szeretnék menni.' },
          { jp: '{水|みず}が{飲|の}みたいです。', romaji: 'Mizu ga nomitai desu.', hu: 'Vizet szeretnék inni.' },
          { jp: '{今日|きょう}は{何|なに}も{食|た}べたくないです。', romaji: 'Kyō wa nani mo tabetakunai desu.', hu: 'Ma semmit sem szeretnék enni.' },
          { jp: '{何|なに}が{食|た}べたいですか。', romaji: 'Nani ga tabetai desu ka.', hu: 'Mit szeretnél enni?' },
          { jp: '{新|あたら}しいかばんが{買|か}いたいです。', romaji: 'Atarashii kaban ga kaitai desu.', hu: 'Új táskát szeretnék venni.' }
        ],
        notes: [
          'Felettesnek, tanárnak, vendégnek <b>ne</b> tedd fel a 〜たいですか kérdést: túl közvetlen, mintha a vágyait firtatnád. Kínálj inkább: コーヒーはいかがですか.',
          'A magyar „szeretnék egy kávét" japánul ige nélkül nem megy: コーヒーが{飲|の}みたいです (szeretnék kávét <i>inni</i>). Tárgyat kívánni a ほしい szóval lehet, azt a 14. leckében tanulod.'
        ],
        mistakes: [
          { bad: '{行|い}きますたいです', good: '{行|い}きたいです', why: 'A たい a ます <b>helyére</b> lép, a ます-tőhöz.' },
          { bad: '{行|い}きたいじゃありません', good: '{行|い}きたくないです', why: 'A たい い-melléknévként ragozódik: tagadása たくない.' }
        ]
      },
      {
        title: '〜たいんですが・〜ましょうか', sub: 'kérés felvezetése, felajánlás',
        pattern: '〜たいんですが… · 〜ましょうか',
        body: 'A <b>〜たいんですが</b> udvarias felvezetés: elmondod, mit szeretnél, és a másiktól segítséget vársz. A <b>〜ましょうか</b> a párja: felajánlod, hogy megteszel valamit („…-jak?").',
        more: [
          'A <b>〜たいんですが…</b> három részből áll: a vágy (〜たい), a magyarázó <b>んです</b> („arról van szó, hogy…"), és a mondatot nyitva hagyó <b>が</b>. Az együttes jelentés: „az a helyzet, hogy szeretnék…, de…" — és a másik befejezi helyetted, vagyis segít.',
          'Ezt a szerkezetet használod, ha <b>útbaigazítást, tanácsot vagy engedélyt</b> kérsz. Udvariasabb, mint egy egyenes kérdés, mert a döntést a másikra hagyja.',
          'A <b>〜ましょうか</b> a 〜ましょう kérdő változata: nem közös cselekvést javasol, hanem <b>felajánlja</b>, hogy te megteszel valamit a másik helyett. A válasz: ええ、お{願|ねが}いします (igen, megkérlek) vagy いいえ、{大丈夫|だいじょうぶ}です (nem, köszönöm, megoldom).'
        ],
        tables: [
          {
            caption: 'ましょう és ましょうか',
            head: ['Alak', 'Mit jelent?', 'Példa'],
            rows: [
              ['〜ましょう', 'csináljuk együtt!', 'いきましょう。 — Menjünk!'],
              ['〜ましょうか', 'megcsináljam (neked)?', 'てつだいましょうか。 — Segítsek?'],
              ['〜ましょうか', 'csináljuk? (puhább javaslat)', 'やすみましょうか。 — Pihenjünk?']
            ]
          }
        ],
        examples: [
          { jp: '{駅|えき}へ{行|い}きたいんですが…', romaji: 'Eki e ikitai n desu ga…', hu: 'Az állomásra szeretnék menni… (merre van?)' },
          { jp: '{窓|まど}を{開|あ}けましょうか。', romaji: 'Mado o akemashō ka.', hu: 'Kinyissam az ablakot?' },
          { jp: '{手伝|てつだ}いましょうか。', romaji: 'Tetsudaimashō ka.', hu: 'Segítsek?' },
          { jp: '{切符|きっぷ}を{買|か}いたいんですが…。', romaji: 'Kippu o kaitai n desu ga…', hu: 'Jegyet szeretnék venni… (hol lehet?)' },
          { jp: 'ええ、お{願|ねが}いします。', romaji: 'Ee, onegai shimasu.', hu: 'Igen, megkérem rá.' },
          { jp: 'いいえ、{大丈夫|だいじょうぶ}です。', romaji: 'Iie, daijōbu desu.', hu: 'Nem, köszönöm, megoldom.' }
        ],
        notes: [
          'Idegent megszólítani az <b>あのう、すみません</b> a legtermészetesebb: az あのう jelzi, hogy mondani készülsz valamit.',
          'Az útbaigazítás igéi: <b>{乗|の}ります</b> (felszáll: バス<b>に</b>{乗|の}ります), <b>{降|お}ります</b> (leszáll: バス<b>を</b>{降|お}ります), <b>{乗|の}り{換|か}えます</b> (átszáll).'
        ]
      }
    ],
    phrases: [
      { jp: 'どうですか。', romaji: 'Dō desu ka.', hu: 'Milyen? Mit szólsz hozzá?' },
      { jp: '{楽|たの}しみです。', romaji: 'Tanoshimi desu.', hu: 'Már alig várom.' },
      { jp: 'のどがかわきましたから、{何|なに}か{飲|の}みたいです。', romaji: 'Nodo ga kawakimashita kara, nanika nomitai desu.', hu: 'Megszomjaztam, szeretnék inni valamit.' },
      { jp: 'ちょっと{休|やす}みませんか。', romaji: 'Chotto yasumimasen ka.', hu: 'Nem pihennénk egy kicsit?' },
      { jp: 'どうしたんですか。', romaji: 'Dō shita n desu ka.', hu: 'Mi történt? Mi a baj?', note: 'Így szólítod meg, aki láthatóan bajban van vagy eltévedt.' },
      { jp: 'ああ、よかった。', romaji: 'Ā, yokatta.', hu: 'Jaj, de jó! (megkönnyebbülés)' },
      { jp: '{日本語|にほんご}でいいですよ。', romaji: 'Nihongo de ii desu yo.', hu: 'Japánul is jó.', note: 'A 〜で いいです = „…-val/-vel is megfelel".' },
      { jp: 'わかりました。', romaji: 'Wakarimashita.', hu: 'Értem. Rendben.', note: 'Útbaigazítás, utasítás tudomásulvétele; múlt időben áll.' },
      { jp: '{親切|しんせつ}ですね。', romaji: 'Shinsetsu desu ne.', hu: 'Milyen kedves!' }
    ],
    words: [
      {
        title: 'い-melléknevek',
        items: [
          { jp: '{大|おお}きい', romaji: 'ōkii', hu: 'nagy' },
          { jp: '{小|ちい}さい', romaji: 'chiisai', hu: 'kicsi' },
          { jp: '{新|あたら}しい', romaji: 'atarashii', hu: 'új' },
          { jp: '{古|ふる}い', romaji: 'furui', hu: 'régi' },
          { jp: '{高|たか}い', romaji: 'takai', hu: 'magas; drága' },
          { jp: '{安|やす}い', romaji: 'yasui', hu: 'olcsó' },
          { jp: '{近|ちか}い', romaji: 'chikai', hu: 'közeli' },
          { jp: '{遠|とお}い', romaji: 'tōi', hu: 'távoli' },
          { jp: 'おいしい', romaji: 'oishii', hu: 'finom' },
          { jp: 'おもしろい', romaji: 'omoshiroi', hu: 'érdekes, szórakoztató' },
          { jp: '{難|むずか}しい', romaji: 'muzukashii', hu: 'nehéz' },
          { jp: '{楽|たの}しい', romaji: 'tanoshii', hu: 'élvezetes' },
          { jp: '{忙|いそが}しい', romaji: 'isogashii', hu: 'elfoglalt' },
          { jp: 'いい', romaji: 'ii', hu: 'jó' }
        ]
      },
      {
        title: 'な-melléknevek',
        note: 'A きれい, a {有名|ゆうめい} és a きらい い-re végződik, mégis な-melléknév.',
        items: [
          { jp: 'きれい', romaji: 'kirei', hu: 'szép; tiszta' },
          { jp: '{静|しず}か', romaji: 'shizuka', hu: 'csendes' },
          { jp: 'にぎやか', romaji: 'nigiyaka', hu: 'nyüzsgő, élénk' },
          { jp: '{有名|ゆうめい}', romaji: 'yūmei', hu: 'híres' },
          { jp: '{親切|しんせつ}', romaji: 'shinsetsu', hu: 'kedves, segítőkész' },
          { jp: '{元気|げんき}', romaji: 'genki', hu: 'egészséges, életerős' },
          { jp: '{便利|べんり}', romaji: 'benri', hu: 'praktikus, kényelmes' },
          { jp: '{暇|ひま}', romaji: 'hima', hu: 'ráérős' },
          { jp: '{簡単|かんたん}', romaji: 'kantan', hu: 'egyszerű, könnyű' }
        ]
      },
      {
        title: 'Időjárás',
        items: [
          { jp: '{天気|てんき}', romaji: 'tenki', hu: 'idő, időjárás' },
          { jp: '{晴|は}れ', romaji: 'hare', hu: 'derült idő' },
          { jp: 'くもり', romaji: 'kumori', hu: 'borult idő' },
          { jp: '{雨|あめ}', romaji: 'ame', hu: 'eső' },
          { jp: '{雪|ゆき}', romaji: 'yuki', hu: 'hó' },
          { jp: '{暑|あつ}い', romaji: 'atsui', hu: 'meleg, forró (idő)' },
          { jp: '{寒|さむ}い', romaji: 'samui', hu: 'hideg (idő)' },
          { jp: '{暖|あたた}かい', romaji: 'atatakai', hu: 'kellemesen meleg' },
          { jp: '{涼|すず}しい', romaji: 'suzushii', hu: 'kellemesen hűvös' }
        ]
      },
      {
        title: 'A városban',
        items: [
          { jp: 'お{寺|てら}', romaji: 'o-tera', hu: 'buddhista templom' },
          { jp: '{神社|じんじゃ}', romaji: 'jinja', hu: 'sintó szentély' },
          { jp: '{建物|たてもの}', romaji: 'tatemono', hu: 'épület' },
          { jp: 'お{城|しろ}', romaji: 'o-shiro', hu: 'vár' },
          { jp: '{景色|けしき}', romaji: 'keshiki', hu: 'táj, kilátás' },
          { jp: 'バス{停|てい}', romaji: 'basutei', hu: 'buszmegálló' },
          { jp: '{切符|きっぷ}', romaji: 'kippu', hu: 'jegy' }
        ]
      }
    ],
    culture: [
      {
        title: 'Templom vagy szentély?',
        text: 'Japánban két vallás él egymás mellett, és a szent helyeik neve is más. A <b>{神社|じんじゃ}</b> a sintó szentély: a bejáratát vörös vagy fa kapu, a <b>{鳥居|とりい}</b> jelzi. Az <b>お{寺|てら}</b> a buddhista templom: tömjénfüst, harang, Buddha-szobor. A legtöbb japán mindkettőbe jár: újévkor a szentélybe, a halottak emlékére a templomba. Kiotóban több mint ezer templom és több száz szentély áll.'
      },
      {
        title: 'Vadászat a vörös levelekre',
        text: 'Ősszel a japánok felkerekednek, hogy megnézzék a színes lombot: ez a <b>もみじ{狩|が}り</b>, szó szerint „juharlevél-vadászat". A japán juhar mélyvörösre színeződik, ezért az őszi táj sokkal pirosabb, mint nálunk. A tévé és az újságok naponta jelentik, hol tart éppen a színesedés. Tavaszi párja a cseresznyevirág-nézés, a <b>{花見|はなみ}</b>.'
      },
      {
        title: 'Az időjárás mint köszönés',
        text: 'Japánban az időjárás említése szinte a köszönés része. Ismerősök találkozásakor gyakran ez az első mondat: <b>いい{天気|てんき}ですね</b> (szép időnk van), <b>{暑|あつ}いですね</b> (meleg van, ugye?). Nem kell rá hosszan felelni: elég egy そうですね. A levelek is hagyományosan az évszakra utaló mondattal kezdődnek.'
      }
    ],
    quiz: [
      { q: '„Csendes város." Mi hiányzik?', jp: '{静|しず}か＿{町|まち}です。', a: 'な', wrong: ['い', 'の', 'に'], why: 'な-melléknév és főnév közé な kerül.' },
      { q: 'Mi a 高い tagadása?', a: '{高|たか}くないです', wrong: ['{高|たか}いじゃありません', '{高|たか}じゃないです', '{高|たか}いくないです'], why: 'Az い helyére くない kerül.' },
      { q: '„Japánba szeretnék menni." Mi hiányzik?', jp: '{日本|にほん}へ＿です。', a: '{行|い}きたい', wrong: ['{行|い}きますたい', '{行|い}くたい', '{行|い}きましょう'], why: 'ます nélküli alak + たい: {行|い}き + たい.' },
      { q: 'Melyik mondat helyes?', a: 'あまり{遠|とお}くないです。', wrong: ['あまり{遠|とお}いです。', 'ぜんぜん{遠|とお}いです。', 'あまり{遠|とお}いくないです。'], why: 'Az あまり tagadó alakkal jár.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けましょうか。', a: 'Kinyissam az ablakot?', wrong: ['Nyisd ki az ablakot!', 'Kinyitottam az ablakot.', 'Ki akarom nyitni az ablakot.'], why: 'A 〜ましょうか felajánlás: „megtegyem?"' },
      { q: '„Magas hegy." Mi hiányzik? (い-melléknév)', jp: '{高|たか}＿{山|やま}です。', a: 'い', wrong: ['な', 'の', 'く'], why: 'Az い-melléknév közvetlenül a főnév elé áll, な nélkül.' },
      { q: 'Mi a {静|しず}かです tagadása?', a: '{静|しず}かじゃありません', wrong: ['{静|しず}かくないです', '{静|しず}くないです', '{静|しず}かいじゃありません'], why: 'A な-melléknév úgy tagad, mint a főnév.' },
      { q: '„Ma nem jó az idő." Melyik a helyes?', a: '{今日|きょう}は{天気|てんき}がよくないです。', wrong: ['{今日|きょう}は{天気|てんき}がいくないです。', '{今日|きょう}は{天気|てんき}がいいじゃありません。', '{今日|きょう}は{天気|てんき}がよいくないです。'], why: 'Az いい rendhagyó: a tagadása よくないです.' },
      { q: '„Milyen város Budapest?" Mi hiányzik?', jp: 'ブダペストは＿{町|まち}ですか。', a: 'どんな', wrong: ['どう', 'だれ', 'どうして'], why: 'Főnév előtt どんな; állítmányként どう.' },
      { q: '„Ma semmit sem szeretnék enni." Mi hiányzik?', jp: '{今日|きょう}は{何|なに}も＿です。', a: '{食|た}べたくない', wrong: ['{食|た}べたい', '{食|た}べたいじゃない', '{食|た}べません'], why: 'A たい úgy tagad, mint az い-melléknév: たくない.' },
      { q: 'Melyik szó な-melléknév, pedig い-re végződik?', a: 'きれい', wrong: ['おいしい', '{高|たか}い', '{新|あたら}しい'], why: 'A きれい い-je a szó része, nem rag: a főnév elé な kell (きれいな{花|はな}).' },
      { q: 'Melyik helyes?', a: 'この{町|まち}は{静|しず}かです。', wrong: ['この{町|まち}は{静|しず}かなです。', 'この{町|まち}は{静|しず}かいです。', 'この{町|まち}は{静|しず}かのです。'], why: 'Állítmányként a な-melléknév な nélkül áll a です előtt.' },
      { q: 'Mi az いいです tagadása?', a: 'よくないです', wrong: ['いくないです', 'いいじゃありません', 'いいくないです'], why: 'Az いい ragozott alakjai a よい tőből erednek.' },
      { q: 'Mi a きれいです tagadása?', a: 'きれいじゃありません', wrong: ['きれくないです', 'きれいくないです', 'きれいないです'], why: 'A きれい な-melléknév: úgy tagadod, mint a főnevet.' },
      { q: '„Milyen ember Tanaka?" Melyik szó hiányzik?', jp: '{田中|たなか}さんは＿{人|ひと}ですか。', a: 'どんな', wrong: ['どう', 'どこ', 'どれ'], why: 'Főnév előtt どんな áll; a どう állítmányra kérdez.' },
      { q: '„Mit szeretnél enni?" Melyik a helyes?', a: '{何|なに}が{食|た}べたいですか。', wrong: ['{何|なに}が{食|た}べますたいですか。', '{何|なに}を{食|た}べるたいですか。', '{何|なに}に{食|た}べたいですか。'], why: 'A たい a ます-tőhöz járul: {食|た}べ + たい.' },
      {
        q: 'Eltévedtél, és a múzeumot keresed. Melyik a legtermészetesebb megszólítás?',
        a: 'あのう、すみません。{美術館|びじゅつかん}へ{行|い}きたいんですが…。',
        wrong: ['{美術館|びじゅつかん}へ{行|い}きましょう。', '{美術館|びじゅつかん}が{好|す}きですか。', '{美術館|びじゅつかん}へ{行|い}きませんか。'],
        why: 'A 〜たいんですが… a segítségkérés udvarias, befejezetlen formája.'
      },
      { q: 'Valaki nehéz táskát cipel. Fel akarod ajánlani a segítségedet. Mit mondasz?', a: '{持|も}ちましょうか。', wrong: ['{持|も}ちましょう。', '{持|も}ちたいです。', '{持|も}ちませんか。'], why: 'A 〜ましょうか felajánlás: „vigyem?".' },
      { q: 'Mit jelent: この{店|みせ}はあまり{高|たか}くないです。', a: 'Ez a bolt nem nagyon drága.', wrong: ['Ez a bolt nagyon drága.', 'Ez a bolt egyáltalán nem drága.', 'Ez a bolt kicsit drága.'], why: 'Az あまり + tagadás = „nem nagyon".' },
      { q: 'Mi jelzi a sintó szentély bejáratát?', a: 'a {鳥居|とりい} kapu', wrong: ['egy Buddha-szobor', 'egy harangtorony', 'egy vörös lámpás'], why: 'A {神社|じんじゃ} bejáratánál {鳥居|とりい} áll; a buddhista templom az お{寺|てら}.' }
    ]
  },

  /* ── 9. lecke ─────────────────────────────────────── */
  {
    id: 'l9', no: 9, book: 'Dekiru 1', title: 'Milyen volt?',
    lead: 'Elmeséled, mi történt és milyen volt: múlt idő a főneveknél és a mellékneveknél, és megjelenik a て-alak, amellyel cselekvéseket és tulajdonságokat fűzöl össze.',
    cando: [
      'Elmeséled, mit csináltál a hétvégén vagy a szünetben.',
      'Megmondod, milyen volt valami, és milyen nem volt.',
      'Több cselekvést és több tulajdonságot egy mondatba fűzöl.',
      'Rövid személyes levelet vagy képeslapot írsz, és feladsz egy csomagot a postán.'
    ],
    intro: [
      'Ez a lecke két nagy lépés. Az első a <b>múlt idő</b> ott, ahol eddig nem tudtad kifejezni: a „volt" (でした) és a melléknevek múltja. Itt válik igazán fontossá a két melléknévfajta különbsége: az い-melléknév <b>maga ragozódik</b> ({高|たか}い → {高|たか}かった), a な-melléknév és a főnév helyett a <b>です</b> ragozódik (でした).',
      'A második lépés a <b>て-alak</b>, a japán nyelvtan egyik legfontosabb építőköve. Önmagában annyit tesz: „és" — összeköt két cselekvést vagy két tulajdonságot. De a következő leckékben erre az alakra épül a kérés (〜てください), a folyamatos jelen (〜ています), az engedély, a tiltás és még sok minden. Érdemes most megtanulni a képzését, mert utána mindig szükséged lesz rá.',
      'A て-alak képzése az I. csoport igéinél <b>hangváltozással</b> jár ({書|か}きます → {書|か}いて, {読|よ}みます → {読|よ}んで). Ez elsőre soknak tűnik, de mindössze öt minta van, és egyetlen kivétel.'
    ],
    dialogue: {
      title: 'Hétfő reggel',
      scene: 'Ken megkérdezi Annát, hogy telt a hétvégéje. Anna Kiotóban volt a fogadócsaládjával.',
      lines: [
        { who: 'Ken', jp: 'アンナさん、{週末|しゅうまつ}はどうでしたか。', romaji: 'Anna-san, shūmatsu wa dō deshita ka.', hu: 'Anna, milyen volt a hétvégéd?' },
        { who: 'Anna', jp: 'とても{楽|たの}しかったです。{京都|きょうと}へ{行|い}って、お{寺|てら}を{見|み}ました。', romaji: 'Totemo tanoshikatta desu. Kyōto e itte, o-tera o mimashita.', hu: 'Nagyon jó volt. Elmentem Kiotóba, és templomokat néztem.' },
        { who: 'Ken', jp: 'いいですね。{天気|てんき}はどうでしたか。', romaji: 'Ii desu ne. Tenki wa dō deshita ka.', hu: 'De jó! Milyen volt az idő?' },
        { who: 'Anna', jp: '{土曜日|どようび}は{晴|は}れでしたが、{日曜日|にちようび}は{雨|あめ}でした。', romaji: 'Doyōbi wa hare deshita ga, nichiyōbi wa ame deshita.', hu: 'Szombaton derült volt, de vasárnap esett.' },
        { who: 'Ken', jp: '{人|ひと}は{多|おお}かったですか。', romaji: 'Hito wa ōkatta desu ka.', hu: 'Sokan voltak?' },
        { who: 'Anna', jp: 'いいえ、あまり{多|おお}くなかったです。{静|しず}かで、きれいでした。', romaji: 'Iie, amari ōku nakatta desu. Shizuka de, kirei deshita.', hu: 'Nem, nem voltak nagyon sokan. Csendes volt és szép.' },
        { who: 'Ken', jp: 'それはよかったですね。', romaji: 'Sore wa yokatta desu ne.', hu: 'Ennek örülök.' },
        { who: 'Anna', jp: 'ケンさんは{何|なに}をしましたか。', romaji: 'Ken-san wa nani o shimashita ka.', hu: 'És te mit csináltál?' },
        {
          who: 'Ken',
          jp: '{部屋|へや}の{掃除|そうじ}をして、それから{友|とも}だちに{会|あ}って、{映画|えいが}を{見|み}ました。',
          romaji: 'Heya no sōji o shite, sorekara tomodachi ni atte, eiga o mimashita.',
          hu: 'Kitakarítottam a szobámat, aztán találkoztam a barátommal, és megnéztünk egy filmet.'
        },
        { who: 'Anna', jp: '{映画|えいが}はおもしろかったですか。', romaji: 'Eiga wa omoshirokatta desu ka.', hu: 'Jó volt a film?' },
        { who: 'Ken', jp: 'いいえ、{長|なが}くて、あまりおもしろくなかったです。', romaji: 'Iie, nagakute, amari omoshiroku nakatta desu.', hu: 'Nem, hosszú volt, és nem volt valami érdekes.' }
      ],
      notes: [
        'A <b>どうでしたか</b> („milyen volt?") a múlt idejű párja a どうですか kérdésnek: így kérdezel rá bármilyen élményre.',
        'Anna egy mondatba fűzi a két eseményt: {京都|きょうと}へ{行|い}<b>って</b>、お{寺|てら}を{見|み}ました. A múlt idő csak a <b>mondat végén</b> jelenik meg; a て-alaknak nincs ideje.',
        'A <b>{静|しず}かで、きれいでした</b> két な-melléknevet köt össze で-vel; a <b>{長|なが}くて</b> い-melléknevet köt くて-vel. Ugyanaz a szerep, más alak.',
        'A <b>それはよかったですね</b> („ennek örülök", szó szerint: „az jó volt") a jó hírre adott szokásos válasz.',
        'A {部屋|へや}の{掃除|そうじ}をして mondatrészben a する-ige て-alakja <b>して</b>; a {会|あ}って az {会|あ}います て-alakja.'
      ]
    },
    points: [
      {
        title: '〜でした', sub: 'volt (főnév)',
        pattern: 'A は B でした · B じゃありませんでした',
        body: 'A です múlt ideje <b>でした</b>, tagadva <b>じゃありませんでした</b>. Főnév és な-melléknév után ugyanígy.',
        more: [
          'A です négy alakja ugyanúgy épül fel, mint a 〜ます négy alakja az 5. leckében: állító és tagadó, jelen és múlt.',
          'A tagadó múlt hosszú, de logikus: a jelen tagadó alak (じゃありません) + <b>でした</b>. Hivatalos változata: ではありませんでした.'
        ],
        tables: [
          {
            caption: 'A です négy alakja (főnév és な-melléknév után)',
            head: ['', 'Állító', 'Tagadó'],
            rows: [
              ['jelen', 'あめ<b>です</b>', 'あめ<b>じゃありません</b>'],
              ['múlt', 'あめ<b>でした</b>', 'あめ<b>じゃありませんでした</b>']
            ]
          }
        ],
        examples: [
          { jp: 'きのうは{雨|あめ}でした。', romaji: 'Kinō wa ame deshita.', hu: 'Tegnap esős idő volt.' },
          { jp: '{先週|せんしゅう}は{休|やす}みじゃありませんでした。', romaji: 'Senshū wa yasumi ja arimasen deshita.', hu: 'Múlt héten nem volt szünet.' },
          { jp: '{旅行|りょこう}はどうでしたか。', romaji: 'Ryokō wa dō deshita ka.', hu: 'Milyen volt az utazás?' },
          { jp: 'きのうは{日曜日|にちようび}でした。', romaji: 'Kinō wa nichiyōbi deshita.', hu: 'Tegnap vasárnap volt.' },
          { jp: '{試験|しけん}はどうでしたか。', romaji: 'Shiken wa dō deshita ka.', hu: 'Milyen volt a vizsga?' }
        ],
        notes: ['A lazább じゃなかったです alakot is hallani fogod: ugyanazt jelenti, mint a じゃありませんでした.']
      },
      {
        title: '〜かったです', sub: 'い-melléknév múlt ideje',
        pattern: 'い → かったです · い → くなかったです',
        body: 'Az い-melléknév maga ragozódik: a végső い helyére <b>かった</b> kerül, a です változatlan marad. Tagadó múlt: <b>くなかったです</b>. Az いい múltja <b>よかったです</b>.',
        more: [
          'Az い-melléknév <b>maga hordozza az időt</b>: a szó végi い helyére <b>かった</b> kerül. A です utána csak az udvariasságot jelzi, és <b>mindig jelen időben marad</b>.',
          'A tagadó múlt a tagadó jelenből készül: {高|たか}くな<b>い</b> → {高|たか}くな<b>かった</b>. Hivatalos párja: {高|たか}くありませんでした.',
          'Az <b>いい</b> múltja a よい tőből: <b>よかった</b>, tagadva <b>よくなかった</b>. A よかった önállóan felkiáltás is: „de jó!", „hála az égnek!".'
        ],
        tables: [
          {
            caption: 'Az い-melléknév négy alakja',
            head: ['', 'Állító', 'Tagadó'],
            rows: [
              ['jelen', 'たか<b>い</b>です', 'たか<b>くない</b>です'],
              ['múlt', 'たか<b>かった</b>です', 'たか<b>くなかった</b>です']
            ]
          },
          {
            caption: 'いい — a rendhagyó',
            head: ['', 'Állító', 'Tagadó'],
            rows: [
              ['jelen', 'いいです', '<b>よくない</b>です'],
              ['múlt', '<b>よかった</b>です', '<b>よくなかった</b>です']
            ]
          }
        ],
        examples: [
          { jp: '{映画|えいが}はおもしろかったです。', romaji: 'Eiga wa omoshirokatta desu.', hu: 'A film érdekes volt.' },
          { jp: 'テストは{難|むずか}しくなかったです。', romaji: 'Tesuto wa muzukashikunakatta desu.', hu: 'A teszt nem volt nehéz.' },
          { jp: '{天気|てんき}がよかったです。', romaji: 'Tenki ga yokatta desu.', hu: 'Jó idő volt.' },
          { jp: 'きのうは{寒|さむ}かったです。', romaji: 'Kinō wa samukatta desu.', hu: 'Tegnap hideg volt.' },
          { jp: '{料理|りょうり}はあまりおいしくなかったです。', romaji: 'Ryōri wa amari oishiku nakatta desu.', hu: 'Az étel nem volt valami finom.' }
        ],
        mistakes: [
          { bad: '{楽|たの}しいでした。', good: '{楽|たの}しかったです。', why: 'Az い-melléknévnél a múltat a melléknév fejezi ki; a です nem ragozódik.' },
          { bad: 'いかったです。', good: 'よかったです。', why: 'Az いい minden ragozott alakja a よい tőből ered.' }
        ],
        tip: 'Az い-melléknévnél az időt a melléknév hordozza, nem a です: {高|たか}かったです ✓ · {高|たか}いでした ✗.'
      },
      {
        title: '〜でした (な)', sub: 'な-melléknév múlt ideje',
        pattern: 'な-melléknév + でした · じゃありませんでした',
        body: 'A な-melléknév úgy viselkedik, mint a főnév: múltja <b>でした</b>, tagadva <b>じゃありませんでした</b>.',
        more: [
          'A な-melléknév pontosan úgy viselkedik, mint a főnév: nem ő ragozódik, hanem a mögötte álló です.',
          'Az い-re végződő な-melléknevek (きれい, {有名|ゆうめい}, きらい) itt buknak le a legkönnyebben: ezek múltja is <b>でした</b>.'
        ],
        tables: [
          {
            caption: 'Múlt idő: a három szófaj egymás mellett',
            head: ['', 'Állító múlt', 'Tagadó múlt'],
            rows: [
              ['い-mn.', 'たか<b>かったです</b>', 'たか<b>くなかったです</b>'],
              ['な-mn.', 'しずか<b>でした</b>', 'しずか<b>じゃありませんでした</b>'],
              ['főnév', 'あめ<b>でした</b>', 'あめ<b>じゃありませんでした</b>']
            ]
          }
        ],
        examples: [
          { jp: '{町|まち}は{静|しず}かでした。', romaji: 'Machi wa shizuka deshita.', hu: 'A város csendes volt.' },
          { jp: 'ホテルはきれいじゃありませんでした。', romaji: 'Hoteru wa kirei ja arimasen deshita.', hu: 'A szálloda nem volt tiszta.' },
          { jp: 'パーティーはにぎやかでした。', romaji: 'Pātī wa nigiyaka deshita.', hu: 'A buli hangulatos, nyüzsgő volt.' },
          { jp: '{先生|せんせい}はとても{親切|しんせつ}でした。', romaji: 'Sensei wa totemo shinsetsu deshita.', hu: 'A tanár nagyon kedves volt.' }
        ],
        mistakes: [
          { bad: 'きれかったです。', good: 'きれいでした。', why: 'A きれい な-melléknév: múltja でした, az い nem esik le.' },
          { bad: '{静|しず}かかったです。', good: '{静|しず}かでした。', why: 'かった csak い-melléknévhez járul.' }
        ]
      },
      {
        title: 'て-alak', sub: 'hogyan képezzük',
        pattern: '{食|た}べます → {食|た}べて · {書|か}きます → {書|か}いて · します → して',
        body: 'A <b>て-alak</b> az ige „kapcsoló" alakja: önmagában nincs ideje, nincs udvarias vagy közvetlen változata, csak összeköt. A képzése a <b>II.</b> és a <b>III. csoport</b> igéinél egyszerű: a ます helyére て kerül ({食|た}べます → {食|た}べて, します → して, {来|き}ます → {来|き}て).',
        more: [
          'Az <b>I. csoport</b> igéinél a ます előtti szótag dönti el, mi lesz a végződés. Öt minta van: <b>い・ち・り → って</b> · <b>み・び・に → んで</b> · <b>き → いて</b> · <b>ぎ → いで</b> · <b>し → して</b>.',
          'Egyetlen kivétel van: az <b>{行|い}きます</b>. A き-re végződő igék いて-t kapnának, de ez az ige <b>{行|い}って</b> lesz.',
          'A legtöbb tanuló dalra vagy ritmusra jegyzi meg a sort: „い・ち・り — って; み・び・に — んで; き — いて; ぎ — いで; し — して". Néhány nap gyakorlás után a helyes alak magától jön.'
        ],
        tables: [
          {
            caption: 'A て-alak képzése — I. csoport',
            head: ['A ます előtt', 'Végződés', '〜ます', 'て-alak'],
            rows: [
              ['い', '<b>って</b>', 'かいます', 'か<b>って</b>'],
              ['ち', '<b>って</b>', 'まちます', 'ま<b>って</b>'],
              ['り', '<b>って</b>', 'かえります', 'かえ<b>って</b>'],
              ['み', '<b>んで</b>', 'よみます', 'よ<b>んで</b>'],
              ['び', '<b>んで</b>', 'あそびます', 'あそ<b>んで</b>'],
              ['に', '<b>んで</b>', 'しにます', 'し<b>んで</b>'],
              ['き', '<b>いて</b>', 'かきます', 'か<b>いて</b>'],
              ['ぎ', '<b>いで</b>', 'およぎます', 'およ<b>いで</b>'],
              ['し', '<b>して</b>', 'はなします', 'はな<b>して</b>'],
              ['kivétel', '', 'いきます', '<b>いって</b>']
            ]
          },
          {
            caption: 'A て-alak képzése — II. és III. csoport',
            head: ['Csoport', '〜ます', 'て-alak'],
            rows: [
              ['II.', 'たべます', 'たべ<b>て</b>'],
              ['II.', 'みます', 'み<b>て</b>'],
              ['II.', 'おきます', 'おき<b>て</b>'],
              ['III.', 'します', '<b>して</b>'],
              ['III.', 'きます', '<b>きて</b>']
            ]
          }
        ],
        examples: [
          { jp: '{朝|あさ}{起|お}きて、{顔|かお}を{洗|あら}います。', romaji: 'Asa okite, kao o araimasu.', hu: 'Reggel felkelek, és megmosom az arcom.' },
          { jp: '{本|ほん}を{読|よ}んで、{寝|ね}ました。', romaji: 'Hon o yonde, nemashita.', hu: 'Olvastam, aztán lefeküdtem.' },
          { jp: '{友|とも}だちに{会|あ}って、{映画|えいが}を{見|み}ました。', romaji: 'Tomodachi ni atte, eiga o mimashita.', hu: 'Találkoztam a barátommal, és megnéztünk egy filmet.' },
          { jp: '{海|うみ}で{泳|およ}いで、{昼|ひる}ごはんを{食|た}べました。', romaji: 'Umi de oyoide, hirugohan o tabemashita.', hu: 'Úsztam a tengerben, aztán megebédeltem.' },
          { jp: '{友|とも}だちと{話|はな}して、うちへ{帰|かえ}りました。', romaji: 'Tomodachi to hanashite, uchi e kaerimashita.', hu: 'Beszélgettem a barátommal, aztán hazamentem.' }
        ],
        notes: [
          'A II. csoportú, i hangra végződő tövű igék (みます, おきます, います, かります) て-alakja egyszerű て — ne alkalmazd rájuk az I. csoport szabályait: おきます → おき<b>て</b>, nem „おいて".',
          'A {帰|かえ}ります I. csoportú, ezért {帰|かえ}<b>って</b>; a {着|き}ます (felvesz) II. csoportú, ezért {着|き}<b>て</b> — pedig mindkettő „る" végű a szótárban.'
        ],
        mistakes: [
          { bad: '{行|い}いて', good: '{行|い}って', why: 'Az {行|い}きます az egyetlen kivétel: {行|い}って.' },
          { bad: '{読|よ}みて', good: '{読|よ}んで', why: 'A み, び, に végű tő んで-t kap.' },
          { bad: '{書|か}きて', good: '{書|か}いて', why: 'A き végű tő いて-t kap.' }
        ]
      },
      {
        title: '〜て、〜', sub: 'cselekvések egymás után',
        pattern: 'ige て-alak、+ következő cselekvés',
        body: 'Több cselekvést egymás után a て-alak fűz össze. Az idő és az udvariasság csak a mondat végén, az utolsó igén látszik.',
        more: [
          'A て-alakkal összefűzött cselekvések <b>időrendben</b> követik egymást, és ugyanaz az alanyuk. Akárhány cselekvést egymás után fűzhetsz, de kettő-három után érdemes új mondatot kezdeni.',
          'Mivel a て-alaknak nincs ideje, az egész mondat idejét az <b>utolsó ige</b> adja meg. Ugyanaz a kezdet lehet múlt, jelen vagy jövő: {起|お}きて、{食|た}べました / {食|た}べます.',
          'A て-alak <b>okot</b> is kifejezhet, ha az első esemény a másodiknak az előzménye: {風邪|かぜ}をひいて、{学校|がっこう}を{休|やす}みました (megfáztam, ezért nem mentem iskolába).'
        ],
        examples: [
          { jp: '{駅|えき}へ{行|い}って、{切符|きっぷ}を{買|か}いました。', romaji: 'Eki e itte, kippu o kaimashita.', hu: 'Elmentem az állomásra, és jegyet vettem.' },
          { jp: 'うちへ{帰|かえ}って、{晩|ばん}ごはんを{食|た}べます。', romaji: 'Uchi e kaette, bangohan o tabemasu.', hu: 'Hazamegyek, és megvacsorázom.' },
          { jp: '{宿題|しゅくだい}をして、テレビを{見|み}ました。', romaji: 'Shukudai o shite, terebi o mimashita.', hu: 'Megcsináltam a leckét, aztán tévét néztem.' },
          { jp: '{朝|あさ}{起|お}きて、シャワーを{浴|あ}びて、{学校|がっこう}へ{行|い}きます。', romaji: 'Asa okite, shawā o abite, gakkō e ikimasu.', hu: 'Reggel felkelek, lezuhanyozom, és iskolába megyek.' },
          { jp: '{風邪|かぜ}をひいて、{学校|がっこう}を{休|やす}みました。', romaji: 'Kaze o hiite, gakkō o yasumimashita.', hu: 'Megfáztam, ezért nem mentem iskolába.' }
        ],
        notes: [
          'A 6. leckében tanult そして és それから két <b>mondatot</b> köt össze; a て-alak egy <b>mondaton belül</b> köt. A kettő kombinálható: …をして、それから…'
        ],
        mistakes: [
          { bad: '{駅|えき}へ{行|い}きまして、{切符|きっぷ}を{買|か}いました。', good: '{駅|えき}へ{行|い}って、{切符|きっぷ}を{買|か}いました。', why: 'A mondat közepén a sima て-alak áll; az udvariasságot az utolsó ige hordozza.' }
        ]
      },
      {
        title: '〜くて・〜で', sub: 'tulajdonságok összekötése',
        pattern: 'い → くて · な-melléknév / főnév + で',
        body: 'Két tulajdonságot is a て-alak köt össze: az い-melléknév végén <b>くて</b>, a な-melléknév és a főnév után <b>で</b> áll. Az いい itt is rendhagyó: <b>よくて</b>.',
        more: [
          'A melléknevek kapcsoló alakja ugyanazt teszi, mint az igék て-alakja: „és". Az <b>い-melléknév</b> végi い helyére <b>くて</b> kerül; a <b>な-melléknév</b> és a <b>főnév</b> után <b>で</b> áll.',
          'Ezzel az alakkal csak <b>egy irányba mutató</b> tulajdonságokat köthetsz össze (jó és jó, vagy rossz és rossz). Ellentétes tulajdonságokhoz a が kell: {安|やす}いです<b>が</b>、おいしくないです.',
          'A くて / で itt is jelenthet <b>okot</b>: {人|ひと}が{多|おお}くて、{大変|たいへん}でした (sokan voltak, ezért fárasztó volt).'
        ],
        tables: [
          {
            caption: 'A kapcsoló alak',
            head: ['', 'Alapalak', 'Kapcsoló alak'],
            rows: [
              ['い-mn.', 'やす<b>い</b>', 'やす<b>くて</b>'],
              ['いい', 'いい', '<b>よくて</b>'],
              ['な-mn.', 'しずか', 'しずか<b>で</b>'],
              ['főnév', 'がくせい', 'がくせい<b>で</b>']
            ]
          }
        ],
        examples: [
          { jp: 'この{部屋|へや}は{広|ひろ}くて、{明|あか}るいです。', romaji: 'Kono heya wa hirokute, akarui desu.', hu: 'Ez a szoba tágas és világos.' },
          { jp: '{町|まち}は{静|しず}かで、きれいです。', romaji: 'Machi wa shizuka de, kirei desu.', hu: 'A város csendes és szép.' },
          { jp: 'このレストランは{安|やす}くて、おいしいです。', romaji: 'Kono resutoran wa yasukute, oishii desu.', hu: 'Ez az étterem olcsó és finom.' },
          { jp: '{兄|あに}は{大学生|だいがくせい}で、{二十歳|はたち}です。', romaji: 'Ani wa daigakusei de, hatachi desu.', hu: 'A bátyám egyetemista, és húszéves.' },
          { jp: '{人|ひと}が{多|おお}くて、{大変|たいへん}でした。', romaji: 'Hito ga ōkute, taihen deshita.', hu: 'Sokan voltak, fárasztó volt.' }
        ],
        mistakes: [
          { bad: '{安|やす}いで、おいしいです。', good: '{安|やす}くて、おいしいです。', why: 'Az い-melléknév kapcsoló alakja くて; a で な-melléknévhez és főnévhez jár.' },
          { bad: '{静|しず}かくて、きれいです。', good: '{静|しず}かで、きれいです。', why: 'A な-melléknév kapcsoló alakja で.' }
        ]
      }
    ],
    phrases: [
      { jp: 'お{元気|げんき}ですか。', romaji: 'O-genki desu ka.', hu: 'Hogy van? Jól van?', note: 'Levél elején vagy régen látott ismerősnek. A válasz: はい、{元気|げんき}です.' },
      { jp: 'お{久|ひさ}しぶりです。', romaji: 'O-hisashiburi desu.', hu: 'Rég nem láttuk egymást!' },
      { jp: 'それはよかったですね。', romaji: 'Sore wa yokatta desu ne.', hu: 'Ennek örülök.' },
      { jp: 'それは{大変|たいへん}でしたね。', romaji: 'Sore wa taihen deshita ne.', hu: 'Az nehéz lehetett.', note: 'Együttérzés, ha valaki kellemetlen élményről mesél.' },
      { jp: 'お{体|からだ}に{気|き}をつけてください。', romaji: 'O-karada ni ki o tsukete kudasai.', hu: 'Vigyázzon magára!', note: 'Levél végén, búcsúzáskor: „ügyeljen az egészségére".' },
      { jp: 'また{手紙|てがみ}を{書|か}きます。', romaji: 'Mata tegami o kakimasu.', hu: 'Majd írok megint.' },
      { jp: 'これ、ハンガリーまでお{願|ねが}いします。', romaji: 'Kore, Hangarī made onegai shimasu.', hu: 'Ezt Magyarországra kérem.', note: 'Így adsz fel levelet, csomagot a postán.' },
      { jp: '{航空便|こうくうびん}でお{願|ねが}いします。', romaji: 'Kōkūbin de onegai shimasu.', hu: 'Légipostával kérem.' },
      { jp: '{全部|ぜんぶ}でいくらですか。', romaji: 'Zenbu de ikura desu ka.', hu: 'Mennyi lesz összesen?' }
    ],
    words: [
      {
        title: 'A postán',
        items: [
          { jp: '{手紙|てがみ}', romaji: 'tegami', hu: 'levél' },
          { jp: 'はがき', romaji: 'hagaki', hu: 'képeslap, levelezőlap' },
          { jp: '{切手|きって}', romaji: 'kitte', hu: 'bélyeg' },
          { jp: '{小包|こづつみ}', romaji: 'kozutsumi', hu: 'csomag' },
          { jp: '{航空便|こうくうびん}', romaji: 'kōkūbin', hu: 'légiposta' },
          { jp: '{船便|ふなびん}', romaji: 'funabin', hu: 'hajóposta' },
          { jp: '{住所|じゅうしょ}', romaji: 'jūsho', hu: 'lakcím' },
          { jp: '{料金|りょうきん}', romaji: 'ryōkin', hu: 'díj' },
          { jp: '{出|だ}します', romaji: 'dashimasu', hu: 'felad, kiad' },
          { jp: '{送|おく}ります', romaji: 'okurimasu', hu: 'küld' }
        ]
      },
      {
        title: 'Hétvége, szünidő',
        items: [
          { jp: '{買|か}い{物|もの}', romaji: 'kaimono', hu: 'bevásárlás' },
          { jp: '{掃除|そうじ}', romaji: 'sōji', hu: 'takarítás' },
          { jp: '{洗濯|せんたく}', romaji: 'sentaku', hu: 'mosás' },
          { jp: '{散歩|さんぽ}', romaji: 'sanpo', hu: 'séta' },
          { jp: '{遊|あそ}びます', romaji: 'asobimasu', hu: 'játszik, szórakozik' },
          { jp: '{泳|およ}ぎます', romaji: 'oyogimasu', hu: 'úszik' },
          { jp: '{登|のぼ}ります', romaji: 'noborimasu', hu: 'felmászik' },
          { jp: '{出|で}かけます', romaji: 'dekakemasu', hu: 'elmegy otthonról' }
        ]
      },
      {
        title: 'Milyen volt?',
        items: [
          { jp: '{楽|たの}しい', romaji: 'tanoshii', hu: 'élvezetes' },
          { jp: 'つまらない', romaji: 'tsumaranai', hu: 'unalmas' },
          { jp: '{長|なが}い', romaji: 'nagai', hu: 'hosszú' },
          { jp: '{短|みじか}い', romaji: 'mijikai', hu: 'rövid' },
          { jp: '{多|おお}い', romaji: 'ōi', hu: 'sok' },
          { jp: '{少|すく}ない', romaji: 'sukunai', hu: 'kevés' },
          { jp: '{広|ひろ}い', romaji: 'hiroi', hu: 'tágas' },
          { jp: '{狭|せま}い', romaji: 'semai', hu: 'szűk' },
          { jp: '{明|あか}るい', romaji: 'akarui', hu: 'világos' },
          { jp: '{大変|たいへん}', romaji: 'taihen', hu: 'nehéz, megterhelő (な-mn.)' }
        ]
      }
    ],
    culture: [
      {
        title: 'Ugyanaz a sorrend, mint a magyarban',
        text: 'A japán és a magyar három dologban is ugyanúgy gondolkodik, és mindkettő különbözik ebben a legtöbb európai nyelvtől. A <b>névben</b> elöl áll a családnév. A <b>dátum</b> a nagytól halad a kicsi felé: év, hónap, nap. A <b>cím</b> is: előbb a megye és a város, aztán a kerület, végül a házszám. A borítékra a címzett neve után nem さん, hanem a tiszteletteljesebb <b>{様|さま}</b> kerül; tanár nevéhez <b>{先生|せんせい}</b>.'
      },
      {
        title: 'A posta több, mint posta',
        text: 'A japán postahivatalban (<b>{郵便局|ゆうびんきょく}</b>) nemcsak levelet és csomagot lehet feladni. Itt fizetik be a számlákat, itt utalnak pénzt, és a postának saját bankja meg biztosítója is van. A jele a piros 〒, ezt látod a postaládákon és az irányítószámok előtt is. Külföldre háromféleképpen küldhetsz csomagot: légipostával (gyors, drága), hajópostával (olcsó, de hónapokig tart), vagy a kettő közötti, takarékos légi szállítással.'
      },
      {
        title: 'A levél az évszakkal kezdődik',
        text: 'A hagyományos japán levél nem a mondanivalóval indul. Előbb az évszakra vagy az időjárásra utaló mondat áll, aztán az érdeklődés a címzett egészsége felől (<b>お{元気|げんき}ですか</b>), és csak ezután jön a lényeg. A levelet jókívánság zárja, például <b>お{体|からだ}に{気|き}をつけてください</b>. Baráti képeslapon ez mind rövidebb, de az egészségre vonatkozó kérdés szinte mindig megmarad.'
      }
    ],
    quiz: [
      { q: '„A film érdekes volt." Mi hiányzik?', jp: '{映画|えいが}は＿。', a: 'おもしろかったです', wrong: ['おもしろいでした', 'おもしろくてです', 'おもしろいかったです'], why: 'い-melléknév múltja: い → かった.' },
      { q: '„A város csendes volt." Mi hiányzik?', jp: '{町|まち}は{静|しず}か＿。', a: 'でした', wrong: ['かったです', 'くてです', 'いでした'], why: 'A な-melléknév múltja でした, mint a főnévé.' },
      { q: 'Mi az いいです múlt ideje?', a: 'よかったです', wrong: ['いかったです', 'いいでした', 'よいでした'], why: 'Az いい rendhagyó: よかった.' },
      { q: 'Mi a {書|か}きます て-alakja?', a: '{書|か}いて', wrong: ['{書|か}きて', '{書|か}って', '{書|か}んで'], why: 'き → いて.' },
      { q: 'Mi a {読|よ}みます て-alakja?', a: '{読|よ}んで', wrong: ['{読|よ}みて', '{読|よ}って', '{読|よ}いて'], why: 'み・び・に → んで.' },
      { q: 'Mi a {行|い}きます て-alakja?', a: '{行|い}って', wrong: ['{行|い}いて', '{行|い}きて', '{行|い}んで'], why: 'A {行|い}きます rendhagyó: {行|い}って (nem {行|い}いて).' },
      { q: '„Ez a szoba tágas és világos." Mi hiányzik?', jp: 'この{部屋|へや}は{広|ひろ}＿、{明|あか}るいです。', a: 'くて', wrong: ['で', 'いて', 'と'], why: 'い-melléknév összekötve: い → くて.' },
      { q: '„Hazamegyek, és megvacsorázom." Mi hiányzik?', jp: 'うちへ＿、{晩|ばん}ごはんを{食|た}べます。', a: '{帰|かえ}って', wrong: ['{帰|かえ}りて', '{帰|かえ}ります', '{帰|かえ}んで'], why: 'り → って; a て-alak köti össze a cselekvéseket.' },
      { q: 'Melyik mondat jelenti: „A teszt nem volt nehéz."', a: 'テストは{難|むずか}しくなかったです。', wrong: ['テストは{難|むずか}しいじゃありませんでした。', 'テストは{難|むずか}しくないでした。', 'テストは{難|むずか}しかったくないです。'], why: 'い-melléknév tagadó múltja: くなかったです.' },
      { q: 'Mit jelent: {旅行|りょこう}はどうでしたか。', a: 'Milyen volt az utazás?', wrong: ['Hová utaztál?', 'Mikor volt az utazás?', 'Milyen az utazás?'], why: 'どうでしたか = milyen volt?' },
      { q: 'Melyik a helyes múlt idő?', a: '{楽|たの}しかったです。', wrong: ['{楽|たの}しいでした。', '{楽|たの}しでした。', '{楽|たの}しいかったです。'], why: 'Az い-melléknév maga ragozódik: い → かった; a です jelen időben marad.' },
      { q: 'Mi a きれいです múlt ideje?', a: 'きれいでした', wrong: ['きれかったです', 'きれいかったです', 'きれくでした'], why: 'A きれい な-melléknév: a です ragozódik.' },
      { q: 'Mi a {話|はな}します て-alakja?', a: '{話|はな}して', wrong: ['{話|はな}って', '{話|はな}いて', '{話|はな}しって'], why: 'A し végű tő して-t kap: a ます helyére egyszerűen て kerül.' },
      { q: 'Mi az {泳|およ}ぎます て-alakja?', a: '{泳|およ}いで', wrong: ['{泳|およ}いて', '{泳|およ}んで', '{泳|およ}って'], why: 'A ぎ végű tő いで-t kap: a て is zöngés lesz.' },
      { q: 'Mi az {遊|あそ}びます て-alakja?', a: '{遊|あそ}んで', wrong: ['{遊|あそ}びて', '{遊|あそ}って', '{遊|あそ}いて'], why: 'A み, び, に végű tő んで-t kap.' },
      { q: 'Mi az {起|お}きます (II. csoport) て-alakja?', a: '{起|お}きて', wrong: ['{起|お}いて', '{起|お}って', '{起|お}んで'], why: 'II. csoportú ige: a ます helyére egyszerűen て kerül.' },
      { q: '„A város csendes és szép." Melyik a helyes?', a: '{町|まち}は{静|しず}かで、きれいです。', wrong: ['{町|まち}は{静|しず}かくて、きれいです。', '{町|まち}は{静|しず}かと、きれいです。', '{町|まち}は{静|しず}かて、きれいです。'], why: 'A な-melléknév kapcsoló alakja で.' },
      {
        q: 'Mikor történt? {朝|あさ}{起|お}きて、パンを{食|た}べました。',
        a: 'a múltban: a mondat idejét az utolsó ige adja meg',
        wrong: ['a jelenben: a て-alak jelen idejű', 'nem lehet tudni', 'a jövőben'],
        why: 'A て-alaknak nincs ideje; a {食|た}べました múlt idő az egész mondatra érvényes.'
      },
      { q: 'A barátod elmeséli, hogy remek hétvégéje volt. Mit felelsz?', a: 'それはよかったですね。', wrong: ['それは{大変|たいへん}でしたね。', 'お{元気|げんき}ですか。', 'いただきます。'], why: 'A jó hírre: それはよかったですね; a kellemetlenre: それは{大変|たいへん}でしたね.' },
      { q: 'Mi kerül a borítékon a címzett neve után?', a: '{様|さま}', wrong: ['さん', 'くん', 'ちゃん'], why: 'Írásban, címzésben a tiszteletteljesebb {様|さま} áll; tanárnál {先生|せんせい}.' }
    ]
  },

  /* ── 10. lecke ────────────────────────────────────── */
  {
    id: 'l10', no: 10, book: 'Dekiru 1', title: 'Melyik a jobb?',
    lead: 'Összehasonlítasz és választasz, megkérsz valakit valamire, megkérdezed, hogyan működik egy gép, és elmondod, mi után mit csinálsz.',
    cando: [
      'Összehasonlítasz két dolgot, és megmondod, melyik a legjobb.',
      'Választasz az étlapról, és megmondod, mit kérsz.',
      'Udvariasan megkérsz valakit valamire, és megérted az utasításokat.',
      'Megkérdezed, hogyan kell használni egy gépet vagy szolgáltatást.'
    ],
    intro: [
      'A japánban <b>nincs középfok és felsőfok</b>: a melléknév alakja ugyanaz marad, akár „gyors", akár „gyorsabb", akár „a leggyorsabb". A hasonlítást a mondat többi része fejezi ki: a <b>より</b> („-nál, -nél"), a <b>のほうが</b> („inkább ez") és az <b>いちばん</b> („első számú").',
      'A lecke másik fele az előző leckében megtanult <b>て-alak</b> első három használata. A <b>〜てください</b> kér vagy utasít, a <b>〜てから</b> sorrendet állít fel, a <b>〜てみます</b> pedig azt mondja: megpróbálom, hogy lássam, milyen. Ha a て-alak képzése még bizonytalan, lapozz vissza a 9. lecke táblázataihoz.',
      'Mindezt olyan helyzetekben gyakorlod, amelyekbe Japánban az első napon belefutsz: menza, jegyautomata, könyvtári beiratkozás.'
    ],
    dialogue: {
      title: 'A menzán',
      scene: 'Anna először ebédel a diákmenzán. Kennel együtt nézik a kínálatot, de a jegyautomatával nem boldogul.',
      lines: [
        { who: 'Anna', jp: 'いいにおいですね。{学食|がくしょく}ははじめてです。', romaji: 'Ii nioi desu ne. Gakushoku wa hajimete desu.', hu: 'De jó illat van! Most vagyok először a menzán.' },
        { who: 'Ken', jp: 'レストランより{安|やす}くて、おいしいですよ。{何|なに}にしますか。', romaji: 'Resutoran yori yasukute, oishii desu yo. Nani ni shimasu ka.', hu: 'Olcsóbb, mint egy étterem, és finom. Mit választasz?' },
        { who: 'Anna', jp: 'うどんとカレーとどちらがおいしいですか。', romaji: 'Udon to karē to dochira ga oishii desu ka.', hu: 'Az udon vagy a curry a finomabb?' },
        {
          who: 'Ken',
          jp: 'カレーのほうがおいしいです。ここのメニューの{中|なか}でカレーがいちばん{人気|にんき}です。',
          romaji: 'Karē no hō ga oishii desu. Koko no menyū no naka de karē ga ichiban ninki desu.',
          hu: 'A curry finomabb. Az itteni ételek közül a curry a legnépszerűbb.'
        },
        { who: 'Anna', jp: 'じゃあ、カレーにします。{食|た}べてみます。', romaji: 'Jā, karē ni shimasu. Tabete mimasu.', hu: 'Akkor a curryt választom. Megkóstolom.' },
        { who: 'Anna', jp: 'あれ？この{機械|きかい}はどうやって{使|つか}いますか。', romaji: 'Are? Kono kikai wa dō yatte tsukaimasu ka.', hu: 'Hogyan? Ezt a gépet hogy kell használni?' },
        { who: 'Ken', jp: 'まず、ここにお{金|かね}を{入|い}れてください。', romaji: 'Mazu, koko ni o-kane o irete kudasai.', hu: 'Először ide dobd be a pénzt.' },
        { who: 'Ken', jp: 'お{金|かね}を{入|い}れてから、カレーのボタンを{押|お}してください。', romaji: 'O-kane o irete kara, karē no botan o oshite kudasai.', hu: 'Miután bedobtad a pénzt, nyomd meg a curry gombját.' },
        { who: 'Anna', jp: 'はい。あ、{食券|しょっけん}が{出|で}ました。', romaji: 'Hai. A, shokken ga demashita.', hu: 'Jó. Ó, kijött az ételjegy!' },
        { who: 'Ken', jp: '{最後|さいご}に、おつりを{取|と}ってくださいね。', romaji: 'Saigo ni, o-tsuri o totte kudasai ne.', hu: 'Végül ne felejtsd el kivenni a visszajárót.' },
        { who: 'Anna', jp: 'わかりました。ありがとうございます。', romaji: 'Wakarimashita. Arigatō gozaimasu.', hu: 'Értem. Köszönöm szépen.' }
      ],
      notes: [
        'A <b>{何|なに}にしますか</b> („mit választasz?") és a <b>カレーにします</b> („a curryt választom") a rendelés két kulcsmondata. A 〜にします döntést jelent, nem azt, hogy „curryvé teszem".',
        'A <b>レストランより{安|やす}くて</b> mondatban a のほうが rész elmaradt, mert a téma (a menza) már ismert: „(a menza) olcsóbb, mint az étterem".',
        'Az utasítás három sorrendszava: <b>まず</b> (először), <b>それから</b> (aztán), <b>{最後|さいご}に</b> (végül). Ezekkel bármilyen folyamatot el tudsz magyarázni.',
        'A <b>{出|で}ました</b> („kijött") tárgyatlan ige: a jegy magától jön ki. A gombot viszont te nyomod meg: {押|お}します.',
        'A kérés végi <b>ね</b> puhít: a 〜てくださいね barátságos figyelmeztetés, nem parancs.'
      ]
    },
    points: [
      {
        title: 'A より B のほうが', sub: 'B …-bb, mint A',
        pattern: 'A より B のほうが + melléknév',
        body: 'A japánban nincs középfok: a melléknév alakja nem változik. A <b>より</b> jelöli, amihez hasonlítasz („-nál, -nél"), a <b>のほうが</b> pedig azt, ami „inkább" olyan. A より-s rész el is maradhat.',
        more: [
          'A mondat két oszlopra épül. A <b>より</b> előtt az áll, <b>amihez</b> hasonlítasz (a magyar „-nál, -nél"). A <b>のほうが</b> előtt az, amelyik <b>inkább</b> olyan. A melléknév maga nem változik: {速|はや}い egyszerre „gyors" és „gyorsabb".',
          'A két rész sorrendje szabad: バスより{電車|でんしゃ}のほうが{速|はや}いです és {電車|でんしゃ}のほうがバスより{速|はや}いです ugyanazt jelenti.',
          'Ha a „nyertes" a mondat témája, a のほうが elmarad, és は áll: {電車|でんしゃ}<b>は</b>バスより{速|はや}いです (a vonat gyorsabb a busznál).'
        ],
        tables: [
          {
            caption: 'A hasonlítás három formája',
            head: ['Minta', 'Példa'],
            rows: [
              ['A より B のほうが …', 'バスより でんしゃのほうが はやいです。'],
              ['B のほうが A より …', 'でんしゃのほうが バスより はやいです。'],
              ['B は A より …', 'でんしゃは バスより はやいです。']
            ]
          }
        ],
        examples: [
          { jp: 'バスより{電車|でんしゃ}のほうが{速|はや}いです。', romaji: 'Basu yori densha no hō ga hayai desu.', hu: 'A vonat gyorsabb, mint a busz.' },
          { jp: '{犬|いぬ}より{猫|ねこ}のほうが{好|す}きです。', romaji: 'Inu yori neko no hō ga suki desu.', hu: 'A macskát jobban szeretem, mint a kutyát.' },
          { jp: '{今日|きょう}はきのうより{寒|さむ}いです。', romaji: 'Kyō wa kinō yori samui desu.', hu: 'Ma hidegebb van, mint tegnap.' },
          { jp: '{東京|とうきょう}は{大阪|おおさか}より{大|おお}きいです。', romaji: 'Tōkyō wa Ōsaka yori ōkii desu.', hu: 'Tokió nagyobb, mint Oszaka.' },
          { jp: '{肉|にく}より{魚|さかな}のほうが{体|からだ}にいいです。', romaji: 'Niku yori sakana no hō ga karada ni ii desu.', hu: 'A hal egészségesebb, mint a hús.' }
        ],
        notes: [
          'A ほう szó jelentése „irány, oldal": B のほうが = „a B oldala (inkább)".',
          'A különbség mértékét határozószó adja meg: <b>ずっと</b> (sokkal), <b>{少|すこ}し</b> (kicsit): バスよりずっと{速|はや}いです.',
          'A {好|す}き, {上手|じょうず} és a többi が-t kérő szó itt is működik: {犬|いぬ}より{猫|ねこ}のほうが{好|す}きです.'
        ],
        mistakes: [
          { bad: '{電車|でんしゃ}のほうがバスより{速|はや}いよりです。', good: '{電車|でんしゃ}のほうがバスより{速|はや}いです。', why: 'A より a hasonlítás alapja után áll, nem a melléknév után.' }
        ]
      },
      {
        title: 'A と B と どちらが', sub: 'melyik …-bb?',
        pattern: 'A と B と どちらが + melléknév ですか',
        body: 'Két dolog közül a <b>どちら</b> (melyik) kérdez, akár tárgyról, akár emberről, akár helyről van szó. A válasz: <b>〜のほうが</b>… Ha mindegy: <b>どちらも</b> (mindkettő).',
        more: [
          'A <b>どちら</b> („melyik a kettő közül?") mindenre jó: tárgyra, emberre, helyre, időpontra. Két dolog közül soha nem どれ-t vagy だれ-t használunk. Lazább, beszélt alakja a <b>どっち</b>.',
          'A két lehetőséget <b>と</b> köti össze, és a második után is állhat と: A と B <b>と</b>、どちらが… A válasz: <b>〜のほうが</b>…',
          'Három lehetséges válasz van: az egyik (B のほうが…), mindkettő egyformán (<b>どちらも</b> + állítás), vagy egyik sem (<b>どちらも</b> + tagadás).'
        ],
        tables: [
          {
            caption: 'Válaszok a どちら kérdésre',
            head: ['Válasz', 'Japánul'],
            rows: [
              ['az egyik', 'こうちゃ<b>のほうが</b> すきです。'],
              ['mindkettő', '<b>どちらも</b> すきです。'],
              ['egyik sem', '<b>どちらも</b> すきじゃありません。']
            ]
          }
        ],
        examples: [
          { jp: 'コーヒーと{紅茶|こうちゃ}とどちらが{好|す}きですか。', romaji: 'Kōhī to kōcha to dochira ga suki desu ka.', hu: 'A kávét vagy a teát szereted jobban?' },
          { jp: '{紅茶|こうちゃ}のほうが{好|す}きです。', romaji: 'Kōcha no hō ga suki desu.', hu: 'A teát szeretem jobban.' },
          { jp: 'どちらも{好|す}きです。', romaji: 'Dochira mo suki desu.', hu: 'Mindkettőt szeretem.' },
          { jp: '{土曜日|どようび}と{日曜日|にちようび}とどちらが{暇|ひま}ですか。', romaji: 'Doyōbi to nichiyōbi to dochira ga hima desu ka.', hu: 'Szombaton vagy vasárnap érsz rá inkább?' },
          { jp: 'どちらも{好|す}きじゃありません。', romaji: 'Dochira mo suki ja arimasen.', hu: 'Egyiket sem szeretem.' }
        ],
        mistakes: [
          { bad: 'コーヒーと{紅茶|こうちゃ}とどれが{好|す}きですか。', good: 'コーヒーと{紅茶|こうちゃ}とどちらが{好|す}きですか。', why: 'Két dolog közül どちら kérdez; a どれ három vagy több közül választ.' }
        ]
      },
      {
        title: '〜がいちばん', sub: 'a leg…-bb',
        pattern: '(〜の{中|なか}で) A がいちばん + melléknév',
        body: 'Három vagy több közül az <b>いちばん</b> fejezi ki a felsőfokot. A csoportot a <b>〜の{中|なか}で</b> adja meg; a kérdőszó dologra <b>{何|なに}</b>, helyre <b>どこ</b>, emberre <b>だれ</b>, időre <b>いつ</b>.',
        more: [
          'Az <b>いちばん</b> szó szerint „első számú": a melléknév elé téve felsőfokot ad. A melléknév itt sem változik.',
          'A csoportot, amelyből választasz, a <b>で</b> jelöli: クラス<b>で</b> (az osztályban), {日本|にほん}<b>で</b> (Japánban), スポーツ<b>の{中|なか}で</b> (a sportok közül). Ha felsorolod a tagokat, と köti össze őket: A と B と C <b>の{中|なか}で</b>…',
          'A kérdőszó attól függ, mi a csoport: dolgoknál <b>{何|なに}</b> (vagy felsorolt dolgoknál <b>どれ</b>), embereknél <b>だれ</b>, helyeknél <b>どこ</b>, időpontoknál <b>いつ</b>.'
        ],
        tables: [
          {
            caption: 'Kérdőszó a felsőfokhoz',
            head: ['Csoport', 'Kérdőszó', 'Példa'],
            rows: [
              ['dolgok (fajta)', 'なに', 'くだもので <b>なに</b>が いちばん すきですか。'],
              ['felsorolt dolgok', 'どれ', 'この みっつで <b>どれ</b>が いちばん やすいですか。'],
              ['emberek', 'だれ', 'クラスで <b>だれ</b>が いちばん はやいですか。'],
              ['helyek', 'どこ', 'にほんで <b>どこ</b>が いちばん きれいですか。'],
              ['időpontok', 'いつ', 'いちねんで <b>いつ</b>が いちばん さむいですか。']
            ]
          }
        ],
        examples: [
          { jp: 'スポーツの{中|なか}で{何|なに}がいちばん{好|す}きですか。', romaji: 'Supōtsu no naka de nani ga ichiban suki desu ka.', hu: 'A sportok közül melyiket szereted a legjobban?' },
          { jp: 'サッカーがいちばん{好|す}きです。', romaji: 'Sakkā ga ichiban suki desu.', hu: 'A focit szeretem a legjobban.' },
          { jp: 'クラスでリーさんがいちばん{背|せ}が{高|たか}いです。', romaji: 'Kurasu de Rī-san ga ichiban se ga takai desu.', hu: 'Az osztályban Lí a legmagasabb.' },
          { jp: '{日本|にほん}でどこがいちばんきれいですか。', romaji: 'Nihon de doko ga ichiban kirei desu ka.', hu: 'Japánban melyik hely a legszebb?' },
          { jp: '{一年|いちねん}でいつがいちばん{寒|さむ}いですか。', romaji: 'Ichinen de itsu ga ichiban samui desu ka.', hu: 'Az évben mikor van a leghidegebb?' }
        ],
        notes: [
          'A három fokozat egymás mellett: {速|はや}いです (gyors) · 〜より{速|はや}いです (gyorsabb) · いちばん{速|はや}いです (a leggyorsabb).'
        ],
        mistakes: [
          { bad: 'スポーツの{中|なか}でどちらがいちばん{好|す}きですか。', good: 'スポーツの{中|なか}で{何|なに}がいちばん{好|す}きですか。', why: 'A どちら csak két dolog közül választ; három vagy több közül {何|なに} vagy どれ kell.' }
        ]
      },
      {
        title: '〜にします', sub: 'választás, döntés',
        pattern: 'főnév + に します',
        body: 'Ha több lehetőség közül <b>választasz</b>, a kiválasztott dolog után <b>に します</b> áll: コーヒーにします (a kávét választom). Étteremben, boltban, programegyeztetéskor ez a döntés bejelentése.',
        more: [
          'A rákérdezés: <b>{何|なに}にしますか</b> (mit választasz?), <b>どれにしますか</b> (melyiket?), <b>いつにしますか</b> (mikorra tegyük?). A válaszban a kérdőszó helyére a választásod kerül.',
          'Ez nem ugyanaz, mint a 〜をください: az kérés („adjon"), ez döntés („emellett döntök"). Rendeléskor mindkettő elhangozhat egymás után.'
        ],
        tables: [
          {
            caption: 'Kérdés és döntés',
            head: ['Kérdés', 'Válasz'],
            rows: [
              ['なに<b>に しますか</b>。', 'うどん<b>に します</b>。'],
              ['どれ<b>に しますか</b>。', 'これ<b>に します</b>。'],
              ['いつ<b>に しますか</b>。', 'どようび<b>に します</b>。']
            ]
          }
        ],
        examples: [
          { jp: 'わたしはうどんにします。', romaji: 'Watashi wa udon ni shimasu.', hu: 'Én az udont választom.' },
          { jp: '{飲|の}み{物|もの}は{何|なに}にしますか。', romaji: 'Nomimono wa nani ni shimasu ka.', hu: 'Innivalónak mit kérsz?' },
          { jp: 'パーティーは{土曜日|どようび}にしましょう。', romaji: 'Pātī wa doyōbi ni shimashō.', hu: 'A bulit tegyük szombatra!' }
        ],
        tip: 'A にします után nem áll を: コーヒーにします, nem „コーヒーをにします".'
      },
      {
        title: '〜てください', sub: 'kérés',
        pattern: 'ige て-alak + ください',
        body: 'A て-alak és a <b>ください</b> együtt udvarias kérés vagy utasítás: „kérem, …". Még udvariasabb a <b>〜てくださいませんか</b>.',
        more: [
          'A <b>〜てください</b> két dolgot jelenthet a helyzettől függően. Ha a kérés a <b>te</b> érdekedben áll, akkor kérés („kérem, segítsen"). Ha a <b>másik</b> érdekében, akkor kínálás vagy utasítás („tessék, üljön le", „írja ide a nevét").',
          'Barátok között a ください elmarad: ちょっと{待|ま}って (várj egy kicsit). Udvariasabb, ha kérdésbe csomagolod: 〜てくださいませんか (megtenné, hogy…?).',
          'Feljebbvalót nem illik 〜てください alakkal utasítani; tanárnak, főnöknek a kérdő forma való.'
        ],
        tables: [
          {
            caption: 'A kérés fokozatai',
            head: ['Alak', 'Kinek?', 'Példa'],
            rows: [
              ['〜て', 'barátnak, családnak', 'ちょっと まって。'],
              ['〜てください', 'általános udvarias', 'ちょっと まってください。'],
              ['〜てくださいませんか', 'idegennek, feljebbvalónak', 'ちょっと まってくださいませんか。']
            ]
          }
        ],
        examples: [
          { jp: 'ここに{名前|なまえ}を{書|か}いてください。', romaji: 'Koko ni namae o kaite kudasai.', hu: 'Kérem, írja ide a nevét.' },
          { jp: 'ちょっと{待|ま}ってください。', romaji: 'Chotto matte kudasai.', hu: 'Egy pillanat türelmet kérek.' },
          { jp: 'もう{一度|いちど}{言|い}ってください。', romaji: 'Mō ichido itte kudasai.', hu: 'Kérem, mondja még egyszer.' },
          { jp: 'どうぞ、{座|すわ}ってください。', romaji: 'Dōzo, suwatte kudasai.', hu: 'Tessék, foglaljon helyet.' },
          { jp: 'すみませんが、{写真|しゃしん}を{撮|と}ってくださいませんか。', romaji: 'Sumimasen ga, shashin o totte kudasaimasen ka.', hu: 'Elnézést, lefényképezne minket?' }
        ],
        notes: [
          'A 4. leckében tanult 〜をください tárgyat kér („adjon egy…"); a 〜てください cselekvést („tegye meg…"). Az első főnév, a második ige て-alakja után áll.'
        ],
        mistakes: [
          { bad: '{書|か}きますください。', good: '{書|か}いてください。', why: 'A ください elé az ige て-alakja kell.' }
        ]
      },
      {
        title: '〜てから', sub: 'miután…',
        pattern: 'ige て-alak + から、…',
        body: 'A <b>てから</b> a sorrendet hangsúlyozza: az első cselekvés befejezése után jön a második.',
        more: [
          'A <b>〜てから</b> azt hangsúlyozza, hogy a második cselekvés <b>csak az első után</b> történik. A sima て-alak csak felsorol („és"), a てから sorrendet szab („miután").',
          'Az idő itt is a mondat végén dől el: a てから rész mindig ugyanaz, akár múltról, akár jövőről beszélsz.',
          'Időtartammal együtt azt fejezi ki, mióta tart valami: {日本|にほん}へ{来|き}てから{三年|さんねん}になります (három éve vagyok Japánban).'
        ],
        examples: [
          { jp: '{手|て}を{洗|あら}ってから、{食|た}べます。', romaji: 'Te o aratte kara, tabemasu.', hu: 'Miután kezet mostam, eszem.' },
          { jp: '{宿題|しゅくだい}をしてから、{遊|あそ}びます。', romaji: 'Shukudai o shite kara, asobimasu.', hu: 'Miután megcsináltam a leckét, játszom.' },
          { jp: '{日本|にほん}へ{来|き}てから、{三年|さんねん}になります。', romaji: 'Nihon e kite kara, sannen ni narimasu.', hu: 'Három éve, hogy Japánba jöttem.' },
          { jp: 'お{金|かね}を{入|い}れてから、ボタンを{押|お}します。', romaji: 'O-kane o irete kara, botan o oshimasu.', hu: 'Miután bedobtad a pénzt, megnyomod a gombot.' },
          { jp: 'うちへ{帰|かえ}ってから、{電話|でんわ}します。', romaji: 'Uchi e kaette kara, denwa shimasu.', hu: 'Miután hazaértem, telefonálok.' }
        ],
        notes: [
          'Háromféle から van eddig: főnév után „-tól" ({九時|くじ}から), mondat után „mert" ({雨|あめ}ですから), て-alak után „miután" ({食|た}べてから).'
        ],
        mistakes: [
          { bad: '{手|て}を{洗|あら}いますから、{食|た}べます。', good: '{手|て}を{洗|あら}ってから、{食|た}べます。', why: 'A 〜ますから azt jelentené: „mert kezet mosok". A „miután" a て-alak + から.' }
        ],
        tip: 'Ne keverd: {九時|くじ}<b>から</b> (kilenctől) főnév után áll, a て<b>から</b> ige て-alakja után.'
      },
      {
        title: '〜てみます', sub: 'kipróbálom',
        pattern: 'ige て-alak + みます',
        body: 'A <b>てみます</b> azt jelenti: megteszem, hogy lássam, milyen. Kóstolásra, kipróbálásra, felpróbálásra.',
        more: [
          'A <b>みます</b> itt segédige, és elveszíti a „néz" jelentését: azt fejezi ki, hogy a cselekvést <b>próbaképp</b> teszed meg, hogy megtudd, milyen. Ezért hiraganával írjuk.',
          'A みます ugyanúgy ragozódik, mint a {見|み}ます: 〜てみました (kipróbáltam), 〜てみたいです (szeretném kipróbálni), 〜てみてください (próbálja ki), 〜てみませんか (nem próbálnánk ki?).'
        ],
        tables: [
          {
            caption: 'A てみます alakjai',
            head: ['Alak', 'Jelentés', 'Példa'],
            rows: [
              ['〜てみます', 'kipróbálom', 'たべてみます'],
              ['〜てみました', 'kipróbáltam', 'たべてみました'],
              ['〜てみたいです', 'szeretném kipróbálni', 'たべてみたいです'],
              ['〜てみてください', 'próbálja ki', 'たべてみてください'],
              ['〜てみませんか', 'nem próbálnánk ki?', 'たべてみませんか']
            ]
          }
        ],
        examples: [
          { jp: 'この{料理|りょうり}を{食|た}べてみます。', romaji: 'Kono ryōri o tabete mimasu.', hu: 'Megkóstolom ezt az ételt.' },
          { jp: '{使|つか}ってみてください。', romaji: 'Tsukatte mite kudasai.', hu: 'Próbálja ki!' },
          { jp: '{一度|いちど}{行|い}ってみたいです。', romaji: 'Ichido itte mitai desu.', hu: 'Egyszer szeretnék elmenni oda, megnézni, milyen.' },
          { jp: 'この{靴|くつ}をはいてみます。', romaji: 'Kono kutsu o haite mimasu.', hu: 'Felpróbálom ezt a cipőt.' },
          { jp: '{後|うし}ろの{人|ひと}に{聞|き}いてみませんか。', romaji: 'Ushiro no hito ni kiite mimasen ka.', hu: 'Nem kérdeznénk meg a mögöttünk állót?' }
        ],
        notes: [
          'Ne keverd a „megpróbál megtenni valami nehezet" jelentéssel: a てみます kipróbálást jelent, nem erőfeszítést.'
        ]
      },
      {
        title: 'どうやって・まず・それから', sub: 'hogyan? — lépésről lépésre',
        pattern: 'どうやって 〜ますか · まず… それから… {最後|さいご}に…',
        body: 'A <b>どうやって</b> a módra kérdez: „hogyan, milyen módon?". A válasz többnyire lépések sora, amelyeket három szó rendez sorba: <b>まず</b> (először), <b>それから</b> (aztán), <b>{最後|さいご}に</b> (végül).',
        more: [
          'A lépéseket 〜てください alakban mondod, ha valakit utasítasz, és 〜ます alakban, ha csak leírod a folyamatot. Két lépés között a 〜てから is összekapcsolhat: お{金|かね}を{入|い}れてから、ボタンを{押|お}します.',
          'A どうやって útvonalra is kérdez: {駅|えき}までどうやって{行|い}きますか (hogyan jutok el az állomásra?).'
        ],
        examples: [
          { jp: 'この{機械|きかい}はどうやって{使|つか}いますか。', romaji: 'Kono kikai wa dō yatte tsukaimasu ka.', hu: 'Hogyan kell használni ezt a gépet?' },
          { jp: 'まず、ここにお{金|かね}を{入|い}れます。', romaji: 'Mazu, koko ni o-kane o iremasu.', hu: 'Először ide bedobod a pénzt.' },
          { jp: 'それから、ボタンを{押|お}します。', romaji: 'Sorekara, botan o oshimasu.', hu: 'Aztán megnyomod a gombot.' },
          { jp: '{最後|さいご}に、{切符|きっぷ}を{取|と}ります。', romaji: 'Saigo ni, kippu o torimasu.', hu: 'Végül kiveszed a jegyet.' }
        ],
        notes: [
          'A sorrendszavak a mondat <b>elején</b> állnak, utánuk vessző.',
          'Az „először" másik szava a <b>{最初|さいしょ}に</b>; a まず hétköznapibb.'
        ]
      }
    ],
    phrases: [
      { jp: '{何|なに}にしますか。', romaji: 'Nani ni shimasu ka.', hu: 'Mit választasz? Mit kérsz?' },
      { jp: 'これにします。', romaji: 'Kore ni shimasu.', hu: 'Ezt választom.' },
      { jp: 'どうやって{使|つか}いますか。', romaji: 'Dō yatte tsukaimasu ka.', hu: 'Hogyan kell használni?' },
      { jp: 'ちょっと{教|おし}えてください。', romaji: 'Chotto oshiete kudasai.', hu: 'Megmutatnád? Elmondanád?', note: 'Az {教|おし}えます „tanít", de „megmond, megmutat" értelemben is használják.' },
      { jp: 'もう{一度|いちど}お{願|ねが}いします。', romaji: 'Mō ichido onegai shimasu.', hu: 'Még egyszer, legyen szíves.' },
      { jp: 'ゆっくり{話|はな}してください。', romaji: 'Yukkuri hanashite kudasai.', hu: 'Kérem, beszéljen lassan.' },
      { jp: 'この{本|ほん}を{借|か}りたいんですが…。', romaji: 'Kono hon o karitai n desu ga…', hu: 'Ezt a könyvet szeretném kikölcsönözni…' },
      { jp: '{学生証|がくせいしょう}でいいですか。', romaji: 'Gakuseishō de ii desu ka.', hu: 'A diákigazolvány megfelel?', note: 'A 〜で いいですか = „…-val/-vel jó lesz?".' },
      { jp: 'さあ、わかりません。', romaji: 'Sā, wakarimasen.', hu: 'Hát, nem tudom.', note: 'A さあ tétovázást jelez: „nos, hm".' }
    ],
    words: [
      {
        title: 'A menzán',
        items: [
          { jp: '{学食|がくしょく}', romaji: 'gakushoku', hu: 'diákmenza' },
          { jp: 'メニュー', romaji: 'menyū', hu: 'étlap, kínálat' },
          { jp: '{食券|しょっけん}', romaji: 'shokken', hu: 'ételjegy' },
          { jp: 'うどん', romaji: 'udon', hu: 'vastag búzatészta-leves' },
          { jp: 'ラーメン', romaji: 'rāmen', hu: 'rámen' },
          { jp: 'カレー', romaji: 'karē', hu: 'curry rizzsel' },
          { jp: 'おにぎり', romaji: 'onigiri', hu: 'rizsgombóc' },
          { jp: 'みそ{汁|しる}', romaji: 'misoshiru', hu: 'miszoleves' },
          { jp: '{量|りょう}', romaji: 'ryō', hu: 'mennyiség, adag' },
          { jp: '{人気|にんき}', romaji: 'ninki', hu: 'népszerűség' }
        ]
      },
      {
        title: 'Gépek, gombok',
        items: [
          { jp: '{機械|きかい}', romaji: 'kikai', hu: 'gép' },
          { jp: 'ボタン', romaji: 'botan', hu: 'gomb' },
          { jp: 'お{金|かね}', romaji: 'o-kane', hu: 'pénz' },
          { jp: 'おつり', romaji: 'o-tsuri', hu: 'visszajáró' },
          { jp: '{入|い}れます', romaji: 'iremasu', hu: 'betesz, bedob' },
          { jp: '{押|お}します', romaji: 'oshimasu', hu: 'megnyom' },
          { jp: '{取|と}ります', romaji: 'torimasu', hu: 'kivesz, elvesz' },
          { jp: '{使|つか}います', romaji: 'tsukaimasu', hu: 'használ' },
          { jp: '{出|で}ます', romaji: 'demasu', hu: 'kijön' }
        ]
      },
      {
        title: 'Könyvtár, ügyintézés',
        items: [
          { jp: '{借|か}ります', romaji: 'karimasu', hu: 'kölcsönvesz' },
          { jp: '{返|かえ}します', romaji: 'kaeshimasu', hu: 'visszaad' },
          { jp: 'カード', romaji: 'kādo', hu: 'kártya' },
          { jp: '{学生証|がくせいしょう}', romaji: 'gakuseishō', hu: 'diákigazolvány' },
          { jp: '{受付|うけつけ}', romaji: 'uketsuke', hu: 'pult, recepció' },
          { jp: '{紙|かみ}', romaji: 'kami', hu: 'papír, űrlap' },
          { jp: '{待|ま}ちます', romaji: 'machimasu', hu: 'vár' },
          { jp: '{教|おし}えます', romaji: 'oshiemasu', hu: 'tanít, megmond' }
        ]
      }
    ],
    culture: [
      {
        title: 'Előbb a jegy, aztán az étel',
        text: 'A japán menzákon, rámenezőkben és sok olcsó étteremben nem a pultnál fizetsz. A bejáratnál <b>jegyautomata</b> áll: bedobod a pénzt, megnyomod a kiválasztott étel gombját, és a gép kiad egy <b>{食券|しょっけん}</b>-t. Ezt adod át a pultnál, és már hozzák is az ételt. A gombokon gyakran csak japán felirat van, ezért érdemes megjegyezni néhány étel nevét, vagy a kirakatban álló, viaszból készült ételmásolatok alapján választani.'
      },
      {
        title: 'Automata minden sarkon',
        text: 'Japánban több millió árusító automata működik. Hideg és <b>meleg</b> italt szinte bárhol vehetsz, de van automata jégkrémre, levesre, újságra, esernyőre, elemre, sőt meleg ételre is. Az automaták éjjel is világítanak az utcán, és ritkán rongálják meg őket. A meleg italok gombját piros, a hidegekét kék sáv jelzi.'
      },
      {
        title: 'A menza klasszikusai',
        text: 'Néhány étel, amellyel minden diák találkozik: a <b>カレーライス</b> sűrű curryszósz rizzsel; a <b>かつ{丼|どん}</b> rántott sertésszelet tojással rizsen; az <b>おでん</b> szójaszószos lében főtt zöldségek és halpogácsák, főleg télen. Szinte mindenhez jár <b>みそ{汁|しる}</b>, az erjesztett szójababból készült leves. A nyugati ételek neve katakanával íródik: スパゲッティ, ピザ, サラダ.'
      }
    ],
    quiz: [
      { q: '„A vonat gyorsabb, mint a busz." Mi hiányzik?', jp: 'バス＿{電車|でんしゃ}のほうが{速|はや}いです。', a: 'より', wrong: ['から', 'まで', 'と'], why: 'Amihez hasonlítasz, az より-t kap.' },
      { q: '„A kávét vagy a teát szereted jobban?" Mi hiányzik?', jp: 'コーヒーと{紅茶|こうちゃ}と＿が{好|す}きですか。', a: 'どちら', wrong: ['どれ', 'なに', 'どんな'], why: 'Két dolog közül どちら kérdez.' },
      { q: '„A focit szeretem a legjobban." Mi hiányzik?', jp: 'サッカーが＿{好|す}きです。', a: 'いちばん', wrong: ['より', 'のほうが', 'どちら'], why: 'Felsőfok: いちばん.' },
      { q: '„Kérem, írja ide a nevét." Mi hiányzik?', jp: 'ここに{名前|なまえ}を＿ください。', a: '{書|か}いて', wrong: ['{書|か}きて', '{書|か}きます', '{書|か}く'], why: 'Kérés: て-alak + ください; {書|か}きます → {書|か}いて.' },
      { q: '„Miután kezet mostam, eszem." Mi hiányzik?', jp: '{手|て}を{洗|あら}って＿、{食|た}べます。', a: 'から', wrong: ['より', 'まで', 'みて'], why: 'て-alak + から = miután.' },
      { q: 'Mit jelent: {使|つか}ってみてください。', a: 'Próbálja ki!', wrong: ['Ne használja!', 'Használni szeretném.', 'Használtam már.'], why: 'てみます = megteszem, hogy lássam, milyen.' },
      { q: 'Hogyan mondod: „Mindkettőt szeretem."', a: 'どちらも{好|す}きです。', wrong: ['どちらが{好|す}きです。', 'どちらか{好|す}きです。', 'いちばん{好|す}きです。'], why: 'どちらも = mindkettő.' },
      {
        q: 'Melyik mondat jelenti: „Ma hidegebb van, mint tegnap."',
        a: '{今日|きょう}はきのうより{寒|さむ}いです。',
        wrong: ['きのうは{今日|きょう}より{寒|さむ}いです。', '{今日|きょう}はきのうと{寒|さむ}いです。', '{今日|きょう}はきのうがいちばん{寒|さむ}いです。'],
        why: 'Ami után より áll, ahhoz hasonlítasz: ma hidegebb, mint tegnap.'
      },
      { q: 'Mi a {待|ま}ちます て-alakja?', a: '{待|ま}って', wrong: ['{待|ま}ちて', '{待|ま}いて', '{待|ま}んで'], why: 'い・ち・り → って.' },
      { q: '„A sportok közül melyiket szereted a legjobban?" Mi hiányzik?', jp: 'スポーツの＿で{何|なに}がいちばん{好|す}きですか。', a: '{中|なか}', wrong: ['{上|うえ}', '{前|まえ}', '{下|した}'], why: 'A csoportot a 〜の{中|なか}で adja meg.' },
      {
        q: '„Tokió nagyobb, mint Oszaka." Melyik a helyes?',
        a: '{東京|とうきょう}は{大阪|おおさか}より{大|おお}きいです。',
        wrong: [
          '{東京|とうきょう}より{大阪|おおさか}は{大|おお}きいです。',
          '{東京|とうきょう}は{大阪|おおさか}のほうが{大|おお}きいです。',
          '{東京|とうきょう}は{大阪|おおさか}より{大|おお}きいよりです。'
        ],
        why: 'A より a hasonlítás alapja (Oszaka) után áll.'
      },
      { q: 'Két dolog közül választatsz. Melyik kérdőszó kell?', a: 'どちら', wrong: ['どれ', 'なに', 'だれ'], why: 'Két dolog közül mindig どちら kérdez, akár tárgy, akár ember.' },
      { q: 'Azt kérdezik: コーヒーと{紅茶|こうちゃ}とどちらが{好|す}きですか。 Egyiket sem szereted. Mit felelsz?', a: 'どちらも{好|す}きじゃありません。', wrong: ['どちらも{好|す}きです。', 'どちらが{好|す}きじゃありません。', 'どれも{好|す}きです。'], why: 'A どちらも + tagadás = „egyik sem".' },
      { q: '„Japánban melyik hely a legszebb?" Melyik kérdőszó hiányzik?', jp: '{日本|にほん}で＿がいちばんきれいですか。', a: 'どこ', wrong: ['どちら', 'だれ', 'いつ'], why: 'Helyek közül a どこ választ.' },
      { q: 'A pincér megkérdezi: {何|なに}にしますか。 Mit felelsz?', a: 'うどんにします。', wrong: ['うどんをします。', 'うどんがします。', 'うどんでします。'], why: 'A választott dolog után に します áll.' },
      {
        q: 'Mi a különbség? {食|た}べて、{行|い}きます ↔ {食|た}べてから、{行|い}きます',
        a: 'a második azt hangsúlyozza, hogy csak evés UTÁN megyek',
        wrong: ['a második azt jelenti: „mert eszem"', 'nincs különbség', 'az első múlt, a második jelen idő'],
        why: 'A てから sorrendet szab: „miután".'
      },
      {
        q: 'Mit jelent: この{料理|りょうり}を{食|た}べてみたいです。',
        a: 'Szeretném megkóstolni ezt az ételt.',
        wrong: [
          'Megpróbálom megenni ezt az ételt, pedig nehéz.',
          'Megnéztem ezt az ételt.',
          'Meg kell ennem ezt az ételt.'
        ],
        why: 'A 〜てみます kipróbálást jelent; a みたい a vágyat fejezi ki.'
      },
      {
        q: 'Egy idegent kérsz meg, hogy fényképezzen le. Melyik a legudvariasabb?',
        a: '{写真|しゃしん}を{撮|と}ってくださいませんか。',
        wrong: ['{写真|しゃしん}を{撮|と}って。', '{写真|しゃしん}を{撮|と}ります。', '{写真|しゃしん}を{撮|と}りましょう。'],
        why: 'A 〜てくださいませんか a kérés legudvariasabb formája itt.'
      },
      {
        q: 'Mit kell először tenned egy japán menzán vagy rámenezőben?',
        a: 'ételjegyet venni az automatából',
        wrong: ['leülni, és várni a pincért', 'a pultnál fizetni evés után', 'tálcát kérni a konyhától'],
        why: 'A {食券|しょっけん}-t az automatából veszed, és azt adod át a pultnál.'
      },
      { q: 'Melyik a helyes sorrend egy folyamat elmondásakor?', a: 'まず → それから → {最後|さいご}に', wrong: ['それから → まず → {最後|さいご}に', '{最後|さいご}に → まず → それから', 'まず → {最後|さいご}に → それから'], why: 'まず = először, それから = aztán, {最後|さいご}に = végül.' }
    ]
  },

  /* ── 11. lecke ────────────────────────────────────── */
  {
    id: 'l11', no: 11, book: 'Dekiru 1', title: 'Mit tegyek?',
    lead: 'Megismered az igék rövid (egyszerű) alakjait, tanácsot adsz és kérsz, megmondod, mit ne tegyen valaki, és elboldogulsz az orvosnál.',
    cando: [
      'Képezni tudod a た-alakot és a ない-alakot.',
      'Tanácsot adsz: mit volna jó megtenni, és mit nem.',
      'Megkérsz valakit, hogy ne tegyen meg valamit.',
      'Elmondod az orvosnak, mi a bajod, és megérted az utasításait.'
    ],
    intro: [
      'Eddig minden igét udvarias, 〜ます alakban használtál. Ez a lecke megmutatja az igék másik arcát: a <b>rövid</b> (más néven egyszerű vagy közvetlen) alakokat. Négy van belőlük: a szótári alak (jelen állító), a <b>ない-alak</b> (jelen tagadó), a <b>た-alak</b> (múlt állító) és a なかった-alak (múlt tagadó).',
      'A rövid alakokra két okból van szükség. Az egyik: barátok között ezekkel beszélünk (erről szól majd a 12. lecke). A másik, most fontosabb ok: a japán nyelvtani szerkezetek többsége <b>rövid alakhoz</b> kapcsolódik. A tanács (〜たほうがいい), a tiltó kérés (〜ないでください) és a magyarázat (〜んです) mind ilyen: a mondat belsejében rövid alak áll, és csak a legvégén jelenik meg az udvarias です.',
      'A jó hír: a た-alakot már tudod. Pontosan úgy képzed, mint a て-alakot, csak て helyett た, で helyett だ áll a végén.'
    ],
    dialogue: {
      title: 'Nem érzem jól magam',
      scene: 'Anna reggel sápadtan jön le a konyhába. Szató asszony azonnal észreveszi; később Anna az orvosnál ül.',
      lines: [
        { who: 'Szató', jp: 'アンナさん、どうしたんですか。{元気|げんき}がないですね。', romaji: 'Anna-san, dō shita n desu ka. Genki ga nai desu ne.', hu: 'Anna, mi a baj? Levertnek tűnsz.' },
        { who: 'Anna', jp: '{頭|あたま}が{痛|いた}いんです。{熱|ねつ}もあります。', romaji: 'Atama ga itai n desu. Netsu mo arimasu.', hu: 'Fáj a fejem. Lázam is van.' },
        { who: 'Szató', jp: 'それは{大変|たいへん}ですね。{病院|びょういん}へ{行|い}ったほうがいいですよ。', romaji: 'Sore wa taihen desu ne. Byōin e itta hō ga ii desu yo.', hu: 'Ez nem jó. Jobb lenne orvoshoz menned.' },
        { who: 'Anna', jp: 'でも、{今日|きょう}はテストがありますから…。', romaji: 'Demo, kyō wa tesuto ga arimasu kara…', hu: 'De ma dolgozatot írunk…' },
        { who: 'Szató', jp: '{無理|むり}をしないほうがいいですよ。{今日|きょう}は{休|やす}んでください。', romaji: 'Muri o shinai hō ga ii desu yo. Kyō wa yasunde kudasai.', hu: 'Jobb, ha nem erőlteted meg magad. Ma maradj itthon.' },
        { who: 'Orvos', jp: 'どうしましたか。', romaji: 'Dō shimashita ka.', hu: 'Mi a panasza?' },
        { who: 'Anna', jp: 'きのうの{夜|よる}から{頭|あたま}が{痛|いた}くて、のども{痛|いた}いんです。', romaji: 'Kinō no yoru kara atama ga itakute, nodo mo itai n desu.', hu: 'Tegnap este óta fáj a fejem, és a torkom is.' },
        { who: 'Orvos', jp: '{口|くち}を{開|あ}けてください。…{風邪|かぜ}ですね。', romaji: 'Kuchi o akete kudasai. … Kaze desu ne.', hu: 'Nyissa ki a száját! … Megfázás.' },
        { who: 'Orvos', jp: '{今日|きょう}はお{風呂|ふろ}に{入|はい}らないでください。{冷|つめ}たいものも{飲|の}まないほうがいいです。', romaji: 'Kyō wa o-furo ni hairanaide kudasai. Tsumetai mono mo nomanai hō ga ii desu.', hu: 'Ma ne fürödjön. Hideget se igyon, jobb úgy.' },
        { who: 'Orvos', jp: 'この{薬|くすり}を{一日|いちにち}に{三回|さんかい}{飲|の}んでください。', romaji: 'Kono kusuri o ichinichi ni sankai nonde kudasai.', hu: 'Ezt a gyógyszert naponta háromszor vegye be.' },
        { who: 'Anna', jp: 'わかりました。ありがとうございました。', romaji: 'Wakarimashita. Arigatō gozaimashita.', hu: 'Értem. Köszönöm szépen.' },
        { who: 'Orvos', jp: 'お{大事|だいじ}に。', romaji: 'O-daiji ni.', hu: 'Jobbulást!' }
      ],
      notes: [
        'A <b>どうしたんですか</b> („mi történt?") aggódó kérdés, ha látod, hogy valami baj van. Az orvos hivatalosabban kérdez: <b>どうしましたか</b>.',
        'Anna válasza <b>んです</b>-re végződik ({頭|あたま}が{痛|いた}いんです): nem egyszerűen közli a tényt, hanem megmagyarázza, miért néz ki rosszul.',
        'A <b>{病院|びょういん}へ{行|い}きます</b> azt jelenti: „orvoshoz megy". Japánul a rendelő is {病院|びょういん}; a „kórházba kerül, befekszik" külön szó: {入院|にゅういん}します.',
        'A gyógyszert japánul nem „beveszik", hanem <b>megisszák</b>: {薬|くすり}を{飲|の}みます, akkor is, ha tabletta.',
        'Az <b>お{大事|だいじ}に</b> a betegnek szóló búcsú: „vigyázzon magára, jobbulást". Csak betegnek mondjuk.'
      ]
    },
    points: [
      {
        title: 'た-alak', sub: 'rövid múlt',
        pattern: 'て → た · で → だ',
        body: 'A <b>た-alak</b> az ige rövid múlt ideje: ugyanazt jelenti, mint a 〜ました, csak udvarias végződés nélkül. A képzése nem új: fogd a <b>て-alakot</b>, és cseréld a végén a て-t <b>た</b>-ra, a で-t <b>だ</b>-ra.',
        more: [
          'Minden hangváltozás ugyanaz, mint a て-alaknál: {書|か}い<b>て</b> → {書|か}い<b>た</b>, {読|よ}ん<b>で</b> → {読|よ}ん<b>だ</b>, {行|い}っ<b>て</b> → {行|い}っ<b>た</b>. Aki a て-alakot tudja, a た-alakot is tudja.',
          'Mondat végén önmagában baráti, közvetlen múlt idő (きのう{映画|えいが}を{見|み}た). De ennél fontosabb, hogy sok szerkezet <b>építőköve</b>: 〜たほうがいい (tanács), 〜たことがある (tapasztalat), 〜たあとで (miután), 〜たり (felsorolás).'
        ],
        tables: [
          {
            caption: 'A た-alak a て-alakból',
            head: ['Csoport', '〜ます', 'て-alak', 'た-alak'],
            rows: [
              ['I.', 'かいます', 'かっ<b>て</b>', 'かっ<b>た</b>'],
              ['I.', 'かきます', 'かい<b>て</b>', 'かい<b>た</b>'],
              ['I.', 'およぎます', 'およい<b>で</b>', 'およい<b>だ</b>'],
              ['I.', 'よみます', 'よん<b>で</b>', 'よん<b>だ</b>'],
              ['I.', 'はなします', 'はなし<b>て</b>', 'はなし<b>た</b>'],
              ['I.', 'いきます', 'いっ<b>て</b>', 'いっ<b>た</b>'],
              ['II.', 'たべます', 'たべ<b>て</b>', 'たべ<b>た</b>'],
              ['III.', 'します', 'し<b>て</b>', 'し<b>た</b>'],
              ['III.', 'きます', 'き<b>て</b>', 'き<b>た</b>']
            ]
          }
        ],
        examples: [
          { jp: 'きのう{映画|えいが}を{見|み}た。', romaji: 'Kinō eiga o mita.', hu: 'Tegnap megnéztem egy filmet.' },
          { jp: '{朝|あさ}ごはんを{食|た}べた。', romaji: 'Asagohan o tabeta.', hu: 'Megreggeliztem.' },
          { jp: '{友|とも}だちに{会|あ}った。', romaji: 'Tomodachi ni atta.', hu: 'Találkoztam a barátommal.' },
          { jp: '{日本|にほん}へ{行|い}った。', romaji: 'Nihon e itta.', hu: 'Elmentem Japánba.' },
          { jp: '{本|ほん}を{読|よ}んだ。', romaji: 'Hon o yonda.', hu: 'Könyvet olvastam.' }
        ],
        mistakes: [
          { bad: '{読|よ}んた', good: '{読|よ}んだ', why: 'Ahol a て-alak で-re végződik ({読|よ}んで), ott a た-alak だ.' }
        ]
      },
      {
        title: 'ない-alak', sub: 'rövid tagadás',
        pattern: '1. csoport: i-hang → a-hang + ない · 2. csoport: ます → ない',
        body: 'A <b>ない-alak</b> az ige rövid tagadó alakja: ugyanazt jelenti, mint a 〜ません. A <b>II. csoportnál</b> a ます helyére ない kerül ({食|た}べます → {食|た}べない). Az <b>I. csoportnál</b> a ます előtti <b>i</b> hangú szótag <b>a</b> hangúra vált, és ehhez jön a ない ({書|か}<b>き</b>ます → {書|か}<b>か</b>ない).',
        more: [
          'Az I. csoport hangváltása a kana-tábla sorain belül mozog: き → か, ぎ → が, し → さ, ち → た, み → ま, び → ば, り → ら.',
          'Egy csapda: az <b>い</b>-re végződő tő (かいます, あいます) nem „あ"-ra, hanem <b>わ</b>-ra vált: {買|か}<b>わ</b>ない, {会|あ}<b>わ</b>ない.',
          'Egyetlen valódi kivétel van: az <b>あります</b> tagadása nem „あらない", hanem egyszerűen <b>ない</b>.',
          'A ない-alak い-melléknévként ragozódik tovább: a múltja <b>なかった</b> ({行|い}かなかった = nem mentem).'
        ],
        tables: [
          {
            caption: 'A ない-alak képzése',
            head: ['Csoport', '〜ます', 'ない-alak', 'Mi történt?'],
            rows: [
              ['I.', 'か<b>き</b>ます', 'か<b>か</b>ない', 'き → か'],
              ['I.', 'およ<b>ぎ</b>ます', 'およ<b>が</b>ない', 'ぎ → が'],
              ['I.', 'はな<b>し</b>ます', 'はな<b>さ</b>ない', 'し → さ'],
              ['I.', 'ま<b>ち</b>ます', 'ま<b>た</b>ない', 'ち → た'],
              ['I.', 'の<b>み</b>ます', 'の<b>ま</b>ない', 'み → ま'],
              ['I.', 'あそ<b>び</b>ます', 'あそ<b>ば</b>ない', 'び → ば'],
              ['I.', 'かえ<b>り</b>ます', 'かえ<b>ら</b>ない', 'り → ら'],
              ['I.', 'か<b>い</b>ます', 'か<b>わ</b>ない', 'い → <b>わ</b>'],
              ['II.', 'たべます', 'たべない', 'ます → ない'],
              ['II.', 'みます', 'みない', 'ます → ない'],
              ['III.', 'します', '<b>しない</b>', 'rendhagyó'],
              ['III.', 'きます', '<b>こない</b>', 'rendhagyó'],
              ['kivétel', 'あります', '<b>ない</b>', 'rendhagyó']
            ]
          }
        ],
        examples: [
          { jp: '{今日|きょう}は{行|い}かない。', romaji: 'Kyō wa ikanai.', hu: 'Ma nem megyek.' },
          { jp: 'お{酒|さけ}は{飲|の}まない。', romaji: 'Osake wa nomanai.', hu: 'Alkoholt nem iszom.' },
          { jp: '{時間|じかん}がない。', romaji: 'Jikan ga nai.', hu: 'Nincs időm.' },
          { jp: '{今日|きょう}は{何|なに}も{買|か}わない。', romaji: 'Kyō wa nani mo kawanai.', hu: 'Ma semmit sem veszek.' },
          { jp: 'きのうはどこへも{行|い}かなかった。', romaji: 'Kinō wa doko e mo ikanakatta.', hu: 'Tegnap sehová sem mentem.' }
        ],
        mistakes: [
          { bad: '{買|か}あない', good: '{買|か}わない', why: 'Az い-re végződő tő わ-ra vált.' },
          { bad: '{来|き}ない', good: '{来|こ}ない', why: 'A {来|き}ます ない-alakja こない: a kanji olvasata is megváltozik.' },
          { bad: 'あらない', good: 'ない', why: 'Az あります tagadó rövid alakja egyszerűen ない.' }
        ]
      },
      {
        title: 'A rövid alakok táblája', sub: 'jelen és múlt, állító és tagadó',
        pattern: 'szótári alak · ない-alak · た-alak · なかった-alak',
        body: 'Most, hogy ismered a た-alakot és a ない-alakot, összeáll a teljes kép. Minden igének, melléknévnek és főnévi állítmánynak négy rövid alakja van, pontosan úgy, ahogy négy udvarias alakja. A rövid alak az udvarias alak „csupasz" változata: ugyanazt jelenti, csak nincs benne です vagy ます.',
        more: [
          'A főnévnél és a な-melléknévnél a です rövid alakja <b>だ</b>. Az い-melléknévnél egyszerűen elhagyod a です-t: a melléknév már magában hordozza az időt és a tagadást.',
          'Ezekre az alakokra épül a következő leckék szinte minden szerkezete, ezért érdemes a táblát újra és újra elővenni.'
        ],
        tables: [
          {
            caption: 'Ige',
            head: ['', 'Udvarias', 'Rövid'],
            rows: [
              ['jelen állító', 'かきます', '<b>かく</b>'],
              ['jelen tagadó', 'かきません', '<b>かかない</b>'],
              ['múlt állító', 'かきました', '<b>かいた</b>'],
              ['múlt tagadó', 'かきませんでした', '<b>かかなかった</b>']
            ]
          },
          {
            caption: 'い-melléknév',
            head: ['', 'Udvarias', 'Rövid'],
            rows: [
              ['jelen állító', 'やすいです', '<b>やすい</b>'],
              ['jelen tagadó', 'やすくないです', '<b>やすくない</b>'],
              ['múlt állító', 'やすかったです', '<b>やすかった</b>'],
              ['múlt tagadó', 'やすくなかったです', '<b>やすくなかった</b>']
            ]
          },
          {
            caption: 'な-melléknév és főnév',
            head: ['', 'Udvarias', 'Rövid'],
            rows: [
              ['jelen állító', 'あめです', 'あめ<b>だ</b>'],
              ['jelen tagadó', 'あめじゃありません', 'あめ<b>じゃない</b>'],
              ['múlt állító', 'あめでした', 'あめ<b>だった</b>'],
              ['múlt tagadó', 'あめじゃありませんでした', 'あめ<b>じゃなかった</b>']
            ]
          }
        ],
        examples: [
          { jp: 'きのうは{雨|あめ}だった。', romaji: 'Kinō wa ame datta.', hu: 'Tegnap esett.' },
          { jp: 'この{店|みせ}は{安|やす}くない。', romaji: 'Kono mise wa yasuku nai.', hu: 'Ez a bolt nem olcsó.' },
          { jp: '{手紙|てがみ}を{書|か}かなかった。', romaji: 'Tegami o kakanakatta.', hu: 'Nem írtam levelet.' }
        ],
        tip: 'Az い-melléknév rövid alakja után <b>nem</b> áll だ: やすい, nem „やすいだ".'
      },
      {
        title: '〜ないでください', sub: 'kérem, ne…',
        pattern: 'ない-alak + でください',
        body: 'A tiltó kérés: ない-alak + <b>でください</b>.',
        more: [
          'A <b>〜ないでください</b> a 〜てください tagadó párja: udvarias kérés, hogy valaki <b>ne</b> tegyen meg valamit. Lehet figyelmeztetés (ne lépjen a fűre), aggódó kérés (ne aggódjon) vagy tiltás (ne dohányozzon).',
          'Barátok között a ください elmarad: {行|い}かないで (ne menj el!). A kérés végi ね itt is puhít: {忘|わす}れないでくださいね.'
        ],
        tables: [
          {
            caption: 'Kérés és tiltó kérés',
            head: ['', 'Alak', 'Példa'],
            rows: [
              ['tedd meg', 'て-alak + ください', 'ここに かいてください。'],
              ['ne tedd meg', 'ない-alak + でください', 'ここに かかないでください。']
            ]
          }
        ],
        examples: [
          { jp: 'ここで{写真|しゃしん}を{撮|と}らないでください。', romaji: 'Koko de shashin o toranaide kudasai.', hu: 'Kérem, itt ne fényképezzen.' },
          { jp: '{心配|しんぱい}しないでください。', romaji: 'Shinpai shinaide kudasai.', hu: 'Ne aggódjon!' },
          { jp: 'まだ{帰|かえ}らないでください。', romaji: 'Mada kaeranaide kudasai.', hu: 'Kérem, még ne menjen haza.' },
          { jp: '{保険証|ほけんしょう}を{忘|わす}れないでくださいね。', romaji: 'Hokenshō o wasurenaide kudasai ne.', hu: 'Ne felejtse otthon a biztosítási kártyát!' },
          { jp: 'ここでたばこを{吸|す}わないでください。', romaji: 'Koko de tabako o suwanaide kudasai.', hu: 'Kérem, itt ne dohányozzon.' }
        ],
        mistakes: [
          { bad: '{行|い}かなくてください。', good: '{行|い}かないでください。', why: 'A tiltó kérés a ない-alak + で: ないで.' }
        ]
      },
      {
        title: '〜たほうがいいです', sub: 'jobb lenne, ha…',
        pattern: 'た-alak + ほうがいいです',
        body: 'Tanácsot a <b>た-alak + ほうがいい</b> ad: „jobban tennéd, ha…". Bár múlt alak áll benne, a jelenre vagy a jövőre vonatkozik.',
        more: [
          'A szerkezet szó szerint azt mondja: „a megtett változat a jobb". A <b>た-alak</b> itt nem múlt időt jelent: a tanács a jelenre vagy a jövőre szól.',
          'Ez a tanács <b>határozott</b>: azt sugallja, hogy ha a másik nem fogadja meg, baj lehet belőle. Beteg embernek, bajban lévőnek mondjuk. A mondat végi よ barátságosabbá teszi.',
          'Tanácsot kérni így lehet: <b>どうしたらいいですか</b> (mit tegyek?).'
        ],
        examples: [
          { jp: '{薬|くすり}を{飲|の}んだほうがいいです。', romaji: 'Kusuri o nonda hō ga ii desu.', hu: 'Jobb lenne, ha bevennéd a gyógyszert.' },
          { jp: '{早|はや}く{寝|ね}たほうがいいですよ。', romaji: 'Hayaku neta hō ga ii desu yo.', hu: 'Jobb lenne korán lefeküdnöd.' },
          { jp: '{病院|びょういん}へ{行|い}ったほうがいいです。', romaji: 'Byōin e itta hō ga ii desu.', hu: 'Jobb lenne orvoshoz menned.' },
          { jp: '{今日|きょう}は{休|やす}んだほうがいいですよ。', romaji: 'Kyō wa yasunda hō ga ii desu yo.', hu: 'Ma jobb lenne pihenned.' },
          { jp: '{先生|せんせい}に{聞|き}いたほうがいいです。', romaji: 'Sensei ni kiita hō ga ii desu.', hu: 'Jobb lenne megkérdezni a tanárt.' }
        ],
        notes: [
          'Feljebbvalónak ne adj így tanácsot: a たほうがいい kioktatónak hat. Tanárnak, főnöknek legfeljebb kérdés formájában javasolj.'
        ],
        mistakes: [
          { bad: '{行|い}くたほうがいいです。', good: '{行|い}ったほうがいいです。', why: 'A ほうがいい elé た-alak kell, nem szótári alak + た.' }
        ]
      },
      {
        title: '〜ないほうがいいです', sub: 'jobb, ha nem…',
        pattern: 'ない-alak + ほうがいいです',
        body: 'A tagadó tanácshoz a ない-alak kell: „jobb, ha nem…".',
        more: [
          'A tagadó tanács <b>jelen idejű</b> ない-alakkal készül: {行|い}か<b>ない</b>ほうがいい. Itt nincs múlt idő, hiába áll az állító párjában た-alak.',
          'A két szerkezet együtt adja az orvosi tanácsok szokásos párját: mit tegyél, és mit ne.'
        ],
        tables: [
          {
            caption: 'Tanács: tedd / ne tedd',
            head: ['', 'Alak', 'Példa'],
            rows: [
              ['jobb, ha megteszed', '<b>た</b>-alak + ほうがいい', 'やすん<b>だ</b>ほうがいいです。'],
              ['jobb, ha nem teszed', '<b>ない</b>-alak + ほうがいい', 'でかけ<b>ない</b>ほうがいいです。']
            ]
          }
        ],
        examples: [
          { jp: '{今日|きょう}は{出|で}かけないほうがいいです。', romaji: 'Kyō wa dekakenai hō ga ii desu.', hu: 'Ma jobb, ha nem mész el itthonról.' },
          { jp: '{冷|つめ}たいものを{飲|の}まないほうがいいです。', romaji: 'Tsumetai mono o nomanai hō ga ii desu.', hu: 'Jobb, ha nem iszol hideget.' },
          { jp: '{無理|むり}をしないほうがいいですよ。', romaji: 'Muri o shinai hō ga ii desu yo.', hu: 'Jobb, ha nem erőlteted meg magad.' },
          { jp: 'お{風呂|ふろ}に{入|はい}らないほうがいいです。', romaji: 'O-furo ni hairanai hō ga ii desu.', hu: 'Jobb, ha nem fürdesz.' }
        ],
        mistakes: [
          { bad: '{行|い}かなかったほうがいいです。', good: '{行|い}かないほうがいいです。', why: 'A tagadó tanácsban a ない-alak jelen idejű marad.' }
        ]
      },
      {
        title: '〜んです', sub: 'magyarázat, ok',
        pattern: 'rövid alak + んです',
        body: 'A mondat végi <b>んです</b> magyarázatot ad vagy kér: megindokolod a helyzetet, vagy rákérdezel az okára. Rövid (szótári, た-, ない-) alak áll előtte; főnév és な-melléknév után <b>なんです</b>.',
        more: [
          'Az <b>んです</b> a の + です összevont, beszélt alakja. Azt jelzi, hogy a mondat nem puszta közlés, hanem <b>magyarázat</b> valamire, amit mindketten láttok vagy tudtok. Magyarul körülbelül: „az a helyzet, hogy…", „ugyanis…".',
          '<b>Kérdésben</b> azt mutatja, hogy valamit észrevettél, és az okára vagy kíváncsi: どうしたんですか (látom, baj van — mi történt?). <b>Válaszban</b> megadja a magyarázatot: {頭|あたま}が{痛|いた}いんです.',
          'A 8. leckében tanult 〜たいんですが… ugyanez a szerkezet: a たい után álló んです magyarázatként vezeti fel a kérést.'
        ],
        tables: [
          {
            caption: 'Mi áll az んです előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['ige', 'rövid alak', 'いく<b>んです</b> · いった<b>んです</b>'],
              ['い-mn.', 'alapalak', 'いたい<b>んです</b>'],
              ['な-mn.', '+ <b>な</b>', 'ひま<b>なんです</b>'],
              ['főnév', '+ <b>な</b>', 'テスト<b>なんです</b>']
            ]
          }
        ],
        examples: [
          { jp: 'どうしたんですか。', romaji: 'Dō shita n desu ka.', hu: 'Mi történt? Mi a baj?' },
          { jp: '{頭|あたま}が{痛|いた}いんです。', romaji: 'Atama ga itai n desu.', hu: 'Fáj a fejem (ezért vagyok ilyen).' },
          { jp: 'きのう{寝|ね}なかったんです。', romaji: 'Kinō nenakatta n desu.', hu: 'Tegnap nem aludtam (ez az oka).' },
          { jp: '{明日|あした}テストなんです。', romaji: 'Ashita tesuto na n desu.', hu: 'Holnap dolgozatot írok, tudja.' },
          { jp: 'どうして{食|た}べないんですか。', romaji: 'Dōshite tabenai n desu ka.', hu: 'Miért nem eszel?' }
        ],
        notes: [
          'Az んです nem kötelező minden mondatban. Ha egyszerű tényt közölsz, a sima です / ます a természetes; az んです akkor kell, ha van mit megmagyarázni.',
          'Írásban és hivatalos beszédben a teljes alak áll: 〜のです.'
        ],
        mistakes: [
          { bad: 'テストだんです。', good: 'テストなんです。', why: 'Főnév és な-melléknév után a だ helyén な áll az んです előtt.' }
        ]
      }
    ],
    phrases: [
      { jp: 'どうしましたか。', romaji: 'Dō shimashita ka.', hu: 'Mi a panasza?', note: 'Az orvos, a hivatalnok kérdése; a どうしたんですか aggódóbb, személyesebb.' },
      { jp: '{元気|げんき}がないですね。', romaji: 'Genki ga nai desu ne.', hu: 'Levertnek tűnsz.' },
      { jp: 'それは{大変|たいへん}ですね。', romaji: 'Sore wa taihen desu ne.', hu: 'Ez nem jó. Sajnálom.', note: 'Együttérzés, amikor valaki a bajáról beszél.' },
      { jp: 'お{大事|だいじ}に。', romaji: 'O-daiji ni.', hu: 'Jobbulást!' },
      { jp: '{大丈夫|だいじょうぶ}ですか。', romaji: 'Daijōbu desu ka.', hu: 'Jól vagy? Minden rendben?' },
      { jp: 'ゆっくり{休|やす}んでください。', romaji: 'Yukkuri yasunde kudasai.', hu: 'Pihenje ki magát!' },
      { jp: '{無理|むり}をしないでください。', romaji: 'Muri o shinaide kudasai.', hu: 'Ne erőltesse meg magát!' },
      { jp: '{気分|きぶん}が{悪|わる}いんです。', romaji: 'Kibun ga warui n desu.', hu: 'Rosszul érzem magam.' },
      { jp: '{保険証|ほけんしょう}を{持|も}っていますか。', romaji: 'Hokenshō o motte imasu ka.', hu: 'Van önnél biztosítási kártya?' },
      { jp: 'あちらでお{待|ま}ちください。', romaji: 'Achira de o-machi kudasai.', hu: 'Kérem, ott várjon.', note: 'Az お〜ください a 〜てください tiszteletteljesebb formája; hivatalokban, üzletekben hallod.' }
    ],
    words: [
      {
        title: 'A test',
        items: [
          { jp: '{頭|あたま}', romaji: 'atama', hu: 'fej' },
          { jp: '{目|め}', romaji: 'me', hu: 'szem' },
          { jp: '{耳|みみ}', romaji: 'mimi', hu: 'fül' },
          { jp: '{口|くち}', romaji: 'kuchi', hu: 'száj' },
          { jp: '{歯|は}', romaji: 'ha', hu: 'fog' },
          { jp: 'のど', romaji: 'nodo', hu: 'torok' },
          { jp: 'おなか', romaji: 'onaka', hu: 'has' },
          { jp: '{手|て}', romaji: 'te', hu: 'kéz' },
          { jp: '{足|あし}', romaji: 'ashi', hu: 'láb' },
          { jp: '{体|からだ}', romaji: 'karada', hu: 'test' }
        ]
      },
      {
        title: 'Tünetek',
        note: 'A fájdalmat a 〜が{痛|いた}いです mondja meg: {頭|あたま}が{痛|いた}いです = fáj a fejem.',
        items: [
          { jp: '{痛|いた}い', romaji: 'itai', hu: 'fáj' },
          { jp: '{熱|ねつ}', romaji: 'netsu', hu: 'láz' },
          { jp: '{風邪|かぜ}', romaji: 'kaze', hu: 'megfázás' },
          { jp: 'せき', romaji: 'seki', hu: 'köhögés' },
          { jp: '{気分|きぶん}', romaji: 'kibun', hu: 'közérzet' },
          { jp: '{食欲|しょくよく}', romaji: 'shokuyoku', hu: 'étvágy' },
          { jp: 'アレルギー', romaji: 'arerugī', hu: 'allergia' },
          { jp: 'けが', romaji: 'kega', hu: 'sérülés' }
        ]
      },
      {
        title: 'Orvosnál',
        items: [
          { jp: '{病院|びょういん}', romaji: 'byōin', hu: 'kórház, rendelő' },
          { jp: '{医者|いしゃ}', romaji: 'isha', hu: 'orvos' },
          { jp: '{看護師|かんごし}', romaji: 'kangoshi', hu: 'ápoló' },
          { jp: '{薬|くすり}', romaji: 'kusuri', hu: 'gyógyszer' },
          { jp: '{薬局|やっきょく}', romaji: 'yakkyoku', hu: 'gyógyszertár' },
          { jp: '{保険証|ほけんしょう}', romaji: 'hokenshō', hu: 'biztosítási kártya' },
          { jp: '{食後|しょくご}', romaji: 'shokugo', hu: 'étkezés után' },
          { jp: '{休|やす}みます', romaji: 'yasumimasu', hu: 'pihen; hiányzik' }
        ]
      }
    ],
    culture: [
      {
        title: 'Lázasan nem fürdünk',
        text: 'Japánban megfázásra és lázra az első tanács: <b>ne menj be a forró kádba</b>. A mindennapi esti fürdő annyira hozzátartozik az élethez, hogy az orvos külön megmondja, mikor kell kihagyni. A lázas beteg homlokára hideg vizes törölközőt vagy hűsítő tapaszt tesznek. Aki megfázott, az utcán és a vonaton <b>maszkot</b> hord: nem magát védi, hanem a többieket, és ez egyszerű udvariasságnak számít.'
      },
      {
        title: 'Tüsszentésre nem jár jókívánság',
        text: 'Ha valaki tüsszent, a japánok <b>nem mondanak semmit</b>: nincs „egészségedre". Inkább a tüsszentő szabadkozik egy halk すみません-nel. Egy régi hiedelem szerint ha tüsszentesz, valaki éppen rólad beszél. A betegnek viszont jár a jókívánság: <b>お{大事|だいじ}に</b>.'
      },
      {
        title: 'Házi gyógymódok',
        text: 'A megfázás hagyományos japán ellenszere a <b>{卵酒|たまござけ}</b> (meleg szaké tojássárgájával és cukorral) és a <b>しょうが{湯|ゆ}</b> (forró gyömbérital): mindkettő átmelegíti a testet. Torokfájásra a nyak köré tekert, megsütött póréhagymát ajánlották a nagymamák. A beteg könnyű étele az <b>おかゆ</b>, a híg rizskása.'
      }
    ],
    quiz: [
      { q: 'Mi a {飲|の}みます た-alakja?', a: '{飲|の}んだ', wrong: ['{飲|の}みた', '{飲|の}った', '{飲|の}いた'], why: 'み → んで, illetve んだ.' },
      { q: 'Mi a {書|か}きます ない-alakja?', a: '{書|か}かない', wrong: ['{書|か}きない', '{書|か}くない', '{書|か}こない'], why: '1. csoport: az i-hang a-hangra vált: き → か.' },
      { q: 'Mi a {買|か}います ない-alakja?', a: '{買|か}わない', wrong: ['{買|か}あない', '{買|か}いない', '{買|か}らない'], why: 'Az い-re végződő tőnél わ lesz: {買|か}わない.' },
      { q: '„Kérem, itt ne fényképezzen." Mi hiányzik?', jp: 'ここで{写真|しゃしん}を＿ください。', a: '{撮|と}らないで', wrong: ['{撮|と}って', '{撮|と}らなくて', '{撮|と}りないで'], why: 'Tiltó kérés: ない-alak + でください.' },
      { q: '„Jobb lenne, ha bevennéd a gyógyszert." Mi hiányzik?', jp: '{薬|くすり}を＿ほうがいいです。', a: '{飲|の}んだ', wrong: ['{飲|の}みます', '{飲|の}んで', '{飲|の}みたい'], why: 'Tanács: た-alak + ほうがいい.' },
      { q: '„Ma jobb, ha nem mész el itthonról." Mi hiányzik?', jp: '{今日|きょう}は＿ほうがいいです。', a: '{出|で}かけない', wrong: ['{出|で}かけた', '{出|で}かけて', '{出|で}かけません'], why: 'Tagadó tanács: ない-alak + ほうがいい.' },
      { q: 'Mit jelent: どうしたんですか。', a: 'Mi történt? Mi a baj?', wrong: ['Hogy vagy?', 'Mit csinálsz?', 'Miért mész el?'], why: 'A んですか magyarázatot kér: mi az oka annak, amit látok?' },
      { q: 'Mi a します ない-alakja?', a: 'しない', wrong: ['すない', 'さない', 'しらない'], why: 'A します rendhagyó: しない.' },
      { q: '„Fáj a fejem." (magyarázatként) Mi hiányzik?', jp: '{頭|あたま}が{痛|いた}い＿。', a: 'んです', wrong: ['でした', 'ください', 'ほうです'], why: 'Magyarázat: rövid alak + んです.' },
      { q: 'Mi a {来|き}ます ない-alakja?', a: 'こない', wrong: ['きない', 'くない', 'こらない'], why: 'A {来|き}ます rendhagyó: こない.' },
      { q: 'Mi az {行|い}きます た-alakja?', a: '{行|い}った', wrong: ['{行|い}いた', '{行|い}きた', '{行|い}んだ'], why: 'A た-alak a て-alakból lesz: {行|い}って → {行|い}った.' },
      { q: 'Mi az {泳|およ}ぎます た-alakja?', a: '{泳|およ}いだ', wrong: ['{泳|およ}いた', '{泳|およ}んだ', '{泳|およ}った'], why: 'A て-alak {泳|およ}いで, ezért a た-alak {泳|およ}いだ.' },
      { q: 'Mi az {話|はな}します ない-alakja?', a: '{話|はな}さない', wrong: ['{話|はな}しない', '{話|はな}すない', '{話|はな}わない'], why: 'I. csoport: し → さ, ehhez jön a ない.' },
      { q: 'Mi az あります rövid tagadó alakja?', a: 'ない', wrong: ['あらない', 'ありない', 'あない'], why: 'Az あります az egyetlen kivétel: tagadása egyszerűen ない.' },
      { q: 'Mi a {雨|あめ}でした rövid alakja?', a: '{雨|あめ}だった', wrong: ['{雨|あめ}かった', '{雨|あめ}だ', '{雨|あめ}でした'], why: 'A です rövid múlt alakja だった.' },
      { q: 'Melyik a helyes tanács? „Jobb, ha nem mész el."', a: '{行|い}かないほうがいいです。', wrong: ['{行|い}かなかったほうがいいです。', '{行|い}ったないほうがいいです。', '{行|い}きませんほうがいいです。'], why: 'A tagadó tanácsban jelen idejű ない-alak áll.' },
      { q: '„Holnap dolgozatot írok, tudja." Mi hiányzik?', jp: '{明日|あした}テスト＿んです。', a: 'な', wrong: ['だ', 'の', 'が'], why: 'Főnév után な áll az んです előtt.' },
      { q: 'Az orvos azt mondja a végén: お{大事|だいじ}に。 Mit jelent?', a: 'Jobbulást!', wrong: ['Viszontlátásra!', 'Egészségére! (tüsszentésre)', 'Vigyázzon a gyógyszerre!'], why: 'Az お{大事|だいじ}に a betegnek szóló jókívánság.' },
      { q: 'Mit jelent: {病院|びょういん}へ{行|い}きます。', a: 'Orvoshoz megyek.', wrong: ['Kórházban fekszem.', 'Kórházban dolgozom.', 'Meglátogatok valakit a kórházban.'], why: 'A {病院|びょういん} a rendelőt is jelenti; a befekvés {入院|にゅういん}します.' },
      { q: 'Mit mondanak a japánok, ha valaki tüsszent?', a: 'Semmit.', wrong: ['お{大事|だいじ}に。', 'お{元気|げんき}で。', 'いただきます。'], why: 'Tüsszentésre nincs jókívánság; legfeljebb a tüsszentő kér elnézést.' }
    ]
  },

  /* ── 12. lecke ────────────────────────────────────── */
  {
    id: 'l12', no: 12, book: 'Dekiru 1', title: 'Barátok között',
    lead: 'Megtanulod a baráti, közvetlen beszédstílust, leírod, ki mit csinál éppen és hogy néz ki, telefonálsz, és főneveket bővítesz egész mondattal.',
    cando: [
      'Barátnak írsz, és vele közvetlen stílusban beszélsz.',
      'Megmondod, ki mit csinál éppen, és mi a tartós állapota.',
      'Leírod, hogy néz ki és mit visel valaki.',
      'Telefonon megbeszélsz egy programot baráttal és tanárral is.'
    ],
    intro: [
      'A japánban minden mondatnál döntened kell: <b>udvarias</b> vagy <b>közvetlen</b> stílusban beszélsz-e. Az eddig tanult です / ます az udvarias stílus: idegennel, tanárral, idősebbel, ügyintézéskor ez a helyes. A <b>közvetlen stílus</b> a családé és a barátoké: itt a mondatok az előző leckében megismert rövid alakokra végződnek.',
      'A különbség nem durvaság és nem kedvesség kérdése, hanem <b>távolságé</b>. Ha egy barátodhoz です / ます alakban beszélsz, az rideg; ha a tanárodhoz rövid alakban, az tiszteletlen. A legtöbb japán naponta sokszor vált a kettő között aszerint, kivel beszél éppen.',
      'A lecke másik két nagy témája a <b>〜ています</b> (éppen csinál valamit, vagy tartós állapotban van) és a <b>jelzős szerkezet</b>: a japán „aki, ami, amelyik" mellékmondat, amely nem a főnév után, hanem <b>előtte</b> áll.'
    ],
    dialogue: {
      title: 'Ugyanaz a telefon kétszer',
      scene: 'Anna vasárnapra filmet szeretne nézni. Először Juit hívja fel, a fogadócsalád lányát; utána a tanárát, Tanaka tanár urat. Figyeld meg, mi változik.',
      lines: [
        { who: 'Jui', jp: 'もしもし。', romaji: 'Moshimoshi.', hu: 'Halló!' },
        { who: 'Anna', jp: 'もしもし、アンナだけど、{今|いま}ちょっといい？', romaji: 'Moshimoshi, Anna da kedo, ima chotto ii?', hu: 'Halló, Anna vagyok. Ráérsz most egy kicsit?' },
        { who: 'Jui', jp: 'うん、いいよ。どうしたの？', romaji: 'Un, ii yo. Dō shita no?', hu: 'Aha, persze. Mi van?' },
        { who: 'Anna', jp: '{日曜日|にちようび}に{日本|にほん}の{映画|えいが}があるんだけど、いっしょに{行|い}かない？', romaji: 'Nichiyōbi ni Nihon no eiga ga aru n da kedo, issho ni ikanai?', hu: 'Vasárnap lesz egy japán film. Nem jössz velem?' },
        { who: 'Jui', jp: 'いいね。{何時|なんじ}から？', romaji: 'Ii ne. Nanji kara?', hu: 'Jó ötlet! Mikor kezdődik?' },
        { who: 'Anna', jp: '{三時|さんじ}から。{二時半|にじはん}に{駅|えき}の{前|まえ}で{会|あ}おう。', romaji: 'Sanji kara. Niji han ni eki no mae de aō.', hu: 'Háromkor. Találkozzunk fél háromkor az állomás előtt!' },
        { who: 'Jui', jp: 'わかった。じゃあね。', romaji: 'Wakatta. Jā ne.', hu: 'Rendben. Akkor szia!' },
        { who: 'Anna', jp: 'もしもし、アンナです。{田中|たなか}{先生|せんせい}、{今|いま}よろしいですか。', romaji: 'Moshimoshi, Anna desu. Tanaka-sensei, ima yoroshii desu ka.', hu: 'Halló, Anna vagyok. Tanár úr, most nem zavarom?' },
        { who: 'Tanaka', jp: 'はい、{大丈夫|だいじょうぶ}ですよ。', romaji: 'Hai, daijōbu desu yo.', hu: 'Nem, mondja csak.' },
        { who: 'Anna', jp: '{日曜日|にちようび}に{日本|にほん}の{映画|えいが}があるんですが、いっしょに{行|い}きませんか。', romaji: 'Nichiyōbi ni Nihon no eiga ga aru n desu ga, issho ni ikimasen ka.', hu: 'Vasárnap lesz egy japán film. Nem jönne el velünk?' },
        { who: 'Tanaka', jp: 'いいですね。{何時|なんじ}からですか。', romaji: 'Ii desu ne. Nanji kara desu ka.', hu: 'Jó ötlet. Hánykor kezdődik?' },
        { who: 'Anna', jp: '{三時|さんじ}からです。では、{失礼|しつれい}します。', romaji: 'Sanji kara desu. Dewa, shitsurei shimasu.', hu: 'Háromkor. Akkor a viszonthallásra!' }
      ],
      notes: [
        'A két beszélgetés tartalma ugyanaz, csak a <b>stílus</b> más. Állítsd párba a mondatokat: いい？ ↔ よろしいですか · うん ↔ はい · {行|い}かない？ ↔ {行|い}きませんか · わかった ↔ わかりました · じゃあね ↔ {失礼|しつれい}します.',
        'Közvetlen stílusban a kérdést nem a か jelzi, hanem az <b>emelkedő hanglejtés</b> (írásban a kérdőjel): いい？ {行|い}かない？ A か itt nyersen hatna.',
        'Az <b>あるんだけど</b> a 〜んですが közvetlen párja: felvezeti a mondanivalót. A だけど a „de" baráti alakja.',
        'A <b>{会|あ}おう</b> a {会|あ}いましょう közvetlen változata („találkozzunk!"). Ezt az alakot a 26. leckében tanulod; most elég felismerned.',
        'A <b>もしもし</b> csak telefonban használatos. A telefonban mindig megmondod a neved: アンナです / アンナだけど.'
      ]
    },
    points: [
      {
        title: 'Közvetlen stílus', sub: 'rövid alakok',
        pattern: '{行|い}きます → {行|い}く · {行|い}きません → {行|い}かない · {行|い}きました → {行|い}った',
        body: 'Barátok és családtagok között a mondatok <b>rövid alakra</b> végződnek: a 〜ます helyén a szótári alak, a 〜ません helyén a ない-alak, a 〜ました helyén a た-alak áll. Az い-melléknévről egyszerűen lemarad a です; a főnév és a な-melléknév után a です helyén <b>だ</b> áll, de ez gyakran el is marad.',
        more: [
          'A <b>kérdés</b> közvetlen stílusban nem か-val készül, hanem emelkedő hanglejtéssel: {行|い}く？ おいしい？ Főnév és な-melléknév után kérdésben a だ <b>kötelezően elmarad</b>: {学生|がくせい}？ {元気|げんき}？',
          'Az igen és a nem is megváltozik: <b>うん</b> (igen) és <b>ううん</b> (nem). A mondat végére gyakran kerül よ vagy ね, ezek teszik a rövid alakot barátságossá.',
          'Minden eddig tanult szerkezetnek megvan a közvetlen párja; a táblázatban a leggyakoribbakat találod.'
        ],
        tables: [
          {
            caption: 'Udvarias és közvetlen stílus',
            head: ['', 'Udvarias', 'Közvetlen'],
            rows: [
              ['ige, jelen', 'いきます', 'いく'],
              ['ige, tagadó', 'いきません', 'いかない'],
              ['ige, múlt', 'いきました', 'いった'],
              ['い-mn.', 'おいしいです', 'おいしい'],
              ['な-mn., főnév', 'ひまです', 'ひま(だ)'],
              ['kérdés', 'いきますか', 'いく？'],
              ['igen / nem', 'はい / いいえ', 'うん / ううん']
            ]
          },
          {
            caption: 'Szerkezetek közvetlen párja',
            head: ['Udvarias', 'Közvetlen'],
            rows: [
              ['〜たいです', '〜たい'],
              ['〜てください', '〜て'],
              ['〜ないでください', '〜ないで'],
              ['〜たほうがいいです', '〜たほうがいい'],
              ['〜ませんか', '〜ない？'],
              ['〜んですが', '〜んだけど'],
              ['〜ですが / でも', '〜けど']
            ]
          }
        ],
        examples: [
          { jp: 'あした{学校|がっこう}へ{行|い}く？', romaji: 'Ashita gakkō e iku?', hu: 'Holnap mész suliba?' },
          { jp: 'うん、{行|い}く。', romaji: 'Un, iku.', hu: 'Aha, megyek.' },
          { jp: 'きのうは{忙|いそが}しかった。', romaji: 'Kinō wa isogashikatta.', hu: 'Tegnap sok dolgom volt.' },
          { jp: '{今日|きょう}は{休|やす}みだ。', romaji: 'Kyō wa yasumi da.', hu: 'Ma szünnap van.' },
          { jp: 'これ、おいしい？', romaji: 'Kore, oishii?', hu: 'Ez finom?' },
          { jp: 'ううん、あまりおいしくない。', romaji: 'Uun, amari oishiku nai.', hu: 'Nem, nem valami finom.' },
          { jp: 'ちょっと{待|ま}って。', romaji: 'Chotto matte.', hu: 'Várj egy kicsit!' }
        ],
        notes: [
          'A だ a kijelentő mondat végén kemény, határozott hangzású; lányok és nők gyakran elhagyják, vagy よ / ね mögé rejtik: {休|やす}みだよ.',
          'Naplóban, jegyzetben, újságcikkben is rövid alakok állnak: ott ez nem közvetlenség, hanem semleges írott stílus.'
        ],
        mistakes: [
          { bad: 'おいしいだ。', good: 'おいしい。', why: 'Az い-melléknév után nem áll だ.' },
          { bad: '{元気|げんき}だ？', good: '{元気|げんき}？', why: 'Kérdésben a だ elmarad.' },
          { bad: '{先生|せんせい}、あした{来|く}る？', good: '{先生|せんせい}、あした{来|き}ますか。', why: 'Tanárhoz udvarias stílusban szólunk.' }
        ],
        tip: 'Tanárral, idegennel, idősebbel maradj a です / ます alaknál: a rövid alak velük szemben udvariatlan.'
      },
      {
        title: '〜ています (folyamat)', sub: 'éppen csinálja',
        pattern: 'ige て-alak + います',
        body: 'A <b>ています</b> elsőként azt fejezi ki, ami éppen most zajlik.',
        more: [
          'Képzése: az ige <b>て-alakja + います</b>. Az います itt segédige, és ugyanúgy ragozódik, mint máskor: 〜ていません (éppen nem), 〜ていました (éppen csinálta), 〜ている (közvetlen stílus).',
          'Olyan igéknél jelent folyamatot, amelyek <b>elnyúló cselekvést</b> neveznek meg: olvas, eszik, ír, fut, esik (az eső). A rákérdezés: {今|いま}{何|なに}をしていますか (mit csinálsz éppen?).',
          'Beszédben az い gyakran kiesik: {読|よ}んで<b>る</b>, {読|よ}んで<b>ます</b>.'
        ],
        tables: [
          {
            caption: 'A 〜ています alakjai',
            head: ['', 'Udvarias', 'Közvetlen'],
            rows: [
              ['éppen csinálja', 'よんでいます', 'よんでいる'],
              ['éppen nem csinálja', 'よんでいません', 'よんでいない'],
              ['éppen csinálta', 'よんでいました', 'よんでいた']
            ]
          }
        ],
        examples: [
          { jp: '{今|いま}{本|ほん}を{読|よ}んでいます。', romaji: 'Ima hon o yonde imasu.', hu: 'Most éppen könyvet olvasok.' },
          { jp: '{雨|あめ}が{降|ふ}っています。', romaji: 'Ame ga futte imasu.', hu: 'Esik az eső.' },
          { jp: '{何|なに}をしていますか。', romaji: 'Nani o shite imasu ka.', hu: 'Mit csinálsz éppen?' },
          { jp: '{母|はは}は{今|いま}{料理|りょうり}をしています。', romaji: 'Haha wa ima ryōri o shite imasu.', hu: 'Anyám éppen főz.' },
          { jp: '{電話|でんわ}のとき、{晩|ばん}ごはんを{食|た}べていました。', romaji: 'Denwa no toki, bangohan o tabete imashita.', hu: 'Amikor telefonáltál, éppen vacsoráztam.' }
        ],
        mistakes: [
          { bad: '{今|いま}{本|ほん}を{読|よ}みます。', good: '{今|いま}{本|ほん}を{読|よ}んでいます。', why: 'Ami éppen most zajlik, azt a 〜ています fejezi ki; a 〜ます szokást vagy jövőt jelent.' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'tartós állapot, foglalkozás',
        pattern: 'ige て-alak + います',
        body: 'Ugyanez az alak tartós állapotot is jelent: egy változás eredménye fennáll. Így mondod meg, hol laksz, házas vagy-e, mit tudsz, és azt is, mit visel valaki. Rendszeres tevékenységre, foglalkozásra is ez jár.',
        more: [
          'Sok ige nem elnyúló cselekvést, hanem <b>pillanatnyi változást</b> nevez meg: megházasodik, megtud, felvesz egy ruhát, odaköltözik. Ezeknél a 〜ています nem azt jelenti, hogy „éppen csinálja", hanem azt, hogy a változás megtörtént, és <b>az eredménye fennáll</b>: {結婚|けっこん}しています = házas (nem „éppen házasodik").',
          'Ugyanez az alak <b>rendszeres tevékenységet</b> is kifejez: foglalkozást, tanulmányt, szokást. {銀行|ぎんこう}で{働|はたら}いています = bankban dolgozik (ott az állása).',
          'Így a 〜ています három dolgot jelenthet; hogy melyiket, azt az ige fajtája és a helyzet dönti el.'
        ],
        tables: [
          {
            caption: 'A 〜ています három jelentése',
            head: ['Jelentés', 'Példa', 'Magyarul'],
            rows: [
              ['éppen zajló cselekvés', 'いま ごはんを たべています。', 'Éppen eszem.'],
              ['fennálló állapot', 'あには けっこんしています。', 'A bátyám házas.'],
              ['rendszeres tevékenység', 'だいがくで べんきょうしています。', 'Egyetemen tanulok.']
            ]
          },
          {
            caption: 'Állapotot jelentő gyakori alakok',
            head: ['Japánul', 'Magyarul'],
            rows: [
              ['すんでいます', 'lakik valahol'],
              ['しっています', 'tud, ismer'],
              ['もっています', 'van nála, birtokolja'],
              ['けっこんしています', 'házas'],
              ['きています / はいています', 'visel (ruhát)'],
              ['めがねを かけています', 'szemüveges']
            ]
          }
        ],
        examples: [
          { jp: '{東京|とうきょう}に{住|す}んでいます。', romaji: 'Tōkyō ni sunde imasu.', hu: 'Tokióban lakom.' },
          { jp: '{兄|あに}は{結婚|けっこん}しています。', romaji: 'Ani wa kekkon shite imasu.', hu: 'A bátyám házas.' },
          { jp: '{田中|たなか}さんはめがねをかけています。', romaji: 'Tanaka-san wa megane o kakete imasu.', hu: 'Tanaka szemüveget visel.' },
          { jp: '{母|はは}は{銀行|ぎんこう}で{働|はたら}いています。', romaji: 'Haha wa ginkō de hataraite imasu.', hu: 'Anyám bankban dolgozik.' },
          { jp: '{車|くるま}を{持|も}っていますか。', romaji: 'Kuruma o motte imasu ka.', hu: 'Van autód?' },
          { jp: '{妹|いもうと}は{赤|あか}いセーターを{着|き}ています。', romaji: 'Imōto wa akai sētā o kite imasu.', hu: 'A húgom piros pulóvert visel.' }
        ],
        notes: [
          'A {住|す}んでいます mellett a hely <b>に</b>-t kap ({東京|とうきょう}<b>に</b>{住|す}んでいます), a {働|はたら}いています mellett <b>で</b>-t ({銀行|ぎんこう}<b>で</b>{働|はたら}いています): az előbbi „létezés", az utóbbi cselekvés.',
          'A viselés igéi testtájanként mások: {着|き}ています (ing, kabát), はいています (nadrág, cipő), かぶっています (sapka), かけています (szemüveg).'
        ],
        mistakes: [
          { bad: '{知|し}っていません。', good: '{知|し}りません。', why: 'A „nem tudom" kivételes: egyszerű tagadó alak, nem 〜ていません.' },
          { bad: '{東京|とうきょう}に{住|す}みます。', good: '{東京|とうきょう}に{住|す}んでいます。', why: 'A lakás tartós állapot: 〜ています alakban mondjuk.' }
        ],
        tip: 'A „tudom" {知|し}っています, de a „nem tudom" {知|し}りません (nem {知|し}っていません).'
      },
      {
        title: 'A は B が 〜です', sub: 'személyleírás',
        pattern: 'A は + rész / tulajdonság が + melléknév',
        body: 'Ha valakiről azt mondod, milyen egy része vagy tulajdonsága, az egész <b>は</b>-t, a rész <b>が</b>-t kap: „ami Annát illeti, a haja hosszú".',
        more: [
          'A mondatban két szint van. A <b>は</b> megadja, kiről vagy miről beszélünk (ez a téma); a <b>が</b> megnevezi azt a részét vagy tulajdonságát, amelyre a melléknév vonatkozik. Magyarul: „Annának hosszú a haja", szó szerint: „ami Annát illeti: a haj hosszú".',
          'Ugyanezt a mintát már ismered a {好|す}き és a {上手|じょうず} mellől. Személyleírásnál a が-s rész többnyire testrész vagy belső tulajdonság.',
          'Több tulajdonságot a 9. leckében tanult kapcsoló alak fűz össze: {背|せ}が{高|たか}<b>くて</b>、{髪|かみ}が{長|なが}いです.'
        ],
        tables: [
          {
            caption: 'Személyleírás',
            head: ['Téma は', 'Rész が', 'Milyen?'],
            rows: [
              ['アンナさんは', 'かみが', 'ながいです。'],
              ['おとうとは', 'せが', 'たかいです。'],
              ['たなかさんは', 'あたまが', 'いいです。'],
              ['ぞうは', 'はなが', 'ながいです。']
            ]
          }
        ],
        examples: [
          { jp: 'アンナさんは{髪|かみ}が{長|なが}いです。', romaji: 'Anna-san wa kami ga nagai desu.', hu: 'Annának hosszú a haja.' },
          { jp: '{弟|おとうと}は{背|せ}が{高|たか}いです。', romaji: 'Otōto wa se ga takai desu.', hu: 'Az öcsém magas.' },
          { jp: 'この{町|まち}は{公園|こうえん}が{多|おお}いです。', romaji: 'Kono machi wa kōen ga ōi desu.', hu: 'Ebben a városban sok a park.' },
          { jp: '{田中|たなか}さんは{頭|あたま}がいいです。', romaji: 'Tanaka-san wa atama ga ii desu.', hu: 'Tanaka okos.' },
          { jp: '{姉|あね}は{背|せ}が{高|たか}くて、{髪|かみ}が{短|みじか}いです。', romaji: 'Ane wa se ga takakute, kami ga mijikai desu.', hu: 'A nővérem magas, és rövid a haja.' }
        ],
        notes: [
          'A birtokos szerkezet is helyes (アンナさん<b>の</b>{髪|かみ}は{長|なが}いです), de az a hajról szól; a は … が szerkezet Annáról.'
        ],
        mistakes: [
          { bad: '{弟|おとうと}は{高|たか}いです。', good: '{弟|おとうと}は{背|せ}が{高|たか}いです。', why: 'Emberre önmagában a {高|たか}い „drágát" is jelenthetne; a magasságot a {背|せ}が{高|たか}い mondja meg.' }
        ]
      },
      {
        title: 'Jelzős szerkezet', sub: 'mondat a főnév előtt',
        pattern: 'rövid alakú mondat + főnév',
        body: 'A magyar „aki, ami, amelyik" mellékmondat japánul a főnév <b>elé</b> kerül, kötőszó nélkül. A jelző mindig megelőzi a jelzett szót, akármilyen hosszú: „a tegnap vett könyv" = きのう{買|か}った{本|ほん}.',
        more: [
          'A jelzői mondat mindig <b>rövid alakban</b> áll, akkor is, ha a mondat egésze udvarias: きのう{買|か}<b>った</b>{本|ほん}です (nem „{買|か}いました{本|ほん}").',
          'A jelzői mondat alanya <b>が</b>-t kap, soha nem は-t: わたし<b>が</b>{作|つく}ったカレー (a curry, amit én főztem). A は az egész mondat témáját jelölné.',
          'Bármi lehet jelző: い-melléknév ({背|せ}が{高|たか}い{人|ひと}), な-melléknév な-val ({目|め}がきれいな{人|ひと}), és ige bármelyik rövid alakja.'
        ],
        tables: [
          {
            caption: 'Mi állhat a főnév előtt?',
            head: ['Jelző', 'Példa', 'Magyarul'],
            rows: [
              ['い-mn.', 'せが たかい ひと', 'magas ember'],
              ['な-mn. + な', 'しんせつな ひと', 'kedves ember'],
              ['ige, jelen', 'あそこに いる ひと', 'az ott álló ember'],
              ['ige, 〜ている', 'めがねを かけている ひと', 'a szemüveges ember'],
              ['ige, múlt', 'きのう あった ひと', 'akivel tegnap találkoztam'],
              ['ige, tagadó', 'たばこを すわない ひと', 'aki nem dohányzik']
            ]
          }
        ],
        examples: [
          { jp: 'これはきのう{買|か}った{本|ほん}です。', romaji: 'Kore wa kinō katta hon desu.', hu: 'Ez az a könyv, amit tegnap vettem.' },
          { jp: 'めがねをかけている{人|ひと}は{田中|たなか}さんです。', romaji: 'Megane o kakete iru hito wa Tanaka-san desu.', hu: 'A szemüveges ember Tanaka.' },
          { jp: '{日本|にほん}で{撮|と}った{写真|しゃしん}を{見|み}せます。', romaji: 'Nihon de totta shashin o misemasu.', hu: 'Megmutatom a Japánban készült képeket.' },
          { jp: 'わたしが{作|つく}ったカレーを{食|た}べてください。', romaji: 'Watashi ga tsukutta karē o tabete kudasai.', hu: 'Kóstold meg a curryt, amit főztem!' },
          { jp: 'あそこで{本|ほん}を{読|よ}んでいる{人|ひと}はだれですか。', romaji: 'Asoko de hon o yonde iru hito wa dare desu ka.', hu: 'Ki az, aki ott könyvet olvas?' }
        ],
        notes: [
          'Fordításkor haladj hátulról: előbb keresd meg a főnevet, aztán olvasd el, ami előtte áll.',
          'A jelzői mondatban a が helyén の is állhat: わたし<b>の</b>{作|つく}ったカレー. A jelentés ugyanaz.'
        ],
        mistakes: [
          { bad: 'きのう{買|か}いました{本|ほん}', good: 'きのう{買|か}った{本|ほん}', why: 'Főnév előtt rövid alak áll, 〜ます alak nem.' },
          { bad: 'わたしは{作|つく}ったカレー', good: 'わたしが{作|つく}ったカレー', why: 'A jelzői mondat alanya が-t kap.' }
        ]
      }
    ],
    phrases: [
      { jp: 'もしもし。', romaji: 'Moshimoshi.', hu: 'Halló! (telefonban)' },
      { jp: '{今|いま}、よろしいですか。', romaji: 'Ima, yoroshii desu ka.', hu: 'Most nem zavarom?', note: 'A よろしい az いい tiszteletteljes párja.' },
      { jp: '{今|いま}、ちょっといい？', romaji: 'Ima, chotto ii?', hu: 'Ráérsz most egy kicsit?' },
      { jp: '{返事|へんじ}が{遅|おそ}くなって、ごめんなさい。', romaji: 'Henji ga osoku natte, gomen nasai.', hu: 'Ne haragudj, hogy ilyen későn válaszolok.' },
      { jp: 'メール、ありがとう。', romaji: 'Mēru, arigatō.', hu: 'Köszi az e-mailt!' },
      { jp: 'びっくりしました。', romaji: 'Bikkuri shimashita.', hu: 'Meglepődtem.' },
      { jp: 'ところで、', romaji: 'Tokoro de,', hu: 'Apropó, …', note: 'Témaváltás jelzése a mondat elején.' },
      { jp: 'また{連絡|れんらく}します。', romaji: 'Mata renraku shimasu.', hu: 'Majd jelentkezem.' },
      { jp: 'じゃあね。', romaji: 'Jā ne.', hu: 'Szia! (búcsúzáskor)' }
    ],
    words: [
      {
        title: 'Közvetlen és udvarias párok',
        note: 'Ugyanaz a jelentés, más távolság.',
        items: [
          { jp: 'うん', romaji: 'un', hu: 'igen (laza)' },
          { jp: 'ううん', romaji: 'uun', hu: 'nem (laza)' },
          { jp: 'ありがとう', romaji: 'arigatō', hu: 'köszi' },
          { jp: 'ごめん', romaji: 'gomen', hu: 'bocsi' },
          { jp: 'けど', romaji: 'kedo', hu: 'de (laza)' },
          { jp: 'とても / とっても', romaji: 'totemo / tottemo', hu: 'nagyon', say: 'とっても' }
        ]
      },
      {
        title: 'Öltözködés',
        note: 'A felvételt más-más ige fejezi ki aszerint, hová kerül a ruhadarab.',
        items: [
          { jp: '{着|き}ます', romaji: 'kimasu', hu: 'felvesz (felsőtestre)' },
          { jp: 'はきます', romaji: 'hakimasu', hu: 'felvesz (lábra, alsótestre)' },
          { jp: 'かぶります', romaji: 'kaburimasu', hu: 'feltesz (fejre)' },
          { jp: 'かけます', romaji: 'kakemasu', hu: 'feltesz (szemüveget)' },
          { jp: 'シャツ', romaji: 'shatsu', hu: 'ing, póló' },
          { jp: 'セーター', romaji: 'sētā', hu: 'pulóver' },
          { jp: 'ズボン', romaji: 'zubon', hu: 'nadrág' },
          { jp: 'スカート', romaji: 'sukāto', hu: 'szoknya' },
          { jp: '{靴|くつ}', romaji: 'kutsu', hu: 'cipő' },
          { jp: '{帽子|ぼうし}', romaji: 'bōshi', hu: 'sapka, kalap' },
          { jp: 'めがね', romaji: 'megane', hu: 'szemüveg' }
        ]
      },
      {
        title: 'Külső és belső',
        items: [
          { jp: '{背|せ}が{高|たか}い', romaji: 'se ga takai', hu: 'magas (ember)' },
          { jp: '{背|せ}が{低|ひく}い', romaji: 'se ga hikui', hu: 'alacsony (ember)' },
          { jp: '{髪|かみ}', romaji: 'kami', hu: 'haj' },
          { jp: '{頭|あたま}がいい', romaji: 'atama ga ii', hu: 'okos' },
          { jp: 'やさしい', romaji: 'yasashii', hu: 'kedves, szelíd' },
          { jp: 'かっこいい', romaji: 'kakkoii', hu: 'menő, jóképű' },
          { jp: 'かわいい', romaji: 'kawaii', hu: 'aranyos' },
          { jp: 'まじめ', romaji: 'majime', hu: 'komoly, szorgalmas (な-mn.)' }
        ]
      }
    ],
    culture: [
      {
        title: 'A vonaton nem telefonálunk',
        text: 'A japán vonatokon, metrókon és buszokon szinte senki sem beszél telefonon. A hangosbemondó minden megállónál kéri, hogy a készülékeket némítsák le (<b>マナーモード</b>, „illem-üzemmód"), és a beszélgetéstől tartózkodjanak. Aki mégis hívást kap, eltakarja a száját, halkan közli, hogy visszahívja a másikat, és leteszi. Üzenetet írni viszont szabad, ezért a kocsikban mindenki a képernyőjét nézi, csendben.'
      },
      {
        title: 'Japán hangulatjelek',
        text: 'A japán hangulatjeleket (<b>{顔文字|かおもじ}</b>, „arc-betűk") nem kell oldalra döntve olvasni, és a <b>szemre</b> figyelnek, nem a szájra: (^_^) mosoly, (;_;) sírás, (&gt;_&lt;) bosszúság, (?_?) értetlenség. A m(_ _)m mély meghajlást ábrázol: a két m a földre tett kéz, középen a lehajtott fej. Köszönetre és bocsánatkérésre egyaránt használják.'
      },
      {
        title: 'Mikor válts közvetlen stílusra?',
        text: 'Külföldiként a biztos választás mindig a です / ます. Közvetlen stílusra akkor válthatsz, ha a másik <b>egyidős vagy fiatalabb</b>, közeli viszonyban vagytok, és ő maga is így beszél veled. Idősebb ismerős, {先輩|せんぱい}, tanár felé akkor is az udvarias stílus marad, ha ő rövid alakokban szól hozzád: a stílus nem kölcsönös, hanem a viszonyt tükrözi.'
      }
    ],
    quiz: [
      { q: 'Mi a {行|い}きました közvetlen (rövid) alakja?', a: '{行|い}った', wrong: ['{行|い}く', '{行|い}かない', '{行|い}って'], why: 'A ました rövid párja a た-alak.' },
      { q: 'Mi a {食|た}べません közvetlen alakja?', a: '{食|た}べない', wrong: ['{食|た}べた', '{食|た}べる', '{食|た}べなかった'], why: 'A ません rövid párja a ない-alak.' },
      { q: '„Ma szünnap van." Közvetlen stílusban mi hiányzik?', jp: '{今日|きょう}は{休|やす}み＿。', a: 'だ', wrong: ['です', 'な', 'の'], why: 'Főnév után a です rövid alakja だ.' },
      { q: '„Esik az eső." Mi hiányzik?', jp: '{雨|あめ}が＿います。', a: '{降|ふ}って', wrong: ['{降|ふ}り', '{降|ふ}る', '{降|ふ}った'], why: 'Folyamat: て-alak + います.' },
      { q: 'Melyik mondat jelenti: „Tokióban lakom."', a: '{東京|とうきょう}に{住|す}んでいます。', wrong: ['{東京|とうきょう}に{住|す}みます。', '{東京|とうきょう}で{住|す}みました。', '{東京|とうきょう}を{住|す}んでいます。'], why: 'A lakóhely tartós állapot: {住|す}んでいます, a hely に-vel.' },
      { q: '„Annának hosszú a haja." Mi hiányzik?', jp: 'アンナさんは{髪|かみ}＿{長|なが}いです。', a: 'が', wrong: ['を', 'に', 'で'], why: 'Az egész は, a rész が.' },
      {
        q: 'Mit jelent: これはきのう{買|か}った{本|ほん}です。',
        a: 'Ez az a könyv, amit tegnap vettem.',
        wrong: [
          'Tegnap ezt a könyvet olvastam.',
          'Ezt a könyvet holnap veszem meg.',
          'Ez a könyv tegnap elveszett.'
        ],
        why: 'A főnév előtti rövid alakú mondat jelző: „a tegnap vett könyv".'
      },
      { q: '„A szemüveges ember Tanaka." Mi hiányzik?', jp: 'めがねを＿{人|ひと}は{田中|たなか}さんです。', a: 'かけている', wrong: ['かけています', 'かけて', 'かけるの'], why: 'Főnév előtt rövid alak áll: かけている + {人|ひと}.' },
      { q: 'Hogyan mondod: „Nem tudom."', a: '{知|し}りません。', wrong: ['{知|し}っていません。', '{知|し}りています。', '{知|し}らないでください。'], why: 'Tudom: {知|し}っています; nem tudom: {知|し}りません.' },
      { q: '„Anyám bankban dolgozik." Mi hiányzik?', jp: '{母|はは}は{銀行|ぎんこう}で＿。', a: '{働|はたら}いています', wrong: ['{働|はたら}きています', '{働|はたら}っています', '{働|はたら}んでいます'], why: 'き → いて; a foglalkozás tartós állapot: {働|はたら}いています.' },
      { q: 'Hogyan kérdezed meg egy barátodtól: „Mész?"', a: '{行|い}く？', wrong: ['{行|い}くか。', '{行|い}くだ？', '{行|い}きますだ？'], why: 'Közvetlen stílusban a kérdést az emelkedő hanglejtés jelzi, か nélkül.' },
      { q: 'Mi az おいしいです közvetlen alakja?', a: 'おいしい', wrong: ['おいしいだ', 'おいしだ', 'おいしく'], why: 'Az い-melléknévről egyszerűen lemarad a です; だ nem kerül utána.' },
      { q: 'Mi a 〜てください közvetlen párja?', a: '〜て', wrong: ['〜てだ', '〜てか', '〜ない'], why: 'Barátok között a ください elmarad: {待|ま}って, {見|み}て.' },
      {
        q: 'Mit jelent: {兄|あに}は{結婚|けっこん}しています。',
        a: 'A bátyám házas.',
        wrong: ['A bátyám éppen most házasodik.', 'A bátyám meg fog házasodni.', 'A bátyám házasodni szeretne.'],
        why: 'A {結婚|けっこん}します pillanatnyi változás: a 〜ています az eredmény fennállását jelenti.'
      },
      { q: 'Mit jelent: {今|いま}{晩|ばん}ごはんを{食|た}べています。', a: 'Éppen vacsorázom.', wrong: ['Minden este vacsorázom.', 'Már megvacsoráztam.', 'Vacsorázni fogok.'], why: 'Elnyúló cselekvésnél a 〜ています azt jelenti: éppen zajlik.' },
      { q: 'Melyik ige kell a cipő viselésére?', a: 'はいています', wrong: ['{着|き}ています', 'かぶっています', 'かけています'], why: 'Lábra és alsótestre az はきます ige való.' },
      {
        q: '„A szemüveges ember, akivel tegnap találkoztam" — melyik a helyes?',
        a: 'きのう{会|あ}っためがねの{人|ひと}',
        wrong: ['きのう{会|あ}いましためがねの{人|ひと}', 'めがねの{人|ひと}はきのう{会|あ}った', '{人|ひと}きのう{会|あ}っためがねの'],
        why: 'A jelzői mondat rövid alakban, a főnév előtt áll.'
      },
      { q: '„A curry, amit én főztem." Melyik partikula hiányzik?', jp: 'わたし＿{作|つく}ったカレー', a: 'が', wrong: ['は', 'を', 'に'], why: 'A jelzői mondat alanya が-t (vagy の-t) kap, は-t nem.' },
      { q: 'Tanárodat hívod telefonon. Hogyan kérdezed meg, ráér-e?', a: '{今|いま}、よろしいですか。', wrong: ['{今|いま}、ちょっといい？', '{今|いま}、ひま？', 'もしもし、いいね。'], why: 'Tanárnak az udvarias, tiszteletteljes forma jár: よろしいですか.' },
      { q: 'Mit ábrázol a m(_ _)m hangulatjel?', a: 'mély meghajlást: köszönetet vagy bocsánatkérést', wrong: ['alvást', 'sírást', 'dühöt'], why: 'A két m a földre tett kéz, középen a lehajtott fej.' }
    ]
  },

  /* ── 13. lecke ────────────────────────────────────── */
  {
    id: 'l13', no: 13, book: 'Dekiru 1', title: 'Ajándék',
    lead: 'Ajándékot választasz az áruházban, rendelsz a kávézóban, megindokolod a döntésed, és elmondod, ki kinek mit adott és kitől mit kapott.',
    cando: [
      'Megindokolod, mit miért teszel, udvariasan.',
      'Színt, méretet kérsz a boltban, és megmondod, melyiket választod.',
      'Rendelsz és fizetsz egy kávézóban.',
      'Elmondod, kinek mit adtál és kitől mit kaptál.'
    ],
    intro: [
      'A lecke közepe a japán nyelvtan egyik híres nehézsége: az <b>adás és kapás három igéje</b>. A magyar egyetlen „ad" igét használ, bárki ad bárkinek. A japán megkülönbözteti, <b>merre megy az ajándék</b>: tőlem kifelé (<b>あげます</b>), felém (<b>くれます</b>), vagy a kapó szemszögéből nézve (<b>もらいます</b>). A nyelv így mindig megmutatja, ki áll a beszélőhöz közelebb.',
      'A három ige mögött egy gondolat húzódik: a japán beszélő a világot <b>belső körre</b> (én, a családom, a csoportom) és <b>külső körre</b> (mindenki más) osztja. A くれます azt jelzi: valami kívülről érkezett be a körömbe. Ezt a szemléletet később a szívességek kifejezésénél is viszontlátod (22. lecke).',
      'A lecke másik két eszköze a mindennapi vásárláshoz kell: a <b>ので</b> (udvarias „mivel"), és a főnevet helyettesítő <b>の</b> („a piros", „a nagyobbik").'
    ],
    dialogue: {
      title: 'Ajándékvásárlás',
      scene: 'Anna karácsonyi ajándékot keres Juinak az áruházban. Utána Kennel beül egy kávézóba.',
      lines: [
        { who: 'Eladó', jp: 'いらっしゃいませ。{何|なに}かお{探|さが}しですか。', romaji: 'Irasshaimase. Nanika o-sagashi desu ka.', hu: 'Üdvözlöm! Keres valamit?' },
        { who: 'Anna', jp: 'セーターを{探|さが}しているんですが…。{友|とも}だちのプレゼントなんです。', romaji: 'Sētā o sagashite iru n desu ga… Tomodachi no purezento na n desu.', hu: 'Pulóvert keresek… A barátnőmnek lesz ajándék.' },
        { who: 'Eladó', jp: 'セーターはこちらでございます。この{赤|あか}いのはいかがですか。', romaji: 'Sētā wa kochira de gozaimasu. Kono akai no wa ikaga desu ka.', hu: 'A pulóverek itt vannak. Ez a piros hogy tetszik?' },
        { who: 'Anna', jp: 'いいですね。もう{少|すこ}し{小|ちい}さいのはありますか。', romaji: 'Ii desu ne. Mō sukoshi chiisai no wa arimasu ka.', hu: 'Szép. Van egy kicsit kisebb?' },
        { who: 'Eladó', jp: '{申|もう}し{訳|わけ}ありません。{赤|あか}は{今|いま}ちょっと…。{青|あお}いのはございますが。', romaji: 'Mōshiwake arimasen. Aka wa ima chotto… Aoi no wa gozaimasu ga.', hu: 'Nagyon sajnálom. Pirosból most éppen… Kékből viszont van.' },
        { who: 'Anna', jp: 'じゃあ、{青|あお}いのにします。プレゼントなので、{包|つつ}んでください。', romaji: 'Jā, aoi no ni shimasu. Purezento na node, tsutsunde kudasai.', hu: 'Akkor a kéket kérem. Mivel ajándék lesz, kérem, csomagolja be.' },
        { who: 'Eladó', jp: 'かしこまりました。', romaji: 'Kashikomarimashita.', hu: 'Igenis, értettem.' },
        { who: 'Pincér', jp: 'お{決|き}まりですか。', romaji: 'O-kimari desu ka.', hu: 'Választottak már?' },
        { who: 'Ken', jp: 'アイスコーヒーをひとつと、ケーキセットをひとつお{願|ねが}いします。', romaji: 'Aisu kōhī o hitotsu to, kēki setto o hitotsu onegai shimasu.', hu: 'Egy jegeskávét és egy süteménymenüt kérünk.' },
        { who: 'Anna', jp: 'この{時計|とけい}、すてきですね。', romaji: 'Kono tokei, suteki desu ne.', hu: 'De szép ez az óra!' },
        {
          who: 'Ken',
          jp: '{誕生日|たんじょうび}に{父|ちち}がくれました。アンナさんは{誕生日|たんじょうび}に{何|なに}をもらいましたか。',
          romaji: 'Tanjōbi ni chichi ga kuremashita. Anna-san wa tanjōbi ni nani o moraimashita ka.',
          hu: 'A születésnapomra kaptam apámtól. Te mit kaptál a születésnapodra?'
        },
        {
          who: 'Anna',
          jp: '{母|はは}にかばんをもらいました。{私|わたし}も{毎年|まいとし}{母|はは}に{花|はな}をあげます。',
          romaji: 'Haha ni kaban o moraimashita. Watashi mo maitoshi haha ni hana o agemasu.',
          hu: 'Anyámtól táskát kaptam. Én is minden évben virágot adok anyámnak.'
        }
      ],
      notes: [
        'Az eladó <b>tiszteletteljes nyelvet</b> használ a vevővel: です helyett <b>でございます</b>, あります helyett <b>ございます</b>, いいですか helyett <b>いかがですか</b>. Neked nem kell így beszélned, de értened kell.',
        'A hiány japánul itt is félmondat: <b>{赤|あか}は{今|いま}ちょっと…</b> — az eladó nem mondja ki, hogy nincs. Előtte bocsánatot kér: {申|もう}し{訳|わけ}ありません.',
        'Anna a <b>の</b>-val kerüli el a „pulóver" szó ismétlését: {赤|あか}いの (a piros), {小|ちい}さいの (kisebb), {青|あお}いの (a kék).',
        'Ken azt mondja: {父|ちち}<b>が</b>くれました (apám adta nekem). Anna ugyanezt a helyzetet a kapó oldaláról mondja: {母|はは}<b>に</b>もらいました (anyámtól kaptam). A két mondat ugyanarról szól, csak a nézőpont más.',
        'A <b>かしこまりました</b> az eladók, pincérek „értettem"-je: a わかりました szerény változata.'
      ]
    },
    points: [
      {
        title: '〜ので', sub: 'mivel…, ezért…',
        pattern: 'rövid alak + ので · főnév / な-melléknév + なので',
        body: 'A <b>ので</b> okot ad meg, mint a から, de tárgyilagosabb és udvariasabb: kéréshez, mentegetőzéshez ez illik jobban. Rövid alak áll előtte; főnév és な-melléknév után <b>なので</b>.',
        more: [
          'A <b>ので</b> és a <b>から</b> egyaránt okot ad meg, de más a hangjuk. A から a beszélő <b>saját</b> indokát mondja ki, kicsit erélyesen. A ので <b>tárgyilagos</b>: a helyzetet írja le, amelyből a következmény magától adódik. Ezért kéréshez, engedélykéréshez, mentegetőzéshez a ので illik.',
          'A ので előtt <b>rövid alak</b> áll. Főnév és な-melléknév után a だ helyén <b>な</b> jelenik meg: {休|やす}み<b>な</b>ので, {静|しず}か<b>な</b>ので. Nagyon udvarias beszédben 〜ます / 〜です alak is állhat előtte.',
          'A mondat vége itt is elhagyható, ha a helyzetből érthető: あまいものも{食|た}べたいので… (mert édességet is ennék…).'
        ],
        tables: [
          {
            caption: 'Mi áll a ので előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['ige', 'rövid alak', 'あめが ふっている<b>ので</b>'],
              ['い-mn.', 'alapalak', 'たかい<b>ので</b>'],
              ['な-mn.', '+ <b>な</b>', 'ひま<b>なので</b>'],
              ['főnév', '+ <b>な</b>', 'プレゼント<b>なので</b>']
            ]
          },
          {
            caption: 'から vagy ので?',
            head: ['', 'から', 'ので'],
            rows: [
              ['hangnem', 'személyes, határozott', 'tárgyilagos, udvarias'],
              ['előtte', 'udvarias vagy rövid alak', 'rövid alak (な a főnév után)'],
              ['kérés előtt', 'kissé nyers', 'ez illik']
            ]
          }
        ],
        examples: [
          { jp: '{雨|あめ}が{降|ふ}っているので、{出|で}かけません。', romaji: 'Ame ga futte iru node, dekakemasen.', hu: 'Mivel esik az eső, nem megyek el itthonról.' },
          { jp: '{今日|きょう}は{休|やす}みなので、{家|うち}にいます。', romaji: 'Kyō wa yasumi na node, uchi ni imasu.', hu: 'Mivel ma szünnap van, otthon vagyok.' },
          { jp: '{時間|じかん}がないので、タクシーで{行|い}きます。', romaji: 'Jikan ga nai node, takushī de ikimasu.', hu: 'Mivel nincs időm, taxival megyek.' },
          { jp: 'プレゼントなので、{包|つつ}んでください。', romaji: 'Purezento na node, tsutsunde kudasai.', hu: 'Mivel ajándék lesz, kérem, csomagolja be.' },
          { jp: '{頭|あたま}が{痛|いた}いので、{早|はや}く{帰|かえ}ります。', romaji: 'Atama ga itai node, hayaku kaerimasu.', hu: 'Fáj a fejem, ezért korán hazamegyek.' }
        ],
        mistakes: [
          { bad: '{休|やす}みだので、{家|うち}にいます。', good: '{休|やす}みなので、{家|うち}にいます。', why: 'Főnév után a ので előtt な áll, nem だ.' }
        ]
      },
      {
        title: '〜にします', sub: 'ezt választom',
        pattern: 'főnév + にします',
        body: 'Ha több lehetőség közül döntesz, a választott dolog <b>に</b>-t kap: „emellett döntök". Étteremben, boltban ezzel mondod meg, mit kérsz.',
        more: [
          'Ezzel a szerkezettel a 10. leckében, a menzán már találkoztál: a <b>〜にします</b> döntést jelent be. Boltban a szín, a méret, a darab kiválasztására is ez szolgál.',
          'A の-val helyettesített főnévhez is járulhat: {青|あお}い<b>のに</b>します (a kéket választom). Közvetlen stílusban: コーヒー<b>にする</b>.'
        ],
        examples: [
          { jp: '{私|わたし}はコーヒーにします。', romaji: 'Watashi wa kōhī ni shimasu.', hu: 'Én kávét kérek.' },
          { jp: 'プレゼントは{花|はな}にしました。', romaji: 'Purezento wa hana ni shimashita.', hu: 'Ajándéknak virágot választottam.' },
          { jp: '{何|なに}にしますか。', romaji: 'Nani ni shimasu ka.', hu: 'Mit választasz?' },
          { jp: '{青|あお}いのにします。', romaji: 'Aoi no ni shimasu.', hu: 'A kéket választom.' },
          { jp: 'どれにしますか。', romaji: 'Dore ni shimasu ka.', hu: 'Melyiket választod?' }
        ],
        notes: [
          'Ne keverd a 〜に なります szerkezettel (valamivé válik): a します <b>döntés</b>, a なります <b>változás</b>. Ezt a 18. leckében tanulod.'
        ]
      },
      {
        title: '〜の', sub: 'a főnév helyett',
        pattern: 'melléknév + の · főnév + の',
        body: 'Ha már tudni, miről van szó, a főnevet a <b>の</b> helyettesíti: „a fekete", „a nagyobb". い-melléknév után közvetlenül áll, な-melléknév után <b>なの</b>. Főnév után csak egy の marad: {日本|にほん}の (a japán).',
        more: [
          'A <b>の</b> itt névmásként viselkedik: annak a főnévnek a helyére áll, amelyről már szó volt. Magyarul ezt a névelő + melléknév adja vissza: „a piros", „a nagyobb", „az olcsó".',
          'Az い-melléknév után közvetlenül áll ({赤|あか}い<b>の</b>), a な-melléknév után な-val (きれい<b>なの</b>), ige után rövid alakkal (きのう{買|か}った<b>の</b> = amit tegnap vettem).',
          'Főnév után már amúgy is の áll (birtokos, eredet), ezért ott nem kettőződik meg: {日本|にほん}<b>の</b>です (japán gyártmány), {私|わたし}<b>の</b>です (az enyém).'
        ],
        tables: [
          {
            caption: 'A helyettesítő の',
            head: ['Előtte', 'Alak', 'Magyarul'],
            rows: [
              ['い-mn.', 'あかい<b>の</b>', 'a piros'],
              ['な-mn.', 'きれい<b>なの</b>', 'a szép'],
              ['ige', 'きのう かった<b>の</b>', 'amit tegnap vettem'],
              ['főnév', 'にほん<b>の</b>', 'a japán (gyártmányú)']
            ]
          }
        ],
        examples: [
          { jp: '{黒|くろ}いのをください。', romaji: 'Kuroi no o kudasai.', hu: 'A feketét kérem.' },
          { jp: 'もっと{大|おお}きいのはありますか。', romaji: 'Motto ōkii no wa arimasu ka.', hu: 'Van nagyobb?' },
          { jp: 'このかばんは{日本|にほん}のです。', romaji: 'Kono kaban wa Nihon no desu.', hu: 'Ez a táska japán gyártmány.' },
          { jp: 'もう{少|すこ}し{安|やす}いのはありませんか。', romaji: 'Mō sukoshi yasui no wa arimasen ka.', hu: 'Nincs egy kicsit olcsóbb?' },
          { jp: 'きれいなのがほしいです。', romaji: 'Kirei na no ga hoshii desu.', hu: 'Egy szépet szeretnék.' }
        ],
        notes: [
          'A <b>もう{少|すこ}し</b> („egy kicsit még") a boltban a legudvariasabb módja annak, hogy mást kérj: もう{少|すこ}し{大|おお}きいの, もう{少|すこ}し{安|やす}いの.'
        ],
        mistakes: [
          { bad: '{赤|あか}いなのをください。', good: '{赤|あか}いのをください。', why: 'い-melléknév után nincs な: a の közvetlenül kapcsolódik.' }
        ]
      },
      {
        title: 'あげます', sub: 'adok (másnak)',
        pattern: 'A は B に C を あげます',
        body: 'Az <b>あげます</b> kifelé irányuló adás: én adok valakinek, vagy valaki egy harmadik embernek. Aki kapja, <b>に</b>-t kap; amit adsz, <b>を</b>-t.',
        more: [
          'Az <b>あげます</b> a beszélőtől <b>kifelé</b> irányuló adás. Akkor használod, ha te adsz valakinek, vagy ha két másik ember között történik az adás.',
          'A partikulák: az adó <b>は / が</b>, a kapó <b>に</b>, az ajándék <b>を</b>. Az alkalmat (születésnap, karácsony) szintén に jelöli, ezért egy mondatban két に is lehet.',
          'Az あげます-t <b>soha</b> nem használod, ha a kapó te vagy: „nekem ad" = くれます.'
        ],
        examples: [
          { jp: '{私|わたし}は{友|とも}だちに{本|ほん}をあげました。', romaji: 'Watashi wa tomodachi ni hon o agemashita.', hu: 'Adtam a barátomnak egy könyvet.' },
          { jp: '{母|はは}の{誕生日|たんじょうび}に{花|はな}をあげます。', romaji: 'Haha no tanjōbi ni hana o agemasu.', hu: 'Anyám születésnapjára virágot adok.' },
          { jp: '{田中|たなか}さんは{山田|やまだ}さんにチョコレートをあげました。', romaji: 'Tanaka-san wa Yamada-san ni chokorēto o agemashita.', hu: 'Tanaka csokit adott Jamadának.' },
          { jp: 'クリスマスに{何|なに}をあげますか。', romaji: 'Kurisumasu ni nani o agemasu ka.', hu: 'Mit adsz karácsonyra?' },
          { jp: '{妹|いもうと}にマフラーをあげました。', romaji: 'Imōto ni mafurā o agemashita.', hu: 'Sálat adtam a húgomnak.' }
        ],
        notes: [
          'Feljebbvalónak (tanárnak, főnöknek) az あげます szerény párja jár: さしあげます. Növénynek, állatnak, kisgyereknek régiesen やります. Ezekről a 18. leckében lesz szó.'
        ],
        mistakes: [
          { bad: '{友|とも}だちが{私|わたし}にケーキをあげました。', good: '{友|とも}だちが{私|わたし}にケーキをくれました。', why: 'Ha a kapó a beszélő, az ige くれます.' }
        ]
      },
      {
        title: 'くれます', sub: 'ad (nekem)',
        pattern: 'A が ({私|わたし}に) C を くれます',
        body: 'Ha <i>nekem</i> (vagy a családomnak) ad valaki, az ige <b>くれます</b>. A {私|わたし}に többnyire el is marad, mert az ige maga megmondja, hogy felém irányul az adás.',
        more: [
          'A <b>くれます</b> a beszélő <b>felé</b> irányuló adás: valaki nekem ad, vagy valakinek, aki hozzám tartozik (családtag, közeli barát). Az adó mindig más, a kapó mindig „én vagy az enyéim".',
          'Mivel az ige maga megmondja az irányt, a {私|わたし}に rendszerint elmarad: {父|ちち}がカメラをくれました = apám adott (nekem) egy fényképezőgépet.',
          'Az adó itt <b>が</b>-t kap, mert ő az új információ („ki adta?"). Kérdés: だれ<b>が</b>くれましたか.'
        ],
        tables: [
          {
            caption: 'Ki ad kinek?',
            head: ['Ige', 'Irány', 'Példa'],
            rows: [
              ['あげます', 'én → más · más → más', 'わたしは ともだち<b>に</b> ほんを あげました。'],
              ['くれます', 'más → én (a családom)', 'ともだち<b>が</b> (わたしに) ほんを くれました。'],
              ['もらいます', 'én ← más (a kapó szemével)', 'わたしは ともだち<b>に</b> ほんを もらいました。']
            ]
          }
        ],
        examples: [
          { jp: '{友|とも}だちが{私|わたし}にケーキをくれました。', romaji: 'Tomodachi ga watashi ni kēki o kuremashita.', hu: 'A barátom tortát adott nekem.' },
          { jp: '{父|ちち}がカメラをくれました。', romaji: 'Chichi ga kamera o kuremashita.', hu: 'Apám adott nekem egy fényképezőgépet.' },
          { jp: 'これは{姉|あね}がくれたかばんです。', romaji: 'Kore wa ane ga kureta kaban desu.', hu: 'Ez az a táska, amit a nővéremtől kaptam.' },
          { jp: 'だれがその{時計|とけい}をくれましたか。', romaji: 'Dare ga sono tokei o kuremashita ka.', hu: 'Ki adta neked azt az órát?' },
          { jp: '{友|とも}だちが{妹|いもうと}にお{菓子|かし}をくれました。', romaji: 'Tomodachi ga imōto ni o-kashi o kuremashita.', hu: 'A barátom édességet adott a húgomnak.' }
        ],
        notes: ['A くれます mindig egy kis hálát is hordoz: nem csak tényt közöl, azt is jelzi, hogy jólesett.'],
        tip: 'Magyarul mindkettő „ad", japánul az irány dönt: tőlem kifelé あげます, felém くれます. A {私|わたし}にあげました hibás.'
      },
      {
        title: 'もらいます', sub: 'kapok',
        pattern: 'A は B に / から C を もらいます',
        body: 'A <b>もらいます</b> a kapó szemszögéből mondja el ugyanazt. Akitől kapsz, <b>に</b> vagy <b>から</b> jelöli; intézménynél (iskola, cég) inkább から.',
        more: [
          'A <b>もらいます</b> ugyanazt az eseményt a <b>kapó</b> szemszögéből meséli el: a kapó a mondat témája. A kapó itt is te vagy, vagy valaki a belső körödből; másról is mondhatod, ha az ő oldaláról nézed a dolgot.',
          'Az, <b>akitől</b> kapsz, <b>に</b>-t vagy <b>から</b>-t kap. Embernél mindkettő jó; intézménynél, cégnél, iskolánál csak a から.',
          'A くれます és a もらいます mondat párban áll: {母|はは}<b>が</b>くれました = {母|はは}<b>に</b>もらいました. Az első az adót emeli ki, a második a kapót.'
        ],
        tables: [
          {
            caption: 'Mit jelöl a に?',
            head: ['Ige', 'A に jelentése', 'Példa'],
            rows: [
              ['あげます', 'akinek adok', 'ははに はなを あげます。 — Anyámnak virágot adok.'],
              ['もらいます', 'akitől kapok', 'ははに はなを もらいます。 — Anyámtól virágot kapok.']
            ]
          }
        ],
        examples: [
          { jp: '{私|わたし}は{友|とも}だちにプレゼントをもらいました。', romaji: 'Watashi wa tomodachi ni purezento o moraimashita.', hu: 'Ajándékot kaptam a barátomtól.' },
          { jp: '{会社|かいしゃ}から{手紙|てがみ}をもらいました。', romaji: 'Kaisha kara tegami o moraimashita.', hu: 'Levelet kaptam a cégtől.' },
          { jp: 'だれにもらいましたか。', romaji: 'Dare ni moraimashita ka.', hu: 'Kitől kaptad?' },
          { jp: '{誕生日|たんじょうび}に{何|なに}をもらいましたか。', romaji: 'Tanjōbi ni nani o moraimashita ka.', hu: 'Mit kaptál a születésnapodra?' },
          { jp: '{父|ちち}に{時計|とけい}をもらいました。', romaji: 'Chichi ni tokei o moraimashita.', hu: 'Apámtól órát kaptam.' }
        ],
        mistakes: [
          { bad: '{友|とも}だちは{私|わたし}にプレゼントをもらいました。', good: '{私|わたし}は{友|とも}だちにプレゼントをもらいました。', why: 'A もらいます alanya a kapó. Ha a barát kap tőled, azt így mondod: {私|わたし}は{友|とも}だちにプレゼントをあげました.' }
        ],
        tip: 'Figyelj: az あげます mellett a に azt jelöli, <i>akinek</i> adsz, a もらいます mellett azt, <i>akitől</i> kapsz.'
      }
    ],
    phrases: [
      { jp: '{何|なに}かお{探|さが}しですか。', romaji: 'Nanika o-sagashi desu ka.', hu: 'Keres valamit?', note: 'Az eladó kérdése. Ha csak nézelődsz: {見|み}ているだけです.' },
      { jp: '{見|み}ているだけです。', romaji: 'Mite iru dake desu.', hu: 'Csak nézelődöm.' },
      { jp: 'ほかの{色|いろ}はありますか。', romaji: 'Hoka no iro wa arimasu ka.', hu: 'Van más színben?' },
      { jp: '{申|もう}し{訳|わけ}ありません。', romaji: 'Mōshiwake arimasen.', hu: 'Nagyon sajnálom.', note: 'A すみません hivatalos, mély változata; eladók, ügyintézők mondják.' },
      { jp: 'かしこまりました。', romaji: 'Kashikomarimashita.', hu: 'Igenis, értettem.' },
      { jp: '{何名様|なんめいさま}ですか。', romaji: 'Nanmei-sama desu ka.', hu: 'Hányan vannak?', note: 'Étterembe lépve ezt kérdezik. Válasz: {二人|ふたり}です.' },
      { jp: 'お{決|き}まりですか。', romaji: 'O-kimari desu ka.', hu: 'Választottak már?' },
      { jp: 'お{会計|かいけい}をお{願|ねが}いします。', romaji: 'O-kaikei o onegai shimasu.', hu: 'A számlát kérem.' },
      { jp: '{別々|べつべつ}でお{願|ねが}いします。', romaji: 'Betsubetsu de onegai shimasu.', hu: 'Külön fizetünk.', note: 'Ha együtt fizettek: いっしょでお{願|ねが}いします.' }
    ],
    words: [
      {
        title: 'Színek',
        note: 'Hat alapszínnek van い-melléknév alakja is; a többi főnév, és の-val kapcsolódik: みどり<b>の</b>かばん.',
        items: [
          { jp: '{赤|あか}い', romaji: 'akai', hu: 'piros' },
          { jp: '{青|あお}い', romaji: 'aoi', hu: 'kék' },
          { jp: '{白|しろ}い', romaji: 'shiroi', hu: 'fehér' },
          { jp: '{黒|くろ}い', romaji: 'kuroi', hu: 'fekete' },
          { jp: '{黄色|きいろ}い', romaji: 'kiiroi', hu: 'sárga' },
          { jp: '{茶色|ちゃいろ}い', romaji: 'chairoi', hu: 'barna' },
          { jp: '{緑|みどり}', romaji: 'midori', hu: 'zöld (főnév)' },
          { jp: 'ピンク', romaji: 'pinku', hu: 'rózsaszín (főnév)' },
          { jp: '{色|いろ}', romaji: 'iro', hu: 'szín' }
        ]
      },
      {
        title: 'Ajándékok',
        items: [
          { jp: 'プレゼント', romaji: 'purezento', hu: 'ajándék' },
          { jp: 'セーター', romaji: 'sētā', hu: 'pulóver' },
          { jp: 'マフラー', romaji: 'mafurā', hu: 'sál' },
          { jp: '{手袋|てぶくろ}', romaji: 'tebukuro', hu: 'kesztyű' },
          { jp: 'ネクタイ', romaji: 'nekutai', hu: 'nyakkendő' },
          { jp: '{時計|とけい}', romaji: 'tokei', hu: 'óra' },
          { jp: '{花|はな}', romaji: 'hana', hu: 'virág' },
          { jp: 'お{菓子|かし}', romaji: 'o-kashi', hu: 'édesség, sütemény' },
          { jp: 'サイズ', romaji: 'saizu', hu: 'méret' }
        ]
      },
      {
        title: 'Alkalmak',
        items: [
          { jp: 'クリスマス', romaji: 'kurisumasu', hu: 'karácsony' },
          { jp: '{誕生日|たんじょうび}', romaji: 'tanjōbi', hu: 'születésnap' },
          { jp: 'バレンタインデー', romaji: 'barentain dē', hu: 'Valentin-nap' },
          { jp: '{母|はは}の{日|ひ}', romaji: 'haha no hi', hu: 'anyák napja' },
          { jp: 'お{祝|いわ}い', romaji: 'o-iwai', hu: 'ünneplés; ajándék alkalomra' },
          { jp: '{恋人|こいびと}', romaji: 'koibito', hu: 'szerelmes, pár' }
        ]
      }
    ],
    culture: [
      {
        title: 'A japán karácsony',
        text: 'Japánban a karácsony nem vallási és nem családi ünnep: a fiatalok a <b>párjukkal</b> vagy a barátaikkal töltik, a kisgyerekes családok tortát vesznek. A <b>クリスマスケーキ</b> hófehér, tejszínes-epres piskótatorta, az ünnepi vacsora pedig meglepő módon gyakran <b>sült csirke</b>. A nagy családi ünnep az újév: akkor utazik haza mindenki.'
      },
      {
        title: 'A csomagolás az ajándék része',
        text: 'A japán áruházban az ajándékot kérésre gondosan, szinte ünnepélyes pontossággal csomagolják be, külön díj nélkül. Az átadásnál illik szabadkozni: <b>つまらないものですが</b> („semmiség, de…"). Aki kapja, sokszor nem bontja ki azonnal a másik előtt. Utazásból pedig mindig visznek apróságot a kollégáknak, szomszédoknak: ez az <b>お{土産|みやげ}</b>.'
      },
      {
        title: 'Kávéház, kávézó, mangakávézó',
        text: 'A <b>{喫茶店|きっさてん}</b> a régi vágású kávéház: csendes, félhomályos, a kávé mellé pirítóst, szendvicset is adnak. A <b>カフェ</b> a divatos, világos kávézó. A harmadik fajta a <b>まんが{喫茶|きっさ}</b>: itt óradíjat fizetsz egy kis fülkéért, és annyi képregényt olvashatsz a polcokról, amennyit bírsz; az üdítő az automatából ingyen jár.'
      }
    ],
    quiz: [
      { q: '„Mivel esik az eső, nem megyek el itthonról." Mi hiányzik?', jp: '{雨|あめ}が{降|ふ}っている＿、{出|で}かけません。', a: 'ので', wrong: ['より', 'まで', 'だけ'], why: 'Ok: rövid alak + ので.' },
      { q: '„Mivel ma szünnap van, otthon vagyok." Mi hiányzik?', jp: '{今日|きょう}は{休|やす}み＿、{家|うち}にいます。', a: 'なので', wrong: ['ので', 'だので', 'のので'], why: 'Főnév után なので áll.' },
      { q: 'Mit jelent: {私|わたし}はコーヒーにします。', a: 'Én kávét kérek.', wrong: ['Én kávét főzök.', 'Én szeretem a kávét.', 'Nekem van kávém.'], why: 'főnév + にします = ezt választom.' },
      { q: '„A feketét kérem." Mi hiányzik?', jp: '{黒|くろ}い＿をください。', a: 'の', wrong: ['な', 'に', 'が'], why: 'A の a már ismert főnevet helyettesíti: „a fekete".' },
      { q: '„Adtam a barátomnak egy könyvet." Mi hiányzik?', jp: '{私|わたし}は{友|とも}だちに{本|ほん}を＿。', a: 'あげました', wrong: ['くれました', 'もらいました', 'ありました'], why: 'Tőlem kifelé irányuló adás: あげます.' },
      { q: '„A barátom tortát adott nekem." Mi hiányzik?', jp: '{友|とも}だちが{私|わたし}にケーキを＿。', a: 'くれました', wrong: ['あげました', 'もらいました', 'いました'], why: 'Felém irányuló adás: くれます.' },
      { q: '„Ajándékot kaptam a barátomtól." Mi hiányzik?', jp: '{私|わたし}は{友|とも}だち＿プレゼントをもらいました。', a: 'に', wrong: ['を', 'で', 'へ'], why: 'A もらいます mellett a に jelöli, akitől kapsz.' },
      { q: 'Melyik mondat jelenti: „Anyám órát adott nekem."', a: '{母|はは}が{時計|とけい}をくれました。', wrong: ['{母|はは}に{時計|とけい}をあげました。', '{母|はは}が{時計|とけい}をもらいました。', '{母|はは}は{時計|とけい}にしました。'], why: 'Aki ad, が-t kap, és mivel nekem ad, az ige くれます.' },
      { q: '„Mivel nincs időm, taxival megyek." Mi hiányzik?', jp: '{時間|じかん}が＿ので、タクシーで{行|い}きます。', a: 'ない', wrong: ['ないな', 'ないだ', 'なくて'], why: 'A ので előtt rövid alak áll: ない + ので.' },
      { q: 'Mit jelent: だれにもらいましたか。', a: 'Kitől kaptad?', wrong: ['Kinek adtad?', 'Ki kapta meg?', 'Mit kaptál?'], why: 'A もらいます mellett a に „-tól, -től".' },
      {
        q: 'Az eladó azt mondja: セーターはこちらでございます。 Mi a でございます?',
        a: 'a です tiszteletteljes változata',
        wrong: ['a tagadás udvarias formája', 'azt jelenti: „nincs készleten"', 'a múlt idő jele'],
        why: 'Az eladók a vevővel szemben でございます / ございます alakot használnak.'
      },
      {
        q: 'Melyik mondatban helyes az ok megadása?',
        a: '{頭|あたま}が{痛|いた}いので、{帰|かえ}ります。',
        wrong: ['{頭|あたま}が{痛|いた}いだから、{帰|かえ}ります。', '{頭|あたま}が{痛|いた}いなので、{帰|かえ}ります。', '{頭|あたま}が{痛|いた}いだので、{帰|かえ}ります。'],
        why: 'Az い-melléknév után a ので és a から is közvetlenül áll: だ vagy な nem kell.'
      },
      { q: '„Mivel csendes, szeretem." Mi hiányzik?', jp: '{静|しず}か＿ので、{好|す}きです。', a: 'な', wrong: ['だ', 'い', 'の'], why: 'な-melléknév után a ので előtt な áll.' },
      {
        q: '„Van egy kicsit kisebb?" Melyik a helyes?',
        a: 'もう{少|すこ}し{小|ちい}さいのはありますか。',
        wrong: ['もう{少|すこ}し{小|ちい}さいなのはありますか。', 'もう{少|すこ}し{小|ちい}さいがありますか。', 'もう{少|すこ}し{小|ちい}さくのはありますか。'],
        why: 'い-melléknév után a helyettesítő の közvetlenül áll.'
      },
      { q: 'A barátod tortát adott NEKED. Melyik ige kell?', a: 'くれました', wrong: ['あげました', 'もらいました (a barát az alany)', 'しました'], why: 'Ha a kapó a beszélő, az adás igéje くれます.' },
      {
        q: 'Melyik két mondat jelenti ugyanazt?',
        a: '{母|はは}がかばんをくれました。 = {母|はは}にかばんをもらいました。',
        wrong: [
          '{母|はは}がかばんをくれました。 = {母|はは}にかばんをあげました。',
          '{母|はは}にかばんをあげました。 = {母|はは}にかばんをもらいました。',
          '{母|はは}がかばんをあげました。 = {母|はは}がかばんをもらいました。'
        ],
        why: 'A くれます az adó, a もらいます a kapó oldaláról mondja el ugyanazt.'
      },
      { q: '„Levelet kaptam az iskolától." Melyik partikula a legjobb?', jp: '{学校|がっこう}＿{手紙|てがみ}をもらいました。', a: 'から', wrong: ['を', 'で', 'へ'], why: 'Intézménytől kapott dolognál a から használatos.' },
      { q: 'Étterembe lépsz, a pincér megkérdezi: {何名様|なんめいさま}ですか。 Mit felelsz?', a: '{二人|ふたり}です。', wrong: ['{二|ふた}つです。', '{二時|にじ}です。', 'コーヒーにします。'], why: 'A kérdés: hányan vannak? Az embereket ひとり, ふたり, さんにん… számolja.' },
      { q: 'Mit jelent: {別々|べつべつ}でお{願|ねが}いします。', a: 'Külön fizetünk.', wrong: ['Együtt fizetünk.', 'Más színben kérem.', 'Külön asztalt kérünk.'], why: '{別々|べつべつ} = külön-külön; együtt: いっしょで.' },
      {
        q: 'Kivel töltik a japán fiatalok leggyakrabban a karácsonyt?',
        a: 'a párjukkal vagy a barátaikkal',
        wrong: ['a nagyszülőkkel', 'a templomban', 'a munkahelyükön'],
        why: 'Japánban a karácsony nem családi ünnep; a nagy családi ünnep az újév.'
      }
    ]
  },

  /* ── 14. lecke ────────────────────────────────────── */
  {
    id: 'l14', no: 14, book: 'Dekiru 1', title: 'Tervek és vélemények',
    lead: 'Megmondod, mit csináltál már meg és mit nem, sorba rendezed a teendőket, véleményt mondasz, a terveidről és a vágyaidról beszélsz, és megtanulod az újévi jókívánságokat.',
    cando: [
      'Megmondod, mi van már kész, és mi nincs még.',
      'Elmondod, mit csinálsz valami előtt és után.',
      'Véleményt mondasz, és beszélsz a terveidről, céljaidról.',
      'Újévi jókívánságot mondasz és írsz, és biztatsz valakit.'
    ],
    intro: [
      'Ez a lecke az <b>időről és a jövőről</b> szól. Először azt tanulod meg, hogyan mondod, hogy valami <b>már megtörtént</b> vagy <b>még nem</b> (もう, まだ), és hogyan rendezel sorba két cselekvést (〜たあとで, 〜るまえに). Itt a japán logikája eltér a magyartól: a „még nem ettem" nem múlt idő, és a „mielőtt" előtt soha nem állhat múlt.',
      'A másik rész arról szól, ami a fejedben van: mit <b>gondolsz</b> (〜と{思|おも}います), mire <b>vágysz</b> (〜がほしい), és mit <b>tervezel</b> (〜つもりです). Ezek mind rövid alakhoz kapcsolódnak, és mind a te belső világodról szólnak: más ember gondolatairól, vágyairól a japán csak óvatosan, közvetve beszél.',
      'A három szerkezet egy fokozatsort is ad a szándék erősségére: a 〜たいです puszta vágy, a 〜たいと{思|おも}います megfontolt óhaj, a 〜つもりです pedig már eldöntött terv.'
    ],
    dialogue: {
      title: 'Újév napján a szentélynél',
      scene: 'Január elseje van. Anna és Jui az év első szentélylátogatására mennek, és útközben a terveikről beszélgetnek.',
      lines: [
        { who: 'Jui', jp: 'アンナさん、{明|あ}けましておめでとうございます。', romaji: 'Anna-san, akemashite omedetō gozaimasu.', hu: 'Anna, boldog új évet kívánok!' },
        { who: 'Anna', jp: '{明|あ}けましておめでとうございます。{今年|ことし}もよろしくお{願|ねが}いします。', romaji: 'Akemashite omedetō gozaimasu. Kotoshi mo yoroshiku onegai shimasu.', hu: 'Boldog új évet! Az idén is számítok a jóindulatodra.' },
        { who: 'Jui', jp: 'もうお{雑煮|ぞうに}を{食|た}べましたか。', romaji: 'Mō o-zōni o tabemashita ka.', hu: 'Ettél már újévi levest?' },
        { who: 'Anna', jp: 'いいえ、まだ{食|た}べていません。{神社|じんじゃ}へ{行|い}ったあとで、{食|た}べます。', romaji: 'Iie, mada tabete imasen. Jinja e itta ato de, tabemasu.', hu: 'Nem, még nem ettem. Majd a szentély után eszem.' },
        { who: 'Jui', jp: '{今年|ことし}の{目標|もくひょう}は{何|なん}ですか。', romaji: 'Kotoshi no mokuhyō wa nan desu ka.', hu: 'Mi az idei célod?' },
        {
          who: 'Anna',
          jp: 'ハンガリーへ{帰|かえ}るまえに、{日本語|にほんご}の{試験|しけん}を{受|う}けるつもりです。',
          romaji: 'Hangarī e kaeru mae ni, nihongo no shiken o ukeru tsumori desu.',
          hu: 'Mielőtt hazamegyek Magyarországra, le szeretném tenni a japán nyelvvizsgát. Ez a tervem.'
        },
        { who: 'Jui', jp: 'すごいですね。{難|むずか}しいと{思|おも}いますが、がんばってください。', romaji: 'Sugoi desu ne. Muzukashii to omoimasu ga, ganbatte kudasai.', hu: 'Ez igen! Szerintem nehéz lesz, de hajrá!' },
        { who: 'Anna', jp: 'ユイさんの{目標|もくひょう}は？', romaji: 'Yui-san no mokuhyō wa?', hu: 'És a te célod?' },
        {
          who: 'Jui',
          jp: '{私|わたし}は{英語|えいご}を{勉強|べんきょう}したいと{思|おも}っています。それから、{新|あたら}しい{自転車|じてんしゃ}がほしいです。',
          romaji: 'Watashi wa eigo o benkyō shitai to omotte imasu. Sorekara, atarashii jitensha ga hoshii desu.',
          hu: 'Én angolul szeretnék tanulni. És szeretnék egy új biciklit.'
        },
        { who: 'Anna', jp: 'いいですね。じゃあ、{神様|かみさま}にお{願|ねが}いしましょう。', romaji: 'Ii desu ne. Jā, kamisama ni onegai shimashō.', hu: 'De jó! Akkor kérjük meg az isteneket!' },
        { who: 'Jui', jp: 'ええ。いい{年|とし}にしましょう。', romaji: 'Ee. Ii toshi ni shimashō.', hu: 'Igen. Tegyük jó évvé!' }
      ],
      notes: [
        'Az <b>{明|あ}けましておめでとうございます</b> csak <b>január elseje után</b> hangzik el. Év vége felé, búcsúzáskor a jókívánság: <b>よいお{年|とし}を</b> (boldog új évet — előre).',
        'A <b>{今年|ことし}もよろしくお{願|ねが}いします</b> a bemutatkozásból ismert mondat újévi változata: az új évre is kéred a másik jóindulatát.',
        'Anna nem azt mondja, „még nem ettem" múlt időben: <b>まだ{食|た}べていません</b>. A japán úgy látja, hogy az evés még „függőben van", ezért 〜ていません áll.',
        'Jui azt mondja: {勉強|べんきょう}したいと<b>{思|おも}っています</b> (nem {思|おも}います): ez nem pillanatnyi ötlet, hanem egy ideje érlelődő elhatározás.',
        'Az <b>いい{年|とし}にしましょう</b> szó szerint: „tegyük jó évvé". A 〜に します itt változtatást jelent, nem választást.'
      ]
    },
    points: [
      {
        title: 'もう・まだ', sub: 'már · még nem',
        pattern: 'もう 〜ました · まだ 〜ていません',
        body: 'A <b>もう</b> + múlt idő azt jelenti: már megtörtént. A „még nem" <b>まだ</b> + <b>〜ていません</b>: a dolog még várat magára, ezért nem a sima múlt tagadása áll. Röviden: いいえ、まだです.',
        more: [
          'A <b>もう</b> („már") állító múlt idővel áll: もう{食|た}べました (már ettem). Kérdésben arra kérdez rá, megtörtént-e valami, amire számítani lehet.',
          'A <b>まだ</b> („még") a tagadó válasz szava. A japán a még meg nem történt, de várható cselekvést <b>nem múlt idővel</b> tagadja, hanem <b>〜ていません</b> alakkal: a dolog még „nem került megtett állapotba".',
          'Különbség: きのう{食|た}べませんでした = tegnap nem ettem (lezárt tény). まだ{食|た}べていません = még nem ettem (de fogok).'
        ],
        tables: [
          {
            caption: 'Már — még nem',
            head: ['', 'Japánul', 'Magyarul'],
            rows: [
              ['kérdés', '<b>もう</b> たべましたか。', 'Ettél már?'],
              ['igen', 'はい、<b>もう</b> たべました。', 'Igen, már ettem.'],
              ['nem (teljes)', 'いいえ、<b>まだ</b> たべていません。', 'Nem, még nem ettem.'],
              ['nem (rövid)', 'いいえ、<b>まだ</b>です。', 'Nem, még nem.']
            ]
          }
        ],
        examples: [
          { jp: 'もう{昼|ひる}ごはんを{食|た}べましたか。', romaji: 'Mō hirugohan o tabemashita ka.', hu: 'Ebédeltél már?' },
          { jp: 'はい、もう{食|た}べました。', romaji: 'Hai, mō tabemashita.', hu: 'Igen, már ettem.' },
          { jp: 'いいえ、まだ{食|た}べていません。', romaji: 'Iie, mada tabete imasen.', hu: 'Nem, még nem ettem.' },
          { jp: 'もう{宿題|しゅくだい}は{終|お}わりましたか。', romaji: 'Mō shukudai wa owarimashita ka.', hu: 'Kész van már a házi feladat?' },
          { jp: 'いいえ、まだです。', romaji: 'Iie, mada desu.', hu: 'Nem, még nem.' }
        ],
        notes: [
          'A まだ állító mondatban azt jelenti: „még mindig": まだ{雨|あめ}が{降|ふ}っています (még mindig esik).',
          'A もう tagadó mondatban: „már nem": もう{時間|じかん}がありません (már nincs idő).'
        ],
        mistakes: [
          { bad: 'いいえ、まだ{食|た}べませんでした。', good: 'いいえ、まだ{食|た}べていません。', why: 'A „még nem" mellett 〜ていません áll, nem múlt idejű tagadás.' }
        ],
        tip: 'A まだ{食|た}べませんでした hibás: a „még nem" mindig 〜ていません.'
      },
      {
        title: '〜たあとで', sub: 'miután…',
        pattern: 'た-alak + あとで · főnév + のあとで',
        body: 'Az <b>あとで</b> előtt mindig た-alak áll, akkor is, ha a jövőről beszélsz: az első cselekvés addigra már lezárult.',
        more: [
          'Az <b>あとで</b> („után") előtt az ige <b>mindig た-alakban</b> áll. Nem azért, mert a mondat múlt idejű, hanem mert az első cselekvés a második kezdetére már <b>befejeződött</b>.',
          'A mondat egészének idejét a végén álló ige adja meg: {食|た}べたあとで、{行|い}き<b>ます</b> (jövő) / {行|い}き<b>ました</b> (múlt).',
          'Főnévvel: <b>főnév + の + あとで</b> ({食事|しょくじ}のあとで, {授業|じゅぎょう}のあとで).'
        ],
        examples: [
          { jp: '{仕事|しごと}が{終|お}わったあとで、{飲|の}みに{行|い}きます。', romaji: 'Shigoto ga owatta ato de, nomi ni ikimasu.', hu: 'Munka után elmegyünk inni.' },
          { jp: '{食事|しょくじ}のあとで、{散歩|さんぽ}します。', romaji: 'Shokuji no ato de, sanpo shimasu.', hu: 'Evés után sétálok.' },
          { jp: '{映画|えいが}を{見|み}たあとで、{買|か}い{物|もの}をしました。', romaji: 'Eiga o mita ato de, kaimono o shimashita.', hu: 'Miután megnéztük a filmet, vásároltunk.' },
          { jp: '{神社|じんじゃ}へ{行|い}ったあとで、ごはんを{食|た}べます。', romaji: 'Jinja e itta ato de, gohan o tabemasu.', hu: 'Miután elmentünk a szentélybe, eszünk.' },
          { jp: '{授業|じゅぎょう}のあとで、{図書館|としょかん}へ{行|い}きます。', romaji: 'Jugyō no ato de, toshokan e ikimasu.', hu: 'Óra után könyvtárba megyek.' }
        ],
        notes: [
          'A 10. leckében tanult 〜てから is „miután"-t jelent. A てから azt hangsúlyozza, hogy a második dolog <i>rögtön és csakis</i> az első után jön; a たあとで egyszerűen időrendet közöl.'
        ],
        mistakes: [
          { bad: '{食|た}べるあとで、{行|い}きます。', good: '{食|た}べたあとで、{行|い}きます。', why: 'Az あとで előtt mindig た-alak áll, jövő idejű mondatban is.' }
        ]
      },
      {
        title: '〜るまえに', sub: 'mielőtt…',
        pattern: 'szótári alak + まえに · főnév + のまえに',
        body: 'A <b>まえに</b> előtt mindig szótári alak áll, akkor is, ha a mondat múlt idejű: amikor a második cselekvés történt, az első még nem zajlott le.',
        more: [
          'A <b>まえに</b> („előtt") előtt az ige <b>mindig szótári alakban</b> áll. Amikor a főmondat cselekvése történik, az előtte álló cselekvés még <b>nem zajlott le</b>, ezért nem kaphat múlt alakot — akkor sem, ha az egész a múltban történt.',
          'Főnévvel: <b>főnév + の + まえに</b>. Időtartammal a の elmarad: {三年|さんねん}まえに (három évvel ezelőtt).'
        ],
        tables: [
          {
            caption: 'Előtt és után',
            head: ['', 'Előtte álló alak', 'Példa'],
            rows: [
              ['〜まえに (előtt)', '<b>szótári alak</b> · főnév + の', 'ねる まえに · しょくじの まえに'],
              ['〜あとで (után)', '<b>た-alak</b> · főnév + の', 'ねた あとで · しょくじの あとで']
            ]
          }
        ],
        examples: [
          { jp: '{寝|ね}るまえに、{歯|は}をみがきます。', romaji: 'Neru mae ni, ha o migakimasu.', hu: 'Lefekvés előtt fogat mosok.' },
          { jp: '{日本|にほん}へ{来|く}るまえに、{日本語|にほんご}を{勉強|べんきょう}しました。', romaji: 'Nihon e kuru mae ni, nihongo o benkyō shimashita.', hu: 'Mielőtt Japánba jöttem, japánul tanultam.' },
          { jp: '{授業|じゅぎょう}のまえに、コーヒーを{飲|の}みます。', romaji: 'Jugyō no mae ni, kōhī o nomimasu.', hu: 'Óra előtt kávét iszom.' },
          { jp: 'ハンガリーへ{帰|かえ}るまえに、{試験|しけん}を{受|う}けます。', romaji: 'Hangarī e kaeru mae ni, shiken o ukemasu.', hu: 'Mielőtt hazamegyek Magyarországra, vizsgázom.' },
          { jp: '{三年|さんねん}まえに{日本|にほん}へ{来|き}ました。', romaji: 'Sannen mae ni Nihon e kimashita.', hu: 'Három éve jöttem Japánba.' }
        ],
        mistakes: [
          { bad: '{日本|にほん}へ{来|き}たまえに、{勉強|べんきょう}しました。', good: '{日本|にほん}へ{来|く}るまえに、{勉強|べんきょう}しました。', why: 'A まえに előtt szótári alak áll, múlt idejű mondatban is.' }
        ]
      },
      {
        title: '〜と思います', sub: 'azt hiszem, szerintem',
        pattern: 'rövid alak + と{思|おも}います',
        body: 'Véleményt és feltevést a <b>と{思|おも}います</b> fejez ki. Előtte rövid alak áll; főnév és な-melléknév után <b>だ</b> kell. A tagadás a mondat belsejébe kerül: „azt hiszem, nem jön".',
        more: [
          'A <b>と</b> itt idéző partikula: azt jelöli, <b>mit</b> gondolsz. Előtte teljes mondat áll rövid alakban, utána a {思|おも}います (gondolom). Magyarul: „azt gondolom, hogy…", „szerintem…".',
          'A japánban a puszta kijelentés határozottnak, néha túl magabiztosnak hat. A と{思|おも}います <b>tompít</b>: jelzi, hogy ez a te véleményed, nem megkérdőjelezhetetlen tény. Ezért sokkal gyakoribb, mint a magyar „szerintem".',
          'A <b>〜と{思|おも}っています</b> (folyamatos alak) azt jelenti, hogy egy ideje így gondolod, ez tartós meggyőződésed. Más ember véleményéről is csak így beszélhetsz: {田中|たなか}さんは…と{思|おも}っています.'
        ],
        tables: [
          {
            caption: 'Mi áll a と{思|おも}います előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['ige', 'rövid alak', 'くる<b>と おもいます</b> · こない<b>と おもいます</b>'],
              ['い-mn.', 'alapalak', 'おもしろい<b>と おもいます</b>'],
              ['な-mn.', '+ <b>だ</b>', 'かんたん<b>だと おもいます</b>'],
              ['főnév', '+ <b>だ</b>', 'がくせい<b>だと おもいます</b>']
            ]
          }
        ],
        examples: [
          { jp: 'あしたは{雨|あめ}が{降|ふ}ると{思|おも}います。', romaji: 'Ashita wa ame ga furu to omoimasu.', hu: 'Azt hiszem, holnap esni fog.' },
          { jp: 'この{映画|えいが}はおもしろいと{思|おも}います。', romaji: 'Kono eiga wa omoshiroi to omoimasu.', hu: 'Szerintem ez a film érdekes.' },
          { jp: '{田中|たなか}さんは{来|こ}ないと{思|おも}います。', romaji: 'Tanaka-san wa konai to omoimasu.', hu: 'Szerintem Tanaka nem jön el.' },
          { jp: '{日本語|にほんご}は{簡単|かんたん}だと{思|おも}います。', romaji: 'Nihongo wa kantan da to omoimasu.', hu: 'Szerintem a japán nyelv könnyű.' },
          { jp: 'どう{思|おも}いますか。', romaji: 'Dō omoimasu ka.', hu: 'Mit gondolsz? Mi a véleményed?' },
          { jp: '{私|わたし}もそう{思|おも}います。', romaji: 'Watashi mo sō omoimasu.', hu: 'Én is így gondolom.' }
        ],
        notes: [
          'Egyetértés: そう{思|おも}います. Ellenvetés: そうは{思|おも}いません (én nem így gondolom).',
          'A tagadás a gondolat belsejébe kerül: {来|こ}<b>ない</b>と{思|おも}います („azt hiszem, nem jön"), ritkábban: {来|く}ると{思|おも}いません.'
        ],
        mistakes: [
          { bad: '{簡単|かんたん}と{思|おも}います。', good: '{簡単|かんたん}だと{思|おも}います。', why: 'な-melléknév és főnév után a と előtt だ kell.' },
          { bad: 'おもしろいだと{思|おも}います。', good: 'おもしろいと{思|おも}います。', why: 'い-melléknév után nincs だ.' }
        ]
      },
      {
        title: '〜たいと{思|おも}います', sub: 'megfontolt óhaj',
        pattern: 'ige ます-tő + たい + と{思|おも}います · と{思|おも}っています',
        body: 'A puszta <b>〜たいです</b> („akarom, szeretném") a japán fülnek sokszor túl egyenes, gyerekes vagy követelőző. Ha a vágyadat felnőtt módon, visszafogottan akarod kimondani, hozzáteszed: <b>と{思|おも}います</b> — „azt gondolom, hogy szeretnék…".',
        more: [
          'A <b>〜たいと{思|おも}っています</b> azt jelzi, hogy a kívánság nem most jutott eszedbe: régebb óta érlelődik benned. Tervekről, célokról, jövőbeli elképzelésekről beszélve ez a legtermészetesebb forma.',
          'Bemutatkozásban, interjún, hivatalos helyzetben szinte mindig ezt hallod: {日本|にほん}で{働|はたら}きたいと{思|おも}っています (Japánban szeretnék dolgozni).'
        ],
        examples: [
          { jp: '{来年|らいねん}{日本|にほん}へ{留学|りゅうがく}したいと{思|おも}います。', romaji: 'Rainen Nihon e ryūgaku shitai to omoimasu.', hu: 'Jövőre szeretnék Japánban tanulni.' },
          { jp: '{英語|えいご}を{勉強|べんきょう}したいと{思|おも}っています。', romaji: 'Eigo o benkyō shitai to omotte imasu.', hu: 'Angolul szeretnék tanulni (ezt tervezem egy ideje).' },
          { jp: '{将来|しょうらい}、{先生|せんせい}になりたいと{思|おも}っています。', romaji: 'Shōrai, sensei ni naritai to omotte imasu.', hu: 'A jövőben tanár szeretnék lenni.' }
        ],
        tip: 'A 〜になりたい („…-vá szeretnék válni") a foglalkozásról szóló terv szokásos alakja.'
      },
      {
        title: '〜がほしいです', sub: 'szeretnék egy…',
        pattern: 'főnév + が + ほしいです',
        body: 'A <b>ほしい</b> い-melléknév: amire vágysz, <b>が</b>-t kap, a tagadása ほしくないです. Tárgyra használod; ha cselekedni szeretnél, a 〜たい kell.',
        more: [
          'A <b>ほしい</b> い-melléknév, ezért úgy ragozod: ほし<b>くない</b>です (nem kell), ほし<b>かった</b>です (szerettem volna). A szerkezet ugyanaz, mint a {好|す}き-nél: (わたしは) <b>〜が</b> ほしいです.',
          'A ほしい <b>tárgyra</b> vonatkozik (egy bicikli, idő, pénz, barát). Ha <b>cselekedni</b> szeretnél, a 〜たい kell: {自転車|じてんしゃ}がほしい (szeretnék egy biciklit) ↔ {自転車|じてんしゃ}を{買|か}いたい (szeretnék biciklit venni).',
          'Akárcsak a たい, a ほしい is a <b>saját</b> vágyadat mondja ki. Feljebbvalót nem illik megkérdezni vele (…がほしいですか); kínálj inkább: …はいかがですか.'
        ],
        tables: [
          {
            caption: 'ほしい vagy たい?',
            head: ['', 'Mire vágysz?', 'Példa'],
            rows: [
              ['〜が ほしい', 'egy dologra', 'あたらしい くつ<b>が ほしい</b>です。'],
              ['〜たい', 'egy cselekvésre', 'あたらしい くつを <b>かいたい</b>です。']
            ]
          }
        ],
        examples: [
          { jp: '{新|あたら}しいパソコンがほしいです。', romaji: 'Atarashii pasokon ga hoshii desu.', hu: 'Szeretnék egy új számítógépet.' },
          { jp: '{誕生日|たんじょうび}に{何|なに}がほしいですか。', romaji: 'Tanjōbi ni nani ga hoshii desu ka.', hu: 'Mit szeretnél a születésnapodra?' },
          { jp: '{今|いま}は{何|なに}もほしくないです。', romaji: 'Ima wa nani mo hoshikunai desu.', hu: 'Most semmire sem vágyom.' },
          { jp: 'もっと{時間|じかん}がほしいです。', romaji: 'Motto jikan ga hoshii desu.', hu: 'Több időt szeretnék.' },
          { jp: '{子|こ}どものとき、{犬|いぬ}がほしかったです。', romaji: 'Kodomo no toki, inu ga hoshikatta desu.', hu: 'Gyerekkoromban szerettem volna egy kutyát.' }
        ],
        mistakes: [
          { bad: '{自転車|じてんしゃ}をほしいです。', good: '{自転車|じてんしゃ}がほしいです。', why: 'A ほしい melléknév, nem tárgyas ige: amire vágysz, が-t kap.' }
        ],
        tip: 'A ほしい és a たい a saját vágyadról szól; másról legfeljebb kérdezhetsz vele.'
      },
      {
        title: '〜つもりです', sub: 'szándékozom',
        pattern: 'szótári alak / ない-alak + つもりです',
        body: 'A <b>つもり</b> elhatározott szándékot jelent: „az a tervem, hogy…". Ha valamit nem szándékozol megtenni, a ない-alak áll előtte.',
        more: [
          'A <b>つもり</b> főnév („szándék"), ezért a mondat a です-szel zárul. Előtte rövid alak áll: szótári alak (megteszem) vagy ない-alak (nem teszem meg).',
          'A つもり <b>eldöntött, megfontolt tervet</b> jelent, nem hirtelen ötletet. A vágyból (〜たい) így lesz terv: {行|い}きたいです (szeretnék menni) → {行|い}くつもりです (elhatároztam, hogy megyek).',
          'A tagadásnak két formája van. <b>{行|い}かないつもりです</b>: az a tervem, hogy nem megyek. <b>{行|い}くつもりはありません</b>: eszem ágában sincs menni — ez erősebb.'
        ],
        tables: [
          {
            caption: 'A szándék fokozatai',
            head: ['Alak', 'Mit fejez ki?', 'Példa'],
            rows: [
              ['〜たいです', 'vágy', 'にほんへ いきたいです。'],
              ['〜たいと おもいます', 'megfontolt óhaj', 'にほんへ いきたいと おもいます。'],
              ['〜つもりです', 'eldöntött terv', 'にほんへ いく つもりです。']
            ]
          }
        ],
        examples: [
          { jp: '{来年|らいねん}{日本|にほん}へ{行|い}くつもりです。', romaji: 'Rainen Nihon e iku tsumori desu.', hu: 'Jövőre Japánba szándékozom menni.' },
          { jp: '{夏休|なつやす}みはどこへも{行|い}かないつもりです。', romaji: 'Natsuyasumi wa doko e mo ikanai tsumori desu.', hu: 'A nyári szünetben nem szándékozom sehová menni.' },
          { jp: '{大学|だいがく}で{何|なに}を{勉強|べんきょう}するつもりですか。', romaji: 'Daigaku de nani o benkyō suru tsumori desu ka.', hu: 'Mit szándékozol tanulni az egyetemen?' },
          { jp: '{日本語|にほんご}の{試験|しけん}を{受|う}けるつもりです。', romaji: 'Nihongo no shiken o ukeru tsumori desu.', hu: 'Le szándékozom tenni a japán nyelvvizsgát.' },
          { jp: 'たばこはもう{吸|す}わないつもりです。', romaji: 'Tabako wa mō suwanai tsumori desu.', hu: 'Elhatároztam, hogy többet nem dohányzom.' }
        ],
        notes: [
          'Más ember szándékáról közvetve beszélünk: {田中|たなか}さんは{行|い}くつもりだと{言|い}っていました (Tanaka azt mondta, menni szándékozik).'
        ],
        mistakes: [
          { bad: '{行|い}きますつもりです。', good: '{行|い}くつもりです。', why: 'A つもり előtt rövid alak áll.' }
        ]
      }
    ],
    phrases: [
      { jp: '{明|あ}けましておめでとうございます。', romaji: 'Akemashite omedetō gozaimasu.', hu: 'Boldog új évet! (újév után)' },
      { jp: 'よいお{年|とし}を。', romaji: 'Yoi o-toshi o.', hu: 'Boldog új évet! (év végén, előre)' },
      { jp: '{今年|ことし}もよろしくお{願|ねが}いします。', romaji: 'Kotoshi mo yoroshiku onegai shimasu.', hu: 'Az idén is számítok a jóindulatára.' },
      { jp: 'おめでとうございます。', romaji: 'Omedetō gozaimasu.', hu: 'Gratulálok!', note: 'Születésnapra: お{誕生日|たんじょうび}おめでとうございます.' },
      { jp: '{楽|たの}しいこともたくさんありますよ。', romaji: 'Tanoshii koto mo takusan arimasu yo.', hu: 'Sok jó dolog is van ám!', note: 'Biztatás annak, aki nehéz időszakról mesél.' },
      { jp: 'がんばります。', romaji: 'Ganbarimasu.', hu: 'Igyekezni fogok.', note: 'A がんばってください biztatásra adott válasz.' },
      { jp: '{気持|きも}ち、よくわかります。', romaji: 'Kimochi, yoku wakarimasu.', hu: 'Jól megértem, mit érzel.' },
      { jp: '{私|わたし}もそうでした。', romaji: 'Watashi mo sō deshita.', hu: 'Én is így voltam vele.' },
      { jp: 'いつでも{相談|そうだん}してください。', romaji: 'Itsudemo sōdan shite kudasai.', hu: 'Bármikor fordulj hozzám tanácsért!' }
    ],
    words: [
      {
        title: 'Újév',
        items: [
          { jp: 'お{正月|しょうがつ}', romaji: 'o-shōgatsu', hu: 'újév' },
          { jp: '{年賀状|ねんがじょう}', romaji: 'nengajō', hu: 'újévi üdvözlőlap' },
          { jp: '{初詣|はつもうで}', romaji: 'hatsumōde', hu: 'az év első szentélylátogatása' },
          { jp: 'おせち', romaji: 'osechi', hu: 'újévi ételsor' },
          { jp: 'お{年玉|としだま}', romaji: 'otoshidama', hu: 'újévi pénzajándék gyerekeknek' },
          { jp: '{神様|かみさま}', romaji: 'kamisama', hu: 'istenség' },
          { jp: '{今年|ことし}', romaji: 'kotoshi', hu: 'idén' },
          { jp: '{来年|らいねん}', romaji: 'rainen', hu: 'jövőre' }
        ]
      },
      {
        title: 'Tervek, célok',
        items: [
          { jp: '{目標|もくひょう}', romaji: 'mokuhyō', hu: 'cél' },
          { jp: '{試験|しけん}', romaji: 'shiken', hu: 'vizsga' },
          { jp: '{受|う}けます', romaji: 'ukemasu', hu: 'letesz (vizsgát)' },
          { jp: '{合格|ごうかく}します', romaji: 'gōkaku shimasu', hu: 'átmegy (vizsgán)' },
          { jp: '{卒業|そつぎょう}します', romaji: 'sotsugyō shimasu', hu: 'elvégzi (az iskolát)' },
          { jp: '{留学|りゅうがく}します', romaji: 'ryūgaku shimasu', hu: 'külföldön tanul' },
          { jp: '{決|き}まります', romaji: 'kimarimasu', hu: 'eldől' },
          { jp: '{一生懸命|いっしょうけんめい}', romaji: 'isshōkenmei', hu: 'teljes erőből' }
        ]
      },
      {
        title: 'Érzelmek',
        items: [
          { jp: 'うれしい', romaji: 'ureshii', hu: 'örül, boldog' },
          { jp: '{悲|かな}しい', romaji: 'kanashii', hu: 'szomorú' },
          { jp: 'さびしい', romaji: 'sabishii', hu: 'magányos' },
          { jp: '{怖|こわ}い', romaji: 'kowai', hu: 'félelmetes; fél' },
          { jp: '{恥|は}ずかしい', romaji: 'hazukashii', hu: 'szégyelli magát' },
          { jp: '{心配|しんぱい}', romaji: 'shinpai', hu: 'aggodalom' },
          { jp: '{不安|ふあん}', romaji: 'fuan', hu: 'bizonytalan, nyugtalan' },
          { jp: '{困|こま}ります', romaji: 'komarimasu', hu: 'bajban van' }
        ]
      }
    ],
    culture: [
      {
        title: 'Az év legnagyobb ünnepe',
        text: 'Japánban az újév (<b>お{正月|しょうがつ}</b>) az, ami nálunk a karácsony: ilyenkor mindenki hazautazik a családjához. December végén nagytakarítást tartanak, szilveszter éjjelén a buddhista templomok harangja <b>száznyolcat</b> üt, hogy elűzze az emberi gyarlóságokat. Január első napjaiban a családok szentélybe mennek (<b>{初詣|はつもうで}</b>): pénzt dobnak a perselybe, tapsolnak, meghajolnak, és magukban elmondják a kívánságukat.'
      },
      {
        title: 'Minden falatnak jelentése van',
        text: 'Az újévi ételsor, az <b>おせち</b> lakkozott, emeletes dobozban kerül az asztalra, és minden fogása jókívánság. A fekete szójabab egészséget jelent, a garnéla hosszú életet (mert hajlott a háta, mint az öregeknek), a heringikra sok gyermeket. A gyerekek ilyenkor díszes borítékban pénzt kapnak a rokonoktól: ez az <b>お{年玉|としだま}</b>.'
      },
      {
        title: 'Lap január elsejére',
        text: 'A japánok karácsonyi lap helyett <b>újévi lapot</b> (<b>{年賀状|ねんがじょう}</b>) küldenek. A posta az év végéig gyűjti őket, és mindet január elsején reggel kézbesíti. A lapokon az új év állatövi jegye látható: a tizenkét állat évről évre váltja egymást. A japán időszámítás a császárok uralkodása szerint is számolja az éveket: 2019 óta a <b>{令和|れいわ}</b> korszak tart.'
      }
    ],
    quiz: [
      { q: '„Nem, még nem ettem." Mi hiányzik?', jp: 'いいえ、まだ＿。', a: '{食|た}べていません', wrong: ['{食|た}べませんでした', '{食|た}べました', '{食|た}べています'], why: 'Még nem: まだ + 〜ていません.' },
      { q: '„Lefekvés előtt fogat mosok." Mi hiányzik?', jp: '＿まえに、{歯|は}をみがきます。', a: '{寝|ね}る', wrong: ['{寝|ね}た', '{寝|ね}て', '{寝|ね}ます'], why: 'A まえに előtt szótári alak áll.' },
      { q: '„Miután megnéztük a filmet, vásároltunk." Mi hiányzik?', jp: '{映画|えいが}を＿あとで、{買|か}い{物|もの}をしました。', a: '{見|み}た', wrong: ['{見|み}る', '{見|み}て', '{見|み}ない'], why: 'Az あとで előtt た-alak áll.' },
      { q: '„Azt hiszem, holnap esni fog." Mi hiányzik?', jp: 'あしたは{雨|あめ}が＿と{思|おも}います。', a: '{降|ふ}る', wrong: ['{降|ふ}ります', '{降|ふ}って', '{降|ふ}り'], why: 'A と{思|おも}います előtt rövid alak áll.' },
      { q: '„Szeretnék egy új számítógépet." Mi hiányzik?', jp: '{新|あたら}しいパソコン＿ほしいです。', a: 'が', wrong: ['に', 'で', 'へ'], why: 'Amire vágysz, が-t kap: 〜がほしい.' },
      { q: '„Jövőre Japánba szándékozom menni." Mi hiányzik?', jp: '{来年|らいねん}{日本|にほん}へ{行|い}く＿です。', a: 'つもり', wrong: ['ほしい', 'あとで', 'まえに'], why: 'Szándék: szótári alak + つもりです.' },
      { q: 'Mit jelent: もう{宿題|しゅくだい}をしましたか。', a: 'Megcsináltad már a leckét?', wrong: ['Mikor csinálod meg a leckét?', 'Még mindig a leckét csinálod?', 'Miért nem csináltad meg a leckét?'], why: 'もう + múlt idő = már.' },
      { q: '„Szerintem ő diák." Mi hiányzik?', jp: '{彼|かれ}は{学生|がくせい}＿と{思|おも}います。', a: 'だ', wrong: ['です', 'な', 'の'], why: 'Főnév után だ kell a と{思|おも}います elé.' },
      { q: '„Evés után sétálok." Mi hiányzik?', jp: '{食事|しょくじ}＿あとで、{散歩|さんぽ}します。', a: 'の', wrong: ['を', 'に', 'が'], why: 'Főnév után: のあとで.' },
      { q: 'Melyik mondat jelenti: „Vizet szeretnék inni."', a: '{水|みず}が{飲|の}みたいです。', wrong: ['{水|みず}がほしいたいです。', '{水|みず}を{飲|の}むほしいです。', '{水|みず}が{飲|の}みほしいです。'], why: 'Cselekvésre たい, tárgyra ほしい; a kettő nem keverhető.' },
      { q: 'December 30-án búcsúzol a tanárodtól. Melyik jókívánság illik?', a: 'よいお{年|とし}を。', wrong: ['{明|あ}けましておめでとうございます。', 'お{大事|だいじ}に。', 'いってらっしゃい。'], why: 'Év vége előtt よいお{年|とし}を; az {明|あ}けまして… csak január elseje után.' },
      { q: '„Ettél már?" — „Nem, még nem." Melyik a helyes rövid válasz?', a: 'いいえ、まだです。', wrong: ['いいえ、もうです。', 'いいえ、まだでした。', 'はい、まだです。'], why: 'A まだです a まだ〜ていません rövid változata.' },
      { q: 'Mit jelent: まだ{雨|あめ}が{降|ふ}っています。', a: 'Még mindig esik az eső.', wrong: ['Még nem esik az eső.', 'Már esik az eső.', 'Már nem esik az eső.'], why: 'Állító mondatban a まだ = „még mindig".' },
      {
        q: '„Mielőtt Japánba jöttem, japánul tanultam." Mi hiányzik?',
        jp: '{日本|にほん}へ＿まえに、{日本語|にほんご}を{勉強|べんきょう}しました。',
        a: '{来|く}る',
        wrong: ['{来|き}た', '{来|き}て', '{来|き}ます'],
        why: 'A まえに előtt mindig szótári alak áll, múlt idejű mondatban is.'
      },
      { q: '„Óra után könyvtárba megyek." Mi hiányzik?', jp: '{授業|じゅぎょう}＿あとで、{図書館|としょかん}へ{行|い}きます。', a: 'の', wrong: ['を', 'に', 'だ'], why: 'Főnév és あとで közé の kerül.' },
      { q: 'Melyik a helyes?', a: '{簡単|かんたん}だと{思|おも}います。', wrong: ['{簡単|かんたん}と{思|おも}います。', '{簡単|かんたん}なと{思|おも}います。', '{簡単|かんたん}いと{思|おも}います。'], why: 'な-melléknév után a と előtt だ áll.' },
      {
        q: 'Szeretnél egy új biciklit. Melyik mondat a jó?',
        a: '{新|あたら}しい{自転車|じてんしゃ}がほしいです。',
        wrong: ['{新|あたら}しい{自転車|じてんしゃ}をほしいです。', '{新|あたら}しい{自転車|じてんしゃ}がほしたいです。', '{新|あたら}しい{自転車|じてんしゃ}がほしです。'],
        why: 'A ほしい い-melléknév, és amire vágysz, が-t kap.'
      },
      { q: 'Melyik fejez ki eldöntött tervet?', a: '{行|い}くつもりです。', wrong: ['{行|い}きたいです。', '{行|い}きませんか。', '{行|い}ったほうがいいです。'], why: 'A つもり megfontolt, eldöntött szándék; a たい csak vágy.' },
      {
        q: 'Mi a különbség? {勉強|べんきょう}したいです ↔ {勉強|べんきょう}したいと{思|おも}っています',
        a: 'a második visszafogottabb, és tartós elhatározást jelez',
        wrong: ['a második múlt idő', 'a második más ember vágyát fejezi ki', 'nincs különbség, csak hosszabb'],
        why: 'A と{思|おも}っています tompít, és jelzi, hogy régebb óta így gondolod.'
      },
      {
        q: 'Mit csinálnak a japánok az év első szentélylátogatásán?',
        a: 'pénzt dobnak a perselybe, és magukban kívánnak',
        wrong: ['száznyolcszor megkondítják a harangot', 'tortát esznek', 'ajándékot cserélnek'],
        why: 'A {初詣|はつもうで} az év első fohásza; a 108 harangütés szilveszter éjjelén, a buddhista templomokban szól.'
      }
    ]
  },

  /* ── 15. lecke ────────────────────────────────────── */
  {
    id: 'l15', no: 15, book: 'Dekiru 1', title: 'Találkozunk?',
    lead: 'Megbeszélsz egy találkozót: feltételezel, elnézést kérsz és megmagyarázod, mi történt, dicsérsz és szabadkozol, felsorolod, miket szoktál csinálni, és engedélyt kérsz.',
    cando: [
      'Megmondod, mi fog valószínűleg történni.',
      'Elnézést kérsz a késésért, és megmagyarázod az okát.',
      'Megdicsérsz valakit, és illendően fogadod a dicséretet.',
      'Elhívsz valakit programra, és engedélyt kérsz valamire.'
    ],
    intro: [
      'Ez a lecke a társas élet finomságairól szól: hogyan késel el illendően, hogyan dicsérsz, és hogyan hívsz el valakit úgy, hogy könnyű legyen nemet mondania. A japánban ezekben a helyzetekben nem az a fő kérdés, <i>mit</i> mondasz, hanem az, <b>mennyire hagysz teret a másiknak</b>.',
      'A nyelvtan ezt szolgálja. A <b>〜でしょう</b> tompítja a kijelentést („valószínűleg"). A <b>〜てしまいました</b> jelzi, hogy valami a szándékod ellenére történt, és bánod. A <b>て-alakkal</b> kifejezett ok nem mentegetőzés, hanem ténymegállapítás. A <b>〜たり〜たり</b> pedig azt üzeni: ez csak néhány példa, nem akarlak a teljes listával untatni.',
      'Mindegyik szerkezet a て-alakra vagy a た-alakra épül, amelyeket a 9. és a 11. leckében tanultál meg.'
    ],
    dialogue: {
      title: 'Késés, koncert, meghívás',
      scene: 'Anna és Jui koncertre mennek, de Anna elkésik. A koncert után Ken, aki a zenekarban gitározott, odajön hozzájuk; hazafelé Anna programot javasol.',
      lines: [
        { who: 'Anna', jp: '{遅|おく}れてすみません。{道|みち}に{迷|まよ}ってしまって…。', romaji: 'Okurete sumimasen. Michi ni mayotte shimatte…', hu: 'Elnézést a késésért! Eltévedtem…' },
        { who: 'Jui', jp: 'いいえ、{大丈夫|だいじょうぶ}です。{私|わたし}も{今|いま}{来|き}ましたから。', romaji: 'Iie, daijōbu desu. Watashi mo ima kimashita kara.', hu: 'Semmi baj. Én is most értem ide.' },
        { who: 'Anna', jp: 'まだ{間|ま}に{合|あ}うでしょうか。', romaji: 'Mada ma ni au deshō ka.', hu: 'Vajon még odaérünk?' },
        { who: 'Jui', jp: 'コンサートは{七時|しちじ}からですから、{間|ま}に{合|あ}うでしょう。', romaji: 'Konsāto wa shichiji kara desu kara, ma ni au deshō.', hu: 'A koncert hétkor kezdődik, úgyhogy valószínűleg odaérünk.' },
        { who: 'Anna', jp: 'ケンさん、お{疲|つか}れさまでした。ギターも{歌|うた}も、とてもよかったですよ。', romaji: 'Ken-san, otsukaresama deshita. Gitā mo uta mo, totemo yokatta desu yo.', hu: 'Ken, szép munka volt! A gitár is, az ének is nagyon jó volt.' },
        { who: 'Ken', jp: 'いえいえ、まだまだです。{今日|きょう}は{風邪|かぜ}で{声|こえ}が{出|で}ませんでした。', romaji: 'Ie ie, madamada desu. Kyō wa kaze de koe ga demasen deshita.', hu: 'Ugyan, még messze vagyok attól. Ma a megfázás miatt nem jött ki a hangom.' },
        { who: 'Anna', jp: 'ユイさん、{週末|しゅうまつ}はいつも{何|なに}をしていますか。', romaji: 'Yui-san, shūmatsu wa itsumo nani o shite imasu ka.', hu: 'Jui, mit szoktál csinálni hétvégén?' },
        { who: 'Jui', jp: '{本|ほん}を{読|よ}んだり、{友|とも}だちに{会|あ}ったりしています。', romaji: 'Hon o yondari, tomodachi ni attari shite imasu.', hu: 'Olvasok, barátokkal találkozom, ilyesmi.' },
        { who: 'Anna', jp: 'よかったら、{来週|らいしゅう}いっしょに{美術館|びじゅつかん}へ{行|い}きませんか。', romaji: 'Yokattara, raishū issho ni bijutsukan e ikimasen ka.', hu: 'Ha van kedved, nem mennénk el jövő héten együtt a múzeumba?' },
        { who: 'Jui', jp: 'いいですね。でも、{土曜日|どようび}は{用事|ようじ}があるので、{日曜日|にちようび}でもいいですか。', romaji: 'Ii desu ne. Demo, doyōbi wa yōji ga aru node, nichiyōbi demo ii desu ka.', hu: 'Jó ötlet. De szombaton dolgom van; lehetne inkább vasárnap?' },
        { who: 'Anna', jp: 'もちろんです。じゃあ、{日曜日|にちようび}に{行|い}きましょう。', romaji: 'Mochiron desu. Jā, nichiyōbi ni ikimashō.', hu: 'Hát persze! Akkor menjünk vasárnap.' }
      ],
      notes: [
        'A bocsánatkérés szerkezete: <b>て-alak + すみません</b> ({遅|おく}れてすみません). Az okot Anna てしまって… alakban, félbehagyva mondja: ez jelzi a megbánást, és nem hangzik kifogásnak.',
        'Jui válasza (<b>{私|わたし}も{今|いま}{来|き}ましたから</b>) udvarias füllentés lehet: Japánban a várakozó így veszi le a terhet a későről.',
        'A dicséretre Ken <b>szabadkozik</b>: いえいえ、まだまだです. Ez nem álszerénység, hanem elvárt válasz; a dicséretet egyenesen elfogadni dicsekvésnek hatna.',
        'A <b>よかったら</b> („ha jónak látod") a meghívás elé téve jelzi, hogy a másik nyugodtan mondhat nemet.',
        'A <b>{日曜日|にちようび}でもいいですか</b> („vasárnap is jó lenne?") a でも-vel puha ellenjavaslatot tesz. A <b>もちろんです</b> barátok között természetes; feljebbvalónak túl magabiztos.'
      ]
    },
    points: [
      {
        title: '〜でしょう', sub: 'valószínűleg',
        pattern: 'rövid alak + でしょう',
        body: 'A <b>でしょう</b> feltevést fejez ki: „valószínűleg, alighanem". Rövid alak áll előtte; főnév és な-melléknév után közvetlenül, だ nélkül. Az időjárás-jelentés állandó fordulata.',
        more: [
          'A <b>でしょう</b> a です „bizonytalan" párja: nem állítod, hogy így van, csak valószínűnek tartod. A magyar „valószínűleg", „alighanem", „bizonyára" felel meg neki.',
          'Előtte <b>rövid alak</b> áll, minden időben és tagadva is: {降|ふ}る / {降|ふ}らない / {降|ふ}った でしょう. Főnév és な-melléknév után <b>nincs</b> だ: {雨|あめ}でしょう, {静|しず}かでしょう.',
          'Háromféle hanglejtés, három jelentés: ereszkedő = feltevés (あしたは{雨|あめ}でしょう); emelkedő = megerősítést kérsz (おいしいでしょう？ — „finom, ugye?"); <b>でしょうか</b> = udvarias, puhított kérdés (どこでしょうか — „vajon hol lehet?").'
        ],
        tables: [
          {
            caption: 'Mi áll a でしょう előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['ige', 'rövid alak', 'ふる<b>でしょう</b> · ふらない<b>でしょう</b>'],
              ['い-mn.', 'alapalak', 'さむい<b>でしょう</b>'],
              ['な-mn.', 'だ nélkül', 'しずか<b>でしょう</b>'],
              ['főnév', 'だ nélkül', 'あめ<b>でしょう</b>']
            ]
          },
          {
            caption: 'Mennyire biztos?',
            head: ['Alak', 'Bizonyosság'],
            rows: [
              ['あめです', 'tény'],
              ['あめでしょう', 'valószínű'],
              ['あめかもしれません', 'lehetséges (18. lecke)']
            ]
          }
        ],
        examples: [
          { jp: 'あしたは{晴|は}れるでしょう。', romaji: 'Ashita wa hareru deshō.', hu: 'Holnap valószínűleg napos idő lesz.' },
          { jp: '{今晩|こんばん}は{寒|さむ}いでしょう。', romaji: 'Konban wa samui deshō.', hu: 'Ma este valószínűleg hideg lesz.' },
          { jp: '{山田|やまだ}さんは{来|こ}ないでしょう。', romaji: 'Yamada-san wa konai deshō.', hu: 'Jamada valószínűleg nem jön el.' },
          { jp: 'まだ{間|ま}に{合|あ}うでしょう。', romaji: 'Mada ma ni au deshō.', hu: 'Valószínűleg még odaérünk.' },
          { jp: 'この{料理|りょうり}、おいしいでしょう？', romaji: 'Kono ryōri, oishii deshō?', hu: 'Ez az étel finom, ugye?' }
        ],
        notes: [
          'A <b>たぶん</b> (talán, valószínűleg) gyakran áll a mondat elején a でしょう párjaként: たぶん{来|く}るでしょう.',
          'Közvetlen stílusú alakja a <b>だろう</b>; ezt a 25. leckében tanulod. Feljebbvalóval szemben a だろう udvariatlan.'
        ],
        mistakes: [
          { bad: '{雨|あめ}だでしょう。', good: '{雨|あめ}でしょう。', why: 'Főnév és な-melléknév után a でしょう elé nem kerül だ.' }
        ],
        tip: 'Emelkedő hanglejtéssel megerősítést kér: いいでしょう？ („Jó, ugye?")'
      },
      {
        title: '〜てしまいます', sub: 'megtörtént (és bánom)',
        pattern: 'ige て-alak + しまいます',
        body: 'A <b>てしまいます</b> azt jelzi, hogy valami teljesen, visszavonhatatlanul megtörtént. Leggyakrabban sajnálkozást hordoz: elvesztettem, elfelejtettem, elrontottam.',
        more: [
          'A <b>しまいます</b> segédige eredeti jelentése „elrak, befejez". A て-alak után azt mondja: a cselekvés <b>végleg lezárult</b>, nem lehet visszacsinálni.',
          'Ebből három árnyalat adódik. <b>(1) Befejezettség:</b> teljesen, a végéig megcsináltam ({全部|ぜんぶ}{読|よ}んでしまいました). <b>(2) Jövőre vonatkozva:</b> „addigra letudom" ({今晩|こんばん}{宿題|しゅくだい}をしてしまいます). <b>(3) Sajnálkozás:</b> akaratlanul, kellemetlenül megtörtént ({財布|さいふ}をなくしてしまいました) — ez a leggyakoribb.',
          'Beszédben a てしまう összevonódik: <b>〜ちゃう</b>, a でしまう pedig <b>〜じゃう</b> lesz: {忘|わす}れちゃった (jaj, elfelejtettem).'
        ],
        tables: [
          {
            caption: 'A てしまいます három árnyalata',
            head: ['Árnyalat', 'Példa', 'Magyarul'],
            rows: [
              ['befejezettség', 'ほんを ぜんぶ よんでしまいました。', 'Végigolvastam az egész könyvet.'],
              ['„letudom"', 'きょう しゅくだいを してしまいます。', 'Ma letudom a házit.'],
              ['sajnálkozás', 'かさを わすれてしまいました。', 'Ott felejtettem az esernyőmet (sajnos).']
            ]
          }
        ],
        examples: [
          { jp: '{財布|さいふ}を{忘|わす}れてしまいました。', romaji: 'Saifu o wasurete shimaimashita.', hu: 'Otthon felejtettem a pénztárcámat.' },
          { jp: '{電車|でんしゃ}が{行|い}ってしまいました。', romaji: 'Densha ga itte shimaimashita.', hu: 'Elment a vonat, lekéstem.' },
          { jp: 'ケーキを{全部|ぜんぶ}{食|た}べてしまいました。', romaji: 'Kēki o zenbu tabete shimaimashita.', hu: 'Megettem az egész tortát.' },
          { jp: '{道|みち}に{迷|まよ}ってしまいました。', romaji: 'Michi ni mayotte shimaimashita.', hu: 'Eltévedtem.' },
          { jp: '{今晩|こんばん}この{本|ほん}を{読|よ}んでしまいます。', romaji: 'Konban kono hon o yonde shimaimasu.', hu: 'Ma este kiolvasom ezt a könyvet.' }
        ],
        notes: ['Bocsánatkéréskor a 〜てしまって… félbehagyott alak a legtermészetesebb: {遅|おく}れてしまって… (elkéstem, és…).']
      },
      {
        title: '〜たり〜たりします', sub: 'ezt is, azt is',
        pattern: 'た-alak + り、た-alak + り + します',
        body: 'Példaként említesz néhány tevékenységet a sok közül; a sorrend nem számít. A た-alakhoz <b>り</b> járul, a mondatot a <b>します</b> zárja, és az időt csak ez mutatja.',
        more: [
          'A <b>〜たり〜たりします</b> <b>példákat</b> sorol fel: a megnevezett cselekvések mellett mások is vannak, és a sorrend nem számít. Magyarul: „…-ok, …-ok, ilyesmiket csinálok".',
          'Képzése: <b>た-alak + り</b>. Ahol a た-alak だ-ra végződik, ott a végződés <b>だり</b>: {読|よ}ん<b>だ</b> → {読|よ}ん<b>だり</b>.',
          'A mondatot mindig a <b>します</b> zárja, és az egész mondat idejét, udvariasságát, sőt a 〜ています vagy 〜たいです alakot is ez hordozza: 〜たり〜たり<b>したいです</b>.'
        ],
        tables: [
          {
            caption: 'Teljes vagy részleges felsorolás?',
            head: ['', 'Teljes (mind)', 'Részleges (például)'],
            rows: [
              ['főnevek', 'A <b>と</b> B', 'A <b>や</b> B (など)'],
              ['cselekvések', '〜<b>て</b>、〜ます', '〜<b>たり</b>、〜<b>たり</b> します']
            ]
          }
        ],
        examples: [
          { jp: '{週末|しゅうまつ}は{本|ほん}を{読|よ}んだり、{音楽|おんがく}を{聞|き}いたりします。', romaji: 'Shūmatsu wa hon o yondari, ongaku o kiitari shimasu.', hu: 'Hétvégén olvasok, zenét hallgatok, ilyesmi.' },
          { jp: '{休|やす}みの{日|ひ}は{掃除|そうじ}したり、{洗濯|せんたく}したりします。', romaji: 'Yasumi no hi wa sōji shitari, sentaku shitari shimasu.', hu: 'Szabadnapon takarítok, mosok.' },
          { jp: 'きのうは{買|か}い{物|もの}をしたり、{友|とも}だちに{会|あ}ったりしました。', romaji: 'Kinō wa kaimono o shitari, tomodachi ni attari shimashita.', hu: 'Tegnap vásároltam, találkoztam a barátommal, ilyesmi.' },
          { jp: '{夏休|なつやす}みに{泳|およ}いだり、{山|やま}に{登|のぼ}ったりしたいです。', romaji: 'Natsuyasumi ni oyoidari, yama ni nobottari shitai desu.', hu: 'A nyári szünetben úszni, hegyet mászni, ilyesmit szeretnék.' }
        ],
        notes: [
          'A て-alakos felsorolás időrendet jelent, és mindent megnevez; a たり-s felsorolás válogat, és nincs sorrendje.',
          'Egyetlen たり is állhat: {本|ほん}を{読|よ}んだりします (olvasok meg ilyesmi).'
        ],
        mistakes: [
          { bad: '{本|ほん}を{読|よ}んだり、{音楽|おんがく}を{聞|き}きます。', good: '{本|ほん}を{読|よ}んだり、{音楽|おんがく}を{聞|き}いたりします。', why: 'Az utolsó ige is たり alakot kap, és a mondatot します zárja.' }
        ]
      },
      {
        title: 'A も B も', sub: 'ez is, az is · sem, sem',
        pattern: 'A も B も + állítás / tagadás',
        body: 'Két <b>も</b> egymás után: állító mondatban „ez is, az is", tagadóban „sem ez, sem az". A も a は, が, を helyére lép.',
        more: [
          'A megkettőzött <b>も</b> két dolgot kapcsol össze egyenrangúan. A も itt is <b>kiszorítja</b> a は, が, を partikulát; a に, で, と, から viszont megmarad előtte: {東京|とうきょう}<b>にも</b>{大阪|おおさか}<b>にも</b>{行|い}きました.',
          'Tagadó igével a magyar „sem…, sem…" megfelelője.'
        ],
        examples: [
          { jp: '{肉|にく}も{魚|さかな}も{好|す}きです。', romaji: 'Niku mo sakana mo suki desu.', hu: 'A húst is, a halat is szeretem.' },
          { jp: '{土曜日|どようび}も{日曜日|にちようび}も{働|はたら}きます。', romaji: 'Doyōbi mo nichiyōbi mo hatarakimasu.', hu: 'Szombaton is, vasárnap is dolgozom.' },
          { jp: 'コーヒーも{紅茶|こうちゃ}も{飲|の}みません。', romaji: 'Kōhī mo kōcha mo nomimasen.', hu: 'Sem kávét, sem teát nem iszom.' },
          { jp: 'ギターも{歌|うた}もよかったです。', romaji: 'Gitā mo uta mo yokatta desu.', hu: 'A gitár is, az ének is jó volt.' },
          { jp: '{京都|きょうと}にも{奈良|なら}にも{行|い}きました。', romaji: 'Kyōto ni mo Nara ni mo ikimashita.', hu: 'Kiotóban is, Narában is voltam.' }
        ]
      },
      {
        title: '〜て・〜で (ok)', sub: 'valami miatt',
        pattern: 'ige て-alak · い → くて · főnév + で',
        body: 'A て-alak okot is kifejezhet, ha a következmény nem rajtad múlik: érzés, állapot, „nem tudtam". Főnévnél a <b>で</b> jelenti: „miatt".',
        more: [
          'A て-alakkal kifejezett ok <b>természetes következményt</b> vezet be: érzést, állapotot, képtelenséget, vagy olyasmit, ami már megtörtént. Nem te döntöttél úgy; a dolog magától adódott.',
          'Ezért a mondat második fele <b>nem lehet</b> kérés, javaslat, szándék vagy parancs. Ha az okból döntés vagy kérés következik, から vagy ので kell.',
          'A három szófaj kapcsoló alakját már ismered a 9. leckéből: ige て, い-melléknév くて, な-melléknév és főnév で. A főnév + で itt azt jelenti: „… miatt".'
        ],
        tables: [
          {
            caption: 'Az ok három kifejezése',
            head: ['Alak', 'Mi jöhet utána?', 'Példa'],
            rows: [
              ['〜て / 〜で', 'érzés, állapot, megtörtént dolog', 'かぜ<b>で</b> やすみました。'],
              ['〜から', 'bármi: kérés, szándék is', 'あめです<b>から</b>、いきません。'],
              ['〜ので', 'bármi; udvarias, tárgyilagos', 'あめ<b>なので</b>、いきません。']
            ]
          }
        ],
        examples: [
          { jp: '{遅|おく}れて、すみません。', romaji: 'Okurete, sumimasen.', hu: 'Elnézést a késésért.' },
          { jp: '{風邪|かぜ}をひいて、{学校|がっこう}を{休|やす}みました。', romaji: 'Kaze o hiite, gakkō o yasumimashita.', hu: 'Megfáztam, ezért nem mentem iskolába.' },
          { jp: '{宿題|しゅくだい}が{多|おお}くて、{大変|たいへん}です。', romaji: 'Shukudai ga ōkute, taihen desu.', hu: 'Sok a lecke, nehéz dolgom van.' },
          { jp: '{病気|びょうき}で{会社|かいしゃ}を{休|やす}みました。', romaji: 'Byōki de kaisha o yasumimashita.', hu: 'Betegség miatt nem mentem dolgozni.' },
          { jp: '{風邪|かぜ}で{声|こえ}が{出|で}ません。', romaji: 'Kaze de koe ga demasen.', hu: 'A megfázás miatt nem jön ki a hangom.' },
          { jp: 'ニュースを{聞|き}いて、びっくりしました。', romaji: 'Nyūsu o kiite, bikkuri shimashita.', hu: 'Meghallottam a hírt, és megdöbbentem.' }
        ],
        notes: [
          'Köszönet és bocsánatkérés okát mindig て-alak adja meg: {来|き}てくれて、ありがとう (köszönöm, hogy eljöttél), {遅|おく}れて、すみません.'
        ],
        mistakes: [
          { bad: '{時間|じかん}がなくて、タクシーで{行|い}きましょう。', good: '{時間|じかん}がないから、タクシーで{行|い}きましょう。', why: 'Javaslat előtt a て-alak nem adhat okot; から vagy ので kell.' }
        ],
        tip: 'Kérés vagy javaslat előtt ne て-alakkal indokolj: oda から vagy ので kell.'
      },
      {
        title: '〜てもいいですか', sub: 'szabad…?',
        pattern: 'ige て-alak + もいいですか',
        body: 'Engedélyt a <b>てもいいですか</b> kér. Az igenlő válasz: はい、どうぞ. Az elutasítás udvariasan kitérő: すみません、ちょっと… (a mondat befejezetlen marad).',
        more: [
          'A <b>〜てもいいですか</b> szó szerint: „ha megteszem, az is jó?". Engedélyt kérsz valamire, amit te szeretnél megtenni.',
          'Ugyanez a szerkezet <b>főnévvel</b> is működik: <b>főnév + でもいいですか</b> — „… is megfelel?". Időpont, hely, eszköz egyeztetésekor ezzel teszel alternatív javaslatot.',
          'Engedélyt megadni: はい、どうぞ / ええ、いいですよ. Megtagadni udvariasan: すみません、ちょっと… A szabályszerű tiltást (〜てはいけません) a 17. leckében tanulod.'
        ],
        tables: [
          {
            caption: 'Engedélykérés és válasz',
            head: ['', 'Japánul'],
            rows: [
              ['kérés (ige)', 'ここに すわっ<b>ても いいですか</b>。'],
              ['kérés (főnév)', 'にちようび<b>でも いいですか</b>。'],
              ['igen', 'はい、どうぞ。 / ええ、いいですよ。'],
              ['nem', 'すみません、ちょっと…。']
            ]
          }
        ],
        examples: [
          { jp: 'ここに{座|すわ}ってもいいですか。', romaji: 'Koko ni suwatte mo ii desu ka.', hu: 'Leülhetek ide?' },
          { jp: '{写真|しゃしん}を{撮|と}ってもいいですか。', romaji: 'Shashin o totte mo ii desu ka.', hu: 'Szabad fényképezni?' },
          { jp: '{窓|まど}を{開|あ}けてもいいですか。', romaji: 'Mado o akete mo ii desu ka.', hu: 'Kinyithatom az ablakot?' },
          { jp: '{日曜日|にちようび}でもいいですか。', romaji: 'Nichiyōbi demo ii desu ka.', hu: 'Vasárnap is megfelel?' },
          { jp: 'ペンで{書|か}いてもいいですか。', romaji: 'Pen de kaite mo ii desu ka.', hu: 'Írhatok tollal?' }
        ],
        notes: [
          'Udvariasabb változat: 〜てもよろしいですか. Barátok között: 〜てもいい？',
          'A válaszban ne ismételd meg a kérdést: a はい、どうぞ önmagában teljes válasz.'
        ],
        mistakes: [
          { bad: 'ここに{座|すわ}りますもいいですか。', good: 'ここに{座|すわ}ってもいいですか。', why: 'A もいいですか elé て-alak kell.' }
        ]
      }
    ],
    phrases: [
      { jp: 'お{待|ま}たせしました。', romaji: 'O-matase shimashita.', hu: 'Elnézést, hogy megvárakoztattalak.', note: 'Aki megérkezik, és a másik már várt rá, ezt mondja.' },
      { jp: 'どうもすみませんでした。', romaji: 'Dōmo sumimasen deshita.', hu: 'Igazán sajnálom, ami történt.', note: 'Múlt időben: lezárt dologért kérsz bocsánatot.' },
      { jp: 'いいえ、{大丈夫|だいじょうぶ}です。', romaji: 'Iie, daijōbu desu.', hu: 'Semmi baj.' },
      { jp: 'お{疲|つか}れさまでした。', romaji: 'Otsukaresama deshita.', hu: 'Köszönjük a munkát! Szép munka volt!', note: 'Munka, edzés, fellépés végén mondjuk annak, aki elfáradt benne. A munkahelyi búcsú is ez.' },
      { jp: 'いえいえ、まだまだです。', romaji: 'Ie ie, madamada desu.', hu: 'Ugyan, még messze vagyok attól.', note: 'A dicséret illendő elhárítása.' },
      { jp: 'それほどでもありません。', romaji: 'Sore hodo demo arimasen.', hu: 'Azért annyira nem.' },
      { jp: 'よかったら、いっしょにどうですか。', romaji: 'Yokattara, issho ni dō desu ka.', hu: 'Ha van kedved, velünk tartasz?' },
      { jp: 'お{先|さき}に。', romaji: 'O-saki ni.', hu: 'Én megyek előre.', note: 'Aki hamarabb távozik, ezt mondja; a teljes alak: お{先|さき}に{失礼|しつれい}します.' },
      { jp: '{気|き}をつけて。', romaji: 'Ki o tsukete.', hu: 'Vigyázz magadra!' }
    ],
    words: [
      {
        title: 'Találkozó, program',
        items: [
          { jp: '{約束|やくそく}', romaji: 'yakusoku', hu: 'megbeszélt találkozó; ígéret' },
          { jp: '{用事|ようじ}', romaji: 'yōji', hu: 'elintéznivaló, dolog' },
          { jp: '{遅|おく}れます', romaji: 'okuremasu', hu: 'késik' },
          { jp: '{間|ま}に{合|あ}います', romaji: 'ma ni aimasu', hu: 'odaér időben' },
          { jp: '{迷|まよ}います', romaji: 'mayoimasu', hu: 'eltéved; tétovázik' },
          { jp: '{忘|わす}れます', romaji: 'wasuremasu', hu: 'elfelejt; ott felejt' },
          { jp: 'なくします', romaji: 'nakushimasu', hu: 'elveszít' },
          { jp: '{地図|ちず}', romaji: 'chizu', hu: 'térkép' },
          { jp: 'デート', romaji: 'dēto', hu: 'randevú' }
        ]
      },
      {
        title: 'Zene, előadás',
        items: [
          { jp: 'コンサート', romaji: 'konsāto', hu: 'koncert' },
          { jp: 'ライブ', romaji: 'raibu', hu: 'élő koncert' },
          { jp: 'ギター', romaji: 'gitā', hu: 'gitár' },
          { jp: '{歌|うた}', romaji: 'uta', hu: 'ének, dal' },
          { jp: '{声|こえ}', romaji: 'koe', hu: 'hang (emberé)' },
          { jp: 'うまい', romaji: 'umai', hu: 'ügyes; finom' },
          { jp: 'すごい', romaji: 'sugoi', hu: 'bámulatos' }
        ]
      },
      {
        title: 'Jövevényszavak: honnan jöttek?',
        note: 'A katakanás szavak többsége angol eredetű, de nem mind.',
        items: [
          { jp: 'アルバイト', romaji: 'arubaito', hu: 'részmunka (német: Arbeit)' },
          { jp: 'パン', romaji: 'pan', hu: 'kenyér (portugál: pão)' },
          { jp: 'イクラ', romaji: 'ikura', hu: 'lazacikra (orosz: ikra)' },
          { jp: 'パプリカ', romaji: 'papurika', hu: 'paprika (magyar!)' },
          { jp: 'ビル', romaji: 'biru', hu: 'épület (angol: building)' },
          { jp: 'ユーモア', romaji: 'yūmoa', hu: 'humor (angol: humour)' }
        ]
      }
    ],
    culture: [
      {
        title: 'A dicséretet el kell hárítani',
        text: 'Ha Japánban megdicsérnek, a természetes válasz nem a „köszönöm", hanem a <b>szabadkozás</b>: いえいえ, まだまだです, そんなことはありません. Aki egyenesen elfogadja a dicséretet, az önteltnek tűnhet. Ugyanez igaz az ajándékra és a saját családra is: a saját gyerekedet, házastársadat mások előtt nem illik dicsérni. Közeli barátok között persze elég egy mosolygós ありがとう.'
      },
      {
        title: 'A csoki, amit a nők adnak',
        text: 'Japánban Valentin-napon a <b>nők</b> ajándékoznak csokoládét a férfiaknak, és többfélét. A <b>{本命|ほんめい}チョコ</b> annak jár, akit igazán szeretnek; a <b>{義理|ぎり}チョコ</b> („kötelesség-csoki") a kollégáknak, főnöknek, osztálytársaknak; a <b>{友|とも}チョコ</b> a barátnőknek. A férfiak egy hónappal később, március 14-én, a <b>ホワイトデー</b> napján viszonozzák.'
      },
      {
        title: 'Az お{疲|つか}れさま világa',
        text: 'Az <b>お{疲|つか}れさまでした</b> a japán munkahely leggyakoribb mondata: „elfáradtál, köszönjük". Így búcsúznak a kollégák a nap végén, így köszönti a csapat az edzésről távozót, így gratulálnak a fellépés után. Benne van az elismerés, a köszönet és az együttérzés is. Napközben, folyosón találkozva jelen időben hangzik el: お{疲|つか}れさまです.'
      }
    ],
    quiz: [
      { q: '„Holnap valószínűleg napos idő lesz." Mi hiányzik?', jp: 'あしたは{晴|は}れる＿。', a: 'でしょう', wrong: ['ましょう', 'でした', 'ください'], why: 'Feltevés: rövid alak + でしょう.' },
      { q: '„Otthon felejtettem a pénztárcámat." (sajnálkozva) Mi hiányzik?', jp: '{財布|さいふ}を{忘|わす}れて＿。', a: 'しまいました', wrong: ['ありました', 'ください', 'いいです'], why: 'Megtörtént, és bánom: て-alak + しまいました.' },
      { q: '„Hétvégén olvasok, zenét hallgatok, ilyesmi." Mi hiányzik?', jp: '{週末|しゅうまつ}は{本|ほん}を＿、{音楽|おんがく}を{聞|き}いたりします。', a: '{読|よ}んだり', wrong: ['{読|よ}みたり', '{読|よ}むたり', '{読|よ}んたり'], why: 'た-alak + り: {読|よ}んだ → {読|よ}んだり.' },
      { q: 'Mit jelent: コーヒーも{紅茶|こうちゃ}も{飲|の}みません。', a: 'Sem kávét, sem teát nem iszom.', wrong: ['Kávét iszom, teát nem.', 'Kávét is, teát is iszom.', 'Kávét vagy teát iszom.'], why: 'A も B も tagadással: sem ez, sem az.' },
      { q: '„Megfáztam, ezért nem mentem iskolába." Mi hiányzik?', jp: '{風邪|かぜ}を＿、{学校|がっこう}を{休|やす}みました。', a: 'ひいて', wrong: ['ひいたり', 'ひく', 'ひいても'], why: 'Az okot itt a て-alak fejezi ki.' },
      { q: '„Leülhetek ide?" Mi hiányzik?', jp: 'ここに{座|すわ}って＿いいですか。', a: 'も', wrong: ['は', 'が', 'を'], why: 'Engedélykérés: て-alak + もいいですか.' },
      { q: '„Sok a lecke, nehéz dolgom van." Mi hiányzik?', jp: '{宿題|しゅくだい}が＿、{大変|たいへん}です。', a: '{多|おお}くて', wrong: ['{多|おお}いで', '{多|おお}いて', '{多|おお}で'], why: 'い-melléknév て-alakja: い → くて.' },
      { q: 'Mit jelent: {電車|でんしゃ}が{行|い}ってしまいました。', a: 'Elment a vonat, lekéstem.', wrong: ['Megjött a vonat.', 'A vonat mindjárt indul.', 'Vonattal mentem.'], why: 'A てしまいました visszavonhatatlan, sajnálatos eseményt jelez.' },
      { q: '„Tegnap vásároltam, találkoztam a barátommal, ilyesmi." Mi hiányzik?', jp: 'きのうは{買|か}い{物|もの}をしたり、{友|とも}だちに{会|あ}ったり＿。', a: 'しました', wrong: ['でした', 'ました', 'いました'], why: 'A たり-sort a します zárja; itt múlt időben.' },
      { q: 'Valaki megkérdezi: ここでたばこを{吸|す}ってもいいですか。 Hogyan utasítod el udvariasan?', a: 'すみません、ちょっと…。', wrong: ['はい、どうぞ。', 'いいえ、ちがいます。', 'いいえ、ほしくないです。'], why: 'Az udvarias elutasítás kitérő: すみません、ちょっと…' },
      { q: 'Elkéstél a találkozóról. Mit mondasz?', a: '{遅|おく}れてすみません。', wrong: ['{遅|おく}れるすみません。', '{遅|おく}れましょう。', '{遅|おく}れてもいいですか。'], why: 'A bocsánatkérés oka て-alakban áll a すみません előtt.' },
      { q: 'Megdicsérik a japántudásodat. Mi az illendő válasz?', a: 'いえいえ、まだまだです。', wrong: ['はい、{上手|じょうず}です。', 'もちろんです。', 'お{疲|つか}れさまでした。'], why: 'A dicséretet szabadkozással fogadjuk.' },
      { q: 'Melyik a helyes? „Valószínűleg eső lesz."', a: '{雨|あめ}でしょう。', wrong: ['{雨|あめ}だでしょう。', '{雨|あめ}なでしょう。', '{雨|あめ}のでしょう。'], why: 'Főnév után a でしょう elé nem kerül だ.' },
      {
        q: 'Mit jelent: この{料理|りょうり}、おいしいでしょう？ (emelkedő hanglejtéssel)',
        a: 'Ez az étel finom, ugye?',
        wrong: ['Ez az étel valószínűleg finom lesz.', 'Ez az étel finom volt?', 'Ez az étel nem finom.'],
        why: 'Emelkedő hanglejtéssel a でしょう megerősítést kér.'
      },
      {
        q: 'Mit fejez ki leggyakrabban a 〜てしまいました?',
        a: 'hogy valami visszavonhatatlanul megtörtént, és ezt bánod',
        wrong: ['hogy valamit szívesen megtettél', 'hogy valamit meg fogsz tenni', 'hogy valamit szabad megtenni'],
        why: 'A しまいます a lezártságot és a sajnálkozást hordozza.'
      },
      { q: 'Mi a {読|よ}みます たり-alakja?', a: '{読|よ}んだり', wrong: ['{読|よ}んたり', '{読|よ}みたり', '{読|よ}んでり'], why: 'A た-alak {読|よ}んだ, ehhez járul a り.' },
      {
        q: 'Mi a különbség? {掃除|そうじ}して、{洗濯|せんたく}します ↔ {掃除|そうじ}したり、{洗濯|せんたく}したりします',
        a: 'az első mindent megnevez, sorrendben; a második csak példákat mond',
        wrong: ['az első múlt idő, a második jelen', 'az első tagadó, a második állító', 'nincs különbség'],
        why: 'A て-alak teljes, időrendi felsorolás; a たり részleges, sorrend nélküli.'
      },
      { q: 'Melyik mondat HIBÁS?', a: '{時間|じかん}がなくて、{急|いそ}ぎましょう。', wrong: ['{時間|じかん}がないので、{急|いそ}ぎましょう。', '{時間|じかん}がないから、{急|いそ}ぎましょう。', '{時間|じかん}がなくて、{困|こま}りました。'], why: 'Javaslat előtt a て-alak nem adhat okot.' },
      { q: 'Szombatra hívnak, de neked csak vasárnap jó. Hogyan javasolsz másik napot?', a: '{日曜日|にちようび}でもいいですか。', wrong: ['{日曜日|にちようび}でしょう。', '{日曜日|にちようび}にしまいます。', '{日曜日|にちようび}もいいですか。'], why: 'A főnév + でもいいですか = „… is megfelel?".' },
      { q: 'Ki ad csokoládét Valentin-napon Japánban?', a: 'a nők a férfiaknak', wrong: ['a férfiak a nőknek', 'a szülők a gyerekeknek', 'a főnök a beosztottaknak'], why: 'A férfiak március 14-én, a ホワイトデー napján viszonozzák.' }
    ]
  },

  /* ── 16. lecke ────────────────────────────────────── */
  {
    id: 'l16', no: 16, book: 'Dekiru 1', title: 'Hobbi és tapasztalat',
    lead: 'Elmondod, mi a hobbid, mit próbáltál már ki és mihez értesz, jelentkezel egy részmunkára, és megérted az üzletekben hallható tiszteleti kéréseket.',
    cando: [
      'Beszélsz a hobbidról és arról, mihez értesz.',
      'Elmondod, mit csináltál már életedben, és mit még soha.',
      'Telefonon időpontot kérsz, és helytállsz egy rövid állásinterjún.',
      'Megérted, amit a vendégnek, vásárlónak, jelentkezőnek mondanak.'
    ],
    intro: [
      'Ennek a leckének egyetlen kulcsszava van: <b>こと</b>. Önmagában annyit jelent: „dolog, tény". A nyelvtanban azonban ennél sokkal több: az igéből <b>főnevet</b> csinál. A {読|よ}む „olvas", a {読|よ}むこと „az olvasás". Ez azért fontos, mert a japánban a です, a が, a は előtt csak főnév állhat; ha igét akarsz oda tenni, előbb こと-val be kell csomagolnod.',
      'Három szerkezet épül erre. A <b>〜ことです</b> megnevezi a hobbidat vagy az álmodat. A <b>〜ことができます</b> azt mondja, mire vagy képes, vagy mit lehet valahol megtenni. A <b>〜たことがあります</b> pedig az élettapasztalat: „csináltam már ilyet". A három szerkezet abban különbözik, milyen alakban áll az ige a こと előtt.',
      'A lecke helyzete az álláskeresés: telefonhívás a hirdetésre, jelentkezési lap, rövid interjú. Itt találkozol először komolyabban a <b>tiszteleti nyelvvel</b>: az お〜ください kéréssel, amelyet vendégnek és ügyfélnek mondanak.'
    ],
    dialogue: {
      title: 'Állásinterjú a könyvesboltban',
      scene: 'Anna részmunkát keres. Egy könyvesbolt hirdetésére jelentkezik; először telefonál, másnap bemegy az üzletvezetőhöz.',
      lines: [
        { who: 'Üzletvezető', jp: 'はい、みどり{書店|しょてん}でございます。', romaji: 'Hai, Midori shoten de gozaimasu.', hu: 'Halló, Midori könyvesbolt.' },
        {
          who: 'Anna',
          jp: 'もしもし、アンナと{申|もう}します。アルバイトの{広告|こうこく}を{見|み}てお{電話|でんわ}したんですが…。',
          romaji: 'Moshimoshi, Anna to mōshimasu. Arubaito no kōkoku o mite o-denwa shita n desu ga…',
          hu: 'Halló, Annának hívnak. A részmunka-hirdetés miatt telefonálok…'
        },
        {
          who: 'Üzletvezető',
          jp: 'ありがとうございます。あしたの{四時|よじ}に{面接|めんせつ}に{来|く}ることができますか。',
          romaji: 'Arigatō gozaimasu. Ashita no yoji ni mensetsu ni kuru koto ga dekimasu ka.',
          hu: 'Köszönjük. El tudna jönni holnap négykor egy beszélgetésre?'
        },
        { who: 'Anna', jp: 'はい、{大丈夫|だいじょうぶ}です。よろしくお{願|ねが}いします。', romaji: 'Hai, daijōbu desu. Yoroshiku onegai shimasu.', hu: 'Igen, megfelel. Köszönöm, számítok rá.' },
        { who: 'Anna', jp: '{失礼|しつれい}します。', romaji: 'Shitsurei shimasu.', hu: 'Elnézést, bejöhetek?' },
        { who: 'Üzletvezető', jp: 'アンナさんですね。どうぞ、お{座|すわ}りください。', romaji: 'Anna-san desu ne. Dōzo, o-suwari kudasai.', hu: 'Ön Anna, ugye? Tessék, foglaljon helyet.' },
        { who: 'Üzletvezető', jp: '{英語|えいご}を{話|はな}すことができますか。', romaji: 'Eigo o hanasu koto ga dekimasu ka.', hu: 'Tud angolul beszélni?' },
        { who: 'Anna', jp: 'はい、できます。ドイツ{語|ご}も{少|すこ}しできます。', romaji: 'Hai, dekimasu. Doitsugo mo sukoshi dekimasu.', hu: 'Igen, tudok. Németül is egy kicsit.' },
        { who: 'Üzletvezető', jp: '{本屋|ほんや}で{働|はたら}いたことがありますか。', romaji: 'Hon-ya de hataraita koto ga arimasu ka.', hu: 'Dolgozott már könyvesboltban?' },
        {
          who: 'Anna',
          jp: '{本屋|ほんや}で{働|はたら}いたことはありませんが、{図書館|としょかん}で{働|はたら}いたことはあります。',
          romaji: 'Hon-ya de hataraita koto wa arimasen ga, toshokan de hataraita koto wa arimasu.',
          hu: 'Könyvesboltban még nem dolgoztam, de könyvtárban már igen.'
        },
        { who: 'Üzletvezető', jp: 'そうですか。{趣味|しゅみ}は{何|なん}ですか。', romaji: 'Sō desu ka. Shumi wa nan desu ka.', hu: 'Értem. Mi a hobbija?' },
        {
          who: 'Anna',
          jp: '{本|ほん}を{読|よ}むことです。{本|ほん}が{大好|だいす}きですから、ここで{働|はたら}いてみたいと{思|おも}いました。',
          romaji: 'Hon o yomu koto desu. Hon ga daisuki desu kara, koko de hataraite mitai to omoimashita.',
          hu: 'Az olvasás. Imádom a könyveket, ezért gondoltam, hogy szívesen kipróbálnám, milyen itt dolgozni.'
        }
      ],
      notes: [
        'Telefonban a cég a saját nevét <b>でございます</b>-szal mondja; a hívó a 〜と{申|もう}します formával mutatkozik be. Mindkettő a です szerény-tiszteletteljes változata.',
        'Az <b>お{電話|でんわ}したんですが…</b> félbehagyott mondat: jelzi, hogy most jön a kérés, de a folytatást a másikra bízza.',
        'A szobába lépve Anna azt mondja: <b>{失礼|しつれい}します</b>, és <b>megvárja</b>, hogy hellyel kínálják (お{座|すわ}りください). Japán interjún állva maradni, amíg nem szólnak, alapvető illem.',
        'Anna válaszában <b>は … は</b> áll: {本屋|ほんや}で{働|はたら}いたこと<b>は</b>ありませんが、{図書館|としょかん}で{働|はたら}いたこと<b>は</b>あります. A szembeállítás miatt a が helyére は kerül: „ott nem, itt viszont igen".',
        'A <b>{働|はたら}いてみたいと{思|おも}いました</b> három korábbi szerkezet együtt: 〜てみる (kipróbál) + 〜たい (szeretne) + と{思|おも}う (gondol).'
      ]
    },
    points: [
      {
        title: '〜ことです', sub: 'igéből főnév',
        pattern: 'szótári alak + こと',
        body: 'A <b>こと</b> főnévvé teszi az igét, a hozzá tartozó tárggyal együtt: {写真|しゃしん}を{撮|と}ること = „a fényképezés". Így mondod meg, mi a hobbid vagy az álmod.',
        more: [
          'A <b>こと</b> elé az ige <b>szótári alakja</b> kerül, a hozzá tartozó tárggyal, hellyel, határozóval együtt. Az egész kifejezés ezután főnévként viselkedik: állhat です előtt, és kaphat が, は, を partikulát.',
          'Miért kell? Mert a です elé nem tehetsz igét: a „しゅみは {読|よ}みます" hibás. Főnevet kell oda tenned: しゅみは<b>{読書|どくしょ}</b>です, vagy igéből készült főnevet: しゅみは{本|ほん}を<b>{読|よ}むこと</b>です.',
          'Az igét a <b>の</b> is főnevesíti ({泳|およ}ぐのが{好|す}きです), de a mondat <b>végén</b>, a です előtt csak a こと állhat. Erről a 23. leckében lesz szó.'
        ],
        tables: [
          {
            caption: 'Igéből főnév',
            head: ['Ige', 'Főnévként', 'Magyarul'],
            rows: [
              ['よむ', 'ほんを よむ<b>こと</b>', 'könyvet olvasni, az olvasás'],
              ['とる', 'しゃしんを とる<b>こと</b>', 'fényképezni, a fényképezés'],
              ['つくる', 'りょうりを つくる<b>こと</b>', 'főzni, a főzés'],
              ['はたらく', 'にほんで はたらく<b>こと</b>', 'Japánban dolgozni']
            ]
          }
        ],
        examples: [
          { jp: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ることです。', romaji: 'Shumi wa shashin o toru koto desu.', hu: 'A hobbim a fényképezés.' },
          { jp: '{私|わたし}の{夢|ゆめ}は{日本|にほん}で{働|はたら}くことです。', romaji: 'Watashi no yume wa Nihon de hataraku koto desu.', hu: 'Az az álmom, hogy Japánban dolgozzak.' },
          { jp: '{好|す}きなことは{料理|りょうり}を{作|つく}ることです。', romaji: 'Suki na koto wa ryōri o tsukuru koto desu.', hu: 'Amit szeretek csinálni, az a főzés.' },
          { jp: '{趣味|しゅみ}は{本|ほん}を{読|よ}むことです。', romaji: 'Shumi wa hon o yomu koto desu.', hu: 'A hobbim az olvasás.' },
          { jp: '{大切|たいせつ}なことは{毎日|まいにち}{練習|れんしゅう}することです。', romaji: 'Taisetsu na koto wa mainichi renshū suru koto desu.', hu: 'A fontos az, hogy minden nap gyakorolj.' }
        ],
        mistakes: [
          { bad: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ります。', good: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ることです。', why: 'A „hobbim = …" mondat végén főnévnek kell állnia: az igét こと főnevesíti.' },
          { bad: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ったことです。', good: '{趣味|しゅみ}は{写真|しゃしん}を{撮|と}ることです。', why: 'A hobbi megnevezésekor szótári alak áll a こと előtt.' }
        ]
      },
      {
        title: '〜たことがあります', sub: 'volt már rá példa',
        pattern: 'た-alak + ことがあります',
        body: 'Élettapasztalatot fejez ki: „csináltam már ilyet". Tagadva: 〜たことがありません, „még soha". Nem használod arra, ami tegnap vagy a múlt héten történt: az sima múlt idő.',
        more: [
          'A szerkezet szó szerint: „van olyan (tény), hogy megtettem". A こと előtt <b>た-alak</b> áll, a végén az あります jelen idejű: a tapasztalat <b>most megvan</b> benned.',
          'Olyasmire használod, ami <b>az életedben valaha</b> megtörtént, és említésre méltó. Nem használod közeli, konkrét időpontú eseményre: きのうすしを{食|た}べました (tegnap szusit ettem) — itt nincs helye a ことがあります-nak.',
          'A tagadás: <b>〜たことがありません</b> (még soha). Nyomatékkal: <b>{一度|いちど}も</b>〜たことがありません (egyetlenegyszer sem). A hányszor kérdésre: {一度|いちど} (egyszer), {二回|にかい} (kétszer), {何度|なんど}も (sokszor).'
        ],
        tables: [
          {
            caption: 'Tapasztalat vagy egyszerű múlt?',
            head: ['', 'Mit jelent?', 'Példa'],
            rows: [
              ['〜た ことが あります', 'életemben volt már ilyen', 'にほんへ いった ことが あります。'],
              ['〜ました', 'egy adott alkalommal megtörtént', 'きょねん にほんへ いきました。']
            ]
          }
        ],
        examples: [
          { jp: '{日本|にほん}へ{行|い}ったことがあります。', romaji: 'Nihon e itta koto ga arimasu.', hu: 'Voltam már Japánban.' },
          { jp: 'すしを{食|た}べたことがありますか。', romaji: 'Sushi o tabeta koto ga arimasu ka.', hu: 'Ettél már szusit?' },
          { jp: '{一度|いちど}も{馬|うま}に{乗|の}ったことがありません。', romaji: 'Ichido mo uma ni notta koto ga arimasen.', hu: 'Még soha nem ültem lovon.' },
          { jp: '{日本|にほん}の{映画|えいが}を{見|み}たことがありますか。', romaji: 'Nihon no eiga o mita koto ga arimasu ka.', hu: 'Láttál már japán filmet?' },
          { jp: 'はい、{何度|なんど}もあります。', romaji: 'Hai, nando mo arimasu.', hu: 'Igen, sokszor.' },
          { jp: '{富士山|ふじさん}に{登|のぼ}ったことがありません。', romaji: 'Fujisan ni nobotta koto ga arimasen.', hu: 'Még nem másztam meg a Fudzsit.' }
        ],
        notes: [
          'Szembeállításkor a が helyére は lép: {本屋|ほんや}で{働|はたら}いたこと<b>は</b>ありませんが… („könyvesboltban éppen nem, de…").',
          'A válasz rövid alakja: はい、あります / いいえ、ありません.'
        ],
        mistakes: [
          { bad: '{日本|にほん}へ{行|い}くことがあります。', good: '{日本|にほん}へ{行|い}ったことがあります。', why: 'A tapasztalathoz た-alak kell. A szótári alak + ことがあります mást jelent: „előfordul, hogy megyek".' },
          { bad: 'きのうすしを{食|た}べたことがあります。', good: 'きのうすしを{食|た}べました。', why: 'Konkrét, közeli időpontra a sima múlt idő való.' }
        ]
      },
      {
        title: '〜ことができます', sub: 'tudok, lehet',
        pattern: 'szótári alak + ことができます · főnév + ができます',
        body: 'A <b>できます</b> képességet vagy lehetőséget jelent. Ige esetén こと kell elé; főnévvel (nyelv, sport, hangszer, vezetés) közvetlenül が-val áll.',
        more: [
          'A <b>できます</b> két dolgot jelenthet. <b>Képesség:</b> én meg tudom csinálni ({泳|およ}ぐことができます = tudok úszni). <b>Lehetőség:</b> a körülmények megengedik (ここで{泳|およ}ぐことができます = itt lehet úszni).',
          'Ige elé こと kell: <b>szótári alak + ことができます</b>. Főnévvel közvetlenül, が-val áll: {日本語|にほんご}<b>が</b>できます, {運転|うんてん}<b>が</b>できます. A する-igéknél a こと elmaradhat: {運転|うんてん}(すること)ができます.',
          'A できます II. csoportú ige: できません, できました, できない, できた.'
        ],
        tables: [
          {
            caption: 'A できます két szerkezete',
            head: ['Előtte', 'Minta', 'Példa'],
            rows: [
              ['főnév', 'főnév + <b>が</b> できます', 'えいご<b>が</b> できます。'],
              ['ige', 'szótári alak + <b>ことが</b> できます', 'えいごを はなす<b>ことが</b> できます。']
            ]
          }
        ],
        examples: [
          { jp: '{漢字|かんじ}を{読|よ}むことができます。', romaji: 'Kanji o yomu koto ga dekimasu.', hu: 'Tudok kanjit olvasni.' },
          { jp: 'ここでインターネットを{使|つか}うことができます。', romaji: 'Koko de intānetto o tsukau koto ga dekimasu.', hu: 'Itt lehet internetet használni.' },
          { jp: '{私|わたし}は{車|くるま}の{運転|うんてん}ができます。', romaji: 'Watashi wa kuruma no unten ga dekimasu.', hu: 'Tudok autót vezetni.' },
          { jp: 'ピアノを{弾|ひ}くことができません。', romaji: 'Piano o hiku koto ga dekimasen.', hu: 'Nem tudok zongorázni.' },
          { jp: '{英語|えいご}を{話|はな}すことができますか。', romaji: 'Eigo o hanasu koto ga dekimasu ka.', hu: 'Tudsz angolul beszélni?' },
          { jp: 'この{図書館|としょかん}では{十冊|じゅっさつ}{借|か}りることができます。', romaji: 'Kono toshokan de wa jussatsu kariru koto ga dekimasu.', hu: 'Ebben a könyvtárban tíz könyvet lehet kölcsönözni.' }
        ],
        notes: [
          'A képességnek van rövidebb, egyszavas alakja is (ható alak: {話|はな}せます, {食|た}べられます); ezt a 27. leckében tanulod. A ことができます hivatalosabb, írásban gyakoribb.',
          'Mértéket határozószó ad: {少|すこ}しできます, あまりできません, ぜんぜんできません.'
        ],
        mistakes: [
          { bad: '{漢字|かんじ}を{読|よ}むができます。', good: '{漢字|かんじ}を{読|よ}むことができます。', why: 'Az ige és a が közé こと kell.' },
          { bad: '{英語|えいご}をできます。', good: '{英語|えいご}ができます。', why: 'A できます mellett az, amit tudsz, が-t kap.' }
        ]
      },
      {
        title: 'A は B ですが、C は D です', sub: 'szembeállítás',
        pattern: 'A は 〜が、C は 〜',
        body: 'A mondatvégi <b>が</b> itt „de". A két szembeállított dolog egyaránt <b>は</b>-t kap, akkor is, ha amúgy を vagy が járna neki.',
        more: [
          'Ezt a mintát a 7. leckében már megismerted. Itt azért tér vissza, mert a ことがあります és a ことができます mellett különösen gyakori: ha két tapasztalatot vagy két képességet állítasz szembe, a <b>が helyére は</b> lép mindkét oldalon.',
          'A tagmondat végi が („de") előtt udvarias alak áll; a két は jelzi, hogy <i>ez</i> igen, <i>az</i> viszont nem.'
        ],
        tables: [
          {
            caption: 'A が は-ra vált',
            head: ['Sima mondat', 'Szembeállítva'],
            rows: [
              ['えいご<b>が</b> できます。', 'えいご<b>は</b> できますが、フランスご<b>は</b> できません。'],
              ['いった こと<b>が</b> あります。', 'きょうとへ いった こと<b>は</b> ありますが、ならへ いった こと<b>は</b> ありません。']
            ]
          }
        ],
        examples: [
          { jp: '{兄|あに}は{背|せ}が{高|たか}いですが、{弟|おとうと}は{低|ひく}いです。', romaji: 'Ani wa se ga takai desu ga, otōto wa hikui desu.', hu: 'A bátyám magas, az öcsém viszont alacsony.' },
          { jp: '{平日|へいじつ}は{忙|いそが}しいですが、{週末|しゅうまつ}は{暇|ひま}です。', romaji: 'Heijitsu wa isogashii desu ga, shūmatsu wa hima desu.', hu: 'Hétköznap sok dolgom van, de hétvégén ráérek.' },
          { jp: '{肉|にく}は{食|た}べますが、{魚|さかな}は{食|た}べません。', romaji: 'Niku wa tabemasu ga, sakana wa tabemasen.', hu: 'Húst eszem, de halat nem.' },
          { jp: '{英語|えいご}はできますが、フランス{語|ご}はできません。', romaji: 'Eigo wa dekimasu ga, Furansugo wa dekimasen.', hu: 'Angolul tudok, de franciául nem.' },
          { jp: 'すしは{食|た}べたことがありますが、{納豆|なっとう}は{食|た}べたことがありません。', romaji: 'Sushi wa tabeta koto ga arimasu ga, nattō wa tabeta koto ga arimasen.', hu: 'Szusit ettem már, de nattót még nem.' }
        ]
      },
      {
        title: 'お〜ください', sub: 'tiszteleti kérés',
        pattern: 'お + ます-tő + ください',
        body: 'A 〜てください udvariasabb változata, amit vendégnek, vásárlónak, ügyfélnek mondanak: a ます-alakból elhagyod a ます-t, elé <b>お</b>, mögé <b>ください</b> kerül. Boltban, szállodában, állomáson fogod hallani; elég megértened.',
        more: [
          'Az <b>お + ます-tő + ください</b> a 〜てください <b>tiszteleti</b> változata. Ugyanazt kéri, de a megszólítottat a beszélő fölé emeli. Üzletben, szállodában, pályaudvaron, hivatalban hallod; feliratokon is ez áll.',
          'Képzése: a 〜ます alakból leveszed a ます-t, elé お, mögé ください kerül: {待|ま}ち<b>ます</b> → <b>お</b>{待|ま}ち<b>ください</b>.',
          'A する-igéknél és a kínai eredetű főneveknél az お helyett <b>ご</b> áll, és a します elmarad: ご{連絡|れんらく}ください (kérem, értesítsen), ご{注意|ちゅうい}ください (kérem, vigyázzon).'
        ],
        tables: [
          {
            caption: 'A tiszteleti kérés képzése',
            head: ['〜ます', '〜てください', 'お〜ください'],
            rows: [
              ['まちます', 'まってください', '<b>お</b>まち<b>ください</b>'],
              ['すわります', 'すわってください', '<b>お</b>すわり<b>ください</b>'],
              ['はいります', 'はいってください', '<b>お</b>はいり<b>ください</b>'],
              ['かきます', 'かいてください', '<b>お</b>かき<b>ください</b>'],
              ['つかいます', 'つかってください', '<b>お</b>つかい<b>ください</b>']
            ]
          }
        ],
        examples: [
          { jp: '{少々|しょうしょう}お{待|ま}ちください。', romaji: 'Shōshō omachi kudasai.', hu: 'Kérem, várjon egy kicsit.' },
          { jp: 'こちらにお{名前|なまえ}をお{書|か}きください。', romaji: 'Kochira ni onamae o okaki kudasai.', hu: 'Kérem, ide írja a nevét.' },
          { jp: 'どうぞお{入|はい}りください。', romaji: 'Dōzo ohairi kudasai.', hu: 'Kérem, fáradjon be.' },
          { jp: 'どうぞ、お{座|すわ}りください。', romaji: 'Dōzo, o-suwari kudasai.', hu: 'Tessék, foglaljon helyet.' },
          { jp: 'こちらでお{待|ま}ちください。', romaji: 'Kochira de o-machi kudasai.', hu: 'Kérem, itt várjon.' }
        ],
        notes: [
          'Néhány igének nincs ilyen alakja, mert külön tiszteleti igéje van: {来|き}てください helyett お{越|こ}しください vagy いらっしゃってください; {見|み}てください helyett ご{覧|らん}ください. Ezeket a 38. leckében tanulod.',
          'Ezt az alakot elsősorban <b>megérteni</b> kell. Te magad akkor használd, ha vendéget, ügyfelet, idős embert szólítasz meg.'
        ],
        mistakes: [
          { bad: 'お{待|ま}ってください。', good: 'お{待|ま}ちください。', why: 'Az お után a ます-tő áll, nem a て-alak.' }
        ]
      }
    ],
    phrases: [
      { jp: 'アンナと{申|もう}します。', romaji: 'Anna to mōshimasu.', hu: 'Annának hívnak.', note: 'Hivatalos, szerény bemutatkozás: interjún, telefonban.' },
      { jp: '{少々|しょうしょう}お{待|ま}ちくださいませ。', romaji: 'Shōshō o-machi kudasaimase.', hu: 'Egy pillanat türelmét kérem.', note: 'A ませ még tiszteletteljesebbé teszi a kérést; telefonban, pultnál hallod.' },
      { jp: 'こちらへどうぞ。', romaji: 'Kochira e dōzo.', hu: 'Erre tessék.' },
      { jp: 'お{待|ま}ちしています。', romaji: 'O-machi shite imasu.', hu: 'Várom önt.' },
      { jp: 'よろしくお{願|ねが}いします。', romaji: 'Yoroshiku onegai shimasu.', hu: 'Köszönöm, számítok önre.', note: 'Megbeszélés, megállapodás végén: „kérem, legyen jóindulattal".' },
      { jp: 'はじめてです。', romaji: 'Hajimete desu.', hu: 'Most csinálom először.' },
      { jp: 'まだ{一度|いちど}もありません。', romaji: 'Mada ichido mo arimasen.', hu: 'Még egyszer sem.' },
      { jp: 'がんばりますので、よろしくお{願|ねが}いします。', romaji: 'Ganbarimasu node, yoroshiku onegai shimasu.', hu: 'Mindent megteszek, kérem, fogadjanak jó szívvel.' }
    ],
    words: [
      {
        title: 'Munka, jelentkezés',
        items: [
          { jp: 'アルバイト', romaji: 'arubaito', hu: 'részmunka, diákmunka' },
          { jp: '{仕事|しごと}', romaji: 'shigoto', hu: 'munka' },
          { jp: '{広告|こうこく}', romaji: 'kōkoku', hu: 'hirdetés' },
          { jp: '{面接|めんせつ}', romaji: 'mensetsu', hu: 'interjú' },
          { jp: '{経験|けいけん}', romaji: 'keiken', hu: 'tapasztalat' },
          { jp: '{時給|じきゅう}', romaji: 'jikyū', hu: 'órabér' },
          { jp: '{店員|てんいん}', romaji: 'ten-in', hu: 'eladó' },
          { jp: 'お{客|きゃく}さん', romaji: 'o-kyaku-san', hu: 'vendég, vevő' },
          { jp: '{働|はたら}きます', romaji: 'hatarakimasu', hu: 'dolgozik' }
        ]
      },
      {
        title: 'A jelentkezési lap rovatai',
        items: [
          { jp: '{名前|なまえ}', romaji: 'namae', hu: 'név' },
          { jp: '{生年月日|せいねんがっぴ}', romaji: 'seinengappi', hu: 'születési dátum' },
          { jp: '{住所|じゅうしょ}', romaji: 'jūsho', hu: 'lakcím' },
          { jp: '{電話番号|でんわばんごう}', romaji: 'denwa bangō', hu: 'telefonszám' },
          { jp: '{男|おとこ}', romaji: 'otoko', hu: 'férfi' },
          { jp: '{女|おんな}', romaji: 'onna', hu: 'nő' },
          { jp: '{趣味|しゅみ}', romaji: 'shumi', hu: 'hobbi' },
          { jp: '{理由|りゆう}', romaji: 'riyū', hu: 'ok, indok' }
        ]
      },
      {
        title: 'Amit tudhatsz',
        items: [
          { jp: '{運転|うんてん}', romaji: 'unten', hu: 'vezetés' },
          { jp: '{泳|およ}ぎます', romaji: 'oyogimasu', hu: 'úszik' },
          { jp: '{弾|ひ}きます', romaji: 'hikimasu', hu: 'játszik (húros, billentyűs hangszeren)' },
          { jp: '{歌|うた}います', romaji: 'utaimasu', hu: 'énekel' },
          { jp: '{使|つか}います', romaji: 'tsukaimasu', hu: 'használ' },
          { jp: '{説明|せつめい}します', romaji: 'setsumei shimasu', hu: 'elmagyaráz' },
          { jp: '{運|はこ}びます', romaji: 'hakobimasu', hu: 'cipel, szállít' },
          { jp: '{早起|はやお}きします', romaji: 'hayaoki shimasu', hu: 'korán kel' }
        ]
      }
    ],
    culture: [
      {
        title: 'Diákmunka: az アルバイト',
        text: 'A japán egyetemisták nagy többsége dolgozik tanulás mellett: kisboltban, étteremben, magántanárként. A szó a német <i>Arbeit</i>-ból ered, röviden <b>バイト</b>. A legtöbben nem a megélhetésért, hanem a saját kiadásaikra keresnek: utazásra, ruhára, szórakozásra. A hirdetésekben az órabér (<b>{時給|じきゅう}</b>) szerepel, és az, hogy hetente hányszor, mely napokon kell menni.'
      },
      {
        title: 'Az interjú illemtana',
        text: 'Japánban a részmunkához is tartozik rövid elbeszélgetés (<b>{面接|めんせつ}</b>). Az ajtón kopogsz, belépve azt mondod: {失礼|しつれい}します, és <b>állva maradsz</b>, amíg hellyel nem kínálnak. Pontosan érkezni annyit jelent: öt-tíz perccel korábban. A végén felállsz, megköszönöd (ありがとうございました), meghajolsz, és az ajtóból még egyszer: {失礼|しつれい}します.'
      },
      {
        title: 'A vevő király',
        text: 'A japán üzletekben a vevőt <b>お{客様|きゃくさま}</b>-nak hívják, és az eladó különleges, tiszteletteljes nyelven beszél hozzá: いらっしゃいませ, {少々|しょうしょう}お{待|ま}ちください, かしこまりました, {申|もう}し{訳|わけ}ありません. Ezeket az új alkalmazottak betanulják, mint egy szerepet. Vevőként nem kell így válaszolnod: a sima です / ます tökéletesen megfelel.'
      }
    ],
    quiz: [
      { q: '„A hobbim a fényképezés." Mi hiányzik?', jp: '{趣味|しゅみ}は{写真|しゃしん}を＿ことです。', a: '{撮|と}る', wrong: ['{撮|と}って', '{撮|と}ります', '{撮|と}り'], why: 'A こと előtt szótári alak áll.' },
      { q: '„Voltam már Japánban." Mi hiányzik?', jp: '{日本|にほん}へ＿ことがあります。', a: '{行|い}った', wrong: ['{行|い}って', '{行|い}きます', '{行|い}き'], why: 'Tapasztalat: た-alak + ことがあります.' },
      { q: '„Tudok kanjit olvasni." Mi hiányzik?', jp: '{漢字|かんじ}を{読|よ}む＿ができます。', a: 'こと', wrong: ['もの', 'ところ', 'つもり'], why: 'Ige + こと + ができます.' },
      { q: '„Tudok autót vezetni." Mi hiányzik?', jp: '{私|わたし}は{車|くるま}の{運転|うんてん}＿できます。', a: 'が', wrong: ['に', 'で', 'へ'], why: 'Főnév + ができます.' },
      { q: '„Húst eszem, de halat nem." Mi hiányzik?', jp: '{肉|にく}は{食|た}べます＿、{魚|さかな}は{食|た}べません。', a: 'が', wrong: ['か', 'も', 'と'], why: 'A mondatvégi が itt „de".' },
      { q: '„Kérem, várjon egy kicsit." (tiszteleti) Mi hiányzik?', jp: '{少々|しょうしょう}＿ください。', a: 'お{待|ま}ち', wrong: ['お{待|ま}って', '{待|ま}ち', 'お{待|ま}つ'], why: 'お + ます-tő + ください: {待|ま}ちます → お{待|ま}ちください.' },
      { q: 'Mit jelent: すしを{食|た}べたことがありますか。', a: 'Ettél már szusit?', wrong: ['Szeretnél szusit enni?', 'Szoktál szusit enni?', 'Tegnap szusit ettél?'], why: '〜たことがあります = volt már rá példa az életedben.' },
      { q: 'Melyik mondat jelenti: „Még soha nem ültem lovon."', a: '{馬|うま}に{乗|の}ったことがありません。', wrong: ['{馬|うま}に{乗|の}ることができません。', '{馬|うま}に{乗|の}りませんでした。', '{馬|うま}に{乗|の}らないことです。'], why: 'A tapasztalat hiánya: た-alak + ことがありません.' },
      { q: '„Itt lehet internetet használni." Mi hiányzik?', jp: 'ここでインターネットを＿ことができます。', a: '{使|つか}う', wrong: ['{使|つか}って', '{使|つか}った', '{使|つか}います'], why: 'A ことができます előtt szótári alak áll.' },
      {
        q: 'Hol hallod leginkább: どうぞお{入|はい}りください。',
        a: 'Udvarias helyzetben: vendégnek, ügyfélnek mondják.',
        wrong: ['Barátok között, lazán.', 'Gyereknek szóló utasításként.', 'Csak írásban, tiltó táblán.'],
        why: 'Az お〜ください tiszteleti kérés.'
      },
      {
        q: 'Melyik mondat helyes? „A hobbim a főzés."',
        a: '{趣味|しゅみ}は{料理|りょうり}を{作|つく}ることです。',
        wrong: [
          '{趣味|しゅみ}は{料理|りょうり}を{作|つく}ります。',
          '{趣味|しゅみ}は{料理|りょうり}を{作|つく}るです。',
          '{趣味|しゅみ}は{料理|りょうり}を{作|つく}ってことです。'
        ],
        why: 'A です elé főnév kell: az igét a こと főnevesíti, szótári alakban.'
      },
      { q: 'Milyen alakban áll az ige a 〜ことがあります (tapasztalat) előtt?', a: 'た-alakban', wrong: ['szótári alakban', 'て-alakban', 'ます-alakban'], why: 'A tapasztalat: た-alak + ことがあります.' },
      {
        q: 'Melyik mondat HIBÁS?',
        a: 'きのう{映画|えいが}を{見|み}たことがあります。',
        wrong: ['{日本|にほん}の{映画|えいが}を{見|み}たことがあります。', 'きのう{映画|えいが}を{見|み}ました。', '{一度|いちど}も{見|み}たことがありません。'],
        why: 'Konkrét, közeli időpontra a sima múlt idő való, nem a tapasztalat szerkezete.'
      },
      { q: '„Tudok angolul." Melyik partikula hiányzik?', jp: '{英語|えいご}＿できます。', a: 'が', wrong: ['を', 'に', 'で'], why: 'A できます mellett az, amit tudsz, が-t kap.' },
      {
        q: 'Mit jelent: ここで{写真|しゃしん}を{撮|と}ることができます。',
        a: 'Itt lehet fényképezni.',
        wrong: ['Itt fényképeztem már.', 'Itt szeretnék fényképezni.', 'Itt kell fényképezni.'],
        why: 'A ことができます lehetőséget is kifejez: a körülmények megengedik.'
      },
      { q: '„Angolul tudok, de franciául nem." Mi hiányzik?', jp: '{英語|えいご}＿できますが、フランス{語|ご}＿できません。', a: 'は … は', wrong: ['が … が', 'を … を', 'に … に'], why: 'Szembeállításkor a が helyére mindkét oldalon は lép.' },
      { q: 'Mi a {待|ま}ってください tiszteleti változata?', a: 'お{待|ま}ちください', wrong: ['お{待|ま}ってください', 'ご{待|ま}ちください', 'お{待|ま}つください'], why: 'お + ます-tő + ください.' },
      {
        q: 'Állásinterjún belépsz a szobába. Mit teszel?',
        a: 'Azt mondod: {失礼|しつれい}します, és megvárod, amíg hellyel kínálnak.',
        wrong: [
          'Rögtön leülsz, és azt mondod: いただきます。',
          'Azt mondod: ただいま, és leülsz.',
          'Kezet nyújtasz, és azt mondod: もしもし。'
        ],
        why: 'Belépéskor {失礼|しつれい}します; leülni csak az お{座|すわ}りください után illik.'
      },
      { q: 'Hivatalos telefonhívásban hogyan mutatkozol be?', a: 'アンナと{申|もう}します。', wrong: ['アンナさんです。', 'アンナだよ。', 'アンナでございますか。'], why: 'A 〜と{申|もう}します a szerény, hivatalos bemutatkozás.' },
      { q: 'Honnan ered az アルバイト szó?', a: 'a német Arbeit szóból', wrong: ['az angol „all right"-ból', 'a portugál nyelvből', 'régi japán szó'], why: 'A részmunkát jelentő アルバイト német eredetű; röviden バイト.' }
    ]
  },

  /* ── 17. lecke ────────────────────────────────────── */
  {
    id: 'l17', no: 17, book: 'Dekiru 1', title: 'Szabad és tilos',
    lead: 'Megmondod, mikor mit csinálsz, bejelentkezel egy szállodába, megérted és elmondod, mi szabad és mi tilos, és két állítást egy mondatba kötsz.',
    cando: [
      'Megmondod, mit teszel egy adott helyzetben vagy időpontban.',
      'Engedélyt kérsz, megadod vagy udvariasan megtagadod.',
      'Megérted a házirendet és a tiltó táblákat.',
      'Bejelentkezel egy szállodába, és rákérdezel a szolgáltatásokra.'
    ],
    intro: [
      'A lecke első fele az <b>időről</b> szól: a <b>とき</b> („amikor") két mondatot köt össze. A とき maga főnév („idő, alkalom"), ezért az előtte álló rész úgy kapcsolódik hozzá, mint egy jelző a főnévhez: főnév の-val, な-melléknév な-val, ige rövid alakban.',
      'Az igazi újdonság az, hogy a とき előtt álló ige <b>ideje nem azt jelenti, amit a magyarban</b>. A szótári alak és a た-alak közötti választás nem a múltat és a jelent különbözteti meg, hanem azt, hogy a főmondat eseményekor az a cselekvés <b>megtörtént-e már</b>. Ez a japán időszemlélet egyik kulcsa, és a 14. lecke 〜まえに / 〜あとで szabályával rokon.',
      'A második fél a <b>szabályokról</b> szól: engedély (〜てもいいです) és tilalom (〜てはいけません). A kettő egymás tükörképe, és együtt adják a házirendek, táblák, útmutatók nyelvét.'
    ],
    dialogue: {
      title: 'A szálloda recepcióján',
      scene: 'Anna és a szülei, akik látogatóba jöttek Japánba, megérkeznek egy kiotói szállodába.',
      lines: [
        { who: 'Recepciós', jp: 'いらっしゃいませ。', romaji: 'Irasshaimase.', hu: 'Üdvözlöm önöket!' },
        { who: 'Anna', jp: 'すみません、{予約|よやく}をしているんですが…。アンナ・コヴァーチです。', romaji: 'Sumimasen, yoyaku o shite iru n desu ga… Anna Kovāchi desu.', hu: 'Elnézést, foglalásunk van… Kovács Anna néven.' },
        {
          who: 'Recepciós',
          jp: 'コヴァーチ{様|さま}ですね。こちらにお{名前|なまえ}とご{住所|じゅうしょ}をお{書|か}きください。',
          romaji: 'Kovāchi-sama desu ne. Kochira ni o-namae to go-jūsho o o-kaki kudasai.',
          hu: 'Kovács kisasszony, igaz? Kérem, ide írja a nevét és a címét.'
        },
        { who: 'Anna', jp: 'あのう、この{漢字|かんじ}は{何|なん}と{読|よ}みますか。', romaji: 'Anō, kono kanji wa nan to yomimasu ka.', hu: 'Öö, ezt a kanjit hogyan kell olvasni?' },
        { who: 'Recepciós', jp: '「れんらくさき」です。{電話番号|でんわばんごう}をお{書|か}きください。', romaji: '"Renrakusaki" desu. Denwa bangō o o-kaki kudasai.', hu: '„Renrakuszaki", elérhetőség. Kérem, a telefonszámát írja be.' },
        { who: 'Recepciós', jp: 'お{部屋|へや}は{三階|さんがい}で、{朝|あさ}ごはんは{一階|いっかい}の{食堂|しょくどう}です。', romaji: 'O-heya wa sangai de, asagohan wa ikkai no shokudō desu.', hu: 'A szobájuk a harmadik szinten van, a reggeli a földszinti étteremben.' },
        { who: 'Anna', jp: '{部屋|へや}で{朝|あさ}ごはんを{食|た}べてもいいですか。', romaji: 'Heya de asagohan o tabete mo ii desu ka.', hu: 'A szobában is reggelizhetünk?' },
        { who: 'Recepciós', jp: '{申|もう}し{訳|わけ}ありません。お{食事|しょくじ}は{食堂|しょくどう}でお{願|ねが}いします。', romaji: 'Mōshiwake arimasen. O-shokuji wa shokudō de onegai shimasu.', hu: 'Nagyon sajnálom. Az étkezést az étteremben kérjük.' },
        { who: 'Anna', jp: 'ロビーのパソコンを{使|つか}ってもいいですか。', romaji: 'Robī no pasokon o tsukatte mo ii desu ka.', hu: 'Használhatjuk a hallban lévő számítógépet?' },
        { who: 'Recepciós', jp: 'はい、どうぞ。{出|で}かけるとき、フロントに{鍵|かぎ}をお{預|あず}けください。', romaji: 'Hai, dōzo. Dekakeru toki, furonto ni kagi o o-azuke kudasai.', hu: 'Igen, tessék. Amikor elmennek, kérem, adják le a kulcsot a recepción.' },
        { who: 'Anna', jp: 'わかりました。ありがとうございます。', romaji: 'Wakarimashita. Arigatō gozaimasu.', hu: 'Értem. Köszönöm szépen.' }
      ],
      notes: [
        'A recepciós a vendég nevéhez <b>{様|さま}</b>-t tesz: ez a さん tiszteletteljesebb változata, vevőnek, vendégnek, címzettnek jár.',
        'A tiszteleti <b>お / ご</b> előtag a vendég dolgaira kerül: お{名前|なまえ}, ご{住所|じゅうしょ}, お{部屋|へや}. Japán eredetű szavak elé többnyire お, kínai eredetűek elé ご áll.',
        'A <b>{何|なん}と{読|よ}みますか</b> („minek olvassuk?") az a kérdés, amellyel egy ismeretlen kanji olvasatára rákérdezel. A と itt idéző partikula.',
        'A tiltás itt sem hangzik el nyíltan: a recepciós bocsánatot kér, és megmondja, hol <i>lehet</i> enni. A 〜てはいけません szemtől szemben túl kemény volna.',
        'A <b>{出|で}かけるとき</b> szótári alakban áll: a kulcsot <i>indulás előtt</i>, még a szállodában kell leadni.'
      ]
    },
    points: [
      {
        title: '〜とき', sub: 'amikor (főnév, melléknév)',
        pattern: 'főnév + のとき · い-melléknév + とき · な-melléknév + なとき',
        body: 'A <b>とき</b> maga is főnév („idő, alkalom"), ezért úgy kapcsolódik, ahogy a főnévhez szokás: főnév után <b>の</b>, な-melléknév után <b>な</b> kell elé, az い-melléknév közvetlenül áll előtte.',
        more: [
          'A とき előtt álló szó úgy viselkedik, mint egy jelző. <b>Főnév + の</b>: {子|こ}ども<b>の</b>とき. <b>な-melléknév + な</b>: {暇|ひま}<b>な</b>とき. <b>い-melléknév</b> közvetlenül: {寒|さむ}いとき.',
          'A とき után állhat に (pontos időpontot hangsúlyoz) vagy は (szembeállít), de többnyire partikula nélkül, vesszővel áll.',
          'Múltra vonatkoztatva a melléknév maradhat jelen alakban is: {若|わか}いとき、よく{旅行|りょこう}しました (fiatal koromban sokat utaztam).'
        ],
        tables: [
          {
            caption: 'Mi áll a とき előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['főnév', '+ <b>の</b>', 'こども<b>の</b> とき'],
              ['な-mn.', '+ <b>な</b>', 'ひま<b>な</b> とき'],
              ['い-mn.', 'alapalak', 'さむい とき'],
              ['ige', 'rövid alak', 'いく とき · いった とき · いかない とき']
            ]
          }
        ],
        examples: [
          { jp: '{子|こ}どものとき、{東京|とうきょう}に{住|す}んでいました。', romaji: 'Kodomo no toki, Tōkyō ni sunde imashita.', hu: 'Gyerekkoromban Tokióban laktam.' },
          { jp: '{暇|ひま}なとき、{本|ほん}を{読|よ}みます。', romaji: 'Hima na toki, hon o yomimasu.', hu: 'Amikor ráérek, olvasok.' },
          { jp: '{寒|さむ}いとき、コートを{着|き}ます。', romaji: 'Samui toki, kōto o kimasu.', hu: 'Amikor hideg van, kabátot veszek.' },
          { jp: '{学生|がくせい}のとき、よく{旅行|りょこう}しました。', romaji: 'Gakusei no toki, yoku ryokō shimashita.', hu: 'Diákkoromban sokat utaztam.' },
          { jp: '{若|わか}いとき、たくさん{勉強|べんきょう}したほうがいいです。', romaji: 'Wakai toki, takusan benkyō shita hō ga ii desu.', hu: 'Fiatalon érdemes sokat tanulni.' }
        ],
        mistakes: [
          { bad: '{子|こ}どもとき', good: '{子|こ}どものとき', why: 'Főnév és とき közé の kell.' },
          { bad: '{暇|ひま}のとき', good: '{暇|ひま}なとき', why: 'な-melléknév な-val kapcsolódik a とき-hoz.' }
        ]
      },
      {
        title: '〜るとき・〜たとき', sub: 'amikor (ige)',
        pattern: 'szótári alak + とき · た-alak + とき',
        body: 'Ige után az alak azt mutatja, hogy a főmondat idején a cselekvés <i>lezárult-e már</i>. Szótári alak: még nem (előtte vagy közben). た-alak: már megtörtént (utána).',
        more: [
          'A szabály: kérdezd meg, <b>a főmondat pillanatában</b> megtörtént-e már a とき előtti cselekvés. Ha még <b>nem</b> (előtte állsz vagy közben vagy) → <b>szótári alak</b>. Ha <b>igen</b> (már lezárult) → <b>た-alak</b>.',
          'A mondat egészének idejét továbbra is a végén álló ige adja meg. A két idő független egymástól: {行|い}くとき、{買|か}い<b>ました</b> (múltban történt, de a vásárlás az út <i>előtt</i> volt).',
          'Mozgásigéknél a különbség különösen éles: {帰|かえ}<b>る</b>とき = útban hazafelé vagy indulás előtt; {帰|かえ}<b>った</b>とき = miután hazaértél.'
        ],
        tables: [
          {
            caption: 'Szótári alak vagy た-alak?',
            head: ['', 'A cselekvés a főmondat idején…', 'Példa'],
            rows: [
              ['いく とき', 'még nem zárult le (előtte, közben)', 'にほんへ いく とき、くうこうで かいました。'],
              ['いった とき', 'már megtörtént (utána)', 'にほんへ いった とき、きょうとで かいました。']
            ]
          },
          {
            caption: 'Köszönések ugyanezzel a logikával',
            head: ['Mikor?', 'Mit mondasz?'],
            rows: [
              ['でかける とき (induláskor)', 'いってきます。'],
              ['かえった とき (hazaérve)', 'ただいま。'],
              ['ごはんを たべる とき (evés előtt)', 'いただきます。'],
              ['ごはんを たべた とき (evés után)', 'ごちそうさまでした。']
            ]
          }
        ],
        examples: [
          { jp: '{日本|にほん}へ{行|い}くとき、かばんを{買|か}いました。', romaji: 'Nihon e iku toki, kaban o kaimashita.', hu: 'Amikor Japánba készültem, vettem egy táskát.' },
          { jp: '{日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。', romaji: 'Nihon e itta toki, kaban o kaimashita.', hu: 'Amikor Japánban jártam, vettem egy táskát.' },
          { jp: '{道|みち}がわからないとき、{地図|ちず}を{見|み}ます。', romaji: 'Michi ga wakaranai toki, chizu o mimasu.', hu: 'Amikor nem tudom az utat, megnézem a térképet.' },
          { jp: '{出|で}かけるとき、{鍵|かぎ}をかけます。', romaji: 'Dekakeru toki, kagi o kakemasu.', hu: 'Amikor elmegyek otthonról, bezárom az ajtót.' },
          { jp: 'うちへ{帰|かえ}ったとき、「ただいま」と{言|い}います。', romaji: 'Uchi e kaetta toki, "tadaima" to iimasu.', hu: 'Amikor hazaérek, azt mondom: „megjöttem".' },
          { jp: '{寝|ね}るとき、「おやすみなさい」と{言|い}います。', romaji: 'Neru toki, "oyasuminasai" to iimasu.', hu: 'Lefekvéskor azt mondom: „jó éjszakát".' }
        ],
        notes: [
          'A tagadó alak (〜ないとき) és az állapotot jelentő alakok (あるとき, いるとき, 〜ているとき) egyidejűséget fejeznek ki: {時間|じかん}がないとき (amikor nincs időm).'
        ],
        mistakes: [
          { bad: 'うちへ{帰|かえ}るとき、「ただいま」と{言|い}います。', good: 'うちへ{帰|かえ}ったとき、「ただいま」と{言|い}います。', why: 'A „megjöttem" akkor hangzik el, amikor már hazaértél: た-alak kell.' }
        ],
        tip: 'A とき előtti alak nem a mondat idejét adja meg: {行|い}くとき = még úton vagy indulás előtt, {行|い}ったとき = már odaértél.'
      },
      {
        title: '〜てはいけません', sub: 'tilos',
        pattern: 'ige て-alak + はいけません',
        body: 'Szabályt, tilalmat fejez ki: „nem szabad". Táblákon, házirendben gyakori; egy embernek szemtől szemben mondva kemény, oda a 〜ないでください illik.',
        more: [
          'A <b>〜てはいけません</b> szó szerint: „ha megteszed, az nem megy". <b>Szabályt</b> mond ki: általános érvényű tilalom, amelyet nem a beszélő talált ki. Házirendben, közlekedési szabályban, szülő és gyerek, tanár és diák között természetes.',
          'Egy felnőttnek szemtől szemben mondva <b>kemény</b>. Ha megkérsz valakit, hogy ne tegyen valamit, a 〜ないでください való; ha nagyon udvarias akarsz lenni: ご{遠慮|えんりょ}ください (kérjük, tartózkodjon tőle).',
          'Beszédben a ては összevonódik: <b>〜ちゃいけない</b>, a では pedig <b>〜じゃいけない</b>. Rokon alak a 〜てはだめです (nem jó, ha…).'
        ],
        tables: [
          {
            caption: 'Engedély és tilalom',
            head: ['', 'Alak', 'Példa'],
            rows: [
              ['szabad', 'て-alak + <b>も いいです</b>', 'ここで たべ<b>ても いいです</b>。'],
              ['tilos', 'て-alak + <b>は いけません</b>', 'ここで たべ<b>ては いけません</b>。'],
              ['kérem, ne', 'ない-alak + <b>で ください</b>', 'ここで たべ<b>ないで ください</b>。']
            ]
          }
        ],
        examples: [
          { jp: 'ここでたばこを{吸|す}ってはいけません。', romaji: 'Koko de tabako o sutte wa ikemasen.', hu: 'Itt tilos dohányozni.' },
          { jp: '{美術館|びじゅつかん}で{写真|しゃしん}を{撮|と}ってはいけません。', romaji: 'Bijutsukan de shashin o totte wa ikemasen.', hu: 'A múzeumban tilos fényképezni.' },
          { jp: 'この{部屋|へや}に{入|はい}ってはいけません。', romaji: 'Kono heya ni haitte wa ikemasen.', hu: 'Ebbe a szobába tilos belépni.' },
          { jp: '{図書館|としょかん}で{大|おお}きい{声|こえ}で{話|はな}してはいけません。', romaji: 'Toshokan de ōkii koe de hanashite wa ikemasen.', hu: 'A könyvtárban tilos hangosan beszélni.' },
          { jp: 'ここに{車|くるま}を{止|と}めてはいけません。', romaji: 'Koko ni kuruma o tomete wa ikemasen.', hu: 'Itt tilos parkolni.' }
        ],
        notes: [
          'Táblákon rövidebben áll: <b>{禁煙|きんえん}</b> (dohányozni tilos), <b>{立入禁止|たちいりきんし}</b> (belépni tilos), <b>{撮影禁止|さつえいきんし}</b> (fényképezni tilos).'
        ],
        mistakes: [
          { bad: 'ここでたばこを{吸|す}いますはいけません。', good: 'ここでたばこを{吸|す}ってはいけません。', why: 'A はいけません elé て-alak kell.' }
        ]
      },
      {
        title: '〜てもいいですか', sub: 'szabad? (és a válaszok)',
        pattern: 'ige て-alak + もいいですか',
        body: 'Az engedélykérést már ismered. Az igenlő válasz: <b>ええ、いいですよ</b> vagy <b>どうぞ</b>. A tiltó válasz: <b>いいえ、いけません</b> (szabály), vagy udvariasabban a <b>〜ないでください</b>.',
        more: [
          'A kérdésre adott válaszok egy skálát alkotnak a szívélyestől a szigorúig. Engedély: <b>ええ、どうぞ</b> · <b>はい、いいですよ</b>. Puha elutasítás: <b>すみません、ちょっと…</b>. Kérés, hogy ne: <b>〜ないでください</b>. Szabályra hivatkozó tiltás: <b>いいえ、いけません</b>.',
          'A <b>〜てもいいです</b> kijelentésként engedélyt <b>ad</b>: ここで{写真|しゃしん}を{撮|と}ってもいいです (itt szabad fényképezni). A よ a végén barátságosabbá teszi.',
          'Főnévvel és melléknévvel is működik: {鉛筆|えんぴつ}でもいいですか (ceruza is jó?), {高|たか}くてもいいです (drága is lehet).'
        ],
        examples: [
          { jp: 'この{電話|でんわ}を{使|つか}ってもいいですか。', romaji: 'Kono denwa o tsukatte mo ii desu ka.', hu: 'Használhatom ezt a telefont?' },
          { jp: 'ええ、いいですよ。どうぞ。', romaji: 'Ee, ii desu yo. Dōzo.', hu: 'Persze, tessék.' },
          { jp: 'すみません、ここでは{使|つか}わないでください。', romaji: 'Sumimasen, koko de wa tsukawanaide kudasai.', hu: 'Elnézést, itt kérem, ne használja.' },
          { jp: 'ここで{写真|しゃしん}を{撮|と}ってもいいですよ。', romaji: 'Koko de shashin o totte mo ii desu yo.', hu: 'Itt nyugodtan lehet fényképezni.' },
          { jp: 'いいえ、いけません。', romaji: 'Iie, ikemasen.', hu: 'Nem, azt nem szabad.' }
        ],
        notes: ['Feljebbvalótól engedélyt kérni udvariasabb így: 〜てもよろしいですか vagy 〜てもいいでしょうか.']
      },
      {
        title: 'A は B で、C は D です', sub: 'két állítás egy mondatban',
        pattern: 'A は B で、C は D です',
        body: 'A <b>で</b> itt a です て-alakja: két főneves (vagy な-mellékneves) mondatot köt össze. Az első fél végén nem áll です, csak で.',
        more: [
          'A <b>で</b> itt a です kapcsoló (て-) alakja. Ugyanaz a で, amellyel a 9. leckében な-mellékneveket és főneveket kötöttél össze; most két teljes, főnévi állítmányú mondatot kapcsol egybe.',
          'A két tagmondat lehet egyszerű felsorolás („A ez, B meg az"), vagy ugyanarról a dologról mond két tényt: {田中|たなか}さんは{日本人|にほんじん}<b>で</b>、{医者|いしゃ}です (Tanaka japán, és orvos).',
          'Az udvariasság és az idő itt is csak a mondat végén jelenik meg.'
        ],
        tables: [
          {
            caption: 'Kapcsoló alakok összefoglalva',
            head: ['Szófaj', 'Mondat végén', 'Mondat közepén'],
            rows: [
              ['ige', 'たべます', 'たべ<b>て</b>、…'],
              ['い-mn.', 'やすいです', 'やす<b>くて</b>、…'],
              ['な-mn.', 'しずかです', 'しずか<b>で</b>、…'],
              ['főnév', 'がくせいです', 'がくせい<b>で</b>、…']
            ]
          }
        ],
        examples: [
          { jp: '{兄|あに}は{会社員|かいしゃいん}で、{姉|あね}は{学生|がくせい}です。', romaji: 'Ani wa kaishain de, ane wa gakusei desu.', hu: 'A bátyám irodai dolgozó, a nővérem diák.' },
          { jp: '{朝|あさ}ごはんは{七時|しちじ}からで、{夕|ゆう}ごはんは{六時|ろくじ}からです。', romaji: 'Asagohan wa shichiji kara de, yūgohan wa rokuji kara desu.', hu: 'A reggeli hét órától van, a vacsora hattól.' },
          { jp: 'これは{部屋|へや}の{鍵|かぎ}で、あれは{玄関|げんかん}の{鍵|かぎ}です。', romaji: 'Kore wa heya no kagi de, are wa genkan no kagi desu.', hu: 'Ez a szoba kulcsa, az pedig a bejárati ajtóé.' },
          { jp: '{部屋|へや}は{三階|さんがい}で、{食堂|しょくどう}は{一階|いっかい}です。', romaji: 'Heya wa sangai de, shokudō wa ikkai desu.', hu: 'A szoba a harmadik szinten van, az étkező a földszinten.' },
          { jp: '{田中|たなか}さんは{日本人|にほんじん}で、{医者|いしゃ}です。', romaji: 'Tanaka-san wa nihonjin de, isha desu.', hu: 'Tanaka japán, és orvos.' }
        ],
        mistakes: [
          { bad: '{兄|あに}は{会社員|かいしゃいん}です、{姉|あね}は{学生|がくせい}です。', good: '{兄|あに}は{会社員|かいしゃいん}で、{姉|あね}は{学生|がくせい}です。', why: 'Egy mondaton belül a です kapcsoló alakja で; két です vesszővel nem köthető össze.' }
        ]
      }
    ],
    phrases: [
      { jp: '{予約|よやく}をしているんですが…。', romaji: 'Yoyaku o shite iru n desu ga…', hu: 'Foglalásom van…' },
      { jp: 'チェックインをお{願|ねが}いします。', romaji: 'Chekkuin o onegai shimasu.', hu: 'Szeretnék bejelentkezni.' },
      { jp: 'チェックアウトは{何時|なんじ}までですか。', romaji: 'Chekkuauto wa nanji made desu ka.', hu: 'Meddig kell kijelentkezni?' },
      { jp: 'カードで{払|はら}ってもいいですか。', romaji: 'Kādo de haratte mo ii desu ka.', hu: 'Fizethetek kártyával?' },
      { jp: '{荷物|にもつ}を{預|あず}けることはできますか。', romaji: 'Nimotsu o azukeru koto wa dekimasu ka.', hu: 'Itt lehet hagyni megőrzésre a csomagot?' },
      { jp: 'この{漢字|かんじ}は{何|なん}と{読|よ}みますか。', romaji: 'Kono kanji wa nan to yomimasu ka.', hu: 'Hogyan kell olvasni ezt a kanjit?' },
      { jp: 'これ、もらってもいいですか。', romaji: 'Kore, moratte mo ii desu ka.', hu: 'Ezt elvihetem?', note: 'Szórólapra, térképre, menetrendre: ami ki van téve.' },
      { jp: 'お{気|き}をつけて。', romaji: 'O-ki o tsukete.', hu: 'Vigyázzon magára! Jó utat!' }
    ],
    words: [
      {
        title: 'Szálloda',
        items: [
          { jp: 'ホテル', romaji: 'hoteru', hu: 'szálloda' },
          { jp: '{旅館|りょかん}', romaji: 'ryokan', hu: 'hagyományos japán fogadó' },
          { jp: 'フロント', romaji: 'furonto', hu: 'recepció' },
          { jp: '{予約|よやく}', romaji: 'yoyaku', hu: 'foglalás' },
          { jp: '{鍵|かぎ}', romaji: 'kagi', hu: 'kulcs' },
          { jp: '{荷物|にもつ}', romaji: 'nimotsu', hu: 'csomag' },
          { jp: '{食堂|しょくどう}', romaji: 'shokudō', hu: 'étkező, étterem' },
          { jp: 'お{風呂|ふろ}', romaji: 'o-furo', hu: 'fürdő' },
          { jp: '{泊|と}まります', romaji: 'tomarimasu', hu: 'megszáll' },
          { jp: '{預|あず}けます', romaji: 'azukemasu', hu: 'megőrzésre lead' }
        ]
      },
      {
        title: 'A bejelentkező lap rovatai',
        items: [
          { jp: '{国籍|こくせき}', romaji: 'kokuseki', hu: 'állampolgárság' },
          { jp: '{年齢|ねんれい}', romaji: 'nenrei', hu: 'életkor' },
          { jp: '{連絡先|れんらくさき}', romaji: 'renrakusaki', hu: 'elérhetőség' },
          { jp: 'パスポート{番号|ばんごう}', romaji: 'pasupōto bangō', hu: 'útlevélszám' },
          { jp: '{一泊|いっぱく}', romaji: 'ippaku', hu: 'egy éjszaka' },
          { jp: '{二泊|にはく}', romaji: 'nihaku', hu: 'két éjszaka' }
        ]
      },
      {
        title: 'Szabályok igéi',
        items: [
          { jp: '{吸|す}います', romaji: 'suimasu', hu: 'szív (cigarettát)' },
          { jp: '{止|と}めます', romaji: 'tomemasu', hu: 'megállít, leparkol' },
          { jp: '{入|はい}ります', romaji: 'hairimasu', hu: 'belép' },
          { jp: '{触|さわ}ります', romaji: 'sawarimasu', hu: 'megérint' },
          { jp: '{捨|す}てます', romaji: 'sutemasu', hu: 'eldob' },
          { jp: '{払|はら}います', romaji: 'haraimasu', hu: 'fizet' },
          { jp: '{渡|わた}します', romaji: 'watashimasu', hu: 'átad' },
          { jp: '{禁止|きんし}', romaji: 'kinshi', hu: 'tilos (táblán)' }
        ]
      }
    ],
    culture: [
      {
        title: 'Szálloda, fogadó, kapszula',
        text: 'Japánban négyféle szállás közül választhatsz. A <b>ホテル</b> nyugati stílusú: ágy, saját fürdőszoba. A <b>{旅館|りょかん}</b> hagyományos fogadó: tatamis szoba, este kiterített futon, közös forró fürdő, és a vacsorát gyakran a szobában szolgálják fel. A <b>カプセルホテル</b> olcsó, emeletes fülkékből áll, ahol éppen csak aludni lehet. Fiataloknak ott az ifjúsági szálló (<b>ユースホステル</b>).'
      },
      {
        title: 'A négyes és a kilences balszerencsés',
        text: 'A japánban a <b>négy</b> egyik olvasata (し) ugyanúgy hangzik, mint a „halál" szó, a <b>kilencé</b> (く) pedig úgy, mint a „szenvedés". Ezért sok szállodában és kórházban nincs 4-es és 9-es szoba, a parkolókból is kimaradhat ez a két szám, és ajándékba nem illik négy darabot adni valamiből. A <b>nyolcas</b> viszont szerencsés: a kanjija ({八|はち}) lefelé szélesedik, mint a kiteljesedő jövő.'
      },
      {
        title: 'Köszönet előre és utólag',
        text: 'A japán a köszönetet is idő szerint ragozza. Ha valamiért <b>előre</b> vagy éppen most mondasz köszönetet, <b>ありがとうございます</b> a helyes. Ha a dolog már <b>megtörtént és lezárult</b> (segítettek, kiszolgáltak, véget ért az óra), a múlt idejű <b>ありがとうございました</b> jár. A szállodából távozva ezért az utóbbit mondod.'
      }
    ],
    quiz: [
      { q: '„Gyerekkoromban Tokióban laktam." Mi hiányzik?', jp: '{子|こ}ども＿とき、{東京|とうきょう}に{住|す}んでいました。', a: 'の', wrong: ['な', 'だ', 'に'], why: 'Főnév után: のとき.' },
      { q: '„Amikor ráérek, olvasok." Mi hiányzik?', jp: '{暇|ひま}＿とき、{本|ほん}を{読|よ}みます。', a: 'な', wrong: ['の', 'だ', 'い'], why: 'な-melléknév után: なとき.' },
      {
        q: 'Mit jelent: {日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。',
        a: 'Japánban vettem a táskát, amikor már ott voltam.',
        wrong: [
          'Az út előtt, még itthon vettem a táskát.',
          'Japánba menet elveszett a táskám.',
          'Japánban szeretnék táskát venni.'
        ],
        why: 'た-alak + とき: az odautazás már megtörtént, amikor vásároltál.'
      },
      { q: '„Itt tilos dohányozni." Mi hiányzik?', jp: 'ここでたばこを{吸|す}って＿。', a: 'はいけません', wrong: ['もいいです', 'ください', 'みます'], why: 'Tilalom: て-alak + はいけません.' },
      { q: '„A múzeumban tilos fényképezni." Mi hiányzik?', jp: '{美術館|びじゅつかん}で{写真|しゃしん}を＿はいけません。', a: '{撮|と}って', wrong: ['{撮|と}る', '{撮|と}った', '{撮|と}り'], why: 'A はいけません előtt て-alak áll.' },
      { q: '„A bátyám irodai dolgozó, a nővérem diák." Mi hiányzik?', jp: '{兄|あに}は{会社員|かいしゃいん}＿、{姉|あね}は{学生|がくせい}です。', a: 'で', wrong: ['と', 'も', 'くて'], why: 'A です て-alakja で: ez köti össze a két állítást.' },
      { q: 'Valaki megkérdezi: ここに{車|くるま}を{止|と}めてもいいですか。 Melyik válasz tiltja meg?', a: 'いいえ、{止|と}めてはいけません。', wrong: ['ええ、いいですよ。', 'はい、どうぞ。', 'いいえ、{止|と}めてもいいです。'], why: 'A tiltás: 〜てはいけません.' },
      { q: '„Amikor hideg van, kabátot veszek." Mi hiányzik?', jp: '＿とき、コートを{着|き}ます。', a: '{寒|さむ}い', wrong: ['{寒|さむ}いの', '{寒|さむ}いな', '{寒|さむ}くて'], why: 'い-melléknév közvetlenül áll a とき előtt.' },
      {
        q: 'Melyik mondat mondja azt, hogy a táskát még az út előtt vetted?',
        a: '{日本|にほん}へ{行|い}くとき、かばんを{買|か}いました。',
        wrong: [
          '{日本|にほん}へ{行|い}ったとき、かばんを{買|か}いました。',
          '{日本|にほん}へ{行|い}って、かばんを{買|か}いました。',
          '{日本|にほん}でかばんを{買|か}ったことがあります。'
        ],
        why: 'Szótári alak + とき: az utazás még nem zárult le, amikor vásároltál.'
      },
      { q: '„Ebbe a szobába tilos belépni." Mi hiányzik?', jp: 'この{部屋|へや}に＿はいけません。', a: '{入|はい}って', wrong: ['{入|はい}て', '{入|はい}いて', '{入|はい}りて'], why: 'A {入|はい}ります 1. csoportú ige: り → って.' },
      { q: '„Diákkoromban sokat utaztam." Mi hiányzik?', jp: '{学生|がくせい}＿とき、よく{旅行|りょこう}しました。', a: 'の', wrong: ['な', 'だ', 'に'], why: 'Főnév és とき közé の kerül.' },
      {
        q: 'Hazaértél, és azt mondod: ただいま。 Melyik a helyes leírás?',
        a: 'うちへ{帰|かえ}ったとき、「ただいま」と{言|い}います。',
        wrong: [
          'うちへ{帰|かえ}るとき、「ただいま」と{言|い}います。',
          'うちへ{帰|かえ}ってとき、「ただいま」と{言|い}います。',
          'うちへ{帰|かえ}りますとき、「ただいま」と{言|い}います。'
        ],
        why: 'A hazaérkezés már megtörtént, amikor megszólalsz: た-alak.'
      },
      {
        q: 'Mit jelent: {日本|にほん}へ{行|い}くとき、{空港|くうこう}でおみやげを{買|か}いました。',
        a: 'Az ajándékot még az út előtt, induláskor vettem.',
        wrong: [
          'Az ajándékot Japánban vettem, megérkezés után.',
          'Az ajándékot hazaérkezés után vettem.',
          'Ajándékot fogok venni, amikor Japánba megyek.'
        ],
        why: 'A szótári alak ({行|い}く) azt jelzi: az út akkor még nem zárult le.'
      },
      {
        q: 'Mi a különbség? 〜てはいけません ↔ 〜ないでください',
        a: 'az első szabályt mond ki, a második személyes kérés',
        wrong: ['az első udvariasabb', 'az első engedély, a második tiltás', 'nincs különbség'],
        why: 'A てはいけません általános tilalom; embernek szemtől szemben a ないでください illik.'
      },
      { q: '„Itt szabad fényképezni." Melyik a helyes?', a: 'ここで{写真|しゃしん}を{撮|と}ってもいいです。', wrong: ['ここで{写真|しゃしん}を{撮|と}ってはいけません。', 'ここで{写真|しゃしん}を{撮|と}らないでください。', 'ここで{写真|しゃしん}を{撮|と}るもいいです。'], why: 'Az engedély: て-alak + もいいです.' },
      {
        q: 'Hogyan kérdezel rá egy kanji olvasatára?',
        a: 'この{漢字|かんじ}は{何|なん}と{読|よ}みますか。',
        wrong: ['この{漢字|かんじ}は{何|なに}を{読|よ}みますか。', 'この{漢字|かんじ}はどこで{読|よ}みますか。', 'この{漢字|かんじ}はだれが{読|よ}みますか。'],
        why: 'A {何|なん}と{読|よ}みますか = „minek olvassuk?"; a と idéző partikula.'
      },
      { q: '„Tanaka japán, és orvos." Mi hiányzik?', jp: '{田中|たなか}さんは{日本人|にほんじん}＿、{医者|いしゃ}です。', a: 'で', wrong: ['と', 'くて', 'も'], why: 'A です kapcsoló alakja で.' },
      { q: 'A szállodából távozva megköszönöd a szolgáltatást. Melyik a helyes?', a: 'ありがとうございました。', wrong: ['ありがとうございます。', 'いただきます。', 'いらっしゃいませ。'], why: 'Lezárult dologért múlt időben mondunk köszönetet.' },
      {
        q: 'Miért hiányzik sok japán szállodából a 4-es szoba?',
        a: 'mert a négyes egyik olvasata (し) úgy hangzik, mint a „halál"',
        wrong: [
          'mert a négyes a császár száma',
          'mert a négyes kanjija nehéz',
          'mert négyen nem lakhatnak egy szobában'
        ],
        why: 'A 4 (し) és a 9 (く) balszerencsés számnak számít.'
      },
      { q: 'Mi a {旅館|りょかん}?', a: 'hagyományos japán fogadó tatamis szobával és futonnal', wrong: ['kapszulahotel', 'ifjúsági szálló', 'nyugati stílusú szálloda'], why: 'A {旅館|りょかん}-ban tatami, futon és közös forró fürdő vár.' }
    ]
  },

  /* ── 18. lecke ────────────────────────────────────── */
  {
    id: 'l18', no: 18, book: 'Dekiru 1', title: 'Készülődés',
    lead: 'Bizonytalan feltevést mondasz, elmondod, mi hogyan változik és mit határoztál el, repülőjegyet foglalsz, és megismered az adás-kapás tiszteleti igéit.',
    cando: [
      'Megmondod, mi fordulhat elő, és tanácsot adsz az utazónak.',
      'Elmondod, mi lett valamiből, és mit döntöttél el.',
      'Jegyet foglalsz egy utazási irodában.',
      'Tisztelettel beszélsz arról, mit adtál a tanárodnak, és mit kaptál tőle.'
    ],
    intro: [
      'A lecke három gondolatkört fog össze. Az első a <b>bizonytalanság</b>: a 〜かもしれません azt mondja, „meglehet" — gyengébb a 15. leckében tanult 〜でしょう-nál, és sokkal gyengébb a puszta kijelentésnél. A japán beszélő szívesen jelzi, mennyire biztos a dolgában; ez nem határozatlanság, hanem pontosság.',
      'A második a <b>változás</b>. A <b>なります</b> („válik valamivé") azt fejezi ki, hogy valami magától más lesz; a 〜ことにします („úgy döntök") pedig azt, hogy te hozol változást az elhatározásoddal. A なります és a します ellentétpárja végigkíséri a japán nyelvtant: ami <i>lesz</i>, és amit <i>teszünk</i>.',
      'A harmadik a <b>rang</b>. A 13. leckében megtanultad az adás-kapás három igéjét; most mindegyik megkapja a tiszteleti párját, amelyet akkor használsz, ha a másik fél feljebb áll nálad: tanár, főnök, idősebb ismerős, vendég.'
    ],
    dialogue: {
      title: 'Mikor utazzunk?',
      scene: 'Anna szülei haza szeretnék hívni Juit Magyarországra. Jui tanácsot kér Annától, aztán jegyet foglal az utazási irodában.',
      lines: [
        { who: 'Jui', jp: 'ハンガリーへ{行|い}きたいんですが、いつごろがいいと{思|おも}いますか。', romaji: 'Hangarī e ikitai n desu ga, itsu goro ga ii to omoimasu ka.', hu: 'Szeretnék elmenni Magyarországra. Szerinted mikor érdemes?' },
        {
          who: 'Anna',
          jp: '{三月|さんがつ}はまだ{寒|さむ}いかもしれません。{四月|しがつ}は{暖|あたた}かくなって、{花|はな}もきれいですよ。',
          romaji: 'Sangatsu wa mada samui kamo shiremasen. Shigatsu wa atatakaku natte, hana mo kirei desu yo.',
          hu: 'Márciusban még hideg lehet. Áprilisban melegebb lesz, és a virágok is szépek.'
        },
        { who: 'Jui', jp: 'じゃあ、{四月|しがつ}に{行|い}くことにします。{何|なに}を{着|き}て{行|い}きましょうか。', romaji: 'Jā, shigatsu ni iku koto ni shimasu. Nani o kite ikimashō ka.', hu: 'Akkor úgy döntök, hogy áprilisban megyek. Mit vegyek fel?' },
        {
          who: 'Anna',
          jp: '{寒|さむ}い{日|ひ}もあるかもしれませんから、{暖|あたた}かい{服|ふく}も{必要|ひつよう}だと{思|おも}います。',
          romaji: 'Samui hi mo aru kamo shiremasen kara, atatakai fuku mo hitsuyō da to omoimasu.',
          hu: 'Lehetnek hideg napok is, úgyhogy szerintem meleg ruha is kell.'
        },
        { who: 'Jui', jp: 'すみません、ブダペストまでのチケットを{予約|よやく}したいんですが…。', romaji: 'Sumimasen, Budapesuto made no chiketto o yoyaku shitai n desu ga…', hu: 'Elnézést, jegyet szeretnék foglalni Budapestig…' },
        { who: 'Ügyintéző', jp: 'ご{出発|しゅっぱつ}はいつですか。', romaji: 'Go-shuppatsu wa itsu desu ka.', hu: 'Mikor indulna?' },
        { who: 'Jui', jp: '{四月三日|しがつみっか}です。いちばん{安|やす}いのでお{願|ねが}いします。', romaji: 'Shigatsu mikka desu. Ichiban yasui no de onegai shimasu.', hu: 'Április harmadikán. A legolcsóbbat kérem.' },
        {
          who: 'Ügyintéző',
          jp: 'ウィーン{経由|けいゆ}ですが、よろしいですか。{往復|おうふく}で{十五万円|じゅうごまんえん}になります。',
          romaji: 'Wīn keiyu desu ga, yoroshii desu ka. Ōfuku de jūgoman-en ni narimasu.',
          hu: 'Bécsi átszállással megy; megfelel? Oda-vissza százötvenezer jen lesz.'
        },
        { who: 'Jui', jp: 'はい、それでお{願|ねが}いします。', romaji: 'Hai, sore de onegai shimasu.', hu: 'Igen, azt kérem.' },
        { who: 'Jui', jp: 'アンナさんのお{母|かあ}さんにお{土産|みやげ}をさしあげたいんですが、{何|なに}がいいでしょうか。', romaji: 'Anna-san no okāsan ni o-miyage o sashiagetai n desu ga, nani ga ii deshō ka.', hu: 'Szeretnék ajándékot vinni az édesanyádnak. Mi lenne jó?' },
        {
          who: 'Anna',
          jp: '{母|はは}は{日本|にほん}のお{茶|ちゃ}が{好|す}きです。{前|まえ}に{田中|たなか}{先生|せんせい}にいただいたお{茶|ちゃ}を、とても{喜|よろこ}んでいました。',
          romaji: 'Haha wa Nihon no o-cha ga suki desu. Mae ni Tanaka-sensei ni itadaita o-cha o, totemo yorokonde imashita.',
          hu: 'Anyám szereti a japán teát. A teának, amit korábban Tanaka tanár úrtól kaptunk, nagyon örült.'
        }
      ],
      notes: [
        'Anna tanácsa két bizonytalan mondat (<b>〜かもしれません</b>), és a javaslatot is と{思|おも}います-szal tompítja. Így ad tanácsot az, aki nem akar okoskodni.',
        'A <b>{暖|あたた}かくなって</b> a なります て-alakja: „melegebb lesz, és…". Az い-melléknév く alakja + なります = „valamilyenné válik".',
        'Az ügyintéző azt mondja: {十五万円|じゅうごまんえん}<b>になります</b>. Üzletekben, irodákban a です helyett gyakran ez áll: „(az összeg) ennyire jön ki". Udvariasabbnak hat.',
        'Jui az idősebb, számára idegen asszonynak <b>さしあげます</b>-t használ (nem あげます); Anna a tanártól kapott teáról azt mondja: <b>いただいた</b> (nem もらった). A rang dönt, nem a tárgy.',
        'A <b>ご{出発|しゅっぱつ}</b> a vevő indulása: a tiszteleti ご előtag a másik ember dolgaira kerül.'
      ]
    },
    points: [
      {
        title: '〜かもしれません', sub: 'lehet, hogy…',
        pattern: 'rövid alak + かもしれません',
        body: 'Bizonytalan lehetőséget fejez ki: „meglehet, talán". Rövid alak áll előtte; főnév és な-melléknév után közvetlenül, だ nélkül. Gyengébb, mint a 〜でしょう (valószínűleg).',
        more: [
          'A <b>かもしれません</b> szó szerint: „azt sem lehet tudni, hogy…-e". A beszélő nem állít, csak nem zárja ki a lehetőséget. Magyarul: „lehet, hogy", „meglehet", „talán".',
          'Előtte <b>rövid alak</b> áll, bármely időben és tagadva is. Főnév és な-melléknév után <b>nincs</b> だ és nincs な: {病気|びょうき}かもしれません, {暇|ひま}かもしれません.',
          'Közvetlen stílusban: <b>かもしれない</b>, még rövidebben csak <b>かも</b>: {雨|あめ}かも (lehet, hogy esik).'
        ],
        tables: [
          {
            caption: 'Mi áll a かもしれません előtt?',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['ige', 'rövid alak', 'ふる<b>かもしれません</b> · ふらない<b>かもしれません</b>'],
              ['い-mn.', 'alapalak', 'さむい<b>かもしれません</b>'],
              ['な-mn.', 'だ / な nélkül', 'ひま<b>かもしれません</b>'],
              ['főnév', 'だ nélkül', 'びょうき<b>かもしれません</b>']
            ]
          },
          {
            caption: 'A bizonyosság fokozatai',
            head: ['Alak', 'Mennyire biztos?', 'Példa'],
            rows: [
              ['〜です / 〜ます', 'biztos (tény)', 'あしたは あめです。'],
              ['〜でしょう', 'valószínű', 'あしたは あめでしょう。'],
              ['〜と おもいます', 'személyes vélemény', 'あしたは あめだと おもいます。'],
              ['〜かもしれません', 'lehetséges', 'あしたは あめかもしれません。']
            ]
          }
        ],
        examples: [
          { jp: 'あしたは{雨|あめ}が{降|ふ}るかもしれません。', romaji: 'Ashita wa ame ga furu kamo shiremasen.', hu: 'Lehet, hogy holnap esni fog.' },
          { jp: '{電車|でんしゃ}は{遅|おく}れるかもしれません。', romaji: 'Densha wa okureru kamo shiremasen.', hu: 'Lehet, hogy késik a vonat.' },
          { jp: 'あの{人|ひと}は{先生|せんせい}かもしれません。', romaji: 'Ano hito wa sensei kamo shiremasen.', hu: 'Lehet, hogy az az ember tanár.' },
          { jp: '{三月|さんがつ}はまだ{寒|さむ}いかもしれません。', romaji: 'Sangatsu wa mada samui kamo shiremasen.', hu: 'Márciusban még hideg lehet.' },
          { jp: '{田中|たなか}さんはもう{帰|かえ}ったかもしれません。', romaji: 'Tanaka-san wa mō kaetta kamo shiremasen.', hu: 'Lehet, hogy Tanaka már hazament.' }
        ],
        notes: ['A mondat elejére gyakran kerül <b>もしかしたら</b> („könnyen lehet, hogy"), ahogy a でしょう elé a たぶん.'],
        mistakes: [
          { bad: '{先生|せんせい}だかもしれません。', good: '{先生|せんせい}かもしれません。', why: 'Főnév után a かもしれません elé nem kerül だ.' },
          { bad: '{暇|ひま}なかもしれません。', good: '{暇|ひま}かもしれません。', why: 'な-melléknév után sem な, sem だ nem áll.' }
        ]
      },
      {
        title: '〜くなります・〜になります', sub: 'valamilyenné válik',
        pattern: 'い → くなります · な-melléknév / főnév + になります',
        body: 'A <b>なります</b> változást jelent: valami magától más lesz. Az い-melléknév végén い helyett <b>く</b> áll, a な-melléknév és a főnév <b>に</b>-t kap.',
        more: [
          'A <b>なります</b> azt fejezi ki, hogy valami <b>magától</b> megváltozik: nem valaki teszi olyanná, hanem olyanná lesz. A változás végállapota áll előtte.',
          'Három alak: <b>い-melléknév</b>: い → <b>く</b> + なります ({寒|さむ}<b>く</b>なります). <b>な-melléknév</b>: + <b>に</b> + なります (きれい<b>に</b>なります). <b>Főnév</b>: + <b>に</b> + なります ({医者|いしゃ}<b>に</b>なります).',
          'Az いい itt is a よい tőből ragozódik: <b>よく</b>なります (jobb lesz, megjavul).',
          'Életkorra, időpontra, árra is ez az ige: {二十歳|はたち}になりました (húszéves lettem), {春|はる}になりました (tavasz lett), {千円|せんえん}になります (ezer jen lesz).'
        ],
        tables: [
          {
            caption: 'Változás: 〜なります',
            head: ['Szófaj', 'Alak', 'Példa'],
            rows: [
              ['い-mn.', 'い → <b>く</b>', 'さむ<b>く</b> なります'],
              ['いい', '<b>よく</b>', '<b>よく</b> なります'],
              ['な-mn.', '+ <b>に</b>', 'しずか<b>に</b> なります'],
              ['főnév', '+ <b>に</b>', 'せんせい<b>に</b> なります']
            ]
          }
        ],
        examples: [
          { jp: 'だんだん{寒|さむ}くなります。', romaji: 'Dandan samuku narimasu.', hu: 'Egyre hidegebb lesz.' },
          { jp: '{日本語|にほんご}が{上手|じょうず}になりました。', romaji: 'Nihongo ga jōzu ni narimashita.', hu: 'Jobban megy már a japán.' },
          { jp: '{弟|おとうと}は{医者|いしゃ}になりました。', romaji: 'Otōto wa isha ni narimashita.', hu: 'Az öcsém orvos lett.' },
          { jp: '{四月|しがつ}は{暖|あたた}かくなります。', romaji: 'Shigatsu wa atatakaku narimasu.', hu: 'Áprilisban melegebb lesz.' },
          { jp: '{病気|びょうき}がよくなりました。', romaji: 'Byōki ga yoku narimashita.', hu: 'Meggyógyultam (jobban lett a betegségem).' },
          { jp: '{来年|らいねん}{二十歳|はたち}になります。', romaji: 'Rainen hatachi ni narimasu.', hu: 'Jövőre húszéves leszek.' }
        ],
        notes: [
          'A párja a <b>〜くします / 〜にします</b>: valaki szándékosan változtat ({部屋|へや}をきれいにします = kitakarítom a szobát). Ezt a 21. leckében tanulod.',
          'A 〜てきました / 〜ていきます alakkal a változás folyamata is kifejezhető (24. lecke).'
        ],
        mistakes: [
          { bad: '{寒|さむ}いになります。', good: '{寒|さむ}くなります。', why: 'い-melléknévnél az い helyére く kerül, に nem kell.' },
          { bad: 'きれくなります。', good: 'きれいになります。', why: 'A きれい な-melléknév: に-vel kapcsolódik.' }
        ]
      },
      {
        title: '〜く・〜に + ige', sub: 'melléknévből határozó',
        pattern: 'い → く + ige · な-melléknév + に + ige',
        body: 'Ugyanezzel a két végződéssel lesz a melléknévből határozó: „hogyan?". A {早|はや}い-ból {早|はや}く (korán, gyorsan), a きれい-ből きれいに (szépen).',
        more: [
          'Ugyanaz a két végződés, amely a なります előtt áll, a melléknévből <b>határozószót</b> csinál bármely ige előtt. い-melléknév: い → <b>く</b> ({早|はや}く, {大|おお}きく, {安|やす}く). な-melléknév: + <b>に</b> ({静|しず}かに, きれいに, {簡単|かんたん}に).',
          'A magyar <i>-an, -en, -ul, -ül</i> képzőnek felel meg: gyors → gyorsan, szép → szépen.',
          'Az いい határozói alakja <b>よく</b>: ez egyszerre jelenti azt, hogy „jól" és hogy „gyakran" (よく{分|わ}かります = jól értem; よく{行|い}きます = gyakran megyek).'
        ],
        tables: [
          {
            caption: 'Melléknévből határozó',
            head: ['Melléknév', 'Határozó', 'Példa'],
            rows: [
              ['はやい', 'はや<b>く</b>', 'はやく おきます'],
              ['おおきい', 'おおき<b>く</b>', 'おおきく かきます'],
              ['たのしい', 'たのし<b>く</b>', 'たのしく すごします'],
              ['しずか', 'しずか<b>に</b>', 'しずかに はなします'],
              ['じょうず', 'じょうず<b>に</b>', 'じょうずに うたいます']
            ]
          }
        ],
        examples: [
          { jp: '{毎朝|まいあさ}{早|はや}く{起|お}きます。', romaji: 'Maiasa hayaku okimasu.', hu: 'Minden reggel korán kelek.' },
          { jp: '{字|じ}をきれいに{書|か}いてください。', romaji: 'Ji o kirei ni kaite kudasai.', hu: 'Kérem, írja szépen a betűket.' },
          { jp: '{静|しず}かに{歩|ある}きましょう。', romaji: 'Shizuka ni arukimashō.', hu: 'Menjünk csendben.' },
          { jp: 'もう{少|すこ}し{大|おお}きく{書|か}いてください。', romaji: 'Mō sukoshi ōkiku kaite kudasai.', hu: 'Kérem, írja egy kicsit nagyobban.' },
          { jp: '{毎日|まいにち}{楽|たの}しく{過|す}ごしています。', romaji: 'Mainichi tanoshiku sugoshite imasu.', hu: 'Minden napom vidáman telik.' }
        ],
        mistakes: [
          { bad: '{早|はや}いに{起|お}きます。', good: '{早|はや}く{起|お}きます。', why: 'い-melléknévből く-vel lesz határozó.' }
        ]
      },
      {
        title: '〜ことにします', sub: 'úgy döntök, hogy…',
        pattern: 'szótári alak / ない-alak + ことにします',
        body: 'A saját elhatározásodat fejezi ki. Múlt időben (<b>ことにしました</b>) azt jelenti: a döntés már megszületett.',
        more: [
          'A <b>〜ことにします</b> a 16. leckében megismert こと-ra épül: a döntés tárgya egy cselekvés, amelyet こと főnevesít. Előtte <b>szótári alak</b> (megteszem) vagy <b>ない-alak</b> (nem teszem meg) áll.',
          'Az idő számít. <b>〜ことにします</b>: most döntök. <b>〜ことにしました</b>: már eldöntöttem. <b>〜ことにしています</b>: elhatározásból rendszeresen így teszek, ez a szokásom ({毎朝|まいあさ}{歩|ある}くことにしています).',
          'Közös döntés javaslata: <b>〜ことにしましょう</b> ({四月|しがつ}に{行|い}くことにしましょう = menjünk áprilisban).'
        ],
        tables: [
          {
            caption: 'Választás, döntés, szándék',
            head: ['Alak', 'Mit fejez ki?', 'Példa'],
            rows: [
              ['főnév + に します', 'választás dolgok közül', 'コーヒーに します。'],
              ['ige + ことに します', 'elhatározás egy cselekvésről', 'いく ことに します。'],
              ['ige + つもりです', 'meglévő szándék, terv', 'いく つもりです。']
            ]
          }
        ],
        examples: [
          { jp: '{夏休|なつやす}みに{日本|にほん}へ{行|い}くことにしました。', romaji: 'Natsuyasumi ni Nihon e iku koto ni shimashita.', hu: 'Úgy döntöttem, hogy a nyári szünetben Japánba megyek.' },
          { jp: '{今日|きょう}から{毎朝|まいあさ}{走|はし}ることにします。', romaji: 'Kyō kara maiasa hashiru koto ni shimasu.', hu: 'Elhatároztam, hogy mától minden reggel futok.' },
          { jp: 'お{酒|さけ}を{飲|の}まないことにしました。', romaji: 'Osake o nomanai koto ni shimashita.', hu: 'Úgy döntöttem, hogy nem iszom alkoholt.' },
          { jp: '{四月|しがつ}に{行|い}くことにします。', romaji: 'Shigatsu ni iku koto ni shimasu.', hu: 'Úgy döntök, hogy áprilisban megyek.' },
          { jp: '{毎朝|まいあさ}{三十分|さんじゅっぷん}{歩|ある}くことにしています。', romaji: 'Maiasa sanjuppun aruku koto ni shite imasu.', hu: 'Minden reggel fél órát gyalogolok (ezt határoztam el).' }
        ],
        notes: [
          'Ha a döntést <b>más</b> hozta (a cég, az iskola, a körülmények), a 〜ことになりました áll: {日本|にほん}へ{行|い}くことになりました (úgy alakult, hogy Japánba megyek). Ezt a 32. leckében tanulod.'
        ],
        tip: 'Főnévvel: コーヒーにします (ezt választom). Igével: {行|い}くことにします (így döntök).'
      },
      {
        title: 'さしあげます', sub: 'adok (tisztelettel)',
        pattern: 'A は B に C を さしあげます',
        body: 'Az あげます tiszteleti párja: tanárnak, főnöknek, vendégnek, idősebbnek adsz valamit.',
        more: [
          'A <b>さしあげます</b> az あげます <b>szerény</b> változata: te (vagy a te köröd) adsz valakinek, aki <b>feljebb áll</b>: tanárnak, főnöknek, idős ismerősnek, vendégnek. A szó a kapót emeli föl azzal, hogy az adót lejjebb helyezi.',
          'A szerkezet és a partikulák ugyanazok, mint az あげます-nél: adó は, kapó に, ajándék を.',
          'Vigyázat: a kapónak <b>szemtől szemben</b> ne mondd, hogy „さしあげます": úgy hat, mintha a nagylelkűségedet hangsúlyoznád. Átadáskor ezt mondd: どうぞ / つまらないものですが….'
        ],
        examples: [
          { jp: '{先生|せんせい}に{花|はな}をさしあげました。', romaji: 'Sensei ni hana o sashiagemashita.', hu: 'Virágot adtam a tanárnak.' },
          { jp: 'お{客|きゃく}さんにお{茶|ちゃ}をさしあげます。', romaji: 'Okyaku-san ni ocha o sashiagemasu.', hu: 'Teát adok a vendégnek.' },
          { jp: '{社長|しゃちょう}に{何|なに}をさしあげますか。', romaji: 'Shachō ni nani o sashiagemasu ka.', hu: 'Mit adsz az igazgatónak?' },
          { jp: 'お{客様|きゃくさま}にお{土産|みやげ}をさしあげました。', romaji: 'O-kyaku-sama ni o-miyage o sashiagemashita.', hu: 'Ajándékot adtam a vendégnek.' }
        ],
        notes: [
          'A saját családodnak (apádnak, nagymamádnak) mások előtt sima あげます jár: ők a belső körödhöz tartoznak.'
        ]
      },
      {
        title: 'くださいます・いただきます', sub: 'ad nekem · kapok (tisztelettel)',
        pattern: 'A が C を くださいます · A に C を いただきます',
        body: 'A くれます tiszteleti párja a <b>くださいます</b>, a もらいます-é az <b>いただきます</b>. A partikulák ugyanazok: aki ad, <b>が</b>-t kap a くださいます mellett, és <b>に</b>-t az いただきます mellett.',
        more: [
          'A <b>くださいます</b> a くれます tiszteleti párja: egy feljebb álló ember ad <b>nekem</b>. A <b>いただきます</b> a もらいます szerény párja: én kapok egy feljebb állótól. Az evés előtti いただきます ugyanez a szó: „alázattal elfogadom".',
          'A くださる ige ます-alakja rendhagyó: <b>くださいます</b> (nem „くださります"). Ebből ered a kérés jól ismert ください alakja is.',
          'A két mondat itt is párban áll: {先生|せんせい}<b>が</b>{本|ほん}をくださいました = {先生|せんせい}<b>に</b>{本|ほん}をいただきました.'
        ],
        tables: [
          {
            caption: 'Az adás-kapás hat igéje',
            head: ['Irány', 'Azonos szint', 'Feljebb állóval'],
            rows: [
              ['én → más', 'あげます', '<b>さしあげます</b>'],
              ['más → én', 'くれます', '<b>くださいます</b>'],
              ['én ← más (kapok)', 'もらいます', '<b>いただきます</b>']
            ]
          }
        ],
        examples: [
          { jp: '{先生|せんせい}が{本|ほん}をくださいました。', romaji: 'Sensei ga hon o kudasaimashita.', hu: 'A tanár adott nekem egy könyvet.' },
          { jp: '{先生|せんせい}に{辞書|じしょ}をいただきました。', romaji: 'Sensei ni jisho o itadakimashita.', hu: 'Szótárat kaptam a tanártól.' },
          { jp: '{部長|ぶちょう}がお{土産|みやげ}をくださいました。', romaji: 'Buchō ga omiyage o kudasaimashita.', hu: 'Az osztályvezető szuvenírt adott nekem.' },
          { jp: 'これは{先生|せんせい}にいただいたお{茶|ちゃ}です。', romaji: 'Kore wa sensei ni itadaita o-cha desu.', hu: 'Ez az a tea, amelyet a tanár úrtól kaptam.' },
          { jp: 'きれいなハンカチをくださって、ありがとうございました。', romaji: 'Kirei na hankachi o kudasatte, arigatō gozaimashita.', hu: 'Köszönöm, hogy ilyen szép zsebkendőt adott.' }
        ],
        notes: [
          'A rangot nem az életkor, hanem a <b>viszony</b> dönti el: a tanárod akkor is feljebb áll, ha fiatalabb nálad; a vevő mindig feljebb áll az eladónál.',
          'Köszönetben: 〜をくださって、ありがとうございました (köszönöm, hogy …-t adott).'
        ],
        mistakes: [
          { bad: '{先生|せんせい}が{本|ほん}をくださりました。', good: '{先生|せんせい}が{本|ほん}をくださいました。', why: 'A くださる ます-alakja rendhagyó: くださいます.' },
          { bad: '{先生|せんせい}に{本|ほん}をもらいました。', good: '{先生|せんせい}に{本|ほん}をいただきました。', why: 'Nyelvtanilag nem hiba, de tanárról szólva a szerény いただきます illik.' }
        ],
        tip: 'A くださる ます-alakja rendhagyó: くださいます (nem くださります).'
      }
    ],
    phrases: [
      { jp: 'どう{思|おも}いますか。', romaji: 'Dō omoimasu ka.', hu: 'Mit gondol? Mi a véleménye?' },
      { jp: 'いいと{思|おも}いますよ。', romaji: 'Ii to omoimasu yo.', hu: 'Szerintem jó ötlet.' },
      { jp: 'お{久|ひさ}しぶりです。', romaji: 'O-hisashiburi desu.', hu: 'Rég láttuk egymást!' },
      { jp: '{先日|せんじつ}はごちそうさまでした。', romaji: 'Senjitsu wa gochisōsama deshita.', hu: 'Köszönöm a múltkori vendéglátást.', note: 'A japánok a következő találkozáskor újra megköszönik a korábbi szívességet.' },
      { jp: 'いいえ、こちらこそ。', romaji: 'Iie, kochira koso.', hu: 'Ugyan, én tartozom köszönettel.' },
      { jp: 'ご{家族|かぞく}の{皆|みな}さんによろしく。', romaji: 'Go-kazoku no minasan ni yoroshiku.', hu: 'Üdvözlöm a családját.' },
      { jp: '{往復|おうふく}でお{願|ねが}いします。', romaji: 'Ōfuku de onegai shimasu.', hu: 'Oda-vissza kérem.', note: 'Csak oda: {片道|かたみち}で.' },
      { jp: '{楽|たの}しみですね。', romaji: 'Tanoshimi desu ne.', hu: 'De jó lesz!' }
    ],
    words: [
      {
        title: 'Utazás, repülő',
        items: [
          { jp: '{旅行|りょこう}', romaji: 'ryokō', hu: 'utazás' },
          { jp: '{空港|くうこう}', romaji: 'kūkō', hu: 'repülőtér' },
          { jp: '{飛行機|ひこうき}', romaji: 'hikōki', hu: 'repülőgép' },
          { jp: '{出発|しゅっぱつ}', romaji: 'shuppatsu', hu: 'indulás' },
          { jp: '{到着|とうちゃく}', romaji: 'tōchaku', hu: 'érkezés' },
          { jp: '{往復|おうふく}', romaji: 'ōfuku', hu: 'oda-vissza út' },
          { jp: '{片道|かたみち}', romaji: 'katamichi', hu: 'egy irány' },
          { jp: '{直行便|ちょっこうびん}', romaji: 'chokkōbin', hu: 'közvetlen járat' },
          { jp: '{乗|の}り{換|か}え', romaji: 'norikae', hu: 'átszállás' },
          { jp: '{時差|じさ}', romaji: 'jisa', hu: 'időeltolódás' },
          { jp: 'お{土産|みやげ}', romaji: 'o-miyage', hu: 'útról hozott ajándék' }
        ]
      },
      {
        title: 'Változás',
        items: [
          { jp: 'なります', romaji: 'narimasu', hu: 'válik valamivé, lesz' },
          { jp: '{始|はじ}まります', romaji: 'hajimarimasu', hu: 'elkezdődik' },
          { jp: '{終|お}わります', romaji: 'owarimasu', hu: 'véget ér' },
          { jp: 'だんだん', romaji: 'dandan', hu: 'egyre, fokozatosan' },
          { jp: '{急|きゅう}に', romaji: 'kyū ni', hu: 'hirtelen' },
          { jp: '{必要|ひつよう}', romaji: 'hitsuyō', hu: 'szükséges (な-mn.)' },
          { jp: '{明|あか}るい', romaji: 'akarui', hu: 'világos' },
          { jp: '{暗|くら}い', romaji: 'kurai', hu: 'sötét' }
        ]
      },
      {
        title: 'Évszakok',
        items: [
          { jp: '{春|はる}', romaji: 'haru', hu: 'tavasz' },
          { jp: '{夏|なつ}', romaji: 'natsu', hu: 'nyár' },
          { jp: '{秋|あき}', romaji: 'aki', hu: 'ősz' },
          { jp: '{冬|ふゆ}', romaji: 'fuyu', hu: 'tél' },
          { jp: '{季節|きせつ}', romaji: 'kisetsu', hu: 'évszak' }
        ]
      }
    ],
    culture: [
      {
        title: 'A beszélgetés váza és a bólogatás',
        text: 'Egy udvarias japán beszélgetés három részből áll: <b>köszönés</b>, aztán néhány mondat az <b>időjárásról</b>, a családról vagy a legutóbbi találkozásról, végül az <b>elköszönés</b>. A lényegre rátérni e nélkül nyersnek hat. Közben a hallgató folyamatosan visszajelez: はい, ええ, そうですか, へえ. Ez az <b>{相槌|あいづち}</b>: nem egyetértést jelent, csak azt, hogy figyel. Ha csendben hallgatsz, a japán beszélő elbizonytalanodik.'
      },
      {
        title: 'A szívességet kétszer köszönjük meg',
        text: 'Japánban a köszönet nem ér véget a helyszínen. Ha valaki megvendégelt vagy megajándékozott, a <b>következő találkozáskor</b> ezzel kezded: <b>{先日|せんじつ}はありがとうございました</b> (köszönöm a múltkorit) vagy <b>ごちそうさまでした</b>. Aki ezt elmulasztja, hálátlannak tűnik. Az útról pedig mindig viszel apró ajándékot (<b>お{土産|みやげ}</b>) azoknak, akik otthon maradtak.'
      },
      {
        title: 'Rövidítések és az idő',
        text: 'A japán szereti a hosszú szavakat két-két szótagra rövidíteni: a {関西空港|かんさいくうこう} (Kanszai repülőtér) így lesz <b>{関空|かんくう}</b>, a パーソナルコンピューター pedig <b>パソコン</b>. Japánban nincs nyári időszámítás, ezért az időeltolódás Magyarországhoz képest nyáron hét, télen nyolc óra.'
      }
    ],
    quiz: [
      { q: '„Lehet, hogy holnap esni fog." Mi hiányzik?', jp: 'あしたは{雨|あめ}が{降|ふ}る＿。', a: 'かもしれません', wrong: ['ことにします', 'になります', 'てはいけません'], why: 'Bizonytalan lehetőség: rövid alak + かもしれません.' },
      {
        q: 'Melyik mondat helyes: „Lehet, hogy az az ember tanár."',
        a: 'あの{人|ひと}は{先生|せんせい}かもしれません。',
        wrong: ['あの{人|ひと}は{先生|せんせい}だかもしれません。', 'あの{人|ひと}は{先生|せんせい}なかもしれません。', 'あの{人|ひと}は{先生|せんせい}のかもしれません。'],
        why: 'Főnév után közvetlenül áll a かもしれません, だ nélkül.'
      },
      { q: '„Egyre hidegebb lesz." Mi hiányzik?', jp: 'だんだん＿なります。', a: '{寒|さむ}く', wrong: ['{寒|さむ}い', '{寒|さむ}いに', '{寒|さむ}に'], why: 'い-melléknév + なります: い → く.' },
      { q: '„Az öcsém orvos lett." Mi hiányzik?', jp: '{弟|おとうと}は{医者|いしゃ}＿なりました。', a: 'に', wrong: ['く', 'を', 'で'], why: 'Főnév + になります.' },
      { q: '„Kérem, írja szépen a betűket." Mi hiányzik?', jp: '{字|じ}を＿{書|か}いてください。', a: 'きれいに', wrong: ['きれいく', 'きれいな', 'きれいで'], why: 'A きれい な-melléknév: határozóként きれいに.' },
      { q: '„Úgy döntöttem, hogy Japánba megyek." Mi hiányzik?', jp: '{日本|にほん}へ{行|い}く＿にしました。', a: 'こと', wrong: ['もの', 'とき', 'の'], why: 'Elhatározás: szótári alak + ことにします.' },
      {
        q: 'Mit jelent: お{酒|さけ}を{飲|の}まないことにしました。',
        a: 'Úgy döntöttem, hogy nem iszom alkoholt.',
        wrong: ['Nem szabad alkoholt innom.', 'Lehet, hogy nem iszom alkoholt.', 'Még soha nem ittam alkoholt.'],
        why: 'ない-alak + ことにしました: úgy döntöttem, hogy nem…'
      },
      { q: '„Virágot adtam a tanárnak." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}に{花|はな}を＿。', a: 'さしあげました', wrong: ['くださいました', 'いただきました', 'くれました'], why: 'Tisztelt személynek adok: さしあげます.' },
      { q: '„Szótárat kaptam a tanártól." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}に{辞書|じしょ}を＿。', a: 'いただきました', wrong: ['さしあげました', 'くださいました', 'あげました'], why: 'Tisztelt személytől kapok: いただきます.' },
      { q: 'Melyik a くれます tiszteleti párja?', a: 'くださいます', wrong: ['いただきます', 'さしあげます', 'もらいます'], why: 'くれます → くださいます · もらいます → いただきます · あげます → さしあげます.' },
      { q: 'Melyik fejezi ki a leggyengébb bizonyosságot?', a: '{雨|あめ}かもしれません。', wrong: ['{雨|あめ}です。', '{雨|あめ}でしょう。', '{雨|あめ}だと{思|おも}います。'], why: 'A かもしれません csak a lehetőséget hagyja nyitva.' },
      { q: 'Melyik a helyes?', a: '{暇|ひま}かもしれません。', wrong: ['{暇|ひま}なかもしれません。', '{暇|ひま}だかもしれません。', '{暇|ひま}いかもしれません。'], why: 'な-melléknév után a かもしれません közvetlenül áll.' },
      { q: '„Áprilisban melegebb lesz." Mi hiányzik?', jp: '{四月|しがつ}は{暖|あたた}か＿なります。', a: 'く', wrong: ['に', 'い', 'で'], why: 'い-melléknév: い → く + なります.' },
      { q: '„Csendes lett." Melyik a helyes?', a: '{静|しず}かになりました。', wrong: ['{静|しず}かくなりました。', '{静|しず}かいなりました。', '{静|しず}かでなりました。'], why: 'な-melléknév + に + なります.' },
      { q: 'Mit jelent: {病気|びょうき}がよくなりました。', a: 'Jobban lettem, meggyógyultam.', wrong: ['Gyakran vagyok beteg.', 'A betegségem rosszabbodott.', 'Jó, hogy beteg lettem.'], why: 'Az いい く-alakja よく: よくなります = jobb lesz.' },
      { q: '„Kérem, írja nagyobban." Mi hiányzik?', jp: 'もう{少|すこ}し＿{書|か}いてください。', a: '{大|おお}きく', wrong: ['{大|おお}きい', '{大|おお}きに', '{大|おお}きな'], why: 'Ige előtt a melléknév határozói alakja áll: い → く.' },
      {
        q: 'Mi a különbség? {行|い}くことにしました ↔ {行|い}くことにしています',
        a: 'az első egyszeri döntés, a második elhatározásból fakadó szokás',
        wrong: ['az első jövő, a második múlt idő', 'az elsőt más döntötte el, a másodikat én', 'nincs különbség'],
        why: 'A 〜ことにしています rendszeresen követett elhatározást jelent.'
      },
      {
        q: 'Ajándékot adsz a tanárodnak. Hogyan meséled el ezt másnak?',
        a: '{先生|せんせい}にお{土産|みやげ}をさしあげました。',
        wrong: ['{先生|せんせい}にお{土産|みやげ}をくれました。', '{先生|せんせい}にお{土産|みやげ}をいただきました。', '{先生|せんせい}がお{土産|みやげ}をさしあげました。'],
        why: 'Feljebb állónak adni: さしあげます.'
      },
      { q: 'Mi a もらいます szerény párja?', a: 'いただきます', wrong: ['くださいます', 'さしあげます', 'あげます'], why: 'Feljebb állótól kapni: いただきます.' },
      {
        q: 'Mit jelent az {相槌|あいづち}?',
        a: 'a hallgató folyamatos visszajelzése: はい, ええ, そうですか',
        wrong: ['a meghajlás neve', 'az újévi jókívánság', 'a búcsúzás formulája'],
        why: 'Az {相槌|あいづち} azt jelzi: figyelek; nem feltétlenül egyetértés.'
      }
    ]
  },

  /* ── 19. lecke ────────────────────────────────────── */
  {
    id: 'l19', no: 19, book: 'Dekiru 1', title: 'Úton',
    lead: 'Megmondod, mit kell megtenned és mit nem, elmondod, hogyan és merre mész, eligazodsz a tömegközlekedésben, és kifejezed, hogy valamiből csak ennyi van.',
    cando: [
      'Megmondod, mit kell megtenned, és mit nem kötelező.',
      'Útbaigazítást adsz és kérsz: merre, min át, hol kell leszállni.',
      'Elmagyarázod a jegyek és a közlekedés szabályait.',
      'Kifejezed, hogy valamiből csak kevés van, és ajánlasz egy nevezetességet.'
    ],
    intro: [
      'A lecke gerince a <b>kötelesség</b>: 〜なければなりません („kell") és a párja, a 〜なくてもいいです („nem kell"). A „kell" japánul hosszú és furcsán épül fel: szó szerint azt mondja, „ha nem teszem meg, az nem megy". Kettős tagadás, amelyből állítás lesz. Ha a szerkezetet egyszer megérted, a hossza már nem zavar.',
      'A másik téma a <b>mozgás</b>: hogyan mész (〜ていきます), és min haladsz át. Itt a <b>を</b> partikula új arcát ismered meg: nemcsak tárgyat jelöl, hanem azt a <b>helyet is, amelyen áthaladsz</b> ({橋|はし}を{渡|わた}ります) vagy <b>amelyet elhagysz</b> ({電車|でんしゃ}を{降|お}ります). A lecke végén összefoglaló táblázatot találsz a hely partikuláiról.',
      'Végül két apró, de fontos szó: <b>だけ</b> és <b>しか</b>. Mindkettő „csak", de a しか azt is elárulja, hogy keveselled.'
    ],
    dialogue: {
      title: 'Megérkezés Budapestre',
      scene: 'Jui megérkezett Magyarországra. Anna a pályaudvaron várja, és együtt indulnak a városba.',
      lines: [
        { who: 'Anna', jp: 'ユイさん、ようこそハンガリーへ。', romaji: 'Yui-san, yōkoso Hangarī e.', hu: 'Jui, Isten hozott Magyarországon!' },
        { who: 'Jui', jp: '{遅|おく}れて{本当|ほんとう}にすみませんでした。', romaji: 'Okurete hontō ni sumimasen deshita.', hu: 'Igazán sajnálom, hogy késtem.' },
        {
          who: 'Anna',
          jp: '{大丈夫|だいじょうぶ}です。いつもは{歩|ある}いていきますが、{今日|きょう}は{荷物|にもつ}がありますから、{地下鉄|ちかてつ}に{乗|の}っていきましょう。',
          romaji: 'Daijōbu desu. Itsumo wa aruite ikimasu ga, kyō wa nimotsu ga arimasu kara, chikatetsu ni notte ikimashō.',
          hu: 'Semmi baj. Máskor gyalog megyek, de ma csomag is van, úgyhogy menjünk metróval.'
        },
        { who: 'Jui', jp: 'この{切符|きっぷ}は{地下鉄|ちかてつ}しか{乗|の}ることができませんか。', romaji: 'Kono kippu wa chikatetsu shika noru koto ga dekimasen ka.', hu: 'Ezzel a jeggyel csak metróra lehet felszállni?' },
        {
          who: 'Anna',
          jp: 'いいえ、バスにも{乗|の}ることができますよ。でも、{乗|の}るまえに、この{機械|きかい}に{入|い}れなければなりません。',
          romaji: 'Iie, basu ni mo noru koto ga dekimasu yo. Demo, noru mae ni, kono kikai ni irenakereba narimasen.',
          hu: 'Nem, buszra is jó. De felszállás előtt be kell dugni ebbe a gépbe.'
        },
        { who: 'Jui', jp: 'あそこにいる{人|ひと}たちは？', romaji: 'Asoko ni iru hitotachi wa?', hu: 'És azok az emberek ott?' },
        { who: 'Anna', jp: '{切符|きっぷ}を{見|み}る{人|ひと}です。あの{人|ひと}たちに{切符|きっぷ}を{見|み}せなければなりません。', romaji: 'Kippu o miru hito desu. Ano hitotachi ni kippu o misenakereba narimasen.', hu: 'Ők az ellenőrök. Nekik meg kell mutatni a jegyet.' },
        {
          who: 'Jui',
          jp: 'へえ、{日本|にほん}と{違|ちが}いますね。{切符|きっぷ}を{買|か}わなくてもいい{人|ひと}もいますか。',
          romaji: 'Hee, Nihon to chigaimasu ne. Kippu o kawanakute mo ii hito mo imasu ka.',
          hu: 'Nahát, ez más, mint Japánban. Van, akinek nem kell jegyet vennie?'
        },
        { who: 'Anna', jp: 'ええ、{小|ちい}さい{子|こ}どもは{買|か}わなくてもいいです。', romaji: 'Ee, chiisai kodomo wa kawanakute mo ii desu.', hu: 'Igen, a kisgyerekeknek nem kell.' },
        { who: 'Jui', jp: 'どこで{降|お}りますか。', romaji: 'Doko de orimasu ka.', hu: 'Hol szállunk le?' },
        {
          who: 'Anna',
          jp: '{三|みっ}つ{目|め}の{駅|えき}で{地下鉄|ちかてつ}を{降|お}りて、{橋|はし}を{渡|わた}ります。そこから{五分|ごふん}だけです。',
          romaji: 'Mittsume no eki de chikatetsu o orite, hashi o watarimasu. Soko kara gofun dake desu.',
          hu: 'A harmadik megállónál leszállunk a metróról, és átmegyünk a hídon. Onnan már csak öt perc.'
        }
      ],
      notes: [
        'Anna azt mondja: いつも<b>は</b>{歩|ある}いていきますが、{今日|きょう}<b>は</b>… A két は szembeállít: máskor így, ma viszont úgy.',
        'A <b>{地下鉄|ちかてつ}しか{乗|の}ることができませんか</b> mondatban a しか tagadó igét kér: „a metrón kívül semmire nem lehet?". A válaszban a に megmarad a も előtt: バス<b>にも</b>.',
        'A <b>{三|みっ}つ{目|め}</b> („harmadik") a 〜{目|め} képzővel készül: bármely számlálós szám után sorszámnevet ad ({二|ふた}つ{目|め}の{角|かど} = a második sarok).',
        'A jármű, amelyre felszállsz, <b>に</b>-t kap ({地下鉄|ちかてつ}<b>に</b>{乗|の}ります); amelyről leszállsz, <b>を</b>-t ({地下鉄|ちかてつ}<b>を</b>{降|お}ります).',
        'Az utolsó mondatban a <b>だけ</b> jó hír: „már csak öt perc". Ugyanez しか-val panasz volna.'
      ]
    },
    points: [
      {
        title: '〜なければなりません', sub: 'kell',
        pattern: 'ない-alak: ない → なければなりません',
        body: 'Kötelességet fejez ki. A ない-alak végéről elhagyod a い-t, és jön a <b>ければなりません</b>: {行|い}かない → {行|い}かなければなりません. Szó szerint: „ha nem megyek, az nem lesz jó".',
        more: [
          'A szerkezet két részből áll: <b>〜なければ</b> („ha nem …") + <b>なりません</b> („nem megy, nem lehet"). Együtt: „ha nem teszem meg, az nem megy" = <b>meg kell tennem</b>.',
          'Képzése: vedd a ない-alakot, és a végi <b>い</b> helyére tedd: <b>ければなりません</b>. {行|い}かな<b>い</b> → {行|い}かな<b>ければなりません</b>.',
          'A kötelesség lehet szabály, törvény, körülmény vagy saját belátás. Beszédben rövidebb változatai élnek: <b>〜なきゃ</b>, <b>〜なくちゃ</b> ({行|い}かなきゃ = mennem kell).'
        ],
        tables: [
          {
            caption: 'A „kell" képzése',
            head: ['Szótári alak', 'ない-alak', '〜なければなりません'],
            rows: [
              ['いく', 'いかな<b>い</b>', 'いかな<b>ければなりません</b>'],
              ['のむ', 'のまない', 'のまなければなりません'],
              ['みせる', 'みせない', 'みせなければなりません'],
              ['する', 'しない', 'しなければなりません'],
              ['くる', 'こない', 'こなければなりません']
            ]
          }
        ],
        examples: [
          { jp: '{毎日|まいにち}{薬|くすり}を{飲|の}まなければなりません。', romaji: 'Mainichi kusuri o nomanakereba narimasen.', hu: 'Minden nap be kell vennem a gyógyszert.' },
          { jp: 'あした{早|はや}く{起|お}きなければなりません。', romaji: 'Ashita hayaku okinakereba narimasen.', hu: 'Holnap korán kell kelnem.' },
          { jp: '{七時|しちじ}までに{駅|えき}へ{行|い}かなければなりません。', romaji: 'Shichiji made ni eki e ikanakereba narimasen.', hu: 'Hét óráig az állomásra kell érnem.' },
          { jp: '{切符|きっぷ}を{見|み}せなければなりません。', romaji: 'Kippu o misenakereba narimasen.', hu: 'Meg kell mutatni a jegyet.' },
          { jp: '{宿題|しゅくだい}をしなければなりません。', romaji: 'Shukudai o shinakereba narimasen.', hu: 'Meg kell csinálnom a házi feladatot.' }
        ],
        notes: [
          'A kérdésre (〜なければなりませんか) az igenlő válasz: はい、〜てください vagy はい、〜なければなりません; a tagadó: いいえ、〜なくてもいいです.',
          'A magyar „ezt feltétlenül meg kell nézned!" típusú lelkes ajánlás <b>nem</b> ez a szerkezet: az ぜひ{見|み}てください.'
        ],
        mistakes: [
          { bad: '{行|い}きなければなりません。', good: '{行|い}かなければなりません。', why: 'A szerkezet a ない-alakból indul ({行|い}かない), nem a ます-tőből.' },
          { bad: '{行|い}かないければなりません。', good: '{行|い}かなければなりません。', why: 'A ない végi い-je leesik, és a helyére kerül a ければ.' }
        ]
      },
      {
        title: '〜なくてもいいです', sub: 'nem kell',
        pattern: 'ない-alak: ない → なくてもいいです',
        body: 'A „kell" ellentéte: nem kötelező. Szintén a ない-alakból indul: {来|こ}ない → {来|こ}なくてもいいです.',
        more: [
          'A <b>〜なくてもいいです</b> szó szerint: „ha nem teszem meg, az is jó". Azt jelenti: <b>nem kötelező</b>, megteheted, de nem muszáj.',
          'Képzése: a ない-alak végi <b>い</b> helyére <b>くてもいいです</b> kerül. Ez ugyanaz a 〜てもいい szerkezet, mint az engedélynél, csak tagadó igével.',
          'A négy alapszerkezet rendszert alkot: engedély és kötelesség, mindkettő állítva és tagadva.'
        ],
        tables: [
          {
            caption: 'Szabad, tilos, kell, nem kell',
            head: ['Jelentés', 'Szerkezet', 'Példa'],
            rows: [
              ['szabad', 'て-alak + もいいです', 'いっ<b>てもいいです</b>'],
              ['tilos', 'て-alak + はいけません', 'いっ<b>てはいけません</b>'],
              ['kell', 'ない → なければなりません', 'いか<b>なければなりません</b>'],
              ['nem kell', 'ない → なくてもいいです', 'いか<b>なくてもいいです</b>']
            ]
          }
        ],
        examples: [
          { jp: 'あしたは{来|こ}なくてもいいです。', romaji: 'Ashita wa konakute mo ii desu.', hu: 'Holnap nem kell jönnöd.' },
          { jp: '{急|いそ}がなくてもいいですよ。', romaji: 'Isoganakute mo ii desu yo.', hu: 'Nem kell sietned.' },
          { jp: '{全部|ぜんぶ}{食|た}べなくてもいいです。', romaji: 'Zenbu tabenakute mo ii desu.', hu: 'Nem kell mindet megenned.' },
          { jp: '{子|こ}どもは{切符|きっぷ}を{買|か}わなくてもいいです。', romaji: 'Kodomo wa kippu o kawanakute mo ii desu.', hu: 'A gyerekeknek nem kell jegyet venniük.' },
          { jp: '{土曜日|どようび}は{学校|がっこう}へ{行|い}かなくてもいいです。', romaji: 'Doyōbi wa gakkō e ikanakute mo ii desu.', hu: 'Szombaton nem kell iskolába menni.' }
        ],
        mistakes: [
          { bad: '{行|い}かないてもいいです。', good: '{行|い}かなくてもいいです。', why: 'A ない végi い-je くて-re vált: なくてもいい.' }
        ],
        tip: 'Ne keverd: 〜てはいけません = tilos · 〜なくてもいいです = nem kötelező.'
      },
      {
        title: '〜ていきます', sub: 'hogyan megyek',
        pattern: 'ige て-alak + いきます',
        body: 'A て-alak megmondja, <i>hogyan</i> vagy <i>mivel</i> együtt mész: gyalog, valamit víve, valakit kísérve.',
        more: [
          'A て-alak itt azt mondja meg, <b>milyen módon</b> történik a mozgás: mit csinálsz közben, vagy mit viszel magaddal. Magyarul gyakran határozói igenév: „gyalogolva megy", „sietve megy".',
          'Három gyakori fajtája: <b>hogyan</b> ({歩|ある}いていきます, {走|はし}っていきます, {乗|の}っていきます) · <b>mit viszel</b> ({持|も}っていきます = visz, {持|も}ってきます = hoz) · <b>kit viszel</b> ({連|つ}れていきます = elvisz valakit, {連|つ}れてきます = elhoz valakit).',
          'Ugyanígy működik a <b>きます</b> és a <b>かえります</b> is: {歩|ある}いてきました (gyalog jöttem), {走|はし}ってかえります (futva megyek haza).'
        ],
        tables: [
          {
            caption: 'Visz és hoz',
            head: ['', 'oda (いきます)', 'ide (きます)'],
            rows: [
              ['tárgyat', 'もって いきます — visz', 'もって きます — hoz'],
              ['embert, állatot', 'つれて いきます — elvisz', 'つれて きます — elhoz']
            ]
          }
        ],
        examples: [
          { jp: '{駅|えき}まで{歩|ある}いていきます。', romaji: 'Eki made aruite ikimasu.', hu: 'Az állomásig gyalog megyek.' },
          { jp: '{傘|かさ}を{持|も}っていきます。', romaji: 'Kasa o motte ikimasu.', hu: 'Viszek esernyőt.' },
          { jp: '{友|とも}だちを{連|つ}れていきます。', romaji: 'Tomodachi o tsurete ikimasu.', hu: 'Elviszem a barátomat is.' },
          { jp: '{地下鉄|ちかてつ}に{乗|の}っていきましょう。', romaji: 'Chikatetsu ni notte ikimashō.', hu: 'Menjünk metróval!' },
          { jp: 'パーティーにケーキを{持|も}ってきてください。', romaji: 'Pātī ni kēki o motte kite kudasai.', hu: 'Hozz tortát a bulira!' }
        ],
        notes: [
          'A japánban nincs külön „visz" és „hoz" ige: a {持|も}つ (tart, fog) + いく / くる adja a kettőt.',
          'A 〜ていきます / 〜てきます időbeli jelentéseit (fokozatos változás) a 24. leckében tanulod.'
        ]
      },
      {
        title: '〜を (útvonal)', sub: 'min át, miről le',
        pattern: 'hely + を + mozgást jelentő ige',
        body: 'Mozgást jelentő igéknél a <b>を</b> azt a helyet jelöli, amelyen áthaladsz ({道|みち}を{行|い}く, {橋|はし}を{渡|わた}る, {角|かど}を{曲|ま}がる), vagy amelyet elhagysz ({電車|でんしゃ}を{降|お}りる).',
        more: [
          'A <b>を</b>-nak a tárgy jelölésén kívül két „helyes" szerepe van mozgásigék mellett. <b>(1) Az áthaladás helye:</b> az a tér, amelyen végigmész vagy keresztülmész ({公園|こうえん}を{散歩|さんぽ}します, {橋|はし}を{渡|わた}ります, {道|みち}を{歩|ある}きます). <b>(2) Az elhagyott hely:</b> ahonnan kilépsz, leszállsz ({電車|でんしゃ}を{降|お}ります, うちを{出|で}ます, {大学|だいがく}を{卒業|そつぎょう}します).',
          'Az irányt a mozdulaton belül <b>に</b> jelöli: {角|かど}<b>を</b>{右|みぎ}<b>に</b>{曲|ま}がります (a saroknál jobbra fordulok).',
          'Itt az ideje összefoglalni a hely négy partikuláját.'
        ],
        tables: [
          {
            caption: 'A hely partikulái',
            head: ['Partikula', 'Mit jelöl?', 'Példa'],
            rows: [
              ['へ / に', 'irány, célpont', 'えき<b>へ</b> いきます'],
              ['に', 'a létezés helye', 'えき<b>に</b> います'],
              ['に', 'ahová felszállsz, belépsz', 'でんしゃ<b>に</b> のります'],
              ['で', 'a cselekvés helye', 'えき<b>で</b> まちます'],
              ['を', 'az áthaladás helye', 'はし<b>を</b> わたります'],
              ['を', 'az elhagyott hely', 'でんしゃ<b>を</b> おります'],
              ['から', 'kiindulópont', 'えき<b>から</b> あるきます'],
              ['まで', 'végpont', 'えき<b>まで</b> あるきます']
            ]
          }
        ],
        examples: [
          { jp: '{次|つぎ}の{駅|えき}で{電車|でんしゃ}を{降|お}ります。', romaji: 'Tsugi no eki de densha o orimasu.', hu: 'A következő állomáson leszállok a vonatról.' },
          { jp: 'この{道|みち}をまっすぐ{行|い}ってください。', romaji: 'Kono michi o massugu itte kudasai.', hu: 'Menjen egyenesen ezen az úton.' },
          { jp: '{二|ふた}つ{目|め}の{角|かど}を{右|みぎ}に{曲|ま}がります。', romaji: 'Futatsume no kado o migi ni magarimasu.', hu: 'A második saroknál jobbra fordulok.' },
          { jp: '{橋|はし}を{渡|わた}ります。', romaji: 'Hashi o watarimasu.', hu: 'Átmegyek a hídon.' },
          { jp: '{毎朝|まいあさ}{公園|こうえん}を{散歩|さんぽ}します。', romaji: 'Maiasa kōen o sanpo shimasu.', hu: 'Minden reggel sétálok a parkban.' },
          { jp: '{八時|はちじ}にうちを{出|で}ます。', romaji: 'Hachiji ni uchi o demasu.', hu: 'Nyolckor indulok el otthonról.' }
        ],
        notes: [
          'A {公園|こうえん}<b>で</b>{散歩|さんぽ}します is helyes: az a parkot mint helyszínt adja meg; a {公園|こうえん}<b>を</b> azt hangsúlyozza, hogy végigjárod.',
          'A {降|お}ります mellett a megálló, ahol leszállsz, <b>で</b>-t kap: {次|つぎ}の{駅|えき}<b>で</b>{電車|でんしゃ}<b>を</b>{降|お}ります.'
        ],
        mistakes: [
          { bad: '{電車|でんしゃ}を{乗|の}ります。', good: '{電車|でんしゃ}に{乗|の}ります。', why: 'Felszálláskor a jármű に-t kap; を csak leszálláskor ({降|お}ります).' },
          { bad: '{橋|はし}に{渡|わた}ります。', good: '{橋|はし}を{渡|わた}ります。', why: 'Az áthaladás helyét を jelöli.' }
        ]
      },
      {
        title: '〜だけ・〜しか', sub: 'csak',
        pattern: 'だけ + állítás · しか + tagadás',
        body: 'Mindkettő „csak", de a <b>しか</b> mindig tagadó igével áll, és azt is kifejezi, hogy keveselled. A <b>だけ</b> semleges.',
        more: [
          'A <b>だけ</b> semleges korlátozás: megmondja, hol a határ. Állító és tagadó igével is állhat, és a が, を partikula mellett vagy helyett is megjelenhet ({水|みず}<b>だけ</b>{飲|の}みます).',
          'A <b>しか</b> mindig <b>tagadó igével</b> áll, és a jelentés mégis állító: „semmi más, csak ez". Érzelmi töltése van: keveselled, sajnálod. A が és az を helyére lép; a に, で, から megmarad előtte ({日本|にほん}<b>でしか</b>{買|か}えません).',
          'A kettő nem cserélhető fel szabadon: りんご<b>だけ</b>あります = csak alma van (tény). りんご<b>しか</b>ありません = nincs más, csak alma (és ez kevés). りんご<b>だけ</b>ありません = épp csak alma nincs.'
        ],
        tables: [
          {
            caption: 'だけ vagy しか?',
            head: ['', 'だけ', 'しか'],
            rows: [
              ['az ige', 'állító vagy tagadó', '<b>mindig tagadó</b>'],
              ['hangulat', 'semleges', 'keveslő, sajnálkozó'],
              ['が, を mellett', 'állhat mellette', 'kiszorítja'],
              ['példa', 'ごふん<b>だけ</b> まちます。', 'ごふん<b>しか</b> まちません。']
            ]
          }
        ],
        examples: [
          { jp: '{千円|せんえん}だけあります。', romaji: 'Sen-en dake arimasu.', hu: 'Csak ezer jenem van.' },
          { jp: '{千円|せんえん}しかありません。', romaji: 'Sen-en shika arimasen.', hu: 'Mindössze ezer jenem van.' },
          { jp: '{日曜日|にちようび}しか{休|やす}みません。', romaji: 'Nichiyōbi shika yasumimasen.', hu: 'Csak vasárnap pihenek.' },
          { jp: 'そこから{五分|ごふん}だけです。', romaji: 'Soko kara gofun dake desu.', hu: 'Onnan már csak öt perc.' },
          { jp: '{日本語|にほんご}は{少|すこ}ししかわかりません。', romaji: 'Nihongo wa sukoshi shika wakarimasen.', hu: 'Japánul csak egy kicsit értek.' }
        ],
        mistakes: [
          { bad: '{千円|せんえん}しかあります。', good: '{千円|せんえん}しかありません。', why: 'A しか mellett az ige mindig tagadó.' },
          { bad: '{千円|せんえん}をしかありません。', good: '{千円|せんえん}しかありません。', why: 'A しか kiszorítja a を és a が partikulát.' }
        ]
      },
      {
        title: '〜は (kiemelés)', sub: 'ami azt illeti',
        pattern: 'を / が → は · に / で + は',
        body: 'A <b>は</b> szembeállít és kiemel, főleg tagadásban: „ezt éppen nem (mást talán igen)". Az を és a が helyére lép; a に, で mögé odaáll.',
        more: [
          'A <b>は</b> nemcsak témát jelöl: <b>kiemel és szembeállít</b>. Azt mondja: „ami <i>ezt</i> illeti… (másra ez nem biztos, hogy igaz)". Tagadó mondatban ez a leggyakoribb szerepe.',
          'A は a <b>が</b> és az <b>を</b> helyére lép: お{酒|さけ}<b>を</b>{飲|の}みません → お{酒|さけ}<b>は</b>{飲|の}みません. A többi partikula (に, で, と, から, へ) megmarad, és a は mögéjük áll: {土曜日|どようび}<b>には</b>, ここ<b>では</b>, {田中|たなか}さん<b>とは</b>.',
          'Kérdésben témát vált: {切符|きっぷ}<b>は</b>どこで{買|か}いますか („és a jegyet — azt hol veszem?").'
        ],
        tables: [
          {
            caption: 'A は és a többi partikula',
            head: ['Eredeti', 'Kiemelve'],
            rows: [
              ['が', '<b>は</b>'],
              ['を', '<b>は</b>'],
              ['に', 'に<b>は</b>'],
              ['で', 'で<b>は</b>'],
              ['と', 'と<b>は</b>'],
              ['から', 'から<b>は</b>']
            ]
          }
        ],
        examples: [
          { jp: 'お{酒|さけ}は{飲|の}みません。', romaji: 'Osake wa nomimasen.', hu: 'Alkoholt nem iszom.' },
          { jp: '{土曜日|どようび}には{行|い}きません。', romaji: 'Doyōbi ni wa ikimasen.', hu: 'Szombaton éppen nem megyek.' },
          { jp: 'ここでは{写真|しゃしん}を{撮|と}らないでください。', romaji: 'Koko de wa shashin o toranaide kudasai.', hu: 'Itt kérem, ne fényképezzen.' },
          { jp: '{切符|きっぷ}はどこで{買|か}いますか。', romaji: 'Kippu wa doko de kaimasu ka.', hu: 'A jegyet hol lehet megvenni?' },
          { jp: 'いつもは{歩|ある}いていきますが、{今日|きょう}はバスで{行|い}きます。', romaji: 'Itsumo wa aruite ikimasu ga, kyō wa basu de ikimasu.', hu: 'Máskor gyalog megyek, de ma busszal.' }
        ],
        notes: ['Ugyanez történik a も-val: が, を helyett も; a többi partikula után にも, でも, とも.']
      }
    ],
    phrases: [
      { jp: 'ようこそ。', romaji: 'Yōkoso.', hu: 'Isten hozott!' },
      { jp: '{今|いま}、{駅|えき}に{着|つ}きました。', romaji: 'Ima, eki ni tsukimashita.', hu: 'Most értem az állomásra.' },
      { jp: '{電車|でんしゃ}が{遅|おく}れています。', romaji: 'Densha ga okurete imasu.', hu: 'Késik a vonat.' },
      { jp: '{駅|えき}で{待|ま}っています。', romaji: 'Eki de matte imasu.', hu: 'Az állomáson várlak.' },
      { jp: 'どこで{乗|の}り{換|か}えますか。', romaji: 'Doko de norikaemasu ka.', hu: 'Hol kell átszállni?' },
      { jp: 'この{電車|でんしゃ}は{京都|きょうと}へ{行|い}きますか。', romaji: 'Kono densha wa Kyōto e ikimasu ka.', hu: 'Ez a vonat megy Kiotóba?' },
      { jp: 'まっすぐ{行|い}ってください。', romaji: 'Massugu itte kudasai.', hu: 'Menjen egyenesen.' },
      { jp: 'ぜひ{行|い}ってみてください。', romaji: 'Zehi itte mite kudasai.', hu: 'Feltétlenül menj el, nézd meg!', note: 'A ぜひ + 〜てください ajánlás és invitálás: „mindenképp".' },
      { jp: '{気|き}をつけてください。', romaji: 'Ki o tsukete kudasai.', hu: 'Kérem, vigyázzon!' }
    ],
    words: [
      {
        title: 'Az állomáson',
        items: [
          { jp: '{切符|きっぷ}', romaji: 'kippu', hu: 'jegy' },
          { jp: '{改札|かいさつ}', romaji: 'kaisatsu', hu: 'jegykapu' },
          { jp: 'ホーム', romaji: 'hōmu', hu: 'peron' },
          { jp: '{定期券|ていきけん}', romaji: 'teikiken', hu: 'bérlet' },
          { jp: '{回数券|かいすうけん}', romaji: 'kaisūken', hu: 'gyűjtőjegy' },
          { jp: '{駅弁|えきべん}', romaji: 'ekiben', hu: 'állomási ebéddoboz' },
          { jp: '{乗|の}ります', romaji: 'norimasu', hu: 'felszáll' },
          { jp: '{降|お}ります', romaji: 'orimasu', hu: 'leszáll' },
          { jp: '{乗|の}り{換|か}えます', romaji: 'norikaemasu', hu: 'átszáll' },
          { jp: '{着|つ}きます', romaji: 'tsukimasu', hu: 'megérkezik' }
        ]
      },
      {
        title: 'Útbaigazítás',
        items: [
          { jp: '{道|みち}', romaji: 'michi', hu: 'út' },
          { jp: '{角|かど}', romaji: 'kado', hu: 'sarok' },
          { jp: '{橋|はし}', romaji: 'hashi', hu: 'híd' },
          { jp: '{信号|しんごう}', romaji: 'shingō', hu: 'jelzőlámpa' },
          { jp: '{交差点|こうさてん}', romaji: 'kōsaten', hu: 'kereszteződés' },
          { jp: 'まっすぐ', romaji: 'massugu', hu: 'egyenesen' },
          { jp: '{右|みぎ}', romaji: 'migi', hu: 'jobb' },
          { jp: '{左|ひだり}', romaji: 'hidari', hu: 'bal' },
          { jp: '{曲|ま}がります', romaji: 'magarimasu', hu: 'befordul' },
          { jp: '{渡|わた}ります', romaji: 'watarimasu', hu: 'átkel' },
          { jp: '{通|とお}ります', romaji: 'tōrimasu', hu: 'áthalad' }
        ]
      }
    ],
    culture: [
      {
        title: 'A jegy végig nálad marad',
        text: 'A japán vasúton és metrón a jegyet az automata <b>kapu</b> (<b>{改札|かいさつ}</b>) ellenőrzi: belépéskor bedugod, a gép visszaadja, és <b>kilépéskor újra be kell dugnod</b>. A viteldíj a megtett távolságtól függ; ha kevesebbet fizettél, a kijáratnál a „díjkiegyenlítő" automatánál pótolhatod. Ellenőr ritkán jár: a kapu nem enged ki jegy nélkül.'
      },
      {
        title: 'Egy kártya, sok vonal',
        text: 'A japán városi közlekedést több társaság üzemelteti, ezért a jegyrendszer bonyolult: más jegy kell a metróra, más a vasútra, más a buszra. Ezt oldják fel a feltölthető kártyák (például a <b>Suica</b> és a <b>PASMO</b>): a kapunál csak odaérinted, és a díj lejön róla. Ugyanezzel a kártyával fizethetsz a kisboltban és az italautomatánál is.'
      },
      {
        title: 'Ebéd a vonaton',
        text: 'A hosszabb vonatút elmaradhatatlan része az <b>{駅弁|えきべん}</b>, az állomáson árult ebéddoboz. Minden vidéknek megvan a maga híres doboza a helyi különlegességekkel, és sokan kifejezetten ezért utaznak. A helyi vonatokon viszont nem illik enni: az csak a távolsági járatokon és a sinkanszenen szokás.'
      }
    ],
    quiz: [
      { q: '„Holnap korán kell kelnem." Mi hiányzik?', jp: 'あした{早|はや}く＿なりません。', a: '{起|お}きなければ', wrong: ['{起|お}きれば', '{起|お}きなくて', '{起|お}きないで'], why: 'ない-alak: {起|お}きない → {起|お}きなければなりません.' },
      { q: 'Hogyan mondod: „Be kell vennem (meg kell innom)."', a: '{飲|の}まなければなりません。', wrong: ['{飲|の}みなければなりません。', '{飲|の}まなくてもいいです。', '{飲|の}んではいけません。'], why: '{飲|の}まない → {飲|の}まなければなりません.' },
      { q: 'Mit jelent: {急|いそ}がなくてもいいですよ。', a: 'Nem kell sietned.', wrong: ['Nem szabad sietned.', 'Sietned kell.', 'Siethetsz.'], why: '〜なくてもいいです = nem kötelező.' },
      { q: '„Az állomásig gyalog megyek." Mi hiányzik?', jp: '{駅|えき}まで＿いきます。', a: '{歩|ある}いて', wrong: ['{歩|ある}きて', '{歩|ある}いた', '{歩|ある}く'], why: 'Hogyan megyek: て-alak + いきます; き → いて.' },
      { q: '„Leszállok a vonatról." Mi hiányzik?', jp: '{電車|でんしゃ}＿{降|お}ります。', a: 'を', wrong: ['に', 'で', 'へ'], why: 'Amit elhagysz, を-t kap: {電車|でんしゃ}を{降|お}ります.' },
      { q: '„A saroknál jobbra fordulok." Mi hiányzik?', jp: '{角|かど}を{右|みぎ}＿{曲|ま}がります。', a: 'に', wrong: ['を', 'で', 'が'], why: 'A sarok (amin áthaladsz) を, az irány に.' },
      { q: '„Mindössze ezer jenem van." Mi hiányzik?', jp: '{千円|せんえん}＿ありません。', a: 'しか', wrong: ['だけ', 'まで', 'より'], why: 'Tagadó igével a しか jelenti: „csak ennyi".' },
      { q: '„Csak ezer jenem van." Mi hiányzik?', jp: '{千円|せんえん}だけ＿。', a: 'あります', wrong: ['ありません', 'いません', 'います'], why: 'A だけ állító igével áll.' },
      { q: 'Mit jelent: お{酒|さけ}は{飲|の}みません。', a: 'Alkoholt nem iszom (mást talán igen).', wrong: ['Csak alkoholt iszom.', 'Nem szabad alkoholt inni.', 'Alkoholt is iszom.'], why: 'A は tagadásban szembeállít: éppen ezt nem.' },
      { q: '„Viszek esernyőt." Mi hiányzik?', jp: '{傘|かさ}を＿いきます。', a: '{持|も}って', wrong: ['{持|も}ちて', '{持|も}て', '{持|も}んで'], why: '{持|も}ちます → {持|も}って; て-alak + いきます.' },
      { q: 'Mi a {見|み}せます „kell" alakja?', a: '{見|み}せなければなりません', wrong: ['{見|み}せるなければなりません', '{見|み}せなくてもいいです', '{見|み}せてはいけません'], why: 'ない-alak ({見|み}せない) → い helyett ければなりません.' },
      { q: 'Azt kérdezik: あしたも{来|こ}なければなりませんか。 Nem kell jönni. Mit felelsz?', a: 'いいえ、{来|こ}なくてもいいです。', wrong: ['いいえ、{来|き}てはいけません。', 'いいえ、{来|こ}なければなりません。', 'はい、{来|こ}なくてもいいです。'], why: 'A „nem kell" a 〜なくてもいいです; a 〜てはいけません tiltás volna.' },
      {
        q: 'Mi a különbség? {行|い}ってはいけません ↔ {行|い}かなくてもいいです',
        a: 'az első: tilos menni; a második: nem kötelező menni',
        wrong: ['az első: nem kell menni; a második: tilos menni', 'mindkettő tiltás', 'mindkettő engedély'],
        why: 'A てはいけません tilalom, a なくてもいい felmentés a kötelesség alól.'
      },
      { q: 'Hogy mondod: „hoz" (tárgyat ide)?', a: '{持|も}ってきます', wrong: ['{持|も}っていきます', '{連|つ}れてきます', '{持|も}ちにきます'], why: '{持|も}つ + くる = hoz; {持|も}つ + いく = visz.' },
      { q: '„Felszállok a vonatra." Melyik partikula hiányzik?', jp: '{電車|でんしゃ}＿{乗|の}ります。', a: 'に', wrong: ['を', 'で', 'が'], why: 'Felszálláskor a jármű に-t kap.' },
      { q: '„Minden reggel sétálok a parkban (végigjárom)." Melyik partikula?', jp: '{毎朝|まいあさ}{公園|こうえん}＿{散歩|さんぽ}します。', a: 'を', wrong: ['へ', 'が', 'と'], why: 'Az áthaladás helyét を jelöli.' },
      { q: 'Melyik mondat fejezi ki, hogy kevesellem a pénzt?', a: '{千円|せんえん}しかありません。', wrong: ['{千円|せんえん}だけあります。', '{千円|せんえん}もあります。', '{千円|せんえん}はあります。'], why: 'A しか + tagadás keveslő „csak".' },
      { q: '„Szombaton éppen nem megyek." Mi hiányzik?', jp: '{土曜日|どようび}＿{行|い}きません。', a: 'には', wrong: ['はに', 'をは', 'がは'], why: 'A に megmarad, a は mögé áll: には.' },
      { q: 'Mit jelent: ぜひ{行|い}ってみてください。', a: 'Feltétlenül menj el, nézd meg!', wrong: ['Kötelező elmenned.', 'Nem kell elmenned.', 'Tilos odamenni.'], why: 'A ぜひ + 〜てください lelkes ajánlás, nem kötelesség.' },
      {
        q: 'Mit csinálsz a jeggyel egy japán metróállomáson?',
        a: 'belépéskor és kilépéskor is bedugod a kapuba',
        wrong: ['csak belépéskor mutatod fel', 'az ellenőrnek adod oda a kocsiban', 'a peronon eldobod'],
        why: 'A {改札|かいさつ} kilépéskor is kéri a jegyet: a díj a távolságtól függ.'
      }
    ]
  },

  /* ── 20. lecke ────────────────────────────────────── */
  {
    id: 'l20', no: 20, book: 'Dekiru 1', title: 'Városnézés',
    lead: 'Megkülönbözteted, hogy valaki csinál valamit, vagy az magától történik, leírod egy tárgy állapotát, vásárolsz a piacon, reklamálsz, és megnevezel ismeretlen dolgokat.',
    cando: [
      'Megkülönbözteted a tárgyas és a tárgyatlan igéket.',
      'Megmondod, mi van nyitva, bekapcsolva, eltörve.',
      'Vásárolsz a piacon, és megkérdezed, mi mire való.',
      'Udvariasan reklamálsz, és megnevezel számodra ismeretlen dolgokat.'
    ],
    intro: [
      'A magyar szívesen mondja: „kinyitottam az ajtót", „eltörtem a poharat". A japán gyakran másképp látja ugyanezt: „az ajtó kinyílt", „a pohár eltört". Ehhez a nyelvnek <b>igepárjai</b> vannak: az egyik tag <b>tárgyas</b> (valaki tesz valamit egy tárggyal), a másik <b>tárgyatlan</b> (a dolog magától változik meg). A magyarban ez a „kinyit / kinyílik", „bekapcsol / bekapcsolódik" különbsége.',
      'A párok két dologban térnek el. A <b>partikulában</b>: a tárgyas ige tárgya を-t kap, a tárgyatlan ige alanya が-t. És a <b>szemléletben</b>: a tárgyas ige megnevezi a felelőst, a tárgyatlan elhallgatja. Ezért választja a japán a tárgyatlant, amikor nem akar senkit hibáztatni — reklamációnál például így udvarias.',
      'A tárgyatlan ige + <b>ています</b> pedig az eredményt mutatja: nem azt, hogy „éppen nyílik", hanem hogy <b>nyitva van</b>. Ezzel írod le, milyen állapotban van egy tárgy.'
    ],
    dialogue: {
      title: 'A vásárcsarnokban',
      scene: 'Anna elviszi Juit a budapesti vásárcsarnokba. Jui ajándékot keres az otthoniaknak; később kiderül, hogy az egyik mézeskalács eltört.',
      lines: [
        { who: 'Jui', jp: 'わあ、{大|おお}きい{市場|いちば}ですね。あ、これ、かわいいですね。', romaji: 'Wā, ōkii ichiba desu ne. A, kore, kawaii desu ne.', hu: 'Hű, de nagy piac! Ó, ez de aranyos!' },
        { who: 'Anna', jp: 'これはメーゼシュカラーチという、はちみつのクッキーです。', romaji: 'Kore wa mēzeshukarāchi to iu, hachimitsu no kukkī desu.', hu: 'Ez a mézeskalács nevű mézes sütemény.' },
        { who: 'Jui', jp: 'いくらでしょうか。', romaji: 'Ikura deshō ka.', hu: 'Vajon mennyibe kerül?' },
        { who: 'Anna', jp: '{一|ひと}つ{二百|にひゃく}フォリントですが、{五|いつ}つで{八百|はっぴゃく}フォリントです。', romaji: 'Hitotsu nihyaku forinto desu ga, itsutsu de happyaku forinto desu.', hu: 'Darabja kétszáz forint, de ötöt nyolcszázért adnak.' },
        { who: 'Jui', jp: 'じゃあ、{五|いつ}つ{買|か}います。あの{赤|あか}い{粉|こな}は{何|なに}に{使|つか}いますか。', romaji: 'Jā, itsutsu kaimasu. Ano akai kona wa nani ni tsukaimasu ka.', hu: 'Akkor ötöt veszek. Az a piros por mire való?' },
        { who: 'Anna', jp: 'パプリカです。グヤーシュを{作|つく}るときに{使|つか}います。', romaji: 'Papurika desu. Guyāshu o tsukuru toki ni tsukaimasu.', hu: 'Az paprika. Gulyás készítésekor használjuk.' },
        {
          who: 'Jui',
          jp: 'アンナさん、ちょっと…。さっき{買|か}ったクッキーなんですが、{一枚|いちまい}{割|わ}れているんです。',
          romaji: 'Anna-san, chotto… Sakki katta kukkī na n desu ga, ichimai warete iru n desu.',
          hu: 'Anna, egy pillanat… Az előbb vett sütiről van szó: az egyik el van törve.'
        },
        { who: 'Anna', jp: 'あ、{本当|ほんとう}だ。{最初|さいしょ}から{割|わ}れていたんですか。', romaji: 'A, hontō da. Saisho kara warete ita n desu ka.', hu: 'Tényleg. Már eleve el volt törve?' },
        {
          who: 'Jui',
          jp: '{買|か}うときよく{見|み}なかったので、{最初|さいしょ}から{割|わ}れていたか、{後|あと}で{割|わ}れたか、わかりません。',
          romaji: 'Kau toki yoku minakatta node, saisho kara warete ita ka, ato de wareta ka, wakarimasen.',
          hu: 'Vásárláskor nem néztem meg jól, úgyhogy nem tudom, eleve törött volt-e, vagy később tört el.'
        },
        { who: 'Anna', jp: 'ちょっとお{店|みせ}の{人|ひと}に{聞|き}いてみますね。', romaji: 'Chotto o-mise no hito ni kiite mimasu ne.', hu: 'Megkérdezem az eladót.' },
        { who: 'Anna', jp: '{大丈夫|だいじょうぶ}です。{別|べつ}のと{取|と}り{替|か}えてもいいと{言|い}っています。', romaji: 'Daijōbu desu. Betsu no to torikaete mo ii to itte imasu.', hu: 'Rendben van. Azt mondja, kicserélheted egy másikra.' }
      ],
      notes: [
        'A <b>〜という</b> („…nak nevezett") segít megnevezni valamit, amit a másik nem ismer: メーゼシュカラーチ<b>という</b>クッキー.',
        'A <b>{何|なに}に{使|つか}いますか</b> („mire használjuk?") a cél に-jével kérdez; a válaszban 〜ときに{使|つか}います vagy 〜に{使|つか}います áll.',
        'A reklamáció nem vádol: Jui azt mondja, <b>{割|わ}れているんです</b> („el van törve"), nem azt, hogy valaki eltörte. A tárgyatlan ige elhallgatja a felelőst.',
        'A <b>{最初|さいしょ}から{割|わ}れていたか、{後|あと}で{割|わ}れたか</b> két lehetőséget állít egymás mellé か-val: „eleve törött volt-e, vagy később tört el".',
        'A <b>クッキーなんですが…</b> a reklamáció szokásos nyitánya: megnevezi a tárgyat, és a が-val jelzi, hogy probléma következik.'
      ]
    },
    points: [
      {
        title: 'Tárgyas és tárgyatlan igék', sub: 'kinyitom · kinyílik',
        pattern: 'A が B を + tárgyas ige · B が + tárgyatlan ige',
        body: 'Sok ige párban él. A <b>tárgyas</b> ige mellett valaki tesz valamit egy tárggyal (を): {開|あ}けます. A <b>tárgyatlan</b> ige mellett a dolog magától változik (が): {開|あ}きます. Gyakori párok: {閉|し}めます / {閉|し}まります, つけます / つきます, {消|け}します / {消|き}えます, {始|はじ}めます / {始|はじ}まります, {止|と}めます / {止|と}まります.',
        more: [
          'A <b>tárgyas</b> ige mellett valaki cselekszik, és a cselekvés egy tárgyra irányul: {私|わたし}<b>が</b>ドア<b>を</b>{開|あ}けます. A <b>tárgyatlan</b> ige mellett nincs cselekvő: a dolog maga az alany, és vele történik valami: ドア<b>が</b>{開|あ}きます.',
          'A pároknak nincs egyetlen képzési szabálya, de vannak <b>minták</b>. A leggyakoribb: a tárgyas <b>-eru</b>, a tárgyatlan <b>-aru</b> ({閉|し}める / {閉|し}まる, {始|はじ}める / {始|はじ}まる, {止|と}める / {止|と}まる). Másik minta: a tárgyas <b>-su</b> végű ({消|け}す / {消|き}える, {壊|こわ}す / {壊|こわ}れる, {出|だ}す / {出|で}る).',
          'A párokat <b>együtt</b> érdemes megtanulni, egy rövid mondattal: ドアを{開|あ}ける — ドアが{開|あ}く.'
        ],
        tables: [
          {
            caption: 'Tárgyas és tárgyatlan igék',
            head: ['Tárgyas (〜を)', 'Tárgyatlan (〜が)', 'Jelentés'],
            rows: [
              ['あ<b>け</b>ます', 'あ<b>き</b>ます', 'kinyit — kinyílik'],
              ['し<b>め</b>ます', 'し<b>ま</b>ります', 'becsuk — becsukódik'],
              ['つ<b>け</b>ます', 'つ<b>き</b>ます', 'bekapcsol — bekapcsolódik'],
              ['け<b>し</b>ます', 'き<b>え</b>ます', 'lekapcsol — kialszik'],
              ['こわ<b>し</b>ます', 'こわ<b>れ</b>ます', 'elront — elromlik'],
              ['わ<b>り</b>ます', 'わ<b>れ</b>ます', 'eltör — eltörik'],
              ['い<b>れ</b>ます', 'は<b>い</b>ります', 'betesz — bemegy'],
              ['だ<b>し</b>ます', 'で<b>ます</b>', 'kivesz — kijön'],
              ['はじ<b>め</b>ます', 'はじ<b>ま</b>ります', 'elkezd — elkezdődik'],
              ['と<b>め</b>ます', 'と<b>ま</b>ります', 'megállít — megáll']
            ]
          }
        ],
        examples: [
          { jp: '{私|わたし}は{窓|まど}を{開|あ}けます。', romaji: 'Watashi wa mado o akemasu.', hu: 'Kinyitom az ablakot.' },
          { jp: '{窓|まど}が{開|あ}きます。', romaji: 'Mado ga akimasu.', hu: 'Kinyílik az ablak.' },
          { jp: '{電気|でんき}を{消|け}しました。', romaji: 'Denki o keshimashita.', hu: 'Lekapcsoltam a villanyt.' },
          { jp: '{電気|でんき}が{消|き}えました。', romaji: 'Denki ga kiemashita.', hu: 'Kialudt a villany.' },
          { jp: 'ドアを{閉|し}めてください。', romaji: 'Doa o shimete kudasai.', hu: 'Kérem, csukja be az ajtót.' },
          { jp: 'ドアが{閉|し}まります。ご{注意|ちゅうい}ください。', romaji: 'Doa ga shimarimasu. Go-chūi kudasai.', hu: 'Az ajtók záródnak. Kérjük, vigyázzanak!' },
          { jp: '{授業|じゅぎょう}は{九時|くじ}に{始|はじ}まります。', romaji: 'Jugyō wa kuji ni hajimarimasu.', hu: 'Az óra kilenckor kezdődik.' }
        ],
        notes: [
          'A kérés (〜てください), a szándék (〜つもり), a vágy (〜たい) csak <b>tárgyas</b> igével értelmes: a tárgyatlan ige nem akaratlagos. ドアを{開|あ}けてください ✓ — „ドアが{開|あ}いてください" ✗.',
          'A vonaton hallod: ドアが{閉|し}まります. A bemondó nem azt mondja, „becsukom az ajtót", hanem azt, „az ajtó záródik".'
        ],
        mistakes: [
          { bad: '{窓|まど}を{開|あ}きます。', good: '{窓|まど}が{開|あ}きます。', why: 'A tárgyatlan ige mellett az, ami változik, が-t kap.' },
          { bad: '{電気|でんき}が{消|け}しました。', good: '{電気|でんき}が{消|き}えました。', why: 'Ha a villany magától aludt ki, a tárgyatlan {消|き}える kell.' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'nyitva van, be van kapcsolva',
        pattern: 'B が + tárgyatlan ige て-alak + います',
        body: 'A tárgyatlan ige + <b>ています</b> nem folyamatot jelent, hanem az eredményt: a változás megtörtént, és az állapot most is fennáll.',
        more: [
          'A 12. leckében láttad: a 〜ています pillanatnyi változást jelentő igénél az <b>eredmény fennállását</b> fejezi ki. A tárgyatlan igék szinte mind ilyenek: {開|あ}きます (kinyílik — egy pillanat), {開|あ}いています (nyitva van — állapot).',
          'Ugyanaz az alak tárgyas igével mást jelent: {窓|まど}を{開|あ}けています = (valaki) éppen nyitja az ablakot. A különbséget az ige fajtája és a partikula mutatja.',
          'Ezzel írod le, amit <b>látsz</b>: milyen állapotban van egy tárgy, egy hely, a természet. Hibás árunál, elromlott gépnél, zárt üzletnél ez a természetes forma.'
        ],
        tables: [
          {
            caption: 'Ugyanaz az alak, két jelentés',
            head: ['', 'Mondat', 'Jelentés'],
            rows: [
              ['tárgyas + ています', 'まど<b>を</b> あけています。', 'Éppen nyitja az ablakot.'],
              ['tárgyatlan + ています', 'まど<b>が</b> あいています。', 'Az ablak nyitva van.']
            ]
          },
          {
            caption: 'Állapotok',
            head: ['Japánul', 'Magyarul'],
            rows: [
              ['あいています', 'nyitva van'],
              ['しまっています', 'zárva van'],
              ['ついています', 'be van kapcsolva, ég'],
              ['きえています', 'le van kapcsolva'],
              ['こわれています', 'el van romolva'],
              ['われています', 'el van törve'],
              ['とまっています', 'áll (megállt)']
            ]
          }
        ],
        examples: [
          { jp: '{窓|まど}が{開|あ}いています。', romaji: 'Mado ga aite imasu.', hu: 'Nyitva van az ablak.' },
          { jp: '{店|みせ}が{閉|し}まっています。', romaji: 'Mise ga shimatte imasu.', hu: 'Zárva van a bolt.' },
          { jp: 'テレビがついています。', romaji: 'Terebi ga tsuite imasu.', hu: 'Be van kapcsolva a tévé.' },
          { jp: 'このコップは{割|わ}れています。', romaji: 'Kono koppu wa warete imasu.', hu: 'Ez a pohár el van törve.' },
          { jp: 'エアコンが{壊|こわ}れています。', romaji: 'Eakon ga kowarete imasu.', hu: 'Elromlott a légkondicionáló.' },
          { jp: '{電気|でんき}が{消|き}えています。', romaji: 'Denki ga kiete imasu.', hu: 'Le van kapcsolva a villany.' }
        ],
        notes: [
          'A szándékosan létrehozott állapotra más szerkezet való (tárgyas ige + てあります); ezt a 21. leckében tanulod.'
        ],
        mistakes: [
          { bad: '{店|みせ}が{閉|し}めています。', good: '{店|みせ}が{閉|し}まっています。', why: 'Állapotot a tárgyatlan ige + ています fejez ki.' }
        ]
      },
      {
        title: 'A か B か', sub: 'vagy · -e',
        pattern: 'A か B (か)',
        body: 'Két lehetőség között a <b>か</b> áll: „A vagy B". Igével és a tagadó párjával azt jelenti: „megteszem-e vagy sem".',
        more: [
          'A <b>か</b> két főnév között „vagy"-ot jelent, és a második után is állhat. A partikula (で, に, を…) az utolsó elem után következik: バス<b>か</b>{電車|でんしゃ}<b>で</b>.',
          'Tagmondatok között <b>beágyazott kérdést</b> alkot: 〜か、〜か = „…-e, vagy …-e". Előtte rövid alak áll. Ilyenkor a főmondat igéje többnyire わかりません, {知|し}りません, {決|き}めます, {聞|き}きます.',
          'Az ige és tagadó párja: {行|い}くか{行|い}かないか = megyek-e vagy sem. Rövidebben: {行|い}くかどうか (25. lecke).'
        ],
        examples: [
          { jp: 'バスか{電車|でんしゃ}で{行|い}きます。', romaji: 'Basu ka densha de ikimasu.', hu: 'Busszal vagy vonattal megyek.' },
          { jp: '{行|い}くか{行|い}かないか、まだわかりません。', romaji: 'Iku ka ikanai ka, mada wakarimasen.', hu: 'Még nem tudom, megyek-e vagy sem.' },
          { jp: 'コーヒーか{紅茶|こうちゃ}か、{決|き}めてください。', romaji: 'Kōhī ka kōcha ka, kimete kudasai.', hu: 'Döntse el: kávé vagy tea.' },
          { jp: '{最初|さいしょ}から{割|わ}れていたか、{後|あと}で{割|わ}れたか、わかりません。', romaji: 'Saisho kara warete ita ka, ato de wareta ka, wakarimasen.', hu: 'Nem tudom, eleve törött volt-e, vagy később tört el.' },
          { jp: '{土曜日|どようび}か{日曜日|にちようび}に{行|い}きましょう。', romaji: 'Doyōbi ka nichiyōbi ni ikimashō.', hu: 'Menjünk szombaton vagy vasárnap!' }
        ],
        notes: [
          'Ne keverd a mondatvégi か-val (kérdés) és a なにか típusú szavak か-jával (határozatlan): ez a か választást jelöl.'
        ]
      },
      {
        title: '〜に{使|つか}います', sub: 'mire való?',
        pattern: 'főnév + に {使|つか}います · ige szótári alak + とき(に) {使|つか}います',
        body: 'Ha egy ismeretlen tárgyról azt akarod megtudni, mire szolgál, a kérdés: <b>{何|なに}に{使|つか}いますか</b>. A <b>に</b> itt a <b>célt</b> jelöli: „mire használjuk?". A válaszban a cél főnévként áll a に előtt, vagy egy teljes helyzetet adsz meg a 17. leckében tanult とき-vel.',
        more: [
          'Ugyanez a cél-に áll más igék mellett is: {買|か}い{物|もの}<b>に</b>{便利|べんり}です (bevásárláshoz praktikus), {料理|りょうり}<b>に</b>{時間|じかん}がかかります (a főzéshez idő kell).',
          'Rokon kérdés a <b>どうやって{食|た}べますか</b> (hogyan kell enni?): az elkészítés vagy a használat módjára kérdez.'
        ],
        examples: [
          { jp: 'これは{何|なに}に{使|つか}いますか。', romaji: 'Kore wa nani ni tsukaimasu ka.', hu: 'Ez mire való?' },
          { jp: '{料理|りょうり}に{使|つか}います。', romaji: 'Ryōri ni tsukaimasu.', hu: 'Főzéshez használjuk.' },
          { jp: 'スープを{作|つく}るときに{使|つか}います。', romaji: 'Sūpu o tsukuru toki ni tsukaimasu.', hu: 'Leveskészítéskor használjuk.' },
          { jp: 'これはどうやって{食|た}べますか。', romaji: 'Kore wa dō yatte tabemasu ka.', hu: 'Ezt hogyan kell enni?' }
        ],
        tip: 'A válaszban elég a lényeg: パンにつけます (kenyérre kenjük), そのまま{食|た}べます (úgy esszük, ahogy van).'
      },
      {
        title: '〜で (összesen)', sub: 'ennyiért, ennyien, ennyi idő alatt',
        pattern: 'mennyiség + で',
        body: 'Mennyiség után a <b>で</b> a keretet adja meg: ennyi darab együtt, ennyi ember együtt, ennyi idő alatt.',
        more: [
          'A mennyiség utáni <b>で</b> az <b>egészet</b> zárja keretbe: ennyi darab együttvéve, ennyi ember együtt, ennyi idő alatt, ennyi pénzből. Magyarul többnyire nincs külön szava, vagy az „-ért", „alatt", „-an / -en" felel meg neki.',
          'Áraknál különösen hasznos: megkülönbözteti a darabárat az összárat. {一|ひと}つ{二百円|にひゃくえん}です (darabja kétszáz), {五|いつ}つ<b>で</b>{八百円|はっぴゃくえん}です (öt darab együtt nyolcszáz).'
        ],
        tables: [
          {
            caption: 'A で eddigi szerepei',
            head: ['Szerep', 'Példa'],
            rows: [
              ['eszköz', 'バス<b>で</b> いきます'],
              ['a cselekvés helye', 'えき<b>で</b> あいます'],
              ['ok', 'かぜ<b>で</b> やすみます'],
              ['anyag', 'き<b>で</b> つくります'],
              ['keret, összeg', 'みっつ<b>で</b> 500えんです · ふたり<b>で</b> いきます']
            ]
          }
        ],
        examples: [
          { jp: 'これは{三|みっ}つで{五百円|ごひゃくえん}です。', romaji: 'Kore wa mittsu de gohyaku-en desu.', hu: 'Ebből három darab ötszáz jen.' },
          { jp: '{全部|ぜんぶ}でいくらですか。', romaji: 'Zenbu de ikura desu ka.', hu: 'Összesen mennyibe kerül?' },
          { jp: '{二人|ふたり}で{行|い}きます。', romaji: 'Futari de ikimasu.', hu: 'Ketten megyünk.' },
          { jp: '{一時間|いちじかん}で{終|お}わります。', romaji: 'Ichijikan de owarimasu.', hu: 'Egy óra alatt véget ér.' },
          { jp: '{五|いつ}つで{八百|はっぴゃく}フォリントです。', romaji: 'Itsutsu de happyaku forinto desu.', hu: 'Öt darab nyolcszáz forint.' },
          { jp: 'この{本|ほん}は{三日|みっか}で{読|よ}みました。', romaji: 'Kono hon wa mikka de yomimashita.', hu: 'Ezt a könyvet három nap alatt olvastam el.' }
        ]
      },
      {
        title: 'どちらか・どちらも', sub: 'valamelyik · mindkettő',
        pattern: 'どちらか + állítás · どちらも + állítás / tagadás',
        body: 'Kettő közül: <b>どちらか</b> = az egyik, valamelyik; <b>どちらも</b> = mindkettő, tagadással egyik sem.',
        more: [
          'A <b>どちら</b> (melyik a kettő közül?) ugyanúgy kap か-t és も-t, mint a többi kérdőszó. <b>どちらか</b> = az egyik, valamelyik. <b>どちらも</b> + állítás = mindkettő; + tagadás = egyik sem.',
          'Három vagy több dolog esetén ugyanez a <b>どれ</b>-vel megy: <b>どれか</b> (valamelyik), <b>どれも</b> (mindegyik / egyik sem).'
        ],
        tables: [
          {
            caption: 'Kérdőszó + か / も',
            head: ['Kérdőszó', '+ か', '+ も (állító)', '+ も (tagadó)'],
            rows: [
              ['どちら (kettőből)', 'どちらか — az egyik', 'どちらも — mindkettő', 'どちらも — egyik sem'],
              ['どれ (többől)', 'どれか — valamelyik', 'どれも — mindegyik', 'どれも — egyik sem'],
              ['なに', 'なにか — valami', '—', 'なにも — semmi'],
              ['だれ', 'だれか — valaki', '—', 'だれも — senki']
            ]
          }
        ],
        examples: [
          { jp: 'どちらか{一|ひと}つ{選|えら}んでください。', romaji: 'Dochira ka hitotsu erande kudasai.', hu: 'Válasszon egyet a kettő közül.' },
          { jp: 'どちらもおいしいです。', romaji: 'Dochira mo oishii desu.', hu: 'Mindkettő finom.' },
          { jp: 'どちらも{好|す}きじゃありません。', romaji: 'Dochira mo suki ja arimasen.', hu: 'Egyiket sem szeretem.' },
          { jp: 'どれも{同|おな}じ{値段|ねだん}です。', romaji: 'Dore mo onaji nedan desu.', hu: 'Mindegyiknek ugyanaz az ára.' },
          { jp: 'どれか{一|ひと}つください。', romaji: 'Dore ka hitotsu kudasai.', hu: 'Kérek egyet valamelyikből.' }
        ]
      },
      {
        title: '〜という', sub: '… nevű',
        pattern: 'A という B',
        body: 'Ha a másik valószínűleg nem ismeri a nevet (vagy te nem ismered), a <b>という</b> kapcsolja a nevet a főnévhez: „egy A nevű B".',
        more: [
          'A <b>〜という</b> szó szerint: „…-nak mondott". A név áll elöl, a fajtát jelölő főnév hátul: メーゼシュカラーチ<b>という</b>クッキー. Akkor használod, ha a nevet a másik (vagy te magad) <b>nem ismeri</b>.',
          'Ismert névnél nincs rá szükség: {東京|とうきょう}は{大|おお}きい{町|まち}です. Ha viszont azt mondod: {東京|とうきょう}<b>という</b>{町|まち}, azzal jelzed: „egy Tokió nevű város" — feltételezed, hogy a másik nem hallott róla.',
          'Rákérdezés: <b>{何|なん}という</b> + főnév (mi a neve ennek a …?). Önálló mondatként: これは{日本語|にほんご}で{何|なん}と{言|い}いますか (hogy mondják ezt japánul?).'
        ],
        examples: [
          { jp: '「さくら」というレストランを{知|し}っていますか。', romaji: '"Sakura" to iu resutoran o shitte imasu ka.', hu: 'Ismered a Szakura nevű éttermet?' },
          { jp: 'これは{何|なん}という{花|はな}ですか。', romaji: 'Kore wa nan to iu hana desu ka.', hu: 'Mi a neve ennek a virágnak?' },
          { jp: '{田中|たなか}さんという{人|ひと}から{電話|でんわ}がありました。', romaji: 'Tanaka-san to iu hito kara denwa ga arimashita.', hu: 'Egy Tanaka nevű ember telefonált.' },
          { jp: 'これはメーゼシュカラーチというクッキーです。', romaji: 'Kore wa mēzeshukarāchi to iu kukkī desu.', hu: 'Ez a mézeskalács nevű sütemény.' },
          { jp: 'これは{日本語|にほんご}で{何|なん}と{言|い}いますか。', romaji: 'Kore wa nihongo de nan to iimasu ka.', hu: 'Hogy mondják ezt japánul?' }
        ],
        notes: ['Beszédben a という helyett gyakran っていう hangzik: {田中|たなか}さんっていう{人|ひと}.']
      }
    ],
    phrases: [
      { jp: 'これ、かわいいですね。', romaji: 'Kore, kawaii desu ne.', hu: 'Ez de aranyos!' },
      { jp: 'どう{違|ちが}いますか。', romaji: 'Dō chigaimasu ka.', hu: 'Miben különböznek?' },
      { jp: '{半分|はんぶん}でもいいですか。', romaji: 'Hanbun demo ii desu ka.', hu: 'A felét is megvehetem?' },
      { jp: 'これ、{着|き}てみてもいいですか。', romaji: 'Kore, kite mite mo ii desu ka.', hu: 'Ezt felpróbálhatom?' },
      { jp: 'さっき{買|か}ったんですが…。', romaji: 'Sakki katta n desu ga…', hu: 'Az előbb vettem, de…', note: 'A reklamáció nyitánya; a baj megnevezése ezután jön.' },
      { jp: '{取|と}り{替|か}えてもらえますか。', romaji: 'Torikaete moraemasu ka.', hu: 'Ki tudná cserélni?' },
      { jp: '{壊|こわ}れているんです。', romaji: 'Kowarete iru n desu.', hu: 'El van romolva.' },
      { jp: 'よく{見|み}て{選|えら}んでください。', romaji: 'Yoku mite erande kudasai.', hu: 'Nézze meg jól, és válasszon!' }
    ],
    words: [
      {
        title: 'Igepárok: tárgyas — tárgyatlan',
        note: 'Az első alak mellett を, a második mellett が áll.',
        items: [
          { jp: '{開|あ}けます — {開|あ}きます', romaji: 'akemasu — akimasu', hu: 'kinyit — kinyílik', say: 'あけます、あきます' },
          { jp: '{閉|し}めます — {閉|し}まります', romaji: 'shimemasu — shimarimasu', hu: 'becsuk — becsukódik', say: 'しめます、しまります' },
          { jp: 'つけます — つきます', romaji: 'tsukemasu — tsukimasu', hu: 'bekapcsol — bekapcsolódik', say: 'つけます、つきます' },
          { jp: '{消|け}します — {消|き}えます', romaji: 'keshimasu — kiemasu', hu: 'lekapcsol — kialszik', say: 'けします、きえます' },
          { jp: '{壊|こわ}します — {壊|こわ}れます', romaji: 'kowashimasu — kowaremasu', hu: 'elront — elromlik', say: 'こわします、こわれます' },
          { jp: '{割|わ}ります — {割|わ}れます', romaji: 'warimasu — waremasu', hu: 'eltör — eltörik', say: 'わります、われます' },
          { jp: '{入|い}れます — {入|はい}ります', romaji: 'iremasu — hairimasu', hu: 'betesz — bemegy', say: 'いれます、はいります' },
          { jp: '{出|だ}します — {出|で}ます', romaji: 'dashimasu — demasu', hu: 'kivesz — kijön', say: 'だします、でます' },
          { jp: '{始|はじ}めます — {始|はじ}まります', romaji: 'hajimemasu — hajimarimasu', hu: 'elkezd — elkezdődik', say: 'はじめます、はじまります' },
          { jp: '{止|と}めます — {止|と}まります', romaji: 'tomemasu — tomarimasu', hu: 'megállít — megáll', say: 'とめます、とまります' }
        ]
      },
      {
        title: 'Ha baj van az áruval',
        items: [
          { jp: '{破|やぶ}れています', romaji: 'yaburete imasu', hu: 'el van szakadva' },
          { jp: '{汚|よご}れています', romaji: 'yogorete imasu', hu: 'piszkos' },
          { jp: '{折|お}れています', romaji: 'orete imasu', hu: 'el van törve (hosszú tárgy)' },
          { jp: '{穴|あな}が{開|あ}いています', romaji: 'ana ga aite imasu', hu: 'lyukas' },
          { jp: 'きずがついています', romaji: 'kizu ga tsuite imasu', hu: 'karcos, sérült' },
          { jp: 'ひびが{入|はい}っています', romaji: 'hibi ga haitte imasu', hu: 'megrepedt' }
        ]
      },
      {
        title: 'A piacon',
        items: [
          { jp: '{市場|いちば}', romaji: 'ichiba', hu: 'piac' },
          { jp: '{値段|ねだん}', romaji: 'nedan', hu: 'ár' },
          { jp: 'はちみつ', romaji: 'hachimitsu', hu: 'méz' },
          { jp: 'お{土産|みやげ}', romaji: 'o-miyage', hu: 'ajándék (útról)' },
          { jp: '{選|えら}びます', romaji: 'erabimasu', hu: 'kiválaszt' },
          { jp: '{取|と}り{替|か}えます', romaji: 'torikaemasu', hu: 'kicserél' },
          { jp: '{違|ちが}います', romaji: 'chigaimasu', hu: 'különbözik; nem úgy van' }
        ]
      }
    ],
    culture: [
      {
        title: 'Miért „eltört", és miért nem „eltörtem"?',
        text: 'A japán beszélő szívesebben írja le, <b>mi történt</b>, mint azt, <b>ki tette</b>. Ha elejtesz egy tányért, a természetes mondat: お{皿|さら}が{割|わ}れました („a tányér eltört") — a felelősséget a bocsánatkérés fejezi ki, nem az ige. Ugyanígy hibás árunál sem azt mondod, hogy „önök rosszat adtak", hanem azt, hogy „el van romolva". Ez nem kibúvó, hanem tapintat: a helyzetet nevezi meg, nem a bűnöst.'
      },
      {
        title: 'Ki köszön kinek?',
        text: 'Magyarországon köszönünk, ha belépünk egy boltba, a liftbe, a lépcsőházba, ismeretleneknek is. Japánban az ismerősök, szomszédok, kollégák sokat köszönnek egymásnak, de <b>ismeretlenek alig</b>. A boltban az eladó hangosan köszönt (いらっしゃいませ), a vevő viszont nem válaszol. Ez nem udvariatlanság: a két szerep más.'
      },
      {
        title: 'Reklamálni csendesen',
        text: 'A japán boltban a reklamáció halkan, szinte bocsánatkérő hangon kezdődik: すみません、さっき{買|か}ったんですが…, és a vevő csak leírja a hibát. Az eladó többnyire azonnal elnézést kér ({申|もう}し{訳|わけ}ございません), és cserét vagy visszatérítést ajánl. Felemelt hang, követelés ritka; aki így tesz, önmagát hozza kínos helyzetbe.'
      }
    ],
    quiz: [
      { q: '„Kinyitom az ablakot." Mi hiányzik?', jp: '{窓|まど}＿{開|あ}けます。', a: 'を', wrong: ['が', 'に', 'で'], why: 'A {開|あ}けます tárgyas ige: a tárgya を-t kap.' },
      { q: '„Kinyílik az ablak." Mi hiányzik?', jp: '{窓|まど}＿{開|あ}きます。', a: 'が', wrong: ['を', 'に', 'で'], why: 'A {開|あ}きます tárgyatlan: ami változik, が-t kap.' },
      { q: 'Melyik ige tárgyatlan (magától történik)?', a: '{消|き}える', wrong: ['{消|け}す', '{開|あ}ける', '{閉|し}める'], why: '{消|け}す = lekapcsol, {消|き}える = kialszik.' },
      { q: '„Zárva van a bolt." Mi hiányzik?', jp: '{店|みせ}が＿います。', a: '{閉|し}まって', wrong: ['{閉|し}めて', '{閉|し}まり', '{閉|し}まった'], why: 'Állapot: tárgyatlan ige ({閉|し}まります) て-alakja + います.' },
      { q: 'Mit jelent: テレビがついています。', a: 'Be van kapcsolva a tévé.', wrong: ['Bekapcsolom a tévét.', 'Elromlott a tévé.', 'Ki van kapcsolva a tévé.'], why: 'Tárgyatlan ige + ています: fennálló állapot.' },
      { q: '„Busszal vagy vonattal megyek." Mi hiányzik?', jp: 'バス＿{電車|でんしゃ}で{行|い}きます。', a: 'か', wrong: ['と', 'も', 'を'], why: 'A か B = A vagy B.' },
      { q: '„Ebből három darab ötszáz jen." Mi hiányzik?', jp: 'これは{三|みっ}つ＿{五百円|ごひゃくえん}です。', a: 'で', wrong: ['に', 'を', 'が'], why: 'Mennyiség + で: ennyi együtt.' },
      { q: '„Mindkettő finom." Mi hiányzik?', jp: '＿おいしいです。', a: 'どちらも', wrong: ['どちらか', 'どちらが', 'どれか'], why: 'どちらも = mindkettő.' },
      { q: '„Mi a neve ennek a virágnak?" Mi hiányzik?', jp: 'これは{何|なん}＿{花|はな}ですか。', a: 'という', wrong: ['といい', 'とか', 'のと'], why: 'A という B: „A nevű B".' },
      { q: 'Melyik mondat jelenti: „Lekapcsoltam a villanyt."', a: '{電気|でんき}を{消|け}しました。', wrong: ['{電気|でんき}が{消|き}えました。', '{電気|でんき}が{消|き}えています。', '{電気|でんき}をつけました。'], why: 'Én tettem: tárgyas ige ({消|け}します) を-val.' },
      { q: '„Kialudt a villany." (magától) Melyik a helyes?', a: '{電気|でんき}が{消|き}えました。', wrong: ['{電気|でんき}を{消|け}しました。', '{電気|でんき}が{消|け}しました。', '{電気|でんき}を{消|き}えました。'], why: 'Magától történt: tárgyatlan ige ({消|き}える) + が.' },
      { q: 'Melyik ige tárgyas (valaki csinálja)?', a: '{閉|し}めます', wrong: ['{閉|し}まります', '{開|あ}きます', '{始|はじ}まります'], why: 'A {閉|し}めます mellett tárgy áll: ドアを{閉|し}めます.' },
      { q: 'Mit jelent: {窓|まど}が{開|あ}いています。', a: 'Az ablak nyitva van.', wrong: ['Valaki éppen nyitja az ablakot.', 'Az ablak ki fog nyílni.', 'Nyisd ki az ablakot!'], why: 'Tárgyatlan ige + ています = fennálló állapot.' },
      { q: 'Melyik mondat helyes kérésként?', a: 'ドアを{開|あ}けてください。', wrong: ['ドアが{開|あ}いてください。', 'ドアを{開|あ}いてください。', 'ドアが{開|あ}けてください。'], why: 'Kérni csak akaratlagos (tárgyas) cselekvést lehet.' },
      { q: 'Hibás árut vettél. Melyik a legtermészetesebb?', a: 'すみません、これ、{壊|こわ}れているんですが…。', wrong: ['あなたがこれを{壊|こわ}しました。', 'これを{壊|こわ}してください。', 'これは{壊|こわ}しています。'], why: 'A reklamáció a helyzetet írja le tárgyatlan igével, nem vádol.' },
      { q: '„Öt darab nyolcszáz forint." Mi hiányzik?', jp: '{五|いつ}つ＿{八百|はっぴゃく}フォリントです。', a: 'で', wrong: ['に', 'を', 'が'], why: 'A mennyiség utáni で az összeget, a keretet adja meg.' },
      { q: 'Mit jelent: どれも{好|す}きじゃありません。', a: 'Egyiket sem szeretem.', wrong: ['Mindegyiket szeretem.', 'Valamelyiket szeretem.', 'Melyiket szereted?'], why: 'どれも + tagadás = „egyik sem".' },
      {
        q: 'Egy ismeretlen konyhai eszközt látsz. Hogyan kérdezed meg, mire való?',
        a: 'これは{何|なに}に{使|つか}いますか。',
        wrong: ['これは{何|なに}を{使|つか}いますか。', 'これは{何|なに}が{使|つか}いますか。', 'これは{何|なに}で{使|つか}いますか。'],
        why: 'A cél に-jével kérdezel: „mire használjuk?".'
      },
      {
        q: 'Mikor használod a 〜という szerkezetet?',
        a: 'ha a nevet a másik (vagy te) valószínűleg nem ismeri',
        wrong: ['ha valaki idézetet mond', 'ha a név nagyon híres', 'csak emberek nevénél'],
        why: 'A という ismeretlen nevet kapcsol a fajtát jelölő főnévhez.'
      },
      {
        q: 'A japán vonaton ezt hallod: ドアが{閉|し}まります。 Mit jelent?',
        a: 'Az ajtók záródnak.',
        wrong: ['Csukja be az ajtót!', 'Az ajtó zárva van.', 'Ki fogom nyitni az ajtót.'],
        why: 'Tárgyatlan ige jelen időben: a változás most következik be.'
      }
    ]
  },

  /* ── 21. lecke ────────────────────────────────────── */
  {
    id: 'l21', no: 21, book: 'Dekiru 1', title: 'Minden készen áll',
    lead: 'Megmondod, mit milyenné teszel, leírod, mi van szándékosan előkészítve, megnevezel dolgokat, visszaadod, amit más mondott, és végigvezetsz valakit egy bemutatón.',
    cando: [
      'Megkérsz valakit, hogy tegyen valamit halkabbá, világosabbá, rövidebbé.',
      'Leírod, mi van előkészítve egy teremben, és mi van kiírva.',
      'Megmondod, minek hívnak valamit, és megkérdezed egy szó jelentését.',
      'Visszaadod, amit más mondott vagy kérdezett.'
    ],
    intro: [
      'A 18. leckében megtanultad, hogyan <b>lesz</b> valami valamilyen: {寒|さむ}くなります, {元気|げんき}になります. Ott a változás magától történt. Ebben a leckében a párját tanulod meg: valaki <b>szándékosan megváltoztat</b> valamit — lehalkítja a tévét, rendbe teszi a szobát, félbevágja a tortát. Az ige a なります helyett します, a kapcsolódás ugyanaz.',
      'A második téma az <b>előkészített állapot</b>. A 20. leckében a tárgyatlan ige + ています alakkal azt írtad le, amit látsz: nyitva van az ajtó. Most azt is ki tudod fejezni, hogy valaki <b>okkal, szándékosan</b> hagyta így: a tárgyas ige て-alakja után あります áll. Egy feldíszített terem, egy megterített asztal, egy kiírt név — mind 〜てあります.',
      'A harmadik téma az <b>idézés</b>. A と partikula azt jelöli meg, amit mondanak, kérdeznek, írnak, vagy aminek neveznek valamit. Ezzel mondod meg, minek hívnak egy tárgyat, hogyan mondanak valamit japánul, és mit mondott a tanárod. A lecke helyzete egy iskolai bemutató: közben megtanulod, hogyan vezetsz végig valakit lépésről lépésre egy műveleten.'
    ],
    dialogue: {
      title: 'Japán nap az iskolában',
      scene: 'Anna iskolájában japán napot tartanak. Jui origamit fog tanítani az osztálynak; Anna megmutatja neki az előkészített termet.',
      lines: [
        { who: 'Anna', jp: '{教室|きょうしつ}はここです。もう{準備|じゅんび}がしてありますよ。', romaji: 'Kyōshitsu wa koko desu. Mō junbi ga shite arimasu yo.', hu: 'Ez a terem. Már minden elő van készítve.' },
        { who: 'Jui', jp: 'わあ、{壁|かべ}に{日本|にほん}の{写真|しゃしん}がたくさんはってありますね。', romaji: 'Wā, kabe ni Nihon no shashin ga takusan hatte arimasu ne.', hu: 'Hű, a falra rengeteg japán fénykép van kitéve!' },
        { who: 'Anna', jp: 'ええ。{黒板|こくばん}には「ようこそ」と{書|か}いてあります。', romaji: 'Ē. Kokuban ni wa "yōkoso" to kaite arimasu.', hu: 'Igen. A táblára pedig az van írva: „Isten hozott".' },
        { who: 'Jui', jp: '{机|つくえ}の{上|うえ}に{置|お}いてある{紙|かみ}は{何|なん}ですか。', romaji: 'Tsukue no ue ni oite aru kami wa nan desu ka.', hu: 'Mi az a papír, ami a padokra van téve?' },
        { who: 'Anna', jp: '{折|お}り{紙|がみ}です。{先生|せんせい}が「{一人|ひとり}{三枚|さんまい}です」と{言|い}いました。', romaji: 'Origami desu. Sensei ga "hitori sanmai desu" to iimashita.', hu: 'Origamipapír. A tanár azt mondta: „Fejenként három lap."' },
        { who: 'Jui', jp: '「オリガミ」って、ハンガリー{語|ご}で{何|なん}といいますか。', romaji: '"Origami" tte, Hangarī-go de nan to iimasu ka.', hu: 'Az „origamit" hogy mondják magyarul?' },
        { who: 'Anna', jp: 'ハンガリー{語|ご}でも「オリガミ」といいます。{同|おな}じですよ。', romaji: 'Hangarī-go demo "origami" to iimasu. Onaji desu yo.', hu: 'Magyarul is origaminak mondjuk. Ugyanaz.' },
        { who: 'Jui', jp: 'そうですか。じゃあ、{始|はじ}めましょうか。ちょっと{暗|くら}いですね。', romaji: 'Sō desu ka. Jā, hajimemashō ka. Chotto kurai desu ne.', hu: 'Tényleg? Akkor kezdjük? Egy kicsit sötét van.' },
        {
          who: 'Anna',
          jp: '{電気|でんき}をつけて、{明|あか}るくしますね。みなさん、{静|しず}かにしてください。',
          romaji: 'Denki o tsukete, akaruku shimasu ne. Mina-san, shizuka ni shite kudasai.',
          hu: 'Felkapcsolom a villanyt, hogy világosabb legyen. Figyelem, maradjatok csendben!'
        },
        {
          who: 'Jui',
          jp: 'まず、{紙|かみ}を{三角|さんかく}にします。{次|つぎ}に、もう{少|すこ}し{小|ちい}さくします。',
          romaji: 'Mazu, kami o sankaku ni shimasu. Tsugi ni, mō sukoshi chiisaku shimasu.',
          hu: 'Először háromszöget hajtunk a papírból. Utána még egy kicsit kisebbre hajtjuk.'
        },
        {
          who: 'Jui',
          jp: '{最後|さいご}に、ここを{開|ひら}きます。はい、できました。これは「つる」といいます。',
          romaji: 'Saigo ni, koko o hirakimasu. Hai, dekimashita. Kore wa "tsuru" to iimasu.',
          hu: 'Végül itt szétnyitjuk. Tessék, kész! Ezt úgy hívják: curu, vagyis daru.'
        }
      ],
      notes: [
        'A <b>{準備|じゅんび}がしてあります</b> a します て-alakjából készült: „az előkészület meg van téve", vagyis minden készen áll.',
        'A <b>{置|お}いてある{紙|かみ}</b> jelzős szerkezet: a てあります rövid alakja (てある) a főnév elé kerül — „a padra tett papír".',
        'A <b>「…」と{書|か}いてあります</b> két mai mintát kapcsol össze: az idéző と megmondja, <i>mi</i> áll a táblán, a てあります pedig azt, hogy valaki odaírta.',
        'A <b>って</b> a beszélt nyelv idézője: 「オリガミ」って = 「オリガミ」というのは. Jui egy szóra kérdez rá vele.',
        'Jui a bemutatót <b>まず</b> (először), <b>{次|つぎ}に</b> (utána), <b>{最後|さいご}に</b> (végül) szavakkal tagolja. Hosszabb műveletnél közéjük kerül a <b>それから</b> (azután) is.',
        'A <b>{静|しず}かにしてください</b> szó szerint „tegyétek csendessé": な-melléknév + にします, kérés alakban.'
      ]
    },
    points: [
      {
        title: '〜くします・〜にします', sub: 'valamilyenné tesz',
        pattern: 'い → くします · な-melléknév + にします',
        body: 'A <b>します</b> itt azt jelenti: valaki szándékosan megváltoztat valamit. Ugyanúgy kapcsolódik, mint a なります: い-melléknévnél <b>く</b>, な-melléknévnél <b>に</b>.',
        more: [
          'A します ebben a szerkezetben nem „csinál", hanem „<b>tesz valamilyenné</b>". Amit megváltoztatsz, を-t kap; a melléknév ugyanúgy alakul, mint a なります előtt: az い-melléknév い-je く-ra vált ({小|ちい}さい → {小|ちい}さく), a な-melléknév に-t kap ({静|しず}か → {静|しず}かに).',
          'A leggyakrabban <b>kérésben</b> hallod: 〜くしてください, 〜にしてください. Így kéred, hogy valamin változtassanak: a fodrásznál rövidebbre, az étteremben csípősebbre, a boltban olcsóbbra. A <b>もう{少|すこ}し</b> („még egy kicsit") finomítja a kérést.',
          'A なります és a します párban jár: aki します-t mond, az a cselekvőt is odaérti; aki なります-t, az csak az eredményt nevezi meg.'
        ],
        tables: [
          {
            caption: 'Magától lesz — valaki teszi',
            head: ['', 'Magától változik', 'Valaki megváltoztatja'],
            rows: [
              ['い-melléknév', 'へや<b>が</b> あかる<b>く</b> なります', 'へや<b>を</b> あかる<b>く</b> します'],
              ['な-melléknév', 'へや<b>が</b> きれい<b>に</b> なります', 'へや<b>を</b> きれい<b>に</b> します'],
              ['főnév', 'むすこ<b>が</b> いしゃ<b>に</b> なります', 'むすこ<b>を</b> いしゃ<b>に</b> します']
            ]
          }
        ],
        examples: [
          { jp: '{部屋|へや}を{明|あか}るくします。', romaji: 'Heya o akaruku shimasu.', hu: 'Világosabbá teszem a szobát.' },
          { jp: 'テレビの{音|おと}を{小|ちい}さくしてください。', romaji: 'Terebi no oto o chiisaku shite kudasai.', hu: 'Kérem, halkítsa le a tévét.' },
          { jp: '{部屋|へや}をきれいにしました。', romaji: 'Heya o kirei ni shimashita.', hu: 'Rendbe tettem a szobát.' },
          { jp: '{髪|かみ}を{短|みじか}くしました。', romaji: 'Kami o mijikaku shimashita.', hu: 'Rövidre vágattam a hajam.' },
          { jp: 'もう{少|すこ}し{安|やす}くしてください。', romaji: 'Mō sukoshi yasuku shite kudasai.', hu: 'Kérem, adja egy kicsit olcsóbban.' },
          { jp: '{字|じ}を{大|おお}きくします。', romaji: 'Ji o ōkiku shimasu.', hu: 'Nagyobbra veszem a betűket.' }
        ],
        notes: [
          'A <b>{静|しず}かにしてください</b> („maradjanak csendben") és a <b>きれいにしてください</b> („tegyék rendbe") szinte állandó kifejezés.',
          'Az いい alakja itt is rendhagyó: <b>よく</b>します. {味|あじ}をよくします = „javít az ízén".',
          'Emberrel kapcsolatban a 〜くします a bánásmódot írja le: {子|こ}どもに{優|やさ}しくします = „kedvesen bánik a gyerekkel".'
        ],
        mistakes: [
          { bad: '{部屋|へや}が{明|あか}るくします。', good: '{部屋|へや}を{明|あか}るくします。', why: 'Amit megváltoztatsz, を-t kap. A が a なります mellé való: {部屋|へや}が{明|あか}るくなります.' },
          { bad: 'きれいくします。', good: 'きれいにします。', why: 'A きれい な-melléknév, hiába végződik い-re: に kell.' },
          { bad: '{音|おと}を{小|ちい}さいにしてください。', good: '{音|おと}を{小|ちい}さくしてください。', why: 'Az い-melléknév い-je く-ra vált, に nem kerül mellé.' }
        ],
        tip: 'なります: magától lesz olyan ({部屋|へや}が{明|あか}るくなります). します: valaki teszi olyanná ({部屋|へや}を{明|あか}るくします).'
      },
      {
        title: 'főnév + にします', sub: 'valamivé tesz',
        pattern: 'A を B にします',
        body: 'Főnévvel ugyanez: valamit valamivé alakítasz, vagy valamilyen értékre állítasz. (A „ezt választom" jelentésű にします ennek rokona.)',
        more: [
          'Az <b>A を B にします</b> három helyzetben fordul elő. <b>Átalakítás</b>: valamiből valami mást csinálsz ({部屋|へや}を{子|こ}ども{部屋|べや}にします). <b>Beállítás</b>: időpontot, árat, méretet, színt határozol meg ({会議|かいぎ}を{三時|さんじ}からにします). <b>Választás</b>: a 13. leckéből ismert コーヒーにします — itt a を-s rész többnyire kimarad, mert a helyzetből világos.',
          'A színek közül az い-melléknevek く-t kapnak ({赤|あか}くします), a főnévi színnevek に-t: {茶色|ちゃいろ}にします, {緑|みどり}にします, ピンクにします.',
          'Emberre is mondható: {息子|むすこ}を{医者|いしゃ}にします („orvost nevel a fiából"). A párja なります-szal: {息子|むすこ}が{医者|いしゃ}になります („a fia orvos lesz").'
        ],
        tables: [
          {
            caption: 'A にします három arca',
            head: ['Mire való?', 'Példa', 'Jelentés'],
            rows: [
              ['átalakítás', 'ケーキを はんぶん<b>に</b> します', 'félbevágja a tortát'],
              ['beállítás', 'パーティーを どようび<b>に</b> します', 'szombatra teszi a bulit'],
              ['választás', 'わたしは コーヒー<b>に</b> します', 'én kávét kérek']
            ]
          }
        ],
        examples: [
          { jp: 'この{部屋|へや}を{子|こ}ども{部屋|べや}にします。', romaji: 'Kono heya o kodomobeya ni shimasu.', hu: 'Ebből a szobából gyerekszobát csinálok.' },
          { jp: '{会議|かいぎ}を{三時|さんじ}からにします。', romaji: 'Kaigi o sanji kara ni shimasu.', hu: 'Háromra teszem a megbeszélést.' },
          { jp: 'ケーキを{半分|はんぶん}にしてください。', romaji: 'Kēki o hanbun ni shite kudasai.', hu: 'Kérem, vágja félbe a tortát.' },
          { jp: '{髪|かみ}を{茶色|ちゃいろ}にしました。', romaji: 'Kami o chairo ni shimashita.', hu: 'Barnára festettem a hajam.' },
          { jp: '{待|ま}ち{合|あ}わせは{六時|ろくじ}にしましょう。', romaji: 'Machiawase wa rokuji ni shimashō.', hu: 'Legyen a találkozó hatkor!' },
          { jp: '{両親|りょうしん}は{兄|あに}を{医者|いしゃ}にしたいと{思|おも}っています。', romaji: 'Ryōshin wa ani o isha ni shitai to omotte imasu.', hu: 'A szüleim orvost szeretnének nevelni a bátyámból.' }
        ],
        notes: [
          'A <b>〜にします</b> (én döntök így) és a <b>〜になります</b> (így alakult) között udvariassági különbség is van. A boltban, szállodában a személyzet gyakran なります-t mond ({八百円|はっぴゃくえん}になります — „nyolcszáz jen lesz"), mert az nem hangzik önkényes döntésnek.'
        ],
        mistakes: [
          { bad: 'この{部屋|へや}を{子|こ}ども{部屋|べや}になります。', good: 'この{部屋|へや}を{子|こ}ども{部屋|べや}にします。', why: 'A を mellé します kell. なります-szal: この{部屋|へや}が{子|こ}ども{部屋|べや}になります.' }
        ]
      },
      {
        title: '〜てあります', sub: 'el van készítve',
        pattern: 'B が + tárgyas ige て-alak + あります',
        body: 'Valaki valamilyen céllal megtett valamit, és az eredménye most is látszik. Tárgyas ige áll benne, de a tárgy <b>が</b>-t kap, mert az állapotáról beszélsz.',
        more: [
          'Képzése: <b>tárgyas</b> ige て-alakja + あります. Az, amivel a cselekvés történt, most a mondat alanya, ezért <b>が</b>-t kap: {名前|なまえ}<b>を</b>{書|か}きます → {名前|なまえ}<b>が</b>{書|か}いてあります. A hely, ahol az eredmény látható, <b>に</b>-t kap, ugyanúgy, mint az あります mellett: {黒板|こくばん}に.',
          'A szerkezet két dolgot mond egyszerre: valaki megtette, mégpedig <b>szándékosan</b>, valamilyen céllal — és az eredmény most is megvan. Hogy ki tette, az nem derül ki, és nem is fontos. Ezért jó leírásra: mit látsz egy teremben, egy kirakatban, egy megterített asztalon.',
          'Második jelentése az <b>elintézettség</b>: valami már el van intézve, készen áll. チケットはもう{買|か}ってあります = „a jegy már meg van véve". Ilyenkor gyakran は áll a が helyén, mert a dologról mint témáról beszélsz.'
        ],
        tables: [
          {
            caption: 'Mit látsz a teremben?',
            head: ['Ige', '〜てあります', 'Jelentés'],
            rows: [
              ['かきます', 'かいてあります', 'fel van írva'],
              ['はります', 'はってあります', 'ki van ragasztva'],
              ['おきます', 'おいてあります', 'oda van téve'],
              ['かざります', 'かざってあります', 'fel van díszítve'],
              ['ならべます', 'ならべてあります', 'sorba van rakva'],
              ['いれます', 'いれてあります', 'bele van téve'],
              ['しめます', 'しめてあります', 'be van csukva'],
              ['つけます', 'つけてあります', 'be van kapcsolva']
            ]
          }
        ],
        examples: [
          { jp: '{窓|まど}が{開|あ}けてあります。', romaji: 'Mado ga akete arimasu.', hu: 'Ki van nyitva az ablak (valaki kinyitotta).' },
          { jp: '{黒板|こくばん}に{名前|なまえ}が{書|か}いてあります。', romaji: 'Kokuban ni namae ga kaite arimasu.', hu: 'A táblára fel van írva a név.' },
          { jp: '{机|つくえ}の{上|うえ}に{花|はな}が{飾|かざ}ってあります。', romaji: 'Tsukue no ue ni hana ga kazatte arimasu.', hu: 'Az asztalt virággal díszítették.' },
          { jp: '{壁|かべ}に{地図|ちず}がはってあります。', romaji: 'Kabe ni chizu ga hatte arimasu.', hu: 'A falra ki van téve egy térkép.' },
          { jp: 'いすが{並|なら}べてあります。', romaji: 'Isu ga narabete arimasu.', hu: 'A székek sorba vannak rakva.' },
          { jp: 'ホテルはもう{予約|よやく}してあります。', romaji: 'Hoteru wa mō yoyaku shite arimasu.', hu: 'A szálloda már le van foglalva.' },
          { jp: '{冷蔵庫|れいぞうこ}にジュースが{入|い}れてあります。', romaji: 'Reizōko ni jūsu ga irete arimasu.', hu: 'Az üdítő be van téve a hűtőbe.' }
        ],
        notes: [
          'Tagadva: {書|か}いて<b>ありません</b> („nincs felírva"). Kérdezve: どこに{書|か}いてありますか („hol van felírva?").',
          'Rövid alakja <b>〜てある</b>, és főnév előtt jelzőként is áll: {机|つくえ}の{上|うえ}に{置|お}いてある{本|ほん} = „az asztalra tett könyv".',
          'Élőlényre nem használjuk: emberről, állatról nem mondjuk, hogy „oda van téve".'
        ],
        mistakes: [
          { bad: '{名前|なまえ}が{書|か}いています。', good: '{名前|なまえ}が{書|か}いてあります。', why: 'A {書|か}きます tárgyas ige: ています-szal azt jelentené, hogy valaki éppen ír. Az eredményhez あります kell.' },
          { bad: '{窓|まど}が{開|あ}いてあります。', good: '{窓|まど}が{開|あ}けてあります。', why: 'A てあります elé tárgyas ige kell ({開|あ}けます); az {開|あ}きます tárgyatlan.' }
        ]
      },
      {
        title: '〜ています és 〜てあります', sub: 'állapot · szándékos eredmény',
        pattern: 'tárgyatlan + ています · tárgyas + てあります',
        body: 'Mindkettő állapotot ír le. A <b>tárgyatlan ige + ています</b> csak azt mondja, mit látsz. A <b>tárgyas ige + てあります</b> azt is, hogy valaki szándékosan hagyta így.',
        more: [
          'A két mondat ugyanazt a képet mutatja — nyitva az ajtó —, de mást gondolsz mögé. <b>ドアが{開|あ}いています</b>: ezt látom; hogy miért van így, azt nem tudom, vagy nem érdekes. <b>ドアが{開|あ}けてあります</b>: valaki kinyitotta, és okkal hagyta így (szellőztet, vendéget vár).',
          'Ezért a てあります sokszor megnyugtató: „ne aggódj, el van intézve". A ています néha épp az ellenkezője: {電気|でんき}がついています — „ég a villany", talán valaki égve felejtette.',
          'A következő leckében megismered a harmadik rokont, a <b>〜ておきます</b> alakot. Az magát az <b>előkészítő cselekvést</b> mondja ki („előre megveszem"), a てあります pedig az <b>eredményt</b> („meg van véve").'
        ],
        tables: [
          {
            caption: 'Négy mondat egy ablakról',
            head: ['Mondat', 'Mit mond?'],
            rows: [
              ['まど<b>を</b> あけています。', 'Valaki éppen nyitja az ablakot.'],
              ['まど<b>を</b> あけました。', 'Valaki kinyitotta (hogy most mi van, nem tudjuk).'],
              ['まど<b>が</b> あいています。', 'Az ablak nyitva van — ezt látom.'],
              ['まど<b>が</b> あけてあります。', 'Az ablak nyitva van, mert valaki szándékosan kinyitotta.']
            ]
          }
        ],
        examples: [
          { jp: 'ドアが{開|あ}いています。', romaji: 'Doa ga aite imasu.', hu: 'Nyitva van az ajtó.' },
          { jp: 'ドアが{開|あ}けてあります。', romaji: 'Doa ga akete arimasu.', hu: 'Nyitva hagyták az ajtót.' },
          { jp: '{電気|でんき}がつけてあります。', romaji: 'Denki ga tsukete arimasu.', hu: 'Fel van kapcsolva a villany (valaki felkapcsolta).' },
          { jp: 'かぎがかかっています。', romaji: 'Kagi ga kakatte imasu.', hu: 'Zárva van (kulcsra).' },
          { jp: 'かぎがかけてあります。', romaji: 'Kagi ga kakete arimasu.', hu: 'Kulcsra van zárva (valaki bezárta).' },
          { jp: 'エアコンがつけてありますから、{涼|すず}しいですよ。', romaji: 'Eakon ga tsukete arimasu kara, suzushii desu yo.', hu: 'Be van kapcsolva a légkondi, úgyhogy hűvös van.' }
        ],
        notes: [
          'Párok, amelyeket érdemes együtt megjegyezni: {開|あ}いています / {開|あ}けてあります · {閉|し}まっています / {閉|し}めてあります · ついています / つけてあります · {消|き}えています / {消|け}してあります · {入|はい}っています / {入|い}れてあります.'
        ],
        mistakes: [
          { bad: '{電気|でんき}がつけています。', good: '{電気|でんき}がついています。', why: 'A が mellé tárgyatlan ige + ています illik (vagy tárgyas ige + てあります: つけてあります).' }
        ]
      },
      {
        title: '〜といいます', sub: 'úgy hívják · úgy mondják',
        pattern: 'A は B といいます',
        body: 'A <b>と</b> idéző partikula: azt jelöli, amit mondanak vagy aminek neveznek valamit. Bemutatkozáskor szerényebb, mint a です.',
        more: [
          'A <b>と</b> itt nem „és" és nem „-val": <b>idéző partikula</b>. Azt jelöli meg, ami elhangzik, vagy aminek neveznek valamit — mintha idézőjelbe tennéd. A név után közvetlenül áll, だ nélkül: {田中|たなか}<b>と</b>いいます.',
          'Négy gyakori helyzet: <b>bemutatkozás</b> ({私|わたし}は…といいます; még szerényebb a …と{申|もう}します), <b>megnevezés</b> (これは「ゆかた」といいます), <b>rákérdezés egy szóra</b> (…は{日本語|にほんご}で{何|なん}といいますか), és annak leírása, <b>mit szokás mondani</b> egy helyzetben.',
          'A 20. leckében tanult <b>〜という</b> + főnév ugyanez a szerkezet jelzőként: 「ひまわり」という{花|はな} = „a napraforgó nevű virág". Ha pedig egy szó jelentését adod meg: <b>〜という{意味|いみ}です</b> („azt jelenti, hogy…").'
        ],
        tables: [
          {
            caption: 'A といいます helyzetei',
            head: ['Helyzet', 'Minta', 'Példa'],
            rows: [
              ['bemutatkozás', 'わたしは A <b>と</b> いいます', 'わたしは アンナ<b>と</b> いいます。'],
              ['megnevezés', 'これは A <b>と</b> いいます', 'これは「はし」<b>と</b> いいます。'],
              ['rákérdezés', 'A は にほんごで なん<b>と</b> いいますか', '「ほん」は えいごで なん<b>と</b> いいますか。'],
              ['jelentés', 'A は B <b>という</b> いみです', '「きんえん」は「たばこは だめ」<b>という</b> いみです。']
            ]
          }
        ],
        examples: [
          { jp: '{私|わたし}は{田中|たなか}といいます。', romaji: 'Watashi wa Tanaka to iimasu.', hu: 'Tanakának hívnak.' },
          { jp: 'これは{日本語|にほんご}で{何|なん}といいますか。', romaji: 'Kore wa nihongo de nan to iimasu ka.', hu: 'Hogy mondják ezt japánul?' },
          { jp: '{食事|しょくじ}のまえに「いただきます」といいます。', romaji: 'Shokuji no mae ni "itadakimasu" to iimasu.', hu: 'Evés előtt azt mondják: itadakimasu.' },
          { jp: 'この{花|はな}は「ひまわり」といいます。', romaji: 'Kono hana wa "himawari" to iimasu.', hu: 'Ezt a virágot napraforgónak hívják.' },
          { jp: '「さようなら」は{英語|えいご}で「グッバイ」といいます。', romaji: '"Sayōnara" wa Eigo de "gubbai" to iimasu.', hu: 'A „szajónara" angolul „goodbye".' },
          { jp: '「{禁煙|きんえん}」は「たばこを{吸|す}ってはいけない」という{意味|いみ}です。', romaji: '"Kin\'en" wa "tabako o sutte wa ikenai" to iu imi desu.', hu: 'A „kin\'en" azt jelenti: tilos dohányozni.' }
        ],
        notes: [
          'A japán idézőjel a <b>「 」</b>. Beszédben persze nem hallatszik: a と jelzi, hol ér véget az idézet.',
          'Ha nem érted, amit mondtak, kérdezz vissza: それはどういう{意味|いみ}ですか („az mit jelent?").'
        ],
        mistakes: [
          { bad: '{私|わたし}は{田中|たなか}をいいます。', good: '{私|わたし}は{田中|たなか}といいます。', why: 'Amit mondasz, vagy aminek nevezel valamit, と-t kap, nem を-t.' },
          { bad: 'これは{日本語|にほんご}で{何|なに}をいいますか。', good: 'これは{日本語|にほんご}で{何|なん}といいますか。', why: 'A kérdőszó is と-val áll: {何|なん}と.' }
        ]
      },
      {
        title: '〜といいました', sub: 'azt mondta, hogy…',
        pattern: 'rövid alak + といいました',
        body: 'Ha más szavait a sajátoddal adod vissza, a と előtt rövid alak áll; főnév és な-melléknév után <b>だ</b> kell.',
        more: [
          'Kétféleképp adhatod vissza más szavait. <b>Szó szerint</b>: az elhangzott mondat változatlanul, idézőjelben áll, utána と — az udvarias alak is megmarad: 「あした{来|き}ます」と{言|い}いました. <b>Tartalom szerint</b>: a saját szavaiddal; ilyenkor a と előtt <b>rövid (egyszerű) alak</b> áll: あした{来|く}ると{言|い}いました.',
          'Az idézett rész megtartja a <b>saját idejét</b>, ahogy a magyarban is: „azt mondta, jön" = {来|く}ると{言|い}いました. A {来|く}る jelen idejű marad, mert a beszélő akkor a jövőről beszélt.',
          'Nemcsak az {言|い}います idéz. Ugyanígy と áll a <b>{聞|き}きます</b> (kérdez), a <b>{答|こた}えます</b> (felel), a <b>{書|か}きます</b> (ír) előtt is. A てあります alakkal összekapcsolva megkapod a feliratok mondatát: 〜と{書|か}いてあります („az van kiírva, hogy…").'
        ],
        tables: [
          {
            caption: 'Rövid alak a と előtt',
            head: ['Elhangzott', 'Idézve'],
            rows: [
              ['いきます', 'いく <b>と</b> いいました'],
              ['いきません', 'いかない <b>と</b> いいました'],
              ['いきました', 'いった <b>と</b> いいました'],
              ['おいしいです', 'おいしい <b>と</b> いいました'],
              ['げんきです', 'げんき<b>だ と</b> いいました'],
              ['がくせいです', 'がくせい<b>だ と</b> いいました']
            ]
          }
        ],
        examples: [
          { jp: '{田中|たなか}さんはあした{来|く}ると{言|い}いました。', romaji: 'Tanaka-san wa ashita kuru to iimashita.', hu: 'Tanaka azt mondta, holnap jön.' },
          { jp: '{先生|せんせい}は{試験|しけん}は{簡単|かんたん}だと{言|い}いました。', romaji: 'Sensei wa shiken wa kantan da to iimashita.', hu: 'A tanár azt mondta, a vizsga könnyű.' },
          { jp: '{妹|いもうと}は{行|い}きたくないと{言|い}いました。', romaji: 'Imōto wa ikitakunai to iimashita.', hu: 'A húgom azt mondta, nem akar menni.' },
          { jp: '{医者|いしゃ}は「{三日|みっか}{休|やす}んでください」と{言|い}いました。', romaji: 'Isha wa "mikka yasunde kudasai" to iimashita.', hu: 'Az orvos azt mondta: „Pihenjen három napot."' },
          { jp: '{駅員|えきいん}に「{次|つぎ}の{電車|でんしゃ}は{何時|なんじ}ですか」と{聞|き}きました。', romaji: 'Ekiin ni "tsugi no densha wa nanji desu ka" to kikimashita.', hu: 'Megkérdeztem a vasutast: „Mikor jön a következő vonat?"' },
          { jp: 'ドアに「{押|お}す」と{書|か}いてあります。', romaji: 'Doa ni "osu" to kaite arimasu.', hu: 'Az ajtóra az van írva: „Tolni".' },
          { jp: '{母|はは}は{少|すこ}し{遅|おそ}くなると{言|い}いました。', romaji: 'Haha wa sukoshi osoku naru to iimashita.', hu: 'Anyám azt mondta, kicsit késni fog.' }
        ],
        notes: [
          'Ha valakinek az üzenetét adod át egy harmadik embernek, a természetes alak <b>〜と{言|い}っていました</b> („azt üzeni, azt mondta"). Ezt a 34. leckében gyakorlod.',
          'A kérést, utasítást szó szerinti idézetként a legegyszerűbb visszaadni: 「{静|しず}かにしてください」と{言|い}いました.'
        ],
        mistakes: [
          { bad: '{試験|しけん}は{簡単|かんたん}と{言|い}いました。', good: '{試験|しけん}は{簡単|かんたん}だと{言|い}いました。', why: 'な-melléknév és főnév után a と elé だ kerül.' },
          { bad: 'おいしいだと{言|い}いました。', good: 'おいしいと{言|い}いました。', why: 'い-melléknév után nincs だ.' }
        ]
      },
      {
        title: '〜って', sub: 'a beszélt nyelv idézője',
        pattern: 'A って{何|なん}ですか · 〜って{言|い}いました',
        body: 'Kötetlen beszédben a と, a という és a というのは helyén gyakran <b>って</b> áll. Rövid, gyors, és mindenhol hallod: barátok között, sorozatokban, üzenetekben.',
        more: [
          'Három dolgot helyettesít. <b>Rákérdezés ismeretlen szóra</b>: 「ぶんかさい」って{何|なん}ですか = 「ぶんかさい」というのは{何|なん}ですか. <b>A téma kiemelése</b> a は helyén, kis csodálkozással: {日本語|にほんご}って、おもしろいですね. <b>Idézés</b> a と helyén: あした{来|く}るって{言|い}っていました.',
          'A válaszban megadhatod a jelentést: 〜のことです („… az a …") vagy 〜という{意味|いみ}です („azt jelenti, hogy…").'
        ],
        examples: [
          { jp: '「ぶんかさい」って{何|なん}ですか。', romaji: '"Bunkasai" tte nan desu ka.', hu: 'Mi az a „bunkaszai"?' },
          { jp: '{田中|たなか}さんって、どんな{人|ひと}ですか。', romaji: 'Tanaka-san tte, donna hito desu ka.', hu: 'Milyen ember az a Tanaka?' },
          { jp: 'ケンさんはあした{来|く}るって{言|い}っていましたよ。', romaji: 'Ken-san wa ashita kuru tte itte imashita yo.', hu: 'Ken azt mondta, holnap jön.' },
          { jp: '{日本語|にほんご}って、おもしろいですね。', romaji: 'Nihongo tte, omoshiroi desu ne.', hu: 'A japán nyelv, hát az érdekes!' }
        ],
        notes: [
          'Csak beszédben és kötetlen írásban (üzenet, csevegés) használd; fogalmazásba, hivatalos levélbe と / という való.',
          'A válasz kulcsszava a こと: 「ぶんかさい」は{学校|がっこう}のお{祭|まつ}り<b>のことです</b> — „a bunkaszai az iskolai fesztivál".'
        ],
        tip: 'Ha nem értesz egy szót, ez a leghasznosabb kérdés: 「…」って{何|なん}ですか。'
      }
    ],
    phrases: [
      { jp: 'みなさん、{静|しず}かにしてください。', romaji: 'Mina-san, shizuka ni shite kudasai.', hu: 'Figyelem, maradjatok csendben!', note: 'Tanár, előadó, idegenvezető mondja egy csoportnak.' },
      { jp: 'それでは、{始|はじ}めます。', romaji: 'Sore dewa, hajimemasu.', hu: 'Akkor kezdjük.' },
      { jp: 'この{絵|え}を{見|み}てください。', romaji: 'Kono e o mite kudasai.', hu: 'Nézzétek meg ezt a képet.' },
      { jp: '{一緒|いっしょ}にやってみましょう。', romaji: 'Issho ni yatte mimashō.', hu: 'Próbáljuk meg együtt!' },
      { jp: 'もう{少|すこ}し{短|みじか}くしてください。', romaji: 'Mō sukoshi mijikaku shite kudasai.', hu: 'Kérem, legyen egy kicsit rövidebb.', note: 'Fodrásznál, szabónál is így kérsz módosítást.' },
      { jp: 'はい、できました。', romaji: 'Hai, dekimashita.', hu: 'Tessék, kész!' },
      { jp: '{何|なに}か{質問|しつもん}はありますか。', romaji: 'Nani ka shitsumon wa arimasu ka.', hu: 'Van valakinek kérdése?' },
      { jp: '{今日|きょう}は{私|わたし}の{学校|がっこう}を{紹介|しょうかい}します。', romaji: 'Kyō wa watashi no gakkō o shōkai shimasu.', hu: 'Ma az iskolámat mutatom be.' },
      { jp: 'それはどういう{意味|いみ}ですか。', romaji: 'Sore wa dō iu imi desu ka.', hu: 'Az mit jelent?' }
    ],
    words: [
      {
        title: 'Az iskolában',
        items: [
          { jp: '{教室|きょうしつ}', romaji: 'kyōshitsu', hu: 'tanterem' },
          { jp: '{黒板|こくばん}', romaji: 'kokuban', hu: 'tábla' },
          { jp: '{壁|かべ}', romaji: 'kabe', hu: 'fal' },
          { jp: '{授業|じゅぎょう}', romaji: 'jugyō', hu: 'tanóra' },
          { jp: '{制服|せいふく}', romaji: 'seifuku', hu: 'egyenruha' },
          { jp: '{校則|こうそく}', romaji: 'kōsoku', hu: 'házirend' },
          { jp: '{入学式|にゅうがくしき}', romaji: 'nyūgakushiki', hu: 'évnyitó, beiratkozási ünnepség' },
          { jp: '{卒業式|そつぎょうしき}', romaji: 'sotsugyōshiki', hu: 'végzősök búcsúünnepsége' },
          { jp: '{文化祭|ぶんかさい}', romaji: 'bunkasai', hu: 'iskolai kulturális fesztivál' },
          { jp: '{運動会|うんどうかい}', romaji: 'undōkai', hu: 'sportnap' }
        ]
      },
      {
        title: 'Tantárgyak ({科目|かもく})',
        items: [
          { jp: '{国語|こくご}', romaji: 'kokugo', hu: 'anyanyelv (japán)' },
          { jp: '{数学|すうがく}', romaji: 'sūgaku', hu: 'matematika' },
          { jp: '{英語|えいご}', romaji: 'eigo', hu: 'angol' },
          { jp: '{歴史|れきし}', romaji: 'rekishi', hu: 'történelem' },
          { jp: '{地理|ちり}', romaji: 'chiri', hu: 'földrajz' },
          { jp: '{理科|りか}', romaji: 'rika', hu: 'természettudomány' },
          { jp: '{音楽|おんがく}', romaji: 'ongaku', hu: 'ének-zene' },
          { jp: '{美術|びじゅつ}', romaji: 'bijutsu', hu: 'rajz, képzőművészet' },
          { jp: '{体育|たいいく}', romaji: 'taiiku', hu: 'testnevelés' },
          { jp: '{書道|しょどう}', romaji: 'shodō', hu: 'kalligráfia' }
        ]
      },
      {
        title: 'Az előkészület igéi',
        note: 'Mind tárgyas ige: て-alakjuk után あります állhat.',
        items: [
          { jp: 'はります', romaji: 'harimasu', hu: 'kiragaszt, kitesz' },
          { jp: '{置|お}きます', romaji: 'okimasu', hu: 'letesz, odatesz' },
          { jp: '{飾|かざ}ります', romaji: 'kazarimasu', hu: 'díszít' },
          { jp: '{並|なら}べます', romaji: 'narabemasu', hu: 'sorba rak' },
          { jp: 'しまいます', romaji: 'shimaimasu', hu: 'eltesz, elpakol' },
          { jp: '{結|むす}びます', romaji: 'musubimasu', hu: 'megköt' },
          { jp: '{決|き}めます', romaji: 'kimemasu', hu: 'eldönt, meghatároz' },
          { jp: '{紹介|しょうかい}します', romaji: 'shōkai shimasu', hu: 'bemutat' }
        ]
      }
    ],
    culture: [
      {
        title: 'Egyenruha és házirend',
        text: 'A japán alsó- és felső-középiskolák nagy részében egész évben <b>egyenruhát</b> ({制服|せいふく}) hordanak a diákok, külön nyári és téli változatban. A <b>házirend</b> ({校則|こうそく}) sok helyen a ruhán túl a hajviseletre, az ékszerre, a sminkre, sőt a részmunkára is kiterjed. Ami a magyar diáknak szigorúnak tűnik, annak ott gyakorlati oldala is van: reggel nem kell azon gondolkodni, mit vegyen fel az ember.'
      },
      {
        title: 'Az iskolai év',
        text: 'A japán tanév <b>áprilisban</b> kezdődik, a cseresznyevirágzás idején: ekkor tartják az évnyitót ({入学式|にゅうがくしき}), a végzősöket pedig márciusban búcsúztatják ({卒業式|そつぎょうしき}). Az év nagy eseményei a sportnap ({運動会|うんどうかい}) és a kulturális fesztivál ({文化祭|ぶんかさい}), amelyre az osztályok előadással, kiállítással, büfével készülnek. A tantermet a nap végén maguk a diákok takarítják ki, a délutánt pedig sokan szakkörben, klubban töltik.'
      },
      {
        title: 'A felnőttkor ünnepe',
        text: 'Januárban, a második hétfőn tartják a <b>felnőtté válás napját</b>. A húszévesek a városházán gyűlnek össze: a lányok hosszú ujjú, díszes kimonóban, a fiúk öltönyben vagy hagyományos viseletben. A nagykorúság határa 2022 óta ugyan 18 év, de alkoholt inni és dohányozni továbbra is csak 20 éves kortól szabad, és a legtöbb város ma is a húszéveseket ünnepli.'
      }
    ],
    quiz: [
      { q: '„Kérem, halkítsa le a tévét." Mi hiányzik?', jp: 'テレビの{音|おと}を＿してください。', a: '{小|ちい}さく', wrong: ['{小|ちい}さい', '{小|ちい}さに', '{小|ちい}さくて'], why: 'い-melléknév + します: い → く.' },
      { q: '„Rendbe tettem a szobát." Mi hiányzik?', jp: '{部屋|へや}を＿しました。', a: 'きれいに', wrong: ['きれいく', 'きれいな', 'きれいで'], why: 'な-melléknév + にします.' },
      {
        q: 'Mit jelent: {部屋|へや}が{明|あか}るくなりました。',
        a: 'Világosabb lett a szoba (magától).',
        wrong: ['Világosabbá tettem a szobát.', 'Világosabbá kell tenni a szobát.', 'A szoba nem lett világosabb.'],
        why: 'なります: a változás magától történik; a szoba が-t kap.'
      },
      { q: '„A táblára fel van írva a név." Mi hiányzik?', jp: '{黒板|こくばん}に{名前|なまえ}が{書|か}いて＿。', a: 'あります', wrong: ['います', 'いきます', 'ください'], why: 'Szándékos eredmény: tárgyas ige て-alakja + あります.' },
      { q: '„Ki van nyitva az ablak (valaki kinyitotta)." Mi hiányzik?', jp: '{窓|まど}が＿あります。', a: '{開|あ}けて', wrong: ['{開|あ}いて', '{開|あ}け', '{開|あ}く'], why: 'A てあります előtt tárgyas ige áll: {開|あ}けます → {開|あ}けて.' },
      { q: 'Melyik mondat helyes: „Nyitva van az ajtó."', a: 'ドアが{開|あ}いています。', wrong: ['ドアを{開|あ}いています。', 'ドアが{開|あ}いてあります。', 'ドアを{開|あ}きます。'], why: 'Tárgyatlan ige ({開|あ}きます) + ています, が-val.' },
      { q: '„Tanakának hívnak." Mi hiányzik?', jp: '{私|わたし}は{田中|たなか}＿いいます。', a: 'と', wrong: ['を', 'に', 'が'], why: 'Az idéző と jelöli a nevet.' },
      { q: '„Hogy mondják ezt japánul?" Mi hiányzik?', jp: 'これは{日本語|にほんご}で{何|なん}＿。', a: 'といいますか', wrong: ['にしますか', 'がありますか', 'になりますか'], why: '{何|なん}といいますか = minek mondják?' },
      { q: '„A tanár azt mondta, a vizsga könnyű." Mi hiányzik?', jp: '{先生|せんせい}は{試験|しけん}は{簡単|かんたん}＿と{言|い}いました。', a: 'だ', wrong: ['な', 'の', 'で'], why: 'な-melléknév után だ kell az idéző と elé.' },
      { q: '„Kérem, vágja félbe a tortát." Mi hiányzik?', jp: 'ケーキを{半分|はんぶん}＿してください。', a: 'に', wrong: ['く', 'を', 'で'], why: 'Főnév + にします.' },
      { q: '„Kérem, adja egy kicsit olcsóbban." Mi hiányzik?', jp: 'もう{少|すこ}し＿してください。', a: '{安|やす}く', wrong: ['{安|やす}い', '{安|やす}に', '{安|やす}くて'], why: 'Az い-melléknév い-je く-ra vált a します előtt: {安|やす}くします.' },
      {
        q: 'Melyik mondat mondja azt, hogy valaki szándékosan hagyta nyitva az ablakot?',
        a: '{窓|まど}が{開|あ}けてあります。',
        wrong: ['{窓|まど}が{開|あ}いています。', '{窓|まど}を{開|あ}けています。', '{窓|まど}を{開|あ}けました。'],
        why: 'A tárgyas ige + てあります azt mondja: valaki céllal megtette, és az eredmény most is megvan.'
      },
      {
        q: 'Mit jelent: いすが{並|なら}べてあります。',
        a: 'A székek sorba vannak rakva (valaki elrendezte őket).',
        wrong: ['Valaki éppen sorba rakja a székeket.', 'A székeket sorba fogják rakni.', 'Nincsenek székek.'],
        why: 'A てあります a szándékos cselekvés eredményét írja le.'
      },
      { q: 'Mit jelent: 「ゆかた」って{何|なん}ですか。', a: 'Mi az a „jukata"?', wrong: ['Hol van a jukata?', 'Ez jukata?', 'Kié a jukata?'], why: 'A って a というのは beszélt alakja: egy ismeretlen szóra kérdezel rá vele.' },
      { q: '„Tanaka azt mondta, holnap jön." Mi hiányzik?', jp: '{田中|たなか}さんはあした＿と{言|い}いました。', a: '{来|く}る', wrong: ['{来|き}て', '{来|き}た', '{来|こ}ない'], why: 'A と előtt rövid alak áll, és megtartja a saját idejét: {来|く}る (jönni fog).' },
      {
        q: 'Mit jelent: ドアに「{押|お}す」と{書|か}いてあります。',
        a: 'Az ajtóra az van írva: „Tolni".',
        wrong: ['Az ajtót be kell csukni.', 'Valaki éppen ír az ajtóra.', 'Az ajtó nyitva van.'],
        why: 'Az idéző と megmondja, mi áll ott; a {書|か}いてあります azt, hogy ki van írva.'
      },
      {
        q: 'Melyik mondat helyes: „Rövidre vágattam a hajam."',
        a: '{髪|かみ}を{短|みじか}くしました。',
        wrong: ['{髪|かみ}を{短|みじか}いにしました。', '{髪|かみ}が{短|みじか}くしました。', '{髪|かみ}を{短|みじか}くなりました。'],
        why: 'Amit megváltoztatsz, を-t kap; az い-melléknév く-ra vált; az ige します.'
      },
      {
        q: 'Melyik mondatban változik meg valami magától?',
        a: '{部屋|へや}が{暗|くら}くなりました。',
        wrong: ['{部屋|へや}を{暗|くら}くしました。', '{部屋|へや}を{暗|くら}くしてください。', '{部屋|へや}を{暗|くら}くしましょう。'],
        why: 'A が + なります: magától lett sötét. A を + します: valaki tette sötétté.'
      },
      { q: 'Mit rövidít a beszélt nyelvben a って?', a: 'A と / という idéző szerkezetet.', wrong: ['A から okhatározót.', 'A ています alakot.', 'A でしょう alakot.'], why: 'A って a と, a という és a というのは kötetlen megfelelője.' },
      { q: '„Ezt darunak hívják." Mi hiányzik?', jp: 'これは「つる」と＿。', a: 'いいます', wrong: ['あります', 'します', 'きます'], why: 'Megnevezés: A は B といいます.' }
    ]
  },

  /* ── 22. lecke ────────────────────────────────────── */
  {
    id: 'l22', no: 22, book: 'Dekiru 1', title: 'Szívességek',
    lead: 'Elmondod, ki kinek tett szívességet, megköszönöd, amit érted tettek, előre elintézel dolgokat egy kirándulás előtt, és leírod, mit csinálsz egyszerre.',
    cando: [
      'Elmondod, ki mit tett meg érted, és te mit tettél meg másért.',
      'Megköszönsz egy szívességet, és megkérsz valakit valamire.',
      'Elmondod, mit készítesz elő egy kirándulás előtt.',
      'Leírod, mit csinálsz egy időben.'
    ],
    intro: [
      'A 13. leckében megtanultad az adás-kapás három igéjét: あげます (adok), くれます (nekem ad), もらいます (kapok). Ebben a leckében ugyanez a három ige <b>cselekvések</b> mögé kerül: a て-alak után azt mutatják meg, <b>kinek a javára</b> történik valami. Japánul nem elég annyit mondani, hogy „a barátom kivitt az állomásra" — azt is ki kell fejezni, hogy ez szívesség volt, és jólesett.',
      'Ez a japán nyelv egyik legjellegzetesebb vonása. A magyarban a hálát külön szóval mondjuk ki („kedves volt tőle"); a japánban benne van az igében. Ha kihagyod, a mondat nyelvtanilag helyes marad, de ridegnek hat, mintha a szívesség fel sem tűnt volna.',
      'A lecke másik két témája a készülődéshez tartozik. A <b>〜ておきます</b> azt fejezi ki, hogy valamit előre, egy későbbi cél érdekében teszel meg — vagy hogy valamit úgy hagysz, ahogy van. A <b>〜ながら</b> pedig két egyidejű cselekvést kapcsol össze: zenét hallgatva reggelizni, térképet nézve sétálni.'
    ],
    dialogue: {
      title: 'Egynapos kirándulás Egerbe',
      scene: 'Jui szeretné megnézni Egert. Anna megszervezi az utat: az apja viszi őket kocsival. A második részben már a várnál vannak.',
      lines: [
        { who: 'Jui', jp: '{日帰|ひがえ}りでエゲルに{行|い}きたいんですが、どうやって{行|い}きますか。', romaji: 'Higaeri de Egeru ni ikitai n desu ga, dō yatte ikimasu ka.', hu: 'Szeretnék egy napra elmenni Egerbe. Hogyan lehet odajutni?' },
        { who: 'Anna', jp: '{父|ちち}が{車|くるま}で{連|つ}れていってくれますよ。{昨日|きのう}{頼|たの}んでおきました。', romaji: 'Chichi ga kuruma de tsurete itte kuremasu yo. Kinō tanonde okimashita.', hu: 'Apám elvisz minket kocsival. Tegnap előre megkértem rá.' },
        { who: 'Jui', jp: 'え、いいんですか。ありがとうございます。', romaji: 'E, ii n desu ka. Arigatō gozaimasu.', hu: 'Tényleg nem gond? Köszönöm szépen!' },
        { who: 'Anna', jp: '{朝|あさ}{早|はや}く{出|で}るので、{私|わたし}がサンドイッチを{作|つく}っておきます。', romaji: 'Asa hayaku deru node, watashi ga sandoitchi o tsukutte okimasu.', hu: 'Korán indulunk, úgyhogy előre készítek szendvicset.' },
        { who: 'Jui', jp: 'じゃあ、{私|わたし}はカメラのバッテリーを{充電|じゅうでん}しておきます。', romaji: 'Jā, watashi wa kamera no batterī o jūden shite okimasu.', hu: 'Akkor én feltöltöm a fényképezőgép akkumulátorát.' },
        { who: 'Anna', jp: '{車|くるま}の{中|なか}で{音楽|おんがく}を{聞|き}きながら、{朝|あさ}ごはんを{食|た}べましょう。', romaji: 'Kuruma no naka de ongaku o kikinagara, asagohan o tabemashō.', hu: 'A kocsiban zenét hallgatva megreggelizünk.' },
        { who: 'Jui', jp: 'わあ、きれいなお{城|しろ}ですね。{母|はは}にも{見|み}せてあげたいです。', romaji: 'Wā, kirei na o-shiro desu ne. Haha ni mo misete agetai desu.', hu: 'Hű, de szép vár! Bárcsak anyámnak is megmutathatnám.' },
        { who: 'Anna', jp: '{子|こ}どものとき、{祖父|そふ}によく{連|つ}れてきてもらいました。', romaji: 'Kodomo no toki, sofu ni yoku tsurete kite moraimashita.', hu: 'Gyerekkoromban a nagyapám sokszor elhozott ide.' },
        { who: 'Jui', jp: 'お{父|とう}さん、すみません、{写真|しゃしん}を{撮|と}ってもらえますか。', romaji: 'Otōsan, sumimasen, shashin o totte moraemasu ka.', hu: 'Elnézést, lefényképezne minket?' },
        { who: 'Apa', jp: 'いいですよ。{真|ま}ん{中|なか}に{並|なら}んで。はい、チーズ！', romaji: 'Ii desu yo. Mannaka ni narande. Hai, chīzu!', hu: 'Persze. Álljatok középre. Mondjátok: csíz!' },
        { who: 'Jui', jp: 'ありがとうございます。あとで{母|はは}に{送|おく}ってあげます。', romaji: 'Arigatō gozaimasu. Ato de haha ni okutte agemasu.', hu: 'Köszönöm. Később elküldöm anyámnak.' }
      ],
      notes: [
        'A <b>{連|つ}れていってくれます</b> két réteg: {連|つ}れていきます („elvisz valakit magával") + くれます („és ezt értünk teszi"). Embert {連|つ}れていきます, tárgyat {持|も}っていきます.',
        'A <b>{頼|たの}んでおきました</b> a ておきます múlt ideje: Anna előre elintézte, hogy mire Jui kérdez, már legyen megoldás.',
        'Az <b>え、いいんですか</b> nem valódi kérdés, hanem udvarias elfogadás: jelzed, hogy nem akarsz a másik terhére lenni.',
        'A <b>{見|み}せてあげたいです</b> több, mint „meg akarom mutatni": Jui azt szeretné, hogy az anyja is örülhessen a látványnak.',
        'A <b>{連|つ}れてきてもらいました</b> három igéből áll: {連|つ}れて + きて + もらいました — „elhozott ide, és ez nekem jó volt". A beszélő felé tartó mozgás きます, a hála もらいます.',
        'Jui Anna apját <b>お{父|とう}さん</b>-nak szólítja. Japánul ez természetes: a barátod szüleit a családban betöltött szerepük szerint nevezed meg.'
      ]
    },
    points: [
      {
        title: '〜てあげます', sub: 'megteszem valakinek',
        pattern: 'A は B に + ige て-alak + あげます',
        body: 'Az adás-kapás igéi cselekvésre is átvihetők: a て-alak után azt mutatják, kinek a javára történik valami. <b>てあげます</b>: én (vagy valaki) szívességet tesz másnak.',
        more: [
          'A mondat az あげます mintáját követi: az alany az, aki a szívességet teszi, a kedvezményezett <b>に</b>-t kap. Ha azonban az ige eleve embert vonz tárgyként ({送|おく}ります, {手伝|てつだ}います, {待|ま}ちます, {連|つ}れていきます), marad a <b>を</b>: {友|とも}だち<b>を</b>{駅|えき}まで{送|おく}ってあげました.',
          'A てあげます kimondja, hogy szívességet teszel — ezért <b>könnyen fölényesnek hat</b>. Családtagról, barátról, gyerekről, állatról beszélve természetes. Annak a szemébe viszont, akinek segítesz, ne mondd, különösen ha idősebb vagy felettes. Felajánláskor a semleges <b>〜ましょうか</b> a jó: {持|も}ちましょうか.',
          'A <b>〜てあげたい</b> a másik örömét is belefoglalja a vágyba. {見|み}せたいです = meg akarom mutatni; {見|み}せてあげたいです = szeretném, ha ő is láthatná.'
        ],
        examples: [
          { jp: '{友|とも}だちに{傘|かさ}を{貸|か}してあげました。', romaji: 'Tomodachi ni kasa o kashite agemashita.', hu: 'Kölcsönadtam az esernyőmet a barátomnak.' },
          { jp: '{弟|おとうと}に{宿題|しゅくだい}を{教|おし}えてあげます。', romaji: 'Otōto ni shukudai o oshiete agemasu.', hu: 'Elmagyarázom az öcsémnek a leckét.' },
          { jp: '{荷物|にもつ}を{持|も}ってあげましょうか。', romaji: 'Nimotsu o motte agemashō ka.', hu: 'Vigyem a csomagodat?' },
          { jp: '{妹|いもうと}に{本|ほん}を{読|よ}んであげました。', romaji: 'Imōto ni hon o yonde agemashita.', hu: 'Felolvastam a húgomnak.' },
          { jp: '{母|はは}にこの{景色|けしき}を{見|み}せてあげたいです。', romaji: 'Haha ni kono keshiki o misete agetai desu.', hu: 'Szeretném megmutatni anyámnak ezt a kilátást.' },
          { jp: '{犬|いぬ}を{散歩|さんぽ}に{連|つ}れていってあげます。', romaji: 'Inu o sanpo ni tsurete itte agemasu.', hu: 'Elviszem sétálni a kutyát.' }
        ],
        notes: [
          'Kisebb testvérről, állatról, növényről beszélve a kötetlen <b>〜てやります</b> is hallható ({弟|おとうと}に{教|おし}えてやります). Kezdőként elég felismerned; a てあげます mindig jó helyette.',
          'Harmadik személyek között is áll: {田中|たなか}さんは{山田|やまだ}さんに{傘|かさ}を{貸|か}してあげました.'
        ],
        mistakes: [
          { bad: '{先生|せんせい}、{荷物|にもつ}を{持|も}ってあげます。', good: '{先生|せんせい}、{荷物|にもつ}を{持|も}ちましょうか。', why: 'Felettesnek szemtől szemben a てあげます lekezelő. Ajánld fel semlegesen.' }
        ],
        tip: 'Idősebbnek, felettesnek ne mondd szemtől szemben: lekezelően hat. Helyette: {持|も}ちましょうか.'
      },
      {
        title: '〜てくれます', sub: 'megteszi nekem',
        pattern: 'A が + ige て-alak + くれます',
        body: 'Valaki <i>nekem</i> (vagy a hozzám tartozóknak) tesz szívességet. Hálát fejez ki: e nélkül a mondat rideg tényközlés volna.',
        more: [
          'Az alany a segítő (が vagy は); a kedvezményezett te vagy, vagy valaki a tieid közül (a családod, a csoportod). A {私|わたし}に-t szinte mindig elhagyjuk: az ige maga megmondja, hogy „nekem".',
          'Ugyanaz a tény kétféleképp: {友|とも}だちが{駅|えき}まで{送|おく}りました — puszta tény, mintha közöd sem volna hozzá. {友|とも}だちが{駅|えき}まで{送|おく}ってくれました — és ez jólesett. Ha valaki érted tesz valamit, a くれます szinte kötelező.',
          'Barátok között kérésre is jó: <b>〜てくれる？</b> / 〜てくれますか („megtennéd?"). Az udvariasabb változatokat a következő leckében tanulod.'
        ],
        examples: [
          { jp: '{友|とも}だちが{駅|えき}まで{送|おく}ってくれました。', romaji: 'Tomodachi ga eki made okutte kuremashita.', hu: 'A barátom kikísért az állomásig.' },
          { jp: '{母|はは}がお{弁当|べんとう}を{作|つく}ってくれました。', romaji: 'Haha ga obentō o tsukutte kuremashita.', hu: 'Anyám készített nekem uzsonnát.' },
          { jp: '{手伝|てつだ}ってくれて、ありがとう。', romaji: 'Tetsudatte kurete, arigatō.', hu: 'Köszi, hogy segítettél.' },
          { jp: '{田中|たなか}さんが{町|まち}を{案内|あんない}してくれました。', romaji: 'Tanaka-san ga machi o annai shite kuremashita.', hu: 'Tanaka körbevezetett a városban.' },
          { jp: '{妹|いもうと}が{掃除|そうじ}を{手伝|てつだ}ってくれます。', romaji: 'Imōto ga sōji o tetsudatte kuremasu.', hu: 'A húgom segít nekem takarítani.' },
          { jp: 'ちょっと{待|ま}ってくれる？', romaji: 'Chotto matte kureru?', hu: 'Várnál egy kicsit?' }
        ],
        notes: [
          'A kedvezményezett lehet a családod is: {友|とも}だちが{妹|いもうと}に{英語|えいご}を{教|おし}えてくれました — „a barátom angolra tanította a húgomat", és ezt a család szívességnek veszi.'
        ],
        mistakes: [
          { bad: '{友|とも}だちが{私|わたし}に{傘|かさ}を{貸|か}してあげました。', good: '{友|とも}だちが{傘|かさ}を{貸|か}してくれました。', why: 'Ha te kapod a szívességet, あげます nem állhat: az a beszélőtől kifelé mutat.' }
        ]
      },
      {
        title: '〜てもらいます', sub: 'megkérem, megteszi nekem',
        pattern: 'A は B に + ige て-alak + もらいます',
        body: 'Ugyanaz a helyzet az én szemszögemből: én vagyok az alany, aki a szívességet kapja, a segítő <b>に</b>-t kap. Gyakran azt is jelenti, hogy megkértem rá.',
        more: [
          'A mondat alanya az, aki a szívességet <b>kapja</b> — többnyire te; a segítő <b>に</b>-t kap. A tény ugyanaz, mint a てくれます mondatában, csak a nézőpont más: ott a segítő kedvességét emeled ki, itt azt, hogy te jártál jól.',
          'A てもらいます gyakran azt is jelenti, hogy <b>te kérted</b> a szívességet: {友|とも}だちに{写真|しゃしん}を{撮|と}ってもらいました = megkértem, és lefényképezett. A てくれます inkább arra illik, amit a másik magától tett meg.',
          'Kérésként a ható alakja áll: <b>〜てもらえますか</b> / 〜てもらえませんか („megtenné nekem?"). Ismeretlentől, eladótól így kérsz szívességet.'
        ],
        tables: [
          {
            caption: 'Egy szívesség, három mondat',
            head: ['Alak', 'Ki az alany?', 'Mondat'],
            rows: [
              ['〜てあげます', 'aki segít (én)', 'わたしは ともだち<b>に</b> かさを かしてあげました。'],
              ['〜てくれます', 'aki segít (más)', 'ともだち<b>が</b> かさを かしてくれました。'],
              ['〜てもらいます', 'aki kapja (én)', 'わたしは ともだち<b>に</b> かさを かしてもらいました。']
            ]
          }
        ],
        examples: [
          { jp: '{友|とも}だちに{写真|しゃしん}を{撮|と}ってもらいました。', romaji: 'Tomodachi ni shashin o totte moraimashita.', hu: 'Megkértem a barátomat, hogy fényképezzen le.' },
          { jp: '{姉|あね}に{英語|えいご}を{教|おし}えてもらいました。', romaji: 'Ane ni eigo o oshiete moraimashita.', hu: 'A nővérem tanított angolra.' },
          { jp: 'だれに{手伝|てつだ}ってもらいましたか。', romaji: 'Dare ni tetsudatte moraimashita ka.', hu: 'Ki segített neked?' },
          { jp: '{美容院|びよういん}で{髪|かみ}を{切|き}ってもらいました。', romaji: 'Biyōin de kami o kitte moraimashita.', hu: 'Levágattam a hajam a fodrásznál.' },
          { jp: '{店|みせ}の{人|ひと}に{道|みち}を{教|おし}えてもらいました。', romaji: 'Mise no hito ni michi o oshiete moraimashita.', hu: 'Az eladótól kérdeztem meg az utat.' },
          { jp: 'すみません、{写真|しゃしん}を{撮|と}ってもらえますか。', romaji: 'Sumimasen, shashin o totte moraemasu ka.', hu: 'Elnézést, lefényképezne?' }
        ],
        notes: [
          'A magyar „-tat / -tet" (levágat, megjavíttat) sokszor éppen てもらいます: {時計|とけい}を{直|なお}してもらいました = „megjavíttattam az órámat".',
          'A táblázat második és harmadik sora ugyanazt az eseményt írja le; a magyar fordításuk is lehet azonos.'
        ],
        mistakes: [
          { bad: '{友|とも}だちが{写真|しゃしん}を{撮|と}ってもらいました。', good: '{友|とも}だちに{写真|しゃしん}を{撮|と}ってもらいました。', why: 'A てもらいます mellett a segítő に-t kap. が-val a barátod volna az, akit lefényképeztek.' }
        ],
        tip: 'てくれます: a segítő az alany (が). てもらいます: én vagyok az alany, a segítő に-t kap.'
      },
      {
        title: '〜てくれて、ありがとう', sub: 'köszönöm, hogy…',
        pattern: 'ige て-alak + くれて、ありがとう（ございます）',
        body: 'A köszönet okát a くれます て-alakja vezeti be. Nem azt mondod: „köszönöm, hogy eljöttél", hanem azt: „köszönöm, hogy megtetted nekem azt a szívességet, hogy eljöttél".',
        more: [
          'A くれて nem hagyható el: nélküle a mondat két fele nem kapcsolódik össze, és épp a szívesség marad ki belőle. Barátnak ありがとう, másnak ありがとうございます áll a végén; ha a szívesség már megtörtént, ありがとうございました.',
          'A köszönet helyén más is állhat: <b>{助|たす}かりました</b> („nagy segítség volt"), <b>うれしかったです</b> („örültem neki"). Tanárnak, idősebbnek a くれて helyett くださって kell — ezt a következő leckében tanulod.',
          'A válasz a köszönetre: <b>いいえ、どういたしまして</b>, vagy kötetlenül いえいえ („ugyan, semmiség").'
        ],
        examples: [
          { jp: '{来|き}てくれて、ありがとう。', romaji: 'Kite kurete, arigatō.', hu: 'Köszi, hogy eljöttél.' },
          { jp: '{駅|えき}まで{迎|むか}えに{来|き}てくれて、ありがとうございます。', romaji: 'Eki made mukae ni kite kurete, arigatō gozaimasu.', hu: 'Köszönöm, hogy kijött elém az állomásra.' },
          { jp: '{誘|さそ}ってくれて、ありがとう。', romaji: 'Sasotte kurete, arigatō.', hu: 'Köszi, hogy hívtál.' },
          { jp: '{教|おし}えてくれて、{助|たす}かりました。', romaji: 'Oshiete kurete, tasukarimashita.', hu: 'Nagy segítség volt, hogy megmondtad.' }
        ],
        notes: [
          'Bocsánatkéréskor ugyanez a szerkezet a saját cselekvéseddel áll, くれて nélkül: {遅|おそ}くなって、すみません („elnézést a késésért").'
        ],
        mistakes: [
          { bad: '{来|き}て、ありがとう。', good: '{来|き}てくれて、ありがとう。', why: 'A くれて nélkül a köszönetből épp az marad ki, hogy érted tették.' }
        ],
        tip: 'Ha valaki segített, ez a legtermészetesebb mondat: {手伝|てつだ}ってくれて、ありがとう。'
      },
      {
        title: '〜ておきます', sub: 'előre megteszem · úgy hagyom',
        pattern: 'ige て-alak + おきます',
        body: 'Két jelentése van: valamit <b>előre</b>, egy későbbi cél érdekében megteszel, vagy valamit <b>úgy hagysz</b>, ahogy van.',
        more: [
          'Az おきます eredetileg azt jelenti: „letesz, odatesz". A て-alak után átvitt értelmű: megteszel valamit, és az eredményét „leteszed", hogy később meglegyen.',
          '<b>Előkészület</b>: egy későbbi esemény miatt előre megteszed. Gyakori kísérői a 〜まえに, a 〜までに és a もう. Utazás, vendégség, vizsga, megbeszélés előtt minden teendő ておきます: megveszem a jegyet, utánanézek az útvonalnak, feltöltöm a telefont.',
          '<b>Úgy hagyás</b>: nem változtatsz az állapoton. Ezt a jelentést gyakran a そのまま („úgy, ahogy van") jelzi: そのままにしておいてください.',
          'A 21. lecke てあります alakja ennek az eredménye: ホテル<b>を</b>{予約|よやく}しておきました (előre lefoglaltam) → ホテル<b>が</b>{予約|よやく}してあります (le van foglalva).'
        ],
        tables: [
          {
            caption: 'A ておきます alakjai',
            head: ['Alak', 'Példa', 'Jelentés'],
            rows: [
              ['〜ておきます', 'かっておきます', 'előre megveszem'],
              ['〜ておきました', 'かっておきました', 'előre megvettem'],
              ['〜ておいてください', 'かっておいてください', 'kérem, vegye meg előre'],
              ['〜ておきましょう', 'かっておきましょう', 'vegyük meg előre'],
              ['〜ておいたほうがいいです', 'かっておいたほうがいいです', 'jobb előre megvenni'],
              ['〜とく (beszélt)', 'かっとく', 'megveszem előre (kötetlen)']
            ]
          }
        ],
        examples: [
          { jp: '{旅行|りょこう}のまえに、{切符|きっぷ}を{買|か}っておきます。', romaji: 'Ryokō no mae ni, kippu o katte okimasu.', hu: 'Az utazás előtt előre megveszem a jegyet.' },
          { jp: 'ホテルを{予約|よやく}しておきました。', romaji: 'Hoteru o yoyaku shite okimashita.', hu: 'Előre lefoglaltam a szállodát.' },
          { jp: '{窓|まど}を{開|あ}けておいてください。', romaji: 'Mado o akete oite kudasai.', hu: 'Kérem, hagyja nyitva az ablakot.' },
          { jp: '{行|い}きかたを{調|しら}べておきます。', romaji: 'Ikikata o shirabete okimasu.', hu: 'Előre utánanézek, hogyan kell odamenni.' },
          { jp: '{出|で}かけるまえに、{携帯|けいたい}を{充電|じゅうでん}しておきましょう。', romaji: 'Dekakeru mae ni, keitai o jūden shite okimashō.', hu: 'Indulás előtt töltsük fel a telefont.' },
          { jp: '{飲|の}み{物|もの}を{冷|ひ}やしておきました。', romaji: 'Nomimono o hiyashite okimashita.', hu: 'Előre behűtöttem az italokat.' },
          { jp: 'そのままにしておいてください。', romaji: 'Sono mama ni shite oite kudasai.', hu: 'Hagyja úgy, ahogy van.' }
        ],
        notes: [
          'Beszédben a ておきます összevonódik: <b>〜ときます</b> / 〜とく ({買|か}っとく, {言|い}っとく); で után 〜どく ({読|よ}んどく).',
          'Tanácsként: <b>〜ておいたほうがいいです</b> — „jobb, ha előre…". {傘|かさ}を{用意|ようい}しておいたほうがいいですよ.'
        ],
        mistakes: [
          { bad: 'ホテルが{予約|よやく}しておきます。', good: 'ホテルを{予約|よやく}しておきます。', why: 'A ておきます cselekvés: a tárgya を-t kap. が-val az eredményt mondod: {予約|よやく}してあります.' }
        ]
      },
      {
        title: '〜ながら', sub: 'közben',
        pattern: 'ige ます-tő + ながら、főcselekvés',
        body: 'Ugyanaz az ember két dolgot csinál egyszerre. A ます-alakból elhagyod a ます-t, mögé <b>ながら</b> kerül; a fontosabb cselekvés áll a mondat végén.',
        more: [
          'Képzése: a ます-alakból elhagyod a ます-t, és a tő után ながら kerül: {聞|き}きます → {聞|き}きながら, {食|た}べます → {食|た}べながら, します → しながら.',
          'A két cselekvés <b>nem egyenrangú</b>. A ながら előtti a kísérő, mellékes; a mondat végén álló a fő cselekvés. {音楽|おんがく}を{聞|き}きながら{勉強|べんきょう}します: tanulok (ez a lényeg), és közben szól a zene. Megfordítva más a hangsúly: {勉強|べんきょう}しながら{音楽|おんがく}を{聞|き}きます — zenét hallgatok, mellette tanulgatok.',
          'A két cselekvést <b>ugyanaz az ember</b> végzi. Ha két különböző ember csinál valamit egy időben, ながら nem jó: arra a 〜とき való.',
          'Tágabb értelemben hosszabb időszakra is mondható: „munka mellett tanulok", „gyereket nevelve dolgozom" — ezek is ながら-s mondatok.'
        ],
        tables: [
          {
            caption: 'A ます-tő + ながら',
            head: ['ます-alak', '〜ながら', 'Jelentés'],
            rows: [
              ['ききます', 'ききながら', 'hallgatva'],
              ['たべます', 'たべながら', 'evés közben'],
              ['あるきます', 'あるきながら', 'séta közben'],
              ['みます', 'みながら', 'nézve'],
              ['はなします', 'はなしながら', 'beszélgetve'],
              ['します', 'しながら', 'csinálva']
            ]
          }
        ],
        examples: [
          { jp: '{音楽|おんがく}を{聞|き}きながら、{勉強|べんきょう}します。', romaji: 'Ongaku o kikinagara, benkyō shimasu.', hu: 'Zenehallgatás közben tanulok.' },
          { jp: '{歩|ある}きながら{話|はな}しましょう。', romaji: 'Arukinagara hanashimashō.', hu: 'Beszéljünk séta közben.' },
          { jp: 'テレビを{見|み}ながら{食|た}べないでください。', romaji: 'Terebi o minagara tabenaide kudasai.', hu: 'Kérem, ne egyen tévénézés közben.' },
          { jp: 'コーヒーを{飲|の}みながら{新聞|しんぶん}を{読|よ}みます。', romaji: 'Kōhī o nominagara shinbun o yomimasu.', hu: 'Kávézás közben újságot olvasok.' },
          { jp: '{歌|うた}を{歌|うた}いながら{料理|りょうり}をします。', romaji: 'Uta o utainagara ryōri o shimasu.', hu: 'Énekelve főzök.' },
          { jp: '{地図|ちず}を{見|み}ながら{歩|ある}きました。', romaji: 'Chizu o minagara arukimashita.', hu: 'A térképet nézve gyalogoltam.' },
          { jp: '{働|はたら}きながら{大学|だいがく}に{通|かよ}っています。', romaji: 'Hatarakinagara daigaku ni kayotte imasu.', hu: 'Munka mellett járok egyetemre.' }
        ],
        notes: [
          'Pillanatnyi igével (megérkezik, leül, megáll) nem áll: a ながら előtti cselekvésnek tartania kell.',
          'A séta közbeni telefonozásnak külön neve van: <b>{歩|ある}きスマホ</b>. Az állomásokon plakátok kérik, hogy ne tedd.'
        ],
        mistakes: [
          { bad: '{聞|き}くながら{勉強|べんきょう}します。', good: '{聞|き}きながら{勉強|べんきょう}します。', why: 'A ながら a ます-tőhöz kapcsolódik, nem a szótári alakhoz.' },
          { bad: '{母|はは}が{料理|りょうり}をしながら、{父|ちち}はテレビを{見|み}ます。', good: '{母|はは}が{料理|りょうり}をしているとき、{父|ちち}はテレビを{見|み}ます。', why: 'A ながら két cselekvését ugyanaz az ember végzi. Két embernél 〜とき kell.' }
        ]
      }
    ],
    phrases: [
      { jp: 'え、いいんですか。', romaji: 'E, ii n desu ka.', hu: 'Tényleg nem gond?', note: 'Ajánlat elfogadása előtt mondod.' },
      { jp: 'どのくらいかかりますか。', romaji: 'Dono kurai kakarimasu ka.', hu: 'Mennyi ideig tart?' },
      { jp: '{朝|あさ}{早|はや}く{出|で}たほうがいいですね。', romaji: 'Asa hayaku deta hō ga ii desu ne.', hu: 'Jobb lesz korán indulni.' },
      { jp: 'ほかに{何|なに}かしておくことはありますか。', romaji: 'Hoka ni nani ka shite oku koto wa arimasu ka.', hu: 'Van még valami, amit előre el kell intézni?' },
      { jp: 'そういえば…', romaji: 'Sō ieba…', hu: 'Erről jut eszembe…', note: 'Így váltasz témát, ha valamiről eszedbe jutott valami.' },
      { jp: '{道|みち}が{込|こ}んでいます。', romaji: 'Michi ga konde imasu.', hu: 'Dugó van az úton.' },
      { jp: '{真|ま}ん{中|なか}に{立|た}ってください。', romaji: 'Mannaka ni tatte kudasai.', hu: 'Álljon középre!' },
      { jp: 'はい、チーズ！', romaji: 'Hai, chīzu!', hu: 'Mondjátok: csíz!', note: 'Fényképezés előtt.' },
      { jp: '{助|たす}かりました。', romaji: 'Tasukarimashita.', hu: 'Nagy segítség volt, köszönöm.' },
      { jp: 'お{願|ねが}いしてもいいですか。', romaji: 'Onegai shite mo ii desu ka.', hu: 'Megkérhetem valamire?' }
    ],
    words: [
      {
        title: 'Kirándulás',
        items: [
          { jp: '{日帰|ひがえ}り', romaji: 'higaeri', hu: 'egynapos út' },
          { jp: 'ツアー', romaji: 'tsuā', hu: 'szervezett út' },
          { jp: 'ガイド', romaji: 'gaido', hu: 'idegenvezető' },
          { jp: '{観光|かんこう}', romaji: 'kankō', hu: 'városnézés, turizmus' },
          { jp: '{景色|けしき}', romaji: 'keshiki', hu: 'táj, kilátás' },
          { jp: 'お{城|しろ}', romaji: 'o-shiro', hu: 'vár' },
          { jp: '{村|むら}', romaji: 'mura', hu: 'falu' },
          { jp: '{案内|あんない}します', romaji: 'annai shimasu', hu: 'körbevezet' },
          { jp: '{戻|もど}ります', romaji: 'modorimasu', hu: 'visszatér' }
        ]
      },
      {
        title: 'Készülődés',
        items: [
          { jp: '{調|しら}べます', romaji: 'shirabemasu', hu: 'utánanéz' },
          { jp: '{用意|ようい}します', romaji: 'yōi shimasu', hu: 'előkészít' },
          { jp: '{充電|じゅうでん}します', romaji: 'jūden shimasu', hu: 'feltölt (akkumulátort)' },
          { jp: '{予約|よやく}します', romaji: 'yoyaku shimasu', hu: 'lefoglal' },
          { jp: '{頼|たの}みます', romaji: 'tanomimasu', hu: 'megkér' },
          { jp: '{込|こ}みます', romaji: 'komimasu', hu: 'zsúfolt lesz, bedugul' },
          { jp: '{連|つ}れていきます', romaji: 'tsurete ikimasu', hu: 'elvisz (embert)' },
          { jp: '{持|も}っていきます', romaji: 'motte ikimasu', hu: 'elvisz (tárgyat)' },
          { jp: '{迎|むか}えにいきます', romaji: 'mukae ni ikimasu', hu: 'elmegy valaki elé' }
        ]
      },
      {
        title: 'Szívességek',
        note: 'Ezek után áll leggyakrabban てあげます, てくれます, てもらいます.',
        items: [
          { jp: '{貸|か}します', romaji: 'kashimasu', hu: 'kölcsönad' },
          { jp: '{手伝|てつだ}います', romaji: 'tetsudaimasu', hu: 'segít' },
          { jp: '{直|なお}します', romaji: 'naoshimasu', hu: 'megjavít, kijavít' },
          { jp: '{見|み}せます', romaji: 'misemasu', hu: 'megmutat' },
          { jp: '{教|おし}えます', romaji: 'oshiemasu', hu: 'megtanít, megmond' },
          { jp: '{送|おく}ります', romaji: 'okurimasu', hu: 'elkísér; elküld' },
          { jp: '{助|たす}けます', romaji: 'tasukemasu', hu: 'kisegít, megment' }
        ]
      }
    ],
    culture: [
      {
        title: 'A hála benne van az igében',
        text: 'A japán beszélő folyamatosan jelzi, <b>kinek jó</b> az, ami történik. Ha valaki érted tett valamit, és てくれます vagy てもらいます nélkül meséled el, az olyan, mintha a szívességet észre sem vetted volna. A köszönet is más: ha valaki fáradt miattad, a japán gyakran nem azt mondja, ありがとう, hanem azt, <b>すみません</b> — „elnézést a fáradságért". A kettő nem zárja ki egymást: sokszor együtt hangzanak el.'
      },
      {
        title: 'Ajándék az útról',
        text: 'Aki elutazik, az otthon maradottaknak — a családnak, a kollégáknak, az osztálytársaknak — <b>お{土産|みやげ}</b>-t visz: többnyire a környék jellegzetes édességét, egyenként csomagolva, hogy mindenkinek jusson. Ez nem nagy ajándék, inkább gesztus: „gondoltam rátok". Ezért van minden japán állomáson és repülőtéren hosszú sor ajándékbolt.'
      },
      {
        title: 'Fényképezés',
        text: 'A japánok is azt mondják kattintás előtt: <b>はい、チーズ</b>. A fényképeken gyakori a két ujjal mutatott V-jel (ピース). Embereket fényképezni engedély nélkül illetlen; szentélyben, templomban, múzeumban gyakran tilos: a tábla felirata {撮影禁止|さつえいきんし}. Érdekesség: a Japánban árult telefonok kamerája mindig hangot ad, a kattanás nem kapcsolható ki.'
      },
      {
        title: 'Fából épült ország',
        text: 'A japán vendégek Európában a több száz éves kőépületeket csodálják meg: Japánban a hagyományos házak, templomok, szentélyek <b>fából</b> épültek. A földrengések, a tűz és a párás éghajlat miatt kevés az igazán régi épület; sokat újra és újra felépítettek. A híres várak tornyai közül is csak tizenkettő maradt meg eredeti formájában.'
      }
    ],
    quiz: [
      { q: '„Kölcsönadtam az esernyőmet a barátomnak." Mi hiányzik?', jp: '{友|とも}だちに{傘|かさ}を{貸|か}して＿。', a: 'あげました', wrong: ['くれました', 'もらいました', 'おきました'], why: 'Én teszek szívességet másnak: てあげます.' },
      { q: '„Anyám készített nekem uzsonnát." Mi hiányzik?', jp: '{母|はは}がお{弁当|べんとう}を{作|つく}って＿。', a: 'くれました', wrong: ['あげました', 'もらいました', 'いきました'], why: 'Nekem tesz szívességet, és ő az alany: てくれます.' },
      { q: '„Megkértem a barátomat, hogy fényképezzen le." Mi hiányzik?', jp: '{友|とも}だち＿{写真|しゃしん}を{撮|と}ってもらいました。', a: 'に', wrong: ['が', 'を', 'で'], why: 'A てもらいます mellett a segítő に-t kap.' },
      {
        q: 'Melyik mondat jelenti: „A nővérem tanított angolra."',
        a: '{姉|あね}に{英語|えいご}を{教|おし}えてもらいました。',
        wrong: [
          '{姉|あね}に{英語|えいご}を{教|おし}えてあげました。',
          '{姉|あね}が{英語|えいご}を{教|おし}えてもらいました。',
          '{姉|あね}に{英語|えいご}を{教|おし}えてくれました。'
        ],
        why: 'Én kaptam a szívességet (alany: én), a nővérem に-t kap: てもらいました.'
      },
      { q: '„Előre lefoglaltam a szállodát." Mi hiányzik?', jp: 'ホテルを{予約|よやく}して＿。', a: 'おきました', wrong: ['いきました', 'くれました', 'あげました'], why: 'Előre, későbbi cél érdekében: ておきます.' },
      { q: '„Zenehallgatás közben tanulok." Mi hiányzik?', jp: '{音楽|おんがく}を＿ながら、{勉強|べんきょう}します。', a: '{聞|き}き', wrong: ['{聞|き}いて', '{聞|き}く', '{聞|き}いた'], why: 'A ながら előtt a ます-tő áll: {聞|き}きます → {聞|き}き.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けておいてください。', a: 'Kérem, hagyja nyitva az ablakot.', wrong: ['Kérem, csukja be az ablakot.', 'Kinyithatom az ablakot?', 'Az ablak ki van nyitva.'], why: 'ておきます: úgy hagyni, ahogy van.' },
      { q: 'Mit jelent: {手伝|てつだ}ってくれて、ありがとう。', a: 'Köszi, hogy segítettél.', wrong: ['Segítsek?', 'Köszi, de nem kell segítség.', 'Kérlek, segíts.'], why: 'てくれて、ありがとう: köszönet azért, amit értem tettek.' },
      { q: '„Beszéljünk séta közben." Mi hiányzik?', jp: '＿ながら{話|はな}しましょう。', a: '{歩|ある}き', wrong: ['{歩|ある}いて', '{歩|ある}く', '{歩|ある}か'], why: 'ます-tő + ながら: {歩|ある}きます → {歩|ある}き.' },
      {
        q: 'Mit jelent: {兄|あに}が{自転車|じてんしゃ}を{直|なお}してくれました。',
        a: 'A bátyám megjavította nekem a biciklit.',
        wrong: [
          'Megjavítottam a bátyám biciklijét.',
          'A bátyám megjavíttatta a biciklijét.',
          'A bátyámmal együtt javítottuk a biciklit.'
        ],
        why: 'てくれました: a bátyám (が) tette meg nekem.'
      },
      {
        q: 'Te kaptad a szívességet. Melyik mondat helyes: „A barátom kölcsönadta az esernyőjét."',
        a: '{友|とも}だちが{傘|かさ}を{貸|か}してくれました。',
        wrong: ['{友|とも}だちが{傘|かさ}を{貸|か}してあげました。', '{友|とも}だちが{傘|かさ}を{貸|か}してもらいました。', '{友|とも}だちに{傘|かさ}を{貸|か}してくれました。'],
        why: 'Ha más tesz szívességet neked, a segítő が-t kap, az ige てくれます.'
      },
      { q: '„Köszi, hogy eljöttél." Mi hiányzik?', jp: '{来|き}て＿、ありがとう。', a: 'くれて', wrong: ['あげて', 'おいて', 'しまって'], why: 'A köszönet okát a くれます て-alakja vezeti be: 〜てくれて、ありがとう.' },
      { q: '„A nővérem levágta a hajam (megkértem rá)." Mi hiányzik?', jp: '{私|わたし}は{姉|あね}に{髪|かみ}を{切|き}って＿。', a: 'もらいました', wrong: ['くれました', 'あげました', 'おきました'], why: 'Ha te vagy az alany, és a segítő に-t kap, az ige てもらいます.' },
      {
        q: 'Miért ne mondd a tanárodnak szemtől szemben: {持|も}ってあげます?',
        a: 'Mert felettesnek lekezelően hat.',
        wrong: ['Mert nyelvtanilag hibás.', 'Mert csak múlt időben használható.', 'Mert csak tárgyakra mondható.'],
        why: 'A てあげます kimondja, hogy szívességet teszel; felettesnek inkább: {持|も}ちましょうか.'
      },
      {
        q: 'Mit jelent: {行|い}きかたを{調|しら}べておきます。',
        a: 'Előre utánanézek, hogyan kell odamenni.',
        wrong: [
          'Már utánanéztek, hogyan kell odamenni.',
          'Éppen azt nézem, hogyan kell odamenni.',
          'Megkérek valakit, hogy nézzen utána.'
        ],
        why: 'A ておきます előkészületet jelent: egy későbbi cél érdekében előre megteszed.'
      },
      {
        q: 'Melyik mondat írja le az eredményt (és nem a cselekvést)?',
        a: 'ホテルが{予約|よやく}してあります。',
        wrong: ['ホテルを{予約|よやく}しておきます。', 'ホテルを{予約|よやく}しましょう。', 'ホテルを{予約|よやく}してください。'],
        why: 'A ておきます az előkészítő cselekvés; az eredménye a てあります: „le van foglalva".'
      },
      { q: '„Kávézás közben újságot olvasok." Mi hiányzik?', jp: 'コーヒーを＿ながら{新聞|しんぶん}を{読|よ}みます。', a: '{飲|の}み', wrong: ['{飲|の}む', '{飲|の}んで', '{飲|の}ま'], why: 'A ながら a ます-tőhöz kapcsolódik: {飲|の}みます → {飲|の}みながら.' },
      {
        q: 'Melyik a fő cselekvés: {音楽|おんがく}を{聞|き}きながら{勉強|べんきょう}します。',
        a: 'A tanulás.',
        wrong: ['A zenehallgatás.', 'Mindkettő egyformán.', 'Egyik sem: a mondat szokást ír le.'],
        why: 'A ながら előtti rész a kísérő cselekvés; a fő cselekvés a mondat végén áll.'
      },
      {
        q: 'Mit tesz hozzá a てあげたい a {見|み}せたいです mondathoz?',
        a: 'Azt, hogy a másik örömére szeretném megtenni.',
        wrong: ['Azt, hogy már megtettem.', 'Azt, hogy kötelező megtennem.', 'Azt, hogy más teszi meg helyettem.'],
        why: '{見|み}せてあげたいです: szeretném, ha ő is láthatná — a szívesség a másiknak szól.'
      },
      { q: '„Elnézést, lefényképezne?" Mi hiányzik?', jp: 'すみません、{写真|しゃしん}を{撮|と}って＿。', a: 'もらえますか', wrong: ['あげますか', 'おきますか', 'ありますか'], why: 'Szívességet a もらいます ható alakjával kérsz: 〜てもらえますか.' }
    ]
  },

  /* ── 23. lecke ────────────────────────────────────── */
  {
    id: 'l23', no: 23, book: 'Dekiru 1', title: 'Udvarias kérések',
    lead: 'Tisztelettel beszélsz arról, amit érted tettek, udvariasan kérsz szívességet, kínálsz és elfogadsz ételt, megmondod, miből készül valami, és megtanulod, hogyan lesz főnév az igéből a の segítségével.',
    cando: [
      'Megköszönöd a tanárodnak vagy egy idősebb embernek, amit érted tett.',
      'Udvariasan megkérsz valakit egy szívességre.',
      'Étellel kínálsz, repetát kérsz, és udvariasan elhárítod, ha már nem kérsz többet.',
      'Elmondod, mit szeretsz csinálni, és miből készül egy étel.'
    ],
    intro: [
      'Az előző leckében megtanultad, hogyan fejezi ki a japán a szívességet: てあげます, てくれます, てもらいます. Ezek barátok, családtagok, egyenrangúak között jók. Ha azonban tanárról, főnökről, idős emberről, vendégről van szó, mindhárom ige <b>tiszteleti párjára</b> vált — ugyanúgy, ahogy a 18. leckében az あげます → さしあげます, a くれます → くださいます, a もらいます → いただきます.',
      'Erre épül az <b>udvarias kérés</b> is. A japán nem azt kérdezi: „megtenné?", hanem azt: „megkaphatnám öntől azt a szívességet, hogy…?" — 〜ていただけませんか. Minél közvetettebb a kérés, annál udvariasabb; a legfinomabb forma be sem fejezi a mondatot.',
      'A lecke helyzete egy közös ebéd. Megtanulod, hogyan kínálnak japánul, hogyan fogadod el és hogyan hárítod el udvariasan a repetát, hogyan mondod meg, miből készül egy étel, és — a の segítségével — hogyan beszélsz arról, mit szeretsz <i>csinálni</i>.'
    ],
    dialogue: {
      title: 'Ebéd a nagymamánál',
      scene: 'Anna nagymamája a Balatonnál lakik, és a kertben ebéddel várja a lányokat. (A nagymama szavait Anna fordítja; itt japánul olvasod.)',
      lines: [
        { who: 'Nagymama', jp: 'さあ、どうぞ。{遠慮|えんりょ}しないで、たくさん{食|た}べてくださいね。', romaji: 'Sā, dōzo. Enryo shinaide, takusan tabete kudasai ne.', hu: 'Tessék csak! Ne szerénykedj, egyél sokat.' },
        {
          who: 'Jui',
          jp: 'いただきます。この{冷|つめ}たいスープ、おいしいですね。{何|なに}で{作|つく}るんですか。',
          romaji: 'Itadakimasu. Kono tsumetai sūpu, oishii desu ne. Nani de tsukuru n desu ka.',
          hu: 'Köszönöm, jó étvágyat! Ez a hideg leves nagyon finom. Miből készül?'
        },
        { who: 'Anna', jp: 'サワーチェリーで{作|つく}ります。「メッジレヴェシュ」といいます。', romaji: 'Sawā cherī de tsukurimasu. "Mejjireveshu" to iimasu.', hu: 'Meggyből készül. Meggylevesnek hívják.' },
        { who: 'Jui', jp: '{外|そと}で{食|た}べるのは{気持|きも}ちがいいですね。', romaji: 'Soto de taberu no wa kimochi ga ii desu ne.', hu: 'De jó a szabadban enni!' },
        { who: 'Nagymama', jp: 'スープをもう{一杯|いっぱい}いかがですか。まだたくさんありますよ。', romaji: 'Sūpu o mō ippai ikaga desu ka. Mada takusan arimasu yo.', hu: 'Kérsz még egy tányér levest? Még bőven van.' },
        { who: 'Jui', jp: 'ありがとうございます。じゃあ、もう{少|すこ}しだけいただきます。', romaji: 'Arigatō gozaimasu. Jā, mō sukoshi dake itadakimasu.', hu: 'Köszönöm. Akkor még egy keveset kérek.' },
        { who: 'Nagymama', jp: 'パンももっとどうぞ。', romaji: 'Pan mo motto dōzo.', hu: 'Vegyél még kenyeret is!' },
        { who: 'Jui', jp: 'いえ、もうおなかがいっぱいです。もう{何|なに}も{入|はい}りません。', romaji: 'Ie, mō onaka ga ippai desu. Mō nani mo hairimasen.', hu: 'Nem, köszönöm, már tele vagyok. Egy falat sem fér belém.' },
        { who: 'Anna', jp: 'デザートのケーキもありますが…。', romaji: 'Dezāto no kēki mo arimasu ga…', hu: 'Pedig süti is van desszertnek…' },
        { who: 'Jui', jp: 'えっ、ケーキ？{甘|あま}いものは{別腹|べつばら}です！', romaji: 'E, kēki? Amai mono wa betsubara desu!', hu: 'Süti? Az édességnek külön gyomrom van!' },
        { who: 'Jui', jp: 'あの、このスープの{作|つく}り{方|かた}を{教|おし}えていただけませんか。', romaji: 'Ano, kono sūpu no tsukurikata o oshiete itadakemasen ka.', hu: 'Ö… megtanítaná, hogyan készül ez a leves?' },
        { who: 'Nagymama', jp: 'もちろん。あとでレシピを{書|か}いてあげますね。', romaji: 'Mochiron. Ato de reshipi o kaite agemasu ne.', hu: 'Hát persze. Később leírom neked a receptet.' },
        { who: 'Jui', jp: 'おばあさんがレシピを{書|か}いてくださいました。{日本|にほん}で{作|つく}ってみます。', romaji: 'Obāsan ga reshipi o kaite kudasaimashita. Nihon de tsukutte mimasu.', hu: 'A nagymamád leírta nekem a receptet. Japánban kipróbálom.' }
      ],
      notes: [
        'Az <b>{遠慮|えんりょ}しないで</b> („ne fogd vissza magad") a vendéglátó állandó fordulata. A japán vendég illemből szabadkozik; ezzel biztatják.',
        'A <b>{何|なに}で{作|つく}るんですか</b> で-je az alapanyagra kérdez. Itt なにで a kiejtés: a なんで „miért"-et is jelenthetne.',
        'Egyetlen beszélgetésben négyféle もう / まだ: <b>もう{一杯|いっぱい}</b> (még egy tányérral), <b>まだ</b>たくさんあります (még bőven van), <b>もう</b>おなかがいっぱい (már tele vagyok), <b>もう</b>{何|なに}も{入|はい}りません (már semmi sem fér belém).',
        'Az <b>いっぱい</b> kétszer szerepel, két jelentésben: {一杯|いっぱい} = egy tányérnyi; おなかがいっぱい = tele a hasam.',
        'A nagymama <b>{書|か}いてあげます</b>-t mond: idősebb a fiatalabbnak megteheti. Jui viszont tisztelettel beszél róla: <b>{書|か}いてくださいました</b>.',
        'A <b>{別腹|べつばら}</b> szó szerint „külön gyomor": tréfás kifogás arra, hogy desszert akkor is belefér, ha már jóllaktál.'
      ]
    },
    points: [
      {
        title: '〜てくださいます・〜ていただきます', sub: 'megteszi nekem (tisztelettel)',
        pattern: 'A が 〜てくださいます · A に 〜ていただきます',
        body: 'A てくれます és a てもらいます tiszteleti párjai: akkor használod, ha tanár, főnök vagy idősebb ember tett érted valamit. A partikulák nem változnak.',
        more: [
          'A 18. leckében megismerted a くださいます és az いただきます igét tárgyak átadásánál. Itt cselekvésre kerülnek: ugyanaz történik, mint a てくれます és a てもらいます esetében, csak a segítő <b>rangban feletted áll</b>, vagy kívül esik a saját körödön (tanár, főnök, idős ember, vendég, ügyfél).',
          'A partikulák nem változnak: a てくださいます mellett a segítő az alany (が / は), a ていただきます mellett te vagy az alany, a segítő に-t kap.',
          'Köszönetben: <b>〜てくださって、ありがとうございます</b> vagy <b>〜ていただいて、ありがとうございます</b>. A kettő közül az いただいて a szerényebb: nem azt mondja, „ön megtette", hanem azt, „én megkaptam".',
          'A くださいます rendhagyó: ます-alakja くださ<b>い</b>ます (nem „くださります"). Ugyanebből az igéből való a 〜てください kérés.'
        ],
        tables: [
          {
            caption: 'A szívesség igéi két szinten',
            head: ['', 'Hétköznapi', 'Tiszteleti'],
            rows: [
              ['én teszem másnak', '〜てあげます', '〜てさしあげます'],
              ['más teszi nekem', '〜てくれます', '〜てくださいます'],
              ['én kapom mástól', '〜てもらいます', '〜ていただきます']
            ]
          }
        ],
        examples: [
          { jp: '{先生|せんせい}が{作文|さくぶん}を{直|なお}してくださいました。', romaji: 'Sensei ga sakubun o naoshite kudasaimashita.', hu: 'A tanár kijavította a fogalmazásomat.' },
          { jp: '{先生|せんせい}に{日本語|にほんご}を{教|おし}えていただきました。', romaji: 'Sensei ni nihongo o oshiete itadakimashita.', hu: 'A tanár úr tanított japánra.' },
          { jp: '{部長|ぶちょう}が{駅|えき}まで{送|おく}ってくださいました。', romaji: 'Buchō ga eki made okutte kudasaimashita.', hu: 'Az osztályvezető kivitt az állomásra.' },
          { jp: '{先生|せんせい}が{本|ほん}を{貸|か}してくださいました。', romaji: 'Sensei ga hon o kashite kudasaimashita.', hu: 'A tanár úr kölcsönadott nekem egy könyvet.' },
          { jp: '{説明|せつめい}してくださって、ありがとうございます。', romaji: 'Setsumei shite kudasatte, arigatō gozaimasu.', hu: 'Köszönöm, hogy elmagyarázta.' },
          { jp: '{山田|やまだ}さんのお{母|かあ}さんに{料理|りょうり}を{教|おし}えていただきました。', romaji: 'Yamada-san no okāsan ni ryōri o oshiete itadakimashita.', hu: 'Jamada édesanyja megtanított főzni.' },
          { jp: '{今日|きょう}は{来|き}ていただいて、ありがとうございます。', romaji: 'Kyō wa kite itadaite, arigatō gozaimasu.', hu: 'Köszönöm, hogy ma eljött.' }
        ],
        notes: [
          'A saját családodról kifelé beszélve nem használsz tiszteleti alakot: {母|はは}が{作|つく}ってくれました (nem くださいました).',
          'Segédigeként mindkettőt többnyire kanával írják, kanji nélkül.'
        ],
        mistakes: [
          { bad: '{先生|せんせい}に{教|おし}えてくださいました。', good: '{先生|せんせい}が{教|おし}えてくださいました。', why: 'A てくださいます mellett a segítő az alany: が. A に a ていただきます mellé való.' },
          { bad: '{先生|せんせい}が{教|おし}えていただきました。', good: '{先生|せんせい}に{教|おし}えていただきました。', why: 'A ていただきます alanya te vagy; a tanár に-t kap.' }
        ]
      },
      {
        title: '〜てさしあげます', sub: 'megteszem (tisztelettel)',
        pattern: 'A に + ige て-alak + さしあげます',
        body: 'A てあげます tiszteleti párja. Másnak mesélve használható; annak, akinek segítesz, közvetlenül nem mondjuk, mert kérkedésnek hat.',
        more: [
          'Ez a てあげます tiszteleti párja: te (vagy valaki a körödből) teszel szívességet egy rangban feletted állónak. Nyelvtanilag egyszerű, a <b>használata kényes</b>.',
          'Japán füllel a szívesség hangoztatása fölényt sugall: aki azt mondja valakinek, {持|も}ってさしあげます, az mintegy közli vele, hogy rászorul. Ezért <b>szemtől szemben szinte soha</b> nem mondják. Helyette felajánlás áll: {持|も}ちましょうか, még szerényebben お{持|も}ちしましょうか (39. lecke).',
          'Akkor természetes, ha <b>harmadik embernek mesélsz</b> arról, mit tettél egy tiszteletet érdemlő emberért, vagy ha a vendéglátásról beszélsz általában.'
        ],
        examples: [
          { jp: 'お{客|きゃく}さんに{町|まち}を{案内|あんない}してさしあげました。', romaji: 'Okyaku-san ni machi o annai shite sashiagemashita.', hu: 'Körbevezettem a vendéget a városban.' },
          { jp: '{先生|せんせい}の{荷物|にもつ}を{持|も}ってさしあげました。', romaji: 'Sensei no nimotsu o motte sashiagemashita.', hu: 'Vittem a tanár úr csomagját.' },
          { jp: 'お{年寄|としよ}りに{席|せき}を{譲|ゆず}ってさしあげます。', romaji: 'Otoshiyori ni seki o yuzutte sashiagemasu.', hu: 'Átadom a helyem az időseknek.' },
          { jp: '{観光客|かんこうきゃく}に{駅|えき}までの{道|みち}を{教|おし}えてさしあげました。', romaji: 'Kankōkyaku ni eki made no michi o oshiete sashiagemashita.', hu: 'Megmutattam a turistának az állomáshoz vezető utat.' },
          { jp: 'お{客|きゃく}さんにお{茶|ちゃ}を{入|い}れてさしあげてください。', romaji: 'O-kyaku-san ni o-cha o irete sashiagete kudasai.', hu: 'Kérem, készítsen teát a vendégnek.' }
        ],
        notes: ['A három tiszteleti alak közül ezt fogod a legritkábban használni; felismerned viszont kell.'],
        mistakes: [
          { bad: '{先生|せんせい}、かばんを{持|も}ってさしあげます。', good: '{先生|せんせい}、かばんをお{持|も}ちしましょうか。', why: 'Szemtől szemben a てさしあげます kérkedésnek hat; a szerény felajánlás a helyes.' }
        ]
      },
      {
        title: '〜てくれませんか・〜ていただけませんか', sub: 'megtenné…?',
        pattern: 'ige て-alak + くれませんか / いただけませんか',
        body: 'A kérés annál udvariasabb, minél közvetettebb. Barátnak: <b>〜てくれませんか</b>. Tanárnak, idegennek: <b>〜ていただけませんか</b>. A legóvatosabb a befejezetlen <b>〜ていただきたいんですが…</b>',
        more: [
          'A japán kérés annál udvariasabb, minél <b>közvetettebb</b>. A lépcsők: utasításszerű 〜てください → kérdés 〜てくれますか → tagadó kérdés 〜てくれませんか → a „kapni" ige ható alakja tagadó kérdésben: 〜ていただけませんか.',
          'A tagadó kérdés (〜ませんか) azért udvariasabb, mert könnyebb rá nemet mondani: „nem tenné meg…?".',
          'A legfinomabb forma be sem fejezi a kérést: <b>〜ていただきたいんですが…</b> („szeretném megkérni, hogy…"). A mondat a が-nál elhalkul, és a másikra bízza a választ.',
          'A kérést rendszerint <b>bevezeted</b>: すみませんが…, ちょっとお{願|ねが}いがあるんですが…. Így a másik fel tud készülni rá, hogy kérni fogsz valamit.'
        ],
        tables: [
          {
            caption: 'A kérés lépcsői',
            head: ['Kinek?', 'Alak', 'Példa'],
            rows: [
              ['barátnak, családnak', '〜てくれる？', 'てつだってくれる？'],
              ['ismerősnek, kollégának', '〜てくれませんか', 'てつだってくれませんか。'],
              ['ismeretlennek, eladónak', '〜てもらえませんか', 'てつだってもらえませんか。'],
              ['tanárnak, főnöknek', '〜ていただけませんか', 'てつだっていただけませんか。'],
              ['nagyon óvatosan', '〜ていただきたいんですが…', 'てつだっていただきたいんですが…']
            ]
          }
        ],
        examples: [
          { jp: 'ちょっと{手伝|てつだ}ってくれませんか。', romaji: 'Chotto tetsudatte kuremasen ka.', hu: 'Segítenél egy kicsit?' },
          { jp: '{駅|えき}へ{行|い}く{道|みち}を{教|おし}えていただけませんか。', romaji: 'Eki e iku michi o oshiete itadakemasen ka.', hu: 'Megmondaná, merre van az állomás?' },
          { jp: 'この{書類|しょるい}を{見|み}ていただきたいんですが。', romaji: 'Kono shorui o mite itadakitai n desu ga.', hu: 'Szeretném megkérni, hogy nézze át ezt az iratot.' },
          { jp: 'すみませんが、もう{少|すこ}しゆっくり{話|はな}していただけませんか。', romaji: 'Sumimasen ga, mō sukoshi yukkuri hanashite itadakemasen ka.', hu: 'Elnézést, beszélne egy kicsit lassabban?' },
          { jp: '{塩|しお}を{取|と}ってくれませんか。', romaji: 'Shio o totte kuremasen ka.', hu: 'Ideadnád a sót?' },
          { jp: '{窓|まど}を{閉|し}めてもらえませんか。', romaji: 'Mado o shimete moraemasen ka.', hu: 'Becsukná az ablakot?' },
          { jp: 'この{漢字|かんじ}の{読|よ}み{方|かた}を{教|おし}えていただきたいんですが…。', romaji: 'Kono kanji no yomikata o oshiete itadakitai n desu ga…', hu: 'Szeretném megkérdezni, hogyan kell olvasni ezt a kanjit…' }
        ],
        notes: [
          'Igen: いいですよ / はい、わかりました. Elhárításnál nem hangzik el kerek „nem": すみません、ちょっと… („elnézést, most nem igazán…").',
          'Az いただ<b>け</b>ませんか ható alak: „megkaphatnám-e". Egyetlen betű a különbség, de az いただきませんか nem kérés.'
        ],
        mistakes: [
          { bad: '{教|おし}えていただきませんか。', good: '{教|おし}えていただけませんか。', why: 'Kéréshez az いただきます ható alakja kell: いただけます.' },
          { bad: '{先生|せんせい}、{教|おし}えてくれませんか。', good: '{先生|せんせい}、{教|おし}えていただけませんか。', why: 'Tanárnak a くれませんか túl közvetlen.' }
        ]
      },
      {
        title: '〜の', sub: 'igéből főnév',
        pattern: 'szótári alak + の + が / は / を',
        body: 'A <b>の</b> is főnévvé teszi az igét, mint a こと: „az, hogy…". Leggyakrabban a {好|す}き, {上手|じょうず}, {大変|たいへん}, {忘|わす}れる előtt hallod.',
        more: [
          'A の a rövid (egyszerű) alakú ige után áll, és az egész tagmondatot főnévvé teszi. Utána ugyanazok a partikulák jönnek, mint bármely főnév után: の<b>が</b>{好|す}きです, の<b>は</b>{大変|たいへん}です, の<b>を</b>{忘|わす}れました.',
          '<b>のが</b>: képesség és érzés — {好|す}き, {嫌|きら}い, {上手|じょうず}, {下手|へた}, {速|はや}い, {遅|おそ}い. <b>のは</b>: értékelés — {楽|たの}しい, {難|むずか}しい, {大変|たいへん}, {危|あぶ}ない. <b>のを</b>: {忘|わす}れます, {見|み}ます, {聞|き}きます, {手伝|てつだ}います.',
          'の vagy こと? Sok helyen mindkettő jó: {読|よ}むのが{好|す}きです = {読|よ}むことが{好|す}きです. <b>Csak こと</b> áll a です előtt és a rögzült szerkezetekben (ことができます, ことがあります, ことにします). <b>Csak の</b> áll, ha a saját szemeddel látod vagy a saját füleddel hallod, ami történik.'
        ],
        tables: [
          {
            caption: 'の vagy こと?',
            head: ['Mi következik utána?', 'Melyik?', 'Példa'],
            rows: [
              ['すき, じょうず, たいへん', 'の (こと is jó)', 'およぐ<b>の</b>が すきです。'],
              ['です', 'csak こと', 'しゅみは およぐ<b>こと</b>です。'],
              ['できます, あります', 'csak こと', 'およぐ<b>こと</b>が できます。'],
              ['みます, ききます', 'csak の', 'およいでいる<b>の</b>を みました。'],
              ['わすれます', 'の', 'かう<b>の</b>を わすれました。']
            ]
          }
        ],
        examples: [
          { jp: '{料理|りょうり}を{作|つく}るのが{好|す}きです。', romaji: 'Ryōri o tsukuru no ga suki desu.', hu: 'Szeretek főzni.' },
          { jp: '{朝|あさ}{早|はや}く{起|お}きるのは{大変|たいへん}です。', romaji: 'Asa hayaku okiru no wa taihen desu.', hu: 'Korán kelni nehéz.' },
          { jp: '{宿題|しゅくだい}を{持|も}ってくるのを{忘|わす}れました。', romaji: 'Shukudai o motte kuru no o wasuremashita.', hu: 'Elfelejtettem elhozni a leckét.' },
          { jp: '{外|そと}で{食|た}べるのが{大好|だいす}きです。', romaji: 'Soto de taberu no ga daisuki desu.', hu: 'Nagyon szeretek a szabadban enni.' },
          { jp: '{一人|ひとり}で{旅行|りょこう}するのは{楽|たの}しいです。', romaji: 'Hitori de ryokō suru no wa tanoshii desu.', hu: 'Jó egyedül utazni.' },
          { jp: '{電話|でんわ}をするのを{忘|わす}れました。', romaji: 'Denwa o suru no o wasuremashita.', hu: 'Elfelejtettem telefonálni.' },
          { jp: '{子|こ}どもたちが{歌|うた}っているのを{聞|き}きました。', romaji: 'Kodomo-tachi ga utatte iru no o kikimashita.', hu: 'Hallottam, ahogy a gyerekek énekelnek.' },
          { jp: '{山田|やまだ}さんは{走|はし}るのが{速|はや}いです。', romaji: 'Yamada-san wa hashiru no ga hayai desu.', hu: 'Jamada gyorsan fut.' }
        ],
        notes: [
          'A 13. leckében a の főnevet helyettesített ({赤|あか}いの = a piros). Ugyanaz a の: ott egy tárgy, itt egy cselekvés helyén áll.',
          'Múlt és tagadó rövid alak után is állhat: {行|い}かなかったのは{残念|ざんねん}です („kár, hogy nem mentem el").'
        ],
        mistakes: [
          { bad: '{料理|りょうり}を{作|つく}りますのが{好|す}きです。', good: '{料理|りょうり}を{作|つく}るのが{好|す}きです。', why: 'A の előtt rövid alak áll, nem ます-alak.' },
          { bad: '{料理|りょうり}を{作|つく}るが{好|す}きです。', good: '{料理|りょうり}を{作|つく}るのが{好|す}きです。', why: 'Ige után nem állhat közvetlenül が: előbb főnévvé kell tenni の-val.' },
          { bad: '{趣味|しゅみ}は{本|ほん}を{読|よ}むのです。', good: '{趣味|しゅみ}は{本|ほん}を{読|よ}むことです。', why: 'A です előtt こと áll.' }
        ],
        tip: 'A です előtt こと áll, nem の: {趣味|しゅみ}は{本|ほん}を{読|よ}むことです.'
      },
      {
        title: 'まだ〜ます・もう〜ません', sub: 'még mindig · már nem',
        pattern: 'まだ + állítás · もう + tagadás',
        body: 'A 14. leckében a もう „már", a まだ „még nem" volt. Itt a tükörképük: <b>まだ</b> + állítás = még mindig tart; <b>もう</b> + tagadás = már nem, többé nem.',
        more: [
          'A もう azt jelzi, hogy valami <b>megváltozott</b> ahhoz képest, ami volt; a まだ azt, hogy <b>nem változott</b>. Mindkettő állhat állítással és tagadással, így négy kombináció van.',
          'A párok egymás ellentétei: もう{食|た}べました ↔ まだ{食|た}べていません (14. lecke); まだあります ↔ もうありません (ez a lecke).',
          'A まだ folyamatos alakkal azt jelenti: „még mindig" (まだ{寝|ね}ています). A もう + tagadás elhatározás is lehet: もう{行|い}きません = „többé nem megyek".'
        ],
        tables: [
          {
            caption: 'もう és まだ: négy mondat',
            head: ['', 'Állítás', 'Tagadás'],
            rows: [
              ['もう', 'もう たべました — már ettem', 'もう ありません — már nincs'],
              ['まだ', 'まだ あります — még van', 'まだ たべていません — még nem ettem']
            ]
          }
        ],
        examples: [
          { jp: 'まだ{雨|あめ}が{降|ふ}っています。', romaji: 'Mada ame ga futte imasu.', hu: 'Még mindig esik az eső.' },
          { jp: 'まだ{時間|じかん}があります。', romaji: 'Mada jikan ga arimasu.', hu: 'Még van idő.' },
          { jp: 'もう{時間|じかん}がありません。', romaji: 'Mō jikan ga arimasen.', hu: 'Már nincs idő.' },
          { jp: 'もうお{酒|さけ}は{飲|の}みません。', romaji: 'Mō osake wa nomimasen.', hu: 'Többé nem iszom alkoholt.' },
          { jp: 'スープはまだたくさんあります。', romaji: 'Sūpu wa mada takusan arimasu.', hu: 'Levesből még sok van.' },
          { jp: 'もうスープがありません。', romaji: 'Mō sūpu ga arimasen.', hu: 'Már nincs leves.' },
          { jp: '{弟|おとうと}はまだ{寝|ね}ています。', romaji: 'Otōto wa mada nete imasu.', hu: 'Az öcsém még mindig alszik.' },
          { jp: '{父|ちち}はもうたばこを{吸|す}いません。', romaji: 'Chichi wa mō tabako o suimasen.', hu: 'Apám már nem dohányzik.' }
        ],
        notes: [
          'Önálló válaszként: まだです („még nem"), もうけっこうです („köszönöm, már elég").',
          'A <b>まだまだです</b> dicséretre adott szerény válasz: „még messze nem megy jól".'
        ],
        mistakes: [
          { bad: 'まだ{時間|じかん}がありません。', good: 'もう{時間|じかん}がありません。', why: '„Már nincs idő": elfogyott, tehát változás történt — ezt a もう jelzi.' }
        ]
      },
      {
        title: 'もう + mennyiség', sub: 'még egy',
        pattern: 'もう + {一|ひと}つ / {一杯|いっぱい} / {一度|いちど} / {少|すこ}し',
        body: 'Mennyiség előtt a もう nem „már", hanem <b>„még"</b>: a meglévőhöz hozzátesz. もう{一杯|いっぱい} = még egy pohárral, もう{一度|いちど} = még egyszer, もう{少|すこ}し = még egy kicsit.',
        more: [
          'Magyar anyanyelvűnek ez csapda: a „még" szót ösztönösen まだ-nak fordítanánk, pedig itt <b>csak もう</b> jó. A まだ azt jelenti, hogy valami változatlanul tart (még mindig); a もう + mennyiség azt, hogy ráadást kérsz vagy adsz.',
          'Kínáláskor: もう{一杯|いっぱい}<b>いかがですか</b> („parancsol még eggyel?"). Az いかがですか a どうですか udvarias párja: vendégnek, vevőnek így ajánlasz valamit.',
          'Az <b>いっぱい</b> két külön szó. Számlálóként {一杯|いっぱい} = egy pohárnyi, csészényi, tányérnyi. Határozóként いっぱい = tele, rengeteg: おなかがいっぱいです.'
        ],
        tables: [
          {
            caption: 'もう + mennyiség',
            head: ['Japánul', 'Magyarul'],
            rows: [
              ['もう ひとつ', 'még egyet'],
              ['もう いっぱい', 'még egy pohárral, tányérral'],
              ['もう いちど', 'még egyszer'],
              ['もう ひとり', 'még egy ember'],
              ['もう いちまい', 'még egy lapot'],
              ['もう すこし', 'még egy kicsit']
            ]
          }
        ],
        examples: [
          { jp: 'コーヒーをもう{一杯|いっぱい}いかがですか。', romaji: 'Kōhī o mō ippai ikaga desu ka.', hu: 'Parancsol még egy csésze kávét?' },
          { jp: 'もう{一度|いちど}{説明|せつめい}してください。', romaji: 'Mō ichido setsumei shite kudasai.', hu: 'Kérem, magyarázza el még egyszer.' },
          { jp: 'もう{少|すこ}し{待|ま}ってください。', romaji: 'Mō sukoshi matte kudasai.', hu: 'Kérem, várjon még egy kicsit.' },
          { jp: 'ケーキをもう{一|ひと}つください。', romaji: 'Kēki o mō hitotsu kudasai.', hu: 'Kérek még egy süteményt.' },
          { jp: 'おなかがいっぱいですから、デザートはけっこうです。', romaji: 'Onaka ga ippai desu kara, dezāto wa kekkō desu.', hu: 'Tele vagyok, úgyhogy desszertet nem kérek.' }
        ],
        notes: ['A sorrend számít: <b>もう{一度|いちど}</b> = még egyszer; <b>{一度|いちど}も</b> + tagadás = egyszer sem.'],
        mistakes: [
          { bad: 'まだ{一杯|いっぱい}ください。', good: 'もう{一杯|いっぱい}ください。', why: 'Ráadást a もう kér; a まだ „még mindig"-et jelent.' }
        ],
        tip: 'Kínálásra igen: いただきます. Nem: もうけっこうです.'
      },
      {
        title: '〜でつくります・〜からつくります', sub: 'miből készül',
        pattern: 'anyag + で / から + つくります',
        body: 'A <b>で</b> akkor áll, ha az anyag a kész tárgyon is felismerhető (fa, papír). A <b>から</b> akkor, ha az alapanyag átalakul, és már nem látszik (rizsből szaké, szőlőből bor).',
        more: [
          'A で itt az <b>eszköz</b> で-je (6. lecke: はしで{食|た}べます): amivel, amiből dolgozol. Ételnél a hozzávalót, tárgynál az anyagot jelöli.',
          'A から a kiindulópont: az alapanyag <b>átalakul</b>, a kész termékben már nem ismerhető fel. A bor szőlőből, a tofu szójababból, a papír fából készül.',
          'Rákérdezni: <b>{何|なに}で</b>{作|つく}りますか („miből készül?"). A kész ételről pedig: {何|なに}が{入|はい}っていますか („mi van benne?").'
        ],
        tables: [
          {
            caption: 'で vagy から?',
            head: ['Az anyag…', 'Partikula', 'Példa'],
            rows: [
              ['látszik a kész tárgyon', 'で', 'きで つくえを つくります。'],
              ['hozzávaló az ételben', 'で', 'たまごで オムレツを つくります。'],
              ['átalakul, nem látszik', 'から', 'ぶどうから ワインを つくります。']
            ]
          }
        ],
        examples: [
          { jp: 'このいすは{木|き}で{作|つく}ります。', romaji: 'Kono isu wa ki de tsukurimasu.', hu: 'Ez a szék fából készül.' },
          { jp: '{日本|にほん}のお{酒|さけ}は{米|こめ}から{作|つく}ります。', romaji: 'Nihon no osake wa kome kara tsukurimasu.', hu: 'A japán szaké rizsből készül.' },
          { jp: '{紙|かみ}で{鶴|つる}を{作|つく}りました。', romaji: 'Kami de tsuru o tsukurimashita.', hu: 'Papírból darut hajtogattam.' },
          { jp: 'ワインはぶどうから{作|つく}ります。', romaji: 'Wain wa budō kara tsukurimasu.', hu: 'A bor szőlőből készül.' },
          { jp: 'このスープは{魚|さかな}で{作|つく}ります。', romaji: 'Kono sūpu wa sakana de tsukurimasu.', hu: 'Ez a leves halból készül.' },
          { jp: '{豆腐|とうふ}は{大豆|だいず}から{作|つく}ります。', romaji: 'Tōfu wa daizu kara tsukurimasu.', hu: 'A tofu szójababból készül.' },
          { jp: 'このスープには{何|なに}が{入|はい}っていますか。', romaji: 'Kono sūpu ni wa nani ga haitte imasu ka.', hu: 'Mi van ebben a levesben?' }
        ],
        notes: [
          'A határ nem éles: ételeknél a beszélt nyelv gyakran で-t mond ott is, ahol a szabály から-t kívánna. Ha bizonytalan vagy, a で ritkán hat hibásnak.',
          'Később szenvedő alakban is hallod majd: 〜から{作|つく}られます („…-ból készül"; 36. lecke).'
        ]
      }
    ],
    phrases: [
      { jp: 'どうぞ{遠慮|えんりょ}しないでください。', romaji: 'Dōzo enryo shinaide kudasai.', hu: 'Ne szerénykedjen, vegyen bátran!' },
      { jp: 'いただきます。', romaji: 'Itadakimasu.', hu: 'Jó étvágyat! (evés előtt)', note: 'Szó szerint: „alázattal elfogadom". Mindenki a saját ételére mondja.' },
      { jp: 'ごちそうさまでした。', romaji: 'Gochisōsama deshita.', hu: 'Köszönöm az ételt. (evés után)' },
      { jp: 'お{口|くち}に{合|あ}いますか。', romaji: 'O-kuchi ni aimasu ka.', hu: 'Ízlik?', note: 'A háziak kérdezik; szó szerint: „illik a szájához?"' },
      { jp: 'とてもおいしかったです。', romaji: 'Totemo oishikatta desu.', hu: 'Nagyon finom volt.' },
      { jp: 'もう{一杯|いっぱい}いかがですか。', romaji: 'Mō ippai ikaga desu ka.', hu: 'Parancsol még eggyel?' },
      { jp: 'もうけっこうです。', romaji: 'Mō kekkō desu.', hu: 'Köszönöm, már nem kérek.' },
      { jp: 'おなかがいっぱいです。', romaji: 'Onaka ga ippai desu.', hu: 'Tele vagyok.' },
      { jp: 'お{願|ねが}いがあるんですが…。', romaji: 'Onegai ga aru n desu ga…', hu: 'Lenne egy kérésem…', note: 'A kérés bevezetése; utána jön, mit szeretnél.' },
      { jp: '{作|つく}り{方|かた}を{教|おし}えていただけませんか。', romaji: 'Tsukurikata o oshiete itadakemasen ka.', hu: 'Megtanítaná, hogyan készül?' }
    ],
    words: [
      {
        title: 'Az asztalnál',
        items: [
          { jp: 'スープ', romaji: 'sūpu', hu: 'leves' },
          { jp: 'デザート', romaji: 'dezāto', hu: 'desszert' },
          { jp: '{味|あじ}', romaji: 'aji', hu: 'íz' },
          { jp: '{塩|しお}', romaji: 'shio', hu: 'só' },
          { jp: 'こしょう', romaji: 'koshō', hu: 'bors' },
          { jp: '{砂糖|さとう}', romaji: 'satō', hu: 'cukor' },
          { jp: '{油|あぶら}', romaji: 'abura', hu: 'olaj' },
          { jp: '{玉|たま}ねぎ', romaji: 'tamanegi', hu: 'hagyma' },
          { jp: '{材料|ざいりょう}', romaji: 'zairyō', hu: 'hozzávalók' },
          { jp: '{作|つく}り{方|かた}', romaji: 'tsukurikata', hu: 'az elkészítés módja' }
        ]
      },
      {
        title: 'A recept igéi',
        items: [
          { jp: '{切|き}ります', romaji: 'kirimasu', hu: 'vág' },
          { jp: '{入|い}れます', romaji: 'iremasu', hu: 'beletesz' },
          { jp: '{混|ま}ぜます', romaji: 'mazemasu', hu: 'kever' },
          { jp: '{炒|いた}めます', romaji: 'itamemasu', hu: 'pirít, dinsztel' },
          { jp: '{煮|に}ます', romaji: 'nimasu', hu: 'főz (lében)' },
          { jp: '{焼|や}きます', romaji: 'yakimasu', hu: 'süt' },
          { jp: '{火|ひ}をつけます', romaji: 'hi o tsukemasu', hu: 'meggyújtja a tüzet' },
          { jp: '{火|ひ}を{止|と}めます', romaji: 'hi o tomemasu', hu: 'elzárja a tüzet' },
          { jp: '{冷|ひ}やします', romaji: 'hiyashimasu', hu: 'lehűt' }
        ]
      },
      {
        title: 'A recept lépései',
        note: 'Egy recept ugyanúgy halad, mint a 21. lecke bemutatója.',
        items: [
          { jp: 'まず', romaji: 'mazu', hu: 'először' },
          { jp: '{次|つぎ}に', romaji: 'tsugi ni', hu: 'utána' },
          { jp: 'それから', romaji: 'sore kara', hu: 'azután' },
          { jp: '{最後|さいご}に', romaji: 'saigo ni', hu: 'végül' },
          { jp: 'できあがり', romaji: 'dekiagari', hu: 'kész!' },
          { jp: '{少々|しょうしょう}', romaji: 'shōshō', hu: 'csipetnyi, kevés' },
          { jp: '{大|おお}さじ', romaji: 'ōsaji', hu: 'evőkanál (mérték)' },
          { jp: '{小|こ}さじ', romaji: 'kosaji', hu: 'teáskanál (mérték)' }
        ]
      }
    ],
    culture: [
      {
        title: 'Kínálás és szabadkozás',
        text: 'A japán vendég elsőre gyakran elhárítja a kínálást: ez az <b>{遠慮|えんりょ}</b>, a tapintatos visszafogottság. A házigazda ezért újra kínál, és a második-harmadik biztatásra már illik elfogadni. Ha tényleg nem kérsz többet, a もうけっこうです és az おなかがいっぱいです a jó válasz. A házigazda közben szerénykedik: {何|なに}もありませんが… („nincs itt semmi különös, de…") — akkor is, ha roskadozik az asztal.'
      },
      {
        title: 'Pálcika-illem',
        text: 'Két dolgot soha ne tegyél. Ne szúrd a pálcikát <b>függőlegesen a rizsbe</b>, és ne adj át ételt <b>pálcikáról pálcikára</b>: mindkettő temetési szertartásra emlékeztet. Illetlen a pálcikával mutogatni, az ételbe beleszúrni, a tálak fölött tétován körözni vele. A rizses és a leveses tálkát viszont kézbe kell venni, a levest a tálkából isszák, a tésztát pedig szabad — sőt szokás — szürcsölni.'
      },
      {
        title: 'Belül és kívül',
        text: 'A tiszteleti nyelv kulcsa nem csak a rang, hanem az is, ki tartozik <b>hozzád</b> ({内|うち}) és ki <b>kívülálló</b> ({外|そと}). A saját családodról, a saját cégedről kifelé beszélve nem használsz tiszteleti alakot — még a főnöködről sem, ha ügyféllel beszélsz. Ezért mondod egy idegennek: {母|はは}が{作|つく}ってくれました, és nem くださいました.'
      },
      {
        title: 'Külön gyomor a desszertnek',
        text: 'A <b>{別腹|べつばら}</b> („külön gyomor") a japánok kedvelt tréfás szava: a főétel után is marad hely az édességnek. Éttermek, cukrászdák reklámjaiban is gyakran látni. Ha jóllaktál, de a süteményt mégis elfogadnád, ezzel a szóval mindenkit megnevettetsz.'
      }
    ],
    quiz: [
      { q: '„A tanár kijavította a fogalmazásomat." (tisztelettel) Mi hiányzik?', jp: '{先生|せんせい}が{作文|さくぶん}を{直|なお}して＿。', a: 'くださいました', wrong: ['いただきました', 'さしあげました', 'あげました'], why: 'A tanár az alany (が), nekem tette: てくださいました.' },
      { q: '„A tanár úr tanított japánra." Mi hiányzik?', jp: '{先生|せんせい}＿{日本語|にほんご}を{教|おし}えていただきました。', a: 'に', wrong: ['が', 'を', 'で'], why: 'A ていただきます mellett a segítő に-t kap.' },
      { q: 'Melyik a legudvariasabb kérés?', a: '{教|おし}えていただけませんか。', wrong: ['{教|おし}えてください。', '{教|おし}えてくれませんか。', '{教|おし}えて。'], why: 'Minél közvetettebb, annál udvariasabb: 〜ていただけませんか.' },
      { q: '„Szeretek főzni." Mi hiányzik?', jp: '{料理|りょうり}を{作|つく}る＿が{好|す}きです。', a: 'の', wrong: ['を', 'に', 'と'], why: 'A の főnévvé teszi az igét: {作|つく}るのが{好|す}き.' },
      { q: '„Elfelejtettem elhozni a leckét." Mi hiányzik?', jp: '{宿題|しゅくだい}を{持|も}ってくるの＿{忘|わす}れました。', a: 'を', wrong: ['が', 'に', 'で'], why: 'A の-val főnevesített rész a {忘|わす}れました tárgya: を.' },
      { q: '„Még van idő." Mi hiányzik?', jp: '＿{時間|じかん}があります。', a: 'まだ', wrong: ['もう', 'しか', 'だけ'], why: 'まだ + állítás = még (mindig).' },
      { q: 'Mit jelent: もう{時間|じかん}がありません。', a: 'Már nincs idő.', wrong: ['Még van idő.', 'Még nincs itt az ideje.', 'Már van időm.'], why: 'もう + tagadás = már nem.' },
      { q: '„Ez a szék fából készül." Mi hiányzik?', jp: 'このいすは{木|き}＿{作|つく}ります。', a: 'で', wrong: ['に', 'を', 'が'], why: 'A felismerhető anyag で-t kap.' },
      { q: '„A japán szaké rizsből készül." Mi hiányzik?', jp: '{日本|にほん}のお{酒|さけ}は{米|こめ}＿{作|つく}ります。', a: 'から', wrong: ['まで', 'より', 'へ'], why: 'Az átalakuló alapanyag から-t kap.' },
      { q: 'Mit jelent: ちょっと{手伝|てつだ}ってくれませんか。', a: 'Segítenél egy kicsit?', wrong: ['Segítsek egy kicsit?', 'Miért nem segítettél?', 'Köszi, hogy segítettél.'], why: '〜てくれませんか: kérés, hogy tegyen meg nekem valamit.' },
      {
        q: '„A tanár úr megnézte a fogalmazásomat." Te vagy az alany. Mi hiányzik?',
        jp: '{私|わたし}は{先生|せんせい}に{作文|さくぶん}を{見|み}て＿。',
        a: 'いただきました',
        wrong: ['くださいました', 'さしあげました', 'くれました'],
        why: 'Ha te vagy az alany, és a tanár に-t kap, az ige ていただきます.'
      },
      {
        q: 'Miért kényes szemtől szemben a てさしあげます?',
        a: 'Mert a szívesség hangoztatása fölényesnek hat.',
        wrong: ['Mert csak írásban használható.', 'Mert csak családtagnak mondható.', 'Mert nincs múlt ideje.'],
        why: 'Aki kimondja, hogy szívességet tesz, az a másikat rászorulónak mutatja. Helyette: {持|も}ちましょうか.'
      },
      { q: '„Beszélne egy kicsit lassabban?" (a tanárodnak) Mi hiányzik?', jp: 'もう{少|すこ}しゆっくり{話|はな}して＿。', a: 'いただけませんか', wrong: ['いただきませんか', 'あげませんか', 'おきませんか'], why: 'Udvarias kérés: て-alak + いただけませんか (ható alak, tagadó kérdés).' },
      { q: 'Melyik mondat helyes: „A hobbim az úszás."', a: '{趣味|しゅみ}は{泳|およ}ぐことです。', wrong: ['{趣味|しゅみ}は{泳|およ}ぐのです。', '{趣味|しゅみ}は{泳|およ}ぎますことです。', '{趣味|しゅみ}は{泳|およ}ぐです。'], why: 'A です előtt こと áll, és előtte rövid alak.' },
      { q: '„Parancsol még egy csésze kávét?" Mi hiányzik?', jp: 'コーヒーを＿{一杯|いっぱい}いかがですか。', a: 'もう', wrong: ['まだ', 'もっと', 'よく'], why: 'Mennyiség előtt a もう jelenti azt: „még egy".' },
      { q: 'Mit jelent: おなかがいっぱいです。', a: 'Tele vagyok.', wrong: ['Éhes vagyok.', 'Kérek még egy tányérral.', 'Fáj a hasam.'], why: 'Az いっぱい határozóként „tele"-t jelent.' },
      { q: 'Mit jelent: {何|なに}で{作|つく}るんですか。', a: 'Miből készül?', wrong: ['Miért készíted?', 'Ki készíti?', 'Mikor készül el?'], why: 'A で az alapanyagot jelöli; なにで = „miből, mivel".' },
      { q: '„Az öcsém még mindig alszik." Mi hiányzik?', jp: '{弟|おとうと}は＿{寝|ね}ています。', a: 'まだ', wrong: ['もう', 'また', 'よく'], why: 'A まだ + állítás: az állapot nem változott, még tart.' },
      { q: 'Hogyan hárítod el udvariasan a repetát?', a: 'もうけっこうです。', wrong: ['まだけっこうです。', 'もういかがですか。', 'まだいただきます。'], why: 'もうけっこうです = „köszönöm, már elég".' },
      {
        q: 'Egy idegennek mesélsz az édesanyádról. Melyik mondat a helyes?',
        a: '{母|はは}が{作|つく}ってくれました。',
        wrong: ['{母|はは}が{作|つく}ってくださいました。', 'お{母|かあ}さんが{作|つく}ってくださいました。', '{母|はは}に{作|つく}ってさしあげました。'],
        why: 'A saját családodról kifelé beszélve nem használsz tiszteleti alakot.'
      }
    ]
  },

  /* ── 24. lecke ────────────────────────────────────── */
  {
    id: 'l24', no: 24, book: 'Dekiru 1', title: 'Búcsú',
    lead: 'Kifejezed, hogy valami feléd tart vagy távolodik, hogy egy változás eddig tartott vagy ezután folytatódik, leírod, milyen állapotban vannak a dolgok körülötted, és megköszönöd mindazt, amit érted tettek.',
    cando: [
      'Megmondod, hogy elmész valamiért és visszajössz, vagy elviszel magaddal valamit.',
      'Elmondod, mi változott eddig, és mi változik ezután.',
      'Leírod, mit látsz magad körül.',
      'Elbúcsúzol, és megírsz egy rövid köszönőlevelet.'
    ],
    intro: [
      'Az utolsó lecke a búcsúé — és két apró igéé, amelyek a magyar igekötők munkáját végzik. A <b>きます</b> („jön") és az <b>いきます</b> („megy") a て-alak után megmondja, <b>merre tart</b> a cselekvés: felém, vagy tőlem el. {持|も}ってきます = idehoz, {持|も}っていきます = elvisz.',
      'Ugyanez a két ige az <b>időben</b> is irányt mutat. Ami a múltból a mostig ér, az „ideér": {寒|さむ}くなってきました (kezd hideg lenni). Ami a mosttól a jövő felé halad, az „elmegy": {寒|さむ}くなっていきます (egyre hidegebb lesz). Képzeld úgy, hogy a beszélő a térkép és az időegyenes közepén áll — így mind a négy használat magától értetődik.',
      'A lecke második fele visszatér a tárgyatlan ige + ています alakhoz, és megmutatja, mennyi mindent le tudsz írni vele: virágzó fát, vizes hajat, zsúfolt vonatot. A végén a búcsú nyelve következik: hogyan köszönöd meg mindazt, amit érted tettek, és mit írsz egy köszönőlevélbe.'
    ],
    dialogue: {
      title: 'Az utolsó este',
      scene: 'Jui holnap repül haza. Anna segít neki csomagolni; közben eleredt az eső.',
      lines: [
        { who: 'Anna', jp: 'ユイさん、{荷物|にもつ}の{準備|じゅんび}はできましたか。', romaji: 'Yui-san, nimotsu no junbi wa dekimashita ka.', hu: 'Jui, összepakoltál már?' },
        { who: 'Jui', jp: 'ええ、だいたい。でも、スーツケースがいっぱいで、{閉|し}まらないんです。', romaji: 'Ē, daitai. Demo, sūtsukēsu ga ippai de, shimaranai n desu.', hu: 'Igen, nagyjából. De a bőrönd tele van, és nem csukódik be.' },
        {
          who: 'Anna',
          jp: 'お{土産|みやげ}がたくさん{入|はい}っていますからね。この{袋|ふくろ}に{入|い}れて{持|も}っていきませんか。',
          romaji: 'O-miyage ga takusan haitte imasu kara ne. Kono fukuro ni irete motte ikimasen ka.',
          hu: 'Mert sok benne az ajándék. Nem viszed el inkább ebben a szatyorban?'
        },
        { who: 'Jui', jp: 'ありがとう。あ、{空|そら}が{暗|くら}くなってきましたね。', romaji: 'Arigatō. A, sora ga kuraku natte kimashita ne.', hu: 'Köszi. Jé, kezd beborulni.' },
        {
          who: 'Anna',
          jp: '{本当|ほんとう}だ。{雨|あめ}も{降|ふ}ってきました。ちょっと{洗濯物|せんたくもの}を{入|い}れてきます。',
          romaji: 'Hontō da. Ame mo futte kimashita. Chotto sentakumono o irete kimasu.',
          hu: 'Tényleg. Az eső is eleredt. Beszedem gyorsan a ruhákat, mindjárt jövök.'
        },
        {
          who: 'Jui',
          jp: 'この{三週間|さんしゅうかん}、{本当|ほんとう}に{早|はや}かったです。ハンガリー{語|ご}も{少|すこ}しわかってきました。',
          romaji: 'Kono sanshūkan, hontō ni hayakatta desu. Hangarī-go mo sukoshi wakatte kimashita.',
          hu: 'Nagyon gyorsan elment ez a három hét. A magyart is kezdem egy kicsit érteni.'
        },
        {
          who: 'Anna',
          jp: '{私|わたし}も{日本語|にほんご}が{前|まえ}よりわかってきました。これからも{勉強|べんきょう}を{続|つづ}けていきます。',
          romaji: 'Watashi mo Nihongo ga mae yori wakatte kimashita. Kore kara mo benkyō o tsuzukete ikimasu.',
          hu: 'Én is jobban értem már a japánt, mint azelőtt. Ezután is folytatom a tanulást.'
        },
        {
          who: 'Jui',
          jp: 'アンナさんのおかげで、ハンガリーの{料理|りょうり}を{食|た}べただけでなく、{作|つく}り{方|かた}も{覚|おぼ}えました。',
          romaji: 'Anna-san no okage de, Hangarī no ryōri o tabeta dake de naku, tsukurikata mo oboemashita.',
          hu: 'Neked köszönhetően nemcsak megkóstoltam a magyar ételeket, hanem az elkészítésüket is megtanultam.'
        },
        {
          who: 'Anna',
          jp: '{来年|らいねん}は{私|わたし}が{日本|にほん}へ{行|い}きます。{桜|さくら}が{咲|さ}いているときに{行|い}きたいです。',
          romaji: 'Rainen wa watashi ga Nihon e ikimasu. Sakura ga saite iru toki ni ikitai desu.',
          hu: 'Jövőre én megyek Japánba. Akkor szeretnék menni, amikor virágzik a cseresznye.'
        },
        { who: 'Jui', jp: 'ぜひ{来|き}てください。{空港|くうこう}まで{迎|むか}えに{行|い}きますから。', romaji: 'Zehi kite kudasai. Kūkō made mukae ni ikimasu kara.', hu: 'Mindenképp gyere! Kimegyek eléd a reptérre.' },
        { who: 'Anna', jp: 'じゃあ、あしたは{私|わたし}が{空港|くうこう}まで{送|おく}っていきますね。', romaji: 'Jā, ashita wa watashi ga kūkō made okutte ikimasu ne.', hu: 'Holnap pedig én kísérlek ki a reptérre.' },
        { who: 'Jui', jp: 'ありがとう。{日本|にほん}に{着|つ}いてから、すぐメールします。', romaji: 'Arigatō. Nihon ni tsuite kara, sugu mēru shimasu.', hu: 'Köszi. Amint megérkezem Japánba, rögtön írok.' }
      ],
      notes: [
        'A <b>{閉|し}まらないんです</b> tárgyatlan ige tagadva: „nem csukódik be". Jui nem azt mondja, hogy ő nem tudja becsukni — a bőrönd „nem akar" becsukódni.',
        'Egy mondatban a pár két tagja: お{土産|みやげ}が<b>{入|はい}っています</b> (benne van — állapot), {袋|ふくろ}に<b>{入|い}れて</b> (beleteszed — cselekvés).',
        'A <b>{暗|くら}くなってきました</b> és a <b>{降|ふ}ってきました</b> változás, amely most ért el a beszélőhöz: kezd sötétedni, eleredt az eső.',
        'Az <b>{入|い}れてきます</b> térbeli: megteszem, és visszajövök. Az <b>{送|おく}っていきます</b> a másik irány: elkísérlek innen.',
        'Anna két mondata egymás tükre: <b>わかってきました</b> (mostanáig) — <b>{続|つづ}けていきます</b> (mostantól).',
        'A <b>{咲|さ}いているとき</b> az állapot ています-ét kapcsolja a とき-hez: „amikor virágban áll".'
      ]
    },
    points: [
      {
        title: '〜てきます (irány)', sub: 'megteszem és jövök · idehoz',
        pattern: 'ige て-alak + きます',
        body: 'A <b>きます</b> a beszélő felé mutat. Két gyakori jelentése: elmész, megteszel valamit, és <i>visszajössz</i>; vagy valaki <i>ide</i> hoz, ide jön valahogyan.',
        more: [
          'A きます és az いきます a て-alak után megtartja eredeti jelentését: megmondja, hogy a cselekvés a <b>beszélő felé</b> tart-e, vagy <b>tőle távolodik</b>. A magyarban ezt igekötő végzi: ide-, oda-, el-, vissza-.',
          'A てきます három gyakori használata. <b>Megteszem, és visszajövök</b>: {買|か}ってきます = elmegyek, megveszem, és jövök. <b>Idehoz, idejön valahogyan</b>: {持|も}ってきます (tárgyat hoz), {連|つ}れてきます (embert hoz), {歩|ある}いてきます (gyalog jön). <b>Valami felém mozdul</b>: {近|ちか}づいてきます (közeledik).',
          'A mindennapi elköszönés is ez: {行|い}ってきます — „elmegyek, és visszajövök".'
        ],
        examples: [
          { jp: 'ちょっと{飲|の}み{物|もの}を{買|か}ってきます。', romaji: 'Chotto nomimono o katte kimasu.', hu: 'Elugrom innivalóért, mindjárt jövök.' },
          { jp: '{行|い}ってきます。', romaji: 'Itte kimasu.', hu: 'Elmentem, majd jövök!' },
          { jp: '{友|とも}だちがお{土産|みやげ}を{持|も}ってきました。', romaji: 'Tomodachi ga omiyage o motte kimashita.', hu: 'A barátom hozott szuvenírt.' },
          { jp: 'ちょっとトイレに{行|い}ってきます。', romaji: 'Chotto toire ni itte kimasu.', hu: 'Kimegyek a mosdóba, mindjárt jövök.' },
          { jp: 'あした{辞書|じしょ}を{持|も}ってきてください。', romaji: 'Ashita jisho o motte kite kudasai.', hu: 'Holnap hozzon szótárt!' },
          { jp: '{妹|いもうと}を{連|つ}れてきてもいいですか。', romaji: 'Imōto o tsurete kite mo ii desu ka.', hu: 'Elhozhatom a húgomat?' },
          { jp: '{向|む}こうから{人|ひと}が{歩|ある}いてきます。', romaji: 'Mukō kara hito ga aruite kimasu.', hu: 'Szemből gyalog jön valaki.' }
        ],
        notes: [
          'Tárgyat {持|も}ってきます, embert és állatot {連|つ}れてきます — ugyanúgy, mint az いきます esetében.',
          'Hasznos párok: {聞|き}いてきます („megkérdezem, és jövök"), {見|み}てきます („megnézem, és jövök").'
        ],
        mistakes: [
          { bad: '{飲|の}み{物|もの}を{買|か}いにきます。', good: '{飲|の}み{物|もの}を{買|か}ってきます。', why: 'A {買|か}いにきます azt jelenti: „vásárolni jövök ide". Ha elmész, megveszed, és visszajössz: {買|か}ってきます.' }
        ]
      },
      {
        title: '〜ていきます (irány)', sub: 'elmegy, elvisz',
        pattern: 'ige て-alak + いきます',
        body: 'Az <b>いきます</b> a beszélőtől távolodik: valaki vagy valami elmegy innen, vagy elviszel magaddal valamit.',
        more: [
          'Az いきます a beszélő helyétől <b>távolodó</b> mozgást jelöl. <b>Megteszem, aztán megyek</b>: {食|た}べていきます = eszem, mielőtt elmegyek. <b>Elvisz</b>: {持|も}っていきます, {連|つ}れていきます. <b>Távolodik</b>: {帰|かえ}っていきます, {飛|と}んでいきます.',
          'A nézőpont mindig a <b>beszélőé</b>. Ugyanaz az esernyő: aki otthonról indul, azt mondja, {持|も}っていきます; aki a célnál várja, azt kéri, {持|も}ってきてください.'
        ],
        tables: [
          {
            caption: 'Ide vagy el?',
            head: ['', '〜てきます (ide)', '〜ていきます (el)'],
            rows: [
              ['tárgy', 'もってきます — idehoz', 'もっていきます — elvisz'],
              ['ember', 'つれてきます — idehoz', 'つれていきます — elvisz'],
              ['gyalog', 'あるいてきます — idesétál', 'あるいていきます — elsétál'],
              ['vásárlás', 'かってきます — megveszi és jön', 'かっていきます — megveszi és viszi'],
              ['haza', 'かえってきます — hazajön', 'かえっていきます — hazamegy']
            ]
          }
        ],
        examples: [
          { jp: '{子|こ}どもが{学校|がっこう}へ{走|はし}っていきました。', romaji: 'Kodomo ga gakkō e hashitte ikimashita.', hu: 'A gyerek elszaladt az iskolába.' },
          { jp: 'お{弁当|べんとう}を{持|も}っていきます。', romaji: 'Obentō o motte ikimasu.', hu: 'Viszek uzsonnát.' },
          { jp: '{鳥|とり}が{飛|と}んでいきました。', romaji: 'Tori ga tonde ikimashita.', hu: 'Elrepült a madár.' },
          { jp: 'パーティーにワインを{持|も}っていきます。', romaji: 'Pātī ni wain o motte ikimasu.', hu: 'Bort viszek a buliba.' },
          { jp: '{駅|えき}まで{送|おく}っていきます。', romaji: 'Eki made okutte ikimasu.', hu: 'Elkísérlek az állomásig.' },
          { jp: 'コーヒーを{飲|の}んでいきませんか。', romaji: 'Kōhī o nonde ikimasen ka.', hu: 'Nem iszol egy kávét, mielőtt elmész?' },
          { jp: '{子|こ}どもたちは{家|いえ}に{帰|かえ}っていきました。', romaji: 'Kodomo-tachi wa ie ni kaette ikimashita.', hu: 'A gyerekek hazamentek.' }
        ],
        notes: ['Beszédben az い kiesik: {持|も}って<b>く</b>, {持|も}って<b>った</b>.'],
        mistakes: [
          { bad: '{鳥|とり}が{遠|とお}くへ{飛|と}んできました。', good: '{鳥|とり}が{遠|とお}くへ{飛|と}んでいきました。', why: 'Ami távolodik tőled, az いきます. A {飛|と}んできました azt jelenti: iderepült.' }
        ]
      },
      {
        title: '〜てきました (változás eddig)', sub: 'kezd…, egyre inkább',
        pattern: 'változást jelentő ige て-alak + きました',
        body: 'Időben is van „felém": a változás a múltban indult, és mostanra ért ide. Magyarul: „kezd…", „egyre…", „eleredt".',
        more: [
          'A tér után az <b>idő</b>: a „most" a beszélő helye az időben. Ami a múltból a mostig tart, az „ideér": 〜てきました. Leggyakrabban <b>változást jelentő</b> igével áll: 〜くなります, 〜になります, {増|ふ}えます (nő), {減|へ}ります (csökken), わかります, {慣|な}れます (megszokik).',
          'Többnyire múlt idejű (きました), mert a változás már elért a jelenig. Gyakori kísérője a だんだん („fokozatosan"), a {少|すこ}しずつ („apránként"), a {最近|さいきん} („mostanában").',
          'Második árnyalata: valami <b>megjelenik</b>, és eljut hozzád — {雨|あめ}が{降|ふ}ってきました (eleredt), おなかがすいてきました (kezdek megéhezni).',
          'Harmadik: valamit <b>mostanáig folyamatosan</b> csináltál — {三年間|さんねんかん}{日本語|にほんご}を{勉強|べんきょう}してきました („három éve tanulok japánul").'
        ],
        examples: [
          { jp: '{寒|さむ}くなってきました。', romaji: 'Samuku natte kimashita.', hu: 'Kezd hideg lenni.' },
          { jp: '{日本語|にほんご}がわかってきました。', romaji: 'Nihongo ga wakatte kimashita.', hu: 'Kezdem érteni a japánt.' },
          { jp: '{雨|あめ}が{降|ふ}ってきました。', romaji: 'Ame ga futte kimashita.', hu: 'Eleredt az eső.' },
          { jp: '{最近|さいきん}、{暖|あたた}かくなってきましたね。', romaji: 'Saikin, atatakaku natte kimashita ne.', hu: 'Mostanában kezd melegedni az idő.' },
          { jp: 'おなかがすいてきました。', romaji: 'Onaka ga suite kimashita.', hu: 'Kezdek megéhezni.' },
          { jp: '{日本|にほん}の{生活|せいかつ}に{慣|な}れてきました。', romaji: 'Nihon no seikatsu ni narete kimashita.', hu: 'Kezdem megszokni a japán életet.' },
          { jp: '{外国人|がいこくじん}の{観光客|かんこうきゃく}が{増|ふ}えてきました。', romaji: 'Gaikokujin no kankōkyaku ga fuete kimashita.', hu: 'Egyre több lett a külföldi turista.' }
        ],
        notes: [
          'A sima 〜くなりました csak az eredményt közli (hideg lett). A 〜くなってきました a folyamatot is érezteti: fokozatosan, mostanra lett hideg — és talán még folytatódik.'
        ],
        mistakes: [
          { bad: '{最近|さいきん}、{寒|さむ}くなってきます。', good: '{最近|さいきん}、{寒|さむ}くなってきました。', why: 'Ami mostanra már érezhető, az múlt idejű: きました.' }
        ]
      },
      {
        title: '〜ていきます (változás ezután)', sub: 'tovább, ezután is',
        pattern: 'ige て-alak + いきます',
        body: 'Időben az いきます a jövő felé mutat: a változás vagy a cselekvés mostantól folytatódik.',
        more: [
          'A tükörképe: a mosttól a <b>jövő felé</b> haladó változás vagy folytatódó cselekvés. Gyakori kísérői: これから (mostantól), これからも (ezután is), どんどん (egyre gyorsabban).',
          'Jövőbeli feltevést a でしょう vagy a と{思|おも}います zár: {増|ふ}えていくでしょう. Elhatározásnál a sima alak áll: {続|つづ}けていきます („folytatni fogom").',
          'Múlt időben a távolodó, eltűnő folyamatot írja le: {時間|じかん}が{過|す}ぎていきました („telt-múlt az idő").'
        ],
        tables: [
          {
            caption: 'Tér és idő egy képben',
            head: ['', '〜てきます', '〜ていきます'],
            rows: [
              ['térben', 'a beszélő felé (ide)', 'a beszélőtől el'],
              ['időben', 'a múltból a mostig', 'a mosttól a jövő felé'],
              ['példa', 'さむく なってきました', 'さむく なっていきます'],
              ['magyarul', 'kezd hideg lenni', 'egyre hidegebb lesz']
            ]
          }
        ],
        examples: [
          { jp: 'これからも{日本語|にほんご}を{勉強|べんきょう}していきます。', romaji: 'Kore kara mo nihongo o benkyō shite ikimasu.', hu: 'Ezután is tovább tanulok japánul.' },
          { jp: 'これから{暖|あたた}かくなっていきます。', romaji: 'Kore kara atatakaku natte ikimasu.', hu: 'Mostantól egyre melegebb lesz.' },
          { jp: '{観光客|かんこうきゃく}は{増|ふ}えていくでしょう。', romaji: 'Kankōkyaku wa fuete iku deshō.', hu: 'A turisták száma valószínűleg tovább nő.' },
          { jp: 'これからどんどん{寒|さむ}くなっていきます。', romaji: 'Kore kara dondon samuku natte ikimasu.', hu: 'Mostantól egyre hidegebb lesz.' },
          { jp: '{子|こ}どもの{数|かず}は{減|へ}っていくと{思|おも}います。', romaji: 'Kodomo no kazu wa hette iku to omoimasu.', hu: 'Szerintem a gyerekek száma tovább csökken.' },
          { jp: '{二人|ふたり}で{頑張|がんば}っていきましょう。', romaji: 'Futari de ganbatte ikimashō.', hu: 'Csináljuk tovább együtt!' }
        ],
        notes: [
          'A kettő egymás mellett: {今|いま}まで{頑張|がんば}ってきました。これからも{頑張|がんば}っていきます。 — „Eddig is igyekeztem, ezután is igyekezni fogok."'
        ],
        mistakes: [
          { bad: 'これから{暖|あたた}かくなってきました。', good: 'これから{暖|あたた}かくなっていきます。', why: 'A これから a jövőre mutat: いきます kell hozzá.' }
        ]
      },
      {
        title: '〜ています (állapot)', sub: 'amit magad körül látsz',
        pattern: 'B が + tárgyatlan ige て-alak + います',
        body: 'A tárgyatlan ige + ています-szal írod le, amit látsz: valami megállt, leesett, eltört, és most is úgy van. Nem azt jelenti, hogy éppen történik.',
        more: [
          'A 20. leckében megtanultad: tárgyatlan ige + ています = az eredmény fennáll. Négy helyzetben különösen gyakori.',
          '<b>Természeti jelenség</b>: {花|はな}が{咲|さ}いています (virágban áll), {雪|ゆき}が{積|つ}もっています (hó borítja), {星|ほし}が{出|で}ています (fent vannak a csillagok).',
          '<b>Valami rajta van valamin</b>: シャツにボタンがついています; {髪|かみ}に{花|はな}びらがついています („szirom van a hajadon").',
          '<b>Változás eredménye</b>: {顔|かお}が{赤|あか}くなっています (ki van pirulva), {髪|かみ}がぬれています (vizes a haja), {道|みち}が{込|こ}んでいます (dugó van).',
          '<b>Befejezettség</b>, gyakran もう kíséretében és múlt időben: {着|つ}いたとき、{店|みせ}はもう{閉|し}まっていました („mire odaértem, már zárva volt").'
        ],
        tables: [
          {
            caption: 'Mit látsz? — állapotok',
            head: ['Ige', '〜ています', 'Jelentés'],
            rows: [
              ['さきます', 'さいています', 'virágzik, ki van nyílva'],
              ['おちます', 'おちています', 'le van esve, ott hever'],
              ['とまります', 'とまっています', 'áll (óra, autó)'],
              ['ぬれます', 'ぬれています', 'vizes'],
              ['かわきます', 'かわいています', 'száraz, megszáradt'],
              ['よごれます', 'よごれています', 'piszkos'],
              ['こみます', 'こんでいます', 'zsúfolt'],
              ['すきます', 'すいています', 'üres, kevesen vannak']
            ]
          }
        ],
        examples: [
          { jp: '{時計|とけい}が{止|と}まっています。', romaji: 'Tokei ga tomatte imasu.', hu: 'Áll az óra.' },
          { jp: '{財布|さいふ}が{落|お}ちています。', romaji: 'Saifu ga ochite imasu.', hu: 'Egy pénztárca hever a földön.' },
          { jp: 'コップが{割|わ}れています。', romaji: 'Koppu ga warete imasu.', hu: 'El van törve a pohár.' },
          { jp: '{公園|こうえん}に{桜|さくら}が{咲|さ}いています。', romaji: 'Kōen ni sakura ga saite imasu.', hu: 'A parkban virágzik a cseresznye.' },
          { jp: '{髪|かみ}がぬれていますよ。', romaji: 'Kami ga nurete imasu yo.', hu: 'Vizes a hajad!' },
          { jp: 'この{電車|でんしゃ}はすいています。', romaji: 'Kono densha wa suite imasu.', hu: 'Ezen a vonaton kevesen vannak.' },
          { jp: 'シャツが{汚|よご}れています。', romaji: 'Shatsu ga yogorete imasu.', hu: 'Piszkos az inged.' },
          { jp: '{着|つ}いたとき、{店|みせ}はもう{閉|し}まっていました。', romaji: 'Tsuita toki, mise wa mō shimatte imashita.', hu: 'Mire odaértem, a bolt már zárva volt.' }
        ],
        notes: [
          'A múlt idejű 〜ていました azt mondja: abban a pillanatban már úgy volt.',
          'Állapot ez a kettő is: おなかがすいています (éhes vagyok), のどがかわいています (szomjas vagyok) — szó szerint „kiürült a hasam", „kiszáradt a torkom".'
        ],
        mistakes: [
          { bad: '{今|いま}、{桜|さくら}が{咲|さ}きます。', good: '{今|いま}、{桜|さくら}が{咲|さ}いています。', why: 'Amit most látsz, az állapot: ています. A {咲|さ}きます általános tényt vagy jövőt jelent.' }
        ]
      },
      {
        title: '〜だけでなく、〜も', sub: 'nemcsak…, hanem… is',
        pattern: 'A だけでなく、B も',
        body: 'A 19. leckében a だけ azt jelentette: „csak". A <b>だけでなく</b> ennek a tagadása — „nem csak" —, a folytatásban pedig a も teszi hozzá a ráadást: „hanem… is".',
        more: [
          'Főnév után közvetlenül áll: {英語|えいご}だけでなく. Ige és い-melléknév rövid alakja után is: {安|やす}いだけでなく、おいしいです. な-melléknév után な kerül elé: きれいなだけでなく.',
          'Beszédben a でなく helyén じゃなくて hangzik: {英語|えいご}だけじゃなくて、{日本語|にほんご}も…. Levélben, beszédben, fogalmazásban a だけでなく a választékos.'
        ],
        examples: [
          { jp: '{田中|たなか}さんは{英語|えいご}だけでなく、{中国語|ちゅうごくご}もできます。', romaji: 'Tanaka-san wa Eigo dake de naku, Chūgokugo mo dekimasu.', hu: 'Tanaka nemcsak angolul, hanem kínaiul is tud.' },
          { jp: 'このレストランは{安|やす}いだけでなく、おいしいです。', romaji: 'Kono resutoran wa yasui dake de naku, oishii desu.', hu: 'Ez az étterem nemcsak olcsó, hanem finom is.' },
          { jp: '{子|こ}どもだけでなく、{大人|おとな}もこのゲームが{好|す}きです。', romaji: 'Kodomo dake de naku, otona mo kono gēmu ga suki desu.', hu: 'Nemcsak a gyerekek, a felnőttek is szeretik ezt a játékot.' },
          { jp: '{日曜日|にちようび}だけでなく、{土曜日|どようび}も{働|はたら}いています。', romaji: 'Nichiyōbi dake de naku, doyōbi mo hataraite imasu.', hu: 'Nemcsak vasárnap, szombaton is dolgozom.' }
        ],
        notes: [
          'Ha a második tagnak saját partikulája van, a も mögéje kerül: {東京|とうきょう}だけでなく、{京都|きょうと}<b>にも</b>{行|い}きました.'
        ],
        mistakes: [
          { bad: '{英語|えいご}だけでなく、{日本語|にほんご}を{話|はな}します。', good: '{英語|えいご}だけでなく、{日本語|にほんご}も{話|はな}します。', why: 'A ráadást a も jelöli; nélküle a mondat második fele nem kapcsolódik az elsőhöz.' }
        ]
      },
      {
        title: '〜のおかげで', sub: '…-nak köszönhetően',
        pattern: 'A のおかげで、B (jó eredmény)',
        body: 'Ha valami jó történt, és megnevezed, kinek vagy minek köszönhető, az <b>おかげ</b> szót használod. Főnév után の-val kapcsolódik: {先生|せんせい}のおかげで („a tanáromnak köszönhetően").',
        more: [
          'Önállóan: <b>おかげさまで</b> — „hála önöknek". Így felelsz, ha az egészséged, a munkád, a vizsgád felől érdeklődnek: お{元気|げんき}ですか。— はい、おかげさまで。 Nem kell, hogy a másik valóban tett volna érted valamit: a jó sorsodat udvariasan a környezetednek tulajdonítod.',
          'A párja a <b>〜のせいで</b>: „…miatt" — rossz eredménynél, hibáztatva. A kettő nem cserélhető fel.',
          'Ige után is állhat, rövid alakkal: {手伝|てつだ}ってくれた<b>おかげで</b>… („annak köszönhetően, hogy segített").'
        ],
        examples: [
          { jp: '{先生|せんせい}のおかげで、{試験|しけん}に{合格|ごうかく}しました。', romaji: 'Sensei no okage de, shiken ni gōkaku shimashita.', hu: 'A tanáromnak köszönhetően átmentem a vizsgán.' },
          { jp: 'おかげさまで、{元気|げんき}です。', romaji: 'Okagesama de, genki desu.', hu: 'Köszönöm, jól vagyok.' },
          { jp: 'みなさんのおかげで、{楽|たの}しい{旅行|りょこう}になりました。', romaji: 'Mina-san no okage de, tanoshii ryokō ni narimashita.', hu: 'Önöknek köszönhetően élvezetes út lett belőle.' },
          { jp: '{友|とも}だちが{手伝|てつだ}ってくれたおかげで、{早|はや}く{終|お}わりました。', romaji: 'Tomodachi ga tetsudatte kureta okage de, hayaku owarimashita.', hu: 'A barátom segítségének köszönhetően hamar végeztem.' }
        ],
        notes: ['Köszönőlevélben, búcsúbeszédben szinte kötelező fordulat.'],
        mistakes: [
          { bad: '{雨|あめ}のおかげで、{試合|しあい}が{中止|ちゅうし}になりました。', good: '{雨|あめ}のせいで、{試合|しあい}が{中止|ちゅうし}になりました。', why: 'Rossz eredménynél せい áll; az おかげ hálát fejez ki.' }
        ]
      },
      {
        title: 'お{礼|れい}の{手紙|てがみ}', sub: 'a köszönőlevél váza',
        pattern: 'megszólítás → érdeklődés → hírek → köszönet → viszontlátás → jókívánság',
        body: 'A tanult minták egy rövid levélben állnak össze. Az alábbi sorok egymás után olvasva egy teljes köszönőlevelet adnak: Jui írja Annának, miután hazaért Japánba.',
        more: [
          'A levél a címzett megszólításával és a hogyléte felőli érdeklődéssel indul. Ezután egy mondat arról, mi van veled — itt jön jól a 〜てきました az időjárás leírására.',
          'A levél szíve a <b>konkrét köszönet</b>: megnevezed, mit tettek érted (〜てくれて、ありがとうございました; idősebbnek 〜てくださって). Jó, ha azt is megírod, mi lett belőle: mit tanultál, mit próbáltál ki otthon.',
          'A zárásban a viszontlátás reménye, üdvözlet a többieknek, jókívánság áll, végül a feladó neve より-val.'
        ],
        examples: [
          { jp: 'アンナさん、お{元気|げんき}ですか。', romaji: 'Anna-san, o-genki desu ka.', hu: 'Kedves Anna, hogy vagy?' },
          { jp: '{日本|にほん}に{帰|かえ}って、もう{二週間|にしゅうかん}になりました。', romaji: 'Nihon ni kaette, mō nishūkan ni narimashita.', hu: 'Már két hete, hogy hazajöttem Japánba.' },
          { jp: 'こちらは{毎日|まいにち}{雨|あめ}が{降|ふ}って、{蒸|む}し{暑|あつ}くなってきました。', romaji: 'Kochira wa mainichi ame ga futte, mushiatsuku natte kimashita.', hu: 'Itt mindennap esik, és kezd fülledt meleg lenni.' },
          { jp: 'エゲルやバラトンを{案内|あんない}してくれて、{本当|ほんとう}にありがとうございました。', romaji: 'Egeru ya Baraton o annai shite kurete, hontō ni arigatō gozaimashita.', hu: 'Igazán köszönöm, hogy megmutattad Egert és a Balatont.' },
          { jp: 'おばあさんのスープを{作|つく}ってみました。{家族|かぞく}も「おいしい」と{言|い}っていました。', romaji: 'Obāsan no sūpu o tsukutte mimashita. Kazoku mo "oishii" to itte imashita.', hu: 'Megfőztem a nagymamád levesét. A családom is azt mondta, finom.' },
          { jp: '{来年|らいねん}、{日本|にほん}で{会|あ}うのを{楽|たの}しみにしています。', romaji: 'Rainen, Nihon de au no o tanoshimi ni shite imasu.', hu: 'Alig várom, hogy jövőre Japánban találkozzunk.' },
          { jp: 'おばあさんにもよろしくお{伝|つた}えください。', romaji: 'Obāsan ni mo yoroshiku o-tsutae kudasai.', hu: 'Add át üdvözletemet a nagymamádnak is.' },
          { jp: 'では、お{体|からだ}に{気|き}をつけて。ユイより', romaji: 'Dewa, o-karada ni ki o tsukete. Yui yori', hu: 'Vigyázz magadra! Jui' }
        ],
        notes: [
          'Idősebbnek, tanárnak a megszólítás 〜{様|さま} vagy 〜{先生|せんせい}, a köszönet pedig 〜てくださって、ありがとうございました.',
          'A <b>より</b> itt nem összehasonlítás: a feladót jelöli („Juitól").'
        ],
        tip: 'Egy jó köszönőlevél nem hosszú, hanem pontos: nevezd meg, mit köszönsz.'
      }
    ],
    phrases: [
      { jp: 'お{世話|せわ}になりました。', romaji: 'O-sewa ni narimashita.', hu: 'Köszönök mindent, amit értem tettek.', note: 'Búcsúzáskor mondod annak, aki gondodat viselte.' },
      { jp: 'おかげさまで、{無事|ぶじ}に{着|つ}きました。', romaji: 'Okagesama de, buji ni tsukimashita.', hu: 'Hála önöknek, szerencsésen megérkeztem.' },
      { jp: 'また{会|あ}うのを{楽|たの}しみにしています。', romaji: 'Mata au no o tanoshimi ni shite imasu.', hu: 'Alig várom, hogy újra találkozzunk.' },
      { jp: 'ご{家族|かぞく}のみなさんによろしくお{伝|つた}えください。', romaji: 'Go-kazoku no mina-san ni yoroshiku o-tsutae kudasai.', hu: 'Kérem, adja át üdvözletemet a családjának.' },
      { jp: 'どうぞお{元気|げんき}で。', romaji: 'Dōzo o-genki de.', hu: 'Minden jót, vigyázzon magára!' },
      { jp: '{気|き}をつけて{帰|かえ}ってください。', romaji: 'Ki o tsukete kaette kudasai.', hu: 'Jó utat hazafelé!' },
      { jp: '{行|い}ってらっしゃい。', romaji: 'Itterasshai.', hu: 'Menj csak, várunk vissza!', note: 'Az otthon maradó válasza az {行|い}ってきます köszönésre.' },
      { jp: 'ただいま。', romaji: 'Tadaima.', hu: 'Megjöttem!' },
      { jp: 'おかえりなさい。', romaji: 'Okaerinasai.', hu: 'Isten hozott itthon!' },
      { jp: 'ゆっくりしていってください。', romaji: 'Yukkuri shite itte kudasai.', hu: 'Érezze otthon magát, maradjon nyugodtan!', note: 'Vendégnek mondják: szó szerint „pihenjen, mielőtt elmegy".' }
    ],
    words: [
      {
        title: 'Búcsú és utazás',
        items: [
          { jp: '{荷物|にもつ}', romaji: 'nimotsu', hu: 'csomag' },
          { jp: 'スーツケース', romaji: 'sūtsukēsu', hu: 'bőrönd' },
          { jp: 'お{土産|みやげ}', romaji: 'o-miyage', hu: 'ajándék az útról' },
          { jp: '{空港|くうこう}', romaji: 'kūkō', hu: 'repülőtér' },
          { jp: '{出発|しゅっぱつ}', romaji: 'shuppatsu', hu: 'indulás' },
          { jp: '{到着|とうちゃく}', romaji: 'tōchaku', hu: 'érkezés' },
          { jp: '{見送|みおく}り', romaji: 'miokuri', hu: 'kikísérés, búcsúztatás' },
          { jp: '{思|おも}い{出|で}', romaji: 'omoide', hu: 'emlék' },
          { jp: '{無事|ぶじ}に', romaji: 'buji ni', hu: 'szerencsésen, baj nélkül' }
        ]
      },
      {
        title: 'A változás igéi',
        note: 'Ezek után áll leggyakrabban てきました és ていきます.',
        items: [
          { jp: '{増|ふ}えます', romaji: 'fuemasu', hu: 'nő, szaporodik' },
          { jp: '{減|へ}ります', romaji: 'herimasu', hu: 'csökken' },
          { jp: '{変|か}わります', romaji: 'kawarimasu', hu: 'megváltozik' },
          { jp: '{慣|な}れます', romaji: 'naremasu', hu: 'megszokik' },
          { jp: '{続|つづ}けます', romaji: 'tsuzukemasu', hu: 'folytat' },
          { jp: '{咲|さ}きます', romaji: 'sakimasu', hu: 'kinyílik (virág)' },
          { jp: '{散|ち}ります', romaji: 'chirimasu', hu: 'lehull (szirom)' },
          { jp: 'ぬれます', romaji: 'nuremasu', hu: 'megázik, vizes lesz' },
          { jp: '{乾|かわ}きます', romaji: 'kawakimasu', hu: 'megszárad' }
        ]
      },
      {
        title: 'A változás kísérőszavai',
        items: [
          { jp: 'だんだん', romaji: 'dandan', hu: 'fokozatosan' },
          { jp: 'どんどん', romaji: 'dondon', hu: 'egyre gyorsabban' },
          { jp: '{少|すこ}しずつ', romaji: 'sukoshi zutsu', hu: 'apránként' },
          { jp: '{最近|さいきん}', romaji: 'saikin', hu: 'mostanában' },
          { jp: '{今|いま}まで', romaji: 'ima made', hu: 'mostanáig' },
          { jp: 'これから', romaji: 'kore kara', hu: 'mostantól' }
        ]
      },
      {
        title: 'Rövidített jövevényszavak',
        note: 'A hosszú idegen szavakat a japán többnyire négy szótagnyira rövidíti.',
        items: [
          { jp: 'デジカメ', romaji: 'dejikame', hu: 'digitális fényképezőgép' },
          { jp: 'パソコン', romaji: 'pasokon', hu: 'számítógép' },
          { jp: 'リモコン', romaji: 'rimokon', hu: 'távirányító' },
          { jp: 'エアコン', romaji: 'eakon', hu: 'légkondicionáló' },
          { jp: 'スマホ', romaji: 'sumaho', hu: 'okostelefon' },
          { jp: 'コンビニ', romaji: 'konbini', hu: 'éjjel-nappali kisbolt' }
        ]
      }
    ],
    culture: [
      {
        title: 'Köszönet levélben',
        text: 'Aki vendégségből, hosszabb útról hazatér, néhány napon belül <b>köszönőlevelet</b> (お{礼|れい}の{手紙|てがみ}) vagy üzenetet ír a vendéglátóinak. A levélnek megszokott rendje van: megszólítás, érdeklődés a címzett egészsége felől, egy mondat az évszakról és a saját hogylétedről, majd a <b>konkrét</b> köszönet — nem általában „mindenért", hanem azért, amit valóban tettek. A végén a viszontlátás reménye és jókívánság áll. A feladó neve után a <b>より</b> („-tól") szerepel.'
      },
      {
        title: 'Elmegyek — megjöttem',
        text: 'A japán otthon négy állandó mondata: aki elindul, azt mondja, <b>{行|い}ってきます</b> („elmegyek, és visszajövök"); aki marad, azt feleli, <b>{行|い}ってらっしゃい</b>. Hazaérkezve <b>ただいま</b> („megjöttem") hangzik el, a válasz <b>おかえりなさい</b>. Ezek nem üres formulák: az indulót azzal engedik el, hogy visszavárják. Munkahelyen is így köszönnek, ha valaki kilép egy ügyet elintézni.'
      },
      {
        title: 'Rövidítés japán módra',
        text: 'A hosszú jövevényszavak ritkán maradnak épek. A szokásos recept: az összetétel mindkét tagjából az első két szótag marad meg — デジタルカメラ → <b>デジカメ</b>, パーソナルコンピューター → <b>パソコン</b>, リモートコントロール → <b>リモコン</b>. Az eredmény japán szó: a külföldi nem érti, hiába az ő nyelvéből származik. Ha egy katakanás szót nem ismersz fel, gyanakodj rövidítésre.'
      },
      {
        title: 'Tanítás után',
        text: 'A japán diák napja nem ér véget az utolsó órával. A legtöbben <b>klubfoglalkozásra</b> járnak — sport, zene, kalligráfia, teaszertartás —, sokszor mindennap, hétvégén is. Este sokan különórára vagy felvételi-előkészítő iskolába mennek. Ezért számít egy japán vendégnek meglepőnek, hogy a magyar diákok délután egyszerűen hazamennek.'
      }
    ],
    quiz: [
      { q: '„Elugrom innivalóért, és visszajövök." Mi hiányzik?', jp: '{飲|の}み{物|もの}を{買|か}って＿。', a: 'きます', wrong: ['いきます', 'あります', 'います'], why: 'Megteszem és visszajövök: てきます.' },
      { q: 'Mit mondasz, amikor elindulsz otthonról?', a: '{行|い}ってきます。', wrong: ['{行|い}っていきます。', 'ただいま。', 'おかえりなさい。'], why: '{行|い}ってきます: elmegyek, és visszajövök.' },
      { q: '„Elrepült a madár." Mi hiányzik?', jp: '{鳥|とり}が{飛|と}んで＿。', a: 'いきました', wrong: ['きました', 'ありました', 'おきました'], why: 'Távolodik tőlem: ていきます.' },
      { q: '„Eleredt az eső." Mi hiányzik?', jp: '{雨|あめ}が{降|ふ}って＿。', a: 'きました', wrong: ['いきました', 'ありました', 'おきました'], why: 'A változás mostanra ért ide: てきました.' },
      { q: 'Mit jelent: {寒|さむ}くなってきました。', a: 'Kezd hideg lenni.', wrong: ['Már nincs hideg.', 'Hideg volt, amikor megjöttem.', 'Hidegben jöttem ide.'], why: 'なってきました: a változás elindult, és mostanra érezhető.' },
      { q: '„Ezután is tovább tanulok japánul." Mi hiányzik?', jp: 'これからも{日本語|にほんご}を{勉強|べんきょう}して＿。', a: 'いきます', wrong: ['きました', 'あります', 'みました'], why: 'Mostantól a jövő felé: ていきます.' },
      { q: '„Áll az óra." Mi hiányzik?', jp: '{時計|とけい}が＿います。', a: '{止|と}まって', wrong: ['{止|と}めて', '{止|と}まり', '{止|と}まる'], why: 'Állapot: tárgyatlan ige ({止|と}まります) て-alakja + います.' },
      {
        q: 'Mit jelent: {財布|さいふ}が{落|お}ちています。',
        a: 'Egy pénztárca hever a földön.',
        wrong: ['Elejtem a pénztárcámat.', 'Éppen esik le a pénztárca.', 'Elvesztettem a pénztárcámat.'],
        why: 'Tárgyatlan ige + ています: az eredmény állapota, nem folyamat.'
      },
      { q: '„A barátom hozott szuvenírt." Mi hiányzik?', jp: '{友|とも}だちがお{土産|みやげ}を{持|も}って＿。', a: 'きました', wrong: ['いきました', 'ありました', 'いました'], why: 'Ide, felém hozta: {持|も}ってきました.' },
      { q: 'Melyik mondat ír le állapotot (nem cselekvést)?', a: 'コップが{割|わ}れています。', wrong: ['コップを{割|わ}りました。', 'コップを{割|わ}っています。', 'コップを{割|わ}らないでください。'], why: 'が + tárgyatlan ige + ています: állapot.' },
      { q: '„Kimegyek a mosdóba, mindjárt jövök." Mi hiányzik?', jp: 'ちょっとトイレに{行|い}って＿。', a: 'きます', wrong: ['いきます', 'います', 'あります'], why: 'Megteszem, és visszajövök: て-alak + きます.' },
      { q: 'Mit mond az, aki otthon marad, amikor a másik elindul?', a: '{行|い}ってらっしゃい。', wrong: ['{行|い}ってきます。', 'ただいま。', 'おかえりなさい。'], why: 'Az induló azt mondja: {行|い}ってきます; a válasz: {行|い}ってらっしゃい.' },
      { q: '„Bort viszek a buliba." Mi hiányzik?', jp: 'パーティーにワインを{持|も}って＿。', a: 'いきます', wrong: ['きます', 'います', 'あります'], why: 'Innen elviszed: て-alak + いきます.' },
      {
        q: 'Mit jelent: {日本|にほん}の{生活|せいかつ}に{慣|な}れてきました。',
        a: 'Kezdem megszokni a japán életet.',
        wrong: [
          'Ezután fogom megszokni a japán életet.',
          'Nem tudom megszokni a japán életet.',
          'Régen megszoktam, de már elfelejtettem.'
        ],
        why: 'A てきました a múltból a mostig tartó változást jelzi.'
      },
      { q: '„Mostantól egyre hidegebb lesz." Mi hiányzik?', jp: 'これからどんどん{寒|さむ}くなって＿。', a: 'いきます', wrong: ['きました', 'いました', 'あります'], why: 'A これから a jövőre mutat: a változás a mosttól halad tovább — ていきます.' },
      { q: 'Melyik mondat ír le olyan változást, amely a múltból a mostig tart?', a: '{人|ひと}が{増|ふ}えてきました。', wrong: ['{人|ひと}が{増|ふ}えていきます。', '{人|ひと}が{増|ふ}えるでしょう。', '{人|ひと}が{増|ふ}えません。'], why: 'てきました: mostanáig. ていきます: mostantól.' },
      { q: '„Vizes a hajad." Mi hiányzik?', jp: '{髪|かみ}が＿いますよ。', a: 'ぬれて', wrong: ['ぬれ', 'ぬれる', 'ぬらして'], why: 'Állapot: tárgyatlan ige て-alakja + います.' },
      { q: '„Nemcsak olcsó, hanem finom is." Mi hiányzik?', jp: 'このレストランは{安|やす}い＿、おいしいです。', a: 'だけでなく', wrong: ['だけ', 'しか', 'まで'], why: 'A だけでなく = „nem csak"; utána jön a ráadás.' },
      { q: '„A tanáromnak köszönhetően átmentem a vizsgán." Mi hiányzik?', jp: '{先生|せんせい}の＿で、{試験|しけん}に{合格|ごうかく}しました。', a: 'おかげ', wrong: ['せい', 'まえ', 'あと'], why: 'Jó eredménynél おかげ; a せい rossz eredményt, hibáztatást jelez.' },
      {
        q: 'Mit jelent: {着|つ}いたとき、{店|みせ}はもう{閉|し}まっていました。',
        a: 'Mire odaértem, a bolt már zárva volt.',
        wrong: [
          'Amikor odaértem, éppen bezárták a boltot.',
          'Mire odaértem, a bolt még nyitva volt.',
          'Odaértem, és bezártam a boltot.'
        ],
        why: 'A {閉|し}まっていました állapot a múltban: akkor már zárva volt.'
      }
    ]
  },

  /* ════════════════ DEKIRU 2 ════════════════ */

  /* ── 25. lecke ────────────────────────────────────── */
  {
    id: 'l25', no: 25, book: 'Dekiru 2',
    title: 'A repülőtéren',
    lead: 'Feltevést és megalapozott várakozást fejezel ki, kérdést ágyazol a mondatba, és megismered a baráti rákérdezést.',
    cando: [
      'Válaszolsz az útlevél-ellenőrzés kérdéseire.',
      'Megmondod, mit tartasz valószínűnek, és mire számítasz.',
      'Segítesz valakinek, aki bajba került.'
    ],
    points: [
      {
        title: '〜だろうとおもいます', sub: 'azt hiszem, valószínűleg',
        pattern: 'rövid alak + だろう (と{思|おも}います)',
        body: 'A <b>だろう</b> a でしょう rövid alakja: feltevés. A と{思|おも}います hozzátéve udvarias, óvatos vélemény lesz belőle. Főnév és な-melléknév után közvetlenül áll, だ nélkül.',
        examples: [
          { jp: '{飛行機|ひこうき}は{遅|おく}れるだろうと{思|おも}います。', romaji: 'Hikōki wa okureru darō to omoimasu.', hu: 'Azt hiszem, a gép késni fog.' },
          { jp: 'あしたは{晴|は}れるだろう。', romaji: 'Ashita wa hareru darō.', hu: 'Holnap valószínűleg kisüt a nap.' },
          { jp: '{彼|かれ}はもう{着|つ}いただろうと{思|おも}います。', romaji: 'Kare wa mō tsuita darō to omoimasu.', hu: 'Azt hiszem, ő már megérkezett.' }
        ]
      },
      {
        title: '〜はずです', sub: 'elvileg, úgy kell lennie',
        pattern: 'rövid alak + はずです · főnév + のはず · な-melléknév + なはず',
        body: 'Megalapozott várakozás: van okod úgy gondolni (menetrend, ígéret, logika). A はず főnév, ezért főnév után <b>の</b>, な-melléknév után <b>な</b> kell elé.',
        examples: [
          { jp: '{荷物|にもつ}はもう{届|とど}いているはずです。', romaji: 'Nimotsu wa mō todoite iru hazu desu.', hu: 'A csomagnak már meg kellett érkeznie.' },
          { jp: '{田中|たなか}さんは{今日|きょう}{休|やす}みのはずです。', romaji: 'Tanaka-san wa kyō yasumi no hazu desu.', hu: 'Tanakának ma elvileg szabadnapja van.' },
          { jp: 'この{道|みち}で{合|あ}っているはずです。', romaji: 'Kono michi de atte iru hazu desu.', hu: 'Elvileg ez a jó út.' }
        ],
        tip: 'だろう: puszta feltevés. はずです: van rá alapod. A saját szándékodra nem használod.'
      },
      {
        title: 'kérdőszó + 〜か', sub: 'kérdés a mondatban',
        pattern: 'kérdőszó + rövid alak + か、…',
        body: 'Ha egy kérdés egy nagyobb mondat része („nem tudom, hol van"), a beágyazott rész rövid alakban áll, és <b>か</b> zárja. Főnév és な-melléknév után nincs だ.',
        examples: [
          { jp: 'トイレがどこにあるか、{教|おし}えてください。', romaji: 'Toire ga doko ni aru ka, oshiete kudasai.', hu: 'Mondja meg, kérem, hol van a mosdó.' },
          { jp: '{何時|なんじ}に{着|つ}くか、わかりません。', romaji: 'Nanji ni tsuku ka, wakarimasen.', hu: 'Nem tudom, hánykor érkezünk.' },
          { jp: 'だれが{来|く}るか、{知|し}っていますか。', romaji: 'Dare ga kuru ka, shitte imasu ka.', hu: 'Tudod, ki jön?' }
        ]
      },
      {
        title: '〜かどうか', sub: 'hogy …-e',
        pattern: 'rövid alak + かどうか、…',
        body: 'Ha a beágyazott kérdésben nincs kérdőszó (igen–nem kérdés), a <b>かどうか</b> jelenti: „vajon …-e vagy sem".',
        examples: [
          { jp: '{間|ま}に{合|あ}うかどうか、わかりません。', romaji: 'Ma ni au ka dō ka, wakarimasen.', hu: 'Nem tudom, odaérek-e időben.' },
          { jp: '{席|せき}が{空|あ}いているかどうか、{聞|き}いてみます。', romaji: 'Seki ga aite iru ka dō ka, kiite mimasu.', hu: 'Megkérdezem, van-e szabad hely.' },
          { jp: 'おいしいかどうか、{食|た}べてみてください。', romaji: 'Oishii ka dō ka, tabete mite kudasai.', hu: 'Kóstolja meg, finom-e.' }
        ],
        tip: 'Kérdőszóval csak か áll: どこにあるか. A どこにあるかどうか hibás.'
      },
      {
        title: '〜の？', sub: 'baráti kérdés',
        pattern: 'rövid alak + の？ · főnév / な-melléknév + なの？',
        body: 'A 〜んですか baráti, közvetlen változata: emelkedő hanglejtéssel kérdez, és magyarázatot, részleteket vár. Tanárral, idegennel ne használd.',
        examples: [
          { jp: 'どこへ{行|い}くの？', romaji: 'Doko e iku no?', hu: 'Hová mész?' },
          { jp: 'どうしたの？', romaji: 'Dō shita no?', hu: 'Mi történt veled?' },
          { jp: 'あした、{休|やす}みなの？', romaji: 'Ashita, yasumi na no?', hu: 'Holnap szabad vagy?' }
        ]
      }
    ],
    quiz: [
      { q: '„Azt hiszem, a gép késni fog." Mi hiányzik?', jp: '{飛行機|ひこうき}は{遅|おく}れる＿と{思|おも}います。', a: 'だろう', wrong: ['です', 'ます', 'かどうか'],
        why: 'Feltevés: rövid alak + だろう + と{思|おも}います.' },
      { q: '„Tanakának ma elvileg szabadnapja van." Mi hiányzik?', jp: '{田中|たなか}さんは{今日|きょう}{休|やす}み＿はずです。', a: 'の', wrong: ['な', 'だ', 'に'],
        why: 'Főnév után: のはずです.' },
      { q: '„A csomagnak már meg kellett érkeznie." Mi hiányzik?', jp: '{荷物|にもつ}はもう{届|とど}いている＿です。', a: 'はず', wrong: ['かどうか', 'だろう', 'とき'],
        why: 'Megalapozott várakozás: rövid alak + はずです.' },
      { q: '„Nem tudom, hánykor érkezünk." Mi hiányzik?', jp: '{何時|なんじ}に{着|つ}く＿、わかりません。', a: 'か', wrong: ['かどうか', 'と', 'を'],
        why: 'Kérdőszó mellett a beágyazott kérdést か zárja, nem かどうか.' },
      { q: '„Nem tudom, odaérek-e időben." Mi hiányzik?', jp: '{間|ま}に{合|あ}う＿、わかりません。', a: 'かどうか', wrong: ['だろう', 'はず', 'ので'],
        why: 'Kérdőszó nélküli beágyazott kérdés: かどうか.' },
      { q: 'Melyik mondat helyes: „Mondja meg, kérem, hol van a mosdó."', a: 'トイレがどこにあるか、{教|おし}えてください。',
        wrong: ['トイレがどこにあるかどうか、{教|おし}えてください。', 'トイレがどこにありますと、{教|おし}えてください。', 'トイレがどこにあるの、{教|おし}えてください。'],
        why: 'Kérdőszó + rövid alak + か.' },
      { q: 'Mit jelent: どこへ{行|い}くの？', a: 'Hová mész? (baráti)', wrong: ['Hová menjek?', 'El kell menned?', 'Hová mentél?'],
        why: 'A の？ baráti kérdés; a {行|い}く jelen idejű.' },
      { q: '„Holnap szabad vagy?" (baráti) Mi hiányzik?', jp: 'あした、{休|やす}み＿の？', a: 'な', wrong: ['だ', 'で', 'に'],
        why: 'Főnév után: なの？' },
      { q: 'Melyik mondat fejez ki megalapozott várakozást (például a menetrend alapján)?', a: '{電車|でんしゃ}は{十時|じゅうじ}に{着|つ}くはずです。',
        wrong: ['{電車|でんしゃ}は{十時|じゅうじ}に{着|つ}くだろう。', '{電車|でんしゃ}は{十時|じゅうじ}に{着|つ}くかもしれません。', '{電車|でんしゃ}は{十時|じゅうじ}に{着|つ}くの？'],
        why: 'A はずです mögött ok áll; a だろう és a かもしれません csak feltevés.' },
      { q: '„Kóstolja meg, finom-e." Mi hiányzik?', jp: 'おいしい＿、{食|た}べてみてください。', a: 'かどうか', wrong: ['だろう', 'はず', 'のに'],
        why: 'Igen–nem kérdés beágyazva: かどうか.' }
    ]
  },

  /* ── 26. lecke ────────────────────────────────────── */
  {
    id: 'l26', no: 26, book: 'Dekiru 2',
    title: 'Álmok és tervek',
    lead: 'Feltételt fejezel ki, megtanulod az ige szándékos alakját, beszélsz arról, mit tervezel, és megadod a határidőt.',
    cando: [
      'Programot ajánlasz, és megbeszéled a részleteket.',
      'Beszélsz az álmaidról és a terveidről.',
      'Beszélsz foglalkozásokról, hivatásokról.'
    ],
    points: [
      {
        title: '〜たら (feltétel)', sub: 'ha…',
        pattern: 'た-alak + ら · い → かったら · főnév / な-melléknév + だったら',
        body: 'A legáltalánosabb feltételes alak: a múlt idejű rövid alakhoz <b>ら</b> járul. Egy konkrét esetre vonatkozik, és utána bármi állhat: kérés, szándék, javaslat is.',
        examples: [
          { jp: '{雨|あめ}が{降|ふ}ったら、{行|い}きません。', romaji: 'Ame ga futtara, ikimasen.', hu: 'Ha esik az eső, nem megyek.' },
          { jp: '{安|やす}かったら、{買|か}います。', romaji: 'Yasukattara, kaimasu.', hu: 'Ha olcsó, megveszem.' },
          { jp: '{暇|ひま}だったら、{遊|あそ}びに{来|き}てください。', romaji: 'Hima dattara, asobi ni kite kudasai.', hu: 'Ha ráérsz, gyere el hozzánk.' }
        ]
      },
      {
        title: '〜たら (utána)', sub: 'amikor majd, miután',
        pattern: 'た-alak + ら、…',
        body: 'Ha a feltétel biztosan bekövetkezik, a たら azt jelenti: „amikor az megvan, utána". A sorrend a lényeg.',
        examples: [
          { jp: '{駅|えき}に{着|つ}いたら、{電話|でんわ}します。', romaji: 'Eki ni tsuitara, denwa shimasu.', hu: 'Amikor megérkezem az állomásra, telefonálok.' },
          { jp: '{大学|だいがく}を{卒業|そつぎょう}したら、{日本|にほん}で{働|はたら}きたいです。', romaji: 'Daigaku o sotsugyō shitara, Nihon de hatarakitai desu.', hu: 'Ha elvégzem az egyetemet, Japánban szeretnék dolgozni.' },
          { jp: '{宿題|しゅくだい}が{終|お}わったら、ゲームをしてもいいですよ。', romaji: 'Shukudai ga owattara, gēmu o shite mo ii desu yo.', hu: 'Ha kész a lecke, játszhatsz.' }
        ]
      },
      {
        title: 'Szándékos alak', sub: 'csináljuk! · na, megcsinálom',
        pattern: '1. csoport: u-hang → ō · 2. csoport: る → よう',
        body: 'A 〜ましょう rövid alakja. Az 1. csoportnál az utolsó hang <b>おう</b>-ra vált: {行|い}く → {行|い}こう, {飲|の}む → {飲|の}もう, {買|か}う → {買|か}おう. A 2. csoportnál る helyett <b>よう</b>: {食|た}べる → {食|た}べよう. Rendhagyó: する → しよう, {来|く}る → {来|こ}よう.',
        examples: [
          { jp: 'いっしょに{帰|かえ}ろう。', romaji: 'Issho ni kaerō.', hu: 'Menjünk haza együtt!' },
          { jp: '{少|すこ}し{休|やす}もう。', romaji: 'Sukoshi yasumō.', hu: 'Pihenjünk egy kicsit!' },
          { jp: 'もう{寝|ね}よう。', romaji: 'Mō neyō.', hu: 'Na, lefekszem.' }
        ]
      },
      {
        title: '〜ようとおもいます', sub: 'azt tervezem, hogy…',
        pattern: 'szándékos alak + と{思|おも}います / と{思|おも}っています',
        body: 'A saját tervedet így mondod el udvariasan. A <b>と{思|おも}っています</b> azt jelzi, hogy a terv már egy ideje érlelődik.',
        examples: [
          { jp: '{来年|らいねん}、{留学|りゅうがく}しようと{思|おも}っています。', romaji: 'Rainen, ryūgaku shiyō to omotte imasu.', hu: 'Azt tervezem, hogy jövőre külföldön tanulok.' },
          { jp: '{今晩|こんばん}は{早|はや}く{寝|ね}ようと{思|おも}います。', romaji: 'Konban wa hayaku neyō to omoimasu.', hu: 'Úgy gondolom, ma korán lefekszem.' },
          { jp: '{新|あたら}しいパソコンを{買|か}おうと{思|おも}っています。', romaji: 'Atarashii pasokon o kaō to omotte imasu.', hu: 'Azt tervezem, hogy veszek egy új gépet.' }
        ],
        tip: 'つもりです: szilárd elhatározás. 〜ようと{思|おも}います: terv, ami még változhat.'
      },
      {
        title: '〜までに', sub: 'legkésőbb …-ig',
        pattern: 'időpont + までに',
        body: 'Határidő: a cselekvés addigra egyszer megtörténik. A <b>まで</b> ezzel szemben azt jelenti, hogy valami addig <i>folyamatosan</i> tart.',
        examples: [
          { jp: '{金曜日|きんようび}までにレポートを{出|だ}してください。', romaji: 'Kinyōbi made ni repōto o dashite kudasai.', hu: 'Péntekig adja le a beszámolót.' },
          { jp: '{五時|ごじ}までに{帰|かえ}ります。', romaji: 'Goji made ni kaerimasu.', hu: 'Legkésőbb ötre hazaérek.' },
          { jp: '{五時|ごじ}まで{働|はたら}きます。', romaji: 'Goji made hatarakimasu.', hu: 'Ötig dolgozom.' }
        ]
      },
      {
        title: 'főnév + らしい', sub: 'igazi, hozzá illő',
        pattern: 'főnév + らしい + főnév',
        body: 'Azt jelenti: pontosan olyan, amilyennek az ember az adott dolgot elképzeli. い-melléknévként ragozódik.',
        examples: [
          { jp: '{今日|きょう}は{春|はる}らしい{天気|てんき}です。', romaji: 'Kyō wa haru rashii tenki desu.', hu: 'Ma igazi tavaszi idő van.' },
          { jp: '{田中|たなか}さんらしい{考|かんが}えですね。', romaji: 'Tanaka-san rashii kangae desu ne.', hu: 'Ez Tanakára valló ötlet.' },
          { jp: '{子|こ}どもらしい{絵|え}です。', romaji: 'Kodomo rashii e desu.', hu: 'Igazi gyerekrajz.' }
        ]
      }
    ],
    quiz: [
      { q: '„Ha esik az eső, nem megyek." Mi hiányzik?', jp: '{雨|あめ}が＿、{行|い}きません。', a: '{降|ふ}ったら', wrong: ['{降|ふ}るたら', '{降|ふ}りたら', '{降|ふ}ってら'],
        why: 'た-alak + ら: {降|ふ}った → {降|ふ}ったら.' },
      { q: '„Ha olcsó, megveszem." Mi hiányzik?', jp: '＿、{買|か}います。', a: '{安|やす}かったら', wrong: ['{安|やす}いたら', '{安|やす}いだったら', '{安|やす}くたら'],
        why: 'い-melléknév: い → かったら.' },
      { q: '„Ha ráérsz, gyere el hozzánk." Mi hiányzik?', jp: '{暇|ひま}＿、{遊|あそ}びに{来|き}てください。', a: 'だったら', wrong: ['かったら', 'たら', 'くたら'],
        why: 'な-melléknév + だったら.' },
      { q: 'Mi a {行|い}きます szándékos alakja?', a: '{行|い}こう', wrong: ['{行|い}きよう', '{行|い}くよう', '{行|い}かう'],
        why: '1. csoport: く → こう.' },
      { q: 'Mi a {食|た}べます szándékos alakja?', a: '{食|た}べよう', wrong: ['{食|た}べろう', '{食|た}ぼう', '{食|た}べおう'],
        why: '2. csoport: る → よう.' },
      { q: '„Azt tervezem, hogy jövőre külföldön tanulok." Mi hiányzik?', jp: '{来年|らいねん}、{留学|りゅうがく}＿と{思|おも}っています。', a: 'しよう', wrong: ['して', 'しろう', 'すよう'],
        why: 'A する szándékos alakja しよう.' },
      { q: '„Péntekig adja le a beszámolót." Mi hiányzik?', jp: '{金曜日|きんようび}＿レポートを{出|だ}してください。', a: 'までに', wrong: ['まで', 'から', 'より'],
        why: 'Határidő: までに. A まで folyamatos időtartamot jelöl.' },
      { q: 'Mit jelent: {五時|ごじ}まで{働|はたら}きます。', a: 'Ötig dolgozom (addig folyamatosan).', wrong: ['Öttől dolgozom.', 'Ötkor kezdek dolgozni.', 'Öt órát dolgozom.'],
        why: 'まで: addig tart a cselekvés.' },
      { q: 'Mit jelent: {今日|きょう}は{春|はる}らしい{天気|てんき}です。', a: 'Ma igazi tavaszi idő van.',
        wrong: ['Úgy hallom, ma tavaszias idő lesz.', 'Ma nincs tavaszias idő.', 'Tavasszal ilyen az idő?'],
        why: 'főnév + らしい: olyan, amilyennek a tavaszt elképzeljük.' },
      { q: '„Amikor megérkezem az állomásra, telefonálok." Mi hiányzik?', jp: '{駅|えき}に＿、{電話|でんわ}します。', a: '{着|つ}いたら', wrong: ['{着|つ}くたら', '{着|つ}きたら', '{着|つ}いてら'],
        why: '{着|つ}いた + ら: miután megérkeztem.' }
    ]
  },

  /* ── 27. lecke ────────────────────────────────────── */
  {
    id: 'l27', no: 27, book: 'Dekiru 2',
    title: 'Ki mit tud?',
    lead: 'Megtanulod az ige ható alakját, kifejezed, hogy valami egészen biztos, példákat sorolsz, és melléknévből főnevet képzel.',
    cando: [
      'Felosztod a feladatokat egy közös munkában.',
      'Megmondod, mit tudsz megcsinálni és mit nem.',
      'Utasítást adsz, és megérted a neked szólót.'
    ],
    points: [
      {
        title: 'Ható alak (1. csoport)', sub: 'tudok, lehet',
        pattern: 'u-hang → e-hang + ます',
        body: 'Az 1. csoportú igéknél a szótári alak utolsó hangja <b>e</b>-re vált: {書|か}く → {書|か}けます, {話|はな}す → {話|はな}せます, {飲|の}む → {飲|の}めます, {行|い}く → {行|い}けます, {買|か}う → {買|か}えます. Az így kapott ige a 2. csoport szerint ragozódik tovább: {書|か}けない, {書|か}けた.',
        examples: [
          { jp: '{英語|えいご}が{話|はな}せます。', romaji: 'Eigo ga hanasemasu.', hu: 'Tudok angolul.' },
          { jp: '{漢字|かんじ}が{少|すこ}し{読|よ}めます。', romaji: 'Kanji ga sukoshi yomemasu.', hu: 'Egy kicsit tudok kanjit olvasni.' },
          { jp: 'あした{行|い}けますか。', romaji: 'Ashita ikemasu ka.', hu: 'Holnap el tudsz jönni?' }
        ]
      },
      {
        title: 'Ható alak (2. csoport, rendhagyók)', sub: '〜られます',
        pattern: 'る → られます · します → できます · {来|き}ます → {来|こ}られます',
        body: 'A 2. csoportnál a る helyére <b>られます</b> kerül: {食|た}べる → {食|た}べられます, {見|み}る → {見|み}られます. A します ható párja a már ismert <b>できます</b>.',
        examples: [
          { jp: '{朝|あさ}{早|はや}く{起|お}きられません。', romaji: 'Asa hayaku okiraremasen.', hu: 'Nem tudok korán felkelni.' },
          { jp: '{辛|から}い{料理|りょうり}が{食|た}べられますか。', romaji: 'Karai ryōri ga taberaremasu ka.', hu: 'Meg tudod enni a csípős ételt?' },
          { jp: '{一人|ひとり}で{来|こ}られますか。', romaji: 'Hitori de koraremasu ka.', hu: 'El tudsz jönni egyedül?' }
        ]
      },
      {
        title: 'A ható alak használata', sub: 'képesség és lehetőség',
        pattern: 'tárgy + が + ható alak',
        body: 'Kétféle dolgot jelent: valaki <i>képes</i> valamire, vagy valamit valahol <i>meg lehet tenni</i>. A tárgy rendszerint <b>が</b>-t kap. Jelentése megegyezik a 〜ことができます szerkezetével, de rövidebb és gyakoribb.',
        examples: [
          { jp: 'ここで{写真|しゃしん}が{撮|と}れます。', romaji: 'Koko de shashin ga toremasu.', hu: 'Itt lehet fényképezni.' },
          { jp: 'このカードは{使|つか}えません。', romaji: 'Kono kādo wa tsukaemasen.', hu: 'Ez a kártya nem használható.' },
          { jp: '{駅|えき}で{切符|きっぷ}が{買|か}えます。', romaji: 'Eki de kippu ga kaemasu.', hu: 'Az állomáson lehet jegyet venni.' }
        ]
      },
      {
        title: '〜にきまっています', sub: 'egészen biztos, hogy…',
        pattern: 'rövid alak / főnév + にきまっています',
        body: 'A beszélő teljes meggyőződését fejezi ki: „nyilván", „még szép, hogy". Főnév és な-melléknév után közvetlenül áll.',
        examples: [
          { jp: 'あのチームが{勝|か}つにきまっています。', romaji: 'Ano chīmu ga katsu ni kimatte imasu.', hu: 'Egészen biztos, hogy az a csapat nyer.' },
          { jp: '{一人|ひとり}では{無理|むり}にきまっています。', romaji: 'Hitori de wa muri ni kimatte imasu.', hu: 'Egyedül ez nyilván lehetetlen.' },
          { jp: 'そんなうわさは、うそにきまっています。', romaji: 'Sonna uwasa wa, uso ni kimatte imasu.', hu: 'Az ilyen pletyka nyilván hazugság.' }
        ]
      },
      {
        title: '〜とか', sub: 'például, meg ilyesmi',
        pattern: 'A とか B とか',
        body: 'Példákat sorol a sok közül, lazán, beszélt nyelvi stílusban. Főnév és ige (szótári alak) után is állhat.',
        examples: [
          { jp: '{飲|の}み{物|もの}とかお{菓子|かし}とかを{買|か}ってきます。', romaji: 'Nomimono toka okashi toka o katte kimasu.', hu: 'Hozok innivalót, édességet, ilyesmit.' },
          { jp: '{休|やす}みの{日|ひ}は、{映画|えいが}を{見|み}るとか{本|ほん}を{読|よ}むとかします。', romaji: 'Yasumi no hi wa, eiga o miru toka hon o yomu toka shimasu.', hu: 'Szabadnapon például filmet nézek vagy olvasok.' },
          { jp: '{京都|きょうと}とか{奈良|なら}とかへ{行|い}ってみたいです。', romaji: 'Kyōto toka Nara toka e itte mitai desu.', hu: 'Például Kiotóba vagy Narába szeretnék elmenni.' }
        ]
      },
      {
        title: '〜さ', sub: 'melléknévből főnév',
        pattern: 'い → さ · な-melléknév + さ',
        body: 'A <b>さ</b> mérhető tulajdonságot jelentő főnevet képez: {高|たか}い → {高|たか}さ (magasság), {長|なが}い → {長|なが}さ (hosszúság), {重|おも}い → {重|おも}さ (súly), {便利|べんり} → {便利|べんり}さ (kényelmesség).',
        examples: [
          { jp: 'この{山|やま}の{高|たか}さはどのくらいですか。', romaji: 'Kono yama no takasa wa dono kurai desu ka.', hu: 'Milyen magas ez a hegy?' },
          { jp: '{荷物|にもつ}の{重|おも}さをはかります。', romaji: 'Nimotsu no omosa o hakarimasu.', hu: 'Megmérem a csomag súlyát.' },
          { jp: 'この{町|まち}の{静|しず}かさが{好|す}きです。', romaji: 'Kono machi no shizukasa ga suki desu.', hu: 'Szeretem ennek a városnak a csendjét.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {書|か}きます ható alakja?', a: '{書|か}けます', wrong: ['{書|か}かれます', '{書|か}きられます', '{書|か}こます'],
        why: '1. csoport: く → け + ます.' },
      { q: 'Mi a {食|た}べます ható alakja?', a: '{食|た}べられます', wrong: ['{食|た}べえます', '{食|た}べできます', '{食|た}びられます'],
        why: '2. csoport: る → られます.' },
      { q: 'Mi a します ható alakja?', a: 'できます', wrong: ['しられます', 'せます', 'しえます'],
        why: 'A します ható párja rendhagyó: できます.' },
      { q: '„Tudok angolul." Mi hiányzik?', jp: '{英語|えいご}＿{話|はな}せます。', a: 'が', wrong: ['に', 'で', 'へ'],
        why: 'A ható alak mellett a tárgy が-t kap.' },
      { q: '„Nem tudok korán felkelni." Mi hiányzik?', jp: '{朝|あさ}{早|はや}く＿。', a: '{起|お}きられません', wrong: ['{起|お}けません', '{起|お}きえません', '{起|お}きできません'],
        why: 'Az {起|お}きる 2. csoportú: {起|お}きられる → {起|お}きられません.' },
      { q: '„Egészen biztos, hogy az a csapat nyer." Mi hiányzik?', jp: 'あのチームが{勝|か}つ＿。', a: 'にきまっています', wrong: ['かもしれません', 'かどうかです', 'までにです'],
        why: 'Teljes meggyőződés: にきまっています.' },
      { q: '„Hozok innivalót, édességet, ilyesmit." Mi hiányzik?', jp: '{飲|の}み{物|もの}＿お{菓子|かし}とかを{買|か}ってきます。', a: 'とか', wrong: ['だけ', 'しか', 'まで'],
        why: 'Példák sorolása: A とか B とか.' },
      { q: 'Mi a {高|たか}い főnévi alakja („magasság")?', a: '{高|たか}さ', wrong: ['{高|たか}く', '{高|たか}な', '{高|たか}いさ'],
        why: 'い → さ.' },
      { q: 'Mit jelent: このカードは{使|つか}えません。', a: 'Ez a kártya nem használható.',
        wrong: ['Ezt a kártyát nem használom.', 'Ezt a kártyát nem használtam.', 'Ezt a kártyát használni kell.'],
        why: '{使|つか}えません: a {使|つか}います ható alakjának tagadása.' },
      { q: 'Mi a {来|き}ます ható alakja?', a: 'こられます', wrong: ['きられます', 'くられます', 'きえます'],
        why: 'A {来|き}ます rendhagyó: こられます.' }
    ]
  },

  /* ── 28. lecke ────────────────────────────────────── */
  {
    id: 'l28', no: 28, book: 'Dekiru 2',
    title: 'Melyiket ajánlja?',
    lead: 'Megismered a ば és a なら feltételes alakot, megérted az eladók nagyon udvarias beszédét, indokokat sorolsz, és kifejezed a bizonyosságodat.',
    cando: [
      'Összehasonlítasz dolgokat, és ajánlasz valamit.',
      'Elmagyarázod, hogyan kell használni egy készüléket.',
      'Megérted, amit az eladó udvarias stílusban mond.'
    ],
    points: [
      {
        title: '〜ば', sub: 'ha (általános feltétel)',
        pattern: '1. csoport: u → e + ば · 2. csoport: る → れば · い → ければ',
        body: 'Általános érvényű feltétel: „ha ez teljesül, az következik". Képzése: {行|い}く → {行|い}けば, {飲|の}む → {飲|の}めば, {食|た}べる → {食|た}べれば, する → すれば, {来|く}る → {来|く}れば. Melléknév: {安|やす}い → {安|やす}ければ, いい → <b>よければ</b>. Tagadás: 〜なければ.',
        examples: [
          { jp: 'このボタンを{押|お}せば、ドアが{開|あ}きます。', romaji: 'Kono botan o oseba, doa ga akimasu.', hu: 'Ha megnyomod ezt a gombot, kinyílik az ajtó.' },
          { jp: '{時間|じかん}があれば、{行|い}きたいです。', romaji: 'Jikan ga areba, ikitai desu.', hu: 'Ha lesz időm, szeretnék elmenni.' },
          { jp: '{天気|てんき}がよければ、{散歩|さんぽ}します。', romaji: 'Tenki ga yokereba, sanpo shimasu.', hu: 'Ha jó az idő, sétálok.' }
        ]
      },
      {
        title: '〜なら', sub: 'ha arról van szó',
        pattern: 'főnév + なら · rövid alak + なら',
        body: 'A másik szavára vagy helyzetére reagálsz: „ha már ez a helyzet, akkor…". Tanácsnál, ajánlásnál gyakori. A なら utáni rész időben meg is előzheti a feltételt.',
        examples: [
          { jp: 'パソコンなら、この{店|みせ}が{安|やす}いですよ。', romaji: 'Pasokon nara, kono mise ga yasui desu yo.', hu: 'Ha számítógép kell, ez a bolt olcsó.' },
          { jp: '{京都|きょうと}へ{行|い}くなら、{秋|あき}がいいです。', romaji: 'Kyōto e iku nara, aki ga ii desu.', hu: 'Ha Kiotóba mész, az ősz a legjobb.' },
          { jp: '{嫌|いや}なら、やめてもいいですよ。', romaji: 'Iya nara, yamete mo ii desu yo.', hu: 'Ha nem tetszik, abbahagyhatod.' }
        ],
        tip: 'たら: egy konkrét eset, a sorrend számít. ば: általános feltétel. なら: „ha már arról van szó", tanács.'
      },
      {
        title: '〜でございます', sub: 'nagyon udvarias です',
        pattern: 'です → でございます · あります → ございます',
        body: 'Az üzletek, szállodák, hivatalok alkalmazottai így beszélnek a vevőkkel. Elég megértened; vásárlóként nem neked kell használnod.',
        examples: [
          { jp: 'こちらは{新|あたら}しいモデルでございます。', romaji: 'Kochira wa atarashii moderu de gozaimasu.', hu: 'Ez itt az új modell.' },
          { jp: 'お{手洗|てあら}いは{二階|にかい}にございます。', romaji: 'Otearai wa nikai ni gozaimasu.', hu: 'A mosdó az emeleten található.' },
          { jp: '{申|もう}し{訳|わけ}ございません。', romaji: 'Mōshiwake gozaimasen.', hu: 'Végtelenül sajnálom.' }
        ]
      },
      {
        title: '〜し、〜し', sub: 'ez is, az is (indokok)',
        pattern: 'rövid alak + し、…',
        body: 'Több okot vagy tulajdonságot sorolsz, és sugallod, hogy van még más is. Főnév és な-melléknév után <b>だし</b>.',
        examples: [
          { jp: 'このカメラは{軽|かる}いし、{安|やす}いし、とてもいいです。', romaji: 'Kono kamera wa karui shi, yasui shi, totemo ii desu.', hu: 'Ez a fényképező könnyű is, olcsó is, nagyon jó.' },
          { jp: '{雨|あめ}も{降|ふ}っているし、{今日|きょう}は{出|で}かけません。', romaji: 'Ame mo futte iru shi, kyō wa dekakemasen.', hu: 'Esik is az eső, ma nem megyek sehová.' },
          { jp: '{駅|えき}から{近|ちか}いし、{静|しず}かだし、いい{部屋|へや}ですね。', romaji: 'Eki kara chikai shi, shizuka da shi, ii heya desu ne.', hu: 'Közel van az állomáshoz, csendes is: jó szoba.' }
        ]
      },
      {
        title: '〜にちがいありません', sub: 'kétségtelenül',
        pattern: 'rövid alak / főnév + にちがいありません',
        body: 'Erős, következtetésen alapuló meggyőződés: „biztosan így van". Írásban és választékos beszédben gyakori; rövid alakja にちがいない.',
        examples: [
          { jp: 'あの{人|ひと}は{日本人|にほんじん}にちがいありません。', romaji: 'Ano hito wa nihonjin ni chigai arimasen.', hu: 'Az az ember kétségtelenül japán.' },
          { jp: '{彼|かれ}は{道|みち}に{迷|まよ}ったにちがいありません。', romaji: 'Kare wa michi ni mayotta ni chigai arimasen.', hu: 'Biztosan eltévedt.' },
          { jp: 'この{店|みせ}は{高|たか}いにちがいない。', romaji: 'Kono mise wa takai ni chigai nai.', hu: 'Ez a bolt biztosan drága.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {行|い}きます ば-alakja?', a: '{行|い}けば', wrong: ['{行|い}かば', '{行|い}きば', '{行|い}くば'],
        why: '1. csoport: く → けば.' },
      { q: 'Mi az いい ば-alakja?', a: 'よければ', wrong: ['いければ', 'いいば', 'よくば'],
        why: 'Az いい rendhagyó: よければ.' },
      { q: '„Ha megnyomod ezt a gombot, kinyílik az ajtó." Mi hiányzik?', jp: 'このボタンを＿、ドアが{開|あ}きます。', a: '{押|お}せば', wrong: ['{押|お}しば', '{押|お}さば', '{押|お}すば'],
        why: '{押|お}す → {押|お}せば.' },
      { q: '„Ha számítógép kell, ez a bolt olcsó." Mi hiányzik?', jp: 'パソコン＿、この{店|みせ}が{安|やす}いですよ。', a: 'なら', wrong: ['ば', 'たら', 'し'],
        why: 'Főnév + なら: „ha arról van szó".' },
      { q: '„Ha Kiotóba mész, az ősz a legjobb." Mi hiányzik?', jp: '{京都|きょうと}へ{行|い}く＿、{秋|あき}がいいです。', a: 'なら', wrong: ['ば', 'たら', 'さ'],
        why: 'Tanács a másik tervére: szótári alak + なら.' },
      { q: 'Mit jelent: お{手洗|てあら}いは{二階|にかい}にございます。', a: 'A mosdó az emeleten található.',
        wrong: ['A mosdó az emeleten nem működik.', 'Az emeleten nincs mosdó.', 'Merre van a mosdó?'],
        why: 'ございます = あります, nagyon udvariasan.' },
      { q: 'Ki mondja leginkább: こちらは{新|あたら}しいモデルでございます。', a: 'Eladó a vásárlónak.', wrong: ['Barát a barátnak.', 'Vásárló az eladónak.', 'Gyerek a szülőnek.'],
        why: 'A でございます a kiszolgálók nagyon udvarias stílusa.' },
      { q: '„Ez a fényképező könnyű is, olcsó is." Mi hiányzik?', jp: 'このカメラは{軽|かる}い＿、{安|やす}いし、とてもいいです。', a: 'し', wrong: ['て', 'で', 'と'],
        why: 'Indokok sorolása: rövid alak + し.' },
      { q: '„Az az ember kétségtelenül japán." Mi hiányzik?', jp: 'あの{人|ひと}は{日本人|にほんじん}＿。', a: 'にちがいありません', wrong: ['かもしれません', 'かどうかです', 'らしくないです'],
        why: 'Erős meggyőződés: にちがいありません.' },
      { q: '„…csendes is: jó szoba." Mi hiányzik?', jp: '{駅|えき}から{近|ちか}いし、{静|しず}か＿し、いい{部屋|へや}ですね。', a: 'だ', wrong: ['な', 'の', 'で'],
        why: 'な-melléknév után: だし.' }
    ]
  },

  /* ── 29. lecke ────────────────────────────────────── */
  {
    id: 'l29', no: 29, book: 'Dekiru 2',
    title: 'Új félév',
    lead: 'Megmondod, hol tartasz egy cselekvésben, átadod, amit más kért vagy üzent, és megnevezed, miről van szó.',
    cando: [
      'Megfogalmazol egy kényes, nehezen teljesíthető kérést.',
      'Változtatást kérsz egy már megbeszélt programban.',
      'Átadsz egy üzenetet vagy utasítást.'
    ],
    points: [
      {
        title: '〜るところです', sub: 'éppen készülök…',
        pattern: 'szótári alak + ところです',
        body: 'A <b>ところ</b> („pont, mozzanat") megmutatja, hol tartasz egy cselekvésben. Szótári alakkal: közvetlenül előtte állsz.',
        examples: [
          { jp: 'これから{出|で}かけるところです。', romaji: 'Kore kara dekakeru tokoro desu.', hu: 'Éppen indulni készülök.' },
          { jp: '{今|いま}から{昼|ひる}ごはんを{食|た}べるところです。', romaji: 'Ima kara hirugohan o taberu tokoro desu.', hu: 'Éppen ebédelni készülök.' },
          { jp: 'ちょうど{電話|でんわ}するところでした。', romaji: 'Chōdo denwa suru tokoro deshita.', hu: 'Épp telefonálni akartam.' }
        ]
      },
      {
        title: '〜ているところです', sub: 'éppen csinálom',
        pattern: 'ige て-alak + いるところです',
        body: 'A cselekvés közepén tartasz. A sima 〜ています-nál erősebben hangsúlyozza: <i>ebben a pillanatban</i>.',
        examples: [
          { jp: '{今|いま}、{資料|しりょう}を{作|つく}っているところです。', romaji: 'Ima, shiryō o tsukutte iru tokoro desu.', hu: 'Éppen az anyagot készítem.' },
          { jp: '{今|いま}、{調|しら}べているところです。', romaji: 'Ima, shirabete iru tokoro desu.', hu: 'Éppen utánanézek.' },
          { jp: '{先生|せんせい}と{話|はな}しているところです。', romaji: 'Sensei to hanashite iru tokoro desu.', hu: 'Éppen a tanárral beszélek.' }
        ]
      },
      {
        title: '〜たところです', sub: 'éppen most…',
        pattern: 'た-alak + ところです',
        body: 'A cselekvés ebben a pillanatban fejeződött be. Gyakran áll vele a <b>たった{今|いま}</b> („épp az imént").',
        examples: [
          { jp: 'たった{今|いま}{着|つ}いたところです。', romaji: 'Tatta ima tsuita tokoro desu.', hu: 'Éppen most érkeztem.' },
          { jp: '{授業|じゅぎょう}が{終|お}わったところです。', romaji: 'Jugyō ga owatta tokoro desu.', hu: 'Éppen most ért véget az óra.' },
          { jp: '{今|いま}{起|お}きたところです。', romaji: 'Ima okita tokoro desu.', hu: 'Most keltem fel.' }
        ]
      },
      {
        title: '〜ようにいいます', sub: 'megmondja, hogy tegye',
        pattern: 'szótári alak / ない-alak + ように + {言|い}います',
        body: 'Kérést, utasítást adsz tovább a saját szavaiddal: „azt mondta, hogy tegyem / ne tegyem". A {言|い}います helyén állhat {伝|つた}えます (átad), {頼|たの}みます (megkér) is.',
        examples: [
          { jp: '{先生|せんせい}は{学生|がくせい}に{静|しず}かにするように{言|い}いました。', romaji: 'Sensei wa gakusei ni shizuka ni suru yō ni iimashita.', hu: 'A tanár azt mondta a diákoknak, hogy legyenek csendben.' },
          { jp: '{医者|いしゃ}はお{酒|さけ}を{飲|の}まないように{言|い}いました。', romaji: 'Isha wa osake o nomanai yō ni iimashita.', hu: 'Az orvos azt mondta, ne igyak alkoholt.' },
          { jp: '{田中|たなか}さんに{三時|さんじ}に{来|く}るように{伝|つた}えてください。', romaji: 'Tanaka-san ni sanji ni kuru yō ni tsutaete kudasai.', hu: 'Kérem, mondja meg Tanakának, hogy háromra jöjjön.' }
        ]
      },
      {
        title: '〜ということです', sub: 'úgy tudom, azt üzeni',
        pattern: 'rövid alak + ということです',
        body: 'Mástól kapott információt adsz tovább, tárgyilagosan. Főnév és な-melléknév után <b>だ</b> kell elé.',
        examples: [
          { jp: 'あしたの{授業|じゅぎょう}は{休|やす}みだということです。', romaji: 'Ashita no jugyō wa yasumi da to iu koto desu.', hu: 'Úgy tudom, a holnapi óra elmarad.' },
          { jp: '{田中|たなか}さんは{少|すこ}し{遅|おく}れるということです。', romaji: 'Tanaka-san wa sukoshi okureru to iu koto desu.', hu: 'Tanaka azt üzeni, kicsit késik.' },
          { jp: '{試験|しけん}は{来週|らいしゅう}だということです。', romaji: 'Shiken wa raishū da to iu koto desu.', hu: 'A vizsga állítólag jövő héten lesz.' }
        ]
      },
      {
        title: '〜について', sub: '-ról, -ről',
        pattern: 'főnév + について',
        body: 'A beszéd, gondolkodás, kutatás témáját jelöli: „valamivel kapcsolatban".',
        examples: [
          { jp: '{日本|にほん}の{文化|ぶんか}について{話|はな}します。', romaji: 'Nihon no bunka ni tsuite hanashimasu.', hu: 'A japán kultúráról beszélek.' },
          { jp: 'この{問題|もんだい}について、どう{思|おも}いますか。', romaji: 'Kono mondai ni tsuite, dō omoimasu ka.', hu: 'Mit gondolsz erről a kérdésről?' },
          { jp: '{留学|りゅうがく}について{先生|せんせい}に{相談|そうだん}しました。', romaji: 'Ryūgaku ni tsuite sensei ni sōdan shimashita.', hu: 'A külföldi tanulásról tanácsot kértem a tanártól.' }
        ]
      }
    ],
    quiz: [
      { q: '„Éppen indulni készülök." Mi hiányzik?', jp: 'これから＿ところです。', a: '{出|で}かける', wrong: ['{出|で}かけた', '{出|で}かけている', '{出|で}かけて'],
        why: 'Közvetlenül előtte: szótári alak + ところです.' },
      { q: '„Éppen most érkeztem." Mi hiányzik?', jp: 'たった{今|いま}＿ところです。', a: '{着|つ}いた', wrong: ['{着|つ}く', '{着|つ}いている', '{着|つ}いて'],
        why: 'Épp befejeződött: た-alak + ところです.' },
      { q: '„Éppen az anyagot készítem." Mi hiányzik?', jp: '{今|いま}、{資料|しりょう}を＿ところです。', a: '{作|つく}っている', wrong: ['{作|つく}った', '{作|つく}り', '{作|つく}って'],
        why: 'A cselekvés közepén: 〜ているところです.' },
      { q: 'Mit jelent: {今|いま}{起|お}きたところです。', a: 'Most keltem fel.', wrong: ['Mindjárt felkelek.', 'Még alszom.', 'Fel kell kelnem.'],
        why: 'た-alak + ところ: épp az imént történt.' },
      { q: '„Az orvos azt mondta, ne igyak alkoholt." Mi hiányzik?', jp: '{医者|いしゃ}はお{酒|さけ}を＿ように{言|い}いました。', a: '{飲|の}まない', wrong: ['{飲|の}まなくて', '{飲|の}みません', '{飲|の}んで'],
        why: 'Tiltó utasítás átadva: ない-alak + ように{言|い}います.' },
      { q: '„Mondja meg Tanakának, hogy háromra jöjjön." Mi hiányzik?', jp: '{田中|たなか}さんに{三時|さんじ}に{来|く}る＿{伝|つた}えてください。', a: 'ように', wrong: ['ことに', 'ために', 'ところに'],
        why: 'Utasítás továbbadása: szótári alak + ように.' },
      { q: '„A japán kultúráról beszélek." Mi hiányzik?', jp: '{日本|にほん}の{文化|ぶんか}＿{話|はな}します。', a: 'について', wrong: ['にとって', 'によって', 'として'],
        why: 'A téma: 〜について.' },
      { q: 'Mit jelent: {田中|たなか}さんは{少|すこ}し{遅|おく}れるということです。', a: 'Tanaka azt üzeni, kicsit késik.',
        wrong: ['Tanaka mindig késik.', 'Tanakának nem szabad késnie.', 'Tanaka éppen most késett el.'],
        why: '〜ということです: mástól kapott információ továbbadása.' },
      { q: '„Úgy tudom, a holnapi óra elmarad." Mi hiányzik?', jp: 'あしたの{授業|じゅぎょう}は{休|やす}み＿ということです。', a: 'だ', wrong: ['な', 'の', 'で'],
        why: 'Főnév után だ kell a という elé.' },
      { q: 'Melyik mondat jelenti: „Épp telefonálni akartam."', a: 'ちょうど{電話|でんわ}するところでした。',
        wrong: ['ちょうど{電話|でんわ}したところでした。', 'ちょうど{電話|でんわ}しているところです。', 'ちょうど{電話|でんわ}したことがあります。'],
        why: 'Szótári alak + ところでした: épp azon voltam, hogy megtegyem.' }
    ]
  },

  /* ── 30. lecke ────────────────────────────────────── */
  {
    id: 'l30', no: 30, book: 'Dekiru 2',
    title: 'Közös munka',
    lead: 'Kifejezed a csalódottságodat, megmondod, mi nem kötelező és mi fér bele, és megtanulod a によって két használatát.',
    cando: [
      'Felkérsz valakit egy feladatra, és válaszolsz egy felkérésre.',
      'Megbeszéled másokkal a közös munka részleteit.',
      'Írsz a saját kultúrádról.'
    ],
    points: [
      {
        title: '〜のに', sub: 'pedig, mégis',
        pattern: 'rövid alak + のに · főnév / な-melléknév + なのに',
        body: 'Azt fejezi ki, hogy az eredmény más lett, mint amit vártál: meglepetés, csalódás, bosszúság van benne. Ezért utána nem állhat kérés, javaslat vagy szándék.',
        examples: [
          { jp: '{薬|くすり}を{飲|の}んだのに、{熱|ねつ}が{下|さ}がりません。', romaji: 'Kusuri o nonda noni, netsu ga sagarimasen.', hu: 'Bevettem a gyógyszert, mégsem megy le a lázam.' },
          { jp: '{約束|やくそく}したのに、{彼|かれ}は{来|き}ませんでした。', romaji: 'Yakusoku shita noni, kare wa kimasen deshita.', hu: 'Megígérte, mégsem jött el.' },
          { jp: '{日曜日|にちようび}なのに、{働|はたら}かなければなりません。', romaji: 'Nichiyōbi na noni, hatarakanakereba narimasen.', hu: 'Vasárnap van, mégis dolgoznom kell.' }
        ],
        tip: 'A が és a けれど semleges „de". A のに érzelmet hordoz: nem így kellett volna lennie.'
      },
      {
        title: '〜なくてもかまいません', sub: 'nem baj, ha nem…',
        pattern: 'ない-alak: ない → なくてもかまいません',
        body: 'A 〜なくてもいいです udvariasabb, tapintatosabb párja: „részemről rendben van, ha nem teszed meg".',
        examples: [
          { jp: '{名前|なまえ}は{書|か}かなくてもかまいません。', romaji: 'Namae wa kakanakute mo kamaimasen.', hu: 'Nem baj, ha nem írja oda a nevét.' },
          { jp: '{全部|ぜんぶ}{覚|おぼ}えなくてもかまいません。', romaji: 'Zenbu oboenakute mo kamaimasen.', hu: 'Nem kell mindet megjegyezni.' },
          { jp: '{無理|むり}に{来|こ}なくてもかまいませんよ。', romaji: 'Muri ni konakute mo kamaimasen yo.', hu: 'Nem kell mindenáron eljönnie.' }
        ]
      },
      {
        title: '〜てもかまいません', sub: 'nem baj, ha…',
        pattern: 'ige て-alak + もかまいません',
        body: 'Az engedély udvarias formája; a 〜てもいいです párja. Kérdésként tapintatos engedélykérés.',
        examples: [
          { jp: 'ここに{座|すわ}ってもかまいませんか。', romaji: 'Koko ni suwatte mo kamaimasen ka.', hu: 'Nem baj, ha ideülök?' },
          { jp: '{鉛筆|えんぴつ}で{書|か}いてもかまいません。', romaji: 'Enpitsu de kaite mo kamaimasen.', hu: 'Ceruzával is írhatja.' },
          { jp: '{少|すこ}し{遅|おく}れてもかまいません。', romaji: 'Sukoshi okurete mo kamaimasen.', hu: 'Nem baj, ha kicsit késik.' }
        ]
      },
      {
        title: '〜によって (különbség)', sub: '…-tól függően, …-nként',
        pattern: 'főnév + によって + {違|ちが}います / {変|か}わります',
        body: 'Azt mondja meg, mi szerint tér el valami: országonként, emberenként, naponta más.',
        examples: [
          { jp: '{国|くに}によって{習慣|しゅうかん}が{違|ちが}います。', romaji: 'Kuni ni yotte shūkan ga chigaimasu.', hu: 'Országonként mások a szokások.' },
          { jp: '{人|ひと}によって{考|かんが}え{方|かた}が{違|ちが}います。', romaji: 'Hito ni yotte kangaekata ga chigaimasu.', hu: 'Emberenként más a gondolkodásmód.' },
          { jp: '{日|ひ}によって{値段|ねだん}が{変|か}わります。', romaji: 'Hi ni yotte nedan ga kawarimasu.', hu: 'Naptól függően változik az ár.' }
        ]
      },
      {
        title: '〜によって (eszköz, ok)', sub: 'révén, által, miatt',
        pattern: 'főnév + によって',
        body: 'Ugyanez a szerkezet eszközt vagy okot is jelöl, főleg írott, tárgyilagos stílusban: „valami révén", „valami következtében".',
        examples: [
          { jp: 'インターネットによって{世界|せかい}が{近|ちか}くなりました。', romaji: 'Intānetto ni yotte sekai ga chikaku narimashita.', hu: 'Az internet révén közelebb került a világ.' },
          { jp: '{話|はな}し{合|あ}いによって{決|き}めましょう。', romaji: 'Hanashiai ni yotte kimemashō.', hu: 'Döntsük el megbeszélés útján.' },
          { jp: '{台風|たいふう}によって{電車|でんしゃ}が{止|と}まりました。', romaji: 'Taifū ni yotte densha ga tomarimashita.', hu: 'A tájfun miatt leállt a vonat.' }
        ]
      }
    ],
    quiz: [
      { q: '„Bevettem a gyógyszert, mégsem megy le a lázam." Mi hiányzik?', jp: '{薬|くすり}を{飲|の}んだ＿、{熱|ねつ}が{下|さ}がりません。', a: 'のに', wrong: ['ので', 'から', 'なら'],
        why: 'A várttal ellentétes eredmény: のに.' },
      { q: '„Vasárnap van, mégis dolgoznom kell." Mi hiányzik?', jp: '{日曜日|にちようび}＿のに、{働|はたら}かなければなりません。', a: 'な', wrong: ['だ', 'の', 'で'],
        why: 'Főnév után: なのに.' },
      { q: 'Mit jelent: {約束|やくそく}したのに、{彼|かれ}は{来|き}ませんでした。', a: 'Megígérte, mégsem jött el.',
        wrong: ['Megígérte, ezért eljött.', 'Ha megígéri, eljön.', 'Nem ígérte meg, ezért nem jött el.'],
        why: 'A のに csalódást fejez ki: pedig megígérte.' },
      { q: '„Nem baj, ha nem írja oda a nevét." Mi hiányzik?', jp: '{名前|なまえ}は{書|か}か＿かまいません。', a: 'なくても', wrong: ['なければ', 'なくては', 'ないと'],
        why: 'Nem kötelező: 〜なくてもかまいません.' },
      { q: '„Nem baj, ha ideülök?" Mi hiányzik?', jp: 'ここに＿かまいませんか。', a: '{座|すわ}っても', wrong: ['{座|すわ}っては', '{座|すわ}ると', '{座|すわ}れば'],
        why: 'Engedély: て-alak + もかまいません.' },
      { q: '„Országonként mások a szokások." Mi hiányzik?', jp: '{国|くに}＿{習慣|しゅうかん}が{違|ちが}います。', a: 'によって', wrong: ['について', 'にとって', 'として'],
        why: 'Mi szerint különbözik: 〜によって.' },
      { q: 'Mit jelent: {日|ひ}によって{値段|ねだん}が{変|か}わります。', a: 'Naptól függően változik az ár.',
        wrong: ['Minden nap ugyanannyi az ár.', 'Ma megváltozott az ár.', 'Az árról naponta beszélünk.'],
        why: '〜によって{変|か}わります: aszerint változik.' },
      { q: '„Az internet révén közelebb került a világ." Mi hiányzik?', jp: 'インターネット＿{世界|せかい}が{近|ちか}くなりました。', a: 'によって', wrong: ['について', 'のに', 'までに'],
        why: 'Eszköz, ok: 〜によって.' },
      { q: 'Melyik mondat helyes? (A のに után nem állhat kérés, javaslat vagy szándék.)', a: '{勉強|べんきょう}したのに、{試験|しけん}に{落|お}ちました。',
        wrong: ['{寒|さむ}いのに、{窓|まど}を{閉|し}めてください。', '{暇|ひま}なのに、{遊|あそ}びに{行|い}きましょう。', '{雨|あめ}なのに、{傘|かさ}を{持|も}っていくつもりです。'],
        why: 'A のに tényt állít szembe egy váratlan ténnyel.' },
      { q: '„Nem baj, ha kicsit késik." Mi hiányzik?', jp: '{少|すこ}し{遅|おく}れても＿。', a: 'かまいません', wrong: ['いけません', 'なりません', 'ちがいません'],
        why: '〜てもかまいません: megengedett.' }
    ]
  },

  /* ── 31. lecke ────────────────────────────────────── */
  {
    id: 'l31', no: 31, book: 'Dekiru 2',
    title: 'Útbaigazítás',
    lead: 'Elmagyarázod, merre kell menni, összehasonlítasz, elmondod, mit látsz és hallasz, és a megfigyeléseidből következtetsz.',
    cando: [
      'Útbaigazítást kérsz és adsz.',
      'Elmondod, mit látsz és hallasz, és mire következtetsz belőle.',
      'Beszélsz a nyelvjárásokról.'
    ],
    points: [
      {
        title: '〜と', sub: 'ha… (mindig így van)',
        pattern: 'szótári alak + と、…',
        body: 'Törvényszerű, mindig bekövetkező eredmény: útbaigazítás, gépek működése, természeti jelenségek. Utána nem állhat kérés, javaslat vagy szándék.',
        examples: [
          { jp: 'まっすぐ{行|い}くと、{右|みぎ}に{銀行|ぎんこう}があります。', romaji: 'Massugu iku to, migi ni ginkō ga arimasu.', hu: 'Ha egyenesen megy, jobbra lesz egy bank.' },
          { jp: '{春|はる}になると、{暖|あたた}かくなります。', romaji: 'Haru ni naru to, atatakaku narimasu.', hu: 'Tavasszal felmelegszik az idő.' },
          { jp: 'お{金|かね}を{入|い}れると、{切符|きっぷ}が{出|で}ます。', romaji: 'Okane o ireru to, kippu ga demasu.', hu: 'Ha bedobja a pénzt, kijön a jegy.' }
        ]
      },
      {
        title: '〜にくらべて', sub: '-hoz képest',
        pattern: 'főnév + にくらべて',
        body: 'Viszonyítási alapot ad: „ahhoz képest". A より-nál leíróbb, tárgyilagosabb.',
        examples: [
          { jp: '{東京|とうきょう}にくらべて、この{町|まち}は{静|しず}かです。', romaji: 'Tōkyō ni kurabete, kono machi wa shizuka desu.', hu: 'Tokióhoz képest ez a város csendes.' },
          { jp: '{去年|きょねん}にくらべて、{今年|ことし}は{暑|あつ}いです。', romaji: 'Kyonen ni kurabete, kotoshi wa atsui desu.', hu: 'A tavalyihoz képest idén meleg van.' },
          { jp: '{兄|あに}にくらべて、{私|わたし}は{背|せ}が{低|ひく}いです。', romaji: 'Ani ni kurabete, watashi wa se ga hikui desu.', hu: 'A bátyámhoz képest alacsony vagyok.' }
        ]
      },
      {
        title: 'みえます・きこえます', sub: 'látszik, hallatszik',
        pattern: 'A が {見|み}えます / {聞|き}こえます',
        body: 'Amit szándék nélkül, magától érzékelsz: a szemed elé kerül, a füledbe jut. Amit érzékelsz, <b>が</b>-t kap. (A {見|み}られます azt jelenti: van rá lehetőség, hogy megnézd.)',
        examples: [
          { jp: '{窓|まど}から{海|うみ}が{見|み}えます。', romaji: 'Mado kara umi ga miemasu.', hu: 'Az ablakból látszik a tenger.' },
          { jp: '{隣|となり}の{部屋|へや}から{音楽|おんがく}が{聞|き}こえます。', romaji: 'Tonari no heya kara ongaku ga kikoemasu.', hu: 'A szomszéd szobából zene hallatszik.' },
          { jp: '{字|じ}が{小|ちい}さくて、よく{見|み}えません。', romaji: 'Ji ga chiisakute, yoku miemasen.', hu: 'Kicsik a betűk, nem látom jól.' }
        ]
      },
      {
        title: '〜ようです', sub: 'úgy tűnik',
        pattern: 'rövid alak + ようです · főnév + のようです · な-melléknév + なようです',
        body: 'A saját megfigyelésedből (amit látsz, hallasz, érzel) vonsz le következtetést. Óvatos, tárgyilagos megfogalmazás.',
        examples: [
          { jp: '{田中|たなか}さんは{留守|るす}のようです。', romaji: 'Tanaka-san wa rusu no yō desu.', hu: 'Úgy tűnik, Tanaka nincs otthon.' },
          { jp: '{外|そと}は{寒|さむ}いようです。', romaji: 'Soto wa samui yō desu.', hu: 'Úgy tűnik, kint hideg van.' },
          { jp: 'だれか{来|き}たようです。', romaji: 'Dareka kita yō desu.', hu: 'Úgy tűnik, jött valaki.' }
        ]
      },
      {
        title: '〜ようになります', sub: 'már tudok…, rászoktam',
        pattern: 'szótári alak / ható alak + ようになります · 〜なくなります',
        body: 'Fokozatos változás: valami, ami korábban nem volt, mostanra képesség vagy szokás lett. A tagadó párja: <b>〜なくなります</b> („már nem…").',
        examples: [
          { jp: '{日本語|にほんご}が{話|はな}せるようになりました。', romaji: 'Nihongo ga hanaseru yō ni narimashita.', hu: 'Már tudok japánul beszélni.' },
          { jp: '{毎朝|まいあさ}{走|はし}るようになりました。', romaji: 'Maiasa hashiru yō ni narimashita.', hu: 'Rászoktam, hogy minden reggel fussak.' },
          { jp: '{最近|さいきん}、テレビを{見|み}なくなりました。', romaji: 'Saikin, terebi o minaku narimashita.', hu: 'Mostanában már nem nézek tévét.' }
        ]
      }
    ],
    quiz: [
      { q: '„Ha egyenesen megy, jobbra lesz egy bank." Mi hiányzik?', jp: 'まっすぐ{行|い}く＿、{右|みぎ}に{銀行|ぎんこう}があります。', a: 'と', wrong: ['ば', 'たら', 'のに'],
        why: 'Útbaigazítás, törvényszerű eredmény: szótári alak + と.' },
      { q: 'Melyik mondat helyes? (A と után nem állhat kérés, javaslat vagy szándék.)', a: '{春|はる}になると、{暖|あたた}かくなります。',
        wrong: ['{春|はる}になると、{旅行|りょこう}しましょう。', '{春|はる}になると、{遊|あそ}びに{来|き}てください。', '{春|はる}になると、{日本|にほん}へ{行|い}きたいです。'],
        why: 'A と után magától bekövetkező eredmény áll.' },
      { q: '„Tokióhoz képest ez a város csendes." Mi hiányzik?', jp: '{東京|とうきょう}＿、この{町|まち}は{静|しず}かです。', a: 'にくらべて', wrong: ['について', 'によって', 'にとって'],
        why: 'Viszonyítás: 〜にくらべて.' },
      { q: '„Az ablakból látszik a tenger." Mi hiányzik?', jp: '{窓|まど}から{海|うみ}＿{見|み}えます。', a: 'が', wrong: ['を', 'に', 'で'],
        why: 'A {見|み}えます mellett az, ami látszik, が-t kap.' },
      { q: 'Mit jelent: {字|じ}が{小|ちい}さくて、よく{見|み}えません。', a: 'Kicsik a betűk, nem látom jól.',
        wrong: ['Kicsik a betűk, nem nézem meg.', 'Kicsik a betűk, nem szabad megnézni.', 'Kicsik a betűk, nem akarom látni.'],
        why: '{見|み}えません: nem látszik (a szándékomtól függetlenül).' },
      { q: '„Úgy tűnik, Tanaka nincs otthon." Mi hiányzik?', jp: '{田中|たなか}さんは{留守|るす}＿ようです。', a: 'の', wrong: ['な', 'だ', 'に'],
        why: 'Főnév után: のようです.' },
      { q: '„Úgy tűnik, jött valaki." Mi hiányzik?', jp: 'だれか＿ようです。', a: '{来|き}た', wrong: ['{来|き}ます', '{来|き}て', '{来|き}たの'],
        why: 'A ようです előtt rövid alak áll.' },
      { q: '„Már tudok japánul beszélni." Mi hiányzik?', jp: '{日本語|にほんご}が{話|はな}せる＿なりました。', a: 'ように', wrong: ['ことに', 'ために', 'そうに'],
        why: 'Fokozatos változás: 〜ようになりました.' },
      { q: '„Mostanában már nem nézek tévét." Mi hiányzik?', jp: '{最近|さいきん}、テレビを＿なりました。', a: '{見|み}なく', wrong: ['{見|み}ない', '{見|み}なくて', '{見|み}ず'],
        why: 'A tagadó változás: ない → なくなりました.' },
      { q: '„A szomszéd szobából zene hallatszik." Mi hiányzik?', jp: '{隣|となり}の{部屋|へや}から{音楽|おんがく}が＿。', a: '{聞|き}こえます', wrong: ['{聞|き}きます', '{聞|き}かれます', '{聞|き}いています'],
        why: 'Magától hallatszik: {聞|き}こえます.' }
    ]
  },

  /* ── 32. lecke ────────────────────────────────────── */
  {
    id: 'l32', no: 32, book: 'Dekiru 2',
    title: 'Külföldi tanulmányok',
    lead: 'Megengedő feltételt fejezel ki, megkülönbözteted a saját döntést a szabálytól, és megmondod, mi a célod vagy mi az oka valaminek.',
    cando: [
      'Kiemeled egy szöveg lényeges információit.',
      'Kérdéseket teszel fel egy programról.',
      'Megfogalmazod, mit vársz a külföldi tanulmányoktól.'
    ],
    points: [
      {
        title: '〜ても', sub: 'akkor is, ha…',
        pattern: 'ige て-alak + も · い → くても · főnév / な-melléknév + でも',
        body: 'A feltétel teljesül, az eredmény mégsem változik. Kérdőszóval (<b>いくら</b>, どんなに) azt jelenti: „akárhogy is".',
        examples: [
          { jp: '{雨|あめ}が{降|ふ}っても、{試合|しあい}はあります。', romaji: 'Ame ga futte mo, shiai wa arimasu.', hu: 'Akkor is lesz meccs, ha esik.' },
          { jp: '{高|たか}くても、{買|か}います。', romaji: 'Takakute mo, kaimasu.', hu: 'Akkor is megveszem, ha drága.' },
          { jp: 'いくら{説明|せつめい}しても、わかってくれません。', romaji: 'Ikura setsumei shite mo, wakatte kuremasen.', hu: 'Akárhogy magyarázom, nem érti meg.' }
        ]
      },
      {
        title: '〜ことになります', sub: 'úgy alakult, hogy…',
        pattern: 'szótári alak / ない-alak + ことになりました',
        body: 'A döntést nem te hoztad: a körülmények, mások vagy egy szervezet döntött így. Ezért udvarias, szerény akkor is, ha valójában te döntöttél.',
        examples: [
          { jp: '{来月|らいげつ}、{大阪|おおさか}へ{転勤|てんきん}することになりました。', romaji: 'Raigetsu, Ōsaka e tenkin suru koto ni narimashita.', hu: 'Úgy alakult, hogy jövő hónapban Oszakába helyeznek.' },
          { jp: '{会議|かいぎ}は{来週|らいしゅう}{行|おこな}うことになりました。', romaji: 'Kaigi wa raishū okonau koto ni narimashita.', hu: 'Úgy döntöttek, hogy a megbeszélést jövő héten tartják.' },
          { jp: '{私|わたし}が{発表|はっぴょう}することになりました。', romaji: 'Watashi ga happyō suru koto ni narimashita.', hu: 'Úgy alakult, hogy én tartom az előadást.' }
        ],
        tip: 'ことにします: én döntök. ことになります: a döntés rajtam kívül született.'
      },
      {
        title: '〜ことになっています', sub: 'ez a szabály, így szokás',
        pattern: 'szótári alak / ない-alak + ことになっています',
        body: 'Érvényben lévő szabályt, szokást vagy rögzített menetrendet ír le.',
        examples: [
          { jp: '{教室|きょうしつ}では{日本語|にほんご}で{話|はな}すことになっています。', romaji: 'Kyōshitsu de wa nihongo de hanasu koto ni natte imasu.', hu: 'A teremben japánul kell beszélni: ez a szabály.' },
          { jp: 'ここでは{靴|くつ}を{脱|ぬ}ぐことになっています。', romaji: 'Koko de wa kutsu o nugu koto ni natte imasu.', hu: 'Itt le kell venni a cipőt.' },
          { jp: '{毎週|まいしゅう}{月曜日|げつようび}に{会議|かいぎ}をすることになっています。', romaji: 'Maishū getsuyōbi ni kaigi o suru koto ni natte imasu.', hu: 'Hétfőnként megbeszélést tartunk: így van rögzítve.' }
        ]
      },
      {
        title: 'főnév + ばかり', sub: 'folyton csak, csupa',
        pattern: 'főnév + ばかり',
        body: 'Azt fejezi ki, hogy valamiből túl sok van, vagy valaki egyfolytában ugyanazt csinálja; rendszerint rosszallás van benne.',
        examples: [
          { jp: '{弟|おとうと}はゲームばかりしています。', romaji: 'Otōto wa gēmu bakari shite imasu.', hu: 'Az öcsém folyton csak játszik.' },
          { jp: '{毎日|まいにち}{雨|あめ}ばかりです。', romaji: 'Mainichi ame bakari desu.', hu: 'Mindennap csak esik.' },
          { jp: '{肉|にく}ばかり{食|た}べないでください。', romaji: 'Niku bakari tabenaide kudasai.', hu: 'Ne csak húst egyél!' }
        ]
      },
      {
        title: '〜ことがあります', sub: 'előfordul, hogy…',
        pattern: 'szótári alak / ない-alak + ことがあります',
        body: 'Szótári vagy ない-alakkal azt jelenti: időnként megesik. Ne keverd a た-alakos párjával, amely élettapasztalatot jelent.',
        examples: [
          { jp: '{朝|あさ}ごはんを{食|た}べないことがあります。', romaji: 'Asagohan o tabenai koto ga arimasu.', hu: 'Előfordul, hogy nem reggelizem.' },
          { jp: 'ときどき{道|みち}に{迷|まよ}うことがあります。', romaji: 'Tokidoki michi ni mayou koto ga arimasu.', hu: 'Néha előfordul, hogy eltévedek.' },
          { jp: '{忙|いそが}しくて、{昼|ひる}ごはんを{食|た}べられないことがあります。', romaji: 'Isogashikute, hirugohan o taberarenai koto ga arimasu.', hu: 'Előfordul, hogy a sok munka miatt nem tudok ebédelni.' }
        ],
        tip: '{行|い}くことがあります = néha megyek. {行|い}ったことがあります = voltam már ott.'
      },
      {
        title: '〜ために', sub: 'azért, hogy · miatt',
        pattern: 'szótári alak + ために · főnév + のために',
        body: 'Két jelentése van. <b>Cél:</b> szándékos cselekvés szótári alakja után („azért, hogy"). <b>Ok:</b> főnév vagy múlt idő után („miatt"), tárgyilagos stílusban.',
        examples: [
          { jp: '{日本|にほん}で{働|はたら}くために、{日本語|にほんご}を{勉強|べんきょう}しています。', romaji: 'Nihon de hataraku tame ni, nihongo o benkyō shite imasu.', hu: 'Azért tanulok japánul, hogy Japánban dolgozhassak.' },
          { jp: '{家族|かぞく}のために{働|はたら}きます。', romaji: 'Kazoku no tame ni hatarakimasu.', hu: 'A családomért dolgozom.' },
          { jp: '{事故|じこ}のために、{電車|でんしゃ}が{遅|おく}れています。', romaji: 'Jiko no tame ni, densha ga okurete imasu.', hu: 'Baleset miatt késik a vonat.' }
        ]
      }
    ],
    quiz: [
      { q: '„Akkor is lesz meccs, ha esik." Mi hiányzik?', jp: '{雨|あめ}が＿、{試合|しあい}はあります。', a: '{降|ふ}っても', wrong: ['{降|ふ}ったら', '{降|ふ}れば', '{降|ふ}ると'],
        why: 'Megengedő feltétel: て-alak + も.' },
      { q: '„Akkor is megveszem, ha drága." Mi hiányzik?', jp: '＿、{買|か}います。', a: '{高|たか}くても', wrong: ['{高|たか}いても', '{高|たか}でも', '{高|たか}ければ'],
        why: 'い-melléknév: い → くても.' },
      { q: '„Úgy alakult, hogy Oszakába helyeznek." Mi hiányzik?', jp: '{大阪|おおさか}へ{転勤|てんきん}する＿なりました。', a: 'ことに', wrong: ['ものに', 'ために', 'ばかり'],
        why: 'Külső döntés: 〜ことになりました.' },
      { q: 'Mit jelent: {私|わたし}が{発表|はっぴょう}することになりました。', a: 'Úgy alakult, hogy én tartom az előadást (mások döntöttek így).',
        wrong: ['Úgy döntöttem, hogy én tartom az előadást.', 'Már megtartottam az előadást.', 'Lehet, hogy én tartom az előadást.'],
        why: 'ことになりました: a döntés nem az enyém volt.' },
      { q: '„Itt le kell venni a cipőt (ez a szabály)." Mi hiányzik?', jp: 'ここでは{靴|くつ}を{脱|ぬ}ぐことに＿。', a: 'なっています', wrong: ['なりません', 'あります', 'います'],
        why: 'Érvényes szabály: 〜ことになっています.' },
      { q: '„Az öcsém folyton csak játszik." Mi hiányzik?', jp: '{弟|おとうと}はゲーム＿しています。', a: 'ばかり', wrong: ['しか', 'までに', 'について'],
        why: 'Folyton csak ez: főnév + ばかり.' },
      { q: '„Előfordul, hogy nem reggelizem." Mi hiányzik?', jp: '{朝|あさ}ごはんを＿ことがあります。', a: '{食|た}べない', wrong: ['{食|た}べなくて', '{食|た}べません', '{食|た}べず'],
        why: 'Időnként megesik: ない-alak + ことがあります.' },
      { q: 'Mit jelent: ときどき{道|みち}に{迷|まよ}うことがあります。', a: 'Néha előfordul, hogy eltévedek.',
        wrong: ['Egyszer már eltévedtem.', 'Soha nem tévedek el.', 'Mindig eltévedek.'],
        why: 'Szótári alak + ことがあります: időnként megesik.' },
      { q: '„Azért tanulok japánul, hogy Japánban dolgozhassak." Mi hiányzik?', jp: '{日本|にほん}で{働|はたら}く＿、{日本語|にほんご}を{勉強|べんきょう}しています。', a: 'ために', wrong: ['ても', 'ばかり', 'ことに'],
        why: 'Cél: szótári alak + ために.' },
      { q: '„Baleset miatt késik a vonat." Mi hiányzik?', jp: '{事故|じこ}＿ために、{電車|でんしゃ}が{遅|おく}れています。', a: 'の', wrong: ['な', 'に', 'を'],
        why: 'Főnév után: のために.' }
    ]
  },

  /* ── 33. lecke ────────────────────────────────────── */
  {
    id: 'l33', no: 33, book: 'Dekiru 2',
    title: 'A konyhában',
    lead: 'Elmondod, milyennek látszik valami, hasonlítasz, megbecsülsz mennyiséget, és leírod, milyen ízt, illatot, hangot érzel.',
    cando: [
      'Elmondod a benyomásodat valamiről a kinézete alapján.',
      'Beszélsz az étkezési szokásokról és az illemről.',
      'Olvasol és írsz ételekről, főzésről.'
    ],
    points: [
      {
        title: '〜そうです (látszat)', sub: '…-nak látszik',
        pattern: 'い → そうです · な-melléknév + そうです',
        body: 'Ránézésre alkotott benyomás. Az い-melléknév végéről lemarad az い: おいしい → おいし<b>そう</b>. Rendhagyó: いい → <b>よさそう</b>, ない → <b>なさそう</b>.',
        examples: [
          { jp: 'このケーキはおいしそうです。', romaji: 'Kono kēki wa oishisō desu.', hu: 'Ez a torta finomnak látszik.' },
          { jp: '{元気|げんき}そうですね。', romaji: 'Genkisō desu ne.', hu: 'Jól nézel ki!' },
          { jp: 'この{映画|えいが}は{面白|おもしろ}くなさそうです。', romaji: 'Kono eiga wa omoshirokunasasō desu.', hu: 'Ez a film nem tűnik érdekesnek.' }
        ]
      },
      {
        title: 'ige + そうです', sub: 'mindjárt…, úgy néz ki',
        pattern: 'ige ます-tő + そうです',
        body: 'Igével azt jelenti: a jelek szerint mindjárt megtörténik. A ます-alakból a ます marad le.',
        examples: [
          { jp: '{今|いま}にも{雨|あめ}が{降|ふ}りそうです。', romaji: 'Ima ni mo ame ga furisō desu.', hu: 'Bármelyik pillanatban eleredhet az eső.' },
          { jp: '{荷物|にもつ}が{落|お}ちそうです。', romaji: 'Nimotsu ga ochisō desu.', hu: 'Mindjárt leesik a csomag.' },
          { jp: 'ボタンが{取|と}れそうです。', romaji: 'Botan ga toresō desu.', hu: 'Mindjárt leszakad a gomb.' }
        ]
      },
      {
        title: '〜そうな・〜そうに', sub: 'jelzőként, határozóként',
        pattern: '〜そうな + főnév · 〜そうに + ige',
        body: 'A そう な-melléknévként viselkedik: főnév előtt <b>そうな</b>, ige előtt <b>そうに</b>.',
        examples: [
          { jp: 'おいしそうなりんごですね。', romaji: 'Oishisō na ringo desu ne.', hu: 'De guszta alma!' },
          { jp: '{子|こ}どもたちは{楽|たの}しそうに{遊|あそ}んでいます。', romaji: 'Kodomotachi wa tanoshisō ni asonde imasu.', hu: 'A gyerekek láthatóan élvezik a játékot.' },
          { jp: '{高|たか}そうな{時計|とけい}をしていますね。', romaji: 'Takasō na tokei o shite imasu ne.', hu: 'Drágának látszó órád van.' }
        ]
      },
      {
        title: '〜みたいな・〜のような', sub: 'olyan, mint…',
        pattern: 'főnév + みたいな / のような + főnév · みたいに / のように + ige, melléknév',
        body: 'Hasonlítás. A <b>みたい</b> beszélt nyelvi, a <b>よう</b> választékosabb; a よう előtt főnév után の áll, a みたい előtt semmi.',
        examples: [
          { jp: '{夢|ゆめ}みたいな{話|はなし}です。', romaji: 'Yume mitai na hanashi desu.', hu: 'Álomszerű történet.' },
          { jp: '{母|はは}のような{人|ひと}になりたいです。', romaji: 'Haha no yō na hito ni naritai desu.', hu: 'Olyan ember szeretnék lenni, mint anyám.' },
          { jp: '{今日|きょう}は{夏|なつ}みたいに{暑|あつ}いです。', romaji: 'Kyō wa natsu mitai ni atsui desu.', hu: 'Ma olyan meleg van, mint nyáron.' }
        ]
      },
      {
        title: '〜くらい・〜ぐらい', sub: 'körülbelül · annyira, hogy',
        pattern: 'mennyiség + ぐらい · rövid alak + くらい',
        body: 'Számmal hozzávetőleges mennyiséget ad. Mondat után mértéket fejez ki: „annyira…, hogy". A くらい és a ぐらい felcserélhető.',
        examples: [
          { jp: '{駅|えき}まで{十分|じゅっぷん}ぐらいかかります。', romaji: 'Eki made juppun gurai kakarimasu.', hu: 'Az állomásig körülbelül tíz perc.' },
          { jp: '{泣|な}きたいくらい{痛|いた}かったです。', romaji: 'Nakitai kurai itakatta desu.', hu: 'Annyira fájt, hogy sírni tudtam volna.' },
          { jp: 'これくらいの{大|おお}きさの{箱|はこ}がほしいです。', romaji: 'Kore kurai no ōkisa no hako ga hoshii desu.', hu: 'Körülbelül ekkora dobozt szeretnék.' }
        ]
      },
      {
        title: '〜がします', sub: 'íz, illat, hang',
        pattern: '{味|あじ} / におい / {音|おと} / {声|こえ} + がします',
        body: 'Amit az érzékszerveid maguktól észlelnek: íze van, szaga van, hang hallatszik. Az észlelt dolog <b>が</b>-t kap.',
        examples: [
          { jp: 'いいにおいがします。', romaji: 'Ii nioi ga shimasu.', hu: 'Jó illat van.' },
          { jp: '{変|へん}な{音|おと}がします。', romaji: 'Hen na oto ga shimasu.', hu: 'Furcsa hangot hallok.' },
          { jp: 'このスープは{魚|さかな}の{味|あじ}がします。', romaji: 'Kono sūpu wa sakana no aji ga shimasu.', hu: 'Ennek a levesnek halíze van.' }
        ]
      }
    ],
    quiz: [
      { q: '„Ez a torta finomnak látszik." Mi hiányzik?', jp: 'このケーキは＿です。', a: 'おいしそう', wrong: ['おいしいそう', 'おいしくそう', 'おいしさそう'],
        why: 'Látszat: az い lemarad, おいしそう. (Az おいしいそうです azt jelenti: azt hallottam, finom.)' },
      { q: 'Mi az いい „…-nak látszik" alakja?', a: 'よさそう', wrong: ['いそう', 'いいそう', 'よそう'],
        why: 'Az いい rendhagyó: よさそう.' },
      { q: '„Mindjárt leesik a csomag." Mi hiányzik?', jp: '{荷物|にもつ}が＿そうです。', a: '{落|お}ち', wrong: ['{落|お}ちる', '{落|お}ちて', '{落|お}ちた'],
        why: 'Ige ます-tő + そうです: {落|お}ちます → {落|お}ち.' },
      { q: '„A gyerekek láthatóan élvezik a játékot." Mi hiányzik?', jp: '{子|こ}どもたちは{楽|たの}し＿{遊|あそ}んでいます。', a: 'そうに', wrong: ['そうな', 'そうで', 'そうだ'],
        why: 'Ige előtt: そうに.' },
      { q: '„Olyan ember szeretnék lenni, mint anyám." Mi hiányzik?', jp: '{母|はは}＿{人|ひと}になりたいです。', a: 'のような', wrong: ['みたい', 'ような', 'そうな'],
        why: 'Főnév + のような + főnév.' },
      { q: '„Ma olyan meleg van, mint nyáron." Mi hiányzik?', jp: '{今日|きょう}は{夏|なつ}＿{暑|あつ}いです。', a: 'みたいに', wrong: ['みたいな', 'そうに', 'ぐらいな'],
        why: 'Melléknév előtt: みたいに.' },
      { q: '„Jó illat van." Mi hiányzik?', jp: 'いいにおい＿します。', a: 'が', wrong: ['を', 'に', 'で'],
        why: 'Érzékelés: 〜がします.' },
      { q: 'Mit jelent: {変|へん}な{音|おと}がします。', a: 'Furcsa hangot hallok.', wrong: ['Furcsa hangot adok ki.', 'Furcsa a zene.', 'Nem hallok semmit.'],
        why: '{音|おと}がします: hang hallatszik.' },
      { q: '„Annyira fájt, hogy sírni tudtam volna." Mi hiányzik?', jp: '{泣|な}きたい＿{痛|いた}かったです。', a: 'くらい', wrong: ['そう', 'みたい', 'ばかり'],
        why: 'Mérték: rövid alak + くらい.' },
      { q: 'Mit jelent: この{映画|えいが}は{面白|おもしろ}くなさそうです。', a: 'Ez a film nem tűnik érdekesnek.',
        wrong: ['Azt hallottam, ez a film nem érdekes.', 'Ez a film biztosan érdekes.', 'Ez a film érdekesnek tűnik.'],
        why: '〜くない → 〜くなさそう: nem látszik olyannak.' }
    ]
  },

  /* ── 34. lecke ────────────────────────────────────── */
  {
    id: 'l34', no: 34, book: 'Dekiru 2',
    title: 'Mit hallottál?',
    lead: 'Továbbadod, amit másoktól hallottál vagy olvastál, megnevezed a forrást, és közvetett információból következtetsz.',
    cando: [
      'Mentőt hívsz, és elmondod, mi történt.',
      'Továbbadod, amit hallottál vagy olvastál.',
      'Következtetsz abból, amit megtudtál.'
    ],
    points: [
      {
        title: '〜そうです (hallomás)', sub: 'azt hallottam, hogy…',
        pattern: 'rövid alak + そうです · főnév / な-melléknév + だそうです',
        body: 'Másoktól szerzett értesülést adsz tovább változtatás nélkül. A そうです előtt <b>teljes rövid alak</b> áll, ez különbözteti meg a látszatot jelentő そうです-től.',
        examples: [
          { jp: 'あしたは{雪|ゆき}が{降|ふ}るそうです。', romaji: 'Ashita wa yuki ga furu sō desu.', hu: 'Azt hallottam, holnap havazni fog.' },
          { jp: '{田中|たなか}さんは{来月|らいげつ}{結婚|けっこん}するそうです。', romaji: 'Tanaka-san wa raigetsu kekkon suru sō desu.', hu: 'Úgy hallom, Tanaka jövő hónapban megházasodik.' },
          { jp: 'あの{店|みせ}のラーメンはおいしいそうです。', romaji: 'Ano mise no rāmen wa oishii sō desu.', hu: 'Állítólag annak az étteremnek finom a rámenje.' }
        ]
      },
      {
        title: 'Hallomás vagy látszat?', sub: 'a két そうです',
        pattern: '{難|むずか}しい + そうです ↔ {難|むずか}し + そうです',
        body: 'Egyetlen い a különbség. <b>Teljes rövid alak</b> + そうです: hallottam. <b>Csonkított alak</b> (い nélkül, ます-tő) + そうです: annak látszik.',
        examples: [
          { jp: 'この{本|ほん}は{難|むずか}しいそうです。', romaji: 'Kono hon wa muzukashii sō desu.', hu: 'Azt mondják, ez a könyv nehéz.' },
          { jp: 'この{本|ほん}は{難|むずか}しそうです。', romaji: 'Kono hon wa muzukashisō desu.', hu: 'Ez a könyv nehéznek látszik.' },
          { jp: '{彼|かれ}は{元気|げんき}だそうです。', romaji: 'Kare wa genki da sō desu.', hu: 'Úgy hallom, jól van.' }
        ]
      },
      {
        title: '〜によると', sub: '… szerint',
        pattern: 'forrás + によると、… そうです',
        body: 'Megnevezi az értesülés forrását. Rendszerint a hallomást jelentő そうです vagy a らしいです zárja a mondatot.',
        examples: [
          { jp: '{天気|てんき}{予報|よほう}によると、あしたは{晴|は}れるそうです。', romaji: 'Tenki yohō ni yoru to, ashita wa hareru sō desu.', hu: 'Az időjárás-jelentés szerint holnap napos idő lesz.' },
          { jp: 'ニュースによると、{大|おお}きい{事故|じこ}があったそうです。', romaji: 'Nyūsu ni yoru to, ōkii jiko ga atta sō desu.', hu: 'A hírek szerint nagy baleset történt.' },
          { jp: '{友|とも}だちの{話|はなし}によると、その{店|みせ}はもう{閉|し}まったそうです。', romaji: 'Tomodachi no hanashi ni yoru to, sono mise wa mō shimatta sō desu.', hu: 'A barátom szerint az a bolt már bezárt.' }
        ]
      },
      {
        title: '〜らしいです', sub: 'úgy tudni, állítólag',
        pattern: 'rövid alak + らしいです · főnév / な-melléknév + らしいです',
        body: 'Hallott vagy olvasott információ alapján következtetsz, de nem vállalsz érte felelősséget. Főnév és な-melléknév után közvetlenül áll.',
        examples: [
          { jp: '{田中|たなか}さんは{会社|かいしゃ}をやめるらしいです。', romaji: 'Tanaka-san wa kaisha o yameru rashii desu.', hu: 'Úgy tudni, Tanaka felmond.' },
          { jp: 'この{辺|へん}は{夜|よる}、{危|あぶ}ないらしいです。', romaji: 'Kono hen wa yoru, abunai rashii desu.', hu: 'Állítólag ez a környék éjszaka veszélyes.' },
          { jp: 'あの{二人|ふたり}は{兄弟|きょうだい}らしいです。', romaji: 'Ano futari wa kyōdai rashii desu.', hu: 'Úgy tűnik, ők ketten testvérek.' }
        ],
        tip: 'そうです: pontosan továbbadom, amit hallottam. らしいです: abból következtetek. ようです: a saját megfigyelésemből következtetek.'
      },
      {
        title: '〜といっていました', sub: 'azt mondta, hogy…',
        pattern: 'rövid alak + と{言|い}っていました',
        body: 'Ha tudod, ki mondta, a legegyszerűbb így továbbadni. A <b>ていました</b> azt jelzi: tőle magától hallottad.',
        examples: [
          { jp: '{医者|いしゃ}は{大丈夫|だいじょうぶ}だと{言|い}っていました。', romaji: 'Isha wa daijōbu da to itte imashita.', hu: 'Az orvos azt mondta, nincs baj.' },
          { jp: '{母|はは}は{少|すこ}し{遅|おく}れると{言|い}っていました。', romaji: 'Haha wa sukoshi okureru to itte imashita.', hu: 'Anyám azt mondta, kicsit késik.' },
          { jp: '{先生|せんせい}は{何|なん}と{言|い}っていましたか。', romaji: 'Sensei wa nan to itte imashita ka.', hu: 'Mit mondott a tanár?' }
        ]
      }
    ],
    quiz: [
      { q: '„Azt hallottam, holnap havazni fog." Mi hiányzik?', jp: 'あしたは{雪|ゆき}が＿そうです。', a: '{降|ふ}る', wrong: ['{降|ふ}り', '{降|ふ}って', '{降|ふ}ろう'],
        why: 'Hallomás: teljes rövid alak + そうです. ({降|ふ}りそうです = úgy néz ki, mindjárt esik.)' },
      { q: '„Úgy hallom, jól van." Mi hiányzik?', jp: '{彼|かれ}は{元気|げんき}＿そうです。', a: 'だ', wrong: ['な', 'の', 'に'],
        why: 'な-melléknév + だそうです.' },
      { q: 'Mit jelent: この{本|ほん}は{難|むずか}しいそうです。', a: 'Azt mondják, ez a könyv nehéz.',
        wrong: ['Ez a könyv nehéznek látszik.', 'Ez a könyv biztosan nehéz.', 'Ez a könyv nem nehéz.'],
        why: 'Teljes alak ({難|むずか}しい) + そうです: hallomás.' },
      { q: 'Mit jelent: この{本|ほん}は{難|むずか}しそうです。', a: 'Ez a könyv nehéznek látszik.',
        wrong: ['Azt mondják, ez a könyv nehéz.', 'Ez a könyv nehéz volt.', 'Ez a könyv túl nehéz.'],
        why: 'い nélküli alak ({難|むずか}し) + そうです: látszat.' },
      { q: '„Az időjárás-jelentés szerint holnap napos idő lesz." Mi hiányzik?', jp: '{天気|てんき}{予報|よほう}＿、あしたは{晴|は}れるそうです。', a: 'によると', wrong: ['によって', 'について', 'にくらべて'],
        why: 'A forrás: 〜によると.' },
      { q: '„Úgy tudni, Tanaka felmond." Mi hiányzik?', jp: '{田中|たなか}さんは{会社|かいしゃ}をやめる＿です。', a: 'らしい', wrong: ['みたいな', 'そうな', 'ような'],
        why: 'Közvetett információból következtetés: らしいです.' },
      { q: 'Melyik mondat helyes: „Úgy tűnik, ők ketten testvérek."', a: 'あの{二人|ふたり}は{兄弟|きょうだい}らしいです。',
        wrong: ['あの{二人|ふたり}は{兄弟|きょうだい}だらしいです。', 'あの{二人|ふたり}は{兄弟|きょうだい}ならしいです。', 'あの{二人|ふたり}は{兄弟|きょうだい}のらしいです。'],
        why: 'Főnév után közvetlenül áll a らしいです.' },
      { q: '„Anyám azt mondta, kicsit késik." Mi hiányzik?', jp: '{母|はは}は{少|すこ}し{遅|おく}れる＿{言|い}っていました。', a: 'と', wrong: ['を', 'に', 'が'],
        why: 'Az idéző と.' },
      { q: 'Melyik mondatban adod tovább pontosan, amit hallottál?', a: '{田中|たなか}さんは{結婚|けっこん}するそうです。',
        wrong: ['{田中|たなか}さんは{結婚|けっこん}しそうです。', '{田中|たなか}さんは{結婚|けっこん}するでしょう。', '{田中|たなか}さんは{結婚|けっこん}するかもしれません。'],
        why: 'Rövid alak + そうです: hallomás. A többi a saját feltevésed.' },
      { q: '„A hírek szerint nagy baleset történt." Mi hiányzik?', jp: 'ニュースによると、{大|おお}きい{事故|じこ}が＿そうです。', a: 'あった', wrong: ['あり', 'あって', 'ある'],
        why: 'Múlt idejű hallomás: あった + そうです.' }
    ]
  },

  /* ── 35. lecke ────────────────────────────────────── */
  {
    id: 'l35', no: 35, book: 'Dekiru 2',
    title: 'Hogyan kell?',
    lead: 'Megnevezed, hogyan kell valamit csinálni, kifejezed, hogy valami vagy valaki más helyett áll, és leírod a változatlanul hagyott állapotot.',
    cando: [
      'Japán nyelvű számítógépet, alkalmazást használsz.',
      'Beszélsz arról, mire jó az internet a tanulásban.',
      'Elmondod a véleményed, és összeveted másokéval.'
    ],
    points: [
      {
        title: '〜かた', sub: 'a mód, ahogyan',
        pattern: 'ige ます-tő + {方|かた}',
        body: 'A ます-tőhöz járuló <b>{方|かた}</b> főnevet képez: „a csinálás módja". Mivel főnév lett belőle, az eredeti tárgy を helyett <b>の</b>-t kap.',
        examples: [
          { jp: 'この{漢字|かんじ}の{読|よ}み{方|かた}を{教|おし}えてください。', romaji: 'Kono kanji no yomikata o oshiete kudasai.', hu: 'Mondja meg, kérem, hogyan kell olvasni ezt a kanjit.' },
          { jp: '{切符|きっぷ}の{買|か}い{方|かた}がわかりません。', romaji: 'Kippu no kaikata ga wakarimasen.', hu: 'Nem tudom, hogyan kell jegyet venni.' },
          { jp: 'パソコンの{使|つか}い{方|かた}を{習|なら}いました。', romaji: 'Pasokon no tsukaikata o naraimashita.', hu: 'Megtanultam használni a számítógépet.' }
        ]
      },
      {
        title: '〜のかわりに', sub: 'helyett (főnév)',
        pattern: 'főnév + のかわりに',
        body: 'Egy dolog vagy ember egy másik helyére lép.',
        examples: [
          { jp: '{砂糖|さとう}のかわりに、はちみつを{使|つか}います。', romaji: 'Satō no kawari ni, hachimitsu o tsukaimasu.', hu: 'Cukor helyett mézet használok.' },
          { jp: '{父|ちち}のかわりに、{私|わたし}が{行|い}きます。', romaji: 'Chichi no kawari ni, watashi ga ikimasu.', hu: 'Apám helyett én megyek.' },
          { jp: '{今日|きょう}はごはんのかわりにパンを{食|た}べました。', romaji: 'Kyō wa gohan no kawari ni pan o tabemashita.', hu: 'Ma rizs helyett kenyeret ettem.' }
        ]
      },
      {
        title: 'ige + かわりに', sub: 'ahelyett, hogy · cserébe',
        pattern: 'szótári alak + かわりに',
        body: 'Igével két jelentése van: „ahelyett, hogy megtenném", illetve „cserébe azért, hogy…" (viszonzás).',
        examples: [
          { jp: '{電話|でんわ}するかわりに、メールを{送|おく}りました。', romaji: 'Denwa suru kawari ni, mēru o okurimashita.', hu: 'Telefonálás helyett e-mailt küldtem.' },
          { jp: '{映画|えいが}を{見|み}に{行|い}くかわりに、{家|うち}でビデオを{見|み}ました。', romaji: 'Eiga o mi ni iku kawari ni, uchi de bideo o mimashita.', hu: 'Ahelyett, hogy moziba mentem volna, otthon néztem filmet.' },
          { jp: '{日本語|にほんご}を{教|おし}えてもらうかわりに、{英語|えいご}を{教|おし}えます。', romaji: 'Nihongo o oshiete morau kawari ni, eigo o oshiemasu.', hu: 'Cserébe azért, hogy japánra tanít, én angolra tanítom.' }
        ]
      },
      {
        title: '〜にかわって', sub: 'valaki helyett, képviseletében',
        pattern: 'személy + にかわって',
        body: 'Választékosabb kifejezés: valaki más nevében, az ő feladatát átvéve teszel valamit.',
        examples: [
          { jp: '{社長|しゃちょう}にかわって、{私|わたし}がごあいさつします。', romaji: 'Shachō ni kawatte, watashi ga goaisatsu shimasu.', hu: 'Az igazgató helyett én mondok köszöntőt.' },
          { jp: '{母|はは}にかわって、{姉|あね}が{料理|りょうり}を{作|つく}りました。', romaji: 'Haha ni kawatte, ane ga ryōri o tsukurimashita.', hu: 'Anyám helyett a nővérem főzött.' },
          { jp: '{先生|せんせい}にかわって、{田中|たなか}さんが{説明|せつめい}しました。', romaji: 'Sensei ni kawatte, Tanaka-san ga setsumei shimashita.', hu: 'A tanár helyett Tanaka magyarázta el.' }
        ]
      },
      {
        title: '〜まま', sub: 'úgy, ahogy van',
        pattern: 'た-alak + まま · ない-alak + まま · főnév + のまま',
        body: 'Egy állapot változatlanul megmarad, miközben valami más történik. Gyakran azt sugallja, hogy ez nem helyénvaló.',
        examples: [
          { jp: '{電気|でんき}をつけたまま、{寝|ね}てしまいました。', romaji: 'Denki o tsuketa mama, nete shimaimashita.', hu: 'Égve hagyott villannyal aludtam el.' },
          { jp: '{靴|くつ}をはいたまま、{部屋|へや}に{入|はい}らないでください。', romaji: 'Kutsu o haita mama, heya ni hairanaide kudasai.', hu: 'Kérem, ne lépjen be cipőben a szobába.' },
          { jp: '{窓|まど}を{開|あ}けたまま、{出|で}かけました。', romaji: 'Mado o aketa mama, dekakemashita.', hu: 'Nyitva hagyott ablakkal mentem el.' },
          { jp: 'この{野菜|やさい}は{生|なま}のまま{食|た}べられます。', romaji: 'Kono yasai wa nama no mama taberaremasu.', hu: 'Ez a zöldség nyersen is ehető.' }
        ]
      }
    ],
    quiz: [
      { q: '„Mondja meg, hogyan kell olvasni ezt a kanjit." Mi hiányzik?', jp: 'この{漢字|かんじ}の＿{方|かた}を{教|おし}えてください。', a: '{読|よ}み', wrong: ['{読|よ}む', '{読|よ}んで', '{読|よ}め'],
        why: 'ます-tő + {方|かた}: {読|よ}みます → {読|よ}み{方|かた}.' },
      { q: '„Nem tudom, hogyan kell jegyet venni." Mi hiányzik?', jp: '{切符|きっぷ}＿{買|か}い{方|かた}がわかりません。', a: 'の', wrong: ['を', 'に', 'で'],
        why: 'A {買|か}い{方|かた} főnév, ezért a tárgy の-t kap.' },
      { q: '„Cukor helyett mézet használok." Mi hiányzik?', jp: '{砂糖|さとう}＿、はちみつを{使|つか}います。', a: 'のかわりに', wrong: ['のままに', 'について', 'によると'],
        why: 'Főnév + のかわりに = helyett.' },
      { q: '„Telefonálás helyett e-mailt küldtem." Mi hiányzik?', jp: '{電話|でんわ}する＿、メールを{送|おく}りました。', a: 'かわりに', wrong: ['のかわりに', 'まま', 'ために'],
        why: 'Ige szótári alakja után közvetlenül: かわりに.' },
      { q: '„Az igazgató helyett én mondok köszöntőt." Mi hiányzik?', jp: '{社長|しゃちょう}＿、{私|わたし}がごあいさつします。', a: 'にかわって', wrong: ['について', 'によって', 'にくらべて'],
        why: 'Valaki képviseletében: 〜にかわって.' },
      { q: '„Égve hagyott villannyal aludtam el." Mi hiányzik?', jp: '{電気|でんき}を＿まま、{寝|ね}てしまいました。', a: 'つけた', wrong: ['つける', 'つけて', 'つけ'],
        why: 'A まま előtt た-alak áll.' },
      { q: '„Ez a zöldség nyersen is ehető." Mi hiányzik?', jp: 'この{野菜|やさい}は{生|なま}＿まま{食|た}べられます。', a: 'の', wrong: ['な', 'だ', 'に'],
        why: 'Főnév után: のまま.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けたまま、{出|で}かけました。', a: 'Nyitva hagyott ablakkal mentem el.',
        wrong: ['Kinyitottam az ablakot, miután hazajöttem.', 'Becsuktam az ablakot, és elmentem.', 'Elmenés előtt ki kell nyitni az ablakot.'],
        why: '〜たまま: az állapot változatlan maradt.' },
      { q: 'Mit jelent: {日本語|にほんご}を{教|おし}えてもらうかわりに、{英語|えいご}を{教|おし}えます。', a: 'Cserébe azért, hogy japánra tanít, én angolra tanítom.',
        wrong: ['Japán helyett angolt tanulok.', 'Japánul és angolul is tanítok.', 'Sem japánul, sem angolul nem tanítok.'],
        why: 'Ige + かわりに itt viszonzást jelent.' },
      { q: '„Megtanultam használni a számítógépet." Mi hiányzik?', jp: 'パソコンの＿を{習|なら}いました。', a: '{使|つか}い{方|かた}', wrong: ['{使|つか}う{方|かた}', '{使|つか}って{方|かた}', '{使|つか}いまま'],
        why: 'ます-tő + {方|かた}.' }
    ]
  },

  /* ── 36. lecke ────────────────────────────────────── */
  {
    id: 'l36', no: 36, book: 'Dekiru 2',
    title: 'Rendezvény',
    lead: 'Megtanulod a szenvedő alakot, és azt, hogyan beszélsz vele eseményekről és alkotásokról; megadsz egy hozzávetőleges időszakot, és javaslatot teszel.',
    cando: [
      'Elkészíted egy rendezvény ismertetőjét.',
      'Bemutatod a programot és a közreműködőket.',
      'Rövid beszédet mondasz egy rendezvényen.'
    ],
    points: [
      {
        title: 'A szenvedő alak képzése', sub: '〜れます・〜られます',
        pattern: '1. csoport: u-hang → a-hang + れます · 2. csoport: る → られます',
        body: 'Az 1. csoportnál ugyanaz a tő, mint a ない-alakban: {書|か}く → {書|か}<b>か</b>れます, {読|よ}む → {読|よ}<b>ま</b>れます, {言|い}う → {言|い}<b>わ</b>れます. A 2. csoportnál る → られます (ez megegyezik a ható alakkal). Rendhagyó: します → されます, {来|き}ます → {来|こ}られます.',
        examples: [
          { jp: 'この{本|ほん}は{世界中|せかいじゅう}で{読|よ}まれています。', romaji: 'Kono hon wa sekaijū de yomarete imasu.', hu: 'Ezt a könyvet világszerte olvassák.' },
          { jp: '{日本|にほん}では{米|こめ}がたくさん{食|た}べられています。', romaji: 'Nihon de wa kome ga takusan taberarete imasu.', hu: 'Japánban sok rizst esznek.' },
          { jp: 'この{歌|うた}は{若|わか}い{人|ひと}によく{歌|うた}われています。', romaji: 'Kono uta wa wakai hito ni yoku utawarete imasu.', hu: 'Ezt a dalt a fiatalok gyakran éneklik.' }
        ]
      },
      {
        title: 'Szenvedő mondat: dolog az alany', sub: 'megrendezik, megépítették',
        pattern: 'A は / が + szenvedő ige',
        body: 'Ha az esemény vagy a tárgy a fontos, nem az, aki csinálja, az lesz az alany. Hírekben, ismertetőkben, leírásokban gyakori. Magyarul többnyire általános alanyú mondattal adjuk vissza.',
        examples: [
          { jp: '{会議|かいぎ}は{三時|さんじ}から{行|おこな}われます。', romaji: 'Kaigi wa sanji kara okonawaremasu.', hu: 'A megbeszélést háromtól tartják.' },
          { jp: 'コンサートは{来月|らいげつ}{開|ひら}かれます。', romaji: 'Konsāto wa raigetsu hirakaremasu.', hu: 'A koncertet jövő hónapban rendezik.' },
          { jp: 'この{寺|てら}は{五百年前|ごひゃくねんまえ}に{建|た}てられました。', romaji: 'Kono tera wa gohyakunen mae ni tateraremashita.', hu: 'Ezt a templomot ötszáz éve építették.' }
        ]
      },
      {
        title: '〜によって (alkotó)', sub: 'ki készítette',
        pattern: 'A は B によって + szenvedő ige',
        body: 'Műalkotás, épület, találmány létrehozóját szenvedő mondatban a <b>によって</b> jelöli (nem a sima に).',
        examples: [
          { jp: 'この{絵|え}はピカソによってかかれました。', romaji: 'Kono e wa Pikaso ni yotte kakaremashita.', hu: 'Ezt a képet Picasso festette.' },
          { jp: 'この{建物|たてもの}は{有名|ゆうめい}な{建築家|けんちくか}によって{設計|せっけい}されました。', romaji: 'Kono tatemono wa yūmei na kenchikuka ni yotte sekkei saremashita.', hu: 'Ezt az épületet egy híres építész tervezte.' },
          { jp: '{電話|でんわ}はベルによって{発明|はつめい}されました。', romaji: 'Denwa wa Beru ni yotte hatsumei saremashita.', hu: 'A telefont Bell találta fel.' }
        ]
      },
      {
        title: '〜から〜にかけて', sub: '…-tól nagyjából …-ig',
        pattern: 'A から B にかけて',
        body: 'Időben vagy térben összefüggő sávot jelöl, pontos határok nélkül. A から〜まで pontos kezdő- és végpontot ad.',
        examples: [
          { jp: '{六月|ろくがつ}から{七月|しちがつ}にかけて、{雨|あめ}が{多|おお}いです。', romaji: 'Rokugatsu kara shichigatsu ni kakete, ame ga ōi desu.', hu: 'Júniustól júliusig sok az eső.' },
          { jp: '{東京|とうきょう}から{横浜|よこはま}にかけて、{道|みち}が{込|こ}んでいます。', romaji: 'Tōkyō kara Yokohama ni kakete, michi ga konde imasu.', hu: 'Tokiótól Jokohamáig zsúfolt az út.' },
          { jp: '{夜|よる}から{朝|あさ}にかけて、{雪|ゆき}が{降|ふ}りました。', romaji: 'Yoru kara asa ni kakete, yuki ga furimashita.', hu: 'Éjszakától reggelig havazott.' }
        ]
      },
      {
        title: '〜でも', sub: 'például… · még … is',
        pattern: 'főnév + でも',
        body: 'Javaslatban laza példát ad („teát vagy valamit"). Állításban szélső esetet emel ki: „még ő is".',
        examples: [
          { jp: 'お{茶|ちゃ}でも{飲|の}みませんか。', romaji: 'Ocha demo nomimasen ka.', hu: 'Nem iszunk egy teát vagy valamit?' },
          { jp: '{映画|えいが}でも{見|み}に{行|い}きましょうか。', romaji: 'Eiga demo mi ni ikimashō ka.', hu: 'Menjünk el például moziba?' },
          { jp: 'この{問題|もんだい}は{子|こ}どもでもわかります。', romaji: 'Kono mondai wa kodomo demo wakarimasu.', hu: 'Ezt a feladatot még egy gyerek is érti.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {書|か}きます szenvedő alakja?', a: '{書|か}かれます', wrong: ['{書|か}けます', '{書|か}きられます', '{書|か}かせます'],
        why: '1. csoport: か-tő + れます.' },
      { q: 'Mi a {食|た}べます szenvedő alakja?', a: '{食|た}べられます', wrong: ['{食|た}べされます', '{食|た}べさせます', '{食|た}ばれます'],
        why: '2. csoport: る → られます.' },
      { q: 'Mi a します szenvedő alakja?', a: 'されます', wrong: ['しられます', 'できます', 'させます'],
        why: 'A します szenvedő alakja rendhagyó: されます.' },
      { q: '„A megbeszélést háromtól tartják." Mi hiányzik?', jp: '{会議|かいぎ}は{三時|さんじ}から＿。', a: '{行|おこな}われます', wrong: ['{行|おこな}えます', '{行|おこな}わせます', '{行|おこな}いられます'],
        why: '{行|おこな}う → {行|おこな}われます.' },
      { q: '„Ezt a templomot ötszáz éve építették." Mi hiányzik?', jp: 'この{寺|てら}は{五百年前|ごひゃくねんまえ}に＿。', a: '{建|た}てられました', wrong: ['{建|た}ちられました', '{建|た}てさせました', '{建|た}てれました'],
        why: 'A {建|た}てる 2. csoportú: {建|た}てられました.' },
      { q: '„Ezt a képet Picasso festette." Mi hiányzik?', jp: 'この{絵|え}はピカソ＿かかれました。', a: 'によって', wrong: ['について', 'にとって', 'にかけて'],
        why: 'Az alkotót szenvedő mondatban によって jelöli.' },
      { q: '„Júniustól júliusig sok az eső." Mi hiányzik?', jp: '{六月|ろくがつ}から{七月|しちがつ}＿、{雨|あめ}が{多|おお}いです。', a: 'にかけて', wrong: ['によって', 'について', 'にくらべて'],
        why: 'Hozzávetőleges sáv: から〜にかけて.' },
      { q: '„Nem iszunk egy teát vagy valamit?" Mi hiányzik?', jp: 'お{茶|ちゃ}＿{飲|の}みませんか。', a: 'でも', wrong: ['しか', 'だけ', 'ばかり'],
        why: 'Laza példa javaslatban: でも.' },
      { q: 'Mit jelent: この{問題|もんだい}は{子|こ}どもでもわかります。', a: 'Ezt a feladatot még egy gyerek is érti.',
        wrong: ['Ezt a feladatot csak a gyerekek értik.', 'Ezt a feladatot a gyerekek nem értik.', 'Ez a feladat gyerekekről szól.'],
        why: 'főnév + でも: még ő is.' },
      { q: 'Mit jelent: この{本|ほん}は{世界中|せかいじゅう}で{読|よ}まれています。', a: 'Ezt a könyvet világszerte olvassák.',
        wrong: ['Ezt a könyvet világszerte el lehet olvasni.', 'Ezt a könyvet az egész világon árulják.', 'Ez a könyv a világról szól.'],
        why: '{読|よ}まれています: szenvedő alak. (El lehet olvasni: {読|よ}めます.)' }
    ]
  },

  /* ── 37. lecke ────────────────────────────────────── */
  {
    id: 'l37', no: 37, book: 'Dekiru 2',
    title: 'Baj történt',
    lead: 'Elmondod, mit tettek veled vagy a holmiddal, sorrendben elmeséled, mi történt, és megköszönöd, ami másoknak köszönhető.',
    cando: [
      'Tanácsot kérsz és adsz, ha baj történt.',
      'Sorrendben elmondod, mikor, hol, mi történt.',
      'Elmondod, mit kell tenni vészhelyzetben.'
    ],
    points: [
      {
        title: 'Szenvedő mondat: ember az alany', sub: 'megdicsértek, megszidtak',
        pattern: 'A は B に + szenvedő ige',
        body: 'Akit a cselekvés ér, az az alany; aki teszi, <b>に</b>-t kap. Japánul gyakran így mondják el, ami az emberrel történt, a saját szemszögéből.',
        examples: [
          { jp: '{母|はは}にほめられました。', romaji: 'Haha ni homeraremashita.', hu: 'Megdicsért anyám.' },
          { jp: '{父|ちち}にしかられました。', romaji: 'Chichi ni shikararemashita.', hu: 'Megszidott apám.' },
          { jp: '{友|とも}だちにパーティーに{招待|しょうたい}されました。', romaji: 'Tomodachi ni pātī ni shōtai saremashita.', hu: 'A barátom meghívott egy buliba.' }
        ]
      },
      {
        title: 'Szenvedő mondat tárggyal', sub: 'ellopták a…-mat',
        pattern: 'A は B に C を + szenvedő ige',
        body: 'Ha valakinek a holmijával vagy testrészével történik valami, akkor is <b>az ember</b> az alany, a dolog pedig megtartja az <b>を</b>-t. A mondat azt is kifejezi, hogy az illetőt kár érte.',
        examples: [
          { jp: '{電車|でんしゃ}の{中|なか}で{財布|さいふ}を{盗|ぬす}まれました。', romaji: 'Densha no naka de saifu o nusumaremashita.', hu: 'A vonaton ellopták a pénztárcámat.' },
          { jp: '{弟|おとうと}にケーキを{食|た}べられました。', romaji: 'Otōto ni kēki o taberaremashita.', hu: 'Az öcsém megette a tortámat.' },
          { jp: '{隣|となり}の{人|ひと}に{足|あし}を{踏|ふ}まれました。', romaji: 'Tonari no hito ni ashi o fumaremashita.', hu: 'A mellettem álló rálépett a lábamra.' }
        ],
        tip: 'Magyarul: „ellopták a pénztárcámat". Japánul: „engem megloptak a pénztárcámat illetően" ({私|わたし}は{財布|さいふ}を{盗|ぬす}まれました).'
      },
      {
        title: 'Kellemetlenség szenvedő alakkal', sub: 'megáztam, rám tört',
        pattern: 'A は B に + tárgyatlan ige szenvedő alakja',
        body: 'Japánul tárgyatlan igéből is lehet szenvedő alakot képezni: azt fejezi ki, hogy ami történt, az neked kellemetlen volt.',
        examples: [
          { jp: '{雨|あめ}に{降|ふ}られました。', romaji: 'Ame ni furaremashita.', hu: 'Megáztam: rám esett az eső.' },
          { jp: '{夜中|よなか}に{赤|あか}ちゃんに{泣|な}かれて、{寝|ね}られませんでした。', romaji: 'Yonaka ni akachan ni nakarete, neraremasen deshita.', hu: 'Éjjel sírt a baba, nem tudtam aludni.' },
          { jp: '{急|きゅう}に{友|とも}だちに{来|こ}られて、{困|こま}りました。', romaji: 'Kyū ni tomodachi ni korarete, komarimashita.', hu: 'Váratlanul beállított a barátom, és bajban voltam.' }
        ]
      },
      {
        title: 'まず・それから・さいごに', sub: 'sorrendben elmesélve',
        pattern: 'まず、… それから、… {最後|さいご}に、…',
        body: 'Ha el kell mondanod, mi történt, ezek a szavak tagolják az eseményeket: <b>まず</b> (először), <b>それから</b> (aztán), <b>そのあと</b> (utána), <b>{最後|さいご}に</b> (végül).',
        examples: [
          { jp: 'まず、{警察|けいさつ}に{電話|でんわ}しました。', romaji: 'Mazu, keisatsu ni denwa shimashita.', hu: 'Először felhívtam a rendőrséget.' },
          { jp: 'それから、カードを{止|と}めました。', romaji: 'Sore kara, kādo o tomemashita.', hu: 'Aztán letiltattam a kártyámat.' },
          { jp: '{最後|さいご}に、{家族|かぞく}に{連絡|れんらく}しました。', romaji: 'Saigo ni, kazoku ni renraku shimashita.', hu: 'Végül értesítettem a családomat.' }
        ]
      },
      {
        title: '〜おかげで', sub: '…-nak köszönhetően',
        pattern: 'főnév + のおかげで · rövid alak + おかげで',
        body: 'Jó eredmény okát nevezi meg, hálával. (A rossz eredmény okát a 〜せいで fejezi ki, azt a 48. leckében tanulod.)',
        examples: [
          { jp: '{先生|せんせい}のおかげで、{試験|しけん}に{合格|ごうかく}しました。', romaji: 'Sensei no okage de, shiken ni gōkaku shimashita.', hu: 'A tanárnak köszönhetően átmentem a vizsgán.' },
          { jp: '{友|とも}だちが{手伝|てつだ}ってくれたおかげで、{早|はや}く{終|お}わりました。', romaji: 'Tomodachi ga tetsudatte kureta okage de, hayaku owarimashita.', hu: 'Hála a barátom segítségének, hamar végeztem.' },
          { jp: '{元気|げんき}になったのは、{薬|くすり}のおかげです。', romaji: 'Genki ni natta no wa, kusuri no okage desu.', hu: 'A gyógyszernek köszönhető, hogy meggyógyultam.' }
        ]
      }
    ],
    quiz: [
      { q: '„Megszidott apám." Mi hiányzik?', jp: '{父|ちち}＿しかられました。', a: 'に', wrong: ['を', 'が', 'で'],
        why: 'Szenvedő mondatban a cselekvő に-t kap.' },
      { q: '„A vonaton ellopták a pénztárcámat." Mi hiányzik?', jp: '{電車|でんしゃ}の{中|なか}で{財布|さいふ}＿{盗|ぬす}まれました。', a: 'を', wrong: ['に', 'で', 'へ'],
        why: 'Az alany én vagyok; a pénztárca megtartja az を-t.' },
      { q: 'Melyik mondat jelenti: „Az öcsém megette a tortámat (és ez bosszant)."', a: '{弟|おとうと}にケーキを{食|た}べられました。',
        wrong: ['{弟|おとうと}がケーキを{食|た}べられました。', '{弟|おとうと}にケーキを{食|た}べさせました。', '{弟|おとうと}にケーキを{食|た}べてもらいました。'],
        why: 'A kárt elszenvedő én vagyok az alany, az öcsém に-t kap.' },
      { q: 'Mit jelent: {雨|あめ}に{降|ふ}られました。', a: 'Megáztam: rám esett az eső.', wrong: ['Elállt az eső.', 'Úgy néz ki, esni fog.', 'Azt hallottam, esik.'],
        why: 'Tárgyatlan ige szenvedő alakja: kellemetlenség ért.' },
      { q: '„A barátom meghívott egy buliba." Mi hiányzik?', jp: '{友|とも}だちにパーティーに＿。', a: '{招待|しょうたい}されました', wrong: ['{招待|しょうたい}しました', '{招待|しょうたい}させました', '{招待|しょうたい}できました'],
        why: 'する → されます: engem hívtak meg.' },
      { q: '„A tanárnak köszönhetően átmentem a vizsgán." Mi hiányzik?', jp: '{先生|せんせい}＿おかげで、{試験|しけん}に{合格|ごうかく}しました。', a: 'の', wrong: ['な', 'に', 'が'],
        why: 'Főnév + のおかげで.' },
      { q: '„Hála a barátom segítségének, hamar végeztem." Mi hiányzik?', jp: '{友|とも}だちが{手伝|てつだ}ってくれた＿、{早|はや}く{終|お}わりました。', a: 'おかげで', wrong: ['のに', 'かわりに', 'まま'],
        why: 'Jó eredmény oka: 〜おかげで.' },
      { q: 'Melyik szó jelenti: „végül"?', a: '{最後|さいご}に', wrong: ['まず', 'それから', '{最初|さいしょ}に'],
        why: 'まず = először · それから = aztán · {最後|さいご}に = végül.' },
      { q: '„A mellettem álló rálépett a lábamra." Mi hiányzik?', jp: '{隣|となり}の{人|ひと}に{足|あし}を＿。', a: '{踏|ふ}まれました', wrong: ['{踏|ふ}みました', '{踏|ふ}めました', '{踏|ふ}ませました'],
        why: '{踏|ふ}む → {踏|ふ}まれます: velem történt.' },
      { q: 'Mit jelent: {急|きゅう}に{友|とも}だちに{来|こ}られて、{困|こま}りました。', a: 'Váratlanul beállított a barátom, és bajban voltam.',
        wrong: ['A barátom nem tudott eljönni, és bajban voltam.', 'Elmentem a barátomhoz, mert bajban voltam.', 'A barátom segített, amikor bajban voltam.'],
        why: '{来|こ}られて: a jövetele nekem kellemetlen volt.' }
    ]
  },

  /* ── 38. lecke ────────────────────────────────────── */
  {
    id: 'l38', no: 38, book: 'Dekiru 2',
    title: 'Tiszteletteljes beszéd',
    lead: 'Megismered a tiszteleti nyelv alapjait: hogyan beszélsz a tanárod, a főnököd vagy egy vendég cselekvéseiről, és hogyan kérsz tőlük valamit.',
    cando: [
      'Rangban feletted állóval vagy idősebbel beszélsz.',
      'Munkával kapcsolatos ügyeket intézel.',
      'Beszélsz a magyar nyelv sajátosságairól.'
    ],
    points: [
      {
        title: '〜れます・〜られます (tiszteleti)', sub: 'a szenvedő alak mint tisztelet',
        pattern: 'tisztelt személy は + szenvedő alakú ige',
        body: 'A szenvedő alak tiszteletet is kifejezhet: ugyanaz az alak, de a tisztelt személy a cselekvő. Ez a tiszteleti beszéd legegyszerűbb, mindennapos formája.',
        examples: [
          { jp: '{先生|せんせい}は{何時|なんじ}に{来|こ}られますか。', romaji: 'Sensei wa nanji ni koraremasu ka.', hu: 'Hánykor érkezik a tanár úr?' },
          { jp: '{部長|ぶちょう}はもう{帰|かえ}られました。', romaji: 'Buchō wa mō kaeraremashita.', hu: 'Az osztályvezető úr már hazament.' },
          { jp: 'この{本|ほん}を{読|よ}まれましたか。', romaji: 'Kono hon o yomaremashita ka.', hu: 'Olvasta ezt a könyvet?' }
        ]
      },
      {
        title: 'お〜になります', sub: 'tiszteleti forma',
        pattern: 'お + ige ます-tő + になります',
        body: 'Udvariasabb, mint a szenvedő alakos forma. A tisztelt személy cselekvésére használod; a sajátodra soha.',
        examples: [
          { jp: '{社長|しゃちょう}はもうお{帰|かえ}りになりました。', romaji: 'Shachō wa mō okaeri ni narimashita.', hu: 'Az igazgató úr már hazatért.' },
          { jp: '{先生|せんせい}がこの{本|ほん}をお{書|か}きになりました。', romaji: 'Sensei ga kono hon o okaki ni narimashita.', hu: 'Ezt a könyvet a tanár úr írta.' },
          { jp: '{何|なに}をお{飲|の}みになりますか。', romaji: 'Nani o onomi ni narimasu ka.', hu: 'Mit parancsol inni?' }
        ]
      },
      {
        title: 'Különleges tiszteleti igék', sub: 'いらっしゃいます és társai',
        pattern: 'いらっしゃいます · {召|め}し{上|あ}がります · おっしゃいます · なさいます · ご{覧|らん}になります',
        body: 'Néhány gyakori igének saját tiszteleti párja van: {行|い}く / {来|く}る / いる → <b>いらっしゃいます</b>, {食|た}べる / {飲|の}む → <b>{召|め}し{上|あ}がります</b>, {言|い}う → <b>おっしゃいます</b>, する → <b>なさいます</b>, {見|み}る → <b>ご{覧|らん}になります</b>.',
        examples: [
          { jp: '{先生|せんせい}は{研究室|けんきゅうしつ}にいらっしゃいます。', romaji: 'Sensei wa kenkyūshitsu ni irasshaimasu.', hu: 'A tanár úr a dolgozószobájában van.' },
          { jp: 'どうぞ{召|め}し{上|あ}がってください。', romaji: 'Dōzo meshiagatte kudasai.', hu: 'Parancsoljon, fogyasszon belőle.' },
          { jp: '{先生|せんせい}は{何|なん}とおっしゃいましたか。', romaji: 'Sensei wa nan to osshaimashita ka.', hu: 'Mit mondott a tanár úr?' }
        ]
      },
      {
        title: 'お〜ください・ご〜ください', sub: 'tiszteleti kérés',
        pattern: 'お + ます-tő + ください · ご + főnév + ください',
        body: 'A 〜てください tiszteleti változata. Japán eredetű igével <b>お</b>, kínai eredetű (két kanjis, する-val képzett) szóval <b>ご</b> áll.',
        examples: [
          { jp: 'こちらにお{座|すわ}りください。', romaji: 'Kochira ni osuwari kudasai.', hu: 'Kérem, foglaljon itt helyet.' },
          { jp: '{何|なに}かあれば、ご{連絡|れんらく}ください。', romaji: 'Nanika areba, gorenraku kudasai.', hu: 'Ha bármi van, kérem, értesítsen.' },
          { jp: '{足元|あしもと}にご{注意|ちゅうい}ください。', romaji: 'Ashimoto ni gochūi kudasai.', hu: 'Kérem, vigyázzon, hová lép.' }
        ]
      },
      {
        title: '〜うちに', sub: 'amíg még…, mielőtt…',
        pattern: 'szótári alak / ない-alak / い-melléknév + うちに · főnév + のうちに',
        body: 'Azt jelenti: használd ki az időt, amíg az állapot tart. ない-alakkal: „mielőtt megtörténne".',
        examples: [
          { jp: '{熱|あつ}いうちに、どうぞ。', romaji: 'Atsui uchi ni, dōzo.', hu: 'Tessék, amíg meleg.' },
          { jp: '{忘|わす}れないうちに、メモしておきます。', romaji: 'Wasurenai uchi ni, memo shite okimasu.', hu: 'Felírom, mielőtt elfelejtem.' },
          { jp: '{日本|にほん}にいるうちに、{富士山|ふじさん}に{登|のぼ}りたいです。', romaji: 'Nihon ni iru uchi ni, Fujisan ni noboritai desu.', hu: 'Amíg Japánban vagyok, szeretnék felmenni a Fudzsira.' }
        ]
      }
    ],
    quiz: [
      { q: '„Az igazgató úr már hazatért." (tiszteleti) Mi hiányzik?', jp: '{社長|しゃちょう}はもうお{帰|かえ}り＿。', a: 'になりました', wrong: ['しました', 'ください', 'にしました'],
        why: 'Tiszteleti forma: お + ます-tő + になります.' },
      { q: 'Mi a {書|か}きます お〜になります alakja?', a: 'お{書|か}きになります', wrong: ['お{書|か}くになります', 'お{書|か}いてになります', 'ご{書|か}きになります'],
        why: 'お + ます-tő ({書|か}き) + になります.' },
      { q: 'Melyik a {食|た}べます tiszteleti párja?', a: '{召|め}し{上|あ}がります', wrong: ['いただきます', 'いらっしゃいます', 'おっしゃいます'],
        why: '{召|め}し{上|あ}がります: a tisztelt személy eszik. (Az いただきます szerény: én eszem.)' },
      { q: 'Melyik a {言|い}います tiszteleti párja?', a: 'おっしゃいます', wrong: ['いらっしゃいます', 'なさいます', '{召|め}し{上|あ}がります'],
        why: '{言|い}う → おっしゃいます.' },
      { q: '„A tanár úr a dolgozószobájában van." Mi hiányzik?', jp: '{先生|せんせい}は{研究室|けんきゅうしつ}に＿。', a: 'いらっしゃいます', wrong: ['おります', 'あります', 'ございます'],
        why: 'いる tiszteleti párja: いらっしゃいます. (Az おります szerény.)' },
      { q: '„Ha bármi van, kérem, értesítsen." Mi hiányzik?', jp: '{何|なに}かあれば、＿ください。', a: 'ご{連絡|れんらく}', wrong: ['お{連絡|れんらく}', '{連絡|れんらく}になり', 'ご{連絡|れんらく}して'],
        why: 'Kínai eredetű szóval: ご + főnév + ください.' },
      { q: '„Tessék, amíg meleg." Mi hiányzik?', jp: '{熱|あつ}い＿、どうぞ。', a: 'うちに', wrong: ['までに', 'かわりに', 'ままに'],
        why: 'Amíg az állapot tart: 〜うちに.' },
      { q: '„Felírom, mielőtt elfelejtem." Mi hiányzik?', jp: '＿うちに、メモしておきます。', a: '{忘|わす}れない', wrong: ['{忘|わす}れた', '{忘|わす}れて', '{忘|わす}れる'],
        why: 'Mielőtt megtörténne: ない-alak + うちに.' },
      { q: 'Mit jelent: {部長|ぶちょう}はもう{帰|かえ}られました。', a: 'Az osztályvezető úr már hazament (tisztelettel mondva).',
        wrong: ['Az osztályvezető haza tudott menni.', 'Az osztályvezetőt hazaküldték.', 'Az osztályvezető még nem ment haza.'],
        why: 'A szenvedő alak itt tiszteletet fejez ki.' },
      { q: 'Kinek a cselekvésére használod a tiszteleti alakokat?', a: 'Másokéra, akiket tisztelsz: tanár, főnök, vendég.',
        wrong: ['A saját cselekvésedre.', 'A saját családtagjaidéra, ha idegennel beszélsz.', 'Bárkiére, a barátaidéra is.'],
        why: 'A tiszteleti nyelv a másikat emeli; magadra és a tieidre nem használod.' }
    ]
  },

  /* ── 39. lecke ────────────────────────────────────── */
  {
    id: 'l39', no: 39, book: 'Dekiru 2',
    title: 'Szerényen szólva',
    lead: 'Megtanulod, hogyan beszélsz szerényen a saját cselekvéseidről, mire való az お és a ご előtag, és kifejezed, hogy valami könnyű, nehéz vagy túl sok.',
    cando: [
      'Beszélgetést kezdeményezel első találkozáskor.',
      'Rövid beszédet mondasz egy összejövetelen.',
      'Megérted egy rövid szöveg lényegét.'
    ],
    points: [
      {
        title: 'お〜します', sub: 'szerény forma',
        pattern: 'お + ige ます-tő + します · ご + főnév + します',
        body: 'A <b>szerény nyelv</b> a saját cselekvésedet „teszi lejjebb", így emeli a másikat. Akkor használod, ha amit teszel, a tisztelt személyt érinti vagy érte történik.',
        examples: [
          { jp: 'お{荷物|にもつ}をお{持|も}ちします。', romaji: 'Onimotsu o omochi shimasu.', hu: 'Viszem a csomagját.' },
          { jp: '{駅|えき}までお{送|おく}りします。', romaji: 'Eki made ookuri shimasu.', hu: 'Kikísérem az állomásig.' },
          { jp: 'あとでご{連絡|れんらく}します。', romaji: 'Ato de gorenraku shimasu.', hu: 'Később jelentkezem.' }
        ],
        tip: 'お〜になります: a másik cselekszik (tiszteleti). お〜します: én cselekszem (szerény).'
      },
      {
        title: 'お〜いたします és a szerény igék', sub: 'még szerényebben',
        pattern: 'お + ます-tő + いたします · {参|まい}ります · {申|もう}します · おります',
        body: 'Az <b>いたします</b> a します még szerényebb párja. Néhány igének külön szerény alakja van: {行|い}く / {来|く}る → <b>{参|まい}ります</b>, {言|い}う → <b>{申|もう}します</b>, いる → <b>おります</b>, {食|た}べる / もらう → <b>いただきます</b>, {見|み}る → <b>{拝見|はいけん}します</b>.',
        examples: [
          { jp: 'よろしくお{願|ねが}いいたします。', romaji: 'Yoroshiku onegai itashimasu.', hu: 'Tisztelettel kérem a szíves támogatását.' },
          { jp: '{田中|たなか}と{申|もう}します。', romaji: 'Tanaka to mōshimasu.', hu: 'Tanaka vagyok.' },
          { jp: 'あした{三時|さんじ}に{参|まい}ります。', romaji: 'Ashita sanji ni mairimasu.', hu: 'Holnap háromra megyek Önhöz.' }
        ]
      },
      {
        title: 'お〜・ご〜', sub: 'udvarias előtag',
        pattern: 'お + japán eredetű szó · ご + kínai eredetű szó',
        body: 'A másik emberhez tartozó dolgokat udvarias előtaggal említed: お{名前|なまえ}, お{仕事|しごと}, お{時間|じかん}; ご{家族|かぞく}, ご{住所|じゅうしょ}, ご{意見|いけん}. A saját dolgaidra nem teszed ki.',
        examples: [
          { jp: 'お{名前|なまえ}を{教|おし}えていただけますか。', romaji: 'Onamae o oshiete itadakemasu ka.', hu: 'Megmondaná a nevét?' },
          { jp: 'ご{家族|かぞく}はお{元気|げんき}ですか。', romaji: 'Gokazoku wa ogenki desu ka.', hu: 'Jól van a kedves családja?' },
          { jp: 'ご{意見|いけん}をお{聞|き}かせください。', romaji: 'Goiken o okikase kudasai.', hu: 'Kérem, mondja el a véleményét.' }
        ]
      },
      {
        title: '〜やすいです・〜にくいです', sub: 'könnyű · nehéz megtenni',
        pattern: 'ige ます-tő + やすい / にくい',
        body: 'Az így kapott szó い-melléknév: {書|か}きやすい (könnyű vele írni), {書|か}きにくい (nehéz vele írni).',
        examples: [
          { jp: 'このペンは{書|か}きやすいです。', romaji: 'Kono pen wa kakiyasui desu.', hu: 'Ezzel a tollal könnyű írni.' },
          { jp: 'この{漢字|かんじ}は{覚|おぼ}えにくいです。', romaji: 'Kono kanji wa oboenikui desu.', hu: 'Ezt a kanjit nehéz megjegyezni.' },
          { jp: '{先生|せんせい}の{説明|せつめい}はわかりやすいです。', romaji: 'Sensei no setsumei wa wakariyasui desu.', hu: 'A tanár magyarázata könnyen érthető.' }
        ]
      },
      {
        title: '〜すぎます', sub: 'túl…, túlságosan',
        pattern: 'ige ます-tő + すぎます · い → すぎます · な-melléknév + すぎます',
        body: 'A mérték meghaladja a kívánatosat. Az い-melléknévről lemarad az い: {大|おお}きい → {大|おお}きすぎます.',
        examples: [
          { jp: 'きのうは{食|た}べすぎました。', romaji: 'Kinō wa tabesugimashita.', hu: 'Tegnap túl sokat ettem.' },
          { jp: 'この{靴|くつ}は{大|おお}きすぎます。', romaji: 'Kono kutsu wa ōkisugimasu.', hu: 'Ez a cipő túl nagy.' },
          { jp: 'この{問題|もんだい}は{簡単|かんたん}すぎます。', romaji: 'Kono mondai wa kantansugimasu.', hu: 'Ez a feladat túl könnyű.' }
        ]
      }
    ],
    quiz: [
      { q: '„Viszem a csomagját." (szerényen) Mi hiányzik?', jp: 'お{荷物|にもつ}をお{持|も}ち＿。', a: 'します', wrong: ['になります', 'ください', 'でございます'],
        why: 'Szerény forma: お + ます-tő + します.' },
      { q: 'Kinek a cselekvéséről szól az お〜します forma?', a: 'A sajátomról, amit a másikért teszek.',
        wrong: ['A tisztelt személy cselekvéséről.', 'Bárki cselekvéséről.', 'Csak a családtagjaiméról.'],
        why: 'A szerény nyelv a beszélő cselekvését teszi lejjebb.' },
      { q: 'Melyik a {言|い}います szerény párja?', a: '{申|もう}します', wrong: ['おっしゃいます', '{参|まい}ります', 'なさいます'],
        why: '{言|い}う → {申|もう}します (szerény) · おっしゃいます (tiszteleti).' },
      { q: 'Melyik a {行|い}きます szerény párja?', a: '{参|まい}ります', wrong: ['いらっしゃいます', '{申|もう}します', 'おります'],
        why: '{行|い}く / {来|く}る → {参|まい}ります.' },
      { q: '„Jól van a kedves családja?" Mi hiányzik?', jp: '＿{家族|かぞく}はお{元気|げんき}ですか。', a: 'ご', wrong: ['お', 'こ', 'を'],
        why: 'Kínai eredetű szó előtt: ご{家族|かぞく}.' },
      { q: '„Ezzel a tollal könnyű írni." Mi hiányzik?', jp: 'このペンは＿やすいです。', a: '{書|か}き', wrong: ['{書|か}く', '{書|か}いて', '{書|か}け'],
        why: 'ます-tő + やすい.' },
      { q: '„Ezt a kanjit nehéz megjegyezni." Mi hiányzik?', jp: 'この{漢字|かんじ}は{覚|おぼ}え＿です。', a: 'にくい', wrong: ['やすい', 'ばかり', 'らしい'],
        why: 'Nehéz megtenni: ます-tő + にくい.' },
      { q: '„Tegnap túl sokat ettem." Mi hiányzik?', jp: 'きのうは＿すぎました。', a: '{食|た}べ', wrong: ['{食|た}べる', '{食|た}べて', '{食|た}べた'],
        why: 'ます-tő + すぎます.' },
      { q: '„Ez a cipő túl nagy." Mi hiányzik?', jp: 'この{靴|くつ}は＿すぎます。', a: '{大|おお}き', wrong: ['{大|おお}きい', '{大|おお}きく', '{大|おお}きな'],
        why: 'い-melléknév: az い lemarad a すぎます előtt.' },
      { q: 'Mit jelent: {田中|たなか}と{申|もう}します。', a: 'Tanaka vagyok (szerényen mondva).', wrong: ['Tanaka úr mondta.', 'Tanakát keresem.', 'Tanaka úr üzeni.'],
        why: '{申|もう}します: a {言|い}います szerény alakja; bemutatkozáskor használod.' }
    ]
  },

  /* ── 40. lecke ────────────────────────────────────── */
  {
    id: 'l40', no: 40, book: 'Dekiru 2',
    title: 'Interjú',
    lead: 'Kifejezed, hogy „bármi, bármikor", megmondod, hogy egy cselekvés elkezdődik, folytatódik vagy véget ér, és leírod, milyennek látszik valaki.',
    cando: [
      'Megtervezel és előkészítesz egy interjút, jegyzetelsz.',
      'Interjút készítesz.',
      'Köszönő e-mailt írsz.'
    ],
    points: [
      {
        title: 'kérdőszó + 〜ても', sub: 'akár…, bármennyire',
        pattern: 'いくら / {何|なに}を / いつ / だれが + ige て-alak + も',
        body: 'Kérdőszóval a 〜ても azt jelenti: az eredmény minden esetben ugyanaz. Az <b>いくら</b> és a どんなに: „akármennyire".',
        examples: [
          { jp: 'いくら{待|ま}っても、バスが{来|き}ません。', romaji: 'Ikura matte mo, basu ga kimasen.', hu: 'Akármeddig várok, nem jön a busz.' },
          { jp: '{何|なに}を{食|た}べても、おいしいです。', romaji: 'Nani o tabete mo, oishii desu.', hu: 'Bármit eszem, finom.' },
          { jp: 'いつ{行|い}っても、あの{店|みせ}は{込|こ}んでいます。', romaji: 'Itsu itte mo, ano mise wa konde imasu.', hu: 'Akármikor megyek, az a bolt tele van.' }
        ]
      },
      {
        title: 'kérdőszó + でも', sub: 'bármi, bárki, bármikor',
        pattern: '{何|なん}でも · だれでも · いつでも · どこでも',
        body: 'A kérdőszóhoz tapadó <b>でも</b> teljes körű megengedést jelent: „akármelyik megfelel".',
        examples: [
          { jp: '{何|なん}でも{聞|き}いてください。', romaji: 'Nan demo kiite kudasai.', hu: 'Bármit kérdezhet.' },
          { jp: 'いつでも{来|き}てください。', romaji: 'Itsu demo kite kudasai.', hu: 'Jöjjön bármikor.' },
          { jp: 'これはだれでもできます。', romaji: 'Kore wa dare demo dekimasu.', hu: 'Ezt bárki meg tudja csinálni.' }
        ]
      },
      {
        title: '〜はじめます・〜おわります', sub: 'elkezd · befejez',
        pattern: 'ige ます-tő + {始|はじ}めます / {終|お}わります',
        body: 'Összetett igék: a ます-tőhöz kapcsolódó második ige megmondja, a cselekvés melyik szakaszáról van szó.',
        examples: [
          { jp: '{先月|せんげつ}からピアノを{習|なら}い{始|はじ}めました。', romaji: 'Sengetsu kara piano o naraihajimemashita.', hu: 'Múlt hónapban kezdtem zongorázni tanulni.' },
          { jp: '{桜|さくら}が{咲|さ}き{始|はじ}めました。', romaji: 'Sakura ga sakihajimemashita.', hu: 'Nyílni kezdett a cseresznyevirág.' },
          { jp: 'この{本|ほん}はもう{読|よ}み{終|お}わりました。', romaji: 'Kono hon wa mō yomiowarimashita.', hu: 'Ezt a könyvet már kiolvastam.' }
        ]
      },
      {
        title: '〜だします', sub: 'hirtelen elkezd',
        pattern: 'ige ます-tő + {出|だ}します',
        body: 'Váratlan, hirtelen kezdet: valami „kitör". A {始|はじ}めます semleges, a {出|だ}します meglepetést hordoz.',
        examples: [
          { jp: '{赤|あか}ちゃんが{急|きゅう}に{泣|な}き{出|だ}しました。', romaji: 'Akachan ga kyū ni nakidashimashita.', hu: 'A baba hirtelen sírni kezdett.' },
          { jp: '{雨|あめ}が{降|ふ}り{出|だ}しました。', romaji: 'Ame ga furidashimashita.', hu: 'Hirtelen eleredt az eső.' },
          { jp: 'みんなが{笑|わら}い{出|だ}しました。', romaji: 'Minna ga waraidashimashita.', hu: 'Mindenki nevetésben tört ki.' }
        ]
      },
      {
        title: '〜つづけます', sub: 'tovább csinál',
        pattern: 'ige ます-tő + {続|つづ}けます',
        body: 'A cselekvés megszakítás nélkül folytatódik.',
        examples: [
          { jp: '{三時間|さんじかん}も{歩|ある}き{続|つづ}けました。', romaji: 'Sanjikan mo arukitsuzukemashita.', hu: 'Három órán át gyalogoltam megállás nélkül.' },
          { jp: 'これからも{日本語|にほんご}を{勉強|べんきょう}し{続|つづ}けたいです。', romaji: 'Kore kara mo nihongo o benkyō shitsuzuketai desu.', hu: 'Ezután is szeretném folytatni a japántanulást.' },
          { jp: '{彼|かれ}は{十年間|じゅうねんかん}、{同|おな}じ{会社|かいしゃ}で{働|はたら}き{続|つづ}けています。', romaji: 'Kare wa jūnenkan, onaji kaisha de hatarakitsuzukete imasu.', hu: 'Tíz éve ugyanannál a cégnél dolgozik.' }
        ]
      },
      {
        title: '〜そうです (emberekről)', sub: 'boldognak, fáradtnak látszik',
        pattern: 'érzést jelentő melléknév + そうです',
        body: 'Más ember érzéseiről nem állíthatsz közvetlenül (うれしいです csak magadról mondható). Ezért amit rajta látsz, そうです-szel mondod: うれしそう, {悲|かな}しそう, {眠|ねむ}そう, {忙|いそが}しそう.',
        examples: [
          { jp: '{田中|たなか}さんはうれしそうです。', romaji: 'Tanaka-san wa ureshisō desu.', hu: 'Tanaka boldognak látszik.' },
          { jp: '{眠|ねむ}そうですね。{大丈夫|だいじょうぶ}ですか。', romaji: 'Nemusō desu ne. Daijōbu desu ka.', hu: 'Álmosnak látszol. Jól vagy?' },
          { jp: '{彼女|かのじょ}は{悲|かな}しそうな{顔|かお}をしていました。', romaji: 'Kanojo wa kanashisō na kao o shite imashita.', hu: 'Szomorú arcot vágott.' }
        ]
      }
    ],
    quiz: [
      { q: '„Akármeddig várok, nem jön a busz." Mi hiányzik?', jp: '＿{待|ま}っても、バスが{来|き}ません。', a: 'いくら', wrong: ['いくつ', 'どれ', 'なんでも'],
        why: 'いくら〜ても = akármennyire is.' },
      { q: '„Bármit eszem, finom." Mi hiányzik?', jp: '{何|なに}を＿、おいしいです。', a: '{食|た}べても', wrong: ['{食|た}べたら', '{食|た}べれば', '{食|た}べると'],
        why: 'Kérdőszó + て-alak + も.' },
      { q: '„Jöjjön bármikor." Mi hiányzik?', jp: '＿{来|き}てください。', a: 'いつでも', wrong: ['いつも', 'いつか', 'いつまで'],
        why: 'いつでも = bármikor. (いつも = mindig.)' },
      { q: '„Ezt bárki meg tudja csinálni." Mi hiányzik?', jp: 'これは＿できます。', a: 'だれでも', wrong: ['だれか', 'だれも', 'だれが'],
        why: 'だれでも = bárki.' },
      { q: '„Múlt hónapban kezdtem zongorázni tanulni." Mi hiányzik?', jp: '{先月|せんげつ}からピアノを{習|なら}い＿。', a: '{始|はじ}めました', wrong: ['{終|お}わりました', '{続|つづ}けました', 'すぎました'],
        why: 'Elkezd: ます-tő + {始|はじ}めます.' },
      { q: '„A baba hirtelen sírni kezdett." Mi hiányzik?', jp: '{赤|あか}ちゃんが{急|きゅう}に{泣|な}き＿。', a: '{出|だ}しました', wrong: ['{終|お}わりました', '{続|つづ}けました', 'やすいです'],
        why: 'Hirtelen kezdet: ます-tő + {出|だ}します.' },
      { q: '„Ezt a könyvet már kiolvastam." Mi hiányzik?', jp: 'この{本|ほん}はもう＿{終|お}わりました。', a: '{読|よ}み', wrong: ['{読|よ}んで', '{読|よ}む', '{読|よ}んだ'],
        why: 'ます-tő + {終|お}わります.' },
      { q: '„Három órán át gyalogoltam megállás nélkül." Mi hiányzik?', jp: '{三時間|さんじかん}も{歩|ある}き＿。', a: '{続|つづ}けました', wrong: ['{始|はじ}めました', '{出|だ}しました', '{終|お}わりました'],
        why: 'Folytat: ます-tő + {続|つづ}けます.' },
      { q: 'Hogyan mondod: „Tanaka boldognak látszik."', a: '{田中|たなか}さんはうれしそうです。',
        wrong: ['{田中|たなか}さんはうれしいそうです。', '{田中|たなか}さんはうれしがりです。', '{田中|たなか}さんはうれしくそうです。'],
        why: 'Látszat: az い lemarad, うれしそうです. (Az うれしいそうです hallomás.)' },
      { q: 'Mit jelent: {何|なん}でも{聞|き}いてください。', a: 'Bármit kérdezhet.', wrong: ['Mit kérdezett?', 'Ne kérdezzen semmit.', 'Kérdezzen valamit.'],
        why: '{何|なん}でも = bármit.' }
    ]
  },

  /* ── 41. lecke ────────────────────────────────────── */
  {
    id: 'l41', no: 41, book: 'Dekiru 2',
    title: 'Bemutató',
    lead: 'Hasonlattal élsz, hangsúlyozod a mennyiséget, kifejezed, hogy nincs más lehetőség, és utánakérdezel annak, amit nem ismersz.',
    cando: [
      'Rákérdezel arra, amit nem ismersz vagy nem értesz.',
      'Japánul összefoglalsz egy magyar nyelvű szöveget.',
      'Bemutatsz egy rendezvényt vagy szokást.'
    ],
    points: [
      {
        title: 'まるで〜ようです', sub: 'mintha…',
        pattern: 'まるで + főnév のようです · まるで + rövid alak + ようです',
        body: 'Hasonlat: valami olyan, mintha más volna, pedig nem az. A <b>まるで</b> („egészen, szinte") nyomatékosítja. Ige előtt のように, főnév előtt のような.',
        examples: [
          { jp: 'まるで{夢|ゆめ}のようです。', romaji: 'Marude yume no yō desu.', hu: 'Mintha álom volna.' },
          { jp: '{彼|かれ}はまるで{日本人|にほんじん}のように{日本語|にほんご}を{話|はな}します。', romaji: 'Kare wa marude nihonjin no yō ni nihongo o hanashimasu.', hu: 'Úgy beszél japánul, mintha japán volna.' },
          { jp: 'この{人形|にんぎょう}はまるで{生|い}きているようです。', romaji: 'Kono ningyō wa marude ikite iru yō desu.', hu: 'Ez a baba olyan, mintha élne.' }
        ]
      },
      {
        title: '〜も (mennyiség)', sub: 'egész, annyi mint',
        pattern: 'szám + számláló + も',
        body: 'Mennyiség után a <b>も</b> azt fejezi ki, hogy az sok, több a vártnál. Az „egy" + számláló + も tagadással ellenkezőleg: „egy sem".',
        examples: [
          { jp: '{駅|えき}まで{一時間|いちじかん}もかかりました。', romaji: 'Eki made ichijikan mo kakarimashita.', hu: 'Egy egész órába telt az állomásig.' },
          { jp: 'ケーキを{三|みっ}つも{食|た}べました。', romaji: 'Kēki o mittsu mo tabemashita.', hu: 'Három szelet tortát is megettem.' },
          { jp: '{一人|ひとり}も{来|き}ませんでした。', romaji: 'Hitori mo kimasen deshita.', hu: 'Senki sem jött el.' }
        ]
      },
      {
        title: '〜しかありません', sub: 'csak ennyi van · nincs más hátra',
        pattern: 'főnév + しかありません · szótári alak + しかありません',
        body: 'Főnévvel: csak ennyi van, és ez kevés. Igével: nincs más választás, mint megtenni.',
        examples: [
          { jp: '{時間|じかん}が{十分|じゅっぷん}しかありません。', romaji: 'Jikan ga juppun shika arimasen.', hu: 'Csak tíz percünk van.' },
          { jp: 'もう{歩|ある}くしかありません。', romaji: 'Mō aruku shika arimasen.', hu: 'Nincs más hátra, gyalogolni kell.' },
          { jp: '{自分|じぶん}でやるしかありません。', romaji: 'Jibun de yaru shika arimasen.', hu: 'Nincs más választásom, magamnak kell megcsinálnom.' }
        ]
      },
      {
        title: '〜だけあって', sub: 'nem hiába…',
        pattern: 'rövid alak / főnév + だけあって',
        body: 'Elismerést fejez ki: az eredmény megfelel annak, amit az előzmény alapján várni lehetett.',
        examples: [
          { jp: '{有名|ゆうめい}な{店|みせ}だけあって、とてもおいしいです。', romaji: 'Yūmei na mise dake atte, totemo oishii desu.', hu: 'Nem hiába híres ez az étterem: nagyon finom.' },
          { jp: '{日本|にほん}に{十年|じゅうねん}{住|す}んでいただけあって、{日本語|にほんご}が{上手|じょうず}です。', romaji: 'Nihon ni jūnen sunde ita dake atte, nihongo ga jōzu desu.', hu: 'Nem hiába élt tíz évet Japánban: jól beszél japánul.' },
          { jp: '{高|たか}いだけあって、このカメラはきれいに{撮|と}れます。', romaji: 'Takai dake atte, kono kamera wa kirei ni toremasu.', hu: 'Nem hiába drága: ez a gép szép képeket csinál.' }
        ]
      },
      {
        title: '〜というのは', sub: 'mit jelent az, hogy…',
        pattern: '「A」というのは + B です / {何|なん}ですか',
        body: 'Ezzel kérdezel rá egy ismeretlen szóra, és ezzel adsz meghatározást is.',
        examples: [
          { jp: '「{祭|まつ}り」というのは{何|なん}ですか。', romaji: '"Matsuri" to iu no wa nan desu ka.', hu: 'Mi az a macuri?' },
          { jp: '「{花見|はなみ}」というのは、{桜|さくら}を{見|み}ながら{楽|たの}しむことです。', romaji: '"Hanami" to iu no wa, sakura o minagara tanoshimu koto desu.', hu: 'A hanami azt jelenti: cseresznyevirág-nézés közben szórakozni.' },
          { jp: 'それはどういう{意味|いみ}ですか。', romaji: 'Sore wa dō iu imi desu ka.', hu: 'Az mit jelent?' }
        ]
      }
    ],
    quiz: [
      { q: '„Mintha álom volna." Mi hiányzik?', jp: '＿{夢|ゆめ}のようです。', a: 'まるで', wrong: ['いくら', 'ぜひ', 'たしかに'],
        why: 'Hasonlat: まるで〜のようです.' },
      { q: '„Úgy beszél japánul, mintha japán volna." Mi hiányzik?', jp: '{彼|かれ}はまるで{日本人|にほんじん}＿{日本語|にほんご}を{話|はな}します。', a: 'のように', wrong: ['のような', 'みたいな', 'そうに'],
        why: 'Ige előtt: のように.' },
      { q: '„Egy egész órába telt az állomásig." Mi hiányzik?', jp: '{駅|えき}まで{一時間|いちじかん}＿かかりました。', a: 'も', wrong: ['しか', 'だけ', 'まで'],
        why: 'A mennyiség sok: szám + も.' },
      { q: 'Mit jelent: {一人|ひとり}も{来|き}ませんでした。', a: 'Senki sem jött el.', wrong: ['Egy ember jött el.', 'Csak egy ember jött el.', 'Sokan eljöttek.'],
        why: '{一人|ひとり}も + tagadás = egy ember sem.' },
      { q: '„Csak tíz percünk van." Mi hiányzik?', jp: '{時間|じかん}が{十分|じゅっぷん}＿ありません。', a: 'しか', wrong: ['だけ', 'まで', 'ばかり'],
        why: 'しか + tagadás: csak ennyi.' },
      { q: '„Nincs más hátra, gyalogolni kell." Mi hiányzik?', jp: 'もう＿しかありません。', a: '{歩|ある}く', wrong: ['{歩|ある}いて', '{歩|ある}き', '{歩|ある}いた'],
        why: 'Szótári alak + しかありません.' },
      { q: '„Nem hiába híres ez az étterem: nagyon finom." Mi hiányzik?', jp: '{有名|ゆうめい}な{店|みせ}＿、とてもおいしいです。', a: 'だけあって', wrong: ['のに', 'しかなくて', 'かわりに'],
        why: 'A várakozásnak megfelelő eredmény: 〜だけあって.' },
      { q: 'Mit jelent: {高|たか}いだけあって、このカメラはきれいに{撮|と}れます。', a: 'Nem hiába drága: ez a gép szép képeket csinál.',
        wrong: ['Drága, pedig nem csinál szép képeket.', 'Csak a drága gépek csinálnak szép képet.', 'Ez a gép drága, de megveszem.'],
        why: '〜だけあって: megéri az árát.' },
      { q: '„Mi az a macuri?" Mi hiányzik?', jp: '「{祭|まつ}り」＿{何|なん}ですか。', a: 'というのは', wrong: ['といっても', 'とか', 'として'],
        why: 'Ismeretlen szóra rákérdezés: 〜というのは{何|なん}ですか.' },
      { q: 'Melyik mondat jelenti: „Nincs más választásom, magamnak kell megcsinálnom."', a: '{自分|じぶん}でやるしかありません。',
        wrong: ['{自分|じぶん}でやるだけあります。', '{自分|じぶん}でやるかもしれません。', '{自分|じぶん}でやらなくてもいいです。'],
        why: 'Ige + しかありません: nincs más lehetőség.' }
    ]
  },

  /* ── 42. lecke ────────────────────────────────────── */
  {
    id: 'l42', no: 42, book: 'Dekiru 2',
    title: 'Vita',
    lead: 'Megmondod, kinek a szempontjából beszélsz, kiemeled a lényeget, és megtanulod, hogyan érts egyet vagy mondj ellent udvariasan.',
    cando: [
      'Megérted egy szerző véleményét egy adott témában.',
      'Részt veszel egy vitában, és kifejted az álláspontodat.',
      'Egyetértesz, ellentmondasz, visszakérdezel.'
    ],
    points: [
      {
        title: '〜にとって', sub: 'számára',
        pattern: 'főnév + にとって',
        body: 'Azt mondja meg, kinek a szempontjából igaz az értékelés. Utána rendszerint melléknév vagy értékítélet áll.',
        examples: [
          { jp: '{私|わたし}にとって、{家族|かぞく}がいちばん{大切|たいせつ}です。', romaji: 'Watashi ni totte, kazoku ga ichiban taisetsu desu.', hu: 'Számomra a család a legfontosabb.' },
          { jp: '{外国人|がいこくじん}にとって、{漢字|かんじ}は{難|むずか}しいです。', romaji: 'Gaikokujin ni totte, kanji wa muzukashii desu.', hu: 'A külföldieknek nehéz a kanji.' },
          { jp: '{子|こ}どもにとって、{遊|あそ}ぶことは{大切|たいせつ}な{勉強|べんきょう}です。', romaji: 'Kodomo ni totte, asobu koto wa taisetsu na benkyō desu.', hu: 'A gyereknek a játék fontos tanulás.' }
        ]
      },
      {
        title: '〜からみると', sub: '… szemével nézve',
        pattern: 'főnév + から{見|み}ると',
        body: 'Nézőpontot ad: valaki a maga helyéről így látja, így ítéli meg a dolgot.',
        examples: [
          { jp: '{親|おや}から{見|み}ると、{子|こ}どもはいつまでも{子|こ}どもです。', romaji: 'Oya kara miru to, kodomo wa itsu made mo kodomo desu.', hu: 'A szülő szemében a gyerek mindig gyerek marad.' },
          { jp: '{外国人|がいこくじん}から{見|み}ると、この{習慣|しゅうかん}は{不思議|ふしぎ}です。', romaji: 'Gaikokujin kara miru to, kono shūkan wa fushigi desu.', hu: 'Egy külföldi szemével ez a szokás furcsa.' },
          { jp: '{私|わたし}から{見|み}ると、どちらも{同|おな}じです。', romaji: 'Watashi kara miru to, dochira mo onaji desu.', hu: 'Az én szememben mindkettő ugyanaz.' }
        ]
      },
      {
        title: '〜こそ', sub: 'éppen, pontosan',
        pattern: 'főnév + こそ',
        body: 'Erős kiemelés: „éppen ez, és nem más". Állandó fordulatokban is él: こちらこそ („én is, részemről").',
        examples: [
          { jp: '{今年|ことし}こそ、{日本|にほん}へ{行|い}きたいです。', romaji: 'Kotoshi koso, Nihon e ikitai desu.', hu: 'Idén aztán tényleg el akarok menni Japánba.' },
          { jp: 'こちらこそ、よろしくお{願|ねが}いします。', romaji: 'Kochira koso, yoroshiku onegai shimasu.', hu: 'Részemről a megtiszteltetés.' },
          { jp: 'これこそ{私|わたし}が{探|さが}していた{本|ほん}です。', romaji: 'Kore koso watashi ga sagashite ita hon desu.', hu: 'Éppen ezt a könyvet kerestem.' }
        ]
      },
      {
        title: 'Egyetértés és ellenvetés', sub: 'さんせいです・はんたいです',
        pattern: '〜に{賛成|さんせい}です · 〜に{反対|はんたい}です · たしかに〜が、…',
        body: 'Amivel egyetértesz vagy amit ellenzel, <b>に</b>-t kap. Az ellenvetést illik elismeréssel kezdeni: <b>たしかに</b>… („való igaz…, de").',
        examples: [
          { jp: '{私|わたし}はその{意見|いけん}に{賛成|さんせい}です。', romaji: 'Watashi wa sono iken ni sansei desu.', hu: 'Egyetértek ezzel a véleménnyel.' },
          { jp: '{私|わたし}はその{考|かんが}えに{反対|はんたい}です。', romaji: 'Watashi wa sono kangae ni hantai desu.', hu: 'Ellenzem ezt az elképzelést.' },
          { jp: 'たしかに{便利|べんり}ですが、{問題|もんだい}もあります。', romaji: 'Tashika ni benri desu ga, mondai mo arimasu.', hu: 'Valóban praktikus, de vannak gondok is.' }
        ]
      },
      {
        title: 'Vélemény tompítva', sub: '〜のではないでしょうか',
        pattern: 'rövid alak + のではないでしょうか · 〜と{思|おも}いますが…',
        body: 'Vitában a kijelentést kérdéssé szelídíted: „nem lehet, hogy…?" A befejezetlen <b>〜と{思|おも}いますが…</b> ugyanezt a tapintatot szolgálja.',
        examples: [
          { jp: 'それは{少|すこ}し{違|ちが}うのではないでしょうか。', romaji: 'Sore wa sukoshi chigau no de wa nai deshō ka.', hu: 'Ez talán nem egészen így van, nem gondolja?' },
          { jp: 'もう{少|すこ}し{考|かんが}えたほうがいいと{思|おも}いますが…。', romaji: 'Mō sukoshi kangaeta hō ga ii to omoimasu ga...', hu: 'Szerintem érdemes volna még gondolkodni rajta…' },
          { jp: '{皆|みな}さんはどう{思|おも}いますか。', romaji: 'Minasan wa dō omoimasu ka.', hu: 'Önök mit gondolnak?' }
        ]
      }
    ],
    quiz: [
      { q: '„Számomra a család a legfontosabb." Mi hiányzik?', jp: '{私|わたし}＿、{家族|かぞく}がいちばん{大切|たいせつ}です。', a: 'にとって', wrong: ['について', 'によって', 'にくらべて'],
        why: 'Kinek a szempontjából: 〜にとって.' },
      { q: '„A szülő szemében a gyerek mindig gyerek marad." Mi hiányzik?', jp: '{親|おや}＿、{子|こ}どもはいつまでも{子|こ}どもです。', a: 'から{見|み}ると', wrong: ['について', 'のかわりに', 'だけあって'],
        why: 'Nézőpont: 〜から{見|み}ると.' },
      { q: '„Idén aztán tényleg el akarok menni Japánba." Mi hiányzik?', jp: '{今年|ことし}＿、{日本|にほん}へ{行|い}きたいです。', a: 'こそ', wrong: ['しか', 'ばかり', 'だけあって'],
        why: 'Erős kiemelés: 〜こそ.' },
      { q: 'Mit jelent: こちらこそ、よろしくお{願|ねが}いします。', a: 'Részemről a megtiszteltetés (én kérem ugyanezt).',
        wrong: ['Erre tessék, kérem.', 'Ezt kérem.', 'Ne haragudjon.'],
        why: 'こちらこそ: „éppen én", viszonzásként.' },
      { q: '„Egyetértek ezzel a véleménnyel." Mi hiányzik?', jp: '{私|わたし}はその{意見|いけん}＿{賛成|さんせい}です。', a: 'に', wrong: ['を', 'で', 'が'],
        why: 'Amivel egyetértesz: 〜に{賛成|さんせい}です.' },
      { q: 'Melyik jelenti: „ellenzem"?', a: '{反対|はんたい}です', wrong: ['{賛成|さんせい}です', '{大切|たいせつ}です', '{不思議|ふしぎ}です'],
        why: '{賛成|さんせい} = egyetértés · {反対|はんたい} = ellenzés.' },
      { q: '„Valóban praktikus, de vannak gondok is." Mi hiányzik?', jp: '＿{便利|べんり}ですが、{問題|もんだい}もあります。', a: 'たしかに', wrong: ['まるで', 'いくら', 'ぜんぜん'],
        why: 'Elismerés az ellenvetés előtt: たしかに〜が.' },
      { q: 'Melyik a legtapintatosabb ellenvetés?', a: 'それは{少|すこ}し{違|ちが}うのではないでしょうか。',
        wrong: ['それは{違|ちが}います。', 'それは{違|ちが}うよ。', 'それはだめです。'],
        why: 'A 〜のではないでしょうか kérdéssé szelídíti az állítást.' },
      { q: '„Éppen ezt a könyvet kerestem." Mi hiányzik?', jp: 'これ＿{私|わたし}が{探|さが}していた{本|ほん}です。', a: 'こそ', wrong: ['しか', 'でも', 'とか'],
        why: 'Kiemelés: これこそ.' },
      { q: 'Mit jelent: {皆|みな}さんはどう{思|おも}いますか。', a: 'Önök mit gondolnak?', wrong: ['Önök mit csinálnak?', 'Önök hogy vannak?', 'Önök mit szeretnének?'],
        why: 'どう{思|おも}いますか = mi a véleménye?' }
    ]
  },

  /* ── 43. lecke ────────────────────────────────────── */
  {
    id: 'l43', no: 43, book: 'Dekiru 2',
    title: 'Tanulási tanácsok',
    lead: 'Megismered a parancsoló és a tiltó alakot, megadod, mi a célod egy állapottal, és kifejezed, hogy igyekszel valamit megtenni.',
    cando: [
      'Megvitatsz egy témát másokkal.',
      'Érvelsz a véleményed mellett.',
      'Megérted a rövid parancsokat és tiltásokat.'
    ],
    points: [
      {
        title: 'Parancsoló alak', sub: 'menj! állj!',
        pattern: '1. csoport: u-hang → e-hang · 2. csoport: る → ろ',
        body: 'Nagyon erős felszólítás. Képzése: {行|い}く → {行|い}け, {飲|の}む → {飲|の}め, {食|た}べる → {食|た}べろ, する → しろ, {来|く}る → {来|こ}い. Táblákon, vészhelyzetben, sportban, szoros baráti beszédben és idézett utasításokban találkozol vele; udvarias helyzetben nem használható.',
        examples: [
          { jp: '{早|はや}く{行|い}け！', romaji: 'Hayaku ike!', hu: 'Menj már!' },
          { jp: '{止|と}まれ！', romaji: 'Tomare!', hu: 'Állj!' },
          { jp: 'もっと{勉強|べんきょう}しろ。', romaji: 'Motto benkyō shiro.', hu: 'Tanulj többet!' }
        ]
      },
      {
        title: '〜な (tiltás)', sub: 'ne…!',
        pattern: 'szótári alak + な',
        body: 'A parancsoló alak tiltó párja: ugyanolyan erős, ugyanott használatos.',
        examples: [
          { jp: 'ここに{入|はい}るな。', romaji: 'Koko ni hairu na.', hu: 'Ide belépni tilos!' },
          { jp: '{心配|しんぱい}するな。', romaji: 'Shinpai suru na.', hu: 'Ne aggódj!' },
          { jp: '{触|さわ}るな！', romaji: 'Sawaru na!', hu: 'Ne nyúlj hozzá!' }
        ]
      },
      {
        title: '〜のように・〜ような', sub: 'úgy, ahogy · olyan, mint',
        pattern: 'főnév + のように / のような · rövid alak + ように',
        body: 'Itt a よう példát, mintát ad: „a következőképpen", „ahogy mondta", „olyan, mint például".',
        examples: [
          { jp: '{次|つぎ}のように{書|か}いてください。', romaji: 'Tsugi no yō ni kaite kudasai.', hu: 'Kérem, a következőképpen írja.' },
          { jp: '{東京|とうきょう}のような{大|おお}きい{町|まち}に{住|す}みたいです。', romaji: 'Tōkyō no yō na ōkii machi ni sumitai desu.', hu: 'Olyan nagyvárosban szeretnék élni, mint Tokió.' },
          { jp: '{先生|せんせい}が{言|い}ったように、{毎日|まいにち}{練習|れんしゅう}しています。', romaji: 'Sensei ga itta yō ni, mainichi renshū shite imasu.', hu: 'Ahogy a tanár mondta, minden nap gyakorolok.' }
        ]
      },
      {
        title: '〜ように (cél)', sub: 'hogy…, nehogy…',
        pattern: 'ható alak / ない-alak / nem szándékos ige + ように',
        body: 'Célként egy <i>állapotot</i> adsz meg, amely nem közvetlenül a te akaratodon múlik: hogy lásd, hogy tudd, hogy ne felejtsd el. (Szándékos cselekvésnél ために áll.)',
        examples: [
          { jp: '{忘|わす}れないように、メモします。', romaji: 'Wasurenai yō ni, memo shimasu.', hu: 'Felírom, nehogy elfelejtsem.' },
          { jp: 'よく{見|み}えるように、{前|まえ}に{座|すわ}りました。', romaji: 'Yoku mieru yō ni, mae ni suwarimashita.', hu: 'Előre ültem, hogy jól lássak.' },
          { jp: '{日本語|にほんご}が{話|はな}せるように、{毎日|まいにち}{練習|れんしゅう}します。', romaji: 'Nihongo ga hanaseru yō ni, mainichi renshū shimasu.', hu: 'Minden nap gyakorolok, hogy tudjak japánul beszélni.' }
        ]
      },
      {
        title: '〜ようにします', sub: 'igyekszem, ügyelek rá',
        pattern: 'szótári alak / ない-alak + ようにします',
        body: 'Azt fejezi ki, hogy tudatosan törekszel valamire. <b>ようにしています</b>: rendszeresen ügyelsz rá.',
        examples: [
          { jp: '{毎日|まいにち}{野菜|やさい}を{食|た}べるようにしています。', romaji: 'Mainichi yasai o taberu yō ni shite imasu.', hu: 'Igyekszem minden nap zöldséget enni.' },
          { jp: '{遅|おく}れないようにします。', romaji: 'Okurenai yō ni shimasu.', hu: 'Ügyelni fogok rá, hogy ne késsek.' },
          { jp: 'できるだけ{日本語|にほんご}で{話|はな}すようにしてください。', romaji: 'Dekiru dake nihongo de hanasu yō ni shite kudasai.', hu: 'Igyekezzen minél többet japánul beszélni.' }
        ]
      },
      {
        title: '〜とおりに', sub: 'pontosan úgy, ahogy',
        pattern: 'szótári alak / た-alak + とおりに · főnév + のとおりに',
        body: 'Valamit egy minta, utasítás vagy elképzelés szerint, attól el nem térve teszel meg.',
        examples: [
          { jp: '{私|わたし}が{言|い}うとおりに、{書|か}いてください。', romaji: 'Watashi ga iu tōri ni, kaite kudasai.', hu: 'Írja pontosan úgy, ahogy mondom.' },
          { jp: '{説明書|せつめいしょ}のとおりに{作|つく}りました。', romaji: 'Setsumeisho no tōri ni tsukurimashita.', hu: 'A leírás szerint raktam össze.' },
          { jp: '{思|おも}ったとおりに、うまくいきました。', romaji: 'Omotta tōri ni, umaku ikimashita.', hu: 'Úgy sikerült, ahogy gondoltam.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {行|い}きます parancsoló alakja?', a: '{行|い}け', wrong: ['{行|い}こ', '{行|い}きろ', '{行|い}くな'],
        why: '1. csoport: く → け.' },
      { q: 'Mi a {食|た}べます parancsoló alakja?', a: '{食|た}べろ', wrong: ['{食|た}べれ', '{食|た}べえ', '{食|た}べな'],
        why: '2. csoport: る → ろ.' },
      { q: 'Mi a {来|き}ます parancsoló alakja?', a: 'こい', wrong: ['きろ', 'くろ', 'これ'],
        why: 'A {来|き}ます rendhagyó: こい.' },
      { q: 'Mit jelent: ここに{入|はい}るな。', a: 'Ide belépni tilos!', wrong: ['Gyere be ide!', 'Itt be lehet menni.', 'Ide lépj be!'],
        why: 'Szótári alak + な: tiltás.' },
      { q: '„Felírom, nehogy elfelejtsem." Mi hiányzik?', jp: '＿ように、メモします。', a: '{忘|わす}れない', wrong: ['{忘|わす}れる', '{忘|わす}れて', '{忘|わす}れた'],
        why: 'Nehogy: ない-alak + ように.' },
      { q: '„Előre ültem, hogy jól lássak." Mi hiányzik?', jp: 'よく{見|み}える＿、{前|まえ}に{座|すわ}りました。', a: 'ように', wrong: ['ために', 'とおりに', 'ような'],
        why: 'A {見|み}える nem szándékos ige: ように (nem ために).' },
      { q: '„Igyekszem minden nap zöldséget enni." Mi hiányzik?', jp: '{毎日|まいにち}{野菜|やさい}を{食|た}べる＿しています。', a: 'ように', wrong: ['とおりに', 'ような', 'ために'],
        why: 'Törekvés: 〜ようにしています.' },
      { q: '„A leírás szerint raktam össze." Mi hiányzik?', jp: '{説明書|せつめいしょ}＿{作|つく}りました。', a: 'のとおりに', wrong: ['のかわりに', 'について', 'にとって'],
        why: 'Főnév + のとおりに: pontosan aszerint.' },
      { q: '„Írja pontosan úgy, ahogy mondom." Mi hiányzik?', jp: '{私|わたし}が{言|い}う＿、{書|か}いてください。', a: 'とおりに', wrong: ['ために', 'かわりに', 'うちに'],
        why: 'Szótári alak + とおりに.' },
      { q: 'Hol találkozol leginkább a parancsoló alakkal?', a: 'Táblákon, vészhelyzetben, sportban, szoros baráti beszédben.',
        wrong: ['Tanárral vagy főnökkel beszélve.', 'Boltban, az eladó szájából.', 'Hivatalos levélben.'],
        why: 'A parancsoló alak nagyon erős; udvarias helyzetben nem használható.' }
    ]
  },

  /* ── 44. lecke ────────────────────────────────────── */
  {
    id: 'l44', no: 44, book: 'Dekiru 2',
    title: 'Beszédverseny',
    lead: 'Megmondod, mi a helyes és mi nem illik, kifejezed, hogy valamit valami nélkül teszel, és megtanulod egy beszéd vázát.',
    cando: [
      'Felépítesz egy rövid beszédet.',
      'Hatásosan adod elő a mondanivalódat.',
      'Megfogalmazod, mit tartasz helyesnek.'
    ],
    points: [
      {
        title: '〜べきです', sub: 'kell, úgy helyes',
        pattern: 'szótári alak + べきです',
        body: 'Azt mondja ki, mi a helyes, észszerű, erkölcsös teendő. Vélemény, nem szabály: mások tetteire, általános igazságokra használod. A する mellett すべき és するべき is helyes.',
        examples: [
          { jp: '{約束|やくそく}は{守|まも}るべきです。', romaji: 'Yakusoku wa mamoru beki desu.', hu: 'Az ígéretet be kell tartani.' },
          { jp: '{若|わか}いうちに、いろいろな{経験|けいけん}をするべきです。', romaji: 'Wakai uchi ni, iroiro na keiken o suru beki desu.', hu: 'Amíg fiatal az ember, sokféle tapasztalatot kell szereznie.' },
          { jp: '{困|こま}っている{人|ひと}を{助|たす}けるべきだと{思|おも}います。', romaji: 'Komatte iru hito o tasukeru beki da to omoimasu.', hu: 'Szerintem segíteni kell a bajban lévőknek.' }
        ]
      },
      {
        title: '〜べきではありません', sub: 'nem helyes, nem illik',
        pattern: 'szótári alak + べきではありません',
        body: 'A tagadás a べき után áll, nem az igén: {言|い}うべきではありません („nem illik mondani").',
        examples: [
          { jp: '{人|ひと}の{悪口|わるくち}を{言|い}うべきではありません。', romaji: 'Hito no waruguchi o iu beki de wa arimasen.', hu: 'Nem illik másokról rosszat mondani.' },
          { jp: 'そんなことで{怒|おこ}るべきではありません。', romaji: 'Sonna koto de okoru beki de wa arimasen.', hu: 'Ilyesmi miatt nem kell megharagudni.' },
          { jp: '{簡単|かんたん}にあきらめるべきではありません。', romaji: 'Kantan ni akirameru beki de wa arimasen.', hu: 'Nem szabad könnyen feladni.' }
        ],
        tip: '〜なければなりません: szabály vagy kényszer. 〜べきです: a beszélő véleménye arról, mi helyes.'
      },
      {
        title: '〜ずに', sub: 'anélkül, hogy…',
        pattern: 'ない-alak: ない → ずに · する → せずに',
        body: 'A 〜ないで írott, választékos párja: valami megtörténik úgy, hogy egy másik cselekvés elmarad.',
        examples: [
          { jp: '{朝|あさ}ごはんを{食|た}べずに、{学校|がっこう}へ{行|い}きました。', romaji: 'Asagohan o tabezu ni, gakkō e ikimashita.', hu: 'Reggeli nélkül mentem iskolába.' },
          { jp: '{何|なに}も{言|い}わずに、{帰|かえ}ってしまいました。', romaji: 'Nani mo iwazu ni, kaette shimaimashita.', hu: 'Egy szó nélkül hazament.' },
          { jp: '{辞書|じしょ}を{使|つか}わずに、{読|よ}んでみてください。', romaji: 'Jisho o tsukawazu ni, yonde mite kudasai.', hu: 'Próbálja meg szótár nélkül elolvasni.' }
        ]
      },
      {
        title: '〜ず、…', sub: 'nem…, és…',
        pattern: 'ない-alak: ない → ず、…',
        body: 'Írott szövegben a に nélküli <b>ず</b> a 〜なくて megfelelője: két tagmondatot köt össze, az első tagadó.',
        examples: [
          { jp: '{雨|あめ}が{降|ふ}らず、{水|みず}が{足|た}りません。', romaji: 'Ame ga furazu, mizu ga tarimasen.', hu: 'Nem esik az eső, kevés a víz.' },
          { jp: '{連絡|れんらく}もせず、すみませんでした。', romaji: 'Renraku mo sezu, sumimasen deshita.', hu: 'Elnézést, hogy nem is jelentkeztem.' },
          { jp: '{無理|むり}をせずに、{休|やす}んでください。', romaji: 'Muri o sezu ni, yasunde kudasai.', hu: 'Ne erőltesse meg magát, pihenjen.' }
        ]
      },
      {
        title: '〜をちゅうしんに', sub: '… köré, főleg',
        pattern: 'főnév + を{中心|ちゅうしん}に',
        body: 'Megnevezi azt, ami köré a többi rendeződik: térben, témában vagy egy csoportban.',
        examples: [
          { jp: '{駅|えき}を{中心|ちゅうしん}に、{店|みせ}がたくさんあります。', romaji: 'Eki o chūshin ni, mise ga takusan arimasu.', hu: 'Az állomás körül sok az üzlet.' },
          { jp: '{今日|きょう}は{文法|ぶんぽう}を{中心|ちゅうしん}に{勉強|べんきょう}します。', romaji: 'Kyō wa bunpō o chūshin ni benkyō shimasu.', hu: 'Ma főleg nyelvtant tanulunk.' },
          { jp: '{若|わか}い{人|ひと}を{中心|ちゅうしん}に、この{歌|うた}が{人気|にんき}です。', romaji: 'Wakai hito o chūshin ni, kono uta ga ninki desu.', hu: 'Főleg a fiatalok körében népszerű ez a dal.' }
        ]
      },
      {
        title: 'A beszéd váza', sub: 'bevezetés, kifejtés, zárás',
        pattern: 'これから〜について{話|はな}します · {次|つぎ}に、… · {以上|いじょう}です',
        body: 'Egy rövid beszéd három részből áll: megmondod, miről fogsz beszélni; sorban kifejted; és lezárod. A zárás állandó fordulata: <b>{以上|いじょう}です</b>.',
        examples: [
          { jp: 'これから、{私|わたし}の{町|まち}について{話|はな}します。', romaji: 'Kore kara, watashi no machi ni tsuite hanashimasu.', hu: 'Most a városomról fogok beszélni.' },
          { jp: '{次|つぎ}に、{理由|りゆう}を{二|ふた}つ{説明|せつめい}します。', romaji: 'Tsugi ni, riyū o futatsu setsumei shimasu.', hu: 'Ezután két okot fogok elmagyarázni.' },
          { jp: '{以上|いじょう}です。ご{清聴|せいちょう}ありがとうございました。', romaji: 'Ijō desu. Goseichō arigatō gozaimashita.', hu: 'Ennyit szerettem volna mondani. Köszönöm a figyelmet.' }
        ]
      }
    ],
    quiz: [
      { q: '„Az ígéretet be kell tartani." Mi hiányzik?', jp: '{約束|やくそく}は{守|まも}る＿です。', a: 'べき', wrong: ['まま', 'ばかり', 'ところ'],
        why: 'Ami helyes: szótári alak + べきです.' },
      { q: '„Nem illik másokról rosszat mondani." Mi hiányzik?', jp: '{人|ひと}の{悪口|わるくち}を{言|い}う＿。', a: 'べきではありません', wrong: ['べきません', 'べくないです', 'べきないです'],
        why: 'A tagadás: べきではありません.' },
      { q: '„Reggeli nélkül mentem iskolába." Mi hiányzik?', jp: '{朝|あさ}ごはんを＿、{学校|がっこう}へ{行|い}きました。', a: '{食|た}べずに', wrong: ['{食|た}べなくて', '{食|た}べないに', '{食|た}べずで'],
        why: 'Anélkül, hogy: ない → ずに.' },
      { q: 'Mi a します 〜ずに alakja?', a: 'せずに', wrong: ['しずに', 'さずに', 'すずに'],
        why: 'A する rendhagyó: せずに.' },
      { q: 'Mi a {言|い}います 〜ずに alakja?', a: '{言|い}わずに', wrong: ['{言|い}いずに', '{言|い}うずに', '{言|い}あずに'],
        why: 'A ない-alak tövéből: {言|い}わない → {言|い}わずに.' },
      { q: 'Mit jelent: {辞書|じしょ}を{使|つか}わずに、{読|よ}んでみてください。', a: 'Próbálja meg szótár nélkül elolvasni.',
        wrong: ['Használjon szótárt az olvasáshoz.', 'Olvasás után nézze meg a szótárt.', 'Szótár nélkül nem lehet elolvasni.'],
        why: '{使|つか}わずに = anélkül, hogy használná.' },
      { q: '„Az állomás körül sok az üzlet." Mi hiányzik?', jp: '{駅|えき}＿、{店|みせ}がたくさんあります。', a: 'を{中心|ちゅうしん}に', wrong: ['について', 'にとって', 'だけあって'],
        why: 'Ami köré rendeződik: 〜を{中心|ちゅうしん}に.' },
      { q: 'Melyik fejezi ki a beszélő véleményét arról, mi a helyes?', a: '{約束|やくそく}は{守|まも}るべきです。',
        wrong: ['{約束|やくそく}は{守|まも}ることになっています。', '{約束|やくそく}は{守|まも}るそうです。', '{約束|やくそく}は{守|まも}るようです。'],
        why: 'べきです: vélemény. ことになっています: szabály. そうです: hallomás.' },
      { q: '„Most a városomról fogok beszélni." Mi hiányzik?', jp: 'これから、{私|わたし}の{町|まち}＿{話|はな}します。', a: 'について', wrong: ['にとって', 'によって', 'として'],
        why: 'A téma: 〜について.' },
      { q: 'Mivel zárod le a beszédedet?', a: '{以上|いじょう}です。', wrong: ['まず、…', '{次|つぎ}に、…', 'これから、…'],
        why: '{以上|いじょう}です = ennyi volt, befejeztem.' }
    ]
  },

  /* ── 45. lecke ────────────────────────────────────── */
  {
    id: 'l45', no: 45, book: 'Dekiru 2',
    title: 'Félreértés',
    lead: 'Elmondod, hogy épp megpróbáltál valamit, megtanulod a műveltető alakot, és megmondod, mit érez vagy mit szeretne valaki más.',
    cando: [
      'Elmeséled, mi történt veled, és mit tapasztaltál.',
      'Megérted a kulturális különbségből fakadó félreértéseket.',
      'Elmondod, mit érez vagy mit szeretne valaki más.'
    ],
    points: [
      {
        title: '〜ようとします', sub: 'megpróbál · éppen készül',
        pattern: 'szándékos alak + とします',
        body: 'Azt fejezi ki, hogy valaki nekilát egy cselekvésnek, de az (még) nem valósult meg. Múlt időben gyakran megszakad vagy meghiúsul.',
        examples: [
          { jp: '{出|で}かけようとしたとき、{電話|でんわ}が{鳴|な}りました。', romaji: 'Dekakeyō to shita toki, denwa ga narimashita.', hu: 'Éppen indulni készültem, amikor megszólalt a telefon.' },
          { jp: '{窓|まど}を{開|あ}けようとしましたが、{開|あ}きませんでした。', romaji: 'Mado o akeyō to shimashita ga, akimasen deshita.', hu: 'Megpróbáltam kinyitni az ablakot, de nem nyílt.' },
          { jp: '{子|こ}どもが{一人|ひとり}で{靴|くつ}をはこうとしています。', romaji: 'Kodomo ga hitori de kutsu o hakō to shite imasu.', hu: 'A gyerek egyedül próbálja felvenni a cipőjét.' }
        ]
      },
      {
        title: 'A műveltető alak képzése', sub: '〜せます・〜させます',
        pattern: '1. csoport: a-hangú tő + せます · 2. csoport: る → させます',
        body: 'Az 1. csoportnál a ない-alak töve után <b>せます</b>: {書|か}く → {書|か}かせます, {読|よ}む → {読|よ}ませます, {買|か}う → {買|か}わせます. A 2. csoportnál る → <b>させます</b>: {食|た}べる → {食|た}べさせます. Rendhagyó: します → させます, {来|き}ます → {来|こ}させます.',
        examples: [
          { jp: '{先生|せんせい}は{学生|がくせい}に{作文|さくぶん}を{書|か}かせました。', romaji: 'Sensei wa gakusei ni sakubun o kakasemashita.', hu: 'A tanár fogalmazást íratott a diákokkal.' },
          { jp: '{母|はは}は{妹|いもうと}に{部屋|へや}を{掃除|そうじ}させます。', romaji: 'Haha wa imōto ni heya o sōji sasemasu.', hu: 'Anyám kitakaríttatja a húgommal a szobát.' },
          { jp: '{父|ちち}は{私|わたし}に{新聞|しんぶん}を{読|よ}ませました。', romaji: 'Chichi wa watashi ni shinbun o yomasemashita.', hu: 'Apám újságot olvastatott velem.' }
        ]
      },
      {
        title: 'Műveltető mondat tárggyal', sub: 'megcsináltat valakivel valamit',
        pattern: 'A は B に C を + műveltető ige',
        body: 'Ha az igének tárgya van (を), az a személy, akit cselekvésre késztetnek, <b>に</b>-t kap. A műveltetés lehet kényszerítés és engedés is; mindig felülről lefelé irányul, ezért tisztelt személyre nem használod.',
        examples: [
          { jp: '{部長|ぶちょう}は{田中|たなか}さんに{資料|しりょう}を{作|つく}らせました。', romaji: 'Buchō wa Tanaka-san ni shiryō o tsukurasemashita.', hu: 'Az osztályvezető Tanakával készíttette el az anyagot.' },
          { jp: '{子|こ}どもに{皿|さら}を{洗|あら}わせます。', romaji: 'Kodomo ni sara o arawasemasu.', hu: 'Elmosogattatom a gyerekkel a tányérokat.' },
          { jp: '{先生|せんせい}は{学生|がくせい}に{漢字|かんじ}を{覚|おぼ}えさせます。', romaji: 'Sensei wa gakusei ni kanji o oboesasemasu.', hu: 'A tanár megtanultatja a diákokkal a kanjikat.' }
        ]
      },
      {
        title: '〜がります', sub: 'látszik rajta, hogy…',
        pattern: 'érzést jelentő い-melléknév: い → がります',
        body: 'Az érzést jelentő melléknevek (ほしい, {怖|こわ}い, {寒|さむ}い, {恥|は}ずかしい) közvetlenül csak a beszélőre mondhatók. Másról úgy beszélsz, hogy a viselkedésén látszik: <b>〜がります</b> (1. csoportú ige), tartós állapotként 〜がっています.',
        examples: [
          { jp: '{妹|いもうと}は{犬|いぬ}を{怖|こわ}がります。', romaji: 'Imōto wa inu o kowagarimasu.', hu: 'A húgom fél a kutyáktól.' },
          { jp: '{子|こ}どもが{新|あたら}しいおもちゃをほしがっています。', romaji: 'Kodomo ga atarashii omocha o hoshigatte imasu.', hu: 'A gyerek új játékot szeretne.' },
          { jp: '{弟|おとうと}は{寒|さむ}がっています。', romaji: 'Otōto wa samugatte imasu.', hu: 'Az öcsém fázik, látszik rajta.' }
        ]
      },
      {
        title: '〜たがります', sub: '(ő) szeretne…',
        pattern: 'ige ます-tő + たがります',
        body: 'A 〜たい is csak a saját vágyra használható. Más ember vágyáról: <b>〜たがります</b>, illetve 〜たがっています.',
        examples: [
          { jp: '{子|こ}どもはすぐ{外|そと}で{遊|あそ}びたがります。', romaji: 'Kodomo wa sugu soto de asobitagarimasu.', hu: 'A gyerek mindjárt kint akar játszani.' },
          { jp: '{弟|おとうと}は{日本|にほん}へ{行|い}きたがっています。', romaji: 'Otōto wa Nihon e ikitagatte imasu.', hu: 'Az öcsém Japánba szeretne menni.' },
          { jp: '{妹|いもうと}は{薬|くすり}を{飲|の}みたがりません。', romaji: 'Imōto wa kusuri o nomitagarimasen.', hu: 'A húgom nem akarja bevenni a gyógyszert.' }
        ],
        tip: 'Tanárra, főnökre a 〜たがります udvariatlan. Ott inkább kérdezz: 〜たいとお{考|かんが}えですか.'
      }
    ],
    quiz: [
      { q: '„Éppen indulni készültem, amikor megszólalt a telefon." Mi hiányzik?', jp: '＿としたとき、{電話|でんわ}が{鳴|な}りました。', a: '{出|で}かけよう', wrong: ['{出|で}かける', '{出|で}かけて', '{出|で}かけろ'],
        why: 'Szándékos alak + とします: éppen készülök rá.' },
      { q: 'Mi a {書|か}きます műveltető alakja?', a: '{書|か}かせます', wrong: ['{書|か}かれます', '{書|か}けさせます', '{書|か}きさせます'],
        why: '1. csoport: か-tő + せます.' },
      { q: 'Mi a {食|た}べます műveltető alakja?', a: '{食|た}べさせます', wrong: ['{食|た}べられます', '{食|た}べせます', '{食|た}ばせます'],
        why: '2. csoport: る → させます.' },
      { q: 'Mi a します műveltető alakja?', a: 'させます', wrong: ['されます', 'しさせます', 'せます'],
        why: 'A します műveltető alakja させます.' },
      { q: '„A tanár fogalmazást íratott a diákokkal." Mi hiányzik?', jp: '{先生|せんせい}は{学生|がくせい}＿{作文|さくぶん}を{書|か}かせました。', a: 'に', wrong: ['を', 'が', 'で'],
        why: 'Ha az igének van tárgya (を), a cselekvésre késztetett személy に-t kap.' },
      { q: '„A húgom fél a kutyáktól." Mi hiányzik?', jp: '{妹|いもうと}は{犬|いぬ}を＿。', a: '{怖|こわ}がります', wrong: ['{怖|こわ}いです', '{怖|こわ}くなります', '{怖|こわ}そうです'],
        why: 'Más ember érzése: 〜がります, を-val.' },
      { q: '„Az öcsém Japánba szeretne menni." Mi hiányzik?', jp: '{弟|おとうと}は{日本|にほん}へ＿います。', a: '{行|い}きたがって', wrong: ['{行|い}きたくて', '{行|い}きたいで', '{行|い}こうがって'],
        why: 'Más ember vágya: 〜たがっています.' },
      { q: 'Hogyan mondod helyesen: „Az öcsém tortát szeretne."', a: '{弟|おとうと}はケーキをほしがっています。',
        wrong: ['{弟|おとうと}はケーキをほしいます。', '{弟|おとうと}はケーキがほしがりです。', '{弟|おとうと}はケーキにほしがっています。'],
        why: 'ほしい → ほしがっています, a kívánt dolog を-t kap.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けようとしましたが、{開|あ}きませんでした。', a: 'Megpróbáltam kinyitni az ablakot, de nem nyílt.',
        wrong: ['Kinyitottam az ablakot, de becsukódott.', 'Nem akartam kinyitni az ablakot.', 'Ki kellett volna nyitnom az ablakot.'],
        why: '〜ようとしました: megpróbáltam, de nem sikerült.' },
      { q: '„Az osztályvezető Tanakával készíttette el az anyagot." Mi hiányzik?', jp: '{部長|ぶちょう}は{田中|たなか}さんに{資料|しりょう}を＿。', a: '{作|つく}らせました', wrong: ['{作|つく}られました', '{作|つく}りました', '{作|つく}れました'],
        why: '{作|つく}る → {作|つく}らせます: mással csináltatja.' }
    ]
  },

  /* ── 46. lecke ────────────────────────────────────── */
  {
    id: 'l46', no: 46, book: 'Dekiru 2',
    title: 'Megbeszélés',
    lead: 'Megismered a szelíd utasítást, a műveltető alak további használatait, és megtanulsz nagyon udvariasan engedélyt kérni.',
    cando: [
      'Összefoglalod, mi okozott egy félreértést.',
      'Tisztelettel engedélyt kérsz.',
      'Beszélsz a kulturális félreértésekről.'
    ],
    points: [
      {
        title: '〜なさい', sub: 'utasítás felülről',
        pattern: 'ige ます-tő + なさい',
        body: 'Szülő, tanár, edző mondja annak, akiért felel: határozott, de nem durva. Feladatok utasításaiban is ez áll ({答|こた}えなさい).',
        examples: [
          { jp: '{早|はや}く{起|お}きなさい。', romaji: 'Hayaku okinasai.', hu: 'Kelj fel gyorsan!' },
          { jp: '{宿題|しゅくだい}をしなさい。', romaji: 'Shukudai o shinasai.', hu: 'Csináld meg a leckét!' },
          { jp: 'よく{聞|き}きなさい。', romaji: 'Yoku kikinasai.', hu: 'Figyelj jól!' }
        ]
      },
      {
        title: 'Műveltető mondat tárgy nélkül', sub: 'elküld, hagy',
        pattern: 'A は B を + tárgyatlan ige műveltető alakja',
        body: 'Ha az igének nincs tárgya ({行|い}く, {立|た}つ, {遊|あそ}ぶ), a cselekvésre késztetett személy <b>を</b>-t kap. A jelentés itt is lehet „kényszerít" vagy „hagy".',
        examples: [
          { jp: '{先生|せんせい}は{学生|がくせい}を{立|た}たせました。', romaji: 'Sensei wa gakusei o tatasemashita.', hu: 'A tanár felállította a diákot.' },
          { jp: '{母|はは}は{弟|おとうと}を{買|か}い{物|もの}に{行|い}かせました。', romaji: 'Haha wa otōto o kaimono ni ikasemashita.', hu: 'Anyám elküldte az öcsémet vásárolni.' },
          { jp: '{子|こ}どもを{公園|こうえん}で{遊|あそ}ばせます。', romaji: 'Kodomo o kōen de asobasemasu.', hu: 'Hagyom a gyereket a parkban játszani.' }
        ]
      },
      {
        title: 'Érzést kiváltó műveltető', sub: 'megnevettet, megharagít',
        pattern: 'A は B を + {笑|わら}わせます / {心配|しんぱい}させます / {怒|おこ}らせます',
        body: 'Érzelmet, önkéntelen reakciót jelentő igékkel a műveltető azt jelenti: valaki kiváltja a másikból. Az érintett személy <b>を</b>-t kap.',
        examples: [
          { jp: '{冗談|じょうだん}を{言|い}って、みんなを{笑|わら}わせました。', romaji: 'Jōdan o itte, minna o warawasemashita.', hu: 'Viccelődtem, és megnevettettem mindenkit.' },
          { jp: '{両親|りょうしん}を{心配|しんぱい}させたくないです。', romaji: 'Ryōshin o shinpai sasetakunai desu.', hu: 'Nem szeretném, hogy a szüleim aggódjanak.' },
          { jp: '{友|とも}だちを{怒|おこ}らせてしまいました。', romaji: 'Tomodachi o okorasete shimaimashita.', hu: 'Megharagítottam a barátomat.' }
        ]
      },
      {
        title: '〜させてください', sub: 'hadd…',
        pattern: 'műveltető ige て-alak + ください',
        body: 'Engedélyt kérsz a saját cselekvésedhez: „engedje meg, hogy megtegyem".',
        examples: [
          { jp: '{私|わたし}に{払|はら}わせてください。', romaji: 'Watashi ni harawasete kudasai.', hu: 'Hadd fizessek én!' },
          { jp: '{少|すこ}し{考|かんが}えさせてください。', romaji: 'Sukoshi kangaesasete kudasai.', hu: 'Hadd gondolkodjam egy kicsit.' },
          { jp: '{今日|きょう}は{早|はや}く{帰|かえ}らせてください。', romaji: 'Kyō wa hayaku kaerasete kudasai.', hu: 'Engedje meg, hogy ma korábban hazamenjek.' }
        ]
      },
      {
        title: '〜させていただけませんか', sub: 'megengedné, hogy…?',
        pattern: 'műveltető ige て-alak + いただけませんか / いただきます',
        body: 'A legudvariasabb engedélykérés. Kijelentő alakja (<b>〜させていただきます</b>) hivatalos bejelentés: „engedelmükkel megteszem".',
        examples: [
          { jp: 'この{部屋|へや}を{使|つか}わせていただけませんか。', romaji: 'Kono heya o tsukawasete itadakemasen ka.', hu: 'Megengedné, hogy használjam ezt a termet?' },
          { jp: '{写真|しゃしん}を{撮|と}らせていただけませんか。', romaji: 'Shashin o torasete itadakemasen ka.', hu: 'Megengedné, hogy lefényképezzem?' },
          { jp: 'それでは、{始|はじ}めさせていただきます。', romaji: 'Sore de wa, hajimesasete itadakimasu.', hu: 'Akkor, ha megengedik, elkezdem.' }
        ]
      },
      {
        title: '〜させてくれます', sub: 'megengedi nekem',
        pattern: 'A が ({私|わたし}に / を) + műveltető ige て-alak + くれます',
        body: 'Valaki megengedi, lehetővé teszi, hogy megtegyek valamit, és ezért hálás vagyok.',
        examples: [
          { jp: '{父|ちち}は{私|わたし}を{留学|りゅうがく}させてくれました。', romaji: 'Chichi wa watashi o ryūgaku sasete kuremashita.', hu: 'Apám megengedte, hogy külföldön tanuljak.' },
          { jp: '{先生|せんせい}が{早|はや}く{帰|かえ}らせてくれました。', romaji: 'Sensei ga hayaku kaerasete kuremashita.', hu: 'A tanár megengedte, hogy korábban hazamenjek.' },
          { jp: '{友|とも}だちが{新|あたら}しいゲームを{使|つか}わせてくれました。', romaji: 'Tomodachi ga atarashii gēmu o tsukawasete kuremashita.', hu: 'A barátom megengedte, hogy kipróbáljam az új játékát.' }
        ]
      }
    ],
    quiz: [
      { q: '„Kelj fel gyorsan!" (szülő a gyereknek) Mi hiányzik?', jp: '{早|はや}く{起|お}き＿。', a: 'なさい', wrong: ['ください', 'なら', 'ながら'],
        why: 'Utasítás felülről: ます-tő + なさい.' },
      { q: '„Megnevettettem mindenkit." Mi hiányzik?', jp: 'みんな＿{笑|わら}わせました。', a: 'を', wrong: ['に', 'が', 'で'],
        why: 'Érzést kiváltó műveltetőnél az érintett を-t kap.' },
      { q: '„Hadd fizessek én!" Mi hiányzik?', jp: '{私|わたし}に{払|はら}わ＿ください。', a: 'せて', wrong: ['れて', 'して', 'させられて'],
        why: '{払|はら}う → {払|はら}わせる → {払|はら}わせてください.' },
      { q: '„Hadd gondolkodjam egy kicsit." Mi hiányzik?', jp: '{少|すこ}し＿ください。', a: '{考|かんが}えさせて', wrong: ['{考|かんが}えて', '{考|かんが}えられて', '{考|かんが}えせて'],
        why: 'A {考|かんが}える 2. csoportú: {考|かんが}えさせて.' },
      { q: 'Melyik a legudvariasabb engedélykérés?', a: '{使|つか}わせていただけませんか。', wrong: ['{使|つか}ってもいい？', '{使|つか}わせて。', '{使|つか}いたいです。'],
        why: '〜させていただけませんか: a legtiszteletteljesebb forma.' },
      { q: 'Mit jelent: {父|ちち}は{私|わたし}を{留学|りゅうがく}させてくれました。', a: 'Apám megengedte, hogy külföldön tanuljak.',
        wrong: ['Apám külföldön tanult helyettem.', 'Apám megtiltotta, hogy külföldön tanuljak.', 'Apámat külföldre küldtem tanulni.'],
        why: '〜させてくれました: megengedte nekem, és hálás vagyok érte.' },
      { q: 'Mit jelent: それでは、{始|はじ}めさせていただきます。', a: 'Akkor, ha megengedik, elkezdem.',
        wrong: ['Akkor kérem, kezdjék el.', 'Akkor el kellett kezdenem.', 'Akkor megengedem, hogy elkezdjék.'],
        why: '〜させていただきます: udvarias bejelentés a saját cselekvésemről.' },
      { q: '„Anyám elküldte az öcsémet vásárolni." Mi hiányzik?', jp: '{母|はは}は{弟|おとうと}を{買|か}い{物|もの}に＿。', a: '{行|い}かせました', wrong: ['{行|い}かれました', '{行|い}けました', '{行|い}きさせました'],
        why: '{行|い}く → {行|い}かせます.' },
      { q: 'Ki mondja leginkább: {宿題|しゅくだい}をしなさい。', a: 'Szülő a gyerekének.', wrong: ['Diák a tanárának.', 'Eladó a vásárlónak.', 'Beosztott a főnökének.'],
        why: 'A なさい felülről lefelé irányuló utasítás.' },
      { q: '„Megharagítottam a barátomat." Mi hiányzik?', jp: '{友|とも}だちを＿しまいました。', a: '{怒|おこ}らせて', wrong: ['{怒|おこ}られて', '{怒|おこ}って', '{怒|おこ}れて'],
        why: '{怒|おこ}る → {怒|おこ}らせる: kiváltottam belőle.' }
    ]
  },

  /* ── 47. lecke ────────────────────────────────────── */
  {
    id: 'l47', no: 47, book: 'Dekiru 2',
    title: 'Nyelvtanulás',
    lead: 'Megtanulod a műveltető-szenvedő alakot, amellyel azt mondod el, mit kellett megtenned akaratod ellenére, és beszélsz arról, miért tanulsz nyelvet.',
    cando: [
      'Beszélsz a nyelvtudásodról és a nyelvtanulási tapasztalataidról.',
      'Beszélsz arról, miért fontos a nyelvtanulás.',
      'Elmondod, mit kellett megtenned akaratod ellenére.'
    ],
    points: [
      {
        title: 'Műveltető-szenvedő alak', sub: '〜させられます',
        pattern: 'műveltető alak: せる → せられます · させる → させられます',
        body: 'A műveltető alakból képzed a szenvedőt: {食|た}べさせる → {食|た}べさせ<b>られます</b>, {書|か}かせる → {書|か}かせ<b>られます</b>, する → させられます. Jelentése: „velem csináltatják", vagyis kénytelen vagyok megtenni.',
        examples: [
          { jp: '{子|こ}どものとき、{毎日|まいにち}{野菜|やさい}を{食|た}べさせられました。', romaji: 'Kodomo no toki, mainichi yasai o tabesaseraremashita.', hu: 'Gyerekkoromban minden nap megetették velem a zöldséget.' },
          { jp: '{先生|せんせい}に{作文|さくぶん}を{書|か}かせられました。', romaji: 'Sensei ni sakubun o kakaseraremashita.', hu: 'A tanár fogalmazást íratott velem.' },
          { jp: '{日曜日|にちようび}も{働|はたら}かせられました。', romaji: 'Nichiyōbi mo hatarakaseraremashita.', hu: 'Vasárnap is dolgoztattak.' }
        ]
      },
      {
        title: 'Rövid alak', sub: '〜されます',
        pattern: '1. csoport: 〜せられます → 〜されます',
        body: 'Az 1. csoportú igéknél a beszélt nyelvben a rövidebb alak a gyakoribb: {待|ま}たせられます → {待|ま}た<b>されます</b>, {行|い}かせられます → {行|い}か<b>されます</b>. Kivétel a す-re végződő igék ({話|はな}す → {話|はな}させられます) és a 2. csoport.',
        examples: [
          { jp: '{駅|えき}で{一時間|いちじかん}も{待|ま}たされました。', romaji: 'Eki de ichijikan mo matasaremashita.', hu: 'Egy egész órát várakoztattak az állomáson.' },
          { jp: '{母|はは}に{買|か}い{物|もの}に{行|い}かされました。', romaji: 'Haha ni kaimono ni ikasaremashita.', hu: 'Anyám elküldött vásárolni, pedig nem akartam.' },
          { jp: '{先輩|せんぱい}にお{酒|さけ}を{飲|の}まされました。', romaji: 'Senpai ni osake o nomasaremashita.', hu: 'Az idősebb kolléga megitatott, pedig nem akartam inni.' }
        ]
      },
      {
        title: 'A mondat szerkezete', sub: 'ki kivel mit csináltat',
        pattern: 'A は B に (C を) + műveltető-szenvedő ige',
        body: 'Az alany az, aki kénytelen megtenni; aki rákényszeríti, <b>に</b>-t kap. A mondat mindig az alany rosszallását, kelletlenségét fejezi ki.',
        examples: [
          { jp: '{私|わたし}は{母|はは}に{部屋|へや}を{掃除|そうじ}させられました。', romaji: 'Watashi wa haha ni heya o sōji saseraremashita.', hu: 'Anyám kitakaríttatta velem a szobát.' },
          { jp: '{学生|がくせい}は{先生|せんせい}に{漢字|かんじ}を{百回|ひゃっかい}{書|か}かされました。', romaji: 'Gakusei wa sensei ni kanji o hyakkai kakasaremashita.', hu: 'A tanár százszor leíratta a diákkal a kanjit.' },
          { jp: '{妹|いもうと}は{毎日|まいにち}ピアノを{練習|れんしゅう}させられています。', romaji: 'Imōto wa mainichi piano o renshū saserarete imasu.', hu: 'A húgomat minden nap zongorázni kényszerítik.' }
        ],
        tip: 'Három alak egymás mellett: {読|よ}みます (olvasok) · {読|よ}ませます (olvastatok valakivel) · {読|よ}まされます (velem olvastatnak).'
      },
      {
        title: 'Önkéntelen hatás', sub: 'elgondolkodtat, meglep',
        pattern: 'A に + {考|かんが}えさせられます / {驚|おどろ}かされます',
        body: 'Érzést, gondolatot jelentő igékkel nincs benne kényszer: azt jelenti, hogy valami akaratlanul is hatott rád.',
        examples: [
          { jp: 'この{本|ほん}にはいろいろ{考|かんが}えさせられました。', romaji: 'Kono hon ni wa iroiro kangaesaseraremashita.', hu: 'Ez a könyv sok mindenen elgondolkodtatott.' },
          { jp: '{彼|かれ}の{日本語|にほんご}には{驚|おどろ}かされました。', romaji: 'Kare no nihongo ni wa odorokasaremashita.', hu: 'Lenyűgözött a japántudása.' },
          { jp: 'その{話|はなし}に{感動|かんどう}させられました。', romaji: 'Sono hanashi ni kandō saseraremashita.', hu: 'Meghatott az a történet.' }
        ]
      },
      {
        title: 'A tanulásról beszélni', sub: 'miért és hogyan',
        pattern: '〜のは、…からです',
        body: 'Az okot a mondat végére téve hangsúlyozod: „az, hogy…, azért van, mert…". A の főnevesíti az első tagmondatot.',
        examples: [
          { jp: '{日本語|にほんご}を{勉強|べんきょう}しているのは、{日本|にほん}で{働|はたら}きたいからです。', romaji: 'Nihongo o benkyō shite iru no wa, Nihon de hatarakitai kara desu.', hu: 'Azért tanulok japánul, mert Japánban szeretnék dolgozni.' },
          { jp: '{外国語|がいこくご}を{学|まな}ぶと、{考|かんが}え{方|かた}が{広|ひろ}がります。', romaji: 'Gaikokugo o manabu to, kangaekata ga hirogarimasu.', hu: 'Ha idegen nyelvet tanul az ember, szélesedik a látóköre.' },
          { jp: '{間違|まちが}えてもいいから、たくさん{話|はな}すことが{大切|たいせつ}です。', romaji: 'Machigaete mo ii kara, takusan hanasu koto ga taisetsu desu.', hu: 'Nem baj, ha hibázol: az a fontos, hogy sokat beszélj.' }
        ]
      }
    ],
    quiz: [
      { q: 'Mi a {食|た}べます műveltető-szenvedő alakja?', a: '{食|た}べさせられます', wrong: ['{食|た}べられさせます', '{食|た}べさせます', '{食|た}べらせます'],
        why: '{食|た}べさせる + られます.' },
      { q: 'Mi a {待|ま}ちます rövid műveltető-szenvedő alakja?', a: '{待|ま}たされます', wrong: ['{待|ま}たせます', '{待|ま}たれます', '{待|ま}ちされます'],
        why: '{待|ま}たせられます → {待|ま}たされます.' },
      { q: 'Mi a します műveltető-szenvedő alakja?', a: 'させられます', wrong: ['されます', 'させます', 'しられます'],
        why: 'させる + られます = させられます.' },
      { q: '„Egy egész órát várakoztattak az állomáson." Mi hiányzik?', jp: '{駅|えき}で{一時間|いちじかん}も＿。', a: '{待|ま}たされました', wrong: ['{待|ま}たせました', '{待|ま}ちました', '{待|ま}てました'],
        why: 'Velem történt, akaratom ellenére: {待|ま}たされました.' },
      { q: '„Anyám kitakaríttatta velem a szobát." Mi hiányzik?', jp: '{私|わたし}は{母|はは}＿{部屋|へや}を{掃除|そうじ}させられました。', a: 'に', wrong: ['を', 'が', 'で'],
        why: 'Aki rákényszerít, に-t kap.' },
      { q: 'Ki takarított? {私|わたし}は{母|はは}に{部屋|へや}を{掃除|そうじ}させられました。', a: 'Én, mert anyám rám parancsolt.',
        wrong: ['Anyám, mert megkértem rá.', 'Anyám, mert ő akarta.', 'Senki, a szoba koszos maradt.'],
        why: 'Az alany ({私|わたし}) végzi a cselekvést, kelletlenül.' },
      { q: 'Mit jelent: {先輩|せんぱい}にお{酒|さけ}を{飲|の}まされました。', a: 'Az idősebb kolléga megitatott, pedig nem akartam inni.',
        wrong: ['Megitattam az idősebb kollégát.', 'Az idősebb kolléga megitta az italomat.', 'Az idősebb kollégával együtt ittunk.'],
        why: '{飲|の}まされました: velem itatták.' },
      { q: 'Melyik sorrend helyes: „olvasok · olvastatok valakivel · velem olvastatnak"?', a: '{読|よ}みます · {読|よ}ませます · {読|よ}まされます',
        wrong: ['{読|よ}みます · {読|よ}まれます · {読|よ}ませます', '{読|よ}みます · {読|よ}まされます · {読|よ}ませます', '{読|よ}みます · {読|よ}めます · {読|よ}まれます'],
        why: 'Alap · műveltető (せます) · műveltető-szenvedő (されます).' },
      { q: 'Mit jelent: この{本|ほん}にはいろいろ{考|かんが}えさせられました。', a: 'Ez a könyv sok mindenen elgondolkodtatott.',
        wrong: ['Ezt a könyvet kötelező volt elolvasnom.', 'Sokat gondolkodtam, megírjam-e ezt a könyvet.', 'Ezen a könyvön nem kell gondolkodni.'],
        why: 'Gondolatot jelentő igével: akaratlanul is hatott rám.' },
      { q: '„Azért tanulok japánul, mert Japánban szeretnék dolgozni." Mi hiányzik?', jp: '{日本語|にほんご}を{勉強|べんきょう}しているのは、{日本|にほん}で{働|はたら}きたい＿です。', a: 'から', wrong: ['ので', 'ために', 'のに'],
        why: '〜のは、…からです: az ok a mondat végén.' }
    ]
  },

  /* ── 48. lecke ────────────────────────────────────── */
  {
    id: 'l48', no: 48, book: 'Dekiru 2',
    title: 'Köszönet és búcsú',
    lead: 'Megnevezed, mi indított el valamit és mi okozott bajt, kifejezed, hogy „minél inkább, annál inkább", és megtanulod a köszönet és a búcsú fordulatait.',
    cando: [
      'Emlékezetes búcsúbeszédet mondasz.',
      'Köszönőlevelet írsz azoknak, akiknek sokat köszönhetsz.',
      'Visszatekintesz arra, mi minden változott.'
    ],
    points: [
      {
        title: '〜をきっかけに', sub: '… hatására, … óta',
        pattern: 'főnév + をきっかけに',
        body: 'Megnevezi azt az eseményt, amely elindított egy változást vagy egy új tevékenységet.',
        examples: [
          { jp: '{旅行|りょこう}をきっかけに、{日本語|にほんご}の{勉強|べんきょう}を{始|はじ}めました。', romaji: 'Ryokō o kikkake ni, nihongo no benkyō o hajimemashita.', hu: 'Egy utazás hatására kezdtem japánul tanulni.' },
          { jp: '{病気|びょうき}をきっかけに、たばこをやめました。', romaji: 'Byōki o kikkake ni, tabako o yamemashita.', hu: 'A betegségem hatására leszoktam a dohányzásról.' },
          { jp: 'アニメを{見|み}たことをきっかけに、{日本|にほん}の{文化|ぶんか}が{好|す}きになりました。', romaji: 'Anime o mita koto o kikkake ni, Nihon no bunka ga suki ni narimashita.', hu: 'Egy anime hatására szerettem meg a japán kultúrát.' }
        ]
      },
      {
        title: '〜せいで', sub: 'miatt (rossz eredmény)',
        pattern: 'főnév + のせいで · rövid alak + せいで',
        body: 'Rossz eredmény okát nevezi meg, hibáztató éllel. Párja a jó eredmény okát jelölő 〜おかげで.',
        examples: [
          { jp: '{雨|あめ}のせいで、{試合|しあい}が{中止|ちゅうし}になりました。', romaji: 'Ame no sei de, shiai ga chūshi ni narimashita.', hu: 'Az eső miatt elmaradt a meccs.' },
          { jp: '{寝坊|ねぼう}したせいで、{電車|でんしゃ}に{乗|の}り{遅|おく}れました。', romaji: 'Nebō shita sei de, densha ni noriokuremashita.', hu: 'Mivel elaludtam, lekéstem a vonatot.' },
          { jp: '{私|わたし}のせいで、みんなに{迷惑|めいわく}をかけました。', romaji: 'Watashi no sei de, minna ni meiwaku o kakemashita.', hu: 'Miattam került mindenki kellemetlen helyzetbe.' }
        ],
        tip: 'おかげで: jó eredmény, hála. せいで: rossz eredmény, hibáztatás. ために: semleges, tárgyilagos.'
      },
      {
        title: '〜ば〜ほど', sub: 'minél…, annál…',
        pattern: 'ば-alak + ugyanaz a szó szótári alakban + ほど',
        body: 'Ugyanaz a szó kétszer szerepel: előbb ば-alakban, aztán szótári alakban, majd <b>ほど</b>. い-melléknévvel: {早|はや}ければ{早|はや}いほど.',
        examples: [
          { jp: '{日本語|にほんご}は{勉強|べんきょう}すればするほど、{面白|おもしろ}くなります。', romaji: 'Nihongo wa benkyō sureba suru hodo, omoshiroku narimasu.', hu: 'Minél többet tanulja az ember a japánt, annál érdekesebb.' },
          { jp: '{早|はや}ければ{早|はや}いほどいいです。', romaji: 'Hayakereba hayai hodo ii desu.', hu: 'Minél hamarabb, annál jobb.' },
          { jp: '{考|かんが}えれば{考|かんが}えるほど、わからなくなります。', romaji: 'Kangaereba kangaeru hodo, wakaranaku narimasu.', hu: 'Minél többet gondolkodom rajta, annál kevésbé értem.' }
        ]
      },
      {
        title: '〜として', sub: '-ként',
        pattern: 'főnév + として',
        body: 'Azt adja meg, milyen szerepben, minőségben történik valami.',
        examples: [
          { jp: '{留学生|りゅうがくせい}として{日本|にほん}へ{来|き}ました。', romaji: 'Ryūgakusei to shite Nihon e kimashita.', hu: 'Cserediákként jöttem Japánba.' },
          { jp: '{友|とも}だちとして、アドバイスします。', romaji: 'Tomodachi to shite, adobaisu shimasu.', hu: 'Barátként adok tanácsot.' },
          { jp: '{京都|きょうと}は{古|ふる}い{町|まち}として{有名|ゆうめい}です。', romaji: 'Kyōto wa furui machi to shite yūmei desu.', hu: 'Kiotó régi városként híres.' }
        ]
      },
      {
        title: 'Köszönet és búcsú', sub: 'a legfontosabb fordulatok',
        pattern: 'お{世話|せわ}になりました · 〜てくださって、ありがとうございました',
        body: 'Búcsúzáskor a japán nem a saját érzéseiről beszél, hanem megköszöni a másik törődését. Az <b>お{世話|せわ}になりました</b> szó szerint: „a gondoskodásában részesültem".',
        examples: [
          { jp: 'いろいろお{世話|せわ}になりました。', romaji: 'Iroiro osewa ni narimashita.', hu: 'Köszönök mindent, amit értem tettek.' },
          { jp: '{親切|しんせつ}に{教|おし}えてくださって、ありがとうございました。', romaji: 'Shinsetsu ni oshiete kudasatte, arigatō gozaimashita.', hu: 'Köszönöm, hogy olyan kedvesen tanított.' },
          { jp: 'どうぞお{元気|げんき}で。また{会|あ}いましょう。', romaji: 'Dōzo ogenki de. Mata aimashō.', hu: 'Minden jót! Találkozzunk újra.' }
        ]
      }
    ],
    quiz: [
      { q: '„Egy utazás hatására kezdtem japánul tanulni." Mi hiányzik?', jp: '{旅行|りょこう}＿、{日本語|にほんご}の{勉強|べんきょう}を{始|はじ}めました。', a: 'をきっかけに', wrong: ['のせいで', 'として', 'について'],
        why: 'Ami elindította: 〜をきっかけに.' },
      { q: '„Az eső miatt elmaradt a meccs." Mi hiányzik?', jp: '{雨|あめ}＿、{試合|しあい}が{中止|ちゅうし}になりました。', a: 'のせいで', wrong: ['のおかげで', 'をきっかけに', 'として'],
        why: 'Rossz eredmény oka: 〜のせいで.' },
      { q: 'Melyik mondat fejez ki hálát?', a: '{先生|せんせい}のおかげで{合格|ごうかく}しました。',
        wrong: ['{先生|せんせい}のせいで{合格|ごうかく}しました。', '{先生|せんせい}として{合格|ごうかく}しました。', '{先生|せんせい}をきっかけに{合格|ごうかく}しました。'],
        why: 'おかげで: jó eredmény, köszönet.' },
      { q: '„Minél hamarabb, annál jobb." Mi hiányzik?', jp: '{早|はや}ければ＿ほどいいです。', a: '{早|はや}い', wrong: ['{早|はや}く', '{早|はや}ければ', '{早|はや}さ'],
        why: 'ば-alak + szótári alak + ほど.' },
      { q: '„Minél többet tanulja az ember, annál érdekesebb." Mi hiányzik?', jp: '{勉強|べんきょう}＿するほど、{面白|おもしろ}くなります。', a: 'すれば', wrong: ['したら', 'すると', 'しても'],
        why: 'A する ば-alakja: すれば.' },
      { q: '„Cserediákként jöttem Japánba." Mi hiányzik?', jp: '{留学生|りゅうがくせい}＿{日本|にほん}へ{来|き}ました。', a: 'として', wrong: ['にとって', 'について', 'のせいで'],
        why: 'Szerep, minőség: 〜として.' },
      { q: 'Mit jelent: {考|かんが}えれば{考|かんが}えるほど、わからなくなります。', a: 'Minél többet gondolkodom rajta, annál kevésbé értem.',
        wrong: ['Ha gondolkodom rajta, megértem.', 'Nem gondolkodom rajta, mert nem értem.', 'Akárhogy gondolkodom, értem.'],
        why: '〜ば〜ほど: minél…, annál….' },
      { q: 'Mit jelent: いろいろお{世話|せわ}になりました。', a: 'Köszönök mindent, amit értem tettek.',
        wrong: ['Sok mindenben segítettem.', 'Elnézést a sok gondért, amit okoztak.', 'Sok dolgom volt.'],
        why: 'お{世話|せわ}になりました: a másik törődését köszönöd meg.' },
      { q: '„Mivel elaludtam, lekéstem a vonatot." Mi hiányzik?', jp: '{寝坊|ねぼう}した＿、{電車|でんしゃ}に{乗|の}り{遅|おく}れました。', a: 'せいで', wrong: ['おかげで', 'として', 'ほど'],
        why: 'Rossz eredmény oka ige után: 〜せいで.' },
      { q: '„Köszönöm, hogy olyan kedvesen tanított." Mi hiányzik?', jp: '{親切|しんせつ}に{教|おし}えて＿、ありがとうございました。', a: 'くださって', wrong: ['あげて', 'さしあげて', 'おいて'],
        why: 'Amit a tisztelt személy értem tett: 〜てくださって.' }
    ]
  },

  /* ════════════════ KIEGÉSZÍTŐ LECKÉK (JLPT N5) ════════════════
     Ami a Dekiru-kötetekből kimaradt, de az N5 szint része. */

  /* ── K1 ───────────────────────────────────────────── */
  {
    id: 'k1', no: 49, book: 'Kiegészítő',
    badge: 'K1', kicker: 'Kiegészítő · JLPT N5', label: 'Kiegészítő lecke',
    title: 'Kötőszavak',
    lead: 'Mondatokat kapcsolsz össze: de, azonban, és, aztán, ezért, mégis. Megtanulod, melyik illik beszédbe és melyik írásba.',
    cando: [
      'Ellentétet fejezel ki kötetlen és hivatalos stílusban.',
      'Sorba rendezed a mondataidat: és, aztán, ezért.',
      'Megkülönbözteted a mondaton belüli és a mondat eleji kötőszót.'
    ],
    points: [
      {
        title: '〜けど・〜けれども', sub: 'de, bár (mondaton belül)',
        pattern: 'tagmondat + けど / けれども、…',
        body: 'A mondat <i>belsejében</i> kapcsol össze két ellentétes részt, ahogy a már ismert が. A <b>けど</b> kötetlen, a <b>けれども</b> udvariasabb. Kérés előtt puhító bevezetés is: すみませんけど…',
        examples: [
          { jp: '{高|たか}いけど、{買|か}います。', romaji: 'Takai kedo, kaimasu.', hu: 'Drága, de megveszem.' },
          { jp: '{日本語|にほんご}は{難|むずか}しいですけれども、{面白|おもしろ}いです。', romaji: 'Nihongo wa muzukashii desu keredomo, omoshiroi desu.', hu: 'A japán nehéz, de érdekes.' },
          { jp: 'すみませんけど、{今|いま}{何時|なんじ}ですか。', romaji: 'Sumimasen kedo, ima nanji desu ka.', hu: 'Elnézést, hány óra van?' }
        ]
      },
      {
        title: 'でも', sub: 'de (mondat elején)',
        pattern: 'mondat。でも、mondat。',
        body: 'Új mondatot kezd, és az előzőre utal vissza. Beszélt nyelvi, kötetlen.',
        examples: [
          { jp: '{行|い}きたいです。でも、{時間|じかん}がありません。', romaji: 'Ikitai desu. Demo, jikan ga arimasen.', hu: 'Szeretnék menni. De nincs időm.' },
          { jp: '{昨日|きのう}は{雨|あめ}でした。でも、{出|で}かけました。', romaji: 'Kinō wa ame deshita. Demo, dekakemashita.', hu: 'Tegnap esett. Mégis elmentem itthonról.' },
          { jp: 'おいしいです。でも、ちょっと{高|たか}いです。', romaji: 'Oishii desu. Demo, chotto takai desu.', hu: 'Finom. De egy kicsit drága.' }
        ]
      },
      {
        title: 'しかし', sub: 'azonban (írásban)',
        pattern: 'mondat。しかし、mondat。',
        body: 'Ugyanazt jelenti, mint a でも, de írott és hivatalos stílusú: újságban, előadásban, dolgozatban ezt használják.',
        examples: [
          { jp: '{薬|くすり}を{飲|の}みました。しかし、まだ{熱|ねつ}があります。', romaji: 'Kusuri o nomimashita. Shikashi, mada netsu ga arimasu.', hu: 'Bevettem a gyógyszert. Azonban még mindig lázas vagyok.' },
          { jp: '{試験|しけん}は{難|むずか}しかったです。しかし、{合格|ごうかく}しました。', romaji: 'Shiken wa muzukashikatta desu. Shikashi, gōkaku shimashita.', hu: 'A vizsga nehéz volt. Mégis átmentem.' },
          { jp: '{便利|べんり}です。しかし、{値段|ねだん}が{高|たか}いです。', romaji: 'Benri desu. Shikashi, nedan ga takai desu.', hu: 'Praktikus. Az ára azonban magas.' }
        ]
      },
      {
        title: 'そして・それから', sub: 'és · aztán',
        pattern: 'mondat。そして / それから、mondat。',
        body: 'A <b>そして</b> hozzátesz valamit („és, továbbá"). A <b>それから</b> időbeli sorrendet ad („aztán"), vagy még egy tételt sorol.',
        examples: [
          { jp: 'この{部屋|へや}は{広|ひろ}いです。そして、{明|あか}るいです。', romaji: 'Kono heya wa hiroi desu. Soshite, akarui desu.', hu: 'Ez a szoba tágas. És világos is.' },
          { jp: '{朝|あさ}ごはんを{食|た}べました。それから、{学校|がっこう}へ{行|い}きました。', romaji: 'Asagohan o tabemashita. Sore kara, gakkō e ikimashita.', hu: 'Megreggeliztem. Aztán iskolába mentem.' },
          { jp: '{本|ほん}を{買|か}いました。それから、ノートも{買|か}いました。', romaji: 'Hon o kaimashita. Sore kara, nōto mo kaimashita.', hu: 'Vettem egy könyvet. Aztán még egy füzetet is.' }
        ]
      },
      {
        title: 'だから・それで', sub: 'ezért',
        pattern: 'ok。だから / それで、következmény。',
        body: 'A <b>だから</b> határozott következtetés; udvarias alakja <b>ですから</b>. A <b>それで</b> semlegesebb: egyszerűen elmondja, mi lett a következmény.',
        examples: [
          { jp: '{雨|あめ}が{降|ふ}っています。だから、{傘|かさ}を{持|も}っていきます。', romaji: 'Ame ga futte imasu. Dakara, kasa o motte ikimasu.', hu: 'Esik az eső. Ezért viszek esernyőt.' },
          { jp: '{昨日|きのう}は{寝|ね}ませんでした。それで、{今日|きょう}はとても{眠|ねむ}いです。', romaji: 'Kinō wa nemasen deshita. Sore de, kyō wa totemo nemui desu.', hu: 'Tegnap nem aludtam. Ezért ma nagyon álmos vagyok.' },
          { jp: '{明日|あした}は{試験|しけん}です。ですから、{今晩|こんばん}は{勉強|べんきょう}します。', romaji: 'Ashita wa shiken desu. Desukara, konban wa benkyō shimasu.', hu: 'Holnap vizsga van. Ezért ma este tanulok.' }
        ]
      },
      {
        title: 'それでも', sub: 'mégis, ennek ellenére',
        pattern: 'mondat。それでも、mondat。',
        body: 'Erősebb, mint a でも: azt hangsúlyozza, hogy a körülmények ellenére is úgy van.',
        examples: [
          { jp: '{何度|なんど}も{説明|せつめい}しました。それでも、わかってくれません。', romaji: 'Nando mo setsumei shimashita. Sore demo, wakatte kuremasen.', hu: 'Sokszor elmagyaráztam. Mégsem érti meg.' },
          { jp: '{疲|つか}れています。それでも、{走|はし}ります。', romaji: 'Tsukarete imasu. Sore demo, hashirimasu.', hu: 'Fáradt vagyok. Mégis futok.' },
          { jp: '{高|たか}いです。それでも、ほしいです。', romaji: 'Takai desu. Sore demo, hoshii desu.', hu: 'Drága. Mégis szeretném.' }
        ]
      }
    ],
    quiz: [
      { q: '„Drága, de megveszem." Mi hiányzik?', jp: '{高|たか}い＿、{買|か}います。', a: 'けど', wrong: ['から', 'ので', 'だから'],
        why: 'Mondaton belüli ellentét: けど.' },
      { q: 'Melyik kötőszó illik írott, hivatalos szövegbe („azonban")?', a: 'しかし', wrong: ['でも', 'けど', 'それから'],
        why: 'A しかし írott, hivatalos; a でも és a けど beszélt nyelvi.' },
      { q: '„Megreggeliztem. Aztán iskolába mentem." Mi hiányzik?', jp: '{朝|あさ}ごはんを{食|た}べました。＿、{学校|がっこう}へ{行|い}きました。', a: 'それから', wrong: ['しかし', 'でも', 'それでも'],
        why: 'Időbeli sorrend: それから.' },
      { q: '„Esik az eső. Ezért viszek esernyőt." Mi hiányzik?', jp: '{雨|あめ}が{降|ふ}っています。＿、{傘|かさ}を{持|も}っていきます。', a: 'だから', wrong: ['しかし', 'それでも', 'けれども'],
        why: 'Következmény: だから.' },
      { q: '„Fáradt vagyok. Mégis futok." Mi hiányzik?', jp: '{疲|つか}れています。＿、{走|はし}ります。', a: 'それでも', wrong: ['だから', 'それで', 'そして'],
        why: 'A körülmények ellenére: それでも.' },
      { q: 'Mit jelent: {便利|べんり}です。しかし、{値段|ねだん}が{高|たか}いです。', a: 'Praktikus. Az ára azonban magas.',
        wrong: ['Praktikus, ezért drága.', 'Praktikus és olcsó.', 'Nem praktikus, de olcsó.'],
        why: 'しかし = azonban.' },
      { q: 'Hol áll a でも?', a: 'Új mondat elején, az előzőre visszautalva.', wrong: ['A mondat végén.', 'Mindig az ige után.', 'Csak kérdésben.'],
        why: 'A でも mondatkezdő; mondaton belül けど vagy が áll.' },
      { q: '„Ez a szoba tágas. És világos is." Mi hiányzik?', jp: 'この{部屋|へや}は{広|ひろ}いです。＿、{明|あか}るいです。', a: 'そして', wrong: ['しかし', 'それでも', 'でも'],
        why: 'Hozzátoldás: そして.' },
      { q: 'Melyik a けど udvariasabb párja?', a: 'けれども', wrong: ['でも', 'だから', 'それから'],
        why: 'けど → けれども: ugyanaz, udvariasabban.' },
      { q: '„Tegnap nem aludtam. Ezért ma nagyon álmos vagyok." Mi hiányzik?', jp: '{昨日|きのう}は{寝|ね}ませんでした。＿、{今日|きょう}はとても{眠|ねむ}いです。', a: 'それで', wrong: ['それでも', 'しかし', 'けど'],
        why: 'Semleges következmény: それで.' }
    ]
  },

  /* ── K2 ───────────────────────────────────────────── */
  {
    id: 'k2', no: 50, book: 'Kiegészítő',
    badge: 'K2', kicker: 'Kiegészítő · JLPT N5', label: 'Kiegészítő lecke',
    title: 'A mondat vége',
    lead: 'A mondat végi kis szócskák adják meg a hangulatot: egyetértést vársz, újat közölsz, töprengsz vagy felkiáltasz.',
    cando: [
      'Megkülönbözteted a ね és a よ használatát.',
      'Kifejezed, hogy töprengsz vagy rácsodálkozol valamire.',
      'Megérted a baráti kérdő és felkiáltó fordulatokat.'
    ],
    points: [
      {
        title: '〜ね', sub: 'ugye, nemde',
        pattern: 'mondat + ね',
        body: 'Olyasmiről beszélsz, amit a másik is tud vagy lát, és egyetértést, megerősítést vársz. Együttérzést is kifejez.',
        examples: [
          { jp: 'いい{天気|てんき}ですね。', romaji: 'Ii tenki desu ne.', hu: 'Szép időnk van, ugye?' },
          { jp: 'この{料理|りょうり}、おいしいですね。', romaji: 'Kono ryōri, oishii desu ne.', hu: 'Finom ez az étel, nem?' },
          { jp: '{大変|たいへん}ですね。', romaji: 'Taihen desu ne.', hu: 'Ez nehéz lehet.' }
        ]
      },
      {
        title: '〜よ', sub: 'tudd meg, figyelj',
        pattern: 'mondat + よ',
        body: 'Olyat mondasz, amit a másik (szerinted) nem tud: új információ, figyelmeztetés, biztatás. Túl sokszor használva kioktatóan hat.',
        examples: [
          { jp: 'この{本|ほん}、{面白|おもしろ}いですよ。', romaji: 'Kono hon, omoshiroi desu yo.', hu: 'Ez a könyv érdekes ám!' },
          { jp: '{電車|でんしゃ}が{来|き}ましたよ。', romaji: 'Densha ga kimashita yo.', hu: 'Megjött a vonat!' },
          { jp: 'そこは{危|あぶ}ないですよ。', romaji: 'Soko wa abunai desu yo.', hu: 'Ott veszélyes, vigyázz!' }
        ],
        tip: 'A kettő együtt: よね. Ezzel megerősítést kérsz valamire, amit te is úgy tudsz: あしたですよね („Holnap, ugye?").'
      },
      {
        title: '〜なあ', sub: 'de…! (magadnak mondva)',
        pattern: 'rövid alak + なあ',
        body: 'Felkiáltás, sóhaj: a saját érzésedet mondod ki, nem a másiknak szól. Vágyat is kifejez.',
        examples: [
          { jp: 'いいなあ。', romaji: 'Ii nā.', hu: 'De jó neked!' },
          { jp: '{寒|さむ}いなあ。', romaji: 'Samui nā.', hu: 'De hideg van!' },
          { jp: '{日本|にほん}へ{行|い}きたいなあ。', romaji: 'Nihon e ikitai nā.', hu: 'Bárcsak elmehetnék Japánba!' }
        ]
      },
      {
        title: '〜かな・〜かしら', sub: 'vajon…',
        pattern: 'rövid alak + かな / かしら',
        body: 'Töprengés: magadtól kérdezed. A <b>かな</b> általános; a <b>かしら</b> nőies és ritkuló.',
        examples: [
          { jp: 'あしたは{晴|は}れるかな。', romaji: 'Ashita wa hareru kana.', hu: 'Vajon holnap szép idő lesz?' },
          { jp: '{彼|かれ}は{来|く}るかな。', romaji: 'Kare wa kuru kana.', hu: 'Vajon eljön?' },
          { jp: 'これでいいかしら。', romaji: 'Kore de ii kashira.', hu: 'Vajon így jó lesz?' }
        ]
      },
      {
        title: '〜かい・〜だい', sub: 'baráti kérdés',
        pattern: 'rövid alak + かい (igen–nem) · kérdőszó + だい',
        body: 'Meleg, kissé férfias kérdőforma: idősebb mondja fiatalabbnak, barát barátnak. Eldöntendő kérdésben <b>かい</b>, kérdőszóval <b>だい</b>.',
        examples: [
          { jp: '{元気|げんき}かい。', romaji: 'Genki kai.', hu: 'Jól vagy?' },
          { jp: 'もう{食|た}べたかい。', romaji: 'Mō tabeta kai.', hu: 'Ettél már?' },
          { jp: 'どうしたんだい。', romaji: 'Dō shita n dai.', hu: 'Mi történt veled?' }
        ]
      },
      {
        title: '〜じゃないか', sub: 'hiszen…!',
        pattern: 'rövid alak + じゃないか · udvariasan: じゃないですか',
        body: 'Nem valódi kérdés: emlékeztetsz, szemrehányást teszel vagy rácsodálkozol. Udvarias alakja じゃないですか, illetve ではありませんか.',
        examples: [
          { jp: 'いいじゃないか。', romaji: 'Ii ja nai ka.', hu: 'Hát nem jó? Jó az!' },
          { jp: '{約束|やくそく}したじゃないか。', romaji: 'Yakusoku shita ja nai ka.', hu: 'Hiszen megígérted!' },
          { jp: 'もう{十二時|じゅうにじ}じゃないですか。', romaji: 'Mō jūniji ja nai desu ka.', hu: 'Hiszen már tizenkét óra van!' }
        ]
      }
    ],
    quiz: [
      { q: '„Szép időnk van, ugye?" Mi hiányzik?', jp: 'いい{天気|てんき}です＿。', a: 'ね', wrong: ['よ', 'かい', 'なあ'],
        why: 'Egyetértést vársz: ね.' },
      { q: '„Megjött a vonat!" (a másik nem vette észre) Mi hiányzik?', jp: '{電車|でんしゃ}が{来|き}ました＿。', a: 'よ', wrong: ['ね', 'かな', 'かい'],
        why: 'Új információ a másiknak: よ.' },
      { q: 'Mit fejez ki: {寒|さむ}いなあ。', a: 'Felkiáltást, amit magadnak mondasz: de hideg van!',
        wrong: ['Kérdést: hideg van?', 'Figyelmeztetést a másiknak.', 'Tiltást.'],
        why: 'A なあ a saját érzés kimondása.' },
      { q: '„Vajon holnap szép idő lesz?" Mi hiányzik?', jp: 'あしたは{晴|は}れる＿。', a: 'かな', wrong: ['よ', 'ね', 'じゃないか'],
        why: 'Töprengés: かな.' },
      { q: 'Ki mondja leginkább: {元気|げんき}かい。', a: 'Idősebb férfi fiatalabbnak, barátságosan.',
        wrong: ['Diák a tanárának.', 'Eladó a vásárlónak.', 'Hivatalos levélben írják.'],
        why: 'A かい meleg, de bizalmas kérdőforma.' },
      { q: 'Mit jelent: {約束|やくそく}したじゃないか。', a: 'Hiszen megígérted!', wrong: ['Nem ígérted meg?', 'Ne ígérd meg!', 'Megígéred?'],
        why: 'A じゃないか emlékeztet, szemrehányást tesz.' },
      { q: 'Mikor használsz よ-t?', a: 'Amikor olyat mondasz, amit a másik szerinted nem tud.',
        wrong: ['Amikor egyetértést vársz.', 'Amikor magadban töprengsz.', 'Amikor kérdezel.'],
        why: 'よ: új információ, figyelmeztetés.' },
      { q: 'Mikor használsz ね-t?', a: 'Amikor egyetértést, megerősítést vársz.',
        wrong: ['Amikor új információt közölsz.', 'Amikor parancsolsz.', 'Amikor tiltasz.'],
        why: 'ね: közös tudás, egyetértés.' },
      { q: '„Bárcsak elmehetnék Japánba!" Mi hiányzik?', jp: '{日本|にほん}へ{行|い}きたい＿。', a: 'なあ', wrong: ['かい', 'だい', 'じゃないか'],
        why: 'Vágy, sóhaj: なあ.' },
      { q: 'Melyik a かな nőies, ritkább párja?', a: 'かしら', wrong: ['かい', 'だい', 'なあ'],
        why: 'かしら: ugyanaz a töprengés, nőies stílusban.' }
    ]
  },

  /* ── K3 ───────────────────────────────────────────── */
  {
    id: 'k3', no: 51, book: 'Kiegészítő',
    badge: 'K3', kicker: 'Kiegészítő · JLPT N5', label: 'Kiegészítő lecke',
    title: 'Beszélt nyelvi rövidítések',
    lead: 'A hétköznapi beszédben a hosszú alakok összehúzódnak. Megismered a „kell" változatait és a leggyakoribb rövidítéseket, hogy megértsd, amit a filmekben és a barátaidtól hallasz.',
    cando: [
      'Felismered a „kell" és a „tilos" rövid, beszélt alakjait.',
      'Megérted a 〜ちゃう, 〜てる, 〜って alakokat.',
      'Tudod, mikor illik rövid alakot használni és mikor nem.'
    ],
    points: [
      {
        title: '〜なくてはいけません', sub: 'kell (változatok)',
        pattern: 'ない-alak: ない → なくては / なければ + いけません / なりません',
        body: 'A „kell" négyféleképpen állhat össze: <b>なければ</b> vagy <b>なくては</b>, utána <b>なりません</b> vagy <b>いけません</b>. A jelentés ugyanaz; a なりません inkább általános szabály, az いけません személyesebb.',
        examples: [
          { jp: 'もう{帰|かえ}らなくてはいけません。', romaji: 'Mō kaeranakute wa ikemasen.', hu: 'Most már haza kell mennem.' },
          { jp: '{明日|あした}までに{出|だ}さなくてはなりません。', romaji: 'Ashita made ni dasanakute wa narimasen.', hu: 'Holnapig le kell adnom.' },
          { jp: '{毎日|まいにち}{練習|れんしゅう}しなければいけません。', romaji: 'Mainichi renshū shinakereba ikemasen.', hu: 'Minden nap gyakorolnom kell.' }
        ]
      },
      {
        title: '〜なくちゃ・〜なきゃ', sub: 'kell (beszélt)',
        pattern: 'なくては → なくちゃ · なければ → なきゃ',
        body: 'Beszédben a なくては <b>なくちゃ</b>-ra, a なければ <b>なきゃ</b>-ra rövidül, és a mondat vége (いけない) gyakran el is marad.',
        examples: [
          { jp: 'もう{行|い}かなくちゃ。', romaji: 'Mō ikanakucha.', hu: 'Mennem kell.' },
          { jp: '{早|はや}く{起|お}きなきゃ。', romaji: 'Hayaku okinakya.', hu: 'Korán kell kelnem.' },
          { jp: '{宿題|しゅくだい}をしなくちゃいけない。', romaji: 'Shukudai o shinakucha ikenai.', hu: 'Meg kell csinálnom a leckét.' }
        ]
      },
      {
        title: '〜ちゃいけない・〜じゃいけない', sub: 'tilos (beszélt)',
        pattern: 'ては → ちゃ · では → じゃ',
        body: 'A 〜てはいけません beszélt alakja. Ha a て-alak で-re végződik ({読|よ}んで, {遊|あそ}んで), a rövidítés <b>じゃ</b>.',
        examples: [
          { jp: 'それを{食|た}べちゃいけません。', romaji: 'Sore o tabecha ikemasen.', hu: 'Azt nem szabad megenni.' },
          { jp: 'ここで{遊|あそ}んじゃいけないよ。', romaji: 'Koko de asonja ikenai yo.', hu: 'Itt nem szabad játszani!' },
          { jp: '{人|ひと}の{日記|にっき}を{読|よ}んじゃだめだよ。', romaji: 'Hito no nikki o yonja dame da yo.', hu: 'Más naplóját nem szabad elolvasni.' }
        ]
      },
      {
        title: '〜ちゃう・〜じゃう', sub: 'a 〜てしまう röviden',
        pattern: 'てしまう → ちゃう · でしまう → じゃう',
        body: 'A 〜てしまいます (megtörtént, és bánom) a beszédben szinte mindig így hangzik. Múlt időben: ちゃった, じゃった.',
        examples: [
          { jp: '{全部|ぜんぶ}{食|た}べちゃった。', romaji: 'Zenbu tabechatta.', hu: 'Megettem az egészet.' },
          { jp: '{財布|さいふ}を{忘|わす}れちゃった。', romaji: 'Saifu o wasurechatta.', hu: 'Otthon felejtettem a pénztárcám.' },
          { jp: '{遅|おく}れちゃう！', romaji: 'Okurechau!', hu: 'El fogok késni!' },
          { jp: 'ジュースを{飲|の}んじゃった。', romaji: 'Jūsu o nonjatta.', hu: 'Megittam a gyümölcslevet.' }
        ]
      },
      {
        title: '〜てる・〜てた', sub: 'a 〜ている röviden',
        pattern: 'ている → てる · ていた → てた',
        body: 'A 〜ています い-je a beszédben eltűnik: {読|よ}んでいる → {読|よ}んでる, {知|し}っている → {知|し}ってる.',
        examples: [
          { jp: '{何|なに}してるの？', romaji: 'Nani shiteru no?', hu: 'Mit csinálsz?' },
          { jp: '{今|いま}、{本|ほん}を{読|よ}んでる。', romaji: 'Ima, hon o yonderu.', hu: 'Most éppen olvasok.' },
          { jp: '{知|し}ってる？', romaji: 'Shitteru?', hu: 'Tudtad?' }
        ]
      },
      {
        title: '〜って', sub: 'azt mondta · az a…',
        pattern: 'と / という / は → って',
        body: 'A <b>って</b> három dolgot helyettesít: az idéző と-t („azt mondta, hogy"), a という-t („nevű, az, hogy") és témajelölőként a は-t.',
        examples: [
          { jp: '{田中|たなか}さんは{来|こ}ないって。', romaji: 'Tanaka-san wa konai tte.', hu: 'Tanaka azt mondta, nem jön.' },
          { jp: '「すし」って{何|なん}ですか。', romaji: '"Sushi" tte nan desu ka.', hu: 'Mi az, hogy szusi?' },
          { jp: 'あした{雨|あめ}だって{聞|き}いたよ。', romaji: 'Ashita ame da tte kiita yo.', hu: 'Azt hallottam, holnap esni fog.' }
        ]
      }
    ],
    quiz: [
      { q: '„Most már haza kell mennem." Mi hiányzik?', jp: 'もう{帰|かえ}ら＿いけません。', a: 'なくては', wrong: ['なくても', 'ないで', 'なくて'],
        why: 'Kell: なくては + いけません.' },
      { q: 'Minek a rövid alakja: {行|い}かなくちゃ', a: '{行|い}かなくては(いけない)',
        wrong: ['{行|い}かなくてもいい', '{行|い}かないでください', '{行|い}ってはいけない'],
        why: 'なくては → なくちゃ.' },
      { q: 'Mit jelent: {早|はや}く{起|お}きなきゃ。', a: 'Korán kell kelnem.', wrong: ['Nem kell korán kelnem.', 'Nem szabad korán kelnem.', 'Korán keltem.'],
        why: 'なきゃ = なければ(ならない): kell.' },
      { q: 'Minek a rövid alakja: {食|た}べちゃいけません', a: '{食|た}べてはいけません',
        wrong: ['{食|た}べてしまいます', '{食|た}べなくてはいけません', '{食|た}べてもいいです'],
        why: 'ては → ちゃ.' },
      { q: 'Minek a rövid alakja: {食|た}べちゃった', a: '{食|た}べてしまった', wrong: ['{食|た}べてはいけない', '{食|た}べていた', '{食|た}べなくちゃ'],
        why: 'てしまった → ちゃった.' },
      { q: 'Mi a {飲|の}んでしまった beszélt alakja?', a: '{飲|の}んじゃった', wrong: ['{飲|の}んちゃった', '{飲|の}みちゃった', '{飲|の}んでた'],
        why: 'でしまった → じゃった.' },
      { q: 'Minek a rövid alakja: {読|よ}んでる', a: '{読|よ}んでいる', wrong: ['{読|よ}んでくる', '{読|よ}んである', '{読|よ}んでおく'],
        why: 'ている → てる.' },
      { q: 'Mit jelent: {田中|たなか}さんは{来|こ}ないって。', a: 'Tanaka azt mondta, nem jön.', wrong: ['Tanaka nem jöhet.', 'Tanaka ne jöjjön!', 'Tanaka vajon jön?'],
        why: 'A mondat végi って = と{言|い}っていました.' },
      { q: 'Hol használod ezeket a rövid alakokat?', a: 'Barátok, család között, kötetlen beszédben.',
        wrong: ['Hivatalos levélben.', 'Tanárral, főnökkel beszélve.', 'Vizsgadolgozatban.'],
        why: 'A rövidítések bizalmas stílusúak; udvarias helyzetben a teljes alak kell.' },
      { q: '„Itt nem szabad játszani!" (baráti) Mi hiányzik?', jp: 'ここで＿いけないよ。', a: '{遊|あそ}んじゃ', wrong: ['{遊|あそ}んちゃ', '{遊|あそ}びちゃ', '{遊|あそ}んで'],
        why: '{遊|あそ}んでは → {遊|あそ}んじゃ.' }
    ]
  },

  /* ── K4 ───────────────────────────────────────────── */
  {
    id: 'k4', no: 52, book: 'Kiegészítő',
    badge: 'K4', kicker: 'Kiegészítő · JLPT N5', label: 'Kiegészítő lecke',
    title: 'Hogyan? Milyen jól? Milyen gyakran?',
    lead: 'Megmondod, mit hagysz el vagy mit teszel helyette, rákérdezel a módra, elmondod, mi megy jól és mi nem, és pontosabban fejezed ki a gyakoriságot.',
    cando: [
      'Megkérdezed, hogyan kell valamit csinálni.',
      'Elmondod, miben vagy ügyes és miben nem.',
      'Megmondod, milyen gyakran csinálsz valamit.'
    ],
    points: [
      {
        title: '〜ないで', sub: 'anélkül, hogy · nem …, hanem',
        pattern: 'ない-alak + で、…',
        body: 'Két jelentése van: valamit úgy teszel, hogy egy másik cselekvés elmarad („anélkül"), vagy az egyik helyett a másikat teszed („nem ezt, hanem azt").',
        examples: [
          { jp: '{朝|あさ}ごはんを{食|た}べないで、{出|で}かけました。', romaji: 'Asagohan o tabenaide, dekakemashita.', hu: 'Reggeli nélkül mentem el.' },
          { jp: '{傘|かさ}を{持|も}たないで、{出|で}かけました。', romaji: 'Kasa o motanaide, dekakemashita.', hu: 'Esernyő nélkül indultam el.' },
          { jp: 'バスに{乗|の}らないで、{歩|ある}いて{行|い}きます。', romaji: 'Basu ni noranaide, aruite ikimasu.', hu: 'Nem busszal megyek, hanem gyalog.' }
        ]
      },
      {
        title: 'どうやって', sub: 'hogyan, milyen módon',
        pattern: 'どうやって + ige か',
        body: 'A módra, az eljárásra kérdez. Ne keverd a <b>どうして</b> kérdőszóval, amely az okot kérdezi („miért").',
        examples: [
          { jp: '{駅|えき}までどうやって{行|い}きますか。', romaji: 'Eki made dō yatte ikimasu ka.', hu: 'Hogyan jutok el az állomásra?' },
          { jp: 'この{料理|りょうり}はどうやって{作|つく}りますか。', romaji: 'Kono ryōri wa dō yatte tsukurimasu ka.', hu: 'Hogyan készül ez az étel?' },
          { jp: 'どうやって{日本語|にほんご}を{勉強|べんきょう}しましたか。', romaji: 'Dō yatte nihongo o benkyō shimashita ka.', hu: 'Hogyan tanultál japánul?' }
        ]
      },
      {
        title: '〜のがじょうずです・〜のがへたです', sub: 'jól megy · rosszul megy',
        pattern: 'szótári alak + のが + {上手|じょうず} / {下手|へた} です',
        body: 'A の főnévvé teszi az igét, így állhat a {上手|じょうず} (ügyes) és a {下手|へた} (ügyetlen) mellett, ahogy a {好|す}き mellett is.',
        examples: [
          { jp: '{姉|あね}は{料理|りょうり}を{作|つく}るのが{上手|じょうず}です。', romaji: 'Ane wa ryōri o tsukuru no ga jōzu desu.', hu: 'A nővérem ügyesen főz.' },
          { jp: '{私|わたし}は{歌|うた}を{歌|うた}うのが{下手|へた}です。', romaji: 'Watashi wa uta o utau no ga heta desu.', hu: 'Rosszul énekelek.' },
          { jp: '{弟|おとうと}は{絵|え}をかくのが{上手|じょうず}です。', romaji: 'Otōto wa e o kaku no ga jōzu desu.', hu: 'Az öcsém jól rajzol.' }
        ],
        tip: 'Magadról a {上手|じょうず} dicsekvésnek hat. Ha megdicsérnek, a szokásos válasz: いいえ、まだまだです.'
      },
      {
        title: 'いつも・たいてい・たまに', sub: 'milyen gyakran',
        pattern: 'いつも > たいてい > よく > ときどき > たまに > あまり > ぜんぜん',
        body: 'A gyakoriság teljes skálája. Az <b>いつも</b> (mindig), a <b>たいてい</b> (többnyire) és a <b>たまに</b> (néha-néha) állító igével áll; az あまり és a ぜんぜん tagadóval.',
        examples: [
          { jp: '{朝|あさ}はいつもコーヒーを{飲|の}みます。', romaji: 'Asa wa itsumo kōhī o nomimasu.', hu: 'Reggel mindig kávét iszom.' },
          { jp: '{週末|しゅうまつ}はたいてい{家|うち}にいます。', romaji: 'Shūmatsu wa taitei uchi ni imasu.', hu: 'Hétvégén többnyire otthon vagyok.' },
          { jp: 'たまに{映画|えいが}を{見|み}に{行|い}きます。', romaji: 'Tama ni eiga o mi ni ikimasu.', hu: 'Néha-néha elmegyek moziba.' }
        ]
      },
      {
        title: '〜はどうですか', sub: 'mit szólnál hozzá? · milyen?',
        pattern: 'főnév + はどうですか',
        body: 'Javaslatot teszel vagy véleményt kérsz. Baráti alakja <b>〜はどう？</b>, még udvariasabb az <b>〜はいかがですか</b>.',
        examples: [
          { jp: 'コーヒーはどうですか。', romaji: 'Kōhī wa dō desu ka.', hu: 'Kér egy kávét?' },
          { jp: '{来週|らいしゅう}の{土曜日|どようび}はどうですか。', romaji: 'Raishū no doyōbi wa dō desu ka.', hu: 'A jövő szombat megfelel?' },
          { jp: '{日本|にほん}の{生活|せいかつ}はどうですか。', romaji: 'Nihon no seikatsu wa dō desu ka.', hu: 'Milyen az élet Japánban?' }
        ]
      }
    ],
    quiz: [
      { q: '„Reggeli nélkül mentem el." Mi hiányzik?', jp: '{朝|あさ}ごはんを＿、{出|で}かけました。', a: '{食|た}べないで', wrong: ['{食|た}べなくて', '{食|た}べないと', '{食|た}べなければ'],
        why: 'Anélkül, hogy: ない-alak + で.' },
      { q: '„Hogyan jutok el az állomásra?" Mi hiányzik?', jp: '{駅|えき}まで＿{行|い}きますか。', a: 'どうやって', wrong: ['どうして', 'どんな', 'どのくらい'],
        why: 'A módra kérdez: どうやって.' },
      { q: 'Mit kérdez a どうして?', a: 'Az okot: miért?', wrong: ['A módot: hogyan?', 'A helyet: hol?', 'Az időt: mikor?'],
        why: 'どうして = miért · どうやって = hogyan.' },
      { q: '„A nővérem ügyesen főz." Mi hiányzik?', jp: '{姉|あね}は{料理|りょうり}を{作|つく}る＿が{上手|じょうず}です。', a: 'の', wrong: ['を', 'に', 'と'],
        why: 'A の főnevesíti az igét a が{上手|じょうず}です előtt.' },
      { q: '„Rosszul énekelek." Mi hiányzik?', jp: '{私|わたし}は{歌|うた}を{歌|うた}うのが＿です。', a: '{下手|へた}', wrong: ['{上手|じょうず}', '{好|す}き', '{便利|べんり}'],
        why: '{下手|へた} = ügyetlen, rosszul megy.' },
      { q: '„Hétvégén többnyire otthon vagyok." Mi hiányzik?', jp: '{週末|しゅうまつ}は＿{家|うち}にいます。', a: 'たいてい', wrong: ['ぜんぜん', 'あまり', 'たまに'],
        why: 'たいてい = többnyire.' },
      { q: 'Melyik jelenti: „néha-néha, ritkán"?', a: 'たまに', wrong: ['いつも', 'たいてい', 'よく'],
        why: 'たまに: ritkábban, mint a ときどき.' },
      { q: '„A jövő szombat megfelel?" Mi hiányzik?', jp: '{来週|らいしゅう}の{土曜日|どようび}は＿。', a: 'どうですか', wrong: ['どうしてですか', 'どうやってですか', 'どこですか'],
        why: 'Javaslat: 〜はどうですか.' },
      { q: 'Mit jelent: バスに{乗|の}らないで、{歩|ある}いて{行|い}きます。', a: 'Nem busszal megyek, hanem gyalog.',
        wrong: ['Busszal megyek, mert nem szeretek gyalogolni.', 'Sem busszal, sem gyalog nem megyek.', 'Busszal megyek, aztán gyalog.'],
        why: '〜ないで: az egyik helyett a másikat teszem.' },
      { q: 'Melyik szó mellett áll mindig tagadó ige?', a: 'ぜんぜん', wrong: ['いつも', 'たいてい', 'よく'],
        why: 'ぜんぜん + tagadás = egyáltalán nem.' }
    ]
  },

  /* ════════════════ KIEGÉSZÍTŐ LECKÉK (JLPT N4) ════════════════ */

  /* ── K5 ───────────────────────────────────────────── */
  {
    id: 'k5', no: 53, book: 'Kiegészítő',
    badge: 'K5', kicker: 'Kiegészítő · JLPT N4', label: 'Kiegészítő lecke',
    title: 'Közben, éppen, az imént',
    lead: 'Pontosabban fejezed ki az időt: mi történt valami alatt, mi történt csak nemrég, mi zajlott éppen, és milyen időközönként ismétlődik valami.',
    cando: [
      'Megmondod, mi történt egy időszak alatt.',
      'Kifejezed, hogy valami csak nemrég történt.',
      'Megadod, milyen időközönként történik valami.'
    ],
    points: [
      {
        title: '〜あいだ', sub: 'mialatt (végig)',
        pattern: 'ige ている-alak / főnév の + {間|あいだ}、…',
        body: 'Egy időszak <i>teljes hosszában</i> tart a másik cselekvés vagy állapot. Gyakran áll vele a ずっと („végig").',
        examples: [
          { jp: '{授業|じゅぎょう}の{間|あいだ}、ずっと{眠|ねむ}かったです。', romaji: 'Jugyō no aida, zutto nemukatta desu.', hu: 'Az óra alatt végig álmos voltam.' },
          { jp: '{夏休|なつやす}みの{間|あいだ}、{祖母|そぼ}の{家|うち}にいました。', romaji: 'Natsuyasumi no aida, sobo no uchi ni imashita.', hu: 'A nyári szünet alatt a nagymamámnál voltam.' },
          { jp: '{日本|にほん}にいる{間|あいだ}、{毎日|まいにち}{写真|しゃしん}を{撮|と}りました。', romaji: 'Nihon ni iru aida, mainichi shashin o torimashita.', hu: 'Amíg Japánban voltam, minden nap fényképeztem.' }
        ]
      },
      {
        title: '〜あいだに', sub: 'mialatt (egyszer, közben)',
        pattern: 'ige ている-alak / főnév の + {間|あいだ}に、…',
        body: 'A <b>に</b> pontszerűvé teszi: az időszakon belül, mielőtt az véget érne, egyszer megtörténik valami.',
        examples: [
          { jp: '{留守|るす}の{間|あいだ}に、{荷物|にもつ}が{届|とど}きました。', romaji: 'Rusu no aida ni, nimotsu ga todokimashita.', hu: 'Amíg nem voltam otthon, megjött a csomag.' },
          { jp: '{子|こ}どもが{寝|ね}ている{間|あいだ}に、{掃除|そうじ}をします。', romaji: 'Kodomo ga nete iru aida ni, sōji o shimasu.', hu: 'Amíg a gyerek alszik, kitakarítok.' },
          { jp: '{若|わか}い{間|あいだ}に、いろいろな{国|くに}へ{行|い}きたいです。', romaji: 'Wakai aida ni, iroiro na kuni e ikitai desu.', hu: 'Amíg fiatal vagyok, sok országba szeretnék eljutni.' }
        ]
      },
      {
        title: '〜たばかりです', sub: 'csak nemrég…',
        pattern: 'た-alak + ばかりです',
        body: 'A beszélő úgy érzi, a cselekvés óta kevés idő telt el. A 〜たところです szó szerint „épp most"; a <b>〜たばかり</b> lehet egy hét vagy egy hónap is, ha az a helyzethez képest kevés.',
        examples: [
          { jp: '{日本|にほん}に{来|き}たばかりです。', romaji: 'Nihon ni kita bakari desu.', hu: 'Nemrég jöttem Japánba.' },
          { jp: 'さっき{食|た}べたばかりです。', romaji: 'Sakki tabeta bakari desu.', hu: 'Épp az imént ettem.' },
          { jp: 'この{靴|くつ}は{先週|せんしゅう}{買|か}ったばかりです。', romaji: 'Kono kutsu wa senshū katta bakari desu.', hu: 'Ezt a cipőt csak múlt héten vettem.' }
        ]
      },
      {
        title: '〜ていました', sub: 'éppen csinálta · akkoriban',
        pattern: 'ige て-alak + いました',
        body: 'A 〜ています múlt ideje: egy múltbeli pillanatban éppen zajlott valami, vagy egy múltbeli időszakban tartós állapot volt.',
        examples: [
          { jp: '{電話|でんわ}が{鳴|な}ったとき、シャワーを{浴|あ}びていました。', romaji: 'Denwa ga natta toki, shawā o abite imashita.', hu: 'Amikor megszólalt a telefon, éppen zuhanyoztam.' },
          { jp: '{去年|きょねん}は{大阪|おおさか}に{住|す}んでいました。', romaji: 'Kyonen wa Ōsaka ni sunde imashita.', hu: 'Tavaly Oszakában laktam.' },
          { jp: '{昨日|きのう}の{夜|よる}、{何|なに}をしていましたか。', romaji: 'Kinō no yoru, nani o shite imashita ka.', hu: 'Mit csináltál tegnap este?' }
        ]
      },
      {
        title: '〜ごろ・〜おきに', sub: 'körül · -onként',
        pattern: 'időpont + ごろ · időtartam / mennyiség + おきに',
        body: 'A <b>ごろ</b> hozzávetőleges időpontot ad („három óra tájban"). Az <b>おきに</b> szabályos időközt: „tízpercenként", „kétnaponta".',
        examples: [
          { jp: '{三時|さんじ}ごろ{帰|かえ}ります。', romaji: 'Sanji goro kaerimasu.', hu: 'Három óra körül érek haza.' },
          { jp: 'バスは{十分|じゅっぷん}おきに{来|き}ます。', romaji: 'Basu wa juppun oki ni kimasu.', hu: 'A busz tízpercenként jön.' },
          { jp: 'この{薬|くすり}は{六時間|ろくじかん}おきに{飲|の}んでください。', romaji: 'Kono kusuri wa rokujikan oki ni nonde kudasai.', hu: 'Ezt a gyógyszert hatóránként vegye be.' }
        ]
      },
      {
        title: 'さっき・やっと・きゅうに', sub: 'az imént · végre · hirtelen',
        pattern: 'időhatározó + mondat',
        body: 'Három gyakori időhatározó: <b>さっき</b> (az imént, nem sokkal ezelőtt), <b>やっと</b> (végre, nagy nehezen), <b>{急|きゅう}に</b> (hirtelen, váratlanul).',
        examples: [
          { jp: 'さっき{田中|たなか}さんから{電話|でんわ}がありました。', romaji: 'Sakki Tanaka-san kara denwa ga arimashita.', hu: 'Az imént telefonált Tanaka.' },
          { jp: 'やっと{宿題|しゅくだい}が{終|お}わりました。', romaji: 'Yatto shukudai ga owarimashita.', hu: 'Végre elkészültem a leckével.' },
          { jp: '{急|きゅう}に{雨|あめ}が{降|ふ}ってきました。', romaji: 'Kyū ni ame ga futte kimashita.', hu: 'Hirtelen eleredt az eső.' }
        ]
      }
    ],
    quiz: [
      { q: '„Amíg nem voltam otthon, megjött a csomag." Mi hiányzik?', jp: '{留守|るす}の＿、{荷物|にもつ}が{届|とど}きました。', a: '{間|あいだ}に', wrong: ['{間|あいだ}', 'ごろ', 'おきに'],
        why: 'Egyszeri esemény az időszakon belül: {間|あいだ}に.' },
      { q: 'Melyik mondat jelenti: „végig, az egész idő alatt"?', a: '{授業|じゅぎょう}の{間|あいだ}、ずっと{眠|ねむ}かったです。',
        wrong: ['{授業|じゅぎょう}の{間|あいだ}に、{電話|でんわ}が{鳴|な}りました。', '{授業|じゅぎょう}のまえに、{電話|でんわ}しました。', '{授業|じゅぎょう}のあとで、{寝|ね}ました。'],
        why: 'に nélkül a {間|あいだ} a teljes időszakra vonatkozik.' },
      { q: '„Nemrég jöttem Japánba." Mi hiányzik?', jp: '{日本|にほん}に＿ばかりです。', a: '{来|き}た', wrong: ['{来|く}る', '{来|き}て', '{来|こ}ない'],
        why: 'A ばかり előtt た-alak áll.' },
      { q: '„Ezt a cipőt csak múlt héten vettem." Mi hiányzik?', jp: 'この{靴|くつ}は{先週|せんしゅう}{買|か}った＿です。', a: 'ばかり', wrong: ['ところ', 'あいだ', 'おき'],
        why: 'Egy hét távlatából is „nemrég": 〜たばかり. A 〜たところ csak a közvetlenül előtte történtre jó.' },
      { q: '„Amikor megszólalt a telefon, éppen zuhanyoztam." Mi hiányzik?', jp: '{電話|でんわ}が{鳴|な}ったとき、シャワーを＿。', a: '{浴|あ}びていました', wrong: ['{浴|あ}びます', '{浴|あ}びておきます', '{浴|あ}びましょう'],
        why: 'Múltbeli folyamat: 〜ていました.' },
      { q: '„Három óra körül érek haza." Mi hiányzik?', jp: '{三時|さんじ}＿{帰|かえ}ります。', a: 'ごろ', wrong: ['おきに', 'ばかり', 'あいだ'],
        why: 'Hozzávetőleges időpont: ごろ.' },
      { q: '„A busz tízpercenként jön." Mi hiányzik?', jp: 'バスは{十分|じゅっぷん}＿{来|き}ます。', a: 'おきに', wrong: ['ごろ', 'ばかり', 'までに'],
        why: 'Szabályos időköz: おきに.' },
      { q: '„Végre elkészültem a leckével." Mi hiányzik?', jp: '＿{宿題|しゅくだい}が{終|お}わりました。', a: 'やっと', wrong: ['{急|きゅう}に', 'ずっと', 'たまに'],
        why: 'やっと = végre, nagy nehezen.' },
      { q: 'Mit jelent: {急|きゅう}に{雨|あめ}が{降|ふ}ってきました。', a: 'Hirtelen eleredt az eső.',
        wrong: ['Végre elállt az eső.', 'Az imént esett az eső.', 'Egész nap esett az eső.'],
        why: '{急|きゅう}に = hirtelen.' },
      { q: 'Mit jelent: {去年|きょねん}は{大阪|おおさか}に{住|す}んでいました。', a: 'Tavaly Oszakában laktam.',
        wrong: ['Tavaly óta Oszakában lakom.', 'Jövőre Oszakában fogok lakni.', 'Tavaly Oszakába látogattam.'],
        why: '〜ていました: múltbeli tartós állapot.' }
    ]
  },

  /* ── K6 ───────────────────────────────────────────── */
  {
    id: 'k6', no: 54, book: 'Kiegészítő',
    badge: 'K6', kicker: 'Kiegészítő · JLPT N4', label: 'Kiegészítő lecke',
    title: 'Kívánság és tanács',
    lead: 'Elmondod, mit szeretnél, hogy más megtegyen, tanácsot adsz és kérsz, kifejezed a megkönnyebbülésedet, és beszélsz a rögzített terveidről.',
    cando: [
      'Megmondod, mit szeretnél, hogy más megtegyen.',
      'Tanácsot adsz, és megkérdezed, mit tegyél.',
      'Kifejezed, hogy örülsz valaminek, ami megtörtént.'
    ],
    points: [
      {
        title: '〜てほしいです', sub: 'szeretném, ha megtennéd',
        pattern: 'személy に + ige て-alak + ほしいです · 〜ないでほしいです',
        body: 'A 〜たい a saját cselekvésedre vonatkozik; a <b>〜てほしい</b> arra, amit <i>mástól</i> szeretnél. Akitől szeretnéd, <b>に</b>-t kap. Tagadva: 〜ないでほしい.',
        examples: [
          { jp: '{母|はは}に{早|はや}く{元気|げんき}になってほしいです。', romaji: 'Haha ni hayaku genki ni natte hoshii desu.', hu: 'Szeretném, ha anyám hamar meggyógyulna.' },
          { jp: 'もう{少|すこ}し{静|しず}かにしてほしいです。', romaji: 'Mō sukoshi shizuka ni shite hoshii desu.', hu: 'Szeretném, ha egy kicsit csendesebben lennél.' },
          { jp: 'ここでたばこを{吸|す}わないでほしいです。', romaji: 'Koko de tabako o suwanaide hoshii desu.', hu: 'Szeretném, ha itt nem dohányoznál.' }
        ]
      },
      {
        title: '〜たらどうですか', sub: 'mi lenne, ha…?',
        pattern: 'た-alak + らどうですか',
        body: 'Szelíd tanács, javaslat. Baráti alakja: 〜たらどう？ A 〜たほうがいいです-nél kevésbé határozott.',
        examples: [
          { jp: '{少|すこ}し{休|やす}んだらどうですか。', romaji: 'Sukoshi yasundara dō desu ka.', hu: 'Mi lenne, ha pihennél egy kicsit?' },
          { jp: '{先生|せんせい}に{聞|き}いてみたらどうですか。', romaji: 'Sensei ni kiite mitara dō desu ka.', hu: 'Miért nem kérdezed meg a tanárt?' },
          { jp: '{薬|くすり}を{飲|の}んだらどう？', romaji: 'Kusuri o nondara dō?', hu: 'És ha bevennél egy gyógyszert?' }
        ]
      },
      {
        title: '〜たらいいですか', sub: 'mit tegyek?',
        pattern: 'kérdőszó + た-alak + らいいですか',
        body: 'Tanácsot, útmutatást kérsz: „hogyan volna jó?". Mindig kérdőszóval áll.',
        examples: [
          { jp: 'どこで{切符|きっぷ}を{買|か}ったらいいですか。', romaji: 'Doko de kippu o kattara ii desu ka.', hu: 'Hol vegyek jegyet?' },
          { jp: 'だれに{聞|き}いたらいいですか。', romaji: 'Dare ni kiitara ii desu ka.', hu: 'Kitől kérdezzem meg?' },
          { jp: 'どうしたらいいですか。', romaji: 'Dō shitara ii desu ka.', hu: 'Mit tegyek?' }
        ]
      },
      {
        title: '〜てよかったです', sub: 'de jó, hogy…',
        pattern: 'ige て-alak + よかったです · 〜なくてよかったです',
        body: 'Megkönnyebbülés, öröm amiatt, ami megtörtént (vagy nem történt meg).',
        examples: [
          { jp: '{間|ま}に{合|あ}ってよかったです。', romaji: 'Ma ni atte yokatta desu.', hu: 'De jó, hogy odaértem!' },
          { jp: '{日本|にほん}に{来|き}てよかったです。', romaji: 'Nihon ni kite yokatta desu.', hu: 'Örülök, hogy eljöttem Japánba.' },
          { jp: '{雨|あめ}が{降|ふ}らなくてよかったですね。', romaji: 'Ame ga furanakute yokatta desu ne.', hu: 'De jó, hogy nem esett!' }
        ]
      },
      {
        title: '〜よていです', sub: 'a terv szerint',
        pattern: 'szótári alak + {予定|よてい}です · főnév の + {予定|よてい}です',
        body: 'Rögzített, másokkal is egyeztetett terv vagy menetrend. A つもりです a saját szándékod; a <b>{予定|よてい}</b> a naptárban is szerepel.',
        examples: [
          { jp: '{来月|らいげつ}{日本|にほん}へ{行|い}く{予定|よてい}です。', romaji: 'Raigetsu Nihon e iku yotei desu.', hu: 'A terv szerint jövő hónapban Japánba megyek.' },
          { jp: '{会議|かいぎ}は{三時|さんじ}からの{予定|よてい}です。', romaji: 'Kaigi wa sanji kara no yotei desu.', hu: 'A megbeszélés a tervek szerint háromkor kezdődik.' },
          { jp: '{明日|あした}は{何|なに}をする{予定|よてい}ですか。', romaji: 'Ashita wa nani o suru yotei desu ka.', hu: 'Mi a programod holnapra?' }
        ]
      },
      {
        title: 'ぜひ・きっと', sub: 'feltétlenül · biztosan',
        pattern: 'ぜひ + kérés / vágy · きっと + feltevés',
        body: 'A <b>ぜひ</b> a kérést és a vágyat nyomatékosítja („nagyon szeretném", „okvetlenül"). A <b>きっと</b> a beszélő erős meggyőződését fejezi ki („egész biztosan").',
        examples: [
          { jp: 'ぜひ{遊|あそ}びに{来|き}てください。', romaji: 'Zehi asobi ni kite kudasai.', hu: 'Feltétlenül gyere el hozzánk!' },
          { jp: 'ぜひ{食|た}べてみたいです。', romaji: 'Zehi tabete mitai desu.', hu: 'Nagyon szeretném megkóstolni.' },
          { jp: 'きっと{大丈夫|だいじょうぶ}ですよ。', romaji: 'Kitto daijōbu desu yo.', hu: 'Biztosan minden rendben lesz.' }
        ]
      }
    ],
    quiz: [
      { q: '„Szeretném, ha anyám hamar meggyógyulna." Mi hiányzik?', jp: '{母|はは}に{早|はや}く{元気|げんき}になって＿です。', a: 'ほしい', wrong: ['たい', 'あげたい', 'みたい'],
        why: 'Mástól szeretném: て-alak + ほしい.' },
      { q: 'Kinek a cselekvéséről szól a 〜てほしい?', a: 'Másnak a cselekvéséről: szeretném, ha ő megtenné.',
        wrong: ['A saját cselekvésemről.', 'Arról, amit kénytelen vagyok megtenni.', 'Arról, amit tilos megtenni.'],
        why: '〜たい: én szeretném megtenni. 〜てほしい: szeretném, ha más megtenné.' },
      { q: '„Szeretném, ha itt nem dohányoznál." Mi hiányzik?', jp: 'ここでたばこを＿ほしいです。', a: '{吸|す}わないで', wrong: ['{吸|す}って', '{吸|す}わなくて', '{吸|す}わない'],
        why: 'Tagadva: 〜ないでほしい.' },
      { q: '„Mi lenne, ha pihennél egy kicsit?" Mi hiányzik?', jp: '{少|すこ}し＿どうですか。', a: '{休|やす}んだら', wrong: ['{休|やす}んで', '{休|やす}むと', '{休|やす}んだり'],
        why: 'Tanács: た-alak + らどうですか.' },
      { q: '„Hol vegyek jegyet?" Mi hiányzik?', jp: 'どこで{切符|きっぷ}を{買|か}ったら＿。', a: 'いいですか', wrong: ['どうですか', 'ほしいですか', 'よかったですか'],
        why: 'Tanácskérés: kérdőszó + たらいいですか.' },
      { q: 'Mit jelent: どうしたらいいですか。', a: 'Mit tegyek?', wrong: ['Mi történt?', 'Hogy vagy?', 'Mit csináltál?'],
        why: 'どうしたらいいですか: útmutatást kérsz.' },
      { q: '„De jó, hogy odaértem!" Mi hiányzik?', jp: '{間|ま}に{合|あ}って＿です。', a: 'よかった', wrong: ['ほしい', 'ばかり', 'ください'],
        why: 'Megkönnyebbülés: て-alak + よかったです.' },
      { q: '„A terv szerint jövő hónapban Japánba megyek." Mi hiányzik?', jp: '{来月|らいげつ}{日本|にほん}へ{行|い}く＿です。', a: '{予定|よてい}', wrong: ['ばかり', 'まま', 'ほしい'],
        why: 'Rögzített terv: szótári alak + {予定|よてい}です.' },
      { q: '„Feltétlenül gyere el hozzánk!" Mi hiányzik?', jp: '＿{遊|あそ}びに{来|き}てください。', a: 'ぜひ', wrong: ['やっと', 'さっき', 'たいてい'],
        why: 'A kérést a ぜひ nyomatékosítja.' },
      { q: 'Mit jelent: きっと{大丈夫|だいじょうぶ}ですよ。', a: 'Biztosan minden rendben lesz.',
        wrong: ['Talán rendben lesz.', 'Sajnos nincs rendben.', 'Végre rendben van.'],
        why: 'きっと = egész biztosan.' }
    ]
  },

  /* ── K7 ───────────────────────────────────────────── */
  {
    id: 'k7', no: 55, book: 'Kiegészítő',
    badge: 'K7', kicker: 'Kiegészítő · JLPT N4', label: 'Kiegészítő lecke',
    title: 'Biztos? Kizárt?',
    lead: 'Kifejezed, hogy valami lehetetlen, minek látszik valaki, mit vettél észre, és árnyaltan fogalmazol a „nem nagyon" és a „sehogy sem" szavakkal.',
    cando: [
      'Kifejezed, hogy valamit kizártnak tartasz.',
      'Elmondod, minek látszik valaki vagy valami.',
      'Árnyaltan tagadsz: nem annyira, sehogy sem.'
    ],
    points: [
      {
        title: '〜はずがありません', sub: 'kizárt, hogy…',
        pattern: 'rövid alak + はずがありません',
        body: 'A 〜はずです („elvileg úgy kell lennie") erős tagadása: a beszélő szerint ez lehetetlen.',
        examples: [
          { jp: '{彼|かれ}がそんなことを{言|い}うはずがありません。', romaji: 'Kare ga sonna koto o iu hazu ga arimasen.', hu: 'Kizárt, hogy ő ilyet mondjon.' },
          { jp: 'こんなに{安|やす}いはずがありません。', romaji: 'Konna ni yasui hazu ga arimasen.', hu: 'Lehetetlen, hogy ilyen olcsó legyen.' },
          { jp: '{田中|たなか}さんが{知|し}らないはずがない。', romaji: 'Tanaka-san ga shiranai hazu ga nai.', hu: 'Kizárt, hogy Tanaka ne tudná.' }
        ]
      },
      {
        title: '〜にみえます', sub: '…-nak látszik',
        pattern: 'főnév / な-melléknév + に{見|み}えます · い → く{見|み}えます',
        body: 'A külső alapján alkotott benyomás: valaki vagy valami minek néz ki. Az い-melléknév く-ra végződik előtte.',
        examples: [
          { jp: 'あの{人|ひと}は{学生|がくせい}に{見|み}えます。', romaji: 'Ano hito wa gakusei ni miemasu.', hu: 'Az az ember diáknak látszik.' },
          { jp: 'この{服|ふく}を{着|き}ると、{若|わか}く{見|み}えます。', romaji: 'Kono fuku o kiru to, wakaku miemasu.', hu: 'Ebben a ruhában fiatalabbnak látszol.' },
          { jp: '{元気|げんき}に{見|み}えますが、{実|じつ}は{病気|びょうき}です。', romaji: 'Genki ni miemasu ga, jitsu wa byōki desu.', hu: 'Egészségesnek látszik, de valójában beteg.' }
        ]
      },
      {
        title: '〜にきがつきます', sub: 'észrevesz',
        pattern: 'főnév + に{気|き}がつきます · mondat + ことに{気|き}がつきます',
        body: 'Amit észreveszel, <b>に</b>-t kap. Ha egy egész tény az, こと főnevesíti.',
        examples: [
          { jp: '{間違|まちが}いに{気|き}がつきました。', romaji: 'Machigai ni ki ga tsukimashita.', hu: 'Észrevettem a hibát.' },
          { jp: '{財布|さいふ}がないことに{気|き}がつきました。', romaji: 'Saifu ga nai koto ni ki ga tsukimashita.', hu: 'Észrevettem, hogy nincs meg a pénztárcám.' },
          { jp: 'だれも{私|わたし}に{気|き}がつきませんでした。', romaji: 'Dare mo watashi ni ki ga tsukimasen deshita.', hu: 'Senki sem vett észre engem.' }
        ]
      },
      {
        title: 'なかなか〜ません', sub: 'sehogy sem, csak nem akar',
        pattern: 'なかなか + tagadó ige',
        body: 'A várakozásod ellenére valami nem történik meg, vagy nehezen megy. Állító mondatban a なかなか mást jelent: „meglehetősen" (なかなかおいしい).',
        examples: [
          { jp: 'バスがなかなか{来|き}ません。', romaji: 'Basu ga nakanaka kimasen.', hu: 'Csak nem akar jönni a busz.' },
          { jp: '{漢字|かんじ}がなかなか{覚|おぼ}えられません。', romaji: 'Kanji ga nakanaka oboeraremasen.', hu: 'Sehogy sem tudom megjegyezni a kanjikat.' },
          { jp: '{仕事|しごと}がなかなか{終|お}わりません。', romaji: 'Shigoto ga nakanaka owarimasen.', hu: 'Sehogy sem akar véget érni a munka.' }
        ]
      },
      {
        title: 'そんなに〜ません', sub: 'nem annyira',
        pattern: 'そんなに + tagadás',
        body: 'Tompított tagadás: kevésbé, mint gondolnád. Kérésben: „ne annyira".',
        examples: [
          { jp: 'そんなに{高|たか}くないです。', romaji: 'Sonna ni takakunai desu.', hu: 'Nem olyan drága.' },
          { jp: 'そんなに{心配|しんぱい}しないでください。', romaji: 'Sonna ni shinpai shinaide kudasai.', hu: 'Ne aggódj annyira!' },
          { jp: '{今日|きょう}はそんなに{寒|さむ}くありません。', romaji: 'Kyō wa sonna ni samuku arimasen.', hu: 'Ma nincs olyan hideg.' }
        ]
      },
      {
        title: 'さすが', sub: 'ez igen! · hiába, tényleg',
        pattern: 'さすが + főnév ですね · さすがに + mondat',
        body: 'Elismerés: valaki megfelel annak, amit a híre vagy a helyzete alapján várni lehet. A <b>さすがに</b> pedig azt jelenti: „ez azért már tényleg".',
        examples: [
          { jp: 'さすが{先生|せんせい}ですね。', romaji: 'Sasuga sensei desu ne.', hu: 'Ez igen, látszik, hogy tanár!' },
          { jp: 'さすがプロですね。{上手|じょうず}です。', romaji: 'Sasuga puro desu ne. Jōzu desu.', hu: 'Látszik, hogy profi: nagyon ügyes.' },
          { jp: 'さすがに{今日|きょう}は{疲|つか}れました。', romaji: 'Sasuga ni kyō wa tsukaremashita.', hu: 'Ma azért tényleg elfáradtam.' }
        ]
      }
    ],
    quiz: [
      { q: '„Kizárt, hogy ő ilyet mondjon." Mi hiányzik?', jp: '{彼|かれ}がそんなことを{言|い}う＿。', a: 'はずがありません', wrong: ['はずです', 'かもしれません', 'ことがあります'],
        why: 'Lehetetlennek tartom: 〜はずがありません.' },
      { q: 'Mi a 〜はずです ellentéte („kizárt")?', a: 'はずがありません', wrong: ['はずでした', 'はずですか', 'はずになります'],
        why: 'はずです: elvileg úgy van. はずがありません: kizárt.' },
      { q: '„Az az ember diáknak látszik." Mi hiányzik?', jp: 'あの{人|ひと}は{学生|がくせい}＿{見|み}えます。', a: 'に', wrong: ['を', 'が', 'で'],
        why: 'Főnév + に{見|み}えます.' },
      { q: '„Ebben a ruhában fiatalabbnak látszol." Mi hiányzik?', jp: 'この{服|ふく}を{着|き}ると、＿{見|み}えます。', a: '{若|わか}く', wrong: ['{若|わか}い', '{若|わか}いに', '{若|わか}に'],
        why: 'い-melléknév: い → く + {見|み}えます.' },
      { q: '„Észrevettem a hibát." Mi hiányzik?', jp: '{間違|まちが}い＿{気|き}がつきました。', a: 'に', wrong: ['を', 'で', 'へ'],
        why: 'Amit észreveszel: 〜に{気|き}がつきます.' },
      { q: '„Csak nem akar jönni a busz." Mi hiányzik?', jp: 'バスが＿{来|き}ません。', a: 'なかなか', wrong: ['さすが', 'やっと', 'ぜひ'],
        why: 'なかなか + tagadás: sehogy sem.' },
      { q: 'Mit jelent: そんなに{高|たか}くないです。', a: 'Nem olyan drága.', wrong: ['Nagyon drága.', 'Ingyen van.', 'Túl drága.'],
        why: 'そんなに + tagadás = nem annyira.' },
      { q: 'Mit fejez ki: さすが{先生|せんせい}ですね。', a: 'Elismerést: megfelel annak, amit tőle várni lehet.',
        wrong: ['Csalódást: többet vártál tőle.', 'Kételyt: nem hiszed, hogy tanár.', 'Kérdést: tanár-e.'],
        why: 'A さすが dicséret.' },
      { q: '„Sehogy sem tudom megjegyezni a kanjikat." Mi hiányzik?', jp: '{漢字|かんじ}がなかなか＿。', a: '{覚|おぼ}えられません', wrong: ['{覚|おぼ}えられます', '{覚|おぼ}えます', '{覚|おぼ}えました'],
        why: 'Ebben a jelentésben a なかなか tagadó igével áll.' },
      { q: 'Mit jelent: {元気|げんき}に{見|み}えますが、{実|じつ}は{病気|びょうき}です。', a: 'Egészségesnek látszik, de valójában beteg.',
        wrong: ['Beteg volt, de már egészséges.', 'Egészségesnek látszik, és az is.', 'Betegnek látszik, de egészséges.'],
        why: '〜に{見|み}えます: annak látszik; {実|じつ}は: valójában.' }
    ]
  },

  /* ── K8 ───────────────────────────────────────────── */
  {
    id: 'k8', no: 56, book: 'Kiegészítő',
    badge: 'K8', kicker: 'Kiegészítő · JLPT N4', label: 'Kiegészítő lecke',
    title: 'Ha úgy adódik',
    lead: 'Megmondod, mire van szükség és mi a teendő egy adott esetben, felsorolsz és választást kínálsz, megadod, mire jó valami, és továbbadod, amit általában mondanak.',
    cando: [
      'Megmondod, mire van szükség, és mi a teendő egy adott esetben.',
      'Elmondod, mire való vagy mire jó valami.',
      'Továbbadod, amit általában mondanak vagy amit hallottál.'
    ],
    points: [
      {
        title: '〜がひつようです', sub: 'szükség van rá',
        pattern: 'főnév + が{必要|ひつよう}です · szótári alak + {必要|ひつよう}があります',
        body: 'A <b>{必要|ひつよう}</b> な-melléknév: „szükséges". Igével: 〜する{必要|ひつよう}があります („szükséges megtenni"), tagadva 〜{必要|ひつよう}はありません („nem szükséges").',
        examples: [
          { jp: '{旅行|りょこう}にはパスポートが{必要|ひつよう}です。', romaji: 'Ryokō ni wa pasupōto ga hitsuyō desu.', hu: 'Az utazáshoz útlevél kell.' },
          { jp: 'もっと{練習|れんしゅう}する{必要|ひつよう}があります。', romaji: 'Motto renshū suru hitsuyō ga arimasu.', hu: 'Többet kell gyakorolni.' },
          { jp: '{急|いそ}ぐ{必要|ひつよう}はありません。', romaji: 'Isogu hitsuyō wa arimasen.', hu: 'Nem szükséges sietni.' }
        ]
      },
      {
        title: '〜ばあいは', sub: 'abban az esetben, ha…',
        pattern: 'főnév の / rövid alak + {場合|ばあい}は',
        body: 'Egy lehetséges helyzetet nevez meg, és azt, mi a teendő benne. Szabályzatokban, tájékoztatókban gyakori.',
        examples: [
          { jp: '{雨|あめ}の{場合|ばあい}は、{中止|ちゅうし}します。', romaji: 'Ame no baai wa, chūshi shimasu.', hu: 'Eső esetén elmarad.' },
          { jp: '{遅|おく}れる{場合|ばあい}は、{連絡|れんらく}してください。', romaji: 'Okureru baai wa, renraku shite kudasai.', hu: 'Ha késne, kérem, szóljon.' },
          { jp: '{火事|かじ}の{場合|ばあい}は、エレベーターを{使|つか}わないでください。', romaji: 'Kaji no baai wa, erebētā o tsukawanaide kudasai.', hu: 'Tűz esetén ne használja a liftet.' }
        ]
      },
      {
        title: '〜など・〜または', sub: 'és hasonlók · vagy',
        pattern: 'A や B など · A または B',
        body: 'A <b>など</b> lezárja a felsorolást: „meg ilyesmi, többek között". A <b>または</b> írott stílusú „vagy": űrlapokon, utasításokban áll.',
        examples: [
          { jp: '{机|つくえ}の{上|うえ}に{本|ほん}やノートなどがあります。', romaji: 'Tsukue no ue ni hon ya nōto nado ga arimasu.', hu: 'Az asztalon könyvek, füzetek és hasonlók vannak.' },
          { jp: '{休|やす}みの{日|ひ}は{映画|えいが}や{音楽|おんがく}などを{楽|たの}しみます。', romaji: 'Yasumi no hi wa eiga ya ongaku nado o tanoshimimasu.', hu: 'Szabadnapon filmet nézek, zenét hallgatok, ilyesmi.' },
          { jp: '{黒|くろ}または{青|あお}のペンで{書|か}いてください。', romaji: 'Kuro mata wa ao no pen de kaite kudasai.', hu: 'Fekete vagy kék tollal írjon.' }
        ]
      },
      {
        title: '〜のに (cél)', sub: 'valamire, valamihez',
        pattern: 'szótári alak + のに + {使|つか}います / {便利|べんり}です / かかります',
        body: 'Itt a のに nem „pedig", hanem célt jelöl: mire használod, mire jó, mennyi kell hozzá. Csak néhány állítmánnyal áll: {使|つか}う, {便利|べんり}, {必要|ひつよう}, かかる.',
        examples: [
          { jp: 'このはさみは{紙|かみ}を{切|き}るのに{使|つか}います。', romaji: 'Kono hasami wa kami o kiru noni tsukaimasu.', hu: 'Ezt az ollót papírvágásra használom.' },
          { jp: '{駅|えき}へ{行|い}くのに{二十分|にじゅっぷん}かかります。', romaji: 'Eki e iku noni nijuppun kakarimasu.', hu: 'Húsz percbe telik eljutni az állomásra.' },
          { jp: 'このアプリは{漢字|かんじ}を{覚|おぼ}えるのに{便利|べんり}です。', romaji: 'Kono apuri wa kanji o oboeru noni benri desu.', hu: 'Ez az alkalmazás hasznos a kanjik megjegyzéséhez.' }
        ]
      },
      {
        title: '〜だけで', sub: 'pusztán azzal, hogy…',
        pattern: 'szótári alak + だけで',
        body: 'Azt fejezi ki, hogy már ennyi is elég az eredményhez.',
        examples: [
          { jp: '{見|み}るだけで{楽|たの}しいです。', romaji: 'Miru dake de tanoshii desu.', hu: 'Már nézni is öröm.' },
          { jp: '{名前|なまえ}を{書|か}くだけでいいです。', romaji: 'Namae o kaku dake de ii desu.', hu: 'Elég csak a nevet odaírni.' },
          { jp: '{少|すこ}し{練習|れんしゅう}するだけで{上手|じょうず}になります。', romaji: 'Sukoshi renshū suru dake de jōzu ni narimasu.', hu: 'Egy kis gyakorlással is ügyesebb leszel.' }
        ]
      },
      {
        title: '〜づらいです・〜がりです', sub: 'nehéz megtenni · hajlamos rá',
        pattern: 'ige ます-tő + づらい · érzést jelentő melléknév töve + がり',
        body: 'A <b>〜づらい</b> a 〜にくい rokona: testi vagy lelki okból nehéz megtenni. A <b>〜がり</b> főnevet képez: olyan ember, aki hajlamos az adott érzésre ({寒|さむ}がり = fázós).',
        examples: [
          { jp: 'この{靴|くつ}は{歩|ある}きづらいです。', romaji: 'Kono kutsu wa arukizurai desu.', hu: 'Ebben a cipőben nehéz járni.' },
          { jp: '{妹|いもうと}は{寒|さむ}がりです。', romaji: 'Imōto wa samugari desu.', hu: 'A húgom fázós.' },
          { jp: '{弟|おとうと}は{恥|は}ずかしがりです。', romaji: 'Otōto wa hazukashigari desu.', hu: 'Az öcsém szégyenlős.' }
        ]
      },
      {
        title: '〜といわれています・〜とききました', sub: 'azt mondják · azt hallottam',
        pattern: 'rövid alak + と{言|い}われています / と{聞|き}きました',
        body: 'A <b>と{言|い}われています</b> általános vélekedést ad vissza („úgy tartják"). A <b>と{聞|き}きました</b> azt, amit te magad hallottál valakitől.',
        examples: [
          { jp: '{日本語|にほんご}は{難|むずか}しいと{言|い}われています。', romaji: 'Nihongo wa muzukashii to iwarete imasu.', hu: 'Azt mondják, a japán nehéz nyelv.' },
          { jp: 'この{寺|てら}は{日本|にほん}でいちばん{古|ふる}いと{言|い}われています。', romaji: 'Kono tera wa Nihon de ichiban furui to iwarete imasu.', hu: 'Úgy tartják, ez a legrégibb templom Japánban.' },
          { jp: '{田中|たなか}さんは{来月|らいげつ}{引|ひ}っ{越|こ}すと{聞|き}きました。', romaji: 'Tanaka-san wa raigetsu hikkosu to kikimashita.', hu: 'Azt hallottam, Tanaka jövő hónapban elköltözik.' }
        ]
      }
    ],
    quiz: [
      { q: '„Az utazáshoz útlevél kell." Mi hiányzik?', jp: '{旅行|りょこう}にはパスポートが＿です。', a: '{必要|ひつよう}', wrong: ['{場合|ばあい}', '{予定|よてい}', '{上手|じょうず}'],
        why: '〜が{必要|ひつよう}です = szükség van rá.' },
      { q: '„Nem szükséges sietni." Mi hiányzik?', jp: '{急|いそ}ぐ{必要|ひつよう}＿ありません。', a: 'は', wrong: ['を', 'に', 'で'],
        why: 'Tagadva: 〜{必要|ひつよう}はありません.' },
      { q: '„Ha késne, kérem, szóljon." Mi hiányzik?', jp: '{遅|おく}れる＿、{連絡|れんらく}してください。', a: '{場合|ばあい}は', wrong: ['だけで', 'のに', 'などは'],
        why: 'Abban az esetben: 〜{場合|ばあい}は.' },
      { q: '„Eső esetén elmarad." Mi hiányzik?', jp: '{雨|あめ}＿{場合|ばあい}は、{中止|ちゅうし}します。', a: 'の', wrong: ['な', 'だ', 'に'],
        why: 'Főnév után: の{場合|ばあい}は.' },
      { q: '„Fekete vagy kék tollal írjon." Mi hiányzik?', jp: '{黒|くろ}＿{青|あお}のペンで{書|か}いてください。', a: 'または', wrong: ['など', 'だけで', 'しかし'],
        why: 'Írott stílusú „vagy": または.' },
      { q: '„Húsz percbe telik eljutni az állomásra." Mi hiányzik?', jp: '{駅|えき}へ{行|い}く＿{二十分|にじゅっぷん}かかります。', a: 'のに', wrong: ['ので', 'など', 'ばかり'],
        why: 'Cél a かかります előtt: szótári alak + のに.' },
      { q: 'Mit jelent: {名前|なまえ}を{書|か}くだけでいいです。', a: 'Elég csak a nevet odaírni.',
        wrong: ['A nevet nem kell odaírni.', 'Csak a nevet nem szabad odaírni.', 'A nevet is oda kell írni, meg mást is.'],
        why: '〜だけでいいです: ennyi elég.' },
      { q: '„Ebben a cipőben nehéz járni." Mi hiányzik?', jp: 'この{靴|くつ}は{歩|ある}き＿です。', a: 'づらい', wrong: ['やすい', 'がり', 'すぎ'],
        why: 'Nehéz megtenni: ます-tő + づらい.' },
      { q: 'Mit jelent: {妹|いもうと}は{寒|さむ}がりです。', a: 'A húgom fázós.', wrong: ['A húgom most fázik.', 'A húgom szereti a hideget.', 'A húgom megfázott.'],
        why: '〜がり: az a fajta ember, aki hajlamos rá.' },
      { q: '„Azt mondják, a japán nehéz nyelv." Mi hiányzik?', jp: '{日本語|にほんご}は{難|むずか}しいと＿。', a: '{言|い}われています', wrong: ['{言|い}わせています', '{聞|き}かれています', '{言|い}いたがっています'],
        why: 'Általános vélekedés: 〜と{言|い}われています.' }
    ]
  }
];
