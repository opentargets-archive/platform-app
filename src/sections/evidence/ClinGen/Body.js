import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Description from './Description';

const CLINGEN_QUERY = gql`
  query ClingenQuery($ensemblId: String!, $efoId: String!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["clingen"]
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
  const request = useQuery(CLINGEN_QUERY, {
    variables: { ensemblId, efoId },
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
        return <DataTable columns={columns} rows={rows} />;
      }}
    />
  );
}

export default Body;
