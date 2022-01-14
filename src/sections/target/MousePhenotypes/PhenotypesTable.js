import React from 'react';

import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';

import AllelicCompositionDrawer from './AllelicCompositionDrawer';

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
    id: 'modelPhenotypeLabel',
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
    filterValue: ({ modelPhenotypeClasses }) => {
      if (modelPhenotypeClasses.length === 1) {
        return modelPhenotypeClasses[0].label;
      }
      return 'categories';
    },
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
    exportValue: ({ modelPhenotypeClasses }) => {
      return modelPhenotypeClasses.map(phenotypeClass => phenotypeClass.label);
    },
  },
  {
    id: 'lol',
    label: 'Allelic composition',
    renderCell: ({ biologicalModels }) => {
      return <AllelicCompositionDrawer biologicalModels={biologicalModels} />;
    },
    exportValue: ({ biologicalModels }) =>
      biologicalModels.map(bm => bm.allelicComposition),
  },
];

function PhenotypesTable({ mousePhenotypes, query, variables, symbol }) {
  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      dataDownloaderFileStem={`${symbol}-mouse-phenotypes`}
      columns={columns}
      rows={mousePhenotypes}
      rowsPerPageOptions={defaultRowsPerPageOptions}
      query={query}
      variables={variables}
    />
  );
}

export default PhenotypesTable;
