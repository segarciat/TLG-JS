import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [results, setResults] = useState({
    term: "",
    matches: {},
    suggestions: [],
  });

  async function handleSearchSubmit(evt) {
    evt.preventDefault();
    const searchTerm = evt.target.elements.searchWordInput.value;
    try {
      const res = await fetch(`${API_URL}/${searchTerm}?key=${API_KEY}`);
      const data = await res.json();
      parseTermData(searchTerm, data);
    } catch (e) {
      throw new Error(e); // SOrry, user.
    }
    evt.target.reset();
  }

  function parseTermData(term, data) {
    let matches = {};
    let suggestions = [];

    // Relevant suggestions found, but no results.
    if (data[0] && !data[0].meta) {
      suggestions = data;
    } else if (data[0]) {
      // Relevant suggestions found, as well as results.
      data.forEach((w) => {
        const result = w.meta.id.match(/[^:]+/)[0]; // match until :
        if (result === term) {
          // Match, with new part of speech (noun, verb, transitive verb, etc...)
          const data = matches[w.fl] || { id: w.meta.id, definitions: [] };
          data.definitions.push(...w.shortdef);
          matches[w.fl] = data;
        } else {
          suggestions.push(result);
        }
      });
    }
    setResults({ term, matches, suggestions });
  }

  return (
    <div className="App">
      <Navbar title="React Dictionary" />
      <div className="container p-2">
        <SearchForm handleSubmit={handleSearchSubmit} />
        <SearchResults {...results} />
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
