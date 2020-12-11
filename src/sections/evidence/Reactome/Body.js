import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import { epmcUrl } from '../../../utils/urls';
import Summary from './Summary';
import Description from './Description';

const REACTOME_QUERY = gql`
  query reactomeQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["reactome"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          pathwayId
          reactionId
          targetFromSourceId
          pathwayName
          targetModulation
          variantAminoacidDescriptions
          literature
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                {diseaseFromSource}
              </Typography>
            </>
          }
          showHelpIcon
        >
          <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
        </Tooltip>
      );
    },
  },
  {
    id: 'pathwayName',
    label: 'Pathway',
    renderCell: ({ pathwayId, pathwayName }) => (
      <Link
        external
        to={`http://www.reactome.org/PathwayBrowser/#${pathwayId}`}
      >
        {pathwayName}
      </Link>
    ),
  },
  {
    id: 'reactionId',
    label: 'Reaction',
    renderCell: ({ reactionId }) => (
      <Link external to={`https://identifiers.org/reactome/${reactionId}`}>
        {reactionId}
      </Link>
    ),
  },
  {
    id: 'targetFromSourceId',
    label: 'Reported target',
    renderCell: ({ targetFromSourceId }) => (
      <Link
        external
        to={`https://identifiers.org/uniprot/${targetFromSourceId}`}
      >
        {targetFromSourceId}
      </Link>
    ),
  },
  {
    id: 'targetModulation',
    label: 'Target modulation',
    renderCell: ({ targetModulation }) => {
      return targetModulation ? targetModulation.replace(/_/g, ' ') : naLabel;
    },
  },
  {
    filterValue: ({ variantAminoacidDescriptions }) => {
      return variantAminoacidDescriptions
        .map(variantAminoacidDescription => variantAminoacidDescription)
        .join();
    },
    label: 'Amino acid variation',
    renderCell: ({ variantAminoacidDescriptions }) => {
      return variantAminoacidDescriptions.length > 1 ? (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {variantAminoacidDescriptions.map(variantAminoacidDescription => (
            <li key={variantAminoacidDescription}>
              {variantAminoacidDescription}
            </li>
          ))}
        </ul>
      ) : variantAminoacidDescriptions.length === 1 ? (
        variantAminoacidDescriptions[0]
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: ({ literature = [] }) => {
      const literatureList = [];
      literature.forEach(id => {
        if (id !== 'NA') {
          literatureList.push({
            name: id,
            url: epmcUrl(id),
            group: 'literature',
          });
        }
      });

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.reactomeSummary
  );

  const request = useQuery(REACTOME_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.reactomeSummary.count,
    },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;
