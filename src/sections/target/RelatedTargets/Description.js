import React from 'react';

import Link from '../../../components/Link';

function Description({ symbol }) {
  return (
    <>
      Targets that are similar to <strong>{symbol}</strong> based on their
      disease association profiles. Source:{' '}
      <Link external to="https://platform-docs.opentargets.org/">
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
