import _ from 'lodash';

const Summary = ({ probeminer, rows }) => {
  const sourceLabels = {
    'Structural Genomics Consortium': 'SGC',
    'Chemical Probes Portal': 'CPP',
    'Open Science Probes': 'OSP',
    probeminer: 'ProbeMiner',
  };

  // probeminer is not in the list of sources, so we have to add it to the array for simplicity
  const allSources = rows
    .map(r => r.sourcelinks.map(sl => sl.source))
    .concat(probeminer ? ['probeminer'] : []);

  const sources = _(allSources)
    .flatten()
    .uniq()
    .value()
    .map(s => sourceLabels[s] || null);
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
