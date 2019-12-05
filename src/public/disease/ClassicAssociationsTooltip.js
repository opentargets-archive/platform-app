import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Link, significantFigures } from 'ot-ui';

const TooltipContent = ({ data }) => {
  const { target, score, efoId } = data;
  return (
    <Card>
      <CardContent>
        <Typography align="center">
          <strong>{target.symbol}</strong>
          <br />
          association score: {significantFigures(score)}
          <br />
          <Link to={`/target/${target.id}`}>Target profile</Link>
          <br />
          <Link to={`/target/${target.id}/classic-associations`}>
            Target associations
          </Link>
          <br />
          <Link to={`/evidence/${target.id}/${efoId}`}>
            Association evidence
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TooltipContent;
