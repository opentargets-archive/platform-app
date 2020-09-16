import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Target druggability assessment for <strong>{symbol}</strong>. Source:{' '}
    <Link
      external
      to="https://docs.targetvalidation.org/getting-started/target-tractability"
    >
      Open Targets
    </Link>
    .
  </React.Fragment>
);

export default Description;
