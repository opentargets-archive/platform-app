import React from 'react';
import { loader } from 'graphql.macro';
import { Grid } from '@material-ui/core';
import client from '../../../client';

import DataDownloader from '../../../components/DataDownloader';
import SummaryTable from './SummaryTable';

const EXPRESSION_QUERY = loader('./ExpressionQuery.gql');

export function getData(ensgId) {
  return client.query({
    query: EXPRESSION_QUERY,
    variables: { ensemblId: ensgId },
  });
}

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

function SummaryTab({ symbol, data }) {
  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={8}>
        <DataDownloader
          tableHeaders={headers}
          rows={getDownloadRows(data.target.expressions)}
          fileStem={`${symbol}-expression`}
        />
        <SummaryTable data={data.target.expressions} />
      </Grid>
    </Grid>
  );
}

export default SummaryTab;
