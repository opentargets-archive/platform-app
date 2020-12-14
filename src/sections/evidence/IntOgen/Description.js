import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Genetic associations between <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>. Integrative analysis of large-scale mutation data
      pinpointing <strong>{symbol}</strong> as driver gene in{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.intogen.org/search" external>
        IntOGen
      </Link>
    </>
  );
}

export default Description;
