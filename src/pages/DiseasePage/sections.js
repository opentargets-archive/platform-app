// Section imports
import * as KnownDrugs from '../../sections/disease/KnownDrugs';
import * as Ontology from '../../sections/disease/Ontology';
import * as Phenotypes from '../../sections/disease/Phenotypes';
import * as Bibliography from '../../sections/disease/Bibliography';
import * as OTProjects from '../../sections/disease/OTProjects';

import config from '../../config';

const sections = [
  Ontology,
  KnownDrugs,
  Phenotypes,
  Bibliography,
  OTProjects,
].filter(
  // select sections to show based on:
  // 1. there is no specific selection for this page (length==0)
  //    OR there is a specific list which includes this section
  // AND
  // 2. only include public section (i.e. not partner sections),
  //    OR also private sections if it's a partner preview
  section =>
    (config.diseaseSectionIds.length == 0 ||
      config.diseaseSectionIds.split(',').includes(section.definition.id)) &&
    (!section.definition.isPrivate ||
      (section.definition.isPrivate && config.isPartnerPreview))
);

// Conditionally show the OTProjects section
// if (config.flagShowOTARProjects) sections.push(OTProjects);

export default sections;
