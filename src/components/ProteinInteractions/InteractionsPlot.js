import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

class InteractionsPlot extends React.Component {
  state = {};
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }
  render() {
    const {
      measureRef,
      nodes,
      selectedUniprotIds,
      edgesFiltered,
      edgesFilteredWithinSelectedUniprotIds,
      edgesFilteredWithoutSelectedUniprotIds,
      handleProteinClick,
      handleMouseOver,
      handleMouseLeave,
    } = this.props;
    const { width } = this.state;
    const height = Math.min(width, 700);

    // helpers
    const padding = 100;
    const radius = height / 2 - padding;
    const diameter = 2 * radius;
    const textOffset = 10;
    const textRadius = radius + textOffset;
    const circleRadius = 4;
    const colour = d3
      .scaleLog()
      .domain(d3.extent(nodes, n => n.neighbourCount + 1))
      .range(['#fff', '#3489ca']);

    // order alphabetically
    const nodeCount = nodes.length;
    const uniprotIdToIndex = new Map(
      nodes
        .sort((a, b) => d3.ascending(a.symbol, b.symbol))
        .map((d, i) => [d.uniprotId, i])
    );
    const nodeToAngleRad = n =>
      (2 * Math.PI * uniprotIdToIndex.get(n)) / nodeCount;
    const nodeToAngleDeg = n => (360 * uniprotIdToIndex.get(n)) / nodeCount;
    const nodeToColour = n => colour(n.neighbourCount + 1);
    const isInRightSemiCircle = n => uniprotIdToIndex.get(n) / nodeCount < 0.5;

    // legend data for scale
    const maxNeighbourCount = d3.max(nodes, n => n.neighbourCount);
    const legendInterval = maxNeighbourCount / 5;
    const legendData = [
      0,
      legendInterval,
      legendInterval * 2,
      legendInterval * 3,
      legendInterval * 4,
      legendInterval * 5,
    ];

    return (
      <div ref={measureRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <g
            transform={`translate(${width -
              20 * (legendData.length + 3)},${20})`}
          >
            <text
              x={-10}
              y={10}
              fontSize="12px"
              fill="#777"
              textAnchor="end"
              alignmentBaseline="central"
            >
              {0}
            </text>
            {legendData.map((d, i) => (
              <rect
                key={i}
                x={i * 20}
                y={0}
                width={20}
                height={20}
                fill={colour(d + 1)}
                stroke="#777"
              />
            ))}
            <text
              x={legendData.length * 20 + 10}
              y={10}
              fontSize="12px"
              fill="#777"
              textAnchor="start"
              alignmentBaseline="central"
            >
              {maxNeighbourCount}
            </text>
            <text
              x={(legendData.length * 20) / 2}
              y={30}
              fontSize="12px"
              fill="#777"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              Interactions (ignoring selection)
            </text>
          </g>
          <g transform={`translate(${20},${20})`}>
            <circle
              cx="10"
              cy="10"
              r={circleRadius}
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
            <text
              x="30"
              y="10"
              fill="#000"
              fontSize="12px"
              fontWeight="bold"
              textAnchor="start"
              alignmentBaseline="central"
            >
              Selection
            </text>
            <circle
              cx="10"
              cy="30"
              r={circleRadius}
              stroke="#bbb"
              fill="none"
            />
            <text
              x="30"
              y="30"
              fill="#777"
              fontSize="12px"
              textAnchor="start"
              alignmentBaseline="central"
            >
              Interaction with selection
            </text>
            <circle
              cx="10"
              cy="50"
              r={circleRadius}
              stroke="#bbb"
              fill="none"
            />
            <text
              x="30"
              y="50"
              fill="#ddd"
              fontSize="12px"
              textAnchor="start"
              alignmentBaseline="central"
            >
              No interaction with selection
            </text>
          </g>
          {selectedUniprotIds.length > 0 ? (
            <g
              fill="none"
              stroke="#999"
              strokeOpacity={0.6}
              transform={`translate(${width / 2},${height / 2})`}
            >
              {(selectedUniprotIds.length === 1
                ? edgesFilteredWithoutSelectedUniprotIds
                : edgesFilteredWithinSelectedUniprotIds
              ).map(e => {
                let fromAngle = nodeToAngleRad(e.source) + 0.001;
                let toAngle = nodeToAngleRad(e.target) + 0.001;
                let fromX =
                  ((diameter - circleRadius) / 2) * Math.sin(fromAngle);
                let fromY =
                  (-(diameter - circleRadius) / 2) * Math.cos(fromAngle);
                let toX = ((diameter - circleRadius) / 2) * Math.sin(toAngle);
                let toY = (-(diameter - circleRadius) / 2) * Math.cos(toAngle);
                const d = `M${fromX},${fromY} Q0,0 ${toX},${toY}`;
                return <path key={`${e.source}-${e.target}`} d={d} />;
              })}
            </g>
          ) : (
            <g
              fill="none"
              stroke="#999"
              strokeOpacity={0.6}
              transform={`translate(${width / 2},${height / 2})`}
            >
              {edgesFiltered.map(e => {
                let fromAngle = nodeToAngleRad(e.source) + 0.001;
                let toAngle = nodeToAngleRad(e.target) + 0.001;
                let fromX =
                  ((diameter - circleRadius) / 2) * Math.sin(fromAngle);
                let fromY =
                  (-(diameter - circleRadius) / 2) * Math.cos(fromAngle);
                let toX = ((diameter - circleRadius) / 2) * Math.sin(toAngle);
                let toY = (-(diameter - circleRadius) / 2) * Math.cos(toAngle);
                const d = `M${fromX},${fromY} Q0,0 ${toX},${toY}`;
                return <path key={`${e.source}-${e.target}`} d={d} />;
              })}
            </g>
          )}
          <g
            style={{ font: '10px sans-serif' }}
            transform={`translate(${width / 2},${height / 2})`}
          >
            {nodes.map(n => {
              const { isSelected, isNeighbourOfSelected } = n;
              const angleRad = nodeToAngleRad(n.uniprotId);
              const angleDeg = nodeToAngleDeg(n.uniprotId);
              const isRightHalf = isInRightSemiCircle(n.uniprotId);
              return (
                <g
                  key={n.uniprotId}
                  id={`node-${n.uniprotId}`}
                  transform={`translate(${textRadius *
                    Math.sin(angleRad)},${-textRadius * Math.cos(angleRad)})`}
                  onClick={() => handleProteinClick(n.uniprotId)}
                  onMouseMove={() => handleMouseOver(n)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={circleRadius}
                    fill={nodeToColour(n)}
                    stroke={isSelected ? '#000' : '#bbb'}
                    strokeWidth={isSelected ? 2 : 1}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x="0"
                    y="0"
                    style={{ cursor: 'pointer' }}
                    fill={
                      selectedUniprotIds.length > 0
                        ? isSelected
                          ? '#000'
                          : isNeighbourOfSelected
                          ? '#777'
                          : '#ddd'
                        : '#777'
                    }
                    fontSize={isSelected ? '12px' : null}
                    fontWeight={isSelected ? 'bold' : null}
                    textAnchor={isRightHalf ? 'start' : 'end'}
                    alignmentBaseline="central"
                    transform={`rotate(${(isRightHalf ? 270 : 90) +
                      angleDeg}) translate(${
                      isRightHalf ? textOffset : -textOffset
                    }, 0)`}
                  >
                    {n.symbol}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default withContentRect('bounds')(InteractionsPlot);
