import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
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
    filterValue: ({ allelicRequirements }) =>
      allelicRequirements ? allelicRequirements.join() : '',
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
