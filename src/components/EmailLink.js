import React from 'react';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withContentRect } from 'react-measure';

const styles = theme => ({
  emailLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  iconPadding: {
    marginRight: '10px',
  },
});

const EmailLink = ({
  classes,
  href,
  label,
  iconClasses,
  measureRef,
  contentRect,
}) => (
  <a className={classes.emailLink} href={href} ref={measureRef}>
    {iconClasses && (
      <Icon className={classNames(iconClasses, classes.iconPadding)} />
    )}
    {contentRect.bounds.width < 225 ? 'Email support' : label}
  </a>
);

export default withContentRect('bounds')(withStyles(styles)(EmailLink));
