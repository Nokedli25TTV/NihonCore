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
