import React, { useRef, useEffect } from 'react';
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
      if (tasMap[ta]) {
        tasMap[ta].push({
          id: association.disease.id,
          name: association.disease.name,
        });
      } else {
        tasMap[ta] = [
          {
            id: association.disease.id,
            name: association.disease.name,
          },
        ];
      }
    });
  });

  return {
    id: 'EFO_ROOT',
    name: 'root',
    children: Object.entries(tasMap).map(([taId, descendants]) => {
      return {
        id: taId,
        name: idToDisease[taId].name,
        children: descendants,
      };
    }),
  };
}

// pack layout
// const packRoot = d3.hierarchy(data);
// const packLayout = d3.pack().size([300, 300]).padding(10);

// packRoot.sum(function(d) {
//   return d.value;
// });

// packLayout(packRoot);

// const packGroups = d3.select('svg.pack g')
//   .selectAll('g')
//   .data(packRoot.descendants())
//   .enter()
//   .append('g')
//   .attr('transform', d => `translate(${d.x},${d.y})`);

// packGroups.append('circle')
//   .attr('r', d => d.r)
//   .attr('fill', 'cadetblue')
//   .attr('opacity', 0.3);

// packGroups.append('text')
//   .attr('dy', 4)
//   .attr('font-family', '"Helvetica Neue", Helvetica, sans-serif')
//   .attr('font-size', '10px')
//   .attr('fill', 'white')
//   .attr('text-anchor', 'middle') // useful attribute to center text around x value
//   .text(d => d.children === undefined ? d.data.name : '');

function ClassicAssociationsBubbles({ efo, associations }) {
  const svgRef = useRef(null);
  const idToDisease = efo.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  // console.log('lol', d3.hierarchy(hierarchicalData));

  useEffect(
    () => {
      const hierarchicalData = buildHierarchicalData(associations, idToDisease);
      console.log('hierarchicalData', hierarchicalData);
      const root = d3.hierarchy(hierarchicalData);
      const packLayout = d3
        .pack()
        .size([300, 300])
        .padding(10);

      root.sum(d => {
        console.log('d.value', d.value);
        return d.value;
      });

      packLayout(root);

      console.log('root', root);

      // const groups = d3
      //   .select(svgRef.current)
      //   .select('g')
      //   .selectAll('g')
      //   .data(root.descendants())
      //   .enter()
      //   .append('g')
      //   .attr('transform', d => `translate(${d.x},${d.y})`);

      // groups
      //   .append('circle')
      //   .attr('r', d => d.r)
      //   .attr('fill', 'cadetblue')
      //   .attr('opacity', 0.3);
      // console.log('groups', groups);
    },
    [associations, idToDisease]
  );

  return (
    <div>
      Bubbles
      <svg ref={svgRef}>
        <g />
      </svg>
    </div>
  );
}

export default ClassicAssociationsBubbles;
