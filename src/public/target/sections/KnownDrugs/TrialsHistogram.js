import React, { Component } from 'react';
import * as d3 from 'd3';
import { withContentRect } from 'react-measure';
import { PHASE_MAP } from '../../constants';

const margin = { top: 5, right: 20, bottom: 30, left: 50 };
const HEIGHT = 122;

class TrialsHistogram extends Component {
  state = {};

  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft().tickArguments([5]);

  static getDerivedStateFromProps(props) {
    const { trialsByPhase, contentRect } = props;
    const { width = 0 } = contentRect.bounds;

    const xScale = d3
      .scaleBand()
      .padding(0.2)
      .domain(trialsByPhase.map(trial => trial.phase))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(trialsByPhase, trial => trial.trialCount)])
      .range([HEIGHT - margin.bottom, margin.top]);

    const bars = trialsByPhase.map(trial => ({
      x: xScale(trial.phase),
      y: yScale(trial.trialCount),
      width: xScale.bandwidth(),
      height: yScale(0) - yScale(trial.trialCount),
    }));

    return { bars, width, xScale, yScale };
  }

  componentDidUpdate() {
    const { drugCount: count } = this.props;
    const { xScale, yScale } = this.state;
    this.xAxis.scale(xScale);
    this.yAxis.scale(yScale);
    const xAxisEl = d3.select(this.refs.xAxis);
    const yAxisEl = d3.select(this.refs.yAxis);
    xAxisEl.call(this.xAxis.tickFormat(d => PHASE_MAP[d]));
    yAxisEl.call(this.yAxis);
    const xTicks = xAxisEl.selectAll('.tick');
    const yTicks = yAxisEl.selectAll('.tick');

    xAxisEl.select('path').attr('stroke', count > 0 ? '#5A5F5F' : '#E2DFDF');
    xTicks.selectAll('line').attr('stroke', count > 0 ? '#5A5F5F' : '#E2DFDF');
    xTicks.selectAll('text').attr('fill', count > 0 ? '#5A5F5F' : '#E2DFDF');

    yAxisEl.select('path').attr('stroke', count > 0 ? '#5A5F5F' : '#E2DFDF');
    yTicks.selectAll('line').attr('stroke', count > 0 ? '#5A5F5F' : '#E2DFDF');
    yTicks.selectAll('text').attr('fill', count > 0 ? '#5A5F5F' : '#E2DFDF');
  }

  render() {
    const { drugCount, measureRef } = this.props;
    const { bars, width } = this.state;

    return (
      <div ref={measureRef}>
        <svg width={width} height={HEIGHT}>
          {bars.map((bar, i) => {
            return (
              <rect
                key={i}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill="#7b196a"
              />
            );
          })}
          <g
            ref="xAxis"
            transform={`translate(0, ${HEIGHT - margin.bottom})`}
          />
          <text
            x={width / 2}
            y={HEIGHT}
            dx="-3"
            fontSize="10"
            fill={drugCount > 0 ? '#5A5F5F' : '#E2DFDF'}
          >
            Phase
          </text>
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
          <text
            x="15"
            y="80"
            fontSize="10"
            transform={`rotate(-90 15,80)`}
            fill={drugCount > 0 ? '#5A5F5F' : '#E2DFDF'}
          >
            Number of trials
          </text>
        </svg>
      </div>
    );
  }
}

export default withContentRect('bounds')(TrialsHistogram);
