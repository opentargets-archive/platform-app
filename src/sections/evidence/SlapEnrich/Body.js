import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import ScientificNotation from '../../../components/ScientificNotation';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const reactomeUrl = id => `http://www.reactome.org/PathwayBrowser/#${id}`;

const SLAPENRICH_QUERY = gql`
  query SlapEnrichQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        size: $size
        datasourceIds: ["slapenrich"]
      ) {
        rows {
          disease {
            id
            name
          }
          pathwayId
          pathwayName
          resourceScore
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'pathwayName',
    label: 'Significant pathway',
    renderCell: ({ pathwayName, pathwayId }) =>
      pathwayName && pathwayId ? (
        <Link external to={reactomeUrl(pathwayId)}>
          {pathwayName}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'resourceScore',
    label: (
      <>
        <i>p</i>-value
      </>
    ),
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => (
      <ScientificNotation number={resourceScore} />
    ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      slapEnrich: { count: size },
    },
  } = usePlatformApi(Summary.fragments.SlapEnrichSummaryFragment);

  const request = useQuery(SLAPENRICH_QUERY, {
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
          order="asc"
          rows={data.disease.evidences.rows}
          pageSize={10}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
          sortBy="resourceScore"
        />
      )}
    />
  );
}

export default Body;
