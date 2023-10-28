import "../css/style.css";
import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
  const TOTAL_QUESTIONS = 5; // total soal yang perlu dikerjakan

  const startBtn = document.querySelector(".btn-start");
  const usernameInput = document.querySelector("#usernameInput");
  const saveUsername = document.querySelector("#btnUsername");
  const answerInput = document.querySelector("#answer-input");
  const username = document.querySelector("#uname");
  const questionTotalDisplay = document.querySelector(".question-total-soal");
  const submitButton = document.querySelector("#submitAnswer");

  let health = 5;

  const previousUsername = localStorage.getItem("username");
  if (previousUsername) {
    usernameInput.value = previousUsername;
  }

  startBtn.addEventListener("click", function () {
    const start = document.querySelector("#rules");
    start.classList.add("popup-hidden");
    username.classList.remove("popup-hidden");
  });

  saveUsername.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value;
    localStorage.setItem("username", usernameValue);
    startGame();
  });

  let shuffledQuestions = [];
  let currentQuestionIndex = 0;

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startGame() {
    shuffledQuestions = shuffleArray([...questions]).slice(0, TOTAL_QUESTIONS);
    currentQuestionIndex = 0;
    username.classList.add("popup-hidden");
    displayQuestion();

    const qboard = document.querySelector(".question-board");
    const answerCard = document.querySelector("#answer");
    qboard.classList.remove("popup-hidden");
    answerCard.classList.remove("popup-hidden");
  }

  function displayQuestion() {
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      const question = shuffledQuestions[currentQuestionIndex];
      const questionElement = document.querySelector(".question p");
      questionElement.textContent = question.question;

      answerInput.setAttribute("maxlength", question.answer.length);

      const guessElement = document.querySelector(".guess");

      while (guessElement.firstChild) {
        guessElement.removeChild(guessElement.firstChild);
      }

      for (let i = 0; i < question.answer.length; i++) {
        const p = document.createElement("p");
        p.classList.add("word");
        guessElement.appendChild(p);
      }

      // Update tampilan soal saat ini
      questionTotalDisplay.textContent = `${
        currentQuestionIndex + 1
      }/${TOTAL_QUESTIONS}`;
    } else {
      endGame();
    }
  }

  answerInput.addEventListener("input", handleAnswerInput);

  function handleAnswerInput() {
    const inputValue = answerInput.value;
    const wordElements = document.querySelectorAll(".guess p");

    wordElements.forEach((wordEl, index) => {
      wordEl.textContent = inputValue[index] || "";
      if (inputValue[index]) {
        wordEl.classList.add("word-fill");
        wordEl.classList.remove("word");
      } else {
        wordEl.classList.remove("word-fill");
        wordEl.classList.add("word");
      }
    });
  }
  submitButton.addEventListener("click", function (e) {
    e.preventDefault(); // Ini untuk mencegah reload jika tombol tersebut berada di dalam form
    checkAnswer();
  });
  function checkAnswer() {
    const answer = shuffledQuestions[currentQuestionIndex].answer;
    const inputValue = answerInput.value;

    if (inputValue.toLowerCase() === answer.toLowerCase()) {
      health = 5;
      updateImage();
      currentQuestionIndex++;
      answerInput.value = "";
      displayQuestion();
    } else {
      health--;
      updateImage();
      if (health === 0) {
        alert("Jawaban yang benar adalah: " + answer);
        health = 5;
        currentQuestionIndex++;
        answerInput.value = "";
        displayQuestion();
      } else {
        alert("Nyawa anda tinggal " + health);
      }
    }
  }

  function updateImage() {
    const image = document.querySelector(".question-img img");
    image.src = `./assets/balon${health}.svg`;
  }

  function endGame() {
    console.log("Game over!");
  }
});
