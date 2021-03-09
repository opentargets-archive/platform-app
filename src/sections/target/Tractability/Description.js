import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Target druggability assessment for <strong>{symbol}</strong>. Source:{' '}
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
