import React from 'react';

const Summary = ({ cancerBiomarkerCount, drugCount }) => (
  <React.Fragment>
    {cancerBiomarkerCount} biomarkers
    <br />
    (affecting {drugCount} drug{drugCount === 1 ? "'s" : "s'"} responsiveness)
  </React.Fragment>
);

export default Summary;
