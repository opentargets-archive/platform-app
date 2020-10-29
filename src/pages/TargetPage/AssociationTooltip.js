import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Typography, Link } from '@material-ui/core';

function AssociationTooltip({ ensemblId, efoId, name, score, children }) {
  return (
    <Tooltip
      title={
        <>
          <Typography>{name}</Typography>
          {score ? <Typography>association score: {score}</Typography> : null}
          <Link
            component={RouterLink}
            to={`/disease/${efoId}`}
            underline="none"
          >
            Disease profile
          </Link>
          <Link
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${efoId}`}
            underline="none"
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
