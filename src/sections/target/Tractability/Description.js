import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Target tractability assessment for <strong>{symbol}</strong>. Source:{' '}
      <Link
        external
        to="https://platform-docs.opentargets.org/target/tractability"
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
