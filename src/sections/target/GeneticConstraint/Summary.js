import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const GENETIC_CONSTRAINT_FRAGMENT = loader('./GeneticConstraintFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(GENETIC_CONSTRAINT_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => {
        return 'Synonymous • Missense • pLoF';
      }}
    />
  );
}

Summary.fragments = {
  GeneticConstraintFragment: GENETIC_CONSTRAINT_FRAGMENT,
};

export default Summary;
