import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3Base from 'd3';
import * as d3DagBase from 'd3-dag';
import withTheme from '@material-ui/core/styles/withTheme';

const d3 = Object.assign({}, d3Base, d3DagBase);

const separatorIgnoreEdges = (a, b) =>
  (a.data !== undefined) + (b.data !== undefined);

const getLayoutGenerator = (innerWidth, innerHeight) =>
  d3
    .sugiyama()
    .size([innerHeight, innerWidth])
    .layering(d3.layeringLongestPath().topDown(false))
    .decross(d3.decrossTwoLayer())
    .coord(d3.coordGreedy())
    .separation(separatorIgnoreEdges);

const getMaxLayerCount = (dag, edgeSeparation = false) => {
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

class DAGViewer extends React.Component {
  state = {};
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  render() {
    const { measureRef, efoId, name, subgraph, theme } = this.props;
    const { width } = this.state;
    // const height = Math.min(width, 700);
    const margin = { top: 80, right: 80, bottom: 50, left: 80 };
    const innerWidth = width - margin.left - margin.right;

    // create dag
    let dag = d3.dagStratify()(Object.values(subgraph));

    // compute height (based on dag nodes per layer)
    const height = margin.top + margin.bottom + getMaxLayerCount(dag) * 10;
    const innerHeight = height - margin.top - margin.bottom;

    // create layout generator
    const layout = getLayoutGenerator(innerWidth, innerHeight);

    // compute layout
    layout(dag);

    // edge generator
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => d.y)
      .y(d => d.x);

    // colors
    const colorMap = {
      ancestor: theme.palette.primary.main,
      chosen: theme.palette.secondary.main,
      descendant: theme.palette.primary.light,
    };

    const nodeRadius = 4;
    const nodeStrokeColor = theme.palette.grey[300];
    const edgeStrokeColor = theme.palette.grey[300];

    // legend
    const yLegend = -15;

    return (
      <div ref={measureRef}>
        <div ref={this.svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            <g transform={`translate(${margin.left},${margin.top + yLegend})`}>
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
            <g transform={`translate(${margin.left},${margin.top})`}>
              {dag.links().map(d => (
                <path
                  key={`${d.source.id}-${d.target.id}`}
                  fill="none"
                  stroke={edgeStrokeColor}
                  d={line(d.data.points)}
                />
              ))}
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {dag.descendants().map(d => (
                <circle
                  key={d.id}
                  fill={colorMap[d.data.nodeType]}
                  stroke={nodeStrokeColor}
                  cx={d.y}
                  cy={d.x}
                  r={nodeRadius}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default withTheme()(withContentRect('bounds')(DAGViewer));
