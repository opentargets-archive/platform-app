import React from 'react';
import { Grid } from '@material-ui/core';
import ls from 'local-storage';

import usePlatformApi from '../../hooks/usePlatformApi';

function SectionContainer({ children }) {
  const { data, entity } = usePlatformApi();
  const sectionOrder = ls.get(`${entity}SectionsOrder`);

  const sectionMap = React.Children.toArray(children).reduce((acc, child) => {
    // Filter platform-api sections without data.
    const { id, hasData, external } = child.props.definition;
    const shouldRender = external || (data && hasData(data?.[entity]));

    return {
      ...acc,
      [id]: shouldRender ? child : null,
    };
  }, {});

  return (
    <Grid id="summary-section" container spacing={1}>
      {sectionOrder.map(id => sectionMap[id])}
    </Grid>
  );
}

export default SectionContainer;
