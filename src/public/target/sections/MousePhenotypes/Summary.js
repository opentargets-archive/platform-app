import _ from 'lodash';

const Summary = ({ data }) => {
  const labels = _.uniq(
    data
      .flatMap(i => i.phenotypes)
      .flatMap(p => p.genotypePhenotype)
      .map(gp => gp.label)
  );
  return `${labels.length} distinct phenotypes`;
};

export default Summary;
