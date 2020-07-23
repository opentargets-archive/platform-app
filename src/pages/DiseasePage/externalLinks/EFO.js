import React from 'react';

import { Link } from 'ot-ui';

const EFOLink = ({ efoId, first }) =>
  efoId ? (
    <React.Fragment>
      {first ? null : ' | '}
      EFO:{' '}
      <Link
        external
        to={`https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=${efoId}`}
      >
        {efoId}
      </Link>
    </React.Fragment>
  ) : null;

export default EFOLink;
