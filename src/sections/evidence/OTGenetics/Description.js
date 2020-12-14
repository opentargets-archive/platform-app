import React from 'react';

function Description({ symbol, name }) {
  return (
    <>
      Genome-wide associated loci prioritisating <strong>{symbol}</strong> as
      likely causal gene for <strong>{name}</strong>. Source:{' '}
      <Link to="https://genetics.opentargets.org" external>
        Open Targets Genetics Portal
      </Link>
    </>
  );
}

export default Description;
