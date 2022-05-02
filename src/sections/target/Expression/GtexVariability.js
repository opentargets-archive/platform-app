import React, { Component } from 'react';
import {
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  max,
  schemeCategory10,
  select,
  axisTop,
  axisLeft,
} from 'd3';
import { withTheme } from '@material-ui/core';

const width = 900;
const boxHeight = 20;
const boxPadding = boxHeight / 4;
const margin = { top: 40, right: 20, bottom: 20, left: 220 };
const outlierRadius = 2;

function getTextWidth(text, fontSize, fontFace) {
  const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
  context.font = `${fontSize}px ${fontFace}`;
  return context.measureText(text).width;
}

function getLongestId(data) {
  let longestId = '';
  data.forEach(d => {
    if (d.tissueSiteDetailId.length > longestId.length) {
      longestId = d.tissueSiteDetailId;
    }
  });
  return longestId;
}

function buildTooltip(X, tooltipObject, data) {
  return Object.keys(tooltipObject)
    .map(field => {
      const value =
        data[field] === null
          ? 'N/A'
          : data[field].toFixed(tooltipObject[field]['roundDigits']);
      return (
        `<tspan x='${X}' dy='1.2em' style="font-weight: bold;">` +
        `${tooltipObject[field]['label']}: </tspan>` +
        `<tspan>${value}</tspan>`
      );
    })
    .join('');
}

class GtexVariability extends Component {
  boxPlotRef = React.createRef();
  tooltipRef = React.createRef();
  xAxisRef = React.createRef();
  yAxisRef = React.createRef();
  xAxis = axisTop();
  yAxis = axisLeft();
  x = scaleLinear();
  y = scalePoint().padding(0.5);
  colour = scaleOrdinal();

  render() {
    const { theme, data } = this.props;
    margin['left'] = getTextWidth(getLongestId(data), 12, 'Arial');

    const height = data.length * boxHeight + margin.top + margin.bottom;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width}>
        <text
          x={margin.left}
          y="15"
          fill={theme.palette.grey[700]}
          fontSize="14"
        >
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
        <g
          ref={this.tooltipRef}
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
    const { theme } = this.props;
    const { x, y, colour } = this;
    const data = this.props.data.slice().sort((a, b) => b.median - a.median);

    const height = data.length * boxHeight + margin.top + margin.bottom;
    const rectHeight = boxHeight - 2 * boxPadding;
    const xMax = max(data, d => {
      return max(d.outliers);
    });

    x.domain([0, xMax]).range([0, width - margin.left - margin.right]);
    y.domain(data.map(d => d.tissueSiteDetailId.replace(/_/g, ' '))).range([
      0,
      height - margin.top - margin.bottom,
    ]);

    colour.domain(data.map(d => d.tissueSiteDetailId)).range(schemeCategory10);

    const tooltipTextFields = {
      lowerLimit: {
        label: 'lower limit',
        roundDigits: 1,
      },
      q1: {
        label: 'q1',
        roundDigits: 1,
      },
      median: {
        label: 'median',
        roundDigits: 1,
      },
      q3: {
        label: 'q3',
        roundDigits: 1,
      },
      upperLimit: {
        label: 'upper limit',
        roundDigits: 1,
      },
    };

    const tooltipSettings = {
      fontSize: 12,
      fontFamily: 'sans-serif',
      offsetText: 5,
      offsetX: 10,
      offsetY: boxHeight / 2 + 5,
    };

    const tooltip = select(this.tooltipRef.current);

    const tooltipRect = tooltip
      .append('rect')
      .style('fill', 'white')
      .style('opacity', 0.8)
      .style('visibility', 'hidden');

    const tooltipText = tooltip
      .append('text')
      .style('font-family', tooltipSettings['fontFamily'])
      .style('font-size', `${tooltipSettings['fontSize']}px`)
      .style('visibility', 'hidden');

    const boxPlot = select(this.boxPlotRef.current);

    const boxContainer = boxPlot
      .selectAll('g')
      .data(data)
      .join('g');

    boxContainer
      .append('line')
      .attr('x1', d => x(d.lowerLimit))
      .attr('x2', d => x(d.upperLimit))
      .attr('y1', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('y2', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('stroke', theme.palette.grey[700]);

    boxContainer
      .append('rect')
      .attr('x', d => x(d.q1))
      .attr(
        'y',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr('width', d => x(d.q3) - x(d.q1))
      .attr('height', rectHeight)
      .attr('fill', d => colour(d.tissueSiteDetailId))
      .on('mouseover', function(d) {
        var X =
          parseFloat(select(this).attr('x')) +
          parseFloat(select(this).attr('width')) +
          tooltipSettings['offsetX'];
        var Y = parseFloat(select(this).attr('y')) + tooltipSettings['offsetY'];

        tooltipText
          .attr('y', Y)
          .html(
            buildTooltip(
              X + tooltipSettings['offsetText'],
              tooltipTextFields,
              d
            )
          )
          .style('visibility', 'visible');

        const bbox = tooltip
          .select('text')
          .node()
          .getBBox();

        // keep tooltip box within SVG (X axis)
        if (margin.left + X + bbox.width + margin.right > width) {
          X = width - margin.right - bbox.width - margin.left;
          // re-build tooltip string; this is necessary because the X coordinate
          // is part of the tooltip string
          tooltipText.html(
            buildTooltip(
              X + tooltipSettings['offsetText'],
              tooltipTextFields,
              d
            )
          );
        }

        // keep tooltip box within SVG (Y axis)
        if (margin.top + Y + bbox.height + margin.bottom > height) {
          Y = height - margin.top - bbox.height - margin.bottom;
          tooltipText.attr('y', Y);
        }

        tooltipRect
          .attr('x', X)
          .attr('y', Y)
          .attr('width', bbox.width + 10)
          .attr('height', bbox.height + 10)
          .style('visibility', 'visible');
      })
      .on('mouseout', function() {
        tooltipRect.style('visibility', 'hidden');
        tooltipText.style('visibility', 'hidden');
      });

    boxContainer
      .append('line')
      .attr('x1', d => x(d.median))
      .attr('x2', d => x(d.median))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', theme.palette.grey[700])
      .attr('stroke-width', 2);

    boxContainer
      .append('line')
      .attr('x1', d => x(d.lowerLimit))
      .attr('x2', d => x(d.lowerLimit))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', theme.palette.grey[700]);

    boxContainer
      .append('line')
      .attr('x1', d => x(d.upperLimit))
      .attr('x2', d => x(d.upperLimit))
      .attr(
        'y1',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) - rectHeight / 2
      )
      .attr(
        'y2',
        d => y(d.tissueSiteDetailId.replace(/_/g, ' ')) + rectHeight / 2
      )
      .attr('stroke', theme.palette.grey[700]);

    boxContainer
      .selectAll('circle')
      .data(d => {
        return d.outliers.map(outlier => ({
          tissueSiteDetailId: d.tissueSiteDetailId,
          outlier,
        }));
      })
      .join('circle')
      .attr('r', outlierRadius)
      .attr('cx', d => x(d.outlier))
      .attr('cy', d => y(d.tissueSiteDetailId.replace(/_/g, ' ')))
      .attr('fill', 'none')
      .attr('stroke', theme.palette.grey[700]);

    const xAxis = axisTop(x);
    const yAxis = axisLeft(y);

    const customAxis = (g, axis) => {
      g.call(axis);
      g.select('.domain').attr('stroke', theme.palette.grey[700]);
      g.selectAll('.tick line').attr('stroke', theme.palette.grey[700]);
      g.selectAll('.tick text').attr('fill', theme.palette.grey[700]);
    };

    select(this.xAxisRef.current).call(customAxis, xAxis);
    select(this.yAxisRef.current).call(customAxis, yAxis);
  }
}

export default withTheme(GtexVariability);
