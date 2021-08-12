import React from 'react';
import { withContentRect } from 'react-measure';

// TODO: update tntvis to use the latest version of d3 (not v3 as here)
// this file is a tweaked version of that in the `tnt.tooltip` dep
const d3 = window.d3;

// TODO: Currently, when a resize occurs, we just
// redraw the widget, meaning internal state is lost.
// Ideally, this should use componentDidUpdate, but
// some investigation needs to be done into tntvis.
class GeneTreeTab extends React.Component {
  state = { componentLoaded: false };

  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  _render = (ensgId, width) => {
    if (!this.state.componentLoaded) return;

    // clear previous (if existed)
    d3.select('#otTargetGeneTree')
      .selectAll('*')
      .remove();

    // draw
    const geneTree = this.targetGeneTree()
      .id(ensgId)
      .width(width)
      .proxy('https://rest.ensembl.org');
    geneTree(document.getElementById('otTargetGeneTree'));
    this.geneTree = geneTree;
  };

  async componentDidMount() {
    await Promise.all([
      import('tntvis'),
      import('tnt.utils'),
      import('tnt.rest'),
    ]);
    const [tooltip, targetGeneTree] = await Promise.all([
      import('../../../utils/tooltip'),
      import('cttv.targetGeneTree'),
    ]);

    window.tnt.tooltip = tooltip.default;

    this.targetGeneTree = targetGeneTree.default;
    this.setState({ componentLoaded: true });

    const { ensgId } = this.props;
    const { width } = this.state;
    this._render(ensgId, width);
  }

  componentDidUpdate() {
    const { ensgId } = this.props;
    const { width } = this.state;
    if (this.geneTree?.width() !== width) {
      this._render(ensgId, width);
    }
  }

  render() {
    const { measureRef } = this.props;
    const { componentLoaded } = this.state;

    if (!componentLoaded) return <>Loading...</>;

    return (
      <div id="otTargetGeneTreeContainer" ref={measureRef}>
        <div id="otTargetGeneTree" />
      </div>
    );
  }
}

export default withContentRect('bounds')(GeneTreeTab);
