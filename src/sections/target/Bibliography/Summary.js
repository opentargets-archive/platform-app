import React from 'react';

import BibliographySummary from '../../common/Bibliography/Summary';

const Summary = ({ ensgId, ...rest }) => (
  <BibliographySummary keyword={ensgId} {...rest} />
);

export default Summary;
