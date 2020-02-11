import React from 'react';
import { Link } from 'ot-ui';

const DrugResult = ({ data }) => {
  return (
    <div>
      <Link to={`drug/${data.id}`}>{data.name}</Link>
    </div>
  );
};

export default DrugResult;
