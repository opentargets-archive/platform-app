import _ from 'lodash';

const Summary = ({
  // hasStructuralGenomicsConsortium,
  // hasChemicalProbesPortal,
  // hasOpenScienceProbes,
  // hasProbeMiner,
  probeminer,
  rows,
}) => {
  // const sources = ['SGC', 'CPP', 'OSP', 'ProbeMiner'].filter(
  //   (d, i) =>
  //     [
  //       hasStructuralGenomicsConsortium,
  //       hasChemicalProbesPortal,
  //       hasOpenScienceProbes,
  //       hasProbeMiner,
  //     ][i]
  // );
  // return sources.length > 0 ? sources.join(' • ') : null;

  let srcs = _.flatten(rows.map(r => r.sourcelinks.map(sl => sl.source)));
  if (probeminer) {
    srcs.push('probeminer');
  }
  const sources = _(srcs)
    .flatten()
    .uniq()
    .value()
    .map(s => {
      switch (s) {
        case 'Structural Genomics Consortium':
          return 'SGC';
        case 'Chemical Probes Portal':
          return 'CPP';
        case 'Open Science Probes':
          return 'OSP';
        case 'probeminer':
          return 'ProbeMiner';
      }
    });
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
