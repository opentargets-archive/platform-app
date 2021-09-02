// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    process.env.REACT_APP_configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  // urlApiBeta:
  //   window.configUrlApiBeta ??
  //   process.env.REACT_APP_configUrlApiBeta ??
  //   'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor:
    window.configPrimaryColor ??
    process.env.REACT_APP_configPrimaryColor ??
    '#3489ca',
  // flagShowOTARProjects:
  //   window.configFlagShowOTARProjects ??
  //   process.env.REACT_APP_configFlagShowOTARProjects ??
  //   false,

  // partner preview options
  isPartnerPreview:
    window.isPartnerPreview ?? process.env.REACT_APP_isPartnerPreview ?? false,

  // partner (private) widgets on disease page, identified by widget id (as defined in widget definition)
  partnerDiseaseSectionIds:
    window.partnerDiseaseSectionIds ??
    process.env.REACT_APP_partnerDiseaseSectionIds ??
    '',
};

export default config;
