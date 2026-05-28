export function renderToolbar(state, container) {
  const snap = state.getSnapshot();
  const isPreview = snap.mode === 'preview';

  container.innerHTML = `
    <div class="toolbar">
      <div class="toolbar-brand">
        <span class="toolbar-logo">◈</span>
        <span class="toolbar-title">SupportFlow</span>
        <span class="toolbar-subtitle">Visual Builder</span>
      </div>

      <div class="toolbar-center">
        ${!isPreview ? `
          <button class="tb-btn tb-btn--ghost" id="tb-add-start" title="Add Start node">
            <span class="tb-icon">⊕</span> Start
          </button>
          <button class="tb-btn tb-btn--ghost" id="tb-add-q" title="Add Question node">
            <span class="tb-icon">⊕</span> Question
          </button>
          <button class="tb-btn tb-btn--ghost" id="tb-add-end" title="Add End node">
            <span class="tb-icon">⊕</span> End
          </button>
          <div class="tb-divider"></div>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-in" title="Zoom in">⊕</button>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-out" title="Zoom out">⊖</button>
          <button class="tb-btn tb-btn--ghost" id="tb-zoom-reset" title="Reset view">⊡</button>
          <div class="tb-divider"></div>
          <button class="tb-btn tb-btn--ghost" id="tb-export" title="Export JSON">↓ Export</button>
          <button class="tb-btn tb-btn--ghost" id="tb-import" title="Import JSON">↑ Import</button>
          <input type="file" id="tb-import-file" accept=".json" style="display:none">
        ` : ''}
      </div>

      <div class="toolbar-right">
        <div class="tb-mode-switch">
          <button class="tb-mode-btn ${!isPreview ? 'active' : ''}" id="tb-editor-mode">
            ✦ Editor
          </button>
          <button class="tb-mode-btn tb-mode-btn--preview ${isPreview ? 'active' : ''}" id="tb-preview-mode">
            ▶ Preview
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#tb-editor-mode')?.addEventListener('click', () => state.setMode('editor'));
  container.querySelector('#tb-preview-mode')?.addEventListener('click', () => state.setMode('preview'));

  if (!isPreview) {
    container.querySelector('#tb-add-start')?.addEventListener('click', () => state.addNode('start'));
    container.querySelector('#tb-add-q')?.addEventListener('click', () => state.addNode('question'));
    container.querySelector('#tb-add-end')?.addEventListener('click', () => state.addNode('end'));

    container.querySelector('#tb-zoom-in')?.addEventListener('click', () => state.setZoom(snap.zoom + 0.15));
    container.querySelector('#tb-zoom-out')?.addEventListener('click', () => state.setZoom(snap.zoom - 0.15));
    container.querySelector('#tb-zoom-reset')?.addEventListener('click', () => { state.setZoom(1); state.setPan(0, 0); });

    container.querySelector('#tb-export')?.addEventListener('click', () => {
      const json = state.exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'flow_data.json'; a.click();
      URL.revokeObjectURL(url);
    });

    const importBtn = container.querySelector('#tb-import');
    const importFile = container.querySelector('#tb-import-file');
    importBtn?.addEventListener('click', () => importFile?.click());
    importFile?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const ok = state.importJSON(ev.target.result);
        if (!ok) alert('Invalid JSON file.');
        importFile.value = '';
      };
      reader.readAsText(file);
    });
  }
}
