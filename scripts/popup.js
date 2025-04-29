// remove working time
document.addEventListener("DOMContentLoaded", function () {
  const MINUS_WORK_BUTTON = document.querySelector("#workMin");
  const PLUS_WORK_BUTTON = document.querySelector("#workPlus");
  const WORK_TIME = document.querySelector("#workTime");

  MINUS_WORK_BUTTON.addEventListener("click", () => {
    let workTime = Number(WORK_TIME.value);
    if (workTime > 1) {
      workTime -= 1;
      WORK_TIME.value = workTime;
    }
  });

  PLUS_WORK_BUTTON.addEventListener("click", () => {
    let workTime = Number(WORK_TIME.value);
    workTime += 1;
    WORK_TIME.value = workTime;
  });
});

//add and remove break time
document.addEventListener("DOMContentLoaded", function () {
  const MINUS_BREAK_BUTTON = document.querySelector("#breakMin");
  const PLUS_BREAK_BUTTON = document.querySelector("#breakPlus");
  const BREAK_TIME_INPUT = document.querySelector("#workTimeBreak");

  MINUS_BREAK_BUTTON.addEventListener("click", function () {
    let breakTime = Number(BREAK_TIME_INPUT.value);
    if (breakTime > 1) {
      breakTime -= 1;
      BREAK_TIME_INPUT.value = breakTime;
    }
  });

  PLUS_BREAK_BUTTON.addEventListener("click", () => {
    let breakTime = Number(BREAK_TIME_INPUT.value);
    breakTime += 1;
    BREAK_TIME_INPUT.value = breakTime;
  });
});

//send values to background and local storage on start button
document.addEventListener("DOMContentLoaded", function () {
  const WORK_TIME = document.querySelector("#workTime");
  const BREAK_TIME_INPUT = document.querySelector("#workTimeBreak");
  const START_BUTTON = document.querySelector("#start");

  const openWindow = () => {
    let workTimeValue = Number(WORK_TIME.value);
    let breakTimeValue = Number(BREAK_TIME_INPUT.value);

    chrome.runtime.sendMessage({
      action: "openWindow",
    });
    chrome.storage.local.set({ workTime: workTimeValue }, function () {
      console.log("Durée travail enregistrée dans le local storage");
    });
    chrome.storage.local.set({ breakTime: breakTimeValue }, function () {
      console.log("Durée break enregistrée dans le local storage");
    });
    window.close();
  };

  START_BUTTON.addEventListener("click", openWindow);

    document.addEventListener("keydown", event =>{
        if (event.key === "Enter"){
            event.preventDefault();
            openWindow();
        }
    });
})





