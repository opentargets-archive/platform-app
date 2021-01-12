import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Mapping of phenotypes in <strong>{symbol}</strong> animal model mutants
      similar to <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.sanger.ac.uk/tool/phenodigm/" external>
        Phenodigm
      </Link>
    </>
  );
}

export default Description;
