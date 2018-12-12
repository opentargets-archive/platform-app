import React from 'react';
import Typography from '@material-ui/core/Typography';

const RelatedTargetsDetail = ({ symbol }) => {
  return (
    <Typography>
      Other targets related to {symbol} based on common associated diseases
    </Typography>
  );
};

export default RelatedTargetsDetail;
