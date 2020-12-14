import React from 'react';

function Description({ target, disease }) {
  return (
    <>
      Articles where {target} and {disease} are found in the same sentence.
      Text-mining method evaluating the strength of the association between{' '}
      <strong>{target}</strong> and <strong>{disease}</strong> when they
      co-occur in the literature. Source:{' '}
      <Link to="http://europepmc.org" external>
        Europe PMC
      </Link>
    </>
  );
}

export default Description;
