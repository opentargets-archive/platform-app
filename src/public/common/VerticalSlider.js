import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '70px',
    // width: '24px',
    // maxWidth: '24px',
    marginTop: '12px',
    marginBottom: '12px',
    display: 'flex',
  },
  slider: {
    padding: '0px 22px',
    margin: '0 -10px',
  },
  label: {
    fontSize: '0.7rem',
  },
});

const VerticalSlider = ({ classes, ...rest }) => (
  <React.Fragment>
    <div className={classes.root}>
      <Slider classes={{ container: classes.slider }} {...rest} vertical />
    </div>
    <Typography className={classes.label}>
      {parseInt(`${rest.value * 100}`)}
    </Typography>
  </React.Fragment>
);

export default withStyles(styles)(VerticalSlider);
