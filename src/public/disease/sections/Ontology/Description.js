import React from 'react';

const Description = ({ name }) => (
  <React.Fragment>
    The subgraph of EFO containing <strong>{name}</strong>.
  </React.Fragment>
);

export default Description;
