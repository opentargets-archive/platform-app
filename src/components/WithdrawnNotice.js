import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  text: {
    color: 'white',
  },
});

const WithdrawnNotice = ({ classes, withdrawnNotice }) => (
  <Typography className={classes.text}>
    <strong>Class: </strong>
    {withdrawnNotice.classes ? withdrawnNotice.classes.join(', ') : 'Unknown'}
    <br />
    <strong>Reason: </strong>
    {withdrawnNotice.reasons ? withdrawnNotice.reasons.join(', ') : 'Unknown'}
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
);

export default withStyles(styles)(WithdrawnNotice);
