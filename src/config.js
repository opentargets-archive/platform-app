// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  // 'https://api.partner-platform.opentargets.org/api/v4/graphql',
  urlApiBeta:
    window.configUrlApiBeta ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  // 'https://api.partner-platform.opentargets.org/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor: window.configPrimaryColor ?? '#3489ca',
  // primaryColor: window.configPrimaryColor ?? '#407253',
  flagShowOTARProjects: window.configFlagShowOTARProjects ?? false,

  // partner preview options
  isPartnerPreview: window.isPartnerPreview ?? true, // TODO: default to false
};

export default config;
