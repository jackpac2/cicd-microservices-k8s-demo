export function StatusMessage({ message, tone = "info" }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`status-message status-message-${tone}`} role="status">
      {message}
    </div>
  );
}
