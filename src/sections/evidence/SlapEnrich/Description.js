import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Pathway-level analysis tool providing enrichment on genomic alterations
      associating <strong>{symbol}</strong> with <strong>{name}</strong>.
      Source:{' '}
      <Link to="https://saezlab.github.io/SLAPenrich/" external>
        SLAPenrich
      </Link>
    </>
  );
}

export default Description;
