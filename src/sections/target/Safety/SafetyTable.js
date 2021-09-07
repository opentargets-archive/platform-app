import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';

import { naLabel, defaultRowsPerPageOptions } from '../../../constants';
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
          name: sample.cellFormat
            ? `${sample.cellFormat}${
                sample.cellLabel ? ` (${sample.cellLabel})` : ''
              }`
            : sample.tissueLabel,
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
  {
    id: 'dosing',
    label: 'Dosing effects',
    renderCell: ({ effects }) => {
      // console.log('effects', effects);
      return (
        <>
          <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
          <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
        </>
      );
    },
  },
  {
    id: 'studies',
    label: 'Experimental studies',
    renderCell: ({ study }) => {
      // console.log('study', study);
      return 'Experimental studies';
    },
  },
  {
    id: 'source',
    label: 'Source',
    renderCell: ({ datasource, literature }) => {
      console.log('datasource', datasource);
      console.log('literature', literature);
      return 'Source';
    },
  },
];

function SafetyTable({ safetyLiabilities }) {
  console.log('safetyLiabilities', safetyLiabilities);
  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      columns={columns}
      rows={safetyLiabilities}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default SafetyTable;
