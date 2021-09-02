import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import upperBin6Map from './upperBin6Map';

const GENETIC_CONSTRAINT_FRAGMENT = loader('./GeneticConstraintFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(GENETIC_CONSTRAINT_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ geneticConstraint }) => {
        const lof = geneticConstraint.find(gc => gc.constraintType === 'lof');
        return upperBin6Map[lof.upperBin6];
      }}
    />
  );
}

Summary.fragments = {
  GeneticConstraintFragment: GENETIC_CONSTRAINT_FRAGMENT,
};

export default Summary;
