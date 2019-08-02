import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const styles = theme => ({
  root: {
    height: '70px',
    width: '24px',
    maxWidth: '24px',
    marginTop: '8px',
    marginBottom: '16px',
    display: 'inline-block',
  },
});

const VerticalSlider = ({ classes, ...rest }) => (
  <div className={classes.root}>
    <Slider {...rest} />
  </div>
);

export default withStyles(styles)(VerticalSlider);
