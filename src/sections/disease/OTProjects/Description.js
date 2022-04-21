import React from 'react';

import Link from '../../../components/Link';

function Description({ name }) {
  return (
    <React.Fragment>
      Active and closed projects for <strong>{name}</strong>. Source:{' '}
      <Link external to="http://home.opentargets.org/">
        Open Targets
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
