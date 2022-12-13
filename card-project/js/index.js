"use strict";
// Constants
const CARD_PROJECT_DATA_KEY = "card-project-data"; // local storage data key.
const CARD_ID_ATTRIBUTE = "data-card-id"; // to know which card to delete.
const DELETE_MODAL_ID = "deleteModal";

// HTML elements.
const cardForm = document.getElementById("cardForm");
const deleteModalForm = document.querySelector(`#${DELETE_MODAL_ID} form`);
const addNewCardBtn = document.getElementById("newCardBtn");

// Alert variables.
const SUCCESS_ALERT = "success";
const DANGER_ALERT = "danger";
const INFO_ALERT = "info";
const ALERT_DURATION = 3000;
let alertTimeoutID;

// Set up event listeners.
window.addEventListener("load", populateUI);
addNewCardBtn.addEventListener("click", handleAddNewCardBtn);
cardForm.addEventListener("submit", handleCardFormSubmit);
deleteModalForm.addEventListener("submit", handleConfirmDelete);

/**
 * Event Listener functions.
 */

// Load data from DB and fill up UI.
function populateUI() {
  const data = loadDataFromDB();
  data.forEach((cardData) => addNewCardToUI(cardData));
}

function handleAddNewCardBtn() {
  // Clear modal form ID and data (from clicking Update button) if there is any.
  cardForm.removeAttribute(CARD_ID_ATTRIBUTE);
  cardForm.reset();
}

// When add form is submitted, it updates the UI with the given data, and saves that data.
function handleCardFormSubmit(e) {
  e.preventDefault();
  // Get submission fields.
  const cardData = {
    title: cardForm.title.value,
    description: cardForm.description.value,
    imageUrl: cardForm.imageUrl.value,
  };
  // See if adding or updating.
  const currentCardID = Number(cardForm.getAttribute(CARD_ID_ATTRIBUTE));
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
  cardForm.reset();
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

/**
 * UI functions
 */

// Decide on max length for title and for description.
function addNewCardToUI(cardData) {
  // Create template element.
  const col = document.createElement("div");
  col.classList =
    "col-lg-3 col-md-4 col-sm-6 my-2 d-flex justify-content-center";
  col.innerHTML = `
  <div class="card" style="width: 350px">
    <img class="card-img-top" style="object-fit: cover; aspect-ratio: 1/1"/>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="my-1">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
      </div>
      <div class="my-1">
        <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#cardFormModal"
        class="btn btn-warning"
      >
        Update
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#${DELETE_MODAL_ID}"
        type="button"
        class="btn btn-danger"
      >
        Delete
      </button>
      </div>
    </div>
  </div>
  `;

  // Enable delete functionality.
  const deleteBtn = col.querySelector(`[data-bs-target="#${DELETE_MODAL_ID}"]`);
  deleteBtn.setAttribute(CARD_ID_ATTRIBUTE, cardData.id);
  deleteBtn.addEventListener("click", handleDeleteClick);

  // Enable update functionality
  const updateBtn = col.querySelector('[data-bs-target="#cardFormModal"]');
  updateBtn.setAttribute(CARD_ID_ATTRIBUTE, cardData.id);
  updateBtn.addEventListener("click", handleUpdateClick);

  // Add column (with its card data) to UI.
  document.getElementById("cardContainer").append(col);

  // Add data to each element; needs to happen after button has the ID attribute.
  updateCardFromUI(cardData);
}

// Save title of the card to be deleted on the modal.
function handleDeleteClick(e) {
  const id = Number(e.target.getAttribute(CARD_ID_ATTRIBUTE));
  deleteModalForm.setAttribute(CARD_ID_ATTRIBUTE, id);
}

function handleUpdateClick(e) {
  // Set current ID.
  const id = e.target.getAttribute(CARD_ID_ATTRIBUTE);
  cardForm.setAttribute(CARD_ID_ATTRIBUTE, id);

  // Load data for corresponding card.
  let data = loadDataFromDB();
  const dataToUpdate = data.find((cardData) => cardData.id === Number(id));

  // Prepopulate form wth card data.
  cardForm.elements.title.value = dataToUpdate.title;
  cardForm.elements.description.value = dataToUpdate.description;
  cardForm.elements.imageUrl.value = dataToUpdate.imageUrl;
}

function deleteCardFromUI(id) {
  const card = getCardByID(id);
  card.parentElement.remove(); // remove col which is parent of card.
}

function updateCardFromUI(cardData) {
  const { imageUrl, title, description, id } = cardData;
  const card = getCardByID(id);
  // Add data to each element.
  card.querySelector(".card-img-top").setAttribute("src", imageUrl);
  card.querySelector(".card-img-top").setAttribute("alt", title);
  card.querySelector(".card-title").textContent = title;
  card.querySelector(".card-text").textContent = description;
}

// Get card from UI by using the card data's id.
function getCardByID(id) {
  const btn = document.querySelector(`button[${CARD_ID_ATTRIBUTE}="${id}"]`);
  return btn.closest(".card");
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
