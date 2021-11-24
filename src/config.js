// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',

  profile: window.configProfile ?? {},
};

export default config;
