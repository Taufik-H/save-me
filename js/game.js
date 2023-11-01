document.addEventListener("DOMContentLoaded", () => {
  const audioElements = document.querySelectorAll("audio");
  const soundIcon = document.getElementById("soundicon");
  const imgElement = soundIcon.querySelector("img");

  let backsound = audioElements[0];
  let klikSound = audioElements[1];

  // backsound
  backsound.volume = 0.4;
  backsound.currentTime = 0;
  // backsound.play();
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

  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      klikSound.currentTime = 0;
      klikSound.play();
    });
  });
});
