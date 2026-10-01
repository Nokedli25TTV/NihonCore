/* ====================================================
   NIHONCORE — Kana (hiragana + katakana)
   ----------------------------------------------------
   A kana-tréner (pages/kana.html) teljes, zárt készlete.

   NIHONCORE_KANA_ROWS: sorok a gojūon-tábla rendjében.
     id      a sor kulcsa (a beállításokban ezzel kapcsolható)
     group   'basic' (46 alapjel) | 'dakuten' (zöngés + pa-sor) | 'combo' (yōon)
     label   a sor neve a szűrőben
     cols    oszlopszám a táblában (5 = a i u e o; 3 = a u o)
     items   cellák a tábla sorrendjében: [hiragana, katakana, romaji, alt?]
             · null = üres cella (や- és わ-sor hézagai)
             · alt  = beíráskor elfogadott további átírások

   NIHONCORE_KANA_CONFUSABLE: könnyen összetéveszthető jelek csoportjai —
   a feleletválasztós módok elsőként ezekből húznak elterelő választ.
   ==================================================== */

const NIHONCORE_KANA_ROWS = [
  // ── Alapjelek (46) ──
  { id: 'a',  group: 'basic', label: 'あ', cols: 5, items: [['あ','ア','a'], ['い','イ','i'], ['う','ウ','u'], ['え','エ','e'], ['お','オ','o']] },
  { id: 'ka', group: 'basic', label: 'か', cols: 5, items: [['か','カ','ka'], ['き','キ','ki'], ['く','ク','ku'], ['け','ケ','ke'], ['こ','コ','ko']] },
  { id: 'sa', group: 'basic', label: 'さ', cols: 5, items: [['さ','サ','sa'], ['し','シ','shi',['si']], ['す','ス','su'], ['せ','セ','se'], ['そ','ソ','so']] },
  { id: 'ta', group: 'basic', label: 'た', cols: 5, items: [['た','タ','ta'], ['ち','チ','chi',['ti']], ['つ','ツ','tsu',['tu']], ['て','テ','te'], ['と','ト','to']] },
  { id: 'na', group: 'basic', label: 'な', cols: 5, items: [['な','ナ','na'], ['に','ニ','ni'], ['ぬ','ヌ','nu'], ['ね','ネ','ne'], ['の','ノ','no']] },
  { id: 'ha', group: 'basic', label: 'は', cols: 5, items: [['は','ハ','ha'], ['ひ','ヒ','hi'], ['ふ','フ','fu',['hu']], ['へ','ヘ','he'], ['ほ','ホ','ho']] },
  { id: 'ma', group: 'basic', label: 'ま', cols: 5, items: [['ま','マ','ma'], ['み','ミ','mi'], ['む','ム','mu'], ['め','メ','me'], ['も','モ','mo']] },
  { id: 'ya', group: 'basic', label: 'や', cols: 5, items: [['や','ヤ','ya'], null, ['ゆ','ユ','yu'], null, ['よ','ヨ','yo']] },
  { id: 'ra', group: 'basic', label: 'ら', cols: 5, items: [['ら','ラ','ra'], ['り','リ','ri'], ['る','ル','ru'], ['れ','レ','re'], ['ろ','ロ','ro']] },
  { id: 'wa', group: 'basic', label: 'わ', cols: 5, items: [['わ','ワ','wa'], null, null, null, ['を','ヲ','wo',['o']]] },
  { id: 'n',  group: 'basic', label: 'ん', cols: 5, items: [['ん','ン','n',['nn']]] },

  // ── Zöngés jelek (゛) és a pa-sor (゜) ──
  { id: 'ga', group: 'dakuten', label: 'が', cols: 5, items: [['が','ガ','ga'], ['ぎ','ギ','gi'], ['ぐ','グ','gu'], ['げ','ゲ','ge'], ['ご','ゴ','go']] },
  { id: 'za', group: 'dakuten', label: 'ざ', cols: 5, items: [['ざ','ザ','za'], ['じ','ジ','ji',['zi']], ['ず','ズ','zu'], ['ぜ','ゼ','ze'], ['ぞ','ゾ','zo']] },
  { id: 'da', group: 'dakuten', label: 'だ', cols: 5, items: [['だ','ダ','da'], ['ぢ','ヂ','ji',['di','dji']], ['づ','ヅ','zu',['du','dzu']], ['で','デ','de'], ['ど','ド','do']] },
  { id: 'ba', group: 'dakuten', label: 'ば', cols: 5, items: [['ば','バ','ba'], ['び','ビ','bi'], ['ぶ','ブ','bu'], ['べ','ベ','be'], ['ぼ','ボ','bo']] },
  { id: 'pa', group: 'dakuten', label: 'ぱ', cols: 5, items: [['ぱ','パ','pa'], ['ぴ','ピ','pi'], ['ぷ','プ','pu'], ['ぺ','ペ','pe'], ['ぽ','ポ','po']] },

  // ── Összetett jelek (yōon: kis ゃ ゅ ょ) ──
  { id: 'kya', group: 'combo', label: 'きゃ', cols: 3, items: [['きゃ','キャ','kya'], ['きゅ','キュ','kyu'], ['きょ','キョ','kyo']] },
  { id: 'sha', group: 'combo', label: 'しゃ', cols: 3, items: [['しゃ','シャ','sha',['sya']], ['しゅ','シュ','shu',['syu']], ['しょ','ショ','sho',['syo']]] },
  { id: 'cha', group: 'combo', label: 'ちゃ', cols: 3, items: [['ちゃ','チャ','cha',['tya','cya']], ['ちゅ','チュ','chu',['tyu','cyu']], ['ちょ','チョ','cho',['tyo','cyo']]] },
  { id: 'nya', group: 'combo', label: 'にゃ', cols: 3, items: [['にゃ','ニャ','nya'], ['にゅ','ニュ','nyu'], ['にょ','ニョ','nyo']] },
  { id: 'hya', group: 'combo', label: 'ひゃ', cols: 3, items: [['ひゃ','ヒャ','hya'], ['ひゅ','ヒュ','hyu'], ['ひょ','ヒョ','hyo']] },
  { id: 'mya', group: 'combo', label: 'みゃ', cols: 3, items: [['みゃ','ミャ','mya'], ['みゅ','ミュ','myu'], ['みょ','ミョ','myo']] },
  { id: 'rya', group: 'combo', label: 'りゃ', cols: 3, items: [['りゃ','リャ','rya'], ['りゅ','リュ','ryu'], ['りょ','リョ','ryo']] },
  { id: 'gya', group: 'combo', label: 'ぎゃ', cols: 3, items: [['ぎゃ','ギャ','gya'], ['ぎゅ','ギュ','gyu'], ['ぎょ','ギョ','gyo']] },
  { id: 'ja',  group: 'combo', label: 'じゃ', cols: 3, items: [['じゃ','ジャ','ja',['jya','zya']], ['じゅ','ジュ','ju',['jyu','zyu']], ['じょ','ジョ','jo',['jyo','zyo']]] },
  { id: 'bya', group: 'combo', label: 'びゃ', cols: 3, items: [['びゃ','ビャ','bya'], ['びゅ','ビュ','byu'], ['びょ','ビョ','byo']] },
  { id: 'pya', group: 'combo', label: 'ぴゃ', cols: 3, items: [['ぴゃ','ピャ','pya'], ['ぴゅ','ピュ','pyu'], ['ぴょ','ピョ','pyo']] }
];

const NIHONCORE_KANA_GROUPS = [
  { id: 'basic',   name: 'Alapjelek',       hint: 'あ か さ た な … 46 jel' },
  { id: 'dakuten', name: 'Zöngés jelek',    hint: 'が ざ だ ば ぱ' },
  { id: 'combo',   name: 'Összetett jelek', hint: 'きゃ しゅ ちょ …' }
];

const NIHONCORE_KANA_CONFUSABLE = {
  hiragana: [
    ['さ', 'き', 'ち'], ['は', 'ほ', 'ま'], ['ぬ', 'め', 'ね'], ['わ', 'れ', 'ね'],
    ['る', 'ろ', 'ら'], ['あ', 'お'], ['い', 'り'], ['こ', 'に', 'た'], ['く', 'へ'],
    ['し', 'つ'], ['う', 'ら'], ['け', 'は'], ['す', 'む']
  ],
  katakana: [
    ['シ', 'ツ'], ['ソ', 'ン', 'リ'], ['ク', 'タ', 'ケ'], ['ウ', 'ワ', 'フ'],
    ['コ', 'ユ', 'ヨ'], ['ス', 'ヌ'], ['チ', 'テ'], ['ナ', 'メ'], ['ア', 'マ'],
    ['ノ', 'メ', 'ソ'], ['ヲ', 'ヨ'], ['ル', 'レ']
  ]
};
