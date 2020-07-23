import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    <strong>{symbol}</strong> functional, positional and structural protein
    information. Source:{' '}
    <Link external to="https://www.uniprot.org/">
      UniProt
    </Link>
    .
  </React.Fragment>
);

export default Description;
