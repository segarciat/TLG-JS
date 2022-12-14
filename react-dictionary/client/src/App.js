import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [results, setResults] = useState({
    term: "",
    matches: [],
    suggestions: [],
  });

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

  function parseTermData(term, data) {
    let matches = [];
    let suggestions = [];

    // Relevant suggestions found, but no results.
    if (data[0] && !data[0].meta) {
      suggestions = data;
    } else if (data[0]) {
      console.log(data);
      // Relevant suggestions found, as well as results.
      data.reduce(
        (acc, w) => {
          if (w.meta.id === term || w.meta.id.startsWith(`${term}:`)) {
            // Exact match or multi-match (verb, adj, and so on).
            const { fl: partOfSpeech, shortdef: definitions, meta } = w;
            const match = matches.find((m) => m.partOfSpeech === w.fl);
            if (match) match.definitions.push(...definitions);
            else matches.push({ partOfSpeech, definitions, id: meta.uuid });
          } else {
            // Suggestions
            const i = w.meta.id.indexOf(":"); // part of multi-result.
            suggestions.push(
              w.meta.id.substring(0, i === -1 ? w.meta.id.length : i)
            );
          }
          return acc;
        },
        { matches, suggestions }
      );
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
