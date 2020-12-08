import React from 'react';
import { gql, useQuery } from '@apollo/client';
import SectionItem from '../../../components/Section/SectionItem';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';
import { DataTable } from '../../../components/Table';
import Description from './Description';

const EVA_QUERY = gql`
  query evaQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva"]
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
          variantFunctionalConsequence {
            id
            label
          }
          clinicalSignificances
          allelicRequirements
          confidence
          literature
        }
      }
    }
  }
`;

function EVAClientTable({ definition, id, label, columns }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(Summary.fragments.evaSummary);

  const request = useQuery(EVA_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.evaSummary.count,
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

export default EVAClientTable;
