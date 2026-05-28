export class StateManager {
  constructor(initialData) {
    this._nodes = initialData.nodes.map(n => ({ ...n, position: { ...n.position }, options: n.options.map(o => ({ ...o })) }));
    this._meta = { ...initialData.meta };
    this._mode = 'editor';
    this._selectedNodeId = null;
    this._previewNodeId = null;
    this._previewHistory = [];
    this._listeners = [];
    this._dragging = null;
    this._pan = { x: 0, y: 0 };
    this._zoom = 1;
    this._highlightPath = new Set();
  }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }

  _emit() {
    this._listeners.forEach(fn => fn(this.getSnapshot()));
  }

  getSnapshot() {
    return {
      nodes: this._nodes,
      meta: this._meta,
      mode: this._mode,
      selectedNodeId: this._selectedNodeId,
      previewNodeId: this._previewNodeId,
      previewHistory: [...this._previewHistory],
      pan: { ...this._pan },
      zoom: this._zoom,
      highlightPath: new Set(this._highlightPath),
    };
  }

  getNode(id) { return this._nodes.find(n => n.id === id); }
  getStartNode() { return this._nodes.find(n => n.type === 'start'); }

  setMode(mode) {
    this._mode = mode;
    if (mode === 'preview') {
      const start = this.getStartNode();
      this._previewNodeId = start ? start.id : null;
      this._previewHistory = start ? [start.id] : [];
      this._highlightPath = new Set(this._previewHistory);
      this._selectedNodeId = null;
    } else {
      this._previewNodeId = null;
      this._previewHistory = [];
      this._highlightPath = new Set();
    }
    this._emit();
  }

  selectNode(id) {
    this._selectedNodeId = id;
    this._emit();
  }

  updateNodeText(id, text) {
    const node = this._nodes.find(n => n.id === id);
    if (node) { node.text = text; this._emit(); }
  }

  updateOptionLabel(nodeId, optionIndex, label) {
    const node = this._nodes.find(n => n.id === nodeId);
    if (node && node.options[optionIndex]) {
      node.options[optionIndex].label = label;
      this._emit();
    }
  }

  addNode(type = 'question') {
    const newId = String(Date.now());
    this._nodes.push({
      id: newId,
      type,
      text: 'New node — click to edit',
      position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 200 },
      options: type !== 'end' ? [{ label: 'Option 1', nextId: null }] : [],
    });
    this._selectedNodeId = newId;
    this._emit();
  }

  deleteNode(id) {
    this._nodes = this._nodes.filter(n => n.id !== id);
    this._nodes.forEach(n => {
      n.options = n.options.filter(o => o.nextId !== id);
    });
    if (this._selectedNodeId === id) this._selectedNodeId = null;
    this._emit();
  }

  addOption(nodeId) {
    const node = this._nodes.find(n => n.id === nodeId);
    if (node) {
      node.options.push({ label: 'New Option', nextId: null });
      this._emit();
    }
  }

  removeOption(nodeId, index) {
    const node = this._nodes.find(n => n.id === nodeId);
    if (node) {
      node.options.splice(index, 1);
      this._emit();
    }
  }

  setOptionTarget(nodeId, optionIndex, targetId) {
    const node = this._nodes.find(n => n.id === nodeId);
    if (node && node.options[optionIndex] !== undefined) {
      node.options[optionIndex].nextId = targetId || null;
      this._emit();
    }
  }

  setNodePosition(id, x, y) {
    const node = this._nodes.find(n => n.id === id);
    if (node) { node.position.x = x; node.position.y = y; this._emit(); }
  }

  previewChoose(nextId) {
    const node = this._nodes.find(n => n.id === nextId);
    if (node) {
      this._previewNodeId = nextId;
      this._previewHistory.push(nextId);
      this._highlightPath = new Set(this._previewHistory);
      this._emit();
    }
  }

  previewRestart() {
    const start = this.getStartNode();
    this._previewNodeId = start ? start.id : null;
    this._previewHistory = start ? [start.id] : [];
    this._highlightPath = new Set(this._previewHistory);
    this._emit();
  }

  setPan(x, y) { this._pan = { x, y }; this._emit(); }
  setZoom(z) { this._zoom = Math.max(0.3, Math.min(2, z)); this._emit(); }

  exportJSON() {
    return JSON.stringify({ meta: this._meta, nodes: this._nodes }, null, 2);
  }

  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (data.nodes && Array.isArray(data.nodes)) {
        this._nodes = data.nodes;
        this._meta = data.meta || this._meta;
        this._selectedNodeId = null;
        this._emit();
        return true;
      }
    } catch { }
    return false;
  }
}
