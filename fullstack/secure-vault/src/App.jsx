import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import fileData from './data.json';
import { flattenVisible, buildNodeMap, searchTree } from './utils.js';
import { TreeNode } from './components/TreeNode.jsx';
import { PropertiesPanel } from './components/PropertiesPanel.jsx';
import { IconShield, IconSearch, IconX, IconFolder, IconFolderOpen, IconFile } from './components/Icons.jsx';
import { getFileIconType } from './utils.js';

// cached lookup for selected/focused items
const NODE_MAP = buildNodeMap(fileData);

function findPath(nodes, targetId, path = []) {
  for (const node of nodes) {
    const newPath = [...path, node];
    if (node.id === targetId) return newPath;
    if (node.children?.length) {
      const found = findPath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
}

function findParent(nodes, targetId, parent = null) {
  for (const node of nodes) {
    if (node.id === targetId) return parent;
    if (node.children?.length) {
      const found = findParent(node.children, targetId, node);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

export default function App() {
  const [expanded, setExpanded] = useState(new Set());
  const [selectedId, setSelectedId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const treeRef = useRef(null);
  const searchRef = useRef(null);

  const { matchIds, expandIds } = useMemo(() => {
    return searchTree(fileData, searchQuery);
  }, [searchQuery]);

  const effectiveExpanded = useMemo(() => {
    if (!searchQuery.trim()) return expanded;
    const merged = new Set([...expanded, ...expandIds]);
    return merged;
  }, [expanded, expandIds, searchQuery]);

  const flatList = useMemo(() => {
    return flattenVisible(fileData, effectiveExpanded);
  }, [effectiveExpanded]);

  const toggleFolder = useCallback((id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setFocusedId(id);
  }, []);

  const selectNode = useCallback((id) => {
    setSelectedId(id);
    setFocusedId(id);
  }, []);

  const selectedNode = selectedId ? NODE_MAP[selectedId] : null;

  const breadcrumb = useMemo(() => {
    if (!selectedId) return [];
    return findPath(fileData, selectedId) || [];
  }, [selectedId]);

  useEffect(() => {
    const handler = (e) => {
      const focusedIndex = flatList.findIndex(n => n.id === focusedId);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = flatList[focusedIndex + 1];
        if (next) setFocusedId(next.id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = flatList[focusedIndex - 1];
        if (prev) setFocusedId(prev.id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const current = flatList[focusedIndex];
        if (current?.type === 'folder' && !effectiveExpanded.has(current.id)) {
          setExpanded(prev => new Set([...prev, current.id]));
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const current = flatList[focusedIndex];
        if (!current) return;
        if (current.type === 'folder' && effectiveExpanded.has(current.id)) {
          setExpanded(prev => { const n = new Set(prev); n.delete(current.id); return n; });
        } else {
          const parent = findParent(fileData, current.id);
          if (parent) setFocusedId(parent.id);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (focusedId) {
          const node = NODE_MAP[focusedId];
          if (node?.type === 'folder') toggleFolder(focusedId);
          else selectNode(focusedId);
        }
      } else if (e.key === '/' && e.target !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [flatList, focusedId, effectiveExpanded, toggleFolder, selectNode]);

  useEffect(() => {
    if (focusedId && treeRef.current) {
      const el = treeRef.current.querySelector(`[data-id="${focusedId}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedId]);

  useEffect(() => {
    if (!focusedId && fileData.length > 0) {
      setFocusedId(fileData[0].id);
    }
  }, []);

  const searchActive = searchQuery.trim() !== '';
  const matchCount = searchActive ? matchIds.size : 0;

  return (
    <div className="app">
      <div className="scanline" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar__brand">
          <div className="topbar__logo">
            <IconShield size={26} style={{ color: 'var(--clr-accent-cyan)' }} />
          </div>
          <div className="topbar__name">Secure<span>Vault</span></div>
        </div>
        <div className="topbar__meta">FILE_EXPLORER // v2.1.0</div>
        <div className="topbar__status">
          <span className="topbar__status-dot" />
          VAULT SECURED
        </div>
      </header>

      <div className="workspace">

        <nav
          className="sidebar"
          role="tree"
          aria-label="File Explorer"
          tabIndex={0}
          onFocus={() => {
            if (!focusedId && flatList.length > 0) setFocusedId(flatList[0].id);
          }}
        >
          <div className="sidebar__header">
            <div className="sidebar__label">// vault explorer</div>
            <div className="search-wrap">
              <span className="search-icon"><IconSearch size={13} /></span>
              <input
                ref={searchRef}
                className="search-input"
                type="text"
                placeholder="Search files… ( / )"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search files"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                  aria-label="Clear search"
                >
                  <IconX size={9} />
                </button>
              )}
            </div>
            {searchActive && (
              <div className="search-count">
                {matchCount === 0 ? 'no matches' : `${matchCount} match${matchCount !== 1 ? 'es' : ''}`}
              </div>
            )}
          </div>

          <div className="tree-pane" ref={treeRef}>
            {fileData.map(node => (
              <TreeNode
                key={node.id}
                node={node}
                depth={0}
                expanded={effectiveExpanded}
                selected={selectedId}
                focused={focusedId}
                onToggle={toggleFolder}
                onSelect={selectNode}
                searchQuery={searchQuery}
                matchIds={searchActive ? matchIds : null}
              />
            ))}
          </div>
        </nav>

        <main className="main-pane">
          <div className="main-header">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <button
                className="breadcrumb__item"
                onClick={() => { setSelectedId(null); setFocusedId(fileData[0]?.id); }}
              >
                VAULT
              </button>
              {breadcrumb.map((node, i) => (
                <span key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="breadcrumb__sep">/</span>
                  <button
                    className={`breadcrumb__item${i === breadcrumb.length - 1 ? ' is-current' : ''}`}
                    onClick={() => {
                      if (i < breadcrumb.length - 1) {
                        if (node.type === 'folder') {
                          toggleFolder(node.id);
                          setFocusedId(node.id);
                        }
                      }
                    }}
                  >
                    {node.name}
                  </button>
                </span>
              ))}
            </nav>
          </div>

          <div className="main-content">
            <FolderContentsView
              selectedNode={selectedNode}
              expanded={effectiveExpanded}
              selectedId={selectedId}
              onToggle={toggleFolder}
              onSelect={selectNode}
            />
          </div>
        </main>

        <PropertiesPanel node={selectedNode} />
      </div>
    </div>
  );
}

function FolderContentsView({ selectedNode, expanded, selectedId, onToggle, onSelect }) {
  let items = [];
  let title = 'ROOT VAULT';

  if (selectedNode?.type === 'folder') {
    items = selectedNode.children || [];
    title = selectedNode.name;
  } else if (selectedNode?.type === 'file') {
    const parent = findParentNode(fileData, selectedNode.id);
    if (parent) {
      items = parent.children || [];
      title = parent.name;
    } else {
      items = fileData;
    }
  } else {
    items = fileData;
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">
          <IconFolder size={48} style={{ color: 'var(--clr-text-muted)', opacity: 0.3 }} />
        </span>
        <div className="empty-state__title">Empty Folder</div>
        <div className="empty-state__sub">No files or folders inside.</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--sp-4)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--clr-text-muted)', letterSpacing: '0.1em' }}>
        {items.length} item{items.length !== 1 ? 's' : ''}
      </div>
      <div className="folder-grid">
        {items.map(item => (
          <FolderCard
            key={item.id}
            node={item}
            isSelected={selectedId === item.id}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function FolderCard({ node, isSelected, onToggle, onSelect }) {
  const isFolder = node.type === 'folder';
  const ext = isFolder ? null : node.name.split('.').pop().toUpperCase();

  const handleClick = () => {
    if (isFolder) onToggle(node.id);
    else onSelect(node.id);
  };

  const iconColors = {
    PDF: '#ff6b6b', DOCX: '#5b9cf6', XLSX: 'var(--clr-accent-green)',
    PNG: '#c77dff', SVG: '#c77dff', TXT: 'var(--clr-text-secondary)',
    YAML: 'var(--clr-accent-amber)', YML: 'var(--clr-accent-amber)',
    TTF: '#ff9a9e',
  };

  const iconColor = isFolder ? 'var(--clr-accent-amber)' : (iconColors[ext] || 'var(--clr-text-muted)');

  return (
    <button
      className={`folder-card${isSelected ? ' is-selected' : ''}`}
      onClick={handleClick}
      title={node.name}
    >
      <div className="folder-card__icon" style={{ color: iconColor }}>
        {isFolder
          ? <IconFolder size={28} />
          : <IconFile size={28} />}
      </div>
      <div className="folder-card__name">{node.name}</div>
      <div className="folder-card__meta">
        {isFolder
          ? `${(node.children || []).length} items`
          : node.size || '—'}
      </div>
    </button>
  );
}

function findParentNode(nodes, targetId, parent = null) {
  for (const node of nodes) {
    if (node.id === targetId) return parent;
    if (node.children?.length) {
      const found = findParentNode(node.children, targetId, node);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}
