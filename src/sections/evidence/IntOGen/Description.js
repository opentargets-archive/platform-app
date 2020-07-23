import React from 'react';

const Description = ({ target, disease }) => (
  <React.Fragment>
    Somatic mutations between <strong>{target.symbol}</strong> and{' '}
    <strong>{disease.name}</strong>.
  </React.Fragment>
);

export default Description;
