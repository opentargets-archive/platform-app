import React from 'react';
import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Manually curated withdrawn and black box warnings for{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl" external>
        ChEMBL
      </Link>
    </>
  );
}

export default Description;
