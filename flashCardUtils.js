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

function elementTest(testElement) {
  console.log(testElement.children[0]);
  // const button = testElement.children[1].children[0];
  // const input = testElement.children[1].children[1];
  // const image = testElement.children[1].children[2];
  // console.log(button, input, image);
  // console.dir(testElement);
}

export {
  elementTest,
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
