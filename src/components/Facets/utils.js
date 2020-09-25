export const getIdFromEntity = entity =>
  ({
    disease: 'efoId',
    drug: 'chemblId',
    target: 'ensemblId',
  }[entity]);

export const fixLabel = caption => {
  const spacedCaption = caption
    .replace(/_/g, ' ')
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z])/g, ' $1');

  return `${spacedCaption.charAt(0).toUpperCase()}${spacedCaption.slice(1)}`;
};

// Facet tree tools
export const traverse = (tree, path, parent) => {
  const step = path.shift();
  const nextTree = tree.find(branch => branch.nodeId === step);

  if (path.length === 0) return [nextTree, parent];

  return traverse(nextTree.aggs, path, nextTree);
};

export const setAllChildren = (tree, value) =>
  tree?.aggs?.forEach(branch => {
    branch.checked = value;
    setAllChildren(branch.aggs, value);
  });

export const hassAllChildrenChecked = level =>
  level.aggs?.every(agg => agg.checked);

export const hasSomeChildrenChecke = level =>
  level.aggs?.some(agg => agg.checked) && !hassAllChildrenChecked(level);

const dfs = (tree, path = [], pathList = []) => {
  tree.forEach(branch => {
    const branchPath = [...path, branch.nodeId];

    if (branch.checked) {
      pathList.push(branchPath);
    } else if (branch.aggs) {
      dfs(branch.aggs, branchPath, pathList);
    }
  });

  return pathList;
};

export const getFilters = facets =>
  dfs(facets).map(filter => {
    const [name, ...path] = filter;

    return { name, path };
  });
