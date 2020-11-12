import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Expression of <strong>{symbol}</strong> associated with{' '}
    <strong>{name}</strong>.
  </>
);

export default Description;
