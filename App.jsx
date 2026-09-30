import { useState } from "react";

// Sample/demo data for the four WiFi spot cards
const buildings = [
  { name: "NGE Building", activity: "Coding", signal: "Strong", noise: "Moderate" },
  { name: "RTL Building", activity: "Studying", signal: "Strong", noise: "Quiet" },
  { name: "Academic Building", activity: "Academic Work", signal: "Moderate", noise: "Moderate" },
  { name: "GLE Building", activity: "Group Work", signal: "Strong", noise: "Moderate" },
];

// Maps each activity button to its recommended building
const recommendations = {
  Study: "RTL Building",
  Code: "NGE Building",
  "Group Work": "GLE Building",
};

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">CIT-U WiFi Spot Guide</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#wifi-spots">WiFi Spots</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section id="home" className="hero">
      <h2>Where Do You Need to Connect?</h2>
      <p>Find a suitable CIT-U building for studying, coding, browsing, and group work.</p>
      <button className="btn btn-light" onClick={() => scrollToSection("wifi-spots")}>
        Explore WiFi Spots
      </button>
    </section>
  );
}

function Recommendation() {
  const [activity, setActivity] = useState("");

  return (
    <section className="section recommendation">
      <h2>What are you doing today?</h2>
      <div className="button-row">
        {Object.keys(recommendations).map((item) => (
          <button
            key={item}
            className={activity === item ? "btn active" : "btn"}
            onClick={() => setActivity(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {activity && (
        <p className="result">Recommended: {recommendations[activity]}</p>
      )}
    </section>
  );
}

function WifiSpots() {
  const [selected, setSelected] = useState("");

  return (
    <section id="wifi-spots" className="section">
      <h2>WiFi Spots</h2>

      <div className="cards">
        {buildings.map((building) => (
          <div className="card" key={building.name}>
            <h3>{building.name}</h3>
            <p><strong>Best for:</strong> {building.activity}</p>
            <p><strong>Signal:</strong> {building.signal}</p>
            <p><strong>Noise:</strong> {building.noise}</p>
            <button className="btn" onClick={() => setSelected(building.name)}>
              Choose Spot
            </button>
          </div>
        ))}
      </div>

      {selected && <p className="result">You selected {selected}.</p>}

      <p className="note">
        WiFi information shown on this website is sample data created for this
        React.js activity and does not represent real-time WiFi conditions.
      </p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <h2>About the Project</h2>
      <p>
        CIT-U WiFi Spot Guide is a simple student-made website concept designed
        to help students choose a suitable CIT-U building based on their activity.
      </p>
      <p>This project demonstrates basic React.js and pure CSS development.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>CIT-U WiFi Spot Guide © 2026</p>
      <p>Created for a React.js and CSS activity.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
        <Recommendation />
        <WifiSpots />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
