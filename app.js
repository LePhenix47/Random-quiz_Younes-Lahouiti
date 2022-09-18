const correctAnswers = ["1", "4", "2", "3", "2"];
const phrases = ["Amazing!", "Good!", "Nice", "Bruh", "Please..."];

const submitAnswersButton = document.querySelector(".main__submit-btn");
const form = document.querySelector(".main__form");

form.addEventListener("submit", handleAnswerSubmission);

//
function handleAnswerSubmission(e) {
  e.preventDefault();
  const results = [];
  const radioButtonsChecked = document.querySelectorAll(".main__input:checked"); //⚠ NodeList & not an HTMLCollection

  const radioButtonsCheckedArray = Array.from(radioButtonsChecked);
  if (radioButtonsChecked.length < 5) {
    let remainingAnswersToBeFilled = 5 - radioButtonsChecked.length;
    alert(
      `Please check in all the ${remainingAnswersToBeFilled} remaining ${
        remainingAnswersToBeFilled > 1 ? "answers" : "answer"
      }!`
    );
    return;
  }

  console.log(radioButtonsCheckedArray);
  for (let i = 0; i < radioButtonsCheckedArray.length; i++) {
    let radioButtonElement = radioButtonsCheckedArray[i];
    let answerIsCorrect =
      radioButtonElement.getAttribute("data-answer") === correctAnswers[i];

    if (answerIsCorrect) {
      results.push(true);
    } else {
      results.push(false);
    }
  }

  console.table(results);

  console.log(radioButtonsChecked.parentElement);
  showResults(results);

  addColorsToCards(results);
}

//
const resultsParagraph = document.querySelector(".main__results-card");
const scoreParagraph = document.querySelector(".main__results-score");

function showResults(results) {
  const numberOfErrorsArray = results.filter((answer) => {
    return answer === false;
  });

  const numberOfErrors = numberOfErrorsArray.length;

  console.groupCollapsed("Number of errors");
  console.table(numberOfErrorsArray);
  console.log(numberOfErrors);
  console.groupEnd("Number of errors");

  scoreParagraph.classList?.remove("hide");

  switch (numberOfErrors) {
    case 0: {
      resultsParagraph.textContent =
        "Excellent! You've answered ALL the questions correctly, GG!";
      scoreParagraph.textContent = "Final score: 5 / 5";

      break;
    }
    case 1: {
      resultsParagraph.textContent =
        "Nice! You've answered near perfectly, you're almost there!";
      scoreParagraph.textContent = "Final score: 4 / 5";
      break;
    }
    case 2: {
      resultsParagraph.textContent =
        "Not bad! You've managed to get a score above average! You can still do better";
      scoreParagraph.textContent = "Final score: 3 / 5";
      break;
    }
    case 3: {
      resultsParagraph.textContent =
        "Mannaggia! You almost had a score above average! Try again!";
      scoreParagraph.textContent = "Final score: 2 / 5";
      break;
    }
    case 4: {
      resultsParagraph.textContent =
        "Oh snap! You've managed to get only 1 answer right... try again!";
      scoreParagraph.textContent = "Final score: 1 / 5";
      break;
    }
    case 5: {
      resultsParagraph.innerHTML = `Crap! You answered all the questions incorrectly! <br/>
      Make some research, comeback and answer back again!`;
      scoreParagraph.textContent = "Final score: 0 / 5";
      break;
    }

    default: {
      break;
    }
  }
}

const cards = document.querySelectorAll(".main__card-section");
const cardsArray = Array.from(cards);

function addColorsToCards(results) {
  for (let i = 0; i < results.length; i++) {
    cardElement = cardsArray[i];
    if (results[i]) {
      cardElement.classList?.remove("incorrect");
      cardElement.classList.add("correct");
    } else {
      cardElement.classList?.remove("correct");
      cardElement.classList.add("incorrect");
    }
  }
}

const radioButtons = document.querySelectorAll(".main__input");
const radioButtonsArray = Array.from(radioButtons);

for (radioButton of radioButtonsArray) {
  radioButton.addEventListener("click", resetCardColor);
}

function resetCardColor(e) {
  let card = e.target.parentElement.parentElement;
  card.classList?.remove("correct");
  card.classList.remove("incorrect");
}
