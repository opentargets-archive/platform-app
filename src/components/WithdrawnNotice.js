import React from 'react';
import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '.5rem',
  },
  text: {
    color: 'white',
  },
  popper: {
    opacity: 1,
  },
  tooltip: {
    backgroundColor: theme.palette.error.main,
  },
  warningIcon: {
    position: 'relative',
    top: '5px',
  },
}));

function WithdrawnNotice({ withdrawnNotice }) {
  const classes = useStyles();

  if (!withdrawnNotice) return null;

  return (
    <Box className={classes.container}>
      <Typography variant="subtitle2" color="secondary">
        <Tooltip
          classes={{ tooltip: classes.tooltip, popper: classes.popper }}
          title={
            <Typography className={classes.text}>
              <strong>Class: </strong>
              {withdrawnNotice.classes
                ? withdrawnNotice.classes.join(', ')
                : 'Unknown'}
              <br />
              <strong>Reason: </strong>
              {withdrawnNotice.reasons
                ? withdrawnNotice.reasons.join(', ')
                : 'Unknown'}
              <br />
              <strong>Year first withdrawn: </strong>
              {withdrawnNotice.year}
              <br />
              <strong>Withdrawn in: </strong>
              {withdrawnNotice.countries.length > 0
                ? withdrawnNotice.countries.join(', ')
                : null}
              <br />
            </Typography>
          }
          placement="right"
        >
          <WarningIcon className={classes.warningIcon} />
        </Tooltip>{' '}
        Withdrawn Drug
      </Typography>
    </Box>
  );
}

export default WithdrawnNotice;
