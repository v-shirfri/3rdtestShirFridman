import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">&#128197;</span>
        <span className="navbar-title">Team Time</span>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/meetings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Meetings
        </NavLink>
        <NavLink to="/meetings/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Add Meeting
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          About
        </NavLink>
      </nav>
    </header>
  );
}
