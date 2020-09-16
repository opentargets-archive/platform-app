import React from 'react';

const Summary = ({ data }) => (
  <>
    {data.count} targets
    <br />
    (through shared diseases)
  </>
);

export default Summary;
