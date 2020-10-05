// const Summary = data => `${data.interactorsCount} interactors`;
import tempData from './temp/summary.json';
const Summary = () => {
  const total = tempData.data.filter(
    d => d.interactions.count && d.interactions.count > 0
  ).length;
  return `${total} interactors`;
};

export default Summary;
