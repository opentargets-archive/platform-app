import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Clinical precedence for investigational or approved drugs indicated for{' '}
    <strong>{name}</strong> and curated mechanism of action. Source:{' '}
    <Link to="https://www.ebi.ac.uk/chembl/" external>
      ChEMBL
    </Link>
  </React.Fragment>
);

export default Description;
