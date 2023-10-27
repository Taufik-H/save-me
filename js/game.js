import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
  // Elemen-elemen yang diperlukan
  const startBtn = document.querySelector(".btn-start");
  const questionElement = document.querySelector(".question p");
  const guessElements = document.querySelectorAll(".guess .word");
  const answerInput = document.querySelector(".answer-input input");
  const submitBtn = document.querySelector(".answer-input button");
  const questionTotalSoal = document.querySelector(".question-total-soal");
  const questionImg = document.querySelector(".question-img img");

  // Data pertanyaan
  const questions = questions;
  let currentQuestion = null;
  let currentGuess = "";
  let mistakes = 0;
  let currentQuestionIndex = 0;

  // Event listeners
  startBtn.addEventListener("click", startGame);
  submitBtn.addEventListener("click", checkAnswer);

  function startGame() {
    currentQuestionIndex = 0;
    nextQuestion();
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      resetGuess();
      currentQuestionIndex++;
      questionTotalSoal.textContent = `${currentQuestionIndex}/5`;
    } else {
      endGame();
    }
  }

  function resetGuess() {
    currentGuess = "_".repeat(currentQuestion.answer.length);
    renderGuess();
  }

  function renderGuess() {
    for (let i = 0; i < guessElements.length; i++) {
      guessElements[i].textContent = currentGuess[i] || "";
    }
  }

  function checkAnswer() {
    const answer = answerInput.value.toLowerCase();
    if (answer.includes(currentQuestion.answer)) {
      nextQuestion();
    } else {
      mistakes++;
      if (mistakes >= 5) {
        // Update gambar balon/ekspresi hewan
        questionImg.src = "/assets/balon" + (5 - mistakes) + ".svg";
        nextQuestion(); // lanjut ke pertanyaan berikutnya
      }
      if (mistakes === 5) {
        endGame();
      }
    }
    answerInput.value = ""; // reset input
  }

  function endGame() {
    // Anda dapat menambahkan logika untuk menampilkan hasil game atau mengarahkan pemain ke halaman hasil.
    alert("Game over!");
  }
});
