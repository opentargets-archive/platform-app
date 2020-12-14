import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol, name }) => (
  <>
    Germline variation associated with <strong>{symbol}</strong> on patients
    affected by <strong>{name}</strong>. Source:{' '}
    <Link to="https://www.ebi.ac.uk/eva/" external>
      EVA
    </Link>
  </>
);

export default Description;
