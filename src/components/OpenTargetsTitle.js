import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import config from '../config';
import PartnerLockIcon from './PartnerLockIcon';

const styles = () => ({
  root: {
    display: 'inline',
  },
  fat: {
    fontWeight: 1100,
    textTransform: 'capitalize',
  },
  thin: {
    fontWeight: 300,
    textTransform: 'capitalize',
  },
});

const OpenTargetsTitle = ({ classes, className, name }) => {
  const titleClasses = classNames(classes.root, className);
  return (
    <Typography className={titleClasses} variant="h6" color="inherit">
      <span className={classes.fat}>Molecular Targets </span>
      <span className={classes.thin}>{name}</span>
      {config.isPartnerPreview ? (
        <>
          <span className={classes.thin}> - Partner Preview </span>
          <PartnerLockIcon />
        </>
      ) : null}
    </Typography>
  );
};

export default withStyles(styles)(OpenTargetsTitle);
