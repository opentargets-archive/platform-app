import _ from 'lodash';

import { naLabel } from '../constants';

export const label = str => (str ? _.startCase(str) : naLabel);
