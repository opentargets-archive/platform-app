import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { loader } from 'graphql.macro';
import client from '../../../client';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

import Grid from '@material-ui/core/Grid';

const INTERACTIONS_QUERY = loader('./sectionQuery.gql');
const getData = (ensgId, sourceDatabase, index, size) => {
  return client.query({
    query: INTERACTIONS_QUERY,
    variables: {
      ensgId,
      sourceDatabase,
      index,
      size,
    },
  });
};

const columns = {
  interactions: [
    {
      id: 'targetB',
      label: (
        <>
          Interactor B
          {/* <br />
            <Typography variant="caption">
            Alt ID
            <br />
            Species
            </Typography> */}
        </>
      ),
      renderCell: row => (
        <>
          {row.targetB ? row.targetB.approvedSymbol : row.intB}
          {/* <br />
            <Typography variant="caption">
            {row.organismB.taxon_id}
            <br />
            Human
            </Typography> */}
        </>
      ),
    },
    {
      id: 'scoring',
      label: 'Score',
      renderCell: row => row.scoring,
    },
    {
      id: 'evidences',
      label: 'Interaction evidence',
      renderCell: row => row.count,
      //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
    },
  ],

  evidence: [
    {
      id: 'interactionIdentifier',
      label: 'Identifier',
    },
    {
      id: 'interaction',
      label: (
        <>
          Interaction
          <br />
          <Typography variant="caption">Host organism</Typography>
        </>
      ),
      renderCell: row => (
        <>
          {row.interactionTypeShortName}
          <br />
          <Typography variant="caption">
            {row.hostOrganismScientificName}
          </Typography>
        </>
      ),
    },
    {
      id: 'methods',
      label: 'Detection methods',
      renderCell: row => (
        <>
          <MethodIconText>A</MethodIconText>
          <MethodIconArrow />
          <MethodIconText>B</MethodIconText>
        </>
      ),
    },
    {
      id: 'pubmedId',
      label: 'Publication',
    },
  ],
};

const id = 'intact';
const index = 0;
const size = 5000;

function IntactTab({ ensgId, symbol }) {
  const [data, setData] = useState([]);
  const [evidence, setEvidence] = useState([]);

  // load tab data when new tab selected (also on first load)
  useEffect(
    () => {
      getData(ensgId, id, index, size).then(res => {
        if (res.data.target.interactions) {
          setData(res.data.target.interactions.rows);
          setEvidence(res.data.target.interactions.rows[0].evidences);
        }
      });
    },
    [ensgId]
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        {/* table 1: interactions */}
        <DataTable
          showGlobalFilter
          columns={columns.interactions}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
          hover
          selected
          onRowClick={(r, i) => {
            setEvidence(r.evidences);
          }}
          rowIsSelectable
        />
      </Grid>

      {/* table 2: evidence */}
      <Grid item xs={12} md={7}>
        <DataTable
          showGlobalFilter
          columns={columns.evidence}
          rows={evidence}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
        />
      </Grid>
    </Grid>
  );
}

export default IntactTab;
