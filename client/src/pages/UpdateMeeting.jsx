import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMeeting, updateMeeting, getGroups } from "../services/api";
import Message from "../components/Message";
import "./UpdateMeeting.css";

/* Convert "2026-06-20 09:00:00" → "2026-06-20T09:00" for datetime-local input */
function toInputValue(dt) {
  if (!dt) return "";
  return String(dt).replace(" ", "T").slice(0, 16);
}

/* Convert "2026-06-20T09:00" → "2026-06-20 09:00:00" for backend */
function toBackendValue(dt) {
  if (!dt) return "";
  return dt.replace("T", " ") + ":00";
}

function calcLiveDuration(start, end) {
  if (!start || !end) return null;
  const ms = new Date(end) - new Date(start);
  if (isNaN(ms) || ms <= 0) return null;
  const totalMin = Math.floor(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr & ${mins} min`;
}

function validate(form) {
  const errors = {};
  if (!form.group_id) errors.group_id = "Please select a development group.";
  if (!form.start_datetime) errors.start_datetime = "Start date and time are required.";
  if (!form.end_datetime) errors.end_datetime = "End date and time are required.";
  if (form.start_datetime && form.end_datetime) {
    if (new Date(form.end_datetime) <= new Date(form.start_datetime)) {
      errors.end_datetime = "End time must be after start time.";
    }
  }
  if (!form.meeting_description.trim()) errors.meeting_description = "Meeting description is required.";
  if (!form.meeting_room.trim()) errors.meeting_room = "Meeting room is required.";
  return errors;
}

export default function UpdateMeeting() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    group_id: "",
    start_datetime: "",
    end_datetime: "",
    meeting_description: "",
    meeting_room: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const currentErrors = validate(form);
  const isFormInvalid = Object.keys(currentErrors).length > 0;

  function showError(name) {
    return touched[name] ? currentErrors[name] : undefined;
  }

  /* Load meeting and groups on mount */
  useEffect(() => {
    Promise.all([getMeeting(id), getGroups()])
      .then(([meeting, grps]) => {
        setGroups(grps);
        setForm({
          group_id: String(meeting.group_id),
          start_datetime: toInputValue(meeting.start_datetime),
          end_datetime: toInputValue(meeting.end_datetime),
          meeting_description: meeting.meeting_description || "",
          meeting_room: meeting.meeting_room || "",
        });
      })
      .catch(() =>
        setMessage({ type: "error", text: "Failed to load meeting details. Please try again." })
      )
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mark all fields as touched so all validation messages become visible
    setTouched({ group_id: true, start_datetime: true, end_datetime: true, meeting_description: true, meeting_room: true });
    if (isFormInvalid) return;

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    const body = {
      group_id: Number(form.group_id),
      start_datetime: toBackendValue(form.start_datetime),
      end_datetime: toBackendValue(form.end_datetime),
      meeting_description: form.meeting_description,
      meeting_room: form.meeting_room,
    };

    updateMeeting(id, body)
      .then(() => {
        navigate(`/meetings?groupId=${form.group_id}&highlight=${id}&updated=true`);
      })
      .catch((err) => {
        setMessage({ type: "error", text: err.message || "Failed to update meeting." });
      })
      .finally(() => setSubmitting(false));
  }

  if (loading) {
    return (
      <main className="update-page">
        <div className="loading-text">Loading meeting details…</div>
      </main>
    );
  }

  return (
    <main className="update-page">
      <div className="update-header">
        <button className="btn btn-ghost" onClick={() => navigate("/meetings")}>
          ← Back to Meetings
        </button>
        <h1 className="page-title">Update Meeting</h1>
        <p className="page-sub">Edit the details below and save your changes</p>
      </div>

      <Message type={message.type} text={message.text} />

      <form className="update-form card clay" onSubmit={handleSubmit} noValidate>
        {/* Group */}
        <div className="form-group">
          <label htmlFor="group_id" className="form-label">
            Development Group <span className="required">*</span>
          </label>
          <select
            id="group_id"
            name="group_id"
            className={`form-input ${showError("group_id") ? "input-error" : ""}`}
            value={form.group_id}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">— Select a group —</option>
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group_name}
              </option>
            ))}
          </select>
          {showError("group_id") && <span className="field-error">{showError("group_id")}</span>}
        </div>

        {/* Start datetime */}
        <div className="form-group">
          <label htmlFor="start_datetime" className="form-label">
            Start Date &amp; Time <span className="required">*</span>
          </label>
          <input
            type="datetime-local"
            id="start_datetime"
            name="start_datetime"
            className={`form-input ${showError("start_datetime") ? "input-error" : ""}`}
            value={form.start_datetime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("start_datetime") && <span className="field-error">{showError("start_datetime")}</span>}
        </div>

        {/* End datetime */}
        <div className="form-group">
          <label htmlFor="end_datetime" className="form-label">
            End Date &amp; Time <span className="required">*</span>
          </label>
          <input
            type="datetime-local"
            id="end_datetime"
            name="end_datetime"
            className={`form-input ${showError("end_datetime") ? "input-error" : ""}`}
            value={form.end_datetime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("end_datetime") && <span className="field-error">{showError("end_datetime")}</span>}
          {calcLiveDuration(form.start_datetime, form.end_datetime) && (
            <div className="duration-preview">
              <span className="duration-preview-icon">⏱️</span>
              Total duration: <strong>{calcLiveDuration(form.start_datetime, form.end_datetime)}</strong>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="meeting_description" className="form-label">
            Meeting Description <span className="required">*</span>
          </label>
          <textarea
            id="meeting_description"
            name="meeting_description"
            className={`form-input form-textarea ${showError("meeting_description") ? "input-error" : ""}`}
            value={form.meeting_description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            placeholder="Describe the purpose of this meeting…"
          />
          {showError("meeting_description") && (
            <span className="field-error">{showError("meeting_description")}</span>
          )}
        </div>

        {/* Room */}
        <div className="form-group">
          <label htmlFor="meeting_room" className="form-label">
            Meeting Room <span className="required">*</span>
          </label>
          <input
            type="text"
            id="meeting_room"
            name="meeting_room"
            className={`form-input ${showError("meeting_room") ? "input-error" : ""}`}
            value={form.meeting_room}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Conference Room A"
          />
          {showError("meeting_room") && <span className="field-error">{showError("meeting_room")}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isFormInvalid || submitting}
          >
            {submitting ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/meetings")}
          >
            Cancel
          </button>
        </div>
        {isFormInvalid && (
          <p className="form-hint">Please fill in all required fields above to enable the Save Changes button.</p>
        )}
      </form>
    </main>
  );
}
