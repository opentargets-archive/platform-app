import React from 'react';

const Summary = ({ eventsCount }) => (
  <React.Fragment>
    {eventsCount} adverse event{eventsCount !== 1 ? 's' : ''}
  </React.Fragment>
);

export default Summary;
