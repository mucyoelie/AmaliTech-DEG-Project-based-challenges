export function renderPreview(state, container) {
  const snap = state.getSnapshot();
  const node = state.getNode(snap.previewNodeId);
  const isEnd = node && (node.type === 'end' || node.options.length === 0);

  container.innerHTML = `
    <div class="preview-container">
      <div class="preview-header">
        <div class="preview-brand">
          <span class="preview-dot"></span>
          <span>SupportFlow Bot</span>
        </div>
        <div class="preview-status">${isEnd ? '✓ Resolved' : '● Live'}</div>
      </div>

      <div class="preview-messages" id="preview-messages">
        ${snap.previewHistory.map((id, idx) => {
          const n = state.getNode(id);
          if (!n) return '';
          const isLast = idx === snap.previewHistory.length - 1;
          const isCurrent = id === snap.previewNodeId;

          // show the option user clicked before this bot message
          let chosenLabel = '';
          if (idx > 0) {
            const prevNode = state.getNode(snap.previewHistory[idx - 1]);
            if (prevNode) {
              const opt = prevNode.options.find(o => o.nextId === id);
              if (opt) chosenLabel = opt.label;
            }
          }

          return `
            ${chosenLabel ? `<div class="preview-user-msg"><span class="preview-user-bubble">${chosenLabel}</span></div>` : ''}
            <div class="preview-bot-msg ${isLast ? 'preview-bot-msg--latest' : ''}">
              <div class="preview-avatar">🤖</div>
              <div class="preview-bubble">${n.text}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="preview-actions">
        ${!isEnd && node ? `
          <div class="preview-choices">
            ${node.options.map((opt, i) => `
              <button class="preview-choice-btn" data-next="${opt.nextId || ''}" data-index="${i}">
                ${opt.label}
              </button>
            `).join('')}
          </div>
        ` : isEnd ? `
          <div class="preview-end-state">
            <div class="preview-end-icon">✓</div>
            <div class="preview-end-text">Conversation complete</div>
            <button class="preview-restart-btn" id="preview-restart">↺ Restart</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  const msgs = container.querySelector('#preview-messages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;

  container.querySelectorAll('.preview-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextId = btn.dataset.next;
      if (nextId) state.previewChoose(nextId);
    });
  });

  const restartBtn = container.querySelector('#preview-restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => state.previewRestart());
  }
}
