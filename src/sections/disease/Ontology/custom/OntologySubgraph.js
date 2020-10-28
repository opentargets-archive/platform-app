import React from 'react';
import * as d3Base from 'd3';
import * as d3DagBase from 'd3-dag';
import { withContentRect } from 'react-measure';
import { withTheme } from '@material-ui/core';

import { Link } from 'ot-ui';

const d3 = Object.assign({}, d3Base, d3DagBase);

/*const separatorIgnoreEdges = (a, b) =>
  (a.data !== undefined) + (b.data !== undefined);
*/

const getLayoutGenerator = (innerWidth, innerHeight) =>
  d3
    .sugiyama()
    .size([innerHeight, innerWidth])
    .layering(d3.layeringLongestPath().topDown(false))
    .decross(d3.decrossTwoLayer())
    // .coord(d3.coordGreedy())
    .coord(d3.coordCenter());
//.separation(separatorIgnoreEdges);

const getMaxLayerCount = (dag, edgeSeparation = true) => {
  // use layout (but only to get layer counts, coords don't matter here)
  const layout = getLayoutGenerator(100, 100);
  layout(dag);

  // init
  const layerCount = dag.reduce((c, n) => Math.max(c, n.layer), 0) + 1;
  const layerNodeCounts = Array(layerCount + 1).fill(0);
  const layerDummyNodeCounts = Array(layerCount + 1).fill(0);

  // nodes and dummy nodes (for edges) per layer
  dag.each(n => {
    layerNodeCounts[n.layer] += 1;
  });
  dag.links().forEach(l =>
    l.data.points.forEach((_, i) => {
      layerDummyNodeCounts[l.source.layer + i + 1] += 1;
    })
  );

  // overall per layer
  const layerCounts = Array(layerCount).fill(0);
  for (let i = 0; i < layerCount; i++) {
    if (!edgeSeparation && i === layerCount - 1) {
      layerCounts[i] = layerNodeCounts[i];
    } else {
      layerCounts[i] = layerNodeCounts[i] + layerDummyNodeCounts[i];
    }
  }

  return edgeSeparation
    ? Math.max(...layerCounts)
    : Math.max(...layerNodeCounts);
};

const textWithEllipsis = (text, threshold) =>
  text.length <= threshold ? text : text.slice(0, threshold) + '...';

class DAGViewer extends React.Component {
  state = {};
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  render() {
    const { measureRef, name, subgraph, theme } = this.props;
    const { width } = this.state;
    // const height = Math.min(width, 700);
    const margin = { top: 100, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;

    // create dag
    let dag = d3.dagStratify()(Object.values(subgraph));

    // compute height (based on dag nodes per layer)
    const height = margin.top + margin.bottom + getMaxLayerCount(dag) * 6;
    const innerHeight = height - margin.top - margin.bottom;

    // create layout generator
    const layout = getLayoutGenerator(innerWidth, innerHeight);

    // compute layout
    layout(dag);

    // constants
    const colorMap = {
      ancestor: theme.palette.primary.main,
      chosen: theme.palette.secondary.main,
      descendant: theme.palette.primary.light,
    };
    const nodeRadius = 6;
    const nodeStrokeColor = theme.palette.grey[300];
    const edgeStrokeColor = theme.palette.grey[200];

    // legend
    const xLegendOffset = 150;
    const yLegend = -15;

    // exclude EFO_ROOT
    const nodesExcludingRoot = dag
      .descendants()
      .filter(d => d.id !== 'EFO_ROOT');
    const linksExcludingRoot = dag
      .links()
      .filter(d => d.source.id !== 'EFO_ROOT');
    const maxDepth = d3.max(nodesExcludingRoot, d => d.layer);
    const xOffsetDueToExcludingRoot = innerWidth / maxDepth;
    const textThreshold = xOffsetDueToExcludingRoot / 8;

    // edge generator
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => d.y - xOffsetDueToExcludingRoot)
      .y(d => d.x);

    return (
      <div ref={measureRef}>
        <div ref={this.svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <marker
                id="ontology-arrowhead"
                orient="auto"
                markerWidth="2"
                markerHeight="4"
                refX="0.1"
                refY="2"
              >
                <path d="M0,0 V4 L2,2 Z" fill={theme.palette.text.primary} />
              </marker>
            </defs>
            <g
              transform={`translate(${margin.left},${margin.top +
                yLegend * 3})`}
            >
              <g transform={`translate(${xLegendOffset},0)`}>
                <circle
                  cx={0}
                  cy={yLegend}
                  r={nodeRadius}
                  fill={colorMap.chosen}
                  stroke={nodeStrokeColor}
                />
                <text
                  x={nodeRadius * 2}
                  y={yLegend}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  {name}
                </text>
                <circle
                  cx={0}
                  cy={yLegend * 2}
                  r={nodeRadius}
                  fill={colorMap.ancestor}
                  stroke={nodeStrokeColor}
                />
                <text
                  x={nodeRadius * 2}
                  y={yLegend * 2}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  ancestors
                </text>
                <circle
                  cx={0}
                  cy={yLegend * 3}
                  r={nodeRadius}
                  fill={colorMap.descendant}
                  stroke={nodeStrokeColor}
                />
                <text
                  x={nodeRadius * 2}
                  y={yLegend * 3}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  descendants
                </text>
              </g>

              <g>
                <circle
                  cx={0}
                  cy={yLegend}
                  r={nodeRadius}
                  fill="none"
                  stroke={nodeStrokeColor}
                  strokeWidth="2"
                />
                <text
                  x={nodeRadius * 2}
                  y={yLegend}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  disease
                </text>
                <rect
                  x={-nodeRadius}
                  y={yLegend * 2 - nodeRadius}
                  width={nodeRadius * 2}
                  height={nodeRadius * 2}
                  fill="none"
                  stroke={nodeStrokeColor}
                  strokeWidth="2"
                />
                <text
                  x={nodeRadius * 2}
                  y={yLegend * 2}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  therapeutic area
                </text>
              </g>
            </g>
            <g
              transform={`translate(${margin.left +
                innerWidth / 2},${margin.top + yLegend * 2})`}
            >
              <text
                x={-100}
                y={0}
                dominantBaseline="middle"
                textAnchor="end"
                fill={theme.palette.text.primary}
                fontWeight="bold"
                fontSize={14}
              >
                GENERAL
              </text>
              <text
                x={100}
                y={0}
                dominantBaseline="middle"
                textAnchor="start"
                fill={theme.palette.text.primary}
                fontWeight="bold"
                fontSize={14}
              >
                SPECIFIC
              </text>
              <path
                markerEnd="url(#ontology-arrowhead)"
                strokeWidth="2"
                fill="none"
                stroke={theme.palette.text.primary}
                d={`M-80,0 L80,0`}
              />
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {linksExcludingRoot.map(d => (
                <path
                  key={`${d.source.id}-${d.target.id}`}
                  fill="none"
                  stroke={edgeStrokeColor}
                  strokeWidth="2"
                  d={line(d.data.points)}
                />
              ))}
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {nodesExcludingRoot.map(d => (
                <Link key={d.id} to={`/disease/${d.id}`}>
                  {d.data.isTherapeuticArea ? (
                    <rect
                      fill={colorMap[d.data.nodeType]}
                      stroke={nodeStrokeColor}
                      x={d.y - nodeRadius - xOffsetDueToExcludingRoot}
                      y={d.x - nodeRadius}
                      width={nodeRadius * 2}
                      height={nodeRadius * 2}
                    />
                  ) : (
                    <circle
                      fill={colorMap[d.data.nodeType]}
                      stroke={nodeStrokeColor}
                      cx={d.y - xOffsetDueToExcludingRoot}
                      cy={d.x}
                      r={nodeRadius}
                    />
                  )}
                </Link>
              ))}
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {nodesExcludingRoot.map(d => (
                <text
                  key={d.id}
                  x={d.y - xOffsetDueToExcludingRoot}
                  y={d.x}
                  dx={nodeRadius * 2}
                  dominantBaseline="middle"
                  fill={theme.palette.text.primary}
                  fontSize={12}
                >
                  <title>{d.data.name}</title>
                  {textWithEllipsis(d.data.name || 'No name', textThreshold)}
                </text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default withTheme(withContentRect('bounds')(DAGViewer));
