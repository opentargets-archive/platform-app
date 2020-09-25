import React, { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from '@apollo/client';

import { client3 } from '../../client';
import { dataAccessor, getQuery } from './queries';
import Facet from './Facet';
import {
  getFilters,
  getIdFromEntity,
  hassAllChildrenChecked,
  setAllChildren,
  traverse,
} from './utils';

function Facets({ entity, id, onChange }) {
  const client = client3;
  const query = getQuery(entity);
  const variables = { [getIdFromEntity(entity)]: id };
  const { loading, error, data } = useQuery(query, { variables, client });
  const facetsData = useMemo(() => dataAccessor(data, entity), [data, entity]);
  const [facets, setFacets] = useState([]);

  useEffect(
    () => {
      setFacets(facetsData);
    },
    [facetsData]
  );

  const handleFilterChange = changePath => {
    const newFacets = [...facets];

    const [node, parent] = traverse(newFacets, changePath);
    const newValue = !node.checked;

    node.checked = newValue;
    if (!newValue) parent.checked = false;
    if (hassAllChildrenChecked(parent)) parent.checked = true;
    setAllChildren(node, newValue);
    setFacets(newFacets);

    const filters = getFilters(newFacets);

    onChange(filters);
    console.log('filters', filters);
  };

  if (error) return null;

  return (
    <>
      <h4>Filter by</h4>

      {loading ? (
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
