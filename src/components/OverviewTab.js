import React from 'react';
import Grid from '@material-ui/core/Grid';
import KnownDrugsWidget from './KnownDrugsWidget';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import SimilarTargetsWidget from './SimilarTargetsWidget';
import PathwaysWidget from './PathwaysWidget';
import ProteinInformationWidget from './ProteinInformationWidget';
import CancerBiomarkersWidget from './CancerBiomarkersWidget';

const OverviewTab = ({ symbol, ensgId }) => {
  return (
    <Grid container spacing={16}>
      <KnownDrugsWidget symbol={symbol} ensgId={ensgId} />
      <ChemicalProbesWidget symbol={symbol} />
      <SimilarTargetsWidget symbol={symbol} />
      <PathwaysWidget symbol={symbol} />
      <ProteinInformationWidget />
      <CancerBiomarkersWidget />
    </Grid>
  );
};

export default OverviewTab;
