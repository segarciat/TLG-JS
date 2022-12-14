const Definition = ({ term, matches, suggestions }) => {
  const firstMatch = matches[0];
  return (
    <div className="has-background-danger has-text-centered box my-2">
      <div className="my-2">
        <p className="is-size-3 has-text-warning">Word: </p>
        <p className="has-text-white is-size-5">
          {firstMatch && `${term} (${firstMatch.partOfSpeech})`}
        </p>
      </div>

      <div className="my-2">
        <p className="is-size-3 has-text-warning">Definition(s): </p>
        {firstMatch &&
          firstMatch.definitions.map((definition, index) => (
            <p key={index} className="has-text-white is-size-5">
              {definition}
            </p>
          ))}
      </div>
      <div className="my-2">
        <p className="is-size-3 has-text-warning">Suggestions: </p>
        <p className="has-text-white is-size-5">{suggestions.join(", ")}</p>
      </div>
    </div>
  );
};

export default Definition;
