# CIT-U WiFi Spot Guide

A small React.js + pure CSS website that helps CIT-U students pick a building based on what they need to do.
All WiFi info is **sample data** for a school activity.

## Setup

```bash
npm create vite@latest cit-u-wifi-guide -- --template react
cd cit-u-wifi-guide
npm install
```

Replace `src/App.jsx`, `src/App.css`, and `src/main.jsx` with the files in this project
(and delete `src/index.css` if Vite created one), then run:

```bash
npm run dev
```

## Concepts demonstrated
- Components: Header, Home, Recommendation, WifiSpots, About, Footer
- `useState()` for the selected activity and selected building
- `.map()` to render the building cards
- `onClick` event handling
- Conditional rendering of the recommendation and selection message
