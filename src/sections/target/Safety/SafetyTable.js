import React from 'react';
import { DataTable } from '../../../components/Table';

const columns = [{ id: 'event', label: 'Safety event' }];

function SafetyTable({ safetyLiabilities }) {
  console.log('safetyLiabilities', safetyLiabilities);
  return <DataTable columns={columns} rows={safetyLiabilities} />;
}

export default SafetyTable;
