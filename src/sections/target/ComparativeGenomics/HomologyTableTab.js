import React from 'react';

import Link from '../../../components/Link';
import { DataTable } from '../../../components/Table';
import { identifiersOrgLink } from '../../../utils/global';
import { defaultRowsPerPageOptions, decimalPlaces } from '../../../constants';

const columns = [
  {
    id: 'speciesName',
    label: 'Species',
  },
  {
    id: 'homologyType',
    label: 'Homology type',
  },
  {
    id: 'targetGeneSymbol',
    label: 'Homologue',
    renderCell: ({ targetGeneId, targetGeneSymbol }) => (
      <Link external to={identifiersOrgLink('ensembl', targetGeneId)}>
        {targetGeneSymbol}
      </Link>
    ),
  },
  {
    id: 'dNdS',
    label: `dN/dS`,
  },
  {
    id: 'queryPercentageIdentity',
    label: `Query %id`,
    renderCell: ({ queryPercentageIdentity }) =>
      queryPercentageIdentity
        ? queryPercentageIdentity.toFixed(decimalPlaces)
        : 'N/A',
  },
  {
    id: 'targetPercentageIdentity',
    label: `Target %id`,
    renderCell: ({ targetPercentageIdentity }) =>
      targetPercentageIdentity
        ? targetPercentageIdentity.toFixed(decimalPlaces)
        : 'N/A',
  },
];

function HomologyTableTab({ data }) {
  const { homologues } = data.target;
  return (
    <DataTable
      dataDownloader
      columns={columns}
      rows={homologues}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default HomologyTableTab;
