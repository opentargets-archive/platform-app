import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, name }) => (
  <>
    Somatic mutation associated with {' '}
    <strong>{symbol}</strong> patients affected by {' '}
    <strong>{name}</strong>. Source:{' '}
    <Link to="https://www.ncbi.nlm.nih.gov/gap/" external>
      dbgap
    </Link>
  </>
);

export default Description;
