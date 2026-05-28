import { getFileIconType, formatSize } from '../utils.js';
import {
  IconPdf, IconDocx, IconXlsx, IconImg, IconTxt, IconConfig,
  IconFont, IconFile, IconFolder, IconLock
} from './Icons.jsx';

function BigIcon({ node }) {
  if (node.type === 'folder') {
    return <IconFolder size={48} className="tree-icon--folder" />;
  }
  const type = getFileIconType(node.name);
  const props = { size: 48, className: `tree-icon--${type}` };
  switch (type) {
    case 'pdf':   return <IconPdf {...props} />;
    case 'docx':  return <IconDocx {...props} />;
    case 'xlsx':  return <IconXlsx {...props} />;
    case 'img':
    case 'svg':   return <IconImg {...props} />;
    case 'txt':   return <IconTxt {...props} />;
    case 'yaml':  return <IconConfig {...props} />;
    case 'font':  return <IconFont {...props} />;
    default:      return <IconFile {...props} className="tree-icon--default" />;
  }
}

function getTypeLabelAndColor(node) {
  if (node.type === 'folder') return { label: 'FOLDER', color: 'var(--clr-accent-amber)' };
  const ext = node.name.split('.').pop().toUpperCase();
  const colors = {
    PDF: '#ff6b6b', DOCX: '#5b9cf6', DOC: '#5b9cf6',
    XLSX: 'var(--clr-accent-green)', XLS: 'var(--clr-accent-green)',
    PNG: '#c77dff', JPG: '#c77dff', SVG: '#c77dff',
    TXT: 'var(--clr-text-secondary)',
    YAML: 'var(--clr-accent-amber)', YML: 'var(--clr-accent-amber)',
    TTF: '#ff9a9e',
  };
  return { label: ext, color: colors[ext] || 'var(--clr-text-muted)' };
}

// simple fake date so metadata looks stable
function mockDate(id) {
  const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const year = 2022 + (seed % 3);
  const month = String(1 + (seed % 12)).padStart(2, '0');
  const day = String(1 + (seed % 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function PropertiesPanel({ node }) {
  if (!node) {
    return (
      <aside className="properties-panel">
        <div className="panel-header">
          <div className="panel-header__label">// properties</div>
        </div>
        <div className="panel-body">
          <div className="panel-empty">
            <span className="panel-empty__icon">
              <IconLock size={32} />
            </span>
            <p className="panel-empty__text">
              Select a file to<br/>inspect its metadata.
            </p>
          </div>

          <div className="shortcuts-section">
            <div className="shortcuts-title">// keyboard nav</div>
            {[
              [['↑', '↓'], 'Navigate'],
              [['→'], 'Expand folder'],
              [['←'], 'Collapse folder'],
              [['Enter'], 'Select file'],
            ].map(([keys, desc]) => (
              <div className="shortcut-row" key={desc}>
                <span className="shortcut-row__desc">{desc}</span>
                <span style={{ display: 'flex', gap: '4px' }}>
                  {keys.map(k => <kbd className="kbd" key={k}>{k}</kbd>)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  const { label, color } = getTypeLabelAndColor(node);
  const created = mockDate(node.id);
  const childCount = node.type === 'folder' && node.children
    ? `${node.children.length} item${node.children.length !== 1 ? 's' : ''}`
    : null;

  return (
    <aside className="properties-panel">
      <div className="panel-header">
        <div className="panel-header__label">// properties</div>
      </div>
      <div className="panel-body">
        <div className="prop-preview">
          <div className="prop-preview__icon">
            <BigIcon node={node} />
          </div>
          <div className="prop-preview__badge" style={{ color, borderColor: color + '55' }}>
            {label}
          </div>
        </div>

        <div className="prop-group">
          <div className="prop-group__title">// metadata</div>

          <div className="prop-row">
            <div className="prop-row__key">name</div>
            <div className="prop-row__val highlight">{node.name}</div>
          </div>

          <div className="prop-row">
            <div className="prop-row__key">type</div>
            <div className="prop-row__val">{node.type === 'folder' ? 'Folder' : 'File'}</div>
          </div>

          {node.size && (
            <div className="prop-row">
              <div className="prop-row__key">size</div>
              <div className="prop-row__val">{formatSize(node.size)}</div>
            </div>
          )}

          {childCount !== null && (
            <div className="prop-row">
              <div className="prop-row__key">contents</div>
              <div className="prop-row__val">{childCount}</div>
            </div>
          )}

          <div className="prop-row">
            <div className="prop-row__key">created</div>
            <div className="prop-row__val">{created}</div>
          </div>

          <div className="prop-row">
            <div className="prop-row__key">id</div>
            <div className="prop-row__val" style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-xs)' }}>
              {node.id}
            </div>
          </div>
        </div>

        <div className="prop-group">
          <div className="prop-group__title">// access control</div>
          <div className="prop-row">
            <div className="prop-row__key">encryption</div>
            <div className="prop-row__val" style={{ color: 'var(--clr-accent-green)' }}>AES-256</div>
          </div>
          <div className="prop-row">
            <div className="prop-row__key">access level</div>
            <div className="prop-row__val">Authorized</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
