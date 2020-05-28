import React from 'react';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import gql from 'graphql-tag';

import { Link, DataDownloader } from 'ot-ui';

import SummaryTable from './SummaryTable';

const EXPRESSION_QUERY = gql`
  query ExpressionQuery($ensemblId: String!) {
    target(ensemblId: $ensemblId) {
      id
      expressions {
        tissue {
          label
          organs
          anatomicalSystems
        }
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
`;

const styles = () => ({
  description: {
    fontStyle: 'italic',
  },
});

const headers = [
  { id: 'label', label: 'Tissue' },
  { id: 'organs', label: 'Organs' },
  { id: 'anatomicalSystems', label: 'Anatomical Systems' },
  { id: 'rna', label: 'RNA' },
  { id: 'protein', label: 'Protein' },
];

const getDownloadRows = expressions => {
  return expressions.map(expression => ({
    label: expression.tissue.label,
    organs: expression.tissue.organs.join(','),
    anatomicalSystems: expression.tissue.anatomicalSystems.join(','),
    rna: expression.rna.value,
    protein: expression.protein.level,
  }));
};

const SummaryPanel = ({ ensgId, symbol }) => {
  const { loading, error, data } = useQuery(EXPRESSION_QUERY, {
    variables: { ensemblId: ensgId },
  });

  if (loading || error) return null;

  const { expressions } = data.target;

  return (
    <Grid container justify="center">
      <Grid item md={6}>
        <DataDownloader
          tableHeaders={headers}
          rows={getDownloadRows(expressions)}
          fileStem={`${symbol}-expression`}
        />
        <SummaryTable data={expressions} />
      </Grid>
    </Grid>
  );
};

const SummaryTab = ({ ensgId, symbol, classes }) => {
  return (
    <>
      <Typography className={classes.description}>
        Summary of {symbol} RNA and protein expression in normal human tissue,
        based on Human Protein Atlas normal tissue immunohistochemistry, RNA-seq
        expression data and Expression Atlas data.
      </Typography>
      <Typography variant="caption">
        Sources:{' '}
        <Link external to="http://www.proteinatlas.org">
          Human Protein Atlas
        </Link>
        ,{' '}
        <Link
          external
          to="https://docs.targetvalidation.org/data-sources/rna-expression#expression-atlas"
        >
          Expression Atlas
        </Link>
        <SummaryPanel ensgId={ensgId} symbol={symbol} />
      </Typography>
    </>
  );
};

export default withStyles(styles)(SummaryTab);
