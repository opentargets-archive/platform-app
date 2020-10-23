import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Targets that are similar to <strong>{approvedSymbol}</strong> based on
      their disease association profiles. Source:{' '}
      <Link
        external
        to="https://docs.targetvalidation.org/faq/how-do-you-compute-target-and-disease-similarities"
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
