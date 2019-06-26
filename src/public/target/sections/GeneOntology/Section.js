import React from 'react';

import OntologyTable from './custom/OntologyTable';

const Section = ({ symbol, ensgId, data }) => (
  <OntologyTable rows={data.rows} symbol={symbol} />
);

export default Section;
