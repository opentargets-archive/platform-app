import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
      chemicalProbes {
        portalProbeCount
      }
      similarTargets {
        count
        averageCommonDiseases
      }
      pathways {
        count
      }
      cancerBiomarkers {
        count
        diseaseCount
      }
    }
  }
`;

class OverviewTab extends Component {
  state = {
    filterTerm: '',
  };

  handleChange = event => {
    this.setState({
      filterTerm: event.target.value,
    });
  };

  render() {
    const { ensgId, symbol } = this.props;
    const { filterTerm } = this.state;
    const lowerCaseTerm = filterTerm.toLowerCase();

    return (
      <Query query={overviewQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          const {
            drugs,
            chemicalProbes,
            similarTargets,
            pathways,
            cancerBiomarkers,
          } = data.targetSummary;

          return (
            <Fragment>
              <Grid container>
                <Typography>Filter widgets by name: </Typography>
                <TextField
                  value={filterTerm}
                  onChange={this.handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid container spacing={16}>
                {'known drugs'.includes(filterTerm) && (
                  <KnownDrugsWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    drugs={drugs}
                  />
                )}
                {'chemical probes'.includes(filterTerm) && (
                  <ChemicalProbesWidget
                    symbol={symbol}
                    chemicalProbes={chemicalProbes}
                  />
                )}
                {'similar targets'.includes(filterTerm) && (
                  <SimilarTargetsWidget
                    symbol={symbol}
                    similarTargets={similarTargets}
                  />
                )}
                {'pathways'.includes(filterTerm) && (
                  <PathwaysWidget symbol={symbol} pathways={pathways} />
                )}
                {'protein information'.includes(filterTerm) && (
                  <ProteinInformationWidget symbol={symbol} />
                )}
                {'cancer biomarkers'.includes(filterTerm) && (
                  <CancerBiomarkersWidget
                    ensgId={ensgId}
                    cancerBiomarkers={cancerBiomarkers}
                  />
                )}
              </Grid>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default OverviewTab;
