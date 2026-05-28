/* ====================================================
   ── 6) DATE & TIME (Dátum & Idő) modul — V2.3 FULL ─
   ────────────────────────────────────────────────────
   日時モジュール — japán dátum- és időkezelés.

   Változások a STARTER-hez képest:
     • NIHONCORE_DT_DAYS     → kiegészítve 16-19, 21-23, 25-31
     • NIHONCORE_DT_TIMES    → kiegészítve az összes félórával
     • NIHONCORE_DT_HOURS24  → hozzáadva 23時
     • NIHONCORE_DT_MINUTES  → teljes: 1-30 + 35/40/45/50/55
     • NIHONCORE_DT_YEARS    → bővített kerek évek + imperial
     • NIHONCORE_DT_RELATIVE → bővített relatív kifejezések
   ==================================================== */


// ── 1. HÓNAPOK — mind a 12 (változatlan, teljes volt) ─────────────────────────

const NIHONCORE_DT_MONTHS = [
  { id: 'm1',  num: 1,  kanji: '1月',  kana: 'いちがつ',       romaji: 'ichigatsu',    meaningHu: 'január' },
  { id: 'm2',  num: 2,  kanji: '2月',  kana: 'にがつ',         romaji: 'nigatsu',      meaningHu: 'február' },
  { id: 'm3',  num: 3,  kanji: '3月',  kana: 'さんがつ',       romaji: 'sangatsu',     meaningHu: 'március' },
  { id: 'm4',  num: 4,  kanji: '4月',  kana: 'しがつ',         romaji: 'shigatsu',     meaningHu: 'április',    irregular: true },
  { id: 'm5',  num: 5,  kanji: '5月',  kana: 'ごがつ',         romaji: 'gogatsu',      meaningHu: 'május' },
  { id: 'm6',  num: 6,  kanji: '6月',  kana: 'ろくがつ',       romaji: 'rokugatsu',    meaningHu: 'június' },
  { id: 'm7',  num: 7,  kanji: '7月',  kana: 'しちがつ',       romaji: 'shichigatsu',  meaningHu: 'július',     irregular: true },
  { id: 'm8',  num: 8,  kanji: '8月',  kana: 'はちがつ',       romaji: 'hachigatsu',   meaningHu: 'augusztus' },
  { id: 'm9',  num: 9,  kanji: '9月',  kana: 'くがつ',         romaji: 'kugatsu',      meaningHu: 'szeptember', irregular: true },
  { id: 'm10', num: 10, kanji: '10月', kana: 'じゅうがつ',     romaji: 'juugatsu',     meaningHu: 'október' },
  { id: 'm11', num: 11, kanji: '11月', kana: 'じゅういちがつ', romaji: 'juuichigatsu', meaningHu: 'november' },
  { id: 'm12', num: 12, kanji: '12月', kana: 'じゅうにがつ',   romaji: 'juunigatsu',   meaningHu: 'december' }
];


// ── 2. HÓNAP NAPJAI — TELJES (1-31) ───────────────────────────────────────────
// ⚠️ Rendhagyó (native) olvasatok: 1-10, 14, 20, 24 — ezek mind irregular: true
// A többi (11-13, 15-19, 21-23, 25-31) szabályos: szám-kana + にち

const NIHONCORE_DT_DAYS = [
  // ── 1-10: mind rendhagyó (native japán számolás) ──
  { id: 'd1',  num: 1,  kanji: '1日',  kana: 'ついたち',           romaji: 'tsuitachi',      meaningHu: 'elseje',           irregular: true, changeType: 'native' },
  { id: 'd2',  num: 2,  kanji: '2日',  kana: 'ふつか',             romaji: 'futsuka',        meaningHu: 'másodika',         irregular: true, changeType: 'native' },
  { id: 'd3',  num: 3,  kanji: '3日',  kana: 'みっか',             romaji: 'mikka',          meaningHu: 'harmadika',        irregular: true, changeType: 'native' },
  { id: 'd4',  num: 4,  kanji: '4日',  kana: 'よっか',             romaji: 'yokka',          meaningHu: 'negyedike',        irregular: true, changeType: 'native' },
  { id: 'd5',  num: 5,  kanji: '5日',  kana: 'いつか',             romaji: 'itsuka',         meaningHu: 'ötödike',          irregular: true, changeType: 'native' },
  { id: 'd6',  num: 6,  kanji: '6日',  kana: 'むいか',             romaji: 'muika',          meaningHu: 'hatodika',         irregular: true, changeType: 'native' },
  { id: 'd7',  num: 7,  kanji: '7日',  kana: 'なのか',             romaji: 'nanoka',         meaningHu: 'hetedike',         irregular: true, changeType: 'native' },
  { id: 'd8',  num: 8,  kanji: '8日',  kana: 'ようか',             romaji: 'youka',          meaningHu: 'nyolcadika',       irregular: true, changeType: 'native' },
  { id: 'd9',  num: 9,  kanji: '9日',  kana: 'ここのか',           romaji: 'kokonoka',       meaningHu: 'kilencedike',      irregular: true, changeType: 'native' },
  { id: 'd10', num: 10, kanji: '10日', kana: 'とおか',             romaji: 'tooka',          meaningHu: 'tizedike',         irregular: true, changeType: 'native' },

  // ── 11-13: szabályos ──
  { id: 'd11', num: 11, kanji: '11日', kana: 'じゅういちにち',     romaji: 'juuichinichi',   meaningHu: 'tizenegyedike' },
  { id: 'd12', num: 12, kanji: '12日', kana: 'じゅうににち',       romaji: 'juuninichi',     meaningHu: 'tizenkettedike' },
  { id: 'd13', num: 13, kanji: '13日', kana: 'じゅうさんにち',     romaji: 'juusannichi',    meaningHu: 'tizenharmadika' },

  // ── 14: rendhagyó (よっか) ──
  { id: 'd14', num: 14, kanji: '14日', kana: 'じゅうよっか',       romaji: 'juuyokka',       meaningHu: 'tizennegyedike',   irregular: true, changeType: 'native' },

  // ── 15: szabályos ──
  { id: 'd15', num: 15, kanji: '15日', kana: 'じゅうごにち',       romaji: 'juugonichi',     meaningHu: 'tizenötödike' },

  // ── 16-19: szabályos — ÚJ ──
  { id: 'd16', num: 16, kanji: '16日', kana: 'じゅうろくにち',     romaji: 'juurokunichi',   meaningHu: 'tizenhatodika' },
  { id: 'd17', num: 17, kanji: '17日', kana: 'じゅうしちにち',     romaji: 'juushichinichi', meaningHu: 'tizenhetedike' },
  { id: 'd18', num: 18, kanji: '18日', kana: 'じゅうはちにち',     romaji: 'juuhachinichi',  meaningHu: 'tizennyolcadika' },
  { id: 'd19', num: 19, kanji: '19日', kana: 'じゅうくにち',       romaji: 'juukunichi',     meaningHu: 'tizenkilencedike' },

  // ── 20: rendhagyó (はつか) ──
  { id: 'd20', num: 20, kanji: '20日', kana: 'はつか',             romaji: 'hatsuka',        meaningHu: 'huszadika',        irregular: true, changeType: 'native' },

  // ── 21-23: szabályos — ÚJ ──
  { id: 'd21', num: 21, kanji: '21日', kana: 'にじゅういちにち',   romaji: 'nijuuichinichi', meaningHu: 'huszonegyedike' },
  { id: 'd22', num: 22, kanji: '22日', kana: 'にじゅうににち',     romaji: 'nijuuninichi',   meaningHu: 'huszonkettedike' },
  { id: 'd23', num: 23, kanji: '23日', kana: 'にじゅうさんにち',   romaji: 'nijuusannichi',  meaningHu: 'huszonharmadika' },

  // ── 24: rendhagyó (にじゅうよっか) ──
  { id: 'd24', num: 24, kanji: '24日', kana: 'にじゅうよっか',     romaji: 'nijuuyokka',     meaningHu: 'huszonnegyedike',  irregular: true, changeType: 'native' },

  // ── 25-31: szabályos — ÚJ ──
  { id: 'd25', num: 25, kanji: '25日', kana: 'にじゅうごにち',     romaji: 'nijuugonichi',   meaningHu: 'huszonötödike' },
  { id: 'd26', num: 26, kanji: '26日', kana: 'にじゅうろくにち',   romaji: 'nijuurokunichi', meaningHu: 'huszonhatodika' },
  { id: 'd27', num: 27, kanji: '27日', kana: 'にじゅうしちにち',   romaji: 'nijuushichinichi', meaningHu: 'huszonhetedike' },
  { id: 'd28', num: 28, kanji: '28日', kana: 'にじゅうはちにち',   romaji: 'nijuuhachinichi', meaningHu: 'huszonnyolcadika' },
  { id: 'd29', num: 29, kanji: '29日', kana: 'にじゅうくにち',     romaji: 'nijuukunichi',   meaningHu: 'huszonkilencedike' },
  { id: 'd30', num: 30, kanji: '30日', kana: 'さんじゅうにち',     romaji: 'sanjuunichi',    meaningHu: 'harmincadika' },
  { id: 'd31', num: 31, kanji: '31日', kana: 'さんじゅういちにち', romaji: 'sanjuuichinichi', meaningHu: 'harmincegyedike' }
];


// ── 3. HÉT NAPJAI — mind a 7 (változatlan, teljes volt) ──────────────────────

const NIHONCORE_DT_WEEKDAYS = [
  { id: 'wd_mon', kanji: '月曜日', short: '月', kana: 'げつようび', romaji: 'getsuyoubi', meaningHu: 'hétfő' },
  { id: 'wd_tue', kanji: '火曜日', short: '火', kana: 'かようび',   romaji: 'kayoubi',    meaningHu: 'kedd' },
  { id: 'wd_wed', kanji: '水曜日', short: '水', kana: 'すいようび', romaji: 'suiyoubi',   meaningHu: 'szerda' },
  { id: 'wd_thu', kanji: '木曜日', short: '木', kana: 'もくようび', romaji: 'mokuyoubi',  meaningHu: 'csütörtök' },
  { id: 'wd_fri', kanji: '金曜日', short: '金', kana: 'きんようび', romaji: 'kinyoubi',   meaningHu: 'péntek' },
  { id: 'wd_sat', kanji: '土曜日', short: '土', kana: 'どようび',   romaji: 'doyoubi',    meaningHu: 'szombat' },
  { id: 'wd_sun', kanji: '日曜日', short: '日', kana: 'にちようび', romaji: 'nichiyoubi', meaningHu: 'vasárnap' }
];


// ── 4. IDŐPONTOK — egész órák 1-12 + TELJES félóra-szett ──────────────────────
// ⚠️ Rendhagyó órák: 4時=よじ, 7時=しちじ, 9時=くじ → irregular: true
// Félóráknál a 4時半 szintén irregular (よじはん)

const NIHONCORE_DT_TIMES = [
  // ── Egész órák ──
  { id: 't1',  kanji: '1時',   kana: 'いちじ',       romaji: 'ichiji',      meaningHu: '1:00' },
  { id: 't2',  kanji: '2時',   kana: 'にじ',         romaji: 'niji',        meaningHu: '2:00' },
  { id: 't3',  kanji: '3時',   kana: 'さんじ',       romaji: 'sanji',       meaningHu: '3:00' },
  { id: 't4',  kanji: '4時',   kana: 'よじ',         romaji: 'yoji',        meaningHu: '4:00', irregular: true },
  { id: 't5',  kanji: '5時',   kana: 'ごじ',         romaji: 'goji',        meaningHu: '5:00' },
  { id: 't6',  kanji: '6時',   kana: 'ろくじ',       romaji: 'rokuji',      meaningHu: '6:00' },
  { id: 't7',  kanji: '7時',   kana: 'しちじ',       romaji: 'shichiji',    meaningHu: '7:00', irregular: true },
  { id: 't8',  kanji: '8時',   kana: 'はちじ',       romaji: 'hachiji',     meaningHu: '8:00' },
  { id: 't9',  kanji: '9時',   kana: 'くじ',         romaji: 'kuji',        meaningHu: '9:00', irregular: true },
  { id: 't10', kanji: '10時',  kana: 'じゅうじ',     romaji: 'juuji',       meaningHu: '10:00' },
  { id: 't11', kanji: '11時',  kana: 'じゅういちじ', romaji: 'juuichiji',   meaningHu: '11:00' },
  { id: 't12', kanji: '12時',  kana: 'じゅうにじ',   romaji: 'juuniji',     meaningHu: '12:00' },

  // ── Félórák — TELJES (1時半-12時半) — ÚJ: 1時半, 2時半, 4時半, 6時半, 8時半, 11時半 ──
  { id: 't1h',  kanji: '1時半',  kana: 'いちじはん',     romaji: 'ichiji han',    meaningHu: '1:30' },
  { id: 't2h',  kanji: '2時半',  kana: 'にじはん',       romaji: 'niji han',      meaningHu: '2:30' },
  { id: 't3h',  kanji: '3時半',  kana: 'さんじはん',     romaji: 'sanji han',     meaningHu: '3:30' },
  { id: 't4h',  kanji: '4時半',  kana: 'よじはん',       romaji: 'yoji han',      meaningHu: '4:30', irregular: true },
  { id: 't5h',  kanji: '5時半',  kana: 'ごじはん',       romaji: 'goji han',      meaningHu: '5:30' },
  { id: 't6h',  kanji: '6時半',  kana: 'ろくじはん',     romaji: 'rokuji han',    meaningHu: '6:30' },
  { id: 't7h',  kanji: '7時半',  kana: 'しちじはん',     romaji: 'shichiji han',  meaningHu: '7:30', irregular: true },
  { id: 't8h',  kanji: '8時半',  kana: 'はちじはん',     romaji: 'hachiji han',   meaningHu: '8:30' },
  { id: 't9h',  kanji: '9時半',  kana: 'くじはん',       romaji: 'kuji han',      meaningHu: '9:30', irregular: true },
  { id: 't10h', kanji: '10時半', kana: 'じゅうじはん',   romaji: 'juuji han',     meaningHu: '10:30' },
  { id: 't11h', kanji: '11時半', kana: 'じゅういちじはん', romaji: 'juuichiji han', meaningHu: '11:30' },
  { id: 't12h', kanji: '12時半', kana: 'じゅうにじはん', romaji: 'juuniji han',   meaningHu: '12:30' }
];


// ── 5. 24 ÓRÁS IDŐ — TELJES (13-24 + 午前/午後) — ÚJ: 23時 ─────────────────
// ⚠️ Rendhagyók: 14時=じゅうよじ (よ), 17時=じゅうしちじ, 19時=じゅうくじ, 24時=にじゅうよじ

const NIHONCORE_DT_HOURS24 = [
  { id: 'h13', kanji: '13時', kana: 'じゅうさんじ',    romaji: 'juusanji',    meaningHu: '13:00 (du. 1)' },
  { id: 'h14', kanji: '14時', kana: 'じゅうよじ',      romaji: 'juuyoji',     meaningHu: '14:00 (du. 2)', irregular: true },
  { id: 'h15', kanji: '15時', kana: 'じゅうごじ',      romaji: 'juugoji',     meaningHu: '15:00 (du. 3)' },
  { id: 'h16', kanji: '16時', kana: 'じゅうろくじ',    romaji: 'juurokuji',   meaningHu: '16:00 (du. 4)' },
  { id: 'h17', kanji: '17時', kana: 'じゅうしちじ',    romaji: 'juushichiji', meaningHu: '17:00 (du. 5)', irregular: true },
  { id: 'h18', kanji: '18時', kana: 'じゅうはちじ',    romaji: 'juuhachiji',  meaningHu: '18:00 (du. 6)' },
  { id: 'h19', kanji: '19時', kana: 'じゅうくじ',      romaji: 'juukuji',     meaningHu: '19:00 (este 7)', irregular: true },
  { id: 'h20', kanji: '20時', kana: 'にじゅうじ',      romaji: 'nijuuji',     meaningHu: '20:00 (este 8)' },
  { id: 'h21', kanji: '21時', kana: 'にじゅういちじ',  romaji: 'nijuuichiji', meaningHu: '21:00 (este 9)' },
  { id: 'h22', kanji: '22時', kana: 'にじゅうにじ',    romaji: 'nijuuniji',   meaningHu: '22:00 (este 10)' },
  // ── ÚJ ──
  { id: 'h23', kanji: '23時', kana: 'にじゅうさんじ',  romaji: 'nijuusanji',  meaningHu: '23:00 (este 11)' },
  { id: 'h24', kanji: '24時', kana: 'にじゅうよじ',    romaji: 'nijuuyoji',   meaningHu: '24:00 (éjfél)',   irregular: true },

  // ── 午前/午後 összetett formák (composite: true → Build mód kihagyja) ──
  { id: 'h_am6',  kanji: '午前6時',  kana: 'ごぜんろくじ',    romaji: 'gozen rokuji',   meaningHu: 'reggel 6 (AM 6)',   composite: true },
  { id: 'h_am9',  kanji: '午前9時',  kana: 'ごぜんくじ',      romaji: 'gozen kuji',     meaningHu: 'reggel 9 (AM 9)',   composite: true },
  { id: 'h_am10', kanji: '午前10時', kana: 'ごぜんじゅうじ',  romaji: 'gozen juuji',    meaningHu: 'délelőtt 10 (AM 10)', composite: true },
  { id: 'h_pm12', kanji: '午後12時', kana: 'ごごじゅうにじ',  romaji: 'gogo juuniji',   meaningHu: 'dél (PM 12)',       composite: true },
  { id: 'h_pm1',  kanji: '午後1時',  kana: 'ごごいちじ',      romaji: 'gogo ichiji',    meaningHu: 'délután 1 (PM 1)',  composite: true },
  { id: 'h_pm3',  kanji: '午後3時',  kana: 'ごごさんじ',      romaji: 'gogo sanji',     meaningHu: 'délután 3 (PM 3)',  composite: true },
  { id: 'h_pm5',  kanji: '午後5時',  kana: 'ごごごじ',        romaji: 'gogo goji',      meaningHu: 'délután 5 (PM 5)',  composite: true },
  { id: 'h_pm7',  kanji: '午後7時',  kana: 'ごごしちじ',      romaji: 'gogo shichiji',  meaningHu: 'este 7 (PM 7)',     composite: true },
  { id: 'h_pm9',  kanji: '午後9時',  kana: 'ごごくじ',        romaji: 'gogo kuji',      meaningHu: 'este 9 (PM 9)',     composite: true }
];


// ── 6. PERCEK — TELJES (1-30 + 35/40/45/50/55) ───────────────────────────────
// ⚠️ Rendaku/sokuon szabály:
//   sokuon-p  (っぷん): 1, 6, 8, 10 → és ezek tízesei (10x végű számok)
//   rendaku-p (ぷん):   3, 4 → és tízesei (pl. 13, 14, 23, 24)
//   ふん (szabályos):   2, 5, 7, 9 → és tízesei

const NIHONCORE_DT_MINUTES = [
  // ── 1-10 (starter) ──
  { id: 'min1',  num: 1,  kanji: '1分',  kana: 'いっぷん',         romaji: 'ippun',        meaningHu: '1 perc',   irregular: true, changeType: 'sokuon-p' },
  { id: 'min2',  num: 2,  kanji: '2分',  kana: 'にふん',           romaji: 'nifun',         meaningHu: '2 perc' },
  { id: 'min3',  num: 3,  kanji: '3分',  kana: 'さんぷん',         romaji: 'sanpun',        meaningHu: '3 perc',   irregular: true, changeType: 'rendaku-p' },
  { id: 'min4',  num: 4,  kanji: '4分',  kana: 'よんぷん',         romaji: 'yonpun',        meaningHu: '4 perc',   irregular: true, changeType: 'rendaku-p' },
  { id: 'min5',  num: 5,  kanji: '5分',  kana: 'ごふん',           romaji: 'gofun',         meaningHu: '5 perc' },
  { id: 'min6',  num: 6,  kanji: '6分',  kana: 'ろっぷん',         romaji: 'roppun',        meaningHu: '6 perc',   irregular: true, changeType: 'sokuon-p' },
  { id: 'min7',  num: 7,  kanji: '7分',  kana: 'ななふん',         romaji: 'nanafun',       meaningHu: '7 perc' },
  { id: 'min8',  num: 8,  kanji: '8分',  kana: 'はっぷん',         romaji: 'happun',        meaningHu: '8 perc',   irregular: true, changeType: 'sokuon-p' },
  { id: 'min9',  num: 9,  kanji: '9分',  kana: 'きゅうふん',       romaji: 'kyuufun',       meaningHu: '9 perc' },
  { id: 'min10', num: 10, kanji: '10分', kana: 'じゅっぷん',       romaji: 'juppun',        meaningHu: '10 perc',  irregular: true, changeType: 'sokuon-p' },

  // ── 11-14 — ÚJ ──
  { id: 'min11', num: 11, kanji: '11分', kana: 'じゅういっぷん',   romaji: 'juuippun',      meaningHu: '11 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min12', num: 12, kanji: '12分', kana: 'じゅうにふん',     romaji: 'juunifun',      meaningHu: '12 perc' },
  { id: 'min13', num: 13, kanji: '13分', kana: 'じゅうさんぷん',   romaji: 'juusanpun',     meaningHu: '13 perc',  irregular: true, changeType: 'rendaku-p' },
  { id: 'min14', num: 14, kanji: '14分', kana: 'じゅうよんぷん',   romaji: 'juuyonpun',     meaningHu: '14 perc',  irregular: true, changeType: 'rendaku-p' },

  // ── 15 (starter) ──
  { id: 'min15', num: 15, kanji: '15分', kana: 'じゅうごふん',     romaji: 'juugofun',      meaningHu: '15 perc' },

  // ── 16-19 — ÚJ ──
  { id: 'min16', num: 16, kanji: '16分', kana: 'じゅうろっぷん',   romaji: 'juuroppun',     meaningHu: '16 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min17', num: 17, kanji: '17分', kana: 'じゅうななふん',   romaji: 'juunanafun',    meaningHu: '17 perc' },
  { id: 'min18', num: 18, kanji: '18分', kana: 'じゅうはっぷん',   romaji: 'juuhappun',     meaningHu: '18 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min19', num: 19, kanji: '19分', kana: 'じゅうきゅうふん', romaji: 'juukyuufun',    meaningHu: '19 perc' },

  // ── 20 (starter) ──
  { id: 'min20', num: 20, kanji: '20分', kana: 'にじゅっぷん',     romaji: 'nijuppun',      meaningHu: '20 perc',  irregular: true, changeType: 'sokuon-p' },

  // ── 21-29 — ÚJ ──
  { id: 'min21', num: 21, kanji: '21分', kana: 'にじゅういっぷん', romaji: 'nijuuippun',    meaningHu: '21 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min22', num: 22, kanji: '22分', kana: 'にじゅうにふん',   romaji: 'nijuunifun',    meaningHu: '22 perc' },
  { id: 'min23', num: 23, kanji: '23分', kana: 'にじゅうさんぷん', romaji: 'nijuusanpun',   meaningHu: '23 perc',  irregular: true, changeType: 'rendaku-p' },
  { id: 'min24', num: 24, kanji: '24分', kana: 'にじゅうよんぷん', romaji: 'nijuuyonpun',   meaningHu: '24 perc',  irregular: true, changeType: 'rendaku-p' },
  { id: 'min25', num: 25, kanji: '25分', kana: 'にじゅうごふん',   romaji: 'nijuugofun',    meaningHu: '25 perc' },
  { id: 'min26', num: 26, kanji: '26分', kana: 'にじゅうろっぷん', romaji: 'nijuuroppun',   meaningHu: '26 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min27', num: 27, kanji: '27分', kana: 'にじゅうななふん', romaji: 'nijuunanafun',  meaningHu: '27 perc' },
  { id: 'min28', num: 28, kanji: '28分', kana: 'にじゅうはっぷん', romaji: 'nijuuhappun',   meaningHu: '28 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min29', num: 29, kanji: '29分', kana: 'にじゅうきゅうふん', romaji: 'nijuukyuufun', meaningHu: '29 perc' },

  // ── 30 (starter) ──
  { id: 'min30', num: 30, kanji: '30分', kana: 'さんじゅっぷん',   romaji: 'sanjuppun',     meaningHu: '30 perc (= 半)', irregular: true, changeType: 'sokuon-p' },

  // ── 35/40/45/50/55 — ÚJ ──
  { id: 'min35', num: 35, kanji: '35分', kana: 'さんじゅうごふん', romaji: 'sanjuugofun',   meaningHu: '35 perc' },
  { id: 'min40', num: 40, kanji: '40分', kana: 'よんじゅっぷん',   romaji: 'yonjuppun',     meaningHu: '40 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min45', num: 45, kanji: '45分', kana: 'よんじゅうごふん', romaji: 'yonjuugofun',   meaningHu: '45 perc' },
  { id: 'min50', num: 50, kanji: '50分', kana: 'ごじゅっぷん',     romaji: 'gojuppun',      meaningHu: '50 perc',  irregular: true, changeType: 'sokuon-p' },
  { id: 'min55', num: 55, kanji: '55分', kana: 'ごじゅうごふん',   romaji: 'gojuugofun',    meaningHu: '55 perc' }
];


// ── 7. ÉVEK — BŐVÍTETT ────────────────────────────────────────────────────────
// ⚠️ よ/ん váltakozás: 4-et tartalmazó évek sokszor irregular (pl. 2024年 → よ)
// Imperial flag: imperial: true → 元号 (gengō) évek
// Összetett imperial (元年 = がんねん az első évben)

const NIHONCORE_DT_YEARS = [
  // ── Kerek nyugati évek ──
  { id: 'y1900', kanji: '1900年', kana: 'せんきゅうひゃくねん',               romaji: 'sen kyuuhyaku nen',               meaningHu: '1900' },
  { id: 'y1945', kanji: '1945年', kana: 'せんきゅうひゃくよんじゅうごねん',   romaji: 'sen kyuuhyaku yonjuugo nen',      meaningHu: '1945', irregular: true },
  { id: 'y1950', kanji: '1950年', kana: 'せんきゅうひゃくごじゅうねん',       romaji: 'sen kyuuhyaku gojuu nen',         meaningHu: '1950' },
  { id: 'y1960', kanji: '1960年', kana: 'せんきゅうひゃくろくじゅうねん',     romaji: 'sen kyuuhyaku rokujuu nen',       meaningHu: '1960' },
  { id: 'y1970', kanji: '1970年', kana: 'せんきゅうひゃくななじゅうねん',     romaji: 'sen kyuuhyaku nanajuu nen',       meaningHu: '1970' },
  { id: 'y1980', kanji: '1980年', kana: 'せんきゅうひゃくはちじゅうねん',     romaji: 'sen kyuuhyaku hachijuu nen',      meaningHu: '1980' },
  { id: 'y1985', kanji: '1985年', kana: 'せんきゅうひゃくはちじゅうごねん',   romaji: 'sen kyuuhyaku hachijuugo nen',    meaningHu: '1985' },
  { id: 'y1990', kanji: '1990年', kana: 'せんきゅうひゃくきゅうじゅうねん',   romaji: 'sen kyuuhyaku kyuujuu nen',       meaningHu: '1990' },
  { id: 'y1999', kanji: '1999年', kana: 'せんきゅうひゃくきゅうじゅうきゅうねん', romaji: 'sen kyuuhyaku kyuujuu kyuu nen', meaningHu: '1999' },
  { id: 'y2000', kanji: '2000年', kana: 'にせんねん',                         romaji: 'nisen nen',                       meaningHu: '2000' },
  { id: 'y2001', kanji: '2001年', kana: 'にせんいちねん',                     romaji: 'nisen ichi nen',                  meaningHu: '2001' },
  { id: 'y2005', kanji: '2005年', kana: 'にせんごねん',                       romaji: 'nisen go nen',                    meaningHu: '2005' },
  { id: 'y2010', kanji: '2010年', kana: 'にせんじゅうねん',                   romaji: 'nisen juu nen',                   meaningHu: '2010' },
  { id: 'y2015', kanji: '2015年', kana: 'にせんじゅうごねん',                 romaji: 'nisen juugo nen',                 meaningHu: '2015' },
  { id: 'y2019', kanji: '2019年', kana: 'にせんじゅうきゅうねん',             romaji: 'nisen juukyuu nen',               meaningHu: '2019' },
  { id: 'y2020', kanji: '2020年', kana: 'にせんにじゅうねん',                 romaji: 'nisen nijuu nen',                 meaningHu: '2020' },
  { id: 'y2023', kanji: '2023年', kana: 'にせんにじゅうさんねん',             romaji: 'nisen nijuusan nen',              meaningHu: '2023' },
  { id: 'y2024', kanji: '2024年', kana: 'にせんにじゅうよねん',               romaji: 'nisen nijuu yo nen',              meaningHu: '2024', irregular: true },
  { id: 'y2025', kanji: '2025年', kana: 'にせんにじゅうごねん',               romaji: 'nisen nijuugo nen',               meaningHu: '2025' },
  { id: 'y2026', kanji: '2026年', kana: 'にせんにじゅうろくねん',             romaji: 'nisen nijuuroku nen',             meaningHu: '2026' },
  { id: 'y2030', kanji: '2030年', kana: 'にせんさんじゅうねん',               romaji: 'nisen sanjuu nen',                meaningHu: '2030' },

  // ── 令和 (Reiwa, 2019-) ──
  { id: 'y_reiwa1',  kanji: '令和元年', kana: 'れいわがんねん',             romaji: 'reiwa gan nen',        meaningHu: 'Reiwa 1 (2019)',  imperial: true, irregular: true },
  { id: 'y_reiwa2',  kanji: '令和2年',  kana: 'れいわにねん',               romaji: 'reiwa ni nen',         meaningHu: 'Reiwa 2 (2020)',  imperial: true },
  { id: 'y_reiwa3',  kanji: '令和3年',  kana: 'れいわさんねん',             romaji: 'reiwa san nen',        meaningHu: 'Reiwa 3 (2021)',  imperial: true },
  { id: 'y_reiwa4',  kanji: '令和4年',  kana: 'れいわよねん',               romaji: 'reiwa yo nen',         meaningHu: 'Reiwa 4 (2022)',  imperial: true, irregular: true },
  { id: 'y_reiwa5',  kanji: '令和5年',  kana: 'れいわごねん',               romaji: 'reiwa go nen',         meaningHu: 'Reiwa 5 (2023)',  imperial: true },
  { id: 'y_reiwa6',  kanji: '令和6年',  kana: 'れいわろくねん',             romaji: 'reiwa roku nen',       meaningHu: 'Reiwa 6 (2024)',  imperial: true },
  { id: 'y_reiwa7',  kanji: '令和7年',  kana: 'れいわしちねん',             romaji: 'reiwa shichi nen',     meaningHu: 'Reiwa 7 (2025)',  imperial: true },

  // ── 平成 (Heisei, 1989-2019) ──
  { id: 'y_heisei1',  kanji: '平成元年',  kana: 'へいせいがんねん',           romaji: 'heisei gan nen',       meaningHu: 'Heisei 1 (1989)', imperial: true, irregular: true },
  { id: 'y_heisei10', kanji: '平成10年',  kana: 'へいせいじゅうねん',         romaji: 'heisei juu nen',       meaningHu: 'Heisei 10 (1998)', imperial: true },
  { id: 'y_heisei20', kanji: '平成20年',  kana: 'へいせいにじゅうねん',       romaji: 'heisei nijuu nen',     meaningHu: 'Heisei 20 (2008)', imperial: true },
  { id: 'y_heisei31', kanji: '平成31年',  kana: 'へいせいさんじゅういちねん', romaji: 'heisei sanjuuichi nen', meaningHu: 'Heisei 31 (2019)', imperial: true },

  // ── 昭和 (Showa, 1926-1989) ──
  { id: 'y_showa20',  kanji: '昭和20年',  kana: 'しょうわにじゅうねん',       romaji: 'shouwa nijuu nen',     meaningHu: 'Showa 20 (1945)', imperial: true },
  { id: 'y_showa30',  kanji: '昭和30年',  kana: 'しょうわさんじゅうねん',     romaji: 'shouwa sanjuu nen',    meaningHu: 'Showa 30 (1955)', imperial: true },
  { id: 'y_showa40',  kanji: '昭和40年',  kana: 'しょうわよんじゅうねん',     romaji: 'shouwa yonjuu nen',    meaningHu: 'Showa 40 (1965)', imperial: true, irregular: true },
  { id: 'y_showa50',  kanji: '昭和50年',  kana: 'しょうわごじゅうねん',       romaji: 'shouwa gojuu nen',     meaningHu: 'Showa 50 (1975)', imperial: true },
  { id: 'y_showa64',  kanji: '昭和64年',  kana: 'しょうわろくじゅうよねん',   romaji: 'shouwa rokujuu yo nen', meaningHu: 'Showa 64 (1989)', imperial: true, irregular: true }
];


// ── 8. RELATÍV IDŐ — BŐVÍTETT ─────────────────────────────────────────────────
// Kategóriák: 前/後 (before/after), 頃 (around), 過ぎ (just past),
//             くらい/ほど (about/approx), napok/hetek/hónapok relatív nevei

const NIHONCORE_DT_RELATIVE = [
  // ── Időtartam + 前/後 (starterből) ──
  { id: 'rel1',  kanji: '二時間前',       kana: 'にじかんまえ',         romaji: 'nijikan mae',          meaningHu: '2 órával ezelőtt' },
  { id: 'rel2',  kanji: '三時間後',       kana: 'さんじかんご',         romaji: 'sanjikan go',          meaningHu: '3 óra múlva' },
  { id: 'rel3',  kanji: '五分前',         kana: 'ごふんまえ',           romaji: 'gofun mae',            meaningHu: '5 perccel előtte' },
  { id: 'rel4',  kanji: '十分後',         kana: 'じゅっぷんご',         romaji: 'juppun go',            meaningHu: '10 perc múlva' },
  { id: 'rel5',  kanji: '七時頃',         kana: 'しちじごろ',           romaji: 'shichiji goro',        meaningHu: '7 óra körül' },
  { id: 'rel6',  kanji: '三時過ぎ',       kana: 'さんじすぎ',           romaji: 'sanji sugi',           meaningHu: '3 óra után (kicsivel)' },
  { id: 'rel7',  kanji: '一時間くらい',   kana: 'いちじかんくらい',     romaji: 'ichijikan kurai',      meaningHu: 'kb. 1 óra (időtartam)' },
  { id: 'rel8',  kanji: '二時前',         kana: 'にじまえ',             romaji: 'niji mae',             meaningHu: '2 óra előtt' },
  { id: 'rel9',  kanji: '九時過ぎ',       kana: 'くじすぎ',             romaji: 'kuji sugi',            meaningHu: '9 óra után (kicsivel)' },
  { id: 'rel10', kanji: '五時頃',         kana: 'ごじごろ',             romaji: 'goji goro',            meaningHu: '5 óra körül' },
  { id: 'rel11', kanji: '三十分くらい',   kana: 'さんじゅっぷんくらい', romaji: 'sanjuppun kurai',      meaningHu: 'kb. 30 perc (időtartam)' },
  { id: 'rel12', kanji: '一週間後',       kana: 'いっしゅうかんご',     romaji: 'isshuukan go',         meaningHu: '1 hét múlva' },

  // ── Napok relatív nevei — ÚJ ──
  { id: 'rel13', kanji: '今日',           kana: 'きょう',               romaji: 'kyou',                 meaningHu: 'ma' },
  { id: 'rel14', kanji: '明日',           kana: 'あした',               romaji: 'ashita',               meaningHu: 'holnap' },
  { id: 'rel15', kanji: '昨日',           kana: 'きのう',               romaji: 'kinou',                meaningHu: 'tegnap' },
  { id: 'rel16', kanji: '明後日',         kana: 'あさって',             romaji: 'asatte',               meaningHu: 'holnapután' },
  { id: 'rel17', kanji: '一昨日',         kana: 'おととい',             romaji: 'ototoi',               meaningHu: 'tegnapelőtt' },

  // ── Hetek relatív nevei — ÚJ ──
  { id: 'rel18', kanji: '今週',           kana: 'こんしゅう',           romaji: 'konshuu',              meaningHu: 'ezen a héten' },
  { id: 'rel19', kanji: '来週',           kana: 'らいしゅう',           romaji: 'raishuu',              meaningHu: 'jövő héten' },
  { id: 'rel20', kanji: '先週',           kana: 'せんしゅう',           romaji: 'senshuu',              meaningHu: 'múlt héten' },
  { id: 'rel21', kanji: '再来週',         kana: 'さらいしゅう',         romaji: 'saraishuu',            meaningHu: 'két hét múlva' },
  { id: 'rel22', kanji: '先々週',         kana: 'せんせんしゅう',       romaji: 'sensenshuu',           meaningHu: 'két héttel ezelőtt' },

  // ── Hónapok relatív nevei — ÚJ ──
  { id: 'rel23', kanji: '今月',           kana: 'こんげつ',             romaji: 'kongetsu',             meaningHu: 'ebben a hónapban' },
  { id: 'rel24', kanji: '来月',           kana: 'らいげつ',             romaji: 'raigetsu',             meaningHu: 'jövő hónapban' },
  { id: 'rel25', kanji: '先月',           kana: 'せんげつ',             romaji: 'sengetsu',             meaningHu: 'múlt hónapban' },
  { id: 'rel26', kanji: '再来月',         kana: 'さらいげつ',           romaji: 'saraigetsu',           meaningHu: 'két hónap múlva' },

  // ── Évek relatív nevei — ÚJ ──
  { id: 'rel27', kanji: '今年',           kana: 'ことし',               romaji: 'kotoshi',              meaningHu: 'idén' },
  { id: 'rel28', kanji: '来年',           kana: 'らいねん',             romaji: 'rainen',               meaningHu: 'jövőre' },
  { id: 'rel29', kanji: '去年',           kana: 'きょねん',             romaji: 'kyonen',               meaningHu: 'tavaly' },
  { id: 'rel30', kanji: '再来年',         kana: 'さらいねん',           romaji: 'sarainen',             meaningHu: 'két év múlva' },
  { id: 'rel31', kanji: '一昨年',         kana: 'おととし',             romaji: 'ototoshi',             meaningHu: 'két évvel ezelőtt' },

  // ── Összetett időtartam-kifejezések — ÚJ ──
  { id: 'rel32', kanji: '三日後',         kana: 'みっかご',             romaji: 'mikka go',             meaningHu: '3 nap múlva' },
  { id: 'rel33', kanji: '五日前',         kana: 'いつかまえ',           romaji: 'itsuka mae',           meaningHu: '5 nappal ezelőtt' },
  { id: 'rel34', kanji: '二週間前',       kana: 'にしゅうかんまえ',     romaji: 'nishuukan mae',        meaningHu: '2 héttel ezelőtt' },
  { id: 'rel35', kanji: '一ヶ月後',       kana: 'いっかげつご',         romaji: 'ikkagetsu go',         meaningHu: '1 hónap múlva' },
  { id: 'rel36', kanji: '三ヶ月前',       kana: 'さんかげつまえ',       romaji: 'sankagetsu mae',       meaningHu: '3 hónappal ezelőtt' },
  { id: 'rel37', kanji: '半年後',         kana: 'はんとしご',           romaji: 'hantoshi go',          meaningHu: 'fél év múlva' },
  { id: 'rel38', kanji: '半年前',         kana: 'はんとしまえ',         romaji: 'hantoshi mae',         meaningHu: 'fél évvel ezelőtt' },
  { id: 'rel39', kanji: '一年後',         kana: 'いちねんご',           romaji: 'ichinen go',           meaningHu: '1 év múlva' },
  { id: 'rel40', kanji: '二年前',         kana: 'にねんまえ',           romaji: 'ninen mae',            meaningHu: '2 évvel ezelőtt' },

  // ── 〜頃 (körül) kibővítve — ÚJ ──
  { id: 'rel41', kanji: '十時頃',         kana: 'じゅうじごろ',         romaji: 'juuji goro',           meaningHu: '10 óra körül' },
  { id: 'rel42', kanji: '昼頃',           kana: 'ひるごろ',             romaji: 'hiru goro',            meaningHu: 'dél körül' },
  { id: 'rel43', kanji: '夕方頃',         kana: 'ゆうがたごろ',         romaji: 'yuugata goro',         meaningHu: 'este felé (kb.)' },
  { id: 'rel44', kanji: '来週頃',         kana: 'らいしゅうごろ',       romaji: 'raishuu goro',         meaningHu: 'jövő hét körül' },

  // ── 〜過ぎ (valamivel múlt) kibővítve — ÚJ ──
  { id: 'rel45', kanji: '十二時過ぎ',     kana: 'じゅうにじすぎ',       romaji: 'juuniji sugi',         meaningHu: '12 óra után (kicsivel)' },
  { id: 'rel46', kanji: '午後過ぎ',       kana: 'ごごすぎ',             romaji: 'gogo sugi',            meaningHu: 'délután elmúlt (általánosan)' },
  { id: 'rel47', kanji: '昼過ぎ',         kana: 'ひるすぎ',             romaji: 'hiru sugi',            meaningHu: 'dél után' },

  // ── 〜くらい / ほど (kb., nagyjából) kibővítve — ÚJ ──
  { id: 'rel48', kanji: '十五分くらい',   kana: 'じゅうごふんくらい',   romaji: 'juugofun kurai',       meaningHu: 'kb. 15 perc' },
  { id: 'rel49', kanji: '二時間ほど',     kana: 'にじかんほど',         romaji: 'nijikan hodo',         meaningHu: 'kb. 2 óra (ほど változat)' },
  { id: 'rel50', kanji: '一時間半後',     kana: 'いちじかんはんご',     romaji: 'ichijikan han go',     meaningHu: 'másfél óra múlva' },
  { id: 'rel51', kanji: '一時間半前',     kana: 'いちじかんはんまえ',   romaji: 'ichijikan han mae',    meaningHu: 'másfél órával ezelőtt' },
  { id: 'rel52', kanji: '二十分くらい',   kana: 'にじゅっぷんくらい',   romaji: 'nijuppun kurai',       meaningHu: 'kb. 20 perc' },

  // ── Napszakok (időszak-referenciák) — ÚJ ──
  { id: 'rel53', kanji: '朝',             kana: 'あさ',                 romaji: 'asa',                  meaningHu: 'reggel' },
  { id: 'rel54', kanji: '昼',             kana: 'ひる',                 romaji: 'hiru',                 meaningHu: 'dél / napközbeni idő' },
  { id: 'rel55', kanji: '夕方',           kana: 'ゆうがた',             romaji: 'yuugata',              meaningHu: 'késő délután / alkonyat' },
  { id: 'rel56', kanji: '夜',             kana: 'よる',                 romaji: 'yoru',                 meaningHu: 'este / éjszaka' },
  { id: 'rel57', kanji: '深夜',           kana: 'しんや',               romaji: 'shinya',               meaningHu: 'késő éjszaka (éjfél körül)' },
  { id: 'rel58', kanji: '真夜中',         kana: 'まよなか',             romaji: 'mayonaka',             meaningHu: 'éjfél' },
  { id: 'rel59', kanji: '午前中',         kana: 'ごぜんちゅう',         romaji: 'gozenchuu',            meaningHu: 'délelőtt folyamán' },
  { id: 'rel60', kanji: '午後',           kana: 'ごご',                 romaji: 'gogo',                 meaningHu: 'délután' }
];


/* A DT_CATEGORIES és DT_ERROR_TYPES a core.js-ben van — itt szándékosan nincs duplikálva. */
