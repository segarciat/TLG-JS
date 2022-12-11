"use strict";
// Personal Unsplash Client ID.
const CLIENT_ID = "rQZh8R5u0--wJ1TI-jhirQmqj_b33-8oPmsdfuC-pWg";
const LS_DATA_KEY = "unsplash-exercise";
const QUERY_ATTRIBUTE = "data-query";
const IMAGE_ID_ATTRIBUTE = "data-image-id";

const searchForm = document.getElementById("searchForm");

window.addEventListener("load", function () {
  searchForm.addEventListener("submit", handleSubmit);
  const input = searchForm.elements.searchInput;

  const dbData = getDataFromDB();
  input.value = dbData.length === 0 ? "cars" : dbData[dbData.length - 1].query;
  searchForm.requestSubmit();
});

function handleSubmit(e) {
  // Prevent default form behavior, which is a page refresh.
  e.preventDefault();

  // Clear any results currently displayed in UI.
  clearResults();

  // See if there are any relevant search results made before.
  const query = searchForm.elements.searchInput.value.toLowerCase();
  const dbData = getDataFromDB();
  const pastSearch = dbData.find((result) => result.query === query);

  if (pastSearch) {
    addResultsToUI(pastSearch);
  } else {
    const resource = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${CLIENT_ID}`;
    fetch(resource)
      .then((res) => res.json())
      .then((data) => {
        // Parse the new results.
        const newResults = parseResults(query, data.results);

        // Display in UI.
        addResultsToUI(newResults);

        // Save it to the DB.
        dbData.push(newResults);
        saveResults(dbData);
      });
  }
}

// parse search results from Unsplash
function parseResults(query, results) {
  return {
    query,
    images: results.map((item) => ({
      id: item.id,
      title: item.alt_description,
      description: item.description || item.alt_description,
      url: item.urls.thumb,
    })),
  };
}

// Add result images to UI.
function addResultsToUI(results) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.setAttribute(QUERY_ATTRIBUTE, results.query);
  results.images.forEach((image) => {
    addCardToUI(image, resultsContainer);
  });
}

function addCardToUI(image, container) {
  const col = document.createElement("div");
  col.classList =
    "column is-full-mobile is-one-quarter-tablet is-flex is-justify-content-center";

  col.innerHTML = `
    <div class="card is-flex-grow-1" style="max-width: 350px" ${IMAGE_ID_ATTRIBUTE}="${image}">
			<div class="card-header">
				<button class="button is-danger is-inverted is-fullwidth" data-favorite-btn><i class="fa-regular fa-heart"></i></i></button>
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
  container.append(col);
}

// Clear results on the page
function clearResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  while (resultsContainer.firstElementChild) {
    resultsContainer.firstElementChild.remove();
  }
}

// Get application data from local storage.
function getDataFromDB() {
  return JSON.parse(localStorage.getItem(LS_DATA_KEY)) || [];
}

// Save new results to local storage
function saveResults(data) {
  localStorage.setItem(LS_DATA_KEY, JSON.stringify(data));
}
