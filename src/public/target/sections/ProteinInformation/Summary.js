const Summary = ({
  hasSequenceAnnotationVisualisation,
  hasProteinStructure,
}) => {
  const sources = ['sequence annotation', 'structure'].filter(
    (d, i) => [hasSequenceAnnotationVisualisation, hasProteinStructure][i]
  );
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
