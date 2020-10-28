import React from 'react';
import { Link } from 'ot-ui';

function Description({ symbol }) {
  return (
    <>
      Critical mass of reagents and knowledge allowing for the rapid biochemical
      and chemical exploration of <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.thesgc.org/tep">
        SGC
      </Link>
      .
    </>
  );
}

export default Description;
