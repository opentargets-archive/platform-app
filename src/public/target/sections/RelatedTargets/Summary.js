import React from 'react';

const Summary = ({ relatedTargetsCount }) => (
  <React.Fragment>
    {relatedTargetsCount} targets
    <br />
    (through shared diseases)
  </React.Fragment>
);

export default Summary;
