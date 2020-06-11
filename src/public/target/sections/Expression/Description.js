import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    RNA and protein baseline expression for <strong>{symbol}</strong>. Source:{' '}
    <Link external to="https://www.ebi.ac.uk/gxa/home">
      ExpressionAtlas
    </Link>
    ,{' '}
    <Link external to="https://www.proteinatlas.org/">
      HPA
    </Link>{' '}
    and{' '}
    <Link external to="https://www.gtexportal.org/home/">
      GTEx
    </Link>
    .
  </React.Fragment>
);

export default Description;
