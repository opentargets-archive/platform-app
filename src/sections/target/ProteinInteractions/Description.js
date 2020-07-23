import React from 'react';

const Description = ({ symbol }) => (
  <React.Fragment>
    Summary of interactions for <strong>{symbol}</strong> based on OmniPath DB
    data.
  </React.Fragment>
);

export default Description;
