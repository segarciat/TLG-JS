"use strict";
// Personal Unsplash Client ID.
const CLIENT_ID = "rQZh8R5u0--wJ1TI-jhirQmqj_b33-8oPmsdfuC-pWg";
const LS_DATA_KEY = "unsplash-exercise";
const QUERY_ATTRIBUTE = "data-query";
const IMAGE_ID_ATTRIBUTE = "data-image-id";
const FAVORITE_BTN_ATTRIBUTE = "data-favorite-btn";
const FAVORITES_ID = "favorites";

const searchForm = document.getElementById("searchForm");
const searchTab = document.getElementById("searchTab");
const favoritesTab = document.getElementById("favoritesTab");
const favoritesContainer = document.getElementById(FAVORITES_ID);
const searchContainer = document.getElementById("searchContainer");
const resultsContainer = document.getElementById("resultsContainer");

window.addEventListener("load", function () {
  searchForm.addEventListener("submit", handleSubmit);
  searchTab.addEventListener("click", handleSearchTabClick);
  favoritesTab.addEventListener("click", handleFavoritesTabClick);

  const input = searchForm.elements.searchInput;

  const dbData = getDataFromDB();
  input.value =
    dbData.searches.length === 0
      ? "cars"
      : dbData.searches[dbData.searches.length - 1].query;
  searchForm.requestSubmit();
  dbData.favorites.forEach((image) => addCardToUI(image, favoritesContainer));
});

function handleSubmit(e) {
  // Prevent default form behavior, which is a page refresh.
  e.preventDefault();

  // Clear any results currently displayed in UI.
  clearResults();

  // See if there are any relevant search results made before.
  const query = searchForm.elements.searchInput.value.toLowerCase();
  const dbData = getDataFromDB();
  const index = dbData.searches.findIndex((r) => r.query === query);

  if (index !== -1) {
    const pastSearch = dbData.searches.splice(index, 1)[0];
    displaySearchResults(pastSearch);
    dbData.searches.push(pastSearch); // Make it most recent search.
    saveToDB(dbData);
  } else {
    const resource = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${CLIENT_ID}`;
    fetch(resource)
      .then((res) => res.json())
      .then((data) => {
        // Parse the new results.
        const newResults = parseResults(query, data.results);

        // Display in UI.
        displaySearchResults(newResults);

        // Save it to the DB.
        dbData.searches.push(newResults);
        saveToDB(dbData);
      });
  }
}

function handleSearchTabClick(e) {
  searchTab.classList.add("is-active");
  favoritesTab.classList.remove("is-active");

  searchContainer.classList.remove("is-hidden");
  favoritesContainer.classList.add("is-hidden");
}

function handleFavoritesTabClick(e) {
  favoritesTab.classList.add("is-active");
  searchTab.classList.remove("is-active");

  favoritesContainer.classList.remove("is-hidden");
  searchContainer.classList.add("is-hidden");
}

// parse search results from Unsplash.
function parseResults(query, results) {
  return {
    query,
    images: results.map((item) => ({
      id: item.id,
      title: item.alt_description,
      description: item.description || item.alt_description,
      url: item.urls.thumb,
      query,
      isFavorite: false,
    })),
  };
}

// Add result images to UI.
function displaySearchResults(results) {
  resultsContainer.setAttribute(QUERY_ATTRIBUTE, results.query);
  results.images.forEach((image) => {
    addCardToUI(image, resultsContainer);
  });
}

function addCardToUI(image, container) {
  const col = document.createElement("div");
  col.setAttribute(IMAGE_ID_ATTRIBUTE, image.id);
  col.setAttribute(QUERY_ATTRIBUTE, image.query);
  col.classList =
    "column is-full-mobile is-one-quarter-tablet is-flex is-justify-content-center";
  const inverted = image.isFavorite ? "" : "is-inverted";
  col.innerHTML = `
    <div class="card is-flex-grow-1" style="max-width: 350px">
			<div class="card-header">
				<button class="button is-danger ${inverted} is-fullwidth" ${FAVORITE_BTN_ATTRIBUTE}><i class="fa-regular fa-heart"></i></i></button>
			</div>
      <div class="card-image">
				<img
					class="card-img"
					width="100%"
					style="object-fit: cover; aspect-ratio: 1/1"
					src="${image.url}"
					alt="${image.title}"
				/>
      </div>
			<div class="is-flex is-flex-direction-column is-justify-space-between">
				<div class="card-content">
					<div class="content">
						<h4>${image.title}</h5>
						<p>
						${image.description}
						</p>
					</div>
				</div>
			</div>
    </div>
    `;
  const btn = col.querySelector(`button[${FAVORITE_BTN_ATTRIBUTE}]`);
  btn.addEventListener("click", toggleFavorite);
  container.append(col);
}

function toggleFavorite(e) {
  // Find the image.
  const imageId = e.target.closest(".column").getAttribute(IMAGE_ID_ATTRIBUTE);
  const dbData = getDataFromDB();
  const index = dbData.favorites.findIndex((image) => image.id === imageId);
  const query = e.target.closest(".column").getAttribute(QUERY_ATTRIBUTE);
  const image = dbData.searches
    .find((search) => search.query === query)
    .images.find((img) => img.id === imageId);

  image.isFavorite = !image.isFavorite;

  if (index === -1) {
    // Add to favorites.
    dbData.favorites.push(image);
    // Add to UI.
    addCardToUI(image, favoritesContainer);

    // Update button styling in resultsContainer.
    e.target.closest("button").classList.toggle("is-inverted");
  } else {
    // Remove from favorites.
    dbData.favorites = dbData.favorites.filter((img) => img.id !== imageId);
    // Remove from UI.
    const selector = `[${IMAGE_ID_ATTRIBUTE}="${image.id}"]`;
    favoritesContainer.querySelector(selector).remove();
    // Update button styling.
    if (image.query === resultsContainer.getAttribute(QUERY_ATTRIBUTE)) {
      resultsContainer
        .querySelector(`${selector} button`)
        .classList.toggle("is-inverted");
    }
  }

  // Update DB.
  saveToDB(dbData);
}

// Clear results on the page
function clearResults() {
  while (resultsContainer.firstElementChild) {
    resultsContainer.firstElementChild.remove();
  }
}

// Get application data from local storage.
function getDataFromDB() {
  let dbData = JSON.parse(localStorage.getItem(LS_DATA_KEY));
  if (!dbData) dbData = { searches: [], favorites: [] };
  return dbData;
}

// Save new results to local storage
function saveToDB(data) {
  localStorage.setItem(LS_DATA_KEY, JSON.stringify(data));
}
