import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import { Table } from '../../components/Table';

import { client3 } from '../../client';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery($ensemblId: String!, $page: Pagination!) {
    target(ensemblId: $ensemblId) {
      associatedDiseases(page: $page) {
        score
        idPerDT
        scorePerDT
        disease {
          id
          name
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
  .range([
    '#e8edf1',
    '#d2dce4',
    '#bbcbd6',
    '#a5b9c9',
    '#8fa8bc',
    '#7897ae',
    '#6285a1',
    '#4b7493',
    '#356386',
    '#1f5279',
  ]);

const useStyles = makeStyles({
  root: {
    overflow: 'visible',
  },
  table: {
    tableLayout: 'fixed',
  },
  nameHeaderCell: {
    width: '20%',
    height: '140px',
    verticalAlign: 'bottom',
    textAlign: 'end',
    paddingBottom: '.4rem',
  },
  headerCell: {
    position: 'relative',
    width: '10%',
    height: '140px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  cell: {
    width: '10%',
    textAlign: 'center',
    border: '1px solid #eeefef',
    padding: 0,
    '&:last-child': {
      paddingRight: 0,
    },
  },
  nameCell: {
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    border: 0,
    width: '20%',
    padding: '0 0.5rem 0 0',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
});

function getColumns(ensemblId, classes) {
  return [
    {
      id: 'name',
      label: 'Name',
      headerClass: classes.nameHeaderCell,
      cellClasses: classes.nameCell,
    },
    {
      id: 'overall',
      label: 'Overall association score',
      slanted: true,
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      renderCell: () => 1,
    },
    {
      id: 'genetic_association',
      label: 'Genetic associations',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 2,
    },
    {
      id: 'somatic_mutation',
      label: 'Somatic mutations',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 3,
    },
    {
      id: 'known_drug',
      label: 'Drugs',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 4,
    },
    {
      id: 'affected_pathway',
      label: 'Pathways & systems biology',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 5,
    },
    {
      id: 'rna_expression',
      label: 'RNA expression',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 6,
    },
    {
      id: 'literature',
      label: 'Text mining',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 7,
    },
    {
      id: 'animal_model',
      label: 'Animal models',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      renderCell: () => 8,
    },
  ];
}

function getRows(data) {
  return data.map(d => {
    const row = {
      name: d.disease.name,
      overall: d.score,
      efoId: d.disease.id,
    };
    dataTypes.forEach(dataType => {
      const index = d.idPerDT.indexOf(dataType.id);

      if (index !== -1) {
        row[dataType.id] = d.scorePerDT[index];
      }
    });
    return row;
  });
}

const ClassicAssociationsTable = ({ ensgId }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const { loading, error, data } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: {
      ensemblId: ensgId,
      page: { index: page, size: pageSize },
    },
    client: client3,
  });

  function handlePageChange(page) {
    setPage(page);
  }

  function handleRowsPerPageChange(pageSize) {
    setPageSize(pageSize);
    setPage(0);
  }

  if (error) return null;

  const columns = getColumns(ensgId, classes);
  const rows = getRows(data?.target.associatedDiseases ?? []);

  return (
    <Table
      loading={loading}
      classes={{ root: classes.root, table: classes.table }}
      page={page}
      columns={columns}
      rows={rows}
      pageSize={pageSize}
      rowCount={600}
      rowsPerPageOptions={[10, 50, 200, 500]}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default ClassicAssociationsTable;
