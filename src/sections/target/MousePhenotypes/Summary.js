import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const MOUSE_PHENOTYPES_SUMMARY_FRAGMENT = loader(
  './MousePhenotypesSummary.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(MOUSE_PHENOTYPES_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ mousePhenotypes }) => {
        return `${mousePhenotypes.length} distinct phenotype${
          mousePhenotypes.length > 1 ? 's' : ''
        }`;
      }}
    />
  );
}

Summary.fragments = {
  MousePhenotypesSummaryFragment: MOUSE_PHENOTYPES_SUMMARY_FRAGMENT,
};

export default Summary;
