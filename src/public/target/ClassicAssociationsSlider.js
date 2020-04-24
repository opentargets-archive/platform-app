import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { significantFigures } from 'ot-ui';

const styles = () => ({
  root: {
    width: 300,
  },
  container: {
    padding: '10px 0',
  },
});

const ClassicAssociationsSlider = ({ classes, value, onChange }) => (
  <div className={classes.root}>
    <Typography id="label">
      Minimum Score: {significantFigures(value)}
    </Typography>
    <Slider
      classes={{
        container: classes.container,
      }}
      defaultValue={value}
      value={value}
      step={0.01}
      min={0}
      max={1}
      onChange={onChange}
    />
  </div>
);

export default withStyles(styles)(ClassicAssociationsSlider);
