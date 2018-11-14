import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import SimilarTargetsWidget from './SimilarTargetsWidget';

const OverviewTab = ({ symbol }) => {
  return (
    <Grid container>
      <ChemicalProbesWidget symbol={symbol} />
      <SimilarTargetsWidget symbol={symbol} />
    </Grid>
  );
};

export default OverviewTab;
