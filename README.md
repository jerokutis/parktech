# Parktech

**Komanda: LARM · VILNIUS TECH**

„Parktech“ – interaktyvus parkavimo vietų valdymo sistemos prototipas, skirtas VILNIUS TECH studentams ir darbuotojams. Kompiuteryje rodomas iPhone maketas su veikiančia programėle, o mažame ekrane programėlė užima visą langą. Visas valdymas pasiekiamas telefono viduje.

## Galimybės

- Trijų demonstracinių aikštelių užimtumo peržiūra ir interaktyvus vietų planas.
- Laisvų, elektromobiliams skirtų ir neįgaliesiems pritaikytų vietų filtrai.
- Vietos rezervavimas 1, 2 arba 4 valandoms ir rezervacijos atšaukimas.
- Parkavimo pradžios ir pabaigos žymėjimas bei veikiantis trukmės laikmatis.
- Rezervacijų istorija su baigtų ir atšauktų rezervacijų filtrais.
- Paskyros vardo ir automobilio numerio keitimas.
- Administratoriaus režimas: atskiras vietų sąrašas, būsenų keitimas ir naujų vietų pridėjimas.
- Įjungiama užimtumo simuliacija ir pradinių demonstracinių duomenų atkūrimas.

## Technologijos

React 19, TypeScript, Vite 6, CSS ir Lucide piktogramos. Duomenys saugomi naršyklės `localStorage`.

## Paleidimas savo kompiuteryje

Reikės **Git**, **Node.js 22 arba naujesnės versijos** ir kartu su Node.js įdiegiamo **npm**.

### 1. Parsisiųsk projektą

```sh
git clone https://github.com/jerokutis/parktech.git
cd parktech
```

Jei projektą jau turi kompiuteryje, terminale atsidaryk jo aplanką.

### 2. Įdiek priklausomybes

```sh
npm ci
```

### 3. Paleisk programėlę

```sh
npm run dev
```

Naršyklėje atidaryk terminale parodytą adresą, paprastai **http://127.0.0.1:5173**. Jei šis prievadas užimtas, Vite parinks kitą ir parodys jo adresą.

Terminalą palik veikiantį, kol naudoji programėlę. Serverį sustabdysi paspaudęs **Ctrl+C**.

## Kaip išbandyti

1. Pasirink aikštelę **P1**, **P2** arba **P3**.
2. Plane pasirink laisvą vietą. Mygtuku **+** gali padidinti planą ir vietų paspaudimo plotą.
3. Pasirink trukmę ir spausk **Rezervuoti vietą**.
4. Skiltyje **Rezervacija** spausk **Pradėti parkavimą**.
5. Išvykdamas spausk **Baigti parkavimą** ir patvirtink. Vieta atsilaisvins, o įrašą rasi skiltyje **Istorija**.
6. Jei nebeatvyksi, dar nepradėtą parkavimą atšauk rezervacijos lange.

### Administratoriaus režimas

Telefone atidaryk **Paskyra → Administratoriaus režimas**, tada grįžk į **Aikšteles**. Atsidarys **Sąrašas** su kiekvienos vietos numeriu, būsena ir tipu. Mygtuku **Keisti** atidarysi būsenos pasirinkimą. Jungikliu **Sąrašas / Planas** gali grįžti į aikštelės planą. Abu vaizdai naudoja tuos pačius duomenis ir filtrus. Aktyvi rezervacija sąraše pažymėta spynos simboliu, o jos keitimo mygtukas išjungtas.

Galimos vietos būsenos: laisva, užimta, rezervuota arba neprieinama. Mygtukas **Pridėti parkavimo vietą** sukuria papildomą laisvą vietą. Prototipo limitas – 36 vietos vienoje aikštelėje.

Administratoriaus navigacija atskira:

- **Vietos** – aikštelių planas, vietų sąrašas ir būsenų keitimas.
- **Rezervacijos** – prototipe išsaugotų rezervacijų apžvalga pagal būseną, su automobilio numeriu ir aikštele. Administratorius neatlieka naudotojo parkavimo veiksmų.
- **Žurnalas** – nauji rezervavimo, parkavimo ir administravimo veiksmai su data bei veiksmo atlikėjo vaidmeniu. Žurnalas pildomas nuo šios versijos ir išsaugomas `localStorage`; ankstesnės rezervacijos išlieka.
- **Valdymas** – administratoriaus nustatymai ir grįžimas į studento režimą.

Perjungus režimą atveriamas jo pradinis ekranas ir uždaromi ankstesnio režimo dialogai. Administratoriaus paskyroje nerodomas studento automobilis ar asmeninių duomenų redagavimas. Grįžti gali per **Valdymas → Pereiti į studento režimą**. Studentui išlieka jo rezervacija ir asmeninė istorija.

### Užimtumo simuliacija

Skiltyje **Paskyra** įjunk **Užimtumo simuliaciją**. Kas 6 sekundes atsitiktinai keičiamos dalies vietų būsenos. Tavo aktyvi rezervacija ir parkavimo vieta nekeičiama.

### Pradinių duomenų atkūrimas

Pasirink **Paskyra → Atkurti prototipą** ir patvirtink. Bus atkurti pradiniai demonstraciniai duomenys; tavo sukurti vietiniai įrašai ir paskyros pakeitimai bus pašalinti.

## Produkcinio varianto patikrinimas

```sh
npm run build
npm run preview
```

`build` patikrina TypeScript ir sukuria optimizuotus failus aplanke `dist`. `preview` paleidžia jų vietinę peržiūrą; atidaryk terminale pateiktą adresą, paprastai **http://127.0.0.1:4173**.

## Projekto struktūra

```text
src/
  main.tsx       Programėlės ekranai ir veiksmų logika
  styles.css     Stiliai, telefono maketas ir prisitaikymas prie ekrano
index.html       Pradinis HTML dokumentas
package.json     Priklausomybės ir paleidimo komandos
package-lock.json Tikslios priklausomybių versijos
```

## Prototipo ribos

- Aikštelių planai, užimtumas ir pradiniai istorijos įrašai yra demonstraciniai. Realūs jutikliai ir kameros nenaudojami.
- Nėra serverio, tikro universiteto prisijungimo ar bendros duomenų bazės. Administratoriaus režimas demonstracinis ir neturi autentifikacijos.
- Pakeitimai išlieka toje pačioje naršyklėje, bet nesinchronizuojami tarp įrenginių ar skirtingų naršyklių.
- Vienu metu galima viena aktyvi rezervacija. Pasibaigus pasirinktai trukmei, nepradėta rezervacija automatiškai atšaukiama programėlei veikiant. Pradėtas parkavimas baigiamas rankiniu būdu.
- Šriftai įkeliami iš Google Fonts; jei interneto nėra, naudojami sistemos šriftai.
