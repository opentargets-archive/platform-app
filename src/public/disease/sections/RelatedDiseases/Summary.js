import React from 'react';

const Summary = ({ relatedDiseasesCount }) => (
  <React.Fragment>
    {relatedDiseasesCount} diseases
    <br />
    (through shared targets)
  </React.Fragment>
);

export default Summary;
