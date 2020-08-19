// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as bibliographyRaw from '../../sections/target/Bibliography';
import * as cancerBiomarkersRaw from '../../sections/target/CancerBiomarkers';
import * as hallmarksRaw from '../../sections/target/CancerHallmarks';
import * as chemicalProbesRaw from '../../sections/target/ChemicalProbes';
import * as knownDrugsRaw from '../../sections/target/KnownDrugs';
import * as expressionRaw from '../../sections/target/Expression';
import * as geneOntologyRaw from '../../sections/target/GeneOntology';
import * as comparativeGenomicsRaw from '../../sections/target/ComparativeGenomics';
import * as mousePhenotypesRaw from '../../sections/target/MousePhenotypes';
import * as pathwaysRaw from '../../sections/target/Pathways';
import * as proteinRaw from '../../sections/target/ProteinInformation';
// import * as proteinInteractionsRaw from '../../sections/target/ProteinInteractions';
import * as relatedTargetsRaw from '../../sections/target/RelatedTargets';
import * as safetyRaw from '../../sections/target/Safety';
import * as tepRaw from '../../sections/target/Tep';
import * as tractabilityRaw from '../../sections/target/Tractability';
import * as variationRaw from '../../sections/target/Variation';

export const bibliography = bibliographyRaw;
export const cancerBiomarkers = cancerBiomarkersRaw;
export const hallmarks = hallmarksRaw;
export const chemicalProbes = chemicalProbesRaw;
export const knownDrugs = knownDrugsRaw;
export const expression = expressionRaw;
export const geneOntology = geneOntologyRaw;
export const comparativeGenomics = comparativeGenomicsRaw;
export const mousePhenotypes = mousePhenotypesRaw;
export const pathways = pathwaysRaw;
export const protein = proteinRaw;
// export const proteinInteractions = proteinInteractionsRaw;
export const relatedTargets = relatedTargetsRaw;
export const safety = safetyRaw;
export const tep = tepRaw;
export const variation = variationRaw;
export const tractability = tractabilityRaw;
