//picking timer color
const body = document.querySelector("body");
const menuColor = document.querySelector("#colorChoice");
const showColor = document.querySelectorAll(".color");
const yellowColor = document.querySelector("#yellow");
const orangeColor = document.querySelector("#orange");
const redColor = document.querySelector("#red");
const greenColor = document.querySelector("#green");
const blueColor = document.querySelector("#blue");

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

//getting working time, displaying timer and breaklogo at this end
document.addEventListener('DOMContentLoaded', function(){
    const TIMER = document.querySelector("#timer")
    const BREAK_LOGO = document.querySelector("#breakLogo");
    chrome.storage.local.get("workTime", function(data) {
        if (data.workTime) {
            let workTime = data.workTime;
            console.log("Valeur recuperee du local storage:", workTime);
            TIMER.textContent = workTime
            setInterval(() => {
                TIMER.textContent = workTime
                workTime <= 0 ? (BREAK_LOGO.style.display = "block") : workTime--;
            }, 60000);
        }
    })
})


