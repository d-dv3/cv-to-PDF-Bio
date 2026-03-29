"use strict mode";

let myBody = document.querySelector("body");
let darkModeBtn = document.querySelector(".darkMode");
console.log(darkModeBtn);

darkModeBtn.addEventListener("click", () => {
  if (myBody.classList.contains("day")) {
    myBody.classList.remove("day");
    myBody.classList.add("night");
  } else {
    myBody.classList.remove("night");
    myBody.classList.add("day");
  }
});
