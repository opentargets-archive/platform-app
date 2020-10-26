import React, { useRef } from 'react';
import * as d3 from 'd3';

function findTas(id, idToDisease) {
  const tas = new Set();
  const diseaseNode = idToDisease[id];

  if (diseaseNode.parentIds.length === 0) {
    return tas;
  }

  const queue = [id];

  while (queue.length > 0) {
    const diseaseId = queue.shift();
    const node = idToDisease[diseaseId];

    if (node.parentIds.length === 0) {
      tas.add(diseaseId);
    }

    for (let i = 0; i < node.parentIds.length; i++) {
      const parentId = node.parentIds[i];

      if (!queue.includes(parentId)) {
        queue.push(parentId);
      }
    }
  }

  return tas;
}

function buildHierarchicalData(associations, idToDisease) {
  const tasMap = {};
  associations.forEach(association => {
    const tas = findTas(association.disease.id, idToDisease);
    tas.forEach(ta => {
      const assocData = {
        id: association.disease.id,
        uniqueId: `${ta}-${association.disease.id}`,
        name: association.disease.name,
        score: association.score,
      };
      if (tasMap[ta]) {
        tasMap[ta].push(assocData);
      } else {
        tasMap[ta] = [assocData];
      }
    });
  });

  return {
    id: 'EFO_ROOT',
    uniqueId: 'EFO_ROOT',
    name: 'root',
    children: Object.entries(tasMap).map(([taId, descendants]) => {
      return {
        id: taId,
        uniqueId: taId,
        name: idToDisease[taId].name,
        children: descendants,
      };
    }),
  };
}

function ClassicAssociationsBubbles({ efo, associations }) {
  const svgRef = useRef(null);
  const idToDisease = efo.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  const hierarchicalData = buildHierarchicalData(associations, idToDisease);
  const root = d3.hierarchy(hierarchicalData);
  const packLayout = d3
    .pack()
    .size([300, 300])
    .padding(2);

  root.sum(d => d.score);

  packLayout(root);

  return (
    <div>
      <svg ref={svgRef} height="300" width="300">
        {root.descendants().map(descendant => {
          return (
            <g
              key={descendant.data.uniqueId}
              transform={`translate(${descendant.x}, ${descendant.y})`}
            >
              <circle r={descendant.r} fill="cadetblue" opacity="0.3" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default ClassicAssociationsBubbles;
