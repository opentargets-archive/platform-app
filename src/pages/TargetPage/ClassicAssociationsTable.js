import React from 'react';
import { Table } from '../../components/Table';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: 'unset',
  },
  cell: {
    width: '30px',
    textAlign: 'center',
    border: '1px solid #ccc',
    padding: '10px 5px',
  },
});

function getColumns(classes) {
  return [
    {
      id: 'col1',
      label: 'Column header 1',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
    {
      id: 'col2',
      label: 'Column header 2',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
    {
      id: 'col3',
      label: 'Column header 3',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
    {
      id: 'col4',
      label: 'Column header 4',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
    {
      id: 'col5',
      label: 'Column header 5',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
    {
      id: 'col6',
      label: 'Column header 6',
      labelStyle: { height: '140px', padding: 0 },
      cellClasses: classes.cell,
    },
  ];
}
const rows = [
  {
    col1: 1,
    col2: 2,
    col3: 3,
    col4: 4,
    col5: 5,
    col6: 6,
  },
  {
    col1: 1,
    col2: 2,
    col3: 3,
    col4: 4,
    col5: 5,
    col6: 6,
  },
  {
    col1: 1,
    col2: 2,
    col3: 3,
    col4: 4,
    col5: 5,
    col6: 6,
  },
];

const ClassicAssociationsTable = () => {
  const classes = useStyles();
  const columns = getColumns(classes);
  return (
    <Table
      slanted
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
