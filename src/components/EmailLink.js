import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  emailLink: {
    display: 'block',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    marginRight: '10px',
  },
}));

const EmailLink = ({ href, label, icon }) => {
  const classes = useStyles();
  return (
    <a className={classes.emailLink} href={href}>
      {icon && (
        <FontAwesomeIcon className={classes.icon} icon={icon} size="lg" />
      )}
      {label}
    </a>
  );
};

export default EmailLink;
