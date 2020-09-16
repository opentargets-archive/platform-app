import React from 'react';

const Summary = ({ data }) => (
  <>
    {data.count} diseases
    <br />
    (through shared targets)
  </>
);

export default Summary;
