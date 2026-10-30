const questions = [
  {
    word: "masă",
    answer: "ma-să",
    choices: ["mas-ă", "ma-să", "m-a-să", "maș-ă"],
    explanation: "Litera s este între două vocale, așa că trece la silaba următoare: ma-să. Fiecare silabă păstrează un sunet vocalic."
  },
  {
    word: "carte",
    answer: "car-te",
    choices: ["ca-rte", "car-te", "c-ar-te", "cart-e"],
    explanation: "În grupul de consoane rt, prima consoană r închide silaba, iar t începe silaba următoare: car-te."
  },
  {
    word: "copil",
    answer: "co-pil",
    choices: ["cop-il", "co-pil", "c-op-il", "co-pi-l"],
    explanation: "Consoana p se află între două vocale și începe silaba următoare: co-pil, nu cop-il."
  },
  {
    word: "copac",
    answer: "co-pac",
    choices: ["cop-ac", "co-pac", "co-pa-c", "c-opac"],
    explanation: "Când o singură consoană se află între două vocale, ea trece la silaba următoare: co-pac."
  },
  {
    word: "floare",
    answer: "floa-re",
    choices: ["flo-a-re", "floa-re", "floar-e", "f-loa-re"],
    explanation: "Grupul vocalic oa se pronunță împreună în aceeași silabă. De aceea despărțirea este floa-re."
  },
  {
    word: "frumos",
    answer: "fru-mos",
    choices: ["frum-os", "fru-mos", "fru-mo-s", "f-ru-mos"],
    explanation: "Consoana m, aflată între vocale, începe silaba următoare. Grupul fr rămâne împreună la început: fru-mos."
  },
  {
    word: "fereastră",
    answer: "fe-reas-tră",
    choices: ["fer-eas-tră", "fe-reas-tră", "fe-reast-ră", "f-e-reas-tră"],
    explanation: "Consoana r dintre vocale trece la silaba următoare. Grupul str poate începe o silabă, așa că rămâne împreună: fe-reas-tră."
  },
  {
    word: "mașină",
    answer: "ma-și-nă",
    choices: ["maș-i-nă", "ma-și-nă", "ma-șin-ă", "m-a-și-nă"],
    explanation: "Consoanele ș și n, aflate între vocale, trec fiecare la începutul silabei următoare: ma-și-nă."
  },
  {
    word: "pădure",
    answer: "pă-du-re",
    choices: ["păd-u-re", "pă-du-re", "pă-dur-e", "p-ă-du-re"],
    explanation: "Consoanele d și r sunt între vocale și deschid silabele următoare: pă-du-re."
  },
  {
    word: "albină",
    answer: "al-bi-nă",
    choices: ["a-lbi-nă", "al-bi-nă", "al-bin-ă", "a-l-b-i-nă"],
    explanation: "Între două vocale, grupul de două consoane lb se desparte: prima închide silaba, iar a doua o începe pe următoarea: al-bi-nă."
  },
  {
    word: "strugure",
    answer: "stru-gu-re",
    choices: ["strug-ure", "stru-gu-re", "s-tru-gu-re", "stru-gur-e"],
    explanation: "Grupul str poate sta la începutul unei silabe și rămâne împreună. Consoanele g și r, între vocale, încep silabe noi: stru-gu-re."
  },
  {
    word: "învățător",
    answer: "în-vă-ță-tor",
    choices: ["î-nvă-ță-tor", "în-vă-ță-tor", "în-văț-ă-tor", "în-vă-țăt-or"],
    explanation: "Grupul de litere în formează prima silabă, iar v începe silaba următoare. Apoi cuvântul continuă în ritmul ță-tor: în-vă-ță-tor."
  }
];

const STORAGE_KEY = "silabar-mistakes-v1";

const wordElement = document.querySelector("#word");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const questionCountElement = document.querySelector("#question-count");
const scoreLabelElement = document.querySelector("#score-label");
const progressElement = document.querySelector(".progress-track");
const progressFillElement = document.querySelector("#progress-fill");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const questionPanel = document.querySelector("#question-panel");
const resultsPanel = document.querySelector("#results-panel");
const resultsTitle = document.querySelector("#results-title");
const resultsCopy = document.querySelector("#results-copy");
const mistakesListElement = document.querySelector("#mistakes-list");
const mistakeCountElement = document.querySelector("#mistake-count");
const clearMistakesButton = document.querySelector("#clear-mistakes");
const storageNotice = document.querySelector("#storage-notice");
const wordCheckerForm = document.querySelector("#word-checker-form");
const customWordInput = document.querySelector("#custom-word");
const wordCheckerResult = document.querySelector("#word-checker-result");
const sourceCheck = document.querySelector("#source-check");
const doomSourceLink = document.querySelector("#doom-source-link");
const silabeSourceLink = document.querySelector("#silabe-source-link");
const doomResultInput = document.querySelector("#doom-result");
const silabeResultInput = document.querySelector("#silabe-result");
const compareSourcesButton = document.querySelector("#compare-sources");
const sourceCheckFeedback = document.querySelector("#source-check-feedback");
const vowels = new Set(["a", "ă", "â", "e", "i", "î", "o", "u"]);
const diphthongs = new Set([
  "ai", "au", "ea", "ei", "eu", "ia", "ie", "ii", "io", "iu",
  "oa", "oi", "ou", "ua", "uă", "ăi", "ău", "îi", "îu"
]);
const consonantOnsets = new Set([
  "bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr",
  "tl", "tr", "vl", "vr", "sc", "șc", "sp", "șp", "st", "șt",
  "scr", "șcr", "spl", "șpl", "spr", "șpr", "str", "ștr"
]);

let round = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let mistakes = loadMistakes();

function syllabify(word) {
  const letters = Array.from(word);
  const nuclei = [];

  for (let index = 0; index < letters.length;) {
    if (!vowels.has(letters[index])) {
      index += 1;
      continue;
    }

    const pair = letters.slice(index, index + 2).join("");
    const length = diphthongs.has(pair) ? 2 : 1;
    nuclei.push({ start: index, end: index + length });
    index += length;
  }

  if (nuclei.length < 2) return word;

  const boundaries = [0];
  for (let index = 0; index < nuclei.length - 1; index += 1) {
    const left = nuclei[index];
    const right = nuclei[index + 1];
    const consonantCount = right.start - left.end;
    let boundary = right.start;

    if (consonantCount === 1) {
      boundary = left.end;
    } else if (consonantCount === 2) {
      const cluster = letters.slice(left.end, right.start).join("");
      boundary = consonantOnsets.has(cluster) ? left.end : left.end + 1;
    } else if (consonantCount > 2) {
      const between = letters.slice(left.end, right.start).join("");
      const onsetLength = [3, 2].find((length) => consonantOnsets.has(between.slice(-length))) ?? 1;
      boundary = right.start - onsetLength;
    }

    boundaries.push(boundary);
  }
  boundaries.push(letters.length);

  const syllables = boundaries.slice(0, -1).map((start, index) =>
    letters.slice(start, boundaries[index + 1]).join("")
  );
  return syllables.join("-");
}

function showWordCheck(message, isError = false) {
  wordCheckerResult.textContent = message;
  wordCheckerResult.classList.toggle("is-error", isError);
  wordCheckerResult.hidden = false;
}

function normalizeLetters(value) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("ro-RO")
    .replaceAll("ş", "s")
    .replaceAll("ţ", "t");
}

function readSourceSyllabification(value, word) {
  const syllables = value.trim().split(/[\s\-‐‑‒–—•·]+/u);
  if (
    syllables.length < 2
    || syllables.some((syllable) => !/^[a-zăâîșț]+$/iu.test(syllable))
    || normalizeLetters(syllables.join("")) !== normalizeLetters(word)
  ) {
    return null;
  }

  return syllables.map((syllable) => normalizeLetters(syllable));
}

function setSourceCheckFeedback(message, isError = false) {
  sourceCheckFeedback.textContent = message;
  sourceCheckFeedback.classList.toggle("is-error", isError);
  sourceCheckFeedback.hidden = false;
}

wordCheckerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sourceCheck.hidden = true;
  const word = customWordInput.value.trim().normalize("NFC").toLocaleLowerCase("ro-RO")
    .replaceAll("ş", "ș")
    .replaceAll("ţ", "ț");

  if (!word) {
    showWordCheck("Scrie un cuvânt înainte să apeși „Verifică”.", true);
    customWordInput.focus();
    return;
  }

  if (!/^[a-zăâîșț]+$/u.test(word)) {
    showWordCheck("Introdu un singur cuvânt, folosind doar litere românești.", true);
    customWordInput.focus();
    return;
  }

  const doomUrl = new URL(`/cautare/q/${encodeURIComponent(word)}`, "https://doom.lingv.ro");
  const plainWord = word.normalize("NFD").replace(/\p{M}/gu, "")
    .replaceAll("ă", "a")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("ș", "s")
    .replaceAll("ț", "t");
  doomSourceLink.href = doomUrl.href;
  silabeSourceLink.href = `https://www.silabe.ro/desparte-in-silabe-${encodeURIComponent(plainWord)}.html`;
  doomResultInput.value = "";
  silabeResultInput.value = "";
  sourceCheckFeedback.hidden = true;
  sourceCheckFeedback.className = "source-check-feedback";
  sourceCheck.hidden = false;
  showWordCheck(`Estimare automată (neverificată): ${syllabify(word)}. Nu o considera corectă până când două surse independente nu afișează aceeași despărțire completă.`);
});

compareSourcesButton.addEventListener("click", () => {
  const word = customWordInput.value.trim().normalize("NFC").toLocaleLowerCase("ro-RO")
    .replaceAll("ş", "ș")
    .replaceAll("ţ", "ț");
  const doomSyllables = readSourceSyllabification(doomResultInput.value, word);
  const silabeSyllables = readSourceSyllabification(silabeResultInput.value, word);

  if (!doomSyllables || !silabeSyllables) {
    setSourceCheckFeedback("Nu este confirmat. Introdu despărțirea completă din ambele surse, cu cel puțin două silabe, și verifică să corespundă cuvântului.", true);
    return;
  }

  if (doomSyllables.join("|") !== silabeSyllables.join("|")) {
    setSourceCheckFeedback("Sursele nu coincid. Cuvântul rămâne neverificat; consultă un profesor sau o lucrare de specialitate.", true);
    return;
  }

  const confirmed = doomResultInput.value.trim().split(/[\s\-‐‑‒–—•·]+/u).join("-");
  setSourceCheckFeedback(`Cele două transcrieri coincid: ${confirmed}. Confirmat doar pentru această verificare manuală; estimarea automată nu este folosită drept dovadă.`);
});

function showStorageNotice(message) {
  storageNotice.textContent = message;
  storageNotice.hidden = false;
}

function loadMistakes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};

    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Formatul listei salvate nu este valid.");
    }

    return parsed;
  } catch (error) {
    showStorageNotice("Lista de recapitulare nu a putut fi citită. Răspunsurile din această vizită vor fi păstrate doar cât timp pagina rămâne deschisă.");
    console.error("Nu s-au putut încărca răspunsurile greșite:", error);
    return {};
  }
}

function saveMistakes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
    storageNotice.hidden = true;
  } catch (error) {
    showStorageNotice("Nu am putut salva lista pe acest dispozitiv. Verifică setările de stocare ale browserului.");
    console.error("Nu s-au putut salva răspunsurile greșite:", error);
  }
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function formatMistakeCount(count) {
  if (count === 1) return "1 încercare greșită";
  return `${count} încercări greșite`;
}

function renderMistakes() {
  const entries = Object.entries(mistakes);
  mistakeCountElement.textContent = String(entries.length);
  mistakeCountElement.setAttribute("aria-label", `${entries.length} ${entries.length === 1 ? "răspuns de revăzut" : "răspunsuri de revăzut"}`);
  clearMistakesButton.hidden = entries.length === 0;

  if (entries.length === 0) {
    mistakesListElement.innerHTML = '<div class="empty-state"><span class="empty-icon" aria-hidden="true">♡</span><p>Încă nu ai greșeli de revăzut.<br>Continuă exercițiul!</p></div>';
    return;
  }

  mistakesListElement.replaceChildren();
  for (const [word, item] of entries) {
    const row = document.createElement("article");
    row.className = "mistake-item";

    const top = document.createElement("div");
    top.className = "mistake-item-top";
    const wordLabel = document.createElement("span");
    wordLabel.className = "mistake-word";
    wordLabel.textContent = word;
    const attempts = document.createElement("span");
    attempts.className = "mistake-attempts";
    attempts.textContent = formatMistakeCount(item.count);
    top.append(wordLabel, attempts);

    const answer = document.createElement("p");
    answer.className = "mistake-answer";
    answer.append("Corect: ");
    const correct = document.createElement("strong");
    correct.textContent = item.answer;
    answer.append(correct);

    const resolve = document.createElement("button");
    resolve.className = "resolve-button";
    resolve.type = "button";
    resolve.textContent = "Am exersat acest cuvânt";
    resolve.setAttribute("aria-label", `Elimină ${word} din lista de recapitulare`);
    resolve.addEventListener("click", () => {
      delete mistakes[word];
      saveMistakes();
      renderMistakes();
    });

    row.append(top, answer, resolve);
    mistakesListElement.append(row);
  }
}

function updateProgress() {
  const completed = currentIndex + (answered ? 1 : 0);
  questionCountElement.textContent = `${Math.min(currentIndex + 1, round.length)} / ${round.length}`;
  progressFillElement.style.width = `${(completed / round.length) * 100}%`;
  progressElement.setAttribute("aria-valuemax", String(round.length));
  progressElement.setAttribute("aria-valuenow", String(completed));
  scoreLabelElement.textContent = `${score} ${score === 1 ? "răspuns corect" : "răspunsuri corecte"}`;
}

function renderQuestion() {
  const question = round[currentIndex];
  answered = false;
  wordElement.textContent = question.word;
  answersElement.replaceChildren();
  feedbackElement.hidden = true;
  feedbackElement.className = "feedback";
  nextButton.hidden = true;

  for (const choice of shuffle(question.choices)) {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(button, choice, question));
    answersElement.append(button);
  }

  updateProgress();
}

function selectAnswer(selectedButton, selectedAnswer, question) {
  if (answered) return;
  answered = true;
  const isCorrect = selectedAnswer === question.answer;
  if (isCorrect) {
    score += 1;
  } else {
    const previous = mistakes[question.word];
    mistakes[question.word] = {
      answer: question.answer,
      count: previous ? previous.count + 1 : 1,
      lastWrong: new Date().toISOString()
    };
    saveMistakes();
    renderMistakes();
  }

  for (const button of answersElement.querySelectorAll(".answer-button")) {
    button.disabled = true;
    if (button.textContent === question.answer) {
      button.classList.add("is-correct");
    } else if (button === selectedButton) {
      button.classList.add("is-wrong");
    } else {
      button.classList.add("is-muted");
    }
  }

  feedbackElement.classList.add(isCorrect ? "is-correct" : "is-wrong");
  const heading = document.createElement("strong");
  heading.textContent = isCorrect ? "Exact! Ai găsit ritmul cuvântului." : `Aproape! Varianta corectă este ${question.answer}.`;
  const explanation = document.createElement("span");
  explanation.textContent = question.explanation;
  feedbackElement.replaceChildren(heading, explanation);
  feedbackElement.hidden = false;
  nextButton.textContent = currentIndex === round.length - 1 ? "Vezi rezultatul" : "Următorul cuvânt";
  nextButton.hidden = false;
  updateProgress();
}

function showResults() {
  questionPanel.hidden = true;
  resultsPanel.hidden = false;
  resultsTitle.textContent = score === round.length ? "Ai strălucit!" : score >= round.length / 2 ? "Bravo, continui să crești!" : "Exercițiul face diferența!";
  resultsCopy.textContent = `Ai răspuns corect la ${score} din ${round.length} cuvinte. ${Object.keys(mistakes).length ? "Cuvintele de revăzut te așteaptă în lista alăturată." : "N-ai nicio greșeală salvată. Minunat!"}`;
  questionCountElement.textContent = `${round.length} / ${round.length}`;
  progressFillElement.style.width = "100%";
  progressElement.setAttribute("aria-valuenow", String(round.length));
}

function startRound() {
  round = shuffle(questions);
  currentIndex = 0;
  score = 0;
  questionPanel.hidden = false;
  resultsPanel.hidden = true;
  renderQuestion();
}

nextButton.addEventListener("click", () => {
  if (currentIndex < round.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", startRound);
clearMistakesButton.addEventListener("click", () => {
  mistakes = {};
  saveMistakes();
  renderMistakes();
});

renderMistakes();
startRound();
