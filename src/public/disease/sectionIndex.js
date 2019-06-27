// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as bibliographyRaw from './sections/Bibliography';
import * as classificationRaw from './sections/Classification';
import * as drugsRaw from './sections/KnownDrugs';
import * as phenotypesRaw from './sections/Phenotypes';
import * as relatedDiseasesRaw from './sections/RelatedDiseases';

export const bibliography = bibliographyRaw;
export const classification = classificationRaw;
export const drugs = drugsRaw;
export const phenotypes = phenotypesRaw;
export const relatedDiseases = relatedDiseasesRaw;
