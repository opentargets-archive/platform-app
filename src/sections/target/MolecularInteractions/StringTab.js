import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { loader } from 'graphql.macro';
import client from '../../../client';
import { withTheme } from '@material-ui/core';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

import Grid from '@material-ui/core/Grid';

import {
  Heatmap,
  HeatmapTable,
  HeatmapCell,
} from '../../../components/Heatmap';
import * as d3 from 'd3';

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
      verticalHeader: true,
      align: 'center',
      // firstInHeaderGroup: true,
      // lastInHeaderGroup: true,
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
      verticalHeader: true,
      align: 'center',
      // renderCell: row => row.scoring,
      renderCell: row => (
        <HeatmapCell value={row.scoring} colorScale={colorScale} />
      ),
    },
    {
      id: 'neighbourhood',
      label: 'Neighbourhood',
      verticalHeader: true,
      align: 'center',
      // firstInHeaderGroup: false,
      // lastInHeaderGroup: false,
      renderCell: row => getScoreForColumn(row.evidences, 'gene neighbourhood'),
    },
    {
      id: 'geneFusion',
      label: 'Gene fusion',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'domain fusion'),
    },
    {
      id: 'occurance',
      label: 'Co-occurrance',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'cooccurence'),
    },
    {
      id: 'expression',
      label: 'Co-expression',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'coexpression'),
    },
    {
      id: 'experiments',
      label: 'Experiments',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'experimental'),
    },
    {
      id: 'databases',
      label: 'Databases',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'database'),
    },
    {
      id: 'textMining',
      label: 'Text mining',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'text mining'),
    },
    {
      id: 'homology',
      label: 'Homology',
      verticalHeader: true,
      align: 'center',
      renderCell: row => getScoreForColumn(row.evidences, 'by homology'),
    },
  ],
};

const getScoreForColumn = (evidences, id) => {
  const score = evidences
    .filter(e => e.interactionDetectionMethodShortName === id)
    .map(e => e.evidenceScore)[0];
  return <HeatmapCell value={score} colorScale={colorScale} />;
};

const id = 'string';
const index = 0;
const size = 5000;

// TODO: re-enable for heatmap
// const scaleAssociation = d3
//   .scaleLinear()
//   .domain([0, 1])
//   .range([
//     '#f00',
//     '#fff'
//   ])
//   .unknown('#fff');

const colorScale = d3
  .scaleLinear()
  .domain([0, Math.PI ** 2 / 6])
  // .range(['#fff', theme.palette.primary.main]);
  .range(['#fff', '#0e5299']);

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

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {/* table 1: this is the only table and will need to be a HEATMAP */}
        {/* <DataTable
          showGlobalFilter
          columns={columns.interactions}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-string`}
          hover
        /> */}
        <HeatmapTable
          loading={false}
          error={false}
          columns={columns.interactions}
          headerGroups={[]}
          data={data}
        />
      </Grid>
    </Grid>
  );
}

// export default StringTab;
export default withTheme(StringTab);
