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
  let current = {};
  operand = operand[getRandomInteger(1, operand.length) - 1];
  let a = getRandomInteger(min, max);
  let b = getRandomInteger(min, max);
  switch (operand) {
    case "+":
      current.answer = a + b;
      break;
    case "-":
      a += b;
      current.answer = a - b;
      break;
    case "*":
      current.answer = a * b;
      break;
    case "/":
      a *= b;
      current.answer = a / b;
      break;
  }

  current.equation = `${a} ${operand} ${b}`;
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

function checkSetup(setupForm) {
  let list = [];
  //check the setup form for values to determine type of problems we want to use
  for (let i = 0; i < 4; i++) {
    if (setupForm[i].checked) list.push(setupForm[i].value);
  }

  return list;
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

export {
  checkSetup,
  updateCurrentProblem,
  updateLastProblem,
  collectElements,
  generateCard,
  updateCard,
  getRandomInteger,
  generateEquation,
  evaluateAnswer,
};
