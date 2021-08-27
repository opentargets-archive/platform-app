import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Mutational constraint observed in {symbol} canonical transcript in natural
      populations. Source:{' '}
      <Link external to="https://gnomad.broadinstitute.org">
        gnomAD
      </Link>
      .
    </>
  );
}

export default Description;
