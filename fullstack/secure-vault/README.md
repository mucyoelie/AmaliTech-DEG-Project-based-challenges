# SecureVault Explorer

> A high-performance, keyboard-accessible file explorer built for enterprise cloud security environments. Dark-mode cyber aesthetic. Zero component library dependencies.

**Live demo:** [https://secure-vault20.netlify.app/](https://secure-vault20.netlify.app/)

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The app will be available at `http://localhost:5173`.

---

## Design File

> Figma design file: _[Link to your Figma file — set to "Anyone with the link can view"]_

The design system defined in the Figma includes:

| Token | Values |
|---|---|
| **Typography** | Syne (display/UI), Share Tech Mono (data/labels) |
| **Color Palette** | Void black `#050508`, Cyan accent `#00e5ff`, Amber folders `#ffb300`, Green `#00ff88` |
| **Spacing Grid** | 4px base unit — `sp-1` through `sp-12` |
| **Component States** | Default, Hover, Focused, Selected, Disabled (empty folder) |

---

## Recursive Strategy

The file tree is powered by a single recursive `<TreeNode />` component. It receives:

- `node` — the current item (folder or file)
- `depth` — incremented at each level, drives CSS `data-depth` for indentation
- `expanded` — a `Set<string>` of open folder IDs, owned by the top-level App
- `onToggle` / `onSelect` — callbacks hoisted to App state

On render, each `TreeNode` checks whether it's a folder and whether its ID exists in the `expanded` set. If open, it maps over `node.children` and renders another `<TreeNode>` for each — this recurse naturally handles any depth (2 levels or 200).

```
<TreeNode depth=0>           // root folder
  <TreeNode depth=1>         // subfolder
    <TreeNode depth=2>       // deeper subfolder
      <TreeNode depth=3 />   // file
    </TreeNode>
  </TreeNode>
</TreeNode>
```

The `buildNodeMap()` utility creates a flat `id → node` lookup in a single pass, so properties panel lookups are O(1).

---

## Wildcard Feature: Folder Grid View (Center Pane)

**The gap identified:** The spec only required a sidebar tree — but a list of filenames alone doesn't help users understand context or navigate efficiently. Law firms deal with hundreds of files; a tree alone forces users to mentally map the structure.

**What was built:** A dual-view system — the left sidebar shows the hierarchical tree, while the center pane renders a **folder grid view** that mirrors macOS Finder / Windows Explorer. Clicking a folder in the tree shows its direct children as cards in the center pane. Clicking a file card selects it and populates the properties panel.

**Business value:**
1. **Reduced cognitive load** — the grid shows filenames, icons, and sizes at a glance
2. **Context awareness** — users always see the folder they're inside, not just the selected file
3. **Dual navigation modes** — power users use the keyboard + tree; casual users use the grid. Both paths lead to the same state.

---

## Keyboard Navigation (Story 3)

All keyboard interactions are handled via a global `keydown` listener that operates on a `flatList` — a memoized array of currently-visible tree nodes built by `flattenVisible()`.

| Key | Action |
|---|---|
| `↑` / `↓` | Move focus between visible items |
| `→` | Expand focused folder |
| `←` | Collapse focused folder (or jump to parent) |
| `Enter` | Select file / toggle folder |
| `/` | Focus the search input |

---

## Search & Filter (Bonus Story 5)

The search bar filters the tree in real-time using `searchTree()`, which does a depth-first walk and returns two sets:

- `matchIds` — nodes whose names contain the query
- `expandIds` — ancestor folders that need to be force-expanded to reveal matches

These are merged with the user's manual `expanded` state, so previously opened folders stay open and matching results are always visible regardless of depth.

---

## Tech Stack

- **React 18** — component model and hooks
- **Vite** — build tool
- **Vanilla CSS** — custom design system, no component libraries
- **Zero runtime dependencies** beyond React
