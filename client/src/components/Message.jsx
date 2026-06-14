import "./Message.css";

export default function Message({ type, text }) {
  if (!text) return null;
  return (
    <div className={`message message-${type}`} role="alert">
      <span className="message-icon">
        {type === "success" && "✔"}
        {type === "error" && "✖"}
        {type === "info" && "ℹ"}
      </span>
      <span>{text}</span>
    </div>
  );
}
