import _ from 'lodash';

const Summary = ({ data }) => {
  const sources = [];
  if (_.get(data, 'antibody.buckets.length', 0) > 0) {
    sources.push('antibody');
  }
  if (_.get(data, 'smallmolecule.buckets.length', 0) > 0) {
    sources.push('small molecule');
  }
  if (_.get(data, 'otherModalities.buckets.length', 0) > 0) {
    sources.push('other modalities');
  }
  return sources.length > 0 ? sources.join(' • ') : null;
};

export default Summary;
