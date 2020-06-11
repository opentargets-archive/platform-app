import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Biological pathways where <strong>{symbol}</strong> is present. Source:{' '}
    <Link external to="https://reactome.org/">
      Reactome
    </Link>
    .
  </React.Fragment>
);

export default Description;
