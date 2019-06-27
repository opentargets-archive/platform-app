import React from 'react';

import { Link } from 'ot-ui';

const Description = () => (
  <React.Fragment>
    Essential alterations in cell physiology that dictate malignant growth.
    Cancer hallmarks were originally described by{' '}
    <Link external to="https://www.cell.com/abstract/S0092-8674(00)81683-9">
      Hanahan and Weinberg (2000)
    </Link>{' '}
    and are manually curated by COSMIC and integrated into the Cancer Gene
    Census.
  </React.Fragment>
);

export default Description;
