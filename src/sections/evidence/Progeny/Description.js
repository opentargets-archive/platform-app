import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Pathway-level analysis of gene expression perturbation experiments
      associating <strong>{symbol}</strong> with <strong>{name}</strong>.
      Source:{' '}
      <Link to="https://saezlab.github.io/progeny/" external>
        PROGENy
      </Link>
    </>
  );
}

export default Description;
