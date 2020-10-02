import React, { useEffect, useState } from 'react';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import Facet from './Facet';
import {
  getFilters,
  hasAllChildrenChecked,
  hasAnyDescendantChecked,
  prepareFacetData,
  updateFacetCounts,
  setAllChildren,
  traverse,
} from './utils';

const useStyles = makeStyles({
  facetSummary: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function Facets({ loading, data, onChange }) {
  const [facets, setFacets] = useState([]);
  const classes = useStyles();

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

  const handleFilterChange = (changePath, value) => {
    const newFacets = [...facets];

    const [node, parent] = traverse(newFacets, changePath);
    const newValue = value ?? !node.checked;

    node.checked = newValue;
    if (!newValue && parent) parent.checked = false;
    if (parent && hasAllChildrenChecked(parent)) parent.checked = true;
    setAllChildren(node, newValue);

    const filters = getFilters(newFacets);

    onChange(filters);
  };

  const handleClickClear = () => {
    const newFacets = [...facets];

    newFacets.forEach(facet => {
      setAllChildren(facet, false);
    });

    const filters = getFilters(newFacets);

    onChange(filters);
  };

  return (
    <>
      <Box className={classes.facetSummary}>
        <h3>Filter by</h3>
        {hasAnyDescendantChecked(facets) && (
          <IconButton onClick={handleClickClear}>
            <Clear />
          </IconButton>
        )}
      </Box>

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
