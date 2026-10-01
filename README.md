# CIT-U WiFi Spot Guide

A small React.js + pure CSS website that helps CIT-U students choose a building based on what they need to do (study, code, or group work). It includes a simulated WiFi network card.

All WiFi information is **sample data** for a school activity. Nothing connects to or measures a real network.

## How to run the project

You need [Node.js](https://nodejs.org) (LTS version) installed.

```bash
git clone https://github.com/YOUR-USERNAME/cit-u-wifi-guide.git
cd cit-u-wifi-guide
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## What to check

- Navigation links and the **Explore WiFi Spots** button scroll to their sections
- **Study / Code / Group Work / Academic Work** buttons show a recommended building and scroll to its card
- **Choose Spot** shows "You selected [Building Name]." and scrolls to the WiFi network card
- The WiFi card goes Not connected, Connecting..., Connected, and back with Disconnect

## Built with

React.js, JavaScript, pure CSS, Vite

See `DOCUMENTATION.md` for a full explanation of how the code works.
