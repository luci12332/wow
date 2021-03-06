


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
  countdown.innerHTML = "Sf??r??it";
  clearQuestion();
  showResults();
  startButton.innerText = "Re??ncepe";
  startButton.classList.remove("hide");
  timer = 90;
  score = 0;
  scc=0;
}

function showResults() {
 finalScore=scc;
  if (finalScore < 3) {
    finalScore = 0;
scoreArea.innerHTML = `Pe baza informa??iilor primite, nu suferi??i de nicio boal??`;
  }
if (finalScore >=5 && finalScore <=6)
{
scoreArea.innerHTML = `Ave??i o personalitate bipolar??`;
}
if (finalScore >=7 && finalScore <=8)
{
scoreArea.innerHTML = `Ave??i simptome ale depresiei`;
}
if (finalScore >=9)
{
scoreArea.innerHTML = `Suferi??i de schizofrenie v?? recomand??m s?? contacta??i urm??torii doctori:`;
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
scoreArea.innerHTML = `Ave??i semne de anxietate`;
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

  scoreArea.innerHTML = `<h2>Scoruri</h2><ul id="highScoresList"></ul><button id=""clearScores class="btn" onclick="clearScores()">??terge scoruri</button>`;
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
  highScoresList.innerHTML = "<h3>Scorurile au fost ??terse</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


const questions = [
  {
    question: "Suferi??i de atacuri de panic?? scurte ??i frecvente?",
    answers: [
      { text: "Nu ", correct: false },
      { text: "Da", correct: true },
      { text: "Nu ??tiu", correct: false },
      
    ]
  },
  {
    question: "C??nd a??i avut ultimul co??mar? ",
    answers: [
      { text: "Nu mai ??in minte", correct: false },
      { text: "Acum c??teva luni", correct: false },
      { text: "Nu visez ur??t", correct: false },
      { text: "Am aproape in fiecare sear??", correct: true }
    ]
  },
  {
    question: "Ave??i tendin??e suicidale sau de autor??nire?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Da", correct: true }
    ]
  },
  {
    question: "Sunte??i o persoan?? care ????i pierde rapid cump??tul?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Sunt o persoan?? calm??", correct: false },
      { text: "M?? enervez doar dac?? am motiv", correct: false },
      { text: "Da. Uneori ma enervez din nimic", correct: true }
    ]
  },
  {
    question: "Ave??i/A??i avut o rud?? suferind de o psihoz??/nevroz???",
    answers: [
      { text: "Da", correct: true },
      { text: "Nu", correct: false }
    ]
  },
  {
    question: "Experimenta??i halucina??ii?",
    answers: [
      { text: "Nu", correct: false },
      { text: "Uneori", correct: true }
    ]
  },
  {
    question: "V-a??i pierdut abilitatea de a vorbi coerent?",
    answers: [
      { text: "Da. De multe ori nu pot s?? vorbesc", correct: true },
      { text: "Doar dac?? vorbesc in public", correct: false },
      { text: "Nu", correct: false },
      { text: "Doar dac?? beau", correct: false }
    ]
  },
  {
    question: "??n timpul copil??riei,de c??te ori a??i fost abuzat/?? psihologic,fizic,sexual,etc?",
    answers: [
      { text: "Niciodat??", correct: false },
      { text: "Urla c??teodata mama la mine", correct: false },
      { text: "Nu ??tiu", correct: false },
      { text: "Da. De c??teva ori", correct: true }
    ]
  },
  {
    question: "A??i consumat in trecut substan??e narcotice/stupefiante?",
    answers: [
      { text: "O singur?? dat??", correct: false },
      { text: "Nu. Deloc", correct: false },
      { text: "Da. Am urmat un program de reabilitare", correct: true },
      { text: "Nu-mi aduc aminte", correct: false }
    ]
  }
];
