import React from 'react';
import { Link } from 'ot-ui';

function Description({ name }) {
  return (
    <React.Fragment>
      Investigational and approved indications for <strong>{name}</strong>{' '}
      curated from clinical trial records and post-marketing package inserts.
      Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
