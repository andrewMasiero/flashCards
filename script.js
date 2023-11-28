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
  ["currentButton", "currentInput", "currentImage"]
);
currentProblemSection.currentProblem = generateEquation(1, 9, "*");

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["lastButton", "lastInput", "lastImage"]
);
lastProblemSection.lastTitle = document.querySelector("#last-problem > h2");

const setupForm = document.getElementById("setup-form");

// UNUSED?
const submitButton = document.querySelector("#hidden-submit");

currentProblemSection.currentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentProblemSection.currentInput.value !== "") {
    e.preventDefault();
    updateLastProblem(currentProblemSection, lastProblemSection);

    let arithmaticList = checkSetup(setupForm);
    currentProblemSection.currentProblem = generateEquation(1, 9, ["*"]);
    updateCurrentProblem(currentProblemSection);
  }
});
