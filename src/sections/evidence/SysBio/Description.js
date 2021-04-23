import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Literature-reported analysis defining gene signatures causally associating{' '}
      <strong>{symbol}</strong> with <strong>{name}</strong>. Source:{' '}
      <Link
        to="https://platform-docs.opentargets.org/evidence#gene-signatures"
        external
      >
        Open Targets
      </Link>
    </>
  );
}

export default Description;
