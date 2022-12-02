// Decide on max length for title and for description.
function addCard() {
  const cardCol = document.createElement("div");
  cardCol.classList = "col-lg-3 col-md-4 col-sm-6";
  cardCol.innerHTML = `
  <div class="card">
    <img src="https://via.placeholder.com/150" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
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
  const cardContainer = document.getElementById("card-container");
  cardContainer.append(cardCol);
}
addCard();
