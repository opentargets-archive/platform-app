import React from 'react';
import { withContentRect } from 'react-measure';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';

import { Link } from 'ot-ui';

import targetGeneTree from 'cttv.targetGeneTree';

// // TODO: update tntvis to use the latest version of d3 (not v3 as here)
// // this file is a tweaked version of that in the `tnt.tooltip` dep
// const d3 = window.d3;

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
    const { symbol, measureRef } = this.props;
    return (
      <div id="otTargetGeneTreeContainer" ref={measureRef}>
        <Typography>
          <i>
            Phylogenetic tree showing the history of the human gene {symbol}{' '}
            based on protein sequences from Ensembl. All branches in this tree
            have the same length (unscaled branches). You can also view the
            branches in different lengths based on the number of evolutionary
            changes in the tree (select scaled branches) All species are shown
            by default, but you can prune it to a subset of species by unticking
            the species accordingly. Learn more about{' '}
            <Link
              external
              to="https://www.ensembl.org/info/genome/compara/homology_method.html"
            >
              protein trees
            </Link>{' '}
            and{' '}
            <Link
              external
              to="https://www.ensembl.org/info/genome/compara/homology_types.html"
            >
              orthologies
            </Link>
            .
          </i>
        </Typography>
        <Typography variant="caption">
          Source:
          <Link external to="http://www.ensembl.org">
            Ensembl
          </Link>
        </Typography>
        <div id="otTargetGeneTree" />
      </div>
    );
  }
}

export default withContentRect('bounds')(GeneTreeTab);
