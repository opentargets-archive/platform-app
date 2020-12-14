import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol, diseaseName }) => (
  <>
    Phenome-wide associated loci in the promiximty of <strong>{symbol}</strong>{' '}
    as likely causal gene for <strong>{diseaseName}</strong>. Source{' '}
    <Link to="https://phewascatalog.org" external>
      PheWAS Catalog
    </Link>
  </>
);

export default Description;
