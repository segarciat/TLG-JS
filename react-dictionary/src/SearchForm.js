const SearchForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchWordInput">Search Word</label>
      <input
        type="text"
        name="searchWordInput"
        id="searchWordInput"
        placeholder="apple"
        required
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchForm;
