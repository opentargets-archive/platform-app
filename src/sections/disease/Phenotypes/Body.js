import React from 'react';

import { Link } from 'ot-ui';

import Description from './Description';
import { DataTable } from '../../../components/Table';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const columns = [
  {
    id: 'phenotype',
    propertyPath: 'name',
  },
  {
    id: 'identifier',
    propertyPath: 'disease',
    exportValue: d => d.url,
    renderCell: d => (
      <Link external to={d.url}>
        {d.disease}
      </Link>
    ),
  },
];

function Body({ definition }) {
  const request = usePlatformApi();

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={data => <Description name={data.disease.name} />}
      renderBody={data => (
        <DataTable
          columns={columns}
          dataDownloader
          dataDownloaderFileStem="phenotypes"
          rows={data.disease.phenotypes}
          showGlobalFilter
        />
      )}
    />
  );
}

export default Body;
