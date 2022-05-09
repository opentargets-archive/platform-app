import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const OT_ENCORE_SUMMARY = loader('./OTEncoreSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(OT_ENCORE_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ otEncoreSummary }) => {
        const { count } = otEncoreSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.ot_partner}
    />
  );
}

Summary.fragments = {
  otEncoreSummary: OT_ENCORE_SUMMARY,
};

export default Summary;
