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
  {
    id: 'modelPhenotypeClasses',
    label: 'Category',
    renderCell: ({ modelPhenotypeClasses }) => {
      const entries = modelPhenotypeClasses.map(phenotypeClass => {
        return {
          name: phenotypeClass.label,
          url: `https://identifiers.org/${phenotypeClass.id}`,
          group: 'Categories',
        };
      });
      return (
        <TableDrawer
          caption="Category"
          message={`${modelPhenotypeClasses.length} categories`}
          entries={entries}
        />
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
