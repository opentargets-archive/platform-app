import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { Link, significantFigures } from 'ot-ui';

const TooltipContent = ({ data }) => (
  <Card>
    <CardContent>
      <Typography align="center">
        <strong>{data.name}</strong>
        <br />
        association score: {significantFigures(data.score)}
        <br />
        <Link to={`/disease/${data.id}`}>Disease profile</Link>
        <br />
        <Link to={`/disease/${data.id}/classic-associations`}>
          Disease associations
        </Link>
        <br />
        <Link to={`/evidence/${data.target.ensgId}/${data.id}`}>
          Association evidence
        </Link>
      </Typography>
    </CardContent>
  </Card>
);

export default TooltipContent;
