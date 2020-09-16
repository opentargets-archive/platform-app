import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    <strong>{name}</strong> biochemical interactions to produce intended
    pharmacological effects. Curated from scientific literature and
    post-marketing package inserts. Source:{' '}
    <Link to="https://www.ebi.ac.uk/chembl/" external>
      ChEMBL
    </Link>
  </React.Fragment>
);

export default Description;
