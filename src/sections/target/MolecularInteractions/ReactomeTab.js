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
  // interactions table columns
  interactions: [
    {
      id: 'targetB',
      label: (
        <>
          Interactor B
          {/* <br />
          <Typography variant="caption">Species (if not human)</Typography> */}
        </>
      ),
      renderCell: row => (
        <>
          {row.targetB ? row.targetB.approvedSymbol : row.intB}
          {/* {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
            <>
              <br />
              <Typography variant="caption">
                Species: {row.organismB.mnemonic}
              </Typography>
            </>
          ) : null} */}
        </>
      ),
    },
    {
      id: 'sizeEvidences',
      label: <>Interaction evidence</>,
      renderCell: row => row.count,
    },
  ],

  // evidence table
  evidence: [
    {
      id: 'interactionIdentifier',
      label: 'ID',
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
            Organism: {row.hostOrganismScientificName}
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

const id = 'reactome';
const index = 0;
const size = 5000;

function ReactomeTab({ ensgId, symbol }) {
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
          dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
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
          dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
        />
      </Grid>
    </Grid>
  );
}

export default ReactomeTab;
