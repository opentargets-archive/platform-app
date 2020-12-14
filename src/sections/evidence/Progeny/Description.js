import React from 'react';
import { Link } from 'ot-ui';

function Description({ symbol, name }) {
  return (
    <>
      Genetic associations between <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>. Pathway-level analysis of gene expression
      perturbation experiments associating <strong>{symbol}</strong> with{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://saezlab.github.io/progeny/" external>
        PROGENy
      </Link>
    </>
  );
}

export default Description;
