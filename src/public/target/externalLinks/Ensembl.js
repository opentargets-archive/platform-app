import React from 'react';

import { Link } from 'ot-ui';

const EnsemblLink = ({ ensgId, first }) =>
  ensgId ? (
    <React.Fragment>
      {first ? null : ' | '}
      Ensembl:{' '}
      <Link
        external
        to={`http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${ensgId}`}
      >
        {ensgId}
      </Link>
    </React.Fragment>
  ) : null;

export default EnsemblLink;
