import React from 'react';
import { Link } from '@material-ui/core';

function Description({ symbol, diseaseName }) {
  return (
    <>
      Manual gene-validity curations for {symbol} and {diseaseName}. Source:{' '}
      <Link href="https://search.clinicalgenome.org/kb/gene-validity">
        Clingen
      </Link>
    </>
  );
}

export default Description;
