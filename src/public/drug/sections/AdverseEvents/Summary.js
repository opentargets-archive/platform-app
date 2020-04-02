const Summary = ({ count }) =>
  `${count} adverse event${count !== 1 ? 's' : ''}`;

export default Summary;
