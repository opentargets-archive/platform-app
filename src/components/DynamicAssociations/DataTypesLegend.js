import React from 'react';
import { Typography } from '@material-ui/core';

import { dataTypes, dataTypesColorScale } from './configuration';

const DataTypesLegend = () => (
  <div
    style={{
      marginTop: '8px',
      marginBottom: '8px',
    }}
  >
    <Typography variant="subtitle2">
      {dataTypes.map(d => (
        <React.Fragment key={d.name}>
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '8px',
              verticalAlign: 'middle',
              background: dataTypesColorScale(d.name),
            }}
          />
          <span style={{ marginLeft: '6px', marginRight: '20px' }}>
            {d.name}
          </span>
        </React.Fragment>
      ))}
    </Typography>
  </div>
);

export default DataTypesLegend;
