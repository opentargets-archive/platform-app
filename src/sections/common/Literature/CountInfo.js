import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import {
  litsCountState,
  loadingEntitiesState,
  tablePageSizeState,
} from './atoms';

const useStyles = makeStyles(() => ({
  resultCount: {
    marginLeft: '2rem',
    marginRight: '6rem',
  },
}));

function CountInfo() {
  const classes = useStyles();
  const pageSize = useRecoilValue(tablePageSizeState);
  const count = useRecoilValue(litsCountState);
  const loadingEntities = useRecoilValue(loadingEntitiesState);

  if (loadingEntities)
    return <div className={classes.resultCount}>Loading count...</div>;

  return (
    <Typography variant="body2" className={classes.resultCount}>
      Showing {count > pageSize ? pageSize : count} of {count} results
    </Typography>
  );
}

export default CountInfo;
