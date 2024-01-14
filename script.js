// browser-sync start --server --files "**/*"

import {
  checkSetup,
  updateCurrentProblem,
  updateLastProblem,
  collectElements,
  generateCard,
  updateCard,
  getRandomInteger,
  generateEquation,
  evaluateAnswer,
} from "./flashCardUtils.js";

// ELEMENTS
const currentProblemSection = collectElements(
  document.querySelector("#current-problem > div").children,
  ["currentButton", "currentInput", "currentImage"],
);
const setupForm = document.getElementById("setup-form");
let arithmaticList = checkSetup(setupForm);
currentProblemSection.currentProblem = generateEquation(1, 9, arithmaticList);
updateCurrentProblem(currentProblemSection);

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["lastButton", "lastInput", "lastImage"],
);
lastProblemSection.lastTitle = document.querySelector("#last-problem > h2");

// UNUSED?
const submitButton = document.querySelector("#hidden-submit");

currentProblemSection.currentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentProblemSection.currentInput.value !== "") {
    e.preventDefault();
    updateLastProblem(currentProblemSection, lastProblemSection);

    arithmaticList = checkSetup(setupForm);
    currentProblemSection.currentProblem = generateEquation(
      1,
      9,
      arithmaticList,
    );
    updateCurrentProblem(currentProblemSection);
  }
});

// TIMER
document.addEventListener("DOMContentLoaded", () => {
  const timerForm = document.getElementById("start-form");

  timerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startTimer();
  });

  function startTimer() {
    let timer = document.getElementById("timer-display");
    let timeInSeconds = 120;
    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      timer.textContent = formattedTime;
      if (timeInSeconds === 0) {
        clearInterval(timerInterval);
        alert("Time's Up!");
      } else {
        timeInSeconds--;
      }
    }
  }
});
