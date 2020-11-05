// Section imports
// import * as gwasCatalog from './sections/GWASCatalog';
// import * as eva from './sections/EVA';
// import * as evaSomatic from './sections/EVASomatic';
// import * as cancerGeneCensus from './sections/CancerGeneCensus';
// import * as reactome from './sections/Reactome';
// import * as crispr from './sections/CRISPR';
// import * as drugs from './sections/Drugs';
// import * as differentialExpression from './sections/DifferentialExpression';
// import * as textMining from './sections/TextMining';
// import * as animalModels from './sections/AnimalModels';
// import * as uniProt from './sections/UniProt';
// import * as uniProtSomatic from './sections/UniProtSomatic';
import * as ClinGen from '../../sections/evidence/ClinGen';
import * as Gene2Phenotype from '../../sections/evidence/Gene2Phenotype';
import * as GenomicsEngland from '../../sections/evidence/GenomicsEngland';
import * as IntOgen from '../../sections/evidence/IntOgen';
import * as OTGenetics from '../../sections/evidence/OTGenetics';
import * as PheWASCatalog from '../../sections/evidence/PheWASCatalog';
import * as Progeny from '../../sections/evidence/Progeny';
import * as SlapEnrich from '../../sections/evidence/SlapEnrich';
import * as SysBio from '../../sections/evidence/SysBio';
import * as UniProtLiterature from '../../sections/evidence/UniProtLiterature';

export default [
  ClinGen,
  Gene2Phenotype,
  GenomicsEngland,
  IntOgen,
  OTGenetics,
  PheWASCatalog,
  Progeny,
  SlapEnrich,
  SysBio,
  UniProtLiterature,
];
