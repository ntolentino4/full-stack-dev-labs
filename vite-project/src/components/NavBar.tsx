import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export function NavBar() {
  return (
    <nav className="site-nav">
      <div className="container nav-bar-inner">
        <div className="nav-links">
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

        <div className="nav-auth">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}