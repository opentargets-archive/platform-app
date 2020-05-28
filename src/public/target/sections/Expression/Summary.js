const Summary = ({ data }) => {
  const hasRNA = data.some(d => d.rna.level >= 0);
  const hasProtein = data.some(d => d.protein.level >= 0);
  const expressionTypes = [];

  if (hasRNA) {
    expressionTypes.push('RNA');
  }

  if (hasProtein) {
    expressionTypes.push('Protein');
  }

  return expressionTypes.join(' • ');
};

export default Summary;
