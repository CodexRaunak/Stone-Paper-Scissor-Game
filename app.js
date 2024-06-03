const INITIAL_MOVES = 10;
const choices = ["Rock", "Paper", "Scissor"];

let movesLeft = INITIAL_MOVES;
let isAnimating = false;

const moves = document.querySelector(".moves");
const body = document.querySelector("body");
const playerScore = document.querySelector(".player p");
const computerScore = document.querySelector(".computer p");
const ans = document.querySelector(".ans");
const btns = document.querySelectorAll(".btn");
const playerHand = document.querySelector(".playerHand");
const compHand = document.querySelector(".compHand");

function generateChoice() {
  let choice = Math.floor(Math.random() * 3);
  return choices[choice];
}

function updateResultMessage(playerWon) {
  if (playerWon === null) {
    ans.textContent = "Tie";
  } else if (playerWon) {
    ans.textContent = "You Won";
  } else {
    ans.textContent = "Computer Won";
  }
}

function resetGame() {
  playerScore.textContent = `0`;
  computerScore.textContent = `0`;
  moves.textContent = `${INITIAL_MOVES}`;
  ans.textContent = `Play`;
  movesLeft = INITIAL_MOVES;
}

function calcMoves() {
  if (movesLeft > 0) {
    movesLeft -= 1;
    moves.textContent = `${movesLeft}`;
  }
}

function checkAnswer(userChoice, computerChoice) {
  if (
    (userChoice == "Rock" && computerChoice == "Scissor") ||
    (userChoice == "Scissor" && computerChoice == "Paper") ||
    (userChoice == "Paper" && computerChoice == "Rock")
  ) {
    return true;
  } else if (
    (userChoice == "Rock" && computerChoice == "Paper") ||
    (userChoice == "Scissor" && computerChoice == "Rock") ||
    (userChoice == "Paper" && computerChoice == "Scissor")
  ) {
    return false;
  } else {
    return null;
  }
}

function updateScore(playerWon) {
  if (playerWon) {
    playerScore.textContent = `${parseInt(playerScore.textContent) + 1}`;
  } else if (playerWon == false) {
    computerScore.textContent = `${parseInt(computerScore.textContent) + 1}`;
  }
}

function handleGameOver() {
  ans.textContent =
    playerScore.textContent > computerScore.textContent
      ? `You won! Press any key to start again`
      : `Nice try! Press any key to start again`;
  const resetHandler = () => {
    resetGame();
    // Remove the event listener after it is executed once
    body.removeEventListener("keypress", resetHandler);
  };

  // Add the event listener to reset the game
  body.addEventListener("keypress", resetHandler);
}

function changeImage(userChoice, computerChoice) {
  playerHand.src = `./assets/${userChoice}.png`;
  compHand.src = `./assets/${computerChoice}.png`;
  if (userChoice == "Scissor") {
    playerHand.style.transform = "rotate(242deg)";
  } else if (userChoice == "Paper") {
    playerHand.style.transform = "scaleX(-1)";
  } else {
    playerHand.style.transform = "";
  }

  if (computerChoice == "Scissor") {
    compHand.style.transform = "rotate(45deg)";
  } else if (computerChoice == "Paper") {
    compHand.style.transform = "scaleX(1)";
  } else {
    compHand.style.transform = "";
  }
}

function handleAnimation(playerHand, compHand) {
  playerHand.style.animation = "";
  compHand.style.animation = "";
  playerHand.src = `./assets/Rock.png`;
  compHand.src = `./assets/Rock.png`;
  playerHand.style.transform = "";
  compHand.style.transform = "scaleX(-1)";
}

function toggleBtn(state) {
  btns.forEach((btn) => {
    btn.style.pointerEvents = state ? "none" : "";
  });
}

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (movesLeft > 0 && !isAnimating) {
      isAnimating = true;
      const userChoice = this.innerText; // this refers to the clicked button
      const computerChoice = generateChoice();
      const playerWon = checkAnswer(userChoice, computerChoice);

      playerHand.style.animation = "movePlayer 2.5s ease";
      compHand.style.animation = "moveComp 2.5s ease";
      toggleBtn(true);
      setTimeout(() => {
        changeImage(userChoice, computerChoice);
        updateResultMessage(playerWon);
        calcMoves();
        updateScore(playerWon);
        setTimeout(() => {
          handleAnimation(playerHand, compHand);
          toggleBtn(false);
          isAnimating = false;
          if (movesLeft === 0) {
            handleGameOver();
          }
        }, 1000);
      }, 2500);
    }
  });
});
