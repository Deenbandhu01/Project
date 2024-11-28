// Quiz Questions
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2, // index of correct answer
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1,
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: 2,
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "12"],
        answer: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;

// Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const quizContainer = document.getElementById("quiz");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

// Load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(li);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll("#answers li");

    options.forEach((option, index) => {
        option.style.pointerEvents = "none"; // Disable clicks
        if (index === currentQuestion.answer) {
            option.style.backgroundColor = "green";
        } else if (index === selectedIndex) {
            option.style.backgroundColor = "red";
        }
    });

    if (selectedIndex === currentQuestion.answer) {
        score++;
    }

    nextButton.style.display = "block";
}

// Go to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.style.display = "none";
    } else {
        showResult();
    }
});

// Show the result
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = `${score} / ${quizData.length}`;
}

// Restart the quiz
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
    nextButton.style.display = "none";
});

// Initialize
loadQuestion();
nextButton.style.display = "none";
