import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Annotations for <strong>{symbol}</strong>. Source:{' '}
    <Link external to="https://www.uniprot.org/">
      UniProt
    </Link>
    .
  </React.Fragment>
);

export default Description;
