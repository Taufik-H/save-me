document.addEventListener("DOMContentLoaded", () => {
  const audioElements = document.querySelectorAll("audio");
  const soundIcon = document.getElementById("soundicon");
  const imgElement = soundIcon.querySelector("img");

  let backsound = audioElements[0];
  let klikSound = audioElements[1];
  let klikkanan = audioElements[2];

  // backsound
  backsound.volume = 0.4;
  backsound.currentTime = 0;
  backsound.play();
  backsound.loop = true;
  soundIcon.addEventListener("click", function () {
    if (!backsound.paused) {
      backsound.pause();
      imgElement.src = "assets/soundoff.svg";
    } else {
      backsound.play();
      imgElement.src = "assets/sound.svg";
    }
  });

  const buttons = document.querySelectorAll(".btn-sound");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      klikSound.currentTime = 0;
      klikSound.play();
    });
  });

  window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    klikkanan.volume = 0.5;
    klikkanan.currentTime = 0;
    klikkanan.play();
  });
});
