const Summary = ({ pathwayCount }) =>
  `${pathwayCount} pathway${pathwayCount === 1 ? '' : 's'}`;

export default Summary;
