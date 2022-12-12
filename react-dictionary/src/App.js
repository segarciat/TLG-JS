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
        const result = data.find((w) => w.meta.id === searchInputValue);
        setWord({
          searchTerm: searchInputValue,
          definition: result.shortdef[0],
        });
      });
    // Display word in UI for now.
    setWord(searchInputValue);
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
