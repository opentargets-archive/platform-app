// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as dataTypeAndSourceRaw from './facets/DataTypeAndSource';
import * as therapeuticAreaRaw from './facets/TherapeuticArea';

export const dataTypeAndSource = dataTypeAndSourceRaw;
export const therapeuticArea = therapeuticAreaRaw;
