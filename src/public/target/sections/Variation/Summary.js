import React from 'react';

const Summary = ({ common, rare }) => (
  <React.Fragment>
    {`${common.variantsCount} variants (common diseases)`}
    <br />
    {`${rare.mutationsCount} mutations (rare diseases)`}
  </React.Fragment>
);

export default Summary;
