// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    process.env.REACT_APP_configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',

  profile: window.configProfile ?? {},
};

export default config;
