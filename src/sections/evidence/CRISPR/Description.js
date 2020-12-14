import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol, name }) => (
  <>
    Associated pathways between <strong>{symbol}</strong> and{' '}
    <strong>{name}</strong>. Cancer cell line dependencies identified using
    CRISPR-Cas9 whole genome screenings pinpointing a <strong>{symbol}</strong>{' '}
    dependency in <strong>{name}</strong>. Source:{' '}
    <Link to="https://score.depmap.sanger.ac.uk" external>
      Project Score
    </Link>
  </>
);

export default Description;
