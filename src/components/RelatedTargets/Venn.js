import React from 'react';
import * as venn from 'venn.js';
import * as d3 from 'd3';

class Venn extends React.Component {
  componentDidMount() {
    this.renderVenn();
  }
  componentDidUpdate() {
    this.renderVenn();
  }
  render() {
    return (
      <div
        ref={el => {
          this.ref = el;
        }}
      />
    );
  }
  renderVenn = () => {
    const { sets } = this.props;
    var chart = venn
      .VennDiagram()
      .width(150)
      .height(75);

    d3.select(this.ref)
      .datum(sets)
      .call(chart);
  };
}

export default Venn;
