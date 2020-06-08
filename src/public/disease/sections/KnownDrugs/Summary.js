import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {(data.uniqueDrugs || 0).toLocaleString()} drugs in clinical trials
  </React.Fragment>
);

export default Summary;
