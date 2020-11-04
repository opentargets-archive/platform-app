import React from 'react';

const Description = ({ symbol, diseaseName }) => (
  <>
    Genetic associations between <strong>{symbol}</strong> and{' '}
    <strong>{diseaseName}</strong>.
  </>
);

export default Description;
