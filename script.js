let userAnswer = document.querySelector("#current > div> .answer");
let card = document.querySelector("#current > div> .card");
let lastUserAnswer = document.querySelector("#last > div> .answer");
let lastCard = document.querySelector("#last > div> .card");
let current = generateEquation(1, 9, "*");
let isCorrect = document.querySelector("#is-correct > h1");
let picture = document.querySelector("#is-correct > img");
let submitButton = document.querySelector("#hidden-submit");
let setupForm = document.getElementById("selection");
card.innerHTML = `${current.equation}<br><br>?`;

function generateCard() {
  return "test card";
}

userAnswer.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && userAnswer.value !== "") {
    // const selectedOperations = submitButton.click();
    // console.log(selectedOperations);
    // if (selectedOperations) {
    // console.log(selectedOperations);
    e.preventDefault();
    lastCard.innerHTML = `${current.equation}<br><br>${current.answer}`;
    lastUserAnswer.value = userAnswer.value;
    const evaluation = evaluateAnswer(current.answer, lastUserAnswer.value);
    lastUserAnswer.style.color = evaluation.boolean ? "green" : "red";
    isCorrect.textContent = evaluation.text;
    picture.src = evaluation.image;
    current = generateEquation(1, 9, "*");
    card.innerHTML = `${current.equation}<br><br>?`;
    userAnswer.value = "";
    // }
  }
  //   card.classList.toggle("flip");
});

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateEquation(min, max, operend) {
  const a = getRandomInteger(min, max);
  const b = getRandomInteger(min, max);
  const current = { equation: `${a} ${operend} ${b}` };
  switch (operend) {
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
    result.text = "Correct! 👍🐢";
    result.image = "images/happyPuppy.jpg";
    result.boolean = true;
    var audio = new Audio("sounds/short-crowd-cheer-6713.mp3");
  } else {
    result.text = "Wrong! 👎🙁";
    result.image = "images/elGato.jpg";
    result.boolean = false;
    var audio = new Audio(
      "sounds/080047_lose_funny_retro_video-game-80925.mp3"
    );
  }
  audio.play();
  return result;
}

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
