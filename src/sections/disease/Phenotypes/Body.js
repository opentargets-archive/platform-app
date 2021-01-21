import React from 'react';

import Description from './Description';
import { DataTable } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
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

function Body({ definition, label: name }) {
  // const request = usePlatformApi(Summary.fragments.PhenotypesSummaryFragment);

  // return (
  //   <SectionItem
  //     definition={definition}
  //     request={request}
  //     renderDescription={() => <Description name={name} />}
  //     renderBody={data => (
  //       <DataTable
  //         columns={columns}
  //         dataDownloader
  //         dataDownloaderFileStem="phenotypes"
  //         rows={data.phenotypes}
  //         showGlobalFilter
  //       />
  //     )}
  //   />
  // );
  return <>Phenotypes</>;
}

export default Body;
