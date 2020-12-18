import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Investigational and approved indications for <strong>{name}</strong>{' '}
      curated from clinical trial records and post-marketing package inserts.
      Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
      .
    </>
  );
}

export default Description;
