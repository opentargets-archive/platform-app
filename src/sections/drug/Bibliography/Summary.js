import React from 'react';

import BibliographySummary from '../../common/Bibliography/Summary';

const Summary = ({ name, ...rest }) => (
  <BibliographySummary keyword={name} {...rest} />
);

export default Summary;
