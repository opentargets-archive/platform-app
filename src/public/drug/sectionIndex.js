// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as adverseEventsRaw from './sections/AdverseEvents';
import * as bibliographyRaw from './sections/Bibliography';
import * as linkedTargetsRaw from './sections/LinkedTargets';
import * as mechanismsOfActionRaw from './sections/MechanismsOfAction';

export const adverseEvents = adverseEventsRaw;
export const bibliography = bibliographyRaw;
export const linkedTargets = linkedTargetsRaw;
export const mechanismsOfAction = mechanismsOfActionRaw;
