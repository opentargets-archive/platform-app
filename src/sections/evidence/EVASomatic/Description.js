import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol, name }) => (
  <>
    Somatic mutations between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>. Somatic variation associated with{' '}
    <strong>{symbol}</strong> on patients affected by <strong>{name}</strong>.
    Source:{' '}
    <Link to="https://www.ebi.ac.uk/eva/" external>
      EVA
    </Link>
  </>
);

export default Description;
