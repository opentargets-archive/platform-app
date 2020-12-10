import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
import { clinvarStarMap, naLabel } from '../../../constants';
import ScientificNotation from '../../../components/ScientificNotation';
import Tooltip from '../../../components/Tooltip';
import ClinvarStars from '../../../components/ClinvarStars';
import Summary from './Summary';
import Description from './Description';

const EVA_SOMATIC_QUERY = gql`
  query evaSomaticQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva_somatic"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          variantRsId
          studyId
          clinicalSignificances
          allelicRequirements
          confidence
          score
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
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported disease/phenotype',
  },
  {
    id: 'variantRsId',
    label: 'Variant',
    renderCell: ({ variantRsId }) => {
      return variantRsId ? (
        <Link
          external
          to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
        >
          {variantRsId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'recordId',
    label: 'ClinVar ID',
    renderCell: ({ studyId }) => {
      return (
        <Link external to={`https://identifiers.org/clinvar.record/${studyId}`}>
          {studyId}
        </Link>
      );
    },
  },
  {
    id: 'clinicalSignificances',
    label: 'Clinical significance',
    renderCell: ({ clinicalSignificances }) => {
      return !clinicalSignificances ? (
        naLabel
      ) : clinicalSignificances.length === 1 ? (
        clinicalSignificances[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {clinicalSignificances.map(clinicalSignificance => {
            return <li key={clinicalSignificance}>{clinicalSignificance}</li>;
          })}
        </ul>
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
  },
  {
    label: 'Confidence',
    renderCell: ({ confidence }) => {
      return (
        <Tooltip title={confidence}>
          <span>
            <ClinvarStars num={clinvarStarMap[confidence]} />
          </span>
        </Tooltip>
      );
    },
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: ({ score }) => <ScientificNotation number={score} />,
    sortable: true,
  },
  {
    label: 'Literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id !== 'NA') {
            acc.push({
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            });
          }
          return acc;
        }, []) || [];

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.evaSomaticSummary
  );

  const request = useQuery(EVA_SOMATIC_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.evaSomaticSummary.count,
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
            sortBy="score"
            order="desc"
          />
        );
      }}
    />
  );
}

export default Body;
