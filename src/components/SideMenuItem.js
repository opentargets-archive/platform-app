import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import DragIndicator from '@material-ui/icons/DragIndicator';
import withStyles from '@material-ui/core/styles/withStyles';

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
  textInDragState: {
    background: '#ddd',
  },
  dragIndicator: {
    cursor: 'grab',
    display: 'none',
    fontSize: '1.2rem',
    float: 'right',
  },
  dragIndicatorInDragState: {
    display: 'inline-block',
  },
});

const SideMenuItem = ({ classes, name, hasData, onClick, inDragState }) => (
  <Typography
    className={classNames({
      [classes.text]: true,
      [classes.textHasData]: hasData,
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
