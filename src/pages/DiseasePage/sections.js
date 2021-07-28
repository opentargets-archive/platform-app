// Section imports
import * as KnownDrugs from '../../sections/disease/KnownDrugs';
import * as Ontology from '../../sections/disease/Ontology';
import * as Phenotypes from '../../sections/disease/Phenotypes';
import * as Bibliography from '../../sections/disease/Bibliography';
import * as OTProjects from '../../sections/disease/OTProjects';

import config from '../../config';

const sections = [Ontology, KnownDrugs, Phenotypes, Bibliography];

// Conditionally show the OTProjects section
if (config.flagShowOTARProjects) sections.push(OTProjects);

export default sections;
