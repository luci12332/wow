


let timer = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const MAX_HIGH_SCORES = 7;
var scc=0;

const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");


let highScores = JSON.parse(localStorage.getItem("highScores")) || [];


startButton.addEventListener("click", startGame);




function startGame() {
  startButton.classList.add("hide");
  
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}


function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}


function startClock() {
  
  if (timer <= 0) {
    gameOver();
  } else {
    timer = 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}


function selectAnswer(e) {
  const selectedButton = e.target;
  if (selectedButton.dataset.correct) {
    
   
scc++;
console.log(scc);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}


function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Sfârșit";
  clearQuestion();
  showResults();
  startButton.innerText = "Reîncepe";
  startButton.classList.remove("hide");
  timer = 90;
  score = 0;
  scc=0;
}

function showResults() {
 finalScore=scc;
  if (finalScore < 3) {
    finalScore = 0;
scoreArea.innerHTML = `Pe baza informațiilor primite, nu suferiți de nicio boală`;
  }
if (finalScore >=5 && finalScore <=6)
{
scoreArea.innerHTML = `Aveți o personalitate bipolară`;
}
if (finalScore >=7 && finalScore <=8)
{
scoreArea.innerHTML = `Aveți simptome ale depresiei`;
}
if (finalScore >=9)
{
scoreArea.innerHTML = `Suferiți de schizofrenie vă recomandăm să contactați următorii doctori:`;
}
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
 if(finalScore >=3 && finalScore <=4)
 {
scoreArea.innerHTML = `Aveți semne de anxietate`;
  const overlay = document.getElementById('overlay2')
  const modal2 =document.getElementById('modal2')
  modal2.classList.add('active')
  overlay.classList.add('active')}
  localStorage.setItem("scor",finalScore);
}



function submitScores(e) {
  const score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}


function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2>Scoruri</h2><ul id="highScoresList"></ul><button id=""clearScores class="btn" onclick="clearScores()">Șterge scoruri</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="Lista de scoruri">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}


function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>Scorurile au fost șterse</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


const questions = [
  {
    question: "Suferiți de atacuri de panică scurte și frecvente?",
    answers: [
      { text: "Nu ", correct: false },
      { text: "Da", correct: true },
      { text: "Nu știu", correct: false },
      
    ]
  },
  {
    question: "Când ați avut ultimul coșmar? ",
    answers: [
      { text: "Nu mai țin minte", correct: false },
      { text: "Acum câteva luni", correct: false },
      { text: "Nu visez urât", correct: false },
      { text: "Am aproape in fiecare seară", correct: true }
    ]
  },
  {
    question: "Aveți tendințe suicidale sau de autorănire?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Da", correct: true }
    ]
  },
  {
    question: "Sunteți o persoană care își pierde rapid cumpătul?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Sunt o persoană calmă", correct: false },
      { text: "Mă enervez doar dacă am motiv", correct: false },
      { text: "Da. Uneori ma enervez din nimic", correct: true }
    ]
  },
  {
    question: "Aveți/Ați avut o rudă suferind de o psihoză/nevroză?",
    answers: [
      { text: "Da", correct: true },
      { text: "Nu", correct: false }
    ]
  },
  {
    question: "Experimentați halucinații?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Uneori", correct: true }
    ]
  },
  {
    question: "V-ați pierdut abilitatea de a vorbi coerent?",
    answers: [
      { text: "Da. De multe ori nu pot să vorbesc", correct: true },
      { text: "Doar dacă vorbesc in public", correct: false },
      { text: "Nu", correct: false },
      { text: "Doar dacă beau", correct: false }
    ]
  },
  {
    question: "În timpul copilăriei,de câte ori ați fost abuzat/ă psihologic,fizic,sexual,etc?",
    answers: [
      { text: "Niciodată", correct: false },
      { text: "Urla câteodata mama la mine", correct: false },
      { text: "Nu știu", correct: false },
      { text: "Da. De câteva ori", correct: true }
    ]
  },
  {
    question: "Ați consumat in trecut substanțe narcotice/stupefiante?",
    answers: [
      { text: "O singură dată", correct: false },
      { text: "Nu. Deloc", correct: false },
      { text: "Da. Am urmat un program de reabilitare", correct: true },
      { text: "Nu-mi aduc aminte", correct: false }
    ]
  }
];
