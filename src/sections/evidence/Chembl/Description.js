import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Drugs in clinical trials or approved for <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>.
    </>
  );
}

export default Description;
