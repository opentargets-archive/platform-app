import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

const CLINGEN_QUERY = gql`
  query ClingenQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["clingen"]
        size: $size
      ) {
        count
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          allelicRequirement
          recordId
          confidence
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
    label: 'Reported disease/phenotype',
  },
  {
    id: 'allelicRequirement',
    label: 'Allelic requirement',
  },
  {
    id: 'confidence',
    label: 'Confidence',
    renderCell: ({ recordId, confidence }) => {
      return (
        <Link
          href={`https://search.clinicalgenome.org/kb/gene-validity/${recordId}`}
        >
          {confidence}
        </Link>
      );
    },
  },
];

function Body(props) {
  const { definition, id, label } = props;
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.ClinGenSummaryFragment
  );
  const request = useQuery(CLINGEN_QUERY, {
    variables: { ensemblId, efoId, size: summaryData.clingenSummary.count },
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
