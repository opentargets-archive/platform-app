import React from 'react';
import { Grid } from '@material-ui/core';
import ls from 'local-storage';

import usePlatformApi from '../../hooks/usePlatformApi';

function SectionContainer({ children }) {
  const { data, entity } = usePlatformApi();
  const sectionOrder = ls.get(`${entity}SectionsOrder`);

  const sectionMap = React.Children.toArray(children).reduce((acc, child) => {
    // Filter sections without data by looking at the summary data.
    const { id, hasData } = child.props.definition;
    const shouldRender = data && hasData(data?.[entity]);

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
