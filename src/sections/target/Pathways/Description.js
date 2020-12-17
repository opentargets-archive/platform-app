import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Biological pathways where <strong>{symbol}</strong> is present. Source:{' '}
      <Link external to="https://reactome.org/">
        Reactome
      </Link>
      .
    </>
  );
}

export default Description;
