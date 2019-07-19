import React from 'react';

const Summary = ({ linkedTargetCount }) => (
  <React.Fragment>
    {linkedTargetCount} target{linkedTargetCount !== 1 ? 's' : ''}
  </React.Fragment>
);

export default Summary;
