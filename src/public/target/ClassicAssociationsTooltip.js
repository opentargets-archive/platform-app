import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        <Link to={`/evidence/${data.target.ensgId}/${data.id}`}>
          Association evidence
        </Link>
      </Typography>
    </CardContent>
  </Card>
);

export default TooltipContent;
