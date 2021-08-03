// Configuration Object
const config = {
  urlApi:
    window.injectedEnv.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  urlApiBeta:
    window.injectedEnv.configUrlApiBeta ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.injectedEnv.configGoogleTagManagerID ?? null,
  efoURL:
    window.injectedEnv.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor: window.injectedEnv.configPrimaryColor ?? '#3489ca',
  flagShowOTARProjects: window.injectedEnv.configFlagShowOTARProjects ?? false
};

export default config;
