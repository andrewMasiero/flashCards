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
  ["currentButton", "currentInput", "currentImage"]
);

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["lastButton", "lastInput", "lastImage"]
);
lastProblemSection.lastTitle = document.querySelector("#last-problem > h2");

const setupForm = document.getElementById("setup-form");
setupForm.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    setProblem();
  }
});

// arithmeaticList will be used to check which types of arithmatice problems will be used when setProblem() is called
// I don't remember why this variable is set globally; there must have been problems. It seems a bit odd like this though
// there is probably a better way
let arithmaticList;
setProblem();

// Generate date and add to date field in score section
const dateField = document.getElementById("date-field");
let d = new Date();
dateField.textContent = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// ANSWER THE PROBLEM
currentProblemSection.currentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentProblemSection.currentInput.value !== "") {
    e.preventDefault();
    const evaluation = evaluateAnswer(
      currentProblemSection.currentProblem.answer,
      currentProblemSection.currentInput.value
    );
    updateLastProblem(currentProblemSection, lastProblemSection, evaluation);
    updateScore(evaluation);
    setProblem();
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

// START A NEW DRILL
function startGame() {
  startTimer();
  resetLastProblemSection(lastProblemSection);
  resetScore();
  setProblem();
}

// SET NEW PROBLEM TO SOLVE
function setProblem() {
  arithmaticList = checkSetup(setupForm);
  currentProblemSection.currentProblem = generateEquation(1, 9, arithmaticList);
  updateCurrentProblem(currentProblemSection);
}
