import React from 'react';

const Description = ({ symbol }) => (
  <React.Fragment>
    Drugs in clinical trials or approved for <strong>{symbol}</strong>.
  </React.Fragment>
);

export default Description;
