import React from 'react';
import { Help } from '@material-ui/icons';
import { makeStyles, Tooltip as MUITooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
  tooltipIcon: {
    fontSize: '.75rem',
    marginBottom: '.2rem',
  },
}));

function Tooltip({ children, title, showHelpIcon = false, ...props }) {
  const classes = useStyles();

  return (
    <>
      {showHelpIcon && children}
      <MUITooltip
        placement="top"
        interactive
        classes={{ tooltip: classes.tooltip }}
        title={title}
        {...props}
      >
        {showHelpIcon ? <Help className={classes.tooltipIcon} /> : children}
      </MUITooltip>
    </>
  );
}

export default Tooltip;
