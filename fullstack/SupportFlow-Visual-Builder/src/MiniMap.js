import { NODE_WIDTH } from './connectors.js';

const MM_W = 160;
const MM_H = 100;
const PADDING = 20;

export function renderMiniMap(nodes, pan, zoom, container) {
  container.innerHTML = '';

  if (!nodes.length) return;

  // fit the whole flow into the minimap
  const xs = nodes.map(n => n.position.x);
  const ys = nodes.map(n => n.position.y);
  const minX = Math.min(...xs) - PADDING;
  const minY = Math.min(...ys) - PADDING;
  const maxX = Math.max(...xs) + NODE_WIDTH + PADDING;
  const maxY = Math.max(...ys) + 120 + PADDING;

  const worldW = maxX - minX;
  const worldH = maxY - minY;
  const scaleX = MM_W / worldW;
  const scaleY = MM_H / worldH;
  const mmScale = Math.min(scaleX, scaleY);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', MM_W);
  svg.setAttribute('height', MM_H);
  svg.style.cssText = 'display:block;';

  const bg = document.createElementNS(svgNS, 'rect');
  bg.setAttribute('width', MM_W);
  bg.setAttribute('height', MM_H);
  bg.setAttribute('fill', '#020c18');
  svg.appendChild(bg);

  const TYPE_COLORS = { start: '#4ade80', question: '#38bdf8', end: '#f87171' };

  nodes.forEach(n => {
    const nx = (n.position.x - minX) * mmScale;
    const ny = (n.position.y - minY) * mmScale;
    const nw = NODE_WIDTH * mmScale;
    const nh = 70 * mmScale;

    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', nx);
    rect.setAttribute('y', ny);
    rect.setAttribute('width', Math.max(nw, 4));
    rect.setAttribute('height', Math.max(nh, 3));
    rect.setAttribute('rx', 2);
    rect.setAttribute('fill', (TYPE_COLORS[n.type] || '#38bdf8') + '33');
    rect.setAttribute('stroke', TYPE_COLORS[n.type] || '#38bdf8');
    rect.setAttribute('stroke-width', '0.5');
    svg.appendChild(rect);
  });

  const vpX = (-pan.x / zoom - minX) * mmScale;
  const vpY = (-pan.y / zoom - minY) * mmScale;
  const vpW = (400 / zoom) * mmScale;
  const vpH = (300 / zoom) * mmScale;

  const vp = document.createElementNS(svgNS, 'rect');
  vp.setAttribute('x', vpX);
  vp.setAttribute('y', vpY);
  vp.setAttribute('width', Math.max(vpW, 10));
  vp.setAttribute('height', Math.max(vpH, 10));
  vp.setAttribute('fill', 'none');
  vp.setAttribute('stroke', '#f59e0b');
  vp.setAttribute('stroke-width', '1');
  vp.setAttribute('stroke-dasharray', '3,2');
  svg.appendChild(vp);

  container.appendChild(svg);
}
