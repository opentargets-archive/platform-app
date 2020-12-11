import React from 'react';
import { Typography } from '@material-ui/core';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

import Description from './Description';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';

// TODO: Currently, when a resize occurs, we just
// redraw the widget, meaning internal state is lost.
// Ideally, this should use componentDidUpdate, but
// some investigation needs to be done into tntvis.
class Section extends React.Component {
  state = { componentLoaded: false };

  async componentDidMount() {
    await import('tntvis');

    const board = await import('tnt.genome');
    this.board = board.default;

    const cttvApi = await import('cttv.api');
    this.cttvApi = cttvApi.default;

    const targetGenomeBrowser = await import('cttv.genome');
    this.targetGenomeBrowser = targetGenomeBrowser.default;

    this.setState({ componentLoaded: true });

    const { id: ensgId } = this.props;
    const { width } = this.state;
    this._render(ensgId, width);
  }

  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  _render = (ensgId, width) => {
    if (!this.state.componentLoaded) return;

    // clear previous (if existed)
    d3.select('#otTargetGenomeBrowser')
      .selectAll('*')
      .remove();

    // draw
    const browser = this.board
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

    const api = this.cttvApi()
      .prefix('https://platform-api.opentargets.io')
      .verbose(false);

    const theme = this.targetGenomeBrowser()
      .efo(null)
      .cttvRestApi(api);

    theme(browser, document.getElementById('otTargetGenomeBrowser'));

    this.browser = browser;
  };

  componentDidUpdate() {
    const { id: ensgId } = this.props;
    const { width } = this.state;
    if (this.browser?.width() !== width) {
      this._render(ensgId, width);
    }
  }
  render() {
    const { definition, id: ensgId, label: symbol, measureRef } = this.props;
    const { componentLoaded } = this.state;

    return (
      <SectionItem
        definition={definition}
        request={{ data: true }}
        renderDescription={() => <Description symbol={symbol} />}
        renderBody={() => {
          if (!componentLoaded) return <>Loading...</>;

          return (
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
          );
        }}
      />
    );
  }
}

export default withContentRect('bounds')(Section);
