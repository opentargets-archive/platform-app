// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as gwasCatalogRaw from './sections/GWASCatalog';
import * as phewasCatalogRaw from './sections/PheWASCatalog';
import * as evaRaw from './sections/EVA';
import * as evaSomaticRaw from './sections/EVASomatic';
import * as gene2PhenotypeRaw from './sections/Gene2Phenotype';
import * as genomicsEnglandRaw from './sections/GenomicsEngland';
import * as intogenRaw from './sections/IntOGen';
import * as cancerGeneCensusRaw from './sections/CancerGeneCensus';
import * as reactomeRaw from './sections/Reactome';
import * as progenyRaw from './sections/PROGENy';
import * as slapenrichRaw from './sections/SLAPenrich';
import * as crisprRaw from './sections/CRISPR';
import * as sysBioRaw from './sections/SysBio';
// import * as geneticRaw from './sections/Genetic';
// import * as somaticRaw from './sections/Somatic';
import * as drugsRaw from './sections/Drugs';
// import * as pathwaysRaw from './sections/Pathways';
import * as differentialExpressionRaw from './sections/DifferentialExpression';
import * as textMiningRaw from './sections/TextMining';
import * as animalModelsRaw from './sections/AnimalModels';
import * as uniProtRaw from './sections/UniProt';
import * as uniProtSomaticRaw from './sections/UniProtSomatic';

export const gwasCatalog = gwasCatalogRaw;
export const phewasCatalog = phewasCatalogRaw;
export const eva = evaRaw;
export const evaSomatic = evaSomaticRaw;
export const gene2Phenotype = gene2PhenotypeRaw;
export const genomicsEngland = genomicsEnglandRaw;
export const intogen = intogenRaw;
export const cancerGeneCensus = cancerGeneCensusRaw;
export const reactome = reactomeRaw;
export const progeny = progenyRaw;
export const slapenrich = slapenrichRaw;
export const crispr = crisprRaw;
export const sysBio = sysBioRaw;
// export const genetic = geneticRaw;
// export const somatic = somaticRaw;
export const drugs = drugsRaw;
// export const pathways = pathwaysRaw;
export const differentialExpression = differentialExpressionRaw;
export const textMining = textMiningRaw;
export const animalModels = animalModelsRaw;
export const uniProt = uniProtRaw;
export const uniProtSomatic = uniProtSomaticRaw;
