import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import * as d3Dag from 'd3-dag';

class DAGViewer extends React.Component {
  state = {};
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  render() {
    const { measureRef, dag } = this.props;
    const { width } = this.state;
    const height = Math.min(width, 700);
    const margin = { top: 50, right: 80, bottom: 50, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // compute layout
    const layout = d3Dag
      .sugiyama()
      .size([innerWidth, innerHeight])
      .layering(d3Dag.layeringLongestPath())
      .decross(d3Dag.decrossTwoLayer())
      .coord(d3Dag.coordGreedy());
    layout(dag);

    // edge generator
    const line = d3
      .line()
      // .curve(d3.curveCatmullRom)
      .curve(d3.curveMonotoneY)
      .x(d => d.x)
      .y(d => d.y);

    return (
      <div ref={measureRef}>
        <div ref={this.svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            <g transform={`translate(${margin.left},${margin.top})`}>
              {dag.links().map(d => (
                <path
                  key={`${d.source.id}-${d.target.id}`}
                  fill="none"
                  stroke="#bbb"
                  d={line(d.data.points)}
                />
              ))}
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {dag.descendants().map(d => (
                <circle
                  key={d.id}
                  fill="blue"
                  stroke="#bbb"
                  cx={d.x}
                  cy={d.y}
                  r={4}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default withContentRect('bounds')(DAGViewer);
