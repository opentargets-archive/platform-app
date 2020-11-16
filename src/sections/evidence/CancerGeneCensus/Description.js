import React from 'react';

const Description = ({ symbol, diseaseName }) => (
  <>
    Somatic mutations between <strong>{symbol}</strong> and{' '}
    <strong>{diseaseName}</strong>.
  </>
);

export default Description;
