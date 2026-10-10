// The Signal / Noise pill filters on the WiFi Spots section.
export default class WifiFilter {
  static SIGNAL_OPTIONS = ["All", "Strong", "Moderate"];
  static NOISE_OPTIONS = ["All", "Quiet", "Moderate"];

  constructor(signal = "All", noise = "All") {
    this.signal = signal;
    this.noise = noise;
  }

  matches(building) {
    const signalOk = this.signal === "All" || building.signal === this.signal;
    const noiseOk = this.noise === "All" || building.noise === this.noise;
    return signalOk && noiseOk;
  }

  countMatches(buildings) {
    return buildings.filter((b) => this.matches(b)).length;
  }
}
