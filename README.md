# Silabar

Aplicație web simplă pentru exersarea despărțirii cuvintelor în silabe.

## Pornire

Deschide `index.html` într-un browser. Nu sunt necesare instalări sau un server.

## Cum funcționează

- Alege una dintre cele patru variante pentru fiecare cuvânt.
- Primești imediat răspunsul corect și o explicație.
- Exersează și cuvintele din listele ilustrate furnizate; rundele au câte 12 cuvinte și parcurg banca înainte să o reia.
- Verifică și cuvinte proprii; estimarea automată rămâne neverificată până când introduci rezultate identice din DOOM³ și silabe.ro.
- Răspunsurile greșite sunt păstrate în lista de recapitulare, împreună cu numărul de încercări.
- Poți elimina cuvintele revăzute individual sau poți șterge lista.

Lista de recapitulare este salvată în `localStorage` și rămâne pe dispozitivul și în browserul folosit.
Cuvintele introduse sunt procesate local. Verificarea în DOOM³ și silabe.ro este manuală: deschide ambele surse din aplicație și introdu despărțirea completă afișată de fiecare. Rezultatul este confirmat doar dacă ambele transcrieri acoperă cuvântul și coincid silabă cu silabă. Aplicația nu citește automat site-urile și nu poate confirma că transcrierile au fost copiate corect. Dacă o sursă nu indică despărțirea completă sau sursele diferă, rezultatul rămâne neverificat. Estimarea automată nu este dovadă.

DOOM³ este dicționarul normativ al Institutului de Lingvistică „Iorgu Iordan – Alexandru Rosetti”; în articolele sale, unele indicații de despărțire sunt pentru capăt de rând, nu neapărat o silabisire completă. Consultă [îndrumările DOOM³](https://doom.lingv.ro/indrumari). Datele DOOM³ sunt publicate sub licența CC BY-NC-SA 4.0.
