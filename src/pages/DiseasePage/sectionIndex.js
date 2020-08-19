// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as bibliographyRaw from '../../sections/disease/Bibliography';
import * as drugsRaw from '../../sections/disease/KnownDrugs';
import * as ontologyRaw from '../../sections/disease/Ontology';
import * as phenotypesRaw from '../../sections/disease/Phenotypes';
import * as relatedDiseasesRaw from '../../sections/disease/RelatedDiseases';

export const bibliography = bibliographyRaw;
export const drugs = drugsRaw;
export const ontology = ontologyRaw;
export const phenotypes = phenotypesRaw;
export const relatedDiseases = relatedDiseasesRaw;
