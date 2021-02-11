import React from 'react';

import DataDownloader from '../../../components/DataDownloader';
import Link from '../../../components/Link';
import ColumnFilteringDataTable from '../../../components/ColumnFilteringDataTable';

import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';

const columns = [
  {
    id: 'mouseGeneSymbol',
    label: 'Mouse gene',
    renderCell: row => (
      <Link
        external
        to={`http://www.informatics.jax.org/marker/${row.mouseGeneId}`}
      >
        {row.mouseGeneSymbol}
      </Link>
    ),
    filterable: true,
    sortable: true,
  },
  {
    id: 'categoryLabel',
    label: 'Phenotype category',
    filterable: true,
    sortable: true,
  },
  {
    id: 'phenotypeLabel',
    label: 'Phenotype label',
    filterable: true,
    sortable: true,
  },
  {
    id: 'subjectAllelicComposition',
    label: 'Allelic composition',
    renderCell: row => (
      <MouseModelAllelicComposition
        allelicComposition={row.subjectAllelicComposition}
        geneticBackground={row.subjectBackground}
      />
    ),
    sortable: true,
  },
  {
    id: 'pmIds',
    label: 'Sources',
    renderCell: row => {
      const query = row.pmIds.map(pmId => `EXT_ID:${pmId}`).join(' OR ');
      return (
        <Link external to={`https://europepmc.org/search?query=${query}`}>
          {row.pmIds.length} publications
        </Link>
      );
    },
  },
];

const downloadColumns = [
  { id: 'mouseGeneSymbol', label: 'Mouse gene' },
  { id: 'categoryLabel', label: 'Phenotype category' },
  { id: 'phenotypeLabel', label: 'Phenotype label' },
  { id: 'subjectAllelicComposition', label: 'Allelic composition' },
  { id: 'subjectBackground', label: 'Subject background' },
  { id: 'pmIds', label: 'Sources' },
];

const getDownloadRows = rows => {
  return rows.map(row => {
    const query = row.pmIds.map(pmId => `EXT_ID:${pmId}`).join(' OR ');

    return {
      mouseGeneSymbol: row.mouseGeneSymbol,
      categoryLabel: row.categoryLabel,
      phenotypeLabel: row.phenotypeLabel,
      subjectAllelicComposition: row.subjectAllelicComposition,
      subjectBackground: row.subjectBackground,
      pmIds: `https://europepmc.org/search?query=${query}`,
    };
  });
};

const PhenotypesTable = ({ symbol, rows }) => (
  <>
    <DataDownloader
      tableHeaders={downloadColumns}
      rows={getDownloadRows(rows)}
      fileStem={`${symbol}-mouse-phenotypes`}
    />
    <ColumnFilteringDataTable columns={columns} rows={rows} />
  </>
);

const PhenotypesTableAdapter = ({ symbol, data }) => (
  <PhenotypesTable rows={transformToRows(data)} symbol={symbol} />
);

const transformToRows = mousePhenotypes => {
  const rows = [];
  if (!mousePhenotypes) {
    return rows;
  }
  for (const mousePhenotype of mousePhenotypes) {
    for (const phenotype of mousePhenotype.phenotypes) {
      for (const phenotypeGenotype of phenotype.genotypePhenotype) {
        rows.push({
          //mousePhenotypes
          mouseGeneId: mousePhenotype.id,
          mouseGeneSymbol: mousePhenotype.symbol,

          //phenotypes
          categoryLabel: phenotype.categoryLabel,

          //phenotypeGenotype
          phenotypeLabel: phenotypeGenotype.label,
          //FIXME splitting has to be removed after updating the graphql backend
          subjectAllelicComposition: phenotypeGenotype.subjectAllelicComposition.split(
            ','
          ),
          subjectBackground: phenotypeGenotype.subjectBackground,
          //FIXME splitting has to be removed after updating the graphql backend
          pmIds: phenotypeGenotype.pubmedId.split(','),
        });
      }
    }
  }

  return rows;
};

export default PhenotypesTableAdapter;
