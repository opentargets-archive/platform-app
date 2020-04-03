import React from 'react';

const Summary = ({ uniqueBiomarkers, uniqueDrugs }) => (
  <React.Fragment>
    {uniqueBiomarkers} biomarkers
    <br />
    (affecting {uniqueDrugs} drug{uniqueDrugs === 1 ? "'s" : "s'"}{' '}
    responsiveness)
  </React.Fragment>
);

export default Summary;
