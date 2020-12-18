import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Literature-reported analysis defining gene signatures causally associating{' '}
      <strong>{symbol}</strong> with <strong>{name}</strong>. Source:{' '}
      <Link
        to="https://docs.targetvalidation.org/data-sources/affected-pathways#sysbio "
        external
      >
        Literature
      </Link>
    </>
  );
}

export default Description;
