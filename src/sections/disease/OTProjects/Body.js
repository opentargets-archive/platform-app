import React from 'react';

import Description from './Description';
import Link from '../../../components/Link';
import { DataTable } from '../../../components/Table';
import SectionItem from '../../../components/Section/SectionItem';
import { defaultRowsPerPageOptions } from '../../../constants';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const columns = [
  {
    id: 'otarCode',
    label: 'Project Code',
  },
  {
    id: 'projectName',
    label: 'Project name',
  },
  { id: 'status', label: 'Status' },
  {
    id: 'reference',
    label: 'Open Targest Intranet Link',
    renderCell: ({ otarCode }) => {
      return <Link to="/">{otarCode} project page</Link>;
    },
  },
];

function Body({ definition, label }) {
  const request = usePlatformApi(Summary.fragments.OTProjectsSummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={label} />}
      renderBody={({ otarProjects }) => {
        return (
          <DataTable
            showGlobalFilter
            dataDownloader
            columns={columns}
            rows={otarProjects}
            rowsPerPageOptions={defaultRowsPerPageOptions}
            sortBy="status"
          />
        );
      }}
    />
  );
}

export default Body;
