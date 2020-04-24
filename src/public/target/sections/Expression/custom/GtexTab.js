import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';
import Typography from '@material-ui/core/Typography';

import { Link, DownloadSVGPlot } from 'ot-ui';

import GtexVariability from './GtexVariability';

const transformData = data => {
  return data.map(d => {
    // d3 requires for the array of values to be sorted before using median and quantile
    d.data.sort((a, b) => a - b);
    const median = d3.median(d.data);
    const q1 = d3.quantile(d.data, 0.25);
    const q3 = d3.quantile(d.data, 0.75);
    const outliers = [];
    const notoutliers = [];
    const iqr = q3 - q1; // interquartile range

    // find the outliers and not outliers
    d.data.forEach(d => {
      if (d < q1 - 1.5 * iqr || d > q3 + 1.5 * iqr) {
        outliers.push(d);
      } else {
        notoutliers.push(d);
      }
    });

    return {
      tissueSiteDetailId: d.tissueSiteDetailId,
      median,
      q1,
      q3,
      lowerLimit: notoutliers[0],
      upperLimit: notoutliers[notoutliers.length - 1],
      outliers,
    };
  });
};

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
            this.setState({
              loading: false,
              data: transformData(body.geneExpression),
            });
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
