import React from 'react';
import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <>
      Critical mass of reagents and knowledge allowing for the rapid biochemical
      and chemical exploration of <strong>{approvedSymbol}</strong>. Source:{' '}
      <Link external to="https://www.thesgc.org/tep">
        SGC
      </Link>
      .
    </>
  );
}

export default Description;
