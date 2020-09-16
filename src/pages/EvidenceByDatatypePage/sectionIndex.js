// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as geneticRaw from '../../sections/evidenceByDatatype/Genetic';
import * as somaticRaw from '../../sections/evidenceByDatatype/Somatic';
import * as drugsRaw from '../../sections/evidenceByDatatype/Drugs';
import * as pathwaysRaw from '../../sections/evidenceByDatatype/Pathways';
import * as differentialExpressionRaw from '../../sections/evidenceByDatatype/DifferentialExpression';
import * as textMiningRaw from '../../sections/evidenceByDatatype/TextMining';
import * as animalModelsRaw from '../../sections/evidenceByDatatype/AnimalModels';

export const genetic = geneticRaw;
export const somatic = somaticRaw;
export const drugs = drugsRaw;
export const pathways = pathwaysRaw;
export const differentialExpression = differentialExpressionRaw;
export const textMining = textMiningRaw;
export const animalModels = animalModelsRaw;
