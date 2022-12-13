import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import Definition from "./Definition";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [word, setWord] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  async function handleSearchSubmit(evt) {
    evt.preventDefault();
    // Get the word the user searched for.
    const searchTerm = evt.target.elements.searchWordInput.value;
    // Make API request with the word.
    try {
      const res = await fetch(`${API_URL}/${searchTerm}?key=${API_KEY}`);
      const data = await res.json(); // An array.
      parseTermData(searchTerm, data);
    } catch (e) {
      throw new Error(e);
    }
    // Display word in UI for now.
    evt.target.reset(); // reset the form.
  }

  function parseTermData(searchTerm, data) {
    // No results found at all.
    const wordInfo = { term: searchTerm, definition: "Not found" };
    if (!data[0]) {
      setSuggestions([]); // No results or suggestions at all.
    } else if (data[0] && !data[0].meta) {
      setSuggestions(data); // No results, but relevant suggestions.
    } else {
      // Results, and relevant suggestions
      const relevant = data.slice(1) || [];
      setSuggestions(relevant.map((w) => w.meta.id));
      wordInfo.term = data[0].meta.id;
      wordInfo.definition = data[0].shortdef || data[0].shortdef;
    }
    setWord(wordInfo);
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
        <footer>
          <a
            className="is-link"
            href="https://dictionaryapi.com/products/api-school-dictionary"
          >
            Powered by Merriam-Webster's School Dictionary API
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
