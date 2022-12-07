let flipCards = document.querySelectorAll(".flip-card");
let currentCard;
let timeOutId;
flipCards.forEach(function (card) {
  card.addEventListener("click", makeCardFlip);
  card.flipped = false;
});

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
