import React from 'react';

const Description = ({ name }) => (
  <React.Fragment>
    Diseases related to <strong>{name}</strong> based on shared target
    associations.
  </React.Fragment>
);

export default Description;
