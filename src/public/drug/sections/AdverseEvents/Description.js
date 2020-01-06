import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Post-marketing adverse events for <strong>{name}</strong> submitted by
    healthcare professionals to the FDA Adverse Event Reporting System (FAERS)
    with a log likelihood ratio above a critical value (CV) threshold - see our{' '}
    <Link
      to="https://docs.targetvalidation.org/getting-started/getting-started/drug-summary/pharmacovigilance"
      external
    >
      adverse event report documentation page
    </Link>{' '}
    for more information.
  </React.Fragment>
);

export default Description;
