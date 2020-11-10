import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Associated pathways between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>.
  </>
);

export default Description;
