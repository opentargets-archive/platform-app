import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { decimalPlaces } from '../../constants';

const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[400]}`,
  },
}));

function AssociationTooltip({ ensemblId, efoId, name, score, children }) {
  const classes = useStyles();
  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={
        <>
          <Typography variant="subtitle2" align="center" color="textPrimary">
            {name}
          </Typography>
          {score ? (
            <Typography variant="body2" align="center" color="textPrimary">
              association score: {score.toFixed(decimalPlaces)}
            </Typography>
          ) : null}
          <Link
            component={RouterLink}
            to={`/disease/${efoId}`}
            underline="none"
            display="block"
            align="center"
            variant="body2"
          >
            Disease profile
          </Link>
          <Link
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${efoId}`}
            underline="none"
            display="block"
            align="center"
            variant="body2"
          >
            Association evidence
          </Link>
        </>
      }
      interactive
      placement="top"
    >
      {children}
    </Tooltip>
  );
}

export default AssociationTooltip;
