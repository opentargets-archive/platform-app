import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
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
          allelicRequirements
          studyId
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
    id: 'allelicRequirements',
    label: 'Allelic requirement',
    renderCell: ({ allelicRequirements }) => {
      return !allelicRequirements ? (
        naLabel
      ) : allelicRequirements.length === 1 ? (
        allelicRequirements[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {allelicRequirements.map(allelicRequirement => {
            return <li key={allelicRequirement}>{allelicRequirement}</li>;
          })}
        </ul>
      );
    },
  },
  {
    id: 'confidence',
    label: 'Confidence',
    renderCell: ({ studyId, confidence }) => {
      return (
        <Link
          href={`https://search.clinicalgenome.org/kb/gene-validity/${studyId}`}
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
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;
