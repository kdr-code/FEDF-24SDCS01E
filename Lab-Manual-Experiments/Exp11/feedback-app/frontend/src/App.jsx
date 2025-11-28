import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

function App() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/feedback`);
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load feedback from server.");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !comment.trim()) {
      setError("Please fill both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to submit feedback.");
      } else {
        setName("");
        setComment("");
        await fetchFeedback(); // refresh list
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Full-Stack Feedback App</h1>
      <p className="subtitle">
        React + Vite frontend with Express + MongoDB backend.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="comment">Comment *</label>
          <textarea
            id="comment"
            rows="3"
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      <div className="feedback-list">
        <h2>Submitted Feedback</h2>
        {feedback.length === 0 ? (
          <p className="small-muted">No feedback yet.</p>
        ) : (
          feedback.map((item) => (
            <div key={item._id} className="feedback-item">
              <strong>{item.name}</strong>
              <p>{item.comment}</p>
              <p className="small-muted">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
