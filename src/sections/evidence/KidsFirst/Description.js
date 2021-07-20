import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, name }) => (
  <>
    Transcriptomic analysis reporting a significant differential expression of
    BRCA2
    <strong>{symbol}</strong> when comparing control samples with
    medulloblastoma samples.
    <strong>{name}</strong> Source:{' '}
    <Link to="https://www.ebi.ac.uk/gxa/home" external>
      Method of comparison
    </Link>
  </>
);

export default Description;
