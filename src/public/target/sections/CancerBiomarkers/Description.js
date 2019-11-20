import React from 'react';

import { Link } from 'ot-ui';

const Description = () => (
  <React.Fragment>
    Genomic biomarkers of drug responses and their levels of clinical
    significance as described by{' '}
    <Link external to="https://europepmc.org/articles/PMC5875005">
      {' '}
      Tamborero et al. (2018)
    </Link>
    . This data is manually curated by clinical and scientific communities in
    the field of precision oncology.
  </React.Fragment>
);

export default Description;
