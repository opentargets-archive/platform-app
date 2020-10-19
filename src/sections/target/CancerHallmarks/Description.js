import React from 'react';

import { Link } from 'ot-ui';

function Description({ approvedSymbol }) {
  return (
    <React.Fragment>
      Role of <strong>{approvedSymbol}</strong> in essential alterations in cell
      physiology that dictate malignant growth. Source:{' '}
      <Link external to="https://cancer.sanger.ac.uk/cosmic">
        COSMIC
      </Link>
      .
    </React.Fragment>
  );
}

export default Description;
