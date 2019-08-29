import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from 'ot-ui';

const HomePage = () => {
  return (
    <Fragment>
      <div>Home</div>
      <div>
        <Link component={RouterLink} to="/target/ENSG00000091831">
          Target page
        </Link>
      </div>
      <div>
        <Link component={RouterLink} to="/disease/EFO_0000384">
          Disease page
        </Link>
      </div>
      <div>
        <Link component={RouterLink} to="/drug/CHEMBL2111100">
          Drug page
        </Link>
      </div>
      <div>
        <Link component={RouterLink} to="/evidence/ENSG00000091831/EFO_0000305">
          Evidence page
        </Link>
      </div>
    </Fragment>
  );
};

export default HomePage;
