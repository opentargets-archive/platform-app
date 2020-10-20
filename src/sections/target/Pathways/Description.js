import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <React.Fragment>
      Biological pathways where <strong>{approvedSymbol}</strong> is present.
      Source:{' '}
      <Link external to="https://reactome.org/">
        Reactome
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
