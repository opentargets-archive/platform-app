import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { loader } from 'graphql.macro';
import client from '../../../client';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

import Grid from '@material-ui/core/Grid';

// import { Heatmap } from '../../../components/Heatmap';
// import * as d3 from 'd3';

const INTERACTIONS_QUERY = loader('./sectionStringQuery.gql');
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
      id: 'partner',
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
          {/* {row.organism.mnemonic.toLowerCase() !== 'human' ? (
            <>
              <br />
              <Typography variant="caption">
                Species: {row.organism.mnemonic}
              </Typography>
            </>
          ) : null} */}
        </>
      ),
    },
    {
      id: 'overallScore',
      label: (
        <>
          Overall
          <br />
          interaction score
        </>
      ),
      renderCell: row => row.scoring,
    },
    {
      id: 'neighbourhood',
      label: 'Neighbourhood',
      renderCell: row =>
        filterStringEvidence(row.evidences, 'gene neighbourhood'),
    },
    {
      id: 'geneFusion',
      label: 'Gene fusion',
      renderCell: row => filterStringEvidence(row.evidences, 'domain fusion'),
    },
    {
      id: 'occurance',
      label: 'Co-occurrance',
      renderCell: row => filterStringEvidence(row.evidences, 'cooccurence'),
    },
    {
      id: 'expression',
      label: 'Co-expression',
      renderCell: row => filterStringEvidence(row.evidences, 'coexpression'),
    },
    {
      id: 'experiments',
      label: 'Experiments',
      renderCell: row => filterStringEvidence(row.evidences, 'experimental'),
    },
    {
      id: 'databases',
      label: 'Databases',
      renderCell: row => filterStringEvidence(row.evidences, 'database'),
    },
    {
      id: 'textMining',
      label: 'Text mining',
      renderCell: row => filterStringEvidence(row.evidences, 'text mining'),
    },
    {
      id: 'homology',
      label: 'Homology',
      renderCell: row => filterStringEvidence(row.evidences, 'by homology'),
    },
  ],
};

const filterStringEvidence = (evidences, id) => {
  return evidences
    .filter(e => e.interactionDetectionMethodShortName === id)
    .map(e => e.evidenceScore);
};

const id = 'string';
const index = 0;
const size = 5000;

function StringTab({ ensgId, symbol }) {
  const [data, setData] = useState([]);

  // load tab data when new tab selected (also on first load)
  useEffect(
    () => {
      getData(ensgId, id, index, size).then(res => {
        if (res.data.target.interactions) {
          setData(res.data.target.interactions.rows);
        }
      });
    },
    [ensgId]
  );

  // TODO: re-enable for heatmap
  // const scaleAssociation = d3
  //         .scaleLinear()
  //         .domain([0, 1])
  //         .range([
  //           '#f00',
  //           '#fff'
  //         ])
  //         .unknown('#fff');

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {/* table 1: this is the only table and will need to be a HEATMAP */}
        <DataTable
          showGlobalFilter
          columns={columns.interactions}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-string`}
          hover
        />
        {/* <Heatmap
            rowIdAccessor={row => row.targetB ? row.targetB.approvedSymbol : row.intB}
            labelAccessor={row => row.targetB ? row.targetB.approvedSymbol : row.intB}
            rows={stringData}
            columnGroups={[
                {
                  id: '',
                  columns: columns.string.interactions
                },
              ]}
            rowsPerPage={10}
            onLabelMouseover={()=>null}
          /> */}
      </Grid>
    </Grid>
  );
}

export default StringTab;
