import React from 'react';

import Link from './Link';

const MultiplePmIdsLink = ({ pmIds }) =>
  pmIds.length > 0 ? (
    <Link
      external
      to={`https://europepmc.org/search?query=${pmIds
        .map(l => `EXT_ID:${l}`)
        .join('%20OR%20')}`}
    >
      {pmIds.length} publication{pmIds.length === 1 ? '' : 's'}
    </Link>
  ) : (
    'N/A'
  );

export default MultiplePmIdsLink;
