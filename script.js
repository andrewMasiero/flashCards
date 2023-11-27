import {
  elementTest,
  generateCard,
  updateCard,
  getRandomInteger,
  generateEquation,
  evaluateAnswer,
} from "./flashCardUtils.js";

let currentUserAnswer = document.querySelector("#current-user-answer");
let card = document.querySelector("#current-problem > div> .card");
let lastUserAnswer = document.querySelector("#last-user-answer");
let lastCard = document.querySelector("#last-problem > div> .card");
let currentProblem = generateEquation(1, 9, "*");
let isCorrect = document.querySelector("#is-correct-text");
let picture = document.querySelector("#is-correct-image > img");
let submitButton = document.querySelector("#hidden-submit");
let setupForm = document.getElementById("setup-form");
card.innerHTML = `${currentProblem.equation}<br><br>?`;

// ELEMENTS
const currentProblemSection = collectElements(
  document.querySelector("#current-problem > div").children,
  ["button", "input", "image"]
);
// console.log(currentProblemSection.input);

const lastProblemSection = collectElements(
  document.querySelector("#last-problem > div").children,
  ["button", "input", "image"]
);
lastProblemSection.title = document.querySelector("#last-problem > h2");
console.dir(lastProblemSection.input);

// OTHER VARIABLES

document.addEventListener("keypress", (e) => {
  console.log(currentProblemSection);
  console.dir(currentProblemSection);
});

currentUserAnswer.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && currentUserAnswer.value !== "") {
    e.preventDefault();
    updateLastProblem();
    updateCurrentProblem();
  }
});

function updateLastProblem() {
  //update the card and input showing last user problem and answer
  updateCard(lastCard, currentProblem);
  lastUserAnswer.value = currentUserAnswer.value;

  // create evaluation object to display correctness of answer
  const evaluation = evaluateAnswer(
    currentProblem.answer,
    lastUserAnswer.value
  );
  lastUserAnswer.style.color = evaluation.isCorrect ? "green" : "red";
  isCorrect.textContent = evaluation.message;
  picture.src = evaluation.image;
}

function updateCurrentProblem() {
  checkSetup();
  // reset the current problem and answer
  currentProblem = generateEquation(1, 9, ["*"]);
  card.innerHTML = `${currentProblem.equation}<br><br>?`;
  currentUserAnswer.value = "";
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
