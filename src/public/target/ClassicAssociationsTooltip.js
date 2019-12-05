import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Link, significantFigures } from 'ot-ui';

const TooltipContent = ({ data }) => {
  const { disease, score, ensgId } = data;
  return (
    <Card>
      <CardContent>
        <Typography align="center">
          <strong>{disease.name}</strong>
          <br />
          association score: {significantFigures(score)}
          <br />
          <Link to={`/disease/${disease.id}`}>Disease profile</Link>
          <br />
          <Link to={`/disease/${disease.id}/classic-associations`}>
            Disease associations
          </Link>
          <br />
          <Link to={`/evidence/${ensgId}/${disease.id}`}>
            Association evidence
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TooltipContent;
