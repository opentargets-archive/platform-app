const Summary = ({
  // hasStructuralGenomicsConsortium,
  // hasChemicalProbesPortal,
  // hasOpenScienceProbes,
  // hasProbeMiner,
  probeminer,
}) => {
  // const sources = ['SGC', 'CPP', 'OSP', 'ProbeMiner'].filter(
  //   (d, i) =>
  //     [
  //       hasStructuralGenomicsConsortium,
  //       hasChemicalProbesPortal,
  //       hasOpenScienceProbes,
  //       hasProbeMiner,
  //     ][i]
  // );
  // return sources.length > 0 ? sources.join(' • ') : null;
  return probeminer ? 'ProbeMiner' : null;
};

export default Summary;
