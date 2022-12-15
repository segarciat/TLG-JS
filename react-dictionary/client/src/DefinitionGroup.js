const DefinitionGroup = ({ term, partOfSpeech, definitions, id }) => {
  return (
    <div className="my-1">
      <p className="is-size-4 has-text-danger">{`${term} (${partOfSpeech})`}</p>
      {definitions.map((definition, i) => (
        <p
          key={id + i}
          className="has-background-primary-light box has-text-dark is-size-6"
        >
          {definition}
        </p>
      ))}
    </div>
  );
};

export default DefinitionGroup;
