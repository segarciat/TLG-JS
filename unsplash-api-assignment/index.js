// Personal Unsplash Client ID.
const CLIENT_ID = "rQZh8R5u0--wJ1TI-jhirQmqj_b33-8oPmsdfuC-pWg";
const LS_DATA_KEY = "unsplash-exercise";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

window.addEventListener("load", function () {
  searchForm.addEventListener("submit", handleSubmit);

  const dbData = getDataFromDB();
  // If user first time using, show car photos.
  if (dbData.length === 0) {
    searchInput.value = "cars";
    searchForm.requestSubmit();
  } else {
    // Otherwise, show last search results.
    const lastSearched = dbData[dbData.length - 1];
    searchInput.value = lastSearched.query;
    addResultsToUI(lastSearched.images);
  }
});

function handleSubmit(e) {
  // Prevent default form behavior, which is a page refresh.
  e.preventDefault();

  // Clear any results currently displayed in UI.
  clearResults();

  // See if there are any relevant search results made before.
  const dbData = getDataFromDB();

  const query = searchInput.value.toLowerCase();
  const pastResults = dbData.find((result) => result.query === query);

  if (pastResults) {
    addResultsToUI(pastResults.images);
  } else {
    const resource = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${CLIENT_ID}`;
    fetch(resource)
      .then((res) => res.json())
      .then((data) => {
        // Parse the new results.
        const newResults = parseResults(query, data);

        // Save it to the DB.
        dbData.push(newResults);
        saveResults(dbData);

        // Display in UI.
        addResultsToUI(newResults.images);
      });
  }
}

// parse search results from Unsplash
function parseResults(query, data) {
  const transformedResults = {
    query,
    images: data.results.map((item) => ({
      title: item.alt_description,
      description: item.description || item.alt_description,
      imageUrl: item.urls.thumb,
    })),
  };
  return transformedResults;
}

// Add result images to UI.
function addResultsToUI(images) {
  const resultsContainer = document.getElementById("resultsContainer");
  images.forEach((image) => {
    const col = document.createElement("div");
    col.classList =
      "column is-full-mobile is-one-quarter-tablet is-flex is-justify-content-center";
    col.innerHTML = `
    <div class="card is-flex-grow-1" style="max-width: 350px">
      <div class="card-image">
				<img
					class="card-img"
					width="100%"
					style="object-fit: cover; aspect-ratio: 1/1"
					src="${image.imageUrl}"
					alt="${image.title}"
				/>
      </div>
      <div class="card-content">
				<div class="content">
					<h4>${image.title}</h5>
					<p>
					${image.description}
					</p>
				</div>
      </div>
    </div>
    `;
    resultsContainer.append(col);
  });
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
