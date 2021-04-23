import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Clinical signs and symptoms observed in <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.ebi.ac.uk/efo/" external>
        EFO
      </Link>
      ,{' '}
      <Link to="https://mondo.monarchinitiative.org/" external>
        MONDO
      </Link>
      ,{' '}
      <Link to="https://hpo.jax.org/app/" external>
        HPO
      </Link>
      .
    </>
  );
}

export default Description;
