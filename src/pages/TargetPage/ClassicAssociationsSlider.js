import React from 'react';
import { Slider, Typography, withStyles } from '@material-ui/core';

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
