import React from 'react';
// import * as d3Base from 'd3';
// import * as d3Dag from 'd3-dag';

// const d3 = Object.assign({}, d3Base, d3Dag);

function getAncestors(efoId, idToDisease) {
  const ancestors = [idToDisease[efoId]];
  const queue = [efoId];
  const visited = new Set([efoId]);

  while (queue.length > 0) {
    const id = queue.shift();
    const node = idToDisease[id];

    node.parentIds.forEach(parentId => {
      if (!visited.has(parentId)) {
        ancestors.push(idToDisease[parentId]);
        queue.push(parentId);
        visited.add(parentId);
      }
    });
  }

  return ancestors;
}

function buildDagData(efoId, efo, idToDisease) {
  const dag = [];
  // find direct children of efoId

  efo.forEach(disease => {
    if (disease.parentIds.includes(efoId)) {
      dag.push({
        id: disease.id,
        name: disease.name,
        parentIds: [efoId],
      });
    }
  });

  const ancestors = getAncestors(efoId, idToDisease);

  console.log('ancestors', ancestors);

  return dag;
}

function OntologySubgraph({ efoId, efo, idToDisease }) {
  console.log('efo', efo);
  const dagData = buildDagData(efoId, efo, idToDisease);
  console.log('dagData', dagData);

  return <div>Ontology subgraph lol</div>;
}

export default OntologySubgraph;
