import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import KnownDrugsWidget from './KnownDrugs';
import ChemicalProbesWidget from './ChemicalProbes';
import RelatedTargetsWidget from './RelatedTargets';
import PathwaysWidget from './Pathways';
import ProteinInformationWidget from './ProteinInformation';
import CancerBiomarkersWidget from './CancerBiomarkers';
import GeneOntologyWidget from './GeneOntology';

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
          sources {
            name
            url
          }
        }
        chemicalProbes {
          hasStructuralGenomicsConsortium
          hasChemicalProbesPortal
          hasOpenScienceProbes
          hasProbeMiner
          sources {
            name
            url
          }
        }
        relatedTargets {
          relatedTargetsCount
          sources {
            name
            url
          }
        }
        pathways {
          count
          sources {
            name
            url
          }
        }
        protein {
          hasSequenceAnnotationVisualisation
          hasProteinStructure
          hasSubCellularLocation
          hasSubUnitData
          hasUniprotKeywords
          sources {
            name
            url
          }
        }
        cancerBiomarkers {
          hasCancerBiomarkers
          cancerBiomarkerCount
          diseaseCount
          drugCount
          sources {
            name
            url
          }
        }
        geneOntology {
          molecularFunctionTermsCount
          biologicalProcessTermsCount
          cellularComponentTermsCount
          sources {
            url
            name
          }
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

          const {
            drugs,
            chemicalProbes,
            relatedTargets,
            pathways,
            protein,
            cancerBiomarkers,
            geneOntology,
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
                    ensgId={ensgId}
                    symbol={symbol}
                    relatedTargets={relatedTargets}
                  />
                )}
                {PathwaysWidget.widgetName.includes(lowerCaseTerm) && (
                  <PathwaysWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    pathways={pathways}
                  />
                )}
                {ProteinInformationWidget.widgetName.includes(
                  lowerCaseTerm
                ) && (
                  <ProteinInformationWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    protein={protein}
                  />
                )}
                {CancerBiomarkersWidget.widgetName.includes(lowerCaseTerm) && (
                  <CancerBiomarkersWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    cancerBiomarkers={cancerBiomarkers}
                  />
                )}
                {GeneOntologyWidget.widgetName.includes(lowerCaseTerm) && (
                  <GeneOntologyWidget geneOntology={geneOntology} />
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
