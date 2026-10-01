# Product

## Register

product

## Users

Magyar anyanyelvű japántanulók, JLPT N5-től N3-ig, jellemzően a Dekiru 1–2 tankönyvek mellett. Két belépő csoport van: aki nulláról indul és még a kanát sem olvassa, és aki a kanát már ismeri és a nyelvtant gyakorolná. Tipikus helyzet: telefon egy kézben, 5–10 perces gyakorlókör villamoson vagy este az asztalnál; ritkábban tableten vagy laptopon, hosszabb ülésben.

A feladatuk minden képernyőn ugyanaz: gyorsan elindítani egy kört, egy kártyára figyelni, azonnal megérteni, miért volt jó vagy rossz a válasz, és látni, hogy haladnak.

## Product Purpose

A NihonCore japán nyelvtan-gyakorló: igeragozás, partikulák, számlálók, melléknevek, dátum és idő, hallás, mondatszintű minták, szabad fordítás. A szókincs és a kanji a párhuzamos LexiLearn appban van; ide a morfológia, a hallás és a mondatalkotás tartozik.

Siker: a kezdő tudja, hol kezdje és mi a következő lépés; egy kör elindítása egy koppintás; a visszajelzés tanít, nem csak pontoz; a haladás a statisztikában és a tanulási úton látszik.

## Brand Personality

Nyugodt, pontos, biztató, és érezhetően igényes. Japán színvilág: indigó (藍) a fő szín gyöngyfehér alapon, arany kiemeléssel; a helyes válasz zöld, a hiba cinóbervörös. Kalligrafikus japán írás, tiszta, olvasható magyar szöveg. A hang szövetséges, nem vizsgáztató: a hibánál „nézzük meg együtt", nem „HIBÁS".

A felületek üvegesek: áttetsző, lebegő panelek és lebegő navigáció a sima, lágy színmezős háttér fölött. A gombok „lakkozottak": felül fény, alul színes árnyék; a másodlagos gomb üveg. Képernyőnként egyetlen telített (indigó) felület viszi a fő üzenetet: a kezdőlapon a „Folytatás" kártya, a statisztikában a sorozat. A felhasználó kifejezett kérései (2026-10): üveg, élénk és prémium színek, app-szintű tanulási út, animációk.

Az app-érzet része a mozgás: lenyomható (peremes) csomópontok és válasz-gombok, belépő animációk, a kész lépés „kivirágzása". A mozgás mindig állapotot jelez, és soha nem megy a görgetés simaságának rovására.

## Anti-references

- Általános SaaS-sablon: neon ragyogás, színátmenetes szöveg, lila-kék „AI-gradient" minden felületen. (Az indigó itt japán kék: aranyhoz és cinóberhez társul, nem lilához.)
- Fejlesztői felület a tanuló előtt: verziószámok, motor-nevek, angol szakzsargon, beállítópanel tanítás helyett.
- Játékosítás-túltengés: villogó jutalmak, bűntudatkeltő sorozat-figyelmeztetések.
- Zsúfolt, asztali gépre méretezett elrendezés, ami telefonon görgetni és nagyítani kényszerít.

## Design Principles

1. **Telefon az első.** Minden képernyő egy kézzel, hüvelykujjal használható; a fő művelet alul, elérhető helyen van. A tablet és az asztali nézet ebből bővül, nem fordítva.
2. **Egy kártya, egy képernyő.** Kör közben a kérdés, a válaszlehetőségek és a visszajelzés görgetés nélkül látszik.
3. **Előbb tanít, aztán kérdez.** A kezdő rövid magyarázatot és vezetett utat kap; a beállítások a háttérben maradnak, amíg nem kellenek.
4. **A visszajelzés magyaráz.** Megmondja, mi volt a hiba, mi a helyes, és miért; szövetséges hangon.
5. **A tanuló nyelvén.** Magyar feliratok, zsargon nélkül; a japán szöveg mindig nagy és olvasható, furiganával és kapcsolható romajival.

## Accessibility & Inclusion

Cél a WCAG 2.1 AA: szövegkontraszt legalább 4,5:1 (az üveges felületeken is), 12 px-nél kisebb szöveg nincs, az érintési célpontok legalább 44 px-esek. Teljes billentyűzetes kezelés a kör alatt, látható fókusz. A `prefers-reduced-motion` tiszteletben tartása. A helyes/hibás jelzés soha nem csak szín: ikon és szöveg is kíséri. Világos és sötét téma.
