// Constants
const CARD_PROJECT_DATA_KEY = "card-project-data";
const CARD_TITLE_ATTRIBUTE = "title-of-card-to-delete"; // to know which card to delete.
const addForm = document.getElementById("addForm");
const deleteModalForm = document.querySelector("#deleteModal form");
const cardContainer = document.getElementById("cardContainer");

// Set up event listeners.
addForm.addEventListener("submit", handleAddFormSubmit);
deleteModalForm.addEventListener("submit", handleConfirmDelete);

window.addEventListener("load", populateUI);

// When add form is submitted, it updates the UI with the given data, and saves that data.
function handleAddFormSubmit(e) {
  e.preventDefault();
  // Get submission fields.
  const cardData = {
    title: addForm.title.value,
    description: addForm.description.value,
    imageUrl: addForm.imageUrl.value,
  };
  addNewCardToUI(cardData);
  saveCardData(cardData);
  addForm.reset(); // clear form fields.

  // Close the modal.
  document.getElementById("closeModalBtn").click();
}

// Save data to local storage.
function saveCardData(cardData) {
  const data = JSON.parse(localStorage.getItem(CARD_PROJECT_DATA_KEY)) || [];
  data.push(cardData);
  localStorage.setItem(CARD_PROJECT_DATA_KEY, JSON.stringify(data));
}

// Load from data from localStorage and display in UI.
function populateUI() {
  const data = JSON.parse(localStorage.getItem(CARD_PROJECT_DATA_KEY)) || [];
  data.forEach((cardData) => addNewCardToUI(cardData));
}

// Decide on max length for title and for description.
function addNewCardToUI({ title, description, imageUrl }) {
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
  deleteBtn.setAttribute(CARD_TITLE_ATTRIBUTE, title);
  deleteBtn.addEventListener("click", handleDeleteClick);

  // Add to UI.
  cardContainer.append(cardCol);
}

// Save title of the card to be deleted on the modal.
function handleDeleteClick(e) {
  const title = e.target.getAttribute(CARD_TITLE_ATTRIBUTE);
  deleteModalForm.setAttribute(CARD_TITLE_ATTRIBUTE, title);
}

function handleConfirmDelete(e) {
  e.preventDefault();
  const title = deleteModalForm.getAttribute(CARD_TITLE_ATTRIBUTE);
  deleteCardFromDB(title);
  deleteModalForm.removeAttribute(CARD_TITLE_ATTRIBUTE);
  deleteCardFromUI(title);
  document.getElementById("cancelModalBtn").click(); // hide modal.
}

function deleteCardFromDB(title) {
  // Load from LS.
  let data = JSON.parse(localStorage.getItem(CARD_PROJECT_DATA_KEY)) || [];

  // Remove the element.
  data = data.filter((cardData) => cardData.title !== title);

  // Save to local storage.
  localStorage.setItem(CARD_PROJECT_DATA_KEY, JSON.stringify(data));
}

function deleteCardFromUI(title) {
  const btn = document.querySelector(`[${CARD_TITLE_ATTRIBUTE}="${title}"]`);
  btn.closest(".card").parentElement.remove(); // remove col which is parent of card.
}
