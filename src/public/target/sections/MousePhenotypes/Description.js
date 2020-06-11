import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Phenotypes associated with <strong>{symbol}</strong> murine homologue(s).{' '}
    Source:{' '}
    <Link external to="http://www.informatics.jax.org/phenotypes.shtml">
      MGI
    </Link>
    .
  </React.Fragment>
);

export default Description;
