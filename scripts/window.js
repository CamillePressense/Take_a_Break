//picking timer color
const body = document.querySelector("body");
const menuColor = document.querySelector("#colorChoice");
const showColor = document.querySelectorAll(".color");
const yellowColor = document.querySelector("#yellow");
const orangeColor = document.querySelector("#orange");
const redColor = document.querySelector("#red");
const greenColor = document.querySelector("#green");
const blueColor = document.querySelector("#blue");
const getPin = document.querySelector("#isPined");
const pinDisabled = document.querySelector("#pinDisabled");
const playButton = document.querySelector("#play");

let alwaysOnTopEnabled = true;
getPin.addEventListener("click", () => {
  alwaysOnTopEnabled = !alwaysOnTopEnabled;
  chrome.runtime.sendMessage(
    {
      action: "toggleAlwaysOnTop",
      enabled: alwaysOnTopEnabled,
    },
    (response) => {
      if (response.status === "success") {
        console.log("AlwaysOnTop toggled:", response.message);
        pinDisabled.style.display = "block";
        getPin.style.display = "none";
      } else {
        console.error("Erreur:", response.message);
      }
    }
  );
});

pinDisabled.addEventListener("click", () => {
  alwaysOnTopEnabled = true;
  chrome.runtime.sendMessage(
    {
      action: "toggleAlwaysOnTop",
      enabled: alwaysOnTopEnabled,
    },
    (response) => {
      if (response.status === "success") {
        console.log("AlwaysOnTop enabled:", response.message);
        pinDisabled.style.display = "none";
        getPin.style.display = "block";
      } else {
        console.error("Erreur:", response.message);
      }
    }
  );
});

function showElement() {
  showColor.forEach((element) => {
    element.style.display =
      element.style.display === "block" ? "none" : "block";
  });
}

menuColor.addEventListener("click", () => {
  showElement();
});

yellowColor.addEventListener("click", () => {
  body.style.backgroundColor = "#ffffba";
  showElement();
});

orangeColor.addEventListener("click", () => {
  body.style.backgroundColor = "#ffdfba";
  showElement();
});

redColor.addEventListener("click", () => {
  body.style.backgroundColor = "#ffb3ba";
  showElement();
});

greenColor.addEventListener("click", () => {
  body.style.backgroundColor = "#baffc9";
  showElement();
});

blueColor.addEventListener("click", () => {
  body.style.backgroundColor = "#bae1ff";
  showElement();
});

const PLAY_PAUSE_BUTTON = document.querySelector("#playPauseButton");
//getting working time, displaying timer and breaklogo at the end
document.addEventListener("DOMContentLoaded", function () {
  const TIMER = document.querySelector("#timer");
  const BREAK_LOGO = document.querySelector("#breakLogo");
  const PAUSE_ICON = document.querySelector("#pauseIcon");
  const PLAY_ICON = document.querySelector("#playIcon");
  let isPaused = false;
  let intervalId = null;

  chrome.storage.local.get("workTime", function (data) {
    if (data.workTime) {
      let workTime = data.workTime;
      console.log("Valeur récupérée du local storage:", workTime);
      TIMER.textContent = workTime;

      function startTimer() {
        intervalId = setInterval(() => {
          if (workTime <= 0) {
            clearInterval(intervalId);
            BREAK_LOGO.style.display = "block";
            PLAY_PAUSE_BUTTON.style.display = "none";
          } else {
            workTime--;
            TIMER.textContent = workTime;
          }
        }, 1000);
      }
      startTimer();

      PLAY_PAUSE_BUTTON.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
          PLAY_ICON.style.display = "block";
          PAUSE_ICON.style.display = "none";
          clearInterval(intervalId);
        } else {
          PLAY_ICON.style.display = "none";
          PAUSE_ICON.style.display = "block";
          startTimer();
        }
      });
    }
  });
});

//displaying / hiding options button on hover
function displayElement(e) {
  e.style.display = "block";
}

function hideElement(e) {
  e.style.display = "none";
}

document.addEventListener("mouseover", () => {
  displayElement(menuColor);
  displayElement(PLAY_PAUSE_BUTTON);
});

document.addEventListener("mouseout", () => {
  hideElement(menuColor);
  hideElement(PLAY_PAUSE_BUTTON);
});
