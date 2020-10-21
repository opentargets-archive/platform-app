import React from 'react';
import { Grid } from '@material-ui/core';

import summaryStyles from './summaryStyles';
import useSectionOrder from '../../hooks/useSectionOrder';

function SummaryContainer({ children }) {
  const classes = summaryStyles();
  const { sectionOrder } = useSectionOrder();

  return (
    <Grid
      id="summary-section"
      className={classes.summaryContainer}
      container
      spacing={1}
    >
      {sectionOrder.map(sectionId =>
        React.Children.toArray(children).find(
          child => child.props.definition.id === sectionId
        )
      )}
    </Grid>
  );
}

export default SummaryContainer;
