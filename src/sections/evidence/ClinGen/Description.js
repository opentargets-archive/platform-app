import React from 'react';
import { Link } from '@material-ui/core';

function Description({ symbol, diseaseName }) {
  return (
    <>
      Manual gene-validity curations for <strong>{symbol}</strong> and{' '}
      <strong>{diseaseName}</strong>. Source:{' '}
      <Link href="https://search.clinicalgenome.org/kb/gene-validity">
        Clingen
      </Link>
    </>
  );
}

export default Description;
