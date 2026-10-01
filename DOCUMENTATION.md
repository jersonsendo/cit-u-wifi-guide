# CIT-U WiFi Spot Guide: Documentation

A small student website built with **React.js** and **pure CSS** that helps CIT-U students choose a building based on what they need to do (study, code, or group work). It also includes a simple **simulated WiFi network** card that connects and disconnects like a real one.

> **Important:** All WiFi information on this site is sample data. Nothing here measures or connects to a real WiFi network. It is a front-end school activity only.

---

## 1. Project Overview

| Item | Details |
|---|---|
| Project name | CIT-U WiFi Spot Guide |
| Purpose | Help students pick a CIT-U building for their activity |
| Type | Front-end only (no backend, database, login, or API) |
| Tools | React.js, JavaScript, Pure CSS, Vite |
| Color theme | Maroon, gold, white, and light gray |

### Features

1. Sticky navigation header with smooth-scrolling links
2. Hero section with a button that scrolls to the WiFi Spots section
3. Activity recommendation (Study, Code, Group Work, Academic Work) that scrolls to the recommended building's card
4. Four WiFi spot cards with a **Choose Spot** button that scrolls to the simulated WiFi network
5. Simulated WiFi network card (Connect / Connecting / Connected / Disconnect)
6. About section
7. Footer
8. Responsive layout for desktop and mobile

---

## 2. Technologies Used

- **React.js**: builds the page out of reusable pieces called components.
- **JavaScript (JSX)**: the language React uses. JSX lets us write HTML-like code inside JavaScript.
- **Pure CSS**: all styling is in one file, `App.css`, with no frameworks.
- **Vite**: a development tool that runs the project quickly on your computer.

Not used: Bootstrap, Tailwind, Material UI, Firebase, any database, backend, API, login, or maps.

---

## 3. Project Structure

```text
cit-u-wifi-guide/
├── public/              # Static files (from Vite)
├── src/
│   ├── App.jsx          # All React components
│   ├── App.css          # All styling
│   └── main.jsx         # Starts the React app
├── index.html           # The single HTML page
├── package.json         # Project settings and dependencies
├── DOCUMENTATION.md     # This file
└── README.md
```

### What each main file does

- **`index.html`** contains one empty `<div id="root"></div>`. React puts the whole website inside it.
- **`main.jsx`** finds that `root` div and tells React to display the `App` component there. It also imports `App.css`.
- **`App.jsx`** contains all the components (Header, Home, and so on) and the `App` component that combines them.
- **`App.css`** contains all the colors, layout, and hover effects.

---

## 4. How to Run the Project

### First-time setup

1. Install **Node.js** (LTS version) from nodejs.org. This gives you `npm`.
2. Create the Vite project:

```bash
npm create vite@latest cit-u-wifi-guide -- --template react
cd cit-u-wifi-guide
```

3. Replace `src/App.jsx`, `src/App.css`, and `src/main.jsx` with the project files.
4. Install and run:

```bash
npm install
npm run dev
```

5. Open the link shown in the terminal (usually `http://localhost:5173`).

Stop the server any time with **Ctrl + C**.

---

## 5. How the Website Works (Big Picture)

React builds pages from **components**. A component is a function that returns what should appear on the screen. Our `App` component puts the smaller components together:

```jsx
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
```

Page order, top to bottom:

```text
Header          (logo + navigation)
Home            (hero + Explore button)
Recommendation  (Study / Code / Group Work / Academic Work)
WifiSpots       (4 cards + simulated WiFi network)
About           (project description)
Footer
```

> `WifiNetwork` is a component used **inside** `WifiSpots`, so it appears under the building cards.

---

## 6. Components Explained

### 6.1 Header

Shows the site name and three navigation links.

```jsx
<a href="#home">Home</a>
<a href="#wifi-spots">WiFi Spots</a>
<a href="#about">About</a>
```

Each link points to a section's `id` (for example `id="about"`). Clicking a link jumps to that section. The scrolling is smooth because of `scroll-behavior: smooth` in the CSS. The header is `position: sticky`, so it stays at the top while you scroll.

### 6.2 Home

The hero section with the heading "Where Do You Need to Connect?" and the **Explore WiFi Spots** button.

```jsx
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
```

The button uses `onClick` to call this helper, which finds the WiFi Spots section and scrolls to it. This same helper is reused by the activity buttons and the **Choose Spot** buttons, so every scroll in the site behaves the same way.

**Card id helper:** each building card needs its own `id` so the page knows where to scroll. This small function builds one from the building's name:

```jsx
function getCardId(name) {
  return name.toLowerCase().replace(/ /g, "-");
}
```

For example, `"RTL Building"` becomes `"rtl-building"`.

### 6.3 Recommendation

Asks "What are you doing today?" and shows a recommended building.

**The data:**

```jsx
const recommendations = {
  Study: "RTL Building",
  Code: "NGE Building",
  "Group Work": "GLE Building",
  "Academic Work": "Academic Building",
};
```

This is a lookup table. Each activity (the key) points to one building (the value).

**The state:**

```jsx
const [activity, setActivity] = useState("");
```

It starts empty, meaning nothing has been chosen yet.

**The buttons** are created with `.map()` over `Object.keys(recommendations)`, which gives `["Study", "Code", "Group Work", "Academic Work"]`. Because the buttons come from this object, adding a new activity to it automatically adds a new button.

**Clicking a button** runs `handleActivity(item)`. It does two things: it saves the activity in state, and it scrolls to the recommended building's card.

```jsx
function handleActivity(item) {
  setActivity(item);
  scrollToSection(getCardId(recommendations[item]));
}
```

For example, clicking **Study** looks up `"RTL Building"`, turns it into the id `"rtl-building"`, and scrolls to the card with that id.

**The result** appears only when something is chosen:

```jsx
{activity && <p className="result">Recommended: {recommendations[activity]}</p>}
```

The selected button also gets an `active` CSS class so it looks highlighted.

### 6.4 WifiSpots

Shows the four building cards.

**The data:**

```jsx
const buildings = [
  { name: "NGE Building", activity: "Coding", signal: "Strong", noise: "Moderate" },
  { name: "RTL Building", activity: "Studying", signal: "Strong", noise: "Quiet" },
  { name: "Academic Building", activity: "Academic Work", signal: "Moderate", noise: "Moderate" },
  { name: "GLE Building", activity: "Group Work", signal: "Strong", noise: "Moderate" },
];
```

**Making the cards with `.map()`:** instead of writing four cards by hand, `.map()` loops through the array and creates one card for each building. The `key={building.name}` helps React tell the cards apart, and `id={getCardId(building.name)}` gives each card the id that the activity buttons scroll to.

**The state:**

```jsx
const [selected, setSelected] = useState("");
```

Clicking **Choose Spot** runs `handleChooseSpot(building.name)`. It saves the chosen building and then scrolls down to the simulated WiFi network card (which has `id="wifi-network"`):

```jsx
function handleChooseSpot(name) {
  setSelected(name);
  scrollToSection("wifi-network");
}
```

The selection message appears:

```jsx
{selected && <p className="result">You selected {selected}.</p>}
```

### 6.5 WifiNetwork (simulated)

A small card for a fake network named **CITU-Student-WiFi**. It is a simulation, not a real connection.

**The state** has three possible values:

```jsx
const [status, setStatus] = useState("disconnected");
// "disconnected" | "connecting" | "connected"
```

**The flow:**

```text
disconnected --click Connect--> connecting --after 2 seconds--> connected
connected    --click Disconnect--> disconnected
```

**The code:**

```jsx
function handleConnect() {
  setStatus("connecting");
  setTimeout(() => setStatus("connected"), 2000);
}

function handleDisconnect() {
  setStatus("disconnected");
}
```

`setTimeout` waits 2000 milliseconds (2 seconds) before switching to "connected", which imitates how real WiFi takes a moment to connect.

**What changes on screen for each status:**

| Status | Status text | Signal bars | Button | Extra info |
|---|---|---|---|---|
| disconnected | Not connected | Gray | Connect | None |
| connecting | Connecting... | Gray | Connecting... (disabled) | None |
| connected | Connected | Maroon | Disconnect | Sample IP address |

This is **conditional rendering**: the screen shows different things depending on the state.

### 6.6 About

Shows the heading "About the Project" and a short description of the website.

### 6.7 Footer

Shows "CIT-U WiFi Spot Guide © 2026".

---

## 7. Key React Concepts Used

### Components
Small, reusable pieces of the page. Each one is a function whose name starts with a capital letter. They are used like HTML tags: `<Header />`.

### `useState`
Lets a component **remember** a value and **update the screen** when it changes.

```jsx
const [activity, setActivity] = useState("");
```

- `activity` is the current value.
- `setActivity` is the function that changes it.
- `""` is the starting value.

A normal variable would not make React redraw the page. State does.

| Component | State | Remembers |
|---|---|---|
| Recommendation | `activity` | The clicked activity button |
| WifiSpots | `selected` | The chosen building |
| WifiNetwork | `status` | Disconnected, connecting, or connected |

### `.map()`
Loops through an array and returns a new list of elements. Used for the buildings and the activity buttons.

### Event handling (`onClick`)
Runs a function when the user clicks. Every button in the project uses `onClick`.

### Conditional rendering
Shows something only when a condition is true.

```jsx
{selected && <p>You selected {selected}.</p>}
```

`&&` means "if the left side has a value, show the right side." It is also used for the WiFi status text and buttons.

### Props and keys
Each item in a `.map()` list needs a unique `key`. React uses it to track which item is which.

---

## 8. CSS Explained (`App.css`)

### Color variables

All colors are defined once at the top:

```css
:root {
  --maroon: #800000;
  --maroon-dark: #5a0000;
  --gold: #f2b705;
  --gold-light: #fbf1cf;
  --gray: #f3f4f6;
  --gray-border: #d9dde1;
  --text: #222;
  --muted: #555;
}
```

They are used like `color: var(--maroon);`. To change the whole color scheme, edit only this block.

### Main styling ideas

| Feature | How it is done |
|---|---|
| Sticky header | `position: sticky; top: 0;` |
| Smooth scrolling | `html { scroll-behavior: smooth; }` |
| Headings not hidden by the header | `scroll-padding-top: 70px;` |
| Rounded corners | `border-radius` on buttons and cards |
| Hover effects | `:hover` with a small `transform: translateY(...)` |
| Responsive cards | CSS Grid: `repeat(auto-fit, minmax(210px, 1fr))` |
| Mobile layout | `@media (max-width: 600px) { ... }` |
| Signal bars | Four small `<span>` elements with different heights |
| Disabled button | `.btn:disabled` (gray, no hover movement) |

### Responsive cards

```css
grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
```

This means: fit as many columns as possible, each at least 210px wide. On a wide screen you get four cards in a row. On a phone they stack in one column, with no extra code.

### Signal bars

Four bars are gray by default. When connected they get the `on` class and turn maroon:

```jsx
<span className={status === "connected" ? "bar on" : "bar"}></span>
```

---

## 9. Data Flow Summary

```text
User clicks a button
        |
        v
onClick runs a function
        |
        v
The function calls a state setter (setActivity / setSelected / setStatus)
        |
        v
React re-renders the component
        |
        v
The screen updates (new message, new button, new signal bars)
```

---

## 10. How to Customize

| I want to... | Change this |
|---|---|
| Change colors | The `:root` block in `App.css` |
| Change a building's info | The `buildings` array in `App.jsx` |
| Add a building card | Add one more object to the `buildings` array. The card appears automatically |
| Change which building is recommended | The `recommendations` object in `App.jsx` |
| Rename the WiFi network | The `<h3>` inside `WifiNetwork` |
| Change the connection delay | The `2000` in `setTimeout` (in milliseconds) |
| Change the sample IP address | The text inside `network-info` |

---

## 11. Saving and Sharing with Git and GitHub

```bash
git init
git add .
git commit -m "Initial commit: CIT-U WiFi Spot Guide"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cit-u-wifi-guide.git
git push -u origin main
```

For later changes:

```bash
git add .
git commit -m "Describe your change"
git push
```

---

## 12. Troubleshooting

| Problem | Fix |
|---|---|
| `npm` is not recognized | Install Node.js (LTS), then restart VS Code |
| Page shows the Vite "Get started" screen | `App.jsx` was overwritten. Paste the project's `App.jsx` back into `src/` |
| Page did not update | Save with Ctrl + S. If needed, stop with Ctrl + C and run `npm run dev` again |
| Red error screen in the browser | Read the first lines of the message. It names the file and line to check |
| Styles are missing | Make sure `main.jsx` has `import "./App.css";` |
| Git says "Author identity unknown" | Set `git config --global user.name` and `user.email` |

---

## 13. Demo Guide (for presenting)

1. Open the site and introduce the purpose: helping students choose a building.
2. Click the nav links to show smooth scrolling, then the **Explore WiFi Spots** button.
3. Click **Study**, **Code**, **Group Work**, and **Academic Work** to show the page scrolling to the recommended building's card.
4. Click **Choose Spot** on a card to show the selection message and the page scrolling to the WiFi network.
5. Click **Connect** on the WiFi card, wait for **Connected**, then click **Disconnect**.
6. Open `App.jsx` and explain: components, `useState`, `.map()`, `onClick`, and conditional rendering.
7. Open `App.css` and show the color variables, the grid, and the hover effects.

### Likely questions and answers

**Why use `useState` instead of a normal variable?**
A normal variable does not make React update the screen. State does.

**Why does `.map()` need a `key`?**
It lets React identify each item, so it can update the list efficiently.

**Is the WiFi real?**
No. It is a simulation built with state and `setTimeout`. It does not access any real network.

**Why is there only one CSS file?**
The activity asks for a simple, beginner-friendly structure, and one file is easy to read and explain.

**How would you make this real?**
It would need a backend or a device API to measure actual network conditions. That is outside this front-end activity.

---

## 14. Summary

This project shows the core ideas of React for beginners: building a page from components, remembering values with `useState`, looping with `.map()`, responding to clicks with `onClick`, and showing content conditionally. The styling is done entirely in plain CSS, using variables, grid, and media queries to keep the design clean and responsive.
