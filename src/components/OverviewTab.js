import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import KnownDrugsWidget from './KnownDrugsWidget';
import ChemicalProbesWidget from './ChemicalProbesWidget';
import RelatedTargetsWidget from './RelatedTargetsWidget';
import PathwaysWidget from './PathwaysWidget';
import ProteinInformationWidget from './ProteinInformationWidget';
import CancerBiomarkersWidget from './CancerBiomarkersWidget';

const overviewQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      summaries {
        drugs {
          drugCount
          drugModalities {
            antibody
            enzyme
            oligonucleotide
            oligosaccharide
            protein
            smallMolecule
            other
          }
          trialsByPhase {
            phase
            trialCount
          }
        }
        chemicalProbes {
          hasStructuralGenomicsConsortium
          hasChemicalProbesPortal
          hasOpenScienceProbes
          hasProbeMiner
        }
        relatedTargets {
          relatedTargetsCount
        }
        pathways {
          count
        }
        cancerBiomarkers {
          hasCancerBiomarkers
          cancerBiomarkerCount
          diseaseCount
          drugCount
        }
      }
    }
  }
`;

const styles = () => ({
  filterSection: {
    paddingTop: '14px',
    paddingBottom: '14px',
  },
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
  },
});

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
    const { ensgId, symbol, classes } = this.props;
    const { filterTerm } = this.state;
    const lowerCaseTerm = filterTerm.trim().toLowerCase();

    return (
      <Query query={overviewQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          console.log('data', data);

          const {
            drugs,
            chemicalProbes,
            relatedTargets,
            pathways,
            cancerBiomarkers,
          } = data.target.summaries;

          return (
            <Fragment>
              <Grid container className={classes.filterSection}>
                <Typography className={classes.filterLabel} variant="subtitle2">
                  Filter widgets by name:
                </Typography>
                <TextField
                  value={filterTerm}
                  onChange={this.handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid container spacing={16}>
                {KnownDrugsWidget.widgetName.includes(lowerCaseTerm) && (
                  <KnownDrugsWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    drugs={drugs}
                  />
                )}
                {ChemicalProbesWidget.widgetName.includes(lowerCaseTerm) && (
                  <ChemicalProbesWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    chemicalProbes={chemicalProbes}
                  />
                )}
                {RelatedTargetsWidget.widgetName.includes(lowerCaseTerm) && (
                  <RelatedTargetsWidget
                    symbol={symbol}
                    relatedTargets={relatedTargets}
                  />
                )}
                {PathwaysWidget.widgetName.includes(lowerCaseTerm) && (
                  <PathwaysWidget symbol={symbol} pathways={pathways} />
                )}
                {ProteinInformationWidget.widgetName.includes(
                  lowerCaseTerm
                ) && <ProteinInformationWidget symbol={symbol} />}
                {CancerBiomarkersWidget.widgetName.includes(lowerCaseTerm) && (
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

export default withStyles(styles)(OverviewTab);
