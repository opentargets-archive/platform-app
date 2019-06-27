const Summary = ({ rnaBaselineExpression, proteinBaselineExpression }) => {
  const expressionTypes = ['RNA', 'Protein'].filter(
    (d, i) => [rnaBaselineExpression, proteinBaselineExpression][i]
  );
  return expressionTypes.length > 0 ? expressionTypes.join(' • ') : null;
};

export default Summary;
