import { createNodeCard } from './NodeCard.js';
import { renderConnectors } from './connectors.js';

export class Canvas {
  constructor(container, state) {
    this.container = container;
    this.state = state;
    this._drag = null;
    this._isPanning = false;
    this._panStart = null;
    this._initContainer();
  }

  _initContainer() {
    this.container.style.cssText = `
      position:relative; width:100%; height:100%;
      overflow:hidden; cursor:default;
    `;

    this.worldEl = document.createElement('div');
    this.worldEl.className = 'canvas-world';
    this.worldEl.style.cssText = `
      position:absolute; top:0; left:0;
      transform-origin: 0 0;
      width: 1600px; height: 1200px;
    `;
    this.container.appendChild(this.worldEl);

    
    this.container.addEventListener('mousedown', (e) => {
      if (e.target === this.container || e.target === this.worldEl) {
        this._isPanning = true;
        const snap = this.state.getSnapshot();
        this._panStart = { mx: e.clientX, my: e.clientY, px: snap.pan.x, py: snap.pan.y };
        e.preventDefault();
      }
    });

    window.addEventListener('mousemove', (e) => this._onMouseMove(e));
    window.addEventListener('mouseup', (e) => this._onMouseUp(e));

    
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const snap = this.state.getSnapshot();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      this.state.setZoom(snap.zoom + delta);
    }, { passive: false });

  
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container || e.target === this.worldEl) {
        this.state.selectNode(null);
      }
    });
  }

  _onMouseMove(e) {
    const snap = this.state.getSnapshot();

    if (this._isPanning && this._panStart) {
      const dx = e.clientX - this._panStart.mx;
      const dy = e.clientY - this._panStart.my;
      this.state.setPan(this._panStart.px + dx, this._panStart.py + dy);
      return;
    }

    if (this._drag) {
      const dx = (e.clientX - this._drag.startX) / snap.zoom;
      const dy = (e.clientY - this._drag.startY) / snap.zoom;
      const nx = this._drag.origX + dx;
      const ny = this._drag.origY + dy;
      this.state.setNodePosition(this._drag.nodeId, Math.max(0, nx), Math.max(0, ny));
    }
  }

  _onMouseUp() {
    this._drag = null;
    this._isPanning = false;
    this._panStart = null;
  }

  _startDrag(e, nodeId) {
    const snap = this.state.getSnapshot();
    const node = snap.nodes.find(n => n.id === nodeId);
    if (!node) return;
    this._drag = {
      nodeId,
      startX: e.clientX,
      startY: e.clientY,
      origX: node.position.x,
      origY: node.position.y,
    };
    e.preventDefault();
  }

  render(snap) {
    this.worldEl.innerHTML = '';


    this.worldEl.style.transform = `translate(${snap.pan.x}px, ${snap.pan.y}px) scale(${snap.zoom})`;

  
    const svg = renderConnectors(snap.nodes, snap.highlightPath, snap.pan, snap.zoom);
    this.worldEl.appendChild(svg);

    
    snap.nodes.forEach(node => {
      const isSelected = snap.selectedNodeId === node.id;
      const isPreviewActive = snap.highlightPath.has(node.id);

      const card = createNodeCard({
        node,
        isSelected,
        isPreviewActive,
        state: this.state,
        onSelect: (id) => this.state.selectNode(id),
        onDragStart: (e, id) => this._startDrag(e, id),
      });

      this.worldEl.appendChild(card);
    });
  }
}
