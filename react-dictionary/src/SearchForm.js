const SearchForm = ({ handleSubmit }) => {
  return (
    <form className="py-2" onSubmit={handleSubmit}>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            name="searchWordInput"
            id="searchWordInput"
            placeholder="Search..."
            required
          />
        </div>
        <div className="control">
          <input className="button" type="submit" value="Search" />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
