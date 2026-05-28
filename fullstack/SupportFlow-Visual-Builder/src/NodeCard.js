import { NODE_WIDTH } from './connectors.js';

const TYPE_CONFIG = {
  start: { label: 'START', accent: '#4ade80', bg: '#052e16', border: '#166534' },
  question: { label: 'QUESTION', accent: '#38bdf8', bg: '#0c1a2e', border: '#1e3a5f' },
  end: { label: 'END', accent: '#f87171', bg: '#2d0a0a', border: '#7f1d1d' },
};

export function createNodeCard({ node, isSelected, isPreviewActive, onSelect, onDragStart, state }) {
  const cfg = TYPE_CONFIG[node.type] || TYPE_CONFIG.question;

  const card = document.createElement('div');
  card.className = `node-card node-${node.type}${isSelected ? ' selected' : ''}${isPreviewActive ? ' preview-active' : ''}`;
  card.dataset.nodeId = node.id;
  card.style.cssText = `
    position: absolute;
    left: ${node.position.x}px;
    top: ${node.position.y}px;
    width: ${NODE_WIDTH}px;
    background: ${cfg.bg};
    border: 1.5px solid ${isSelected ? cfg.accent : isPreviewActive ? '#f59e0b' : cfg.border};
    border-radius: 10px;
    box-shadow: ${isSelected ? `0 0 0 2px ${cfg.accent}44, 0 8px 32px #00000080` : isPreviewActive ? '0 0 0 2px #f59e0b44, 0 8px 32px #00000080' : '0 4px 16px #00000060'};
    cursor: pointer;
    user-select: none;
    z-index: ${isSelected ? 10 : 2};
    transition: box-shadow 0.2s, border-color 0.2s;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
  `;

  const badge = document.createElement('div');
  badge.style.cssText = `
    background: ${cfg.accent}22;
    border-bottom: 1px solid ${cfg.border};
    padding: 5px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  badge.innerHTML = `
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${cfg.accent};box-shadow:0 0 6px ${cfg.accent}"></span>
    <span style="font-size:9px;font-weight:700;letter-spacing:2px;color:${cfg.accent};font-family:'Space Mono',monospace">${cfg.label}</span>
    <span style="margin-left:auto;font-size:9px;color:#475569;font-family:'Space Mono',monospace">#${node.id}</span>
  `;
  card.appendChild(badge);

  const body = document.createElement('div');
  body.style.cssText = `padding: 12px; font-size: 12px; color: #e2e8f0; line-height: 1.5; min-height: 44px;`;
  body.textContent = node.text;
  card.appendChild(body);

  if (node.options.length > 0) {
    const optWrap = document.createElement('div');
    optWrap.style.cssText = `padding: 0 12px 10px; display:flex; flex-direction:column; gap:4px;`;
    node.options.forEach((opt, i) => {
      const chip = document.createElement('div');
      chip.style.cssText = `
        font-size:10px; color:#94a3b8; padding:3px 8px;
        border:1px solid #1e293b; border-radius:4px;
        background:#0f172a; white-space:nowrap; overflow:hidden;
        text-overflow:ellipsis; font-family:'Space Mono',monospace;
      `;
      chip.textContent = `→ ${opt.label || '(unlabeled)'}`;
      optWrap.appendChild(chip);
    });
    card.appendChild(optWrap);
  } else {
    const noOpt = document.createElement('div');
    noOpt.style.cssText = `padding:4px 12px 10px; font-size:10px; color:#475569; font-family:'Space Mono',monospace;`;
    noOpt.textContent = '⊘ leaf node';
    card.appendChild(noOpt);
  }

  // drag starts from header or card body
  badge.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    onDragStart(e, node.id);
  });

  card.addEventListener('mousedown', (e) => {
    onDragStart(e, node.id);
  });

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    onSelect(node.id);
  });

  return card;
}
