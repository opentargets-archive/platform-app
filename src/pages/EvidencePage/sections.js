// Section imports
// import * as gwasCatalog from './sections/GWASCatalog';
// import * as phewasCatalog from './sections/PheWASCatalog';
// import * as eva from './sections/EVA';
// import * as evaSomatic from './sections/EVASomatic';
// import * as intogen from './sections/IntOGen';
// import * as cancerGeneCensus from './sections/CancerGeneCensus';
// import * as reactome from './sections/Reactome';
// import * as slapenrich from './sections/SLAPenrich';
// import * as crispr from './sections/CRISPR';
// import * as sysBio from './sections/SysBio';
// import * as drugs from './sections/Drugs';
// import * as differentialExpression from './sections/DifferentialExpression';
// import * as textMining from './sections/TextMining';
// import * as animalModels from './sections/AnimalModels';
// import * as uniProt from './sections/UniProt';
// import * as uniProtSomatic from './sections/UniProtSomatic';
import * as ClinGen from '../../sections/evidence/ClinGen';
import * as Gene2Phenotype from '../../sections/evidence/Gene2Phenotype';
import * as GenomicsEngland from '../../sections/evidence/GenomicsEngland';
import * as OTGenetics from '../../sections/evidence/OTGenetics';
import * as Progeny from '../../sections/evidence/Progeny';
import * as UniProtLiterature from '../../sections/evidence/UniProtLiterature';

export default [
  ClinGen,
  Gene2Phenotype,
  GenomicsEngland,
  OTGenetics,
  Progeny,
  UniProtLiterature,
];
