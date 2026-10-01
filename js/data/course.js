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
        why: 'A なん = „mi?", és a です elé kerül, oda, ahová a válasz.' }
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
        why: 'A です tagadása じゃありません.' }
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
        why: 'Két főre a rendhagyó ふたり alak jár.' }
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
        why: 'Itt a にほん = に + ほん, vagyis két darab hosszú tárgy.' }
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
        body: 'Az ige a mondat végén áll, és a végződése mutatja az időt, valamint azt, hogy állítasz vagy tagadsz. A japán jelen idő a jövőt és a szokást is kifejezi: <b>行きます</b> = megyek, menni fogok, járni szoktam.',
        examples: [
          { jp: '{毎日|まいにち}{学校|がっこう}へ{行|い}きます。', romaji: 'Mainichi gakkō e ikimasu.', hu: 'Minden nap iskolába megyek.' },
          { jp: 'きのう{図書館|としょかん}へ{行|い}きました。', romaji: 'Kinō toshokan e ikimashita.', hu: 'Tegnap könyvtárba mentem.' },
          { jp: '{日曜日|にちようび}は{学校|がっこう}へ{行|い}きません。', romaji: 'Nichiyōbi wa gakkō e ikimasen.', hu: 'Vasárnap nem megyek iskolába.' },
          { jp: '{先週|せんしゅう}はどこへも{行|い}きませんでした。', romaji: 'Senshū wa doko e mo ikimasen deshita.', hu: 'Múlt héten sehová sem mentem.' }
        ]
      },
      {
        title: '〜へ・〜に 行きます', sub: 'hová',
        pattern: 'hely へ / に + 行きます · 来ます · 帰ります',
        body: 'A mozgás célját a <b>へ</b> (kiejtve: <i>e</i>) vagy a <b>に</b> jelöli. A három alapige: 行きます (megy), 来ます (jön), 帰ります (hazamegy). A kiindulópontot a <b>から</b> jelöli.',
        examples: [
          { jp: '{来週|らいしゅう}{日本|にほん}へ{行|い}きます。', romaji: 'Raishū Nihon e ikimasu.', hu: 'Jövő héten Japánba megyek.' },
          { jp: '{七時|しちじ}にうちへ{帰|かえ}ります。', romaji: 'Shichiji ni uchi e kaerimasu.', hu: 'Hétkor megyek haza.' },
          { jp: '{友|とも}だちはペーチから{来|き}ました。', romaji: 'Tomodachi wa Pēchi kara kimashita.', hu: 'A barátom Pécsről jött.' }
        ]
      },
      {
        title: '〜で 行きます', sub: 'mivel',
        pattern: 'jármű で + 行きます',
        body: 'Az eszközt, így a közlekedési eszközt is a <b>で</b> jelöli. Kivétel a gyaloglás: <b>歩いて</b> (あるいて), で nélkül.',
        examples: [
          { jp: 'バスで{学校|がっこう}へ{行|い}きます。', romaji: 'Basu de gakkō e ikimasu.', hu: 'Busszal megyek iskolába.' },
          { jp: '{電車|でんしゃ}で{来|き}ました。', romaji: 'Densha de kimashita.', hu: 'Vonattal jöttem.' },
          { jp: '{歩|ある}いて{帰|かえ}ります。', romaji: 'Aruite kaerimasu.', hu: 'Gyalog megyek haza.' }
        ]
      },
      {
        title: '〜と', sub: 'kivel',
        pattern: 'személy と (いっしょに) + ige',
        body: 'A <b>と</b> itt társat jelöl: „valakivel". Az <b>いっしょに</b> (együtt) nyomatékosít. Egyedül: <b>一人で</b> (ひとりで).',
        examples: [
          { jp: '{友|とも}だちと{映画館|えいがかん}へ{行|い}きます。', romaji: 'Tomodachi to eigakan e ikimasu.', hu: 'A barátommal moziba megyek.' },
          { jp: '{母|はは}といっしょに{来|き}ました。', romaji: 'Haha to issho ni kimashita.', hu: 'Anyámmal együtt jöttem.' },
          { jp: '{一人|ひとり}で{行|い}きました。', romaji: 'Hitori de ikimashita.', hu: 'Egyedül mentem.' }
        ]
      },
      {
        title: '〜に', sub: 'mikor',
        pattern: 'időpont に + ige',
        body: 'A számmal kifejezhető időpont (óra, dátum, a hét napja) után <b>に</b> áll. A „viszonylagos" időszavak után nem: 今日 (ma), 明日 (holnap), 来週 (jövő héten), 毎日 (minden nap).',
        examples: [
          { jp: '{八時|はちじ}に{学校|がっこう}へ{行|い}きます。', romaji: 'Hachiji ni gakkō e ikimasu.', hu: 'Nyolckor megyek iskolába.' },
          { jp: '{土曜日|どようび}に{友|とも}だちが{来|き}ます。', romaji: 'Doyōbi ni tomodachi ga kimasu.', hu: 'Szombaton jön a barátom.' },
          { jp: '{明日|あした}{東京|とうきょう}へ{行|い}きます。', romaji: 'Ashita Tōkyō e ikimasu.', hu: 'Holnap Tokióba megyek.' }
        ],
        tip: '明日 に 行きます ✗ — a „holnap", „ma", „jövő héten" után nincs に.'
      },
      {
        title: '〜月〜日', sub: 'dátum',
        pattern: 'szám + 月 · szám + 日',
        body: 'A hónap a szám + <b>月</b> (がつ), a nap a szám + <b>日</b> (にち). Az 1–10. és a 20. nap olvasata rendhagyó: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか, はつか. A hónapoknál a 4 (しがつ), a 7 (しちがつ) és a 9 (くがつ) tér el.',
        examples: [
          { jp: '{誕生日|たんじょうび}は{四月|しがつ}{三日|みっか}です。', romaji: 'Tanjōbi wa shigatsu mikka desu.', hu: 'A születésnapom április harmadika.' },
          { jp: '{九月|くがつ}{一日|ついたち}に{学校|がっこう}が{始|はじ}まります。', romaji: 'Kugatsu tsuitachi ni gakkō ga hajimarimasu.', hu: 'Szeptember elsején kezdődik az iskola.' },
          { jp: '{今日|きょう}は{何月|なんがつ}{何日|なんにち}ですか。', romaji: 'Kyō wa nangatsu nannichi desu ka.', hu: 'Hányadika van ma?' }
        ]
      },
      {
        title: '〜時間・〜回', sub: 'mennyi ideig, hányszor',
        pattern: 'szám + 時間 · időszak に + szám + 回',
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
        why: 'Április: しがつ; harmadika: みっか. Mindkettő rendhagyó.' }
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
        tip: '図書館<b>に</b> います = a könyvtárban vagyok · 図書館<b>で</b> 読みます = a könyvtárban olvasok.'
      },
      {
        title: '〜に 行きます', sub: 'miért megyek oda',
        pattern: 'hely へ + (ige ます nélkül / főnév) に 行きます',
        body: 'A mozgás célját az ige <b>ます nélküli alakja + に</b> fejezi ki: 買います → <b>買いに</b> 行きます (megyek vásárolni). Cselekvést jelentő főnév is állhat itt: 買い物に, 散歩に.',
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
        why: 'Közös cselekvésre a 〜ましょう szólít; a hely で.' }
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
        pattern: 'A は B が 好きです · きらいです',
        body: 'A <b>好き</b> (すき) és a <b>きらい</b> japánul melléknév, nem ige: „számomra a zene kedvelt". Ezért amit szeretsz, az <b>が</b>-t kap, nem を-t. Tagadás: 好きじゃありません. A きらい erős szó; finomabb így: あまり 好きじゃありません.',
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
        tip: 'Ez a から nem ugyanaz, mint a „-tól" (九時から): az főnév után áll, ez mondat után.'
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
        why: 'A 好き melléknév, ezért a tárgya が-t kap.' },
      { q: '„Mert nincs időm." Mi hiányzik?', jp: '{時間|じかん}がありません＿。', a: 'から', wrong: ['まで', 'か', 'も'],
        why: 'Az ok mondata után から áll.' },
      { q: 'Melyik mondat helyes?', a: 'テレビはあまり{見|み}ません。',
        wrong: ['テレビはあまり{見|み}ます。', 'テレビはぜんぜん{見|み}ます。', 'テレビはよく{見|み}ませんです。'],
        why: 'Az あまり és a ぜんぜん mindig tagadó igével jár.' },
      { q: '„A húst szeretem, de a halat nem." Mi hiányzik?', jp: '{肉|にく}は{好|す}きです＿、{魚|さかな}は{好|す}きじゃありません。', a: 'が', wrong: ['から', 'と', 'も'],
        why: 'A tagmondat végi が = „de".' },
      { q: 'Mit jelent: ときどき{料理|りょうり}をします。', a: 'Néha főzök.', wrong: ['Gyakran főzök.', 'Nem nagyon főzök.', 'Soha nem főzök.'],
        why: 'ときどき = néha.' }
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
        body: 'Az <b>い-melléknevek</b> い-re végződnek, és közvetlenül a főnév elé állnak: 高い 山. A <b>な-melléknevek</b> és a főnév közé <b>な</b> kerül: 静かな 町. Néhány な-melléknév is い-re végződik, ezeket külön meg kell jegyezni: きれい (szép, tiszta), 有名 (ゆうめい, híres), きらい.',
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
        body: 'Az い-melléknév tagadásakor a végső い helyére <b>くない</b> kerül: 高い → 高くないです. A な-melléknév úgy tagad, mint a főnév: 静かじゃありません. Az いい (jó) rendhagyó: <b>よくないです</b>.',
        examples: [
          { jp: 'この{本|ほん}は{高|たか}くないです。', romaji: 'Kono hon wa takakunai desu.', hu: 'Ez a könyv nem drága.' },
          { jp: 'この{町|まち}は{静|しず}かじゃありません。', romaji: 'Kono machi wa shizuka ja arimasen.', hu: 'Ez a város nem csendes.' },
          { jp: '{今日|きょう}は{天気|てんき}がよくないです。', romaji: 'Kyō wa tenki ga yokunai desu.', hu: 'Ma nem jó az idő.' }
        ],
        tip: 'A 高い két dolgot jelent: „magas" és „drága". A szövegkörnyezet dönt.'
      },
      {
        title: 'とても・少し・あまり・ぜんぜん', sub: 'mennyire',
        pattern: 'とても / 少し + állítás · あまり / ぜんぜん + tagadás',
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
        body: 'A saját vágyadat az ige <b>ます nélküli alakja + たい</b> fejezi ki: 行きます → 行きたいです. A たい úgy viselkedik, mint egy い-melléknév, tehát a tagadása <b>たくないです</b>. Más ember vágyára így nem használjuk.',
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
        why: 'ます nélküli alak + たい: 行き + たい.' },
      { q: 'Melyik mondat helyes?', a: 'あまり{遠|とお}くないです。',
        wrong: ['あまり{遠|とお}いです。', 'ぜんぜん{遠|とお}いです。', 'あまり{遠|とお}いくないです。'],
        why: 'Az あまり tagadó alakkal jár.' },
      { q: 'Mit jelent: {窓|まど}を{開|あ}けましょうか。', a: 'Kinyissam az ablakot?',
        wrong: ['Nyisd ki az ablakot!', 'Kinyitottam az ablakot.', 'Ki akarom nyitni az ablakot.'],
        why: 'A 〜ましょうか felajánlás: „megtegyem?"' }
    ]
  }
];
