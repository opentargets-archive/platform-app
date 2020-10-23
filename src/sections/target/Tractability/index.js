import _ from 'lodash';

export const definition = {
  id: 'tractability',
  name: 'Tractability',
  shortName: 'TR',
  hasData: data =>
    _.get(data.tractability, 'antibody.buckets.length', 0) > 0 ||
    _.get(data.tractability, 'smallmolecule.buckets.length', 0) > 0 ||
    _.get(data.tractability, 'otherModalities.buckets.length', 0) > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
