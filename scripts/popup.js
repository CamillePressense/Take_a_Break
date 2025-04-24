// remove working time 
document.addEventListener("DOMContentLoaded", function () {
    const MINUS_WORK_BUTTON = document.querySelector("#workMin");
    const WORK_TIME = document.querySelector("#workTime");
    MINUS_WORK_BUTTON.addEventListener("click", () => {
        let workTime = Number(WORK_TIME.value);
        if (workTime > 1){
        workTime -= 1;
        WORK_TIME.value = workTime;
        }
    })
})

//add working time
document.addEventListener("DOMContentLoaded", function () {
    const PLUS_WORK_BUTTON = document.querySelector("#workPlus");
    const WORK_TIME = document.querySelector("#workTime");
    PLUS_WORK_BUTTON.addEventListener("click", () => {
        let workTime = Number(WORK_TIME.value);
        workTime += 1;
        WORK_TIME.value = workTime;
        }
    )
})
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
//close the pop up when start button is clicked
document.addEventListener("DOMContentLoaded", function () {
  const getButton = document.querySelector("#start");
  getButton.addEventListener("click", () => {
    window.close();
  });
});
