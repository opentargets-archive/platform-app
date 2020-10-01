import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import Facet from './Facet';
import {
  getFilters,
  hassAllChildrenChecked,
  prepareFacetData,
  updateFacetCounts,
  setAllChildren,
  traverse,
} from './utils';

function Facets({ loading, data, onChange }) {
  const [facets, setFacets] = useState([]);

  useEffect(
    () => {
      if (!data) return;

      if (!facets.length) {
        setFacets(prepareFacetData(data));
      } else {
        setFacets(facets => updateFacetCounts(facets, data));
      }
    },
    [data, facets.length]
  );

  const handleFilterChange = changePath => {
    const newFacets = [...facets];

    const [node, parent] = traverse(newFacets, changePath);
    const newValue = !node.checked;

    node.checked = newValue;
    if (!newValue) parent.checked = false;
    if (hassAllChildrenChecked(parent)) parent.checked = true;
    setAllChildren(node, newValue);

    const filters = getFilters(newFacets);

    onChange(filters);
  };

  return (
    <>
      <h4>Filter by</h4>

      {loading && !facets.length ? (
        <Skeleton variant="rect" height={48} />
      ) : (
        facets.map(facet => (
          <Facet
            key={facet.nodeId}
            treeId={facet.nodeId}
            label={facet.label}
            aggs={facet.aggs}
            onSelectionChange={handleFilterChange}
          />
        ))
      )}
    </>
  );
}

export default Facets;
