import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {(data.count || 0).toLocaleString()} clinical trial records
  </React.Fragment>
);

export default Summary;
