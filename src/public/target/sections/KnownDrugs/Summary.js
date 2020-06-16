import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {(data.uniqueDrugs || 0).toLocaleString()} drugs with{' '}
    {(data.uniqueDiseases || 0).toLocaleString()} indications
  </React.Fragment>
);

export default Summary;
