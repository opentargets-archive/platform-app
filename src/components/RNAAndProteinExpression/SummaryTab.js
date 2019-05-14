import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'ot-ui';

const query = gql`
  query ExpressionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        expression {
          rows {
            uberonId
            label
            organs
          }
        }
      }
    }
  }
`;

const styles = () => ({
  description: {
    fontStyle: 'italic',
  },
});

class SummaryTab extends Component {
  render() {
    const { symbol, classes } = this.props;
    return (
      <Fragment>
        <Typography className={classes.description}>
          Summary of {symbol} RNA and protein expression in normal human tissue,
          based on Human Protein Atlas normal tissue immunohistochemistry,
          RNA-seq expression data and Expression Atlas data.
        </Typography>
        <Typography>
          Sources:{' '}
          <Link external to="http://www.proteinatlas.org">
            Human Protein Atlas
          </Link>
          ,{' '}
          <Link
            external
            to=" https://docs.targetvalidation.org/data-sources/rna-expression#expression-atlas"
          >
            Expression Atlas
          </Link>
        </Typography>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTab);
