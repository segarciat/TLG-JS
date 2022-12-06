const addForm = document.querySelector("#addMemeModal form");
addForm.addEventListener("submit", handleAddSubmit);

function handleAddSubmit(evt) {
  // This will stop the default behavior on submission, which is a page refresh
  evt.preventDefault();
  //   console.log(addForm.elements); // you can get the form that was submitted this way
  const imageUrl = addForm.elements.imageUrl.value;
  const topText = addForm.elements.topText.value;
  const bottomText = addForm.elements.bottomText.value;

  const cardData = { imageUrl, topText, bottomText };
  addCardToUI(cardData);

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

  // Add cardCol to the UI
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.append(cardCol);
}
