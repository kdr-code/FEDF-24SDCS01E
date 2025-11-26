import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "./feedbackSlice";

function App() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.feedback.entries);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating before submitting.");
      return;
    }

    dispatch(
      addFeedback({
        rating: Number(rating),
        comment: comment.trim(),
      })
    );

    setRating("");
    setComment("");
    setError("");
  };

  return (
    <div className="card">
      <h1>Feedback Collector</h1>
      <p className="subtitle">
        Rate your session from 1 to 5 and optionally leave a comment.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="rating">Rating (1 to 5) *</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="comment">Comments (optional)</label>
          <textarea
            id="comment"
            rows="3"
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>

      <div className="feedback-list">
        <h2>Submitted Feedback</h2>
        {entries.length === 0 ? (
          <p className="empty">No feedback submitted yet.</p>
        ) : (
          entries.map((item) => (
            <div key={item.id} className="feedback-item">
              <div className="rating-pill">Rating: {item.rating}/5</div>
              {item.comment ? (
                <p>{item.comment}</p>
              ) : (
                <p className="empty">No comment provided.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
