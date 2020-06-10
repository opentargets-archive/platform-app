export const targetSectionsDefaultOrder = [
  'knownDrugs',
  'tractability',
  'safety',
  'tep',
  'chemicalProbes',
  'bibliography',
  'variation',
  'expressions',
  'proteinAnnotations',
  'orthologs',
  'geneOntology',
  // 'proteinInteractions',
  'pathways',
  'relatedTargets',
  'mousePhenotypes',
  'hallmarks',
  'cancerBiomarkers',
];

export const diseaseSectionsDefaultOrder = [
  'ontology',
  'knownDrugs',
  'phenotypes',
  'relatedDiseases',
  'bibliography',
];

export const drugSectionsDefaultOrder = [
  'indications',
  'mechanismsOfAction',
  'knownDrugs',
  'adverseEvents',
  'bibliography',
];

export const evidenceSectionsDefaultOrder = [
  'gwasCatalog',
  'phewasCatalog',
  'eva',
  'uniProt',
  'uniProtLiterature',
  'gene2Phenotype',
  'genomicsEngland',
  'intogen',
  'cancerGeneCensus',
  'evaSomatic',
  'uniProtSomatic',
  'reactome',
  'progeny',
  'slapenrich',
  'crispr',
  'sysBio',
  'drugs',
  'differentialExpression',
  'textMining',
  'animalModels',
];

export const evidenceByDatatypeSectionsDefaultOrder = [
  'genetic',
  'somatic',
  'drugs',
  'pathways',
  'differentialExpression',
  'textMining',
  'animalModels',
];

// Known drugs widget links on the 'source' column.
export const clinicalTrialsSearchUrl = 'https://clinicaltrials.gov/ct2/results';

// Chunk sizes for server side pagination/download.
export const tableChunkSize = 100;
export const downloaderChunkSize = 2500;

// NA label.
export const naLabel = 'N/A';
