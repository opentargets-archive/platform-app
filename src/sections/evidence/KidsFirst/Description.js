import React from 'react';
import Link from '../../../components/Link';
 /*-<Link to="https://www.ebi.ac.uk/gxa/home" external>
      Method of comparison
   </Link> */
const Description = ({ symbol, name }) => (
  <>
    Transcriptomic analysis reporting a significant differential expression of {' '}
    <strong>{ symbol}</strong> when comparing control samples with medulloblastoma samples. {' '}
    <strong>{name}</strong> Source:{' '}
   
    <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/tree/dev/analyses/" external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
