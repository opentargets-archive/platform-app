import React from 'react';
import { makeStyles, Tooltip as MUITooltip } from '@material-ui/core';
import _ from 'lodash';

function Tooltip({ style, children, title, showHelpIcon = false, ...props }) {
  const classes = makeStyles(theme =>
    _.merge(style, {
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.grey[300]}`,
        color: theme.palette.text.primary,
      },
      tooltipBadge: {
        paddingLeft: '1rem',
        top: '.4rem',
      },
      tooltipIcon: {
        fontWeight: '500',
        cursor: 'default',
      },
    })
  )();

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
        {showHelpIcon ? <sup className={classes.tooltipIcon}>?</sup> : children}
      </MUITooltip>
    </>
  );
}

export default Tooltip;
