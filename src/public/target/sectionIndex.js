// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as cancerBiomarkersRaw from './sections/CancerBiomarkers';
import * as cancerHallmarksRaw from './sections/CancerHallmarks';

export const cancerBiomarkers = cancerBiomarkersRaw;
export const cancerHallmarks = cancerHallmarksRaw;
