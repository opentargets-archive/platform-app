import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Associated pathways between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>. Literature-curated list of pathway reactions
    affected by genetic alterations or changes in gene expression that lead to
    disregulation of <strong>{symbol}</strong> in the context of{' '}
    <strong>{name}</strong>. Source:{' '}
    <Link to="https://reactome.org" external>
      Reactome
    </Link>
  </>
);

export default Description;
