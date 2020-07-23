const Summary = ({ data }) =>
  `${data.count} indication${data.count !== 1 ? 's' : ''}`;

export default Summary;
