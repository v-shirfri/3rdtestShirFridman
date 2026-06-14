import { useNavigate } from "react-router-dom";
import "./Home.css";

const features = [
  {
    icon: "👥",
    title: "View Development Groups",
    desc: "Browse all active development groups in your company and see their details at a glance.",
  },
  {
    icon: "📅",
    title: "View Meetings by Group",
    desc: "Select a group and instantly see all their scheduled and past meetings.",
  },
  {
    icon: "🗑️",
    title: "Delete Meetings",
    desc: "Remove meetings that are cancelled or no longer relevant, with a confirmation step.",
  },
  {
    icon: "✏️",
    title: "Update Meetings",
    desc: "Edit any meeting's time, room, and description to keep your team's schedule accurate.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Development Groups<br />
            <span className="hero-accent">Meetings Manager</span>
          </h1>
          <p className="hero-sub">
            A simple, clean tool for managing all your company's development
            team meetings — schedule, update, and track every session in one
            place.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate("/meetings")}>
              View Meetings
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            src="https://illustrations.popsy.co/amber/work-from-home.svg"
            alt="Team collaboration illustration"
            className="hero-image"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">What You Can Do</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card clay" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to manage your meetings?</h2>
        <button className="btn btn-primary" onClick={() => navigate("/meetings")}>
          Go to Meetings List →
        </button>
      </section>
    </main>
  );
}
