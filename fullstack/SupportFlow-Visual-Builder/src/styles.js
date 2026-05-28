export const styles = `
/* base reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-base: #020c18;
  --bg-surface: #0a1628;
  --bg-elevated: #0f1f35;
  --border: #1e2d42;
  --border-bright: #2d4263;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --accent-green: #4ade80;
  --accent-blue: #38bdf8;
  --accent-red: #f87171;
  --accent-amber: #f59e0b;
  --font-mono: 'Space Mono', monospace;
  --font-display: 'Syne', sans-serif;
}

html, body, #root {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--bg-base);
  color: var(--text-primary);
}

/* app shell */
.app-shell {
  display: flex; flex-direction: column;
  width: 100vw; height: 100vh;
  background: var(--bg-base);
  font-family: var(--font-mono);
}

.app-toolbar {
  flex-shrink: 0;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.app-body {
  flex: 1; display: flex; overflow: hidden;
}

.app-canvas {
  flex: 1; position: relative; overflow: hidden;
  background:
    radial-gradient(ellipse at 20% 20%, #0a1e3a 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, #0d1f10 0%, transparent 60%),
    var(--bg-base);
  background-size: 100% 100%;
}

/* grid texture */
.app-canvas::before {
  content: '';
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(circle, #1e2d42 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.5;
}

.app-sidebar {
  width: 280px; flex-shrink: 0;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow-y: auto; overflow-x: hidden;
  z-index: 10;
}

.app-minimap {
  position: fixed;
  bottom: 40px; left: 12px;
  width: 164px; height: 104px;
  background: #020c18ee;
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 4px 20px #000a;
}

.app-statusbar {
  flex-shrink: 0; height: 28px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: flex; align-items: center;
  padding: 0 16px; gap: 8px;
  font-size: 10px; color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
  z-index: 100;
}
.sb-sep { color: var(--border-bright); }

/* toolbar */
.toolbar {
  display: flex; align-items: center;
  height: 52px; padding: 0 16px; gap: 12px;
}

.toolbar-brand {
  display: flex; align-items: center; gap: 8px;
  margin-right: 12px;
}
.toolbar-logo {
  font-size: 20px; color: var(--accent-amber);
  text-shadow: 0 0 12px var(--accent-amber);
}
.toolbar-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: var(--text-primary);
  letter-spacing: -0.5px;
}
.toolbar-subtitle {
  font-size: 9px; color: var(--text-muted);
  letter-spacing: 2px; font-family: var(--font-mono);
  margin-top: 2px;
}

.toolbar-center {
  flex: 1; display: flex; align-items: center; gap: 4px;
}
.toolbar-right {
  display: flex; align-items: center; gap: 8px;
}

.tb-btn {
  height: 30px; padding: 0 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text-secondary);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; display: flex; align-items: center; gap: 5px;
  transition: all 0.15s;
  white-space: nowrap;
}
.tb-btn:hover {
  background: var(--bg-elevated);
  border-color: var(--border-bright);
  color: var(--text-primary);
}
.tb-icon { font-size: 13px; }
.tb-divider {
  width: 1px; height: 20px;
  background: var(--border); margin: 0 4px;
}

.tb-mode-switch {
  display: flex; background: var(--bg-base);
  border: 1px solid var(--border); border-radius: 6px;
  overflow: hidden;
}
.tb-mode-btn {
  padding: 0 16px; height: 32px;
  background: transparent; border: none;
  color: var(--text-muted);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; letter-spacing: 1px;
  transition: all 0.15s;
}
.tb-mode-btn.active {
  background: var(--bg-elevated);
  color: var(--accent-amber);
}
.tb-mode-btn--preview.active { color: var(--accent-green); }
.tb-mode-btn:hover:not(.active) { color: var(--text-secondary); }

/* edit panel */
.edit-panel-inner {
  display: flex; flex-direction: column; gap: 0; padding-bottom: 20px;
}

.ep-header {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border);
}
.ep-type-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  padding: 2px 8px; border-radius: 4px; border: 1px solid;
  font-family: var(--font-mono);
}
.ep-node-id {
  font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);
  margin-right: auto;
}
.ep-delete-btn {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-red);
  width: 26px; height: 26px; cursor: pointer;
  font-size: 11px; line-height: 1;
  transition: all 0.15s;
}
.ep-delete-btn:hover { background: #2d0a0a; border-color: var(--accent-red); }

.ep-section {
  padding: 14px 16px 0;
}
.ep-label {
  display: block;
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  color: var(--text-muted); margin-bottom: 8px;
  font-family: var(--font-mono);
}
.ep-textarea, .ep-input, .ep-select {
  width: 100%;
  background: var(--bg-base); border: 1px solid var(--border);
  border-radius: 5px; color: var(--text-primary);
  font-family: var(--font-mono); font-size: 11px;
  padding: 8px 10px; resize: vertical;
  transition: border-color 0.15s;
  outline: none;
}
.ep-textarea:focus, .ep-input:focus, .ep-select:focus {
  border-color: var(--accent-blue);
}
.ep-select { appearance: none; padding-right: 8px; cursor: pointer; }

.ep-option-row {
  margin-bottom: 10px; padding: 10px;
  background: var(--bg-base); border: 1px solid var(--border);
  border-radius: 6px;
}
.ep-rm-option {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-red);
  width: 28px; height: 28px; flex-shrink: 0;
  cursor: pointer; font-size: 10px; transition: all 0.15s;
}
.ep-rm-option:hover { background: #2d0a0a; }

.ep-add-option {
  background: transparent; border: 1px solid var(--border);
  border-radius: 4px; color: var(--accent-green);
  padding: 3px 10px; font-size: 10px;
  font-family: var(--font-mono); cursor: pointer;
  transition: all 0.15s;
}
.ep-add-option:hover { background: #052e16; border-color: var(--accent-green); }

/* canvas */
.canvas-world {
  position: absolute; top: 0; left: 0;
}

/* node cards */
.node-card { transition: box-shadow 0.2s, border-color 0.2s, transform 0.1s; }
.node-card:hover { z-index: 5 !important; transform: translateY(-1px); }

/* preview mode */
.preview-container {
  width: 100%; max-width: 540px;
  height: calc(100vh - 80px);
  display: flex; flex-direction: column;
  border: 1px solid var(--border-bright);
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: 0 24px 80px #000c;
  margin: 0 auto;
}

.preview-header {
  padding: 14px 20px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.preview-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}
.preview-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
.preview-status { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }

.preview-messages {
  flex: 1; overflow-y: auto; padding: 20px 16px;
  display: flex; flex-direction: column; gap: 14px;
  scroll-behavior: smooth;
}
.preview-messages::-webkit-scrollbar { width: 4px; }
.preview-messages::-webkit-scrollbar-track { background: transparent; }
.preview-messages::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 2px; }

.preview-bot-msg {
  display: flex; gap: 10px; align-items: flex-start;
}
.preview-bot-msg--latest .preview-bubble {
  animation: bubble-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes bubble-in {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to { opacity: 1; transform: none; }
}
.preview-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bg-elevated); border: 1px solid var(--border-bright);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.preview-bubble {
  background: var(--bg-elevated);
  border: 1px solid var(--border-bright);
  border-radius: 4px 14px 14px 14px;
  padding: 12px 16px;
  font-size: 13px; line-height: 1.6; color: var(--text-primary);
  font-family: var(--font-mono);
  max-width: 400px;
}

.preview-user-msg {
  display: flex; justify-content: flex-end;
}
.preview-user-bubble {
  background: #0c2340;
  border: 1px solid #1e3a5f;
  border-radius: 14px 4px 14px 14px;
  padding: 10px 16px;
  font-size: 12px; color: var(--accent-blue);
  font-family: var(--font-mono);
  animation: bubble-in 0.25s ease both;
}

.preview-actions {
  padding: 16px 20px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

.preview-choices {
  display: flex; flex-direction: column; gap: 8px;
}
.preview-choice-btn {
  width: 100%; padding: 12px 16px;
  background: var(--bg-base); border: 1px solid var(--border-bright);
  border-radius: 8px; color: var(--text-primary);
  font-size: 12px; font-family: var(--font-mono);
  cursor: pointer; text-align: left;
  transition: all 0.15s;
}
.preview-choice-btn:hover {
  background: #0c2340; border-color: var(--accent-blue);
  color: var(--accent-blue); transform: translateX(4px);
}

.preview-end-state {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 8px 0;
}
.preview-end-icon {
  width: 40px; height: 40px; border-radius: 50%;
  background: #052e16; border: 1px solid var(--accent-green);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent-green); font-size: 18px;
}
.preview-end-text { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }
.preview-restart-btn {
  padding: 10px 28px;
  background: transparent; border: 1px solid var(--border-bright);
  border-radius: 6px; color: var(--text-secondary);
  font-size: 11px; font-family: var(--font-mono);
  cursor: pointer; letter-spacing: 1px;
  transition: all 0.15s;
}
.preview-restart-btn:hover {
  background: var(--bg-elevated);
  color: var(--accent-amber); border-color: var(--accent-amber);
}

/* sidebar scrollbar */
.app-sidebar::-webkit-scrollbar { width: 4px; }
.app-sidebar::-webkit-scrollbar-track { background: transparent; }
.app-sidebar::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 2px; }

/* responsive tweaks */
@media (max-width: 1280px) {
  .app-sidebar {
    width: 250px;
  }

  .toolbar {
    gap: 8px;
    padding: 0 12px;
  }

  .tb-btn {
    padding: 0 10px;
  }

  .preview-container {
    max-width: 500px;
  }
}

@media (max-width: 1024px) {
  html, body, #root {
    overflow: auto;
  }

  .app-shell {
    min-height: 100vh;
    height: auto;
  }

  .app-body {
    flex-direction: column;
    min-height: calc(100vh - 80px);
  }

  .app-canvas {
    min-height: 56vh;
  }

  .app-sidebar {
    width: 100%;
    max-height: 40vh;
    border-left: none;
    border-top: 1px solid var(--border);
  }

  .app-minimap {
    width: 144px;
    height: 92px;
    bottom: 36px;
    left: 10px;
  }

  .toolbar {
    height: auto;
    min-height: 52px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-wrap: wrap;
  }

  .toolbar-center {
    order: 3;
    width: 100%;
    flex-wrap: wrap;
  }

  .app-statusbar {
    flex-wrap: wrap;
    height: auto;
    min-height: 28px;
    padding-top: 4px;
    padding-bottom: 4px;
    row-gap: 2px;
  }
}

@media (max-width: 640px) {
  .toolbar {
    padding-left: 10px;
    padding-right: 10px;
    gap: 6px;
  }

  .toolbar-brand {
    margin-right: 4px;
  }

  .toolbar-title {
    font-size: 14px;
  }

  .toolbar-subtitle {
    font-size: 8px;
    letter-spacing: 1.4px;
  }

  .tb-btn {
    height: 28px;
    padding: 0 8px;
    font-size: 10px;
  }

  .tb-mode-btn {
    padding: 0 12px;
    height: 30px;
    font-size: 10px;
  }

  .preview-container {
    max-width: 100%;
    height: calc(100vh - 110px);
    border-radius: 10px;
  }

  .preview-header,
  .preview-actions {
    padding-left: 12px;
    padding-right: 12px;
  }

  .preview-messages {
    padding: 14px 12px;
  }

  .preview-bubble {
    max-width: calc(100vw - 110px);
    font-size: 12px;
  }

  .app-minimap {
    display: none;
  }
}
`;
