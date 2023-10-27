import "../css/style.css";
import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.querySelector(".btn-start");
  const usernameInput = document.querySelector("#usernameInput");
  const saveUsername = document.querySelector("#btnUsername");
  const answerInput = document.querySelector("#answer-input");
  const username = document.querySelector("#uname");

  // Load username sebelumnya jika ada
  const previousUsername = localStorage.getItem("username");
  if (previousUsername) {
    usernameInput.value = previousUsername;
  }

  // hidden btn-start dan munculkan masukan username
  startBtn.addEventListener("click", function () {
    const start = document.querySelector("#rules");
    start.classList.add("popup-hidden");
    username.classList.remove("popup-hidden");
  });

  // simpan username ke localstorage
  saveUsername.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value;
    localStorage.setItem("username", usernameValue);
    startGame();
  });

  let shuffledQuestions = [];
  let currentQuestionIndex = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame() {
    shuffledQuestions = shuffleArray([...questions]);
    currentQuestionIndex = 0;

    username.classList.add("popup-hidden");
    displayQuestion();

    const qboard = document.querySelector(".question-board");
    const answerCard = document.querySelector("#answer");
    qboard.classList.remove("popup-hidden");
    answerCard.classList.remove("popup-hidden");
  }

  function displayQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length) {
      const question = shuffledQuestions[currentQuestionIndex];
      const questionElement = document.querySelector(".question p");
      questionElement.textContent = question.question;

      // Set maximum input length sesuai dengan panjang jawaban
      answerInput.setAttribute("maxlength", question.answer.length);

      const guessElement = document.querySelector(".guess");

      // Menghapus semua children dari .guess
      while (guessElement.firstChild) {
        guessElement.removeChild(guessElement.firstChild);
      }

      // Membuat elemen <p> berdasarkan panjang jawaban
      for (let i = 0; i < question.answer.length; i++) {
        const p = document.createElement("p");
        p.classList.add("word");
        guessElement.appendChild(p);
      }
    } else {
      endGame();
    }
  }

  answerInput.addEventListener("input", handleAnswerInput);

  function handleAnswerInput() {
    const wordElements = document.querySelectorAll(".guess p");
    const inputValue = answerInput.value;

    wordElements.forEach((wordEl, index) => {
      if (inputValue[index]) {
        wordEl.textContent = inputValue[index];
        wordEl.classList.remove("word");
        wordEl.classList.add("word-fill");
      } else {
        wordEl.textContent = "";
        wordEl.classList.add("word");
      }
    });
  }

  function endGame() {
    console.log("Game over!");
    // Anda bisa menambahkan apa yang ingin dilakukan setelah game selesai di sini.
  }
});
