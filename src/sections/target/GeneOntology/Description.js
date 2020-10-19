import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Annotations for <strong>{approvedSymbol}</strong>. Source:{' '}
      <Link external to="https://www.uniprot.org/">
        UniProt
      </Link>
      .
    </>
  );
}

export default Description;
