import React from 'react';
import { Link } from 'ot-ui';

function Description({ name }) {
  return (
    <>
      Significant post-marketing adverse events for <strong>{name}</strong>{' '}
      estimated from reports submitted to the FDA Adverse Event Reporting
      database by healthcare professionals. Source:{' '}
      <Link
        to="https://docs.targetvalidation.org/getting-started/getting-started/drug-summary/pharmacovigilance"
        external
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
