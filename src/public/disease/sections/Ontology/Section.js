import React from 'react';
import _ from 'lodash';

import OntologySubgraph from './custom/OntologySubgraph';

const getSubgraph = ({
  efoId,
  nodes,
  therapeuticAreas,
  nodesById,
  upMethod,
  downMethod,
}) => {
  // handle up propagation
  const up = (acc, nodeId, depth) => {
    if (upMethod === 'root' || depth <= upMethod) {
      if (!acc[nodeId]) {
        const node = nodesById[nodeId];
        acc[node.id] = {
          ...node,
          isTherapeuticArea: therapeuticAreas.indexOf(node.id) >= 0,
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
          isTherapeuticArea: therapeuticAreas.indexOf(node.id) >= 0,
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
  const { nodes, therapeuticAreas } = data;
  const nodesById = nodes.reduce((acc, d) => {
    acc[d.id] = d;
    return acc;
  }, {});
  const upMethod = 'root';
  const downMethod = 1;
  const subgraph = getSubgraph({
    efoId,
    nodes,
    therapeuticAreas,
    nodesById,
    upMethod,
    downMethod,
  });

  return <OntologySubgraph efoId={efoId} name={name} subgraph={subgraph} />;
};

export default Section;
