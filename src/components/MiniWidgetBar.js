import React from 'react';
import { Grid } from '@material-ui/core';

import MiniWidget from './MiniWidget';

const MiniWidgetBar = ({ entity, data, onWidgetClick }) => (
  <div style={{ paddingTop: 8, paddingBottom: 8 }} id="summary-widget-section">
    <Grid container spacing={1}>
      {data.map(d => (
        <MiniWidget
          key={d.id}
          entity={entity}
          {...d}
          onClick={() => onWidgetClick(d.id)}
        />
      ))}
    </Grid>
  </div>
);

export default MiniWidgetBar;
