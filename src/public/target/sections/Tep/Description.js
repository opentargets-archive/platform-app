import React from 'react';
import { Link } from 'ot-ui';

const Description = ({ symbol }) => {
  return (
    <React.Fragment>
      Critical mass of reagents and knowledge allowing for the rapid biochemical
      and chemical exploration of <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.thesgc.org/tep">
        SGC
      </Link>
      .
    </React.Fragment>
  );
};

export default Description;
