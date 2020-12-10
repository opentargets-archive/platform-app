import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Clinical signs and symptoms observed in <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.ebi.ac.uk/efo/" external>
        EFO
      </Link>
      .
    </>
  );
}

export default Description;
