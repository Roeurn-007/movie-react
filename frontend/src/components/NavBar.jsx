import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <span className="logo-mark" aria-hidden="true">
            <span className="logo-dot" />
          </span>
          <span className="brand-text">MovieHub</span>
        </Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Discover
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Favorites
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
