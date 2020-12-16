import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Text-mining method evaluating the strength of the association between{' '}
      <strong>{symbol}</strong> and <strong>{name}</strong> when they co-occur
      in the literature. Source:{' '}
      <Link to="http://europepmc.org" external>
        Europe PMC
      </Link>
    </>
  );
}

export default Description;
