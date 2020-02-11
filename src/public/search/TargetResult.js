import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

const TargetResult = ({ data }) => {
  return (
    <>
      <Link to={`/target/${data.id}`}>{data.approvedSymbol}</Link>
      <Typography component="div">
        <Clampy clampSize="4">{data.proteinAnnotations.functions[0]}</Clampy>
      </Typography>
      <Typography>Target</Typography>
    </>
  );
};

export default TargetResult;
