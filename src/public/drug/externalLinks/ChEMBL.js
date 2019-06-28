import React from 'react';

import { Link } from 'ot-ui';

const ChEMBLLink = ({ chemblId, first }) =>
  chemblId ? (
    <React.Fragment>
      {first ? null : ' | '}
      ChEMBL:{' '}
      <Link
        external
        to={`https://www.ebi.ac.uk/chembl/compound_report_card/${chemblId}/`}
      >
        {chemblId}
      </Link>
    </React.Fragment>
  ) : null;

export default ChEMBLLink;
