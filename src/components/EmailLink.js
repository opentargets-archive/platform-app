import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  emailLink: {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    width: '236px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    marginRight: '10px',
  },
});

const EmailLink = ({ classes, href, label, icon }) => {
  return (
    <a className={classes.emailLink} href={href}>
      {icon && (
        <FontAwesomeIcon className={classes.icon} icon={icon} size="lg" />
      )}
      {label}
    </a>
  );
};

export default withStyles(styles)(EmailLink);
