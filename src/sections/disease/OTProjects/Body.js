import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Description from './Description';
import Link from '../../../components/Link';
import { DataTable } from '../../../components/Table';
import SectionItem from '../../../components/Section/SectionItem';
import { defaultRowsPerPageOptions } from '../../../constants';
import projects from './projects.json';

const OT_PROJECTS_QUERY = loader('./OTProjectsQuery.gql');

function getColumns(diseaseName) {
  return [
    {
      id: 'otarCode',
      label: 'Project Code',
    },
    {
      id: 'projectName',
      label: 'Project name',
    },
    { id: 'name', label: 'Disease', renderCell: () => diseaseName },
    { id: 'status', label: 'Status' },
    {
      id: 'reference',
      label: 'Open Targest Intranet Link',
      renderCell: ({ otarCode }) => {
        return <Link to="/">{otarCode} project page</Link>;
      },
    },
  ];
}

function Body({ definition, label, id }) {
  const request = useQuery(OT_PROJECTS_QUERY, {
    variables: {
      efoId: id,
    },
  });

  const columns = getColumns(label);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={label} />}
      renderBody={() => {
        return (
          <DataTable
            showGlobalFilter
            dataDownloader
            columns={columns}
            rows={projects}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;
