import React from 'react';
import { Link } from 'ot-ui';

const Section = ({ data }) => {
  return (
    <>
      Learn more about the{' '}
      <Link to={data.uri} external>
        {data.name} TEP
      </Link>
      .
    </>
  );
};

export default Section;
