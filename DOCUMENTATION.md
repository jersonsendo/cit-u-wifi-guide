# CIT-U WiFi Spot Guide: Documentation

## 1. Project Overview

The CIT-U WiFi Spot Guide is a simple website for CIT-U students. It helps them choose a building based on what they need to do, such as studying, coding, group work, or academic work.

This is a front-end school activity. The WiFi information is sample data. The website does not connect to or measure a real WiFi network.

## 2. Tools Used

| Tool | Use |
|---|---|
| React.js | Builds the website using components |
| JavaScript | Handles the logic and clicks |
| Pure CSS | Styles the website (colors, layout, hover effects) |
| Vite | Runs the project on the computer |

No other frameworks, database, backend, or API were used.

## 3. File Structure

```text
cit-u-wifi-guide/
├── src/
│   ├── App.jsx     (all React components)
│   ├── App.css     (all styles)
│   └── main.jsx    (starts the app)
├── index.html
├── package.json
├── README.md
└── DOCUMENTATION.md
```

- **App.jsx** has all the components and logic.
- **App.css** has all the design.
- **main.jsx** shows the App component on the page.

## 4. How to Run the Project

1. Install Node.js from nodejs.org.
2. Open the project folder in a terminal.
3. Run these commands:

```bash
npm install
npm run dev
```

4. Open the link shown in the terminal (usually http://localhost:5173).

## 5. Features

1. Navigation bar with links: Home, WiFi Spots, and About
2. Home section with an **Explore WiFi Spots** button
3. Activity buttons: Study, Code, Group Work, and Academic Work
4. Four building cards with a **Choose Spot** button
5. A simulated WiFi network that can connect and disconnect
6. About section and footer
7. Layout that works on desktop and mobile

## 6. How the Website Works

### 6.1 Components

React builds a page using small parts called **components**. Each part is a function that returns what to show on the screen.

This project has these components:

| Component | Purpose |
|---|---|
| Header | Shows the title and navigation links |
| Home | Shows the main heading and the Explore button |
| Recommendation | Shows the activity buttons and the recommended building |
| WifiSpots | Shows the four building cards |
| WifiNetwork | Shows the sample WiFi network |
| About | Describes the project |
| Footer | Shows the copyright text |

The `App` component puts them all together in order.

### 6.2 useState

`useState` lets a component remember a value. When the value changes, the page updates.

```jsx
const [activity, setActivity] = useState("");
```

- `activity` is the current value.
- `setActivity` changes the value.
- `""` is the starting value (empty).

This project uses `useState` three times:

| State | What it remembers |
|---|---|
| `activity` | The activity button the student clicked |
| `selected` | The building the student chose |
| `status` | If the WiFi is disconnected, connecting, or connected |

### 6.3 Array and .map()

The four buildings are stored in an array:

```jsx
const buildings = [
  { name: "NGE Building", activity: "Coding", signal: "Strong", noise: "Moderate" },
  { name: "RTL Building", activity: "Studying", signal: "Strong", noise: "Quiet" },
  { name: "Academic Building", activity: "Academic Work", signal: "Moderate", noise: "Moderate" },
  { name: "GLE Building", activity: "Group Work", signal: "Strong", noise: "Moderate" },
];
```

The `.map()` function goes through the array and makes one card for each building. This is shorter than writing four cards by hand.

```jsx
{buildings.map((building) => (
  <div className="card" key={building.name}>...</div>
))}
```

The `key` helps React tell each card apart.

### 6.4 Event Handling (onClick)

Every button uses `onClick`. It runs a function when the student clicks the button.

```jsx
<button onClick={() => handleActivity(item)}>{item}</button>
```

### 6.5 Conditional Rendering

Conditional rendering shows something only when a condition is true.

```jsx
{activity && <p>Recommended: {recommendations[activity]}</p>}
```

This means the recommendation appears only after the student clicks an activity.

## 7. Activity Recommendation

Each activity is connected to a building:

```jsx
const recommendations = {
  Study: "RTL Building",
  Code: "NGE Building",
  "Group Work": "GLE Building",
  "Academic Work": "Academic Building",
};
```

When a student clicks an activity button, two things happen:

1. The activity is saved with `setActivity`.
2. The page scrolls to the recommended building card.

```jsx
function handleActivity(item) {
  setActivity(item);
  scrollToSection(getCardId(recommendations[item]));
}
```

## 8. Scrolling

The website uses one helper function to scroll to a section:

```jsx
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
```

It finds the element with the given `id` and scrolls to it smoothly. It is used by:

- The **Explore WiFi Spots** button (goes to the WiFi Spots section)
- The activity buttons (go to the recommended building card)
- The **Choose Spot** buttons (go to the sample WiFi network)

The navigation links use normal `href="#section-id"` links. The CSS rule `scroll-behavior: smooth` makes them scroll smoothly.

Each building card has its own `id`. The helper `getCardId` makes it from the building name. For example, "RTL Building" becomes "rtl-building".

## 9. Choose Spot

When the student clicks **Choose Spot**, the building is saved and the page scrolls to the WiFi network:

```jsx
function handleChooseSpot(name) {
  setSelected(name);
  scrollToSection("wifi-network");
}
```

The message "You selected [Building Name]." is then shown.

## 10. Sample WiFi Network

The network is named **CITU-Student-WiFi**. It is only a simulation. It uses one state called `status` with three values:

```text
disconnected  →  connecting  →  connected
```

How it works:

1. The status starts as "disconnected".
2. Clicking **Connect** changes it to "connecting".
3. After 2 seconds, `setTimeout` changes it to "connected".
4. Clicking **Disconnect** changes it back to "disconnected".

```jsx
function handleConnect() {
  setStatus("connecting");
  setTimeout(() => setStatus("connected"), 2000);
}
```

What the student sees for each status:

| Status | Message | Signal bars | Button |
|---|---|---|---|
| disconnected | Not connected | Gray | Connect |
| connecting | Connecting... | Gray | Connecting... (disabled) |
| connected | Connected | Maroon | Disconnect |

A sample IP address is also shown when connected.

## 11. CSS (App.css)

All styles are in one file.

- **Color variables** are set at the top. Changing them changes the whole design.

```css
:root {
  --maroon: #800000;
  --gold: #f2b705;
}
```

- **Sticky header:** `position: sticky` keeps the header at the top.
- **Responsive cards:** CSS Grid with `repeat(auto-fit, minmax(210px, 1fr))` lets the cards fit any screen size.
- **Hover effects:** `:hover` makes buttons and cards move slightly.
- **Mobile layout:** `@media (max-width: 600px)` adjusts the design for small screens.

## 12. How to Edit the Project

| To change... | Edit this |
|---|---|
| Colors | The `:root` block in `App.css` |
| Building information | The `buildings` array in `App.jsx` |
| Recommended buildings | The `recommendations` object in `App.jsx` |
| WiFi network name | The `<h3>` in the `WifiNetwork` component |

After changing the code, save the files and upload the changes to GitHub:

```bash
git add .
git commit -m "Describe your change"
git push
```

## 13. Conclusion

This project shows the basic ideas of React: components, `useState`, `.map()`, `onClick`, and conditional rendering. It also shows how to build a clean, responsive design using only pure CSS.
