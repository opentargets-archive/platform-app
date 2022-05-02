import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, name }) => (
  <>
    Prepublication CRISPR knockout screens from Open Targets (OTAR) experimental
    projects, associating <strong>{symbol}</strong> and <strong>{name}</strong>.
    Source:{' '}
    <Link external to="http://home.opentargets.org/">
      Open Targets
    </Link>
  </>
);

export default Description;
