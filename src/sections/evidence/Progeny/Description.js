import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Genetic associations between <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>.
    </>
  );
}

export default Description;
