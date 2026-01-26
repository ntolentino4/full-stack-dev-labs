import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="site-nav">
      <div className="container nav-links">
        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Employees
        </NavLink>

        <NavLink
          to="/organization"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Organization
        </NavLink>
      </div>
    </nav>
  );
}
