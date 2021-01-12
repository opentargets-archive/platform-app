import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Clinical candidates and/or approved drugs pharmacologically targeting{' '}
      <strong>{symbol}</strong> and indicated for <strong>{name}</strong>.
      Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
    </>
  );
}

export default Description;
