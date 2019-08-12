import React from 'react';

const Summary = ({ linkedDiseaseCount }) => (
  <React.Fragment>
    {linkedDiseaseCount} disease{linkedDiseaseCount !== 1 ? 's' : ''}
  </React.Fragment>
);

export default Summary;
