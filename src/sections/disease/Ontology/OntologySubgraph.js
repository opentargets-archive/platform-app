import React from 'react';
import { withContentRect } from 'react-measure';
import { line as d3Line, max, curveMonotoneX } from 'd3';
import {
  layeringLongestPath,
  decrossTwoLayer,
  coordCenter,
  sugiyama,
  dagStratify,
} from 'd3-dag';
import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  labelText: {
    '&:hover': { fontWeight: '700' },
  },
});

function getAncestors(efoId, idToDisease) {
  const ancestors = [{ ...idToDisease[efoId], nodeType: 'anchor' }];
  const queue = [efoId];
  const visited = new Set([efoId]);

  while (queue.length > 0) {
    const id = queue.shift();
    const node = idToDisease[id];

    node.parentIds.forEach(parentId => {
      if (!visited.has(parentId)) {
        ancestors.push({ ...idToDisease[parentId], nodeType: 'ancestor' });
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
        nodeType: 'child',
      });
    }
  });

  const ancestors = getAncestors(efoId, idToDisease); // find ancestors

  ancestors.forEach(ancestor => {
    dag.push(ancestor);
  });

  return dag;
}

const layering = layeringLongestPath();
const decross = decrossTwoLayer();
const coord = coordCenter();

const helperLayout = sugiyama()
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

  dag.links().forEach(link => {
    link.points.forEach((_, i) => {
      const index = link.source.layer + i;
      counts[index]++;
      if (counts[index] > maxCount) {
        maxCount = counts[index];
      }
    });
  });

  return maxCount;
}

const colorMap = {
  anchor: '#ff6350',
  ancestor: '#3489ca',
  child: '#85b8df',
};
const diameter = 12;
const radius = diameter / 2;
const yOffset = 100;
const line = d3Line().curve(curveMonotoneX);

function OntologySubgraph({
  efoId,
  efo,
  name,
  idToDisease,
  measureRef,
  contentRect,
}) {
  line.x(d => d.y - xOffset).y(d => d.x);
  const classes = useStyles();
  const { width } = contentRect.bounds;
  const dagData = buildDagData(efoId, efo, idToDisease);
  const dag = dagStratify()(dagData);
  const maxLayerCount = getMaxLayerCount(dag);
  const height = maxLayerCount * 6;
  const layout = sugiyama()
    .layering(layering)
    .decross(decross)
    .coord(coord)
    .nodeSize(() => {
      const base = diameter + 3;
      return [base, base];
    })
    .size([height, width]);

  layout(dag);
  const nodes = dag.descendants();
  const links = dag.links();
  const separation = width / (max(nodes, d => d.layer) + 1);
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
          <defs>
            <marker
              id="arrowhead"
              orient="auto"
              markerWidth="2"
              markerHeight="4"
              refX="0.1"
              refY="2"
            >
              <path d="M0,0 V4 L2,2 Z" fill="#5a5f5f" />
            </marker>
          </defs>
          <g transform={`translate(0, 10)`}>
            <rect
              x="4"
              y="11"
              width={diameter}
              height={diameter}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <text
              x="20"
              y="17"
              fill="#5a5f5f"
              dominantBaseline="middle"
              fontSize="12"
            >
              therapeutic area
            </text>
            <circle
              cx="10"
              cy="34"
              r={radius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <text
              fill="#5a5f5f"
              x="20"
              y="34"
              dominantBaseline="middle"
              fontSize="12"
            >
              disease
            </text>
            <circle
              cx="150"
              cy="0"
              r={radius}
              fill={colorMap.child}
              stroke="#e0e0e0"
            />
            <text
              fill="#5a5f5f"
              x="160"
              y="0"
              dominantBaseline="middle"
              fontSize="12"
            >
              descendants
            </text>
            <circle
              cx="150"
              cy="17"
              r={radius}
              fill={colorMap.ancestor}
              stroke="#e0e0e0"
            />
            <text
              fill="#5a5f5f"
              x="160"
              y="17"
              dominantBaseline="middle"
              fontSize="12"
            >
              ancestors
            </text>
            <circle
              cx="150"
              cy="34"
              r={radius}
              fill={colorMap.anchor}
              stroke="#e0e0e0"
            />
            <text
              fill="#5a5f5f"
              x="160"
              y="34"
              dominantBaseline="middle"
              fontSize="12"
            >
              {name}
            </text>
          </g>
          <g transform={`translate(${width / 2}, 70)`}>
            <text
              x="-160"
              fontWeight="bold"
              fontSize="14"
              fill="#5a5f5f"
              dominantBaseline="middle"
            >
              GENERAL
            </text>
            <text
              x="100"
              fontWeight="bold"
              fontSize="14"
              fill="#5a5f5f"
              dominantBaseline="middle"
            >
              SPECIFIC
            </text>
            <path
              markerEnd="url(#arrowhead)"
              strokeWidth="2"
              fill="none"
              stroke="#5a5f5f"
              d="M-80,0 L80,0"
            />
          </g>
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
                <Link
                  to={`/disease/${node.data.id}`}
                  className={classes.labelText}
                  key={node.id}
                >
                  <Tooltip
                    title={`${node.data.name || 'No name'} | ID: ${node.id}`}
                  >
                    <g>
                      <text
                        x={node.y - xOffset}
                        y={node.x}
                        dx="9"
                        fontSize="12"
                        dominantBaseline="middle"
                        fill="#5a5f5f"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{node.data.name}</title>
                        {textWithEllipsis(
                          node.data.name || 'No name',
                          textLimit
                        )}
                      </text>

                      {node.data.parentIds.length === 0 ? (
                        <rect
                          x={node.y - radius - xOffset}
                          y={node.x - radius}
                          width={diameter}
                          height={diameter}
                          fill={colorMap[node.data.nodeType]}
                          stroke="#e0e0e0"
                        />
                      ) : (
                        <circle
                          cx={node.y - xOffset}
                          cy={node.x}
                          r={radius}
                          fill={colorMap[node.data.nodeType]}
                          stroke="#e0e0e0"
                        />
                      )}
                    </g>
                  </Tooltip>
                </Link>
              );
            })}
          </g>
        </svg>
      ) : null}
    </div>
  );
}

export default withContentRect('bounds')(OntologySubgraph);
