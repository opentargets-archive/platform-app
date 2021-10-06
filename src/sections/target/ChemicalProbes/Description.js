import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Potent, selective and cell-permeable chemical modulators for{' '}
      <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.probes-drugs.org/">
        Probes & Drugs
      </Link>
    </>
  );
}

export default Description;
