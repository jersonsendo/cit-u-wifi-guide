// State machine behind the WifiNetwork card:
// disconnected -> connecting -> connected -> disconnected
export default class WifiSession {
  static SSID = "CITU-Student-WiFi";
  static SAMPLE_IP = "192.168.1.25";

  constructor(vouchers) {
    this.vouchers = vouchers; // Voucher[] accepted by this network
    this.status = "disconnected";
    this.building = null;     // Building the student connects from
    this.voucher = null;      // Voucher used to log in
    this.seconds = 0;         // connected time
    this.error = "";
  }

  // Returns true when the login attempt starts (status becomes "connecting")
  login(code, building) {
    if (!building) {
      this.error = "Choose a building first.";
      return false;
    }
    if (code.trim() === "") {
      this.error = "Please enter a voucher code.";
      return false;
    }
    const voucher = this.vouchers.find((v) => v.matches(code));
    if (!voucher) {
      this.error = "Invalid voucher code. Please try again.";
      return false;
    }
    this.error = "";
    this.voucher = voucher;
    this.building = building;
    this.status = "connecting";
    return true;
  }

  completeLogin() {
    this.seconds = 0;
    this.status = "connected";
  }

  tick() {
    if (this.status === "connected") this.seconds += 1;
  }

  disconnect() {
    this.status = "disconnected";
    this.voucher = null;
    this.seconds = 0;
  }

  getSignalBars() {
    return this.status === "connected" && this.building ? this.building.getSignalBars() : 0;
  }

  formatTime() {
    const m = String(Math.floor(this.seconds / 60)).padStart(2, "0");
    const s = String(this.seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }
}
