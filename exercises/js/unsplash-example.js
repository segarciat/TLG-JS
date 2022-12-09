/*
 * The following is an example of making a request to a REST API.
 * The example uses the Unsplash API.
 */

// Get an API key from Unsplash API; you have to sign up to get one.
const client_id = "rQZh8R5u0--wJ1TI-jhirQmqj_b33-8oPmsdfuC-pWg";

// Capture search term.
const searchStr = "cars";

// Make a request to Unsplash API.

// API URL: https://api.unsplash.com/search/photos
// URL parameters (left of =, separated by &): query, per_page, client_id
// Values of the URL parameters: searchStr, 20, client_id (respectively)
// These parameters and allowed values are documented in the Unsplash API Docs.
// Use template string to assign values if they're in variables.
const resource = `https://api.unsplash.com/search/photos?query=${searchStr}&per_page=20&client_id=${client_id}`;

fetch(resource)
  .then((response) => response.json()) // Interpret response as JSON as parse it.
  .then((data) => {
    // Capture the API data.

    // Loop over the data and append to the DOM.
    const container = document.querySelector(".container");
    for (let i = 0; i < data.results.length - 1; i++) {
      const thumbnailUrl = data.results[i].urls.thumb;
      const img = document.createElement("img");
      img.setAttribute("src", thumbnailUrl);

      container.append(img);
    }
  });
