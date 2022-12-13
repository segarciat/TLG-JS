"use strict";
const arrayOfObjects = [
  { name: "Fox", link: "https://foxnews.com" },
  { name: "Fandango", link: "https://fandango.com" },
  { name: "CNN", link: "https://cnn.com" },
  { name: "Google", link: "https://google.com" },
  { name: "YouTube", link: "https://youtube.com" },
  { name: "Instagram", link: "https://instagram.com" },
  { name: "Amazon", link: "https://amazon.com" },
  { name: "RideFox", link: "https://ridefox.com" },
  { name: "Udemy", link: "https://udemy.com" },
  { name: "Telegram", link: "https://telegram.org" },
  { name: "Discord", link: "https://discord.com" },
  { name: "Slack", link: "https://slack.com" },
];

const MAX_RESULTS = 2;

const SUGGESTIONS_ID = "suggestions";

const searchInput = document.getElementById("search");
// const processChange = debounce(handleKeyUp);
searchInput.addEventListener("keyup", debounce(handleKeyUp));

function handleKeyUp(e) {
  const userInput = searchInput.value.toLowerCase();
  clearSuggestions();

  if (userInput) {
    // An alternative is to use .contains instead of .startsWith
    // Yet another alternative is to use a regex for matching; up to you.
    const suggestions = arrayOfObjects
      .filter((result) => result.name.toLowerCase().startsWith(userInput))
      .slice(0, MAX_RESULTS);
    showSuggestions(suggestions);
  }
}

function showSuggestions(suggestions) {
  const ul = document.getElementById(SUGGESTIONS_ID);

  if (suggestions.length === 0) {
    ul.innerHTML = `<li>No matching results</li>`;
  } else {
    // Show new suggestions
    suggestions.forEach(({ name, link }) => {
      const li = document.createElement("li");
      const typedSoFar = searchInput.value;
      const rest = name.slice(typedSoFar.length);
      li.innerHTML = `
        <a href="${link}">${typedSoFar}<strong>${rest}</strong></a>
    `;
      ul.append(li);
    });
  }
}

function clearSuggestions() {
  const ul = document.getElementById(SUGGESTIONS_ID);
  while (ul.firstElementChild) {
    ul.firstElementChild.remove();
  }
}

// source: https://www.freecodecamp.org/news/javascript-debounce-example/
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args); // it calls the function with the arguments.
    }, timeout);
  };
}
