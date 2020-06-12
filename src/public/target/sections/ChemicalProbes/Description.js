import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default Description;
