import React from 'react';

import { Link } from 'ot-ui';

const Description = ({ symbol }) => (
  <React.Fragment>
    Summary of tractability assessment for <strong>{symbol}</strong> for small
    molecule, antibody, and other modalities. For more information on the
    tractability assessment and descriptions of each bucket, please read{' '}
    <Link
      external
      to="https://docs.targetvalidation.org/getting-started/target-tractability"
    >
      the tractability section of our documentation
    </Link>
    .
  </React.Fragment>
);

export default Description;
