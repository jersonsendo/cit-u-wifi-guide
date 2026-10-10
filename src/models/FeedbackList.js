import Feedback from "./Feedback.js";

// All feedback submitted while the app is open (newest first).
export default class FeedbackList {
  constructor(items = []) {
    this.items = items; // Feedback[]
  }

  add(feedback) {
    return new FeedbackList([feedback, ...this.items]); // immutable, React-friendly
  }

  count() {
    return this.items.length;
  }

  averageRating() {
    if (this.items.length === 0) return null;
    return (this.items.reduce((sum, f) => sum + f.rating, 0) / this.items.length).toFixed(1);
  }

  forBuilding(name) {
    return this.items.filter((f) => f.building === name);
  }
}
