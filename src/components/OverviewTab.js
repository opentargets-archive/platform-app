import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import SimilarTargetsWidget from './SimilarTargetsWidget';

const OverviewTab = ({ symbol }) => {
  return (
    <Grid container>
      <ChemicalProbesWidget symbol={symbol} />
      <SimilarTargetsWidget />
    </Grid>
  );
};

export default OverviewTab;
