import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { Link, significantFigures } from 'ot-ui';

const TooltipContent = ({ data }) => (
  <Card>
    <CardContent>
      <Typography align="center">
        <strong>{data.symbol}</strong>
        <br />
        association score: {significantFigures(data.score)}
        <br />
        <Link to={`/target/${data.id}`}>Target profile</Link>
        <br />
        <Link to={`/target/${data.id}/classic-associations`}>
          Target associations
        </Link>
        <br />
        <Link to={`/evidence/${data.id}/${data.disease.efoId}`}>
          Association evidence
        </Link>
      </Typography>
    </CardContent>
  </Card>
);

export default TooltipContent;
