# Silabar

Aplicație web simplă pentru exersarea despărțirii cuvintelor în silabe.

## Pornire

Deschide `index.html` într-un browser. Nu sunt necesare instalări sau un server.

## Cum funcționează

- Alege dintre până la patru variante apropiate: opțiunile greșite păstrează literele și mută limitele dintre silabe ori unesc silabe vecine. Pentru cuvintele cu vocale consecutive, variantele pun în contrast gruparea vocalelor în aceeași silabă cu separarea lor în silabe diferite. Cuvintele scurte pot avea trei variante dacă nu se pot genera patru opțiuni plauzibile.
- Primești imediat răspunsul corect și o explicație.
- Banca are 80 de cuvinte distincte: cele 69 de cuvinte din imaginile furnizate de tine (inclusiv „subiect”, care apare deja în quiz) și 11 intrări suplimentare verificate individual în DOOM³ și silabe.ro.
- Despărțirile celor 69 de cuvinte provin din listele ilustrate furnizate de tine; „cernoziom” a fost corectat la „cer-no-ziom”, conform silabe.ro, și are sursele afișate în quiz.
- Deschide sursele de lângă fiecare explicație: DOOM³ este folosit pentru forma lexicală, iar silabe.ro pentru despărțirea afișată. Nu pretindem că zece dicționare independente confirmă fiecare cuvânt.
- Verifică și cuvinte proprii; estimarea automată rămâne neverificată până când introduci rezultate identice din DOOM³ și silabe.ro.
- Adaugă cuvinte și despărțiri proprii în „Banca ta personală”; intrările apar în rundele următoare și pot fi modificate sau eliminate.
- Răspunsurile greșite sunt păstrate în lista de recapitulare, împreună cu numărul de încercări.
- Poți elimina cuvintele revăzute individual sau poți șterge lista.

Lista de recapitulare și banca personală sunt salvate în `localStorage` și rămân pe dispozitivul și în browserul folosit; nu se sincronizează între dispozitive. Despărțirile adăugate manual sunt contribuții ale utilizatorului, nu sunt verificate automat de dicționare.
Cuvintele introduse sunt procesate local. Verificarea în DOOM³ și silabe.ro este manuală: deschide ambele surse din aplicație și introdu despărțirea completă afișată de fiecare. Aplicația compară transcrierile, dar nu accesează automat site-urile și nu poate confirma că datele au fost copiate corect. Dacă o sursă nu indică despărțirea completă sau sursele diferă, rezultatul rămâne neverificat. Estimarea automată nu este dovadă.

DOOM³ este dicționarul normativ al Institutului de Lingvistică „Iorgu Iordan – Alexandru Rosetti”; în articolele sale, unele indicații de despărțire sunt pentru capăt de rând, nu neapărat o silabisire completă. Consultă [îndrumările DOOM³](https://doom.lingv.ro/indrumari). Datele DOOM³ sunt publicate sub licența CC BY-NC-SA 4.0.

La momentul verificării, cele 12 despărțiri verificate online au fost găsite pe paginile individuale silabe.ro, iar formele de bază au fost căutate separat în DOOM³. Sursele sunt prezentate lângă fiecare explicație. DOOM³ nu oferă o transcriere completă în silabe pentru fiecare cuvânt, iar consultarea a două surse nu garantează infailibilitatea lor.
