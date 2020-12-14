import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Drugs in clinical trials or approved for <strong>{symbol}</strong> and{' '}
      <strong>{name}</strong>. Clinical candidates and/or approved drugs
      pharmacologically targeting <strong>{symbol}</strong> and indicated for{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
    </>
  );
}

export default Description;
