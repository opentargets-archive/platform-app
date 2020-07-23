// TODO: see if this can be done dynamically
//       or try @babel/plugin-proposal-export-namespace-from (may need eject)

import * as adverseEventsRaw from '../../sections/drug/AdverseEvents';
import * as bibliographyRaw from '../../sections/drug/Bibliography';
import * as indicationsRaw from '../../sections/drug/Indications';
import * as drugsRaw from '../../sections/drug/KnownDrugs';
import * as mechanismsOfActionRaw from '../../sections/drug/MechanismsOfAction';

export const adverseEvents = adverseEventsRaw;
export const bibliography = bibliographyRaw;
export const indications = indicationsRaw;
export const drugs = drugsRaw;
export const mechanismsOfAction = mechanismsOfActionRaw;
