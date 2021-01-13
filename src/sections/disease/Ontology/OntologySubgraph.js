import React, { Fragment } from 'react';
import { withContentRect } from 'react-measure';
import * as d3Base from 'd3';
import * as d3Dag from 'd3-dag';

const d3 = Object.assign({}, d3Base, d3Dag);

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

  // find ancestors
  const ancestors = getAncestors(efoId, idToDisease);

  ancestors.forEach(ancestor => {
    dag.push(ancestor);
  });

  return dag;
}

const layering = d3.layeringLongestPath();
const decross = d3.decrossTwoLayer();
const coord = d3.coordCenter();

const helperLayout = d3
  .sugiyama()
  .layering(layering)
  .decross(decross)
  .coord(coord);

function textWithEllipsis(text, threshold) {
  return text.length <= threshold ? text : text.slice(0, threshold) + '...';
}

function getMaxLayerCount(dag) {
  helperLayout(dag);

  const counts = {};
  let maxCount = Number.NEGATIVE_INFINITY;

  dag.descendants().forEach(node => {
    const { layer } = node;

    if (counts[layer]) {
      counts[layer]++;
    } else {
      counts[layer] = 1;
    }

    if (counts[layer] > maxCount) {
      maxCount = counts[layer];
    }
  });

  return maxCount;
}

const diameter = 12;
const radius = diameter / 2;
const yOffset = 100;
const line = d3.line().curve(d3.curveMonotoneX);

function OntologySubgraph({
  efoId,
  efo,
  idToDisease,
  measureRef,
  contentRect,
}) {
  line.x(d => d.y - xOffset).y(d => d.x);
  const { width } = contentRect.bounds;
  const dagData = buildDagData(efoId, efo, idToDisease);
  const dag = d3.dagStratify()(dagData);
  const maxLayerCount = getMaxLayerCount(dag);
  const height = maxLayerCount * 20;
  const layout = d3
    .sugiyama()
    .layering(layering)
    .decross(decross)
    .coord(coord)
    .size([height, width]);

  layout(dag);
  const nodes = dag.descendants();
  const links = dag.links();
  const separation = width / (d3.max(nodes, d => d.layer) + 1);
  const xOffset = separation / 2 - radius;
  const textLimit = separation / 8;

  return (
    <div ref={measureRef}>
      {width ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={width}
          height={height + yOffset}
        >
          <g transform={`translate(0, ${yOffset})`}>
            {links.map(({ points, source, target }) => {
              return (
                <path
                  key={`${source.id}-${target.id}`}
                  d={line(points)}
                  fill="none"
                  strokeWidth="2"
                  stroke="#eeeeee"
                />
              );
            })}
          </g>
          <g transform={`translate(0, ${yOffset})`}>
            {nodes.map(node => {
              return (
                <Fragment key={node.id}>
                  <text
                    x={node.y - xOffset}
                    y={node.x}
                    dx="6"
                    fontSize="12"
                    dominantBaseline="middle"
                  >
                    <title>{node.data.name}</title>
                    {textWithEllipsis(node.data.name, textLimit)}
                  </text>
                  {node.data.parentIds.length === 0 ? (
                    <rect
                      x={node.y - radius - xOffset}
                      y={node.x - radius}
                      width={diameter}
                      height={diameter}
                      fill="black"
                      stroke="#e0e0e0"
                    />
                  ) : (
                    <circle
                      cx={node.y - xOffset}
                      cy={node.x}
                      r={radius}
                      fill="black"
                      stroke="#e0e0e0"
                    />
                  )}
                </Fragment>
              );
            })}
          </g>
        </svg>
      ) : null}
    </div>
  );
}

export default withContentRect('bounds')(OntologySubgraph);
