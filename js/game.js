// add game sound
document.addEventListener("DOMContentLoaded", () => {
  const klikSound = new Audio("../sound/kliktombol.wav");
  const backsound = new Audio("../sound/backsound.wav");
  const buttons = document.querySelectorAll("button");
  const soundIcon = document.getElementById("soundicon");
  const imgElement = soundIcon.querySelector("img");

  // backsound
  backsound.preload = "auto";
  backsound.load();
  backsound.currentTime = 0;
  backsound.play();
  soundIcon.addEventListener("click", function () {
    if (!backsound.paused) {
      backsound.pause();
      imgElement.src = "assets/soundoff.svg";
    } else {
      backsound.play();
      imgElement.src = "assets/sound.svg";
    }
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      klikSound.preload = "auto";
      klikSound.load();
      klikSound.currentTime = 0;
      klikSound.play();
    });
  });
});
