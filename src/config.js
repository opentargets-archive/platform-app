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
    'https://platform.opentargets.org/data/ontology/efo_json/diseases_efo.jsonl',
  primaryColor: window.injectedEnv.configPrimaryColor ?? '#3489ca',
  chopRServer: window.injectedEnv.chopRServer ?? 'https://openpedcan-api.d3b.io',
  flagShowOTARProjects: window.injectedEnv.configFlagShowOTARProjects ?? false,
  frontendVersion:window.injectedEnv.frontend_version ?? '1.0.0',
  backendVersion:window.injectedEnv.backend_version ?? '1.0.0'
};

export default config;
