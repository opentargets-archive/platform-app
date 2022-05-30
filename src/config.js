// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api.platform.dev.opentargets.xyz/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL: window.configEFOURL ?? '/data/ontology/efo_json/diseases_efo.jsonl',

  profile: window.configProfile ?? {},
  downloadsURL: window.configDownloadsURL ?? '/data/downloads.json',
  geneticsPortalUrl:
    window.configGeneticsPortalUrl ?? 'https://genetics.opentargets.org',
};

export default config;
