import React from 'react';

const Description = ({ target, disease }) => (
  <React.Fragment>
    Differential expression of <strong>{target.symbol}</strong> associated with{' '}
    <strong>{disease.name}</strong>.
  </React.Fragment>
);

export default Description;
