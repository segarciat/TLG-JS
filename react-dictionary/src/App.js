import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import Definition from "./Definition";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [word, setWord] = useState(null);

  async function handleSearchSubmit(e) {
    e.preventDefault();
    // Get the word the user searched for.
    const searchInputValue = e.target.elements.searchWordInput.value;

    // Make API request with the word.
    try {
      const res = await fetch(`${API_URL}/${searchInputValue}?key=${API_KEY}`);
      const data = await res.json();
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
    } catch (e) {
      throw new Error(e);
    }

    // Display word in UI for now.
    e.target.reset(); // reset the form.
  }
  return (
    <div className="App">
      <Navbar title="React Dictionary" />
      <div className="container p-2">
        <SearchForm handleSubmit={handleSearchSubmit} />
        <Definition
          term={word && word.searchTerm}
          definition={word && word.definition}
        />
      </div>
    </div>
  );
}

export default App;
