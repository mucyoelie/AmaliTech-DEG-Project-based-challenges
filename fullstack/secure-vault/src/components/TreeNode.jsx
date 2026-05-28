import { getFileIconType } from '../utils.js';
import {
  IconFolder, IconFolderOpen, IconFile, IconPdf, IconDocx, IconXlsx,
  IconImg, IconTxt, IconConfig, IconFont, IconChevron
} from './Icons.jsx';

function FileIcon({ name, size = 16 }) {
  const type = getFileIconType(name);
  const props = { size, className: `tree-icon--${type}` };
  switch (type) {
    case 'pdf':    return <IconPdf {...props} />;
    case 'docx':   return <IconDocx {...props} />;
    case 'xlsx':   return <IconXlsx {...props} />;
    case 'img':
    case 'svg':    return <IconImg {...props} />;
    case 'txt':    return <IconTxt {...props} />;
    case 'yaml':   return <IconConfig {...props} />;
    case 'font':   return <IconFont {...props} />;
    default:       return <IconFile {...props} className="tree-icon--default" />;
  }
}

function renderName(name, searchQuery) {
  if (!searchQuery) return <span className="tree-name">{name}</span>;
  const q = searchQuery.toLowerCase();
  const idx = name.toLowerCase().indexOf(q);
  if (idx === -1) return <span className="tree-name">{name}</span>;
  return (
    <span className="tree-name">
      {name.slice(0, idx)}
      <mark>{name.slice(idx, idx + q.length)}</mark>
      {name.slice(idx + q.length)}
    </span>
  );
}

export function TreeNode({
  node,
  depth = 0,
  expanded,
  selected,
  focused,
  onToggle,
  onSelect,
  searchQuery,
  matchIds,
  flatListRef,
}) {
  const isFolder = node.type === 'folder';
  const isOpen = expanded.has(node.id);
  const isSelected = selected === node.id;
  const isFocused = focused === node.id;

  // during search, keep only matches and their folder chain
  const isSearchActive = searchQuery && searchQuery.trim() !== '';
  if (isSearchActive && matchIds && !matchIds.has(node.id)) {
    if (!isFolder) return null;
    function hasMatchingDescendant(n) {
      if (matchIds.has(n.id)) return true;
      if (n.children) return n.children.some(hasMatchingDescendant);
      return false;
    }
    if (!hasMatchingDescendant(node)) return null;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) onToggle(node.id);
    else onSelect(node.id);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="tree-node" role={isFolder ? 'treeitem' : 'treeitem'} aria-expanded={isFolder ? isOpen : undefined}>
      <button
        className={`tree-row${isSelected ? ' is-selected' : ''}${isFocused ? ' is-focused' : ''}`}
        data-depth={depth}
        data-id={node.id}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isFocused ? 0 : -1}
        aria-selected={isSelected}
        aria-label={node.name}
      >
        {isFolder ? (
          <span className={`tree-chevron${isOpen ? ' is-open' : ''}`}>
            <IconChevron size={10} />
          </span>
        ) : (
          <span className="tree-chevron--placeholder" />
        )}

        <span className="tree-icon">
          {isFolder
            ? (isOpen
                ? <IconFolderOpen size={15} className="tree-icon--folder-open" />
                : <IconFolder size={15} className="tree-icon--folder" />)
            : <FileIcon name={node.name} size={15} />}
        </span>

        {renderName(node.name, isSearchActive ? searchQuery : '')}
      </button>

      {isFolder && isOpen && (
        <div className="tree-children" role="group">
          {node.children && node.children.length > 0
            ? node.children.map(child => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  expanded={expanded}
                  selected={selected}
                  focused={focused}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  searchQuery={searchQuery}
                  matchIds={matchIds}
                  flatListRef={flatListRef}
                />
              ))
            : <div className="tree-empty">empty folder</div>
          }
        </div>
      )}
    </div>
  );
}
