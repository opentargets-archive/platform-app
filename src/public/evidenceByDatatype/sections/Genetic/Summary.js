const Summary = ({
  otGenetics,
  uniProt,
  uniProtLiterature,
  eva,
  genomicsEngland,
  gene2Phenotype,
}) =>
  [
    otGenetics && otGenetics.variantCount > 0 ? 'OT Genetics' : null,
    uniProt && uniProt.variantCount > 0 ? 'UniProt' : null,
    uniProtLiterature && uniProtLiterature.hasVariants
      ? 'UniProt Literature'
      : null,
    eva && eva.variantCount > 0 ? 'EVA' : null,
    genomicsEngland && genomicsEngland.hasPanel ? 'Genomics England' : null,
    gene2Phenotype && gene2Phenotype.hasPanel ? 'Gene2Phenotype' : null,
  ]
    .filter(d => d)
    .join(' • ');

export default Summary;
