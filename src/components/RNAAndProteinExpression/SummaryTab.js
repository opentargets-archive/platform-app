import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link, DataDownloader } from 'ot-ui';

import SummaryTable from './SummaryTable';

const query = gql`
  query ExpressionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        expression {
          rows {
            label
            organs
            anatomicalSystems
            rna {
              value
              level
            }
            protein {
              level
            }
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

const headers = [
  { id: 'label', label: 'Tissue' },
  { id: 'organs', label: 'Organs' },
  { id: 'anatomicalSystems', label: 'Anatomical Systems' },
  { id: 'rna', label: 'RNA' },
  { id: 'protein', label: 'Protein' },
];

const getDownloadRows = tissues => {
  return tissues.map(tissue => ({
    label: tissue.label,
    organs: tissue.organs.join(','),
    anatomicalSystems: tissue.anatomicalSystems.join(','),
    rna: tissue.rna.value,
    protein: tissue.protein.level,
  }));
};

class SummaryTab extends Component {
  render() {
    const { ensgId, symbol, classes } = this.props;

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

            const tissues = data.target.details.expression.rows;

            return (
              <Fragment>
                <DataDownloader
                  tableHeaders={headers}
                  rows={getDownloadRows(tissues)}
                  fileStem={`${symbol}-expression`}
                />
                <SummaryTable tissues={tissues} />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTab);
