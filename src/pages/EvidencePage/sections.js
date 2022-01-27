// Section imports
import * as CancerGeneCensus from '../../sections/evidence/CancerGeneCensus';
import * as Chembl from '../../sections/evidence/Chembl';
import * as ClinGen from '../../sections/evidence/ClinGen';
import * as CRISPR from '../../sections/evidence/CRISPR';
import * as EuropePmc from '../../sections/evidence/EuropePmc';
import * as EVA from '../../sections/evidence/EVA';
import * as EVASomatic from '../../sections/evidence/EVASomatic';
import * as ExpressionAtlas from '../../sections/evidence/ExpressionAtlas';
import * as Gene2Phenotype from '../../sections/evidence/Gene2Phenotype';
import * as GenomicsEngland from '../../sections/evidence/GenomicsEngland';
import * as IntOgen from '../../sections/evidence/IntOgen';
import * as OTGenetics from '../../sections/evidence/OTGenetics';
import * as Phenodigm from '../../sections/evidence/Phenodigm';
import * as PheWASCatalog from '../../sections/evidence/PheWASCatalog';
import * as Progeny from '../../sections/evidence/Progeny';
import * as Reactome from '../../sections/evidence/Reactome';
import * as SlapEnrich from '../../sections/evidence/SlapEnrich';
import * as SysBio from '../../sections/evidence/SysBio';
import * as UniProtLiterature from '../../sections/evidence/UniProtLiterature';
import * as UniProtVariants from '../../sections/evidence/UniProtVariants';
import * as Orphanet from '../../sections/evidence/Orphanet';
import * as OTCRISPR from '../../sections/evidence/OTCRISPR';
import * as OTEncore from '../../sections/evidence/OTEncore';
import * as CancerBiomarkers from '../../sections/evidence/CancerBiomarkers';
import * as OTValidation from '../../sections/evidence/OTValidation';

import config from '../../config';

const sections = [
  OTGenetics,
  PheWASCatalog,
  EVA,
  GenomicsEngland,
  Gene2Phenotype,
  UniProtLiterature,
  UniProtVariants,
  ClinGen,
  Orphanet,
  CancerGeneCensus,
  IntOgen,
  EVASomatic,
  Chembl,
  CRISPR,
  CancerBiomarkers,
  SlapEnrich,
  Progeny,
  Reactome,
  SysBio,
  EuropePmc,
  ExpressionAtlas,
  Phenodigm,
  OTCRISPR,
  OTEncore,
  OTValidation,
].filter(
  // select sections to show based on:
  // 1. there is no specific hidden section for this page (length==0)
  //    OR this section is not specified as hidden
  // AND
  // 2. only include public section (i.e. not partner sections),
  //    OR also private sections if it's a partner preview
  section =>
    (config.profile.hideEvidenceSectionIds.length === 0 ||
      !config.profile.hideEvidenceSectionIds.includes(section.definition.id)) &&
    (!section.definition.isPrivate ||
      (section.definition.isPrivate && config.profile.isPartnerPreview))
);
export default sections;
