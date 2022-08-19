import React from 'react';
import config from '../../../config';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Genome-wide associated loci prioritisating <strong>{symbol}</strong> as
      likely causal gene for <strong>{name}</strong>. Source:{' '}
      <Link to={config.geneticsPortalUrl} external>
        Open Targets Genetics Portal
      </Link>
    </>
  );
}

export default Description;
