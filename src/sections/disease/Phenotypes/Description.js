import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Clinical signs and symptoms observed in <strong>{name}</strong>. Source:{' '}
    <Link to="https://www.ebi.ac.uk/efo/" external>
      EFO
    </Link>
  </React.Fragment>
);

export default Description;
