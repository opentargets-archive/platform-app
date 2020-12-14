import React from 'react';
import { Link } from 'ot-ui';

function Description({ symbol, name }) {
  return (
    <>
      Integrative analysis of large-scale mutation data pinpointing{' '}
      <strong>{symbol}</strong> as driver gene in <strong>{name}</strong>.
      Source:{' '}
      <Link to="https://www.intogen.org/search" external>
        IntOGen
      </Link>
    </>
  );
}

export default Description;
