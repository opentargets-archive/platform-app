import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Homology and gene/protein tree information for <strong>{symbol}</strong>{' '}
    across selected species. Source:{' '}
    <Link external to="http://www.ensembl.org/Help/View?id=137">
      Ensembl Compara
    </Link>
    .
  </React.Fragment>
);

export default Description;
