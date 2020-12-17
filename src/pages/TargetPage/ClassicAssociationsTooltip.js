import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { decimalPlaces } from '../../constants';
import Link from '../../components/Link';

const TooltipContent = ({ data }) => (
  <Card>
    <CardContent>
      <Typography align="center">
        <strong>{data.name}</strong>
        <br />
        association score: {data.score.toFixed(decimalPlaces)}
        <br />
        <Link to={`/disease/${data.id}`}>Disease profile</Link>
        <br />
        {/* <Link to={`/disease/${data.id}/classic-associations`}>
          Disease associations
        </Link>
        <br /> */}
        <Link
          to={`https://targetvalidation.org/evidence/${data.target.ensgId}/${
            data.id
          }`}
          external
        >
          Association evidence
        </Link>
      </Typography>
    </CardContent>
  </Card>
);

export default TooltipContent;
