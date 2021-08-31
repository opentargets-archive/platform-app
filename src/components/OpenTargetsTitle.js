import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import config from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';

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
      <span className={classes.fat}>Open Targets </span>
      <span className={classes.thin}>{name}</span>
      {config.isPartnerPreview ? (
        <>
          <span className={classes.thin}> - Partner Preview </span>
          <Tooltip title="The partner preview Platform contains all data found in the public Platform along with pre-publication data from Open Targets' projects and new features developed by the Platform team. Please do not share data or screenshots outside of the consortium partners. For more information, please email helpdesk@opentargets.org.">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
          </Tooltip>
        </>
      ) : null}
    </Typography>
  );
};

export default withStyles(styles)(OpenTargetsTitle);
