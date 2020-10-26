import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Clinical relevance and drug responses of tumor genomic alterations on{' '}
      <strong>{approvedSymbol}</strong>. Source:{' '}
      <Link external to="https://www.cancergenomeinterpreter.org/biomarkers">
        Tamborero et al. (2018)
      </Link>
      .
    </>
  );
}

export default Description;
