import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import FeedbackPage from "./pages/FeedbackPage.jsx";

// ---------- Tailwind class names used many times ----------
const btnBase =
  "cursor-pointer rounded-lg px-6 py-2.5 text-base text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:bg-gray-400";
const btn = btnBase + " bg-maroon hover:bg-maroon-dark";
const btnActive = btnBase + " bg-maroon-dark ring-4 ring-gold";
const sectionClass = "mx-auto max-w-5xl px-5 py-12 text-center";
const headingClass = "mb-3 text-2xl font-bold text-maroon-dark";
const resultClass =
  "mt-6 inline-block rounded-lg bg-gold-light px-5 py-2.5 font-bold text-maroon-dark";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center uppercase tracking-wide focus:border-maroon focus:outline-none focus:ring-2 focus:ring-gold";

// ---------- Sample/demo data ----------
const buildings = [
  { name: "NGE Building", activity: "Coding", signal: "Strong", noise: "Moderate" },
  { name: "RTL Building", activity: "Studying", signal: "Strong", noise: "Quiet" },
  { name: "Academic Building", activity: "Academic Work", signal: "Moderate", noise: "Moderate" },
  { name: "GLE Building", activity: "Group Work", signal: "Strong", noise: "Moderate" },
];

// Sample voucher codes for the WiFi login (demo only, not real)
const vouchers = [
  { code: "CITU-2026", plan: "Student voucher" },
  { code: "STUDY-2HRS", plan: "2-hour study pass" },
  { code: "GUEST-1DAY", plan: "Guest pass" },
];

// Maps each activity button to its recommended building
const recommendations = {
  Study: "RTL Building",
  Code: "NGE Building",
  "Group Work": "GLE Building",
  "Academic Work": "Academic Building",
};

// Short guide shown under the hero
const howToSteps = [
  "Pick what you are doing today",
  "Choose a WiFi spot",
  "Log in with a voucher code",
];

const signalOptions = ["All", "Strong", "Moderate"];
const noiseOptions = ["All", "Quiet", "Moderate"];

const navLinks = [
  { label: "Home", to: "/#home" },
  { label: "WiFi Spots", to: "/#wifi-spots" },
  { label: "About", to: "/#about" },
  { label: "Feedback", to: "/feedback" },
];

// ---------- Helper functions ----------
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
}

// Style for the round filter buttons
function pillClass(active) {
  return active
    ? "cursor-pointer rounded-full bg-maroon px-4 py-1.5 text-sm text-white"
    : "cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 transition hover:bg-gold-light";
}

// Turns 75 seconds into "01:15"
function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return minutes + ":" + seconds;
}

// Turns "RTL Building" into "rtl-building" so each card has its own id
function getCardId(name) {
  return name.toLowerCase().replace(/ /g, "-");
}

// ---------- Components ----------
function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-[3px] border-gold bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-5 py-3 sm:justify-between">
        <h1 className="text-xl font-bold text-maroon">CIT-U WiFi Spot Guide</h1>
        <nav className="flex flex-wrap justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-1.5 transition hover:bg-gold-light hover:text-maroon-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section id="home" className="bg-maroon px-4 py-14 text-center text-white sm:py-20">
      <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Where Do You Need to Connect?</h2>
      <p className="mx-auto mb-6 max-w-lg">
        Find a suitable CIT-U building for studying, coding, browsing, and group work.
      </p>
      <button
        className="cursor-pointer rounded-lg bg-gold px-6 py-2.5 text-base font-medium text-maroon-dark transition hover:-translate-y-0.5 hover:bg-yellow-300"
        onClick={() => scrollToSection("wifi-spots")}
      >
        Explore WiFi Spots
      </button>

      <ol className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
        {howToSteps.map((step, index) => (
          <li key={step} className="rounded-lg bg-maroon-dark px-4 py-3 text-sm">
            <span className="mr-2 font-bold text-gold">{index + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Recommendation({ activity, setActivity }) {
  // Remember the activity, then scroll to the recommended building's card
  function handleActivity(item) {
    setActivity(item);
    scrollToSection(getCardId(recommendations[item]));
  }

  return (
    <section className="border-b border-gray-300 bg-white px-5 py-12 text-center">
      <h2 className={headingClass}>What are you doing today?</h2>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.keys(recommendations).map((item) => (
          <button
            key={item}
            className={activity === item ? btnActive : btn}
            onClick={() => handleActivity(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {activity && <p className={resultClass}>Recommended: {recommendations[activity]}</p>}
    </section>
  );
}

function WifiNetwork({ building }) {
  // status can be: "disconnected", "connecting", or "connected"
  const [status, setStatus] = useState("disconnected");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("");
  const [seconds, setSeconds] = useState(0);

  // Details of the building the student chose (undefined if none yet)
  const info = buildings.find((b) => b.name === building);
  const bars = status === "connected" && info ? (info.signal === "Strong" ? 4 : 3) : 0;

  // Count the connected time. This runs while connected and stops otherwise.
  useEffect(() => {
    if (status !== "connected") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  function handleLogin() {
    const entered = code.trim().toUpperCase();

    if (entered === "") {
      setError("Please enter a voucher code.");
      return;
    }

    const voucher = vouchers.find((v) => v.code === entered);
    if (!voucher) {
      setError("Invalid voucher code. Please try again.");
      return;
    }

    setError("");
    setPlan(voucher.plan);
    setStatus("connecting");
    // Pretend the login takes 2 seconds
    setTimeout(() => {
      setSeconds(0);
      setStatus("connected");
    }, 2000);
  }

  function handleDisconnect() {
    setStatus("disconnected");
    setCode("");
    setPlan("");
    setSeconds(0);
  }

  const barHeights = ["h-2", "h-3.5", "h-5", "h-7"];
  const statusText = {
    disconnected: "Not connected",
    connecting: "Logging in...",
    connected: "Connected",
  };
  const statusColor = {
    disconnected: "text-gray-600",
    connecting: "text-yellow-700",
    connected: "text-maroon",
  };

  return (
    <div
      id="wifi-network"
      className="mx-auto mt-8 max-w-xs rounded-xl border border-gray-300 bg-white p-5 text-center"
    >
      <h3 className="mb-3 text-lg font-bold text-maroon">CITU-Student-WiFi</h3>

      <div className="mb-2 flex h-7 items-end justify-center gap-1">
        {barHeights.map((height, index) => (
          <span
            key={height}
            className={"w-2 rounded-sm " + height + (index < bars ? " bg-maroon" : " bg-gray-300")}
          ></span>
        ))}
      </div>

      <p className={"mb-3 font-bold " + statusColor[status]}>{statusText[status]}</p>

      {status === "disconnected" && (
        <div>
          <p className="mb-3 text-sm text-gray-600">
            {building ? (
              <>
                Connecting from: <strong>{building}</strong>
              </>
            ) : (
              "Choose a building above first."
            )}
          </p>
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && building) handleLogin();
            }}
            placeholder="Enter voucher code"
            aria-label="Voucher code"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-500">
            Demo codes: CITU-2026, STUDY-2HRS, GUEST-1DAY
          </p>
          {error && <p className="mt-2 text-sm font-bold text-red-700">{error}</p>}
          <button className={btn + " mt-4"} onClick={handleLogin} disabled={!building}>
            Login
          </button>
        </div>
      )}

      {status === "connecting" && (
        <button className={btn} disabled>
          Logging in...
        </button>
      )}

      {status === "connected" && (
        <div>
          <div className="mb-4 space-y-1 text-sm text-gray-600">
            <p>
              Voucher: <strong>{plan}</strong>
            </p>
            <p>
              Building: <strong>{building}</strong>
            </p>
            <p>
              Signal: {info?.signal} | Noise: {info?.noise}
            </p>
            <p>Sample IP address: 192.168.1.25</p>
            <p>
              Connected for: <strong>{formatTime(seconds)}</strong>
            </p>
          </div>
          <button className={btn} onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

function WifiSpots({ recommendedBuilding }) {
  const [selected, setSelected] = useState("");
  const [signalFilter, setSignalFilter] = useState("All");
  const [noiseFilter, setNoiseFilter] = useState("All");

  // Does this building match the chosen filters?
  function matchesFilters(building) {
    const signalOk = signalFilter === "All" || building.signal === signalFilter;
    const noiseOk = noiseFilter === "All" || building.noise === noiseFilter;
    return signalOk && noiseOk;
  }

  const matchCount = buildings.filter(matchesFilters).length;

  // Remember the chosen building, then scroll down to the sample WiFi network
  function handleChooseSpot(name) {
    setSelected(name);
    scrollToSection("wifi-network");
  }

  return (
    <section id="wifi-spots" className={sectionClass}>
      <h2 className={headingClass}>WiFi Spots</h2>

      <div className="mb-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-bold text-gray-600">Signal:</span>
          {signalOptions.map((option) => (
            <button
              key={option}
              className={pillClass(signalFilter === option)}
              onClick={() => setSignalFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-bold text-gray-600">Noise:</span>
          {noiseOptions.map((option) => (
            <button
              key={option}
              className={pillClass(noiseFilter === option)}
              onClick={() => setNoiseFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Showing {matchCount} of {buildings.length} spots. Spots that do not match will fade.
      </p>

      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-5 text-left">
        {buildings.map((building) => {
          // Is this card the one recommended by the activity buttons?
          const isRecommended = building.name === recommendedBuilding;
          const matches = matchesFilters(building);

          return (
            <div
              key={building.name}
              id={getCardId(building.name)}
              className={
                "rounded-xl border border-t-4 border-t-gold p-5 transition hover:-translate-y-1 hover:shadow-lg " +
                (isRecommended
                  ? "scale-105 animate-pop border-gold bg-gold-light ring-4 ring-gold"
                  : "border-gray-300 bg-white") +
                (matches ? "" : " opacity-40")
              }
            >
              {isRecommended && (
                <span className="mb-2 inline-block rounded-full bg-maroon px-3 py-1 text-xs font-bold text-white">
                  ★ Recommended for you
                </span>
              )}
              <h3 className="mb-3 text-lg font-bold text-maroon">{building.name}</h3>
              <p className="my-1 text-gray-600">
                <strong>Best for:</strong> {building.activity}
              </p>
              <p className="my-1 text-gray-600">
                <strong>Signal:</strong> {building.signal}
              </p>
              <p className="my-1 text-gray-600">
                <strong>Noise:</strong> {building.noise}
              </p>
              <button
                className={btn + " mt-4 w-full"}
                onClick={() => handleChooseSpot(building.name)}
              >
                Choose Spot
              </button>
            </div>
          );
        })}
      </div>

      {selected && <p className={resultClass}>You selected {selected}.</p>}

      <WifiNetwork building={selected} />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-gray-300 bg-white px-5 py-12 text-center">
      <h2 className={headingClass}>About the Project</h2>
      <p className="mx-auto max-w-xl text-gray-600">
        CIT-U WiFi Spot Guide is a simple student-made website concept designed to help students
        choose a suitable CIT-U building based on their activity.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-[3px] border-gold bg-maroon-dark px-5 py-6 text-center text-white">
      <p>CIT-U WiFi Spot Guide © 2026</p>
    </footer>
  );
}

// The main page: all the sections you already had
function HomePage({ activity, setActivity, recommendedBuilding }) {
  const location = useLocation();

  // When a link like "/#about" is clicked, scroll to that section
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Home />
      <Recommendation activity={activity} setActivity={setActivity} />
      <WifiSpots recommendedBuilding={recommendedBuilding} />
      <About />
    </>
  );
}

function App() {
  // The selected activity lives here so both Recommendation and WifiSpots can use it
  const [activity, setActivity] = useState("");
  // The feedback list lives here so it is kept when you move between pages
  const [feedbackList, setFeedbackList] = useState([]);
  const location = useLocation();

  const recommendedBuilding = activity ? recommendations[activity] : "";

  // Start at the top when opening a new page (unless the link points to a section)
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  function addFeedback(item) {
    setFeedbackList([item, ...feedbackList]);
  }

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activity={activity}
                setActivity={setActivity}
                recommendedBuilding={recommendedBuilding}
              />
            }
          />
          <Route
            path="/feedback"
            element={
              <FeedbackPage
                buildings={buildings}
                feedbackList={feedbackList}
                onAddFeedback={addFeedback}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
