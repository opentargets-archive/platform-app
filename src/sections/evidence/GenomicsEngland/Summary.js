import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const GENOMICS_ENGLAND_SUMMARY_FRAGMENT = gql`
  fragment GenomicsEnglandSummaryFragment on Disease {
    genomicsEngland: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["genomics_england"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(GENOMICS_ENGLAND_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.genomicsEngland.count} entr${
          data.genomicsEngland.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  GenomicsEnglandSummaryFragment: GENOMICS_ENGLAND_SUMMARY_FRAGMENT,
};

export default Summary;
