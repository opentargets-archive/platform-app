import React from 'react';
import { Table } from '../../components/Table';

const columns = [
  {
    id: 'col1',
    label: 'Column header 1',
    labelStyle: { height: '140px' },
  },
  { id: 'col2', label: 'Column header 2' },
  { id: 'col3', label: 'Column header 3' },
  { id: 'col4', label: 'Column header 4' },
  { id: 'col5', label: 'Column header 5' },
  { id: 'col6', label: 'Column header 6' },
];
const rows = [
  { col1: 1, col2: 2, col3: 3, col4: 4, col5: 5, col6: 6 },
  { col1: 1, col2: 2, col3: 3, col4: 4, col5: 5, col6: 6 },
  { col1: 1, col2: 2, col3: 3, col4: 4, col5: 5, col6: 6 },
];

const ClassicAssociationsTable = () => {
  return (
    <Table page={0} columns={columns} rows={rows} pageSize={3} rowCount={3} />
  );
};

export default ClassicAssociationsTable;
