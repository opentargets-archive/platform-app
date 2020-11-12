import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { epmcUrl } from '../../../utils/urls';

const INTOGEN_QUERY = gql`
  query IntOgenQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        size: $size
        datasourceIds: ["sysbio"]
      ) {
        rows {
          disease {
            id
            name
          }
          literature
          studyOverview
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'studyOverview',
    propertyPath: 'studyOverview',
    renderCell: ({ studyOverview }) =>
      studyOverview ? studyOverview : naLabel,
  },
  {
    id: 'literature',
    renderCell: ({ literature }) =>
      literature?.[0] ? (
        <Link external to={epmcUrl(literature[0])}>
          {literature[0]}
        </Link>
      ) : (
        naLabel
      ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      sysBio: { count: size },
    },
  } = usePlatformApi(Summary.fragments.SysBioSummaryFragment);

  const request = useQuery(INTOGEN_QUERY, {
    variables: { ensemblId: ensgId, efoId, size },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={data => (
        <DataTable
          columns={columns}
          dataDownloader
          dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
          rows={data.disease.evidences.rows}
          pageSize={10}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
        />
      )}
    />
  );
}

export default Body;
