# SupportFlow Visual Builder

A visual decision tree editor for building and testing customer support conversation flows — no spreadsheets required.

![Editor Mode](https://via.placeholder.com/900x480/020c18/4ade80?text=SupportFlow+Visual+Builder)

---

## Overview

SupportFlow Visual Builder lets support teams design, edit, and test automated chatbot conversation flows through a live flowchart interface. Nodes represent questions or endpoints; connections represent the paths a customer can take. Everything is editable in real-time, and a built-in Preview Mode lets you simulate the bot experience instantly.

---

## Features

### ✦ Visual Flow Editor
- Nodes rendered on an infinite canvas with drag-to-reposition
- SVG bezier connectors automatically drawn between parent and child nodes
- Three node types with distinct visual semantics: **Start**, **Question**, **End**
- Pan (drag canvas background) and zoom (mouse wheel) navigation

### ✦ Live Edit Panel
- Click any node to open its edit panel in the right sidebar
- Edit node text, type, option labels, and connection targets instantly
- Add or remove answer options per node
- Delete nodes (connections cleaned up automatically)

### ✦ Preview / Bot Simulator
- Toggle to **Preview Mode** to simulate the full chat experience
- Renders a chat-style UI showing bot messages and user choices
- Full conversation history with animated message bubbles
- Restart button when a leaf (End) node is reached

### ✦ Mini-Map *(Wildcard Feature)*
- A persistent thumbnail in the bottom-left shows the full canvas layout
- Viewport indicator (amber dashed rectangle) shows exactly where you are
- Updates in real-time as you pan, zoom, and add/move nodes

### ✦ Export / Import
- Export the current flow as `flow_data.json` at any time
- Import a saved JSON file to restore or switch flows

---

## Wildcard Feature: Mini-Map

**Why this feature?**

As conversation flows grow beyond a handful of nodes, navigating the canvas becomes disorienting — users lose track of where they are relative to the whole graph. The mini-map solves this by giving a persistent bird's-eye view of the entire flow with a live viewport indicator.

**Business value:** Support managers building complex flows (10+ nodes, multiple branches) can navigate confidently without accidentally working on the wrong section of the tree. It removes a key friction point that would otherwise force users to constantly zoom out, re-orient, and zoom back in.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vanilla JS (ES Modules) |
| Build tool | Vite |
| Styling | Custom CSS (no component libraries) |
| Graph rendering | Custom SVG — no react-flow, jsPlumb, or mermaid |
| Fonts | Syne (display) + Space Mono (body) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
supportflow-visual-builder/
├── index.html
├── flow_data.json          # Initial conversation data
├── vite.config.js
└── src/
    ├── main.js             # Entry point
    ├── App.js              # Root orchestrator
    ├── StateManager.js     # In-memory state (nodes, mode, selection)
    ├── Canvas.js           # Drag, pan, zoom, node rendering
    ├── NodeCard.js         # Individual node card DOM elements
    ├── connectors.js       # SVG bezier curve drawing
    ├── EditPanel.js        # Right sidebar editor
    ├── PreviewMode.js      # Chat simulator UI
    ├── Toolbar.js          # Top toolbar with mode toggle
    ├── MiniMap.js          # Canvas overview thumbnail
    └── styles.js           # All CSS as a JS string (injected at runtime)
```

---

## Design System

### Color Semantics

| Token | Value | Usage |
|---|---|---|
| `--accent-green` | `#4ade80` | Start nodes, active connections |
| `--accent-blue` | `#38bdf8` | Question nodes, user interaction |
| `--accent-red` | `#f87171` | End nodes |
| `--accent-amber` | `#f59e0b` | Preview path highlight, brand |
| `--bg-base` | `#020c18` | Canvas background |
| `--bg-surface` | `#0a1628` | Toolbar, sidebar |
| `--bg-elevated` | `#0f1f35` | Cards, panels |

### Node Types

- **Start** — Green accent. Exactly one per flow. Entry point of the conversation.
- **Question** — Blue accent. Has one or more options leading to child nodes.
- **End** — Red accent. Leaf node. No outgoing connections. Terminates a conversation path.

---

## License

[CC0 1.0 Universal](./LICENSE) — Public Domain
