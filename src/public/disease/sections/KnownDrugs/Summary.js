import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {(data.uniqueDrugs || 0).toLocaleString()} drugs witn{' '}
    {(data.uniqueTargets || 0).toLocaleString()} targets
  </React.Fragment>
);

export default Summary;
