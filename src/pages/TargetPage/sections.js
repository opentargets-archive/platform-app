// Section imports
import * as BaselineExpression from '../../sections/target/Expression';
import * as Bibliography from '../../sections/target/Bibliography';
// import * as CancerBiomarkers from '../../sections/target/CancerBiomarkers';
import * as CancerHallmarks from '../../sections/target/CancerHallmarks';
// import * as ChemicalProbes from '../../sections/target/ChemicalProbes';
import * as ComparativeGenomics from '../../sections/target/ComparativeGenomics';
// import * as GeneOntology from '../../sections/target/GeneOntology';
import * as KnownDrugs from '../../sections/target/KnownDrugs';
// import * as MousePhenotypes from '../../sections/target/MousePhenotypes';
// import * as Pathways from '../../sections/target/Pathways';
import * as ProtVista from '../../sections/target/ProtVista';
// import * as Safety from '../../sections/target/Safety';
import * as Tep from '../../sections/target/Tep';
import * as Tractability from '../../sections/target/Tractability';
import * as MolecularInteractions from '../../sections/target/MolecularInteractions';
import * as SubcellularLocation from '../../sections/target/SubcellularLocation';

const sections = [
  KnownDrugs,
  Tractability,
  // Safety,
  Tep,
  // ChemicalProbes,
  BaselineExpression,
  // GeneOntology,
  ProtVista,
  MolecularInteractions,
  // Pathways,
  // CancerBiomarkers,
  CancerHallmarks,
  // MousePhenotypes,
  ComparativeGenomics,
  SubcellularLocation,
  Bibliography,
];
export default sections;
