import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [word, setWord] = useState(null);

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Get the word the user searched for.
    const searchInputValue = e.target.elements.searchWordInput.value;

    // Make API request with the word.
    fetch(`${API_URL}/${searchInputValue}?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result =
          data.find((w) => w.meta.id === searchInputValue) || data[0];
        const wordInfo = {
          searchTerm: searchInputValue,
          definition: "Not found",
        };
        if (result) {
          wordInfo.searchTerm = result.meta.id;
          wordInfo.definition = result.shortdef || result.shortdef[0];
        }
        setWord(wordInfo);
      });
    // Display word in UI for now.
    e.target.reset(); // reset the form.
  }
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <SearchForm handleSubmit={handleSearchSubmit} />
        <h1>Word: {word && word.searchTerm}</h1>
        <p>Definition: {word && word.definition}</p>
      </div>
    </div>
  );
}

export default App;
