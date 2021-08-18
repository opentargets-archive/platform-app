import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

import { DataTable } from '../../../components/Table';
import { identifiersOrgLink } from '../../../utils/global';
import Link from '../../../components/Link';

function getColumns(symbol) {
  return [
    {
      id: 'pathway',
      label: 'Pathway',
      renderCell: ({ pathwayId }) => {
        return (
          <Link external to={identifiersOrgLink('reactome', pathwayId)}>
            {pathwayId}
          </Link>
        );
      },
    },
    {
      id: 'topLevelTerm',
      label: 'Top-level parent pathway',
    },
    {
      id: 'pathwayId',
      label: 'View target and pathway',
      renderCell: ({ pathwayId }) => {
        return (
          <>
            <FontAwesomeIcon icon={faMapMarker} />{' '}
            <Link
              external
              to={`https://reactome.org/PathwayBrowser/#/${pathwayId}&FLG=${symbol}`}
            >
              Reactome pathway browser
            </Link>
          </>
        );
      },
    },
  ];
}

function OverviewTab({ symbol, pathways }) {
  return <DataTable columns={getColumns(symbol)} rows={pathways} />;
}

export default OverviewTab;
