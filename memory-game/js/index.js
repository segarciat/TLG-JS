"use strict";
// https://upload.wikimedia.org/wikipedia/commons/d/d8/Atlas_deck_card_back_blue_and_brown.svg
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
  card.revealed = false;
  card.addEventListener("click", handleCardClick);
  document.getElementById("cardContainer").append(col);
}

function handleCardClick(e) {
  const card = e.target.closest(".flip-card");
  if (card.revealed) {
    return; // ignore the click.
  }
  animateFlip(card);
  card.revealed = true;
}

function animateFlip(card) {
  const inner = card.querySelector(".flip-card-inner");
  inner.style.transform = card.revealed ? "" : "rotateY(180deg)";
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

// let currentCard;
// let timeOutId;

function makeCardFlip(e) {
  let card = e.target.closest(".flip-card");
  let inner = card.querySelector(".flip-card-inner");
  //   The card is already flipped, ignore the click
  if (card.flipped || timeOutId) {
    return;
  } else {
    inner.style.transform = "rotateY(180deg)";
    card.flipped = true;
  }
  // Check if there is a current card
  if (!currentCard) {
    currentCard = card;
  } else if (checkMatch(currentCard, card)) {
    // Give player points
    currentCard = null;
  } else {
    timeOutId = setTimeout(() => unflipCards(card, currentCard), 3000);
    card.flipped = false;
    currentCard.flipped = false;
  }
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

function unflipCards(cardOne, cardTwo) {
  let innerOne = cardOne.querySelector(".flip-card-inner");
  let innerTwo = cardTwo.querySelector(".flip-card-inner");
  innerOne.style = "";
  innerTwo.style = "";
  timeOutId = null;
  currentCard = null;
}

addAllCardsToUI();
