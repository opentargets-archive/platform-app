import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol }) => (
  <>
    RNA expression 
    <strong> {symbol} </strong>
    in tumor tissues from various histologies. {' '}
     Source:{' '}
   
    <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/tree/dev/analyses/" external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
