const Summary = ({ uniProtSomatic, evaSomatic, cancerGeneCensus, intOGen }) =>
  [
    uniProtSomatic && uniProtSomatic.hasVariants ? 'UniProt Somatic' : null,
    evaSomatic && evaSomatic.variantCount > 0 ? 'EVA Somatic' : null,
    cancerGeneCensus && cancerGeneCensus.hasMutations
      ? 'Cancer Gene Census'
      : null,
    intOGen && intOGen.hasMutations ? 'IntOGen' : null,
  ]
    .filter((d) => d)
    .join(' • ');

export default Summary;
