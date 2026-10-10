// Maps an activity button (Study, Code, ...) to a recommended building.
export default class Recommendation {
  constructor(activity, buildingName) {
    this.activity = activity;         // "Study"
    this.buildingName = buildingName; // "RTL Building"
  }

  static samples() {
    return [
      new Recommendation("Study", "RTL Building"),
      new Recommendation("Code", "NGE Building"),
      new Recommendation("Group Work", "GLE Building"),
      new Recommendation("Academic Work", "Academic Building"),
    ];
  }

  static forActivity(list, activity) {
    return list.find((r) => r.activity === activity) ?? null;
  }
}
