import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  listitem: {
    padding: '0.2rem 0.6rem',
    width: '100%',
  },
  listitemtext: {
    fontSize: '0.75rem',
    minWidth: '100%',
  },
});

const ListTooltip = ({ classes, dataList, open, anchorEl, container }) => (
  <Popper
    open={open}
    anchorEl={anchorEl}
    container={container}
    transition
    placement="top"
    modifiers={{
      preventOverflow: {
        enabled: true,
        boundariesElement: 'window',
      },
    }}
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper>
          <List dense>
            {dataList.map((d, i) => (
              <ListItem key={i} className={classes.listitem}>
                <ListItemText
                  primary={d.label}
                  secondary={d.value}
                  className={classes.listitemtext}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Fade>
    )}
  </Popper>
);

export default withStyles(styles)(ListTooltip);
