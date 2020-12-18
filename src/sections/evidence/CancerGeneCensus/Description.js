import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol, diseaseName }) => (
  <>
    Catalogue of somatic mutations that causally implicate{' '}
    <strong>{symbol}</strong> in <strong>{diseaseName}</strong>. Source:{' '}
    <Link to="https://cancer.sanger.ac.uk/census" external>
      COSMIC
    </Link>
  </>
);

export default Description;
