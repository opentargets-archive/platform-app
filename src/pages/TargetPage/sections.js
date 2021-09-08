// Section imports
import * as BaselineExpression from '../../sections/target/Expression';
import * as Bibliography from '../../sections/target/Bibliography';
import * as CancerBiomarkers from '../../sections/target/CancerBiomarkers';
import * as CancerHallmarks from '../../sections/target/CancerHallmarks';
import * as ChemicalProbes from '../../sections/target/ChemicalProbes';
import * as ComparativeGenomics from '../../sections/target/ComparativeGenomics';
import * as GeneOntology from '../../sections/target/GeneOntology';
import * as KnownDrugs from '../../sections/target/KnownDrugs';
import * as MousePhenotypes from '../../sections/target/MousePhenotypes';
import * as Pathways from '../../sections/target/Pathways';
import * as ProteinInformation from '../../sections/target/ProteinInformation';
import * as Safety from '../../sections/target/Safety';
import * as Tep from '../../sections/target/Tep';
import * as Tractability from '../../sections/target/Tractability';
import * as MolecularInteractions from '../../sections/target/MolecularInteractions';

import config from '../../config';

const sections = [
  KnownDrugs,
  Tractability,
  Safety,
  Tep,
  ChemicalProbes,
  BaselineExpression,
  GeneOntology,
  ProteinInformation,
  MolecularInteractions,
  Pathways,
  CancerBiomarkers,
  CancerHallmarks,
  MousePhenotypes,
  ComparativeGenomics,
  Bibliography,
].filter(
  // select sections to show based on:
  // 1. there is no specific selection for this page (length==0)
  //    OR there is a specific list which includes this section
  // AND
  // 2. only include public section (i.e. not partner sections),
  //    OR also private sections if it's a partner preview
  section =>
    (config.targetSectionIds.length == 0 ||
      config.targetSectionIds.split(',').includes(section.definition.id)) &&
    (!section.definition.isPrivate ||
      (section.definition.isPrivate && config.isPartnerPreview))
);
export default sections;
