import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

const PHEWAS_CATALOG_QUERY = gql`
  query PhewasCatalogQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["phewas_catalog"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          variantRsId
          variantFunctionalConsequenceId
          resourceScore
          studyCases
          oddsRatio
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return (
        <Link component={RouterLink} to={`/disease/${disease.id}`}>
          {disease.name}
        </Link>
      );
    },
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported disease/phenotype [Phecode]',
  },
  {
    id: 'variantRsId',
    label: 'Variant',
    renderCell: ({ variantRsId }) => {
      return (
        <Link
          href={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
        >
          {variantRsId}
        </Link>
      );
    },
  },
  {
    id: 'variantFunctionalConsequenceId',
    label: 'Functional consequence',
  },
  {
    id: 'resourceScore',
    label: 'P-value',
    renderCell: ({ resourceScore }) => resourceScore.toFixed(5),
  },
  {
    id: 'studyCases',
    label: 'Cases',
  },
  {
    id: 'oddsRatio',
    label: 'Odds ratio',
    renderCell: ({ oddsRatio }) => oddsRatio.toFixed(5),
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.PheWASCatalogSummary
  );

  const request = useQuery(PHEWAS_CATALOG_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.phewasCatalogSummary.count,
    },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        console.log('rows', rows);
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
          />
        );
      }}
    />
  );
}

export default Body;
