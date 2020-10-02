export const fixLabel = label => {
  const spacedLabel = label
    .replace(/_/g, ' ')
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z])/g, ' $1');

  return `${spacedLabel.charAt(0).toUpperCase()}${spacedLabel.slice(1)}`;
};

const extractLevel = level =>
  level?.map(agg => ({
    nodeId: agg.key || agg.name,
    label: fixLabel(agg.key || agg.name),
    count: agg.uniques,
    checked: false,
    aggs: extractLevel(agg.aggs || agg.rows),
    root: !!agg.name,
  }));

export const prepareFacetData = data => extractLevel(data) || [];

const updateLevel = (facets, data = []) => {
  facets.forEach(facet => {
    const newFacet = data.find(
      newFacet => facet.nodeId === (newFacet.key || newFacet.name)
    );
    const newCount = newFacet?.uniques || 0;
    facet.count = newCount;

    if (facet.aggs) updateLevel(facet.aggs, newFacet?.aggs || newFacet?.rows);
  });

  return facets;
};

export const updateFacetCounts = (facets, data) =>
  updateLevel([...facets], data);

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
    setAllChildren(branch, value);
  });

export const hasAllChildrenChecked = level =>
  level.aggs?.every(agg => agg.checked);

export const hasSomeChildrenChecked = level =>
  level.aggs?.some(agg => agg.checked) && !hasAllChildrenChecked(level);

export const hasAnyDescendantChecked = aggs =>
  aggs?.some(agg => agg.checked || hasAnyDescendantChecked(agg.aggs));

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
