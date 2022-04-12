import React from 'react';
import Link from '../../../components/Link';

function Description({ symbol, diseaseName }) {
  // TODO: update sources links
  return (
    <>
      Gene burden analysis prioritising <strong>{symbol}</strong> as likely
      causal gene for <strong>{diseaseName}</strong>. Source:{' '}
      <Link external to="http://home.opentargets.org/">
        GWAS Catalog
      </Link>
      ,{' '}
      <Link external to="http://home.opentargets.org/">
        AstraZeneca PheWAS Portal
      </Link>
      .
    </>
  );
}

export default Description;
