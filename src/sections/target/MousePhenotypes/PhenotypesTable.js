import React from 'react';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';

const columns = [
  {
    id: 'targetInModel',
    label: 'Mouse gene',
    renderCell: ({ targetInModel, targetInModelMgiId }) => {
      return (
        <Link external to={`https://identifiers.org/${targetInModelMgiId}`}>
          {targetInModel}
        </Link>
      );
    },
  },
  {
    id: 'modelPhenotypesId',
    label: 'Phenotype',
    renderCell: ({ modelPhenotypeLabel, modelPhenotypeId }) => {
      return (
        <Link external to={`https://identifiers.org/${modelPhenotypeId}`}>
          {modelPhenotypeLabel}
        </Link>
      );
    },
  },
];

function PhenotypesTable({ mousePhenotypes }) {
  return (
    <DataTable
      columns={columns}
      rows={mousePhenotypes}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default PhenotypesTable;
