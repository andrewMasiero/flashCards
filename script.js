import {
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
  ["currentButton", "currentInput", "currentImage"]
);
currentProblemSection.currentProblem = generateEquation(1, 9, "*");

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["lastButton", "lastInput", "lastImage"]
);
lastProblemSection.lastTitle = document.querySelector("#last-problem > h2");

// UNUSED?
let submitButton = document.querySelector("#hidden-submit");
let setupForm = document.getElementById("setup-form");

currentProblemSection.currentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentProblemSection.currentInput.value !== "") {
    e.preventDefault();
    updateLastProblem(currentProblemSection, lastProblemSection);
    currentProblemSection.currentProblem = generateEquation(1, 9, ["*"]);
    updateCurrentProblem(currentProblemSection);
  }
});
