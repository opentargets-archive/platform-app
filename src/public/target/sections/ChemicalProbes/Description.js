import React from 'react';

const Description = ({ symbol }) => (
  <React.Fragment>
    Information on chemical probes that have been developed for{' '}
    <strong>{symbol}</strong>.
  </React.Fragment>
);

export default Description;
