import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import ScientificNotation from '../../../components/ScientificNotation';

const reactomeUrl = id => `http://www.reactome.org/PathwayBrowser/#${id}`;

const PROGENY_QUERY = gql`
  query ProgenyQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        size: $size
        datasourceIds: ["progeny"]
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
    label: 'Pathway',
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
    label: 'Study p-value',
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => (
      <ScientificNotation number={resourceScore} />
    ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const request = useQuery(PROGENY_QUERY, {
    variables: { ensemblId: ensgId, efoId },
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
