import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Clinical precedence for investigational or approved drugs indicated for{' '}
      <strong>{name}</strong> and curated mechanism of action. Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
      .
    </>
  );
}

export default Description;
