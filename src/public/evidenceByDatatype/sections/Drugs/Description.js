import React from 'react';

const Description = ({ target, disease }) => (
  <React.Fragment>
    Drugs in clinical trials or approved for <strong>{target.symbol}</strong>{' '}
    and <strong>{disease.name}</strong>.
  </React.Fragment>
);

export default Description;
