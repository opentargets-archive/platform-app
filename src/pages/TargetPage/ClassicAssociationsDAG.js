import React from 'react';
import * as d3Base from 'd3';
import * as d3Dag from 'd3-dag';

const d3 = Object.assign({}, d3Base, d3Dag);

function getParentIds(diseaseId, idToDisease, assocSet) {
  const disease = idToDisease[diseaseId];
  const parentIds = new Set();
  const queue = [...disease.parentIds];

  while (queue.length > 0) {
    const parentId = queue.shift();
    const parentNode = idToDisease[parentId];
    if (assocSet[parentId] || parentNode.parentIds.length === 0) {
      parentIds.add(parentId);
    } else {
      for (let i = 0; i < parentNode.parentIds.length; i++) {
        if (!queue.includes(parentNode.parentIds[i])) {
          queue.push(parentNode.parentIds[i]);
        }
      }
    }
  }

  return Array.from(parentIds);
}

function buildDagData(idToDisease, associations, assocSet) {
  const dag = [];
  const tas = new Set();
  associations.forEach(association => {
    const parentIds = getParentIds(
      association.disease.id,
      idToDisease,
      assocSet
    );

    parentIds.forEach(parentId => {
      const node = idToDisease[parentId];
      if (node.parentIds.length === 0 && !assocSet[parentId]) {
        tas.add(parentId);
      }
    });

    dag.push({
      id: association.disease.id,
      parentIds,
    });
  });

  tas.forEach(id => {
    dag.push({
      id,
      parentIds: [],
    });
  });

  return dag;
}

const line = d3
  .line()
  .curve(d3.curveCatmullRom)
  .x(d => d.x)
  .y(d => d.y);

const layering = d3.layeringLongestPath();
const decross = d3.decrossTwoLayer();
const coord = d3.coordCenter();

// const layout = d3
//   .sugiyama()
//   .layering(layering)
//   .decross(decross)
//   .coord(coord);
// .nodeSize(() => [5, 5]);

function ClassicAssociationsDAG({ ensemblId, symbol, efo, associations }) {
  const idToDisease = efo.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  const assocSet = associations.reduce((acc, assoc) => {
    acc[assoc.disease.id] = assoc;
    return acc;
  }, {});

  const dagData = buildDagData(idToDisease, associations, assocSet);
  const dag = d3.dagStratify()(dagData);

  const layout = d3
    .sugiyama()
    .layering(layering)
    .decross(decross)
    .coord(coord)
    .size([400, 400]);

  layout(dag);

  return (
    <svg width="400" height="400">
      <g>
        {dag.links().map(({ points, source, target }) => {
          return (
            <path
              key={`${source.id}-${target.id}`}
              d={line(points)}
              fill="none"
              strokeWidth="1"
              stroke="black"
            />
          );
        })}
      </g>
      <g>
        {dag.descendants().map(node => {
          return <circle key={node.id} cx={node.x} cy={node.y} r={4} />;
        })}
      </g>
    </svg>
  );
}

export default ClassicAssociationsDAG;
