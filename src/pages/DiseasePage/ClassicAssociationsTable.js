import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Link from '../../components/Link';
import { Table } from '../../components/Table';
import AssocCell from '../../components/AssocCell';
import Legend from '../../components/Legend';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const DISEASE_ASSOCIATIONS_QUERY = gql`
  query DiseaseAssociationsQuery(
    $efoId: String!
    $index: Int!
    $size: Int!
    $filter: String
    $sortBy: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    disease(efoId: $efoId) {
      id
      associatedTargets(
        page: { index: $index, size: $size }
        orderByScore: $sortBy
        BFilter: $filter
        aggregationFilters: $aggregationFilters
      ) {
        count
        rows {
          target {
            id
            approvedSymbol
            approvedName
          }
          score
          datatypeScores {
            componentId: id
            score
          }
        }
      }
    }
  }
`;

const dataTypes = [
  { id: 'genetic_association', label: 'Genetic associations' },
  { id: 'somatic_mutation', label: 'Somatic mutations' },
  { id: 'known_drug', label: 'Drugs' },
  { id: 'affected_pathway', label: 'Pathways & systems biology' },
  { id: 'literature', label: 'Text mining' },
  { id: 'rna_expression', label: 'RNA expression' },
  { id: 'animal_model', label: 'Animal models' },
];

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
  return [
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
    {
      id: 'genetic_association',
      label: 'Genetic associations',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'genetic_association'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ genetic_association, ensemblId }) => (
        <AssocCell
          score={genetic_association}
          ensemblId={ensemblId}
          efoId={efoId}
        />
      ),
    },
    {
      id: 'somatic_mutation',
      label: 'Somatic mutations',
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'somatic_mutation'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ somatic_mutation, ensemblId }) => (
        <AssocCell
          score={somatic_mutation}
          ensemblId={ensemblId}
          efoId={efoId}
        />
      ),
    },
    {
      id: 'known_drug',
      label: 'Drugs',
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'known_drug'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ known_drug, ensemblId }) => (
        <AssocCell score={known_drug} ensemblId={ensemblId} efoId={efoId} />
      ),
    },
    {
      id: 'affected_pathway',
      label: 'Pathways & systems biology',
      sortable: true,
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'affected_pathway'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ affected_pathway, ensemblId }) => (
        <AssocCell
          score={affected_pathway}
          ensemblId={ensemblId}
          efoId={efoId}
        />
      ),
    },
    {
      id: 'literature',
      label: 'Text mining',
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'literature'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ literature, ensemblId }) => (
        <AssocCell score={literature} ensemblId={ensemblId} efoId={efoId} />
      ),
    },
    {
      id: 'rna_expression',
      label: 'RNA expression',
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'rna_expression'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ rna_expression, ensemblId }) => (
        <AssocCell score={rna_expression} ensemblId={ensemblId} efoId={efoId} />
      ),
    },
    {
      id: 'animal_model',
      label: 'Animal models',
      classes: {
        headerCell: classes.headerCell,
        innerLabel: classes.innerLabel,
        sortLabel: classes.sortLabel,
        cell: classes.cell,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'animal_model'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: ({ animal_model, ensemblId }) => (
        <AssocCell score={animal_model} ensemblId={ensemblId} efoId={efoId} />
      ),
    },
    {
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
    },
  ];
}

function getRows(data) {
  return data.map(d => {
    const row = {
      ensemblId: d.target.id,
      symbol: d.target.approvedSymbol,
      name: d.target.approvedName,
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

function ClassicAssociationsTable({ efoId, aggregationFilters }) {
  const classes = useStyles();
  const [filter, setFilter] = useState();
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const { loading, error, data } = useQuery(DISEASE_ASSOCIATIONS_QUERY, {
    variables: {
      efoId,
      index: page,
      size: pageSize,
      filter: filter === '' ? null : filter,
      sortBy,
      aggregationFilters,
    },
  });

  const getAllAssociations = useBatchDownloader(
    DISEASE_ASSOCIATIONS_QUERY,
    { efoId, filter: filter === '' ? null : filter, sortBy },
    'data.disease.associatedTargets'
  );

  function handlePageChange(page) {
    setPage(page);
  }

  function handleRowsPerPageChange(pageSize) {
    setPageSize(pageSize);
    setPage(0);
  }

  function handleSort(sortBy) {
    setSortBy(sortBy);
  }

  function handleGlobalFilterChange(filter) {
    setFilter(filter);
    setPage(0);
  }

  if (error) return null;

  const { count, rows = [] } = data?.disease.associatedTargets ?? {};
  const columns = getColumns(efoId, classes);
  const processedRows = getRows(rows);

  return (
    <>
      <Table
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
