import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <>
      Diseases and phenotypes that are similar to{' '}
      <strong>
        {name} {String.fromCodePoint('9398')}
      </strong>{' '}
      based on their target association profiles. Source:{' '}
      <Link to="http://link.opentargets.io/" external>
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
