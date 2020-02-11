import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

const DiseaseResult = ({ data }) => {
  return (
    <>
      <Link to={`/disease/${data.id}`}>{data.name}</Link>
      <Typography>{data.description}</Typography>
    </>
  );
};

export default DiseaseResult;
