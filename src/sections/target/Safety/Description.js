import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Known target safety effects and target safety risk information for{' '}
    <strong>{symbol}</strong>. Source:{' '}
    <Link
      external
      to="https://docs.targetvalidation.org/getting-started/target-safety"
    >
      Open Targets
    </Link>
    .
  </React.Fragment>
);

export default Description;
