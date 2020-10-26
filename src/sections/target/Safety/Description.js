import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Known target safety effects and target safety risk information for{' '}
      <strong>{approvedSymbol}</strong>. Source:{' '}
      <Link
        external
        to="https://docs.targetvalidation.org/getting-started/target-safety"
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
