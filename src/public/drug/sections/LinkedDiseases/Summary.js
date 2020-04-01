import React from 'react';

const Summary = ({ count }) => (
  <>
    {count} disease{count !== 1 ? 's' : ''}
  </>
);

export default Summary;
