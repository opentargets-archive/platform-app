import React from 'react';

import { Link } from 'ot-ui';

const GeneCardsLink = ({ symbol, first }) =>
  symbol ? (
    <React.Fragment>
      {first ? null : ' | '}
      GeneCards:{' '}
      <Link
        external
        to={`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${symbol}`}
      >
        {symbol}
      </Link>
    </React.Fragment>
  ) : null;

export default GeneCardsLink;
