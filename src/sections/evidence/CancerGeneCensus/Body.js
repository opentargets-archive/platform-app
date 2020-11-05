import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
import Summary from './Summary';
import Description from './Description';

const CANCER_GENE_CENSUS_QUERY = gql`
  query PhewasCatalogQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["cancer_gene_census"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          variations {
            functionalConsequence
            numberSamplesWithMutationType
            numberSamplesTested
            inheritancePattern
          }
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
    renderCell: ({ disease }) => {
      return (
        <Link component={RouterLink} to={`/disease/${disease.id}`}>
          {disease.name}
        </Link>
      );
    },
  },
  {
    id: 'variations.functionalConsequence',
    label: 'Mutation type',
    renderCell: ({ variations }) => {
      return (
        <ul>
          {variations.map(({ functionalConsequence }) => (
            <li key={functionalConsequence}>{functionalConsequence}</li>
          ))}
        </ul>
      );
    },
  },
  {
    label: 'Samples',
    renderCell: ({ variations }) => {
      return (
        <ul>
          {variations.map(
            ({ numberSamplesWithMutationType, numberSamplesTested }, i) => (
              <li key={i}>
                {numberSamplesWithMutationType}/{numberSamplesTested}
              </li>
            )
          )}
        </ul>
      );
    },
  },
  {
    label: 'Cellular mechanism',
    renderCell: ({ variations }) => {
      return (
        <ul>
          {variations.map(({ inheritancePattern }, i) => (
            <li key={i}>{inheritancePattern}</li>
          ))}
        </ul>
      );
    },
  },
  {
    label: 'Literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id === 'NA') return acc;

          return [
            ...acc,
            {
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            },
          ];
        }, []) || [];

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.CancerGeneCensusSummary
  );

  const request = useQuery(CANCER_GENE_CENSUS_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.cancerGeneCensusSummary.count,
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
