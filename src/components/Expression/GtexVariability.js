import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 900;
const boxHeight = 20;
const boxPadding = boxHeight / 4;
const margin = { top: 40, right: 20, bottom: 20, left: 220 };
const outlierRadius = 2;

class GtexVariability extends Component {
  boxPlotRef = React.createRef();
  xAxisRef = React.createRef();
  yAxisRef = React.createRef();
  xAxis = d3.axisTop();
  yAxis = d3.axisLeft();
  x = d3.scaleLinear();
  y = d3.scalePoint().padding(0.5);

  render() {
    const { data } = this.props;

    const height = data.length * boxHeight + margin.top + margin.bottom;

    return (
      <svg height={height} width={width}>
        <text x={margin.left} y="15">
          Normalised expression (RPKM)
        </text>
        <g
          className="boxplot"
          ref={this.boxPlotRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        />
        <g
          ref={this.xAxisRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        />
        <g
          ref={this.yAxisRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        />
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
    const { x, y } = this;
    const data = this.props.data
      .slice()
      .sort((a, b) => b.data.median - a.data.median);

    const height = data.length * boxHeight + margin.top + margin.bottom;
    const rectHeight = boxHeight - 2 * boxPadding;
    const xMax = d3.max(data, d => {
      return d3.max(d.data.outliers);
    });

    x.domain([0, xMax]).range([0, width - margin.left - margin.right]);
    y.domain(data.map(d => d.tissueSiteDetailId.replace(/_/g, ' '))).range([
      0,
      height - margin.top - margin.bottom,
    ]);

    const boxPlot = d3.select(this.boxPlotRef.current);

    const boxContainer = boxPlot
      .selectAll('g')
      .data(data)
      .enter()
      .append('g');

    boxContainer
      .append('line')
      .attr('x1', d => x(d.data.lowerLimit))
      .attr('x2', d => x(d.data.upperLimit))
      .attr('y1', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('y2', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('stroke', 'black');

    boxContainer
      .append('rect')
      .attr('x', d => x(d.data.q1))
      .attr(
        'y',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr('width', d => x(d.data.q3) - x(d.data.q1))
      .attr('height', rectHeight);

    boxContainer
      .append('line')
      .attr('x1', d => x(d.data.median))
      .attr('x2', d => x(d.data.median))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', 'red');

    boxContainer
      .append('line')
      .attr('x1', d => x(d.data.lowerLimit))
      .attr('x2', d => x(d.data.lowerLimit))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', 'black');

    boxContainer
      .append('line')
      .attr('x1', d => x(d.data.upperLimit))
      .attr('x2', d => x(d.data.upperLimit))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', 'black');

    boxContainer
      .selectAll('circle')
      .data(d => {
        return d.data.outliers.map(outlier => ({
          tissueSiteDetailId: d.tissueSiteDetailId,
          outlier,
        }));
      })
      .enter()
      .append('circle')
      .attr('r', outlierRadius)
      .attr('cx', d => x(d.outlier))
      .attr('cy', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    const xAxis = d3.axisTop(x);
    const yAxis = d3.axisLeft(y);

    d3.select(this.xAxisRef.current).call(xAxis);
    d3.select(this.yAxisRef.current).call(yAxis);
  }
}

export default GtexVariability;
