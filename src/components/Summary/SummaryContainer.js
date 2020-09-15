import React from 'react';
import { Grid } from '@material-ui/core';
import ls from 'local-storage';

import summaryStyles from './summaryStyles';
import usePlatformApi from '../../hooks/usePlatformApi';

function SummaryContainer({ children }) {
  const classes = summaryStyles();
  const { entity } = usePlatformApi();
  const summaryOrder = ls.get(`${entity}SectionsOrder`);
  const summaryMap = React.Children.toArray(children).reduce(
    (acc, child) => ({
      ...acc,
      [child.props.definition.id]: child,
    }),
    {}
  );

  return (
    <Grid
      id="summary-section"
      className={classes.summaryContainer}
      container
      spacing={1}
    >
      {summaryOrder.map(summaryItem => summaryMap[summaryItem])}
    </Grid>
  );
}

export default SummaryContainer;
