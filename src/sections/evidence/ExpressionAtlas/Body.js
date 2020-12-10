import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
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
          diseaseFromSource
          contrast
          studyOverview
          log2FoldChangeValue
          resourceScore
          log2FoldChangePercentileRank
          studyId
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
    id: 'studyId',
    label: 'Experiment ID',
    renderCell: ({ studyId, target }) => {
      return (
        <Link external to={`http://www.ebi.ac.uk/gxa/experiments/${studyId}`}>
          {studyId}
        </Link>
      );
    },
  },
  {
    id: 'contrast',
    label: 'Experiment details',
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
    label: (
      <>
        Log<sub>2</sub> fold change
      </>
    ),
    numeric: true,
  },
  {
    id: 'log2FoldChangePercentileRank',
    label: 'Percentile',
    numeric: true,
  },
  {
    label: (
      <>
        <i>p</i>-value
      </>
    ),
    renderCell: ({ resourceScore }) => {
      return <ScientificNotation number={resourceScore} />;
    },
    numeric: true,
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
