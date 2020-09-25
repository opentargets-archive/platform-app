import React from 'react';

import TreeItem from './TreeItem';
import { hasSomeChildrenChecke } from './utils';

function TreeLevel({ levelId, aggs, onSelectionChange }) {
  const handleSelectionChange = newSelection => {
    onSelectionChange([levelId, ...newSelection]);
  };

  return aggs.map(agg => (
    <TreeItem
      key={agg.nodeId}
      nodeId={agg.nodeId}
      label={agg.label}
      count={agg.count}
      checked={agg.checked}
      indeterminate={hasSomeChildrenChecke(agg)}
      onClick={handleSelectionChange}
    >
      {agg.aggs && (
        <TreeLevel
          levelId={agg.nodeId}
          aggs={agg.aggs}
          onSelectionChange={handleSelectionChange}
        />
      )}
    </TreeItem>
  ));
}

export default TreeLevel;
