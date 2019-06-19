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
import ProteinInteractionsWidget from './ProteinInteractions';
import ExpressionWidget from './Expression';
import MousePhenotypesWidget from './MousePhenotypes';
import TargetTractabilityWidget from './TargetTractability';
import CancerHallmarksWidget from './CancerHallmarks';
import VariationWidget from './Variation';
import HomologyWidget from './Homology';
import BibliographyWidget from './Bibliography';
import Safety from './Safety';

const overviewQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      uniprotId
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
        proteinInteractions {
          ppi
          pathways
          enzymeSubstrate
          sources {
            name
            url
          }
        }
        expression {
          rnaBaselineExpression
          proteinBaselineExpression
          expressionAtlasExperiment
          gtexData
        }
        mousePhenotypes {
          phenotypeCount
          categoryCount
          sources {
            url
            name
          }
        }
        tractability {
          hasSmallMoleculeTractabilityAssessment
          hasAntibodyTractabilityAssessment
          sources {
            url
            name
          }
        }
        variation {
          common {
            variantsCount
            diseasesCount
          }
          rare {
            mutationsCount
            diseasesCount
          }
          sources {
            url
            name
          }
        }
        homology {
          orthologuesBySpecies {
            species
            speciesId
            orthologuesCount
          }
          sources {
            url
            name
          }
        }
        cancerHallmarks {
          roleInCancer {
            name
            pmId
          }
          sources {
            name
          }
          promotionAndSuppressionByHallmark {
            name
            promotes
            suppresses
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
    const { ensgId, symbol, name, classes } = this.props;
    const { filterTerm } = this.state;
    const lowerCaseTerm = filterTerm.trim().toLowerCase();

    return (
      <Query query={overviewQuery} variables={{ ensgId }} errorPolicy="all">
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          const { uniprotId, summaries } = data.target;
          const {
            drugs,
            chemicalProbes,
            relatedTargets,
            pathways,
            protein,
            cancerBiomarkers,
            geneOntology,
            proteinInteractions,
            expression,
            mousePhenotypes,
            tractability,
            cancerHallmarks,
            variation,
            homology,
          } = summaries;

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
                  <GeneOntologyWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    geneOntology={geneOntology}
                  />
                )}
                {ProteinInteractionsWidget.widgetName.includes(
                  lowerCaseTerm
                ) && (
                  <ProteinInteractionsWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    uniprotId={uniprotId}
                    proteinInteractions={proteinInteractions}
                  />
                )}
                {ExpressionWidget.widgetName.includes(lowerCaseTerm) && (
                  <ExpressionWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    expression={expression}
                  />
                )}
                {MousePhenotypesWidget.widgetName.includes(lowerCaseTerm) && (
                  <MousePhenotypesWidget
                    mousePhenotypes={mousePhenotypes}
                    ensgId={ensgId}
                    symbol={symbol}
                  />
                )}
                {TargetTractabilityWidget.widgetName.includes(
                  lowerCaseTerm
                ) && (
                  <TargetTractabilityWidget
                    ensgId={ensgId}
                    tractability={tractability}
                    symbol={symbol}
                  />
                )}
                {VariationWidget.widgetName.includes(lowerCaseTerm) && (
                  <VariationWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    name={name}
                    variation={variation}
                  />
                )}
                {HomologyWidget.widgetName.includes(lowerCaseTerm) && (
                  <HomologyWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    homology={homology}
                  />
                )}
                {BibliographyWidget.widgetName.includes(lowerCaseTerm) && (
                  <BibliographyWidget ensgId={ensgId} symbol={symbol} />
                )}
                {CancerHallmarksWidget.widgetName.includes(lowerCaseTerm) && (
                  <CancerHallmarksWidget
                    ensgId={ensgId}
                    symbol={symbol}
                    cancerHallmarks={cancerHallmarks}
                  />
                )}
                {Safety.widgetName.includes(lowerCaseTerm) && (
                  <Safety ensgId={ensgId} symbol={symbol} />
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
