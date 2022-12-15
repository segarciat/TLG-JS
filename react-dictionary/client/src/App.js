import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useState } from "react";

const WORD_API_URL = process.env.REACT_APP_WORD_API_URL;

function App() {
  const [results, setResults] = useState({
    term: "",
    matches: {},
    suggestions: [],
  });

  async function handleSearchSubmit(evt) {
    evt.preventDefault();
    const term = evt.target.elements.searchWordInput.value;
    try {
      const res = await fetch(`${WORD_API_URL}/${term}`);
      const data = await res.json();
      if (data.success) {
        const { matches, suggestions } = data;
        setResults({ term, matches, suggestions });
      }
    } catch (e) {
      throw new Error(e); // Sorry, user.
    }
    evt.target.reset();
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
