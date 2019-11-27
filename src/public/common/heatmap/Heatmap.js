import React from 'react';
import { withContentRect } from 'react-measure';

class Heatmap extends React.Component {
  state = {};
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }
  componentDidMount() {
    this._render();
  }
  componentDidUpdate() {
    this._render();
  }
  render() {
    const { measureRef, rowsPerPage = 20 } = this.props;
    const { width } = this.state;
    const margin = { left: 100, right: 20, top: 250, bottom: 20 };
    const heightPerRow = 50;
    const heatmapHeight = rowsPerPage * heightPerRow;
    const height = heatmapHeight + margin.top + margin.bottom;

    return (
      <div ref={measureRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <g className="heatmap-rows" />
          <g className="heatmap-column-labels" />
          <g className="heatmap-column-sliders" />
          <g className="heatmap-column-sorters" />
        </svg>
      </div>
    );
  }
  _render() {
    // TODO
  }
}

export default withContentRect('bounds')(Heatmap);
