import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 500;
const boxHeight = 10;
const margin = { top: 40, right: 20, bottom: 20, left: 100 };

class GtexVariability extends Component {
  boxPlotRef = React.createRef();
  xAxisRef = React.createRef();
  yAxisRef = React.createRef();
  xAxis = d3.axisTop();
  yAxis = d3.axisLeft();
  x = d3.scaleLinear();
  y = d3.scaleBand();

  render() {
    const { data } = this.props;

    const height = data.length * boxHeight;

    console.log('data', data);

    return (
      <svg height={height} width={width}>
        <text x="35" y="15">
          Normalised expression (RPKM)
        </text>
        <g
          ref={this.boxPlotRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <g ref={this.xAxisRef} />
          <g ref={this.yAxisRef} transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  _render() {
    const { data } = this.props;
    const height = data.length * boxHeight;
    /* const boxPlot = d3.select(this.boxPlotRef.current);

    const boxContainer = boxPlot
      .selectAll('g')
      .data(data)
      .enter()
      .append('g');

    boxContainer.append('rect');

    boxContainer.append('line');
    boxContainer.append('line');
    */

    // this.x.domain().range();
    this.y
      .domain(data.map(d => d.tissueSiteDetailId.replace(/_/g, ' ')))
      .range([0, height - margin.top - margin.bottom]);

    // const xAxis = d3.axisTop(this.x);
    const yAxis = d3.axisLeft(this.y);

    // d3.select(this.xAxisRef.current).call(xAxis);
    d3.select(this.yAxisRef.current).call(yAxis);
  }
}

export default GtexVariability;
