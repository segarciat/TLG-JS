const Navbar = ({ title }) => {
  return (
    <nav
      className="navbar is-danger"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className="navbar-item is-white has-text-white-bold is-size-4"
            href="https://github.com/segarciat/VR21/tree/main/react-dictionary"
          >
            {title}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
