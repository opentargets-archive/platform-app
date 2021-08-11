import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const COMP_GENOMICS_SUMMARY_FRAGMENT = loader(
  './CompGenomicsSummaryFragment.gql'
);

// const speciesSubset = [
//   'homo_sapiens',
//   'pan_troglodytes',
//   'macaca_mulatta',
//   'mus_musculus',
//   'rattus_norvegicus',
//   'cavia_porcellus',
//   'oryctolagus_cuniculus',
//   'sus_scrofa',
//   'canis_familiaris',
//   'xenopus_tropicalis',
//   'danio_rerio',
//   'drosophila_melanogaster',
//   'caenorhabditis_elegans',
// ];

function Summary({ definition, id: ensgId }) {
  const request = usePlatformApi(COMP_GENOMICS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ homologues }) => {
        let orthologueCount = 0;
        const speciesSet = new Set();

        homologues.forEach(({ homologyType, speciesId }) => {
          if (
            homologyType === 'ortholog_one2one' ||
            homologyType === 'ortholog_one2many'
          ) {
            orthologueCount++;
          }

          speciesSet.add(speciesId);
        });

        return `${orthologueCount} orthologues in ${speciesSet.size} species`;
      }}
    />
  );
}

Summary.fragments = {
  CompGenomicsSummaryFragment: COMP_GENOMICS_SUMMARY_FRAGMENT,
};

export default Summary;
