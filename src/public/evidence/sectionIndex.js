// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as gwasCatalogRaw from './sections/GWASCatalog';
import * as phewasCatalogRaw from './sections/PheWASCatalog';
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

export const gwasCatalog = gwasCatalogRaw;
export const phewasCatalog = phewasCatalogRaw;
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
