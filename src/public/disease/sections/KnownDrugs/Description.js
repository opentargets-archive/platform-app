import React from 'react';

const Description = ({ name }) => (
  <React.Fragment>
    Drugs in clinical trials or approved for <strong>{name}</strong> or ontology
    descendants.
  </React.Fragment>
);

export default Description;
