// array of questions the student selected
const notesArray = window.localStorage.getItem("notesArray").split(",");
// array of all the questions (in form of images)
const questionImages = Array.from(document.getElementsByTagName("img")).map(
  (e) => e.dataset["note"]
);
// answers
const answers = Array.from(document.getElementsByClassName("answer"));
const scoreText = document.getElementById("score");
console.log(notesArray);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const MAX_QUESTIONS = notesArray.length * 2;
const CORRECT_BONUS = 1;

let questions = [];
for (let i = 0; i < notesArray.length; i++) {
  for (let j = 0; j < 2; j++) {
    questions.push({
      question: `${notesArray[i]}`,
      answer: `${notesArray[i][0]}`,
    });
  }
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    window.localStorage.setItem("mostRecentScore", score);
    window.localStorage.setItem("totalPoints", MAX_QUESTIONS);
    // go to the end page
    return window.location.assign("../pages/end.html");
  }
  // turn off all the images
  Array.from(document.getElementsByTagName("img")).forEach(e => e.classList.remove("visible"));

  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // random question from questions array
  currentQuestion = availableQuestions[questionIndex];
  // set the question
  document
    .querySelector(`[data-note=${currentQuestion.question}]`)
    .classList.toggle("visible");

  // remove question from array
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// logic to determine correct answer
answers.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["answer"];

    let classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 2000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = `Your Score: ${score}`;
};

startGame();
