import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Tooltip from '../../../components/Tooltip';
import ScientificNotation from '../../../components/ScientificNotation';
import Summary from './Summary';
import Description from './Description';

const EXPRESSION_ATLAS_QUERY = gql`
  query expressionAtlasQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["expression_atlas"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          contrast
          studyOverview
          log2FoldChangeValue
          resourceScore
          log2FoldChangePercentileRank
          studyId
          target {
            id
          }
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
    id: 'contrast',
    label: 'Experiment contrast',
    renderCell: ({ contrast, studyOverview }) => {
      return (
        <Tooltip title={studyOverview}>
          <span>{contrast}</span>
        </Tooltip>
      );
    },
  },
  {
    id: 'log2FoldChangeValue',
    label: 'Log2 fold change',
  },
  {
    label: 'P-value',
    renderCell: ({ resourceScore }) => {
      return <ScientificNotation number={resourceScore} />;
    },
  },
  {
    id: 'log2FoldChangePercentileRank',
    label: 'Percentile rank',
  },
  {
    id: 'studyId',
    label: 'Experiment ID',
    renderCell: ({ studyId, target }) => {
      return (
        <Link
          external
          to={`http://www.ebi.ac.uk/gxa/experiments/${studyId}?geneQuery=${
            target.id
          }`}
        >
          {studyId}
        </Link>
      );
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.expressionAtlasSummary
  );

  const request = useQuery(EXPRESSION_ATLAS_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.expressionAtlasSummary.count,
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
          />
        );
      }}
    />
  );
}

export default Body;
