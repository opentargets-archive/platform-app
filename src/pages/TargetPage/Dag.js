import React, { Fragment } from 'react';
import { line as d3Line, curveMonotoneX, scaleQuantize } from 'd3';
import { colorRange } from '../../constants';
import AssociationTooltip from './AssociationTooltip';

const color = scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

const line = d3Line().curve(curveMonotoneX);

const diameter = 8;
const radius = diameter / 2;
const yOffset = 100;

function textWithEllipsis(text, threshold) {
  if (!text) return '';
  return text.length <= threshold ? text : text.slice(0, threshold) + '...';
}

function Dag({
  ensemblId,
  width,
  height,
  links,
  nodes,
  xOffset,
  textLimit,
  svgRef,
}) {
  line.x(d => d.y - xOffset).y(d => d.x);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={svgRef}
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
          x="2"
          width={diameter}
          height={diameter}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        <text
          x="16"
          y="4"
          fill="#5a5f5f"
          dominantBaseline="middle"
          fontSize="12"
        >
          therapeutic area
        </text>
        <circle
          cx="6"
          cy="20"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        <text
          fill="#5a5f5f"
          x="16"
          y="20"
          dominantBaseline="middle"
          fontSize="12"
        >
          disease
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
              <AssociationTooltip
                ensemblId={ensemblId}
                efoId={node.data.id}
                name={node.data.name}
                score={node.data.score}
              >
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
              </AssociationTooltip>
            </Fragment>
          );
        })}
      </g>
    </svg>
  );
}

export default React.memo(Dag);
