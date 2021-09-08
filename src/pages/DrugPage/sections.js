// Section imports
import * as DrugWarnings from '../../sections/drug/DrugWarnings';
import * as Bibliography from '../../sections/drug/Bibliography';
import * as ClinicalPrecedence from '../../sections/drug/KnownDrugs';
import * as Indications from '../../sections/drug/Indications';
import * as MechanismsOfAction from '../../sections/drug/MechanismsOfAction';
import * as Pharmacovigilance from '../../sections/drug/AdverseEvents';

import config from '../../config';

const sections = [
  MechanismsOfAction,
  Indications,
  ClinicalPrecedence,
  DrugWarnings,
  Pharmacovigilance,
  Bibliography,
].filter(
  // select sections to show based on:
  // 1. there is no specific selection for this page (length==0)
  //    OR there is a specific list which includes this section
  // AND
  // 2. only include public section (i.e. not partner sections),
  //    OR also private sections if it's a partner preview
  section =>
    (config.drugSectionIds.length === 0 ||
      config.drugSectionIds.split(',').includes(section.definition.id)) &&
    (!section.definition.isPrivate ||
      (section.definition.isPrivate && config.isPartnerPreview))
);
export default sections;
