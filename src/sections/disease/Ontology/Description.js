import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Ontology subgraph including children, ancestors and therapeutic areas of{' '}
    <strong>{name}</strong>. Source:{' '}
    <Link to="https://www.ebi.ac.uk/efo/" external>
      EFO
    </Link>
  </React.Fragment>
);

export default Description;
