import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import { Link } from 'ot-ui';
import { Table } from '../../components/Table';
import useBatchDownloader from '../../hooks/useBatchDownloader';
import Legend from '../../components/Legend';
import { colorRange } from '../../constants';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery(
    $ensemblId: String!
    $index: Int!
    $size: Int!
    $filter: String
    $sortBy: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      id
      associatedDiseases(
        page: { index: $index, size: $size }
        orderByScore: $sortBy
        BFilter: $filter
        aggregationFilters: $aggregationFilters
      ) {
        count
        rows {
          disease {
            id
            name
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
  { id: 'rna_expression', label: 'RNA expression' },
  { id: 'literature', label: 'Text mining' },
  { id: 'animal_model', label: 'Animal models' },
];

const color = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

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
  return [
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
            title={row.name}
          >
            {row.name}
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
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={`Score: ${row.score.toFixed(2)}`}
              style={{ backgroundColor: color(row.score) }}
            />
          </Link>
        );
      },
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
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.genetic_association
                  ? `Score: ${row.genetic_association.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.genetic_association) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'somatic_mutation',
      label: 'Somatic mutations',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'somatic_mutation'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.somatic_mutation
                  ? `Score: ${row.somatic_mutation.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.somatic_mutation) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'known_drug',
      label: 'Drugs',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'known_drug'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.known_drug
                  ? `Score: ${row.known_drug.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.known_drug) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'affected_pathway',
      label: 'Pathways & systems biology',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'affected_pathway'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.affected_pathway
                  ? `Score: ${row.affected_pathway.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.affected_pathway) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'rna_expression',
      label: 'RNA expression',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'rna_expression'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.rna_expression
                  ? `Score: ${row.rna_expression.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.rna_expression) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'literature',
      label: 'Text mining',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'literature'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.literature
                  ? `Score: ${row.literature.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.literature) }}
            />
          </Link>
        );
      },
    },
    {
      id: 'animal_model',
      label: 'Animal models',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'animal_model'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <Link to={`/evidence/${ensemblId}/${row.efoId}`}>
            <span
              className={classes.colorSpan}
              title={
                row.animal_model
                  ? `Score: ${row.animal_model.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.animal_model) }}
            />
          </Link>
        );
      },
    },
  ];
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
  const [filter, setFilter] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const { loading, error, data } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: {
      ensemblId: ensgId,
      index: page,
      size: pageSize,
      filter: filter === '' ? null : filter,
      sortBy,
      aggregationFilters,
    },
  });

  const getAllAssociations = useBatchDownloader(
    TARGET_ASSOCIATIONS_QUERY,
    { ensemblId: ensgId, filter, sortBy },
    'data.target.associatedDiseases'
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

  const { count, rows = [] } = data?.target.associatedDiseases ?? {};
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
