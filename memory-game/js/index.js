// https://upload.wikimedia.org/wikipedia/commons/d/d8/Atlas_deck_card_back_blue_and_brown.svg
const BACK_CARD_SRC = "./img/back-card.svg";

// let flipCards = document.querySelectorAll(".flip-card");
// let currentCard;
// let timeOutId;
// flipCards.forEach(function (card) {
//   card.addEventListener("click", makeCardFlip);
//   card.flipped = false;
// });

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

function addCardToUI() {
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
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg"
          alt="Avatar"
          style="width: 300px; height: 300px"
        />
      </div>
    </div>
  </div>
  `;

  document.getElementById("cardContainer").append(col);
}

addCardToUI();
