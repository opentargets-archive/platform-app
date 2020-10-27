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
    uniqueId: 'EFO_ROOT',
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

  const size = 800;
  const hierarchicalData = buildHierarchicalData(associations, idToDisease);
  const root = d3.hierarchy(hierarchicalData);
  const packLayout = d3
    .pack()
    .size([size, size])
    .padding(2);
  root.sum(d => d.score);
  packLayout(root);

  return (
    <div>
      <svg ref={svgRef} height={size} width={size}>
        {root.descendants().map(d => {
          return (
            <g key={d.data.uniqueId}>
              <path
                id={d.data.uniqueId}
                d={`M ${d.x}, ${d.y + d.r} a ${d.r},${d.r} 0 1,1 0,-${2 *
                  d.r} a ${d.r},${d.r} 0 1,1 0,${2 * d.r}`}
                fill="cadetblue"
                opacity="0.3"
              />
              {d.data.uniqueId === 'EFO_ROOT' ? null : d.parent &&
                d.parent.data.uniqueId === 'EFO_ROOT' ? (
                <text textAnchor="middle" fontSize="12">
                  <textPath startOffset="50%" xlinkHref={`#${d.data.uniqueId}`}>
                    {d.data.name}
                  </textPath>
                </text>
              ) : d.r > 15 ? (
                <>
                  <clipPath id={`clip-${d.data.uniqueId}`}>
                    <circle cx={d.x} cy={d.y} r={d.r} />
                  </clipPath>
                  <text
                    x={d.x}
                    y={d.y}
                    fontSize="12"
                    textAnchor="middle"
                    clipPath={`url(#clip-${d.data.uniqueId})`}
                  >
                    {d.data.name}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default ClassicAssociationsBubbles;
