import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Diseases and phenotypes that are similar to{' '}
    <strong>
      {name} {String.fromCodePoint('9398')}
    </strong>{' '}
    based on their target association profiles. Source:{' '}
    <Link to="http://link.opentargets.io/" external>
      Open Targets
    </Link>
  </React.Fragment>
);

export default Description;
