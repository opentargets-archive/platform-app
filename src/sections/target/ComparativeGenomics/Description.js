import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Homology for <strong>{symbol}</strong> across selected species. Source:{' '}
      <Link external to="http://www.ensembl.org/Help/View?id=137">
        Ensembl Compara
      </Link>
      .
    </>
  );
}

export default Description;
