import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Known target safety effects and target safety risk information for{' '}
      <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://platform-docs.opentargets.org/target/safety">
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
