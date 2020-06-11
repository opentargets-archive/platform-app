import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Clinical relevance and drug responses of tumor genomic alterations on{' '}
    <strong>{symbol}</strong>. Source:{' '}
    <Link external to="https://www.cancergenomeinterpreter.org/biomarkers">
      Tamborero et al. (2018)
    </Link>
    .
  </React.Fragment>
);

export default Description;
