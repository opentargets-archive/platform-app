import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';
import DragIndicator from '@material-ui/icons/DragIndicator';

const styles = theme => ({
  text: {
    padding: 4,
    cursor: 'default',
    color: theme.palette.grey[500],
    // '&:hover': {
    //   background: '#eee',
    // },
    // '&:active': {
    //   background: '#ddd',
    // },
    '&:hover $dragIndicator': {
      display: 'inline-block',
    },
    '&:active $dragIndicator': {
      display: 'inline-block',
    },
  },
  textHasData: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      background: '#eee',
    },
    '&:active': {
      background: '#ddd',
    },
  },
  textError: {
    color: theme.palette.secondary.main,
  },
  textInDragState: {
    background: '#ddd',
  },
  dragIndicator: {
    cursor: 'grab',
    display: 'none',
    float: 'right',
  },
  dragIndicatorInDragState: {
    display: 'inline-block',
  },
});

const SideMenuItem = ({
  classes,
  name,
  hasData,
  error,
  loading,
  onClick,
  inDragState,
}) => (
  <Typography
    variant="body2"
    className={classNames({
      [classes.text]: true,
      [classes.textHasData]: hasData,
      [classes.textError]: error,
      [classes.textInDragState]: inDragState,
    })}
    onClick={onClick}
  >
    {name}
    <DragIndicator
      className={classNames({
        [classes.dragIndicator]: true,
        [classes.dragIndicatorInDragState]: inDragState,
      })}
    />
  </Typography>
);

export default withStyles(styles)(SideMenuItem);
