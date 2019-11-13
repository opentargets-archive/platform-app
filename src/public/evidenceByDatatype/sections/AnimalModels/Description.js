import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ target, disease }) => (
  <React.Fragment>
    Animal models relating <strong>{target.symbol}</strong> and{' '}
    <strong>{disease.name}</strong>, mapping between human and mouse phenotypes
    through{' '}
    <Link
      external
      to="https://docs.targetvalidation.org/data-sources/animal-models#phenodigm"
    >
      PhenoDigm
    </Link>
    .
  </React.Fragment>
);

export default Description;
