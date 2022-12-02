// Valid game choices
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];

function getUserChoice() {
  let userChoice;
  while (userChoice !== null && !CHOICES.includes(userChoice)) {
    userChoice = prompt(`Pick one of the following: ${CHOICES}`);
  }
  return userChoice;
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function generateAIChoice() {
  return CHOICES[randInt(CHOICES.length)];
}

// Determine the winner by returning the winning move, or null.
function determineWinner(first, second) {
  if (first === second) {
    return null;
  } else if (
    (first === PAPER && second === ROCK) ||
    (first === ROCK && second === SCISSORS) ||
    (first === SCISSORS && second === PAPER)
  ) {
    return first;
  } else {
    return second;
  }
}

function startGame() {
  let userScore = 0;
  let aiScore = 0;
  let playAgain = true;
  while (playAgain) {
    let userChoice = getUserChoice();
    if (!userChoice) {
      return;
    }
    let aiChoice = generateAIChoice();
    let winnerChoice = determineWinner(userChoice, aiChoice);
    alert(`Human picked ${userChoice}\nComputer picked ${aiChoice}`);
    if (!winnerChoice) {
      alert("It's a tie!");
    } else if (userChoice === winnerChoice) {
      alert("You win!");
      userScore++;
    } else if (aiChoice === winnerChoice) {
      alert("Computer wins!");
      aiScore++;
    }
    alert(`Human: ${userScore}\nComputer:${aiScore}`);
    playAgain = prompt("Continue? (y/n)") === "y";
  }
  alert("Thanks for playing!");
}
startGame();
