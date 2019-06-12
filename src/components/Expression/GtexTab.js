import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, DownloadSVGPlot } from 'ot-ui';

import GtexVariability from './GtexVariability';

class GtexTab extends Component {
  gtexVariability = React.createRef();

  state = {
    loading: true,
  };

  componentDidMount() {
    const { symbol } = this.props;
    fetch(
      `https://www.gtexportal.org/rest/v1/reference/gene?geneId=${symbol}&v=clversion`
    )
      .then(res => res.json())
      .then(body => {
        const { gencodeId } = body.gene[0];
        fetch(
          `https://www.gtexportal.org/rest/v1/expression/geneExpression?boxplotDetail=full&gencodeId=${gencodeId}`
        )
          .then(res => res.json())
          .then(body => {
            this.setState({ loading: false, data: body.geneExpression });
          });
      });
  }

  render() {
    const { symbol } = this.props;
    const { loading, data } = this.state;

    return (
      <Fragment>
        <Typography>
          Baseline expression variation based on GTEx experiments.
        </Typography>
        <Typography variant="caption">
          Source:{' '}
          <Link external to="https://www.gtexportal.org/home/documentationPage">
            GTEx
          </Link>
        </Typography>
        {!loading && (
          <DownloadSVGPlot
            svgContainer={this.gtexVariability}
            filenameStem={`${symbol}-gtex`}
          >
            <GtexVariability data={data} ref={this.gtexVariability} />
          </DownloadSVGPlot>
        )}
      </Fragment>
    );
  }
}

export default GtexTab;
