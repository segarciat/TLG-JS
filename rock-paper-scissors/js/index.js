// Valid game choices
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];

function getUserChoice() {
  let userChoice;
  while (userChoice !== null && !CHOICES.includes(userChoice)) {
    let input = prompt(`Pick one of the following: ${CHOICES}`);
    userChoice = input && input.trim().toLowerCase();
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
  // Player always starts from 0 with each match.
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
    let message = `Human picked ${userChoice}\nComputer picked ${aiChoice}`;
    if (!winnerChoice) {
      message += "\nIt's a tie!";
    } else if (userChoice === winnerChoice) {
      message += "\nYou win!";
      userScore++;
    } else if (aiChoice === winnerChoice) {
      message += "\nComputer wins!";
      aiScore++;
    }
    alert(message);
    document.getElementById("player-score").textContent = userScore;
    document.getElementById("ai-score").textContent = aiScore;

    playAgain = prompt("Continue? (y/n)") === "y";
  }
  alert("Thanks for playing!");
}
document.getElementById("play-btn").onclick = startGame;
