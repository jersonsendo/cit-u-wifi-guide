// One student review of a building's WiFi.
export default class Feedback {
  constructor({ name, building, rating, comment }) {
    this.id = Date.now();
    this.name = name.trim() || "Anonymous";
    this.building = building; // building name
    this.rating = rating;     // 1-5
    this.comment = comment.trim();
  }

  getStars() {
    return "★".repeat(this.rating) + "☆".repeat(5 - this.rating);
  }

  isValid() {
    return this.comment !== "" && this.rating >= 1 && this.rating <= 5;
  }
}
