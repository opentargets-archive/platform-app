import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Homology and gene/protein tree information for{' '}
      <strong>{approvedSymbol}</strong> across selected species. Source:{' '}
      <Link external to="http://www.ensembl.org/Help/View?id=137">
        Ensembl Compara
      </Link>
      .
    </>
  );
}

export default Description;
