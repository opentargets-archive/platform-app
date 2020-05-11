import React from 'react';

import OntologyTable from './custom/OntologyTable';

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

const Section = ({ symbol, data }) => (
  <OntologyTable rows={data.map(extractCategory)} symbol={symbol} />
);

export default Section;
