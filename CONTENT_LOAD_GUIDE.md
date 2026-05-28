# NihonCore — Tartalom-feltöltési útmutató

> **Ez a dokumentum a legutolsó lépéshez készült.** Amikor készen állsz a végleges
> tartalom-feltöltésre, itt minden szükséges sablon és séma egy helyen van.

---

## 0. Általános tudnivalók

### Hol vannak az adatok?
**NINCS** külön JSON fájl — minden adat a **`data.js`** fájlban van, JavaScript
objektumokként és tömbökként. A séma azonban ugyanolyan strukturált, mintha
JSON lenne.

> 📂 **V7 P3 (2026-05-25) mappa-szervezés után**: a `data.js` mostantól a
> **`js/data.js`** elérési útvonalon van (a projekt root-ban lévő `js/`
> almappában). A többi hivatkozás a doksiban (`data.js → const NIHONCORE_*`)
> a fájl tartalmára utal, nem a path-ra — ez változatlan.

### Hogyan szerkesztsd?
1. Nyisd meg a `js/data.js`-t bármelyik szövegszerkesztőben (VSCode ideális syntax-highlight-tal)
2. Keresd meg a megfelelő tömböt / objektumot (lásd lent fejezetenként)
3. Adj hozzá új sor(oka)t a megadott séma szerint
4. Mentés → frissítsd a böngészőben (Ctrl+Shift+R / hard reload — cache miatt)

### Mire figyelj?
- **JS szintaxis** — minden mező után `,` (kivéve az utolsót egy objektumban — bár ESM-ben ez is OK)
- **Idézőjelek** — string-eknél `'...'` vagy `"..."`, de ne keverj (én végig `'`-t használok)
- **Egyedi `id`-k** — minden új rekordnak egyedi id-t adj (a meglévőkkel nem ütköző)
- **JLPT szint** — csak `'N5'`, `'N4'`, vagy `'N3'` (az `'N2'`/`'N1'` még nincs lobby-szinten unlock-olva)
- **Magyar mező-értékek** — `meaningHu`, `hu`, `nameHu` stb. magyarul, ékezetekkel
- **Romaji konvenció** — Hepburn standard (`shi` nem `si`, `chi` nem `ti`, `tsu` nem `tu`, `fu` nem `hu`)

### Tesztelés feltöltés közben
- Minden 5-10 új rekord után frissíts és játssz le 1-2 kártyát az érintett modulban
- Ha syntax hiba van, a Console (F12) konzolban azonnal megjelenik (`Uncaught SyntaxError: ...`)
- Konzolon próbálj le egy gyors smoke testet, pl. ragozó modul után:
  ```js
  window._conj.conjugate(NIHONCORE_VERBS[NIHONCORE_VERBS.length-1], 'masu')
  ```

---

## 1. Ragozó modul — Igeállomány

📂 **Hol:** `data.js` → keress: `const NIHONCORE_VERBS = [`

### Általános sablon

```javascript
{
  id:          'nomu',          // egyedi azonosító (kis-betűs, mássalhangzó-végű ha lemma kanji)
  kanji:       '飲む',           // kanji + okurigana (display)
  kana:        'のむ',           // teljes hiragana
  romaji:      'nomu',          // Hepburn romaji (lemma, szótári alak)
  group:       'godan',         // 'godan' | 'ichidan' | 'irregular'
  godanFamily: 'mu',            // CSAK godan-nál! 'ku'|'gu'|'su'|'tsu'|'nu'|'bu'|'mu'|'ru'|'u'
  stemKana:    'の',             // lemma kana MINUS utolsó mora
  stemRomaji:  'no',            // lemma romaji MINUS utolsó mora-blokk
  level:       'N5',            // JLPT szint
  meaningHu:   'iszik',         // magyar jelentés (egyszerű ige-alapforma)
  example: {
    jp:     '水を飲みます。',     // példamondat udvarias jelen
    romaji: 'mizu wo nomimasu.',
    hu:     'Vizet iszom.'
  }
}
```

### Hogyan határozd meg a stem-et?

| group | stem-példa | logika |
|---|---|---|
| godan ku | 書く (kaku) → `か` / `ka` | levágod a `く`/`ku`-t |
| godan gu | 泳ぐ (oyogu) → `およ` / `oyo` | levágod a `ぐ`/`gu`-t |
| godan su | 話す (hanasu) → `はな` / `hana` | levágod a `す`/`su`-t |
| godan tsu | 待つ (matsu) → `ま` / `ma` | levágod a `つ`/`tsu`-t |
| godan nu | 死ぬ (shinu) → `し` / `shi` | levágod a `ぬ`/`nu`-t |
| godan bu | 遊ぶ (asobu) → `あそ` / `aso` | levágod a `ぶ`/`bu`-t |
| godan mu | 飲む (nomu) → `の` / `no` | levágod a `む`/`mu`-t |
| godan ru | 帰る (kaeru) → `かえ` / `kae` | levágod a `る`/`ru`-t |
| godan u (vokális) | 買う (kau) → `か` / `ka` | levágod a `う`/`u`-t |
| ichidan | 食べる (taberu) → `たべ` / `tabe` | levágod a `る`/`ru`-t |
| irregular | する → `''` (üres) | hard-coded, üres stem |

### Speciális eset 1: Ál-Ichidan (〜る végű Godan)

Ezek **látszólag** Ichidan-nak tűnnek (〜る végűek), de **Godan**-ok!
Pl. 帰る (kaeru, hazamegy) NEM 食べる (taberu, eszik) szerinti ragozású.

Példa rekord:
```javascript
{
  id: 'kaeru_g',                // 'g' suffix elkülöníti más kaeru-tól (pl. 変える Ichidan)
  kanji: '帰る', kana: 'かえる', romaji: 'kaeru',
  group: 'godan', godanFamily: 'ru',
  stemKana: 'かえ', stemRomaji: 'kae',
  pseudoIchidan: true,          // FONTOS: jelöld true-val!
  level: 'N5', meaningHu: 'hazamegy',
  example: { jp: '家に帰ります。', romaji: 'ie ni kaerimasu.', hu: 'Hazamegyek.' }
}
```

**Ismert ál-Ichidanok (Dekiru 1+2 + JLPT N5-N3 mag):**
`kaeru` (帰る), `hashiru` (走る), `kiru` (切る), `iru` (要る), `hairu` (入る),
`shiru` (知る), `kagiru` (限る), `chiru` (散る), `suberu` (滑る), `shaberu` (喋る),
`mairu` (参る), `niru` (似る? — vigyázz, ez Ichidan), `keru` (蹴る — godan!), `meiru` (滅入る).

⚠️ **Csapdák:**
- `kiru` (切る, vág) Godan VS. `kiru` (着る, felvesz) Ichidan
- `iru` (要る, kell) Godan VS. `iru` (いる, van/élő létezik) Ichidan — szándékosan kiterjedt
- `niru` (似る, hasonlít) Ichidan, NEM Godan

→ Ezeknél az `id`-be `_g` / `_i` suffix kerüljön (pl. `kiru_g` és `kiru_i`).

### Speciális eset 2: Rendhagyó te-formák

Csak az **行く (iku)** ilyen az alap N5-N3 készletben.

```javascript
{
  id: 'iku', kanji: '行く', kana: 'いく', romaji: 'iku',
  group: 'godan', godanFamily: 'ku',
  stemKana: 'い', stemRomaji: 'i',
  irregularTe: true,             // FONTOS! Ezért nem いいて, hanem 行って (itte)
  level: 'N5', meaningHu: 'megy',
  example: { jp: '学校へ行きます。', romaji: 'gakkou e ikimasu.', hu: 'Iskolába megyek.' }
}
```

**ÉS** hozzá kell adni külön a `NIHONCORE_VERB_EXCEPTIONS.irregularTe` objektumhoz:
```javascript
const NIHONCORE_VERB_EXCEPTIONS = {
  // ...
  irregularTe: {
    'iku': { te: { kana:'いって', romaji:'itte' }, ta: { kana:'いった', romaji:'itta' } },
    // Új rendhagyó te-forma → ide add hozzá
  }
};
```

### Speciális eset 3: Rendhagyó igék (Group 3)

Csak `suru` (する, csinál) és `kuru` (来る, jön) tartoznak ide. **Új ilyen ige
hozzáadása kerülendő** — ha lenne, akkor:
1. A `NIHONCORE_VERBS`-be: `group: 'irregular'`, üres `stemKana`/`stemRomaji`
2. **MINDEN** formáját hard-coded-olni kell a `NIHONCORE_IRREGULAR_FORMS`-ban
3. Sok munka — kerülendő ha lehet

### Ajánlott prioritás-sorrend feltöltéskor

**Tier 1 — N5 mag (kb. 50-60 ige):**
- Kihagyhatatlan godanok minden családból (legalább 5 család × 3-4 ige)
- Top-15 Ichidan
- (suru/kuru már bent van)
- 5-7 ál-Ichidan a fenti listából

**Tier 2 — N4 mag (+kb. 30-40 ige):**
- Pszichológiai / cselekvési igék
- Több vokális tövű (u-családú)

**Tier 3 — N3 (+kb. 30-50):**
- Igekötős és kompozit (お〜する, させていただく előfordulása)

---

## 2. Melléknév modul — i-melléknév állomány

📂 **Hol:** `data.js` → `const NIHONCORE_I_ADJECTIVES = [`

### Sablon — normál i-melléknév

```javascript
{
  id:         'ookii',
  kanji:      '大きい',          // kanji + okurigana
  kana:       'おおきい',
  romaji:     'ookii',          // Hepburn
  type:       'i-adj',          // FIXEN 'i-adj'
  level:      'N5',
  meaningHu:  'nagy',
  stemKana:   'おおき',           // lemma kana MINUS utolsó 'い'
  stemRomaji: 'ooki',            // lemma romaji MINUS utolsó 'i'
  example: {
    jp:     '大きい家です。',
    romaji: 'ookii ie desu.',
    hu:     'Egy nagy ház.'
  }
}
```

### Speciális eset: いい (ii) — KIVÉTEL

Az `いい` minden ragozott alakja a **yoi/よい** alapján képződik (NEM ii-ből).
Tehát: `よくない` / `よかった` / `よくなかった`, de `いいです` (jelen állító
megmarad ii-nek).

```javascript
{
  id: 'ii', kanji: 'いい', kana: 'いい', romaji: 'ii',
  type: 'i-adj', level: 'N5',
  meaningHu: 'jó',
  stemKana: 'い', stemRomaji: 'i',                    // present_aff-hoz (ii-alapú)
  canonicalStemKana: 'よ', canonicalStemRomaji: 'yo',  // minden más formához (yoi-alapú)
  exception: true,                                     // FONTOS jelzés
  example: { jp: 'これはいいです。', romaji: 'kore wa ii desu.', hu: 'Ez jó.' }
}
```

⚠️ **Más i-adj kivétel a starter-szettben nincs.** A jövőben felmerülhet pl.
`omoshiroi`-ra szabálytalanság, de a standard N5-N4-N3 i-mellékneveknél
nincs több exception.

### Ajánlott i-adj feltöltés prioritás

**Tier 1 — N5 mag (kb. 25 i-adj):**
nagy/kicsi, új/régi, jó/rossz, meleg/hideg, magas/alacsony, hosszú/rövid,
gyors/lassú, könnyű/nehéz, drága/olcsó, érdekes/unalmas, finom/finomatlan,
világos/sötét, közeli/távoli, foglalt/szabad.

**Tier 2 — N4 (+kb. 15-20):**
gyengébb-szótár ige-szerű i-adjok, érzelmi melléknevek.

**Tier 3 — N3 (+kb. 15-25):**
összetett és abstrakt mellléknevek.

---

## 3. Melléknév modul — na-melléknév állomány

📂 **Hol:** `data.js` → `const NIHONCORE_NA_ADJECTIVES = [`

### Sablon

```javascript
{
  id:         'kirei',
  kanji:      'きれい',          // lehet kanji (綺麗) vagy csak kana
  kana:       'きれい',
  romaji:     'kirei',
  type:       'na-adj',         // FIXEN 'na-adj'
  level:      'N5',
  meaningHu:  'szép, tiszta',
  stemKana:   'きれい',          // ⚠️ na-adj: stem = TELJES lemma (NEM minus 'i'/'na')
  stemRomaji: 'kirei',
  note:       'い-végű, de na-melléknév — gyakori csapda!',  // OPCIONÁLIS, csapdás eseteknek
  example: {
    jp:     'きれいな花です。',
    romaji: 'kirei na hana desu.',
    hu:     'Egy szép virág.'
  }
}
```

### ⚠️ Csapda-figyelmeztetők (`note` mezővel jelöld):

- **kirei** (きれい) — `い`-re végződik, de na-adj
- **kirai** (嫌い) — `い`-re végződik, de na-adj
- **yuumei** (有名) — `い`-re végződik, de na-adj
- **teinei** (丁寧) — `い`-re végződik, de na-adj
- **kantan** (簡単) — szabályos, de fiatal tanulóknál hibázható
- **suki** (好き) / **kirai** (嫌い) — gyakorlatban `が`-val állnak nem `を`-val

### Ajánlott na-adj feltöltés

**Tier 1 — N5 (kb. 20 na-adj):**
szép, egészséges, kedves, híres, egyszerű, csodálatos, kedvelt, utált, élénk,
csendes, szabad (idő), büszke, gazdag, szegény, fontos, szükséges, biztonságos.

**Tier 2 — N4 (+15):** komplexebb melléknevek (kompetens, hiteles, megbízható)

**Tier 3 — N3 (+15-20):** abstrakt fogalmak

---

## 4. Mondat-Mester — Mondatállomány

📂 **Hol:** `data.js` → `const NIHONCORE_SENTENCES = [`

### Sablon

```javascript
{
  id: 's_n5_001',                  // formátum: 's_<szint>_<sorszám>'
  level: 'N5',                     // 'N5' | 'N4' | 'N3'
  translation: 'Én sushit eszem.',  // teljes magyar fordítás
  tokens: [
    { type: 'word',     jp: '私',     romaji: 'watashi',  hu: 'én' },
    { type: 'particle', jp: 'は',     romaji: 'wa',       role: 'topic' },
    { type: 'word',     jp: '寿司',   romaji: 'sushi',    hu: 'sushi' },
    { type: 'particle', jp: 'を',     romaji: 'wo',       role: 'object' },
    { type: 'verb',     jp: '食べます', romaji: 'tabemasu', hu: 'eszem' }
  ],
  metadata: {
    function: 'Affirmative',   // 'Affirmative' | 'Negative' | 'Question'
    form:     'Masu',           // 'Masu' | 'Plain' | 'Te' | 'Nai' | 'Ta'
    tense:    'Non-Past',       // 'Non-Past' | 'Past' | 'Progressive'
    register: 'Polite'          // 'Polite' | 'Casual' | 'Honorific'
  }
}
```

### Token-típusok

| `type` | Mit jelent | Kötelező mezők | Példa |
|---|---|---|---|
| `word` | főnév, melléknév, határozó | `jp`, `romaji`, `hu` | `{ type:'word', jp:'寿司', romaji:'sushi', hu:'sushi' }` |
| `particle` | partikula | `jp`, `romaji`, `role` (NEM `hu`!) | `{ type:'particle', jp:'を', romaji:'wo', role:'object' }` |
| `verb` | ige (a mondat végén) | `jp`, `romaji`, `hu` | `{ type:'verb', jp:'食べます', romaji:'tabemasu', hu:'eszem' }` |

### Particle role-ok

`topic` (は) · `subject` (が) · `object` (を) · `location` (に statikus, で cselekvési)
· `goal` (に célpont) · `direction` (へ irány) · `tool` (で eszköz) · `companion` (と) ·
`possession` (の)

### Opcionális token-mezők

- `semantic: 'time'` — idő-határozónál (pl. `昨日 kinou`, `明日 ashita`) — engedi a flexibilis pozíciót a puzzle-validátorban
- Egyéb `semantic` érték még nincs használva, de bővíthető

### Mondat-puzzle szabály

A validátor automatikusan ellenőrzi:
- Az ige **a mondat végén** kell legyen
- Partikulának kell **főnév/szó** előzze meg
- Két nem-`の` partikula nem állhat egymás után
- Frázis-permutáció elfogadott (pl. téma-tárgy felcserélhetők)

### Ajánlott bővítés

**Tier 1 — N5 +30 mondat:** napi élet, család, hobbi, étel, mozgás
**Tier 2 — N4 +20 mondat:** Te-forma változatok, kérés, tagadás, Tai
**Tier 3 — N3 +30 mondat:** Komplex aspektusok (てしまう, ておく, ことがある, ほうがいい)

---

## 5. Számláló Szavak — Item-állomány

📂 **Hol:** `data.js` → `const NIHONCORE_COUNTER_ITEMS = [`

### Sablon

```javascript
{
  id:         'ringo',          // egyedi azonosító
  nameHu:     'alma',           // magyar
  nameJp:     'りんご',          // japán (kana vagy kanji)
  emoji:      '🍎',
  minLevel:   'N5',
  primary:    'tsu',            // a fő counter ID (NIHONCORE_COUNTERS kulcsa)
  alternatives: ['hon']         // OPCIONÁLIS — alternatív elfogadott counter(ek)
}
```

### Counter ID-k (NIHONCORE_COUNTERS-ben definiált)

`tsu` (általános, つ) · `nin` (emberek, 人) · `mai` (lapos tárgyak, 枚) ·
`hon` (hosszú-vékony, 本) · `satsu` (kötött dolgok, 冊) · `soku` (lábbelik, 足) ·
`dai` (gépek, járművek, 台)

### Alternativák — mikor használjuk?

Ha egy tárgyhoz több counter is elfogadott:
```javascript
{ id: 'pen', nameHu: 'toll', nameJp: 'ペン', emoji: '🖊️',
  minLevel: 'N5', primary: 'hon', alternatives: ['tsu'] }
// hon = formálisabb, tsu = általános/laza
```

### Új counter hozzáadása

Ha bővíteni akarjuk a counter-választékot (pl. `匹 hiki` állatokhoz):

**1. lépés:** Új counter a `NIHONCORE_COUNTERS` objektumba:
```javascript
hiki: {
  id: 'hiki', jp: '匹', romaji: 'hiki',
  nameHu: 'kis állatok (kutya, macska, hal)',
  emoji: '🐱',
  description: 'Kis és közepes állatok számolása. 1, 3, 6, 8, 10 sokuon-átalakulás.',
  readings: {
    1:  { kana: 'いっぴき',  romaji: 'ippiki',  irregular: true,  changeType: 'sokuon-p' },
    2:  { kana: 'にひき',    romaji: 'nihiki',  irregular: false },
    3:  { kana: 'さんびき',  romaji: 'sanbiki', irregular: true,  changeType: 'rendaku-b' },
    4:  { kana: 'よんひき',  romaji: 'yonhiki', irregular: false },
    5:  { kana: 'ごひき',    romaji: 'gohiki',  irregular: false },
    6:  { kana: 'ろっぴき',  romaji: 'roppiki', irregular: true,  changeType: 'sokuon-p' },
    7:  { kana: 'ななひき',  romaji: 'nanahiki', irregular: false },
    8:  { kana: 'はっぴき',  romaji: 'happiki', irregular: true,  changeType: 'sokuon-p' },
    9:  { kana: 'きゅうひき', romaji: 'kyuuhiki', irregular: false },
    10: { kana: 'じゅっぴき', romaji: 'juppiki', irregular: true,  changeType: 'sokuon-p' }
  }
}
```

**2. lépés:** Hozzá kell adni egy kategóriához a `NIHONCORE_COUNTER_CATEGORIES`-ben:
```javascript
{ id: 'living', nameHu: 'Élőlények', emoji: '🐾', counters: ['nin', 'hiki'] }
//                                                            ^^^^^^^^ új!
```

**3. lépés:** Új `changeType` érték (ha van) → `explainChange` switch-be (`app.js`-ben).

### changeType értékek (counter-readings.irregular kíséretében)

- `sokuon-p` — kis tsu + p (いっぽん, ろっぽん)
- `sokuon-s` — kis tsu + s (いっさつ, はっさつ)
- `rendaku-b` — h → b (さんぼん)
- `rendaku-z` — s → z (さんぞく)
- `native` — natív japán számolási mód (ひとつ, ふたつ)
- `yo-form` — 4-es előtt よ (よにん)

### Ajánlott bővítés

**Item-bővítés (NIHONCORE_COUNTER_ITEMS) — Tier 1:**
- Minden meglévő counterhez +3-5 item (jelenleg 33, cél 60-70)
- Pl. tsu: + édesség, gyümölcs, kérdés
- Pl. mai: + póló, papírlap, ablak
- Pl. hon: + üveg, fa, út

**Counter-bővítés (NIHONCORE_COUNTERS) — Tier 2:**
- 匹 hiki (kis állatok)
- 杯 hai (italok / pohár)
- 階 kai (emeletek)
- 回 kai (alkalmak)
- 個 ko (kis tárgyak — alternatíva a tsu-hoz)

---

## 5b. Dátum & Idő modul — bejegyzések (V2.3)

📂 **Hol:** `data.js` → `NIHONCORE_DT_MONTHS`, `NIHONCORE_DT_DAYS`,
`NIHONCORE_DT_WEEKDAYS`, `NIHONCORE_DT_TIMES`

### Közös séma (mind a 4 kategória)

```javascript
{
  id:        'd14',            // egyedi azonosító
  num:       14,               // szám (months/days/times-nál; weekdays-nál nincs)
  kanji:     '14日',           // megjelenített forma
  kana:      'じゅうよっか',    // teljes hiragana olvasat
  romaji:    'juuyokka',       // Hepburn romaji
  meaningHu: 'tizennegyedike', // magyar jelentés
  irregular: true,             // OPCIONÁLIS — true ha rendhagyó olvasat
  changeType:'native'          // OPCIONÁLIS — 'native' a napoknál
}
```

### NIHONCORE_DT_MONTHS — hónapok (12, már teljes)

Mind a 12 hónap **megvan**. Bővítés nem kell. Megjegyzés a rendhagyókra:
`4月 = しがつ`, `7月 = しちがつ`, `9月 = くがつ` — ezek `irregular: true`.

### NIHONCORE_DT_DAYS — hónap napjai

⚠️ **Ez a legkritikusabb rész.** A starter szettben 1-15 + 20 + 24 van.
A teljes feltöltéskor a hiányzó napokat kell hozzáadni: **16-19, 21-23, 25-31**.

A rendhagyó (native) olvasatok mind benne vannak a starterben. A hiányzók
**szabályosak** — minta: `<szám-kana>` + `にち`:
```javascript
{ id: 'd16', num: 16, kanji: '16日', kana: 'じゅうろくにち', romaji: 'juurokunichi', meaningHu: 'tizenhatodika' },
{ id: 'd25', num: 25, kanji: '25日', kana: 'にじゅうごにち', romaji: 'nijuugonichi', meaningHu: 'huszonötödike' },
```
**KIVÉTEL:** a `14日` és `24日` rendhagyó (`じゅうよっか`, `にじゅうよっか`) — ezek MÁR benne vannak.

### NIHONCORE_DT_WEEKDAYS — hét napjai (7, már teljes)

Mind a 7 megvan. Bővítés nem kell. `short` mező = a rövid kanji (月/火/...).

### NIHONCORE_DT_TIMES — időpontok

Starter: egész órák 1-12 + pár félóra. Bővítéskor:
- Hiányzó félórák (1時半, 2時半, 4時半, 6時半, 8時半, 11時半)
- Percek (V2.3 P2 új engine kell hozzá — NE adj most perceket, mert a P2 motor fogja kezelni)
- `4時/7時/9時` rendhagyó (`よじ`, `しちじ`, `くじ`) — `irregular: true`

```javascript
{ id: 't2h', kanji: '2時半', kana: 'にじはん', romaji: 'niji han', meaningHu: '2:30' },
```

### V2.3 P2 — haladó kategóriák (már léteznek)

A V2.3 P2 óta 4 további kategória van. Mind ugyanazt a közös sémát használja:

- **`NIHONCORE_DT_HOURS24`** — 24 órás idő (13時-24時) + 午前/午後. Starter: 14 elem.
  Bővítés: hiányzó 23時. AM/PM összetett elemeknél `composite: true` (a Build mód kihagyja).
- **`NIHONCORE_DT_MINUTES`** — percek. Starter: 1-10 + 15/20/30. Bővítés: 11-14, 16-19, 21-29,
  35/40/45/50/55. ⚠️ A rendaku/sokuon rendhagyók (`いっぷん`/`さんぷん`/`よんぷん`/`ろっぷん`/
  `はっぷん`/`じゅっぷん`) `irregular: true` + `changeType: 'sokuon-p'` v. `'rendaku-p'`.
- **`NIHONCORE_DT_YEARS`** — évek. Starter: 10. Bővítés: több kerek év + imperial (`imperial: true`).
- **`NIHONCORE_DT_RELATIVE`** — relatív kifejezések (前/後/過ぎ/くらい/頃). Starter: 12.

### Új kategória hozzáadása

Ha új kategória kell: új tömb a `data.js`-be + bejegyzés a
`NIHONCORE_DT_CATEGORIES`-be + `categoryDataset()` switch-bővítés (`app.js`).
Az engine (Recognition + Mastery) **automatikusan kezeli**. Build módhoz a
`computeBuildParts()` függvényt is bővíteni kell, ha az új kategória építhető.

---

## 5c. Hallás & Kiejtés modul — audió-leckék (V3)

📂 **Hol:** `data.js` → `NIHONCORE_AUDIO_LESSONS`

### Sablon

```javascript
{
  id:        'au_d14',         // egyedi azonosító
  text:      'じゅうよっか',    // kana — EZT mondja a TTS, és EZT ismeri fel a user
  romaji:    'juuyokka',       // Hepburn
  meaningHu: '14. (nap)',      // magyar jelentés
  category:  'date',           // 'date'|'time'|'verb'|'adj'|'pair'
  difficulty:'beginner',       // 'beginner'|'intermediate'|'advanced'
  traps:     ['long_vowel'],   // audió-csapda tag-ek (üres tömb is OK)
  pairWith:  'au_p_xxx'        // OPCIONÁLIS — minimal-pair partner id
}
```

### Fontos tudnivalók

- A **`text`** mező a kana — ezt küldi a `NihonCoreAudio` a Google TTS-nek, ÉS
  ez a felismerendő forma. Mindig helyes, természetes kana legyen.
- **`traps`** értékek: `long_vowel` (hosszú magánhangzó), `sokuon` (kis っ),
  `mora` (mora-eltérés). Csak akkor tölts, ha valódi audió-csapdája van.
- **Minimal pairs:** ezek a modul pedagógiai magja. Két lecke kölcsönösen
  hivatkozik egymásra `pairWith`-en, és KÖZÖS `traps` taget kapnak. A `diagnoseAudio`
  ebből tudja, hogy a pár-tévesztés long_vowel / sokuon / mora hiba.
  Példa pár:
  ```javascript
  { id:'au_p_oto',  text:'おと',   ..., category:'pair', traps:['sokuon'], pairWith:'au_p_otto' },
  { id:'au_p_otto', text:'おっと', ..., category:'pair', traps:['sokuon'], pairWith:'au_p_oto' },
  ```
- **`difficulty`** határozza meg a playback-sebességet (beginner 0.75× … advanced 1.0×).

### Bővítés

- Több minimal-pair (a legértékesebb): hosszú/rövid, kis っ, mora kontrasztok
- Több date/time/verb/adj lecke — vagy hosszabb kifejezések (intermediate/advanced)
- Új kategória: új `category` érték + bejegyzés a `NIHONCORE_AUDIO_CATEGORIES` map-be

⚠️ A TTS hossz-limit ~200 karakter — rövid szavak/kifejezések ideálisak.

---

## 6. Validálási checklist (feltöltés után)

Mielőtt elmented + commitálsz, ellenőrizd:

### Szintaxis
- [ ] Nincs hiányzó vessző az objektumok között
- [ ] Nincs idézőjel-konfliktus (`'`-on belüli `'` escape nélkül)
- [ ] A `data.js` betölthető — Console (F12) nem mutat `SyntaxError`-t
- [ ] Egyetlen modul-oldal megnyithatóa böngészőből

### Adatintegritás
- [ ] Minden új rekord `id`-je egyedi (`grep` segíthet)
- [ ] Stem kana + suffix kana = teljes lemma (igéknél, mellékneveknél)
- [ ] Romaji Hepburn-konzisztens (`shi` nem `si`, `chi` nem `ti`, `tsu` nem `tu`, `fu` nem `hu`, dupla magánhangzó pl. `ookii` nem `oki`)
- [ ] Ál-Ichidanok `pseudoIchidan: true` flag-gel
- [ ] Rendhagyó te-formák `irregularTe: true` flag + `NIHONCORE_VERB_EXCEPTIONS.irregularTe`-ben rekord
- [ ] `meaningHu` mezők magyarul, természetes szóhasználattal (nem szótári-merev)

### Funkcionális tesztek
- [ ] Ragozó modul: bárkit kiválasztva minden bekapcsolt forma helyes alakot ad (kézi teszt 3-4 ige × 3-4 forma)
- [ ] Melléknév modul: i-adj és na-adj is helyes ragozás minden formára
- [ ] Mondat-Mester: új mondatok mind a 3 szinten elérhetők lobby-ban (jó kombinációknál)
- [ ] Számláló: új item megjelenik a Recognition + Hybrid + Mastery módban

### Konzol-smoke-test snippet (másold be a Console-ba a megfelelő oldalon)

**Ragozó:**
```javascript
NIHONCORE_VERBS.forEach(v => {
  const out = window._conj.conjugate(v, 'masu');
  console.log(`${v.romaji} + masu → ${out ? out.romaji : 'NULL'}`);
});
```

**Melléknév:**
```javascript
[...NIHONCORE_I_ADJECTIVES, ...NIHONCORE_NA_ADJECTIVES].forEach(a => {
  const form = a.type === 'i-adj' ? 'i_past_affirmative' : 'na_present_negative';
  const out = window._adj.composeAdj(a, form);
  console.log(`${a.romaji} + ${form} → ${out ? out.romaji : 'NULL'}`);
});
```

---

## 7. Mennyiségi célok (referencia)

Ha egy "teljes" v1.0-szerű kiadásra törekszel, ezek a számok megfelelők:

| Modul | Jelenleg (starter) | "Teljes" v1.0 (cél) |
|---|---|---|
| Igeállomány | 14 | ~150 (N5: 60, N4: 50, N3: 40) |
| i-melléknév | 8 | ~50 (N5: 25, N4: 15, N3: 10) |
| na-melléknév | 10 | ~40 (N5: 20, N4: 12, N3: 8) |
| Mondat-Mester | 24 | ~120 (N5: 50, N4: 35, N3: 35) |
| Counter item-ek | 33 | ~70 (mindenhez 8-10 item) |
| Counter számláló | 7 | ~15 (+hiki, hai, kai-floor, kai-times, ko, ki/táncos, ban stb.) |
| Dátum: hónapok | 12 | 12 (teljes) |
| Dátum: napok | 17 | 31 (a hiányzó 16-19, 21-23, 25-31) |
| Dátum: hétnapok | 7 | 7 (teljes) |
| Dátum: időpontok | 18 | ~30 (több félóra) |
| Dátum: 24h idő | 14 | 14-16 (közel teljes) |
| Dátum: percek | 13 | ~25 (a hiányzó 11-14, 16-19, 21-29, 35-55) |
| Dátum: évek | 10 | ~25 (több kerek év + imperial) |
| Dátum: relatív idő | 12 | ~25 (több 前/後/過ぎ/くらい/頃 kombináció) |
| Audió-leckék | 38 | ~120 (több minimal pair + hosszabb kifejezések) |

Ez egy **alsó középső** méret — valós Dekiru 1+2 lefedettséghez. Tovább bővíthető
JLPT N2-N1 felé (akkor a lobby-ban a locked chip-ek is el kell hárulniuk).

---

## 8. Gyakran ismételt kérdések

**Q: Ha egy ige két ragozási csoportba is tartozhat (pl. `kiru` 切る godan / 着る ichidan), hogyan?**
A: Két különböző `id`-vel: `kiru_g` és `kiru_i`. Mindkettő külön rekord.

**Q: Melyik mező az "official label" — kanji vagy kana?**
A: A `kanji` mező az **elsődleges display** (kanji + okurigana). A `kana` a teljes hiragana, a `romaji` a Hepburn. Mind a háromnak ki kell legyen töltve.

**Q: Mi a teendő, ha egy melléknév csak kanaként létezik (nincs kanjija)?**
A: A `kanji` mezőbe is a kanát írd. Pl. `kirei` esetén a `kanji: 'きれい'` (NEM `'綺麗'`, mert ritkán használt).

**Q: Hogy adok hozzá új JLPT szintet (N2/N1)?**
A: A `level` mezőbe írd be `'N2'` vagy `'N1'`. A lobby-ban viszont a `pl-l-locked` chip-eket fel kell oldani (`app.js` ill. `practice.html` HTML-ben). Ez **több helyen** kell változzon — szólj amikor készülsz, és koordinálunk.

**Q: Mi a teendő, ha valaki ragaszkodik egy meglévő ige új jelentéséhez?**
A: A `meaningHu` magyar leírást **természetes magyar nyelven** írd, akár vesszővel több jelentést is. Pl. `'meleg (időjárás), forró (tárgy)'`. A tanulónak a fő jelentést tedd előre.

---

## 9. A „nagy load" forgatókönyv

Amikor készen állsz, a következő sorrendet javaslom:

1. **Backup**: clone-old a repót vagy mentsd külön a `data.js`-t
2. **1 modul / kör**: ne tölts mindent egyszerre — egy modult egészben, tesztelj, commit, és csak utána a következő
3. **5-10 rekord / mentés**: minden 5-10 hozzáadott után frissítsd a böngészőt és próbáld ki
4. **Konzol-teszt**: futtasd le a fenti smoke-test-eket
5. **Lobby teljes-szám**: nézd meg a lobby-ban a "Lehetséges kombinációk" számláló logikusan nő-e
6. **Commit**: külön commit minden modul után (pl. `feat(data): N5 verb pack +50 items`)

---

**Bekerült:** 2026-05-12. Frissítendő ha a modul-séma változik.
