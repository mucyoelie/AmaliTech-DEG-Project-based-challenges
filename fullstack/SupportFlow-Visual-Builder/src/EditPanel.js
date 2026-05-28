export function renderEditPanel(node, state, container) {
  container.innerHTML = '';

  if (!node) {
    container.innerHTML = `
      <div style="padding:32px 20px;text-align:center;color:#334155">
        <div style="font-size:28px;margin-bottom:12px">✦</div>
        <div style="font-size:11px;letter-spacing:2px;font-family:'Space Mono',monospace;color:#475569">SELECT A NODE<br>TO EDIT</div>
      </div>`;
    return;
  }

  const TYPE_COLORS = { start: '#4ade80', question: '#38bdf8', end: '#f87171' };
  const accent = TYPE_COLORS[node.type] || '#38bdf8';

  const allNodes = state.getSnapshot().nodes;

  container.innerHTML = `
    <div class="edit-panel-inner">
      <div class="ep-header">
        <span class="ep-type-badge" style="color:${accent};border-color:${accent}22;background:${accent}11">${node.type.toUpperCase()}</span>
        <span class="ep-node-id">#${node.id}</span>
        <button class="ep-delete-btn" data-id="${node.id}" title="Delete node">✕</button>
      </div>

      <div class="ep-section">
        <label class="ep-label">NODE TEXT</label>
        <textarea class="ep-textarea" id="ep-text" rows="4">${node.text}</textarea>
      </div>

      <div class="ep-section">
        <label class="ep-label">NODE TYPE</label>
        <select class="ep-select" id="ep-type">
          <option value="start" ${node.type === 'start' ? 'selected' : ''}>Start</option>
          <option value="question" ${node.type === 'question' ? 'selected' : ''}>Question</option>
          <option value="end" ${node.type === 'end' ? 'selected' : ''}>End</option>
        </select>
      </div>

      <div class="ep-section">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <label class="ep-label" style="margin:0">OPTIONS</label>
          ${node.type !== 'end' ? `<button class="ep-add-option" data-id="${node.id}">+ Add</button>` : ''}
        </div>
        <div id="ep-options-list">
          ${node.options.map((opt, i) => `
            <div class="ep-option-row" data-index="${i}">
              <div style="display:flex;gap:6px;margin-bottom:4px">
                <input class="ep-input ep-opt-label" data-index="${i}" placeholder="Option label" value="${escapeAttr(opt.label)}" />
                <button class="ep-rm-option" data-index="${i}" title="Remove">✕</button>
              </div>
              <select class="ep-select ep-opt-target" data-index="${i}" style="font-size:10px">
                <option value="">— no target —</option>
                ${allNodes.filter(n => n.id !== node.id).map(n =>
                  `<option value="${n.id}" ${opt.nextId === n.id ? 'selected' : ''}>${n.id}: ${truncate(n.text, 28)}</option>`
                ).join('')}
              </select>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const textarea = container.querySelector('#ep-text');
  textarea.addEventListener('input', () => {
    state.updateNodeText(node.id, textarea.value);
  });

  container.querySelector('#ep-type').addEventListener('change', (e) => {
    const n = state.getNode(node.id);
    if (n) { n.type = e.target.value; state._emit(); }
  });

  container.querySelectorAll('.ep-opt-label').forEach(input => {
    input.addEventListener('input', () => {
      state.updateOptionLabel(node.id, parseInt(input.dataset.index), input.value);
    });
  });

  container.querySelectorAll('.ep-opt-target').forEach(sel => {
    sel.addEventListener('change', () => {
      state.setOptionTarget(node.id, parseInt(sel.dataset.index), sel.value);
    });
  });

  container.querySelectorAll('.ep-rm-option').forEach(btn => {
    btn.addEventListener('click', () => {
      state.removeOption(node.id, parseInt(btn.dataset.index));
    });
  });

  const addBtn = container.querySelector('.ep-add-option');
  if (addBtn) {
    addBtn.addEventListener('click', () => state.addOption(node.id));
  }

  container.querySelector('.ep-delete-btn').addEventListener('click', () => {
    if (confirm('Delete this node?')) state.deleteNode(node.id);
  });
}

function truncate(str, n) { return str.length > n ? str.slice(0, n) + '…' : str; }
function escapeAttr(str) { return (str || '').replace(/"/g, '&quot;'); }
