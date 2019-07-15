const Summary = ({ mouseModelCount }) =>
  `${mouseModelCount} mouse model${mouseModelCount === 1 ? '' : 's'}`;

export default Summary;
