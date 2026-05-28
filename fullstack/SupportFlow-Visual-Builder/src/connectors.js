

export const NODE_WIDTH = 220;
export const NODE_HEIGHT_BASE = 100;

export function getNodeBottom(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEIGHT_BASE,
  };
}

export function getNodeTop(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y,
  };
}

export function buildConnectorPath(x1, y1, x2, y2) {
  const dy = Math.abs(y2 - y1);
  const cp = Math.max(60, dy * 0.5);
  return `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`;
}

export function renderConnectors(nodes, highlightPath, pan, zoom) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'connector-svg');
  svg.style.cssText = `
    position:absolute; top:0; left:0; width:100%; height:100%;
    pointer-events:none; overflow:visible; z-index:1;
  `;

  const defs = document.createElementNS(svgNS, 'defs');
  const marker = createMarker(svgNS, 'arrow', '#4ade80');
  const markerDim = createMarker(svgNS, 'arrow-dim', '#334155');
  const markerActive = createMarker(svgNS, 'arrow-active', '#f59e0b');
  defs.appendChild(marker);
  defs.appendChild(markerDim);
  defs.appendChild(markerActive);
  svg.appendChild(defs);

  nodes.forEach(node => {
    node.options.forEach((opt, idx) => {
      if (!opt.nextId) return;
      const target = nodes.find(n => n.id === opt.nextId);
      if (!target) return;

      const from = getNodeBottom(node);
      const to = getNodeTop(target);
      const path = buildConnectorPath(from.x, from.y, to.x, to.y);

      const isActive = highlightPath.has(node.id) && highlightPath.has(target.id);

      if (isActive) {
        const glow = document.createElementNS(svgNS, 'path');
        glow.setAttribute('d', path);
        glow.setAttribute('stroke', '#f59e0b');
        glow.setAttribute('stroke-width', '6');
        glow.setAttribute('fill', 'none');
        glow.setAttribute('opacity', '0.2');
        svg.appendChild(glow);
      }

      const line = document.createElementNS(svgNS, 'path');
      line.setAttribute('d', path);
      line.setAttribute('stroke', isActive ? '#f59e0b' : '#334155');
      line.setAttribute('stroke-width', isActive ? '2.5' : '1.5');
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke-dasharray', node.type === 'start' ? 'none' : 'none');
      line.setAttribute('marker-end', isActive ? 'url(#arrow-active)' : 'url(#arrow-dim)');
      line.setAttribute('class', 'connector-line');
      svg.appendChild(line);

      if (opt.label) {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const bg = document.createElementNS(svgNS, 'rect');
        const labelW = Math.min(opt.label.length * 7 + 16, 140);
        bg.setAttribute('x', midX - labelW / 2);
        bg.setAttribute('y', midY - 12);
        bg.setAttribute('width', labelW);
        bg.setAttribute('height', 22);
        bg.setAttribute('rx', '4');
        bg.setAttribute('fill', isActive ? '#422006' : '#0f172a');
        bg.setAttribute('stroke', isActive ? '#f59e0b' : '#1e293b');
        bg.setAttribute('stroke-width', '1');
        svg.appendChild(bg);

        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY + 4);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', isActive ? '#fbbf24' : '#64748b');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-family', 'Space Mono, monospace');
        text.textContent = opt.label.length > 16 ? opt.label.slice(0, 14) + '…' : opt.label;
        svg.appendChild(text);
      }
    });
  });

  return svg;
}

function createMarker(svgNS, id, color) {
  const marker = document.createElementNS(svgNS, 'marker');
  marker.setAttribute('id', id);
  marker.setAttribute('markerWidth', '8');
  marker.setAttribute('markerHeight', '8');
  marker.setAttribute('refX', '6');
  marker.setAttribute('refY', '3');
  marker.setAttribute('orient', 'auto');
  const poly = document.createElementNS(svgNS, 'polygon');
  poly.setAttribute('points', '0 0, 6 3, 0 6');
  poly.setAttribute('fill', color);
  marker.appendChild(poly);
  return marker;
}
