import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, name }) {
  return (
    <>
      Supporting diagnostic evidence associating <strong>{symbol}</strong> with{' '}
      <strong>{name}</strong>. Source:{' '}
      <Link to="https://www.ebi.ac.uk/gene2phenotype" external>
        Gene2Phenotype
      </Link>
    </>
  );
}

export default Description;
