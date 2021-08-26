import React from 'react';

function Description({ symbol }) {
  return (
    <>
      Pathogenicity metrics for the Ensembl canonical transcript of {symbol}.
      Source:{' '}
      <Link external to="https://gnomad.broadinstitute.org">
        gnomAD
      </Link>
      .
    </>
  );
}

export default Description;
