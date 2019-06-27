const Summary = ({
  hasStructuralGenomicsConsortium,
  hasChemicalProbesPortal,
  hasOpenScienceProbes,
  hasProbeMiner,
}) => {
  const sources = ['SGC', 'CPP', 'OSP', 'ProbeMiner'].filter(
    (d, i) =>
      [
        hasStructuralGenomicsConsortium,
        hasChemicalProbesPortal,
        hasOpenScienceProbes,
        hasProbeMiner,
      ][i]
  );
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
