import React from 'react';
import targetGeneTree from 'cttv.targetGeneTree';
import { withContentRect } from 'react-measure';

export function getData(ensgId) {
  console.log('getting genetretab data');
  return { hi: ensgId };
}

// TODO: update tntvis to use the latest version of d3 (not v3 as here)
// this file is a tweaked version of that in the `tnt.tooltip` dep
const d3 = window.d3;

// TODO: Currently, when a resize occurs, we just
// redraw the widget, meaning internal state is lost.
// Ideally, this should use componentDidUpdate, but
// some investigation needs to be done into tntvis.
class GeneTreeTab extends React.Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  _render = (ensgId, width) => {
    // clear previous (if existed)
    d3.select('#otTargetGeneTree')
      .selectAll('*')
      .remove();

    // draw
    const geneTree = targetGeneTree()
      .id(ensgId)
      .width(width)
      .proxy('https://rest.ensembl.org');
    geneTree(document.getElementById('otTargetGeneTree'));
    this.geneTree = geneTree;
  };
  componentDidMount() {
    const { ensgId } = this.props;
    const { width } = this.state;
    this._render(ensgId, width);
  }
  componentDidUpdate() {
    const { ensgId } = this.props;
    const { width } = this.state;
    if (this.geneTree.width() !== width) {
      this._render(ensgId, width);
    }
  }
  render() {
    const { measureRef } = this.props;
    return (
      <div id="otTargetGeneTreeContainer" ref={measureRef}>
        <div id="otTargetGeneTree" />
      </div>
    );
  }
}

export default withContentRect('bounds')(GeneTreeTab);
