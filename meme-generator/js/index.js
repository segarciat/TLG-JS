/**
 * Global variables
 */
const CARD_DATA_KEY = "card-data";
const CARD_TITLE_ATTRIBUTE = "data-meme-title";
const COL_CLASSLIST = "col-lg-3 col-md-4 col-sm-6 my-2";

const addForm = document.querySelector("#addMemeModal form");
const noMemeText = document.getElementById("noMemeText");

/**
 * Event listeners
 */
addForm.addEventListener("submit", handleAddSubmit);
window.addEventListener("load", addAllCardsToUI);

/**
 * Business methods.
 */
function handleAddSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    memeURL: addForm.elements.memeURL.value,
    title: addForm.elements.title.value,
    description: addForm.elements.description.value,
    id: Date.now(),
  };
  addCardToUI(cardData);
  addCardToDB(cardData);

  // Clear the input fields provided by the user.
  addForm.reset();

  // Close the modal.
  const closeBtn = document.querySelector('[data-bs-dismiss="modal"]');
  closeBtn.click();
}

function addCardToUI(cardData) {
  // Create template element with card in it.
  const cardCol = document.createElement("div");
  cardCol.classList = COL_CLASSLIST;
  cardCol.innerHTML = `
  <div class="card text-bg-dark">
    <div class="card-header position-relative  text-center">
      <img class="card-img" style="opacity:0.6"/>
      <div class="card-img-overlay">
        <h5 class="card-title"></h5>
        <div class="card-body position-absolute bottom-0 w-100">
          <p class="card-text"></p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-danger">
        Delete
      </button>
    </div>
  </div>`;

  // Add data to the image, title, and description.
  cardCol.querySelector(".card-img").setAttribute("src", cardData.memeURL);
  cardCol.querySelector(".card-img").setAttribute("alt", cardData.title);

  cardCol.querySelector(".card-title").textContent = cardData.title;
  cardCol.querySelector(".card-text").textContent = cardData.description;

  // Enable delete functionality.
  const deleteBtn = cardCol.querySelector(".btn-danger");
  deleteBtn.addEventListener("click", deleteCard);
  cardCol.setAttribute(CARD_TITLE_ATTRIBUTE, cardData.id);

  // Add cardCol to the UI
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);
  noMemeText.classList.add("d-none");
}

function addCardToDB(cardData) {
  let data = loadDataFromDB();
  data.push(cardData);
  saveDataToDB(data);
}

function addAllCardsToUI() {
  let data = loadDataFromDB();
  data.forEach((cardData) => addCardToUI(cardData));
}

function loadDataFromDB() {
  return JSON.parse(localStorage.getItem(CARD_DATA_KEY)) || [];
}

function deleteCard(evt) {
  const deleteBtn = evt.target;
  const cardCol = deleteBtn.closest(".card").parentElement; // parent element is col.
  const idToDelete = Number(cardCol.getAttribute(CARD_TITLE_ATTRIBUTE));
  let data = loadDataFromDB();
  let deleteIndex = data.findIndex((cardData) => cardData.id !== idToDelete);
  data.splice(deleteIndex, 1);
  // data = data.filter((cardData) => cardData.id !== idToDelete);
  saveDataToDB(data);
  cardCol.remove();
  if (data.length === 0) {
    noMemeText.classList.remove("d-none");
  }
}

function saveDataToDB(data) {
  localStorage.setItem(CARD_DATA_KEY, JSON.stringify(data));
}
