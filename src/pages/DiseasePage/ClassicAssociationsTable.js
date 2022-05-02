import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from '../../components/Link';
import { Table } from '../../components/Table';
import AssocCell from '../../components/AssocCell';
import Legend from '../../components/Legend';
import RelevantIcon from '../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../components/RMTL/NonRelevantIcon';
import useBatchDownloader from '../../hooks/useBatchDownloader';
import dataTypes from '../../dataTypes';
import client from '../../client';
import config from '../../config';

const DISEASE_ASSOCIATIONS_QUERY = loader('./DiseaseAssociations.gql');

/* Given an FDA designation, getRMTLIcon can return the corresponding RMTL
 * Icon to display on the Associations Table.
 */
const getRMTLIcon = designation => {
  let rmtlIcon = '';
  if (designation === 'Relevant Molecular Target') {
    rmtlIcon = (
      <RelevantIcon inputWidth={20} inputHeight={20} inputFontSize={14} />
    );
  } else if (designation === 'Non-Relevant Molecular Target') {
    rmtlIcon = (
      <NonRelevantIcon inputWidth={20} inputHeight={20} inputFontSize={11.5} />
    );
  }
  return rmtlIcon;
};

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'visible',
    padding: '2rem 2rem 0 0',
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
  symbolHeaderCell: {
    width: '10%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
    textAlign: 'end',
    paddingBottom: '.4rem',
  },
  nameHeaderCell: {
    width: '20%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
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
  symbolCell: {
    border: 0,
    width: '20%',
    padding: '0 0.5rem 0 0',
  },
  nameCell: {
    border: 0,
    width: '10%',
    padding: '0 0 0 0.5rem',
  },
  symbolContainer: {
    display: 'block',
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  nameContainer: {
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

function getColumns(efoId, classes) {
  const columns = [
    {
      id: 'pmtl',
      label: 'FDA PMTL',
      align: 'center',
      classes: {
        headerCell: classes.symbolHeaderCell,
        cell: classes.symbolCell,
      },
      exportValue: data =>
        data.target.pmtl_fda_designation || 'Unspecified Target',
      renderCell: row => getRMTLIcon(row.pmtl),
    },
    {
      id: 'symbol',
      label: 'Symbol',
      classes: {
        headerCell: classes.symbolHeaderCell,
        cell: classes.symbolCell,
      },
      exportValue: data => data.target.approvedSymbol,
      renderCell: row => {
        return (
          <Link
            to={`/evidence/${row.ensemblId}/${efoId}`}
            className={classes.symbolContainer}
          >
            {row.symbol}
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
      renderCell: ({ score, ensemblId }) => (
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
            ensemblId={row.ensemblId}
            efoId={efoId}
          />
        ),
      });
    });

  columns.push({
    id: 'name',
    label: 'Target name',
    classes: {
      headerCell: classes.nameHeaderCell,
      cell: classes.nameCell,
    },
    exportValue: data => data.target.approvedName,
    hidden: ['smDown', 'lgOnly'],
    renderCell: row => {
      return (
        <Link
          to={`/evidence/${row.ensemblId}/${efoId}`}
          className={classes.nameContainer}
        >
          <span title={row.name}>{row.name}</span>
        </Link>
      );
    },
  });

  return columns;
}

function getRows(data) {
  return data.map(d => {
    const row = {
      ensemblId: d.target.id,
      symbol: d.target.approvedSymbol,
      name: d.target.approvedName,
      score: d.score,
      pmtl: d.target.pmtl_fda_designation,
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

function ClassicAssociationsTable({ efoId, aggregationFilters }) {
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
          query: DISEASE_ASSOCIATIONS_QUERY,
          variables: {
            efoId,
            index: 0,
            size: pageSize,
            sortBy,
            filter,
            aggregationFilters,
          },
        })
        .then(({ data }) => {
          if (isCurrent) {
            setRows(data.disease.associatedTargets.rows);
            setCount(data.disease.associatedTargets.count);
            setPage(0);
            setInitialLoading(false);
            setLoading(false);
          }
        });
      return () => (isCurrent = false);
    },
    [efoId, pageSize, sortBy, filter, aggregationFilters]
  );

  const getAllAssociations = useBatchDownloader(
    DISEASE_ASSOCIATIONS_QUERY,
    {
      efoId,
      filter: filter === '' ? null : filter,
      sortBy,
      aggregationFilters,
    },
    'data.disease.associatedTargets'
  );

  function handlePageChange(page) {
    setLoading(true);
    client
      .query({
        query: DISEASE_ASSOCIATIONS_QUERY,
        variables: {
          efoId,
          index: page,
          size: pageSize,
          sortBy,
          filter,
          aggregationFilters,
        },
      })
      .then(({ data }) => {
        setRows(data.disease.associatedTargets.rows);
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

  const columns = getColumns(efoId, classes);
  const processedRows = getRows(rows);

  if (initialLoading) return <Skeleton variant="rect" height="40vh" />;

  return (
    <>
      <Table
        hover
        showGlobalFilter
        loading={loading}
        dataDownloader
        dataDownloaderRows={getAllAssociations}
        dataDownloaderFileStem={`${efoId}-associated-diseases`}
        classes={{ root: classes.root, table: classes.table }}
        sortBy={sortBy}
        order="asc"
        page={page}
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
