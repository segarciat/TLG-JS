// Constants
const CARD_PROJECT_DATA_KEY = "card-project-data";
const addForm = document.getElementById("addForm");

// Set up event listeners.
addForm.addEventListener("submit", handleAddFormSubmit);

// When add form is submitted, it updates the UI with the given data, and saves that data.
function handleAddFormSubmit(e) {
  e.preventDefault();
  // Get submission fields.
  const cardData = {
    title: addForm.title.value,
    description: addForm.description.value,
    imageUrl: addForm.imageUrl.value,
  };
  addCardToUI(cardData);
  saveCardData(cardData);

  // Close the modal.
  document.getElementById("closeModalBtn").click();
}

// Save data to local storage.
function saveCardData(cardData) {
  const data = JSON.parse(localStorage.getItem(CARD_PROJECT_DATA_KEY)) || [];
  data.push(cardData);
  localStorage.setItem(CARD_PROJECT_DATA_KEY, JSON.stringify(data));
}

// Decide on max length for title and for description.
function addCardToUI(cardData) {
  const cardCol = document.createElement("div");
  cardCol.classList = "col-lg-3 col-md-4 col-sm-6";
  cardCol.innerHTML = `
  <div class="card">
    <img src="${cardData.imageUrl}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${cardData.title}</h5>
      <p class="card-text">
        ${cardData.description}
      </p>

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
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);
}
