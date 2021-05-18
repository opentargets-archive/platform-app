import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Significant post-marketing adverse events for <strong>{name}</strong>{' '}
      estimated from reports submitted to the FDA Adverse Event Reporting
      database by healthcare professionals. Source:{' '}
      <Link
        to="https://platform-docs.opentargets.org/drug/pharmacovigilence"
        external
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
