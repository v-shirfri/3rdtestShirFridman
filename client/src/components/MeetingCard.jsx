import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MeetingCard.css";

function formatDateTime(dt) {
  if (!dt) return "—";
  const d = new Date(dt);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calcDuration(start, end) {
  const ms = new Date(end) - new Date(start);
  if (isNaN(ms) || ms < 0) return "—";
  const totalMin = Math.floor(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

function isFuture(dt) {
  return new Date(dt) > new Date();
}

export default function MeetingCard({ meeting, onDelete, isHighlighted }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);

  const future = isFuture(meeting.start_datetime);
  const statusLabel = future ? "Upcoming" : "Past";

  function handleDelete() {
    const label = meeting.meeting_description
      ? `"${meeting.meeting_description}"`
      : `meeting #${meeting.meeting_id}`;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${label} meeting?`
    );
    if (confirmed) onDelete(meeting.meeting_id);
  }

  return (
    <article ref={cardRef} className={`meeting-card clay ${future ? "card-upcoming" : "card-past"}${isHighlighted ? " card-highlighted" : ""}`}>
      <div className="card-status-badge">{statusLabel}</div>

      <div className="card-header">
        <span className="card-id">Meeting #{meeting.meeting_id}</span>
        <span className="card-group">Group #{meeting.group_id}</span>
      </div>

      <h3 className="card-description">
        {meeting.meeting_description || <em>No description</em>}
      </h3>

      <div className="card-info-grid">
        <div className="card-info-item">
          <span className="info-label">Room</span>
          <span className="info-value">{meeting.meeting_room}</span>
        </div>
        <div className="card-info-item">
          <span className="info-label">Duration</span>
          <span className="info-value">{calcDuration(meeting.start_datetime, meeting.end_datetime)}</span>
        </div>
        <div className="card-info-item">
          <span className="info-label">Start</span>
          <span className="info-value">{formatDateTime(meeting.start_datetime)}</span>
        </div>
        <div className="card-info-item">
          <span className="info-label">End</span>
          <span className="info-value">{formatDateTime(meeting.end_datetime)}</span>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn btn-icon btn-edit"
          onClick={() => navigate(`/meetings/${meeting.meeting_id}/edit`)}
          title="Edit meeting"
          aria-label="Edit meeting"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-icon btn-delete"
          onClick={handleDelete}
          title="Delete meeting"
          aria-label="Delete meeting"
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}
