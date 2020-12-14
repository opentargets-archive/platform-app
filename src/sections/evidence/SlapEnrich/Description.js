import React from 'react';
import { Link } from 'ot-ui';

function Description({ symbol, name }) {
  return (
    <>
      Genetic associations between <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>. Pathway-level analysis tool providing enrichment
      on genomic alterations associating <strong>{symbol}</strong> with{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://saezlab.github.io/SLAPenrich/" external>
        SLAPenrich
      </Link>
    </>
  );
}

export default Description;
