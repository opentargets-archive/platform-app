import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Genetic associations between <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>. Literature-reported analysis defining gene
      signatures causally associating <strong>{symbol}</strong> with{' '}
      <strong>{name}</strong>. Source:{' '}
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
