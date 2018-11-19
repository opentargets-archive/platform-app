import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';

import KnownDrugsWidget from './KnownDrugsWidget';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import SimilarTargetsWidget from './SimilarTargetsWidget';
import PathwaysWidget from './PathwaysWidget';
import ProteinInformationWidget from './ProteinInformationWidget';
import CancerBiomarkersWidget from './CancerBiomarkersWidget';

const overviewQuery = gql`
  query TargetQuery($ensgId: String!) {
    targetSummary(ensgId: $ensgId) {
      id
      drugs {
        count
        modalities {
          antibody
          peptide
          protein
          smallMolecule
        }
        trialsByPhase {
          phase
          trialCount
        }
      }
    }
  }
`;

const OverviewTab = ({ ensgId, symbol }) => {
  return (
    <Query query={overviewQuery} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return null;
        }

        const { drugs } = data.targetSummary;

        return (
          <Grid container spacing={16}>
            <KnownDrugsWidget symbol={symbol} drugs={drugs} />
            <ChemicalProbesWidget symbol={ensgId} />
            <SimilarTargetsWidget symbol={ensgId} />
            <PathwaysWidget symbol={ensgId} />
            <ProteinInformationWidget />
            <CancerBiomarkersWidget />
          </Grid>
        );
      }}
    </Query>
  );
};

export default OverviewTab;
