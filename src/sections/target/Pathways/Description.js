import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Biological pathways where <strong>{approvedSymbol}</strong> is present.
      Source:{' '}
      <Link external to="https://reactome.org/">
        Reactome
      </Link>
      .
    </>
  );
}

export default Description;
