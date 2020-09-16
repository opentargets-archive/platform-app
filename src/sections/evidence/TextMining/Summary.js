const Summary = ({ textMiningCount }) =>
  `${textMiningCount} publication${textMiningCount === 1 ? '' : 's'}`;

export default Summary;
