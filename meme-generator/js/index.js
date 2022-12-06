const CARD_DATA_KEY = "card-data";
const CARD_TITLE_ATTRIBUTE = "data-meme-title";

const addForm = document.querySelector("#addMemeModal form");
addForm.addEventListener("submit", handleAddSubmit);
window.addEventListener("load", addAllCardsToUI);

function handleAddSubmit(evt) {
  // This will stop the default behavior on submission, which is a page refresh
  evt.preventDefault();
  //   console.log(addForm.elements); // you can get the form that was submitted this way
  const imageUrl = addForm.elements.imageUrl.value;
  const topText = addForm.elements.topText.value;
  const bottomText = addForm.elements.bottomText.value;

  const cardData = { imageUrl, topText, bottomText, id: Date.now() };
  addCardToUI(cardData);
  addCardToDB(cardData);

  // Clear the input fields provided by the user.
  addForm.reset();

  const closeBtn = document.querySelector('[data-bs-dismiss="modal"]');
  closeBtn.click();
}

function addCardToUI(cardData) {
  // Create template element with card in it.
  const cardCol = document.createElement("div");
  cardCol.classList.add("col");
  cardCol.innerHTML = `
  <div class="card" style="width: 18rem">
    <img class="card-img-top"/>
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text"></p>
      <button type="button" class="btn btn-danger">
        Delete
      </button>
    </div>
  </div>`;

  // Add data to the image, title, and description.
  cardCol.querySelector(".card-img-top").setAttribute("src", cardData.imageUrl);
  cardCol.querySelector(".card-img-top").setAttribute("alt", cardData.topText);

  cardCol.querySelector(".card-title").textContent = cardData.topText;
  cardCol.querySelector(".card-text").textContent = cardData.bottomText;

  // Enable delete functionality.
  const deleteBtn = cardCol.querySelector(".btn-danger");
  deleteBtn.addEventListener("click", deleteCard);
  cardCol.setAttribute(CARD_TITLE_ATTRIBUTE, cardData.id);

  // Add cardCol to the UI
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);
}

function addCardToDB(cardData) {
  let data = loadDataFromDB();
  data.push(cardData);

  saveDataToDB(data);
}

function addAllCardsToUI(evt) {
  let data = loadDataFromDB();
  data.forEach((cardData) => addCardToUI(cardData));
}

function loadDataFromDB() {
  let data = JSON.parse(localStorage.getItem(CARD_DATA_KEY));
  if (!data) {
    data = [];
  }
  return data;
}

function deleteCard(evt) {
  // See which button we clicked.
  const deleteBtn = evt.target;

  // Select the card column that contains it.
  // It's like querySelector, but works backwards
  const cardCol = deleteBtn.closest(".col");
  const idToDelete = Number(cardCol.getAttribute(CARD_TITLE_ATTRIBUTE));
  let data = loadDataFromDB();
  data = data.filter((cardData) => cardData.id !== idToDelete);
  saveDataToDB(data);
  cardCol.remove();
}

function saveDataToDB(data) {
  // Save it back to local storage
  localStorage.setItem(CARD_DATA_KEY, JSON.stringify(data));
}
