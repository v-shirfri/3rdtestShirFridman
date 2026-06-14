import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getGroups, getGroupMeetings, deleteMeeting } from "../services/api";
import MeetingCard from "../components/MeetingCard";
import Message from "../components/Message";
import "./MeetingsList.css";

export default function MeetingsList() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [highlightId, setHighlightId] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlGroupId = searchParams.get("groupId");
    const urlHighlight = searchParams.get("highlight");
    const urlUpdated = searchParams.get("updated");

    setLoadingGroups(true);
    getGroups()
      .then((data) => {
        setGroups(data);
        if (urlGroupId) {
          setSelectedGroupId(urlGroupId);
          setHighlightId(urlHighlight ? Number(urlHighlight) : null);
          if (urlUpdated) {
            setMessage({ type: "success", text: "Meeting updated successfully." });
          } else if (urlHighlight) {
            setMessage({ type: "success", text: "Meeting added successfully." });
          }
          setLoadingMeetings(true);
          getGroupMeetings(urlGroupId)
            .then(setMeetings)
            .catch(() => setMessage({ type: "error", text: "Failed to load meetings for this group." }))
            .finally(() => setLoadingMeetings(false));
        }
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load development groups. Please check your connection." }))
      .finally(() => setLoadingGroups(false));
  }, []);

  function handleGroupChange(e) {
    const id = e.target.value;
    setSelectedGroupId(id);
    setMeetings([]);
    setMessage({ type: "", text: "" });
    setHighlightId(null);

    if (!id) return;

    setLoadingMeetings(true);
    getGroupMeetings(id)
      .then(setMeetings)
      .catch(() => setMessage({ type: "error", text: "Failed to load meetings for this group." }))
      .finally(() => setLoadingMeetings(false));
  }

  function handleDelete(meetingId) {
    deleteMeeting(meetingId)
      .then(() => {
        setMeetings((prev) => prev.filter((m) => m.meeting_id !== meetingId));
        setMessage({ type: "success", text: "Meeting deleted successfully." });
      })
      .catch(() => setMessage({ type: "error", text: "Failed to delete the meeting. Please try again." }));
  }

  const selectedGroup = groups.find((g) => String(g.group_id) === selectedGroupId);

  return (
    <main className="meetings-page">
      <div className="meetings-header">
        <div className="meetings-header-top">
          <div>
            <h1 className="page-title">Meetings</h1>
            <p className="page-sub">Select a development group to view its meetings</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/meetings/add")}>
            + Add Meeting
          </button>
        </div>
      </div>

      <Message type={message.type} text={message.text} />

      {/* Group selector */}
      <div className="group-selector-wrap">
        <label htmlFor="group-select" className="group-label">
          Development Group
        </label>
        {loadingGroups ? (
          <div className="loading-text">Loading groups…</div>
        ) : (
          <select
            id="group-select"
            className="group-select"
            value={selectedGroupId}
            onChange={handleGroupChange}
          >
            <option value="">— Select a group —</option>
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group_name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Meetings grid */}
      {selectedGroupId && (
        <section className="meetings-section">
          <h2 className="meetings-section-title">
            {selectedGroup ? `${selectedGroup.group_name} — Meetings` : "Meetings"}
          </h2>

          {loadingMeetings && <div className="loading-text">Loading meetings…</div>}

          {!loadingMeetings && meetings.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No meetings found for this group.</p>
              <p className="empty-hint">Meetings will appear here once they are added.</p>
            </div>
          )}

          <div className="meetings-grid">
            {meetings.map((m) => (
              <MeetingCard key={m.meeting_id} meeting={m} onDelete={handleDelete} isHighlighted={highlightId === m.meeting_id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
