import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const GENOMICS_ENGLAND_SUMMARY_FRAGMENT = loader(
  './GenomicsEnglandSummaryFragment.gql'
);

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
      subText={dataTypesMap.genetic_association}
    />
  );
}

Summary.fragments = {
  GenomicsEnglandSummaryFragment: GENOMICS_ENGLAND_SUMMARY_FRAGMENT,
};

export default Summary;
