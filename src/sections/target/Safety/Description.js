import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <React.Fragment>
      Known target safety effects and target safety risk information for{' '}
      <strong>{approvedSymbol}</strong>. Source:{' '}
      <Link
        external
        to="https://docs.targetvalidation.org/getting-started/target-safety"
      >
        Open Targets
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
