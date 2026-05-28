export function getExtension(name) {
  const parts = name.split('.');
  if (parts.length < 2) return '';
  return parts[parts.length - 1].toLowerCase();
}

export function getFileIconType(name) {
  const ext = getExtension(name);
  switch (ext) {
    case 'pdf':  return 'pdf';
    case 'docx':
    case 'doc':  return 'docx';
    case 'xlsx':
    case 'xls':  return 'xlsx';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp': return 'img';
    case 'svg':  return 'svg';
    case 'txt':  return 'txt';
    case 'yaml':
    case 'yml':  return 'yaml';
    case 'ttf':
    case 'otf':
    case 'woff':
    case 'woff2':return 'font';
    default:     return 'default';
  }
}

// used by keyboard navigation in the tree
export function flattenVisible(nodes, expandedSet, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ id: node.id, type: node.type, depth });
    if (node.type === 'folder' && expandedSet.has(node.id) && node.children?.length > 0) {
      result.push(...flattenVisible(node.children, expandedSet, depth + 1));
    }
  }
  return result;
}

export function buildNodeMap(nodes, map = {}) {
  for (const node of nodes) {
    map[node.id] = node;
    if (node.children?.length) buildNodeMap(node.children, map);
  }
  return map;
}

// search results + folders that should auto-expand
export function searchTree(nodes, query) {
  const q = query.toLowerCase().trim();
  if (!q) return { matchIds: new Set(), expandIds: new Set() };

  const matchIds = new Set();
  const expandIds = new Set();

  function walk(nodes, ancestorIds) {
    for (const node of nodes) {
      const path = [...ancestorIds, node.id];
      const nameMatches = node.name.toLowerCase().includes(q);

      if (nameMatches) {
        matchIds.add(node.id);
        ancestorIds.forEach(id => expandIds.add(id));
      }

      if (node.type === 'folder' && node.children?.length) {
        walk(node.children, path);
      }
    }
  }

  walk(nodes, []);
  return { matchIds, expandIds };
}

export function highlightText(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    text.slice(0, idx) +
    '|||MARK_START|||' +
    text.slice(idx, idx + query.length) +
    '|||MARK_END|||' +
    text.slice(idx + query.length)
  );
}

export function formatSize(size) {
  return size || '—';
}

export function getFilePath(nodeMap, nodeId) {
  // walk down until we hit the target id
  function findPath(nodes, targetId, path = []) {
    for (const node of nodes) {
      const newPath = [...path, node.name];
      if (node.id === targetId) return newPath;
      if (node.children?.length) {
        const found = findPath(node.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }
  return findPath;
}
