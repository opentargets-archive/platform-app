import React from 'react';
import BasePage from './BasePage';
import { Link } from 'react-router-dom';

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
    </BasePage>
  );
};

export default HomePage;
