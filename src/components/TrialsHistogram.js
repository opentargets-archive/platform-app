import React, { Component } from 'react';
import * as d3 from 'd3';
import { withContentRect } from 'react-measure';

const margin = { top: 20, right: 20, bottom: 20, left: 20 };

class TrialsHistogram extends Component {
  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const { measureRef, contentRect } = this.props;
    const { width } = contentRect.bounds;

    return (
      <div ref={measureRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height="180">
          <g transform={`translate(${margin.left},${margin.top})`} />
        </svg>
      </div>
    );
  }

  _render() {}
}

export default withContentRect('bounds')(TrialsHistogram);
