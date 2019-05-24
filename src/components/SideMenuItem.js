import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  text: {
    padding: 4,
    color: theme.palette.grey[500],
    '&:hover': {
      background: '#eee',
    },
    '&:active': {
      background: '#ddd',
    },
  },
  textHasData: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  textInDragState: {
    background: '#ddd',
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
  </Typography>
);

export default withStyles(styles)(SideMenuItem);
