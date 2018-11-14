import React from 'react';
import Grid from '@material-ui/core/Grid';
import KnownDrugsWidget from './KnownDrugsWidget';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import SimilarTargetsWidget from './SimilarTargetsWidget';

const OverviewTab = ({ symbol }) => {
  return (
    <Grid container>
      <KnownDrugsWidget symbol={symbol} />
      <ChemicalProbesWidget symbol={symbol} />
      <SimilarTargetsWidget symbol={symbol} />
    </Grid>
  );
};

export default OverviewTab;
