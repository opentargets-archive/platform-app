const Summary = ({
  hasAntibodyTractabilityAssessment,
  hasSmallMoleculeTractabilityAssessment,
}) => {
  const sources = ['antibody', 'small molecule'].filter(
    (d, i) =>
      [
        hasAntibodyTractabilityAssessment,
        hasSmallMoleculeTractabilityAssessment,
      ][i]
  );
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
