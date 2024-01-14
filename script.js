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
  startTimer,
  updateScore,
  resetScore,
  resetLastProblemSection,
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
    const evaluation = evaluateAnswer(
      currentProblemSection.currentProblem.answer,
      currentProblemSection.currentInput.value,
    );
    updateLastProblem(currentProblemSection, lastProblemSection, evaluation);
    updateScore(evaluation);

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
    startGame();
  });
});

function startGame() {
  startTimer();
  resetLastProblemSection(lastProblemSection);
  resetScore();
  arithmaticList = checkSetup(setupForm);
  currentProblemSection.currentProblem = generateEquation(1, 9, arithmaticList);
  updateCurrentProblem(currentProblemSection);
}
