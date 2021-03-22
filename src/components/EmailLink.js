import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import { withContentRect } from 'react-measure';

const styles = theme => ({
  emailLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  icon: {
    marginRight: '10px',
  },
});

const EmailLink = ({ classes, href, label, icon, measureRef, contentRect }) => (
  <a className={classes.emailLink} href={href} ref={measureRef}>
    {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}
    {contentRect.bounds.width < 225 ? 'Email support' : label}
  </a>
);

export default withContentRect('bounds')(withStyles(styles)(EmailLink));
