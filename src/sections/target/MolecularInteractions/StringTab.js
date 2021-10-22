import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import client from '../../../client';
import { withTheme, makeStyles } from '@material-ui/core';

import DataTable from '../../../components/Table/DataTable';
import Legend from '../../../components/Legend';
import { colorRange } from '../../../constants';

import Grid from '@material-ui/core/Grid';
import Link from '../../../components/Link';

import { scaleQuantize } from 'd3';

const INTERACTIONS_QUERY = loader('./InteractionsStringQuery.gql');

const getData = (query, ensgId, sourceDatabase, index, size) => {
  return client.query({
    query: query,
    variables: {
      ensgId,
      sourceDatabase,
      index,
      size,
    },
  });
};

const useStyles = makeStyles({
  root: {
    overflow: 'visible',
    padding: '2rem 3rem 0 0',
  },
  table: {
    tableLayout: 'fixed',
  },
  sortLabel: {
    top: '8px',
  },
  innerLabel: {
    position: 'absolute',
    display: 'inline-block',
    transformOrigin: '-20px 20px',
    bottom: 0,
    transform: 'rotate(315deg)',
    marginBottom: '5px',
  },
  nameHeaderCell: {
    width: '15%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
    textAlign: 'end',
    paddingBottom: '.4rem',
  },
  headerCell: {
    position: 'relative',
    borderBottom: 0,
    height: '140px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
  overallCell: {
    border: 0,
    textAlign: 'center',
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '1px',
    paddingRight: '10px',
  },
  cell: {
    border: 0,
    height: '20px',
    textAlign: 'center',
    padding: '1px 1px',
    '&:last-child': {
      paddingRight: 0,
    },
  },
  colorSpan: {
    display: 'block',
    height: '20px',
    border: '1px solid #eeefef',
  },
  nameCell: {
    border: 0,
    // width: '20%',
    padding: '0 0.5rem 0 0',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  nameContainer: {
    display: 'block',
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

function getColumns(classes) {
  return [
    {
      id: 'partner',
      label: <>Interactor B</>,
      classes: {
        headerCell: classes.nameHeaderCell,
        cell: classes.nameCell,
      },
      renderCell: row => (
        <span className={classes.nameContainer}>
          {row.targetB ? (
            <Link to={`/target/${row.targetB.id}`}>
              {row.targetB.approvedSymbol}
            </Link>
          ) : (
            <Link to={`http://uniprot.org/uniprot/${row.intB}`} external>
              {row.intB}
            </Link>
          )}
        </span>
      ),
      exportValue: row => row.targetB?.approvedSymbol || row.intB,
      filterValue: row => row.targetB?.approvedSymbol + ' ' + row.intB,
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row => row.score.toFixed(3),
      exportValue: row => row.score.toFixed(3),
      filterValue: row => row.score.toFixed(3),
    },
    {
      id: 'neighbourhood',
      label: 'Neighbourhood',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(
          getScoreForColumn(row.evidences, 'neighborhood'),
          classes
        ),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'neighborhood')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'neighborhood')?.toFixed(3),
    },
    {
      id: 'geneFusion',
      label: 'Gene fusion',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(getScoreForColumn(row.evidences, 'fusion'), classes),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'fusion')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'fusion')?.toFixed(3),
    },
    {
      id: 'occurance',
      label: 'Co-occurrance',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(
          getScoreForColumn(row.evidences, 'cooccurence'),
          classes
        ),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'cooccurence')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'cooccurence')?.toFixed(3),
    },
    {
      id: 'expression',
      label: 'Co-expression',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(
          getScoreForColumn(row.evidences, 'coexpression'),
          classes
        ),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'coexpression')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'coexpression')?.toFixed(3),
    },
    {
      id: 'experiments',
      label: 'Experiments',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(
          getScoreForColumn(row.evidences, 'experimental'),
          classes
        ),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'experimental')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'experimental')?.toFixed(3),
    },
    {
      id: 'databases',
      label: 'Databases',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(getScoreForColumn(row.evidences, 'database'), classes),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'database')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'database')?.toFixed(3),
    },
    {
      id: 'textMining',
      label: 'Text mining',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(getScoreForColumn(row.evidences, 'textmining'), classes),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'textmining')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'textmining')?.toFixed(3),
    },
    {
      id: 'homology',
      label: 'Homology',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      renderCell: row =>
        getHeatmapCell(getScoreForColumn(row.evidences, 'homology'), classes),
      exportValue: row =>
        getScoreForColumn(row.evidences, 'homology')?.toFixed(3),
      filterValue: row =>
        getScoreForColumn(row.evidences, 'homology')?.toFixed(3),
    },
  ];
}

const getScoreForColumn = (evidences, id) => {
  return evidences
    .filter(e => e.interactionDetectionMethodShortName === id)
    .map(e => e.evidenceScore)[0]; // TODO: the [0] is to catch a data error: remove when fixed.
};

const getHeatmapCell = (score, classes) => {
  return (
    <span
      className={classes.colorSpan}
      title={score || 'No data'}
      style={{ backgroundColor: color(score) }}
    />
  );
};

const id = 'string';
const index = 0;
const size = 10000;
const color = scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

function StringTab({ ensgId, symbol }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const columns = getColumns(classes);

  // load tab data when new tab selected (also on first load)
  useEffect(
    () => {
      setLoading(true);
      getData(INTERACTIONS_QUERY, ensgId, id, index, size).then(res => {
        if (res.data.target.interactions) {
          setLoading(false);
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
        <DataTable
          showGlobalFilter
          columns={columns}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-string`}
          fixed
          classes={{ root: classes.root, table: classes.table }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          loading={loading}
        />
        <Legend />
      </Grid>
    </Grid>
  );
}

// export default StringTab;
export default withTheme(StringTab);
