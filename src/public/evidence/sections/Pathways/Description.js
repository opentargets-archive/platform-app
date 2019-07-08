import React from 'react';

const Description = ({ target, disease }) => (
  <React.Fragment>
    Pathways associated with <strong>{disease.name}</strong> involving{' '}
    <strong>{target.symbol}</strong>.
  </React.Fragment>
);

export default Description;
