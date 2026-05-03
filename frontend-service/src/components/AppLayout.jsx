import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function AppLayout({ children }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="top-bar">
        <Link className="brand" to={isAuthenticated ? "/protected" : "/login"}>
          Los Santos Access
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {!isAuthenticated && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          {isAuthenticated && (
            <>
              <NavLink to="/protected">Safehouse</NavLink>
              <button className="link-button" type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
}
