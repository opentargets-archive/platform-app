import React from 'react';

import { Link } from 'ot-ui';

function Description({ name }) {
  return (
    <React.Fragment>
      Clinical trial records, including curated indication and mechanism of
      action for <strong>{name}</strong>. Source:{' '}
      <Link external to="https://www.ebi.ac.uk/chembl/">
        ChEMBL
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
