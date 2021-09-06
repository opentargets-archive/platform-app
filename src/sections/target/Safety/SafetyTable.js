import React from 'react';

import { naLabel } from '../../../constants';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';

const columns = [
  {
    id: 'event',
    label: 'Safety event',
    renderCell: ({ event, eventId }) => {
      return eventId ? (
        <Link to={`/disease/${eventId}`}>{event ?? naLabel}</Link>
      ) : (
        event ?? naLabel
      );
    },
  },
  {
    id: 'biosample',
    label: 'Biosamples',
    renderCell: ({ biosample }) => {
      const entries = biosample.map(sample => {
        return {
          name: sample.cellFormat ? sample.cellFormat : sample.tissueLabel,
          url: sample.cellFormat
            ? null
            : `https://identifiers.org/${sample.tissueId}`,
          group: sample.cellFormat ? 'Assay' : 'Organ system',
        };
      });

      return (
        <TableDrawer
          message={`${biosample.length} biosample${
            biosample.length > 1 ? 's' : ''
          }`}
          caption="Biosamples"
          entries={entries}
        />
      );
    },
  },
];

function SafetyTable({ safetyLiabilities }) {
  return <DataTable columns={columns} rows={safetyLiabilities} />;
}

export default SafetyTable;
