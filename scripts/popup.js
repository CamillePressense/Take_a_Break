// remove working time 
document.addEventListener("DOMContentLoaded", function () {
    const MINUS_WORK_BUTTON = document.querySelector("#workMin");
    const WORK_TIME = document.querySelector("#workTime");
    MINUS_WORK_BUTTON.addEventListener("click", () => {
        let workTime = Number(WORK_TIME.value);
        workTime -= 1;
        WORK_TIME.value = workTime;
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
    })
})
