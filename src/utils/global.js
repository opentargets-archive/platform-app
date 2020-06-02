import _ from 'lodash';

import { naLabel } from '../public/configuration';

export const label = str => (str ? _.startCase(str) : naLabel);

export const safeToString = x => {
  switch (typeof x) {
    case 'object':
      return 'object';
    case 'function':
      return 'function';
    case undefined:
    case null:
      return '';
    default:
      return x + '';
  }
};
