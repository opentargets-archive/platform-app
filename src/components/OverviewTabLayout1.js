import React, { Component, Fragment } from 'react';
import { scroller } from 'react-scroll';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'ot-ui';

import RelatedTargetsSection from './RelatedTargets/Section';
import RelatedTargetsQuery from './RelatedTargets/query';

import PathwaysSection from './Pathways/Section';
import PathwaysQuery from './Pathways/query';

import ProteinInteractionsSection from './ProteinInteractions/Section';
import ProteinInteractionsQuery from './ProteinInteractions/query';

import ProteinInformationSection from './ProteinInformation/Section';
import ProteinInformationQuery from './ProteinInformation/query';

import KnownDrugsSection from './KnownDrugs/Section';
import KnownDrugsQuery from './KnownDrugs/query';

import MousePhenotypesSection from './MousePhenotypes/Section';
import MousePhenotypesQuery from './MousePhenotypes/query';

import CancerBiomarkersSection from './CancerBiomarkers/Section';
import CancerBiomarkersQuery from './CancerBiomarkers/query';

import CancerHallmarksSection from './CancerHallmarks/Section';
import CancerHallmarksQuery from './CancerHallmarks/query';

import ChemicalProbesSection from './ChemicalProbes/Section';
import ChemicalProbesQuery from './ChemicalProbes/query';

import GeneOntologySection from './GeneOntology/Section';
import GeneOntologyQuery from './GeneOntology/query';

import TractabilitySection from './Tractability/Section';
import TractabilityQuery from './Tractability/query';

import VariationSection from './Variation/Section';

import HomologySection from './Homology/Section';

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

const sections = [
  {
    id: 'drugs',
    name: 'Known Drugs',
    getHasData: ({ drugCount }) => drugCount > 0,
    query: KnownDrugsQuery,
    SectionComponent: KnownDrugsSection,
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
    getHasData: data =>
      data.hasStructuralGenomicsConsortium ||
      data.hasChemicalProbesPortal ||
      data.hasOpenScienceProbes ||
      data.hasProbeMiner,
    query: ChemicalProbesQuery,
    SectionComponent: ChemicalProbesSection,
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
    getHasData: ({ relatedTargetsCount }) => relatedTargetsCount > 0,
    query: RelatedTargetsQuery,
    SectionComponent: RelatedTargetsSection,
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
    getHasData: ({ count }) => count > 0,
    query: PathwaysQuery,
    SectionComponent: PathwaysSection,
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Pathway information for <strong>{symbol}</strong> from Reactome
      </React.Fragment>
    ),
  },
  {
    id: 'protein',
    name: 'Protein Information',
    getHasData: data =>
      data.hasSequenceAnnotationVisualisation ||
      data.hasProteinStructure ||
      data.hasSubCellularLocation ||
      data.hasSubUnitData ||
      data.hasUniprotKeywords,
    query: ProteinInformationQuery,
    SectionComponent: ProteinInformationSection,
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
    getHasData: ({ hasCancerBiomarkers }) => hasCancerBiomarkers,
    query: CancerBiomarkersQuery,
    SectionComponent: CancerBiomarkersSection,
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
    getHasData: data =>
      data.molecularFunctionTermsCount > 0 ||
      data.biologicalProcessTermsCount > 0 ||
      data.cellularComponentTermsCount > 0,
    query: GeneOntologyQuery,
    SectionComponent: GeneOntologySection,
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Gene Ontology terms related to <strong>{symbol}</strong>.
      </React.Fragment>
    ),
  },
  {
    id: 'proteinInteractions',
    name: 'Protein Interactions',
    getHasData: data =>
      data.ppi > 0 || data.pathways > 0 || data.proteinInteractions > 0,
    query: ProteinInteractionsQuery,
    SectionComponent: ProteinInteractionsSection,
    renderDescription: ({ symbol }) => (
      <React.Fragment>
        Summary of interactions for <strong>{symbol}</strong> based on OmniPath
        DB data.
      </React.Fragment>
    ),
  },
  // {
  //   id: 'rnaAndProteinExpression',
  //   name: 'RNA and Protein Baseline Expression',
  //   renderDescription: ({ symbol }) => <React.Fragment>TODO</React.Fragment>,
  // },
  {
    id: 'mousePhenotypes',
    name: 'Mouse Phenotypes',
    getHasData: data => data.phenotypeCount > 0 || data.categoryCount > 0,
    query: MousePhenotypesQuery,
    SectionComponent: MousePhenotypesSection,
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
    getHasData: data =>
      data.hasAntibodyTractabilityAssessment ||
      data.hasSmallMoleculeTractabilityAssessment,
    query: TractabilityQuery,
    SectionComponent: TractabilitySection,
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
    getHasData: ({ roleInCancer }) => roleInCancer.length > 0,
    query: CancerHallmarksQuery,
    SectionComponent: CancerHallmarksSection,
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
    getHasData: ({ common, rare }) =>
      common.variantsCount > 0 || rare.mutationsCount > 0,
    SectionComponent: VariationSection,
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
    getHasData: ({ orthologuesBySpecies }) =>
      orthologuesBySpecies.some(d => d.orthologuesCount > 0),
    SectionComponent: HomologySection,
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
  scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  render() {
    const { ensgId } = this.props;
    return (
      <Query query={overviewQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const sectionsWithHasData = sections.map(s => ({
            hasData: s.getHasData
              ? s.getHasData(data.target.summaries[s.id])
              : false,
            ...s,
          }));
          return (
            <Fragment>
              <MiniWidgetBar
                data={sectionsWithHasData}
                onWidgetClick={this.scrollToSection}
              />
              <br />
              <DetailPanelsContainer
                data={sectionsWithHasData}
                onSideMenuItemClick={this.scrollToSection}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default OverviewTab;
