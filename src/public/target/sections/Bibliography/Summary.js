import React from 'react';

import BibliographySummary from '../../../common/sections/Bibliography/Summary';

const Summary = ({ ensgId, ...rest }) => (
  <BibliographySummary key={ensgId} {...rest} />
);

export default Summary;
