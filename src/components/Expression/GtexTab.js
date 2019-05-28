import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';

import GtexVariability from './GtexVariability';

class GtexTab extends Component {
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
        {!loading && <GtexVariability data={data} />}
      </Fragment>
    );
  }
}

export default GtexTab;
