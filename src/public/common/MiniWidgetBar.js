import React from 'react';
import Grid from '@material-ui/core/Grid';

import MiniWidget from './MiniWidget';

const MiniWidgetBar = ({ data, onWidgetClick }) => (
  <div style={{ paddingTop: 8, paddingBottom: 8 }}>
    <Grid container spacing={8}>
      {data.map(d => (
        <MiniWidget key={d.id} {...d} onClick={() => onWidgetClick(d.id)} />
      ))}
    </Grid>
  </div>
);

export default MiniWidgetBar;
