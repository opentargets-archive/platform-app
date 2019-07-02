import React from 'react';
import _ from 'lodash';
import * as d3Dag from 'd3-dag';

const getSubgraph = ({ efoId, nodes, nodesById, upMethod, downMethod }) => {
  // handle up propagation
  const up = (acc, nodeId, depth) => {
    if (upMethod === 'root' || depth <= upMethod) {
      if (!acc[nodeId]) {
        const node = nodesById[nodeId];
        acc[node.id] = {
          ...node,
          nodeType: depth === 0 ? 'chosen' : 'ancestor',
        };
        node.parentIds.forEach(parentId => {
          up(acc, parentId, depth + 1);
        });
      }
    }
    return acc;
  };

  // handle down propagation
  const down = (acc, nodeId, depth) => {
    if (downMethod === 'leaves' || depth <= downMethod) {
      if (!acc[nodeId]) {
        const node = nodesById[nodeId];
        acc[node.id] = {
          ...node,
          nodeType: depth === 0 ? 'chosen' : 'descendant',
        };
        const childIds = nodes
          .filter(d => d.parentIds.indexOf(nodeId) >= 0)
          .map(d => d.id);
        childIds.forEach(childId => {
          down(acc, childId, depth + 1);
        });
      }
    }
    return acc;
  };

  // propagate up and down from start node
  const upGraph = up({}, efoId, 0);
  const downGraph = down({}, efoId, 0);

  // merge
  const unprunedGraph = _.merge(upGraph, downGraph);

  // strip parentIds outside the subgraph
  const prunedGraph = {};
  Object.keys(unprunedGraph).forEach(key => {
    const value = unprunedGraph[key];
    const prunedValue = {
      ...value,
      parentIds: value.parentIds.filter(parentId => unprunedGraph[parentId]),
    };
    prunedGraph[key] = prunedValue;
  });

  return prunedGraph;
};

const Section = ({ efoId, name, data }) => {
  const { nodes } = data;
  const nodesById = nodes.reduce((acc, d) => {
    acc[d.id] = d;
    return acc;
  }, {});
  const upMethod = 'root';
  const downMethod = 1;
  const subgraph = getSubgraph({
    efoId,
    nodes,
    nodesById,
    upMethod,
    downMethod,
  });
  const dag = d3Dag.dratify()(Object.values(subgraph));
  return (
    <React.Fragment>
      TODO: Write a section component for <strong>{name}</strong>.
    </React.Fragment>
  );
};

export default Section;
