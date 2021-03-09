import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Clinical relevance and drug responses of tumor genomic alterations on{' '}
      <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.cancergenomeinterpreter.org/biomarkers">
        Tamborero et al. (2018)
      </Link>
      .
    </>
  );
}

export default Description;
