import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>{data.count} drugs in clinical trials</React.Fragment>
);

export default Summary;
