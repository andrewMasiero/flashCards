import {
  elementTest,
  generateCard,
  updateCard,
  getRandomInteger,
  generateEquation,
  evaluateAnswer,
} from "./flashCardUtils.js";

// ELEMENTS
const currentProblemSection = collectElements(
  document.querySelector("#current-problem > div").children,
  ["button", "input", "image"]
);

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["button", "input", "image"]
);
lastProblemSection.title = document.querySelector("#last-problem > h2");

// UNUSED?
let submitButton = document.querySelector("#hidden-submit");
let setupForm = document.getElementById("setup-form");

// OTHER VARIABLE DECLARATIONS
let problem = generateEquation(1, 9, "*");

// main sections
// document.addEventListener("keypress", (e) => {
//   console.log(currentProblemSection);
//   console.dir(currentProblemSection);
// });

currentProblemSection.input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentProblemSection.input.value !== "") {
    e.preventDefault();
    updateLastProblem();
    updateCurrentProblem();
  }
});

function updateLastProblem() {
  //update the card and input showing last user problem and answer
  updateCard(lastProblemSection.button, problem);
  lastProblemSection.input.value = currentProblemSection.input.value;

  // create evaluation object to display correctness of answer
  const evaluation = evaluateAnswer(
    problem.answer,
    lastProblemSection.input.value
  );
  lastProblemSection.input.style.color = evaluation.isCorrect ? "green" : "red";
  lastProblemSection.title.textContent = evaluation.message;
  lastProblemSection.image.src = evaluation.image;
}

function updateCurrentProblem() {
  checkSetup();
  // reset the current problem and answer
  problem = generateEquation(1, 9, ["*"]);
  currentProblemSection.button.innerHTML = `${problem.equation}<br><br>?`;
  currentProblemSection.input.value = "";
}

function checkSetup() {
  //check the setup form for values to determine type of problems we want to use
  //check if checkboxes are checked; get values if they're checked
}

function collectElements(htmlCollection, names) {
  if (htmlCollection.length === names.length) {
    //create an object with the name from the names list
    const htmlArray = Array.from(htmlCollection);
    const collection = {};
    for (let i = 0; i < htmlArray.length; i++) {
      collection[names[i]] = htmlArray[i];
    }
    return collection;
  }
}
