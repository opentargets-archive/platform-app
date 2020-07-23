import React from 'react';

import BibliographySummary from '../../common/Bibliography/Summary';

const Summary = ({ efoId, ...rest }) => (
  <BibliographySummary keyword={efoId} {...rest} />
);

export default Summary;
