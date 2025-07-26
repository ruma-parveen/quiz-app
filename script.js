const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Mark Language"],
    correct: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<javascript>", "<script>", "<js>", "<scripting>"],
    correct: 1,
  },
  {
    question: "Which property is used in CSS to change the text color?",
    options: [
      "font-color",
      "text-color",
      "color",
      "text-style"
    ],
    correct: 2
  },
  {
    question: "What is the correct syntax for referring to an external script called 'app.js'?",
    options: [
      "<script name='app.js'>",
      "<script href='app.js'>",
      "<script src='app.js'>",
      "<script file='app.js'>"
    ],
    correct: 2
  },
  {
    question: "Which of the following is a correct way to write a JavaScript array?",
    options: [
      "var colors = 'red', 'green', 'blue'",
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = ['red', 'green', 'blue']",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectOption(index, li));
    optionsEl.appendChild(li);
  });
  nextBtn.disabled = true;
}

function selectOption(index, element) {
  const correctIndex = questions[currentQuestion].correct;
  const allOptions = document.querySelectorAll("li");
  allOptions.forEach(opt => opt.style.pointerEvents = "none");

  if (index === correctIndex) {
    element.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    element.classList.add("wrong");
    allOptions[correctIndex].classList.add("correct");
    feedbackEl.textContent = "Wrong!";
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
