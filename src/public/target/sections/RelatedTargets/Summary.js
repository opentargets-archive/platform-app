import React from 'react';

const Summary = ({ count }) => (
  <React.Fragment>
    {count} targets
    <br />
    (through shared diseases)
  </React.Fragment>
);

export default Summary;
