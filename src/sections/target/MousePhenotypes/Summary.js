import React from 'react';
import { loader } from 'graphql.macro';
import _ from 'lodash';

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
      renderSummary={data => {
        const labels = _.uniq(
          data.mousePhenotypes
            .flatMap(i => i.phenotypes)
            .flatMap(p => p.genotypePhenotype)
            .map(gp => gp.label)
        );
        return `${labels.length} distinct phenotypes`;
      }}
    />
  );
}

Summary.fragments = {
  MousePhenotypesSummaryFragment: MOUSE_PHENOTYPES_SUMMARY_FRAGMENT,
};

export default Summary;
