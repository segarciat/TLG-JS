const Definition = ({ term, definition }) => {
  return (
    <div className="has-background-danger has-text-centered box my-2">
      <div className="my-2">
        <p className="is-size-3 has-text-warning">Word: </p>
        <p className="has-text-white is-size-5">{term}</p>
      </div>

      <div className="my-2">
        <p className="is-size-3 has-text-warning">Definition: </p>
        <p className="has-text-white is-size-5">{definition}</p>
      </div>
    </div>
  );
};

export default Definition;
