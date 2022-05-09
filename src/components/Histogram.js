import React from 'react';
import { max, select } from 'd3';

class Histogram extends React.Component {
  update = () => {
    const { id, data } = this.props;
    const maxLength = max(data, d => d.length);
    const barsContainer = select(`#histogram-${id} g`);

    const bars = barsContainer.selectAll('rect').data(data);

    bars
      .enter()
      .append('rect')
      .merge(bars)
      .attr('x', d => 1 - (maxLength ? d.length / maxLength : 0))
      .attr('y', d => 1 - d.x1)
      .attr('width', d => (maxLength ? d.length / maxLength : 0))
      .attr('height', d => d.x1 - d.x0);

    bars.exit().remove();
  };
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }
  render() {
    const { id, color } = this.props;
    return (
      <svg
        id={`histogram-${id}`}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
      >
        <g fill={color} />
        <g>
          <line x1="1" y1="0" x2="1" y2="1" stroke="#ccc" strokeWidth="0.04" />
        </g>
      </svg>
    );
  }
}

export default Histogram;
