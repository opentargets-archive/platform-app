import React from 'react';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const CHEMICAL_PROBES_SUMMARY_FRAGMENT = loader('./ProbesSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(CHEMICAL_PROBES_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const { probeminer, rows } = data.chemicalProbes;
        const sourceLabels = {
          'Structural Genomics Consortium': 'SGC',
          'Chemical Probes Portal': 'CPP',
          'Open Science Probes': 'OSP',
          probeminer: 'ProbeMiner',
        };
        // probeminer is not in the list of sources, so we have to add it to the
        // array for simplicity.
        const allSources = rows
          .map(r => r.sourcelinks.map(sl => sl.source))
          .concat(probeminer ? ['probeminer'] : []);
        const sources = _(allSources)
          .flatten()
          .uniq()
          .value()
          .map(s => sourceLabels[s] || null);

        return sources.length > 0 ? sources.join(' • ') : null;
      }}
    />
  );
}

Summary.fragments = {
  ChemicalProbesSummaryFragment: CHEMICAL_PROBES_SUMMARY_FRAGMENT,
};

export default Summary;
