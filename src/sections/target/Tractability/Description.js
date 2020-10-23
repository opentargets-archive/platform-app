import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Target druggability assessment for <strong>{approvedSymbol}</strong>.
      Source:{' '}
      <Link
        external
        to="https://docs.targetvalidation.org/getting-started/target-tractability"
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
