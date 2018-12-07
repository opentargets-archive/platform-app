import React, { Component } from 'react';
import * as d3 from 'd3';
import { withContentRect } from 'react-measure';

import { PHASE_MAP } from '../constants';

const margin = { top: 5, right: 20, bottom: 40, left: 50 };
const OUTER_HEIGHT = 180;

class TrialsHistogram extends Component {
  countScale = d3.scaleLinear();
  phaseScale = d3.scaleBand();

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const { measureRef } = this.props;

    return (
      <div ref={measureRef}>
        <svg
          ref={node => (this.svgRef = node)}
          xmlns="http://www.w3.org/2000/svg"
          width={this._width()}
          height={OUTER_HEIGHT}
        >
          <g
            transform={`translate(${margin.left},${margin.top})`}
            fill="#7b196a"
          />
        </svg>
      </div>
    );
  }

  _width() {
    return this.props.contentRect.bounds.width;
  }

  _render() {
    const { trialsByPhase, drugCount } = this.props;
    const { countScale, phaseScale } = this;
    const outerWidth = this._width();

    if (!outerWidth) return;

    const width = outerWidth - margin.left - margin.right;
    const height = OUTER_HEIGHT - margin.top - margin.bottom;

    countScale
      .domain([0, d3.max(trialsByPhase, d => d.trialCount)])
      .range([height, 0]);

    phaseScale.domain(trialsByPhase.map(d => d.phase)).range([0, width]);

    const svg = d3.select(this.svgRef);
    const plot = svg.select('g');

    const xAxis = d3.axisBottom(phaseScale);
    const yAxis = d3.axisLeft(countScale).tickArguments([5]);

    this._renderPhaseAxis(plot, xAxis, width, height, drugCount);
    this._renderCountAxis(plot, yAxis, height, drugCount);
    this._renderBars(plot, phaseScale, countScale, trialsByPhase);
  }

  _renderPhaseAxis(plot, xAxis, width, height, drugCount) {
    let g = plot.select('.axis.axis--phase');
    if (g.empty()) {
      g = plot.append('g').attr('class', 'axis axis--phase');
    }
    g.attr('transform', `translate(0,${height})`).call(
      xAxis.tickFormat(d => PHASE_MAP[d])
    );

    g.select('path').attr('stroke', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');
    const ticks = g.selectAll('.tick');

    ticks
      .selectAll('line')
      .attr('stroke', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');

    ticks.selectAll('text').attr('fill', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');

    let label = g.select('.axis-label.axis-label--phase');
    if (label.empty()) {
      label = g
        .append('text')
        .attr('class', 'axis-label axis-label--phase')
        .attr('dy', 30)
        .attr('fill', drugCount > 0 ? '#5A5F5F' : '#E2DFDF')
        .text('Phase');
    }
    label.attr('dx', width / 2);
  }

  _renderCountAxis(plot, yAxis, height, drugCount) {
    let g = plot.select('.axis.axis--count');
    if (g.empty()) {
      g = plot.append('g').attr('class', 'axis axis--count');
    }
    g.call(yAxis);

    g.select('path').attr('stroke', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');
    const ticks = g.selectAll('.tick');

    ticks
      .selectAll('line')
      .attr('stroke', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');

    ticks.selectAll('text').attr('fill', drugCount > 0 ? '#5A5F5F' : '#E2DFDF');

    const label = g.select('.axis-label.axis-label--count');
    if (label.empty()) {
      g.append('text')
        .attr('class', 'axis-label axis-label--count')
        .attr('transform', 'rotate(-90)')
        .attr('dx', -height / 2 + 40)
        .attr('dy', -35)
        .attr('fill', drugCount > 0 ? '#5A5F5F' : '#E2DFDF')
        .text('Number of trials');
    }
  }

  _renderBars(plot, phaseScale, countScale, trialsByPhase) {
    const bars = plot.selectAll('rect').data(trialsByPhase);
    bars
      .enter()
      .append('rect')
      .attr('y', d => countScale(d.trialCount))
      .attr('height', d => countScale(0) - countScale(d.trialCount))
      .merge(bars)
      .attr('x', d => phaseScale(d.phase))
      .attr('width', phaseScale.bandwidth());

    bars.exit().remove();
  }
}

export default withContentRect('bounds')(TrialsHistogram);
