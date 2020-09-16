import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ name }) => (
  <React.Fragment>
    Physical and functional molecular interactions with <strong>{name}</strong>.
    Source:{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      Open Targets
    </Link>
  </React.Fragment>
);

export default Description;
