import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => {
  return (
    <>
      Information on Target Enablind Packages (TEPs) that have been developed by
      the{' '}
      <Link to="https://www.thesgc.org/tep" external>
        Structural Genomics Consortium
      </Link>{' '}
      for <strong>{symbol}</strong>.
    </>
  );
};

export default Description;
