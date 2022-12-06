// Constants
const CARD_PROJECT_DATA_KEY = "card-project-data"; // local storage data key.
const CARD_ID_ATTRIBUTE = "data-card-id"; // to know which card to delete.
const addForm = document.getElementById("addForm");
const deleteModalForm = document.querySelector("#deleteModal form");
const addNewCardBtn = document.getElementById("newCardBtn");

// Set up event listeners.
addForm.addEventListener("submit", handleAddFormSubmit);
deleteModalForm.addEventListener("submit", handleConfirmDelete);
addNewCardBtn.addEventListener("click", handleAddNewCardBtn);

window.addEventListener("load", populateUI);

/**
 * Event Listener functions.
 */
// Load data from DB and fill up UI.
function populateUI() {
  const data = loadDataFromDB();
  data.forEach((cardData) => addNewCardToUI(cardData));
}

function handleAddNewCardBtn(e) {
  // Clear modal form ID if there is one.
  addForm.removeAttribute(CARD_ID_ATTRIBUTE);
}

// When add form is submitted, it updates the UI with the given data, and saves that data.
function handleAddFormSubmit(e) {
  e.preventDefault();
  // Get submission fields.
  const cardData = {
    title: addForm.title.value,
    description: addForm.description.value,
    imageUrl: addForm.imageUrl.value,
  };
  // See if adding or updating.
  const currentCardID = Number(addForm.getAttribute(CARD_ID_ATTRIBUTE));
  if (currentCardID) {
    cardData.id = currentCardID;
    updateCardFromUI(currentCardID, cardData);
    updateCardFromDB(currentCardID, cardData);
  } else {
    // Generate new ID.
    cardData.id = generateId();
    addNewCardToUI(cardData);
    addNewCardToDB(cardData);
  }
  // Clear form fields.
  addForm.reset();
  // Close the modal.
  document.getElementById("closeModalBtn").click();
}

// Delete card when Confirm is clicked.
function handleConfirmDelete(e) {
  e.preventDefault(); // disable form submission default (page refresh).
  const id = Number(deleteModalForm.getAttribute(CARD_ID_ATTRIBUTE));
  deleteCardFromDB(id);
  deleteModalForm.removeAttribute(CARD_ID_ATTRIBUTE);
  deleteCardFromUI(id);
  document.getElementById("cancelModalBtn").click(); // hide modal.
}

// Save title of the card to be deleted on the modal.
function handleDeleteClick(e) {
  const id = Number(e.target.getAttribute(CARD_ID_ATTRIBUTE));
  deleteModalForm.setAttribute(CARD_ID_ATTRIBUTE, id);
}

function handleUpdateClick(e) {
  // Set current ID.
  const id = e.target.getAttribute(CARD_ID_ATTRIBUTE);
  addForm.setAttribute(CARD_ID_ATTRIBUTE, id);

  let data = loadDataFromDB();
  const dataToUpdate = data.find((cardData) => cardData.id === Number(id));

  // Prepopulate form.
  addForm.elements.title.value = dataToUpdate.title;
  addForm.elements.description.value = dataToUpdate.description;
  addForm.elements.imageUrl.value = dataToUpdate.imageUrl;
}

/**
 * UI functions
 */

// Decide on max length for title and for description.
function addNewCardToUI({ title, description, imageUrl, id }) {
  // Create template element.
  const cardCol = document.createElement("div");
  cardCol.classList = "col-lg-3 col-md-4 col-sm-6";
  cardCol.innerHTML = `
  <div class="card">
    <img class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text"></p>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        class="btn btn-warning"
      >
        Update
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
        type="button"
        class="btn btn-danger"
      >
        Delete
      </button>
    </div>
  </div>
  `;
  // Add data to each element.
  cardCol.querySelector(".card-img-top").setAttribute("src", imageUrl);
  cardCol.querySelector(".card-img-top").setAttribute("alt", title);
  cardCol.querySelector(".card-title").textContent = title;
  cardCol.querySelector(".card-text").textContent = description;

  // Enable delete functionality.
  const deleteBtn = cardCol.querySelector('[data-bs-target="#deleteModal"]');
  deleteBtn.setAttribute(CARD_ID_ATTRIBUTE, id);
  deleteBtn.addEventListener("click", handleDeleteClick);

  // Enable update functionality
  const updateBtn = cardCol.querySelector('[data-bs-target="#addModal"]');
  updateBtn.setAttribute(CARD_ID_ATTRIBUTE, id);
  updateBtn.addEventListener("click", handleUpdateClick);

  // Add to UI.
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);
}

function deleteCardFromUI(id) {
  const btn = document.querySelector(`button[${CARD_ID_ATTRIBUTE}="${id}"]`);
  btn.closest(".card").parentElement.remove(); // remove col which is parent of card.
}

function updateCardFromUI(id, updatedCardData) {
  const btn = document.querySelector(`button[${CARD_ID_ATTRIBUTE}]`);
  const card = btn.closest(".card");
  console.log(card);
}

/**
 * DB functions
 */
function loadDataFromDB() {
  return JSON.parse(localStorage.getItem(CARD_PROJECT_DATA_KEY)) || [];
}

function saveToDB(data) {
  localStorage.setItem(CARD_PROJECT_DATA_KEY, JSON.stringify(data));
}

function addNewCardToDB(cardData) {
  const data = loadDataFromDB();
  data.push(cardData);
  saveToDB(data);
}

function deleteCardFromDB(id) {
  let data = loadDataFromDB();
  data = data.filter((cardData) => cardData.id !== id);
  saveToDB(data);
}

function updateCardFromDB(id, updatedCardData) {
  let data = loadDataFromDB();
  const indexOfCardToUpdate = data.findIndex((card) => card.id === id);
  data[indexOfCardToUpdate] = updatedCardData;
  saveToDB(data);
}

/**
 * Helper functions.
 */
function generateId() {
  return Date.now();
}
