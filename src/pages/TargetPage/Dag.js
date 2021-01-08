import React, { Fragment } from 'react';
import * as d3 from 'd3';
import { colorRange } from '../../constants';

const color = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

const line = d3.line().curve(d3.curveMonotoneX);

const diameter = 8;
const radius = diameter / 2;

function textWithEllipsis(text, threshold) {
  return text.length <= threshold ? text : text.slice(0, threshold) + '...';
}

function Dag({ width, height, links, nodes, xOffset, textLimit }) {
  line.x(d => d.y - xOffset).y(d => d.x);

  return (
    <svg width={width} height={height}>
      <g>
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
      <g>
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
                  fill={node.data.score ? color(node.data.score) : 'white'}
                  stroke="#e0e0e0"
                />
              ) : (
                <circle
                  cx={node.y - xOffset}
                  cy={node.x}
                  r={radius}
                  fill={color(node.data.score)}
                  stroke="#e0e0e0"
                />
              )}
            </Fragment>
          );
        })}
      </g>
    </svg>
  );
}

export default React.memo(Dag);
