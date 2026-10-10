// A WiFi spot (campus building) students can choose from.
export default class Building {
  constructor({ name, activity, signal, noise }) {
    this.name = name;         // "RTL Building"
    this.activity = activity; // best-for label, e.g. "Studying"
    this.signal = signal;     // "Strong" | "Moderate"
    this.noise = noise;       // "Quiet" | "Moderate"
  }

  // "RTL Building" -> "rtl-building" (DOM id of its card)
  getCardId() {
    return this.name.toLowerCase().replace(/ /g, "-");
  }

  // Signal bars shown on the WiFi card (0-4)
  getSignalBars() {
    return this.signal === "Strong" ? 4 : 3;
  }

  matches(filter) {
    return filter.matches(this);
  }

  static samples() {
    return [
      new Building({ name: "NGE Building", activity: "Coding", signal: "Strong", noise: "Moderate" }),
      new Building({ name: "RTL Building", activity: "Studying", signal: "Strong", noise: "Quiet" }),
      new Building({ name: "Academic Building", activity: "Academic Work", signal: "Moderate", noise: "Moderate" }),
      new Building({ name: "GLE Building", activity: "Group Work", signal: "Strong", noise: "Moderate" }),
    ];
  }
}
