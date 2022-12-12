import "./index.css";
const Navbar = ({ title }) => {
  return (
    <nav>
      <div className="container">
        <h2>{title}</h2>
      </div>
    </nav>
  );
};

export default Navbar;
