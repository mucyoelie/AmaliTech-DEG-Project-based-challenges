import { StateManager } from './StateManager.js';
import { Canvas } from './Canvas.js';
import { renderEditPanel } from './EditPanel.js';
import { renderPreview } from './PreviewMode.js';
import { renderToolbar } from './Toolbar.js';
import { renderMiniMap } from './MiniMap.js';
import { styles } from './styles.js';

export class App {
  constructor(root, flowData) {
    this.root = root;
    this.state = new StateManager(flowData);
  }

  mount() {
    
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    this._buildLayout();

    
    this.state.subscribe((snap) => this._render(snap));

    
    this._render(this.state.getSnapshot());
  }

  _buildLayout() {
    this.root.innerHTML = `
      <div class="app-shell">
        <div class="app-toolbar" id="app-toolbar"></div>
        <div class="app-body">
          <div class="app-canvas" id="app-canvas"></div>
          <div class="app-sidebar" id="app-sidebar"></div>
        </div>
        <div class="app-minimap" id="app-minimap"></div>
        <div class="app-statusbar" id="app-statusbar"></div>
      </div>
    `;

    this.toolbarEl = this.root.querySelector('#app-toolbar');
    this.canvasEl = this.root.querySelector('#app-canvas');
    this.sidebarEl = this.root.querySelector('#app-sidebar');
    this.minimapEl = this.root.querySelector('#app-minimap');
    this.statusEl = this.root.querySelector('#app-statusbar');

    this.canvas = new Canvas(this.canvasEl, this.state);
  }

  _render(snap) {
  
    renderToolbar(this.state, this.toolbarEl);

    if (snap.mode === 'editor') {
      this.canvasEl.style.display = 'block';
      this.sidebarEl.style.display = 'flex';
      this.minimapEl.style.display = 'block';

    
      this.canvas.render(snap);

      
      const selectedNode = snap.selectedNodeId
        ? snap.nodes.find(n => n.id === snap.selectedNodeId)
        : null;
      renderEditPanel(selectedNode, this.state, this.sidebarEl);

    
      renderMiniMap(snap.nodes, snap.pan, snap.zoom, this.minimapEl);

    
      this.statusEl.innerHTML = `
        <span>${snap.nodes.length} nodes</span>
        <span class="sb-sep">·</span>
        <span>Zoom ${Math.round(snap.zoom * 100)}%</span>
        <span class="sb-sep">·</span>
        <span>${snap.selectedNodeId ? `Selected #${snap.selectedNodeId}` : 'No selection'}</span>
        <span class="sb-sep">·</span>
        <span style="color:#475569">Drag to move nodes · Scroll to zoom · Space-drag to pan</span>
      `;
    } else {
      
      this.canvasEl.style.display = 'none';
      this.sidebarEl.style.display = 'none';
      this.minimapEl.style.display = 'none';

      
      this.canvasEl.style.display = 'flex';
      this.canvasEl.style.alignItems = 'center';
      this.canvasEl.style.justifyContent = 'center';
      renderPreview(this.state, this.canvasEl);

      this.statusEl.innerHTML = `
        <span style="color:#f59e0b">▶ Preview Mode</span>
        <span class="sb-sep">·</span>
        <span>Step ${snap.previewHistory.length} of conversation</span>
      `;
    }
  }
}
