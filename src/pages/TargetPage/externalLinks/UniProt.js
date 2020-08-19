import React from 'react';

import { Link } from 'ot-ui';

const UniprotLink = ({ uniprotId, first }) =>
  uniprotId ? (
    <React.Fragment>
      {first ? null : ' | '}
      UniProt:{' '}
      <Link external to={`https://www.uniprot.org/uniprot/${uniprotId}`}>
        {uniprotId}
      </Link>
    </React.Fragment>
  ) : null;

export default UniprotLink;
