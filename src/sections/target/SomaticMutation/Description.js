import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, name }) => (
  <>
    Somatic mutation associated with {' '}
    <strong>{symbol}</strong> patients affected by {' '}
    <strong>{name}</strong>. Source:{' '}
    <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/tree/dev/analyses/" external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
