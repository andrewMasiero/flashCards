function generateCard() {
  return "test card";
}

function updateCard(myElement, currentProblem) {
  const { equation, answer } = currentProblem;
  myElement.innerHTML = `${equation}<br><br>${answer}`;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation(min, max, operand) {
  const a = getRandomInteger(min, max);
  const b = getRandomInteger(min, max);
  operand = operand[getRandomInteger(1, operand.length) - 1];

  const current = { equation: `${a} ${operand} ${b}` };
  switch (operand) {
    case "+":
      current.answer = a + b;
      break;
    case "-":
      current.answer = a - b;
      break;
    case "*":
      current.answer = a * b;
      break;
    case "/":
      current.answer = a / b;
      break;
  }
  return current;
}

function evaluateAnswer(a, b) {
  a = parseInt(a);
  b = parseInt(b);
  let result = {};
  if (a === b) {
    result.message = "LAST PROBLEM: Correct! 👍🐢";
    result.image = "images/happyPuppy.jpg";
    result.isCorrect = true;
    var audio = new Audio("sounds/short-crowd-cheer-6713.mp3");
  } else {
    result.message = "LAST PROBLEM: Wrong! 👎🙁";
    result.image = "images/elGato.jpg";
    result.isCorrect = false;
    var audio = new Audio(
      "sounds/080047_lose_funny_retro_video-game-80925.mp3"
    );
  }
  audio.play();
  return result;
}

function updateLastProblem(currentProblemSection, lastProblemSection) {
  let { currentButton, currentInput, currentImage, currentProblem } =
    currentProblemSection;
  let { lastButton, lastInput, lastImage, lastTitle } = lastProblemSection;

  //update the card and input showing last user problem and answer
  updateCard(lastButton, currentProblem);
  lastInput.value = currentInput.value;

  // is the answer correct?
  const evaluation = evaluateAnswer(currentProblem.answer, lastInput.value);
  lastInput.style.color = evaluation.isCorrect ? "green" : "red";
  lastTitle.textContent = evaluation.message;
  lastImage.src = evaluation.image;
}

function updateCurrentProblem(currentProblemSection) {
  let { currentButton, currentInput, currentProblem } = currentProblemSection;
  currentButton.innerHTML = `${currentProblem.equation}<br><br>?`;
  currentInput.value = "";
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

//BELOW THIS LINE IS OLD STUFF; ABOVE THIS LINE IS NEWLY IMPLEMENTED LOGIC

//update the card and input showing last user problem and answer

export {
  updateCurrentProblem,
  updateLastProblem,
  collectElements,
  generateCard,
  updateCard,
  getRandomInteger,
  generateEquation,
  evaluateAnswer,
};

// setupForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const checkboxes = document.querySelectorAll(
//     'input[name="operation"]:checked'
//   );
//   const selections = Array.from(checkboxes).map((checkbox) => checkbox.value);
//   if (selections.length > 0) {
//     return selections;
//   }
//   console.log(selections);
//   console.log("should return false");
//   return false;

//   // Now you can use the selectedOperations array to generate problems based on user selections.
//   // For example, if "addition" is selected, generate addition problems; if "multiplication" is selected, generate multiplication problems, and so on.
// });
