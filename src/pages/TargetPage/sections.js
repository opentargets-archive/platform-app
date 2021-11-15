// Section imports
import * as BaselineExpression from '../../sections/target/Expression';
import * as Bibliography from '../../sections/target/Bibliography';
import * as CancerHallmarks from '../../sections/target/CancerHallmarks';
import * as ChemicalProbes from '../../sections/target/ChemicalProbes';
import * as ComparativeGenomics from '../../sections/target/ComparativeGenomics';
import * as GeneOntology from '../../sections/target/GeneOntology';
import * as KnownDrugs from '../../sections/target/KnownDrugs';
import * as MousePhenotypes from '../../sections/target/MousePhenotypes';
import * as Pathways from '../../sections/target/Pathways';
import * as ProtVista from '../../sections/target/ProtVista';
import * as Safety from '../../sections/target/Safety';
import * as Tractability from '../../sections/target/Tractability';
import * as MolecularInteractions from '../../sections/target/MolecularInteractions';
import * as SubcellularLocation from '../../sections/target/SubcellularLocation';
import * as GeneticConstraint from '../../sections/target/GeneticConstraint';

import config from '../../config';

const sections = [
  KnownDrugs,
  Tractability,
  Safety,
  ChemicalProbes,
  BaselineExpression,
  GeneOntology,
  GeneticConstraint,
  ProtVista,
  MolecularInteractions,
  Pathways,
  // CancerBiomarkers,
  CancerHallmarks,
  MousePhenotypes,
  ComparativeGenomics,
  SubcellularLocation,
  Bibliography,
].filter(
  // select sections to show based on:
  // 1. there is no specific hidden section for this page (length==0)
  //    OR this section is not specified as hidden
  // AND
  // 2. only include public section (i.e. not partner sections),
  //    OR also private sections if it's a partner preview
  section =>
    (config.profile.hideTargetSectionIds.length === 0 ||
      !config.profile.hideTargetSectionIds.includes(section.definition.id)) &&
    (!section.definition.isPrivate ||
      (section.definition.isPrivate && config.profile.isPartnerPreview))
);
export default sections;
