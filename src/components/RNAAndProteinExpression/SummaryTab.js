import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link, Button } from 'ot-ui';

import SummaryTable from './SummaryTable';

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
  inlineBlock: {
    display: 'inline-block',
  },
});

class SummaryTab extends Component {
  state = { groupBy: 'organs' };

  handleChange = (_, groupBy) => {
    this.setState({ groupBy });
  };

  render() {
    const { ensgId, symbol, classes } = this.props;
    const { groupBy } = this.state;

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
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            return <SummaryTable data={data.target.details.expression.rows} />;
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTab);
