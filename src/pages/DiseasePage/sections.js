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
  // only include public section (i.e. not partner sections),
  // or private sections if it's a partner preview
  section =>
    !section.definition.isPrivate ||
    (section.definition.isPrivate && config.isPartnerPreview)
);

// Conditionally show the OTProjects section
// if (config.flagShowOTARProjects) sections.push(OTProjects);

export default sections;
