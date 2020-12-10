import React from 'react';
import { Typography } from '@material-ui/core';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

import board from 'tnt.genome';
import cttvApi from 'cttv.api';

import Description from './Description';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import targetGenomeBrowser from 'cttv.genome';

// TODO: Currently, when a resize occurs, we just
// redraw the widget, meaning internal state is lost.
// Ideally, this should use componentDidUpdate, but
// some investigation needs to be done into tntvis.
class Section extends React.Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  _render = (ensgId, width) => {
    // clear previous (if existed)
    d3.select('#otTargetGenomeBrowser')
      .selectAll('*')
      .remove();

    // draw
    const browser = board
      .genome()
      .species('human')
      .gene(ensgId)
      .context(20)
      .width(width);

    browser
      .rest()
      .prefix('')
      .protocol('https')
      .domain('rest.ensembl.org');

    const api = cttvApi()
      .prefix('https://platform-api.opentargets.io')
      .verbose(false);

    const theme = targetGenomeBrowser()
      .efo(null)
      .cttvRestApi(api);

    theme(browser, document.getElementById('otTargetGenomeBrowser'));

    this.browser = browser;
  };

  componentDidMount() {
    const { id: ensgId } = this.props;
    const { width } = this.state;
    this._render(ensgId, width);
  }
  componentDidUpdate() {
    const { id: ensgId } = this.props;
    const { width } = this.state;
    if (this.browser.width() !== width) {
      this._render(ensgId, width);
    }
  }
  render() {
    const { definition, id: ensgId, label: symbol, measureRef } = this.props;
    return (
      <SectionItem
        definition={definition}
        request={{ data: true }}
        renderDescription={() => <Description symbol={symbol} />}
        renderBody={() => (
          <div id="otTargetGenomeBrowserContainer" ref={measureRef}>
            <Typography>
              <strong>Gene information</strong>
            </Typography>
            <Typography variant="body2">
              <strong>Ensembl ID: </strong>
              <Link
                external
                to={`http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${ensgId}`}
              >
                {ensgId}
              </Link>
              <br />
              <strong>Description: </strong>
              {symbol}
            </Typography>
            <div id="otTargetGenomeBrowser" />
          </div>
        )}
      />
    );
  }
}

export default withContentRect('bounds')(Section);
