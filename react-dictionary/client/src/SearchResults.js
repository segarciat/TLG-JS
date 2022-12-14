const SearchResults = ({ term, matches, suggestions }) => {
  return (
    <div className="has-text-centered box my-2">
      <div className="my-2">
        {matches.map(({ partOfSpeech, definitions, id }, i) => (
          <div key={id + `${i}`} className="my-1">
            <p className="is-size-4 has-text-danger">
              {`${term} (${partOfSpeech})`}
            </p>
            {definitions.map((definition, j) => (
              <p
                key={id + `${i}${j}`}
                className="has-background-primary-light box has-text-dark is-size-6"
              >
                {definition}
              </p>
            ))}
          </div>
        ))}
      </div>
      {suggestions.length !== 0 && (
        <div className="my-4">
          <p className="is-size-3 has-text-grey-light">Suggestions: </p>
          <p className="has-background-warning-light box has-text-dark is-size-5">
            {suggestions.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
