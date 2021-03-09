import React from 'react';
import { Slider, Typography, withStyles } from '@material-ui/core';

import { decimalPlaces } from '../../constants';

const styles = () => ({
  root: {
    width: 300,
  },
  container: {
    padding: '10px 0',
  },
});

const ClassicAssociationsSlider = ({
  classes,
  value,
  onChange,
  onChangeCommitted,
}) => (
  <div className={classes.root}>
    <Typography id="label">
      Minimum Score: {value.toFixed(decimalPlaces)}
    </Typography>
    <Slider
      classes={{
        root: classes.container,
      }}
      defaultValue={value}
      value={value}
      step={0.01}
      min={0}
      max={1}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
    />
  </div>
);

export default withStyles(styles)(ClassicAssociationsSlider);
