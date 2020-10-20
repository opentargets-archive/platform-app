import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <React.Fragment>
      Phenotypes associated with <strong>{approvedSymbol}</strong> murine
      homologue(s). Source:{' '}
      <Link external to="http://www.informatics.jax.org/phenotypes.shtml">
        MGI
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
