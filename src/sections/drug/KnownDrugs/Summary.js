import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {(data.uniqueTargets || 0).toLocaleString()} targets and{' '}
    {(data.uniqueDiseases || 0).toLocaleString()} indications
  </React.Fragment>
);

export default Summary;
