"use strict";
// https://upload.wikimedia.org/wikipedia/commons/d/d8/Atlas_deck_card_back_blue_and_brown.svg

/**
 * Global constants.
 */
const BACK_CARD_SRC = "./img/back-card.svg";
const MAX_CARDS = 16;
const UNIQUE_IMAGES_SRC = [
  "https://i.giphy.com/media/bMSaGMYM8OvsN2gKb6/giphy.webp",
  "https://i.giphy.com/media/t3cL1iKETUqlBaQ6YV/giphy.webp",
  "https://i.giphy.com/media/cnWLVExrejEiZz5xa9/giphy.webp",
  "https://i.giphy.com/media/jqIhAXf3SBpMxVpYsB/giphy.webp",
  "https://i.giphy.com/media/ZSJCdxWnrXuJG6vDbB/giphy.webp",
  "https://i.giphy.com/media/XVC9ElNTFmZ8yxyBOW/giphy.webp",
  "https://i.giphy.com/media/jOywF6yzPBJ2D9KK1x/giphy.webp",
  "https://i.giphy.com/media/VbtUysLNF86UaOwxKm/giphy.webp",
];
const FLIP_ANIMATION_DURATION = 2000;

// Possible states card can be in.
const REVEALED = "revealed";
const HIDDEN = "hidden";
const MATCHED = "matched";

/**
 * Global state.
 */
let currentCard; // First card clicked.
let mismatchTimeoutId; // Delayed unflip timeout ID upon mismatch.

function addAllCardsToUI() {
  // Picked half of MAX_CARDS src strings.
  const srcs = UNIQUE_IMAGES_SRC.slice(0, MAX_CARDS / 2);
  const shuffledSrcs = shuffled(srcs.concat(srcs));
  shuffledSrcs.forEach((src) => addCardToUI(src));
}

function addCardToUI(src) {
  const col = document.createElement("div");
  col.classList = "col-md-3";
  col.innerHTML = `
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img
          src="${BACK_CARD_SRC}"
          alt="back-card"
          style="width: 300px; height: 300px"
        />
      </div>
      <div class="flip-card-back">
        <img
          src="${src}"
          alt="Matching-card"
          style="width: 300px; height: 300px"
        />
      </div>
    </div>
  </div>
  `;

  // By default, flip cards are not revealed.
  const card = col.querySelector(".flip-card");
  card.state = HIDDEN;
  card.addEventListener("click", handleCardClick);
  document.getElementById("cardContainer").append(col);
}

function handleCardClick(e) {
  const card = e.target.closest(".flip-card");
  if (card.state === REVEALED) {
    return; // ignore the click.
  } else if (mismatchTimeoutId) {
    clearTimeout(mismatchTimeoutId);
    const otherCard = Array.from(document.querySelectorAll(".flip-card")).find(
      (card) => card.state === REVEALED && card != currentCard
    );
    handleMismatch(otherCard);
  }
  // Reveal the card
  flip(card);
  // Check if a card has already been revealed.
  if (!currentCard) {
    currentCard = card;
  } else if (checkMatch(card, currentCard)) {
    handleMatch(card);
  } else {
    // Set to flip after a short time
    mismatchTimeoutId = setTimeout(
      () => handleMismatch(card),
      FLIP_ANIMATION_DURATION
    );
  }
}

function flip(card) {
  const inner = card.querySelector(".flip-card-inner");
  const isRevealed = card.state === REVEALED;
  inner.style.transform = isRevealed ? "" : "rotateY(180deg)";
  card.state = isRevealed ? HIDDEN : REVEALED;
}

function checkMatch(cardOne, cardTwo) {
  let imgLinkOne = cardOne
    .querySelector(".flip-card-back img")
    .getAttribute("src");
  let imgLinkTwo = cardTwo
    .querySelector(".flip-card-back img")
    .getAttribute("src");
  return imgLinkOne === imgLinkTwo;
}

function handleMatch(card) {
  card.removeEventListener("click", handleCardClick);
  currentCard.removeEventListener("click", handleCardClick);
  card.state = MATCHED;
  currentCard.state = MATCHED;
  currentCard = null;
}

function handleMismatch(card) {
  flip(card);
  flip(currentCard);
  mismatchTimeoutId = null;
  currentCard = null;
}
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffled(array) {
  // Copy the array (don't modify original).
  const shuffled = array.slice(0);

  // Shuffle it.
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

addAllCardsToUI();
