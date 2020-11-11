import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Somatic mutations between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>.
  </>
);

export default Description;
