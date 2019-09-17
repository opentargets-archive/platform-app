import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3Base from 'd3';
import * as d3DagBase from 'd3-dag';
import withTheme from '@material-ui/core/styles/withTheme';

import { Link } from 'ot-ui';

const d3 = Object.assign({}, d3Base, d3DagBase);

const getInducedDAG = ({ data, efo }) => {
  const efoById = new Map(efo.nodes.map(d => [d.id, d]));

  // get just what is needed from associations
  const dataAsNodes = data.map(d => ({
    id: d.disease.id,
    name: d.disease.name,
    score: d.score,
    isTherapeuticArea: efo.therapeuticAreas.indexOf(d.disease.id) >= 0,
  }));
  const therapeuticAreas = dataAsNodes.filter(d => d.isTherapeuticArea);
  const diseases = dataAsNodes.filter(d => !d.isTherapeuticArea);
  const nodesById = new Map([
    ['EFO_ROOT', { id: 'EFO_ROOT', score: null }],
    ...therapeuticAreas.map(d => [d.id, d]),
    ...diseases.map(d => [d.id, d]),
  ]);
  const nodeIds = new Set(nodesById.keys());

  // helper to induce parents which are in the associations list
  const getInducedParentIds = (inducedParentIds, directParentIds) => {
    if (directParentIds.size > 0) {
      // partition
      const allowedParentIds = [...directParentIds].filter(d => nodeIds.has(d));
      const disallowedParentIds = [...directParentIds].filter(
        d => !nodeIds.has(d)
      );

      // add the allowed ones
      for (let allowedParentId of allowedParentIds) {
        inducedParentIds.add(allowedParentId);
      }

      // add the disallowed ones
      const allNextDirectParentIds = new Set();
      for (let disallowedParentId of disallowedParentIds) {
        const { parentIds: nextDirectParentIds } = efoById.get(
          disallowedParentId
        );
        for (let nextDirectParentId of nextDirectParentIds) {
          allNextDirectParentIds.add(nextDirectParentId);
        }
      }

      // deal with the disallowed ones
      return getInducedParentIds(inducedParentIds, allNextDirectParentIds);
    } else {
      return inducedParentIds;
    }
  };

  // induce the subgraph of diseases within the associations data
  const getInducedSubGraph = nodeIds =>
    new Map(
      [...nodeIds].map(d => {
        const { parentIds: directParentIds, ...rest } = efoById.get(d);
        const { score, isTherapeuticArea } = nodesById.get(d);
        return [
          d,
          {
            id: d,
            score,
            isTherapeuticArea,
            ...rest,
            parentIds: [
              ...getInducedParentIds(new Set(), new Set(directParentIds)),
            ],
          },
        ];
      })
    );

  const subGraph = getInducedSubGraph(nodeIds);
  const subGraphData = [...subGraph.values()];
  // compute layout
  // layout(dag);
  return d3.dagStratify()(subGraphData);
};

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

class ClassicAssociationsDAG extends React.Component {
  state = {};
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  render() {
    const { measureRef, theme, data, efo } = this.props;
    const { width } = this.state;
    const margin = { top: 100, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;

    // create dag
    let dag = getInducedDAG({ data, efo });

    // compute height (based on dag nodes per layer)
    const height = margin.top + margin.bottom + getMaxLayerCount(dag) * 6;
    const innerHeight = height - margin.top - margin.bottom;

    // create layout generator
    const layout = getLayoutGenerator(innerWidth, innerHeight);

    // compute layout
    layout(dag);

    // color scale
    const color = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['#fff', theme.palette.primary.main]);

    // constants
    const nodeRadius = 6;
    const nodeStrokeColor = theme.palette.grey[300];
    const edgeStrokeColor = theme.palette.grey[200];

    // legend
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
                      fill={color(d.data.score)}
                      stroke={nodeStrokeColor}
                      x={d.y - nodeRadius - xOffsetDueToExcludingRoot}
                      y={d.x - nodeRadius}
                      width={nodeRadius * 2}
                      height={nodeRadius * 2}
                    />
                  ) : (
                    <circle
                      fill={color(d.data.score)}
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
                  {textWithEllipsis(d.data.name, textThreshold)}
                </text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default withTheme()(withContentRect('bounds')(ClassicAssociationsDAG));
