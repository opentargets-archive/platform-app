import React from 'react';

const Description = ({ symbol, diseaseName }) => (
  <>
    Literature-based curation associating genetic variations affecting{' '}
    <strong>{symbol}</strong> protein products with{' '}
    <strong>{diseaseName}</strong>. Source:{' '}
    <Link to="https://www.uniprot.org" external>
      UniProt
    </Link>
  </>
);

export default Description;
