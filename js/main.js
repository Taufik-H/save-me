import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.querySelector(".btn-start");
  const usernameInput = document.querySelector("#usernameInput");
  const saveUsername = document.querySelector("#btnUsername");
  const answerInput = document.querySelector("#answer-input");
  const username = document.querySelector("#uname");
  const submitAnswerBtn = document.querySelector("#answer button");
  const qboard = document.querySelector(".question-board");
  const answerCard = document.querySelector("#answer");
  const btnResult = document.querySelector(".btn-result");
  const meledak = document.querySelector(".sound-meledak");

  let correctAnswersCount = 0;
  let totalAttempts = 0;
  let winrates = [];

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
    if (usernameInput.value === "") {
      alert("Username tidak boleh kosong");
      return;
    }
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
    qboard.classList.remove("popup-hidden");
    answerCard.classList.remove("popup-hidden");
  }

  function displayQuestion() {
    if (currentQuestionIndex < 5) {
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

      const totalSoalElement = document.querySelector(".question-total-soal");
      totalSoalElement.textContent = `${currentQuestionIndex + 1}/5`;
    } else {
      const complete = document.querySelector(".complete");
      showPopup(complete);
    }
  }

  answerInput.addEventListener("input", handleAnswerInput);
  submitAnswerBtn.addEventListener("click", checkAnswer);

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

  let health = 5;
  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

  function checkAnswer() {
    const answer = shuffledQuestions[currentQuestionIndex].answer;
    const inputValue = answerInput.value;
    const lowerCaseInputValue = inputValue.toLowerCase();
    totalAttempts++;

    if (lowerCaseInputValue === answer) {
      const soundBenar = document.querySelector(".sound-benar");
      soundBenar.currentTime = 0;
      soundBenar.play();
      correctAnswersCount++;
      let winrateForThisQuestion = 100 - 20 * (5 - health);
      winrates.push(winrateForThisQuestion);
      resetHealth();
      currentQuestionIndex++;
      answerInput.value = "";
      displayQuestion();
    } else {
      health--;
      const soundMeledak = document.querySelector(".sound-meledak");
      soundMeledak.currentTime = 0;
      soundMeledak.play();
      updateImage();
      if (health <= 0) {
        winrates.push(0);
        resetHealth();
        currentQuestionIndex++;
        answerInput.value = "";
        const salah = document.querySelector(".salah");
        const soundSalah = document.querySelector(".sound-salah");
        soundSalah.volume = 0.5;
        soundSalah.currentTime = 0.5;
        soundSalah.play();
        showPopup(salah);
        const h3 = salah.querySelector("h3");
        h3.textContent = `Jawaban yang benar adalah: ${answer}`;
      }
    }
  }

  function showPopup(popupElement) {
    const popBlur = document.querySelector(".pop-blur");

    popBlur.classList.remove("popup-hidden");
    popupElement.classList.remove("popup-hidden");
  }

  const btnNext = document.querySelector(".btn-next");
  btnNext.addEventListener("click", function () {
    const salah = document.querySelector(".salah");
    const popBlur = document.querySelector(".pop-blur");
    popBlur.classList.add("popup-hidden");
    salah.classList.add("popup-hidden");
    displayQuestion();
  });

  btnResult.addEventListener("click", function () {
    const complete = document.querySelector(".complete");
    const popBlur = document.querySelector(".pop-blur");
    popBlur.classList.add("popup-hidden");
    complete.classList.add("popup-hidden");
    showResults();
  });

  function resetHealth() {
    health = 5;
    updateImage();
  }

  function updateImage() {
    const image = document.querySelector(".question-img img");

    image.src = `assets/balon${health}.svg`;
  }

  function showResults() {
    const soundResult = document.querySelector(".sound-semuabenar");
    soundResult.currentTime = 0;
    soundResult.play();
    let totalWinrate = winrates.reduce((acc, curr) => acc + curr, 0);
    totalWinrate /= winrates.length;
    const username = localStorage.getItem("username");
    const playerName = document.querySelector(".player-name");
    playerName.textContent = username;
    const resultBoard = document.querySelector(".result-board");
    resultBoard.querySelector(
      ".result-data:nth-child(1) p:nth-child(2)"
    ).textContent = "5";
    resultBoard.querySelector(
      ".result-data:nth-child(2) p:nth-child(2)"
    ).textContent = totalAttempts.toString();
    resultBoard.querySelector(
      ".result-data:nth-child(3) p:nth-child(2)"
    ).textContent = "5";
    resultBoard.querySelector(
      ".result-data:nth-child(4) p:nth-child(2)"
    ).textContent = correctAnswersCount.toString();
    resultBoard.querySelector(
      ".result-data:nth-child(5) p:nth-child(2)"
    ).textContent = (5 - correctAnswersCount).toString();
    resultBoard.querySelector(
      ".result-data:nth-child(6) p:nth-child(2)"
    ).textContent = totalWinrate.toFixed(2) + "%";

    qboard.classList.add("popup-hidden");

    answerCard.classList.add("popup-hidden");
    resultBoard.classList.remove("popup-hidden");
  }
  // result btn
  const btnUlang = document.querySelector(".btn-ulang");
  const btnKembali = document.querySelector(".btn-kembali");

  btnUlang.addEventListener("click", function () {
    correctAnswersCount = 0;
    totalAttempts = 0;
    winrates = [];
    health = 5;

    document.querySelector(".result-board").classList.add("popup-hidden");

    startGame();
  });

  btnKembali.addEventListener("click", function () {
    location.reload();
  });

  // disable inpect & right click
  window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px";
    contextElement.classList.add("active");
  });
  window.addEventListener("click", function () {
    var contextElement = document
      .getElementById("context-menu")
      .classList.remove("active");
  });

  //disable shortcut nyari ini ya pak???
  document.onkeydown = function (e) {
    if (e.keyCode == 123) {
      return false;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.keyCode == "I".charCodeAt(0)
    ) {
      return false;
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.keyCode == "C".charCodeAt(0)
    ) {
      return false;
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.keyCode == "J".charCodeAt(0)
    ) {
      return false;
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.keyCode == "U".charCodeAt(0)
    ) {
      return false;
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      e.keyCode == "M".charCodeAt(0)
    ) {
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.keyCode == "M".charCodeAt(0)) {
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.keyCode == "I".charCodeAt(0)) {
      return false;
    }
  };

  // sound
});
