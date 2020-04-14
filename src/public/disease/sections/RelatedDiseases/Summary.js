import React from 'react';

const Summary = ({ count }) => (
  <React.Fragment>
    {count} diseases
    <br />
    (through shared targets)
  </React.Fragment>
);

export default Summary;
