import React from 'react';
import { useQuery } from '@apollo/client';
import SectionItem from '../../../components/Section/SectionItem';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';
import { DataTable } from '../../../components/Table';
import Description from './Description';

function EVAClientTable({ definition, id, label, columns, evaQuery }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(Summary.fragments.evaSummary);

  const request = useQuery(evaQuery, {
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
