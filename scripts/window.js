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
