const Summary = ({ variantCount }) =>
  `${variantCount} variant${variantCount === 1 ? '' : 's'}`;

export default Summary;
