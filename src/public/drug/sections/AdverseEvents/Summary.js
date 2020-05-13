const Summary = ({ data }) => {
  const { count } = data;
  return `${count} adverse event${count !== 1 ? 's' : ''}`;
};

export default Summary;
