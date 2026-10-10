import { useState } from "react";

const btn =
  "cursor-pointer rounded-lg bg-maroon px-6 py-2.5 text-base text-white transition hover:-translate-y-0.5 hover:bg-maroon-dark";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-gold";
const labelClass = "mb-1 block text-sm font-bold text-gray-700";

function FeedbackPage({ buildings, feedbackList, onAddFeedback }) {
  const [name, setName] = useState("");
  const [building, setBuilding] = useState(buildings[0].name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (comment.trim() === "") {
      setError("Please write a comment.");
      setMessage("");
      return;
    }

    onAddFeedback({
      id: Date.now(),
      name: name.trim() || "Anonymous",
      building,
      rating,
      comment: comment.trim(),
    });

    setName("");
    setRating(5);
    setComment("");
    setError("");
    setMessage("Thank you! Your feedback was added below.");
  }

  // Average rating of all feedback (null when there is none yet)
  const average =
    feedbackList.length === 0
      ? null
      : (feedbackList.reduce((sum, item) => sum + item.rating, 0) / feedbackList.length).toFixed(1);

  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="mb-2 text-center text-2xl font-bold text-maroon-dark">Student Feedback</h2>
      <p className="mb-6 text-center text-gray-600">
        Tell us how the WiFi is in each building. Feedback is only saved while this page is open.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-300 border-t-4 border-t-gold bg-white p-6 text-left"
      >
        <div>
          <label htmlFor="name" className={labelClass}>
            Name (optional)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Anonymous"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="building" className={labelClass}>
            Building
          </label>
          <select
            id="building"
            value={building}
            onChange={(event) => setBuilding(event.target.value)}
            className={inputClass}
          >
            {buildings.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={labelClass}>Rating</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={star + " star"}
                onClick={() => setRating(star)}
                className={
                  "cursor-pointer text-3xl transition hover:scale-110 " +
                  (star <= rating ? "text-gold" : "text-gray-300")
                }
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className={labelClass}>
            Comment
          </label>
          <textarea
            id="comment"
            rows="3"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="How was the WiFi?"
            className={inputClass}
          ></textarea>
        </div>

        {error && <p className="text-sm font-bold text-red-700">{error}</p>}
        {message && (
          <p className="rounded-lg bg-gold-light px-4 py-2 font-bold text-maroon-dark">{message}</p>
        )}

        <button type="submit" className={btn}>
          Submit Feedback
        </button>
      </form>

      <h3 className="mb-3 mt-10 text-xl font-bold text-maroon-dark">All Feedback</h3>
      {average && (
        <p className="mb-4 text-gray-600">
          Average rating: <strong>{average} / 5</strong> from {feedbackList.length} review
          {feedbackList.length === 1 ? "" : "s"}
        </p>
      )}

      {feedbackList.length === 0 ? (
        <p className="text-gray-500">No feedback yet. Be the first!</p>
      ) : (
        <ul className="space-y-3">
          {feedbackList.map((item) => (
            <li key={item.id} className="rounded-xl border border-gray-300 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-maroon">{item.name}</strong>
                <span className="text-gold">
                  {"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{item.building}</p>
              <p className="mt-1 text-gray-700">{item.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FeedbackPage;
