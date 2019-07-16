import ls from 'local-storage';

import pkg from '../../../package.json';
import {
  targetSectionsDefaultOrder,
  diseaseSectionsDefaultOrder,
  drugSectionsDefaultOrder,
  evidenceSectionsDefaultOrder,
} from '../configuration';

const initKey = (key, defaultValue) => {
  if (!ls.get(key)) {
    ls.set(key, defaultValue);
  }
};

const initLocalStorage = () => {
  // clear the storage if the app version changed,
  // to ensure any new defaults updated correctly,
  // or when in development mode
  if (
    process.env.NODE_ENV === 'development' ||
    pkg.version !== ls.get('version')
  ) {
    ls.clear();
  }

  // set defaults (unless keys exist,
  // in which case values may have altered)
  initKey('version', pkg.version);
  initKey('targetSectionsOrder', targetSectionsDefaultOrder);
  initKey('diseaseSectionsOrder', diseaseSectionsDefaultOrder);
  initKey('drugSectionsOrder', drugSectionsDefaultOrder);
  initKey('evidenceSectionsOrder', evidenceSectionsDefaultOrder);
};

export default initLocalStorage;
