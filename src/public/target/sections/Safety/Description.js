import React from 'react';

const Description = ({ symbol }) => (
  <React.Fragment>
    Known safety effects and safety risk information for{' '}
    <strong>{symbol}</strong>.
  </React.Fragment>
);

export default Description;
