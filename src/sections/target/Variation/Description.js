import React from 'react';

import { Link } from 'ot-ui';

function Description({ symbol }) {
  return (
    <>
      Genomic browser centered on region surrounding <strong>{symbol}</strong>.
      Associated variants are relative to GRCh38 coordinates. Source:{' '}
      <Link external to="https://www.ensembl.org/Homo_sapiens/Info/Index">
        Ensembl
      </Link>{' '}
      and{' '}
      <Link
        external
        to="https://docs.targetvalidation.org/data-sources/genetic-associations"
      >
        Open Targets
      </Link>
      .
    </>
  );
}

export default Description;
