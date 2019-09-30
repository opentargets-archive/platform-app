const Summary = ({ gwasCatalog: { variantCount } }) =>
  `${variantCount} variant${variantCount === 1 ? '' : 's'}`;

export default Summary;
