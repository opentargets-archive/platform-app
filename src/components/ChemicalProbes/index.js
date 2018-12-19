import React from 'react';
import Grid from '@material-ui/core/Grid';

import Widget from '../Widget';
import CheckboxList from '../CheckboxList';
import ChemicalProbesDetail from './Detail';

const ChemicalProbesWidget = ({
  ensgId,
  symbol,
  chemicalProbes: {
    hasStructuralGenomicsConsortium,
    hasChemicalProbesPortal,
    hasOpenScienceProbes,
    hasProbeMiner,
    sources,
  },
}) => {
  const hasData =
    hasStructuralGenomicsConsortium ||
    hasChemicalProbesPortal ||
    hasOpenScienceProbes ||
    hasProbeMiner;
  const items = [
    {
      value: hasStructuralGenomicsConsortium,
      label: 'Structural Genomics Consortium',
    },
    { value: hasChemicalProbesPortal, label: 'Chemical Probes Portal' },
    { value: hasOpenScienceProbes, label: 'Open Science Probes' },
    { value: hasProbeMiner, label: 'ProbeMiner' },
  ];
  return (
    <Widget
      title="Chemical probes"
      detailUrlStem="chemical-probes"
      detail={
        <ChemicalProbesDetail
          ensgId={ensgId}
          symbol={symbol}
          sources={sources}
        />
      }
      detailHeader={{
        title: <React.Fragment>{symbol} - Chemical Probes</React.Fragment>,
        description: (
          <React.Fragment>
            Information on chemical probes that have been developed for {symbol}
            .
          </React.Fragment>
        ),
      }}
      hasData={hasData}
      sources={sources}
    >
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="space-evenly"
      >
        <Grid item xs={12}>
          <CheckboxList items={items} />
        </Grid>
      </Grid>
    </Widget>
  );
};

ChemicalProbesWidget.widgetName = 'chemical probes';

export default ChemicalProbesWidget;
