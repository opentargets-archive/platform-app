import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, name }) => (
  <>
    Somatic mutations associated with {' '}
    <strong>{symbol}</strong> in pediatric {' '}
    <strong>{name}</strong>. Source:{' '}
    <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external>
      OpenPedCan (v10) 
    </Link>{', '}
    <Link to=" https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>
      TARGET (v23)
    </Link>{', '}
    <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external>
      Kids First Neuroblastoma
    </Link>{', '}
    <Link to="https://www.ccdatalab.org/openpbta" external>
      OpenPBTA for the CBTN (v21)
    </Link>{', '}
    <Link to="https://www.oncokb.org/news#07162021" external>
      OncoKB (v3.5)
    </Link>
  </>
);

export default Description;
