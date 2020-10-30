import ls from 'local-storage';

const initKey = (key, defaultValue) => {
  if (!ls.get(key)) {
    ls.set(key, defaultValue);
  }
};

const initLocalStorage = () => {
  // clear the storage if the build id changed,
  // to ensure any new defaults updated correctly,
  // or when in development mode
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_BUILD_ID !== ls.get('buildId')
  ) {
    ls.clear();
  }

  // set defaults (unless keys exist,
  // in which case values may have altered)
  initKey('buildId', process.env.REACT_APP_BUILD_ID);
};

export default initLocalStorage;
