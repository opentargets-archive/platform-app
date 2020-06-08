import React from 'react';
import { Link } from 'ot-ui';

const Section = ({ data }) => {
  return (
    <>
      Critical mass of reagents and knowledge allowing for the rapid biochemical
      and chemical exploration of{' '}
      <Link to={data.uri} external>
        {data.name}
      </Link>
      . Source:{' '}
      <Link to="https://www.thesgc.org/tep" external>
        Structural Genomics Consortium
      </Link>
    </>
  );
};

export default Section;
