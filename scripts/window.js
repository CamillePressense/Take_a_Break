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
  let timeOutId;

  function displayBreakLogo(){
    BREAK_LOGO.style.display = "block";
    PAUSE_ICON.style.display = "none";
    PLAY_ICON.style.display = "none";
    TIMER.style.display = "none";
    menuColor.style.display = "none"; //le hover prend le pas
  };
  
  function displayTimer(){
    BREAK_LOGO.style.display = "none";
    PAUSE_ICON.style.display = "block";
    PLAY_ICON.style.display = "block";
    TIMER.style.display = "block";
    menuColor.style.display = "block";
  }

// On récupère le temps de travail du local storage
  async function getWorkTime() {
    try {
        const result = await chrome.storage.local.get("workTime");
        const workTime = result.workTime;
        console.log("Valeur recuperee work:", workTime);
        return workTime;
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
    }
}


//On récupère le temps de pause
  async function getBreakTime() {
    try {
        const result = await chrome.storage.local.get("breakTime");
        const breakTime = result.breakTime;
        console.log("Valeur recuperee break:", breakTime);
        return breakTime;
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
    }
  }

  //Lancer le décompte du temps de travail
  async function startTimer(timeWork) {
  displayTimer();
    intervalId = setInterval(() => {
      if (timeWork >= 0) {
        TIMER.textContent = timeWork;
        timeWork--;
      } else{
        clearInterval(intervalId)
        breakStart();
      }
    }, 1000);
  }
    
  //Lancer le temps de pause
  async function breakStart(){
    displayBreakLogo();
    const breakTime = await getBreakTime();
    timeOutId = setTimeout(timer, breakTime * 1000)
  }

  //Lancer le timer global
  async function timer(){
    if (timeOutId){
      clearTimeout(timeOutId)
    };
    console.log("fonction timer");
    const workTime = await getWorkTime();
    await startTimer(workTime);
  }
  
  timer();

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
