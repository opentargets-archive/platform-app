import React, { Component, Fragment } from 'react';
import { scroller } from 'react-scroll';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link } from 'ot-ui';

import KnownDrugsWidget from './KnownDrugs';
import ChemicalProbesWidget from './ChemicalProbes';
import RelatedTargetsWidget from './RelatedTargets';
import PathwaysWidget from './Pathways';
import ProteinInformationWidget from './ProteinInformation';
import CancerBiomarkersWidget from './CancerBiomarkers';
import GeneOntologyWidget from './GeneOntology';
import ProteinInteractionsWidget from './ProteinInteractions';
import RNAAndProteinExpressionWidget from './RNAAndProteinExpression';
import MousePhenotypesWidget from './MousePhenotypes';
import TargetTractabilityWidget from './TargetTractability';
import CancerHallmarksWidget from './CancerHallmarks';
import VariationWidget from './Variation';
import HomologyWidget from './Homology';

import MiniWidgetBar from './MiniWidgetBar';
import DetailPanelsContainer from './DetailPanelsContainer';

const overviewQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      uniprotId
      symbol
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
        }
        rnaAndProteinExpression {
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

const sections = [
  {
    id: 'drugs',
    name: 'Known Drugs',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Drugs in clinical trials or approved for <strong>{symbol}</strong>.
      </React.Fragment>
    ),
    renderDetail: () => null,
  },
  {
    id: 'chemicalProbes',
    name: 'Chemical Probes',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Information on chemical probes that have been developed for{' '}
        <strong>{symbol}</strong>.
      </React.Fragment>
    ),
  },
  {
    id: 'relatedTargets',
    name: 'Related Targets',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Targets related to <strong>{symbol}</strong> based on shared disease
        associations.
      </React.Fragment>
    ),
  },
  {
    id: 'pathways',
    name: 'Pathways',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Pathway information for <strong>{symbol}</strong> from Reactome
      </React.Fragment>
    ),
  },
  {
    id: 'protein',
    name: 'Protein Information',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        General information about <strong>{symbol}</strong> protein from UniProt
        and PDBe.
      </React.Fragment>
    ),
  },
  {
    id: 'cancerBiomarkers',
    name: 'Cancer Biomarkers',
    renderDescription: () => (
      <React.Fragment>
        Genomic biomarkers of drug responses, and their levels of clinical
        significance as described by{' '}
        <Link external to="https://europepmc.org/articles/PMC5875005">
          {' '}
          Tamborero et al. (2018)
        </Link>
        . This data is manually curated by clinical and scientific communities
        in the field of precision oncology.
      </React.Fragment>
    ),
  },
  {
    id: 'geneOntology',
    name: 'Gene Ontology',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Gene Ontology terms related to <strong>{symbol}</strong>.
      </React.Fragment>
    ),
  },
  {
    id: 'proteinInteractions',
    name: 'Protein Interactions',
    renderDescription: ({ symbol }) => <React.Fragment>TODO</React.Fragment>,
  },
  {
    id: 'rnaAndProteinExpression',
    name: 'RNA and Protein Baseline Expression',
    renderDescription: ({ symbol }) => <React.Fragment>TODO</React.Fragment>,
  },
  {
    id: 'mousePhenotypes',
    name: 'Mouse Phenotypes',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Mouse phenotypes by model associated with <strong>{symbol}</strong>{' '}
        orthologues.
      </React.Fragment>
    ),
  },
  {
    id: 'tractability',
    name: 'Tractability',
    renderDescription: ({ symbol }) => (
      <Fragment>
        Summary of tractability assessment for <strong>{symbol}</strong> for
        small molecule and antibody modalities. For more information on the
        tractability assessment and descriptions of each bucket, please read{' '}
        <Link
          external
          to="https://docs.targetvalidation.org/getting-started/target-tractability"
        >
          the tractability section of our documentation
        </Link>
        .
      </Fragment>
    ),
  },
  {
    id: 'cancerHallmarks',
    name: 'Cancer Hallmarks',
    renderDescription: () => (
      <React.Fragment>
        Essential alterations in cell physiology that dictate malignant growth.
        Cancer hallmarks were originally described by{' '}
        <Link external to="https://www.cell.com/abstract/S0092-8674(00)81683-9">
          Hanahan and Weinberg (2000)
        </Link>{' '}
        and are manually curated by COSMIC and integrated into the Cancer Gene
        Census.
      </React.Fragment>
    ),
  },
  {
    id: 'variation',
    name: 'Variation and Genomic Context',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Genomic variants associated with <strong>{symbol}</strong>. Only variant
        information associating <strong>{symbol}</strong> with any disease is
        displayed. Click on any variant, gene or transcript to get more
        information about it. Pan or zoom the browser to see neighbouring genes.
        The number above gene variants means that more than 1 overlap the same
        region at the current zoom level. Genomic coordinates are relative to
        GRCh38.
      </React.Fragment>
    ),
  },
  {
    id: 'homology',
    name: 'Gene Tree',
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Homology and gene tree information for <strong>{symbol}</strong> across
        selected species.
      </React.Fragment>
    ),
  },
  // { id: 'bibliography', name: 'Bibliography', hasData: false },
];

class OverviewTab extends Component {
  // state = {
  //   filterTerm: '',
  // };
  // handleChange = event => {
  //   this.setState({
  //     filterTerm: event.target.value,
  //   });
  // };
  scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  render() {
    return (
      <Fragment>
        <MiniWidgetBar data={sections} onWidgetClick={this.scrollToSection} />
        <DetailPanelsContainer
          data={sections}
          onSideMenuItemClick={this.scrollToSection}
        />
      </Fragment>
    );
  }

  // render() {
  //   const { ensgId, symbol, name, classes } = this.props;
  //   const { filterTerm } = this.state;
  //   const lowerCaseTerm = filterTerm.trim().toLowerCase();
  //   const sectionsWithRefs = sections.map(d => ({
  //     ...d,
  //     detailRef: this.sectionDetailRefs[d.id],
  //   }));

  //   return (
  //     <Query query={overviewQuery} variables={{ ensgId }}>
  //       {({ loading, error, data }) => {
  //         if (loading || error) {
  //           return null;
  //         }

  //         const {
  //           drugs,
  //           chemicalProbes,
  //           relatedTargets,
  //           pathways,
  //           protein,
  //           cancerBiomarkers,
  //           geneOntology,
  //           proteinInteractions,
  //           rnaAndProteinExpression,
  //           mousePhenotypes,
  //           tractability,
  //           cancerHallmarks,
  //           variation,
  //           homology,
  //         } = data.target.summaries;

  //         return (
  //           <Fragment>
  //             <MiniWidgetBar
  //               data={sections}
  //               onWidgetClick={this.scrollToSection}
  //             />
  //             <DetailPanelsContainer
  //               data={sectionsWithRefs}
  //               onSideMenuItemClick={this.scrollToSection}
  //             />

  //             <Grid container className={classes.filterSection}>
  //               <Typography className={classes.filterLabel} variant="subtitle2">
  //                 Filter widgets by name:
  //               </Typography>
  //               <TextField
  //                 value={filterTerm}
  //                 onChange={this.handleChange}
  //                 variant="outlined"
  //               />
  //             </Grid>
  //             <Grid container spacing={16}>
  //               {KnownDrugsWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <KnownDrugsWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   drugs={drugs}
  //                 />
  //               )}
  //               {ChemicalProbesWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <ChemicalProbesWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   chemicalProbes={chemicalProbes}
  //                 />
  //               )}
  //               {RelatedTargetsWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <RelatedTargetsWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   relatedTargets={relatedTargets}
  //                 />
  //               )}
  //               {PathwaysWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <PathwaysWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   pathways={pathways}
  //                 />
  //               )}
  //               {ProteinInformationWidget.widgetName.includes(
  //                 lowerCaseTerm
  //               ) && (
  //                 <ProteinInformationWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   protein={protein}
  //                 />
  //               )}
  //               {CancerBiomarkersWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <CancerBiomarkersWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   cancerBiomarkers={cancerBiomarkers}
  //                 />
  //               )}
  //               {GeneOntologyWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <GeneOntologyWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   geneOntology={geneOntology}
  //                 />
  //               )}
  //               {ProteinInteractionsWidget.widgetName.includes(
  //                 lowerCaseTerm
  //               ) && (
  //                 <ProteinInteractionsWidget
  //                   symbol={symbol}
  //                   proteinInteractions={proteinInteractions}
  //                 />
  //               )}
  //               {RNAAndProteinExpressionWidget.widgetName.includes(
  //                 lowerCaseTerm
  //               ) && (
  //                 <RNAAndProteinExpressionWidget
  //                   rnaAndProteinExpression={rnaAndProteinExpression}
  //                 />
  //               )}
  //               {MousePhenotypesWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <MousePhenotypesWidget
  //                   mousePhenotypes={mousePhenotypes}
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                 />
  //               )}
  //               {TargetTractabilityWidget.widgetName.includes(
  //                 lowerCaseTerm
  //               ) && (
  //                 <TargetTractabilityWidget
  //                   ensgId={ensgId}
  //                   tractability={tractability}
  //                   symbol={symbol}
  //                 />
  //               )}
  //               {VariationWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <VariationWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   name={name}
  //                   variation={variation}
  //                 />
  //               )}
  //               {HomologyWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <HomologyWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   homology={homology}
  //                 />
  //               )}

  //               {CancerHallmarksWidget.widgetName.includes(lowerCaseTerm) && (
  //                 <CancerHallmarksWidget
  //                   ensgId={ensgId}
  //                   symbol={symbol}
  //                   cancerHallmarks={cancerHallmarks}
  //                 />
  //               )}
  //             </Grid>
  //           </Fragment>
  //         );
  //       }}
  //     </Query>
  //   );
  // }
}

export default OverviewTab;
