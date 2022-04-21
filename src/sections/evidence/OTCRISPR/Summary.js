import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const OT_CRISPR_SUMMARY = loader('./OTCrisprSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(OT_CRISPR_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ OtCrisprSummary }) => {
        const { count } = OtCrisprSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.ot_partner}
    />
  );
}

Summary.fragments = {
  OtCrisprSummary: OT_CRISPR_SUMMARY,
};

export default Summary;
