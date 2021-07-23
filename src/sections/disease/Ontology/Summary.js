import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const ONTOLOGY_SUMMARY_FRAGMENT = loader('./OntologySummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(ONTOLOGY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        data.isTherapeuticArea
          ? 'Therapeutic area'
          : `Belongs to ${data.therapeuticAreas.length} therapeutic areas`
      }
    />
  );
}

Summary.fragments = {
  OntologySummaryFragment: ONTOLOGY_SUMMARY_FRAGMENT,
};

export default Summary;
