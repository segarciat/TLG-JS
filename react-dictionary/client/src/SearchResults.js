import DefinitionGroup from "./DefinitionGroup";

const SearchResults = ({ term, matches, suggestions }) => {
  return (
    <div className="has-text-centered box my-2">
      <div className="my-2">
        {Object.keys(matches).map((partOfSpeech) => (
          <DefinitionGroup
            key={matches[partOfSpeech].id + "$"}
            term={term}
            partOfSpeech={partOfSpeech}
            {...matches[partOfSpeech]}
          />
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
