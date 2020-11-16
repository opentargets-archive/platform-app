import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Genetic associations between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>.
  </>
);

export default Description;
