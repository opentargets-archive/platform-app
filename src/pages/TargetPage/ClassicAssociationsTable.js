import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from '../../components/Link';
import { Table } from '../../components/Table';
import AssocCell from '../../components/AssocCell';
import useBatchDownloader from '../../hooks/useBatchDownloader';
import Legend from '../../components/Legend';
import dataTypes from '../../dataTypes';
import client from '../../client';
import config from '../../config';

const TARGET_ASSOCIATIONS_QUERY = loader('./TargetAssociations.gql');

const useStyles = makeStyles(theme => ({
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
    transformOrigin: '0 0',
    bottom: 0,
    transform: 'rotate(315deg)',
    marginBottom: '5px',
  },
  nameHeaderCell: {
    width: '20%',
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
    width: '20%',
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
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

function getColumns(ensemblId, classes) {
  const columns = [
    {
      id: 'name',
      label: 'Name',
      classes: {
        headerCell: classes.nameHeaderCell,
        cell: classes.nameCell,
      },
      exportValue: data => data.disease.name,
      renderCell: row => {
        return (
          <Link
            to={`/evidence/${ensemblId}/${row.efoId}`}
            className={classes.nameContainer}
          >
            <span title={row.name}>{row.name}</span>
          </Link>
        );
      },
    },
    {
      id: 'score',
      label: 'Overall association score',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.overallCell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: ({ score, efoId }) => (
        <AssocCell score={score} ensemblId={ensemblId} efoId={efoId} />
      ),
    },
  ];

  // datatypes columns are filtered based on config
  // for hide and private (partner) options (i.e.
  // certain columns will be hidden)
  dataTypes
    .filter(
      dt =>
        (config.profile.hideDataTypes.length === 0 ||
          !config.profile.hideDataTypes.includes(dt.id)) &&
        (!dt.isPrivate || (dt.isPrivate && config.profile.isPartnerPreview))
    )
    .forEach(dt => {
      columns.push({
        id: dt.id,
        label: dt.label,
        classes: {
          headerCell: classes.headerCell,
          innerLabel: classes.innerLabel,
          sortLabel: classes.sortLabel,
          cell: classes.cell,
        },
        exportValue: data => {
          const datatypeScore = data.datatypeScores.find(
            datatypeScore => datatypeScore.componentId === dt.id
          );
          return datatypeScore ? datatypeScore.score : 'No data';
        },
        sortable: true,
        renderCell: row => (
          <AssocCell
            score={row[dt.id]}
            ensemblId={ensemblId}
            efoId={row.efoId}
          />
        ),
      });
    });

  return columns;
}

function getRows(data) {
  return data.map(d => {
    const row = {
      name: d.disease.name,
      efoId: d.disease.id,
      score: d.score,
    };
    dataTypes.forEach(dataType => {
      const dataTypeScore = d.datatypeScores.find(
        dataTypeScore => dataTypeScore.componentId === dataType.id
      );

      if (dataTypeScore) {
        row[dataType.id] = dataTypeScore.score;
      }
    });
    return row;
  });
}

function ClassicAssociationsTable({ ensgId, aggregationFilters }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  useEffect(
    () => {
      let isCurrent = true;
      setLoading(true);
      client
        .query({
          query: TARGET_ASSOCIATIONS_QUERY,
          variables: {
            ensemblId: ensgId,
            index: 0,
            size: pageSize,
            sortBy,
            filter,
            aggregationFilters,
          },
        })
        .then(({ data }) => {
          if (isCurrent) {
            setRows(data.target.associatedDiseases.rows);
            setCount(data.target.associatedDiseases.count);
            setPage(0);
            setInitialLoading(false);
            setLoading(false);
          }
        });
      return () => (isCurrent = false);
    },
    [ensgId, pageSize, sortBy, filter, aggregationFilters]
  );

  const getAllAssociations = useBatchDownloader(
    TARGET_ASSOCIATIONS_QUERY,
    {
      ensemblId: ensgId,
      filter: filter === '' ? null : filter,
      sortBy,
      aggregationFilters,
    },
    'data.target.associatedDiseases'
  );

  function handlePageChange(page) {
    setLoading(true);
    client
      .query({
        query: TARGET_ASSOCIATIONS_QUERY,
        variables: {
          ensemblId: ensgId,
          index: page,
          size: pageSize,
          sortBy,
          filter,
          aggregationFilters,
        },
      })
      .then(({ data }) => {
        setRows(data.target.associatedDiseases.rows);
        setPage(page);
        setLoading(false);
      });
  }

  function handleRowsPerPageChange(pageSize) {
    setPageSize(pageSize);
  }

  function handleSort(sortBy) {
    setSortBy(sortBy);
  }

  function handleGlobalFilterChange(newFilter) {
    if (newFilter !== filter) {
      setFilter(newFilter);
    }
  }

  if (initialLoading) return <Skeleton variant="rect" height="40vh" />;

  const columns = getColumns(ensgId, classes);
  const processedRows = getRows(rows);

  return (
    <>
      <Table
        hover
        showGlobalFilter
        loading={loading}
        dataDownloader
        dataDownloaderRows={getAllAssociations}
        dataDownloaderFileStem={`${ensgId}-associated-targets`}
        classes={{ root: classes.root, table: classes.table }}
        page={page}
        sortBy={sortBy}
        order="asc"
        columns={columns}
        rows={processedRows}
        pageSize={pageSize}
        rowCount={count}
        rowsPerPageOptions={[10, 50, 200, 500]}
        onGlobalFilterChange={handleGlobalFilterChange}
        onSortBy={handleSort}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Legend />
    </>
  );
}

export default ClassicAssociationsTable;
