import React from 'react';
import Link from '../../../components/Link';

const Description = ({ name }) => (
  <React.Fragment>
    Physical and functional molecular interactions with <strong>{name}</strong>.
    Source:{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      Open Targets
    </Link>
    ,{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      IntAct
    </Link>
    ,{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      Signor
    </Link>
    ,{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      Reactome
    </Link>
    ,{' '}
    <Link to="https://docs.targetvalidation.org/data-sources/" external>
      String
    </Link>
  </React.Fragment>
);

export default Description;
