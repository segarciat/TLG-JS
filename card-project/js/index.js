// Constants
const CARD_PROJECT_DATA_KEY = "card-project-data"; // local storage data key.
const CARD_ID_ATTRIBUTE = "data-card-id"; // to know which card to delete.
const addForm = document.getElementById("addForm");
const deleteModalForm = document.querySelector("#deleteModal form");
const addNewCardBtn = document.getElementById("newCardBtn");
const SUCCESS_ALERT = "success";
const DANGER_ALERT = "danger";
const INFO_ALERT = "info";
const ALERT_DURATION = 3000;
let alertTimeoutID;

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
  addForm.reset();
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
    updateCardFromUI(cardData);
    updateCardFromDB(cardData);
    displayAlert("Card updated!", INFO_ALERT);
  } else {
    // Generate new ID.
    cardData.id = generateId();
    addNewCardToUI(cardData);
    addNewCardToDB(cardData);
    displayAlert("Card added!", SUCCESS_ALERT);
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
  displayAlert("Card successfully deleted!", DANGER_ALERT);
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
function addNewCardToUI(cardData) {
  // Create template element.
  const cardCol = document.createElement("div");
  cardCol.classList =
    "col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center";
  cardCol.innerHTML = `
  <div class="card" style="width: 350px">
    <img class="card-img-top"/>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="my-1">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
      </div>
      <div class="my-1">
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
  </div>
  `;

  // Add to UI
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);

  // Enable delete functionality.
  const deleteBtn = cardCol.querySelector('[data-bs-target="#deleteModal"]');
  deleteBtn.setAttribute(CARD_ID_ATTRIBUTE, cardData.id);
  deleteBtn.addEventListener("click", handleDeleteClick);

  // Enable update functionality
  const updateBtn = cardCol.querySelector('[data-bs-target="#addModal"]');
  updateBtn.setAttribute(CARD_ID_ATTRIBUTE, cardData.id);
  updateBtn.addEventListener("click", handleUpdateClick);

  // Add data to each element; needs to happen after button has the ID attribute.
  updateCardFromUI(cardData);
}

function deleteCardFromUI(id) {
  const btn = document.querySelector(`button[${CARD_ID_ATTRIBUTE}="${id}"]`);
  btn.closest(".card").parentElement.remove(); // remove col which is parent of card.
}

function updateCardFromUI({ imageUrl, title, description, id }) {
  const btn = document.querySelector(`button[${CARD_ID_ATTRIBUTE}="${id}"]`);
  const card = btn.closest(".card");
  // Add data to each element.
  card.querySelector(".card-img-top").setAttribute("src", imageUrl);
  card.querySelector(".card-img-top").setAttribute("alt", title);
  card.querySelector(".card-title").textContent = title;
  card.querySelector(".card-text").textContent = description;
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

function updateCardFromDB(updatedCard) {
  let data = loadDataFromDB();
  const updateIndex = data.findIndex((card) => card.id === updatedCard.id);
  data[updateIndex] = updatedCard;
  saveToDB(data);
}

/**
 * Helper functions.
 */
function generateId() {
  return Date.now();
}

function displayAlert(message, type) {
  const alertPlaceholder = document.getElementById("alertPlaceholder");
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  clearTimeout(alertTimeoutID);
  alertTimeoutID = setTimeout(() => {
    if (alertPlaceholder.firstElementChild) {
      alertPlaceholder.firstElementChild.remove();
    }
  }, ALERT_DURATION);
}
