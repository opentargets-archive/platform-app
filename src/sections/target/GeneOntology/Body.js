import React from 'react';
import usePlatformApi from '../../../hooks/usePlatformApi';

import Description from './Description';
import OntologyTable from './OntologyTable';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';

const CATEGORY_BY_PREFIX = {
  P: 'BIOLOGICAL_PROCESS',
  F: 'MOLECULAR_FUNCTION',
  C: 'CELLULAR_COMPONENT',
};

const extractCategory = row => ({
  ...row,
  category: CATEGORY_BY_PREFIX[row.term.substring(0, 1)],
  term: row.term.substring(2),
});

function Section({ definition, label: approvedSymbol }) {
  const request = usePlatformApi(Summary.fragments.GeneOntologySummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => (
        <OntologyTable
          rows={data.geneOntology.map(extractCategory)}
          symbol={approvedSymbol}
          uniprotId={data.proteinAnnotations?.id}
        />
      )}
    />
  );
}

export default Section;
