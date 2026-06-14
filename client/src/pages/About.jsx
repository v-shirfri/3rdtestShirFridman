import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About Team Time</h1>
        <p className="about-subtitle">
          A modern management system for development group meetings
        </p>
      </div>

      <section className="about-section card clay">
        <h2>What is Team Time?</h2>
        <p>
          Team Time is an internal web application designed to help companies
          manage meetings for their development groups. It provides a clean,
          easy-to-use interface for viewing, editing, and removing meetings
          across all development teams.
        </p>
        <p>
          Instead of maintaining meeting records in spreadsheets or scattered
          tools, Team Time centralises everything in one place — giving every
          team member a quick overview of who meets when, where, and for how
          long.
        </p>
      </section>

      <section className="about-section card clay">
        <h2>System Capabilities</h2>
        <ul className="about-list">
          <li>
            <span className="about-icon">👥</span>
            <span>
              <strong>View Development Groups</strong> — Browse all active
              development groups registered in the system.
            </span>
          </li>
          <li>
            <span className="about-icon">📅</span>
            <span>
              <strong>View Meetings by Group</strong> — Select any group to see
              all its scheduled and past meetings in a clean card layout.
            </span>
          </li>
          <li>
            <span className="about-icon">✏️</span>
            <span>
              <strong>Update Meetings</strong> — Edit a meeting's start time,
              end time, room, and description with full field validation.
            </span>
          </li>
          <li>
            <span className="about-icon">🗑️</span>
            <span>
              <strong>Delete Meetings</strong> — Remove meetings that are no
              longer needed, with a confirmation step to prevent accidents.
            </span>
          </li>
        </ul>
      </section>

      <section className="about-section card clay developer-card">
        <h2>Developer</h2>
        <div className="developer-info">
          <div className="developer-avatar">SF</div>
          <div>
            <p className="developer-name">Shir Fridman</p>
            <p className="developer-role">Fullstack Developer</p>
          </div>
        </div>
      </section>

      <div className="about-cta">
        <button className="btn btn-primary" onClick={() => navigate("/meetings")}>
          Go to Meetings →
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
