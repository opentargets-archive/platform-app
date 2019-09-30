const Summary = ({ experimentCount }) =>
  `${experimentCount} experiment${experimentCount === 1 ? '' : 's'}`;

export default Summary;
