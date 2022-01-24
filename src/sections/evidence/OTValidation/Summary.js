import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const OT_VALIDATION_SUMMARY = loader('./OTValidationSummary.gql');
// TODO: remove mock data
import sample from './data/sample';

function Summary({ definition }) {
  const request = usePlatformApi(OT_VALIDATION_SUMMARY);
  // TODO: remove mock data
  const tmpCount = sample.rows.length;
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ otValidationSummary }) => {
        const { count } = otValidationSummary;
        return `${tmpCount} ${tmpCount === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.ot_partner}
    />
  );
}

Summary.fragments = {
  otValidationSummary: OT_VALIDATION_SUMMARY,
};

export default Summary;
