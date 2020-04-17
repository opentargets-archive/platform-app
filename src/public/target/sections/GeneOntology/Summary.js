import React from 'react';

const Summary = (data) => (
  <React.Fragment>
    {data.molecularFunctionTermsCount +
      data.biologicalProcessTermsCount +
      data.cellularComponentTermsCount}{' '}
    terms in total
    <br />
    {data.molecularFunctionTermsCount} MF • {data.biologicalProcessTermsCount}{' '}
    BP • {data.cellularComponentTermsCount} CC
  </React.Fragment>
);

export default Summary;
