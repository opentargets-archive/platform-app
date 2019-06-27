import React from 'react';

import { Link } from 'ot-ui';

import BasePage from '../common/BasePage';

const HomePage = () => {
  return (
    <BasePage>
      <div>Home</div>
      <div>
        <Link to="/target/ENSG00000091831">Target page</Link>
      </div>
      <div>
        <Link to="/disease/EFO_0000384">Disease page</Link>
      </div>
      <div>
        <Link to="/drug/CHEMBL2111100">Drug page</Link>
      </div>
    </BasePage>
  );
};

export default HomePage;
