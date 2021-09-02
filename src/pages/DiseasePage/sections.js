// Section imports
import * as KnownDrugs from '../../sections/disease/KnownDrugs';
import * as Ontology from '../../sections/disease/Ontology';
import * as Phenotypes from '../../sections/disease/Phenotypes';
import * as Bibliography from '../../sections/disease/Bibliography';
import * as OTProjects from '../../sections/disease/OTProjects';

import config from '../../config';

const partnerSections = config.partnerDiseaseSectionIds.split(',');
const sections = [Ontology, KnownDrugs, Phenotypes, Bibliography, OTProjects]
  .map(section => {
    // set (add) "isPrivate" (boolean) option for each section, based on config
    // TODO: perhaps this should be included in each section definition to start with for more clarity
    // TODO: I guess we can only check against config list of sections via sectionID,
    // which is perhaps not ideal: I would rather check by 'var name', but it's not possible
    section.definition.isPrivate = partnerSections.includes(
      section.definition.id
    );
    return section;
  })
  .filter(
    // only include public section (i.e. not partner sections),
    // or private sections if it's a partner preview
    section =>
      !section.definition.isPrivate ||
      (section.definition.isPrivate && config.isPartnerPreview)
  );

// Conditionally show the OTProjects section
// if (config.flagShowOTARProjects) sections.push(OTProjects);

export default sections;
