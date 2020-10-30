import React from 'react';

import { Typography } from '@material-ui/core';

function SubcellularLocationTab({ subcellularLocations }) {
  return (
    <div>
      <ul>
        {subcellularLocations.map((d, i) => (
          <li key={i}>
            <Typography variant="body2">{d}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubcellularLocationTab;
