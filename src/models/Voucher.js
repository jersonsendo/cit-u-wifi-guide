// A demo voucher code used to log in to the WiFi (not real).
export default class Voucher {
  constructor({ code, plan }) {
    this.code = code; // "CITU-2026"
    this.plan = plan; // "Student voucher"
  }

  matches(enteredCode) {
    return this.code === enteredCode.trim().toUpperCase();
  }

  static samples() {
    return [
      new Voucher({ code: "CITU-2026", plan: "Student voucher" }),
      new Voucher({ code: "STUDY-2HRS", plan: "2-hour study pass" }),
      new Voucher({ code: "GUEST-1DAY", plan: "Guest pass" }),
    ];
  }
}
