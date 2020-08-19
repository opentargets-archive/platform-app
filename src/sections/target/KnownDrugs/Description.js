import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Clinical precedence for drugs with investigational or approved indications
    targeting <strong>{name}</strong> according to their curated mechanism of
    action. Source:{' '}
    <Link external to="https://www.ebi.ac.uk/chembl/">
      ChEMBL
    </Link>
    .
  </React.Fragment>
);

export default Description;
