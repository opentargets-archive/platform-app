import React from 'react';

import { Link } from 'ot-ui';

const HGNCLink = ({ symbol, first }) =>
  symbol ? (
    <React.Fragment>
      {first ? null : ' | '}
      HGNC:{' '}
      <Link
        external
        to={`https://www.genenames.org/tools/search/#!/all?query=${symbol}`}
      >
        {symbol}
      </Link>
    </React.Fragment>
  ) : null;

export default HGNCLink;
