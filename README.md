# Silabar

Aplicație web simplă pentru exersarea despărțirii cuvintelor în silabe.

## Pornire

Deschide `index.html` într-un browser. Nu sunt necesare instalări sau un server.

## Cum funcționează

- Alege una dintre cele patru variante pentru fiecare cuvânt.
- Primești imediat răspunsul corect și o explicație.
- Verifică și cuvinte proprii; aplicația folosește despărțiri verificate pentru cuvintele din exercițiu și reguli generale pentru celelalte.
- Răspunsurile greșite sunt păstrate în lista de recapitulare, împreună cu numărul de încercări.
- Poți elimina cuvintele revăzute individual sau poți șterge lista.

Lista de recapitulare este salvată în `localStorage` și rămâne pe dispozitivul și în browserul folosit.
Cuvintele introduse în verificator sunt procesate local. Lista verificată include și exemple comparate cu [silabe.ro](https://www.silabe.ro/). Pentru cuvintele necunoscute aplicației, despărțirea este o estimare și poate avea excepții; verifică forma în dicționar dacă ai nevoie de certitudine.
