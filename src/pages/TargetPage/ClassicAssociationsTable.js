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
  table: {
    width: 'unset',
    tableLayout: 'fixed',
  },
  cell: {
    width: '50px',
    textAlign: 'center',
    border: '1px solid #ccc',
    padding: 0,
    '&:last-child': {
      paddingRight: 0,
    },
  },
  nameCell: {
    border: '1px solid #ccc',
    width: '220px',
    padding: '0 0.5rem 0 0',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  name: {
    width: '220px',
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

function getColumns(classes) {
  return [
    {
      id: 'name',
      label: 'Name',
      labelStyle: {
        height: '140px',
        textAlign: 'end',
        verticalAlign: 'bottom',
      },
      cellClasses: classes.nameCell,
      renderCell: row => {
        return <div className={classes.name}>{row.name}</div>;
      },
    },
    {
      id: 'genetic_association',
      label: 'Genetic associations',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'somatic_mutation',
      label: 'Somatic mutations',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'known_drug',
      label: 'Drugs',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'affected_pathway',
      label: 'Pathways & systems biology',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'rna_expression',
      label: 'RNA expression',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'literature',
      label: 'Text mining',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
    {
      id: 'animal_model',
      label: 'Animal models',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
      slanted: true,
    },
  ];
}

function getRows(data) {
  return data.map(d => {
    const row = {
      name: d.disease.name,
    };
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

  if (error) return null;

  const columns = getColumns(classes);
  const rows = getRows(data?.target.associatedDiseases ?? []);
  return (
    <Table
      classes={{ table: classes.table }}
      page={0}
      columns={columns}
      rows={rows}
      pageSize={3}
      rowCount={3}
    />
  );
};

export default ClassicAssociationsTable;
