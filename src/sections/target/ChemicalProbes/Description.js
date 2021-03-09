import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Potent, selective and cell-permeable chemical modulators for{' '}
      <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.thesgc.org/chemical-probes">
        SGC
      </Link>
      ,{' '}
      <Link external to="https://probeminer.icr.ac.uk/">
        ProbeMiner
      </Link>
      ,{' '}
      <Link external to="https://chemicalprobes.org/">
        ChemicalProbes.org
      </Link>
      .
    </>
  );
}

export default Description;
