import React from 'react';
import { makeStyles } from '@material-ui/core';
import exLinkIcon from '../assets/about/About-ExternalLink.svg';

const useStyles = makeStyles({
  exLinkIcon: {
    width: '20px',
    margin: '0 0 0 2px',
    verticalAlign: 'sub'
  },
});

const ExternalLinkIcon = ({ className }) => {
  const classes = useStyles();
  return (
    <img 
      src={exLinkIcon} 
      alt="outbounnd web site icon" 
      className={className ? className : classes.exLinkIcon}
    />
  );
};

export default ExternalLinkIcon;