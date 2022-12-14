import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import Definition from "./Definition";
import { useState } from "react";

const API_URL = "https://www.dictionaryapi.com/api/v3/references/sd4/json";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [word, setWord] = useState({ term: "", definitions: [] });
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

  function parseTermData(term, data) {
    let definitions = ["Not found"];
    // No results found at all.
    if (!data[0]) {
      setSuggestions([]); // No results or suggestions at all.
    } else if (data[0] && !data[0].meta) {
      setSuggestions(data); // No results, but relevant suggestions.
    } else {
      // Results, and relevant suggestions
      let match = data.find((r) => r.hwi.hw === term || r.meta.id === term);
      setSuggestions(data.map((r) => r.hwi.hw).filter((r) => r !== term));
      definitions = match?.shortdef || [];
    }
    setWord({ term, definitions });
  }

  return (
    <div className="App">
      <Navbar title="React Dictionary" />
      <div className="container p-2">
        <SearchForm handleSubmit={handleSearchSubmit} />
        <Definition
          term={word.term}
          definitions={word.definitions}
          suggestions={suggestions}
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
