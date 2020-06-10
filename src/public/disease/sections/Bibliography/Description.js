import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Scientific literature related to <strong>{name}</strong> based on text
    mining PubMed abstracts. Source:{' '}
    <Link to="http://link.opentargets.io/" external>
      Open Targets
    </Link>
  </React.Fragment>
);

export default Description;
