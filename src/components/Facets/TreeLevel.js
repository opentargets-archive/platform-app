import React from 'react';

import TreeItem from './TreeItem';
import { hasSomeChildrenChecked } from './utils';

function TreeLevel({ loading, levelId, aggs, onSelectionChange }) {
  const handleSelectionChange = newSelection => {
    onSelectionChange([levelId, ...newSelection]);
  };

  return aggs.map(agg => (
    <TreeItem
      key={agg.nodeId}
      loading={loading}
      nodeId={agg.nodeId}
      label={agg.label}
      count={agg.count}
      checked={agg.checked}
      indeterminate={hasSomeChildrenChecked(agg)}
      onClick={handleSelectionChange}
      isPrivate={agg.isPrivate}
    >
      {agg.aggs && agg.aggs.length > 0 && (
        <TreeLevel
          loading={loading}
          levelId={agg.nodeId}
          aggs={agg.aggs}
          onSelectionChange={handleSelectionChange}
        />
      )}
    </TreeItem>
  ));
}

export default TreeLevel;
