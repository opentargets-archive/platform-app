import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Phenotypes associated with <strong>{approvedSymbol}</strong> murine
      homologue(s). Source:{' '}
      <Link external to="http://www.informatics.jax.org/phenotypes.shtml">
        MGI
      </Link>
      .
    </>
  );
}

export default Description;
