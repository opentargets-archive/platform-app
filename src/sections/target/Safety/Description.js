import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Reported safety effects and risk information for <strong>{symbol}</strong>
      . Source:{' '}
      <Link external to="https://platform-docs.opentargets.org/target/safety">
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
