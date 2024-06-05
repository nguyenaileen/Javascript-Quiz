// HTML Element Variables
var homepage = document.getElementById("homepage");
var startButton = document.getElementById("startButton");

var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var quizQuestionEl = document.getElementById("quizQuestion");
var result = document.getElementById("result");
var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var answerD = document.getElementById("d");
var timer = document.getElementById("timer");

var gameEnd = document.getElementById("gameEnd");
var score = document.getElementById("score");
var score1 = document.getElementById("score1");
var quizQuestion = document.getElementById("quizQuestion");
var submitScore = document.getElementById("submitScore");
var playAgain = document.getElementById("playAgain");

var highScores = document.getElementById("highScore");

var initialInput = document.querySelector("#initial-text");
var initialForm = document.querySelector("#initial-form");
var initialList = document.querySelector("#initial-list");

var initials = [];

//Quiz Questions
var quizQuestion = [
  {
    question: "Commontly used data types DO NOT include ______.",
    answerA: "Alerts",
    answerB: "Strings",
    answerC: "Booleans",
    answerD: "Numbers",
    correctAnswer: "a",
  },

  {
    question:
      "The condition in an if/else statement is enclosed within _____. ",
    answerA: "Quotes",
    answerB: "Curly Brackets",
    answerC: "Parenthesis",
    answerD: "SquareBrackets",
    correctAnswer: "c",
  },

  {
    question: "Arrays in Javascript can be used to store _____.",
    answerA: "Other arrays",
    answerB: "Strings",
    answerC: "Booleans",
    answerD: "All the above",
    correctAnswer: "d",
  },

  {
    question:
      "String values must be enclosed in ___ when being assigned to variables.",
    answerA: "Quotes",
    answerB: "Curly Brackets",
    answerC: "Parenthesis",
    answerD: "SquareBrackets",
    correctAnswer: "a",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is _______.",
    answerA: "Raid",
    answerB: "Console Log",
    answerC: "Terminal",
    answerD: "Forloops",
    correctAnswer: "b",
  },

  {
    question: "Common Javascrip statements include ______.",
    answerA: "Conditional Statements",
    answerB: "Variable Declarations",
    answerC: "Loop Statements",
    answerD: "All of the above",
    correctAnswer: "d",
  },
];

//other variables
var time = 70;
var timeInt;
var finalQuestion = quizQuestion.length;
var currentQuestion = 0;
var finalScore = 0;

//function that shows quiz questions and answers
function showQuestion() {
  gameEnd.style.display = "none";
  if (currentQuestion === finalQuestion) {
    return showEnd();
  }
  var currentQuestion1 = quizQuestion[currentQuestion];
  quizQuestionEl.innerHTML = "<h1>" + currentQuestion1.question + "</h1>";
  answerA.innerHTML = currentQuestion1.answerA;
  answerB.innerHTML = currentQuestion1.answerB;
  answerC.innerHTML = currentQuestion1.answerC;
  answerD.innerHTML = currentQuestion1.answerD;
}

//checking question answers
function checkCorrect(answer) {
  correct = quizQuestion[currentQuestion].correctAnswer;

  if (answer === correct && currentQuestion !== finalQuestion) {
    finalScore++;
    result.textContent = " Right Answer!";
    currentQuestion++;
    console.log(finalScore);
    showQuestion();
  } else if (answer !== correct && currentQuestion !== finalQuestion) {
    result.textContent = " Wrong Answer :(";
    currentQuestion++;
    showQuestion();
  } else {
    showEnd();
  }
}

//function that hides homepage starts the timer and shows first question

function startQuiz() {
  gameEnd.style.display = "none";
  homepage.style.display = "none";
  showQuestion();

  //Timer
  timerInt = setInterval(function () {
    time--;
    timer.textContent = time + " seconds left";

    if (time === 0) {
      clearInterval(timerInt);
      showEnd();
    }
  }, 1000);
  question.style.display = "block";
  timer.style.display = "block";
}

//function that shows end of game

function showEnd() {
  question.style.display = "none";
  timer.style.display = "none";
  gameEnd.style.display = "flex";
  clearInterval(timerInt);
  finalScore.value = "";
  score.innerHTML = "<h1>" + finalScore + " / 7" + "<h1>";
}

//function that shows save score option

function submit() {
  gameEnd.style.display = "none";
  highScores.style.display = "block";
  score1.innerHTML = "<h1>" + finalScore + " / 7" + "<h1>";
}

//function that saves high scores

//function for replay when button is pressed
function replay() {
  highScores.style.display = "none";
  gameEnd.style.display = "none";
  homepage.style.display = "block";
  time = 76;
  score = 0;
  currentQuestion = 0;
}

//button to start quiz
startButton.addEventListener("click", startQuiz);

//button to start see high scores
submitScore.addEventListener("click", submit);

//button to start replay
playAgain.addEventListener("click", replay);

// The following function renders items in a initial list as <li> elements
function renderInitials() {
  // Clear initialList element
  initialList.innerHTML = "";

  // Render a new li for each initial
  for (var i = 0; i < initials.length; i++) {
    var initial = initials[i];

    var li = document.createElement("li");
    li.textContent = initial;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Delete Score";

    li.appendChild(button);
    initialList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored initials from localStorage
  var storedInitials = JSON.parse(localStorage.getItem("initials"));

  // If initials were retrieved from localStorage, update the initials array to it
  if (storedInitials !== null) {
    initials = storedInitials;
  }

  // This is a helper function that will render initials to the DOM
  renderInitials();
}

function storeInitials() {
  // Stringify and set key in localStorage to initials array
  localStorage.setItem("initials", JSON.stringify(initials));
}

// Add submit event to form
initialForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var initialText =
    initialInput.value.trim() +
    " .............................. " +
    finalScore +
    " / 7";

  // Return from function early if submitted initialText is blank
  if (initialText === "") {
    return;
  }

  // Add new initialText to initials array, clear the input
  initials.push(initialText);
  initialInput.value = "";

  // Store updated initials in localStorage, re-render the list
  storeInitials();
  renderInitials();
});

// Add click event to initialList element
initialList.addEventListener("click", function (event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the initial element from the list
    var index = element.parentElement.getAttribute("data-index");
    initials.splice(index, 1);

    // Store updated initials in localStorage, re-render the list
    storeInitials();
    renderInitials();
  }
});

// Calls init to retrieve data and render it to the page on load
init();
