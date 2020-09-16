import React from 'react';

const Summary = ({ data }) => (
  <React.Fragment>
    {data.uniqueBiomarkers} biomarkers
    <br />
    (affecting {data.uniqueDrugs} drug{data.uniqueDrugs === 1 ? "'s" : "s'"}{' '}
    responsiveness)
  </React.Fragment>
);

export default Summary;
