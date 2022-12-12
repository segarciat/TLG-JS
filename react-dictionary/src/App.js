import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import { useState } from "react";

function App() {
  const [word, setWord] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Get the word the user searched for.
    const searchInputValue = e.target.elements.searchWordInput.value;

    // Display word in UI for now.
    setWord(searchInputValue);
    e.target.reset(); // reset the form.
  }
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <SearchForm handleSubmit={handleSearchSubmit} />
        <h1>Word: {word}</h1>
        <p>Definition: </p>
      </div>
    </div>
  );
}

export default App;
