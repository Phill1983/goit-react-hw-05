import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "link active" : "link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "link active" : "link"
          }
        >
          Movies
        </NavLink>
      </div>
    </nav>
  );
}


export default Navigation;
