// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api.platform.opentargets.org/api/v4/graphql',
  urlApiBeta:
    window.configUrlApiBeta ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor: window.configPrimaryColor ?? '#3489ca',
  flagShowOTARProjects: window.configFlagShowOTARProjects ?? false,
};

export default config;
